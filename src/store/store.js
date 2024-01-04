import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      STOREallPlayerData: [],
      STOREitemTypes: [],
      STOREcurrentSelectedItemType: null,
      STOREcurrentSelectedItemId: null,
      STOREplayerStats:[],
      STOREdraggedCard: null
    }
  },
  mutations: {
    STOREsetAllPlayerData(state, data) {
      state.STOREallPlayerData = data
    },
    STOREsetPlayerStats(state, data) {
      state.STOREplayerStats = data
    },
    STOREresetPlayerPosition(state, boardPosition) {
      state.STOREallPlayerData.forEach(player => {
        if (player.board_position === boardPosition) {
          player.board_position = null;
        }
      })
    },
    STOREsetPlayerPosition(state, { boardPosition, playerName }) {
      state.STOREallPlayerData.forEach(player => {
        if (player.name === playerName) {
          player.board_position = boardPosition;
        }
      })
    },
    STOREsetCurrentSelectedItemType(state, data) {
      state.STOREcurrentSelectedItemType = data;
    },
    STOREresetCurrentSelectedItemType(state) {
      state.STOREcurrentSelectedItemType = null;

    },
    STOREsetItemTypes(state, data) {
      state.STOREitemTypes = data;
    },
    STOREsetCurrentSelectedItemId(state, data) {
      state.STOREcurrentSelectedItemId = data;
    },
    STOREresetCurrentSelectedItemId(state) {
      state.STOREcurrentSelectedItemId = null;
    },
    STOREsetDraggedCard(state, data) {
      state.STOREdraggedCard = data;
    },
  }
})

export default store

