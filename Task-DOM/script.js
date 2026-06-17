"use strict";

document.addEventListener("DOMContentLoaded", () => {

    //  1. THEME TOGGLE (Attributes, Properties, classList)

  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;

  themeToggleBtn.addEventListener("click", () => {
    // Reading dataset property
    const currentTheme = htmlRoot.dataset.theme; 
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // 1. Using setAttribute (HTML Attribute)
    htmlRoot.setAttribute("data-theme", newTheme);
    // 2. Using dataset (DOM Property)
    // htmlRoot.dataset.theme = newTheme; 
    
    // Update button text accordingly
    themeToggleBtn.textContent = newTheme === "dark" ? "Dark" : "Light";

    // 3. Using classList for demonstration
    document.body.classList.toggle("theme-changed");
    
    // Log
    console.log(`Theme toggled to: ${newTheme}`);
  });


    //  2. ATTRIBUTES VS PROPERTIES DEMO

  const taskInput = document.getElementById("task-input");
  const propOutput = document.getElementById("prop-output");
  const attrOutput = document.getElementById("attr-output");

  // As the user types, property changes but attribute doesn't unless explicitly set
  taskInput.addEventListener("input", () => {
    propOutput.textContent = `"${taskInput.value}"`; // Live Property
    attrOutput.textContent = `"${taskInput.getAttribute("value")}"`; // Static HTML Attribute
  });


    //  3. DOM MANIPULATION & TASK MANAGEMENT

  const taskForm = document.getElementById("task-form");
  const taskCategory = document.getElementById("task-category");
  const tasksContainer = document.getElementById("tasks-container");
  
  let taskIdCounter = 1;

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh

    const taskText = taskInput.value.trim();
    const category = taskCategory.value;

    if (!taskText) return;

    createTask(taskText, category);

    // Reset input
    taskInput.value = "";
    taskInput.dispatchEvent(new Event("input")); // refresh demo
  });

  function createTask(text, category) {
    // Create new element securely using DOM API
    const card = document.createElement("div");
    card.classList.add("task-card");
    
    // Setting custom data attributes
    card.setAttribute("data-id", taskIdCounter++);
    card.setAttribute("data-status", "pending");
    card.dataset.category = category; // Using dataset as well
    
    // Build inner HTML structure
    card.innerHTML = `
      <div class="task-info">
        <strong class="task-title">${text}</strong>
        <span class="badge category-badge">${category}</span>
      </div>
      <div class="task-actions">
        <button class="btn btn-small btn-complete">Complete</button>
        <button class="btn btn-small btn-edit">Edit</button>
        <button class="btn btn-small btn-danger btn-delete">Delete</button>
      </div>
    `;

    // Demonstration of append() vs prepend()
    // If user types "Urgent:", it goes to the top (prepend). 
    // Otherwise it goes to the bottom (append).
    if (text.toLowerCase().startsWith("urgent")) {
      const urgentBadge = document.createElement("span");
      urgentBadge.className = "badge";
      urgentBadge.style.backgroundColor = "var(--danger-color)";
      urgentBadge.innerText = "High Priority";
      
      // Demonstrating prepend() and before()
      const taskInfo = card.querySelector(".task-info");
      const title = taskInfo.querySelector(".task-title");
      
      // Insert badge BEFORE the title
      title.before(urgentBadge);
      
      // Prepend to container
      tasksContainer.prepend(card);
    } else {
      // Normal append
      tasksContainer.append(card);
    }
  }


    //  4. EVENT DELEGATION

  // Attach ONE event listener to the parent container
  tasksContainer.addEventListener("click", (e) => {
    // Find the closest task card that contains the clicked element
    const card = e.target.closest(".task-card");
    if (!card) return;

    // --- DELETE TASK (Demonstrating remove) ---
    if (e.target.classList.contains("btn-delete")) {
      card.remove(); 
    }

    // --- COMPLETE TASK ---
    if (e.target.classList.contains("btn-complete")) {
      card.classList.toggle("completed");
      const isCompleted = card.classList.contains("completed");
      card.setAttribute("data-status", isCompleted ? "completed" : "pending");
      
      if (isCompleted) {
        // Demonstrating after(): Add a thumbs up icon after the title
        const thumb = document.createElement("span");
        thumb.innerHTML = " 👍";
        thumb.className = "thumb-icon";
        const title = card.querySelector(".task-title");
        title.after(thumb);
      } else {
        const thumb = card.querySelector(".thumb-icon");
        if (thumb) thumb.remove();
      }
    }

    // --- EDIT TASK (Demonstrating replaceWith) ---
    if (e.target.classList.contains("btn-edit")) {
      const titleEl = card.querySelector(".task-title");
      if (!titleEl) return; // Already editing
      
      const currentText = titleEl.textContent;
      
      // Create input element
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = currentText;
      editInput.className = "edit-task-input";
      
      // Replace the strong tag with the input tag
      titleEl.replaceWith(editInput);
      editInput.focus();

      // Ensure we switch back on blur or enter
      const saveEdit = () => {
        const newText = editInput.value.trim() || currentText; // fallback if empty
        const newTitleEl = document.createElement("strong");
        newTitleEl.className = "task-title";
        newTitleEl.textContent = newText;
        
        // Replace input back to strong
        editInput.replaceWith(newTitleEl);
      };

      editInput.addEventListener("blur", saveEdit);
      editInput.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") saveEdit();
      });
    }
  });


    //  5. EVENT PROPAGATION DEMONSTRATION
    
  const propLogList = document.getElementById("prop-log-list");
  const clearLogBtn = document.getElementById("clear-log-btn");
  const modeRadios = document.querySelectorAll('input[name="prop-mode"]');
  const stopPropCheck = document.getElementById("stop-prop-check");

  let useCapture = false;

  function logEvent(message) {
    const li = document.createElement("li");
    li.textContent = message;
    propLogList.append(li);
    // auto-scroll console
    propLogList.parentElement.scrollTop = propLogList.parentElement.scrollHeight;
  }

  clearLogBtn.addEventListener("click", () => {
    propLogList.innerHTML = "";
  });

  // Re-attach listeners when mode changes
  modeRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      useCapture = e.target.value === "capture";
      setupPropagationListeners();
      logEvent(`--- Switched to ${useCapture ? 'Capturing' : 'Bubbling'} ---`);
    });
  });

  function createPropHandler(elementName) {
    return function (e) {
      // Check if stop propagation is active
      if (stopPropCheck.checked) {
        e.stopPropagation();
        logEvent(`${elementName} Clicked. Event Stopped!`);
      } else {
        logEvent(`${elementName} Clicked.`);
      }
    };
  }

  let gpHandler, parentHandler, childHandler;
  let gpEl, parentEl, childBtnEl;

  function setupPropagationListeners() {
    // Get Elements
    gpEl = document.getElementById("grandparent");
    parentEl = document.getElementById("parent");
    childBtnEl = document.getElementById("child-btn");

    // Remove old listeners to avoid duplicates
    // Standard way without keeping reference is cloning the node
    const gpClone = gpEl.cloneNode(true);
    gpEl.replaceWith(gpClone);
    
    // Re-select after cloning
    gpEl = document.getElementById("grandparent");
    parentEl = document.getElementById("parent");
    childBtnEl = document.getElementById("child-btn");

    // Create handlers
    gpHandler = createPropHandler("Grandparent");
    parentHandler = createPropHandler("Parent");
    childHandler = createPropHandler("Child");

    // Add event listeners with correct phase flag
    gpEl.addEventListener("click", gpHandler, useCapture);
    parentEl.addEventListener("click", parentHandler, useCapture);
    childBtnEl.addEventListener("click", childHandler, useCapture);
  }

  // Initial setup
  setupPropagationListeners();

});
