var express = require("express");
var path = require("path");
var mysql = require('mysql');


const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("servidor na porta " + port)
});

var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "mercadinho",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
    res.render("index");
});

//Read
app.get("/produtos", (req, res) => {

    con.query('SELECT * FROM produtos', (err, rows) => {
        if (err) throw err
        rows.forEach(rows => {
            console.log(`${rows.descricao_produto},${rows.quantidade_produto}, ${rows.preco_produto}`)
        });
        res.render("produtos", { lista_produtos: rows })
    })

});

//Create
app.get("/cadastrar_produtos", (req, res) => {
    res.render("cadastro_produtos");
});

app.post("/cadastrar_produtos", (req, res) => {

    let nome_produto = req.body.nome;
    let quantidade = req.body.quantidade;
    let preco = req.body.preco;

    var sql = `INSERT INTO produtos(descricao_produto, quantidade_produto, preco_produto) VALUES ('${nome_produto}','${quantidade}','${preco}')`;

    con.query(sql, function (err, result) {
        resultado = result;
        console.log(resultado);
        if (err) throw err;
        console.log("dado inserido: " + sql);
    });

    return res.redirect("/produtos");
});

//Delete
app.get("/deletarProdutos/:id", (req, res) => {
    let id = req.params.id;
    var sql = `DELETE FROM produtos WHERE id_produto =('${id}')`;
    con.query(sql, function (err, result) {
        if (err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/produtos");
    });
});

//Update
app.get("/editar_produtos/:id", (req, res) => {
    let id = req.params.id;
    var sql = `SELECT * FROM produtos WHERE id_produto =('${id}')`;
    con.query(sql, function (err, conteudo) {
        if (err)
            return res.status(500).send("Erro ao consultar");
        res.render("editarProdutos", { descricao_item: conteudo[0] });
    });
});

app.post("/editar_produtos", (req, res) => {

    var id = req.body.id_produto;
    var updateData = req.body;
    var sql = `UPDATE produtos SET ? WHERE id_produto= ?`;
    con.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " atualização");
    });
    res.redirect('/produtos');
});

//cadastro vendas

app.get("/comprar_produto/:id", (req, res) => {
    let id = req.params.id;
    var sql = `UPDATE produtos SET quantidade_produto = quantidade_produto -1 WHERE id_produto= ('${id}')`;

    con.query(sql, id, (err, result) => {
        if (err) throw err;

    })
    res.redirect("/produtos");
})

//cadastro clientes
app.get("/clientes", (req, res) => {

    con.query('SELECT * FROM clientes', (err, rows) => {
        if (err) throw err
        rows.forEach(rows => {
            console.log(`${rows.nome_cliente},${rows.cpf_cliente}`)
        });
        res.render("clientes", { lista_clientes: rows })
    })

});

app.get("/cadastro_cliente", (req, res) => {
    res.render("cadastro_cliente");
});

app.post("/cadastro_cliente", (req, res) => {

    let nome = req.body.nome_cliente;
    let cpf = req.body.cpf_cliente;

    var sql = `INSERT INTO clientes(nome_cliente, cpf_cliente) VALUES ('${nome}','${cpf}')`;

    con.query(sql, function (err, result) {
        resultado = result;
        console.log(resultado);
        if (err) throw err;
        console.log("dado inserido: " + sql);
    });

    return res.redirect("/clientes");
});

//Delete cliente
app.get("/deletar_clientes/:id", (req, res) => {
    let id = req.params.id;
    var sql = `DELETE FROM clientes WHERE id_cliente =('${id}')`;
    con.query(sql, function (err, result) {
        if (err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/clientes");
    });
});

//Updte cliente
app.get("/editar_cliente/:id", (req, res) => {
    let id = req.params.id;
    var sql = `SELECT * FROM clientes WHERE id_cliente =('${id}')`;
    con.query(sql, function (err, conteudo) {
        if (err)
            return res.status(500).send("Erro ao consultar");
        res.render("editarCliente", { descricao_item: conteudo[0] });
    });
});

app.post("/editar_cliente", (req, res) => {

    var id = req.body.id_cliente;
    var updateData = req.body;
    var sql = `UPDATE clientes SET ? WHERE id_cliente= ?`;
    con.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " atualização");
    });
    res.redirect('/clientes');
});
