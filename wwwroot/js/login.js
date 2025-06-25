$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();
        const encryptedPassword = encryptDecrypt(password); // Encrypt before sending

        $.ajax({
            url: "http://192.168.1.54:8080/api/Login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                userName: username,
                userEmail: "",
                password: encryptedPassword,
                displayName: ""
            }),
            success: function (response) {
                // ✅ If response is plain token string
                if (response && typeof response === "string") {
                    sessionStorage.setItem("authToken", response);

                    // Optional: decode token
                    // const decoded = parseJwt(response);
                    // console.log(decoded);

                    $.post("/Account/SetSession", { username: username }, function () {
                        window.location.href = "/Master/Index";
                    });
                } else {
                    showError("❌ Invalid credentials. Please try again.");
                }
            },
            error: function () {
                showError("⚠️ Login failed. Please check your API/server.");
            }
        });
    });

    function showError(message) {
        $("#errorMsg").text(message);
        $("#username").val("").focus();     // Clear and focus
        $("#password").val("");
    }
});

// 🔐 Reversible obfuscation (basic encryption)
const encryptDecrypt = (text) => {
    try {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            if (charCode < 128) {
                result += String.fromCharCode(charCode + 128);
            } else if (charCode > 128) {
                result += String.fromCharCode(charCode - 128);
            }
        }
        return result;
    } catch (error) {
        console.error("Error in encryptDecrypt function:", error);
        return text;
    }
};

// 🧠 Optional JWT decoder (to read CompanyId, UserId, etc.)
const parseJwt = (token) => {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (e) {
        return null;
    }
};
