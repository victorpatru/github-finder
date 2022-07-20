import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserSearch() {
    // Setting the state
    const [text, setText] = useState("");

    // Setting up the context Hook
    const { users, searchUsers, clearUsers } = useContext(GithubContext); 


    // Setting our state based on the input value
    const handleChange = (e) => setText(e.target.value);

    // Our form submit functionality
    const handleSubmit = (e) => {
        e.preventDefault(); // ensures that our page does not reload once we hit the "Go" button

        // Form validation
        if (text === "") {
            alert("Please input value into the search box")
        } else {
            // From our Context, fetch from the API based on the value of our state (value that we get from the input search box)
            searchUsers(text);

            // Reset our state
            setText("");
        }
    };


    return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input 
                            type="text" 
                            className="w-full pr-40 bg-gray-200 input input-lg text-black" 
                            placeholder="Search" 
                            value={text} // sets the initial state of our input field; in this case it is equal to our (initial) state which is ""
                            onChange={handleChange} />
                        <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg" type="">Go</button>
                    </div>
                </div>
            </form>
        </div>
        { users.length > 0 && 
            (
                <div>
                    <button 
                        className="btn btn-glass btn-lg bg-black-600"
                        onClick={clearUsers}
                        >Clear</button>
                </div>
            )
        }
    </div>
    )
}

export default UserSearch