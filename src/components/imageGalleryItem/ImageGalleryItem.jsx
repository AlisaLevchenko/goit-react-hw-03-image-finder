import { Component } from 'react';
import Modal from '../modal/Modal';
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
    return (
      <div>
        <li className={s.imageGalleryItemImage}>
          <img src={webformatURL} alt="" onClick={this.onOpenModal} />
        </li>
        {this.state.showModal && (
          <Modal src={largeImageURL} onClose={this.onCloseModal} />
        )}
      </div>
    );
  }
}

export default ImageGalleryItem;
