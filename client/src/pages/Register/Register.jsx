import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Register() {

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInput(prevState=> ({...prevState,[e.target.name]: e.target.value}));
  }

  const navigate = useNavigate();

  const handleClick = async (e) => {      
    e.preventDefault();
    try {
      await axios.post('//localhost:8800/api/auth/register', input);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
  }
}
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>SafeHaven Connect</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste earum, numquam, dignissimos, consectetur aspernatur aliquid debitis itaque quod consequatur at quia tenetur quis ipsam! Aut dolorem odio numquam hic magni!</p>
           <span>Do you have an account?</span>
           <Link to="/Login">
           <button>Login</button>
           </Link>
        </div>
        <div className="right">
           <h1>Register</h1>
            <form>
              <input type="text" placeholder='Username' name='username' onChange={handleChange} />
              <input type="email" placeholder='Email'  name='email' onChange={handleChange} />
              <input type="password" placeholder='Password' name='password' onChange={handleChange} />
              <input type="password" placeholder='Confirm Password'  name='confirmPassword' onChange={handleChange} />
              {error && <p style={{color: 'red'}}>{error}</p>}
              <button onClick={handleClick}>Register</button>
              </form>
        </div>
      </div>
    </div>
  )
}

export default Register