document.addEventListener('DOMContentLoaded', function() {
  
});

function deleteLand(button) {
  const section = button.closest('.land-section-wrapper');
  if (section) {
    section.remove(); // Remove the row
  } else {
    console.error("Could not find the section to delete.");
  }
}

function deleteCrop(button) {
  const section = button.closest('.crop-section-wrapper');
  if (section) {
    section.remove(); // Remove the row
  } else {
    console.error("Could not find the section to delete.");
  }
}

function deleteLivestock(button) {
  const section = button.closest('.livestock-section-wrapper');
  if (section) {
    section.remove(); // Remove the row
  } else {
    console.error("Could not find the section to delete.");
  }
}

function deleteMember(button) {
  const section = button.closest('.member-section-wrapper');
  if (section) {
    section.remove(); // Remove the row
  } else {
    console.error("Could not find the section to delete.");
  }
}


function addCropInfo(button) {
  // console.log("Here");
  // const cropContainer = document.getElementById('crop-section-content');
  // const toBeCloned = document.getElementById("crop-hidden-template");
  // var newNode = toBeCloned.cloneNode(true);
  // newNode.removeAttribute('style');
  // cropContainer.appendChild(newNode);
}

function addLivestockInfo(button) {

}