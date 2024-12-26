<template>
  <v-container>
    <h2 class="text-center mb-6">Мої навички</h2>
    <v-row>
      <v-col
        v-for="(skill, index) in skills"
        :key="index"
        cols="12"
        md="4"
        class="d-flex justify-center mb-4"
      >
        <v-card class="pa-4" outlined>
          <v-card-title class="text-center">
            <v-icon color="primary">{{ skill.icon }}</v-icon>
          </v-card-title>
          <v-card-subtitle class="text-center">{{ skill.name }}</v-card-subtitle>
          <v-card-text>
            <v-progress-linear
              :value="skill.level"
              color="success"
              height="20"
              class="mb-4"
            ></v-progress-linear>
            <div class="text-center">{{ skill.level }}%</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { name: 'JavaScript', level: 80, icon: 'mdi-language-javascript' },
        { name: 'Vue.js', level: 75, icon: 'mdi-vuejs' },
        { name: 'HTML/CSS', level: 90, icon: 'mdi-language-html5' },
      ],
    };
  },
};
</script>

<style scoped>
.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.v-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
