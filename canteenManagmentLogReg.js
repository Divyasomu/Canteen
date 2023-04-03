var URL = "https://fir-1c7de-default-rtdb.firebaseio.com/demoproject";
let adminUser = "12345678";
let adminPassword = "Admin@1234";
function checkIsNull(value) {
    return value === "" || value === undefined || value === null ? true : false;
}
function loginUser() {
    let requestBody = {
        "phoneNumId": $("#phoneNumId").val(),
        "password": $("#pwdId").val()
    }
    if (checkIsNull($("#phoneNumId").val()) || checkIsNull($("#pwdId").val())) {
        alert("Please fill Required Data");

    } else if (requestBody.phoneNumId.trim() === adminUser && requestBody.password === adminPassword) {
        localStorage.setItem("userName", "ADMIN");
        window.location.href = "canteenManagment.html";

    } else {
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/canteenRegister.json",
            data: JSON.stringify(requestBody),
            success: function (lresponse) {
                let loginUserList = [];
                for (let i in lresponse) {
                    let data = lresponse[i];
                    data["userId"] = i;
                    loginUserList.push(data);
                }
                //if (typeof (Storage) !== "undefined") {
                // Store
                let isValid = false;
                for (let i = 0; i < loginUserList.length; i++) {
                    if (loginUserList[i].contactNum == $("#phoneNumId").val() && loginUserList[i].password == $("#pwdId").val()) {
                        isValid = true;
                        localStorage.setItem("userId", loginUserList[i].userId);
                        window.location.href = "canteenManagment.html";

                    }
                }
                if (!isValid) {
                    alert("User not found");
                }

                //}
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
function registerUser() {

    if (checkIsNull($("#userNameId").val()) || checkIsNull($("#userEmailId").val())
        || checkIsNull($("#passwordId").val()) || checkIsNull($("#contactId").val())) {
        alert("Please fill all the required data");
    } else {
        let requestBody = {
            "userName": $("#userNameId").val(),
            "emailId": $("#userEmailId").val(),
            "password": $("#passwordId").val(),
            "contactNum": $("#contactId").val()
        }
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            cache: false,
            url: URL + "/canteenRegister.json",
            data: JSON.stringify(requestBody),
            success: function (lresponse) {
                alert("Registerd sucessfully!!!");
                resetData();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
function resetData() {
    $("#userNameId").val("");
    $("#userEmailId").val("");
    $("#passwordId").val("");
    $("#contactId").val("");

}
