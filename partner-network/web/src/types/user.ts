
export type User = {
    _id: string,
    first_name: string,
    last_name: string,
    bio: string,
    position: string,
    phone_number: string,
    email: string,
    profile_picture?: string,
    social_twitter?: string,
    social_linkedin?: string,
    social_github?: string,
    social_instagram?: string,
    social_snapchat?: string,
    registered_on: string,
    roles: string,
    used_activation_token: string,
    email_verified: boolean,
    really_email_verified: boolean,
    email_token: string,
    documents: string[],
    __v: number,
    giveaway_activation_token: ActivationToken[],
    numOfPosts: number,
    badges: object
}

export type Badge = {
    code: string,
    theme: string,
    registered_on: string
}

export type ActivationToken = {
    _id: string,
    used: boolean,
    token: string
}
