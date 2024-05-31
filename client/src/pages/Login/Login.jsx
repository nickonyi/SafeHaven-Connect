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
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste earum, numquam, dignissimos, consectetur aspernatur aliquid debitis itaque quod consequatur at quia tenetur quis ipsam! Aut dolorem odio numquam hic magni!</p>
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