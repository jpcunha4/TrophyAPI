class TrophyController {
  calculateCoinsTrophy(coins = 0) {
    switch (true) {
      case coins >= 1 && coins < 100:
        return 1;
      case coins >= 100 && coins < 1000:
        return 2;
      case coins >= 1000 && coins < 10000:
        return 3;
      case coins >= 10000 && coins < 100000:
        return 4;
      case coins >= 100000:
        return 5;
      default:
        return 0;
    }
  }

  calculateDeathsTrophy(deaths = 0) {
    switch (true) {
      case deaths >= 1 && deaths < 10:
        return 1;
      case deaths >= 10 && deaths < 25:
        return 2;
      case deaths >= 25 && deaths < 50:
        return 3;
      case deaths >= 50 && deaths < 100:
        return 4;
      case deaths >= 100:
        return 5;
      default:
        return 0;
    }
  }

  calculateMonstersKilledTrophy(monstersKilled = 0) {
    switch (true) {
      case monstersKilled >= 1 && monstersKilled < 100:
        return 1;
      case monstersKilled >= 100 && monstersKilled < 1000:
        return 2;
      case monstersKilled >= 1000 && monstersKilled < 10000:
        return 3;
      case monstersKilled >= 10000 && monstersKilled < 100000:
        return 4;
      case monstersKilled >= 100000:
        return 5;
      default:
        return 0;
    }
  }
}

module.exports = new TrophyController();
