import { useEffect, useState } from "react";
import { ArrowLeft, Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion } from "motion/react";


interface HistoryScreenProps {
  onBack: () => void;
}



export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [transactions, setTransactions] = useState<any[]>([]);
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user")!);

      const res = await fetch(
        `http://localhost:3000/api/transaksi/${user.id_user}`
      );

      const data = await res.json();

      setTransactions(data);

    } catch (err) {
      console.log(err);
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
          paddingBottom: 24,
        }}
        className="px-6"
      >
        <button onClick={onBack} style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: "white" }}>Riwayat Transaksi</h2>
          <button
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "6px 12px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
            }}
          >
            <Filter size={12} />
            Filter
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
          }}
        >
          <Search size={16} color="rgba(255,255,255,0.4)" />
          <input
            placeholder="Search transactions..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              flex: 1,
              padding: "12px 10px",
              color: "white",
              fontSize: "13px",
            }}
          />
        </div>

        {/* Summary pills */}
        <div className="flex gap-2 mt-3">
          {[
            { label: "Income", value: "Rp 9 Jt", color: "#10B981" },
            { label: "Expense", value: "Rp 1.6 Jt", color: "#EF4444" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>{label}:</span>
              <span style={{ color: "white", fontSize: "11px", fontWeight: 700 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-1 px-6 pt-6 pb-6 overflow-y-auto flex-1"
      >
        {transactions.map((tx) => (
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
            {/* ICON */}
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
              💳
            </div>

            {/* TEXT */}
            <div style={{ flex: 1 }}>
              <p style={{ color: "#0A1628", fontWeight: 600 }}>
                {tx.keterangan}
              </p>
            </div>

            {/* AMOUNT (CUMA 1 SEKARANG) */}
            <p
              style={{
                color: "#1E5FFF",
                fontWeight: 700,
                fontSize: "13px",
                whiteSpace: "nowrap",
              }}
            >
              Rp {Number(tx.jumlah).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
