const wellcome = document.getElementById("welcome");

const radioButtons = document.querySelectorAll('input[type= "radio"]');
const contChan = document.getElementById("change2");
const sendPetition = document.getElementById('send');
const contenedor = document.getElementById("change");
const flex = document.getElementById("flex");
const tabla = document.getElementById("tabla");
const view = document.getElementById("button");

var toggleSwitch = document.getElementById('ToogleSwitch');
var no = "";
var nombre = "";
var dir = "";
var capacity = "";
var des = "";
var img = "";
var del = "";
var noHab = "";
var camNi = "";
var camAd = "";
var estadoHab = "";
var costoHab = "";
var ImagenHab = "";
var localidad = "";
var table = "hotel (idHotel, numDocUsHot, nombreHot, direccionHot, descripcionHot, imagenHot, capacidadMaxHot, catidadHabitacionesHot)";

var mem = "Agregar";

//Change Table
var UITabla = [
                `
                <table>
                    <thead>
                        <tr id="Principal">
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Capacidad</th>
                            <th>Cantidad Habitaciones</th>
                        </tr>
                    </thead>
                `, `
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Camas Niños</th>
                            <th>Camas Adultos</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                `, `
                <table>
                    <thead>
                        <tr>
                        <th>No. Ocupante</th>
                        <th>Ocupante</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                `];

const act = document.getElementById('arrow');
const tipoTabla = () => {
    if (toggleSwitch.checked) {
        table = "habitacion (idHabitacion, HabIdHotel, cantidadCamasNiñosHab, cantidadCamasAdultoHab, estadoHab, descripcionHab, costoHab, ImagenHab)";
    } else {
        table = "hotel (idHotel, numDocUsHot, nombreHot, direccionHot, descripcionHot, imagenHot, capacidadMaxHot, catidadHabitacionesHot, Ubicacion)";
    }
    switchTable(toggleSwitch.checked);
};
const buildTable = (res) => {
    if (UITabla.length >= 2){
        let newUITabla = "";
        let newUITablas = "<tbody>";
        for (let x = 0; x < res.length; x++) {
            newUITabla = UITabla[x];
            for (let y = 0; y < res[x].length; y++) {
                const key = Object.keys(res[x][y]);
                const obj = Object.values(res[x][y]);
                newUITabla = newUITabla + '<tr>';

                for (let z = 0; z < key.length; z++) {
                    if (key[z] == "imagenHot" || key[z] == "ImagenHab") {
                        if (z === obj.length - 1) {
                            newUITabla = newUITabla + '<td><div id=\'td\'><p>' + obj[z]+ '</p></div></td></tr>';
                        } else {
                            newUITabla = newUITabla + '<td><div id=\'td\'><p>' + obj[z]+ '</p></div></td>';
                        }
                        
                    }else{
                        if (z === obj.length - 1) {
                            newUITabla = newUITabla + '<td><div id=\'td\'><p>' + obj[z]+ '</p></div></td></tr>';
                        } else {
                            newUITabla = newUITabla + '<td><div id=\'td\'><p>' + obj[z]+ '</p></div></td>';
                        }
                    }
                }
                
            }
            newUITablas = newUITablas  + newUITabla + "</tr></tbody></table>";
        }
        tabla.innerHTML = newUITablas;
    }else{
        UITabla = UITabla+ '<tbody>';
        for (let x = 0; x < res.length; x++) {
            const key = Object.keys(res[x]);
            const obj = Object.values(res[x]);
            UITabla = UITabla + '<tr>';
            for (let y = 0; y < key.length; y++) {
                if (key[y] == "imagenHot" || key[y] == "ImagenHab") {
                    if (y < key.length - 1) {
                        UITabla = UITabla + '<td><div id=\'td\'><p>' + obj[y]+ '</p></div></td>';
                    } else {
                        UITabla = UITabla + '<td><div id=\'td\'><p>' + obj[y]+ '</p></div></td></tr>';
                    }
                }else{
                    if (y < key.length - 1) {
                        UITabla = UITabla + '<td><div id=\'td\'><p>' + obj[y]+ '</p></div></td>';
                    } else {
                        UITabla = UITabla + '<td><div id=\'td\'><p>' + obj[y]+ '</p></div></td></tr>';
                    }
                }
            }
            
        }
        UITabla = UITabla + '</tbody></table>';
        tabla.innerHTML = UITabla;
    }
}

const sendView = async (information, url, type) => {
    try {
        const response = await fetch(url, {
            method: type,
            headers: {
                "Content-Type": "application/json"
            },
            body: information
        });

        const data = await response.json();
        const verify = data;

        act.classList.remove('fa-solid', 'fa-rotate-right', 'fa-spin-pulse');
        act.classList.add('fa-solid', 'fa-rotate-right');

        return verify;
    } catch (error) {
        act.classList.remove('fa-solid', 'fa-rotate-right', 'fa-spin-pulse');
        act.classList.add('fa-solid', 'fa-rotate-right');
        console.log("The error was: " + error);
        return null;
    }
}
var stringIdHot = "";
const switchTable = async (checkboxState) => {
    console.log("switchTable");
    let information = "";
    let url = "http://localhost:3000/read";
    let type = "POST";
    let indexInfo = JSON.parse(localStorage.getItem("userData"));
    let idHot = [];
    switch (checkboxState) {
        case true:
            UITabla = [`
            <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Id Hotel</th>
                    <th>Camas Niños</th>
                    <th>Camas Adultos</th>
                    <th>Estado</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>IMG</th>

                </tr>
            </thead>
            
            `]
            tabla.innerHTML = UITabla + '</table>';            
            information = JSON.stringify({
                cond: "HabIdHotel",
                where: stringIdHot,
                data: "habitacion"
            });
            
            sendView(information, url, type).then(res => {
                if (res !== null && res !== undefined) {
                    buildTable(res);
                }else{
                    tabla.innerHTML = UITabla + '</table>';
                }
            });
           
            break;
        case false:
            UITabla = [`
            <table>
            <thead>
                <tr id="Principal">
                    <th>Id.</th>
                    <th>Documento Encargado</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Descripción</th>
                    <th>IMG</th>
                    <th>Capacidad Maxima del Hotel</th>
                    <th>Cantidad Habitaciones</th>
                    <th>Localidad</th>
                </tr>
            </thead>
            `]
            indexInfo = indexInfo["Num_Doc"];
            tabla.innerHTML = UITabla + '</table>';
            information = JSON.stringify({
                cond: "numDocUsHot",
                where:  indexInfo,
                data: "hotel"
            });
            sendView(information, url, type).then(res => {
                if (res !== null && res !== undefined) {
                    buildTable(res);
                }else{
                    tabla.innerHTML = UITabla + '</table>';
                }
            });
            
            break;
        default:
            UITabla = [
            `
            <table>
                <thead>
                    <tr id="Principal">
                        <th>Id.</th>
                        <th>Documento Encargado</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Descripción</th>
                        <th>IMG</th>
                        <th>Capacidad Maxima del Hotel</th>
                        <th>Cantidad Habitaciones</th>
                        <th>Localidad</th>
                    </tr>
                </thead>
            `, `
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Id Hotel</th>
                        <th>Camas Niños</th>
                        <th>Camas Adultos</th>
                        <th>Estado</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>IMG</th>

                    </tr>
                </thead>
            `, `
            <table>
                <thead>
                    <tr>
                    <th>No. Ocupante</th>
                    <th>Ocupante</th>
                    <th>Costo</th>
                </tr>
            </thead>
            `];
            let res = null;
            tabla.innerHTML = UITabla[0] + '</table>' + UITabla[1] + '</table>' + UITabla[2] + '</table>';
            indexInfo = indexInfo["Num_Doc"];
            information = JSON.stringify({
                cond: "numDocUsHot",
                where:  indexInfo,
                data: "hotel"
            });
            while (res == null) {
                await sendView(information, url, type).then(res1 => {
                    for (let x = 0; x < res1.length; x++) {
                        if (x == res1.length -1) {
                            idHot.push(res1[x]["idHotel"]);
                        } else {
                            idHot.push(res1[x]["idHotel"]); 
                            idHot.push(' OR HabIdHotel = ');
                        }
                    }
                    res = res1;
                });
            }
            
            stringIdHot = idHot.join(',').replace(/,/g, ' ');
            information = JSON.stringify({
                cond: "HabIdHotel",
                where: stringIdHot,
                data: "habitacion"
            });
            
            sendView(information, url, type).then(res2 => {
                res = [res, res2];
                if (res[0] !== null && res[0] !== undefined && res[1] !== null && res[1] !== undefined) {
                    buildTable(res);
                }else{
                    tabla.innerHTML = UITabla[0] + '</table>' + UITabla[1] + '</table>' + UITabla[2] + '</table>';
                }
            });
                
            
            
            break;
    }
}

const click1 = (checkboxState) => {
    console.log("click1");
    act.classList.remove('fa-solid', 'fa-rotate-right');
    act.classList.add('fa-solid', 'fa-rotate-right', 'fa-spin-pulse');
    flex.classList.remove('flex-on');
    flex.classList.add('flex-off');
    switchTable(checkboxState);

}
//

//Change UI
var UI = `
        <div class="row">
            <div class="txt_field" id="txt_field">
                <input type="text" class="text" name="no" id="no" required>
                <span class="span" id="span1"></span>
                <label class="tlabel" id="lblNo">No</label>
            </div>
            <div class="txt_field">
                <input type="text" class="text" name="nombre" id="nombre" required>
                <span class="span" id="span2"></span>
                <label class="tlabel" id="lblNombre">Nombre</label>
            </div>
        </div>
        <div class="row" >
            <div class="txt_field">
                <input type="text" class="text" name="dir" id="dir" required>
                <span class="span" id="span3"></span>
                <label class="tlabel" id="lblDir">Direccion</label>
            </div>
            <div class="txt_field">
                <input type="text" class="text" name="capacity" id="capacity" required>
                <span class="span" id="span4"></span>
                <label class="tlabel" id="lblCapacity">Capacidad</label>
            </div>
        </div>
        <div class="row" >
            <div class="txt_field">
                <input type="text" class="text" name="des" id="des" required>
                <span class="span" id="span6"></span>
                <label class="tlabel" id="lblDes">Descripcion</label>
            </div>
            <div class="txt_field">
                <input type="text" class="text" name="img" id="img" required>
                <span class="span" id="span7"></span>
                <label class="tlabel" id="lblImg">Img URL</label>
            </div>
        </div>
        <div class="row" >
            <div class="txt_field" id="docCont">
                <select name="ubi" id="ubi" class="ubi" >
                    <option value="Kennedy">Eliga localidad</option>
                    <option value="Chapinero">Chapinero</option>
                    <option value="Kennedy">Kennedy</option>
                    <option value="Fontibon">Fontibon</option>
                    <option value="Engativa">Engativa</option>
                    <option value="Usme">Usme</option>
                </select>          
            </div>
        </div>
        `;
const delUI = (container) => {
    container.innerHTML =
        `
    <div class="row" >
        <div class="txt_field">
            <input type=\"text\" class=\"text\" id=\"del\" name=\"del\" required>
            <span class="span" id="span5"></span>
            <label class="tlabel" id="lblDel">No. a eliminar</label>
        </div>
    </div>
    `
    flex.classList.remove('flex-off');
    flex.classList.add('flex-on');
}
const updUI = (container) => {
    container.innerHTML = UI;
    flex.classList.remove('flex-off');
    flex.classList.add('flex-on');
}
const addUI = (container) => {
    container.innerHTML = UI;
    flex.classList.remove('flex-off');
    flex.classList.add('flex-on');
}
const changeUI = (e) => {

    switch (e.target.value) {
        case "Agregar":
            mem = "Agregar";
            tipoTabla();
            addUI(contenedor);
            break;
        case "Actualizar":
            mem = "Actualizar";
            tipoTabla();
            updUI(contenedor);
            break;
        case "Eliminar":
            mem = "Eliminar";
            tipoTabla();
            delUI(contenedor);
            break;
    }

}
//

//Validate Inputs
const validator = /^[a-zA-Z0-9_]/;
const verInfo = (e, replace, span) => {
    var elemen = e.target.value;
    if (validator.test(elemen)) {
        document.getElementById(span).classList.remove('span');
        document.getElementById(span).classList.remove('span-incorrect');
        document.getElementById(replace).classList.remove('tlabel');
        document.getElementById(replace).classList.remove('tlabel-incorrect');
        document.getElementById(replace).classList.add('tlabel-correct');
        document.getElementById(span).classList.add('span-correct');
    } else if (elemen == "" || elemen == null) {
        document.getElementById(span).classList.remove('span-correct');
        document.getElementById(span).classList.remove('span-incorrect');
        document.getElementById(replace).classList.remove('tlabel-incorrect');
        document.getElementById(replace).classList.remove('tlabel-correct');
        document.getElementById(replace).classList.add('tlabel');
        document.getElementById(span).classList.add('span');
    } else {
        document.getElementById(span).classList.remove('span');
        document.getElementById(span).classList.remove('span-correct');
        document.getElementById(replace).classList.remove('tlabel');
        document.getElementById(replace).classList.remove('tlabel-correct');
        document.getElementById(replace).classList.add('tlabel-incorrect');
        document.getElementById(span).classList.add('span-incorrect');
    }
}
const verChanges = (e, replace, span) => {
    var selected = e.target.value;
    if (selected !== "null") {
        document.getElementById(span).classList.remove('txt_field');
        document.getElementById(replace).classList.remove('select-not');
        document.getElementById(replace).classList.add('select-correct');
        document.getElementById(span).classList.add('txt_field-correct');
    }else{
        document.getElementById(span).classList.remove('txt_field-correct');
        document.getElementById(replace).classList.remove('select-correct');
        document.getElementById(replace).classList.add('select-not');
        document.getElementById(span).classList.add('txt_field');
    }
}
const validarInput = (e) => {
    switch (e.target.name) {
        case "no":
            no = e.target.value;
            verInfo(e, 'lblNo', 'span1');
            break;
        case "nombre":
            nombre = e.target.value;
            verInfo(e, 'lblNombre', 'span2');
            break;
        case "dir":
            dir = e.target.value;
            verInfo(e, 'lblDir', 'span3');
            break;
        case "capacity":
            capacity = e.target.value;
            verInfo(e, 'lblCapacity', 'span4');
            break;
        case "del":
            del = e.target.value;
            verInfo(e, 'lblDel', 'span5');
            break;
        case "des":
            des = e.target.value;
            verInfo(e, 'lblDes', 'span6');
            break;
        case "img":
            img = e.target.value;
            verInfo(e, 'lblImg', 'span7');
            break;
        case "noHab":
            noHab = e.target.value;
            verInfo(e, 'lblNoHab', 'span8');
            break;
        case "camAd":
            camAd = e.target.value;
            verInfo(e, 'lblCamAd', 'span9');
            break;
        case "camNi":
            camNi = e.target.value;
            verInfo(e, 'lblCamNi', 'span10');
            break;
        case "desHab":
            des = e.target.value;
            verInfo(e, 'lblDesHab', 'span11');
            break;
        case "costHab":
            costoHab = e.target.value;
            verInfo(e, 'lblCostoHab', 'span13');
            break;
        case "imgHab":
            ImagenHab = e.target.value;
            verInfo(e, 'lblImgHab', 'span14');
            break;
    };
}
const validarSelect = (e) =>{
    console.log(e.target.name);
    switch (e.target.name) {
        case "switchTable":
            if (e.target.value !== null) {
                estadoHab = e.target.value;
            } else {
                estadoHab = "2";
            }
            verChanges(e, 'Sex', 'sexCont');
            break;
        
        case "ubi":
                localidad = e.target.value;
                console.log(localidad);
            break;
            
        default:
            alert("Como!XD?");
            break;
    }
}

const sendInfo = async (information, url, type) => {
    try {
        await fetch(url, {
            method: type,
            headers: {
                "Content-Type": "application/json"
            },
            body: information
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                tipoTabla();
            });
    } catch (error) {
        act.classList.remove('fa-solid', 'fa-rotate-right', 'fa-spin-pulse');
        act.classList.add('fa-solid', 'fa-rotate-right');
        console.log("El error fue: " + error);
    }
}


sendPetition.addEventListener('click', () => {
    let information = "";
    let url = "";
    let type = "";
    let indexInfo;
    switch (mem) {
        case "Agregar":
            indexInfo = JSON.parse(localStorage.getItem("userData"));
            if (indexInfo == null || indexInfo == undefined) {
                indexInfo = "12345";
            }else{
                indexInfo = indexInfo["Num_Doc"];
            }
            if (table == "hotel (idHotel, numDocUsHot, nombreHot, direccionHot, descripcionHot, imagenHot, capacidadMaxHot, catidadHabitacionesHot, Ubicacion)") {
                information = JSON.stringify({
                    type: table,
                    data: "\'" + no + "\'," +indexInfo+ " ,\'" + nombre + "\' ,\'" + dir + "\' ,\'" + des + "\' ,\'" + img + "\' ,\'" + capacity + "\' ,\'" + capacity + "\',\'" + localidad + "\'"
                });
            } else {
                information = JSON.stringify({
                    type: table,
                    data: "\'" + noHab + "\',\'" +no+ "\' ,\'" + camNi  + "\' ,\'" + camAd + "\' ,\'" + estadoHab + "\' ,\'" + des + "\' ,\'" + costoHab + "\' ,\'" + ImagenHab + "\'"
                });
            }
            
            type = "POST";
            url = "http://localhost:3000/reg";
            break;
        case "Actualizar":
            indexInfo = JSON.parse(localStorage.getItem("userData"));
            if (table == "hotel (idHotel, numDocUsHot, nombreHot, direccionHot, descripcionHot, imagenHot, capacidadMaxHot, catidadHabitacionesHot, Ubicacion)") {
                information = JSON.stringify({
                    type: 'hotel',
                    arrayColumns: ['idHotel', 'numDocUsHot', 'nombreHot', 'direccionHot', 'descripcionHot', 'imagenHot', 'capacidadMaxHot', 'catidadHabitacionesHot', 'Ubicacion'],
                    data: [no, indexInfo["Num_Doc"], nombre, dir ,des, img , capacity , capacity, localidad],
                    condicional: 'idHotel',
                    where: no 
                });
            } else {
                information = JSON.stringify({
                    type: 'habitacion',
                    arrayColumns: ['idHabitacion', 'HabIdHotel', 'cantidadCamasNiñosHab', 'cantidadCamasAdultoHab', 'estadoHab', 'descripcionHab', 'costoHab', 'ImagenHab'],
                    data: [noHab, no, camNi, camAd, estadoHab, des, costoHab, ImagenHab],
                    condicional: 'idHabitacion',
                    where: noHab 
                });
            }
            type = "PUT"
            url = "http://localhost:3000/updt";

            break;
        case "Eliminar":
            if (table == "hotel (idHotel, numDocUsHot, nombreHot, direccionHot, descripcionHot, imagenHot, capacidadMaxHot, catidadHabitacionesHot, Ubicacion)") {
                information = JSON.stringify({
                    type: 'hotel',
                    condicional: 'idHotel',
                    where: del
                });
            }
            else{
                information = JSON.stringify({
                    type: 'habitacion',
                    condicional: 'idHabitacion',
                    where: del
                });
            }

            type = "DELETE";
            url = "http://localhost:3000/erase";
            break;
    }
    sendInfo(information, url, type);
});

toggleSwitch.addEventListener('change', (e) => {
    tipoTabla();
    if (toggleSwitch.checked) {
        document.getElementById('config1').classList.remove('bold');
        document.getElementById('config2').classList.remove('no-bold');
        document.getElementById('config1').classList.add('no-bold');
        document.getElementById('config2').classList.add('bold');
        UI =
            `
        <div class="row">
            <div class="txt_field" id="txt_field">
                <input type="text" class="text" name="no" id="no" required>
                <span class="span" id="span1"></span>
                <label class="tlabel" id="lblNo">No</label>
            </div>
            <div class="txt_field" id="txt_field">
                <input type="text" class="text" name="noHab" id="noHab" required>
                <span class="span" id="span8"></span>
                <label class="tlabel" id="lblNoHab">NoHab</label>
            </div>
        </div>
        <div class="row" >
            <div class="txt_field">
                <input type="text" class="text" name="camAd" id="camAd" required>
                <span class="span" id="span9"></span>
                <label class="tlabel" id="lblCamAd">Camas Adultos</label>
            </div>
            <div class="txt_field">
                <input type="text" class="text" name="camNi" id="camNi" required>
                <span class="span" id="span10"></span>
                <label class="tlabel" id="lblCamNi">Camas Niños</label>
            </div>
        </div>
        <div class="row" >
            <div class="txt_field">
                <input type="text" class="text" name="desHab" id="desHab" required>
                <span class="span" id="span11"></span>
                <label class="tlabel" id="lblDesHab">Descripcion</label>
            </div>
            <div class="txt_field" id="sexCont">
                    <select name="Sex" id="Sex" class="select-not" required>
                        <option value="null">Estado Habitacion</option>
                        <option value="1">Disponible</option>
                        <option value="2">No Disponible</option>
                    </select>
            </div>
        </div>
        <div class="row" >
            <div class="txt_field">
                <input type="text" class="text" name="costHab" id="costHab" required>
                <span class="span" id="span13"></span>
                <label class="tlabel" id="lblCostoHab">Costo</label>
            </div>
            <div class="txt_field">
                <input type="text" class="text" name="imgHab" id="imgHab" required>
                <span class="span" id="span14"></span>
                <label class="tlabel" id="lblImgHab">Img URL</label>
            </div>
        </div>
        `
        switch (mem) {
            case "Agregar":
                addUI(contenedor);
                break;
            case "Actualizar":
                updUI(contenedor);
                break;
            case "Eliminar":
                delUI(contenedor);
                break;
        }

    } else {
        document.getElementById('config1').classList.remove('no-bold');
        document.getElementById('config2').classList.remove('bold');
        document.getElementById('config1').classList.add('bold');
        document.getElementById('config2').classList.add('no-bold');
        UI =
            
            `
            <div class="row">
                <div class="txt_field" id="txt_field">
                    <input type="text" class="text" name="no" id="no" required>
                    <span class="span" id="span1"></span>
                    <label class="tlabel" id="lblNo">No</label>
                </div>
                <div class="txt_field">
                    <input type="text" class="text" name="nombre" id="nombre" required>
                    <span class="span" id="span2"></span>
                    <label class="tlabel" id="lblNombre">Nombre</label>
                </div>
            </div>
            <div class="row" >
                <div class="txt_field">
                    <input type="text" class="text" name="dir" id="dir" required>
                    <span class="span" id="span3"></span>
                    <label class="tlabel" id="lblDir">Direccion</label>
                </div>
                <div class="txt_field">
                    <input type="text" class="text" name="capacity" id="capacity" required>
                    <span class="span" id="span4"></span>
                    <label class="tlabel" id="lblCapacity">Capacidad</label>
                </div>
            </div>
            <div class="row" >
                <div class="txt_field">
                    <input type="text" class="text" name="des" id="des" required>
                    <span class="span" id="span6"></span>
                    <label class="tlabel" id="lblDes">Descripcion</label>
                </div>
                <div class="txt_field">
                    <input type="text" class="text" name="img" id="img" required>
                    <span class="span" id="span7"></span>
                    <label class="tlabel" id="lblImg">Img URL</label>
                </div>
            </div>
            <div class="row" >
                <div class="txt_field" id="docCont">
                    <select name="ubi" id="ubi" class="ubi" >
                        <option value="Kennedy">Eliga localidad</option>
                        <option value="Chapinero">Chapinero</option>
                        <option value="Kennedy">Kennedy</option>
                        <option value="Fontibon">Fontibon</option>
                        <option value="Engativa">Engativa</option>
                        <option value="Usme">Usme</option>
                    </select>          
                </div>
            </div>
            `
        
        switch (mem) {
            case "Agregar":
                addUI(contenedor);
                break;
            case "Actualizar":
                updUI(contenedor);
                break;
            case "Eliminar":
                delUI(contenedor);
                break;
        }
    }
});

contenedor.addEventListener("input", function (event) {

    if (event.target && event.target.nodeName === "INPUT") {
        validarInput(event);
    }
});

contenedor.addEventListener("change", function (event) {

    if (event.target && event.target.nodeName === "SELECT") {
        validarSelect(event);
    }
});
radioButtons.forEach((radio) => {

    radio.addEventListener('click', changeUI)//.then(() => {});

});

view.addEventListener('click', () => {
    let checkboxState = null;
    click1(checkboxState);
});

const main = async () => {
    let indexInfo = JSON.parse(localStorage.getItem("userData"));
    console.log(indexInfo);
    if (indexInfo["gender"] == "Female") {

        
        wellcome.innerHTML = "<div class=\"Container-user\"><p>Bienvenida: "+indexInfo["name"]+"</p><div id=\"ctn-icon-circle\"><div id=\"ctn-icon-user\"><i class=\"fa-solid fa-user\"></i></div></div></div>";
    } else {
        wellcome.innerHTML = "<div class=\"Container-user\"><p>Bienvenido: "+indexInfo["name"]+"</p><div id=\"ctn-icon-circle\"><div id=\"ctn-icon-user\"><i class=\"fa-solid fa-user\"></i></div></div></div>";
    }
    let checkboxState = null;
    click1(checkboxState);
}

window.addEventListener("load", function() {
    main();
});

/* XD

function generate(){
    let num = Math.floor(Math.random()*5);
    console.lo(num);
}

generate()
*/