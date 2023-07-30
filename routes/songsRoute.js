const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Song = require("../models/songModel");
const User = require("../models/userModels");
router.post("/get-all-songs", authMiddleware, async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).send({
      message: "Songs Fetched Successfully",
      success: true,
      data: songs,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Fetching Songs", success: false, data: error });
  }
});

router.post("/add-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const existingPlaylists = user.playlist;
    existingPlaylists.push({
      name: req.body.name,
      songs: req.body.songs,
    });
    const updateUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlist: existingPlaylists,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "Playlist added successfully",
      success: true,
      data: updateUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error Creating Playlist",
      success: false,
      data: error,
    });
  }
});
router.post("/update-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    let existingPlaylists = user.playlist;
    existingPlaylists = existingPlaylists.map((playlist) => {
      if (playlist.name === req.body.name) {
        playlist.songs = req.body.songs;
      }
      return playlist;
    });
    const updateUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlist: existingPlaylists,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "Playlist updated successfully",
      success: true,
      data: updateUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error Updating Playlist",
      success: false,
      data: error,
    });
  }
});

router.post("/delete-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    let existingPlaylists = user.playlist;
    existingPlaylists = existingPlaylists.filter((playlist) => {
      if (playlist.name === req.body.name) {
        return false;
      } else {
        return true;
      }
    });
    const updateUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlist: existingPlaylists,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "Playlist deleted successfully",
      success: true,
      data: updateUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting Playlist",
      success: false,
      data: error,
    });
  }
});
module.exports = router;
