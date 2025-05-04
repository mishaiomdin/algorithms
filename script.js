// Project name: 
// Started on: 
// Link: 
// by @mishaiomdin


// script.js

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
    populateListInput();
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
            if (element) element.textContent = value;
        });
    } catch (error) {
        console.error("Error loading translations:", error);
    }
};

/* SORTING ALGORITHMS */

const list_length = 10;

function populateListInput() {
    const input_list = document.getElementById("list");
    for (let i = 1; i <= list_length; i++) {
        const new_id = `list_element${i}`;

        const new_list_element_with_index = createElementWithArgs(
            "span", 
            '',
            {
                class: 'list_element_with_index'
            }
        );

        const new_list_element = createElementWithArgs(
            "input", 
            "",
            {
            class: "list_element",
            type:  "number",
            min:   "1",
            max:   "99",
            id:    new_id,
            index: i,
            value: localStorage.getItem(new_id) || getRandomInt(1, 100)
          }
        );
        new_list_element.addEventListener('input', saveLocalDataCallback);

        new_list_element_with_index.appendChild(new_list_element);
        
        const new_list_index = createElementWithArgs(
            'label', 
            `#${i}`,
            {
                for:   new_id,
                class: 'list_index'
            }
        );

        new_list_element_with_index.appendChild(new_list_index);
        

        input_list.appendChild(new_list_element_with_index);
    }
}

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
  
  

async function runBubble(until=list_length, between_swaps = 500) {
    for (let i = 1; i < until; i++) {
      let element1 = document.getElementById(`list_element${i}`);
      let element2 = document.getElementById(`list_element${i + 1}`);
  
      element1.classList.add("list_element_highlighted");
  
      await sleep(50);
  
      if (Number(element1.value) > Number(element2.value)) {
        await swapElementsAnimated(element1, element2);
      }
      else {
        element1.classList.remove("list_element_highlighted");
      }
  
      await sleep(between_swaps);
    }
  }
  

async function bubbleSort(between_swaps=500, between_bubbles=1000) {
    for (let until_i = list_length; until_i >= 1; until_i--) {
        await runBubble(until_i, between_swaps);
        let last_sorted_element = document.getElementById(`list_element${until_i}`);
        last_sorted_element.classList.add("list_element_sorted");
        await sleep(between_bubbles);
    }
}

async function shuffleList() {
    const elements = [];
  
    // Collect all input elements in order
    for (let i = 1; i <= list_length; i++) {
      const el = document.getElementById(`list_element${i}`);
      elements.push(el);
    }
  
    // Fisher-Yates shuffle
    for (let i = elements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (i !== j) {
        await swapElementsAnimated(elements[i], elements[j]);
  
        // After the swap, update the list with the new references
        for (let k = 0; k < list_length; k++) {
          elements[k] = document.getElementById(`list_element${k + 1}`);
        }
      }
    }
  }
  


  

  
