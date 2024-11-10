import React, {useContext} from 'react';
import UserContext from '../UserContext';
const Home = () => {
    const {user} = useContext(UserContext);
    return (
        <div className='container text-center' style={{marginTop: "12rem"}}>
            <div className='alert alert-primary'>
                <h1>{
                    user ?
                    (<>
                        <span className="test-success">
                            Welcome {user.username}!
                        </span>
                    </>) : (<>
                        <span>
                            Welcome to our site!
                        </span>
                    </>)
                }</h1>
            </div>
        </div>
    );
};

export default Home;