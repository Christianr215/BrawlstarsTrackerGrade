const container = document.getElementById('brawler-container');
document.getElementById("fetchdata").addEventListener("click", () => {
    const tag = document.getElementById("supercell").value; //end it with .value
    const encodedTag = encodeURIComponent(tag);
    if (!tag){
        alert("ENTER TAG");
    }
    fetch(`http://localhost:3000/player/${encodedTag}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById('data-container').innerHTML = `${data.name}`
            data.brawlers.forEach(brawler => {
                // were inside the array now 
                console.log(`${brawler.name}`); //we have to use the dollar sign notation inside for each for log
                const index = document.createElement('li'); //we create an element here to insert or rather create of for data
                index.textContent = `${brawler.name}`;
                container.appendChild(index); //attach new element to another element in the page
                //child means inside another element, parent is the element title aka index               
            });
        })
        .catch(error => console.error(error));
});

