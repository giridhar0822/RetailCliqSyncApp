document.addEventListener("DOMContentLoaded", function () {
    $("#loader").hide();
    $("#syncProgress").css("width", "0%").text("0%");

    // Select All checkbox
    $(document).on("change", "#selectAll", function () {
        $(".api-checkbox").prop("checked", this.checked);
    });


    $(document).on("change", ".api-checkbox", function () {
        const allChecked = $(".api-checkbox:checked").length === $(".api-checkbox").length;
        $("#selectAll").prop("checked", allChecked);
    });


    // Reset
    // Reset Button
    $(document).on("click", "#resetBtn", function () {
        $(".api-checkbox").prop("checked", false);
        $("#selectAll").prop("checked", false);
        $("#responseMessages").html("");
        $("#syncProgress").css("width", "0%").text("0%");
    });

    // Synchronise Button
    $(document).on("click", "#syncBtn", function () {
        const selected = $(".api-checkbox:checked");

        if (selected.length === 0) {
            alert("Please select at least one option.");
            return;
        }

        const token = sessionStorage.getItem("authToken");
        if (!token) {
            alert("Token missing. Please login again.");
            return;
        }

        // Disable UI
        $("#syncBtn").prop("disabled", true);
        $("#resetBtn").prop("disabled", true);
        $(".api-checkbox").prop("disabled", true);
        $("#selectAll").prop("disabled", true);

        $("#loader").show();
        $("#responseMessages").html("");
        $("#syncProgress").css("width", "0%").text("0%");

        syncApi(0, selected, token);
    });


    function syncApi(index, selected, token) {
        const total = selected.length;

        if (index >= total) {
            $("#loader").hide();
            $("#currentApi").text("All Synchronizations Complete");

            // ✅ Re-enable everything
            $("#syncBtn").prop("disabled", false);
            $("#resetBtn").prop("disabled", false);
            $(".api-checkbox").prop("disabled", false);
            $("#selectAll").prop("disabled", false);

            $("#syncProgress").css("width", "100%").text("100%");
            return;
        }

        const checkbox = selected[index];
        const $checkbox = $(checkbox);
        const apiName = $checkbox.data("name");
        const apiUrl = $checkbox.data("url");

        $("#currentApi").text(`Syncing: ${apiName}...`);

        $.ajax({
            url: apiUrl,
            type: "PATCH",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                $("#responseMessages").append(`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ✅ <strong>${apiName}</strong> synchronized successfully.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
                $checkbox.prop("checked", false);
                
                syncApi(index + 1, selected, token);
            },
            error: function () {
                $("#responseMessages").append(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ❌ <strong>${apiName}</strong> failed to sync. Please try again.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
                
                syncApi(index + 1, selected, token);
            }
        });
    }

   
});
