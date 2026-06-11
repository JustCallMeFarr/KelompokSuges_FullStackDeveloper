import { ArrowLeft, Upload, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ReceiptScanScreenProps {
  onBack: () => void;
  onScanComplete: () => void;
}

export function ReceiptScanScreen({ onBack, onScanComplete }: ReceiptScanScreenProps) {
  const [scanning, setScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanComplete();
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0A1628" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-10 pb-4">
        <button onClick={onBack}>
          <ArrowLeft size={22} color="white" />
        </button>
        <h3 style={{ color: "white" }}>Scan Struk</h3>
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
          <Zap size={16} color="white" />
        </button>
      </div>

      {/* Instruction */}
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textAlign: "center", padding: "0 32px", lineHeight: 1.6 }}>
        Place your receipt within the frame for automatic OCR scanning
      </p>

      {/* Camera area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        {/* Receipt frame - taller than QR frame */}
        <div
          style={{ position: "relative", width: 240, height: 320, cursor: "pointer" }}
          onClick={handleScan}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #0D1F3C, #1A2E4A)",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              overflow: "hidden",
            }}
          >
            {scanning ? (
              <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                {/* OCR scan line animation */}
                <motion.div
                  animate={{ top: ["5%", "95%", "5%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg, transparent, #1E5FFF, #4D84FF, #1E5FFF, transparent)",
                    boxShadow: "0 0 12px rgba(30,95,255,0.8)",
                  }}
                />
                {/* Mock receipt lines */}
                {[30, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135].map((y) => (
                  <motion.div
                    key={y}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.4] }}
                    transition={{ delay: y / 200 }}
                    style={{
                      width: `${60 + Math.random() * 30}%`,
                      height: 2,
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: 1,
                    }}
                  />
                ))}
                <p style={{ color: "#1E5FFF", fontSize: "12px", position: "absolute", bottom: 16 }}>
                  Scanning receipt...
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", opacity: 0.4 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🧾</div>
                  <p style={{ color: "white", fontSize: "12px" }}>Tap to scan receipt</p>
                </div>
                {/* Mock receipt lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: `${50 + i * 8}%`,
                      height: 2,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Corner frames for receipt shape */}
          {[
            { top: -3, left: -3, borderTop: "3px solid #1E5FFF", borderLeft: "3px solid #1E5FFF", borderRadius: "10px 0 0 0" },
            { top: -3, right: -3, borderTop: "3px solid #1E5FFF", borderRight: "3px solid #1E5FFF", borderRadius: "0 10px 0 0" },
            { bottom: -3, left: -3, borderBottom: "3px solid #1E5FFF", borderLeft: "3px solid #1E5FFF", borderRadius: "0 0 0 10px" },
            { bottom: -3, right: -3, borderBottom: "3px solid #1E5FFF", borderRight: "3px solid #1E5FFF", borderRadius: "0 0 10px 0" },
          ].map((style, i) => (
            <div key={i} style={{ position: "absolute", width: 24, height: 24, ...style }} />
          ))}
        </div>

        {/* OCR badge */}
        <div
          style={{
            background: "rgba(30,95,255,0.15)",
            border: "1px solid rgba(30,95,255,0.3)",
            borderRadius: 20,
            padding: "6px 14px",
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#1E5FFF" }}
          />
          <span style={{ color: "#4D84FF", fontSize: "11px", fontWeight: 600 }}>OCR Ready</span>
        </div>
      </div>

      {/* Bottom action */}
      <div className="px-6 pb-8">
        <button
          onClick={handleScan}
          disabled={scanning}
          style={{
            width: "100%",
            background: scanning ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #1E5FFF, #4D84FF)",
            borderRadius: 14,
            padding: "16px",
            color: "white",
            fontWeight: 600,
            fontSize: "15px",
            border: "none",
            cursor: scanning ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 12,
            transition: "all 0.2s",
          }}
        >
          {scanning ? "Processing..." : "Scan Receipt"}
        </button>
        <button
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "16px",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
            fontSize: "15px",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Upload size={18} />
          Upload from Gallery
        </button>
      </div>
    </div>
  );
}
