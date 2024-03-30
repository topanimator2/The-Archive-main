document.addEventListener("DOMContentLoaded", function () {
  // hide

  function hideAll() {
    let char = document.querySelector("#char");
    char.classList.add("hidden");
  }

  hideAll();
  let selec = document.querySelector("#selection");
  selec.addEventListener("input", (event) => {
    let selected = selec.value;

    hideAll();

    // choose
    if (selected === "Character") {
      char.classList.remove("hidden");
    }
  });

  // appear
  let appearanceSection = document.querySelector("#appear");
  let ages = document.querySelector("#appearance");

  ages.addEventListener("input", (event) => {
    let currentValue = parseInt(ages.value);

    // Check if the current number of children is less than the specified value
    while (appearanceSection.children.length > currentValue) {
      appearanceSection.removeChild(appearanceSection.lastElementChild); // Remove the last child
    }

    // Add more children if the current number of children is less than the specified value
    while (appearanceSection.children.length < currentValue) {
      // Create the HTML content as a string
      const sectionHTML = `
        <section class="appeared">
          <label for="age-range">Age </label>
          <input type="number" id="age-range" name="range" minlength="1"/>:
          <textarea id="age-appear" name="appear" rows="5" cols="33"></textarea>
        </section>
      `;

      // Create a container element
      const container = document.createElement('div');

      // Set the HTML content to the container using innerHTML
      container.innerHTML = sectionHTML;

      // Append the section to the appearanceSection
      appearanceSection.appendChild(container.firstElementChild);
    }
  });

  let copied = document.querySelector('#ccopy');
  copied.addEventListener('click', (event) => {
    // top
    let charName = document.querySelector('#name').value;
    let charPronouns = document.querySelector('#pronouns').value;
    let charAge = document.querySelector('#age').value || '0'; // Default to '0' if no input
    let charSprites = document.querySelector('#sprites').value;

    // middle
    let appearanceSections = document.querySelectorAll('.appeared');
    let appearances = {};
    appearanceSections.forEach((section, index) => {
      let ageRange = section.querySelector('#age-range').value;
      let ageAppear = section.querySelector('#age-appear').value;
      appearances[`${index * 2 + 1}-${index * 2 + 2}`] = ageAppear;
    });

    // Split the sprites input by commas
    let Sprites = charSprites.split(',');

    // Create the JSON object
    let characterData = {
      name: charName,
      age: charAge,
      pronouns: charPronouns,
      id: document.querySelector('#id').value || '0', // Use the #id input value or '0' if not provided
      sprites: Sprites.map(sprite => `sprites/characters/${charName}/${sprite}`), // Updated sprites URLs
      appearance: appearances,
      description: document.querySelector('#description').value,
      deeds: document.querySelector('#deeds').value.split(';').filter(deed => deed.trim() !== ''), // Split and filter out empty deeds
      abilities: document.querySelector('#abilities').value,
    };

    // Convert the JSON object to a string
    let jsonString = JSON.stringify(characterData, null, 4);

    // Display the JSON string
    let outputText = document.querySelector('#text');
    outputText.textContent = jsonString;
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Load JSON links
  const loadJSON = async (url) => {
      const response = await fetch(url);
      return await response.json();
  };

  // Function to search for characters
  const searchCharacters = async (query) => {
      const links = await loadJSON("links.json");
      const characterLinks = links.characters;

      // Filter character links based on the query
      const filteredCharacterLinks = characterLinks.filter(link => {
          return link.includes(query);
      });

      // Fetch and display character details for each filtered link
      const showSlot = document.querySelector(".showslot");
      showSlot.innerHTML = ""; // Clear previous results
      filteredCharacterLinks.forEach(async (link) => {
          const response = await fetch(link);
          const character = await response.json();
          displayCharacter(character);
      });
  };

  // Function to display character details
  const displayCharacter = (character) => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");

      const name = document.createElement("h3");
      name.textContent = character.name;
      characterDiv.appendChild(name);

      const age = document.createElement("p");
      age.textContent = "Age: " + character.age;
      characterDiv.appendChild(age);

      // Add more details as needed

      // Append character div to show slot
      const showSlot = document.querySelector(".showslot");
      showSlot.appendChild(characterDiv);
  };

  // Event listener for search input
  const searchInput = document.querySelector("#search input[type='text']");
  searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      searchCharacters(query);
  });

});
