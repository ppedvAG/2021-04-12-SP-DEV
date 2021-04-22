// window.addEventListener('load', ) // um sicher zu sein, dass js nach dem Laden von html ausgeführt wird.

// SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function () {
//   SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
//     OnPostRender: function (ctx) {
/* todo #3 */
const statusColors = {
  Ja: "#FCBE03",
};
const analysiertColors = {
  Ja: "#70ad47",
};
const grenzwertColors = {
  Ja: "#eb5e34",
};
/* const jaColors = {
    status: "#FCBE03",
    analysiert: "#70ad47",
    grenzwert: "#eb5e34"
} */

// document.getElementsByTagName("tr");
// document.getElementsByTagName()
// document.getRootNode()
// document.querySelector() // Elemente werden mit einem CSS Selector angesprochen
// document.getElementById()

const rows = document.getElementsByClassName("tableRow");
// iterator für Sammlungen (Arrays, HTMLCollections, NodeCollection)
for (const iterator of rows) {
    console.log('iterator.children :>> ', iterator.children);
    if(iterator.children[2].textContent == 'Ja') {
        iterator.style.backgroundColor = "#eb5e34";
    } else if (iterator.children[1].textContent == 'Ja') {
        iterator.style.backgroundColor = "#70ad47";
    } else if (iterator.children[0].textContent == 'Ja') {
        iterator.style.backgroundColor = "#FCBE03";
    }
}

//   var rows = ctx.ListData.Row;
//   for (var i = 0; i < rows.length; i++) {
//     var status = rows[i]["Pflicht"];
//     var rowId = GenerateIIDForListItem(ctx, rows[i]);
//     var row = document.getElementById(rowId);
//     row.style.backgroundColor = statusColors[status];
//   }
//   for (var i = 0; i < rows.length; i++) {
//     var analysiert = rows[i]["Analysiert"];
//     var rowId = GenerateIIDForListItem(ctx, rows[i]);
//     var row = document.getElementById(rowId);
//     row.style.backgroundColor = analysiertColors[analysiert];
//   }
//   for (var i = 0; i < rows.length; i++) {
//     var grenzwertverletzung = rows[i]["Grenzwertverletzung"];
//     var rowId = GenerateIIDForListItem(ctx, rows[i]);
//     var row = document.getElementById(rowId);
//     row.style.backgroundColor = grenzwertColors[grenzwertverletzung];
//   }
//     },
//   });
// });
