<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="4">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          type="text"
          label="Name"
          autocomplete="name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          type="email"
          label="E-mail"
          autocomplete="username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="Password"
          autocomplete="current-password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="createAccount"
        >
          Create Account
        </v-btn>
      </v-form>

      <v-snackbar v-model="snackbar" color="error">
        {{ errorMessage }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "plain",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 30) || "Name must be less than 10 characters",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must minimums 6 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    snackbar: false,
    errorMessage: "",
  }),

  methods: {
    createAccount() {
      let formValidation = this.$refs.form.validate();

      if (formValidation) {
        this.$fire.auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            this.$fire.auth.currentUser
              .sendEmailVerification()
              .then(() => {
                // Email verification sent!
                // ...
              })
              .catch((error) => {
                console.log(
                  "Caught error in sending email verification link to user",
                  error
                );
              });

            const currentUser = this.$fire.auth.currentUser;
            currentUser
              .updateProfile({
                displayName: this.name,
                // photoURL: "https://example.com/jane-q-user/profile.jpg",
              })
              .then(() => {
                // Update successful
                // ...
              })
              .catch((error) => {
                console.log("update user profile error", error);
              });

            const authUser = {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
            };
            this.$store
              .dispatch("onAuthStateChangedAction", {
                authUser,
              })
              .then(() => {
                this.$router.replace("/member/desk");
              })
              .catch((error) => {
                console.log("User State error", error);
              });
          })
          .catch((error) => {
            console.log("Signup error", error);
            this.snackbar = true;
            this.errorMessage = error.message;
          });
      }
    },
  },
};
</script>
