
import {BrowserRouter ,Routes ,Route} from "react-router-dom"
import Home from "./Pages/Home";
import List from "./Pages/List";
import Login from "./Pages/Login";
import SingleHotel from "./Pages/SingleHotel";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<List />} />
      <Route  path="/hotels/:id" element={<SingleHotel />} />
      <Route  path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App