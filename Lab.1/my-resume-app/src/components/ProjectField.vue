<!-- src/components/ProjectField.vue -->
<template>
    <div class="mb-4 p-4 border rounded">
      <InputField
        label="Назва проекту"
        id="projectName"
        v-model="project.name"
        :errors="errors.name"
      />
      <div class="mb-4">
        <label for="projectDescription" class="block text-gray-700">Опис проекту</label>
        <textarea
          id="projectDescription"
          v-model="project.description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
        <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
      </div>
      <InputField
        label="Роль у проекті"
        id="projectRole"
        v-model="project.role"
        :errors="errors.role"
      />
      <InputField
        label="Посилання на проект"
        id="projectLink"
        v-model="project.link"
        :errors="errors.link"
      />
      <button @click="$emit('remove')" class="mt-2 text-red-500">Видалити</button>
    </div>
  </template>
  
  <script>
  import InputField from './InputField.vue'
  
  export default {
    components: { InputField },
    props: {
      project: Object,
      errors: Object,
    },
  }
  </script>
  