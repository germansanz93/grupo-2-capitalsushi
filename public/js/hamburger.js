window.addEventListener("resize", () => {
  if (window.innerWidth >= 810) {
    document.querySelector("nav").classList.remove('show');
  }
})

function HamburgerScript() {
  if (window.innerWidth <= 810) {
    const navBar = document.querySelector("nav");
    navBar.classList.toggle('show')
  }else {
    navBar.classList.remove('show')
  }
}