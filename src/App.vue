<template>
  <div id="app" v-cloak="true">
    <el-row type="flex" tag="header" justify="start" align="middle">
      <a class="fa fa-2x fa-home" style="cursor: pointer;margin-right: 20px;"></a>
      <span class="gz-font--xl" style="flex: 1 1 auto;">管理后台</span>
      <span class="gz-font--md" style="margin-right: 12px;">廖红卫</span>
      <a class="fa fa-user" style="cursor: pointer;"></a>
    </el-row>
    <el-row type="flex" tag="main">
      <el-col>
        <el-menu mode="horizontal" style="background: red;">
          xxxxx
        </el-menu>
      </el-col>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { Row, Col, Menu, Icon } from 'element-ui';

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Menu.name]: Menu,
      [Icon.name]: Icon,
    },
    name: 'app',
  };
</script>

<style>
  html {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    width: 100%;
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  header {
    background-color: rgb(32, 160, 255);
    height: 64px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 1;
    box-sizing: border-box;
  }

  main {
    flex: 1 1 auto;
  }

  .gz-font--xl {
    font-size: 20px;
  }

  .gz-font--lg {
    font-size: 18px;
  }

  .gz-font--md {
    font-size: 16px;
  }

  .gz-font--sm {
    font-size: 14px;
  }

  .gz-font--xs {
    font-size: 13px;
  }

  .gz-font--xxs {
    font-size: 12px;
  }
</style>
