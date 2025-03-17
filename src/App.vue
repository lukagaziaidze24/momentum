<template>
  <router-view/>
</template>

<script>
import axios from 'axios';
export default {
  mounted(){
    this.setBaseLink();
  },
  methods: {
    setBaseLink(){
      axios.defaults.baseURL = 'https://momentum.redberryinternship.ge/api/';
      axios.defaults.headers.common.Authorization = `Bearer 9e6c9bba-2adb-4e5d-b83c-a5f53e69c9c2`;
    }
  }
}
</script>
<style lang="scss">
#app{
  background-color: var(--main-background-color);
}
</style>
