import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export default function Login() 
{
  const {register, handleSubmit, reset, formState: { errors }} = useForm();   
  const [Libros, setLibros] = useState([]);
  const navigate = useNavigate(); 
 
  function cargarSesion() 
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
    cargarSesion();
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
        var loUsuario = 
        {           
            username: res.data.usuario.username,
            password: res.data.usuario.password,
            nombre: res.data.usuario.nombre,
            isLogin: true
        };

        localStorage.setItem('usuario', JSON.stringify(loUsuario));     
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

    <div class='pnlLogin'>

      <form>

        <center> <text class="titulo"> Libreria "Potosinos" </text> </center> <br/> <br/>

        <table>
        <tr> <th colSpan={2} class="cabecera" >  Inicio de Sesión </th> </tr>
        <tr> <td class="renglon"> Usuario: </td> <td class="renglon"> <input type="text" name="txtUsuario" {...register("txtUsuario")} /> </td> </tr>
        <tr> <td class="renglon"> Contrasena: </td> <td class="renglon"> <input type="password" name="txtPassword" {...register("txtPassword")} /> </td> </tr>
        <tr> <td colSpan={2} class="renglonBotones"> 
          <center>
            <button class="boton" onClick={handleSubmit(onCancel)}> Cancelar </button>
            <button class="boton" onClick={handleSubmit(OnSubmit)}> Entrar </button>          
          </center>
        </td> </tr>
        </table>

      </form>
    
    </div>  

    </React.Fragment>
  )
  
}