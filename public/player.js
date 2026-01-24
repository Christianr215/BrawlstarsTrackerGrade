document.addEventListener("DOMContentLoaded", () => {
    // Get the tag from the URL parameter
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    
    if (!tag) {
        document.getElementById('player-info').innerHTML = "No player tag provided";
        return;
    }
    
    // Fetch player data from the server
    const encodedTag = encodeURIComponent(tag);
    fetch(`http://localhost:3000/player/${encodedTag}`)
        .then(res => res.json())
        .then(data => {
            if (!data || data.reason) {
                console.error("API Error: ", data);
                document.getElementById('player-info').innerHTML = data.message || "Error fetching player data";
                return;
            }
            
            // Display player info
            let html = `<h2>${data.name}</h2>`;
            html += `<p>Tag: ${data.tag}</p>`;
            
            if (data.club && data.club.name) {
                html += `<p>Club: ${data.club.name}</p>`;
            }
            
            document.getElementById('player-info').innerHTML = html; //put it into the tiny box
            
            // Display brawlers
            const brawlerContainer = document.getElementById('brawler-container');
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
