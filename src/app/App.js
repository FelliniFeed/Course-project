import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layout/users";
import MainPage from "./layout/mainPage";
import Login from "./layout/login";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/users/:userId?" component={Users}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/" component={MainPage}/>
            </Switch>

        </div>
    );
};

export default App;
