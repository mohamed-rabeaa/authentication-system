import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Layout from './pages/Layout';


function App() {
  return (
    <BrowserRouter>
      <div className="App bg-gradient-to-tl from-green-400 to-sky-900">
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
