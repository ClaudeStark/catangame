import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      STOREallPlayerData: []
    }
  },
  mutations: {
    STOREsetAllPlayerData(state, data){
      state.STOREallPlayerData = data
    },
    STOREresetPlayerPosition(state, boardPosition){
      console.log(state)

      state.STOREallPlayerData.forEach(player => {
            if (player.board_position === boardPosition) {
              player.board_position = null;
            }
        })
    },
    STOREsetPlayerPosition(state, {boardPosition, playerName}){
      console.log(state)

      state.STOREallPlayerData.forEach(player => {
            if (player.name === playerName) {
              player.board_position = boardPosition;
            }
        })
    },
  }
})

export default store

