function confirmDelete() {
    var confirmation = confirm("Are you sure you want to permanently delete your account?");    
    if (confirmation) {
      alert("Account deleted successfully!");
    } else {     
      alert("Account deletion canceled.");
    }
  }
  document.getElementById('input-file').addEventListener('change', function (event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
        const img = document.getElementById('profile-pic');
        img.src = reader.result;
    };

    if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]);
    }
});
document.getElementById('input-file').addEventListener('change', function(event) {
  var file = event.target.files[0]; // Get the selected file
  var reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById('profile-pic').src = e.target.result; // Update the image source with the selected file
  };

  reader.readAsDataURL(file);
});