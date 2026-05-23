const API_URL = "http://localhost:3000";

// =======================
// INIT DASHBOARD UI
// =======================
document.body.innerHTML = `
  <div style="
    font-family: Arial;
    background: #f4f6f9;
    min-height: 100vh;
    padding: 30px;
  ">

    <div style="
      max-width: 900px;
      margin: auto;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    ">

      <h1 style="margin-bottom: 10px;">📊 Dashboard KIPK Tracker</h1>
      <p id="status">Status: Checking...</p>

      <hr>

      <div style="margin-bottom: 20px;">
        <button onclick="getDashboard()" style="
          padding: 10px 15px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        ">Load Data</button>

        <button onclick="logout()" style="
          padding: 10px 15px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-left: 10px;
        ">Logout</button>
      </div>

      <div id="cardContainer" style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
      ">
      </div>

      <pre id="output" style="
        background: #111;
        color: #0f0;
        padding: 15px;
        border-radius: 10px;
        margin-top: 20px;
        overflow: auto;
      "></pre>

    </div>
  </div>
`;

// =======================
// CEK LOGIN STATUS
// =======================
const token = localStorage.getItem("token");
document.getElementById("status").innerText =
  token ? "Status: Login ✔️" : "Status: Belum Login ❌";

// =======================
// GET DASHBOARD DATA
// =======================
async function getDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Kamu belum login!");
    return;
  }

  const res = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await res.json();

  // tampilkan JSON debug
  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);

  // render card UI
  renderCards(data);
}

// =======================
// RENDER CARD DASHBOARD
// =======================
function renderCards(data) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  // contoh mapping data (sesuaikan backend kamu)
  const items = [
    { title: "Total Mahasiswa", value: data.totalMahasiswa || 0, color: "#4f46e5" },
    { title: "Transaksi", value: data.totalTransaksi || 0, color: "#10b981" },
    { title: "Beasiswa", value: data.totalBeasiswa || 0, color: "#f59e0b" }
  ];

  items.forEach(item => {
    const card = document.createElement("div");
    card.style = `
      background: ${item.color};
      color: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 15px rgba(0,0,0,0.1);
    `;

    card.innerHTML = `
      <h3>${item.title}</h3>
      <h1>${item.value}</h1>
    `;

    container.appendChild(card);
  });
}

// =======================
// LOGOUT
// =======================
function logout() {
  localStorage.removeItem("token");
  alert("Logout berhasil");
  location.reload();
}