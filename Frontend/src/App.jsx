import { useState } from "react";

function App() {
  const [saldo, setSaldo] = useState(250000);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💸 KIP-K Tracker</h1>
        <p style={styles.subtitle}>Smart Money Monitoring</p>
      </div>

      <div style={styles.card}>
        <p style={styles.label}>Total Saldo</p>
        <h1 style={styles.saldo}>
          Rp {saldo.toLocaleString("id-ID")}
        </h1>

        <div style={styles.buttonGroup}>
          <button style={styles.primaryBtn}>
            + Pengeluaran
          </button>
          <button style={styles.secondaryBtn}>
            + Pemasukan
          </button>
        </div>
      </div>

      <div style={styles.cardSmall}>
        <h3>📊 Aktivitas Terakhir</h3>
        <p style={{ color: "#64748b" }}>
          Belum ada transaksi
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "Inter, sans-serif",
    color: "white",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#94a3b8",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "20px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  label: {
    color: "#94a3b8",
    marginBottom: "10px",
  },

  saldo: {
    fontSize: "36px",
    marginBottom: "20px",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    border: "none",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryBtn: {
    background: "transparent",
    border: "1px solid #475569",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  cardSmall: {
    marginTop: "20px",
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px",
    width: "380px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
};

export default App;