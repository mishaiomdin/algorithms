// Project name: algorithms
// Started on: 5.05.2025
// by @mishaiomdin


// main_script.js

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function createElementWithArgs(tag, text = '', attributes = {}) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
    return el;
}


window.onload = function () {
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.getElementById("languageSelector").value = savedLanguage;
    changeLanguage();
};

/* Language choice */
async function changeLanguage() {
    const lang = document.getElementById("languageSelector").value;
    localStorage.setItem("language", lang); // Save selected language

    try {
        const response = await fetch('translations.json');
        const translations = await response.json();

        if (!translations[lang]) {
            console.error("Language not found:", lang);
            return;
        }

        // Apply translations dynamically
        Object.entries(translations[lang]).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                // Find first text node
                const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.nodeValue = value;
                } else {
                    // If no text node, insert one at the beginning
                    element.insertBefore(document.createTextNode(value), element.firstChild);
                }
            }
        });
    } catch (error) {
        console.error("Error loading translations:", error);
    }
};


  

  
