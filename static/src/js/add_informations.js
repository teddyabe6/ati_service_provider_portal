//document.addEventListener('DOMContentLoaded', function() {
//    var tableBody = document.querySelector('#dynamicTable tbody');
//    var addRowBtn = document.getElementById('addRow');
//    var templateRow = document.getElementById('template_row');
//
//    addRowBtn.addEventListener('click', function() {
//           if (templateRow) {
//                // Clone the hidden template row
//                var newRow = templateRow.cloneNode(true);
//                newRow.style.display = ""; // Make the row visible
//                newRow.id = ""; // Clear the ID to avoid duplicates
//                tableBody.appendChild(newRow);
//            } else {
//                console.error("Template row not found!");
//            }
//        });
//        tableBody.addEventListener('click', function(event) {
//            if (event.target && event.target.matches("button.remove-row")) {
//                var row = event.target.closest('tr');
//                row.remove();
//            }
//    });
//
//});


function addSection() {
        const container = document.getElementById('sections-container');
        const newSection = document.createElement('div');
        newSection.className = 'section';

        newSection.innerHTML = `
             <div id="sections-container">
                <div class="section">
                    <div class="row">
                        <div class="col-lg-4">
                            <label for="given-name">Given Name:</label>
                            <input type="text" name="given-name" placeholder="Enter given name" required="True"/>
                        </div>
                        <div class="col-lg-4">
                            <label for="father-name">Father's Name:</label>
                            <input type="text" name="father-name" placeholder="Enter father's name" required="True"/>
                        </div>
                        <div class="col-lg-4">
                            <label for="grandfather-name">Grandfather's Name:</label>
                            <input type="text" name="grandfather-name" placeholder="Enter grandfather's name" required="True"/>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <label for="dob">Date of Birth:</label>
                            <input type="date" name="dob" required="True"/>
                        </div>
                        <div class="col-lg-4">
                            <label for="gender">Gender:</label>
                            <select name="gender" required="True">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                         <div class="col">
                            <svg class="delete-icon" onclick="deleteSection(this)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5H21" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 11V17" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11V17" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(newSection);
    }

    function deleteSection(icon) {
        const section = icon.closest('.section');
        section.remove();
    }
