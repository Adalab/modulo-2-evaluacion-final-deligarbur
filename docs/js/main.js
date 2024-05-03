const h=document.querySelector(".js_search_input"),k=document.querySelector(".js-error"),u=document.querySelector(".js_btn_search"),n=document.querySelector(".js_cocktails"),d=document.querySelector(".js_favorite_cocktails"),f=document.querySelector(".js_btn_reset");let o=[],l=[];const a=()=>{d.innerHTML="";for(const t of l){let e="";e!==null?e=t.strDrinkThumb:e===null&&(e="https://www.svgrepo.com/show/206298/cocktail-drink.svg"),d.innerHTML+=`
            <li class="cocktail_card js_li_favorites fave" >
                <h3 class="cocktail_card-title">${t.strDrink}</h3>
                <img class="cocktail_card-img" src="${e}">
                <button class="cocktail_card-delete js_delete_favorite" id="${t.idDrink}">X</button>
            </li>`}d.innerHTML+='<button class="cocktail_card-delete js_delete_all_favorites hidden">Borrar todo</button>',m()},v=()=>{l=[],a(),s(),localStorage.clear()},_=t=>{const e=t.target.id,c=l.findIndex(i=>i.idDrink===e);l.splice(c,1),localStorage.setItem("favorites",JSON.stringify(l)),a(),s()},m=()=>{const t=document.querySelectorAll(".js_delete_favorite"),e=document.querySelector(".js_delete_all_favorites");t!==null&&e.classList.remove("hidden");for(const c of t)c.addEventListener("click",_);e.addEventListener("click",v)},g=t=>{const e=t.currentTarget.id,c=o.find(r=>r.idDrink===e),i=l.findIndex(r=>r.idDrink===e);i===-1?l.push(c):l.splice(i,1),localStorage.setItem("favorites",JSON.stringify(l)),s(),a()},D=()=>{const t=document.querySelectorAll(".js_li_cocktails");for(const e of t)e.addEventListener("click",g)},s=()=>{n.innerHTML="";for(const t of o){let e="";e!==null?e=t.strDrinkThumb:e="https://www.svgrepo.com/show/206298/cocktail-drink.svg",l.findIndex(i=>i.idDrink===t.idDrink)!==-1?n.innerHTML+=`
                <li class= "cocktail_card js_li_cocktails fave" id="${t.idDrink}">
                <h3 class="cocktail_card-title">${t.strDrink}</h3>
                <img class="cocktail_card-img" src="${e}">
                </li>`:n.innerHTML+=`
                <li class= "cocktail_card js_li_cocktails" id="${t.idDrink}">
                <h3 class="cocktail_card-title">${t.strDrink}</h3>
                <img class="cocktail_card-img" src="${e}">
                </li>`,D()}},L=t=>{const e=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${t}`;fetch(e).then(c=>c.json()).then(c=>{o=c.drinks,s()}).catch(c=>console.log(c))},p=()=>{fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then(e=>e.json()).then(e=>{o=e.drinks,s()}).catch(e=>console.log(e))},j=t=>{t.preventDefault();const e=h.value.toLowerCase();e===""?k.innerHTML="Por favor, introduce el nombre de un cóctel.":(k.innerHTML="",L(e))},S=()=>{h="",n.innerHTML=""},w=()=>{const t=localStorage.getItem("favorites");t!==null&&(l=JSON.parse(t),a()),p()};w();u.addEventListener("click",j);f.addEventListener("click",S);
//# sourceMappingURL=main.js.map
