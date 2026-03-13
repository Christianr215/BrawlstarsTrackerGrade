document.addEventListener("DOMContentLoaded", () => {
    //Search Player
    document.getElementById("search-player-btn").addEventListener("click", () => {
        const playerID = document.getElementById("player-search").value;
        
        if (!playerID) {
            alert("Please enter a Player ID");
            return;
        }
        
        // Remove # if user included it
        const cleanID = playerID.startsWith('#') ? playerID.slice(1) : playerID;
        // Navigate to player page with the ID as a URL parameter
        window.location.href = `player?tag=${encodeURIComponent(cleanID)}`;
    });

    //Search Club
    document.getElementById("search-club-btn").addEventListener("click", () => {
        const clubID = document.getElementById("club-search").value;
        
        if (!clubID) {
            alert("Please enter a Club ID");
            return;
        }
        
        // Remove # if user included it
        const cleanID = clubID.startsWith('#') ? clubID.slice(1) : clubID;
        // Navigate to club page with the ID as a URL parameter
        window.location.href = `club?tag=${encodeURIComponent(cleanID)}`;
    });

    //Allow Enter key to trigger search
    document.getElementById("player-search").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            document.getElementById("search-player-btn").click();
        }
    });

    document.getElementById("club-search").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            document.getElementById("search-club-btn").click();
        }
    });
});


