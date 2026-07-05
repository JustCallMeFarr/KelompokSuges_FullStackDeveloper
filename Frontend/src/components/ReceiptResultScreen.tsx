import { ArrowLeft, Download, Share2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
interface ReceiptResultScreenProps {
  onBack: () => void;
}

const items = [
  { name: "Nasi Padang", qty: 2, price: 25000 },
  { name: "Rendang Sapi", qty: 1, price: 35000 },
  { name: "Sayur Nangka", qty: 1, price: 10000 },
  { name: "Es Teh Manis", qty: 2, price: 6000 },
  { name: "Kerupuk", qty: 3, price: 2000 },
];

export function ReceiptResultScreen({ onBack }: ReceiptResultScreenProps) {
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;
  // Tambahkan di sini

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
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCart size={20} color="white" />
          </div>
          <div>
            <h2 style={{ color: "white" }}>Hasil Scan Struk</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: 2 }}>OCR scan successful</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 px-6 pt-6 pb-6 overflow-y-auto flex-1"
      >
        {/* Store info */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 4px 16px rgba(10,22,40,0.06)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ fontSize: 32 }}>🏪</div>
            <div>
              <h3 style={{ color: "#0A1628" }}>Warung Makan Padang</h3>
              <p style={{ color: "#94A3B8", fontSize: "12px" }}>Jl. Sudirman No. 47, Jakarta</p>
              <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: 2 }}>📅 04 Jun 2026, 12:15</p>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(0,0,0,0.06)", marginBottom: 16 }} />

          {/* Items */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span style={{ color: "#64748B", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}>ITEM</span>
              <div className="flex gap-6">
                <span style={{ color: "#64748B", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}>QTY</span>
                <span style={{ color: "#64748B", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}>PRICE</span>
              </div>
            </div>

            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between"
              >
                <span style={{ color: "#0A1628", fontSize: "13px", flex: 1 }}>{item.name}</span>
                <div className="flex gap-6 items-center">
                  <span
                    style={{
                      color: "#1E5FFF",
                      fontSize: "12px",
                      fontWeight: 700,
                      background: "#E8EEFF",
                      borderRadius: 6,
                      padding: "2px 8px",
                      minWidth: 28,
                      textAlign: "center",
                    }}
                  >
                    {item.qty}
                  </span>
                  <span style={{ color: "#0A1628", fontSize: "13px", fontWeight: 600, minWidth: 80, textAlign: "right" }}>
                    Rp {(item.qty * item.price).toLocaleString("id-ID")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "16px 0" }} />

          {/* Totals */}
          {[
            { label: "Subtotal", value: subtotal },
            { label: "PPN (10%)", value: tax },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-1">
              <span style={{ color: "#94A3B8", fontSize: "13px" }}>{label}</span>
              <span style={{ color: "#64748B", fontSize: "13px" }}>Rp {value.toLocaleString("id-ID")}</span>
            </div>
          ))}

          <div
            style={{
              background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <span style={{ color: "white", fontWeight: 700 }}>TOTAL</span>
            <span style={{ color: "white", fontWeight: 700 }}>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => {
              toast.success("Struk berhasil disimpan 🎉", {
                description: "Transaksi telah ditambahkan ke riwayat.",
              });

              onBack();
            }}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
              borderRadius: 14,
              padding: "14px",
              color: "#edeff2",
              fontWeight: 600,
              fontSize: "14px",
              border: "1.5px solid rgba(0,0,0,0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Download size={16} />
            Save
          </button>
          <button
            style={{
              flex: 1,
              background: "white",
              borderRadius: 14,
              padding: "14px",
              color: "#0A1628",
              fontWeight: 600,
              fontSize: "14px",
              border: "1.5px solid rgba(0,0,0,0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </motion.div>
    </div>
  );
}
