const API_URL = "http://localhost:8081/api/bookings";
let allBookingsCache = [];
let isAdminAuthenticated = false;

const SECRET_PIN = "shrikk7";

function downloadPdfSlip() {
    window.print();
}

function openBookingTab() {
    document.getElementById("booking-view").style.display = "grid";
    document.getElementById("track-view").style.display = "none";
    document.getElementById("admin-view").style.display = "none";
    setNavActive("nav-book");
}

function openTrackTab() {
    document.getElementById("booking-view").style.display = "none";
    document.getElementById("track-view").style.display = "block";
    document.getElementById("admin-view").style.display = "none";
    setNavActive("nav-track");
}

function openAdminTab() {
    document.getElementById("booking-view").style.display = "none";
    document.getElementById("track-view").style.display = "none";
    document.getElementById("admin-view").style.display = "block";
    setNavActive("nav-admin");
    loadBookings();
}

function setNavActive(activeId) {
    ["nav-book", "nav-track", "nav-admin"].forEach(id => {
        const btn = document.getElementById(id);
        if (id === activeId) {
            btn.className = "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20";
        } else {
            btn.className = "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white hover:bg-slate-800/60";
        }
    });
}

function requestAdminAccess() {
    if (isAdminAuthenticated) {
        openAdminTab();
    } else {
        const modal = document.getElementById("security-modal");
        modal.style.display = "flex";
        const input = document.getElementById("admin-passcode");
        input.value = "";
        document.getElementById("passcode-error").classList.add("hidden");
        setTimeout(() => input.focus(), 100);
    }
}

function verifyAdminPasscode() {
    const input = document.getElementById("admin-passcode");
    const enteredPin = input.value.trim().toLowerCase();
    const errorMsg = document.getElementById("passcode-error");

    if (enteredPin === SECRET_PIN.toLowerCase()) {
        isAdminAuthenticated = true;
        closeSecurityModal();
        openAdminTab();
    } else {
        errorMsg.classList.remove("hidden");
        input.value = "";
        input.focus();
    }
}

function closeSecurityModal() {
    document.getElementById("security-modal").style.display = "none";
}

function closeSlipModal() {
    document.getElementById("slip-modal").style.display = "none";
}

document.getElementById("booking-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const statusMsg = document.getElementById("booking-status");
    statusMsg.innerText = "Submitting booking to Wagh Garage system...";
    statusMsg.className = "mt-4 text-center text-sm font-semibold text-amber-400";

    const customerName = document.getElementById("customerName").value;
    const phone = document.getElementById("phone").value;
    const serviceType = document.getElementById("serviceType").value;
    const bookingDate = document.getElementById("bookingDate").value;

    const serviceSelect = document.getElementById("serviceType");
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const price = selectedOption.getAttribute("data-price") || "2499";

    const payload = {
        customerName: customerName,
        phone: phone,
        serviceType: serviceType,
        bookingDate: bookingDate,
        status: "PENDING"
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const savedData = await response.json();
            statusMsg.innerText = "Booking Submitted Successfully!";
            statusMsg.className = "mt-4 text-center text-sm font-semibold text-emerald-400";
            
            document.getElementById("slip-id-badge").innerText = `#GAR-${savedData.id || "NEW"}`;
            document.getElementById("slip-customer").innerText = customerName;
            document.getElementById("slip-phone").innerText = phone;
            document.getElementById("slip-service").innerText = serviceType;
            document.getElementById("slip-date").innerText = bookingDate;
            document.getElementById("slip-cost").innerText = `INR ${parseInt(price).toLocaleString("en-IN")}`;
            
            document.getElementById("slip-modal").style.display = "flex";
            document.getElementById("booking-form").reset();
            calculatePrice();
        } else {
            throw new Error("Failed response");
        }
    } catch (err) {
        statusMsg.innerText = "Connection Failed! Ensure Spring Boot Backend is active on Port 8081.";
        statusMsg.className = "mt-4 text-center text-sm font-semibold text-rose-500";
    }
});

function calculatePrice() {
    const serviceSelect = document.getElementById("serviceType");
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const price = selectedOption.getAttribute("data-price") || "2499";
    document.getElementById("estimated-price").innerText = `INR ${parseInt(price).toLocaleString("en-IN")}`;
}

async function searchCustomerBooking() {
    const query = document.getElementById("track-input").value.trim().toLowerCase();
    const resultDiv = document.getElementById("track-result");

    if (!query) {
        resultDiv.innerHTML = "<p class=\"text-center text-xs text-rose-400 py-4\">Please enter a Mobile Number or Slip ID.</p>";
        return;
    }

    resultDiv.innerHTML = "<p class=\"text-center text-xs text-amber-400 py-4\">Searching database records...</p>";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const found = data.filter(b => 
            b.phone.includes(query) || 
            b.id.toString() === query ||
            `gar-${b.id}` === query
        );

        if (found.length === 0) {
            resultDiv.innerHTML = "<p class=\"text-center text-xs text-slate-400 py-4\">No matching booking found for this input.</p>";
            return;
        }

        resultDiv.innerHTML = found.map(b => {
            let statusColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
            let statusText = "PENDING FOR WORKSHOP APPROVAL";

            if (b.status === "CONFIRMED") {
                statusColor = "text-blue-400 bg-blue-500/10 border-blue-500/30";
                statusText = "SERVICE IN PROGRESS / CONFIRMED";
            } else if (b.status === "COMPLETED") {
                statusColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
                statusText = "SERVICING COMPLETED & READY FOR DELIVERY";
            }

            return `
                <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 mb-3">
                    <div class="flex justify-between items-center">
                        <span class="font-mono font-bold text-amber-400 text-xs">#GAR-${b.id}</span>
                        <span class="text-slate-400 text-xs">${b.bookingDate}</span>
                    </div>
                    <div class="text-sm font-bold text-white">${b.customerName} (${b.phone})</div>
                    <div class="text-xs text-slate-300">Service: <span class="font-semibold text-slate-100">${b.serviceType}</span></div>
                    <div class="p-2.5 rounded-lg border text-xs font-bold text-center ${statusColor}">
                        Status: ${statusText}
                    </div>
                </div>
            `;
        }).join("");

    } catch (err) {
        resultDiv.innerHTML = "<p class=\"text-center text-xs text-rose-500 py-4\">Error connecting to server.</p>";
    }
}

document.addEventListener("keydown", function(event) {
    const secModal = document.getElementById("security-modal");
    if (secModal && secModal.style.display === "flex" && event.key === "Enter") {
        event.preventDefault();
        verifyAdminPasscode();
    }
});

async function loadBookings() {
    const tableBody = document.getElementById("admin-table-body");
    tableBody.innerHTML = "<tr><td colspan=\"8\" class=\"p-6 text-center text-amber-400\">Fetching records...</td></tr>";

    try {
        const response = await fetch(API_URL);
        allBookingsCache = await response.json();
        renderAdminTable(allBookingsCache);
        updateKPIStats(allBookingsCache);
    } catch (err) {
        tableBody.innerHTML = "<tr><td colspan=\"8\" class=\"p-6 text-center text-rose-500\">Error connecting to backend database. Is Port 8081 running?</td></tr>";
    }
}

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

        const whatsappMsg = encodeURIComponent(`Hello ${b.customerName}, your booking #GAR-${b.id} for ${b.serviceType} at Wagh AutoFix Pro Garage Dhule is currently: ${b.status}. - Owner Kunal Wagh`);

        return `
            <tr class="hover:bg-slate-800/40 transition">
                <td class="p-3 font-mono font-bold text-slate-400">#GAR-${b.id}</td>
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
                        <option value="PENDING" ${b.status === "PENDING" ? "selected" : ""}>PENDING</option>
                        <option value="CONFIRMED" ${b.status === "CONFIRMED" ? "selected" : ""}>ACTIVATE / CONFIRM</option>
                        <option value="COMPLETED" ${b.status === "COMPLETED" ? "selected" : ""}>MARK COMPLETED</option>
                    </select>
                </td>
                <td class="p-3 text-right">
                    <a href="https://wa.me/91${b.phone}?text=${whatsappMsg}" target="_blank" class="inline-flex items-center gap-1 text-xs bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 px-2.5 py-1 rounded-lg transition">
                        WhatsApp
                    </a>
                </td>
            </tr>
        `;
    }).join("");
}

function updateKPIStats(data) {
    document.getElementById("stat-total-clients").innerText = data.length;
    document.getElementById("stat-pending").innerText = data.filter(b => b.status === "PENDING").length;
    document.getElementById("stat-confirmed").innerText = data.filter(b => b.status === "CONFIRMED").length;
    document.getElementById("stat-completed").innerText = data.filter(b => b.status === "COMPLETED").length;
}

function filterBookings() {
    const query = document.getElementById("admin-search").value.toLowerCase();
    const filtered = allBookingsCache.filter(b => 
        b.customerName.toLowerCase().includes(query) || 
        b.phone.includes(query)
    );
    renderAdminTable(filtered);
}

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
