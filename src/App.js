import React, { useEffect, Component} from 'react';
import  Welcome  from '../src/Components/Welcome';
import Register from '../src/Components/Register';
import Login from '../src/Components/Login';
import Home from '../src/Components/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  Redirect,
  useParams,
  Link
} from "react-router-dom";
import Profile from '../src/Components/Profile';
import SureVault from './Components/sureVault';
import PeerBorrower from './Components/peer_borrower';
import PeerLender from './Components/peer_lender';
import SureOffers from './Components/sureOffers';
import SureConnect from './Components/sureconnect';
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
import VerifyEmail from './Components/verifyemail';


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
            <Route path="/verifyemail/:id">
              <Header />
              <VerifyEmail />
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
            <PrivateRoute path="/peer_lender">
              <Header />
              <PeerLender />
            </PrivateRoute>
            <PrivateRoute path="/peer_borrower">
              <Header />
              <PeerBorrower />
            </PrivateRoute>
            <PrivateRoute path="/sureoffers">
              <Header />
              <SureOffers />
            </PrivateRoute>
            <PrivateRoute path = "/sureconnect">
              <Header />
              <SureConnect />
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
            <PrivateRoute path = "/makerequest">
              <Header />
              <MakeRequest />
            </PrivateRoute>
            <PrivateRoute path = "/pendingapproval">
              <Header />
              <PendingLoanApproval />
            </PrivateRoute>
            <Route path = "/borrower_market">
              <Header />
              <BorrowerMarket />
            </Route>
            <Route path = "/lender_market">
              <Header />
              <LenderMarket />
            </Route>
            <Route path="*">
              <Header />
              <Welcome />
            </Route>
          </Switch>
      </Router>
      </PersistGate>
      </Provider>
    );
}

export default App;
