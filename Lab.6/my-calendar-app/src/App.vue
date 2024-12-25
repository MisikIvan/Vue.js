<template>
  <!-- Контейнер для календаря подій -->
  <div class="max-w-5xl mx-auto p-5">
    <!-- Заголовок сторінки календаря -->
    <h1 class="text-3xl font-bold mb-5">Event Calendar</h1>

    <!-- Кнопки для переміщення по місяцях та назва поточного місяця та року -->
    <div class="flex justify-between items-center mb-5">
      <button @click="previousMonth"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Previous</button>
      <h2 class="text-xl font-semibold">{{ currentMonthName }} {{ currentYear }}</h2>
      <button @click="nextMonth" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
    </div>

    <!-- Кнопки для експорту подій в JSON або CSV формат -->
    <div class="flex gap-2 mb-5">
      <button @click="exportEvents('json')" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Export
        JSON</button>
      <button @click="exportEvents('csv')" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Export
        CSV</button>
    </div>

    <!-- Календар, який відображає події та дозволяє редагувати, видаляти чи додавати події -->
    <Calendar :events="events" :current-date="currentDate" @day-click="openEventForm" @edit-event="editEvent"
      @delete-event="deleteEvent" />
      
    <!-- Форма для додавання або редагування подій -->
    <EventForm v-if="showEventForm" :event="selectedEvent" :selected-date="selectedDate" @save="saveEvent"
      @close="closeEventForm" />
  </div>
</template>

<script setup>
// Імпорти з Vue
import { ref, computed, readonly, watchEffect, shallowRef, effectScope, getCurrentScope, onScopeDispose, onMounted } from 'vue'
import Calendar from './components/Calendar.vue'
import EventForm from './components/EventForm.vue'

// Створення scope для ефектів (для очищення при знищенні компонента)
const scope = effectScope()

// Реактивні змінні
const currentDate = shallowRef(new Date())  // Поточна дата
const events = ref([])  // Масив подій
const showEventForm = ref(false)  // Показувати чи приховувати форму події
const selectedEvent = ref(null)  // Вибрана подія для редагування
const selectedDate = ref(null)  // Вибрана дата для нової події

// Завантаження подій з localStorage при монтуванні компонента
onMounted(() => {
  const savedEvents = localStorage.getItem('calendar-events')
  if (savedEvents) {
    events.value = JSON.parse(savedEvents)
  }
})

// Обчислювані властивості для місяця та року
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate.value)
})

const currentYear = computed(() => currentDate.value.getFullYear())

// Робимо події доступними тільки для читання
const readonlyEvents = readonly(events)

// Ефект для синхронізації подій з localStorage
watchEffect(() => {
  localStorage.setItem('calendar-events', JSON.stringify(events.value))
}, { flush: 'post' }) // Виконується після оновлення DOM

// Методи для навігації по місяцях
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}

// Методи для роботи з подіями
const openEventForm = (date) => {
  selectedDate.value = date  // Встановлюємо вибрану дату
  selectedEvent.value = null  // Не вибрано події для редагування
  showEventForm.value = true  // Відкриваємо форму
}

const editEvent = (event) => {
  selectedEvent.value = { ...event }  // Створюємо копію події для редагування
  selectedDate.value = new Date(event.date)  // Встановлюємо дату події
  showEventForm.value = true  // Відкриваємо форму
}

const saveEvent = (eventData) => {
  if (selectedEvent.value) {
    const index = events.value.findIndex(e => e.id === selectedEvent.value.id)
    if (index !== -1) {
      // Створюємо новий масив для активації реактивності
      events.value = [
        ...events.value.slice(0, index),
        { ...eventData, id: selectedEvent.value.id },
        ...events.value.slice(index + 1)
      ]
    }
  } else {
    // Додаємо нову подію
    events.value = [...events.value, { ...eventData, id: Date.now() }]
  }
  closeEventForm()  // Закриваємо форму після збереження
}

const deleteEvent = (eventId) => {
  events.value = events.value.filter(e => e.id !== eventId)  // Видаляємо подію за ID
}

const closeEventForm = () => {
  showEventForm.value = false  // Закриваємо форму
  selectedEvent.value = null  // Очищаємо вибрану подію
  selectedDate.value = null  // Очищаємо вибрану дату
}

// Функція експорту подій
const exportEvents = (format) => {
  if (events.value.length === 0) {
    alert('No events to export')  // Перевірка на наявність подій
    return
  }

  let content
  let filename
  let type

  // Експортуємо в формат JSON
  if (format === 'json') {
    content = JSON.stringify(events.value, null, 2)
    filename = 'calendar-events.json'
    type = 'application/json'
  } else if (format === 'csv') {
    // Створення CSV файлу
    const headers = ['Title', 'Description', 'Date', 'ID']
    const rows = events.value.map(event => [
      `"${event.title.replace(/"/g, '""')}"`, // Екрануємо лапки у заголовку
      `"${event.description?.replace(/"/g, '""') || ''}"`, // Екрануємо лапки в описі
      new Date(event.date).toLocaleString(),
      event.id
    ])
    content = [headers, ...rows].map(row => row.join(',')).join('\n')
    filename = 'calendar-events.csv'
    type = 'text/csv'
  }

  // Створення та ініціювання завантаження файлу
  const blob = new Blob([content], { type: `${type};charset=utf-8;` })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Очищення ресурсу при розмонтуванні компонента
if (getCurrentScope()) {
  onScopeDispose(() => {
    scope.stop()
  })
}
</script>
