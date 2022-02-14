function addItem(id){
  let products = []
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
    if(products.hasOwnProperty(id)){
      products[id] += 1;
    } else {
      products.push({[id]: 1})
    }
  }
  localStorage.setItem('products', JSON.stringify(products))
}