<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700">{{ label }}</label>
    <input
      :id="id"
      type="date"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
    />
    <span v-if="errors" class="text-red-500 text-sm">{{ errors }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    id: String,
    modelValue: String,
    errors: String,
  },
  emits: ['update:modelValue'],
};
</script>
