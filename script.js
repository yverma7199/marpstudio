// Simple page state management
function saveCurrentPage(page) {
    sessionStorage.setItem('currentPage', page);
}

function loadCurrentPage() {
    return sessionStorage.getItem('currentPage');
}

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

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 100);
    }
});

// Portfolio Filter
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

// Smooth Scrolling for Navigation Links
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

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    });
}

// FAQ Toggle Functionality
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
        
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Service Detail Navigation
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
    
    // Hide all main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Hide all service detail pages
    serviceDetailPages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show the selected service page
    if (servicePage) {
        servicePage.style.display = 'block';
        saveCurrentPage(service);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to Main Function
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
    const appointmentPage = document.getElementById('appointment-page');
    if (appointmentPage) {
        appointmentPage.style.display = 'none';
    }
    
    // Save home state
    saveCurrentPage('home');
    
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        window.scrollTo({
            top: servicesSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Appointment Page Functionality
function initAppointmentPage() {
    const appointmentLink = document.getElementById('appointment-link');
    const heroAppointmentBtn = document.getElementById('hero-appointment');
    const appointmentPage = document.getElementById('appointment-page');
    const footerAppointmentLinks = document.querySelectorAll('.footer-appointment-link');

    function showAppointmentPage() {
        // Hide all main sections
        const mainSections = document.querySelectorAll('section, footer');
        mainSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Hide all service detail pages
        const serviceDetailPages = document.querySelectorAll('.service-detail');
        serviceDetailPages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Show appointment page
        if (appointmentPage) {
            appointmentPage.style.display = 'block';
            saveCurrentPage('appointment');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Header appointment link
    if (appointmentLink) {
        appointmentLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAppointmentPage();
        });
    }

    // Hero appointment button
    if (heroAppointmentBtn) {
        heroAppointmentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAppointmentPage();
        });
    }

    // Footer appointment links
    footerAppointmentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showAppointmentPage();
        });
    });

    // Book service buttons
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

    // Contact page appointment buttons
    const contactAppointmentBtns = document.querySelectorAll('.contact-appointment-btn');
    contactAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showAppointmentPage();
        });
    });
}

// Calendar Functionality
function initCalendar() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.getElementById('current-month');
    const calendarGrid = document.querySelector('.calendar-grid');
    const timeSlotsContainer = document.querySelector('.time-slots');

    if (!prevMonthBtn || !nextMonthBtn || !calendarGrid) return;

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
        if (currentMonthEl) {
            currentMonthEl.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        }
        
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
            
            dateCell.addEventListener('click', function() {
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
        if (!timeSlotsContainer) return;
        
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
                    timeSlot.addEventListener('click', function() {
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
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    
    // Set color based on type
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

// Working Email Functionality
function initEmailFunctionality() {
    const confirmAppointmentBtn = document.getElementById('confirm-appointment');
    
    if (!confirmAppointmentBtn) return;

    function sendEmails(appointmentData) {
        // Show loading state
        const confirmBtn = document.getElementById('confirm-appointment');
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        confirmBtn.disabled = true;

        // Simulate API call to backend
        setTimeout(() => {
            // This is where you would integrate with a real email service
            // For now, we'll simulate success
            
            // Send to admin (yamanverma02@gmail.com)
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
            
            // Send confirmation to client
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
            
            // Show success notification
            showNotification('Appointment booked successfully! Confirmation email sent to ' + appointmentData.email, 'success');
            
            // Reset button
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
            
            // Reset form and return to main page after delay
            resetAppointmentForm();
            
            setTimeout(() => {
                backToMain();
            }, 3000);
            
        }, 2000); // Simulate 2 second delay
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
    }

    confirmAppointmentBtn.addEventListener('click', function() {
        const selectedTimeSlot = document.querySelector('.time-slot.selected');
        const clientName = document.getElementById('client-name');
        const clientPhone = document.getElementById('client-phone');
        const clientEmail = document.getElementById('client-email');
        const serviceType = document.getElementById('service-type');
        const specialRequests = document.getElementById('special-requests');
        
        // Validation
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
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientEmail.value)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Phone validation (basic)
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

// Testimonial Carousel
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
        // Add event listeners for navigation
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Add event listeners for dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause auto-play on hover
        if (this.track) {
            this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
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
        this.stopAutoPlay(); // Clear any existing interval
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

// Scroll Animations
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ toggle
    initFAQToggle();
    
    // Initialize appointment page functionality
    initAppointmentPage();
    
    // Initialize calendar
    initCalendar();
    
    // Initialize email functionality
    initEmailFunctionality();
    
    // Initialize testimonial carousel
    new TestimonialCarousel();
    
    // Restore page state
    const savedPage = loadCurrentPage();
    if (savedPage && savedPage !== 'home') {
        if (savedPage === 'appointment') {
            showAppointmentPage();
        } else {
            showServicePage(savedPage);
        }
    }
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .info-item, .service-subtype').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});