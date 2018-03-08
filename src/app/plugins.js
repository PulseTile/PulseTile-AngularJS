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

import corePlugins from './pulsetileui/pages/_plugins_/Core-Plugins/index';
// import silverPlugins from './pulsetileui/pages/_plugins_/Silver-Plugins/index';
// import bronzePlugins from './pulsetileui/pages/_plugins_/Bronze-Plugins/index';

function transferPlugins (from, to) {
  from.forEach((item) => {
    to.push(item);
  });
}

const plugins = [];

transferPlugins(corePlugins, plugins);
// transferPlugins(silverPlugins, plugins);
// transferPlugins(bronzePlugins, plugins);

export default plugins;