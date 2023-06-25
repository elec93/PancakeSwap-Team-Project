const svg = document.getElementById('telegram');
const lista = document.querySelector('.lista');

svg.addEventListener('mouseover', () => {
    if (lista) { 
        lista.style.display = 'block';
        lista.size = lista.options.length; 
    }
});

svg.addEventListener('mouseout', (event) => {
    if (lista && !lista.contains(event.relatedTarget)) { 
        lista.style.display = 'none';
        lista.size = 1; 
    }
});

lista.addEventListener('mouseout', (event) => {
    if (!lista.contains(event.relatedTarget)) { 
        lista.style.display = 'none';
        lista.size = 1; 
    }
});

const svgLanguage = document.getElementById('language-footer-svg');
const listaLanguage = document.querySelector('.language-select');

svgLanguage.addEventListener('mouseover', () => {
    if (listaLanguage) { 
        listaLanguage.style.display = 'block';
        listaLanguage.size = listaLanguage.options.length; 
    }
});

svgLanguage.addEventListener('mouseout', (event) => {
    if (listaLanguage && !listaLanguage.contains(event.relatedTarget)) { 
        listaLanguage.style.display = 'none';
        listaLanguage.size = 1; 
    }
});

listaLanguage.addEventListener('mouseout', (event) => {
    if (!listaLanguage.contains(event.relatedTarget)) { 
        listaLanguage.style.display = 'none';
        listaLanguage.size = 1; 
    }
});
