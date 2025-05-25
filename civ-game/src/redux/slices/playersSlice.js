import { createSlice } from '@reduxjs/toolkit';

const initialPlayers = [
  { nation: 'Chinese', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] },
  { nation: 'American', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] },
  { nation: 'Russian', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] },
  { nation: 'European', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] }
];

const playersSlice = createSlice({
  name: 'players',
  initialState: initialPlayers,
  reducers: {
    buyCard: (state, action) => {
      const { playerIndex, card } = action.payload;
      state[playerIndex].money -= card.cost;
      state[playerIndex].cards.push(card);
    },
    attackPlayer: (state, action) => {
      const { attackerIndex, targetIndex, damage } = action.payload;
      state[targetIndex].money = Math.max(0, state[targetIndex].money - damage);
      
      // Add to warWith lists if not already present
      if (!state[targetIndex].atWarWith.includes(state[attackerIndex].nation)) {
        state[targetIndex].atWarWith.push(state[attackerIndex].nation);
      }
      if (!state[attackerIndex].atWarWith.includes(state[targetIndex].nation)) {
        state[attackerIndex].atWarWith.push(state[targetIndex].nation);
      }
    },
    updatePlayer: (state, action) => {
      const { index, updates } = action.payload;
      state[index] = { ...state[index], ...updates };
    },
    removeCard: (state, action) => {
      const { playerIndex, cardId } = action.payload;
      state[playerIndex].cards = state[playerIndex].cards.filter(
        card => card.id !== cardId
      );
    },
    resetPlayers: () => initialPlayers
  }
});

export const { buyCard, attackPlayer, updatePlayer, resetPlayers,removeCard } = playersSlice.actions;

export default playersSlice.reducer;