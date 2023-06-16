import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
        <Route path="/">
          <Home/>
        </Route>
        <Route path="/products/:handle">
          <ProductPage/>
        </Route>
        </Switch>
        <p> Footer </p>
      </Router>
    </div>
  );
}

export default App;
