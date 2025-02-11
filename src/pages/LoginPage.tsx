import { useState } from "react"
import { useAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; //import icons for showing password

const LoginPage = () => {

  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');



    try {
      
      await login({email, password});
      navigate('/admin');
        
    } catch (error) {
      setError('Inloggning misslyckades, kontrollera email och lösenord')
    }
  }

  return (
    <div className="container_login">
      <div className="login_inputs">

        <h2>Logga in:</h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}

            </div>
          )}

          <div className="forminput">

            <label htmlFor="email">E-postadress:</label>
            <input 
              type="email" 
              id="email" 
              required value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />

            {/*Password with button to show or not to show password */}
            <label htmlFor="password">Lösenord:</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              required value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button 
              type="button" 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>

            <button type="submit">Logga in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
