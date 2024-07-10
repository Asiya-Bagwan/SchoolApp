$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1; 
    const limit = parseInt(urlParams.get('limit')) || 10; 

    // URL of CRUD 
    const apiUrl = 'http://localhost:3001/students'; 

    function fetchAndDisplayStudents(page, limit) {
        const startIndex = (page - 1) * limit;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                const paginatedData = data.slice(startIndex, startIndex + limit);

                $('#studentTable tbody').empty();

                paginatedData.forEach(student => {
                    const studentRow = `
                        <tr>
                            <td><a href="studentDetails.html?id=${encodeURIComponent(student.id)}">${student.id}</a></td>
                            <td>${student.firstname}</td>
                            <td>${student.lastname}</td>
                            <td>${student.date_of_birth}</td>
                            <td>${student.class}</td>
                            <td>${student.mobileNo}</td>
                            <td>
                                <i class="fas fa-edit edit-icon" data-id="${student.id}"></i> <!-- Edit icon -->
                                <i class="fas fa-trash delete-icon" data-id="${student.id}"></i> <!-- Delete icon -->
                            </td>
                        </tr>
                    `;
                    $('#studentTable tbody').append(studentRow);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching student data:', error);
            }
        });
    }

    fetchAndDisplayStudents(page, limit);
});
