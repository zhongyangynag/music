<template>
<div>
  <banner @handle="handleSelect"/>
  <router-view></router-view>
</div>
</template>

<script>
    import Banner from "@/components/Banner";
    import $router from "@/router/index.js";
    export default {
        name: "HomePage",
      components: {Banner},
    data() {
      return {
      };
    },
    methods: {
      handleSelect(key) {
        $router.replace(key);
        console.log(key);
      },
    }
    }
</script>

<style scoped lang="scss">

</style>
