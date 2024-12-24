<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <input type="date" v-model="dateAnswer"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <span v-if="error" class="text-red-500 text-sm block">{{ error }}</span>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useField } from 'vee-validate';
import * as yup from 'yup';


const props = defineProps({
    question: Object,
    modelValue: String,
    errors: String 
});


const { value: dateAnswer, errorMessage: error } = useField(
    'dateAnswer',
    yup
        .date()
        .typeError('Please enter a valid date')
        .required('This field is required')
);


const emit = defineEmits(['update:modelValue']);
watch(dateAnswer, (newValue) => {
    emit('update:modelValue', newValue);
});


dateAnswer.value = props.modelValue || '';
</script>
