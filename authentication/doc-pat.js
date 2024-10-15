

    const docElement = document.getElementById('doctor');
    const patElement = document.getElementById('patient');
    
    docElement.addEventListener('click', function() {
       
        window.location.href = 'registration.html'; 
    });

    patElement.addEventListener('click', function() {
        
        window.location.href = "../patienAuth/patReg.html"; 
    });



