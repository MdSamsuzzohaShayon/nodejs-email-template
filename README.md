# Whatsapp number

# +8801785208590

#### sir please dm me on whats app 









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
 - WORK WITH SPACING


 - WORK WITH IMAGE 




### STYLING INSTRUCTIONS 
 - MAKE IT RESPONSIVE
 - DEFAULT BUTTON ALIGNMENT
 - BUTTON ALIGNMENT IS NOT WORKING PROPERLY IS JS





 ### Problem & bugs
 - somehow column is still dropping into the column ☑️
 - social  icon props hide and show ☑️
 - space show and hide problem  ☑️
 - Image content ☑️
 - Bugs TypeError: Cannot read property 'classList' of undefined at HTMLDocument.<anonymous> (main.js:597)



### Referances
 - https://w3c.github.io/input-events/
 - https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
 - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
 - *[Depricated]* https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#browser_compatibility