import { createContext, useState, useEffect } from "react";

// Creating the context instance
const GithubContext = createContext();

// Getting our url and token from our environment variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const GithubProvider = ({ children }) => {
    // Set up our users state initialize with an empty array
    // As we fetch from the Github API we will use that information to populate the state
    const [ users, setUsers ] = useState([]);
    // Set up our page loading state
    // By default our page is loading
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []) // empty brackets signals to our useEffect hook that is has no dependencies (runs on DOM load as designed)

    const fetchUsers = async () => {
        // Fetch data from the Github API using our personal token (env)
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        
        // Updating our states (users and loading)
        // Populating our users state and changing our default loading state
        setUsers(data);
        setLoading(false);

    }


    return (
        <GithubContext.Provider value={{
            users,
            loading,
            fetchUsers

        }}>
            {children}
        </GithubContext.Provider>
    )
}


export default GithubContext;