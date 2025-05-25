import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function Store({ show, onHide, onBuyCard, currentPlayer }) {
  const cards = [
    {
      id: 1,
      name: "Infantry",
      type: "Military",
      cost: 1,
      effect: "65% chance to reduce 2-3M from target",
      action: "attack",
      consumable: true
    },
    {
      id: 2,
      name: "Factory",
      type: "Economy",
      cost: 3,
      effect: "Gain +1M/year (+2M if not at war)",
      action: "production",
      consumable: true,
    },
    {
      id: 3,
      name: "Science Center",
      type: "Science",
      cost: 3,
      effect: "Gain +3 Science Points",
      action: "research",
      consumable: true
    },
    {
      id: 4,
      name: "Spy",
      type: "Military",
      cost: 2,
      effect: "55% chance to steal 1-2M from target",
      action: "steal",
      consumable: true
    }
  ];

  const cardColors = {
    Military: 'danger',
    Economy: 'primary',
    Science: 'success'
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>
          Store <small className="text-muted">(Current: {currentPlayer.nation} - {currentPlayer.money}M)</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {cards.map(card => (
            <div key={card.id} className="col">
              <div className={`card h-100 border-${cardColors[card.type]}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{card.name}</h5>
                    <Badge bg={cardColors[card.type]}>{card.type}</Badge>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">Cost: {card.cost}M</h6>
                  <p className="card-text">{card.effect}</p>
                </div>
                <div className="card-footer bg-transparent">
                  <Button
                    variant={cardColors[card.type]}
                    onClick={() => onBuyCard(card)}
                    disabled={currentPlayer.money < card.cost}
                    className="w-100"
                  >
                    {currentPlayer.money < card.cost ? 'Not enough money' : `Buy for ${card.cost}M`}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <small className="text-muted">Cards will be added to your collection</small>
      </Modal.Footer>
    </Modal>
  );
}