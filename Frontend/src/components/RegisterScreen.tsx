import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface RegisterScreenProps {
  onRegister: () => void;
  onLogin: () => void;
}

export function RegisterScreen({ onRegister, onLogin }: RegisterScreenProps) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [nim, setNim] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  };

  const handleRegister = async () => {
    const loading = toast.loading("Membuat akun...");

    try {
      if (!nim || !username || !email || !password || !confirmPassword) {
        toast.dismiss(loading);
        toast.error("Semua field harus diisi");
        return;
      }

      if (!validateEmail(email)) {
        toast.dismiss(loading);
        toast.error("Email harus menggunakan @gmail.com");
        return;
      }

      if (password !== confirmPassword) {
        toast.dismiss(loading);
        toast.error("Password tidak cocok");
        return;
      }

      if (!agreed) {
        toast.dismiss(loading);
        toast.error("Harus menyetujui Terms");
        return;
      }


      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nim,
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
      toast.dismiss(loading);


      if (!response.ok) {
        toast.error(data.message || "Gagal membuat akun");
        return;
      }


      toast.success("Akun berhasil dibuat!");

      setTimeout(() => {
        onRegister();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.dismiss(loading);
      toast.error("Gagal terhubung ke server");
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F4FF" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #0A1628 0%, #1A2E4A 100%)",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          paddingTop: 40,
          paddingBottom: 28,
        }}
        className="px-6"
      >
        <button onClick={onLogin} style={{ color: "rgba(255,255,255,0.6)" }} className="mb-4">
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ color: "white", marginBottom: 4 }}>Create Account</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
          Join NovaPay — Banking made simple
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 px-6 pt-6 pb-6 overflow-y-auto flex-1"
      >
        <div>
          <label style={{ color: "#64748B", fontSize: "12px", fontWeight: 600 }}>
            NIM
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
              placeholder="Masukkan NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                padding: "14px 0",
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ color: "#64748B", fontSize: "12px", fontWeight: 600 }}>
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
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                padding: "14px 0",
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ color: "#64748B", fontSize: "12px", fontWeight: 600 }}>
            EMAIL
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
              type="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                padding: "14px 0",
              }}
            />
          </div>
        </div>

        {/* Password */}
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
              placeholder="Create a strong password"
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

        <div>
          <label style={{ color: "#64748B", fontSize: "12px", fontWeight: 600 }}>
            CONFIRM PASSWORD
          </label>

          <div className="flex items-center px-4" style={{
            background: "white",
            border: "1.5px solid rgba(30,95,255,0.12)",
            borderRadius: 12,
            marginTop: 6,
          }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                padding: "14px 0",
              }}
            />

            <button onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <div
            onClick={() => setAgreed(!agreed)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              border: agreed ? "none" : "2px solid rgba(30,95,255,0.3)",
              background: agreed ? "#1E5FFF" : "white",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginTop: 2,
            }}
          >
            {agreed && (
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <p style={{ color: "#64748B", fontSize: "13px", lineHeight: 1.5 }}>
            I agree to the{" "}
            <span style={{ color: "#1E5FFF", fontWeight: 600 }}>Terms & Conditions</span>{" "}
            and{" "}
            <span style={{ color: "#1E5FFF", fontWeight: 600 }}>Privacy Policy</span>
          </p>
        </div>

        <button
          onClick={handleRegister}
          disabled={!agreed || !nim || !email || !password}
          style={{
            background: agreed
              ? "linear-gradient(135deg, #1E5FFF, #4D84FF)"
              : "#E2E8F0",
            borderRadius: 14,
            padding: "16px",
            color: agreed ? "white" : "#94A3B8",
            fontWeight: 600,
            fontSize: "15px",
            boxShadow: agreed ? "0 8px 24px rgba(30,95,255,0.35)" : "none",
            border: "none",
            cursor: agreed ? "pointer" : "not-allowed",
            marginTop: 4,
            transition: "all 0.2s",
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", color: "#64748B", fontSize: "13px" }}>
          Already have an account?{" "}
          <button onClick={onLogin} style={{ color: "#1E5FFF", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
}
