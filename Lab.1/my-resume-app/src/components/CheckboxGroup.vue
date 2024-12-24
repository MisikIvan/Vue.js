<!-- src/components/CheckboxGroup.vue -->
<template>
    <div class="mb-4">
      <span class="block text-gray-700">{{ label }}</span>
      <div class="mt-2">
        <label v-for="option in options" :key="option.value" class="inline-flex items-center mr-4">
          <input
            type="checkbox"
            :value="option.value"
            v-model="modelValue"
            class="form-checkbox h-4 w-4 text-indigo-600"
          />
          <span class="ml-2">{{ option.label }}</span>
        </label>
      </div>
      <span v-if="errors" class="text-red-500 text-sm">{{ errors }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      options: Array,
      modelValue: Array,
      errors: String,
    },
    emits: ['update:modelValue'],
  }
  </script>
  