// autoComplete.js input eventListener on connect event
document.querySelector("#autoCompleteJS").addEventListener("connect", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on initialization event
document.querySelector("#autoCompleteJS").addEventListener("init", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on data response event
document.querySelector("#autoCompleteJS").addEventListener("fetch", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on search results event
document.querySelector("#autoCompleteJS").addEventListener("results", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on post results list rendering event
document.querySelector("#autoCompleteJS").addEventListener("rendered", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on results list navigation
document.querySelector("#autoCompleteJS").addEventListener("navigation", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on post un-initialization event
document.querySelector("#autoCompleteJS").addEventListener("unInit", function (event) {
  console.log(event);
});

// The autoComplete.js Engine instance creator
const autoComplete = new autoCompleteJS({
  selector: "#autoCompleteJS",
  data: {
    src: async () => {
      // Loading placeholder text
      document.querySelector("#autoCompleteJS").setAttribute("placeholder", "Loading...");
      // Fetch External Data Source
      const source = await fetch("./db/generic.json");
      const data = await source.json();
      // Post Loading placeholder text
      document.querySelector("#autoCompleteJS").setAttribute("placeholder", autoComplete.placeHolder);
      // Returns Fetched data
      return data;
    },
    key: ["food", "cities", "animals"],
    cache: true,
  },
  query: {
    manipulate: function (query) {
      return `${query}`;
    },
  },
  searchEngine: "loose",
  placeHolder: "Search for Food & Drinks!",
  maxResults: 5,
  highlight: true,
  debounce: 300,
  threshold: 1,
  resultsList: {
    render: true,
    container: (element) => {
      // console.log(element);
    },
  },
  resultItem: {
    content: (data, element) => {
      // console.log(data, element);
    },
  },
  feedback: (data) => {
    console.log(data);
  },
  onSelection: (feedback) => {
    document.querySelector("#autoCompleteJS").value = "";
    console.log(feedback);
  },
});

// autoComplete.unInit();

// Toggle Search Engine Type/Mode
document.querySelector(".toggler").addEventListener("click", function () {
  // Holds the toggle button alignment
  const toggle = document.querySelector(".toggle").style.justifyContent;

  if (toggle === "flex-start" || toggle === "") {
    // Set Search Engine mode to Loose
    document.querySelector(".toggle").style.justifyContent = "flex-end";
    document.querySelector(".toggler").innerHTML = "Loose";
    autoComplete.searchEngine = "loose";
  } else {
    // Set Search Engine mode to Strict
    document.querySelector(".toggle").style.justifyContent = "flex-start";
    document.querySelector(".toggler").innerHTML = "Strict";
    autoComplete.searchEngine = "strict";
  }
});

// Toggle results list and other elements
const action = function (action) {
  const github = document.querySelector(".github-corner");
  const title = document.querySelector("h1");
  const mode = document.querySelector(".mode");
  const selection = document.querySelector(".selection");
  const footer = document.querySelector(".footer");

  if (action === "dim") {
    github.style.opacity = 1;
    title.style.opacity = 1;
    mode.style.opacity = 1;
    selection.style.opacity = 1;
    footer.style.opacity = 1;
  } else {
    github.style.opacity = 0.1;
    title.style.opacity = 0.3;
    mode.style.opacity = 0.2;
    selection.style.opacity = 0.1;
    footer.style.opacity = 0.1;
  }
};

// Toggle event for search input
// showing & hiding results list onfocus / blur
["focus", "blur"].forEach(function (eventType) {
  document.querySelector("#autoCompleteJS").addEventListener(eventType, function () {
    // Hide results list & show other elements
    if (eventType === "blur") {
      action("dim");
    } else if (eventType === "focus") {
      // Show results list & hide other elements
      action("light");
    }
  });
});
