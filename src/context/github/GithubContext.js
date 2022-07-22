import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

// Creating the context instance
const GithubContext = createContext();


export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {}, // place where we will put our user profile information
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    

    

    return (
        // Creating the context allowing other components to access state and functions defined in the GithubContext
        <GithubContext.Provider value={{
            ...state,
            dispatch,
        }}>
            {children}
        </GithubContext.Provider>
    )
}


export default GithubContext;