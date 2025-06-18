
document.addEventListener('DOMContentLoaded', () => {
  const listaProductos = document.getElementById('lista-productos');
  const buscador = document.getElementById('buscador');
  const carrito = [];
  const modalCarrito = document.getElementById('modal-carrito');
  const botonAbrirCarrito = document.getElementById('abrir-carrito');
  const botonCerrarCarrito = modalCarrito.querySelector('.cerrar-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const contadorSpan = document.getElementById('contador-carrito');
  const btnFinalizar = document.getElementById('finalizar-compra');
  const animacionCompra = document.getElementById('animacion-compra');

  const productos = [
    { nombre: 'Samsung Galaxy S22', categoria: 'Android', precio: 220000, imagen: 'img/samsung.jpg' },
    { nombre: 'iPhone 13', categoria: 'iPhone', precio: 350000, imagen: 'img/iphone.jpg' },
    { nombre: 'Motorola G82 Usado', categoria: 'Usados', precio: 120000, imagen: 'img/moto.jpg' },
    { nombre: 'Auriculares JBL', categoria: 'Auriculares', precio: 25000, imagen: 'img/jbl.jpg' },
    { nombre: 'Funda iPhone 13', categoria: 'Fundas', precio: 8000, imagen: 'img/funda.jpg' },
    { nombre: 'Cargador Tipo C', categoria: 'Cargadores', precio: 6500, imagen: 'img/cargador.jpg' },
  ];

  function renderizarProductos(lista = productos) {
    listaProductos.innerHTML = '';
    lista.forEach((prod, index) => {
      const card = document.createElement('div');
      card.className = 'producto-card';
      card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}" />
        <h3>${prod.nombre}</h3>
        <p class="precio">$${prod.precio.toLocaleString()}</p>
        <button data-index="${index}">Agregar al carrito</button>
        <a href="https://link.mercadopago.com.ar/jmmarket" target="_blank" class="btn-pago">Pagar</a>
        <a href="https://wa.me/543525615211?text=Hola%2C%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(prod.nombre)}" target="_blank" class="btn-chat">💬 Consultar</a>
      `;
      listaProductos.appendChild(card);
    });
    actualizarBotonesCarrito();
  }

  function actualizarBotonesCarrito() {
    document.querySelectorAll('.producto-card button').forEach(boton => {
      boton.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        agregarAlCarrito(productos[index]);
      });
    });
  }

  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    renderizarProductos(filtrados);
  });

  window.filtrarCategoria = (cat) => {
    const filtrados = productos.filter(p => p.categoria === cat);
    renderizarProductos(filtrados);
  }

  function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarContador();
    alert(`Producto agregado: ${producto.nombre} - $${producto.precio.toLocaleString()}`);
  }

  function actualizarContador() {
    contadorSpan.textContent = carrito.length;
  }

  function actualizarModal() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((prod, index) => {
      total += prod.precio;
      const li = document.createElement('li');
      li.innerHTML = `
        ${prod.nombre} - $${prod.precio.toLocaleString()}
        <button data-index="${index}" class="eliminar">X</button>
      `;
      listaCarrito.appendChild(li);
    });
    totalCarrito.innerText = `$${total.toLocaleString()}`;

    listaCarrito.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-index'));
        carrito.splice(i, 1);
        actualizarContador();
        actualizarModal();
      });
    });
  }

  botonAbrirCarrito.addEventListener('click', () => {
    actualizarModal();
    modalCarrito.classList.add('visible');
  });

  if (botonCerrarCarrito) {
    botonCerrarCarrito.addEventListener('click', () => {
      modalCarrito.classList.remove('visible');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target == modalCarrito) {
      modalCarrito.classList.remove('visible');
    }
  });

  window.verPanelAdmin = () => {
    const pass = prompt("Ingrese la clave de administrador:");
    if (pass === "admin123") {
      document.getElementById("admin").style.display = "block";
    } else {
      alert("Clave incorrecta.");
    }
  }

  window.guardarProducto = () => {
    const nuevo = {
      nombre: document.getElementById('nombre').value,
      precio: parseFloat(document.getElementById('precio').value),
      imagen: document.getElementById('imagen').value,
      categoria: document.getElementById('categoria').value
    };

    if(!nuevo.nombre || isNaN(nuevo.precio) || !nuevo.imagen || !nuevo.categoria) {
      alert("Completa todos los campos correctamente.");
      return;
    }

    productos.push(nuevo);
    renderizarProductos();
    alert("Producto agregado correctamente.");

    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('categoria').value = '';
  }

  // Finalizar compra
  btnFinalizar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    carrito.length = 0;
    actualizarContador();
    actualizarModal();
    modalCarrito.classList.remove('visible');
    animacionCompra.style.display = 'flex';

    animacionCompra.style.animation = 'none';
    animacionCompra.offsetHeight;
    animacionCompra.style.animation = null;

    setTimeout(() => {
      animacionCompra.style.display = 'none';
    }, 3000);
  });

  renderizarProductos();
});
