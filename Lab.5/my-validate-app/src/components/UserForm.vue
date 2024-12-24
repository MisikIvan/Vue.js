<template>
    <form @submit.prevent="onSubmit" class="max-w-md mx-auto">
        <div v-if="notification" class="mb-4 p-3 bg-red-50 text-red-600 rounded">
            {{ notification }}
        </div>

        <div class="mb-4">
            <label for="name" class="block font-bold mb-1">{{ $t('userForm.name') }}</label>
            <input id="name" :value="values.name" @input="setFieldValue('name', $event.target.value)"
                @blur="validateField('name')" type="text"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                :class="{ 'border-red-500': touched.name && errors.name }" />
            <span v-if="touched.name && errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</span>
        </div>

        <div class="mb-4">
            <label for="age" class="block font-bold mb-1">{{ $t('userForm.age') }}</label>
            <input id="age" :value="values.age" @input="setFieldValue('age', Number($event.target.value))"
                @blur="validateField('age')" type="number"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                :class="{ 'border-red-500': touched.age && errors.age }" />
            <span v-if="touched.age && errors.age" class="text-red-500 text-sm mt-1">{{ errors.age }}</span>
        </div>

        <div class="mb-4">
            <label for="email" class="block font-bold mb-1">{{ $t('userForm.email') }}</label>
            <input id="email" :value="values.email" @input="setFieldValue('email', $event.target.value)"
                @blur="validateField('email')" type="email"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                :class="{ 'border-red-500': touched.email && errors.email }" />
            <span v-if="touched.email && errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</span>
        </div>

        <div class="mb-4">
            <label for="phone" class="block font-bold mb-1">{{ $t('userForm.phone') }}</label>
            <input id="phone" :value="values.phone" @input="setFieldValue('phone', $event.target.value)"
                @blur="validateField('phone')" type="text"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                :class="{ 'border-red-500': touched.phone && errors.phone }" />
            <span v-if="touched.phone && errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</span>
        </div>

        <div class="mb-4">
            <label class="block font-bold mb-1">{{ $t('userForm.gender') }}</label>
            <select :value="values.gender" @change="setFieldValue('gender', $event.target.value)"
                @blur="validateField('gender')"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                :class="{ 'border-red-500': touched.gender && errors.gender }">
                <option disabled value="">{{ $t('userForm.selectGender') }}</option>
                <option value="male">{{ $t('userForm.male') }}</option>
                <option value="female">{{ $t('userForm.female') }}</option>
                <option value="other">{{ $t('userForm.other') }}</option>
            </select>
            <span v-if="touched.gender && errors.gender" class="text-red-500 text-sm mt-1">{{ errors.gender }}</span>
        </div>

        <button type="submit"
            class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            {{ $t('userForm.startTest') }}
        </button>
    </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { t } = useI18n();
const emit = defineEmits(['submit']);


const touched = reactive({
    name: false,
    age: false,
    email: false,
    phone: false,
    gender: false
});


const validationSchema = yup.object({
    name: yup
        .string()
        .min(2, t('validation.minLength', { min: 2 }))
        .required(t('validation.required')),
    age: yup
        .number()
        .typeError(t('validation.required'))
        .min(18, t('validation.minAge'))
        .required(t('validation.required')),
    email: yup
        .string()
        .email(t('validation.email'))
        .required(t('validation.required')),
    phone: yup
        .string()
        .matches(/^\d{10}$/, t('validation.phone'))
        .required(t('validation.required')),
    gender: yup
        .string()
        .required(t('validation.required'))
});


const { handleSubmit, errors, values, setFieldValue, validateField } = useForm({
    validationSchema,
    initialValues: {
        name: '',
        age: '',
        email: '',
        phone: '',
        gender: ''
    }
});


const notification = ref('');


const onSubmit = handleSubmit((values) => {
    console.log('Form values:', values);
    emit('submit', values);
}, (e) => {
    Object.keys(touched).forEach(key => {
        touched[key] = true;
    });
    console.log('Validation errors:', e);
    notification.value = t('validation.required');
});

</script>
