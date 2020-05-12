<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎来到洗车后台 dad</div>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  computed: {
  },
  mounted(){
    // console.log(this.$store);
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
