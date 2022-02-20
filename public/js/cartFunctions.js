function addItem(id) {
  if (!localStorage.getItem('order')) {
    localStorage.setItem('order', JSON.stringify([{ [id]: 1 }]))
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
  if (!isPresent) {
    order.push({ [id]: 1 })
    updateChartQty(id, 1)
  }
  localStorage.setItem('order', JSON.stringify(order))
}

function removeItem(id) {
  if (!localStorage.getItem('order')) {
    localStorage.setItem('order', JSON.stringify([{ [id]: 1 }]))
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
  if (!isPresent) {
    order.push({ [id]: 1 })
    updateChartQty(id, 1)
  }
  localStorage.setItem('order', JSON.stringify(order))
}

function updateChartQty(id, number) {
  const qty = document.getElementById(id)
  qty.innerHTML = number
}

function updateQty() {
  console.log('updated')
  order = JSON.parse(localStorage.getItem('order')) || null;
  if (order) {
    order.map(product => {
      id = Object.keys(product)[0]
      qty = Object.values(product)[0]
      updateChartQty(id, qty)
    })
  }
}

function sendToCart() {
  order = localStorage.getItem('order')
  console.log(order)
  if(order != null){
    fetch('http://localhost:5000/order/', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'123':'123'}) // body data type must match "Content-Type" header
    }).then(function (response) {
      if (response.ok) {
        console.log('Nada puede malir sal');
      } else {
        throw 'Cart create failed'
      }
    }).catch(function(error){
      alert('Algo salio mal..') 
    })
  }
}