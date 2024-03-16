document.addEventListener("DOMContentLoaded", function() {
    // Function to activate tab by ID
    function activateTab(tabId) {
        // Add "active" class to the tab list item with the specified ID
        var tabListItem = document.getElementById(tabId);
        if (tabListItem) {
            tabListItem.classList.add('active');
            tabListItem.classList.add('show');
            tabListItem.setAttribute("aria-selected", "true");
            tabListItem.setAttribute("aria-expanded", "true");
        }
    }

    // Extract query parameters from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var activeTab = urlParams.get('tab');
    var tabId = urlParams.get('tabId');

    // Activate the tab based on the query parameters
    if (activeTab && tabId) {
        activateTab(tabId);
        activateTab(activeTab);
    }
});

let isOpen = false;
      document.querySelector(".mobile-view").onclick = () => {
        let menu = document.querySelector("#top-menu");
        if (isOpen) {
          menu.style.display = "none";
        } else {
          menu.style.display = "flex";
        }
        isOpen = !isOpen;
      };

      document.querySelector("#filter-btn").onclick = () => {
        document.querySelector(".filters").classList.add("active");
      };

      document.querySelector("#close-filter").onclick = () => {
        document.querySelector(".filters").classList.remove("active");
      };

      function updateWindowSize() {
        const width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        const height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        if (width > 550) {
          isOpen = true;
          document.querySelector("#top-menu").style.display = "flex";
        } else {
          isOpen = false;
          document.querySelector("#top-menu").style.display = "none";
        }
      }

      updateWindowSize();
      window.addEventListener("resize", updateWindowSize);