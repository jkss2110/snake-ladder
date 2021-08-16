import React from "react";
import Cell from "../Cell/Cell.component";
import "./Board.scss";
import { Button } from "reactstrap";
import { getPlayer, getSnakes, getLadder } from "../../utils/util";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceNumber: 1,
      players: getPlayer(),
      snakes: getSnakes(),
      ladders: getLadder(),
      turn: 0,
    };
  }
  checkSnake = (i) => {
    const snake = this.state.snakes.slice();
    let found = snake.find((k, j) => {
      if (k.head === i) {
        return k;
      }
    });
    return found;
  };
  // Ladder check
  checkLadder = (i) => {
    const ladder = this.state.ladders.slice();
    let found = ladder.find((k, j) => {
      if (k.from === i) {
        return k;
      }
    });
    return found;
  };
  createBoard = (init, cellnos) => {
    const boardHtml = [];

    for (let i = init; i <= cellnos; i++) {
      let found = this.state.players.find((k, j) => {
        if (k.status === i) {
          return k;
        }
      });
      let snakeFound = this.checkSnake(i);
      let ladderFound = this.checkLadder(i);
      if (found === undefined && snakeFound === undefined && ladderFound === undefined) {
        found = {
          backgroundColor: "grey",
        };
       
      } else if (snakeFound !== undefined) {
        found = {
          backgroundColor: "red",
        };
      } else if (ladderFound !== undefined){
        found = {
            backgroundColor: "orange",
          };
      } else {
        found = found.style;
      }
      boardHtml.push(<Cell sStyle={found} player={false} number={i}></Cell>);
    }
    return boardHtml;
  };
  onRollDiceClick = () => {
    const min = 1;
    const max = 7;
    const rand = Math.floor(min + Math.random() * (max - min));
    let player = this.state.players.slice();
    const turn = this.state.turn;
    player[turn].status += rand;
    let status = player[turn].status;
    // Snake bite
    const snakeFound = this.checkSnake(status);
    if (snakeFound !== undefined){
        player[turn].status = snakeFound.tail;
    }
    // Ladder Check
    const ladderFound = this.checkLadder(status);
    if (ladderFound !== undefined){
        player[turn].status = ladderFound.to;
    } 
    this.setState({
      diceNumber: rand,
      players: player,
      turn: turn === 0 ? 1 : 0,
    });
  };
  render() {
    const fixedCol = 10;
    const boardHtml = [];
    for (let i = 0; i < 10; i++) {
      const eachRow = this.createBoard(i * fixedCol + 1, fixedCol * (i + 1));
      boardHtml.push(<div>{eachRow}</div>);
    }
    return (
      <>
        <div className="boardGame">
        <span className="dice">Turn for {this.state.players[this.state.turn].name}</span>
          <div className="table">{boardHtml}</div>
          <div className="dice">
            <Button variant="primary" onClick={this.onRollDiceClick}>
              Roll the dice
            </Button>
            <span style={{padding: "1rem"}}>{this.state.diceNumber}</span>
          </div>
        </div>
      </>
    );
  }
}
