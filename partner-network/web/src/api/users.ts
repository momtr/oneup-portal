import { configWithAuth, makeHttpEndpoint } from "./index";
import axios, { AxiosResponse } from "axios";
import { Badge, User } from "../types/user";
import config from "../../config";


export type SigninBody = {
    email: string,
    password: string
}

type SigninResponse = {
    token: string,
}

export async function signin(body: SigninBody): Promise<AxiosResponse<SigninResponse>> {
    return axios.post(makeHttpEndpoint("auth/signin"), body);
}

export type SignupBody = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    activation_code: string,
    bio: string,
    position: string,
    phone_number?: string,
    social_twitter?: string,
    social_linkedin?: string
    social_github?: string,
    social_instagram?: string,
    social_snapchat?: string,
}

export type UserProfile = {
    _id: string,
    first_name: string,
    last_name: string,
    bio: string,
    position: string,
    email: string,
    phone_number: string,
    social_twitter?: string,
    social_linkedin?: string,
    social_github?: string,
    social_instagram?: string,
    social_snapchat?: string,
    registered_on: string,
    documents: string[],
    badges: Badge[],
    numOfPosts: number,
    profile_picture?: string
}

export type UserProfilePageElement = {
    page: number,
    element: number,
    user: UserProfile
}

export type UserProfilePage = {
    page: number,
    size: number,
    users: UserProfilePageElement[]
}

export async function signup(parameters: SignupBody): Promise<AxiosResponse<void>> {
    (Object.keys(parameters) as (keyof SigninBody)[]).forEach((key) => {
        if (parameters[key] === '' || parameters[key] == null) {
            delete parameters[key];
        }
    });
    return axios.post(makeHttpEndpoint("auth/signup"), parameters);
}

export async function getMe(): Promise<AxiosResponse<{ user: User }>> {
    return axios.get(makeHttpEndpoint("profiles/me"), configWithAuth())
}

export async function uploadProfileImage(image: Blob): Promise<AxiosResponse<void>> {
    const formData = new FormData();
    formData.append("file", image);
    return axios.post(makeHttpEndpoint("profiles/me/profile-picture"), formData, configWithAuth({
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }));
}

export function getProfileImageUrl(profilePicturePath: string): string {
    return config.API_URL + profilePicturePath
}

export async function getUsersToConnect(page: number): Promise<AxiosResponse<UserProfilePage>> {
    return axios.get(makeHttpEndpoint(`profiles?page=${page}`), configWithAuth())
}

