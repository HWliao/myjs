<template>
  <div id="app">
    <header>
      <i class="el-icon-fa el-icon-fa-th-large el-icon-fa-2x" style="cursor: pointer;margin-right: 20px;"
         @click="doCollapseMenu"></i>
      <span class="gz-font--xl" style="flex: 1 1 auto;">管理后台</span>
      <span class="gz-font--md" style="margin-right: 12px;">廖红卫</span>
      <i class="el-icon-fa el-icon-fa-user" style="cursor: pointer;"></i>
    </header>
    <main>
      <div>
        <el-menu
          class="gz-menu-vertical"
          :default-active="currRoute"
          :collapse="!!collapse"
          router>
          <el-menu-item index="/" @click.native.stop="doHome">
            <i class="el-icon-fa-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">盖章管理</span>
            </template>
            <el-menu-item v-for="item in items" :index="item.path" :key="item.name">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div style="flex: 1;overflow-y: auto">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        items: [
          {
            name: 'seal',
            path: '/gz/seal',
            title: '印章信息',
            icon: 'el-icon-fa-envelope',
          }, {
            name: 'file',
            path: '/gz/file',
            title: '文件资料',
            icon: 'el-icon-fa-file',
          },
        ],
        collapse: false,
      };
    },
    computed: {
      currRoute() {
        return this.$route.path;
      },
    },
    methods: {
      doCollapseMenu() {
        this.collapse = this.collapse ? false : 'auto';
      },
      doHome() {
        window.open(`${window.location.origin}/jjslogin/index`);
      },
    },
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
    height: 100%;
    flex-direction: column;
  }

  header {
    background-color: rgb(101, 191, 96);
    color: #fff;
    height: 64px;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: row;
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

  .gz-menu-vertical {
    height: 100%;
  }

  .gz-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
  }

  .el-menu-item .fa {
    margin-right: 5px;
    width: 20px;
    text-align: center;
  }
</style>
