import './config' // Load config

import {AxiosRequestConfig, AxiosResponse} from "axios";
import { getCookie } from '../tools/cookieReducerFactory';
import config from '../../config';


export function makeHttpEndpoint(endpoint: String) {
    if (endpoint.startsWith("/")) {
        // replace leading "/"
        endpoint = endpoint.substring(1)
    }
    // TODO: https
    
    
    return `${config.API_URL}${endpoint}`
}

export function configWithAuth<T>(baseConfig?: AxiosRequestConfig<T>): AxiosRequestConfig<T> {
    const jwtCookie = getCookie("token");
    if (jwtCookie == null) {
        throw new Error("token cookie not set")
    }
    return {
        ...baseConfig,
        headers: {
            ...baseConfig?.headers,
            Authorization: `Bearer ${JSON.parse(jwtCookie)}`
        }
    }
}

export async function collectPages<T>(fetchPage: (page: number) => Promise<Page<T>>): Promise<T[]> {
    const allPages: T[] = [];
    let currPage: Page<T>;
    let pageCount = 0;
    do {
        currPage = await fetchPage(pageCount);
        allPages.push(...currPage.content)
        pageCount++;
    } while (!currPage.last);
    return allPages;
}

export async function collectAxiosPages<T>(fetchPage: (page: number) => Promise<AxiosResponse<Page<T>>>): Promise<T[]> {
    const allPages: T[] = [];
    let currPage: Page<T>;
    let pageCount = 0;
    do {
        currPage = (await fetchPage(pageCount)).data;
        allPages.push(...currPage.content)
        pageCount++;
    } while (!currPage.last);
    return allPages;
}

export type Page<T> = {
    "totalPages": number,
    "totalElements": number,
    "size": number,
    "content": T[],
    "number": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "pageable": {
        "offset": number,
        "sort": {
            "empty": boolean,
            "sorted": boolean,
            "unsorted": boolean
        },
        "pageNumber": number,
        "pageSize": number,
        "unpaged": boolean,
        "paged": boolean
    },
    "first": boolean,
    "last": boolean,
    "numberOfElements": number,
    "empty": boolean
}