import { Route,Switch, BrowserRouter,Redirect } from "react-router-dom"
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import { useAuthcontext } from "./hooks/useauthcontext";
function App() {

const {authIsready,user} = useAuthcontext()


  return (
    <div className="App">
{!authIsready &&(

<BrowserRouter>
<Navbar />
<Switch>
<Route exact path='/'>
{!user && <Redirect to='/login' />}
 {user && <Home/>}
</Route>
<Route path='/login'>
{user && <Redirect to ='/' />}
 {!user && <Login/>}
</Route>
<Route path='/signup'>
{user && <Redirect to ='/' />}
 {!user && <Signup/>}
</Route>
</Switch>
</BrowserRouter>
)}
    </div>
  );
}

export default App
