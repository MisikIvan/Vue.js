<template>
    <v-footer class="pa-3" color="primary" dark>
      <v-container>
        <v-row justify="space-between">
          <v-col cols="12" md="6">
            <p>&copy; {{ new Date().getFullYear() }} [Ваше ім'я]. Усі права захищені.</p>
          </v-col>
          <v-col cols="12" md="6" class="text-right">
            <v-btn icon v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank">
              <v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        socialLinks: [
          { name: 'GitHub', icon: 'mdi-github', url: '' },
          { name: 'LinkedIn', icon: 'mdi-linkedin', url: '' },
          { name: 'Twitter', icon: 'mdi-twitter', url: '' },
        ],
      };
    },
  };
  </script>
  