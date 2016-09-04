
app = angular.module('BusTracker');


app.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

app.directive('droppable', function() {
  return {
    scope: {
      drop: '&' // parent
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          this.classList.remove('over');
          
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);
          
          // call the drop passed drop function
          scope.$apply('drop()');
          
          return false;
        },
        false
      );
    }
  }
});

app.directive('ddr', function($compile) {

	return {
		restrict: 'A',

		link: function($scope, iElm, iAttrs, controller) {
            // console.log('Here is your element', iElm);
             	// console.log(iElm);
             	// console.log(iElm.context);
             	// console.log(iElm.length);
                    // DO SOMETHING

                    angular.forEach(iElm, function(value, key){
                    	// console.log(iAttrs.id);
                    	
                    	// element_id = iAttrs.id;
                    	// var text = document.getElementById("57b4908ff99c0698620c6eba");

                    	// console.log(text);

                    	// alert(value.innerText);

                    });
        }
	}
});

// app.directive('RearrangeStation',function(){
//     // Runs during compile
//     return {
//         // name: '',
//         // priority: 1,
//         // terminal: true,
//         // scope: {}, // {} = isolate, true = child, false/undefined = no change
//         // controller: function($scope, $element, $attrs, $transclude) {},
//         // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
//         // restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
//          restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
//         // template: '',
//         // templateUrl: '',
//         // replace: true,
//         // transclude: true,
//         // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//         link: function($scope, iElm, iAttrs, controller) {
//             console.log('Here is your element', iElm);
//                     // DO SOMETHING
//         }
//     };
// });