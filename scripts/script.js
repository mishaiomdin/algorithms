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

function saveLocalDataCallback(event) {
    localStorage.setItem(event.currentTarget.id, event.currentTarget.value);
}

function saveLocalData(element) {
    localStorage.setItem(element.id, element.value);
}

async function swapElementsAnimated(element1, element2) {
    return new Promise(resolve => {
      if (!element1 || !element2 || element1 === element2) return resolve();
  
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();
  
      const dx = rect2.left - rect1.left;
      const dy = rect2.top - rect1.top;
  
      element1.style.transition = "transform 0.4s";
      element2.style.transition = "transform 0.4s";
      element1.style.transform = `translate(${dx}px, ${dy}px)`;
      element2.style.transform = `translate(${-dx}px, ${-dy}px)`;
  
      // Wait for animation to complete
      setTimeout(() => {
        element1.style.transition = "";
        element2.style.transition = "";
        element1.style.transform = "";
        element2.style.transform = "";
  
        // Get wrapper <span> elements
        const wrapper1 = element1.closest(".list_element_with_index");
        const wrapper2 = element2.closest(".list_element_with_index");
        const parent = wrapper1.parentNode;
  
        // Create a placeholder to facilitate swapping
        const placeholder = document.createElement("span");
        parent.replaceChild(placeholder, wrapper1);
        parent.replaceChild(wrapper1, wrapper2);
        parent.replaceChild(wrapper2, placeholder);
  
        // Swap IDs
        const tempId = element1.id;
        element1.id = element2.id;
        element2.id = tempId;
  
        // Also swap labels' "for" attributes and text content
        const label1 = wrapper1.querySelector("label");
        const label2 = wrapper2.querySelector("label");
  
        const tempFor = label1.htmlFor;
        label1.htmlFor = label2.htmlFor;
        label2.htmlFor = tempFor;
  
        const tempText = label1.textContent;
        label1.textContent = label2.textContent;
        label2.textContent = tempText;
  
        // Save both elements to local storage
        saveLocalData(element1);
        saveLocalData(element2);
  
        resolve();
      }, 400);
    });
  }


  

  
