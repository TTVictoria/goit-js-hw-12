import{a as h,S as f,N as i}from"./assets/vendor-bc7d135c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();async function g(a,o=1){const t="43499454-4c7e954d404e5474a5c884b10",l="https://pixabay.com/api/",e="photo",r="horizontal",s="true";try{const d=await h.get(l,{params:{key:t,q:a,image_type:e,orientation:r,safesearch:s,page:currentPage,per_page:15}}),{data:p}=d,{hits:u,totalHits:m}=p;if(!Array.isArray(u)||u.length===0)throw new Error("No images found");return{images:u,totalHits:m}}catch{throw new Error("Failed to fetch images")}}document.querySelector(".gallery");document.querySelector(".loader");new f(".gallery a");const n={searchForm:document.querySelector(".search-form"),inputText:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=1;n.loadMoreBtn.style.display="none";n.searchForm.addEventListener("submit",b);n.loadMoreBtn.addEventListener("click",v);function b(a){a.preventDefault(),c=1,n.gallery.innerHTML="";const o=n.inputText.value.trim();if(o!=="")y(o);else return n.loadMoreBtn.style.display="none",i.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}function v(){const a=n.inputText.value.trim();c+=1,y(a,c)}async function y(a,o){try{const t=await g(a,o);S(t.hits.length,t.totalHits),E(t.hits)}catch{n.loadMoreBtn.style.display="none",i.Notify.info("We're sorry, but you've reached the end of search results.")}}function E(a){const o=a.map(t=>`<a class ="photo-link" href="${t.largeImageURL}">
    <div class="photo-card">
        <div class="photo">
     <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy"/>
        </div>
     <div class="info">
       <p class="info-item">
         <b>Likes: ${t.likes}</b>
       </p>
       <p class="info-item">
         <b>Views: ${t.views}</b>
       </p>
       <p class="info-item">
         <b>Comments: ${t.comments}</b>
       </p>
       <p class="info-item">
         <b>Downloads: ${t.downloads}</b>
       </p>
     </div>
     </div>
   </a>`).join("");n.gallery.insertAdjacentHTML("beforeend",o),L.refresh()}const L=new f(".gallery a",{captionsData:"alt",captionDelay:250});function S(a,o){if(a===0){i.Notify.failure("Sorry, there are no images matching your search query. Please try again.");return}c===1&&(n.loadMoreBtn.style.display="flex",i.Notify.success(`Hooray! We found ${o} images.`)),c>=Math.ceil(o/15)&&(n.loadMoreBtn.style.display="none",i.Notify.info("We're sorry, but you've reached the end of search results."))}
//# sourceMappingURL=commonHelpers.js.map
