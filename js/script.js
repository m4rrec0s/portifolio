window.sr = ScrollReveal({ reset: true });

sr.reveal('.bloco1', { distance: '50px', duration: 1000 });
sr.reveal('.bloco2', { distance: '50px', duration: 1500 });
sr.reveal('.bloco3', { distance: '50px', duration: 1000 });
sr.reveal('.poj', { distance: '50px', interval: 30, reset: true, duration: 2000 });
sr.reveal('footer', { distance: '50px', duration: 1500 });

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