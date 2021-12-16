import { Routes, Route } from "react-router-dom";

import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/:id" element={<SingleUser />} />
      </Routes>
    </div>
  );
}

export default App;
