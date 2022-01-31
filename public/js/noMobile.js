const mainContainer = document.querySelector(".main-container");
const noMobileWarning = document.querySelector(".no-mobile");
const sideBar = document.querySelector(".side-bar");
const mainContent = document.querySelector(".main-content");

window.addEventListener("resize", () => {
  hide();
})

window.addEventListener("load", () => {
  hide();
})

function hide (){
  if(window.innerWidth < 810){
    noMobileWarning.classList.remove("hide");
    sideBar.classList.add("hide");
    mainContent.classList.add("hide");
  } else {
    noMobileWarning.classList.add("hide")
    sideBar.classList.remove("hide");
    mainContent.classList.remove("hide");
  }
}
