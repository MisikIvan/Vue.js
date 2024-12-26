<template>
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <EducationSection />
  <ProjectsSection />
</template>

<script>
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import EducationSection from './components/EducationSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';

export default {
  components: {
    HeroSection,
    AboutSection,
    SkillsSection,
    EducationSection,
    ProjectsSection,
  },
};
</script>
