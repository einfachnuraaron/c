import * as types from '../constants/ActionTypes';

export const choosePlaylist = query => ({ type: types.CHOOSE_PLAYLIST, query });
export const choosePlaylistSuccess = (query, results) => ({
  type: types.CHOOSE_PLAYLIST_SUCCESS,
  query,
  results
});

export const searchTracks = query => ({ type: types.SEARCH_TRACKS, query });
export const searchTracksSuccess = (query, results) => ({
  type: types.SEARCH_TRACKS_SUCCESS,
  query,
  results
});
export const searchTracksReset = () => ({ type: types.SEARCH_TRACKS_RESET });
export const fetchTrack = id => ({ type: types.FETCH_TRACK, id });
export const fetchTrackSuccess = (id, track) => ({
  type: types.FETCH_TRACK_SUCCESS,
  id
});
