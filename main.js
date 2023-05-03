// Creacion de usuarios

class Persona{
    constructor(nombre, empresa, credito,cuotas,antiguedad){
        this.nombre = nombre;
        this.empresa = empresa;
        this.credito = credito;
        this.cuotas = cuotas;
        this.antiguedad = antiguedad;
        this.valorCuota = this.credito/this.cuotas; 
    }
    agregarCredito(credito,cuotas){
        this.credito = this.credito + credito;
        this.cuotas = this.cuotas + cuotas;
        this.valorCuota = this.credito/this.cuotas;
    }
}

const persona1 = new Persona("MARGE", "Apple", 30000, 25, 10);
const persona2 = new Persona("HOMERO", "Microsoft", 50000, 40, 15);
const persona3 = new Persona("BART", "Samsung", 20000, 15, 6);

// Panel interactivo Log in

let check = true;
let usuarioIngresado;
let decision;

while(check){

    usuarioIngresado = prompt("Ingrese su nombre de usuario. En caso de no tener uno ingrese NO");
    switch (usuarioIngresado.toLocaleUpperCase()){

        case persona1.nombre:
            alert("Bienvenido " + persona1.nombre);
            alert("A continuacion se muestran sus datos " + "\nEmpresa: "+persona1.empresa +"\nCredito: "+ persona1.credito +"\nCuotas: "+ persona1.cuotas +"\nCuota mensual: "+ persona1.valorCuota +"\nAntiguedad: "+ persona1.antiguedad)
            decision = prompt("Desea solicitar mas credito? Ingrese SI para solicitar");
            if(decision.toUpperCase() == "SI"){
                persona1.agregarCredito(parseFloat(prompt("Ingrese el nuevo monto solicitado")),parseFloat(prompt("En caso de necesitar mas cuotas ingreselas")));
                alert("A continuacion se muestran sus datos actualizados" + "\nEmpresa: "+persona1.empresa +"\nCredito: "+ persona1.credito +"\nCuotas: "+ persona1.cuotas +"\nCuota mensual: "+ persona1.valorCuota + "\nAntiguedad: "+ persona1.antiguedad)
            }
            alert("Gracias por usar nuestra plataforma de creditos. Adios")
            check=false;
            break;

        case persona2.nombre:
            alert("Bienvenido " + persona2.nombre);
            alert("A continuacion se muestran sus datos " + "\nEmpresa: "+persona2.empresa +"\nCredito: "+ persona2.credito +"\nCuotas: "+ persona2.cuotas +"\nCuota mensual: "+ persona2.valorCuota +"\nAntiguedad: "+ persona2.antiguedad)
            decision = prompt("Desea solicitar mas credito? Ingrese SI para solicitar");
            if(decision.toUpperCase() == "SI"){
                persona2.agregarCredito(parseFloat(prompt("Ingrese el nuevo monto solicitado")),parseFloat(prompt("En caso de necesitar mas cuotas ingreselas")));
                alert("A continuacion se muestran sus datos actualizados" + "\nEmpresa: "+persona2.empresa +"\nCredito: "+ persona2.credito +"\nCuotas: "+ persona2.cuotas +"\nCuota mensual: "+ persona2.valorCuota +"\nAntiguedad: "+ persona2.antiguedad )
            }
            alert("Gracias por usar nuestra plataforma de creditos. Adios")
            check=false;
            break;

        case persona3.nombre:
            alert("Bienvenido " + persona3.nombre);
            alert("A continuacion se muestran sus datos " + "\nEmpresa: "+persona3.empresa +"\nCredito: "+ persona3.credito +"\nCuotas: "+ persona3.cuotas +"\nCuota mensual: "+ persona3.valorCuota +"\nAntiguedad: "+ persona3.antiguedad)
            decision = prompt("Desea solicitar mas credito? Ingrese SI para solicitar");
            if(decision.toUpperCase() == "SI"){
                persona3.agregarCredito(parseFloat(prompt("Ingrese el nuevo monto solicitado ")),parseFloat(prompt("En caso de necesitar mas cuotas ingreselas")));
                alert("A continuacion se muestran sus datos actualizados" + "\nEmpresa: "+persona3.empresa +"\nCredito: "+ persona3.credito +"\nCuotas: "+ persona3.cuotas +"\nCuota mensual: "+ persona3.valorCuota +"\nAntiguedad: "+ persona3.antiguedad)
            }
            alert("Gracias por usar nuestra plataforma de creditos. Adios")
            check=false;
            break;

        case "NO":
            alert("Por favor contactese con mailfalso123@gmail.com para solicitar un usuario");
            check = false; 
            break;    
        
        default:
            alert("El usuario ingresado no existe.");
            break;    
    }

} 
