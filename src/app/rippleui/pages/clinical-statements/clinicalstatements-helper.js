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

// jQuery(document).ready(function(){
//   // Update Structure Data as user types
//   $('#update').click(function(e){
//     e.preventDefault();
//     var userinput = $('#clinicalNote');
//     // Store Structured
//     setStructured(userinput);
//   });
//   // Remove tags on click
//   // removeTags('#clinicalNote');
// });

/* istanbul ignore next  */
export function removeTags(userinput){
  // Bind remove events
  $(userinput).find('a.remove').each(function(){
    // Remove binding is already assigned
    $(this).unbind('click');

    // Re-bind
    $(this).click(function(){
      $(this).closest('span').remove();

      // Store Structured
      setStructured(userinput);
    });
  });

}

/* istanbul ignore next  */
export function setStructured(userinput, cb){
  // Parse the text box for all tags
  var tags = [];
  $(userinput).contents().each(function(){

    // Is it a tag?
    /* istanbul ignore if  */
    if( $(this).hasClass('tag') ){

      var editable = $(this).find('.editable');
      if( $(editable).length > 0 ){
        // Contains structured data
        var newTag = {
          id: $(this).attr('data-id'),
          value: editable.html()
        }
      } else {
        // Just a typed phrase
        var newTag = {
          id: $(this).attr('data-id')
        }
      }

      // Found in array
      var found = false;

      if( !found ){
        tags.push(newTag);
      }
      
    } else   {
      // It's text

      var newTag = {
        phrase: this.wholeText
      };

      tags.push(newTag);

    }

  });

  //Update the structured box for output
  $( '#' + $(userinput).attr('data-structured') ).val( JSON.stringify(tags) );

  $('#plain-data').val( strip($(userinput).html(), cb) );

}

// Credit: http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
export function pasteHtmlAtCaret(html, target) {
  var parentNode = document.getElementById("clinicalNote");
  var lastChildNode = parentNode.lastChild;
  var insertNodeBlock = document.getElementById("temp");
  // SG: Switch focus to target before inserting
  target.focus();

  var sel, range;
  /* istanbul ignore if  */
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();

    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html + ' ';
      var frag = document.createDocumentFragment(), node, lastNode;
      while ( (node = el.firstChild) ) {
        lastNode = frag.appendChild(node);
      }
      
      if (sel.focusOffset === 0 && lastChildNode) {
        range.selectNode(insertNodeBlock);
      }
      
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}

export function strip(html, cb){
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;  
  var resultText = tmp.textContent||tmp.innerText;

  if (typeof cb === 'function') {
    cb(tmp.innerHTML);
  }
  
  return tmp.textContent||tmp.innerText;

}