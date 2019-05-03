import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    device: 'desktop',
    sensor: '--'
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SENSOR: (state, sensor) => {
      state.sensor = sensor
    },
  },
  actions: {
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSensor({ commit }, sensor) {
      commit('SET_SENSOR', sensor)
    },
  }
})
