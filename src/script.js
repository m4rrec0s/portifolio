window.sr = ScrollReveal({ reset: true });

sr.reveal('#header', { distance: '50px', duration: 1000 });
sr.reveal('#sec1', { distance: '70px', duration: 1500 });
// sr.reveal('#sec2', { distance: '100px', duration: 1500 });
sr.reveal('.item-project', { distance: '50px', interval: 30, reset: true, duration: 2000 });
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


fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    })
    .then(data => {
        showProjects(data);
    })
    .catch(error => console.error('Erro ao carregar projetos:', error));

function showProjects(data) {
    const container = document.getElementById('projects');
    const projects = data.projects || data;
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.innerHTML = `
            <div class="item-project">
                <img src="${project.imgUrl}" alt="${project.name}">
                <h3>${project.name}</h3>
                
                <div class="flex justify-center flex-wrap mb-2">
                    ${project.technologies.map(tag => `<span class="bg-nav text-sm opacity-70 p-2 rounded-lg m-1">${tag}</span>`).join('')}
                </div>
                <a href="${project.url}" target="_blank">Ver Projeto</a>
            </div>
        `;
        container.appendChild(projectElement);
    });
}