// Toggle Form
const container = document.querySelector(".container");
const inputs = document.querySelectorAll(".form-box input[type = 'password']");
const icons = [...document.querySelectorAll(".form-icon")];
const spans = [...document.querySelectorAll(".form-box .top span")];
const section = document.querySelector("section");

spans.map((span) => {
  span.addEventListener("click", (e) => {
    const color = e.target.dataset.id;
    container.classList.toggle("active");
    section.classList.toggle("active");
    document.querySelector(":root").style.setProperty("--custom", color);
  });
});

Array.from(inputs).map((input) => {
  icons.map((icon) => {
    icon.innerHTML = `<img src="./images/eye.svg" alt="" />`;

    icon.addEventListener("click", () => {
      const type = input.getAttribute("type");
      if (type === "password") {
        input.setAttribute("type", "text");
        icon.innerHTML = `<img src="./images/hide.svg" alt="" />`;
      } else if (type === "text") {
        input.setAttribute("type", "password");
        icon.innerHTML = `<img src="./images/eye.svg" alt="" />`;
      }
    });
  });
});

// Client-side validation for email format
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", () => {
  const email = emailInput.value;
  const emailError = document.getElementById("email-error");

  if (!validateEmail(email)) {
    emailError.textContent = "Invalid email format";
  } else {
    emailError.textContent = "";
  }
});

// Client-side validation for email format
const emailInputlogin = document.getElementById("l_email");
emailInputlogin.addEventListener("input", () => {
  const email = emailInputlogin.value;
  const emailError = document.getElementById("email-error");

  if (!validateEmail(email)) {
    emailError.textContent = "Invalid email format";
  } else {
    emailError.textContent = "";
  }
});

// Client-side validation for phone number format
const phoneInput = document.getElementById("number");
phoneInput.addEventListener("input", () => {
  const phone = phoneInput.value;
  const phoneError = document.getElementById("phone-error");

  if (!validatePhone(phone)) {
    phoneError.textContent = "Invalid phone number";
  } else {
    phoneError.textContent = "";
  }
});

// Email validation function
function validateEmail(email) {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(email);
}

// Phone number validation function
function validatePhone(phone) {
    return phone.length === 10; 
}
