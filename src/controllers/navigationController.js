let currentFocus;

/**
 * Remove list item active state
 *
 * @param {Array <elements>} list - The array of list items
 *
 */
const removeActive = (list) => {
  // Remove "active" class from all list items
  for (let index = 0; index < list.length; index++) {
    list[index].classList.remove("autoComplete_selected");
  }
};

/**
 * Add active state to list item
 *
 * @param {Array <elements>} list - The array of list items
 *
 */
const addActive = (list) => {
  // Add "active" class to a list item
  if (!list) return false;
  // Remove "active" class from all list items
  removeActive(list);
  if (currentFocus >= list.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = list.length - 1;
  // Add "active" class to the item
  list[currentFocus].classList.add("autoComplete_selected");
};

/**
 * List Navigation Function
 *
 * @param {Object} event - The `keydown` event Object
 *
 */
const navigation = (event) => {
  let list = document.getElementById("autoComplete_list");
  if (list) list = list.getElementsByTagName("div");
  if (event.keyCode === 40) {
    // If the arrow DOWN key is pressed
    // increase the currentFocus
    currentFocus++;
    // and add "active" class to the list item
    addActive(list);
  } else if (event.keyCode === 38) {
    event.preventDefault();
    // If the arrow UP key is pressed
    // decrease the currentFocus
    currentFocus--;
    // and add "active" class to the list item
    addActive(list);
  } else if (event.keyCode === 13) {
    // If the ENTER key is pressed
    // prevent the form from its default behaviour "being submitted"
    event.preventDefault();
    if (currentFocus > -1) {
      // and simulate a click on the selected "active" item
      if (list) list[currentFocus].click();
    }
  }
};

/**
 * List navigation function initializer
 *
 * @param inputField
 *
 */
const navigate = (inputField) => {
  // Reset focus state
  currentFocus = -1;
  /**
   * @listens {keydown} Listens to all `keydown` events on the input field
   **/
  inputField.addEventListener("keydown", navigation);
};

export { navigate };
