import React, {useState, useContext, useEffect,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext, UserContext,} from '../../store';
import {getUserByEmail,} from '../../services/api';
import Plus from '../../assets/plus.svg';
import M from 'materialize-css';

import StatementModal from './statementModal';
import StatementCard from './statementCard';

export default props => {
    const [authUser,] = useContext(AuthContext);
    const [userData, setUserData,] = useContext(UserContext);
    // const [, setUserStatements,] = useState([]);
    
    useEffect(_ => {
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
        });

        // if (authUser.user) {
        //     const userData = getUserByEmail(authUser.user.email)
        //         .then(data => {
        //             setUser({userData: data.userData, loaded: true,});
        //             setUserData({userData: data, loaded: true,});
        //             setUserStatements(prevStatements => {
        //                 const {userStatements: userStatementData,} = data;
        //                 for (let statement of userStatementData) prevStatements.unshift(statement);
        //                 return [...prevStatements];
        //             });
        //             setAuthUser(authUser => Object.assign(authUser, {loadedUserData: true,}));
        //         })
        //         .catch(e => new Error(e));
        // };
    }, [authUser.user,]);
    
    const handleStatementClick = statementID => props.history.push(`/statement/${statementID}`);

    const renderHome = _ => {
        if (!authUser.user && authUser.authLoaded) {
            return <Redirect to='/landing' />
        } else if (!authUser.user && !authUser.authLoaded || !userData.userData && !userData.loaded) {
            return <h1>Loading...</h1>
        } else {
            console.log(1, userData)
            // const {userData, statements} = userData;
            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-right mt-4'>
                            {/* <button type="button" className="col-3 text-right waves-effect waves-light modal-trigger" href="#modal1"
                                onClick={toggleModal}>
                                <img src={Plus} alt='plus icon' 
                                    style={{height: 50, width: 50}} className='' />
                            </button> */}
                            <a className="waves-effect waves-light modal-trigger rounded-circle" href="#modal1">
                                <img src={Plus} alt='plus icon' 
                                        style={{height: 50, width: 50}} className='' />
                            </a>
                            <StatementModal user={userData.userData} setUserData={setUserData} />
                        </div>
                    </div>
                    <div className='row'>
                        {
                                userData.statements.length < 1 ?
                                    <div className='col-12' style={{textAlign: '-webkit-center'}}>
                                        <div 
                                            className='col-10 b-rad py-5 n-backg-color l-color app-font font-size-form'>
                                            No statements to render. 
                                            Start controlling your expenses today!
                                        </div>
                                    </div>
                            :
                                userData.statements.map((e, i) => 
                                    <StatementCard userStatement={e} key={i} handleStatementClick={handleStatementClick} />)
                        }
                    </div>
                </div>
            );
        };
    };

    return(
        renderHome()
    );
};