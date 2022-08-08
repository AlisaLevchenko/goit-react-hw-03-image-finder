import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ photos }) => {
  return (
    <ul className={s.imageGallery}>
      {photos.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          webformatURL={photo.webformatURL}
          largeImageURL={photo.largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default ImageGallery;
