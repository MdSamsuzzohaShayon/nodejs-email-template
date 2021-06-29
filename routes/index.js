const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ "msg": "success" });
});

module.exports = router;





/*
INSERT INTO nodejs_story
(
  layout, 
  content, 
  sibling
  ) 
VALUES 
( 
  '[{"rowID":1,"rowWithColumn":1},{"rowID":2,"rowWithColumn":2},{"rowID":3,"rowWithColumn":3},{"afterRow":1,"spaceRow":12}]', // LAYOUT

  '[{"rowNumber":1,"columnNumber":1,"blockElement":{"name":"imgBlockContent","blockHtml":"<a><img /></a>","imgHyperlink":"http://localhost:4000","imgNewTab":false,"imgUrl":"img-1-1-Liverpool-33-3.jpg"}},{"rowNumber":2,"columnNumber":2,"blockElement":{"name":"socialBlockContent","blockHtml":"<div>social</div>","socialFbHyperlink":"fb.com/md.shayon.148","socialTwitterHyperlink":"twitter.com/shayon_md","socialInstagramHyperlink":"https://www.instagram.com/md_shayon/"}},{"rowNumber":2,"columnNumber":1,"blockElement":{"name":"txtBlockContent","blockHtml":"<div id=~_txt-2-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>"}},{"rowNumber":3,"columnNumber":3,"blockElement":{"name":"txtBlockContent","blockHtml":"<div id=~_txt-3-3~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Hi there. What's up.&nbsp;<span style=~_color: rgb(33, 33, 33); font-family: arial, x-locale-body, sans-serif; letter-spacing: -0.0444444px;~_>The&nbsp;</span><strong style=~_color: rgb(33, 33, 33); font-family: arial, x-locale-body, sans-serif; letter-spacing: -0.0444444px;~_><code style=~_background-color: rgb(238, 238, 238); -webkit-box-decoration-break: clone; font-family: consolas, &quot;Liberation Mono&quot;, courier, monospace; padding: 0px 3px;~_>mouseover</code></strong><span style=~_color: rgb(33, 33, 33); font-family: arial, x-locale-body, sans-serif; letter-spacing: -0.0444444px;~_>&nbsp;event is fired at an&nbsp;</span><a href=~_https://developer.mozilla.org/en-US/docs/Web/API/Element~_ style=~_color: rgb(0, 69, 139); text-decoration-line: underline; text-decoration-skip-ink: auto; font-family: arial, x-locale-body, sans-serif; font-size: 16px; letter-spacing: -0.0444444px;~_><code style=~_background-color: rgb(238, 238, 238); -webkit-box-decoration-break: clone; font-family: consolas, &quot;Liberation Mono&quot;, courier, monospace; padding: 0px 3px; text-decoration-skip-ink: none;~_>Element</code></a><span style=~_color: rgb(33, 33, 33); font-family: arial, x-locale-body, sans-serif; letter-spacing: -0.0444444px;~_>&nbsp;when a pointing device (such as a mouse or trackpad) is used to move the cursor onto the element or one of its child elements.</span></div>"}},{"rowNumber":3,"columnNumber":2,"blockElement":{"name":"imgBlockContent","blockHtml":"<a><img /></a>","imgHyperlink":"http://localhost:4000","imgNewTab":false,"imgUrl":"img-3-2-H1-U3_ALE-33-3.jpg"}}]', 

  '[{"rowNum":3,"colNum":4,"btnBgColor":"rgb(70, 133, 192)","btnTextColor":"rgb(15, 48, 80)","btnHyperlink":"http://localhost:4000","btnOpenNewTab":false,"btnRound":false,"btnAlign":"inherit","btnContent":"Preview","btnFontFamily":"Helvetica","btnFontSize":12},{"rowNum":3,"colNum":2,"btnBgColor":"rgb(70, 133, 192)","btnTextColor":"rgb(15, 48, 80)","btnHyperlink":"http://localhost:4000","btnOpenNewTab":false,"btnRound":false,"btnAlign":null,"btnContent":"Preview","btnFontFamily":"Helvetica","btnFontSize":12}]' 
)
*/

