import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

import { useState } from "react";
import Loader from "../component/loader";
import { BiDownload } from "react-icons/bi";
import { saveAs } from "file-saver";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  const downloadImage = (imgUrl) => {
    saveAs(imgUrl, `${text}.png`); // Put your image url here.
  };
  const genImage = (prompt) => {
    axios
      .post("/api/genImage", { prompt: prompt })
      .then((res) => {
        setLoader(false);
        const data = res.data.data[0];
        setImgUrl(data.url);
        console.log(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className=" w-full h-[100vh] p-8 flex flex-col gap-2 items-center justify-center">
      <h1 className="font-mono font-black text-xl mb-2">Quick Image Gen</h1>
      {!imgUrl && (
        <div className="h-[50vh] w-full md:w-[50vw] mb-4 bg-slate-300 rounded-md flex items-center justify-center">
          {loader && <Loader />}
        </div>
      )}
      {imgUrl && (
        <div className="h-[50vh]  md:w-[40vw] w-full mb-4  rounded-md relative">
          <button
            className="absolute bottom-2 right-2 h-10 w-10 bg-white shadow-md z-20 rounded-full "
            onClick={() => {
              downloadImage(imgUrl);
            }}
          >
            <BiDownload className="w-6 h-6 mx-2 " />
          </button>
          <Image
            src={imgUrl}
            alt="ai generated image"
            fill
            className="rounded-md"
          />
        </div>
      )}

      <textarea
        className="w-full md:w-[40vw] h-24 rounded-md border-2 p-2 mb-2 text-gray-400 border-slate-400"
        placeholder="image generation prompt ...."
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      <button
        className="rounded-md md:w-[40vw] w-full py-2 text-white font-black bg-black"
        onClick={() => {
          setLoader(true);
          genImage(text);
          setImgUrl(null);
        }}
      >
        Generate Image
      </button>
    </main>
  );
}
