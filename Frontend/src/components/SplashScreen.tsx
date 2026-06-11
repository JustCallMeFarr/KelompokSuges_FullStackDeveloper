import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 4;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className="flex flex-col items-center justify-center h-full relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0A1628 0%, #1A2E4A 50%, #0D1F3C 100%)",
      }}
    >
      {/* Background circles */}
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, #1E5FFF, transparent)",
          top: -100,
          right: -100,
        }}
      />
      <div
        className="absolute rounded-full opacity-5"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #4D84FF, transparent)",
          bottom: -50,
          left: -50,
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Shield icon */}
        <div
          style={{
            background: "linear-gradient(135deg, #1E5FFF, #4D84FF)",
            boxShadow: "0 20px 60px rgba(30,95,255,0.4)",
          }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 4L8 12V24C8 33.6 15.2 42.4 24 44C32.8 42.4 40 33.6 40 24V12L24 4Z"
              fill="white"
              fillOpacity="0.15"
            />
            <path
              d="M24 4L8 12V24C8 33.6 15.2 42.4 24 44C32.8 42.4 40 33.6 40 24V12L24 4Z"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M17 24L22 29L31 19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-center">
          <h1
            style={{
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            NovaPay
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: 4 }}>
            Your Trusted Digital Bank
          </p>
        </div>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 w-48"
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 100,
            height: 3,
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #1E5FFF, #4D84FF)",
              borderRadius: 100,
              height: "100%",
              width: `${progress}%`,
              transition: "width 0.08s linear",
            }}
          />
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "11px",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Loading...
        </p>
      </motion.div>
    </div>
  );
}
