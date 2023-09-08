document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    const imageElement = document.getElementById('pokeimg');
    const nameElement = document.getElementById('pokemon');
    const idElement = document.getElementById('pokeid');
    const abilitiesList = document.getElementById('pokehabilidades');
    const searchInput = document.getElementById('busqueda');
    const searchButton = document.getElementById('boton-busqueda');

    // funcion para cambiar el color de la tarjeta
    function changeCardColor(pokemonType) {
        const cardpoke = document.querySelector('.pokecard');

        const typeClasses = {
            water: 'water',
            fire: 'fire',
            grass: 'grass',
            electric: 'electric',
            ice: 'ice',
            poison: 'poison',
            ground: 'ground',
            flying: 'flying',
            psychic: 'psychic',
            bug: 'bug',
            rock: 'rock',
            ghost: 'ghost',
            steel: 'steel',
            fairy: 'fairy',
            dark: 'dark',
            normal: 'normal',
            dragon: 'dragon',
            fighting: 'fighting',
        };

        Object.values(typeClasses).forEach(typeClass => {
            cardpoke.classList.remove(typeClass);
        });

        if (typeClasses[pokemonType]) {
            cardpoke.classList.add(typeClasses[pokemonType]);
        }
    }

    // funcion para buscar pokemon
    function searchPokemon(searchTerm) {
    fetch(`${apiUrl}${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró el Pokemon :(');
            }
            return response.json();
        })
        .then(data => {
            imageElement.src = data.sprites.front_default;
            nameElement.textContent = data.name;
            idElement.textContent = data.id;

            abilitiesList.innerHTML = '';

            data.abilities.forEach(ability => {
                const listItem = document.createElement('li');
                listItem.textContent = ability.ability.name;
                abilitiesList.appendChild(listItem);
            });

            changeCardColor(data.types[0].type.name);
        })
        .catch(error => {
            console.error(error);
            alert('No se encontró el Pokemon :(');
        });
}

    // click para buscar
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm) {
            searchPokemon(searchTerm);
        } else {
            alert('Ingresa un nombre o número de Pokemon.');
        }
    });

    // dato por defecto
    fetch(`${apiUrl}1`)
        .then(response => response.json())
        .then(data => {
            imageElement.src = data.sprites.front_default;
            nameElement.textContent = data.name;
            idElement.textContent = data.id;

            abilitiesList.innerHTML = '';

            data.abilities.forEach(ability => {
                const listItem = document.createElement('li');
                listItem.textContent = ability.ability.name;
                abilitiesList.appendChild(listItem);
            });

            changeCardColor(data.types[0].type.name);
        })
        .catch(error => console.log(error));
});




