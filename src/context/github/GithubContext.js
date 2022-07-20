import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

// Creating the context instance
const GithubContext = createContext();

// Getting our url and token from our environment variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get initial users (testing purposes)
    const fetchUsers = async () => {
        setLoading();

        // Fetch data from the Github API using our personal token (env)
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        
        
        dispatch({
            type: "GET_USERS",
            payload: data
        })

    }

    // Set loading
    const setLoading = () => {
        dispatch({
            type: "SET_LOADING",
        })
    }


    return (
        // Creating the context allowing other components to access state and functions defined in the GithubContext
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            fetchUsers

        }}>
            {children}
        </GithubContext.Provider>
    )
}


export default GithubContext;