import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Libreria = ()  => 
{
  const { handleSubmit } = useForm();   
  const [Libros, setLibros] = useState([]);
  const [Sesion, setSesion] = useState({});
  const navigate = useNavigate(); 

  var isLoad = 0;

  useEffect(() => 
  { 
    //alert("useEffect. ");
    if(isLoad === 0){ CargarSesion(); }
  }, []);  

  const CargarSesion = () =>
  {
      //alert('CargarSesion ! ');      
      isLoad = 1;

      var loUsuario = JSON.parse(localStorage.getItem('usuario'));
      if (loUsuario) 
      {
        //alert('loUsuario | username ' + loUsuario.username + ' - password: ' + loUsuario.password + " - isLogin: " + loUsuario.isLogin);
        setSesion(loUsuario);   
        //alert("loUsuario | isLogin: " + Sesion.isLogin);             
      }

      llenaLibros();
  }

  const llenaLibros = () => 
  {
    //alert("llenaLibros. ");
    axios.get(dameURL() + `Libro`)
    .then(res => 
    {
        //alert("Libro: " + libros.length);        
        setLibros(res.data);
    })
    .catch((error) => 
    {
        alert(error.message);
    });
  }

  const dameURL = () =>
  {
    var lsPath = process.env.REACT_APP_NODE_ENV === '1' ? process.env.REACT_APP_SERVER_TEST : process.env.REACT_APP_SERVER;
    return lsPath;
  }

  const onDelete = (data, event) =>
  { 
    //alert('onDelete | ' + event.target.getAttribute('id'));
    var liId = event.target.getAttribute('id');
    
    axios.delete(dameURL() + `Libro/${liId}`)
    .then(res => 
    {
      if(res.data.error === 2)
      {
        alert("Error: " + res.data.mensaje); 
      }
      else
      {
        llenaLibros();        
      }
    })
    .catch((error) => 
    {
        alert(error.message);
    });    
  }

  const onRefresh = () => 
  {
    //alert('onRefresh: ');
    llenaLibros();
  } 

  const onLogin = () => 
  {
    //alert('onLogin.');
    navigate('/login');  
  } 

  const onAgregar = (data, event) =>
  {    
    //alert('onAgregar.');    
    navigate('/agregar', { state: { edit:false } } );
  } 

  const onEditar = (data, event) => 
  {
    //alert('onEditar | ' + event.target.getAttribute('id'));
    var liId = event.target.getAttribute('id');    
    navigate('/agregar', { state: { edit:true, id: liId } } );
  } 

  const onPrestar = (data, event) =>
  {    
    LibroExistencia(1, data, event);
  } 

  const onRegresar = (data, event) => 
  {    
    LibroExistencia(2, data, event);
  } 

  const LibroExistencia = (tipo, data, event) => 
  {    
    var liId = parseInt(event.target.getAttribute('id'));
    var lsNombre = event.target.getAttribute('nombre');
    var liExistencia = parseInt(event.target.getAttribute('existencia'));
    var liPrestado = parseInt(event.target.getAttribute('prestado'));

    var liActualizar = 0;
    
    if(tipo===1)
    {
      var liCuenta = liPrestado + 1;
      if(liCuenta <= liExistencia ){ liPrestado++; liActualizar = 1; }
      else{ alert("No hay existencia del libro: " + lsNombre); }
    }
    else
    {
      var liCuenta = liPrestado - 1;
      if(liCuenta >= 0){ liPrestado--; liActualizar = 1; }
      else{ alert("Libros completos del libro: " + lsNombre); }
    }

    //alert('LibroExistencia | liCuenta: ' + liCuenta + ' - existencia: ' + liExistencia);
    //alert('LibroExistencia | tipo: ' + tipo + ' - id: ' + liId + ' - nombre: ' + lsNombre + ' - existencia: ' + liExistencia + ' - Prestado: ' + liPrestado);
    
    if(liActualizar === 1)
    {
      axios.put(dameURL() + `Libro/${liId}`, { id: liId, nombre: lsNombre, existencia: liExistencia, prestado: liPrestado })
      .then(res => 
      {       
        //console.log(res.data);
        if(res.data.error === 2)
        {
          alert("Error: " + res.data.mensaje); 
          //limpiarFormulario();
        }
        else
        {        
          llenaLibros();
        }
      });     
    }    
  } 

  const onCerrar = () => 
  {
    //alert('onCerrar.');
    //localStorage.removeItem('usuario');
    var loUsuario = { username: "",  password: "", nombre: "", isLogin: false };
    localStorage.setItem('usuario', JSON.stringify(loUsuario));  
    setSesion(loUsuario);   
    navigate("/");
  } 

  return (
    
    <React.Fragment>
     
      <form>         

          <div class="botones">
            
            <center> <text class="titulo"> Libreria "Potosinos" </text> </center>

            <text class="txtNombre"> {Sesion.isLogin === true ? ("<" + Sesion.nombre + ">") : ""}  </text>
            <button class="btnIniciar" onClick={handleSubmit(onCerrar)} hidden={!Sesion.isLogin}> Salir </button>
            <button class="btnIniciar" onClick={handleSubmit(onLogin)} hidden={Sesion.isLogin}> Iniciar </button>
            <button class="btnAgregar" onClick={handleSubmit(onAgregar)}> Agregar </button> 
            {/*  <button class="btnRecargar" onClick={handleSubmit(onRefresh)}> Recargar </button> */}
          </div>
                
          <table class="tablaPrincipal">          
            <tr> <th width="10%"> Id </th> <th width="45%"> Libro </th> <th width="10%"> Cant </th> <th width="30%"> Acciones </th> </tr>                                
            { 
               Libros.map(libro => 
               <tr> 
                <td class="colCentrar"> {libro.id} </td> 
                <td> {libro.nombre} </td> 
                <td class="colCentrar"> {libro.existencia - libro.prestado} </td> 
                <td class="colBotones">  
                  <button class="btnPrestar" id={libro.id} nombre={libro.nombre} existencia={libro.existencia} prestado={libro.prestado} hidden={!Sesion.isLogin} onClick={handleSubmit(onPrestar)}> Prestar </button>
                  <button class="btnRegresar" id={libro.id} nombre={libro.nombre} existencia={libro.existencia} prestado={libro.prestado} hidden={!Sesion.isLogin} onClick={handleSubmit(onRegresar)}> Regresar </button>
                  <button class="btnEditar" id={libro.id} onClick={handleSubmit(onEditar)}> Editar </button> 
                  <button class="btnBorrar" id={libro.id} onClick={handleSubmit(onDelete)}> Borrar </button> 
                </td>
              </tr> ) } 
          </table>

        </form>

    </React.Fragment>
  );
  
};

export default Libreria;