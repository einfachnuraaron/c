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
    //Aarons Top 100 2019
    // var playlistID = '37i9dQZF1EthkNN8NKPlxz';
    //Lucas ToGo 2
    // var playlistID = '75qiwicEyZAKQ7vVcd1Kgm';
    //Cliquenmukke
    //var playlistID = '1P63hvKPOe9ahuYd8VVcCb';
    //noiselinks erste eigene Playlist
    var playlistID = '3tKHPaGozykva8vHFut0hu';
    //lina oldschool
    //var playlistID = '3e3Va4bqdOc3gQuyqmVwsC';
    // }
    https: await getToken();
    const res = await spotifyApi.getPlaylistTracks(playlistID, { offset: 0 });
    // const res = await spotifyApi.getMySavedTracks({limit : 1, offset: 1});

    var offset = 100;
    var tracks = res.body.items.length;
    var obj = '[]';
    var itemArray = JSON.parse(obj);
    for (var i = 0; i < res.body.items.length; i++) {
      itemArray.push(res.body.items[i]);
    }
    while (tracks < res.body.total) {
      const newres = await spotifyApi.getPlaylistTracks(playlistID, { offset: offset });
      tracks = tracks + newres.body.items.length;
      for (var i = 0; i < newres.body.items.length; i++) {
        itemArray.push(newres.body.items[i]);
      }
      offset = offset + 100;
    }
    var rand = Math.floor(Math.random() * Math.floor(itemArray.length));
    var track = itemArray[rand].track;
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
