angular.module('orderService', [])

	// super simple service
	// each function returns a promise object
	.factory('Orders', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			create : function(orderData) {
				return $http.post('/api/food',orderData); // + orderData+ '/' + theday
			},
			delete : function(id,createdate) {
				return $http.delete('/api/food/' + id + '/' + createdate);
			},
			calculate : function() {
				return $http.get('/api/total');
			}
		}
	}]);
