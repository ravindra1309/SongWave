import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AdminHome() {
  const { allSongs, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>
  {
    if(user?.isAdmin && !user.isAdmin|| !user?.isAdmin)
    {
      navigate('/');
    }
  },[])

  const [selectedSongForEdit, setSelectedSongForEdit] = useState(null);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl text-gray-700">All Songs</h1>
        <button
          className="text-white bg-blue-700 rounded-xl py-2 px-5"
          onClick={() => {
            navigate("/admin/add-edit-song");
          }}
        >
          {" "}
          Add Song
        </button>
      </div>
      <table className="w-full mt-5">
        <thead className="w-full">
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {allSongs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.year}</td>
              <td>{song.duration}</td>
              <td>
                <i
                  className="ri-pencil-line text-2xl text gray-500"
                  onClick={() => {
                    navigate("/admin/add-edit-song/?id=" + song._id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHome;
