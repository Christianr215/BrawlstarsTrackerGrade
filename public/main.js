document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('brawler-container');
    
    document.getElementById("fetchdata").addEventListener("click", () => {
    
        const tag = document.getElementById("supercell").value; //end it with .value
        const encodedTag = encodeURIComponent(tag);
    
    
        if (!tag){
            alert("ENTER TAG");
        }
        //user enters tag in input field, we grab it
        //button click activates, fetch request is sent
        //send a request to the server, through background
        //server recieves it at, app.get, then uses api key
        //
    
        fetch(`http://localhost:3000/player/${encodedTag}`) //browser ask server for player data
            .then(res => res.json()) //does not use await because code runs on click event, recieves the data here from server
            .then(data => { //uses "then" instead of await 
                if (!data || data.reason){
                    console.error("API Erorr: ", data);
                    document.getElementById('data-container').innerHTML = data.message || "Error fetching data"
                    container.innerHTML = "";
                    return;
                }
                document.getElementById('data-container').innerHTML = `${data.name}`
                if (Array.isArray(data.brawlers)){
                    data.brawlers.forEach(brawler => {
                        console.log(`${brawler.name}`);
                        const index = document.createElement('li'); //we create an element here to insert or rather create of for data
                        index.textContent = `${brawler.name}`;
                        container.appendChild(index); //attach new element to another element in the page
                        //child means inside another element, parent is the element title aka index
                    })
                }
                else {
                    console.error('Brawlers not found', data);
                }
            })
            .catch(error => console.error(error));
        });
    });


