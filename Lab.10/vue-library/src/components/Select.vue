<template>
    <select :multiple="multiple" v-model="selectedValue" :disabled="disabled">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </template>
  
  <script>
  export default {
    props: {
      options: { type: Array, required: true },
      value: { type: [String, Number], default: '' },
      placeholder: { type: String, default: 'Select an option' },
      multiple: { type: Boolean, default: false },
      clearable: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false }
    },
    emits: ['change']
  };
  </script>
  <style scoped>
  /* Стилі селекту */
  </style>
  