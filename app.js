const formEmpleado = document.getElementById("formEmpleado");
const tbody = document.getElementById("tbodyEmpleados");


const validarCedula = (cedula) => {

    const clean = cedula.replace(/[-\s]/g, '');

    if(!/^\d{11}$/.test(clean)) return false;

    const mult = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

    let suma = 0;

    for(let i = 0; i < 10; i++) {

        let p = parseInt(clean[i]) * mult[i];

        if(p >= 10){
            p = Math.floor(p / 10) + (p % 10);
        }

        suma += p;
    }

    const digito = (10 - (suma % 10)) % 10;

    return digito === parseInt(clean[10]);
};




formEmpleado.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const salario = parseFloat(
        document.getElementById("salario").value
    );


 
    if (!validarCedula(cedula)) {

        alert("La cédula ingresada no es válida.");

        return;
    }


    const afp = salario * 0.0287;
    const ars = salario * 0.0304;
    const neto = salario - afp - ars;
    const fila = document.createElement("tr");


    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${cedula}</td>
        <td>${email}</td>
        <td>${telefono}</td>
        <td>RD$ ${salario.toFixed(2)}</td>
        <td>RD$ ${afp.toFixed(2)}</td>
        <td>RD$ ${ars.toFixed(2)}</td>
        <td>RD$ ${neto.toFixed(2)}</td>
    `;


    tbody.appendChild(fila);   
    formEmpleado.reset();

});