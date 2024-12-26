<template>
    <div class="todo-item p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
        <slot name="title">
            <h3 class="text-xl font-bold text-gray-800">{{ task.title }}</h3>
        </slot>
        <p class="text-gray-600">{{ task.description }}</p>
        <p class="text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
        <p class="text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
        <p class="text-sm text-gray-500">
            Дедлайн: {{ task.deadline ? task.deadline.toLocaleDateString() : 'Не встановлено' }}
        </p>
        <p class="text-sm text-gray-500">Дата створення: {{ task.createdAt.toLocaleDateString() }}</p>
        <p v-if="task.status === 'completed'" class="text-sm text-gray-500">
            Дата завершення: {{ task.completedAt.toLocaleDateString() }}
        </p>
        <slot name="actions">
            <div class="mt-4 space-x-2">
                <button @click="onEdit" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Редагувати
                </button>
                <button @click="onDelete" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Видалити
                </button>
                <button v-if="task.status !== 'completed'" @click="onComplete"
                    class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Завершити
                </button>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props: {
        task: Object,
        onEdit: Function,
        onDelete: Function,
        onComplete: Function,
    },
};
</script>