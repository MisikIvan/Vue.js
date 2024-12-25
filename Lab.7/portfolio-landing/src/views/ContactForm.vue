<template>
    <v-container>
      <h2>Контактна форма</h2>
      <v-form ref="form" v-model="valid">
        <v-text-field label="Ім'я" v-model="name" :rules="[rules.required]" required></v-text-field>
        <v-text-field
          label="Email"
          v-model="email"
          :rules="[rules.required, rules.email]"
          required
        ></v-text-field>
        <v-text-field label="Тема" v-model="subject" :rules="[rules.required]" required></v-text-field>
        <v-textarea label="Повідомлення" v-model="message" :rules="[rules.required]" required></v-textarea>
        <v-btn :disabled="!valid" color="primary" @click="submitForm">Надіслати</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        subject: '',
        message: '',
        valid: false,
        rules: {
          required: (value) => !!value || 'Обов’язкове поле.',
          email: (value) => /.+@.+\..+/.test(value) || 'Невірний формат email.',
        },
      };
    },
    methods: {
      submitForm() {
        alert('Форма надіслана!');
      },
    },
  };
  </script>
  