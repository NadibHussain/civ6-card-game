import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import playersReducer from './slices/playersSlice';

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('New state:', store.getState());
  return result;
};
export default configureStore({
  reducer: {
    game: gameReducer,
    players: playersReducer
  }, 
   middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware)
});