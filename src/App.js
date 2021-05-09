import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { getUserAuth } from "./action";
import { connect } from "react-redux";
import Header from "./components/Header";
function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);
  console.log(props.user);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
