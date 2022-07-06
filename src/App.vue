<template>
  <v-app>
    <NavBar />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { NavBar },

  data: () => ({}),
  mounted() {
    this.$store.dispatch('session/subscribeToAuthStateChange')
  }
}
</script>

<style>
.layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 52px;
  font-weight: 300;
}
</style>
