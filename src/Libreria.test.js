import { render, screen, fireEvent } from '@testing-library/react';
import Libreria from './Libreria';


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));


describe("<Libreria />", () => {
 
     test("Testeo de elementos", () => {
 
        render(<Libreria />);
        
        //const libro1 = screen.getByText(/Lo Que El Viento Se Llevo/i); 
        //const libro2 = screen.getByText(/Don Quijote de la Mancha/i); 
        //const libro3 = screen.getByText(/Padre Rico, Padre Pobre/i); 

        const btnIniciar = screen.getByText(/Iniciar/i);    
        const btnAgregar = screen.getByText(/Agregar/i);        
                
        // expect(libro1).toBeInTheDocument();
        // expect(libro2).toBeInTheDocument();
        // expect(libro3).toBeInTheDocument();

        expect(btnIniciar).toBeInTheDocument();
        expect(btnAgregar).toBeInTheDocument();

        fireEvent.click(btnAgregar);
        
    });

});