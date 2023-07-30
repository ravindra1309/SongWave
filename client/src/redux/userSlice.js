import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    allSongs: [],
    currentSong: null,
    currentSongIndex: 0,
    selectedPlaylist: null,
    selectedPlaylistForEdit: null,
    isPlaying: false,
    currentTime: 0,
    tempAllSongs:[],
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    SetCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    SetSelectedPlayList: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setSelectedPlayListForEdit: (state, action) => {
      state.selectedPlaylistForEdit = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying=action.payload;
    },
    SetCurrentTime: (state,action)=>
    {
      state.currentTime=action.payload;
    },
  },
});

export const {
  SetUser,
  setAllSongs,
  setCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlayList,
  setSelectedPlayListForEdit,
  setIsPlaying,
  SetCurrentTime,
} = userSlice.actions;
