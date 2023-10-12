import React, { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState("");

  const home = async () => {
      const res = await fetch("getuser", {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
  
      const data = await res.json();
  
      if(res.status === 401 ){
        setUser("");
      }else{
        setUser(data)
      }
      
  }

  useEffect(() => {
    home();
  })
  
  
  return (
    <div className="home d-flex container-fluid">
      <div className="m-auto text-center">
      <p className="my-5">WELCOME</p>
      <h1>{user.name}</h1>
      {user?<h1>Happy to see you back</h1>:<h1>We are <span>MERN</span> Developer</h1>}
      
    </div>
    </div>
  );
}

export default Home;
