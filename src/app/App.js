import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layout/users";
import Login from "./layout/login";
import MainPage from "./layout/mainPage";
import NavBar from "./components/ui/navBar";
import EditUserPage from "./components/ui/userEditPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/edit" component={EditUserPage}/>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
