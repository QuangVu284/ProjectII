import React from "react";
import image from "../../assets/Images";
import { logOutUser } from "../../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBox from "../SearchBox";
import styles from "./NavBar.module.scss";
import classNames from "classnames/bind";
import { NavLink, Link } from "react-router-dom";
const cs = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem("user"));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(() => {
        // console.log("sss");
        navigate("/signin");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
  };
  return (
    <div className={cs("navbar")}>
      <div className={cs("navbar-container")}>
        <div className={cs("logo-container")}>
          <img className={cs("logo")} src={image.logo} alt="aaa" />
        </div>
        <div className={cs("menu-container")}>
          <ul className={cs("menu-list")}>
            <li className={cs("menu-list-item")}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cs("NavLink", { active: isActive })
                }
              >
                Home
              </NavLink>
            </li>
            <li className={cs("menu-list-item")}>
              <NavLink
                to="/Premier League"
                className={({ isActive }) =>
                  cs("NavLink", { active: isActive })
                }
              >
                Premier League
              </NavLink>
            </li>
            <li className={cs("menu-list-item")}>
              <NavLink
                to="/Laliga"
                className={({ isActive }) =>
                  cs("NavLink", { active: isActive })
                }
              >
                Laliga
              </NavLink>
            </li>
            <li className={cs("menu-list-item")}>
              <NavLink
                to="/Serie A"
                className={({ isActive }) =>
                  cs("NavLink", { active: isActive })
                }
              >
                Serie A
              </NavLink>
            </li>
            <li className={cs("menu-list-item")}>
              <NavLink
                to="/Bundesliga"
                className={({ isActive }) =>
                  cs("NavLink", { active: isActive })
                }
              >
                Bundesliga
              </NavLink>
            </li>
          </ul>
        </div>
        <SearchBox />
        <div className={cs("profile-container")}>
          {user ? (
            <>
              <Link className={cs("link-avatar")} to="/profiles">
                <img src={user.avatar} className={cs("user-avatar")} alt="" />
              </Link>

              <button className={cs("log-button")} onClick={handleSignOut}>
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              className={cs("log-button")}
              onClick={() => navigate("/signin")}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
