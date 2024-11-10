import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import UserContext from '../UserContext';
import {logout} from '../api/user';
const Header = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await logout();
            console.log(res);
            if(res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.message);
                setUser(null);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ms-auto">
                        {!user ? 
                        (<>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/login">Login</Link>
                            </li>
                        </>) : 
                        (<>
                            <li className="nav-item">
                                <span 
                                    className="nav-link active" 
                                    style={{cursor: "pointer"}}
                                    onClick={handleLogout}
                                >Logout</span>
                            </li>
                        </>)
                        }
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    );
};

export default Header;