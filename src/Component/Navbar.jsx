import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart, useDispatchCart } from '../Component/ContextReducer'

const Navbar = () => {

    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    let data = useCart();
    let dispatch = useDispatchCart();

    const handleLogout = () => {
        localStorage.removeItem('authoToken');
        navigate('/');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-4 fst-italic" style={{ fontFamily: 'fantasy', padding: '10px', border: '5px white solid', borderRadius: '50px 0' }} to="/">Foodies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5 fw-bolder" aria-current="page" to="/">Home</Link>
                            </li>

                            {
                                (localStorage.getItem("authoToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5 fw-bolder" aria-current="page" to="/myOrders">My Orders</Link>
                                    </li> : ""
                            }
                        </ul>
                        {
                            (!localStorage.getItem("authoToken")) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success fw-bolder mx-1" to="/Login">Login</Link>
                                    <Link className="btn bg-white text-success fw-bolder mx-1" to="/Signup">Signup</Link>
                                </div>
                                : <div>
                                    <div className="btn bg-white text-success fw-bolder mx-2" onClick={() => setCartView(true)}>
                                        My Cart &nbsp;<Badge pill bg="danger" >{data.length}</Badge>
                                    </div>
                                    {
                                        cartView ? <Modal onClose={() => setCartView(false)} ><Cart /></Modal> : null
                                    }
                                    <div className="btn bg-danger text-white fw-bolder mx-2" onClick={handleLogout}>Logout</div>
                                </div>
                        }
                    </div>
                </div>
            </nav>

            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Link</Link>
                            </li>
                            
                        </ul>
                        
                    </div>
                </div>
            </nav> */}
        </div>
    )
}

export default Navbar
