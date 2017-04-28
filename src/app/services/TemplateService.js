/*
 ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
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
class TemplateService {

    constructor () {
        this.templateType = '';
        this.templatesCollection = {
            Discharge: 'documents-detail-discharge.html',
            Referral: 'documents-detail-referral.html'
        };
        /* istanbul ignore next */
        this.setTemplateType = function (type) {
            if (type.indexOf('Discharge') >= 0) {
                this.templateType = 'Discharge';
            }
            if (type.indexOf('Referral') >= 0) {
                this.templateType = 'Referral';
            }
        };
        this.getTemplate = function () {
            let templateDocumentsType = this.templatesCollection[this.templateType];
            return templateDocumentsType;
        };
    }
}

export default TemplateService;