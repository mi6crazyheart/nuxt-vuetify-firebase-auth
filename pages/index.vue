<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="4">
      <v-form ref="form" v-model="valid" lazy-validation>
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

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
          Login
        </v-btn>
      </v-form>
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
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
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
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    login() {
      let formValidation = this.$refs.form.validate();
      console.log("formValidation", formValidation);

      if (formValidation) {
        this.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(function (error) {
            console.log("login error", error.message);
            $nuxt.$router.push("/");
          })
          .then((user) => {
            this.$router.go("/profile");
          });
      }
    },
  },
};
</script>
