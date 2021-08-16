export function getSnakes() {
  const snakes = [
    {
      head: 16,
      tail: 3,
    },
    {
      head: 25,
      tail: 15,
    },
    {
      head: 50,
      tail: 35,
    },
  ];
  return snakes;
}
export function getLadder() {
  const ladders = [
    {
      from: 2,
      to: 25,
    },
    {
      from: 52,
      to: 75,
    },
    {
      from: 89,
      to: 93,
    },
  ];
  return ladders;
}
export function getPlayer() {
  const players = [
    {
      name: "player1",
      id: 1,
      status: 1,
      style: {
        "backgroundColor": "yellow",
      },
    },
    {
      name: "player2",
      id: 2,
      status: 1,
      style: {
        "backgroundColor": "green",
      },
    },
  ];
  return players;
}
