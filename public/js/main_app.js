//Used for sending post requests
var transform = function(data){
	return $.param(data);
};

angular.module("mainApp",['ngRoute','ngFileUpload','ui.bootstrap'])

.config(function($routeProvider,$httpProvider) {
	$routeProvider.when('/message',{
		templateUrl:'/partial',
		controller:'messageController'
	})
	.when('/dashboard',{
		templateUrl:'/partial2',
		controller:'dashboardController',
		controllerAs:'dashboard'
	})
	.when('/explore', {
		templateUrl:'/explore',
		controller:'exploreController',
		controllerAs: 'explore'
	})
	.when('/profile', {
		templateUrl:'/profile',
		controller:'profileController',
		controllerAs: 'profile'
	})
	.when('/explore-item', {
		templateUrl:'/explore-item',
		controller:'itemExploreController',
		controllerAs:"itemExplore"
	})
	.when('/appliedjobs', {
		templateUrl:'/appliedjobs',
		controller:'dashboardController',
		controllerAs:"dashboard"
	})
	.when('/signup1', {
		templateUrl:'step1.html',
		controller:'signupCtrl'
	})
	.when('/signup2', {
		templateUrl:'step2.html',
		controller:'signupCtrl'
	})
	.when('/signup3', {
		templateUrl:'step3.html',
		controller:'signupCtrl'
	})
	.when('/signup4', {
		templateUrl:'step4.html',
		controller:'signupCtrl'
	})
	.when('/signup5', {
		templateUrl:'step5.html',
		controller:'signupCtrl'
	})
	.when('/signup6', {
		templateUrl:'step6.html',
		controller:'signupCtrl'
	})

	.otherwise({
		templateUrl:'/partial2',
		controller:'dashboardController',
		controllerAs:'dashboard'
	});

	$httpProvider.defaults.useXDomain = true; 
	delete $httpProvider.defaults.headers 
	.common['X-Requested-With']; 

})


.factory('GetZIPs', function($http) {

	var dataService = {};

	dataService.all = function(data) {
		return $http.get('http://www.zipcodeapi.com/rest/UiiIs4AU2TbW9GOfvlDdXabquFS0dsc7LvQeAr9Clkzu1nKwJoJGzV74A04OthVe/' + "radius.json" + "/" + data.ZIP + "/" + data.distance + "/" + data.unit);
	};
	
	return dataService;
})

.factory('GetUserName', function($http) {

	var dataService = {};

	dataService.all = function(data) {
		return $http.get('/f_name');
	};
	
	return dataService;
})


.factory('GetUserData', function ($http) {

	var dataService = {};

	dataService.all = function() {
		return $http.post('/getprofileinfo');
	};

	return dataService;

})


.factory('SaveUserData', function ($http) {

	var dataService = {};

	dataService.saveData = function(data) {
		return $http.post('/updateprofile', data);
	};

	return dataService;

})


.factory('GetWorkImages', function ($http) {

	var dataService = {};

	dataService.all = function(data) {
		return $http.post('/getworkimages');
	};

	return dataService;

})

.factory('GetJobs', function ($http) {

	var dataService = {};

	dataService.all = function(data) {
		return $http.get('/getjobs');
	};

	return dataService;

})

.controller('signupCtrl', function ($timeout, GetUserData, Upload, SaveUserData, $scope, $location) {
	var vm = this;
	$scope.isDisabled = true;
	$scope.categories = {
		'Legal':  ["Contract Law","Corporate Law","Criminal Law","Family Law","Intellectual Property Law","Paralegal Services","Other - Legal"],
		'Pets': ["Dog Training","Dog Walking","Pet Care","Pet Sitting"],
		'Automotive': ["General Maintenance","Scheduled Maintenance","Brakes","Engine","Clutch & Transmission","Heating & AC","Suspension & Steering","Exterior & Interior","Electrical"],
		'Beauty': ["Haircuts","Colour","Textures","Treatments","Blowouts","Styling","Extensons","Facials","Brow Bar","Lash Extensions","Makeup Application","Hands Feets & Nails","Hair Removal","Body Treatment"],
		'Personal': ["Astrology Reading","Bodyguard Services","Closet Organizers","Counseling","Family Counseling","Genealogy","House Sitting","Identity Theft Restoration","Life Coaching","Marriage Counseling","Mediation","Ongoing Meal Delivery","Palm Reading","Paranormal Investigation","Personal Chef (Ongoing)","Private Investigation","Psychic Reading","Psychic and New Age Services","Psychology","Spiritual Counseling","Tarot Card Reading","Therapy","Wardrobe Consulting"],
		'Repair': ["Appliance Installation","Appliance Repair","ATM Repair","Coin Operated Machine Repair","Computer Repair","Copier Repair","Data Recovery Service","Dishwasher","Exercise Equipment Repair","Heavy Equipment Repair Services","Medical Equipment Repair","Network Support","Network Support Services","Phone or Tablet Repair","Play Equipment Repair","Point of Sale Repair Services","Pool Table Repair Services","Pressure Washer Repair","Printer and Copier Repair","Telephone System Services","Vacuum Cleaner Installation","Vacuum Cleaner Repair"],
		'Web': ["Desktop Software Development","Ecommerce Development","Game Development","Mobile Development","Product Management","QA & Testing","Scripts & Utilities","Web Development","Web & Mobile Design","Other - Software Development"],
		'Household': ["Additions remodels and general contracting","Handyman and repair projects","Lawncare and outdoor projects","Home theater","Electrical and lighting","Plumbing","Heating and cooling","Painting","Design and decor","Roofing siding and gutters","Walls framing and stairs","Moving","Cleaning","Pest control","Concrete and masonry","Inspections","Carpentry and woodworking"]
	};

	$scope.ok = function () {
		SaveUserData.saveData($scope.userData)
		.success(function (data) {
			if ($scope.step == 1) {
				$location.url('/signup2')
			};
			if ($scope.step == 2) {
				$location.url('/signup3')
			};
			if ($scope.step == 3) {
				$location.url('/signup4')
			};
			if ($scope.step == 4) {
				$location.url('/signup5')
			};
				// if ($scope.step == 5) {
				// 	$location.url('/signup6')
				// };
				if ($scope.step == 5) {
					$location.url('/dashboard')
				};
			});
	};

	$scope.setCategories = function() {
		$scope.specificCategory = $scope.categories[$scope.userData.generalJob];
	};

	var getUserData = function() {
		GetUserData.all()
		.success(function(data){
			setUserData(data);
		});
	}();

	// Set data from database
	var setUserData = function (data) {
		$scope.userData = {
			'firstname': data.firstname,
			'lastname': data.lastname,
			'address': data.address,
			'generalJob': data.generalJob,
			'specificJob': data.specificJob,
			'avatar': data.avatar,
			'topSkills': data.topskills || [],
			'summary': data.summary,
			'workImages': data.workImages,
			'email': data.email,
			'password': data.password,
			'phone': data.phone,
			'job': data.job
		};
		if ($scope.userData.avatar == undefined) {
			$scope.userData['avatar'] = "../profileimages/user.jpg";
		}
	};

	function setUserImage (data) {
		$scope.isDisabled = false;

		$scope.userData.avatar = data.url;

		SaveUserData.saveData($scope.userData)
		.success(function (data) {
		});
	};

	$scope.upload = function(file, errFiles) {
		vm.f = file;
		vm.errFile = errFiles && errFiles[0];
		if (file) {
			file.upload = Upload.upload({
				url: '/uploadprofile',
				data: {file: file}
			});

			file.upload.then(function (response) {
				$timeout(function () {
					file.result = response.data;
					setUserImage(file.result);
					vm.profile_image =  file.result.url;

					$scope.userData.avatar = vm.profile_image;
					SaveUserData.saveData($scope.userData)
					.success(function (data) {
					});
					$scope.$parent.userLogo = vm.profile_image;

					$scope.$apply();

				});
			}, function (response) {
				if (response.status > 0)
					vm.errorMsg = response.status + ': ' + response.data;
				
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 *
					evt.loaded / evt.total));
			});
		}   
	};

	$scope.valueChanged = function () {
		$scope.isDisabled = false;
	}
})

.controller("mainController", function(GetUserName, SaveUserData, $window, $uibModal, GetUserData, GetJobs, $http, $scope,$anchorScroll,Upload,$timeout, $scope, $location,$rootScope) {
	$scope.showSearch = true;

	$rootScope.$on('showSeacrchBar', function(event, value){
		console.log("...................", value);
		$scope.showSearch = value;
	});

	$rootScope.$on('signup-complete', function(event){
		$scope.signup = false;
	});
	$scope.signup = false;
	var vm = this;

    //start filtering search
    $scope.searchby = ["Name","General Job"];
    $scope.selected_dropdown = null;
    $scope.search_element = null;
    $scope.typed_search_element = function typed_search_element(data) {
        $scope.search_element = data;
        //console.log($scope.search_element);
    };

    $scope.search_bar = function search_bar(){
        //send this data to other controller like dashboard
        $rootScope.$broadcast('Searched Data', $scope.selected_dropdown,$scope.search_element,true);
        console.log($scope.selected_dropdown,$scope.search_element);
        //end sending
    };

    $scope.test = function test(data){
        $scope.selected_dropdown = data;
        //console.log("**********",$scope.selected_dropdown);
    };

    //end filtering search
	$scope.categories = {
		'Legal':  ["Contract Law","Corporate Law","Criminal Law","Family Law","Intellectual Property Law","Paralegal Services","Other - Legal"],
		'Pets': ["Dog Training","Dog Walking","Pet Care","Pet Sitting"],
		'Automotive': ["General Maintenance","Scheduled Maintenance","Brakes","Engine","Clutch & Transmission","Heating & AC","Suspension & Steering","Exterior & Interior","Electrical"],
		'Beauty': ["Haircuts","Colour","Textures","Treatments","Blowouts","Styling","Extensons","Facials","Brow Bar","Lash Extensions","Makeup Application","Hands Feets & Nails","Hair Removal","Body Treatment"],
		'Personal': ["Astrology Reading","Bodyguard Services","Closet Organizers","Counseling","Family Counseling","Genealogy","House Sitting","Identity Theft Restoration","Life Coaching","Marriage Counseling","Mediation","Ongoing Meal Delivery","Palm Reading","Paranormal Investigation","Personal Chef (Ongoing)","Private Investigation","Psychic Reading","Psychic and New Age Services","Psychology","Spiritual Counseling","Tarot Card Reading","Therapy","Wardrobe Consulting"],
		'Repair': ["Appliance Installation","Appliance Repair","ATM Repair","Coin Operated Machine Repair","Computer Repair","Copier Repair","Data Recovery Service","Dishwasher","Exercise Equipment Repair","Heavy Equipment Repair Services","Medical Equipment Repair","Network Support","Network Support Services","Phone or Tablet Repair","Play Equipment Repair","Point of Sale Repair Services","Pool Table Repair Services","Pressure Washer Repair","Printer and Copier Repair","Telephone System Services","Vacuum Cleaner Installation","Vacuum Cleaner Repair"],
		'Web': ["Desktop Software Development","Ecommerce Development","Game Development","Mobile Development","Product Management","QA & Testing","Scripts & Utilities","Web Development","Web & Mobile Design","Other - Software Development"],
		'Household': ["Additions remodels and general contracting","Handyman and repair projects","Lawncare and outdoor projects","Home theater","Electrical and lighting","Plumbing","Heating and cooling","Painting","Design and decor","Roofing siding and gutters","Walls framing and stairs","Moving","Cleaning","Pest control","Concrete and masonry","Inspections","Carpentry and woodworking"]
	};

	var getUserData = function() {
		GetUserData.all()
		.success(function(data) {
			if (data.avatar == undefined) {
				$scope.signup = true;
				$location.url('/signup1');
			};
		});

	}();

	$scope.editOptions = {
	'name': false,
	'bio': false,
	'photo': false,
	'location': false,
	'services': false,
	'skills': false,
	'email': false,
	'password': false,
	'hire': false
	};
	$scope.showOptions = true;
	$scope.showSecondMenu = false;
	$scope.messageError = "";
	$scope.showMenu = function() {
		$scope.showSecondMenu = !$scope.showSecondMenu;
		$scope.showOptions = true;
		$scope.editOptions = {
		'name': false,
		'bio': false,
		'photo': false,
		'location': false,
		'services': false,
		'skills': false,
		'email': false,
		'password': false,
		'hire': false
		};
		GetUserData.all()
		.success(function(data){
			$scope.setUserData(data);
			$scope.userName = data.firstname;
			$scope.userLogo = data.avatar;
		});
	};
	$scope.hideMenu = function() {
		$scope.showSecondMenu = false;
	};

	$scope.setUserData = function (data) {
		$scope.userData = {
			'firstname': data.firstname,
			'lastname': data.lastname,
			'address': data.address,
			'generalJob': data.generalJob,
			'specificJob': data.specificJob,
			'avatar': data.avatar,
			'topSkills': data.topskills || [],
			'summary': data.summary,
			'workImages': data.workImages,
			'email': data.email,
			'password': data.password,
			'phone': data.phone,
			'job': data.job
		};

		$scope.specificCategory = $scope.categories[$scope.userData.generalJob];

		$scope.passwordSet = {
			'checkPassword': "",
			'confirmNewPassword': "",
			'newPassword': ""
		};
	};

	$scope.getAllUserData = function() {
		GetUserData.all()
		.success(function(data){
			$scope.setUserData(data);
			$scope.userName = data.firstname;
			$scope.userLogo = data.avatar;
		});
	}();

	$scope.menuClicked = function(filename) {
		$scope.showOptions = false;
		$scope.editOptions[filename] = true;
	};

	$scope.dismissSettings = function (filename) {
		$scope.showOptions = true;
		$scope.editOptions[filename] = false;
	};

	$scope.setCategories = function() {
		$scope.specificCategory = $scope.categories[$scope.userData.generalJob];
	};

	$scope.ok = function (filename) {
		$scope.saveToDb = true;
		if (filename == 'email') {
			$scope.saveToDb = false;
			if ($scope.passwordSet.checkPassword != "") {
				if ($scope.passwordSet.checkPassword == $scope.userData.password) {
					if ($scope.passwordSet.newPassword == $scope.passwordSet.confirmNewPassword && $scope.passwordSet.confirmNewPassword != "") {
						$scope.userData['password'] = $scope.passwordSet.confirmNewPassword;
						$scope.saveToDb = true;
					}
					else {
						$scope.messageError = "Passwords don't match";
					};
				}
				else {
					$scope.messageError = "Incorrect password";
				};
			}
			else {
				$scope.saveToDb = true;
			};
		};
		if($scope.saveToDb == true) {
			SaveUserData.saveData($scope.userData).success(function (data) {
				$scope.showOptions = true;
				$scope.editOptions[filename] = false;
				$scope.userName = $scope.userData.firstname;
				$scope.userLogo = $scope.userData.avatar;
				$rootScope.$broadcast('update-profile');
				GetUserData.all()
				.success(function(data){
					$scope.setUserData(data);
					$scope.userName = data.firstname;
					$scope.userLogo = data.avatar;
				});
			});
		};
	};

	

	// Set data from database

	function setUserImage (data) {
		$scope.isDisabled = false;

		$scope.userData.avatar = data.url;

		SaveUserData.saveData($scope.userData)
		.success(function (data) {
		});
	};

	$scope.upload = function(file, errFiles) {
		vm.f = file;
		vm.errFile = errFiles && errFiles[0];
		if (file) {
			file.upload = Upload.upload({
				url: '/uploadprofile',
				data: {file: file}
			});

			file.upload.then(function (response) {
				$timeout(function () {
					file.result = response.data;
					setUserImage(file.result);
					vm.profile_image =  file.result.url;

					$scope.userData.avatar = vm.profile_image;
					SaveUserData.saveData($scope.userData)
					.success(function (data) {
					});
					$scope.$parent.userLogo = vm.profile_image;

					$scope.$apply();

				});
			}, function (response) {
				if (response.status > 0)
					vm.errorMsg = response.status + ': ' + response.data;
				
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 *
					evt.loaded / evt.total));
			});
		}   
	};

	var socket = io();
    var user = Math.random();//prompt("Enter your username");
    vm.user_ = user;
	//page tab
	vm.page = "dashboard";

	vm.userName = "";

	vm.closeChatWindow = function(id) {
		$(id).hide();
	}

	vm.openChatWindow = function(id) {
		$(id).show();
	}

	vm.users = [
	{
		id: 1,
		name: "Johan",
		messages: [
		{
			sender:"Zack",
			msg: "Hello man!"
		},
		{
			sender:"Zack",
			msg: "What's wrong!"
		}
		]
	},
	{
		id: 2,
		name: "Zack",
		messages: [
		{
			sender:"Tito",
			msg: "You too!"
		}
		]
	},
	{
		id: 3,
		name: "Sarah",
		messages: []
	}
	];

	vm.sendMessage = function(e,id,identifier) {
		if(e.keyCode==13) {

			if($(id).val()!="") {
				$(id).val="this is it"
				socket.emit('chat message', {'message':$(id).val(),'user':user, 'id':id, 'identifier':identifier});
				$('#m').val('');
				$(id).val("");
				$(id).text("");
			}
			
		}
	}

	vm.sendPrivate = function(e,id,identifier) {
		if(e.keyCode==13) {
			if($(id).val()!="") {
				$(id).val="this is it"
				socket.emit('chat message', {'message':$(id).val(),'user':user, 'id':id, 'identifier':identifier});
				$('#m').val('');
				$(id).val("");
				$(id).text("");
			}
		}
	}

	socket.on('chat message', function(msg){
		
		for(i=0;i<vm.users.length;i++) {
			if(vm.users[i].id==msg.identifier) {
				var push_data = {sender:msg.user, msg: msg.message};
				vm.users[i].messages.push(push_data);
				$scope.$apply();
			}
			
    		//updateScroll(msg.id);


    	}
    	$('#msgs').append('<li class="recieved"><div class="message-item"><div class="messge">' + msg.message + '</div><div class="text-right"><span class="time">Sent '+msg.time+'</span></div></div></li>');

    });
	
	function updateScroll(id){
		var element = $(id);
		element.scrollTop = element.scrollHeight;
	    /*var element = document.getElementById("chat-msgs");
	    element.scrollTop = element.scrollHeight;*/
	}

	/*vm.uploadFiles = function(file, errFiles) {
        vm.f = file;
        vm.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/uploadprofile',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    vm.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }*/

    vm.applied_jobs1 = [];
    vm.num_of_applied_jobs = function() {
    	return vm.applied_jobs1.length;
    }



/*	$scope.userLogo = '';
	GetUserData.all()
		.success(function(data){
			$scope.userLogo = data.avatar;
		});*/

	})

.controller("exploreController",function($rootScope) {
	$rootScope.$broadcast('showSeacrchBar', false);
	var vm = this;
})

.controller("profileController",function(GetUserData, $rootScope, GetWorkImages, SaveUserData, $timeout,$window,$scope,Upload) {

	$rootScope.$broadcast('showSeacrchBar', false);
	var vm = this;
	/**
	 * User data initialization
	 * @type {{}}
	 */

	 $rootScope.$on('update-profile', function(event){
	 	GetUserData.all()
	 	.success(function(data){
	 		setUserData(data);
	 	});
	 });

	 $scope.userData = {};
	 $scope.dataEditVisible = {
	 	'job': false,
	 	'address': false,
	 	'topSkills': false,
	 	'summary': false
	 };


	// Get all data from database
	var getUserData = function() {
		GetUserData.all()
		.success(function(data){
			setUserData(data);
		});
	}();

	// Set data from database
	var setUserData = function (data) {
		$scope.userData = {
			'name': data.firstname + ' ' + data.lastname,
			'address': data.address,
			'job': data.job,
			'avatar': data.avatar,
			'topSkills': data.topskills || [],
			'summary': data.summary,
			'workImages': data.workImages,
		};
		// if ($scope.userData.workImages.split('/')[-1] == undefined) {
		// 	$scope.userData.workImages = undefined;
		// }
		$scope.skillsAdded = $scope.userData.topSkills.split(",");
		$scope.$parent.userLogo = data.avatar;
		if ($scope.userData.workImages == undefined) {
			$scope.workImages = [];
		}
		else {
			$scope.workImages = $scope.userData.workImages.split(',');
		};
	};

	function setUserImage (data) {
		$scope.userData.avatar = data.url;

		SaveUserData.saveData($scope.userData)
		.success(function (data) {
		});
	}

	// Watch for changes in input fields
	$scope.profileEditAction = function (evt, key) {
		var keyCode = evt.keyCode;
		// Enter pressed
		if (keyCode === 13) {
			$scope.dataEditVisible[key] = false;
			SaveUserData.saveData($scope.userData)
			.success(function (data) {
			});
		}
	};

	// Add new skill
	$scope.newSkillValue = '';
	$scope.addNewTopSkill = function (evt) {
		var keyCode = evt.keyCode;

		// Enter pressed
		if (keyCode === 13) {

			$scope.dataEditVisible['topSkills'] = false;

			if($scope.userData.topSkills==undefined || $scope.userData.topSkills==null || $scope.userData.topSkills=="") {
				$scope.userData.topSkills = "";
			}
			if ($scope.userData.topSkills == ""){
				$scope.userData.topSkills = $scope.userData.topSkills + $scope.newSkillValue;
			}
			else{
				$scope.userData.topSkills = $scope.userData.topSkills + ',' + $scope.newSkillValue;
			};
			$scope.skillsAdded = $scope.userData.topSkills.split(",");
			
			$scope.newSkillValue = '';
			SaveUserData.saveData($scope.userData)
			.success(function (data) {
			});
		}
	};

	// Edit summary
	$scope.editSummary = function (evt) {
		var keyCode = evt.keyCode;
		var summaryValue = document.getElementById('summary-edit');

		// Enter pressed
		if (keyCode === 13) {
			$scope.userData.summary = summaryValue.value;
			$scope.dataEditVisible['summary'] = false;

			SaveUserData.saveData($scope.userData)
			.success(function (data) {
			});
		}
	};



	/**
	 * Work section
	 * */
	 $scope.workImages = [];
	 $scope.workGalleryVisible = false;

	// Open gallery
	$scope.openWorkGallery = function () {
		$scope.workGalleryVisible = true;
	};

	// Close gallery
	$scope.closeWorkGallery = function () {
		$scope.workGalleryVisible = false;
	};

	// Move images
	$scope.selectedImage = 0;
	$scope.moveImages = function (side) {

		if (side === 'left') {
			$scope.selectedImage--;
			if ($scope.selectedImage < 0) {
				$scope.selectedImage = $scope.workImages.length-1;
			}
		}

		if (side === 'right') {
			$scope.selectedImage++;
			if ($scope.selectedImage === $scope.workImages.length) {
				$scope.selectedImage = 0;
			}
		}

	};

	function testFun (url) {
	};

	$scope.uploadWorkImage = function (file, errFiles) {
		vm.f = file;
		vm.errFile = errFiles && errFiles[0];
		if (file) {
			file.upload = Upload.upload({
				url: '/uploadprofile',
				data: {file: file}
			});

			file.upload.then(function (response) {
				$timeout(function () {
					if ($scope.userData.workImages == undefined) {
						$scope.userData['workImages'] = response.data.url;
						SaveUserData.saveData($scope.userData)
						.success(function (data) {
						});
						$scope.workImages = $scope.userData['workImages'].split(',');
					}
					else {
						$scope.userData.workImages = $scope.userData.workImages + "," + response.data.url;
						SaveUserData.saveData($scope.userData)
						.success(function (data) {
						});
						$scope.workImages = $scope.userData['workImages'].split(',');
					};
				});

			}, function (response) {
				if (response.status > 0)
					vm.errorMsg = response.status + ': ' + response.data;
				
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 *
					evt.loaded / evt.total));
			});
		}   
	}

	// Upload image
	$scope.upload = function(file, errFiles) {
		vm.f = file;
		vm.errFile = errFiles && errFiles[0];
		if (file) {
			file.upload = Upload.upload({
				url: '/uploadprofile',
				data: {file: file}
			});

			file.upload.then(function (response) {
				$timeout(function () {
					file.result = response.data;
					setUserImage(file.result);
					vm.profile_image =  file.result.url;

					$scope.userData.avatar = vm.profile_image;
					SaveUserData.saveData($scope.userData)
					.success(function (data) {
					});
					$scope.$parent.userLogo = vm.profile_image;

					$scope.$apply();

				});
			}, function (response) {
				if (response.status > 0)
					vm.errorMsg = response.status + ': ' + response.data;
				
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 *
					evt.loaded / evt.total));
			});
		}   
	}

})

.controller("messageController",function($rootScope) {
	$rootScope.$broadcast('showSeacrchBar', false);
	var vm = this;

	//messages tab
	vm.messages = "all";

	vm.friends = [];	//Array for friends conversation management..friends,status,conversations


})

.controller("dashboardController",function(GetZIPs,GetUserData,$http,GetJobs,$scope,$rootScope) {

	$rootScope.$broadcast('showSeacrchBar', true);

    $http.get('/test_users').success(
        function(data){
            $scope.usersAll_filter = data;
            $scope.usersAll = data;
        }
    );

    var vm = this;
	$rootScope.$broadcast('signup-complete');
	//dashboard tabs - urgent and sidejob
	vm.tab = "urgent"
	//categories
	//$scope.categories = ["Personal","Automotive","Beauty","Repair","Household","Legal","Pets","Web"];
    $scope.categories = [
        {Name: "Personal"},
        {Name: "Automotive"},
        {Name: "Beauty"},
        {Name: "Repair"},
        {Name: "Household"},
        {Name: "Legal"},
        {Name: "Pets"},
        {Name: "Web"}
    ];
    //$scope.categories_now = null;
    $scope.filtered_categories = [];
	$scope.selected_categories = function selected_categories(categories_now){
        console.log(categories_now);
        if(categories_now.selected){
            $scope.filtered_categories.push(categories_now.Name);
        }
        else {
            console.log("-------------------",categories_now.Name,$scope.filtered_categories, $scope.filtered_categories.indexOf(categories_now.Name));
            var ii = $scope.filtered_categories.indexOf(categories_now.Name);
            if(ii != -1) {
                $scope.filtered_categories.splice(ii, 1);
            }
        }
        //-------------------
        $scope.filtered_data_left = [];
        if($scope.filtered_data_left.length<1 && $scope.search_from_bar==false){
            $scope.filtered_data_left = $scope.usersAll;
            console.log($scope.filtered_data_left,$scope.usersAll);
        }else{
            $scope.filtered_data_left = $scope.filtered_data;
        }
        //if($scope.filtered_data_left.length < 1){
        //    $scope.filtered_data_left = $scope.usersAll;
        //    console.log("saving user all in filtered data");
        //}else {
        //    console.log("It should auto filter");
        //}
        var fd = [];
        for(var m=0;m<$scope.filtered_data_left.length;m++){
            console.log("you there",$scope.filtered_data_left.length);
            if($scope.filtered_categories.length < 1){
                break;
            }
            else {
                for(var n=0; n<$scope.filtered_categories.length;n++){
                    if($scope.filtered_data_left[m].general_job == $scope.filtered_categories[n]){
                        fd.push($scope.filtered_data_left[m]);
                    }
                }
            }
        }
        $scope.usersAll_filter = null;
        if(fd.length>0) {
            $scope.usersAll_filter = fd;
        }else{
            if($scope.search_from_bar==false)
                $scope.usersAll_filter = $scope.usersAll;
            else
                $scope.usersAll_filter = $scope.filtered_data;
        }
            //----------------------
        console.log($scope.filtered_categories);
    };

    // Listen the broadcast
    $scope.search_from_bar = false;
    $scope.$on('Searched Data', function(response, selected_dropdown, searched_value,search) {
        $scope.filtered_data = [];
        $scope.search_from_bar = search;
        console.log("hi");
        //create an array of the User data filtered by searched items
        for(var i=0;i<$scope.usersAll.length;i++){
            if(selected_dropdown == 'Name') {
                if ($scope.usersAll[i].firstName.toLowerCase() == searched_value.toLowerCase() ||
                    $scope.usersAll[i].lastName.toLowerCase() == searched_value.toLowerCase()){

                    $scope.filtered_data.push($scope.usersAll[i]);
                }
            } else if(selected_dropdown == 'Skills'){
                if($scope.usersAll[i].skills){
                    var skills = $scope.usersAll[i].skills.split(",");
                    for(var j=0;j<skills.length;j++){
                        if(skills[j].toLowerCase() == searched_value.toLowerCase()){
                            $scope.filtered_data.push($scope.usersAll[i]);
                        }
                    }
                }
            }
            else  if(selected_dropdown == 'General Job'){
                if($scope.usersAll[i].general_job){
                    if ( $scope.usersAll[i].general_job.toLowerCase() == searched_value.toLowerCase()){
                        $scope.filtered_data.push($scope.usersAll[i]);
                    }
                }
            }
        }
        $scope.usersAll_filter = null;
        $scope.usersAll_filter = $scope.filtered_data;
    });

    // end listening

/*	vm.jobs = [
		{
			id:1,
			title: "Sidejob",
			owner: "Sam Jones",
			description: "This is first filtering",
			categories: ["Personal","Automotive","Beauty"],
			ZIP: 10000
		},
		{
			id:2,
			title: "Sidejob",
			owner: "John Lenon",
			description: "How to finish the job in time,starting today",
			categories: ["Household","Legal","Lessons"],
			ZIP: 10001
		},
		{
			id:3,
			title: "Sidejob",
			owner: "Simon Tower",
			description: "How to give inspiration the right way Design",
			categories: ["Creative","Event","Financial"],
			ZIP: 10002
		},
		{
			id:4,
			title: "Sidejob",
			owner: "Simon Tower 3",
			description: "How to give inspiration the right way Design",
			categories: ["Creative","Event","Financial"],
			ZIP: 10002
		},
		{
			id:5,
			title: "Sidejob",
			owner: "Simon Tower 2",
			description: "How to give inspiration the right way Design",
			categories: ["Creative","Event","Financial"],
			ZIP: 10002
		}
		];*/

		vm.getJobs = function() {
			GetJobs.all()
			.success(function(data) {
				vm.jobs = data;
				vm.filter_applied_jobs();
			})
		}
		vm.getJobs();

		vm.applied = [];
		vm.rejected = [];
		$scope.numberOfJobs = 847;

		vm.applied_jobs = [];
		vm.rejected_jobs = [];

		vm.zip_filter=0;

		vm.type=function(t) {
		}

		vm.zip_filtering = function(zip) {
			if(vm.zip_filter==0) {
				return true;
			}
			else if(vm.zip_filter==zip) {
				return true;
			}
			else {
				return false;
			}
		}

		$scope.toggleFilters = function () {
			$('#first-filter').toggle(200);
		}

		vm.search_filter = '';
		vm.search = function(name) {
			if(name.search(vm.search_filter)!=-1) {
				return true;
			}
			else {
				return false;
			}
		}

		vm.category_filter="";

		vm.category_filtering = function(categories) {
			if(vm.category_filter=="") {
				return true;
			}
			
			else {
				return categories.some(function(element,index,array) {
					return element==vm.category_filter;
				})
			}
		}

		vm.distance = 0;

		angular.element('.slider').on('slideStop',function(e) {
			if(vm.distance!=e.value) {
				vm.filterByZIP(e.value);
				vm.distance = e.value;
			}
			
		})

		vm.filterByZIP = function(distance) {
			
			var data = {distance: distance, ZIP: vm.zip_filter, unit: "mile"};
			
			GetZIPs.all(data)
			.success(function(data) {
			})
		}

		vm.filter_applied_jobs = function() {
			vm.applied_jobs = [];
			var found = false;
		//$scope.$parent.main.applied_jobs1 = [];
		for(i=0;i<vm.jobs.length;i++) {
			for(j=0;j<vm.applied.length;j++) {
				if(vm.jobs[i].id==vm.applied[j].id) {
					vm.applied_jobs.push(vm.jobs[i]);
					$scope.$parent.main.applied_jobs1 = vm.applied_jobs;
					break

				}
			}
			
		}
		
	}


	vm.apply = function(id) {
		var found = false;
		vm.applied.some(function(element) {
			if(element.id==id) {
				found=true;
			}
			
		})
		if(!found) {
			vm.applied.push({id:id});
			vm.filter_applied_jobs();
		}
		else {
		}
		
	}
	vm.reject = function(id) {
		var found = false;
		vm.rejected.some(function(element) {
			if(element.id==id) {
				found=true;
			}
			
		})
		if(!found) {
			vm.rejected.push({id:id});
			//vm.filter_rejected_jobs();
		}
		else {
		}
	}

	vm.unsubscribe = function(id) {
		vm.applied.some(function(element,i,arr) {
			if(element.id==id) {
				vm.applied.splice(i,1);
			}
		})
		vm.filter_applied_jobs();


	}

	vm.isAppliedOrRejected = function(id) {
		var found = false;
		vm.applied.some(function(element) {
			if(element.id==id) {
				found = true;
			}
		})
		vm.rejected.some(function(element) {
			if(element.id==id) {
				found = true;
			}
		})
		return found;
	}


	$scope.userLogo = '';
	GetUserData.all()
	.success(function(data){
		$scope.userLogo = data.avatar;
	});

	vm.postJobModal = function() {
		$('#postjob_modal').modal('show');
	}

});

/* JS Snippet for Tabs (not sure where to put it?) */

$(document).ready(function(){
	$('body').on('click','.egtab-handler',function(){
		$('.egtab-handler').removeClass('active');
		var tabcontID = $(this).attr('data-egtabtarget');
		$('.egtab-content').hide();
		$('#'+tabcontID).show();
		$(this).addClass('active');
	});
});