import React from 'react';

const ReviewItem = (props) => {
    const { img, name, quantity, key, price } = props.product;

    const { removeProduct } = props;


    return (
        <div
            style={{
                borderBottom: "1px solid lightgray",
                marginBottom: "5px",
                padding: "10px",
                paddingLeft: "50px",
                display: "flex"
            }}>
            <div>

                <img src={img} alt="" />
            </div>
            <div className="ml-5">
                <h4> This is Review {name}</h4>
                <h5>Quantity: {quantity}</h5>
                <small><strong>${price}</strong></small>
                <br /><br />
                <button
                    style={{ backgroundColor: "orange", fontWeight: "bold" }}
                    className="btn w-btn"
                    onClick={() => removeProduct(key)}
                >
                    Remove
            </button>
            </div>
        </div>
    );
};

export default ReviewItem;