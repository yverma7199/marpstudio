// Initialize particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#d4af37" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#d4af37",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Service Detail Pages
const serviceDetailBtns = document.querySelectorAll('.service-detail-btn');
const serviceDetailPages = document.querySelectorAll('.service-detail');
const mainSections = document.querySelectorAll('section, footer');

serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        const serviceDetailPage = document.getElementById(`${service}-detail`);

        // Hide all main sections
        mainSections.forEach(section => {
            section.style.display = 'none';
        });

        // Hide other service detail pages
        serviceDetailPages.forEach(page => {
            page.style.display = 'none';
        });

        // Show the selected service detail page
        if (serviceDetailPage) {
            serviceDetailPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Book Service Buttons
const bookServiceBtns = document.querySelectorAll('.book-service-btn');
bookServiceBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        document.getElementById('service-type').value = service;
        showAppointmentPage();
    });
});

// Back to main page functionality
function backToMain() {
    // Show all main sections
    mainSections.forEach(section => {
        section.style.display = 'block';
    });

    // Hide all service detail pages
    serviceDetailPages.forEach(page => {
        page.style.display = 'none';
    });

    // Hide appointment page
    document.getElementById('appointment-page').style.display = 'none';
}

// Add back buttons to service detail pages
serviceDetailPages.forEach(page => {
    const backBtn = document.createElement('button');
    backBtn.className = 'btn';
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Services';
    backBtn.style.marginBottom = '30px';
    backBtn.addEventListener('click', backToMain);
    page.querySelector('.container').insertBefore(backBtn, page.querySelector('.section-title'));
});

// Appointment Page
const appointmentLink = document.getElementById('appointment-link');
const heroAppointmentBtn = document.getElementById('hero-appointment');
const appointmentPage = document.getElementById('appointment-page');

function showAppointmentPage() {
    // Hide all main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Hide service detail pages
    serviceDetailPages.forEach(page => {
        page.style.display = 'none';
    });

    // Show appointment page
    appointmentPage.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

appointmentLink.addEventListener('click', function (e) {
    e.preventDefault();
    showAppointmentPage();
});

heroAppointmentBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showAppointmentPage();
});

// Add back button to appointment page
const appointmentBackBtn = document.createElement('button');
appointmentBackBtn.className = 'btn';
appointmentBackBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Home';
appointmentBackBtn.style.marginBottom = '30px';
appointmentBackBtn.addEventListener('click', backToMain);
appointmentPage.querySelector('.container').insertBefore(appointmentBackBtn, appointmentPage.querySelector('.section-title'));

// Calendar functionality
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const currentMonthEl = document.getElementById('current-month');
const calendarGrid = document.querySelector('.calendar-grid');
const timeSlotsContainer = document.querySelector('.time-slots');
const notification = document.getElementById('notification');

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    // Clear existing dates (keep day headers)
    while (calendarGrid.children.length > 7) {
        calendarGrid.removeChild(calendarGrid.lastChild);
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update current month display
    currentMonthEl.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-date disabled';
        emptyCell.textContent = '';
        calendarGrid.appendChild(emptyCell);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.className = 'calendar-date';
        dateCell.textContent = day;

        const cellDate = new Date(year, month, day);

        // Mark today
        const today = new Date();
        if (cellDate.toDateString() === today.toDateString()) {
            dateCell.classList.add('selected');
            selectedDate = cellDate;
        }

        // Disable past dates
        if (cellDate < today) {
            dateCell.classList.add('disabled');
        }

        dateCell.addEventListener('click', function () {
            if (!this.classList.contains('disabled')) {
                // Remove selected class from all dates
                document.querySelectorAll('.calendar-date').forEach(date => {
                    date.classList.remove('selected');
                });

                // Add selected class to clicked date
                this.classList.add('selected');
                selectedDate = cellDate;

                // Generate time slots for selected date
                generateTimeSlots();
            }
        });

        calendarGrid.appendChild(dateCell);
    }

    // Generate time slots if a date is selected
    if (selectedDate) {
        generateTimeSlots();
    }
}

function generateTimeSlots() {
    // Clear existing time slots
    while (timeSlotsContainer.children.length > 1) {
        timeSlotsContainer.removeChild(timeSlotsContainer.lastChild);
    }

    // Generate time slots from 9 AM to 6 PM
    for (let hour = 9; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';

            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeSlot.textContent = timeString;

            // Randomly disable some time slots for demo purposes
            if (Math.random() > 0.7) {
                timeSlot.classList.add('disabled');
            } else {
                timeSlot.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        // Remove selected class from all time slots
                        document.querySelectorAll('.time-slot').forEach(slot => {
                            slot.classList.remove('selected');
                        });

                        // Add selected class to clicked time slot
                        this.classList.add('selected');
                    }
                });
            }

            timeSlotsContainer.appendChild(timeSlot);
        }
    }
}

// Initialize calendar
renderCalendar();

// Month navigation
prevMonthBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Email sending function (simulated)
function sendEmails(appointmentData) {
    // In a real implementation, this would connect to a backend service
    // For demo purposes, we'll simulate the email sending

    // Admin email
    console.log(`Sending email to admin: yamanverma02@gmail.com`);
    console.log(`Subject: New Appointment Booking`);
    console.log(`Body: 
                New appointment booked:
                Name: ${appointmentData.name}
                Phone: ${appointmentData.phone}
                Email: ${appointmentData.email}
                Service: ${appointmentData.service}
                Date: ${appointmentData.date}
                Time: ${appointmentData.time}
                Special Requests: ${appointmentData.requests || 'None'}
            `);

    // Client confirmation email
    console.log(`Sending confirmation email to: ${appointmentData.email}`);
    console.log(`Subject: MARP Studio Appointment Confirmation`);
    console.log(`Body: 
                Dear ${appointmentData.name},
                
                Thank you for booking an appointment with MARP Studio!
                
                Your appointment details:
                Service: ${appointmentData.service}
                Date: ${appointmentData.date}
                Time: ${appointmentData.time}
                
                We look forward to helping you look your best!
                
                Warm regards,
                Poonam Rohilla
                MARP Studio
            `);

    // In a real implementation, you would use a service like EmailJS, 
    // a backend API, or a serverless function to send actual emails
}

// Confirm appointment
const confirmAppointmentBtn = document.getElementById('confirm-appointment');
confirmAppointmentBtn.addEventListener('click', function () {
    const selectedTimeSlot = document.querySelector('.time-slot.selected');
    const clientName = document.getElementById('client-name').value;
    const clientPhone = document.getElementById('client-phone').value;
    const clientEmail = document.getElementById('client-email').value;
    const serviceType = document.getElementById('service-type').value;
    const specialRequests = document.getElementById('special-requests').value;

    if (!clientName || !clientPhone || !clientEmail || !serviceType) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!selectedDate) {
        alert('Please select a date for your appointment.');
        return;
    }

    if (!selectedTimeSlot) {
        alert('Please select a time slot for your appointment.');
        return;
    }

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Prepare appointment data
    const appointmentData = {
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        service: serviceType,
        date: formattedDate,
        time: selectedTimeSlot.textContent,
        requests: specialRequests
    };

    // Send emails
    sendEmails(appointmentData);

    // Show success notification
    showNotification();

    // Reset form and selection
    document.getElementById('appointmentForm').reset();
    document.querySelectorAll('.calendar-date.selected').forEach(date => {
        date.classList.remove('selected');
    });
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    selectedDate = null;

    // Return to main page after a delay
    setTimeout(() => {
        backToMain();
    }, 3000);
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .info-item, .service-subtype').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});