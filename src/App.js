//Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Style 
import './style/App.css';
//Components: 
import ContentWrap from './components/contentWrap';
import ProtectedRoute from './components/routes/protectedRoute';
import Home from './components/routes/home';
import Land from './components/routes/land';
import Cart from './components/routes/cart';
import Profile from './components/routes/profile';

// ----------------------------DEV
import { useSelector } from 'react-redux';


const router = createBrowserRouter(
  [
    {path: '/', element: <ContentWrap/>, 
    // errorElement: <Error/>,
    children: [
      {path: '/', element: <Home/>},
      {path: '/auth', element: <Land/>},
      {path: '/cart', element: <Cart/> },
      {path: '/profile', element: <ProtectedRoute><Profile/></ProtectedRoute> },
      // {path: '/products/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute> }
    ]}
  ]
);

function App() {
  // ----------------------------DEV
  const STATE = useSelector((state) => state);
  console.log("-------REDUX:", STATE);


  //Create space in local storage 
  if(!localStorage.getItem("Marketfy_ActiveUser")){
    localStorage.setItem("Marketfy_ActiveUser", false);
  }


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
