// apps/web-garage/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Price Estimator Logic
    const services = [
        { id: 'mot', name: 'MOT Test', price: 50 },
        { id: 'full-service', name: 'Full Service', price: 150 },
        { id: 'interim-service', name: 'Interim Service', price: 90 },
        { id: 'repairs', name: 'General Repairs', price: 80 },
        { id: 'tires', name: 'Tire Replacement', price: 100 }
    ];

    const estimatorList = document.getElementById('estimator-list');
    const totalPriceEl = document.getElementById('total-price');

    if (estimatorList) {
        services.forEach(service => {
            const wrapper = document.createElement('div');
            wrapper.className = 'service-option';
            wrapper.innerHTML = `
                <input type="checkbox" id="${service.id}" value="${service.price}" data-name="${service.name}">
                <label for="${service.id}">${service.name} - £${service.price}</label>
            `;
            estimatorList.appendChild(wrapper);
        });

        estimatorList.addEventListener('change', () => {
            let total = 0;
            const checkboxes = estimatorList.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach(cb => {
                total += parseFloat(cb.value);
            });
            totalPriceEl.textContent = `£${total.toFixed(2)}`;
        });
    }

    // 2. Form Submission Handler
    const bookingForm = document.getElementById('appointment-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const bookingData = {
                customerName: document.getElementById('full-name').value,
                phone: document.getElementById('phone').value,
                serviceType: document.getElementById('service-type').value,
                bookingDate: document.getElementById('date-picker').value
            };

            try {
                const response = await fetch('http://localhost:8081/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                });

                if (response.ok) {
                    alert('Booking successful!');
                    bookingForm.reset();
                    // Optionally trigger WhatsApp link generation
                    console.log('WhatsApp Link:', generateWhatsAppLink(bookingData));
                } else {
                    alert('Booking failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Booking failed. Please check your connection.');
            }
        });
    }

    // 4. WhatsApp booking message link generator
    function generateWhatsAppLink(data) {
        const phone = '1234567890';
        const message = `Hi, I would like to book a ${data.serviceType} for ${data.bookingDate}. Name: ${data.customerName}, Phone: ${data.phone}`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }

    // Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize Date Picker
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#date-picker", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
        });
    }
});
