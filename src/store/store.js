import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      STOREallPlayerData: [],
      STOREitemTypes:[],
      STOREcurrentSelectedItem: null,
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
    STOREsetcurrentSelectedItem(state, data) {
      state.STOREcurrentSelectedItem = data;
      console.log('selected', state.STOREcurrentSelectedItem);
    },
    STOREsetcurrentHoveredObject(state, data) {
      state.STOREcurrentHoveredObject = data;
      // console.log('hovered', state.STOREcurrentHoveredObject);
    },
    STOREresetcurrentSelectedItem(state) {
      state.STOREcurrentSelectedItem = null;
      // console.log('selectedReset', state.STOREcurrentSelectedItem);

    }, STOREresetcurrentHoveredObject(state) {
      state.STOREcurrentHoveredObject = null;
      // console.log('hovered', state.STOREcurrentHoveredObject);
    },
    STOREsetItemTypes(state, data) {
      state.STOREitemTypes = data;
    }
  }
})

export default store

