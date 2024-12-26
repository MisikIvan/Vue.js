<template>
    <div>
      <input :type="type" v-model="inputValue" :placeholder="placeholder" :maxlength="maxlength" :required="required" />
      <span v-if="error">{{ error }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: { type: String, required: true },
      placeholder: { type: String, default: 'Enter value' },
      type: { type: String, default: 'text' },
      required: { type: Boolean, default: false },
      error: { type: String, default: '' },
      maxlength: { type: Number, default: 255 }
    },
    data() {
      return { inputValue: this.value };
    },
    watch: {
      inputValue(newValue) {
        this.$emit('update:value', newValue);
      }
    }
  };
  </script>
  <style scoped>
  /* Стилі для текстового поля */
  </style>
  