import React, { useState } from 'react'
import logoUmss from '../assets/logoumss.png'
function Home(){
    const [user, setUser] = useState(null);
    return(
     <> 
       
        {(user == null) ? (
            <div className="text-center">
            <h1>Bienvenido</h1>
            <img src={logoUmss}></img>
            </div>
        ):(
            <div className="text-center">
            <h1>Bienvenido al sistema</h1>
            <h2>Revise sus datos personales</h2>
            <img src={logoUmss}></img>
            </div>
        )
       }
     </>
    )
}

export default Home