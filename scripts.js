$(document).ready(function() {
    // Submit form via AJAX
    $('#student-form').on('submit', function(e) {
        e.preventDefault();
        const formData = {
            first_name: $('#first-name').val(),
            last_name: $('#last-name').val(),
            date_of_birth: $('#dob').val(),
            class: $('#class').val(),
            mobile_number: $('#mobile-number').val()
        };

        $.ajax({
            url: 'https://b28e587f-7af4-4c19-9899-3c8274a3c5e1.mock.pstmn.io/students/create',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                if (response.status === 'success') {
                    window.location.href = 'list.html'; // Redirect to list page
                }
            }
        });
    });

    // Load student list
    function loadStudents(page = 1) {
        const searchString = $('#search').val();
        const classFilter = $('#class-filter').val();
        const filters = {
            search_string: searchString,
            filters: {
                class: classFilter
            }
        };

        $.ajax({
            url: 'https://b28e587f-7af4-4c19-9899-3c8274a3c5e1.mock.pstmn.io/students/list',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(filters),
            success: function(response) {
                const studentsTable = $('#students-table tbody');
                studentsTable.empty();
                response.forEach(student => {
                    const row = `<tr>
                        <td><a href="#" class="student-link" data-id="${student.id}">${student.first_name}</a></td>
                        <td>${student.last_name}</td>
                        <td>${student.class}</td>
                    </tr>`;
                    studentsTable.append(row);
                });
            }
        });
    }

    // Initial load
    loadStudents();

    // Search and filter functionality
    $('#search').on('input', loadStudents);
    $('#class-filter').on('change', loadStudents);

    // Pagination
    $('#prev-page').on('click', function() {
        // Implement pagination logic
    });

    $('#next-page').on('click', function() {
        // Implement pagination logic
    });

    // Load student details
    $(document).on('click', '.student-link', function(e) {
        e.preventDefault();
        const studentId = $(this).data('id');

        $.ajax({
            url: `{{url}}/students/details/${studentId}`,
            method: 'GET',
            success: function(response) {
                const detailsContainer = $('#details-container');
                detailsContainer.empty();
                const details = `<table>
                    <tr><th>First Name</th><td>${response.first_name}</td></tr>
                    <tr><th>Last Name</th><td>${response.last_name}</td></tr>
                    <tr><th>Date of Birth</th><td>${response.date_of_birth}</td></tr>
                    <tr><th>Class</th><td>${response.class}</td></tr>
                    <tr><th>Mobile Number</th><td>${response.mobile_number}</td></tr>
                </table>
                <a href="#" class="edit-link" data-id="${response.id}">Edit</a>`;
                detailsContainer.append(details);
            }
        });
    });

    // Edit student form
    $(document).on('click', '.edit-link', function(e) {
        e.preventDefault();
        const studentId = $(this).data('id');
        // Implement edit form logic
    });
});


function loadContent(url, id) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        });
}
function submitForm() {
    var form = document.getElementById('registration-form');
    var formData = new FormData(form);

    var endpoint = 'https://73dd31f3-6e26-44a0-836c-5738be080baa.mock.pstmn.io/StudentCreate';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Student created successfully!');
               // form.reset(); // Reset form after successful submission
               // window.location.href = 'studentList.html'; // Redirect to success page
                 loadContent('studentList.html', 'main-content');
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


        // JavaScript function to submit teacher form data
        function submitTeacherForm() {
            var form = document.getElementById('teacher-registration-form');
            var formData = new FormData(form);

            var endpoint = 'https://0d55a670-29ca-4e1f-9e65-be384960e94b.mock.pstmn.io/Teacher/create'; // Replace with actual endpoint
            var xhr = new XMLHttpRequest();
            xhr.open('POST', endpoint, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        alert('Teacher created successfully!');
                        form.reset(); // Reset form after successful submission
                        window.location.href = 'teacherList.html'; // Redirect to success page
                    } else {
                        alert('Failed to save record. Please try again.');
                    }
                }
            };

            xhr.send(JSON.stringify(Object.fromEntries(formData))); // Send form data as JSON
        }

        $(document).ready(function() {
            var apiUrl = 'https://0d55a670-29ca-4e1f-9e65-be384960e94b.mock.pstmn.io/Teacher/list'; // Replace with your mock API URL for teachers
        
            // AJAX POST request to fetch teacher list
            $.ajax({
                url: apiUrl,
                type: 'POST',
                success: function(response) {
                    if (response && Array.isArray(response.Teacher)) {
                        response.Teacher.forEach(function(teacher) {
                            var tableRow = '<tr>' +
                                           '<td><a href="teacherDetails.html?id=' + encodeURIComponent(teacher.id) + '">' +
                                           teacher.id + '</a></td>' +
                                           '<td>' + teacher.firstname + '</td>' +
                                           '<td>' + teacher.lastname + '</td>' +
                                           '<td>' + teacher.date_of_birth + '</td>' +
                                           '<td>' + teacher.class + '</td>' +
                                           '<td>' + teacher.mobileNo + '</td>' +
                                           '</tr>';
        
                            // Append the row to the table body
                            $('#teacherTable tbody').append(tableRow);
                        });
                    } else {
                        console.error('Expected an array of teachers but received:', response);
                        alert('Error: Expected an array of teachers.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error occurred:', error);
                    alert('An error occurred while fetching the data.');
                }
            });
        });
        