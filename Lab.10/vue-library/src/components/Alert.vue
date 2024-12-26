<template>
    <div :class="['alert', type]" v-if="!dismissed">
      <button v-if="dismissible" @click="dismissAlert">X</button>
      <i v-if="icon" class="alert-icon"></i>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: { type: String, default: 'info' },
      dismissible: { type: Boolean, default: true },
      timeout: { type: Number, default: 5000 },
      icon: { type: Boolean, default: false }
    },
    data() {
      return { dismissed: false };
    },
    methods: {
      dismissAlert() {
        this.dismissed = true;
      }
    },
    mounted() {
      if (this.timeout) {
        setTimeout(() => this.dismissAlert(), this.timeout);
      }
    }
  };
  </script>
  <style scoped>
  /* Стилі сповіщення */
  </style>
  