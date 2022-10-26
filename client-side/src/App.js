import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/client/Home'
import SignUp from './pages/client/SignUp'
import Login from './pages/client/Login'
import Layout from './pages/client/Layout';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Layout />} >
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
