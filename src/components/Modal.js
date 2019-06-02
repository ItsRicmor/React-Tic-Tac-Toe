import React, { Component, Fragment } from 'react'
import '../assets/css/modal.css'

export default class extends Component {

    render() {
        const {
            handlerSelectOption,
            title = '',
            body = '',
            finish,
            cleanBoard
        } = this.props
        return (
            <div id='container-modal' className='overlay-on'>
                <div id='modal1' className='modal' >
                    <div id='modal-text'>
                        <p>{title}<br />{body}</p>
                    </div>
                    {
                        !finish ? (
                            <Fragment>
                                <button id='x' onClick={handlerSelectOption('x')} >X</button>
                                <button id='y' onClick={handlerSelectOption('o')} >O</button>
                            </Fragment>
                        ) : (
                            <button id='y' onClick={cleanBoard} >Jugar de nuevo</button>
                        )

                    }
                </div>
            </div>
        )

    }
}