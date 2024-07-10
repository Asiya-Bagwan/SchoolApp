$(document).ready(function() {
    var apiUrl = 'http://localhost:3001/students'; // Replace with your mock API URL
    var allStudents = [];

    function fetchStudents() {
        console.log('Fetching students...'); // Debugging log
        // AJAX POST request to fetch student list
        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function(response) {
                console.log('Response received:', response); // Debugging log
                if (response && Array.isArray(response.students)) {
                    allStudents = response.students;
                    displayStudents(allStudents);
                } else {
                    console.error('Expected an array of students but received:', response);
                    alert('Error: Expected an array of students.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error occurred:', error);
                alert('An error occurred while fetching the data.');
            }
        });
    }

    function displayStudents(students) {
        console.log('Displaying students:', students); // Debugging log
        $('#studentTable tbody').empty(); // Clear previous data
        students.forEach(function(student) {
            var tableRow = '<tr>' +
                           '<td><a href="studentDetails1.html?id=' + encodeURIComponent(student.id) + '">' +
                           student.id + '</a></td>' +
                           '<td>' + student.firstname + '</td>' +
                           '<td>' + student.lastname + '</td>' +
                           '<td>' + student.date_of_birth + '</td>' +
                           '<td>' + student.class + '</td>' +
                           '<td>' + student.mobileNo + '</td>' +
                           '</tr>';
            $('#studentTable tbody').append(tableRow); // Append row to table body
        });
    }

    $('#classDropdown').change(function() {
        var selectedClass = $(this).val(); // Get the selected class from the dropdown
        console.log('Selected class:', selectedClass); // Debugging log
        if (selectedClass) {
            // Filter students by the selected class
            var filteredStudents = allStudents.filter(function(student) {
                return student.class.toString() === selectedClass; // Ensure comparison is correct
            });
            console.log('Filtered students:', filteredStudents); // Debugging log
            displayStudents(filteredStudents); // Display the filtered students
        } else {
            displayStudents(allStudents); // Display all students if no class is selected
        }
    });

    $('#clearSearch').click(function() {
        $('#classDropdown').val(''); // Clear dropdown selection
        displayStudents(allStudents); // Display all students
    });

    // Initial fetch of student list
    fetchStudents();
});
