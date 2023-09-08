/* global document, window, angular */
"use strict";
(function (jq, lodash) {
    const app = angular.module("LSAH", []);

    app.controller("EmailAppCtrl", function EmailAppCtrl () {});

    app.controller("TableListCrtl", function TableListCrtl ($scope) {
        let once = true;

        function genYears (members) {
            let years = [];
            members.forEach(function (m) {
                years = lodash.concat(years, m.years);
            });

            // uniq | sort
            years = [...new Set(years)].sort();

            return years;
        }

        function init () {
            let number = 1;
            const countries = {};

            $scope.years = genYears(window.members);

            window.members.forEach(function (item) {
                const country = item.country ? item.country.toLowerCase() : "us";

                item.count = item.numberHack || number;
                item.country = country;
                item.countryFull = window.countries[country];
                item.years = item.years.join(", ");
                item.times = item.times.join(", ");

                if (!item.numberHack) {
                    number += 1;
                }

                if (!countries.hasOwnProperty(country)) {
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
            $scope.countries = lodash.sortBy(lodash.values(countries), "count").reverse();
            $scope.countriesTotal = lodash.reduce($scope.countries, function (sum, n) {
                return sum + n.count;
            }, 0);
        }

        function prepopulateMembers () {
            const tmp = [];
            for (let i = 0; i < window.members.length + 50; i += 1) {
                tmp.push({ name: "Loading..." });
            }
            $scope.members = tmp;
        }

        prepopulateMembers();

        document.addEventListener("scroll", function () {
            if (once && jq("#members").is(":in-viewport")) {
                once = false;
                init();
                $scope.$digest();
            }
        });

      window.setTimeout(() => {
	if (once && jq("#members").is(":in-viewport")) {
          once = false;
          init();
          $scope.$digest();
        }
      }, 1000);
    });
}(window.jQuery, window._));

(function (jq) {
    const total = document.querySelectorAll("img[data-src]").length;
    let run = true;
    let done = 0;

    document.addEventListener("scroll", function () {
        if (run) {
            const images = jq("img[data-src]:in-viewport");
            if (images.length) {
                images.attr("src", function (i) {
                    const src = images[i].getAttribute("data-src");
                    images[i].removeAttribute("data-src");
                    done += 1;
                    if (total === done) { run = false; }
                    return src;
                });
            }
        }
    });
}(window.jQuery));
