import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const container = document.getElementById('modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onModalClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  }

  onModalClose = evt => {
    const { onClose } = this.props;
    if (evt.code === 'Escape' || evt.currentTarget === evt.target) {
      onClose();
    }
  };

  render() {
    const { src } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.onModalClose}>
        <div className={s.modal}>
          <img src={src} alt="" />
        </div>
      </div>,
      container
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Modal;
