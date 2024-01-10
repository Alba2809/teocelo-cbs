import { createContext, useContext, useEffect, useState } from "react";
import {
  createPostRequest,
  getPostsRequest,
  getPostRequest,
  updatePostRequest,
  deletePostRequest,
} from "../api/post";

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }

  return context;
};

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [errors, setErrors] = useState([]);

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getPosts = async () => {
    try {
      const res = await getPostsRequest();
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (title) => {
    try {
      const res = await getPostRequest(title);
      setPost(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id);
      return res.status
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        errors,
        createPost,
        getPosts,
        getPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
