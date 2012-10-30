$(document).ready(function () {

    var pageLimit = 3;
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

    function renderGroupList(pageNumber) {
        $.oajax({
            url: apiEndpoint + "/groups/@me?startIndex=" + pageNumber + "&count=" + pageLimit,
            jso_provider: "html-voot-client",
            jso_scopes: apiScope,
            jso_allowia: true,
            dataType: 'json',
            success: function (data) {
                $("#groupList").html($("#groupListTemplate").render(data.entry));
                if(data.totalResults > pageLimit) {
                    // show pagination stuff
                    var pages = [];
                    for(var i = 0; i < Math.ceil(data.totalResults / pageLimit); i++) {
                        pages.push({'pageNumber': i});
                    }
                    $("#paginationList").html($("#paginationEntry").render(pages));
                    addPaginationHandlers();
                }
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

    function addPaginationHandlers() {
        $("a.pageEntry").click(function () {
            renderGroupList($(this).data('pageNumber')*pageLimit);
        });
    }

    function initPage() {
        $("#memberListModal").hide();
        renderGroupList(0);
    }
    initPage();
});
