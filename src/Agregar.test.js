import { render, screen, fireEvent } from '@testing-library/react';
import Agregar from './Agregar';


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useLocation: () => ({
    pathname: 'http://localhost:3000/'
  })    
}));


describe("<Agregar />", () => {
 
    
    test("Prueba: Agregar libro datos incompletos", () => 
    { 
        const { container } = render(<Agregar />);

        const txtId = container.querySelector(`input[name="txtId"]`);        
        const txtNombre = container.querySelector(`input[name="txtNombre"]`);
        const txtExistencia = container.querySelector(`input[name="txtExistencia"]`);
        const btnGuardar = screen.getByText(/Guardar/i);   
        
        expect(txtId).toBeInTheDocument();
        expect(txtNombre).toBeInTheDocument();
        expect(txtExistencia).toBeInTheDocument();
        expect(btnGuardar).toBeInTheDocument();
        
        fireEvent.change(txtId, { target: { value: "11"}  });     
        fireEvent.click(btnGuardar);        
    });
    

    test("Prueba: Agregar libro datos completos", () => 
    {         
        //render(<Agregar />);
        const { container } = render(<Agregar />);

        //const txtNombre = screen.getByRole('text');
        const txtId = container.querySelector(`input[name="txtId"]`);        
        const txtNombre = container.querySelector(`input[name="txtNombre"]`);
        const txtExistencia = container.querySelector(`input[name="txtExistencia"]`);
        const btnGuardar = screen.getByText(/Guardar/i);   
        
        expect(txtId).toBeInTheDocument();
        expect(txtNombre).toBeInTheDocument();
        expect(txtExistencia).toBeInTheDocument();
        expect(btnGuardar).toBeInTheDocument();
        
        fireEvent.change(txtId, { target: { value: "14"}  });
        fireEvent.change(txtNombre, { target: { value: "Nuevo Libro"}  });
        fireEvent.change(txtExistencia, { target: { value: "5"}  });
        fireEvent.click(btnGuardar);            
    });

});