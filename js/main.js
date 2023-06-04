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


let Usuarios = localStorage.getItem("usuarios");

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
}

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

    alert("Usuario creado correctamente");
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
        alert("El usuario o contraseña ingresado es incorrecto");
        return;
    }

    window.location.href = "./html/home.html";
}

// Esperar eventos en el panel home, tiene que interactuar el usuario
let homePanel = document.getElementById("contenedor-home");

if (homePanel) {
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
    antiguedadElement.textContent = `Antigüedad: ${persona.antiguedad}`;
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
        }
    });
}

function creditoPorCategoria(monto, cuotas, persona) {
    let categoria = persona.categoria;

    if ((monto <= 10000 && cuotas <= 10) && categoria == "STANDARD") {
        alert("Monto actualizado");
        return false;
    } else if ((monto <= 20000 && cuotas <= 15) && categoria == "ADVANCED") {
        alert("Monto actualizado");
        return false;
    } else if ((monto <= 40000 && cuotas <= 30) && categoria == "PREMIUM") {
        alert("Monto actualizado");
        return false;
    } else {
        alert("No cuenta con la categoría para solicitar el monto");
        return true;
    }
}


// Subir informe

const subidaInforme = document.getElementById("subirInforme");

if (subidaInforme) {
    subidaInforme.addEventListener("click", () => {
        let persona = JSON.parse(localStorage.getItem("usuario"));

        if (persona.informe === "SI") {
            alert("Ya se entregó el informe anteriormente");
        } 
        else {
            for (let element of Usuarios) {
                if (persona.nombre == element.nombre) {
                    element.informe = "SI";
                    localStorage.setItem("usuarios", JSON.stringify(Usuarios));
                    localStorage.setItem("usuario", JSON.stringify(element));
                    break;
                }
            }
            alert("Informe subido correctamente");
        }

        location.reload(); // Recargo la página para ver los cambios
    });
}


// Cerrar sesion borrando la info del usuario que habia entrado
const finSesion = document.getElementsByClassName("cerrar-sesion")[0];

if (finSesion) {
    finSesion.addEventListener("click", () => {
        localStorage.removeItem("usuario");
    });
}




// Clase administradores
/* class Admins {
    constructor(nombre, password, empresa) {
        this.nombre = nombre;
        this.password = password,
            this.empresa = empresa;
    }
}

const Administradores = [
    new Admins("GABRIEL", 1234, "NEW HOLLAND"),
    new Admins("LUCAS", 5678, "CNH CAPITAL")
]
 */
/*

// Panel interactivo Log in
let check = true;
let opcionIngresada;

while(check){

    alert("Plataforma de concesionarios: panel de incio, seleccione la opcion a realizar");
    let check2 = true;
    while(check2){
        opcionIngresada = parseInt(prompt("1- Ingresar con usuario existente \n2- Crear un usuario nuevo \n3- Ingresar con usuario de administrador"));
        switch (opcionIngresada){
            case 1:
                ingresarUserExistente();
                check2=false;
                break;

            case 2:
                crearUsuario();
                check2=false;
                break;

            case 3:
                check = ingresarUserAdmin();
                check2=false;
                break;

            default:
                alert("No se ingreso una opcion valida, vuelva a intentarlo");
                break;    
        }
    }

}

// Funciones usuarios existentes 

function visualizarCamposObjetos(objeto){
    texto_total="";
    let claves = Object.keys(objeto);
    for (let clave of claves) {
        texto_total = texto_total + ("\n" +clave + ": " + objeto[clave]);
    }   
    return texto_total;
}



function pedirMasCredito(user){
    let check4 = true;
    let creditoNuevo;
    let cuotasNuevas;

    creditoNuevo = parseFloat(prompt("Ingrese el nuevo monto solicitado"));
    cuotasNuevas = parseFloat(prompt("En caso de necesitar mas cuotas ingreselas"));

    check4 = creditoPorCategoria(user.credito+creditoNuevo,user.cuotas+cuotasNuevas,user.categoria);


    while(check4){
        alert("No cuenta con la categoria para solicitar el monto y la cantidad de cuotas");
        creditoNuevo = parseFloat(prompt("Ingrese nuevamente el credito"));
        cuotasNuevas = parseFloat(prompt("Ingrese nuevamente las cuotas"));

        check4 = creditoPorCategoria(user.credito+creditoNuevo,user.cuotas+cuotasNuevas,user.categoria);
    }
    user.agregarCredito(creditoNuevo,cuotasNuevas);
    alert("A continuacion se muestran sus datos actualizados" + visualizarCamposObjetos(user));
}





// Funciones usuario nuevo

function crearUsuario(){
    let nombre;
    let empresa;
    let credito;
    let cuotas;
    let categoria;
    let check5 = true;

    nombre = prompt("Ingrese su nombre de usuario").toLocaleUpperCase();
    empresa = prompt("Ingrese su empresa").toLocaleUpperCase();
    credito = parseFloat(prompt("Ingrese el credito que necesita"));
    cuotas = parseFloat(prompt("Ingrese las cuotas que desea"));
    categoria = "STANDARD";
    check5 = creditoPorCategoria(credito,cuotas,categoria);
    while(check5){
        alert("No cuenta con la categoria para solicitar el monto y la cantidad de cuotas")
        credito = parseFloat(prompt("Ingrese nuevamente el credito"));
        cuotas = parseFloat(prompt("Ingrese nuevamente las cuotas"));
        check5 = creditoPorCategoria(credito,cuotas,categoria);
    }
    Usuarios.push( new Persona(nombre, empresa, credito, cuotas, 0,categoria,"NO"));
    alert("Usuario creado, ingrese desde el panel de inicio con su nombre");
    
}

// Funciones administradores

function visualizarUsuarios(){
    let texto_total="";

    Usuarios.forEach( (usuario)=> {
        texto_total = texto_total + usuario.nombre +"\n";
    } )

    alert(texto_total)
}

function buscarUsuario(){
    let user;
    user = prompt("Ingrese el nombre del usuario que desea buscar").toLocaleUpperCase();
    const resultado = Usuarios.find((elemento) => elemento.nombre === user);
    if(!resultado){
        alert("No se encontro el usuario especificado");
        return;
    }
    alert(visualizarCamposObjetos(resultado));

}

function filtrarInformes(){
    const resultado2 = Usuarios.filter((el) => el.informe == "NO");
    console.table(resultado2);
}

function funcionesAdministrador(user){
    let check6 = true;
    let eleccion;

    alert("Bienvenido nuevamente "+ user.nombre +"\nEmpresa: "+user.empresa);

    while(check6){

        eleccion = parseInt(prompt("Que desea realizar? \n1- Visualizar nombres de usuarios creados \n2- Visualizar datos de un usuario por nombre \n3- Visualizar por consola usuarios sin entrega de informe \n4- Cerrar sesion \n5- Detener ejecucion de la pagina"));
        if (eleccion == 1){ 
            visualizarUsuarios();
        }
        else if (eleccion == 2){ 
            buscarUsuario();
        }
        else if (eleccion == 3){
            filtrarInformes();
        }
        else if (eleccion == 4){
            alert("Sesion finalizada. Adios")
            check6 = false;
        }
        else if (eleccion == 5){
            alert("FIN DEL PROGRAMA");
            return false;
        }
        else{
            alert("No se ingreso una opcion valida")
        }

    }
    return true;
}
*/

/* function ingresarUserAdmin(){
    let usuarioIngresado;
    let posicionUsuario;
    let checkFinalizar;

    usuarioIngresado = prompt("Ingrese su nombre de administrador").toLocaleUpperCase();
    for (let element of Administradores){
        if(usuarioIngresado == element.nombre){
            posicionUsuario =  Administradores.indexOf(element);
            break;
        }
    }
    if(!(posicionUsuario+1)){
        alert("No se encontro el adminsitrador especificado")
        return true;
    }

    checkFinalizar = funcionesAdministrador(Administradores[posicionUsuario]);
    return checkFinalizar
    
}
 */