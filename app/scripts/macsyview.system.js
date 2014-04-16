/*
 * macsyview.system
 * System view for MacSyView
 * requires RaphaelJS + jquery + jquery-mousewheel.js
 */

/* jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
 */

/*global $, macsyview */

macsyview.system = (function () {
	'use strict';

	var draw = function (json_data, container) {
            var summary = json_data.summary,
                i,
                p,
                p_container = $("#" + container),
                gene_sort_alpha = function (gene1, gene2) {
                    return gene1.name.localeCompare(gene2.name);
                },
                gene_sort_occ = function (gene1, gene2) {
                    return parseInt(gene2.value, 10) - parseInt(gene1.value, 10);
                },

                draw_gene = function (index, gene) {
                    var occurence = parseInt(gene.value, 10),
                        // use gene color if the number of occurences is >0
                        color = occurence > 0 ? gene.color : "#dcdcdc";
                    p_container.append('<span id="' + gene.name + '" style="display: inline-block; width:50px;" title="' + gene.name + '"><div style="background-color:' + color + ';">&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="text-center">' + occurence + '</div></span>');
                    p_container.append('&nbsp;');
                };

            for (i = 0; i < macsyview.data.presence.length; i++) {
                p = macsyview.data.presence[i];
                p_container.append('<div id="' + p + '" style="width:' + summary[p].length + 'px;"></div>');
                p_container.append("<h3>" + p + "</h3>");
                // sort alphabetically by gene name
                summary[p].sort(gene_sort_alpha);
                summary[p].sort(gene_sort_occ);
                $.each(summary[p], draw_gene);
            }
        };
	
	return {
		draw: draw
	};
}());
