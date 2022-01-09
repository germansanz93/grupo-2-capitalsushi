function setup(){
  const popUp = document.querySelector('.deletePopUp');
  const mask = document.querySelector('.img-container');
  return {popUp, mask}
}

function showDeletePopUp(){

  const {popUp, mask} = setup();

  mask.style.setProperty('--display', 'block')
  popUp.style.display = 'block';

  window.addEventListener('keydown', (evt) => {
    if(evt.key == 'Esc' || evt.key == 'Escape') {
      mask.style.setProperty('--display', 'none')
      popUp.style.display = 'none';
    }
  })

} 

function hideDeletePopUp(){

  const {popUp, mask} = setup();

  

}