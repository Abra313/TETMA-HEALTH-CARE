const loader = (element, text) => {
    console.log('called');
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
    <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>`;

    spinner.style.position = "fixed"; // Use fixed positioning for full viewport coverage
    spinner.style.top = '0';
    spinner.style.left = '-30%';

   
    spinner.style.height = '100vh';
    spinner.style.width = '150vw'; // Use 100vw for full width
    spinner.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    spinner.style.zIndex = "1000000";
    spinner.style.display = "flex"; // Use flexbox for centering
    spinner.style.flexDirection = "column"; // Use flexbox for centering
    spinner.style.alignItems = "center"; // Center vertically
    spinner.style.justifyContent = "center"; // Center horizontally

    const innerText = document.createElement('p');
    spinner.appendChild(innerText);
    innerText.style.color = 'black';
    innerText.innerText = text;

    // Append the spinner to the specified element
    element.prepend(spinner);

    const spinTime = setTimeout(() => {
        element.removeChild(spinner);
        clearTimeout(spinTime);
    }, 5000);
};

export default loader;
