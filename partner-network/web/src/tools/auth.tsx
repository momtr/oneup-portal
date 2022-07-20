import React, {FC, useCallback, useContext, useEffect, useReducer, useState} from "react";
import { getMe, signin, SigninBody, signup, SignupBody, uploadProfileImage } from "../api/users";
import { User } from "../types/user";
import { cookieReducerFactory, CookieOperations } from "./cookieReducerFactory";
import { loggerFactory, LogMessageType } from "./loggerFactory";


type PromiseFunc<T> = (body: T) => Promise<void>;

type AuthContextValueType = {
    user?: User,
    jwt?: string,
    userLoading: boolean,
    signin: PromiseFunc<SigninBody>,
    signupAndSignin: (body: SignupBody, profileImage?: Blob) => Promise<void>,
    signout: PromiseFunc<void>,
}

const AuthContext = React.createContext<AuthContextValueType>({} as AuthContextValueType);

const log = loggerFactory("F2CM-AUTH")

export const AuthProvider: FC = ({children}) => {

    const [jwt, dispatchJwtCookie] = useReducer(...cookieReducerFactory<string>("token"));
    const [user, setUser] = useState<User>();
    const [userLoading, setUserLoading] = useState(true);

    // fetch user if jwt changes
    useEffect(() => {
        setUserLoading(true);

        if (jwt == null) {
            setUser(undefined);
            setUserLoading(false);
            return;
        }

        getMe()
            .then((response) => {
                setUser(response.data.user);
                log(`Fetched user data for ${response.data.user.email}`, LogMessageType.info)
            })
            .catch(e => {
                log(e, LogMessageType.error)
            })
            .finally(() => setUserLoading(false));
    }, [jwt]);

    const signupAndSigninCallback = useCallback(async (body: SignupBody, profileImage?: Blob) => {
        await signup(body);
        const loginResponse = await signin({
            email: body.email,
            password: body.password
        });
        dispatchJwtCookie({operation: CookieOperations.set, value: loginResponse.data.token});
        profileImage && await uploadProfileImage(profileImage);
    }, []);

    const signinCallback = useCallback(async (body: SigninBody) => {
        const loginResponse = await signin(body);
        dispatchJwtCookie({operation: CookieOperations.set, value: loginResponse.data.token});
    }, []);

    const signoutCallback = useCallback(async () => {
        dispatchJwtCookie({operation: CookieOperations.erase});
    }, []);

    const value = {
        jwt: jwt,
        user: user,
        userLoading: userLoading,
        signupAndSignin: signupAndSigninCallback,
        signin: signinCallback,
        signout: signoutCallback
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export default function useAuth(): AuthContextValueType {
    return useContext(AuthContext)
}

