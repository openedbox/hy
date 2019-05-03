<template>
  <a-layout id="components-layout-top" class="layout">
    <a-layout-header>
      <div class="logo">
          魏宏宇 IoT 
      </div>
      <a-menu
        v-if="this.isDesktop()"
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link :to="{ name: 'dashboard' }">
            <a-icon type="fund"/>
            <span>仪表盘</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{ name: 'pi' }">
            <a-icon type="setting"/>
            <span>远程控制</span>
          </router-link>
        </a-menu-item>
      </a-menu>

    </a-layout-header>
    <a-layout-content  class="content" style="padding: 0 50px;">
      <div style="margin-top:24px;">
        <router-view/>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      @HONGYUYA {{this.isMobile()}}
    </a-layout-footer>
  </a-layout>
  
</template>

<script>
  import { mixinDevice } from '@/utils/mixin.js'

  export default {
    name: 'Layout',
    mixins: [mixinDevice],
    data () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
#components-layout-top{

  .logo {
    /* width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 24px 16px 0; */
    float: left;
    color:#fff;
    margin-right: 30px;
    margin-left: 30px;
    font-size: 30px;
  }

  .content {
  }
}


</style>
