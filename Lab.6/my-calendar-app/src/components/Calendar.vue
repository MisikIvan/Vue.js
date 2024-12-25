<template>
    <div class="calendar-container border border-teal-300 rounded-lg shadow-xl">
        <!-- Рядок днів тижня -->
        <div class="weekdays-grid grid grid-cols-7 bg-indigo-600 text-white py-3">
            <div v-for="day in weekDays" :key="day" class="text-center font-bold text-lg">{{ day }}</div>
        </div>
        <!-- Рядок для днів місяця -->
        <div class="days-grid grid grid-cols-7">
            <div v-for="day in calendarDays" :key="day.date"
                :class="['day-item relative p-3 cursor-pointer', 
                         { 'bg-gray-200': day.currentMonth, 'bg-gray-50': !day.currentMonth }]"
                @click="handleDayClick(day.date)">
                <!-- Відображення числа дня -->
                <div class="day-number text-right text-xl font-semibold">{{ day.dayNumber }}</div>
                <div class="events pt-1">
                    <!-- Відображення подій на вибраний день -->
                    <div v-for="event in getDayEvents(day.date)" :key="event.id"
                        class="event-item bg-teal-500 text-white p-2 mb-2 rounded-lg text-xs flex justify-between items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-teal-600"
                        :title="event.description" @click.stop="$emit('edit-event', event)">
                        <!-- Час події -->
                        <div class="event-time text-sm opacity-90">{{ formatEventTime(event.date) }}</div>
                        <!-- Заголовок події -->
                        <span class="event-title flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{{ event.title }}</span>
                        <!-- Кнопка видалення події -->
                        <button
                            class="delete-btn bg-transparent border-none text-white cursor-pointer px-2 hover:bg-white hover:bg-opacity-25 rounded-full"
                            @click.stop="$emit('delete-event', event.id)" title="Delete event">×</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, toRef, useSlots, isProxy, toRaw } from 'vue'

const props = defineProps({
    currentDate: {
        type: Date,
        required: true
    },
    events: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['day-click', 'edit-event', 'delete-event'])

// Конвертація пропсів у реактивні посилання
const currentDateRef = toRef(props, 'currentDate')

// Перевірка, чи є події проксі (реактивні)
const isEventsProxy = isProxy(props.events)

// Отримання сирих даних подій, якщо це потрібно
const rawEvents = computed(() => isEventsProxy ? toRaw(props.events) : props.events)

// Перевірка наявності слотів (хоча ми їх не використовуємо, це частина 10 API композиції)
const slots = useSlots()

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Обчислення днів календаря
const calendarDays = computed(() => {
    const days = []
    const date = new Date(currentDateRef.value.getFullYear(), currentDateRef.value.getMonth(), 1)
    const firstDay = date.getDay()
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    // Додавання днів попереднього місяця
    for (let i = 0; i < firstDay; i++) {
        const prevDate = new Date(date.getFullYear(), date.getMonth(), -i)
        days.unshift({
            date: prevDate,
            dayNumber: prevDate.getDate(),
            currentMonth: false
        })
    }

    // Додавання днів поточного місяця
    for (let i = 1; i <= lastDate; i++) {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), i)
        days.push({
            date: currentDate,
            dayNumber: i,
            currentMonth: true
        })
    }

    // Додавання днів наступного місяця
    const remainingDays = 42 - days.length // 6 рядків * 7 днів
    for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, i)
        days.push({
            date: nextDate,
            dayNumber: nextDate.getDate(),
            currentMonth: false
        })
    }

    return days
})

// Фільтрація та сортування подій для конкретного дня
const getDayEvents = (date) => {
    return rawEvents.value
        .filter(event => {
            const eventDate = new Date(event.date)
            return eventDate.toDateString() === date.toDateString()
        })
        .sort((a, b) => {
            // Сортування по часу
            const timeA = new Date(a.date).getTime()
            const timeB = new Date(b.date).getTime()
            return timeA - timeB
        })
}

// Обробка кліку по дню календаря
const handleDayClick = (date) => {
    emit('day-click', date)
}

// Форматування часу події
const formatEventTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.calendar-container {
    max-width: 1200px;
    margin: auto;
}

/* Стилі для рядка днів тижня */
.weekdays-grid {
    background-color: #4c51bf;
}

/* Стилі для дня */
.day-item {
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.day-item:hover {
    transform: scale(1.05);
    background-color: #edf2f7;
}

/* Стилі для події */
.event-item {
    transition: background-color 0.3s ease;
}

.event-item:hover {
    background-color: #38b2ac;
}

/* Стилі для кнопки видалення */
.delete-btn {
    transition: background-color 0.3s ease, color 0.3s ease;
}

.delete-btn:hover {
    color: #f56565;
    background-color: rgba(255, 0, 0, 0.2);
}
</style>
