import './register.scss'
import { Link } from 'react-router-dom'

function Register() {
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
              <input type="text" placeholder='Username' />
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <input type="password" placeholder='Confirm Password' />
              <button>Register</button>
              </form>
        </div>
      </div>
    </div>
  )
}

export default Register