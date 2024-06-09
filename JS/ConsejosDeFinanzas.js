document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const indicators = document.querySelectorAll('.indicator');
    const items = carousel.children;
    let index = 0;

    function showItem(i) {
        carousel.style.transform = `translateX(${-i * 100}%)`;
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[i].classList.add('active');
    }

    function nextItem() {
        index = (index + 1) % items.length;
        showItem(index);
    }

    function prevItem() {
        index = (index - 1 + items.length) % items.length;
        showItem(index);
    }

    nextButton.addEventListener('click', nextItem);
    prevButton.addEventListener('click', prevItem);

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            index = i;
            showItem(index);
        });
    });

    setInterval(nextItem, 3000); // Cambiar cada 3 segundos

    showItem(index); // Mostrar el primer elemento al cargar
});
