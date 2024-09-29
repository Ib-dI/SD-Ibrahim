
const iconList = document.querySelector('#icon-list')
const iconsBox = document.querySelectorAll('.box')
const TOGGLE = document.querySelector(".theme-toggle");
// Contact
const form = document.getElementById('formulaire')
const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const email = document.getElementById('email')
const message = document.getElementById('message')
const msgError = document.querySelectorAll('.error')
const titre = document.querySelector('.titre')
const inpt = document.querySelectorAll('input')

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

// ######### Contact #####

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des valeurs
    const prenomValue = prenom.value.trim();
    const nomValue = nom.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    // Réinitialisation des messages d'erreur
    msgError.forEach(error => {
        error.classList.add('invisible');
    });

    // Expression régulière pour valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation des champs
    if (prenomValue.length < 2 || prenomValue.length > 10) {
        console.log('Erreur prénom');
        prenom.nextElementSibling.classList.remove('invisible');
    } else if (nomValue.length < 3 || nomValue.length > 15) {
        console.log('Erreur nom');
        nom.nextElementSibling.classList.remove('invisible');
    } else if (!emailRegex.test(emailValue)) {
        console.log('Erreur email');
        email.nextElementSibling.classList.remove('invisible');
    } else if (messageValue.length < 10 || messageValue.length > 100) {
        console.log('Erreur message');
        message.nextElementSibling.classList.remove('invisible');
    } else {
        console.log('Succès');
        // Envoie le formulaire via EmailJS
        sendEmail(prenomValue, nomValue, emailValue, messageValue);

        // form.remove();  // 
        prenom.value= ""
        nom.value= ""
        email.value= ""
        message.value= ""
    }
});
function sendEmail(prenom, nom, email, message) {
    emailjs.send("service_q3cjzgs", "template_9ol8fnp", {
        prenom: prenom,
        nom: nom,
        email: email,
        message: message,
    })
    .then((response) => {
        console.log('E-mail envoyé avec succès', response.status, response.text);
        alert('Votre message a bien été envoyé !');
    }, (error) => {
        console.log('Erreur lors de l\'envoi de l\'e-mail', error);
        alert('Une erreur s\'est produite. Veuillez réessayer.');
    });
}


