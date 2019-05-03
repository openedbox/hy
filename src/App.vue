<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'

  export default {
    data () {
      return {
      }
    },
    mounted () {
      const { $store } = this
      deviceEnquire(deviceType => {

        switch (deviceType) {
          case DEVICE_TYPE.DESKTOP:
            $store.commit('TOGGLE_DEVICE', 'desktop')
            break
          case DEVICE_TYPE.TABLET:
            $store.commit('TOGGLE_DEVICE', 'tablet')
            break
          case DEVICE_TYPE.MOBILE:
          default:
            $store.commit('TOGGLE_DEVICE', 'mobile')
            break
        }
      })
    }
  }
</script>

<style lang="less">
  #app {
    height: 100%;
    background:rgb(240, 242, 245);
  }
</style>
