import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { HomeScreen } from "./components/HomeScreen";
import { TransferScreen } from "./components/TransferScreen";
import { QRScanScreen } from "./components/QRScanScreen";
import { PaymentConfirmScreen } from "./components/PaymentConfirmScreen";
import { PaymentSuccessScreen } from "./components/PaymentSuccessScreen";
import { ReceiptScanScreen } from "./components/ReceiptScanScreen";
import { ReceiptResultScreen } from "./components/ReceiptResultScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { BottomNav } from "./components/BottomNav";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { SetupProfileScreen } from "./components/SetupProfileScreen";
import { PaymentConfirmScanScreen } from "./components/PaymentConfirmScanScreen";

type Screen =
  | "splash"
  | "login"
  | "register"
  | "home"
  | "transfer"
  | "qrscan"
  | "payconfirm"
  | "paysuccess"
  | "receiptscan"
  | "receiptresult"
  | "profile"
  | "history"
  | "setup-profile"
  | "payconfirmscan";

const SCREENS_WITH_NAV = new Set(["home", "transfer", "qrscan", "profile", "history"]);

export default function App() {
  {/* MARKER-MAKE-KIT-INVOKED */ }
  const [screen, setScreen] = useState<Screen>("splash");
  const [navActive, setNavActive] = useState("home");
  const [transferData, setTransferData] = useState({
    rekening: "",
    nama: "",
    jumlah: 0,
    keterangan: "",
  });
  const [paymentData, setPaymentData] = useState({
    merchant: "",
    amount: 0,
    description: "",
  });

  useEffect(() => {
    window.history.replaceState(null, "", `#${screen}`);
  }, [screen]);

  const go = (s: Screen) => {
    setScreen(s);
    if (SCREENS_WITH_NAV.has(s)) setNavActive(s);
  };

  const handleNavChange = (id: string) => {
    setNavActive(id);
    go(id as Screen);
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onComplete={() => go("login")} />;
      case "login":
        return <LoginScreen onLogin={() => go("home")} onRegister={() => go("register")} />;
      case "register":
        return <RegisterScreen onRegister={() => go("setup-profile")} onLogin={() => go("login")} />;
      case "home":
        return <HomeScreen onNavigate={(s) => go(s as Screen)} />;
      case "transfer":
        return (
          <TransferScreen
            onBack={() => go("home")}
            onContinue={(data) => {
              setTransferData(data);
              go("payconfirm");
            }}
          />
        );
      case "qrscan":
        return (
          <QRScanScreen
            onBack={() => go("home")}
            onScanSuccess={(data) => {
              setPaymentData({
                merchant: data.merchant,
                amount: data.amount,
                description: "QR Payment",
              });

              go("payconfirmscan");
            }}
          />
        );
      case "payconfirm":
        return (
          <PaymentConfirmScreen
            transferData={transferData}
            onBack={() => go("transfer")}
            onConfirm={() => go("paysuccess")}
          />
        );

      case "payconfirmscan":
        return (
          <PaymentConfirmScanScreen
            paymentData={paymentData}
            onBack={() => go("qrscan")}
            onConfirm={() => go("paysuccess")}
          />
        );
      case "paysuccess":
        return <PaymentSuccessScreen onHome={() => go("home")} />;
      case "receiptscan":
        return <ReceiptScanScreen onBack={() => go("home")} onScanComplete={() => go("receiptresult")} />;
      case "receiptresult":
        return <ReceiptResultScreen onBack={() => go("receiptscan")} />;
      case "profile":
        return (
          <ProfileScreen
            onLogout={() => {
              localStorage.clear();
              go("login");
            }}
          />
        );
      case "history":
        return <HistoryScreen onBack={() => go("home")} />;
      case "setup-profile":
        return <SetupProfileScreen onComplete={() => go("home")} />;
      default:
        return null;
    }
  };

  const showNav = SCREENS_WITH_NAV.has(screen);

  return (

    <>
      <Toaster richColors position="top-center" />
      <div
        style={{
          minHeight: "100vh",
          background: "#CBD5E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {/* Phone frame */}
        <div
          style={{
            width: 390,
            height: 844,
            background: "#F0F4FF",
            borderRadius: 48,
            overflow: "hidden",
            boxShadow:
              "0 0 0 8px #1A2E4A, 0 0 0 10px #0A1628, 0 40px 80px rgba(10,22,40,0.4), 0 20px 40px rgba(10,22,40,0.3)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Status bar */}
          <div
            style={{
              height: 44,
              background: screen === "qrscan" || screen === "receiptscan" ? "#0A1628" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: screen === "qrscan" || screen === "receiptscan" || screen === "splash" || screen === "login" || screen === "register"
                  ? "white"
                  : "#0A1628",
              }}
            >
              12:30
            </span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {/* Signal bars */}
              <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
                {[6, 9, 12, 14].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: h,
                      borderRadius: 1,
                      background:
                        screen === "qrscan" || screen === "receiptscan" || screen === "splash" || screen === "login" || screen === "register"
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(10,22,40,0.6)",
                    }}
                  />
                ))}
              </div>
              {/* Battery */}
              <div
                style={{
                  width: 22,
                  height: 11,
                  border: `1.5px solid ${screen === "qrscan" || screen === "receiptscan" || screen === "splash" || screen === "login" || screen === "register"
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(10,22,40,0.4)"
                    }`,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  padding: "1.5px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "100%",
                    borderRadius: 2,
                    background: "#10B981",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Home indicator notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 32,
              background: screen === "qrscan" || screen === "receiptscan" || screen === "splash" ? "#0A1628" : "transparent",
              borderRadius: "0 0 20px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: 80,
                height: 4,
                borderRadius: 2,
                background: screen === "qrscan" || screen === "receiptscan" || screen === "splash" || screen === "login" || screen === "register"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(10,22,40,0.2)",
              }}
            />
          </div>

          {/* Screen content */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {renderScreen()}
          </div>

          {/* Bottom nav */}
          {showNav && (
            <div style={{ flexShrink: 0 }}>
              <BottomNav active={navActive} onNavigate={handleNavChange} />
            </div>
          )}

          {/* Home bar */}
          <div
            style={{
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 100,
                height: 4,
                borderRadius: 2,
                background: "rgba(10,22,40,0.15)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
