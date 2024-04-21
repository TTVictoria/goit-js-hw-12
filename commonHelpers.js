import{S as f,i as n}from"./assets/vendor-0fc460d7.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();function m(o){return o.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:t,comments:a,downloads:u})=>`
    <li class="gallery-item">
        <div class="gallery">
            <a class="gallery-link" href="${s}">
                <img class="gallery-img" src="${r}" alt="${i}" />
                <ul class="search-list">
                    <li class="info"><span class="info-item">Likes</span>${e}</li>
                    <li class="info"><span class="info-item">Views</span>${t}</li>
                    <li class="info"><span class="info-item">Comments</span>${a}</li>
                    <li class="info"><span class="info-item">Downloads</span>${u}</li>
                </ul>
            </a>
        </div>
        </li>
        `).join("")}function d(o){const r="https://pixabay.com/api/",s="43499454-4c7e954d404e5474a5c884b10",i=new URLSearchParams({key:s,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${r}?${i}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}const h=document.querySelector("#search-form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),p=new f(".gallery a",{captionsData:"alt",captionDelay:250});h.addEventListener("submit",g);function g(o){o.preventDefault(),l.innerHTML="";const r=o.currentTarget.elements.searchQuery.value.trim();if(!r){n.show({title:"error",titleColor:"white",message:"Please, enter a word ",messageColor:"white",color:"red",position:"topCenter",timeout:"2000"}),o.currentTarget.reset();return}c.classList.toggle("is-hidden"),d(r).then(s=>{if(s.total===0){n.show({title:"error",titleColor:"white",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",color:"red",position:"topCenter",timeout:"2000"});return}l.insertAdjacentHTML("beforeend",m(s.hits)),p.refresh()}).catch(s=>{n.show({message:s.message})}).finally(()=>{c.classList.toggle("is-hidden")})}
//# sourceMappingURL=commonHelpers.js.map
