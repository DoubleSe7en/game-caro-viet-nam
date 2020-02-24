import React from "react";
import { Router } from "react-router-dom";
import Alert from "../containers/alert";
import Navigation from "../containers/navigation";
import Main from "./main";
import "../stylesheets/login-register.css";
import history from "../helpers/history";


function App(){
  return(
    <div className="container">
        <Alert />
        <Router history={history} >
          <Navigation />
          <Main />
        </Router>
      </div>
  
  );
}
export default App;
