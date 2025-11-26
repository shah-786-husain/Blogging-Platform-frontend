import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import { store, persistor } from "./redux/store"; //  corrected import

import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Profile from "./Pages/Profile";
import UserLayout from "./Layout/UserLayout";
import Adminlayout from "./Layout/Adminlayout";
import Admin from "./Pages/Admin/Admin";
import AddPost from "./Pages/Admin/AddPost";
import User from "./Pages/Admin/User";
import AllPost from "./Pages/AllPost";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpdatePost from "./Pages/Admin/UpdatePost";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="blog/:postId" element={<Blog />} />
              <Route path="profile/:userId" element={<Profile />} />
            </Route>

            <Route path="/dashboard" element={<Adminlayout />}>
              <Route index element={<Admin />} />
              <Route path="addpost" element={<AddPost />} />
              <Route path="users" element={<User />} />
              <Route path="allposts" element={<AllPost />} />
              <Route
                path="/dashboard/update-post/:id"
                element={<UpdatePost />}
              />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
