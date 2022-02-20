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

function sendOrderToApi() {
  order = localStorage.getItem('order')
  console.log(order)
  if (order != null) {
    fetch('http://localhost:5000/order/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({ order })
    }).then(function (response) {
      if (response.ok) {
        console.log('Nada puede malir sal');
        window.location.replace(response.url)
      } else {
        throw 'Cart create failed'
      }
    }).catch(function (error) {
      alert('Algo salio mal..')
    })
  }
}

function populateCart() {
  order = localStorage.getItem('order')
  console.log()
  if (order != null) {
    fetch('http://localhost:5000/order/complete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({ order })
    }).then(function (response) {
      if (response) {
        return response.json()
      } else {
        throw 'Cart create failed'
      }
    }).then(function (data) {
      console.log(data);
      const cartList = document.querySelector('.list-container')
      data.forEach(product => {
        const html = document.createElement('div')
        html.classList.add('card')
        html.innerHTML =
            '<div class="main-card-content">'+
              '<div class="img-container">'+
                '<img src="/images/ensalada-3.jpg" alt="">'+
              '</div>'+
              '<div class="text-container">'+
                '<div class="card-header">'+
                  `<h3>${product.title}</h3>`+
                  '<span><i class="fas fa-trash-alt"></i></span>'+
                '</div>'+
                `<p>${product.prod_description.substring(0, 20)}...</p>`+
                '<div class="actions">'+
                  '<div class="controls">'+
                    '<span><i class="fas fa-minus-circle"></i></span>'+
                    `<span class="qty">${product.qty}</span>`+
                    '<span><i class="fas fa-plus-circle"></i></span>'+
                  '</div>'+
                  `<p class="subtotal">$ ${product.qty*product.price}</p>`+
                '</div>'+
              '</div>'+
            '</div>'

        cartList.prepend(
          html
        )
      })
    }).catch(function (error) {
      console.log(error)
      alert('Algo salio mal..')
    })
  }
}