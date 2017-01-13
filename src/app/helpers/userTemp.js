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
export default function userTemp() {
  let user = {};
  
  return user = {
    "sub": "28AD8576-1948-4C84-8B5E-55FB7EE027CE",
    "given_name": "Bob",
    "family_name": "Smith",
    "email": "bob.smith@gmail.com",
    "scope": {
      "homeView": "chart",
      "autoAdvancedSearch": false,
      "setting2": true,
      "setting3": true
    },
    "tenant_id": "Ripple",
    "tenant_name": "Ripple Demonstrator",
    "role": "idcr"
  };
};