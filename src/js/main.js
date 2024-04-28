'use strict';

const nameInput = document.querySelector('.js_search_input');
const searchBtn = document.querySelector('.js_btn_search');
const resetBtn = document.querySelector('.js_btn_reset');
const ulSearchList = document.querySelector('.js_cocktails');
const error = document.querySelector('.js-error');

let cocktails = [];
let faveCocktails = [];
