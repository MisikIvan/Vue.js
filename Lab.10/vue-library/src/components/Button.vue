<template>
    <button :class="['btn', type, size]" :disabled="disabled">
      <i v-if="icon" :class="icon"></i>
      <span v-if="loading">Loading...</span>
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      type: { type: String, default: 'primary' },
      size: { type: String, default: 'medium' },
      disabled: { type: Boolean, default: false },
      icon: { type: String, default: '' },
      loading: { type: Boolean, default: false }
    }
  };
  </script>
  <style scoped>
  /* Стилі кнопки */
  </style>

