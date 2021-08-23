import React from 'react';
import ImageContainer from "../Image/ImageContainer.component";
import snake3 from "../../img/snake3.png";
import snake2 from "../../img/snake2.png";
import snake4 from "../../img/snake4.png";
import snake5 from "../../img/snake5.png";
import ladder1 from "../../img/ladder.png";
import P1 from '../../img/P1.png';
import P2 from '../../img/P2.png';
import './Cell.scss';
export default function Cell(props) {
    let classes = {};
    let sSrc = undefined;
    let imageContainer = [];
    let imageVisible = false;
    if (props.snake !== undefined){
        classes.imgClass = props.snake.imgClass;
        classes.divClass = props.snake.divClass;
        imageVisible =true;
    } else if (props.ladder !== undefined ){
        classes.imgClass = props.ladder.imgClass;
        classes.divClass = props.ladder.divClass;
        imageVisible =true;
    }else if(props.player !== undefined){
        classes.imgClass = props.player.imgClass;
        classes.divClass = props.player.divClass;
        imageVisible = true;
    }else {
        classes.imgClass = "";
        classes.divClass = "";
    }
    switch(classes.imgClass){
        case "snake3": sSrc = snake3;
                       break;
        case "snake2": sSrc = snake2;
                       break;
        case "snake4": sSrc = snake4;
                       break;
        case "ladder1": sSrc = ladder1;
                       break;
        case "ladder2": sSrc = ladder1;
                       break;
        case "snake5": sSrc = snake5;
                       break;
        case "P1": sSrc = P1;
                   break;
        case "P2": sSrc = P2;
                    break;     
        default: sSrc = undefined;
    }
    if (imageVisible){
        imageContainer.push( <ImageContainer key={props.number} classes={classes.imgClass} imgContain={classes.divClass} sSrc={sSrc} ></ImageContainer>);
    }
    return (
        <div style={props.sStyle} key={props.number}  className="cell">
            {props.number}
            {imageContainer}
        </div>
    );
}