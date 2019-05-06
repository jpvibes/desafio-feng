import React, { Component } from "react";
import axios from "axios";
import Tabela from "./tabela.js";
import TabelaModal from "./tabela_modal.js";
import * as moment from "moment";

// as informacoes estao sendo exibidas atraves do script: tabela.js tabela_modal.js
// tabela_principal.js faz as requisicoes e manipulacoes e tabela/tabela_modal as rendereizacoes

class TabelaPrincipal extends Component {
  state = {
    data: [],
    filtro: [],
    pedido: [],
    dataTable: [],
    isModal: false
  };

  //faz post na API ao carregar a pagina
  componentDidMount() {
    //faz um post enviando o token de acesso. Caso o servidor autorize, pega o json
    const token = window.localStorage.getItem("@Session_Token");
    axios({
      method: "post",
      url: "/api/pedidos",
      headers: {
        "Content-type": "application/json"
      },
      data: {
        token
      }
    })
      .then(response => {
        this.setState({ data: response.data["pedidos"] }, () => {
          const _data = this.state.data.map(item => {
            let d = {
              id: item.id,
              value: "R$ " + item.value,
              date: item.date,
              name: item.client.name
            };
            return d;
          });
          this.setState({ dataTable: _data });
        });
      })

      .catch(error => {
        console.log("erro", error);
      });
  }

  changeData = value => {
    this.setState({ filtro: value });
  };

  text_toChangeData = textChange => {
    const d = [
      {
        id: textChange,
        value: textChange,
        date: textChange,
        name: textChange
      }
    ];
    this.changeData(d);
  };

  reset = () => {
    this.changeData(this.state.dataTable);
  };

  searchDataIncio = e => {
    if (e != null) {
      const _data = this.state.dataTable;

      console.log("aaa " + moment(e.target.value).format("YYYY-MM-DD"));

      const filtro = _data.filter(
        data =>
          moment(data.date).format("YYYY-MM-DDTHH:mm:ss") >= e.target.value
      );

      if (filtro.length > 0) {
        return this.changeData(filtro);
      }

      return this.text_toChangeData("---- Data Inicial Inexistente ----");
    } else {
      this.reset();
    }
  };

  searchDataLimite = e => {
    if (e != null) {
      const _data = this.state.dataTable;

      console.log("aaa " + moment(e.target.value).format("YYYY-MM-DD"));

      const filtro = _data.filter(
        data =>
          moment(data.date).format("YYYY-MM-DDTHH:mm:ss") <= e.target.value
      );

      if (filtro.length > 0) {
        return this.changeData(filtro);
      }

      return this.text_toChangeData("---- Data Limite Inexistente ----");
    } else {
      this.reset();
    }
  };

  // Filtro procurar um cliente
  searchClient = e => {
    if (e != null) {
      const _data = this.state.dataTable;
      const _input = e.target.value.toLowerCase();

      const filtro = _data.filter(data => {
        return data.name.toLowerCase().includes(_input);
      });

      if (filtro.length > 0) {
        return this.changeData(filtro);
      }

      return this.text_toChangeData("---- Cliente Não Encontrado ----");
    } else {
      this.reset();
    }
  };

  searchMinValue = e => {
    if (e != null) {
      const _data = this.state.dataTable;

      const filtro = _data.filter(
        data => parseFloat(data.value.replace("R$ ", "")) >= e.target.value
      );

      if (filtro.length > 0) {
        return this.changeData(filtro);
      }

      return this.text_toChangeData("---- Valor Não Encontrado ----");
    } else {
      this.reset();
    }
  };

  check_filtro = () => {
    const _data = this.state.dataTable;
    const _filtro = this.state.filtro;

    if (_filtro.length > 0) {
      return _filtro;
    }
    return _data;
  };

  rowEvents = {
    //evento ao clicar nas linhas da tabela
    onClick: (e, row, rowIndex) => {
      const _pedidos = this.state.data[rowIndex];

      const d = {
        items: _pedidos.items,
        id: _pedidos.id,
        value_total: "R$ " + _pedidos.value,
        client_name: _pedidos.client.name,
        client_phone: _pedidos.client.phone,
        client_email: _pedidos.client.email
      };

      this.setState({ pedido: d, isModal: true });
    }
  };

  handleVoltar = () => {
    this.setState({ isModal: false });
  };

  render() {
    if (this.state.data.length > 0) {
      const _isModal = this.state.isModal;

      if (!_isModal) {
        return (
          <Tabela
            isModal={_isModal}
            data={this.check_filtro()}
            changeData={this.changeData}
            searchDataInicio={this.searchDataIncio}
            searchDataLimite={this.searchDataLimite}
            searchClient={this.searchClient}
            searchMinValue={this.searchMinValue}
            rowEvents={this.rowEvents}
          />
        );
      } else {
        return (
          <TabelaModal
            data={this.state.pedido.items}
            pedidos_id={this.state.pedido.id}
            value_total={this.state.pedido.value_total}
            client_name={this.state.pedido.client_name}
            client_phone={this.state.pedido.client_phone}
            client_email={this.state.pedido.client_email}
            voltar_tabela={this.handleVoltar}
          />
        );
      }
    } else {
      return <h1>Espera</h1>;
    }
  }
}
export default TabelaPrincipal;
