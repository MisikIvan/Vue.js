<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Активні завдання</h2>
        <ul class="space-y-4">
            <transition-group name="list" tag="ul">
                <li v-for="task in tasks" :key="task.id"
                    class="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                    <slot name="task" :task="task" :editTask="() => $emit('edit-task', task)" :deleteTask="deleteTask"
                        :completeTask="completeTask">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-700">{{ task.title }}</h3>
                            <p class="text-gray-600">{{ task.description }}</p>
                            <p class="text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
                            <p v-if="task.tags" class="text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
                            <p v-if="task.deadline" class="text-sm text-gray-500">
                                Дедлайн: {{ new Date(task.deadline).toLocaleDateString() }}
                            </p>
                            <div class="mt-4 space-x-2">
                                <button @click="$emit('edit-task', task)"
                                    class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                    Редагувати
                                </button>
                                <button @click="deleteTask(task.id)"
                                    class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                    Видалити
                                </button>
                                <button @click="completeTask(task.id)"
                                    class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
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
    name: 'TodoList',
    emits: ['edit-task'],
    setup() {
        const tasks = inject('tasks');
        const deleteTask = inject('deleteTask');
        const completeTask = inject('completeTask');

        return {
            tasks,
            deleteTask,
            completeTask,
        };
    },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>