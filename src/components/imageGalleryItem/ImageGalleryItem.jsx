import { Component } from 'react';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  onOpenModal = () => {
    this.setState({ showModal: true });
  };
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    console.log(webformatURL);
    return (
      <div>
        <li>
          <img
            className={s.imageGalleryItemImage}
            src={webformatURL}
            alt=""
            onClick={this.onOpenModal}
          />
        </li>
        {this.state.showModal && (
          <Modal src={largeImageURL} onClose={this.onCloseModal} />
        )}
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
