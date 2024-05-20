import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { Link } from "react-router-dom";
// import { Img } from '~/apiService/instance';
// import Image from '~/components/Images';
const cs = classNames.bind(styles);

function SearchItem({ data, onClick }) {
  return (
    <Link
      to={`/watch/${data.slug}`}
      className={cs("reslutItem")}
      onClick={onClick}
    >
      <img className={cs("img")} src={`${data.img}`} alt="" />
      <h4 className={cs("name")}>{data.title}</h4>
    </Link>
  );
}

export default SearchItem;
