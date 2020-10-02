import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import facebookImg from '../../images/ICON/fb.png';
import googleImg from '../../images/ICON/google.png';
import githubImg from '../../images/ICON/github.png';
import firebaseConfig from './firebase.config';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';


const Login = () => {
    const { userData } = useContext(UserContext);
    const { newUserData } = useContext(UserContext);
    const [newUser, setNewUser] = newUserData;
    const [loggedInUser, setLoggedInUser] = userData;
    const [msg, setError] = useState({ error: '' });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            console.log(isFieldValid);
        }
        if (e.target.name === 'password') {
            const isPassValid = e.target.value.length >= 6;
            const passHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPassValid && passHasNumber;
            console.log(isFieldValid)
        }
        if (isFieldValid) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        console.log(loggedInUser.email, loggedInUser.password)
        if (newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    updateUserInfo(newUserInfo.name);
                    history.replace(from);
                })
                .catch(error => {
                    setError(error.message);
                });
        }

        if (!newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.name = res.user.displayName;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    setError(error.message);
                });
        }

        e.preventDefault();
    }

    const updateUserInfo = (name) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
            .then(() => {
                console.log("user name update successfully")
            })
            .catch((error) => {
                const newUserInfo = { ...loggedInUser };
                newUserInfo.message = error.message;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo);
            });
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, email: email, photo: photoURL }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                const newUserInfo = { ...loggedInUser };
                newUserInfo.message = error.message;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo);
            });
    }

    const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(fbProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, email: email, photo: photoURL }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                const newUserInfo = { ...loggedInUser };
                newUserInfo.message = error.message;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo);
            });
    }

    const handleGithubSignIn = () => {

        var gitHubProvider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(gitHubProvider)
            .then(result => {

                var user = result;

                console.log(user)

            })
            .catch(error => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // var email = error.email;
                // var credential = error.credential;
                // console.log
            });
    }

    return (
        <div className="w-50 pb-4 pt-4 container rounded">
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    {
                        newUser &&
                        <div>
                            <Form.Label>Name</Form.Label>
                            <input className="form-control" onBlur={handleBlur} name="name" type="text" placeholder="Enter name" required />
                        </div>
                    }
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <input className="form-control" onBlur={handleBlur} name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handleBlur} type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Link className="link-style">forget password</Link> <br /><br />
                <Button
                    style={{
                        color: 'black',
                        width: '100%'
                    }}
                    className="btn rounded-pill btn-warning" type="submit">
                    login
                    </Button>
                {/* <p className="text-danger mt-4 text-center">{msg}</p> */}
                <div className='text-center mt-3'>
                    {
                        newUser
                            ?
                            <span>You already have an account?
                                <button style={{
                                    color: 'black',
                                }}
                                    className='btn w-25 btn-warning rounded-pill'
                                    onClick={() => setNewUser(!newUser)}> Log in</button>
                            </span>
                            :
                            <span>Don’t have an account?
                                <button className='btn ml-5 w-25 btn-warning rounded-pill'
                                    style={{
                                        color: 'black',
                                    }}
                                    onClick={() => setNewUser(!newUser)}> Create an account
                                </button>
                            </span>
                    }
                </div>
            </form>

            <button onClick={handleFbSignIn} className="btn rounded-pill w-50 text-dark mx-auto bg-light mt-3 p-2 d-flex">
                <img src={facebookImg} height="35px" width="35px" alt="" />
                <h6 className="mx-auto">Continue with Facebook</h6>
            </button>

            <button onClick={handleGoogleSignIn} className="btn rounded-pill w-50 text-dark mx-auto bg-light mt-3 p-2 d-flex">
                <img src={googleImg} height="30px" width="30px" alt="" />
                <h6 className="mx-auto">Continue with Google</h6>
            </button>

            <button onClick={handleGithubSignIn} className="btn rounded-pill w-50 text-dark mx-auto bg-light mb-5 mt-3 p-2 d-flex">
                <img src={githubImg} height="30px" width="30px" alt="" />
                <h6 className="mx-auto">Continue with Github</h6>
            </button>
        </div>
    );
};

export default Login;