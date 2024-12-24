<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <input type="text" v-model="textAnswer" placeholder="Enter your answer"
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


const { value: textAnswer, errorMessage: error } = useField(
    'textAnswer',
    yup
        .string()
        .required('This field is required')
        .test(
            'contains-keywords',
            `Answer must contain the keywords: ${props.question.keywords.join(', ')}`,
            (value) => {
           
                return props.question.keywords.every((keyword) =>
                    value?.toLowerCase().includes(keyword.toLowerCase())
                );
            }
        )
);


const emit = defineEmits(['update:modelValue']);
watch(textAnswer, (newValue) => {
    emit('update:modelValue', newValue);
});


textAnswer.value = props.modelValue || '';
</script>
