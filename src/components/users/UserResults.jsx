import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {

    const { users, loading } = useContext(GithubContext);

    // Make sure that we do not render information on the page if our page has not finished loading
    // Loading state should be false for this to run (it is by default true)
    if(!loading) {
        return (
            // Setting up a grid layout that changes depending on the screen size
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:gird-cols-2">
                {/* Mapping over our users state and getting the github names of our individuals */}
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    } else {
        return <Spinner />
    }


   
}

export default UserResults