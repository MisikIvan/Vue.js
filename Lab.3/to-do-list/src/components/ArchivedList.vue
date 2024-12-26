<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Завершені завдання</h2>
        <transition-group name="list" tag="ul" class="space-y-4">
            <li v-for="task in archivedTasks" :key="task.id"
                class="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                <slot name="task" :task="task" :restoreTask="restoreTask" :deleteTask="deleteTask">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-700">{{ task.title }}</h3>
                        <p class="text-gray-600">{{ task.description }}</p>
                        <p class="text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
                        <p class="text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
                        <p v-if="task.deadline" class="text-sm text-gray-500">
                            Дедлайн: {{ new Date(task.deadline).toLocaleDateString() }}
                        </p>
                        <div class="mt-4 space-x-2">
                            <button @click="restoreTask(task.id)"
                                class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                Повернути в активні
                            </button>
                            <button @click="deleteTask(task.id)"
                                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
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
    name: 'ArchivedList',
    setup() {
        const archivedTasks = inject('archivedTasks');
        const restoreTask = inject('restoreTask');
        const deleteTask = inject('deleteTask');

        return {
            archivedTasks,
            restoreTask,
            deleteTask,
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