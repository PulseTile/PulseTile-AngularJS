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

class HandleErrorsController {
	constructor($scope, $ngRedux, ConfirmationHandleErrors) {
		this.initialiseError = null;
		this.currentError = null;
		this.defaultConfirmationConfig = {
			title: 'Connection Error',
			textOk: 'Ok',
			textCancel: 'Cancel',
			isShowCancelButton: false,
			isShowOkButton: true,
			eventOk: closeModal,
			eventHide: closeModal,
			eventCancel: closeModal,
			textMessage: 'Something wrong',
		};
		function reloadPage () { location.reload(); };
		function closeModal () {};

		this.getErrorConfig = () => {
			const requestError = this.currentError;
			const requestErrorStatus = requestError.status;
			switch (true) {
				case requestError.initialiseError:
          return {
            eventOk: reloadPage,
            eventHide: reloadPage,
            textOk: 'Reload Page',
            textMessage: 'Some connection error has occurred. Please check your connection and try again.',
          };
				case requestErrorStatus < 0:
				case requestErrorStatus === 0:
					return {
						eventOk: reloadPage,
						textOk: 'Reload Page',
            isShowCancelButton: true,
						textMessage: 'Some connection error has occurred. Please check your connection and try again.',
					};
				case requestErrorStatus > 499:
					return {
						eventOk: reloadPage,
						textOk: 'Reload Page',
            isShowCancelButton: true,
            textMessage: 'Something is wrong with the server. Please try again later.',
					};
				case requestErrorStatus === 403:
					return {
						eventOk: reloadPage,
						textOk: 'Reload Page',
            isShowCancelButton: true,
            textMessage: 'Your token has been expired. Please reload the page.',
					};
				case requestErrorStatus === 400:
				case requestErrorStatus === 404:
					return {
						textMessage: 'Current request is invalid.',
					};
				default:
					return { textMessage: 'Something wrong' }
			}
		};

		this.showError = function () {
			const config = this.getErrorConfig();
			ConfirmationHandleErrors.openModal(Object.assign(this.defaultConfirmationConfig, config));
		};

		this.setCurrentPageData = function (store) {
			const state = store.errorOfRequest;
			const error = state.error;

			if (this.currentError !== error) {
				this.currentError = error;

				if (!this.initialiseError) {
					this.initialiseError = this.currentError.initialiseError ? this.currentError : null;
					this.showError();
				}
			}
		};

		let unsubscribe = $ngRedux.connect(state => ({
			getStoreData: this.setCurrentPageData(state)
		}))(this);
		$scope.$on('$destroy', unsubscribe);
	}
}
const HandleErrorsComponent = {
	controller: HandleErrorsController
};

HandleErrorsController.$inject = ['$scope', '$ngRedux', 'ConfirmationHandleErrors'];
export default HandleErrorsComponent;