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
/* Base Styles */
:root {
    --type-normal: #A8A878;
    --type-fire: #F08030;
    --type-water: #6890F0;
    --type-electric: #F8D030;
    --type-grass: #78C850;
    --type-ice: #98D8D8;
    --type-fighting: #C03028;
    --type-poison: #A040A0;
    --type-ground: #E0C068;
    --type-flying: #A890F0;
    --type-psychic: #F85888;
    --type-bug: #A8B820;
    --type-rock: #B8A038;
    --type-ghost: #705898;
    --type-dragon: #7038F8;
    --type-dark: #705848;
    --type-steel: #B8B8D0;
    --type-fairy: #EE99AC;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-image: url('https://images.unsplash.com/photo-1542779283-429940ce8336?q=80&w=1470&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

/* Pokédex Container */
.pokedex {
    width: 100%;
    max-width: 1000px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    border: 15px solid #e60000;
    position: relative;
}

.pokedex::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 30px;
    background: #e60000;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    z-index: 10;
}

/* Header */
.pokedex-header {
    background: linear-gradient(to right, #e60000, #ff3333);
    color: white;
    padding: 20px;
    text-align: center;
    position: relative;
}

.pokedex-title {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.pokedex-subtitle {
    font-size: 1rem;
    font-weight: 300;
    opacity: 0.9;
}

/* Search Bar */
.search-container {
    padding: 20px;
    background: #f0f0f0;
    display: flex;
    gap: 10px;
}

.search-input {
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-button {
    background: #e60000;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 0 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.search-button:hover {
    background: #ff3333;
    transform: translateY(-2px);
}

/* Main Content */
.pokedex-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
}

@media (min-width: 768px) {
    .pokedex-content {
        grid-template-columns: 1fr 1fr;
    }
}

/* Pokémon Info Section */
.pokemon-info {
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pokemon-image-container {
    width: 200px;
    height: 200px;
    background: #f8f8f8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 5px solid #f0f0f0;
    position: relative;
    overflow: hidden;
}

.pokemon-image {
    max-width: 90%;
    max-height: 90%;
    transition: transform 0.3s;
}

.pokemon-image:hover {
    transform: scale(1.1);
}

.pokemon-id {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
}

.pokemon-name {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 10px;
    text-transform: capitalize;
    color: #333;
}

.pokemon-types {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.type-badge {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
}

/* Type Colors */
.type-normal { background-color: var(--type-normal); }
.type-fire { background-color: var(--type-fire); }
.type-water { background-color: var(--type-water); }
.type-electric { background-color: var(--type-electric); }
.type-grass { background-color: var(--type-grass); }
.type-ice { background-color: var(--type-ice); }
.type-fighting { background-color: var(--type-fighting); }
.type-poison { background-color: var(--type-poison); }
.type-ground { background-color: var(--type-ground); }
.type-flying { background-color: var(--type-flying); }
.type-psychic { background-color: var(--type-psychic); }
.type-bug { background-color: var(--type-bug); }
.type-rock { background-color: var(--type-rock); }
.type-ghost { background-color: var(--type-ghost); }
.type-dragon { background-color: var(--type-dragon); }
.type-dark { background-color: var(--type-dark); }
.type-steel { background-color: var(--type-steel); }
.type-fairy { background-color: var(--type-fairy); }

/* Stats Section */
.pokemon-stats {
    width: 100%;
    margin-top: 20px;
}

.stats-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #555;
    text-align: center;
}

.stat-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.stat-name {
    width: 100px;
    font-weight: 600;
    color: #666;
    text-transform: capitalize;
}

.stat-bar-container {
    flex: 1;
    height: 10px;
    background: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}

.stat-bar {
    height: 100%;
    background: linear-gradient(to right, #4facfe, #00f2fe);
    border-radius: 5px;
}

.stat-value {
    width: 40px;
    text-align: right;
    font-weight: 600;
}

/* Evolution Section */
.evolution-section {
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #e60000;
    border-radius: 3px;
}

.evolution-chain {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.evolution-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.evolution-pokemon {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: #f8f8f8;
    border-radius: 15px;
    width: 100%;
    max-width: 250px;
    transition: all 0.3s;
    cursor: pointer;
}

.evolution-pokemon:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.evolution-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.evolution-name {
    font-weight: 600;
    margin-top: 10px;
    text-transform: capitalize;
}

.evolution-id {
    font-size: 0.8rem;
    color: #777;
}

.evolution-types {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.evolution-arrow {
    font-size: 1.5rem;
    color: #e60000;
    margin: 5px 0;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .pokedex {
        border-width: 10px;
    }
    
    .pokedex-title {
        font-size: 2rem;
    }
    
    .pokemon-image-container {
        width: 150px;
        height: 150px;
    }
}

/* Loading State */
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #e60000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Error State */
.error-message {
    padding: 20px;
    background: #ffecec;
    color: #e60000;
    border-radius: 10px;
    text-align: center;
    margin: 20px;
    font-weight: 600;
}
/* Base Styles */
:root {
    --type-normal: #A8A878;
    --type-fire: #F08030;
    --type-water: #6890F0;
    --type-electric: #F8D030;
    --type-grass: #78C850;
    --type-ice: #98D8D8;
    --type-fighting: #C03028;
    --type-poison: #A040A0;
    --type-ground: #E0C068;
    --type-flying: #A890F0;
    --type-psychic: #F85888;
    --type-bug: #A8B820;
    --type-rock: #B8A038;
    --type-ghost: #705898;
    --type-dragon: #7038F8;
    --type-dark: #705848;
    --type-steel: #B8B8D0;
    --type-fairy: #EE99AC;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-image: url('https://images.unsplash.com/photo-1542779283-429940ce8336?q=80&w=1470&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

/* Pokédex Container */
.pokedex {
    width: 100%;
    max-width: 1000px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    border: 15px solid #e60000;
    position: relative;
}

.pokedex::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 30px;
    background: #e60000;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    z-index: 10;
}

/* Header */
.pokedex-header {
    background: linear-gradient(to right, #e60000, #ff3333);
    color: white;
    padding: 20px;
    text-align: center;
    position: relative;
}

.pokedex-title {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.pokedex-subtitle {
    font-size: 1rem;
    font-weight: 300;
    opacity: 0.9;
}

/* Search Bar */
.search-container {
    padding: 20px;
    background: #f0f0f0;
    display: flex;
    gap: 10px;
}

.search-input {
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-button {
    background: #e60000;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 0 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.search-button:hover {
    background: #ff3333;
    transform: translateY(-2px);
}

/* Main Content */
.pokedex-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
}

@media (min-width: 768px) {
    .pokedex-content {
        grid-template-columns: 1fr 1fr;
    }
}

/* Pokémon Info Section */
.pokemon-info {
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pokemon-image-container {
    width: 200px;
    height: 200px;
    background: #f8f8f8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 5px solid #f0f0f0;
    position: relative;
    overflow: hidden;
}

.pokemon-image {
    max-width: 90%;
    max-height: 90%;
    transition: transform 0.3s;
}

.pokemon-image:hover {
    transform: scale(1.1);
}

.pokemon-id {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
}

.pokemon-name {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 10px;
    text-transform: capitalize;
    color: #333;
}

.pokemon-types {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.type-badge {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
}

/* Type Colors */
.type-normal { background-color: var(--type-normal); }
.type-fire { background-color: var(--type-fire); }
.type-water { background-color: var(--type-water); }
.type-electric { background-color: var(--type-electric); }
.type-grass { background-color: var(--type-grass); }
.type-ice { background-color: var(--type-ice); }
.type-fighting { background-color: var(--type-fighting); }
.type-poison { background-color: var(--type-poison); }
.type-ground { background-color: var(--type-ground); }
.type-flying { background-color: var(--type-flying); }
.type-psychic { background-color: var(--type-psychic); }
.type-bug { background-color: var(--type-bug); }
.type-rock { background-color: var(--type-rock); }
.type-ghost { background-color: var(--type-ghost); }
.type-dragon { background-color: var(--type-dragon); }
.type-dark { background-color: var(--type-dark); }
.type-steel { background-color: var(--type-steel); }
.type-fairy { background-color: var(--type-fairy); }

/* Stats Section */
.pokemon-stats {
    width: 100%;
    margin-top: 20px;
}

.stats-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #555;
    text-align: center;
}

.stat-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.stat-name {
    width: 100px;
    font-weight: 600;
    color: #666;
    text-transform: capitalize;
}

.stat-bar-container {
    flex: 1;
    height: 10px;
    background: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}

.stat-bar {
    height: 100%;
    background: linear-gradient(to right, #4facfe, #00f2fe);
    border-radius: 5px;
}

.stat-value {
    width: 40px;
    text-align: right;
    font-weight: 600;
}

/* Evolution Section */
.evolution-section {
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #e60000;
    border-radius: 3px;
}

.evolution-chain {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.evolution-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.evolution-pokemon {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: #f8f8f8;
    border-radius: 15px;
    width: 100%;
    max-width: 250px;
    transition: all 0.3s;
    cursor: pointer;
}

.evolution-pokemon:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.evolution-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.evolution-name {
    font-weight: 600;
    margin-top: 10px;
    text-transform: capitalize;
}

.evolution-id {
    font-size: 0.8rem;
    color: #777;
}

.evolution-types {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.evolution-arrow {
    font-size: 1.5rem;
    color: #e60000;
    margin: 5px 0;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .pokedex {
        border-width: 10px;
    }
    
    .pokedex-title {
        font-size: 2rem;
    }
    
    .pokemon-image-container {
        width: 150px;
        height: 150px;
    }
}

/* Loading State */
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #e60000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Error State */
.error-message {
    padding: 20px;
    background: #ffecec;
    color: #e60000;
    border-radius: 10px;
    text-align: center;
    margin: 20px;
    font-weight: 600;
}
