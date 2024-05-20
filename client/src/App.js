import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PlayVideo } from "./layouts/PlayVideo";
import { SignIn } from "./layouts/SignIn";
import { SignUp } from "./layouts/SignUp";
import MainLayout from "./layouts/Mainlayout";
import { ToastContainer } from "react-toastify";
import allRoute from "./route";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {allRoute.map((route, index) => {
          const Pages = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <MainLayout>
                  <Pages />
                </MainLayout>
              }
            />
          );
        })}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/watch/:slug" element={<PlayVideo />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
