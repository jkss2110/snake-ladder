import React from "react";
import Cell from "../Cell/Cell.component";
import "./Board.scss";
import { Button } from "reactstrap";
import { getPlayer, getSnakes, getLadder } from "../../utils/util";
import ImageContainer from "../Image/ImageContainer.component";
import snake3 from "../../img/snake3.png";
import snake2 from "../../img/snake2.png";
import snake4 from "../../img/snake4.png";
import ladder1 from "../../img/ladder.png";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      snake3 : {"imgClass": "snake3","divClass":"imageContainerSnake3"},
      snake2 : {"imgClass": "snake2","divClass":"imageContainerSnake2"},
      snake4 : {"imgClass": "snake4","divClass":"imageContainerSnake4"},
      ladder1: {"imgClass": "ladder1","divClass":"imageContainerLadder1"},
      ladder2: {"imgClass": "ladder2","divClass":"imageContainerLadder2"},
      gameover: false,
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
      boardHtml.push(<Cell sStyle={found} number={i}></Cell>);
    }
    return boardHtml;
  };
  onRollDiceClick = () => {
    if (this.state.gameover){
      return;
    }
    const min = 1;
    const max = 7;
    const rand = Math.floor(min + Math.random() * (max - min));
    let player = this.state.players.slice();
    const turn = this.state.turn;
    if (!player[turn].start){
      if (rand === 1){
        player[turn].start = true;
      }
      this.setState({
        diceNumber: rand,
        players: player,
        turn: turn === 0 ? 1 : 0,
      });
      return;
    }else if (player[turn].status >94){
      const sum = player[turn].status + rand;
      if (sum > 100){
        this.setState({
          diceNumber: rand,
          players: player,
          turn: turn === 0 ? 1 : 0,
        });
        return;
      } else if (sum === 100){
        player[turn].status = sum;
        this.setState({
          diceNumber: rand,
          players: player,
          turn: turn === 0 ? 1 : 0,
          gameover: true,
        });
        toast.success('Game Over '+player[turn].name+" Won",{position: toast.POSITION.BOTTOM_CENTER});
        return;
      }
    }
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
        <div className="dice">{this.state.players[this.state.turn].start?"Turn for":"Wait for"} {this.state.players[this.state.turn].name}</div>
          <div className="table">{boardHtml}</div>
          <div className="dice">
            <Button variant="primary" onClick={this.onRollDiceClick}>
              Roll the dice
            </Button>
            <span style={{padding: "1rem"}}>{this.state.diceNumber}</span>
          </div>
          <ImageContainer classes={this.state.snake3.imgClass} imgContain={this.state.snake3.divClass} sSrc={snake3} ></ImageContainer>
          <ImageContainer classes={this.state.snake2.imgClass} imgContain={this.state.snake2.divClass} sSrc={snake2} ></ImageContainer>
          <ImageContainer classes={this.state.snake4.imgClass} imgContain={this.state.snake4.divClass} sSrc={snake4} ></ImageContainer>
          <ImageContainer classes={this.state.ladder1.imgClass} imgContain={this.state.ladder1.divClass} sSrc={ladder1} ></ImageContainer>
          <ImageContainer classes={this.state.ladder2.imgClass} imgContain={this.state.ladder2.divClass} sSrc={ladder1} ></ImageContainer>
        </div>
      </>
    );
  }
}
