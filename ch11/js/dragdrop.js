var app = angular.module('myApp', []);

app.controller('myController', function($scope){
	$scope.dragStatus = 'none';
	$scope.dropStatus = 'none';
	$scope.dropValue = "";
	$scope.Vegetables = [{'name':"asparagus","enemy" : ["onion","garlic","potato","BARFFFFF"],"image":'/images/asparagus.jpg'},
					{'name':"potato","enemy" : ["carrot","cucumber","pumpkin","raspberry", "squash","sunflower","tomato"],
					"image":'/images/potato.jpg'},
					{'name':"carrot", "enemy" : ["dill","parsnip","radish"],"image":'/images/carrots.jpg'}]
	/*{
    "asparagus": {
        "enemy" : ["onion","garlic","potato","BARFFFFF"],
        "image": "images/asparagus.jpg"
    }, 
    "potato": {
        "enemy" : ["carrot","cucumber","pumpkin",
        "raspberry", "squash","sunflower","tomato"],
        "image": "images/potato.jpg"
    }, 
    "carrot": {
        "enemy" : ["dill","parsnip","radish"],
        "image": "images/carrots.jpg"
    }
  };*/

})
 

.directive('dragit', function($document, $window){
		function makeDraggable(scope, element, attr){
			angular.element(element).attr("draggable","true");
			element.on('dragstart', function(event){
				element.addClass('dragItem');
				scope.$apply(function(){
					scope.dragStatus = "Dragging " + element.html();
					scope.dropValue = element.html();
				});
				event.dataTransfer.setData('Text', element.html());
			});
			element.on('drag', function(event){
				scope.$apply(function(){
					scope.dragStatus = "X: " + event.pageX + "Y: " + event.pageY;
				});
			});
			element.on('dragend', function(event){
				event.preventDefault();
				element.removeClass('dragItem');
			});
		}
		return{link: makeDraggable};
	})
.directive('dropit', function($document, $window){
	return{
		restrict: 'E',
		link: function makeDroppable(scope, element, attr){
			element.on('dragover',function(event){
				event.preventDefault();
				scope.$apply(function(){
					scope.dropStatus = "Drag Over";
				});
			});
			element.on('dragleave', function(event){
				event.preventDefault();
				element.removeClass('dropItem');
				scope.$apply(function(){
					scope.dropStatus = "Drag Over";
				});
			});
			element.on('dragenter', function(event){
				event.preventDefault();
				element.addClass('dropItem');
				scope.$apply(function(){
					scope.dropStatus = 'Drag Enter';
				});
			});
			element.on('drop', function(event){
				event.preventDefault();
				element.removeClass('dropItem');
				scope.$apply(function(){
					element.append('<p>'+event.dataTransfer.getData('Text')+'</p>');
					scope.dropStatus = "Dropped " + scope.dropValue;
				});
			});
		}
	};
});

var vegetables={
    "asparagus": {
        "enemy" : ["onion","garlic","potato","BARFFFFF"],
        "imageUrl": "images/asparagus.jpg"
    }, 
    "potato": {
        "enemy" : ["carrot","cucumber","pumpkin",
        "raspberry", "squash","sunflower","tomato"],
        "imageUrl": "images/potato.jpg"
    }, 
    "carrot": {
        "enemy" : ["dill","parsnip","radish"],
        "imageUrl": "image/carrots.jpg"
    }
    
       }; 