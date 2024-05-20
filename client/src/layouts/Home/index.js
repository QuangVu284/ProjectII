import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"; // Bạn cần phải cài đặt axios để gọi API từ frontend
import ChatBubble from "../ChatBubble";
import { base_url } from "../../utils/config";
import image from "../../assets/Images";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getSearch } from "../../redux/service/getSearch";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const cs = classNames.bind(styles);

export function Home() {
  SwiperCore.use([Autoplay]);
  const { category } = useParams();
  const [lists, setLists] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        if (
          category == "Premier League" ||
          category == "Laliga" ||
          category == "Serie A" ||
          category == "Bundesliga"
        ) {
          const response = await axios.get(`${base_url}list/${category}`);
          setLists(response.data);
          return;
        } else if (category) {
          const response = await getSearch({
            params: { keyword: category },
          });
          setLists(response.data);
          return;
        } else {
          const response = await axios.get(`${base_url}list`);
          setLists(response.data);
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${base_url}banner`);
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchLists();
    fetchBanner();
  }, [category]);
  return (
    <div>
      <div className={cs("container")}>
        <div className={cs("content-container")}>
          <div className={cs("banner")}>
            <Swiper
              modules={[Autoplay]}
              grabCursor={true}
              spaceBetween={0}
              loop={true}
              slidesPerView={1}
              autoplay={{ delay: 2000 }}
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                  <Link className={cs("slideItem")} to={`${banner.linkPost}`}>
                    <img
                      className={cs("swiper-image")}
                      src={banner.img}
                      alt={""}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={cs("football-list-container")}>
            <h1 className={cs("football-list-title")}>NEW RELEASES</h1>
            <div className={cs("football-list-wrapper")}>
              <div className={cs("football-list")}>
                {lists.map((list) => (
                  <div class={cs("football-list-item")}>
                    <img
                      class={cs("football-list-item-img")}
                      src={`${list.img}`}
                      alt=""
                    />
                    <h6
                      class={cs("football-list-item-title")}
                    >{`${list.title}`}</h6>
                    <p
                      class={cs("football-list-item-desc")}
                    >{`${list.description}`}</p>
                    <Link to={`/watch/${list.slug}`}>
                      <button class={cs("football-list-item-button")}>
                        Watch
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ChatBubble />
        </div>
      </div>
    </div>
  );
}

export default Home;
