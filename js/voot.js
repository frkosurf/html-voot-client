$(document).ready(function () {

    var apiClientId = 'voot_client';
    var apiScope = ["read"];

    var authorizeEndpoint = 'http://localhost/php-oauth/authorize.php';
    var apiEndpoint = 'http://localhost/php-voot/api.php';

    jso_configure({
        "voot_client": {
            client_id: apiClientId,
            authorization: authorizeEndpoint
        }
    });
    jso_ensureTokens({
        "voot_client": apiScope
    });

    function renderGroupList() {
        $.oajax({
            url: apiEndpoint + "/groups/@me",
            jso_provider: "voot_client",
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
            jso_provider: "voot_client",
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
