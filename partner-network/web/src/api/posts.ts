import { configWithAuth, makeHttpEndpoint } from "./index";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/user";

export type Author = {
    first_name: string,
    last_name: string,
    bio: string,
    position: string,
    registered_on: string,
    profile_picture?: string
}

export type Liker = {
    first_name: string,
    last_name: string,
    profile_picture?: string
}

export type Like = {
    likeNum: number,
    liker: Liker,
    time: string
}

export type Post = {
    id: number,
    text: string,
    registered_on: string,
    author: Author,
    attached_documents: {
        [key: string]: {
            display_name: string
        }
    },
    likes: Like[],
    liked: true,
}

export type PostPage = {
    element: number,
    page: number,
    post: Post
}

export type GetPostsResponse = {
    page: number,
    size: number,
    posts: PostPage[]
}

export type CreatePostBody = {
    text: string,
    attached_documents: {
        [key: string]: {
            display_name: string
        }
    },
}

export async function getPosts(page: number): Promise<AxiosResponse<GetPostsResponse>> {
    return axios.get(makeHttpEndpoint(`feed?page=${page}`), configWithAuth())
}

export async function createPost(paramenters: CreatePostBody): Promise<AxiosResponse<any>> {
    return axios.post(makeHttpEndpoint("posts"), paramenters, configWithAuth())
}

export async function likePost(postId: number): Promise<AxiosResponse<any>> {
    return axios.put(makeHttpEndpoint(`posts/${postId}/like`), undefined, configWithAuth());
}