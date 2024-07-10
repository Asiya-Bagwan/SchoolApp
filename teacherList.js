$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1; 
    const limit = parseInt(urlParams.get('limit')) || 10; 

    // URL of CRUD 
    const apiUrl = 'http://localhost:3001/Teachers'; 

    function fetchAndDisplayTeacher(page, limit) {
        const startIndex = (page - 1) * limit;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                const paginatedData = data.slice(startIndex, startIndex + limit);

                $('#teacherTable tbody').empty();

                paginatedData.forEach(teacher => {
                    const teacherRow = `
                        <tr>
                        
                        <td><a href="teacherdetails.html?id=${encodeURIComponent(teacher.id)}">${teacher.id}</a></td>
                            <td>${teacher.firstname}</td>
                            <td>${teacher.lastname}</td>
                            <td>${teacher.date_of_birth}</td>
                            <td>${teacher.class}</td>
                            <td>${teacher.mobileNo}</td>
                            <tdtecher
                                <i class="fas fa-edit edit-icon" data-id="${teacher.id}"></i> <!-- Edit icon -->
                                <i class="fas fa-trash delete-icon" data-id="${teacher.id}"></i> <!-- Delete icon -->
                            </td>
                        </tr>
                    `;
                    $('#teacherTable tbody').append(teacherRow);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching student data:', error);
            }
        });
    }

    fetchAndDisplayTeacher(page, limit);
});
