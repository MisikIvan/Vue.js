<template>
  <div class="language-switcher flex justify-center mt-4">
    <button @click="changeLanguage('en')" class="language-button">English</button>
    <button @click="changeLanguage('uk')" class="language-button">Українська</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

function changeLanguage(lang) {
  locale.value = lang;
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 12px;
}

.language-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.language-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.language-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(72, 181, 255, 0.5);
}
</style>
