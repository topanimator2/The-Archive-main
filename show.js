let fullId = window.location.hash
let objectType = fullId.match(/[a-z]+/gm)
let currentId = fullId.match(/\d+/gm)

console.log(objectType)
console.log(currentId)



async function GetAllLinks() {
    let fullId = window.location.hash
    let objectType = fullId.match(/[a-z]+/gm)
    let currentId = fullId.match(/\d+/gm)

    const requestURL = "https://topanimator2.github.io/The-Archive-main/links.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const locations = await response.json();
    if (objectType == 'char') {
        locations.characters.forEach(link => {
            // Iterate over the sorted character links and call characterCreate for each
            Search(link, currentId);
        }
        )
    } else
        if (objectType == 'city') {
            locations.cities.forEach(link => {
                // Iterate over the sorted character links and call characterCreate for each
                Search(link);
            }
            )
        }
}

async function Search(location, neededId) {

    let requestURL = location;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const details = await response.json();
    //FloodGate, an perhaps laggy approach
    let currentId = details.id
    if (currentId.toString() == neededId) {
        SetShowcase(details)
    }
};

function SetShowcase(information) {
    // Get the showcase container element
    const showcase = document.querySelector("#showcase");
    
    // Create HTML elements to display the information
    let title = document.createElement('h2');
    title.textContent = information.name + ' (' + information.pronouns + ')';
    showcase.appendChild(title);
    
    let age = document.createElement('p');
    age.textContent = 'Age: ' + information.age;
    age.classList.add('subtitle')
    showcase.appendChild(age);
    
    // Create a div to contain the sprites
    let spriteContainer = document.createElement('section');
    spriteContainer.classList.add('sprite-container');
    spriteContainer.style.backgroundImage = `url('${information.sprites[0]}'), url('sprites/misc/grid.ppg')`; // Set background images
    spriteContainer.style.backgroundSize = 'cover'; // Ensure background images cover the container
    
    // Create a div for each sprite
    information.sprites.forEach(sprite => {
        let img = document.createElement('img');
        img.src = sprite;
        spriteContainer.appendChild(img);
    });
    
    // Append the sprite container to the showcase
    showcase.appendChild(spriteContainer);
    
    let appearance = document.createElement('p');
    appearance.textContent = 'Appearance:';
    for (let range in information.appearance) {
        let div = document.createElement('div');
        div.textContent = range + ': ' + information.appearance[range];
        appearance.appendChild(div);
    }
    showcase.appendChild(appearance);
    
    let description = document.createElement('p');
    description.textContent = 'Description: ' + information.description;
    showcase.appendChild(description);
    
    let deeds = document.createElement('p');
    deeds.textContent = 'Deeds: ' + information.deeds;
    showcase.appendChild(deeds);
    
    let abilities = document.createElement('p');
    abilities.textContent = 'Abilities: ' + information.abilities;
    showcase.appendChild(abilities);
}





GetAllLinks()