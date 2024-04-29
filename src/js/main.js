'use strict';


// Variables globales
const nameInput = document.querySelector('.js_search_input');
const error = document.querySelector('.js-error');
const searchBtn = document.querySelector('.js_btn_search');
const ulSearchList = document.querySelector('.js_cocktails');
const ulFaveList = document.querySelector('.js_favorite_cocktails');
const resetBtn = document.querySelector('.js_btn_reset');

let cocktails = [];
let faveCocktails = [];


const renderOneCocktail = (eachCocktail) => {
    let html = '';

    html = `
        <li class= "cocktail-card js_li_cocktails" id="${eachCocktail.idDrink}">
        <h3 class="cocktail-card-title">${eachCocktail.strDrink}</h3>
        <img class="cocktail-card-img" src="${eachCocktail.strDrinkThumb}">
        </li>`;

    return html;

};

const handleDeleteFave = (event) => {
    const clickedDeleteBtn = event.currentTarget.id;
    const clickedDeleteCocktail = faveCocktails.find((item) => item.idDrink === clickedDeleteBtn);
    const clickedDeleteCocktailIndex = faveCocktails.findIndex(
        (item) => item.idDrink === clickedDeleteCocktail
    );
    faveCocktails.splice(clickedDeleteCocktailIndex, 1);

    renderFaves();
    localStorage.setItem('favorites', JSON.stringify(faveCocktails));

}

const renderFaves = () => {
    ulFaveList.innerHTML = '';

    for (const fave of faveCocktails) {
        const indexFav = faveCocktails.findIndex((item) => item.idDrink === fave.idDrink);

        let faveClass = indexFav === -1 ? '' : 'fave';

        ulFaveList.innerHTML += `<li class="cocktail-card js_li_cocktails ${faveClass}" id="${fave.idDrink}">
            <h3 class="cocktail-card-title">${fave.strDrink}</h3>
            <img class="cocktail-card-img" src="${fave.strDrinkThumb}">
            <button class="delete js-delete-fave">X</button>
            </li>`;
    }

    const btnDeleteFave = document.querySelector('.js-delete-fave');
    if (btnDeleteFave !== null) {
        btnDeleteFave.addEventListener('click', handleDeleteFave);
    }

};


const handleAddFavorite = (event) => {
    const liClickedId = event.currentTarget.id;

    // con el id de nuestro cocktail clickado buscamos con cuál coincide de mi array
    const clickedCocktail = cocktails.find((item) => item.idDrink === liClickedId);

    // verificar si el cocktail seleccionado ya está en favoritos
    const faveLiClickedIndex = faveCocktails.findIndex(
        (item) => item.idDrink === liClickedId
    );

    // favoriteLiClickedIndex será -1 cuando el id no se encuentre en el array de favoritos
    if (faveLiClickedIndex === -1) {
        // si no está en mi array de favoritos, añadir al array de favoritos el cocktail seleccionado
        faveCocktails.push(clickedCocktail);
        localStorage.setItem('favorites', JSON.stringify(faveCocktails));
    } else {
        // si está, lo quito del array de favoritos
        faveCocktails.splice(faveLiClickedIndex, 1);
    };

    renderFaves();

}


// Función render Listado de Cóctels
const renderAllCocktails = (array) => {
    ulSearchList.innerHTML = '';

    for (const item of array) {
        ulSearchList.innerHTML += renderOneCocktail(item);
    }

    // Añadir a favoritos
    const allCocktailsLi = document.querySelectorAll('.js_li_cocktails');
    for (const li of allCocktailsLi) {
        li.addEventListener('click', handleAddFavorite);
    }

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


//Funciones manejadoras
const handleSearch = (event) => {
    event.preventDefault();
    const nameCocktail = nameInput.value.toLowerCase();
    if (nameCocktail === '') {
        error.innerHTML = 'Por favor, introduce el nombre de un cóctel.';
    } else {
        getData(nameCocktail);
    }
};

const handleReset = () => {
    nameInput = '';
    ulSearchList.innerHTML = '';
    localStorage.clear();
    // ulFaveList.innerHTML = '';
    // faveCocktails = [];
    // localStorage.removeItem('favorites');
}

const init = () => {
    const cocktailsFaveLocal = localStorage.getItem('favorites');

    if (cocktailsFaveLocal !== null) {
        faveCocktails = JSON.parse(cocktailsFaveLocal);
        renderFaves();
    }
};

// Se ejecuta al cargar la página
init();
searchBtn.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);
