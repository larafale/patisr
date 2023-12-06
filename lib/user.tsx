
"use client"
import { Dispatch, createContext, useContext, useState } from "react";
import { User } from "@/lib/specs";

const UserContext = createContext({})

type Props = {
    children?: React.ReactNode,
    user: User
}
export const UserProvider = ({ children, user: serverUser }: Props) => {
    const [user, setUser_] = useState(serverUser);
    const setUser = (data: User) => setUser_({ ...user, ...data})

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

type HookProps = {
    user: User,
    setUser: Dispatch<User>
}
export const useUser = () => useContext(UserContext) as HookProps;
