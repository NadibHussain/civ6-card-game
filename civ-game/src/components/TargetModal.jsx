import React from 'react';
import Button from 'react-bootstrap/Button';

export default function TargetModal({ 
  title,
  description,
  players,
  currentPlayer,
  onSelect,
  buttonVariant = 'danger',
  disabledCondition = (player) => player.money <= 0
}) {
  // Filter players first and preserve original indexes
  const eligibleTargets = players
    .map((player, originalIndex) => ({ player, originalIndex }))
    .filter(({ player }) => player.nation !== currentPlayer.nation);

  return (
    <div className="card-action-container m-4">
      <h4 className="mb-3">{title}</h4>
      <p className="text-muted mb-3">{description}</p>
      <div className="target-list">
        {eligibleTargets.map(({ player, originalIndex }) => (
          <Button
            key={player.nation}
            variant={`outline-${buttonVariant}`}
            className="mb-2 w-100 text-start"
            onClick={() => onSelect(originalIndex)} // Use original index
            disabled={disabledCondition(player)}
          >
            <span className="nation">{player.nation}</span>
            <span className="float-end">💰 {player.money}M</span>
          </Button>
        ))}
      </div>
    </div>
  );
}