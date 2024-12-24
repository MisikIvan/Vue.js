<template>
    <div class="task-list-container p-6 bg-white rounded-lg shadow-lg">
        <h2 class="task-list-title text-2xl font-bold text-gray-800 mb-4">Активні завдання</h2>
        <ul class="task-list space-y-4">
            <transition-group name="fade" tag="ul">
                <li v-for="task in tasks" :key="task.id"
                    class="task-item p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                    <slot name="task" :task="task" :editTask="() => $emit('edit-task', task)" :deleteTask="deleteTask"
                        :completeTask="completeTask">
                        <div>
                            <h3 class="task-title text-lg font-semibold text-gray-700">{{ task.title }}</h3>
                            <p class="task-description text-gray-600">{{ task.description }}</p>
                            <p class="task-priority text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
                            <p v-if="task.tags" class="task-tags text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
                            <p v-if="task.deadline" class="task-deadline text-sm text-gray-500">
                                Дедлайн: {{ formatDate(task.deadline) }}
                            </p>
                            <div class="task-actions mt-4 space-x-3">
                                <button @click="$emit('edit-task', task)"
                                    class="action-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                    Редагувати
                                </button>
                                <button @click="deleteTask(task.id)"
                                    class="action-button px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                    Видалити
                                </button>
                                <button @click="completeTask(task.id)"
                                    class="action-button px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                    Завершити
                                </button>
                            </div>
                        </div>
                    </slot>
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    name: 'TaskList',
    emits: ['edit-task'],
    setup() {
        const tasks = inject('tasks');
        const deleteTask = inject('deleteTask');
        const completeTask = inject('completeTask');

        const formatDate = (date) => {
            return new Date(date).toLocaleDateString();
        };

        return {
            tasks,
            deleteTask,
            completeTask,
            formatDate,
        };
    },
};
</script>

<style scoped>
.task-list-container {
    max-width: 1200px;
    margin: auto;
}

.task-list-title {
    color: #333;
}

.task-item {
    transition: transform 0.3s ease-in-out;
}

.task-item:hover {
    transform: translateY(-5px);
}

.task-actions .action-button {
    transition: background-color 0.3s ease;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
}

.task-actions .action-button:hover {
    opacity: 0.9;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter, 
.fade-leave-to {
    opacity: 0;
}
</style>
