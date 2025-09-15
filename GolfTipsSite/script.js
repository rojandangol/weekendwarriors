import axios from "axios";

let tips = []; // Simulated tip storage

// Add new tip to list
function addTipToList(tip) {
  axios.post("http://10.0.0.248:3000/addTip", tip)
    .then(response => {
      if (response.status === 200) {
        console.log("Tip added successfully:", tip);
      } else {
        console.error("Failed to add tip:", response.statusText);
        alert("Failed to add tip. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error adding tip:", error);
      alert("Failed to add tip. Please try again.");
    });
  updateDeleteDropdown();
}

// Remove tip from list
function deleteTipByTitle(title) {
  tips = tips.filter(tip => tip.title !== title);
  updateDeleteDropdown();
  alert(`Deleted tip titled: "${title}"`);
}

// Populate dropdown
function updateDeleteDropdown() {
  const select = document.getElementById("deleteTipSelect");
  select.innerHTML = '<option value="">-- Select a tip to delete --</option>';
  tips.forEach(tip => {
    const option = document.createElement("option");
    option.value = tip.title;
    option.textContent = tip.title;
    select.appendChild(option);
  });
}

// Handle tip form submission
document.getElementById("tipForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const video = document.getElementById("video").value.trim();
  const category = document.getElementById("category").value;
  const newCategory = document.getElementById("newCategory").value.trim();

  if (!title || !body) {
    alert("Title and Body are required.");
    return;
  }

  if (!category && !newCategory) {
    alert("You must select an existing category or create a new one.");
    return;
  }

  if (category && newCategory) {
    alert("Please choose either an existing category OR create a new one, not both.");
    return;
  }

  const finalCategory = category || newCategory;

  const newTip = {
    title,
    body,
    category: finalCategory,
    video
  };

  addTipToList(newTip);
  alert("Tip successfully submitted!");
  this.reset();
});

// Handle tip deletion
document.getElementById("deleteTipBtn").addEventListener("click", () => {
  const selected = document.getElementById("deleteTipSelect").value;
  if (!selected) {
    alert("Please select a tip to delete.");
    return;
  }
  if (confirm(`Are you sure you want to delete "${selected}"?`)) {
    deleteTipByTitle(selected);
  }
});
