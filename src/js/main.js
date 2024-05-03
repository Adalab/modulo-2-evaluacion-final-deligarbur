'use strict';

// Variables globales
let nameInput = document.querySelector( '.js_search_input' );
const error = document.querySelector( '.js-error' );
const searchBtn = document.querySelector( '.js_btn_search' );
const ulSearchList = document.querySelector( '.js_cocktails' );
const ulFaveList = document.querySelector( '.js_favorite_cocktails' );
const resetBtn = document.querySelector( '.js_btn_reset' );

let cocktails = [];
let faveCocktails = [];


const renderFaves = () => {
    // pone la ul a vacío para que no se dupliquen los resultados
    ulFaveList.innerHTML = '';

    // dibujará la lista con la clase ‘fave’, y añade el botón X en cada <li>
    for ( const eachCocktail of faveCocktails ) {
        let cocktailImg = '';
        if ( cocktailImg !== null ) {
            cocktailImg = eachCocktail.strDrinkThumb;
        } else if ( cocktailImg === null ) {
            cocktailImg = 'https://www.svgrepo.com/show/206298/cocktail-drink.svg';
        };

        ulFaveList.innerHTML += `
            <li class="cocktail_card js_li_favorites fave" >
                <h3 class="cocktail_card-title">${eachCocktail.strDrink}</h3>
                <img class="cocktail_card-img" src="${cocktailImg}">
                <button class="cocktail_card-delete js_delete_favorite" id="${eachCocktail.idDrink}">X</button>
            </li>`;
    };
    // dibuja el botón eliminarlos todos
    ulFaveList.innerHTML += `<button class="cocktail_card-delete js_delete_all_favorites hidden">Borrar todo</button>`;

    favoritesListener();
}

// Función manejadora para eliminar todos los favoritos
const handleDeleteAllFaves = () => {
    faveCocktails = [];
    renderFaves();
    renderAllCocktails();
    localStorage.clear();
}
// Función manejadora para eliminar uno a uno los favoritos (X)
const handleDeleteFave = ( event ) => {
    // Cogemos el id del elemento clickado
    const clickedDeleteBtn = event.target.id;
    // Utilizando findindex, comparo mediante ids y así sé en qué posición está 
    const clickedDeleteCocktailIndex = faveCocktails.findIndex(
        ( item ) => item.idDrink === clickedDeleteBtn
    );
    // Con splice la quito del listado de favoritos, renderizamos de nuevo, y guardamos en local storage.
    faveCocktails.splice( clickedDeleteCocktailIndex, 1 );
    localStorage.setItem( 'favorites', JSON.stringify( faveCocktails ) );
    renderFaves();
    renderAllCocktails();
}

const favoritesListener = () => {
    const btnDeleteFave = document.querySelectorAll( '.js_delete_favorite' );
    const btnDeleteAllFaves = document.querySelector( '.js_delete_all_favorites' );

    // if ( faveCocktails === 0 ) {
    //     btnDeleteAllFaves.classList.remove( 'hidden' );
    // localStorage.clear();
    // };
    // otra opción puede ser mediante localstorage. Si es null, que no muestre el botón de borrar todos.

    if ( btnDeleteFave !== null ) {
        btnDeleteAllFaves.classList.remove( 'hidden' );
    };

    // Recorremos cada botón X creado en cada cocktail, y escuchamos en la lista completa con el bucle 
    for ( const btn of btnDeleteFave ) {
        btn.addEventListener( 'click', handleDeleteFave );
    };

    btnDeleteAllFaves.addEventListener( 'click', handleDeleteAllFaves );
}

const handleAddFavorite = ( event ) => {
    const liClickedId = event.currentTarget.id;
    // con el id de nuestro cocktail clickado buscamos con cuál coincide de mi array
    const clickedCocktail = cocktails.find( ( item ) => item.idDrink === liClickedId );
    // verificar si el cocktail seleccionado ya está en favoritos
    const faveLiClickedIndex = faveCocktails.findIndex(
        ( item ) => item.idDrink === liClickedId
    );
    // faveLiClickedIndex será -1 cuando el id no se encuentre en el array de favoritos
    if ( faveLiClickedIndex === -1 ) {
        // si el cocktail no está, lo añade al array con push
        faveCocktails.push( clickedCocktail );
    } else {
        // si el cocktail ya estaba, lo elimina de la lista con splice
        faveCocktails.splice( faveLiClickedIndex, 1 );
    };
    // Guarda los favoritos en el localStorage y renderiza todo de nuevo
    localStorage.setItem( 'favorites', JSON.stringify( faveCocktails ) );
    renderAllCocktails( cocktails );
    renderFaves( faveCocktails );
}

// Recorremos cada elemento creado, cada cocktail, y escuchamos en la lista completa con el bucle 
const allCocktailsListener = () => {
    const allCocktailsLi = document.querySelectorAll( '.js_li_cocktails' );
    for ( const li of allCocktailsLi ) {
        li.addEventListener( 'click', handleAddFavorite );
    }
}

// Función render Listado de Cócteles
const renderAllCocktails = () => {
    ulSearchList.innerHTML = ''; // pone la ul a vacío para que no se dupliquen los resultados
    for ( const eachCocktail of cocktails ) {
        let cocktailImg = '';
        if ( cocktailImg !== null ) {
            cocktailImg = eachCocktail.strDrinkThumb;
        } else {
            // si no encuentra imagen en la API, aparece esta por defecto
            cocktailImg = 'https://www.svgrepo.com/show/206298/cocktail-drink.svg';
        }
        // busca en el array de favoritos si ya tengo el elemento al que hice click
        const indexFaveCocktail = faveCocktails.findIndex(
            ( item ) => item.idDrink === eachCocktail.idDrink
        );
        // si no está renderizo con la clase fave (lo añado), y si está renderizo sin la clase (se elimina)
        if ( indexFaveCocktail !== -1 ) {
            ulSearchList.innerHTML += `
                <li class= "cocktail_card js_li_cocktails fave" id="${eachCocktail.idDrink}">
                <h3 class="cocktail_card-title">${eachCocktail.strDrink}</h3>
                <img class="cocktail_card-img" src="${cocktailImg}">
                </li>`;
        } else {
            ulSearchList.innerHTML += `
                <li class= "cocktail_card js_li_cocktails" id="${eachCocktail.idDrink}">
                <h3 class="cocktail_card-title">${eachCocktail.strDrink}</h3>
                <img class="cocktail_card-img" src="${cocktailImg}">
                </li>`;
        }

        allCocktailsListener();


    }

}

// Funciones Fetch
const getData = ( searchText ) => {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch( urlApi )
        .then( response => response.json() )
        .then( dataApi => {
            cocktails = dataApi.drinks;
            renderAllCocktails( cocktails );
        } )
        .catch( error => console.log( error ) )
}

const getDataDefault = () => {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
    fetch( urlApi )
        .then( response => response.json() )
        .then( dataApi => {
            cocktails = dataApi.drinks;
            renderAllCocktails( cocktails );
        } )
        .catch( error => console.log( error ) )
}

//Función manejadora botón Buscar
const handleSearch = ( event ) => {
    event.preventDefault();
    const nameCocktail = nameInput.value.toLowerCase();
    if ( nameCocktail === '' ) {
        error.innerHTML = 'Por favor, introduce el nombre de un cóctel.';
    } else {
        error.innerHTML = '';
        getData( nameCocktail );
    };
}
// Función manejadora botón reset
const handleReset = ( event ) => {
    // limpia campo de búsqueda y listado de resultados
    event.preventDefault();
    ulSearchList.innerHTML = '';
    nameInput.value = '';
}

const init = () => {
    // Cargo lo almacenado en localstorage
    const cocktailsFaveLocal = localStorage.getItem( 'favorites' );

    // Si localstorage tiene datos almacenados, los renderizo al cargar la página
    if ( cocktailsFaveLocal !== null ) {
        faveCocktails = JSON.parse( cocktailsFaveLocal );
        renderFaves();
    };
    // Al cargar la página mediante un fetch auxiliar, renderizamos en el listado de resultados la lista de margaritas por defecto
    getDataDefault();
}

// Se ejecuta al cargar la página
init();
searchBtn.addEventListener( 'click', handleSearch );
resetBtn.addEventListener( 'click', handleReset );