import { ChevronRight, User, Shield, Bell, HelpCircle, LogOut, Edit3, Camera } from "lucide-react";
import { motion } from "motion/react";

interface ProfileScreenProps {
  onLogout: () => void;
}

const menuItems = [
  { icon: Edit3, label: "Edit Profile", sub: "Update your personal info", color: "#1E5FFF" },
  { icon: Shield, label: "Security", sub: "PIN, biometric, 2FA", color: "#6366F1" },
  { icon: Bell, label: "Notifications", sub: "Manage your alerts", color: "#0EA5E9" },
  { icon: HelpCircle, label: "Help Center", sub: "FAQ & customer support", color: "#10B981" },
];

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#F0F4FF" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #0A1628 0%, #1A2E4A 100%)",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          paddingTop: 48,
          paddingBottom: 36,
        }}
        className="px-6 flex flex-col items-center"
      >
        {/* Avatar */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 24px rgba(30,95,255,0.4)",
            }}
          >
            <span style={{ color: "white", fontSize: "28px", fontWeight: 700 }}>BS</span>
          </motion.div>
          <button
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Camera size={14} color="#1E5FFF" />
          </button>
        </div>

        <h2 style={{ color: "white" }}>Budi Santoso</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: 4 }}>budi.santoso@email.com</p>

        {/* Verified badge */}
        <div
          style={{
            background: "rgba(16,185,129,0.15)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 20,
            padding: "4px 12px",
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ color: "#10B981", fontSize: "11px", fontWeight: 600 }}>Verified Account</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4 px-6 pt-6 pb-6"
      >
        {/* Account info card */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 4px 16px rgba(10,22,40,0.06)",
          }}
        >
          <h4 style={{ color: "#0A1628", marginBottom: 14 }}>Account Information</h4>
          {[
            { label: "Account Number", value: "**** **** **** 4821" },
            { label: "Account Type", value: "NF Bank account" },
            { label: "Member Since", value: "January 2024" },
            { label: "Phone", value: "+62 812 3456 7890" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
              <span style={{ color: "#94A3B8", fontSize: "13px" }}>{label}</span>
              <span style={{ color: "#0A1628", fontSize: "13px", fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Settings menu */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(10,22,40,0.06)",
          }}
        >
          {menuItems.map(({ icon: Icon, label, sub, color }, i) => (
            <button
              key={label}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 20px",
                background: "white",
                border: "none",
                borderBottom: i < menuItems.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: `${color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={20} color={color} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#0A1628", fontSize: "14px", fontWeight: 600 }}>{label}</p>
                <p style={{ color: "#94A3B8", fontSize: "11px", marginTop: 2 }}>{sub}</p>
              </div>
              <ChevronRight size={16} color="#CBD5E1" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            background: "white",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            border: "1.5px solid rgba(239,68,68,0.15)",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(239,68,68,0.05)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(239,68,68,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogOut size={20} color="#EF4444" />
          </div>
          <span style={{ color: "#EF4444", fontSize: "14px", fontWeight: 600, flex: 1, textAlign: "left" }}>
            Keluar
          </span>
          <ChevronRight size={16} color="#EF4444" />
        </button>

        <p style={{ color: "#CBD5E1", fontSize: "11px", textAlign: "center", marginTop: 4 }}>
          NF Bank account v2.4.1 · Build 2026060401
        </p>
      </motion.div>
    </div>
  );
}
