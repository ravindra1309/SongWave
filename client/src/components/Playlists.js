import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetSelectedPlayList,
  SetUser,
  setSelectedPlayListForEdit,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import axios from "axios";

function Playlists() {
  const navigate = useNavigate();
  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const allPlaylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user.playlist,
  ];

  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/songs/delete-playlist",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Playlist Deleted Successfully");
        dispatch(
          SetSelectedPlayList({
            name: "All Songs",
            songs: allSongs,
          })
        );
        dispatch(SetUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went Wrong");
    }
  };

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlayList(allPlaylists[0]));
    }
  }, [selectedPlaylist, allSongs]);

  return (
    <div>
      <div className="flex justify-between w-full">
        <h1 className="text-secondary text-3xl">Your Playlists</h1>
        <h1
          className="underline cursor-pointer text-xl text-secondary"
          onClick={() => {
            navigate("/create-edit-playlist");
          }}
        >
          Create Playlist
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {allPlaylists?.map((Playlist, index) => {
          const isSelected = Playlist?.name === selectedPlaylist?.name;
          return (
            <div
              className={`flex flex-col gap-3 shadow border p-2 rounded cursor-pointer ${
                isSelected && "border-active border-2"
              }`}
              onClick={() => {
                dispatch(SetSelectedPlayList(Playlist));
              }}
            >
              <h1 className="text-3xl text-gray-700">{Playlist?.name}</h1>
              <h1 className="text-xl">{Playlist?.songs?.length} Songs</h1>
              <hr />
              <div className="flex gap-3 justify-between">
                <i
                  className="ri-delete-bin-line text-2xl text-gray-500"
                  onClick={() => {
                    onDelete(Playlist.name);
                  }}
                ></i>
                <i
                  className="ri-pencil-line text-2xl text-gray-500"
                  onClick={() => {
                    dispatch(setSelectedPlayListForEdit(Playlist));
                    navigate(`/create-edit-playlist/`);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
