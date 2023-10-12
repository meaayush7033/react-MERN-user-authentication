import React, { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../App";

function Logout() {
  // eslint-disable-next-line
  const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await fetch("/signout", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials:"include"
              });

              if(res.status === 200){
                dispatch({type:"USER", payload:false})
                navigate("/");
              }
              else{
                navigate("/");
              }
            
        } catch (error) {
            navigate("/");
        }

    }

    useEffect(() => {
        logout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);


  return (
    <div>
      
    </div>
  )
}

export default Logout
