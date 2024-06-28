window.sr = ScrollReveal({ reset: true });

sr.reveal('#header', { distance: '50px', duration: 1000 });
sr.reveal('#sec1', { distance: '70px', duration: 1500 });
sr.reveal('#sec2', { distance: '50px', duration: 1000 });
// sr.reveal('.poj', { distance: '50px', interval: 30, reset: true, duration: 2000 });
// sr.reveal('footer', { distance: '50px', duration: 1500 });

document.addEventListener('DOMContentLoaded', function () {
    // Obtenha uma NodeList de botões com a classe .contact
    var btnsScrollToContato = document.querySelectorAll('.contact');
    var secaoContato = document.querySelector('#main_footer');

    function easeInOutExpo(x) {
        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

    btnsScrollToContato.forEach(function (btn) {
        btn.addEventListener('click', function () {
            secaoContato.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start',
                easing: easeInOutExpo
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const animatedInputs = document.querySelectorAll(".animated-input input, .animated-input textarea");

    animatedInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            if (input.value.trim() !== "") {
                input.classList.add("filled");
            } else {
                input.classList.remove("filled");
            }
        });
    });
});

const $toggleTheme = document.getElementById('toggle-theme');
const $html = document.querySelector('html');

$toggleTheme.addEventListener('change', function () {
    $html.classList.toggle('light_mode');
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM totalmente carregado e analisado');
    
    fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        console.log('Arquivo JSON carregado com sucesso');
        return response.json();
    })
    .then(projects => {
        console.log('Dados do JSON:', projects);
        
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) {
            console.error('Elemento projects-container não encontrado');
            return;
        }
        
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('item-project');
            projectElement.innerHTML = `
                <div class="project-card">
                    <img src="${project.imgUrl}" alt="${project.name}">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.url}" target="_blank">Ver Projeto</a>
                </div>
            `;
            projectsContainer.appendChild(projectElement);
        });
    })
    .catch(error => console.error('Erro ao carregar os projetos:', error));
});