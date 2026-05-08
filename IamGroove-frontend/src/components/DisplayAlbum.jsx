import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    albumsData.map((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, []);

  return albumData ? (
    <>
      <Navbar />
      <div className="flex gap-8 flex-col items-end md:flex-row md:items-end mt-10">
        <img
          className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-lg shadow-lg"
          src={albumData.image}
          alt={albumData.name}
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            ></img>
            <b>IamGroove</b> <b>· </b>1,323,154 likes <b>· 20 songs,</b> 1 hr 2
            min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 l=pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="w-4 m-auto" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData
        .filter((item) => item.album === album.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center hover:bg-[#ffffff2b] text-[#a7a7a7] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5 h-10 object-cover rounded" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="hidden sm:block text-[15px]">1 day ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
