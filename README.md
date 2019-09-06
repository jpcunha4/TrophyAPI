# TrophyAPP

This app is made to control a player's trophy system in a game.

## Database

### Collections

- User

  - id
  - name

- Collected_Coins

  - id
  - user_id

- Monster

  - id
  - name

- Killed_monster

  - id
  - user_id
  - monster_id

- Deaths

  - id
  - user_id
  - timestamp

## Trophy Ranks

Each player has 3 basic types of trophy to pursue. Each one of them is divided in five ranks.

- Coins - The more coins it gets, the better it is.

  1. 1 coin
  2. 100 coins
  3. 1000 coins
  4. 10000 coins
  5. 100000 coins

- Deaths - The more times it dies, the worser it is.

  1. 1 death
  2. 10 deaths
  3. 25 deaths
  4. 50 deaths
  5. 100 deaths

- Dead monsters (Turtles / Bowsers) - The more monsters dead, the better it is. Each type of monster grants the player a trophy rank.
  1. 1 Monster
  2. 100 Monsters
  3. 1000 Monsters
  4. 10000 Monsters
  5. 100000 Monsters

## Rules

- The player can get a Trophy every time he/she reach each rank.
- Every action must be recorded as a new data for their document/table.
