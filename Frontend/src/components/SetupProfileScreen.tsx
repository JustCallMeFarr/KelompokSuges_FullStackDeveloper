import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  onComplete: () => void;
}

export function SetupProfileScreen({ onComplete }: Props) {
  const [displayName, setDisplayName] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const validatePin = (pin: string) => /^\d{6}$/.test(pin);

  const handleSubmit = async () => {
    if (!displayName || !pin) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (!validatePin(pin)) {
      toast.error("PIN harus 6 digit angka");
      return;
    }

    if (pin !== confirmPin) {
      toast.error("Konfirmasi PIN tidak cocok");
      return;
    }

    // 2. BAGIAN UTAMA: Mengganti localStorage.setItem lama dengan request API ke Backend
    try {
      // Ambil data user yang sedang login dari localStorage untuk mendapatkan id_user
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user || !user.id_user) {
        toast.error("Sesi user tidak ditemukan, silahkan login ulang");
        return;
      }

      const response = await fetch("http://localhost:3000/api/profile/setup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id_user, // Mengambil id_user dari localStorage sesuai panduan gambar
          displayName,
          pin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Gagal update profile");
        return;
      }

      toast.success("Profile berhasil disimpan!");

      // update localStorage
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");

      updatedUser.display_name = displayName;
      updatedUser.pin = pin;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setTimeout(() => {
        onComplete();
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menyimpan data ke server");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F4FF] px-6 pt-10 gap-6">

      <h1 className="text-xl font-bold text-[#0A1628]">
        Setup Profile
      </h1>

      {/* DISPLAY NAME */}
      <div>
        <label className="text-sm text-slate-500">Display Name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Nama yang ditampilkan"
          className="w-full p-3 mt-2 rounded-xl border bg-white outline-none"
        />
      </div>

      {/* PIN */}
      <div>
        <label className="text-sm text-slate-500">PIN 6 Digit</label>

        <div className="flex items-center bg-white border rounded-xl px-3 mt-2">
          <input
            type={showPin ? "text" : "password"}
            value={pin}
            maxLength={6}
            inputMode="numeric"
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="******"
            className="w-full p-3 outline-none bg-transparent"
          />

          <button onClick={() => setShowPin(!showPin)}>
            {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* CONFIRM PIN */}
      <div>
        <label className="text-sm text-slate-500">Konfirmasi PIN</label>

        <div className="flex items-center bg-white border rounded-xl px-3 mt-2">
          <input
            type={showConfirmPin ? "text" : "password"}
            value={confirmPin}
            maxLength={6}
            inputMode="numeric"
            onChange={(e) =>
              setConfirmPin(e.target.value.replace(/\D/g, ""))
            }
            placeholder="******"
            className="w-full p-3 outline-none bg-transparent"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPin(!showConfirmPin)}
          >
            {showConfirmPin ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {confirmPin && pin !== confirmPin && (
          <p className="text-red-500 text-sm mt-1">
            PIN tidak cocok
          </p>
        )}

        {confirmPin.length === 6 && pin === confirmPin && (
          <p className="text-green-500 text-sm mt-1">
            PIN cocok
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-4 rounded-xl font-semibold"
      >
        Continue
      </button>
    </div>
  );
}