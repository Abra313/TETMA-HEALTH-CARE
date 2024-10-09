// getUser.js
export const getUser = () => {
    const loggedInUser = sessionStorage.getItem("userDetails");

    if (!loggedInUser) {
        console.log("No user found in session.");
        return null;
    }

    try {
        const userData = JSON.parse(loggedInUser);  // Parse the string into an object
        console.log("Logged in user:", userData);    // Log the user object for debugging
        return userData;  // Return the parsed user object
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};
