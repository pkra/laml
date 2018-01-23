/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

  // Source: https://stackoverflow.com/a/27404602/1339651
module.exports.renameTag = function(document, nodeOrSelector, newTagName, classOrTrue) {
    let node = nodeOrSelector;
    if (typeof node === 'string') node = document.querySelector(nodeOrSelector);
    if (!node) return new Error('No node found');
    let className = '';
    if (classOrTrue && classOrTrue === true) className = node.tagName.toLowerCase();
    if (typeof classOrTrue === 'string') className = classOrTrue;

    const newNode = document.createElement(newTagName);
    while (node.firstChild) newNode.appendChild(node.firstChild);
    for (let attribute of node.attributes) {
      newNode.setAttribute(attribute.name, attribute.value);
    }
    newNode.setAttribute('data-originalTagName', node.tagName.toLowerCase());
    if (className !== '') newNode.classList.add(className);
    node.parentNode.replaceChild(newNode, node);
    return newNode;
  };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(24);
var decode = __webpack_require__(25);

var C_BACKSLASH = 92;

var decodeHTML = __webpack_require__(3).decodeHTML;

var ENTITY = "&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});";

var TAGNAME = '[A-Za-z][A-Za-z0-9-]*';
var ATTRIBUTENAME = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var UNQUOTEDVALUE = "[^\"'=<>`\\x00-\\x20]+";
var SINGLEQUOTEDVALUE = "'[^']*'";
var DOUBLEQUOTEDVALUE = '"[^"]*"';
var ATTRIBUTEVALUE = "(?:" + UNQUOTEDVALUE + "|" + SINGLEQUOTEDVALUE + "|" + DOUBLEQUOTEDVALUE + ")";
var ATTRIBUTEVALUESPEC = "(?:" + "\\s*=" + "\\s*" + ATTRIBUTEVALUE + ")";
var ATTRIBUTE = "(?:" + "\\s+" + ATTRIBUTENAME + ATTRIBUTEVALUESPEC + "?)";
var OPENTAG = "<" + TAGNAME + ATTRIBUTE + "*" + "\\s*/?>";
var CLOSETAG = "</" + TAGNAME + "\\s*[>]";
var HTMLCOMMENT = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
var PROCESSINGINSTRUCTION = "[<][?].*?[?][>]";
var DECLARATION = "<![A-Z]+" + "\\s+[^>]*>";
var CDATA = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
var HTMLTAG = "(?:" + OPENTAG + "|" + CLOSETAG + "|" + HTMLCOMMENT + "|" +
        PROCESSINGINSTRUCTION + "|" + DECLARATION + "|" + CDATA + ")";
var reHtmlTag = new RegExp('^' + HTMLTAG, 'i');

var reBackslashOrAmp = /[\\&]/;

var ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';

var reEntityOrEscapedChar = new RegExp('\\\\' + ESCAPABLE + '|' + ENTITY, 'gi');

var XMLSPECIAL = '[&<>"]';

var reXmlSpecial = new RegExp(XMLSPECIAL, 'g');

var reXmlSpecialOrEntity = new RegExp(ENTITY + '|' + XMLSPECIAL, 'gi');

var unescapeChar = function(s) {
    if (s.charCodeAt(0) === C_BACKSLASH) {
        return s.charAt(1);
    } else {
        return decodeHTML(s);
    }
};

// Replace entities and backslash escapes with literal characters.
var unescapeString = function(s) {
    if (reBackslashOrAmp.test(s)) {
        return s.replace(reEntityOrEscapedChar, unescapeChar);
    } else {
        return s;
    }
};

var normalizeURI = function(uri) {
    try {
        return encode(decode(uri));
    }
    catch(err) {
        return uri;
    }
};

var replaceUnsafeChar = function(s) {
    switch (s) {
    case '&':
        return '&amp;';
    case '<':
        return '&lt;';
    case '>':
        return '&gt;';
    case '"':
        return '&quot;';
    default:
        return s;
    }
};

var escapeXml = function(s, preserve_entities) {
    if (reXmlSpecial.test(s)) {
        if (preserve_entities) {
            return s.replace(reXmlSpecialOrEntity, replaceUnsafeChar);
        } else {
            return s.replace(reXmlSpecial, replaceUnsafeChar);
        }
    } else {
        return s;
    }
};

module.exports = { unescapeString: unescapeString,
                   normalizeURI: normalizeURI,
                   escapeXml: escapeXml,
                   reHtmlTag: reHtmlTag,
                   OPENTAG: OPENTAG,
                   CLOSETAG: CLOSETAG,
                   ENTITY: ENTITY,
                   ESCAPABLE: ESCAPABLE
                 };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isContainer(node) {
    switch (node._type) {
    case 'document':
    case 'block_quote':
    case 'list':
    case 'item':
    case 'paragraph':
    case 'heading':
    case 'emph':
    case 'strong':
    case 'link':
    case 'image':
    case 'custom_inline':
    case 'custom_block':
        return true;
    default:
        return false;
    }
}

var resumeAt = function(node, entering) {
    this.current = node;
    this.entering = (entering === true);
};

var next = function(){
    var cur = this.current;
    var entering = this.entering;

    if (cur === null) {
        return null;
    }

    var container = isContainer(cur);

    if (entering && container) {
        if (cur._firstChild) {
            this.current = cur._firstChild;
            this.entering = true;
        } else {
            // stay on node but exit
            this.entering = false;
        }

    } else if (cur === this.root) {
        this.current = null;

    } else if (cur._next === null) {
        this.current = cur._parent;
        this.entering = false;

    } else {
        this.current = cur._next;
        this.entering = true;
    }

    return {entering: entering, node: cur};
};

var NodeWalker = function(root) {
    return { current: root,
             root: root,
             entering: true,
             next: next,
             resumeAt: resumeAt };
};

var Node = function(nodeType, sourcepos) {
    this._type = nodeType;
    this._parent = null;
    this._firstChild = null;
    this._lastChild = null;
    this._prev = null;
    this._next = null;
    this._sourcepos = sourcepos;
    this._lastLineBlank = false;
    this._open = true;
    this._string_content = null;
    this._literal = null;
    this._listData = {};
    this._info = null;
    this._destination = null;
    this._title = null;
    this._isFenced = false;
    this._fenceChar = null;
    this._fenceLength = 0;
    this._fenceOffset = null;
    this._level = null;
    this._onEnter = null;
    this._onExit = null;
};

var proto = Node.prototype;

Object.defineProperty(proto, 'isContainer', {
    get: function () { return isContainer(this); }
});

Object.defineProperty(proto, 'type', {
    get: function() { return this._type; }
});

Object.defineProperty(proto, 'firstChild', {
    get: function() { return this._firstChild; }
});

Object.defineProperty(proto, 'lastChild', {
    get: function() { return this._lastChild; }
});

Object.defineProperty(proto, 'next', {
    get: function() { return this._next; }
});

Object.defineProperty(proto, 'prev', {
    get: function() { return this._prev; }
});

Object.defineProperty(proto, 'parent', {
    get: function() { return this._parent; }
});

Object.defineProperty(proto, 'sourcepos', {
    get: function() { return this._sourcepos; }
});

Object.defineProperty(proto, 'literal', {
    get: function() { return this._literal; },
    set: function(s) { this._literal = s; }
});

Object.defineProperty(proto, 'destination', {
    get: function() { return this._destination; },
    set: function(s) { this._destination = s; }
});

Object.defineProperty(proto, 'title', {
    get: function() { return this._title; },
    set: function(s) { this._title = s; }
});

Object.defineProperty(proto, 'info', {
    get: function() { return this._info; },
    set: function(s) { this._info = s; }
});

Object.defineProperty(proto, 'level', {
    get: function() { return this._level; },
    set: function(s) { this._level = s; }
});

Object.defineProperty(proto, 'listType', {
    get: function() { return this._listData.type; },
    set: function(t) { this._listData.type = t; }
});

Object.defineProperty(proto, 'listTight', {
    get: function() { return this._listData.tight; },
    set: function(t) { this._listData.tight = t; }
});

Object.defineProperty(proto, 'listStart', {
    get: function() { return this._listData.start; },
    set: function(n) { this._listData.start = n; }
});

Object.defineProperty(proto, 'listDelimiter', {
    get: function() { return this._listData.delimiter; },
    set: function(delim) { this._listData.delimiter = delim; }
});

Object.defineProperty(proto, 'onEnter', {
    get: function() { return this._onEnter; },
    set: function(s) { this._onEnter = s; }
});

Object.defineProperty(proto, 'onExit', {
    get: function() { return this._onExit; },
    set: function(s) { this._onExit = s; }
});

Node.prototype.appendChild = function(child) {
    child.unlink();
    child._parent = this;
    if (this._lastChild) {
        this._lastChild._next = child;
        child._prev = this._lastChild;
        this._lastChild = child;
    } else {
        this._firstChild = child;
        this._lastChild = child;
    }
};

Node.prototype.prependChild = function(child) {
    child.unlink();
    child._parent = this;
    if (this._firstChild) {
        this._firstChild._prev = child;
        child._next = this._firstChild;
        this._firstChild = child;
    } else {
        this._firstChild = child;
        this._lastChild = child;
    }
};

Node.prototype.unlink = function() {
    if (this._prev) {
        this._prev._next = this._next;
    } else if (this._parent) {
        this._parent._firstChild = this._next;
    }
    if (this._next) {
        this._next._prev = this._prev;
    } else if (this._parent) {
        this._parent._lastChild = this._prev;
    }
    this._parent = null;
    this._next = null;
    this._prev = null;
};

Node.prototype.insertAfter = function(sibling) {
    sibling.unlink();
    sibling._next = this._next;
    if (sibling._next) {
        sibling._next._prev = sibling;
    }
    sibling._prev = this;
    this._next = sibling;
    sibling._parent = this._parent;
    if (!sibling._next) {
        sibling._parent._lastChild = sibling;
    }
};

Node.prototype.insertBefore = function(sibling) {
    sibling.unlink();
    sibling._prev = this._prev;
    if (sibling._prev) {
        sibling._prev._next = sibling;
    }
    sibling._next = this;
    this._prev = sibling;
    sibling._parent = this._parent;
    if (!sibling._prev) {
        sibling._parent._firstChild = sibling;
    }
};

Node.prototype.walker = function() {
    var walker = new NodeWalker(this);
    return walker;
};

module.exports = Node;


/* Example of use of walker:

 var walker = w.walker();
 var event;

 while (event = walker.next()) {
 console.log(event.entering, event.node.type);
 }

 */


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var encode = __webpack_require__(26),
    decode = __webpack_require__(27);

exports.decode = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
};

exports.decodeStrict = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
};

exports.encode = function(data, level){
	return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
};

exports.encodeXML = encode.XML;

exports.encodeHTML4 =
exports.encodeHTML5 =
exports.encodeHTML  = encode.HTML;

exports.decodeXML =
exports.decodeXMLStrict = decode.XML;

exports.decodeHTML4 =
exports.decodeHTML5 =
exports.decodeHTML = decode.HTML;

exports.decodeHTML4Strict =
exports.decodeHTML5Strict =
exports.decodeHTMLStrict = decode.HTMLStrict;

exports.escape = encode.escape;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\"","QUOT":"\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Renderer() {}

/**
 *  Walks the AST and calls member methods for each Node type.
 *
 *  @param ast {Node} The root of the abstract syntax tree.
 */
function render(ast) {
  var walker = ast.walker()
    , event
    , type;

  this.buffer = '';
  this.lastOut = '\n';

  while((event = walker.next())) {
    type = event.node.type;
    if (this[type]) {
      this[type](event.node, event.entering);
    }
  }
  return this.buffer;
}

/**
 *  Concatenate a literal string to the buffer.
 *
 *  @param str {String} The string to concatenate.
 */
function lit(str) {
  this.buffer += str;
  this.lastOut = str;
}

/**
 *  Output a newline to the buffer.
 */
function cr() {
  if (this.lastOut !== '\n') {
    this.lit('\n');
  }
}

/**
 *  Concatenate a string to the buffer possibly escaping the content.
 *
 *  Concrete renderer implementations should override this method.
 *
 *  @param str {String} The string to concatenate.
 */
function out(str) {
  this.lit(str);
}

/**
 *  Escape a string for the target renderer.
 *
 *  Abstract function that should be implemented by concrete 
 *  renderer implementations.
 *
 *  @param str {String} The string to escape.
 */
function esc(str) {
  return str;
}

Renderer.prototype.render = render;
Renderer.prototype.out = out;
Renderer.prototype.lit = lit;
Renderer.prototype.cr  = cr;
Renderer.prototype.esc  = esc;

module.exports = Renderer;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {const laml = __webpack_require__(9);
const {tex2jax} = __webpack_require__(21);
const commonmark = __webpack_require__(22);

const worker = function(window) {
  const document = window.document;
  window.tex2jax = tex2jax;
  window.tex2jax.config.doc = document;
  window.tex2jax.config.inlineMath.push(['$', '$']);
  window.tex2jax.config.processEscapes = true;
  window.tex2jax.PreProcess();

  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsed = reader.parse(document.body.innerHTML);
  document.body.innerHTML = writer.render(parsed);

  laml(document);
};

if (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'){
    module.exports.worker = worker;
}
else {
  worker(window);
  window.MathJax = {
    'fast-preview': {
      disabled: true
    }
  };
  const mj = document.createElement('script');
  mj.src =
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_CHTML-full';
  document.head.appendChild(mj);

}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);
const articleHead = __webpack_require__(10);
const preamble = __webpack_require__(11);
const abstract = __webpack_require__(12);
const statements = __webpack_require__(13);
const figures = __webpack_require__(14);
const names = __webpack_require__(15);
const blames = __webpack_require__(16);
const refs = __webpack_require__(17);
const cites = __webpack_require__(18);
const notes = __webpack_require__(19);
const bibliography = __webpack_require__(20)

module.exports = function(document) {
  articleHead(document);
  preamble(document);
  abstract(document);
  statements(document);
  figures(document, false);
  names(document);
  // TODO should depend on cm.css?
  blames(document);
  refs(document);
  cites(document);
  notes(document);
  bibliography(document);
};



/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(document) {
  // handle metadata
  const articleMeta = JSON.parse(document.getElementById('metadata').text);
  const articleInfo = document.createElement('section');
  articleInfo.classList.add('articleInfo');
  document.body.insertBefore(articleInfo, document.body.firstChild);
  const articleTitle = articleMeta.title;
  if (articleTitle) {
    const title = document.querySelector('title');
    if (title) title.innerHTML = articleTitle;
    else {
      newtitle = document.createElement('title');
      newtitle.innerHTML = articleTitle;
      document.head.appendChild(newtitle);
    }
    const heading = document.createElement('h1');
    heading.innerHTML = articleTitle;
    articleInfo.appendChild(heading);
  }
  const articleAuthors = articleMeta.authors || [];
  for (let author of articleAuthors) {
    const name = author.name;
    const address = author.address;
    const authorP = document.createElement('p');
    authorP.classList.add('author');
    authorP.innerHTML = name + ', ' + address + '.';
    articleInfo.appendChild(authorP);
  }
  const keywords = articleMeta.keywords;
  const kw = document.createElement('p');
  kw.classList.add('keywords');
  kw.innerHTML = 'Keywords: ' + keywords.join(', ') + '.';
  articleInfo.appendChild(kw);

  const licensing = document.createElement('p');
  licensing.classList.add('license');

  licensing.innerHTML =
    'Derived from <a href="' +
    articleMeta.source +
    '">' +
    articleMeta.source +
    '</a>, ' +
    articleMeta.license +
    ' and licensed as such.';
  articleInfo.appendChild(licensing);

};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);
module.exports = function(document){
  // preamble
  renameTag(document,'preamble', 'div', 'hidden');
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);
module.exports = function(document){
  // abstract
  renameTag(document, 'abstract', 'section', true);
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);

module.exports = function(document){
  // convert statements to sections
  const statements = document.querySelectorAll(
    'proof, theorem, proposition, lemma, corollary'
  );
  let statement_counter = 0;
  for (let statement of statements) {
    const renamedNode = renameTag(document, statement, 'section', true);
    const tagname = statement.tagName.toLowerCase();
    renamedNode.classList.add(tagname);
    const name = renamedNode.querySelector('name');
    // TODO maybe name handling is more like a helper that should be required and applied here?
    if (name) continue;
    statement_counter++;
    // TODO look up correct heading level
    const heading = document.createElement('h2');
    heading.classList.add('name');
    heading.id = tagname.toLowerCase() + '-' + statement_counter;
    heading.innerHTML =
      tagname[0].toUpperCase() + tagname.substring(1) + ' ' + statement_counter;
    renamedNode.insertBefore(heading, renamedNode.firstChild);
  }

}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(document, belowOrAbove) {
  // handle figures
  const figures = document.querySelectorAll('figure');
  for (let [index, figure] of figures.entries()) {
    figure.classList.add('figure');
    const name = figure.querySelector('name');
    if (name) continue;
    // TODO look up correct heading level
    const heading = document.createElement('h2');
    heading.classList.add('name');
    heading.innerHTML = 'Figure ' + (index + 1);
    if (belowOrAbove) figure.insertBefore(heading, figure.firstChild);
    else figure.insertBefore(heading, figure.querySelector('img').nextSibling);
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);

module.exports = function(document) {
  // convert names to headings
  const names = document.querySelectorAll('name');
  for (let name of names) {
    // TODO look up correct heading level
    const renamedNode = renameTag(document, name, 'h2', true);
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);

module.exports = function(document) {
  // convert blames to headings
  const blames = document.querySelectorAll('blame');
  for (let blame of blames) {
    // TODO look up correct heading level
    const renamedNode = renameTag(document, blame, 'h2', true);
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);

module.exports = function(document) {
  // convert ref to links
  const refs = document.querySelectorAll('ref');
  for (let ref of refs) {
    const renamedNode = renameTag(document, ref, 'a');
    const targetId = renamedNode.getAttribute('target');
    const target = document.getElementById(targetId);
    renamedNode.classList.add('ref');
    renamedNode.setAttribute('href', '#' + targetId);
    renamedNode.removeAttribute('target');
    if ( ! /^\s*$/.test(renamedNode.innerHTML) ) {
      // the node has some nontrivial contents
      continue;
    }
    // the node is whitespace. replace it with our defaults.
    targetHeading = renamedNode.innerHTML = target
      .querySelector('h1, h2, h3, h4, h5, h6')
      .cloneNode(true);
    // strip blame
    if (targetHeading.querySelector('.blame'))
      targetHeading.removeChild(targetHeading.querySelector('.blame'));
    renamedNode.innerHTML = targetHeading.innerHTML;
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(document) {
  // populate bibliographic citations
  const bibitems = document.querySelectorAll('bibliography a');
  for (let [index, bibitem] of bibitems.entries()) {
    const counter = '[' + (index + 1) + ']';
    // TODO create DL in buildBib instead
    const counterNode = document.createTextNode(counter + ' ');
    bibitem.parentNode.insertBefore(counterNode, bibitem);
    const cites = document.querySelectorAll(
      'cite[target="' + bibitem.id + '"]'
    );
    for (let cite of cites) {
      if ( /^\s*$/.test(cite.innerHTML) ) {
        // the node is whitespace, replace it with our defaults
        cite.innerHTML = counter;
      } else {
        // leave it alone
      }
      const anchor = document.createElement('a');
      anchor.setAttribute('href', '#' + bibitem.id);
      cite.parentNode.replaceChild(anchor, cite);
      anchor.appendChild(cite);
    }
  }
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);

module.exports = function(document) {
  // handle (foot)notes
  const notes = document.querySelectorAll('note');
  for (let [index, note] of notes.entries()) {
    const newNote = renameTag(document, note, 'span');
    newNote.classList.add('footnote');
    newNote.id = 'fn-' + index;
    const fnlink = document.createElement('a');
    fnlink.setAttribute('href', '#' + newNote.id);
    fnlink.id = 'fnlink' + index;
    fnlink.innerHTML = '<sup>' + (index + 1) + '</sup>';
    newNote.parentNode.insertBefore(fnlink, newNote);
    const backlink = document.createElement('a');
    backlink.setAttribute('href', '#' + fnlink.id);
    backlink.innerHTML = '<sup>🔙</sup>';
    backlink.classList.add('backlink');
    newNote.appendChild(backlink);
    // TODO this is not actually disabling clicks
    fnlink.addEventListener(
      'click',
      function(event) {
        event.preventDefault();
      },
      false
    );
    backlink.addEventListener(
      'click',
      function(event) {
        event.preventDefault();
      },
      false
    );
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(0);

module.exports = function(document) {
  const bib = renameTag(document, 'bibliography', 'section', true);
  const heading = document.createElement('h2');
  heading.innerHTML = 'Bibliography';
  bib.insertBefore(heading, bib.firstChild);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/************************************************************************
 *  Copyright (c) 2016 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var tex2jax = function () {};

tex2jax.prototype.config = {
    doc: {},
    inlineMath: [ // The start/stop pairs for in-line math
        //    ['$','$'],               //  (comment out any you don't want, or add your own, but
        ['\\(', '\\)'] //  be sure that you don't have an extra comma at the end)
    ],

    displayMath: [ // The start/stop pairs for display math
        ['$$', '$$'], //  (comment out any you don't want, or add your own, but
        ['\\[', '\\]'] //  be sure that you don't have an extra comma at the end)
    ],

    balanceBraces: true, // determines whether tex2jax requires braces to be
    // balanced within math delimiters (allows for nested
    // dollar signs).  Set to false to get pre-v2.0 compatibility.

    skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "annotation", "annotation-xml"],
    // The names of the tags whose contents will not be
    // scanned for math delimiters

    ignoreClass: "tex2jax_ignore", // the class name of elements whose contents should
    // NOT be processed by tex2jax.  Note that this
    // is a regular expression, so be sure to quote any
    // regexp special characters

    processClass: "tex2jax_process", // the class name of elements whose contents SHOULD
    // be processed when they appear inside ones that
    // are ignored.  Note that this is a regular expression,
    // so be sure to quote any regexp special characters

    processEscapes: false, // set to true to allow \$ to produce a dollar without
    //   starting in-line math mode

    processEnvironments: true, // set to true to process \begin{xxx}...\end{xxx} outside
    //   of math mode, false to prevent that

    processRefs: true, // set to true to process \ref{...} outside of math mode

};

tex2jax.prototype.PreProcess = function (element) {
    if (typeof (element) === "string") {
        element = this.config.doc.getElementById(element)
    }
    if (!element) {
        element = this.config.doc.body
    }
    if (this.createPatterns()) {
        this.scanElement(element, element.nextSibling)
    }
};

tex2jax.prototype.createPatterns = function () {
    var starts = [],
        parts = [],
        i, m, config = this.config;
    this.match = {};
    for (i = 0, m = config.inlineMath.length; i < m; i++) {
        starts.push(this.patternQuote(config.inlineMath[i][0]));
        this.match[config.inlineMath[i][0]] = {
            mode: "tex",
            end: config.inlineMath[i][1],
            pattern: this.endPattern(config.inlineMath[i][1])
        };
    }
    for (i = 0, m = config.displayMath.length; i < m; i++) {
        starts.push(this.patternQuote(config.displayMath[i][0]));
        this.match[config.displayMath[i][0]] = {
            mode: "tex; mode=display",
            end: config.displayMath[i][1],
            pattern: this.endPattern(config.displayMath[i][1])
        };
    }
    if (starts.length) {
        parts.push(starts.sort(this.sortLength).join("|"))
    }
    if (config.processEnvironments) {
        parts.push("\\\\begin\\{([^}]*)\\}")
    }
    if (config.processEscapes) {
        parts.push("\\\\*\\\\\\\$")
    }
    if (config.processRefs) {
        parts.push("\\\\(eq)?ref\\{[^}]*\\}")
    }
    this.start = new RegExp(parts.join("|"), "g");
    this.skipTags = new RegExp("^(" + config.skipTags.join("|") + ")$", "i");
    var ignore = [];
    if (this.config.preRemoveClass) {
        ignore.push(this.config.preRemoveClass)
    };
    if (config.ignoreClass) {
        ignore.push(config.ignoreClass)
    }
    this.ignoreClass = (ignore.length ? new RegExp("(^| )(" + ignore.join("|") + ")( |$)") : /^$/);
    this.processClass = new RegExp("(^| )(" + config.processClass + ")( |$)");
    return (parts.length > 0);
};

tex2jax.prototype.patternQuote = function (s) {
    return s.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, '\\$1')
};

tex2jax.prototype.endPattern = function (end) {
    return new RegExp(this.patternQuote(end) + "|\\\\.|[{}]", "g");
};

tex2jax.prototype.sortLength = function (a, b) {
    if (a.length !== b.length) {
        return b.length - a.length
    }
    return (a == b ? 0 : (a < b ? -1 : 1));
};

tex2jax.prototype.scanElement = function (element, stop, ignore) {
    var cname, tname, ignoreChild, process;
    while (element && element != stop) {
        if (element.nodeName.toLowerCase() === '#text') {
            if (!ignore) {
                element = this.scanText(element)
            }
        } else {
            cname = (typeof (element.className) === "undefined" ? "" : element.className);
            tname = (typeof (element.tagName) === "undefined" ? "" : element.tagName);
            if (typeof (cname) !== "string") {
                cname = String(cname)
            } // jsxgraph uses non-string class names!
            process = this.processClass.exec(cname);
            if (element.firstChild && !cname.match(/(^| )MathJax/) &&
                (process || !this.skipTags.exec(tname))) {
                ignoreChild = (ignore || this.ignoreClass.exec(cname)) && !process;
                this.scanElement(element.firstChild, stop, ignoreChild);
            }
        }
        if (element) {
            element = element.nextSibling
        }
    }
};

tex2jax.prototype.scanText = function (element) {
    if (element.nodeValue.replace(/\s+/, '') == '') {
        return element
    }
    var match, prev;
    this.search = {
        start: true
    };
    this.pattern = this.start;
    while (element) {
        this.pattern.lastIndex = 0;
        while (element && element.nodeName.toLowerCase() === '#text' &&
            (match = this.pattern.exec(element.nodeValue))) {
            if (this.search.start) {
                element = this.startMatch(match, element)
            } else {
                element = this.endMatch(match, element)
            }
        }
        if (this.search.matched) {
            element = this.encloseMath(element)
        }
        if (element) {
            do {
                prev = element;
                element = element.nextSibling
            }
            while (element && (element.nodeName.toLowerCase() === 'br' ||
                    element.nodeName.toLowerCase() === '#comment'));
            if (!element || element.nodeName !== '#text') {
                return (this.search.close ? this.prevEndMatch() : prev)
            }
        }
    }
    return element;
};

tex2jax.prototype.startMatch = function (match, element) {
    var delim = this.match[match[0]];
    if (delim != null) { // a start delimiter
        this.search = {
            end: delim.end,
            mode: delim.mode,
            pcount: 0,
            open: element,
            olen: match[0].length,
            opos: this.pattern.lastIndex - match[0].length
        };
        this.switchPattern(delim.pattern);
    } else if (match[0].substr(0, 6) === "\\begin") { // \begin{...}
        this.search = {
            end: "\\end{" + match[1] + "}",
            mode: "TeX",
            pcount: 0,
            open: element,
            olen: 0,
            opos: this.pattern.lastIndex - match[0].length,
            isBeginEnd: true
        };
        this.switchPattern(this.endPattern(this.search.end));
    } else if (match[0].substr(0, 4) === "\\ref" || match[0].substr(0, 6) === "\\eqref") {
        this.search = {
            mode: "",
            end: "",
            open: element,
            pcount: 0,
            olen: 0,
            opos: this.pattern.lastIndex - match[0].length
        }
        return this.endMatch([""], element);
    } else { // escaped dollar signs
        // put $ in a span so it doesn't get processed again
        // split off backslashes so they don't get removed later
        var slashes = match[0].substr(0, match[0].length - 1),
            n, span;
        if (slashes.length % 2 === 0) {
            span = [slashes.replace(/\\\\/g, "\\")];
            n = 1
        } else {
            span = [slashes.substr(1).replace(/\\\\/g, "\\"), "$"];
            n = 0
        }
        escaped = this.config.doc.createElement("span");
        escaped.innerHTML = span.join('');
        var text = this.config.doc.createTextNode(element.nodeValue.substr(0, match.index));
        element.nodeValue = element.nodeValue.substr(match.index + match[0].length - n);
        element.parentNode.insertBefore(escaped, element);
        element.parentNode.insertBefore(text, escaped);
        this.pattern.lastIndex = n;
    }
    return element;
};

tex2jax.prototype.endMatch = function (match, element) {
    var search = this.search;
    if (match[0] == search.end) {
        if (!search.close || search.pcount === 0) {
            search.close = element;
            search.cpos = this.pattern.lastIndex;
            search.clen = (search.isBeginEnd ? 0 : match[0].length);
        }
        if (search.pcount === 0) {
            search.matched = true;
            element = this.encloseMath(element);
            this.switchPattern(this.start);
        }
    } else if (match[0] === "{") {
        search.pcount++
    } else if (match[0] === "}" && search.pcount) {
        search.pcount--
    }
    return element;
};
tex2jax.prototype.prevEndMatch = function () {
    this.search.matched = true;
    var element = this.encloseMath(this.search.close);
    this.switchPattern(this.start);
    return element;
};

tex2jax.prototype.switchPattern = function (pattern) {
    pattern.lastIndex = this.pattern.lastIndex;
    this.pattern = pattern;
    this.search.start = (pattern === this.start);
};

tex2jax.prototype.encloseMath = function (element) {
    var search = this.search,
        close = search.close,
        CLOSE, math;
    if (search.cpos === close.length) {
        close = close.nextSibling
    } else {
        close = close.splitText(search.cpos)
    }
    if (!close) {
        CLOSE = close = search.close.parentNode.appendChild(this.config.doc.createTextNode(""));
    }
    search.close = close;
    math = (search.opos ? search.open.splitText(search.opos) : search.open);
    while (math.nextSibling && math.nextSibling !== close) {
        if (math.nextSibling.nodeValue !== null) {
            if (math.nextSibling.nodeName === "#comment") {
                math.nodeValue += math.nextSibling.nodeValue.replace(/^\[CDATA\[((.|\n|\r)*)\]\]$/, "$1");
            } else {
                math.nodeValue += math.nextSibling.nodeValue;
            }
        } else if (this.msieNewlineBug) {
            math.nodeValue += (math.nextSibling.nodeName.toLowerCase() === "br" ? "\n" : " ");
        } else {
            math.nodeValue += " ";
        }
        math.parentNode.removeChild(math.nextSibling);
    }
    var TeX = math.nodeValue.substr(search.olen, math.nodeValue.length - search.olen - search.clen);
    math.parentNode.removeChild(math);
    math = this.createMathTag(search.mode, TeX);
    this.search = {};
    this.pattern.lastIndex = 0;
    if (CLOSE) {
        CLOSE.parentNode.removeChild(CLOSE)
    }
    return math;
};

tex2jax.prototype.insertNode = function (node) {
    var search = this.search;
    search.close.parentNode.insertBefore(node, search.close);
};

tex2jax.prototype.createMathTag = function (mode, tex) {
    var script = this.config.doc.createElement("script");
    script.type = 'math/' + mode;
    script.text = tex;
    this.insertNode(script);
    return script;
};

tex2jax.prototype.filterPreview = function (tex) {
    return tex
};

exports.tex2jax = new tex2jax();


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// commonmark.js - CommomMark in JavaScript
// Copyright (C) 2014 John MacFarlane
// License: BSD3.

// Basic usage:
//
// var commonmark = require('commonmark');
// var parser = new commonmark.Parser();
// var renderer = new commonmark.HtmlRenderer();
// console.log(renderer.render(parser.parse('Hello *world*')));

module.exports.Node = __webpack_require__(2);
module.exports.Parser = __webpack_require__(23);
module.exports.HtmlRenderer = __webpack_require__(35);
module.exports.XmlRenderer = __webpack_require__(36);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(2);
var unescapeString = __webpack_require__(1).unescapeString;
var OPENTAG = __webpack_require__(1).OPENTAG;
var CLOSETAG = __webpack_require__(1).CLOSETAG;

var CODE_INDENT = 4;

var C_TAB = 9;
var C_NEWLINE = 10;
var C_GREATERTHAN = 62;
var C_LESSTHAN = 60;
var C_SPACE = 32;
var C_OPEN_BRACKET = 91;

var InlineParser = __webpack_require__(31);

var reHtmlBlockOpen = [
   /./, // dummy for 0
   /^<(?:script|pre|style)(?:\s|>|$)/i,
   /^<!--/,
   /^<[?]/,
   /^<![A-Z]/,
   /^<!\[CDATA\[/,
   /^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|title|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
    new RegExp('^(?:' + OPENTAG + '|' + CLOSETAG + ')\\s*$', 'i')
];

var reHtmlBlockClose = [
   /./, // dummy for 0
   /<\/(?:script|pre|style)>/i,
   /-->/,
   /\?>/,
   />/,
   /\]\]>/
];

var reThematicBreak = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/;

var reMaybeSpecial = /^[#`~*+_=<>0-9-]/;

var reNonSpace = /[^ \t\f\v\r\n]/;

var reBulletListMarker = /^[*+-]/;

var reOrderedListMarker = /^(\d{1,9})([.)])/;

var reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;

var reCodeFence = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/;

var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;

var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;

var reLineEnding = /\r\n|\n|\r/;

// Returns true if string contains only space characters.
var isBlank = function(s) {
    return !(reNonSpace.test(s));
};

var isSpaceOrTab = function(c) {
    return c === C_SPACE || c === C_TAB;
};

var peek = function(ln, pos) {
    if (pos < ln.length) {
        return ln.charCodeAt(pos);
    } else {
        return -1;
    }
};

// DOC PARSER

// These are methods of a Parser object, defined below.

// Returns true if block ends with a blank line, descending if needed
// into lists and sublists.
var endsWithBlankLine = function(block) {
    while (block) {
        if (block._lastLineBlank) {
            return true;
        }
        var t = block.type;
        if (t === 'list' || t === 'item') {
            block = block._lastChild;
        } else {
            break;
        }
    }
    return false;
};

// Add a line to the block at the tip.  We assume the tip
// can accept lines -- that check should be done before calling this.
var addLine = function() {
    if (this.partiallyConsumedTab) {
      this.offset += 1; // skip over tab
      // add space characters:
      var charsToTab = 4 - (this.column % 4);
      this.tip._string_content += (' '.repeat(charsToTab));
    }
    this.tip._string_content += this.currentLine.slice(this.offset) + '\n';
};

// Add block of type tag as a child of the tip.  If the tip can't
// accept children, close and finalize it and try its parent,
// and so on til we find a block that can accept children.
var addChild = function(tag, offset) {
    while (!this.blocks[this.tip.type].canContain(tag)) {
        this.finalize(this.tip, this.lineNumber - 1);
    }

    var column_number = offset + 1; // offset 0 = column 1
    var newBlock = new Node(tag, [[this.lineNumber, column_number], [0, 0]]);
    newBlock._string_content = '';
    this.tip.appendChild(newBlock);
    this.tip = newBlock;
    return newBlock;
};

// Parse a list marker and return data on the marker (type,
// start, delimiter, bullet character, padding) or null.
var parseListMarker = function(parser, container) {
    var rest = parser.currentLine.slice(parser.nextNonspace);
    var match;
    var nextc;
    var spacesStartCol;
    var spacesStartOffset;
    var data = { type: null,
                 tight: true,  // lists are tight by default
                 bulletChar: null,
                 start: null,
                 delimiter: null,
                 padding: null,
                 markerOffset: parser.indent };
    if ((match = rest.match(reBulletListMarker))) {
        data.type = 'bullet';
        data.bulletChar = match[0][0];

    } else if ((match = rest.match(reOrderedListMarker)) &&
                (container.type !== 'paragraph' ||
                 match[1] === '1')) {
        data.type = 'ordered';
        data.start = parseInt(match[1]);
        data.delimiter = match[2];
    } else {
        return null;
    }
    // make sure we have spaces after
    nextc = peek(parser.currentLine, parser.nextNonspace + match[0].length);
    if (!(nextc === -1 || nextc === C_TAB || nextc === C_SPACE)) {
        return null;
    }

    // if it interrupts paragraph, make sure first line isn't blank
    if (container.type === 'paragraph' && !parser.currentLine.slice(parser.nextNonspace + match[0].length).match(reNonSpace)) {
        return null;
    }

    // we've got a match! advance offset and calculate padding
    parser.advanceNextNonspace(); // to start of marker
    parser.advanceOffset(match[0].length, true); // to end of marker
    spacesStartCol = parser.column;
    spacesStartOffset = parser.offset;
    do {
        parser.advanceOffset(1, true);
        nextc = peek(parser.currentLine, parser.offset);
    } while (parser.column - spacesStartCol < 5 &&
           isSpaceOrTab(nextc));
    var blank_item = peek(parser.currentLine, parser.offset) === -1;
    var spaces_after_marker = parser.column - spacesStartCol;
    if (spaces_after_marker >= 5 ||
        spaces_after_marker < 1 ||
        blank_item) {
        data.padding = match[0].length + 1;
        parser.column = spacesStartCol;
        parser.offset = spacesStartOffset;
        if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
    } else {
        data.padding = match[0].length + spaces_after_marker;
    }
    return data;
};

// Returns true if the two list items are of the same type,
// with the same delimiter and bullet character.  This is used
// in agglomerating list items into lists.
var listsMatch = function(list_data, item_data) {
    return (list_data.type === item_data.type &&
            list_data.delimiter === item_data.delimiter &&
            list_data.bulletChar === item_data.bulletChar);
};

// Finalize and close any unmatched blocks.
var closeUnmatchedBlocks = function() {
    if (!this.allClosed) {
        // finalize any blocks not matched
        while (this.oldtip !== this.lastMatchedContainer) {
            var parent = this.oldtip._parent;
            this.finalize(this.oldtip, this.lineNumber - 1);
            this.oldtip = parent;
        }
        this.allClosed = true;
    }
};

// 'finalize' is run when the block is closed.
// 'continue' is run to check whether the block is continuing
// at a certain line and offset (e.g. whether a block quote
// contains a `>`.  It returns 0 for matched, 1 for not matched,
// and 2 for "we've dealt with this line completely, go to next."
var blocks = {
    document: {
        continue: function() { return 0; },
        finalize: function() { return; },
        canContain: function(t) { return (t !== 'item'); },
        acceptsLines: false
    },
    list: {
        continue: function() { return 0; },
        finalize: function(parser, block) {
            var item = block._firstChild;
            while (item) {
                // check for non-final list item ending with blank line:
                if (endsWithBlankLine(item) && item._next) {
                    block._listData.tight = false;
                    break;
                }
                // recurse into children of list item, to see if there are
                // spaces between any of them:
                var subitem = item._firstChild;
                while (subitem) {
                    if (endsWithBlankLine(subitem) &&
                        (item._next || subitem._next)) {
                        block._listData.tight = false;
                        break;
                    }
                    subitem = subitem._next;
                }
                item = item._next;
            }
        },
        canContain: function(t) { return (t === 'item'); },
        acceptsLines: false
    },
    block_quote: {
        continue: function(parser) {
            var ln = parser.currentLine;
            if (!parser.indented &&
                peek(ln, parser.nextNonspace) === C_GREATERTHAN) {
                parser.advanceNextNonspace();
                parser.advanceOffset(1, false);
                if (isSpaceOrTab(peek(ln, parser.offset))) {
                    parser.advanceOffset(1, true);
                }
            } else {
                return 1;
            }
            return 0;
        },
        finalize: function() { return; },
        canContain: function(t) { return (t !== 'item'); },
        acceptsLines: false
    },
    item: {
        continue: function(parser, container) {
            if (parser.blank) {
                if (container._firstChild == null) {
                    // Blank line after empty list item
                    return 1;
                } else {
                    parser.advanceNextNonspace();
                }
            } else if (parser.indent >=
                       container._listData.markerOffset +
                       container._listData.padding) {
                parser.advanceOffset(container._listData.markerOffset +
                    container._listData.padding, true);
            } else {
                return 1;
            }
            return 0;
        },
        finalize: function() { return; },
        canContain: function(t) { return (t !== 'item'); },
        acceptsLines: false
    },
    heading: {
        continue: function() {
            // a heading can never container > 1 line, so fail to match:
            return 1;
        },
        finalize: function() { return; },
        canContain: function() { return false; },
        acceptsLines: false
    },
    thematic_break: {
        continue: function() {
            // a thematic break can never container > 1 line, so fail to match:
            return 1;
        },
        finalize: function() { return; },
        canContain: function() { return false; },
        acceptsLines: false
    },
    code_block: {
        continue: function(parser, container) {
            var ln = parser.currentLine;
            var indent = parser.indent;
            if (container._isFenced) { // fenced
                var match = (indent <= 3 &&
                    ln.charAt(parser.nextNonspace) === container._fenceChar &&
                    ln.slice(parser.nextNonspace).match(reClosingCodeFence));
                if (match && match[0].length >= container._fenceLength) {
                    // closing fence - we're at end of line, so we can return
                    parser.finalize(container, parser.lineNumber);
                    return 2;
                } else {
                    // skip optional spaces of fence offset
                    var i = container._fenceOffset;
                    while (i > 0 && isSpaceOrTab(peek(ln, parser.offset))) {
                        parser.advanceOffset(1, true);
                        i--;
                    }
                }
            } else { // indented
                if (indent >= CODE_INDENT) {
                    parser.advanceOffset(CODE_INDENT, true);
                } else if (parser.blank) {
                    parser.advanceNextNonspace();
                } else {
                    return 1;
                }
            }
            return 0;
        },
        finalize: function(parser, block) {
            if (block._isFenced) { // fenced
                // first line becomes info string
                var content = block._string_content;
                var newlinePos = content.indexOf('\n');
                var firstLine = content.slice(0, newlinePos);
                var rest = content.slice(newlinePos + 1);
                block.info = unescapeString(firstLine.trim());
                block._literal = rest;
            } else { // indented
                block._literal = block._string_content.replace(/(\n *)+$/, '\n');
            }
            block._string_content = null; // allow GC
        },
        canContain: function() { return false; },
        acceptsLines: true
    },
    html_block: {
        continue: function(parser, container) {
            return ((parser.blank &&
                     (container._htmlBlockType === 6 ||
                      container._htmlBlockType === 7)) ? 1 : 0);
        },
        finalize: function(parser, block) {
            block._literal = block._string_content.replace(/(\n *)+$/, '');
            block._string_content = null; // allow GC
        },
        canContain: function() { return false; },
        acceptsLines: true
    },
    paragraph: {
        continue: function(parser) {
            return (parser.blank ? 1 : 0);
        },
        finalize: function(parser, block) {
            var pos;
            var hasReferenceDefs = false;

            // try parsing the beginning as link reference definitions:
            while (peek(block._string_content, 0) === C_OPEN_BRACKET &&
                   (pos =
                    parser.inlineParser.parseReference(block._string_content,
                                                       parser.refmap))) {
                block._string_content = block._string_content.slice(pos);
                hasReferenceDefs = true;
            }
            if (hasReferenceDefs && isBlank(block._string_content)) {
                block.unlink();
            }
        },
        canContain: function() { return false; },
        acceptsLines: true
    }
};

// block start functions.  Return values:
// 0 = no match
// 1 = matched container, keep going
// 2 = matched leaf, no more block starts
var blockStarts = [
    // block quote
    function(parser) {
        if (!parser.indented &&
            peek(parser.currentLine, parser.nextNonspace) === C_GREATERTHAN) {
            parser.advanceNextNonspace();
            parser.advanceOffset(1, false);
            // optional following space
            if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
                parser.advanceOffset(1, true);
            }
            parser.closeUnmatchedBlocks();
            parser.addChild('block_quote', parser.nextNonspace);
            return 1;
        } else {
            return 0;
        }
    },

    // ATX heading
    function(parser) {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeadingMarker))) {
            parser.advanceNextNonspace();
            parser.advanceOffset(match[0].length, false);
            parser.closeUnmatchedBlocks();
            var container = parser.addChild('heading', parser.nextNonspace);
            container.level = match[0].trim().length; // number of #s
            // remove trailing ###s:
            container._string_content =
                parser.currentLine.slice(parser.offset).replace(/^[ \t]*#+[ \t]*$/, '').replace(/[ \t]+#+[ \t]*$/, '');
            parser.advanceOffset(parser.currentLine.length - parser.offset);
            return 2;
        } else {
            return 0;
        }
    },

    // Fenced code block
    function(parser) {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reCodeFence))) {
            var fenceLength = match[0].length;
            parser.closeUnmatchedBlocks();
            var container = parser.addChild('code_block', parser.nextNonspace);
            container._isFenced = true;
            container._fenceLength = fenceLength;
            container._fenceChar = match[0][0];
            container._fenceOffset = parser.indent;
            parser.advanceNextNonspace();
            parser.advanceOffset(fenceLength, false);
            return 2;
        } else {
            return 0;
        }
    },

    // HTML block
    function(parser, container) {
        if (!parser.indented &&
            peek(parser.currentLine, parser.nextNonspace) === C_LESSTHAN) {
            var s = parser.currentLine.slice(parser.nextNonspace);
            var blockType;

            for (blockType = 1; blockType <= 7; blockType++) {
                if (reHtmlBlockOpen[blockType].test(s) &&
                    (blockType < 7 ||
                     container.type !== 'paragraph')) {
                    parser.closeUnmatchedBlocks();
                    // We don't adjust parser.offset;
                    // spaces are part of the HTML block:
                    var b = parser.addChild('html_block',
                                            parser.offset);
                    b._htmlBlockType = blockType;
                    return 2;
                }
            }
        }

        return 0;

    },

    // Setext heading
    function(parser, container) {
        var match;
        if (!parser.indented &&
            container.type === 'paragraph' &&
                   ((match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeadingLine)))) {
            parser.closeUnmatchedBlocks();
            var heading = new Node('heading', container.sourcepos);
            heading.level = match[0][0] === '=' ? 1 : 2;
            heading._string_content = container._string_content;
            container.insertAfter(heading);
            container.unlink();
            parser.tip = heading;
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return 2;
        } else {
            return 0;
        }
    },

    // thematic break
    function(parser) {
        if (!parser.indented &&
            reThematicBreak.test(parser.currentLine.slice(parser.nextNonspace))) {
            parser.closeUnmatchedBlocks();
            parser.addChild('thematic_break', parser.nextNonspace);
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return 2;
        } else {
            return 0;
        }
    },

    // list item
    function(parser, container) {
        var data;

        if ((!parser.indented || container.type === 'list')
                && (data = parseListMarker(parser, container))) {
            parser.closeUnmatchedBlocks();

            // add the list if needed
            if (parser.tip.type !== 'list' ||
                !(listsMatch(container._listData, data))) {
                container = parser.addChild('list', parser.nextNonspace);
                container._listData = data;
            }

            // add the list item
            container = parser.addChild('item', parser.nextNonspace);
            container._listData = data;
            return 1;
        } else {
            return 0;
        }
    },

    // indented code block
    function(parser) {
        if (parser.indented &&
            parser.tip.type !== 'paragraph' &&
            !parser.blank) {
            // indented code
            parser.advanceOffset(CODE_INDENT, true);
            parser.closeUnmatchedBlocks();
            parser.addChild('code_block', parser.offset);
            return 2;
        } else {
            return 0;
        }
     }

];

var advanceOffset = function(count, columns) {
    var currentLine = this.currentLine;
    var charsToTab, charsToAdvance;
    var c;
    while (count > 0 && (c = currentLine[this.offset])) {
        if (c === '\t') {
            charsToTab = 4 - (this.column % 4);
            if (columns) {
                this.partiallyConsumedTab = charsToTab > count;
                charsToAdvance = charsToTab > count ? count : charsToTab;
                this.column += charsToAdvance;
                this.offset += this.partiallyConsumedTab ? 0 : 1;
                count -= charsToAdvance;
            } else {
                this.partiallyConsumedTab = false;
                this.column += charsToTab;
                this.offset += 1;
                count -= 1;
            }
        } else {
            this.partiallyConsumedTab = false;
            this.offset += 1;
            this.column += 1; // assume ascii; block starts are ascii
            count -= 1;
        }
    }
};

var advanceNextNonspace = function() {
    this.offset = this.nextNonspace;
    this.column = this.nextNonspaceColumn;
    this.partiallyConsumedTab = false;
};

var findNextNonspace = function() {
    var currentLine = this.currentLine;
    var i = this.offset;
    var cols = this.column;
    var c;

    while ((c = currentLine.charAt(i)) !== '') {
        if (c === ' ') {
            i++;
            cols++;
        } else if (c === '\t') {
            i++;
            cols += (4 - (cols % 4));
        } else {
            break;
        }
    }
    this.blank = (c === '\n' || c === '\r' || c === '');
    this.nextNonspace = i;
    this.nextNonspaceColumn = cols;
    this.indent = this.nextNonspaceColumn - this.column;
    this.indented = this.indent >= CODE_INDENT;
};

// Analyze a line of text and update the document appropriately.
// We parse markdown text by calling this on each line of input,
// then finalizing the document.
var incorporateLine = function(ln) {
    var all_matched = true;
    var t;

    var container = this.doc;
    this.oldtip = this.tip;
    this.offset = 0;
    this.column = 0;
    this.blank = false;
    this.partiallyConsumedTab = false;
    this.lineNumber += 1;

    // replace NUL characters for security
    if (ln.indexOf('\u0000') !== -1) {
        ln = ln.replace(/\0/g, '\uFFFD');
    }

    this.currentLine = ln;

    // For each containing block, try to parse the associated line start.
    // Bail out on failure: container will point to the last matching block.
    // Set all_matched to false if not all containers match.
    var lastChild;
    while ((lastChild = container._lastChild) && lastChild._open) {
        container = lastChild;

        this.findNextNonspace();

        switch (this.blocks[container.type].continue(this, container)) {
        case 0: // we've matched, keep going
            break;
        case 1: // we've failed to match a block
            all_matched = false;
            break;
        case 2: // we've hit end of line for fenced code close and can return
            this.lastLineLength = ln.length;
            return;
        default:
            throw 'continue returned illegal value, must be 0, 1, or 2';
        }
        if (!all_matched) {
            container = container._parent; // back up to last matching block
            break;
        }
    }

    this.allClosed = (container === this.oldtip);
    this.lastMatchedContainer = container;

    var matchedLeaf = container.type !== 'paragraph' &&
            blocks[container.type].acceptsLines;
    var starts = this.blockStarts;
    var startsLen = starts.length;
    // Unless last matched container is a code block, try new container starts,
    // adding children to the last matched container:
    while (!matchedLeaf) {

        this.findNextNonspace();

        // this is a little performance optimization:
        if (!this.indented &&
            !reMaybeSpecial.test(ln.slice(this.nextNonspace))) {
            this.advanceNextNonspace();
            break;
        }

        var i = 0;
        while (i < startsLen) {
            var res = starts[i](this, container);
            if (res === 1) {
                container = this.tip;
                break;
            } else if (res === 2) {
                container = this.tip;
                matchedLeaf = true;
                break;
            } else {
                i++;
            }
        }

        if (i === startsLen) { // nothing matched
            this.advanceNextNonspace();
            break;
        }
    }

    // What remains at the offset is a text line.  Add the text to the
    // appropriate container.

   // First check for a lazy paragraph continuation:
    if (!this.allClosed && !this.blank &&
        this.tip.type === 'paragraph') {
        // lazy paragraph continuation
        this.addLine();

    } else { // not a lazy continuation

        // finalize any blocks not matched
        this.closeUnmatchedBlocks();
        if (this.blank && container.lastChild) {
            container.lastChild._lastLineBlank = true;
        }

        t = container.type;

        // Block quote lines are never blank as they start with >
        // and we don't count blanks in fenced code for purposes of tight/loose
        // lists or breaking out of lists.  We also don't set _lastLineBlank
        // on an empty list item, or if we just closed a fenced block.
        var lastLineBlank = this.blank &&
            !(t === 'block_quote' ||
              (t === 'code_block' && container._isFenced) ||
              (t === 'item' &&
               !container._firstChild &&
               container.sourcepos[0][0] === this.lineNumber));

        // propagate lastLineBlank up through parents:
        var cont = container;
        while (cont) {
            cont._lastLineBlank = lastLineBlank;
            cont = cont._parent;
        }

        if (this.blocks[t].acceptsLines) {
            this.addLine();
            // if HtmlBlock, check for end condition
            if (t === 'html_block' &&
                container._htmlBlockType >= 1 &&
                container._htmlBlockType <= 5 &&
                reHtmlBlockClose[container._htmlBlockType].test(this.currentLine.slice(this.offset))) {
                this.finalize(container, this.lineNumber);
            }

        } else if (this.offset < ln.length && !this.blank) {
            // create paragraph container for line
            container = this.addChild('paragraph', this.offset);
            this.advanceNextNonspace();
            this.addLine();
        }
    }
    this.lastLineLength = ln.length;
};

// Finalize a block.  Close it and do any necessary postprocessing,
// e.g. creating string_content from strings, setting the 'tight'
// or 'loose' status of a list, and parsing the beginnings
// of paragraphs for reference definitions.  Reset the tip to the
// parent of the closed block.
var finalize = function(block, lineNumber) {
    var above = block._parent;
    block._open = false;
    block.sourcepos[1] = [lineNumber, this.lastLineLength];

    this.blocks[block.type].finalize(this, block);

    this.tip = above;
};

// Walk through a block & children recursively, parsing string content
// into inline content where appropriate.
var processInlines = function(block) {
    var node, event, t;
    var walker = block.walker();
    this.inlineParser.refmap = this.refmap;
    this.inlineParser.options = this.options;
    while ((event = walker.next())) {
        node = event.node;
        t = node.type;
        if (!event.entering && (t === 'paragraph' || t === 'heading')) {
            this.inlineParser.parse(node);
        }
    }
};

var Document = function() {
    var doc = new Node('document', [[1, 1], [0, 0]]);
    return doc;
};

// The main parsing function.  Returns a parsed document AST.
var parse = function(input) {
    this.doc = new Document();
    this.tip = this.doc;
    this.refmap = {};
    this.lineNumber = 0;
    this.lastLineLength = 0;
    this.offset = 0;
    this.column = 0;
    this.lastMatchedContainer = this.doc;
    this.currentLine = "";
    if (this.options.time) { console.time("preparing input"); }
    var lines = input.split(reLineEnding);
    var len = lines.length;
    if (input.charCodeAt(input.length - 1) === C_NEWLINE) {
        // ignore last blank line created by final newline
        len -= 1;
    }
    if (this.options.time) { console.timeEnd("preparing input"); }
    if (this.options.time) { console.time("block parsing"); }
    for (var i = 0; i < len; i++) {
        this.incorporateLine(lines[i]);
    }
    while (this.tip) {
        this.finalize(this.tip, len);
    }
    if (this.options.time) { console.timeEnd("block parsing"); }
    if (this.options.time) { console.time("inline parsing"); }
    this.processInlines(this.doc);
    if (this.options.time) { console.timeEnd("inline parsing"); }
    return this.doc;
};


// The Parser object.
function Parser(options){
    return {
        doc: new Document(),
        blocks: blocks,
        blockStarts: blockStarts,
        tip: this.doc,
        oldtip: this.doc,
        currentLine: "",
        lineNumber: 0,
        offset: 0,
        column: 0,
        nextNonspace: 0,
        nextNonspaceColumn: 0,
        indent: 0,
        indented: false,
        blank: false,
        partiallyConsumedTab: false,
        allClosed: true,
        lastMatchedContainer: this.doc,
        refmap: {},
        lastLineLength: 0,
        inlineParser: new InlineParser(options),
        findNextNonspace: findNextNonspace,
        advanceOffset: advanceOffset,
        advanceNextNonspace: advanceNextNonspace,
        addLine: addLine,
        addChild: addChild,
        incorporateLine: incorporateLine,
        finalize: finalize,
        processInlines: processInlines,
        closeUnmatchedBlocks: closeUnmatchedBlocks,
        parse: parse,
        options: options || {}
    };
}

module.exports = Parser;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




/* eslint-disable no-bitwise */

var decodeCache = {};

function getDecodeCache(exclude) {
  var i, ch, cache = decodeCache[exclude];
  if (cache) { return cache; }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
}


// Decode percent-encoded string.
//
function decode(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode.defaultChars;
  }

  cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    var i, l, b1, b2, b3, b4, chr,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}


decode.defaultChars   = ';/?:@&=+$,#';
decode.componentChars = '';


module.exports = decode;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var inverseXML = getInverseObj(__webpack_require__(4)),
    xmlReplacer = getInverseReplacer(inverseXML);

exports.XML = getInverse(inverseXML, xmlReplacer);

var inverseHTML = getInverseObj(__webpack_require__(5)),
    htmlReplacer = getInverseReplacer(inverseHTML);

exports.HTML = getInverse(inverseHTML, htmlReplacer);

function getInverseObj(obj){
	return Object.keys(obj).sort().reduce(function(inverse, name){
		inverse[obj[name]] = "&" + name + ";";
		return inverse;
	}, {});
}

function getInverseReplacer(inverse){
	var single = [],
	    multiple = [];

	Object.keys(inverse).forEach(function(k){
		if(k.length === 1){
			single.push("\\" + k);
		} else {
			multiple.push(k);
		}
	});

	//TODO add ranges
	multiple.unshift("[" + single.join("") + "]");

	return new RegExp(multiple.join("|"), "g");
}

var re_nonASCII = /[^\0-\x7F]/g,
    re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function singleCharReplacer(c){
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer(c){
	// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var high = c.charCodeAt(0);
	var low  = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re){
	function func(name){
		return inverse[name];
	}

	return function(data){
		return data
				.replace(re, func)
				.replace(re_astralSymbols, astralReplacer)
				.replace(re_nonASCII, singleCharReplacer);
	};
}

var re_xmlChars = getInverseReplacer(inverseXML);

function escapeXML(data){
	return data
			.replace(re_xmlChars, singleCharReplacer)
			.replace(re_astralSymbols, astralReplacer)
			.replace(re_nonASCII, singleCharReplacer);
}

exports.escape = escapeXML;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var entityMap = __webpack_require__(5),
    legacyMap = __webpack_require__(28),
    xmlMap    = __webpack_require__(4),
    decodeCodePoint = __webpack_require__(29);

var decodeXMLStrict  = getStrictDecoder(xmlMap),
    decodeHTMLStrict = getStrictDecoder(entityMap);

function getStrictDecoder(map){
	var keys = Object.keys(map).join("|"),
	    replace = getReplacer(map);

	keys += "|#[xX][\\da-fA-F]+|#\\d+";

	var re = new RegExp("&(?:" + keys + ");", "g");

	return function(str){
		return String(str).replace(re, replace);
	};
}

var decodeHTML = (function(){
	var legacy = Object.keys(legacyMap)
		.sort(sorter);

	var keys = Object.keys(entityMap)
		.sort(sorter);

	for(var i = 0, j = 0; i < keys.length; i++){
		if(legacy[j] === keys[i]){
			keys[i] += ";?";
			j++;
		} else {
			keys[i] += ";";
		}
	}

	var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
	    replace = getReplacer(entityMap);

	function replacer(str){
		if(str.substr(-1) !== ";") str += ";";
		return replace(str);
	}

	//TODO consider creating a merged map
	return function(str){
		return String(str).replace(re, replacer);
	};
}());

function sorter(a, b){
	return a < b ? 1 : -1;
}

function getReplacer(map){
	return function replace(str){
		if(str.charAt(1) === "#"){
			if(str.charAt(2) === "X" || str.charAt(2) === "x"){
				return decodeCodePoint(parseInt(str.substr(3), 16));
			}
			return decodeCodePoint(parseInt(str.substr(2), 10));
		}
		return map[str.slice(1, -1)];
	};
}

module.exports = {
	XML: decodeXMLStrict,
	HTML: decodeHTML,
	HTMLStrict: decodeHTMLStrict
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","QUOT":"\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var decodeMap = __webpack_require__(30);

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint){

	if((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF){
		return "\uFFFD";
	}

	if(codePoint in decodeMap){
		codePoint = decodeMap[codePoint];
	}

	var output = "";

	if(codePoint > 0xFFFF){
		codePoint -= 0x10000;
		output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
		codePoint = 0xDC00 | codePoint & 0x3FF;
	}

	output += String.fromCharCode(codePoint);
	return output;
}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(2);
var common = __webpack_require__(1);
var normalizeReference = __webpack_require__(32);

var normalizeURI = common.normalizeURI;
var unescapeString = common.unescapeString;
var fromCodePoint = __webpack_require__(33);
var decodeHTML = __webpack_require__(3).decodeHTML;
__webpack_require__(34); // Polyfill for String.prototype.repeat

// Constants for character codes:

var C_NEWLINE = 10;
var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_BACKTICK = 96;
var C_OPEN_BRACKET = 91;
var C_CLOSE_BRACKET = 93;
var C_LESSTHAN = 60;
var C_BANG = 33;
var C_BACKSLASH = 92;
var C_AMPERSAND = 38;
var C_OPEN_PAREN = 40;
var C_CLOSE_PAREN = 41;
var C_COLON = 58;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;

// Some regexps used in inline parser:

var ESCAPABLE = common.ESCAPABLE;
var ESCAPED_CHAR = '\\\\' + ESCAPABLE;

var ENTITY = common.ENTITY;
var reHtmlTag = common.reHtmlTag;

var rePunctuation = new RegExp(/[!"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/);

var reLinkTitle = new RegExp(
    '^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' +
        '|' +
        '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' +
        '|' +
        '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');

var reLinkDestinationBraces = new RegExp(
    '^(?:[<](?:[^ <>\\t\\n\\\\\\x00]' + '|' + ESCAPED_CHAR + '|' + '\\\\)*[>])');

var reEscapable = new RegExp('^' + ESCAPABLE);

var reEntityHere = new RegExp('^' + ENTITY, 'i');

var reTicks = /`+/;

var reTicksHere = /^`+/;

var reEllipses = /\.\.\./g;

var reDash = /--+/g;

var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;

var reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;

var reSpnl = /^ *(?:\n *)?/;

var reWhitespaceChar = /^[ \t\n\x0b\x0c\x0d]/;

var reWhitespace = /[ \t\n\x0b\x0c\x0d]+/g;

var reUnicodeWhitespaceChar = /^\s/;

var reFinalSpace = / *$/;

var reInitialSpace = /^ */;

var reSpaceAtEndOfLine = /^ *(?:\n|$)/;

var reLinkLabel = new RegExp('^\\[(?:[^\\\\\\[\\]]|' + ESCAPED_CHAR +
  '|\\\\){0,1000}\\]');

// Matches a string of non-special characters.
var reMain = /^[^\n`\[\]\\!<&*_'"]+/m;

var text = function(s) {
    var node = new Node('text');
    node._literal = s;
    return node;
};

// INLINE PARSER

// These are methods of an InlineParser object, defined below.
// An InlineParser keeps track of a subject (a string to be
// parsed) and a position in that subject.

// If re matches at current position in the subject, advance
// position in subject and return the match; otherwise return null.
var match = function(re) {
    var m = re.exec(this.subject.slice(this.pos));
    if (m === null) {
        return null;
    } else {
        this.pos += m.index + m[0].length;
        return m[0];
    }
};

// Returns the code for the character at the current subject position, or -1
// there are no more characters.
var peek = function() {
    if (this.pos < this.subject.length) {
        return this.subject.charCodeAt(this.pos);
    } else {
        return -1;
    }
};

// Parse zero or more space characters, including at most one newline
var spnl = function() {
    this.match(reSpnl);
    return true;
};

// All of the parsers below try to match something at the current position
// in the subject.  If they succeed in matching anything, they
// return the inline matched, advancing the subject.

// Attempt to parse backticks, adding either a backtick code span or a
// literal sequence of backticks.
var parseBackticks = function(block) {
    var ticks = this.match(reTicksHere);
    if (ticks === null) {
        return false;
    }
    var afterOpenTicks = this.pos;
    var matched;
    var node;
    while ((matched = this.match(reTicks)) !== null) {
        if (matched === ticks) {
            node = new Node('code');
            node._literal = this.subject.slice(afterOpenTicks,
                                        this.pos - ticks.length)
                          .trim().replace(reWhitespace, ' ');
            block.appendChild(node);
            return true;
        }
    }
    // If we got here, we didn't match a closing backtick sequence.
    this.pos = afterOpenTicks;
    block.appendChild(text(ticks));
    return true;
};

// Parse a backslash-escaped special character, adding either the escaped
// character, a hard line break (if the backslash is followed by a newline),
// or a literal backslash to the block's children.  Assumes current character
// is a backslash.
var parseBackslash = function(block) {
    var subj = this.subject;
    var node;
    this.pos += 1;
    if (this.peek() === C_NEWLINE) {
        this.pos += 1;
        node = new Node('linebreak');
        block.appendChild(node);
    } else if (reEscapable.test(subj.charAt(this.pos))) {
        block.appendChild(text(subj.charAt(this.pos)));
        this.pos += 1;
    } else {
        block.appendChild(text('\\'));
    }
    return true;
};

// Attempt to parse an autolink (URL or email in pointy brackets).
var parseAutolink = function(block) {
    var m;
    var dest;
    var node;
    if ((m = this.match(reEmailAutolink))) {
        dest = m.slice(1, m.length - 1);
        node = new Node('link');
        node._destination = normalizeURI('mailto:' + dest);
        node._title = '';
        node.appendChild(text(dest));
        block.appendChild(node);
        return true;
    } else if ((m = this.match(reAutolink))) {
        dest = m.slice(1, m.length - 1);
        node = new Node('link');
        node._destination = normalizeURI(dest);
        node._title = '';
        node.appendChild(text(dest));
        block.appendChild(node);
        return true;
    } else {
        return false;
    }
};

// Attempt to parse a raw HTML tag.
var parseHtmlTag = function(block) {
    var m = this.match(reHtmlTag);
    if (m === null) {
        return false;
    } else {
        var node = new Node('html_inline');
        node._literal = m;
        block.appendChild(node);
        return true;
    }
};

// Scan a sequence of characters with code cc, and return information about
// the number of delimiters and whether they are positioned such that
// they can open and/or close emphasis or strong emphasis.  A utility
// function for strong/emph parsing.
var scanDelims = function(cc) {
    var numdelims = 0;
    var char_before, char_after, cc_after;
    var startpos = this.pos;
    var left_flanking, right_flanking, can_open, can_close;
    var after_is_whitespace, after_is_punctuation, before_is_whitespace, before_is_punctuation;

    if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
        numdelims++;
        this.pos++;
    } else {
        while (this.peek() === cc) {
            numdelims++;
            this.pos++;
        }
    }

    if (numdelims === 0) {
        return null;
    }

    char_before = startpos === 0 ? '\n' : this.subject.charAt(startpos - 1);

    cc_after = this.peek();
    if (cc_after === -1) {
        char_after = '\n';
    } else {
        char_after = fromCodePoint(cc_after);
    }

    after_is_whitespace = reUnicodeWhitespaceChar.test(char_after);
    after_is_punctuation = rePunctuation.test(char_after);
    before_is_whitespace = reUnicodeWhitespaceChar.test(char_before);
    before_is_punctuation = rePunctuation.test(char_before);

    left_flanking = !after_is_whitespace &&
            (!after_is_punctuation || before_is_whitespace || before_is_punctuation);
    right_flanking = !before_is_whitespace &&
            (!before_is_punctuation || after_is_whitespace || after_is_punctuation);
    if (cc === C_UNDERSCORE) {
        can_open = left_flanking &&
            (!right_flanking || before_is_punctuation);
        can_close = right_flanking &&
            (!left_flanking || after_is_punctuation);
    } else if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
        can_open = left_flanking && !right_flanking;
        can_close = right_flanking;
    } else {
        can_open = left_flanking;
        can_close = right_flanking;
    }
    this.pos = startpos;
    return { numdelims: numdelims,
             can_open: can_open,
             can_close: can_close };
};

// Handle a delimiter marker for emphasis or a quote.
var handleDelim = function(cc, block) {
    var res = this.scanDelims(cc);
    if (!res) {
        return false;
    }
    var numdelims = res.numdelims;
    var startpos = this.pos;
    var contents;

    this.pos += numdelims;
    if (cc === C_SINGLEQUOTE) {
        contents = "\u2019";
    } else if (cc === C_DOUBLEQUOTE) {
        contents = "\u201C";
    } else {
        contents = this.subject.slice(startpos, this.pos);
    }
    var node = text(contents);
    block.appendChild(node);

    // Add entry to stack for this opener
    this.delimiters = { cc: cc,
                        numdelims: numdelims,
                        origdelims: numdelims,
                        node: node,
                        previous: this.delimiters,
                        next: null,
                        can_open: res.can_open,
                        can_close: res.can_close };
    if (this.delimiters.previous !== null) {
        this.delimiters.previous.next = this.delimiters;
    }

    return true;

};

var removeDelimiter = function(delim) {
    if (delim.previous !== null) {
        delim.previous.next = delim.next;
    }
    if (delim.next === null) {
        // top of stack
        this.delimiters = delim.previous;
    } else {
        delim.next.previous = delim.previous;
    }
};

var removeDelimitersBetween = function(bottom, top) {
    if (bottom.next !== top) {
        bottom.next = top;
        top.previous = bottom;
    }
};

var processEmphasis = function(stack_bottom) {
    var opener, closer, old_closer;
    var opener_inl, closer_inl;
    var tempstack;
    var use_delims;
    var tmp, next;
    var opener_found;
    var openers_bottom = [];
    var odd_match = false;

    openers_bottom[C_UNDERSCORE] = stack_bottom;
    openers_bottom[C_ASTERISK] = stack_bottom;
    openers_bottom[C_SINGLEQUOTE] = stack_bottom;
    openers_bottom[C_DOUBLEQUOTE] = stack_bottom;

    // find first closer above stack_bottom:
    closer = this.delimiters;
    while (closer !== null && closer.previous !== stack_bottom) {
        closer = closer.previous;
    }
    // move forward, looking for closers, and handling each
    while (closer !== null) {
        var closercc = closer.cc;
        if (!closer.can_close) {
            closer = closer.next;
        } else {
            // found emphasis closer. now look back for first matching opener:
            opener = closer.previous;
            opener_found = false;
            while (opener !== null && opener !== stack_bottom &&
                   opener !== openers_bottom[closercc]) {
                odd_match = (closer.can_open || opener.can_close) &&
                    (opener.origdelims + closer.origdelims) % 3 === 0;
                if (opener.cc === closer.cc && opener.can_open && !odd_match) {
                    opener_found = true;
                    break;
                }
                opener = opener.previous;
            }
            old_closer = closer;

            if (closercc === C_ASTERISK || closercc === C_UNDERSCORE) {
                if (!opener_found) {
                    closer = closer.next;
                } else {
                    // calculate actual number of delimiters used from closer
                    use_delims =
                      (closer.numdelims >= 2 && opener.numdelims >= 2) ? 2 : 1;

                    opener_inl = opener.node;
                    closer_inl = closer.node;

                    // remove used delimiters from stack elts and inlines
                    opener.numdelims -= use_delims;
                    closer.numdelims -= use_delims;
                    opener_inl._literal =
                        opener_inl._literal.slice(0,
                                                  opener_inl._literal.length - use_delims);
                    closer_inl._literal =
                        closer_inl._literal.slice(0,
                                                  closer_inl._literal.length - use_delims);

                    // build contents for new emph element
                    var emph = new Node(use_delims === 1 ? 'emph' : 'strong');

                    tmp = opener_inl._next;
                    while (tmp && tmp !== closer_inl) {
                        next = tmp._next;
                        tmp.unlink();
                        emph.appendChild(tmp);
                        tmp = next;
                    }

                    opener_inl.insertAfter(emph);

                    // remove elts between opener and closer in delimiters stack
                    removeDelimitersBetween(opener, closer);

                    // if opener has 0 delims, remove it and the inline
                    if (opener.numdelims === 0) {
                        opener_inl.unlink();
                        this.removeDelimiter(opener);
                    }

                    if (closer.numdelims === 0) {
                        closer_inl.unlink();
                        tempstack = closer.next;
                        this.removeDelimiter(closer);
                        closer = tempstack;
                    }

                }

            } else if (closercc === C_SINGLEQUOTE) {
                closer.node._literal = "\u2019";
                if (opener_found) {
                    opener.node._literal = "\u2018";
                }
                closer = closer.next;

            } else if (closercc === C_DOUBLEQUOTE) {
                closer.node._literal = "\u201D";
                if (opener_found) {
                    opener.node.literal = "\u201C";
                }
                closer = closer.next;

            }
            if (!opener_found && !odd_match) {
                // Set lower bound for future searches for openers:
                // We don't do this with odd_match because a **
                // that doesn't match an earlier * might turn into
                // an opener, and the * might be matched by something
                // else.
                openers_bottom[closercc] = old_closer.previous;
                if (!old_closer.can_open) {
                    // We can remove a closer that can't be an opener,
                    // once we've seen there's no matching opener:
                    this.removeDelimiter(old_closer);
                }
            }
        }

    }

    // remove all delimiters
    while (this.delimiters !== null && this.delimiters !== stack_bottom) {
        this.removeDelimiter(this.delimiters);
    }
};

// Attempt to parse link title (sans quotes), returning the string
// or null if no match.
var parseLinkTitle = function() {
    var title = this.match(reLinkTitle);
    if (title === null) {
        return null;
    } else {
        // chop off quotes from title and unescape:
        return unescapeString(title.substr(1, title.length - 2));
    }
};

// Attempt to parse link destination, returning the string or
// null if no match.
var parseLinkDestination = function() {
    var res = this.match(reLinkDestinationBraces);
    if (res === null) {
        // TODO handrolled parser; res should be null or the string
        var savepos = this.pos;
        var openparens = 0;
        var c;
        while ((c = this.peek()) !== -1) {
            if (c === C_BACKSLASH) {
                this.pos += 1;
                if (this.peek() !== -1) {
                    this.pos += 1;
                }
            } else if (c === C_OPEN_PAREN) {
                this.pos += 1;
                openparens += 1;
            } else if (c === C_CLOSE_PAREN) {
                if (openparens < 1) {
                    break;
                } else {
                    this.pos += 1;
                    openparens -= 1;
                }
            } else if (reWhitespaceChar.exec(fromCodePoint(c)) !== null) {
                break;
            } else {
                this.pos += 1;
            }
        }
        res = this.subject.substr(savepos, this.pos - savepos);
        return normalizeURI(unescapeString(res));
    } else {  // chop off surrounding <..>:
        return normalizeURI(unescapeString(res.substr(1, res.length - 2)));
    }
};

// Attempt to parse a link label, returning number of characters parsed.
var parseLinkLabel = function() {
    var m = this.match(reLinkLabel);
    // Note:  our regex will allow something of form [..\];
    // we disallow it here rather than using lookahead in the regex:
    if (m === null || m.length > 1001 || /[^\\]\\\]$/.exec(m)) {
        return 0;
    } else {
        return m.length;
    }
};

// Add open bracket to delimiter stack and add a text node to block's children.
var parseOpenBracket = function(block) {
    var startpos = this.pos;
    this.pos += 1;

    var node = text('[');
    block.appendChild(node);

    // Add entry to stack for this opener
    this.addBracket(node, startpos, false);
    return true;
};

// IF next character is [, and ! delimiter to delimiter stack and
// add a text node to block's children.  Otherwise just add a text node.
var parseBang = function(block) {
    var startpos = this.pos;
    this.pos += 1;
    if (this.peek() === C_OPEN_BRACKET) {
        this.pos += 1;

        var node = text('![');
        block.appendChild(node);

        // Add entry to stack for this opener
        this.addBracket(node, startpos + 1, true);
    } else {
        block.appendChild(text('!'));
    }
    return true;
};

// Try to match close bracket against an opening in the delimiter
// stack.  Add either a link or image, or a plain [ character,
// to block's children.  If there is a matching delimiter,
// remove it from the delimiter stack.
var parseCloseBracket = function(block) {
    var startpos;
    var is_image;
    var dest;
    var title;
    var matched = false;
    var reflabel;
    var opener;

    this.pos += 1;
    startpos = this.pos;

    // get last [ or ![
    opener = this.brackets;

    if (opener === null) {
        // no matched opener, just return a literal
        block.appendChild(text(']'));
        return true;
    }

    if (!opener.active) {
        // no matched opener, just return a literal
        block.appendChild(text(']'));
        // take opener off brackets stack
        this.removeBracket();
        return true;
    }

    // If we got here, open is a potential opener
    is_image = opener.image;

    // Check to see if we have a link/image

    var savepos = this.pos;

    // Inline link?
    if (this.peek() === C_OPEN_PAREN) {
        this.pos++;
        if (this.spnl() &&
            ((dest = this.parseLinkDestination()) !== null) &&
            this.spnl() &&
            // make sure there's a space before the title:
            (reWhitespaceChar.test(this.subject.charAt(this.pos - 1)) &&
             (title = this.parseLinkTitle()) || true) &&
            this.spnl() &&
            this.peek() === C_CLOSE_PAREN) {
            this.pos += 1;
            matched = true;
        } else {
            this.pos = savepos;
        }
    }

    if (!matched) {

        // Next, see if there's a link label
        var beforelabel = this.pos;
        var n = this.parseLinkLabel();
        if (n > 2) {
            reflabel = this.subject.slice(beforelabel, beforelabel + n);
        } else if (!opener.bracketAfter) {
            // Empty or missing second label means to use the first label as the reference.
            // The reference must not contain a bracket. If we know there's a bracket, we don't even bother checking it.
            reflabel = this.subject.slice(opener.index, startpos);
        }
        if (n === 0) {
            // If shortcut reference link, rewind before spaces we skipped.
            this.pos = savepos;
        }

        if (reflabel) {
            // lookup rawlabel in refmap
            var link = this.refmap[normalizeReference(reflabel)];
            if (link) {
                dest = link.destination;
                title = link.title;
                matched = true;
            }
        }
    }

    if (matched) {
        var node = new Node(is_image ? 'image' : 'link');
        node._destination = dest;
        node._title = title || '';

        var tmp, next;
        tmp = opener.node._next;
        while (tmp) {
            next = tmp._next;
            tmp.unlink();
            node.appendChild(tmp);
            tmp = next;
        }
        block.appendChild(node);
        this.processEmphasis(opener.previousDelimiter);
        this.removeBracket();
        opener.node.unlink();

        // We remove this bracket and processEmphasis will remove later delimiters.
        // Now, for a link, we also deactivate earlier link openers.
        // (no links in links)
        if (!is_image) {
          opener = this.brackets;
          while (opener !== null) {
            if (!opener.image) {
                opener.active = false; // deactivate this opener
            }
            opener = opener.previous;
          }
        }

        return true;

    } else { // no match

        this.removeBracket();  // remove this opener from stack
        this.pos = startpos;
        block.appendChild(text(']'));
        return true;
    }

};

var addBracket = function(node, index, image) {
    if (this.brackets !== null) {
        this.brackets.bracketAfter = true;
    }
    this.brackets = { node: node,
                      previous: this.brackets,
                      previousDelimiter: this.delimiters,
                      index: index,
                      image: image,
                      active: true };
};

var removeBracket = function() {
    this.brackets = this.brackets.previous;
};

// Attempt to parse an entity.
var parseEntity = function(block) {
    var m;
    if ((m = this.match(reEntityHere))) {
        block.appendChild(text(decodeHTML(m)));
        return true;
    } else {
        return false;
    }
};

// Parse a run of ordinary characters, or a single character with
// a special meaning in markdown, as a plain string.
var parseString = function(block) {
    var m;
    if ((m = this.match(reMain))) {
        if (this.options.smart) {
            block.appendChild(text(
                m.replace(reEllipses, "\u2026")
                    .replace(reDash, function(chars) {
                        var enCount = 0;
                        var emCount = 0;
                        if (chars.length % 3 === 0) { // If divisible by 3, use all em dashes
                            emCount = chars.length / 3;
                        } else if (chars.length % 2 === 0) { // If divisible by 2, use all en dashes
                            enCount = chars.length / 2;
                        } else if (chars.length % 3 === 2) { // If 2 extra dashes, use en dash for last 2; em dashes for rest
                            enCount = 1;
                            emCount = (chars.length - 2) / 3;
                        } else { // Use en dashes for last 4 hyphens; em dashes for rest
                            enCount = 2;
                            emCount = (chars.length - 4) / 3;
                        }
                        return "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
                    })));
        } else {
            block.appendChild(text(m));
        }
        return true;
    } else {
        return false;
    }
};

// Parse a newline.  If it was preceded by two spaces, return a hard
// line break; otherwise a soft line break.
var parseNewline = function(block) {
    this.pos += 1; // assume we're at a \n
    // check previous node for trailing spaces
    var lastc = block._lastChild;
    if (lastc && lastc.type === 'text' && lastc._literal[lastc._literal.length - 1] === ' ') {
        var hardbreak = lastc._literal[lastc._literal.length - 2] === ' ';
        lastc._literal = lastc._literal.replace(reFinalSpace, '');
        block.appendChild(new Node(hardbreak ? 'linebreak' : 'softbreak'));
    } else {
        block.appendChild(new Node('softbreak'));
    }
    this.match(reInitialSpace); // gobble leading spaces in next line
    return true;
};

// Attempt to parse a link reference, modifying refmap.
var parseReference = function(s, refmap) {
    this.subject = s;
    this.pos = 0;
    var rawlabel;
    var dest;
    var title;
    var matchChars;
    var startpos = this.pos;

    // label:
    matchChars = this.parseLinkLabel();
    if (matchChars === 0) {
        return 0;
    } else {
        rawlabel = this.subject.substr(0, matchChars);
    }

    // colon:
    if (this.peek() === C_COLON) {
        this.pos++;
    } else {
        this.pos = startpos;
        return 0;
    }

    //  link url
    this.spnl();

    dest = this.parseLinkDestination();
    if (dest === null || dest.length === 0) {
        this.pos = startpos;
        return 0;
    }

    var beforetitle = this.pos;
    this.spnl();
    title = this.parseLinkTitle();
    if (title === null) {
        title = '';
        // rewind before spaces
        this.pos = beforetitle;
    }

    // make sure we're at line end:
    var atLineEnd = true;
    if (this.match(reSpaceAtEndOfLine) === null) {
        if (title === '') {
            atLineEnd = false;
        } else {
            // the potential title we found is not at the line end,
            // but it could still be a legal link reference if we
            // discard the title
            title = '';
            // rewind before spaces
            this.pos = beforetitle;
            // and instead check if the link URL is at the line end
            atLineEnd = this.match(reSpaceAtEndOfLine) !== null;
        }
    }

    if (!atLineEnd) {
        this.pos = startpos;
        return 0;
    }

    var normlabel = normalizeReference(rawlabel);
    if (normlabel === '') {
        // label must contain non-whitespace characters
        this.pos = startpos;
        return 0;
    }

    if (!refmap[normlabel]) {
        refmap[normlabel] = { destination: dest, title: title };
    }
    return this.pos - startpos;
};

// Parse the next inline element in subject, advancing subject position.
// On success, add the result to block's children and return true.
// On failure, return false.
var parseInline = function(block) {
    var res = false;
    var c = this.peek();
    if (c === -1) {
        return false;
    }
    switch(c) {
    case C_NEWLINE:
        res = this.parseNewline(block);
        break;
    case C_BACKSLASH:
        res = this.parseBackslash(block);
        break;
    case C_BACKTICK:
        res = this.parseBackticks(block);
        break;
    case C_ASTERISK:
    case C_UNDERSCORE:
        res = this.handleDelim(c, block);
        break;
    case C_SINGLEQUOTE:
    case C_DOUBLEQUOTE:
        res = this.options.smart && this.handleDelim(c, block);
        break;
    case C_OPEN_BRACKET:
        res = this.parseOpenBracket(block);
        break;
    case C_BANG:
        res = this.parseBang(block);
        break;
    case C_CLOSE_BRACKET:
        res = this.parseCloseBracket(block);
        break;
    case C_LESSTHAN:
        res = this.parseAutolink(block) || this.parseHtmlTag(block);
        break;
    case C_AMPERSAND:
        res = this.parseEntity(block);
        break;
    default:
        res = this.parseString(block);
        break;
    }
    if (!res) {
        this.pos += 1;
        block.appendChild(text(fromCodePoint(c)));
    }

    return true;
};

// Parse string content in block into inline children,
// using refmap to resolve references.
var parseInlines = function(block) {
    this.subject = block._string_content.trim();
    this.pos = 0;
    this.delimiters = null;
    this.brackets = null;
    while (this.parseInline(block)) {
    }
    block._string_content = null; // allow raw string to be garbage collected
    this.processEmphasis(null);
};

// The InlineParser object.
function InlineParser(options){
    return {
        subject: '',
        delimiters: null,  // used by handleDelim method
        brackets: null,
        pos: 0,
        refmap: {},
        match: match,
        peek: peek,
        spnl: spnl,
        parseBackticks: parseBackticks,
        parseBackslash: parseBackslash,
        parseAutolink: parseAutolink,
        parseHtmlTag: parseHtmlTag,
        scanDelims: scanDelims,
        handleDelim: handleDelim,
        parseLinkTitle: parseLinkTitle,
        parseLinkDestination: parseLinkDestination,
        parseLinkLabel: parseLinkLabel,
        parseOpenBracket: parseOpenBracket,
        parseBang: parseBang,
        parseCloseBracket: parseCloseBracket,
        addBracket: addBracket,
        removeBracket: removeBracket,
        parseEntity: parseEntity,
        parseString: parseString,
        parseNewline: parseNewline,
        parseReference: parseReference,
        parseInline: parseInline,
        processEmphasis: processEmphasis,
        removeDelimiter: removeDelimiter,
        options: options || {},
        parse: parseInlines
    };
}

module.exports = InlineParser;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* The bulk of this code derives from https://github.com/dmoscrop/fold-case
But in addition to case-folding, we also normalize whitespace.

fold-case is Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*eslint-disable  key-spacing, comma-spacing */

var regex = /[ \t\r\n]+|[A-Z\xB5\xC0-\xD6\xD8-\xDF\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u0149\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u017F\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C5\u01C7\u01C8\u01CA\u01CB\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F0-\u01F2\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0345\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03AB\u03B0\u03C2\u03CF-\u03D1\u03D5\u03D6\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F0\u03F1\u03F4\u03F5\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u0587\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E96-\u1E9B\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F50\u1F52\u1F54\u1F56\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1F80-\u1FAF\u1FB2-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD2\u1FD3\u1FD6-\u1FDB\u1FE2-\u1FE4\u1FE6-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A\u212B\u2132\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0\uA7B1\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27]|\uD806[\uDCA0-\uDCBF]/g;

var map = {'A':'a','B':'b','C':'c','D':'d','E':'e','F':'f','G':'g','H':'h','I':'i','J':'j','K':'k','L':'l','M':'m','N':'n','O':'o','P':'p','Q':'q','R':'r','S':'s','T':'t','U':'u','V':'v','W':'w','X':'x','Y':'y','Z':'z','\xB5':'\u03BC','\xC0':'\xE0','\xC1':'\xE1','\xC2':'\xE2','\xC3':'\xE3','\xC4':'\xE4','\xC5':'\xE5','\xC6':'\xE6','\xC7':'\xE7','\xC8':'\xE8','\xC9':'\xE9','\xCA':'\xEA','\xCB':'\xEB','\xCC':'\xEC','\xCD':'\xED','\xCE':'\xEE','\xCF':'\xEF','\xD0':'\xF0','\xD1':'\xF1','\xD2':'\xF2','\xD3':'\xF3','\xD4':'\xF4','\xD5':'\xF5','\xD6':'\xF6','\xD8':'\xF8','\xD9':'\xF9','\xDA':'\xFA','\xDB':'\xFB','\xDC':'\xFC','\xDD':'\xFD','\xDE':'\xFE','\u0100':'\u0101','\u0102':'\u0103','\u0104':'\u0105','\u0106':'\u0107','\u0108':'\u0109','\u010A':'\u010B','\u010C':'\u010D','\u010E':'\u010F','\u0110':'\u0111','\u0112':'\u0113','\u0114':'\u0115','\u0116':'\u0117','\u0118':'\u0119','\u011A':'\u011B','\u011C':'\u011D','\u011E':'\u011F','\u0120':'\u0121','\u0122':'\u0123','\u0124':'\u0125','\u0126':'\u0127','\u0128':'\u0129','\u012A':'\u012B','\u012C':'\u012D','\u012E':'\u012F','\u0132':'\u0133','\u0134':'\u0135','\u0136':'\u0137','\u0139':'\u013A','\u013B':'\u013C','\u013D':'\u013E','\u013F':'\u0140','\u0141':'\u0142','\u0143':'\u0144','\u0145':'\u0146','\u0147':'\u0148','\u014A':'\u014B','\u014C':'\u014D','\u014E':'\u014F','\u0150':'\u0151','\u0152':'\u0153','\u0154':'\u0155','\u0156':'\u0157','\u0158':'\u0159','\u015A':'\u015B','\u015C':'\u015D','\u015E':'\u015F','\u0160':'\u0161','\u0162':'\u0163','\u0164':'\u0165','\u0166':'\u0167','\u0168':'\u0169','\u016A':'\u016B','\u016C':'\u016D','\u016E':'\u016F','\u0170':'\u0171','\u0172':'\u0173','\u0174':'\u0175','\u0176':'\u0177','\u0178':'\xFF','\u0179':'\u017A','\u017B':'\u017C','\u017D':'\u017E','\u017F':'s','\u0181':'\u0253','\u0182':'\u0183','\u0184':'\u0185','\u0186':'\u0254','\u0187':'\u0188','\u0189':'\u0256','\u018A':'\u0257','\u018B':'\u018C','\u018E':'\u01DD','\u018F':'\u0259','\u0190':'\u025B','\u0191':'\u0192','\u0193':'\u0260','\u0194':'\u0263','\u0196':'\u0269','\u0197':'\u0268','\u0198':'\u0199','\u019C':'\u026F','\u019D':'\u0272','\u019F':'\u0275','\u01A0':'\u01A1','\u01A2':'\u01A3','\u01A4':'\u01A5','\u01A6':'\u0280','\u01A7':'\u01A8','\u01A9':'\u0283','\u01AC':'\u01AD','\u01AE':'\u0288','\u01AF':'\u01B0','\u01B1':'\u028A','\u01B2':'\u028B','\u01B3':'\u01B4','\u01B5':'\u01B6','\u01B7':'\u0292','\u01B8':'\u01B9','\u01BC':'\u01BD','\u01C4':'\u01C6','\u01C5':'\u01C6','\u01C7':'\u01C9','\u01C8':'\u01C9','\u01CA':'\u01CC','\u01CB':'\u01CC','\u01CD':'\u01CE','\u01CF':'\u01D0','\u01D1':'\u01D2','\u01D3':'\u01D4','\u01D5':'\u01D6','\u01D7':'\u01D8','\u01D9':'\u01DA','\u01DB':'\u01DC','\u01DE':'\u01DF','\u01E0':'\u01E1','\u01E2':'\u01E3','\u01E4':'\u01E5','\u01E6':'\u01E7','\u01E8':'\u01E9','\u01EA':'\u01EB','\u01EC':'\u01ED','\u01EE':'\u01EF','\u01F1':'\u01F3','\u01F2':'\u01F3','\u01F4':'\u01F5','\u01F6':'\u0195','\u01F7':'\u01BF','\u01F8':'\u01F9','\u01FA':'\u01FB','\u01FC':'\u01FD','\u01FE':'\u01FF','\u0200':'\u0201','\u0202':'\u0203','\u0204':'\u0205','\u0206':'\u0207','\u0208':'\u0209','\u020A':'\u020B','\u020C':'\u020D','\u020E':'\u020F','\u0210':'\u0211','\u0212':'\u0213','\u0214':'\u0215','\u0216':'\u0217','\u0218':'\u0219','\u021A':'\u021B','\u021C':'\u021D','\u021E':'\u021F','\u0220':'\u019E','\u0222':'\u0223','\u0224':'\u0225','\u0226':'\u0227','\u0228':'\u0229','\u022A':'\u022B','\u022C':'\u022D','\u022E':'\u022F','\u0230':'\u0231','\u0232':'\u0233','\u023A':'\u2C65','\u023B':'\u023C','\u023D':'\u019A','\u023E':'\u2C66','\u0241':'\u0242','\u0243':'\u0180','\u0244':'\u0289','\u0245':'\u028C','\u0246':'\u0247','\u0248':'\u0249','\u024A':'\u024B','\u024C':'\u024D','\u024E':'\u024F','\u0345':'\u03B9','\u0370':'\u0371','\u0372':'\u0373','\u0376':'\u0377','\u037F':'\u03F3','\u0386':'\u03AC','\u0388':'\u03AD','\u0389':'\u03AE','\u038A':'\u03AF','\u038C':'\u03CC','\u038E':'\u03CD','\u038F':'\u03CE','\u0391':'\u03B1','\u0392':'\u03B2','\u0393':'\u03B3','\u0394':'\u03B4','\u0395':'\u03B5','\u0396':'\u03B6','\u0397':'\u03B7','\u0398':'\u03B8','\u0399':'\u03B9','\u039A':'\u03BA','\u039B':'\u03BB','\u039C':'\u03BC','\u039D':'\u03BD','\u039E':'\u03BE','\u039F':'\u03BF','\u03A0':'\u03C0','\u03A1':'\u03C1','\u03A3':'\u03C3','\u03A4':'\u03C4','\u03A5':'\u03C5','\u03A6':'\u03C6','\u03A7':'\u03C7','\u03A8':'\u03C8','\u03A9':'\u03C9','\u03AA':'\u03CA','\u03AB':'\u03CB','\u03C2':'\u03C3','\u03CF':'\u03D7','\u03D0':'\u03B2','\u03D1':'\u03B8','\u03D5':'\u03C6','\u03D6':'\u03C0','\u03D8':'\u03D9','\u03DA':'\u03DB','\u03DC':'\u03DD','\u03DE':'\u03DF','\u03E0':'\u03E1','\u03E2':'\u03E3','\u03E4':'\u03E5','\u03E6':'\u03E7','\u03E8':'\u03E9','\u03EA':'\u03EB','\u03EC':'\u03ED','\u03EE':'\u03EF','\u03F0':'\u03BA','\u03F1':'\u03C1','\u03F4':'\u03B8','\u03F5':'\u03B5','\u03F7':'\u03F8','\u03F9':'\u03F2','\u03FA':'\u03FB','\u03FD':'\u037B','\u03FE':'\u037C','\u03FF':'\u037D','\u0400':'\u0450','\u0401':'\u0451','\u0402':'\u0452','\u0403':'\u0453','\u0404':'\u0454','\u0405':'\u0455','\u0406':'\u0456','\u0407':'\u0457','\u0408':'\u0458','\u0409':'\u0459','\u040A':'\u045A','\u040B':'\u045B','\u040C':'\u045C','\u040D':'\u045D','\u040E':'\u045E','\u040F':'\u045F','\u0410':'\u0430','\u0411':'\u0431','\u0412':'\u0432','\u0413':'\u0433','\u0414':'\u0434','\u0415':'\u0435','\u0416':'\u0436','\u0417':'\u0437','\u0418':'\u0438','\u0419':'\u0439','\u041A':'\u043A','\u041B':'\u043B','\u041C':'\u043C','\u041D':'\u043D','\u041E':'\u043E','\u041F':'\u043F','\u0420':'\u0440','\u0421':'\u0441','\u0422':'\u0442','\u0423':'\u0443','\u0424':'\u0444','\u0425':'\u0445','\u0426':'\u0446','\u0427':'\u0447','\u0428':'\u0448','\u0429':'\u0449','\u042A':'\u044A','\u042B':'\u044B','\u042C':'\u044C','\u042D':'\u044D','\u042E':'\u044E','\u042F':'\u044F','\u0460':'\u0461','\u0462':'\u0463','\u0464':'\u0465','\u0466':'\u0467','\u0468':'\u0469','\u046A':'\u046B','\u046C':'\u046D','\u046E':'\u046F','\u0470':'\u0471','\u0472':'\u0473','\u0474':'\u0475','\u0476':'\u0477','\u0478':'\u0479','\u047A':'\u047B','\u047C':'\u047D','\u047E':'\u047F','\u0480':'\u0481','\u048A':'\u048B','\u048C':'\u048D','\u048E':'\u048F','\u0490':'\u0491','\u0492':'\u0493','\u0494':'\u0495','\u0496':'\u0497','\u0498':'\u0499','\u049A':'\u049B','\u049C':'\u049D','\u049E':'\u049F','\u04A0':'\u04A1','\u04A2':'\u04A3','\u04A4':'\u04A5','\u04A6':'\u04A7','\u04A8':'\u04A9','\u04AA':'\u04AB','\u04AC':'\u04AD','\u04AE':'\u04AF','\u04B0':'\u04B1','\u04B2':'\u04B3','\u04B4':'\u04B5','\u04B6':'\u04B7','\u04B8':'\u04B9','\u04BA':'\u04BB','\u04BC':'\u04BD','\u04BE':'\u04BF','\u04C0':'\u04CF','\u04C1':'\u04C2','\u04C3':'\u04C4','\u04C5':'\u04C6','\u04C7':'\u04C8','\u04C9':'\u04CA','\u04CB':'\u04CC','\u04CD':'\u04CE','\u04D0':'\u04D1','\u04D2':'\u04D3','\u04D4':'\u04D5','\u04D6':'\u04D7','\u04D8':'\u04D9','\u04DA':'\u04DB','\u04DC':'\u04DD','\u04DE':'\u04DF','\u04E0':'\u04E1','\u04E2':'\u04E3','\u04E4':'\u04E5','\u04E6':'\u04E7','\u04E8':'\u04E9','\u04EA':'\u04EB','\u04EC':'\u04ED','\u04EE':'\u04EF','\u04F0':'\u04F1','\u04F2':'\u04F3','\u04F4':'\u04F5','\u04F6':'\u04F7','\u04F8':'\u04F9','\u04FA':'\u04FB','\u04FC':'\u04FD','\u04FE':'\u04FF','\u0500':'\u0501','\u0502':'\u0503','\u0504':'\u0505','\u0506':'\u0507','\u0508':'\u0509','\u050A':'\u050B','\u050C':'\u050D','\u050E':'\u050F','\u0510':'\u0511','\u0512':'\u0513','\u0514':'\u0515','\u0516':'\u0517','\u0518':'\u0519','\u051A':'\u051B','\u051C':'\u051D','\u051E':'\u051F','\u0520':'\u0521','\u0522':'\u0523','\u0524':'\u0525','\u0526':'\u0527','\u0528':'\u0529','\u052A':'\u052B','\u052C':'\u052D','\u052E':'\u052F','\u0531':'\u0561','\u0532':'\u0562','\u0533':'\u0563','\u0534':'\u0564','\u0535':'\u0565','\u0536':'\u0566','\u0537':'\u0567','\u0538':'\u0568','\u0539':'\u0569','\u053A':'\u056A','\u053B':'\u056B','\u053C':'\u056C','\u053D':'\u056D','\u053E':'\u056E','\u053F':'\u056F','\u0540':'\u0570','\u0541':'\u0571','\u0542':'\u0572','\u0543':'\u0573','\u0544':'\u0574','\u0545':'\u0575','\u0546':'\u0576','\u0547':'\u0577','\u0548':'\u0578','\u0549':'\u0579','\u054A':'\u057A','\u054B':'\u057B','\u054C':'\u057C','\u054D':'\u057D','\u054E':'\u057E','\u054F':'\u057F','\u0550':'\u0580','\u0551':'\u0581','\u0552':'\u0582','\u0553':'\u0583','\u0554':'\u0584','\u0555':'\u0585','\u0556':'\u0586','\u10A0':'\u2D00','\u10A1':'\u2D01','\u10A2':'\u2D02','\u10A3':'\u2D03','\u10A4':'\u2D04','\u10A5':'\u2D05','\u10A6':'\u2D06','\u10A7':'\u2D07','\u10A8':'\u2D08','\u10A9':'\u2D09','\u10AA':'\u2D0A','\u10AB':'\u2D0B','\u10AC':'\u2D0C','\u10AD':'\u2D0D','\u10AE':'\u2D0E','\u10AF':'\u2D0F','\u10B0':'\u2D10','\u10B1':'\u2D11','\u10B2':'\u2D12','\u10B3':'\u2D13','\u10B4':'\u2D14','\u10B5':'\u2D15','\u10B6':'\u2D16','\u10B7':'\u2D17','\u10B8':'\u2D18','\u10B9':'\u2D19','\u10BA':'\u2D1A','\u10BB':'\u2D1B','\u10BC':'\u2D1C','\u10BD':'\u2D1D','\u10BE':'\u2D1E','\u10BF':'\u2D1F','\u10C0':'\u2D20','\u10C1':'\u2D21','\u10C2':'\u2D22','\u10C3':'\u2D23','\u10C4':'\u2D24','\u10C5':'\u2D25','\u10C7':'\u2D27','\u10CD':'\u2D2D','\u1E00':'\u1E01','\u1E02':'\u1E03','\u1E04':'\u1E05','\u1E06':'\u1E07','\u1E08':'\u1E09','\u1E0A':'\u1E0B','\u1E0C':'\u1E0D','\u1E0E':'\u1E0F','\u1E10':'\u1E11','\u1E12':'\u1E13','\u1E14':'\u1E15','\u1E16':'\u1E17','\u1E18':'\u1E19','\u1E1A':'\u1E1B','\u1E1C':'\u1E1D','\u1E1E':'\u1E1F','\u1E20':'\u1E21','\u1E22':'\u1E23','\u1E24':'\u1E25','\u1E26':'\u1E27','\u1E28':'\u1E29','\u1E2A':'\u1E2B','\u1E2C':'\u1E2D','\u1E2E':'\u1E2F','\u1E30':'\u1E31','\u1E32':'\u1E33','\u1E34':'\u1E35','\u1E36':'\u1E37','\u1E38':'\u1E39','\u1E3A':'\u1E3B','\u1E3C':'\u1E3D','\u1E3E':'\u1E3F','\u1E40':'\u1E41','\u1E42':'\u1E43','\u1E44':'\u1E45','\u1E46':'\u1E47','\u1E48':'\u1E49','\u1E4A':'\u1E4B','\u1E4C':'\u1E4D','\u1E4E':'\u1E4F','\u1E50':'\u1E51','\u1E52':'\u1E53','\u1E54':'\u1E55','\u1E56':'\u1E57','\u1E58':'\u1E59','\u1E5A':'\u1E5B','\u1E5C':'\u1E5D','\u1E5E':'\u1E5F','\u1E60':'\u1E61','\u1E62':'\u1E63','\u1E64':'\u1E65','\u1E66':'\u1E67','\u1E68':'\u1E69','\u1E6A':'\u1E6B','\u1E6C':'\u1E6D','\u1E6E':'\u1E6F','\u1E70':'\u1E71','\u1E72':'\u1E73','\u1E74':'\u1E75','\u1E76':'\u1E77','\u1E78':'\u1E79','\u1E7A':'\u1E7B','\u1E7C':'\u1E7D','\u1E7E':'\u1E7F','\u1E80':'\u1E81','\u1E82':'\u1E83','\u1E84':'\u1E85','\u1E86':'\u1E87','\u1E88':'\u1E89','\u1E8A':'\u1E8B','\u1E8C':'\u1E8D','\u1E8E':'\u1E8F','\u1E90':'\u1E91','\u1E92':'\u1E93','\u1E94':'\u1E95','\u1E9B':'\u1E61','\u1EA0':'\u1EA1','\u1EA2':'\u1EA3','\u1EA4':'\u1EA5','\u1EA6':'\u1EA7','\u1EA8':'\u1EA9','\u1EAA':'\u1EAB','\u1EAC':'\u1EAD','\u1EAE':'\u1EAF','\u1EB0':'\u1EB1','\u1EB2':'\u1EB3','\u1EB4':'\u1EB5','\u1EB6':'\u1EB7','\u1EB8':'\u1EB9','\u1EBA':'\u1EBB','\u1EBC':'\u1EBD','\u1EBE':'\u1EBF','\u1EC0':'\u1EC1','\u1EC2':'\u1EC3','\u1EC4':'\u1EC5','\u1EC6':'\u1EC7','\u1EC8':'\u1EC9','\u1ECA':'\u1ECB','\u1ECC':'\u1ECD','\u1ECE':'\u1ECF','\u1ED0':'\u1ED1','\u1ED2':'\u1ED3','\u1ED4':'\u1ED5','\u1ED6':'\u1ED7','\u1ED8':'\u1ED9','\u1EDA':'\u1EDB','\u1EDC':'\u1EDD','\u1EDE':'\u1EDF','\u1EE0':'\u1EE1','\u1EE2':'\u1EE3','\u1EE4':'\u1EE5','\u1EE6':'\u1EE7','\u1EE8':'\u1EE9','\u1EEA':'\u1EEB','\u1EEC':'\u1EED','\u1EEE':'\u1EEF','\u1EF0':'\u1EF1','\u1EF2':'\u1EF3','\u1EF4':'\u1EF5','\u1EF6':'\u1EF7','\u1EF8':'\u1EF9','\u1EFA':'\u1EFB','\u1EFC':'\u1EFD','\u1EFE':'\u1EFF','\u1F08':'\u1F00','\u1F09':'\u1F01','\u1F0A':'\u1F02','\u1F0B':'\u1F03','\u1F0C':'\u1F04','\u1F0D':'\u1F05','\u1F0E':'\u1F06','\u1F0F':'\u1F07','\u1F18':'\u1F10','\u1F19':'\u1F11','\u1F1A':'\u1F12','\u1F1B':'\u1F13','\u1F1C':'\u1F14','\u1F1D':'\u1F15','\u1F28':'\u1F20','\u1F29':'\u1F21','\u1F2A':'\u1F22','\u1F2B':'\u1F23','\u1F2C':'\u1F24','\u1F2D':'\u1F25','\u1F2E':'\u1F26','\u1F2F':'\u1F27','\u1F38':'\u1F30','\u1F39':'\u1F31','\u1F3A':'\u1F32','\u1F3B':'\u1F33','\u1F3C':'\u1F34','\u1F3D':'\u1F35','\u1F3E':'\u1F36','\u1F3F':'\u1F37','\u1F48':'\u1F40','\u1F49':'\u1F41','\u1F4A':'\u1F42','\u1F4B':'\u1F43','\u1F4C':'\u1F44','\u1F4D':'\u1F45','\u1F59':'\u1F51','\u1F5B':'\u1F53','\u1F5D':'\u1F55','\u1F5F':'\u1F57','\u1F68':'\u1F60','\u1F69':'\u1F61','\u1F6A':'\u1F62','\u1F6B':'\u1F63','\u1F6C':'\u1F64','\u1F6D':'\u1F65','\u1F6E':'\u1F66','\u1F6F':'\u1F67','\u1FB8':'\u1FB0','\u1FB9':'\u1FB1','\u1FBA':'\u1F70','\u1FBB':'\u1F71','\u1FBE':'\u03B9','\u1FC8':'\u1F72','\u1FC9':'\u1F73','\u1FCA':'\u1F74','\u1FCB':'\u1F75','\u1FD8':'\u1FD0','\u1FD9':'\u1FD1','\u1FDA':'\u1F76','\u1FDB':'\u1F77','\u1FE8':'\u1FE0','\u1FE9':'\u1FE1','\u1FEA':'\u1F7A','\u1FEB':'\u1F7B','\u1FEC':'\u1FE5','\u1FF8':'\u1F78','\u1FF9':'\u1F79','\u1FFA':'\u1F7C','\u1FFB':'\u1F7D','\u2126':'\u03C9','\u212A':'k','\u212B':'\xE5','\u2132':'\u214E','\u2160':'\u2170','\u2161':'\u2171','\u2162':'\u2172','\u2163':'\u2173','\u2164':'\u2174','\u2165':'\u2175','\u2166':'\u2176','\u2167':'\u2177','\u2168':'\u2178','\u2169':'\u2179','\u216A':'\u217A','\u216B':'\u217B','\u216C':'\u217C','\u216D':'\u217D','\u216E':'\u217E','\u216F':'\u217F','\u2183':'\u2184','\u24B6':'\u24D0','\u24B7':'\u24D1','\u24B8':'\u24D2','\u24B9':'\u24D3','\u24BA':'\u24D4','\u24BB':'\u24D5','\u24BC':'\u24D6','\u24BD':'\u24D7','\u24BE':'\u24D8','\u24BF':'\u24D9','\u24C0':'\u24DA','\u24C1':'\u24DB','\u24C2':'\u24DC','\u24C3':'\u24DD','\u24C4':'\u24DE','\u24C5':'\u24DF','\u24C6':'\u24E0','\u24C7':'\u24E1','\u24C8':'\u24E2','\u24C9':'\u24E3','\u24CA':'\u24E4','\u24CB':'\u24E5','\u24CC':'\u24E6','\u24CD':'\u24E7','\u24CE':'\u24E8','\u24CF':'\u24E9','\u2C00':'\u2C30','\u2C01':'\u2C31','\u2C02':'\u2C32','\u2C03':'\u2C33','\u2C04':'\u2C34','\u2C05':'\u2C35','\u2C06':'\u2C36','\u2C07':'\u2C37','\u2C08':'\u2C38','\u2C09':'\u2C39','\u2C0A':'\u2C3A','\u2C0B':'\u2C3B','\u2C0C':'\u2C3C','\u2C0D':'\u2C3D','\u2C0E':'\u2C3E','\u2C0F':'\u2C3F','\u2C10':'\u2C40','\u2C11':'\u2C41','\u2C12':'\u2C42','\u2C13':'\u2C43','\u2C14':'\u2C44','\u2C15':'\u2C45','\u2C16':'\u2C46','\u2C17':'\u2C47','\u2C18':'\u2C48','\u2C19':'\u2C49','\u2C1A':'\u2C4A','\u2C1B':'\u2C4B','\u2C1C':'\u2C4C','\u2C1D':'\u2C4D','\u2C1E':'\u2C4E','\u2C1F':'\u2C4F','\u2C20':'\u2C50','\u2C21':'\u2C51','\u2C22':'\u2C52','\u2C23':'\u2C53','\u2C24':'\u2C54','\u2C25':'\u2C55','\u2C26':'\u2C56','\u2C27':'\u2C57','\u2C28':'\u2C58','\u2C29':'\u2C59','\u2C2A':'\u2C5A','\u2C2B':'\u2C5B','\u2C2C':'\u2C5C','\u2C2D':'\u2C5D','\u2C2E':'\u2C5E','\u2C60':'\u2C61','\u2C62':'\u026B','\u2C63':'\u1D7D','\u2C64':'\u027D','\u2C67':'\u2C68','\u2C69':'\u2C6A','\u2C6B':'\u2C6C','\u2C6D':'\u0251','\u2C6E':'\u0271','\u2C6F':'\u0250','\u2C70':'\u0252','\u2C72':'\u2C73','\u2C75':'\u2C76','\u2C7E':'\u023F','\u2C7F':'\u0240','\u2C80':'\u2C81','\u2C82':'\u2C83','\u2C84':'\u2C85','\u2C86':'\u2C87','\u2C88':'\u2C89','\u2C8A':'\u2C8B','\u2C8C':'\u2C8D','\u2C8E':'\u2C8F','\u2C90':'\u2C91','\u2C92':'\u2C93','\u2C94':'\u2C95','\u2C96':'\u2C97','\u2C98':'\u2C99','\u2C9A':'\u2C9B','\u2C9C':'\u2C9D','\u2C9E':'\u2C9F','\u2CA0':'\u2CA1','\u2CA2':'\u2CA3','\u2CA4':'\u2CA5','\u2CA6':'\u2CA7','\u2CA8':'\u2CA9','\u2CAA':'\u2CAB','\u2CAC':'\u2CAD','\u2CAE':'\u2CAF','\u2CB0':'\u2CB1','\u2CB2':'\u2CB3','\u2CB4':'\u2CB5','\u2CB6':'\u2CB7','\u2CB8':'\u2CB9','\u2CBA':'\u2CBB','\u2CBC':'\u2CBD','\u2CBE':'\u2CBF','\u2CC0':'\u2CC1','\u2CC2':'\u2CC3','\u2CC4':'\u2CC5','\u2CC6':'\u2CC7','\u2CC8':'\u2CC9','\u2CCA':'\u2CCB','\u2CCC':'\u2CCD','\u2CCE':'\u2CCF','\u2CD0':'\u2CD1','\u2CD2':'\u2CD3','\u2CD4':'\u2CD5','\u2CD6':'\u2CD7','\u2CD8':'\u2CD9','\u2CDA':'\u2CDB','\u2CDC':'\u2CDD','\u2CDE':'\u2CDF','\u2CE0':'\u2CE1','\u2CE2':'\u2CE3','\u2CEB':'\u2CEC','\u2CED':'\u2CEE','\u2CF2':'\u2CF3','\uA640':'\uA641','\uA642':'\uA643','\uA644':'\uA645','\uA646':'\uA647','\uA648':'\uA649','\uA64A':'\uA64B','\uA64C':'\uA64D','\uA64E':'\uA64F','\uA650':'\uA651','\uA652':'\uA653','\uA654':'\uA655','\uA656':'\uA657','\uA658':'\uA659','\uA65A':'\uA65B','\uA65C':'\uA65D','\uA65E':'\uA65F','\uA660':'\uA661','\uA662':'\uA663','\uA664':'\uA665','\uA666':'\uA667','\uA668':'\uA669','\uA66A':'\uA66B','\uA66C':'\uA66D','\uA680':'\uA681','\uA682':'\uA683','\uA684':'\uA685','\uA686':'\uA687','\uA688':'\uA689','\uA68A':'\uA68B','\uA68C':'\uA68D','\uA68E':'\uA68F','\uA690':'\uA691','\uA692':'\uA693','\uA694':'\uA695','\uA696':'\uA697','\uA698':'\uA699','\uA69A':'\uA69B','\uA722':'\uA723','\uA724':'\uA725','\uA726':'\uA727','\uA728':'\uA729','\uA72A':'\uA72B','\uA72C':'\uA72D','\uA72E':'\uA72F','\uA732':'\uA733','\uA734':'\uA735','\uA736':'\uA737','\uA738':'\uA739','\uA73A':'\uA73B','\uA73C':'\uA73D','\uA73E':'\uA73F','\uA740':'\uA741','\uA742':'\uA743','\uA744':'\uA745','\uA746':'\uA747','\uA748':'\uA749','\uA74A':'\uA74B','\uA74C':'\uA74D','\uA74E':'\uA74F','\uA750':'\uA751','\uA752':'\uA753','\uA754':'\uA755','\uA756':'\uA757','\uA758':'\uA759','\uA75A':'\uA75B','\uA75C':'\uA75D','\uA75E':'\uA75F','\uA760':'\uA761','\uA762':'\uA763','\uA764':'\uA765','\uA766':'\uA767','\uA768':'\uA769','\uA76A':'\uA76B','\uA76C':'\uA76D','\uA76E':'\uA76F','\uA779':'\uA77A','\uA77B':'\uA77C','\uA77D':'\u1D79','\uA77E':'\uA77F','\uA780':'\uA781','\uA782':'\uA783','\uA784':'\uA785','\uA786':'\uA787','\uA78B':'\uA78C','\uA78D':'\u0265','\uA790':'\uA791','\uA792':'\uA793','\uA796':'\uA797','\uA798':'\uA799','\uA79A':'\uA79B','\uA79C':'\uA79D','\uA79E':'\uA79F','\uA7A0':'\uA7A1','\uA7A2':'\uA7A3','\uA7A4':'\uA7A5','\uA7A6':'\uA7A7','\uA7A8':'\uA7A9','\uA7AA':'\u0266','\uA7AB':'\u025C','\uA7AC':'\u0261','\uA7AD':'\u026C','\uA7B0':'\u029E','\uA7B1':'\u0287','\uFF21':'\uFF41','\uFF22':'\uFF42','\uFF23':'\uFF43','\uFF24':'\uFF44','\uFF25':'\uFF45','\uFF26':'\uFF46','\uFF27':'\uFF47','\uFF28':'\uFF48','\uFF29':'\uFF49','\uFF2A':'\uFF4A','\uFF2B':'\uFF4B','\uFF2C':'\uFF4C','\uFF2D':'\uFF4D','\uFF2E':'\uFF4E','\uFF2F':'\uFF4F','\uFF30':'\uFF50','\uFF31':'\uFF51','\uFF32':'\uFF52','\uFF33':'\uFF53','\uFF34':'\uFF54','\uFF35':'\uFF55','\uFF36':'\uFF56','\uFF37':'\uFF57','\uFF38':'\uFF58','\uFF39':'\uFF59','\uFF3A':'\uFF5A','\uD801\uDC00':'\uD801\uDC28','\uD801\uDC01':'\uD801\uDC29','\uD801\uDC02':'\uD801\uDC2A','\uD801\uDC03':'\uD801\uDC2B','\uD801\uDC04':'\uD801\uDC2C','\uD801\uDC05':'\uD801\uDC2D','\uD801\uDC06':'\uD801\uDC2E','\uD801\uDC07':'\uD801\uDC2F','\uD801\uDC08':'\uD801\uDC30','\uD801\uDC09':'\uD801\uDC31','\uD801\uDC0A':'\uD801\uDC32','\uD801\uDC0B':'\uD801\uDC33','\uD801\uDC0C':'\uD801\uDC34','\uD801\uDC0D':'\uD801\uDC35','\uD801\uDC0E':'\uD801\uDC36','\uD801\uDC0F':'\uD801\uDC37','\uD801\uDC10':'\uD801\uDC38','\uD801\uDC11':'\uD801\uDC39','\uD801\uDC12':'\uD801\uDC3A','\uD801\uDC13':'\uD801\uDC3B','\uD801\uDC14':'\uD801\uDC3C','\uD801\uDC15':'\uD801\uDC3D','\uD801\uDC16':'\uD801\uDC3E','\uD801\uDC17':'\uD801\uDC3F','\uD801\uDC18':'\uD801\uDC40','\uD801\uDC19':'\uD801\uDC41','\uD801\uDC1A':'\uD801\uDC42','\uD801\uDC1B':'\uD801\uDC43','\uD801\uDC1C':'\uD801\uDC44','\uD801\uDC1D':'\uD801\uDC45','\uD801\uDC1E':'\uD801\uDC46','\uD801\uDC1F':'\uD801\uDC47','\uD801\uDC20':'\uD801\uDC48','\uD801\uDC21':'\uD801\uDC49','\uD801\uDC22':'\uD801\uDC4A','\uD801\uDC23':'\uD801\uDC4B','\uD801\uDC24':'\uD801\uDC4C','\uD801\uDC25':'\uD801\uDC4D','\uD801\uDC26':'\uD801\uDC4E','\uD801\uDC27':'\uD801\uDC4F','\uD806\uDCA0':'\uD806\uDCC0','\uD806\uDCA1':'\uD806\uDCC1','\uD806\uDCA2':'\uD806\uDCC2','\uD806\uDCA3':'\uD806\uDCC3','\uD806\uDCA4':'\uD806\uDCC4','\uD806\uDCA5':'\uD806\uDCC5','\uD806\uDCA6':'\uD806\uDCC6','\uD806\uDCA7':'\uD806\uDCC7','\uD806\uDCA8':'\uD806\uDCC8','\uD806\uDCA9':'\uD806\uDCC9','\uD806\uDCAA':'\uD806\uDCCA','\uD806\uDCAB':'\uD806\uDCCB','\uD806\uDCAC':'\uD806\uDCCC','\uD806\uDCAD':'\uD806\uDCCD','\uD806\uDCAE':'\uD806\uDCCE','\uD806\uDCAF':'\uD806\uDCCF','\uD806\uDCB0':'\uD806\uDCD0','\uD806\uDCB1':'\uD806\uDCD1','\uD806\uDCB2':'\uD806\uDCD2','\uD806\uDCB3':'\uD806\uDCD3','\uD806\uDCB4':'\uD806\uDCD4','\uD806\uDCB5':'\uD806\uDCD5','\uD806\uDCB6':'\uD806\uDCD6','\uD806\uDCB7':'\uD806\uDCD7','\uD806\uDCB8':'\uD806\uDCD8','\uD806\uDCB9':'\uD806\uDCD9','\uD806\uDCBA':'\uD806\uDCDA','\uD806\uDCBB':'\uD806\uDCDB','\uD806\uDCBC':'\uD806\uDCDC','\uD806\uDCBD':'\uD806\uDCDD','\uD806\uDCBE':'\uD806\uDCDE','\uD806\uDCBF':'\uD806\uDCDF','\xDF':'ss','\u0130':'i\u0307','\u0149':'\u02BCn','\u01F0':'j\u030C','\u0390':'\u03B9\u0308\u0301','\u03B0':'\u03C5\u0308\u0301','\u0587':'\u0565\u0582','\u1E96':'h\u0331','\u1E97':'t\u0308','\u1E98':'w\u030A','\u1E99':'y\u030A','\u1E9A':'a\u02BE','\u1E9E':'ss','\u1F50':'\u03C5\u0313','\u1F52':'\u03C5\u0313\u0300','\u1F54':'\u03C5\u0313\u0301','\u1F56':'\u03C5\u0313\u0342','\u1F80':'\u1F00\u03B9','\u1F81':'\u1F01\u03B9','\u1F82':'\u1F02\u03B9','\u1F83':'\u1F03\u03B9','\u1F84':'\u1F04\u03B9','\u1F85':'\u1F05\u03B9','\u1F86':'\u1F06\u03B9','\u1F87':'\u1F07\u03B9','\u1F88':'\u1F00\u03B9','\u1F89':'\u1F01\u03B9','\u1F8A':'\u1F02\u03B9','\u1F8B':'\u1F03\u03B9','\u1F8C':'\u1F04\u03B9','\u1F8D':'\u1F05\u03B9','\u1F8E':'\u1F06\u03B9','\u1F8F':'\u1F07\u03B9','\u1F90':'\u1F20\u03B9','\u1F91':'\u1F21\u03B9','\u1F92':'\u1F22\u03B9','\u1F93':'\u1F23\u03B9','\u1F94':'\u1F24\u03B9','\u1F95':'\u1F25\u03B9','\u1F96':'\u1F26\u03B9','\u1F97':'\u1F27\u03B9','\u1F98':'\u1F20\u03B9','\u1F99':'\u1F21\u03B9','\u1F9A':'\u1F22\u03B9','\u1F9B':'\u1F23\u03B9','\u1F9C':'\u1F24\u03B9','\u1F9D':'\u1F25\u03B9','\u1F9E':'\u1F26\u03B9','\u1F9F':'\u1F27\u03B9','\u1FA0':'\u1F60\u03B9','\u1FA1':'\u1F61\u03B9','\u1FA2':'\u1F62\u03B9','\u1FA3':'\u1F63\u03B9','\u1FA4':'\u1F64\u03B9','\u1FA5':'\u1F65\u03B9','\u1FA6':'\u1F66\u03B9','\u1FA7':'\u1F67\u03B9','\u1FA8':'\u1F60\u03B9','\u1FA9':'\u1F61\u03B9','\u1FAA':'\u1F62\u03B9','\u1FAB':'\u1F63\u03B9','\u1FAC':'\u1F64\u03B9','\u1FAD':'\u1F65\u03B9','\u1FAE':'\u1F66\u03B9','\u1FAF':'\u1F67\u03B9','\u1FB2':'\u1F70\u03B9','\u1FB3':'\u03B1\u03B9','\u1FB4':'\u03AC\u03B9','\u1FB6':'\u03B1\u0342','\u1FB7':'\u03B1\u0342\u03B9','\u1FBC':'\u03B1\u03B9','\u1FC2':'\u1F74\u03B9','\u1FC3':'\u03B7\u03B9','\u1FC4':'\u03AE\u03B9','\u1FC6':'\u03B7\u0342','\u1FC7':'\u03B7\u0342\u03B9','\u1FCC':'\u03B7\u03B9','\u1FD2':'\u03B9\u0308\u0300','\u1FD3':'\u03B9\u0308\u0301','\u1FD6':'\u03B9\u0342','\u1FD7':'\u03B9\u0308\u0342','\u1FE2':'\u03C5\u0308\u0300','\u1FE3':'\u03C5\u0308\u0301','\u1FE4':'\u03C1\u0313','\u1FE6':'\u03C5\u0342','\u1FE7':'\u03C5\u0308\u0342','\u1FF2':'\u1F7C\u03B9','\u1FF3':'\u03C9\u03B9','\u1FF4':'\u03CE\u03B9','\u1FF6':'\u03C9\u0342','\u1FF7':'\u03C9\u0342\u03B9','\u1FFC':'\u03C9\u03B9','\uFB00':'ff','\uFB01':'fi','\uFB02':'fl','\uFB03':'ffi','\uFB04':'ffl','\uFB05':'st','\uFB06':'st','\uFB13':'\u0574\u0576','\uFB14':'\u0574\u0565','\uFB15':'\u0574\u056B','\uFB16':'\u057E\u0576','\uFB17':'\u0574\u056D'};

// Normalize reference label: collapse internal whitespace
// to single space, remove leading/trailing whitespace, case fold.
module.exports = function(string) {
    return string.slice(1, string.length - 1).trim().replace(regex, function($0) {
        // Note: there is no need to check `hasOwnProperty($0)` here.
        // If character not found in lookup table, it must be whitespace.
        return map[$0] || ' ';
    });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// derived from https://github.com/mathiasbynens/String.fromCodePoint
/*! http://mths.be/fromcodepoint v0.2.1 by @mathias */
if (String.fromCodePoint) {
    module.exports = function (_) {
        try {
            return String.fromCodePoint(_);
        } catch (e) {
            if (e instanceof RangeError) {
                return String.fromCharCode(0xFFFD);
            }
            throw e;
        }
    };

} else {

  var stringFromCharCode = String.fromCharCode;
  var floor = Math.floor;
  var fromCodePoint = function() {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;
      if (!length) {
          return '';
      }
      var result = '';
      while (++index < length) {
          var codePoint = Number(arguments[index]);
          if (
              !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                  codePoint < 0 || // not a valid Unicode code point
                  codePoint > 0x10FFFF || // not a valid Unicode code point
                  floor(codePoint) !== codePoint // not an integer
          ) {
              return String.fromCharCode(0xFFFD);
          }
          if (codePoint <= 0xFFFF) { // BMP code point
              codeUnits.push(codePoint);
          } else { // Astral code point; split in surrogate halves
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x10000;
              highSurrogate = (codePoint >> 10) + 0xD800;
              lowSurrogate = (codePoint % 0x400) + 0xDC00;
              codeUnits.push(highSurrogate, lowSurrogate);
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
          }
      }
      return result;
  };
  module.exports = fromCodePoint;
}


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/*! http://mths.be/repeat v0.2.0 by @mathias */
if (!String.prototype.repeat) {
	(function() {
		'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
		var defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {}
			return result;
		}());
		var repeat = function(count) {
			if (this == null) {
				throw TypeError();
			}
			var string = String(this);
			// `ToInteger`
			var n = count ? Number(count) : 0;
			if (n != n) { // better `isNaN`
				n = 0;
			}
			// Account for out-of-bounds indices
			if (n < 0 || n == Infinity) {
				throw RangeError();
			}
			var result = '';
			while (n) {
				if (n % 2 == 1) {
					result += string;
				}
				if (n > 1) {
					string += string;
				}
				n >>= 1;
			}
			return result;
		};
		if (defineProperty) {
			defineProperty(String.prototype, 'repeat', {
				'value': repeat,
				'configurable': true,
				'writable': true
			});
		} else {
			String.prototype.repeat = repeat;
		}
	}());
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Renderer = __webpack_require__(6);

var reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i;
var reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i;

var potentiallyUnsafe = function(url) {
  return reUnsafeProtocol.test(url) &&
      !reSafeDataProtocol.test(url);
};

// Helper function to produce an HTML tag.
function tag(name, attrs, selfclosing) {
  if (this.disableTags > 0) {
    return;
  }
  this.buffer += ('<' + name);
  if (attrs && attrs.length > 0) {
    var i = 0;
    var attrib;
    while ((attrib = attrs[i]) !== undefined) {
      this.buffer += (' ' + attrib[0] + '="' + attrib[1] + '"');
      i++;
    }
  }
  if (selfclosing) {
    this.buffer += ' /';
  }
  this.buffer += '>';
  this.lastOut = '>';
}

function HtmlRenderer(options) {
  options = options || {};
  // by default, soft breaks are rendered as newlines in HTML
  options.softbreak = options.softbreak || '\n';
  // set to "<br />" to make them hard breaks
  // set to " " if you want to ignore line wrapping in source

  this.disableTags = 0;
  this.lastOut = "\n";
  this.options = options;
}

/* Node methods */

function text(node) {
  this.out(node.literal);
}

function softbreak() {
  this.lit(this.options.softbreak);
}

function linebreak() {
  this.tag('br', [], true);
  this.cr();
}

function link(node, entering) {
  var attrs = this.attrs(node);
  if (entering) {
    if (!(this.options.safe && potentiallyUnsafe(node.destination))) {
      attrs.push(['href', this.esc(node.destination, true)]);
    }
    if (node.title) {
      attrs.push(['title', this.esc(node.title, true)]);
    }
    this.tag('a', attrs);
  } else {
    this.tag('/a');
  }
}

function image(node, entering) {
  if (entering) {
    if (this.disableTags === 0) {
      if (this.options.safe && potentiallyUnsafe(node.destination)) {
        this.lit('<img src="" alt="');
      } else {
        this.lit('<img src="' + this.esc(node.destination, true) +
            '" alt="');
      }
    }
    this.disableTags += 1;
  } else {
    this.disableTags -= 1;
    if (this.disableTags === 0) {
      if (node.title) {
        this.lit('" title="' + this.esc(node.title, true));
      }
      this.lit('" />');
    }
  }
}

function emph(node, entering) {
  this.tag(entering ? 'em' : '/em');
}

function strong(node, entering) {
  this.tag(entering ? 'strong' : '/strong');
}

function paragraph(node, entering) {
  var grandparent = node.parent.parent
    , attrs = this.attrs(node);
  if (grandparent !== null &&
    grandparent.type === 'list') {
    if (grandparent.listTight) {
      return;
    }
  }
  if (entering) {
    this.cr();
    this.tag('p', attrs);
  } else {
    this.tag('/p');
    this.cr();
  }
}

function heading(node, entering) {
  var tagname = 'h' + node.level
    , attrs = this.attrs(node);
  if (entering) {
    this.cr();
    this.tag(tagname, attrs);
  } else {
    this.tag('/' + tagname);
    this.cr();
  }
}

function code(node) {
  this.tag('code');
  this.out(node.literal);
  this.tag('/code');
}

function code_block(node) {
  var info_words = node.info ? node.info.split(/\s+/) : []
    , attrs = this.attrs(node);
  if (info_words.length > 0 && info_words[0].length > 0) {
    attrs.push(['class', 'language-' + this.esc(info_words[0], true)]);
  }
  this.cr();
  this.tag('pre');
  this.tag('code', attrs);
  this.out(node.literal);
  this.tag('/code');
  this.tag('/pre');
  this.cr();
}

function thematic_break(node) {
  var attrs = this.attrs(node);
  this.cr();
  this.tag('hr', attrs, true);
  this.cr();
}

function block_quote(node, entering) {
  var attrs = this.attrs(node);
  if (entering) {
    this.cr();
    this.tag('blockquote', attrs);
    this.cr();
  } else {
    this.cr();
    this.tag('/blockquote');
    this.cr();
  }
}

function list(node, entering) {
  var tagname = node.listType === 'bullet' ? 'ul' : 'ol'
    , attrs = this.attrs(node);

  if (entering) {
    var start = node.listStart;
    if (start !== null && start !== 1) {
      attrs.push(['start', start.toString()]);
    }
    this.cr();
    this.tag(tagname, attrs);
    this.cr();
  } else {
    this.cr();
    this.tag('/' + tagname);
    this.cr();
  }
}

function item(node, entering) {
  var attrs = this.attrs(node);
  if (entering) {
    this.tag('li', attrs);
  } else {
    this.tag('/li');
    this.cr();
  }
}

function html_inline(node) {
  if (this.options.safe) {
    this.lit('<!-- raw HTML omitted -->');
  } else {
    this.lit(node.literal);
  }
}

function html_block(node) {
  this.cr();
  if (this.options.safe) {
    this.lit('<!-- raw HTML omitted -->');
  } else {
    this.lit(node.literal);
  }
  this.cr();
}

function custom_inline(node, entering) {
  if (entering && node.onEnter) {
    this.lit(node.onEnter);
  } else if (!entering && node.onExit) {
    this.lit(node.onExit);
  }
}

function custom_block(node, entering) {
  this.cr();
  if (entering && node.onEnter) {
    this.lit(node.onEnter);
  } else if (!entering && node.onExit) {
    this.lit(node.onExit);
  }
  this.cr();
}

/* Helper methods */

function out(s) {
  this.lit(this.esc(s, false));
}

function attrs (node) {
  var att = [];
  if (this.options.sourcepos) {
    var pos = node.sourcepos;
    if (pos) {
      att.push(['data-sourcepos', String(pos[0][0]) + ':' +
        String(pos[0][1]) + '-' + String(pos[1][0]) + ':' +
        String(pos[1][1])]);
    }
  }
  return att;
}

// quick browser-compatible inheritance
HtmlRenderer.prototype = Object.create(Renderer.prototype);

HtmlRenderer.prototype.text = text;
HtmlRenderer.prototype.html_inline = html_inline;
HtmlRenderer.prototype.html_block = html_block;
HtmlRenderer.prototype.softbreak = softbreak;
HtmlRenderer.prototype.linebreak = linebreak;
HtmlRenderer.prototype.link = link;
HtmlRenderer.prototype.image = image;
HtmlRenderer.prototype.emph = emph;
HtmlRenderer.prototype.strong = strong;
HtmlRenderer.prototype.paragraph = paragraph;
HtmlRenderer.prototype.heading = heading;
HtmlRenderer.prototype.code = code;
HtmlRenderer.prototype.code_block = code_block;
HtmlRenderer.prototype.thematic_break = thematic_break;
HtmlRenderer.prototype.block_quote = block_quote;
HtmlRenderer.prototype.list = list;
HtmlRenderer.prototype.item = item;
HtmlRenderer.prototype.custom_inline = custom_inline;
HtmlRenderer.prototype.custom_block = custom_block;

HtmlRenderer.prototype.esc = __webpack_require__(1).escapeXml;

HtmlRenderer.prototype.out = out;
HtmlRenderer.prototype.tag = tag;
HtmlRenderer.prototype.attrs = attrs;

module.exports = HtmlRenderer;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Renderer = __webpack_require__(6);

var reXMLTag = /\<[^>]*\>/;

function toTagName(s) {
  return s.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

function XmlRenderer(options) {
  options = options || {};

  this.disableTags = 0;
  this.lastOut = "\n";

  this.indentLevel = 0;
  this.indent = '  ';

  this.options = options;
}

function render(ast) {

  this.buffer = '';

  var attrs;
  var tagname;
  var walker = ast.walker();
  var event, node, entering;
  var container;
  var selfClosing;
  var nodetype;

  var options = this.options;

  if (options.time) { console.time("rendering"); }

  this.buffer += '<?xml version="1.0" encoding="UTF-8"?>\n';
  this.buffer += '<!DOCTYPE document SYSTEM "CommonMark.dtd">\n';

  while ((event = walker.next())) {
    entering = event.entering;
    node = event.node;
    nodetype = node.type;

    container = node.isContainer;

    selfClosing = nodetype === 'thematic_break'
      || nodetype === 'linebreak'
      || nodetype === 'softbreak';

    tagname = toTagName(nodetype);

    if (entering) {

        attrs = [];

        switch (nodetype) {
          case 'document':
            attrs.push(['xmlns', 'http://commonmark.org/xml/1.0']);
            break;
          case 'list':
            if (node.listType !== null) {
              attrs.push(['type', node.listType.toLowerCase()]);
            }
            if (node.listStart !== null) {
              attrs.push(['start', String(node.listStart)]);
            }
            if (node.listTight !== null) {
              attrs.push(['tight', (node.listTight ? 'true' : 'false')]);
            }
            var delim = node.listDelimiter;
            if (delim !== null) {
              var delimword = '';
              if (delim === '.') {
                delimword = 'period';
              } else {
                delimword = 'paren';
              }
              attrs.push(['delimiter', delimword]);
            }
            break;
          case 'code_block':
            if (node.info) {
              attrs.push(['info', node.info]);
            }
            break;
          case 'heading':
            attrs.push(['level', String(node.level)]);
            break;
          case 'link':
          case 'image':
            attrs.push(['destination', node.destination]);
            attrs.push(['title', node.title]);
            break;
          case 'custom_inline':
          case 'custom_block':
            attrs.push(['on_enter', node.onEnter]);
            attrs.push(['on_exit', node.onExit]);
            break;
          default:
            break;
        }
        if (options.sourcepos) {
          var pos = node.sourcepos;
          if (pos) {
            attrs.push(['sourcepos', String(pos[0][0]) + ':' +
              String(pos[0][1]) + '-' + String(pos[1][0]) + ':' +
              String(pos[1][1])]);
          }
        }

        this.cr();
        this.out(this.tag(tagname, attrs, selfClosing));
        if (container) {
          this.indentLevel += 1;
        } else if (!container && !selfClosing) {
          var lit = node.literal;
          if (lit) {
            this.out(this.esc(lit));
          }
          this.out(this.tag('/' + tagname));
        }
    } else {
      this.indentLevel -= 1;
      this.cr();
      this.out(this.tag('/' + tagname));
    }
  }
  if (options.time) { console.timeEnd("rendering"); }
  this.buffer += '\n';
  return this.buffer;
}

function out(s) {
  if(this.disableTags > 0) {
    this.buffer += s.replace(reXMLTag, '');
  }else{
    this.buffer += s;
  }
  this.lastOut = s;
}

function cr() {
  if(this.lastOut !== '\n') {
    this.buffer += '\n';
    this.lastOut = '\n';
    for(var i = this.indentLevel; i > 0; i--) {
      this.buffer += this.indent;
    }
  }
}

// Helper function to produce an XML tag.
function tag(name, attrs, selfclosing) {
  var result = '<' + name;
  if(attrs && attrs.length > 0) {
    var i = 0;
    var attrib;
    while ((attrib = attrs[i]) !== undefined) {
      result += ' ' + attrib[0] + '="' + this.esc(attrib[1]) + '"';
      i++;
    }
  }
  if(selfclosing) {
    result += ' /';
  }
  result += '>';
  return result;
}

// quick browser-compatible inheritance
XmlRenderer.prototype = Object.create(Renderer.prototype);

XmlRenderer.prototype.render = render;
XmlRenderer.prototype.out = out;
XmlRenderer.prototype.cr = cr;
XmlRenderer.prototype.tag = tag;
XmlRenderer.prototype.esc = __webpack_require__(1).escapeXml;

module.exports = XmlRenderer;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTI1YTA2ZWEwOTBhMjg0ZjY1OWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMveG1sLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZW50aXRpZXMuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL3JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXJ0aWNsZUhlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZWFtYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlndXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JsYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2l0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaWJsaW9ncmFwaHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleDJqYXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21kdXJsL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWR1cmwvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2xlZ2FjeS5qc29uIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlX2NvZGVwb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9kZWNvZGUuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvaW5saW5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9ybWFsaXplLXJlZmVyZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvZnJvbS1jb2RlLXBvaW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnJlcGVhdC9yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci9odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9yZW5kZXIveG1sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2xCQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDZCQUE2QixJQUFJLFFBQVEsSUFBSSxlQUFlLEtBQUssRUFBRTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQ0FBbUMsaUJBQWlCLEVBQUU7O0FBRXREOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hELENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsc0JBQXNCLEVBQUU7QUFDN0Msc0JBQXNCLG1CQUFtQjtBQUN6QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLDBCQUEwQixFQUFFO0FBQ2pELHNCQUFzQix1QkFBdUI7QUFDN0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixvQkFBb0IsRUFBRTtBQUMzQyxzQkFBc0IsaUJBQWlCO0FBQ3ZDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CLEVBQUU7QUFDMUMsc0JBQXNCLGdCQUFnQjtBQUN0QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLG9CQUFvQixFQUFFO0FBQzNDLHNCQUFzQixpQkFBaUI7QUFDdkMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQiw0QkFBNEIsRUFBRTtBQUNuRCxzQkFBc0IseUJBQXlCO0FBQy9DLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsNkJBQTZCLEVBQUU7QUFDcEQsc0JBQXNCLDBCQUEwQjtBQUNoRCxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLDZCQUE2QixFQUFFO0FBQ3BELHNCQUFzQiwwQkFBMEI7QUFDaEQsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixpQ0FBaUMsRUFBRTtBQUN4RCwwQkFBMEIsa0NBQWtDO0FBQzVELENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsc0JBQXNCLEVBQUU7QUFDN0Msc0JBQXNCLG1CQUFtQjtBQUN6QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLHFCQUFxQixFQUFFO0FBQzVDLHNCQUFzQixrQkFBa0I7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzlRQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNoQ0Esa0JBQWtCLG1EOzs7Ozs7QUNBbEIsa0JBQWtCLHMvVkFBcy9WLGdJQUFnSSx1cVNBQXVxUyxnSUFBZ0ksbzREQUFvNEQscXBNOzs7Ozs7O0FDQW56c0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMUVBO0FBQ0EsT0FBTyxRQUFRO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ25DQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7O0FDdkx0QyxPQUFPLFlBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMvQ0EsT0FBTyxZQUFZO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkEsT0FBTyxZQUFZO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkEsT0FBTyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQSxPQUFPLFlBQVk7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSxPQUFPLFlBQVk7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSxPQUFPLFlBQVk7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBLE9BQU8sWUFBWTs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkNBLE9BQU8sWUFBWTs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdFQUFnRSxJQUFJLFFBQVEsSUFBSTtBQUNoRjs7QUFFQSxzREFBc0QsSUFBSTs7QUFFMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLE9BQU87QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsSUFBSSxNQUFNO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsR0FBRyxLQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssZ0RBQWdELFdBQVc7QUFDaEU7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHlCQUF5QjtBQUM5QjtBQUNBLEtBQUsseUJBQXlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNuVkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRzs7QUFFM0U7O0FBRUE7O0FBRUE7O0FBRUEsZ0NBQWdDLElBQUk7O0FBRXBDLDZCQUE2QixJQUFJOztBQUVqQyxzQkFBc0IsR0FBRyxXQUFXLEdBQUc7O0FBRXZDLGdDQUFnQyxHQUFHLEdBQUcsR0FBRzs7QUFFekM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQyxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsVUFBVSxFQUFFO0FBQzFDLDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsaUNBQWlDLHVCQUF1QixFQUFFO0FBQzFEO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOEJBQThCLFVBQVUsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsaUNBQWlDLHVCQUF1QixFQUFFO0FBQzFEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEIsUUFBUSxFQUFFO0FBQ3hDLGlDQUFpQyx1QkFBdUIsRUFBRTtBQUMxRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLFFBQVEsRUFBRTtBQUN4QyxpQ0FBaUMsdUJBQXVCLEVBQUU7QUFDMUQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLFFBQVEsRUFBRTtBQUN4QyxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsZ0NBQWdDLGNBQWMsRUFBRTtBQUNoRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsU0FBUztBQUNULGdDQUFnQyxjQUFjLEVBQUU7QUFDaEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLFNBQVM7QUFDVCxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSyxPQUFPOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQ0FBaUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRSw0QkFBNEIsK0JBQStCO0FBQzNELG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlELDRCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUN2MkJBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsY0FBYzs7QUFFNUI7O0FBRUEsYUFBYSxTQUFTO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQ0FBZ0MsT0FBTztBQUN2Qzs7QUFFQTtBQUNBLHFCQUFxQixFQUFFO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7OztBQUdBOzs7Ozs7Ozs7QUNoR0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGNBQWM7O0FBRTVCOztBQUVBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQ0FBb0MsRUFBRTtBQUN0QztBQUNBOztBQUVBLCtCQUErQixPQUFPO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0EsMEJBQTBCO0FBQzFCOzs7QUFHQTs7Ozs7OztBQ3pIQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwrREFBK0Q7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsR0FBRztBQUNILGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBLG1FQUFtRSxRQUFRO0FBQzNFOztBQUVBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUN2RUEsa0JBQWtCLHd1Qzs7Ozs7O0FDQWxCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pCQSxrQkFBa0IseVM7Ozs7Ozs7QUNBbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQW1DOztBQUVuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1EQUFtRCxhQUFhLEVBQUU7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHFEQUFxRCxFQUFFLGdDQUFnQyxLQUFLLDZDQUE2QyxLQUFLOztBQUU5SSwyQ0FBMkMsS0FBSzs7QUFFaEQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxVQUFVLE9BQU87O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUssT0FBTzs7QUFFWiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQSx5QkFBeUIsbUNBQW1DO0FBQzVEO0FBQ0EseUJBQXlCLG1DQUFtQyw4Q0FBOEM7QUFDMUc7QUFDQTtBQUNBLHlCQUF5QixPQUFPLHFDQUFxQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3A3QkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUN6Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQSxXQUFXLE9BQU8sc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7O0FDakRBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ2pTQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsMkJBQTJCOztBQUVoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4QkFBOEI7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImxhbWwtYnJvd3Nlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDUyNWEwNmVhMDkwYTI4NGY2NTllIiwiICAvLyBTb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzQwNDYwMi8xMzM5NjUxXG5tb2R1bGUuZXhwb3J0cy5yZW5hbWVUYWcgPSBmdW5jdGlvbihkb2N1bWVudCwgbm9kZU9yU2VsZWN0b3IsIG5ld1RhZ05hbWUsIGNsYXNzT3JUcnVlKSB7XG4gICAgbGV0IG5vZGUgPSBub2RlT3JTZWxlY3RvcjtcbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlT3JTZWxlY3Rvcik7XG4gICAgaWYgKCFub2RlKSByZXR1cm4gbmV3IEVycm9yKCdObyBub2RlIGZvdW5kJyk7XG4gICAgbGV0IGNsYXNzTmFtZSA9ICcnO1xuICAgIGlmIChjbGFzc09yVHJ1ZSAmJiBjbGFzc09yVHJ1ZSA9PT0gdHJ1ZSkgY2xhc3NOYW1lID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHR5cGVvZiBjbGFzc09yVHJ1ZSA9PT0gJ3N0cmluZycpIGNsYXNzTmFtZSA9IGNsYXNzT3JUcnVlO1xuXG4gICAgY29uc3QgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3VGFnTmFtZSk7XG4gICAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkgbmV3Tm9kZS5hcHBlbmRDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgIGZvciAobGV0IGF0dHJpYnV0ZSBvZiBub2RlLmF0dHJpYnV0ZXMpIHtcbiAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cbiAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbFRhZ05hbWUnLCBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gJycpIG5ld05vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgbm9kZSk7XG4gICAgcmV0dXJuIG5ld05vZGU7XG4gIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5jb2RlID0gcmVxdWlyZSgnbWR1cmwvZW5jb2RlJyk7XG52YXIgZGVjb2RlID0gcmVxdWlyZSgnbWR1cmwvZGVjb2RlJyk7XG5cbnZhciBDX0JBQ0tTTEFTSCA9IDkyO1xuXG52YXIgZGVjb2RlSFRNTCA9IHJlcXVpcmUoJ2VudGl0aWVzJykuZGVjb2RlSFRNTDtcblxudmFyIEVOVElUWSA9IFwiJig/OiN4W2EtZjAtOV17MSw4fXwjWzAtOV17MSw4fXxbYS16XVthLXowLTldezEsMzF9KTtcIjtcblxudmFyIFRBR05BTUUgPSAnW0EtWmEtel1bQS1aYS16MC05LV0qJztcbnZhciBBVFRSSUJVVEVOQU1FID0gJ1thLXpBLVpfOl1bYS16QS1aMC05Oi5fLV0qJztcbnZhciBVTlFVT1RFRFZBTFVFID0gXCJbXlxcXCInPTw+YFxcXFx4MDAtXFxcXHgyMF0rXCI7XG52YXIgU0lOR0xFUVVPVEVEVkFMVUUgPSBcIidbXiddKidcIjtcbnZhciBET1VCTEVRVU9URURWQUxVRSA9ICdcIlteXCJdKlwiJztcbnZhciBBVFRSSUJVVEVWQUxVRSA9IFwiKD86XCIgKyBVTlFVT1RFRFZBTFVFICsgXCJ8XCIgKyBTSU5HTEVRVU9URURWQUxVRSArIFwifFwiICsgRE9VQkxFUVVPVEVEVkFMVUUgKyBcIilcIjtcbnZhciBBVFRSSUJVVEVWQUxVRVNQRUMgPSBcIig/OlwiICsgXCJcXFxccyo9XCIgKyBcIlxcXFxzKlwiICsgQVRUUklCVVRFVkFMVUUgKyBcIilcIjtcbnZhciBBVFRSSUJVVEUgPSBcIig/OlwiICsgXCJcXFxccytcIiArIEFUVFJJQlVURU5BTUUgKyBBVFRSSUJVVEVWQUxVRVNQRUMgKyBcIj8pXCI7XG52YXIgT1BFTlRBRyA9IFwiPFwiICsgVEFHTkFNRSArIEFUVFJJQlVURSArIFwiKlwiICsgXCJcXFxccyovPz5cIjtcbnZhciBDTE9TRVRBRyA9IFwiPC9cIiArIFRBR05BTUUgKyBcIlxcXFxzKls+XVwiO1xudmFyIEhUTUxDT01NRU5UID0gXCI8IS0tLS0+fDwhLS0oPzotP1tePi1dKSg/Oi0/W14tXSkqLS0+XCI7XG52YXIgUFJPQ0VTU0lOR0lOU1RSVUNUSU9OID0gXCJbPF1bP10uKj9bP11bPl1cIjtcbnZhciBERUNMQVJBVElPTiA9IFwiPCFbQS1aXStcIiArIFwiXFxcXHMrW14+XSo+XCI7XG52YXIgQ0RBVEEgPSBcIjwhXFxcXFtDREFUQVxcXFxbW1xcXFxzXFxcXFNdKj9cXFxcXVxcXFxdPlwiO1xudmFyIEhUTUxUQUcgPSBcIig/OlwiICsgT1BFTlRBRyArIFwifFwiICsgQ0xPU0VUQUcgKyBcInxcIiArIEhUTUxDT01NRU5UICsgXCJ8XCIgK1xuICAgICAgICBQUk9DRVNTSU5HSU5TVFJVQ1RJT04gKyBcInxcIiArIERFQ0xBUkFUSU9OICsgXCJ8XCIgKyBDREFUQSArIFwiKVwiO1xudmFyIHJlSHRtbFRhZyA9IG5ldyBSZWdFeHAoJ14nICsgSFRNTFRBRywgJ2knKTtcblxudmFyIHJlQmFja3NsYXNoT3JBbXAgPSAvW1xcXFwmXS87XG5cbnZhciBFU0NBUEFCTEUgPSAnWyFcIiMkJSZcXCcoKSorLC4vOjs8PT4/QFtcXFxcXFxcXFxcXFxdXl9ge3x9fi1dJztcblxudmFyIHJlRW50aXR5T3JFc2NhcGVkQ2hhciA9IG5ldyBSZWdFeHAoJ1xcXFxcXFxcJyArIEVTQ0FQQUJMRSArICd8JyArIEVOVElUWSwgJ2dpJyk7XG5cbnZhciBYTUxTUEVDSUFMID0gJ1smPD5cIl0nO1xuXG52YXIgcmVYbWxTcGVjaWFsID0gbmV3IFJlZ0V4cChYTUxTUEVDSUFMLCAnZycpO1xuXG52YXIgcmVYbWxTcGVjaWFsT3JFbnRpdHkgPSBuZXcgUmVnRXhwKEVOVElUWSArICd8JyArIFhNTFNQRUNJQUwsICdnaScpO1xuXG52YXIgdW5lc2NhcGVDaGFyID0gZnVuY3Rpb24ocykge1xuICAgIGlmIChzLmNoYXJDb2RlQXQoMCkgPT09IENfQkFDS1NMQVNIKSB7XG4gICAgICAgIHJldHVybiBzLmNoYXJBdCgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVjb2RlSFRNTChzKTtcbiAgICB9XG59O1xuXG4vLyBSZXBsYWNlIGVudGl0aWVzIGFuZCBiYWNrc2xhc2ggZXNjYXBlcyB3aXRoIGxpdGVyYWwgY2hhcmFjdGVycy5cbnZhciB1bmVzY2FwZVN0cmluZyA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocmVCYWNrc2xhc2hPckFtcC50ZXN0KHMpKSB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UocmVFbnRpdHlPckVzY2FwZWRDaGFyLCB1bmVzY2FwZUNoYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbn07XG5cbnZhciBub3JtYWxpemVVUkkgPSBmdW5jdGlvbih1cmkpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZW5jb2RlKGRlY29kZSh1cmkpKTtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiB1cmk7XG4gICAgfVxufTtcblxudmFyIHJlcGxhY2VVbnNhZmVDaGFyID0gZnVuY3Rpb24ocykge1xuICAgIHN3aXRjaCAocykge1xuICAgIGNhc2UgJyYnOlxuICAgICAgICByZXR1cm4gJyZhbXA7JztcbiAgICBjYXNlICc8JzpcbiAgICAgICAgcmV0dXJuICcmbHQ7JztcbiAgICBjYXNlICc+JzpcbiAgICAgICAgcmV0dXJuICcmZ3Q7JztcbiAgICBjYXNlICdcIic6XG4gICAgICAgIHJldHVybiAnJnF1b3Q7JztcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG59O1xuXG52YXIgZXNjYXBlWG1sID0gZnVuY3Rpb24ocywgcHJlc2VydmVfZW50aXRpZXMpIHtcbiAgICBpZiAocmVYbWxTcGVjaWFsLnRlc3QocykpIHtcbiAgICAgICAgaWYgKHByZXNlcnZlX2VudGl0aWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHJlWG1sU3BlY2lhbE9yRW50aXR5LCByZXBsYWNlVW5zYWZlQ2hhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHJlWG1sU3BlY2lhbCwgcmVwbGFjZVVuc2FmZUNoYXIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHVuZXNjYXBlU3RyaW5nOiB1bmVzY2FwZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICBub3JtYWxpemVVUkk6IG5vcm1hbGl6ZVVSSSxcbiAgICAgICAgICAgICAgICAgICBlc2NhcGVYbWw6IGVzY2FwZVhtbCxcbiAgICAgICAgICAgICAgICAgICByZUh0bWxUYWc6IHJlSHRtbFRhZyxcbiAgICAgICAgICAgICAgICAgICBPUEVOVEFHOiBPUEVOVEFHLFxuICAgICAgICAgICAgICAgICAgIENMT1NFVEFHOiBDTE9TRVRBRyxcbiAgICAgICAgICAgICAgICAgICBFTlRJVFk6IEVOVElUWSxcbiAgICAgICAgICAgICAgICAgICBFU0NBUEFCTEU6IEVTQ0FQQUJMRVxuICAgICAgICAgICAgICAgICB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvY29tbW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBpc0NvbnRhaW5lcihub2RlKSB7XG4gICAgc3dpdGNoIChub2RlLl90eXBlKSB7XG4gICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgIGNhc2UgJ2Jsb2NrX3F1b3RlJzpcbiAgICBjYXNlICdsaXN0JzpcbiAgICBjYXNlICdpdGVtJzpcbiAgICBjYXNlICdwYXJhZ3JhcGgnOlxuICAgIGNhc2UgJ2hlYWRpbmcnOlxuICAgIGNhc2UgJ2VtcGgnOlxuICAgIGNhc2UgJ3N0cm9uZyc6XG4gICAgY2FzZSAnbGluayc6XG4gICAgY2FzZSAnaW1hZ2UnOlxuICAgIGNhc2UgJ2N1c3RvbV9pbmxpbmUnOlxuICAgIGNhc2UgJ2N1c3RvbV9ibG9jayc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbnZhciByZXN1bWVBdCA9IGZ1bmN0aW9uKG5vZGUsIGVudGVyaW5nKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gbm9kZTtcbiAgICB0aGlzLmVudGVyaW5nID0gKGVudGVyaW5nID09PSB0cnVlKTtcbn07XG5cbnZhciBuZXh0ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgY3VyID0gdGhpcy5jdXJyZW50O1xuICAgIHZhciBlbnRlcmluZyA9IHRoaXMuZW50ZXJpbmc7XG5cbiAgICBpZiAoY3VyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBjb250YWluZXIgPSBpc0NvbnRhaW5lcihjdXIpO1xuXG4gICAgaWYgKGVudGVyaW5nICYmIGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoY3VyLl9maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBjdXIuX2ZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB0aGlzLmVudGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHN0YXkgb24gbm9kZSBidXQgZXhpdFxuICAgICAgICAgICAgdGhpcy5lbnRlcmluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGN1ciA9PT0gdGhpcy5yb290KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XG5cbiAgICB9IGVsc2UgaWYgKGN1ci5fbmV4dCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBjdXIuX3BhcmVudDtcbiAgICAgICAgdGhpcy5lbnRlcmluZyA9IGZhbHNlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VyLl9uZXh0O1xuICAgICAgICB0aGlzLmVudGVyaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge2VudGVyaW5nOiBlbnRlcmluZywgbm9kZTogY3VyfTtcbn07XG5cbnZhciBOb2RlV2Fsa2VyID0gZnVuY3Rpb24ocm9vdCkge1xuICAgIHJldHVybiB7IGN1cnJlbnQ6IHJvb3QsXG4gICAgICAgICAgICAgcm9vdDogcm9vdCxcbiAgICAgICAgICAgICBlbnRlcmluZzogdHJ1ZSxcbiAgICAgICAgICAgICBuZXh0OiBuZXh0LFxuICAgICAgICAgICAgIHJlc3VtZUF0OiByZXN1bWVBdCB9O1xufTtcblxudmFyIE5vZGUgPSBmdW5jdGlvbihub2RlVHlwZSwgc291cmNlcG9zKSB7XG4gICAgdGhpcy5fdHlwZSA9IG5vZGVUeXBlO1xuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fZmlyc3RDaGlsZCA9IG51bGw7XG4gICAgdGhpcy5fbGFzdENoaWxkID0gbnVsbDtcbiAgICB0aGlzLl9wcmV2ID0gbnVsbDtcbiAgICB0aGlzLl9uZXh0ID0gbnVsbDtcbiAgICB0aGlzLl9zb3VyY2Vwb3MgPSBzb3VyY2Vwb3M7XG4gICAgdGhpcy5fbGFzdExpbmVCbGFuayA9IGZhbHNlO1xuICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuICAgIHRoaXMuX3N0cmluZ19jb250ZW50ID0gbnVsbDtcbiAgICB0aGlzLl9saXRlcmFsID0gbnVsbDtcbiAgICB0aGlzLl9saXN0RGF0YSA9IHt9O1xuICAgIHRoaXMuX2luZm8gPSBudWxsO1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uID0gbnVsbDtcbiAgICB0aGlzLl90aXRsZSA9IG51bGw7XG4gICAgdGhpcy5faXNGZW5jZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9mZW5jZUNoYXIgPSBudWxsO1xuICAgIHRoaXMuX2ZlbmNlTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9mZW5jZU9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5fbGV2ZWwgPSBudWxsO1xuICAgIHRoaXMuX29uRW50ZXIgPSBudWxsO1xuICAgIHRoaXMuX29uRXhpdCA9IG51bGw7XG59O1xuXG52YXIgcHJvdG8gPSBOb2RlLnByb3RvdHlwZTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnaXNDb250YWluZXInLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0NvbnRhaW5lcih0aGlzKTsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3R5cGUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdmaXJzdENoaWxkJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9maXJzdENoaWxkOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGFzdENoaWxkJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9sYXN0Q2hpbGQ7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICduZXh0Jywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9uZXh0OyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAncHJldicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fcHJldjsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3BhcmVudCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fcGFyZW50OyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnc291cmNlcG9zJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9zb3VyY2Vwb3M7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsaXRlcmFsJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9saXRlcmFsOyB9LFxuICAgIHNldDogZnVuY3Rpb24ocykgeyB0aGlzLl9saXRlcmFsID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2Rlc3RpbmF0aW9uJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9kZXN0aW5hdGlvbjsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fZGVzdGluYXRpb24gPSBzOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAndGl0bGUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9LFxuICAgIHNldDogZnVuY3Rpb24ocykgeyB0aGlzLl90aXRsZSA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdpbmZvJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9pbmZvOyB9LFxuICAgIHNldDogZnVuY3Rpb24ocykgeyB0aGlzLl9pbmZvID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xldmVsJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9sZXZlbDsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fbGV2ZWwgPSBzOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGlzdFR5cGUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xpc3REYXRhLnR5cGU7IH0sXG4gICAgc2V0OiBmdW5jdGlvbih0KSB7IHRoaXMuX2xpc3REYXRhLnR5cGUgPSB0OyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGlzdFRpZ2h0Jywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9saXN0RGF0YS50aWdodDsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHQpIHsgdGhpcy5fbGlzdERhdGEudGlnaHQgPSB0OyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGlzdFN0YXJ0Jywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9saXN0RGF0YS5zdGFydDsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKG4pIHsgdGhpcy5fbGlzdERhdGEuc3RhcnQgPSBuOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGlzdERlbGltaXRlcicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGlzdERhdGEuZGVsaW1pdGVyOyB9LFxuICAgIHNldDogZnVuY3Rpb24oZGVsaW0pIHsgdGhpcy5fbGlzdERhdGEuZGVsaW1pdGVyID0gZGVsaW07IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbkVudGVyJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9vbkVudGVyOyB9LFxuICAgIHNldDogZnVuY3Rpb24ocykgeyB0aGlzLl9vbkVudGVyID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uRXhpdCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fb25FeGl0OyB9LFxuICAgIHNldDogZnVuY3Rpb24ocykgeyB0aGlzLl9vbkV4aXQgPSBzOyB9XG59KTtcblxuTm9kZS5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIGNoaWxkLnVubGluaygpO1xuICAgIGNoaWxkLl9wYXJlbnQgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9sYXN0Q2hpbGQpIHtcbiAgICAgICAgdGhpcy5fbGFzdENoaWxkLl9uZXh0ID0gY2hpbGQ7XG4gICAgICAgIGNoaWxkLl9wcmV2ID0gdGhpcy5fbGFzdENoaWxkO1xuICAgICAgICB0aGlzLl9sYXN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9maXJzdENoaWxkID0gY2hpbGQ7XG4gICAgICAgIHRoaXMuX2xhc3RDaGlsZCA9IGNoaWxkO1xuICAgIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLnByZXBlbmRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgY2hpbGQudW5saW5rKCk7XG4gICAgY2hpbGQuX3BhcmVudCA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2ZpcnN0Q2hpbGQpIHtcbiAgICAgICAgdGhpcy5fZmlyc3RDaGlsZC5fcHJldiA9IGNoaWxkO1xuICAgICAgICBjaGlsZC5fbmV4dCA9IHRoaXMuX2ZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuX2ZpcnN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9maXJzdENoaWxkID0gY2hpbGQ7XG4gICAgICAgIHRoaXMuX2xhc3RDaGlsZCA9IGNoaWxkO1xuICAgIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLnVubGluayA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICAgIHRoaXMuX3ByZXYuX25leHQgPSB0aGlzLl9uZXh0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3RDaGlsZCA9IHRoaXMuX25leHQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9uZXh0KSB7XG4gICAgICAgIHRoaXMuX25leHQuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudC5fbGFzdENoaWxkID0gdGhpcy5fcHJldjtcbiAgICB9XG4gICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl9uZXh0ID0gbnVsbDtcbiAgICB0aGlzLl9wcmV2ID0gbnVsbDtcbn07XG5cbk5vZGUucHJvdG90eXBlLmluc2VydEFmdGVyID0gZnVuY3Rpb24oc2libGluZykge1xuICAgIHNpYmxpbmcudW5saW5rKCk7XG4gICAgc2libGluZy5fbmV4dCA9IHRoaXMuX25leHQ7XG4gICAgaWYgKHNpYmxpbmcuX25leHQpIHtcbiAgICAgICAgc2libGluZy5fbmV4dC5fcHJldiA9IHNpYmxpbmc7XG4gICAgfVxuICAgIHNpYmxpbmcuX3ByZXYgPSB0aGlzO1xuICAgIHRoaXMuX25leHQgPSBzaWJsaW5nO1xuICAgIHNpYmxpbmcuX3BhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICBpZiAoIXNpYmxpbmcuX25leHQpIHtcbiAgICAgICAgc2libGluZy5fcGFyZW50Ll9sYXN0Q2hpbGQgPSBzaWJsaW5nO1xuICAgIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmluc2VydEJlZm9yZSA9IGZ1bmN0aW9uKHNpYmxpbmcpIHtcbiAgICBzaWJsaW5nLnVubGluaygpO1xuICAgIHNpYmxpbmcuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgIGlmIChzaWJsaW5nLl9wcmV2KSB7XG4gICAgICAgIHNpYmxpbmcuX3ByZXYuX25leHQgPSBzaWJsaW5nO1xuICAgIH1cbiAgICBzaWJsaW5nLl9uZXh0ID0gdGhpcztcbiAgICB0aGlzLl9wcmV2ID0gc2libGluZztcbiAgICBzaWJsaW5nLl9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgaWYgKCFzaWJsaW5nLl9wcmV2KSB7XG4gICAgICAgIHNpYmxpbmcuX3BhcmVudC5fZmlyc3RDaGlsZCA9IHNpYmxpbmc7XG4gICAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUud2Fsa2VyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHdhbGtlciA9IG5ldyBOb2RlV2Fsa2VyKHRoaXMpO1xuICAgIHJldHVybiB3YWxrZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG5cblxuLyogRXhhbXBsZSBvZiB1c2Ugb2Ygd2Fsa2VyOlxuXG4gdmFyIHdhbGtlciA9IHcud2Fsa2VyKCk7XG4gdmFyIGV2ZW50O1xuXG4gd2hpbGUgKGV2ZW50ID0gd2Fsa2VyLm5leHQoKSkge1xuIGNvbnNvbGUubG9nKGV2ZW50LmVudGVyaW5nLCBldmVudC5ub2RlLnR5cGUpO1xuIH1cblxuICovXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ub2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBlbmNvZGUgPSByZXF1aXJlKFwiLi9saWIvZW5jb2RlLmpzXCIpLFxuICAgIGRlY29kZSA9IHJlcXVpcmUoXCIuL2xpYi9kZWNvZGUuanNcIik7XG5cbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24oZGF0YSwgbGV2ZWwpe1xuXHRyZXR1cm4gKCFsZXZlbCB8fCBsZXZlbCA8PSAwID8gZGVjb2RlLlhNTCA6IGRlY29kZS5IVE1MKShkYXRhKTtcbn07XG5cbmV4cG9ydHMuZGVjb2RlU3RyaWN0ID0gZnVuY3Rpb24oZGF0YSwgbGV2ZWwpe1xuXHRyZXR1cm4gKCFsZXZlbCB8fCBsZXZlbCA8PSAwID8gZGVjb2RlLlhNTCA6IGRlY29kZS5IVE1MU3RyaWN0KShkYXRhKTtcbn07XG5cbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24oZGF0YSwgbGV2ZWwpe1xuXHRyZXR1cm4gKCFsZXZlbCB8fCBsZXZlbCA8PSAwID8gZW5jb2RlLlhNTCA6IGVuY29kZS5IVE1MKShkYXRhKTtcbn07XG5cbmV4cG9ydHMuZW5jb2RlWE1MID0gZW5jb2RlLlhNTDtcblxuZXhwb3J0cy5lbmNvZGVIVE1MNCA9XG5leHBvcnRzLmVuY29kZUhUTUw1ID1cbmV4cG9ydHMuZW5jb2RlSFRNTCAgPSBlbmNvZGUuSFRNTDtcblxuZXhwb3J0cy5kZWNvZGVYTUwgPVxuZXhwb3J0cy5kZWNvZGVYTUxTdHJpY3QgPSBkZWNvZGUuWE1MO1xuXG5leHBvcnRzLmRlY29kZUhUTUw0ID1cbmV4cG9ydHMuZGVjb2RlSFRNTDUgPVxuZXhwb3J0cy5kZWNvZGVIVE1MID0gZGVjb2RlLkhUTUw7XG5cbmV4cG9ydHMuZGVjb2RlSFRNTDRTdHJpY3QgPVxuZXhwb3J0cy5kZWNvZGVIVE1MNVN0cmljdCA9XG5leHBvcnRzLmRlY29kZUhUTUxTdHJpY3QgPSBkZWNvZGUuSFRNTFN0cmljdDtcblxuZXhwb3J0cy5lc2NhcGUgPSBlbmNvZGUuZXNjYXBlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJhbXBcIjpcIiZcIixcImFwb3NcIjpcIidcIixcImd0XCI6XCI+XCIsXCJsdFwiOlwiPFwiLFwicXVvdFwiOlwiXFxcIlwifVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMveG1sLmpzb25cbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJBYWN1dGVcIjpcIsOBXCIsXCJhYWN1dGVcIjpcIsOhXCIsXCJBYnJldmVcIjpcIsSCXCIsXCJhYnJldmVcIjpcIsSDXCIsXCJhY1wiOlwi4oi+XCIsXCJhY2RcIjpcIuKIv1wiLFwiYWNFXCI6XCLiiL7Ms1wiLFwiQWNpcmNcIjpcIsOCXCIsXCJhY2lyY1wiOlwiw6JcIixcImFjdXRlXCI6XCLCtFwiLFwiQWN5XCI6XCLQkFwiLFwiYWN5XCI6XCLQsFwiLFwiQUVsaWdcIjpcIsOGXCIsXCJhZWxpZ1wiOlwiw6ZcIixcImFmXCI6XCLigaFcIixcIkFmclwiOlwi8J2UhFwiLFwiYWZyXCI6XCLwnZSeXCIsXCJBZ3JhdmVcIjpcIsOAXCIsXCJhZ3JhdmVcIjpcIsOgXCIsXCJhbGVmc3ltXCI6XCLihLVcIixcImFsZXBoXCI6XCLihLVcIixcIkFscGhhXCI6XCLOkVwiLFwiYWxwaGFcIjpcIs6xXCIsXCJBbWFjclwiOlwixIBcIixcImFtYWNyXCI6XCLEgVwiLFwiYW1hbGdcIjpcIuKov1wiLFwiYW1wXCI6XCImXCIsXCJBTVBcIjpcIiZcIixcImFuZGFuZFwiOlwi4qmVXCIsXCJBbmRcIjpcIuKpk1wiLFwiYW5kXCI6XCLiiKdcIixcImFuZGRcIjpcIuKpnFwiLFwiYW5kc2xvcGVcIjpcIuKpmFwiLFwiYW5kdlwiOlwi4qmaXCIsXCJhbmdcIjpcIuKIoFwiLFwiYW5nZVwiOlwi4qakXCIsXCJhbmdsZVwiOlwi4oigXCIsXCJhbmdtc2RhYVwiOlwi4qaoXCIsXCJhbmdtc2RhYlwiOlwi4qapXCIsXCJhbmdtc2RhY1wiOlwi4qaqXCIsXCJhbmdtc2RhZFwiOlwi4qarXCIsXCJhbmdtc2RhZVwiOlwi4qasXCIsXCJhbmdtc2RhZlwiOlwi4qatXCIsXCJhbmdtc2RhZ1wiOlwi4qauXCIsXCJhbmdtc2RhaFwiOlwi4qavXCIsXCJhbmdtc2RcIjpcIuKIoVwiLFwiYW5ncnRcIjpcIuKIn1wiLFwiYW5ncnR2YlwiOlwi4oq+XCIsXCJhbmdydHZiZFwiOlwi4qadXCIsXCJhbmdzcGhcIjpcIuKIolwiLFwiYW5nc3RcIjpcIsOFXCIsXCJhbmd6YXJyXCI6XCLijbxcIixcIkFvZ29uXCI6XCLEhFwiLFwiYW9nb25cIjpcIsSFXCIsXCJBb3BmXCI6XCLwnZS4XCIsXCJhb3BmXCI6XCLwnZWSXCIsXCJhcGFjaXJcIjpcIuKpr1wiLFwiYXBcIjpcIuKJiFwiLFwiYXBFXCI6XCLiqbBcIixcImFwZVwiOlwi4omKXCIsXCJhcGlkXCI6XCLiiYtcIixcImFwb3NcIjpcIidcIixcIkFwcGx5RnVuY3Rpb25cIjpcIuKBoVwiLFwiYXBwcm94XCI6XCLiiYhcIixcImFwcHJveGVxXCI6XCLiiYpcIixcIkFyaW5nXCI6XCLDhVwiLFwiYXJpbmdcIjpcIsOlXCIsXCJBc2NyXCI6XCLwnZKcXCIsXCJhc2NyXCI6XCLwnZK2XCIsXCJBc3NpZ25cIjpcIuKJlFwiLFwiYXN0XCI6XCIqXCIsXCJhc3ltcFwiOlwi4omIXCIsXCJhc3ltcGVxXCI6XCLiiY1cIixcIkF0aWxkZVwiOlwiw4NcIixcImF0aWxkZVwiOlwiw6NcIixcIkF1bWxcIjpcIsOEXCIsXCJhdW1sXCI6XCLDpFwiLFwiYXdjb25pbnRcIjpcIuKIs1wiLFwiYXdpbnRcIjpcIuKokVwiLFwiYmFja2NvbmdcIjpcIuKJjFwiLFwiYmFja2Vwc2lsb25cIjpcIs+2XCIsXCJiYWNrcHJpbWVcIjpcIuKAtVwiLFwiYmFja3NpbVwiOlwi4oi9XCIsXCJiYWNrc2ltZXFcIjpcIuKLjVwiLFwiQmFja3NsYXNoXCI6XCLiiJZcIixcIkJhcnZcIjpcIuKrp1wiLFwiYmFydmVlXCI6XCLiir1cIixcImJhcndlZFwiOlwi4oyFXCIsXCJCYXJ3ZWRcIjpcIuKMhlwiLFwiYmFyd2VkZ2VcIjpcIuKMhVwiLFwiYmJya1wiOlwi4o61XCIsXCJiYnJrdGJya1wiOlwi4o62XCIsXCJiY29uZ1wiOlwi4omMXCIsXCJCY3lcIjpcItCRXCIsXCJiY3lcIjpcItCxXCIsXCJiZHF1b1wiOlwi4oCeXCIsXCJiZWNhdXNcIjpcIuKItVwiLFwiYmVjYXVzZVwiOlwi4oi1XCIsXCJCZWNhdXNlXCI6XCLiiLVcIixcImJlbXB0eXZcIjpcIuKmsFwiLFwiYmVwc2lcIjpcIs+2XCIsXCJiZXJub3VcIjpcIuKErFwiLFwiQmVybm91bGxpc1wiOlwi4oSsXCIsXCJCZXRhXCI6XCLOklwiLFwiYmV0YVwiOlwizrJcIixcImJldGhcIjpcIuKEtlwiLFwiYmV0d2VlblwiOlwi4omsXCIsXCJCZnJcIjpcIvCdlIVcIixcImJmclwiOlwi8J2Un1wiLFwiYmlnY2FwXCI6XCLii4JcIixcImJpZ2NpcmNcIjpcIuKXr1wiLFwiYmlnY3VwXCI6XCLii4NcIixcImJpZ29kb3RcIjpcIuKogFwiLFwiYmlnb3BsdXNcIjpcIuKogVwiLFwiYmlnb3RpbWVzXCI6XCLiqIJcIixcImJpZ3NxY3VwXCI6XCLiqIZcIixcImJpZ3N0YXJcIjpcIuKYhVwiLFwiYmlndHJpYW5nbGVkb3duXCI6XCLilr1cIixcImJpZ3RyaWFuZ2xldXBcIjpcIuKWs1wiLFwiYmlndXBsdXNcIjpcIuKohFwiLFwiYmlndmVlXCI6XCLii4FcIixcImJpZ3dlZGdlXCI6XCLii4BcIixcImJrYXJvd1wiOlwi4qSNXCIsXCJibGFja2xvemVuZ2VcIjpcIuKnq1wiLFwiYmxhY2tzcXVhcmVcIjpcIuKWqlwiLFwiYmxhY2t0cmlhbmdsZVwiOlwi4pa0XCIsXCJibGFja3RyaWFuZ2xlZG93blwiOlwi4pa+XCIsXCJibGFja3RyaWFuZ2xlbGVmdFwiOlwi4peCXCIsXCJibGFja3RyaWFuZ2xlcmlnaHRcIjpcIuKWuFwiLFwiYmxhbmtcIjpcIuKQo1wiLFwiYmxrMTJcIjpcIuKWklwiLFwiYmxrMTRcIjpcIuKWkVwiLFwiYmxrMzRcIjpcIuKWk1wiLFwiYmxvY2tcIjpcIuKWiFwiLFwiYm5lXCI6XCI94oOlXCIsXCJibmVxdWl2XCI6XCLiiaHig6VcIixcImJOb3RcIjpcIuKrrVwiLFwiYm5vdFwiOlwi4oyQXCIsXCJCb3BmXCI6XCLwnZS5XCIsXCJib3BmXCI6XCLwnZWTXCIsXCJib3RcIjpcIuKKpVwiLFwiYm90dG9tXCI6XCLiiqVcIixcImJvd3RpZVwiOlwi4ouIXCIsXCJib3hib3hcIjpcIuKniVwiLFwiYm94ZGxcIjpcIuKUkFwiLFwiYm94ZExcIjpcIuKVlVwiLFwiYm94RGxcIjpcIuKVllwiLFwiYm94RExcIjpcIuKVl1wiLFwiYm94ZHJcIjpcIuKUjFwiLFwiYm94ZFJcIjpcIuKVklwiLFwiYm94RHJcIjpcIuKVk1wiLFwiYm94RFJcIjpcIuKVlFwiLFwiYm94aFwiOlwi4pSAXCIsXCJib3hIXCI6XCLilZBcIixcImJveGhkXCI6XCLilKxcIixcImJveEhkXCI6XCLilaRcIixcImJveGhEXCI6XCLilaVcIixcImJveEhEXCI6XCLilaZcIixcImJveGh1XCI6XCLilLRcIixcImJveEh1XCI6XCLiladcIixcImJveGhVXCI6XCLilahcIixcImJveEhVXCI6XCLilalcIixcImJveG1pbnVzXCI6XCLiip9cIixcImJveHBsdXNcIjpcIuKKnlwiLFwiYm94dGltZXNcIjpcIuKKoFwiLFwiYm94dWxcIjpcIuKUmFwiLFwiYm94dUxcIjpcIuKVm1wiLFwiYm94VWxcIjpcIuKVnFwiLFwiYm94VUxcIjpcIuKVnVwiLFwiYm94dXJcIjpcIuKUlFwiLFwiYm94dVJcIjpcIuKVmFwiLFwiYm94VXJcIjpcIuKVmVwiLFwiYm94VVJcIjpcIuKVmlwiLFwiYm94dlwiOlwi4pSCXCIsXCJib3hWXCI6XCLilZFcIixcImJveHZoXCI6XCLilLxcIixcImJveHZIXCI6XCLilapcIixcImJveFZoXCI6XCLilatcIixcImJveFZIXCI6XCLilaxcIixcImJveHZsXCI6XCLilKRcIixcImJveHZMXCI6XCLilaFcIixcImJveFZsXCI6XCLilaJcIixcImJveFZMXCI6XCLilaNcIixcImJveHZyXCI6XCLilJxcIixcImJveHZSXCI6XCLilZ5cIixcImJveFZyXCI6XCLilZ9cIixcImJveFZSXCI6XCLilaBcIixcImJwcmltZVwiOlwi4oC1XCIsXCJicmV2ZVwiOlwiy5hcIixcIkJyZXZlXCI6XCLLmFwiLFwiYnJ2YmFyXCI6XCLCplwiLFwiYnNjclwiOlwi8J2St1wiLFwiQnNjclwiOlwi4oSsXCIsXCJic2VtaVwiOlwi4oGPXCIsXCJic2ltXCI6XCLiiL1cIixcImJzaW1lXCI6XCLii41cIixcImJzb2xiXCI6XCLip4VcIixcImJzb2xcIjpcIlxcXFxcIixcImJzb2xoc3ViXCI6XCLin4hcIixcImJ1bGxcIjpcIuKAolwiLFwiYnVsbGV0XCI6XCLigKJcIixcImJ1bXBcIjpcIuKJjlwiLFwiYnVtcEVcIjpcIuKqrlwiLFwiYnVtcGVcIjpcIuKJj1wiLFwiQnVtcGVxXCI6XCLiiY5cIixcImJ1bXBlcVwiOlwi4omPXCIsXCJDYWN1dGVcIjpcIsSGXCIsXCJjYWN1dGVcIjpcIsSHXCIsXCJjYXBhbmRcIjpcIuKphFwiLFwiY2FwYnJjdXBcIjpcIuKpiVwiLFwiY2FwY2FwXCI6XCLiqYtcIixcImNhcFwiOlwi4oipXCIsXCJDYXBcIjpcIuKLklwiLFwiY2FwY3VwXCI6XCLiqYdcIixcImNhcGRvdFwiOlwi4qmAXCIsXCJDYXBpdGFsRGlmZmVyZW50aWFsRFwiOlwi4oWFXCIsXCJjYXBzXCI6XCLiiKnvuIBcIixcImNhcmV0XCI6XCLigYFcIixcImNhcm9uXCI6XCLLh1wiLFwiQ2F5bGV5c1wiOlwi4oStXCIsXCJjY2Fwc1wiOlwi4qmNXCIsXCJDY2Fyb25cIjpcIsSMXCIsXCJjY2Fyb25cIjpcIsSNXCIsXCJDY2VkaWxcIjpcIsOHXCIsXCJjY2VkaWxcIjpcIsOnXCIsXCJDY2lyY1wiOlwixIhcIixcImNjaXJjXCI6XCLEiVwiLFwiQ2NvbmludFwiOlwi4oiwXCIsXCJjY3Vwc1wiOlwi4qmMXCIsXCJjY3Vwc3NtXCI6XCLiqZBcIixcIkNkb3RcIjpcIsSKXCIsXCJjZG90XCI6XCLEi1wiLFwiY2VkaWxcIjpcIsK4XCIsXCJDZWRpbGxhXCI6XCLCuFwiLFwiY2VtcHR5dlwiOlwi4qayXCIsXCJjZW50XCI6XCLColwiLFwiY2VudGVyZG90XCI6XCLCt1wiLFwiQ2VudGVyRG90XCI6XCLCt1wiLFwiY2ZyXCI6XCLwnZSgXCIsXCJDZnJcIjpcIuKErVwiLFwiQ0hjeVwiOlwi0KdcIixcImNoY3lcIjpcItGHXCIsXCJjaGVja1wiOlwi4pyTXCIsXCJjaGVja21hcmtcIjpcIuKck1wiLFwiQ2hpXCI6XCLOp1wiLFwiY2hpXCI6XCLPh1wiLFwiY2lyY1wiOlwiy4ZcIixcImNpcmNlcVwiOlwi4omXXCIsXCJjaXJjbGVhcnJvd2xlZnRcIjpcIuKGulwiLFwiY2lyY2xlYXJyb3dyaWdodFwiOlwi4oa7XCIsXCJjaXJjbGVkYXN0XCI6XCLiiptcIixcImNpcmNsZWRjaXJjXCI6XCLiippcIixcImNpcmNsZWRkYXNoXCI6XCLiip1cIixcIkNpcmNsZURvdFwiOlwi4oqZXCIsXCJjaXJjbGVkUlwiOlwiwq5cIixcImNpcmNsZWRTXCI6XCLik4hcIixcIkNpcmNsZU1pbnVzXCI6XCLiipZcIixcIkNpcmNsZVBsdXNcIjpcIuKKlVwiLFwiQ2lyY2xlVGltZXNcIjpcIuKKl1wiLFwiY2lyXCI6XCLil4tcIixcImNpckVcIjpcIuKng1wiLFwiY2lyZVwiOlwi4omXXCIsXCJjaXJmbmludFwiOlwi4qiQXCIsXCJjaXJtaWRcIjpcIuKrr1wiLFwiY2lyc2NpclwiOlwi4qeCXCIsXCJDbG9ja3dpc2VDb250b3VySW50ZWdyYWxcIjpcIuKIslwiLFwiQ2xvc2VDdXJseURvdWJsZVF1b3RlXCI6XCLigJ1cIixcIkNsb3NlQ3VybHlRdW90ZVwiOlwi4oCZXCIsXCJjbHVic1wiOlwi4pmjXCIsXCJjbHVic3VpdFwiOlwi4pmjXCIsXCJjb2xvblwiOlwiOlwiLFwiQ29sb25cIjpcIuKIt1wiLFwiQ29sb25lXCI6XCLiqbRcIixcImNvbG9uZVwiOlwi4omUXCIsXCJjb2xvbmVxXCI6XCLiiZRcIixcImNvbW1hXCI6XCIsXCIsXCJjb21tYXRcIjpcIkBcIixcImNvbXBcIjpcIuKIgVwiLFwiY29tcGZuXCI6XCLiiJhcIixcImNvbXBsZW1lbnRcIjpcIuKIgVwiLFwiY29tcGxleGVzXCI6XCLihIJcIixcImNvbmdcIjpcIuKJhVwiLFwiY29uZ2RvdFwiOlwi4qmtXCIsXCJDb25ncnVlbnRcIjpcIuKJoVwiLFwiY29uaW50XCI6XCLiiK5cIixcIkNvbmludFwiOlwi4oivXCIsXCJDb250b3VySW50ZWdyYWxcIjpcIuKIrlwiLFwiY29wZlwiOlwi8J2VlFwiLFwiQ29wZlwiOlwi4oSCXCIsXCJjb3Byb2RcIjpcIuKIkFwiLFwiQ29wcm9kdWN0XCI6XCLiiJBcIixcImNvcHlcIjpcIsKpXCIsXCJDT1BZXCI6XCLCqVwiLFwiY29weXNyXCI6XCLihJdcIixcIkNvdW50ZXJDbG9ja3dpc2VDb250b3VySW50ZWdyYWxcIjpcIuKIs1wiLFwiY3JhcnJcIjpcIuKGtVwiLFwiY3Jvc3NcIjpcIuKcl1wiLFwiQ3Jvc3NcIjpcIuKor1wiLFwiQ3NjclwiOlwi8J2SnlwiLFwiY3NjclwiOlwi8J2SuFwiLFwiY3N1YlwiOlwi4quPXCIsXCJjc3ViZVwiOlwi4quRXCIsXCJjc3VwXCI6XCLiq5BcIixcImNzdXBlXCI6XCLiq5JcIixcImN0ZG90XCI6XCLii69cIixcImN1ZGFycmxcIjpcIuKkuFwiLFwiY3VkYXJyclwiOlwi4qS1XCIsXCJjdWVwclwiOlwi4oueXCIsXCJjdWVzY1wiOlwi4oufXCIsXCJjdWxhcnJcIjpcIuKGtlwiLFwiY3VsYXJycFwiOlwi4qS9XCIsXCJjdXBicmNhcFwiOlwi4qmIXCIsXCJjdXBjYXBcIjpcIuKphlwiLFwiQ3VwQ2FwXCI6XCLiiY1cIixcImN1cFwiOlwi4oiqXCIsXCJDdXBcIjpcIuKLk1wiLFwiY3VwY3VwXCI6XCLiqYpcIixcImN1cGRvdFwiOlwi4oqNXCIsXCJjdXBvclwiOlwi4qmFXCIsXCJjdXBzXCI6XCLiiKrvuIBcIixcImN1cmFyclwiOlwi4oa3XCIsXCJjdXJhcnJtXCI6XCLipLxcIixcImN1cmx5ZXFwcmVjXCI6XCLii55cIixcImN1cmx5ZXFzdWNjXCI6XCLii59cIixcImN1cmx5dmVlXCI6XCLii45cIixcImN1cmx5d2VkZ2VcIjpcIuKLj1wiLFwiY3VycmVuXCI6XCLCpFwiLFwiY3VydmVhcnJvd2xlZnRcIjpcIuKGtlwiLFwiY3VydmVhcnJvd3JpZ2h0XCI6XCLihrdcIixcImN1dmVlXCI6XCLii45cIixcImN1d2VkXCI6XCLii49cIixcImN3Y29uaW50XCI6XCLiiLJcIixcImN3aW50XCI6XCLiiLFcIixcImN5bGN0eVwiOlwi4oytXCIsXCJkYWdnZXJcIjpcIuKAoFwiLFwiRGFnZ2VyXCI6XCLigKFcIixcImRhbGV0aFwiOlwi4oS4XCIsXCJkYXJyXCI6XCLihpNcIixcIkRhcnJcIjpcIuKGoVwiLFwiZEFyclwiOlwi4oeTXCIsXCJkYXNoXCI6XCLigJBcIixcIkRhc2h2XCI6XCLiq6RcIixcImRhc2h2XCI6XCLiiqNcIixcImRia2Fyb3dcIjpcIuKkj1wiLFwiZGJsYWNcIjpcIsudXCIsXCJEY2Fyb25cIjpcIsSOXCIsXCJkY2Fyb25cIjpcIsSPXCIsXCJEY3lcIjpcItCUXCIsXCJkY3lcIjpcItC0XCIsXCJkZGFnZ2VyXCI6XCLigKFcIixcImRkYXJyXCI6XCLih4pcIixcIkREXCI6XCLihYVcIixcImRkXCI6XCLihYZcIixcIkREb3RyYWhkXCI6XCLipJFcIixcImRkb3RzZXFcIjpcIuKpt1wiLFwiZGVnXCI6XCLCsFwiLFwiRGVsXCI6XCLiiIdcIixcIkRlbHRhXCI6XCLOlFwiLFwiZGVsdGFcIjpcIs60XCIsXCJkZW1wdHl2XCI6XCLiprFcIixcImRmaXNodFwiOlwi4qW/XCIsXCJEZnJcIjpcIvCdlIdcIixcImRmclwiOlwi8J2UoVwiLFwiZEhhclwiOlwi4qWlXCIsXCJkaGFybFwiOlwi4oeDXCIsXCJkaGFyclwiOlwi4oeCXCIsXCJEaWFjcml0aWNhbEFjdXRlXCI6XCLCtFwiLFwiRGlhY3JpdGljYWxEb3RcIjpcIsuZXCIsXCJEaWFjcml0aWNhbERvdWJsZUFjdXRlXCI6XCLLnVwiLFwiRGlhY3JpdGljYWxHcmF2ZVwiOlwiYFwiLFwiRGlhY3JpdGljYWxUaWxkZVwiOlwiy5xcIixcImRpYW1cIjpcIuKLhFwiLFwiZGlhbW9uZFwiOlwi4ouEXCIsXCJEaWFtb25kXCI6XCLii4RcIixcImRpYW1vbmRzdWl0XCI6XCLimaZcIixcImRpYW1zXCI6XCLimaZcIixcImRpZVwiOlwiwqhcIixcIkRpZmZlcmVudGlhbERcIjpcIuKFhlwiLFwiZGlnYW1tYVwiOlwiz51cIixcImRpc2luXCI6XCLii7JcIixcImRpdlwiOlwiw7dcIixcImRpdmlkZVwiOlwiw7dcIixcImRpdmlkZW9udGltZXNcIjpcIuKLh1wiLFwiZGl2b254XCI6XCLii4dcIixcIkRKY3lcIjpcItCCXCIsXCJkamN5XCI6XCLRklwiLFwiZGxjb3JuXCI6XCLijJ5cIixcImRsY3JvcFwiOlwi4oyNXCIsXCJkb2xsYXJcIjpcIiRcIixcIkRvcGZcIjpcIvCdlLtcIixcImRvcGZcIjpcIvCdlZVcIixcIkRvdFwiOlwiwqhcIixcImRvdFwiOlwiy5lcIixcIkRvdERvdFwiOlwi4oOcXCIsXCJkb3RlcVwiOlwi4omQXCIsXCJkb3RlcWRvdFwiOlwi4omRXCIsXCJEb3RFcXVhbFwiOlwi4omQXCIsXCJkb3RtaW51c1wiOlwi4oi4XCIsXCJkb3RwbHVzXCI6XCLiiJRcIixcImRvdHNxdWFyZVwiOlwi4oqhXCIsXCJkb3VibGViYXJ3ZWRnZVwiOlwi4oyGXCIsXCJEb3VibGVDb250b3VySW50ZWdyYWxcIjpcIuKIr1wiLFwiRG91YmxlRG90XCI6XCLCqFwiLFwiRG91YmxlRG93bkFycm93XCI6XCLih5NcIixcIkRvdWJsZUxlZnRBcnJvd1wiOlwi4oeQXCIsXCJEb3VibGVMZWZ0UmlnaHRBcnJvd1wiOlwi4oeUXCIsXCJEb3VibGVMZWZ0VGVlXCI6XCLiq6RcIixcIkRvdWJsZUxvbmdMZWZ0QXJyb3dcIjpcIuKfuFwiLFwiRG91YmxlTG9uZ0xlZnRSaWdodEFycm93XCI6XCLin7pcIixcIkRvdWJsZUxvbmdSaWdodEFycm93XCI6XCLin7lcIixcIkRvdWJsZVJpZ2h0QXJyb3dcIjpcIuKHklwiLFwiRG91YmxlUmlnaHRUZWVcIjpcIuKKqFwiLFwiRG91YmxlVXBBcnJvd1wiOlwi4oeRXCIsXCJEb3VibGVVcERvd25BcnJvd1wiOlwi4oeVXCIsXCJEb3VibGVWZXJ0aWNhbEJhclwiOlwi4oilXCIsXCJEb3duQXJyb3dCYXJcIjpcIuKkk1wiLFwiZG93bmFycm93XCI6XCLihpNcIixcIkRvd25BcnJvd1wiOlwi4oaTXCIsXCJEb3duYXJyb3dcIjpcIuKHk1wiLFwiRG93bkFycm93VXBBcnJvd1wiOlwi4oe1XCIsXCJEb3duQnJldmVcIjpcIsyRXCIsXCJkb3duZG93bmFycm93c1wiOlwi4oeKXCIsXCJkb3duaGFycG9vbmxlZnRcIjpcIuKHg1wiLFwiZG93bmhhcnBvb25yaWdodFwiOlwi4oeCXCIsXCJEb3duTGVmdFJpZ2h0VmVjdG9yXCI6XCLipZBcIixcIkRvd25MZWZ0VGVlVmVjdG9yXCI6XCLipZ5cIixcIkRvd25MZWZ0VmVjdG9yQmFyXCI6XCLipZZcIixcIkRvd25MZWZ0VmVjdG9yXCI6XCLihr1cIixcIkRvd25SaWdodFRlZVZlY3RvclwiOlwi4qWfXCIsXCJEb3duUmlnaHRWZWN0b3JCYXJcIjpcIuKll1wiLFwiRG93blJpZ2h0VmVjdG9yXCI6XCLih4FcIixcIkRvd25UZWVBcnJvd1wiOlwi4oanXCIsXCJEb3duVGVlXCI6XCLiiqRcIixcImRyYmthcm93XCI6XCLipJBcIixcImRyY29yblwiOlwi4oyfXCIsXCJkcmNyb3BcIjpcIuKMjFwiLFwiRHNjclwiOlwi8J2Sn1wiLFwiZHNjclwiOlwi8J2SuVwiLFwiRFNjeVwiOlwi0IVcIixcImRzY3lcIjpcItGVXCIsXCJkc29sXCI6XCLip7ZcIixcIkRzdHJva1wiOlwixJBcIixcImRzdHJva1wiOlwixJFcIixcImR0ZG90XCI6XCLii7FcIixcImR0cmlcIjpcIuKWv1wiLFwiZHRyaWZcIjpcIuKWvlwiLFwiZHVhcnJcIjpcIuKHtVwiLFwiZHVoYXJcIjpcIuKlr1wiLFwiZHdhbmdsZVwiOlwi4qamXCIsXCJEWmN5XCI6XCLQj1wiLFwiZHpjeVwiOlwi0Z9cIixcImR6aWdyYXJyXCI6XCLin79cIixcIkVhY3V0ZVwiOlwiw4lcIixcImVhY3V0ZVwiOlwiw6lcIixcImVhc3RlclwiOlwi4qmuXCIsXCJFY2Fyb25cIjpcIsSaXCIsXCJlY2Fyb25cIjpcIsSbXCIsXCJFY2lyY1wiOlwiw4pcIixcImVjaXJjXCI6XCLDqlwiLFwiZWNpclwiOlwi4omWXCIsXCJlY29sb25cIjpcIuKJlVwiLFwiRWN5XCI6XCLQrVwiLFwiZWN5XCI6XCLRjVwiLFwiZUREb3RcIjpcIuKpt1wiLFwiRWRvdFwiOlwixJZcIixcImVkb3RcIjpcIsSXXCIsXCJlRG90XCI6XCLiiZFcIixcImVlXCI6XCLihYdcIixcImVmRG90XCI6XCLiiZJcIixcIkVmclwiOlwi8J2UiFwiLFwiZWZyXCI6XCLwnZSiXCIsXCJlZ1wiOlwi4qqaXCIsXCJFZ3JhdmVcIjpcIsOIXCIsXCJlZ3JhdmVcIjpcIsOoXCIsXCJlZ3NcIjpcIuKqllwiLFwiZWdzZG90XCI6XCLiqphcIixcImVsXCI6XCLiqplcIixcIkVsZW1lbnRcIjpcIuKIiFwiLFwiZWxpbnRlcnNcIjpcIuKPp1wiLFwiZWxsXCI6XCLihJNcIixcImVsc1wiOlwi4qqVXCIsXCJlbHNkb3RcIjpcIuKql1wiLFwiRW1hY3JcIjpcIsSSXCIsXCJlbWFjclwiOlwixJNcIixcImVtcHR5XCI6XCLiiIVcIixcImVtcHR5c2V0XCI6XCLiiIVcIixcIkVtcHR5U21hbGxTcXVhcmVcIjpcIuKXu1wiLFwiZW1wdHl2XCI6XCLiiIVcIixcIkVtcHR5VmVyeVNtYWxsU3F1YXJlXCI6XCLilqtcIixcImVtc3AxM1wiOlwi4oCEXCIsXCJlbXNwMTRcIjpcIuKAhVwiLFwiZW1zcFwiOlwi4oCDXCIsXCJFTkdcIjpcIsWKXCIsXCJlbmdcIjpcIsWLXCIsXCJlbnNwXCI6XCLigIJcIixcIkVvZ29uXCI6XCLEmFwiLFwiZW9nb25cIjpcIsSZXCIsXCJFb3BmXCI6XCLwnZS8XCIsXCJlb3BmXCI6XCLwnZWWXCIsXCJlcGFyXCI6XCLii5VcIixcImVwYXJzbFwiOlwi4qejXCIsXCJlcGx1c1wiOlwi4qmxXCIsXCJlcHNpXCI6XCLOtVwiLFwiRXBzaWxvblwiOlwizpVcIixcImVwc2lsb25cIjpcIs61XCIsXCJlcHNpdlwiOlwiz7VcIixcImVxY2lyY1wiOlwi4omWXCIsXCJlcWNvbG9uXCI6XCLiiZVcIixcImVxc2ltXCI6XCLiiYJcIixcImVxc2xhbnRndHJcIjpcIuKqllwiLFwiZXFzbGFudGxlc3NcIjpcIuKqlVwiLFwiRXF1YWxcIjpcIuKptVwiLFwiZXF1YWxzXCI6XCI9XCIsXCJFcXVhbFRpbGRlXCI6XCLiiYJcIixcImVxdWVzdFwiOlwi4omfXCIsXCJFcXVpbGlicml1bVwiOlwi4oeMXCIsXCJlcXVpdlwiOlwi4omhXCIsXCJlcXVpdkREXCI6XCLiqbhcIixcImVxdnBhcnNsXCI6XCLip6VcIixcImVyYXJyXCI6XCLipbFcIixcImVyRG90XCI6XCLiiZNcIixcImVzY3JcIjpcIuKEr1wiLFwiRXNjclwiOlwi4oSwXCIsXCJlc2RvdFwiOlwi4omQXCIsXCJFc2ltXCI6XCLiqbNcIixcImVzaW1cIjpcIuKJglwiLFwiRXRhXCI6XCLOl1wiLFwiZXRhXCI6XCLOt1wiLFwiRVRIXCI6XCLDkFwiLFwiZXRoXCI6XCLDsFwiLFwiRXVtbFwiOlwiw4tcIixcImV1bWxcIjpcIsOrXCIsXCJldXJvXCI6XCLigqxcIixcImV4Y2xcIjpcIiFcIixcImV4aXN0XCI6XCLiiINcIixcIkV4aXN0c1wiOlwi4oiDXCIsXCJleHBlY3RhdGlvblwiOlwi4oSwXCIsXCJleHBvbmVudGlhbGVcIjpcIuKFh1wiLFwiRXhwb25lbnRpYWxFXCI6XCLihYdcIixcImZhbGxpbmdkb3RzZXFcIjpcIuKJklwiLFwiRmN5XCI6XCLQpFwiLFwiZmN5XCI6XCLRhFwiLFwiZmVtYWxlXCI6XCLimYBcIixcImZmaWxpZ1wiOlwi76yDXCIsXCJmZmxpZ1wiOlwi76yAXCIsXCJmZmxsaWdcIjpcIu+shFwiLFwiRmZyXCI6XCLwnZSJXCIsXCJmZnJcIjpcIvCdlKNcIixcImZpbGlnXCI6XCLvrIFcIixcIkZpbGxlZFNtYWxsU3F1YXJlXCI6XCLil7xcIixcIkZpbGxlZFZlcnlTbWFsbFNxdWFyZVwiOlwi4paqXCIsXCJmamxpZ1wiOlwiZmpcIixcImZsYXRcIjpcIuKZrVwiLFwiZmxsaWdcIjpcIu+sglwiLFwiZmx0bnNcIjpcIuKWsVwiLFwiZm5vZlwiOlwixpJcIixcIkZvcGZcIjpcIvCdlL1cIixcImZvcGZcIjpcIvCdlZdcIixcImZvcmFsbFwiOlwi4oiAXCIsXCJGb3JBbGxcIjpcIuKIgFwiLFwiZm9ya1wiOlwi4ouUXCIsXCJmb3JrdlwiOlwi4quZXCIsXCJGb3VyaWVydHJmXCI6XCLihLFcIixcImZwYXJ0aW50XCI6XCLiqI1cIixcImZyYWMxMlwiOlwiwr1cIixcImZyYWMxM1wiOlwi4oWTXCIsXCJmcmFjMTRcIjpcIsK8XCIsXCJmcmFjMTVcIjpcIuKFlVwiLFwiZnJhYzE2XCI6XCLihZlcIixcImZyYWMxOFwiOlwi4oWbXCIsXCJmcmFjMjNcIjpcIuKFlFwiLFwiZnJhYzI1XCI6XCLihZZcIixcImZyYWMzNFwiOlwiwr5cIixcImZyYWMzNVwiOlwi4oWXXCIsXCJmcmFjMzhcIjpcIuKFnFwiLFwiZnJhYzQ1XCI6XCLihZhcIixcImZyYWM1NlwiOlwi4oWaXCIsXCJmcmFjNThcIjpcIuKFnVwiLFwiZnJhYzc4XCI6XCLihZ5cIixcImZyYXNsXCI6XCLigYRcIixcImZyb3duXCI6XCLijKJcIixcImZzY3JcIjpcIvCdkrtcIixcIkZzY3JcIjpcIuKEsVwiLFwiZ2FjdXRlXCI6XCLHtVwiLFwiR2FtbWFcIjpcIs6TXCIsXCJnYW1tYVwiOlwizrNcIixcIkdhbW1hZFwiOlwiz5xcIixcImdhbW1hZFwiOlwiz51cIixcImdhcFwiOlwi4qqGXCIsXCJHYnJldmVcIjpcIsSeXCIsXCJnYnJldmVcIjpcIsSfXCIsXCJHY2VkaWxcIjpcIsSiXCIsXCJHY2lyY1wiOlwixJxcIixcImdjaXJjXCI6XCLEnVwiLFwiR2N5XCI6XCLQk1wiLFwiZ2N5XCI6XCLQs1wiLFwiR2RvdFwiOlwixKBcIixcImdkb3RcIjpcIsShXCIsXCJnZVwiOlwi4omlXCIsXCJnRVwiOlwi4omnXCIsXCJnRWxcIjpcIuKqjFwiLFwiZ2VsXCI6XCLii5tcIixcImdlcVwiOlwi4omlXCIsXCJnZXFxXCI6XCLiiadcIixcImdlcXNsYW50XCI6XCLiqb5cIixcImdlc2NjXCI6XCLiqqlcIixcImdlc1wiOlwi4qm+XCIsXCJnZXNkb3RcIjpcIuKqgFwiLFwiZ2VzZG90b1wiOlwi4qqCXCIsXCJnZXNkb3RvbFwiOlwi4qqEXCIsXCJnZXNsXCI6XCLii5vvuIBcIixcImdlc2xlc1wiOlwi4qqUXCIsXCJHZnJcIjpcIvCdlIpcIixcImdmclwiOlwi8J2UpFwiLFwiZ2dcIjpcIuKJq1wiLFwiR2dcIjpcIuKLmVwiLFwiZ2dnXCI6XCLii5lcIixcImdpbWVsXCI6XCLihLdcIixcIkdKY3lcIjpcItCDXCIsXCJnamN5XCI6XCLRk1wiLFwiZ2xhXCI6XCLiqqVcIixcImdsXCI6XCLiibdcIixcImdsRVwiOlwi4qqSXCIsXCJnbGpcIjpcIuKqpFwiLFwiZ25hcFwiOlwi4qqKXCIsXCJnbmFwcHJveFwiOlwi4qqKXCIsXCJnbmVcIjpcIuKqiFwiLFwiZ25FXCI6XCLiialcIixcImduZXFcIjpcIuKqiFwiLFwiZ25lcXFcIjpcIuKJqVwiLFwiZ25zaW1cIjpcIuKLp1wiLFwiR29wZlwiOlwi8J2UvlwiLFwiZ29wZlwiOlwi8J2VmFwiLFwiZ3JhdmVcIjpcImBcIixcIkdyZWF0ZXJFcXVhbFwiOlwi4omlXCIsXCJHcmVhdGVyRXF1YWxMZXNzXCI6XCLii5tcIixcIkdyZWF0ZXJGdWxsRXF1YWxcIjpcIuKJp1wiLFwiR3JlYXRlckdyZWF0ZXJcIjpcIuKqolwiLFwiR3JlYXRlckxlc3NcIjpcIuKJt1wiLFwiR3JlYXRlclNsYW50RXF1YWxcIjpcIuKpvlwiLFwiR3JlYXRlclRpbGRlXCI6XCLiibNcIixcIkdzY3JcIjpcIvCdkqJcIixcImdzY3JcIjpcIuKEilwiLFwiZ3NpbVwiOlwi4omzXCIsXCJnc2ltZVwiOlwi4qqOXCIsXCJnc2ltbFwiOlwi4qqQXCIsXCJndGNjXCI6XCLiqqdcIixcImd0Y2lyXCI6XCLiqbpcIixcImd0XCI6XCI+XCIsXCJHVFwiOlwiPlwiLFwiR3RcIjpcIuKJq1wiLFwiZ3Rkb3RcIjpcIuKLl1wiLFwiZ3RsUGFyXCI6XCLippVcIixcImd0cXVlc3RcIjpcIuKpvFwiLFwiZ3RyYXBwcm94XCI6XCLiqoZcIixcImd0cmFyclwiOlwi4qW4XCIsXCJndHJkb3RcIjpcIuKLl1wiLFwiZ3RyZXFsZXNzXCI6XCLii5tcIixcImd0cmVxcWxlc3NcIjpcIuKqjFwiLFwiZ3RybGVzc1wiOlwi4om3XCIsXCJndHJzaW1cIjpcIuKJs1wiLFwiZ3ZlcnRuZXFxXCI6XCLiianvuIBcIixcImd2bkVcIjpcIuKJqe+4gFwiLFwiSGFjZWtcIjpcIsuHXCIsXCJoYWlyc3BcIjpcIuKAilwiLFwiaGFsZlwiOlwiwr1cIixcImhhbWlsdFwiOlwi4oSLXCIsXCJIQVJEY3lcIjpcItCqXCIsXCJoYXJkY3lcIjpcItGKXCIsXCJoYXJyY2lyXCI6XCLipYhcIixcImhhcnJcIjpcIuKGlFwiLFwiaEFyclwiOlwi4oeUXCIsXCJoYXJyd1wiOlwi4oatXCIsXCJIYXRcIjpcIl5cIixcImhiYXJcIjpcIuKEj1wiLFwiSGNpcmNcIjpcIsSkXCIsXCJoY2lyY1wiOlwixKVcIixcImhlYXJ0c1wiOlwi4pmlXCIsXCJoZWFydHN1aXRcIjpcIuKZpVwiLFwiaGVsbGlwXCI6XCLigKZcIixcImhlcmNvblwiOlwi4oq5XCIsXCJoZnJcIjpcIvCdlKVcIixcIkhmclwiOlwi4oSMXCIsXCJIaWxiZXJ0U3BhY2VcIjpcIuKEi1wiLFwiaGtzZWFyb3dcIjpcIuKkpVwiLFwiaGtzd2Fyb3dcIjpcIuKkplwiLFwiaG9hcnJcIjpcIuKHv1wiLFwiaG9tdGh0XCI6XCLiiLtcIixcImhvb2tsZWZ0YXJyb3dcIjpcIuKGqVwiLFwiaG9va3JpZ2h0YXJyb3dcIjpcIuKGqlwiLFwiaG9wZlwiOlwi8J2VmVwiLFwiSG9wZlwiOlwi4oSNXCIsXCJob3JiYXJcIjpcIuKAlVwiLFwiSG9yaXpvbnRhbExpbmVcIjpcIuKUgFwiLFwiaHNjclwiOlwi8J2SvVwiLFwiSHNjclwiOlwi4oSLXCIsXCJoc2xhc2hcIjpcIuKEj1wiLFwiSHN0cm9rXCI6XCLEplwiLFwiaHN0cm9rXCI6XCLEp1wiLFwiSHVtcERvd25IdW1wXCI6XCLiiY5cIixcIkh1bXBFcXVhbFwiOlwi4omPXCIsXCJoeWJ1bGxcIjpcIuKBg1wiLFwiaHlwaGVuXCI6XCLigJBcIixcIklhY3V0ZVwiOlwiw41cIixcImlhY3V0ZVwiOlwiw61cIixcImljXCI6XCLigaNcIixcIkljaXJjXCI6XCLDjlwiLFwiaWNpcmNcIjpcIsOuXCIsXCJJY3lcIjpcItCYXCIsXCJpY3lcIjpcItC4XCIsXCJJZG90XCI6XCLEsFwiLFwiSUVjeVwiOlwi0JVcIixcImllY3lcIjpcItC1XCIsXCJpZXhjbFwiOlwiwqFcIixcImlmZlwiOlwi4oeUXCIsXCJpZnJcIjpcIvCdlKZcIixcIklmclwiOlwi4oSRXCIsXCJJZ3JhdmVcIjpcIsOMXCIsXCJpZ3JhdmVcIjpcIsOsXCIsXCJpaVwiOlwi4oWIXCIsXCJpaWlpbnRcIjpcIuKojFwiLFwiaWlpbnRcIjpcIuKIrVwiLFwiaWluZmluXCI6XCLip5xcIixcImlpb3RhXCI6XCLihKlcIixcIklKbGlnXCI6XCLEslwiLFwiaWpsaWdcIjpcIsSzXCIsXCJJbWFjclwiOlwixKpcIixcImltYWNyXCI6XCLEq1wiLFwiaW1hZ2VcIjpcIuKEkVwiLFwiSW1hZ2luYXJ5SVwiOlwi4oWIXCIsXCJpbWFnbGluZVwiOlwi4oSQXCIsXCJpbWFncGFydFwiOlwi4oSRXCIsXCJpbWF0aFwiOlwixLFcIixcIkltXCI6XCLihJFcIixcImltb2ZcIjpcIuKKt1wiLFwiaW1wZWRcIjpcIsa1XCIsXCJJbXBsaWVzXCI6XCLih5JcIixcImluY2FyZVwiOlwi4oSFXCIsXCJpblwiOlwi4oiIXCIsXCJpbmZpblwiOlwi4oieXCIsXCJpbmZpbnRpZVwiOlwi4qedXCIsXCJpbm9kb3RcIjpcIsSxXCIsXCJpbnRjYWxcIjpcIuKKulwiLFwiaW50XCI6XCLiiKtcIixcIkludFwiOlwi4oisXCIsXCJpbnRlZ2Vyc1wiOlwi4oSkXCIsXCJJbnRlZ3JhbFwiOlwi4oirXCIsXCJpbnRlcmNhbFwiOlwi4oq6XCIsXCJJbnRlcnNlY3Rpb25cIjpcIuKLglwiLFwiaW50bGFyaGtcIjpcIuKol1wiLFwiaW50cHJvZFwiOlwi4qi8XCIsXCJJbnZpc2libGVDb21tYVwiOlwi4oGjXCIsXCJJbnZpc2libGVUaW1lc1wiOlwi4oGiXCIsXCJJT2N5XCI6XCLQgVwiLFwiaW9jeVwiOlwi0ZFcIixcIklvZ29uXCI6XCLErlwiLFwiaW9nb25cIjpcIsSvXCIsXCJJb3BmXCI6XCLwnZWAXCIsXCJpb3BmXCI6XCLwnZWaXCIsXCJJb3RhXCI6XCLOmVwiLFwiaW90YVwiOlwizrlcIixcImlwcm9kXCI6XCLiqLxcIixcImlxdWVzdFwiOlwiwr9cIixcImlzY3JcIjpcIvCdkr5cIixcIklzY3JcIjpcIuKEkFwiLFwiaXNpblwiOlwi4oiIXCIsXCJpc2luZG90XCI6XCLii7VcIixcImlzaW5FXCI6XCLii7lcIixcImlzaW5zXCI6XCLii7RcIixcImlzaW5zdlwiOlwi4ouzXCIsXCJpc2ludlwiOlwi4oiIXCIsXCJpdFwiOlwi4oGiXCIsXCJJdGlsZGVcIjpcIsSoXCIsXCJpdGlsZGVcIjpcIsSpXCIsXCJJdWtjeVwiOlwi0IZcIixcIml1a2N5XCI6XCLRllwiLFwiSXVtbFwiOlwiw49cIixcIml1bWxcIjpcIsOvXCIsXCJKY2lyY1wiOlwixLRcIixcImpjaXJjXCI6XCLEtVwiLFwiSmN5XCI6XCLQmVwiLFwiamN5XCI6XCLQuVwiLFwiSmZyXCI6XCLwnZSNXCIsXCJqZnJcIjpcIvCdlKdcIixcImptYXRoXCI6XCLIt1wiLFwiSm9wZlwiOlwi8J2VgVwiLFwiam9wZlwiOlwi8J2Vm1wiLFwiSnNjclwiOlwi8J2SpVwiLFwianNjclwiOlwi8J2Sv1wiLFwiSnNlcmN5XCI6XCLQiFwiLFwianNlcmN5XCI6XCLRmFwiLFwiSnVrY3lcIjpcItCEXCIsXCJqdWtjeVwiOlwi0ZRcIixcIkthcHBhXCI6XCLOmlwiLFwia2FwcGFcIjpcIs66XCIsXCJrYXBwYXZcIjpcIs+wXCIsXCJLY2VkaWxcIjpcIsS2XCIsXCJrY2VkaWxcIjpcIsS3XCIsXCJLY3lcIjpcItCaXCIsXCJrY3lcIjpcItC6XCIsXCJLZnJcIjpcIvCdlI5cIixcImtmclwiOlwi8J2UqFwiLFwia2dyZWVuXCI6XCLEuFwiLFwiS0hjeVwiOlwi0KVcIixcImtoY3lcIjpcItGFXCIsXCJLSmN5XCI6XCLQjFwiLFwia2pjeVwiOlwi0ZxcIixcIktvcGZcIjpcIvCdlYJcIixcImtvcGZcIjpcIvCdlZxcIixcIktzY3JcIjpcIvCdkqZcIixcImtzY3JcIjpcIvCdk4BcIixcImxBYXJyXCI6XCLih5pcIixcIkxhY3V0ZVwiOlwixLlcIixcImxhY3V0ZVwiOlwixLpcIixcImxhZW1wdHl2XCI6XCLiprRcIixcImxhZ3JhblwiOlwi4oSSXCIsXCJMYW1iZGFcIjpcIs6bXCIsXCJsYW1iZGFcIjpcIs67XCIsXCJsYW5nXCI6XCLin6hcIixcIkxhbmdcIjpcIuKfqlwiLFwibGFuZ2RcIjpcIuKmkVwiLFwibGFuZ2xlXCI6XCLin6hcIixcImxhcFwiOlwi4qqFXCIsXCJMYXBsYWNldHJmXCI6XCLihJJcIixcImxhcXVvXCI6XCLCq1wiLFwibGFycmJcIjpcIuKHpFwiLFwibGFycmJmc1wiOlwi4qSfXCIsXCJsYXJyXCI6XCLihpBcIixcIkxhcnJcIjpcIuKGnlwiLFwibEFyclwiOlwi4oeQXCIsXCJsYXJyZnNcIjpcIuKknVwiLFwibGFycmhrXCI6XCLihqlcIixcImxhcnJscFwiOlwi4oarXCIsXCJsYXJycGxcIjpcIuKkuVwiLFwibGFycnNpbVwiOlwi4qWzXCIsXCJsYXJydGxcIjpcIuKGolwiLFwibGF0YWlsXCI6XCLipJlcIixcImxBdGFpbFwiOlwi4qSbXCIsXCJsYXRcIjpcIuKqq1wiLFwibGF0ZVwiOlwi4qqtXCIsXCJsYXRlc1wiOlwi4qqt77iAXCIsXCJsYmFyclwiOlwi4qSMXCIsXCJsQmFyclwiOlwi4qSOXCIsXCJsYmJya1wiOlwi4p2yXCIsXCJsYnJhY2VcIjpcIntcIixcImxicmFja1wiOlwiW1wiLFwibGJya2VcIjpcIuKmi1wiLFwibGJya3NsZFwiOlwi4qaPXCIsXCJsYnJrc2x1XCI6XCLipo1cIixcIkxjYXJvblwiOlwixL1cIixcImxjYXJvblwiOlwixL5cIixcIkxjZWRpbFwiOlwixLtcIixcImxjZWRpbFwiOlwixLxcIixcImxjZWlsXCI6XCLijIhcIixcImxjdWJcIjpcIntcIixcIkxjeVwiOlwi0JtcIixcImxjeVwiOlwi0LtcIixcImxkY2FcIjpcIuKktlwiLFwibGRxdW9cIjpcIuKAnFwiLFwibGRxdW9yXCI6XCLigJ5cIixcImxkcmRoYXJcIjpcIuKlp1wiLFwibGRydXNoYXJcIjpcIuKli1wiLFwibGRzaFwiOlwi4oayXCIsXCJsZVwiOlwi4omkXCIsXCJsRVwiOlwi4ommXCIsXCJMZWZ0QW5nbGVCcmFja2V0XCI6XCLin6hcIixcIkxlZnRBcnJvd0JhclwiOlwi4oekXCIsXCJsZWZ0YXJyb3dcIjpcIuKGkFwiLFwiTGVmdEFycm93XCI6XCLihpBcIixcIkxlZnRhcnJvd1wiOlwi4oeQXCIsXCJMZWZ0QXJyb3dSaWdodEFycm93XCI6XCLih4ZcIixcImxlZnRhcnJvd3RhaWxcIjpcIuKGolwiLFwiTGVmdENlaWxpbmdcIjpcIuKMiFwiLFwiTGVmdERvdWJsZUJyYWNrZXRcIjpcIuKfplwiLFwiTGVmdERvd25UZWVWZWN0b3JcIjpcIuKloVwiLFwiTGVmdERvd25WZWN0b3JCYXJcIjpcIuKlmVwiLFwiTGVmdERvd25WZWN0b3JcIjpcIuKHg1wiLFwiTGVmdEZsb29yXCI6XCLijIpcIixcImxlZnRoYXJwb29uZG93blwiOlwi4oa9XCIsXCJsZWZ0aGFycG9vbnVwXCI6XCLihrxcIixcImxlZnRsZWZ0YXJyb3dzXCI6XCLih4dcIixcImxlZnRyaWdodGFycm93XCI6XCLihpRcIixcIkxlZnRSaWdodEFycm93XCI6XCLihpRcIixcIkxlZnRyaWdodGFycm93XCI6XCLih5RcIixcImxlZnRyaWdodGFycm93c1wiOlwi4oeGXCIsXCJsZWZ0cmlnaHRoYXJwb29uc1wiOlwi4oeLXCIsXCJsZWZ0cmlnaHRzcXVpZ2Fycm93XCI6XCLihq1cIixcIkxlZnRSaWdodFZlY3RvclwiOlwi4qWOXCIsXCJMZWZ0VGVlQXJyb3dcIjpcIuKGpFwiLFwiTGVmdFRlZVwiOlwi4oqjXCIsXCJMZWZ0VGVlVmVjdG9yXCI6XCLipZpcIixcImxlZnR0aHJlZXRpbWVzXCI6XCLii4tcIixcIkxlZnRUcmlhbmdsZUJhclwiOlwi4qePXCIsXCJMZWZ0VHJpYW5nbGVcIjpcIuKKslwiLFwiTGVmdFRyaWFuZ2xlRXF1YWxcIjpcIuKKtFwiLFwiTGVmdFVwRG93blZlY3RvclwiOlwi4qWRXCIsXCJMZWZ0VXBUZWVWZWN0b3JcIjpcIuKloFwiLFwiTGVmdFVwVmVjdG9yQmFyXCI6XCLipZhcIixcIkxlZnRVcFZlY3RvclwiOlwi4oa/XCIsXCJMZWZ0VmVjdG9yQmFyXCI6XCLipZJcIixcIkxlZnRWZWN0b3JcIjpcIuKGvFwiLFwibEVnXCI6XCLiqotcIixcImxlZ1wiOlwi4ouaXCIsXCJsZXFcIjpcIuKJpFwiLFwibGVxcVwiOlwi4ommXCIsXCJsZXFzbGFudFwiOlwi4qm9XCIsXCJsZXNjY1wiOlwi4qqoXCIsXCJsZXNcIjpcIuKpvVwiLFwibGVzZG90XCI6XCLiqb9cIixcImxlc2RvdG9cIjpcIuKqgVwiLFwibGVzZG90b3JcIjpcIuKqg1wiLFwibGVzZ1wiOlwi4oua77iAXCIsXCJsZXNnZXNcIjpcIuKqk1wiLFwibGVzc2FwcHJveFwiOlwi4qqFXCIsXCJsZXNzZG90XCI6XCLii5ZcIixcImxlc3NlcWd0clwiOlwi4ouaXCIsXCJsZXNzZXFxZ3RyXCI6XCLiqotcIixcIkxlc3NFcXVhbEdyZWF0ZXJcIjpcIuKLmlwiLFwiTGVzc0Z1bGxFcXVhbFwiOlwi4ommXCIsXCJMZXNzR3JlYXRlclwiOlwi4om2XCIsXCJsZXNzZ3RyXCI6XCLiibZcIixcIkxlc3NMZXNzXCI6XCLiqqFcIixcImxlc3NzaW1cIjpcIuKJslwiLFwiTGVzc1NsYW50RXF1YWxcIjpcIuKpvVwiLFwiTGVzc1RpbGRlXCI6XCLiibJcIixcImxmaXNodFwiOlwi4qW8XCIsXCJsZmxvb3JcIjpcIuKMilwiLFwiTGZyXCI6XCLwnZSPXCIsXCJsZnJcIjpcIvCdlKlcIixcImxnXCI6XCLiibZcIixcImxnRVwiOlwi4qqRXCIsXCJsSGFyXCI6XCLipaJcIixcImxoYXJkXCI6XCLihr1cIixcImxoYXJ1XCI6XCLihrxcIixcImxoYXJ1bFwiOlwi4qWqXCIsXCJsaGJsa1wiOlwi4paEXCIsXCJMSmN5XCI6XCLQiVwiLFwibGpjeVwiOlwi0ZlcIixcImxsYXJyXCI6XCLih4dcIixcImxsXCI6XCLiiapcIixcIkxsXCI6XCLii5hcIixcImxsY29ybmVyXCI6XCLijJ5cIixcIkxsZWZ0YXJyb3dcIjpcIuKHmlwiLFwibGxoYXJkXCI6XCLipatcIixcImxsdHJpXCI6XCLil7pcIixcIkxtaWRvdFwiOlwixL9cIixcImxtaWRvdFwiOlwixYBcIixcImxtb3VzdGFjaGVcIjpcIuKOsFwiLFwibG1vdXN0XCI6XCLijrBcIixcImxuYXBcIjpcIuKqiVwiLFwibG5hcHByb3hcIjpcIuKqiVwiLFwibG5lXCI6XCLiqodcIixcImxuRVwiOlwi4omoXCIsXCJsbmVxXCI6XCLiqodcIixcImxuZXFxXCI6XCLiiahcIixcImxuc2ltXCI6XCLii6ZcIixcImxvYW5nXCI6XCLin6xcIixcImxvYXJyXCI6XCLih71cIixcImxvYnJrXCI6XCLin6ZcIixcImxvbmdsZWZ0YXJyb3dcIjpcIuKftVwiLFwiTG9uZ0xlZnRBcnJvd1wiOlwi4p+1XCIsXCJMb25nbGVmdGFycm93XCI6XCLin7hcIixcImxvbmdsZWZ0cmlnaHRhcnJvd1wiOlwi4p+3XCIsXCJMb25nTGVmdFJpZ2h0QXJyb3dcIjpcIuKft1wiLFwiTG9uZ2xlZnRyaWdodGFycm93XCI6XCLin7pcIixcImxvbmdtYXBzdG9cIjpcIuKfvFwiLFwibG9uZ3JpZ2h0YXJyb3dcIjpcIuKftlwiLFwiTG9uZ1JpZ2h0QXJyb3dcIjpcIuKftlwiLFwiTG9uZ3JpZ2h0YXJyb3dcIjpcIuKfuVwiLFwibG9vcGFycm93bGVmdFwiOlwi4oarXCIsXCJsb29wYXJyb3dyaWdodFwiOlwi4oasXCIsXCJsb3BhclwiOlwi4qaFXCIsXCJMb3BmXCI6XCLwnZWDXCIsXCJsb3BmXCI6XCLwnZWdXCIsXCJsb3BsdXNcIjpcIuKorVwiLFwibG90aW1lc1wiOlwi4qi0XCIsXCJsb3dhc3RcIjpcIuKIl1wiLFwibG93YmFyXCI6XCJfXCIsXCJMb3dlckxlZnRBcnJvd1wiOlwi4oaZXCIsXCJMb3dlclJpZ2h0QXJyb3dcIjpcIuKGmFwiLFwibG96XCI6XCLil4pcIixcImxvemVuZ2VcIjpcIuKXilwiLFwibG96ZlwiOlwi4qerXCIsXCJscGFyXCI6XCIoXCIsXCJscGFybHRcIjpcIuKmk1wiLFwibHJhcnJcIjpcIuKHhlwiLFwibHJjb3JuZXJcIjpcIuKMn1wiLFwibHJoYXJcIjpcIuKHi1wiLFwibHJoYXJkXCI6XCLipa1cIixcImxybVwiOlwi4oCOXCIsXCJscnRyaVwiOlwi4oq/XCIsXCJsc2FxdW9cIjpcIuKAuVwiLFwibHNjclwiOlwi8J2TgVwiLFwiTHNjclwiOlwi4oSSXCIsXCJsc2hcIjpcIuKGsFwiLFwiTHNoXCI6XCLihrBcIixcImxzaW1cIjpcIuKJslwiLFwibHNpbWVcIjpcIuKqjVwiLFwibHNpbWdcIjpcIuKqj1wiLFwibHNxYlwiOlwiW1wiLFwibHNxdW9cIjpcIuKAmFwiLFwibHNxdW9yXCI6XCLigJpcIixcIkxzdHJva1wiOlwixYFcIixcImxzdHJva1wiOlwixYJcIixcImx0Y2NcIjpcIuKqplwiLFwibHRjaXJcIjpcIuKpuVwiLFwibHRcIjpcIjxcIixcIkxUXCI6XCI8XCIsXCJMdFwiOlwi4omqXCIsXCJsdGRvdFwiOlwi4ouWXCIsXCJsdGhyZWVcIjpcIuKLi1wiLFwibHRpbWVzXCI6XCLii4lcIixcImx0bGFyclwiOlwi4qW2XCIsXCJsdHF1ZXN0XCI6XCLiqbtcIixcImx0cmlcIjpcIuKXg1wiLFwibHRyaWVcIjpcIuKKtFwiLFwibHRyaWZcIjpcIuKXglwiLFwibHRyUGFyXCI6XCLippZcIixcImx1cmRzaGFyXCI6XCLipYpcIixcImx1cnVoYXJcIjpcIuKlplwiLFwibHZlcnRuZXFxXCI6XCLiiajvuIBcIixcImx2bkVcIjpcIuKJqO+4gFwiLFwibWFjclwiOlwiwq9cIixcIm1hbGVcIjpcIuKZglwiLFwibWFsdFwiOlwi4pygXCIsXCJtYWx0ZXNlXCI6XCLinKBcIixcIk1hcFwiOlwi4qSFXCIsXCJtYXBcIjpcIuKGplwiLFwibWFwc3RvXCI6XCLihqZcIixcIm1hcHN0b2Rvd25cIjpcIuKGp1wiLFwibWFwc3RvbGVmdFwiOlwi4oakXCIsXCJtYXBzdG91cFwiOlwi4oalXCIsXCJtYXJrZXJcIjpcIuKWrlwiLFwibWNvbW1hXCI6XCLiqKlcIixcIk1jeVwiOlwi0JxcIixcIm1jeVwiOlwi0LxcIixcIm1kYXNoXCI6XCLigJRcIixcIm1ERG90XCI6XCLiiLpcIixcIm1lYXN1cmVkYW5nbGVcIjpcIuKIoVwiLFwiTWVkaXVtU3BhY2VcIjpcIuKBn1wiLFwiTWVsbGludHJmXCI6XCLihLNcIixcIk1mclwiOlwi8J2UkFwiLFwibWZyXCI6XCLwnZSqXCIsXCJtaG9cIjpcIuKEp1wiLFwibWljcm9cIjpcIsK1XCIsXCJtaWRhc3RcIjpcIipcIixcIm1pZGNpclwiOlwi4quwXCIsXCJtaWRcIjpcIuKIo1wiLFwibWlkZG90XCI6XCLCt1wiLFwibWludXNiXCI6XCLiip9cIixcIm1pbnVzXCI6XCLiiJJcIixcIm1pbnVzZFwiOlwi4oi4XCIsXCJtaW51c2R1XCI6XCLiqKpcIixcIk1pbnVzUGx1c1wiOlwi4oiTXCIsXCJtbGNwXCI6XCLiq5tcIixcIm1sZHJcIjpcIuKAplwiLFwibW5wbHVzXCI6XCLiiJNcIixcIm1vZGVsc1wiOlwi4oqnXCIsXCJNb3BmXCI6XCLwnZWEXCIsXCJtb3BmXCI6XCLwnZWeXCIsXCJtcFwiOlwi4oiTXCIsXCJtc2NyXCI6XCLwnZOCXCIsXCJNc2NyXCI6XCLihLNcIixcIm1zdHBvc1wiOlwi4oi+XCIsXCJNdVwiOlwizpxcIixcIm11XCI6XCLOvFwiLFwibXVsdGltYXBcIjpcIuKKuFwiLFwibXVtYXBcIjpcIuKKuFwiLFwibmFibGFcIjpcIuKIh1wiLFwiTmFjdXRlXCI6XCLFg1wiLFwibmFjdXRlXCI6XCLFhFwiLFwibmFuZ1wiOlwi4oig4oOSXCIsXCJuYXBcIjpcIuKJiVwiLFwibmFwRVwiOlwi4qmwzLhcIixcIm5hcGlkXCI6XCLiiYvMuFwiLFwibmFwb3NcIjpcIsWJXCIsXCJuYXBwcm94XCI6XCLiiYlcIixcIm5hdHVyYWxcIjpcIuKZrlwiLFwibmF0dXJhbHNcIjpcIuKElVwiLFwibmF0dXJcIjpcIuKZrlwiLFwibmJzcFwiOlwiwqBcIixcIm5idW1wXCI6XCLiiY7MuFwiLFwibmJ1bXBlXCI6XCLiiY/MuFwiLFwibmNhcFwiOlwi4qmDXCIsXCJOY2Fyb25cIjpcIsWHXCIsXCJuY2Fyb25cIjpcIsWIXCIsXCJOY2VkaWxcIjpcIsWFXCIsXCJuY2VkaWxcIjpcIsWGXCIsXCJuY29uZ1wiOlwi4omHXCIsXCJuY29uZ2RvdFwiOlwi4qmtzLhcIixcIm5jdXBcIjpcIuKpglwiLFwiTmN5XCI6XCLQnVwiLFwibmN5XCI6XCLQvVwiLFwibmRhc2hcIjpcIuKAk1wiLFwibmVhcmhrXCI6XCLipKRcIixcIm5lYXJyXCI6XCLihpdcIixcIm5lQXJyXCI6XCLih5dcIixcIm5lYXJyb3dcIjpcIuKGl1wiLFwibmVcIjpcIuKJoFwiLFwibmVkb3RcIjpcIuKJkMy4XCIsXCJOZWdhdGl2ZU1lZGl1bVNwYWNlXCI6XCLigItcIixcIk5lZ2F0aXZlVGhpY2tTcGFjZVwiOlwi4oCLXCIsXCJOZWdhdGl2ZVRoaW5TcGFjZVwiOlwi4oCLXCIsXCJOZWdhdGl2ZVZlcnlUaGluU3BhY2VcIjpcIuKAi1wiLFwibmVxdWl2XCI6XCLiiaJcIixcIm5lc2VhclwiOlwi4qSoXCIsXCJuZXNpbVwiOlwi4omCzLhcIixcIk5lc3RlZEdyZWF0ZXJHcmVhdGVyXCI6XCLiiatcIixcIk5lc3RlZExlc3NMZXNzXCI6XCLiiapcIixcIk5ld0xpbmVcIjpcIlxcblwiLFwibmV4aXN0XCI6XCLiiIRcIixcIm5leGlzdHNcIjpcIuKIhFwiLFwiTmZyXCI6XCLwnZSRXCIsXCJuZnJcIjpcIvCdlKtcIixcIm5nRVwiOlwi4omnzLhcIixcIm5nZVwiOlwi4omxXCIsXCJuZ2VxXCI6XCLiibFcIixcIm5nZXFxXCI6XCLiiafMuFwiLFwibmdlcXNsYW50XCI6XCLiqb7MuFwiLFwibmdlc1wiOlwi4qm+zLhcIixcIm5HZ1wiOlwi4ouZzLhcIixcIm5nc2ltXCI6XCLiibVcIixcIm5HdFwiOlwi4omr4oOSXCIsXCJuZ3RcIjpcIuKJr1wiLFwibmd0clwiOlwi4omvXCIsXCJuR3R2XCI6XCLiiavMuFwiLFwibmhhcnJcIjpcIuKGrlwiLFwibmhBcnJcIjpcIuKHjlwiLFwibmhwYXJcIjpcIuKrslwiLFwibmlcIjpcIuKIi1wiLFwibmlzXCI6XCLii7xcIixcIm5pc2RcIjpcIuKLulwiLFwibml2XCI6XCLiiItcIixcIk5KY3lcIjpcItCKXCIsXCJuamN5XCI6XCLRmlwiLFwibmxhcnJcIjpcIuKGmlwiLFwibmxBcnJcIjpcIuKHjVwiLFwibmxkclwiOlwi4oClXCIsXCJubEVcIjpcIuKJpsy4XCIsXCJubGVcIjpcIuKJsFwiLFwibmxlZnRhcnJvd1wiOlwi4oaaXCIsXCJuTGVmdGFycm93XCI6XCLih41cIixcIm5sZWZ0cmlnaHRhcnJvd1wiOlwi4oauXCIsXCJuTGVmdHJpZ2h0YXJyb3dcIjpcIuKHjlwiLFwibmxlcVwiOlwi4omwXCIsXCJubGVxcVwiOlwi4ommzLhcIixcIm5sZXFzbGFudFwiOlwi4qm9zLhcIixcIm5sZXNcIjpcIuKpvcy4XCIsXCJubGVzc1wiOlwi4omuXCIsXCJuTGxcIjpcIuKLmMy4XCIsXCJubHNpbVwiOlwi4om0XCIsXCJuTHRcIjpcIuKJquKDklwiLFwibmx0XCI6XCLiia5cIixcIm5sdHJpXCI6XCLii6pcIixcIm5sdHJpZVwiOlwi4ousXCIsXCJuTHR2XCI6XCLiiarMuFwiLFwibm1pZFwiOlwi4oikXCIsXCJOb0JyZWFrXCI6XCLigaBcIixcIk5vbkJyZWFraW5nU3BhY2VcIjpcIsKgXCIsXCJub3BmXCI6XCLwnZWfXCIsXCJOb3BmXCI6XCLihJVcIixcIk5vdFwiOlwi4qusXCIsXCJub3RcIjpcIsKsXCIsXCJOb3RDb25ncnVlbnRcIjpcIuKJolwiLFwiTm90Q3VwQ2FwXCI6XCLiia1cIixcIk5vdERvdWJsZVZlcnRpY2FsQmFyXCI6XCLiiKZcIixcIk5vdEVsZW1lbnRcIjpcIuKIiVwiLFwiTm90RXF1YWxcIjpcIuKJoFwiLFwiTm90RXF1YWxUaWxkZVwiOlwi4omCzLhcIixcIk5vdEV4aXN0c1wiOlwi4oiEXCIsXCJOb3RHcmVhdGVyXCI6XCLiia9cIixcIk5vdEdyZWF0ZXJFcXVhbFwiOlwi4omxXCIsXCJOb3RHcmVhdGVyRnVsbEVxdWFsXCI6XCLiiafMuFwiLFwiTm90R3JlYXRlckdyZWF0ZXJcIjpcIuKJq8y4XCIsXCJOb3RHcmVhdGVyTGVzc1wiOlwi4om5XCIsXCJOb3RHcmVhdGVyU2xhbnRFcXVhbFwiOlwi4qm+zLhcIixcIk5vdEdyZWF0ZXJUaWxkZVwiOlwi4om1XCIsXCJOb3RIdW1wRG93bkh1bXBcIjpcIuKJjsy4XCIsXCJOb3RIdW1wRXF1YWxcIjpcIuKJj8y4XCIsXCJub3RpblwiOlwi4oiJXCIsXCJub3RpbmRvdFwiOlwi4ou1zLhcIixcIm5vdGluRVwiOlwi4ou5zLhcIixcIm5vdGludmFcIjpcIuKIiVwiLFwibm90aW52YlwiOlwi4ou3XCIsXCJub3RpbnZjXCI6XCLii7ZcIixcIk5vdExlZnRUcmlhbmdsZUJhclwiOlwi4qePzLhcIixcIk5vdExlZnRUcmlhbmdsZVwiOlwi4ouqXCIsXCJOb3RMZWZ0VHJpYW5nbGVFcXVhbFwiOlwi4ousXCIsXCJOb3RMZXNzXCI6XCLiia5cIixcIk5vdExlc3NFcXVhbFwiOlwi4omwXCIsXCJOb3RMZXNzR3JlYXRlclwiOlwi4om4XCIsXCJOb3RMZXNzTGVzc1wiOlwi4omqzLhcIixcIk5vdExlc3NTbGFudEVxdWFsXCI6XCLiqb3MuFwiLFwiTm90TGVzc1RpbGRlXCI6XCLiibRcIixcIk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyXCI6XCLiqqLMuFwiLFwiTm90TmVzdGVkTGVzc0xlc3NcIjpcIuKqocy4XCIsXCJub3RuaVwiOlwi4oiMXCIsXCJub3RuaXZhXCI6XCLiiIxcIixcIm5vdG5pdmJcIjpcIuKLvlwiLFwibm90bml2Y1wiOlwi4ou9XCIsXCJOb3RQcmVjZWRlc1wiOlwi4oqAXCIsXCJOb3RQcmVjZWRlc0VxdWFsXCI6XCLiqq/MuFwiLFwiTm90UHJlY2VkZXNTbGFudEVxdWFsXCI6XCLii6BcIixcIk5vdFJldmVyc2VFbGVtZW50XCI6XCLiiIxcIixcIk5vdFJpZ2h0VHJpYW5nbGVCYXJcIjpcIuKnkMy4XCIsXCJOb3RSaWdodFRyaWFuZ2xlXCI6XCLii6tcIixcIk5vdFJpZ2h0VHJpYW5nbGVFcXVhbFwiOlwi4outXCIsXCJOb3RTcXVhcmVTdWJzZXRcIjpcIuKKj8y4XCIsXCJOb3RTcXVhcmVTdWJzZXRFcXVhbFwiOlwi4ouiXCIsXCJOb3RTcXVhcmVTdXBlcnNldFwiOlwi4oqQzLhcIixcIk5vdFNxdWFyZVN1cGVyc2V0RXF1YWxcIjpcIuKLo1wiLFwiTm90U3Vic2V0XCI6XCLiioLig5JcIixcIk5vdFN1YnNldEVxdWFsXCI6XCLiiohcIixcIk5vdFN1Y2NlZWRzXCI6XCLiioFcIixcIk5vdFN1Y2NlZWRzRXF1YWxcIjpcIuKqsMy4XCIsXCJOb3RTdWNjZWVkc1NsYW50RXF1YWxcIjpcIuKLoVwiLFwiTm90U3VjY2VlZHNUaWxkZVwiOlwi4om/zLhcIixcIk5vdFN1cGVyc2V0XCI6XCLiioPig5JcIixcIk5vdFN1cGVyc2V0RXF1YWxcIjpcIuKKiVwiLFwiTm90VGlsZGVcIjpcIuKJgVwiLFwiTm90VGlsZGVFcXVhbFwiOlwi4omEXCIsXCJOb3RUaWxkZUZ1bGxFcXVhbFwiOlwi4omHXCIsXCJOb3RUaWxkZVRpbGRlXCI6XCLiiYlcIixcIk5vdFZlcnRpY2FsQmFyXCI6XCLiiKRcIixcIm5wYXJhbGxlbFwiOlwi4oimXCIsXCJucGFyXCI6XCLiiKZcIixcIm5wYXJzbFwiOlwi4qu94oOlXCIsXCJucGFydFwiOlwi4oiCzLhcIixcIm5wb2xpbnRcIjpcIuKolFwiLFwibnByXCI6XCLiioBcIixcIm5wcmN1ZVwiOlwi4ougXCIsXCJucHJlY1wiOlwi4oqAXCIsXCJucHJlY2VxXCI6XCLiqq/MuFwiLFwibnByZVwiOlwi4qqvzLhcIixcIm5yYXJyY1wiOlwi4qSzzLhcIixcIm5yYXJyXCI6XCLihptcIixcIm5yQXJyXCI6XCLih49cIixcIm5yYXJyd1wiOlwi4oadzLhcIixcIm5yaWdodGFycm93XCI6XCLihptcIixcIm5SaWdodGFycm93XCI6XCLih49cIixcIm5ydHJpXCI6XCLii6tcIixcIm5ydHJpZVwiOlwi4outXCIsXCJuc2NcIjpcIuKKgVwiLFwibnNjY3VlXCI6XCLii6FcIixcIm5zY2VcIjpcIuKqsMy4XCIsXCJOc2NyXCI6XCLwnZKpXCIsXCJuc2NyXCI6XCLwnZODXCIsXCJuc2hvcnRtaWRcIjpcIuKIpFwiLFwibnNob3J0cGFyYWxsZWxcIjpcIuKIplwiLFwibnNpbVwiOlwi4omBXCIsXCJuc2ltZVwiOlwi4omEXCIsXCJuc2ltZXFcIjpcIuKJhFwiLFwibnNtaWRcIjpcIuKIpFwiLFwibnNwYXJcIjpcIuKIplwiLFwibnNxc3ViZVwiOlwi4ouiXCIsXCJuc3FzdXBlXCI6XCLii6NcIixcIm5zdWJcIjpcIuKKhFwiLFwibnN1YkVcIjpcIuKrhcy4XCIsXCJuc3ViZVwiOlwi4oqIXCIsXCJuc3Vic2V0XCI6XCLiioLig5JcIixcIm5zdWJzZXRlcVwiOlwi4oqIXCIsXCJuc3Vic2V0ZXFxXCI6XCLiq4XMuFwiLFwibnN1Y2NcIjpcIuKKgVwiLFwibnN1Y2NlcVwiOlwi4qqwzLhcIixcIm5zdXBcIjpcIuKKhVwiLFwibnN1cEVcIjpcIuKrhsy4XCIsXCJuc3VwZVwiOlwi4oqJXCIsXCJuc3Vwc2V0XCI6XCLiioPig5JcIixcIm5zdXBzZXRlcVwiOlwi4oqJXCIsXCJuc3Vwc2V0ZXFxXCI6XCLiq4bMuFwiLFwibnRnbFwiOlwi4om5XCIsXCJOdGlsZGVcIjpcIsORXCIsXCJudGlsZGVcIjpcIsOxXCIsXCJudGxnXCI6XCLiibhcIixcIm50cmlhbmdsZWxlZnRcIjpcIuKLqlwiLFwibnRyaWFuZ2xlbGVmdGVxXCI6XCLii6xcIixcIm50cmlhbmdsZXJpZ2h0XCI6XCLii6tcIixcIm50cmlhbmdsZXJpZ2h0ZXFcIjpcIuKLrVwiLFwiTnVcIjpcIs6dXCIsXCJudVwiOlwizr1cIixcIm51bVwiOlwiI1wiLFwibnVtZXJvXCI6XCLihJZcIixcIm51bXNwXCI6XCLigIdcIixcIm52YXBcIjpcIuKJjeKDklwiLFwibnZkYXNoXCI6XCLiiqxcIixcIm52RGFzaFwiOlwi4oqtXCIsXCJuVmRhc2hcIjpcIuKKrlwiLFwiblZEYXNoXCI6XCLiiq9cIixcIm52Z2VcIjpcIuKJpeKDklwiLFwibnZndFwiOlwiPuKDklwiLFwibnZIYXJyXCI6XCLipIRcIixcIm52aW5maW5cIjpcIuKnnlwiLFwibnZsQXJyXCI6XCLipIJcIixcIm52bGVcIjpcIuKJpOKDklwiLFwibnZsdFwiOlwiPOKDklwiLFwibnZsdHJpZVwiOlwi4oq04oOSXCIsXCJudnJBcnJcIjpcIuKkg1wiLFwibnZydHJpZVwiOlwi4oq14oOSXCIsXCJudnNpbVwiOlwi4oi84oOSXCIsXCJud2FyaGtcIjpcIuKko1wiLFwibndhcnJcIjpcIuKGllwiLFwibndBcnJcIjpcIuKHllwiLFwibndhcnJvd1wiOlwi4oaWXCIsXCJud25lYXJcIjpcIuKkp1wiLFwiT2FjdXRlXCI6XCLDk1wiLFwib2FjdXRlXCI6XCLDs1wiLFwib2FzdFwiOlwi4oqbXCIsXCJPY2lyY1wiOlwiw5RcIixcIm9jaXJjXCI6XCLDtFwiLFwib2NpclwiOlwi4oqaXCIsXCJPY3lcIjpcItCeXCIsXCJvY3lcIjpcItC+XCIsXCJvZGFzaFwiOlwi4oqdXCIsXCJPZGJsYWNcIjpcIsWQXCIsXCJvZGJsYWNcIjpcIsWRXCIsXCJvZGl2XCI6XCLiqLhcIixcIm9kb3RcIjpcIuKKmVwiLFwib2Rzb2xkXCI6XCLiprxcIixcIk9FbGlnXCI6XCLFklwiLFwib2VsaWdcIjpcIsWTXCIsXCJvZmNpclwiOlwi4qa/XCIsXCJPZnJcIjpcIvCdlJJcIixcIm9mclwiOlwi8J2UrFwiLFwib2dvblwiOlwiy5tcIixcIk9ncmF2ZVwiOlwiw5JcIixcIm9ncmF2ZVwiOlwiw7JcIixcIm9ndFwiOlwi4qeBXCIsXCJvaGJhclwiOlwi4qa1XCIsXCJvaG1cIjpcIs6pXCIsXCJvaW50XCI6XCLiiK5cIixcIm9sYXJyXCI6XCLihrpcIixcIm9sY2lyXCI6XCLipr5cIixcIm9sY3Jvc3NcIjpcIuKmu1wiLFwib2xpbmVcIjpcIuKAvlwiLFwib2x0XCI6XCLip4BcIixcIk9tYWNyXCI6XCLFjFwiLFwib21hY3JcIjpcIsWNXCIsXCJPbWVnYVwiOlwizqlcIixcIm9tZWdhXCI6XCLPiVwiLFwiT21pY3JvblwiOlwizp9cIixcIm9taWNyb25cIjpcIs6/XCIsXCJvbWlkXCI6XCLiprZcIixcIm9taW51c1wiOlwi4oqWXCIsXCJPb3BmXCI6XCLwnZWGXCIsXCJvb3BmXCI6XCLwnZWgXCIsXCJvcGFyXCI6XCLiprdcIixcIk9wZW5DdXJseURvdWJsZVF1b3RlXCI6XCLigJxcIixcIk9wZW5DdXJseVF1b3RlXCI6XCLigJhcIixcIm9wZXJwXCI6XCLiprlcIixcIm9wbHVzXCI6XCLiipVcIixcIm9yYXJyXCI6XCLihrtcIixcIk9yXCI6XCLiqZRcIixcIm9yXCI6XCLiiKhcIixcIm9yZFwiOlwi4qmdXCIsXCJvcmRlclwiOlwi4oS0XCIsXCJvcmRlcm9mXCI6XCLihLRcIixcIm9yZGZcIjpcIsKqXCIsXCJvcmRtXCI6XCLCulwiLFwib3JpZ29mXCI6XCLiirZcIixcIm9yb3JcIjpcIuKpllwiLFwib3JzbG9wZVwiOlwi4qmXXCIsXCJvcnZcIjpcIuKpm1wiLFwib1NcIjpcIuKTiFwiLFwiT3NjclwiOlwi8J2SqlwiLFwib3NjclwiOlwi4oS0XCIsXCJPc2xhc2hcIjpcIsOYXCIsXCJvc2xhc2hcIjpcIsO4XCIsXCJvc29sXCI6XCLiiphcIixcIk90aWxkZVwiOlwiw5VcIixcIm90aWxkZVwiOlwiw7VcIixcIm90aW1lc2FzXCI6XCLiqLZcIixcIk90aW1lc1wiOlwi4qi3XCIsXCJvdGltZXNcIjpcIuKKl1wiLFwiT3VtbFwiOlwiw5ZcIixcIm91bWxcIjpcIsO2XCIsXCJvdmJhclwiOlwi4oy9XCIsXCJPdmVyQmFyXCI6XCLigL5cIixcIk92ZXJCcmFjZVwiOlwi4o+eXCIsXCJPdmVyQnJhY2tldFwiOlwi4o60XCIsXCJPdmVyUGFyZW50aGVzaXNcIjpcIuKPnFwiLFwicGFyYVwiOlwiwrZcIixcInBhcmFsbGVsXCI6XCLiiKVcIixcInBhclwiOlwi4oilXCIsXCJwYXJzaW1cIjpcIuKrs1wiLFwicGFyc2xcIjpcIuKrvVwiLFwicGFydFwiOlwi4oiCXCIsXCJQYXJ0aWFsRFwiOlwi4oiCXCIsXCJQY3lcIjpcItCfXCIsXCJwY3lcIjpcItC/XCIsXCJwZXJjbnRcIjpcIiVcIixcInBlcmlvZFwiOlwiLlwiLFwicGVybWlsXCI6XCLigLBcIixcInBlcnBcIjpcIuKKpVwiLFwicGVydGVua1wiOlwi4oCxXCIsXCJQZnJcIjpcIvCdlJNcIixcInBmclwiOlwi8J2UrVwiLFwiUGhpXCI6XCLOplwiLFwicGhpXCI6XCLPhlwiLFwicGhpdlwiOlwiz5VcIixcInBobW1hdFwiOlwi4oSzXCIsXCJwaG9uZVwiOlwi4piOXCIsXCJQaVwiOlwizqBcIixcInBpXCI6XCLPgFwiLFwicGl0Y2hmb3JrXCI6XCLii5RcIixcInBpdlwiOlwiz5ZcIixcInBsYW5ja1wiOlwi4oSPXCIsXCJwbGFuY2toXCI6XCLihI5cIixcInBsYW5rdlwiOlwi4oSPXCIsXCJwbHVzYWNpclwiOlwi4qijXCIsXCJwbHVzYlwiOlwi4oqeXCIsXCJwbHVzY2lyXCI6XCLiqKJcIixcInBsdXNcIjpcIitcIixcInBsdXNkb1wiOlwi4oiUXCIsXCJwbHVzZHVcIjpcIuKopVwiLFwicGx1c2VcIjpcIuKpslwiLFwiUGx1c01pbnVzXCI6XCLCsVwiLFwicGx1c21uXCI6XCLCsVwiLFwicGx1c3NpbVwiOlwi4qimXCIsXCJwbHVzdHdvXCI6XCLiqKdcIixcInBtXCI6XCLCsVwiLFwiUG9pbmNhcmVwbGFuZVwiOlwi4oSMXCIsXCJwb2ludGludFwiOlwi4qiVXCIsXCJwb3BmXCI6XCLwnZWhXCIsXCJQb3BmXCI6XCLihJlcIixcInBvdW5kXCI6XCLCo1wiLFwicHJhcFwiOlwi4qq3XCIsXCJQclwiOlwi4qq7XCIsXCJwclwiOlwi4om6XCIsXCJwcmN1ZVwiOlwi4om8XCIsXCJwcmVjYXBwcm94XCI6XCLiqrdcIixcInByZWNcIjpcIuKJulwiLFwicHJlY2N1cmx5ZXFcIjpcIuKJvFwiLFwiUHJlY2VkZXNcIjpcIuKJulwiLFwiUHJlY2VkZXNFcXVhbFwiOlwi4qqvXCIsXCJQcmVjZWRlc1NsYW50RXF1YWxcIjpcIuKJvFwiLFwiUHJlY2VkZXNUaWxkZVwiOlwi4om+XCIsXCJwcmVjZXFcIjpcIuKqr1wiLFwicHJlY25hcHByb3hcIjpcIuKquVwiLFwicHJlY25lcXFcIjpcIuKqtVwiLFwicHJlY25zaW1cIjpcIuKLqFwiLFwicHJlXCI6XCLiqq9cIixcInByRVwiOlwi4qqzXCIsXCJwcmVjc2ltXCI6XCLiib5cIixcInByaW1lXCI6XCLigLJcIixcIlByaW1lXCI6XCLigLNcIixcInByaW1lc1wiOlwi4oSZXCIsXCJwcm5hcFwiOlwi4qq5XCIsXCJwcm5FXCI6XCLiqrVcIixcInBybnNpbVwiOlwi4ouoXCIsXCJwcm9kXCI6XCLiiI9cIixcIlByb2R1Y3RcIjpcIuKIj1wiLFwicHJvZmFsYXJcIjpcIuKMrlwiLFwicHJvZmxpbmVcIjpcIuKMklwiLFwicHJvZnN1cmZcIjpcIuKMk1wiLFwicHJvcFwiOlwi4oidXCIsXCJQcm9wb3J0aW9uYWxcIjpcIuKInVwiLFwiUHJvcG9ydGlvblwiOlwi4oi3XCIsXCJwcm9wdG9cIjpcIuKInVwiLFwicHJzaW1cIjpcIuKJvlwiLFwicHJ1cmVsXCI6XCLiirBcIixcIlBzY3JcIjpcIvCdkqtcIixcInBzY3JcIjpcIvCdk4VcIixcIlBzaVwiOlwizqhcIixcInBzaVwiOlwiz4hcIixcInB1bmNzcFwiOlwi4oCIXCIsXCJRZnJcIjpcIvCdlJRcIixcInFmclwiOlwi8J2UrlwiLFwicWludFwiOlwi4qiMXCIsXCJxb3BmXCI6XCLwnZWiXCIsXCJRb3BmXCI6XCLihJpcIixcInFwcmltZVwiOlwi4oGXXCIsXCJRc2NyXCI6XCLwnZKsXCIsXCJxc2NyXCI6XCLwnZOGXCIsXCJxdWF0ZXJuaW9uc1wiOlwi4oSNXCIsXCJxdWF0aW50XCI6XCLiqJZcIixcInF1ZXN0XCI6XCI/XCIsXCJxdWVzdGVxXCI6XCLiiZ9cIixcInF1b3RcIjpcIlxcXCJcIixcIlFVT1RcIjpcIlxcXCJcIixcInJBYXJyXCI6XCLih5tcIixcInJhY2VcIjpcIuKIvcyxXCIsXCJSYWN1dGVcIjpcIsWUXCIsXCJyYWN1dGVcIjpcIsWVXCIsXCJyYWRpY1wiOlwi4oiaXCIsXCJyYWVtcHR5dlwiOlwi4qazXCIsXCJyYW5nXCI6XCLin6lcIixcIlJhbmdcIjpcIuKfq1wiLFwicmFuZ2RcIjpcIuKmklwiLFwicmFuZ2VcIjpcIuKmpVwiLFwicmFuZ2xlXCI6XCLin6lcIixcInJhcXVvXCI6XCLCu1wiLFwicmFycmFwXCI6XCLipbVcIixcInJhcnJiXCI6XCLih6VcIixcInJhcnJiZnNcIjpcIuKkoFwiLFwicmFycmNcIjpcIuKks1wiLFwicmFyclwiOlwi4oaSXCIsXCJSYXJyXCI6XCLihqBcIixcInJBcnJcIjpcIuKHklwiLFwicmFycmZzXCI6XCLipJ5cIixcInJhcnJoa1wiOlwi4oaqXCIsXCJyYXJybHBcIjpcIuKGrFwiLFwicmFycnBsXCI6XCLipYVcIixcInJhcnJzaW1cIjpcIuKltFwiLFwiUmFycnRsXCI6XCLipJZcIixcInJhcnJ0bFwiOlwi4oajXCIsXCJyYXJyd1wiOlwi4oadXCIsXCJyYXRhaWxcIjpcIuKkmlwiLFwickF0YWlsXCI6XCLipJxcIixcInJhdGlvXCI6XCLiiLZcIixcInJhdGlvbmFsc1wiOlwi4oSaXCIsXCJyYmFyclwiOlwi4qSNXCIsXCJyQmFyclwiOlwi4qSPXCIsXCJSQmFyclwiOlwi4qSQXCIsXCJyYmJya1wiOlwi4p2zXCIsXCJyYnJhY2VcIjpcIn1cIixcInJicmFja1wiOlwiXVwiLFwicmJya2VcIjpcIuKmjFwiLFwicmJya3NsZFwiOlwi4qaOXCIsXCJyYnJrc2x1XCI6XCLippBcIixcIlJjYXJvblwiOlwixZhcIixcInJjYXJvblwiOlwixZlcIixcIlJjZWRpbFwiOlwixZZcIixcInJjZWRpbFwiOlwixZdcIixcInJjZWlsXCI6XCLijIlcIixcInJjdWJcIjpcIn1cIixcIlJjeVwiOlwi0KBcIixcInJjeVwiOlwi0YBcIixcInJkY2FcIjpcIuKkt1wiLFwicmRsZGhhclwiOlwi4qWpXCIsXCJyZHF1b1wiOlwi4oCdXCIsXCJyZHF1b3JcIjpcIuKAnVwiLFwicmRzaFwiOlwi4oazXCIsXCJyZWFsXCI6XCLihJxcIixcInJlYWxpbmVcIjpcIuKEm1wiLFwicmVhbHBhcnRcIjpcIuKEnFwiLFwicmVhbHNcIjpcIuKEnVwiLFwiUmVcIjpcIuKEnFwiLFwicmVjdFwiOlwi4patXCIsXCJyZWdcIjpcIsKuXCIsXCJSRUdcIjpcIsKuXCIsXCJSZXZlcnNlRWxlbWVudFwiOlwi4oiLXCIsXCJSZXZlcnNlRXF1aWxpYnJpdW1cIjpcIuKHi1wiLFwiUmV2ZXJzZVVwRXF1aWxpYnJpdW1cIjpcIuKlr1wiLFwicmZpc2h0XCI6XCLipb1cIixcInJmbG9vclwiOlwi4oyLXCIsXCJyZnJcIjpcIvCdlK9cIixcIlJmclwiOlwi4oScXCIsXCJySGFyXCI6XCLipaRcIixcInJoYXJkXCI6XCLih4FcIixcInJoYXJ1XCI6XCLih4BcIixcInJoYXJ1bFwiOlwi4qWsXCIsXCJSaG9cIjpcIs6hXCIsXCJyaG9cIjpcIs+BXCIsXCJyaG92XCI6XCLPsVwiLFwiUmlnaHRBbmdsZUJyYWNrZXRcIjpcIuKfqVwiLFwiUmlnaHRBcnJvd0JhclwiOlwi4oelXCIsXCJyaWdodGFycm93XCI6XCLihpJcIixcIlJpZ2h0QXJyb3dcIjpcIuKGklwiLFwiUmlnaHRhcnJvd1wiOlwi4oeSXCIsXCJSaWdodEFycm93TGVmdEFycm93XCI6XCLih4RcIixcInJpZ2h0YXJyb3d0YWlsXCI6XCLihqNcIixcIlJpZ2h0Q2VpbGluZ1wiOlwi4oyJXCIsXCJSaWdodERvdWJsZUJyYWNrZXRcIjpcIuKfp1wiLFwiUmlnaHREb3duVGVlVmVjdG9yXCI6XCLipZ1cIixcIlJpZ2h0RG93blZlY3RvckJhclwiOlwi4qWVXCIsXCJSaWdodERvd25WZWN0b3JcIjpcIuKHglwiLFwiUmlnaHRGbG9vclwiOlwi4oyLXCIsXCJyaWdodGhhcnBvb25kb3duXCI6XCLih4FcIixcInJpZ2h0aGFycG9vbnVwXCI6XCLih4BcIixcInJpZ2h0bGVmdGFycm93c1wiOlwi4oeEXCIsXCJyaWdodGxlZnRoYXJwb29uc1wiOlwi4oeMXCIsXCJyaWdodHJpZ2h0YXJyb3dzXCI6XCLih4lcIixcInJpZ2h0c3F1aWdhcnJvd1wiOlwi4oadXCIsXCJSaWdodFRlZUFycm93XCI6XCLihqZcIixcIlJpZ2h0VGVlXCI6XCLiiqJcIixcIlJpZ2h0VGVlVmVjdG9yXCI6XCLipZtcIixcInJpZ2h0dGhyZWV0aW1lc1wiOlwi4ouMXCIsXCJSaWdodFRyaWFuZ2xlQmFyXCI6XCLip5BcIixcIlJpZ2h0VHJpYW5nbGVcIjpcIuKKs1wiLFwiUmlnaHRUcmlhbmdsZUVxdWFsXCI6XCLiirVcIixcIlJpZ2h0VXBEb3duVmVjdG9yXCI6XCLipY9cIixcIlJpZ2h0VXBUZWVWZWN0b3JcIjpcIuKlnFwiLFwiUmlnaHRVcFZlY3RvckJhclwiOlwi4qWUXCIsXCJSaWdodFVwVmVjdG9yXCI6XCLihr5cIixcIlJpZ2h0VmVjdG9yQmFyXCI6XCLipZNcIixcIlJpZ2h0VmVjdG9yXCI6XCLih4BcIixcInJpbmdcIjpcIsuaXCIsXCJyaXNpbmdkb3RzZXFcIjpcIuKJk1wiLFwicmxhcnJcIjpcIuKHhFwiLFwicmxoYXJcIjpcIuKHjFwiLFwicmxtXCI6XCLigI9cIixcInJtb3VzdGFjaGVcIjpcIuKOsVwiLFwicm1vdXN0XCI6XCLijrFcIixcInJubWlkXCI6XCLiq65cIixcInJvYW5nXCI6XCLin61cIixcInJvYXJyXCI6XCLih75cIixcInJvYnJrXCI6XCLin6dcIixcInJvcGFyXCI6XCLipoZcIixcInJvcGZcIjpcIvCdlaNcIixcIlJvcGZcIjpcIuKEnVwiLFwicm9wbHVzXCI6XCLiqK5cIixcInJvdGltZXNcIjpcIuKotVwiLFwiUm91bmRJbXBsaWVzXCI6XCLipbBcIixcInJwYXJcIjpcIilcIixcInJwYXJndFwiOlwi4qaUXCIsXCJycHBvbGludFwiOlwi4qiSXCIsXCJycmFyclwiOlwi4oeJXCIsXCJScmlnaHRhcnJvd1wiOlwi4oebXCIsXCJyc2FxdW9cIjpcIuKAulwiLFwicnNjclwiOlwi8J2Th1wiLFwiUnNjclwiOlwi4oSbXCIsXCJyc2hcIjpcIuKGsVwiLFwiUnNoXCI6XCLihrFcIixcInJzcWJcIjpcIl1cIixcInJzcXVvXCI6XCLigJlcIixcInJzcXVvclwiOlwi4oCZXCIsXCJydGhyZWVcIjpcIuKLjFwiLFwicnRpbWVzXCI6XCLii4pcIixcInJ0cmlcIjpcIuKWuVwiLFwicnRyaWVcIjpcIuKKtVwiLFwicnRyaWZcIjpcIuKWuFwiLFwicnRyaWx0cmlcIjpcIuKnjlwiLFwiUnVsZURlbGF5ZWRcIjpcIuKntFwiLFwicnVsdWhhclwiOlwi4qWoXCIsXCJyeFwiOlwi4oSeXCIsXCJTYWN1dGVcIjpcIsWaXCIsXCJzYWN1dGVcIjpcIsWbXCIsXCJzYnF1b1wiOlwi4oCaXCIsXCJzY2FwXCI6XCLiqrhcIixcIlNjYXJvblwiOlwixaBcIixcInNjYXJvblwiOlwixaFcIixcIlNjXCI6XCLiqrxcIixcInNjXCI6XCLiibtcIixcInNjY3VlXCI6XCLiib1cIixcInNjZVwiOlwi4qqwXCIsXCJzY0VcIjpcIuKqtFwiLFwiU2NlZGlsXCI6XCLFnlwiLFwic2NlZGlsXCI6XCLFn1wiLFwiU2NpcmNcIjpcIsWcXCIsXCJzY2lyY1wiOlwixZ1cIixcInNjbmFwXCI6XCLiqrpcIixcInNjbkVcIjpcIuKqtlwiLFwic2Nuc2ltXCI6XCLii6lcIixcInNjcG9saW50XCI6XCLiqJNcIixcInNjc2ltXCI6XCLiib9cIixcIlNjeVwiOlwi0KFcIixcInNjeVwiOlwi0YFcIixcInNkb3RiXCI6XCLiiqFcIixcInNkb3RcIjpcIuKLhVwiLFwic2RvdGVcIjpcIuKpplwiLFwic2VhcmhrXCI6XCLipKVcIixcInNlYXJyXCI6XCLihphcIixcInNlQXJyXCI6XCLih5hcIixcInNlYXJyb3dcIjpcIuKGmFwiLFwic2VjdFwiOlwiwqdcIixcInNlbWlcIjpcIjtcIixcInNlc3dhclwiOlwi4qSpXCIsXCJzZXRtaW51c1wiOlwi4oiWXCIsXCJzZXRtblwiOlwi4oiWXCIsXCJzZXh0XCI6XCLinLZcIixcIlNmclwiOlwi8J2UllwiLFwic2ZyXCI6XCLwnZSwXCIsXCJzZnJvd25cIjpcIuKMolwiLFwic2hhcnBcIjpcIuKZr1wiLFwiU0hDSGN5XCI6XCLQqVwiLFwic2hjaGN5XCI6XCLRiVwiLFwiU0hjeVwiOlwi0KhcIixcInNoY3lcIjpcItGIXCIsXCJTaG9ydERvd25BcnJvd1wiOlwi4oaTXCIsXCJTaG9ydExlZnRBcnJvd1wiOlwi4oaQXCIsXCJzaG9ydG1pZFwiOlwi4oijXCIsXCJzaG9ydHBhcmFsbGVsXCI6XCLiiKVcIixcIlNob3J0UmlnaHRBcnJvd1wiOlwi4oaSXCIsXCJTaG9ydFVwQXJyb3dcIjpcIuKGkVwiLFwic2h5XCI6XCLCrVwiLFwiU2lnbWFcIjpcIs6jXCIsXCJzaWdtYVwiOlwiz4NcIixcInNpZ21hZlwiOlwiz4JcIixcInNpZ21hdlwiOlwiz4JcIixcInNpbVwiOlwi4oi8XCIsXCJzaW1kb3RcIjpcIuKpqlwiLFwic2ltZVwiOlwi4omDXCIsXCJzaW1lcVwiOlwi4omDXCIsXCJzaW1nXCI6XCLiqp5cIixcInNpbWdFXCI6XCLiqqBcIixcInNpbWxcIjpcIuKqnVwiLFwic2ltbEVcIjpcIuKqn1wiLFwic2ltbmVcIjpcIuKJhlwiLFwic2ltcGx1c1wiOlwi4qikXCIsXCJzaW1yYXJyXCI6XCLipbJcIixcInNsYXJyXCI6XCLihpBcIixcIlNtYWxsQ2lyY2xlXCI6XCLiiJhcIixcInNtYWxsc2V0bWludXNcIjpcIuKIllwiLFwic21hc2hwXCI6XCLiqLNcIixcInNtZXBhcnNsXCI6XCLip6RcIixcInNtaWRcIjpcIuKIo1wiLFwic21pbGVcIjpcIuKMo1wiLFwic210XCI6XCLiqqpcIixcInNtdGVcIjpcIuKqrFwiLFwic210ZXNcIjpcIuKqrO+4gFwiLFwiU09GVGN5XCI6XCLQrFwiLFwic29mdGN5XCI6XCLRjFwiLFwic29sYmFyXCI6XCLijL9cIixcInNvbGJcIjpcIuKnhFwiLFwic29sXCI6XCIvXCIsXCJTb3BmXCI6XCLwnZWKXCIsXCJzb3BmXCI6XCLwnZWkXCIsXCJzcGFkZXNcIjpcIuKZoFwiLFwic3BhZGVzdWl0XCI6XCLimaBcIixcInNwYXJcIjpcIuKIpVwiLFwic3FjYXBcIjpcIuKKk1wiLFwic3FjYXBzXCI6XCLiipPvuIBcIixcInNxY3VwXCI6XCLiipRcIixcInNxY3Vwc1wiOlwi4oqU77iAXCIsXCJTcXJ0XCI6XCLiiJpcIixcInNxc3ViXCI6XCLiio9cIixcInNxc3ViZVwiOlwi4oqRXCIsXCJzcXN1YnNldFwiOlwi4oqPXCIsXCJzcXN1YnNldGVxXCI6XCLiipFcIixcInNxc3VwXCI6XCLiipBcIixcInNxc3VwZVwiOlwi4oqSXCIsXCJzcXN1cHNldFwiOlwi4oqQXCIsXCJzcXN1cHNldGVxXCI6XCLiipJcIixcInNxdWFyZVwiOlwi4pahXCIsXCJTcXVhcmVcIjpcIuKWoVwiLFwiU3F1YXJlSW50ZXJzZWN0aW9uXCI6XCLiipNcIixcIlNxdWFyZVN1YnNldFwiOlwi4oqPXCIsXCJTcXVhcmVTdWJzZXRFcXVhbFwiOlwi4oqRXCIsXCJTcXVhcmVTdXBlcnNldFwiOlwi4oqQXCIsXCJTcXVhcmVTdXBlcnNldEVxdWFsXCI6XCLiipJcIixcIlNxdWFyZVVuaW9uXCI6XCLiipRcIixcInNxdWFyZlwiOlwi4paqXCIsXCJzcXVcIjpcIuKWoVwiLFwic3F1ZlwiOlwi4paqXCIsXCJzcmFyclwiOlwi4oaSXCIsXCJTc2NyXCI6XCLwnZKuXCIsXCJzc2NyXCI6XCLwnZOIXCIsXCJzc2V0bW5cIjpcIuKIllwiLFwic3NtaWxlXCI6XCLijKNcIixcInNzdGFyZlwiOlwi4ouGXCIsXCJTdGFyXCI6XCLii4ZcIixcInN0YXJcIjpcIuKYhlwiLFwic3RhcmZcIjpcIuKYhVwiLFwic3RyYWlnaHRlcHNpbG9uXCI6XCLPtVwiLFwic3RyYWlnaHRwaGlcIjpcIs+VXCIsXCJzdHJuc1wiOlwiwq9cIixcInN1YlwiOlwi4oqCXCIsXCJTdWJcIjpcIuKLkFwiLFwic3ViZG90XCI6XCLiqr1cIixcInN1YkVcIjpcIuKrhVwiLFwic3ViZVwiOlwi4oqGXCIsXCJzdWJlZG90XCI6XCLiq4NcIixcInN1Ym11bHRcIjpcIuKrgVwiLFwic3VibkVcIjpcIuKri1wiLFwic3VibmVcIjpcIuKKilwiLFwic3VicGx1c1wiOlwi4qq/XCIsXCJzdWJyYXJyXCI6XCLipblcIixcInN1YnNldFwiOlwi4oqCXCIsXCJTdWJzZXRcIjpcIuKLkFwiLFwic3Vic2V0ZXFcIjpcIuKKhlwiLFwic3Vic2V0ZXFxXCI6XCLiq4VcIixcIlN1YnNldEVxdWFsXCI6XCLiioZcIixcInN1YnNldG5lcVwiOlwi4oqKXCIsXCJzdWJzZXRuZXFxXCI6XCLiq4tcIixcInN1YnNpbVwiOlwi4quHXCIsXCJzdWJzdWJcIjpcIuKrlVwiLFwic3Vic3VwXCI6XCLiq5NcIixcInN1Y2NhcHByb3hcIjpcIuKquFwiLFwic3VjY1wiOlwi4om7XCIsXCJzdWNjY3VybHllcVwiOlwi4om9XCIsXCJTdWNjZWVkc1wiOlwi4om7XCIsXCJTdWNjZWVkc0VxdWFsXCI6XCLiqrBcIixcIlN1Y2NlZWRzU2xhbnRFcXVhbFwiOlwi4om9XCIsXCJTdWNjZWVkc1RpbGRlXCI6XCLiib9cIixcInN1Y2NlcVwiOlwi4qqwXCIsXCJzdWNjbmFwcHJveFwiOlwi4qq6XCIsXCJzdWNjbmVxcVwiOlwi4qq2XCIsXCJzdWNjbnNpbVwiOlwi4oupXCIsXCJzdWNjc2ltXCI6XCLiib9cIixcIlN1Y2hUaGF0XCI6XCLiiItcIixcInN1bVwiOlwi4oiRXCIsXCJTdW1cIjpcIuKIkVwiLFwic3VuZ1wiOlwi4pmqXCIsXCJzdXAxXCI6XCLCuVwiLFwic3VwMlwiOlwiwrJcIixcInN1cDNcIjpcIsKzXCIsXCJzdXBcIjpcIuKKg1wiLFwiU3VwXCI6XCLii5FcIixcInN1cGRvdFwiOlwi4qq+XCIsXCJzdXBkc3ViXCI6XCLiq5hcIixcInN1cEVcIjpcIuKrhlwiLFwic3VwZVwiOlwi4oqHXCIsXCJzdXBlZG90XCI6XCLiq4RcIixcIlN1cGVyc2V0XCI6XCLiioNcIixcIlN1cGVyc2V0RXF1YWxcIjpcIuKKh1wiLFwic3VwaHNvbFwiOlwi4p+JXCIsXCJzdXBoc3ViXCI6XCLiq5dcIixcInN1cGxhcnJcIjpcIuKlu1wiLFwic3VwbXVsdFwiOlwi4quCXCIsXCJzdXBuRVwiOlwi4quMXCIsXCJzdXBuZVwiOlwi4oqLXCIsXCJzdXBwbHVzXCI6XCLiq4BcIixcInN1cHNldFwiOlwi4oqDXCIsXCJTdXBzZXRcIjpcIuKLkVwiLFwic3Vwc2V0ZXFcIjpcIuKKh1wiLFwic3Vwc2V0ZXFxXCI6XCLiq4ZcIixcInN1cHNldG5lcVwiOlwi4oqLXCIsXCJzdXBzZXRuZXFxXCI6XCLiq4xcIixcInN1cHNpbVwiOlwi4quIXCIsXCJzdXBzdWJcIjpcIuKrlFwiLFwic3Vwc3VwXCI6XCLiq5ZcIixcInN3YXJoa1wiOlwi4qSmXCIsXCJzd2FyclwiOlwi4oaZXCIsXCJzd0FyclwiOlwi4oeZXCIsXCJzd2Fycm93XCI6XCLihplcIixcInN3bndhclwiOlwi4qSqXCIsXCJzemxpZ1wiOlwiw59cIixcIlRhYlwiOlwiXFx0XCIsXCJ0YXJnZXRcIjpcIuKMllwiLFwiVGF1XCI6XCLOpFwiLFwidGF1XCI6XCLPhFwiLFwidGJya1wiOlwi4o60XCIsXCJUY2Fyb25cIjpcIsWkXCIsXCJ0Y2Fyb25cIjpcIsWlXCIsXCJUY2VkaWxcIjpcIsWiXCIsXCJ0Y2VkaWxcIjpcIsWjXCIsXCJUY3lcIjpcItCiXCIsXCJ0Y3lcIjpcItGCXCIsXCJ0ZG90XCI6XCLig5tcIixcInRlbHJlY1wiOlwi4oyVXCIsXCJUZnJcIjpcIvCdlJdcIixcInRmclwiOlwi8J2UsVwiLFwidGhlcmU0XCI6XCLiiLRcIixcInRoZXJlZm9yZVwiOlwi4oi0XCIsXCJUaGVyZWZvcmVcIjpcIuKItFwiLFwiVGhldGFcIjpcIs6YXCIsXCJ0aGV0YVwiOlwizrhcIixcInRoZXRhc3ltXCI6XCLPkVwiLFwidGhldGF2XCI6XCLPkVwiLFwidGhpY2thcHByb3hcIjpcIuKJiFwiLFwidGhpY2tzaW1cIjpcIuKIvFwiLFwiVGhpY2tTcGFjZVwiOlwi4oGf4oCKXCIsXCJUaGluU3BhY2VcIjpcIuKAiVwiLFwidGhpbnNwXCI6XCLigIlcIixcInRoa2FwXCI6XCLiiYhcIixcInRoa3NpbVwiOlwi4oi8XCIsXCJUSE9STlwiOlwiw55cIixcInRob3JuXCI6XCLDvlwiLFwidGlsZGVcIjpcIsucXCIsXCJUaWxkZVwiOlwi4oi8XCIsXCJUaWxkZUVxdWFsXCI6XCLiiYNcIixcIlRpbGRlRnVsbEVxdWFsXCI6XCLiiYVcIixcIlRpbGRlVGlsZGVcIjpcIuKJiFwiLFwidGltZXNiYXJcIjpcIuKosVwiLFwidGltZXNiXCI6XCLiiqBcIixcInRpbWVzXCI6XCLDl1wiLFwidGltZXNkXCI6XCLiqLBcIixcInRpbnRcIjpcIuKIrVwiLFwidG9lYVwiOlwi4qSoXCIsXCJ0b3Bib3RcIjpcIuKMtlwiLFwidG9wY2lyXCI6XCLiq7FcIixcInRvcFwiOlwi4oqkXCIsXCJUb3BmXCI6XCLwnZWLXCIsXCJ0b3BmXCI6XCLwnZWlXCIsXCJ0b3Bmb3JrXCI6XCLiq5pcIixcInRvc2FcIjpcIuKkqVwiLFwidHByaW1lXCI6XCLigLRcIixcInRyYWRlXCI6XCLihKJcIixcIlRSQURFXCI6XCLihKJcIixcInRyaWFuZ2xlXCI6XCLilrVcIixcInRyaWFuZ2xlZG93blwiOlwi4pa/XCIsXCJ0cmlhbmdsZWxlZnRcIjpcIuKXg1wiLFwidHJpYW5nbGVsZWZ0ZXFcIjpcIuKKtFwiLFwidHJpYW5nbGVxXCI6XCLiiZxcIixcInRyaWFuZ2xlcmlnaHRcIjpcIuKWuVwiLFwidHJpYW5nbGVyaWdodGVxXCI6XCLiirVcIixcInRyaWRvdFwiOlwi4pesXCIsXCJ0cmllXCI6XCLiiZxcIixcInRyaW1pbnVzXCI6XCLiqLpcIixcIlRyaXBsZURvdFwiOlwi4oObXCIsXCJ0cmlwbHVzXCI6XCLiqLlcIixcInRyaXNiXCI6XCLip41cIixcInRyaXRpbWVcIjpcIuKou1wiLFwidHJwZXppdW1cIjpcIuKPolwiLFwiVHNjclwiOlwi8J2Sr1wiLFwidHNjclwiOlwi8J2TiVwiLFwiVFNjeVwiOlwi0KZcIixcInRzY3lcIjpcItGGXCIsXCJUU0hjeVwiOlwi0ItcIixcInRzaGN5XCI6XCLRm1wiLFwiVHN0cm9rXCI6XCLFplwiLFwidHN0cm9rXCI6XCLFp1wiLFwidHdpeHRcIjpcIuKJrFwiLFwidHdvaGVhZGxlZnRhcnJvd1wiOlwi4oaeXCIsXCJ0d29oZWFkcmlnaHRhcnJvd1wiOlwi4oagXCIsXCJVYWN1dGVcIjpcIsOaXCIsXCJ1YWN1dGVcIjpcIsO6XCIsXCJ1YXJyXCI6XCLihpFcIixcIlVhcnJcIjpcIuKGn1wiLFwidUFyclwiOlwi4oeRXCIsXCJVYXJyb2NpclwiOlwi4qWJXCIsXCJVYnJjeVwiOlwi0I5cIixcInVicmN5XCI6XCLRnlwiLFwiVWJyZXZlXCI6XCLFrFwiLFwidWJyZXZlXCI6XCLFrVwiLFwiVWNpcmNcIjpcIsObXCIsXCJ1Y2lyY1wiOlwiw7tcIixcIlVjeVwiOlwi0KNcIixcInVjeVwiOlwi0YNcIixcInVkYXJyXCI6XCLih4VcIixcIlVkYmxhY1wiOlwixbBcIixcInVkYmxhY1wiOlwixbFcIixcInVkaGFyXCI6XCLipa5cIixcInVmaXNodFwiOlwi4qW+XCIsXCJVZnJcIjpcIvCdlJhcIixcInVmclwiOlwi8J2UslwiLFwiVWdyYXZlXCI6XCLDmVwiLFwidWdyYXZlXCI6XCLDuVwiLFwidUhhclwiOlwi4qWjXCIsXCJ1aGFybFwiOlwi4oa/XCIsXCJ1aGFyclwiOlwi4oa+XCIsXCJ1aGJsa1wiOlwi4paAXCIsXCJ1bGNvcm5cIjpcIuKMnFwiLFwidWxjb3JuZXJcIjpcIuKMnFwiLFwidWxjcm9wXCI6XCLijI9cIixcInVsdHJpXCI6XCLil7hcIixcIlVtYWNyXCI6XCLFqlwiLFwidW1hY3JcIjpcIsWrXCIsXCJ1bWxcIjpcIsKoXCIsXCJVbmRlckJhclwiOlwiX1wiLFwiVW5kZXJCcmFjZVwiOlwi4o+fXCIsXCJVbmRlckJyYWNrZXRcIjpcIuKOtVwiLFwiVW5kZXJQYXJlbnRoZXNpc1wiOlwi4o+dXCIsXCJVbmlvblwiOlwi4ouDXCIsXCJVbmlvblBsdXNcIjpcIuKKjlwiLFwiVW9nb25cIjpcIsWyXCIsXCJ1b2dvblwiOlwixbNcIixcIlVvcGZcIjpcIvCdlYxcIixcInVvcGZcIjpcIvCdlaZcIixcIlVwQXJyb3dCYXJcIjpcIuKkklwiLFwidXBhcnJvd1wiOlwi4oaRXCIsXCJVcEFycm93XCI6XCLihpFcIixcIlVwYXJyb3dcIjpcIuKHkVwiLFwiVXBBcnJvd0Rvd25BcnJvd1wiOlwi4oeFXCIsXCJ1cGRvd25hcnJvd1wiOlwi4oaVXCIsXCJVcERvd25BcnJvd1wiOlwi4oaVXCIsXCJVcGRvd25hcnJvd1wiOlwi4oeVXCIsXCJVcEVxdWlsaWJyaXVtXCI6XCLipa5cIixcInVwaGFycG9vbmxlZnRcIjpcIuKGv1wiLFwidXBoYXJwb29ucmlnaHRcIjpcIuKGvlwiLFwidXBsdXNcIjpcIuKKjlwiLFwiVXBwZXJMZWZ0QXJyb3dcIjpcIuKGllwiLFwiVXBwZXJSaWdodEFycm93XCI6XCLihpdcIixcInVwc2lcIjpcIs+FXCIsXCJVcHNpXCI6XCLPklwiLFwidXBzaWhcIjpcIs+SXCIsXCJVcHNpbG9uXCI6XCLOpVwiLFwidXBzaWxvblwiOlwiz4VcIixcIlVwVGVlQXJyb3dcIjpcIuKGpVwiLFwiVXBUZWVcIjpcIuKKpVwiLFwidXB1cGFycm93c1wiOlwi4oeIXCIsXCJ1cmNvcm5cIjpcIuKMnVwiLFwidXJjb3JuZXJcIjpcIuKMnVwiLFwidXJjcm9wXCI6XCLijI5cIixcIlVyaW5nXCI6XCLFrlwiLFwidXJpbmdcIjpcIsWvXCIsXCJ1cnRyaVwiOlwi4pe5XCIsXCJVc2NyXCI6XCLwnZKwXCIsXCJ1c2NyXCI6XCLwnZOKXCIsXCJ1dGRvdFwiOlwi4ouwXCIsXCJVdGlsZGVcIjpcIsWoXCIsXCJ1dGlsZGVcIjpcIsWpXCIsXCJ1dHJpXCI6XCLilrVcIixcInV0cmlmXCI6XCLilrRcIixcInV1YXJyXCI6XCLih4hcIixcIlV1bWxcIjpcIsOcXCIsXCJ1dW1sXCI6XCLDvFwiLFwidXdhbmdsZVwiOlwi4qanXCIsXCJ2YW5ncnRcIjpcIuKmnFwiLFwidmFyZXBzaWxvblwiOlwiz7VcIixcInZhcmthcHBhXCI6XCLPsFwiLFwidmFybm90aGluZ1wiOlwi4oiFXCIsXCJ2YXJwaGlcIjpcIs+VXCIsXCJ2YXJwaVwiOlwiz5ZcIixcInZhcnByb3B0b1wiOlwi4oidXCIsXCJ2YXJyXCI6XCLihpVcIixcInZBcnJcIjpcIuKHlVwiLFwidmFycmhvXCI6XCLPsVwiLFwidmFyc2lnbWFcIjpcIs+CXCIsXCJ2YXJzdWJzZXRuZXFcIjpcIuKKiu+4gFwiLFwidmFyc3Vic2V0bmVxcVwiOlwi4quL77iAXCIsXCJ2YXJzdXBzZXRuZXFcIjpcIuKKi++4gFwiLFwidmFyc3Vwc2V0bmVxcVwiOlwi4quM77iAXCIsXCJ2YXJ0aGV0YVwiOlwiz5FcIixcInZhcnRyaWFuZ2xlbGVmdFwiOlwi4oqyXCIsXCJ2YXJ0cmlhbmdsZXJpZ2h0XCI6XCLiirNcIixcInZCYXJcIjpcIuKrqFwiLFwiVmJhclwiOlwi4qurXCIsXCJ2QmFydlwiOlwi4qupXCIsXCJWY3lcIjpcItCSXCIsXCJ2Y3lcIjpcItCyXCIsXCJ2ZGFzaFwiOlwi4oqiXCIsXCJ2RGFzaFwiOlwi4oqoXCIsXCJWZGFzaFwiOlwi4oqpXCIsXCJWRGFzaFwiOlwi4oqrXCIsXCJWZGFzaGxcIjpcIuKrplwiLFwidmVlYmFyXCI6XCLiirtcIixcInZlZVwiOlwi4oioXCIsXCJWZWVcIjpcIuKLgVwiLFwidmVlZXFcIjpcIuKJmlwiLFwidmVsbGlwXCI6XCLii65cIixcInZlcmJhclwiOlwifFwiLFwiVmVyYmFyXCI6XCLigJZcIixcInZlcnRcIjpcInxcIixcIlZlcnRcIjpcIuKAllwiLFwiVmVydGljYWxCYXJcIjpcIuKIo1wiLFwiVmVydGljYWxMaW5lXCI6XCJ8XCIsXCJWZXJ0aWNhbFNlcGFyYXRvclwiOlwi4p2YXCIsXCJWZXJ0aWNhbFRpbGRlXCI6XCLiiYBcIixcIlZlcnlUaGluU3BhY2VcIjpcIuKAilwiLFwiVmZyXCI6XCLwnZSZXCIsXCJ2ZnJcIjpcIvCdlLNcIixcInZsdHJpXCI6XCLiirJcIixcInZuc3ViXCI6XCLiioLig5JcIixcInZuc3VwXCI6XCLiioPig5JcIixcIlZvcGZcIjpcIvCdlY1cIixcInZvcGZcIjpcIvCdladcIixcInZwcm9wXCI6XCLiiJ1cIixcInZydHJpXCI6XCLiirNcIixcIlZzY3JcIjpcIvCdkrFcIixcInZzY3JcIjpcIvCdk4tcIixcInZzdWJuRVwiOlwi4quL77iAXCIsXCJ2c3VibmVcIjpcIuKKiu+4gFwiLFwidnN1cG5FXCI6XCLiq4zvuIBcIixcInZzdXBuZVwiOlwi4oqL77iAXCIsXCJWdmRhc2hcIjpcIuKKqlwiLFwidnppZ3phZ1wiOlwi4qaaXCIsXCJXY2lyY1wiOlwixbRcIixcIndjaXJjXCI6XCLFtVwiLFwid2VkYmFyXCI6XCLiqZ9cIixcIndlZGdlXCI6XCLiiKdcIixcIldlZGdlXCI6XCLii4BcIixcIndlZGdlcVwiOlwi4omZXCIsXCJ3ZWllcnBcIjpcIuKEmFwiLFwiV2ZyXCI6XCLwnZSaXCIsXCJ3ZnJcIjpcIvCdlLRcIixcIldvcGZcIjpcIvCdlY5cIixcIndvcGZcIjpcIvCdlahcIixcIndwXCI6XCLihJhcIixcIndyXCI6XCLiiYBcIixcIndyZWF0aFwiOlwi4omAXCIsXCJXc2NyXCI6XCLwnZKyXCIsXCJ3c2NyXCI6XCLwnZOMXCIsXCJ4Y2FwXCI6XCLii4JcIixcInhjaXJjXCI6XCLil69cIixcInhjdXBcIjpcIuKLg1wiLFwieGR0cmlcIjpcIuKWvVwiLFwiWGZyXCI6XCLwnZSbXCIsXCJ4ZnJcIjpcIvCdlLVcIixcInhoYXJyXCI6XCLin7dcIixcInhoQXJyXCI6XCLin7pcIixcIlhpXCI6XCLOnlwiLFwieGlcIjpcIs6+XCIsXCJ4bGFyclwiOlwi4p+1XCIsXCJ4bEFyclwiOlwi4p+4XCIsXCJ4bWFwXCI6XCLin7xcIixcInhuaXNcIjpcIuKLu1wiLFwieG9kb3RcIjpcIuKogFwiLFwiWG9wZlwiOlwi8J2Vj1wiLFwieG9wZlwiOlwi8J2VqVwiLFwieG9wbHVzXCI6XCLiqIFcIixcInhvdGltZVwiOlwi4qiCXCIsXCJ4cmFyclwiOlwi4p+2XCIsXCJ4ckFyclwiOlwi4p+5XCIsXCJYc2NyXCI6XCLwnZKzXCIsXCJ4c2NyXCI6XCLwnZONXCIsXCJ4c3FjdXBcIjpcIuKohlwiLFwieHVwbHVzXCI6XCLiqIRcIixcInh1dHJpXCI6XCLilrNcIixcInh2ZWVcIjpcIuKLgVwiLFwieHdlZGdlXCI6XCLii4BcIixcIllhY3V0ZVwiOlwiw51cIixcInlhY3V0ZVwiOlwiw71cIixcIllBY3lcIjpcItCvXCIsXCJ5YWN5XCI6XCLRj1wiLFwiWWNpcmNcIjpcIsW2XCIsXCJ5Y2lyY1wiOlwixbdcIixcIlljeVwiOlwi0KtcIixcInljeVwiOlwi0YtcIixcInllblwiOlwiwqVcIixcIllmclwiOlwi8J2UnFwiLFwieWZyXCI6XCLwnZS2XCIsXCJZSWN5XCI6XCLQh1wiLFwieWljeVwiOlwi0ZdcIixcIllvcGZcIjpcIvCdlZBcIixcInlvcGZcIjpcIvCdlapcIixcIllzY3JcIjpcIvCdkrRcIixcInlzY3JcIjpcIvCdk45cIixcIllVY3lcIjpcItCuXCIsXCJ5dWN5XCI6XCLRjlwiLFwieXVtbFwiOlwiw79cIixcIll1bWxcIjpcIsW4XCIsXCJaYWN1dGVcIjpcIsW5XCIsXCJ6YWN1dGVcIjpcIsW6XCIsXCJaY2Fyb25cIjpcIsW9XCIsXCJ6Y2Fyb25cIjpcIsW+XCIsXCJaY3lcIjpcItCXXCIsXCJ6Y3lcIjpcItC3XCIsXCJaZG90XCI6XCLFu1wiLFwiemRvdFwiOlwixbxcIixcInplZXRyZlwiOlwi4oSoXCIsXCJaZXJvV2lkdGhTcGFjZVwiOlwi4oCLXCIsXCJaZXRhXCI6XCLOllwiLFwiemV0YVwiOlwizrZcIixcInpmclwiOlwi8J2Ut1wiLFwiWmZyXCI6XCLihKhcIixcIlpIY3lcIjpcItCWXCIsXCJ6aGN5XCI6XCLQtlwiLFwiemlncmFyclwiOlwi4oedXCIsXCJ6b3BmXCI6XCLwnZWrXCIsXCJab3BmXCI6XCLihKRcIixcIlpzY3JcIjpcIvCdkrVcIixcInpzY3JcIjpcIvCdk49cIixcInp3alwiOlwi4oCNXCIsXCJ6d25qXCI6XCLigIxcIn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2VudGl0aWVzLmpzb25cbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIFJlbmRlcmVyKCkge31cblxuLyoqXG4gKiAgV2Fsa3MgdGhlIEFTVCBhbmQgY2FsbHMgbWVtYmVyIG1ldGhvZHMgZm9yIGVhY2ggTm9kZSB0eXBlLlxuICpcbiAqICBAcGFyYW0gYXN0IHtOb2RlfSBUaGUgcm9vdCBvZiB0aGUgYWJzdHJhY3Qgc3ludGF4IHRyZWUuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcihhc3QpIHtcbiAgdmFyIHdhbGtlciA9IGFzdC53YWxrZXIoKVxuICAgICwgZXZlbnRcbiAgICAsIHR5cGU7XG5cbiAgdGhpcy5idWZmZXIgPSAnJztcbiAgdGhpcy5sYXN0T3V0ID0gJ1xcbic7XG5cbiAgd2hpbGUoKGV2ZW50ID0gd2Fsa2VyLm5leHQoKSkpIHtcbiAgICB0eXBlID0gZXZlbnQubm9kZS50eXBlO1xuICAgIGlmICh0aGlzW3R5cGVdKSB7XG4gICAgICB0aGlzW3R5cGVdKGV2ZW50Lm5vZGUsIGV2ZW50LmVudGVyaW5nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXMuYnVmZmVyO1xufVxuXG4vKipcbiAqICBDb25jYXRlbmF0ZSBhIGxpdGVyYWwgc3RyaW5nIHRvIHRoZSBidWZmZXIuXG4gKlxuICogIEBwYXJhbSBzdHIge1N0cmluZ30gVGhlIHN0cmluZyB0byBjb25jYXRlbmF0ZS5cbiAqL1xuZnVuY3Rpb24gbGl0KHN0cikge1xuICB0aGlzLmJ1ZmZlciArPSBzdHI7XG4gIHRoaXMubGFzdE91dCA9IHN0cjtcbn1cblxuLyoqXG4gKiAgT3V0cHV0IGEgbmV3bGluZSB0byB0aGUgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjcigpIHtcbiAgaWYgKHRoaXMubGFzdE91dCAhPT0gJ1xcbicpIHtcbiAgICB0aGlzLmxpdCgnXFxuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiAgQ29uY2F0ZW5hdGUgYSBzdHJpbmcgdG8gdGhlIGJ1ZmZlciBwb3NzaWJseSBlc2NhcGluZyB0aGUgY29udGVudC5cbiAqXG4gKiAgQ29uY3JldGUgcmVuZGVyZXIgaW1wbGVtZW50YXRpb25zIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZC5cbiAqXG4gKiAgQHBhcmFtIHN0ciB7U3RyaW5nfSBUaGUgc3RyaW5nIHRvIGNvbmNhdGVuYXRlLlxuICovXG5mdW5jdGlvbiBvdXQoc3RyKSB7XG4gIHRoaXMubGl0KHN0cik7XG59XG5cbi8qKlxuICogIEVzY2FwZSBhIHN0cmluZyBmb3IgdGhlIHRhcmdldCByZW5kZXJlci5cbiAqXG4gKiAgQWJzdHJhY3QgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgY29uY3JldGUgXG4gKiAgcmVuZGVyZXIgaW1wbGVtZW50YXRpb25zLlxuICpcbiAqICBAcGFyYW0gc3RyIHtTdHJpbmd9IFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICovXG5mdW5jdGlvbiBlc2Moc3RyKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSByZW5kZXI7XG5SZW5kZXJlci5wcm90b3R5cGUub3V0ID0gb3V0O1xuUmVuZGVyZXIucHJvdG90eXBlLmxpdCA9IGxpdDtcblJlbmRlcmVyLnByb3RvdHlwZS5jciAgPSBjcjtcblJlbmRlcmVyLnByb3RvdHlwZS5lc2MgID0gZXNjO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL3JlbmRlcmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxhbWwgPSByZXF1aXJlKCcuL2xhbWwuanMnKTtcbmNvbnN0IHt0ZXgyamF4fSA9IHJlcXVpcmUoJy4vdGV4MmpheC5qcycpO1xuY29uc3QgY29tbW9ubWFyayA9IHJlcXVpcmUoJ2NvbW1vbm1hcmsnKTtcblxuY29uc3Qgd29ya2VyID0gZnVuY3Rpb24od2luZG93KSB7XG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuICB3aW5kb3cudGV4MmpheCA9IHRleDJqYXg7XG4gIHdpbmRvdy50ZXgyamF4LmNvbmZpZy5kb2MgPSBkb2N1bWVudDtcbiAgd2luZG93LnRleDJqYXguY29uZmlnLmlubGluZU1hdGgucHVzaChbJyQnLCAnJCddKTtcbiAgd2luZG93LnRleDJqYXguY29uZmlnLnByb2Nlc3NFc2NhcGVzID0gdHJ1ZTtcbiAgd2luZG93LnRleDJqYXguUHJlUHJvY2VzcygpO1xuXG4gIGNvbnN0IHJlYWRlciA9IG5ldyBjb21tb25tYXJrLlBhcnNlcigpO1xuICBjb25zdCB3cml0ZXIgPSBuZXcgY29tbW9ubWFyay5IdG1sUmVuZGVyZXIoKTtcbiAgY29uc3QgcGFyc2VkID0gcmVhZGVyLnBhcnNlKGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MKTtcbiAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB3cml0ZXIucmVuZGVyKHBhcnNlZCk7XG5cbiAgbGFtbChkb2N1bWVudCk7XG59O1xuXG5pZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyA/IHByb2Nlc3MgOiAwKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKXtcbiAgICBtb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG59XG5lbHNlIHtcbiAgd29ya2VyKHdpbmRvdyk7XG4gIHdpbmRvdy5NYXRoSmF4ID0ge1xuICAgICdmYXN0LXByZXZpZXcnOiB7XG4gICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgIH1cbiAgfTtcbiAgY29uc3QgbWogPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgbWouc3JjID1cbiAgICAnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbWF0aGpheC8yLjcuMi9NYXRoSmF4LmpzP2NvbmZpZz1UZVgtQU1TX0NIVE1MLWZ1bGwnO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG1qKTtcblxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd29ya2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xuY29uc3QgYXJ0aWNsZUhlYWQgPSByZXF1aXJlKCcuL2FydGljbGVIZWFkLmpzJyk7XG5jb25zdCBwcmVhbWJsZSA9IHJlcXVpcmUoJy4vcHJlYW1ibGUuanMnKTtcbmNvbnN0IGFic3RyYWN0ID0gcmVxdWlyZSgnLi9hYnN0cmFjdC5qcycpO1xuY29uc3Qgc3RhdGVtZW50cyA9IHJlcXVpcmUoJy4vc3RhdGVtZW50cy5qcycpO1xuY29uc3QgZmlndXJlcyA9IHJlcXVpcmUoJy4vZmlndXJlcy5qcycpO1xuY29uc3QgbmFtZXMgPSByZXF1aXJlKCcuL25hbWVzLmpzJyk7XG5jb25zdCBibGFtZXMgPSByZXF1aXJlKCcuL2JsYW1lcy5qcycpO1xuY29uc3QgcmVmcyA9IHJlcXVpcmUoJy4vcmVmcy5qcycpO1xuY29uc3QgY2l0ZXMgPSByZXF1aXJlKCcuL2NpdGVzLmpzJyk7XG5jb25zdCBub3RlcyA9IHJlcXVpcmUoJy4vbm90ZXMuanMnKTtcbmNvbnN0IGJpYmxpb2dyYXBoeSA9IHJlcXVpcmUoJy4vYmlibGlvZ3JhcGh5LmpzJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCkge1xuICBhcnRpY2xlSGVhZChkb2N1bWVudCk7XG4gIHByZWFtYmxlKGRvY3VtZW50KTtcbiAgYWJzdHJhY3QoZG9jdW1lbnQpO1xuICBzdGF0ZW1lbnRzKGRvY3VtZW50KTtcbiAgZmlndXJlcyhkb2N1bWVudCwgZmFsc2UpO1xuICBuYW1lcyhkb2N1bWVudCk7XG4gIC8vIFRPRE8gc2hvdWxkIGRlcGVuZCBvbiBjbS5jc3M/XG4gIGJsYW1lcyhkb2N1bWVudCk7XG4gIHJlZnMoZG9jdW1lbnQpO1xuICBjaXRlcyhkb2N1bWVudCk7XG4gIG5vdGVzKGRvY3VtZW50KTtcbiAgYmlibGlvZ3JhcGh5KGRvY3VtZW50KTtcbn07XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xhbWwuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCkge1xuICAvLyBoYW5kbGUgbWV0YWRhdGFcbiAgY29uc3QgYXJ0aWNsZU1ldGEgPSBKU09OLnBhcnNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRhZGF0YScpLnRleHQpO1xuICBjb25zdCBhcnRpY2xlSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgYXJ0aWNsZUluZm8uY2xhc3NMaXN0LmFkZCgnYXJ0aWNsZUluZm8nKTtcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoYXJ0aWNsZUluZm8sIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4gIGNvbnN0IGFydGljbGVUaXRsZSA9IGFydGljbGVNZXRhLnRpdGxlO1xuICBpZiAoYXJ0aWNsZVRpdGxlKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpO1xuICAgIGlmICh0aXRsZSkgdGl0bGUuaW5uZXJIVE1MID0gYXJ0aWNsZVRpdGxlO1xuICAgIGVsc2Uge1xuICAgICAgbmV3dGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aXRsZScpO1xuICAgICAgbmV3dGl0bGUuaW5uZXJIVE1MID0gYXJ0aWNsZVRpdGxlO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXd0aXRsZSk7XG4gICAgfVxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID0gYXJ0aWNsZVRpdGxlO1xuICAgIGFydGljbGVJbmZvLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICB9XG4gIGNvbnN0IGFydGljbGVBdXRob3JzID0gYXJ0aWNsZU1ldGEuYXV0aG9ycyB8fCBbXTtcbiAgZm9yIChsZXQgYXV0aG9yIG9mIGFydGljbGVBdXRob3JzKSB7XG4gICAgY29uc3QgbmFtZSA9IGF1dGhvci5uYW1lO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhdXRob3IuYWRkcmVzcztcbiAgICBjb25zdCBhdXRob3JQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGF1dGhvclAuY2xhc3NMaXN0LmFkZCgnYXV0aG9yJyk7XG4gICAgYXV0aG9yUC5pbm5lckhUTUwgPSBuYW1lICsgJywgJyArIGFkZHJlc3MgKyAnLic7XG4gICAgYXJ0aWNsZUluZm8uYXBwZW5kQ2hpbGQoYXV0aG9yUCk7XG4gIH1cbiAgY29uc3Qga2V5d29yZHMgPSBhcnRpY2xlTWV0YS5rZXl3b3JkcztcbiAgY29uc3Qga3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGt3LmNsYXNzTGlzdC5hZGQoJ2tleXdvcmRzJyk7XG4gIGt3LmlubmVySFRNTCA9ICdLZXl3b3JkczogJyArIGtleXdvcmRzLmpvaW4oJywgJykgKyAnLic7XG4gIGFydGljbGVJbmZvLmFwcGVuZENoaWxkKGt3KTtcblxuICBjb25zdCBsaWNlbnNpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGxpY2Vuc2luZy5jbGFzc0xpc3QuYWRkKCdsaWNlbnNlJyk7XG5cbiAgbGljZW5zaW5nLmlubmVySFRNTCA9XG4gICAgJ0Rlcml2ZWQgZnJvbSA8YSBocmVmPVwiJyArXG4gICAgYXJ0aWNsZU1ldGEuc291cmNlICtcbiAgICAnXCI+JyArXG4gICAgYXJ0aWNsZU1ldGEuc291cmNlICtcbiAgICAnPC9hPiwgJyArXG4gICAgYXJ0aWNsZU1ldGEubGljZW5zZSArXG4gICAgJyBhbmQgbGljZW5zZWQgYXMgc3VjaC4nO1xuICBhcnRpY2xlSW5mby5hcHBlbmRDaGlsZChsaWNlbnNpbmcpO1xuXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXJ0aWNsZUhlYWQuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpe1xuICAvLyBwcmVhbWJsZVxuICByZW5hbWVUYWcoZG9jdW1lbnQsJ3ByZWFtYmxlJywgJ2RpdicsICdoaWRkZW4nKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ByZWFtYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KXtcbiAgLy8gYWJzdHJhY3RcbiAgcmVuYW1lVGFnKGRvY3VtZW50LCAnYWJzdHJhY3QnLCAnc2VjdGlvbicsIHRydWUpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYWJzdHJhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCl7XG4gIC8vIGNvbnZlcnQgc3RhdGVtZW50cyB0byBzZWN0aW9uc1xuICBjb25zdCBzdGF0ZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAncHJvb2YsIHRoZW9yZW0sIHByb3Bvc2l0aW9uLCBsZW1tYSwgY29yb2xsYXJ5J1xuICApO1xuICBsZXQgc3RhdGVtZW50X2NvdW50ZXIgPSAwO1xuICBmb3IgKGxldCBzdGF0ZW1lbnQgb2Ygc3RhdGVtZW50cykge1xuICAgIGNvbnN0IHJlbmFtZWROb2RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCBzdGF0ZW1lbnQsICdzZWN0aW9uJywgdHJ1ZSk7XG4gICAgY29uc3QgdGFnbmFtZSA9IHN0YXRlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgcmVuYW1lZE5vZGUuY2xhc3NMaXN0LmFkZCh0YWduYW1lKTtcbiAgICBjb25zdCBuYW1lID0gcmVuYW1lZE5vZGUucXVlcnlTZWxlY3RvcignbmFtZScpO1xuICAgIC8vIFRPRE8gbWF5YmUgbmFtZSBoYW5kbGluZyBpcyBtb3JlIGxpa2UgYSBoZWxwZXIgdGhhdCBzaG91bGQgYmUgcmVxdWlyZWQgYW5kIGFwcGxpZWQgaGVyZT9cbiAgICBpZiAobmFtZSkgY29udGludWU7XG4gICAgc3RhdGVtZW50X2NvdW50ZXIrKztcbiAgICAvLyBUT0RPIGxvb2sgdXAgY29ycmVjdCBoZWFkaW5nIGxldmVsXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCduYW1lJyk7XG4gICAgaGVhZGluZy5pZCA9IHRhZ25hbWUudG9Mb3dlckNhc2UoKSArICctJyArIHN0YXRlbWVudF9jb3VudGVyO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID1cbiAgICAgIHRhZ25hbWVbMF0udG9VcHBlckNhc2UoKSArIHRhZ25hbWUuc3Vic3RyaW5nKDEpICsgJyAnICsgc3RhdGVtZW50X2NvdW50ZXI7XG4gICAgcmVuYW1lZE5vZGUuaW5zZXJ0QmVmb3JlKGhlYWRpbmcsIHJlbmFtZWROb2RlLmZpcnN0Q2hpbGQpO1xuICB9XG5cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0YXRlbWVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQsIGJlbG93T3JBYm92ZSkge1xuICAvLyBoYW5kbGUgZmlndXJlc1xuICBjb25zdCBmaWd1cmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZmlndXJlJyk7XG4gIGZvciAobGV0IFtpbmRleCwgZmlndXJlXSBvZiBmaWd1cmVzLmVudHJpZXMoKSkge1xuICAgIGZpZ3VyZS5jbGFzc0xpc3QuYWRkKCdmaWd1cmUnKTtcbiAgICBjb25zdCBuYW1lID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ25hbWUnKTtcbiAgICBpZiAobmFtZSkgY29udGludWU7XG4gICAgLy8gVE9ETyBsb29rIHVwIGNvcnJlY3QgaGVhZGluZyBsZXZlbFxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnbmFtZScpO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID0gJ0ZpZ3VyZSAnICsgKGluZGV4ICsgMSk7XG4gICAgaWYgKGJlbG93T3JBYm92ZSkgZmlndXJlLmluc2VydEJlZm9yZShoZWFkaW5nLCBmaWd1cmUuZmlyc3RDaGlsZCk7XG4gICAgZWxzZSBmaWd1cmUuaW5zZXJ0QmVmb3JlKGhlYWRpbmcsIGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdpbWcnKS5uZXh0U2libGluZyk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9maWd1cmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgLy8gY29udmVydCBuYW1lcyB0byBoZWFkaW5nc1xuICBjb25zdCBuYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25hbWUnKTtcbiAgZm9yIChsZXQgbmFtZSBvZiBuYW1lcykge1xuICAgIC8vIFRPRE8gbG9vayB1cCBjb3JyZWN0IGhlYWRpbmcgbGV2ZWxcbiAgICBjb25zdCByZW5hbWVkTm9kZSA9IHJlbmFtZVRhZyhkb2N1bWVudCwgbmFtZSwgJ2gyJywgdHJ1ZSk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYW1lcy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIC8vIGNvbnZlcnQgYmxhbWVzIHRvIGhlYWRpbmdzXG4gIGNvbnN0IGJsYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JsYW1lJyk7XG4gIGZvciAobGV0IGJsYW1lIG9mIGJsYW1lcykge1xuICAgIC8vIFRPRE8gbG9vayB1cCBjb3JyZWN0IGhlYWRpbmcgbGV2ZWxcbiAgICBjb25zdCByZW5hbWVkTm9kZSA9IHJlbmFtZVRhZyhkb2N1bWVudCwgYmxhbWUsICdoMicsIHRydWUpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxhbWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgLy8gY29udmVydCByZWYgdG8gbGlua3NcbiAgY29uc3QgcmVmcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3JlZicpO1xuICBmb3IgKGxldCByZWYgb2YgcmVmcykge1xuICAgIGNvbnN0IHJlbmFtZWROb2RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCByZWYsICdhJyk7XG4gICAgY29uc3QgdGFyZ2V0SWQgPSByZW5hbWVkTm9kZS5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcbiAgICByZW5hbWVkTm9kZS5jbGFzc0xpc3QuYWRkKCdyZWYnKTtcbiAgICByZW5hbWVkTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyB0YXJnZXRJZCk7XG4gICAgcmVuYW1lZE5vZGUucmVtb3ZlQXR0cmlidXRlKCd0YXJnZXQnKTtcbiAgICBpZiAoICEgL15cXHMqJC8udGVzdChyZW5hbWVkTm9kZS5pbm5lckhUTUwpICkge1xuICAgICAgLy8gdGhlIG5vZGUgaGFzIHNvbWUgbm9udHJpdmlhbCBjb250ZW50c1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIHRoZSBub2RlIGlzIHdoaXRlc3BhY2UuIHJlcGxhY2UgaXQgd2l0aCBvdXIgZGVmYXVsdHMuXG4gICAgdGFyZ2V0SGVhZGluZyA9IHJlbmFtZWROb2RlLmlubmVySFRNTCA9IHRhcmdldFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICAvLyBzdHJpcCBibGFtZVxuICAgIGlmICh0YXJnZXRIZWFkaW5nLnF1ZXJ5U2VsZWN0b3IoJy5ibGFtZScpKVxuICAgICAgdGFyZ2V0SGVhZGluZy5yZW1vdmVDaGlsZCh0YXJnZXRIZWFkaW5nLnF1ZXJ5U2VsZWN0b3IoJy5ibGFtZScpKTtcbiAgICByZW5hbWVkTm9kZS5pbm5lckhUTUwgPSB0YXJnZXRIZWFkaW5nLmlubmVySFRNTDtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlZnMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgLy8gcG9wdWxhdGUgYmlibGlvZ3JhcGhpYyBjaXRhdGlvbnNcbiAgY29uc3QgYmliaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdiaWJsaW9ncmFwaHkgYScpO1xuICBmb3IgKGxldCBbaW5kZXgsIGJpYml0ZW1dIG9mIGJpYml0ZW1zLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IGNvdW50ZXIgPSAnWycgKyAoaW5kZXggKyAxKSArICddJztcbiAgICAvLyBUT0RPIGNyZWF0ZSBETCBpbiBidWlsZEJpYiBpbnN0ZWFkXG4gICAgY29uc3QgY291bnRlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb3VudGVyICsgJyAnKTtcbiAgICBiaWJpdGVtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvdW50ZXJOb2RlLCBiaWJpdGVtKTtcbiAgICBjb25zdCBjaXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnY2l0ZVt0YXJnZXQ9XCInICsgYmliaXRlbS5pZCArICdcIl0nXG4gICAgKTtcbiAgICBmb3IgKGxldCBjaXRlIG9mIGNpdGVzKSB7XG4gICAgICBpZiAoIC9eXFxzKiQvLnRlc3QoY2l0ZS5pbm5lckhUTUwpICkge1xuICAgICAgICAvLyB0aGUgbm9kZSBpcyB3aGl0ZXNwYWNlLCByZXBsYWNlIGl0IHdpdGggb3VyIGRlZmF1bHRzXG4gICAgICAgIGNpdGUuaW5uZXJIVE1MID0gY291bnRlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxlYXZlIGl0IGFsb25lXG4gICAgICB9XG4gICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgYmliaXRlbS5pZCk7XG4gICAgICBjaXRlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGFuY2hvciwgY2l0ZSk7XG4gICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoY2l0ZSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jaXRlcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIC8vIGhhbmRsZSAoZm9vdClub3Rlc1xuICBjb25zdCBub3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25vdGUnKTtcbiAgZm9yIChsZXQgW2luZGV4LCBub3RlXSBvZiBub3Rlcy5lbnRyaWVzKCkpIHtcbiAgICBjb25zdCBuZXdOb3RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCBub3RlLCAnc3BhbicpO1xuICAgIG5ld05vdGUuY2xhc3NMaXN0LmFkZCgnZm9vdG5vdGUnKTtcbiAgICBuZXdOb3RlLmlkID0gJ2ZuLScgKyBpbmRleDtcbiAgICBjb25zdCBmbmxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgZm5saW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyArIG5ld05vdGUuaWQpO1xuICAgIGZubGluay5pZCA9ICdmbmxpbmsnICsgaW5kZXg7XG4gICAgZm5saW5rLmlubmVySFRNTCA9ICc8c3VwPicgKyAoaW5kZXggKyAxKSArICc8L3N1cD4nO1xuICAgIG5ld05vdGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZm5saW5rLCBuZXdOb3RlKTtcbiAgICBjb25zdCBiYWNrbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBiYWNrbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyBmbmxpbmsuaWQpO1xuICAgIGJhY2tsaW5rLmlubmVySFRNTCA9ICc8c3VwPvCflJk8L3N1cD4nO1xuICAgIGJhY2tsaW5rLmNsYXNzTGlzdC5hZGQoJ2JhY2tsaW5rJyk7XG4gICAgbmV3Tm90ZS5hcHBlbmRDaGlsZChiYWNrbGluayk7XG4gICAgLy8gVE9ETyB0aGlzIGlzIG5vdCBhY3R1YWxseSBkaXNhYmxpbmcgY2xpY2tzXG4gICAgZm5saW5rLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG4gICAgYmFja2xpbmsuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25vdGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgY29uc3QgYmliID0gcmVuYW1lVGFnKGRvY3VtZW50LCAnYmlibGlvZ3JhcGh5JywgJ3NlY3Rpb24nLCB0cnVlKTtcbiAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gIGhlYWRpbmcuaW5uZXJIVE1MID0gJ0JpYmxpb2dyYXBoeSc7XG4gIGJpYi5pbnNlcnRCZWZvcmUoaGVhZGluZywgYmliLmZpcnN0Q2hpbGQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JpYmxpb2dyYXBoeS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgTWF0aEpheCBDb25zb3J0aXVtXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgdGV4MmpheCA9IGZ1bmN0aW9uICgpIHt9O1xuXG50ZXgyamF4LnByb3RvdHlwZS5jb25maWcgPSB7XG4gICAgZG9jOiB7fSxcbiAgICBpbmxpbmVNYXRoOiBbIC8vIFRoZSBzdGFydC9zdG9wIHBhaXJzIGZvciBpbi1saW5lIG1hdGhcbiAgICAgICAgLy8gICAgWyckJywnJCddLCAgICAgICAgICAgICAgIC8vICAoY29tbWVudCBvdXQgYW55IHlvdSBkb24ndCB3YW50LCBvciBhZGQgeW91ciBvd24sIGJ1dFxuICAgICAgICBbJ1xcXFwoJywgJ1xcXFwpJ10gLy8gIGJlIHN1cmUgdGhhdCB5b3UgZG9uJ3QgaGF2ZSBhbiBleHRyYSBjb21tYSBhdCB0aGUgZW5kKVxuICAgIF0sXG5cbiAgICBkaXNwbGF5TWF0aDogWyAvLyBUaGUgc3RhcnQvc3RvcCBwYWlycyBmb3IgZGlzcGxheSBtYXRoXG4gICAgICAgIFsnJCQnLCAnJCQnXSwgLy8gIChjb21tZW50IG91dCBhbnkgeW91IGRvbid0IHdhbnQsIG9yIGFkZCB5b3VyIG93biwgYnV0XG4gICAgICAgIFsnXFxcXFsnLCAnXFxcXF0nXSAvLyAgYmUgc3VyZSB0aGF0IHlvdSBkb24ndCBoYXZlIGFuIGV4dHJhIGNvbW1hIGF0IHRoZSBlbmQpXG4gICAgXSxcblxuICAgIGJhbGFuY2VCcmFjZXM6IHRydWUsIC8vIGRldGVybWluZXMgd2hldGhlciB0ZXgyamF4IHJlcXVpcmVzIGJyYWNlcyB0byBiZVxuICAgIC8vIGJhbGFuY2VkIHdpdGhpbiBtYXRoIGRlbGltaXRlcnMgKGFsbG93cyBmb3IgbmVzdGVkXG4gICAgLy8gZG9sbGFyIHNpZ25zKS4gIFNldCB0byBmYWxzZSB0byBnZXQgcHJlLXYyLjAgY29tcGF0aWJpbGl0eS5cblxuICAgIHNraXBUYWdzOiBbXCJzY3JpcHRcIiwgXCJub3NjcmlwdFwiLCBcInN0eWxlXCIsIFwidGV4dGFyZWFcIiwgXCJwcmVcIiwgXCJjb2RlXCIsIFwiYW5ub3RhdGlvblwiLCBcImFubm90YXRpb24teG1sXCJdLFxuICAgIC8vIFRoZSBuYW1lcyBvZiB0aGUgdGFncyB3aG9zZSBjb250ZW50cyB3aWxsIG5vdCBiZVxuICAgIC8vIHNjYW5uZWQgZm9yIG1hdGggZGVsaW1pdGVyc1xuXG4gICAgaWdub3JlQ2xhc3M6IFwidGV4MmpheF9pZ25vcmVcIiwgLy8gdGhlIGNsYXNzIG5hbWUgb2YgZWxlbWVudHMgd2hvc2UgY29udGVudHMgc2hvdWxkXG4gICAgLy8gTk9UIGJlIHByb2Nlc3NlZCBieSB0ZXgyamF4LiAgTm90ZSB0aGF0IHRoaXNcbiAgICAvLyBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiwgc28gYmUgc3VyZSB0byBxdW90ZSBhbnlcbiAgICAvLyByZWdleHAgc3BlY2lhbCBjaGFyYWN0ZXJzXG5cbiAgICBwcm9jZXNzQ2xhc3M6IFwidGV4MmpheF9wcm9jZXNzXCIsIC8vIHRoZSBjbGFzcyBuYW1lIG9mIGVsZW1lbnRzIHdob3NlIGNvbnRlbnRzIFNIT1VMRFxuICAgIC8vIGJlIHByb2Nlc3NlZCB3aGVuIHRoZXkgYXBwZWFyIGluc2lkZSBvbmVzIHRoYXRcbiAgICAvLyBhcmUgaWdub3JlZC4gIE5vdGUgdGhhdCB0aGlzIGlzIGEgcmVndWxhciBleHByZXNzaW9uLFxuICAgIC8vIHNvIGJlIHN1cmUgdG8gcXVvdGUgYW55IHJlZ2V4cCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuICAgIHByb2Nlc3NFc2NhcGVzOiBmYWxzZSwgLy8gc2V0IHRvIHRydWUgdG8gYWxsb3cgXFwkIHRvIHByb2R1Y2UgYSBkb2xsYXIgd2l0aG91dFxuICAgIC8vICAgc3RhcnRpbmcgaW4tbGluZSBtYXRoIG1vZGVcblxuICAgIHByb2Nlc3NFbnZpcm9ubWVudHM6IHRydWUsIC8vIHNldCB0byB0cnVlIHRvIHByb2Nlc3MgXFxiZWdpbnt4eHh9Li4uXFxlbmR7eHh4fSBvdXRzaWRlXG4gICAgLy8gICBvZiBtYXRoIG1vZGUsIGZhbHNlIHRvIHByZXZlbnQgdGhhdFxuXG4gICAgcHJvY2Vzc1JlZnM6IHRydWUsIC8vIHNldCB0byB0cnVlIHRvIHByb2Nlc3MgXFxyZWZ7Li4ufSBvdXRzaWRlIG9mIG1hdGggbW9kZVxuXG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5QcmVQcm9jZXNzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIChlbGVtZW50KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50ID0gdGhpcy5jb25maWcuZG9jLmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpXG4gICAgfVxuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gdGhpcy5jb25maWcuZG9jLmJvZHlcbiAgICB9XG4gICAgaWYgKHRoaXMuY3JlYXRlUGF0dGVybnMoKSkge1xuICAgICAgICB0aGlzLnNjYW5FbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQubmV4dFNpYmxpbmcpXG4gICAgfVxufTtcblxudGV4MmpheC5wcm90b3R5cGUuY3JlYXRlUGF0dGVybnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXJ0cyA9IFtdLFxuICAgICAgICBwYXJ0cyA9IFtdLFxuICAgICAgICBpLCBtLCBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICB0aGlzLm1hdGNoID0ge307XG4gICAgZm9yIChpID0gMCwgbSA9IGNvbmZpZy5pbmxpbmVNYXRoLmxlbmd0aDsgaSA8IG07IGkrKykge1xuICAgICAgICBzdGFydHMucHVzaCh0aGlzLnBhdHRlcm5RdW90ZShjb25maWcuaW5saW5lTWF0aFtpXVswXSkpO1xuICAgICAgICB0aGlzLm1hdGNoW2NvbmZpZy5pbmxpbmVNYXRoW2ldWzBdXSA9IHtcbiAgICAgICAgICAgIG1vZGU6IFwidGV4XCIsXG4gICAgICAgICAgICBlbmQ6IGNvbmZpZy5pbmxpbmVNYXRoW2ldWzFdLFxuICAgICAgICAgICAgcGF0dGVybjogdGhpcy5lbmRQYXR0ZXJuKGNvbmZpZy5pbmxpbmVNYXRoW2ldWzFdKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBtID0gY29uZmlnLmRpc3BsYXlNYXRoLmxlbmd0aDsgaSA8IG07IGkrKykge1xuICAgICAgICBzdGFydHMucHVzaCh0aGlzLnBhdHRlcm5RdW90ZShjb25maWcuZGlzcGxheU1hdGhbaV1bMF0pKTtcbiAgICAgICAgdGhpcy5tYXRjaFtjb25maWcuZGlzcGxheU1hdGhbaV1bMF1dID0ge1xuICAgICAgICAgICAgbW9kZTogXCJ0ZXg7IG1vZGU9ZGlzcGxheVwiLFxuICAgICAgICAgICAgZW5kOiBjb25maWcuZGlzcGxheU1hdGhbaV1bMV0sXG4gICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLmVuZFBhdHRlcm4oY29uZmlnLmRpc3BsYXlNYXRoW2ldWzFdKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoc3RhcnRzLmxlbmd0aCkge1xuICAgICAgICBwYXJ0cy5wdXNoKHN0YXJ0cy5zb3J0KHRoaXMuc29ydExlbmd0aCkuam9pbihcInxcIikpXG4gICAgfVxuICAgIGlmIChjb25maWcucHJvY2Vzc0Vudmlyb25tZW50cykge1xuICAgICAgICBwYXJ0cy5wdXNoKFwiXFxcXFxcXFxiZWdpblxcXFx7KFtefV0qKVxcXFx9XCIpXG4gICAgfVxuICAgIGlmIChjb25maWcucHJvY2Vzc0VzY2FwZXMpIHtcbiAgICAgICAgcGFydHMucHVzaChcIlxcXFxcXFxcKlxcXFxcXFxcXFxcXFxcJFwiKVxuICAgIH1cbiAgICBpZiAoY29uZmlnLnByb2Nlc3NSZWZzKSB7XG4gICAgICAgIHBhcnRzLnB1c2goXCJcXFxcXFxcXChlcSk/cmVmXFxcXHtbXn1dKlxcXFx9XCIpXG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBuZXcgUmVnRXhwKHBhcnRzLmpvaW4oXCJ8XCIpLCBcImdcIik7XG4gICAgdGhpcy5za2lwVGFncyA9IG5ldyBSZWdFeHAoXCJeKFwiICsgY29uZmlnLnNraXBUYWdzLmpvaW4oXCJ8XCIpICsgXCIpJFwiLCBcImlcIik7XG4gICAgdmFyIGlnbm9yZSA9IFtdO1xuICAgIGlmICh0aGlzLmNvbmZpZy5wcmVSZW1vdmVDbGFzcykge1xuICAgICAgICBpZ25vcmUucHVzaCh0aGlzLmNvbmZpZy5wcmVSZW1vdmVDbGFzcylcbiAgICB9O1xuICAgIGlmIChjb25maWcuaWdub3JlQ2xhc3MpIHtcbiAgICAgICAgaWdub3JlLnB1c2goY29uZmlnLmlnbm9yZUNsYXNzKVxuICAgIH1cbiAgICB0aGlzLmlnbm9yZUNsYXNzID0gKGlnbm9yZS5sZW5ndGggPyBuZXcgUmVnRXhwKFwiKF58ICkoXCIgKyBpZ25vcmUuam9pbihcInxcIikgKyBcIikoIHwkKVwiKSA6IC9eJC8pO1xuICAgIHRoaXMucHJvY2Vzc0NsYXNzID0gbmV3IFJlZ0V4cChcIihefCApKFwiICsgY29uZmlnLnByb2Nlc3NDbGFzcyArIFwiKSggfCQpXCIpO1xuICAgIHJldHVybiAocGFydHMubGVuZ3RoID4gMCk7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5wYXR0ZXJuUXVvdGUgPSBmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoLyhbXFxeJCgpe30rKj9cXC18XFxbXFxdXFw6XFxcXF0pL2csICdcXFxcJDEnKVxufTtcblxudGV4MmpheC5wcm90b3R5cGUuZW5kUGF0dGVybiA9IGZ1bmN0aW9uIChlbmQpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0aGlzLnBhdHRlcm5RdW90ZShlbmQpICsgXCJ8XFxcXFxcXFwufFt7fV1cIiwgXCJnXCIpO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuc29ydExlbmd0aCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aFxuICAgIH1cbiAgICByZXR1cm4gKGEgPT0gYiA/IDAgOiAoYSA8IGIgPyAtMSA6IDEpKTtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLnNjYW5FbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHN0b3AsIGlnbm9yZSkge1xuICAgIHZhciBjbmFtZSwgdG5hbWUsIGlnbm9yZUNoaWxkLCBwcm9jZXNzO1xuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQgIT0gc3RvcCkge1xuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgICBpZiAoIWlnbm9yZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLnNjYW5UZXh0KGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbmFtZSA9ICh0eXBlb2YgKGVsZW1lbnQuY2xhc3NOYW1lKSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiXCIgOiBlbGVtZW50LmNsYXNzTmFtZSk7XG4gICAgICAgICAgICB0bmFtZSA9ICh0eXBlb2YgKGVsZW1lbnQudGFnTmFtZSkgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogZWxlbWVudC50YWdOYW1lKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGNuYW1lKSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGNuYW1lID0gU3RyaW5nKGNuYW1lKVxuICAgICAgICAgICAgfSAvLyBqc3hncmFwaCB1c2VzIG5vbi1zdHJpbmcgY2xhc3MgbmFtZXMhXG4gICAgICAgICAgICBwcm9jZXNzID0gdGhpcy5wcm9jZXNzQ2xhc3MuZXhlYyhjbmFtZSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5maXJzdENoaWxkICYmICFjbmFtZS5tYXRjaCgvKF58IClNYXRoSmF4LykgJiZcbiAgICAgICAgICAgICAgICAocHJvY2VzcyB8fCAhdGhpcy5za2lwVGFncy5leGVjKHRuYW1lKSkpIHtcbiAgICAgICAgICAgICAgICBpZ25vcmVDaGlsZCA9IChpZ25vcmUgfHwgdGhpcy5pZ25vcmVDbGFzcy5leGVjKGNuYW1lKSkgJiYgIXByb2Nlc3M7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuRWxlbWVudChlbGVtZW50LmZpcnN0Q2hpbGQsIHN0b3AsIGlnbm9yZUNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQubmV4dFNpYmxpbmdcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnRleDJqYXgucHJvdG90eXBlLnNjYW5UZXh0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5ub2RlVmFsdWUucmVwbGFjZSgvXFxzKy8sICcnKSA9PSAnJykge1xuICAgICAgICByZXR1cm4gZWxlbWVudFxuICAgIH1cbiAgICB2YXIgbWF0Y2gsIHByZXY7XG4gICAgdGhpcy5zZWFyY2ggPSB7XG4gICAgICAgIHN0YXJ0OiB0cnVlXG4gICAgfTtcbiAgICB0aGlzLnBhdHRlcm4gPSB0aGlzLnN0YXJ0O1xuICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMucGF0dGVybi5sYXN0SW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICcjdGV4dCcgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IHRoaXMucGF0dGVybi5leGVjKGVsZW1lbnQubm9kZVZhbHVlKSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaC5zdGFydCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLnN0YXJ0TWF0Y2gobWF0Y2gsIGVsZW1lbnQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmVuZE1hdGNoKG1hdGNoLCBlbGVtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaC5tYXRjaGVkKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5lbmNsb3NlTWF0aChlbGVtZW50KVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgcHJldiA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQubmV4dFNpYmxpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50ICYmIChlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdicicgfHxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnI2NvbW1lbnQnKSk7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQgfHwgZWxlbWVudC5ub2RlTmFtZSAhPT0gJyN0ZXh0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zZWFyY2guY2xvc2UgPyB0aGlzLnByZXZFbmRNYXRjaCgpIDogcHJldilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLnN0YXJ0TWF0Y2ggPSBmdW5jdGlvbiAobWF0Y2gsIGVsZW1lbnQpIHtcbiAgICB2YXIgZGVsaW0gPSB0aGlzLm1hdGNoW21hdGNoWzBdXTtcbiAgICBpZiAoZGVsaW0gIT0gbnVsbCkgeyAvLyBhIHN0YXJ0IGRlbGltaXRlclxuICAgICAgICB0aGlzLnNlYXJjaCA9IHtcbiAgICAgICAgICAgIGVuZDogZGVsaW0uZW5kLFxuICAgICAgICAgICAgbW9kZTogZGVsaW0ubW9kZSxcbiAgICAgICAgICAgIHBjb3VudDogMCxcbiAgICAgICAgICAgIG9wZW46IGVsZW1lbnQsXG4gICAgICAgICAgICBvbGVuOiBtYXRjaFswXS5sZW5ndGgsXG4gICAgICAgICAgICBvcG9zOiB0aGlzLnBhdHRlcm4ubGFzdEluZGV4IC0gbWF0Y2hbMF0ubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3dpdGNoUGF0dGVybihkZWxpbS5wYXR0ZXJuKTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdLnN1YnN0cigwLCA2KSA9PT0gXCJcXFxcYmVnaW5cIikgeyAvLyBcXGJlZ2luey4uLn1cbiAgICAgICAgdGhpcy5zZWFyY2ggPSB7XG4gICAgICAgICAgICBlbmQ6IFwiXFxcXGVuZHtcIiArIG1hdGNoWzFdICsgXCJ9XCIsXG4gICAgICAgICAgICBtb2RlOiBcIlRlWFwiLFxuICAgICAgICAgICAgcGNvdW50OiAwLFxuICAgICAgICAgICAgb3BlbjogZWxlbWVudCxcbiAgICAgICAgICAgIG9sZW46IDAsXG4gICAgICAgICAgICBvcG9zOiB0aGlzLnBhdHRlcm4ubGFzdEluZGV4IC0gbWF0Y2hbMF0ubGVuZ3RoLFxuICAgICAgICAgICAgaXNCZWdpbkVuZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN3aXRjaFBhdHRlcm4odGhpcy5lbmRQYXR0ZXJuKHRoaXMuc2VhcmNoLmVuZCkpO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0uc3Vic3RyKDAsIDQpID09PSBcIlxcXFxyZWZcIiB8fCBtYXRjaFswXS5zdWJzdHIoMCwgNikgPT09IFwiXFxcXGVxcmVmXCIpIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSB7XG4gICAgICAgICAgICBtb2RlOiBcIlwiLFxuICAgICAgICAgICAgZW5kOiBcIlwiLFxuICAgICAgICAgICAgb3BlbjogZWxlbWVudCxcbiAgICAgICAgICAgIHBjb3VudDogMCxcbiAgICAgICAgICAgIG9sZW46IDAsXG4gICAgICAgICAgICBvcG9zOiB0aGlzLnBhdHRlcm4ubGFzdEluZGV4IC0gbWF0Y2hbMF0ubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kTWF0Y2goW1wiXCJdLCBlbGVtZW50KTtcbiAgICB9IGVsc2UgeyAvLyBlc2NhcGVkIGRvbGxhciBzaWduc1xuICAgICAgICAvLyBwdXQgJCBpbiBhIHNwYW4gc28gaXQgZG9lc24ndCBnZXQgcHJvY2Vzc2VkIGFnYWluXG4gICAgICAgIC8vIHNwbGl0IG9mZiBiYWNrc2xhc2hlcyBzbyB0aGV5IGRvbid0IGdldCByZW1vdmVkIGxhdGVyXG4gICAgICAgIHZhciBzbGFzaGVzID0gbWF0Y2hbMF0uc3Vic3RyKDAsIG1hdGNoWzBdLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgbiwgc3BhbjtcbiAgICAgICAgaWYgKHNsYXNoZXMubGVuZ3RoICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgc3BhbiA9IFtzbGFzaGVzLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKV07XG4gICAgICAgICAgICBuID0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3BhbiA9IFtzbGFzaGVzLnN1YnN0cigxKS5yZXBsYWNlKC9cXFxcXFxcXC9nLCBcIlxcXFxcIiksIFwiJFwiXTtcbiAgICAgICAgICAgIG4gPSAwXG4gICAgICAgIH1cbiAgICAgICAgZXNjYXBlZCA9IHRoaXMuY29uZmlnLmRvYy5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgZXNjYXBlZC5pbm5lckhUTUwgPSBzcGFuLmpvaW4oJycpO1xuICAgICAgICB2YXIgdGV4dCA9IHRoaXMuY29uZmlnLmRvYy5jcmVhdGVUZXh0Tm9kZShlbGVtZW50Lm5vZGVWYWx1ZS5zdWJzdHIoMCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgZWxlbWVudC5ub2RlVmFsdWUgPSBlbGVtZW50Lm5vZGVWYWx1ZS5zdWJzdHIobWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggLSBuKTtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlc2NhcGVkLCBlbGVtZW50KTtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBlc2NhcGVkKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCA9IG47XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuZW5kTWF0Y2ggPSBmdW5jdGlvbiAobWF0Y2gsIGVsZW1lbnQpIHtcbiAgICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2g7XG4gICAgaWYgKG1hdGNoWzBdID09IHNlYXJjaC5lbmQpIHtcbiAgICAgICAgaWYgKCFzZWFyY2guY2xvc2UgfHwgc2VhcmNoLnBjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgc2VhcmNoLmNsb3NlID0gZWxlbWVudDtcbiAgICAgICAgICAgIHNlYXJjaC5jcG9zID0gdGhpcy5wYXR0ZXJuLmxhc3RJbmRleDtcbiAgICAgICAgICAgIHNlYXJjaC5jbGVuID0gKHNlYXJjaC5pc0JlZ2luRW5kID8gMCA6IG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYXJjaC5wY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHNlYXJjaC5tYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmVuY2xvc2VNYXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zd2l0Y2hQYXR0ZXJuKHRoaXMuc3RhcnQpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PT0gXCJ7XCIpIHtcbiAgICAgICAgc2VhcmNoLnBjb3VudCsrXG4gICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PT0gXCJ9XCIgJiYgc2VhcmNoLnBjb3VudCkge1xuICAgICAgICBzZWFyY2gucGNvdW50LS1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xudGV4MmpheC5wcm90b3R5cGUucHJldkVuZE1hdGNoID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2VhcmNoLm1hdGNoZWQgPSB0cnVlO1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbmNsb3NlTWF0aCh0aGlzLnNlYXJjaC5jbG9zZSk7XG4gICAgdGhpcy5zd2l0Y2hQYXR0ZXJuKHRoaXMuc3RhcnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuc3dpdGNoUGF0dGVybiA9IGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgcGF0dGVybi5sYXN0SW5kZXggPSB0aGlzLnBhdHRlcm4ubGFzdEluZGV4O1xuICAgIHRoaXMucGF0dGVybiA9IHBhdHRlcm47XG4gICAgdGhpcy5zZWFyY2guc3RhcnQgPSAocGF0dGVybiA9PT0gdGhpcy5zdGFydCk7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5lbmNsb3NlTWF0aCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoLFxuICAgICAgICBjbG9zZSA9IHNlYXJjaC5jbG9zZSxcbiAgICAgICAgQ0xPU0UsIG1hdGg7XG4gICAgaWYgKHNlYXJjaC5jcG9zID09PSBjbG9zZS5sZW5ndGgpIHtcbiAgICAgICAgY2xvc2UgPSBjbG9zZS5uZXh0U2libGluZ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNsb3NlID0gY2xvc2Uuc3BsaXRUZXh0KHNlYXJjaC5jcG9zKVxuICAgIH1cbiAgICBpZiAoIWNsb3NlKSB7XG4gICAgICAgIENMT1NFID0gY2xvc2UgPSBzZWFyY2guY2xvc2UucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLmNvbmZpZy5kb2MuY3JlYXRlVGV4dE5vZGUoXCJcIikpO1xuICAgIH1cbiAgICBzZWFyY2guY2xvc2UgPSBjbG9zZTtcbiAgICBtYXRoID0gKHNlYXJjaC5vcG9zID8gc2VhcmNoLm9wZW4uc3BsaXRUZXh0KHNlYXJjaC5vcG9zKSA6IHNlYXJjaC5vcGVuKTtcbiAgICB3aGlsZSAobWF0aC5uZXh0U2libGluZyAmJiBtYXRoLm5leHRTaWJsaW5nICE9PSBjbG9zZSkge1xuICAgICAgICBpZiAobWF0aC5uZXh0U2libGluZy5ub2RlVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChtYXRoLm5leHRTaWJsaW5nLm5vZGVOYW1lID09PSBcIiNjb21tZW50XCIpIHtcbiAgICAgICAgICAgICAgICBtYXRoLm5vZGVWYWx1ZSArPSBtYXRoLm5leHRTaWJsaW5nLm5vZGVWYWx1ZS5yZXBsYWNlKC9eXFxbQ0RBVEFcXFsoKC58XFxufFxccikqKVxcXVxcXSQvLCBcIiQxXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXRoLm5vZGVWYWx1ZSArPSBtYXRoLm5leHRTaWJsaW5nLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1zaWVOZXdsaW5lQnVnKSB7XG4gICAgICAgICAgICBtYXRoLm5vZGVWYWx1ZSArPSAobWF0aC5uZXh0U2libGluZy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImJyXCIgPyBcIlxcblwiIDogXCIgXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0aC5ub2RlVmFsdWUgKz0gXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgbWF0aC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1hdGgubmV4dFNpYmxpbmcpO1xuICAgIH1cbiAgICB2YXIgVGVYID0gbWF0aC5ub2RlVmFsdWUuc3Vic3RyKHNlYXJjaC5vbGVuLCBtYXRoLm5vZGVWYWx1ZS5sZW5ndGggLSBzZWFyY2gub2xlbiAtIHNlYXJjaC5jbGVuKTtcbiAgICBtYXRoLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWF0aCk7XG4gICAgbWF0aCA9IHRoaXMuY3JlYXRlTWF0aFRhZyhzZWFyY2gubW9kZSwgVGVYKTtcbiAgICB0aGlzLnNlYXJjaCA9IHt9O1xuICAgIHRoaXMucGF0dGVybi5sYXN0SW5kZXggPSAwO1xuICAgIGlmIChDTE9TRSkge1xuICAgICAgICBDTE9TRS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKENMT1NFKVxuICAgIH1cbiAgICByZXR1cm4gbWF0aDtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmluc2VydE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaDtcbiAgICBzZWFyY2guY2xvc2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgc2VhcmNoLmNsb3NlKTtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmNyZWF0ZU1hdGhUYWcgPSBmdW5jdGlvbiAobW9kZSwgdGV4KSB7XG4gICAgdmFyIHNjcmlwdCA9IHRoaXMuY29uZmlnLmRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIHNjcmlwdC50eXBlID0gJ21hdGgvJyArIG1vZGU7XG4gICAgc2NyaXB0LnRleHQgPSB0ZXg7XG4gICAgdGhpcy5pbnNlcnROb2RlKHNjcmlwdCk7XG4gICAgcmV0dXJuIHNjcmlwdDtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmZpbHRlclByZXZpZXcgPSBmdW5jdGlvbiAodGV4KSB7XG4gICAgcmV0dXJuIHRleFxufTtcblxuZXhwb3J0cy50ZXgyamF4ID0gbmV3IHRleDJqYXgoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RleDJqYXguanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBjb21tb25tYXJrLmpzIC0gQ29tbW9tTWFyayBpbiBKYXZhU2NyaXB0XG4vLyBDb3B5cmlnaHQgKEMpIDIwMTQgSm9obiBNYWNGYXJsYW5lXG4vLyBMaWNlbnNlOiBCU0QzLlxuXG4vLyBCYXNpYyB1c2FnZTpcbi8vXG4vLyB2YXIgY29tbW9ubWFyayA9IHJlcXVpcmUoJ2NvbW1vbm1hcmsnKTtcbi8vIHZhciBwYXJzZXIgPSBuZXcgY29tbW9ubWFyay5QYXJzZXIoKTtcbi8vIHZhciByZW5kZXJlciA9IG5ldyBjb21tb25tYXJrLkh0bWxSZW5kZXJlcigpO1xuLy8gY29uc29sZS5sb2cocmVuZGVyZXIucmVuZGVyKHBhcnNlci5wYXJzZSgnSGVsbG8gKndvcmxkKicpKSk7XG5cbm1vZHVsZS5leHBvcnRzLk5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcbm1vZHVsZS5leHBvcnRzLlBhcnNlciA9IHJlcXVpcmUoJy4vYmxvY2tzJyk7XG5tb2R1bGUuZXhwb3J0cy5IdG1sUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlci9odG1sJyk7XG5tb2R1bGUuZXhwb3J0cy5YbWxSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyL3htbCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xudmFyIHVuZXNjYXBlU3RyaW5nID0gcmVxdWlyZSgnLi9jb21tb24nKS51bmVzY2FwZVN0cmluZztcbnZhciBPUEVOVEFHID0gcmVxdWlyZSgnLi9jb21tb24nKS5PUEVOVEFHO1xudmFyIENMT1NFVEFHID0gcmVxdWlyZSgnLi9jb21tb24nKS5DTE9TRVRBRztcblxudmFyIENPREVfSU5ERU5UID0gNDtcblxudmFyIENfVEFCID0gOTtcbnZhciBDX05FV0xJTkUgPSAxMDtcbnZhciBDX0dSRUFURVJUSEFOID0gNjI7XG52YXIgQ19MRVNTVEhBTiA9IDYwO1xudmFyIENfU1BBQ0UgPSAzMjtcbnZhciBDX09QRU5fQlJBQ0tFVCA9IDkxO1xuXG52YXIgSW5saW5lUGFyc2VyID0gcmVxdWlyZSgnLi9pbmxpbmVzJyk7XG5cbnZhciByZUh0bWxCbG9ja09wZW4gPSBbXG4gICAvLi8sIC8vIGR1bW15IGZvciAwXG4gICAvXjwoPzpzY3JpcHR8cHJlfHN0eWxlKSg/Olxcc3w+fCQpL2ksXG4gICAvXjwhLS0vLFxuICAgL148Wz9dLyxcbiAgIC9ePCFbQS1aXS8sXG4gICAvXjwhXFxbQ0RBVEFcXFsvLFxuICAgL148Wy9dPyg/OmFkZHJlc3N8YXJ0aWNsZXxhc2lkZXxiYXNlfGJhc2Vmb250fGJsb2NrcXVvdGV8Ym9keXxjYXB0aW9ufGNlbnRlcnxjb2x8Y29sZ3JvdXB8ZGR8ZGV0YWlsc3xkaWFsb2d8ZGlyfGRpdnxkbHxkdHxmaWVsZHNldHxmaWdjYXB0aW9ufGZpZ3VyZXxmb290ZXJ8Zm9ybXxmcmFtZXxmcmFtZXNldHxoWzEyMzQ1Nl18aGVhZHxoZWFkZXJ8aHJ8aHRtbHxpZnJhbWV8bGVnZW5kfGxpfGxpbmt8bWFpbnxtZW51fG1lbnVpdGVtfG1ldGF8bmF2fG5vZnJhbWVzfG9sfG9wdGdyb3VwfG9wdGlvbnxwfHBhcmFtfHNlY3Rpb258c291cmNlfHRpdGxlfHN1bW1hcnl8dGFibGV8dGJvZHl8dGR8dGZvb3R8dGh8dGhlYWR8dGl0bGV8dHJ8dHJhY2t8dWwpKD86XFxzfFsvXT9bPl18JCkvaSxcbiAgICBuZXcgUmVnRXhwKCdeKD86JyArIE9QRU5UQUcgKyAnfCcgKyBDTE9TRVRBRyArICcpXFxcXHMqJCcsICdpJylcbl07XG5cbnZhciByZUh0bWxCbG9ja0Nsb3NlID0gW1xuICAgLy4vLCAvLyBkdW1teSBmb3IgMFxuICAgLzxcXC8oPzpzY3JpcHR8cHJlfHN0eWxlKT4vaSxcbiAgIC8tLT4vLFxuICAgL1xcPz4vLFxuICAgLz4vLFxuICAgL1xcXVxcXT4vXG5dO1xuXG52YXIgcmVUaGVtYXRpY0JyZWFrID0gL14oPzooPzpcXCpbIFxcdF0qKXszLH18KD86X1sgXFx0XSopezMsfXwoPzotWyBcXHRdKil7Myx9KVsgXFx0XSokLztcblxudmFyIHJlTWF5YmVTcGVjaWFsID0gL15bI2B+KitfPTw+MC05LV0vO1xuXG52YXIgcmVOb25TcGFjZSA9IC9bXiBcXHRcXGZcXHZcXHJcXG5dLztcblxudmFyIHJlQnVsbGV0TGlzdE1hcmtlciA9IC9eWyorLV0vO1xuXG52YXIgcmVPcmRlcmVkTGlzdE1hcmtlciA9IC9eKFxcZHsxLDl9KShbLildKS87XG5cbnZhciByZUFUWEhlYWRpbmdNYXJrZXIgPSAvXiN7MSw2fSg/OlsgXFx0XSt8JCkvO1xuXG52YXIgcmVDb2RlRmVuY2UgPSAvXmB7Myx9KD8hLipgKXxefnszLH0oPyEuKn4pLztcblxudmFyIHJlQ2xvc2luZ0NvZGVGZW5jZSA9IC9eKD86YHszLH18fnszLH0pKD89ICokKS87XG5cbnZhciByZVNldGV4dEhlYWRpbmdMaW5lID0gL14oPzo9K3wtKylbIFxcdF0qJC87XG5cbnZhciByZUxpbmVFbmRpbmcgPSAvXFxyXFxufFxcbnxcXHIvO1xuXG4vLyBSZXR1cm5zIHRydWUgaWYgc3RyaW5nIGNvbnRhaW5zIG9ubHkgc3BhY2UgY2hhcmFjdGVycy5cbnZhciBpc0JsYW5rID0gZnVuY3Rpb24ocykge1xuICAgIHJldHVybiAhKHJlTm9uU3BhY2UudGVzdChzKSk7XG59O1xuXG52YXIgaXNTcGFjZU9yVGFiID0gZnVuY3Rpb24oYykge1xuICAgIHJldHVybiBjID09PSBDX1NQQUNFIHx8IGMgPT09IENfVEFCO1xufTtcblxudmFyIHBlZWsgPSBmdW5jdGlvbihsbiwgcG9zKSB7XG4gICAgaWYgKHBvcyA8IGxuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbG4uY2hhckNvZGVBdChwb3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG59O1xuXG4vLyBET0MgUEFSU0VSXG5cbi8vIFRoZXNlIGFyZSBtZXRob2RzIG9mIGEgUGFyc2VyIG9iamVjdCwgZGVmaW5lZCBiZWxvdy5cblxuLy8gUmV0dXJucyB0cnVlIGlmIGJsb2NrIGVuZHMgd2l0aCBhIGJsYW5rIGxpbmUsIGRlc2NlbmRpbmcgaWYgbmVlZGVkXG4vLyBpbnRvIGxpc3RzIGFuZCBzdWJsaXN0cy5cbnZhciBlbmRzV2l0aEJsYW5rTGluZSA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgd2hpbGUgKGJsb2NrKSB7XG4gICAgICAgIGlmIChibG9jay5fbGFzdExpbmVCbGFuaykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHQgPSBibG9jay50eXBlO1xuICAgICAgICBpZiAodCA9PT0gJ2xpc3QnIHx8IHQgPT09ICdpdGVtJykge1xuICAgICAgICAgICAgYmxvY2sgPSBibG9jay5fbGFzdENoaWxkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQWRkIGEgbGluZSB0byB0aGUgYmxvY2sgYXQgdGhlIHRpcC4gIFdlIGFzc3VtZSB0aGUgdGlwXG4vLyBjYW4gYWNjZXB0IGxpbmVzIC0tIHRoYXQgY2hlY2sgc2hvdWxkIGJlIGRvbmUgYmVmb3JlIGNhbGxpbmcgdGhpcy5cbnZhciBhZGRMaW5lID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIpIHtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDE7IC8vIHNraXAgb3ZlciB0YWJcbiAgICAgIC8vIGFkZCBzcGFjZSBjaGFyYWN0ZXJzOlxuICAgICAgdmFyIGNoYXJzVG9UYWIgPSA0IC0gKHRoaXMuY29sdW1uICUgNCk7XG4gICAgICB0aGlzLnRpcC5fc3RyaW5nX2NvbnRlbnQgKz0gKCcgJy5yZXBlYXQoY2hhcnNUb1RhYikpO1xuICAgIH1cbiAgICB0aGlzLnRpcC5fc3RyaW5nX2NvbnRlbnQgKz0gdGhpcy5jdXJyZW50TGluZS5zbGljZSh0aGlzLm9mZnNldCkgKyAnXFxuJztcbn07XG5cbi8vIEFkZCBibG9jayBvZiB0eXBlIHRhZyBhcyBhIGNoaWxkIG9mIHRoZSB0aXAuICBJZiB0aGUgdGlwIGNhbid0XG4vLyBhY2NlcHQgY2hpbGRyZW4sIGNsb3NlIGFuZCBmaW5hbGl6ZSBpdCBhbmQgdHJ5IGl0cyBwYXJlbnQsXG4vLyBhbmQgc28gb24gdGlsIHdlIGZpbmQgYSBibG9jayB0aGF0IGNhbiBhY2NlcHQgY2hpbGRyZW4uXG52YXIgYWRkQ2hpbGQgPSBmdW5jdGlvbih0YWcsIG9mZnNldCkge1xuICAgIHdoaWxlICghdGhpcy5ibG9ja3NbdGhpcy50aXAudHlwZV0uY2FuQ29udGFpbih0YWcpKSB7XG4gICAgICAgIHRoaXMuZmluYWxpemUodGhpcy50aXAsIHRoaXMubGluZU51bWJlciAtIDEpO1xuICAgIH1cblxuICAgIHZhciBjb2x1bW5fbnVtYmVyID0gb2Zmc2V0ICsgMTsgLy8gb2Zmc2V0IDAgPSBjb2x1bW4gMVxuICAgIHZhciBuZXdCbG9jayA9IG5ldyBOb2RlKHRhZywgW1t0aGlzLmxpbmVOdW1iZXIsIGNvbHVtbl9udW1iZXJdLCBbMCwgMF1dKTtcbiAgICBuZXdCbG9jay5fc3RyaW5nX2NvbnRlbnQgPSAnJztcbiAgICB0aGlzLnRpcC5hcHBlbmRDaGlsZChuZXdCbG9jayk7XG4gICAgdGhpcy50aXAgPSBuZXdCbG9jaztcbiAgICByZXR1cm4gbmV3QmxvY2s7XG59O1xuXG4vLyBQYXJzZSBhIGxpc3QgbWFya2VyIGFuZCByZXR1cm4gZGF0YSBvbiB0aGUgbWFya2VyICh0eXBlLFxuLy8gc3RhcnQsIGRlbGltaXRlciwgYnVsbGV0IGNoYXJhY3RlciwgcGFkZGluZykgb3IgbnVsbC5cbnZhciBwYXJzZUxpc3RNYXJrZXIgPSBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgIHZhciByZXN0ID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgIHZhciBtYXRjaDtcbiAgICB2YXIgbmV4dGM7XG4gICAgdmFyIHNwYWNlc1N0YXJ0Q29sO1xuICAgIHZhciBzcGFjZXNTdGFydE9mZnNldDtcbiAgICB2YXIgZGF0YSA9IHsgdHlwZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgdGlnaHQ6IHRydWUsICAvLyBsaXN0cyBhcmUgdGlnaHQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICBidWxsZXRDaGFyOiBudWxsLFxuICAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcbiAgICAgICAgICAgICAgICAgZGVsaW1pdGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICBwYWRkaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgICBtYXJrZXJPZmZzZXQ6IHBhcnNlci5pbmRlbnQgfTtcbiAgICBpZiAoKG1hdGNoID0gcmVzdC5tYXRjaChyZUJ1bGxldExpc3RNYXJrZXIpKSkge1xuICAgICAgICBkYXRhLnR5cGUgPSAnYnVsbGV0JztcbiAgICAgICAgZGF0YS5idWxsZXRDaGFyID0gbWF0Y2hbMF1bMF07XG5cbiAgICB9IGVsc2UgaWYgKChtYXRjaCA9IHJlc3QubWF0Y2gocmVPcmRlcmVkTGlzdE1hcmtlcikpICYmXG4gICAgICAgICAgICAgICAgKGNvbnRhaW5lci50eXBlICE9PSAncGFyYWdyYXBoJyB8fFxuICAgICAgICAgICAgICAgICBtYXRjaFsxXSA9PT0gJzEnKSkge1xuICAgICAgICBkYXRhLnR5cGUgPSAnb3JkZXJlZCc7XG4gICAgICAgIGRhdGEuc3RhcnQgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgICAgIGRhdGEuZGVsaW1pdGVyID0gbWF0Y2hbMl07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIHNwYWNlcyBhZnRlclxuICAgIG5leHRjID0gcGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5uZXh0Tm9uc3BhY2UgKyBtYXRjaFswXS5sZW5ndGgpO1xuICAgIGlmICghKG5leHRjID09PSAtMSB8fCBuZXh0YyA9PT0gQ19UQUIgfHwgbmV4dGMgPT09IENfU1BBQ0UpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGludGVycnVwdHMgcGFyYWdyYXBoLCBtYWtlIHN1cmUgZmlyc3QgbGluZSBpc24ndCBibGFua1xuICAgIGlmIChjb250YWluZXIudHlwZSA9PT0gJ3BhcmFncmFwaCcgJiYgIXBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlICsgbWF0Y2hbMF0ubGVuZ3RoKS5tYXRjaChyZU5vblNwYWNlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB3ZSd2ZSBnb3QgYSBtYXRjaCEgYWR2YW5jZSBvZmZzZXQgYW5kIGNhbGN1bGF0ZSBwYWRkaW5nXG4gICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTsgLy8gdG8gc3RhcnQgb2YgbWFya2VyXG4gICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQobWF0Y2hbMF0ubGVuZ3RoLCB0cnVlKTsgLy8gdG8gZW5kIG9mIG1hcmtlclxuICAgIHNwYWNlc1N0YXJ0Q29sID0gcGFyc2VyLmNvbHVtbjtcbiAgICBzcGFjZXNTdGFydE9mZnNldCA9IHBhcnNlci5vZmZzZXQ7XG4gICAgZG8ge1xuICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCB0cnVlKTtcbiAgICAgICAgbmV4dGMgPSBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm9mZnNldCk7XG4gICAgfSB3aGlsZSAocGFyc2VyLmNvbHVtbiAtIHNwYWNlc1N0YXJ0Q29sIDwgNSAmJlxuICAgICAgICAgICBpc1NwYWNlT3JUYWIobmV4dGMpKTtcbiAgICB2YXIgYmxhbmtfaXRlbSA9IHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIub2Zmc2V0KSA9PT0gLTE7XG4gICAgdmFyIHNwYWNlc19hZnRlcl9tYXJrZXIgPSBwYXJzZXIuY29sdW1uIC0gc3BhY2VzU3RhcnRDb2w7XG4gICAgaWYgKHNwYWNlc19hZnRlcl9tYXJrZXIgPj0gNSB8fFxuICAgICAgICBzcGFjZXNfYWZ0ZXJfbWFya2VyIDwgMSB8fFxuICAgICAgICBibGFua19pdGVtKSB7XG4gICAgICAgIGRhdGEucGFkZGluZyA9IG1hdGNoWzBdLmxlbmd0aCArIDE7XG4gICAgICAgIHBhcnNlci5jb2x1bW4gPSBzcGFjZXNTdGFydENvbDtcbiAgICAgICAgcGFyc2VyLm9mZnNldCA9IHNwYWNlc1N0YXJ0T2Zmc2V0O1xuICAgICAgICBpZiAoaXNTcGFjZU9yVGFiKHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIub2Zmc2V0KSkpIHtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS5wYWRkaW5nID0gbWF0Y2hbMF0ubGVuZ3RoICsgc3BhY2VzX2FmdGVyX21hcmtlcjtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59O1xuXG4vLyBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBsaXN0IGl0ZW1zIGFyZSBvZiB0aGUgc2FtZSB0eXBlLFxuLy8gd2l0aCB0aGUgc2FtZSBkZWxpbWl0ZXIgYW5kIGJ1bGxldCBjaGFyYWN0ZXIuICBUaGlzIGlzIHVzZWRcbi8vIGluIGFnZ2xvbWVyYXRpbmcgbGlzdCBpdGVtcyBpbnRvIGxpc3RzLlxudmFyIGxpc3RzTWF0Y2ggPSBmdW5jdGlvbihsaXN0X2RhdGEsIGl0ZW1fZGF0YSkge1xuICAgIHJldHVybiAobGlzdF9kYXRhLnR5cGUgPT09IGl0ZW1fZGF0YS50eXBlICYmXG4gICAgICAgICAgICBsaXN0X2RhdGEuZGVsaW1pdGVyID09PSBpdGVtX2RhdGEuZGVsaW1pdGVyICYmXG4gICAgICAgICAgICBsaXN0X2RhdGEuYnVsbGV0Q2hhciA9PT0gaXRlbV9kYXRhLmJ1bGxldENoYXIpO1xufTtcblxuLy8gRmluYWxpemUgYW5kIGNsb3NlIGFueSB1bm1hdGNoZWQgYmxvY2tzLlxudmFyIGNsb3NlVW5tYXRjaGVkQmxvY2tzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLmFsbENsb3NlZCkge1xuICAgICAgICAvLyBmaW5hbGl6ZSBhbnkgYmxvY2tzIG5vdCBtYXRjaGVkXG4gICAgICAgIHdoaWxlICh0aGlzLm9sZHRpcCAhPT0gdGhpcy5sYXN0TWF0Y2hlZENvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMub2xkdGlwLl9wYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLmZpbmFsaXplKHRoaXMub2xkdGlwLCB0aGlzLmxpbmVOdW1iZXIgLSAxKTtcbiAgICAgICAgICAgIHRoaXMub2xkdGlwID0gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWxsQ2xvc2VkID0gdHJ1ZTtcbiAgICB9XG59O1xuXG4vLyAnZmluYWxpemUnIGlzIHJ1biB3aGVuIHRoZSBibG9jayBpcyBjbG9zZWQuXG4vLyAnY29udGludWUnIGlzIHJ1biB0byBjaGVjayB3aGV0aGVyIHRoZSBibG9jayBpcyBjb250aW51aW5nXG4vLyBhdCBhIGNlcnRhaW4gbGluZSBhbmQgb2Zmc2V0IChlLmcuIHdoZXRoZXIgYSBibG9jayBxdW90ZVxuLy8gY29udGFpbnMgYSBgPmAuICBJdCByZXR1cm5zIDAgZm9yIG1hdGNoZWQsIDEgZm9yIG5vdCBtYXRjaGVkLFxuLy8gYW5kIDIgZm9yIFwid2UndmUgZGVhbHQgd2l0aCB0aGlzIGxpbmUgY29tcGxldGVseSwgZ28gdG8gbmV4dC5cIlxudmFyIGJsb2NrcyA9IHtcbiAgICBkb2N1bWVudDoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24odCkgeyByZXR1cm4gKHQgIT09ICdpdGVtJyk7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIGxpc3Q6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKHBhcnNlciwgYmxvY2spIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gYmxvY2suX2ZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBub24tZmluYWwgbGlzdCBpdGVtIGVuZGluZyB3aXRoIGJsYW5rIGxpbmU6XG4gICAgICAgICAgICAgICAgaWYgKGVuZHNXaXRoQmxhbmtMaW5lKGl0ZW0pICYmIGl0ZW0uX25leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suX2xpc3REYXRhLnRpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZWN1cnNlIGludG8gY2hpbGRyZW4gb2YgbGlzdCBpdGVtLCB0byBzZWUgaWYgdGhlcmUgYXJlXG4gICAgICAgICAgICAgICAgLy8gc3BhY2VzIGJldHdlZW4gYW55IG9mIHRoZW06XG4gICAgICAgICAgICAgICAgdmFyIHN1Yml0ZW0gPSBpdGVtLl9maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIHdoaWxlIChzdWJpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmRzV2l0aEJsYW5rTGluZShzdWJpdGVtKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0uX25leHQgfHwgc3ViaXRlbS5fbmV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrLl9saXN0RGF0YS50aWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3ViaXRlbSA9IHN1Yml0ZW0uX25leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLl9uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbih0KSB7IHJldHVybiAodCA9PT0gJ2l0ZW0nKTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgYmxvY2tfcXVvdGU6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgICAgICAgdmFyIGxuID0gcGFyc2VyLmN1cnJlbnRMaW5lO1xuICAgICAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgICAgICBwZWVrKGxuLCBwYXJzZXIubmV4dE5vbnNwYWNlKSA9PT0gQ19HUkVBVEVSVEhBTikge1xuICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChpc1NwYWNlT3JUYWIocGVlayhsbiwgcGFyc2VyLm9mZnNldCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKCkgeyByZXR1cm47IH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKHQpIHsgcmV0dXJuICh0ICE9PSAnaXRlbScpOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IGZhbHNlXG4gICAgfSxcbiAgICBpdGVtOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgaWYgKHBhcnNlci5ibGFuaykge1xuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIuX2ZpcnN0Q2hpbGQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBCbGFuayBsaW5lIGFmdGVyIGVtcHR5IGxpc3QgaXRlbVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VyLmluZGVudCA+PVxuICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuX2xpc3REYXRhLm1hcmtlck9mZnNldCArXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5fbGlzdERhdGEucGFkZGluZykge1xuICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KGNvbnRhaW5lci5fbGlzdERhdGEubWFya2VyT2Zmc2V0ICtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLl9saXN0RGF0YS5wYWRkaW5nLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKCkgeyByZXR1cm47IH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKHQpIHsgcmV0dXJuICh0ICE9PSAnaXRlbScpOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IGZhbHNlXG4gICAgfSxcbiAgICBoZWFkaW5nOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGEgaGVhZGluZyBjYW4gbmV2ZXIgY29udGFpbmVyID4gMSBsaW5lLCBzbyBmYWlsIHRvIG1hdGNoOlxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbigpIHsgcmV0dXJuOyB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IGZhbHNlXG4gICAgfSxcbiAgICB0aGVtYXRpY19icmVhazoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBhIHRoZW1hdGljIGJyZWFrIGNhbiBuZXZlciBjb250YWluZXIgPiAxIGxpbmUsIHNvIGZhaWwgdG8gbWF0Y2g6XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKCkgeyByZXR1cm47IH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIGNvZGVfYmxvY2s6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgbG4gPSBwYXJzZXIuY3VycmVudExpbmU7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gcGFyc2VyLmluZGVudDtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuX2lzRmVuY2VkKSB7IC8vIGZlbmNlZFxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IChpbmRlbnQgPD0gMyAmJlxuICAgICAgICAgICAgICAgICAgICBsbi5jaGFyQXQocGFyc2VyLm5leHROb25zcGFjZSkgPT09IGNvbnRhaW5lci5fZmVuY2VDaGFyICYmXG4gICAgICAgICAgICAgICAgICAgIGxuLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpLm1hdGNoKHJlQ2xvc2luZ0NvZGVGZW5jZSkpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFswXS5sZW5ndGggPj0gY29udGFpbmVyLl9mZW5jZUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nIGZlbmNlIC0gd2UncmUgYXQgZW5kIG9mIGxpbmUsIHNvIHdlIGNhbiByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmZpbmFsaXplKGNvbnRhaW5lciwgcGFyc2VyLmxpbmVOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBza2lwIG9wdGlvbmFsIHNwYWNlcyBvZiBmZW5jZSBvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBjb250YWluZXIuX2ZlbmNlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaSA+IDAgJiYgaXNTcGFjZU9yVGFiKHBlZWsobG4sIHBhcnNlci5vZmZzZXQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBpbmRlbnRlZFxuICAgICAgICAgICAgICAgIGlmIChpbmRlbnQgPj0gQ09ERV9JTkRFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoQ09ERV9JTkRFTlQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VyLmJsYW5rKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbihwYXJzZXIsIGJsb2NrKSB7XG4gICAgICAgICAgICBpZiAoYmxvY2suX2lzRmVuY2VkKSB7IC8vIGZlbmNlZFxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IGxpbmUgYmVjb21lcyBpbmZvIHN0cmluZ1xuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gYmxvY2suX3N0cmluZ19jb250ZW50O1xuICAgICAgICAgICAgICAgIHZhciBuZXdsaW5lUG9zID0gY29udGVudC5pbmRleE9mKCdcXG4nKTtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RMaW5lID0gY29udGVudC5zbGljZSgwLCBuZXdsaW5lUG9zKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdCA9IGNvbnRlbnQuc2xpY2UobmV3bGluZVBvcyArIDEpO1xuICAgICAgICAgICAgICAgIGJsb2NrLmluZm8gPSB1bmVzY2FwZVN0cmluZyhmaXJzdExpbmUudHJpbSgpKTtcbiAgICAgICAgICAgICAgICBibG9jay5fbGl0ZXJhbCA9IHJlc3Q7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBpbmRlbnRlZFxuICAgICAgICAgICAgICAgIGJsb2NrLl9saXRlcmFsID0gYmxvY2suX3N0cmluZ19jb250ZW50LnJlcGxhY2UoLyhcXG4gKikrJC8sICdcXG4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLl9zdHJpbmdfY29udGVudCA9IG51bGw7IC8vIGFsbG93IEdDXG4gICAgICAgIH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogdHJ1ZVxuICAgIH0sXG4gICAgaHRtbF9ibG9jazoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoKHBhcnNlci5ibGFuayAmJlxuICAgICAgICAgICAgICAgICAgICAgKGNvbnRhaW5lci5faHRtbEJsb2NrVHlwZSA9PT0gNiB8fFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5faHRtbEJsb2NrVHlwZSA9PT0gNykpID8gMSA6IDApO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24ocGFyc2VyLCBibG9jaykge1xuICAgICAgICAgICAgYmxvY2suX2xpdGVyYWwgPSBibG9jay5fc3RyaW5nX2NvbnRlbnQucmVwbGFjZSgvKFxcbiAqKSskLywgJycpO1xuICAgICAgICAgICAgYmxvY2suX3N0cmluZ19jb250ZW50ID0gbnVsbDsgLy8gYWxsb3cgR0NcbiAgICAgICAgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiB0cnVlXG4gICAgfSxcbiAgICBwYXJhZ3JhcGg6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgICAgICAgcmV0dXJuIChwYXJzZXIuYmxhbmsgPyAxIDogMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbihwYXJzZXIsIGJsb2NrKSB7XG4gICAgICAgICAgICB2YXIgcG9zO1xuICAgICAgICAgICAgdmFyIGhhc1JlZmVyZW5jZURlZnMgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gdHJ5IHBhcnNpbmcgdGhlIGJlZ2lubmluZyBhcyBsaW5rIHJlZmVyZW5jZSBkZWZpbml0aW9uczpcbiAgICAgICAgICAgIHdoaWxlIChwZWVrKGJsb2NrLl9zdHJpbmdfY29udGVudCwgMCkgPT09IENfT1BFTl9CUkFDS0VUICYmXG4gICAgICAgICAgICAgICAgICAgKHBvcyA9XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5pbmxpbmVQYXJzZXIucGFyc2VSZWZlcmVuY2UoYmxvY2suX3N0cmluZ19jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5yZWZtYXApKSkge1xuICAgICAgICAgICAgICAgIGJsb2NrLl9zdHJpbmdfY29udGVudCA9IGJsb2NrLl9zdHJpbmdfY29udGVudC5zbGljZShwb3MpO1xuICAgICAgICAgICAgICAgIGhhc1JlZmVyZW5jZURlZnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc1JlZmVyZW5jZURlZnMgJiYgaXNCbGFuayhibG9jay5fc3RyaW5nX2NvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgYmxvY2sudW5saW5rKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogdHJ1ZVxuICAgIH1cbn07XG5cbi8vIGJsb2NrIHN0YXJ0IGZ1bmN0aW9ucy4gIFJldHVybiB2YWx1ZXM6XG4vLyAwID0gbm8gbWF0Y2hcbi8vIDEgPSBtYXRjaGVkIGNvbnRhaW5lciwga2VlcCBnb2luZ1xuLy8gMiA9IG1hdGNoZWQgbGVhZiwgbm8gbW9yZSBibG9jayBzdGFydHNcbnZhciBibG9ja1N0YXJ0cyA9IFtcbiAgICAvLyBibG9jayBxdW90ZVxuICAgIGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgcGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5uZXh0Tm9uc3BhY2UpID09PSBDX0dSRUFURVJUSEFOKSB7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgZmFsc2UpO1xuICAgICAgICAgICAgLy8gb3B0aW9uYWwgZm9sbG93aW5nIHNwYWNlXG4gICAgICAgICAgICBpZiAoaXNTcGFjZU9yVGFiKHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIub2Zmc2V0KSkpIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgcGFyc2VyLmFkZENoaWxkKCdibG9ja19xdW90ZScsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBBVFggaGVhZGluZ1xuICAgIGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICAobWF0Y2ggPSBwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSkubWF0Y2gocmVBVFhIZWFkaW5nTWFya2VyKSkpIHtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChtYXRjaFswXS5sZW5ndGgsIGZhbHNlKTtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHBhcnNlci5hZGRDaGlsZCgnaGVhZGluZycsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgY29udGFpbmVyLmxldmVsID0gbWF0Y2hbMF0udHJpbSgpLmxlbmd0aDsgLy8gbnVtYmVyIG9mICNzXG4gICAgICAgICAgICAvLyByZW1vdmUgdHJhaWxpbmcgIyMjczpcbiAgICAgICAgICAgIGNvbnRhaW5lci5fc3RyaW5nX2NvbnRlbnQgPVxuICAgICAgICAgICAgICAgIHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIub2Zmc2V0KS5yZXBsYWNlKC9eWyBcXHRdKiMrWyBcXHRdKiQvLCAnJykucmVwbGFjZSgvWyBcXHRdKyMrWyBcXHRdKiQvLCAnJyk7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChwYXJzZXIuY3VycmVudExpbmUubGVuZ3RoIC0gcGFyc2VyLm9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIEZlbmNlZCBjb2RlIGJsb2NrXG4gICAgZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKS5tYXRjaChyZUNvZGVGZW5jZSkpKSB7XG4gICAgICAgICAgICB2YXIgZmVuY2VMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBwYXJzZXIuYWRkQ2hpbGQoJ2NvZGVfYmxvY2snLCBwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5faXNGZW5jZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29udGFpbmVyLl9mZW5jZUxlbmd0aCA9IGZlbmNlTGVuZ3RoO1xuICAgICAgICAgICAgY29udGFpbmVyLl9mZW5jZUNoYXIgPSBtYXRjaFswXVswXTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5fZmVuY2VPZmZzZXQgPSBwYXJzZXIuaW5kZW50O1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KGZlbmNlTGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIEhUTUwgYmxvY2tcbiAgICBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgcGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5uZXh0Tm9uc3BhY2UpID09PSBDX0xFU1NUSEFOKSB7XG4gICAgICAgICAgICB2YXIgcyA9IHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgIHZhciBibG9ja1R5cGU7XG5cbiAgICAgICAgICAgIGZvciAoYmxvY2tUeXBlID0gMTsgYmxvY2tUeXBlIDw9IDc7IGJsb2NrVHlwZSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlSHRtbEJsb2NrT3BlbltibG9ja1R5cGVdLnRlc3QocykgJiZcbiAgICAgICAgICAgICAgICAgICAgKGJsb2NrVHlwZSA8IDcgfHxcbiAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50eXBlICE9PSAncGFyYWdyYXBoJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGFkanVzdCBwYXJzZXIub2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAvLyBzcGFjZXMgYXJlIHBhcnQgb2YgdGhlIEhUTUwgYmxvY2s6XG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VyLmFkZENoaWxkKCdodG1sX2Jsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgIGIuX2h0bWxCbG9ja1R5cGUgPSBibG9ja1R5cGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuXG4gICAgfSxcblxuICAgIC8vIFNldGV4dCBoZWFkaW5nXG4gICAgZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgY29udGFpbmVyLnR5cGUgPT09ICdwYXJhZ3JhcGgnICYmXG4gICAgICAgICAgICAgICAgICAgKChtYXRjaCA9IHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKS5tYXRjaChyZVNldGV4dEhlYWRpbmdMaW5lKSkpKSB7XG4gICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgIHZhciBoZWFkaW5nID0gbmV3IE5vZGUoJ2hlYWRpbmcnLCBjb250YWluZXIuc291cmNlcG9zKTtcbiAgICAgICAgICAgIGhlYWRpbmcubGV2ZWwgPSBtYXRjaFswXVswXSA9PT0gJz0nID8gMSA6IDI7XG4gICAgICAgICAgICBoZWFkaW5nLl9zdHJpbmdfY29udGVudCA9IGNvbnRhaW5lci5fc3RyaW5nX2NvbnRlbnQ7XG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QWZ0ZXIoaGVhZGluZyk7XG4gICAgICAgICAgICBjb250YWluZXIudW5saW5rKCk7XG4gICAgICAgICAgICBwYXJzZXIudGlwID0gaGVhZGluZztcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KHBhcnNlci5jdXJyZW50TGluZS5sZW5ndGggLSBwYXJzZXIub2Zmc2V0LCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHRoZW1hdGljIGJyZWFrXG4gICAgZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICByZVRoZW1hdGljQnJlYWsudGVzdChwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSkpKSB7XG4gICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgIHBhcnNlci5hZGRDaGlsZCgndGhlbWF0aWNfYnJlYWsnLCBwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KHBhcnNlci5jdXJyZW50TGluZS5sZW5ndGggLSBwYXJzZXIub2Zmc2V0LCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGxpc3QgaXRlbVxuICAgIGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBkYXRhO1xuXG4gICAgICAgIGlmICgoIXBhcnNlci5pbmRlbnRlZCB8fCBjb250YWluZXIudHlwZSA9PT0gJ2xpc3QnKVxuICAgICAgICAgICAgICAgICYmIChkYXRhID0gcGFyc2VMaXN0TWFya2VyKHBhcnNlciwgY29udGFpbmVyKSkpIHtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGxpc3QgaWYgbmVlZGVkXG4gICAgICAgICAgICBpZiAocGFyc2VyLnRpcC50eXBlICE9PSAnbGlzdCcgfHxcbiAgICAgICAgICAgICAgICAhKGxpc3RzTWF0Y2goY29udGFpbmVyLl9saXN0RGF0YSwgZGF0YSkpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gcGFyc2VyLmFkZENoaWxkKCdsaXN0JywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLl9saXN0RGF0YSA9IGRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbGlzdCBpdGVtXG4gICAgICAgICAgICBjb250YWluZXIgPSBwYXJzZXIuYWRkQ2hpbGQoJ2l0ZW0nLCBwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5fbGlzdERhdGEgPSBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBpbmRlbnRlZCBjb2RlIGJsb2NrXG4gICAgZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgIGlmIChwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIHBhcnNlci50aXAudHlwZSAhPT0gJ3BhcmFncmFwaCcgJiZcbiAgICAgICAgICAgICFwYXJzZXIuYmxhbmspIHtcbiAgICAgICAgICAgIC8vIGluZGVudGVkIGNvZGVcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KENPREVfSU5ERU5ULCB0cnVlKTtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgcGFyc2VyLmFkZENoaWxkKCdjb2RlX2Jsb2NrJywgcGFyc2VyLm9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgIH1cblxuXTtcblxudmFyIGFkdmFuY2VPZmZzZXQgPSBmdW5jdGlvbihjb3VudCwgY29sdW1ucykge1xuICAgIHZhciBjdXJyZW50TGluZSA9IHRoaXMuY3VycmVudExpbmU7XG4gICAgdmFyIGNoYXJzVG9UYWIsIGNoYXJzVG9BZHZhbmNlO1xuICAgIHZhciBjO1xuICAgIHdoaWxlIChjb3VudCA+IDAgJiYgKGMgPSBjdXJyZW50TGluZVt0aGlzLm9mZnNldF0pKSB7XG4gICAgICAgIGlmIChjID09PSAnXFx0Jykge1xuICAgICAgICAgICAgY2hhcnNUb1RhYiA9IDQgLSAodGhpcy5jb2x1bW4gJSA0KTtcbiAgICAgICAgICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGNoYXJzVG9UYWIgPiBjb3VudDtcbiAgICAgICAgICAgICAgICBjaGFyc1RvQWR2YW5jZSA9IGNoYXJzVG9UYWIgPiBjb3VudCA/IGNvdW50IDogY2hhcnNUb1RhYjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbiArPSBjaGFyc1RvQWR2YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCArPSB0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgY291bnQgLT0gY2hhcnNUb0FkdmFuY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbiArPSBjaGFyc1RvVGFiO1xuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgICAgICAgICAgICAgY291bnQgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbiArPSAxOyAvLyBhc3N1bWUgYXNjaWk7IGJsb2NrIHN0YXJ0cyBhcmUgYXNjaWlcbiAgICAgICAgICAgIGNvdW50IC09IDE7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYWR2YW5jZU5leHROb25zcGFjZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5uZXh0Tm9uc3BhY2U7XG4gICAgdGhpcy5jb2x1bW4gPSB0aGlzLm5leHROb25zcGFjZUNvbHVtbjtcbiAgICB0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiID0gZmFsc2U7XG59O1xuXG52YXIgZmluZE5leHROb25zcGFjZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50TGluZSA9IHRoaXMuY3VycmVudExpbmU7XG4gICAgdmFyIGkgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgY29scyA9IHRoaXMuY29sdW1uO1xuICAgIHZhciBjO1xuXG4gICAgd2hpbGUgKChjID0gY3VycmVudExpbmUuY2hhckF0KGkpKSAhPT0gJycpIHtcbiAgICAgICAgaWYgKGMgPT09ICcgJykge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgY29scysrO1xuICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICdcXHQnKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb2xzICs9ICg0IC0gKGNvbHMgJSA0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmJsYW5rID0gKGMgPT09ICdcXG4nIHx8IGMgPT09ICdcXHInIHx8IGMgPT09ICcnKTtcbiAgICB0aGlzLm5leHROb25zcGFjZSA9IGk7XG4gICAgdGhpcy5uZXh0Tm9uc3BhY2VDb2x1bW4gPSBjb2xzO1xuICAgIHRoaXMuaW5kZW50ID0gdGhpcy5uZXh0Tm9uc3BhY2VDb2x1bW4gLSB0aGlzLmNvbHVtbjtcbiAgICB0aGlzLmluZGVudGVkID0gdGhpcy5pbmRlbnQgPj0gQ09ERV9JTkRFTlQ7XG59O1xuXG4vLyBBbmFseXplIGEgbGluZSBvZiB0ZXh0IGFuZCB1cGRhdGUgdGhlIGRvY3VtZW50IGFwcHJvcHJpYXRlbHkuXG4vLyBXZSBwYXJzZSBtYXJrZG93biB0ZXh0IGJ5IGNhbGxpbmcgdGhpcyBvbiBlYWNoIGxpbmUgb2YgaW5wdXQsXG4vLyB0aGVuIGZpbmFsaXppbmcgdGhlIGRvY3VtZW50LlxudmFyIGluY29ycG9yYXRlTGluZSA9IGZ1bmN0aW9uKGxuKSB7XG4gICAgdmFyIGFsbF9tYXRjaGVkID0gdHJ1ZTtcbiAgICB2YXIgdDtcblxuICAgIHZhciBjb250YWluZXIgPSB0aGlzLmRvYztcbiAgICB0aGlzLm9sZHRpcCA9IHRoaXMudGlwO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICB0aGlzLmNvbHVtbiA9IDA7XG4gICAgdGhpcy5ibGFuayA9IGZhbHNlO1xuICAgIHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPSBmYWxzZTtcbiAgICB0aGlzLmxpbmVOdW1iZXIgKz0gMTtcblxuICAgIC8vIHJlcGxhY2UgTlVMIGNoYXJhY3RlcnMgZm9yIHNlY3VyaXR5XG4gICAgaWYgKGxuLmluZGV4T2YoJ1xcdTAwMDAnKSAhPT0gLTEpIHtcbiAgICAgICAgbG4gPSBsbi5yZXBsYWNlKC9cXDAvZywgJ1xcdUZGRkQnKTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRMaW5lID0gbG47XG5cbiAgICAvLyBGb3IgZWFjaCBjb250YWluaW5nIGJsb2NrLCB0cnkgdG8gcGFyc2UgdGhlIGFzc29jaWF0ZWQgbGluZSBzdGFydC5cbiAgICAvLyBCYWlsIG91dCBvbiBmYWlsdXJlOiBjb250YWluZXIgd2lsbCBwb2ludCB0byB0aGUgbGFzdCBtYXRjaGluZyBibG9jay5cbiAgICAvLyBTZXQgYWxsX21hdGNoZWQgdG8gZmFsc2UgaWYgbm90IGFsbCBjb250YWluZXJzIG1hdGNoLlxuICAgIHZhciBsYXN0Q2hpbGQ7XG4gICAgd2hpbGUgKChsYXN0Q2hpbGQgPSBjb250YWluZXIuX2xhc3RDaGlsZCkgJiYgbGFzdENoaWxkLl9vcGVuKSB7XG4gICAgICAgIGNvbnRhaW5lciA9IGxhc3RDaGlsZDtcblxuICAgICAgICB0aGlzLmZpbmROZXh0Tm9uc3BhY2UoKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuYmxvY2tzW2NvbnRhaW5lci50eXBlXS5jb250aW51ZSh0aGlzLCBjb250YWluZXIpKSB7XG4gICAgICAgIGNhc2UgMDogLy8gd2UndmUgbWF0Y2hlZCwga2VlcCBnb2luZ1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTogLy8gd2UndmUgZmFpbGVkIHRvIG1hdGNoIGEgYmxvY2tcbiAgICAgICAgICAgIGFsbF9tYXRjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOiAvLyB3ZSd2ZSBoaXQgZW5kIG9mIGxpbmUgZm9yIGZlbmNlZCBjb2RlIGNsb3NlIGFuZCBjYW4gcmV0dXJuXG4gICAgICAgICAgICB0aGlzLmxhc3RMaW5lTGVuZ3RoID0gbG4ubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgJ2NvbnRpbnVlIHJldHVybmVkIGlsbGVnYWwgdmFsdWUsIG11c3QgYmUgMCwgMSwgb3IgMic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhbGxfbWF0Y2hlZCkge1xuICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLl9wYXJlbnQ7IC8vIGJhY2sgdXAgdG8gbGFzdCBtYXRjaGluZyBibG9ja1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFsbENsb3NlZCA9IChjb250YWluZXIgPT09IHRoaXMub2xkdGlwKTtcbiAgICB0aGlzLmxhc3RNYXRjaGVkQ29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdmFyIG1hdGNoZWRMZWFmID0gY29udGFpbmVyLnR5cGUgIT09ICdwYXJhZ3JhcGgnICYmXG4gICAgICAgICAgICBibG9ja3NbY29udGFpbmVyLnR5cGVdLmFjY2VwdHNMaW5lcztcbiAgICB2YXIgc3RhcnRzID0gdGhpcy5ibG9ja1N0YXJ0cztcbiAgICB2YXIgc3RhcnRzTGVuID0gc3RhcnRzLmxlbmd0aDtcbiAgICAvLyBVbmxlc3MgbGFzdCBtYXRjaGVkIGNvbnRhaW5lciBpcyBhIGNvZGUgYmxvY2ssIHRyeSBuZXcgY29udGFpbmVyIHN0YXJ0cyxcbiAgICAvLyBhZGRpbmcgY2hpbGRyZW4gdG8gdGhlIGxhc3QgbWF0Y2hlZCBjb250YWluZXI6XG4gICAgd2hpbGUgKCFtYXRjaGVkTGVhZikge1xuXG4gICAgICAgIHRoaXMuZmluZE5leHROb25zcGFjZSgpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYSBsaXR0bGUgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uOlxuICAgICAgICBpZiAoIXRoaXMuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgICFyZU1heWJlU3BlY2lhbC50ZXN0KGxuLnNsaWNlKHRoaXMubmV4dE5vbnNwYWNlKSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3RhcnRzTGVuKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gc3RhcnRzW2ldKHRoaXMsIGNvbnRhaW5lcik7XG4gICAgICAgICAgICBpZiAocmVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy50aXA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcyA9PT0gMikge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMudGlwO1xuICAgICAgICAgICAgICAgIG1hdGNoZWRMZWFmID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgPT09IHN0YXJ0c0xlbikgeyAvLyBub3RoaW5nIG1hdGNoZWRcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXaGF0IHJlbWFpbnMgYXQgdGhlIG9mZnNldCBpcyBhIHRleHQgbGluZS4gIEFkZCB0aGUgdGV4dCB0byB0aGVcbiAgICAvLyBhcHByb3ByaWF0ZSBjb250YWluZXIuXG5cbiAgIC8vIEZpcnN0IGNoZWNrIGZvciBhIGxhenkgcGFyYWdyYXBoIGNvbnRpbnVhdGlvbjpcbiAgICBpZiAoIXRoaXMuYWxsQ2xvc2VkICYmICF0aGlzLmJsYW5rICYmXG4gICAgICAgIHRoaXMudGlwLnR5cGUgPT09ICdwYXJhZ3JhcGgnKSB7XG4gICAgICAgIC8vIGxhenkgcGFyYWdyYXBoIGNvbnRpbnVhdGlvblxuICAgICAgICB0aGlzLmFkZExpbmUoKTtcblxuICAgIH0gZWxzZSB7IC8vIG5vdCBhIGxhenkgY29udGludWF0aW9uXG5cbiAgICAgICAgLy8gZmluYWxpemUgYW55IGJsb2NrcyBub3QgbWF0Y2hlZFxuICAgICAgICB0aGlzLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgIGlmICh0aGlzLmJsYW5rICYmIGNvbnRhaW5lci5sYXN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5sYXN0Q2hpbGQuX2xhc3RMaW5lQmxhbmsgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdCA9IGNvbnRhaW5lci50eXBlO1xuXG4gICAgICAgIC8vIEJsb2NrIHF1b3RlIGxpbmVzIGFyZSBuZXZlciBibGFuayBhcyB0aGV5IHN0YXJ0IHdpdGggPlxuICAgICAgICAvLyBhbmQgd2UgZG9uJ3QgY291bnQgYmxhbmtzIGluIGZlbmNlZCBjb2RlIGZvciBwdXJwb3NlcyBvZiB0aWdodC9sb29zZVxuICAgICAgICAvLyBsaXN0cyBvciBicmVha2luZyBvdXQgb2YgbGlzdHMuICBXZSBhbHNvIGRvbid0IHNldCBfbGFzdExpbmVCbGFua1xuICAgICAgICAvLyBvbiBhbiBlbXB0eSBsaXN0IGl0ZW0sIG9yIGlmIHdlIGp1c3QgY2xvc2VkIGEgZmVuY2VkIGJsb2NrLlxuICAgICAgICB2YXIgbGFzdExpbmVCbGFuayA9IHRoaXMuYmxhbmsgJiZcbiAgICAgICAgICAgICEodCA9PT0gJ2Jsb2NrX3F1b3RlJyB8fFxuICAgICAgICAgICAgICAodCA9PT0gJ2NvZGVfYmxvY2snICYmIGNvbnRhaW5lci5faXNGZW5jZWQpIHx8XG4gICAgICAgICAgICAgICh0ID09PSAnaXRlbScgJiZcbiAgICAgICAgICAgICAgICFjb250YWluZXIuX2ZpcnN0Q2hpbGQgJiZcbiAgICAgICAgICAgICAgIGNvbnRhaW5lci5zb3VyY2Vwb3NbMF1bMF0gPT09IHRoaXMubGluZU51bWJlcikpO1xuXG4gICAgICAgIC8vIHByb3BhZ2F0ZSBsYXN0TGluZUJsYW5rIHVwIHRocm91Z2ggcGFyZW50czpcbiAgICAgICAgdmFyIGNvbnQgPSBjb250YWluZXI7XG4gICAgICAgIHdoaWxlIChjb250KSB7XG4gICAgICAgICAgICBjb250Ll9sYXN0TGluZUJsYW5rID0gbGFzdExpbmVCbGFuaztcbiAgICAgICAgICAgIGNvbnQgPSBjb250Ll9wYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ibG9ja3NbdF0uYWNjZXB0c0xpbmVzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZExpbmUoKTtcbiAgICAgICAgICAgIC8vIGlmIEh0bWxCbG9jaywgY2hlY2sgZm9yIGVuZCBjb25kaXRpb25cbiAgICAgICAgICAgIGlmICh0ID09PSAnaHRtbF9ibG9jaycgJiZcbiAgICAgICAgICAgICAgICBjb250YWluZXIuX2h0bWxCbG9ja1R5cGUgPj0gMSAmJlxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5faHRtbEJsb2NrVHlwZSA8PSA1ICYmXG4gICAgICAgICAgICAgICAgcmVIdG1sQmxvY2tDbG9zZVtjb250YWluZXIuX2h0bWxCbG9ja1R5cGVdLnRlc3QodGhpcy5jdXJyZW50TGluZS5zbGljZSh0aGlzLm9mZnNldCkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5hbGl6ZShjb250YWluZXIsIHRoaXMubGluZU51bWJlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9mZnNldCA8IGxuLmxlbmd0aCAmJiAhdGhpcy5ibGFuaykge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHBhcmFncmFwaCBjb250YWluZXIgZm9yIGxpbmVcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuYWRkQ2hpbGQoJ3BhcmFncmFwaCcsIHRoaXMub2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgdGhpcy5hZGRMaW5lKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sYXN0TGluZUxlbmd0aCA9IGxuLmxlbmd0aDtcbn07XG5cbi8vIEZpbmFsaXplIGEgYmxvY2suICBDbG9zZSBpdCBhbmQgZG8gYW55IG5lY2Vzc2FyeSBwb3N0cHJvY2Vzc2luZyxcbi8vIGUuZy4gY3JlYXRpbmcgc3RyaW5nX2NvbnRlbnQgZnJvbSBzdHJpbmdzLCBzZXR0aW5nIHRoZSAndGlnaHQnXG4vLyBvciAnbG9vc2UnIHN0YXR1cyBvZiBhIGxpc3QsIGFuZCBwYXJzaW5nIHRoZSBiZWdpbm5pbmdzXG4vLyBvZiBwYXJhZ3JhcGhzIGZvciByZWZlcmVuY2UgZGVmaW5pdGlvbnMuICBSZXNldCB0aGUgdGlwIHRvIHRoZVxuLy8gcGFyZW50IG9mIHRoZSBjbG9zZWQgYmxvY2suXG52YXIgZmluYWxpemUgPSBmdW5jdGlvbihibG9jaywgbGluZU51bWJlcikge1xuICAgIHZhciBhYm92ZSA9IGJsb2NrLl9wYXJlbnQ7XG4gICAgYmxvY2suX29wZW4gPSBmYWxzZTtcbiAgICBibG9jay5zb3VyY2Vwb3NbMV0gPSBbbGluZU51bWJlciwgdGhpcy5sYXN0TGluZUxlbmd0aF07XG5cbiAgICB0aGlzLmJsb2Nrc1tibG9jay50eXBlXS5maW5hbGl6ZSh0aGlzLCBibG9jayk7XG5cbiAgICB0aGlzLnRpcCA9IGFib3ZlO1xufTtcblxuLy8gV2FsayB0aHJvdWdoIGEgYmxvY2sgJiBjaGlsZHJlbiByZWN1cnNpdmVseSwgcGFyc2luZyBzdHJpbmcgY29udGVudFxuLy8gaW50byBpbmxpbmUgY29udGVudCB3aGVyZSBhcHByb3ByaWF0ZS5cbnZhciBwcm9jZXNzSW5saW5lcyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIG5vZGUsIGV2ZW50LCB0O1xuICAgIHZhciB3YWxrZXIgPSBibG9jay53YWxrZXIoKTtcbiAgICB0aGlzLmlubGluZVBhcnNlci5yZWZtYXAgPSB0aGlzLnJlZm1hcDtcbiAgICB0aGlzLmlubGluZVBhcnNlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHdoaWxlICgoZXZlbnQgPSB3YWxrZXIubmV4dCgpKSkge1xuICAgICAgICBub2RlID0gZXZlbnQubm9kZTtcbiAgICAgICAgdCA9IG5vZGUudHlwZTtcbiAgICAgICAgaWYgKCFldmVudC5lbnRlcmluZyAmJiAodCA9PT0gJ3BhcmFncmFwaCcgfHwgdCA9PT0gJ2hlYWRpbmcnKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVQYXJzZXIucGFyc2Uobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgRG9jdW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jID0gbmV3IE5vZGUoJ2RvY3VtZW50JywgW1sxLCAxXSwgWzAsIDBdXSk7XG4gICAgcmV0dXJuIGRvYztcbn07XG5cbi8vIFRoZSBtYWluIHBhcnNpbmcgZnVuY3Rpb24uICBSZXR1cm5zIGEgcGFyc2VkIGRvY3VtZW50IEFTVC5cbnZhciBwYXJzZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgdGhpcy5kb2MgPSBuZXcgRG9jdW1lbnQoKTtcbiAgICB0aGlzLnRpcCA9IHRoaXMuZG9jO1xuICAgIHRoaXMucmVmbWFwID0ge307XG4gICAgdGhpcy5saW5lTnVtYmVyID0gMDtcbiAgICB0aGlzLmxhc3RMaW5lTGVuZ3RoID0gMDtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgdGhpcy5jb2x1bW4gPSAwO1xuICAgIHRoaXMubGFzdE1hdGNoZWRDb250YWluZXIgPSB0aGlzLmRvYztcbiAgICB0aGlzLmN1cnJlbnRMaW5lID0gXCJcIjtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lKFwicHJlcGFyaW5nIGlucHV0XCIpOyB9XG4gICAgdmFyIGxpbmVzID0gaW5wdXQuc3BsaXQocmVMaW5lRW5kaW5nKTtcbiAgICB2YXIgbGVuID0gbGluZXMubGVuZ3RoO1xuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpID09PSBDX05FV0xJTkUpIHtcbiAgICAgICAgLy8gaWdub3JlIGxhc3QgYmxhbmsgbGluZSBjcmVhdGVkIGJ5IGZpbmFsIG5ld2xpbmVcbiAgICAgICAgbGVuIC09IDE7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWVFbmQoXCJwcmVwYXJpbmcgaW5wdXRcIik7IH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lKFwiYmxvY2sgcGFyc2luZ1wiKTsgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGhpcy5pbmNvcnBvcmF0ZUxpbmUobGluZXNbaV0pO1xuICAgIH1cbiAgICB3aGlsZSAodGhpcy50aXApIHtcbiAgICAgICAgdGhpcy5maW5hbGl6ZSh0aGlzLnRpcCwgbGVuKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZUVuZChcImJsb2NrIHBhcnNpbmdcIik7IH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lKFwiaW5saW5lIHBhcnNpbmdcIik7IH1cbiAgICB0aGlzLnByb2Nlc3NJbmxpbmVzKHRoaXMuZG9jKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lRW5kKFwiaW5saW5lIHBhcnNpbmdcIik7IH1cbiAgICByZXR1cm4gdGhpcy5kb2M7XG59O1xuXG5cbi8vIFRoZSBQYXJzZXIgb2JqZWN0LlxuZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGRvYzogbmV3IERvY3VtZW50KCksXG4gICAgICAgIGJsb2NrczogYmxvY2tzLFxuICAgICAgICBibG9ja1N0YXJ0czogYmxvY2tTdGFydHMsXG4gICAgICAgIHRpcDogdGhpcy5kb2MsXG4gICAgICAgIG9sZHRpcDogdGhpcy5kb2MsXG4gICAgICAgIGN1cnJlbnRMaW5lOiBcIlwiLFxuICAgICAgICBsaW5lTnVtYmVyOiAwLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGNvbHVtbjogMCxcbiAgICAgICAgbmV4dE5vbnNwYWNlOiAwLFxuICAgICAgICBuZXh0Tm9uc3BhY2VDb2x1bW46IDAsXG4gICAgICAgIGluZGVudDogMCxcbiAgICAgICAgaW5kZW50ZWQ6IGZhbHNlLFxuICAgICAgICBibGFuazogZmFsc2UsXG4gICAgICAgIHBhcnRpYWxseUNvbnN1bWVkVGFiOiBmYWxzZSxcbiAgICAgICAgYWxsQ2xvc2VkOiB0cnVlLFxuICAgICAgICBsYXN0TWF0Y2hlZENvbnRhaW5lcjogdGhpcy5kb2MsXG4gICAgICAgIHJlZm1hcDoge30sXG4gICAgICAgIGxhc3RMaW5lTGVuZ3RoOiAwLFxuICAgICAgICBpbmxpbmVQYXJzZXI6IG5ldyBJbmxpbmVQYXJzZXIob3B0aW9ucyksXG4gICAgICAgIGZpbmROZXh0Tm9uc3BhY2U6IGZpbmROZXh0Tm9uc3BhY2UsXG4gICAgICAgIGFkdmFuY2VPZmZzZXQ6IGFkdmFuY2VPZmZzZXQsXG4gICAgICAgIGFkdmFuY2VOZXh0Tm9uc3BhY2U6IGFkdmFuY2VOZXh0Tm9uc3BhY2UsXG4gICAgICAgIGFkZExpbmU6IGFkZExpbmUsXG4gICAgICAgIGFkZENoaWxkOiBhZGRDaGlsZCxcbiAgICAgICAgaW5jb3Jwb3JhdGVMaW5lOiBpbmNvcnBvcmF0ZUxpbmUsXG4gICAgICAgIGZpbmFsaXplOiBmaW5hbGl6ZSxcbiAgICAgICAgcHJvY2Vzc0lubGluZXM6IHByb2Nlc3NJbmxpbmVzLFxuICAgICAgICBjbG9zZVVubWF0Y2hlZEJsb2NrczogY2xvc2VVbm1hdGNoZWRCbG9ja3MsXG4gICAgICAgIHBhcnNlOiBwYXJzZSxcbiAgICAgICAgb3B0aW9uczogb3B0aW9ucyB8fCB7fVxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvYmxvY2tzLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbid1c2Ugc3RyaWN0JztcblxuXG52YXIgZW5jb2RlQ2FjaGUgPSB7fTtcblxuXG4vLyBDcmVhdGUgYSBsb29rdXAgYXJyYXkgd2hlcmUgYW55dGhpbmcgYnV0IGNoYXJhY3RlcnMgaW4gYGNoYXJzYCBzdHJpbmdcbi8vIGFuZCBhbHBoYW51bWVyaWMgY2hhcnMgaXMgcGVyY2VudC1lbmNvZGVkLlxuLy9cbmZ1bmN0aW9uIGdldEVuY29kZUNhY2hlKGV4Y2x1ZGUpIHtcbiAgdmFyIGksIGNoLCBjYWNoZSA9IGVuY29kZUNhY2hlW2V4Y2x1ZGVdO1xuICBpZiAoY2FjaGUpIHsgcmV0dXJuIGNhY2hlOyB9XG5cbiAgY2FjaGUgPSBlbmNvZGVDYWNoZVtleGNsdWRlXSA9IFtdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCAxMjg7IGkrKykge1xuICAgIGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcblxuICAgIGlmICgvXlswLTlhLXpdJC9pLnRlc3QoY2gpKSB7XG4gICAgICAvLyBhbHdheXMgYWxsb3cgdW5lbmNvZGVkIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzXG4gICAgICBjYWNoZS5wdXNoKGNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGUucHVzaCgnJScgKyAoJzAnICsgaS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSkuc2xpY2UoLTIpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhjbHVkZS5sZW5ndGg7IGkrKykge1xuICAgIGNhY2hlW2V4Y2x1ZGUuY2hhckNvZGVBdChpKV0gPSBleGNsdWRlW2ldO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlO1xufVxuXG5cbi8vIEVuY29kZSB1bnNhZmUgY2hhcmFjdGVycyB3aXRoIHBlcmNlbnQtZW5jb2RpbmcsIHNraXBwaW5nIGFscmVhZHlcbi8vIGVuY29kZWQgc2VxdWVuY2VzLlxuLy9cbi8vICAtIHN0cmluZyAgICAgICAtIHN0cmluZyB0byBlbmNvZGVcbi8vICAtIGV4Y2x1ZGUgICAgICAtIGxpc3Qgb2YgY2hhcmFjdGVycyB0byBpZ25vcmUgKGluIGFkZGl0aW9uIHRvIGEtekEtWjAtOSlcbi8vICAtIGtlZXBFc2NhcGVkICAtIGRvbid0IGVuY29kZSAnJScgaW4gYSBjb3JyZWN0IGVzY2FwZSBzZXF1ZW5jZSAoZGVmYXVsdDogdHJ1ZSlcbi8vXG5mdW5jdGlvbiBlbmNvZGUoc3RyaW5nLCBleGNsdWRlLCBrZWVwRXNjYXBlZCkge1xuICB2YXIgaSwgbCwgY29kZSwgbmV4dENvZGUsIGNhY2hlLFxuICAgICAgcmVzdWx0ID0gJyc7XG5cbiAgaWYgKHR5cGVvZiBleGNsdWRlICE9PSAnc3RyaW5nJykge1xuICAgIC8vIGVuY29kZShzdHJpbmcsIGtlZXBFc2NhcGVkKVxuICAgIGtlZXBFc2NhcGVkICA9IGV4Y2x1ZGU7XG4gICAgZXhjbHVkZSA9IGVuY29kZS5kZWZhdWx0Q2hhcnM7XG4gIH1cblxuICBpZiAodHlwZW9mIGtlZXBFc2NhcGVkID09PSAndW5kZWZpbmVkJykge1xuICAgIGtlZXBFc2NhcGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGNhY2hlID0gZ2V0RW5jb2RlQ2FjaGUoZXhjbHVkZSk7XG5cbiAgZm9yIChpID0gMCwgbCA9IHN0cmluZy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb2RlID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICBpZiAoa2VlcEVzY2FwZWQgJiYgY29kZSA9PT0gMHgyNSAvKiAlICovICYmIGkgKyAyIDwgbCkge1xuICAgICAgaWYgKC9eWzAtOWEtZl17Mn0kL2kudGVzdChzdHJpbmcuc2xpY2UoaSArIDEsIGkgKyAzKSkpIHtcbiAgICAgICAgcmVzdWx0ICs9IHN0cmluZy5zbGljZShpLCBpICsgMyk7XG4gICAgICAgIGkgKz0gMjtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPCAxMjgpIHtcbiAgICAgIHJlc3VsdCArPSBjYWNoZVtjb2RlXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjb2RlID49IDB4RDgwMCAmJiBjb2RlIDw9IDB4REZGRikge1xuICAgICAgaWYgKGNvZGUgPj0gMHhEODAwICYmIGNvZGUgPD0gMHhEQkZGICYmIGkgKyAxIDwgbCkge1xuICAgICAgICBuZXh0Q29kZSA9IHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgaWYgKG5leHRDb2RlID49IDB4REMwMCAmJiBuZXh0Q29kZSA8PSAweERGRkYpIHtcbiAgICAgICAgICByZXN1bHQgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ1tpXSArIHN0cmluZ1tpICsgMV0pO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0ICs9ICclRUYlQkYlQkQnO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzdWx0ICs9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdbaV0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZW5jb2RlLmRlZmF1bHRDaGFycyAgID0gXCI7Lz86QCY9KyQsLV8uIX4qJygpI1wiO1xuZW5jb2RlLmNvbXBvbmVudENoYXJzID0gXCItXy4hfionKClcIjtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21kdXJsL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4ndXNlIHN0cmljdCc7XG5cblxuLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXG52YXIgZGVjb2RlQ2FjaGUgPSB7fTtcblxuZnVuY3Rpb24gZ2V0RGVjb2RlQ2FjaGUoZXhjbHVkZSkge1xuICB2YXIgaSwgY2gsIGNhY2hlID0gZGVjb2RlQ2FjaGVbZXhjbHVkZV07XG4gIGlmIChjYWNoZSkgeyByZXR1cm4gY2FjaGU7IH1cblxuICBjYWNoZSA9IGRlY29kZUNhY2hlW2V4Y2x1ZGVdID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IDEyODsgaSsrKSB7XG4gICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuICAgIGNhY2hlLnB1c2goY2gpO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4Y2x1ZGUubGVuZ3RoOyBpKyspIHtcbiAgICBjaCA9IGV4Y2x1ZGUuY2hhckNvZGVBdChpKTtcbiAgICBjYWNoZVtjaF0gPSAnJScgKyAoJzAnICsgY2gudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkpLnNsaWNlKC0yKTtcbiAgfVxuXG4gIHJldHVybiBjYWNoZTtcbn1cblxuXG4vLyBEZWNvZGUgcGVyY2VudC1lbmNvZGVkIHN0cmluZy5cbi8vXG5mdW5jdGlvbiBkZWNvZGUoc3RyaW5nLCBleGNsdWRlKSB7XG4gIHZhciBjYWNoZTtcblxuICBpZiAodHlwZW9mIGV4Y2x1ZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgZXhjbHVkZSA9IGRlY29kZS5kZWZhdWx0Q2hhcnM7XG4gIH1cblxuICBjYWNoZSA9IGdldERlY29kZUNhY2hlKGV4Y2x1ZGUpO1xuXG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKCVbYS1mMC05XXsyfSkrL2dpLCBmdW5jdGlvbihzZXEpIHtcbiAgICB2YXIgaSwgbCwgYjEsIGIyLCBiMywgYjQsIGNocixcbiAgICAgICAgcmVzdWx0ID0gJyc7XG5cbiAgICBmb3IgKGkgPSAwLCBsID0gc2VxLmxlbmd0aDsgaSA8IGw7IGkgKz0gMykge1xuICAgICAgYjEgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDEsIGkgKyAzKSwgMTYpO1xuXG4gICAgICBpZiAoYjEgPCAweDgwKSB7XG4gICAgICAgIHJlc3VsdCArPSBjYWNoZVtiMV07XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGIxICYgMHhFMCkgPT09IDB4QzAgJiYgKGkgKyAzIDwgbCkpIHtcbiAgICAgICAgLy8gMTEweHh4eHggMTB4eHh4eHhcbiAgICAgICAgYjIgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDQsIGkgKyA2KSwgMTYpO1xuXG4gICAgICAgIGlmICgoYjIgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgIGNociA9ICgoYjEgPDwgNikgJiAweDdDMCkgfCAoYjIgJiAweDNGKTtcblxuICAgICAgICAgIGlmIChjaHIgPCAweDgwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcdWZmZmRcXHVmZmZkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKChiMSAmIDB4RjApID09PSAweEUwICYmIChpICsgNiA8IGwpKSB7XG4gICAgICAgIC8vIDExMTB4eHh4IDEweHh4eHh4IDEweHh4eHh4XG4gICAgICAgIGIyID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA0LCBpICsgNiksIDE2KTtcbiAgICAgICAgYjMgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDcsIGkgKyA5KSwgMTYpO1xuXG4gICAgICAgIGlmICgoYjIgJiAweEMwKSA9PT0gMHg4MCAmJiAoYjMgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgIGNociA9ICgoYjEgPDwgMTIpICYgMHhGMDAwKSB8ICgoYjIgPDwgNikgJiAweEZDMCkgfCAoYjMgJiAweDNGKTtcblxuICAgICAgICAgIGlmIChjaHIgPCAweDgwMCB8fCAoY2hyID49IDB4RDgwMCAmJiBjaHIgPD0gMHhERkZGKSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICdcXHVmZmZkXFx1ZmZmZFxcdWZmZmQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGkgKz0gNjtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKGIxICYgMHhGOCkgPT09IDB4RjAgJiYgKGkgKyA5IDwgbCkpIHtcbiAgICAgICAgLy8gMTExMTEweHggMTB4eHh4eHggMTB4eHh4eHggMTB4eHh4eHhcbiAgICAgICAgYjIgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDQsIGkgKyA2KSwgMTYpO1xuICAgICAgICBiMyA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNywgaSArIDkpLCAxNik7XG4gICAgICAgIGI0ID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyAxMCwgaSArIDEyKSwgMTYpO1xuXG4gICAgICAgIGlmICgoYjIgJiAweEMwKSA9PT0gMHg4MCAmJiAoYjMgJiAweEMwKSA9PT0gMHg4MCAmJiAoYjQgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgIGNociA9ICgoYjEgPDwgMTgpICYgMHgxQzAwMDApIHwgKChiMiA8PCAxMikgJiAweDNGMDAwKSB8ICgoYjMgPDwgNikgJiAweEZDMCkgfCAoYjQgJiAweDNGKTtcblxuICAgICAgICAgIGlmIChjaHIgPCAweDEwMDAwIHx8IGNociA+IDB4MTBGRkZGKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcdWZmZmRcXHVmZmZkXFx1ZmZmZFxcdWZmZmQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaHIgLT0gMHgxMDAwMDtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RDgwMCArIChjaHIgPj4gMTApLCAweERDMDAgKyAoY2hyICYgMHgzRkYpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpICs9IDk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVzdWx0ICs9ICdcXHVmZmZkJztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbn1cblxuXG5kZWNvZGUuZGVmYXVsdENoYXJzICAgPSAnOy8/OkAmPSskLCMnO1xuZGVjb2RlLmNvbXBvbmVudENoYXJzID0gJyc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkZWNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tZHVybC9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpbnZlcnNlWE1MID0gZ2V0SW52ZXJzZU9iaihyZXF1aXJlKFwiLi4vbWFwcy94bWwuanNvblwiKSksXG4gICAgeG1sUmVwbGFjZXIgPSBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZVhNTCk7XG5cbmV4cG9ydHMuWE1MID0gZ2V0SW52ZXJzZShpbnZlcnNlWE1MLCB4bWxSZXBsYWNlcik7XG5cbnZhciBpbnZlcnNlSFRNTCA9IGdldEludmVyc2VPYmoocmVxdWlyZShcIi4uL21hcHMvZW50aXRpZXMuanNvblwiKSksXG4gICAgaHRtbFJlcGxhY2VyID0gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2VIVE1MKTtcblxuZXhwb3J0cy5IVE1MID0gZ2V0SW52ZXJzZShpbnZlcnNlSFRNTCwgaHRtbFJlcGxhY2VyKTtcblxuZnVuY3Rpb24gZ2V0SW52ZXJzZU9iaihvYmope1xuXHRyZXR1cm4gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkucmVkdWNlKGZ1bmN0aW9uKGludmVyc2UsIG5hbWUpe1xuXHRcdGludmVyc2Vbb2JqW25hbWVdXSA9IFwiJlwiICsgbmFtZSArIFwiO1wiO1xuXHRcdHJldHVybiBpbnZlcnNlO1xuXHR9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlKXtcblx0dmFyIHNpbmdsZSA9IFtdLFxuXHQgICAgbXVsdGlwbGUgPSBbXTtcblxuXHRPYmplY3Qua2V5cyhpbnZlcnNlKS5mb3JFYWNoKGZ1bmN0aW9uKGspe1xuXHRcdGlmKGsubGVuZ3RoID09PSAxKXtcblx0XHRcdHNpbmdsZS5wdXNoKFwiXFxcXFwiICsgayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG11bHRpcGxlLnB1c2goayk7XG5cdFx0fVxuXHR9KTtcblxuXHQvL1RPRE8gYWRkIHJhbmdlc1xuXHRtdWx0aXBsZS51bnNoaWZ0KFwiW1wiICsgc2luZ2xlLmpvaW4oXCJcIikgKyBcIl1cIik7XG5cblx0cmV0dXJuIG5ldyBSZWdFeHAobXVsdGlwbGUuam9pbihcInxcIiksIFwiZ1wiKTtcbn1cblxudmFyIHJlX25vbkFTQ0lJID0gL1teXFwwLVxceDdGXS9nLFxuICAgIHJlX2FzdHJhbFN5bWJvbHMgPSAvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nO1xuXG5mdW5jdGlvbiBzaW5nbGVDaGFyUmVwbGFjZXIoYyl7XG5cdHJldHVybiBcIiYjeFwiICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCI7XCI7XG59XG5cbmZ1bmN0aW9uIGFzdHJhbFJlcGxhY2VyKGMpe1xuXHQvLyBodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuXHR2YXIgaGlnaCA9IGMuY2hhckNvZGVBdCgwKTtcblx0dmFyIGxvdyAgPSBjLmNoYXJDb2RlQXQoMSk7XG5cdHZhciBjb2RlUG9pbnQgPSAoaGlnaCAtIDB4RDgwMCkgKiAweDQwMCArIGxvdyAtIDB4REMwMCArIDB4MTAwMDA7XG5cdHJldHVybiBcIiYjeFwiICsgY29kZVBvaW50LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCI7XCI7XG59XG5cbmZ1bmN0aW9uIGdldEludmVyc2UoaW52ZXJzZSwgcmUpe1xuXHRmdW5jdGlvbiBmdW5jKG5hbWUpe1xuXHRcdHJldHVybiBpbnZlcnNlW25hbWVdO1xuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpe1xuXHRcdHJldHVybiBkYXRhXG5cdFx0XHRcdC5yZXBsYWNlKHJlLCBmdW5jKVxuXHRcdFx0XHQucmVwbGFjZShyZV9hc3RyYWxTeW1ib2xzLCBhc3RyYWxSZXBsYWNlcilcblx0XHRcdFx0LnJlcGxhY2UocmVfbm9uQVNDSUksIHNpbmdsZUNoYXJSZXBsYWNlcik7XG5cdH07XG59XG5cbnZhciByZV94bWxDaGFycyA9IGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlWE1MKTtcblxuZnVuY3Rpb24gZXNjYXBlWE1MKGRhdGEpe1xuXHRyZXR1cm4gZGF0YVxuXHRcdFx0LnJlcGxhY2UocmVfeG1sQ2hhcnMsIHNpbmdsZUNoYXJSZXBsYWNlcilcblx0XHRcdC5yZXBsYWNlKHJlX2FzdHJhbFN5bWJvbHMsIGFzdHJhbFJlcGxhY2VyKVxuXHRcdFx0LnJlcGxhY2UocmVfbm9uQVNDSUksIHNpbmdsZUNoYXJSZXBsYWNlcik7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gZXNjYXBlWE1MO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbGliL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGVudGl0eU1hcCA9IHJlcXVpcmUoXCIuLi9tYXBzL2VudGl0aWVzLmpzb25cIiksXG4gICAgbGVnYWN5TWFwID0gcmVxdWlyZShcIi4uL21hcHMvbGVnYWN5Lmpzb25cIiksXG4gICAgeG1sTWFwICAgID0gcmVxdWlyZShcIi4uL21hcHMveG1sLmpzb25cIiksXG4gICAgZGVjb2RlQ29kZVBvaW50ID0gcmVxdWlyZShcIi4vZGVjb2RlX2NvZGVwb2ludC5qc1wiKTtcblxudmFyIGRlY29kZVhNTFN0cmljdCAgPSBnZXRTdHJpY3REZWNvZGVyKHhtbE1hcCksXG4gICAgZGVjb2RlSFRNTFN0cmljdCA9IGdldFN0cmljdERlY29kZXIoZW50aXR5TWFwKTtcblxuZnVuY3Rpb24gZ2V0U3RyaWN0RGVjb2RlcihtYXApe1xuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKG1hcCkuam9pbihcInxcIiksXG5cdCAgICByZXBsYWNlID0gZ2V0UmVwbGFjZXIobWFwKTtcblxuXHRrZXlzICs9IFwifCNbeFhdW1xcXFxkYS1mQS1GXSt8I1xcXFxkK1wiO1xuXG5cdHZhciByZSA9IG5ldyBSZWdFeHAoXCImKD86XCIgKyBrZXlzICsgXCIpO1wiLCBcImdcIik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHN0cil7XG5cdFx0cmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UocmUsIHJlcGxhY2UpO1xuXHR9O1xufVxuXG52YXIgZGVjb2RlSFRNTCA9IChmdW5jdGlvbigpe1xuXHR2YXIgbGVnYWN5ID0gT2JqZWN0LmtleXMobGVnYWN5TWFwKVxuXHRcdC5zb3J0KHNvcnRlcik7XG5cblx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhlbnRpdHlNYXApXG5cdFx0LnNvcnQoc29ydGVyKTtcblxuXHRmb3IodmFyIGkgPSAwLCBqID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xuXHRcdGlmKGxlZ2FjeVtqXSA9PT0ga2V5c1tpXSl7XG5cdFx0XHRrZXlzW2ldICs9IFwiOz9cIjtcblx0XHRcdGorKztcblx0XHR9IGVsc2Uge1xuXHRcdFx0a2V5c1tpXSArPSBcIjtcIjtcblx0XHR9XG5cdH1cblxuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKFwiJig/OlwiICsga2V5cy5qb2luKFwifFwiKSArIFwifCNbeFhdW1xcXFxkYS1mQS1GXSs7P3wjXFxcXGQrOz8pXCIsIFwiZ1wiKSxcblx0ICAgIHJlcGxhY2UgPSBnZXRSZXBsYWNlcihlbnRpdHlNYXApO1xuXG5cdGZ1bmN0aW9uIHJlcGxhY2VyKHN0cil7XG5cdFx0aWYoc3RyLnN1YnN0cigtMSkgIT09IFwiO1wiKSBzdHIgKz0gXCI7XCI7XG5cdFx0cmV0dXJuIHJlcGxhY2Uoc3RyKTtcblx0fVxuXG5cdC8vVE9ETyBjb25zaWRlciBjcmVhdGluZyBhIG1lcmdlZCBtYXBcblx0cmV0dXJuIGZ1bmN0aW9uKHN0cil7XG5cdFx0cmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UocmUsIHJlcGxhY2VyKTtcblx0fTtcbn0oKSk7XG5cbmZ1bmN0aW9uIHNvcnRlcihhLCBiKXtcblx0cmV0dXJuIGEgPCBiID8gMSA6IC0xO1xufVxuXG5mdW5jdGlvbiBnZXRSZXBsYWNlcihtYXApe1xuXHRyZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShzdHIpe1xuXHRcdGlmKHN0ci5jaGFyQXQoMSkgPT09IFwiI1wiKXtcblx0XHRcdGlmKHN0ci5jaGFyQXQoMikgPT09IFwiWFwiIHx8IHN0ci5jaGFyQXQoMikgPT09IFwieFwiKXtcblx0XHRcdFx0cmV0dXJuIGRlY29kZUNvZGVQb2ludChwYXJzZUludChzdHIuc3Vic3RyKDMpLCAxNikpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRlY29kZUNvZGVQb2ludChwYXJzZUludChzdHIuc3Vic3RyKDIpLCAxMCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gbWFwW3N0ci5zbGljZSgxLCAtMSldO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0WE1MOiBkZWNvZGVYTUxTdHJpY3QsXG5cdEhUTUw6IGRlY29kZUhUTUwsXG5cdEhUTUxTdHJpY3Q6IGRlY29kZUhUTUxTdHJpY3Rcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbGliL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJBYWN1dGVcIjpcIsOBXCIsXCJhYWN1dGVcIjpcIsOhXCIsXCJBY2lyY1wiOlwiw4JcIixcImFjaXJjXCI6XCLDolwiLFwiYWN1dGVcIjpcIsK0XCIsXCJBRWxpZ1wiOlwiw4ZcIixcImFlbGlnXCI6XCLDplwiLFwiQWdyYXZlXCI6XCLDgFwiLFwiYWdyYXZlXCI6XCLDoFwiLFwiYW1wXCI6XCImXCIsXCJBTVBcIjpcIiZcIixcIkFyaW5nXCI6XCLDhVwiLFwiYXJpbmdcIjpcIsOlXCIsXCJBdGlsZGVcIjpcIsODXCIsXCJhdGlsZGVcIjpcIsOjXCIsXCJBdW1sXCI6XCLDhFwiLFwiYXVtbFwiOlwiw6RcIixcImJydmJhclwiOlwiwqZcIixcIkNjZWRpbFwiOlwiw4dcIixcImNjZWRpbFwiOlwiw6dcIixcImNlZGlsXCI6XCLCuFwiLFwiY2VudFwiOlwiwqJcIixcImNvcHlcIjpcIsKpXCIsXCJDT1BZXCI6XCLCqVwiLFwiY3VycmVuXCI6XCLCpFwiLFwiZGVnXCI6XCLCsFwiLFwiZGl2aWRlXCI6XCLDt1wiLFwiRWFjdXRlXCI6XCLDiVwiLFwiZWFjdXRlXCI6XCLDqVwiLFwiRWNpcmNcIjpcIsOKXCIsXCJlY2lyY1wiOlwiw6pcIixcIkVncmF2ZVwiOlwiw4hcIixcImVncmF2ZVwiOlwiw6hcIixcIkVUSFwiOlwiw5BcIixcImV0aFwiOlwiw7BcIixcIkV1bWxcIjpcIsOLXCIsXCJldW1sXCI6XCLDq1wiLFwiZnJhYzEyXCI6XCLCvVwiLFwiZnJhYzE0XCI6XCLCvFwiLFwiZnJhYzM0XCI6XCLCvlwiLFwiZ3RcIjpcIj5cIixcIkdUXCI6XCI+XCIsXCJJYWN1dGVcIjpcIsONXCIsXCJpYWN1dGVcIjpcIsOtXCIsXCJJY2lyY1wiOlwiw45cIixcImljaXJjXCI6XCLDrlwiLFwiaWV4Y2xcIjpcIsKhXCIsXCJJZ3JhdmVcIjpcIsOMXCIsXCJpZ3JhdmVcIjpcIsOsXCIsXCJpcXVlc3RcIjpcIsK/XCIsXCJJdW1sXCI6XCLDj1wiLFwiaXVtbFwiOlwiw69cIixcImxhcXVvXCI6XCLCq1wiLFwibHRcIjpcIjxcIixcIkxUXCI6XCI8XCIsXCJtYWNyXCI6XCLCr1wiLFwibWljcm9cIjpcIsK1XCIsXCJtaWRkb3RcIjpcIsK3XCIsXCJuYnNwXCI6XCLCoFwiLFwibm90XCI6XCLCrFwiLFwiTnRpbGRlXCI6XCLDkVwiLFwibnRpbGRlXCI6XCLDsVwiLFwiT2FjdXRlXCI6XCLDk1wiLFwib2FjdXRlXCI6XCLDs1wiLFwiT2NpcmNcIjpcIsOUXCIsXCJvY2lyY1wiOlwiw7RcIixcIk9ncmF2ZVwiOlwiw5JcIixcIm9ncmF2ZVwiOlwiw7JcIixcIm9yZGZcIjpcIsKqXCIsXCJvcmRtXCI6XCLCulwiLFwiT3NsYXNoXCI6XCLDmFwiLFwib3NsYXNoXCI6XCLDuFwiLFwiT3RpbGRlXCI6XCLDlVwiLFwib3RpbGRlXCI6XCLDtVwiLFwiT3VtbFwiOlwiw5ZcIixcIm91bWxcIjpcIsO2XCIsXCJwYXJhXCI6XCLCtlwiLFwicGx1c21uXCI6XCLCsVwiLFwicG91bmRcIjpcIsKjXCIsXCJxdW90XCI6XCJcXFwiXCIsXCJRVU9UXCI6XCJcXFwiXCIsXCJyYXF1b1wiOlwiwrtcIixcInJlZ1wiOlwiwq5cIixcIlJFR1wiOlwiwq5cIixcInNlY3RcIjpcIsKnXCIsXCJzaHlcIjpcIsKtXCIsXCJzdXAxXCI6XCLCuVwiLFwic3VwMlwiOlwiwrJcIixcInN1cDNcIjpcIsKzXCIsXCJzemxpZ1wiOlwiw59cIixcIlRIT1JOXCI6XCLDnlwiLFwidGhvcm5cIjpcIsO+XCIsXCJ0aW1lc1wiOlwiw5dcIixcIlVhY3V0ZVwiOlwiw5pcIixcInVhY3V0ZVwiOlwiw7pcIixcIlVjaXJjXCI6XCLDm1wiLFwidWNpcmNcIjpcIsO7XCIsXCJVZ3JhdmVcIjpcIsOZXCIsXCJ1Z3JhdmVcIjpcIsO5XCIsXCJ1bWxcIjpcIsKoXCIsXCJVdW1sXCI6XCLDnFwiLFwidXVtbFwiOlwiw7xcIixcIllhY3V0ZVwiOlwiw51cIixcInlhY3V0ZVwiOlwiw71cIixcInllblwiOlwiwqVcIixcInl1bWxcIjpcIsO/XCJ9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9sZWdhY3kuanNvblxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRlY29kZU1hcCA9IHJlcXVpcmUoXCIuLi9tYXBzL2RlY29kZS5qc29uXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZUNvZGVQb2ludDtcblxuLy8gbW9kaWZpZWQgdmVyc2lvbiBvZiBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9oZS9ibG9iL21hc3Rlci9zcmMvaGUuanMjTDk0LUwxMTlcbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludChjb2RlUG9pbnQpe1xuXG5cdGlmKChjb2RlUG9pbnQgPj0gMHhEODAwICYmIGNvZGVQb2ludCA8PSAweERGRkYpIHx8IGNvZGVQb2ludCA+IDB4MTBGRkZGKXtcblx0XHRyZXR1cm4gXCJcXHVGRkZEXCI7XG5cdH1cblxuXHRpZihjb2RlUG9pbnQgaW4gZGVjb2RlTWFwKXtcblx0XHRjb2RlUG9pbnQgPSBkZWNvZGVNYXBbY29kZVBvaW50XTtcblx0fVxuXG5cdHZhciBvdXRwdXQgPSBcIlwiO1xuXG5cdGlmKGNvZGVQb2ludCA+IDB4RkZGRil7XG5cdFx0Y29kZVBvaW50IC09IDB4MTAwMDA7XG5cdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRjtcblx0fVxuXG5cdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7XG5cdHJldHVybiBvdXRwdXQ7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlX2NvZGVwb2ludC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCIwXCI6NjU1MzMsXCIxMjhcIjo4MzY0LFwiMTMwXCI6ODIxOCxcIjEzMVwiOjQwMixcIjEzMlwiOjgyMjIsXCIxMzNcIjo4MjMwLFwiMTM0XCI6ODIyNCxcIjEzNVwiOjgyMjUsXCIxMzZcIjo3MTAsXCIxMzdcIjo4MjQwLFwiMTM4XCI6MzUyLFwiMTM5XCI6ODI0OSxcIjE0MFwiOjMzOCxcIjE0MlwiOjM4MSxcIjE0NVwiOjgyMTYsXCIxNDZcIjo4MjE3LFwiMTQ3XCI6ODIyMCxcIjE0OFwiOjgyMjEsXCIxNDlcIjo4MjI2LFwiMTUwXCI6ODIxMSxcIjE1MVwiOjgyMTIsXCIxNTJcIjo3MzIsXCIxNTNcIjo4NDgyLFwiMTU0XCI6MzUzLFwiMTU1XCI6ODI1MCxcIjE1NlwiOjMzOSxcIjE1OFwiOjM4MixcIjE1OVwiOjM3Nn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2RlY29kZS5qc29uXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIG5vcm1hbGl6ZVJlZmVyZW5jZSA9IHJlcXVpcmUoJy4vbm9ybWFsaXplLXJlZmVyZW5jZScpO1xuXG52YXIgbm9ybWFsaXplVVJJID0gY29tbW9uLm5vcm1hbGl6ZVVSSTtcbnZhciB1bmVzY2FwZVN0cmluZyA9IGNvbW1vbi51bmVzY2FwZVN0cmluZztcbnZhciBmcm9tQ29kZVBvaW50ID0gcmVxdWlyZSgnLi9mcm9tLWNvZGUtcG9pbnQuanMnKTtcbnZhciBkZWNvZGVIVE1MID0gcmVxdWlyZSgnZW50aXRpZXMnKS5kZWNvZGVIVE1MO1xucmVxdWlyZSgnc3RyaW5nLnByb3RvdHlwZS5yZXBlYXQnKTsgLy8gUG9seWZpbGwgZm9yIFN0cmluZy5wcm90b3R5cGUucmVwZWF0XG5cbi8vIENvbnN0YW50cyBmb3IgY2hhcmFjdGVyIGNvZGVzOlxuXG52YXIgQ19ORVdMSU5FID0gMTA7XG52YXIgQ19BU1RFUklTSyA9IDQyO1xudmFyIENfVU5ERVJTQ09SRSA9IDk1O1xudmFyIENfQkFDS1RJQ0sgPSA5NjtcbnZhciBDX09QRU5fQlJBQ0tFVCA9IDkxO1xudmFyIENfQ0xPU0VfQlJBQ0tFVCA9IDkzO1xudmFyIENfTEVTU1RIQU4gPSA2MDtcbnZhciBDX0JBTkcgPSAzMztcbnZhciBDX0JBQ0tTTEFTSCA9IDkyO1xudmFyIENfQU1QRVJTQU5EID0gMzg7XG52YXIgQ19PUEVOX1BBUkVOID0gNDA7XG52YXIgQ19DTE9TRV9QQVJFTiA9IDQxO1xudmFyIENfQ09MT04gPSA1ODtcbnZhciBDX1NJTkdMRVFVT1RFID0gMzk7XG52YXIgQ19ET1VCTEVRVU9URSA9IDM0O1xuXG4vLyBTb21lIHJlZ2V4cHMgdXNlZCBpbiBpbmxpbmUgcGFyc2VyOlxuXG52YXIgRVNDQVBBQkxFID0gY29tbW9uLkVTQ0FQQUJMRTtcbnZhciBFU0NBUEVEX0NIQVIgPSAnXFxcXFxcXFwnICsgRVNDQVBBQkxFO1xuXG52YXIgRU5USVRZID0gY29tbW9uLkVOVElUWTtcbnZhciByZUh0bWxUYWcgPSBjb21tb24ucmVIdG1sVGFnO1xuXG52YXIgcmVQdW5jdHVhdGlvbiA9IG5ldyBSZWdFeHAoL1shXCIjJCUmJygpKissXFwtLi86Ozw9Pj9AXFxbXFxdXl9ge3x9flxceEExXFx4QTdcXHhBQlxceEI2XFx4QjdcXHhCQlxceEJGXFx1MDM3RVxcdTAzODdcXHUwNTVBLVxcdTA1NUZcXHUwNTg5XFx1MDU4QVxcdTA1QkVcXHUwNUMwXFx1MDVDM1xcdTA1QzZcXHUwNUYzXFx1MDVGNFxcdTA2MDlcXHUwNjBBXFx1MDYwQ1xcdTA2MERcXHUwNjFCXFx1MDYxRVxcdTA2MUZcXHUwNjZBLVxcdTA2NkRcXHUwNkQ0XFx1MDcwMC1cXHUwNzBEXFx1MDdGNy1cXHUwN0Y5XFx1MDgzMC1cXHUwODNFXFx1MDg1RVxcdTA5NjRcXHUwOTY1XFx1MDk3MFxcdTBBRjBcXHUwREY0XFx1MEU0RlxcdTBFNUFcXHUwRTVCXFx1MEYwNC1cXHUwRjEyXFx1MEYxNFxcdTBGM0EtXFx1MEYzRFxcdTBGODVcXHUwRkQwLVxcdTBGRDRcXHUwRkQ5XFx1MEZEQVxcdTEwNEEtXFx1MTA0RlxcdTEwRkJcXHUxMzYwLVxcdTEzNjhcXHUxNDAwXFx1MTY2RFxcdTE2NkVcXHUxNjlCXFx1MTY5Q1xcdTE2RUItXFx1MTZFRFxcdTE3MzVcXHUxNzM2XFx1MTdENC1cXHUxN0Q2XFx1MTdEOC1cXHUxN0RBXFx1MTgwMC1cXHUxODBBXFx1MTk0NFxcdTE5NDVcXHUxQTFFXFx1MUExRlxcdTFBQTAtXFx1MUFBNlxcdTFBQTgtXFx1MUFBRFxcdTFCNUEtXFx1MUI2MFxcdTFCRkMtXFx1MUJGRlxcdTFDM0ItXFx1MUMzRlxcdTFDN0VcXHUxQzdGXFx1MUNDMC1cXHUxQ0M3XFx1MUNEM1xcdTIwMTAtXFx1MjAyN1xcdTIwMzAtXFx1MjA0M1xcdTIwNDUtXFx1MjA1MVxcdTIwNTMtXFx1MjA1RVxcdTIwN0RcXHUyMDdFXFx1MjA4RFxcdTIwOEVcXHUyMzA4LVxcdTIzMEJcXHUyMzI5XFx1MjMyQVxcdTI3NjgtXFx1Mjc3NVxcdTI3QzVcXHUyN0M2XFx1MjdFNi1cXHUyN0VGXFx1Mjk4My1cXHUyOTk4XFx1MjlEOC1cXHUyOURCXFx1MjlGQ1xcdTI5RkRcXHUyQ0Y5LVxcdTJDRkNcXHUyQ0ZFXFx1MkNGRlxcdTJENzBcXHUyRTAwLVxcdTJFMkVcXHUyRTMwLVxcdTJFNDJcXHUzMDAxLVxcdTMwMDNcXHUzMDA4LVxcdTMwMTFcXHUzMDE0LVxcdTMwMUZcXHUzMDMwXFx1MzAzRFxcdTMwQTBcXHUzMEZCXFx1QTRGRVxcdUE0RkZcXHVBNjBELVxcdUE2MEZcXHVBNjczXFx1QTY3RVxcdUE2RjItXFx1QTZGN1xcdUE4NzQtXFx1QTg3N1xcdUE4Q0VcXHVBOENGXFx1QThGOC1cXHVBOEZBXFx1QThGQ1xcdUE5MkVcXHVBOTJGXFx1QTk1RlxcdUE5QzEtXFx1QTlDRFxcdUE5REVcXHVBOURGXFx1QUE1Qy1cXHVBQTVGXFx1QUFERVxcdUFBREZcXHVBQUYwXFx1QUFGMVxcdUFCRUJcXHVGRDNFXFx1RkQzRlxcdUZFMTAtXFx1RkUxOVxcdUZFMzAtXFx1RkU1MlxcdUZFNTQtXFx1RkU2MVxcdUZFNjNcXHVGRTY4XFx1RkU2QVxcdUZFNkJcXHVGRjAxLVxcdUZGMDNcXHVGRjA1LVxcdUZGMEFcXHVGRjBDLVxcdUZGMEZcXHVGRjFBXFx1RkYxQlxcdUZGMUZcXHVGRjIwXFx1RkYzQi1cXHVGRjNEXFx1RkYzRlxcdUZGNUJcXHVGRjVEXFx1RkY1Ri1cXHVGRjY1XXxcXHVEODAwW1xcdUREMDAtXFx1REQwMlxcdURGOUZcXHVERkQwXXxcXHVEODAxXFx1REQ2RnxcXHVEODAyW1xcdURDNTdcXHVERDFGXFx1REQzRlxcdURFNTAtXFx1REU1OFxcdURFN0ZcXHVERUYwLVxcdURFRjZcXHVERjM5LVxcdURGM0ZcXHVERjk5LVxcdURGOUNdfFxcdUQ4MDRbXFx1REM0Ny1cXHVEQzREXFx1RENCQlxcdURDQkNcXHVEQ0JFLVxcdURDQzFcXHVERDQwLVxcdURENDNcXHVERDc0XFx1REQ3NVxcdUREQzUtXFx1RERDOVxcdUREQ0RcXHVERERCXFx1RERERC1cXHVERERGXFx1REUzOC1cXHVERTNEXFx1REVBOV18XFx1RDgwNVtcXHVEQ0M2XFx1RERDMS1cXHVEREQ3XFx1REU0MS1cXHVERTQzXFx1REYzQy1cXHVERjNFXXxcXHVEODA5W1xcdURDNzAtXFx1REM3NF18XFx1RDgxQVtcXHVERTZFXFx1REU2RlxcdURFRjVcXHVERjM3LVxcdURGM0JcXHVERjQ0XXxcXHVEODJGXFx1REM5RnxcXHVEODM2W1xcdURFODctXFx1REU4Ql0vKTtcblxudmFyIHJlTGlua1RpdGxlID0gbmV3IFJlZ0V4cChcbiAgICAnXig/OlwiKCcgKyBFU0NBUEVEX0NIQVIgKyAnfFteXCJcXFxceDAwXSkqXCInICtcbiAgICAgICAgJ3wnICtcbiAgICAgICAgJ1xcJygnICsgRVNDQVBFRF9DSEFSICsgJ3xbXlxcJ1xcXFx4MDBdKSpcXCcnICtcbiAgICAgICAgJ3wnICtcbiAgICAgICAgJ1xcXFwoKCcgKyBFU0NBUEVEX0NIQVIgKyAnfFteKVxcXFx4MDBdKSpcXFxcKSknKTtcblxudmFyIHJlTGlua0Rlc3RpbmF0aW9uQnJhY2VzID0gbmV3IFJlZ0V4cChcbiAgICAnXig/Ols8XSg/OlteIDw+XFxcXHRcXFxcblxcXFxcXFxcXFxcXHgwMF0nICsgJ3wnICsgRVNDQVBFRF9DSEFSICsgJ3wnICsgJ1xcXFxcXFxcKSpbPl0pJyk7XG5cbnZhciByZUVzY2FwYWJsZSA9IG5ldyBSZWdFeHAoJ14nICsgRVNDQVBBQkxFKTtcblxudmFyIHJlRW50aXR5SGVyZSA9IG5ldyBSZWdFeHAoJ14nICsgRU5USVRZLCAnaScpO1xuXG52YXIgcmVUaWNrcyA9IC9gKy87XG5cbnZhciByZVRpY2tzSGVyZSA9IC9eYCsvO1xuXG52YXIgcmVFbGxpcHNlcyA9IC9cXC5cXC5cXC4vZztcblxudmFyIHJlRGFzaCA9IC8tLSsvZztcblxudmFyIHJlRW1haWxBdXRvbGluayA9IC9ePChbYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqKT4vO1xuXG52YXIgcmVBdXRvbGluayA9IC9ePFtBLVphLXpdW0EtWmEtejAtOS4rLV17MSwzMX06W148PlxceDAwLVxceDIwXSo+L2k7XG5cbnZhciByZVNwbmwgPSAvXiAqKD86XFxuICopPy87XG5cbnZhciByZVdoaXRlc3BhY2VDaGFyID0gL15bIFxcdFxcblxceDBiXFx4MGNcXHgwZF0vO1xuXG52YXIgcmVXaGl0ZXNwYWNlID0gL1sgXFx0XFxuXFx4MGJcXHgwY1xceDBkXSsvZztcblxudmFyIHJlVW5pY29kZVdoaXRlc3BhY2VDaGFyID0gL15cXHMvO1xuXG52YXIgcmVGaW5hbFNwYWNlID0gLyAqJC87XG5cbnZhciByZUluaXRpYWxTcGFjZSA9IC9eICovO1xuXG52YXIgcmVTcGFjZUF0RW5kT2ZMaW5lID0gL14gKig/OlxcbnwkKS87XG5cbnZhciByZUxpbmtMYWJlbCA9IG5ldyBSZWdFeHAoJ15cXFxcWyg/OlteXFxcXFxcXFxcXFxcW1xcXFxdXXwnICsgRVNDQVBFRF9DSEFSICtcbiAgJ3xcXFxcXFxcXCl7MCwxMDAwfVxcXFxdJyk7XG5cbi8vIE1hdGNoZXMgYSBzdHJpbmcgb2Ygbm9uLXNwZWNpYWwgY2hhcmFjdGVycy5cbnZhciByZU1haW4gPSAvXlteXFxuYFxcW1xcXVxcXFwhPCYqXydcIl0rL207XG5cbnZhciB0ZXh0ID0gZnVuY3Rpb24ocykge1xuICAgIHZhciBub2RlID0gbmV3IE5vZGUoJ3RleHQnKTtcbiAgICBub2RlLl9saXRlcmFsID0gcztcbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbi8vIElOTElORSBQQVJTRVJcblxuLy8gVGhlc2UgYXJlIG1ldGhvZHMgb2YgYW4gSW5saW5lUGFyc2VyIG9iamVjdCwgZGVmaW5lZCBiZWxvdy5cbi8vIEFuIElubGluZVBhcnNlciBrZWVwcyB0cmFjayBvZiBhIHN1YmplY3QgKGEgc3RyaW5nIHRvIGJlXG4vLyBwYXJzZWQpIGFuZCBhIHBvc2l0aW9uIGluIHRoYXQgc3ViamVjdC5cblxuLy8gSWYgcmUgbWF0Y2hlcyBhdCBjdXJyZW50IHBvc2l0aW9uIGluIHRoZSBzdWJqZWN0LCBhZHZhbmNlXG4vLyBwb3NpdGlvbiBpbiBzdWJqZWN0IGFuZCByZXR1cm4gdGhlIG1hdGNoOyBvdGhlcndpc2UgcmV0dXJuIG51bGwuXG52YXIgbWF0Y2ggPSBmdW5jdGlvbihyZSkge1xuICAgIHZhciBtID0gcmUuZXhlYyh0aGlzLnN1YmplY3Quc2xpY2UodGhpcy5wb3MpKTtcbiAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvcyArPSBtLmluZGV4ICsgbVswXS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBtWzBdO1xuICAgIH1cbn07XG5cbi8vIFJldHVybnMgdGhlIGNvZGUgZm9yIHRoZSBjaGFyYWN0ZXIgYXQgdGhlIGN1cnJlbnQgc3ViamVjdCBwb3NpdGlvbiwgb3IgLTFcbi8vIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMuXG52YXIgcGVlayA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnBvcyA8IHRoaXMuc3ViamVjdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC5jaGFyQ29kZUF0KHRoaXMucG9zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufTtcblxuLy8gUGFyc2UgemVybyBvciBtb3JlIHNwYWNlIGNoYXJhY3RlcnMsIGluY2x1ZGluZyBhdCBtb3N0IG9uZSBuZXdsaW5lXG52YXIgc3BubCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubWF0Y2gocmVTcG5sKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIEFsbCBvZiB0aGUgcGFyc2VycyBiZWxvdyB0cnkgdG8gbWF0Y2ggc29tZXRoaW5nIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uXG4vLyBpbiB0aGUgc3ViamVjdC4gIElmIHRoZXkgc3VjY2VlZCBpbiBtYXRjaGluZyBhbnl0aGluZywgdGhleVxuLy8gcmV0dXJuIHRoZSBpbmxpbmUgbWF0Y2hlZCwgYWR2YW5jaW5nIHRoZSBzdWJqZWN0LlxuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGJhY2t0aWNrcywgYWRkaW5nIGVpdGhlciBhIGJhY2t0aWNrIGNvZGUgc3BhbiBvciBhXG4vLyBsaXRlcmFsIHNlcXVlbmNlIG9mIGJhY2t0aWNrcy5cbnZhciBwYXJzZUJhY2t0aWNrcyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIHRpY2tzID0gdGhpcy5tYXRjaChyZVRpY2tzSGVyZSk7XG4gICAgaWYgKHRpY2tzID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGFmdGVyT3BlblRpY2tzID0gdGhpcy5wb3M7XG4gICAgdmFyIG1hdGNoZWQ7XG4gICAgdmFyIG5vZGU7XG4gICAgd2hpbGUgKChtYXRjaGVkID0gdGhpcy5tYXRjaChyZVRpY2tzKSkgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKG1hdGNoZWQgPT09IHRpY2tzKSB7XG4gICAgICAgICAgICBub2RlID0gbmV3IE5vZGUoJ2NvZGUnKTtcbiAgICAgICAgICAgIG5vZGUuX2xpdGVyYWwgPSB0aGlzLnN1YmplY3Quc2xpY2UoYWZ0ZXJPcGVuVGlja3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgLSB0aWNrcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKCkucmVwbGFjZShyZVdoaXRlc3BhY2UsICcgJyk7XG4gICAgICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIElmIHdlIGdvdCBoZXJlLCB3ZSBkaWRuJ3QgbWF0Y2ggYSBjbG9zaW5nIGJhY2t0aWNrIHNlcXVlbmNlLlxuICAgIHRoaXMucG9zID0gYWZ0ZXJPcGVuVGlja3M7XG4gICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dCh0aWNrcykpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gUGFyc2UgYSBiYWNrc2xhc2gtZXNjYXBlZCBzcGVjaWFsIGNoYXJhY3RlciwgYWRkaW5nIGVpdGhlciB0aGUgZXNjYXBlZFxuLy8gY2hhcmFjdGVyLCBhIGhhcmQgbGluZSBicmVhayAoaWYgdGhlIGJhY2tzbGFzaCBpcyBmb2xsb3dlZCBieSBhIG5ld2xpbmUpLFxuLy8gb3IgYSBsaXRlcmFsIGJhY2tzbGFzaCB0byB0aGUgYmxvY2sncyBjaGlsZHJlbi4gIEFzc3VtZXMgY3VycmVudCBjaGFyYWN0ZXJcbi8vIGlzIGEgYmFja3NsYXNoLlxudmFyIHBhcnNlQmFja3NsYXNoID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgc3ViaiA9IHRoaXMuc3ViamVjdDtcbiAgICB2YXIgbm9kZTtcbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIGlmICh0aGlzLnBlZWsoKSA9PT0gQ19ORVdMSU5FKSB7XG4gICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgIG5vZGUgPSBuZXcgTm9kZSgnbGluZWJyZWFrJyk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH0gZWxzZSBpZiAocmVFc2NhcGFibGUudGVzdChzdWJqLmNoYXJBdCh0aGlzLnBvcykpKSB7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoc3Viai5jaGFyQXQodGhpcy5wb3MpKSk7XG4gICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dCgnXFxcXCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGFuIGF1dG9saW5rIChVUkwgb3IgZW1haWwgaW4gcG9pbnR5IGJyYWNrZXRzKS5cbnZhciBwYXJzZUF1dG9saW5rID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgbTtcbiAgICB2YXIgZGVzdDtcbiAgICB2YXIgbm9kZTtcbiAgICBpZiAoKG0gPSB0aGlzLm1hdGNoKHJlRW1haWxBdXRvbGluaykpKSB7XG4gICAgICAgIGRlc3QgPSBtLnNsaWNlKDEsIG0ubGVuZ3RoIC0gMSk7XG4gICAgICAgIG5vZGUgPSBuZXcgTm9kZSgnbGluaycpO1xuICAgICAgICBub2RlLl9kZXN0aW5hdGlvbiA9IG5vcm1hbGl6ZVVSSSgnbWFpbHRvOicgKyBkZXN0KTtcbiAgICAgICAgbm9kZS5fdGl0bGUgPSAnJztcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KGRlc3QpKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoKG0gPSB0aGlzLm1hdGNoKHJlQXV0b2xpbmspKSkge1xuICAgICAgICBkZXN0ID0gbS5zbGljZSgxLCBtLmxlbmd0aCAtIDEpO1xuICAgICAgICBub2RlID0gbmV3IE5vZGUoJ2xpbmsnKTtcbiAgICAgICAgbm9kZS5fZGVzdGluYXRpb24gPSBub3JtYWxpemVVUkkoZGVzdCk7XG4gICAgICAgIG5vZGUuX3RpdGxlID0gJyc7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dChkZXN0KSk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBhIHJhdyBIVE1MIHRhZy5cbnZhciBwYXJzZUh0bWxUYWcgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBtID0gdGhpcy5tYXRjaChyZUh0bWxUYWcpO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKCdodG1sX2lubGluZScpO1xuICAgICAgICBub2RlLl9saXRlcmFsID0gbTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cbi8vIFNjYW4gYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIHdpdGggY29kZSBjYywgYW5kIHJldHVybiBpbmZvcm1hdGlvbiBhYm91dFxuLy8gdGhlIG51bWJlciBvZiBkZWxpbWl0ZXJzIGFuZCB3aGV0aGVyIHRoZXkgYXJlIHBvc2l0aW9uZWQgc3VjaCB0aGF0XG4vLyB0aGV5IGNhbiBvcGVuIGFuZC9vciBjbG9zZSBlbXBoYXNpcyBvciBzdHJvbmcgZW1waGFzaXMuICBBIHV0aWxpdHlcbi8vIGZ1bmN0aW9uIGZvciBzdHJvbmcvZW1waCBwYXJzaW5nLlxudmFyIHNjYW5EZWxpbXMgPSBmdW5jdGlvbihjYykge1xuICAgIHZhciBudW1kZWxpbXMgPSAwO1xuICAgIHZhciBjaGFyX2JlZm9yZSwgY2hhcl9hZnRlciwgY2NfYWZ0ZXI7XG4gICAgdmFyIHN0YXJ0cG9zID0gdGhpcy5wb3M7XG4gICAgdmFyIGxlZnRfZmxhbmtpbmcsIHJpZ2h0X2ZsYW5raW5nLCBjYW5fb3BlbiwgY2FuX2Nsb3NlO1xuICAgIHZhciBhZnRlcl9pc193aGl0ZXNwYWNlLCBhZnRlcl9pc19wdW5jdHVhdGlvbiwgYmVmb3JlX2lzX3doaXRlc3BhY2UsIGJlZm9yZV9pc19wdW5jdHVhdGlvbjtcblxuICAgIGlmIChjYyA9PT0gQ19TSU5HTEVRVU9URSB8fCBjYyA9PT0gQ19ET1VCTEVRVU9URSkge1xuICAgICAgICBudW1kZWxpbXMrKztcbiAgICAgICAgdGhpcy5wb3MrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAodGhpcy5wZWVrKCkgPT09IGNjKSB7XG4gICAgICAgICAgICBudW1kZWxpbXMrKztcbiAgICAgICAgICAgIHRoaXMucG9zKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobnVtZGVsaW1zID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNoYXJfYmVmb3JlID0gc3RhcnRwb3MgPT09IDAgPyAnXFxuJyA6IHRoaXMuc3ViamVjdC5jaGFyQXQoc3RhcnRwb3MgLSAxKTtcblxuICAgIGNjX2FmdGVyID0gdGhpcy5wZWVrKCk7XG4gICAgaWYgKGNjX2FmdGVyID09PSAtMSkge1xuICAgICAgICBjaGFyX2FmdGVyID0gJ1xcbic7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hhcl9hZnRlciA9IGZyb21Db2RlUG9pbnQoY2NfYWZ0ZXIpO1xuICAgIH1cblxuICAgIGFmdGVyX2lzX3doaXRlc3BhY2UgPSByZVVuaWNvZGVXaGl0ZXNwYWNlQ2hhci50ZXN0KGNoYXJfYWZ0ZXIpO1xuICAgIGFmdGVyX2lzX3B1bmN0dWF0aW9uID0gcmVQdW5jdHVhdGlvbi50ZXN0KGNoYXJfYWZ0ZXIpO1xuICAgIGJlZm9yZV9pc193aGl0ZXNwYWNlID0gcmVVbmljb2RlV2hpdGVzcGFjZUNoYXIudGVzdChjaGFyX2JlZm9yZSk7XG4gICAgYmVmb3JlX2lzX3B1bmN0dWF0aW9uID0gcmVQdW5jdHVhdGlvbi50ZXN0KGNoYXJfYmVmb3JlKTtcblxuICAgIGxlZnRfZmxhbmtpbmcgPSAhYWZ0ZXJfaXNfd2hpdGVzcGFjZSAmJlxuICAgICAgICAgICAgKCFhZnRlcl9pc19wdW5jdHVhdGlvbiB8fCBiZWZvcmVfaXNfd2hpdGVzcGFjZSB8fCBiZWZvcmVfaXNfcHVuY3R1YXRpb24pO1xuICAgIHJpZ2h0X2ZsYW5raW5nID0gIWJlZm9yZV9pc193aGl0ZXNwYWNlICYmXG4gICAgICAgICAgICAoIWJlZm9yZV9pc19wdW5jdHVhdGlvbiB8fCBhZnRlcl9pc193aGl0ZXNwYWNlIHx8IGFmdGVyX2lzX3B1bmN0dWF0aW9uKTtcbiAgICBpZiAoY2MgPT09IENfVU5ERVJTQ09SRSkge1xuICAgICAgICBjYW5fb3BlbiA9IGxlZnRfZmxhbmtpbmcgJiZcbiAgICAgICAgICAgICghcmlnaHRfZmxhbmtpbmcgfHwgYmVmb3JlX2lzX3B1bmN0dWF0aW9uKTtcbiAgICAgICAgY2FuX2Nsb3NlID0gcmlnaHRfZmxhbmtpbmcgJiZcbiAgICAgICAgICAgICghbGVmdF9mbGFua2luZyB8fCBhZnRlcl9pc19wdW5jdHVhdGlvbik7XG4gICAgfSBlbHNlIGlmIChjYyA9PT0gQ19TSU5HTEVRVU9URSB8fCBjYyA9PT0gQ19ET1VCTEVRVU9URSkge1xuICAgICAgICBjYW5fb3BlbiA9IGxlZnRfZmxhbmtpbmcgJiYgIXJpZ2h0X2ZsYW5raW5nO1xuICAgICAgICBjYW5fY2xvc2UgPSByaWdodF9mbGFua2luZztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYW5fb3BlbiA9IGxlZnRfZmxhbmtpbmc7XG4gICAgICAgIGNhbl9jbG9zZSA9IHJpZ2h0X2ZsYW5raW5nO1xuICAgIH1cbiAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgIHJldHVybiB7IG51bWRlbGltczogbnVtZGVsaW1zLFxuICAgICAgICAgICAgIGNhbl9vcGVuOiBjYW5fb3BlbixcbiAgICAgICAgICAgICBjYW5fY2xvc2U6IGNhbl9jbG9zZSB9O1xufTtcblxuLy8gSGFuZGxlIGEgZGVsaW1pdGVyIG1hcmtlciBmb3IgZW1waGFzaXMgb3IgYSBxdW90ZS5cbnZhciBoYW5kbGVEZWxpbSA9IGZ1bmN0aW9uKGNjLCBibG9jaykge1xuICAgIHZhciByZXMgPSB0aGlzLnNjYW5EZWxpbXMoY2MpO1xuICAgIGlmICghcmVzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG51bWRlbGltcyA9IHJlcy5udW1kZWxpbXM7XG4gICAgdmFyIHN0YXJ0cG9zID0gdGhpcy5wb3M7XG4gICAgdmFyIGNvbnRlbnRzO1xuXG4gICAgdGhpcy5wb3MgKz0gbnVtZGVsaW1zO1xuICAgIGlmIChjYyA9PT0gQ19TSU5HTEVRVU9URSkge1xuICAgICAgICBjb250ZW50cyA9IFwiXFx1MjAxOVwiO1xuICAgIH0gZWxzZSBpZiAoY2MgPT09IENfRE9VQkxFUVVPVEUpIHtcbiAgICAgICAgY29udGVudHMgPSBcIlxcdTIwMUNcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50cyA9IHRoaXMuc3ViamVjdC5zbGljZShzdGFydHBvcywgdGhpcy5wb3MpO1xuICAgIH1cbiAgICB2YXIgbm9kZSA9IHRleHQoY29udGVudHMpO1xuICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gICAgLy8gQWRkIGVudHJ5IHRvIHN0YWNrIGZvciB0aGlzIG9wZW5lclxuICAgIHRoaXMuZGVsaW1pdGVycyA9IHsgY2M6IGNjLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtZGVsaW1zOiBudW1kZWxpbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnZGVsaW1zOiBudW1kZWxpbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IHRoaXMuZGVsaW1pdGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5fb3BlbjogcmVzLmNhbl9vcGVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuX2Nsb3NlOiByZXMuY2FuX2Nsb3NlIH07XG4gICAgaWYgKHRoaXMuZGVsaW1pdGVycy5wcmV2aW91cyAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRlbGltaXRlcnMucHJldmlvdXMubmV4dCA9IHRoaXMuZGVsaW1pdGVycztcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxufTtcblxudmFyIHJlbW92ZURlbGltaXRlciA9IGZ1bmN0aW9uKGRlbGltKSB7XG4gICAgaWYgKGRlbGltLnByZXZpb3VzICE9PSBudWxsKSB7XG4gICAgICAgIGRlbGltLnByZXZpb3VzLm5leHQgPSBkZWxpbS5uZXh0O1xuICAgIH1cbiAgICBpZiAoZGVsaW0ubmV4dCA9PT0gbnVsbCkge1xuICAgICAgICAvLyB0b3Agb2Ygc3RhY2tcbiAgICAgICAgdGhpcy5kZWxpbWl0ZXJzID0gZGVsaW0ucHJldmlvdXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVsaW0ubmV4dC5wcmV2aW91cyA9IGRlbGltLnByZXZpb3VzO1xuICAgIH1cbn07XG5cbnZhciByZW1vdmVEZWxpbWl0ZXJzQmV0d2VlbiA9IGZ1bmN0aW9uKGJvdHRvbSwgdG9wKSB7XG4gICAgaWYgKGJvdHRvbS5uZXh0ICE9PSB0b3ApIHtcbiAgICAgICAgYm90dG9tLm5leHQgPSB0b3A7XG4gICAgICAgIHRvcC5wcmV2aW91cyA9IGJvdHRvbTtcbiAgICB9XG59O1xuXG52YXIgcHJvY2Vzc0VtcGhhc2lzID0gZnVuY3Rpb24oc3RhY2tfYm90dG9tKSB7XG4gICAgdmFyIG9wZW5lciwgY2xvc2VyLCBvbGRfY2xvc2VyO1xuICAgIHZhciBvcGVuZXJfaW5sLCBjbG9zZXJfaW5sO1xuICAgIHZhciB0ZW1wc3RhY2s7XG4gICAgdmFyIHVzZV9kZWxpbXM7XG4gICAgdmFyIHRtcCwgbmV4dDtcbiAgICB2YXIgb3BlbmVyX2ZvdW5kO1xuICAgIHZhciBvcGVuZXJzX2JvdHRvbSA9IFtdO1xuICAgIHZhciBvZGRfbWF0Y2ggPSBmYWxzZTtcblxuICAgIG9wZW5lcnNfYm90dG9tW0NfVU5ERVJTQ09SRV0gPSBzdGFja19ib3R0b207XG4gICAgb3BlbmVyc19ib3R0b21bQ19BU1RFUklTS10gPSBzdGFja19ib3R0b207XG4gICAgb3BlbmVyc19ib3R0b21bQ19TSU5HTEVRVU9URV0gPSBzdGFja19ib3R0b207XG4gICAgb3BlbmVyc19ib3R0b21bQ19ET1VCTEVRVU9URV0gPSBzdGFja19ib3R0b207XG5cbiAgICAvLyBmaW5kIGZpcnN0IGNsb3NlciBhYm92ZSBzdGFja19ib3R0b206XG4gICAgY2xvc2VyID0gdGhpcy5kZWxpbWl0ZXJzO1xuICAgIHdoaWxlIChjbG9zZXIgIT09IG51bGwgJiYgY2xvc2VyLnByZXZpb3VzICE9PSBzdGFja19ib3R0b20pIHtcbiAgICAgICAgY2xvc2VyID0gY2xvc2VyLnByZXZpb3VzO1xuICAgIH1cbiAgICAvLyBtb3ZlIGZvcndhcmQsIGxvb2tpbmcgZm9yIGNsb3NlcnMsIGFuZCBoYW5kbGluZyBlYWNoXG4gICAgd2hpbGUgKGNsb3NlciAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgY2xvc2VyY2MgPSBjbG9zZXIuY2M7XG4gICAgICAgIGlmICghY2xvc2VyLmNhbl9jbG9zZSkge1xuICAgICAgICAgICAgY2xvc2VyID0gY2xvc2VyLm5leHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBmb3VuZCBlbXBoYXNpcyBjbG9zZXIuIG5vdyBsb29rIGJhY2sgZm9yIGZpcnN0IG1hdGNoaW5nIG9wZW5lcjpcbiAgICAgICAgICAgIG9wZW5lciA9IGNsb3Nlci5wcmV2aW91cztcbiAgICAgICAgICAgIG9wZW5lcl9mb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKG9wZW5lciAhPT0gbnVsbCAmJiBvcGVuZXIgIT09IHN0YWNrX2JvdHRvbSAmJlxuICAgICAgICAgICAgICAgICAgIG9wZW5lciAhPT0gb3BlbmVyc19ib3R0b21bY2xvc2VyY2NdKSB7XG4gICAgICAgICAgICAgICAgb2RkX21hdGNoID0gKGNsb3Nlci5jYW5fb3BlbiB8fCBvcGVuZXIuY2FuX2Nsb3NlKSAmJlxuICAgICAgICAgICAgICAgICAgICAob3BlbmVyLm9yaWdkZWxpbXMgKyBjbG9zZXIub3JpZ2RlbGltcykgJSAzID09PSAwO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuZXIuY2MgPT09IGNsb3Nlci5jYyAmJiBvcGVuZXIuY2FuX29wZW4gJiYgIW9kZF9tYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBvcGVuZXJfZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3BlbmVyID0gb3BlbmVyLnByZXZpb3VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2xkX2Nsb3NlciA9IGNsb3NlcjtcblxuICAgICAgICAgICAgaWYgKGNsb3NlcmNjID09PSBDX0FTVEVSSVNLIHx8IGNsb3NlcmNjID09PSBDX1VOREVSU0NPUkUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wZW5lcl9mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZXIgPSBjbG9zZXIubmV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgYWN0dWFsIG51bWJlciBvZiBkZWxpbWl0ZXJzIHVzZWQgZnJvbSBjbG9zZXJcbiAgICAgICAgICAgICAgICAgICAgdXNlX2RlbGltcyA9XG4gICAgICAgICAgICAgICAgICAgICAgKGNsb3Nlci5udW1kZWxpbXMgPj0gMiAmJiBvcGVuZXIubnVtZGVsaW1zID49IDIpID8gMiA6IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2lubCA9IG9wZW5lci5ub2RlO1xuICAgICAgICAgICAgICAgICAgICBjbG9zZXJfaW5sID0gY2xvc2VyLm5vZGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHVzZWQgZGVsaW1pdGVycyBmcm9tIHN0YWNrIGVsdHMgYW5kIGlubGluZXNcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyLm51bWRlbGltcyAtPSB1c2VfZGVsaW1zO1xuICAgICAgICAgICAgICAgICAgICBjbG9zZXIubnVtZGVsaW1zIC09IHVzZV9kZWxpbXM7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5lcl9pbmwuX2xpdGVyYWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2lubC5fbGl0ZXJhbC5zbGljZSgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLl9saXRlcmFsLmxlbmd0aCAtIHVzZV9kZWxpbXMpO1xuICAgICAgICAgICAgICAgICAgICBjbG9zZXJfaW5sLl9saXRlcmFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlcl9pbmwuX2xpdGVyYWwuc2xpY2UoMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VyX2lubC5fbGl0ZXJhbC5sZW5ndGggLSB1c2VfZGVsaW1zKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBidWlsZCBjb250ZW50cyBmb3IgbmV3IGVtcGggZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB2YXIgZW1waCA9IG5ldyBOb2RlKHVzZV9kZWxpbXMgPT09IDEgPyAnZW1waCcgOiAnc3Ryb25nJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gb3BlbmVyX2lubC5fbmV4dDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRtcCAmJiB0bXAgIT09IGNsb3Nlcl9pbmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSB0bXAuX25leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAudW5saW5rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbXBoLmFwcGVuZENoaWxkKHRtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBuZXh0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2lubC5pbnNlcnRBZnRlcihlbXBoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZWx0cyBiZXR3ZWVuIG9wZW5lciBhbmQgY2xvc2VyIGluIGRlbGltaXRlcnMgc3RhY2tcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRGVsaW1pdGVyc0JldHdlZW4ob3BlbmVyLCBjbG9zZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG9wZW5lciBoYXMgMCBkZWxpbXMsIHJlbW92ZSBpdCBhbmQgdGhlIGlubGluZVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVyLm51bWRlbGltcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2lubC51bmxpbmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGVsaW1pdGVyKG9wZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VyLm51bWRlbGltcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VyX2lubC51bmxpbmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBzdGFjayA9IGNsb3Nlci5uZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEZWxpbWl0ZXIoY2xvc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlciA9IHRlbXBzdGFjaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsb3NlcmNjID09PSBDX1NJTkdMRVFVT1RFKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VyLm5vZGUuX2xpdGVyYWwgPSBcIlxcdTIwMTlcIjtcbiAgICAgICAgICAgICAgICBpZiAob3BlbmVyX2ZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5lci5ub2RlLl9saXRlcmFsID0gXCJcXHUyMDE4XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsb3NlciA9IGNsb3Nlci5uZXh0O1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsb3NlcmNjID09PSBDX0RPVUJMRVFVT1RFKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VyLm5vZGUuX2xpdGVyYWwgPSBcIlxcdTIwMURcIjtcbiAgICAgICAgICAgICAgICBpZiAob3BlbmVyX2ZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5lci5ub2RlLmxpdGVyYWwgPSBcIlxcdTIwMUNcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xvc2VyID0gY2xvc2VyLm5leHQ7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghb3BlbmVyX2ZvdW5kICYmICFvZGRfbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgbG93ZXIgYm91bmQgZm9yIGZ1dHVyZSBzZWFyY2hlcyBmb3Igb3BlbmVyczpcbiAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBkbyB0aGlzIHdpdGggb2RkX21hdGNoIGJlY2F1c2UgYSAqKlxuICAgICAgICAgICAgICAgIC8vIHRoYXQgZG9lc24ndCBtYXRjaCBhbiBlYXJsaWVyICogbWlnaHQgdHVybiBpbnRvXG4gICAgICAgICAgICAgICAgLy8gYW4gb3BlbmVyLCBhbmQgdGhlICogbWlnaHQgYmUgbWF0Y2hlZCBieSBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAvLyBlbHNlLlxuICAgICAgICAgICAgICAgIG9wZW5lcnNfYm90dG9tW2Nsb3NlcmNjXSA9IG9sZF9jbG9zZXIucHJldmlvdXM7XG4gICAgICAgICAgICAgICAgaWYgKCFvbGRfY2xvc2VyLmNhbl9vcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbiByZW1vdmUgYSBjbG9zZXIgdGhhdCBjYW4ndCBiZSBhbiBvcGVuZXIsXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uY2Ugd2UndmUgc2VlbiB0aGVyZSdzIG5vIG1hdGNoaW5nIG9wZW5lcjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEZWxpbWl0ZXIob2xkX2Nsb3Nlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYWxsIGRlbGltaXRlcnNcbiAgICB3aGlsZSAodGhpcy5kZWxpbWl0ZXJzICE9PSBudWxsICYmIHRoaXMuZGVsaW1pdGVycyAhPT0gc3RhY2tfYm90dG9tKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRGVsaW1pdGVyKHRoaXMuZGVsaW1pdGVycyk7XG4gICAgfVxufTtcblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBsaW5rIHRpdGxlIChzYW5zIHF1b3RlcyksIHJldHVybmluZyB0aGUgc3RyaW5nXG4vLyBvciBudWxsIGlmIG5vIG1hdGNoLlxudmFyIHBhcnNlTGlua1RpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpdGxlID0gdGhpcy5tYXRjaChyZUxpbmtUaXRsZSk7XG4gICAgaWYgKHRpdGxlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNob3Agb2ZmIHF1b3RlcyBmcm9tIHRpdGxlIGFuZCB1bmVzY2FwZTpcbiAgICAgICAgcmV0dXJuIHVuZXNjYXBlU3RyaW5nKHRpdGxlLnN1YnN0cigxLCB0aXRsZS5sZW5ndGggLSAyKSk7XG4gICAgfVxufTtcblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBsaW5rIGRlc3RpbmF0aW9uLCByZXR1cm5pbmcgdGhlIHN0cmluZyBvclxuLy8gbnVsbCBpZiBubyBtYXRjaC5cbnZhciBwYXJzZUxpbmtEZXN0aW5hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXMgPSB0aGlzLm1hdGNoKHJlTGlua0Rlc3RpbmF0aW9uQnJhY2VzKTtcbiAgICBpZiAocmVzID09PSBudWxsKSB7XG4gICAgICAgIC8vIFRPRE8gaGFuZHJvbGxlZCBwYXJzZXI7IHJlcyBzaG91bGQgYmUgbnVsbCBvciB0aGUgc3RyaW5nXG4gICAgICAgIHZhciBzYXZlcG9zID0gdGhpcy5wb3M7XG4gICAgICAgIHZhciBvcGVucGFyZW5zID0gMDtcbiAgICAgICAgdmFyIGM7XG4gICAgICAgIHdoaWxlICgoYyA9IHRoaXMucGVlaygpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChjID09PSBDX0JBQ0tTTEFTSCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGVlaygpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gQ19PUEVOX1BBUkVOKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICBvcGVucGFyZW5zICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09IENfQ0xPU0VfUEFSRU4pIHtcbiAgICAgICAgICAgICAgICBpZiAob3BlbnBhcmVucyA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3BlbnBhcmVucyAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVXaGl0ZXNwYWNlQ2hhci5leGVjKGZyb21Db2RlUG9pbnQoYykpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzID0gdGhpcy5zdWJqZWN0LnN1YnN0cihzYXZlcG9zLCB0aGlzLnBvcyAtIHNhdmVwb3MpO1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplVVJJKHVuZXNjYXBlU3RyaW5nKHJlcykpO1xuICAgIH0gZWxzZSB7ICAvLyBjaG9wIG9mZiBzdXJyb3VuZGluZyA8Li4+OlxuICAgICAgICByZXR1cm4gbm9ybWFsaXplVVJJKHVuZXNjYXBlU3RyaW5nKHJlcy5zdWJzdHIoMSwgcmVzLmxlbmd0aCAtIDIpKSk7XG4gICAgfVxufTtcblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBhIGxpbmsgbGFiZWwsIHJldHVybmluZyBudW1iZXIgb2YgY2hhcmFjdGVycyBwYXJzZWQuXG52YXIgcGFyc2VMaW5rTGFiZWwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbSA9IHRoaXMubWF0Y2gocmVMaW5rTGFiZWwpO1xuICAgIC8vIE5vdGU6ICBvdXIgcmVnZXggd2lsbCBhbGxvdyBzb21ldGhpbmcgb2YgZm9ybSBbLi5cXF07XG4gICAgLy8gd2UgZGlzYWxsb3cgaXQgaGVyZSByYXRoZXIgdGhhbiB1c2luZyBsb29rYWhlYWQgaW4gdGhlIHJlZ2V4OlxuICAgIGlmIChtID09PSBudWxsIHx8IG0ubGVuZ3RoID4gMTAwMSB8fCAvW15cXFxcXVxcXFxcXF0kLy5leGVjKG0pKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtLmxlbmd0aDtcbiAgICB9XG59O1xuXG4vLyBBZGQgb3BlbiBicmFja2V0IHRvIGRlbGltaXRlciBzdGFjayBhbmQgYWRkIGEgdGV4dCBub2RlIHRvIGJsb2NrJ3MgY2hpbGRyZW4uXG52YXIgcGFyc2VPcGVuQnJhY2tldCA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIHN0YXJ0cG9zID0gdGhpcy5wb3M7XG4gICAgdGhpcy5wb3MgKz0gMTtcblxuICAgIHZhciBub2RlID0gdGV4dCgnWycpO1xuICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gICAgLy8gQWRkIGVudHJ5IHRvIHN0YWNrIGZvciB0aGlzIG9wZW5lclxuICAgIHRoaXMuYWRkQnJhY2tldChub2RlLCBzdGFydHBvcywgZmFsc2UpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gSUYgbmV4dCBjaGFyYWN0ZXIgaXMgWywgYW5kICEgZGVsaW1pdGVyIHRvIGRlbGltaXRlciBzdGFjayBhbmRcbi8vIGFkZCBhIHRleHQgbm9kZSB0byBibG9jaydzIGNoaWxkcmVuLiAgT3RoZXJ3aXNlIGp1c3QgYWRkIGEgdGV4dCBub2RlLlxudmFyIHBhcnNlQmFuZyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIHN0YXJ0cG9zID0gdGhpcy5wb3M7XG4gICAgdGhpcy5wb3MgKz0gMTtcbiAgICBpZiAodGhpcy5wZWVrKCkgPT09IENfT1BFTl9CUkFDS0VUKSB7XG4gICAgICAgIHRoaXMucG9zICs9IDE7XG5cbiAgICAgICAgdmFyIG5vZGUgPSB0ZXh0KCchWycpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgICAgICAvLyBBZGQgZW50cnkgdG8gc3RhY2sgZm9yIHRoaXMgb3BlbmVyXG4gICAgICAgIHRoaXMuYWRkQnJhY2tldChub2RlLCBzdGFydHBvcyArIDEsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoJyEnKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gVHJ5IHRvIG1hdGNoIGNsb3NlIGJyYWNrZXQgYWdhaW5zdCBhbiBvcGVuaW5nIGluIHRoZSBkZWxpbWl0ZXJcbi8vIHN0YWNrLiAgQWRkIGVpdGhlciBhIGxpbmsgb3IgaW1hZ2UsIG9yIGEgcGxhaW4gWyBjaGFyYWN0ZXIsXG4vLyB0byBibG9jaydzIGNoaWxkcmVuLiAgSWYgdGhlcmUgaXMgYSBtYXRjaGluZyBkZWxpbWl0ZXIsXG4vLyByZW1vdmUgaXQgZnJvbSB0aGUgZGVsaW1pdGVyIHN0YWNrLlxudmFyIHBhcnNlQ2xvc2VCcmFja2V0ID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgc3RhcnRwb3M7XG4gICAgdmFyIGlzX2ltYWdlO1xuICAgIHZhciBkZXN0O1xuICAgIHZhciB0aXRsZTtcbiAgICB2YXIgbWF0Y2hlZCA9IGZhbHNlO1xuICAgIHZhciByZWZsYWJlbDtcbiAgICB2YXIgb3BlbmVyO1xuXG4gICAgdGhpcy5wb3MgKz0gMTtcbiAgICBzdGFydHBvcyA9IHRoaXMucG9zO1xuXG4gICAgLy8gZ2V0IGxhc3QgWyBvciAhW1xuICAgIG9wZW5lciA9IHRoaXMuYnJhY2tldHM7XG5cbiAgICBpZiAob3BlbmVyID09PSBudWxsKSB7XG4gICAgICAgIC8vIG5vIG1hdGNoZWQgb3BlbmVyLCBqdXN0IHJldHVybiBhIGxpdGVyYWxcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dCgnXScpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFvcGVuZXIuYWN0aXZlKSB7XG4gICAgICAgIC8vIG5vIG1hdGNoZWQgb3BlbmVyLCBqdXN0IHJldHVybiBhIGxpdGVyYWxcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dCgnXScpKTtcbiAgICAgICAgLy8gdGFrZSBvcGVuZXIgb2ZmIGJyYWNrZXRzIHN0YWNrXG4gICAgICAgIHRoaXMucmVtb3ZlQnJhY2tldCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBnb3QgaGVyZSwgb3BlbiBpcyBhIHBvdGVudGlhbCBvcGVuZXJcbiAgICBpc19pbWFnZSA9IG9wZW5lci5pbWFnZTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgbGluay9pbWFnZVxuXG4gICAgdmFyIHNhdmVwb3MgPSB0aGlzLnBvcztcblxuICAgIC8vIElubGluZSBsaW5rP1xuICAgIGlmICh0aGlzLnBlZWsoKSA9PT0gQ19PUEVOX1BBUkVOKSB7XG4gICAgICAgIHRoaXMucG9zKys7XG4gICAgICAgIGlmICh0aGlzLnNwbmwoKSAmJlxuICAgICAgICAgICAgKChkZXN0ID0gdGhpcy5wYXJzZUxpbmtEZXN0aW5hdGlvbigpKSAhPT0gbnVsbCkgJiZcbiAgICAgICAgICAgIHRoaXMuc3BubCgpICYmXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlcmUncyBhIHNwYWNlIGJlZm9yZSB0aGUgdGl0bGU6XG4gICAgICAgICAgICAocmVXaGl0ZXNwYWNlQ2hhci50ZXN0KHRoaXMuc3ViamVjdC5jaGFyQXQodGhpcy5wb3MgLSAxKSkgJiZcbiAgICAgICAgICAgICAodGl0bGUgPSB0aGlzLnBhcnNlTGlua1RpdGxlKCkpIHx8IHRydWUpICYmXG4gICAgICAgICAgICB0aGlzLnNwbmwoKSAmJlxuICAgICAgICAgICAgdGhpcy5wZWVrKCkgPT09IENfQ0xPU0VfUEFSRU4pIHtcbiAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9zID0gc2F2ZXBvcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghbWF0Y2hlZCkge1xuXG4gICAgICAgIC8vIE5leHQsIHNlZSBpZiB0aGVyZSdzIGEgbGluayBsYWJlbFxuICAgICAgICB2YXIgYmVmb3JlbGFiZWwgPSB0aGlzLnBvcztcbiAgICAgICAgdmFyIG4gPSB0aGlzLnBhcnNlTGlua0xhYmVsKCk7XG4gICAgICAgIGlmIChuID4gMikge1xuICAgICAgICAgICAgcmVmbGFiZWwgPSB0aGlzLnN1YmplY3Quc2xpY2UoYmVmb3JlbGFiZWwsIGJlZm9yZWxhYmVsICsgbik7XG4gICAgICAgIH0gZWxzZSBpZiAoIW9wZW5lci5icmFja2V0QWZ0ZXIpIHtcbiAgICAgICAgICAgIC8vIEVtcHR5IG9yIG1pc3Npbmcgc2Vjb25kIGxhYmVsIG1lYW5zIHRvIHVzZSB0aGUgZmlyc3QgbGFiZWwgYXMgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICAgIC8vIFRoZSByZWZlcmVuY2UgbXVzdCBub3QgY29udGFpbiBhIGJyYWNrZXQuIElmIHdlIGtub3cgdGhlcmUncyBhIGJyYWNrZXQsIHdlIGRvbid0IGV2ZW4gYm90aGVyIGNoZWNraW5nIGl0LlxuICAgICAgICAgICAgcmVmbGFiZWwgPSB0aGlzLnN1YmplY3Quc2xpY2Uob3BlbmVyLmluZGV4LCBzdGFydHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICAgIC8vIElmIHNob3J0Y3V0IHJlZmVyZW5jZSBsaW5rLCByZXdpbmQgYmVmb3JlIHNwYWNlcyB3ZSBza2lwcGVkLlxuICAgICAgICAgICAgdGhpcy5wb3MgPSBzYXZlcG9zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlZmxhYmVsKSB7XG4gICAgICAgICAgICAvLyBsb29rdXAgcmF3bGFiZWwgaW4gcmVmbWFwXG4gICAgICAgICAgICB2YXIgbGluayA9IHRoaXMucmVmbWFwW25vcm1hbGl6ZVJlZmVyZW5jZShyZWZsYWJlbCldO1xuICAgICAgICAgICAgaWYgKGxpbmspIHtcbiAgICAgICAgICAgICAgICBkZXN0ID0gbGluay5kZXN0aW5hdGlvbjtcbiAgICAgICAgICAgICAgICB0aXRsZSA9IGxpbmsudGl0bGU7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKGlzX2ltYWdlID8gJ2ltYWdlJyA6ICdsaW5rJyk7XG4gICAgICAgIG5vZGUuX2Rlc3RpbmF0aW9uID0gZGVzdDtcbiAgICAgICAgbm9kZS5fdGl0bGUgPSB0aXRsZSB8fCAnJztcblxuICAgICAgICB2YXIgdG1wLCBuZXh0O1xuICAgICAgICB0bXAgPSBvcGVuZXIubm9kZS5fbmV4dDtcbiAgICAgICAgd2hpbGUgKHRtcCkge1xuICAgICAgICAgICAgbmV4dCA9IHRtcC5fbmV4dDtcbiAgICAgICAgICAgIHRtcC51bmxpbmsoKTtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodG1wKTtcbiAgICAgICAgICAgIHRtcCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0VtcGhhc2lzKG9wZW5lci5wcmV2aW91c0RlbGltaXRlcik7XG4gICAgICAgIHRoaXMucmVtb3ZlQnJhY2tldCgpO1xuICAgICAgICBvcGVuZXIubm9kZS51bmxpbmsoKTtcblxuICAgICAgICAvLyBXZSByZW1vdmUgdGhpcyBicmFja2V0IGFuZCBwcm9jZXNzRW1waGFzaXMgd2lsbCByZW1vdmUgbGF0ZXIgZGVsaW1pdGVycy5cbiAgICAgICAgLy8gTm93LCBmb3IgYSBsaW5rLCB3ZSBhbHNvIGRlYWN0aXZhdGUgZWFybGllciBsaW5rIG9wZW5lcnMuXG4gICAgICAgIC8vIChubyBsaW5rcyBpbiBsaW5rcylcbiAgICAgICAgaWYgKCFpc19pbWFnZSkge1xuICAgICAgICAgIG9wZW5lciA9IHRoaXMuYnJhY2tldHM7XG4gICAgICAgICAgd2hpbGUgKG9wZW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFvcGVuZXIuaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBvcGVuZXIuYWN0aXZlID0gZmFsc2U7IC8vIGRlYWN0aXZhdGUgdGhpcyBvcGVuZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wZW5lciA9IG9wZW5lci5wcmV2aW91cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSB7IC8vIG5vIG1hdGNoXG5cbiAgICAgICAgdGhpcy5yZW1vdmVCcmFja2V0KCk7ICAvLyByZW1vdmUgdGhpcyBvcGVuZXIgZnJvbSBzdGFja1xuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCddJykpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn07XG5cbnZhciBhZGRCcmFja2V0ID0gZnVuY3Rpb24obm9kZSwgaW5kZXgsIGltYWdlKSB7XG4gICAgaWYgKHRoaXMuYnJhY2tldHMgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5icmFja2V0cy5icmFja2V0QWZ0ZXIgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmJyYWNrZXRzID0geyBub2RlOiBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzOiB0aGlzLmJyYWNrZXRzLFxuICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzRGVsaW1pdGVyOiB0aGlzLmRlbGltaXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWUgfTtcbn07XG5cbnZhciByZW1vdmVCcmFja2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5icmFja2V0cyA9IHRoaXMuYnJhY2tldHMucHJldmlvdXM7XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGFuIGVudGl0eS5cbnZhciBwYXJzZUVudGl0eSA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKChtID0gdGhpcy5tYXRjaChyZUVudGl0eUhlcmUpKSkge1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KGRlY29kZUhUTUwobSkpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbi8vIFBhcnNlIGEgcnVuIG9mIG9yZGluYXJ5IGNoYXJhY3RlcnMsIG9yIGEgc2luZ2xlIGNoYXJhY3RlciB3aXRoXG4vLyBhIHNwZWNpYWwgbWVhbmluZyBpbiBtYXJrZG93biwgYXMgYSBwbGFpbiBzdHJpbmcuXG52YXIgcGFyc2VTdHJpbmcgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBtO1xuICAgIGlmICgobSA9IHRoaXMubWF0Y2gocmVNYWluKSkpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zbWFydCkge1xuICAgICAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dChcbiAgICAgICAgICAgICAgICBtLnJlcGxhY2UocmVFbGxpcHNlcywgXCJcXHUyMDI2XCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHJlRGFzaCwgZnVuY3Rpb24oY2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbkNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFycy5sZW5ndGggJSAzID09PSAwKSB7IC8vIElmIGRpdmlzaWJsZSBieSAzLCB1c2UgYWxsIGVtIGRhc2hlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtQ291bnQgPSBjaGFycy5sZW5ndGggLyAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFycy5sZW5ndGggJSAyID09PSAwKSB7IC8vIElmIGRpdmlzaWJsZSBieSAyLCB1c2UgYWxsIGVuIGRhc2hlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuQ291bnQgPSBjaGFycy5sZW5ndGggLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFycy5sZW5ndGggJSAzID09PSAyKSB7IC8vIElmIDIgZXh0cmEgZGFzaGVzLCB1c2UgZW4gZGFzaCBmb3IgbGFzdCAyOyBlbSBkYXNoZXMgZm9yIHJlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbkNvdW50ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbUNvdW50ID0gKGNoYXJzLmxlbmd0aCAtIDIpIC8gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIFVzZSBlbiBkYXNoZXMgZm9yIGxhc3QgNCBoeXBoZW5zOyBlbSBkYXNoZXMgZm9yIHJlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbkNvdW50ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbUNvdW50ID0gKGNoYXJzLmxlbmd0aCAtIDQpIC8gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlxcdTIwMTRcIi5yZXBlYXQoZW1Db3VudCkgKyBcIlxcdTIwMTNcIi5yZXBlYXQoZW5Db3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KG0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLy8gUGFyc2UgYSBuZXdsaW5lLiAgSWYgaXQgd2FzIHByZWNlZGVkIGJ5IHR3byBzcGFjZXMsIHJldHVybiBhIGhhcmRcbi8vIGxpbmUgYnJlYWs7IG90aGVyd2lzZSBhIHNvZnQgbGluZSBicmVhay5cbnZhciBwYXJzZU5ld2xpbmUgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHRoaXMucG9zICs9IDE7IC8vIGFzc3VtZSB3ZSdyZSBhdCBhIFxcblxuICAgIC8vIGNoZWNrIHByZXZpb3VzIG5vZGUgZm9yIHRyYWlsaW5nIHNwYWNlc1xuICAgIHZhciBsYXN0YyA9IGJsb2NrLl9sYXN0Q2hpbGQ7XG4gICAgaWYgKGxhc3RjICYmIGxhc3RjLnR5cGUgPT09ICd0ZXh0JyAmJiBsYXN0Yy5fbGl0ZXJhbFtsYXN0Yy5fbGl0ZXJhbC5sZW5ndGggLSAxXSA9PT0gJyAnKSB7XG4gICAgICAgIHZhciBoYXJkYnJlYWsgPSBsYXN0Yy5fbGl0ZXJhbFtsYXN0Yy5fbGl0ZXJhbC5sZW5ndGggLSAyXSA9PT0gJyAnO1xuICAgICAgICBsYXN0Yy5fbGl0ZXJhbCA9IGxhc3RjLl9saXRlcmFsLnJlcGxhY2UocmVGaW5hbFNwYWNlLCAnJyk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5ldyBOb2RlKGhhcmRicmVhayA/ICdsaW5lYnJlYWsnIDogJ3NvZnRicmVhaycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChuZXcgTm9kZSgnc29mdGJyZWFrJykpO1xuICAgIH1cbiAgICB0aGlzLm1hdGNoKHJlSW5pdGlhbFNwYWNlKTsgLy8gZ29iYmxlIGxlYWRpbmcgc3BhY2VzIGluIG5leHQgbGluZVxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBhIGxpbmsgcmVmZXJlbmNlLCBtb2RpZnlpbmcgcmVmbWFwLlxudmFyIHBhcnNlUmVmZXJlbmNlID0gZnVuY3Rpb24ocywgcmVmbWFwKSB7XG4gICAgdGhpcy5zdWJqZWN0ID0gcztcbiAgICB0aGlzLnBvcyA9IDA7XG4gICAgdmFyIHJhd2xhYmVsO1xuICAgIHZhciBkZXN0O1xuICAgIHZhciB0aXRsZTtcbiAgICB2YXIgbWF0Y2hDaGFycztcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcblxuICAgIC8vIGxhYmVsOlxuICAgIG1hdGNoQ2hhcnMgPSB0aGlzLnBhcnNlTGlua0xhYmVsKCk7XG4gICAgaWYgKG1hdGNoQ2hhcnMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmF3bGFiZWwgPSB0aGlzLnN1YmplY3Quc3Vic3RyKDAsIG1hdGNoQ2hhcnMpO1xuICAgIH1cblxuICAgIC8vIGNvbG9uOlxuICAgIGlmICh0aGlzLnBlZWsoKSA9PT0gQ19DT0xPTikge1xuICAgICAgICB0aGlzLnBvcysrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vICBsaW5rIHVybFxuICAgIHRoaXMuc3BubCgpO1xuXG4gICAgZGVzdCA9IHRoaXMucGFyc2VMaW5rRGVzdGluYXRpb24oKTtcbiAgICBpZiAoZGVzdCA9PT0gbnVsbCB8fCBkZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgYmVmb3JldGl0bGUgPSB0aGlzLnBvcztcbiAgICB0aGlzLnNwbmwoKTtcbiAgICB0aXRsZSA9IHRoaXMucGFyc2VMaW5rVGl0bGUoKTtcbiAgICBpZiAodGl0bGUgPT09IG51bGwpIHtcbiAgICAgICAgdGl0bGUgPSAnJztcbiAgICAgICAgLy8gcmV3aW5kIGJlZm9yZSBzcGFjZXNcbiAgICAgICAgdGhpcy5wb3MgPSBiZWZvcmV0aXRsZTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgd2UncmUgYXQgbGluZSBlbmQ6XG4gICAgdmFyIGF0TGluZUVuZCA9IHRydWU7XG4gICAgaWYgKHRoaXMubWF0Y2gocmVTcGFjZUF0RW5kT2ZMaW5lKSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGl0bGUgPT09ICcnKSB7XG4gICAgICAgICAgICBhdExpbmVFbmQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoZSBwb3RlbnRpYWwgdGl0bGUgd2UgZm91bmQgaXMgbm90IGF0IHRoZSBsaW5lIGVuZCxcbiAgICAgICAgICAgIC8vIGJ1dCBpdCBjb3VsZCBzdGlsbCBiZSBhIGxlZ2FsIGxpbmsgcmVmZXJlbmNlIGlmIHdlXG4gICAgICAgICAgICAvLyBkaXNjYXJkIHRoZSB0aXRsZVxuICAgICAgICAgICAgdGl0bGUgPSAnJztcbiAgICAgICAgICAgIC8vIHJld2luZCBiZWZvcmUgc3BhY2VzXG4gICAgICAgICAgICB0aGlzLnBvcyA9IGJlZm9yZXRpdGxlO1xuICAgICAgICAgICAgLy8gYW5kIGluc3RlYWQgY2hlY2sgaWYgdGhlIGxpbmsgVVJMIGlzIGF0IHRoZSBsaW5lIGVuZFxuICAgICAgICAgICAgYXRMaW5lRW5kID0gdGhpcy5tYXRjaChyZVNwYWNlQXRFbmRPZkxpbmUpICE9PSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFhdExpbmVFbmQpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBzdGFydHBvcztcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdmFyIG5vcm1sYWJlbCA9IG5vcm1hbGl6ZVJlZmVyZW5jZShyYXdsYWJlbCk7XG4gICAgaWYgKG5vcm1sYWJlbCA9PT0gJycpIHtcbiAgICAgICAgLy8gbGFiZWwgbXVzdCBjb250YWluIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnNcbiAgICAgICAgdGhpcy5wb3MgPSBzdGFydHBvcztcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKCFyZWZtYXBbbm9ybWxhYmVsXSkge1xuICAgICAgICByZWZtYXBbbm9ybWxhYmVsXSA9IHsgZGVzdGluYXRpb246IGRlc3QsIHRpdGxlOiB0aXRsZSB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wb3MgLSBzdGFydHBvcztcbn07XG5cbi8vIFBhcnNlIHRoZSBuZXh0IGlubGluZSBlbGVtZW50IGluIHN1YmplY3QsIGFkdmFuY2luZyBzdWJqZWN0IHBvc2l0aW9uLlxuLy8gT24gc3VjY2VzcywgYWRkIHRoZSByZXN1bHQgdG8gYmxvY2sncyBjaGlsZHJlbiBhbmQgcmV0dXJuIHRydWUuXG4vLyBPbiBmYWlsdXJlLCByZXR1cm4gZmFsc2UuXG52YXIgcGFyc2VJbmxpbmUgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciByZXMgPSBmYWxzZTtcbiAgICB2YXIgYyA9IHRoaXMucGVlaygpO1xuICAgIGlmIChjID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN3aXRjaChjKSB7XG4gICAgY2FzZSBDX05FV0xJTkU6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VOZXdsaW5lKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0JBQ0tTTEFTSDpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUJhY2tzbGFzaChibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19CQUNLVElDSzpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUJhY2t0aWNrcyhibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19BU1RFUklTSzpcbiAgICBjYXNlIENfVU5ERVJTQ09SRTpcbiAgICAgICAgcmVzID0gdGhpcy5oYW5kbGVEZWxpbShjLCBibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19TSU5HTEVRVU9URTpcbiAgICBjYXNlIENfRE9VQkxFUVVPVEU6XG4gICAgICAgIHJlcyA9IHRoaXMub3B0aW9ucy5zbWFydCAmJiB0aGlzLmhhbmRsZURlbGltKGMsIGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX09QRU5fQlJBQ0tFVDpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZU9wZW5CcmFja2V0KGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0JBTkc6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VCYW5nKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0NMT1NFX0JSQUNLRVQ6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VDbG9zZUJyYWNrZXQoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfTEVTU1RIQU46XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VBdXRvbGluayhibG9jaykgfHwgdGhpcy5wYXJzZUh0bWxUYWcoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQU1QRVJTQU5EOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlRW50aXR5KGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZVN0cmluZyhibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIXJlcykge1xuICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KGZyb21Db2RlUG9pbnQoYykpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIFBhcnNlIHN0cmluZyBjb250ZW50IGluIGJsb2NrIGludG8gaW5saW5lIGNoaWxkcmVuLFxuLy8gdXNpbmcgcmVmbWFwIHRvIHJlc29sdmUgcmVmZXJlbmNlcy5cbnZhciBwYXJzZUlubGluZXMgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHRoaXMuc3ViamVjdCA9IGJsb2NrLl9zdHJpbmdfY29udGVudC50cmltKCk7XG4gICAgdGhpcy5wb3MgPSAwO1xuICAgIHRoaXMuZGVsaW1pdGVycyA9IG51bGw7XG4gICAgdGhpcy5icmFja2V0cyA9IG51bGw7XG4gICAgd2hpbGUgKHRoaXMucGFyc2VJbmxpbmUoYmxvY2spKSB7XG4gICAgfVxuICAgIGJsb2NrLl9zdHJpbmdfY29udGVudCA9IG51bGw7IC8vIGFsbG93IHJhdyBzdHJpbmcgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWRcbiAgICB0aGlzLnByb2Nlc3NFbXBoYXNpcyhudWxsKTtcbn07XG5cbi8vIFRoZSBJbmxpbmVQYXJzZXIgb2JqZWN0LlxuZnVuY3Rpb24gSW5saW5lUGFyc2VyKG9wdGlvbnMpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHN1YmplY3Q6ICcnLFxuICAgICAgICBkZWxpbWl0ZXJzOiBudWxsLCAgLy8gdXNlZCBieSBoYW5kbGVEZWxpbSBtZXRob2RcbiAgICAgICAgYnJhY2tldHM6IG51bGwsXG4gICAgICAgIHBvczogMCxcbiAgICAgICAgcmVmbWFwOiB7fSxcbiAgICAgICAgbWF0Y2g6IG1hdGNoLFxuICAgICAgICBwZWVrOiBwZWVrLFxuICAgICAgICBzcG5sOiBzcG5sLFxuICAgICAgICBwYXJzZUJhY2t0aWNrczogcGFyc2VCYWNrdGlja3MsXG4gICAgICAgIHBhcnNlQmFja3NsYXNoOiBwYXJzZUJhY2tzbGFzaCxcbiAgICAgICAgcGFyc2VBdXRvbGluazogcGFyc2VBdXRvbGluayxcbiAgICAgICAgcGFyc2VIdG1sVGFnOiBwYXJzZUh0bWxUYWcsXG4gICAgICAgIHNjYW5EZWxpbXM6IHNjYW5EZWxpbXMsXG4gICAgICAgIGhhbmRsZURlbGltOiBoYW5kbGVEZWxpbSxcbiAgICAgICAgcGFyc2VMaW5rVGl0bGU6IHBhcnNlTGlua1RpdGxlLFxuICAgICAgICBwYXJzZUxpbmtEZXN0aW5hdGlvbjogcGFyc2VMaW5rRGVzdGluYXRpb24sXG4gICAgICAgIHBhcnNlTGlua0xhYmVsOiBwYXJzZUxpbmtMYWJlbCxcbiAgICAgICAgcGFyc2VPcGVuQnJhY2tldDogcGFyc2VPcGVuQnJhY2tldCxcbiAgICAgICAgcGFyc2VCYW5nOiBwYXJzZUJhbmcsXG4gICAgICAgIHBhcnNlQ2xvc2VCcmFja2V0OiBwYXJzZUNsb3NlQnJhY2tldCxcbiAgICAgICAgYWRkQnJhY2tldDogYWRkQnJhY2tldCxcbiAgICAgICAgcmVtb3ZlQnJhY2tldDogcmVtb3ZlQnJhY2tldCxcbiAgICAgICAgcGFyc2VFbnRpdHk6IHBhcnNlRW50aXR5LFxuICAgICAgICBwYXJzZVN0cmluZzogcGFyc2VTdHJpbmcsXG4gICAgICAgIHBhcnNlTmV3bGluZTogcGFyc2VOZXdsaW5lLFxuICAgICAgICBwYXJzZVJlZmVyZW5jZTogcGFyc2VSZWZlcmVuY2UsXG4gICAgICAgIHBhcnNlSW5saW5lOiBwYXJzZUlubGluZSxcbiAgICAgICAgcHJvY2Vzc0VtcGhhc2lzOiBwcm9jZXNzRW1waGFzaXMsXG4gICAgICAgIHJlbW92ZURlbGltaXRlcjogcmVtb3ZlRGVsaW1pdGVyLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zIHx8IHt9LFxuICAgICAgICBwYXJzZTogcGFyc2VJbmxpbmVzXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVQYXJzZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9pbmxpbmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogVGhlIGJ1bGsgb2YgdGhpcyBjb2RlIGRlcml2ZXMgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZG1vc2Nyb3AvZm9sZC1jYXNlXG5CdXQgaW4gYWRkaXRpb24gdG8gY2FzZS1mb2xkaW5nLCB3ZSBhbHNvIG5vcm1hbGl6ZSB3aGl0ZXNwYWNlLlxuXG5mb2xkLWNhc2UgaXMgQ29weXJpZ2h0IE1hdGhpYXMgQnluZW5zIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbmEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG53aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG5kaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbnBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xudGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5FWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbk1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG5OT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG5MSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG5PRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbldJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuLyplc2xpbnQtZGlzYWJsZSAga2V5LXNwYWNpbmcsIGNvbW1hLXNwYWNpbmcgKi9cblxudmFyIHJlZ2V4ID0gL1sgXFx0XFxyXFxuXSt8W0EtWlxceEI1XFx4QzAtXFx4RDZcXHhEOC1cXHhERlxcdTAxMDBcXHUwMTAyXFx1MDEwNFxcdTAxMDZcXHUwMTA4XFx1MDEwQVxcdTAxMENcXHUwMTBFXFx1MDExMFxcdTAxMTJcXHUwMTE0XFx1MDExNlxcdTAxMThcXHUwMTFBXFx1MDExQ1xcdTAxMUVcXHUwMTIwXFx1MDEyMlxcdTAxMjRcXHUwMTI2XFx1MDEyOFxcdTAxMkFcXHUwMTJDXFx1MDEyRVxcdTAxMzBcXHUwMTMyXFx1MDEzNFxcdTAxMzZcXHUwMTM5XFx1MDEzQlxcdTAxM0RcXHUwMTNGXFx1MDE0MVxcdTAxNDNcXHUwMTQ1XFx1MDE0N1xcdTAxNDlcXHUwMTRBXFx1MDE0Q1xcdTAxNEVcXHUwMTUwXFx1MDE1MlxcdTAxNTRcXHUwMTU2XFx1MDE1OFxcdTAxNUFcXHUwMTVDXFx1MDE1RVxcdTAxNjBcXHUwMTYyXFx1MDE2NFxcdTAxNjZcXHUwMTY4XFx1MDE2QVxcdTAxNkNcXHUwMTZFXFx1MDE3MFxcdTAxNzJcXHUwMTc0XFx1MDE3NlxcdTAxNzhcXHUwMTc5XFx1MDE3QlxcdTAxN0RcXHUwMTdGXFx1MDE4MVxcdTAxODJcXHUwMTg0XFx1MDE4NlxcdTAxODdcXHUwMTg5LVxcdTAxOEJcXHUwMThFLVxcdTAxOTFcXHUwMTkzXFx1MDE5NFxcdTAxOTYtXFx1MDE5OFxcdTAxOUNcXHUwMTlEXFx1MDE5RlxcdTAxQTBcXHUwMUEyXFx1MDFBNFxcdTAxQTZcXHUwMUE3XFx1MDFBOVxcdTAxQUNcXHUwMUFFXFx1MDFBRlxcdTAxQjEtXFx1MDFCM1xcdTAxQjVcXHUwMUI3XFx1MDFCOFxcdTAxQkNcXHUwMUM0XFx1MDFDNVxcdTAxQzdcXHUwMUM4XFx1MDFDQVxcdTAxQ0JcXHUwMUNEXFx1MDFDRlxcdTAxRDFcXHUwMUQzXFx1MDFENVxcdTAxRDdcXHUwMUQ5XFx1MDFEQlxcdTAxREVcXHUwMUUwXFx1MDFFMlxcdTAxRTRcXHUwMUU2XFx1MDFFOFxcdTAxRUFcXHUwMUVDXFx1MDFFRVxcdTAxRjAtXFx1MDFGMlxcdTAxRjRcXHUwMUY2LVxcdTAxRjhcXHUwMUZBXFx1MDFGQ1xcdTAxRkVcXHUwMjAwXFx1MDIwMlxcdTAyMDRcXHUwMjA2XFx1MDIwOFxcdTAyMEFcXHUwMjBDXFx1MDIwRVxcdTAyMTBcXHUwMjEyXFx1MDIxNFxcdTAyMTZcXHUwMjE4XFx1MDIxQVxcdTAyMUNcXHUwMjFFXFx1MDIyMFxcdTAyMjJcXHUwMjI0XFx1MDIyNlxcdTAyMjhcXHUwMjJBXFx1MDIyQ1xcdTAyMkVcXHUwMjMwXFx1MDIzMlxcdTAyM0FcXHUwMjNCXFx1MDIzRFxcdTAyM0VcXHUwMjQxXFx1MDI0My1cXHUwMjQ2XFx1MDI0OFxcdTAyNEFcXHUwMjRDXFx1MDI0RVxcdTAzNDVcXHUwMzcwXFx1MDM3MlxcdTAzNzZcXHUwMzdGXFx1MDM4NlxcdTAzODgtXFx1MDM4QVxcdTAzOENcXHUwMzhFLVxcdTAzQTFcXHUwM0EzLVxcdTAzQUJcXHUwM0IwXFx1MDNDMlxcdTAzQ0YtXFx1MDNEMVxcdTAzRDVcXHUwM0Q2XFx1MDNEOFxcdTAzREFcXHUwM0RDXFx1MDNERVxcdTAzRTBcXHUwM0UyXFx1MDNFNFxcdTAzRTZcXHUwM0U4XFx1MDNFQVxcdTAzRUNcXHUwM0VFXFx1MDNGMFxcdTAzRjFcXHUwM0Y0XFx1MDNGNVxcdTAzRjdcXHUwM0Y5XFx1MDNGQVxcdTAzRkQtXFx1MDQyRlxcdTA0NjBcXHUwNDYyXFx1MDQ2NFxcdTA0NjZcXHUwNDY4XFx1MDQ2QVxcdTA0NkNcXHUwNDZFXFx1MDQ3MFxcdTA0NzJcXHUwNDc0XFx1MDQ3NlxcdTA0NzhcXHUwNDdBXFx1MDQ3Q1xcdTA0N0VcXHUwNDgwXFx1MDQ4QVxcdTA0OENcXHUwNDhFXFx1MDQ5MFxcdTA0OTJcXHUwNDk0XFx1MDQ5NlxcdTA0OThcXHUwNDlBXFx1MDQ5Q1xcdTA0OUVcXHUwNEEwXFx1MDRBMlxcdTA0QTRcXHUwNEE2XFx1MDRBOFxcdTA0QUFcXHUwNEFDXFx1MDRBRVxcdTA0QjBcXHUwNEIyXFx1MDRCNFxcdTA0QjZcXHUwNEI4XFx1MDRCQVxcdTA0QkNcXHUwNEJFXFx1MDRDMFxcdTA0QzFcXHUwNEMzXFx1MDRDNVxcdTA0QzdcXHUwNEM5XFx1MDRDQlxcdTA0Q0RcXHUwNEQwXFx1MDREMlxcdTA0RDRcXHUwNEQ2XFx1MDREOFxcdTA0REFcXHUwNERDXFx1MDRERVxcdTA0RTBcXHUwNEUyXFx1MDRFNFxcdTA0RTZcXHUwNEU4XFx1MDRFQVxcdTA0RUNcXHUwNEVFXFx1MDRGMFxcdTA0RjJcXHUwNEY0XFx1MDRGNlxcdTA0RjhcXHUwNEZBXFx1MDRGQ1xcdTA0RkVcXHUwNTAwXFx1MDUwMlxcdTA1MDRcXHUwNTA2XFx1MDUwOFxcdTA1MEFcXHUwNTBDXFx1MDUwRVxcdTA1MTBcXHUwNTEyXFx1MDUxNFxcdTA1MTZcXHUwNTE4XFx1MDUxQVxcdTA1MUNcXHUwNTFFXFx1MDUyMFxcdTA1MjJcXHUwNTI0XFx1MDUyNlxcdTA1MjhcXHUwNTJBXFx1MDUyQ1xcdTA1MkVcXHUwNTMxLVxcdTA1NTZcXHUwNTg3XFx1MTBBMC1cXHUxMEM1XFx1MTBDN1xcdTEwQ0RcXHUxRTAwXFx1MUUwMlxcdTFFMDRcXHUxRTA2XFx1MUUwOFxcdTFFMEFcXHUxRTBDXFx1MUUwRVxcdTFFMTBcXHUxRTEyXFx1MUUxNFxcdTFFMTZcXHUxRTE4XFx1MUUxQVxcdTFFMUNcXHUxRTFFXFx1MUUyMFxcdTFFMjJcXHUxRTI0XFx1MUUyNlxcdTFFMjhcXHUxRTJBXFx1MUUyQ1xcdTFFMkVcXHUxRTMwXFx1MUUzMlxcdTFFMzRcXHUxRTM2XFx1MUUzOFxcdTFFM0FcXHUxRTNDXFx1MUUzRVxcdTFFNDBcXHUxRTQyXFx1MUU0NFxcdTFFNDZcXHUxRTQ4XFx1MUU0QVxcdTFFNENcXHUxRTRFXFx1MUU1MFxcdTFFNTJcXHUxRTU0XFx1MUU1NlxcdTFFNThcXHUxRTVBXFx1MUU1Q1xcdTFFNUVcXHUxRTYwXFx1MUU2MlxcdTFFNjRcXHUxRTY2XFx1MUU2OFxcdTFFNkFcXHUxRTZDXFx1MUU2RVxcdTFFNzBcXHUxRTcyXFx1MUU3NFxcdTFFNzZcXHUxRTc4XFx1MUU3QVxcdTFFN0NcXHUxRTdFXFx1MUU4MFxcdTFFODJcXHUxRTg0XFx1MUU4NlxcdTFFODhcXHUxRThBXFx1MUU4Q1xcdTFFOEVcXHUxRTkwXFx1MUU5MlxcdTFFOTRcXHUxRTk2LVxcdTFFOUJcXHUxRTlFXFx1MUVBMFxcdTFFQTJcXHUxRUE0XFx1MUVBNlxcdTFFQThcXHUxRUFBXFx1MUVBQ1xcdTFFQUVcXHUxRUIwXFx1MUVCMlxcdTFFQjRcXHUxRUI2XFx1MUVCOFxcdTFFQkFcXHUxRUJDXFx1MUVCRVxcdTFFQzBcXHUxRUMyXFx1MUVDNFxcdTFFQzZcXHUxRUM4XFx1MUVDQVxcdTFFQ0NcXHUxRUNFXFx1MUVEMFxcdTFFRDJcXHUxRUQ0XFx1MUVENlxcdTFFRDhcXHUxRURBXFx1MUVEQ1xcdTFFREVcXHUxRUUwXFx1MUVFMlxcdTFFRTRcXHUxRUU2XFx1MUVFOFxcdTFFRUFcXHUxRUVDXFx1MUVFRVxcdTFFRjBcXHUxRUYyXFx1MUVGNFxcdTFFRjZcXHUxRUY4XFx1MUVGQVxcdTFFRkNcXHUxRUZFXFx1MUYwOC1cXHUxRjBGXFx1MUYxOC1cXHUxRjFEXFx1MUYyOC1cXHUxRjJGXFx1MUYzOC1cXHUxRjNGXFx1MUY0OC1cXHUxRjREXFx1MUY1MFxcdTFGNTJcXHUxRjU0XFx1MUY1NlxcdTFGNTlcXHUxRjVCXFx1MUY1RFxcdTFGNUZcXHUxRjY4LVxcdTFGNkZcXHUxRjgwLVxcdTFGQUZcXHUxRkIyLVxcdTFGQjRcXHUxRkI2LVxcdTFGQkNcXHUxRkJFXFx1MUZDMi1cXHUxRkM0XFx1MUZDNi1cXHUxRkNDXFx1MUZEMlxcdTFGRDNcXHUxRkQ2LVxcdTFGREJcXHUxRkUyLVxcdTFGRTRcXHUxRkU2LVxcdTFGRUNcXHUxRkYyLVxcdTFGRjRcXHUxRkY2LVxcdTFGRkNcXHUyMTI2XFx1MjEyQVxcdTIxMkJcXHUyMTMyXFx1MjE2MC1cXHUyMTZGXFx1MjE4M1xcdTI0QjYtXFx1MjRDRlxcdTJDMDAtXFx1MkMyRVxcdTJDNjBcXHUyQzYyLVxcdTJDNjRcXHUyQzY3XFx1MkM2OVxcdTJDNkJcXHUyQzZELVxcdTJDNzBcXHUyQzcyXFx1MkM3NVxcdTJDN0UtXFx1MkM4MFxcdTJDODJcXHUyQzg0XFx1MkM4NlxcdTJDODhcXHUyQzhBXFx1MkM4Q1xcdTJDOEVcXHUyQzkwXFx1MkM5MlxcdTJDOTRcXHUyQzk2XFx1MkM5OFxcdTJDOUFcXHUyQzlDXFx1MkM5RVxcdTJDQTBcXHUyQ0EyXFx1MkNBNFxcdTJDQTZcXHUyQ0E4XFx1MkNBQVxcdTJDQUNcXHUyQ0FFXFx1MkNCMFxcdTJDQjJcXHUyQ0I0XFx1MkNCNlxcdTJDQjhcXHUyQ0JBXFx1MkNCQ1xcdTJDQkVcXHUyQ0MwXFx1MkNDMlxcdTJDQzRcXHUyQ0M2XFx1MkNDOFxcdTJDQ0FcXHUyQ0NDXFx1MkNDRVxcdTJDRDBcXHUyQ0QyXFx1MkNENFxcdTJDRDZcXHUyQ0Q4XFx1MkNEQVxcdTJDRENcXHUyQ0RFXFx1MkNFMFxcdTJDRTJcXHUyQ0VCXFx1MkNFRFxcdTJDRjJcXHVBNjQwXFx1QTY0MlxcdUE2NDRcXHVBNjQ2XFx1QTY0OFxcdUE2NEFcXHVBNjRDXFx1QTY0RVxcdUE2NTBcXHVBNjUyXFx1QTY1NFxcdUE2NTZcXHVBNjU4XFx1QTY1QVxcdUE2NUNcXHVBNjVFXFx1QTY2MFxcdUE2NjJcXHVBNjY0XFx1QTY2NlxcdUE2NjhcXHVBNjZBXFx1QTY2Q1xcdUE2ODBcXHVBNjgyXFx1QTY4NFxcdUE2ODZcXHVBNjg4XFx1QTY4QVxcdUE2OENcXHVBNjhFXFx1QTY5MFxcdUE2OTJcXHVBNjk0XFx1QTY5NlxcdUE2OThcXHVBNjlBXFx1QTcyMlxcdUE3MjRcXHVBNzI2XFx1QTcyOFxcdUE3MkFcXHVBNzJDXFx1QTcyRVxcdUE3MzJcXHVBNzM0XFx1QTczNlxcdUE3MzhcXHVBNzNBXFx1QTczQ1xcdUE3M0VcXHVBNzQwXFx1QTc0MlxcdUE3NDRcXHVBNzQ2XFx1QTc0OFxcdUE3NEFcXHVBNzRDXFx1QTc0RVxcdUE3NTBcXHVBNzUyXFx1QTc1NFxcdUE3NTZcXHVBNzU4XFx1QTc1QVxcdUE3NUNcXHVBNzVFXFx1QTc2MFxcdUE3NjJcXHVBNzY0XFx1QTc2NlxcdUE3NjhcXHVBNzZBXFx1QTc2Q1xcdUE3NkVcXHVBNzc5XFx1QTc3QlxcdUE3N0RcXHVBNzdFXFx1QTc4MFxcdUE3ODJcXHVBNzg0XFx1QTc4NlxcdUE3OEJcXHVBNzhEXFx1QTc5MFxcdUE3OTJcXHVBNzk2XFx1QTc5OFxcdUE3OUFcXHVBNzlDXFx1QTc5RVxcdUE3QTBcXHVBN0EyXFx1QTdBNFxcdUE3QTZcXHVBN0E4XFx1QTdBQS1cXHVBN0FEXFx1QTdCMFxcdUE3QjFcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGRjIxLVxcdUZGM0FdfFxcdUQ4MDFbXFx1REMwMC1cXHVEQzI3XXxcXHVEODA2W1xcdURDQTAtXFx1RENCRl0vZztcblxudmFyIG1hcCA9IHsnQSc6J2EnLCdCJzonYicsJ0MnOidjJywnRCc6J2QnLCdFJzonZScsJ0YnOidmJywnRyc6J2cnLCdIJzonaCcsJ0knOidpJywnSic6J2onLCdLJzonaycsJ0wnOidsJywnTSc6J20nLCdOJzonbicsJ08nOidvJywnUCc6J3AnLCdRJzoncScsJ1InOidyJywnUyc6J3MnLCdUJzondCcsJ1UnOid1JywnVic6J3YnLCdXJzondycsJ1gnOid4JywnWSc6J3knLCdaJzoneicsJ1xceEI1JzonXFx1MDNCQycsJ1xceEMwJzonXFx4RTAnLCdcXHhDMSc6J1xceEUxJywnXFx4QzInOidcXHhFMicsJ1xceEMzJzonXFx4RTMnLCdcXHhDNCc6J1xceEU0JywnXFx4QzUnOidcXHhFNScsJ1xceEM2JzonXFx4RTYnLCdcXHhDNyc6J1xceEU3JywnXFx4QzgnOidcXHhFOCcsJ1xceEM5JzonXFx4RTknLCdcXHhDQSc6J1xceEVBJywnXFx4Q0InOidcXHhFQicsJ1xceENDJzonXFx4RUMnLCdcXHhDRCc6J1xceEVEJywnXFx4Q0UnOidcXHhFRScsJ1xceENGJzonXFx4RUYnLCdcXHhEMCc6J1xceEYwJywnXFx4RDEnOidcXHhGMScsJ1xceEQyJzonXFx4RjInLCdcXHhEMyc6J1xceEYzJywnXFx4RDQnOidcXHhGNCcsJ1xceEQ1JzonXFx4RjUnLCdcXHhENic6J1xceEY2JywnXFx4RDgnOidcXHhGOCcsJ1xceEQ5JzonXFx4RjknLCdcXHhEQSc6J1xceEZBJywnXFx4REInOidcXHhGQicsJ1xceERDJzonXFx4RkMnLCdcXHhERCc6J1xceEZEJywnXFx4REUnOidcXHhGRScsJ1xcdTAxMDAnOidcXHUwMTAxJywnXFx1MDEwMic6J1xcdTAxMDMnLCdcXHUwMTA0JzonXFx1MDEwNScsJ1xcdTAxMDYnOidcXHUwMTA3JywnXFx1MDEwOCc6J1xcdTAxMDknLCdcXHUwMTBBJzonXFx1MDEwQicsJ1xcdTAxMEMnOidcXHUwMTBEJywnXFx1MDEwRSc6J1xcdTAxMEYnLCdcXHUwMTEwJzonXFx1MDExMScsJ1xcdTAxMTInOidcXHUwMTEzJywnXFx1MDExNCc6J1xcdTAxMTUnLCdcXHUwMTE2JzonXFx1MDExNycsJ1xcdTAxMTgnOidcXHUwMTE5JywnXFx1MDExQSc6J1xcdTAxMUInLCdcXHUwMTFDJzonXFx1MDExRCcsJ1xcdTAxMUUnOidcXHUwMTFGJywnXFx1MDEyMCc6J1xcdTAxMjEnLCdcXHUwMTIyJzonXFx1MDEyMycsJ1xcdTAxMjQnOidcXHUwMTI1JywnXFx1MDEyNic6J1xcdTAxMjcnLCdcXHUwMTI4JzonXFx1MDEyOScsJ1xcdTAxMkEnOidcXHUwMTJCJywnXFx1MDEyQyc6J1xcdTAxMkQnLCdcXHUwMTJFJzonXFx1MDEyRicsJ1xcdTAxMzInOidcXHUwMTMzJywnXFx1MDEzNCc6J1xcdTAxMzUnLCdcXHUwMTM2JzonXFx1MDEzNycsJ1xcdTAxMzknOidcXHUwMTNBJywnXFx1MDEzQic6J1xcdTAxM0MnLCdcXHUwMTNEJzonXFx1MDEzRScsJ1xcdTAxM0YnOidcXHUwMTQwJywnXFx1MDE0MSc6J1xcdTAxNDInLCdcXHUwMTQzJzonXFx1MDE0NCcsJ1xcdTAxNDUnOidcXHUwMTQ2JywnXFx1MDE0Nyc6J1xcdTAxNDgnLCdcXHUwMTRBJzonXFx1MDE0QicsJ1xcdTAxNEMnOidcXHUwMTREJywnXFx1MDE0RSc6J1xcdTAxNEYnLCdcXHUwMTUwJzonXFx1MDE1MScsJ1xcdTAxNTInOidcXHUwMTUzJywnXFx1MDE1NCc6J1xcdTAxNTUnLCdcXHUwMTU2JzonXFx1MDE1NycsJ1xcdTAxNTgnOidcXHUwMTU5JywnXFx1MDE1QSc6J1xcdTAxNUInLCdcXHUwMTVDJzonXFx1MDE1RCcsJ1xcdTAxNUUnOidcXHUwMTVGJywnXFx1MDE2MCc6J1xcdTAxNjEnLCdcXHUwMTYyJzonXFx1MDE2MycsJ1xcdTAxNjQnOidcXHUwMTY1JywnXFx1MDE2Nic6J1xcdTAxNjcnLCdcXHUwMTY4JzonXFx1MDE2OScsJ1xcdTAxNkEnOidcXHUwMTZCJywnXFx1MDE2Qyc6J1xcdTAxNkQnLCdcXHUwMTZFJzonXFx1MDE2RicsJ1xcdTAxNzAnOidcXHUwMTcxJywnXFx1MDE3Mic6J1xcdTAxNzMnLCdcXHUwMTc0JzonXFx1MDE3NScsJ1xcdTAxNzYnOidcXHUwMTc3JywnXFx1MDE3OCc6J1xceEZGJywnXFx1MDE3OSc6J1xcdTAxN0EnLCdcXHUwMTdCJzonXFx1MDE3QycsJ1xcdTAxN0QnOidcXHUwMTdFJywnXFx1MDE3Ric6J3MnLCdcXHUwMTgxJzonXFx1MDI1MycsJ1xcdTAxODInOidcXHUwMTgzJywnXFx1MDE4NCc6J1xcdTAxODUnLCdcXHUwMTg2JzonXFx1MDI1NCcsJ1xcdTAxODcnOidcXHUwMTg4JywnXFx1MDE4OSc6J1xcdTAyNTYnLCdcXHUwMThBJzonXFx1MDI1NycsJ1xcdTAxOEInOidcXHUwMThDJywnXFx1MDE4RSc6J1xcdTAxREQnLCdcXHUwMThGJzonXFx1MDI1OScsJ1xcdTAxOTAnOidcXHUwMjVCJywnXFx1MDE5MSc6J1xcdTAxOTInLCdcXHUwMTkzJzonXFx1MDI2MCcsJ1xcdTAxOTQnOidcXHUwMjYzJywnXFx1MDE5Nic6J1xcdTAyNjknLCdcXHUwMTk3JzonXFx1MDI2OCcsJ1xcdTAxOTgnOidcXHUwMTk5JywnXFx1MDE5Qyc6J1xcdTAyNkYnLCdcXHUwMTlEJzonXFx1MDI3MicsJ1xcdTAxOUYnOidcXHUwMjc1JywnXFx1MDFBMCc6J1xcdTAxQTEnLCdcXHUwMUEyJzonXFx1MDFBMycsJ1xcdTAxQTQnOidcXHUwMUE1JywnXFx1MDFBNic6J1xcdTAyODAnLCdcXHUwMUE3JzonXFx1MDFBOCcsJ1xcdTAxQTknOidcXHUwMjgzJywnXFx1MDFBQyc6J1xcdTAxQUQnLCdcXHUwMUFFJzonXFx1MDI4OCcsJ1xcdTAxQUYnOidcXHUwMUIwJywnXFx1MDFCMSc6J1xcdTAyOEEnLCdcXHUwMUIyJzonXFx1MDI4QicsJ1xcdTAxQjMnOidcXHUwMUI0JywnXFx1MDFCNSc6J1xcdTAxQjYnLCdcXHUwMUI3JzonXFx1MDI5MicsJ1xcdTAxQjgnOidcXHUwMUI5JywnXFx1MDFCQyc6J1xcdTAxQkQnLCdcXHUwMUM0JzonXFx1MDFDNicsJ1xcdTAxQzUnOidcXHUwMUM2JywnXFx1MDFDNyc6J1xcdTAxQzknLCdcXHUwMUM4JzonXFx1MDFDOScsJ1xcdTAxQ0EnOidcXHUwMUNDJywnXFx1MDFDQic6J1xcdTAxQ0MnLCdcXHUwMUNEJzonXFx1MDFDRScsJ1xcdTAxQ0YnOidcXHUwMUQwJywnXFx1MDFEMSc6J1xcdTAxRDInLCdcXHUwMUQzJzonXFx1MDFENCcsJ1xcdTAxRDUnOidcXHUwMUQ2JywnXFx1MDFENyc6J1xcdTAxRDgnLCdcXHUwMUQ5JzonXFx1MDFEQScsJ1xcdTAxREInOidcXHUwMURDJywnXFx1MDFERSc6J1xcdTAxREYnLCdcXHUwMUUwJzonXFx1MDFFMScsJ1xcdTAxRTInOidcXHUwMUUzJywnXFx1MDFFNCc6J1xcdTAxRTUnLCdcXHUwMUU2JzonXFx1MDFFNycsJ1xcdTAxRTgnOidcXHUwMUU5JywnXFx1MDFFQSc6J1xcdTAxRUInLCdcXHUwMUVDJzonXFx1MDFFRCcsJ1xcdTAxRUUnOidcXHUwMUVGJywnXFx1MDFGMSc6J1xcdTAxRjMnLCdcXHUwMUYyJzonXFx1MDFGMycsJ1xcdTAxRjQnOidcXHUwMUY1JywnXFx1MDFGNic6J1xcdTAxOTUnLCdcXHUwMUY3JzonXFx1MDFCRicsJ1xcdTAxRjgnOidcXHUwMUY5JywnXFx1MDFGQSc6J1xcdTAxRkInLCdcXHUwMUZDJzonXFx1MDFGRCcsJ1xcdTAxRkUnOidcXHUwMUZGJywnXFx1MDIwMCc6J1xcdTAyMDEnLCdcXHUwMjAyJzonXFx1MDIwMycsJ1xcdTAyMDQnOidcXHUwMjA1JywnXFx1MDIwNic6J1xcdTAyMDcnLCdcXHUwMjA4JzonXFx1MDIwOScsJ1xcdTAyMEEnOidcXHUwMjBCJywnXFx1MDIwQyc6J1xcdTAyMEQnLCdcXHUwMjBFJzonXFx1MDIwRicsJ1xcdTAyMTAnOidcXHUwMjExJywnXFx1MDIxMic6J1xcdTAyMTMnLCdcXHUwMjE0JzonXFx1MDIxNScsJ1xcdTAyMTYnOidcXHUwMjE3JywnXFx1MDIxOCc6J1xcdTAyMTknLCdcXHUwMjFBJzonXFx1MDIxQicsJ1xcdTAyMUMnOidcXHUwMjFEJywnXFx1MDIxRSc6J1xcdTAyMUYnLCdcXHUwMjIwJzonXFx1MDE5RScsJ1xcdTAyMjInOidcXHUwMjIzJywnXFx1MDIyNCc6J1xcdTAyMjUnLCdcXHUwMjI2JzonXFx1MDIyNycsJ1xcdTAyMjgnOidcXHUwMjI5JywnXFx1MDIyQSc6J1xcdTAyMkInLCdcXHUwMjJDJzonXFx1MDIyRCcsJ1xcdTAyMkUnOidcXHUwMjJGJywnXFx1MDIzMCc6J1xcdTAyMzEnLCdcXHUwMjMyJzonXFx1MDIzMycsJ1xcdTAyM0EnOidcXHUyQzY1JywnXFx1MDIzQic6J1xcdTAyM0MnLCdcXHUwMjNEJzonXFx1MDE5QScsJ1xcdTAyM0UnOidcXHUyQzY2JywnXFx1MDI0MSc6J1xcdTAyNDInLCdcXHUwMjQzJzonXFx1MDE4MCcsJ1xcdTAyNDQnOidcXHUwMjg5JywnXFx1MDI0NSc6J1xcdTAyOEMnLCdcXHUwMjQ2JzonXFx1MDI0NycsJ1xcdTAyNDgnOidcXHUwMjQ5JywnXFx1MDI0QSc6J1xcdTAyNEInLCdcXHUwMjRDJzonXFx1MDI0RCcsJ1xcdTAyNEUnOidcXHUwMjRGJywnXFx1MDM0NSc6J1xcdTAzQjknLCdcXHUwMzcwJzonXFx1MDM3MScsJ1xcdTAzNzInOidcXHUwMzczJywnXFx1MDM3Nic6J1xcdTAzNzcnLCdcXHUwMzdGJzonXFx1MDNGMycsJ1xcdTAzODYnOidcXHUwM0FDJywnXFx1MDM4OCc6J1xcdTAzQUQnLCdcXHUwMzg5JzonXFx1MDNBRScsJ1xcdTAzOEEnOidcXHUwM0FGJywnXFx1MDM4Qyc6J1xcdTAzQ0MnLCdcXHUwMzhFJzonXFx1MDNDRCcsJ1xcdTAzOEYnOidcXHUwM0NFJywnXFx1MDM5MSc6J1xcdTAzQjEnLCdcXHUwMzkyJzonXFx1MDNCMicsJ1xcdTAzOTMnOidcXHUwM0IzJywnXFx1MDM5NCc6J1xcdTAzQjQnLCdcXHUwMzk1JzonXFx1MDNCNScsJ1xcdTAzOTYnOidcXHUwM0I2JywnXFx1MDM5Nyc6J1xcdTAzQjcnLCdcXHUwMzk4JzonXFx1MDNCOCcsJ1xcdTAzOTknOidcXHUwM0I5JywnXFx1MDM5QSc6J1xcdTAzQkEnLCdcXHUwMzlCJzonXFx1MDNCQicsJ1xcdTAzOUMnOidcXHUwM0JDJywnXFx1MDM5RCc6J1xcdTAzQkQnLCdcXHUwMzlFJzonXFx1MDNCRScsJ1xcdTAzOUYnOidcXHUwM0JGJywnXFx1MDNBMCc6J1xcdTAzQzAnLCdcXHUwM0ExJzonXFx1MDNDMScsJ1xcdTAzQTMnOidcXHUwM0MzJywnXFx1MDNBNCc6J1xcdTAzQzQnLCdcXHUwM0E1JzonXFx1MDNDNScsJ1xcdTAzQTYnOidcXHUwM0M2JywnXFx1MDNBNyc6J1xcdTAzQzcnLCdcXHUwM0E4JzonXFx1MDNDOCcsJ1xcdTAzQTknOidcXHUwM0M5JywnXFx1MDNBQSc6J1xcdTAzQ0EnLCdcXHUwM0FCJzonXFx1MDNDQicsJ1xcdTAzQzInOidcXHUwM0MzJywnXFx1MDNDRic6J1xcdTAzRDcnLCdcXHUwM0QwJzonXFx1MDNCMicsJ1xcdTAzRDEnOidcXHUwM0I4JywnXFx1MDNENSc6J1xcdTAzQzYnLCdcXHUwM0Q2JzonXFx1MDNDMCcsJ1xcdTAzRDgnOidcXHUwM0Q5JywnXFx1MDNEQSc6J1xcdTAzREInLCdcXHUwM0RDJzonXFx1MDNERCcsJ1xcdTAzREUnOidcXHUwM0RGJywnXFx1MDNFMCc6J1xcdTAzRTEnLCdcXHUwM0UyJzonXFx1MDNFMycsJ1xcdTAzRTQnOidcXHUwM0U1JywnXFx1MDNFNic6J1xcdTAzRTcnLCdcXHUwM0U4JzonXFx1MDNFOScsJ1xcdTAzRUEnOidcXHUwM0VCJywnXFx1MDNFQyc6J1xcdTAzRUQnLCdcXHUwM0VFJzonXFx1MDNFRicsJ1xcdTAzRjAnOidcXHUwM0JBJywnXFx1MDNGMSc6J1xcdTAzQzEnLCdcXHUwM0Y0JzonXFx1MDNCOCcsJ1xcdTAzRjUnOidcXHUwM0I1JywnXFx1MDNGNyc6J1xcdTAzRjgnLCdcXHUwM0Y5JzonXFx1MDNGMicsJ1xcdTAzRkEnOidcXHUwM0ZCJywnXFx1MDNGRCc6J1xcdTAzN0InLCdcXHUwM0ZFJzonXFx1MDM3QycsJ1xcdTAzRkYnOidcXHUwMzdEJywnXFx1MDQwMCc6J1xcdTA0NTAnLCdcXHUwNDAxJzonXFx1MDQ1MScsJ1xcdTA0MDInOidcXHUwNDUyJywnXFx1MDQwMyc6J1xcdTA0NTMnLCdcXHUwNDA0JzonXFx1MDQ1NCcsJ1xcdTA0MDUnOidcXHUwNDU1JywnXFx1MDQwNic6J1xcdTA0NTYnLCdcXHUwNDA3JzonXFx1MDQ1NycsJ1xcdTA0MDgnOidcXHUwNDU4JywnXFx1MDQwOSc6J1xcdTA0NTknLCdcXHUwNDBBJzonXFx1MDQ1QScsJ1xcdTA0MEInOidcXHUwNDVCJywnXFx1MDQwQyc6J1xcdTA0NUMnLCdcXHUwNDBEJzonXFx1MDQ1RCcsJ1xcdTA0MEUnOidcXHUwNDVFJywnXFx1MDQwRic6J1xcdTA0NUYnLCdcXHUwNDEwJzonXFx1MDQzMCcsJ1xcdTA0MTEnOidcXHUwNDMxJywnXFx1MDQxMic6J1xcdTA0MzInLCdcXHUwNDEzJzonXFx1MDQzMycsJ1xcdTA0MTQnOidcXHUwNDM0JywnXFx1MDQxNSc6J1xcdTA0MzUnLCdcXHUwNDE2JzonXFx1MDQzNicsJ1xcdTA0MTcnOidcXHUwNDM3JywnXFx1MDQxOCc6J1xcdTA0MzgnLCdcXHUwNDE5JzonXFx1MDQzOScsJ1xcdTA0MUEnOidcXHUwNDNBJywnXFx1MDQxQic6J1xcdTA0M0InLCdcXHUwNDFDJzonXFx1MDQzQycsJ1xcdTA0MUQnOidcXHUwNDNEJywnXFx1MDQxRSc6J1xcdTA0M0UnLCdcXHUwNDFGJzonXFx1MDQzRicsJ1xcdTA0MjAnOidcXHUwNDQwJywnXFx1MDQyMSc6J1xcdTA0NDEnLCdcXHUwNDIyJzonXFx1MDQ0MicsJ1xcdTA0MjMnOidcXHUwNDQzJywnXFx1MDQyNCc6J1xcdTA0NDQnLCdcXHUwNDI1JzonXFx1MDQ0NScsJ1xcdTA0MjYnOidcXHUwNDQ2JywnXFx1MDQyNyc6J1xcdTA0NDcnLCdcXHUwNDI4JzonXFx1MDQ0OCcsJ1xcdTA0MjknOidcXHUwNDQ5JywnXFx1MDQyQSc6J1xcdTA0NEEnLCdcXHUwNDJCJzonXFx1MDQ0QicsJ1xcdTA0MkMnOidcXHUwNDRDJywnXFx1MDQyRCc6J1xcdTA0NEQnLCdcXHUwNDJFJzonXFx1MDQ0RScsJ1xcdTA0MkYnOidcXHUwNDRGJywnXFx1MDQ2MCc6J1xcdTA0NjEnLCdcXHUwNDYyJzonXFx1MDQ2MycsJ1xcdTA0NjQnOidcXHUwNDY1JywnXFx1MDQ2Nic6J1xcdTA0NjcnLCdcXHUwNDY4JzonXFx1MDQ2OScsJ1xcdTA0NkEnOidcXHUwNDZCJywnXFx1MDQ2Qyc6J1xcdTA0NkQnLCdcXHUwNDZFJzonXFx1MDQ2RicsJ1xcdTA0NzAnOidcXHUwNDcxJywnXFx1MDQ3Mic6J1xcdTA0NzMnLCdcXHUwNDc0JzonXFx1MDQ3NScsJ1xcdTA0NzYnOidcXHUwNDc3JywnXFx1MDQ3OCc6J1xcdTA0NzknLCdcXHUwNDdBJzonXFx1MDQ3QicsJ1xcdTA0N0MnOidcXHUwNDdEJywnXFx1MDQ3RSc6J1xcdTA0N0YnLCdcXHUwNDgwJzonXFx1MDQ4MScsJ1xcdTA0OEEnOidcXHUwNDhCJywnXFx1MDQ4Qyc6J1xcdTA0OEQnLCdcXHUwNDhFJzonXFx1MDQ4RicsJ1xcdTA0OTAnOidcXHUwNDkxJywnXFx1MDQ5Mic6J1xcdTA0OTMnLCdcXHUwNDk0JzonXFx1MDQ5NScsJ1xcdTA0OTYnOidcXHUwNDk3JywnXFx1MDQ5OCc6J1xcdTA0OTknLCdcXHUwNDlBJzonXFx1MDQ5QicsJ1xcdTA0OUMnOidcXHUwNDlEJywnXFx1MDQ5RSc6J1xcdTA0OUYnLCdcXHUwNEEwJzonXFx1MDRBMScsJ1xcdTA0QTInOidcXHUwNEEzJywnXFx1MDRBNCc6J1xcdTA0QTUnLCdcXHUwNEE2JzonXFx1MDRBNycsJ1xcdTA0QTgnOidcXHUwNEE5JywnXFx1MDRBQSc6J1xcdTA0QUInLCdcXHUwNEFDJzonXFx1MDRBRCcsJ1xcdTA0QUUnOidcXHUwNEFGJywnXFx1MDRCMCc6J1xcdTA0QjEnLCdcXHUwNEIyJzonXFx1MDRCMycsJ1xcdTA0QjQnOidcXHUwNEI1JywnXFx1MDRCNic6J1xcdTA0QjcnLCdcXHUwNEI4JzonXFx1MDRCOScsJ1xcdTA0QkEnOidcXHUwNEJCJywnXFx1MDRCQyc6J1xcdTA0QkQnLCdcXHUwNEJFJzonXFx1MDRCRicsJ1xcdTA0QzAnOidcXHUwNENGJywnXFx1MDRDMSc6J1xcdTA0QzInLCdcXHUwNEMzJzonXFx1MDRDNCcsJ1xcdTA0QzUnOidcXHUwNEM2JywnXFx1MDRDNyc6J1xcdTA0QzgnLCdcXHUwNEM5JzonXFx1MDRDQScsJ1xcdTA0Q0InOidcXHUwNENDJywnXFx1MDRDRCc6J1xcdTA0Q0UnLCdcXHUwNEQwJzonXFx1MDREMScsJ1xcdTA0RDInOidcXHUwNEQzJywnXFx1MDRENCc6J1xcdTA0RDUnLCdcXHUwNEQ2JzonXFx1MDRENycsJ1xcdTA0RDgnOidcXHUwNEQ5JywnXFx1MDREQSc6J1xcdTA0REInLCdcXHUwNERDJzonXFx1MDRERCcsJ1xcdTA0REUnOidcXHUwNERGJywnXFx1MDRFMCc6J1xcdTA0RTEnLCdcXHUwNEUyJzonXFx1MDRFMycsJ1xcdTA0RTQnOidcXHUwNEU1JywnXFx1MDRFNic6J1xcdTA0RTcnLCdcXHUwNEU4JzonXFx1MDRFOScsJ1xcdTA0RUEnOidcXHUwNEVCJywnXFx1MDRFQyc6J1xcdTA0RUQnLCdcXHUwNEVFJzonXFx1MDRFRicsJ1xcdTA0RjAnOidcXHUwNEYxJywnXFx1MDRGMic6J1xcdTA0RjMnLCdcXHUwNEY0JzonXFx1MDRGNScsJ1xcdTA0RjYnOidcXHUwNEY3JywnXFx1MDRGOCc6J1xcdTA0RjknLCdcXHUwNEZBJzonXFx1MDRGQicsJ1xcdTA0RkMnOidcXHUwNEZEJywnXFx1MDRGRSc6J1xcdTA0RkYnLCdcXHUwNTAwJzonXFx1MDUwMScsJ1xcdTA1MDInOidcXHUwNTAzJywnXFx1MDUwNCc6J1xcdTA1MDUnLCdcXHUwNTA2JzonXFx1MDUwNycsJ1xcdTA1MDgnOidcXHUwNTA5JywnXFx1MDUwQSc6J1xcdTA1MEInLCdcXHUwNTBDJzonXFx1MDUwRCcsJ1xcdTA1MEUnOidcXHUwNTBGJywnXFx1MDUxMCc6J1xcdTA1MTEnLCdcXHUwNTEyJzonXFx1MDUxMycsJ1xcdTA1MTQnOidcXHUwNTE1JywnXFx1MDUxNic6J1xcdTA1MTcnLCdcXHUwNTE4JzonXFx1MDUxOScsJ1xcdTA1MUEnOidcXHUwNTFCJywnXFx1MDUxQyc6J1xcdTA1MUQnLCdcXHUwNTFFJzonXFx1MDUxRicsJ1xcdTA1MjAnOidcXHUwNTIxJywnXFx1MDUyMic6J1xcdTA1MjMnLCdcXHUwNTI0JzonXFx1MDUyNScsJ1xcdTA1MjYnOidcXHUwNTI3JywnXFx1MDUyOCc6J1xcdTA1MjknLCdcXHUwNTJBJzonXFx1MDUyQicsJ1xcdTA1MkMnOidcXHUwNTJEJywnXFx1MDUyRSc6J1xcdTA1MkYnLCdcXHUwNTMxJzonXFx1MDU2MScsJ1xcdTA1MzInOidcXHUwNTYyJywnXFx1MDUzMyc6J1xcdTA1NjMnLCdcXHUwNTM0JzonXFx1MDU2NCcsJ1xcdTA1MzUnOidcXHUwNTY1JywnXFx1MDUzNic6J1xcdTA1NjYnLCdcXHUwNTM3JzonXFx1MDU2NycsJ1xcdTA1MzgnOidcXHUwNTY4JywnXFx1MDUzOSc6J1xcdTA1NjknLCdcXHUwNTNBJzonXFx1MDU2QScsJ1xcdTA1M0InOidcXHUwNTZCJywnXFx1MDUzQyc6J1xcdTA1NkMnLCdcXHUwNTNEJzonXFx1MDU2RCcsJ1xcdTA1M0UnOidcXHUwNTZFJywnXFx1MDUzRic6J1xcdTA1NkYnLCdcXHUwNTQwJzonXFx1MDU3MCcsJ1xcdTA1NDEnOidcXHUwNTcxJywnXFx1MDU0Mic6J1xcdTA1NzInLCdcXHUwNTQzJzonXFx1MDU3MycsJ1xcdTA1NDQnOidcXHUwNTc0JywnXFx1MDU0NSc6J1xcdTA1NzUnLCdcXHUwNTQ2JzonXFx1MDU3NicsJ1xcdTA1NDcnOidcXHUwNTc3JywnXFx1MDU0OCc6J1xcdTA1NzgnLCdcXHUwNTQ5JzonXFx1MDU3OScsJ1xcdTA1NEEnOidcXHUwNTdBJywnXFx1MDU0Qic6J1xcdTA1N0InLCdcXHUwNTRDJzonXFx1MDU3QycsJ1xcdTA1NEQnOidcXHUwNTdEJywnXFx1MDU0RSc6J1xcdTA1N0UnLCdcXHUwNTRGJzonXFx1MDU3RicsJ1xcdTA1NTAnOidcXHUwNTgwJywnXFx1MDU1MSc6J1xcdTA1ODEnLCdcXHUwNTUyJzonXFx1MDU4MicsJ1xcdTA1NTMnOidcXHUwNTgzJywnXFx1MDU1NCc6J1xcdTA1ODQnLCdcXHUwNTU1JzonXFx1MDU4NScsJ1xcdTA1NTYnOidcXHUwNTg2JywnXFx1MTBBMCc6J1xcdTJEMDAnLCdcXHUxMEExJzonXFx1MkQwMScsJ1xcdTEwQTInOidcXHUyRDAyJywnXFx1MTBBMyc6J1xcdTJEMDMnLCdcXHUxMEE0JzonXFx1MkQwNCcsJ1xcdTEwQTUnOidcXHUyRDA1JywnXFx1MTBBNic6J1xcdTJEMDYnLCdcXHUxMEE3JzonXFx1MkQwNycsJ1xcdTEwQTgnOidcXHUyRDA4JywnXFx1MTBBOSc6J1xcdTJEMDknLCdcXHUxMEFBJzonXFx1MkQwQScsJ1xcdTEwQUInOidcXHUyRDBCJywnXFx1MTBBQyc6J1xcdTJEMEMnLCdcXHUxMEFEJzonXFx1MkQwRCcsJ1xcdTEwQUUnOidcXHUyRDBFJywnXFx1MTBBRic6J1xcdTJEMEYnLCdcXHUxMEIwJzonXFx1MkQxMCcsJ1xcdTEwQjEnOidcXHUyRDExJywnXFx1MTBCMic6J1xcdTJEMTInLCdcXHUxMEIzJzonXFx1MkQxMycsJ1xcdTEwQjQnOidcXHUyRDE0JywnXFx1MTBCNSc6J1xcdTJEMTUnLCdcXHUxMEI2JzonXFx1MkQxNicsJ1xcdTEwQjcnOidcXHUyRDE3JywnXFx1MTBCOCc6J1xcdTJEMTgnLCdcXHUxMEI5JzonXFx1MkQxOScsJ1xcdTEwQkEnOidcXHUyRDFBJywnXFx1MTBCQic6J1xcdTJEMUInLCdcXHUxMEJDJzonXFx1MkQxQycsJ1xcdTEwQkQnOidcXHUyRDFEJywnXFx1MTBCRSc6J1xcdTJEMUUnLCdcXHUxMEJGJzonXFx1MkQxRicsJ1xcdTEwQzAnOidcXHUyRDIwJywnXFx1MTBDMSc6J1xcdTJEMjEnLCdcXHUxMEMyJzonXFx1MkQyMicsJ1xcdTEwQzMnOidcXHUyRDIzJywnXFx1MTBDNCc6J1xcdTJEMjQnLCdcXHUxMEM1JzonXFx1MkQyNScsJ1xcdTEwQzcnOidcXHUyRDI3JywnXFx1MTBDRCc6J1xcdTJEMkQnLCdcXHUxRTAwJzonXFx1MUUwMScsJ1xcdTFFMDInOidcXHUxRTAzJywnXFx1MUUwNCc6J1xcdTFFMDUnLCdcXHUxRTA2JzonXFx1MUUwNycsJ1xcdTFFMDgnOidcXHUxRTA5JywnXFx1MUUwQSc6J1xcdTFFMEInLCdcXHUxRTBDJzonXFx1MUUwRCcsJ1xcdTFFMEUnOidcXHUxRTBGJywnXFx1MUUxMCc6J1xcdTFFMTEnLCdcXHUxRTEyJzonXFx1MUUxMycsJ1xcdTFFMTQnOidcXHUxRTE1JywnXFx1MUUxNic6J1xcdTFFMTcnLCdcXHUxRTE4JzonXFx1MUUxOScsJ1xcdTFFMUEnOidcXHUxRTFCJywnXFx1MUUxQyc6J1xcdTFFMUQnLCdcXHUxRTFFJzonXFx1MUUxRicsJ1xcdTFFMjAnOidcXHUxRTIxJywnXFx1MUUyMic6J1xcdTFFMjMnLCdcXHUxRTI0JzonXFx1MUUyNScsJ1xcdTFFMjYnOidcXHUxRTI3JywnXFx1MUUyOCc6J1xcdTFFMjknLCdcXHUxRTJBJzonXFx1MUUyQicsJ1xcdTFFMkMnOidcXHUxRTJEJywnXFx1MUUyRSc6J1xcdTFFMkYnLCdcXHUxRTMwJzonXFx1MUUzMScsJ1xcdTFFMzInOidcXHUxRTMzJywnXFx1MUUzNCc6J1xcdTFFMzUnLCdcXHUxRTM2JzonXFx1MUUzNycsJ1xcdTFFMzgnOidcXHUxRTM5JywnXFx1MUUzQSc6J1xcdTFFM0InLCdcXHUxRTNDJzonXFx1MUUzRCcsJ1xcdTFFM0UnOidcXHUxRTNGJywnXFx1MUU0MCc6J1xcdTFFNDEnLCdcXHUxRTQyJzonXFx1MUU0MycsJ1xcdTFFNDQnOidcXHUxRTQ1JywnXFx1MUU0Nic6J1xcdTFFNDcnLCdcXHUxRTQ4JzonXFx1MUU0OScsJ1xcdTFFNEEnOidcXHUxRTRCJywnXFx1MUU0Qyc6J1xcdTFFNEQnLCdcXHUxRTRFJzonXFx1MUU0RicsJ1xcdTFFNTAnOidcXHUxRTUxJywnXFx1MUU1Mic6J1xcdTFFNTMnLCdcXHUxRTU0JzonXFx1MUU1NScsJ1xcdTFFNTYnOidcXHUxRTU3JywnXFx1MUU1OCc6J1xcdTFFNTknLCdcXHUxRTVBJzonXFx1MUU1QicsJ1xcdTFFNUMnOidcXHUxRTVEJywnXFx1MUU1RSc6J1xcdTFFNUYnLCdcXHUxRTYwJzonXFx1MUU2MScsJ1xcdTFFNjInOidcXHUxRTYzJywnXFx1MUU2NCc6J1xcdTFFNjUnLCdcXHUxRTY2JzonXFx1MUU2NycsJ1xcdTFFNjgnOidcXHUxRTY5JywnXFx1MUU2QSc6J1xcdTFFNkInLCdcXHUxRTZDJzonXFx1MUU2RCcsJ1xcdTFFNkUnOidcXHUxRTZGJywnXFx1MUU3MCc6J1xcdTFFNzEnLCdcXHUxRTcyJzonXFx1MUU3MycsJ1xcdTFFNzQnOidcXHUxRTc1JywnXFx1MUU3Nic6J1xcdTFFNzcnLCdcXHUxRTc4JzonXFx1MUU3OScsJ1xcdTFFN0EnOidcXHUxRTdCJywnXFx1MUU3Qyc6J1xcdTFFN0QnLCdcXHUxRTdFJzonXFx1MUU3RicsJ1xcdTFFODAnOidcXHUxRTgxJywnXFx1MUU4Mic6J1xcdTFFODMnLCdcXHUxRTg0JzonXFx1MUU4NScsJ1xcdTFFODYnOidcXHUxRTg3JywnXFx1MUU4OCc6J1xcdTFFODknLCdcXHUxRThBJzonXFx1MUU4QicsJ1xcdTFFOEMnOidcXHUxRThEJywnXFx1MUU4RSc6J1xcdTFFOEYnLCdcXHUxRTkwJzonXFx1MUU5MScsJ1xcdTFFOTInOidcXHUxRTkzJywnXFx1MUU5NCc6J1xcdTFFOTUnLCdcXHUxRTlCJzonXFx1MUU2MScsJ1xcdTFFQTAnOidcXHUxRUExJywnXFx1MUVBMic6J1xcdTFFQTMnLCdcXHUxRUE0JzonXFx1MUVBNScsJ1xcdTFFQTYnOidcXHUxRUE3JywnXFx1MUVBOCc6J1xcdTFFQTknLCdcXHUxRUFBJzonXFx1MUVBQicsJ1xcdTFFQUMnOidcXHUxRUFEJywnXFx1MUVBRSc6J1xcdTFFQUYnLCdcXHUxRUIwJzonXFx1MUVCMScsJ1xcdTFFQjInOidcXHUxRUIzJywnXFx1MUVCNCc6J1xcdTFFQjUnLCdcXHUxRUI2JzonXFx1MUVCNycsJ1xcdTFFQjgnOidcXHUxRUI5JywnXFx1MUVCQSc6J1xcdTFFQkInLCdcXHUxRUJDJzonXFx1MUVCRCcsJ1xcdTFFQkUnOidcXHUxRUJGJywnXFx1MUVDMCc6J1xcdTFFQzEnLCdcXHUxRUMyJzonXFx1MUVDMycsJ1xcdTFFQzQnOidcXHUxRUM1JywnXFx1MUVDNic6J1xcdTFFQzcnLCdcXHUxRUM4JzonXFx1MUVDOScsJ1xcdTFFQ0EnOidcXHUxRUNCJywnXFx1MUVDQyc6J1xcdTFFQ0QnLCdcXHUxRUNFJzonXFx1MUVDRicsJ1xcdTFFRDAnOidcXHUxRUQxJywnXFx1MUVEMic6J1xcdTFFRDMnLCdcXHUxRUQ0JzonXFx1MUVENScsJ1xcdTFFRDYnOidcXHUxRUQ3JywnXFx1MUVEOCc6J1xcdTFFRDknLCdcXHUxRURBJzonXFx1MUVEQicsJ1xcdTFFREMnOidcXHUxRUREJywnXFx1MUVERSc6J1xcdTFFREYnLCdcXHUxRUUwJzonXFx1MUVFMScsJ1xcdTFFRTInOidcXHUxRUUzJywnXFx1MUVFNCc6J1xcdTFFRTUnLCdcXHUxRUU2JzonXFx1MUVFNycsJ1xcdTFFRTgnOidcXHUxRUU5JywnXFx1MUVFQSc6J1xcdTFFRUInLCdcXHUxRUVDJzonXFx1MUVFRCcsJ1xcdTFFRUUnOidcXHUxRUVGJywnXFx1MUVGMCc6J1xcdTFFRjEnLCdcXHUxRUYyJzonXFx1MUVGMycsJ1xcdTFFRjQnOidcXHUxRUY1JywnXFx1MUVGNic6J1xcdTFFRjcnLCdcXHUxRUY4JzonXFx1MUVGOScsJ1xcdTFFRkEnOidcXHUxRUZCJywnXFx1MUVGQyc6J1xcdTFFRkQnLCdcXHUxRUZFJzonXFx1MUVGRicsJ1xcdTFGMDgnOidcXHUxRjAwJywnXFx1MUYwOSc6J1xcdTFGMDEnLCdcXHUxRjBBJzonXFx1MUYwMicsJ1xcdTFGMEInOidcXHUxRjAzJywnXFx1MUYwQyc6J1xcdTFGMDQnLCdcXHUxRjBEJzonXFx1MUYwNScsJ1xcdTFGMEUnOidcXHUxRjA2JywnXFx1MUYwRic6J1xcdTFGMDcnLCdcXHUxRjE4JzonXFx1MUYxMCcsJ1xcdTFGMTknOidcXHUxRjExJywnXFx1MUYxQSc6J1xcdTFGMTInLCdcXHUxRjFCJzonXFx1MUYxMycsJ1xcdTFGMUMnOidcXHUxRjE0JywnXFx1MUYxRCc6J1xcdTFGMTUnLCdcXHUxRjI4JzonXFx1MUYyMCcsJ1xcdTFGMjknOidcXHUxRjIxJywnXFx1MUYyQSc6J1xcdTFGMjInLCdcXHUxRjJCJzonXFx1MUYyMycsJ1xcdTFGMkMnOidcXHUxRjI0JywnXFx1MUYyRCc6J1xcdTFGMjUnLCdcXHUxRjJFJzonXFx1MUYyNicsJ1xcdTFGMkYnOidcXHUxRjI3JywnXFx1MUYzOCc6J1xcdTFGMzAnLCdcXHUxRjM5JzonXFx1MUYzMScsJ1xcdTFGM0EnOidcXHUxRjMyJywnXFx1MUYzQic6J1xcdTFGMzMnLCdcXHUxRjNDJzonXFx1MUYzNCcsJ1xcdTFGM0QnOidcXHUxRjM1JywnXFx1MUYzRSc6J1xcdTFGMzYnLCdcXHUxRjNGJzonXFx1MUYzNycsJ1xcdTFGNDgnOidcXHUxRjQwJywnXFx1MUY0OSc6J1xcdTFGNDEnLCdcXHUxRjRBJzonXFx1MUY0MicsJ1xcdTFGNEInOidcXHUxRjQzJywnXFx1MUY0Qyc6J1xcdTFGNDQnLCdcXHUxRjREJzonXFx1MUY0NScsJ1xcdTFGNTknOidcXHUxRjUxJywnXFx1MUY1Qic6J1xcdTFGNTMnLCdcXHUxRjVEJzonXFx1MUY1NScsJ1xcdTFGNUYnOidcXHUxRjU3JywnXFx1MUY2OCc6J1xcdTFGNjAnLCdcXHUxRjY5JzonXFx1MUY2MScsJ1xcdTFGNkEnOidcXHUxRjYyJywnXFx1MUY2Qic6J1xcdTFGNjMnLCdcXHUxRjZDJzonXFx1MUY2NCcsJ1xcdTFGNkQnOidcXHUxRjY1JywnXFx1MUY2RSc6J1xcdTFGNjYnLCdcXHUxRjZGJzonXFx1MUY2NycsJ1xcdTFGQjgnOidcXHUxRkIwJywnXFx1MUZCOSc6J1xcdTFGQjEnLCdcXHUxRkJBJzonXFx1MUY3MCcsJ1xcdTFGQkInOidcXHUxRjcxJywnXFx1MUZCRSc6J1xcdTAzQjknLCdcXHUxRkM4JzonXFx1MUY3MicsJ1xcdTFGQzknOidcXHUxRjczJywnXFx1MUZDQSc6J1xcdTFGNzQnLCdcXHUxRkNCJzonXFx1MUY3NScsJ1xcdTFGRDgnOidcXHUxRkQwJywnXFx1MUZEOSc6J1xcdTFGRDEnLCdcXHUxRkRBJzonXFx1MUY3NicsJ1xcdTFGREInOidcXHUxRjc3JywnXFx1MUZFOCc6J1xcdTFGRTAnLCdcXHUxRkU5JzonXFx1MUZFMScsJ1xcdTFGRUEnOidcXHUxRjdBJywnXFx1MUZFQic6J1xcdTFGN0InLCdcXHUxRkVDJzonXFx1MUZFNScsJ1xcdTFGRjgnOidcXHUxRjc4JywnXFx1MUZGOSc6J1xcdTFGNzknLCdcXHUxRkZBJzonXFx1MUY3QycsJ1xcdTFGRkInOidcXHUxRjdEJywnXFx1MjEyNic6J1xcdTAzQzknLCdcXHUyMTJBJzonaycsJ1xcdTIxMkInOidcXHhFNScsJ1xcdTIxMzInOidcXHUyMTRFJywnXFx1MjE2MCc6J1xcdTIxNzAnLCdcXHUyMTYxJzonXFx1MjE3MScsJ1xcdTIxNjInOidcXHUyMTcyJywnXFx1MjE2Myc6J1xcdTIxNzMnLCdcXHUyMTY0JzonXFx1MjE3NCcsJ1xcdTIxNjUnOidcXHUyMTc1JywnXFx1MjE2Nic6J1xcdTIxNzYnLCdcXHUyMTY3JzonXFx1MjE3NycsJ1xcdTIxNjgnOidcXHUyMTc4JywnXFx1MjE2OSc6J1xcdTIxNzknLCdcXHUyMTZBJzonXFx1MjE3QScsJ1xcdTIxNkInOidcXHUyMTdCJywnXFx1MjE2Qyc6J1xcdTIxN0MnLCdcXHUyMTZEJzonXFx1MjE3RCcsJ1xcdTIxNkUnOidcXHUyMTdFJywnXFx1MjE2Ric6J1xcdTIxN0YnLCdcXHUyMTgzJzonXFx1MjE4NCcsJ1xcdTI0QjYnOidcXHUyNEQwJywnXFx1MjRCNyc6J1xcdTI0RDEnLCdcXHUyNEI4JzonXFx1MjREMicsJ1xcdTI0QjknOidcXHUyNEQzJywnXFx1MjRCQSc6J1xcdTI0RDQnLCdcXHUyNEJCJzonXFx1MjRENScsJ1xcdTI0QkMnOidcXHUyNEQ2JywnXFx1MjRCRCc6J1xcdTI0RDcnLCdcXHUyNEJFJzonXFx1MjREOCcsJ1xcdTI0QkYnOidcXHUyNEQ5JywnXFx1MjRDMCc6J1xcdTI0REEnLCdcXHUyNEMxJzonXFx1MjREQicsJ1xcdTI0QzInOidcXHUyNERDJywnXFx1MjRDMyc6J1xcdTI0REQnLCdcXHUyNEM0JzonXFx1MjRERScsJ1xcdTI0QzUnOidcXHUyNERGJywnXFx1MjRDNic6J1xcdTI0RTAnLCdcXHUyNEM3JzonXFx1MjRFMScsJ1xcdTI0QzgnOidcXHUyNEUyJywnXFx1MjRDOSc6J1xcdTI0RTMnLCdcXHUyNENBJzonXFx1MjRFNCcsJ1xcdTI0Q0InOidcXHUyNEU1JywnXFx1MjRDQyc6J1xcdTI0RTYnLCdcXHUyNENEJzonXFx1MjRFNycsJ1xcdTI0Q0UnOidcXHUyNEU4JywnXFx1MjRDRic6J1xcdTI0RTknLCdcXHUyQzAwJzonXFx1MkMzMCcsJ1xcdTJDMDEnOidcXHUyQzMxJywnXFx1MkMwMic6J1xcdTJDMzInLCdcXHUyQzAzJzonXFx1MkMzMycsJ1xcdTJDMDQnOidcXHUyQzM0JywnXFx1MkMwNSc6J1xcdTJDMzUnLCdcXHUyQzA2JzonXFx1MkMzNicsJ1xcdTJDMDcnOidcXHUyQzM3JywnXFx1MkMwOCc6J1xcdTJDMzgnLCdcXHUyQzA5JzonXFx1MkMzOScsJ1xcdTJDMEEnOidcXHUyQzNBJywnXFx1MkMwQic6J1xcdTJDM0InLCdcXHUyQzBDJzonXFx1MkMzQycsJ1xcdTJDMEQnOidcXHUyQzNEJywnXFx1MkMwRSc6J1xcdTJDM0UnLCdcXHUyQzBGJzonXFx1MkMzRicsJ1xcdTJDMTAnOidcXHUyQzQwJywnXFx1MkMxMSc6J1xcdTJDNDEnLCdcXHUyQzEyJzonXFx1MkM0MicsJ1xcdTJDMTMnOidcXHUyQzQzJywnXFx1MkMxNCc6J1xcdTJDNDQnLCdcXHUyQzE1JzonXFx1MkM0NScsJ1xcdTJDMTYnOidcXHUyQzQ2JywnXFx1MkMxNyc6J1xcdTJDNDcnLCdcXHUyQzE4JzonXFx1MkM0OCcsJ1xcdTJDMTknOidcXHUyQzQ5JywnXFx1MkMxQSc6J1xcdTJDNEEnLCdcXHUyQzFCJzonXFx1MkM0QicsJ1xcdTJDMUMnOidcXHUyQzRDJywnXFx1MkMxRCc6J1xcdTJDNEQnLCdcXHUyQzFFJzonXFx1MkM0RScsJ1xcdTJDMUYnOidcXHUyQzRGJywnXFx1MkMyMCc6J1xcdTJDNTAnLCdcXHUyQzIxJzonXFx1MkM1MScsJ1xcdTJDMjInOidcXHUyQzUyJywnXFx1MkMyMyc6J1xcdTJDNTMnLCdcXHUyQzI0JzonXFx1MkM1NCcsJ1xcdTJDMjUnOidcXHUyQzU1JywnXFx1MkMyNic6J1xcdTJDNTYnLCdcXHUyQzI3JzonXFx1MkM1NycsJ1xcdTJDMjgnOidcXHUyQzU4JywnXFx1MkMyOSc6J1xcdTJDNTknLCdcXHUyQzJBJzonXFx1MkM1QScsJ1xcdTJDMkInOidcXHUyQzVCJywnXFx1MkMyQyc6J1xcdTJDNUMnLCdcXHUyQzJEJzonXFx1MkM1RCcsJ1xcdTJDMkUnOidcXHUyQzVFJywnXFx1MkM2MCc6J1xcdTJDNjEnLCdcXHUyQzYyJzonXFx1MDI2QicsJ1xcdTJDNjMnOidcXHUxRDdEJywnXFx1MkM2NCc6J1xcdTAyN0QnLCdcXHUyQzY3JzonXFx1MkM2OCcsJ1xcdTJDNjknOidcXHUyQzZBJywnXFx1MkM2Qic6J1xcdTJDNkMnLCdcXHUyQzZEJzonXFx1MDI1MScsJ1xcdTJDNkUnOidcXHUwMjcxJywnXFx1MkM2Ric6J1xcdTAyNTAnLCdcXHUyQzcwJzonXFx1MDI1MicsJ1xcdTJDNzInOidcXHUyQzczJywnXFx1MkM3NSc6J1xcdTJDNzYnLCdcXHUyQzdFJzonXFx1MDIzRicsJ1xcdTJDN0YnOidcXHUwMjQwJywnXFx1MkM4MCc6J1xcdTJDODEnLCdcXHUyQzgyJzonXFx1MkM4MycsJ1xcdTJDODQnOidcXHUyQzg1JywnXFx1MkM4Nic6J1xcdTJDODcnLCdcXHUyQzg4JzonXFx1MkM4OScsJ1xcdTJDOEEnOidcXHUyQzhCJywnXFx1MkM4Qyc6J1xcdTJDOEQnLCdcXHUyQzhFJzonXFx1MkM4RicsJ1xcdTJDOTAnOidcXHUyQzkxJywnXFx1MkM5Mic6J1xcdTJDOTMnLCdcXHUyQzk0JzonXFx1MkM5NScsJ1xcdTJDOTYnOidcXHUyQzk3JywnXFx1MkM5OCc6J1xcdTJDOTknLCdcXHUyQzlBJzonXFx1MkM5QicsJ1xcdTJDOUMnOidcXHUyQzlEJywnXFx1MkM5RSc6J1xcdTJDOUYnLCdcXHUyQ0EwJzonXFx1MkNBMScsJ1xcdTJDQTInOidcXHUyQ0EzJywnXFx1MkNBNCc6J1xcdTJDQTUnLCdcXHUyQ0E2JzonXFx1MkNBNycsJ1xcdTJDQTgnOidcXHUyQ0E5JywnXFx1MkNBQSc6J1xcdTJDQUInLCdcXHUyQ0FDJzonXFx1MkNBRCcsJ1xcdTJDQUUnOidcXHUyQ0FGJywnXFx1MkNCMCc6J1xcdTJDQjEnLCdcXHUyQ0IyJzonXFx1MkNCMycsJ1xcdTJDQjQnOidcXHUyQ0I1JywnXFx1MkNCNic6J1xcdTJDQjcnLCdcXHUyQ0I4JzonXFx1MkNCOScsJ1xcdTJDQkEnOidcXHUyQ0JCJywnXFx1MkNCQyc6J1xcdTJDQkQnLCdcXHUyQ0JFJzonXFx1MkNCRicsJ1xcdTJDQzAnOidcXHUyQ0MxJywnXFx1MkNDMic6J1xcdTJDQzMnLCdcXHUyQ0M0JzonXFx1MkNDNScsJ1xcdTJDQzYnOidcXHUyQ0M3JywnXFx1MkNDOCc6J1xcdTJDQzknLCdcXHUyQ0NBJzonXFx1MkNDQicsJ1xcdTJDQ0MnOidcXHUyQ0NEJywnXFx1MkNDRSc6J1xcdTJDQ0YnLCdcXHUyQ0QwJzonXFx1MkNEMScsJ1xcdTJDRDInOidcXHUyQ0QzJywnXFx1MkNENCc6J1xcdTJDRDUnLCdcXHUyQ0Q2JzonXFx1MkNENycsJ1xcdTJDRDgnOidcXHUyQ0Q5JywnXFx1MkNEQSc6J1xcdTJDREInLCdcXHUyQ0RDJzonXFx1MkNERCcsJ1xcdTJDREUnOidcXHUyQ0RGJywnXFx1MkNFMCc6J1xcdTJDRTEnLCdcXHUyQ0UyJzonXFx1MkNFMycsJ1xcdTJDRUInOidcXHUyQ0VDJywnXFx1MkNFRCc6J1xcdTJDRUUnLCdcXHUyQ0YyJzonXFx1MkNGMycsJ1xcdUE2NDAnOidcXHVBNjQxJywnXFx1QTY0Mic6J1xcdUE2NDMnLCdcXHVBNjQ0JzonXFx1QTY0NScsJ1xcdUE2NDYnOidcXHVBNjQ3JywnXFx1QTY0OCc6J1xcdUE2NDknLCdcXHVBNjRBJzonXFx1QTY0QicsJ1xcdUE2NEMnOidcXHVBNjREJywnXFx1QTY0RSc6J1xcdUE2NEYnLCdcXHVBNjUwJzonXFx1QTY1MScsJ1xcdUE2NTInOidcXHVBNjUzJywnXFx1QTY1NCc6J1xcdUE2NTUnLCdcXHVBNjU2JzonXFx1QTY1NycsJ1xcdUE2NTgnOidcXHVBNjU5JywnXFx1QTY1QSc6J1xcdUE2NUInLCdcXHVBNjVDJzonXFx1QTY1RCcsJ1xcdUE2NUUnOidcXHVBNjVGJywnXFx1QTY2MCc6J1xcdUE2NjEnLCdcXHVBNjYyJzonXFx1QTY2MycsJ1xcdUE2NjQnOidcXHVBNjY1JywnXFx1QTY2Nic6J1xcdUE2NjcnLCdcXHVBNjY4JzonXFx1QTY2OScsJ1xcdUE2NkEnOidcXHVBNjZCJywnXFx1QTY2Qyc6J1xcdUE2NkQnLCdcXHVBNjgwJzonXFx1QTY4MScsJ1xcdUE2ODInOidcXHVBNjgzJywnXFx1QTY4NCc6J1xcdUE2ODUnLCdcXHVBNjg2JzonXFx1QTY4NycsJ1xcdUE2ODgnOidcXHVBNjg5JywnXFx1QTY4QSc6J1xcdUE2OEInLCdcXHVBNjhDJzonXFx1QTY4RCcsJ1xcdUE2OEUnOidcXHVBNjhGJywnXFx1QTY5MCc6J1xcdUE2OTEnLCdcXHVBNjkyJzonXFx1QTY5MycsJ1xcdUE2OTQnOidcXHVBNjk1JywnXFx1QTY5Nic6J1xcdUE2OTcnLCdcXHVBNjk4JzonXFx1QTY5OScsJ1xcdUE2OUEnOidcXHVBNjlCJywnXFx1QTcyMic6J1xcdUE3MjMnLCdcXHVBNzI0JzonXFx1QTcyNScsJ1xcdUE3MjYnOidcXHVBNzI3JywnXFx1QTcyOCc6J1xcdUE3MjknLCdcXHVBNzJBJzonXFx1QTcyQicsJ1xcdUE3MkMnOidcXHVBNzJEJywnXFx1QTcyRSc6J1xcdUE3MkYnLCdcXHVBNzMyJzonXFx1QTczMycsJ1xcdUE3MzQnOidcXHVBNzM1JywnXFx1QTczNic6J1xcdUE3MzcnLCdcXHVBNzM4JzonXFx1QTczOScsJ1xcdUE3M0EnOidcXHVBNzNCJywnXFx1QTczQyc6J1xcdUE3M0QnLCdcXHVBNzNFJzonXFx1QTczRicsJ1xcdUE3NDAnOidcXHVBNzQxJywnXFx1QTc0Mic6J1xcdUE3NDMnLCdcXHVBNzQ0JzonXFx1QTc0NScsJ1xcdUE3NDYnOidcXHVBNzQ3JywnXFx1QTc0OCc6J1xcdUE3NDknLCdcXHVBNzRBJzonXFx1QTc0QicsJ1xcdUE3NEMnOidcXHVBNzREJywnXFx1QTc0RSc6J1xcdUE3NEYnLCdcXHVBNzUwJzonXFx1QTc1MScsJ1xcdUE3NTInOidcXHVBNzUzJywnXFx1QTc1NCc6J1xcdUE3NTUnLCdcXHVBNzU2JzonXFx1QTc1NycsJ1xcdUE3NTgnOidcXHVBNzU5JywnXFx1QTc1QSc6J1xcdUE3NUInLCdcXHVBNzVDJzonXFx1QTc1RCcsJ1xcdUE3NUUnOidcXHVBNzVGJywnXFx1QTc2MCc6J1xcdUE3NjEnLCdcXHVBNzYyJzonXFx1QTc2MycsJ1xcdUE3NjQnOidcXHVBNzY1JywnXFx1QTc2Nic6J1xcdUE3NjcnLCdcXHVBNzY4JzonXFx1QTc2OScsJ1xcdUE3NkEnOidcXHVBNzZCJywnXFx1QTc2Qyc6J1xcdUE3NkQnLCdcXHVBNzZFJzonXFx1QTc2RicsJ1xcdUE3NzknOidcXHVBNzdBJywnXFx1QTc3Qic6J1xcdUE3N0MnLCdcXHVBNzdEJzonXFx1MUQ3OScsJ1xcdUE3N0UnOidcXHVBNzdGJywnXFx1QTc4MCc6J1xcdUE3ODEnLCdcXHVBNzgyJzonXFx1QTc4MycsJ1xcdUE3ODQnOidcXHVBNzg1JywnXFx1QTc4Nic6J1xcdUE3ODcnLCdcXHVBNzhCJzonXFx1QTc4QycsJ1xcdUE3OEQnOidcXHUwMjY1JywnXFx1QTc5MCc6J1xcdUE3OTEnLCdcXHVBNzkyJzonXFx1QTc5MycsJ1xcdUE3OTYnOidcXHVBNzk3JywnXFx1QTc5OCc6J1xcdUE3OTknLCdcXHVBNzlBJzonXFx1QTc5QicsJ1xcdUE3OUMnOidcXHVBNzlEJywnXFx1QTc5RSc6J1xcdUE3OUYnLCdcXHVBN0EwJzonXFx1QTdBMScsJ1xcdUE3QTInOidcXHVBN0EzJywnXFx1QTdBNCc6J1xcdUE3QTUnLCdcXHVBN0E2JzonXFx1QTdBNycsJ1xcdUE3QTgnOidcXHVBN0E5JywnXFx1QTdBQSc6J1xcdTAyNjYnLCdcXHVBN0FCJzonXFx1MDI1QycsJ1xcdUE3QUMnOidcXHUwMjYxJywnXFx1QTdBRCc6J1xcdTAyNkMnLCdcXHVBN0IwJzonXFx1MDI5RScsJ1xcdUE3QjEnOidcXHUwMjg3JywnXFx1RkYyMSc6J1xcdUZGNDEnLCdcXHVGRjIyJzonXFx1RkY0MicsJ1xcdUZGMjMnOidcXHVGRjQzJywnXFx1RkYyNCc6J1xcdUZGNDQnLCdcXHVGRjI1JzonXFx1RkY0NScsJ1xcdUZGMjYnOidcXHVGRjQ2JywnXFx1RkYyNyc6J1xcdUZGNDcnLCdcXHVGRjI4JzonXFx1RkY0OCcsJ1xcdUZGMjknOidcXHVGRjQ5JywnXFx1RkYyQSc6J1xcdUZGNEEnLCdcXHVGRjJCJzonXFx1RkY0QicsJ1xcdUZGMkMnOidcXHVGRjRDJywnXFx1RkYyRCc6J1xcdUZGNEQnLCdcXHVGRjJFJzonXFx1RkY0RScsJ1xcdUZGMkYnOidcXHVGRjRGJywnXFx1RkYzMCc6J1xcdUZGNTAnLCdcXHVGRjMxJzonXFx1RkY1MScsJ1xcdUZGMzInOidcXHVGRjUyJywnXFx1RkYzMyc6J1xcdUZGNTMnLCdcXHVGRjM0JzonXFx1RkY1NCcsJ1xcdUZGMzUnOidcXHVGRjU1JywnXFx1RkYzNic6J1xcdUZGNTYnLCdcXHVGRjM3JzonXFx1RkY1NycsJ1xcdUZGMzgnOidcXHVGRjU4JywnXFx1RkYzOSc6J1xcdUZGNTknLCdcXHVGRjNBJzonXFx1RkY1QScsJ1xcdUQ4MDFcXHVEQzAwJzonXFx1RDgwMVxcdURDMjgnLCdcXHVEODAxXFx1REMwMSc6J1xcdUQ4MDFcXHVEQzI5JywnXFx1RDgwMVxcdURDMDInOidcXHVEODAxXFx1REMyQScsJ1xcdUQ4MDFcXHVEQzAzJzonXFx1RDgwMVxcdURDMkInLCdcXHVEODAxXFx1REMwNCc6J1xcdUQ4MDFcXHVEQzJDJywnXFx1RDgwMVxcdURDMDUnOidcXHVEODAxXFx1REMyRCcsJ1xcdUQ4MDFcXHVEQzA2JzonXFx1RDgwMVxcdURDMkUnLCdcXHVEODAxXFx1REMwNyc6J1xcdUQ4MDFcXHVEQzJGJywnXFx1RDgwMVxcdURDMDgnOidcXHVEODAxXFx1REMzMCcsJ1xcdUQ4MDFcXHVEQzA5JzonXFx1RDgwMVxcdURDMzEnLCdcXHVEODAxXFx1REMwQSc6J1xcdUQ4MDFcXHVEQzMyJywnXFx1RDgwMVxcdURDMEInOidcXHVEODAxXFx1REMzMycsJ1xcdUQ4MDFcXHVEQzBDJzonXFx1RDgwMVxcdURDMzQnLCdcXHVEODAxXFx1REMwRCc6J1xcdUQ4MDFcXHVEQzM1JywnXFx1RDgwMVxcdURDMEUnOidcXHVEODAxXFx1REMzNicsJ1xcdUQ4MDFcXHVEQzBGJzonXFx1RDgwMVxcdURDMzcnLCdcXHVEODAxXFx1REMxMCc6J1xcdUQ4MDFcXHVEQzM4JywnXFx1RDgwMVxcdURDMTEnOidcXHVEODAxXFx1REMzOScsJ1xcdUQ4MDFcXHVEQzEyJzonXFx1RDgwMVxcdURDM0EnLCdcXHVEODAxXFx1REMxMyc6J1xcdUQ4MDFcXHVEQzNCJywnXFx1RDgwMVxcdURDMTQnOidcXHVEODAxXFx1REMzQycsJ1xcdUQ4MDFcXHVEQzE1JzonXFx1RDgwMVxcdURDM0QnLCdcXHVEODAxXFx1REMxNic6J1xcdUQ4MDFcXHVEQzNFJywnXFx1RDgwMVxcdURDMTcnOidcXHVEODAxXFx1REMzRicsJ1xcdUQ4MDFcXHVEQzE4JzonXFx1RDgwMVxcdURDNDAnLCdcXHVEODAxXFx1REMxOSc6J1xcdUQ4MDFcXHVEQzQxJywnXFx1RDgwMVxcdURDMUEnOidcXHVEODAxXFx1REM0MicsJ1xcdUQ4MDFcXHVEQzFCJzonXFx1RDgwMVxcdURDNDMnLCdcXHVEODAxXFx1REMxQyc6J1xcdUQ4MDFcXHVEQzQ0JywnXFx1RDgwMVxcdURDMUQnOidcXHVEODAxXFx1REM0NScsJ1xcdUQ4MDFcXHVEQzFFJzonXFx1RDgwMVxcdURDNDYnLCdcXHVEODAxXFx1REMxRic6J1xcdUQ4MDFcXHVEQzQ3JywnXFx1RDgwMVxcdURDMjAnOidcXHVEODAxXFx1REM0OCcsJ1xcdUQ4MDFcXHVEQzIxJzonXFx1RDgwMVxcdURDNDknLCdcXHVEODAxXFx1REMyMic6J1xcdUQ4MDFcXHVEQzRBJywnXFx1RDgwMVxcdURDMjMnOidcXHVEODAxXFx1REM0QicsJ1xcdUQ4MDFcXHVEQzI0JzonXFx1RDgwMVxcdURDNEMnLCdcXHVEODAxXFx1REMyNSc6J1xcdUQ4MDFcXHVEQzREJywnXFx1RDgwMVxcdURDMjYnOidcXHVEODAxXFx1REM0RScsJ1xcdUQ4MDFcXHVEQzI3JzonXFx1RDgwMVxcdURDNEYnLCdcXHVEODA2XFx1RENBMCc6J1xcdUQ4MDZcXHVEQ0MwJywnXFx1RDgwNlxcdURDQTEnOidcXHVEODA2XFx1RENDMScsJ1xcdUQ4MDZcXHVEQ0EyJzonXFx1RDgwNlxcdURDQzInLCdcXHVEODA2XFx1RENBMyc6J1xcdUQ4MDZcXHVEQ0MzJywnXFx1RDgwNlxcdURDQTQnOidcXHVEODA2XFx1RENDNCcsJ1xcdUQ4MDZcXHVEQ0E1JzonXFx1RDgwNlxcdURDQzUnLCdcXHVEODA2XFx1RENBNic6J1xcdUQ4MDZcXHVEQ0M2JywnXFx1RDgwNlxcdURDQTcnOidcXHVEODA2XFx1RENDNycsJ1xcdUQ4MDZcXHVEQ0E4JzonXFx1RDgwNlxcdURDQzgnLCdcXHVEODA2XFx1RENBOSc6J1xcdUQ4MDZcXHVEQ0M5JywnXFx1RDgwNlxcdURDQUEnOidcXHVEODA2XFx1RENDQScsJ1xcdUQ4MDZcXHVEQ0FCJzonXFx1RDgwNlxcdURDQ0InLCdcXHVEODA2XFx1RENBQyc6J1xcdUQ4MDZcXHVEQ0NDJywnXFx1RDgwNlxcdURDQUQnOidcXHVEODA2XFx1RENDRCcsJ1xcdUQ4MDZcXHVEQ0FFJzonXFx1RDgwNlxcdURDQ0UnLCdcXHVEODA2XFx1RENBRic6J1xcdUQ4MDZcXHVEQ0NGJywnXFx1RDgwNlxcdURDQjAnOidcXHVEODA2XFx1RENEMCcsJ1xcdUQ4MDZcXHVEQ0IxJzonXFx1RDgwNlxcdURDRDEnLCdcXHVEODA2XFx1RENCMic6J1xcdUQ4MDZcXHVEQ0QyJywnXFx1RDgwNlxcdURDQjMnOidcXHVEODA2XFx1RENEMycsJ1xcdUQ4MDZcXHVEQ0I0JzonXFx1RDgwNlxcdURDRDQnLCdcXHVEODA2XFx1RENCNSc6J1xcdUQ4MDZcXHVEQ0Q1JywnXFx1RDgwNlxcdURDQjYnOidcXHVEODA2XFx1RENENicsJ1xcdUQ4MDZcXHVEQ0I3JzonXFx1RDgwNlxcdURDRDcnLCdcXHVEODA2XFx1RENCOCc6J1xcdUQ4MDZcXHVEQ0Q4JywnXFx1RDgwNlxcdURDQjknOidcXHVEODA2XFx1RENEOScsJ1xcdUQ4MDZcXHVEQ0JBJzonXFx1RDgwNlxcdURDREEnLCdcXHVEODA2XFx1RENCQic6J1xcdUQ4MDZcXHVEQ0RCJywnXFx1RDgwNlxcdURDQkMnOidcXHVEODA2XFx1RENEQycsJ1xcdUQ4MDZcXHVEQ0JEJzonXFx1RDgwNlxcdURDREQnLCdcXHVEODA2XFx1RENCRSc6J1xcdUQ4MDZcXHVEQ0RFJywnXFx1RDgwNlxcdURDQkYnOidcXHVEODA2XFx1RENERicsJ1xceERGJzonc3MnLCdcXHUwMTMwJzonaVxcdTAzMDcnLCdcXHUwMTQ5JzonXFx1MDJCQ24nLCdcXHUwMUYwJzonalxcdTAzMEMnLCdcXHUwMzkwJzonXFx1MDNCOVxcdTAzMDhcXHUwMzAxJywnXFx1MDNCMCc6J1xcdTAzQzVcXHUwMzA4XFx1MDMwMScsJ1xcdTA1ODcnOidcXHUwNTY1XFx1MDU4MicsJ1xcdTFFOTYnOidoXFx1MDMzMScsJ1xcdTFFOTcnOid0XFx1MDMwOCcsJ1xcdTFFOTgnOid3XFx1MDMwQScsJ1xcdTFFOTknOid5XFx1MDMwQScsJ1xcdTFFOUEnOidhXFx1MDJCRScsJ1xcdTFFOUUnOidzcycsJ1xcdTFGNTAnOidcXHUwM0M1XFx1MDMxMycsJ1xcdTFGNTInOidcXHUwM0M1XFx1MDMxM1xcdTAzMDAnLCdcXHUxRjU0JzonXFx1MDNDNVxcdTAzMTNcXHUwMzAxJywnXFx1MUY1Nic6J1xcdTAzQzVcXHUwMzEzXFx1MDM0MicsJ1xcdTFGODAnOidcXHUxRjAwXFx1MDNCOScsJ1xcdTFGODEnOidcXHUxRjAxXFx1MDNCOScsJ1xcdTFGODInOidcXHUxRjAyXFx1MDNCOScsJ1xcdTFGODMnOidcXHUxRjAzXFx1MDNCOScsJ1xcdTFGODQnOidcXHUxRjA0XFx1MDNCOScsJ1xcdTFGODUnOidcXHUxRjA1XFx1MDNCOScsJ1xcdTFGODYnOidcXHUxRjA2XFx1MDNCOScsJ1xcdTFGODcnOidcXHUxRjA3XFx1MDNCOScsJ1xcdTFGODgnOidcXHUxRjAwXFx1MDNCOScsJ1xcdTFGODknOidcXHUxRjAxXFx1MDNCOScsJ1xcdTFGOEEnOidcXHUxRjAyXFx1MDNCOScsJ1xcdTFGOEInOidcXHUxRjAzXFx1MDNCOScsJ1xcdTFGOEMnOidcXHUxRjA0XFx1MDNCOScsJ1xcdTFGOEQnOidcXHUxRjA1XFx1MDNCOScsJ1xcdTFGOEUnOidcXHUxRjA2XFx1MDNCOScsJ1xcdTFGOEYnOidcXHUxRjA3XFx1MDNCOScsJ1xcdTFGOTAnOidcXHUxRjIwXFx1MDNCOScsJ1xcdTFGOTEnOidcXHUxRjIxXFx1MDNCOScsJ1xcdTFGOTInOidcXHUxRjIyXFx1MDNCOScsJ1xcdTFGOTMnOidcXHUxRjIzXFx1MDNCOScsJ1xcdTFGOTQnOidcXHUxRjI0XFx1MDNCOScsJ1xcdTFGOTUnOidcXHUxRjI1XFx1MDNCOScsJ1xcdTFGOTYnOidcXHUxRjI2XFx1MDNCOScsJ1xcdTFGOTcnOidcXHUxRjI3XFx1MDNCOScsJ1xcdTFGOTgnOidcXHUxRjIwXFx1MDNCOScsJ1xcdTFGOTknOidcXHUxRjIxXFx1MDNCOScsJ1xcdTFGOUEnOidcXHUxRjIyXFx1MDNCOScsJ1xcdTFGOUInOidcXHUxRjIzXFx1MDNCOScsJ1xcdTFGOUMnOidcXHUxRjI0XFx1MDNCOScsJ1xcdTFGOUQnOidcXHUxRjI1XFx1MDNCOScsJ1xcdTFGOUUnOidcXHUxRjI2XFx1MDNCOScsJ1xcdTFGOUYnOidcXHUxRjI3XFx1MDNCOScsJ1xcdTFGQTAnOidcXHUxRjYwXFx1MDNCOScsJ1xcdTFGQTEnOidcXHUxRjYxXFx1MDNCOScsJ1xcdTFGQTInOidcXHUxRjYyXFx1MDNCOScsJ1xcdTFGQTMnOidcXHUxRjYzXFx1MDNCOScsJ1xcdTFGQTQnOidcXHUxRjY0XFx1MDNCOScsJ1xcdTFGQTUnOidcXHUxRjY1XFx1MDNCOScsJ1xcdTFGQTYnOidcXHUxRjY2XFx1MDNCOScsJ1xcdTFGQTcnOidcXHUxRjY3XFx1MDNCOScsJ1xcdTFGQTgnOidcXHUxRjYwXFx1MDNCOScsJ1xcdTFGQTknOidcXHUxRjYxXFx1MDNCOScsJ1xcdTFGQUEnOidcXHUxRjYyXFx1MDNCOScsJ1xcdTFGQUInOidcXHUxRjYzXFx1MDNCOScsJ1xcdTFGQUMnOidcXHUxRjY0XFx1MDNCOScsJ1xcdTFGQUQnOidcXHUxRjY1XFx1MDNCOScsJ1xcdTFGQUUnOidcXHUxRjY2XFx1MDNCOScsJ1xcdTFGQUYnOidcXHUxRjY3XFx1MDNCOScsJ1xcdTFGQjInOidcXHUxRjcwXFx1MDNCOScsJ1xcdTFGQjMnOidcXHUwM0IxXFx1MDNCOScsJ1xcdTFGQjQnOidcXHUwM0FDXFx1MDNCOScsJ1xcdTFGQjYnOidcXHUwM0IxXFx1MDM0MicsJ1xcdTFGQjcnOidcXHUwM0IxXFx1MDM0MlxcdTAzQjknLCdcXHUxRkJDJzonXFx1MDNCMVxcdTAzQjknLCdcXHUxRkMyJzonXFx1MUY3NFxcdTAzQjknLCdcXHUxRkMzJzonXFx1MDNCN1xcdTAzQjknLCdcXHUxRkM0JzonXFx1MDNBRVxcdTAzQjknLCdcXHUxRkM2JzonXFx1MDNCN1xcdTAzNDInLCdcXHUxRkM3JzonXFx1MDNCN1xcdTAzNDJcXHUwM0I5JywnXFx1MUZDQyc6J1xcdTAzQjdcXHUwM0I5JywnXFx1MUZEMic6J1xcdTAzQjlcXHUwMzA4XFx1MDMwMCcsJ1xcdTFGRDMnOidcXHUwM0I5XFx1MDMwOFxcdTAzMDEnLCdcXHUxRkQ2JzonXFx1MDNCOVxcdTAzNDInLCdcXHUxRkQ3JzonXFx1MDNCOVxcdTAzMDhcXHUwMzQyJywnXFx1MUZFMic6J1xcdTAzQzVcXHUwMzA4XFx1MDMwMCcsJ1xcdTFGRTMnOidcXHUwM0M1XFx1MDMwOFxcdTAzMDEnLCdcXHUxRkU0JzonXFx1MDNDMVxcdTAzMTMnLCdcXHUxRkU2JzonXFx1MDNDNVxcdTAzNDInLCdcXHUxRkU3JzonXFx1MDNDNVxcdTAzMDhcXHUwMzQyJywnXFx1MUZGMic6J1xcdTFGN0NcXHUwM0I5JywnXFx1MUZGMyc6J1xcdTAzQzlcXHUwM0I5JywnXFx1MUZGNCc6J1xcdTAzQ0VcXHUwM0I5JywnXFx1MUZGNic6J1xcdTAzQzlcXHUwMzQyJywnXFx1MUZGNyc6J1xcdTAzQzlcXHUwMzQyXFx1MDNCOScsJ1xcdTFGRkMnOidcXHUwM0M5XFx1MDNCOScsJ1xcdUZCMDAnOidmZicsJ1xcdUZCMDEnOidmaScsJ1xcdUZCMDInOidmbCcsJ1xcdUZCMDMnOidmZmknLCdcXHVGQjA0JzonZmZsJywnXFx1RkIwNSc6J3N0JywnXFx1RkIwNic6J3N0JywnXFx1RkIxMyc6J1xcdTA1NzRcXHUwNTc2JywnXFx1RkIxNCc6J1xcdTA1NzRcXHUwNTY1JywnXFx1RkIxNSc6J1xcdTA1NzRcXHUwNTZCJywnXFx1RkIxNic6J1xcdTA1N0VcXHUwNTc2JywnXFx1RkIxNyc6J1xcdTA1NzRcXHUwNTZEJ307XG5cbi8vIE5vcm1hbGl6ZSByZWZlcmVuY2UgbGFiZWw6IGNvbGxhcHNlIGludGVybmFsIHdoaXRlc3BhY2Vcbi8vIHRvIHNpbmdsZSBzcGFjZSwgcmVtb3ZlIGxlYWRpbmcvdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FzZSBmb2xkLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnNsaWNlKDEsIHN0cmluZy5sZW5ndGggLSAxKS50cmltKCkucmVwbGFjZShyZWdleCwgZnVuY3Rpb24oJDApIHtcbiAgICAgICAgLy8gTm90ZTogdGhlcmUgaXMgbm8gbmVlZCB0byBjaGVjayBgaGFzT3duUHJvcGVydHkoJDApYCBoZXJlLlxuICAgICAgICAvLyBJZiBjaGFyYWN0ZXIgbm90IGZvdW5kIGluIGxvb2t1cCB0YWJsZSwgaXQgbXVzdCBiZSB3aGl0ZXNwYWNlLlxuICAgICAgICByZXR1cm4gbWFwWyQwXSB8fCAnICc7XG4gICAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9ybWFsaXplLXJlZmVyZW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGRlcml2ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcuZnJvbUNvZGVQb2ludFxuLyohIGh0dHA6Ly9tdGhzLmJlL2Zyb21jb2RlcG9pbnQgdjAuMi4xIGJ5IEBtYXRoaWFzICovXG5pZiAoU3RyaW5nLmZyb21Db2RlUG9pbnQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21Db2RlUG9pbnQoXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgUmFuZ2VFcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfTtcblxufSBlbHNlIHtcblxuICB2YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcbiAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyIGZyb21Db2RlUG9pbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBNQVhfU0laRSA9IDB4NDAwMDtcbiAgICAgIHZhciBjb2RlVW5pdHMgPSBbXTtcbiAgICAgIHZhciBoaWdoU3Vycm9nYXRlO1xuICAgICAgdmFyIGxvd1N1cnJvZ2F0ZTtcbiAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGNvZGVQb2ludCA9IE51bWJlcihhcmd1bWVudHNbaW5kZXhdKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICFpc0Zpbml0ZShjb2RlUG9pbnQpIHx8IC8vIGBOYU5gLCBgK0luZmluaXR5YCwgb3IgYC1JbmZpbml0eWBcbiAgICAgICAgICAgICAgICAgIGNvZGVQb2ludCA8IDAgfHwgLy8gbm90IGEgdmFsaWQgVW5pY29kZSBjb2RlIHBvaW50XG4gICAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPiAweDEwRkZGRiB8fCAvLyBub3QgYSB2YWxpZCBVbmljb2RlIGNvZGUgcG9pbnRcbiAgICAgICAgICAgICAgICAgIGZsb29yKGNvZGVQb2ludCkgIT09IGNvZGVQb2ludCAvLyBub3QgYW4gaW50ZWdlclxuICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29kZVBvaW50IDw9IDB4RkZGRikgeyAvLyBCTVAgY29kZSBwb2ludFxuICAgICAgICAgICAgICBjb2RlVW5pdHMucHVzaChjb2RlUG9pbnQpO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIEFzdHJhbCBjb2RlIHBvaW50OyBzcGxpdCBpbiBzdXJyb2dhdGUgaGFsdmVzXG4gICAgICAgICAgICAgIC8vIGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXG4gICAgICAgICAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwO1xuICAgICAgICAgICAgICBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyAweEQ4MDA7XG4gICAgICAgICAgICAgIGxvd1N1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgJSAweDQwMCkgKyAweERDMDA7XG4gICAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGhpZ2hTdXJyb2dhdGUsIGxvd1N1cnJvZ2F0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbmRleCArIDEgPT09IGxlbmd0aCB8fCBjb2RlVW5pdHMubGVuZ3RoID4gTUFYX1NJWkUpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpO1xuICAgICAgICAgICAgICBjb2RlVW5pdHMubGVuZ3RoID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtb2R1bGUuZXhwb3J0cyA9IGZyb21Db2RlUG9pbnQ7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9mcm9tLWNvZGUtcG9pbnQuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qISBodHRwOi8vbXRocy5iZS9yZXBlYXQgdjAuMi4wIGJ5IEBtYXRoaWFzICovXG5pZiAoIVN0cmluZy5wcm90b3R5cGUucmVwZWF0KSB7XG5cdChmdW5jdGlvbigpIHtcblx0XHQndXNlIHN0cmljdCc7IC8vIG5lZWRlZCB0byBzdXBwb3J0IGBhcHBseWAvYGNhbGxgIHdpdGggYHVuZGVmaW5lZGAvYG51bGxgXG5cdFx0dmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gSUUgOCBvbmx5IHN1cHBvcnRzIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG9uIERPTSBlbGVtZW50c1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIG9iamVjdCA9IHt9O1xuXHRcdFx0XHR2YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gJGRlZmluZVByb3BlcnR5KG9iamVjdCwgb2JqZWN0LCBvYmplY3QpICYmICRkZWZpbmVQcm9wZXJ0eTtcblx0XHRcdH0gY2F0Y2goZXJyb3IpIHt9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0oKSk7XG5cdFx0dmFyIHJlcGVhdCA9IGZ1bmN0aW9uKGNvdW50KSB7XG5cdFx0XHRpZiAodGhpcyA9PSBudWxsKSB7XG5cdFx0XHRcdHRocm93IFR5cGVFcnJvcigpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcblx0XHRcdC8vIGBUb0ludGVnZXJgXG5cdFx0XHR2YXIgbiA9IGNvdW50ID8gTnVtYmVyKGNvdW50KSA6IDA7XG5cdFx0XHRpZiAobiAhPSBuKSB7IC8vIGJldHRlciBgaXNOYU5gXG5cdFx0XHRcdG4gPSAwO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQWNjb3VudCBmb3Igb3V0LW9mLWJvdW5kcyBpbmRpY2VzXG5cdFx0XHRpZiAobiA8IDAgfHwgbiA9PSBJbmZpbml0eSkge1xuXHRcdFx0XHR0aHJvdyBSYW5nZUVycm9yKCk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgcmVzdWx0ID0gJyc7XG5cdFx0XHR3aGlsZSAobikge1xuXHRcdFx0XHRpZiAobiAlIDIgPT0gMSkge1xuXHRcdFx0XHRcdHJlc3VsdCArPSBzdHJpbmc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG4gPiAxKSB7XG5cdFx0XHRcdFx0c3RyaW5nICs9IHN0cmluZztcblx0XHRcdFx0fVxuXHRcdFx0XHRuID4+PSAxO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9O1xuXHRcdGlmIChkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdFx0ZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgJ3JlcGVhdCcsIHtcblx0XHRcdFx0J3ZhbHVlJzogcmVwZWF0LFxuXHRcdFx0XHQnY29uZmlndXJhYmxlJzogdHJ1ZSxcblx0XHRcdFx0J3dyaXRhYmxlJzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdFN0cmluZy5wcm90b3R5cGUucmVwZWF0ID0gcmVwZWF0O1xuXHRcdH1cblx0fSgpKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUucmVwZWF0L3JlcGVhdC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXInKTtcblxudmFyIHJlVW5zYWZlUHJvdG9jb2wgPSAvXmphdmFzY3JpcHQ6fHZic2NyaXB0OnxmaWxlOnxkYXRhOi9pO1xudmFyIHJlU2FmZURhdGFQcm90b2NvbCA9IC9eZGF0YTppbWFnZVxcLyg/OnBuZ3xnaWZ8anBlZ3x3ZWJwKS9pO1xuXG52YXIgcG90ZW50aWFsbHlVbnNhZmUgPSBmdW5jdGlvbih1cmwpIHtcbiAgcmV0dXJuIHJlVW5zYWZlUHJvdG9jb2wudGVzdCh1cmwpICYmXG4gICAgICAhcmVTYWZlRGF0YVByb3RvY29sLnRlc3QodXJsKTtcbn07XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBwcm9kdWNlIGFuIEhUTUwgdGFnLlxuZnVuY3Rpb24gdGFnKG5hbWUsIGF0dHJzLCBzZWxmY2xvc2luZykge1xuICBpZiAodGhpcy5kaXNhYmxlVGFncyA+IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5idWZmZXIgKz0gKCc8JyArIG5hbWUpO1xuICBpZiAoYXR0cnMgJiYgYXR0cnMubGVuZ3RoID4gMCkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgYXR0cmliO1xuICAgIHdoaWxlICgoYXR0cmliID0gYXR0cnNbaV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYnVmZmVyICs9ICgnICcgKyBhdHRyaWJbMF0gKyAnPVwiJyArIGF0dHJpYlsxXSArICdcIicpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuICBpZiAoc2VsZmNsb3NpbmcpIHtcbiAgICB0aGlzLmJ1ZmZlciArPSAnIC8nO1xuICB9XG4gIHRoaXMuYnVmZmVyICs9ICc+JztcbiAgdGhpcy5sYXN0T3V0ID0gJz4nO1xufVxuXG5mdW5jdGlvbiBIdG1sUmVuZGVyZXIob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgLy8gYnkgZGVmYXVsdCwgc29mdCBicmVha3MgYXJlIHJlbmRlcmVkIGFzIG5ld2xpbmVzIGluIEhUTUxcbiAgb3B0aW9ucy5zb2Z0YnJlYWsgPSBvcHRpb25zLnNvZnRicmVhayB8fCAnXFxuJztcbiAgLy8gc2V0IHRvIFwiPGJyIC8+XCIgdG8gbWFrZSB0aGVtIGhhcmQgYnJlYWtzXG4gIC8vIHNldCB0byBcIiBcIiBpZiB5b3Ugd2FudCB0byBpZ25vcmUgbGluZSB3cmFwcGluZyBpbiBzb3VyY2VcblxuICB0aGlzLmRpc2FibGVUYWdzID0gMDtcbiAgdGhpcy5sYXN0T3V0ID0gXCJcXG5cIjtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbn1cblxuLyogTm9kZSBtZXRob2RzICovXG5cbmZ1bmN0aW9uIHRleHQobm9kZSkge1xuICB0aGlzLm91dChub2RlLmxpdGVyYWwpO1xufVxuXG5mdW5jdGlvbiBzb2Z0YnJlYWsoKSB7XG4gIHRoaXMubGl0KHRoaXMub3B0aW9ucy5zb2Z0YnJlYWspO1xufVxuXG5mdW5jdGlvbiBsaW5lYnJlYWsoKSB7XG4gIHRoaXMudGFnKCdicicsIFtdLCB0cnVlKTtcbiAgdGhpcy5jcigpO1xufVxuXG5mdW5jdGlvbiBsaW5rKG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChlbnRlcmluZykge1xuICAgIGlmICghKHRoaXMub3B0aW9ucy5zYWZlICYmIHBvdGVudGlhbGx5VW5zYWZlKG5vZGUuZGVzdGluYXRpb24pKSkge1xuICAgICAgYXR0cnMucHVzaChbJ2hyZWYnLCB0aGlzLmVzYyhub2RlLmRlc3RpbmF0aW9uLCB0cnVlKV0pO1xuICAgIH1cbiAgICBpZiAobm9kZS50aXRsZSkge1xuICAgICAgYXR0cnMucHVzaChbJ3RpdGxlJywgdGhpcy5lc2Mobm9kZS50aXRsZSwgdHJ1ZSldKTtcbiAgICB9XG4gICAgdGhpcy50YWcoJ2EnLCBhdHRycyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50YWcoJy9hJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW1hZ2Uobm9kZSwgZW50ZXJpbmcpIHtcbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVRhZ3MgPT09IDApIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2FmZSAmJiBwb3RlbnRpYWxseVVuc2FmZShub2RlLmRlc3RpbmF0aW9uKSkge1xuICAgICAgICB0aGlzLmxpdCgnPGltZyBzcmM9XCJcIiBhbHQ9XCInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGl0KCc8aW1nIHNyYz1cIicgKyB0aGlzLmVzYyhub2RlLmRlc3RpbmF0aW9uLCB0cnVlKSArXG4gICAgICAgICAgICAnXCIgYWx0PVwiJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGlzYWJsZVRhZ3MgKz0gMTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRpc2FibGVUYWdzIC09IDE7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVRhZ3MgPT09IDApIHtcbiAgICAgIGlmIChub2RlLnRpdGxlKSB7XG4gICAgICAgIHRoaXMubGl0KCdcIiB0aXRsZT1cIicgKyB0aGlzLmVzYyhub2RlLnRpdGxlLCB0cnVlKSk7XG4gICAgICB9XG4gICAgICB0aGlzLmxpdCgnXCIgLz4nKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1waChub2RlLCBlbnRlcmluZykge1xuICB0aGlzLnRhZyhlbnRlcmluZyA/ICdlbScgOiAnL2VtJyk7XG59XG5cbmZ1bmN0aW9uIHN0cm9uZyhub2RlLCBlbnRlcmluZykge1xuICB0aGlzLnRhZyhlbnRlcmluZyA/ICdzdHJvbmcnIDogJy9zdHJvbmcnKTtcbn1cblxuZnVuY3Rpb24gcGFyYWdyYXBoKG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciBncmFuZHBhcmVudCA9IG5vZGUucGFyZW50LnBhcmVudFxuICAgICwgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICBpZiAoZ3JhbmRwYXJlbnQgIT09IG51bGwgJiZcbiAgICBncmFuZHBhcmVudC50eXBlID09PSAnbGlzdCcpIHtcbiAgICBpZiAoZ3JhbmRwYXJlbnQubGlzdFRpZ2h0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmIChlbnRlcmluZykge1xuICAgIHRoaXMuY3IoKTtcbiAgICB0aGlzLnRhZygncCcsIGF0dHJzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRhZygnL3AnKTtcbiAgICB0aGlzLmNyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGVhZGluZyhub2RlLCBlbnRlcmluZykge1xuICB2YXIgdGFnbmFtZSA9ICdoJyArIG5vZGUubGV2ZWxcbiAgICAsIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKHRhZ25hbWUsIGF0dHJzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRhZygnLycgKyB0YWduYW1lKTtcbiAgICB0aGlzLmNyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29kZShub2RlKSB7XG4gIHRoaXMudGFnKCdjb2RlJyk7XG4gIHRoaXMub3V0KG5vZGUubGl0ZXJhbCk7XG4gIHRoaXMudGFnKCcvY29kZScpO1xufVxuXG5mdW5jdGlvbiBjb2RlX2Jsb2NrKG5vZGUpIHtcbiAgdmFyIGluZm9fd29yZHMgPSBub2RlLmluZm8gPyBub2RlLmluZm8uc3BsaXQoL1xccysvKSA6IFtdXG4gICAgLCBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChpbmZvX3dvcmRzLmxlbmd0aCA+IDAgJiYgaW5mb193b3Jkc1swXS5sZW5ndGggPiAwKSB7XG4gICAgYXR0cnMucHVzaChbJ2NsYXNzJywgJ2xhbmd1YWdlLScgKyB0aGlzLmVzYyhpbmZvX3dvcmRzWzBdLCB0cnVlKV0pO1xuICB9XG4gIHRoaXMuY3IoKTtcbiAgdGhpcy50YWcoJ3ByZScpO1xuICB0aGlzLnRhZygnY29kZScsIGF0dHJzKTtcbiAgdGhpcy5vdXQobm9kZS5saXRlcmFsKTtcbiAgdGhpcy50YWcoJy9jb2RlJyk7XG4gIHRoaXMudGFnKCcvcHJlJyk7XG4gIHRoaXMuY3IoKTtcbn1cblxuZnVuY3Rpb24gdGhlbWF0aWNfYnJlYWsobm9kZSkge1xuICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICB0aGlzLmNyKCk7XG4gIHRoaXMudGFnKCdocicsIGF0dHJzLCB0cnVlKTtcbiAgdGhpcy5jcigpO1xufVxuXG5mdW5jdGlvbiBibG9ja19xdW90ZShub2RlLCBlbnRlcmluZykge1xuICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICBpZiAoZW50ZXJpbmcpIHtcbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcoJ2Jsb2NrcXVvdGUnLCBhdHRycyk7XG4gICAgdGhpcy5jcigpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY3IoKTtcbiAgICB0aGlzLnRhZygnL2Jsb2NrcXVvdGUnKTtcbiAgICB0aGlzLmNyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGlzdChub2RlLCBlbnRlcmluZykge1xuICB2YXIgdGFnbmFtZSA9IG5vZGUubGlzdFR5cGUgPT09ICdidWxsZXQnID8gJ3VsJyA6ICdvbCdcbiAgICAsIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcblxuICBpZiAoZW50ZXJpbmcpIHtcbiAgICB2YXIgc3RhcnQgPSBub2RlLmxpc3RTdGFydDtcbiAgICBpZiAoc3RhcnQgIT09IG51bGwgJiYgc3RhcnQgIT09IDEpIHtcbiAgICAgIGF0dHJzLnB1c2goWydzdGFydCcsIHN0YXJ0LnRvU3RyaW5nKCldKTtcbiAgICB9XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKHRhZ25hbWUsIGF0dHJzKTtcbiAgICB0aGlzLmNyKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKCcvJyArIHRhZ25hbWUpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpdGVtKG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChlbnRlcmluZykge1xuICAgIHRoaXMudGFnKCdsaScsIGF0dHJzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRhZygnL2xpJyk7XG4gICAgdGhpcy5jcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGh0bWxfaW5saW5lKG5vZGUpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5zYWZlKSB7XG4gICAgdGhpcy5saXQoJzwhLS0gcmF3IEhUTUwgb21pdHRlZCAtLT4nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxpdChub2RlLmxpdGVyYWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGh0bWxfYmxvY2sobm9kZSkge1xuICB0aGlzLmNyKCk7XG4gIGlmICh0aGlzLm9wdGlvbnMuc2FmZSkge1xuICAgIHRoaXMubGl0KCc8IS0tIHJhdyBIVE1MIG9taXR0ZWQgLS0+Jyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5saXQobm9kZS5saXRlcmFsKTtcbiAgfVxuICB0aGlzLmNyKCk7XG59XG5cbmZ1bmN0aW9uIGN1c3RvbV9pbmxpbmUobm9kZSwgZW50ZXJpbmcpIHtcbiAgaWYgKGVudGVyaW5nICYmIG5vZGUub25FbnRlcikge1xuICAgIHRoaXMubGl0KG5vZGUub25FbnRlcik7XG4gIH0gZWxzZSBpZiAoIWVudGVyaW5nICYmIG5vZGUub25FeGl0KSB7XG4gICAgdGhpcy5saXQobm9kZS5vbkV4aXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGN1c3RvbV9ibG9jayhub2RlLCBlbnRlcmluZykge1xuICB0aGlzLmNyKCk7XG4gIGlmIChlbnRlcmluZyAmJiBub2RlLm9uRW50ZXIpIHtcbiAgICB0aGlzLmxpdChub2RlLm9uRW50ZXIpO1xuICB9IGVsc2UgaWYgKCFlbnRlcmluZyAmJiBub2RlLm9uRXhpdCkge1xuICAgIHRoaXMubGl0KG5vZGUub25FeGl0KTtcbiAgfVxuICB0aGlzLmNyKCk7XG59XG5cbi8qIEhlbHBlciBtZXRob2RzICovXG5cbmZ1bmN0aW9uIG91dChzKSB7XG4gIHRoaXMubGl0KHRoaXMuZXNjKHMsIGZhbHNlKSk7XG59XG5cbmZ1bmN0aW9uIGF0dHJzIChub2RlKSB7XG4gIHZhciBhdHQgPSBbXTtcbiAgaWYgKHRoaXMub3B0aW9ucy5zb3VyY2Vwb3MpIHtcbiAgICB2YXIgcG9zID0gbm9kZS5zb3VyY2Vwb3M7XG4gICAgaWYgKHBvcykge1xuICAgICAgYXR0LnB1c2goWydkYXRhLXNvdXJjZXBvcycsIFN0cmluZyhwb3NbMF1bMF0pICsgJzonICtcbiAgICAgICAgU3RyaW5nKHBvc1swXVsxXSkgKyAnLScgKyBTdHJpbmcocG9zWzFdWzBdKSArICc6JyArXG4gICAgICAgIFN0cmluZyhwb3NbMV1bMV0pXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhdHQ7XG59XG5cbi8vIHF1aWNrIGJyb3dzZXItY29tcGF0aWJsZSBpbmhlcml0YW5jZVxuSHRtbFJlbmRlcmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVuZGVyZXIucHJvdG90eXBlKTtcblxuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS50ZXh0ID0gdGV4dDtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuaHRtbF9pbmxpbmUgPSBodG1sX2lubGluZTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuaHRtbF9ibG9jayA9IGh0bWxfYmxvY2s7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnNvZnRicmVhayA9IHNvZnRicmVhaztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUubGluZWJyZWFrID0gbGluZWJyZWFrO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5saW5rID0gbGluaztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuaW1hZ2UgPSBpbWFnZTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuZW1waCA9IGVtcGg7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnN0cm9uZyA9IHN0cm9uZztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUucGFyYWdyYXBoID0gcGFyYWdyYXBoO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gaGVhZGluZztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuY29kZSA9IGNvZGU7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmNvZGVfYmxvY2sgPSBjb2RlX2Jsb2NrO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS50aGVtYXRpY19icmVhayA9IHRoZW1hdGljX2JyZWFrO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5ibG9ja19xdW90ZSA9IGJsb2NrX3F1b3RlO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5saXN0ID0gbGlzdDtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuaXRlbSA9IGl0ZW07XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmN1c3RvbV9pbmxpbmUgPSBjdXN0b21faW5saW5lO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5jdXN0b21fYmxvY2sgPSBjdXN0b21fYmxvY2s7XG5cbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuZXNjID0gcmVxdWlyZSgnLi4vY29tbW9uJykuZXNjYXBlWG1sO1xuXG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLm91dCA9IG91dDtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUudGFnID0gdGFnO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5hdHRycyA9IGF0dHJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxSZW5kZXJlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci9odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXJlcicpO1xuXG52YXIgcmVYTUxUYWcgPSAvXFw8W14+XSpcXD4vO1xuXG5mdW5jdGlvbiB0b1RhZ05hbWUocykge1xuICByZXR1cm4gcy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBcIiQxXyQyXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIFhtbFJlbmRlcmVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdGhpcy5kaXNhYmxlVGFncyA9IDA7XG4gIHRoaXMubGFzdE91dCA9IFwiXFxuXCI7XG5cbiAgdGhpcy5pbmRlbnRMZXZlbCA9IDA7XG4gIHRoaXMuaW5kZW50ID0gJyAgJztcblxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoYXN0KSB7XG5cbiAgdGhpcy5idWZmZXIgPSAnJztcblxuICB2YXIgYXR0cnM7XG4gIHZhciB0YWduYW1lO1xuICB2YXIgd2Fsa2VyID0gYXN0LndhbGtlcigpO1xuICB2YXIgZXZlbnQsIG5vZGUsIGVudGVyaW5nO1xuICB2YXIgY29udGFpbmVyO1xuICB2YXIgc2VsZkNsb3Npbmc7XG4gIHZhciBub2RldHlwZTtcblxuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAob3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZShcInJlbmRlcmluZ1wiKTsgfVxuXG4gIHRoaXMuYnVmZmVyICs9ICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz5cXG4nO1xuICB0aGlzLmJ1ZmZlciArPSAnPCFET0NUWVBFIGRvY3VtZW50IFNZU1RFTSBcIkNvbW1vbk1hcmsuZHRkXCI+XFxuJztcblxuICB3aGlsZSAoKGV2ZW50ID0gd2Fsa2VyLm5leHQoKSkpIHtcbiAgICBlbnRlcmluZyA9IGV2ZW50LmVudGVyaW5nO1xuICAgIG5vZGUgPSBldmVudC5ub2RlO1xuICAgIG5vZGV0eXBlID0gbm9kZS50eXBlO1xuXG4gICAgY29udGFpbmVyID0gbm9kZS5pc0NvbnRhaW5lcjtcblxuICAgIHNlbGZDbG9zaW5nID0gbm9kZXR5cGUgPT09ICd0aGVtYXRpY19icmVhaydcbiAgICAgIHx8IG5vZGV0eXBlID09PSAnbGluZWJyZWFrJ1xuICAgICAgfHwgbm9kZXR5cGUgPT09ICdzb2Z0YnJlYWsnO1xuXG4gICAgdGFnbmFtZSA9IHRvVGFnTmFtZShub2RldHlwZSk7XG5cbiAgICBpZiAoZW50ZXJpbmcpIHtcblxuICAgICAgICBhdHRycyA9IFtdO1xuXG4gICAgICAgIHN3aXRjaCAobm9kZXR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsneG1sbnMnLCAnaHR0cDovL2NvbW1vbm1hcmsub3JnL3htbC8xLjAnXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdsaXN0JzpcbiAgICAgICAgICAgIGlmIChub2RlLmxpc3RUeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGF0dHJzLnB1c2goWyd0eXBlJywgbm9kZS5saXN0VHlwZS50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5saXN0U3RhcnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ3N0YXJ0JywgU3RyaW5nKG5vZGUubGlzdFN0YXJ0KV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUubGlzdFRpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGF0dHJzLnB1c2goWyd0aWdodCcsIChub2RlLmxpc3RUaWdodCA/ICd0cnVlJyA6ICdmYWxzZScpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGVsaW0gPSBub2RlLmxpc3REZWxpbWl0ZXI7XG4gICAgICAgICAgICBpZiAoZGVsaW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdmFyIGRlbGltd29yZCA9ICcnO1xuICAgICAgICAgICAgICBpZiAoZGVsaW0gPT09ICcuJykge1xuICAgICAgICAgICAgICAgIGRlbGltd29yZCA9ICdwZXJpb2QnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGltd29yZCA9ICdwYXJlbic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ2RlbGltaXRlcicsIGRlbGltd29yZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29kZV9ibG9jayc6XG4gICAgICAgICAgICBpZiAobm9kZS5pbmZvKSB7XG4gICAgICAgICAgICAgIGF0dHJzLnB1c2goWydpbmZvJywgbm9kZS5pbmZvXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkaW5nJzpcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWydsZXZlbCcsIFN0cmluZyhub2RlLmxldmVsKV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbGluayc6XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgYXR0cnMucHVzaChbJ2Rlc3RpbmF0aW9uJywgbm9kZS5kZXN0aW5hdGlvbl0pO1xuICAgICAgICAgICAgYXR0cnMucHVzaChbJ3RpdGxlJywgbm9kZS50aXRsZV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3VzdG9tX2lubGluZSc6XG4gICAgICAgICAgY2FzZSAnY3VzdG9tX2Jsb2NrJzpcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWydvbl9lbnRlcicsIG5vZGUub25FbnRlcl0pO1xuICAgICAgICAgICAgYXR0cnMucHVzaChbJ29uX2V4aXQnLCBub2RlLm9uRXhpdF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnNvdXJjZXBvcykge1xuICAgICAgICAgIHZhciBwb3MgPSBub2RlLnNvdXJjZXBvcztcbiAgICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsnc291cmNlcG9zJywgU3RyaW5nKHBvc1swXVswXSkgKyAnOicgK1xuICAgICAgICAgICAgICBTdHJpbmcocG9zWzBdWzFdKSArICctJyArIFN0cmluZyhwb3NbMV1bMF0pICsgJzonICtcbiAgICAgICAgICAgICAgU3RyaW5nKHBvc1sxXVsxXSldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyKCk7XG4gICAgICAgIHRoaXMub3V0KHRoaXMudGFnKHRhZ25hbWUsIGF0dHJzLCBzZWxmQ2xvc2luZykpO1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgdGhpcy5pbmRlbnRMZXZlbCArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKCFjb250YWluZXIgJiYgIXNlbGZDbG9zaW5nKSB7XG4gICAgICAgICAgdmFyIGxpdCA9IG5vZGUubGl0ZXJhbDtcbiAgICAgICAgICBpZiAobGl0KSB7XG4gICAgICAgICAgICB0aGlzLm91dCh0aGlzLmVzYyhsaXQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vdXQodGhpcy50YWcoJy8nICsgdGFnbmFtZSkpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZW50TGV2ZWwgLT0gMTtcbiAgICAgIHRoaXMuY3IoKTtcbiAgICAgIHRoaXMub3V0KHRoaXMudGFnKCcvJyArIHRhZ25hbWUpKTtcbiAgICB9XG4gIH1cbiAgaWYgKG9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWVFbmQoXCJyZW5kZXJpbmdcIik7IH1cbiAgdGhpcy5idWZmZXIgKz0gJ1xcbic7XG4gIHJldHVybiB0aGlzLmJ1ZmZlcjtcbn1cblxuZnVuY3Rpb24gb3V0KHMpIHtcbiAgaWYodGhpcy5kaXNhYmxlVGFncyA+IDApIHtcbiAgICB0aGlzLmJ1ZmZlciArPSBzLnJlcGxhY2UocmVYTUxUYWcsICcnKTtcbiAgfWVsc2V7XG4gICAgdGhpcy5idWZmZXIgKz0gcztcbiAgfVxuICB0aGlzLmxhc3RPdXQgPSBzO1xufVxuXG5mdW5jdGlvbiBjcigpIHtcbiAgaWYodGhpcy5sYXN0T3V0ICE9PSAnXFxuJykge1xuICAgIHRoaXMuYnVmZmVyICs9ICdcXG4nO1xuICAgIHRoaXMubGFzdE91dCA9ICdcXG4nO1xuICAgIGZvcih2YXIgaSA9IHRoaXMuaW5kZW50TGV2ZWw7IGkgPiAwOyBpLS0pIHtcbiAgICAgIHRoaXMuYnVmZmVyICs9IHRoaXMuaW5kZW50O1xuICAgIH1cbiAgfVxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gcHJvZHVjZSBhbiBYTUwgdGFnLlxuZnVuY3Rpb24gdGFnKG5hbWUsIGF0dHJzLCBzZWxmY2xvc2luZykge1xuICB2YXIgcmVzdWx0ID0gJzwnICsgbmFtZTtcbiAgaWYoYXR0cnMgJiYgYXR0cnMubGVuZ3RoID4gMCkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgYXR0cmliO1xuICAgIHdoaWxlICgoYXR0cmliID0gYXR0cnNbaV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCArPSAnICcgKyBhdHRyaWJbMF0gKyAnPVwiJyArIHRoaXMuZXNjKGF0dHJpYlsxXSkgKyAnXCInO1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuICBpZihzZWxmY2xvc2luZykge1xuICAgIHJlc3VsdCArPSAnIC8nO1xuICB9XG4gIHJlc3VsdCArPSAnPic7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIHF1aWNrIGJyb3dzZXItY29tcGF0aWJsZSBpbmhlcml0YW5jZVxuWG1sUmVuZGVyZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZW5kZXJlci5wcm90b3R5cGUpO1xuXG5YbWxSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gcmVuZGVyO1xuWG1sUmVuZGVyZXIucHJvdG90eXBlLm91dCA9IG91dDtcblhtbFJlbmRlcmVyLnByb3RvdHlwZS5jciA9IGNyO1xuWG1sUmVuZGVyZXIucHJvdG90eXBlLnRhZyA9IHRhZztcblhtbFJlbmRlcmVyLnByb3RvdHlwZS5lc2MgPSByZXF1aXJlKCcuLi9jb21tb24nKS5lc2NhcGVYbWw7XG5cbm1vZHVsZS5leHBvcnRzID0gWG1sUmVuZGVyZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9yZW5kZXIveG1sLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9