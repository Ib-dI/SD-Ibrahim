import Prism from 'https://cdn.skypack.dev/prismjs'

const iconList = document.querySelector('#icon-list')

const iconsBox = document.querySelectorAll('.box')
const TOGGLE = document.querySelector(".theme-toggle");

iconsBox.forEach((icon) => {
    // Récupère la width du ul.
    const initialWidth = iconList.offsetWidth
    
    icon.addEventListener('mouseenter', () => {
        iconList.style.width = `${initialWidth + (icon.offsetWidth - 38)}px`
    })
    icon.addEventListener('mouseleave', () => {
        iconList.style.width = `${initialWidth}px`

    })
})

// ###### DARK MODE ######
const SWITCH = () => {
    const isDark = TOGGLE.matches("[aria-pressed=true]") ? false : true;
    TOGGLE.setAttribute("aria-pressed", isDark);
    document.documentElement.className = isDark ? 'dark' : 'light'

    // Stockage de l'état du thème dans localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
// Fonction pour charger le thème au démarrage
const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme;
        TOGGLE.setAttribute("aria-pressed", savedTheme === 'dark');
    }
};
const TOGGLE_THEME = () => {
    if (!document.startViewTransition) SWITCH()
    document.startViewTransition(SWITCH)
};
loadTheme()

TOGGLE.addEventListener("click",TOGGLE_THEME);

// ######### ##### #####
