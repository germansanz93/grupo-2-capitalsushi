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
  if(location.href.includes('cart')){
    const totalTag = document.querySelector('.total-number')
    const total = totalTag.innerText.split('$')[1]
    const subTag = document.getElementsByClassName(`${id}`)[0]
    const sub = document.getElementsByClassName(`${id}`)[0].innerText.split('$')[1]
    const actQty = document.getElementById(id).innerText
    const toAdd = sub/(actQty - 1)
    subTag.innerText = `$${+sub + toAdd}`
    totalTag.innerText = `$${+total + toAdd}`
    if(actQty == 0) location.reload()
  }
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
  if(location.href.includes('cart')){
    const totalTag = document.querySelector('.total-number')
    const total = totalTag.innerText.split('$')[1]
    const subTag = document.getElementsByClassName(`${id}`)[0]
    const sub = document.getElementsByClassName(`${id}`)[0].innerText.split('$')[1]
    const actQty = document.getElementById(id).innerText
    const toSubstract = +sub/(parseInt(actQty)+1)
    subTag.innerText = `$${+sub - toSubstract}`
    totalTag.innerText = `$${+total - toSubstract}`
    if(actQty == 0) destroyItem(id)
  }
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
    fetch('/order', {
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

function payOrder() {
  order = localStorage.getItem('order')
  console.log(order)
  if (order != null) {
    fetch('/order/pay', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({ order })
    }).then(function (response) {
      if (response.ok) {
        console.log(response)
        return response.json()
      }
    }).then(function(data){
      window.location.replace(data.init_point)
    })
  }
}

function populateCart() {

    // Agrega credenciales de SDK
    const mp = new MercadoPago('TEST-40c3fad5-4e41-42c8-b4aa-d4473302a229', {
      locale: "es-AR",
    });
  
    // Inicializa el checkout
    mp.checkout({
      preference: {
        id: 1079130367,
      },
    });

  order = localStorage.getItem('order')
  if (order != null) {
    fetch('/order/complete', {
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
      const cards = document.querySelectorAll(".main-card-content")
      let total = 0;
      cards.forEach(card => card.remove())
      data.forEach(product => {
        total += product.price * product.qty
        const html = document.createElement('div')
        html.classList.add('card')
        html.innerHTML =
          '<div class="main-card-content">' +
          '<div class="img-container">' +
          '<img src="/images/ensalada-3.jpg" alt="">' +
          '</div>' +
          '<div class="text-container">' +
          '<div class="card-header">' +
          `<h3>${product.title}</h3>` +
          `<span onclick=destroyItem('${product.id}')><i class="fas fa-trash-alt"></i></span>` +
          '</div>' +
          `<p>${product.prod_description.substring(0, 20)}...</p>` +
          '<div class="actions">' +
          '<div class="controls">' +
          `<span onclick=removeItem('${product.id}')><i class="fas fa-minus-circle"></i></span>` +
          `<span class="qty" id=${product.id}>${product.qty}</span>` +
          `<span onclick=addItem('${product.id}')><i class="fas fa-plus-circle"></i></span>` +
          '</div>' +
          `<p class="subtotal ${product.id}">$${product.qty * product.price}</p>` +
          '</div>' +
          '</div>' +
          '</div>'

        cartList.prepend(
          html
        )
        document.querySelector('.total-number').innerText = `$${total}`
      })
    }).catch(function (error) {
      console.log(error)
    })
  }
}

function destroyItem(id) {
  if (localStorage.getItem('order')) {
    order = JSON.parse(localStorage.getItem('order'));
    order = order.filter(productQty => Object.keys(productQty)[0] != id)
    localStorage.setItem('order', JSON.stringify(order))
    location.reload()
  }
}
