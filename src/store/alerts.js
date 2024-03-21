export default {
  namespaced: true,

  state: {
    alerts: ''
  },

  getters: {
    getGlobalAlerts: (state) => state.alerts,
  },

  mutations: {
    setGlobalAlert (state, message) {
      state.alerts = (message)
    },
    clearGlobalAlerts(state) {
      state.alerts = ''
    }
  }
}
