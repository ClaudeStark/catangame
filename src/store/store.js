import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      STOREallPlayerData: [],
      STOREitemTypes:[],
      STOREcurrentSelectedItemType: null,
      STOREcurrentSelectedItemId: null,
      STOREcurrentHoveredObject: null
    }
  },
  mutations: {
    STOREsetAllPlayerData(state, data) {
      state.STOREallPlayerData = data
    },
    STOREresetPlayerPosition(state, boardPosition) {
      console.log(state)

      state.STOREallPlayerData.forEach(player => {
        if (player.board_position === boardPosition) {
          player.board_position = null;
        }
      })
    },
    STOREsetPlayerPosition(state, { boardPosition, playerName }) {
      console.log(state)

      state.STOREallPlayerData.forEach(player => {
        if (player.name === playerName) {
          player.board_position = boardPosition;
        }
      })
    },
    STOREsetCurrentSelectedItemType(state, data) {
      state.STOREcurrentSelectedItemType = data;
      console.log('selected', state.STOREcurrentSelectedItemType);
    },
    STOREsetCurrentHoveredObject(state, data) {
      state.STOREcurrentHoveredObject = data;
      // console.log('hovered', state.STOREcurrentHoveredObject);
    },
    STOREresetCurrentSelectedItemType(state) {
      state.STOREcurrentSelectedItemType = null;
      // console.log('selectedReset', state.STOREcurrentSelectedItem);

    }, STOREresetCurrentHoveredObject(state) {
      state.STOREcurrentHoveredObject = null;
      // console.log('hovered', state.STOREcurrentHoveredObject);
    },
    STOREsetItemTypes(state, data) {
      state.STOREitemTypes = data;
    },
    STOREsetCurrentSelectedItemId(state, data) {
      state.STOREcurrentSelectedItemId = data;
    },
    STOREresetCurrentSelectedItemId(state) {
      state.STOREcurrentSelectedItemId = null;
    }
  }
})

export default store

