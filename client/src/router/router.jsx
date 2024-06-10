import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layout/LayoutPublic";
import Home from '../pages/Home';
import Products from '../pages/Products';
import Update from '../pages/Update';

const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPublic />,
      children: [
        {
          index: true,
          element: <Home />, 
        },
        {
          path: '/products',
          element: <Products/>
        }, 
        {
          path:'/update/:id',
          element: <Update/>
        }
      ]
    },
]);
  
export default router;