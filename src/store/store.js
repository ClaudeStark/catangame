import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      STOREallPlayerData: [],
      STOREcolors: []
    }
  },
  mutations: {
    STOREsetAllPlayerData(state, data){
      state.STOREallPlayerData = data
    },
    STOREresetPlayerPosition(state, boardPosition){
      state.STOREallPlayerData.forEach(player => {
            if (player.board_position === boardPosition) {
              player.board_position = null;
            }
        })
    },
    STOREsetPlayerPosition(state, {boardPosition, playerName}){
      state.STOREallPlayerData.forEach(player => {
        console.log(player)
            if (player.name === playerName) {
              player.board_position = boardPosition;
            }
        })
    },
    STOREsetColors(state, data){
      state.STOREcolors = data
    }
  }
})

export default store

