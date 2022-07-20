
let socket = io.connect(); 
socket.on('messages', function(data) { 
  console.log(data);
  renderMensagge(data);
});

function renderMensagge(prodsAgregados) { 
    let fecha = new Date();
    let ahora = fecha.toLocaleString();
    let html = prodsAgregados.map(function(elem, index){ 
      return(`<div>
            <strong>${elem.author}</strong> <span>${ahora}</span>: 
            <em>${elem.text}</em> </div>`) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function addMessage() { 
    let mensaje = { 
      author: document.getElementById('username').value, 
      text: document.getElementById('texto').value
    }; 
    socket.emit('new-message', mensaje); 

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}
function addProduct() {
  let title= document.getElementById('title').value;
  let price =document.getElementById('price').value;
  let thumbnail= document.getElementById('thumbnail').value;
  let prod = { title, price, thumbnail };
  socket.emit('new-product', prod); 
}

function renderProd(data) {
  let html = data.map(function(elem, index){ 
    return(`
    <tr class="table-active container">
        <td style="    width: 33%;"><span>${elem.title}</span></td>
        <td style="    width: 33%;"><span>$${elem.price}</span></td>
        <td ><img class="libros" src="${elem.thumbnail}" alt=""></td>
    </tr>`) 
  }).join(" "); 
  document.querySelector('.productos').innerHTML = html; 
}

socket.on('products', function(prodsAgregados) { 
  renderProd(prodsAgregados);
});