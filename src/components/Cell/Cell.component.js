import React from 'react';
import './Cell.scss';
export default function Cell(props) {
    return (
        <div style={props.sStyle} key={props.number}  className="cell">
            {props.number}
        </div>
    );
}