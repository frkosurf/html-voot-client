$(document).ready(function () {
    var apiClientId = 'voot';
    var redirectUri = "http://localhost/html-voot-client/index.html";

    var apiScopes = ["read", "oauth_userinfo"];

    var apiRoot = 'http://localhost/php-voot';
    var oauthRoot = 'http://localhost/php-oauth';

    jso_configure({
        "voot": {
            client_id: apiClientId,
            redirect_uri: redirectUri,
            authorization: oauthRoot + "/oauth/authorize"
        }
    });
    jso_ensureTokens({
        "voot": apiScopes
    });

    function renderGroupList() {
        $.oajax({
            url: apiRoot + "/groups/@me",
            jso_provider: "voot",
            jso_scopes: apiScopes,
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
            url: apiRoot + "/people/@me/" + groupId,
            jso_provider: "voot",
            jso_scopes: apiScopes,
            jso_allowia: true,
            dataType: 'json',
            success: function (data) {
                $("#memberList").html($("#memberListTemplate").render(data.entry));
            }
        });
    }

    function getResourceOwner() {
        $.oajax({
            url: oauthRoot + "/oauth/userinfo",
            jso_provider: "voot",
            jso_scopes: apiScopes,
            jso_allowia: true,
            dataType: 'json',
            success: function (data) {
                $("#userId").append(data.name);
                $("#userId").attr('title', data.user_id);
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
        getResourceOwner();
    }
    initPage();
});
