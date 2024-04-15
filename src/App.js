//Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
// Style 
import './style/App.css';

//Components: 
import ContentWrap from './components/contentWrap';
import ProtectedRoute from './components/routes/protectedRoute';
import Loader from './components/reusable/loader';
// Lazy load components
const Home = lazy(() => import('./components/routes/home'));
const Auth = lazy(() => import('./components/routes/auth'));
const LoginForm = lazy(() => import('./components/small/LoginForm'));
const SignupForm = lazy(() => import('./components/small/SignupForm'));
const ExtraDetailsForm = lazy(() => import('./components/small/extraDetailsForm'));
const Sales = lazy(() => import('./components/routes/sales'));
const Profile = lazy(() => import('./components/routes/profile'));
const ProfileDetails = lazy(() => import('./components/routes/profileDetails'));
const ProfileEdit = lazy(() => import('./components/routes/profileEdit'));
const ProfileWishlist = lazy(() => import('./components/routes/profileWishlist'));
const ProfileOrders = lazy(() => import('./components/routes/profileOrders'));
const ProductView = lazy(()=> import('./components/routes/productView'))


const router = createBrowserRouter(
  [
    {path: '/', element: <ContentWrap/>, 
    // errorElement: <Error/>,
    children: [
      {path: '/', element:<Suspense fallback={<Loader/>} ><Home/></Suspense> },
      {path:'/products/:id', element: <Suspense fallback={<Loader/>}><ProductView/></Suspense>},
      {path: '/auth', element: <Suspense fallback={<Loader/>}><Auth/></Suspense> , 
        children: [
          {path: '/auth/', element: <Suspense fallback={<Loader/>}><LoginForm/></Suspense> },
          {path: '/auth/signup', element:<Suspense fallback={<Loader/>}><SignupForm/></Suspense> },
          {path: '/auth/extraDetails', element:<Suspense fallback={<Loader/>}><ExtraDetailsForm/></Suspense> }
        ]},
      {path: '/cart', element:<Suspense fallback={<Loader/>}><Sales/></Suspense>  },
      {path: '/profile', element: <Suspense fallback={<Loader/>}><ProtectedRoute><Profile/></ProtectedRoute></Suspense> ,
        children: [
          {path: '/profile/', element: <Suspense fallback={<Loader/>}><ProfileDetails/></Suspense> },
          {path: '/profile/edit', element:<Suspense fallback={<Loader/>}><ProfileEdit/></Suspense> },
          {path: '/profile/wishlist', element:<Suspense fallback={<Loader/>}><ProfileWishlist/></Suspense>  },
          {path: '/profile/orders', element:<Suspense fallback={<Loader/>}><ProfileOrders/> </Suspense> },
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