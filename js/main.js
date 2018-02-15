/*global jQuery, window*/
"use strict";
(function ($) {
    var items = [];
    var number = 1;
    window.members.forEach(function (item) {
        var country = item.country ? item.country.toLowerCase() : 'us';
        items.push(
            "<tr>" +
                "<td>" + (item.numberHack || number) + "</td>" +
                "<td>" +
                "<span data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + window.countries[country] + "\" class=\"flag-icon flag-icon-" + country + " flag-icon-squared\"></span>" +
                "</td>" +
                "<td>" + item.name + "</td>" +
                "<td>" + item.years.join(', ') + "</td>" +
                "<td>" + item.times.join(', ') + "</td>" +
                "<td class=\"d-none d-sm-block\">" + (item.notes ? item.notes : '') + "</td>" +
                "</tr>"
        );

        if (!item.numberHack) {
            number += 1;
        }
    });
    $('#membersTable tbody').append(items.join());
    $('[data-toggle="tooltip"]').tooltip();
}(jQuery));
