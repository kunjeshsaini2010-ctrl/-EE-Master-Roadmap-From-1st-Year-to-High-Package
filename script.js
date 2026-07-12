document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCanvas();
    renderRoadmap();
    renderSubjects();
    renderColleges();
    renderProjects('all');
    renderInterview();
    initDashboard();
    initScrollReveal();
    initMagneticButtons();
    initServiceWorker();
});

function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateChartColors();
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) html.setAttribute('data-theme', savedTheme);
}

function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        draw() {
            ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(41, 151, 255, 0.3)' : 'rgba(0, 113, 227, 0.15)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 40; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

const semesters = [
    { sem: "Semester 1 & 2", title: "Engineering Foundation", desc: "Basic Electrical, Math, aur C/C++ programming. Yeh tumhara base banayega." },
    { sem: "Semester 3", title: "Network Theory & AC/DC", desc: "Circuit analysis (KCL, KVL, Thevenin). Placements ke liye sabse important subject." },
    { sem: "Semester 4", title: "Electrical Machines I & Digital Electronics", desc: "Transformers aur DC machines. Sath hi logic gates aur flip-flops." },
    { sem: "Semester 5", title: "Power Systems & Control Systems", desc: "Electricity generation aur transmission concepts. Laplace transform aur system stability." },
    { sem: "Semester 6", title: "Microprocessors & Power Electronics", desc: "Inverters, Arduino, ESP32 aur programming ki real implementation yahan start hoti hai." },
    { sem: "Semester 7", title: "Electric Drives & Switchgear", desc: "Motors ko control karna (EVs ke liye important) aur relays se system protection." },
    { sem: "Semester 8", title: "Major Project & Internship", desc: "IoT, Smart Grid ya Automation me industry level project banao resume ke liye." }
];

const subjects = [
    { name: "Network Theory", tags: ["GATE", "Placements"], diff: "High", desc: "Kirchhoff laws aur theorems. Har interview me iska question pucha jata hai." },
    { name: "Electrical Machines", tags: ["Core", "Industry"], diff: "High", desc: "Induction motor aur Transformers. Core companies ka favourite topic." },
    { name: "Embedded Systems", tags: ["Arduino", "ESP32"], diff: "Medium", desc: "Hardware aur coding ka combination. DIY hardware projects me bohot scope hai." },
    { name: "Power Electronics", tags: ["EVs", "Core"], diff: "High", desc: "SCR, MOSFETs aur Inverters. Electric Vehicles industry ki backbone hai." },
    { name: "Control Systems", tags: ["GATE", "Maths"], diff: "Medium", desc: "Bode plot aur Root locus. System ko stable rakhne ki advanced calculations." },
    { name: "C++ & DSA", tags: ["IT Placements"], diff: "Medium", desc: "Electrical students ko tech companies me place karwane ke liye sabse zaruri skill." }
];

// Added dynamic Image URLs for Colleges
const colleges = [
    { name: "IIT Bombay", location: "Mumbai", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80", desc: "Core electrical aur tech dono me best. Yahan ka exposure aur labs world-class hain." },
    { name: "IIT Delhi", location: "New Delhi", image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&q=80", desc: "Power systems aur communication engineering me bohot strong research and alumni network." },
    { name: "BITS Pilani", location: "Pilani", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80", desc: "No reservation, pure merit. Electronics aur IT dono me amazing placement records." },
    { name: "IIT Roorkee", location: "Roorkee", image: "https://images.unsplash.com/photo-1607237138185-eedd996ede5a?auto=format&fit=crop&w=600&q=80", desc: "Core engineering ki legacy. Power aur heavy machinery ka best infrastructure." },
    { name: "NIT Trichy", location: "Tamil Nadu", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80", desc: "NITs me number 1. Excellent faculty aur core companies ka high recruitment rate." }
];

// Added dynamic Image URLs for Projects
let projects = [
    { title: "Smart Street Light System", cat: "Beginner", image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=600&q=80", desc: "LDR aur Arduino ka use karke automated power saving system.", tech: "Arduino, LDR Sensors" },
    { title: "Weather Station with ESP32", cat: "Intermediate", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", desc: "Real-time weather data collection aur cloud web interface configuration.", tech: "ESP32, IoT Cloud" },
    { title: "Home Automation System", cat: "Beginner", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80", desc: "Mobile application dashboard se appliances ko securely control karna.", tech: "Arduino, Bluetooth Module" },
    { title: "Induction Motor Speed Control", cat: "Advanced", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80", desc: "V/f control architecture design and implementation using Simulation frameworks.", tech: "MATLAB, Power Electronics" },
    { title: "Solar Power Tracker", cat: "Intermediate", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80", desc: "Dynamic tracking mechanics dual-axis movement system efficiency enhancements.", tech: "Microcontroller, LDR, Servos" }
];

// Scaled placeholder-free elements generator with alternating stock tech visual concepts
const visualAssets = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80"
];

for(let i = 6; i <= 25; i++) {
    projects.push({
        title: `Industrial Automation System Unit ${i}`,
        cat: projectCategories[i % 3],
        image: visualAssets[i % visualAssets.length],
        desc: "High reliability industrial automation design architecture focusing on hardware testing parameters.",
        tech: "PLC, SCADA Controls"
    });
}

function renderRoadmap() {
    const container = document.getElementById('semester-timeline');
    semesters.forEach((sem, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        container.innerHTML += `
            <div class="timeline-item ${side}">
                <div class="glass-card">
                    <div class="card-body">
                        <h3>${sem.sem}</h3>
                        <h4 style="margin-bottom: 0.5rem;">${sem.title}</h4>
                        <p>${sem.desc}</p>
                    </div>
                </div>
            </div>`;
    });
}

function renderSubjects() {
    const container = document.getElementById('subjects-grid');
    subjects.forEach(sub => {
        const tagsHtml = sub.tags.map(t => `<span class="tag">${t}</span>`).join('');
        container.innerHTML += `
            <div class="glass-card">
                <div class="card-body">
                    <h3>${sub.name}</h3>
                    <div style="margin-bottom: 1rem;">${tagsHtml}</div>
                    <p><strong>Difficulty:</strong> ${sub.diff}</p>
                    <p style="margin-top: 0.5rem;">${sub.desc}</p>
                </div>
            </div>`;
    });
}

function renderColleges() {
    const container = document.getElementById('college-grid');
    colleges.forEach(col => {
        container.innerHTML += `
            <div class="glass-card">
                <img src="${col.image}" class="card-image" alt="${col.name}">
                <div class="card-body">
                    <h3>${col.name}</h3>
                    <span class="tag">${col.location}</span>
                    <p style="margin-top: 0.5rem;">${col.desc}</p>
                </div>
            </div>`;
    });
}

function renderProjects(filter) {
    const container = document.getElementById('projects-grid');
    container.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
    
    filtered.forEach(proj => {
        container.innerHTML += `
            <div class="glass-card">
                <img src="${proj.image}" class="card-image" alt="${proj.title}">
                <div class="card-body">
                    <span class="tag" style="float:right;">${proj.cat}</span>
                    <h3>${proj.title}</h3>
                    <p style="margin-bottom: 1rem; font-size: 0.9rem;"><strong>Tech:</strong> ${proj.tech}</p>
                    <p>${proj.desc}</p>
                </div>
            </div>`;
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.dataset.filter);
        };
    });
}

function renderInterview() {
    const questions = [
        "What is the difference between a neutral and an earth wire?",
        "Explain the principle of operation of a 3-phase induction motor.",
        "Why is power generated at 11kV and transmitted at higher voltages?",
        "How do you protect a microcontroller (like Arduino) from high voltage spikes?",
        "What is the significance of the power factor, and how can it be improved?"
    ];
    const container = document.getElementById('interview-list');
    questions.forEach(q => {
        container.innerHTML += `<li style="margin-bottom: 0.8rem; padding-bottom: 0.8rem; border-bottom: 1px solid var(--glass-border);">${q}</li>`;
    });
}

let progressChart, salaryChart;
function initDashboard() {
    const pCtx = document.getElementById('progressChart').getContext('2d');
    const sCtx = document.getElementById('salaryChart').getContext('2d');
    const textColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#fff' : '#000';

    progressChart = new Chart(pCtx, {
        type: 'radar',
        data: {
            labels: ['Circuit Theory', 'Machines', 'Coding (C/C++)', 'Microcontrollers', 'Power Systems', 'Control Systems'],
            datasets: [{
                label: 'Average Skill Requirement',
                data: [90, 85, 75, 95, 80, 70],
                backgroundColor: 'rgba(0, 113, 227, 0.2)',
                borderColor: '#0071e3',
                borderWidth: 2
            }]
        },
        options: { responsive: true, scales: { r: { ticks: { display: false }, pointLabels: { color: textColor } } }, plugins: { legend: { labels: { color: textColor } } } }
    });

    salaryChart = new Chart(sCtx, {
        type: 'line',
        data: {
            labels: ['Year 1 (Fresher)', 'Year 3', 'Year 5', 'Year 7 (Managerial)'],
            datasets: [{
                label: 'Core Electrical Salary Growth (LPA)',
                data: [6, 9, 14, 22],
                borderColor: '#2997ff',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(41, 151, 255, 0.1)'
            }]
        },
        options: { responsive: true, scales: { x: { ticks: { color: textColor } }, y: { ticks: { color: textColor } } }, plugins: { legend: { labels: { color: textColor } } } }
    });
}

function updateChartColors() {
    if (!progressChart) return;
    const textColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#fff' : '#000';
    progressChart.options.scales.r.pointLabels.color = textColor;
    progressChart.options.plugins.legend.labels.color = textColor;
    progressChart.update();
    
    salaryChart.options.scales.x.ticks.color = textColor;
    salaryChart.options.scales.y.ticks.color = textColor;
    salaryChart.options.plugins.legend.labels.color = textColor;
    salaryChart.update();
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(reg => console.log('SW Registered'))
                .catch(err => console.log('SW Registration failed', err));
        });
    }
}