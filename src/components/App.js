import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./navBar";
import Users from "./users";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Route path="/users" component={Users}/>
        </div>
    );
};

export default App;
