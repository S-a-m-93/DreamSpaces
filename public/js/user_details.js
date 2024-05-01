// Function to confirm deletion of account
function confirmDelete() {
  // Ask for confirmation from the user
  var confirmation = confirm("Are you sure you want to permanently delete your account?");    

  // Check if user confirmed deletion
  if (confirmation) {
      // Alert user about successful deletion
      alert("Account deleted successfully!");
  } else {     
      // Alert user about cancellation of deletion
      alert("Account deletion canceled.");
  }
}

// Event listener for changes in file input for profile picture
document.getElementById('image').addEventListener('change', function (event) {
  // Get the input element
  const input = event.target;
  
  // Create a new FileReader object
  const reader = new FileReader();

  // When file is loaded
  reader.onload = function () {
      // Get the profile picture element
      const img = document.getElementById('profile-pic');
      // Set the source of the profile picture to the loaded file
      img.src = reader.result;
  };

  // Check if files are selected
  if (input.files && input.files[0]) {
      // Read the selected file as a Data URL
      reader.readAsDataURL(input.files[0]);
  }
});
