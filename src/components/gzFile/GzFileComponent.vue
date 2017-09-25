<template>
  <el-row type="flex" class="seal" tag="section">
    <el-col>x</el-col>
    <el-col>x</el-col>
    <el-col>x</el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'gzFile',
    data() {
      return {
        test: 'file',
      };
    },
  };
</script>
<style scoped>
  .seal {
    height: 100%;
    flex-direction: column;
  }
</style>
