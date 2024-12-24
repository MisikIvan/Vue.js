<template>
    <div class="task-card p-6 bg-light-gray border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition">
        <slot name="title">
            <h3 class="task-title text-xl font-semibold text-dark-gray">{{ task.title }}</h3>
        </slot>
        
        <p class="task-description text-gray-600">{{ task.description }}</p>
        <p class="task-priority text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
        <p class="task-tags text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
        <p class="task-deadline text-sm text-gray-500">
            Дедлайн: {{ task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Не встановлено' }}
        </p>
        <p class="task-created text-sm text-gray-500">Дата створення: {{ new Date(task.createdAt).toLocaleDateString() }}</p>
        
        <p v-if="task.status === 'completed'" class="task-completion-date text-sm text-gray-500">
            Дата завершення: {{ new Date(task.completedAt).toLocaleDateString() }}
        </p>

        <slot name="actions">
            <div class="task-actions mt-4 space-x-3">
                <button @click="onEdit" class="action-button px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Редагувати
                </button>
                <button @click="onDelete" class="action-button px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                    Видалити
                </button>
                <button v-if="task.status !== 'completed'" @click="onComplete" 
                    class="action-button px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Завершити
                </button>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'TaskItem',
    props: {
        task: Object,
        onEdit: Function,
        onDelete: Function,
        onComplete: Function,
    },
};
</script>

<style scoped>
.task-card {
    background-color: #fafafa;
}

.task-title {
    color: #333;
}

.task-description,
.task-priority,
.task-tags,
.task-deadline,
.task-created,
.task-completion-date {
    margin-bottom: 8px;
}

.task-actions .action-button {
    transition: all 0.3s ease;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
}

.task-actions .action-button:hover {
    opacity: 0.9;
}
</style>
