async function generateWishList() {

    const wishList = document.querySelector("#wish-list");
    const wishesPromise = await fetch("http://localhost:3000/wishes/recent");
    const wishesJson = await wishesPromise.json();
    const wishes = wishesJson.map(element => {return { id: element.id, wish: new Wish(element.wish) }});

    const vote = async (e) => {
        let id, voteType;
        [id, voteType] = e.target.id.split("_");
        id = parseInt(id);
        console.log(voteType)

        if (voteType === "grants" || voteType === "denys") {
            const queryValue = voteType.slice(0, -1);
        
            // Set the options for the fetch request
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
            }
            console.log(options)
        
            // Make a fetch request sending the data
            const response = await fetch(`http://localhost:3000/wishes/${id}?vote=${queryValue}`, options);
            if (response.status === 200) {
                e.target.textContent += " ✅";
                e.target.classList.toggle("vote")
                e.target.removeEventListener("click", vote);
                window.location.reload();
            }
        } else {
            throw new Error("Invalid vote type. Should be grants or denys.")
        }
    }

    for (let entry of wishes) {
        const element = document.createElement("div");
        element.className = "wish";

        const wishID = document.createElement("p");
        wishID.id = `${entry.id}`;
        wishID.style.display = "none";

        const title = document.createElement("h3");
        title.textContent = `${entry.wish.wish}`;

        const dateCreated = document.createElement("p");
        dateCreated.textContent = `Created: ${entry.wish.timestamp.split('T')[0]}`;

        const name = document.createElement("p");
        name.textContent = `${entry.wish.name}`;

        const votes = document.createElement("div");
        const grants = document.createElement("p");
        grants.id = `${entry.id}_grants`;
        grants.classList.add("vote");
        grants.textContent = `Grants: ${entry.wish.grants}`;
        const denys = document.createElement("p");
        denys.id = `${entry.id}_denys`;
        denys.classList.add("vote");
        denys.textContent = `Denys: ${entry.wish.denys}`;
        votes.append(grants, denys);

        grants.addEventListener("click", vote);
        denys.addEventListener("click", vote);

        element.addEventListener("click", goToWish);

        element.append(wishID, title, dateCreated, name, votes);
        wishList.append(element);
    }
}

async function addWish(e) {
    e.preventDefault();
    
    const data = {
        name: e.target.name.value,
        wish: e.target.wish.value
    }
    console.log(data)

    // Set the options for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    console.log(options)

    // Make a fetch request sending the data
    const response = await fetch("http://localhost:3000/wishes/add-a-wish", options);

    if(response.status == 201) {
        alert("Wish created");
        window.location.reload();
    } else {
        alert(`Wish creation failed\nData = ${data}`)
    }
}

document.onload = generateWishList();
const wishForm = document.querySelector("#makeWish");
wishForm.addEventListener("submit", addWish);
