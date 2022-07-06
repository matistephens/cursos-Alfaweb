<template>
  <div class="layout-container">
    <h2>Registro de Usuario</h2>
    <v-form
      @submit.prevent="handleSignUpFormSubmit"
      ref="signUpFormRef"
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

      <v-btn :disabled="!valid" color="success" class="mr-4" type="submit"> Registrarse </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Limpiar Formulario </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',
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
    ...mapActions('session', ['createUserWithEmailAndPassword']),
    async handleSignUpFormSubmit() {
      if (this.$refs.signUpFormRef.validate()) {
        await this.createUserWithEmailAndPassword(this.credentials), this.$router.push(`/`)
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style></style>
