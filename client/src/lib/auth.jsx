import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (token) => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userData = { ...decodedToken, token };
                setCurrentUser(userData);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setCurrentUser(null);
            }
        } else {
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
