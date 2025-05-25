import { useSelector, useDispatch } from 'react-redux';
import backgroundImage from './assets/background.png'; 
import { Modal, Button } from 'react-bootstrap';
import PlayerCard from './components/PlayerCard';
import Store from './components/CardStore';
import CardAction from './components/CardAction';
import AlertMessage from './components/AlertMessage'; // Import the new component
import { 
  nextPlayer,
  toggleStore,
  toggleAction,
  setCurrentCard,
  setActionMessage,
  incrementYear,
  clearMessage
} from './redux/slices/gameSlice';
import { 
  buyCard, 
  updatePlayer, 
} from './redux/slices/playersSlice';

export default function App() {
  const dispatch = useDispatch();
  const { 
    year, 
    maxYears, 
    currentPlayerIndex, 
    showStore, 
    showAction, 
    currentCard,
    actionMessage,
    messageType 
  } = useSelector(state => state.game);
  
  const players = useSelector(state => state.players);
  const currentPlayer = players[currentPlayerIndex];

  // Handle buying cards from store
  const handleBuyCard = (card) => {
    dispatch(buyCard({ 
      playerIndex: currentPlayerIndex, 
      card 
    }));

    dispatch(toggleStore(false));
    dispatch(setActionMessage({
      message: `Purchased ${card.name} for ${card.cost}M`,
      type: 'success'
    }));
  };

  // Handle card actions
  const handleActionComplete = (res) => {
    dispatch(setActionMessage({
      message: res.message,
      type: res.type || 'info'
    }));
    dispatch(toggleAction(false));
  };

  // Handle using cards
  const handleUseCard = (card) => {
    dispatch(setCurrentCard(card));
    dispatch(toggleAction(true));
  };

  // Handle next player turn with year increment
  const handleNextPlayer = () => {
    const isLastPlayer = currentPlayerIndex === players.length - 1;
    dispatch(nextPlayer());
    
    if (isLastPlayer) {
      // Process year-end effects
      players.forEach((player, index) => {
        const factoryCards = player.cards.filter(card => card.name === 'Factory');
        if (factoryCards.length > 0) {
          const income = player.atWarWith.length === 0 ? 2 : 1;
          dispatch(updatePlayer({
            index,
            updates: { money: player.money + income * factoryCards.length }
          }));
        }
      });
    }
  };

  const handleCloseAlert = () => {
    dispatch(clearMessage());
  };

  return (
    
    <div className="position-relative vh-100 vw-100 bg-light">
      <div 
        className="position-relative vh-100 vw-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="position-absolute top-0 start-50 translate-middle-x mt-3">
        <div className="bg-white p-2 rounded shadow-sm">
          <h4 className="m-0">Year: {year}/{maxYears}</h4>
        </div>
      </div>

      {/* Player Cards */}
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          player={player}
          isActive={index === currentPlayerIndex}
          position={
            index === 0 ? 'top-left' :
            index === 1 ? 'top-right' :
            index === 2 ? 'bottom-left' : 'bottom-right'
          }
          onOpenStore={() => index === currentPlayerIndex && dispatch(toggleStore(true))}
          onUseCard={handleUseCard}
        />
      ))}

      {/* Store Modal */}
      <Store
        show={showStore}
        onHide={() => dispatch(toggleStore(false))}
        onBuyCard={handleBuyCard}
        currentPlayer={currentPlayer}
      />

      {/* Card Action Modal */}
      <Modal show={showAction} onHide={() => dispatch(toggleAction(false))} centered>
        {currentCard && (
          <CardAction
            card={currentCard}
            currentPlayer={currentPlayer}
            players={players}
            onComplete={handleActionComplete}
            onHide={() => dispatch(toggleAction(false))}
          />
        )}
      </Modal>

      {/* Game Controls */}
      <div className="position-absolute top-50 start-50 translate-middle">
        <Button 
          variant="primary"
          size="lg"
          onClick={handleNextPlayer}
        >
          Next Player
        </Button>
      </div>

      {/* Alert Message Component */}
      <AlertMessage 
        show={!!actionMessage}
        message={actionMessage} 
        type={messageType || 'info'} 
        onClose={handleCloseAlert}
      />
    </div>
  );
}