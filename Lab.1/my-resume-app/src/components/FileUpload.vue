<!-- src/components/FileUpload.vue -->
<template>
    <div class="mb-4">
      <label :for="id" class="block text-gray-700">{{ label }}</label>
      <input
        :id="id"
        type="file"
        @change="handleFileUpload"
        :multiple="multiple"
        class="mt-1 block w-full"
      />
      <span v-if="errors" class="text-red-500 text-sm">{{ errors }}</span>
      <div v-if="files.length" class="mt-2">
        <ul>
          <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      id: String,
      multiple: Boolean,
      errors: String,
    },
    emits: ['update:files'],
    data() {
      return {
        files: [],
      }
    },
    methods: {
      handleFileUpload(event) {
        this.files = Array.from(event.target.files)
        this.$emit('update:files', this.files)
      },
    },
  }
  </script>
  