import { useContext, useState } from 'react';
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


function Login() {

  const [inputs, setInputs] = useState({username: "", password: ""});
  const [error,setError] = useState(null);
  const {login} = useContext(AuthContext);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev)=> ({...prev,[e.target.name]:e.target.value}));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate('/');
    } catch (error) {
        setError(error.response.data)
    }
   
    
  }
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>SafeHaven Connect</h1>
          <p>Join our community and take the first step towards recovery with the support of your peers. Whether you're here to seek help, offer support, or educate yourself, we're here to provide a safe, anonymous, and supportive environment.</p>
           <span>Don't you have an account?</span>
           <Link to="/Register">
           <button>Register</button>
           </Link>
        </div>
        <div className="right">
           <h1>Login</h1>
            <form>
              <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
              <input type="password" placeholder='Password' name='password' onChange={handleChange} />
              {error && <span style={{color:'red'}}>{error}</span>}
              <button onClick={handleLogin}>Login</button>
              </form>
        </div>
      </div>
    </div>
  )
}

export default Login