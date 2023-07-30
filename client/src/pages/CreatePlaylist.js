import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { SetSelectedPlayList, SetUser, setSelectedPlayListForEdit } from "../redux/userSlice";
import Player from "../components/Player";

function CreatePlaylist() {
  const [name, setName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const { allSongs, selectedPlaylistForEdit } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectUnselectedSong = (song) => {
    if (selectedSongs.find((s) => s._id === song._id)) {
      setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };
  const onAdd = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please Fill all the fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          "/api/songs/add-playlist",
          {
            name,
            songs: selectedSongs,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success("Playlist created Successfully");
          dispatch(SetUser(response.data.data));
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error("Something went Wrong");
      }
    }
  };
  const onEdit = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please Fill all the fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          "/api/songs/update-playlist",
          {
            name,
            songs: selectedSongs,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success("Playlist updated Successfully");
          dispatch(SetUser(response.data.data));
          dispatch(setSelectedPlayListForEdit(null));
          dispatch(SetSelectedPlayList({
            name: 'All Songs',
            songs : allSongs
          }))
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error("Something went Wrong");
      }
    }
  };
  useEffect(() => {
    if (selectedPlaylistForEdit) {
      setName(selectedPlaylistForEdit.name);
      setSelectedSongs(selectedPlaylistForEdit.songs);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center gap-5">
        <i
          class="ri-arrow-left-line text-3xl"
          onClick={() => {
            navigate("/");
          }}
        ></i>
        <h1 className="text-3xl"> CreatePlaylist</h1>
      </div>
      <div className="flex justify-between gap-3 mt-5">
        <input
          className="w-96"
          type="text"
          placeholder="Enter Playlist Name..."
          value={name}
          disabled={selectedPlaylistForEdit}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          className="bg-blue-700 rounded px-5"
          onClick={() => {
            if (selectedPlaylistForEdit) {
              onEdit();
            } else {
              onAdd();
            }
          }}
        >
          SAVE
        </button>
      </div>
      <h1 className="my-5 text-2xl">Selected Songs - {selectedSongs.length}</h1>
      <div className="grid grid-cols-3 gap-3 overflow-y-scroll h-60 ">
        {allSongs.map((song, index) => {
          const isSelected = selectedSongs.find((s) => s._id === song._id);
          return (
            <div
              className={`p-3 flex items-center shadow justify-between border cursor-pointer border-gray-500 rounded ${
                isSelected && "border-active border-2"
              }`}
              onClick={() => selectUnselectedSong(song)}
            >
              <div>
                <h1>{song.title}</h1>
                <h1>
                  {song.artist} - {song.album} - {song.year}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <Player/>
    </div>
  );
}

export default CreatePlaylist;
