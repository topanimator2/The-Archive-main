async function characterCreate(location) {
    const show = document.querySelector("#charactershow");

    let requestURL = location;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const details = await response.json();

    // Creating the character element
    let Base = document.createElement('div');
    Base.setAttribute('id', 'char' + details.id);
    Base.classList.add('character');

    // Creating the character name element
    let Name = document.createElement('div');
    Name.textContent = details.name + ' (' + details.pronouns + ')';
    Base.appendChild(Name);

    // Creating the character age element
    let Age = document.createElement('div');
    Age.textContent = 'Age: ' + details.age;
    Base.appendChild(Age);

    // Creating the character sprites
    details.sprites.forEach(sprite => {
        if (sprite.search(/main.png/gm) != -1) {
            let Image = document.createElement('img');
            Image.setAttribute('alt', "Image couldn't be found");
            Image.setAttribute('src', sprite);
            Base.appendChild(Image);
        }
    });

    // Add click event listener to the character element
    Base.addEventListener('click', () => {
        // Extract character ID from the element's ID
        let charId = 'char' + details.id;
        // Navigate to object_view.html with character ID appended to the URL
        window.location.href = `object_view.html#${charId}`;
    });

    // Append the character element to the show container
    show.appendChild(Base);
}

async function locationCreate(location) {
    const show = document.querySelector("#locationshow");

    let requestURL = location;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const details = await response.json();

    // Creating the location element
    let Base = document.createElement('div');
    Base.setAttribute('id', 'loc' + details.id);
    Base.classList.add('location');

    // Creating the location name element
    let Name = document.createElement('div');
    Name.textContent = details.name;
    Base.appendChild(Name);

    // Creating the location description element
    let Description = document.createElement('div');
    Description.textContent = 'Description: ' + details.description;
    Base.appendChild(Description);

    // Creating the location age element
    let Age = document.createElement('div');
    Age.textContent = 'Age: ' + details.age;
    Base.appendChild(Age);

    // Creating the location coordinates element
    let Coordinates = document.createElement('div');
    Coordinates.textContent = 'Coordinates: ' + details.coordinates;
    Base.appendChild(Coordinates);

    // Creating the location image element
    let Image = document.createElement('img');
    Image.setAttribute('alt', "Image couldn't be found");
    Image.setAttribute('src', details.image);
    Base.appendChild(Image);

    // Add click event listener to the location element
    Base.addEventListener('click', () => {
        // Extract location ID from the element's ID
        let locId = 'loc' + details.id;
        // Navigate to object_view.html with location ID appended to the URL
        window.location.href = `object_view.html#${locId}`;
    });

    // Append the location element to the show container
    show.appendChild(Base);
}

async function test() {
    const requestURL = "https://topanimator2.github.io/The-Archive-main/links.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const locations = await response.json();

    // Check if characters and locations arrays exist
    if (locations.characters && Array.isArray(locations.characters)) {
        // Sort the characters array alphabetically
        locations.characters.sort();

        // Iterate over the sorted character links and call characterCreate for each
        locations.characters.forEach(link => {
            characterCreate(link);
        });
    } else {
        console.error("Characters data is missing or not an array");
    }

    if (locations.locations && Array.isArray(locations.locations)) {
        // Sort the locations array alphabetically
        locations.locations.sort();

        // Iterate over the sorted location links and call locationCreate for each
        locations.locations.forEach(link => {
            locationCreate(link);
        });
    } else {
        console.error("Locations data is missing or not an array");
    }

    // Call the handleSearch function after the characters and locations have been created
    handleSearch();
}

test();

// Function to handle search
function handleSearch() {
    const searchInput = document.querySelector("#search input[type='text']");
    const timeInput = document.querySelector("#time-filter");
    const characters = document.querySelectorAll(".character");
    const locations = document.querySelectorAll(".location");

    if (!searchInput || !timeInput) {
        console.error("Search input or time input element not found");
        return;
    }

    const filterCharacters = () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        const filterTime = timeInput.value ? parseInt(timeInput.value, 10) : null;

        characters.forEach(character => {
            const name = character.querySelector('div').textContent.toLowerCase();
            const timeEnd = parseInt(character.getAttribute('data-timeend'), 10);

            let showCharacter = name.includes(searchValue);

            if (filterTime !== null) {
                showCharacter = showCharacter && (!timeEnd || filterTime <= timeEnd);
            }

            character.classList.toggle("hidden", !showCharacter);
        });
    };

    const filterLocations = () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        const filterTime = timeInput.value ? parseInt(timeInput.value, 10) : null;

        locations.forEach(location => {
            const name = location.querySelector('div').textContent.toLowerCase();
            const timeEnd = parseInt(location.getAttribute('data-timeend'), 10);

            let showLocation = name.includes(searchValue);

            if (filterTime !== null) {
                showLocation = showLocation && (!timeEnd || filterTime <= timeEnd);
            }

            location.classList.toggle("hidden", !showLocation);
        });
    };

    // Add event listeners to input fields
    searchInput.addEventListener('input', () => {
        filterCharacters();
        filterLocations();
    });

    timeInput.addEventListener('input', () => {
        filterCharacters();
        filterLocations();
    });
}
