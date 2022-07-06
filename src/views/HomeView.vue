<template>
  <div class="layout-container">
    <h1>Lista de Cursos</h1>
    <CardCourse />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardCourse from '@/components/CardCourse.vue'
export default {
  name: 'Home',
  computed: {
    ...mapGetters('session', ['activeLogin'])
  },
  mounted() {
    // this.$store.dispatch('session/subscribeToAuthStateChange')
  },
  components: {
    CardCourse
  }
}
</script>
