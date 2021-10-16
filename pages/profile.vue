<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> User Profile </v-card-title>
        <v-card-text>
          <p>This page is only for you.</p>
          <p>Your e-mail is {{ user ? user.email : "" }}</p>
          <v-btn @click="logout">Logout</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async logout() {
      await this.$fire.auth.signOut();
      this.$router.replace("/");
    },
  },
};
</script>

<style>
</style>