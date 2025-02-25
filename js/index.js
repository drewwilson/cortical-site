const heroHomeBg = document.querySelector('.hero-home-bg');
// !function(){
//   if(!window.UnicornStudio){
//     window.UnicornStudio={isInitialized:!1};
//     var i=document.createElement("script");
//     i.src="https://cdn.unicorn.studio/v1.4.2/unicornStudio.umd.js";
//     i.onload=function(){
//       window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0);
//       heroHomeBg.classList.add('loaded');
//     }
//     (document.head || document.body).appendChild(i)
//   }
// }();

!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.unicorn.studio/v1.4.2/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0,heroHomeBg.classList.add('loaded'))},(document.head || document.body).appendChild(i)}}();