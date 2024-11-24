import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/DashBoard";
import { ViewItems } from "./pages/ViewItems";
import { AddItem } from "./pages/CreateItem";
import { RegisterPage } from "./pages/RegisterPage";
import { ViewItem } from "./pages/ItemDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items" element={<ViewItems />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/items/:id" element={<ViewItem />} />
          {/* Catch-all route for 404 - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
