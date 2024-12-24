<template>
    <div class="max-w-2xl mx-auto p-4">
        <h2 class="text-xl font-bold mb-6">
            {{ $t('questionForm.question') }} {{ currentQuestionIndex + 1 }} {{ $t('questionForm.of') }} {{
                questions.length }}
        </h2>

    
        <component :is="questions[currentQuestionIndex].component" v-model="answers[currentQuestionIndex]"
            :question="questions[currentQuestionIndex]" :errors="errors[currentQuestionIndex]" class="mb-6" />

    
        <div class="flex gap-4 justify-center mt-8">
            <button @click="prevQuestion" :disabled="currentQuestionIndex === 0"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ $t('questionForm.previous') }}
            </button>
            <button @click="nextQuestion" :disabled="currentQuestionIndex === questions.length - 1"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ $t('questionForm.next') }}
            </button>
            <button v-if="currentQuestionIndex === questions.length - 1" @click="submitTest"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                {{ $t('questionForm.finish') }}
            </button>
        </div>

 
        <div v-if="testCompleted" class="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-bold mb-4">{{ $t('completion.testCompleted') }}</h3>
            <p v-if="unansweredQuestions.length > 0" class="text-red-600">
                {{ $t('completion.unansweredQuestions') }}{{ unansweredQuestions.join(', ') }}
            </p>
            <div v-else class="space-y-2">
                <p class="font-semibold">
                    {{ $t('completion.correctAnswers') }}{{ correctAnswers }}
                </p>
                <p class="font-semibold">
                    {{ $t('completion.successPercentage') }}{{ successPercentage }}%
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();


import SingleChoiceQuestion from './SingleChoiceQuestion.vue';
import MultipleChoiceQuestion from './MultipleChoiceQuestion.vue';
import NumericAnswerQuestion from './NumericAnswerQuestion.vue';
import YesNoQuestion from './YesNoQuestion.vue';
import DateQuestion from './DateQuestion.vue';
import KeywordTextQuestion from './KeywordTextQuestion.vue';


const questions = [
    {
        type: 'single',
        prompt: 'What is the capital of France?',
        options: ['Madrid', 'Berlin', 'Paris', 'London'],
        correctAnswer: 'Paris',
        component: SingleChoiceQuestion,
        validationSchema: yup.string().required('Please select an option'),
    },
    {
        type: 'multiple',
        prompt: 'Which of these cities are located in Europe?',
        options: ['Rome', 'Barcelona', 'Tokyo', 'Warsaw'],
        correctAnswer: ['Rome', 'Barcelona', 'Warsaw'],
        component: MultipleChoiceQuestion,
        validationSchema: yup.array().min(1, 'Select at least one option'),
    },
    {
        type: 'single',
        prompt: 'What is the longest river in the world?',
        options: ['Amazon', 'Yangtze', 'Nile', 'Mississippi'],
        correctAnswer: 'Nile',
        component: SingleChoiceQuestion,
        validationSchema: yup.string().required('Please select an option'),
    },
    {
        type: 'multiple',
        prompt: 'Which of the following are planets in the Solar System?',
        options: ['Venus', 'Mars', 'Sirius', 'Jupiter'],
        correctAnswer: ['Venus', 'Mars', 'Jupiter'],
        component: MultipleChoiceQuestion,
        validationSchema: yup.array().min(1, 'Select at least one option'),
    },
    {
        type: 'numeric',
        prompt: 'How many continents are there on Earth?',
        correctAnswer: 7,
        component: NumericAnswerQuestion,
        validationSchema: yup.number().required('A numeric answer is required'),
    },
    {
        type: 'date',
        prompt: 'When did the first human land on the Moon?',
        correctAnswer: '1969-07-21',
        component: DateQuestion,
        validationSchema: yup.date().required('A valid date is required'),
    },
    {
        type: 'yesno',
        prompt: 'Is Europe a continent?',
        correctAnswer: 'Yes',
        component: YesNoQuestion,
        validationSchema: yup.string().required('Please select Yes or No'),
    },
    {
        type: 'date',
        prompt: 'When did World War II begin?',
        correctAnswer: '1939-09-01',
        component: DateQuestion,
        validationSchema: yup.date().required('A valid date is required'),
    },
    {
        type: 'yesno',
        prompt: 'Is Japan part of Asia?',
        correctAnswer: 'Yes',
        component: YesNoQuestion,
        validationSchema: yup.string().required('Please select Yes or No'),
    },
    {
        type: 'text',
        prompt: 'Explain why it is important to study history?',
        keywords: ['history', 'important', 'knowledge'],
        component: KeywordTextQuestion,
        validationSchema: yup.string().required('This field is required'),
    },
    {
        type: 'date',
        prompt: 'When was the Declaration of Independence of the USA signed?',
        correctAnswer: '1776-08-02',
        component: DateQuestion,
        validationSchema: yup.date().required('A valid date is required'),
    },
    {
        type: 'single',
        prompt: 'What is the largest country in the world by area?',
        options: ['Canada', 'Russia', 'China', 'USA'],
        correctAnswer: 'Russia',
        component: SingleChoiceQuestion,
        validationSchema: yup.string().required('Please select an option'),
    },
    {
        type: 'multiple',
        prompt: 'Which of the following languages are official languages of the UN?',
        options: ['English', 'Spanish', 'Portuguese', 'French'],
        correctAnswer: ['English', 'Spanish', 'French'],
        component: MultipleChoiceQuestion,
        validationSchema: yup.array().min(1, 'Select at least one option'),
    },
    {
        type: 'text',
        prompt: 'Write three main reasons for the importance of global cooperation.',
        keywords: ['cooperation', 'global', 'reasons'],
        component: KeywordTextQuestion,
        validationSchema: yup.string().required('This field is required'),
    },
    {
        type: 'numeric',
        prompt: 'How many continents on Earth start with the letter "A"?',
        correctAnswer: 3,
        component: NumericAnswerQuestion,
        validationSchema: yup.number().required('A numeric answer is required'),
    },
];


const answers = reactive(Array(questions.length).fill(null));
const currentQuestionIndex = ref(0);
const testCompleted = ref(false);
const unansweredQuestions = ref([]);
const correctAnswers = ref(0);


const { validate } = useForm({
    validationSchema: yup.object(
        questions.reduce((schema, question, index) => {
            schema[index] = question.validationSchema;
            return schema;
        }, {})
    ),
});


const successPercentage = computed(() => ((correctAnswers.value / questions.length) * 100).toFixed(2));


const errors = reactive(Array(questions.length).fill(null));

const nextQuestion = async () => {
    if (await validateQuestion(currentQuestionIndex.value)) {
        currentQuestionIndex.value++;
    }
};

const prevQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
    }
};


const validateQuestion = async (index) => {
    try {
        await questions[index].validationSchema.validate(answers[index]);
        errors[index] = null;
        return true;
    } catch (error) {
        errors[index] = error.message;
        return false;
    }
};


const submitTest = async () => {
    const isValid = await validate();
    if (isValid) {
        unansweredQuestions.value = answers
            .map((answer, index) => (answer === null ? index + 1 : null))
            .filter((questionNumber) => questionNumber !== null);

        if (unansweredQuestions.value.length === 0) {
            calculateResults();
            testCompleted.value = true;
        }
    }
};


const calculateResults = () => {
    correctAnswers.value = answers.reduce((score, answer, index) => {
        const question = questions[index];

       
        if (question.type === 'text' && question.keywords) {
            const allKeywordsPresent = question.keywords.every((keyword) =>
                answer?.toLowerCase().includes(keyword.toLowerCase())
            );
            return score + (allKeywordsPresent ? 1 : 0);
        }

       
        if (Array.isArray(question.correctAnswer)) {
            const isCorrect = Array.isArray(answer) &&
                answer.length === question.correctAnswer.length &&
                answer.sort().every((val, i) => val === question.correctAnswer.sort()[i]);

            return score + (isCorrect ? 1 : 0);
        }

      
        return score + (answer === question.correctAnswer ? 1 : 0);
    }, 0);
};

</script>

<style scoped>
.navigation {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 10px;
    font-size: 1em;
}

span {
    color: red;
    font-size: 0.9em;
}

.error {
    color: red;
    font-size: 1em;
}
</style>