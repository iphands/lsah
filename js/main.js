/*global document, window, angular*/
"use strict";
(function (jq) {
    var app = angular.module('LSAH', []);

    app.controller('EmailAppCtrl', function EmailAppCtrl() {});

    app.controller('TableListCrtl', function TableListCrtl($scope) {
        var once = true;

        function init() {
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
        }

        document.addEventListener('scroll', function () {
            if (once && jq('#members').is(':in-viewport')) {
                once = false;
                init();
                $scope.$digest();
            }
        });
    });
}(window.jQuery));

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
