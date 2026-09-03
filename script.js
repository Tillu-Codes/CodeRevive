/* ==========================================================
   Matrusri Engineering College - College Portal Script
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // 0. Page Opening Animation Sequence (Task 1)
    (function initPageIntro() {
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var introTargets = [
            { sel: '.site-header',           cls: 'intro-slide-down', delay: 0 },
            { sel: '.brand-logo',            cls: 'intro-slide-up',   delay: 100 },
            { sel: '.hero-tagline',          cls: 'intro-slide-up',   delay: 220 },
            { sel: '.hero-title',            cls: 'intro-slide-up',   delay: 340 },
            { sel: '.hero-description',      cls: 'intro-slide-up',   delay: 460 },
            { sel: '.hero-buttons',          cls: 'intro-slide-up',   delay: 560 },
            { sel: '.hero-highlights',       cls: 'intro-slide-up',   delay: 660 },
            { sel: '.hero-visual',           cls: 'intro-scale',      delay: 300 }
        ];
        introTargets.forEach(function (t) {
            var el = document.querySelector(t.sel);
            if (!el) return;
            el.classList.add('intro-item', t.cls);
            if (prefersReducedMotion) {
                el.classList.add('intro-visible');
            } else {
                setTimeout(function () { el.classList.add('intro-visible'); }, t.delay);
            }
        });
    })();

    // 1. Mobile Menu Navigation
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.navigation');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            // Toggle mobile navigation visibility
            navMenu.classList.toggle('show');
        });
    }

    // 2. Department Data & Modal
    const departmentData = {
        cse: {
            name: "Computer Science & Engineering",
            head: "Dr. T. Raghunadha Reddy",
            facultyCount: "42 Faculty Members",
            labs: "AI & Robotics Lab, Cloud Computing Center, Network Security Lab",
            description: "The Department of Computer Science & Engineering offers cutting-edge curriculum spanning full-stack engineering, machine intelligence, distributed systems, and cybersecurity.",
            intake: "B.Tech: 180 seats | M.Tech: 60 seats"
        },
        ece: {
            name: "Electronics & Communication Engineering",
            head: "Dr. N. Shribala",
            facultyCount: "35 Faculty Members",
            labs: "VLSI Design Center, Embedded IoT Lab, Advanced Microwave Lab",
            description: "Pioneering research in chip architecture, cellular communication systems, DSP processors, and satellite telemetry.",
            intake: "B.Tech: 120 seats | M.Tech: 30 seats"
        },
        me: {
            name: "Mechanical Engineering",
            head: "Dr. G. Amarender Rao",
            facultyCount: "28 Faculty Members",
            labs: "CNC & Manufacturing Lab, Thermal Dynamics Center, CAD/CAM Studio",
            description: "Focusing on rapid prototyping, fluid mechanics, mechatronics, and sustainable automotive engineering.",
            intake: "B.Tech: 120 seats | M.Tech: 30 seats"
        },
        ce: {
            name: "Civil Engineering",
            head: "N/A",
            facultyCount: "24 Faculty Members",
            labs: "Geotechnical Testing Lab, Concrete Technology Lab, GIS Surveying Unit",
            description: "Developing resilient urban infrastructure, earthquake-resistant design, and ecological hydrology.",
            intake: "B.Tech: 60 seats | M.Tech: 18 seats"
        },
        ee: {
            name: "Electrical Engineering",
            head: "N/A",
            facultyCount: "22 Faculty Members",
            labs: "Power Electronics Lab, Renewable Energy Research Center, Control Systems Lab",
            description: "Advancing renewable energy grids, power electronics, control systems, and automation technologies for sustainable infrastructure.",
            intake: "B.Tech: 60 seats | M.Tech: 18 seats"
        },
        mba: {
            name: "Department of Management Studies",
            head: "N/A",
            facultyCount: "18 Faculty Members",
            labs: "Financial Trading Terminal, Business Analytics Suite, Management Simulation Room",
            description: "Cultivating leadership acumen, venture creation, strategic consultancy, and digital marketing expertise.",
            intake: "MBA: 180 seats"
        }
    };

    const deptButtons = document.querySelectorAll('.view-dept-btn');
    const deptModal = document.getElementById('deptModal');
    const closeDeptModalBtn = document.getElementById('closeDeptModal');
    const modalDeptName = document.getElementById('modalDeptName');
    const modalDeptBody = document.getElementById('modalDeptBody');

    deptButtons.forEach(button => {
        button.addEventListener('click', function () {
            const deptId = this.getAttribute('data-dept-id');
            const data = departmentData[deptId];

            if (data && deptModal) {
                modalDeptName.textContent = data.name;
                modalDeptBody.innerHTML = `
                    <div class="modal-detail-row">
                        <strong>Head of Department:</strong>
                        <p>${data.head}</p>
                    </div>
                    <div class="modal-detail-row">
                        <strong>Department Strength:</strong>
                        <p>${data.facultyCount}</p>
                    </div>
                    <div class="modal-detail-row">
                        <strong>Laboratories &amp; Facilities:</strong>
                        <p>${data.labs}</p>
                    </div>
                    <div class="modal-detail-row">
                        <strong>Overview:</strong>
                        <p>${data.description}</p>
                    </div>
                    <div class="modal-detail-row">
                        <strong>Annual Intake:</strong>
                        <p>${data.intake}</p>
                    </div>
                `;
                deptModal.style.display = 'flex';
            }
        });
    });

    if (closeDeptModalBtn && deptModal) {
        closeDeptModalBtn.addEventListener('click', function () {
            deptModal.style.display = 'none';
        });
    }

    // 3. Courses Filter
    const courseFilterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    courseFilterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            courseFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-course-filter');

            courseCards.forEach(card => {
                const cardLevel = card.getAttribute('data-level');

                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else if (filterValue === 'Undergraduate') {
                    if (cardLevel === 'Undergraduate') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                } else if (filterValue === 'Postgraduate') {
                    if (cardLevel === 'Postgraduate') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // 4. Faculty Search
    const facultySearchInput = document.getElementById('facultySearchInput');
    const facultyCards = document.querySelectorAll('.faculty-card');

    if (facultySearchInput) {
        facultySearchInput.addEventListener('input', function () {
            const searchTerm = this.value;

            facultyCards.forEach(card => {
                const name = card.getAttribute('data-name');
                const dept = card.getAttribute('data-dept');

                if (name.toLowerCase().includes(searchTerm.toLowerCase()) || dept.toLowerCase().includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 5. Events Category Filter
    const eventFilterBtns = document.querySelectorAll('.event-tab-btn');
    const eventCards = document.querySelectorAll('.event-card');

    eventFilterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            eventFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (selectedCategory === 'All') {
                    card.style.display = 'flex';
                } else if (selectedCategory === 'Technical') {
                    if (category === 'Technical') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                } else if (selectedCategory === 'Cultural') {
                    if (category === 'Cultural') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                } else if (selectedCategory === 'Sports') {
                    if (category === 'Sports') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // 6. View All Announcements
    const viewAllAnnouncementsBtn = document.getElementById('viewAllAnnouncementsBtn');
    const announcementsList = document.getElementById('announcementsList');

    const additionalAnnouncements = [
        {
            day: "05",
            month: "Aug",
            tag: "Sports",
            tagClass: "cultural",
            title: "Inter-College Cricket Selection Trials",
            text: "Trials for the university cricket team begin this Friday at 6:30 AM at the sports pavilion."
        },
        {
            day: "01",
            month: "Aug",
            tag: "Hostel",
            tagClass: "general",
            title: "Hostel Room Allotment List Published",
            text: "Second-year undergraduate students can verify their allocated room numbers on the notice board."
        },
        {
            day: "25",
            month: "Jul",
            tag: "Research",
            tagClass: "exam",
            title: "Call for Papers: National AI Symposium",
            text: "Student authors can submit research abstracts for the upcoming peer-reviewed proceedings."
        },
        {
            day: "18",
            month: "Jul",
            tag: "Workshop",
            tagClass: "placement",
            title: "Full-Stack Web Development Bootcamp",
            text: "Hands-on three-day weekend workshop in collaboration with Google Developer Groups."
        }
    ];

    let announcementsExpanded = false;

    if (viewAllAnnouncementsBtn && announcementsList) {
        viewAllAnnouncementsBtn.addEventListener('click', function () {
            if (!announcementsExpanded) {
                // Append additional notices
                for (let i = 0; i < additionalAnnouncements.length; i++) {
                    const item = additionalAnnouncements[i];
                    const div = document.createElement('div');
                    div.className = 'announcement-item extra-announcement';
                    div.innerHTML = `
                        <div class="announcement-date">
                            <span class="a-day">${item.day}</span>
                            <span class="a-month">${item.month}</span>
                        </div>
                        <div class="announcement-info">
                            <span class="a-tag ${item.tagClass}">${item.tag}</span>
                            <h4 class="a-title">${item.title}</h4>
                            <p class="a-text">${item.text}</p>
                        </div>
                    `;
                    announcementsList.appendChild(div);
                }
                viewAllAnnouncementsBtn.textContent = "Show Fewer Announcements";
                announcementsExpanded = true;
            } else {
                const extraItems = document.querySelectorAll('.extra-announcement');
                extraItems.forEach(el => el.remove());
                viewAllAnnouncementsBtn.textContent = "View All Announcements";
                announcementsExpanded = false;
            }
        });
    }

    // 7. Global Search Feature
    const quickSearchInput = document.getElementById('quickSearchInput');
    const quickSearchBtn = document.getElementById('quickSearchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchResultsList = document.getElementById('searchResultsList');
    const closeSearchBtn = document.getElementById('closeSearchBtn');

    const searchableDirectory = [
        { title: "Computer Science & Engineering", type: "Department", link: "#departments" },
        { title: "Electronics & Communication", type: "Department", link: "#departments" },
        { title: "Mechanical Engineering", type: "Department", link: "#departments" },
        { title: "Civil Engineering", type: "Department", link: "#departments" },
        { title: "Electrical Engineering", type: "Department", link: "#departments" },
        { title: "Business Administration", type: "Department", link: "#departments" },
        { title: "B.Tech Computer Science", type: "Course", link: "#courses" },
        { title: "M.Tech Software Engineering", type: "Course", link: "#courses" },
        { title: "MBA Management", type: "Course", link: "#courses" },
        { title: "MCA Computer Applications", type: "Course", link: "#courses" },
        { title: "B.Sc Computer Science", type: "Course", link: "#courses" },
        { title: "M.Sc Data Analytics", type: "Course", link: "#courses" },
        { title: "Dr. G. Amarender Rao", type: "Faculty", link: "#faculty" },
        { title: "Dr. T. Raghunadha Reddy", type: "Faculty", link: "#faculty" },
        { title: "Dr. J. Srinivas", type: "Faculty", link: "#faculty" },
        { title: "Central Library", type: "Facility", link: "#facilities" },
        { title: "Sports Complex", type: "Facility", link: "#facilities" },
        { title: "Tech Symposium 2026", type: "Event", link: "#events" },
        { title: "Cultural Fest Tarang", type: "Event", link: "#events" }
    ];

    function performSearch() {
        const query = quickSearchInput.value.trim();
        if (!query) return;

        searchResultsList.innerHTML = '';
        const matches = searchableDirectory.filter(item => {
            return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });

        if (matches.length > 0) {
            matches.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'search-result-item';
                itemDiv.innerHTML = `
                    <div>
                        <a href="${item.link}" class="result-link"><strong>${item.title}</strong></a>
                    </div>
                    <span class="search-tag">${item.type}</span>
                `;
                searchResultsList.appendChild(itemDiv);
            });
        } else {
            searchResultsList.innerHTML = `<p class="search-placeholder">No results found for "${query}".</p>`;
        }

        searchOverlay.style.display = 'block';
    }

    if (quickSearchBtn) {
        quickSearchBtn.addEventListener('click', performSearch);
    }

    if (quickSearchInput) {
        quickSearchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    if (closeSearchBtn && searchOverlay) {
        closeSearchBtn.addEventListener('click', function () {
            searchOverlay.style.display = 'none';
        });
    }

    // 8. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const feedbackEl = document.getElementById('contactFormFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (name === '') {
                feedbackEl.className = 'form-feedback error';
                feedbackEl.textContent = 'Please enter your full name.';
                return;
            }

            if (email === '' || !email.includes('@')) {
                feedbackEl.className = 'form-feedback error';
                feedbackEl.textContent = 'Please enter a valid email address.';
                return;
            }

            if (subject === '') {
                feedbackEl.className = 'form-feedback error';
                feedbackEl.textContent = 'Please provide a subject.';
                return;
            }

            if (message === '') {
                feedbackEl.className = 'form-feedback error';
                feedbackEl.textContent = 'Please enter your message.';
                return;
            }

            // Validation passes
            feedbackEl.className = 'form-feedback success';
            feedbackEl.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
        });
    }

    // Close modals on outside click
    window.addEventListener('click', function (event) {
        if (deptModal && event.target === deptModal) {
            deptModal.style.display = 'none';
        }
        if (searchOverlay && event.target === searchOverlay) {
            searchOverlay.style.display = 'none';
        }
    });

    // 9. Scroll Reveal Animations (IntersectionObserver)
    var revealElements = document.querySelectorAll(
        '.section-title-wrap, .dept-card, .course-card, .faculty-card, .facility-card, .event-card, .announcement-item, .about-grid, .stats-grid, .contact-grid, .hero-content, .hero-visual, .highlight-item'
    );
    revealElements.forEach(function (el) { el.classList.add('reveal'); });

    // Task 2: Assign stagger delay classes to grid card children
    var gridContainers = [
        '.departments-grid',
        '.courses-grid',
        '.faculty-grid',
        '.facilities-grid',
        '.events-grid',
        '.announcements-list'
    ];
    var delayClasses = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
    gridContainers.forEach(function (gridSel) {
        var grid = document.querySelector(gridSel);
        if (!grid) return;
        var children = grid.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.classList.contains('reveal')) {
                child.classList.add(delayClasses[i % delayClasses.length]);
            }
        }
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add('in-view');
        });
    }

    // 10. 3D Tilt Effect on Cards (touch-safe) — Tasks 3 & 4
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var tiltCards = document.querySelectorAll('.dept-card, .course-card, .faculty-card, .facility-card, .event-card');
        tiltCards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = ((y - centerY) / centerY) * -4;
                var rotateY = ((x - centerX) / centerX) * 4;
                card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px) scale(1.01)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            });
        });
    }

    // 11. Button ripple micro-interaction (CSS handles via ::after)

    // Task 5: Scroll progress bar
    var scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    scrollProgress.style.width = scrollPercent + '%';
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Task 5: Hero animated gradient background
    var heroSection = document.querySelector('.hero-section');
    if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroSection.classList.add('animated-bg');
    }

});
