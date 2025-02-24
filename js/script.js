const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImages = document.getElementById('images');
const pokemonType = document.getElementById('pokemon_type');

const form = document.getElementById('form');
const input = document.getElementById('input');

const buttonPrev = document.getElementById('btn-prev');
const buttonNext = document.getElementById('btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImages.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonType.innerHTML =  ("Type: "+ data['types']['0']['type']['name']);
        pokemonImages.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];

        input.value = '';
        searchPokemon = data.id;
    }
    else {
        pokemonImages.style.display = 'none';
        pokemonName.innerHTML = 'not found :(';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {

    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }

});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

