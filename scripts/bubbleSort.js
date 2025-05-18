// Project name: algorithms
// by @mishaiomdin

// Algorithm: bubble sort
// Started on: 5.05.2025

window.onload = function () {
    populateListInput();
};

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
            value: localStorage.getItem(new_id) || getRandomInt(1, 1000)
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