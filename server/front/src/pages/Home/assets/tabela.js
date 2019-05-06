import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import { CSVLink } from "react-csv";

const Tabela = props => {
  const columns = [
    //display colunas da tabela
    {
      dataField: "id",
      text: "Identificacão"
    },

    {
      dataField: "date",
      text: "Data do Pedido"
    },

    {
      dataField: "value",
      text: "Valor"
    },

    {
      dataField: "name",
      text: "Cliente"
    }
  ];

  return (
    <div className="col-xl-11">
      <div className="card shadow mb-4">
        <div className="card-header align-items-center">
          <h2 className="text-center">Pedidos</h2>
          <br />
          <div className="row justify-content-center align-self-center">
            <div className="col-sm-3">
              <input //input data inicio
                type="date"
                className="form-control"
                onChange={props.searchDataInicio}
                onBlur={e => {
                  e.target.value = "";
                  props.searchClient((e = null));
                }}
              />
            </div>
            <div className="col-sm-3">
              <input //input data termino
                type="date"
                placeholder="Insira uma data1"
                className="form-control"
                onChange={props.searchDataLimite}
                onBlur={e => {
                  e.target.value = "";
                  props.searchClient((e = null));
                }}
              />
            </div>
            <div className="col-sm-3">
              <input //input nome cliente e chama funcao search_client na tabela_principal.js
                type="text"
                className="form-control"
                placeholder="Nome do Cliente"
                onChange={props.searchClient}
                onBlur={e => {
                  e.target.value = "";
                  props.searchClient((e = null));
                }}
              />
            </div>

            <div className="col-sm-3">
              <input //input valor minimo e chama funcao search_minimo na tabela_principal.js
                type="number"
                className="form-control"
                placeholder="Valor Minimo"
                onChange={props.searchMinValue}
                onBlur={e => {
                  e.target.value = "";
                  props.searchClient((e = null));
                }}
              />
            </div>
          </div>
        </div>
        <BootstrapTable
          keyField="id"
          data={props.data}
          columns={columns}
          rowEvents={props.rowEvents}
        />
        <div
          className="row justify-content-center align-self-center"
          style={{ marginBottom: "1rem" }}
        >
          <CSVLink className="btn btn-success " data={props.data}>
            Exportar CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default Tabela;
