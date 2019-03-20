import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./header/Header";
import Movie from "./main/movie/Movie";
import Main from "./main/Main";
import NotFound from "./NotFound";

const App = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/movies/:id" component={Movie}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);
export default App;
