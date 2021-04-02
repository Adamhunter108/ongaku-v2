import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      searchResults: [] ,
      playlistName: 'Top 50' , 
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const playlistTracks = this.state.playlistTracks;

    if (playlistTracks.find((savedTrack) => {
      return savedTrack.id === track.id;
    })) {
      return;
    }
    
    const newPlaylistTracks = playlistTracks;
    newPlaylistTracks.push(track);

    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks;
    
    const newPlaylistTracks = playlistTracks.filter((savedTrack) => {
      return savedTrack.id !== track.id;
    });

    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    let playlistName = this.state.playlistName;

    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist' ,
        playlistTracks: []
      });
    });

  }

  search(term) {
    // console.log(term);
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  render() {
    return (
      <div>
        <h1>On<span className="highlight">ga</span>ku</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}></SearchBar>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}></SearchResults>
            <Playlist 
              playlistTracks={this.state.playlistTracks}
              // playlistName={this.state.playlistName}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}></Playlist>
          </div>
        </div>
      </div>
    );
  }
}

export default App;