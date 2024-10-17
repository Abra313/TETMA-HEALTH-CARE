function populateMockData() {
    const mockData = {
        cardHolderName1: "Jordan",
        cardHolderName2: "Jarome",
        expiry: "12/26",
        cvv: "123",
        cardType: "personal"
    };

    // Populate the fields with mock data
    document.getElementById('cardHolderName1').value = mockData.cardHolderName1;
    document.getElementById('cardHolderName2').value = mockData.cardHolderName2;
    document.getElementById('expiry').value = mockData.expiry;
    document.getElementById('cvv').value = mockData.cvv;
    document.getElementById('cardType').checked = mockData.cardType === "personal";

    // Redirect to review.html after populating the data 
    setTimeout(() => {
        window.location.href = "review.html";
    }, 500); // 500ms delay before redirecting, adjust as needed
}