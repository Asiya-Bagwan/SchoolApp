function submitForm() {
    var form = document.getElementById('registration-form');
    var formData = new FormData(form);

    var endpoint = 'http://localhost:3001/createStudent';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Student created successfully!');
               form.reset(); // Reset form after successful submission
                window.location.href = 'studentList.html'; // Redirect to success page
            } else {
                alert('Failed to save record. Please try again.');
            }
        }
    };

    xhr.send(JSON.stringify(Object.fromEntries(formData))); // Send form data as JSON
}

function updateDateRange() {
    var classSelect = document.getElementById('class');
    var selectedClass = parseInt(classSelect.value);
    var now = new Date();

    // Calculate max and min birthdates based on selected class
    var maxAge = 0;
    var minAge = 0;

    switch (selectedClass) {
        case 1:
            maxAge = 8;
            minAge = 7;
            break;
        case 2:
            maxAge = 9;
            minAge = 8;
            break;
        case 3:
            maxAge = 10;
            minAge = 9;
            break;
        case 4:
            maxAge = 11;
            minAge = 10;
            break;
        case 5:
            maxAge = 12;
            minAge = 11;
            break;
        case 6:
            maxAge = 13;
            minAge = 12;
            break;
        case 7:
            maxAge = 14;
            minAge = 13;
            break;
        case 8:
            maxAge = 15;
            minAge = 14;
            break;
        case 9:
            maxAge = 16;
            minAge = 15;
            break;
        case 10:
            maxAge = 17;
            minAge = 16;
            break;
        default:
            break;
    }

    var maxBirthdate = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());
    var minBirthdate = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());

    var dobInput = document.getElementById('date_of_birth');
    dobInput.setAttribute('max', formatDate(maxBirthdate));
    dobInput.setAttribute('min', formatDate(minBirthdate));

    // Reset error message
    document.getElementById('date-error').textContent = '';
}

function formatDate(date) {
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}