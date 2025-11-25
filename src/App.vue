<template>
  <h1>To Do Application</h1>

  <nav>

    <!-- <a href="/home.php">Home</a> -->

    <router-link to="/">
      Home
    </router-link>
     |
    <router-link to="/about">
      About
    </router-link>
      |
    <router-link to="/post">
      Post
    </router-link>
     |
    <router-link to="/lifecycle">
      Lifecycle
    </router-link>

  </nav>

  <main>
    <router-view></router-view>
  </main>



</template>

<script setup>
</script>

<style scoped></style>
