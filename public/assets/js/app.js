const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('backToTop');
const imageModal = document.getElementById('imageModal');
const modalImage = imageModal.querySelector('.modal-image');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            setTimeout(() => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }, 300);
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

imageModal.addEventListener('click', () => {
    imageModal.style.display = 'none';
    modalImage.src = '';
});

const dataSkills = [{
    icon: 'fab fa-js',
    name: 'JavaScript',
    percentage: 75
}, {
    icon: 'fab fa-css3-alt',
    name: 'CSS',
    percentage: 28
}, {
    icon: 'fab fa-html5',
    name: 'HTML',
    percentage: 45
}];

const dataSkills2 = [{
    icon: 'fas fa-comment-dots',
    name: 'Bahasa Indonesia',
    percentage: 80
}, {
    icon: 'fas fa-language',
    name: 'English',
    percentage: 28
}, {
    icon: 'fas fa-calculator',
    name: 'Mathematics',
    percentage: 6
}];

const projectsData = [{
    img: '__arceo_bot.png',
    title: 'Arceo Bot',
    desc: 'Arceo Bot: A simple WhatsApp bot assistant that can make your needs easier',
    url: 'https://wa.me/6285923507120?text=Type%20.menu%20to%20start%20a%20conversation'
}, {
    img: '__arceo_nime.png',
    title: 'Arceo Nime (Coming Soon)',
    desc: 'Arceo Nime: The most complete and free anime streaming place',
    url: 'https://nime.arceo.qzz.io/'
}, {
    img: '__arceo_pixeli.png',
    title: 'Arceo Pixeli',
    desc: 'Arceo Pixeli: Improve your image quality to be better',
    url: 'https://pixeli.arceo.qzz.io/'
}];

function animate_percentage(element, targetPercentage, duration = 1000) {
    let startTime = null;

    function updateCount(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentPercentage = Math.floor(progress * targetPercentage);
        element.textContent = currentPercentage + '%';
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    requestAnimationFrame(updateCount);
}

function render_skills(skills, gridSelector) {
    const skillsGrid = document.querySelector(gridSelector);
    skillsGrid.innerHTML = '';
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.dataset.percentage = skill.percentage;
        const skillNameElement = document.createElement('h3');
        const skillIcon = document.createElement('i');
        skillIcon.classList.add(...skill.icon.split(' '));
        skillNameElement.appendChild(skillIcon);
        skillNameElement.appendChild(document.createTextNode(skill.name));
        const skillBarContainer = document.createElement('div');
        skillBarContainer.classList.add('skill-bar-container');
        const skillBarFill = document.createElement('div');
        skillBarFill.classList.add('skill-bar-fill');
        skillBarFill.style.width = '0%';
        skillBarContainer.appendChild(skillBarFill);
        const skillPercentage = document.createElement('p');
        skillPercentage.classList.add('skill-percentage');
        skillPercentage.textContent = '0%';
        skillItem.appendChild(skillNameElement);
        skillItem.appendChild(skillBarContainer);
        skillItem.appendChild(skillPercentage);
        skillsGrid.appendChild(skillItem);
    });
}

function render_projects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');

        const projectImageContainer = document.createElement('div');
        projectImageContainer.classList.add('project-image-container');

        const projectImg = document.createElement('img');
        projectImg.src = "../assets/img/" + project.img;
        projectImg.alt = project.title;
        projectImg.style.cursor = 'pointer';

        const watermarkImg = document.createElement('img');
        watermarkImg.src = "../assets/img/__arceo.png";
        watermarkImg.alt = "Watermark";
        watermarkImg.classList.add('project-watermark');

        projectImg.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImage.src = projectImg.src;
            imageModal.style.display = 'flex';
        });

        projectImageContainer.appendChild(projectImg);
        projectImageContainer.appendChild(watermarkImg);

        const projectInfo = document.createElement('div');
        projectInfo.classList.add('project-info');
        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;
        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.desc;
        const projectLinks = document.createElement('div');
        projectLinks.classList.add('project-links');
        const projectLink = document.createElement('a');
        projectLink.href = project.url;
        projectLink.textContent = 'View Projects';
        const linkIcon = document.createElement('i');
        linkIcon.classList.add('fas', 'fa-external-link-alt');
        projectLink.appendChild(document.createTextNode('\u00A0'));
        projectLink.appendChild(linkIcon);
        projectLinks.appendChild(projectLink);
        projectInfo.appendChild(projectTitle);
        projectInfo.appendChild(projectDescription);
        projectInfo.appendChild(projectLinks);
        projectItem.appendChild(projectImageContainer);
        projectItem.appendChild(projectInfo);
        projectsGrid.appendChild(projectItem);
    });
}

const typing_element = document.querySelector('#home .hero-content p.typing-text');
let textContent = 'ㅤ';
let charIndex = 0;
const typingSpeed = 25;
const pauseEnd = 2600;
const pauseBeforeStart = 0;

function type_effect() {
    if (charIndex < textContent.length) {
        typing_element.textContent += textContent.charAt(charIndex);
        charIndex++;
        setTimeout(type_effect, typingSpeed);
    } else {
        setTimeout(reset_effect, pauseEnd);
    }
}

function reset_effect() {
    typing_element.textContent = 'ㅤ';
    charIndex = 0;
    setTimeout(type_effect, pauseBeforeStart);
}

document.addEventListener('DOMContentLoaded', () => {
    render_skills(dataSkills, '.skills-grid.main-skills');
    render_skills(dataSkills2, '.skills-grid.academic-skills');
    render_projects(projectsData);
    const skillItems = document.querySelectorAll('#skills .skill-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const skillBarFill = skillItem.querySelector('.skill-bar-fill');
                const skillPercentageElement = skillItem.querySelector('.skill-percentage');
                const targetPercentage = parseInt(skillItem.dataset.percentage, 10);
                setTimeout(() => {
                    skillBarFill.style.width = targetPercentage + '%';
                    animate_percentage(skillPercentageElement, targetPercentage);
                }, 300);
                observer.unobserve(skillItem);
            }
        });
    }, observerOptions);
    skillItems.forEach(item => {
        observer.observe(item);
    });
    if (typing_element) {
        textContent = typing_element.textContent.trim();
        typing_element.textContent = '';
        type_effect();
    }
});

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#e0e0e0"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 0
            },
            "image": {
                "src": "",
                "width": 0,
                "height": 0
            }
        },
        "opacity": {
            "value": 0.4,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 5,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 0,
            "color": "#444444",
            "opacity": 0,
            "width": 0
        },
        "move": {
            "enable": true,
            "speed": 5,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 0,
                "rotateY": 0
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 0,
                "line_linked": {
                    "opacity": 0
                }
            },
            "bubble": {
                "distance": 0,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 0,
                "duration": 0
            },
            "push": {
                "particles_nb": 0
            },
            "remove": {
                "particles_nb": 0
            }
        }
    },
    "retina_detect": false
});