import Home from "../layouts/Home";
import Profile from "../layouts/Profiles";

const allRoute = [
  { path: "/", component: Home },
  { path: "/:category", component: Home },
  { path: "/profiles", component: Profile },
];
export default allRoute;
