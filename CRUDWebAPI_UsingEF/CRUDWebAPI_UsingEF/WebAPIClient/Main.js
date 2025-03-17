var empId = '';
$(document).ready(function () {
    showEmployees();
    $("#btnUpdateEmp").click(function () {

        if (empId != '')
        {
            updateEmployee(empId)
        }
        else
        {
            alert("No proper emp id foud for update!")
        }

    });
});

function createEmployee() {
    var url = "/api/Employees";
    var employee = {};

    if ($('#txtName').val() === '' || $('#txtEmail').val() === '' || $('#txtIsActive').val() === '' ||
        $('#txtCreateOn').val() === '') {
        alert("No filed can be left blank");
    }
    else {
        employee.Name = $('#txtName').val();
        employee.Email = $('#txtEmail').val();
        employee.IsActive = $('#txtIsActive').val();
        employee.CreatedOn = $('#txtCreateOn').val();


        if (employee){
            $.ajax({
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(employee),
                type: "Post",
                success: function (result) {
                    alert(JSON.stringify(result));
                    clearForm();
                    showEmployees();
                },
                error: function (msg) {
                    alert(msg);
                }

            });
        }
    }
}

function showEmployees() {
    var url = "/api/Employees";

    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#tblEmpBody").html('');
                var row = '';
                for (var i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + result[i].Name + "</td>"
                        + "<td>" + result[i].Email + "</td>"
                        + "<td>" + result[i].IsActive + "</td>"
                        + "<td>" + result[i].CreatedOn + "</td>"
                        + "<td><button class='btn btn-primary' onClick='editEmployees(" + result[i].ID + ")'>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-danger' onClick='deleteEmployees(" + result[i].ID + ")'>Delete</button></td>"
                }
                if (row != '') {
                    $("#tblEmpBody").append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }

    });
}

function deleteEmployees(id) {
    var url = "/api/Employees/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Delete",
        success: function (result) {
            clearForm();
            alert(JSON.stringify(result));
            showEmployees();
        },
        error: function (msg) {
            alert(msg);
        }

    });
}

function editEmployees(id) {
    debugger;
    var url = "/api/Employees/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                empId = result.ID; 
                $('#txtName').val(result.Name);
                $('#txtEmail').val(result.Email);
                $('#txtIsActive').val(result.IsActive);
                $('#txtCreateOn').val(result.CreatedOn);
            }
            $("#btnCreateEmp").prop('disabled', true);
            $("#btnUpdateEmp").prop('disabled', false);

        },
        error: function (msg)
        {
            alert(msg);
        }

    });
}

function updateEmployee(id) {
    var url = "/api/Employees/" + id;
    var employee = {};
    employee.Name = $('#txtName').val();
    employee.Email = $('#txtEmail').val();
    employee.IsActive = $('#txtIsActive').val();
    employee.CreatedOn = $('#txtCreateOn').val();
    

    if (employee) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(employee),
            type: "Put",
            success: function (result)
            {
                alert(JSON.stringify(result));
                clearForm();
                showEmployees();
                $("#btnCreateEmp").prop('disabled', false);
                $("#btnUpdateEmp").prop('disabled', true);
            },
            error: function (msg)
            {
                alert(msg);
            }

        });
    }
}


function clearForm()
{
    $('#txtName').val('');
    $('#txtEmail').val('');
    $('#txtIsActive').val('');
    $('#txtCreateOn').val('');
}