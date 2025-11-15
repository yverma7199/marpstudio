function saveCurrentPage(page) {
    sessionStorage.setItem('currentPage', page);
}

function loadCurrentPage() {
    return sessionStorage.getItem('currentPage');
}

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

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 100);
    }
});

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
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
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            if(navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('faq-question') || e.target.closest('.faq-question') || e.target.classList.contains('faq-toggle')) {
        const faqItem = e.target.closest('.faq-item');
        if (faqItem) {
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            faqItem.classList.toggle('active');
        }
    }
});

const serviceDetailBtns = document.querySelectorAll('.service-detail-btn');
const serviceDetailPages = document.querySelectorAll('.service-detail');
const mainSections = document.querySelectorAll('section, footer');

serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        showServicePage(service);
    });
});

function showServicePage(service) {
    const servicePage = document.getElementById(`${service}-detail`);
    mainSections.forEach(section => {
        section.style.display = 'none';
    });
    serviceDetailPages.forEach(page => {
        page.style.display = 'none';
    });
    if (servicePage) {
        servicePage.style.display = 'block';
        saveCurrentPage(service);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToMain() {
    mainSections.forEach(section => {
        section.style.display = 'block';
    });
    serviceDetailPages.forEach(page => {
        page.style.display = 'none';
    });
    const appointmentPage = document.getElementById('appointment-page');
    if (appointmentPage) {
        appointmentPage.style.display = 'none';
    }
    saveCurrentPage('home');
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        window.scrollTo({
            top: servicesSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

const appointmentLink = document.getElementById('appointment-link');
const heroAppointmentBtn = document.getElementById('hero-appointment');
const appointmentPage = document.getElementById('appointment-page');

function showAppointmentPage() {
    mainSections.forEach(section => {
        section.style.display = 'none';
    });
    serviceDetailPages.forEach(page => {
        page.style.display = 'none';
    });
    if (appointmentPage) {
        appointmentPage.style.display = 'block';
        saveCurrentPage('appointment');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (appointmentLink) {
    appointmentLink.addEventListener('click', function(e) {
        e.preventDefault();
        showAppointmentPage();
    });
}

if (heroAppointmentBtn) {
    heroAppointmentBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showAppointmentPage();
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('footer-appointment-link')) {
        e.preventDefault();
        showAppointmentPage();
    }
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('book-service-btn')) {
        const service = e.target.getAttribute('data-service');
        const serviceTypeSelect = document.getElementById('service-type');
        if (serviceTypeSelect) {
            serviceTypeSelect.value = service;
        }
        showAppointmentPage();
    }
});

const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const currentMonthEl = document.getElementById('current-month');
const calendarGrid = document.querySelector('.calendar-grid');
const timeSlotsContainer = document.querySelector('.time-slots');
let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    if (!calendarGrid) return;
    while (calendarGrid.children.length > 7) {
        calendarGrid.removeChild(calendarGrid.lastChild);
    }
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    if (currentMonthEl) {
        currentMonthEl.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-date disabled';
        emptyCell.textContent = '';
        calendarGrid.appendChild(emptyCell);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.className = 'calendar-date';
        dateCell.textContent = day;
        const cellDate = new Date(year, month, day);
        const today = new Date();
        if (cellDate.toDateString() === today.toDateString()) {
            dateCell.classList.add('selected');
            selectedDate = cellDate;
        }
        if (cellDate < today) {
            dateCell.classList.add('disabled');
        }
        dateCell.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                document.querySelectorAll('.calendar-date').forEach(date => {
                    date.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedDate = cellDate;
                generateTimeSlots();
            }
        });
        calendarGrid.appendChild(dateCell);
    }
    if (selectedDate) {
        generateTimeSlots();
    }
}

function generateTimeSlots() {
    if (!timeSlotsContainer) return;
    while (timeSlotsContainer.children.length > 1) {
        timeSlotsContainer.removeChild(timeSlotsContainer.lastChild);
    }
    for (let hour = 9; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeSlot.textContent = timeString;
            if (Math.random() > 0.7) {
                timeSlot.classList.add('disabled');
            } else {
                timeSlot.addEventListener('click', function() {
                    if (!this.classList.contains('disabled')) {
                        document.querySelectorAll('.time-slot').forEach(slot => {
                            slot.classList.remove('selected');
                        });
                        this.classList.add('selected');
                    }
                });
            }
            timeSlotsContainer.appendChild(timeSlot);
        }
    }
}

if (prevMonthBtn && nextMonthBtn) {
    renderCalendar();
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    if (type === 'success') {
        notification.style.background = 'var(--primary)';
        notification.style.color = 'var(--dark)';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
        notification.style.color = 'white';
    }
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function sendEmails(appointmentData) {
    const confirmBtn = document.getElementById('confirm-appointment');
    if (!confirmBtn) return;
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    confirmBtn.disabled = true;
    setTimeout(() => {
        console.log('=== ADMIN EMAIL ===');
        console.log('To: yamanverma02@gmail.com');
        console.log('Subject: New Appointment Booking - MARP Studio');
        console.log('Body:');
        console.log('New appointment booking received:');
        console.log('Name:', appointmentData.name);
        console.log('Phone:', appointmentData.phone);
        console.log('Email:', appointmentData.email);
        console.log('Service:', appointmentData.service);
        console.log('Date:', appointmentData.date);
        console.log('Time:', appointmentData.time);
        console.log('Special Requests:', appointmentData.requests);
        console.log('==================');
        console.log('=== CLIENT EMAIL ===');
        console.log('To:', appointmentData.email);
        console.log('Subject: Appointment Confirmation - MARP Studio');
        console.log('Body:');
        console.log('Dear ' + appointmentData.name + ',');
        console.log('Your appointment has been confirmed!');
        console.log('Service: ' + appointmentData.service);
        console.log('Date: ' + appointmentData.date);
        console.log('Time: ' + appointmentData.time);
        console.log('We look forward to seeing you at MARP Studio!');
        console.log('Best regards,');
        console.log('Poonam Rohilla');
        console.log('MARP Studio');
        console.log('==================');
        showNotification('Appointment booked successfully! Confirmation email sent to ' + appointmentData.email, 'success');
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        resetAppointmentForm();
        setTimeout(() => {
            backToMain();
        }, 3000);
    }, 2000);
}

function resetAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.reset();
    }
    document.querySelectorAll('.calendar-date.selected').forEach(date => {
        date.classList.remove('selected');
    });
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    selectedDate = null;
}

const confirmAppointmentBtn = document.getElementById('confirm-appointment');
if (confirmAppointmentBtn) {
    confirmAppointmentBtn.addEventListener('click', function() {
        const selectedTimeSlot = document.querySelector('.time-slot.selected');
        const clientName = document.getElementById('client-name');
        const clientPhone = document.getElementById('client-phone');
        const clientEmail = document.getElementById('client-email');
        const serviceType = document.getElementById('service-type');
        const specialRequests = document.getElementById('special-requests');
        if (!clientName || !clientName.value || !clientPhone || !clientPhone.value || !clientEmail || !clientEmail.value || !serviceType || !serviceType.value) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        if (!selectedDate) {
            showNotification('Please select a date for your appointment.', 'error');
            return;
        }
        if (!selectedTimeSlot) {
            showNotification('Please select a time slot for your appointment.', 'error');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientEmail.value)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = clientPhone.value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            showNotification('Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        const formattedDate = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const appointmentData = {
            name: clientName.value,
            phone: clientPhone.value,
            email: clientEmail.value,
            service: serviceType.value,
            date: formattedDate,
            time: selectedTimeSlot.textContent,
            requests: specialRequests ? specialRequests.value : 'None'
        };
        sendEmails(appointmentData);
    });
}

class TestimonialCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-item');
        this.dots = document.querySelectorAll('.dot');
        this.track = document.querySelector('.testimonial-track');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        if (this.slides.length > 0) {
            this.init();
        }
    }
    init() {
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        this.startAutoPlay();
        if (this.track) {
            this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        this.currentSlide = index;
    }
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    goToSlide(index) {
        this.showSlide(index);
    }
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

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

document.addEventListener('DOMContentLoaded', function() {
    const savedPage = loadCurrentPage();
    if (savedPage && savedPage !== 'home') {
        if (savedPage === 'appointment') {
            showAppointmentPage();
        } else {
            showServicePage(savedPage);
        }
    }
    new TestimonialCarousel();
    document.querySelectorAll('.service-card, .portfolio-item, .info-item, .service-subtype, .policy-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});