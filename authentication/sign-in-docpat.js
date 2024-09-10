
const signInDocElement = document.getElementById('doc');
const signInPatElement = document.getElementById('pat');

signInDocElement.addEventListener('click', function() {
   
    window.location.href = 'login.html'; 
});

signInPatElement.addEventListener('click', function() {
    
    window.location.href = "/authentication/patienAuth/patSig.html"; 
});