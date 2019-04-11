import React, { Component } from 'react';
import api from '../../services/api';
import { MdInsertDriveFile } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import logo from "../../assests/logo.svg";
import './styles.css';

export default class Box extends Component {

  state = {
    box: {}
  }

  //Método de ciclo de vida, que executam de forma automatica de acordo com o ciclo
  //de vida de um componente
  //(criação-user entou na rota, atualização e destruição-user saiu da rota)
  async componentDidMount(){
    this.subscribeToNewFiles();
    //pega o ID do boxes/:id na URL
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);
    this.setState({ box: response.data });
  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket('https://omnistack-bckend.herokuapp.com');
    //Enviar uma mensagem
    io.emit('connectRoom', box);
    io.on('file', data => {
      this.setState({ box: { ... this.state.box, files: [data, ... this.state.box.files] } })
    });
  }

  handleUpload = (files) => {
    files.forEach(file => {
                        // Envia arqs para o backend sem utilizar um form
      const data = new FormData();
      const box = this.props.match.params.id;
                  // NO insomnia no POST (criar arq) o nome do input é file
      data.append('file', file);

      api.post(`boxes/${box}/files`, data);
    });
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt=""/>
          <h1>{this.state.box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" { ... getRootProps()}>
              <input { ... getInputProps()}/>
              <p>Arrate arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {
            // Verifica se o files existe antes de fazer o map que retorna o file 
            this.state.box.files && 
              this.state.box.files.map(file => (
                <li key={file._id}>
                  <a className="fileInfo" href={file.url} target="_blank">
                    <MdInsertDriveFile size={24} color="#A5CFFF" />
                    <strong>{file.title}</strong>
                  </a>
                  <span>há{" "}
                    {distanceInWords(file.createdAt, new Date(), {
                    locale: pt
                  })}</span>
                </li>
              )) 
          }
          
        </ul>

      </div>
    );
  }
}
