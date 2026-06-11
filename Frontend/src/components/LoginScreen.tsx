import { useState } from "react";
import { Eye, EyeOff, Fingerprint, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const loading = toast.loading("Login...");

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      toast.dismiss(loading);

      if (!response.ok) {
        toast.error(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login berhasil!");

      setTimeout(() => {
        onLogin();
      }, 1000);

    } catch (error) {
      toast.dismiss(loading);
      console.error(error);
      toast.error("Gagal terhubung ke server");
    }
  };

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: "#F0F4FF" }}
    >
      {/* Header gradient */}
      <div
        style={{
          background: "linear-gradient(160deg, #0A1628 0%, #1A2E4A 100%)",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          paddingTop: 48,
          paddingBottom: 40,
        }}
        className="flex flex-col items-center px-6"
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
            boxShadow: "0 12px 32px rgba(30,95,255,0.35)",
          }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        >
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 4L8 12V24C8 33.6 15.2 42.4 24 44C32.8 42.4 40 33.6 40 24V12L24 4Z"
              stroke="white"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M17 24L22 29L31 19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 style={{ color: "white", marginBottom: 4 }}>Welcome Back</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
          Sign in to your NF Bank account
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-4 px-6 pt-8 flex-1"
      >
        <div>
          <label style={{ color: "#64748B", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em" }}>
            USERNAME
          </label>
          <div
            style={{
              background: "white",
              border: "1.5px solid rgba(30,95,255,0.12)",
              borderRadius: 12,
              marginTop: 6,
            }}
            className="flex items-center px-4"
          >
            <input
              type="text"
              placeholder="Enter username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                padding: "14px 0",
                color: "#0A1628",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ color: "#64748B", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em" }}>
            PASSWORD
          </label>
          <div
            style={{
              background: "white",
              border: "1.5px solid rgba(30,95,255,0.12)",
              borderRadius: 12,
              marginTop: 6,
            }}
            className="flex items-center px-4"
          >
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                flex: 1,
                padding: "14px 0",
                color: "#0A1628",
                fontSize: "14px",
              }}
            />
            <button onClick={() => setShowPass(!showPass)} style={{ color: "#94A3B8" }}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button style={{ color: "#1E5FFF", fontSize: "13px", fontWeight: 600 }}>
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          style={{
            background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
            borderRadius: 14,
            padding: "16px",
            color: "white",
            fontWeight: 600,
            fontSize: "15px",
            boxShadow: "0 8px 24px rgba(30,95,255,0.35)",
            border: "none",
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          Masuk
        </button>

        <button
          onClick={onRegister}
          style={{
            background: "white",
            borderRadius: 14,
            padding: "16px",
            color: "#0A1628",
            fontWeight: 600,
            fontSize: "15px",
            border: "1.5px solid rgba(10,22,40,0.12)",
            cursor: "pointer",
          }}
        >
          Daftar
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
          <span style={{ color: "#94A3B8", fontSize: "12px" }}>atau</span>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
        </div>

        {/* Fingerprint */}
        <div className="flex flex-col items-center gap-2">
          <button
            style={{
              background: "white",
              border: "1.5px solid rgba(30,95,255,0.15)",
              borderRadius: 20,
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(30,95,255,0.1)",
              cursor: "pointer",
            }}
          >
            <Fingerprint size={28} color="#1E5FFF" />
          </button>
          <span style={{ color: "#64748B", fontSize: "12px" }}>Login with Fingerprint</span>
        </div>
      </motion.div>
    </div>
  );
}
