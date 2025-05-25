export const CARD_ACTIONS = {
    attack: (currentPlayer, targetPlayer) => {
      const isSuccess = Math.random() < 0.65;
      const damage = isSuccess ? Math.floor(Math.random() * 2) + 2 : 0; // 2-3 damage
      return {
        currentPlayer: {
          atWarWith: [...new Set([...currentPlayer.atWarWith, targetPlayer.nation])]
        },
        targetPlayer: {
          money: Math.max(0, targetPlayer.money - damage),
        },
        message: isSuccess 
          ? `Attack succeeded! ${targetPlayer.nation} lost ${damage}M` 
          : 'Attack failed!',
        type: isSuccess ? 'success' : 'error'
        };
    },
    production: (player) => {
      const income = player.atWarWith.length === 0 ? 2 : 1;
      return {
        player: {
          money: player.money + income
        },
        message: `Factory produced ${income}M`
      };
    },
    research: (player) => {
      return {
        player: {
          science: player.science + 3
        },
        message: 'Gained 3 Science Points'
      };
    },
    steal: (currentPlayer, targetPlayer) => {
      const isSuccess = Math.random() < 0.55;
      const amount = isSuccess ? Math.floor(Math.random() * 2) + 1 : 0; // 1-2M
      
      return {
        currentPlayer: {
          money: currentPlayer.money + amount,
          atWarWith: [...new Set([...currentPlayer.atWarWith, targetPlayer.nation])]
        },
        targetPlayer: {
          money: Math.max(0, targetPlayer.money - amount),
          atWarWith: [...new Set([...targetPlayer.atWarWith, currentPlayer.nation])]
        },
        message: isSuccess 
          ? `Stole ${amount}M from ${targetPlayer.nation}` 
          : 'Failed to steal!'
      };
    }
  };