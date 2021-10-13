<template>
  <div><h1>Session Verification Page</h1></div>
</template>

<script>
export default {
  beforeCreate() {
    console.log(
      "In Session page - this.$fire.auth",
      this.$fire.auth.currentUser
    );

    if (this.$fire.auth.currentUser) {
      this.$router.replace("/profile");
    } else {
      this.$router.replace("/");
    }
  },
};
</script>

<style>
</style>