import React, { useContext, useState } from 'react';
import headLogo from '../../images/logo.png';
import './Header.css'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import firebase from 'firebase';


const Header = () => {
    const { userData } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = userData;
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/login')
    }

    const handleLoggedOut = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                setLoggedInUser({})
                history.push('/shop')
            })
            .catch(error => {

            });
    }

    return (
        <div className="header mt-3">
            <div className="header text-center mt-3">
                <img src={headLogo} alt="" />
            </div>
            <nav className="mt-3 d-flex">
                <Link className="header-margin" to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Inventory</Link>
                <div className="ml-auto mr-5">
                    <Link to='/login'>
                        {
                            loggedInUser.name ? <button onClick={handleLoggedOut} className="btn btn-outline-warning" type="submit">log out</button>
                                : <button onClick={handleProceedCheckout} className="btn btn-outline-warning" type="submit">login</button>
                        }
                    </Link>
                    <Link className="pl-3 pr-3 pt-1 pb-1">
                        {loggedInUser.name}
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;