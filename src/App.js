import React, { createContext, useState } from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [newUser, setNewUser] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState({

    name: '',
    email: '',
    photo: '',
    message: '',
    password: '',
    error: ''
  });

  return (
    <UserContext.Provider value={{ userData: [loggedInUser, setLoggedInUser], newUserData: [newUser, setNewUser] }}>
      <Router>
        <Header />
        <Switch>

          <Route exact path="/">
            <Shop />
          </Route>

          <Route path="/shop">
            <Shop />
          </Route>

          <Route path="/review">
            <Review />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>

          <PrivateRoute path="/inventory">
            <Inventory />
          </PrivateRoute>

          <Route path="/product/:key">
            <ProductDetails />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
