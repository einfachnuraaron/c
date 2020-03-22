// import index from '../../pages/index';

class Bot {
  constructor(options) {
    this.image = options.image || '/static/robot-icon.png';
    this.id = options.id || 'Robot';
    this.recommendations = {};
  }
  // async generateRecommendation(items, getToken, spotifyApi) {
  //   const trackIds = items.filter(i => i.user.type === 'user').map(i => i.track.id);

  //   if (trackIds.length) {
  //     const key = trackIds.join('-');
  //     if (!(key in this.recommendations)) {
  //       await getToken();
  //       const res = await spotifyApi.getRecommendations({ seed_tracks: trackIds });
  //       this.recommendations[key] = res.body.tracks;
  //     }
  //     if (this.recommendations[key].length) {
  //       return this.recommendations[key].shift();
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  async generateRecommendationFromPlaylist(getToken, spotifyApi) {
    // var playlistID = state.playlistID;
    // console.log(playlistID+"Aaron")
    // if(playlistID == null){
    // var playlistID = '37i9dQZF1EthkNN8NKPlxz';
    var playlistID = '75qiwicEyZAKQ7vVcd1Kgm';
    //open.spotify.com/playlist/37i9dQZF1DWVWiyE9VDkCO?si=OGPdWfV_S9uSldDUzhllcw
    https: // }
    await getToken();
    const res = await spotifyApi.getPlaylistTracks(playlistID);
    var rand = Math.floor(Math.random() * Math.floor(res.body.items.length));
    var track = res.body.items[rand].track;
    return track;
  }

  toJSON() {
    return {
      id: this.id,
      images: [{ url: this.image }],
      type: 'robot',
      socketIdArray: [] // todo: always empty, add this attribute in order to be compatible with other true users
    };
  }
}

module.exports = Bot;
