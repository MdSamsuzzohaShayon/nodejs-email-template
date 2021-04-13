
# Requirements
### First slide
 - The user can also enter the story’s Title and choose a background colour,
 - The ‘Replace Header Image’ button and ‘Header hyperlink’ textbox allows the user to add/edit and hyperlink the header image.
### second slide
 - The content type will now appear in the template so the user can add content.
 - when the user clicks outside any content/image box within the template, it will go to normal mode.





### PLANNING 
 - THIS WAY IS NOT WORKING SO NOW I AM GOING TO APPEND ALL BLOCK ELEMENT INTO DROP ZONE (ELEMENT ID)
 - BY USING CSS I WILL STYLE TOP OF THE COLUMN DIV BY USING POSITION ABSOLUTE 
 - OR WE CAN REMOVE BELOW DIV AND USE CREATE NEW DIV THAT WE WANT TO APPEND OUR BLOCK

 - OR WE CAN MADE THE EVENT LISTENER OR ACTION ABOVE WHERE WE MADE THE ELEMENT dropableColumnZone

 - OR WE CAN MADE COLUMN ELEMENT GLOBALLY(OUTSIDE OF ANY FUNCTION OR LOOP) SO WE CAN ACCESS ANYWARE 
 - OR WE CAN SEECT DIRECTLY FROM THE ELEMENT // document.addEventListener   == IT'S WORKED 😊



 - BY POSITION FIND OUT THE COLUMN INDEX NUMBER 
 - FIND OUT IN WHICH COLUMN AND WHICH ROW OUR ELEMENT IS LOCATED   == IT'S WORKED 😊
 - SET ONE MORE ATTRIBUTE IN COLUMN BLOCK THAT CAN DIFFERENTTHIATE EACH ELEMENT   == IT'S WORKED 😊




 - AT FIRST GET ROW ID AND COL ID*
 
 
 - MAKE AN ON CHANGE EVENT ATTRIBUTE IN THE BLOCK ELEMENT WE HAVE CREATED TO CHANGE ANYTHING   == IT'S WORKED 😊
 - EVERYTIME WHEN CHANGE THE ROW LIST AND ROW POSITION ELELMENT WE CAN CREATE ELEMENT AND UPDATE ELEMENT

 - MAKE ALL THE ELEMENT VARTICALLY AND HORIZONTALLY RESPONSIVE






 - INSIDE PROPERTY CHANGE OR CLICK EVENT ->GET ROW AND COL NUMBER -> ACCORDING TO ROW AND COL NUMBER UPDATE ELEMENT POSITION ARRAY WITH RESENTLY INPUTED VALUE   == IT'S WORKED😊
 - SAVE HTML ELEMENT WITH RIGHT COLUMN AND RIGHT ROW    == IT'S WORKED😊
 - FROM CLICK OR CHANGE EVENT OF PROPERTY CHANGE THE ELEMENT ATTRIBUTE OF TEMPLATE 
 - DROP THE BUTTON INSIDE ANOTHER ELEMENT 






 - PROBLEM WITH CHANGING TEXT CONTENT OF TEXT BLOCK   == IT'S WORKED😊
 - SOME PROBLEM WITH HYPERLINK AND NEW TEXT OF TEXT EDITOR  == IT'S WORKED😊
 - WORK TO SHOW ALL THE CHANGED ELEMENT INSIDE TEMPLATE  == IT'S WORKED😊
 - WORK WITH BUTTON PROPERTIES  == IT'S WORKED😊
 - WORK WITH SPACING == IT'S WORKED😊
 - WORK WITH ROW UP AND DOWN



 - WORK WITH IMAGE 




### STYLING INSTRUCTIONS 
 - MAKE IT RESPONSIVE
 - DEFAULT BUTTON ALIGNMENT
 - BUTTON ALIGNMENT IS NOT WORKING PROPERLY IS JS
 - MAKE A BORDER FOR ALL ELEMENT ON HOVER
 - DO SOME STYLING FOR TEXT EDITOR FONT WHICH HAS 1 TO 7 INDEX (FIND THE 1 MEANS HOW MUCH PX AND SET THE VALUE)





 ### Problem & bugs
 - somehow column is still dropping into the column ☑️
 - social  icon props hide and show ☑️
 - space show and hide problem  ☑️
 - Image content ☑️
 - Bugs TypeError: Cannot read property 'classList' of undefined at HTMLDocument.<anonymous> (main.js:597)
 - When dragging row div with an block element and droping it, it's creating a duplicate of text content block ☑️
 - When deleting a row item from middle the attribute is is not setting properly ☑️
 - Some problem when 3 col row move up from col 3 to cal 2 the is row is not working properly ☑
 - When droping space creating a extra block element col for database
 - Html is not saving in json field so We need to save in another row ☑
 - MySql problem fixing - run those query
 - When we check or uncheck any property it does't change
 
 - In preview element is not appending into the right column order 
 - Sibling button is not storing as json (storing as object) ☑
 - Problem with button opening in new tab
 - Problem with button content, in 8 number template both button content are showing same  in row 3- this happen because we need to clean input value
 - Remove image html content from drop event and position element

    ```
    show variables like 'max_allowed_packet'
    set global max_allowed_packet=33554432
    ```

 - https://www.youtube.com/watch?v=zDaaG8hFYlk



### Referances

#### Text Editors
 - __https://w3c.github.io/input-events/__
 - __https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API__
 - __https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard__
 - __*[Depricated]* https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#browser_compatibility__

#### Upload files
 - __https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api__
 - __https://flaviocopes.com/how-to-upload-files-fetch/__
 - __https://stackoverflow.com/questions/6667291/javascript-error-cannot-convert-object-to-primitive-value__

#### Node.js MySql JSON
 - __https://www.opentechguides.com/how-to/article/nodejs/124/express-mysql-json.html__
 - __https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp__
 - __https://www.digitalocean.com/community/tutorials/working-with-json-in-mysql__
 - __https://dev.mysql.com/doc/refman/8.0/en/packet-too-large.html__
 - __https://dev.mysql.com/doc/refman/8.0/en/blob.html__

#### JS, Objects, Array, JSON
 - __https://stackoverflow.com/questions/38617467/sorting-an-object-ascending-order-in-javascript__
 - __https://www.codegrepper.com/code-examples/javascript/arrange+an+array+of+object+in+ascending+order__
 - __https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort__

#### Styling elements / Checkbox
 - __https://stackoverflow.com/questions/12251750/can-media-queries-resize-based-on-a-div-element-instead-of-the-screen__
 - __https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver__
 - __https://stackoverflow.com/questions/56549700/can-sass-recognise-a-size-and-apply-a-condition__
 - __https://stackoverflow.com/questions/6492683/how-to-detect-divs-dimension-changed__
 - __https://github.com/w3c/csswg-drafts/issues/3852__


