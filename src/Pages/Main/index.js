import React, { Component } from 'react';
import api from '../../services/api';

import logo from '../../assests/logo.svg';
import './styles.css';

export default class Main extends Component {
    // Objeto que contém todas as info que são manipuladas pelo meu componente
    state = {
        newBox: '',
    };
    
    handleSubmit = async e => {
        // Previnir o comportamento padrão do form, impedindo-o de fazer o redirect
        e.preventDefault();
        const response = await api.post('boxes', {
            title: this.state.newBox,
        });
        
        // history serve para navegar o user para alguma tela.
        this.props.history.push(`/box/${response.data._id}`);
    }

    // e => evento
    // target => simboliza o input dentro do HTML em si
    // value => valor do input
    handleInputChange = (e) => {
        this.setState({ newBox: e.target.value });
    }
    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit} action="">
                    <img src={logo} alt=""/>
                    <input 
                    placeholder="Criar um box"
                    value={this.state.newBox}
                    onChange={this.handleInputChange}
                    />
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}
