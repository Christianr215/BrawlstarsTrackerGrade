document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('brawler-container');
    
    document.getElementById("fetchdata").addEventListener("click", () => {
        const tag = document.getElementById("supercell").value;
        
        if (!tag){
            alert("ENTER TAG");
            return;
        }
        
        // Navigate to player page with the tag as a URL parameter on the same window
        window.location.href = `player?tag=${encodeURIComponent(tag)}`;
        //?tag couldve been called anything, its where tag is determine 
    });
    });


