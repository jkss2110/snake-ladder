import React from 'react';
import ImageContainer from "../Image/ImageContainer.component";
import snake3 from "../../img/snake3.png";
import snake2 from "../../img/snake2.png";
import snake4 from "../../img/snake4.png";
import ladder1 from "../../img/ladder.png";
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
    }else{
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
        default: sSrc = undefined;
    }
    if (imageVisible){
        imageContainer.push( <ImageContainer classes={classes.imgClass} imgContain={classes.divClass} sSrc={sSrc} ></ImageContainer>);
    }
    return (
        <div style={props.sStyle} key={props.number}  className="cell">
            {props.number}
            {imageContainer}
        </div>
    );
}