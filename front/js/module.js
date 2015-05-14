angular.module('RDash',[]);
angular.module('monitor', ['ui.bootstrap', 'ui.router', 'RDash', 'LocalStorageModule'])
.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('monitor');
  }])
;