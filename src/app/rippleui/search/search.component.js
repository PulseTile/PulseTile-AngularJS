/*
  ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
let templateSearch = require('./search.html');

class SearchController {
  constructor($scope, serviceRequests, $state) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'main-search'});
    serviceRequests.publisher('headerTitle', {title: 'Welcome', isShowTitle: true});

    this.mainSearchEnabled = true;
    this.showAdvancedSearch = false;
    this.searchExpression = '';

    serviceRequests.publisher('populateHeaderSearch', {
      headerSearch: this.searchExpression,
      headerSearchEnabled: false
    });

    this.hideSearch = function() {
      this.mainSearchEnabled = false;
      serviceRequests.publisher('populateHeaderSearch', {
        headerSearch: this.searchExpression,
        headerSearchEnabled: true
      });
    };

    this.toggleAdvancedSearch = function() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
    }.bind(this);
    serviceRequests.subscriber('toggleAdvancedSearch', this.toggleAdvancedSearch);

  }
}

const SearchComponent = {
  template: templateSearch,
  controller: SearchController
};

SearchController.$inject = ['$scope', 'serviceRequests', '$state'];
export default SearchComponent;