import React from 'react'
import ReactDom from 'react-dom'

import classes from './Modal.module.css'

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClick}/>
}

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const overlays = document.getElementById('overlays');

const Modal = props => {
    return <React.Fragment>
        {ReactDom.createPortal(<Backdrop onClick={props.onClick}/>, overlays)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlays)}
    </React.Fragment>
}

export default Modal