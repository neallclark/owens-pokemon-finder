define(function (require) {
  const Pokedex = require("pokeapi-js-wrapper")
  const P = new Pokedex.Pokedex()
 
  var generationSelected = "1";
  var typeSelected = "All";
  var pokemonNamesForType;

  function fetchPokemon() {
     P.getGenerationByName(generationSelected)
      .then(function(response) {
        
        // convert the list of species to just a list of names of the species
        const speciesNames = response.pokemon_species.map(species => species.name);

        
        if (typeSelected === "All") {
          document.getElementById('result-box').textContent = JSON.stringify(speciesNames);
        }
        else {
          // filter it by type
          const filteredSpeciesNames = speciesNames.filter(name => pokemonNamesForType.includes(name));
          document.getElementById('result-box').textContent = JSON.stringify(filteredSpeciesNames);
          }
      })
  }


  function fetchByType(pokeType) {
    P.getTypeByName(pokeType)
      .then(function(response) {
        pokemonNamesForType = response.pokemon.map(x => x.pokemon.name);
        console.log(pokemonNamesForType);
        });
  }

  function handleGenerationButtonClick(generation) {
    generationSelected = generation;
    fetchPokemon();
  }

  // Select all buttons with id starting with 'gen-'
  let genButtons = document.querySelectorAll('[id^="gen-"]');

  // Iterate over the buttons
  for(let i = 0; i < genButtons.length; i++) {
      // Add event listener to each button
      genButtons[i].addEventListener('click', function(event) {
          // Get the generation from the data-generation attribute
          let generation = event.target.getAttribute('data-generation');
          handleGenerationButtonClick(generation);

          // Remove 'selected' class from all generation buttons
          genButtons.forEach((button) => {
              button.classList.remove('selected');
          });

          // Add 'selected' class to the clicked button
          event.target.classList.add('selected');
      });
  }

  function handleTypeButtonClick(pokeType) {
    typeSelected = pokeType;
    fetchByType(pokeType);
    fetchPokemon();
  }

  // Select all buttons with id starting with 'gen-'
  let typeButtons = document.querySelectorAll('[id^="type-"]');

  // Iterate over the buttons
  for(let i = 0; i < typeButtons.length; i++) {
      // Add event listener to each button
      typeButtons[i].addEventListener('click', function(event) {
          // Get the generation from the data-type attribute
          let pokeType = event.target.getAttribute('data-type');
          handleTypeButtonClick(pokeType);

          // Remove 'selected' class from all type buttons
          typeButtons.forEach((button) => {
            button.classList.remove('selected');
          });
        
          // Add 'selected' class to the clicked button
          event.target.classList.add('selected');
      });
  }

});





// function setPuzzle(response) {
//   setName(response);

//   setClue1(response);
//   setClue2(response);
//   setClue3(response);
//   setClue4(response);
//   setClue5(response);
// }

// function setName(response) {
//   // TODO: make this show ****** instead of name (e.g. use the length)
//   document.getElementById('name').textContent = response.name;
// }

// function setClue1(response) {
//   // TODO: need to hide these
//   document.getElementById('clue1').textContent = "TODO";
// }
