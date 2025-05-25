import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPlayerIndex: 0,
  year: 1,
  maxYears: 10,
  winner: null,
  showStore: false,
  showAction: false,
  actionMessage: '',
  messageType:'info',
  currentCard: null,
  numberOfPlayers: 4,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextPlayer: (state) => {
      // First check if we're about to wrap around
      const isLastPlayer = state.currentPlayerIndex === state.numberOfPlayers - 1;
      state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.numberOfPlayers;
      if (isLastPlayer) {
        state.year += 1;
      }
    },
    incrementYear: (state) => {
      state.year += 1;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    toggleStore: (state, action) => {
      state.showStore = action.payload ?? !state.showStore;
    },
    toggleAction: (state, action) => {
      state.showAction = action.payload ?? !state.showAction;
    },
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    setActionMessage: (state, action) => {
      state.actionMessage = action.payload.message;
      state.messageType = action.payload.type;
    },
    clearMessage: (state) => {
      state.actionMessage = '';
      state.messageType = 'info';
    }
  }
});

export const { 
  nextPlayer, 
  incrementYear,
  setWinner,
  toggleStore,
  toggleAction,
  setCurrentCard,
  setActionMessage,
  clearMessage
} = gameSlice.actions;

export default gameSlice.reducer;