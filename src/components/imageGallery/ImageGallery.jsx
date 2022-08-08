import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

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
export default ImageGallery;
