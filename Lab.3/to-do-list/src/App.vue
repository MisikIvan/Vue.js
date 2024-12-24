<template>
  <div class="app mx-auto max-w-3xl p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">To-Do List</h1>
    <TodoForm v-if="editingTask" :task="editingTask" @save-task="saveTask" />
    <TodoForm v-else @add-task="addTask" />
    <div class="view-toggle flex justify-center space-x-4 mb-6">
      <button @click="showActive = true"
        class="w-40 mt-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition focus:outline-none">Активні
        завдання
      </button>
      <button @click="showActive = false"
        class="w-40 mt-2 px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition focus:outline-none">Завершені
        завдання
      </button>
    </div>
    <transition name="fade-slide" mode="out-in">
      <component :is="showActive ? 'TodoList' : 'ArchivedList'" @edit-task="startEditing" />
    </transition>
  </div>
</template>

<script>
import { provide, ref, defineAsyncComponent } from 'vue';
import { useTodoState } from './composables/todoState';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';
const ArchivedList = defineAsyncComponent(() =>
  import('./components/ArchivedList.vue')
);

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoList,
    ArchivedList,
  },
  setup() {
    const {
      tasks,
      archivedTasks,
      addTask,
      editTask,
      deleteTask,
      completeTask,
      restoreTask,
    } = useTodoState();

    const showActive = ref(true);
    const editingTask = ref(null);

    provide('tasks', tasks);
    provide('archivedTasks', archivedTasks);
    provide('addTask', addTask);
    provide('editTask', editTask);
    provide('deleteTask', deleteTask);
    provide('completeTask', completeTask);
    provide('restoreTask', restoreTask);

    const startEditing = (task) => {
      editingTask.value = { ...task };
    };

    const saveTask = (updatedTask) => {
      editTask(editingTask.value.id, updatedTask);
      editingTask.value = null;
    };

    return {
      showActive,
      addTask,
      editingTask,
      startEditing,
      saveTask,
    };
  },
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
