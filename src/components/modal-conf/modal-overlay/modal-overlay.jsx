import PropTypes from "prop-types";
import modalOverlayStyle from "./modal-overlay.module.css";

export default function ModalOverlay({ onClick }) {
  return <div className={modalOverlayStyle.overlay} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};
