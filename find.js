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
  show.appendChild(Base);

  // Creating the character name element
  let Name = document.createElement('div');
  Name.textContent = details.name + '(' + details.pronouns + ')';
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
      let charId = details.id;
      // Navigate to object_view.html with character ID appended to the URL
      window.location.href = `object_view.html#${charId}`;
  });
}

async function test() {
  const requestURL = "https://topanimator2.github.io/The-Archive-main/links.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const locations = await response.json();

  // Sort the characters array alphabetically
  locations.characters.sort();

  // Iterate over the sorted character links and call characterCreate for each
  locations.characters.forEach(link => {
      characterCreate(link);
  });
}

test();
