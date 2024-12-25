<template>
    <div class="social-share">
      <network-network-name v-for="network in networks" :key="network" :network="network" :url="shareUrl" :title="shareTitle" />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    shareUrl: {
      type: String,
      required: true
    },
    shareTitle: {
      type: String,
      required: true
    }
  })
  
  const networks = ['facebook', 'twitter', 'linkedin', 'whatsapp']
  </script>
  
  <style scoped>
  .social-share {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .network-icon {
    width: 24px;
    height: 24px;
  }
  </style>
  