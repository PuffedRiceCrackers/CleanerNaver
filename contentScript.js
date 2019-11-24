
// 메인 상단 div.PM_CL_realtimeKeyword_base
// 검색 사이드 div#sub_pack
// 뉴스 감정 div.u_likeit
// 뉴스 댓글 div#cbox_module
deleteElements('div.PM_CL_realtimeKeyword_base, div#sub_pack, div.u_likeit, div#cbox_module');

function deleteElements(selector) {
    doDelete(document.querySelectorAll(selector));
    var mo = new MutationObserver(process);
    mo.observe(document, {subtree:true, childList:true});
    document.addEventListener('DOMContentLoaded', function () {
        mo.disconnect()
    });
    function process(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
                var n = nodes[j];
                if (n.nodeType != 1)
                    continue;
                if (n.matches(selector)) {
                    doDelete([n]);
                    n.remove();
                }
                doDelete(n.matches(selector) ? [n] : n.querySelectorAll(selector));
            }
        }
    }

    function doDelete(nodes) {
        //console.log("do delete happened for " + nodes);
        [].forEach.call(nodes, function(node) { node.remove() });
    }
}

// Chrome pre-34
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.webkitMatchesSelector;