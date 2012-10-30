$(document).ready(function () {

    var pageLimit = 10;
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
                    var x = [];
                    var extraPage = (data.totalResults % pageLimit === 0) ? 0 : 1;
                    for(var i = 0; i < data.totalResults / pageLimit + extraPage; i++) {
                        x.push({'pageNumber': i});
                    }
                    //alert(JSON.stringify(x));
                    $("#paginationList").html($("#paginationEntry").render(x));
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
