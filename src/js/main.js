'use strict';


// Variables globales
const nameInput = document.querySelector('.js_search_input');
const error = document.querySelector('.js-error');
const searchBtn = document.querySelector('.js_btn_search');
const ulSearchList = document.querySelector('.js_cocktails');
const ulFaveList = document.querySelector('.js_favorite_cocktails');
const resetBtn = document.querySelector('.js_btn_reset');
// const noImg = 'https://www.svgrepo.com/show/206298/cocktail-drink.svg';

let cocktails = [];
let faveCocktails = [];


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

const handleDeleteAllFaves = () => {
    faveCocktails = [];
    renderFaves();
    localStorage.clear();
}

const renderFaves = () => {
    ulFaveList.innerHTML = '';
    for (const eachCocktail of faveCocktails) {
        let cocktailImg = '';
        if (cocktailImg !== null) {
            cocktailImg = eachCocktail.strDrinkThumb;
        } else {
            cocktailImg = 'https://www.svgrepo.com/show/206298/cocktail-drink.svg';
        };

        ulFaveList.innerHTML += `
            <li class="cocktail-card js_li_cocktails fave" id="${eachCocktail.idDrink}">
            <h3 class="cocktail-card-title">${eachCocktail.strDrink}</h3>
            <img class="cocktail-card-img" src="${cocktailImg}">
            <button class="delete js-delete-fave">X</button>
            </li>`;
    };

    ulFaveList.innerHTML += `<button class="delete js-delete-allfaves hidden">Borrar todo</button>`;

    const btnDeleteFave = document.querySelector('.js-delete-fave');
    const btnDeleteAllFaves = document.querySelector('.js-delete-allfaves');

    if (faveCocktails.length !== 0) {
        btnDeleteAllFaves.classList.remove('hidden');
        btnDeleteFave.addEventListener('click', handleDeleteFave);
        btnDeleteAllFaves.addEventListener('click', handleDeleteAllFaves);
    };

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
    } else {
        // si está, lo quito del array de favoritos
        faveCocktails.splice(faveLiClickedIndex, 1);
    };
    renderFaves(faveCocktails);
    renderAllCocktails(cocktails);
    localStorage.setItem('favorites', JSON.stringify(faveCocktails));

}

const allCocktailsListener = () => {
    const allCocktailsLi = document.querySelectorAll('.js_li_cocktails');
    for (const li of allCocktailsLi) {
        li.addEventListener('click', handleAddFavorite);
    }
}

// Función render Listado de Cóctels
const renderAllCocktails = (resultsList) => {
    ulSearchList.innerHTML = '';
    for (const eachCocktail of resultsList) {

        let cocktailImg = '';

        if (cocktailImg !== null) {
            cocktailImg = eachCocktail.strDrinkThumb;
        } else {
            cocktailImg = 'https://www.svgrepo.com/show/206298/cocktail-drink.svg';
        }

        const indexFaveCocktail = faveCocktails.findIndex(
            (item) => item.idDrink === eachCocktail.idDrink
        );
        console.log(indexFaveCocktail);
        if (indexFaveCocktail !== -1) {
            ulSearchList.innerHTML += `
                <li class= "cocktail-card js_li_cocktails fave" id="${eachCocktail.idDrink}">
                <h3 class="cocktail-card-title">${eachCocktail.strDrink}</h3>
                <img class="cocktail-card-img" src="${cocktailImg}">
                </li>`;
        } else {
            ulSearchList.innerHTML += `
                <li class= "cocktail-card js_li_cocktails" id="${eachCocktail.idDrink}">
                <h3 class="cocktail-card-title">${eachCocktail.strDrink}</h3>
                <img class="cocktail-card-img" src="${cocktailImg}">
                </li>`;
        }

        allCocktailsListener();

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

const getDataDefault = () => {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
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
        error.innerHTML = '';
        getData(nameCocktail);
    };
};

const handleReset = () => {
    nameInput = '';
    ulSearchList.innerHTML = '';
}

const init = () => {
    const cocktailsFaveLocal = localStorage.getItem('favorites');

    if (cocktailsFaveLocal !== null) {
        faveCocktails = JSON.parse(cocktailsFaveLocal);
        renderFaves();
    };

    getDataDefault();
};

// Se ejecuta al cargar la página
init();
searchBtn.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);