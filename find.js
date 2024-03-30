document.addEventListener("DOMContentLoaded", async function () {
  const searchInput = document.querySelector("#search input[type='text']");
  const showSlot = document.querySelector(".showslot");
  const filterCheckbox = document.querySelector("#search input[type='checkbox']");
  let isTyping = false; // Flag to indicate if the user is typing

  async function characterCreate(location) {
      const request = new Request(location);
      const response = await fetch(request);
      const details = await response.json();

      // Create the character element
      let characterDiv = document.createElement('div');
      characterDiv.classList.add('character');
      characterDiv.textContent = details.name + ' (' + details.pronouns + ')';

      // Add click event listener to the character element
      characterDiv.addEventListener('click', () => {
          // Extract character ID from the element's ID
          let charId = 'char' + details.id;
          // Navigate to object_view.html with character ID appended to the URL
          window.location.href = `object_view.html#${charId}`;
      });

      // Append the character element to the show slot
      showSlot.appendChild(characterDiv);
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

  // Perform search when the user types in the search input
  searchInput.addEventListener('input', async () => {
      const searchText = searchInput.value.trim().toLowerCase(); // Trim whitespace and convert to lowercase
      if (searchText.length === 0) return; // Exit if the search input is empty
      isTyping = true; // Set the flag to true

      // Clear the previous search results
      showSlot.innerHTML = '';

      const requestURL = "https://topanimator2.github.io/The-Archive-main/links.json";
      const request = new Request(requestURL);
      const response = await fetch(request);
      const locations = await response.json();

      locations.characters.forEach(link => {
          const characterName = link.split('/').pop().split('.')[0]; // Extract character name from the link
          if (characterName.toLowerCase().startsWith(searchText)) {
              characterCreate(link);
          }
      });
  });

  // Hide the show slot if the user clicks outside the search input
  document.addEventListener('click', function(event) {
      if (!event.target.closest("#search") && !isTyping) {
          showSlot.classList.add('hidden');
      }
  });

  test();
});
