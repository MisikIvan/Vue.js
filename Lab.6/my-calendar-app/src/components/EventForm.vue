<template>
    <!-- Модальне вікно, яке накриває весь екран з напівпрозорим фоном -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click.self="$emit('close')">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <!-- Заголовок в залежності від наявності події -->
            <h2 class="text-xl font-bold mb-4">{{ event ? 'Edit Event' : 'New Event' }}</h2>
            <form @submit.prevent="handleSubmit">
                <!-- Поле для заголовка події -->
                <div class="mb-4">
                    <label for="title" class="block mb-1 font-medium">Title:</label>
                    <input id="title" v-model="formData.title" type="text" required
                        :class="['w-full p-2 border rounded', { 'border-red-500': validationErrors.title }]" />
                    <span v-if="validationErrors.title" class="text-red-500 text-sm">{{ validationErrors.title }}</span>
                </div>

                <!-- Поле для опису події -->
                <div class="mb-4">
                    <label for="description" class="block mb-1 font-medium">Description:</label>
                    <textarea id="description" v-model="formData.description" rows="3"
                        class="w-full p-2 border rounded"></textarea>
                </div>

                <!-- Поле для вибору дати та часу події -->
                <div class="mb-4">
                    <label for="date" class="block mb-1 font-medium">Date:</label>
                    <input id="date" v-model="formData.date" type="datetime-local" required
                        :class="['w-full p-2 border rounded', { 'border-red-500': validationErrors.date }]" />
                    <span v-if="validationErrors.date" class="text-red-500 text-sm">{{ validationErrors.date }}</span>
                </div>

                <!-- Кнопки для скасування або збереження -->
                <div class="flex justify-end gap-2 mt-4">
                    <button type="button" class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        @click="$emit('close')">Cancel</button>
                    <button type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, watchSyncEffect, customRef, markRaw } from 'vue'

const props = defineProps({
    event: {
        type: Object,
        default: null
    },
    selectedDate: {
        type: Date,
        required: true
    }
})

const emit = defineEmits(['save', 'close'])

// Створення кастомного референсу для валідації
const useValidatedRef = (value, validator) => {
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                const validation = validator(newValue)
                if (!validation.hasError) {
                    value = newValue
                    trigger()
                }
            }
        }
    })
}

// Деструктуризація пропсів
const { event, selectedDate } = toRefs(props)

// Об'єкт для зберігання помилок валідації
const validationErrors = reactive({
    title: '',
    date: ''
})

// Дані форми, які можна редагувати
const formData = reactive({
    title: event.value?.title || '',
    description: event.value?.description || '',
    date: event.value?.date || formatDate(selectedDate.value)
})

// Валідаційні функції для заголовка та дати
const validators = markRaw({
    title: (value) => value.length >= 3,
    date: (value) => new Date(value) > new Date()
})

// Синхронний ефект для перевірки та валідації даних форми
watchSyncEffect(() => {
    validationErrors.title = validators.title(formData.title) ? '' : 'Title must be at least 3 characters'
    validationErrors.date = validators.date(formData.date) ? '' : 'Date must be in the future'
})

// Функція для форматування дати у формат для вводу
function formatDate(date) {
    return new Date(date).toISOString().slice(0, 16)
}

// Обробка надсилання форми
function handleSubmit() {
    // Якщо немає помилок валідації, викликається подія збереження
    if (Object.values(validationErrors).every(error => !error)) {
        emit('save', { ...formData })
    }
}
</script>

<style scoped>
/* Стилі для форми і модального вікна */
</style>
