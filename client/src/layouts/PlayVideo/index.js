import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Để gọi API từ frontend
import { base_url, config } from "../../utils/config";
import { useParams } from "react-router-dom";
import Comment from "../Comment";
import ChatBubble from "../ChatBubble";
import YouTubePlayer from "youtube-player"; // Thư viện YouTubePlayer
import styles from "./PlayVideo.module.scss";
import classNames from "classnames/bind";

const cs = classNames.bind(styles);

export function PlayVideo() {
  const { slug } = useParams();
  const [video, setVideo] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${base_url}watch/${slug}`, config());
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    const fetLists = async () => {
      try {
        const response = await axios.get(`${base_url}list`);
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetLists();
    fetchVideo();
  }, [slug]);

  return (
    <div className={cs("watch-video-container")}>
      <div className={cs("video-and-comments")}>
        <iframe
          className={cs("iframe")}
          width="95%"
          height="600"
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div
          className={cs("titleAndDes")}
        >{`${video.title} ${video.description}`}</div>
        <Comment videoId={video.videoId} />
        <ChatBubble />
      </div>
      <div className={cs("playlist-section")}>
        <div className={cs("playlist")}>
          <h2>Danh sách phát</h2>
          {lists.map((list) => (
            <div class={cs("football-list-item")}>
              <img
                class={cs("football-list-item-img")}
                src={`${list.img}`}
                alt=""
              />
              <h6 class={cs("football-list-item-title")}>{`${list.title}`}</h6>
              <p
                class={cs("football-list-item-desc")}
              >{`${list.description}`}</p>
              <Link to={`/watch/${list.slug}`}>
                <button class={cs("football-list-item-button")}>Watch</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
