import { DEVICE_TYPE } from './device'
import { mapState } from 'vuex'

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.device,
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

export { mixinDevice }