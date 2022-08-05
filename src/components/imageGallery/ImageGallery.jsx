import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ photos }) => {
  return (
    <ul className="gallery">
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
