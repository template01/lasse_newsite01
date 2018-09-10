import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      initGameState: false,
      chatOpen: false,
      scrollPosTop: 0,
      chatWasStarted:0,
      chatFirstRun: true
    },
    getters: {
      GET_CHAT_FIRST_RUN: state => {
        return state.chatFirstRun
      },
      GET_CHAT_STATE: state => {
        return state.chatOpen
      },
      GET_SCROLLPOSTOP: state => {
        return state.scrollPosTop
      }
    },
    mutations: {
      SET_GAME_STATE(state, toggle) {
        state.initGameState = toggle
      },
      SET_CHAT_STATE(state, toggle) {
        state.chatOpen = toggle
        if(state.chatWasStarted>0){
          state.chatFirstRun = false
        }
        state.chatWasStarted = state.chatWasStarted+1
      },
      SET_SCROLLPOSTOP(state, pos) {
        state.scrollPosTop = pos
      }
    }
  })
}

export default createStore
