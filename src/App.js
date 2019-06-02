import React, { Component, Fragment } from 'react';
import Play from './components/Play'
import Modal from './components/Modal'
import Board from './game/Board'
import Player from './game/Player'

class App extends Component {

  state = {
    title: '¿Te gustaria jugar?',
    body: "Por favor escoge el simbolo que mas te guste",
    user: '',
    computer: '',
    modal: true,
    finish: false,
    player: new Player(-1),
    board: new Board(['', '', '', '', '', '', '', '', ''])
  }


  cleanBoard = () => this.setState({ 
    board: new Board(['', '', '', '', '', '', '', '', '']), 
    modal: true, 
    finish: false,
    title: '¿Te gustaria jugar?',
    body: "Por favor escoge el simbolo que mas te guste"
  })

  changeTurn = (board, turn) => this.setState({ board, player_turn: turn })

  winner = state => {
    this.setState(prevState => ({ 
      ...prevState, 
      finish: true, 
      modal: true, 
      title: 'Partida finalizada',
      body: `Estado de la partida: ${state}`
    }))
  }
  

  handlerSelectOption = user => () => {
    if(user === 'x'){
      return this.setState(prevState => ({ ...prevState, user, computer: 'o', modal: false }))
    }
    this.setState(prevState => ({ ...prevState, user, computer: 'x', modal: false }))
  }

  render() {
    const { user, computer, modal, board, player, finish,  ...rest } = this.state
    return (
      <Fragment>
        <nav>
          <div className="nav-wrapper red accent-2">
            <a className="brand-logo center">Game</a>
          </div>
        </nav>
        <div className="container" style={{ height: '90vh' }}>
          {
            !modal && <Play
                user={user}
                computer={computer}
                board={board}
                player={player} 
                winner={this.winner}
                changeTurn={this.changeTurn}
              />
          }
        </div>
        {
          modal && <Modal { ...rest }
              handlerSelectOption={this.handlerSelectOption}
              finish={finish}
              cleanBoard={this.cleanBoard}
            />
        }
      </Fragment>
    )
  }
}

export default App;
