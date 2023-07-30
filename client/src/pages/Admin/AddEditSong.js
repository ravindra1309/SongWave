import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllSongs } from "../../redux/userSlice";

function AddEditSong() {
  const { allSongs, user } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");
  const dispatch = useDispatch();
  const fileTypes = ["MP3"];
  const navigate = useNavigate();
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: "",
    file: "",
  });

  const handleChange = (file) => {
    setSong({ ...song, file: file });
    console.log(file);
  };

  const onAdd = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      const response = await axios.post("/api/admin/add-songs", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song Added Successfully");
        dispatch(setAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went Wrong");
    }
  };

  const onEdit = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      formData.append("_id", songId)
      const response = await axios.post("/api/admin/edit-songs", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song Updated Successfully");
        dispatch(setAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went Wrong");
    }
  };

  useEffect(()=>
  {
    if(user?.isAdmin && !user.isAdmin|| !user?.isAdmin)
    {
      navigate('/');
    }
  },[])
  useEffect(() => {
    
    if (songId && songId !== "") {
      const existingSong = allSongs.find((s) => s._id === songId);
      setSong(existingSong);
    }
  }, [allSongs]);
  return (
    <div>
      <div className="flex gap-5 items-center">
        <i
          class="ri-arrow-left-line text-3xl"
          onClick={() => {
            navigate("/admin");
          }}
        ></i>
        <h1 className="text-3xl">Add Song</h1>
      </div>

      <div className="flex items-center gap-10 ">
      <div className="flex flex-col gap-3 w-1/3 mt-5">
        <input
          type="text"
          placeholder="Title"
          value={song?.title}
          onChange={(e) => {
            setSong({ ...song, title: e.target.value });
          }}
        ></input>
        <input
          type="text"
          placeholder="Artist"
          value={song?.artist}
          onChange={(e) => {
            setSong({ ...song, artist: e.target.value });
          }}
        ></input>
        <input
          type="text"
          placeholder="Album"
          value={song?.album}
          onChange={(e) => {
            setSong({ ...song, album: e.target.value });
          }}
        ></input>
        <input
          type="text"
          placeholder="Year"
          value={song?.year}
          onChange={(e) => {
            setSong({ ...song, year: e.target.value });
          }}
        ></input>

        <input
          type="duration"
          placeholder="Duration"
          value={song?.duration}
          onChange={(e) => {
            setSong({ ...song, duration: e.target.value });
          }}
        ></input>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        {song.file && <h1 className="text-gray-500">{song.file.name}</h1>}
        <div className="flex justify-end">
          {songId && songId !==""? (<button
            className="text-white bg-blue-700 rounded py-2 px-10 w-full"
            onClick={onEdit}
          >
            Update
          </button>):(<button
            className="text-white bg-blue-700 rounded py-2 px-10 w-full"
            onClick={onAdd}
          >
            Add
          </button>)}
        </div>
      </div>

      <div>
        <img className="h-[500px] transform -scale-x-100 w-[900px]" src="https://static.vecteezy.com/system/resources/previews/001/200/740/original/music-note-background-png.png" alt=""></img>
      </div>
      </div>
    </div>
  );
}

export default AddEditSong;
