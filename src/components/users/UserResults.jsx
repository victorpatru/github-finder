import { useEffect, useState } from "react";

function UserResults() {

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
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        
        // Updating our states (users and loading)
        // Populating our users state and changing our default loading state
        setUsers(data);
        setLoading(false);

    }

    // Make sure that we do not render information on the page if our page has not finished loading
    // Loading state should be false for this to run (it is by default true)
    if(!loading) {
        return (
            // Setting up a grid layout that changes depending on the screen size
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:gird-cols-2">
                {/* Mapping over our users state and getting the github names of our individuals */}
                {users.map((user, i) => (
                    <h3 key={i}>{user.login}</h3>
                ))}
            </div>
        )
    } else {
        return <h3>Loading...</h3>
    }


   
}

export default UserResults