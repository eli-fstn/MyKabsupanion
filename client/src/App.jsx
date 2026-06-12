import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/student/LogIn";
import Dashboard from "./pages/student/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;