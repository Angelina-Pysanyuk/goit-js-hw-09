!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]"),d=null;a.disabled=!0;t.addEventListener("click",(function(){d=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));e.style.backgroundColor=t}),1e3),t.disabled=!0,a.disabled=!1})),a.addEventListener("click",(function(){clearInterval(d),t.disabled=!1,a.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.02874bbb.js.map