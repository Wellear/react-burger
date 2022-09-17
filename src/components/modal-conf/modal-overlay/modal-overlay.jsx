import React from "react";
import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClick}) => {
    return (
        <div className={modalOverlayStyle.overlay} onClick={onClick}/>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;