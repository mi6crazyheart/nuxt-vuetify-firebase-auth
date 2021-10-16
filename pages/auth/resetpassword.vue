<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="4">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          type="email"
          label="E-mail"
          autocomplete="username"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="resetPassword"
        >
          Reset Password
        </v-btn>
      </v-form>

      <v-snackbar v-model="snackbar" color="error">
        {{ errorMessage }}
      </v-snackbar>

      <v-snackbar v-model="snackbarSuccess" color="success">
        {{ successMessage }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "plain",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    snackbar: false,
    errorMessage: "",
    snackbarSuccess: false,
    successMessage: "",
  }),

  methods: {
    resetPassword() {
      let formValidation = this.$refs.form.validate();

      if (formValidation) {
        this.$fire.auth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.snackbarSuccess = true;
            this.successMessage =
              "Reset Password link sent to your email address. Please check your inbox";
          })
          .catch((error) => {
            console.log("Reset Password error", error);
            this.snackbar = true;
            this.errorMessage = error.message;
          });
      }
    },
  },
};
</script>

<style>
</style>