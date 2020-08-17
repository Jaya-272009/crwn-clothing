import React,{useEffect} from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import checkoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import {createStructuredSelector} from 'reselect'
import { selectCurrentUser } from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { checkUserSession } from './redux/user/user.actions';

const App =({checkUserSession,currentUser})=> {

  useEffect(() => {
    checkUserSession()
  },[checkUserSession]);


  return (
 <div>
   <Header/>
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={()=> currentUser? (<Redirect to='/' />): ( <SignInAndSignUpPage /> )} />
          <Route exact path="/checkout" component={checkoutPage} />
      </Switch>
 </div>
  );
  }



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray : selectCollectionsForPreview
}) 


const mapDispatchToProps = dispatch =>({
  checkUserSession:()=> dispatch(checkUserSession())
})


export default connect(mapStateToProps,mapDispatchToProps )(App);
