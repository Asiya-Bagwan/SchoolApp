$(document).ready(function() {
    var apiUrl = 'http://localhost:3001/students?page=1&limit=10'; // Replace with your mock API URL
    var allStudents = [];

    function fetchStudents() {
        console.log('Fetching students...'); // Debugging log
        // AJAX POST request to fetch student list
        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function(response) {
                console.log('Response received:', response); // Debugging log
                if (response && Array.isArray(response)) {
                    allStudents = response;
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
                           '<td><a href="studentDetails.html?id=' + encodeURIComponent(student.id) + '">' +
                           student.id + '</a></td>' +
                           '<td>' + student.firstname + '</td>' +
                           '<td>' + student.lastname + '</td>' +
                           '<td>' + student.date_of_birth + '</td>' +
                           '<td>' + student.class + '</td>' +
                           '<td>' + student.mobileNo + '</td>' +
                           '<td>' +
                           '<i class="fas fa-edit edit-icon" data-id="' + student.id + '"></i>' + // Edit icon
                           '<i class="fas fa-trash delete-icon" data-id="' + student.id + '"></i>' + // Delete icon
                           '</td>' +
                           '</tr>';
            $('#studentTable tbody').append(tableRow); // Append row to table body
        });

        $('.edit-icon').click(function() {
            var studentId = $(this).data('id');
            console.log('Edit student with ID:', studentId); // Debugging log
            // Find the student object by ID
            var student = allStudents.find(function(s) {
                return s.id === studentId;
            });
            if (student) {
                // Example of editing: You can redirect to an edit page or open a modal for editing
                editStudent(student); // Pass the student object to edit function
            } else {
                console.error('Student not found with ID:', studentId);
                alert('Student not found. Unable to edit.');
            }
        });

        // Event listener for delete icon click
        $('.delete-icon').click(function() {
            var studentId = $(this).data('id');
            console.log('Delete student with ID:', studentId); // Debugging log
            // Example of deleting: You can confirm deletion and make an AJAX call to delete student
            deleteStudent(studentId);
        });
    }


  

    // Initial fetch of student list
    fetchStudents();
    window.filterStudents = function() {
        var selectedClass = $('#studentFilter').val().toLowerCase();

        var filteredStudents = studentsData.filter(function(student) {
            return selectedClass === "" || student.class.toLowerCase() === selectedClass;
        });

        populateStudentTable(filteredStudents);
    };
});
