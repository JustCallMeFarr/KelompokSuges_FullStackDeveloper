import { Home, QrCode, ArrowLeftRight, Clock, User } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "qrscan", icon: QrCode, label: "Scan" },
    { id: "transfer", icon: ArrowLeftRight, label: "Transfer" },
    { id: "history", icon: Clock, label: "History" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div
      style={{
        background: "white",
        borderTop: "1px solid rgba(30,95,255,0.1)",
        boxShadow: "0 -4px 20px rgba(10,22,40,0.08)",
      }}
      className="flex items-center justify-around px-2 py-2 pb-4"
    >
      {items.map(({ id, icon: Icon, label }) => {
        const isActive = active === id;
        const isCenter = id === "qrscan";

        if (isCenter) {
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center gap-1 -mt-6"
            >
              <div
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #1E5FFF, #4D84FF)"
                    : "linear-gradient(135deg, #0A1628, #1A2E4A)",
                  boxShadow: "0 4px 16px rgba(30,95,255,0.4)",
                }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
              >
                <Icon size={24} color="white" />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: isActive ? "#1E5FFF" : "#94A3B8",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex flex-col items-center gap-1 py-1 px-3"
          >
            <Icon size={20} color={isActive ? "#1E5FFF" : "#94A3B8"} />
            <span
              style={{
                fontSize: "10px",
                color: isActive ? "#1E5FFF" : "#94A3B8",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {label}
            </span>
            {isActive && (
              <div
                style={{ background: "#1E5FFF" }}
                className="w-1 h-1 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
