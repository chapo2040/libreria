import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Libreria() 
{
  const {register, handleSubmit, reset, formState: { errors }} = useForm();   
  const [Libros, setLibros] = useState([]);
  const navigate = useNavigate(); 
 
  function llenaLibros() 
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

  function dameURL()
  {
    var lsPath = process.env.REACT_APP_NODE_ENV === '1' ? process.env.REACT_APP_SERVER_TEST : process.env.REACT_APP_SERVER;
    return lsPath;
  }
 
  useEffect(() => 
  { 
    //alert("useEffect. ");
    llenaLibros();    
  }, []);  


  function onDelete(data, event)
  { 
    //alert('onDelete | ' + event.target.getAttribute('id'));
    var liId = event.target.getAttribute('id');
    
    axios.delete(dameURL() + `Libro/${liId}`)
    .then(res => 
    {
      if(res.data.error == 2)
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

  function onRefresh() 
  {
    //alert('onRefresh: ');
    llenaLibros();
  } 

  function onLogin() 
  {
    //alert('onLogin.');
    navigate('/login');  
  } 

  function onAgregar(data, event) 
  {    
    //alert('onAgregar.');
    //navigate('/agregar');
    navigate('/agregar', { state: { edit:false } } );
  } 

  function onEditar(data, event) 
  {
    //alert('onEditar | ' + event.target.getAttribute('id'));
    var liId = event.target.getAttribute('id');
    //navigate('/agregar');  
    navigate('/agregar', { state: { edit:true, id: liId } } );
  } 

  function onPrestar(data, event) 
  {    
    LibroExistencia(1, data, event);
  } 

  function onRegresar(data, event) 
  {    
    LibroExistencia(2, data, event);
  } 

  function LibroExistencia(tipo, data, event) 
  {    
    var liId = event.target.getAttribute('id');
    var lsNombre = event.target.getAttribute('nombre');
    var liExistencia = event.target.getAttribute('existencia');
    var liPrestado = event.target.getAttribute('prestado');

    var liActualizar = 0;
    
    if(tipo==1)
    {
      if(liPrestado + 1 <= liExistencia ){ liPrestado++; liActualizar = 1; }
      else{ alert("No hay existencia del libro: " + lsNombre); }
    }
    else
    {
      if(liPrestado - 1 >= 0){ liPrestado--; liActualizar = 1; }
      else{ alert("Libros completos del libro: " + lsNombre); }
    }

    //alert('LibroExistencia | tipo: ' + tipo + ' - id: ' + liId + " - nombre: " + lsNombre + " - existencia: " + liExistencia + " - Prestado: " + liPrestado);
    
    if(liActualizar == 1)
    {
      axios.put(dameURL() + `Libro/${liId}`, { id: liId, nombre: lsNombre, existencia: liExistencia, prestado: liPrestado })
      .then(res => 
      {       
        //console.log(res.data);
        if(res.data.error == 2)
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

  return (
    
    <React.Fragment>
     
      <form>         

          <div class="botones">
            
            <center> <text class="titulo"> Libreria "Potosinos" </text> </center>

            <button class="btnIniciar" onClick={handleSubmit(onLogin)}> Iniciar </button> 
            <button class="btnAgregar" onClick={handleSubmit(onAgregar)}> Agregar </button> 
            {/*  <button class="btnRecargar" onClick={handleSubmit(onRefresh)}> Recargar </button> */}
          </div>
                
          <table class="tablaPrincipal">          
            <tr> <th width="10%"> Id </th> <th width="45%"> Libro </th> <th width="10%"> Cant </th> <th width="30%"> Acciones </th> </tr>                                
            { 
               Libros.map(libro => 
               <tr> 
                <td> {libro.id} </td> 
                <td> {libro.nombre} </td> 
                <td> {libro.existencia - libro.prestado} </td> 
                <td> 
                  {/* <button class="btnPrestar" id={libro.id} nombre={libro.nombre} existencia={libro.existencia} prestado={libro.prestado} onClick={handleSubmit(onPrestar)}> Prestar </button> */}
                  {/* <button class="btnRegresar" id={libro.id} nombre={libro.nombre} existencia={libro.existencia} prestado={libro.prestado} onClick={handleSubmit(onRegresar)}> Regresar </button> */}
                  <button class="btnEditar" id={libro.id} onClick={handleSubmit(onEditar)}> Editar </button> 
                  <button class="btnBorrar" id={libro.id} onClick={handleSubmit(onDelete)}> Borrar </button> 
                </td>
              </tr> ) } 
          </table>

        </form>

    </React.Fragment>
  )
  
}