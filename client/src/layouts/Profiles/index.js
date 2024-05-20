/* eslint-disable no-unused-vars */
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faEnvelope,
  faPhone,
  faLocationDot,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context";
import image from "../../assets/Images";
import { base_url } from "../../utils/config";

const cs = classNames.bind(styles);

function Profile() {
  const navigate = useNavigate();
  const { showToastMessage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const refContent = useRef();
  const refIconSent = useRef();
  const filterRef = useRef();

  useEffect(() => {}, [user]);

  const handleUploadImg = async (e) => {
    const image = e.target.files[0];
    filterRef.current.classList.add(cs("filter"));

    if (image) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("avatar", image);

        const uploadResponse = await axios.post(
          `${base_url}auth/upload-avatar`,
          formData
        );

        const downloadURL = uploadResponse.data.avatarURL;

        const updateResponse = await axios.put(
          `${base_url}auth/update-avatar`,
          {
            avatar: downloadURL,
            email: user.email,
          }
        );

        const updatedUser = { ...user, avatar: downloadURL };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        showToastMessage("success", "Cập nhật ảnh đại diện thành công");
        setUser(updatedUser);
      } catch (error) {
        showToastMessage("error", error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={cs("wrapper")}>
      <h4 className={cs("header")}>Thông Tin Cá Nhân</h4>
      <div className={cs("container")}>
        <div className={cs("info")}>
          <h4 className={cs("title")}>Thông tin người dùng</h4>
          <div className={cs("content")}>
            <div className={cs("infoUser")}>
              <p className={cs("contentTitle")}>
                <FontAwesomeIcon
                  className={cs("iconTitle")}
                  style={{ marginBottom: "2px" }}
                  icon={faUser}
                />
                Tên
              </p>
              <p className={cs("usernamemail")}>
                <span ref={refContent}>
                  {" "}
                  {user?.firstName} {user?.lastName}{" "}
                </span>

                <i ref={refIconSent} className={cs("iconAfter")}></i>
              </p>
            </div>
            <div className={cs("infoUser")}>
              <p className={cs("contentTitle")}>
                <FontAwesomeIcon
                  className={cs("iconTitle")}
                  icon={faEnvelope}
                />
                Email
              </p>

              <p className={cs("usernamemail")}>
                <span>{user?.email}</span>
              </p>
            </div>
            <div className={cs("infoUser")}>
              <p className={cs("contentTitle")}>
                <FontAwesomeIcon className={cs("iconTitle")} icon={faPhone} />
                Số điện thoại
              </p>

              <p className={cs("usernamemail")}>
                <span>{user?.phoneNumber}</span>
              </p>
            </div>
            <div className={cs("infoUser")}>
              <p className={cs("contentTitle")}>
                <FontAwesomeIcon
                  className={cs("iconTitle")}
                  icon={faLocationDot}
                />
                Địa chỉ
              </p>

              <p className={cs("usernamemail")}>
                <span>{user?.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className={cs("picture")}>
          <h4 className={cs("title")}>Ảnh đại diện</h4>
          <div className={cs("pictureContain")}>
            {loading && (
              <FontAwesomeIcon className={cs("iconLoading")} icon={faSpinner} />
            )}
            <img
              src={user?.avatar || image.avatar}
              className={cs("imageProfile")}
              alt=""
            />

            <div ref={filterRef}></div>
          </div>

          <div className={cs("uploadContain")}>
            <button className={cs("uploadBtn")}>
              <FontAwesomeIcon
                className={cs("iconUpload")}
                icon={faArrowRightFromBracket}
              />
              Cập nhật ảnh mới
            </button>
            <input
              className={cs("chooseFile")}
              type="file"
              onChange={handleUploadImg}
              accept="image/*"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
