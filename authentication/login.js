// login.js
import{ signInWithEmailAndPassword, auth} from '../firebaseConfig.js'

// Submit button
const submitBtn = document.getElementById("submit");
const loading = document.getElementById("loading");

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Show loading spinner
    loading.style.display = "flex";

    // Input
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;


    const loadingTimeout = setTimeout(() => {
        loading.style.display = "none";
    }, 7000); // 7 seconds

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("login is successful")


            const user = userCredential.user;

            localStorage.setItem("loggedInUserId" , user.uid);
            console.log(user);

            clearTimeout(loadingTimeout);
            // Hide loading spinner
            loading.style.display = "none";
            // Redirect
            window.location.href = "../home-page/home.html";
           
        })
        .catch((error) => {
            clearTimeout(loadingTimeout);
            loading.style.display = "none";
            alert(error.message);
        });
    
});

// Password toggle functionality
const togglePassword = document.getElementById('toggle-password');
const passwordField = document.getElementById('login-password');

togglePassword.addEventListener('click', function () {
    // Toggle password visibility
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Toggle the eye icon
    this.classList.toggle('fa-eye-slash');
});
