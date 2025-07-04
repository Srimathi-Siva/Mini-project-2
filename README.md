<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokédex Pro</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="pokedex">
        <div class="pokedex-header">
            <h1 class="pokedex-title">Pokédex Pro</h1>
            <p class="pokedex-subtitle">Gotta catch 'em all!</p>
        </div>
        
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search Pokémon by name or ID..." id="searchInput">
            <button class="search-button" id="searchButton">Search</button>
        </div>
        
        <div class="pokedex-content">
            <div class="pokemon-info">
                <div class="pokemon-image-container">
                    <span class="pokemon-id" id="pokemonId">#025</span>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" class="pokemon-image" id="pokemonImage">
                </div>
                
                <h2 class="pokemon-name" id="pokemonName">Pikachu</h2>
                
                <div class="pokemon-types" id="pokemonTypes">
                    <span class="type-badge type-electric">Electric</span>
                </div>
                
                <div class="pokemon-stats">
                    <h3 class="stats-title">Base Stats</h3>
                    <div class="stat-item">
                        <span class="stat-name">HP</span>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: 55%"></div>
                        </div>
                        <span class="stat-value">55</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-name">Attack</span>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: 80%"></div>
                        </div>
                        <span class="stat-value">80</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-name">Defense</span>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: 50%"></div>
                        </div>
                        <span class="stat-value">50</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-name">Sp. Atk</span>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: 75%"></div>
                        </div>
                        <span class="stat-value">75</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-name">Sp. Def</span>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: 60%"></div>
                        </div>
                        <span class="stat-value">60</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-name">Speed</span>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: 90%"></div>
                        </div>
                        <span class="stat-value">90</span>
                    </div>
                </div>
            </div>
            
            <div class="evolution-section">
                <h3 class="section-title">Evolution Chain</h3>
                
                <div class="evolution-chain" id="evolutionChain">
                    <div class="evolution-stage">
                        <div class="evolution-pokemon">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png" alt="Pichu" class="evolution-image">
                            <span class="evolution-name">Pichu</span>
                            <span class="evolution-id">#0172</span>
                            <div class="evolution-types">
                                <span class="type-badge type-electric">Electric</span>
                            </div>
                        </div>
                        
                        <div class="evolution-arrow">↓</div>
                        
                        <div class="evolution-pokemon">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" class="evolution-image">
                            <span class="evolution-name">Pikachu</span>
                            <span class="evolution-id">#0025</span>
                            <div class="evolution-types">
                                <span class="type-badge type-electric">Electric</span>
                            </div>
                        </div>
                        
                        <div class="evolution-arrow">↓</div>
                        
                        <div class="evolution-pokemon">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png" alt="Raichu" class="evolution-image">
                            <span class="evolution-name">Raichu</span>
                            <span class="evolution-id">#0026</span>
                            <div class="evolution-types">
                                <span class="type-badge type-electric">Electric</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>

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
