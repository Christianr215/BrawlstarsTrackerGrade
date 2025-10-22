document.getElementById("fetchdata").addEventListener("click", () => {
    const tag = document.getElementById("supercell").value; //end it with .value
    fetch(`http://localhost:3000/player/${tag}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(`Player name : ${data.name}`);
        })
        .catch(error => console.error(error));
});

