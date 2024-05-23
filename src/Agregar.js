import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export default function Agregar() 
{
  const {register, handleSubmit, reset, formState: { errors }} = useForm();   
  const navigate = useNavigate(); 
  const {state} = useLocation();

  const [Titulo, setTitulo] = useState("Agregar");
  const [isEdit, setEdit] = useState(false);
  
  useEffect(() => 
  { 
    //alert("useEffect. ");
    buscaLibro();
  }, []);  


  function buscaLibro() 
  {
    if(state.edit===true)
    {
      //alert("buscaLibro | id: " + state.id);
      setTitulo("Editar");
      setEdit(true);
      
      axios.get(dameURL() + `Libro/${state.id}`)
      .then(res => 
      {
          //alert("Libro: " + res.data.nombre);     
          reset({
            txtId: res.data.id,
            txtNombre: res.data.nombre            
        });

      })
      .catch((error) => 
      {
          alert(error.message);
      });
      
    }
    else
    {
      limpiarFormulario();
    }
  }

  function dameURL()
  {
    var lsPath = process.env.REACT_APP_NODE_ENV === '1' ? process.env.REACT_APP_SERVER_TEST : process.env.REACT_APP_SERVER;
    return lsPath;
  }

  function limpiarFormulario()
  {
      reset({
        txtId: "",
        txtNombre: ""
    });
  }  

  function OnSubmit(data)
  {   
      //alert("OnSubmit. ");    
      if(validateForm(data)===true)
      {  
          if(!isEdit){ agregarLibro(data); }
          else{ editarLibro(data); }
      }     
  }

  function validateForm(data)
  {
      if(data.txtId==='' || data.txtId === undefined)    
      {
          alert("¡ Identificador necesario !");       
          return false;
      }
      else if(data.txtNombre==='' || data.txtNombre === undefined)    
      {          
          alert("¡ Nombre necesario !");
          return false;
      }   
      
      return true;
  }

  function agregarLibro(data)
  {
    // alert('agregarLibro.');    
    
    axios.post(dameURL() + `Libro`, { id: data.txtId, nombre: data.txtNombre })
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
  
  function editarLibro(data)
  {
    // alert('editarLibro.');    
    
    if(validateForm(data)===true)
    {  
      axios.put(dameURL() + `Libro/${data.txtId}`, { id: data.txtId, nombre: data.txtNombre })
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
          navigate("/");
        }
      });    
    }    
  }  

  function onCancel()
  {
    //alert('onCancel: ');    
    navigate("/");    
  }  

  return (
    
    <React.Fragment>
      
      <h3> {Titulo} </h3>

      <form>
        <label>
            Libro Id: <input type="text" name="txtId" disabled={isEdit} {...register("txtId")} />
          </label> <br></br>
          <label>
            Nombre: <input type="text" name="txtNombre" {...register("txtNombre")} />
          </label>
          
          <br/><br/>

          <button onClick={handleSubmit(onCancel)}> Cancelar </button>
          <button onClick={handleSubmit(OnSubmit)}> Guardar </button>          

        </form>

    </React.Fragment>
  )
  
}