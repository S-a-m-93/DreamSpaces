const po_i = document.getElementById('object_id').innerText;
const view_property = document.getElementById('view_property');

view_property.addEventListener('click', () => {
    fetch('/property_details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ object_id: po_i })
    });
});