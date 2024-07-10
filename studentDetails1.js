$(document).ready(function() {
    // Extract student ID from URL
    var urlParams = new URLSearchParams(window.location.search);
    var studentId = urlParams.get('id');

    if (studentId) {
        var apiUrl = 'http://localhost:3000/getDetails1/studentDetails2'; // Replace with your mock API URL

        // AJAX GET request to fetch student details
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json', // Ensure the response is parsed as JSON
            success: function(response) {
                console.log('Response:', response); // Log the response for debugging
                if (response && Array.isArray(response.students)) {
                    // Find the student with the matching ID
                    var student = response.students.find(function(student) {
                        return student.id == studentId;
                    });

                    if (student) {
                        var detailsHtml = `<table> 
                                          <tr><th>ID</th>
                                       <th>First Name</th>
                                       <th>Last Name</th>
                                       <th>Date of Birth</th>
                                       <th>Class</th>
                                       <th>Mobile No</th></tr>


                                          <tr><td> ${student.id }</td>
                                          <td>  ${student.firstname } </td>
                                          <td>  ${student.lastname }</td>
                                          <td>  ${student.date_of_birth } </td>
                                          <td>  ${student.class}  </td>
                                          <td>  ${student.mobileNo} </td>
                                          </tr>
                                          </table>`;

                        // Append details to the page
                        $('#studentDetails').html(detailsHtml);
                    } else {
                        console.error('Student not found');
                        alert('Error: Student not found.');
                    }
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
    } else {
        alert('Student ID not provided.');
    }
});


