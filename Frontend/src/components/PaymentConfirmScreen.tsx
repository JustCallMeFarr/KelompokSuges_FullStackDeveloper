import { ArrowLeft, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface PaymentConfirmScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function PaymentConfirmScreen({ onBack, onConfirm }: PaymentConfirmScreenProps) {
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
        <h2 style={{ color: "white" }}>Konfirmasi Pembayaran</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: 4 }}>
          Review your payment details
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 px-6 pt-6 pb-6 overflow-y-auto flex-1"
      >
        {/* Merchant card */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 4px 16px rgba(10,22,40,0.06)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🏪
            </div>
            <div>
              <h3 style={{ color: "#0A1628" }}>Warung Makan Padang</h3>
              <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: 2 }}>ID: WMP-08291847</p>
              <div className="flex items-center gap-1 mt-1">
                <ShieldCheck size={12} color="#10B981" />
                <span style={{ color: "#10B981", fontSize: "11px", fontWeight: 600 }}>Verified Merchant</span>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "4px 0 16px" }} />

          {/* Amount */}
          <div className="text-center py-4">
            <p style={{ color: "#94A3B8", fontSize: "12px" }}>Total Payment</p>
            <h1 style={{ color: "#0A1628", letterSpacing: "-0.02em", marginTop: 4 }}>Rp 75.000</h1>
          </div>

          <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "4px 0 16px" }} />

          {/* Details */}
          {[
            { label: "Payment Method", value: "NovaPay Balance" },
            { label: "Transaction Fee", value: "Gratis" },
            { label: "Date & Time", value: "04 Jun 2026, 12:30" },
            { label: "Reference", value: "#NPY2026060412301" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2">
              <span style={{ color: "#94A3B8", fontSize: "13px" }}>{label}</span>
              <span style={{ color: "#0A1628", fontSize: "13px", fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Source balance */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#F0F4FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              💳
            </div>
            <div>
              <p style={{ color: "#0A1628", fontSize: "13px", fontWeight: 600 }}>NovaPay Balance</p>
              <p style={{ color: "#94A3B8", fontSize: "12px" }}>Rp 24.750.000 available</p>
            </div>
          </div>
          <ChevronRight size={16} color="#94A3B8" />
        </div>

        {/* Security note */}
        <div
          style={{
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ShieldCheck size={16} color="#10B981" />
          <p style={{ color: "#10B981", fontSize: "12px", lineHeight: 1.5 }}>
            Secured by 256-bit encryption. Your payment is protected.
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={onBack}
            style={{
              flex: 1,
              background: "white",
              borderRadius: 14,
              padding: "16px",
              color: "#0A1628",
              fontWeight: 600,
              fontSize: "15px",
              border: "1.5px solid rgba(10,22,40,0.1)",
              cursor: "pointer",
            }}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 2,
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
            Konfirmasi
          </button>
        </div>
      </motion.div>
    </div>
  );
}
