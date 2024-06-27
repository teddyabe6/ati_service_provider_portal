document.addEventListener('DOMContentLoaded', function() {
        let records = document.querySelectorAll('.land_ownership');
        records.forEach(function(record) {
            let selection = record.dataset.selection;
            console.log('Selection Field Value:', selection);
            // Now you can use the `selection` value as needed
        });
    });


$(document).ready(function() {
  $('#addRow').click(function() {
    let newRow = `<tr>
          <td>
            <select id="zon_selection"
                    class="form-select"
                    name="zone"
                    required="required">
                <option value=" ">
                    Select
                </option>
                <t t-foreach="land_ownership"
                    t-as="option">
                    <option
                        t-att-value="option.id">
                        <t t-esc="option.name" />
                    </option>
                </t>
            </select>
        </td>
        <td><input type="text" name="field2[]" class="form-control" /></td>
      <td><input type="text" name="field3[]" class="form-control" /></td>
      <td><input type="text" name="field4[]" class="form-control" /></td>
      <td><button type="button" class="btn btn-danger remove-row">Remove</button></td>
    </tr>`;
    $('#dynamicTable tbody').append(newRow);
  });

  $('#dynamicTable').on('click', '.remove-row', function() {
    $(this).closest('tr').remove();
  });

  $('#dynamicForm').submit(function(e) {
    e.preventDefault();
    let formData = $(this).serializeArray();
    console.log(formData);
    alert('Form submitted! Check console for data.');
  });
});
