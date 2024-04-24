document.addEventListener("DOMContentLoaded", function () {
    // Get the modal parameter from the URL
    const modalToOpen = getParameterByName("modal");

    // Show the specified modal if a valid modal ID is provided in the URL
    if (modalToOpen) {
      const modalElement = document.getElementById(modalToOpen);
      const modalInstance = new bootstrap.Modal(modalElement, {
        backdrop: "static", // Prevent closing modal by clicking outside
        keyboard: false, // Prevent closing modal with escape key
      });
      modalInstance.show();
    }
  });

  // Function to parse URL parameters
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }