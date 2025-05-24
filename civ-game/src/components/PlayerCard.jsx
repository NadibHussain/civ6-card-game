import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function PlayerCard({ player, isActive, position, onOpenStore, onUseCard }) {
  const positionClasses = {
    'top-left': 'position-absolute top-0 start-0 m-3',
    'top-right': 'position-absolute top-0 end-0 m-3',
    'bottom-left': 'position-absolute bottom-0 start-0 m-3',
    'bottom-right': 'position-absolute bottom-0 end-0 m-3'
  };

  const nationColors = {
    Chinese: 'border-danger bg-red-50',
    American: 'border-primary bg-blue-50',
    Russian: 'border-success bg-green-50',
    European: 'border-warning bg-yellow-50'
  };

  const [showCards, setShowCards] = useState(false);

  return (
    <div className={`card ${positionClasses[position]} ${nationColors[player.nation]} ${isActive ? 'border-3 shadow-lg' : ''}`} style={{ width: '22rem' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h4 className="card-title fw-bold">{player.nation}</h4>
            <div className="d-flex gap-4 mt-2">
              <p className="card-text">💰 {player.money}M</p>
              <p className="card-text">🔬 {player.science} SP</p>
              <p className="card-text">⚔️ {player.victoryPoints} VP</p>
            </div>
          </div>
          
          {isActive && (
            <Button 
              variant="outline-primary"
              size="sm"
              onClick={onOpenStore}
            >
              Store
            </Button>
          )}
        </div>

        {player.atWarWith.length > 0 && (
          <div className="mt-2">
            <small className="text-danger">⚔️ At war with: {player.atWarWith.join(', ')}</small>
          </div>
        )}

        {player.cards?.length > 0 && (
          <div className="mt-3">
            <Button 
              variant="link"
              size="sm"
              className="p-0 text-decoration-none"
              onClick={() => setShowCards(!showCards)}
            >
              {showCards ? 'Hide Cards' : `Show Cards (${player.cards.length})`}
            </Button>
            
            {showCards && (
              <div className="mt-2">
                {player.cards.map((card, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-light text-dark text-start flex-grow-1">
                      <strong>{card.name}:</strong> {card.effect}
                    </span>
                    {isActive && card.type === 'Military' && (
                      <Button 
                        variant="outline-danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => onUseCard(card)}
                      >
                        Use
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}