import React from 'react';
import {
    HashRouter,
    Switch,
    Route
  } from "react-router-dom";

import Footer from './Footer';
import Header from './Header';
import Home from '@pages/Home'
import AddUser from '@pages/AddUser'
import EditUser from '@pages/EditUser'

const App = () => {
    return(   
    <HashRouter>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/AddUser" component={AddUser}/>
            <Route path="/EditUser" component={EditUser}/>
        </Switch>
        <Footer/>
    </HashRouter>
 );};

export default App;
