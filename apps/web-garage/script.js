const API_URL = "http://localhost:8081/api/bookings";
let allBookingsCache = [];
let isAdminAuthenticated = false;

// YOUR CUSTOM PASSCODE HERE
const SECRET_PIN = "shrikk7";

function requestAdminAccess() {
    if (isAdminAuthenticated) {
        openAdminTab();
    } else {
        const modal = document.getElementById("security-modal");
        modal.style.display = "flex";
        const input = document.getElementById("admin-passcode");
        input.value = "";
        input.focus();
    }
}

function verifyAdminPasscode() {
    const enteredPin = document.getElementById("admin-passcode").value.trim();
    const errorMsg = document.getElementById("passcode-error");

    if (enteredPin === SECRET_PIN) {
        isAdminAuthenticated = true;
        closeSecurityModal();
        openAdminTab();
    } else {
        errorMsg.classList.remove("hidden");
    }
}

function closeSecurityModal() {
    document.getElementById("security-modal").style.display = "none";
    document.getElementById("admin-passcode").value = "";
    document.getElementById("passcode-error").classList.add("hidden");
}

function openAdminTab() {
    document.getElementById("booking-view").style.display = "none";
    document.getElementById("admin-view").style.display = "block";

    document.getElementById("nav-book").className = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all text-slate-400 hover:text-white hover:bg-slate-800/60";
    document.getElementById("nav-admin").className = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20";
    
    loadBookings();
}

function openBookingTab() {
    document.getElementById("admin-view").style.display = "none";
    document.getElementById("booking-view").style.display = "grid";

    document.getElementById("nav-admin").className = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all text-slate-400 hover:text-white hover:bg-slate-800/60";
    document.getElementById("nav-book").className = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20";
}

function calculatePrice() {
    const serviceSelect = document.getElementById("serviceType");
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const price = selectedOption.getAttribute("data-price") || "2499";
    document.getElementById("estimated-price").innerText = `?${parseInt(price).toLocaleString("en-IN")}`;
}

// Support Enter key inside passcode input
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("admin-passcode");
    if (input) {
        input.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                verifyAdminPasscode();
            }
        });
    }
});

// POST: Submit Booking Form
document.getElementById("booking-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const statusMsg = document.getElementById("booking-status");
    statusMsg.innerText = "Submitting booking to Dhule Garage system...";
    statusMsg.className = "mt-4 text-center text-sm font-semibold text-amber-400";

    const payload = {
        customerName: document.getElementById("customerName").value,
        phone: document.getElementById("phone").value,
        serviceType: document.getElementById("serviceType").value,
        bookingDate: document.getElementById("bookingDate").value,
        status: "PENDING"
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            statusMsg.innerText = "? Booking Submitted! Status set to PENDING for Owner Approval.";
            statusMsg.className = "mt-4 text-center text-sm font-semibold text-emerald-400";
            document.getElementById("booking-form").reset();
            calculatePrice();
        } else {
            throw new Error("Failed response");
        }
    } catch (err) {
        statusMsg.innerText = "? Connection Failed! Ensure Spring Boot Backend is active on Port 8081.";
        statusMsg.className = "mt-4 text-center text-sm font-semibold text-rose-500";
    }
});

// GET: Load Bookings
async function loadBookings() {
    const tableBody = document.getElementById("admin-table-body");
    tableBody.innerHTML = "<tr><td colspan=\"8\" class=\"p-6 text-center text-amber-400\">Fetching records from Spring Boot DB...</td></tr>";

    try {
        const response = await fetch(API_URL);
        allBookingsCache = await response.json();
        renderAdminTable(allBookingsCache);
        updateKPIStats(allBookingsCache);
    } catch (err) {
        tableBody.innerHTML = "<tr><td colspan=\"8\" class=\"p-6 text-center text-rose-500\">Error connecting to backend database. Is Port 8081 running?</td></tr>";
    }
}

// Render Admin Table
function renderAdminTable(data) {
    const tableBody = document.getElementById("admin-table-body");
    if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan=\"8\" class=\"p-6 text-center text-slate-500\">No bookings found in database.</td></tr>";
        return;
    }

    tableBody.innerHTML = data.map(b => {
        let badgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/30";
        if (b.status === "CONFIRMED") badgeClass = "bg-blue-500/10 text-blue-400 border-blue-500/30";
        if (b.status === "COMPLETED") badgeClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

        const whatsappMsg = encodeURIComponent(`Hello ${b.customerName}, your booking #${b.id} for ${b.serviceType} at AutoFix Pro Garage Dhule is currently: ${b.status}. - Owner Kunal Wagh`);

        return `
            <tr class="hover:bg-slate-800/40 transition">
                <td class="p-3 font-mono font-bold text-slate-400">#${b.id}</td>
                <td class="p-3 font-medium text-slate-100">${b.customerName}</td>
                <td class="p-3 text-slate-300 font-mono">${b.phone}</td>
                <td class="p-3 text-slate-300">${b.serviceType}</td>
                <td class="p-3 text-slate-400">${b.bookingDate}</td>
                <td class="p-3">
                    <span class="px-2.5 py-1 text-xs font-bold rounded-full border ${badgeClass}">
                        ${b.status}
                    </span>
                </td>
                <td class="p-3">
                    <select onchange="updateBookingStatus(${b.id}, this.value)" class="bg-slate-950 border border-amber-500/40 rounded-lg px-2 py-1 text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-500">
                        <option value="PENDING" ${b.status === "PENDING" ? "selected" : ""}>PENDING ?</option>
                        <option value="CONFIRMED" ${b.status === "CONFIRMED" ? "selected" : ""}>ACTIVATE / CONFIRM ?</option>
                        <option value="COMPLETED" ${b.status === "COMPLETED" ? "selected" : ""}>MARK COMPLETED ??</option>
                    </select>
                </td>
                <td class="p-3 text-right">
                    <a href="https://wa.me/91${b.phone}?text=${whatsappMsg}" target="_blank" class="inline-flex items-center gap-1 text-xs bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 px-2.5 py-1 rounded-lg transition">
                        ?? WhatsApp
                    </a>
                </td>
            </tr>
        `;
    }).join("");
}

// KPI Stats
function updateKPIStats(data) {
    document.getElementById("stat-total-clients").innerText = data.length;
    document.getElementById("stat-pending").innerText = data.filter(b => b.status === "PENDING").length;
    document.getElementById("stat-confirmed").innerText = data.filter(b => b.status === "CONFIRMED").length;
    document.getElementById("stat-completed").innerText = data.filter(b => b.status === "COMPLETED").length;
}

// Search Filter
function filterBookings() {
    const query = document.getElementById("admin-search").value.toLowerCase();
    const filtered = allBookingsCache.filter(b => 
        b.customerName.toLowerCase().includes(query) || 
        b.phone.includes(query)
    );
    renderAdminTable(filtered);
}

// PUT Status
async function updateBookingStatus(id, newStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}/status?status=${newStatus}`, {
            method: "PUT"
        });
        if (response.ok) {
            loadBookings();
        }
    } catch (err) {
        alert("Failed to update status in database.");
    }
}
