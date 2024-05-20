import React from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

const cs = classNames.bind(styles);

const SideBar = () => {
  return (
    <div className={cs("sidebar")}>
      <i className={cs("left-menu-icon", "fas", "fa-user")} />
      <i className={cs("left-menu-icon", "fas", "fa-bookmark")} />
      <i className={cs("left-menu-icon", "fas", "fa-tv")} />
      <i className={cs("left-menu-icon", "fas", "fa-hourglass-start")} />
      <i className={cs("left-menu-icon", "fas", "fa-shopping-cart")} />
    </div>
  );
};

export default SideBar;
