import { motion } from "motion/react";
import { Download, Home, Share2 } from "lucide-react";

interface PaymentSuccessScreenProps {
  onHome: () => void;
}

export function PaymentSuccessScreen({ onHome }: PaymentSuccessScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F4FF" }}>
      {/* Success animation area */}
      <div
        style={{
          background: "linear-gradient(160deg, #0A1628 0%, #1A2E4A 100%)",
          flex: "none",
          paddingTop: 60,
          paddingBottom: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        {/* Success ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(16,185,129,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                background: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(16,185,129,0.5)",
              }}
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <motion.path
                  d="M8 18L15 25L28 11"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </motion.svg>
            </div>
          </div>
          {/* Sparkles */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <motion.div
              key={angle}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 1, 0] }}
              transition={{ delay: 0.5 + angle / 1800, duration: 0.8 }}
              style={{
                position: "absolute",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10B981",
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translateY(-60px)`,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <h2 style={{ color: "white" }}>Pembayaran Berhasil!</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: 4 }}>
            Transaction completed successfully
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col gap-4 px-6 pt-6 pb-6 flex-1"
      >
        {/* Receipt card */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(10,22,40,0.08)",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
              padding: "16px 20px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>Amount Paid</p>
            <h2 style={{ color: "white", letterSpacing: "-0.02em" }}>Rp 75.000</h2>
          </div>

          {/* Zigzag */}
          <div style={{ height: 12, background: "#F0F4FF", position: "relative" }}>
            <svg width="100%" height="12" style={{ position: "absolute", top: 0 }}>
              <path d="M0 0 Q15 12 30 0 Q45 12 60 0 Q75 12 90 0 Q105 12 120 0 Q135 12 150 0 Q165 12 180 0 Q195 12 210 0 Q225 12 240 0 Q255 12 270 0 Q285 12 300 0 Q315 12 330 0 Q345 12 360 0" fill="white"/>
            </svg>
          </div>

          <div className="px-6 py-4 flex flex-col gap-3">
            {[
              { label: "Merchant", value: "Warung Makan Padang" },
              { label: "Date", value: "04 Jun 2026, 12:30" },
              { label: "Method", value: "NovaPay Balance" },
              { label: "Reference", value: "#NPY2026060412301" },
              { label: "Status", value: "✅ Success" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span style={{ color: "#94A3B8", fontSize: "12px" }}>{label}</span>
                <span style={{ color: "#0A1628", fontSize: "12px", fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            style={{
              flex: 1,
              background: "white",
              borderRadius: 14,
              padding: "14px",
              color: "#1E5FFF",
              fontWeight: 600,
              fontSize: "14px",
              border: "1.5px solid rgba(30,95,255,0.2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Download size={16} />
            Receipt
          </button>
          <button
            style={{
              flex: 1,
              background: "white",
              borderRadius: 14,
              padding: "14px",
              color: "#64748B",
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

        <button
          onClick={onHome}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Home size={18} />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
