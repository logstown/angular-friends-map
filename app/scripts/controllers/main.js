'use strict';

/**
 * @ngdoc function
 * @name friendsMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the friendsMapApp
 */
angular.module('friendsMapApp')
    .controller('MainCtrl', function($scope, Facebook) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.$watch(function() {
            return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
        }, function(newVal) {
            $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
        });

        $scope.deals = [{

        }]

        Facebook.getLoginStatus(function(response) {
            if (response.status !== 'connected') {
                console.log('here')
                Facebook.login(function(response) {
                    // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
                    console.log(response)
                });
            } else {
                Facebook.api('/me/?fields=friendlists.fields(members,name)', function(response) {
                    $scope.selectedList = 1;
                    $scope.friendLists = [{
                        name: 'All',
                        id: 1
                    }];

                    $scope.friendLists = _.union($scope.friendLists, response.friendlists.data);
                });

                Facebook.api('/me/friends?fields=name,picture,link,' + $scope.button.place, function(response) {

                    var url = '?ids=';

                    var locations = _.groupBy(response.data, function(friend) {
                        if (friend[$scope.button.place] !== undefined) {
                            return friend[$scope.button.place].id;
                        }
                    });

                    angular.forEach(locations, function(location, id) {
                        url += id + ',';
                    });

                    //Remove trailing comma
                    url = url.substring(0, url.length - 1);

                    Facebook.api(url, function(result) {
                        $scope.markers = _.map(result, function(city, id) {
                            var cityFriends = locations[id];
                            var icon = cityFriends[0].picture.data.url;
                            var title = cityFriends[0].name + " (" + cityFriends[0][$scope.button.place].name + ")";
                            var contentString = '<center><strong><a href="' + cityFriends[0].link + '">' + cityFriends[0].name + "</a></strong>" + '<br> (<a href="' + city.link + '">' + cityFriends[0][$scope.button.place].name + "</a>)</center>";

                            if (cityFriends.length > 1) {
                                icon = "https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yo/r/UlIqmHJn-SK.gif";

                                var prep = $scope.button.place === 'location' ? ' in ' : ' from '
                                title = cityFriends.length + prep + cityFriends[0][$scope.button.place].name;

                                contentString = '<center><h4>' + cityFriends[0][$scope.button.place].name + '</h4></center><table>';
                                for (var i = 0; i < cityFriends.length; i++) {

                                    contentString += '<tr>' +
                                        '<td>' +
                                        '<img src="' + cityFriends[i].picture.data.url + '">' +
                                        '</td>' +
                                        '<td>' +
                                        '<a href="' + cityFriends[i].link + '">' +
                                        cityFriends[i].name + '</a></td>' +
                                        '</tr>';
                                }
                                contentString += '</table>';
                            }

                            return {
                                // showWindow: false,
                                id: id,
                                icon: icon,
                                latitude: city.location.latitude,
                                longitude: city.location.longitude
                            }
                        })

                        $scope.onMarkerClicked = function(marker) {
                            marker["showWindow"] = true;
                            $scope.$apply();
                            //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
                        };

                        _.each($scope.markers, function(marker) {
                            // marker.closeClick = function() {
                            //     marker.showWindow = false;
                            //     $scope.$apply();
                            // };
                            marker.onClicked = function() {
                                $scope.onMarkerClicked(marker);
                            };
                            marker["showWindow"] = false;
                        });

                        console.log($scope.markers)
                    })
                });
            }
        });

        $scope.button = {
            place: 'location'
        };

        $scope.deal = {
            latitude: 45,
            longitude: -73
        }

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

        $scope.icons = [{
            "value ": "Gear ",
            "label ": " < i class = \"fa fa-gear\"></i> Gear"
        }, {
            "value": "Globe",
            "label": "<i class=\"fa fa-globe\"></i> Globe"
        }, {
            "value": "Heart",
            "label": "<i class=\"fa fa-heart\"></i> Heart"
        }, {
            "value": "Camera",
            "label": "<i class=\"fa fa-camera\"></i> Camera"
        }];

        // $scope.selectedList = $scope.
    });