import React, { useEffect, Component} from 'react';
import  Welcome  from '../src/Components/Welcome';
import Register from '../src/Components/Register';
import Login from '../src/Components/Login';
import Home from '../src/Components/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  Link
} from "react-router-dom";
import Profile from '../src/Components/Profile';
import SureVault from './Components/sureVault';
import Peer from './Components/peer';
import SureOffers from './Components/sureOffers';
import SureRequest from './Components/sureRequest';
import ReviewRequests from './Components/ReviewRequest';
import SureDeals from './Components/sureDeals';
import { store } from './Components/redux/store/store';
import { persistor } from './Components/redux/store/store';
import { Provider } from 'react-redux';
import MakeRequest from './Components/makeRequest';
import PendingLoanApproval from './Components/Account/pending_loan_approvals';
import Header from './Components/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector, useDispatch } from 'react-redux';
import BorrowerMarket from './Components/borrowermarket';
import LenderMarket from './Components/lendermarket';


function PrivateRoute({ children, ...rest }) {
  const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        IsLoggedIn == true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const App = (props) => {
    return (
      <Provider store = {store}>
      <PersistGate loading={null} persistor = {persistor}>  
      <Router>
          <Switch>
            <Route path="/" exact>
              <Header />
              <Welcome />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/profile">
              <Header />
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/sureVault">
              <Header />
              <SureVault />
            </PrivateRoute>
            <PrivateRoute path="/peer">
              <Header />
              <Peer />
            </PrivateRoute>
            <PrivateRoute path="/sureoffers">
              <Header />
              <SureOffers />
            </PrivateRoute>
            <PrivateRoute path="/reviewrequest">
              <Header />
              <ReviewRequests />
            </PrivateRoute>
            <PrivateRoute path="/suredeals">
              <Header />
              <SureDeals />
            </PrivateRoute>
            <PrivateRoute path="/home">
              <Header />
              <Home />
            </PrivateRoute>
            <Route path = "/makerequest">
              <Header />
              <MakeRequest />
            </Route>
            <Route path = "/pendingapproval">
              <Header />
              <PendingLoanApproval />
            </Route>
            <Route path = "/borrower_market">
              <Header />
              <BorrowerMarket />
            </Route>
            <Route path = "/lender_market">
              <Header />
              <LenderMarket />
            </Route>
          </Switch>
      </Router>
      </PersistGate>
      </Provider>
    );
}

export default App;
