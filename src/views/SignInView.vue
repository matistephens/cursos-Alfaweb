<template>
  <div class="layout-container mt-4">
    <h2>Login de Usuario</h2>
    <v-form
      @submit.prevent="handleSignInFormSubmit"
      ref="signInFormRef"
      v-model="valid"
      lazy-validation
      class="form-style"
    >
      <v-text-field
        v-model="credentials.email"
        :rules="emailRules"
        label="Correo electrónico"
        required
      ></v-text-field>
      <v-text-field
        v-model="credentials.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Contraseña"
        counter
        @click:append="show = !show"
        class="mb-4"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" type="submit"> Iniciar sesión </v-btn>
      <v-btn color="error" class="mr-4" @click="reset"> Limpiar Formulario </v-btn>
      <router-link to="/sign-up">
        <v-btn text color="primary"> ¿No tienes cuenta? </v-btn>
      </router-link>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SignIn',
  data: () => ({
    valid: true,
    credentials: {
      email: '',
      password: ''
    },
    show: false,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Debe tener al menos 6 caractéres'
    },

    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'Ingresa un correo electrónico'
    ]
  }),
  methods: {
    ...mapActions('session', ['signInWithEmailAndPassword']),
    async handleSignInFormSubmit() {
      if (this.$refs.signInFormRef.validate()) {
        await this.signInWithEmailAndPassword(this.credentials), this.$router.push(`/`)
        this.dialog = false
        this.credentials = {
          email: '',
          password: ''
        }
      }
    },
    reset() {
      this.$refs.signInFormRef.reset()
    }
  }
}
</script>

<style>
.form-style {
  max-width: 650px;
}
</style>
