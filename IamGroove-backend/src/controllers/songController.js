import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import albumModel from "../models/albumModel.js";
import connectCloudinary from "../config/cloudinary.js";
import upload from "../middleware/multer.js";
import dotenv from "dotenv";
dotenv.config();
await connectCloudinary();
const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const imageFile = req.files.image[0];
    const audioFile = req.files.audio[0];
    const audiouUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audiouUpload.duration / 60)}:${Math.floor(audiouUpload.duration % 60)}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audiouUpload.secure_url,
      duration,
    };
    const song = songModel(songData);
    await song.save();
    res.json({ success: true, message: "Song Added" });
  } catch (error) {
    res.json({ success: false });
  }
};
const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false });
  }
};
const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song Removed" });
  } catch (error) {
    res.json({ success: false });
  }
};
export { addSong, listSong, removeSong };
