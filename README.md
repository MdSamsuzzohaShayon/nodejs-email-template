
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
 - DEFAULT BUTTON ALIGNMENT ☑️
 - BUTTON ALIGNMENT IS NOT WORKING PROPERLY IS JS ☑️
 - MAKE A BORDER FOR ALL ELEMENT ON HOVER  ☑️
 - DO SOME STYLING FOR TEXT EDITOR FONT WHICH HAS 1 TO 7 INDEX (FIND THE 1 MEANS HOW MUCH PX AND SET THE VALUE)
 - BUTTON POSITION SET ☑️
 - RESIZE ROW ACCORDING TO SOCIAL ICON  ☑️
 - REMOVE BORDER COLOR FROM PREVIEW
 - PREVIEW IS NOT STYLING PROPERLY
 - 





 ### Problem & bugs
 - somehow column is still dropping into the column ☑️
 - social  icon props hide and show ☑️
 - space show and hide problem  ☑️
 - Image content ☑️
 - Bugs TypeError: Cannot read property 'classList' of undefined at HTMLDocument.<anonymous> (main.js:597) ☑️
 - When dragging row div with an block element and droping it, it's creating a duplicate of text content block ☑️
 - When deleting a row item from middle the attribute is is not setting properly ☑️
 - Some problem when 3 col row move up from col 3 to cal 2 the is row is not working properly ☑️
 - When droping space creating a extra block element col for database
 - Html is not saving in json field so We need to save in another row  ☑️
 - MySql problem fixing - run those query
 - When we check or uncheck any property it does't change
 
 - In preview element is not appending into the right column order ☑️
 - Sibling button is not storing as json (storing as object)  ☑️
 - Problem with button opening in new tab - (text content has more problem)
 - Problem with button content, in 8 number template both button content are showing same  in row 3- this happen because we need to clean input value
 - Remove image html content from drop event and position element  ☑️
 - Multiple content adding in one block- Prevent to add multiple content in same block ☑️
 - Error with selecting text content by click - THIS IS EDITABLE CONTENT DEFAULT BEHAVIOUR
 - When click any element it's setting the variable for selectedrow and col but for moving up and down second time selected element value won't be changed - we can display block from here
 - all button element property is same in the array we need to change  ☑️
 - Change button tag to a tags
 - Dropping button is not working
 - Text editor (insert link)
 - Image validation
 - Some problem with preview social (not making more than 3 row)
 - Problem with social preview
 - FIle validation (2mb)

    ```
    show variables like 'max_allowed_packet'
    set global max_allowed_packet=33554432
    ```

 - https://www.youtube.com/watch?v=zDaaG8hFYlk
 - open in link is not working (button property is not setting properly)
 - Image hyper link is not setting properly 
 
 *5email-template.js:1073 TypeError: Cannot read property 'blockElement' of undefined
    at HTMLDocument.<anonymous> (email-template.js:1004)
email-template.js:580 outside of drop zone
email-template.js:681 [Violation] 'drop' handler took 1895ms
2email-template.js:580 outside of drop zone
email-template.js:681 [Violation] 'drop' handler took 2007ms
email-template.js:1073 TypeError: Cannot read property 'className' of null
    at HTMLDocument.<anonymous> (email-template.js:1051)
email-template.js:1073 TypeError: Cannot read property 'btnFontSize' of undefined
    at HTMLDocument.<anonymous> (email-template.js:1027)*
 - Update will be done if we set multer in our route
 - FOR UPLOADING MULTIPLE FILES IN AWS -> STORE ALL FILES IN A ARRAY AND LOOP THOUGH IT



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

#### Array of ojects
 - __https://stackoverflow.com/questions/3396088/how-do-i-remove-an-object-from-an-array-with-javascript__
 - __https://stackoverflow.com/questions/30640771/i-want-to-replace-all-values-with-another-array-values-both-arrays-are-in-same__
 - __https://stackoverflow.com/questions/9425009/remove-multiple-elements-from-array-in-javascript-jquery__
 - __https://stackoverflow.com/questions/48269545/javascript-remove-multiple-values-of-array-of-objects/48269610__
 - __https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer__
 - __https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find__

#### HTML CSS
 - __https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox__

#### JS Async, Await and promise
 - __https://stackabuse.com/promises-in-node-js__
 - __https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise__
 - __https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all__
 - __https://stackoverflow.com/questions/18983138/callback-after-all-asynchronous-foreach-callbacks-are-completed__

#### AWS S3
 - __https://www.zeolearn.com/magazine/uploading-files-to-aws-s3-using-nodejs__
 - __https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property__
 - __https://medium.com/@salonimalhotra1ind/uploading-a-file-multiple-to-amazon-web-services-aws-s3-bucket-with-node-js-in-express-8e268ab12422__
 - __https://medium.com/codebase/using-aws-s3-buckets-in-a-nodejs-app-74da2fc547a6__
 - __https://stackoverflow.com/questions/48296569/how-to-retrieve-image-from-s3-with-nodejs/48297282__
 - __https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html__
 - __https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property__
 - __https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/__
 - __https://stackoverflow.com/questions/28018855/upload-a-file-to-amazon-s3-with-nodejs__
 - __https://levelup.gitconnected.com/file-upload-express-mongodb-multer-s3-7fad4dfb3789__
 - __https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-s3-s3_listobjects.js.html__

#### Show images
 - __https://stackoverflow.com/questions/51021920/send-all-image-files-from-node-js-to-frontend__
 - __https://dev.to/dnature/convert-a-base64-data-into-an-image-in-node-js-3f88__
 - __https://docs.aws.amazon.com/cli/latest/reference/s3api/get-object.html__

#### Digital Ocean
 - __https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04__
 - __https://medium.com/@haxzie/deploying-node-js-application-to-digitalocean-setting-up-the-server-99e1d65fa291__
 - __https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04__
 - __https://dev.to/ileriayo/connect-nodejs-app-with-mysql-database-hosted-on-a-digital-ocean-droplet-server-3bfb__

 ### Docker
