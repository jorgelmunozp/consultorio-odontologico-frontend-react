import React from 'react';

// import Inicio from './Inicio';



function Usuario(usuarios,Correo,Contraseña,j,i) {

    return (
      <div className="App">
       <body>  
            <form name="formularioLogin" >
                <label for="email">Email:</label>
                <input id="userLogin" type="text" autocomplete="off"></input>
                <label for="pwd">Password:</label>
                <input id="passwordLogin" type="password" autocomplete="off"></input>
                <th><button onClick={()=>Iniciar(usuarios,Correo,Contraseña,j,i)}>Iniciar</button></th>
                
            </form>
            <th><button onClick={()=>xd(usuarios)}>xd</button></th>
      </body> 
      </div>
    );
  }
 function xd(usuarios){
   console.log(usuarios)
 }

  function Iniciar(usuarios,Correo,Contraseña,user,password,formularioLogin,menu,numero,setNumero, display, setDisplay ) {

    // if(usuarios&&Contraseña===Usuarios){
    // return <Inicio numero={numero} setNumero={setNumero} display={display} setDisplay={setDisplay}/>;
    // }
    
    // console.log(Usuarios);
    // for (let i = 0; i < usuarios.length; i++) {
    //     for (let j = 0; j < usuarios.length; j++) {
    //       console.log("["+i+"]["+j+"]: "+usuarios[i][j]);
    //      if(usuarios[i].usuario.Correo===user.value && usuarios[i].Contraseña===password.value){
    //         if(usuarios[i][j]===user.value && usuarios[i][j+1]===password.value){
    //             formularioLogin.submit();
    //         }else if(usuarios[i][j] !==user.value && usuarios[i][j+1]!==password.value){}
    //      }
    //     }
    //   }
  }
  export default Usuario;