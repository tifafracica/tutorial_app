import './scss/app.scss';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTutorial from "./components/addTutorial";
import Tutorial from "./components/tutorial";
import TutorialsList from "./components/tutorialList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark purple-bg">
        <div className="container-fluid">
          <a href="/tutorials" className="navbar-brand">
            The Tutorial App
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/tutorials"} className="nav-link active">
                Tutorials
              </Link>
              <Link to={"/add"} className="nav-link">
                Add
              </Link>

            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  )
}

export default App;
