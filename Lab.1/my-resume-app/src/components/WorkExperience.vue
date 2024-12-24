<!-- src/components/WorkExperience.vue -->
<template>
    <div class="mb-4 p-4 border rounded">
      <InputField
        label="Посада"
        id="position"
        v-model="experience.position"
        :errors="errors.position"
      />
      <InputField
        label="Компанія"
        id="company"
        v-model="experience.company"
        :errors="errors.company"
      />
      <DatePicker
        label="Дата початку роботи"
        id="startDate"
        v-model="experience.startDate"
        :errors="errors.startDate"
      />
      <DatePicker
        label="Дата завершення роботи"
        id="endDate"
        v-model="experience.endDate"
        :errors="errors.endDate"
      />
      <div class="mb-4">
        <label for="description" class="block text-gray-700">Опис обов’язків</label>
        <textarea
          id="description"
          v-model="experience.description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
        <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
      </div>
      <CheckboxGroup
        label="Наявність рекомендацій"
        :options="[{ label: 'Так', value: true }]"
        v-model="experience.hasRecommendation"
        :errors="errors.hasRecommendation"
      />
      <InputField
        label="Контактна особа для рекомендацій"
        id="referenceContact"
        v-model="experience.referenceContact"
        :errors="errors.referenceContact"
      />
      <button @click="$emit('remove')" class="mt-2 text-red-500">Видалити</button>
    </div>
  </template>
  
  <script>
  import InputField from './InputField.vue'
  import DatePicker from './DatePicker.vue'
  import CheckboxGroup from './CheckboxGroup.vue'
  
  export default {
    components: { InputField, DatePicker, CheckboxGroup },
    props: {
      experience: Object,
      errors: Object,
    },
  }
  </script>
  