import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

const TabelaModal = props => {
  const columns = [
    //display colunas da tabela
    {
      dataField: "name",
      text: "Items"
    },

    {
      dataField: "description",
      text: "Descricao"
    },

    {
      dataField: "quantity",
      text: "Quantidade"
    },

    {
      dataField: "value",
      text: "Valor"
    }
  ];

  return (
    <div className="col-xl-11">
      <div className="card shadow mb-4">
        <div className="card-header align-items-center">
          <h2 className="text-center">Detalhes do Pedido {props.pedidos_id}</h2>
          <br />
          <div className="d-flex justify-content-between">
            <h5>Nome: {props.client_name}</h5>
            <div>
              <h5>Telefone: {props.client_phone}</h5>
            </div>
            <h5>Email: {props.client_email}</h5>
          </div>
        </div>
        <BootstrapTable //tabela
          keyField="name"
          columns={columns}
          data={props.data}
        />
        <div className="d-flex justify-content-between">
          <div />
          <h5 style={{ marginRight: "2rem" }}>Total: {props.value_total}</h5>
        </div>

        <div
          className="row justify-content-center align-self-center"
          style={{ marginBottom: "1rem" }}
        >
          <button className="btn btn-success " onClick={props.voltar_tabela}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabelaModal;
