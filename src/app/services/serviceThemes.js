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

class ServiceThemes {
  constructor (serviceRequests) {
    this.dataApplication = {};

    this.logoB64 = 'data:image/png;base64,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';
    this.activeTheme = 'default';
    this.themes = {
      default: {
        name: 'Green Theme',
        baseColor: '#0D672F'
      },
      purple: {
        name: 'Purple Theme',
        baseColor: '#461a5a',
      },
      gray: {
        name: 'Gray Theme',
        baseColor: '#53555a',
      }
    };

    for (var themeId in this.themes) {
      this.themes[themeId].id = themeId;
    }

    /* istanbul ignore next */
    this.getDataApplication = function () {
      return this.dataApplication;
    };
    /* istanbul ignore next */
    this.setDataApplication = function (data) {
      this.dataApplication = data;

      if (data.themeColor) {
        this.setActiveTheme(data.themeColor);
        this.dataApplication.theme = this.getThemeById(data.themeColor);
      }
      if (data.logoB64) {
        this.setLogoB64(data.logoB64);
      }
      if (data.browserTitle) {
        this.setBrowserTitle(data.browserTitle);
      }

      serviceRequests.publisher('changeApplicationDate', {data: this.getDataApplication()});
    };

    /* istanbul ignore next */
    this.setBrowserTitle = function (browserTitle) {
      if (browserTitle) {
        document.title = browserTitle;
      }
    };

    /* istanbul ignore next */
    this.getLogoB64 = function () {
      return this.logoB64;
    };
    /* istanbul ignore next */
    this.setLogoB64 = function (logoB64) {
      if (logoB64) {
        this.logoB64 = logoB64;
        serviceRequests.publisher('changeLogo', {logoB64: logoB64});
      }
    };

    /* istanbul ignore next */
    this.getThemes = function () {
      return this.themes;
    };

    /* istanbul ignore next */
    this.getThemesAsArray = function () {
      var arr = [];

      for (var themeId in this.themes) {
        arr.push(this.themes[themeId])
      }

      return arr;
    };

    /* istanbul ignore next */
    this.getThemeById = function (themeId) {
      if ((typeof themeId === 'undefined') ||
        (typeof this.themes[themeId] === 'undefined')) {

        return this.themes['default']
      }

      return this.themes[themeId];
    };

    /* istanbul ignore next */
    this.getActiveTheme = function () {
      return this.activeTheme;
    };

    /* istanbul ignore next */
    this.setActiveTheme = function (themeId) {
      if (typeof themeId === 'undefined') return null;
      if (typeof this.themes[themeId] === 'undefined') return null;

      this.activeTheme = themeId;

      serviceRequests.publisher('changeActiveTheme', {themeId: themeId});

      return this.themes[this.activeTheme];
    };

    /* istanbul ignore next */
    this.getThemeClassById = function (themeId) {
      var themeId = themeId.split('');
      themeId[0] = themeId[0].toUpperCase();
      themeId = themeId.join('');

      return 'theme' + themeId;
    };

    /* istanbul ignore next */
    this.getActiveThemeClass = function () {
      return this.getThemeClassById(this.activeTheme);
    };
  }
}

ServiceThemes.$inject = ['serviceRequests'];
export default ServiceThemes;