import { CARD_ACTIONS } from './CardEffect';
import { useDispatch } from 'react-redux';
import { updatePlayer, removeCard } from '../redux/slices/playersSlice'; // Add this import
import TargetModal from './TargetModal';
export default function CardAction({ card, currentPlayer, players, onComplete }) {
  const dispatch = useDispatch();
  
  const handleAction = (targetIndex = null) => {
    try {
      const targetPlayer = targetIndex !== null ? players[targetIndex] : null;
      const actionResult = CARD_ACTIONS[card.action](
        currentPlayer, 
        targetPlayer
      );
      
      // Apply the results
      if (actionResult.currentPlayer) {
        dispatch(updatePlayer({
          index: players.findIndex(p => p.nation === currentPlayer.nation),
          updates: actionResult.currentPlayer
        }));
      }
      if (actionResult.targetPlayer && targetIndex !== null) {
        dispatch(updatePlayer({
          index: targetIndex,
          updates: actionResult.targetPlayer
        }));
      }
      
      // Remove consumable cards
      if (card.consumable) {
        dispatch(removeCard({
          playerIndex: players.findIndex(p => p.nation === currentPlayer.nation),
          cardId: card.id
        }));
      }
      onComplete({message:actionResult.message,type:actionResult.type});
    } catch (error) {
      onComplete({message:"Action failed: " + error.message,messageType:"error"});
    }
  };

  // Render appropriate UI based on action type
  switch(card.action) {
    case 'attack':
      return (
        <TargetModal
          title="Attack Target Selection"
          description="65% chance to reduce 2-3M from target"
          players={players}
          currentPlayer={currentPlayer}
          onSelect={handleAction}
          buttonVariant="danger"
          disabledCondition={(player) => player.money <= 0}
        />
      );
      case 'steal':
        return (
          <TargetModal
            title="Spy Target Selection"
            description="55% chance to steal 1-2M from target"
            players={players}
            currentPlayer={currentPlayer}
            onSelect={handleAction}
            buttonVariant="warning"
            disabledCondition={(player) => player.money <= 0}
          />
        );
  }
}