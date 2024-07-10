$(document).ready(function() {
    var apiUrl = 'http://localhost:3001/students'; // Replace with your mock API URL
    var allStudents = [];

    function fetchStudents() {
        console.log('Fetching students...'); // Debugging log
        // AJAX GET request to fetch student list
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

        // Edit icon click handler
        $('.edit-icon').click(function() {
            var studentId = $(this).data('id');
            console.log('Edit student with ID:', studentId); // Debugging log
            // Find the student object by ID
            var student = allStudents.find(function(s) {
                return s.id === studentId;
            });
            if (student) {
                openEditModal(student);
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

    function openEditModal(student) {
        $('#editId').val(student.id);
        $('#editFirstName').val(student.firstname);
        $('#editLastName').val(student.lastname);
        $('#editDateOfBirth').val(student.date_of_birth);
        $('#editClass').val(student.class);
        $('#editMobileNo').val(student.mobileNo);

        $('#editModal').css('display', 'block');
    }

    function closeEditModal() {
        $('#editModal').css('display', 'none');
    }

    function saveEdit() {
        var editedStudent = {
            id: $('#editId').val(),
            firstname: $('#editFirstName').val(),
            lastname: $('#editLastName').val(),
            date_of_birth: $('#editDateOfBirth').val(),
            class: $('#editClass').val(),
            mobileNo: $('#editMobileNo').val()
        };

        $.ajax({
            url: `http://localhost:3001/students/${editedStudent.id}`,
            type: 'PUT',
            data: JSON.stringify(editedStudent),
            contentType: 'application/json',
            success: function(response) {
                console.log('Edit saved:', response); // Debugging log
                closeEditModal();
                fetchStudents();
            },
            error: function(xhr, status, error) {
                console.error('Error saving edit:', error);
                alert('An error occurred while saving the data.');
            }
        });
    }

    $('#saveEdit').click(function() {
        saveEdit();
    });

    $('.close').click(function() {
        closeEditModal();
    });

    // Initial fetch of student list
    fetchStudents();
});
