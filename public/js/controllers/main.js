angular.module('orderController', [])

	// inject the Order service factory into our controller
	.controller('mainController', ['$scope','$http','Orders', function($scope, $http, Orders) {
		$scope.formData = {};
		$scope.loading = true;
		var date = timeStampToTime(new Date());
		var menu = {
			'foodList': [{
				'name': 'Fried Chicken',
				'price': '16',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/rousi.jpg',
				'category':'meal',
				'createdate':new Date(),
				'theday':date
				  }, {
				'name': 'Steam Fish',
				'price': '35',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/fish.jpg',
				'category':'meal',
				'createdate':new Date(),
				'theday':date
					}, {
				'name': 'Coke',
				'price': '6',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/coke.jpg',
				'category':'drink',
				'createdate':new Date(),
				'theday':date
				}, {
				'name': 'Egg Seaweed Soup',
				'price': '22',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/danhua.jpg',
				'category':'drink',
				'createdate':new Date(),
				'theday':date
				}, {
				'name': 'Salt and pepper squid',
				'price': '38',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/jiaoyan.jpg',
				'category':'meal',
				'createdate':new Date(),
				'theday':date
				}, {
				'name': 'Braised ribs',
				'price': '42',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/zhaji.jpg',
				'category':'meal',
				'createdate':new Date(),
				'theday':date
				}, {
					'name': 'Brownie Trifle',
					'price': '9',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/brownie.jpg',
					'category':'dessert',
					'createdate':new Date(),
					'theday':date
				},{
					'name': 'Pizza',
					'price': '32',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/pizza.jpg',
					'category':'meal',
					'createdate':new Date(),
					'theday':date
				},{
					'name': 'Steak',
					'price': '42',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/pizza.jpg',
					'category':'meal',
					'createdate':new Date(),
					'theday':date
				},{
					'name': 'Peanut Butter',
					'price': '12',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/peanut.jpg',
					'category':'dessert',
					'createdate':new Date(),
					'theday':date
					}, {
					'name': 'Pumpkin Bars ',
					'price': '14',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/pumpkin.jpg',
					'category':'dessert',
					'createdate':new Date(),
					'theday':date
					}]
		}

		var menu1 = {
			'foodList1': [{
				'name': 'Fried Chicken',
				'price': '16',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/rousi.jpg',
				'category':'meal',
				'createdate':""
				  }, {
				'name': 'Steam Fish',
				'price': '35',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/fish.jpg',
				'category':'meal',
					}, {
				'name': 'Salt and pepper squid',
				'price': '38',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/jiaoyan.jpg',
				'category':'meal',
				}, {
				'name': 'Braised ribs',
				'price': '42',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/zhaji.jpg',
				'category':'meal',
				},{
					'name': 'Pizza',
					'price': '32',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/pizza.jpg',
					'category':'meal'
				},{
					'name': 'Steak',
					'price': '42',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/steak.jpg',
					'category':'meal'
				}]
		}

		var menu2 = {
			'foodList2': [{
				'name': 'Coke',
				'price': '6',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/coke.jpg',
				'category':'drink',
				}, {
				'name': 'Egg Seaweed Soup',
				'price': '22',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/danhua.jpg',
				'category':'drink',
				}]
		}

		var menu3 = {
			'foodList3': [{
				'name': 'Peanut Butter',
				'price': '12',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/peanut.jpg',
				'category':'dessert',
				}, {
				'name': 'Pumpkin Bars ',
				'price': '14',
				'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
				'url':'./img/pumpkin.jpg',
				'category':'dessert',
				},{
					'name': 'Brownie Trifle',
					'price': '9',
					'description':'This is a description for this dish and it is abosolutely yummy whatever it is.',
					'url':'./img/brownie.jpg',
					'category':'dessert',
				}]
		}

		function timeStampToTime(timestamp){ // 时间戳转为时间
			var date = new Date(timestamp);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			var time = Y+M+D+h+m+s;
			return time;
		}
		
		$scope.selectedValue = menu['valueSelected'];
		$scope.foodList = menu['foodList'];
		$scope.foodList1 = menu1['foodList1'];
		$scope.foodList2 = menu2['foodList2'];
		$scope.foodList3 = menu3['foodList3'];


		// GET =====================================================================
		// when landing on the page, get all orders and show them
		// use the service to get all the orders
		Orders.get()
			.success(function(data) {
				$scope.orders = data;
				$scope.loading = false;
			});


			

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrder = function(foodname) {

			var order = {};
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (foodname != undefined) {
				$scope.loading = true;
				
				for(var i=0; i < menu.foodList.length; i++) {
					if(menu.foodList[i]['name'] == foodname) {
						order = menu.foodList[i];
						break;
					}
				}
				// call the create function from our service (returns a promise object)
				Orders.create(order)

				// if successful creation, call our get function to get all the new orders
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.orders = data; // assign our new list of orders
				});
				alert("Your order has been submitted successfully!");
				$scope.getTotal();
			}
		};

		// DELETE ==================================================================
		// delete a order after checking it
		$scope.deleteOrder = function(id,createdate) {
			$scope.loading = true;
			Orders.delete(id,createdate)
				// if successful creation, call our get function to get all the new orders
				.success(function(data) {
					$scope.loading = false;
					$scope.orders = data; // assign our new list of orders
				});
			$scope.getTotal();
		};


		// calculate Total price using total API
		$scope.getTotal = function() {
			Orders.calculate()
				.success(function(data) {
					var total = 0;
					// sum up all prices of orders
						for(var i=0; i<data.length; i++)
								total += data[i].price;
					// 7.5% tax included
					$scope.total = total.toFixed(2);

		});
	};

}]);
