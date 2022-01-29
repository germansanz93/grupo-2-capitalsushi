const mainContainer = document.querySelector(".main-container");
const noMobileWarning = document.querySelector(".no-mobile");

window.addEventListener("resize", () => {
  hide();
})

window.addEventListener("load", () => {
  hide();
})

function hide (){
  if(window.innerWidth < 810){
    noMobileWarning.classList.remove("hide");
  } else {
    noMobileWarning.classList.add("hide")
  }
}
