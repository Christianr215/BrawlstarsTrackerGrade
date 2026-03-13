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
        document.getElementById('club-info').innerHTML = "No club tag provided";
        return;
    }
    
    //Dropdown members
    const dropdownBtn = document.getElementById('members-dropdown-btn');
    const membersContainer = document.getElementById('members-container');
    
    dropdownBtn.addEventListener('click', () => {
        dropdownBtn.classList.toggle('open');
        membersContainer.style.display = membersContainer.style.display === 'none' ? 'flex' : 'none';
    });
    
    // Fetch club data from the server
    const encodedTag = encodeURIComponent(tag);
    fetch(`http://localhost:3000/clubs/${encodedTag}`)
        .then(res => res.json())
        .then(data => {
            if (!data || data.reason) {
                console.error("API Error: ", data);
                document.getElementById('club-info').innerHTML = data.message || "Error fetching club data";
                return;
            } //error check if no info
            
            // Display club info
            let html = `<h2>${data.name}</h2>`;
            html += `<p>Tag: ${data.tag}</p>`;
            html += `<p>Description: ${data.description || "No description"}</p>`;
            html += `<p>Type: ${data.type || "N/A"}</p>`;
            html += `<p>Members: ${data.members || 0}</p>`;
            
            document.getElementById('club-info').innerHTML = html; //put it into the info box
            
            // Fetch and display members
            fetch(`http://localhost:3000/clubs/${encodedTag}/members`)
                .then(res => res.json())
                .then(memberData => {
                    if (!memberData || memberData.reason) {
                        console.error("API Error: ", memberData);
                        return;
                    }
                    
                    if (Array.isArray(memberData.items)) {
                        membersContainer.innerHTML = '';
                        memberData.items.forEach(member => {
                            const memberElement = document.createElement('li');
                            memberElement.textContent = `${member.name} - Role: ${member.role}`;
                            membersContainer.appendChild(memberElement);
                        });
                    } else {
                        console.error('Members not found', memberData);
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    membersContainer.innerHTML = '<li>Error fetching members</li>';
                });
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById('club-info').innerHTML = "Error fetching club data";
        });
});