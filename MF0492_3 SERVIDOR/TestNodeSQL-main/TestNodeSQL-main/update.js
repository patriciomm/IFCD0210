const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "focyl",
    password: "focyl",
    database: "tiendaonline",
    debug    :  false
});

// add rows in the table

function addRow(data) {
    let insertQuery = 'INSERT INTO ?? (??,??,??,?? ) VALUES (?,?,?,?)';
    let query = mysql.format(insertQuery,["articulo","cod","nombre","pvp", "marca",data.cod,data.nombre,data.pvp,data.marca]);
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

function callSP(spName) {
    let spQuery = 'CALL ??';
    let query = mysql.format(spQuery,[spName]);
    // CALL `getAllTodo`
    pool.query(query,(err, result) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows from SP
        console.log(result);
    });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
    // call the function
    // addRow({
    //     "cod":"B0002",
    //     "nombre": "D5100",
    //     "marca": "Nikon",
    //     "pvp":"489"
    // });
    //callSP('getAllTodo')
    callSP('getCod001')
},5000);