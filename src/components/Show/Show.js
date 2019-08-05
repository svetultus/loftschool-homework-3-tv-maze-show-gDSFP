import React, { PureComponent } from 'react';
import './Show.css';
import { getShowInfo } from '../../api.js';

class Show extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      showId: this.props.showId
    };

    if (this.state.showId) this.loadData(this.state.showId);
  }

  loadData(showId) {
    getShowInfo(showId).then(result => {
      this.setState({ data: result });
    });
  }
  componentDidUpdate() {
    if (!this.state.data) {
      this.loadData(this.props.showId);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!(props.showId && props.showId !== state.showId)) {
      return null;
    } else {
      state.showId = props.showId;
      state.data = null;

      return state;
    }
  }

  render() {
    if (!this.state.data) {
      return false;
    }

    const {
      data,
      data: { name }
    } = this.state;
    const summary = data.summary.replace(/<[^>]+>/g, '');
    const genres = data.genres.join(', ');
    const image = data.image.medium;

    return (
      <div className="show">
        <img className="show-image" src={image} alt={name} />
        <h2 className="show-label t-show-name">{name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр: </b>
          {genres}
        </p>
        <p className="show-text t-show-summary">{summary}</p>
      </div>
    );
  }
}

export default Show;
