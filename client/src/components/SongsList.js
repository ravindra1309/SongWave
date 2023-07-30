import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCurrentSongIndex,
  SetSelectedPlayList,
  setCurrentSong,
} from "../redux/userSlice";

function SongsList() {
  const { currentSong, selectedPlaylist, allSongs } = useSelector(
    (state) => state.user
  );
  const [songsToPlay, setSongsToPlay] = useState([]);
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (selectedPlaylist) {
      if (
        selectedPlaylist &&
        selectedPlaylist.name === "All Songs" &&
        searchKey !== ""
      ) {
        const tempSongs = [];

        selectedPlaylist.songs.forEach((song) => {
          if (JSON.stringify(song).toLowerCase().includes(searchKey)) {
            tempSongs.push(song);
          }
        });
        setSongsToPlay(tempSongs);
      } else {
        setSongsToPlay(selectedPlaylist?.songs);
      }
    }
  }, [selectedPlaylist, searchKey]);

  return (
    <div className="flex flex-col gap-4">
      <div className="pl-3 pr-6">
        <input
          type="text"
          placeholder="Song, Artist, Album"
          className="rounded w-full "
          onFocus={() =>
            dispatch(
              SetSelectedPlayList({
                name: "All Songs",
                songs: allSongs,
              })
            )
          }
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        ></input>
      </div>
      <div className="overflow-y-scroll h-[54vh] p-3 cursor-pointer">
        {songsToPlay.map((song, index) => {
          const isPlaying = currentSong?._id === song._id;
          return (
            <div
              className={`' p-2 text-gray-600 flex items-center justify-between cursor-pointer' ${
                isPlaying &&
                "shadow border-2 border-active rounded cursor-point text-active font-semibold"
              }`}
              onClick={() => {
                dispatch(setCurrentSong(song));
                dispatch(SetCurrentSongIndex(index));
              }}
            >
              <div>
                <h1>{song.title}</h1>
                <h1>
                  {song.artist} {song.album} {song.year}
                </h1>
              </div>
              <div>
                <h1>{song.duration}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongsList;
