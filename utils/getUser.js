export const getUser = () => {
    const loggedInUser = sessionStorage.getItem("userDetails");
    
    if (!loggedInUser) {
        console.log("No user found in session.");
        return null;
    }

    const userData = JSON.parse(loggedInUser);  // Correctly parse the string into an object
    console.log("Logged in user:", userData);    // You can now access the user properties

    return userData;
};
