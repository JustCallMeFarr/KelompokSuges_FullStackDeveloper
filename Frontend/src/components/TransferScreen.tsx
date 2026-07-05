import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { motion } from "motion/react";

interface TransferScreenProps {
  onBack: () => void;
  onContinue: (data: {
    rekening: string;
    nama: string;
    jumlah: number;
    keterangan: string;
  }) => void;
}

const favorites = [
  { id: 1, name: "Andi Wijaya", bank: "BCA", number: "1234567890", avatar: "AW" },
  { id: 2, name: "Sari Dewi", bank: "Mandiri", number: "0987654321", avatar: "SD" },
  { id: 3, name: "Budi R.", bank: "BNI", number: "1122334455", avatar: "BR" },
  { id: 4, name: "Rina K.", bank: "BRI", number: "5544332211", avatar: "RK" },
];

const avatarColors = ["#1E5FFF", "#6366F1", "#0EA5E9", "#10B981"];

export function TransferScreen({ onBack, onContinue }: TransferScreenProps) {
  const [rekening, setRekening] = useState("");
  const [nama, setNama] = useState("");

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedFav, setSelectedFav] = useState<number | null>(null);
  const formatAmount = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num ? parseInt(num).toLocaleString("id-ID") : "";
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
        <button onClick={onBack} style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ color: "white" }}>Transfer</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: 4 }}>
          Send money instantly to any account
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 px-6 pt-6 pb-6 overflow-y-auto flex-1"
      >
        {/* Favorite recipients */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Star size={14} color="#1E5FFF" fill="#1E5FFF" />
            <label style={{ color: "#64748B", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em" }}>
              FAVORITE RECIPIENTS
            </label>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {favorites.map((fav, i) => (
              <button
                key={fav.id}
                onClick={() => setSelectedFav(fav.id)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: avatarColors[i % avatarColors.length],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: selectedFav === fav.id ? "2.5px solid #1E5FFF" : "2.5px solid transparent",
                    boxShadow: selectedFav === fav.id ? "0 0 0 3px rgba(30,95,255,0.2)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ color: "white", fontSize: "13px", fontWeight: 700 }}>{fav.avatar}</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#0A1628", fontSize: "11px", fontWeight: 600 }}>{fav.name.split(" ")[0]}</p>
                  <p style={{ color: "#94A3B8", fontSize: "10px" }}>{fav.bank}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transfer Form */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 4px 16px rgba(10,22,40,0.06)",
          }}
        >
          <h4 style={{ color: "#0A1628", marginBottom: 16 }}>Transfer Details</h4>

          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                color: "#64748B",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              ACCOUNT NUMBER
            </label>

            <div
              style={{
                background: "#F8FAFF",
                border: "1.5px solid rgba(30,95,255,0.1)",
                borderRadius: 12,
                marginTop: 6,
              }}
              className="flex items-center px-4"
            >
              <input
                type="text"
                placeholder="Enter account number"
                value={rekening}
                onChange={(e) => setRekening(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: "12px 0",
                  color: "#0A1628",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                color: "#64748B",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              RECIPIENT NAME
            </label>

            <div
              style={{
                background: "#F8FAFF",
                border: "1.5px solid rgba(30,95,255,0.1)",
                borderRadius: 12,
                marginTop: 6,
              }}
              className="flex items-center px-4"
            >
              <input
                type="text"
                placeholder="Recipient name"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: "12px 0",
                  color: "#0A1628",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Amount */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#64748B", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}>
              AMOUNT (IDR)
            </label>
            <div
              style={{
                background: "#F8FAFF",
                border: "1.5px solid rgba(30,95,255,0.1)",
                borderRadius: 12,
                marginTop: 6,
              }}
              className="flex items-center px-4"
            >
              <span style={{ color: "#94A3B8", fontSize: "14px", marginRight: 4 }}>Rp</span>
              <input
                type="text"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(formatAmount(e.target.value))}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  flex: 1,
                  padding: "12px 0",
                  color: "#0A1628",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              />
            </div>
            {/* Quick amounts */}
            <div className="flex gap-2 mt-2">
              {["50.000", "100.000", "500.000", "1.000.000"].map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  style={{
                    background: amount === a ? "#1E5FFF" : "#F0F4FF",
                    color: amount === a ? "white" : "#64748B",
                    borderRadius: 8,
                    padding: "4px 8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ color: "#64748B", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}>
              NOTES (OPTIONAL)
            </label>
            <div
              style={{
                background: "#F8FAFF",
                border: "1.5px solid rgba(30,95,255,0.1)",
                borderRadius: 12,
                marginTop: 6,
              }}
              className="flex items-center px-4"
            >
              <input
                type="text"
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: "12px 0",
                  color: "#0A1628",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Admin fee info */}
        <div
          style={{
            background: "rgba(30,95,255,0.06)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#64748B", fontSize: "12px" }}>Admin fee</span>
          <span style={{ color: "#10B981", fontSize: "12px", fontWeight: 700 }}>FREE</span>
        </div>

        <button
          onClick={() =>
            onContinue({
              rekening,
              nama,
              jumlah: Number(amount.replace(/\./g, "")),
              keterangan: note,
            })
          }
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
          }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
