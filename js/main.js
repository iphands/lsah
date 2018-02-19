/*global window, angular*/
"use strict";
(function () {
    var app = angular.module('LSAH', []);
    app.controller('EmailAppCtrl', function EmailAppCtrl() {});

    app.controller('TableListCrtl', function TableListCrtl($scope) {
        var number = 1;
        window.members.forEach(function (item) {
            var country = item.country ? item.country.toLowerCase() : 'us';

            item.count = item.numberHack || number;
            item.country = country;
            item.countryFull = window.countries[country];
            item.years = item.years.join(', ');
            item.times = item.times.join(', ');
            if (!item.numberHack) {
                number += 1;
            }
        });

        $scope.members = window.members;
    });
}());
