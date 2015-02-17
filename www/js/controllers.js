angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation) {
    $scope.mapCreated = function(map) {
        $scope.map = map;
    };

    $scope.centerOnMe = function () {
        console.log("Centering");
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });
        var posOptions = {timeout: 60*1000, enableHighAccuracy: false, maximumAge: 1000*60*10};
        navigator.geolocation.getCurrentPosition(function(pos){
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map:  $scope.map,
                title: "My Location"
            });
            $ionicLoading.hide();
        },function(errMsg){
            alert(JSON.stringify(errMsg))
        }, {
            enableHighAccuracy: false,
            timeout: 60*1000,
            maximumAge: 1000*60*10
        });
    };
});