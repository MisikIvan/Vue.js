<template>
    <div class="todo-form p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            {{ task ? 'Редагувати завдання' : 'Додати нове завдання' }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-4">
            <div>
                <label for="title" class="block text-gray-700 font-medium mb-1">Назва:</label>
                <input type="text" id="title" v-model="localTask.title" ref="formFields" required
                    class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500" />
            </div>

            <div>
                <label for="description" class="block text-gray-700 font-medium mb-1">Опис:</label>
                <textarea id="description" v-model="localTask.description" ref="formFields"
                    class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"></textarea>
            </div>

            <div>
                <label for="priority" class="block text-gray-700 font-medium mb-1">Пріоритет:</label>
                <select id="priority" v-model="localTask.priority" ref="formFields"
                    class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500">
                    <option>низький</option>
                    <option>середній</option>
                    <option>високий</option>
                </select>
            </div>

            <div>
                <label for="tags" class="block text-gray-700 font-medium mb-1">Теги (через кому):</label>
                <input type="text" id="tags" v-model="localTask.tags" ref="formFields"
                    placeholder="Наприклад, важливе, навчання"
                    class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500" />
            </div>

            <div>
                <label for="deadline" class="block text-gray-700 font-medium mb-1">Дедлайн:</label>
                <input type="date" id="deadline" v-model="localTask.deadline" ref="formFields"
                    class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500" />
            </div>

            <button type="submit"
                class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-900 transition duration-300">
                {{ task ? 'Зберегти' : 'Додати завдання' }}
            </button>
        </form>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
    name: 'TodoForm',
    props: {
        task: Object,
    },
    emits: ['add-task', 'save-task'],
    setup(props, { emit }) {
        const localTask = ref({
            title: '',
            description: '',
            priority: 'середній',
            tags: '',
            deadline: null,
        });

        const formFields = ref([]);

        const focusFirstInput = () => {
            if (formFields.value.length > 0 && formFields.value[0]) {
                formFields.value[0].focus();
            }
        };

        onMounted(() => {
            focusFirstInput();
        });

        watch(() => props.task, (newTask) => {
            if (newTask) {
                localTask.value = {
                    ...newTask,
                    tags: newTask.tags ? newTask.tags.join(', ') : '',
                    deadline: newTask.deadline
                        ? new Date(newTask.deadline).toISOString().split('T')[0]
                        : null,
                };
            }
            focusFirstInput();
        }, { immediate: true });

        const submitForm = () => {
            const taskData = {
                ...localTask.value,
                tags: localTask.value.tags.split(',').map(tag => tag.trim()),
                deadline: localTask.value.deadline ? new Date(localTask.value.deadline) : null,
            };

            if (props.task) {
                emit('save-task', taskData);
            } else {
                emit('add-task', taskData);
            }

            localTask.value = {
                title: '',
                description: '',
                priority: 'середній',
                tags: '',
                deadline: null,
            };
            focusFirstInput();
        };

        return {
            localTask,
            submitForm,
            formFields,
            focusFirstInput,
        };
    },
};
</script>