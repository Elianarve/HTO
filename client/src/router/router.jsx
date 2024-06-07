import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layout/LayoutPublic";
import Home from '../pages/Home';
import Products from '../pages/Products';

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
        }
      ]
    },
]);
  
export default router;