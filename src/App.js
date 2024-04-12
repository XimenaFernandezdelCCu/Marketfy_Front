//Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Style 
import './style/App.css';
// Redux
import { useSelector } from 'react-redux';
//Components: 
import ContentWrap from './components/contentWrap';
import ProtectedRoute from './components/routes/protectedRoute';
import Home from './components/routes/home';
import Auth from './components/routes/auth';
import Sales from './components/routes/sales';
import Profile from './components/routes/profile';
import ProfileDetails from './components/routes/profileDetails';
import ProfileEdit from './components/routes/profileEdit';
import ProfileWishlist from './components/routes/profileWishlist';
import ProfileOrders from './components/routes/profileOrders';
import LoginForm from './components/small/LoginForm';
import SignupForm from './components/small/SignupForm';
import ExtraDetailsForm from './components/small/extraDetailsForm';


const router = createBrowserRouter(
  [
    {path: '/', element: <ContentWrap/>, 
    // errorElement: <Error/>,
    children: [
      {path: '/', element: <Home/>},
      {path: '/auth', element: <Auth/>, 
        children: [
          {path: '/auth/', element: <LoginForm/>},
          {path: '/auth/signup', element: <SignupForm/>},
          {path: '/auth/extraDetails', element: <ExtraDetailsForm/>}
        ]},
      {path: '/cart', element: <Sales/> },
      {path: '/profile', element: <ProtectedRoute><Profile/></ProtectedRoute>,
        children: [
          {path: '/profile/', element: <ProfileDetails/>},
          {path: '/profile/edit', element: <ProfileEdit/>},
          {path: '/profile/wishlist', element: <ProfileWishlist/> },
          {path: '/profile/orders', element: <ProfileOrders/> },
        ]},
      // {path: '/products/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute> }
    ]}
  ]
);

function App() {
  //Create space in local storage 
  if(!localStorage.getItem("Marketfy_ActiveUser")){
    localStorage.setItem("Marketfy_ActiveUser", false);
  }

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
