import { Modal, Button, Alert } from 'react-bootstrap';

export default function CardAction({ 
  show, 
  onHide, 
  card, 
  currentPlayer, 
  players, 
  onActionComplete 
}) {
  // Safe default if card is null
  if (!card) {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>No Card Selected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">No card was selected for this action.</Alert>
        </Modal.Body>
      </Modal>
    );
  }

  const handleAttack = (targetPlayer) => {
    if (!targetPlayer) return;
    
    const isSuccess = Math.random() < 0.65;
    const damage = isSuccess ? Math.floor(Math.random() * 2) + 2 : 0;

    const updatedPlayers = players.map(p => {
      if (p.nation === targetPlayer.nation) {
        return {
          ...p,
          money: Math.max(0, p.money - damage),
          atWarWith: [...new Set([...p.atWarWith, currentPlayer.nation])]
        };
      }
      if (p.nation === currentPlayer.nation) {
        return {
          ...p,
          atWarWith: [...new Set([...p.atWarWith, targetPlayer.nation])]
        };
      }
      return p;
    });

    onActionComplete(
      updatedPlayers,
      isSuccess 
        ? `Attack succeeded! ${targetPlayer.nation} lost ${damage}M` 
        : 'Attack failed!'
    );
  };

  const renderActionContent = () => {
    switch (card.name) {
      case 'Infantry':
        return (
          <>
            <p className="mb-3">65% chance to reduce 2-3M from target</p>
            <h6>Select target:</h6>
            <div className="d-grid gap-2">
              {players
                .filter(p => p.nation !== currentPlayer.nation)
                .map(player => (
                  <Button
                    key={player.nation}
                    variant="outline-danger"
                    onClick={() => handleAttack(player)}
                  >
                    Attack {player.nation} (💰 {player.money}M)
                  </Button>
                ))}
            </div>
          </>
        );
      
      // Add other card actions here
      default:
        return <Alert variant="warning">No action defined for this card type.</Alert>;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Use {card.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderActionContent()}
      </Modal.Body>
    </Modal>
  );
}