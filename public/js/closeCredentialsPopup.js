const credentialsPopup = document.querySelector("#credentials-popup");

if(credentialsPopup.innerText.includes("credenciales incorrectas")){
  console.log('if')
  credentialsPopup.style.display = "block";
};

setTimeout(() => {
  credentialsPopup.style.display = "none";
}, 3000)

function closePopup(){
  credentialsPopup.style.display = "none";
}