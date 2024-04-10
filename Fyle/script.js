document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tax-form");
    const errorIcons = document.querySelectorAll(".error-icon");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      hideErrorIcons();
  
      // Fetch user inputs
      const income = parseFloat(document.getElementById("income").value);
      const extraIncome = parseFloat(document.getElementById("extra-income").value);
      const deductions = parseFloat(document.getElementById("deductions").value);
      const age = document.getElementById("age").value;
  
      // Validate inputs
      let isValid = true;
      if (isNaN(income) || income < 0) {
        showErrorIcon(document.getElementById("income"));
        isValid = false;
      }
      if (isNaN(extraIncome) || extraIncome < 0) {
        showErrorIcon(document.getElementById("extra-income"));
        isValid = false;
      }
      if (isNaN(deductions) || deductions < 0) {
        showErrorIcon(document.getElementById("deductions"));
        isValid = false;
      }
  
      if (!isValid) {
        return;
      }
  
      // Calculate tax
      const taxableIncome = Math.max(0, income + extraIncome - deductions - 800000);
      let tax = 0;
      if (taxableIncome > 0) {
        switch (age) {
          case "<40":
            tax = 0.3 * taxableIncome;
            break;
          case "≥40 &lt;60":
            tax = 0.4 * taxableIncome;
            break;
          case "≥60":
            tax = 0.1 * taxableIncome;
            break;
        }
      }
  
      // Display result in modal
      showModal(tax);
    });
  
    function showErrorIcon(inputElement) {
      const errorIcon = inputElement.nextElementSibling;
      errorIcon.style.display = "inline";
    }
  
    function hideErrorIcons() {
      errorIcons.forEach((icon) => {
        icon.style.display = "none";
      });
    }
  
    function showModal(tax) {
      const modalContent = `
        <h2>The Overall income will be</h2>
        <p> ₹${tax.toFixed(2)} \nafter Tax Deduction </p>
        <button id="close-modal">Close</button>
      `;
  
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = modalContent;
      document.body.appendChild(modal);
  
      const closeModalButton = document.getElementById("close-modal");
      closeModalButton.addEventListener("click", function () {
        modal.remove();
      });
    }
  });
  
  