import { ArrowLeft, Zap, Image, Info } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface QRScanScreenProps {
  onBack: () => void;
  onScanSuccess: () => void;
}

export function QRScanScreen({ onBack, onScanSuccess }: QRScanScreenProps) {
  const [flashOn, setFlashOn] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanSuccess();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0A1628" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6">
        <button onClick={onBack}>
          <ArrowLeft size={22} color="white" />
        </button>
        <h3 style={{ color: "white" }}>Scan QR</h3>
        <button
          onClick={() => setFlashOn(!flashOn)}
          style={{
            background: flashOn ? "#F59E0B" : "rgba(255,255,255,0.1)",
            borderRadius: 10,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <Zap size={16} color={flashOn ? "white" : "rgba(255,255,255,0.7)"} fill={flashOn ? "white" : "none"} />
        </button>
      </div>

      {/* Camera area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Instruction */}
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textAlign: "center", marginBottom: 32, lineHeight: 1.6 }}>
          Arahkan kamera ke kode QR untuk melakukan pembayaran.
        </p>

        {/* QR Frame */}
        <div
          style={{ position: "relative", width: 256, height: 256 }}
          onClick={handleSimulateScan}
        >
          {/* Simulated camera bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #0D1F3C, #1A2E4A)",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {scanning ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: 40,
                    height: 40,
                    border: "3px solid rgba(30,95,255,0.2)",
                    borderTop: "3px solid #1E5FFF",
                    borderRadius: "50%",
                  }}
                />
                <p style={{ color: "#1E5FFF", fontSize: "12px" }}>Scanning...</p>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-30">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="2"/>
                  <rect x="28" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="2"/>
                  <rect x="4" y="28" width="16" height="16" rx="2" stroke="white" strokeWidth="2"/>
                  <rect x="8" y="8" width="8" height="8" fill="white"/>
                  <rect x="32" y="8" width="8" height="8" fill="white"/>
                  <rect x="8" y="32" width="8" height="8" fill="white"/>
                  <path d="M28 28h4v4h-4zM36 28h4v4h-4zM28 36h4v4h-4zM36 36h4v4h-4z" fill="white"/>
                </svg>
                <p style={{ color: "white", fontSize: "11px" }}>Tap to simulate scan</p>
              </div>
            )}
          </div>

          {/* Corner frames */}
          {[
            { top: -3, left: -3, borderTop: "3px solid #1E5FFF", borderLeft: "3px solid #1E5FFF", borderRadius: "12px 0 0 0" },
            { top: -3, right: -3, borderTop: "3px solid #1E5FFF", borderRight: "3px solid #1E5FFF", borderRadius: "0 12px 0 0" },
            { bottom: -3, left: -3, borderBottom: "3px solid #1E5FFF", borderLeft: "3px solid #1E5FFF", borderRadius: "0 0 0 12px" },
            { bottom: -3, right: -3, borderBottom: "3px solid #1E5FFF", borderRight: "3px solid #1E5FFF", borderRadius: "0 0 12px 0" },
          ].map((style, i) => (
            <div key={i} style={{ position: "absolute", width: 28, height: 28, ...style }} />
          ))}

          {/* Scanning line */}
          {!scanning && (
            <motion.div
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                left: 4,
                right: 4,
                height: 2,
                background: "linear-gradient(90deg, transparent, #1E5FFF, transparent)",
                boxShadow: "0 0 8px rgba(30,95,255,0.6)",
              }}
            />
          )}
        </div>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: 24, textAlign: "center" }}>
          Works with all QRIS-supported merchants
        </p>
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-8">
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "10px 20px",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image size={16} />
            From Gallery
          </button>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Info size={14} color="rgba(255,255,255,0.4)" />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>QRIS Supported</span>
          </div>
        </div>
      </div>
    </div>
  );
}
