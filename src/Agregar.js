import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

const Agregar = () =>
{
  const {register, handleSubmit, reset} = useForm();   
  const navigate = useNavigate(); 
  const {state} = useLocation();

  const [Titulo, setTitulo] = useState("Agregar");
  const [isEdit, setEdit] = useState(false);
  
  var isLoad = 0;

  useEffect(() => 
  { 
    //alert("useEffect. ");
    if(isLoad === 0 && state != null){ buscaLibro(); }
  }, []);  


  const buscaLibro = () =>
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
          txtNombre: res.data.nombre,
          txtExistencia: res.data.existencia            
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

  const dameURL = () =>
  {
    var lsPath = process.env.REACT_APP_NODE_ENV === '1' ? process.env.REACT_APP_SERVER_TEST : process.env.REACT_APP_SERVER;
    return lsPath;
  }

  const limpiarFormulario = () =>
  {
      reset({
        txtId: "",
        txtNombre: "",
        txtExistencia: ""
    });
  }  

  const OnSubmit = (data) =>
  {   
      //alert("OnSubmit. ");    
      if(validateForm(data)===true)
      {  
          if(!isEdit){ agregarLibro(data); }
          else{ editarLibro(data); }
      }     
  }

  const validateForm = (data) =>
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

  const agregarLibro = (data) =>
  {
    // alert('agregarLibro.');    
    
    axios.post(dameURL() + `Libro`, { id: data.txtId, nombre: data.txtNombre, existencia: data.txtExistencia, prestado: 0 })
    .then(res => 
    {
      //alert(res.data);
      if(res.data.error === 2)
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
  
  const editarLibro = (data) =>
  {
    // alert('editarLibro.');    
    
    if(validateForm(data)===true)
    {  
      axios.put(dameURL() + `Libro/${data.txtId}`, { id: data.txtId, nombre: data.txtNombre, existencia: data.txtExistencia, prestado: 0 })
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
          navigate("/");
        }
      });    
    }    
  }  

  const onCancel = () =>
  {
    //alert('onCancel: ');    
    navigate("/");    
  }  

  return (
    
    <React.Fragment>
      
    <div class='pnlAgregar'>

      <form>
  
        <center> <text class="titulo"> Libreria "Potosinos" </text> </center> <br/> <br/>

        <table>
        <tr> <th colSpan={2} class="cabecera"> {Titulo} Libro </th> </tr>
        <tr> <td class="renglon"> Libro Id </td> <td class="renglon"> <input type="text" name="txtId" disabled={isEdit} {...register("txtId")} /></td> </tr>
        <tr> <td class="renglon"> Nombre: </td> <td class="renglon"> <input type="text" name="txtNombre" {...register("txtNombre")} /> </td> </tr>
        <tr> <td class="renglon"> Existencia: </td> <td class="renglon"> <input type="text" name="txtExistencia" {...register("txtExistencia")} />  </td> </tr>
        <tr> <td colSpan={2} class="renglonBotones">         
          <button class="boton" onClick={handleSubmit(onCancel)}> Cancelar </button>
          <button class="boton" onClick={handleSubmit(OnSubmit)}> Guardar </button>                  
        </td> </tr>
        </table>

      </form>
    
    </div>

    </React.Fragment>
  );
  
};

export default Agregar;