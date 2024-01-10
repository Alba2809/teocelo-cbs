import axios from "./axios";

export const getPostsRequest = () => axios.get("/posts");

export const getPostRequest = (title) => axios.get(`/posts/${title}`);

export const createPostRequest = (post) => axios.post("/posts", post);

export const updatePostRequest = (id, post) => axios.put(`/posts/${id}`, post);

export const deletePostRequest = (id) => axios.delete(`/posts/${id}`);
