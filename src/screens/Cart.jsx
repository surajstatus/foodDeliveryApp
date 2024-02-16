import React from 'react'
import * as Icons from 'react-bootstrap-icons';
import { useCart, useDispatchCart } from '../Component/ContextReducer'

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3 text-white">
                    The Cart is Empty!
                </div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });

        console.log("Order Resposne", response);
        if (response.status === 200) {
            dispatch({ type: 'DROP' })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th className="text-white fs-4" scope='col' >#</th>
                            <th className="text-white fs-4" scope='col' >Name</th>
                            <th className="text-white fs-4" scope='col' >Quantity</th>
                            <th className="text-white fs-4" scope='col' >Option</th>
                            <th className="text-white fs-4" scope='col' >Amount</th>
                            <th className="text-white fs-4" scope='col' ></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <td className="text-white fs-6" scope='row'>{index + 1}</td>
                                <td className="text-white fs-6">{food.name}</td>
                                <td className="text-white fs-6">{food.qty}</td>
                                <td className="text-white fs-6">{food.size}</td>
                                <td className="text-white fs-6">{food.price}</td>
                                <td className="text-white fs-6"><button type='button' className="btn p-0" style={{ color: 'white' }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><Icons.Trash size={20} /></button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div className='text-white fs-5' style={{ fontWeight: 'bolder' }}>
                    Total Price:{totalPrice}/-
                </div>
                <div>
                    <button className="btn bg-danger mt-5" style={{ color: "white", fontWeight: "bolder" }} onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
