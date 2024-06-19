
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));


describe("<Login />", () => {

    test("testeo de elementos", () => {
        
        render(<Login />);
        const txtUsuario = screen.getByText(/Usuario:/i);
        const txtPassword = screen.getByText(/Contrasena:/i);
        const btnEntrar = screen.getByText(/Entrar/i);
        
        expect(txtUsuario).toBeInTheDocument();
        expect(txtPassword).toBeInTheDocument();
        expect(btnEntrar).toBeInTheDocument();
    });

    test("testeo de login sin datos", () => 
    {   
        const { container } = render(<Login />);
        
        const txtUsuario = container.querySelector(`input[name="txtUsuario"]`);  
        const txtPassword = container.querySelector(`input[name="txtPassword"]`);  
        const btnEntrar = screen.getByText(/Entrar/i);        

        expect(txtUsuario).toBeInTheDocument();
        expect(txtPassword).toBeInTheDocument();
        expect(btnEntrar).toBeInTheDocument();

        fireEvent.change(txtUsuario, { target: { value: ""}  });
        fireEvent.change(txtPassword, { target: { value: ""}  });
        fireEvent.click(btnEntrar);        
    });

    test("testeo de login con datos", () => 
    {        
        //render(<Login />);
        const { container } = render(<Login />);
        
        const txtUsuario = container.querySelector(`input[name="txtUsuario"]`);  
        const txtPassword = container.querySelector(`input[name="txtPassword"]`);  
        const btnEntrar = screen.getByText(/Entrar/i);        

        expect(txtUsuario).toBeInTheDocument();
        expect(txtPassword).toBeInTheDocument();
        expect(btnEntrar).toBeInTheDocument();

        fireEvent.change(txtUsuario, { target: { value: "admin"}  });
        fireEvent.change(txtPassword, { target: { value: "123"}  });
        fireEvent.click(btnEntrar);        
    });

})