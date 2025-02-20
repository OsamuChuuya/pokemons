import pokemons from "./pokemons.js"
const pokemonContainer =document.getElementById('pokemonContainer')
const searchInput = document.getElementById('searchInput')
const filterType = document.getElementById('filterType')
const sortBy = document.getElementById('sortBy')
const searchButton = document.getElementById('searchButton')


function generator(pokemon){
    pokemonContainer.innerHTML = '';
    pokemon.forEach(pokemon => {
        const card =document.createElement('div');
        card.classList.add('card')
        card.innerHTML=`
        <div>${pokemon.num}</div>
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.img}" alt="">
        <h2> ${pokemon.type}</h2>
        <p>candy count: ${pokemon.candy_count}</p>
        <p>${pokemon.weight}</p>
        <h4>${pokemon.weaknesses}</h4>
        `;
        pokemonContainer.appendChild(card)
    });
}

function filter(){
    let filteredPokemons = pokemons; 
    if(sortBy.value === 'alphabeticalAsc'){
        filteredPokemons.sort((a,b) => a.name.localeCompare(b.name));
    } else if(sortBy.value === 'alphabeticalDesc'){
        filteredPokemons.sort((a,b) => b.name.localeCompare(a.name));
    }
     else if(sortBy.value === 'weightAsc'){
        filteredPokemons.sort((a,b) => parseFloat(a.weight) - parseFloat(b.weight));
    } else if(sortBy.value === 'weightDesc'){
        filteredPokemons.sort((a,b) => parseFloat(b.weight) - parseFloat(a.weight))   
    }

    generator(filteredPokemons);
}

function filterByType(){
    const selectType= filterType.value.toLowerCase();
    let filteredPokemons;
    if(selectType === "all"){
    filteredPokemons=pokemons;
    }else{
        filteredPokemons= pokemons.filter(pokemon => pokemon.type.includes(filterType.value))
    }
    generator(filteredPokemons)
}

function search(){
    const searchValue = searchInput.value.toLowerCase().trim()
    const filteredPok= pokemons.filter(pokemon => { 
        const m = pokemon.name.trim().toLowerCase();
        return m.includes(searchValue)
    });
    if (filteredPok.length > 0) {
        generator(filteredPok);
    } else {
        pokemonContainer.innerHTML = '<p>Ничего не найдено</p>';
    }
}


generator(pokemons)
filterType.addEventListener('change', filterByType)
sortBy.addEventListener('change', filter)
searchButton.addEventListener('click', filter)


searchInput.addEventListener('input', search)




