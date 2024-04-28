'use strict';

// Variables globales
const nameInput = document.querySelector('.js_search_input');
const searchBtn = document.querySelector('.js_btn_search');
const resetBtn = document.querySelector('.js_btn_reset');
const ulSearchList = document.querySelector('.js_cocktails');
const error = document.querySelector('.js-error');

let cocktails = [];
let faveCocktails = [];


// Función render Listado de Cóctels
const renderAllCocktails = (array) => {
    ulSearchList.innerHTML = '';
    for (const drink of array) {
        if (drink.strDrinkThumb === null) {
            const noImg = 'www.svgrepo.com/show/206298/cocktail-drink.svg';
            ulSearchList.innerHTML += `
            <li class= "cocktail-card js_cocktails" id="${drink.idDrink}">
                <h3 class="cocktail-card-title">${drink.strDrink}</h3>
                <img class="cocktail-card-img" src="${noImg}">
            </li>`;
        } else {
            ulSearchList.innerHTML += `
            <li class= "cocktail-card js_cocktails" id="${drink.idDrink}">
                <h3 class="cocktail-card-title">${drink.strDrink}</h3>
                <img class="cocktail-card-img" src="${drink.strDrinkThumb}">
            </li>`;
        };
    };
};


// Función Fetch
const getData = (searchText) => {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(urlApi)
        .then(response => response.json())
        .then(dataApi => {
            cocktails = dataApi.drinks;
            renderAllCocktails(cocktails);
        })
        .catch(error => console.log(error))
};



//Función manejadora
const handleSearch = (event) => {
    event.preventDefault();
    const nameCocktail = nameInput.value;
    if (nameCocktail === '') {
        error.innerHTML = 'Por favor, introduce el nombre de un cóctel.';
    } else {
        getData(nameCocktail);
    }
};

// Se ejecuta al cargar la página
searchBtn.addEventListener('click', handleSearch);