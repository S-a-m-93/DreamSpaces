// Get all elements with the class "unread"
const unreadMessages = document.querySelectorAll(".unread");

// Get the element with the id "notifes"
const unread = document.getElementById("notifes");

// Get the element with the id "mark_all"
const markAll = document.getElementById("mark_all");

// Set the text content of the "notifes" element to the number of unread messages
unread.innerText = unreadMessages.length;

// Iterate over each unread message element and add a click event listener
unreadMessages.forEach((message) => {
    message.addEventListener("click", () => {
        // Remove the "unread" class from the clicked message
        message.classList.remove("unread");

        // Update the count of unread messages after removal
        const newUnreadMessages = document.querySelectorAll(".unread");
        unread.innerText = newUnreadMessages.length;
    })
})

// Add a click event listener to the "mark_all" button
markAll.addEventListener("click", () => {
    // Iterate over each unread message and remove the "unread" class
    unreadMessages.forEach(message => message.classList.remove("unread"))

    // Update the count of unread messages after all are marked as read
    const newUnreadMessages = document.querySelectorAll(".unread");
    unread.innerText = newUnreadMessages.length;
})

// Get all delete buttons
const deleteButtons = document.querySelectorAll(".delete_btn");

// Add event listener to each delete button
deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Find the parent notification element and remove it
        const notification = button.closest(".notification");
        notification.remove();
    });
});
