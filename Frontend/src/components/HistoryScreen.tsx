import { ArrowLeft, Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion } from "motion/react";

interface HistoryScreenProps {
  onBack: () => void;
}

const allTransactions = [
  { id: 1, name: "Tokopedia", type: "debit", amount: -250000, date: "04 Jun 2026", time: "10:24", icon: "🛍️", category: "Shopping" },
  { id: 2, name: "Salary - PT Maju Jaya", type: "credit", amount: 8500000, date: "04 Jun 2026", time: "08:00", icon: "💼", category: "Income" },
  { id: 3, name: "Transfer ke Andi Wijaya", type: "debit", amount: -1000000, date: "03 Jun 2026", time: "15:30", icon: "👤", category: "Transfer" },
  { id: 4, name: "Grab Food", type: "debit", amount: -75000, date: "03 Jun 2026", time: "12:15", icon: "🍔", category: "Food" },
  { id: 5, name: "Netflix", type: "debit", amount: -59000, date: "02 Jun 2026", time: "09:00", icon: "🎬", category: "Entertainment" },
  { id: 6, name: "PLN Token Listrik", type: "debit", amount: -200000, date: "01 Jun 2026", time: "14:22", icon: "⚡", category: "Bills" },
  { id: 7, name: "Transfer dari Sari Dewi", type: "credit", amount: 500000, date: "01 Jun 2026", time: "09:45", icon: "👤", category: "Transfer" },
  { id: 8, name: "Indomaret", type: "debit", amount: -45000, date: "31 May 2026", time: "18:30", icon: "🏪", category: "Shopping" },
];

const grouped = [
  { date: "Today, 04 Jun 2026", items: allTransactions.slice(0, 2) },
  { date: "Yesterday, 03 Jun 2026", items: allTransactions.slice(2, 4) },
  { date: "02 Jun 2026", items: allTransactions.slice(4, 5) },
  { date: "01 Jun 2026", items: allTransactions.slice(5, 7) },
  { date: "31 May 2026", items: allTransactions.slice(7) },
];

export function HistoryScreen({ onBack }: HistoryScreenProps) {
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
        {grouped.map((group) => (
          <div key={group.date} className="mb-4">
            <p style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 }}>
              {group.date.toUpperCase()}
            </p>
            <div className="flex flex-col gap-2">
              {group.items.map((tx) => (
                <div
                  key={tx.id}
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
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    {tx.icon}
                    <div
                      style={{
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: tx.type === "credit" ? "#10B981" : "#EF4444",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid white",
                      }}
                    >
                      {tx.type === "credit" ? (
                        <ArrowDownLeft size={8} color="white" />
                      ) : (
                        <ArrowUpRight size={8} color="white" />
                      )}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#0A1628", fontSize: "13px", fontWeight: 600 }}>{tx.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        style={{
                          background: "#F0F4FF",
                          borderRadius: 6,
                          padding: "1px 6px",
                          fontSize: "10px",
                          color: "#64748B",
                          fontWeight: 600,
                        }}
                      >
                        {tx.category}
                      </span>
                      <span style={{ color: "#CBD5E1", fontSize: "10px" }}>{tx.time}</span>
                    </div>
                  </div>
                  <p
                    style={{
                      color: tx.type === "credit" ? "#10B981" : "#0A1628",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {tx.type === "credit" ? "+" : "-"}Rp{" "}
                    {Math.abs(tx.amount).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
