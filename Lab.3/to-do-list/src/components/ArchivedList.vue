<template>
    <div class="task-list-container p-6 bg-light rounded-xl shadow-md">
        <h2 class="heading text-2xl font-semibold text-dark mb-4">Завершені завдання</h2>
        <transition-group name="task-transition" tag="ul" class="task-list space-y-4">
            <li v-for="task in archivedTasks" :key="task.id"
                class="task-item p-4 bg-light-gray border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition">
                <slot name="taskSlot" :task="task" :onRestore="onRestoreTask" :onDelete="onDeleteTask">
                    <div class="task-content">
                        <h3 class="task-title text-lg font-medium text-dark">{{ task.title }}</h3>
                        <p class="task-desc text-gray-600">{{ task.description }}</p>
                        <p class="priority text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
                        <p class="tags text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
                        <p v-if="task.deadline" class="deadline text-sm text-gray-500">
                            Дедлайн: {{ formatDate(task.deadline) }}
                        </p>
                        <div class="action-buttons mt-4 flex space-x-2">
                            <button @click="onRestoreTask(task.id)"
                                class="btn-restore px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                                Повернути в активні
                            </button>
                            <button @click="onDeleteTask(task.id)"
                                class="btn-delete px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                                Видалити назавжди
                            </button>
                        </div>
                    </div>
                </slot>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    name: 'ArchivedTaskList',
    setup() {
        const archivedTasks = inject('archivedTasks');
        const restoreTask = inject('restoreTask');
        const deleteTask = inject('deleteTask');

        const onRestoreTask = (id) => {
            restoreTask(id);
        };

        const onDeleteTask = (id) => {
            deleteTask(id);
        };

        const formatDate = (date) => {
            return new Date(date).toLocaleDateString();
        };

        return {
            archivedTasks,
            onRestoreTask,
            onDeleteTask,
            formatDate,
        };
    },
};
</script>

<style scoped>
.task-transition-enter-active,
.task-transition-leave-active {
    transition: all 0.4s ease;
}

.task-transition-enter,
.task-transition-leave-to {
    opacity: 0;
    transform: translateY(15px);
}

.task-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-restore {
    background-color: #48bb78;
    transition: background-color 0.3s ease;
}

.btn-restore:hover {
    background-color: #38a169;
}

.btn-delete {
    background-color: #e53e3e;
    transition: background-color 0.3s ease;
}

.btn-delete:hover {
    background-color: #c53030;
}

.task-list {
    padding: 0;
}

.heading {
    font-size: 1.25rem;
    color: #2d3748;
}

.task-title {
    font-weight: 600;
}

.task-desc,
.priority,
.tags,
.deadline {
    margin-bottom: 4px;
    font-size: 0.875rem;
}

.action-buttons button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: transform 0.2s ease;
}

.action-buttons button:hover {
    transform: scale(1.05);
}
</style>
