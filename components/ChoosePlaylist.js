import React from 'react';

class ChoosePlaylist extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: '37i9dQZF1EthkNN8NKPlxz'
    };
  }
  render() {
    return (
      <select value={this.state.playlistID} onChange={this.handleChange()} style={selectStyle}>
        <option value="" selected hidden>
          Playlist wählen
        </option>
        {options.results.map(block => (
          <option value={block.id} className="App">
            {block.name}
          </option>
        ))}
      </select>
    );
  }
  handleChange = event => {
    this.setState(
      {
        playlistID: event.target.value
      },
      console.log(this.state.playlistID)
    );
    console.log(this.props);
  };
}
