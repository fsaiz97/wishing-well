async function getWishData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch(`http://localhost:3000/wishes/${id}`);
    const wish = await response.json();

    return wish;
}

async function displayWishData() {
    
    const wishJSON = await getWishData();
    const wish = new Wish(wishJSON.wish);

    // Add Title
    const title = document.querySelector("#wish-title");
    title.textContent = `${wish.wish}`;

    const dateCreated = document.querySelector("#wish-date-created")
    dateCreated.textContent = `Created: ${wish.timestamp.split('T')[0]}`;

    const name = document.querySelector("#name");
    name.textContent = `${wish.name}`;

    const grants = document.querySelector("#grants")
    grants.id = `grants`;
    grants.classList.add("vote");
    grants.textContent = `Grants: ${wish.grants}`
    const denys = document.querySelector("#denys");
    denys.id = `denys`;
    denys.classList.add("vote")
    denys.textContent = `Denys: ${wish.denys}`

    grants.addEventListener("click", vote);
    denys.addEventListener("click", vote);
    
}

displayWishData();
