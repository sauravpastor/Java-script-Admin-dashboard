function editRow(id) {
  document.getElementById(`eno-${id}`).removeAttribute("readonly");
  document.getElementById(`nm-${id}`).removeAttribute("readonly");
  document.getElementById(`city-${id}`).removeAttribute("readonly");
  document.getElementById(`salary-${id}`).removeAttribute("readonly");

  document.getElementById(`edit-${id}`).style.display = "none";
  document.getElementById(`save-${id}`).style.display = "inline";
}

function saveRow(id) {
  let myEmpno = document.getElementById(`eno-${id}`).value;
  let myName = document.getElementById(`nm-${id}`).value;
  let myCity = document.getElementById(`city-${id}`).value;
  let mySalary = document.getElementById(`salary-${id}`).value;

  let url = `http://localhost:3000/employees/${id}`;

  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employeeno: myEmpno,
      name: myName,
      city: myCity,
      salary: mySalary,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Data updated");
        dataShow(); // Refresh the data table
      } else {
        throw new Error("Failed to update data");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Error occurred while updating data");
    });
}

function myrecRemove(id) {
  let url = `http://localhost:3000/employees/${id}`;

  fetch(url, { method: "DELETE" }).then((data) => {
    alert("Record Deleted!!");
  });
}

async function dataShow() {
  let myTable = `<table>
                          <tr>
                          <th>Employee no</th>
                          <th>Name</th>
                          <th>City</th>
                          <th>Salary</th>
                          <th>Actions</th>
                          </tr>`;

  let url = "http://localhost:3000/employees";
  let myobj = await fetch(url);
  let myData = await myobj.json();

  myData.forEach((key) => {
    myTable += `
            <tr>
            <td><input type="text" id="eno-${key.id}" value="${key.employeeno}" readonly></td>
            <td><input type="text" id="nm-${key.id}" value="${key.name}" readonly></td>
            <td><input type="text" id="city-${key.id}" value="${key.city}" readonly></td>
            <td><input type="text" id="salary-${key.id}" value="${key.salary}" readonly></td>
            <td>
            <a href="#" onclick="myrecRemove('${key.id}')" class="button button-delete">
            Delete
            </a>
        
            <a href="#" onclick="editRow('${key.id}')" id="edit-${key.id}" class="button button-edit">
            Edit
            </a>
        
            <a href="#" onclick="saveRow('${key.id}')" id="save-${key.id}" class="button button-save" style="display: none;">
            Save
            </a>
            </td>
            </tr>
            `;
  });
  myTable += "</table>";

  document.getElementById("demo").innerHTML = myTable;
}

dataShow();