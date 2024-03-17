

window.onscroll = () =>{
   menu.classList.remove('active');
}

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
   inputNumber.oninput = () =>{
      if(inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
   };
});

document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images =>{
   images.onclick = () =>{
      src = images.getAttribute('src');
      document.querySelector('.view-property .details .thumb .big-image img').src = src;
   }
});

document.querySelectorAll('.faq .box-container .box h3').forEach(headings =>{
   headings.onclick = () =>{
      headings.parentElement.classList.toggle('active');
   }
});
const commentInput = document.getElementById("comment-input");
const submitButton = document.getElementById("submit-comment");
const commentsList = document.getElementById("comments-list");

submitButton.addEventListener("click", () => {
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
        // Get the user profile name and photo (you can replace this with actual user data)
        const userProfileName = "Christian Bale"; // Example user profile name
        const userProfilePhoto = "images/client_1.png"; // Example profile photo URL

        // Create a new comment element
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        // Create a profile container to hold the profile picture and name
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

        // Append the profile container, comment text, and helpful div to the comment element
        commentElement.appendChild(profileContainer);
        commentElement.appendChild(commentTextElement);
        commentElement.appendChild(helpfulDiv);

        // Append the comment element to the comments list
        commentsList.appendChild(commentElement);

        // Clear the comment input field
        commentInput.value = "";
    }
});

// Event listener for the helpful div
commentsList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("helpful-div")) {
        // Get the current count from the data attribute
        let currentCount = parseInt(target.dataset.count) || 0;

        // Increment the count
        currentCount++;

        // Update the count in the dataset and the text content
        target.dataset.count = currentCount;
        target.textContent = `Helpful (${currentCount})`;
    }
});
