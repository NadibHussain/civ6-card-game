import { useState } from 'react';
import PlayerCard from './components/PlayerCard';
import Store from './components/Store';
import CardAction from './components/CardAction';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  // Game state
  const [players, setPlayers] = useState([
    { nation: 'Chinese', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] },
    { nation: 'American', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] },
    { nation: 'Russian', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] },
    { nation: 'European', money: 7, science: 0, victoryPoints: 0, cards: [], atWarWith: [] }
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showStore, setShowStore] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  // Store functions
  const handleBuyCard = (card) => {
    setPlayers(prev => prev.map((player, index) => 
      index === currentPlayerIndex 
        ? { 
            ...player, 
            money: player.money - card.cost,
            cards: [...player.cards, card] 
          }
        : player
    ));
    setShowStore(false);
  };

  // Card action functions
  const handleUseCard = (card) => {
    setCurrentCard(card);
    setShowAction(true);
  };

  const handleActionComplete = (updatedPlayers, message) => {
    setPlayers(updatedPlayers);
    setActionMessage(message);
    setShowAction(false);
    setTimeout(() => setActionMessage(''), 3000);
  };

  // Game progression
  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  return (
    <div className="position-relative vh-100 vw-100 bg-light">
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
          onOpenStore={() => index === currentPlayerIndex && setShowStore(true)}
          onUseCard={handleUseCard}
        />
      ))}

      {/* Store Modal */}
      <Store
        show={showStore}
        onHide={() => setShowStore(false)}
        onBuyCard={handleBuyCard}
        currentPlayer={players[currentPlayerIndex]}
      />

      {/* Card Action Modal */}
      <CardAction
        show={showAction}
        onHide={() => setShowAction(false)}
        card={currentCard}
        currentPlayer={players[currentPlayerIndex]}
        players={players}
        onActionComplete={handleActionComplete}
      />

      {/* Action Message */}
      {actionMessage && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3">
          <div className="alert alert-info">{actionMessage}</div>
        </div>
      )}

      {/* Game Controls */}
      <div className="position-absolute top-50 start-50 translate-middle">
        <button 
          className="btn btn-primary px-4 py-2"
          onClick={nextPlayer}
        >
          Next Player
        </button>
      </div>
    </div>
  );
}