import { Component } from 'react';

class Searchbar extends Component {
  state = {
    q: '',
  };

  handleQueryChange = e => {
    this.setState({ q: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.q.trim() === '') {
      alert('Здесь ничего нет:(');
      return;
    }

    this.props.onSubmit(this.state.q);
    this.setState({ q: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="q"
            value={this.state.q}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
