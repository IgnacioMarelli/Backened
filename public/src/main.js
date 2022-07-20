
let socket = io.connect(); 
socket.on('messages', function(data) { 
  console.log(data);
  renderMensagge(data);
});
socket.on('products', function(data) { 
  renderProd(data);
});

function renderMensagge(data) { 
    let html = data.map(function(elem, index){ 
      return(`<div>
            <strong>${elem.author}</strong>: 
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
  let { title, price, thumbnail } = req.body;
  let prod = { title, price, thumbnail };
  socket.emit('new-product', prod); 
}

function renderProd(data) {
  let html = data.map(function(elem, index){ 
    return(`
    <tr class="table-active container">
        <td style="    width: 33%;"><span>${elem.title}</span></td>
        <td style="    width: 33%;"><span>$${elem.price}</span></td>
        <td ><img style="    width: 33%;" src="${elem.thumbnail}" alt=""></td>
    </tr>`) 
  }).join(" "); 
  document.querySelector('.productos').innerHTML = html; 
}