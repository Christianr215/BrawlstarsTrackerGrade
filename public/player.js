document.addEventListener("DOMContentLoaded", () => {
    //DOMcontent loaded tells javascript file to wait until HTML file fully loaded 
    // Get the tag from the URL parameter
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    //window location gives info on the current url 
    //the ? after is the query string, so we get that when we search

    //URL search params parses query string and read values like keys
    //essentialy params organizes the query string 

    if (!tag) {
        document.getElementById('player-info').innerHTML = "No player tag provided";
        return;
    }
    
    //Dropdown brawlers
    const dropdownBtn = document.getElementById('brawlers-dropdown-btn');
    const brawlerContainer = document.getElementById('brawler-container');
    
    dropdownBtn.addEventListener('click', () => {
        dropdownBtn.classList.toggle('open');
        brawlerContainer.style.display = brawlerContainer.style.display === 'none' ? 'flex' : 'none';
    });
    
    // Fetch player data from the server
    const encodedTag = encodeURIComponent(tag);
    fetch(`http://localhost:3000/player/${encodedTag}`)
        .then(res => res.json())
        .then(data => {
            if (!data || data.reason) {
                console.error("API Error: ", data);
                document.getElementById('player-info').innerHTML = data.message || "Error fetching player data";
                return;
            } //error check if no info
            
            // Display player info
            let html = `<h2>${data.name}</h2>`;
            html += `<p>Tag: ${data.tag}</p>`;
            
            if (data.club && data.club.name) {
                html += `<p>Club: ${data.club.name}</p>`;
            }
            
            document.getElementById('player-info').innerHTML = html; //put it into the tiny box
            
            // Display brawlers
            if (Array.isArray(data.brawlers)) {
                brawlerContainer.innerHTML = '';
                data.brawlers.forEach(brawler => {
                    const brawlerElement = document.createElement('li');
                    brawlerElement.textContent = `${brawler.name} - Power: ${brawler.power}`;
                    brawlerContainer.appendChild(brawlerElement);
                });
            } else {
                console.error('Brawlers not found', data);
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById('player-info').innerHTML = "Error fetching player data";
        });
});
