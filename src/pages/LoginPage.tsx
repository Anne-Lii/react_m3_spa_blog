import './LoginPage.css'
import '../App.css'

import { useState } from "react"
import { useAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react"; //import icons for showing password

const LoginPage = () => {

  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, SetLoading] = useState(false);

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    SetLoading(true);//Loading...

    try {
      
      await login({email, password});
      navigate('/admin');
        
    } catch (error) {
      setError('Inloggning misslyckades, kontrollera email och lösenord')
    }finally {
      SetLoading(false);//stop loading
    }
  }

  return (
    <div className="container_login">
      <div className="login_inputs">

        <h1>Logga in</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}

            </div>
          )}

          <div className="forminput">

            <label htmlFor="email">E-postadress:</label>
            <br></br>
            <input 
              type="email" 
              id="email" 
              required value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            /><br></br>

            {/*Password with button to show/hide password */}
            <label htmlFor="password">Lösenord:</label>
        
            <div className="password-inputfield">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                required value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
           
            <button type="submit" className="login_btn" disabled={isLoading}>
              {isLoading ? <Loader2 className="spin" /> : "Logga in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
