import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export default function Login() 
{
  const {register, handleSubmit, reset, formState: { errors }} = useForm();   
  const [Libros, setLibros] = useState([]);
  const navigate = useNavigate(); 
 
  function cargaSesion() 
  {
    //alert("cargaSesion.");
    reset({
      txtUsuario: "admin",
      txtPassword: "123"
    });
  }

  function dameURL()
  {
    var lsPath = process.env.REACT_APP_NODE_ENV === '1' ? process.env.REACT_APP_SERVER_TEST : process.env.REACT_APP_SERVER;
    return lsPath;
  }
 
  useEffect(() => 
  { 
    //alert("useEffect. ");
    cargaSesion();    
  }, []);  


  function OnSubmit(data)
  {   
      //alert("OnSubmit. ");    
      if(validateForm(data)===true)
      {  
        IniciarSesion(data);            
      }     
  }

  function validateForm(data)
  {
      if(data.txtUsuario==='' || data.txtUsuario === undefined)    
      {
          alert("¡ Usuario necesario !");
          return false;
      }
      else if(data.txtPassword==='' || data.txtPassword === undefined)    
      {          
          alert("¡ Contraseña necesaria !");
          return false;
      }   
      
      return true;
  }

  function IniciarSesion(data)
  {
    //alert('IniciarSesion.');    
    axios.post(dameURL() + `Usuarios/UsuarioLogin`, { username: data.txtUsuario, password: data.txtPassword })
    .then(res => 
    {
      //alert(res.data);
      if(res.data.error == 2)
      {
        alert("Error: " + res.data.mensaje); 
        //limpiarFormulario();
      }
      else
      {        
        navigate("/");
      }
    });       
  }

  function limpiarFormulario()
  {
    reset({
      txtUsuario: "",
      txtPassword: ""
    });
  }  

  function onCancel()
  {
    //alert('onCancel: ');    
    navigate("/");    
  }  

  return (
    
    <React.Fragment>
      
      <h3> Inicio de Sesión </h3>

      <form>
        <label>
            Usuario: <input type="text" name="txtUsuario" {...register("txtUsuario")} />
          </label> <br></br>
          <label>
            Contraseña: <input type="password" name="txtPassword" {...register("txtPassword")} />
          </label>
          
          <br/><br/>

          <button onClick={handleSubmit(onCancel)}> Cancelar </button>
          <button onClick={handleSubmit(OnSubmit)}> Entrar </button>

          <br/><br/>

        </form>

    </React.Fragment>
  )
  
}