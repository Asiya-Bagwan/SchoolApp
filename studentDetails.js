$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (studentId) {
        $.ajax({
            url: `http://localhost:3001/students/${studentId}`,
            type: 'GET',
            dataType: 'json',
            success: function(student) {
                const studentDetails = `
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Class</th>
                            <th>Mobile Number</th>
                            
                        </tr>
                        <tr>
                        <td>${student.id}</td>
                            <td>${student.firstname}</td>
                            <td>${student.lastname}</td>
                            <td>${student.date_of_birth}</td>
                            <td>${student.class}</td>
                            <td>${student.mobileNo}</td>
                        </tr>
                        
                    </table>
                `;
                $('#studentDetails').html(studentDetails);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching student details:', error);
                $('#studentDetails').html('<p>Error fetching student details.</p>');
            }
        });
    } else {
        $('#studentDetails').html('<p>No student ID provided.</p>');
    }
});