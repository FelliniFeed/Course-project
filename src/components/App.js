import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./navBar";
import Users from "./users";
import MainPage from "./mainPage";
import Login from "./login";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/users/:userId?" component={Users}/>
                <Route path="/users" component={Users}/>
                <Route path="/login" component={Login}/>
                <Route path="/" component={MainPage}/>
            </Switch>

        </div>
    );
};

export default App;
