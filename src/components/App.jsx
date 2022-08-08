import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';

const API_KEY = '29075157-7bb5c5ac82b024e7bc90995e8';

class App extends Component {
  state = {
    q: '',
    photos: [],
    page: 1,
    showLoadMore: false,
    loading: false,
  };

  fetchPhotos = () => {
    const { q } = this.state;
    this.setState({ page: 1 });
    // this.setState({ loading: true });
    return fetch(
      `https://pixabay.com/api/?q=${q}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Oops, there is no photos with that name');
        }
        return response.json();
      })
      .then(photos => {
        if (photos.hits.length === 0) {
          alert('There are no images matching your search query');
        }
        this.setState({
          photos: photos.hits,
          showLoadMore: true,
        });
        if (photos.totalHits <= 12) {
          this.setState({
            showLoadMore: false,
          });
        }
      })
      .catch(error => {
        throw error;
      })
      .finally(() => this.setState({ loading: false }));
  };
  handleFormSubmit = q => {
    this.setState({ q });
  };

  fetchMorePhotos = () => {
    const { q, page } = this.state;
    this.setState({ loading: true });
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
          photos: [...prevState.photos, ...photos.hits],
          showLoadMore: true,
        }));
        if (page === Math.ceil(photos.totalHits / 12)) {
          this.setState({
            showLoadMore: false,
          });
        }
      })
      .catch(error => {
        throw error;
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.setState({ loading: true });
      this.fetchPhotos();
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      // this.setState({ loading: true });
      this.fetchMorePhotos();
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, showLoadMore, loading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {loading && (
          <div>
            <ThreeDots
              color="#5d8aa8"
              height={100}
              width={100}
              ariaLabel="three-dots-loading"
            />
          </div>
        )}

        <ImageGallery photos={photos} />
        {showLoadMore && <Button onFetch={this.handleLoadMore} />}
      </>
    );
  }
}

export default App;
