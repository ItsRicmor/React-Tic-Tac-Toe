import React from 'react'
import './styles.css'

export default ({ cells = [], handlerClick, maximizing }) => {
    return (
        <div id="board">
            {
                cells.map((cell, index) => <div
                    className={`box waves-effect waves-light btn ${cell !== '' ? `img-${cell}` : ''}`}
                    key={index}
                    onClick={handlerClick(cell, index, maximizing)}
                ></div>
                )
            }
        </div>
    )
}