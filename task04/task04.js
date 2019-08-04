
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open('GET', "https://api.github.com/users/geerlingguy/repos", true);
req.onload  = function() {
  $(function () { 
    $("#grid").jqGrid({
        pager : "#gridpager",
        data: JSON.parse(req.responseText),
		loadonce: true,
        rowNum:10,
        rowList:[10,20,30],
        colModel: [
            { name: "id"},
            { name: "name"},
            { name: "private"},
            { name: "fork"},
            { name: "owner"}
        ],
        subGrid: true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var elem =JSON.parse(req.responseText);
            var own;
            for(var i = 0; i < elem.length; i++)
                if(elem[i].id == row_id)
                    own = elem[i].owner;
            var subgrid_table_id = subgrid_id+"_t";
            $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table>");
            debugger;
            $("#"+subgrid_table_id).jqGrid({
                data: [own],
                colModel: [
                    {name:"id"},
                    {name:"login"},
                    {name:"node_id"}
                ],
            });
        },
    });
    jQuery("#grid").jqGrid('navGrid', "#gridpager", {edit:true,add:true,del:true});
});
};

req.send(null);