/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';



// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){
        var newElement = document.createElement("div")
        newElement.className = 'game-card'

        let img = document.createElement("img")
        img.className = "game-img"
        let title = document.createElement("h4")
        let description = document.createElement('p')


        //adding HTML inside of div
        img.src = games[i].img;
        title.textContent = games[i].name;
        description.textContent = games[i].description;

        newElement.appendChild(img)
        newElement.appendChild(title)
        newElement.appendChild(description);

        document.getElementById("games-container").appendChild(newElement);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContribution = GAMES_JSON.reduce((sum, GAMES_JSON) => {
    return sum + GAMES_JSON.backers
}, 0).toLocaleString();


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContribution;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal

let totalRaised = GAMES_JSON.reduce((sum, GAMES_JSON) => {
    return sum + GAMES_JSON.pledged
}, 0).toLocaleString();

raisedCard.innerHTML = "$" + totalRaised;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let totalGames = GAMES_JSON.reduce((sum, GAMES_JSON) => {
    return sum + 1
}, 0)

gamesCard.innerHTML = totalGames

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((GAMES_JSON) => {
        return GAMES_JSON.pledged < GAMES_JSON.goal
    })
  
    
    // use the function we previously created to add the unfunded games to the DOM
    console.log(unfundedGames)
    addGamesToPage(unfundedGames)
}




// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((GAMES_JSON) => {
        return GAMES_JSON.pledged >= GAMES_JSON.goal
    })


    // use the function we previously created to add unfunded games to the DOM
    console.log(fundedGames)
    addGamesToPage(fundedGames)
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded = GAMES_JSON.filter((GAMES_JSON) => {
    return GAMES_JSON.pledged < GAMES_JSON.goal;
}).length

const funded = GAMES_JSON.filter((GAMES_JSON) => {
    return GAMES_JSON.pledged >= GAMES_JSON.goal;
}).length


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, ${unfunded} game${unfunded !== 1 ? 's' : ''} remain${unfunded !== 1 ? '' : 's'} unfunded. We need your help to fund ${unfunded !== 1 ? 'these' : 'this'} amazing game${unfunded !== 1 ? 's' : ''}!`;
// create a new DOM element containing the template string and append it to the description container

let newPara = document.createElement('p');
newPara.innerText = displayStr;
descriptionContainer.append(newPara);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [{name: firstGame}, {name: secondGame}, ...restOfGames] = sortedGames;


console.log(firstGame)
// create a new element to hold the name of the top pledge game, then append it to the correct element
let topGame = document.createElement('h2');
topGame.innerHTML = firstGame;

let secGame = document.createElement('h2');
secGame.innerHTML = secondGame;


// do the same for the runner up item

firstGameContainer.append(topGame);
secondGameContainer.append(secGame);



//Search bar

function filterSelect() {
    deleteChildElements(gamesContainer);


    const filteredOp = GAMES_JSON.filter((GAMES_JSON) => {
        return GAMES_JSON.name === document.getElementById("searchBar").value;
    })

    addGamesToPage(filteredOp)

    document.getElementById("searchBar").value = '';

}



//eventlistener for search button
const searchBtn = document.getElementById("lookBtn");
searchBtn.addEventListener("click", filterSelect)
