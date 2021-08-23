import React from "react";
import Cell from "../Cell/Cell.component";
import "./Board.scss";
import { Button } from "reactstrap";
import { getPlayer, getSnakes, getLadder } from "../../utils/util";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceNumber: 1,
      players: getPlayer(),
      snakes: getSnakes(),
      ladders: getLadder(),
      turn: 0,
      gameover: false,
      start: false,
    };
  }
  //Check snake
  checkSnake = (i) => {
    const snake = this.state.snakes.slice();
    let found = snake.find((k, j) => {
      if (k.head === i) {
        return k;
      }
      return undefined;
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
      return undefined;
    });
    return found;
  };
    // Player check
    checkPlayer = (i) => {
      const player = this.state.players.slice();
      let found = player.find((k, j) => {
        if (k.status === i) {
          return k;
        }
        return undefined;
      });
      return found;
    };
  createBoard = (init, cellnos) => {
    const boardHtml = [];

    for (let i = init; i <= cellnos; i++) {
      let playerFound = this.checkPlayer(i);
      let snakeFound = this.checkSnake(i);
      let ladderFound = this.checkLadder(i);
      const found = {
          backgroundColor: "grey",
      };
      // Todo - Put images
      boardHtml.push(
        <Cell
          sStyle={found}
          snake={snakeFound}
          ladder={ladderFound}
          player={playerFound}
          number={i}
        ></Cell>
      );
    }
    return boardHtml;
  };
  onRollDiceClick = () => {
    this.setState({
      start : true,
    });
    if (this.state.gameover) {
      return;
    }
    const min = 1;
    const max = 7;
    const rand = Math.floor(min + Math.random() * (max - min));
    let player = this.state.players.slice();
    const turn = this.state.turn;
    if (!player[turn].start) {
      if (rand === 1) {
        player[turn].start = true;
      }
      this.setState({
        diceNumber: rand,
        players: player,
        turn: turn === 0 ? 1 : 0,
      });
      return;
    } else if (player[turn].status > 94) {
      const sum = player[turn].status + rand;
      if (sum > 100) {
        this.setState({
          diceNumber: rand,
          players: player,
          turn: turn === 0 ? 1 : 0,
        });
        return;
      } else if (sum === 100) {
        player[turn].status = sum;
        this.setState({
          diceNumber: rand,
          players: player,
          turn: turn === 0 ? 1 : 0,
          gameover: true,
        });
        toast.success("Game Over " + player[turn].name + " Won", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      }
    }
    player[turn].status += rand;
    let status = player[turn].status;
    // Snake bite
    const snakeFound = this.checkSnake(status);
    if (snakeFound !== undefined) {
      player[turn].status = snakeFound.tail;
    }
    // Ladder Check
    const ladderFound = this.checkLadder(status);
    if (ladderFound !== undefined) {
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
      boardHtml.push(<div key={i * fixedCol + 1 + "main"}>{eachRow}</div>);
    }
    return (
      <>
        <div className="boardGame">
          <div className="dice">
          <span style={{ padding: "1rem" }}>
            {this.state.players[this.state.turn].start
              ? "Turn for"
              : "Wait for"}{" "}
            {this.state.players[this.state.turn].name}
            </span>
            <span style={{ padding: "1rem" }}>
            {!this.state.players[this.state.turn].start
              ? " Get '1' to start"
              : ""}
            </span>
          </div>
          <div>
            <div className="table">{boardHtml}</div>
          </div>
          <div className="dice">
            <Button variant="primary" onClick={this.onRollDiceClick}>
              Roll the dice
            </Button>
            <span style={{ padding: "1rem" }}>
              {this.state.start?this.state.players[this.state.turn === 0 ? 1 : 0].name +" moved "+
              this.state.diceNumber:"Start throw Dice" }
            </span>
          </div>
        </div>
      </>
    );
  }
}
