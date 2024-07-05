// document.addEventListener('DOMContentLoaded', function() {
//         let records = document.querySelectorAll('.land_ownership');
//         records.forEach(function(record) {
//             let selection = record.dataset.selection;
//             console.log('Selection Field Value:', selection);
//             // Now you can use the `selection` value as needed
//         });
//     });


// $(document).ready(function() {
//   $('#addRow').click(function() {
//     let newRow = `<tr>
//           <td>
//             <select id="land_selection"
//                     class="form-select"
//                     name="land_ownership_type"
//                     required="required">
//                 <option value=" ">
//                     Select
//                 </option>
//                 <t t-foreach="land_ownership"
//                     t-as="option">
//                     <option
//                         t-att-value="option.id">
//                         <t t-esc="option.name" />
//                     </option>
//                 </t>
//             </select>
//         </td>
//         <td><input type="text" name="land_area" class="form-control" /></td>
//       <td><input type="text" name="land_id" class="form-control" /></td>
//       <td><input type="text" name="land_certificate" class="form-control" /></td>
//       <td><button type="button" class="btn btn-danger remove-row">Remove</button></td>
//     </tr>`;
//     $('#dynamicTable tbody').append(newRow);
//   });

//   $('#dynamicTable').on('click', '.remove-row', function() {
//     $(this).closest('tr').remove();
//   });

//   $('#dynamicForm').submit(function(e) {
//     e.preventDefault();
//     let formData = $(this).serializeArray();
//     console.log(formData);
//     alert('Form submitted! Check console for data.');
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  var tableBody = document.querySelector('#dynamicTable tbody');
  tableBody.addEventListener('click', function(event) {
      if (event.target && event.target.matches("button.remove-row")) {
          var row = event.target.closest('tr');
          row.remove();
      }
  });
});