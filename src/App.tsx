
import "./App.css";
import router from './router';
import {RouterProvider} from 'react-router'


function App() {
  
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
