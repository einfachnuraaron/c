import Link from 'next/link';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/MyLayout.js';
import { initStore } from '../store/store';
import { fetchQueue } from '../actions/queueActions';
import { fetchUsers } from '../actions/usersActions';
import { fetchPlayingContext } from '../actions/playbackActions';
import Users from '../components/Users';
import Queue from '../components/Queue';
import AddToQueue from '../components/AddToQueue';
import NowPlaying from '../components/NowPlaying';
import Devices from '../components/Devices';
import PageWithIntl from '../components/PageWithIntl';

const onlineStyle = {
  width: '150px',
  float: 'right'
};

class Main extends React.Component {
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
                margin: 20px;
                padding: 20px;
              }
            `}
          </style>
          <div style={{ float: 'left' }}>
            <Queue items={this.props.queue} session={this.props.session} />
            {this.props.session.user !== null ? <AddToQueue /> : null}
            {this.props.session.user !== null ? <Devices /> : null}
          </div>
          <div style={onlineStyle}>
            <Users items={this.props.users} />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session
});

export default withRedux(initStore, mapStateToProps, null)(PageWithIntl(Main));
