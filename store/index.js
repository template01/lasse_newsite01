import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      initGameState: false,
      chatOpen: false
    },
    getters: {
      GET_CHAT_STATE: state => {
        return state.chatOpen
      }
    },
    mutations: {
      SET_GAME_STATE(state, toggle) {
        state.initGameState = toggle
      },
      SET_CHAT_STATE(state, toggle) {
        state.chatOpen = toggle
      }
    }
  })
}

export default createStore
