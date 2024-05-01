const Signup = require("../../models/Signup");

function showSection(sectionId) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  }
  
  
  function changePassword() {
      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      // Perform password change logic (e.g., API call) here
      if (newPassword !== confirmPassword) {
          alert('New password and confirm password do not match.');
      } else {
          alert('Password changed successfully!');
          // Clear password fields after change
          document.getElementById('currentPassword').value = '';
          document.getElementById('newPassword').value = '';
          document.getElementById('confirmPassword').value = '';
      }
  }
  
  // async function getProperty(propertyId) {
  //   // Fetch the property name from the database based on the propertyId
  //   const property = await Signup.findById(propertyId);
  //   return property ? property.name : 'Unknown Property';
  // }
  
  async function getUsername(userId) {
    // Fetch the username from the database based on the userId
    const user = await Signup.findById(userId);
    return user ? user.email : 'Unknown User';
  }
  