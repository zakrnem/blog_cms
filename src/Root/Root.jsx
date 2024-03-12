import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import ErrorPage from "../error-page";
import LoginForm from "../LoginForm/LoginForm";
import PostsDash from "../PostsDash/PostsDash";
import CommentsDash from "../CommentsDash/CommentsDash";
import PostEdit from "../PostEdit/PostEdit";
import PostNew from "../PostNew/PostNew";

function Root() {
  return (
    <>
      <Header />

      <Outlet />
      <Routes errorElement={<ErrorPage />}>
        <Route path="" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/posts" element={<PostsDash />} />
        <Route path="/comments" element={<CommentsDash />} />
        <Route path="/post/edit" element={<PostEdit />} />
        <Route path="/post/new" element={<PostNew />} />
      </Routes>
    </>
  );
}

export default Root;
