const mascotas = [];
const dueños = [];

let recordar = 0;
const asignarid = () => {
  recordar += 1;
  return recordar;
};

const RegistroUsuario = () => {
  setTimeout(() => {
    const nombre = prompt("Ingrese el nombre del dueño").trim();
    const cedula = prompt("Ingrese el numero de cedula").trim();
    const email = prompt("Ingrese su correo electronico").trim();
    const telefono = prompt("Ingrese su numero de telefono").trim();

    if (!nombre || !cedula || !email || !telefono) {
      alert("Error. Todos los datos deben ser completados");
      return;
    }

    if (dueños.some(d => d.cedula === cedula)) {
      alert("Error ya existe un dueño con esa cedula");
      return;
    }

    const nuevoUsuario = {
      id: asignarid(),
      nombre,
      cedula,
      telefono,
      email,
    };

    dueños.push(nuevoUsuario);
    alert("Usuario registrado");
  }, 1500);
};

const registraMascota = () => {
  setTimeout(() => {
    const nombre = prompt("Ingrese el nombre de la mascota").trim();
    const especie = prompt("¿Qué tipo de mascota es? Ave, Perro, Gato...").trim();
    const pesostr = prompt("¿Cuánto pesa la mascota?").trim();
    const edadstr = prompt("¿Qué edad tiene la mascota?").trim();
    const estadoSalud = prompt("Estado de la mascota. Sana, Enferma, En tratamiento").trim();
    const cedulaDueño = prompt("Cédula del dueño").trim();

    if (!nombre || !especie || !pesostr || !edadstr || !estadoSalud || !cedulaDueño) {
      alert("Error: Todos los datos deben ser llenados");
      return;
    }

    const edad = Number(edadstr);
    const peso = Number(pesostr);

    if (isNaN(edad) || edad <= 0 || isNaN(peso) || peso <= 0) {
      alert("Debe ingresar números positivos para edad y peso");
      return;
    }

    const especiesValidas = ['Perro', 'Gato', 'Ave', 'Reptil', 'Otro'];
    if (!especiesValidas.includes(especie)) {
      alert('Error: Especie inválida.');
      return;
    }

    const estadosValidos = ['Sana', 'Enferma', 'En tratamiento'];
    if (!estadosValidos.includes(estadoSalud)) {
        
      alert('Error: Estado de salud inválido.');
      return;
    }

    const dueño = dueños.find(d => d.cedula === cedulaDueño);
    if (!dueño) {
      alert('Error: No existe un dueño con esa cédula.');
      return;
    }

    const nuevaMascota = {
      id: asignarid(),
      nombre,
      especie,
      edad,
      peso,
      estadoSalud,
      ownerId: dueño.id
    };

    mascotas.push(nuevaMascota);
    alert('Mascota registrada con éxito.');
  }, 2000);
};

const buscarMascota = () => {
  const nombreBusqueda = prompt("Ingrese el nombre de la mascota a buscar").trim();
  if (!nombreBusqueda) {
    alert("Debe ingresar un nombre para buscar");
    return;
  }

  const mascotaEncontrada = mascotas.find(m => m.nombre.toLowerCase() === nombreBusqueda.toLowerCase());

  if (mascotaEncontrada) {
    const dueño = dueños.find(d => d.id === mascotaEncontrada.ownerId);
    alert(
      `Mascota encontrada:\n` +
      `Nombre: ${mascotaEncontrada.nombre}\n` +
      `Especie: ${mascotaEncontrada.especie}\n` +
      `Edad: ${mascotaEncontrada.edad}\n` +
      `Peso: ${mascotaEncontrada.peso}\n` +
      `Estado de salud: ${mascotaEncontrada.estadoSalud}\n` +
      `Dueño: ${dueño ? dueño.nombre : 'Desconocido'}`
    );
  } else {
    alert("Error: No se encontró ninguna mascota con ese nombre.");
  }
};

const menu = () => {
  const option = prompt(
    'Veterinaria - Menú:\n' +
    '1. Registrar un nuevo dueño\n' +
    '2. Registrar una nueva mascota\n' +
    '3. Buscar una mascota\n' +
    '4. Salir\n' +
    'Ingrese el número de la opción:'
  );

  if (option === '1') {
    RegistroUsuario();
    setTimeout(menu, 2500);
  } else if (option === '2') {
    registraMascota();
    setTimeout(menu, 3000);
  } else if (option === '3') {
    buscarMascota();
    setTimeout(menu, 1500);
  } else if (option === '4') {
    alert('Gracias por usar la aplicación. ¡Hasta luego!');
  } else {
    alert('Opción inválida, intente de nuevo.');
    setTimeout(menu, 1000);
  }
};

menu();