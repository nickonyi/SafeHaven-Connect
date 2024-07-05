import 'Vertical.scss'
import { AuthContext } from "./context/AuthContext";
import { useContext } from 'react';

function Vertical() {
   const {user} = useContext(AuthContext);

  return (
    <div>
      { user && <div>Vertical</div>}
    </div>
  )
}

export default Vertical