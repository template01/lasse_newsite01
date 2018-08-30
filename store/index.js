import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      initGameState: false
    },
    mutations: {
      SET_GAME_STATE (state,toggle) {
        state.initGameState = toggle
      }
    }
  })
}

export default createStore
