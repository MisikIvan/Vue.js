<template>
  <footer class="bg-gray-900 text-white py-6 text-center">
    <div class="flex justify-center gap-6 mb-6">
      <router-link to="/" class="hover:text-gray-400 transition-colors duration-300">{{ $t('navbar.home') }}</router-link>
      <router-link to="/products" class="hover:text-gray-400 transition-colors duration-300">{{ $t('navbar.products') }}</router-link>
      <router-link to="/cart" class="hover:text-gray-400 transition-colors duration-300">{{ $t('navbar.cart') }}</router-link>
      <router-link to="/login" class="hover:text-gray-400 transition-colors duration-300">{{ $t('navbar.login') }}</router-link>
    </div>
    <p class="text-sm">&copy; 2024 Grocery Store. {{ $t('footer.about_us') }} | {{ $t('footer.terms') }} | {{ $t('footer.privacy') }}</p>
    <p class="text-xs mt-2">{{ $t('footer.contact') }}: support@grocerystore.com</p>
  </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
  background-color: #1a202c;
  color: #edf2f7;
}

footer a {
  color: #edf2f7;
}

footer a:hover {
  color: #e2e8f0;
  text-decoration: underline;
}

footer p {
  color: #cbd5e0;
}

footer p.text-xs {
  color: #a0aec0;
}
</style>
