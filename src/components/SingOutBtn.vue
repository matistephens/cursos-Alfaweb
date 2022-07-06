<template>
  <div class="log-out">
    <v-toolbar-title style="font-size: 16px">{{ userEmail }}</v-toolbar-title>
    <v-btn icon @click="signOutSession()">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    userEmail: String
  },
  methods: {
    ...mapActions("session", ["signOut"]),
    async signOutSession() {
      await this.signOut(), this.$router.push(`/sign-in`);
    },
  },
}
</script>

<style>
.log-out {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
