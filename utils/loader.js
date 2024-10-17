const loader = (element, text) => {
    console.log('called')
    const spinner =document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
    <div class="lds-spinner" >
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
    </div>`
    spinner.style.height = '100%';
    spinner.style.width = '100%';
    spinner.style.position = "absolute";
    spinner.style.backgroundColor = "rgba(0, 0, 0, 0.8";
    spinner.style.zIndex = "1000000";
    spinner.style.display = "grid";
    spinner.style.placeContent = "center";
    const innertext = document.createElement('p');
    spinner.appendChild(innertext);
    innertext.style.color = '#fff'
    innertext.innerText = text;

    element.prepend(spinner);


    const spinTime = setTimeout(() => {
        element.removeChild(spinner);
        clearTimeout(spinTime);
    }, 10000)
}

export default loader;