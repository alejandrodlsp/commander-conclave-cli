import { createStore } from 'vuex'

import alerts from './alerts'
import room from './room'

const store = createStore({
  modules: {
    alerts,
    room
  }
})

export default store
