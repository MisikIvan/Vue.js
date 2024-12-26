import { ref } from "vue";

export function useTodoState() {
  const tasks = ref([]);
  const archivedTasks = ref([]);

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description || "",
      status: "active",
      createdAt: new Date(),
      completedAt: null,
      priority: newTask.priority || "середній",
      tags: newTask.tags || [],
      deadline: newTask.deadline || null,
    };
    tasks.value.push(task);
  };

  const editTask = (taskId, updatedTask) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updatedTask };
    }
  };

  
  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    archivedTasks.value = archivedTasks.value.filter(
      (task) => task.id !== taskId
    );
  };


  const completeTask = (taskId) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const [completedTask] = tasks.value.splice(taskIndex, 1);
      completedTask.status = "completed";
      completedTask.completedAt = new Date();
      archivedTasks.value.push(completedTask);
    }
  };

  const restoreTask = (taskId) => {
    const taskIndex = archivedTasks.value.findIndex(
      (task) => task.id === taskId
    );
    if (taskIndex !== -1) {
      const [restoredTask] = archivedTasks.value.splice(taskIndex, 1);
      restoredTask.status = "active";
      restoredTask.completedAt = null;
      tasks.value.push(restoredTask);
    }
  };

  return {
    tasks,
    archivedTasks,
    addTask,
    editTask,
    deleteTask,
    completeTask,
    restoreTask,
  };
}
