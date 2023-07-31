const productosJSON = '[{"nombre": "royal", "precio": 20}, {"nombre": "harina", "precio": 50}, {"nombre": "azúcar", "precio": 70}, {"nombre": "huevos", "precio": 100}]';
const productos = JSON.parse(productosJSON);

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const productosDisponiblesElemento = document.getElementById('productos-disponibles');
const carritoElemento = document.getElementById('carrito');
const totalElemento = document.getElementById('total');


productos.forEach((producto, index) => {
  const productoElemento = document.createElement('div');
  productoElemento.textContent = `${producto.nombre} - $${producto.precio}`;
  productosDisponiblesElemento.appendChild(productoElemento);

  const optionElemento = document.createElement('option');
  optionElemento.textContent = `${producto.nombre} - $${producto.precio}`;
  optionElemento.value = index;
  document.getElementById('input-producto').appendChild(optionElemento);
});


function agregarAlCarrito(index) {
  const unidades = parseInt(document.getElementById('input-unidades').value);

  if (index >= 0 && index < productos.length && unidades > 0) {
    const productoSeleccionado = productos[index];


    const productoEnCarrito = carrito.find(item => item.producto === productoSeleccionado.nombre);

    if (productoEnCarrito) {

      productoEnCarrito.unidades += unidades;
    } else {

      carrito.push({ producto: productoSeleccionado.nombre, unidades, precio: productoSeleccionado.precio });
    }


    carritoElemento.innerHTML = '<h2>Productos en el carrito:</h2>';
    carrito.forEach(item => {
      const itemElemento = document.createElement('div');
      itemElemento.textContent = `${item.producto} - $${item.precio} - Unidades: ${item.unidades}`;
      carritoElemento.appendChild(itemElemento);
    });


    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}


function finalizarCompra() {
  const detallesCompraElemento = document.getElementById('detalles-compra');
  detallesCompraElemento.textContent = '';


  carrito.forEach((carritoFinal) => {
    const detalleElemento = document.createElement('div');
    detalleElemento.textContent = `Producto: ${carritoFinal.producto}, Unidades: ${carritoFinal.unidades}, Total a pagar: $${carritoFinal.unidades * carritoFinal.precio}`;
    detallesCompraElemento.appendChild(detalleElemento);
  });


  const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
  totalElemento.textContent = `Total a pagar: $${total}`;


  carrito = [];
  carritoElemento.innerHTML = '<h2>Productos en el carrito:</h2>';
  totalElemento.textContent = '';


  localStorage.removeItem('carrito');


  mostrarMensaje('Gracias por elegirnos');
}

function mostrarMensaje(mensaje) {
  const mensajeElemento = document.getElementById('mensaje');
  mensajeElemento.textContent = mensaje;
  mensajeElemento.classList.add('mostrar');

  setTimeout(() => {
    mensajeElemento.classList.remove('mostrar');
  }, 3000);
}


document.getElementById('btn-agregar').addEventListener('click', () => {
  const selectedProductIndex = parseInt(document.getElementById('input-producto').value);
  agregarAlCarrito(selectedProductIndex);
});

document.getElementById('btn-finalizar').addEventListener('click', finalizarCompra);
