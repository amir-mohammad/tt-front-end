import React,{useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import jwtDecode  from 'jwt-decode';
import {LOGIN_ADMIN,LOGOUT_ADMIN} from './type';

const AuthState = (props) => {
    const initialState = {
        user:null
    }


    const [state,dispatch] = useReducer(authReducer,initialState);

    if(localStorage.getItem('shopJWTToken')){
            const userToken = jwtDecode(localStorage.getItem('shopJWTToken'));
            if(userToken){
                if(userToken.exp * 1000 < Date().now){
                    localStorage.removeItem('shopJWTToken');
                }else{
                       initialState.user = userToken 
                }   
            }
    }

    const login = (userData) => {
        localStorage.setItem('shopJWTToken',userData.token);
        dispatch({
            type:LOGIN_ADMIN,
            payload:userData
        })
    }

    const logout = () => {
        localStorage.removeItem('shopJWTToken');
        dispatch({
            type:LOGOUT_ADMIN

        })
    }


    return(<AuthContext.Provider value={{
        user:state.user,
        login,
        logout
    }}>
        {props.children}
    </AuthContext.Provider>)
}


export default AuthState;