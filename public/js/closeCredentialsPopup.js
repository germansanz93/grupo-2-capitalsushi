const credentialsPopup = document.querySelector("#credentials-popup");

setTimeout(() => {
  credentialsPopup.style.opacity = "0";
}, 2400)

setTimeout(() => {
  credentialsPopup.style.display = "none";
}, 3000)

function closePopup(){
  credentialsPopup.style.display = "none";
}