<template>
  <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <navbar/>

    <div class="container-fluid">
      <Nuxt/>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar";

export default {
  components: { navbar }
};
</script>

