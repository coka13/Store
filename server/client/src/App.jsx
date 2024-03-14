import HomePage from "./pages/Home/HomePage"
import {Route,Routes} from "react-router-dom"
import Cart from "./pages/Cart/Cart"
import SingleItem from "./pages/SingleItem/SingleItem"
import NotFound from "./pages/NotFound/NotFound"
import Admin from "./pages/Admin/Admin"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"





function App() {
  return(
    <>
    
  <Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path="cart" element={<Cart />} />
  <Route path="items/:itemID" element={<SingleItem />} />
  <Route path="admin" element={<Admin />} />
  <Route path="register" element ={<Register/>}/>
  <Route path="login" element ={<Login/>}/>
  <Route path="*" element={<NotFound />} /> 
</Routes>
</>
  )
}

export default App
