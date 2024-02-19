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
    console.log(neededId)
    if (currentId.toString == neededId) {
        SetShowcase(details)
    }
};

function SetShowcase(information) {
    console.log(information)
    // Get the showcase container element
    const showcase = document.querySelector("#showcase");
    
    // Create HTML elements to display the information
    let title = document.createElement('h2');
    title.textContent = information.name + ' (' + information.pronouns + ')';
    showcase.appendChild(title);
    
    let age = document.createElement('p');
    age.textContent = 'Age: ' + information.age;
    showcase.appendChild(age);
    
    let sprites = document.createElement('div');
    sprites.textContent = 'Sprites:';
    information.sprites.forEach(sprite => {
        let img = document.createElement('img');
        img.src = sprite;
        sprites.appendChild(img);
    });
    showcase.appendChild(sprites);
    
    let appearance = document.createElement('p');
    appearance.textContent = 'Appearance:';
    for (let range in information.appearance) {
        let span = document.createElement('span');
        span.textContent = range + ': ' + information.appearance[range];
        appearance.appendChild(span);
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