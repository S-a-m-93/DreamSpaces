
window.onload = function() {
    showPropertyDetails(); // By default, show Property Details form
};

function showPropertyDetails() {
    var propertyDetailsForm = document.getElementById('PropertyDetailsform');
    var rentalDetailsForm = document.getElementById('RentalDetailsform');
    var localityDetailsForm = document.getElementById('LocalityDetailsform');
    var galleryAndScheduleForm = document.getElementById('Gallery');
    document.getElementById('Amenities').style.display = 'none';
    
    rentalDetailsForm.style.display = 'none';
    localityDetailsForm.style.display = 'none';
    galleryAndScheduleForm.style.display = 'none';
   
    propertyDetailsForm.style.display = 'block';
   
}

function showRentalDetails() {
    var propertyDetailsForm = document.getElementById('PropertyDetailsform');
    var rentalDetailsForm = document.getElementById('RentalDetailsform');
    var localityDetailsForm = document.getElementById('LocalityDetailsform');
    var galleryAndScheduleForm = document.getElementById('Gallery');
    document.getElementById('Amenities').style.display = 'none';

    propertyDetailsForm.style.display = 'none';
    localityDetailsForm.style.display = 'none';
    galleryAndScheduleForm.style.display = 'none';
    
    rentalDetailsForm.style.display = 'block';
    
}

function showLocalityDetails() {
    var propertyDetailsForm = document.getElementById('PropertyDetailsform');
    var rentalDetailsForm = document.getElementById('RentalDetailsform');
    var localityDetailsForm = document.getElementById('LocalityDetailsform');
    var galleryAndScheduleForm = document.getElementById('Gallery');
    document.getElementById('Amenities').style.display = 'none';

    propertyDetailsForm.style.display = 'none';
    rentalDetailsForm.style.display = 'none';
    
    galleryAndScheduleForm.style.display = 'none';
    localityDetailsForm.style.display = 'block';
   
   
}

function saveAndContinuePropertyDetails() {
    var plotArea = document.getElementById('plot-area').value;
    var length = document.getElementById('length').value;
    var width = document.getElementById('width').value;
    var floors = document.getElementById('floors').value;
    var bWall = document.getElementById('bWall').value;
    var project = document.getElementById('project').value;

    if (plotArea && length && width && floors && bWall && project) {
        showRentalDetails();
    } else {
        alert('Please fill in all required fields in Property Details before continuing.');
    }
}
function saveAndContinueRentalDetails() {
    var expectedRent = document.getElementById('Expected-rent').value.trim();
    var expectedCommission = document.getElementById('Expected-commission').value.trim();
    var description = document.getElementById('description-input').value.trim();
    var Propertytax = document.getElementById('Propertytax').value;
    var Occupancy = document.getElementById('Occupancy').value;
    if (expectedRent && expectedCommission && description && Propertytax && Occupancy) {
        // All required fields are filled, proceed to the next step or perform any necessary action
        showLocalityDetails()
    } else {
        // Alert the user to fill in all required fields before continuing
        alert('Please fill in all required fields in Rental Details before continuing.');
    }
}



  
function saveAndContinueLocalityDetails() {
    var city = document.getElementById('City').value;
    var locality = document.getElementById('Locality').value;
    var landmarkStreet = document.getElementById('Landmark / Street').value;
    var description = document.getElementById('description-input').value;

    if (city && locality && landmarkStreet && description) {
        showGalleryAndScheduleForm();
    } else {
        alert('Please fill in all required fields in Locality Details before continuing.');
    }
}

function showGalleryAndScheduleForm() {

    document.getElementById('PropertyDetailsform').style.display = 'none';
    document.getElementById('RentalDetailsform').style.display = 'none';
    document.getElementById('LocalityDetailsform').style.display = 'none';
    document.getElementById('Amenities').style.display = 'none';
    document.getElementById('Gallery').style.display = 'block';
    
}
document.getElementById('uploadBtn').addEventListener('click', function() {
    var fileInput = document.getElementById('image');
    var uploadStatus = document.getElementById('uploadStatus');
    var imageContainer = document.getElementById('imageContainer');
    
    // Clear previous uploaded images
    imageContainer.innerHTML = '';

    // Check if no files are selected
    if (fileInput.files.length === 0) {
        uploadStatus.textContent = 'Please select one or more images to upload.';
        return;
    }

    // Check if more than 10 files are selected
    if (fileInput.files.length > 10) {
        uploadStatus.textContent = 'You can only upload a maximum of 10 images.';
        return;
    }

    uploadStatus.textContent = 'Uploading...';

    // Function to handle the FileReader operation for each file
    var handleFile = function(file) {
        var reader = new FileReader();

        reader.onload = function(event) {
            // Create a div for each uploaded image
            var div = document.createElement('div');
            div.className = 'uploaded-image';
            
            // Create an img element and set its src to the uploaded image
            var img = document.createElement('img');
            img.src = event.target.result;

            // Append the img to the div
            div.appendChild(img);

            // Append the div to the image container
            imageContainer.appendChild(div);
        };

        reader.readAsDataURL(file);
    };

    // Iterate over each selected file and handle it
    for (var i = 0; i < fileInput.files.length; i++) {
        handleFile(fileInput.files[i]);
    }

    uploadStatus.textContent = 'Upload successful!';
});

function saveAndContinueGalleryDetails() {
    // Check if at least one image is uploaded
    var imageCount = document.getElementById('imageContainer').getElementsByTagName('img').length;
    if (imageCount > 0) {
        // At least one image is uploaded, proceed to the amenities form
        showAmenitiesForm();
    } else {
        // No image is uploaded, alert the user to upload at least one image
        alert('Please upload at least one image before continuing.');
    }
}
function showAmenitiesForm() {
    // Hide all other forms
    document.getElementById('PropertyDetailsform').style.display = 'none';
    document.getElementById('RentalDetailsform').style.display = 'none';
    document.getElementById('LocalityDetailsform').style.display = 'none';
    document.getElementById('Gallery').style.display = 'none';

    // Show the amenities form
    document.getElementById('Amenities').style.display = 'block';
}

function postProperty() {
    var propertyDetailsForm = document.getElementById('PropertyDetailsform');
    var rentalDetailsForm = document.getElementById('RentalDetailsform');
    var localityDetailsForm = document.getElementById('LocalityDetailsform');
    var galleryForm = document.getElementById('Gallery');
    var amenitiesForm = document.getElementById('Amenities');

    if (isFormFilled(propertyDetailsForm) && isFormFilled(rentalDetailsForm) && isFormFilled(localityDetailsForm) && isFormFilled(galleryForm) && isFormFilled(amenitiesForm)) {
        document.getElementById('post-message').style.display = 'block';
    } else {
        alert('Please fill in all details in every form before posting.');
    }
}

function isFormFilled(form) {
    var inputs = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            return false;
        }
    }
    return true;
}