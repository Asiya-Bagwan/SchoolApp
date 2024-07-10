function submitForm() {
    var form = document.getElementById('registration-form');
    var formData = new FormData(form);

    // Birthdate validation
    var dateOfBirth = new Date(formData.get('date_of_birth'));
    var minDate = new Date('1996-01-01');
    var maxDate = new Date('2000-12-31');

    if (dateOfBirth < minDate || dateOfBirth > maxDate) {
        document.getElementById('date-error').textContent = 'This is not a valid birthdate for a teacher. Please select a date between 1996 and 2000.';
        return;
    } else {
        document.getElementById('date-error').textContent = ''; // Clear error message
    }

    var endpoint = 'http://localhost:3001/createTeacher';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Teacher created successfully!');
                form.reset();
                window.location.href = 'teacherList.html';
            } else {
                alert('Failed to save record. Please try again.');
            }
        }
    };

    xhr.send(JSON.stringify(Object.fromEntries(formData))); // Send form data as JSON
}

function updateDateRange() {
    // Code for dynamic date range based on class selection (if needed)
    // Reset error message
    document.getElementById('date-error').textContent = '';
}