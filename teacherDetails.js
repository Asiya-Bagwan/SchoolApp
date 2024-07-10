$(document).ready(function() {
    // Extract teacher ID from URL
    var urlParams = new URLSearchParams(window.location.search);
    var teacherId = urlParams.get('id');

    if (teacherId) {
        var apiUrl = 'http://localhost:3001/Teachers'; // Replace with your mock API URL

        // AJAX GET request to fetch teacher details
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json', // Ensure the response is parsed as JSON
            success: function(response) {
                console.log('Response:', response); // Log the response for debugging
                if (response && Array.isArray(response)) {
                    // Find the teacher with the matching ID
                    var teacher = response.find(function(teacher) {
                        return teacher.id == teacherId;
                    });

                    if (teacher) {
                        var detailsHtml = `
                            <ul>
                                <li><strong>ID:</strong> <span>${teacher.id}</span></li>
                                <li><strong>First Name:</strong> <span>${teacher.firstname}</span></li>
                                <li><strong>Last Name:</strong> <span>${teacher.lastname}</span></li>
                                <li><strong>Date of Birth:</strong> <span>${teacher.date_of_birth}</span></li>
                                <li><strong>Class:</strong> <span>${teacher.class}</span></li>
                                <li><strong>Mobile No:</strong> <span>${teacher.mobileNo}</span></li>
                            </ul>`;

                        // Append details to the page
                        $('#teacherDetails').html(detailsHtml);
                    } else {
                        console.error('Teacher not found');
                        alert('Error: Teacher not found.');
                    }
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
    } else {
        alert('Teacher ID not provided.');
    }
});