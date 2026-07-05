import { useEffect, useState } from "react";
import { Bell, ArrowUpRight, ArrowDownLeft, QrCode, Clock, ArrowLeftRight, ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "motion/react";


interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}



const banners = [
  { id: 1, title: "Cashback 20%", sub: "Transfer ke semua bank gratis", bg: "linear-gradient(135deg, #1E5FFF, #4D84FF)", emoji: "💳" },
  { id: 2, title: "Investasi Mulai 10rb", sub: "Reksa dana pilihan terbaik", bg: "linear-gradient(135deg, #0A1628, #1A2E4A)", emoji: "📈" },
  { id: 3, title: "Promo QRIS", sub: "Bayar lebih mudah, hemat lebih banyak", bg: "linear-gradient(135deg, #6366F1, #8B5CF6)", emoji: "✨" },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [displayName, setDisplayName] = useState("User");
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState([]);

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    setDisplayName(
      user.display_name ||
      user.username ||
      "User"
    );

    fetch(`http://localhost:3000/api/user/${user.id_user}/balance`)
      .then(res => res.json())
      .then(data => {
        console.log("WALLET:", data);
        setWallet(data);
      })
      .catch(err => console.error(err));

  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    fetch(`http://localhost:3000/api/transaksi/${user.id_user}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.slice(0, 3)); // cuma tampil 3 transaksi terbaru
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#F0F4FF" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #0A1628 0%, #1A2E4A 100%)",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          paddingTop: 48,
          paddingBottom: 24,
        }}
        className="px-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>Good morning,</p>
            <h3 style={{ color: "white", marginTop: 2 }}>
              {displayName}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ position: "relative" }}>
              <button
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Bell size={18} color="white" />
              </button>
              <div style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #0A1628" }} />
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
                borderRadius: 12,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(30,95,255,0.4)",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {initials}
              </span>
            </div>
          </div>
        </div>

        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "linear-gradient(135deg, #1E5FFF 0%, #0A3BBF 100%)",
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 12px 40px rgba(30,95,255,0.35)",
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Total Balance</p>
              <div className="flex items-center gap-2 mt-1">
                <h2 style={{ color: "white", letterSpacing: "-0.02em" }}>
                  {balanceVisible
                    ? `Rp ${wallet?.balance?.toLocaleString("id-ID") || 0}`
                    : "Rp ••••••••"
                  }
                </h2>
                <button onClick={() => setBalanceVisible(!balanceVisible)} style={{ color: "rgba(255,255,255,0.6)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {balanceVisible
                      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                      : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
                    }
                  </svg>
                </button>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: 4 }}>
                {wallet?.card_number || "Loading..."}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="flex items-center gap-1">
                <TrendingUp size={12} color="rgba(255,255,255,0.7)" />
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>+2.4% this month</p>
              </div>
            </div>
          </div>

          {/* Mini stats */}
          <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="flex items-center gap-2">
              <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px" }}>
                <ArrowDownLeft size={14} color="white" />
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>Income</p>
                <p style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>Rp 8.5 Jt</p>
              </div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.12)" }} />
            <div className="flex items-center gap-2">
              <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px" }}>
                <ArrowUpRight size={14} color="white" />
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>Expenses</p>
                <p style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>Rp 1.4 Jt</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 pt-6 flex flex-col gap-6 pb-4">
        {/* Quick Actions */}
        <div>
          <h4 style={{ color: "#0A1628", marginBottom: 12 }}>Quick Actions</h4>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Transfer", icon: ArrowLeftRight, screen: "transfer", color: "#1E5FFF" },
              { label: "Scan Bayar", icon: QrCode, screen: "qrscan", color: "#6366F1" },
              { label: "Scan Struk", icon: () => <span style={{ fontSize: 20 }}>🧾</span>, screen: "receiptscan", color: "#0EA5E9" },
              { label: "Riwayat", icon: Clock, screen: "history", color: "#10B981" },
            ].map(({ label, icon: Icon, screen, color }) => (
              <button
                key={label}
                onClick={() => onNavigate(screen)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: 16,
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(10,22,40,0.08)",
                    border: "1px solid rgba(30,95,255,0.06)",
                  }}
                >
                  <Icon size={22} color={color} />
                </div>
                <span style={{ color: "#0A1628", fontSize: "11px", fontWeight: 500, textAlign: "center" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div>
          <div
            style={{
              background: banners[bannerIndex].bg,
              borderRadius: 20,
              padding: "20px",
              position: "relative",
              overflow: "hidden",
              minHeight: 96,
            }}
          >
            <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 48, opacity: 0.3 }}>
              {banners[bannerIndex].emoji}
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", letterSpacing: "0.06em" }}>PROMO SPESIAL</p>
            <h3 style={{ color: "white", marginTop: 4 }}>{banners[bannerIndex].title}</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginTop: 2 }}>{banners[bannerIndex].sub}</p>
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIndex(i)}
                style={{
                  width: i === bannerIndex ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === bannerIndex ? "#1E5FFF" : "rgba(30,95,255,0.2)",
                  transition: "all 0.3s",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 style={{ color: "#0A1628" }}>Recent Transactions</h4>
            <button
              onClick={() => onNavigate("history")}
              style={{ color: "#1E5FFF", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer" }}
            >
              See All <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {transactions.map((tx: any) => {
              const icon =
                tx.jenis_transaksi === "TRANSFER"
                  ? "💸"
                  : tx.jenis_transaksi === "PAYMENT"
                    ? "💳"
                    : "🧾";

              const color =
                tx.jenis_transaksi === "TRANSFER"
                  ? "#EF4444"
                  : "#10B981";

              return (
                <div
                  key={tx.id_transaksi}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxShadow: "0 2px 8px rgba(10,22,40,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: "#F0F4FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    {icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        color: "#0A1628",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {tx.jenis_transaksi}
                    </p>

                    <p
                      style={{
                        color: "#94A3B8",
                        fontSize: 11,
                      }}
                    >
                      {tx.keterangan}
                    </p>
                  </div>

                  <p
                    style={{
                      color,
                      fontWeight: 700,
                    }}
                  >
                    Rp {Number(tx.jumlah).toLocaleString("id-ID")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
