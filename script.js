// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonId = document.getElementById('pokemonId');
const pokemonTypes = document.getElementById('pokemonTypes');
const evolutionChain = document.getElementById('evolutionChain');

// Initial load - show Pikachu by default
document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonData('pikachu');
});

// Search functionality
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchPokemonData(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            fetchPokemonData(query);
        }
    }
});

// Fetch Pokémon data from PokeAPI
async function fetchPokemonData(query) {
    try {
        // Show loading state
        pokemonName.textContent = 'Loading...';
        pokemonTypes.innerHTML = '';
        
        // Fetch basic Pokémon data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemonData = await response.json();
        
        // Display Pokémon info
        displayPokemonInfo(pokemonData);
        
        // Fetch species data for evolution chain
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();
        
        // Fetch and display evolution chain
        if (speciesData.evolution_chain) {
            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionData = await evolutionResponse.json();
            displayEvolutionChain(evolutionData.chain);
        }
        
    } catch (error) {
        console.error('Error:', error);
        pokemonName.textContent = 'Error loading Pokémon';
        evolutionChain.innerHTML = `<div class="error-message">${error.message}</div>`;
    }
}

// Display Pokémon info
function displayPokemonInfo(data) {
    // Set image
    pokemonImage.src = data.sprites.other['official-artwork'].front_default || 
                         data.sprites.front_default || 
                         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png';
    pokemonImage.alt = data.name;
    
    // Set name and ID
    pokemonName.textContent = data.name;
    pokemonId.textContent = `#${String(data.id).padStart(3, '0')}`;
    
    // Set types
    pokemonTypes.innerHTML = '';
    data.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.className = `type-badge type-${type.type.name}`;
        typeElement.textContent = type.type.name;
        pokemonTypes.appendChild(typeElement);
    });
    
    // Update stats bars
    const statBars = document.querySelectorAll('.pokemon-stats .stat-bar');
    const statValues = document.querySelectorAll('.pokemon-stats .stat-value');

    data.stats.forEach((stat, index) => {
        const statPercentage = (stat.base_stat / 255) * 100; // Assuming max stat of 255
        statBars[index].style.width = `${statPercentage}%`;
        statValues[index].textContent = stat.base_stat;
    });
}

// Display evolution chain
async function displayEvolutionChain(chain) {
    evolutionChain.innerHTML = '';
    
    // Simple implementation - shows linear evolution chain
    // For more complex chains, you'd need to handle branching
    let current = chain;
    const stages = [];
    
    while (current) {
        stages.push(current.species);
        current = current.evolves_to[0]; // Only follow first evolution path
    }
    
    if (stages.length <= 1) {
        evolutionChain.innerHTML = '<div class="evolution-pokemon">This Pokémon does not evolve.</div>';
        return;
    }
    
    const stageContainer = document.createElement('div');
    stageContainer.className = 'evolution-stage';
    
    for (const [index, stage] of stages.entries()) {
        // Get Pokémon details for each stage
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${stage.name}`);
        const pokemonData = await pokemonResponse.json();
        
        // Create evolution card
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'evolution-pokemon';
        pokemonCard.innerHTML = `
            <img src="${pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="evolution-image">
            <span class="evolution-name">${pokemonData.name}</span>
            <span class="evolution-id">#${String(pokemonData.id).padStart(3, '0')}</span>
            <div class="evolution-types">
                ${pokemonData.types.map(type => 
                    `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
                ).join('')}
            </div>
        `;
        
        // Add event listener to each evolution card to fetch its data on click
        pokemonCard.addEventListener('click', () => fetchPokemonData(pokemonData.name));

        stageContainer.appendChild(pokemonCard);
        
        // Add arrow if not last stage
        if (index < stages.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'evolution-arrow';
            arrow.textContent = '↓';
            stageContainer.appendChild(arrow);
        }
    }
    
    evolutionChain.appendChild(stageContainer);
}