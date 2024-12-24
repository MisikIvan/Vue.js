<template>
  <div class="login max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">{{ $t('login.title') }}</h1>

    <form @submit.prevent="loginUser">
      <label class="block text-lg font-medium mb-2">{{ $t('login.username') }}</label>
      <input
        v-model="username"
        type="text"
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your username"
        required
      />

      <label class="block text-lg font-medium mb-2">{{ $t('login.password') }}</label>
      <input
        v-model="password"
        type="password"
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
        required
      />

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
      >
        {{ $t('login.login_button') }}
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-500 mt-4 text-center text-sm">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';


const userStore = useUserStore();


const username = ref('');
const password = ref('');
const errorMessage = ref('');


function loginUser() {
  if (username.value === 'user' && password.value === 'password') { // Simple check for example
    userStore.login({ username: username.value }); // Log the user in with a dummy username
    errorMessage.value = '';
    alert(`Welcome, ${username.value}!`);
  } else {
    errorMessage.value = 'Invalid username or password.';
  }
}
</script>

<style scoped>
.login {
  margin-top: 50px;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #1e40af;
}

button {
  background-color: #2563eb;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #1d4ed8;
}

p {
  font-size: 0.875rem;
}
</style>
