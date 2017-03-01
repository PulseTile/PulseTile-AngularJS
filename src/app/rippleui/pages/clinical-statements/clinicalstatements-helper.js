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
let _ = require('underscore');

/**
 * Take a supplied clinical phrase which could contain any of the following
 * delimiters:
 *   ~SUBJECT~
 *   |VALUE|
 *   {UNIT}
 * and returns the phrase in a processed array form, where the fixed strings
 * are string values and the variables are defined as an object representation
 */
export function parsePhrase(phrase) {
  let variables = { 
    subject: /\~[^|{]*?\~/,
    value:   /\|[^~{]*?\|/,
    unit:    /\{[^~|]*?\}/
  };

  let parts = [phrase];

  _.each(variables, (regex, type) => {
    parts = _.flatten(_.map(parts, (p) => {
      let match = regex.exec(p);
      if(match) {
        let before = p.slice(0,match.index);
        let variable = { type, value: match[0].slice(1,-1) };
        let after = p.substring(match.index + match[0].length);
        return _.reject([before, variable, after], _.isEmpty);
      }
      else {
        return p
      }
    }));
  })
  return parts;
}

/**
 * Takes the UI phrases array (custom statements are strings and templated
 * values are parsed objects) and converts in to a format to be sent ready
 * to be sent to the api for persistence
 */
export function transformPhrases(phrases) {
  return _.map(phrases, (p) =>{
    if(_.isString(p)) {
      return {id: null, subject: p}
    }
    else {
      let varHash = _
        .chain(p.parsed)
        .reject(_.isString)
        .map((v)=>[v.type, v.value])
        .object()
        .value();
      return Object.assign({id: p.id}, varHash);
    }
  });
}

/**
 * Processes a statement object in to a UI displayable value. The function
 * handles custom statements (those which are not created from a templated
 * phrase) and those which are created from a templated phrase.
 */
export function toText(statement) {
  // Check if this is a purely custom phrase
  if(!statement.id) {
    return statement.subject;
  }

  let parsed = parsePhrase(statement.phrase);
  return _.map(parsed,(p)=>{
    return (_.isObject(p)) ? statement[p.type] : p;
  }).join('');
}