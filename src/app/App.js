import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layout/users";
import Login from "./layout/login";
import MainPage from "./layout/mainPage";
import NavBar from "./components/ui/navBar";
import EditUserPage from "./components/ui/userEditPage";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layout/logOut";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <ProtectedRoute path="/users/:userId?/edit" component={EditUserPage}/>
                            <ProtectedRoute path="/users/:userId?" component={Users} />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut}/>
                            <Route path="/" exact component={MainPage} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
}

export default App;
