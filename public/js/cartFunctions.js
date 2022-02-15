function addItem(id) {
  if (!localStorage.getItem('order')) {
    localStorage.setItem('order', JSON.stringify([{[id]: 1}]))
    updateChartQty(id, 1)
    return
  }
  order = JSON.parse(localStorage.getItem('order'));
  isPresent = false
  order.map(product => {
    if (Object.keys(product)[0] == id) {
      product[id] = Object.values(product)[0] += 1
      updateChartQty(id, Object.values(product)[0])
      isPresent = true
    }
  })
  if(!isPresent){
    order.push({[id]: 1})
    updateChartQty(id, 1)
  }
  localStorage.setItem('order', JSON.stringify(order))
}

function removeItem(id) {
  if (!localStorage.getItem('order')) {
    localStorage.setItem('order', JSON.stringify([{[id]: 1}]))
    updateChartQty(id, 1)
    return
  }
  order = JSON.parse(localStorage.getItem('order'));
  isPresent = false
  order.map(product => {
    if (Object.keys(product)[0] == id) {
      if (Object.values(product)[0] > 0) product[id] = Object.values(product)[0] -= 1
      updateChartQty(id, Object.values(product)[0])
      isPresent = true
    }
  })
  if(!isPresent){
    order.push({[id]: 1})
    updateChartQty(id, 1)
  }
  localStorage.setItem('order', JSON.stringify(order))
}

function updateChartQty(id, number){
  const qty = document.getElementById(id)
  qty.innerHTML = number
}

function updateQty(){
  console.log('updated')
  order = JSON.parse(localStorage.getItem('order')) || null;
  if(order){
    order.map(product => {
      id = Object.keys(product)[0] 
      qty = Object.values(product)[0]
      updateChartQty(id, qty)
    })
  }
}