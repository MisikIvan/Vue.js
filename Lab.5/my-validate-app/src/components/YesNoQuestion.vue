<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <div class="space-y-1">
            <div class="flex items-center space-x-2">
                <input type="radio" id="yes" value="Yes" v-model="yesNoAnswer"
                    class="form-radio text-blue-500 focus:ring-blue-500" />
                <label for="yes" class="text-gray-700">Yes</label>
            </div>
            <div class="flex items-center space-x-2">
                <input type="radio" id="no" value="No" v-model="yesNoAnswer"
                    class="form-radio text-blue-500 focus:ring-blue-500" />
                <label for="no" class="text-gray-700">No</label>
            </div>
        </div>
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


const { value: yesNoAnswer, errorMessage: error } = useField(
    'yesNoAnswer',
    yup.string().required('Please select Yes or No')
);


const emit = defineEmits(['update:modelValue']);
watch(yesNoAnswer, (newValue) => {
    emit('update:modelValue', newValue);
});


yesNoAnswer.value = props.modelValue || '';
</script>
