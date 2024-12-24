<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Форма Резюме</h1>
      <form @submit.prevent="handleSubmit(onSubmit)">
        <!-- Особиста Інформація -->
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Особиста Інформація</h2>
          <InputField
            label="Ім'я"
            id="firstName"
            v-model="form.firstName"
            :errors="errors.firstName"
          />
          <!-- Інші поля особистої інформації -->
          <!-- Додайте інші поля аналогічно -->
          <RadioGroup
            label="Стать"
            :options="genderOptions"
            v-model="form.gender"
            :errors="errors.gender"
          />
          <SelectField
            label="Сімейний стан"
            id="maritalStatus"
            :options="maritalOptions"
            v-model="form.maritalStatus"
            :errors="errors.maritalStatus"
          />
          <!-- Додайте решту полів -->
        </section>
  
        <!-- Освіта -->
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Освіта</h2>
          <!-- Поля освіти -->
        </section>
  
        <!-- Професійний Досвід -->
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Професійний Досвід</h2>
          <div v-for="(exp, index) in form.workExperience" :key="index">
            <WorkExperience
              :experience="exp"
              :errors="errors.workExperience?.[index]"
              @remove="removeWorkExperience(index)"
            />
          </div>
          <button type="button" @click="addWorkExperience" class="text-blue-500">Додати Досвід</button>
        </section>
  
        <!-- Проекти -->
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Проекти</h2>
          <div v-for="(proj, index) in form.projects" :key="index">
            <ProjectField
              :project="proj"
              :errors="errors.projects?.[index]"
              @remove="removeProject(index)"
            />
          </div>
          <button type="button" @click="addProject" class="text-blue-500">Додати Проект</button>
        </section>
  
        <!-- Соціальні Мережі -->
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Соціальні Мережі</h2>
          <!-- Поля соціальних мереж -->
        </section>
  
        <!-- Завантаження Файлів -->
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Завантаження Файлів</h2>
          <!-- Компоненти FileUpload -->
        </section>
  
        <!-- Google reCAPTCHA -->
        <section class="mb-6">
          <ReCaptcha
            sitekey="6Lde9qQqAAAAAJhBCah9lqus8rY5_8NEaAwpdy2Y"
            v-model="recaptchaToken"
            @verify="onRecaptchaVerified"
          />
          <span v-if="errors.recaptcha" class="text-red-500 text-sm">{{ errors.recaptcha }}</span>
        </section>
  
        <!-- Кнопка Надсилання -->
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Надіслати</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, reactive, onMounted, watch } from 'vue'
  import { useForm } from 'vee-validate'
  import * as yup from 'yup'
  import InputField from '../components/InputField.vue'
  import RadioGroup from '../components/RadioGroup.vue'
  import CheckboxGroup from '../components/CheckboxGroup.vue'
  import DatePicker from '../components/DatePicker.vue'
  import FileUpload from '../components/FileUpload.vue'
  import WorkExperience from '../components/WorkExperience.vue'
  import ProjectField from '../components/ProjectField.vue'
  import ReCaptcha from 'vue-recaptcha'
  
  export default {
    components: {
      InputField,
      RadioGroup,
      CheckboxGroup,
      DatePicker,
      FileUpload,
      WorkExperience,
      ProjectField,
      ReCaptcha,
    },
    setup() {
      const recaptchaToken = ref(null)
  
      const genderOptions = [
        { label: 'Чоловік', value: 'male' },
        { label: 'Жінка', value: 'female' },
        { label: 'Не вказано', value: 'not_specified' },
      ]
  
      const maritalOptions = [
        { label: 'Не у шлюбі', value: 'single' },
        { label: 'У шлюбі', value: 'married' },
        { label: 'Розлучений(а)', value: 'divorced' },
      ]
  
      // Інші опції селекторів
  
      const form = reactive({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        maritalStatus: '',
        nationality: '',
        readyToRelocate: false,
        // Освіта
        educationLevel: '',
        specialization: '',
        institution: '',
        graduationYear: '',
        additionalCourses: [],
        // Професійний досвід
        workExperience: [],
        // Мови
        nativeLanguage: '',
        otherLanguages: [],
        englishLevel: '',
        otherLanguagesLevels: [],
        // Навички
        professionalSkills: '',
        leadershipSkills: 0,
        teamworkSkills: 0,
        computerSkills: [],
        drivingLicense: false,
        // Додаткові поля
        readyForBusinessTrips: false,
        hasOwnTransport: false,
        expectedSalary: '',
        willingToOvertime: false,
        additionalSkills: '',
        // Завантаження файлів
        candidatePhoto: null,
        resume: null,
        coverLetter: null,
        certificates: [],
        portfolio: null,
        // Проекти
        projects: [],
        // Соціальні мережі
        linkedin: '',
        github: '',
        facebook: '',
        otherProfiles: '',
        // Захист від ботів
        recaptcha: '',
      })
  
      // Валідація схеми
      const validationSchema = yup.object({
        firstName: yup.string().required('Ім\'я є обов\'язковим'),
        lastName: yup.string().required('Прізвище є обов\'язковим'),
        dateOfBirth: yup.date().required('Дата народження є обов\'язковою'),
        email: yup.string().email('Некоректний email').required('Email є обов\'язковим'),
        phone: yup.string().required('Номер телефону є обов\'язковим'),
        address: yup.string().required('Адреса є обов\'язковою'),
        gender: yup.string().required('Стать є обов\'язковою'),
        maritalStatus: yup.string().required('Сімейний стан є обов\'язковим'),
        nationality: yup.string().required('Державність є обов\'язковою'),
        // Додайте решту полів до схеми
        recaptcha: yup.string().required('Підтвердіть, що ви не бот'),
      })
  
      const { handleSubmit, errors } = useForm({
        validationSchema,
        initialValues: form,
      })
  
      const onSubmit = (values) => {
        // Обробка відправки форми
        console.log('Form Submitted:', values)
        // Можна виконати API запит тут
        // Очистити localStorage після успішної відправки
        localStorage.removeItem('resumeForm')
      }
  
      // Збереження прогресу у localStorage
      onMounted(() => {
        const savedForm = localStorage.getItem('resumeForm')
        if (savedForm) {
          Object.assign(form, JSON.parse(savedForm))
        }
      })
  
      watch(form, () => {
        localStorage.setItem('resumeForm', JSON.stringify(form))
      }, { deep: true })
  
      // Додавання та видалення досвіду роботи
      const addWorkExperience = () => {
        form.workExperience.push({
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
          hasRecommendation: false,
          referenceContact: '',
        })
      }
  
      const removeWorkExperience = (index) => {
        form.workExperience.splice(index, 1)
      }
  
      // Додавання та видалення проектів
      const addProject = () => {
        form.projects.push({
          name: '',
          description: '',
          role: '',
          link: '',
        })
      }
  
      const removeProject = (index) => {
        form.projects.splice(index, 1)
      }
  
      // Обробка reCAPTCHA
      const onRecaptchaVerified = (token) => {
        recaptchaToken.value = token
        form.recaptcha = token
      }
  
      return {
        form,
        errors,
        handleSubmit,
        onSubmit,
        genderOptions,
        maritalOptions,
        addWorkExperience,
        removeWorkExperience,
        addProject,
        removeProject,
        recaptchaToken,
        onRecaptchaVerified,
      }
    },
  }
  </script>
  