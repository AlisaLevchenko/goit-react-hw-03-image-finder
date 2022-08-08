import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import s from 'components/App.module.css';

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
      })
      .finally(() => this.setState({ loading: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.setState({ loading: true, photos: [], showLoadMore: false });

      this.fetchPhotos();
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ loading: true, showLoadMore: false });
      this.fetchMorePhotos();
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, showLoadMore, loading } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery photos={photos} />
        {loading && (
          <div className={s.dots}>
            <ThreeDots
              color="#5d8aa8"
              height={100}
              width={100}
              ariaLabel="three-dots-loading"
            />
          </div>
        )}

        {showLoadMore && <Button onFetch={this.handleLoadMore} />}
      </div>
    );
  }
}

export default App;
