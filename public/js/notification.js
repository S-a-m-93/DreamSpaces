const unreadMessages = document.querySelectorAll(".unread");
const unread = document.getElementById("notifes");
const markAll = document.getElementById("mark_all");
unread.innerText=unreadMessages.length

unreadMessages.forEach((message) => {
    message.addEventListener("click", () => {
        message.classList.remove("unread");
        const newUnreadMessages = document.querySelectorAll(".unread");
        unread.innerText = newUnreadMessages.length;
    })
})
markAll.addEventListener("click", () => {
    unreadMessages.forEach(message => message.classList.remove("unread"))
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
