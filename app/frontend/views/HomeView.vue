<template>
  <main>
    <h1>{{ title }}</h1>
    <p>Ruby on Rails {{ railsVersion }} · Vue {{ vueVersion }} · TypeScript</p>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { version as vueVersion } from 'vue'

const title = ref('Template App')
const railsVersion = '8.1.3'
</script>
