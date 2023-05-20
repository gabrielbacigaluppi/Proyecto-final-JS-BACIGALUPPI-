// Creacion de usuarios de prueba y admins
// Clase usuarios
class Persona{
    constructor(nombre, empresa, credito,cuotas,antiguedad,categoria,informe){
        this.nombre = nombre;
        this.empresa = empresa;
        this.credito = credito;
        this.cuotas = cuotas;
        this.antiguedad = antiguedad;
        this.categoria = categoria;
        this.informe = informe;
        this.valorCuota = this.credito/this.cuotas; 
    }
    agregarCredito(credito,cuotas){
        this.credito = this.credito + credito;
        this.cuotas = this.cuotas + cuotas;
        this.valorCuota = this.credito/this.cuotas;
    }
}

const Usuarios = [
    new Persona("MARGE", "APPLE", 30000, 20, 10,"PREMIUM","SI"),
    new Persona("HOMERO", "MICROSOFT", 15000, 10, 15,"ADVANCED","NO"),
    new Persona("BART", "SAMSUNG", 5000, 5, 6,"STANDARD","NO")
]

// Clase administradores
class Admins{
    constructor(nombre, empresa){
        this.nombre = nombre;
        this.empresa = empresa;
    }
}

const Administradores = [
    new Admins("GABRIEL", "NEW HOLLAND"),
    new Admins("LUCAS", "CNH CAPITAL")
]



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

function creditoPorCategoria(monto,cuotas,categoria){
    if((monto<=10000 && cuotas<=10 ) && categoria == "STANDARD" ){
        alert("Monto actualizado");
    }
    else if((monto<=20000 && cuotas<=15 ) && categoria == "ADVANCED" ){
        alert("Monto actualizado");
    }
    else if((monto<=40000 && cuotas<=30 ) && categoria == "PREMIUM" ){
        alert("Monto actualizado");
    }
    else{
        return true;
    }
    return false;
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

function funcionesUsuario(user){
    let check3 = true;
    let eleccion;

    alert("Bienvenido nuevamente "+ user.nombre);
    alert("A continuacion se muestran sus datos " + visualizarCamposObjetos(user));

    while(check3){

        eleccion = parseInt(prompt("Que desea realizar? \n1- Solicitar nuevo credito \n2- Subir informe Dealer Net  \n3- Cerrar sesion"));
        if (eleccion == 1){ 
            pedirMasCredito(user);
        }
        else if (eleccion == 2){ 
            user.informe = "SI";
            alert("Informe subido");
            alert("A continuacion se muestran sus datos actualizados" + visualizarCamposObjetos(user));
        }
        else if (eleccion == 3){
            alert("Gracias por usar nuestra plataforma de creditos. Adios")
            check3 = false;
        }
        else{
            alert("No se ingreso una opcion valida")
        }

    }
}

function ingresarUserExistente(){
    let usuarioIngresado;
    let posicionUsuario;

    usuarioIngresado = prompt("Ingrese su nombre de usuario. Si olvido su contraseña por favor contáctese con mailfalso123@gmail.com").toLocaleUpperCase();
    for (let element of Usuarios){
        if(usuarioIngresado == element.nombre){
            posicionUsuario =  Usuarios.indexOf(element);
            break;
        }
    }
    if(!(posicionUsuario+1)){
        alert("No se encontro el usuario especificado")
        return;
    }

    funcionesUsuario(Usuarios[posicionUsuario]);
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

function ingresarUserAdmin(){
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