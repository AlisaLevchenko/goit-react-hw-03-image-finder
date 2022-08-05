import { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
// import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';

const API_KEY = '29075157-7bb5c5ac82b024e7bc90995e8';

class App extends Component {
  state = {
    q: '',
    photos: [],
    page: 1,
  };

  fetchPhotos = () => {
    const { q, page } = this.state;
    console.log(this.state.q);
    return fetch(
      `https://pixabay.com/api/?q=${q}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Oops, there is no photos with that name');
        }
        return response.json();
      })
      .then(photos => {
        this.setState(prevState => ({
          page: prevState.page + 1,
          photos: [...prevState.photos, ...photos.hits],
        }));
      })
      .catch(error => {
        throw error;
      });
  };
  handleFormSubmit = q => {
    this.setState({ q });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.fetchPhotos();
    }
  }

  handleLoadMore = () => {
    this.fetchPhotos();
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    // setTimeout(async () => {
    //   const photos = await this.fetchPhotos();
    //   this.setState(prevState => ({
    //     photos: [...prevState.photos, ...photos.hits],
    //   }));
    // }, 0);
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery photos={this.state.photos} />
        {this.state.photos.length !== 0 && (
          <Button onFetch={this.handleLoadMore} />
        )}
      </>
    );
  }
}

export default App;
