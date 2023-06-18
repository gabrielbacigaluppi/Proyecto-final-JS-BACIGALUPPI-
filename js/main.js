// Creacion de usuarios de prueba y admins
// Clase usuarios
class Persona {
    constructor(nombre, password, empresa, credito, cuotas, antiguedad, categoria, informe) {
        this.nombre = nombre;
        this.password = password,
        this.empresa = empresa;
        this.credito = credito;
        this.cuotas = cuotas;
        this.antiguedad = antiguedad;
        this.categoria = categoria;
        this.informe = informe;
        this.valorCuota = this.credito / this.cuotas;
    }

}



/* let Usuarios = localStorage.getItem("usuarios");

if (!Usuarios) {
    Usuarios = [
        new Persona("MARGE", "1234", "APPLE", 30000, 20, 10, "PREMIUM", "SI"),
        new Persona("HOMERO", "4321", "MICROSOFT", 15000, 10, 15, "ADVANCED", "NO"),
        new Persona("BART", "6789", "SAMSUNG", 5000, 5, 6, "STANDARD", "NO")
    ];

    localStorage.setItem("usuarios", JSON.stringify(Usuarios));
}
else {
    Usuarios = JSON.parse(Usuarios);
} */



// Escribo lo anterior con operador ternario para esta entrega

let usuariosLocalStorage = localStorage.getItem("usuarios");
let Usuarios = usuariosLocalStorage ? JSON.parse(usuariosLocalStorage) : [
    new Persona("MARGE", "1234", "APPLE", 30000, 20, 10, "PREMIUM", "SI"),
    new Persona("HOMERO", "4321", "MICROSOFT", 15000, 10, 15, "ADVANCED", "NO"),
    new Persona("BART", "6789", "SAMSUNG", 5000, 5, 6, "STANDARD", "NO")
];
// Sobrescribo usuarios con lo mismo si ya existian, no cambia nada en este caso
localStorage.setItem("usuarios", JSON.stringify(Usuarios));




// Creacion de nuevo usuario
const formularioUsuario = document.getElementById("formulario-usuario");
if (formularioUsuario) {
    formularioUsuario.addEventListener("submit", crearNuevoUsuario);
}

function crearNuevoUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.toLocaleUpperCase();
    const password = document.getElementById("password").value.toLocaleUpperCase();
    const empresa = document.getElementById("empresa").value.toLocaleUpperCase();

    const nuevoUsuario = new Persona(nombre, password, empresa, 0, 1, 0, "STANDARD", "NO");
    Usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(Usuarios));

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario creado',
        showConfirmButton: false,
        timer: 1500
    });
}

// Panel para ingresar con usuario existente

let miFormulario = document.getElementById("formulario-inicio");

if (miFormulario) {
    miFormulario.addEventListener("submit", validarForm);
}

function validarForm(e) {
    e.preventDefault();
    let formulario = e.target;

    ingresarUserExistente(formulario);
}

function ingresarUserExistente(form) {

    let usuarioIngresado = form.children[0].children[1].value.toLocaleUpperCase();
    let passwordIngresada = form.children[1].children[1].value.toLocaleUpperCase();


    let encontrado = false;
    // Recuperar usuarios del Local Storage
    let Usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (Usuarios) {
        for (let i = 0; i < Usuarios.length; i++) {
            let usuario = Usuarios[i];
            if (usuario.nombre === usuarioIngresado && usuario.password === passwordIngresada) {
                const enJSON = JSON.stringify(usuario);
                localStorage.setItem("usuario", enJSON);
                encontrado = true;
                break;
            }
        }
    }

    if (!encontrado) {
        Swal.fire({
            icon: 'error',
            text: 'Contraseña o usuario incorrecto'
        })
        return;
    }

    window.location.href = "./html/home.html";
}

// Recuperar contraseña
const recuperarContraBtn = document.getElementById('recuperarContraseña');

if (recuperarContraBtn) {
    recuperarContraBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Contactese con mailfalso',
            text: 'Envíe un correo electrónico a mailfalso@gmail.com para recuperar su contraseña.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    });
}


// Esperar eventos en el panel home, tiene que interactuar el usuario
let homePanel = document.getElementById("contenedor-home");



if (homePanel) {
    document.addEventListener('DOMContentLoaded', function () {
        if (!localStorage.getItem('modalMostrado')) {
            Swal.fire({
                title: '¡Bienvenido a nuestra plataforma de creditos!',
                text: 'Recuerde entregar el informe antes del 15 de cada mes',
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
            localStorage.setItem('modalMostrado', 'true');
        }
    });
    funcionesUsuario();

    homePanel.children[1].children[0].addEventListener("click", function () {
        window.location.href = "./credito.html";
    });

}

function funcionesUsuario() {

    const nombreElement = document.getElementById("nombre");
    const empresaElement = document.getElementById("empresa");
    const creditoElement = document.getElementById("credito");
    const cuotasElement = document.getElementById("cuotas");
    const antiguedadElement = document.getElementById("antiguedad");
    const categoriaElement = document.getElementById("categoria");
    const informeElement = document.getElementById("informe");
    const valorCuotaElement = document.getElementById("valorCuota");

    let persona = JSON.parse(localStorage.getItem("usuario"));

    nombreElement.textContent = `Nombre: ${persona.nombre}`;
    empresaElement.textContent = `Empresa: ${persona.empresa}`;
    creditoElement.textContent = `Crédito: $${persona.credito}`;
    cuotasElement.textContent = `Cuotas: ${persona.cuotas}`;
    antiguedadElement.textContent = `Antigüedad: ${persona.antiguedad} años`;
    categoriaElement.textContent = `Categoría: ${persona.categoria}`;
    informeElement.textContent = `Informe: ${persona.informe}`;
    valorCuotaElement.textContent = `Valor de cuota mensual: $${persona.valorCuota.toFixed(2)}`;

}

// Solicitud de créditos
const formularioCredito = document.getElementById("formulario-credito");

if (formularioCredito) {
    formularioCredito.addEventListener("submit", function (event) {
        event.preventDefault();

        let persona = JSON.parse(localStorage.getItem("usuario"));

        const monto = parseFloat(document.getElementById("monto").value);
        const cuotas = parseInt(document.getElementById("cuotas").value);

        let nohabilitado = creditoPorCategoria(monto + persona.credito, cuotas + persona.cuotas, persona);

        if (!nohabilitado) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Monto actualizado',
                showConfirmButton: false,
                timer: 1500
            });
            for (let element of Usuarios) {
                if (persona.nombre == element.nombre) {
                    element.credito = element.credito + monto;
                    element.cuotas = element.cuotas + cuotas;
                    element.valorCuota = element.credito / element.cuotas;
                    localStorage.setItem("usuarios", JSON.stringify(Usuarios));
                    localStorage.setItem("usuario", JSON.stringify(element));
                    break;
                }
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'No cuenta con la categoría para solicitar el monto',
            });
        }
    });
}

function creditoPorCategoria(monto, cuotas, persona) {
    let categoria = persona.categoria;

    return !(
        (categoria === "STANDARD" && monto <= 10000 && cuotas <= 10) ||
        (categoria === "ADVANCED" && monto <= 20000 && cuotas <= 15) ||
        (categoria === "PREMIUM" && monto <= 40000 && cuotas <= 30)
    );
}


// Subir informe

const subidaInforme = document.getElementById("subirInforme");

if (subidaInforme) {
    subidaInforme.addEventListener("click", () => {
        let persona = JSON.parse(localStorage.getItem("usuario"));

        if (persona.informe === "SI") {
            Swal.fire({
                icon: 'warning',
                text: 'Ya se entregó el informe anteriormente',
            });
        } else {
            for (let element of Usuarios) {
                if (persona.nombre == element.nombre) {
                    element.informe = "SI";
                    localStorage.setItem("usuarios", JSON.stringify(Usuarios));
                    localStorage.setItem("usuario", JSON.stringify(element));
                    let informeElement = document.getElementById("informe");
                    informeElement.innerHTML = `<p>Informe: ${element.informe}</p>`;
                    break;
                }
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Informe subido correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        }


    });
}

// Cerrar sesion borrando la info del usuario que habia entrado y el modal de bienvenida
const finSesion = document.getElementsByClassName("cerrar-sesion")[0];


if (finSesion) {
    finSesion.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("modalMostrado");
    });
}
// Api tipo de cambio https://www.exchangerate-api.com/

const apiKey = 'd237ada023cf51f167b1dd14';
const apiUrl1 = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const apiUrl2 = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;

fetch(`${apiUrl1}`)
    .then(response => response.json())
    .then(data => {
        const arsExchangeRate = data.conversion_rates.ARS;

        const exchangeRatesElement = document.getElementById('exchangeRates');
        exchangeRatesElement.innerHTML = `
            <li><p>1 USD = ${arsExchangeRate} ARS</p></li>
        `
    })
    .catch(error => {
        console.error('Error al obtener los tipos de cambio:', error);
    });

fetch(`${apiUrl2}`)
    .then(response => response.json())
    .then(data => {

        const arsExchangeRate = data.conversion_rates.ARS;

        const exchangeRatesElement = document.getElementById('exchangeRates');
        const li = document.createElement('li');
        li.innerHTML = `
            <p>1 EUR = ${arsExchangeRate} ARS</p>
        `
        exchangeRatesElement.append(li);
    })
    .catch(error => {
        console.error('Error al obtener los tipos de cambio:', error);
    });

