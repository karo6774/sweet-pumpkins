import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./header/Header";
import Movie from "./main/movie/Movie";
import Main from "./main/Main";
import NotFound from "./NotFound";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route path="/movie/:id" component={Movie}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
