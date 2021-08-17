export function getSnakes() {
  const snakes = [
    {
      head: 42,
      tail: 18,
    },
    {
      head: 77,
      tail: 57,
    },
    {
      head: 50,
      tail: 33,
    },
  ];
  return snakes;
}
export function getLadder() {
  const ladders = [
    {
      from: 6,
      to: 34,
    },
    {
      from: 66,
      to: 94,
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
      start : false,
    },
    {
      name: "player2",
      id: 2,
      status: 1,
      style: {
        "backgroundColor": "green",
      },
      start: false,
    },
  ];
  return players;
}
