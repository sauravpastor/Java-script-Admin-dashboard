async function dataShow() {
  let myTable = `<table font-size ="20px" border="1" width="600" bgcolor="pink" align="center">
                    <tr bgcolor="orange">
                    <th>Employeeno</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Fees</th>
                   
                    </tr>`;

  let url = "http://localhost:3000/employees";
  let myobj = await fetch(url);
  console.log(myobj);
  let myData = await myobj.json();
  console.log(myData);

  myData.map((key) => {
    myTable += `
      <tr>

      <td>${key.employeeno}</td>
      <td>${key.name}</td>
      <td>${key.city}</td>
      <td>${key.salary}</td>

      </tr>
      `;
  });
  myTable += "</table>";

  document.getElementById("demo").innerHTML = myTable;
}

dataShow();
