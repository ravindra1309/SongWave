import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCurrentSongIndex,
  SetCurrentTime,
  setCurrentSong,
  setIsPlaying,
} from "../redux/userSlice";
function Player() {
  const [volume, setVolume] = useState(0.5);
  const [shuffleOn, setShuffleOn] = useState(false);
  const dispatch = useDispatch();
  const audioref = React.createRef();
  const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime,selectedPlaylist } =
    useSelector((state) => state.user);
  const onPlay = () => {
    audioref.current.play();
    dispatch(setIsPlaying(true));
  };
  const onPause = () => {
    audioref.current.pause();
    dispatch(setIsPlaying(false));
  };
  const onPrev = () => {
    if (currentSongIndex !== 0 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
      dispatch(setCurrentSong(selectedPlaylist.songs[currentSongIndex - 1]));
    } else if(shuffleOn) {
      const randomIndex = Math.floor(Math.random() * selectedPlaylist.songs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(setCurrentSong(selectedPlaylist.songs[randomIndex]));
    }
  };
  const onNext = () => {
    if (currentSongIndex !== selectedPlaylist.songs.length - 1 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
      dispatch(setCurrentSong(selectedPlaylist.songs[currentSongIndex + 1]));
      console.log(selectedPlaylist.songs);
    } else if(shuffleOn) {
      const randomIndex = Math.floor(Math.random() * selectedPlaylist.songs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(setCurrentSong(selectedPlaylist.songs[randomIndex]));
      
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioref.current.pause();
      audioref.current.load();
      audioref.current.play();
    }
  }, [currentSong]);
  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(setCurrentSong(allSongs[0]));
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTime) {
      audioref.current.currentTime = currentTime;
    }
  }, []);

  return (
    <div className=" absolute bottom-0 left-0 right-0 p-5 shadow-lg bg-white">
      <div className="flex justify-between items-center border-2 p-3 shadow-xl border-blue-800 rounded">
        <div className="flex items-center gap-6 w-96">
          <img
            className="h-14 w-17"
            src="https://cdn-icons-png.flaticon.com/128/9448/9448086.png"
            alt="player"
          />
          <div>
            <h1 className="text-active">{currentSong?.title}</h1>
            <h1 className="text-secondary">
              {currentSong?.artist} , {currentSong?.album} , {currentSong?.year}
            </h1>
          </div>
        </div>

        <div className="w-96 flex flex-col items-center">
          <audio
            src={currentSong?.src}
            ref={audioref}
            onTimeUpdate={(e) => {
              dispatch(SetCurrentTime(e.target.currentTime));
            }}
          ></audio>
          <div className="flex gap-3 items-center">
            <i
              className={`ri-shuffle-line text-3xl text-gray-500 ${
                shuffleOn && "text-orange-500 font-semibold"
              }`}
              onClick={() => {
                setShuffleOn(!shuffleOn);
              }}
            ></i>
            <i className="ri-skip-back-line text-4xl text-gray-500" onClick={onPrev}></i>
            {isPlaying ? (
              <i className="ri-pause-line text-4xl text-white bg-gray-500 p-1 rounded-2xl" onClick={onPause}></i>
            ) : (
              <i className="ri-play-line text-4xl text-white bg-gray-500 p-1 rounded-2xl" onClick={onPlay}></i>
            )}

            <i className="ri-skip-forward-line text-4xl text-gray-500" onClick={onNext}></i>
          </div>
          <div className="flex gap-3 items-center w-full">
            <h1>
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
            </h1>
            <input
              type="range"
              className="p-0 w-full "
              min={0}
              max={Number(currentSong?.duration) * 60}
              value={currentTime}
              onChange={(e) => {
                audioref.current.currentTime = e.target.value;
                dispatch(SetCurrentTime(e.target.currentTime));
              }}
            />
            <h1>{currentSong?.duration}</h1>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <i
            className="ri-volume-mute-line text-2xl text-gray-500"
            onClick={() => {
              setVolume(0);
              audioref.current.volume = 0;
            }}
          ></i>
          <input
            type="range"
            className="p-0"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              audioref.current.volume = e.target.value;
              setVolume(e.target.value);
            }}
          ></input>
          <i
            className="ri-volume-up-line text-2xl text-gray-500"
            onClick={() => {
              setVolume(1);
              audioref.current.volume = 1;
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Player;
