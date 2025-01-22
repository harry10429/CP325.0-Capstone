import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { todoApi } from "./services/api";
import AuthForm from "./components/auth/AuthForm";
import TodoApp from "./components/TodoApp";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/todos" element={<TodoApp />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
