document.addEventListener("DOMContentLoaded", () => {
    //Search Player
    document.getElementById("search-player-btn").addEventListener("click", () => {
        const playerID = document.getElementById("player-search").value;
        
        if (!playerID) {
            alert("Please enter a Player ID");
            return;
        }
        
        // Navigate to player page with the ID as a URL parameter
        window.location.href = `player?tag=${encodeURIComponent(playerID)}`;
    });

    //Search Club
    document.getElementById("search-club-btn").addEventListener("click", () => {
        const clubID = document.getElementById("club-search").value;
        
        if (!clubID) {
            alert("Please enter a Club ID");
            return;
        }
        
        // Navigate to club page with the ID as a URL parameter (or handle as needed)
        window.location.href = `player?tag=${encodeURIComponent(clubID)}`;
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


