// ============================================
// MODERN WEB APP - MAIN APPLICATION
// ============================================

class PortfolioApp {
    constructor() {
        this.state = {
            theme: localStorage.getItem('theme') || 'dark',
            currentSection: 'about',
            isMenuOpen: false,
            projects: [],
            skills: {},
            filterCategory: 'all',
            experienceStartDate: new Date('2022-06-01')
        };

        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.initTheme();
        this.initAnimations();
        this.initScrollSpy();
        this.initParticles();
        this.renderProjects();
        this.renderSkills();
        this.updateExperienceDuration();
        this.initTypingAnimation();
        this.initCounters();
    }

    loadData() {
        // Projects Data
        this.state.projects = [
            {
                name: "COREWORKERS UK - Job Portal",
                category: ["web", "mobile"],
                technologies: ["Django", "NuxtJS", "MySQL", "React Native"],
                description: [
                    "Core Workers UK is a platform that helps workers find jobs in the UK.",
                    "It provides a job portal for workers to find jobs and a dashboard for employers to post jobs and manage applications.",
                    "It also provides a dashboard for workers to manage their applications and a dashboard for employers to manage their jobs."
                ],
                webLink: "https://coreworkersuk.com/",
                mobileLink: "https://play.google.com/store/apps/details?id=com.creativise.coreworkersuk",
            },
            {
                name: "SASTHOSEBOK.COM - Online Healthcare Platform",
                category: ["web", "mobile"],
                technologies: ["Django", "NuxtJS", "SQLite", "React Native"],
                description: [
                    "Developed an online healthcare platform offering services such as specialist doctor appointments, home nursing, and diagnostic tests.",
                    "Launched a mobile application, available on the Google Play Store, extending services to mobile users."
                ],
                webLink: "https://sasthosebok.com/",
                mobileLink: "https://play.google.com/store/apps/details?id=com.sajibsd013.app",
            },
            {
                name: "BD Holding Tax Digitalizing - Tax Collection Platform",
                category: ["web", "mobile"],
                role: "Full-Stack Developer",
                technologies: ["Django", "NuxtJS", "SQLite", "React Native"],
                description: [
                    "BD Holding Tax Digitalizing helps local volunteers in Bangladesh manage and organize holding tax information more efficiently.",
                ],
                webLink: "https://bdholdingtaxdigitalizing.com/",
                mobileLink: "https://play.google.com/store/apps/details?id=com.creativise.bdholdingtaxdigitalizing",
            },
            {
                name: "File Sorting Application",
                category: ["desktop"],
                technologies: ["Tkinter", "Python", "SQLite"],
                description: [
                    "Developed an application that organizes files based on their extensions, sorting them into categories such as images, documents, archives, and others.",
                    "Implemented both client-side and server-side sorting mechanisms to ensure efficient file management across different platforms."
                ],
                gitLink: "https://github.com/sajibsd013/Sorting-App",
            },
            {
                name: "Bangladesh Tax Digitization - Tax Collection Platform",
                category: ["web", "mobile"],
                role: "Full-Stack Developer",
                technologies: ["Django", "NuxtJS", "SQLite", "React Native"],
                description: [
                    "Developed a platform to digitize the tax collection process in Bangladesh.",
                    "Implemented features for users to check tax information using holding numbers.",
                    "Provided a mobile application for volunteers to collect data for holding taxes."
                ],
                webLink: "https://bdhousingtax.com/",
                mobileLink: "https://play.google.com/store/apps/details?id=com.sajibsd013.bdhousingtax",
            },
            {
                name: "CV Builder - a Resume Builder",
                category: ["web"],
                technologies: ["NuxtJS", "Django", "SQLite"],
                description: [
                    "Provided an array of options to customize a CV's content and appearance, giving users flexibility to create a document that meets their needs."
                ],
                gitLink: "https://github.com/sajibsd013/draggable-ui-work",
            },
            {
                name: "E-Learning - a Learning Management System",
                category: ["web"],
                technologies: ["PHP", "JavaScript", "MySQL"],
                description: [
                    "Created an E-learning web app using HTML, CSS, Bootstrap for frontend design.",
                    "Implemented JavaScript for interactivity, Ajax for asynchronous requests, PHP for server-side scripting, and MySQL for database management."
                ],
                gitLink: "https://github.com/sajibsd013/E-learning",
            }
        ];

        // Skills Data
        this.state.skills = {
            programming_Languages: {
                title: "Programming Languages",
                items: ["Python", "JavaScript", "Go", "PHP", "TypeScript"],
                icon: "fa-code"
            },
            web_Frameworks: {
                title: "Web Frameworks",
                items: ["Django", "NuxtJS", "Vue.js", "React", "NextJS"],
                icon: "fa-laptop"
            },
            database_Management: {
                title: "Database Management",
                items: ["MySQL", "SQLite", "PostgreSQL", "MongoDB"],
                icon: "fa-database"
            },
            tools_and_Platforms: {
                title: "Tools & Platforms",
                items: ["Odoo", "Git", "GitHub", "Docker", "Firebase"],
                icon: "fa-cogs"
            },
            soft_Skills: {
                title: "Soft Skills",
                items: ["Team collaboration", "Problem-solving", "Effective communication"],
                icon: "fa-users"
            }
        };
    }

    setupEventListeners() {
        // Mobile Menu Toggle
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const navCollapse = document.getElementById('navbarResponsive');

        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                this.state.isMenuOpen = !this.state.isMenuOpen;
                navCollapse.classList.toggle('show');
            });
        }

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navCollapse.classList.remove('show');
                    this.state.isMenuOpen = false;
                }
            });
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Project Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterProjects(category);
            });
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.state.theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o';
        }
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.state.theme);
        document.documentElement.setAttribute('data-theme', this.state.theme);

        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.state.theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o';
        }
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.state.currentSection = id;

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    initAnimations() {
        // Scroll-triggered animations
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animateOnScroll.observe(el);
        });
    }

    initParticles() {
        const canvas = document.getElementById('particlesCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    renderProjects() {
        const projectsList = document.getElementById('projectsList');
        if (!projectsList) return;

        projectsList.innerHTML = '';

        const filteredProjects = this.state.filterCategory === 'all'
            ? this.state.projects
            : this.state.projects.filter(p => p.category.includes(this.state.filterCategory));

        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card animate-on-scroll';
            projectCard.style.animationDelay = `${index * 0.1}s`;

            projectCard.innerHTML = `
                <div class="project-icon">
                    <i class="fa ${project.icon}"></i>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3>${project.name}</h3>
                        ${project.featured ? '<span class="badge-featured">Featured</span>' : ''}
                    </div>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <ul class="project-description">
                        ${project.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-footer ">
                    <a href="${project.mobileLink}" target="_blank" class="btn-project me-5 ${project.mobileLink ? '' : 'd-none'}" >
                        <span>Mobile App</span>
                        <i class="fa fa-external-link"></i>
                    </a>
                    <a href="${project.gitLink}" target="_blank" class="btn-project me-5 ${project.gitLink ? '' : 'd-none'}">
                        <span>Source Code</span>
                        <i class="fa fa-external-link"></i>
                    </a>
                    <a href="${project.webLink}" target="_blank" class="btn-project me-5 ${project.webLink ? '' : 'd-none'}">
                        <span>Web App</span>
                        <i class="fa fa-external-link"></i>
                    </a>
                </div>
            `;

            projectsList.appendChild(projectCard);
        });

        // Re-observe new elements
        this.initAnimations();
    }

    filterProjects(category) {
        this.state.filterCategory = category;

        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });

        this.renderProjects();
    }

    renderSkills() {
        const skillsSection = document.getElementById('skillsSection');
        if (!skillsSection) return;

        skillsSection.innerHTML = '';

        Object.entries(this.state.skills).forEach(([key, category], index) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skills-category animate-on-scroll';
            categoryDiv.style.animationDelay = `${index * 0.1}s`;

            categoryDiv.innerHTML = `
                <div class="skills-header">
                    <i class="fa ${category.icon}"></i>
                    <h3>${category.title}</h3>
                </div>
                <ul class="skills-list">
                    ${category.items.map(skill => `
                        <li class="skill-item">
                            <span>${skill}</span>
                        </li>
                    `).join('')}
                </ul>
            `;

            skillsSection.appendChild(categoryDiv);
        });

        this.initAnimations();
    }

    initTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;

        const texts = [
            'Software Engineer',
            'Full-Stack Developer',
            'Python Enthusiast',
            'JavaScript Developer',
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    calculateExperience() {
        const now = new Date();
        const start = this.state.experienceStartDate;

        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }
        if (months > 0) {
            years = `${years}.5`;
        }

        return years;
    }

    updateExperienceDuration() {
        const experienceElement = document.getElementById('experienceDuration');
        if (experienceElement) {
            const years = this.calculateExperience();
            experienceElement.textContent = `${years}`;
        }
    }

    initCounters() {
        const counters = document.querySelectorAll('.counter');

        // Calculate dynamic experience years
        const experienceYears = this.calculateExperience();

        // Define targets for each counter (in order: experience, projects, students)
        const targets = [
            { target: parseFloat(experienceYears), suffix: '+' },
            { target: 20, suffix: '+' },
            { target: 50, suffix: '+' }
        ];

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;

                    // Find the index of this counter in the NodeList
                    const counterIndex = Array.from(counters).indexOf(counter);

                    // Get the corresponding target data
                    const targetData = targets[counterIndex];

                    if (!targetData) return; // Skip if no target data

                    const targetValue = targetData.target;
                    const suffix = targetData.suffix || '';
                    const duration = 2000;
                    const increment = targetValue / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < targetValue) {
                            // For decimal values (like 2.5), show one decimal place
                            const displayValue = targetValue % 1 !== 0
                                ? current.toFixed(1)
                                : Math.ceil(current);
                            counter.textContent = displayValue + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            // Final value
                            const finalValue = targetValue % 1 !== 0
                                ? targetValue.toFixed(1)
                                : targetValue;
                            counter.textContent = finalValue + suffix;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});
