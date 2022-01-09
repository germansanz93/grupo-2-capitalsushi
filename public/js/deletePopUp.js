function setup(){
  const popUp = document.querySelector('.deletePopUp');
  const mask = document.querySelector('.img-container');
  const editForms = document.querySelector('.forms-carousel');
  return {popUp, mask, editForms}
}

function showDeletePopUp(){

  const {popUp, mask, editForms} = setup();

  mask.style.setProperty('--display', 'block')
  popUp.style.display = 'block';
  editForms.style.display = 'none';


  window.addEventListener('keydown', (evt) => {
    if(evt.key == 'Esc' || evt.key == 'Escape') {
      hideDeletePopUp();
    }
  })
}

function hideDeletePopUp(){

  const {popUp, mask, editForms} = setup();

  mask.style.setProperty('--display', 'none');
  popUp.style.display = 'none';
  editForms.style.display = 'flex';
}