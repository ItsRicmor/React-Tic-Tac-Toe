import React, { Component, Fragment } from 'react'
import BoardComponent from '../components/Board'
import Player from '../game/Player'
import Board from '../game/Board'
export default class extends Component {

    handlerClickCell = (cell, index, maximizing) => () =>{
        const { user, computer, board: boardState, changeTurn, winner } = this.props
        if (cell) return false
        let symbol = maximizing ? computer : user
        let newBoard = new Board(boardState.getState())
        newBoard.insert(symbol, index)
        changeTurn(newBoard, 0)
        if (this.thereIsWinner()) {
            if(this.thereIsWinner() !== 'empate'){
                return winner(`Gano ${symbol.toUpperCase()}`)
            }
            return winner(`Empate`)
        }
        this.computer_turn(maximizing)
    }

    computer_turn = maximizing => {
        const { user, computer, board, changeTurn, player, winner } = this.props
        player.getBestMove(board, !maximizing, best => {
            let symbol = !maximizing ? computer : user
            let newBoard = new Board(board.getState())
            newBoard.insert(symbol, best)
            changeTurn(newBoard, 1)
            if (this.thereIsWinner()) {
                if(this.thereIsWinner() !== 'empate'){
                    return winner(`Gano ${symbol.toUpperCase()}`)
                }
                return winner(`Empate`)
            }
        })
    }
    

    thereIsWinner = () => {
        const { board } = this.props
        if (board.isTerminal()) {
            let { winner } = board.isTerminal();
            if (winner === 'draw') {
                return 'empate'
            }
            return true
        }
        return false
    }

    render() {
        const { player_turn, board } = this.props
        console.log(board.getState())
        let starting = parseInt(player_turn),
            maximizing = starting

        return <BoardComponent cells={board.getState()} handlerClick={this.handlerClickCell} maximizing={maximizing} />

    }
}