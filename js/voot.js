$(document).ready(function () {

    var apiScope = ["read"];

    jso_configure({
        "html-voot-client": {
            client_id: apiClientId,
            authorization: authorizeEndpoint
        }
    });
    jso_ensureTokens({
        "html-voot-client": apiScope
    });
    function renderGroupList() {
        $.oajax({
            url: apiEndpoint + "/groups/@me",
            jso_provider: "html-voot-client",
            jso_scopes: apiScope,
            jso_allowia: true,
            dataType: 'json',
            success: function (data) {
                $("#groupList").html($("#groupListTemplate").render(data.entry));
                addGroupListHandlers();
            }
        });
    }

    function getGroupMembers(groupId) {
        $.oajax({
            url: apiEndpoint + "/people/@me/" + groupId,
            jso_provider: "html-voot-client",
            jso_scopes: apiScope,
            jso_allowia: true,
            dataType: 'json',
            success: function (data) {
                $("#memberList").html($("#memberListTemplate").render(data.entry));
            }
        });
    }

    function addGroupListHandlers() {
        $("a.groupEntry").click(function () {
            getGroupMembers($(this).data('groupId'));
        });
    }

    function initPage() {
        $("#memberListModal").hide();
        renderGroupList();
    }
    initPage();
});
