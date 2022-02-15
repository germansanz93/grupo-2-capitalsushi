function addItem(id) {
  if (!localStorage.getItem('order')) {
    localStorage.setItem('order', JSON.stringify([{[id]: 1}]))
    return
  }
  order = JSON.parse(localStorage.getItem('order'));
  console.log(order)
  isPresent = false
  order.map(product => {
    if (Object.keys(product)[0] == id) {
      console.log('igual')
      product[id] = Object.values(product)[0] += 1
      isPresent = true
    }
  })
  if(!isPresent){
    order.push({[id]: 1})
  }
  localStorage.setItem('order', JSON.stringify(order))
}