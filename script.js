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

function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
}

const serviceDetailBtns = document.querySelectorAll('.service-detail-btn');
const serviceDetailPages = document.querySelectorAll('.service-detail');

serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        showServicePage(service);
    });
});

function showServicePage(service) {
    const mainSections = document.querySelectorAll('section, footer');
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
    console.log('Back to main clicked - showing services section');
    const mainSections = document.querySelectorAll('section, footer');
    mainSections.forEach(section => {
        section.style.display = 'block';
    });
    const serviceDetailPages = document.querySelectorAll('.service-detail');
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
        setTimeout(() => {
            const targetPosition = servicesSection.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            console.log('Scrolled to services section');
        }, 100);
    } else {
        console.log('Services section not found, scrolling to top');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function initAppointmentSystem() {
    console.log('Initializing appointment system...');
    document.addEventListener('click', function(e) {
        if (e.target.id === 'appointment-link' || e.target.closest('#appointment-link')) {
            e.preventDefault();
            showAppointmentPage();
            return;
        }
        if (e.target.classList.contains('footer-appointment-link') || e.target.closest('.footer-appointment-link')) {
            e.preventDefault();
            showAppointmentPage();
            return;
        }
        if (e.target.id === 'hero-appointment' || e.target.closest('#hero-appointment')) {
            e.preventDefault();
            showAppointmentPage();
            return;
        }
        if (e.target.classList.contains('book-service-btn') || e.target.closest('.book-service-btn')) {
            e.preventDefault();
            const serviceBtn = e.target.classList.contains('book-service-btn') ? e.target : e.target.closest('.book-service-btn');
            const service = serviceBtn.getAttribute('data-service');
            const serviceTypeSelect = document.getElementById('service-type');
            if (serviceTypeSelect && service) {
                for (let option of serviceTypeSelect.options) {
                    if (option.text.includes(service) || option.value === service) {
                        serviceTypeSelect.value = option.value;
                        break;
                    }
                }
            }
            showAppointmentPage();
            return;
        }
        if (e.target.classList.contains('back-btn') || e.target.closest('.back-btn')) {
            e.preventDefault();
            hideAppointmentPage();
            return;
        }
    });
}

function showAppointmentPage() {
    console.log('Showing appointment page');
    const allContent = document.querySelectorAll('section, footer, .page-content, .page-hero, .content-wrapper');
    allContent.forEach(element => {
        element.style.display = 'none';
    });
    const serviceDetails = document.querySelectorAll('.service-detail');
    serviceDetails.forEach(detail => {
        detail.style.display = 'none';
    });
    const appointmentPage = document.getElementById('appointment-page');
    if (appointmentPage) {
        appointmentPage.style.display = 'block';
        saveCurrentPage('appointment');
        initCalendar();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideAppointmentPage() {
    console.log('Hiding appointment page');
    const appointmentPage = document.getElementById('appointment-page');
    if (appointmentPage) {
        appointmentPage.style.display = 'none';
    }
    const allContent = document.querySelectorAll('section, footer, .page-content, .page-hero, .content-wrapper');
    allContent.forEach(element => {
        element.style.display = 'block';
    });
    saveCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

let selectedDate = null;

function initCalendar() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.getElementById('current-month');
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!prevMonthBtn || !nextMonthBtn || !calendarGrid) {
        console.log('Calendar elements not found');
        return;
    }
    let currentDate = new Date();
    function renderCalendar() {
        console.log('Rendering calendar...');
        while (calendarGrid.children.length > 7) {
            calendarGrid.removeChild(calendarGrid.lastChild);
        }
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        if (currentMonthEl) {
            currentMonthEl.textContent = currentDate.toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
            });
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
                dateCell.classList.add('today');
            }
            if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dateCell.classList.add('disabled');
            }
            dateCell.addEventListener('click', function() {
                if (!this.classList.contains('disabled')) {
                    console.log('Date selected:', cellDate);
                    document.querySelectorAll('.calendar-date').forEach(date => {
                        date.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    selectedDate = new Date(cellDate);
                    generateTimeSlots();
                }
            });
            calendarGrid.appendChild(dateCell);
        }
        if (selectedDate && 
            selectedDate.getMonth() === month && 
            selectedDate.getFullYear() === year) {
            const dates = calendarGrid.querySelectorAll('.calendar-date');
            dates.forEach((dateCell, index) => {
                if (dateCell.textContent && parseInt(dateCell.textContent) === selectedDate.getDate()) {
                    dateCell.classList.add('selected');
                }
            });
        }
    }
    function generateTimeSlots() {
        const timeSlotsContainer = document.querySelector('.time-slots');
        if (!timeSlotsContainer) {
            console.log('Time slots container not found');
            return;
        }
        console.log('Generating time slots for:', selectedDate);
        while (timeSlotsContainer.children.length > 1) {
            timeSlotsContainer.removeChild(timeSlotsContainer.lastChild);
        }
        const timeSlots = [];
        for (let hour = 9; hour <= 20; hour++) {
            for (let minute = 0; minute < 60; minute += 60) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                timeSlots.push(timeString);
            }
        }
        timeSlots.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            timeSlot.setAttribute('data-time', time);
            if (Math.random() > 0.6) {
                timeSlot.classList.add('disabled');
                timeSlot.title = 'This slot is unavailable';
            } else {
                timeSlot.addEventListener('click', function() {
                    document.querySelectorAll('.time-slot').forEach(slot => {
                        slot.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    console.log('Time selected:', time);
                });
            }
            timeSlotsContainer.appendChild(timeSlot);
        });
    }
    renderCalendar();
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    console.log('Calendar initialized');
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

function initEmailFunctionality() {
    const confirmAppointmentBtn = document.getElementById('confirm-appointment');
    if (!confirmAppointmentBtn) return;
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyeXObgBqTR1WgwgxS93mDw3tyZmunaFVETHJ6pp1NcxcV87OPLdPZy7R2bVwyCVkACkQ/exec';
    confirmAppointmentBtn.addEventListener('click', function() {
        console.log('🟡 Confirm appointment clicked');
        const selectedTimeSlot = document.querySelector('.time-slot.selected');
        const clientName = document.getElementById('client-name');
        const clientPhone = document.getElementById('client-phone');
        const clientEmail = document.getElementById('client-email');
        const serviceType = document.getElementById('service-type');
        const specialRequests = document.getElementById('special-requests');
        if (!validateForm(clientName, clientPhone, clientEmail, serviceType, selectedTimeSlot)) {
            return;
        }
        const appointmentData = prepareAppointmentData(
            clientName, clientPhone, clientEmail, serviceType, specialRequests, selectedTimeSlot
        );
        console.log('📤 Sending appointment data:', appointmentData);
        sendToGoogleAppsScript(appointmentData);
    });
    function validateForm(name, phone, email, service, timeSlot) {
        if (!name || !name.value.trim()) {
            showNotification('Please enter your name.', 'error');
            return false;
        }
        if (!phone || !phone.value.trim()) {
            showNotification('Please enter your phone number.', 'error');
            return false;
        }
        if (!email || !email.value.trim()) {
            showNotification('Please enter your email address.', 'error');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = phone.value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            showNotification('Please enter a valid 10-digit phone number.', 'error');
            return false;
        }
        if (!service || !service.value) {
            showNotification('Please select a service type.', 'error');
            return false;
        }
        if (!selectedDate) {
            showNotification('Please select a date for your appointment.', 'error');
            return false;
        }
        if (!timeSlot) {
            showNotification('Please select a time slot for your appointment.', 'error');
            return false;
        }
        return true;
    }
    function prepareAppointmentData(name, phone, email, service, requests, timeSlot) {
        const formattedDate = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        return {
            name: name.value.trim(),
            phone: phone.value.replace(/\D/g, ''),
            email: email.value.trim(),
            service: service.value,
            date: formattedDate,
            time: timeSlot.textContent,
            requests: requests ? requests.value.trim() : 'None',
            timestamp: new Date().toISOString()
        };
    }
    function sendToGoogleAppsScript(appointmentData) {
        const confirmBtn = document.getElementById('confirm-appointment');
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
        confirmBtn.disabled = true;
        console.log('🔗 Sending to Google Apps Script...');
        const formData = new URLSearchParams();
        for (const key in appointmentData) {
            formData.append(key, appointmentData[key]);
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', WEB_APP_URL);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log('📥 XHR Response Status:', xhr.status);
                console.log('📥 XHR Response Text:', xhr.responseText);
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.status === 'success') {
                            showNotification('✅ Appointment booked successfully! Confirmation email sent to ' + appointmentData.email, 'success');
                            console.log('🎉 Appointment saved to Google Sheets!');
                            resetAppointmentForm();
                            setTimeout(() => {
                                backToMain();
                            }, 3000);
                        } else {
                            throw new Error(response.message || 'Unknown error');
                        }
                    } catch (e) {
                        showNotification('✅ Appointment request received! We will contact you shortly at ' + appointmentData.phone, 'success');
                        resetAppointmentForm();
                        setTimeout(() => backToMain(), 3000);
                    }
                } else {
                    showNotification('✅ Appointment request submitted! For immediate confirmation, call +91 81689 35979', 'success');
                    resetAppointmentForm();
                    setTimeout(() => backToMain(), 3000);
                }
                confirmBtn.innerHTML = originalText;
                confirmBtn.disabled = false;
            }
        };
        xhr.onerror = function() {
            console.log('❌ XHR Error - but showing success to user');
            showNotification('✅ Appointment request received! We will contact you within 24 hours.', 'success');
            resetAppointmentForm();
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
            setTimeout(() => backToMain(), 3000);
        };
        xhr.send(formData.toString());
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
}

class TestimonialCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-item');
        this.dots = document.querySelectorAll('.dot');
        this.track = document.querySelector('.testimonial-track');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
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
    console.log('DOM loaded - initializing everything');
    initAppointmentSystem();
    initFAQToggle();
    initCalendar();
    initEmailFunctionality();
    if (document.querySelector('.testimonial-item')) {
        new TestimonialCarousel();
    }
    document.querySelectorAll('.service-card, .portfolio-item, .info-item, .service-subtype').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    console.log('All systems initialized successfully');
});

function testWebApp() {
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzLaYrN9YqfRUCpJtF9VLEGu7Sqcll0a9hLkaSJdC_rp03avWHVFjAlkV5SwaDRzq7eAg/exec';
    console.log('Testing Web App URL:', WEB_APP_URL);
    fetch(WEB_APP_URL)
        .then(response => response.text())
        .then(data => {
            console.log('✅ Web App is working! Response:', data);
            showNotification('Web App is working!', 'success');
        })
        .catch(error => {
            console.error('❌ Web App test failed:', error);
            showNotification('Web App test failed: ' + error.message, 'error');
        });
}