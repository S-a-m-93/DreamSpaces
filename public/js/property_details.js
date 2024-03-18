// Event handler for window scroll
window.onscroll = () =>{
   // Remove 'active' class from menu when scrolling
   menu.classList.remove('active');
}

// Event listeners for input[type="number"] elements
document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
   inputNumber.oninput = () =>{
       // Restrict input to maximum length specified by 'maxLength' attribute
       if(inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
   };
});

// Event listeners for thumbnail images in property view
document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images =>{
   images.onclick = () =>{
       // Get the source attribute of clicked image
       src = images.getAttribute('src');
       // Set the source attribute of main image to clicked image source
       document.querySelector('.view-property .details .thumb .big-image img').src = src;
   }
});
// Event listener for submitting comments
const commentInput = document.getElementById("comment-input");
const submitButton = document.getElementById("submit-comment");
const commentsList = document.getElementById("comments-list");

submitButton.addEventListener("click", () => {
   // Trim the comment text and check if it's not empty
   const commentText = commentInput.value.trim();
   if (commentText !== "") {
       // Create user profile name and photo elements (replace with actual user data)
       const userProfileName = "Christian Bale"; // Example user profile name
       const userProfilePhoto = "/images/client_1.png"; // Example profile photo URL

       // Create a new comment element
       const commentElement = document.createElement("div");
       commentElement.classList.add("comment");

       // Create profile container to hold profile picture and name
       const profileContainer = document.createElement("div");
       profileContainer.classList.add("profile-container");

       // Create elements for user profile photo and name
       const profilePhotoElement = document.createElement("img");
       profilePhotoElement.src = userProfilePhoto;
       profilePhotoElement.alt = userProfileName + "'s profile photo";
       profilePhotoElement.classList.add("profile-photo");

       const profileNameElement = document.createElement("strong");
       profileNameElement.textContent = userProfileName;
       profileNameElement.classList.add("profile-name");

       // Append profile elements to the profile container
       profileContainer.appendChild(profilePhotoElement);
       profileContainer.appendChild(profileNameElement);

       // Create element for the comment text
       const commentTextElement = document.createElement("div");
       commentTextElement.textContent = commentText;
       commentTextElement.classList.add("comment-text");

       // Create helpful div
       const helpfulDiv = document.createElement("div");
       helpfulDiv.textContent = "Helpful (0)";
       helpfulDiv.classList.add("helpful-div");
       helpfulDiv.dataset.count = 0; // Initialize count to 0

       // Append profile container, comment text, and helpful div to comment element
       commentElement.appendChild(profileContainer);
       commentElement.appendChild(commentTextElement);
       commentElement.appendChild(helpfulDiv);

       // Append comment element to comments list
       commentsList.appendChild(commentElement);

       // Clear comment input field
       commentInput.value = "";
   }
});

// Event listener for helpful div
commentsList.addEventListener("click", (event) => {
   const target = event.target;
   if (target.classList.contains("helpful-div")) {
       // Get current count from dataset
       let currentCount = parseInt(target.dataset.count) || 0;

       // Increment count
       currentCount++;

       // Update count in dataset and text content
       target.dataset.count = currentCount;
       target.textContent = `Helpful (${currentCount})`;
   }
});
