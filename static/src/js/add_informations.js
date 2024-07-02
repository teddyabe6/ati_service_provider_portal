document.addEventListener('DOMContentLoaded', function() {
    var tableBody = document.querySelector('#dynamicTable tbody');
    var addRowBtn = document.getElementById('addRow');
    var templateRow = document.getElementById('template_row');

    addRowBtn.addEventListener('click', function() {
           if (templateRow) {
                // Clone the hidden template row
                var newRow = templateRow.cloneNode(true);
                newRow.style.display = ""; // Make the row visible
                newRow.id = ""; // Clear the ID to avoid duplicates
                tableBody.appendChild(newRow);
            } else {
                console.error("Template row not found!");
            }
        });
        tableBody.addEventListener('click', function(event) {
            if (event.target && event.target.matches("button.remove-row")) {
                var row = event.target.closest('tr');
                row.remove();
            }
    });
   
});


//
//$(document).ready(function() {
//  $('#addRow').click(function() {
//    let newRow = `<tr>
//     <td>
//        <select id="commodities"
//                class="form-select"
//                name="commodities"
//                required="required">
//            <option value=" ">
//                Select
//            </option>
//            <t t-foreach="request.env["g2p.crop"].sudo().search([])"
//                t-as="option">
//                <option
//                    t-att-value="option.id">
//                    <t t-esc="option.name" />
//                </option>
//            </t>
//        </select>
//    </td>
//    <td>
//        <select id="is_diseased"
//                class="form-select"
//                name="is_diseased"
//                required="required">
//           <option value="yes">Yes</option>
//            <option value="no">No</option>
//        </select>
//    </td>
//
//      <td>
//        <select id="crop_illness_type"
//                class="form-select"
//                name="crop_illness_type"
//                required="required">
//            <option value=" ">
//                Select
//            </option>
//            <t t-foreach="request.env["g2p.crop.illness.type"].sudo().search([])"
//                t-as="option">
//                <option
//                    t-att-value="option.id">
//                    <t t-esc="option.name" />
//                </option>
//            </t>
//        </select>
//    </td>
//    <td><button type="button" class="btn btn-danger remove-row">Remove</button></td>
//    </tr>`;
//    $('#dynamicTable tbody').append(newRow);
//  });
//
//  $('#dynamicTable').on('click', '.remove-row', function() {
//    $(this).closest('tr').remove();
//  });
//
//  $('#dynamicForm').submit(function(e) {
//    e.preventDefault();
//    let formData = $(this).serializeArray();
//    console.log(formData);
//    alert('Form submitted! Check console for data.');
//  });
//});
