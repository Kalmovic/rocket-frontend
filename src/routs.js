import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Pages/Main';
import Box from './Pages/Box';


// BrowserRouter indica para a aplicação react como as rotas irão se comportar
// Switch garante que uma rota seja chamada por vez
// exact faz com que Main renderize somente para localhost:3000 ou localhost:3000/
const Routes = () => (
    
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/box/:id" component={Box}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;