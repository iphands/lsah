/*global document, window, angular*/
"use strict";
(function (jq, lodash) {
    var app = angular.module('LSAH', []);

    app.controller('EmailAppCtrl', function EmailAppCtrl() {});

    app.controller('TableListCrtl', function TableListCrtl($scope) {
        var once = true;

        function genYears(start) {
            const years = [];
            for (let i = start; i < 2019 + 4; i += 4) {
                years.push(i);
            }

            $scope.years = years;
        }

        function init() {
            var   number = 1;
            const countries = {};

            genYears(1971);

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

                if (!countries.hasOwnProperty(country)){
                    countries[country] = {
                        code: country,
                        label: window.countries[country],
                        count: 1
                    };
                } else {
                    countries[country].count += 1;
                }
            });


            $scope.members = window.members;
            console.log($scope.members.length);
            $scope.countries = lodash.sortBy(lodash.values(countries), 'count').reverse();
        }

        function prepopulateMembers() {
            console.log('test');
            const tmp = [];
            for (var i = 0; i < window.members.length + 50; i +=1) {
                tmp.push({name: "Loading..."});
            }
            $scope.members = tmp;
        }

        prepopulateMembers();

        document.addEventListener('scroll', function () {
            if (once && jq('#members').is(':in-viewport')) {
                once = false;
                init();
                $scope.$digest();
            }
        });
    });
}(window.jQuery, window._));

(function (jq) {
    var total = document.querySelectorAll('img[data-src]').length,
        run   = true,
        done  = 0;

    document.addEventListener('scroll', function () {
        if (run) {
            var images = jq('img[data-src]:in-viewport');
            if (images.length) {
                images.attr('src', function (i) {
                    var src = images[i].getAttribute('data-src');
                    images[i].removeAttribute('data-src');
                    done += 1;
                    if (total === done) { run = false; }
                    return src;
                });
            }
        }
    });
}(window.jQuery));
