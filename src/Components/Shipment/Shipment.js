import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const { userData } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = userData;

    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };
        fetch('https://young-escarpment-51427.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('YOUR ORDER PLACED SUCCESSFULLY')
                }
            })
    };


    return (
        <div className="container">
            <div style={{ paddingBottom: "50px" }} className="row pl-3 w-75 mt-5 mb-5">
                <div className="col-md-6">
                    <h3>Your Shipment Info.</h3>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="name" className="form-control font-weight-bold mb-2" name="name" type="text" />
                        {errors.name && <span style={{ color: "red" }}>Name is required</span>}

                        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="email" className="form-control mb-2" type="text" />
                        {errors.email && <span style={{ color: "red" }}>Email is required</span>}

                        <input name="address" ref={register({ required: true })} placeholder="address" className="form-control mb-2" type="text" />
                        {errors.address && <span style={{ color: "red" }}>Address is required</span>}

                        <input name="number" ref={register({ required: true })} placeholder="mobile Number" className="form-control mb-2" type="text" />
                        {errors.number && <span style={{ color: "red" }}>Mobile Number is required</span>}

                        <div className="d-flex mb-3">
                            <input name="country" ref={register({ required: true })} placeholder="country" className="form-control w-50 mr-2" type="text" />

                            <input name="postal" ref={register({ required: true })} placeholder="postal code" className="form-control w-50 ml-2" type="text" />
                        </div>

                        <input className="bg-warning form-control w-100" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Shipment;