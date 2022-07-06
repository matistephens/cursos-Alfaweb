<template>
  <div>
    <v-app-bar color="deep-purple" dense dark>
      <v-app-bar-nav-icon @click="drawer = true" v-if='user'></v-app-bar-nav-icon>

      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>

      <v-spacer></v-spacer>


      <SignOutBtn v-if='user' :userEmail="user.email"/>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/admin">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-shield-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import SignOutBtn from '@/components/SingOutBtn.vue'
export default {
  name: 'navbar',
  data: () => ({
    drawer: false,
    group: null
  }),
  computed: {
    ...mapState('session', ['user'])
  },
  components: {
    SignOutBtn
  }
}
</script>

<style>
.v-application a {
  text-decoration: none;
}
</style>
