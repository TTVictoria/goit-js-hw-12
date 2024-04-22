import{a as u,N as s,S as f}from"./assets/vendor-1de26eae.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();async function y(a,o=1){const t="https://pixabay.com/api/",e={key:"43499454-4c7e954d404e5474a5c884b10",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};try{return(await u.get(t,{params:e})).data}catch(r){throw console.error("Error fetching data:",r),new Error("Failed to fetch data")}}const n={searchForm:document.querySelector(".search-form"),inputText:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let i=1;n.loadMoreBtn.style.display="none";n.searchForm.addEventListener("submit",p);n.loadMoreBtn.addEventListener("click",m);function p(a){a.preventDefault(),i=1,n.gallery.innerHTML="";const o=n.inputText.value.trim();if(o!=="")d(o);else return n.loadMoreBtn.style.display="none",s.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}function m(){const a=n.inputText.value.trim();i+=1,d(a,i)}async function d(a,o){try{const t=await y(a,o);b(t.hits.length,t.totalHits),h(t.hits)}catch{n.loadMoreBtn.style.display="none",s.Notify.info("We're sorry, but you've reached the end of search results.")}}function h(a){const o=a.map(t=>`<a class ="photo-link" href="${t.largeImageURL}">
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
   </a>`).join("");n.gallery.insertAdjacentHTML("beforeend",o),g.refresh()}const g=new f(".gallery a",{captionsData:"alt",captionDelay:250});function b(a,o){if(a===0){s.Notify.failure("Sorry, there are no images matching your search query. Please try again.");return}i===1&&(n.loadMoreBtn.style.display="flex",s.Notify.success(`Hooray! We found ${o} images.`)),i>=Math.ceil(o/15)&&(n.loadMoreBtn.style.display="none",s.Notify.info("We're sorry, but you've reached the end of search results."))}
//# sourceMappingURL=commonHelpers.js.map
