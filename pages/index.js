import Link from 'next/link';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/MyLayout.js';
import { initStore } from '../store/store';
import { fetchQueue } from '../actions/queueActions';
import { fetchUsers } from '../actions/usersActions';
import { fetchPlayingContext } from '../actions/playbackActions';
import { choosePlaylist } from '../actions/searchActions';
import Users from '../components/Users';
import Queue from '../components/Queue';
import AddToQueue from '../components/AddToQueue';
import NowPlaying from '../components/NowPlaying';
import Devices from '../components/Devices';
import PageWithIntl from '../components/PageWithIntl';
const SpotifyWebApi = require('spotify-web-api-node');
const AuthConfig = require('../config/auth');

const spotifyApi = new SpotifyWebApi({
  clientId: AuthConfig.CLIENT_ID,
  clientSecret: AuthConfig.CLIENT_SECRET
});

var options = {
  type: 'CHOOSE_PLAYLIST_SUCCESS',
  results: [
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/4evVE641GDnhpp6GiIYzpJ'
      },
      href: 'https://api.spotify.com/v1/playlists/4evVE641GDnhpp6GiIYzpJ',
      id: '4evVE641GDnhpp6GiIYzpJ',
      images: [
        {
          height: 640,
          url:
            'https://mosaic.scdn.co/640/ab67616d0000b2733009007708ab5134936a58b3ab67616d0000b273aa07223229c3f264be0ca653ab67616d0000b273d12357f649db780ff1171b06ab67616d0000b273f67fbf0d465cca2b3e25af96',
          width: 640
        },
        {
          height: 300,
          url:
            'https://mosaic.scdn.co/300/ab67616d0000b2733009007708ab5134936a58b3ab67616d0000b273aa07223229c3f264be0ca653ab67616d0000b273d12357f649db780ff1171b06ab67616d0000b273f67fbf0d465cca2b3e25af96',
          width: 300
        },
        {
          height: 60,
          url:
            'https://mosaic.scdn.co/60/ab67616d0000b2733009007708ab5134936a58b3ab67616d0000b273aa07223229c3f264be0ca653ab67616d0000b273d12357f649db780ff1171b06ab67616d0000b273f67fbf0d465cca2b3e25af96',
          width: 60
        }
      ],
      name: 'playback.',
      owner: {
        display_name: 'einfachnuraaron',
        external_urls: {
          spotify: 'https://open.spotify.com/user/einfachnuraaron'
        },
        href: 'https://api.spotify.com/v1/users/einfachnuraaron',
        id: 'einfachnuraaron',
        type: 'user',
        uri: 'spotify:user:einfachnuraaron'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'OCw3NmU2NjU5NGUyNjAyMmZkMTljNDM0ZDQ3MjJlOGU2YmUyZjE3NzFk',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/4evVE641GDnhpp6GiIYzpJ/tracks',
        total: 6
      },
      type: 'playlist',
      uri: 'spotify:playlist:4evVE641GDnhpp6GiIYzpJ'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/1CawZZzfd6Zx3HCgoynkC5'
      },
      href: 'https://api.spotify.com/v1/playlists/1CawZZzfd6Zx3HCgoynkC5',
      id: '1CawZZzfd6Zx3HCgoynkC5',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2736392abea823ca563f854e49e',
          width: 640
        }
      ],
      name: 'Flesh For Fantasy – Billy Idol',
      owner: {
        display_name: 'einfachnuraaron',
        external_urls: {
          spotify: 'https://open.spotify.com/user/einfachnuraaron'
        },
        href: 'https://api.spotify.com/v1/users/einfachnuraaron',
        id: 'einfachnuraaron',
        type: 'user',
        uri: 'spotify:user:einfachnuraaron'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'Myw2NDliZmRjY2Y0NTk1ZWE0MzUzMzlmNTI3NmQ3ZmY5ZDQyOTM3ODY0',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/1CawZZzfd6Zx3HCgoynkC5/tracks',
        total: 2
      },
      type: 'playlist',
      uri: 'spotify:playlist:1CawZZzfd6Zx3HCgoynkC5'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/32pHQSk0wclXTk9vcgpujD'
      },
      href: 'https://api.spotify.com/v1/playlists/32pHQSk0wclXTk9vcgpujD',
      id: '32pHQSk0wclXTk9vcgpujD',
      images: [],
      name: 'Die Känguru Chroniken',
      owner: {
        display_name: 'einfachnuraaron',
        external_urls: {
          spotify: 'https://open.spotify.com/user/einfachnuraaron'
        },
        href: 'https://api.spotify.com/v1/users/einfachnuraaron',
        id: 'einfachnuraaron',
        type: 'user',
        uri: 'spotify:user:einfachnuraaron'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'MyxjMjZlYWM2ZTMyNWFmZGJlNTQ2Y2Y0M2M1ZTU1YTVhZjVkZDcyZWM5',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/32pHQSk0wclXTk9vcgpujD/tracks',
        total: 81
      },
      type: 'playlist',
      uri: 'spotify:playlist:32pHQSk0wclXTk9vcgpujD'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/7cB9QROWA9bhnttmK2pveh'
      },
      href: 'https://api.spotify.com/v1/playlists/7cB9QROWA9bhnttmK2pveh',
      id: '7cB9QROWA9bhnttmK2pveh',
      images: [],
      name: 'Känguru Offenbarung',
      owner: {
        display_name: 'einfachnuraaron',
        external_urls: {
          spotify: 'https://open.spotify.com/user/einfachnuraaron'
        },
        href: 'https://api.spotify.com/v1/users/einfachnuraaron',
        id: 'einfachnuraaron',
        type: 'user',
        uri: 'spotify:user:einfachnuraaron'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'Miw4NzViZWVkMTNiYzZiMWI1NDQ0NGI5OWY3NmQ2ZGIzYThkZmFmNWUw',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/7cB9QROWA9bhnttmK2pveh/tracks',
        total: 83
      },
      type: 'playlist',
      uri: 'spotify:playlist:7cB9QROWA9bhnttmK2pveh'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/1BVMY9kFx88MEfAbCjqbZ1'
      },
      href: 'https://api.spotify.com/v1/playlists/1BVMY9kFx88MEfAbCjqbZ1',
      id: '1BVMY9kFx88MEfAbCjqbZ1',
      images: [],
      name: 'Die Känguru-Apokryphen',
      owner: {
        display_name: 'einfachnuraaron',
        external_urls: {
          spotify: 'https://open.spotify.com/user/einfachnuraaron'
        },
        href: 'https://api.spotify.com/v1/users/einfachnuraaron',
        id: 'einfachnuraaron',
        type: 'user',
        uri: 'spotify:user:einfachnuraaron'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'Myw2YjlhMDdmZTIzNWYwNGFhNWE2YzQyZjVmYjhiOWI0YmRiMjEwZmY4',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/1BVMY9kFx88MEfAbCjqbZ1/tracks',
        total: 52
      },
      type: 'playlist',
      uri: 'spotify:playlist:1BVMY9kFx88MEfAbCjqbZ1'
    }
  ]
};
// const val='';

const onlineStyle = {
  width: '150px',
  marginBottom: '5rem'
};

const selectStyle = {
  width: '150px',
  float: 'right',
  color: 'black'
};

const optionStyle = {
  width: '150px',
  float: 'right',
  color: 'black'
};

class Main extends React.Component {
  state = {
    playlistID: ''
  };

  static getInitialProps({ req, store, isServer }) {
    return Promise.all([
      store.dispatch(fetchQueue()),
      store.dispatch(fetchUsers()),
      store.dispatch(fetchPlayingContext())
    ]);
  }

  render() {
    return (
      <Layout>
        {this.props.playing.track ? (
          <NowPlaying
            track={this.props.playing.track}
            user={this.props.playing.user}
            position={this.props.playing.position}
          />
        ) : (
          <div className="now-playing">
            <style jsx>{`
              .now-playing {
                background-color: #3b454f;
                color: #fff;
                height: 250px;
                position: relative;
                width: 100%;
              }
              .now-playing__text {
                padding: 40px;
              }
              .now-playing__bd {
                padding-left: 30px;
              }
              .now-playing__track-name {
                font-size: 2em;
                padding-top: 1.2em;
              }
              .now-playing__artist-name {
                font-size: 1.2em;
                padding-bottom: 2em;
                padding-top: 0.5em;
              }
              .now-playing__user {
                padding-top: 0.5em;
              }
              .now-playing__progress_bar {
                bottom: 0;
                background-color: #fdd835;
                height: 5px;
                position: absolute;
                width: 100%;
              }
              .media,
              .media__bd {
                overflow: hidden;
                _overflow: visible;
                zoom: 1;
              }
              .media .media__img {
                float: left;
                margin-right: 10px;
              }
              .user-image {
                border-radius: 50%;
              }
              .user-name {
                line-height: 30px;
              }
            `}</style>
            <div className="now-playing__text media">
              <div className="media__img">
                <img src="/static/defaultalbumcover.png" width="170" height="170" />
              </div>
              <div className="now-playing__bd media__bd">
                <div className="now-playing__track-name"></div>
                <div className="now-playing__artist-name"></div>
              </div>
            </div>
            <div className="now-playing__progress">
              <div className="now-playing__progress_bar" style={{ width: '100%' }} />
            </div>
          </div>
        )}
        <div className="app">
          <style jsx>
            {`
              .app {
                margin-top: 20px;
                margin-left: 40px;
                margin-right: 40px;
                padding: 0px;
              }
              @media screen and (orientation:portrait){
                .online{
                  float left;
                }
                .app {
                  margin-top:0px;
                  margin-left: 20px;
                  margin-right: 20px;
                  padding: 0px;
                }
              }
              @media screen and (orientation:landscape){
                .online{
                  float right;
                }
              }
              .footer{
                color:  gray;
                position: fixed;
                bottom: 0px;
                left: 0px;
                right: 0px;
                margin-top: 150px;
                width: 100%;
                height: 4rem;
                background-color:#3b454f;
                // box-shadow: 0px -3px 5px 0px #505050
              }
            `}
          </style>
          <div style={{ float: 'left' }}>
            <Queue items={this.props.queue} session={this.props.session} />
            {this.props.session.user !== null ? <AddToQueue /> : null}
            {this.props.session.user !== null ? <Devices /> : null}
          </div>
          <div style={onlineStyle} className="online">
            <Users items={this.props.users} />
            {this.props.session.user !== null ? (
              <select value={this.state.playlistID} onChange={this.handleChange} style={selectStyle}>
                <option value="" selected hidden>
                  Playlist wählen
                </option>
                {options.results.map(block => (
                  <option value={block.id} className="App">
                    {block.name}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        </div>
        <div className="footer">
          <style jsx>
            {`
              @media screen and (max-width: 480px) {
                .footer {
                  text-align: center;
                  height: 2.5rem;
                }
                .credits {
                  line-height: 2.25rem;
                  color: gray;
                  font-size: 0.75rem;
                }
              }
              @media screen and (max-width: 480px) and (orientation: landscape) {
                .footer {
                  display: none;
                }
              }
              @media screen and (min-width: 480px) and (orientation: landscape) {
                .footer {
                  height: 4rem;
                }
                .credits {
                  position: absolute;
                  line-height: 30px;
                  top: 1rem;
                  margin-right: 0px;
                  margin-left: 30px;
                  color: gray;
                }
              }
              .footer {
                color: gray;
                position: fixed;
                bottom: 0px;
                left: 0px;
                right: 0px;
                width: 100%;
                background-color: #3b454f;
                // box-shadow: 0px -3px 5px 0px #505050
              }
            `}
          </style>
          <Link href="https://github.com/JMPerez/c">
            <a className="credits">Based on JMPerez's collaborative listening room </a>
          </Link>
        </div>
      </Layout>
    );
  }

  handleChange = event => {
    this.setState(
      {
        playlistID: event.target.value
      },
      resp => console.log(this.state.playlistID),
      console.log(this.state)
    );

    // api.playlistID = event.target.value;
  };
}

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session,
  playlistID: state.playlistID
});

const mapDispatchToProps = dispatch => ({
  choosePlaylist: query => dispatch(choosePlaylist(query))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps, null)(PageWithIntl(Main));
