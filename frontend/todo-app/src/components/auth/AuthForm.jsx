import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/auth";
import { useUser } from "../../contexts/UserContext";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/todos");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authApi.login(username, password);
        login(response.data);
      } else {
        await authApi.register(username, password);
        setIsLogin(true);
        setError("Registration successful! Please login.");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "var(--spacing-lg)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            background:
              "linear-gradient(135deg, var(--primary) 0%, #47a0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "var(--spacing-lg)",
          }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {error && (
          <div
            style={{
              padding: "var(--spacing-md)",
              marginBottom: "var(--spacing-md)",
              backgroundColor: "rgba(255, 59, 48, 0.1)",
              color: "var(--error)",
              borderRadius: "var(--radius)",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={{
              width: "100%",
              padding: "var(--spacing-md)",
              marginBottom: "var(--spacing-md)",
              border: "none",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--surface)",
              fontSize: "1rem",
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{
              width: "100%",
              padding: "var(--spacing-md)",
              marginBottom: "var(--spacing-md)",
              border: "none",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--surface)",
              fontSize: "1rem",
            }}
          />

          <button
            type="submit"
            disabled={loading || !username || !password}
            style={{
              width: "100%",
              padding: "var(--spacing-md)",
              border: "none",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--primary)",
              color: "white",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading || !username || !password ? 0.7 : 1,
              marginBottom: "var(--spacing-md)",
            }}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>

          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setUsername("");
                setPassword("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                cursor: "pointer",
              }}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
