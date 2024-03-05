import{g as jt,c as Ot}from"./app-OonorziL.js";function Ht(O,G){for(var w=0;w<G.length;w++){const u=G[w];if(typeof u!="string"&&!Array.isArray(u)){for(const v in u)if(v!=="default"&&!(v in O)){const p=Object.getOwnPropertyDescriptor(u,v);p&&Object.defineProperty(O,v,p.get?p:{enumerable:!0,get:()=>u[v]})}}}return Object.freeze(Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}))}var kt={exports:{}};(function(O,G){(function(w,u){O.exports=u()})(Ot,function(){/**
* VenoBox 2.1.6
* Copyright 2013-2024 Nicola Franchini
* @license: https://github.com/nicolafranchini/VenoBox/blob/master/LICENSE
*/let w,u,v,p,st,V,o,r,H,K,it,U,z,at,E,I,P,m,k,y,W,S,C,l,rt,lt,Z,ct,q,$,dt,vt,b,g,ut,bt,J,M;const pt=document.createElement("div");let h,tt=0,B=0,D=0,N=!1,T=new Image,mt=!1;const Ct={bounce:["sk-bounce","sk-bounce-dot",2],chase:["sk-chase","sk-chase-dot",6],circle:["sk-circle","sk-circle-dot",12],"circle-fade":["sk-circle-fade","sk-circle-fade-dot",12],flow:["sk-flow","sk-flow-dot",3],fold:["sk-fold","sk-fold-cube",4],grid:["sk-grid","sk-grid-cube",9],plane:["sk-plane","",0],pulse:["sk-pulse","",5],swing:["sk-swing","sk-swing-dot",2],wander:["sk-wander","sk-wander-cube",3],wave:["sk-wave","sk-wave-rect",5]},At={selector:".venobox",autoplay:!1,bgcolor:"#fff",border:"0",customClass:!1,infinigall:!1,maxWidth:"100%",navigation:!0,navKeyboard:!0,navTouch:!0,navSpeed:300,numeration:!1,overlayClose:!0,overlayColor:"rgba(23,23,23,0.95)",popup:!1,ratio:"16x9",share:!1,shareStyle:"pill",spinner:"bounce",spinColor:"#d2d2d2",titleattr:"title",titlePosition:"top",titleStyle:"bar",toolsBackground:"#1C1C1C",toolsColor:"#d2d2d2",onPreOpen:function(){return!0},onPostOpen:function(){},onPreClose:function(){return!0},onNavComplete:function(){},onContentLoaded:function(){},onInit:function(){},jQuerySelectors:!1,focusItem:!1,fitView:!1};function _(t,e,n){if(Object.prototype.toString.call(t)==="[object Object]"){let s;for(s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.call(n,t[s],s,t)}else{let s=0,i=t.length;for(s=0;s<i;s++)e.call(n,t[s],s,t)}}function Q(t){return t}function X({timing:t,draw:e,duration:n}){let s=performance.now();requestAnimationFrame(function i(d){let a=(d-s)/n;a>1&&(a=1);let c=t(a);e(c),a<1&&requestAnimationFrame(i)})}function gt(t){if(!t)return!1;k=!0,r=t,S=!1,C=!1,rt=t.getAttribute("data-maxwidth")||t.settings.maxWidth,lt=t.getAttribute("data-overlay")||t.settings.overlayColor,Z=t.getAttribute("data-ratio")||t.settings.ratio,ct=t.hasAttribute("data-autoplay")||t.settings.autoplay,q=t.getAttribute("data-href")||t.getAttribute("href"),$=t.getAttribute("data-customclass")||t.settings.customClass,J=t.getAttribute(t.settings.titleattr)||"",ut=t.getAttribute("data-border")||t.settings.border,dt=t.hasAttribute("data-fitview")||t.settings.fitView}function et(){return!(!r||!document.body.classList.contains("vbox-open"))&&(!r.settings.onPreClose||typeof r.settings.onPreClose!="function"||r.settings.onPreClose(r,E,b,g)!==!1)&&(document.body.removeEventListener("keydown",ft),document.body.classList.remove("vbox-open"),r.settings.focusItem&&r.focus(),void X({duration:200,timing:Q,draw:function(t){l.style.opacity=1-t,t===1&&l.remove()}}))}function Et(){A(b)}function Pt(){A(g)}function ft(t){t.keyCode===27&&et(),M||(t.keyCode==37&&C===!0&&A(g),t.keyCode==39&&S===!0&&A(b),M=setTimeout(()=>{M=null},100))}function qt(){k=!1,o.style.opacity=0,o.innerHTML=y,mt?(o.classList.add("vbox-grab"),o.addEventListener("touchstart",Y,!1),o.addEventListener("touchend",j,!1),o.addEventListener("touchmove",R,!1),o.addEventListener("mousedown",Y,!1),o.addEventListener("mouseup",j,!1),o.addEventListener("mouseout",j,!1),o.addEventListener("mousemove",R,!1)):(o.classList.remove("vbox-grab"),o.removeEventListener("touchstart",Y,!1),o.removeEventListener("touchend",j,!1),o.removeEventListener("touchmove",R,!1),o.removeEventListener("mousedown",Y,!1),o.removeEventListener("mouseup",j,!1),o.removeEventListener("mouseout",j,!1),o.removeEventListener("mousemove",R,!1));let t=o.querySelector(":first-child");t.classList.add("vbox-child"),t.style.backgroundColor=r.settings.bgcolor,t.style.transform="scale(0.9)",t.style.transition="transform 200ms";let e=o.querySelector(".vbox-child img");e&&e.addEventListener("dragstart",function(n){n.preventDefault()}),V.scrollTo(0,0),t.style.transform="scale(1)",l.style.setProperty("--vbox-padding",ut),l.style.setProperty("--vbox-max-width",rt),_(l.classList,function(n){n!=="vbox-overlay"&&l.classList.remove(n)}),$&&l.classList.add($),dt?o.classList.add("vbox-fit"):o.classList.remove("vbox-fit"),X({duration:200,timing:Q,draw:function(n){o.style.opacity=n,n===1&&z.classList.add("vbox-hidden")}}),r.settings.onContentLoaded&&typeof r.settings.onContentLoaded=="function"&&r.settings.onContentLoaded(y)}function x(t){o.classList.contains("vbox-"+t)||qt()}function Mt(t,e,n){let s;o.classList.add("vbox-loading");let i=function(d){let a,c,f;if(c=d.match(/(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i),c&&c[7])a="youtube",f=c[7];else{let L=/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;c=d.match(L),c&&c[5]&&(a="vimeo",f=c[5])}return{type:a,id:f}}(t);if(i.type=="vimeo"||i.type=="youtube"){let d;s=n?"?rel=0&autoplay=1":"?rel=0";let a=s+function(c){let f="",L=decodeURIComponent(c).split("?");if(L[1]!==void 0){let nt,F,wt=L[1].split("&");for(F=0;F<wt.length;F++)nt=wt[F].split("="),f=f+"&"+nt[0]+"="+nt[1]}return encodeURI(f)}(t);i.type=="vimeo"?d="https://player.vimeo.com/video/":i.type=="youtube"&&(d="https://www.youtube-nocookie.com/embed/"),y='<div class="venoratio venoratio-'+e+'"><iframe webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay" frameborder="0" src="'+d+i.id+a+'"></iframe></div>'}else s=n?" autoplay":"",y='<div class="venoratio venoratio-'+e+'"><video src="'+t+'"'+s+" controls>Your browser does not support the video tag.</video></div>";o.classList.remove("vbox-loading"),x("animated")}function Tt(){var t;if(t=y,pt.innerHTML=t,I=pt.querySelectorAll("img"),I.length){let e=0;_(I,function(n){let s=n.src;T=new Image,T.onload=function(){e++,e==I.length&&(o.classList.remove("vbox-loading"),x("animated"))},T.onerror=function(){e++,e==I.length&&(o.classList.remove("vbox-loading"),x("animated"))},T.src=s})}else o.classList.remove("vbox-loading"),x("animated")}function Y(t){if(!k){let e=.84*r.settings.navSpeed;o.style.transition="margin "+e+"ms ease-out, opacity "+e+"ms ease-out",tt=B=t.type==="touchstart"?t.touches[0].pageX:t.pageX,vt=U=t.type==="touchstart"?t.touches[0].pageY:t.pageY,N=!0}}function j(t){if(N){N=!1;let e=r,n=!1;D=B-tt,D<0&&S&&(e=b,n=!0),D>0&&C&&(e=g,n=!0),Math.abs(D)>=50&&n?A(e):(o.style.marginLeft=0,o.style.opacity=1)}}function R(t){if(N&&!k){B=t.type==="touchmove"?t.touches[0].pageX:t.pageX,U=t.type==="touchmove"?t.touches[0].pageY:t.pageY,K=B-tt,it=U-vt;let e=Math.abs(K);if(e>Math.abs(it)&&e<=180){let n=1.5*(1-e/180);t.preventDefault(),o.style.marginLeft=K+"px",o.style.opacity=n}}}function yt(t){if(!t)return!1;bt=t.dataset.gall,W=t.settings.numeration,P=t.settings.infinigall,v.innerHTML="";let e=t.dataset.vbtype;t.settings.share&&e!=="iframe"&&e!=="inline"&&e!=="ajax"&&function(i){if(navigator.canShare){const d={url:i};v.insertAdjacentHTML("beforeend",'<div class="vbox-link-btn vbox-share-mobile"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/></svg></div>'),v.querySelector(".vbox-share-mobile").addEventListener("click",function(a){a.preventDefault(),navigator.share(d)})}v.insertAdjacentHTML("beforeend",'<a target="_blank" href="'+i+'" download><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg></a>'),v.insertAdjacentHTML("beforeend",'<div class="vbox-tooltip"><div class="vbox-link-btn vbox-share-copy"><span class="vbox-tooltip-text" id="myTooltip"></span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></div ></div>'),v.querySelector(".vbox-share-copy").addEventListener("click",function(d){d.preventDefault();let a=document.getElementById("myTooltip");navigator.clipboard.writeText(i).then(function(){a.innerHTML='<div class="vbox-tooltip-inner">Copied</div>'},function(){console.log("copy failed")})})}(t.href),m=document.querySelectorAll('.vbox-item[data-gall="'+bt+'"]'),H=Array.prototype.indexOf.call(m,t),m.length<2&&(W=!1),m.length<3&&(P=!1),b=m[H+1],g=m[H-1],!b&&P&&(b=m[0]),!g&&P&&(g=m[m.length-1]),m.length>=1?(E=H+1,u.innerHTML=E+" / "+m.length):E=1,W?u.classList.remove("vbox-hidden"):u.classList.add("vbox-hidden"),J!==""?p.classList.remove("vbox-hidden"):p.classList.add("vbox-hidden"),p.innerHTML=J,C=!1,S=!1,(b||P)&&(S=!0),(H>0||P)&&(C=!0),mt=(C||S)&&t.settings.navTouch;let n=l.querySelector(".vbox-next"),s=l.querySelector(".vbox-prev");C?s.classList.remove("vbox-hidden"):s.classList.add("vbox-hidden"),S?n.classList.remove("vbox-hidden"):n.classList.add("vbox-hidden"),t.settings.navigation||(n.classList.add("vbox-hidden"),s.classList.add("vbox-hidden"))}function xt(t){if(!t)return!1;w.style.backgroundColor=lt,at.innerHTML=function(c){if(!c)return"Loading...";let f='<div class="sk-center '+c[0]+'">',L=0;for(L=0;L<c[2];L++)f+='<div class="'+c[1]+'"></div>';return f+="</div>",f}(Ct[t.settings.spinner]),l.style.setProperty("--sk-color",t.settings.spinColor),z.classList.remove("vbox-hidden"),v.classList.remove("vbox-top","vbox-bottom"),p.classList.remove("vbox-top","vbox-bottom"),t.settings.titlePosition=="top"?(p.classList.add("vbox-top"),v.classList.add("vbox-bottom")):(p.classList.add("vbox-bottom"),v.classList.add("vbox-top"));let e=t.settings.titleStyle==="bar"?"100%":"auto",n=t.settings.titleStyle==="pill"?"5em":"0",s=t.settings.shareStyle==="bar"?"100%":"auto",i=t.settings.shareStyle==="pill"?"5em":"0",d=t.settings.titleStyle==="transparent"?"transparent":t.settings.toolsBackground,a=t.settings.shareStyle==="transparent"?"transparent":t.settings.toolsBackground;l.style.setProperty("--vbox-title-width",e),l.style.setProperty("--vbox-title-radius",n),l.style.setProperty("--vbox-share-width",s),l.style.setProperty("--vbox-share-radius",i),l.style.setProperty("--vbox-tools-color",t.settings.toolsColor),l.style.setProperty("--vbox-title-background",d),l.style.setProperty("--vbox-share-background",a)}function ht(){if(!r)return!1;switch(r.dataset.vbtype){case"iframe":t=q,e=Z,o.classList.add("vbox-loading"),y='<div class="venoratio venoratio-'+e+'"><iframe src="'+t+'"></iframe></div>',o.classList.remove("vbox-loading"),x("animated");break;case"inline":(function(n){let s=document.querySelector(n);s&&(o.classList.add("vbox-loading"),y='<div class="vbox-inline">'+s.innerHTML+"</div>",o.classList.remove("vbox-loading"),x("animated"))})(q);break;case"ajax":(function(n){o.classList.add("vbox-loading");let s=new XMLHttpRequest;s.open("GET",n,!0),s.onload=function(){y='<div class="vbox-inline">'+s.response+"</div>",Tt()},s.onerror=function(){y='<div class="vbox-inline"></div>',o.classList.remove("vbox-loading"),x("animated")},s.send()})(q);break;case"video":Mt(q,Z,ct);break;default:(function(n){T.onload=function(){y='<div class="vbox-child"><img src="'+n+'"></div>',o.classList.remove("vbox-loading"),x("animated")},T.src=n})(q)}var t,e}function A(t){if(!t||k||!document.body.classList.contains("vbox-open"))return!1;gt(t),xt(t);const e=.84*r.settings.navSpeed;o.style.transition="margin "+e+"ms ease-out, opacity "+e+"ms ease-out",t===g&&o.classList.add("swipe-right"),t===b&&o.classList.add("swipe-left"),z.classList.remove("vbox-hidden");const n=o.style.opacity;o.classList.add("vbox-animated","vbox-loading"),h=o.cloneNode(!1),h.classList.add("cloned"),h.classList.remove("swipe-left","swipe-right"),h.style.opacity=0,h.style.marginLeft="0",h.style.marginRight="0";const s=o;V.append(h),o=h,o.classList.remove("cloned"),yt(t),X({duration:r.settings.navSpeed,timing:Q,draw:function(i){s.style.opacity=n-i/n,i===1&&(s.remove(),o.classList.remove("vbox-animated"),x("loading"),k=!1,r.settings.onNavComplete&&typeof r.settings.onNavComplete=="function"&&r.settings.onNavComplete(r,E,b,g))}}),ht()}function ot(t){return!(document.body.classList.contains("vbox-open")||!t)&&(!t.settings.onPreOpen||typeof t.settings.onPreOpen!="function"||t.settings.onPreOpen(t)!==!1)&&(gt(t),document.body.insertAdjacentHTML("beforeend",st),document.body.classList.add("vbox-open"),l=document.querySelector(".vbox-overlay"),w=l.querySelector(".vbox-backdrop"),V=l.querySelector(".vbox-container"),o=V.querySelector(".vbox-content"),u=l.querySelector(".vbox-num"),v=l.querySelector(".vbox-share"),p=l.querySelector(".vbox-title"),z=l.querySelector(".vbox-preloader"),at=z.querySelector(".vbox-preloader-inner"),l.style.opacity=0,xt(t),yt(t),o.classList.add("vbox-animated","vbox-loading"),X({duration:200,timing:Q,draw:function(e){l.style.opacity=e,e===1&&(o.classList.remove("vbox-animated"),k=!1,x("loading"),r.settings.onPostOpen&&typeof r.settings.onPostOpen=="function"&&r.settings.onPostOpen(r,E,b,g))}}),ht(),t.settings.navKeyboard&&(document.body.addEventListener("keydown",ft),document.body.addEventListener("keyup",()=>{M&&(clearTimeout(M),M=null)})),document.querySelector(".vbox-prev").addEventListener("click",function(){A(g)}),document.querySelector(".vbox-next").addEventListener("click",function(){A(b)}),void l.addEventListener("click",function(e){let n=document.querySelector(".vbox-close");n&&(n.contains(e.target)||n===e.target||r.settings.overlayClose&&(e.target.classList.contains("vbox-overlay")||e.target.classList.contains("vbox-content")||e.target.classList.contains("vbox-backdrop")||e.target.classList.contains("vbox-close")||e.target.classList.contains("vbox-preloader")||e.target.classList.contains("vbox-container")))&&et()}))}const Lt=function(t){const e={};let n=function(s,i){let d={};return _(s,function(a,c){d[c]=s[c]}),_(i,function(a,c){d[c]=i[c]}),d}(At,t||{});return e.close=et,e.next=Et,e.prev=Pt,e.open=ot,e.settings=n,function(s,i){i.onInit&&typeof i.onInit=="function"&&i.onInit(s);let d=i.jQuerySelectors||document.querySelectorAll(i.selector);if(st='<div class="vbox-overlay"><div class="vbox-backdrop"></div><div class="vbox-preloader"><div class="vbox-preloader-inner"></div></div><div class="vbox-container"><div class="vbox-content"></div></div><div class="vbox-title"></div><div class="vbox-left-corner"><div class="vbox-num">0/0</div></div><div class="vbox-close"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="vbox-close-icon" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg></div><a class="vbox-next"><span>Next</span></a><a class="vbox-prev"><span>Prev</span></a><div class="vbox-share"></div></div>',_(d,function(a){if(a.classList.contains("vbox-item"))return!0;a.settings=i,a.classList.add("vbox-item"),a.addEventListener("click",function(c){return c.preventDefault(),a.blur(),ot(a),!1})}),i.popup){let a=document.querySelector(i.popup);a.settings=i,ot(a)}}(e,n),e};return typeof jQuery=="function"&&jQuery.fn.extend({venobox:function(t){const e=t||{};e.jQuerySelectors=this,new Lt({pluginoptions:e})}}),Lt})})(kt);var St=kt.exports;const zt=jt(St),_t=Ht({__proto__:null,default:zt},[St]);export{_t as v};