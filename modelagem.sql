use mercadinho;

DROP TABLE vendas;
DROP TABLE clientes;
DROP TABLE produtos;

CREATE TABLE IF NOT EXISTS clientes(
id_cliente INT NOT NULL AUTO_INCREMENT,
cpf_cliente VARCHAR(11) NOT NULL,
nome_cliente VARCHAR(30) NOT NULL,
PRIMARY KEY(id_cliente)
);

CREATE TABLE IF NOT EXISTS produtos(
id_produto INT NOT NULL AUTO_INCREMENT,
descricao_produto VARCHAR(11) NOT NULL,
quantidade_produto INT NOT NULL,
preco_produto FLOAT NOT NULL,
PRIMARY KEY(id_produto)
);

CREATE TABLE IF NOT EXISTS vendas(
id_venda INT NOT NULL AUTO_INCREMENT,
total_venda FLOAT NOT NULL,
cliente_venda INT NOT NULL,
PRIMARY KEY(id_venda),
FOREIGN KEY (cliente_venda) REFERENCES clientes(id_cliente)
);

