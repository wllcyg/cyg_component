import ReactDOM from 'react-dom/client'
import route from "@/router";
import {RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={route}/>
)
