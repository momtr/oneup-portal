import React from "react";

export enum CookieOperations {
    set,
    erase
}

type CookieAction<T> = {
    operation: CookieOperations,
    value?: T,
    days?: number,
}

function makeCookieReducer<T>(cookieName: string): React.Reducer<T | undefined, CookieAction<T>> {
    return (prevState, action) => {
        switch (action.operation) {
            case CookieOperations.set:
                const data = JSON.stringify(action.value);
                setCookie(cookieName, data, action.days || 30);
                return action.value;
            case CookieOperations.erase:
                eraseCookie(cookieName);
                return undefined;
        }
    }
}

function getInitialCookieValue<T>(name: string): T | undefined {
    if (typeof window === 'undefined') {
        return;
    }
    const cookie = getCookie(name);
    if (!cookie) {
        return;
    }
    return JSON.parse(cookie);
}

export function cookieReducerFactory<T>(name: string): [React.Reducer<T | undefined, CookieAction<T>>, T | undefined] {
    return [makeCookieReducer<T>(name), getInitialCookieValue<T>(name)];
}

export function setCookie(name: String, value: string, days: number) {

    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: String) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name: String) {
    document.cookie = name + '=; Max-Age=-99999999;';
}