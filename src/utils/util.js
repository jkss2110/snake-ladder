export function getSnakes() {
  const snakes = [
    {
      head: 42,
      tail: 18,
      imgClass: "snake4",
      divClass:"imageContainerSnake4",
    },
    {
      head: 77,
      tail: 57,
      imgClass: "snake2",
      divClass:"imageContainerSnake2",
    },
    {
      head: 50,
      tail: 33,
      imgClass: "snake3",
      divClass:"imageContainerSnake3",
    },
    {
      head: 96,
      tail: 52,
      imgClass: "snake5",
      divClass:"imageContainerSnake5",
    },
  ];
  return snakes;
}
export function getLadder() {
  const ladders = [
    {
      from: 6,
      to: 34,
      imgClass: "ladder1",
      divClass:"imageContainerLadder1",
    },
    {
      from: 66,
      to: 94,
      imgClass: "ladder2",
      divClass:"imageContainerLadder2",
    },
  ];
  return ladders;
}
export function getPlayer() {
  const players = [
    {
      name: "Yellows",
      id: 1,
      status: 1,
      style: {
        "backgroundColor": "yellow",
      },
      start : false,
    },
    {
      name: "Greens",
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
