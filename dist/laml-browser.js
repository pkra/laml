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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(19);
var decode = __webpack_require__(20);

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
/* 1 */
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

var encode = __webpack_require__(21),
    decode = __webpack_require__(22);

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
const {tex2jax} = __webpack_require__(16);
const commonmark = __webpack_require__(17);

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

const { renameTag } = __webpack_require__(1);
const metadata = __webpack_require__(10);
const preamble = __webpack_require__(11);
const abstract = __webpack_require__(12);
const statements = __webpack_require__(13);
const figures = __webpack_require__(14);
const names = __webpack_require__(15);
const blames = __webpack_require__(34);
const refs = __webpack_require__(35);

const laml = function(document) {
  metadata(document);
  preamble(document);
  abstract(document);
  statements(document);
  figures(document, false);
  names(document);
  // TODO should depend on cm.css?
  blames(document);
  refs(document);



  // populate bibliographic citations
  const bibitems = document.querySelectorAll('bibliography > a');
  for (let [index, bibitem] of bibitems.entries()) {
    const counter = '[' + (index + 1) + ']';
    // TODO create DL in buildBib instead
    const counterNode = document.createTextNode(counter + ' ');
    bibitem.parentNode.insertBefore(counterNode, bibitem);
    const cites = document.querySelectorAll(
      'cite[target="' + bibitem.id + '"]'
    );
    for (let cite of cites) {
      cite.innerHTML = counter;
      const anchor = document.createElement('a');
      anchor.setAttribute('href', '#' + bibitem.id);
      cite.parentNode.replaceChild(anchor, cite);
      anchor.appendChild(cite);
    }
  }

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
    // TODO not actually disabling clicks
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

  const buildBib = function() {
    const oldBib = document.querySelector('bibliography');
    const bib = renameTag(document, oldBib, 'section');
    bib.classList.add('bibliography');
    // const inner = bib.innerHTML;
    // bib.innerHTML = '';
    const heading = document.createElement('h2');
    heading.innerHTML = 'Bibliography';
    bib.insertBefore(heading, bib.firstChild);
    // const list = document.createElement('ul');
    // bib.appendChild(list);
    // for (let string of inner.split('\n')){
    //     if (string.trim() === '') continue
    //     const item = document.createElement('li');
    //     item.innerHTML = string.substring(2);
    //     list.appendChild(item);
    // }
  };
  buildBib();

  // wrap phrasing content in p

  // const PHRASING_TAGNAMES = ['abbr', 'audio', 'b', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'command', 'data', 'datalist', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'kbd', 'keygen', 'label', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'textarea', 'time', 'var', 'video', 'wbr', 'a', 'del', 'ins']
  // const candidates = []//document.querySelectorAll('body, section, figure');
  // for (let candidate of candidates){
  //   // console.log(candidate)
  //   const childNodes = candidate.childNodes;
  //   const arrayofarrays = [[]];
  //   for (let childNode of childNodes){
  //     const currentBatch = arrayofarrays[arrayofarrays.length -1];
  //     // console.log(childNode)
  //     if (childNode.nodeType === 3){
  //       const lines = childNode.data.split('\n');
  //       let temp = childNode;
  //       for (let [index, line] of lines.entries()){
  //         if (index === 0) {
  //           childNode.data = line;
  //           currentBatch.push(childNode);
  //         }
  //         else {
  //           const lineElement = document.createTextNode(line);
  //           // console.log('Before', childNode.nextSibling)
  //           childNode.parentNode.insertBefore(lineElement, temp.nextSibling);
  //           temp = lineElement;
  //           // console.log('After', childNode.nextSibling)
  //           arrayofarrays.push([lineElement]);
  //         }
  //       }
  //     }
  //     else if (childNode.nodeType === 8 || PHRASING_TAGNAMES.indexOf(childNode.tagName.toLowerCase()) > -1) {
  //       currentBatch.push(childNode);
  //     }
  //     else if(currentBatch.length > 0)  arrayofarrays.push([]);
  //   }
  //   console.log(arrayofarrays)
  //   for (let array of arrayofarrays){
  //     if (array.length === 0) continue
  //     const para = document.createElement('p');
  //     const first = array[0];
  //     // console.log(first);
  //     first.parentNode.replaceChild(para, first);
  //     for (node of array) para.appendChild(node);
  //   }
  // }
};

module.exports = laml;


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
    title.innerHTML = articleTitle;
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

const { renameTag } = __webpack_require__(1);
module.exports = function(document){
  // preamble
  renameTag(document,'preamble', 'div', 'hidden');
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(1);
module.exports = function(document){
  // abstract
  renameTag(document, 'abstract', 'section', true);
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(1);

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

const { renameTag } = __webpack_require__(1);

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
/* 17 */
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
module.exports.Parser = __webpack_require__(18);
module.exports.HtmlRenderer = __webpack_require__(30);
module.exports.XmlRenderer = __webpack_require__(31);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(2);
var unescapeString = __webpack_require__(0).unescapeString;
var OPENTAG = __webpack_require__(0).OPENTAG;
var CLOSETAG = __webpack_require__(0).CLOSETAG;

var CODE_INDENT = 4;

var C_TAB = 9;
var C_NEWLINE = 10;
var C_GREATERTHAN = 62;
var C_LESSTHAN = 60;
var C_SPACE = 32;
var C_OPEN_BRACKET = 91;

var InlineParser = __webpack_require__(26);

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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var entityMap = __webpack_require__(5),
    legacyMap = __webpack_require__(23),
    xmlMap    = __webpack_require__(4),
    decodeCodePoint = __webpack_require__(24);

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
/* 23 */
/***/ (function(module, exports) {

module.exports = {"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","QUOT":"\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var decodeMap = __webpack_require__(25);

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
/* 25 */
/***/ (function(module, exports) {

module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(2);
var common = __webpack_require__(0);
var normalizeReference = __webpack_require__(27);

var normalizeURI = common.normalizeURI;
var unescapeString = common.unescapeString;
var fromCodePoint = __webpack_require__(28);
var decodeHTML = __webpack_require__(3).decodeHTML;
__webpack_require__(29); // Polyfill for String.prototype.repeat

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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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

HtmlRenderer.prototype.esc = __webpack_require__(0).escapeXml;

HtmlRenderer.prototype.out = out;
HtmlRenderer.prototype.tag = tag;
HtmlRenderer.prototype.attrs = attrs;

module.exports = HtmlRenderer;


/***/ }),
/* 31 */
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
XmlRenderer.prototype.esc = __webpack_require__(0).escapeXml;

module.exports = XmlRenderer;


/***/ }),
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(1);

module.exports = function(document) {
  // convert blames to headings
  const blames = document.querySelectorAll('blame');
  for (let blame of blames) {
    // TODO look up correct heading level
    const renamedNode = renameTag(document, blame, 'h2', true);
  }
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const { renameTag } = __webpack_require__(1);

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
    targetHeading = renamedNode.innerHTML = target
      .querySelector('h1, h2, h3, h4, h5, h6')
      .cloneNode(true);
    // strip blame
    if (targetHeading.querySelector('.blame'))
      targetHeading.removeChild(targetHeading.querySelector('.blame'));
    renamedNode.innerHTML = targetHeading.innerHTML;
  }
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmEwMTRjMGQyMTYyNjAyZTViMWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMveG1sLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZW50aXRpZXMuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL3JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZWFtYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlndXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleDJqYXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21kdXJsL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWR1cmwvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2xlZ2FjeS5qc29uIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlX2NvZGVwb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9kZWNvZGUuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvaW5saW5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9ybWFsaXplLXJlZmVyZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvZnJvbS1jb2RlLXBvaW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnJlcGVhdC9yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci9odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9yZW5kZXIveG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9ibGFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDZCQUE2QixJQUFJLFFBQVEsSUFBSSxlQUFlLEtBQUssRUFBRTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQ0FBbUMsaUJBQWlCLEVBQUU7O0FBRXREOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQiwwQkFBMEI7QUFDaEQsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQix5QkFBeUI7QUFDOUMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQix3QkFBd0I7QUFDN0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQix3QkFBd0I7QUFDN0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixzQkFBc0IsRUFBRTtBQUM3QyxzQkFBc0IsbUJBQW1CO0FBQ3pDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsMEJBQTBCLEVBQUU7QUFDakQsc0JBQXNCLHVCQUF1QjtBQUM3QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLG9CQUFvQixFQUFFO0FBQzNDLHNCQUFzQixpQkFBaUI7QUFDdkMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUIsRUFBRTtBQUMxQyxzQkFBc0IsZ0JBQWdCO0FBQ3RDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsb0JBQW9CLEVBQUU7QUFDM0Msc0JBQXNCLGlCQUFpQjtBQUN2QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLDRCQUE0QixFQUFFO0FBQ25ELHNCQUFzQix5QkFBeUI7QUFDL0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQiw2QkFBNkIsRUFBRTtBQUNwRCxzQkFBc0IsMEJBQTBCO0FBQ2hELENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsNkJBQTZCLEVBQUU7QUFDcEQsc0JBQXNCLDBCQUEwQjtBQUNoRCxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLGlDQUFpQyxFQUFFO0FBQ3hELDBCQUEwQixrQ0FBa0M7QUFDNUQsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixzQkFBc0IsRUFBRTtBQUM3QyxzQkFBc0IsbUJBQW1CO0FBQ3pDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIscUJBQXFCLEVBQUU7QUFDNUMsc0JBQXNCLGtCQUFrQjtBQUN4QyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDOVFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ2hDQSxrQkFBa0IsbUQ7Ozs7OztBQ0FsQixrQkFBa0Iscy9WQUFzL1YsZ0lBQWdJLHVxU0FBdXFTLGdJQUFnSSxvNERBQW80RCxxcE07Ozs7Ozs7QUNBbnpzQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMxRUE7QUFDQSxPQUFPLFFBQVE7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDbkNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7QUN2THRDLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMUNBLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBLE9BQU8sWUFBWTs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZEEsT0FBTyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdFQUFnRSxJQUFJLFFBQVEsSUFBSTtBQUNoRjs7QUFFQSxzREFBc0QsSUFBSTs7QUFFMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLE9BQU87QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsSUFBSSxNQUFNO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsR0FBRyxLQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssZ0RBQWdELFdBQVc7QUFDaEU7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHlCQUF5QjtBQUM5QjtBQUNBLEtBQUsseUJBQXlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNuVkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRzs7QUFFM0U7O0FBRUE7O0FBRUE7O0FBRUEsZ0NBQWdDLElBQUk7O0FBRXBDLDZCQUE2QixJQUFJOztBQUVqQyxzQkFBc0IsR0FBRyxXQUFXLEdBQUc7O0FBRXZDLGdDQUFnQyxHQUFHLEdBQUcsR0FBRzs7QUFFekM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQyxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsVUFBVSxFQUFFO0FBQzFDLDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsaUNBQWlDLHVCQUF1QixFQUFFO0FBQzFEO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOEJBQThCLFVBQVUsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsaUNBQWlDLHVCQUF1QixFQUFFO0FBQzFEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEIsUUFBUSxFQUFFO0FBQ3hDLGlDQUFpQyx1QkFBdUIsRUFBRTtBQUMxRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLFFBQVEsRUFBRTtBQUN4QyxpQ0FBaUMsdUJBQXVCLEVBQUU7QUFDMUQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLFFBQVEsRUFBRTtBQUN4QyxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsZ0NBQWdDLGNBQWMsRUFBRTtBQUNoRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsU0FBUztBQUNULGdDQUFnQyxjQUFjLEVBQUU7QUFDaEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLFNBQVM7QUFDVCxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSyxPQUFPOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQ0FBaUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRSw0QkFBNEIsK0JBQStCO0FBQzNELG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlELDRCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUN2MkJBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsY0FBYzs7QUFFNUI7O0FBRUEsYUFBYSxTQUFTO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQ0FBZ0MsT0FBTztBQUN2Qzs7QUFFQTtBQUNBLHFCQUFxQixFQUFFO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7OztBQUdBOzs7Ozs7Ozs7QUNoR0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGNBQWM7O0FBRTVCOztBQUVBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQ0FBb0MsRUFBRTtBQUN0QztBQUNBOztBQUVBLCtCQUErQixPQUFPO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0EsMEJBQTBCO0FBQzFCOzs7QUFHQTs7Ozs7OztBQ3pIQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwrREFBK0Q7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsR0FBRztBQUNILGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBLG1FQUFtRSxRQUFRO0FBQzNFOztBQUVBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUN2RUEsa0JBQWtCLHd1Qzs7Ozs7O0FDQWxCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pCQSxrQkFBa0IseVM7Ozs7Ozs7QUNBbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQW1DOztBQUVuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1EQUFtRCxhQUFhLEVBQUU7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHFEQUFxRCxFQUFFLGdDQUFnQyxLQUFLLDZDQUE2QyxLQUFLOztBQUU5SSwyQ0FBMkMsS0FBSzs7QUFFaEQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxVQUFVLE9BQU87O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUssT0FBTzs7QUFFWiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQSx5QkFBeUIsbUNBQW1DO0FBQzVEO0FBQ0EseUJBQXlCLG1DQUFtQyw4Q0FBOEM7QUFDMUc7QUFDQTtBQUNBLHlCQUF5QixPQUFPLHFDQUFxQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3A3QkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUN6Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQSxXQUFXLE9BQU8sc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7O0FDakRBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ2pTQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsMkJBQTJCOztBQUVoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4QkFBOEI7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNyTEEsT0FBTyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEEsT0FBTyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJsYW1sLWJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2YTAxNGMwZDIxNjI2MDJlNWIxYyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5jb2RlID0gcmVxdWlyZSgnbWR1cmwvZW5jb2RlJyk7XG52YXIgZGVjb2RlID0gcmVxdWlyZSgnbWR1cmwvZGVjb2RlJyk7XG5cbnZhciBDX0JBQ0tTTEFTSCA9IDkyO1xuXG52YXIgZGVjb2RlSFRNTCA9IHJlcXVpcmUoJ2VudGl0aWVzJykuZGVjb2RlSFRNTDtcblxudmFyIEVOVElUWSA9IFwiJig/OiN4W2EtZjAtOV17MSw4fXwjWzAtOV17MSw4fXxbYS16XVthLXowLTldezEsMzF9KTtcIjtcblxudmFyIFRBR05BTUUgPSAnW0EtWmEtel1bQS1aYS16MC05LV0qJztcbnZhciBBVFRSSUJVVEVOQU1FID0gJ1thLXpBLVpfOl1bYS16QS1aMC05Oi5fLV0qJztcbnZhciBVTlFVT1RFRFZBTFVFID0gXCJbXlxcXCInPTw+YFxcXFx4MDAtXFxcXHgyMF0rXCI7XG52YXIgU0lOR0xFUVVPVEVEVkFMVUUgPSBcIidbXiddKidcIjtcbnZhciBET1VCTEVRVU9URURWQUxVRSA9ICdcIlteXCJdKlwiJztcbnZhciBBVFRSSUJVVEVWQUxVRSA9IFwiKD86XCIgKyBVTlFVT1RFRFZBTFVFICsgXCJ8XCIgKyBTSU5HTEVRVU9URURWQUxVRSArIFwifFwiICsgRE9VQkxFUVVPVEVEVkFMVUUgKyBcIilcIjtcbnZhciBBVFRSSUJVVEVWQUxVRVNQRUMgPSBcIig/OlwiICsgXCJcXFxccyo9XCIgKyBcIlxcXFxzKlwiICsgQVRUUklCVVRFVkFMVUUgKyBcIilcIjtcbnZhciBBVFRSSUJVVEUgPSBcIig/OlwiICsgXCJcXFxccytcIiArIEFUVFJJQlVURU5BTUUgKyBBVFRSSUJVVEVWQUxVRVNQRUMgKyBcIj8pXCI7XG52YXIgT1BFTlRBRyA9IFwiPFwiICsgVEFHTkFNRSArIEFUVFJJQlVURSArIFwiKlwiICsgXCJcXFxccyovPz5cIjtcbnZhciBDTE9TRVRBRyA9IFwiPC9cIiArIFRBR05BTUUgKyBcIlxcXFxzKls+XVwiO1xudmFyIEhUTUxDT01NRU5UID0gXCI8IS0tLS0+fDwhLS0oPzotP1tePi1dKSg/Oi0/W14tXSkqLS0+XCI7XG52YXIgUFJPQ0VTU0lOR0lOU1RSVUNUSU9OID0gXCJbPF1bP10uKj9bP11bPl1cIjtcbnZhciBERUNMQVJBVElPTiA9IFwiPCFbQS1aXStcIiArIFwiXFxcXHMrW14+XSo+XCI7XG52YXIgQ0RBVEEgPSBcIjwhXFxcXFtDREFUQVxcXFxbW1xcXFxzXFxcXFNdKj9cXFxcXVxcXFxdPlwiO1xudmFyIEhUTUxUQUcgPSBcIig/OlwiICsgT1BFTlRBRyArIFwifFwiICsgQ0xPU0VUQUcgKyBcInxcIiArIEhUTUxDT01NRU5UICsgXCJ8XCIgK1xuICAgICAgICBQUk9DRVNTSU5HSU5TVFJVQ1RJT04gKyBcInxcIiArIERFQ0xBUkFUSU9OICsgXCJ8XCIgKyBDREFUQSArIFwiKVwiO1xudmFyIHJlSHRtbFRhZyA9IG5ldyBSZWdFeHAoJ14nICsgSFRNTFRBRywgJ2knKTtcblxudmFyIHJlQmFja3NsYXNoT3JBbXAgPSAvW1xcXFwmXS87XG5cbnZhciBFU0NBUEFCTEUgPSAnWyFcIiMkJSZcXCcoKSorLC4vOjs8PT4/QFtcXFxcXFxcXFxcXFxdXl9ge3x9fi1dJztcblxudmFyIHJlRW50aXR5T3JFc2NhcGVkQ2hhciA9IG5ldyBSZWdFeHAoJ1xcXFxcXFxcJyArIEVTQ0FQQUJMRSArICd8JyArIEVOVElUWSwgJ2dpJyk7XG5cbnZhciBYTUxTUEVDSUFMID0gJ1smPD5cIl0nO1xuXG52YXIgcmVYbWxTcGVjaWFsID0gbmV3IFJlZ0V4cChYTUxTUEVDSUFMLCAnZycpO1xuXG52YXIgcmVYbWxTcGVjaWFsT3JFbnRpdHkgPSBuZXcgUmVnRXhwKEVOVElUWSArICd8JyArIFhNTFNQRUNJQUwsICdnaScpO1xuXG52YXIgdW5lc2NhcGVDaGFyID0gZnVuY3Rpb24ocykge1xuICAgIGlmIChzLmNoYXJDb2RlQXQoMCkgPT09IENfQkFDS1NMQVNIKSB7XG4gICAgICAgIHJldHVybiBzLmNoYXJBdCgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVjb2RlSFRNTChzKTtcbiAgICB9XG59O1xuXG4vLyBSZXBsYWNlIGVudGl0aWVzIGFuZCBiYWNrc2xhc2ggZXNjYXBlcyB3aXRoIGxpdGVyYWwgY2hhcmFjdGVycy5cbnZhciB1bmVzY2FwZVN0cmluZyA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocmVCYWNrc2xhc2hPckFtcC50ZXN0KHMpKSB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UocmVFbnRpdHlPckVzY2FwZWRDaGFyLCB1bmVzY2FwZUNoYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbn07XG5cbnZhciBub3JtYWxpemVVUkkgPSBmdW5jdGlvbih1cmkpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZW5jb2RlKGRlY29kZSh1cmkpKTtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiB1cmk7XG4gICAgfVxufTtcblxudmFyIHJlcGxhY2VVbnNhZmVDaGFyID0gZnVuY3Rpb24ocykge1xuICAgIHN3aXRjaCAocykge1xuICAgIGNhc2UgJyYnOlxuICAgICAgICByZXR1cm4gJyZhbXA7JztcbiAgICBjYXNlICc8JzpcbiAgICAgICAgcmV0dXJuICcmbHQ7JztcbiAgICBjYXNlICc+JzpcbiAgICAgICAgcmV0dXJuICcmZ3Q7JztcbiAgICBjYXNlICdcIic6XG4gICAgICAgIHJldHVybiAnJnF1b3Q7JztcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG59O1xuXG52YXIgZXNjYXBlWG1sID0gZnVuY3Rpb24ocywgcHJlc2VydmVfZW50aXRpZXMpIHtcbiAgICBpZiAocmVYbWxTcGVjaWFsLnRlc3QocykpIHtcbiAgICAgICAgaWYgKHByZXNlcnZlX2VudGl0aWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHJlWG1sU3BlY2lhbE9yRW50aXR5LCByZXBsYWNlVW5zYWZlQ2hhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHJlWG1sU3BlY2lhbCwgcmVwbGFjZVVuc2FmZUNoYXIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHVuZXNjYXBlU3RyaW5nOiB1bmVzY2FwZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICBub3JtYWxpemVVUkk6IG5vcm1hbGl6ZVVSSSxcbiAgICAgICAgICAgICAgICAgICBlc2NhcGVYbWw6IGVzY2FwZVhtbCxcbiAgICAgICAgICAgICAgICAgICByZUh0bWxUYWc6IHJlSHRtbFRhZyxcbiAgICAgICAgICAgICAgICAgICBPUEVOVEFHOiBPUEVOVEFHLFxuICAgICAgICAgICAgICAgICAgIENMT1NFVEFHOiBDTE9TRVRBRyxcbiAgICAgICAgICAgICAgICAgICBFTlRJVFk6IEVOVElUWSxcbiAgICAgICAgICAgICAgICAgICBFU0NBUEFCTEU6IEVTQ0FQQUJMRVxuICAgICAgICAgICAgICAgICB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvY29tbW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiAgLy8gU291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjc0MDQ2MDIvMTMzOTY1MVxubW9kdWxlLmV4cG9ydHMucmVuYW1lVGFnID0gZnVuY3Rpb24oZG9jdW1lbnQsIG5vZGVPclNlbGVjdG9yLCBuZXdUYWdOYW1lLCBjbGFzc09yVHJ1ZSkge1xuICAgIGxldCBub2RlID0gbm9kZU9yU2VsZWN0b3I7XG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobm9kZU9yU2VsZWN0b3IpO1xuICAgIGlmICghbm9kZSkgcmV0dXJuIG5ldyBFcnJvcignTm8gbm9kZSBmb3VuZCcpO1xuICAgIGxldCBjbGFzc05hbWUgPSAnJztcbiAgICBpZiAoY2xhc3NPclRydWUgJiYgY2xhc3NPclRydWUgPT09IHRydWUpIGNsYXNzTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0eXBlb2YgY2xhc3NPclRydWUgPT09ICdzdHJpbmcnKSBjbGFzc05hbWUgPSBjbGFzc09yVHJ1ZTtcblxuICAgIGNvbnN0IG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld1RhZ05hbWUpO1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIG5ld05vZGUuYXBwZW5kQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgICBmb3IgKGxldCBhdHRyaWJ1dGUgb2Ygbm9kZS5hdHRyaWJ1dGVzKSB7XG4gICAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG4gICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWxUYWdOYW1lJywgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChjbGFzc05hbWUgIT09ICcnKSBuZXdOb2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIG5vZGUpO1xuICAgIHJldHVybiBuZXdOb2RlO1xuICB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gaXNDb250YWluZXIobm9kZSkge1xuICAgIHN3aXRjaCAobm9kZS5fdHlwZSkge1xuICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICBjYXNlICdibG9ja19xdW90ZSc6XG4gICAgY2FzZSAnbGlzdCc6XG4gICAgY2FzZSAnaXRlbSc6XG4gICAgY2FzZSAncGFyYWdyYXBoJzpcbiAgICBjYXNlICdoZWFkaW5nJzpcbiAgICBjYXNlICdlbXBoJzpcbiAgICBjYXNlICdzdHJvbmcnOlxuICAgIGNhc2UgJ2xpbmsnOlxuICAgIGNhc2UgJ2ltYWdlJzpcbiAgICBjYXNlICdjdXN0b21faW5saW5lJzpcbiAgICBjYXNlICdjdXN0b21fYmxvY2snOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG52YXIgcmVzdW1lQXQgPSBmdW5jdGlvbihub2RlLCBlbnRlcmluZykge1xuICAgIHRoaXMuY3VycmVudCA9IG5vZGU7XG4gICAgdGhpcy5lbnRlcmluZyA9IChlbnRlcmluZyA9PT0gdHJ1ZSk7XG59O1xuXG52YXIgbmV4dCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGN1ciA9IHRoaXMuY3VycmVudDtcbiAgICB2YXIgZW50ZXJpbmcgPSB0aGlzLmVudGVyaW5nO1xuXG4gICAgaWYgKGN1ciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgY29udGFpbmVyID0gaXNDb250YWluZXIoY3VyKTtcblxuICAgIGlmIChlbnRlcmluZyAmJiBjb250YWluZXIpIHtcbiAgICAgICAgaWYgKGN1ci5fZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VyLl9maXJzdENoaWxkO1xuICAgICAgICAgICAgdGhpcy5lbnRlcmluZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzdGF5IG9uIG5vZGUgYnV0IGV4aXRcbiAgICAgICAgICAgIHRoaXMuZW50ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChjdXIgPT09IHRoaXMucm9vdCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuXG4gICAgfSBlbHNlIGlmIChjdXIuX25leHQgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VyLl9wYXJlbnQ7XG4gICAgICAgIHRoaXMuZW50ZXJpbmcgPSBmYWxzZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGN1ci5fbmV4dDtcbiAgICAgICAgdGhpcy5lbnRlcmluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtlbnRlcmluZzogZW50ZXJpbmcsIG5vZGU6IGN1cn07XG59O1xuXG52YXIgTm9kZVdhbGtlciA9IGZ1bmN0aW9uKHJvb3QpIHtcbiAgICByZXR1cm4geyBjdXJyZW50OiByb290LFxuICAgICAgICAgICAgIHJvb3Q6IHJvb3QsXG4gICAgICAgICAgICAgZW50ZXJpbmc6IHRydWUsXG4gICAgICAgICAgICAgbmV4dDogbmV4dCxcbiAgICAgICAgICAgICByZXN1bWVBdDogcmVzdW1lQXQgfTtcbn07XG5cbnZhciBOb2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIHNvdXJjZXBvcykge1xuICAgIHRoaXMuX3R5cGUgPSBub2RlVHlwZTtcbiAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuX2ZpcnN0Q2hpbGQgPSBudWxsO1xuICAgIHRoaXMuX2xhc3RDaGlsZCA9IG51bGw7XG4gICAgdGhpcy5fcHJldiA9IG51bGw7XG4gICAgdGhpcy5fbmV4dCA9IG51bGw7XG4gICAgdGhpcy5fc291cmNlcG9zID0gc291cmNlcG9zO1xuICAgIHRoaXMuX2xhc3RMaW5lQmxhbmsgPSBmYWxzZTtcbiAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9zdHJpbmdfY29udGVudCA9IG51bGw7XG4gICAgdGhpcy5fbGl0ZXJhbCA9IG51bGw7XG4gICAgdGhpcy5fbGlzdERhdGEgPSB7fTtcbiAgICB0aGlzLl9pbmZvID0gbnVsbDtcbiAgICB0aGlzLl9kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fdGl0bGUgPSBudWxsO1xuICAgIHRoaXMuX2lzRmVuY2VkID0gZmFsc2U7XG4gICAgdGhpcy5fZmVuY2VDaGFyID0gbnVsbDtcbiAgICB0aGlzLl9mZW5jZUxlbmd0aCA9IDA7XG4gICAgdGhpcy5fZmVuY2VPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMuX2xldmVsID0gbnVsbDtcbiAgICB0aGlzLl9vbkVudGVyID0gbnVsbDtcbiAgICB0aGlzLl9vbkV4aXQgPSBudWxsO1xufTtcblxudmFyIHByb3RvID0gTm9kZS5wcm90b3R5cGU7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2lzQ29udGFpbmVyJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNDb250YWluZXIodGhpcyk7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICd0eXBlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnZmlyc3RDaGlsZCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fZmlyc3RDaGlsZDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xhc3RDaGlsZCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGFzdENoaWxkOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbmV4dCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbmV4dDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3ByZXYnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3ByZXY7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXJlbnQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3BhcmVudDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3NvdXJjZXBvcycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fc291cmNlcG9zOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGl0ZXJhbCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGl0ZXJhbDsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fbGl0ZXJhbCA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdkZXN0aW5hdGlvbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fZGVzdGluYXRpb247IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX2Rlc3RpbmF0aW9uID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3RpdGxlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fdGl0bGUgPSBzOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnaW5mbycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5faW5mbzsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5faW5mbyA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsZXZlbCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGV2ZWw7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX2xldmVsID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3RUeXBlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9saXN0RGF0YS50eXBlOyB9LFxuICAgIHNldDogZnVuY3Rpb24odCkgeyB0aGlzLl9saXN0RGF0YS50eXBlID0gdDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3RUaWdodCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGlzdERhdGEudGlnaHQ7IH0sXG4gICAgc2V0OiBmdW5jdGlvbih0KSB7IHRoaXMuX2xpc3REYXRhLnRpZ2h0ID0gdDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3RTdGFydCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGlzdERhdGEuc3RhcnQ7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihuKSB7IHRoaXMuX2xpc3REYXRhLnN0YXJ0ID0gbjsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3REZWxpbWl0ZXInLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xpc3REYXRhLmRlbGltaXRlcjsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGRlbGltKSB7IHRoaXMuX2xpc3REYXRhLmRlbGltaXRlciA9IGRlbGltOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnb25FbnRlcicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fb25FbnRlcjsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fb25FbnRlciA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbkV4aXQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX29uRXhpdDsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fb25FeGl0ID0gczsgfVxufSk7XG5cbk5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICBjaGlsZC51bmxpbmsoKTtcbiAgICBjaGlsZC5fcGFyZW50ID0gdGhpcztcbiAgICBpZiAodGhpcy5fbGFzdENoaWxkKSB7XG4gICAgICAgIHRoaXMuX2xhc3RDaGlsZC5fbmV4dCA9IGNoaWxkO1xuICAgICAgICBjaGlsZC5fcHJldiA9IHRoaXMuX2xhc3RDaGlsZDtcbiAgICAgICAgdGhpcy5fbGFzdENoaWxkID0gY2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmlyc3RDaGlsZCA9IGNoaWxkO1xuICAgICAgICB0aGlzLl9sYXN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5wcmVwZW5kQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIGNoaWxkLnVubGluaygpO1xuICAgIGNoaWxkLl9wYXJlbnQgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9maXJzdENoaWxkKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0Q2hpbGQuX3ByZXYgPSBjaGlsZDtcbiAgICAgICAgY2hpbGQuX25leHQgPSB0aGlzLl9maXJzdENoaWxkO1xuICAgICAgICB0aGlzLl9maXJzdENoaWxkID0gY2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmlyc3RDaGlsZCA9IGNoaWxkO1xuICAgICAgICB0aGlzLl9sYXN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS51bmxpbmsgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gdGhpcy5fbmV4dDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0Q2hpbGQgPSB0aGlzLl9uZXh0O1xuICAgIH1cbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgICB0aGlzLl9uZXh0Ll9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2xhc3RDaGlsZCA9IHRoaXMuX3ByZXY7XG4gICAgfVxuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fbmV4dCA9IG51bGw7XG4gICAgdGhpcy5fcHJldiA9IG51bGw7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uKHNpYmxpbmcpIHtcbiAgICBzaWJsaW5nLnVubGluaygpO1xuICAgIHNpYmxpbmcuX25leHQgPSB0aGlzLl9uZXh0O1xuICAgIGlmIChzaWJsaW5nLl9uZXh0KSB7XG4gICAgICAgIHNpYmxpbmcuX25leHQuX3ByZXYgPSBzaWJsaW5nO1xuICAgIH1cbiAgICBzaWJsaW5nLl9wcmV2ID0gdGhpcztcbiAgICB0aGlzLl9uZXh0ID0gc2libGluZztcbiAgICBzaWJsaW5nLl9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgaWYgKCFzaWJsaW5nLl9uZXh0KSB7XG4gICAgICAgIHNpYmxpbmcuX3BhcmVudC5fbGFzdENoaWxkID0gc2libGluZztcbiAgICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pbnNlcnRCZWZvcmUgPSBmdW5jdGlvbihzaWJsaW5nKSB7XG4gICAgc2libGluZy51bmxpbmsoKTtcbiAgICBzaWJsaW5nLl9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICBpZiAoc2libGluZy5fcHJldikge1xuICAgICAgICBzaWJsaW5nLl9wcmV2Ll9uZXh0ID0gc2libGluZztcbiAgICB9XG4gICAgc2libGluZy5fbmV4dCA9IHRoaXM7XG4gICAgdGhpcy5fcHJldiA9IHNpYmxpbmc7XG4gICAgc2libGluZy5fcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgIGlmICghc2libGluZy5fcHJldikge1xuICAgICAgICBzaWJsaW5nLl9wYXJlbnQuX2ZpcnN0Q2hpbGQgPSBzaWJsaW5nO1xuICAgIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLndhbGtlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3YWxrZXIgPSBuZXcgTm9kZVdhbGtlcih0aGlzKTtcbiAgICByZXR1cm4gd2Fsa2VyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuXG5cbi8qIEV4YW1wbGUgb2YgdXNlIG9mIHdhbGtlcjpcblxuIHZhciB3YWxrZXIgPSB3LndhbGtlcigpO1xuIHZhciBldmVudDtcblxuIHdoaWxlIChldmVudCA9IHdhbGtlci5uZXh0KCkpIHtcbiBjb25zb2xlLmxvZyhldmVudC5lbnRlcmluZywgZXZlbnQubm9kZS50eXBlKTtcbiB9XG5cbiAqL1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9kZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZW5jb2RlID0gcmVxdWlyZShcIi4vbGliL2VuY29kZS5qc1wiKSxcbiAgICBkZWNvZGUgPSByZXF1aXJlKFwiLi9saWIvZGVjb2RlLmpzXCIpO1xuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmRlY29kZVN0cmljdCA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTFN0cmljdCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGVuY29kZS5YTUwgOiBlbmNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZVhNTCA9IGVuY29kZS5YTUw7XG5cbmV4cG9ydHMuZW5jb2RlSFRNTDQgPVxuZXhwb3J0cy5lbmNvZGVIVE1MNSA9XG5leHBvcnRzLmVuY29kZUhUTUwgID0gZW5jb2RlLkhUTUw7XG5cbmV4cG9ydHMuZGVjb2RlWE1MID1cbmV4cG9ydHMuZGVjb2RlWE1MU3RyaWN0ID0gZGVjb2RlLlhNTDtcblxuZXhwb3J0cy5kZWNvZGVIVE1MNCA9XG5leHBvcnRzLmRlY29kZUhUTUw1ID1cbmV4cG9ydHMuZGVjb2RlSFRNTCA9IGRlY29kZS5IVE1MO1xuXG5leHBvcnRzLmRlY29kZUhUTUw0U3RyaWN0ID1cbmV4cG9ydHMuZGVjb2RlSFRNTDVTdHJpY3QgPVxuZXhwb3J0cy5kZWNvZGVIVE1MU3RyaWN0ID0gZGVjb2RlLkhUTUxTdHJpY3Q7XG5cbmV4cG9ydHMuZXNjYXBlID0gZW5jb2RlLmVzY2FwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wiYW1wXCI6XCImXCIsXCJhcG9zXCI6XCInXCIsXCJndFwiOlwiPlwiLFwibHRcIjpcIjxcIixcInF1b3RcIjpcIlxcXCJcIn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL3htbC5qc29uXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wiQWFjdXRlXCI6XCLDgVwiLFwiYWFjdXRlXCI6XCLDoVwiLFwiQWJyZXZlXCI6XCLEglwiLFwiYWJyZXZlXCI6XCLEg1wiLFwiYWNcIjpcIuKIvlwiLFwiYWNkXCI6XCLiiL9cIixcImFjRVwiOlwi4oi+zLNcIixcIkFjaXJjXCI6XCLDglwiLFwiYWNpcmNcIjpcIsOiXCIsXCJhY3V0ZVwiOlwiwrRcIixcIkFjeVwiOlwi0JBcIixcImFjeVwiOlwi0LBcIixcIkFFbGlnXCI6XCLDhlwiLFwiYWVsaWdcIjpcIsOmXCIsXCJhZlwiOlwi4oGhXCIsXCJBZnJcIjpcIvCdlIRcIixcImFmclwiOlwi8J2UnlwiLFwiQWdyYXZlXCI6XCLDgFwiLFwiYWdyYXZlXCI6XCLDoFwiLFwiYWxlZnN5bVwiOlwi4oS1XCIsXCJhbGVwaFwiOlwi4oS1XCIsXCJBbHBoYVwiOlwizpFcIixcImFscGhhXCI6XCLOsVwiLFwiQW1hY3JcIjpcIsSAXCIsXCJhbWFjclwiOlwixIFcIixcImFtYWxnXCI6XCLiqL9cIixcImFtcFwiOlwiJlwiLFwiQU1QXCI6XCImXCIsXCJhbmRhbmRcIjpcIuKplVwiLFwiQW5kXCI6XCLiqZNcIixcImFuZFwiOlwi4oinXCIsXCJhbmRkXCI6XCLiqZxcIixcImFuZHNsb3BlXCI6XCLiqZhcIixcImFuZHZcIjpcIuKpmlwiLFwiYW5nXCI6XCLiiKBcIixcImFuZ2VcIjpcIuKmpFwiLFwiYW5nbGVcIjpcIuKIoFwiLFwiYW5nbXNkYWFcIjpcIuKmqFwiLFwiYW5nbXNkYWJcIjpcIuKmqVwiLFwiYW5nbXNkYWNcIjpcIuKmqlwiLFwiYW5nbXNkYWRcIjpcIuKmq1wiLFwiYW5nbXNkYWVcIjpcIuKmrFwiLFwiYW5nbXNkYWZcIjpcIuKmrVwiLFwiYW5nbXNkYWdcIjpcIuKmrlwiLFwiYW5nbXNkYWhcIjpcIuKmr1wiLFwiYW5nbXNkXCI6XCLiiKFcIixcImFuZ3J0XCI6XCLiiJ9cIixcImFuZ3J0dmJcIjpcIuKKvlwiLFwiYW5ncnR2YmRcIjpcIuKmnVwiLFwiYW5nc3BoXCI6XCLiiKJcIixcImFuZ3N0XCI6XCLDhVwiLFwiYW5nemFyclwiOlwi4o28XCIsXCJBb2dvblwiOlwixIRcIixcImFvZ29uXCI6XCLEhVwiLFwiQW9wZlwiOlwi8J2UuFwiLFwiYW9wZlwiOlwi8J2VklwiLFwiYXBhY2lyXCI6XCLiqa9cIixcImFwXCI6XCLiiYhcIixcImFwRVwiOlwi4qmwXCIsXCJhcGVcIjpcIuKJilwiLFwiYXBpZFwiOlwi4omLXCIsXCJhcG9zXCI6XCInXCIsXCJBcHBseUZ1bmN0aW9uXCI6XCLigaFcIixcImFwcHJveFwiOlwi4omIXCIsXCJhcHByb3hlcVwiOlwi4omKXCIsXCJBcmluZ1wiOlwiw4VcIixcImFyaW5nXCI6XCLDpVwiLFwiQXNjclwiOlwi8J2SnFwiLFwiYXNjclwiOlwi8J2StlwiLFwiQXNzaWduXCI6XCLiiZRcIixcImFzdFwiOlwiKlwiLFwiYXN5bXBcIjpcIuKJiFwiLFwiYXN5bXBlcVwiOlwi4omNXCIsXCJBdGlsZGVcIjpcIsODXCIsXCJhdGlsZGVcIjpcIsOjXCIsXCJBdW1sXCI6XCLDhFwiLFwiYXVtbFwiOlwiw6RcIixcImF3Y29uaW50XCI6XCLiiLNcIixcImF3aW50XCI6XCLiqJFcIixcImJhY2tjb25nXCI6XCLiiYxcIixcImJhY2tlcHNpbG9uXCI6XCLPtlwiLFwiYmFja3ByaW1lXCI6XCLigLVcIixcImJhY2tzaW1cIjpcIuKIvVwiLFwiYmFja3NpbWVxXCI6XCLii41cIixcIkJhY2tzbGFzaFwiOlwi4oiWXCIsXCJCYXJ2XCI6XCLiq6dcIixcImJhcnZlZVwiOlwi4oq9XCIsXCJiYXJ3ZWRcIjpcIuKMhVwiLFwiQmFyd2VkXCI6XCLijIZcIixcImJhcndlZGdlXCI6XCLijIVcIixcImJicmtcIjpcIuKOtVwiLFwiYmJya3RicmtcIjpcIuKOtlwiLFwiYmNvbmdcIjpcIuKJjFwiLFwiQmN5XCI6XCLQkVwiLFwiYmN5XCI6XCLQsVwiLFwiYmRxdW9cIjpcIuKAnlwiLFwiYmVjYXVzXCI6XCLiiLVcIixcImJlY2F1c2VcIjpcIuKItVwiLFwiQmVjYXVzZVwiOlwi4oi1XCIsXCJiZW1wdHl2XCI6XCLiprBcIixcImJlcHNpXCI6XCLPtlwiLFwiYmVybm91XCI6XCLihKxcIixcIkJlcm5vdWxsaXNcIjpcIuKErFwiLFwiQmV0YVwiOlwizpJcIixcImJldGFcIjpcIs6yXCIsXCJiZXRoXCI6XCLihLZcIixcImJldHdlZW5cIjpcIuKJrFwiLFwiQmZyXCI6XCLwnZSFXCIsXCJiZnJcIjpcIvCdlJ9cIixcImJpZ2NhcFwiOlwi4ouCXCIsXCJiaWdjaXJjXCI6XCLil69cIixcImJpZ2N1cFwiOlwi4ouDXCIsXCJiaWdvZG90XCI6XCLiqIBcIixcImJpZ29wbHVzXCI6XCLiqIFcIixcImJpZ290aW1lc1wiOlwi4qiCXCIsXCJiaWdzcWN1cFwiOlwi4qiGXCIsXCJiaWdzdGFyXCI6XCLimIVcIixcImJpZ3RyaWFuZ2xlZG93blwiOlwi4pa9XCIsXCJiaWd0cmlhbmdsZXVwXCI6XCLilrNcIixcImJpZ3VwbHVzXCI6XCLiqIRcIixcImJpZ3ZlZVwiOlwi4ouBXCIsXCJiaWd3ZWRnZVwiOlwi4ouAXCIsXCJia2Fyb3dcIjpcIuKkjVwiLFwiYmxhY2tsb3plbmdlXCI6XCLip6tcIixcImJsYWNrc3F1YXJlXCI6XCLilqpcIixcImJsYWNrdHJpYW5nbGVcIjpcIuKWtFwiLFwiYmxhY2t0cmlhbmdsZWRvd25cIjpcIuKWvlwiLFwiYmxhY2t0cmlhbmdsZWxlZnRcIjpcIuKXglwiLFwiYmxhY2t0cmlhbmdsZXJpZ2h0XCI6XCLilrhcIixcImJsYW5rXCI6XCLikKNcIixcImJsazEyXCI6XCLilpJcIixcImJsazE0XCI6XCLilpFcIixcImJsazM0XCI6XCLilpNcIixcImJsb2NrXCI6XCLilohcIixcImJuZVwiOlwiPeKDpVwiLFwiYm5lcXVpdlwiOlwi4omh4oOlXCIsXCJiTm90XCI6XCLiq61cIixcImJub3RcIjpcIuKMkFwiLFwiQm9wZlwiOlwi8J2UuVwiLFwiYm9wZlwiOlwi8J2Vk1wiLFwiYm90XCI6XCLiiqVcIixcImJvdHRvbVwiOlwi4oqlXCIsXCJib3d0aWVcIjpcIuKLiFwiLFwiYm94Ym94XCI6XCLip4lcIixcImJveGRsXCI6XCLilJBcIixcImJveGRMXCI6XCLilZVcIixcImJveERsXCI6XCLilZZcIixcImJveERMXCI6XCLilZdcIixcImJveGRyXCI6XCLilIxcIixcImJveGRSXCI6XCLilZJcIixcImJveERyXCI6XCLilZNcIixcImJveERSXCI6XCLilZRcIixcImJveGhcIjpcIuKUgFwiLFwiYm94SFwiOlwi4pWQXCIsXCJib3hoZFwiOlwi4pSsXCIsXCJib3hIZFwiOlwi4pWkXCIsXCJib3hoRFwiOlwi4pWlXCIsXCJib3hIRFwiOlwi4pWmXCIsXCJib3hodVwiOlwi4pS0XCIsXCJib3hIdVwiOlwi4pWnXCIsXCJib3hoVVwiOlwi4pWoXCIsXCJib3hIVVwiOlwi4pWpXCIsXCJib3htaW51c1wiOlwi4oqfXCIsXCJib3hwbHVzXCI6XCLiip5cIixcImJveHRpbWVzXCI6XCLiiqBcIixcImJveHVsXCI6XCLilJhcIixcImJveHVMXCI6XCLilZtcIixcImJveFVsXCI6XCLilZxcIixcImJveFVMXCI6XCLilZ1cIixcImJveHVyXCI6XCLilJRcIixcImJveHVSXCI6XCLilZhcIixcImJveFVyXCI6XCLilZlcIixcImJveFVSXCI6XCLilZpcIixcImJveHZcIjpcIuKUglwiLFwiYm94VlwiOlwi4pWRXCIsXCJib3h2aFwiOlwi4pS8XCIsXCJib3h2SFwiOlwi4pWqXCIsXCJib3hWaFwiOlwi4pWrXCIsXCJib3hWSFwiOlwi4pWsXCIsXCJib3h2bFwiOlwi4pSkXCIsXCJib3h2TFwiOlwi4pWhXCIsXCJib3hWbFwiOlwi4pWiXCIsXCJib3hWTFwiOlwi4pWjXCIsXCJib3h2clwiOlwi4pScXCIsXCJib3h2UlwiOlwi4pWeXCIsXCJib3hWclwiOlwi4pWfXCIsXCJib3hWUlwiOlwi4pWgXCIsXCJicHJpbWVcIjpcIuKAtVwiLFwiYnJldmVcIjpcIsuYXCIsXCJCcmV2ZVwiOlwiy5hcIixcImJydmJhclwiOlwiwqZcIixcImJzY3JcIjpcIvCdkrdcIixcIkJzY3JcIjpcIuKErFwiLFwiYnNlbWlcIjpcIuKBj1wiLFwiYnNpbVwiOlwi4oi9XCIsXCJic2ltZVwiOlwi4ouNXCIsXCJic29sYlwiOlwi4qeFXCIsXCJic29sXCI6XCJcXFxcXCIsXCJic29saHN1YlwiOlwi4p+IXCIsXCJidWxsXCI6XCLigKJcIixcImJ1bGxldFwiOlwi4oCiXCIsXCJidW1wXCI6XCLiiY5cIixcImJ1bXBFXCI6XCLiqq5cIixcImJ1bXBlXCI6XCLiiY9cIixcIkJ1bXBlcVwiOlwi4omOXCIsXCJidW1wZXFcIjpcIuKJj1wiLFwiQ2FjdXRlXCI6XCLEhlwiLFwiY2FjdXRlXCI6XCLEh1wiLFwiY2FwYW5kXCI6XCLiqYRcIixcImNhcGJyY3VwXCI6XCLiqYlcIixcImNhcGNhcFwiOlwi4qmLXCIsXCJjYXBcIjpcIuKIqVwiLFwiQ2FwXCI6XCLii5JcIixcImNhcGN1cFwiOlwi4qmHXCIsXCJjYXBkb3RcIjpcIuKpgFwiLFwiQ2FwaXRhbERpZmZlcmVudGlhbERcIjpcIuKFhVwiLFwiY2Fwc1wiOlwi4oip77iAXCIsXCJjYXJldFwiOlwi4oGBXCIsXCJjYXJvblwiOlwiy4dcIixcIkNheWxleXNcIjpcIuKErVwiLFwiY2NhcHNcIjpcIuKpjVwiLFwiQ2Nhcm9uXCI6XCLEjFwiLFwiY2Nhcm9uXCI6XCLEjVwiLFwiQ2NlZGlsXCI6XCLDh1wiLFwiY2NlZGlsXCI6XCLDp1wiLFwiQ2NpcmNcIjpcIsSIXCIsXCJjY2lyY1wiOlwixIlcIixcIkNjb25pbnRcIjpcIuKIsFwiLFwiY2N1cHNcIjpcIuKpjFwiLFwiY2N1cHNzbVwiOlwi4qmQXCIsXCJDZG90XCI6XCLEilwiLFwiY2RvdFwiOlwixItcIixcImNlZGlsXCI6XCLCuFwiLFwiQ2VkaWxsYVwiOlwiwrhcIixcImNlbXB0eXZcIjpcIuKmslwiLFwiY2VudFwiOlwiwqJcIixcImNlbnRlcmRvdFwiOlwiwrdcIixcIkNlbnRlckRvdFwiOlwiwrdcIixcImNmclwiOlwi8J2UoFwiLFwiQ2ZyXCI6XCLihK1cIixcIkNIY3lcIjpcItCnXCIsXCJjaGN5XCI6XCLRh1wiLFwiY2hlY2tcIjpcIuKck1wiLFwiY2hlY2ttYXJrXCI6XCLinJNcIixcIkNoaVwiOlwizqdcIixcImNoaVwiOlwiz4dcIixcImNpcmNcIjpcIsuGXCIsXCJjaXJjZXFcIjpcIuKJl1wiLFwiY2lyY2xlYXJyb3dsZWZ0XCI6XCLihrpcIixcImNpcmNsZWFycm93cmlnaHRcIjpcIuKGu1wiLFwiY2lyY2xlZGFzdFwiOlwi4oqbXCIsXCJjaXJjbGVkY2lyY1wiOlwi4oqaXCIsXCJjaXJjbGVkZGFzaFwiOlwi4oqdXCIsXCJDaXJjbGVEb3RcIjpcIuKKmVwiLFwiY2lyY2xlZFJcIjpcIsKuXCIsXCJjaXJjbGVkU1wiOlwi4pOIXCIsXCJDaXJjbGVNaW51c1wiOlwi4oqWXCIsXCJDaXJjbGVQbHVzXCI6XCLiipVcIixcIkNpcmNsZVRpbWVzXCI6XCLiipdcIixcImNpclwiOlwi4peLXCIsXCJjaXJFXCI6XCLip4NcIixcImNpcmVcIjpcIuKJl1wiLFwiY2lyZm5pbnRcIjpcIuKokFwiLFwiY2lybWlkXCI6XCLiq69cIixcImNpcnNjaXJcIjpcIuKnglwiLFwiQ2xvY2t3aXNlQ29udG91ckludGVncmFsXCI6XCLiiLJcIixcIkNsb3NlQ3VybHlEb3VibGVRdW90ZVwiOlwi4oCdXCIsXCJDbG9zZUN1cmx5UXVvdGVcIjpcIuKAmVwiLFwiY2x1YnNcIjpcIuKZo1wiLFwiY2x1YnN1aXRcIjpcIuKZo1wiLFwiY29sb25cIjpcIjpcIixcIkNvbG9uXCI6XCLiiLdcIixcIkNvbG9uZVwiOlwi4qm0XCIsXCJjb2xvbmVcIjpcIuKJlFwiLFwiY29sb25lcVwiOlwi4omUXCIsXCJjb21tYVwiOlwiLFwiLFwiY29tbWF0XCI6XCJAXCIsXCJjb21wXCI6XCLiiIFcIixcImNvbXBmblwiOlwi4oiYXCIsXCJjb21wbGVtZW50XCI6XCLiiIFcIixcImNvbXBsZXhlc1wiOlwi4oSCXCIsXCJjb25nXCI6XCLiiYVcIixcImNvbmdkb3RcIjpcIuKprVwiLFwiQ29uZ3J1ZW50XCI6XCLiiaFcIixcImNvbmludFwiOlwi4oiuXCIsXCJDb25pbnRcIjpcIuKIr1wiLFwiQ29udG91ckludGVncmFsXCI6XCLiiK5cIixcImNvcGZcIjpcIvCdlZRcIixcIkNvcGZcIjpcIuKEglwiLFwiY29wcm9kXCI6XCLiiJBcIixcIkNvcHJvZHVjdFwiOlwi4oiQXCIsXCJjb3B5XCI6XCLCqVwiLFwiQ09QWVwiOlwiwqlcIixcImNvcHlzclwiOlwi4oSXXCIsXCJDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsXCI6XCLiiLNcIixcImNyYXJyXCI6XCLihrVcIixcImNyb3NzXCI6XCLinJdcIixcIkNyb3NzXCI6XCLiqK9cIixcIkNzY3JcIjpcIvCdkp5cIixcImNzY3JcIjpcIvCdkrhcIixcImNzdWJcIjpcIuKrj1wiLFwiY3N1YmVcIjpcIuKrkVwiLFwiY3N1cFwiOlwi4quQXCIsXCJjc3VwZVwiOlwi4quSXCIsXCJjdGRvdFwiOlwi4ouvXCIsXCJjdWRhcnJsXCI6XCLipLhcIixcImN1ZGFycnJcIjpcIuKktVwiLFwiY3VlcHJcIjpcIuKLnlwiLFwiY3Vlc2NcIjpcIuKLn1wiLFwiY3VsYXJyXCI6XCLihrZcIixcImN1bGFycnBcIjpcIuKkvVwiLFwiY3VwYnJjYXBcIjpcIuKpiFwiLFwiY3VwY2FwXCI6XCLiqYZcIixcIkN1cENhcFwiOlwi4omNXCIsXCJjdXBcIjpcIuKIqlwiLFwiQ3VwXCI6XCLii5NcIixcImN1cGN1cFwiOlwi4qmKXCIsXCJjdXBkb3RcIjpcIuKKjVwiLFwiY3Vwb3JcIjpcIuKphVwiLFwiY3Vwc1wiOlwi4oiq77iAXCIsXCJjdXJhcnJcIjpcIuKGt1wiLFwiY3VyYXJybVwiOlwi4qS8XCIsXCJjdXJseWVxcHJlY1wiOlwi4oueXCIsXCJjdXJseWVxc3VjY1wiOlwi4oufXCIsXCJjdXJseXZlZVwiOlwi4ouOXCIsXCJjdXJseXdlZGdlXCI6XCLii49cIixcImN1cnJlblwiOlwiwqRcIixcImN1cnZlYXJyb3dsZWZ0XCI6XCLihrZcIixcImN1cnZlYXJyb3dyaWdodFwiOlwi4oa3XCIsXCJjdXZlZVwiOlwi4ouOXCIsXCJjdXdlZFwiOlwi4ouPXCIsXCJjd2NvbmludFwiOlwi4oiyXCIsXCJjd2ludFwiOlwi4oixXCIsXCJjeWxjdHlcIjpcIuKMrVwiLFwiZGFnZ2VyXCI6XCLigKBcIixcIkRhZ2dlclwiOlwi4oChXCIsXCJkYWxldGhcIjpcIuKEuFwiLFwiZGFyclwiOlwi4oaTXCIsXCJEYXJyXCI6XCLihqFcIixcImRBcnJcIjpcIuKHk1wiLFwiZGFzaFwiOlwi4oCQXCIsXCJEYXNodlwiOlwi4qukXCIsXCJkYXNodlwiOlwi4oqjXCIsXCJkYmthcm93XCI6XCLipI9cIixcImRibGFjXCI6XCLLnVwiLFwiRGNhcm9uXCI6XCLEjlwiLFwiZGNhcm9uXCI6XCLEj1wiLFwiRGN5XCI6XCLQlFwiLFwiZGN5XCI6XCLQtFwiLFwiZGRhZ2dlclwiOlwi4oChXCIsXCJkZGFyclwiOlwi4oeKXCIsXCJERFwiOlwi4oWFXCIsXCJkZFwiOlwi4oWGXCIsXCJERG90cmFoZFwiOlwi4qSRXCIsXCJkZG90c2VxXCI6XCLiqbdcIixcImRlZ1wiOlwiwrBcIixcIkRlbFwiOlwi4oiHXCIsXCJEZWx0YVwiOlwizpRcIixcImRlbHRhXCI6XCLOtFwiLFwiZGVtcHR5dlwiOlwi4qaxXCIsXCJkZmlzaHRcIjpcIuKlv1wiLFwiRGZyXCI6XCLwnZSHXCIsXCJkZnJcIjpcIvCdlKFcIixcImRIYXJcIjpcIuKlpVwiLFwiZGhhcmxcIjpcIuKHg1wiLFwiZGhhcnJcIjpcIuKHglwiLFwiRGlhY3JpdGljYWxBY3V0ZVwiOlwiwrRcIixcIkRpYWNyaXRpY2FsRG90XCI6XCLLmVwiLFwiRGlhY3JpdGljYWxEb3VibGVBY3V0ZVwiOlwiy51cIixcIkRpYWNyaXRpY2FsR3JhdmVcIjpcImBcIixcIkRpYWNyaXRpY2FsVGlsZGVcIjpcIsucXCIsXCJkaWFtXCI6XCLii4RcIixcImRpYW1vbmRcIjpcIuKLhFwiLFwiRGlhbW9uZFwiOlwi4ouEXCIsXCJkaWFtb25kc3VpdFwiOlwi4pmmXCIsXCJkaWFtc1wiOlwi4pmmXCIsXCJkaWVcIjpcIsKoXCIsXCJEaWZmZXJlbnRpYWxEXCI6XCLihYZcIixcImRpZ2FtbWFcIjpcIs+dXCIsXCJkaXNpblwiOlwi4ouyXCIsXCJkaXZcIjpcIsO3XCIsXCJkaXZpZGVcIjpcIsO3XCIsXCJkaXZpZGVvbnRpbWVzXCI6XCLii4dcIixcImRpdm9ueFwiOlwi4ouHXCIsXCJESmN5XCI6XCLQglwiLFwiZGpjeVwiOlwi0ZJcIixcImRsY29yblwiOlwi4oyeXCIsXCJkbGNyb3BcIjpcIuKMjVwiLFwiZG9sbGFyXCI6XCIkXCIsXCJEb3BmXCI6XCLwnZS7XCIsXCJkb3BmXCI6XCLwnZWVXCIsXCJEb3RcIjpcIsKoXCIsXCJkb3RcIjpcIsuZXCIsXCJEb3REb3RcIjpcIuKDnFwiLFwiZG90ZXFcIjpcIuKJkFwiLFwiZG90ZXFkb3RcIjpcIuKJkVwiLFwiRG90RXF1YWxcIjpcIuKJkFwiLFwiZG90bWludXNcIjpcIuKIuFwiLFwiZG90cGx1c1wiOlwi4oiUXCIsXCJkb3RzcXVhcmVcIjpcIuKKoVwiLFwiZG91YmxlYmFyd2VkZ2VcIjpcIuKMhlwiLFwiRG91YmxlQ29udG91ckludGVncmFsXCI6XCLiiK9cIixcIkRvdWJsZURvdFwiOlwiwqhcIixcIkRvdWJsZURvd25BcnJvd1wiOlwi4oeTXCIsXCJEb3VibGVMZWZ0QXJyb3dcIjpcIuKHkFwiLFwiRG91YmxlTGVmdFJpZ2h0QXJyb3dcIjpcIuKHlFwiLFwiRG91YmxlTGVmdFRlZVwiOlwi4qukXCIsXCJEb3VibGVMb25nTGVmdEFycm93XCI6XCLin7hcIixcIkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvd1wiOlwi4p+6XCIsXCJEb3VibGVMb25nUmlnaHRBcnJvd1wiOlwi4p+5XCIsXCJEb3VibGVSaWdodEFycm93XCI6XCLih5JcIixcIkRvdWJsZVJpZ2h0VGVlXCI6XCLiiqhcIixcIkRvdWJsZVVwQXJyb3dcIjpcIuKHkVwiLFwiRG91YmxlVXBEb3duQXJyb3dcIjpcIuKHlVwiLFwiRG91YmxlVmVydGljYWxCYXJcIjpcIuKIpVwiLFwiRG93bkFycm93QmFyXCI6XCLipJNcIixcImRvd25hcnJvd1wiOlwi4oaTXCIsXCJEb3duQXJyb3dcIjpcIuKGk1wiLFwiRG93bmFycm93XCI6XCLih5NcIixcIkRvd25BcnJvd1VwQXJyb3dcIjpcIuKHtVwiLFwiRG93bkJyZXZlXCI6XCLMkVwiLFwiZG93bmRvd25hcnJvd3NcIjpcIuKHilwiLFwiZG93bmhhcnBvb25sZWZ0XCI6XCLih4NcIixcImRvd25oYXJwb29ucmlnaHRcIjpcIuKHglwiLFwiRG93bkxlZnRSaWdodFZlY3RvclwiOlwi4qWQXCIsXCJEb3duTGVmdFRlZVZlY3RvclwiOlwi4qWeXCIsXCJEb3duTGVmdFZlY3RvckJhclwiOlwi4qWWXCIsXCJEb3duTGVmdFZlY3RvclwiOlwi4oa9XCIsXCJEb3duUmlnaHRUZWVWZWN0b3JcIjpcIuKln1wiLFwiRG93blJpZ2h0VmVjdG9yQmFyXCI6XCLipZdcIixcIkRvd25SaWdodFZlY3RvclwiOlwi4oeBXCIsXCJEb3duVGVlQXJyb3dcIjpcIuKGp1wiLFwiRG93blRlZVwiOlwi4oqkXCIsXCJkcmJrYXJvd1wiOlwi4qSQXCIsXCJkcmNvcm5cIjpcIuKMn1wiLFwiZHJjcm9wXCI6XCLijIxcIixcIkRzY3JcIjpcIvCdkp9cIixcImRzY3JcIjpcIvCdkrlcIixcIkRTY3lcIjpcItCFXCIsXCJkc2N5XCI6XCLRlVwiLFwiZHNvbFwiOlwi4qe2XCIsXCJEc3Ryb2tcIjpcIsSQXCIsXCJkc3Ryb2tcIjpcIsSRXCIsXCJkdGRvdFwiOlwi4ouxXCIsXCJkdHJpXCI6XCLilr9cIixcImR0cmlmXCI6XCLilr5cIixcImR1YXJyXCI6XCLih7VcIixcImR1aGFyXCI6XCLipa9cIixcImR3YW5nbGVcIjpcIuKmplwiLFwiRFpjeVwiOlwi0I9cIixcImR6Y3lcIjpcItGfXCIsXCJkemlncmFyclwiOlwi4p+/XCIsXCJFYWN1dGVcIjpcIsOJXCIsXCJlYWN1dGVcIjpcIsOpXCIsXCJlYXN0ZXJcIjpcIuKprlwiLFwiRWNhcm9uXCI6XCLEmlwiLFwiZWNhcm9uXCI6XCLEm1wiLFwiRWNpcmNcIjpcIsOKXCIsXCJlY2lyY1wiOlwiw6pcIixcImVjaXJcIjpcIuKJllwiLFwiZWNvbG9uXCI6XCLiiZVcIixcIkVjeVwiOlwi0K1cIixcImVjeVwiOlwi0Y1cIixcImVERG90XCI6XCLiqbdcIixcIkVkb3RcIjpcIsSWXCIsXCJlZG90XCI6XCLEl1wiLFwiZURvdFwiOlwi4omRXCIsXCJlZVwiOlwi4oWHXCIsXCJlZkRvdFwiOlwi4omSXCIsXCJFZnJcIjpcIvCdlIhcIixcImVmclwiOlwi8J2UolwiLFwiZWdcIjpcIuKqmlwiLFwiRWdyYXZlXCI6XCLDiFwiLFwiZWdyYXZlXCI6XCLDqFwiLFwiZWdzXCI6XCLiqpZcIixcImVnc2RvdFwiOlwi4qqYXCIsXCJlbFwiOlwi4qqZXCIsXCJFbGVtZW50XCI6XCLiiIhcIixcImVsaW50ZXJzXCI6XCLij6dcIixcImVsbFwiOlwi4oSTXCIsXCJlbHNcIjpcIuKqlVwiLFwiZWxzZG90XCI6XCLiqpdcIixcIkVtYWNyXCI6XCLEklwiLFwiZW1hY3JcIjpcIsSTXCIsXCJlbXB0eVwiOlwi4oiFXCIsXCJlbXB0eXNldFwiOlwi4oiFXCIsXCJFbXB0eVNtYWxsU3F1YXJlXCI6XCLil7tcIixcImVtcHR5dlwiOlwi4oiFXCIsXCJFbXB0eVZlcnlTbWFsbFNxdWFyZVwiOlwi4parXCIsXCJlbXNwMTNcIjpcIuKAhFwiLFwiZW1zcDE0XCI6XCLigIVcIixcImVtc3BcIjpcIuKAg1wiLFwiRU5HXCI6XCLFilwiLFwiZW5nXCI6XCLFi1wiLFwiZW5zcFwiOlwi4oCCXCIsXCJFb2dvblwiOlwixJhcIixcImVvZ29uXCI6XCLEmVwiLFwiRW9wZlwiOlwi8J2UvFwiLFwiZW9wZlwiOlwi8J2VllwiLFwiZXBhclwiOlwi4ouVXCIsXCJlcGFyc2xcIjpcIuKno1wiLFwiZXBsdXNcIjpcIuKpsVwiLFwiZXBzaVwiOlwizrVcIixcIkVwc2lsb25cIjpcIs6VXCIsXCJlcHNpbG9uXCI6XCLOtVwiLFwiZXBzaXZcIjpcIs+1XCIsXCJlcWNpcmNcIjpcIuKJllwiLFwiZXFjb2xvblwiOlwi4omVXCIsXCJlcXNpbVwiOlwi4omCXCIsXCJlcXNsYW50Z3RyXCI6XCLiqpZcIixcImVxc2xhbnRsZXNzXCI6XCLiqpVcIixcIkVxdWFsXCI6XCLiqbVcIixcImVxdWFsc1wiOlwiPVwiLFwiRXF1YWxUaWxkZVwiOlwi4omCXCIsXCJlcXVlc3RcIjpcIuKJn1wiLFwiRXF1aWxpYnJpdW1cIjpcIuKHjFwiLFwiZXF1aXZcIjpcIuKJoVwiLFwiZXF1aXZERFwiOlwi4qm4XCIsXCJlcXZwYXJzbFwiOlwi4qelXCIsXCJlcmFyclwiOlwi4qWxXCIsXCJlckRvdFwiOlwi4omTXCIsXCJlc2NyXCI6XCLihK9cIixcIkVzY3JcIjpcIuKEsFwiLFwiZXNkb3RcIjpcIuKJkFwiLFwiRXNpbVwiOlwi4qmzXCIsXCJlc2ltXCI6XCLiiYJcIixcIkV0YVwiOlwizpdcIixcImV0YVwiOlwizrdcIixcIkVUSFwiOlwiw5BcIixcImV0aFwiOlwiw7BcIixcIkV1bWxcIjpcIsOLXCIsXCJldW1sXCI6XCLDq1wiLFwiZXVyb1wiOlwi4oKsXCIsXCJleGNsXCI6XCIhXCIsXCJleGlzdFwiOlwi4oiDXCIsXCJFeGlzdHNcIjpcIuKIg1wiLFwiZXhwZWN0YXRpb25cIjpcIuKEsFwiLFwiZXhwb25lbnRpYWxlXCI6XCLihYdcIixcIkV4cG9uZW50aWFsRVwiOlwi4oWHXCIsXCJmYWxsaW5nZG90c2VxXCI6XCLiiZJcIixcIkZjeVwiOlwi0KRcIixcImZjeVwiOlwi0YRcIixcImZlbWFsZVwiOlwi4pmAXCIsXCJmZmlsaWdcIjpcIu+sg1wiLFwiZmZsaWdcIjpcIu+sgFwiLFwiZmZsbGlnXCI6XCLvrIRcIixcIkZmclwiOlwi8J2UiVwiLFwiZmZyXCI6XCLwnZSjXCIsXCJmaWxpZ1wiOlwi76yBXCIsXCJGaWxsZWRTbWFsbFNxdWFyZVwiOlwi4pe8XCIsXCJGaWxsZWRWZXJ5U21hbGxTcXVhcmVcIjpcIuKWqlwiLFwiZmpsaWdcIjpcImZqXCIsXCJmbGF0XCI6XCLima1cIixcImZsbGlnXCI6XCLvrIJcIixcImZsdG5zXCI6XCLilrFcIixcImZub2ZcIjpcIsaSXCIsXCJGb3BmXCI6XCLwnZS9XCIsXCJmb3BmXCI6XCLwnZWXXCIsXCJmb3JhbGxcIjpcIuKIgFwiLFwiRm9yQWxsXCI6XCLiiIBcIixcImZvcmtcIjpcIuKLlFwiLFwiZm9ya3ZcIjpcIuKrmVwiLFwiRm91cmllcnRyZlwiOlwi4oSxXCIsXCJmcGFydGludFwiOlwi4qiNXCIsXCJmcmFjMTJcIjpcIsK9XCIsXCJmcmFjMTNcIjpcIuKFk1wiLFwiZnJhYzE0XCI6XCLCvFwiLFwiZnJhYzE1XCI6XCLihZVcIixcImZyYWMxNlwiOlwi4oWZXCIsXCJmcmFjMThcIjpcIuKFm1wiLFwiZnJhYzIzXCI6XCLihZRcIixcImZyYWMyNVwiOlwi4oWWXCIsXCJmcmFjMzRcIjpcIsK+XCIsXCJmcmFjMzVcIjpcIuKFl1wiLFwiZnJhYzM4XCI6XCLihZxcIixcImZyYWM0NVwiOlwi4oWYXCIsXCJmcmFjNTZcIjpcIuKFmlwiLFwiZnJhYzU4XCI6XCLihZ1cIixcImZyYWM3OFwiOlwi4oWeXCIsXCJmcmFzbFwiOlwi4oGEXCIsXCJmcm93blwiOlwi4oyiXCIsXCJmc2NyXCI6XCLwnZK7XCIsXCJGc2NyXCI6XCLihLFcIixcImdhY3V0ZVwiOlwix7VcIixcIkdhbW1hXCI6XCLOk1wiLFwiZ2FtbWFcIjpcIs6zXCIsXCJHYW1tYWRcIjpcIs+cXCIsXCJnYW1tYWRcIjpcIs+dXCIsXCJnYXBcIjpcIuKqhlwiLFwiR2JyZXZlXCI6XCLEnlwiLFwiZ2JyZXZlXCI6XCLEn1wiLFwiR2NlZGlsXCI6XCLEolwiLFwiR2NpcmNcIjpcIsScXCIsXCJnY2lyY1wiOlwixJ1cIixcIkdjeVwiOlwi0JNcIixcImdjeVwiOlwi0LNcIixcIkdkb3RcIjpcIsSgXCIsXCJnZG90XCI6XCLEoVwiLFwiZ2VcIjpcIuKJpVwiLFwiZ0VcIjpcIuKJp1wiLFwiZ0VsXCI6XCLiqoxcIixcImdlbFwiOlwi4oubXCIsXCJnZXFcIjpcIuKJpVwiLFwiZ2VxcVwiOlwi4omnXCIsXCJnZXFzbGFudFwiOlwi4qm+XCIsXCJnZXNjY1wiOlwi4qqpXCIsXCJnZXNcIjpcIuKpvlwiLFwiZ2VzZG90XCI6XCLiqoBcIixcImdlc2RvdG9cIjpcIuKqglwiLFwiZ2VzZG90b2xcIjpcIuKqhFwiLFwiZ2VzbFwiOlwi4oub77iAXCIsXCJnZXNsZXNcIjpcIuKqlFwiLFwiR2ZyXCI6XCLwnZSKXCIsXCJnZnJcIjpcIvCdlKRcIixcImdnXCI6XCLiiatcIixcIkdnXCI6XCLii5lcIixcImdnZ1wiOlwi4ouZXCIsXCJnaW1lbFwiOlwi4oS3XCIsXCJHSmN5XCI6XCLQg1wiLFwiZ2pjeVwiOlwi0ZNcIixcImdsYVwiOlwi4qqlXCIsXCJnbFwiOlwi4om3XCIsXCJnbEVcIjpcIuKqklwiLFwiZ2xqXCI6XCLiqqRcIixcImduYXBcIjpcIuKqilwiLFwiZ25hcHByb3hcIjpcIuKqilwiLFwiZ25lXCI6XCLiqohcIixcImduRVwiOlwi4ompXCIsXCJnbmVxXCI6XCLiqohcIixcImduZXFxXCI6XCLiialcIixcImduc2ltXCI6XCLii6dcIixcIkdvcGZcIjpcIvCdlL5cIixcImdvcGZcIjpcIvCdlZhcIixcImdyYXZlXCI6XCJgXCIsXCJHcmVhdGVyRXF1YWxcIjpcIuKJpVwiLFwiR3JlYXRlckVxdWFsTGVzc1wiOlwi4oubXCIsXCJHcmVhdGVyRnVsbEVxdWFsXCI6XCLiiadcIixcIkdyZWF0ZXJHcmVhdGVyXCI6XCLiqqJcIixcIkdyZWF0ZXJMZXNzXCI6XCLiibdcIixcIkdyZWF0ZXJTbGFudEVxdWFsXCI6XCLiqb5cIixcIkdyZWF0ZXJUaWxkZVwiOlwi4omzXCIsXCJHc2NyXCI6XCLwnZKiXCIsXCJnc2NyXCI6XCLihIpcIixcImdzaW1cIjpcIuKJs1wiLFwiZ3NpbWVcIjpcIuKqjlwiLFwiZ3NpbWxcIjpcIuKqkFwiLFwiZ3RjY1wiOlwi4qqnXCIsXCJndGNpclwiOlwi4qm6XCIsXCJndFwiOlwiPlwiLFwiR1RcIjpcIj5cIixcIkd0XCI6XCLiiatcIixcImd0ZG90XCI6XCLii5dcIixcImd0bFBhclwiOlwi4qaVXCIsXCJndHF1ZXN0XCI6XCLiqbxcIixcImd0cmFwcHJveFwiOlwi4qqGXCIsXCJndHJhcnJcIjpcIuKluFwiLFwiZ3RyZG90XCI6XCLii5dcIixcImd0cmVxbGVzc1wiOlwi4oubXCIsXCJndHJlcXFsZXNzXCI6XCLiqoxcIixcImd0cmxlc3NcIjpcIuKJt1wiLFwiZ3Ryc2ltXCI6XCLiibNcIixcImd2ZXJ0bmVxcVwiOlwi4omp77iAXCIsXCJndm5FXCI6XCLiianvuIBcIixcIkhhY2VrXCI6XCLLh1wiLFwiaGFpcnNwXCI6XCLigIpcIixcImhhbGZcIjpcIsK9XCIsXCJoYW1pbHRcIjpcIuKEi1wiLFwiSEFSRGN5XCI6XCLQqlwiLFwiaGFyZGN5XCI6XCLRilwiLFwiaGFycmNpclwiOlwi4qWIXCIsXCJoYXJyXCI6XCLihpRcIixcImhBcnJcIjpcIuKHlFwiLFwiaGFycndcIjpcIuKGrVwiLFwiSGF0XCI6XCJeXCIsXCJoYmFyXCI6XCLihI9cIixcIkhjaXJjXCI6XCLEpFwiLFwiaGNpcmNcIjpcIsSlXCIsXCJoZWFydHNcIjpcIuKZpVwiLFwiaGVhcnRzdWl0XCI6XCLimaVcIixcImhlbGxpcFwiOlwi4oCmXCIsXCJoZXJjb25cIjpcIuKKuVwiLFwiaGZyXCI6XCLwnZSlXCIsXCJIZnJcIjpcIuKEjFwiLFwiSGlsYmVydFNwYWNlXCI6XCLihItcIixcImhrc2Vhcm93XCI6XCLipKVcIixcImhrc3dhcm93XCI6XCLipKZcIixcImhvYXJyXCI6XCLih79cIixcImhvbXRodFwiOlwi4oi7XCIsXCJob29rbGVmdGFycm93XCI6XCLihqlcIixcImhvb2tyaWdodGFycm93XCI6XCLihqpcIixcImhvcGZcIjpcIvCdlZlcIixcIkhvcGZcIjpcIuKEjVwiLFwiaG9yYmFyXCI6XCLigJVcIixcIkhvcml6b250YWxMaW5lXCI6XCLilIBcIixcImhzY3JcIjpcIvCdkr1cIixcIkhzY3JcIjpcIuKEi1wiLFwiaHNsYXNoXCI6XCLihI9cIixcIkhzdHJva1wiOlwixKZcIixcImhzdHJva1wiOlwixKdcIixcIkh1bXBEb3duSHVtcFwiOlwi4omOXCIsXCJIdW1wRXF1YWxcIjpcIuKJj1wiLFwiaHlidWxsXCI6XCLigYNcIixcImh5cGhlblwiOlwi4oCQXCIsXCJJYWN1dGVcIjpcIsONXCIsXCJpYWN1dGVcIjpcIsOtXCIsXCJpY1wiOlwi4oGjXCIsXCJJY2lyY1wiOlwiw45cIixcImljaXJjXCI6XCLDrlwiLFwiSWN5XCI6XCLQmFwiLFwiaWN5XCI6XCLQuFwiLFwiSWRvdFwiOlwixLBcIixcIklFY3lcIjpcItCVXCIsXCJpZWN5XCI6XCLQtVwiLFwiaWV4Y2xcIjpcIsKhXCIsXCJpZmZcIjpcIuKHlFwiLFwiaWZyXCI6XCLwnZSmXCIsXCJJZnJcIjpcIuKEkVwiLFwiSWdyYXZlXCI6XCLDjFwiLFwiaWdyYXZlXCI6XCLDrFwiLFwiaWlcIjpcIuKFiFwiLFwiaWlpaW50XCI6XCLiqIxcIixcImlpaW50XCI6XCLiiK1cIixcImlpbmZpblwiOlwi4qecXCIsXCJpaW90YVwiOlwi4oSpXCIsXCJJSmxpZ1wiOlwixLJcIixcImlqbGlnXCI6XCLEs1wiLFwiSW1hY3JcIjpcIsSqXCIsXCJpbWFjclwiOlwixKtcIixcImltYWdlXCI6XCLihJFcIixcIkltYWdpbmFyeUlcIjpcIuKFiFwiLFwiaW1hZ2xpbmVcIjpcIuKEkFwiLFwiaW1hZ3BhcnRcIjpcIuKEkVwiLFwiaW1hdGhcIjpcIsSxXCIsXCJJbVwiOlwi4oSRXCIsXCJpbW9mXCI6XCLiirdcIixcImltcGVkXCI6XCLGtVwiLFwiSW1wbGllc1wiOlwi4oeSXCIsXCJpbmNhcmVcIjpcIuKEhVwiLFwiaW5cIjpcIuKIiFwiLFwiaW5maW5cIjpcIuKInlwiLFwiaW5maW50aWVcIjpcIuKnnVwiLFwiaW5vZG90XCI6XCLEsVwiLFwiaW50Y2FsXCI6XCLiirpcIixcImludFwiOlwi4oirXCIsXCJJbnRcIjpcIuKIrFwiLFwiaW50ZWdlcnNcIjpcIuKEpFwiLFwiSW50ZWdyYWxcIjpcIuKIq1wiLFwiaW50ZXJjYWxcIjpcIuKKulwiLFwiSW50ZXJzZWN0aW9uXCI6XCLii4JcIixcImludGxhcmhrXCI6XCLiqJdcIixcImludHByb2RcIjpcIuKovFwiLFwiSW52aXNpYmxlQ29tbWFcIjpcIuKBo1wiLFwiSW52aXNpYmxlVGltZXNcIjpcIuKBolwiLFwiSU9jeVwiOlwi0IFcIixcImlvY3lcIjpcItGRXCIsXCJJb2dvblwiOlwixK5cIixcImlvZ29uXCI6XCLEr1wiLFwiSW9wZlwiOlwi8J2VgFwiLFwiaW9wZlwiOlwi8J2VmlwiLFwiSW90YVwiOlwizplcIixcImlvdGFcIjpcIs65XCIsXCJpcHJvZFwiOlwi4qi8XCIsXCJpcXVlc3RcIjpcIsK/XCIsXCJpc2NyXCI6XCLwnZK+XCIsXCJJc2NyXCI6XCLihJBcIixcImlzaW5cIjpcIuKIiFwiLFwiaXNpbmRvdFwiOlwi4ou1XCIsXCJpc2luRVwiOlwi4ou5XCIsXCJpc2luc1wiOlwi4ou0XCIsXCJpc2luc3ZcIjpcIuKLs1wiLFwiaXNpbnZcIjpcIuKIiFwiLFwiaXRcIjpcIuKBolwiLFwiSXRpbGRlXCI6XCLEqFwiLFwiaXRpbGRlXCI6XCLEqVwiLFwiSXVrY3lcIjpcItCGXCIsXCJpdWtjeVwiOlwi0ZZcIixcIkl1bWxcIjpcIsOPXCIsXCJpdW1sXCI6XCLDr1wiLFwiSmNpcmNcIjpcIsS0XCIsXCJqY2lyY1wiOlwixLVcIixcIkpjeVwiOlwi0JlcIixcImpjeVwiOlwi0LlcIixcIkpmclwiOlwi8J2UjVwiLFwiamZyXCI6XCLwnZSnXCIsXCJqbWF0aFwiOlwiyLdcIixcIkpvcGZcIjpcIvCdlYFcIixcImpvcGZcIjpcIvCdlZtcIixcIkpzY3JcIjpcIvCdkqVcIixcImpzY3JcIjpcIvCdkr9cIixcIkpzZXJjeVwiOlwi0IhcIixcImpzZXJjeVwiOlwi0ZhcIixcIkp1a2N5XCI6XCLQhFwiLFwianVrY3lcIjpcItGUXCIsXCJLYXBwYVwiOlwizppcIixcImthcHBhXCI6XCLOulwiLFwia2FwcGF2XCI6XCLPsFwiLFwiS2NlZGlsXCI6XCLEtlwiLFwia2NlZGlsXCI6XCLEt1wiLFwiS2N5XCI6XCLQmlwiLFwia2N5XCI6XCLQulwiLFwiS2ZyXCI6XCLwnZSOXCIsXCJrZnJcIjpcIvCdlKhcIixcImtncmVlblwiOlwixLhcIixcIktIY3lcIjpcItClXCIsXCJraGN5XCI6XCLRhVwiLFwiS0pjeVwiOlwi0IxcIixcImtqY3lcIjpcItGcXCIsXCJLb3BmXCI6XCLwnZWCXCIsXCJrb3BmXCI6XCLwnZWcXCIsXCJLc2NyXCI6XCLwnZKmXCIsXCJrc2NyXCI6XCLwnZOAXCIsXCJsQWFyclwiOlwi4oeaXCIsXCJMYWN1dGVcIjpcIsS5XCIsXCJsYWN1dGVcIjpcIsS6XCIsXCJsYWVtcHR5dlwiOlwi4qa0XCIsXCJsYWdyYW5cIjpcIuKEklwiLFwiTGFtYmRhXCI6XCLOm1wiLFwibGFtYmRhXCI6XCLOu1wiLFwibGFuZ1wiOlwi4p+oXCIsXCJMYW5nXCI6XCLin6pcIixcImxhbmdkXCI6XCLippFcIixcImxhbmdsZVwiOlwi4p+oXCIsXCJsYXBcIjpcIuKqhVwiLFwiTGFwbGFjZXRyZlwiOlwi4oSSXCIsXCJsYXF1b1wiOlwiwqtcIixcImxhcnJiXCI6XCLih6RcIixcImxhcnJiZnNcIjpcIuKkn1wiLFwibGFyclwiOlwi4oaQXCIsXCJMYXJyXCI6XCLihp5cIixcImxBcnJcIjpcIuKHkFwiLFwibGFycmZzXCI6XCLipJ1cIixcImxhcnJoa1wiOlwi4oapXCIsXCJsYXJybHBcIjpcIuKGq1wiLFwibGFycnBsXCI6XCLipLlcIixcImxhcnJzaW1cIjpcIuKls1wiLFwibGFycnRsXCI6XCLihqJcIixcImxhdGFpbFwiOlwi4qSZXCIsXCJsQXRhaWxcIjpcIuKkm1wiLFwibGF0XCI6XCLiqqtcIixcImxhdGVcIjpcIuKqrVwiLFwibGF0ZXNcIjpcIuKqre+4gFwiLFwibGJhcnJcIjpcIuKkjFwiLFwibEJhcnJcIjpcIuKkjlwiLFwibGJicmtcIjpcIuKdslwiLFwibGJyYWNlXCI6XCJ7XCIsXCJsYnJhY2tcIjpcIltcIixcImxicmtlXCI6XCLipotcIixcImxicmtzbGRcIjpcIuKmj1wiLFwibGJya3NsdVwiOlwi4qaNXCIsXCJMY2Fyb25cIjpcIsS9XCIsXCJsY2Fyb25cIjpcIsS+XCIsXCJMY2VkaWxcIjpcIsS7XCIsXCJsY2VkaWxcIjpcIsS8XCIsXCJsY2VpbFwiOlwi4oyIXCIsXCJsY3ViXCI6XCJ7XCIsXCJMY3lcIjpcItCbXCIsXCJsY3lcIjpcItC7XCIsXCJsZGNhXCI6XCLipLZcIixcImxkcXVvXCI6XCLigJxcIixcImxkcXVvclwiOlwi4oCeXCIsXCJsZHJkaGFyXCI6XCLipadcIixcImxkcnVzaGFyXCI6XCLipYtcIixcImxkc2hcIjpcIuKGslwiLFwibGVcIjpcIuKJpFwiLFwibEVcIjpcIuKJplwiLFwiTGVmdEFuZ2xlQnJhY2tldFwiOlwi4p+oXCIsXCJMZWZ0QXJyb3dCYXJcIjpcIuKHpFwiLFwibGVmdGFycm93XCI6XCLihpBcIixcIkxlZnRBcnJvd1wiOlwi4oaQXCIsXCJMZWZ0YXJyb3dcIjpcIuKHkFwiLFwiTGVmdEFycm93UmlnaHRBcnJvd1wiOlwi4oeGXCIsXCJsZWZ0YXJyb3d0YWlsXCI6XCLihqJcIixcIkxlZnRDZWlsaW5nXCI6XCLijIhcIixcIkxlZnREb3VibGVCcmFja2V0XCI6XCLin6ZcIixcIkxlZnREb3duVGVlVmVjdG9yXCI6XCLipaFcIixcIkxlZnREb3duVmVjdG9yQmFyXCI6XCLipZlcIixcIkxlZnREb3duVmVjdG9yXCI6XCLih4NcIixcIkxlZnRGbG9vclwiOlwi4oyKXCIsXCJsZWZ0aGFycG9vbmRvd25cIjpcIuKGvVwiLFwibGVmdGhhcnBvb251cFwiOlwi4oa8XCIsXCJsZWZ0bGVmdGFycm93c1wiOlwi4oeHXCIsXCJsZWZ0cmlnaHRhcnJvd1wiOlwi4oaUXCIsXCJMZWZ0UmlnaHRBcnJvd1wiOlwi4oaUXCIsXCJMZWZ0cmlnaHRhcnJvd1wiOlwi4oeUXCIsXCJsZWZ0cmlnaHRhcnJvd3NcIjpcIuKHhlwiLFwibGVmdHJpZ2h0aGFycG9vbnNcIjpcIuKHi1wiLFwibGVmdHJpZ2h0c3F1aWdhcnJvd1wiOlwi4oatXCIsXCJMZWZ0UmlnaHRWZWN0b3JcIjpcIuKljlwiLFwiTGVmdFRlZUFycm93XCI6XCLihqRcIixcIkxlZnRUZWVcIjpcIuKKo1wiLFwiTGVmdFRlZVZlY3RvclwiOlwi4qWaXCIsXCJsZWZ0dGhyZWV0aW1lc1wiOlwi4ouLXCIsXCJMZWZ0VHJpYW5nbGVCYXJcIjpcIuKnj1wiLFwiTGVmdFRyaWFuZ2xlXCI6XCLiirJcIixcIkxlZnRUcmlhbmdsZUVxdWFsXCI6XCLiirRcIixcIkxlZnRVcERvd25WZWN0b3JcIjpcIuKlkVwiLFwiTGVmdFVwVGVlVmVjdG9yXCI6XCLipaBcIixcIkxlZnRVcFZlY3RvckJhclwiOlwi4qWYXCIsXCJMZWZ0VXBWZWN0b3JcIjpcIuKGv1wiLFwiTGVmdFZlY3RvckJhclwiOlwi4qWSXCIsXCJMZWZ0VmVjdG9yXCI6XCLihrxcIixcImxFZ1wiOlwi4qqLXCIsXCJsZWdcIjpcIuKLmlwiLFwibGVxXCI6XCLiiaRcIixcImxlcXFcIjpcIuKJplwiLFwibGVxc2xhbnRcIjpcIuKpvVwiLFwibGVzY2NcIjpcIuKqqFwiLFwibGVzXCI6XCLiqb1cIixcImxlc2RvdFwiOlwi4qm/XCIsXCJsZXNkb3RvXCI6XCLiqoFcIixcImxlc2RvdG9yXCI6XCLiqoNcIixcImxlc2dcIjpcIuKLmu+4gFwiLFwibGVzZ2VzXCI6XCLiqpNcIixcImxlc3NhcHByb3hcIjpcIuKqhVwiLFwibGVzc2RvdFwiOlwi4ouWXCIsXCJsZXNzZXFndHJcIjpcIuKLmlwiLFwibGVzc2VxcWd0clwiOlwi4qqLXCIsXCJMZXNzRXF1YWxHcmVhdGVyXCI6XCLii5pcIixcIkxlc3NGdWxsRXF1YWxcIjpcIuKJplwiLFwiTGVzc0dyZWF0ZXJcIjpcIuKJtlwiLFwibGVzc2d0clwiOlwi4om2XCIsXCJMZXNzTGVzc1wiOlwi4qqhXCIsXCJsZXNzc2ltXCI6XCLiibJcIixcIkxlc3NTbGFudEVxdWFsXCI6XCLiqb1cIixcIkxlc3NUaWxkZVwiOlwi4omyXCIsXCJsZmlzaHRcIjpcIuKlvFwiLFwibGZsb29yXCI6XCLijIpcIixcIkxmclwiOlwi8J2Uj1wiLFwibGZyXCI6XCLwnZSpXCIsXCJsZ1wiOlwi4om2XCIsXCJsZ0VcIjpcIuKqkVwiLFwibEhhclwiOlwi4qWiXCIsXCJsaGFyZFwiOlwi4oa9XCIsXCJsaGFydVwiOlwi4oa8XCIsXCJsaGFydWxcIjpcIuKlqlwiLFwibGhibGtcIjpcIuKWhFwiLFwiTEpjeVwiOlwi0IlcIixcImxqY3lcIjpcItGZXCIsXCJsbGFyclwiOlwi4oeHXCIsXCJsbFwiOlwi4omqXCIsXCJMbFwiOlwi4ouYXCIsXCJsbGNvcm5lclwiOlwi4oyeXCIsXCJMbGVmdGFycm93XCI6XCLih5pcIixcImxsaGFyZFwiOlwi4qWrXCIsXCJsbHRyaVwiOlwi4pe6XCIsXCJMbWlkb3RcIjpcIsS/XCIsXCJsbWlkb3RcIjpcIsWAXCIsXCJsbW91c3RhY2hlXCI6XCLijrBcIixcImxtb3VzdFwiOlwi4o6wXCIsXCJsbmFwXCI6XCLiqolcIixcImxuYXBwcm94XCI6XCLiqolcIixcImxuZVwiOlwi4qqHXCIsXCJsbkVcIjpcIuKJqFwiLFwibG5lcVwiOlwi4qqHXCIsXCJsbmVxcVwiOlwi4omoXCIsXCJsbnNpbVwiOlwi4oumXCIsXCJsb2FuZ1wiOlwi4p+sXCIsXCJsb2FyclwiOlwi4oe9XCIsXCJsb2Jya1wiOlwi4p+mXCIsXCJsb25nbGVmdGFycm93XCI6XCLin7VcIixcIkxvbmdMZWZ0QXJyb3dcIjpcIuKftVwiLFwiTG9uZ2xlZnRhcnJvd1wiOlwi4p+4XCIsXCJsb25nbGVmdHJpZ2h0YXJyb3dcIjpcIuKft1wiLFwiTG9uZ0xlZnRSaWdodEFycm93XCI6XCLin7dcIixcIkxvbmdsZWZ0cmlnaHRhcnJvd1wiOlwi4p+6XCIsXCJsb25nbWFwc3RvXCI6XCLin7xcIixcImxvbmdyaWdodGFycm93XCI6XCLin7ZcIixcIkxvbmdSaWdodEFycm93XCI6XCLin7ZcIixcIkxvbmdyaWdodGFycm93XCI6XCLin7lcIixcImxvb3BhcnJvd2xlZnRcIjpcIuKGq1wiLFwibG9vcGFycm93cmlnaHRcIjpcIuKGrFwiLFwibG9wYXJcIjpcIuKmhVwiLFwiTG9wZlwiOlwi8J2Vg1wiLFwibG9wZlwiOlwi8J2VnVwiLFwibG9wbHVzXCI6XCLiqK1cIixcImxvdGltZXNcIjpcIuKotFwiLFwibG93YXN0XCI6XCLiiJdcIixcImxvd2JhclwiOlwiX1wiLFwiTG93ZXJMZWZ0QXJyb3dcIjpcIuKGmVwiLFwiTG93ZXJSaWdodEFycm93XCI6XCLihphcIixcImxvelwiOlwi4peKXCIsXCJsb3plbmdlXCI6XCLil4pcIixcImxvemZcIjpcIuKnq1wiLFwibHBhclwiOlwiKFwiLFwibHBhcmx0XCI6XCLippNcIixcImxyYXJyXCI6XCLih4ZcIixcImxyY29ybmVyXCI6XCLijJ9cIixcImxyaGFyXCI6XCLih4tcIixcImxyaGFyZFwiOlwi4qWtXCIsXCJscm1cIjpcIuKAjlwiLFwibHJ0cmlcIjpcIuKKv1wiLFwibHNhcXVvXCI6XCLigLlcIixcImxzY3JcIjpcIvCdk4FcIixcIkxzY3JcIjpcIuKEklwiLFwibHNoXCI6XCLihrBcIixcIkxzaFwiOlwi4oawXCIsXCJsc2ltXCI6XCLiibJcIixcImxzaW1lXCI6XCLiqo1cIixcImxzaW1nXCI6XCLiqo9cIixcImxzcWJcIjpcIltcIixcImxzcXVvXCI6XCLigJhcIixcImxzcXVvclwiOlwi4oCaXCIsXCJMc3Ryb2tcIjpcIsWBXCIsXCJsc3Ryb2tcIjpcIsWCXCIsXCJsdGNjXCI6XCLiqqZcIixcImx0Y2lyXCI6XCLiqblcIixcImx0XCI6XCI8XCIsXCJMVFwiOlwiPFwiLFwiTHRcIjpcIuKJqlwiLFwibHRkb3RcIjpcIuKLllwiLFwibHRocmVlXCI6XCLii4tcIixcImx0aW1lc1wiOlwi4ouJXCIsXCJsdGxhcnJcIjpcIuKltlwiLFwibHRxdWVzdFwiOlwi4qm7XCIsXCJsdHJpXCI6XCLil4NcIixcImx0cmllXCI6XCLiirRcIixcImx0cmlmXCI6XCLil4JcIixcImx0clBhclwiOlwi4qaWXCIsXCJsdXJkc2hhclwiOlwi4qWKXCIsXCJsdXJ1aGFyXCI6XCLipaZcIixcImx2ZXJ0bmVxcVwiOlwi4omo77iAXCIsXCJsdm5FXCI6XCLiiajvuIBcIixcIm1hY3JcIjpcIsKvXCIsXCJtYWxlXCI6XCLimYJcIixcIm1hbHRcIjpcIuKcoFwiLFwibWFsdGVzZVwiOlwi4pygXCIsXCJNYXBcIjpcIuKkhVwiLFwibWFwXCI6XCLihqZcIixcIm1hcHN0b1wiOlwi4oamXCIsXCJtYXBzdG9kb3duXCI6XCLihqdcIixcIm1hcHN0b2xlZnRcIjpcIuKGpFwiLFwibWFwc3RvdXBcIjpcIuKGpVwiLFwibWFya2VyXCI6XCLilq5cIixcIm1jb21tYVwiOlwi4qipXCIsXCJNY3lcIjpcItCcXCIsXCJtY3lcIjpcItC8XCIsXCJtZGFzaFwiOlwi4oCUXCIsXCJtRERvdFwiOlwi4oi6XCIsXCJtZWFzdXJlZGFuZ2xlXCI6XCLiiKFcIixcIk1lZGl1bVNwYWNlXCI6XCLigZ9cIixcIk1lbGxpbnRyZlwiOlwi4oSzXCIsXCJNZnJcIjpcIvCdlJBcIixcIm1mclwiOlwi8J2UqlwiLFwibWhvXCI6XCLihKdcIixcIm1pY3JvXCI6XCLCtVwiLFwibWlkYXN0XCI6XCIqXCIsXCJtaWRjaXJcIjpcIuKrsFwiLFwibWlkXCI6XCLiiKNcIixcIm1pZGRvdFwiOlwiwrdcIixcIm1pbnVzYlwiOlwi4oqfXCIsXCJtaW51c1wiOlwi4oiSXCIsXCJtaW51c2RcIjpcIuKIuFwiLFwibWludXNkdVwiOlwi4qiqXCIsXCJNaW51c1BsdXNcIjpcIuKIk1wiLFwibWxjcFwiOlwi4qubXCIsXCJtbGRyXCI6XCLigKZcIixcIm1ucGx1c1wiOlwi4oiTXCIsXCJtb2RlbHNcIjpcIuKKp1wiLFwiTW9wZlwiOlwi8J2VhFwiLFwibW9wZlwiOlwi8J2VnlwiLFwibXBcIjpcIuKIk1wiLFwibXNjclwiOlwi8J2TglwiLFwiTXNjclwiOlwi4oSzXCIsXCJtc3Rwb3NcIjpcIuKIvlwiLFwiTXVcIjpcIs6cXCIsXCJtdVwiOlwizrxcIixcIm11bHRpbWFwXCI6XCLiirhcIixcIm11bWFwXCI6XCLiirhcIixcIm5hYmxhXCI6XCLiiIdcIixcIk5hY3V0ZVwiOlwixYNcIixcIm5hY3V0ZVwiOlwixYRcIixcIm5hbmdcIjpcIuKIoOKDklwiLFwibmFwXCI6XCLiiYlcIixcIm5hcEVcIjpcIuKpsMy4XCIsXCJuYXBpZFwiOlwi4omLzLhcIixcIm5hcG9zXCI6XCLFiVwiLFwibmFwcHJveFwiOlwi4omJXCIsXCJuYXR1cmFsXCI6XCLima5cIixcIm5hdHVyYWxzXCI6XCLihJVcIixcIm5hdHVyXCI6XCLima5cIixcIm5ic3BcIjpcIsKgXCIsXCJuYnVtcFwiOlwi4omOzLhcIixcIm5idW1wZVwiOlwi4omPzLhcIixcIm5jYXBcIjpcIuKpg1wiLFwiTmNhcm9uXCI6XCLFh1wiLFwibmNhcm9uXCI6XCLFiFwiLFwiTmNlZGlsXCI6XCLFhVwiLFwibmNlZGlsXCI6XCLFhlwiLFwibmNvbmdcIjpcIuKJh1wiLFwibmNvbmdkb3RcIjpcIuKprcy4XCIsXCJuY3VwXCI6XCLiqYJcIixcIk5jeVwiOlwi0J1cIixcIm5jeVwiOlwi0L1cIixcIm5kYXNoXCI6XCLigJNcIixcIm5lYXJoa1wiOlwi4qSkXCIsXCJuZWFyclwiOlwi4oaXXCIsXCJuZUFyclwiOlwi4oeXXCIsXCJuZWFycm93XCI6XCLihpdcIixcIm5lXCI6XCLiiaBcIixcIm5lZG90XCI6XCLiiZDMuFwiLFwiTmVnYXRpdmVNZWRpdW1TcGFjZVwiOlwi4oCLXCIsXCJOZWdhdGl2ZVRoaWNrU3BhY2VcIjpcIuKAi1wiLFwiTmVnYXRpdmVUaGluU3BhY2VcIjpcIuKAi1wiLFwiTmVnYXRpdmVWZXJ5VGhpblNwYWNlXCI6XCLigItcIixcIm5lcXVpdlwiOlwi4omiXCIsXCJuZXNlYXJcIjpcIuKkqFwiLFwibmVzaW1cIjpcIuKJgsy4XCIsXCJOZXN0ZWRHcmVhdGVyR3JlYXRlclwiOlwi4omrXCIsXCJOZXN0ZWRMZXNzTGVzc1wiOlwi4omqXCIsXCJOZXdMaW5lXCI6XCJcXG5cIixcIm5leGlzdFwiOlwi4oiEXCIsXCJuZXhpc3RzXCI6XCLiiIRcIixcIk5mclwiOlwi8J2UkVwiLFwibmZyXCI6XCLwnZSrXCIsXCJuZ0VcIjpcIuKJp8y4XCIsXCJuZ2VcIjpcIuKJsVwiLFwibmdlcVwiOlwi4omxXCIsXCJuZ2VxcVwiOlwi4omnzLhcIixcIm5nZXFzbGFudFwiOlwi4qm+zLhcIixcIm5nZXNcIjpcIuKpvsy4XCIsXCJuR2dcIjpcIuKLmcy4XCIsXCJuZ3NpbVwiOlwi4om1XCIsXCJuR3RcIjpcIuKJq+KDklwiLFwibmd0XCI6XCLiia9cIixcIm5ndHJcIjpcIuKJr1wiLFwibkd0dlwiOlwi4omrzLhcIixcIm5oYXJyXCI6XCLihq5cIixcIm5oQXJyXCI6XCLih45cIixcIm5ocGFyXCI6XCLiq7JcIixcIm5pXCI6XCLiiItcIixcIm5pc1wiOlwi4ou8XCIsXCJuaXNkXCI6XCLii7pcIixcIm5pdlwiOlwi4oiLXCIsXCJOSmN5XCI6XCLQilwiLFwibmpjeVwiOlwi0ZpcIixcIm5sYXJyXCI6XCLihppcIixcIm5sQXJyXCI6XCLih41cIixcIm5sZHJcIjpcIuKApVwiLFwibmxFXCI6XCLiiabMuFwiLFwibmxlXCI6XCLiibBcIixcIm5sZWZ0YXJyb3dcIjpcIuKGmlwiLFwibkxlZnRhcnJvd1wiOlwi4oeNXCIsXCJubGVmdHJpZ2h0YXJyb3dcIjpcIuKGrlwiLFwibkxlZnRyaWdodGFycm93XCI6XCLih45cIixcIm5sZXFcIjpcIuKJsFwiLFwibmxlcXFcIjpcIuKJpsy4XCIsXCJubGVxc2xhbnRcIjpcIuKpvcy4XCIsXCJubGVzXCI6XCLiqb3MuFwiLFwibmxlc3NcIjpcIuKJrlwiLFwibkxsXCI6XCLii5jMuFwiLFwibmxzaW1cIjpcIuKJtFwiLFwibkx0XCI6XCLiiarig5JcIixcIm5sdFwiOlwi4omuXCIsXCJubHRyaVwiOlwi4ouqXCIsXCJubHRyaWVcIjpcIuKLrFwiLFwibkx0dlwiOlwi4omqzLhcIixcIm5taWRcIjpcIuKIpFwiLFwiTm9CcmVha1wiOlwi4oGgXCIsXCJOb25CcmVha2luZ1NwYWNlXCI6XCLCoFwiLFwibm9wZlwiOlwi8J2Vn1wiLFwiTm9wZlwiOlwi4oSVXCIsXCJOb3RcIjpcIuKrrFwiLFwibm90XCI6XCLCrFwiLFwiTm90Q29uZ3J1ZW50XCI6XCLiiaJcIixcIk5vdEN1cENhcFwiOlwi4omtXCIsXCJOb3REb3VibGVWZXJ0aWNhbEJhclwiOlwi4oimXCIsXCJOb3RFbGVtZW50XCI6XCLiiIlcIixcIk5vdEVxdWFsXCI6XCLiiaBcIixcIk5vdEVxdWFsVGlsZGVcIjpcIuKJgsy4XCIsXCJOb3RFeGlzdHNcIjpcIuKIhFwiLFwiTm90R3JlYXRlclwiOlwi4omvXCIsXCJOb3RHcmVhdGVyRXF1YWxcIjpcIuKJsVwiLFwiTm90R3JlYXRlckZ1bGxFcXVhbFwiOlwi4omnzLhcIixcIk5vdEdyZWF0ZXJHcmVhdGVyXCI6XCLiiavMuFwiLFwiTm90R3JlYXRlckxlc3NcIjpcIuKJuVwiLFwiTm90R3JlYXRlclNsYW50RXF1YWxcIjpcIuKpvsy4XCIsXCJOb3RHcmVhdGVyVGlsZGVcIjpcIuKJtVwiLFwiTm90SHVtcERvd25IdW1wXCI6XCLiiY7MuFwiLFwiTm90SHVtcEVxdWFsXCI6XCLiiY/MuFwiLFwibm90aW5cIjpcIuKIiVwiLFwibm90aW5kb3RcIjpcIuKLtcy4XCIsXCJub3RpbkVcIjpcIuKLucy4XCIsXCJub3RpbnZhXCI6XCLiiIlcIixcIm5vdGludmJcIjpcIuKLt1wiLFwibm90aW52Y1wiOlwi4ou2XCIsXCJOb3RMZWZ0VHJpYW5nbGVCYXJcIjpcIuKnj8y4XCIsXCJOb3RMZWZ0VHJpYW5nbGVcIjpcIuKLqlwiLFwiTm90TGVmdFRyaWFuZ2xlRXF1YWxcIjpcIuKLrFwiLFwiTm90TGVzc1wiOlwi4omuXCIsXCJOb3RMZXNzRXF1YWxcIjpcIuKJsFwiLFwiTm90TGVzc0dyZWF0ZXJcIjpcIuKJuFwiLFwiTm90TGVzc0xlc3NcIjpcIuKJqsy4XCIsXCJOb3RMZXNzU2xhbnRFcXVhbFwiOlwi4qm9zLhcIixcIk5vdExlc3NUaWxkZVwiOlwi4om0XCIsXCJOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlclwiOlwi4qqizLhcIixcIk5vdE5lc3RlZExlc3NMZXNzXCI6XCLiqqHMuFwiLFwibm90bmlcIjpcIuKIjFwiLFwibm90bml2YVwiOlwi4oiMXCIsXCJub3RuaXZiXCI6XCLii75cIixcIm5vdG5pdmNcIjpcIuKLvVwiLFwiTm90UHJlY2VkZXNcIjpcIuKKgFwiLFwiTm90UHJlY2VkZXNFcXVhbFwiOlwi4qqvzLhcIixcIk5vdFByZWNlZGVzU2xhbnRFcXVhbFwiOlwi4ougXCIsXCJOb3RSZXZlcnNlRWxlbWVudFwiOlwi4oiMXCIsXCJOb3RSaWdodFRyaWFuZ2xlQmFyXCI6XCLip5DMuFwiLFwiTm90UmlnaHRUcmlhbmdsZVwiOlwi4ourXCIsXCJOb3RSaWdodFRyaWFuZ2xlRXF1YWxcIjpcIuKLrVwiLFwiTm90U3F1YXJlU3Vic2V0XCI6XCLiio/MuFwiLFwiTm90U3F1YXJlU3Vic2V0RXF1YWxcIjpcIuKLolwiLFwiTm90U3F1YXJlU3VwZXJzZXRcIjpcIuKKkMy4XCIsXCJOb3RTcXVhcmVTdXBlcnNldEVxdWFsXCI6XCLii6NcIixcIk5vdFN1YnNldFwiOlwi4oqC4oOSXCIsXCJOb3RTdWJzZXRFcXVhbFwiOlwi4oqIXCIsXCJOb3RTdWNjZWVkc1wiOlwi4oqBXCIsXCJOb3RTdWNjZWVkc0VxdWFsXCI6XCLiqrDMuFwiLFwiTm90U3VjY2VlZHNTbGFudEVxdWFsXCI6XCLii6FcIixcIk5vdFN1Y2NlZWRzVGlsZGVcIjpcIuKJv8y4XCIsXCJOb3RTdXBlcnNldFwiOlwi4oqD4oOSXCIsXCJOb3RTdXBlcnNldEVxdWFsXCI6XCLiiolcIixcIk5vdFRpbGRlXCI6XCLiiYFcIixcIk5vdFRpbGRlRXF1YWxcIjpcIuKJhFwiLFwiTm90VGlsZGVGdWxsRXF1YWxcIjpcIuKJh1wiLFwiTm90VGlsZGVUaWxkZVwiOlwi4omJXCIsXCJOb3RWZXJ0aWNhbEJhclwiOlwi4oikXCIsXCJucGFyYWxsZWxcIjpcIuKIplwiLFwibnBhclwiOlwi4oimXCIsXCJucGFyc2xcIjpcIuKrveKDpVwiLFwibnBhcnRcIjpcIuKIgsy4XCIsXCJucG9saW50XCI6XCLiqJRcIixcIm5wclwiOlwi4oqAXCIsXCJucHJjdWVcIjpcIuKLoFwiLFwibnByZWNcIjpcIuKKgFwiLFwibnByZWNlcVwiOlwi4qqvzLhcIixcIm5wcmVcIjpcIuKqr8y4XCIsXCJucmFycmNcIjpcIuKks8y4XCIsXCJucmFyclwiOlwi4oabXCIsXCJuckFyclwiOlwi4oePXCIsXCJucmFycndcIjpcIuKGncy4XCIsXCJucmlnaHRhcnJvd1wiOlwi4oabXCIsXCJuUmlnaHRhcnJvd1wiOlwi4oePXCIsXCJucnRyaVwiOlwi4ourXCIsXCJucnRyaWVcIjpcIuKLrVwiLFwibnNjXCI6XCLiioFcIixcIm5zY2N1ZVwiOlwi4ouhXCIsXCJuc2NlXCI6XCLiqrDMuFwiLFwiTnNjclwiOlwi8J2SqVwiLFwibnNjclwiOlwi8J2Tg1wiLFwibnNob3J0bWlkXCI6XCLiiKRcIixcIm5zaG9ydHBhcmFsbGVsXCI6XCLiiKZcIixcIm5zaW1cIjpcIuKJgVwiLFwibnNpbWVcIjpcIuKJhFwiLFwibnNpbWVxXCI6XCLiiYRcIixcIm5zbWlkXCI6XCLiiKRcIixcIm5zcGFyXCI6XCLiiKZcIixcIm5zcXN1YmVcIjpcIuKLolwiLFwibnNxc3VwZVwiOlwi4oujXCIsXCJuc3ViXCI6XCLiioRcIixcIm5zdWJFXCI6XCLiq4XMuFwiLFwibnN1YmVcIjpcIuKKiFwiLFwibnN1YnNldFwiOlwi4oqC4oOSXCIsXCJuc3Vic2V0ZXFcIjpcIuKKiFwiLFwibnN1YnNldGVxcVwiOlwi4quFzLhcIixcIm5zdWNjXCI6XCLiioFcIixcIm5zdWNjZXFcIjpcIuKqsMy4XCIsXCJuc3VwXCI6XCLiioVcIixcIm5zdXBFXCI6XCLiq4bMuFwiLFwibnN1cGVcIjpcIuKKiVwiLFwibnN1cHNldFwiOlwi4oqD4oOSXCIsXCJuc3Vwc2V0ZXFcIjpcIuKKiVwiLFwibnN1cHNldGVxcVwiOlwi4quGzLhcIixcIm50Z2xcIjpcIuKJuVwiLFwiTnRpbGRlXCI6XCLDkVwiLFwibnRpbGRlXCI6XCLDsVwiLFwibnRsZ1wiOlwi4om4XCIsXCJudHJpYW5nbGVsZWZ0XCI6XCLii6pcIixcIm50cmlhbmdsZWxlZnRlcVwiOlwi4ousXCIsXCJudHJpYW5nbGVyaWdodFwiOlwi4ourXCIsXCJudHJpYW5nbGVyaWdodGVxXCI6XCLii61cIixcIk51XCI6XCLOnVwiLFwibnVcIjpcIs69XCIsXCJudW1cIjpcIiNcIixcIm51bWVyb1wiOlwi4oSWXCIsXCJudW1zcFwiOlwi4oCHXCIsXCJudmFwXCI6XCLiiY3ig5JcIixcIm52ZGFzaFwiOlwi4oqsXCIsXCJudkRhc2hcIjpcIuKKrVwiLFwiblZkYXNoXCI6XCLiiq5cIixcIm5WRGFzaFwiOlwi4oqvXCIsXCJudmdlXCI6XCLiiaXig5JcIixcIm52Z3RcIjpcIj7ig5JcIixcIm52SGFyclwiOlwi4qSEXCIsXCJudmluZmluXCI6XCLip55cIixcIm52bEFyclwiOlwi4qSCXCIsXCJudmxlXCI6XCLiiaTig5JcIixcIm52bHRcIjpcIjzig5JcIixcIm52bHRyaWVcIjpcIuKKtOKDklwiLFwibnZyQXJyXCI6XCLipINcIixcIm52cnRyaWVcIjpcIuKKteKDklwiLFwibnZzaW1cIjpcIuKIvOKDklwiLFwibndhcmhrXCI6XCLipKNcIixcIm53YXJyXCI6XCLihpZcIixcIm53QXJyXCI6XCLih5ZcIixcIm53YXJyb3dcIjpcIuKGllwiLFwibnduZWFyXCI6XCLipKdcIixcIk9hY3V0ZVwiOlwiw5NcIixcIm9hY3V0ZVwiOlwiw7NcIixcIm9hc3RcIjpcIuKKm1wiLFwiT2NpcmNcIjpcIsOUXCIsXCJvY2lyY1wiOlwiw7RcIixcIm9jaXJcIjpcIuKKmlwiLFwiT2N5XCI6XCLQnlwiLFwib2N5XCI6XCLQvlwiLFwib2Rhc2hcIjpcIuKKnVwiLFwiT2RibGFjXCI6XCLFkFwiLFwib2RibGFjXCI6XCLFkVwiLFwib2RpdlwiOlwi4qi4XCIsXCJvZG90XCI6XCLiiplcIixcIm9kc29sZFwiOlwi4qa8XCIsXCJPRWxpZ1wiOlwixZJcIixcIm9lbGlnXCI6XCLFk1wiLFwib2ZjaXJcIjpcIuKmv1wiLFwiT2ZyXCI6XCLwnZSSXCIsXCJvZnJcIjpcIvCdlKxcIixcIm9nb25cIjpcIsubXCIsXCJPZ3JhdmVcIjpcIsOSXCIsXCJvZ3JhdmVcIjpcIsOyXCIsXCJvZ3RcIjpcIuKngVwiLFwib2hiYXJcIjpcIuKmtVwiLFwib2htXCI6XCLOqVwiLFwib2ludFwiOlwi4oiuXCIsXCJvbGFyclwiOlwi4oa6XCIsXCJvbGNpclwiOlwi4qa+XCIsXCJvbGNyb3NzXCI6XCLiprtcIixcIm9saW5lXCI6XCLigL5cIixcIm9sdFwiOlwi4qeAXCIsXCJPbWFjclwiOlwixYxcIixcIm9tYWNyXCI6XCLFjVwiLFwiT21lZ2FcIjpcIs6pXCIsXCJvbWVnYVwiOlwiz4lcIixcIk9taWNyb25cIjpcIs6fXCIsXCJvbWljcm9uXCI6XCLOv1wiLFwib21pZFwiOlwi4qa2XCIsXCJvbWludXNcIjpcIuKKllwiLFwiT29wZlwiOlwi8J2VhlwiLFwib29wZlwiOlwi8J2VoFwiLFwib3BhclwiOlwi4qa3XCIsXCJPcGVuQ3VybHlEb3VibGVRdW90ZVwiOlwi4oCcXCIsXCJPcGVuQ3VybHlRdW90ZVwiOlwi4oCYXCIsXCJvcGVycFwiOlwi4qa5XCIsXCJvcGx1c1wiOlwi4oqVXCIsXCJvcmFyclwiOlwi4oa7XCIsXCJPclwiOlwi4qmUXCIsXCJvclwiOlwi4oioXCIsXCJvcmRcIjpcIuKpnVwiLFwib3JkZXJcIjpcIuKEtFwiLFwib3JkZXJvZlwiOlwi4oS0XCIsXCJvcmRmXCI6XCLCqlwiLFwib3JkbVwiOlwiwrpcIixcIm9yaWdvZlwiOlwi4oq2XCIsXCJvcm9yXCI6XCLiqZZcIixcIm9yc2xvcGVcIjpcIuKpl1wiLFwib3J2XCI6XCLiqZtcIixcIm9TXCI6XCLik4hcIixcIk9zY3JcIjpcIvCdkqpcIixcIm9zY3JcIjpcIuKEtFwiLFwiT3NsYXNoXCI6XCLDmFwiLFwib3NsYXNoXCI6XCLDuFwiLFwib3NvbFwiOlwi4oqYXCIsXCJPdGlsZGVcIjpcIsOVXCIsXCJvdGlsZGVcIjpcIsO1XCIsXCJvdGltZXNhc1wiOlwi4qi2XCIsXCJPdGltZXNcIjpcIuKot1wiLFwib3RpbWVzXCI6XCLiipdcIixcIk91bWxcIjpcIsOWXCIsXCJvdW1sXCI6XCLDtlwiLFwib3ZiYXJcIjpcIuKMvVwiLFwiT3ZlckJhclwiOlwi4oC+XCIsXCJPdmVyQnJhY2VcIjpcIuKPnlwiLFwiT3ZlckJyYWNrZXRcIjpcIuKOtFwiLFwiT3ZlclBhcmVudGhlc2lzXCI6XCLij5xcIixcInBhcmFcIjpcIsK2XCIsXCJwYXJhbGxlbFwiOlwi4oilXCIsXCJwYXJcIjpcIuKIpVwiLFwicGFyc2ltXCI6XCLiq7NcIixcInBhcnNsXCI6XCLiq71cIixcInBhcnRcIjpcIuKIglwiLFwiUGFydGlhbERcIjpcIuKIglwiLFwiUGN5XCI6XCLQn1wiLFwicGN5XCI6XCLQv1wiLFwicGVyY250XCI6XCIlXCIsXCJwZXJpb2RcIjpcIi5cIixcInBlcm1pbFwiOlwi4oCwXCIsXCJwZXJwXCI6XCLiiqVcIixcInBlcnRlbmtcIjpcIuKAsVwiLFwiUGZyXCI6XCLwnZSTXCIsXCJwZnJcIjpcIvCdlK1cIixcIlBoaVwiOlwizqZcIixcInBoaVwiOlwiz4ZcIixcInBoaXZcIjpcIs+VXCIsXCJwaG1tYXRcIjpcIuKEs1wiLFwicGhvbmVcIjpcIuKYjlwiLFwiUGlcIjpcIs6gXCIsXCJwaVwiOlwiz4BcIixcInBpdGNoZm9ya1wiOlwi4ouUXCIsXCJwaXZcIjpcIs+WXCIsXCJwbGFuY2tcIjpcIuKEj1wiLFwicGxhbmNraFwiOlwi4oSOXCIsXCJwbGFua3ZcIjpcIuKEj1wiLFwicGx1c2FjaXJcIjpcIuKoo1wiLFwicGx1c2JcIjpcIuKKnlwiLFwicGx1c2NpclwiOlwi4qiiXCIsXCJwbHVzXCI6XCIrXCIsXCJwbHVzZG9cIjpcIuKIlFwiLFwicGx1c2R1XCI6XCLiqKVcIixcInBsdXNlXCI6XCLiqbJcIixcIlBsdXNNaW51c1wiOlwiwrFcIixcInBsdXNtblwiOlwiwrFcIixcInBsdXNzaW1cIjpcIuKoplwiLFwicGx1c3R3b1wiOlwi4qinXCIsXCJwbVwiOlwiwrFcIixcIlBvaW5jYXJlcGxhbmVcIjpcIuKEjFwiLFwicG9pbnRpbnRcIjpcIuKolVwiLFwicG9wZlwiOlwi8J2VoVwiLFwiUG9wZlwiOlwi4oSZXCIsXCJwb3VuZFwiOlwiwqNcIixcInByYXBcIjpcIuKqt1wiLFwiUHJcIjpcIuKqu1wiLFwicHJcIjpcIuKJulwiLFwicHJjdWVcIjpcIuKJvFwiLFwicHJlY2FwcHJveFwiOlwi4qq3XCIsXCJwcmVjXCI6XCLiibpcIixcInByZWNjdXJseWVxXCI6XCLiibxcIixcIlByZWNlZGVzXCI6XCLiibpcIixcIlByZWNlZGVzRXF1YWxcIjpcIuKqr1wiLFwiUHJlY2VkZXNTbGFudEVxdWFsXCI6XCLiibxcIixcIlByZWNlZGVzVGlsZGVcIjpcIuKJvlwiLFwicHJlY2VxXCI6XCLiqq9cIixcInByZWNuYXBwcm94XCI6XCLiqrlcIixcInByZWNuZXFxXCI6XCLiqrVcIixcInByZWNuc2ltXCI6XCLii6hcIixcInByZVwiOlwi4qqvXCIsXCJwckVcIjpcIuKqs1wiLFwicHJlY3NpbVwiOlwi4om+XCIsXCJwcmltZVwiOlwi4oCyXCIsXCJQcmltZVwiOlwi4oCzXCIsXCJwcmltZXNcIjpcIuKEmVwiLFwicHJuYXBcIjpcIuKquVwiLFwicHJuRVwiOlwi4qq1XCIsXCJwcm5zaW1cIjpcIuKLqFwiLFwicHJvZFwiOlwi4oiPXCIsXCJQcm9kdWN0XCI6XCLiiI9cIixcInByb2ZhbGFyXCI6XCLijK5cIixcInByb2ZsaW5lXCI6XCLijJJcIixcInByb2ZzdXJmXCI6XCLijJNcIixcInByb3BcIjpcIuKInVwiLFwiUHJvcG9ydGlvbmFsXCI6XCLiiJ1cIixcIlByb3BvcnRpb25cIjpcIuKIt1wiLFwicHJvcHRvXCI6XCLiiJ1cIixcInByc2ltXCI6XCLiib5cIixcInBydXJlbFwiOlwi4oqwXCIsXCJQc2NyXCI6XCLwnZKrXCIsXCJwc2NyXCI6XCLwnZOFXCIsXCJQc2lcIjpcIs6oXCIsXCJwc2lcIjpcIs+IXCIsXCJwdW5jc3BcIjpcIuKAiFwiLFwiUWZyXCI6XCLwnZSUXCIsXCJxZnJcIjpcIvCdlK5cIixcInFpbnRcIjpcIuKojFwiLFwicW9wZlwiOlwi8J2VolwiLFwiUW9wZlwiOlwi4oSaXCIsXCJxcHJpbWVcIjpcIuKBl1wiLFwiUXNjclwiOlwi8J2SrFwiLFwicXNjclwiOlwi8J2ThlwiLFwicXVhdGVybmlvbnNcIjpcIuKEjVwiLFwicXVhdGludFwiOlwi4qiWXCIsXCJxdWVzdFwiOlwiP1wiLFwicXVlc3RlcVwiOlwi4omfXCIsXCJxdW90XCI6XCJcXFwiXCIsXCJRVU9UXCI6XCJcXFwiXCIsXCJyQWFyclwiOlwi4oebXCIsXCJyYWNlXCI6XCLiiL3MsVwiLFwiUmFjdXRlXCI6XCLFlFwiLFwicmFjdXRlXCI6XCLFlVwiLFwicmFkaWNcIjpcIuKImlwiLFwicmFlbXB0eXZcIjpcIuKms1wiLFwicmFuZ1wiOlwi4p+pXCIsXCJSYW5nXCI6XCLin6tcIixcInJhbmdkXCI6XCLippJcIixcInJhbmdlXCI6XCLipqVcIixcInJhbmdsZVwiOlwi4p+pXCIsXCJyYXF1b1wiOlwiwrtcIixcInJhcnJhcFwiOlwi4qW1XCIsXCJyYXJyYlwiOlwi4oelXCIsXCJyYXJyYmZzXCI6XCLipKBcIixcInJhcnJjXCI6XCLipLNcIixcInJhcnJcIjpcIuKGklwiLFwiUmFyclwiOlwi4oagXCIsXCJyQXJyXCI6XCLih5JcIixcInJhcnJmc1wiOlwi4qSeXCIsXCJyYXJyaGtcIjpcIuKGqlwiLFwicmFycmxwXCI6XCLihqxcIixcInJhcnJwbFwiOlwi4qWFXCIsXCJyYXJyc2ltXCI6XCLipbRcIixcIlJhcnJ0bFwiOlwi4qSWXCIsXCJyYXJydGxcIjpcIuKGo1wiLFwicmFycndcIjpcIuKGnVwiLFwicmF0YWlsXCI6XCLipJpcIixcInJBdGFpbFwiOlwi4qScXCIsXCJyYXRpb1wiOlwi4oi2XCIsXCJyYXRpb25hbHNcIjpcIuKEmlwiLFwicmJhcnJcIjpcIuKkjVwiLFwickJhcnJcIjpcIuKkj1wiLFwiUkJhcnJcIjpcIuKkkFwiLFwicmJicmtcIjpcIuKds1wiLFwicmJyYWNlXCI6XCJ9XCIsXCJyYnJhY2tcIjpcIl1cIixcInJicmtlXCI6XCLipoxcIixcInJicmtzbGRcIjpcIuKmjlwiLFwicmJya3NsdVwiOlwi4qaQXCIsXCJSY2Fyb25cIjpcIsWYXCIsXCJyY2Fyb25cIjpcIsWZXCIsXCJSY2VkaWxcIjpcIsWWXCIsXCJyY2VkaWxcIjpcIsWXXCIsXCJyY2VpbFwiOlwi4oyJXCIsXCJyY3ViXCI6XCJ9XCIsXCJSY3lcIjpcItCgXCIsXCJyY3lcIjpcItGAXCIsXCJyZGNhXCI6XCLipLdcIixcInJkbGRoYXJcIjpcIuKlqVwiLFwicmRxdW9cIjpcIuKAnVwiLFwicmRxdW9yXCI6XCLigJ1cIixcInJkc2hcIjpcIuKGs1wiLFwicmVhbFwiOlwi4oScXCIsXCJyZWFsaW5lXCI6XCLihJtcIixcInJlYWxwYXJ0XCI6XCLihJxcIixcInJlYWxzXCI6XCLihJ1cIixcIlJlXCI6XCLihJxcIixcInJlY3RcIjpcIuKWrVwiLFwicmVnXCI6XCLCrlwiLFwiUkVHXCI6XCLCrlwiLFwiUmV2ZXJzZUVsZW1lbnRcIjpcIuKIi1wiLFwiUmV2ZXJzZUVxdWlsaWJyaXVtXCI6XCLih4tcIixcIlJldmVyc2VVcEVxdWlsaWJyaXVtXCI6XCLipa9cIixcInJmaXNodFwiOlwi4qW9XCIsXCJyZmxvb3JcIjpcIuKMi1wiLFwicmZyXCI6XCLwnZSvXCIsXCJSZnJcIjpcIuKEnFwiLFwickhhclwiOlwi4qWkXCIsXCJyaGFyZFwiOlwi4oeBXCIsXCJyaGFydVwiOlwi4oeAXCIsXCJyaGFydWxcIjpcIuKlrFwiLFwiUmhvXCI6XCLOoVwiLFwicmhvXCI6XCLPgVwiLFwicmhvdlwiOlwiz7FcIixcIlJpZ2h0QW5nbGVCcmFja2V0XCI6XCLin6lcIixcIlJpZ2h0QXJyb3dCYXJcIjpcIuKHpVwiLFwicmlnaHRhcnJvd1wiOlwi4oaSXCIsXCJSaWdodEFycm93XCI6XCLihpJcIixcIlJpZ2h0YXJyb3dcIjpcIuKHklwiLFwiUmlnaHRBcnJvd0xlZnRBcnJvd1wiOlwi4oeEXCIsXCJyaWdodGFycm93dGFpbFwiOlwi4oajXCIsXCJSaWdodENlaWxpbmdcIjpcIuKMiVwiLFwiUmlnaHREb3VibGVCcmFja2V0XCI6XCLin6dcIixcIlJpZ2h0RG93blRlZVZlY3RvclwiOlwi4qWdXCIsXCJSaWdodERvd25WZWN0b3JCYXJcIjpcIuKllVwiLFwiUmlnaHREb3duVmVjdG9yXCI6XCLih4JcIixcIlJpZ2h0Rmxvb3JcIjpcIuKMi1wiLFwicmlnaHRoYXJwb29uZG93blwiOlwi4oeBXCIsXCJyaWdodGhhcnBvb251cFwiOlwi4oeAXCIsXCJyaWdodGxlZnRhcnJvd3NcIjpcIuKHhFwiLFwicmlnaHRsZWZ0aGFycG9vbnNcIjpcIuKHjFwiLFwicmlnaHRyaWdodGFycm93c1wiOlwi4oeJXCIsXCJyaWdodHNxdWlnYXJyb3dcIjpcIuKGnVwiLFwiUmlnaHRUZWVBcnJvd1wiOlwi4oamXCIsXCJSaWdodFRlZVwiOlwi4oqiXCIsXCJSaWdodFRlZVZlY3RvclwiOlwi4qWbXCIsXCJyaWdodHRocmVldGltZXNcIjpcIuKLjFwiLFwiUmlnaHRUcmlhbmdsZUJhclwiOlwi4qeQXCIsXCJSaWdodFRyaWFuZ2xlXCI6XCLiirNcIixcIlJpZ2h0VHJpYW5nbGVFcXVhbFwiOlwi4oq1XCIsXCJSaWdodFVwRG93blZlY3RvclwiOlwi4qWPXCIsXCJSaWdodFVwVGVlVmVjdG9yXCI6XCLipZxcIixcIlJpZ2h0VXBWZWN0b3JCYXJcIjpcIuKllFwiLFwiUmlnaHRVcFZlY3RvclwiOlwi4oa+XCIsXCJSaWdodFZlY3RvckJhclwiOlwi4qWTXCIsXCJSaWdodFZlY3RvclwiOlwi4oeAXCIsXCJyaW5nXCI6XCLLmlwiLFwicmlzaW5nZG90c2VxXCI6XCLiiZNcIixcInJsYXJyXCI6XCLih4RcIixcInJsaGFyXCI6XCLih4xcIixcInJsbVwiOlwi4oCPXCIsXCJybW91c3RhY2hlXCI6XCLijrFcIixcInJtb3VzdFwiOlwi4o6xXCIsXCJybm1pZFwiOlwi4quuXCIsXCJyb2FuZ1wiOlwi4p+tXCIsXCJyb2FyclwiOlwi4oe+XCIsXCJyb2Jya1wiOlwi4p+nXCIsXCJyb3BhclwiOlwi4qaGXCIsXCJyb3BmXCI6XCLwnZWjXCIsXCJSb3BmXCI6XCLihJ1cIixcInJvcGx1c1wiOlwi4qiuXCIsXCJyb3RpbWVzXCI6XCLiqLVcIixcIlJvdW5kSW1wbGllc1wiOlwi4qWwXCIsXCJycGFyXCI6XCIpXCIsXCJycGFyZ3RcIjpcIuKmlFwiLFwicnBwb2xpbnRcIjpcIuKoklwiLFwicnJhcnJcIjpcIuKHiVwiLFwiUnJpZ2h0YXJyb3dcIjpcIuKHm1wiLFwicnNhcXVvXCI6XCLigLpcIixcInJzY3JcIjpcIvCdk4dcIixcIlJzY3JcIjpcIuKEm1wiLFwicnNoXCI6XCLihrFcIixcIlJzaFwiOlwi4oaxXCIsXCJyc3FiXCI6XCJdXCIsXCJyc3F1b1wiOlwi4oCZXCIsXCJyc3F1b3JcIjpcIuKAmVwiLFwicnRocmVlXCI6XCLii4xcIixcInJ0aW1lc1wiOlwi4ouKXCIsXCJydHJpXCI6XCLilrlcIixcInJ0cmllXCI6XCLiirVcIixcInJ0cmlmXCI6XCLilrhcIixcInJ0cmlsdHJpXCI6XCLip45cIixcIlJ1bGVEZWxheWVkXCI6XCLip7RcIixcInJ1bHVoYXJcIjpcIuKlqFwiLFwicnhcIjpcIuKEnlwiLFwiU2FjdXRlXCI6XCLFmlwiLFwic2FjdXRlXCI6XCLFm1wiLFwic2JxdW9cIjpcIuKAmlwiLFwic2NhcFwiOlwi4qq4XCIsXCJTY2Fyb25cIjpcIsWgXCIsXCJzY2Fyb25cIjpcIsWhXCIsXCJTY1wiOlwi4qq8XCIsXCJzY1wiOlwi4om7XCIsXCJzY2N1ZVwiOlwi4om9XCIsXCJzY2VcIjpcIuKqsFwiLFwic2NFXCI6XCLiqrRcIixcIlNjZWRpbFwiOlwixZ5cIixcInNjZWRpbFwiOlwixZ9cIixcIlNjaXJjXCI6XCLFnFwiLFwic2NpcmNcIjpcIsWdXCIsXCJzY25hcFwiOlwi4qq6XCIsXCJzY25FXCI6XCLiqrZcIixcInNjbnNpbVwiOlwi4oupXCIsXCJzY3BvbGludFwiOlwi4qiTXCIsXCJzY3NpbVwiOlwi4om/XCIsXCJTY3lcIjpcItChXCIsXCJzY3lcIjpcItGBXCIsXCJzZG90YlwiOlwi4oqhXCIsXCJzZG90XCI6XCLii4VcIixcInNkb3RlXCI6XCLiqaZcIixcInNlYXJoa1wiOlwi4qSlXCIsXCJzZWFyclwiOlwi4oaYXCIsXCJzZUFyclwiOlwi4oeYXCIsXCJzZWFycm93XCI6XCLihphcIixcInNlY3RcIjpcIsKnXCIsXCJzZW1pXCI6XCI7XCIsXCJzZXN3YXJcIjpcIuKkqVwiLFwic2V0bWludXNcIjpcIuKIllwiLFwic2V0bW5cIjpcIuKIllwiLFwic2V4dFwiOlwi4py2XCIsXCJTZnJcIjpcIvCdlJZcIixcInNmclwiOlwi8J2UsFwiLFwic2Zyb3duXCI6XCLijKJcIixcInNoYXJwXCI6XCLima9cIixcIlNIQ0hjeVwiOlwi0KlcIixcInNoY2hjeVwiOlwi0YlcIixcIlNIY3lcIjpcItCoXCIsXCJzaGN5XCI6XCLRiFwiLFwiU2hvcnREb3duQXJyb3dcIjpcIuKGk1wiLFwiU2hvcnRMZWZ0QXJyb3dcIjpcIuKGkFwiLFwic2hvcnRtaWRcIjpcIuKIo1wiLFwic2hvcnRwYXJhbGxlbFwiOlwi4oilXCIsXCJTaG9ydFJpZ2h0QXJyb3dcIjpcIuKGklwiLFwiU2hvcnRVcEFycm93XCI6XCLihpFcIixcInNoeVwiOlwiwq1cIixcIlNpZ21hXCI6XCLOo1wiLFwic2lnbWFcIjpcIs+DXCIsXCJzaWdtYWZcIjpcIs+CXCIsXCJzaWdtYXZcIjpcIs+CXCIsXCJzaW1cIjpcIuKIvFwiLFwic2ltZG90XCI6XCLiqapcIixcInNpbWVcIjpcIuKJg1wiLFwic2ltZXFcIjpcIuKJg1wiLFwic2ltZ1wiOlwi4qqeXCIsXCJzaW1nRVwiOlwi4qqgXCIsXCJzaW1sXCI6XCLiqp1cIixcInNpbWxFXCI6XCLiqp9cIixcInNpbW5lXCI6XCLiiYZcIixcInNpbXBsdXNcIjpcIuKopFwiLFwic2ltcmFyclwiOlwi4qWyXCIsXCJzbGFyclwiOlwi4oaQXCIsXCJTbWFsbENpcmNsZVwiOlwi4oiYXCIsXCJzbWFsbHNldG1pbnVzXCI6XCLiiJZcIixcInNtYXNocFwiOlwi4qizXCIsXCJzbWVwYXJzbFwiOlwi4qekXCIsXCJzbWlkXCI6XCLiiKNcIixcInNtaWxlXCI6XCLijKNcIixcInNtdFwiOlwi4qqqXCIsXCJzbXRlXCI6XCLiqqxcIixcInNtdGVzXCI6XCLiqqzvuIBcIixcIlNPRlRjeVwiOlwi0KxcIixcInNvZnRjeVwiOlwi0YxcIixcInNvbGJhclwiOlwi4oy/XCIsXCJzb2xiXCI6XCLip4RcIixcInNvbFwiOlwiL1wiLFwiU29wZlwiOlwi8J2VilwiLFwic29wZlwiOlwi8J2VpFwiLFwic3BhZGVzXCI6XCLimaBcIixcInNwYWRlc3VpdFwiOlwi4pmgXCIsXCJzcGFyXCI6XCLiiKVcIixcInNxY2FwXCI6XCLiipNcIixcInNxY2Fwc1wiOlwi4oqT77iAXCIsXCJzcWN1cFwiOlwi4oqUXCIsXCJzcWN1cHNcIjpcIuKKlO+4gFwiLFwiU3FydFwiOlwi4oiaXCIsXCJzcXN1YlwiOlwi4oqPXCIsXCJzcXN1YmVcIjpcIuKKkVwiLFwic3FzdWJzZXRcIjpcIuKKj1wiLFwic3FzdWJzZXRlcVwiOlwi4oqRXCIsXCJzcXN1cFwiOlwi4oqQXCIsXCJzcXN1cGVcIjpcIuKKklwiLFwic3FzdXBzZXRcIjpcIuKKkFwiLFwic3FzdXBzZXRlcVwiOlwi4oqSXCIsXCJzcXVhcmVcIjpcIuKWoVwiLFwiU3F1YXJlXCI6XCLilqFcIixcIlNxdWFyZUludGVyc2VjdGlvblwiOlwi4oqTXCIsXCJTcXVhcmVTdWJzZXRcIjpcIuKKj1wiLFwiU3F1YXJlU3Vic2V0RXF1YWxcIjpcIuKKkVwiLFwiU3F1YXJlU3VwZXJzZXRcIjpcIuKKkFwiLFwiU3F1YXJlU3VwZXJzZXRFcXVhbFwiOlwi4oqSXCIsXCJTcXVhcmVVbmlvblwiOlwi4oqUXCIsXCJzcXVhcmZcIjpcIuKWqlwiLFwic3F1XCI6XCLilqFcIixcInNxdWZcIjpcIuKWqlwiLFwic3JhcnJcIjpcIuKGklwiLFwiU3NjclwiOlwi8J2SrlwiLFwic3NjclwiOlwi8J2TiFwiLFwic3NldG1uXCI6XCLiiJZcIixcInNzbWlsZVwiOlwi4oyjXCIsXCJzc3RhcmZcIjpcIuKLhlwiLFwiU3RhclwiOlwi4ouGXCIsXCJzdGFyXCI6XCLimIZcIixcInN0YXJmXCI6XCLimIVcIixcInN0cmFpZ2h0ZXBzaWxvblwiOlwiz7VcIixcInN0cmFpZ2h0cGhpXCI6XCLPlVwiLFwic3RybnNcIjpcIsKvXCIsXCJzdWJcIjpcIuKKglwiLFwiU3ViXCI6XCLii5BcIixcInN1YmRvdFwiOlwi4qq9XCIsXCJzdWJFXCI6XCLiq4VcIixcInN1YmVcIjpcIuKKhlwiLFwic3ViZWRvdFwiOlwi4quDXCIsXCJzdWJtdWx0XCI6XCLiq4FcIixcInN1Ym5FXCI6XCLiq4tcIixcInN1Ym5lXCI6XCLiiopcIixcInN1YnBsdXNcIjpcIuKqv1wiLFwic3VicmFyclwiOlwi4qW5XCIsXCJzdWJzZXRcIjpcIuKKglwiLFwiU3Vic2V0XCI6XCLii5BcIixcInN1YnNldGVxXCI6XCLiioZcIixcInN1YnNldGVxcVwiOlwi4quFXCIsXCJTdWJzZXRFcXVhbFwiOlwi4oqGXCIsXCJzdWJzZXRuZXFcIjpcIuKKilwiLFwic3Vic2V0bmVxcVwiOlwi4quLXCIsXCJzdWJzaW1cIjpcIuKrh1wiLFwic3Vic3ViXCI6XCLiq5VcIixcInN1YnN1cFwiOlwi4quTXCIsXCJzdWNjYXBwcm94XCI6XCLiqrhcIixcInN1Y2NcIjpcIuKJu1wiLFwic3VjY2N1cmx5ZXFcIjpcIuKJvVwiLFwiU3VjY2VlZHNcIjpcIuKJu1wiLFwiU3VjY2VlZHNFcXVhbFwiOlwi4qqwXCIsXCJTdWNjZWVkc1NsYW50RXF1YWxcIjpcIuKJvVwiLFwiU3VjY2VlZHNUaWxkZVwiOlwi4om/XCIsXCJzdWNjZXFcIjpcIuKqsFwiLFwic3VjY25hcHByb3hcIjpcIuKqulwiLFwic3VjY25lcXFcIjpcIuKqtlwiLFwic3VjY25zaW1cIjpcIuKLqVwiLFwic3VjY3NpbVwiOlwi4om/XCIsXCJTdWNoVGhhdFwiOlwi4oiLXCIsXCJzdW1cIjpcIuKIkVwiLFwiU3VtXCI6XCLiiJFcIixcInN1bmdcIjpcIuKZqlwiLFwic3VwMVwiOlwiwrlcIixcInN1cDJcIjpcIsKyXCIsXCJzdXAzXCI6XCLCs1wiLFwic3VwXCI6XCLiioNcIixcIlN1cFwiOlwi4ouRXCIsXCJzdXBkb3RcIjpcIuKqvlwiLFwic3VwZHN1YlwiOlwi4quYXCIsXCJzdXBFXCI6XCLiq4ZcIixcInN1cGVcIjpcIuKKh1wiLFwic3VwZWRvdFwiOlwi4quEXCIsXCJTdXBlcnNldFwiOlwi4oqDXCIsXCJTdXBlcnNldEVxdWFsXCI6XCLiiodcIixcInN1cGhzb2xcIjpcIuKfiVwiLFwic3VwaHN1YlwiOlwi4quXXCIsXCJzdXBsYXJyXCI6XCLipbtcIixcInN1cG11bHRcIjpcIuKrglwiLFwic3VwbkVcIjpcIuKrjFwiLFwic3VwbmVcIjpcIuKKi1wiLFwic3VwcGx1c1wiOlwi4quAXCIsXCJzdXBzZXRcIjpcIuKKg1wiLFwiU3Vwc2V0XCI6XCLii5FcIixcInN1cHNldGVxXCI6XCLiiodcIixcInN1cHNldGVxcVwiOlwi4quGXCIsXCJzdXBzZXRuZXFcIjpcIuKKi1wiLFwic3Vwc2V0bmVxcVwiOlwi4quMXCIsXCJzdXBzaW1cIjpcIuKriFwiLFwic3Vwc3ViXCI6XCLiq5RcIixcInN1cHN1cFwiOlwi4quWXCIsXCJzd2FyaGtcIjpcIuKkplwiLFwic3dhcnJcIjpcIuKGmVwiLFwic3dBcnJcIjpcIuKHmVwiLFwic3dhcnJvd1wiOlwi4oaZXCIsXCJzd253YXJcIjpcIuKkqlwiLFwic3psaWdcIjpcIsOfXCIsXCJUYWJcIjpcIlxcdFwiLFwidGFyZ2V0XCI6XCLijJZcIixcIlRhdVwiOlwizqRcIixcInRhdVwiOlwiz4RcIixcInRicmtcIjpcIuKOtFwiLFwiVGNhcm9uXCI6XCLFpFwiLFwidGNhcm9uXCI6XCLFpVwiLFwiVGNlZGlsXCI6XCLFolwiLFwidGNlZGlsXCI6XCLFo1wiLFwiVGN5XCI6XCLQolwiLFwidGN5XCI6XCLRglwiLFwidGRvdFwiOlwi4oObXCIsXCJ0ZWxyZWNcIjpcIuKMlVwiLFwiVGZyXCI6XCLwnZSXXCIsXCJ0ZnJcIjpcIvCdlLFcIixcInRoZXJlNFwiOlwi4oi0XCIsXCJ0aGVyZWZvcmVcIjpcIuKItFwiLFwiVGhlcmVmb3JlXCI6XCLiiLRcIixcIlRoZXRhXCI6XCLOmFwiLFwidGhldGFcIjpcIs64XCIsXCJ0aGV0YXN5bVwiOlwiz5FcIixcInRoZXRhdlwiOlwiz5FcIixcInRoaWNrYXBwcm94XCI6XCLiiYhcIixcInRoaWNrc2ltXCI6XCLiiLxcIixcIlRoaWNrU3BhY2VcIjpcIuKBn+KAilwiLFwiVGhpblNwYWNlXCI6XCLigIlcIixcInRoaW5zcFwiOlwi4oCJXCIsXCJ0aGthcFwiOlwi4omIXCIsXCJ0aGtzaW1cIjpcIuKIvFwiLFwiVEhPUk5cIjpcIsOeXCIsXCJ0aG9yblwiOlwiw75cIixcInRpbGRlXCI6XCLLnFwiLFwiVGlsZGVcIjpcIuKIvFwiLFwiVGlsZGVFcXVhbFwiOlwi4omDXCIsXCJUaWxkZUZ1bGxFcXVhbFwiOlwi4omFXCIsXCJUaWxkZVRpbGRlXCI6XCLiiYhcIixcInRpbWVzYmFyXCI6XCLiqLFcIixcInRpbWVzYlwiOlwi4oqgXCIsXCJ0aW1lc1wiOlwiw5dcIixcInRpbWVzZFwiOlwi4qiwXCIsXCJ0aW50XCI6XCLiiK1cIixcInRvZWFcIjpcIuKkqFwiLFwidG9wYm90XCI6XCLijLZcIixcInRvcGNpclwiOlwi4quxXCIsXCJ0b3BcIjpcIuKKpFwiLFwiVG9wZlwiOlwi8J2Vi1wiLFwidG9wZlwiOlwi8J2VpVwiLFwidG9wZm9ya1wiOlwi4quaXCIsXCJ0b3NhXCI6XCLipKlcIixcInRwcmltZVwiOlwi4oC0XCIsXCJ0cmFkZVwiOlwi4oSiXCIsXCJUUkFERVwiOlwi4oSiXCIsXCJ0cmlhbmdsZVwiOlwi4pa1XCIsXCJ0cmlhbmdsZWRvd25cIjpcIuKWv1wiLFwidHJpYW5nbGVsZWZ0XCI6XCLil4NcIixcInRyaWFuZ2xlbGVmdGVxXCI6XCLiirRcIixcInRyaWFuZ2xlcVwiOlwi4omcXCIsXCJ0cmlhbmdsZXJpZ2h0XCI6XCLilrlcIixcInRyaWFuZ2xlcmlnaHRlcVwiOlwi4oq1XCIsXCJ0cmlkb3RcIjpcIuKXrFwiLFwidHJpZVwiOlwi4omcXCIsXCJ0cmltaW51c1wiOlwi4qi6XCIsXCJUcmlwbGVEb3RcIjpcIuKDm1wiLFwidHJpcGx1c1wiOlwi4qi5XCIsXCJ0cmlzYlwiOlwi4qeNXCIsXCJ0cml0aW1lXCI6XCLiqLtcIixcInRycGV6aXVtXCI6XCLij6JcIixcIlRzY3JcIjpcIvCdkq9cIixcInRzY3JcIjpcIvCdk4lcIixcIlRTY3lcIjpcItCmXCIsXCJ0c2N5XCI6XCLRhlwiLFwiVFNIY3lcIjpcItCLXCIsXCJ0c2hjeVwiOlwi0ZtcIixcIlRzdHJva1wiOlwixaZcIixcInRzdHJva1wiOlwixadcIixcInR3aXh0XCI6XCLiiaxcIixcInR3b2hlYWRsZWZ0YXJyb3dcIjpcIuKGnlwiLFwidHdvaGVhZHJpZ2h0YXJyb3dcIjpcIuKGoFwiLFwiVWFjdXRlXCI6XCLDmlwiLFwidWFjdXRlXCI6XCLDulwiLFwidWFyclwiOlwi4oaRXCIsXCJVYXJyXCI6XCLihp9cIixcInVBcnJcIjpcIuKHkVwiLFwiVWFycm9jaXJcIjpcIuKliVwiLFwiVWJyY3lcIjpcItCOXCIsXCJ1YnJjeVwiOlwi0Z5cIixcIlVicmV2ZVwiOlwixaxcIixcInVicmV2ZVwiOlwixa1cIixcIlVjaXJjXCI6XCLDm1wiLFwidWNpcmNcIjpcIsO7XCIsXCJVY3lcIjpcItCjXCIsXCJ1Y3lcIjpcItGDXCIsXCJ1ZGFyclwiOlwi4oeFXCIsXCJVZGJsYWNcIjpcIsWwXCIsXCJ1ZGJsYWNcIjpcIsWxXCIsXCJ1ZGhhclwiOlwi4qWuXCIsXCJ1ZmlzaHRcIjpcIuKlvlwiLFwiVWZyXCI6XCLwnZSYXCIsXCJ1ZnJcIjpcIvCdlLJcIixcIlVncmF2ZVwiOlwiw5lcIixcInVncmF2ZVwiOlwiw7lcIixcInVIYXJcIjpcIuKlo1wiLFwidWhhcmxcIjpcIuKGv1wiLFwidWhhcnJcIjpcIuKGvlwiLFwidWhibGtcIjpcIuKWgFwiLFwidWxjb3JuXCI6XCLijJxcIixcInVsY29ybmVyXCI6XCLijJxcIixcInVsY3JvcFwiOlwi4oyPXCIsXCJ1bHRyaVwiOlwi4pe4XCIsXCJVbWFjclwiOlwixapcIixcInVtYWNyXCI6XCLFq1wiLFwidW1sXCI6XCLCqFwiLFwiVW5kZXJCYXJcIjpcIl9cIixcIlVuZGVyQnJhY2VcIjpcIuKPn1wiLFwiVW5kZXJCcmFja2V0XCI6XCLijrVcIixcIlVuZGVyUGFyZW50aGVzaXNcIjpcIuKPnVwiLFwiVW5pb25cIjpcIuKLg1wiLFwiVW5pb25QbHVzXCI6XCLiio5cIixcIlVvZ29uXCI6XCLFslwiLFwidW9nb25cIjpcIsWzXCIsXCJVb3BmXCI6XCLwnZWMXCIsXCJ1b3BmXCI6XCLwnZWmXCIsXCJVcEFycm93QmFyXCI6XCLipJJcIixcInVwYXJyb3dcIjpcIuKGkVwiLFwiVXBBcnJvd1wiOlwi4oaRXCIsXCJVcGFycm93XCI6XCLih5FcIixcIlVwQXJyb3dEb3duQXJyb3dcIjpcIuKHhVwiLFwidXBkb3duYXJyb3dcIjpcIuKGlVwiLFwiVXBEb3duQXJyb3dcIjpcIuKGlVwiLFwiVXBkb3duYXJyb3dcIjpcIuKHlVwiLFwiVXBFcXVpbGlicml1bVwiOlwi4qWuXCIsXCJ1cGhhcnBvb25sZWZ0XCI6XCLihr9cIixcInVwaGFycG9vbnJpZ2h0XCI6XCLihr5cIixcInVwbHVzXCI6XCLiio5cIixcIlVwcGVyTGVmdEFycm93XCI6XCLihpZcIixcIlVwcGVyUmlnaHRBcnJvd1wiOlwi4oaXXCIsXCJ1cHNpXCI6XCLPhVwiLFwiVXBzaVwiOlwiz5JcIixcInVwc2loXCI6XCLPklwiLFwiVXBzaWxvblwiOlwizqVcIixcInVwc2lsb25cIjpcIs+FXCIsXCJVcFRlZUFycm93XCI6XCLihqVcIixcIlVwVGVlXCI6XCLiiqVcIixcInVwdXBhcnJvd3NcIjpcIuKHiFwiLFwidXJjb3JuXCI6XCLijJ1cIixcInVyY29ybmVyXCI6XCLijJ1cIixcInVyY3JvcFwiOlwi4oyOXCIsXCJVcmluZ1wiOlwixa5cIixcInVyaW5nXCI6XCLFr1wiLFwidXJ0cmlcIjpcIuKXuVwiLFwiVXNjclwiOlwi8J2SsFwiLFwidXNjclwiOlwi8J2TilwiLFwidXRkb3RcIjpcIuKLsFwiLFwiVXRpbGRlXCI6XCLFqFwiLFwidXRpbGRlXCI6XCLFqVwiLFwidXRyaVwiOlwi4pa1XCIsXCJ1dHJpZlwiOlwi4pa0XCIsXCJ1dWFyclwiOlwi4oeIXCIsXCJVdW1sXCI6XCLDnFwiLFwidXVtbFwiOlwiw7xcIixcInV3YW5nbGVcIjpcIuKmp1wiLFwidmFuZ3J0XCI6XCLippxcIixcInZhcmVwc2lsb25cIjpcIs+1XCIsXCJ2YXJrYXBwYVwiOlwiz7BcIixcInZhcm5vdGhpbmdcIjpcIuKIhVwiLFwidmFycGhpXCI6XCLPlVwiLFwidmFycGlcIjpcIs+WXCIsXCJ2YXJwcm9wdG9cIjpcIuKInVwiLFwidmFyclwiOlwi4oaVXCIsXCJ2QXJyXCI6XCLih5VcIixcInZhcnJob1wiOlwiz7FcIixcInZhcnNpZ21hXCI6XCLPglwiLFwidmFyc3Vic2V0bmVxXCI6XCLiiorvuIBcIixcInZhcnN1YnNldG5lcXFcIjpcIuKri++4gFwiLFwidmFyc3Vwc2V0bmVxXCI6XCLiiovvuIBcIixcInZhcnN1cHNldG5lcXFcIjpcIuKrjO+4gFwiLFwidmFydGhldGFcIjpcIs+RXCIsXCJ2YXJ0cmlhbmdsZWxlZnRcIjpcIuKKslwiLFwidmFydHJpYW5nbGVyaWdodFwiOlwi4oqzXCIsXCJ2QmFyXCI6XCLiq6hcIixcIlZiYXJcIjpcIuKrq1wiLFwidkJhcnZcIjpcIuKrqVwiLFwiVmN5XCI6XCLQklwiLFwidmN5XCI6XCLQslwiLFwidmRhc2hcIjpcIuKKolwiLFwidkRhc2hcIjpcIuKKqFwiLFwiVmRhc2hcIjpcIuKKqVwiLFwiVkRhc2hcIjpcIuKKq1wiLFwiVmRhc2hsXCI6XCLiq6ZcIixcInZlZWJhclwiOlwi4oq7XCIsXCJ2ZWVcIjpcIuKIqFwiLFwiVmVlXCI6XCLii4FcIixcInZlZWVxXCI6XCLiiZpcIixcInZlbGxpcFwiOlwi4ouuXCIsXCJ2ZXJiYXJcIjpcInxcIixcIlZlcmJhclwiOlwi4oCWXCIsXCJ2ZXJ0XCI6XCJ8XCIsXCJWZXJ0XCI6XCLigJZcIixcIlZlcnRpY2FsQmFyXCI6XCLiiKNcIixcIlZlcnRpY2FsTGluZVwiOlwifFwiLFwiVmVydGljYWxTZXBhcmF0b3JcIjpcIuKdmFwiLFwiVmVydGljYWxUaWxkZVwiOlwi4omAXCIsXCJWZXJ5VGhpblNwYWNlXCI6XCLigIpcIixcIlZmclwiOlwi8J2UmVwiLFwidmZyXCI6XCLwnZSzXCIsXCJ2bHRyaVwiOlwi4oqyXCIsXCJ2bnN1YlwiOlwi4oqC4oOSXCIsXCJ2bnN1cFwiOlwi4oqD4oOSXCIsXCJWb3BmXCI6XCLwnZWNXCIsXCJ2b3BmXCI6XCLwnZWnXCIsXCJ2cHJvcFwiOlwi4oidXCIsXCJ2cnRyaVwiOlwi4oqzXCIsXCJWc2NyXCI6XCLwnZKxXCIsXCJ2c2NyXCI6XCLwnZOLXCIsXCJ2c3VibkVcIjpcIuKri++4gFwiLFwidnN1Ym5lXCI6XCLiiorvuIBcIixcInZzdXBuRVwiOlwi4quM77iAXCIsXCJ2c3VwbmVcIjpcIuKKi++4gFwiLFwiVnZkYXNoXCI6XCLiiqpcIixcInZ6aWd6YWdcIjpcIuKmmlwiLFwiV2NpcmNcIjpcIsW0XCIsXCJ3Y2lyY1wiOlwixbVcIixcIndlZGJhclwiOlwi4qmfXCIsXCJ3ZWRnZVwiOlwi4oinXCIsXCJXZWRnZVwiOlwi4ouAXCIsXCJ3ZWRnZXFcIjpcIuKJmVwiLFwid2VpZXJwXCI6XCLihJhcIixcIldmclwiOlwi8J2UmlwiLFwid2ZyXCI6XCLwnZS0XCIsXCJXb3BmXCI6XCLwnZWOXCIsXCJ3b3BmXCI6XCLwnZWoXCIsXCJ3cFwiOlwi4oSYXCIsXCJ3clwiOlwi4omAXCIsXCJ3cmVhdGhcIjpcIuKJgFwiLFwiV3NjclwiOlwi8J2SslwiLFwid3NjclwiOlwi8J2TjFwiLFwieGNhcFwiOlwi4ouCXCIsXCJ4Y2lyY1wiOlwi4pevXCIsXCJ4Y3VwXCI6XCLii4NcIixcInhkdHJpXCI6XCLilr1cIixcIlhmclwiOlwi8J2Um1wiLFwieGZyXCI6XCLwnZS1XCIsXCJ4aGFyclwiOlwi4p+3XCIsXCJ4aEFyclwiOlwi4p+6XCIsXCJYaVwiOlwizp5cIixcInhpXCI6XCLOvlwiLFwieGxhcnJcIjpcIuKftVwiLFwieGxBcnJcIjpcIuKfuFwiLFwieG1hcFwiOlwi4p+8XCIsXCJ4bmlzXCI6XCLii7tcIixcInhvZG90XCI6XCLiqIBcIixcIlhvcGZcIjpcIvCdlY9cIixcInhvcGZcIjpcIvCdlalcIixcInhvcGx1c1wiOlwi4qiBXCIsXCJ4b3RpbWVcIjpcIuKoglwiLFwieHJhcnJcIjpcIuKftlwiLFwieHJBcnJcIjpcIuKfuVwiLFwiWHNjclwiOlwi8J2Ss1wiLFwieHNjclwiOlwi8J2TjVwiLFwieHNxY3VwXCI6XCLiqIZcIixcInh1cGx1c1wiOlwi4qiEXCIsXCJ4dXRyaVwiOlwi4pazXCIsXCJ4dmVlXCI6XCLii4FcIixcInh3ZWRnZVwiOlwi4ouAXCIsXCJZYWN1dGVcIjpcIsOdXCIsXCJ5YWN1dGVcIjpcIsO9XCIsXCJZQWN5XCI6XCLQr1wiLFwieWFjeVwiOlwi0Y9cIixcIlljaXJjXCI6XCLFtlwiLFwieWNpcmNcIjpcIsW3XCIsXCJZY3lcIjpcItCrXCIsXCJ5Y3lcIjpcItGLXCIsXCJ5ZW5cIjpcIsKlXCIsXCJZZnJcIjpcIvCdlJxcIixcInlmclwiOlwi8J2UtlwiLFwiWUljeVwiOlwi0IdcIixcInlpY3lcIjpcItGXXCIsXCJZb3BmXCI6XCLwnZWQXCIsXCJ5b3BmXCI6XCLwnZWqXCIsXCJZc2NyXCI6XCLwnZK0XCIsXCJ5c2NyXCI6XCLwnZOOXCIsXCJZVWN5XCI6XCLQrlwiLFwieXVjeVwiOlwi0Y5cIixcInl1bWxcIjpcIsO/XCIsXCJZdW1sXCI6XCLFuFwiLFwiWmFjdXRlXCI6XCLFuVwiLFwiemFjdXRlXCI6XCLFulwiLFwiWmNhcm9uXCI6XCLFvVwiLFwiemNhcm9uXCI6XCLFvlwiLFwiWmN5XCI6XCLQl1wiLFwiemN5XCI6XCLQt1wiLFwiWmRvdFwiOlwixbtcIixcInpkb3RcIjpcIsW8XCIsXCJ6ZWV0cmZcIjpcIuKEqFwiLFwiWmVyb1dpZHRoU3BhY2VcIjpcIuKAi1wiLFwiWmV0YVwiOlwizpZcIixcInpldGFcIjpcIs62XCIsXCJ6ZnJcIjpcIvCdlLdcIixcIlpmclwiOlwi4oSoXCIsXCJaSGN5XCI6XCLQllwiLFwiemhjeVwiOlwi0LZcIixcInppZ3JhcnJcIjpcIuKHnVwiLFwiem9wZlwiOlwi8J2Vq1wiLFwiWm9wZlwiOlwi4oSkXCIsXCJac2NyXCI6XCLwnZK1XCIsXCJ6c2NyXCI6XCLwnZOPXCIsXCJ6d2pcIjpcIuKAjVwiLFwiendualwiOlwi4oCMXCJ9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9lbnRpdGllcy5qc29uXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBSZW5kZXJlcigpIHt9XG5cbi8qKlxuICogIFdhbGtzIHRoZSBBU1QgYW5kIGNhbGxzIG1lbWJlciBtZXRob2RzIGZvciBlYWNoIE5vZGUgdHlwZS5cbiAqXG4gKiAgQHBhcmFtIGFzdCB7Tm9kZX0gVGhlIHJvb3Qgb2YgdGhlIGFic3RyYWN0IHN5bnRheCB0cmVlLlxuICovXG5mdW5jdGlvbiByZW5kZXIoYXN0KSB7XG4gIHZhciB3YWxrZXIgPSBhc3Qud2Fsa2VyKClcbiAgICAsIGV2ZW50XG4gICAgLCB0eXBlO1xuXG4gIHRoaXMuYnVmZmVyID0gJyc7XG4gIHRoaXMubGFzdE91dCA9ICdcXG4nO1xuXG4gIHdoaWxlKChldmVudCA9IHdhbGtlci5uZXh0KCkpKSB7XG4gICAgdHlwZSA9IGV2ZW50Lm5vZGUudHlwZTtcbiAgICBpZiAodGhpc1t0eXBlXSkge1xuICAgICAgdGhpc1t0eXBlXShldmVudC5ub2RlLCBldmVudC5lbnRlcmluZyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzLmJ1ZmZlcjtcbn1cblxuLyoqXG4gKiAgQ29uY2F0ZW5hdGUgYSBsaXRlcmFsIHN0cmluZyB0byB0aGUgYnVmZmVyLlxuICpcbiAqICBAcGFyYW0gc3RyIHtTdHJpbmd9IFRoZSBzdHJpbmcgdG8gY29uY2F0ZW5hdGUuXG4gKi9cbmZ1bmN0aW9uIGxpdChzdHIpIHtcbiAgdGhpcy5idWZmZXIgKz0gc3RyO1xuICB0aGlzLmxhc3RPdXQgPSBzdHI7XG59XG5cbi8qKlxuICogIE91dHB1dCBhIG5ld2xpbmUgdG8gdGhlIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY3IoKSB7XG4gIGlmICh0aGlzLmxhc3RPdXQgIT09ICdcXG4nKSB7XG4gICAgdGhpcy5saXQoJ1xcbicpO1xuICB9XG59XG5cbi8qKlxuICogIENvbmNhdGVuYXRlIGEgc3RyaW5nIHRvIHRoZSBidWZmZXIgcG9zc2libHkgZXNjYXBpbmcgdGhlIGNvbnRlbnQuXG4gKlxuICogIENvbmNyZXRlIHJlbmRlcmVyIGltcGxlbWVudGF0aW9ucyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gKlxuICogIEBwYXJhbSBzdHIge1N0cmluZ30gVGhlIHN0cmluZyB0byBjb25jYXRlbmF0ZS5cbiAqL1xuZnVuY3Rpb24gb3V0KHN0cikge1xuICB0aGlzLmxpdChzdHIpO1xufVxuXG4vKipcbiAqICBFc2NhcGUgYSBzdHJpbmcgZm9yIHRoZSB0YXJnZXQgcmVuZGVyZXIuXG4gKlxuICogIEFic3RyYWN0IGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IGNvbmNyZXRlIFxuICogIHJlbmRlcmVyIGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiAgQHBhcmFtIHN0ciB7U3RyaW5nfSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqL1xuZnVuY3Rpb24gZXNjKHN0cikge1xuICByZXR1cm4gc3RyO1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gcmVuZGVyO1xuUmVuZGVyZXIucHJvdG90eXBlLm91dCA9IG91dDtcblJlbmRlcmVyLnByb3RvdHlwZS5saXQgPSBsaXQ7XG5SZW5kZXJlci5wcm90b3R5cGUuY3IgID0gY3I7XG5SZW5kZXJlci5wcm90b3R5cGUuZXNjICA9IGVzYztcblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci9yZW5kZXJlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYW1sID0gcmVxdWlyZSgnLi9sYW1sLmpzJyk7XG5jb25zdCB7dGV4MmpheH0gPSByZXF1aXJlKCcuL3RleDJqYXguanMnKTtcbmNvbnN0IGNvbW1vbm1hcmsgPSByZXF1aXJlKCdjb21tb25tYXJrJyk7XG5cbmNvbnN0IHdvcmtlciA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgd2luZG93LnRleDJqYXggPSB0ZXgyamF4O1xuICB3aW5kb3cudGV4MmpheC5jb25maWcuZG9jID0gZG9jdW1lbnQ7XG4gIHdpbmRvdy50ZXgyamF4LmNvbmZpZy5pbmxpbmVNYXRoLnB1c2goWyckJywgJyQnXSk7XG4gIHdpbmRvdy50ZXgyamF4LmNvbmZpZy5wcm9jZXNzRXNjYXBlcyA9IHRydWU7XG4gIHdpbmRvdy50ZXgyamF4LlByZVByb2Nlc3MoKTtcblxuICBjb25zdCByZWFkZXIgPSBuZXcgY29tbW9ubWFyay5QYXJzZXIoKTtcbiAgY29uc3Qgd3JpdGVyID0gbmV3IGNvbW1vbm1hcmsuSHRtbFJlbmRlcmVyKCk7XG4gIGNvbnN0IHBhcnNlZCA9IHJlYWRlci5wYXJzZShkb2N1bWVudC5ib2R5LmlubmVySFRNTCk7XG4gIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gd3JpdGVyLnJlbmRlcihwYXJzZWQpO1xuXG4gIGxhbWwoZG9jdW1lbnQpO1xufTtcblxuaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgPyBwcm9jZXNzIDogMCkgPT09ICdbb2JqZWN0IHByb2Nlc3NdJyl7XG4gICAgbW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xufVxuZWxzZSB7XG4gIHdvcmtlcih3aW5kb3cpO1xuICB3aW5kb3cuTWF0aEpheCA9IHtcbiAgICAnZmFzdC1wcmV2aWV3Jzoge1xuICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICB9XG4gIH07XG4gIGNvbnN0IG1qID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIG1qLnNyYyA9XG4gICAgJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL21hdGhqYXgvMi43LjIvTWF0aEpheC5qcz9jb25maWc9VGVYLUFNU19DSFRNTC1mdWxsJztcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtaik7XG5cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dvcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcbmNvbnN0IG1ldGFkYXRhID0gcmVxdWlyZSgnLi9tZXRhZGF0YS5qcycpO1xuY29uc3QgcHJlYW1ibGUgPSByZXF1aXJlKCcuL3ByZWFtYmxlLmpzJyk7XG5jb25zdCBhYnN0cmFjdCA9IHJlcXVpcmUoJy4vYWJzdHJhY3QuanMnKTtcbmNvbnN0IHN0YXRlbWVudHMgPSByZXF1aXJlKCcuL3N0YXRlbWVudHMuanMnKTtcbmNvbnN0IGZpZ3VyZXMgPSByZXF1aXJlKCcuL2ZpZ3VyZXMuanMnKTtcbmNvbnN0IG5hbWVzID0gcmVxdWlyZSgnLi9uYW1lcy5qcycpO1xuY29uc3QgYmxhbWVzID0gcmVxdWlyZSgnLi9ibGFtZXMuanMnKTtcbmNvbnN0IHJlZnMgPSByZXF1aXJlKCcuL3JlZnMuanMnKTtcblxuY29uc3QgbGFtbCA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIG1ldGFkYXRhKGRvY3VtZW50KTtcbiAgcHJlYW1ibGUoZG9jdW1lbnQpO1xuICBhYnN0cmFjdChkb2N1bWVudCk7XG4gIHN0YXRlbWVudHMoZG9jdW1lbnQpO1xuICBmaWd1cmVzKGRvY3VtZW50LCBmYWxzZSk7XG4gIG5hbWVzKGRvY3VtZW50KTtcbiAgLy8gVE9ETyBzaG91bGQgZGVwZW5kIG9uIGNtLmNzcz9cbiAgYmxhbWVzKGRvY3VtZW50KTtcbiAgcmVmcyhkb2N1bWVudCk7XG5cblxuXG4gIC8vIHBvcHVsYXRlIGJpYmxpb2dyYXBoaWMgY2l0YXRpb25zXG4gIGNvbnN0IGJpYml0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYmlibGlvZ3JhcGh5ID4gYScpO1xuICBmb3IgKGxldCBbaW5kZXgsIGJpYml0ZW1dIG9mIGJpYml0ZW1zLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IGNvdW50ZXIgPSAnWycgKyAoaW5kZXggKyAxKSArICddJztcbiAgICAvLyBUT0RPIGNyZWF0ZSBETCBpbiBidWlsZEJpYiBpbnN0ZWFkXG4gICAgY29uc3QgY291bnRlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb3VudGVyICsgJyAnKTtcbiAgICBiaWJpdGVtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvdW50ZXJOb2RlLCBiaWJpdGVtKTtcbiAgICBjb25zdCBjaXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnY2l0ZVt0YXJnZXQ9XCInICsgYmliaXRlbS5pZCArICdcIl0nXG4gICAgKTtcbiAgICBmb3IgKGxldCBjaXRlIG9mIGNpdGVzKSB7XG4gICAgICBjaXRlLmlubmVySFRNTCA9IGNvdW50ZXI7XG4gICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgYmliaXRlbS5pZCk7XG4gICAgICBjaXRlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGFuY2hvciwgY2l0ZSk7XG4gICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoY2l0ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIChmb290KW5vdGVzXG4gIGNvbnN0IG5vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbm90ZScpO1xuICBmb3IgKGxldCBbaW5kZXgsIG5vdGVdIG9mIG5vdGVzLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IG5ld05vdGUgPSByZW5hbWVUYWcoZG9jdW1lbnQsIG5vdGUsICdzcGFuJyk7XG4gICAgbmV3Tm90ZS5jbGFzc0xpc3QuYWRkKCdmb290bm90ZScpO1xuICAgIG5ld05vdGUuaWQgPSAnZm4tJyArIGluZGV4O1xuICAgIGNvbnN0IGZubGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBmbmxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgbmV3Tm90ZS5pZCk7XG4gICAgZm5saW5rLmlkID0gJ2ZubGluaycgKyBpbmRleDtcbiAgICBmbmxpbmsuaW5uZXJIVE1MID0gJzxzdXA+JyArIChpbmRleCArIDEpICsgJzwvc3VwPic7XG4gICAgbmV3Tm90ZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmbmxpbmssIG5ld05vdGUpO1xuICAgIGNvbnN0IGJhY2tsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJhY2tsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyArIGZubGluay5pZCk7XG4gICAgYmFja2xpbmsuaW5uZXJIVE1MID0gJzxzdXA+8J+UmTwvc3VwPic7XG4gICAgYmFja2xpbmsuY2xhc3NMaXN0LmFkZCgnYmFja2xpbmsnKTtcbiAgICBuZXdOb3RlLmFwcGVuZENoaWxkKGJhY2tsaW5rKTtcbiAgICAvLyBUT0RPIG5vdCBhY3R1YWxseSBkaXNhYmxpbmcgY2xpY2tzXG4gICAgZm5saW5rLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG4gICAgYmFja2xpbmsuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGJ1aWxkQmliID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgb2xkQmliID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmlibGlvZ3JhcGh5Jyk7XG4gICAgY29uc3QgYmliID0gcmVuYW1lVGFnKGRvY3VtZW50LCBvbGRCaWIsICdzZWN0aW9uJyk7XG4gICAgYmliLmNsYXNzTGlzdC5hZGQoJ2JpYmxpb2dyYXBoeScpO1xuICAgIC8vIGNvbnN0IGlubmVyID0gYmliLmlubmVySFRNTDtcbiAgICAvLyBiaWIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgaGVhZGluZy5pbm5lckhUTUwgPSAnQmlibGlvZ3JhcGh5JztcbiAgICBiaWIuaW5zZXJ0QmVmb3JlKGhlYWRpbmcsIGJpYi5maXJzdENoaWxkKTtcbiAgICAvLyBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAvLyBiaWIuYXBwZW5kQ2hpbGQobGlzdCk7XG4gICAgLy8gZm9yIChsZXQgc3RyaW5nIG9mIGlubmVyLnNwbGl0KCdcXG4nKSl7XG4gICAgLy8gICAgIGlmIChzdHJpbmcudHJpbSgpID09PSAnJykgY29udGludWVcbiAgICAvLyAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgLy8gICAgIGl0ZW0uaW5uZXJIVE1MID0gc3RyaW5nLnN1YnN0cmluZygyKTtcbiAgICAvLyAgICAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAvLyB9XG4gIH07XG4gIGJ1aWxkQmliKCk7XG5cbiAgLy8gd3JhcCBwaHJhc2luZyBjb250ZW50IGluIHBcblxuICAvLyBjb25zdCBQSFJBU0lOR19UQUdOQU1FUyA9IFsnYWJicicsICdhdWRpbycsICdiJywgJ2JkbycsICdicicsICdidXR0b24nLCAnY2FudmFzJywgJ2NpdGUnLCAnY29kZScsICdjb21tYW5kJywgJ2RhdGEnLCAnZGF0YWxpc3QnLCAnZGZuJywgJ2VtJywgJ2VtYmVkJywgJ2knLCAnaWZyYW1lJywgJ2ltZycsICdpbnB1dCcsICdrYmQnLCAna2V5Z2VuJywgJ2xhYmVsJywgJ21hcmsnLCAnbWF0aCcsICdtZXRlcicsICdub3NjcmlwdCcsICdvYmplY3QnLCAnb3V0cHV0JywgJ3Byb2dyZXNzJywgJ3EnLCAncnVieScsICdzYW1wJywgJ3NjcmlwdCcsICdzZWxlY3QnLCAnc21hbGwnLCAnc3BhbicsICdzdHJvbmcnLCAnc3ViJywgJ3N1cCcsICdzdmcnLCAndGV4dGFyZWEnLCAndGltZScsICd2YXInLCAndmlkZW8nLCAnd2JyJywgJ2EnLCAnZGVsJywgJ2lucyddXG4gIC8vIGNvbnN0IGNhbmRpZGF0ZXMgPSBbXS8vZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYm9keSwgc2VjdGlvbiwgZmlndXJlJyk7XG4gIC8vIGZvciAobGV0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKXtcbiAgLy8gICAvLyBjb25zb2xlLmxvZyhjYW5kaWRhdGUpXG4gIC8vICAgY29uc3QgY2hpbGROb2RlcyA9IGNhbmRpZGF0ZS5jaGlsZE5vZGVzO1xuICAvLyAgIGNvbnN0IGFycmF5b2ZhcnJheXMgPSBbW11dO1xuICAvLyAgIGZvciAobGV0IGNoaWxkTm9kZSBvZiBjaGlsZE5vZGVzKXtcbiAgLy8gICAgIGNvbnN0IGN1cnJlbnRCYXRjaCA9IGFycmF5b2ZhcnJheXNbYXJyYXlvZmFycmF5cy5sZW5ndGggLTFdO1xuICAvLyAgICAgLy8gY29uc29sZS5sb2coY2hpbGROb2RlKVxuICAvLyAgICAgaWYgKGNoaWxkTm9kZS5ub2RlVHlwZSA9PT0gMyl7XG4gIC8vICAgICAgIGNvbnN0IGxpbmVzID0gY2hpbGROb2RlLmRhdGEuc3BsaXQoJ1xcbicpO1xuICAvLyAgICAgICBsZXQgdGVtcCA9IGNoaWxkTm9kZTtcbiAgLy8gICAgICAgZm9yIChsZXQgW2luZGV4LCBsaW5lXSBvZiBsaW5lcy5lbnRyaWVzKCkpe1xuICAvLyAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAvLyAgICAgICAgICAgY2hpbGROb2RlLmRhdGEgPSBsaW5lO1xuICAvLyAgICAgICAgICAgY3VycmVudEJhdGNoLnB1c2goY2hpbGROb2RlKTtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgICAgZWxzZSB7XG4gIC8vICAgICAgICAgICBjb25zdCBsaW5lRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxpbmUpO1xuICAvLyAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0JlZm9yZScsIGNoaWxkTm9kZS5uZXh0U2libGluZylcbiAgLy8gICAgICAgICAgIGNoaWxkTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsaW5lRWxlbWVudCwgdGVtcC5uZXh0U2libGluZyk7XG4gIC8vICAgICAgICAgICB0ZW1wID0gbGluZUVsZW1lbnQ7XG4gIC8vICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQWZ0ZXInLCBjaGlsZE5vZGUubmV4dFNpYmxpbmcpXG4gIC8vICAgICAgICAgICBhcnJheW9mYXJyYXlzLnB1c2goW2xpbmVFbGVtZW50XSk7XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9XG4gIC8vICAgICBlbHNlIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IDggfHwgUEhSQVNJTkdfVEFHTkFNRVMuaW5kZXhPZihjaGlsZE5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gIC8vICAgICAgIGN1cnJlbnRCYXRjaC5wdXNoKGNoaWxkTm9kZSk7XG4gIC8vICAgICB9XG4gIC8vICAgICBlbHNlIGlmKGN1cnJlbnRCYXRjaC5sZW5ndGggPiAwKSAgYXJyYXlvZmFycmF5cy5wdXNoKFtdKTtcbiAgLy8gICB9XG4gIC8vICAgY29uc29sZS5sb2coYXJyYXlvZmFycmF5cylcbiAgLy8gICBmb3IgKGxldCBhcnJheSBvZiBhcnJheW9mYXJyYXlzKXtcbiAgLy8gICAgIGlmIChhcnJheS5sZW5ndGggPT09IDApIGNvbnRpbnVlXG4gIC8vICAgICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAvLyAgICAgY29uc3QgZmlyc3QgPSBhcnJheVswXTtcbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGZpcnN0KTtcbiAgLy8gICAgIGZpcnN0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHBhcmEsIGZpcnN0KTtcbiAgLy8gICAgIGZvciAobm9kZSBvZiBhcnJheSkgcGFyYS5hcHBlbmRDaGlsZChub2RlKTtcbiAgLy8gICB9XG4gIC8vIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbGFtbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xhbWwuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCkge1xuICAvLyBoYW5kbGUgbWV0YWRhdGFcbiAgY29uc3QgYXJ0aWNsZU1ldGEgPSBKU09OLnBhcnNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRhZGF0YScpLnRleHQpO1xuICBjb25zdCBhcnRpY2xlSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgYXJ0aWNsZUluZm8uY2xhc3NMaXN0LmFkZCgnYXJ0aWNsZUluZm8nKTtcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoYXJ0aWNsZUluZm8sIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4gIGNvbnN0IGFydGljbGVUaXRsZSA9IGFydGljbGVNZXRhLnRpdGxlO1xuICBpZiAoYXJ0aWNsZVRpdGxlKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IGFydGljbGVUaXRsZTtcbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoZWFkaW5nLmlubmVySFRNTCA9IGFydGljbGVUaXRsZTtcbiAgICBhcnRpY2xlSW5mby5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgfVxuICBjb25zdCBhcnRpY2xlQXV0aG9ycyA9IGFydGljbGVNZXRhLmF1dGhvcnMgfHwgW107XG4gIGZvciAobGV0IGF1dGhvciBvZiBhcnRpY2xlQXV0aG9ycykge1xuICAgIGNvbnN0IG5hbWUgPSBhdXRob3IubmFtZTtcbiAgICBjb25zdCBhZGRyZXNzID0gYXV0aG9yLmFkZHJlc3M7XG4gICAgY29uc3QgYXV0aG9yUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBhdXRob3JQLmNsYXNzTGlzdC5hZGQoJ2F1dGhvcicpO1xuICAgIGF1dGhvclAuaW5uZXJIVE1MID0gbmFtZSArICcsICcgKyBhZGRyZXNzICsgJy4nO1xuICAgIGFydGljbGVJbmZvLmFwcGVuZENoaWxkKGF1dGhvclApO1xuICB9XG4gIGNvbnN0IGtleXdvcmRzID0gYXJ0aWNsZU1ldGEua2V5d29yZHM7XG4gIGNvbnN0IGt3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBrdy5jbGFzc0xpc3QuYWRkKCdrZXl3b3JkcycpO1xuICBrdy5pbm5lckhUTUwgPSAnS2V5d29yZHM6ICcgKyBrZXl3b3Jkcy5qb2luKCcsICcpICsgJy4nO1xuICBhcnRpY2xlSW5mby5hcHBlbmRDaGlsZChrdyk7XG5cbiAgY29uc3QgbGljZW5zaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBsaWNlbnNpbmcuY2xhc3NMaXN0LmFkZCgnbGljZW5zZScpO1xuXG4gIGxpY2Vuc2luZy5pbm5lckhUTUwgPVxuICAgICdEZXJpdmVkIGZyb20gPGEgaHJlZj1cIicgK1xuICAgIGFydGljbGVNZXRhLnNvdXJjZSArXG4gICAgJ1wiPicgK1xuICAgIGFydGljbGVNZXRhLnNvdXJjZSArXG4gICAgJzwvYT4sICcgK1xuICAgIGFydGljbGVNZXRhLmxpY2Vuc2UgK1xuICAgICcgYW5kIGxpY2Vuc2VkIGFzIHN1Y2guJztcbiAgYXJ0aWNsZUluZm8uYXBwZW5kQ2hpbGQobGljZW5zaW5nKTtcblxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21ldGFkYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KXtcbiAgLy8gcHJlYW1ibGVcbiAgcmVuYW1lVGFnKGRvY3VtZW50LCdwcmVhbWJsZScsICdkaXYnLCAnaGlkZGVuJyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wcmVhbWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCl7XG4gIC8vIGFic3RyYWN0XG4gIHJlbmFtZVRhZyhkb2N1bWVudCwgJ2Fic3RyYWN0JywgJ3NlY3Rpb24nLCB0cnVlKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fic3RyYWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpe1xuICAvLyBjb252ZXJ0IHN0YXRlbWVudHMgdG8gc2VjdGlvbnNcbiAgY29uc3Qgc3RhdGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ3Byb29mLCB0aGVvcmVtLCBwcm9wb3NpdGlvbiwgbGVtbWEsIGNvcm9sbGFyeSdcbiAgKTtcbiAgbGV0IHN0YXRlbWVudF9jb3VudGVyID0gMDtcbiAgZm9yIChsZXQgc3RhdGVtZW50IG9mIHN0YXRlbWVudHMpIHtcbiAgICBjb25zdCByZW5hbWVkTm9kZSA9IHJlbmFtZVRhZyhkb2N1bWVudCwgc3RhdGVtZW50LCAnc2VjdGlvbicsIHRydWUpO1xuICAgIGNvbnN0IHRhZ25hbWUgPSBzdGF0ZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJlbmFtZWROb2RlLmNsYXNzTGlzdC5hZGQodGFnbmFtZSk7XG4gICAgY29uc3QgbmFtZSA9IHJlbmFtZWROb2RlLnF1ZXJ5U2VsZWN0b3IoJ25hbWUnKTtcbiAgICAvLyBUT0RPIG1heWJlIG5hbWUgaGFuZGxpbmcgaXMgbW9yZSBsaWtlIGEgaGVscGVyIHRoYXQgc2hvdWxkIGJlIHJlcXVpcmVkIGFuZCBhcHBsaWVkIGhlcmU/XG4gICAgaWYgKG5hbWUpIGNvbnRpbnVlO1xuICAgIHN0YXRlbWVudF9jb3VudGVyKys7XG4gICAgLy8gVE9ETyBsb29rIHVwIGNvcnJlY3QgaGVhZGluZyBsZXZlbFxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnbmFtZScpO1xuICAgIGhlYWRpbmcuaWQgPSB0YWduYW1lLnRvTG93ZXJDYXNlKCkgKyAnLScgKyBzdGF0ZW1lbnRfY291bnRlcjtcbiAgICBoZWFkaW5nLmlubmVySFRNTCA9XG4gICAgICB0YWduYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyB0YWduYW1lLnN1YnN0cmluZygxKSArICcgJyArIHN0YXRlbWVudF9jb3VudGVyO1xuICAgIHJlbmFtZWROb2RlLmluc2VydEJlZm9yZShoZWFkaW5nLCByZW5hbWVkTm9kZS5maXJzdENoaWxkKTtcbiAgfVxuXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGF0ZW1lbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50LCBiZWxvd09yQWJvdmUpIHtcbiAgLy8gaGFuZGxlIGZpZ3VyZXNcbiAgY29uc3QgZmlndXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ZpZ3VyZScpO1xuICBmb3IgKGxldCBbaW5kZXgsIGZpZ3VyZV0gb2YgZmlndXJlcy5lbnRyaWVzKCkpIHtcbiAgICBmaWd1cmUuY2xhc3NMaXN0LmFkZCgnZmlndXJlJyk7XG4gICAgY29uc3QgbmFtZSA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCduYW1lJyk7XG4gICAgaWYgKG5hbWUpIGNvbnRpbnVlO1xuICAgIC8vIFRPRE8gbG9vayB1cCBjb3JyZWN0IGhlYWRpbmcgbGV2ZWxcbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ25hbWUnKTtcbiAgICBoZWFkaW5nLmlubmVySFRNTCA9ICdGaWd1cmUgJyArIChpbmRleCArIDEpO1xuICAgIGlmIChiZWxvd09yQWJvdmUpIGZpZ3VyZS5pbnNlcnRCZWZvcmUoaGVhZGluZywgZmlndXJlLmZpcnN0Q2hpbGQpO1xuICAgIGVsc2UgZmlndXJlLmluc2VydEJlZm9yZShoZWFkaW5nLCBmaWd1cmUucXVlcnlTZWxlY3RvcignaW1nJykubmV4dFNpYmxpbmcpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmlndXJlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIC8vIGNvbnZlcnQgbmFtZXMgdG8gaGVhZGluZ3NcbiAgY29uc3QgbmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduYW1lJyk7XG4gIGZvciAobGV0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAvLyBUT0RPIGxvb2sgdXAgY29ycmVjdCBoZWFkaW5nIGxldmVsXG4gICAgY29uc3QgcmVuYW1lZE5vZGUgPSByZW5hbWVUYWcoZG9jdW1lbnQsIG5hbWUsICdoMicsIHRydWUpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmFtZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIE1hdGhKYXggQ29uc29ydGl1bVxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIHRleDJqYXggPSBmdW5jdGlvbiAoKSB7fTtcblxudGV4MmpheC5wcm90b3R5cGUuY29uZmlnID0ge1xuICAgIGRvYzoge30sXG4gICAgaW5saW5lTWF0aDogWyAvLyBUaGUgc3RhcnQvc3RvcCBwYWlycyBmb3IgaW4tbGluZSBtYXRoXG4gICAgICAgIC8vICAgIFsnJCcsJyQnXSwgICAgICAgICAgICAgICAvLyAgKGNvbW1lbnQgb3V0IGFueSB5b3UgZG9uJ3Qgd2FudCwgb3IgYWRkIHlvdXIgb3duLCBidXRcbiAgICAgICAgWydcXFxcKCcsICdcXFxcKSddIC8vICBiZSBzdXJlIHRoYXQgeW91IGRvbid0IGhhdmUgYW4gZXh0cmEgY29tbWEgYXQgdGhlIGVuZClcbiAgICBdLFxuXG4gICAgZGlzcGxheU1hdGg6IFsgLy8gVGhlIHN0YXJ0L3N0b3AgcGFpcnMgZm9yIGRpc3BsYXkgbWF0aFxuICAgICAgICBbJyQkJywgJyQkJ10sIC8vICAoY29tbWVudCBvdXQgYW55IHlvdSBkb24ndCB3YW50LCBvciBhZGQgeW91ciBvd24sIGJ1dFxuICAgICAgICBbJ1xcXFxbJywgJ1xcXFxdJ10gLy8gIGJlIHN1cmUgdGhhdCB5b3UgZG9uJ3QgaGF2ZSBhbiBleHRyYSBjb21tYSBhdCB0aGUgZW5kKVxuICAgIF0sXG5cbiAgICBiYWxhbmNlQnJhY2VzOiB0cnVlLCAvLyBkZXRlcm1pbmVzIHdoZXRoZXIgdGV4MmpheCByZXF1aXJlcyBicmFjZXMgdG8gYmVcbiAgICAvLyBiYWxhbmNlZCB3aXRoaW4gbWF0aCBkZWxpbWl0ZXJzIChhbGxvd3MgZm9yIG5lc3RlZFxuICAgIC8vIGRvbGxhciBzaWducykuICBTZXQgdG8gZmFsc2UgdG8gZ2V0IHByZS12Mi4wIGNvbXBhdGliaWxpdHkuXG5cbiAgICBza2lwVGFnczogW1wic2NyaXB0XCIsIFwibm9zY3JpcHRcIiwgXCJzdHlsZVwiLCBcInRleHRhcmVhXCIsIFwicHJlXCIsIFwiY29kZVwiLCBcImFubm90YXRpb25cIiwgXCJhbm5vdGF0aW9uLXhtbFwiXSxcbiAgICAvLyBUaGUgbmFtZXMgb2YgdGhlIHRhZ3Mgd2hvc2UgY29udGVudHMgd2lsbCBub3QgYmVcbiAgICAvLyBzY2FubmVkIGZvciBtYXRoIGRlbGltaXRlcnNcblxuICAgIGlnbm9yZUNsYXNzOiBcInRleDJqYXhfaWdub3JlXCIsIC8vIHRoZSBjbGFzcyBuYW1lIG9mIGVsZW1lbnRzIHdob3NlIGNvbnRlbnRzIHNob3VsZFxuICAgIC8vIE5PVCBiZSBwcm9jZXNzZWQgYnkgdGV4MmpheC4gIE5vdGUgdGhhdCB0aGlzXG4gICAgLy8gaXMgYSByZWd1bGFyIGV4cHJlc3Npb24sIHNvIGJlIHN1cmUgdG8gcXVvdGUgYW55XG4gICAgLy8gcmVnZXhwIHNwZWNpYWwgY2hhcmFjdGVyc1xuXG4gICAgcHJvY2Vzc0NsYXNzOiBcInRleDJqYXhfcHJvY2Vzc1wiLCAvLyB0aGUgY2xhc3MgbmFtZSBvZiBlbGVtZW50cyB3aG9zZSBjb250ZW50cyBTSE9VTERcbiAgICAvLyBiZSBwcm9jZXNzZWQgd2hlbiB0aGV5IGFwcGVhciBpbnNpZGUgb25lcyB0aGF0XG4gICAgLy8gYXJlIGlnbm9yZWQuICBOb3RlIHRoYXQgdGhpcyBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbixcbiAgICAvLyBzbyBiZSBzdXJlIHRvIHF1b3RlIGFueSByZWdleHAgc3BlY2lhbCBjaGFyYWN0ZXJzXG5cbiAgICBwcm9jZXNzRXNjYXBlczogZmFsc2UsIC8vIHNldCB0byB0cnVlIHRvIGFsbG93IFxcJCB0byBwcm9kdWNlIGEgZG9sbGFyIHdpdGhvdXRcbiAgICAvLyAgIHN0YXJ0aW5nIGluLWxpbmUgbWF0aCBtb2RlXG5cbiAgICBwcm9jZXNzRW52aXJvbm1lbnRzOiB0cnVlLCAvLyBzZXQgdG8gdHJ1ZSB0byBwcm9jZXNzIFxcYmVnaW57eHh4fS4uLlxcZW5ke3h4eH0gb3V0c2lkZVxuICAgIC8vICAgb2YgbWF0aCBtb2RlLCBmYWxzZSB0byBwcmV2ZW50IHRoYXRcblxuICAgIHByb2Nlc3NSZWZzOiB0cnVlLCAvLyBzZXQgdG8gdHJ1ZSB0byBwcm9jZXNzIFxccmVmey4uLn0gb3V0c2lkZSBvZiBtYXRoIG1vZGVcblxufTtcblxudGV4MmpheC5wcm90b3R5cGUuUHJlUHJvY2VzcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiAoZWxlbWVudCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZWxlbWVudCA9IHRoaXMuY29uZmlnLmRvYy5nZXRFbGVtZW50QnlJZChlbGVtZW50KVxuICAgIH1cbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudCA9IHRoaXMuY29uZmlnLmRvYy5ib2R5XG4gICAgfVxuICAgIGlmICh0aGlzLmNyZWF0ZVBhdHRlcm5zKCkpIHtcbiAgICAgICAgdGhpcy5zY2FuRWxlbWVudChlbGVtZW50LCBlbGVtZW50Lm5leHRTaWJsaW5nKVxuICAgIH1cbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmNyZWF0ZVBhdHRlcm5zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFydHMgPSBbXSxcbiAgICAgICAgcGFydHMgPSBbXSxcbiAgICAgICAgaSwgbSwgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgdGhpcy5tYXRjaCA9IHt9O1xuICAgIGZvciAoaSA9IDAsIG0gPSBjb25maWcuaW5saW5lTWF0aC5sZW5ndGg7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgc3RhcnRzLnB1c2godGhpcy5wYXR0ZXJuUXVvdGUoY29uZmlnLmlubGluZU1hdGhbaV1bMF0pKTtcbiAgICAgICAgdGhpcy5tYXRjaFtjb25maWcuaW5saW5lTWF0aFtpXVswXV0gPSB7XG4gICAgICAgICAgICBtb2RlOiBcInRleFwiLFxuICAgICAgICAgICAgZW5kOiBjb25maWcuaW5saW5lTWF0aFtpXVsxXSxcbiAgICAgICAgICAgIHBhdHRlcm46IHRoaXMuZW5kUGF0dGVybihjb25maWcuaW5saW5lTWF0aFtpXVsxXSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbSA9IGNvbmZpZy5kaXNwbGF5TWF0aC5sZW5ndGg7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgc3RhcnRzLnB1c2godGhpcy5wYXR0ZXJuUXVvdGUoY29uZmlnLmRpc3BsYXlNYXRoW2ldWzBdKSk7XG4gICAgICAgIHRoaXMubWF0Y2hbY29uZmlnLmRpc3BsYXlNYXRoW2ldWzBdXSA9IHtcbiAgICAgICAgICAgIG1vZGU6IFwidGV4OyBtb2RlPWRpc3BsYXlcIixcbiAgICAgICAgICAgIGVuZDogY29uZmlnLmRpc3BsYXlNYXRoW2ldWzFdLFxuICAgICAgICAgICAgcGF0dGVybjogdGhpcy5lbmRQYXR0ZXJuKGNvbmZpZy5kaXNwbGF5TWF0aFtpXVsxXSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgcGFydHMucHVzaChzdGFydHMuc29ydCh0aGlzLnNvcnRMZW5ndGgpLmpvaW4oXCJ8XCIpKVxuICAgIH1cbiAgICBpZiAoY29uZmlnLnByb2Nlc3NFbnZpcm9ubWVudHMpIHtcbiAgICAgICAgcGFydHMucHVzaChcIlxcXFxcXFxcYmVnaW5cXFxceyhbXn1dKilcXFxcfVwiKVxuICAgIH1cbiAgICBpZiAoY29uZmlnLnByb2Nlc3NFc2NhcGVzKSB7XG4gICAgICAgIHBhcnRzLnB1c2goXCJcXFxcXFxcXCpcXFxcXFxcXFxcXFxcXCRcIilcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5wcm9jZXNzUmVmcykge1xuICAgICAgICBwYXJ0cy5wdXNoKFwiXFxcXFxcXFwoZXEpP3JlZlxcXFx7W159XSpcXFxcfVwiKVxuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbmV3IFJlZ0V4cChwYXJ0cy5qb2luKFwifFwiKSwgXCJnXCIpO1xuICAgIHRoaXMuc2tpcFRhZ3MgPSBuZXcgUmVnRXhwKFwiXihcIiArIGNvbmZpZy5za2lwVGFncy5qb2luKFwifFwiKSArIFwiKSRcIiwgXCJpXCIpO1xuICAgIHZhciBpZ25vcmUgPSBbXTtcbiAgICBpZiAodGhpcy5jb25maWcucHJlUmVtb3ZlQ2xhc3MpIHtcbiAgICAgICAgaWdub3JlLnB1c2godGhpcy5jb25maWcucHJlUmVtb3ZlQ2xhc3MpXG4gICAgfTtcbiAgICBpZiAoY29uZmlnLmlnbm9yZUNsYXNzKSB7XG4gICAgICAgIGlnbm9yZS5wdXNoKGNvbmZpZy5pZ25vcmVDbGFzcylcbiAgICB9XG4gICAgdGhpcy5pZ25vcmVDbGFzcyA9IChpZ25vcmUubGVuZ3RoID8gbmV3IFJlZ0V4cChcIihefCApKFwiICsgaWdub3JlLmpvaW4oXCJ8XCIpICsgXCIpKCB8JClcIikgOiAvXiQvKTtcbiAgICB0aGlzLnByb2Nlc3NDbGFzcyA9IG5ldyBSZWdFeHAoXCIoXnwgKShcIiArIGNvbmZpZy5wcm9jZXNzQ2xhc3MgKyBcIikoIHwkKVwiKTtcbiAgICByZXR1cm4gKHBhcnRzLmxlbmd0aCA+IDApO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUucGF0dGVyblF1b3RlID0gZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC8oW1xcXiQoKXt9Kyo/XFwtfFxcW1xcXVxcOlxcXFxdKS9nLCAnXFxcXCQxJylcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmVuZFBhdHRlcm4gPSBmdW5jdGlvbiAoZW5kKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAodGhpcy5wYXR0ZXJuUXVvdGUoZW5kKSArIFwifFxcXFxcXFxcLnxbe31dXCIsIFwiZ1wiKTtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLnNvcnRMZW5ndGggPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGhcbiAgICB9XG4gICAgcmV0dXJuIChhID09IGIgPyAwIDogKGEgPCBiID8gLTEgOiAxKSk7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5zY2FuRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBzdG9wLCBpZ25vcmUpIHtcbiAgICB2YXIgY25hbWUsIHRuYW1lLCBpZ25vcmVDaGlsZCwgcHJvY2VzcztcbiAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50ICE9IHN0b3ApIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICAgICAgaWYgKCFpZ25vcmUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5zY2FuVGV4dChlbGVtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY25hbWUgPSAodHlwZW9mIChlbGVtZW50LmNsYXNzTmFtZSkgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogZWxlbWVudC5jbGFzc05hbWUpO1xuICAgICAgICAgICAgdG5hbWUgPSAodHlwZW9mIChlbGVtZW50LnRhZ05hbWUpID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IGVsZW1lbnQudGFnTmFtZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChjbmFtZSkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBjbmFtZSA9IFN0cmluZyhjbmFtZSlcbiAgICAgICAgICAgIH0gLy8ganN4Z3JhcGggdXNlcyBub24tc3RyaW5nIGNsYXNzIG5hbWVzIVxuICAgICAgICAgICAgcHJvY2VzcyA9IHRoaXMucHJvY2Vzc0NsYXNzLmV4ZWMoY25hbWUpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuZmlyc3RDaGlsZCAmJiAhY25hbWUubWF0Y2goLyhefCApTWF0aEpheC8pICYmXG4gICAgICAgICAgICAgICAgKHByb2Nlc3MgfHwgIXRoaXMuc2tpcFRhZ3MuZXhlYyh0bmFtZSkpKSB7XG4gICAgICAgICAgICAgICAgaWdub3JlQ2hpbGQgPSAoaWdub3JlIHx8IHRoaXMuaWdub3JlQ2xhc3MuZXhlYyhjbmFtZSkpICYmICFwcm9jZXNzO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbkVsZW1lbnQoZWxlbWVudC5maXJzdENoaWxkLCBzdG9wLCBpZ25vcmVDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm5leHRTaWJsaW5nXG4gICAgICAgIH1cbiAgICB9XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5zY2FuVGV4dCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQubm9kZVZhbHVlLnJlcGxhY2UoL1xccysvLCAnJykgPT0gJycpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICB9XG4gICAgdmFyIG1hdGNoLCBwcmV2O1xuICAgIHRoaXMuc2VhcmNoID0ge1xuICAgICAgICBzdGFydDogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5wYXR0ZXJuID0gdGhpcy5zdGFydDtcbiAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICB0aGlzLnBhdHRlcm4ubGFzdEluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnI3RleHQnICYmXG4gICAgICAgICAgICAobWF0Y2ggPSB0aGlzLnBhdHRlcm4uZXhlYyhlbGVtZW50Lm5vZGVWYWx1ZSkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2guc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5zdGFydE1hdGNoKG1hdGNoLCBlbGVtZW50KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5lbmRNYXRjaChtYXRjaCwgZWxlbWVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2gubWF0Y2hlZCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZW5jbG9zZU1hdGgoZWxlbWVudClcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHByZXYgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm5leHRTaWJsaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudCAmJiAoZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYnInIHx8XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJyNjb21tZW50JykpO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50IHx8IGVsZW1lbnQubm9kZU5hbWUgIT09ICcjdGV4dCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc2VhcmNoLmNsb3NlID8gdGhpcy5wcmV2RW5kTWF0Y2goKSA6IHByZXYpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5zdGFydE1hdGNoID0gZnVuY3Rpb24gKG1hdGNoLCBlbGVtZW50KSB7XG4gICAgdmFyIGRlbGltID0gdGhpcy5tYXRjaFttYXRjaFswXV07XG4gICAgaWYgKGRlbGltICE9IG51bGwpIHsgLy8gYSBzdGFydCBkZWxpbWl0ZXJcbiAgICAgICAgdGhpcy5zZWFyY2ggPSB7XG4gICAgICAgICAgICBlbmQ6IGRlbGltLmVuZCxcbiAgICAgICAgICAgIG1vZGU6IGRlbGltLm1vZGUsXG4gICAgICAgICAgICBwY291bnQ6IDAsXG4gICAgICAgICAgICBvcGVuOiBlbGVtZW50LFxuICAgICAgICAgICAgb2xlbjogbWF0Y2hbMF0ubGVuZ3RoLFxuICAgICAgICAgICAgb3BvczogdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCAtIG1hdGNoWzBdLmxlbmd0aFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN3aXRjaFBhdHRlcm4oZGVsaW0ucGF0dGVybik7XG4gICAgfSBlbHNlIGlmIChtYXRjaFswXS5zdWJzdHIoMCwgNikgPT09IFwiXFxcXGJlZ2luXCIpIHsgLy8gXFxiZWdpbnsuLi59XG4gICAgICAgIHRoaXMuc2VhcmNoID0ge1xuICAgICAgICAgICAgZW5kOiBcIlxcXFxlbmR7XCIgKyBtYXRjaFsxXSArIFwifVwiLFxuICAgICAgICAgICAgbW9kZTogXCJUZVhcIixcbiAgICAgICAgICAgIHBjb3VudDogMCxcbiAgICAgICAgICAgIG9wZW46IGVsZW1lbnQsXG4gICAgICAgICAgICBvbGVuOiAwLFxuICAgICAgICAgICAgb3BvczogdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCAtIG1hdGNoWzBdLmxlbmd0aCxcbiAgICAgICAgICAgIGlzQmVnaW5FbmQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zd2l0Y2hQYXR0ZXJuKHRoaXMuZW5kUGF0dGVybih0aGlzLnNlYXJjaC5lbmQpKTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdLnN1YnN0cigwLCA0KSA9PT0gXCJcXFxccmVmXCIgfHwgbWF0Y2hbMF0uc3Vic3RyKDAsIDYpID09PSBcIlxcXFxlcXJlZlwiKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0ge1xuICAgICAgICAgICAgbW9kZTogXCJcIixcbiAgICAgICAgICAgIGVuZDogXCJcIixcbiAgICAgICAgICAgIG9wZW46IGVsZW1lbnQsXG4gICAgICAgICAgICBwY291bnQ6IDAsXG4gICAgICAgICAgICBvbGVuOiAwLFxuICAgICAgICAgICAgb3BvczogdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCAtIG1hdGNoWzBdLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVuZE1hdGNoKFtcIlwiXSwgZWxlbWVudCk7XG4gICAgfSBlbHNlIHsgLy8gZXNjYXBlZCBkb2xsYXIgc2lnbnNcbiAgICAgICAgLy8gcHV0ICQgaW4gYSBzcGFuIHNvIGl0IGRvZXNuJ3QgZ2V0IHByb2Nlc3NlZCBhZ2FpblxuICAgICAgICAvLyBzcGxpdCBvZmYgYmFja3NsYXNoZXMgc28gdGhleSBkb24ndCBnZXQgcmVtb3ZlZCBsYXRlclxuICAgICAgICB2YXIgc2xhc2hlcyA9IG1hdGNoWzBdLnN1YnN0cigwLCBtYXRjaFswXS5sZW5ndGggLSAxKSxcbiAgICAgICAgICAgIG4sIHNwYW47XG4gICAgICAgIGlmIChzbGFzaGVzLmxlbmd0aCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIHNwYW4gPSBbc2xhc2hlcy5yZXBsYWNlKC9cXFxcXFxcXC9nLCBcIlxcXFxcIildO1xuICAgICAgICAgICAgbiA9IDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNwYW4gPSBbc2xhc2hlcy5zdWJzdHIoMSkucmVwbGFjZSgvXFxcXFxcXFwvZywgXCJcXFxcXCIpLCBcIiRcIl07XG4gICAgICAgICAgICBuID0gMFxuICAgICAgICB9XG4gICAgICAgIGVzY2FwZWQgPSB0aGlzLmNvbmZpZy5kb2MuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGVzY2FwZWQuaW5uZXJIVE1MID0gc3Bhbi5qb2luKCcnKTtcbiAgICAgICAgdmFyIHRleHQgPSB0aGlzLmNvbmZpZy5kb2MuY3JlYXRlVGV4dE5vZGUoZWxlbWVudC5ub2RlVmFsdWUuc3Vic3RyKDAsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgIGVsZW1lbnQubm9kZVZhbHVlID0gZWxlbWVudC5ub2RlVmFsdWUuc3Vic3RyKG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIC0gbik7XG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZXNjYXBlZCwgZWxlbWVudCk7XG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGV4dCwgZXNjYXBlZCk7XG4gICAgICAgIHRoaXMucGF0dGVybi5sYXN0SW5kZXggPSBuO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmVuZE1hdGNoID0gZnVuY3Rpb24gKG1hdGNoLCBlbGVtZW50KSB7XG4gICAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoO1xuICAgIGlmIChtYXRjaFswXSA9PSBzZWFyY2guZW5kKSB7XG4gICAgICAgIGlmICghc2VhcmNoLmNsb3NlIHx8IHNlYXJjaC5wY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHNlYXJjaC5jbG9zZSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBzZWFyY2guY3BvcyA9IHRoaXMucGF0dGVybi5sYXN0SW5kZXg7XG4gICAgICAgICAgICBzZWFyY2guY2xlbiA9IChzZWFyY2guaXNCZWdpbkVuZCA/IDAgOiBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWFyY2gucGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzZWFyY2gubWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5lbmNsb3NlTWF0aChlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoUGF0dGVybih0aGlzLnN0YXJ0KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0gPT09IFwie1wiKSB7XG4gICAgICAgIHNlYXJjaC5wY291bnQrK1xuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0gPT09IFwifVwiICYmIHNlYXJjaC5wY291bnQpIHtcbiAgICAgICAgc2VhcmNoLnBjb3VudC0tXG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufTtcbnRleDJqYXgucHJvdG90eXBlLnByZXZFbmRNYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNlYXJjaC5tYXRjaGVkID0gdHJ1ZTtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZW5jbG9zZU1hdGgodGhpcy5zZWFyY2guY2xvc2UpO1xuICAgIHRoaXMuc3dpdGNoUGF0dGVybih0aGlzLnN0YXJ0KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLnN3aXRjaFBhdHRlcm4gPSBmdW5jdGlvbiAocGF0dGVybikge1xuICAgIHBhdHRlcm4ubGFzdEluZGV4ID0gdGhpcy5wYXR0ZXJuLmxhc3RJbmRleDtcbiAgICB0aGlzLnBhdHRlcm4gPSBwYXR0ZXJuO1xuICAgIHRoaXMuc2VhcmNoLnN0YXJ0ID0gKHBhdHRlcm4gPT09IHRoaXMuc3RhcnQpO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuZW5jbG9zZU1hdGggPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCxcbiAgICAgICAgY2xvc2UgPSBzZWFyY2guY2xvc2UsXG4gICAgICAgIENMT1NFLCBtYXRoO1xuICAgIGlmIChzZWFyY2guY3BvcyA9PT0gY2xvc2UubGVuZ3RoKSB7XG4gICAgICAgIGNsb3NlID0gY2xvc2UubmV4dFNpYmxpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgICBjbG9zZSA9IGNsb3NlLnNwbGl0VGV4dChzZWFyY2guY3BvcylcbiAgICB9XG4gICAgaWYgKCFjbG9zZSkge1xuICAgICAgICBDTE9TRSA9IGNsb3NlID0gc2VhcmNoLmNsb3NlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5jb25maWcuZG9jLmNyZWF0ZVRleHROb2RlKFwiXCIpKTtcbiAgICB9XG4gICAgc2VhcmNoLmNsb3NlID0gY2xvc2U7XG4gICAgbWF0aCA9IChzZWFyY2gub3BvcyA/IHNlYXJjaC5vcGVuLnNwbGl0VGV4dChzZWFyY2gub3BvcykgOiBzZWFyY2gub3Blbik7XG4gICAgd2hpbGUgKG1hdGgubmV4dFNpYmxpbmcgJiYgbWF0aC5uZXh0U2libGluZyAhPT0gY2xvc2UpIHtcbiAgICAgICAgaWYgKG1hdGgubmV4dFNpYmxpbmcubm9kZVZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobWF0aC5uZXh0U2libGluZy5ub2RlTmFtZSA9PT0gXCIjY29tbWVudFwiKSB7XG4gICAgICAgICAgICAgICAgbWF0aC5ub2RlVmFsdWUgKz0gbWF0aC5uZXh0U2libGluZy5ub2RlVmFsdWUucmVwbGFjZSgvXlxcW0NEQVRBXFxbKCgufFxcbnxcXHIpKilcXF1cXF0kLywgXCIkMVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF0aC5ub2RlVmFsdWUgKz0gbWF0aC5uZXh0U2libGluZy5ub2RlVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tc2llTmV3bGluZUJ1Zykge1xuICAgICAgICAgICAgbWF0aC5ub2RlVmFsdWUgKz0gKG1hdGgubmV4dFNpYmxpbmcubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJiclwiID8gXCJcXG5cIiA6IFwiIFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGgubm9kZVZhbHVlICs9IFwiIFwiO1xuICAgICAgICB9XG4gICAgICAgIG1hdGgucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtYXRoLm5leHRTaWJsaW5nKTtcbiAgICB9XG4gICAgdmFyIFRlWCA9IG1hdGgubm9kZVZhbHVlLnN1YnN0cihzZWFyY2gub2xlbiwgbWF0aC5ub2RlVmFsdWUubGVuZ3RoIC0gc2VhcmNoLm9sZW4gLSBzZWFyY2guY2xlbik7XG4gICAgbWF0aC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1hdGgpO1xuICAgIG1hdGggPSB0aGlzLmNyZWF0ZU1hdGhUYWcoc2VhcmNoLm1vZGUsIFRlWCk7XG4gICAgdGhpcy5zZWFyY2ggPSB7fTtcbiAgICB0aGlzLnBhdHRlcm4ubGFzdEluZGV4ID0gMDtcbiAgICBpZiAoQ0xPU0UpIHtcbiAgICAgICAgQ0xPU0UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChDTE9TRSlcbiAgICB9XG4gICAgcmV0dXJuIG1hdGg7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5pbnNlcnROb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2g7XG4gICAgc2VhcmNoLmNsb3NlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHNlYXJjaC5jbG9zZSk7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5jcmVhdGVNYXRoVGFnID0gZnVuY3Rpb24gKG1vZGUsIHRleCkge1xuICAgIHZhciBzY3JpcHQgPSB0aGlzLmNvbmZpZy5kb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzY3JpcHQudHlwZSA9ICdtYXRoLycgKyBtb2RlO1xuICAgIHNjcmlwdC50ZXh0ID0gdGV4O1xuICAgIHRoaXMuaW5zZXJ0Tm9kZShzY3JpcHQpO1xuICAgIHJldHVybiBzY3JpcHQ7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5maWx0ZXJQcmV2aWV3ID0gZnVuY3Rpb24gKHRleCkge1xuICAgIHJldHVybiB0ZXhcbn07XG5cbmV4cG9ydHMudGV4MmpheCA9IG5ldyB0ZXgyamF4KCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZXgyamF4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gY29tbW9ubWFyay5qcyAtIENvbW1vbU1hcmsgaW4gSmF2YVNjcmlwdFxuLy8gQ29weXJpZ2h0IChDKSAyMDE0IEpvaG4gTWFjRmFybGFuZVxuLy8gTGljZW5zZTogQlNEMy5cblxuLy8gQmFzaWMgdXNhZ2U6XG4vL1xuLy8gdmFyIGNvbW1vbm1hcmsgPSByZXF1aXJlKCdjb21tb25tYXJrJyk7XG4vLyB2YXIgcGFyc2VyID0gbmV3IGNvbW1vbm1hcmsuUGFyc2VyKCk7XG4vLyB2YXIgcmVuZGVyZXIgPSBuZXcgY29tbW9ubWFyay5IdG1sUmVuZGVyZXIoKTtcbi8vIGNvbnNvbGUubG9nKHJlbmRlcmVyLnJlbmRlcihwYXJzZXIucGFyc2UoJ0hlbGxvICp3b3JsZConKSkpO1xuXG5tb2R1bGUuZXhwb3J0cy5Ob2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG5tb2R1bGUuZXhwb3J0cy5QYXJzZXIgPSByZXF1aXJlKCcuL2Jsb2NrcycpO1xubW9kdWxlLmV4cG9ydHMuSHRtbFJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXIvaHRtbCcpO1xubW9kdWxlLmV4cG9ydHMuWG1sUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlci94bWwnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcbnZhciB1bmVzY2FwZVN0cmluZyA9IHJlcXVpcmUoJy4vY29tbW9uJykudW5lc2NhcGVTdHJpbmc7XG52YXIgT1BFTlRBRyA9IHJlcXVpcmUoJy4vY29tbW9uJykuT1BFTlRBRztcbnZhciBDTE9TRVRBRyA9IHJlcXVpcmUoJy4vY29tbW9uJykuQ0xPU0VUQUc7XG5cbnZhciBDT0RFX0lOREVOVCA9IDQ7XG5cbnZhciBDX1RBQiA9IDk7XG52YXIgQ19ORVdMSU5FID0gMTA7XG52YXIgQ19HUkVBVEVSVEhBTiA9IDYyO1xudmFyIENfTEVTU1RIQU4gPSA2MDtcbnZhciBDX1NQQUNFID0gMzI7XG52YXIgQ19PUEVOX0JSQUNLRVQgPSA5MTtcblxudmFyIElubGluZVBhcnNlciA9IHJlcXVpcmUoJy4vaW5saW5lcycpO1xuXG52YXIgcmVIdG1sQmxvY2tPcGVuID0gW1xuICAgLy4vLCAvLyBkdW1teSBmb3IgMFxuICAgL148KD86c2NyaXB0fHByZXxzdHlsZSkoPzpcXHN8PnwkKS9pLFxuICAgL148IS0tLyxcbiAgIC9ePFs/XS8sXG4gICAvXjwhW0EtWl0vLFxuICAgL148IVxcW0NEQVRBXFxbLyxcbiAgIC9ePFsvXT8oPzphZGRyZXNzfGFydGljbGV8YXNpZGV8YmFzZXxiYXNlZm9udHxibG9ja3F1b3RlfGJvZHl8Y2FwdGlvbnxjZW50ZXJ8Y29sfGNvbGdyb3VwfGRkfGRldGFpbHN8ZGlhbG9nfGRpcnxkaXZ8ZGx8ZHR8ZmllbGRzZXR8ZmlnY2FwdGlvbnxmaWd1cmV8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aFsxMjM0NTZdfGhlYWR8aGVhZGVyfGhyfGh0bWx8aWZyYW1lfGxlZ2VuZHxsaXxsaW5rfG1haW58bWVudXxtZW51aXRlbXxtZXRhfG5hdnxub2ZyYW1lc3xvbHxvcHRncm91cHxvcHRpb258cHxwYXJhbXxzZWN0aW9ufHNvdXJjZXx0aXRsZXxzdW1tYXJ5fHRhYmxlfHRib2R5fHRkfHRmb290fHRofHRoZWFkfHRpdGxlfHRyfHRyYWNrfHVsKSg/Olxcc3xbL10/Wz5dfCQpL2ksXG4gICAgbmV3IFJlZ0V4cCgnXig/OicgKyBPUEVOVEFHICsgJ3wnICsgQ0xPU0VUQUcgKyAnKVxcXFxzKiQnLCAnaScpXG5dO1xuXG52YXIgcmVIdG1sQmxvY2tDbG9zZSA9IFtcbiAgIC8uLywgLy8gZHVtbXkgZm9yIDBcbiAgIC88XFwvKD86c2NyaXB0fHByZXxzdHlsZSk+L2ksXG4gICAvLS0+LyxcbiAgIC9cXD8+LyxcbiAgIC8+LyxcbiAgIC9cXF1cXF0+L1xuXTtcblxudmFyIHJlVGhlbWF0aWNCcmVhayA9IC9eKD86KD86XFwqWyBcXHRdKil7Myx9fCg/Ol9bIFxcdF0qKXszLH18KD86LVsgXFx0XSopezMsfSlbIFxcdF0qJC87XG5cbnZhciByZU1heWJlU3BlY2lhbCA9IC9eWyNgfiorXz08PjAtOS1dLztcblxudmFyIHJlTm9uU3BhY2UgPSAvW14gXFx0XFxmXFx2XFxyXFxuXS87XG5cbnZhciByZUJ1bGxldExpc3RNYXJrZXIgPSAvXlsqKy1dLztcblxudmFyIHJlT3JkZXJlZExpc3RNYXJrZXIgPSAvXihcXGR7MSw5fSkoWy4pXSkvO1xuXG52YXIgcmVBVFhIZWFkaW5nTWFya2VyID0gL14jezEsNn0oPzpbIFxcdF0rfCQpLztcblxudmFyIHJlQ29kZUZlbmNlID0gL15gezMsfSg/IS4qYCl8Xn57Myx9KD8hLip+KS87XG5cbnZhciByZUNsb3NpbmdDb2RlRmVuY2UgPSAvXig/OmB7Myx9fH57Myx9KSg/PSAqJCkvO1xuXG52YXIgcmVTZXRleHRIZWFkaW5nTGluZSA9IC9eKD86PSt8LSspWyBcXHRdKiQvO1xuXG52YXIgcmVMaW5lRW5kaW5nID0gL1xcclxcbnxcXG58XFxyLztcblxuLy8gUmV0dXJucyB0cnVlIGlmIHN0cmluZyBjb250YWlucyBvbmx5IHNwYWNlIGNoYXJhY3RlcnMuXG52YXIgaXNCbGFuayA9IGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gIShyZU5vblNwYWNlLnRlc3QocykpO1xufTtcblxudmFyIGlzU3BhY2VPclRhYiA9IGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gYyA9PT0gQ19TUEFDRSB8fCBjID09PSBDX1RBQjtcbn07XG5cbnZhciBwZWVrID0gZnVuY3Rpb24obG4sIHBvcykge1xuICAgIGlmIChwb3MgPCBsbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGxuLmNoYXJDb2RlQXQocG9zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufTtcblxuLy8gRE9DIFBBUlNFUlxuXG4vLyBUaGVzZSBhcmUgbWV0aG9kcyBvZiBhIFBhcnNlciBvYmplY3QsIGRlZmluZWQgYmVsb3cuXG5cbi8vIFJldHVybnMgdHJ1ZSBpZiBibG9jayBlbmRzIHdpdGggYSBibGFuayBsaW5lLCBkZXNjZW5kaW5nIGlmIG5lZWRlZFxuLy8gaW50byBsaXN0cyBhbmQgc3VibGlzdHMuXG52YXIgZW5kc1dpdGhCbGFua0xpbmUgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHdoaWxlIChibG9jaykge1xuICAgICAgICBpZiAoYmxvY2suX2xhc3RMaW5lQmxhbmspIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0ID0gYmxvY2sudHlwZTtcbiAgICAgICAgaWYgKHQgPT09ICdsaXN0JyB8fCB0ID09PSAnaXRlbScpIHtcbiAgICAgICAgICAgIGJsb2NrID0gYmxvY2suX2xhc3RDaGlsZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIEFkZCBhIGxpbmUgdG8gdGhlIGJsb2NrIGF0IHRoZSB0aXAuICBXZSBhc3N1bWUgdGhlIHRpcFxuLy8gY2FuIGFjY2VwdCBsaW5lcyAtLSB0aGF0IGNoZWNrIHNob3VsZCBiZSBkb25lIGJlZm9yZSBjYWxsaW5nIHRoaXMuXG52YXIgYWRkTGluZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiKSB7XG4gICAgICB0aGlzLm9mZnNldCArPSAxOyAvLyBza2lwIG92ZXIgdGFiXG4gICAgICAvLyBhZGQgc3BhY2UgY2hhcmFjdGVyczpcbiAgICAgIHZhciBjaGFyc1RvVGFiID0gNCAtICh0aGlzLmNvbHVtbiAlIDQpO1xuICAgICAgdGhpcy50aXAuX3N0cmluZ19jb250ZW50ICs9ICgnICcucmVwZWF0KGNoYXJzVG9UYWIpKTtcbiAgICB9XG4gICAgdGhpcy50aXAuX3N0cmluZ19jb250ZW50ICs9IHRoaXMuY3VycmVudExpbmUuc2xpY2UodGhpcy5vZmZzZXQpICsgJ1xcbic7XG59O1xuXG4vLyBBZGQgYmxvY2sgb2YgdHlwZSB0YWcgYXMgYSBjaGlsZCBvZiB0aGUgdGlwLiAgSWYgdGhlIHRpcCBjYW4ndFxuLy8gYWNjZXB0IGNoaWxkcmVuLCBjbG9zZSBhbmQgZmluYWxpemUgaXQgYW5kIHRyeSBpdHMgcGFyZW50LFxuLy8gYW5kIHNvIG9uIHRpbCB3ZSBmaW5kIGEgYmxvY2sgdGhhdCBjYW4gYWNjZXB0IGNoaWxkcmVuLlxudmFyIGFkZENoaWxkID0gZnVuY3Rpb24odGFnLCBvZmZzZXQpIHtcbiAgICB3aGlsZSAoIXRoaXMuYmxvY2tzW3RoaXMudGlwLnR5cGVdLmNhbkNvbnRhaW4odGFnKSkge1xuICAgICAgICB0aGlzLmZpbmFsaXplKHRoaXMudGlwLCB0aGlzLmxpbmVOdW1iZXIgLSAxKTtcbiAgICB9XG5cbiAgICB2YXIgY29sdW1uX251bWJlciA9IG9mZnNldCArIDE7IC8vIG9mZnNldCAwID0gY29sdW1uIDFcbiAgICB2YXIgbmV3QmxvY2sgPSBuZXcgTm9kZSh0YWcsIFtbdGhpcy5saW5lTnVtYmVyLCBjb2x1bW5fbnVtYmVyXSwgWzAsIDBdXSk7XG4gICAgbmV3QmxvY2suX3N0cmluZ19jb250ZW50ID0gJyc7XG4gICAgdGhpcy50aXAuYXBwZW5kQ2hpbGQobmV3QmxvY2spO1xuICAgIHRoaXMudGlwID0gbmV3QmxvY2s7XG4gICAgcmV0dXJuIG5ld0Jsb2NrO1xufTtcblxuLy8gUGFyc2UgYSBsaXN0IG1hcmtlciBhbmQgcmV0dXJuIGRhdGEgb24gdGhlIG1hcmtlciAodHlwZSxcbi8vIHN0YXJ0LCBkZWxpbWl0ZXIsIGJ1bGxldCBjaGFyYWN0ZXIsIHBhZGRpbmcpIG9yIG51bGwuXG52YXIgcGFyc2VMaXN0TWFya2VyID0gZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICB2YXIgcmVzdCA9IHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICB2YXIgbWF0Y2g7XG4gICAgdmFyIG5leHRjO1xuICAgIHZhciBzcGFjZXNTdGFydENvbDtcbiAgICB2YXIgc3BhY2VzU3RhcnRPZmZzZXQ7XG4gICAgdmFyIGRhdGEgPSB7IHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgIHRpZ2h0OiB0cnVlLCAgLy8gbGlzdHMgYXJlIHRpZ2h0IGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgYnVsbGV0Q2hhcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgc3RhcnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgIGRlbGltaXRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgcGFkZGluZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgbWFya2VyT2Zmc2V0OiBwYXJzZXIuaW5kZW50IH07XG4gICAgaWYgKChtYXRjaCA9IHJlc3QubWF0Y2gocmVCdWxsZXRMaXN0TWFya2VyKSkpIHtcbiAgICAgICAgZGF0YS50eXBlID0gJ2J1bGxldCc7XG4gICAgICAgIGRhdGEuYnVsbGV0Q2hhciA9IG1hdGNoWzBdWzBdO1xuXG4gICAgfSBlbHNlIGlmICgobWF0Y2ggPSByZXN0Lm1hdGNoKHJlT3JkZXJlZExpc3RNYXJrZXIpKSAmJlxuICAgICAgICAgICAgICAgIChjb250YWluZXIudHlwZSAhPT0gJ3BhcmFncmFwaCcgfHxcbiAgICAgICAgICAgICAgICAgbWF0Y2hbMV0gPT09ICcxJykpIHtcbiAgICAgICAgZGF0YS50eXBlID0gJ29yZGVyZWQnO1xuICAgICAgICBkYXRhLnN0YXJ0ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgICAgICBkYXRhLmRlbGltaXRlciA9IG1hdGNoWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBtYWtlIHN1cmUgd2UgaGF2ZSBzcGFjZXMgYWZ0ZXJcbiAgICBuZXh0YyA9IHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIubmV4dE5vbnNwYWNlICsgbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICBpZiAoIShuZXh0YyA9PT0gLTEgfHwgbmV4dGMgPT09IENfVEFCIHx8IG5leHRjID09PSBDX1NQQUNFKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBpZiBpdCBpbnRlcnJ1cHRzIHBhcmFncmFwaCwgbWFrZSBzdXJlIGZpcnN0IGxpbmUgaXNuJ3QgYmxhbmtcbiAgICBpZiAoY29udGFpbmVyLnR5cGUgPT09ICdwYXJhZ3JhcGgnICYmICFwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSArIG1hdGNoWzBdLmxlbmd0aCkubWF0Y2gocmVOb25TcGFjZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gd2UndmUgZ290IGEgbWF0Y2ghIGFkdmFuY2Ugb2Zmc2V0IGFuZCBjYWxjdWxhdGUgcGFkZGluZ1xuICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7IC8vIHRvIHN0YXJ0IG9mIG1hcmtlclxuICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KG1hdGNoWzBdLmxlbmd0aCwgdHJ1ZSk7IC8vIHRvIGVuZCBvZiBtYXJrZXJcbiAgICBzcGFjZXNTdGFydENvbCA9IHBhcnNlci5jb2x1bW47XG4gICAgc3BhY2VzU3RhcnRPZmZzZXQgPSBwYXJzZXIub2Zmc2V0O1xuICAgIGRvIHtcbiAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgdHJ1ZSk7XG4gICAgICAgIG5leHRjID0gcGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5vZmZzZXQpO1xuICAgIH0gd2hpbGUgKHBhcnNlci5jb2x1bW4gLSBzcGFjZXNTdGFydENvbCA8IDUgJiZcbiAgICAgICAgICAgaXNTcGFjZU9yVGFiKG5leHRjKSk7XG4gICAgdmFyIGJsYW5rX2l0ZW0gPSBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm9mZnNldCkgPT09IC0xO1xuICAgIHZhciBzcGFjZXNfYWZ0ZXJfbWFya2VyID0gcGFyc2VyLmNvbHVtbiAtIHNwYWNlc1N0YXJ0Q29sO1xuICAgIGlmIChzcGFjZXNfYWZ0ZXJfbWFya2VyID49IDUgfHxcbiAgICAgICAgc3BhY2VzX2FmdGVyX21hcmtlciA8IDEgfHxcbiAgICAgICAgYmxhbmtfaXRlbSkge1xuICAgICAgICBkYXRhLnBhZGRpbmcgPSBtYXRjaFswXS5sZW5ndGggKyAxO1xuICAgICAgICBwYXJzZXIuY29sdW1uID0gc3BhY2VzU3RhcnRDb2w7XG4gICAgICAgIHBhcnNlci5vZmZzZXQgPSBzcGFjZXNTdGFydE9mZnNldDtcbiAgICAgICAgaWYgKGlzU3BhY2VPclRhYihwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm9mZnNldCkpKSB7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEucGFkZGluZyA9IG1hdGNoWzBdLmxlbmd0aCArIHNwYWNlc19hZnRlcl9tYXJrZXI7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xufTtcblxuLy8gUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gbGlzdCBpdGVtcyBhcmUgb2YgdGhlIHNhbWUgdHlwZSxcbi8vIHdpdGggdGhlIHNhbWUgZGVsaW1pdGVyIGFuZCBidWxsZXQgY2hhcmFjdGVyLiAgVGhpcyBpcyB1c2VkXG4vLyBpbiBhZ2dsb21lcmF0aW5nIGxpc3QgaXRlbXMgaW50byBsaXN0cy5cbnZhciBsaXN0c01hdGNoID0gZnVuY3Rpb24obGlzdF9kYXRhLCBpdGVtX2RhdGEpIHtcbiAgICByZXR1cm4gKGxpc3RfZGF0YS50eXBlID09PSBpdGVtX2RhdGEudHlwZSAmJlxuICAgICAgICAgICAgbGlzdF9kYXRhLmRlbGltaXRlciA9PT0gaXRlbV9kYXRhLmRlbGltaXRlciAmJlxuICAgICAgICAgICAgbGlzdF9kYXRhLmJ1bGxldENoYXIgPT09IGl0ZW1fZGF0YS5idWxsZXRDaGFyKTtcbn07XG5cbi8vIEZpbmFsaXplIGFuZCBjbG9zZSBhbnkgdW5tYXRjaGVkIGJsb2Nrcy5cbnZhciBjbG9zZVVubWF0Y2hlZEJsb2NrcyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5hbGxDbG9zZWQpIHtcbiAgICAgICAgLy8gZmluYWxpemUgYW55IGJsb2NrcyBub3QgbWF0Y2hlZFxuICAgICAgICB3aGlsZSAodGhpcy5vbGR0aXAgIT09IHRoaXMubGFzdE1hdGNoZWRDb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLm9sZHRpcC5fcGFyZW50O1xuICAgICAgICAgICAgdGhpcy5maW5hbGl6ZSh0aGlzLm9sZHRpcCwgdGhpcy5saW5lTnVtYmVyIC0gMSk7XG4gICAgICAgICAgICB0aGlzLm9sZHRpcCA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFsbENsb3NlZCA9IHRydWU7XG4gICAgfVxufTtcblxuLy8gJ2ZpbmFsaXplJyBpcyBydW4gd2hlbiB0aGUgYmxvY2sgaXMgY2xvc2VkLlxuLy8gJ2NvbnRpbnVlJyBpcyBydW4gdG8gY2hlY2sgd2hldGhlciB0aGUgYmxvY2sgaXMgY29udGludWluZ1xuLy8gYXQgYSBjZXJ0YWluIGxpbmUgYW5kIG9mZnNldCAoZS5nLiB3aGV0aGVyIGEgYmxvY2sgcXVvdGVcbi8vIGNvbnRhaW5zIGEgYD5gLiAgSXQgcmV0dXJucyAwIGZvciBtYXRjaGVkLCAxIGZvciBub3QgbWF0Y2hlZCxcbi8vIGFuZCAyIGZvciBcIndlJ3ZlIGRlYWx0IHdpdGggdGhpcyBsaW5lIGNvbXBsZXRlbHksIGdvIHRvIG5leHQuXCJcbnZhciBibG9ja3MgPSB7XG4gICAgZG9jdW1lbnQ6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKCkgeyByZXR1cm47IH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKHQpIHsgcmV0dXJuICh0ICE9PSAnaXRlbScpOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IGZhbHNlXG4gICAgfSxcbiAgICBsaXN0OiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbihwYXJzZXIsIGJsb2NrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGJsb2NrLl9maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3Igbm9uLWZpbmFsIGxpc3QgaXRlbSBlbmRpbmcgd2l0aCBibGFuayBsaW5lOlxuICAgICAgICAgICAgICAgIGlmIChlbmRzV2l0aEJsYW5rTGluZShpdGVtKSAmJiBpdGVtLl9uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLl9saXN0RGF0YS50aWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVjdXJzZSBpbnRvIGNoaWxkcmVuIG9mIGxpc3QgaXRlbSwgdG8gc2VlIGlmIHRoZXJlIGFyZVxuICAgICAgICAgICAgICAgIC8vIHNwYWNlcyBiZXR3ZWVuIGFueSBvZiB0aGVtOlxuICAgICAgICAgICAgICAgIHZhciBzdWJpdGVtID0gaXRlbS5fZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc3ViaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kc1dpdGhCbGFua0xpbmUoc3ViaXRlbSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtLl9uZXh0IHx8IHN1Yml0ZW0uX25leHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jay5fbGlzdERhdGEudGlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1Yml0ZW0gPSBzdWJpdGVtLl9uZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5fbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24odCkgeyByZXR1cm4gKHQgPT09ICdpdGVtJyk7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIGJsb2NrX3F1b3RlOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgICAgIHZhciBsbiA9IHBhcnNlci5jdXJyZW50TGluZTtcbiAgICAgICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICAgICAgcGVlayhsbiwgcGFyc2VyLm5leHROb25zcGFjZSkgPT09IENfR1JFQVRFUlRIQU4pIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNTcGFjZU9yVGFiKHBlZWsobG4sIHBhcnNlci5vZmZzZXQpKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbigpIHsgcmV0dXJuOyB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbih0KSB7IHJldHVybiAodCAhPT0gJ2l0ZW0nKTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgaXRlbToge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgICAgIGlmIChwYXJzZXIuYmxhbmspIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLl9maXJzdENoaWxkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQmxhbmsgbGluZSBhZnRlciBlbXB0eSBsaXN0IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlci5pbmRlbnQgPj1cbiAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLl9saXN0RGF0YS5tYXJrZXJPZmZzZXQgK1xuICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuX2xpc3REYXRhLnBhZGRpbmcpIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChjb250YWluZXIuX2xpc3REYXRhLm1hcmtlck9mZnNldCArXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5fbGlzdERhdGEucGFkZGluZywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbigpIHsgcmV0dXJuOyB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbih0KSB7IHJldHVybiAodCAhPT0gJ2l0ZW0nKTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgaGVhZGluZzoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBhIGhlYWRpbmcgY2FuIG5ldmVyIGNvbnRhaW5lciA+IDEgbGluZSwgc28gZmFpbCB0byBtYXRjaDpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgdGhlbWF0aWNfYnJlYWs6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYSB0aGVtYXRpYyBicmVhayBjYW4gbmV2ZXIgY29udGFpbmVyID4gMSBsaW5lLCBzbyBmYWlsIHRvIG1hdGNoOlxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbigpIHsgcmV0dXJuOyB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IGZhbHNlXG4gICAgfSxcbiAgICBjb2RlX2Jsb2NrOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIGxuID0gcGFyc2VyLmN1cnJlbnRMaW5lO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IHBhcnNlci5pbmRlbnQ7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLl9pc0ZlbmNlZCkgeyAvLyBmZW5jZWRcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSAoaW5kZW50IDw9IDMgJiZcbiAgICAgICAgICAgICAgICAgICAgbG4uY2hhckF0KHBhcnNlci5uZXh0Tm9uc3BhY2UpID09PSBjb250YWluZXIuX2ZlbmNlQ2hhciAmJlxuICAgICAgICAgICAgICAgICAgICBsbi5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKS5tYXRjaChyZUNsb3NpbmdDb2RlRmVuY2UpKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMF0ubGVuZ3RoID49IGNvbnRhaW5lci5fZmVuY2VMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2luZyBmZW5jZSAtIHdlJ3JlIGF0IGVuZCBvZiBsaW5lLCBzbyB3ZSBjYW4gcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5maW5hbGl6ZShjb250YWluZXIsIHBhcnNlci5saW5lTnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2tpcCBvcHRpb25hbCBzcGFjZXMgb2YgZmVuY2Ugb2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gY29udGFpbmVyLl9mZW5jZU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGkgPiAwICYmIGlzU3BhY2VPclRhYihwZWVrKGxuLCBwYXJzZXIub2Zmc2V0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gaW5kZW50ZWRcbiAgICAgICAgICAgICAgICBpZiAoaW5kZW50ID49IENPREVfSU5ERU5UKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KENPREVfSU5ERU5ULCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlci5ibGFuaykge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24ocGFyc2VyLCBibG9jaykge1xuICAgICAgICAgICAgaWYgKGJsb2NrLl9pc0ZlbmNlZCkgeyAvLyBmZW5jZWRcbiAgICAgICAgICAgICAgICAvLyBmaXJzdCBsaW5lIGJlY29tZXMgaW5mbyBzdHJpbmdcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGJsb2NrLl9zdHJpbmdfY29udGVudDtcbiAgICAgICAgICAgICAgICB2YXIgbmV3bGluZVBvcyA9IGNvbnRlbnQuaW5kZXhPZignXFxuJyk7XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0TGluZSA9IGNvbnRlbnQuc2xpY2UoMCwgbmV3bGluZVBvcyk7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3QgPSBjb250ZW50LnNsaWNlKG5ld2xpbmVQb3MgKyAxKTtcbiAgICAgICAgICAgICAgICBibG9jay5pbmZvID0gdW5lc2NhcGVTdHJpbmcoZmlyc3RMaW5lLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgYmxvY2suX2xpdGVyYWwgPSByZXN0O1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gaW5kZW50ZWRcbiAgICAgICAgICAgICAgICBibG9jay5fbGl0ZXJhbCA9IGJsb2NrLl9zdHJpbmdfY29udGVudC5yZXBsYWNlKC8oXFxuICopKyQvLCAnXFxuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBibG9jay5fc3RyaW5nX2NvbnRlbnQgPSBudWxsOyAvLyBhbGxvdyBHQ1xuICAgICAgICB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IHRydWVcbiAgICB9LFxuICAgIGh0bWxfYmxvY2s6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKChwYXJzZXIuYmxhbmsgJiZcbiAgICAgICAgICAgICAgICAgICAgIChjb250YWluZXIuX2h0bWxCbG9ja1R5cGUgPT09IDYgfHxcbiAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuX2h0bWxCbG9ja1R5cGUgPT09IDcpKSA/IDEgOiAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKHBhcnNlciwgYmxvY2spIHtcbiAgICAgICAgICAgIGJsb2NrLl9saXRlcmFsID0gYmxvY2suX3N0cmluZ19jb250ZW50LnJlcGxhY2UoLyhcXG4gKikrJC8sICcnKTtcbiAgICAgICAgICAgIGJsb2NrLl9zdHJpbmdfY29udGVudCA9IG51bGw7IC8vIGFsbG93IEdDXG4gICAgICAgIH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogdHJ1ZVxuICAgIH0sXG4gICAgcGFyYWdyYXBoOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAocGFyc2VyLmJsYW5rID8gMSA6IDApO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24ocGFyc2VyLCBibG9jaykge1xuICAgICAgICAgICAgdmFyIHBvcztcbiAgICAgICAgICAgIHZhciBoYXNSZWZlcmVuY2VEZWZzID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHRyeSBwYXJzaW5nIHRoZSBiZWdpbm5pbmcgYXMgbGluayByZWZlcmVuY2UgZGVmaW5pdGlvbnM6XG4gICAgICAgICAgICB3aGlsZSAocGVlayhibG9jay5fc3RyaW5nX2NvbnRlbnQsIDApID09PSBDX09QRU5fQlJBQ0tFVCAmJlxuICAgICAgICAgICAgICAgICAgIChwb3MgPVxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuaW5saW5lUGFyc2VyLnBhcnNlUmVmZXJlbmNlKGJsb2NrLl9zdHJpbmdfY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmbWFwKSkpIHtcbiAgICAgICAgICAgICAgICBibG9jay5fc3RyaW5nX2NvbnRlbnQgPSBibG9jay5fc3RyaW5nX2NvbnRlbnQuc2xpY2UocG9zKTtcbiAgICAgICAgICAgICAgICBoYXNSZWZlcmVuY2VEZWZzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNSZWZlcmVuY2VEZWZzICYmIGlzQmxhbmsoYmxvY2suX3N0cmluZ19jb250ZW50KSkge1xuICAgICAgICAgICAgICAgIGJsb2NrLnVubGluaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IHRydWVcbiAgICB9XG59O1xuXG4vLyBibG9jayBzdGFydCBmdW5jdGlvbnMuICBSZXR1cm4gdmFsdWVzOlxuLy8gMCA9IG5vIG1hdGNoXG4vLyAxID0gbWF0Y2hlZCBjb250YWluZXIsIGtlZXAgZ29pbmdcbi8vIDIgPSBtYXRjaGVkIGxlYWYsIG5vIG1vcmUgYmxvY2sgc3RhcnRzXG52YXIgYmxvY2tTdGFydHMgPSBbXG4gICAgLy8gYmxvY2sgcXVvdGVcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIubmV4dE5vbnNwYWNlKSA9PT0gQ19HUkVBVEVSVEhBTikge1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIGZhbHNlKTtcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsIGZvbGxvd2luZyBzcGFjZVxuICAgICAgICAgICAgaWYgKGlzU3BhY2VPclRhYihwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm9mZnNldCkpKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgIHBhcnNlci5hZGRDaGlsZCgnYmxvY2tfcXVvdGUnLCBwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQVRYIGhlYWRpbmdcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgKG1hdGNoID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpLm1hdGNoKHJlQVRYSGVhZGluZ01hcmtlcikpKSB7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQobWF0Y2hbMF0ubGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBwYXJzZXIuYWRkQ2hpbGQoJ2hlYWRpbmcnLCBwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5sZXZlbCA9IG1hdGNoWzBdLnRyaW0oKS5sZW5ndGg7IC8vIG51bWJlciBvZiAjc1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYWlsaW5nICMjI3M6XG4gICAgICAgICAgICBjb250YWluZXIuX3N0cmluZ19jb250ZW50ID1cbiAgICAgICAgICAgICAgICBwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm9mZnNldCkucmVwbGFjZSgvXlsgXFx0XSojK1sgXFx0XSokLywgJycpLnJlcGxhY2UoL1sgXFx0XSsjK1sgXFx0XSokLywgJycpO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQocGFyc2VyLmN1cnJlbnRMaW5lLmxlbmd0aCAtIHBhcnNlci5vZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBGZW5jZWQgY29kZSBibG9ja1xuICAgIGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICAobWF0Y2ggPSBwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSkubWF0Y2gocmVDb2RlRmVuY2UpKSkge1xuICAgICAgICAgICAgdmFyIGZlbmNlTGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcGFyc2VyLmFkZENoaWxkKCdjb2RlX2Jsb2NrJywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICBjb250YWluZXIuX2lzRmVuY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5fZmVuY2VMZW5ndGggPSBmZW5jZUxlbmd0aDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5fZmVuY2VDaGFyID0gbWF0Y2hbMF1bMF07XG4gICAgICAgICAgICBjb250YWluZXIuX2ZlbmNlT2Zmc2V0ID0gcGFyc2VyLmluZGVudDtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChmZW5jZUxlbmd0aCwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBIVE1MIGJsb2NrXG4gICAgZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIubmV4dE5vbnNwYWNlKSA9PT0gQ19MRVNTVEhBTikge1xuICAgICAgICAgICAgdmFyIHMgPSBwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICB2YXIgYmxvY2tUeXBlO1xuXG4gICAgICAgICAgICBmb3IgKGJsb2NrVHlwZSA9IDE7IGJsb2NrVHlwZSA8PSA3OyBibG9ja1R5cGUrKykge1xuICAgICAgICAgICAgICAgIGlmIChyZUh0bWxCbG9ja09wZW5bYmxvY2tUeXBlXS50ZXN0KHMpICYmXG4gICAgICAgICAgICAgICAgICAgIChibG9ja1R5cGUgPCA3IHx8XG4gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudHlwZSAhPT0gJ3BhcmFncmFwaCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBhZGp1c3QgcGFyc2VyLm9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3BhY2VzIGFyZSBwYXJ0IG9mIHRoZSBIVE1MIGJsb2NrOlxuICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IHBhcnNlci5hZGRDaGlsZCgnaHRtbF9ibG9jaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICBiLl9odG1sQmxvY2tUeXBlID0gYmxvY2tUeXBlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMDtcblxuICAgIH0sXG5cbiAgICAvLyBTZXRleHQgaGVhZGluZ1xuICAgIGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIGNvbnRhaW5lci50eXBlID09PSAncGFyYWdyYXBoJyAmJlxuICAgICAgICAgICAgICAgICAgICgobWF0Y2ggPSBwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSkubWF0Y2gocmVTZXRleHRIZWFkaW5nTGluZSkpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICB2YXIgaGVhZGluZyA9IG5ldyBOb2RlKCdoZWFkaW5nJywgY29udGFpbmVyLnNvdXJjZXBvcyk7XG4gICAgICAgICAgICBoZWFkaW5nLmxldmVsID0gbWF0Y2hbMF1bMF0gPT09ICc9JyA/IDEgOiAyO1xuICAgICAgICAgICAgaGVhZGluZy5fc3RyaW5nX2NvbnRlbnQgPSBjb250YWluZXIuX3N0cmluZ19jb250ZW50O1xuICAgICAgICAgICAgY29udGFpbmVyLmluc2VydEFmdGVyKGhlYWRpbmcpO1xuICAgICAgICAgICAgY29udGFpbmVyLnVubGluaygpO1xuICAgICAgICAgICAgcGFyc2VyLnRpcCA9IGhlYWRpbmc7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChwYXJzZXIuY3VycmVudExpbmUubGVuZ3RoIC0gcGFyc2VyLm9mZnNldCwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB0aGVtYXRpYyBicmVha1xuICAgIGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgcmVUaGVtYXRpY0JyZWFrLnRlc3QocGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWRkQ2hpbGQoJ3RoZW1hdGljX2JyZWFrJywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChwYXJzZXIuY3VycmVudExpbmUubGVuZ3RoIC0gcGFyc2VyLm9mZnNldCwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBsaXN0IGl0ZW1cbiAgICBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgZGF0YTtcblxuICAgICAgICBpZiAoKCFwYXJzZXIuaW5kZW50ZWQgfHwgY29udGFpbmVyLnR5cGUgPT09ICdsaXN0JylcbiAgICAgICAgICAgICAgICAmJiAoZGF0YSA9IHBhcnNlTGlzdE1hcmtlcihwYXJzZXIsIGNvbnRhaW5lcikpKSB7XG4gICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBsaXN0IGlmIG5lZWRlZFxuICAgICAgICAgICAgaWYgKHBhcnNlci50aXAudHlwZSAhPT0gJ2xpc3QnIHx8XG4gICAgICAgICAgICAgICAgIShsaXN0c01hdGNoKGNvbnRhaW5lci5fbGlzdERhdGEsIGRhdGEpKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHBhcnNlci5hZGRDaGlsZCgnbGlzdCcsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5fbGlzdERhdGEgPSBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGxpc3QgaXRlbVxuICAgICAgICAgICAgY29udGFpbmVyID0gcGFyc2VyLmFkZENoaWxkKCdpdGVtJywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICBjb250YWluZXIuX2xpc3REYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gaW5kZW50ZWQgY29kZSBibG9ja1xuICAgIGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgICBpZiAocGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICBwYXJzZXIudGlwLnR5cGUgIT09ICdwYXJhZ3JhcGgnICYmXG4gICAgICAgICAgICAhcGFyc2VyLmJsYW5rKSB7XG4gICAgICAgICAgICAvLyBpbmRlbnRlZCBjb2RlXG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChDT0RFX0lOREVOVCwgdHJ1ZSk7XG4gICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgIHBhcnNlci5hZGRDaGlsZCgnY29kZV9ibG9jaycsIHBhcnNlci5vZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICB9XG5cbl07XG5cbnZhciBhZHZhbmNlT2Zmc2V0ID0gZnVuY3Rpb24oY291bnQsIGNvbHVtbnMpIHtcbiAgICB2YXIgY3VycmVudExpbmUgPSB0aGlzLmN1cnJlbnRMaW5lO1xuICAgIHZhciBjaGFyc1RvVGFiLCBjaGFyc1RvQWR2YW5jZTtcbiAgICB2YXIgYztcbiAgICB3aGlsZSAoY291bnQgPiAwICYmIChjID0gY3VycmVudExpbmVbdGhpcy5vZmZzZXRdKSkge1xuICAgICAgICBpZiAoYyA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIGNoYXJzVG9UYWIgPSA0IC0gKHRoaXMuY29sdW1uICUgNCk7XG4gICAgICAgICAgICBpZiAoY29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPSBjaGFyc1RvVGFiID4gY291bnQ7XG4gICAgICAgICAgICAgICAgY2hhcnNUb0FkdmFuY2UgPSBjaGFyc1RvVGFiID4gY291bnQgPyBjb3VudCA6IGNoYXJzVG9UYWI7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW4gKz0gY2hhcnNUb0FkdmFuY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgKz0gdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA/IDAgOiAxO1xuICAgICAgICAgICAgICAgIGNvdW50IC09IGNoYXJzVG9BZHZhbmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW4gKz0gY2hhcnNUb1RhYjtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgICAgICAgICAgIGNvdW50IC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW4gKz0gMTsgLy8gYXNzdW1lIGFzY2lpOyBibG9jayBzdGFydHMgYXJlIGFzY2lpXG4gICAgICAgICAgICBjb3VudCAtPSAxO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFkdmFuY2VOZXh0Tm9uc3BhY2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm9mZnNldCA9IHRoaXMubmV4dE5vbnNwYWNlO1xuICAgIHRoaXMuY29sdW1uID0gdGhpcy5uZXh0Tm9uc3BhY2VDb2x1bW47XG4gICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGZhbHNlO1xufTtcblxudmFyIGZpbmROZXh0Tm9uc3BhY2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudExpbmUgPSB0aGlzLmN1cnJlbnRMaW5lO1xuICAgIHZhciBpID0gdGhpcy5vZmZzZXQ7XG4gICAgdmFyIGNvbHMgPSB0aGlzLmNvbHVtbjtcbiAgICB2YXIgYztcblxuICAgIHdoaWxlICgoYyA9IGN1cnJlbnRMaW5lLmNoYXJBdChpKSkgIT09ICcnKSB7XG4gICAgICAgIGlmIChjID09PSAnICcpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbHMrKztcbiAgICAgICAgfSBlbHNlIGlmIChjID09PSAnXFx0Jykge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgY29scyArPSAoNCAtIChjb2xzICUgNCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ibGFuayA9IChjID09PSAnXFxuJyB8fCBjID09PSAnXFxyJyB8fCBjID09PSAnJyk7XG4gICAgdGhpcy5uZXh0Tm9uc3BhY2UgPSBpO1xuICAgIHRoaXMubmV4dE5vbnNwYWNlQ29sdW1uID0gY29scztcbiAgICB0aGlzLmluZGVudCA9IHRoaXMubmV4dE5vbnNwYWNlQ29sdW1uIC0gdGhpcy5jb2x1bW47XG4gICAgdGhpcy5pbmRlbnRlZCA9IHRoaXMuaW5kZW50ID49IENPREVfSU5ERU5UO1xufTtcblxuLy8gQW5hbHl6ZSBhIGxpbmUgb2YgdGV4dCBhbmQgdXBkYXRlIHRoZSBkb2N1bWVudCBhcHByb3ByaWF0ZWx5LlxuLy8gV2UgcGFyc2UgbWFya2Rvd24gdGV4dCBieSBjYWxsaW5nIHRoaXMgb24gZWFjaCBsaW5lIG9mIGlucHV0LFxuLy8gdGhlbiBmaW5hbGl6aW5nIHRoZSBkb2N1bWVudC5cbnZhciBpbmNvcnBvcmF0ZUxpbmUgPSBmdW5jdGlvbihsbikge1xuICAgIHZhciBhbGxfbWF0Y2hlZCA9IHRydWU7XG4gICAgdmFyIHQ7XG5cbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5kb2M7XG4gICAgdGhpcy5vbGR0aXAgPSB0aGlzLnRpcDtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgdGhpcy5jb2x1bW4gPSAwO1xuICAgIHRoaXMuYmxhbmsgPSBmYWxzZTtcbiAgICB0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiID0gZmFsc2U7XG4gICAgdGhpcy5saW5lTnVtYmVyICs9IDE7XG5cbiAgICAvLyByZXBsYWNlIE5VTCBjaGFyYWN0ZXJzIGZvciBzZWN1cml0eVxuICAgIGlmIChsbi5pbmRleE9mKCdcXHUwMDAwJykgIT09IC0xKSB7XG4gICAgICAgIGxuID0gbG4ucmVwbGFjZSgvXFwwL2csICdcXHVGRkZEJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50TGluZSA9IGxuO1xuXG4gICAgLy8gRm9yIGVhY2ggY29udGFpbmluZyBibG9jaywgdHJ5IHRvIHBhcnNlIHRoZSBhc3NvY2lhdGVkIGxpbmUgc3RhcnQuXG4gICAgLy8gQmFpbCBvdXQgb24gZmFpbHVyZTogY29udGFpbmVyIHdpbGwgcG9pbnQgdG8gdGhlIGxhc3QgbWF0Y2hpbmcgYmxvY2suXG4gICAgLy8gU2V0IGFsbF9tYXRjaGVkIHRvIGZhbHNlIGlmIG5vdCBhbGwgY29udGFpbmVycyBtYXRjaC5cbiAgICB2YXIgbGFzdENoaWxkO1xuICAgIHdoaWxlICgobGFzdENoaWxkID0gY29udGFpbmVyLl9sYXN0Q2hpbGQpICYmIGxhc3RDaGlsZC5fb3Blbikge1xuICAgICAgICBjb250YWluZXIgPSBsYXN0Q2hpbGQ7XG5cbiAgICAgICAgdGhpcy5maW5kTmV4dE5vbnNwYWNlKCk7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmJsb2Nrc1tjb250YWluZXIudHlwZV0uY29udGludWUodGhpcywgY29udGFpbmVyKSkge1xuICAgICAgICBjYXNlIDA6IC8vIHdlJ3ZlIG1hdGNoZWQsIGtlZXAgZ29pbmdcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6IC8vIHdlJ3ZlIGZhaWxlZCB0byBtYXRjaCBhIGJsb2NrXG4gICAgICAgICAgICBhbGxfbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogLy8gd2UndmUgaGl0IGVuZCBvZiBsaW5lIGZvciBmZW5jZWQgY29kZSBjbG9zZSBhbmQgY2FuIHJldHVyblxuICAgICAgICAgICAgdGhpcy5sYXN0TGluZUxlbmd0aCA9IGxuLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93ICdjb250aW51ZSByZXR1cm5lZCBpbGxlZ2FsIHZhbHVlLCBtdXN0IGJlIDAsIDEsIG9yIDInO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYWxsX21hdGNoZWQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5fcGFyZW50OyAvLyBiYWNrIHVwIHRvIGxhc3QgbWF0Y2hpbmcgYmxvY2tcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hbGxDbG9zZWQgPSAoY29udGFpbmVyID09PSB0aGlzLm9sZHRpcCk7XG4gICAgdGhpcy5sYXN0TWF0Y2hlZENvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgIHZhciBtYXRjaGVkTGVhZiA9IGNvbnRhaW5lci50eXBlICE9PSAncGFyYWdyYXBoJyAmJlxuICAgICAgICAgICAgYmxvY2tzW2NvbnRhaW5lci50eXBlXS5hY2NlcHRzTGluZXM7XG4gICAgdmFyIHN0YXJ0cyA9IHRoaXMuYmxvY2tTdGFydHM7XG4gICAgdmFyIHN0YXJ0c0xlbiA9IHN0YXJ0cy5sZW5ndGg7XG4gICAgLy8gVW5sZXNzIGxhc3QgbWF0Y2hlZCBjb250YWluZXIgaXMgYSBjb2RlIGJsb2NrLCB0cnkgbmV3IGNvbnRhaW5lciBzdGFydHMsXG4gICAgLy8gYWRkaW5nIGNoaWxkcmVuIHRvIHRoZSBsYXN0IG1hdGNoZWQgY29udGFpbmVyOlxuICAgIHdoaWxlICghbWF0Y2hlZExlYWYpIHtcblxuICAgICAgICB0aGlzLmZpbmROZXh0Tm9uc3BhY2UoKTtcblxuICAgICAgICAvLyB0aGlzIGlzIGEgbGl0dGxlIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbjpcbiAgICAgICAgaWYgKCF0aGlzLmluZGVudGVkICYmXG4gICAgICAgICAgICAhcmVNYXliZVNwZWNpYWwudGVzdChsbi5zbGljZSh0aGlzLm5leHROb25zcGFjZSkpKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHN0YXJ0c0xlbikge1xuICAgICAgICAgICAgdmFyIHJlcyA9IHN0YXJ0c1tpXSh0aGlzLCBjb250YWluZXIpO1xuICAgICAgICAgICAgaWYgKHJlcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMudGlwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLnRpcDtcbiAgICAgICAgICAgICAgICBtYXRjaGVkTGVhZiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpID09PSBzdGFydHNMZW4pIHsgLy8gbm90aGluZyBtYXRjaGVkXG4gICAgICAgICAgICB0aGlzLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gV2hhdCByZW1haW5zIGF0IHRoZSBvZmZzZXQgaXMgYSB0ZXh0IGxpbmUuICBBZGQgdGhlIHRleHQgdG8gdGhlXG4gICAgLy8gYXBwcm9wcmlhdGUgY29udGFpbmVyLlxuXG4gICAvLyBGaXJzdCBjaGVjayBmb3IgYSBsYXp5IHBhcmFncmFwaCBjb250aW51YXRpb246XG4gICAgaWYgKCF0aGlzLmFsbENsb3NlZCAmJiAhdGhpcy5ibGFuayAmJlxuICAgICAgICB0aGlzLnRpcC50eXBlID09PSAncGFyYWdyYXBoJykge1xuICAgICAgICAvLyBsYXp5IHBhcmFncmFwaCBjb250aW51YXRpb25cbiAgICAgICAgdGhpcy5hZGRMaW5lKCk7XG5cbiAgICB9IGVsc2UgeyAvLyBub3QgYSBsYXp5IGNvbnRpbnVhdGlvblxuXG4gICAgICAgIC8vIGZpbmFsaXplIGFueSBibG9ja3Mgbm90IG1hdGNoZWRcbiAgICAgICAgdGhpcy5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICBpZiAodGhpcy5ibGFuayAmJiBjb250YWluZXIubGFzdENoaWxkKSB7XG4gICAgICAgICAgICBjb250YWluZXIubGFzdENoaWxkLl9sYXN0TGluZUJsYW5rID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHQgPSBjb250YWluZXIudHlwZTtcblxuICAgICAgICAvLyBCbG9jayBxdW90ZSBsaW5lcyBhcmUgbmV2ZXIgYmxhbmsgYXMgdGhleSBzdGFydCB3aXRoID5cbiAgICAgICAgLy8gYW5kIHdlIGRvbid0IGNvdW50IGJsYW5rcyBpbiBmZW5jZWQgY29kZSBmb3IgcHVycG9zZXMgb2YgdGlnaHQvbG9vc2VcbiAgICAgICAgLy8gbGlzdHMgb3IgYnJlYWtpbmcgb3V0IG9mIGxpc3RzLiAgV2UgYWxzbyBkb24ndCBzZXQgX2xhc3RMaW5lQmxhbmtcbiAgICAgICAgLy8gb24gYW4gZW1wdHkgbGlzdCBpdGVtLCBvciBpZiB3ZSBqdXN0IGNsb3NlZCBhIGZlbmNlZCBibG9jay5cbiAgICAgICAgdmFyIGxhc3RMaW5lQmxhbmsgPSB0aGlzLmJsYW5rICYmXG4gICAgICAgICAgICAhKHQgPT09ICdibG9ja19xdW90ZScgfHxcbiAgICAgICAgICAgICAgKHQgPT09ICdjb2RlX2Jsb2NrJyAmJiBjb250YWluZXIuX2lzRmVuY2VkKSB8fFxuICAgICAgICAgICAgICAodCA9PT0gJ2l0ZW0nICYmXG4gICAgICAgICAgICAgICAhY29udGFpbmVyLl9maXJzdENoaWxkICYmXG4gICAgICAgICAgICAgICBjb250YWluZXIuc291cmNlcG9zWzBdWzBdID09PSB0aGlzLmxpbmVOdW1iZXIpKTtcblxuICAgICAgICAvLyBwcm9wYWdhdGUgbGFzdExpbmVCbGFuayB1cCB0aHJvdWdoIHBhcmVudHM6XG4gICAgICAgIHZhciBjb250ID0gY29udGFpbmVyO1xuICAgICAgICB3aGlsZSAoY29udCkge1xuICAgICAgICAgICAgY29udC5fbGFzdExpbmVCbGFuayA9IGxhc3RMaW5lQmxhbms7XG4gICAgICAgICAgICBjb250ID0gY29udC5fcGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmxvY2tzW3RdLmFjY2VwdHNMaW5lcykge1xuICAgICAgICAgICAgdGhpcy5hZGRMaW5lKCk7XG4gICAgICAgICAgICAvLyBpZiBIdG1sQmxvY2ssIGNoZWNrIGZvciBlbmQgY29uZGl0aW9uXG4gICAgICAgICAgICBpZiAodCA9PT0gJ2h0bWxfYmxvY2snICYmXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLl9odG1sQmxvY2tUeXBlID49IDEgJiZcbiAgICAgICAgICAgICAgICBjb250YWluZXIuX2h0bWxCbG9ja1R5cGUgPD0gNSAmJlxuICAgICAgICAgICAgICAgIHJlSHRtbEJsb2NrQ2xvc2VbY29udGFpbmVyLl9odG1sQmxvY2tUeXBlXS50ZXN0KHRoaXMuY3VycmVudExpbmUuc2xpY2UodGhpcy5vZmZzZXQpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluYWxpemUoY29udGFpbmVyLCB0aGlzLmxpbmVOdW1iZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vZmZzZXQgPCBsbi5sZW5ndGggJiYgIXRoaXMuYmxhbmspIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBwYXJhZ3JhcGggY29udGFpbmVyIGZvciBsaW5lXG4gICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLmFkZENoaWxkKCdwYXJhZ3JhcGgnLCB0aGlzLm9mZnNldCk7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkTGluZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMubGFzdExpbmVMZW5ndGggPSBsbi5sZW5ndGg7XG59O1xuXG4vLyBGaW5hbGl6ZSBhIGJsb2NrLiAgQ2xvc2UgaXQgYW5kIGRvIGFueSBuZWNlc3NhcnkgcG9zdHByb2Nlc3NpbmcsXG4vLyBlLmcuIGNyZWF0aW5nIHN0cmluZ19jb250ZW50IGZyb20gc3RyaW5ncywgc2V0dGluZyB0aGUgJ3RpZ2h0J1xuLy8gb3IgJ2xvb3NlJyBzdGF0dXMgb2YgYSBsaXN0LCBhbmQgcGFyc2luZyB0aGUgYmVnaW5uaW5nc1xuLy8gb2YgcGFyYWdyYXBocyBmb3IgcmVmZXJlbmNlIGRlZmluaXRpb25zLiAgUmVzZXQgdGhlIHRpcCB0byB0aGVcbi8vIHBhcmVudCBvZiB0aGUgY2xvc2VkIGJsb2NrLlxudmFyIGZpbmFsaXplID0gZnVuY3Rpb24oYmxvY2ssIGxpbmVOdW1iZXIpIHtcbiAgICB2YXIgYWJvdmUgPSBibG9jay5fcGFyZW50O1xuICAgIGJsb2NrLl9vcGVuID0gZmFsc2U7XG4gICAgYmxvY2suc291cmNlcG9zWzFdID0gW2xpbmVOdW1iZXIsIHRoaXMubGFzdExpbmVMZW5ndGhdO1xuXG4gICAgdGhpcy5ibG9ja3NbYmxvY2sudHlwZV0uZmluYWxpemUodGhpcywgYmxvY2spO1xuXG4gICAgdGhpcy50aXAgPSBhYm92ZTtcbn07XG5cbi8vIFdhbGsgdGhyb3VnaCBhIGJsb2NrICYgY2hpbGRyZW4gcmVjdXJzaXZlbHksIHBhcnNpbmcgc3RyaW5nIGNvbnRlbnRcbi8vIGludG8gaW5saW5lIGNvbnRlbnQgd2hlcmUgYXBwcm9wcmlhdGUuXG52YXIgcHJvY2Vzc0lubGluZXMgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBub2RlLCBldmVudCwgdDtcbiAgICB2YXIgd2Fsa2VyID0gYmxvY2sud2Fsa2VyKCk7XG4gICAgdGhpcy5pbmxpbmVQYXJzZXIucmVmbWFwID0gdGhpcy5yZWZtYXA7XG4gICAgdGhpcy5pbmxpbmVQYXJzZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB3aGlsZSAoKGV2ZW50ID0gd2Fsa2VyLm5leHQoKSkpIHtcbiAgICAgICAgbm9kZSA9IGV2ZW50Lm5vZGU7XG4gICAgICAgIHQgPSBub2RlLnR5cGU7XG4gICAgICAgIGlmICghZXZlbnQuZW50ZXJpbmcgJiYgKHQgPT09ICdwYXJhZ3JhcGgnIHx8IHQgPT09ICdoZWFkaW5nJykpIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lUGFyc2VyLnBhcnNlKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIERvY3VtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRvYyA9IG5ldyBOb2RlKCdkb2N1bWVudCcsIFtbMSwgMV0sIFswLCAwXV0pO1xuICAgIHJldHVybiBkb2M7XG59O1xuXG4vLyBUaGUgbWFpbiBwYXJzaW5nIGZ1bmN0aW9uLiAgUmV0dXJucyBhIHBhcnNlZCBkb2N1bWVudCBBU1QuXG52YXIgcGFyc2UgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgIHRoaXMuZG9jID0gbmV3IERvY3VtZW50KCk7XG4gICAgdGhpcy50aXAgPSB0aGlzLmRvYztcbiAgICB0aGlzLnJlZm1hcCA9IHt9O1xuICAgIHRoaXMubGluZU51bWJlciA9IDA7XG4gICAgdGhpcy5sYXN0TGluZUxlbmd0aCA9IDA7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMuY29sdW1uID0gMDtcbiAgICB0aGlzLmxhc3RNYXRjaGVkQ29udGFpbmVyID0gdGhpcy5kb2M7XG4gICAgdGhpcy5jdXJyZW50TGluZSA9IFwiXCI7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZShcInByZXBhcmluZyBpbnB1dFwiKTsgfVxuICAgIHZhciBsaW5lcyA9IGlucHV0LnNwbGl0KHJlTGluZUVuZGluZyk7XG4gICAgdmFyIGxlbiA9IGxpbmVzLmxlbmd0aDtcbiAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChpbnB1dC5sZW5ndGggLSAxKSA9PT0gQ19ORVdMSU5FKSB7XG4gICAgICAgIC8vIGlnbm9yZSBsYXN0IGJsYW5rIGxpbmUgY3JlYXRlZCBieSBmaW5hbCBuZXdsaW5lXG4gICAgICAgIGxlbiAtPSAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lRW5kKFwicHJlcGFyaW5nIGlucHV0XCIpOyB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZShcImJsb2NrIHBhcnNpbmdcIik7IH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRoaXMuaW5jb3Jwb3JhdGVMaW5lKGxpbmVzW2ldKTtcbiAgICB9XG4gICAgd2hpbGUgKHRoaXMudGlwKSB7XG4gICAgICAgIHRoaXMuZmluYWxpemUodGhpcy50aXAsIGxlbik7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWVFbmQoXCJibG9jayBwYXJzaW5nXCIpOyB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZShcImlubGluZSBwYXJzaW5nXCIpOyB9XG4gICAgdGhpcy5wcm9jZXNzSW5saW5lcyh0aGlzLmRvYyk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZUVuZChcImlubGluZSBwYXJzaW5nXCIpOyB9XG4gICAgcmV0dXJuIHRoaXMuZG9jO1xufTtcblxuXG4vLyBUaGUgUGFyc2VyIG9iamVjdC5cbmZ1bmN0aW9uIFBhcnNlcihvcHRpb25zKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBkb2M6IG5ldyBEb2N1bWVudCgpLFxuICAgICAgICBibG9ja3M6IGJsb2NrcyxcbiAgICAgICAgYmxvY2tTdGFydHM6IGJsb2NrU3RhcnRzLFxuICAgICAgICB0aXA6IHRoaXMuZG9jLFxuICAgICAgICBvbGR0aXA6IHRoaXMuZG9jLFxuICAgICAgICBjdXJyZW50TGluZTogXCJcIixcbiAgICAgICAgbGluZU51bWJlcjogMCxcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBjb2x1bW46IDAsXG4gICAgICAgIG5leHROb25zcGFjZTogMCxcbiAgICAgICAgbmV4dE5vbnNwYWNlQ29sdW1uOiAwLFxuICAgICAgICBpbmRlbnQ6IDAsXG4gICAgICAgIGluZGVudGVkOiBmYWxzZSxcbiAgICAgICAgYmxhbms6IGZhbHNlLFxuICAgICAgICBwYXJ0aWFsbHlDb25zdW1lZFRhYjogZmFsc2UsXG4gICAgICAgIGFsbENsb3NlZDogdHJ1ZSxcbiAgICAgICAgbGFzdE1hdGNoZWRDb250YWluZXI6IHRoaXMuZG9jLFxuICAgICAgICByZWZtYXA6IHt9LFxuICAgICAgICBsYXN0TGluZUxlbmd0aDogMCxcbiAgICAgICAgaW5saW5lUGFyc2VyOiBuZXcgSW5saW5lUGFyc2VyKG9wdGlvbnMpLFxuICAgICAgICBmaW5kTmV4dE5vbnNwYWNlOiBmaW5kTmV4dE5vbnNwYWNlLFxuICAgICAgICBhZHZhbmNlT2Zmc2V0OiBhZHZhbmNlT2Zmc2V0LFxuICAgICAgICBhZHZhbmNlTmV4dE5vbnNwYWNlOiBhZHZhbmNlTmV4dE5vbnNwYWNlLFxuICAgICAgICBhZGRMaW5lOiBhZGRMaW5lLFxuICAgICAgICBhZGRDaGlsZDogYWRkQ2hpbGQsXG4gICAgICAgIGluY29ycG9yYXRlTGluZTogaW5jb3Jwb3JhdGVMaW5lLFxuICAgICAgICBmaW5hbGl6ZTogZmluYWxpemUsXG4gICAgICAgIHByb2Nlc3NJbmxpbmVzOiBwcm9jZXNzSW5saW5lcyxcbiAgICAgICAgY2xvc2VVbm1hdGNoZWRCbG9ja3M6IGNsb3NlVW5tYXRjaGVkQmxvY2tzLFxuICAgICAgICBwYXJzZTogcGFyc2UsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnMgfHwge31cbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2Jsb2Nrcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIGVuY29kZUNhY2hlID0ge307XG5cblxuLy8gQ3JlYXRlIGEgbG9va3VwIGFycmF5IHdoZXJlIGFueXRoaW5nIGJ1dCBjaGFyYWN0ZXJzIGluIGBjaGFyc2Agc3RyaW5nXG4vLyBhbmQgYWxwaGFudW1lcmljIGNoYXJzIGlzIHBlcmNlbnQtZW5jb2RlZC5cbi8vXG5mdW5jdGlvbiBnZXRFbmNvZGVDYWNoZShleGNsdWRlKSB7XG4gIHZhciBpLCBjaCwgY2FjaGUgPSBlbmNvZGVDYWNoZVtleGNsdWRlXTtcbiAgaWYgKGNhY2hlKSB7IHJldHVybiBjYWNoZTsgfVxuXG4gIGNhY2hlID0gZW5jb2RlQ2FjaGVbZXhjbHVkZV0gPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgMTI4OyBpKyspIHtcbiAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSk7XG5cbiAgICBpZiAoL15bMC05YS16XSQvaS50ZXN0KGNoKSkge1xuICAgICAgLy8gYWx3YXlzIGFsbG93IHVuZW5jb2RlZCBhbHBoYW51bWVyaWMgY2hhcmFjdGVyc1xuICAgICAgY2FjaGUucHVzaChjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlLnB1c2goJyUnICsgKCcwJyArIGkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkpLnNsaWNlKC0yKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4Y2x1ZGUubGVuZ3RoOyBpKyspIHtcbiAgICBjYWNoZVtleGNsdWRlLmNoYXJDb2RlQXQoaSldID0gZXhjbHVkZVtpXTtcbiAgfVxuXG4gIHJldHVybiBjYWNoZTtcbn1cblxuXG4vLyBFbmNvZGUgdW5zYWZlIGNoYXJhY3RlcnMgd2l0aCBwZXJjZW50LWVuY29kaW5nLCBza2lwcGluZyBhbHJlYWR5XG4vLyBlbmNvZGVkIHNlcXVlbmNlcy5cbi8vXG4vLyAgLSBzdHJpbmcgICAgICAgLSBzdHJpbmcgdG8gZW5jb2RlXG4vLyAgLSBleGNsdWRlICAgICAgLSBsaXN0IG9mIGNoYXJhY3RlcnMgdG8gaWdub3JlIChpbiBhZGRpdGlvbiB0byBhLXpBLVowLTkpXG4vLyAgLSBrZWVwRXNjYXBlZCAgLSBkb24ndCBlbmNvZGUgJyUnIGluIGEgY29ycmVjdCBlc2NhcGUgc2VxdWVuY2UgKGRlZmF1bHQ6IHRydWUpXG4vL1xuZnVuY3Rpb24gZW5jb2RlKHN0cmluZywgZXhjbHVkZSwga2VlcEVzY2FwZWQpIHtcbiAgdmFyIGksIGwsIGNvZGUsIG5leHRDb2RlLCBjYWNoZSxcbiAgICAgIHJlc3VsdCA9ICcnO1xuXG4gIGlmICh0eXBlb2YgZXhjbHVkZSAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBlbmNvZGUoc3RyaW5nLCBrZWVwRXNjYXBlZClcbiAgICBrZWVwRXNjYXBlZCAgPSBleGNsdWRlO1xuICAgIGV4Y2x1ZGUgPSBlbmNvZGUuZGVmYXVsdENoYXJzO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZWVwRXNjYXBlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBrZWVwRXNjYXBlZCA9IHRydWU7XG4gIH1cblxuICBjYWNoZSA9IGdldEVuY29kZUNhY2hlKGV4Y2x1ZGUpO1xuXG4gIGZvciAoaSA9IDAsIGwgPSBzdHJpbmcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY29kZSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgaWYgKGtlZXBFc2NhcGVkICYmIGNvZGUgPT09IDB4MjUgLyogJSAqLyAmJiBpICsgMiA8IGwpIHtcbiAgICAgIGlmICgvXlswLTlhLWZdezJ9JC9pLnRlc3Qoc3RyaW5nLnNsaWNlKGkgKyAxLCBpICsgMykpKSB7XG4gICAgICAgIHJlc3VsdCArPSBzdHJpbmcuc2xpY2UoaSwgaSArIDMpO1xuICAgICAgICBpICs9IDI7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlIDwgMTI4KSB7XG4gICAgICByZXN1bHQgKz0gY2FjaGVbY29kZV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY29kZSA+PSAweEQ4MDAgJiYgY29kZSA8PSAweERGRkYpIHtcbiAgICAgIGlmIChjb2RlID49IDB4RDgwMCAmJiBjb2RlIDw9IDB4REJGRiAmJiBpICsgMSA8IGwpIHtcbiAgICAgICAgbmV4dENvZGUgPSBzdHJpbmcuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgIGlmIChuZXh0Q29kZSA+PSAweERDMDAgJiYgbmV4dENvZGUgPD0gMHhERkZGKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdbaV0gKyBzdHJpbmdbaSArIDFdKTtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdCArPSAnJUVGJUJGJUJEJztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc3VsdCArPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nW2ldKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmVuY29kZS5kZWZhdWx0Q2hhcnMgICA9IFwiOy8/OkAmPSskLC1fLiF+KicoKSNcIjtcbmVuY29kZS5jb21wb25lbnRDaGFycyA9IFwiLV8uIX4qJygpXCI7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBlbmNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tZHVybC9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuJ3VzZSBzdHJpY3QnO1xuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblxudmFyIGRlY29kZUNhY2hlID0ge307XG5cbmZ1bmN0aW9uIGdldERlY29kZUNhY2hlKGV4Y2x1ZGUpIHtcbiAgdmFyIGksIGNoLCBjYWNoZSA9IGRlY29kZUNhY2hlW2V4Y2x1ZGVdO1xuICBpZiAoY2FjaGUpIHsgcmV0dXJuIGNhY2hlOyB9XG5cbiAgY2FjaGUgPSBkZWNvZGVDYWNoZVtleGNsdWRlXSA9IFtdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCAxMjg7IGkrKykge1xuICAgIGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICBjYWNoZS5wdXNoKGNoKTtcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleGNsdWRlLmxlbmd0aDsgaSsrKSB7XG4gICAgY2ggPSBleGNsdWRlLmNoYXJDb2RlQXQoaSk7XG4gICAgY2FjaGVbY2hdID0gJyUnICsgKCcwJyArIGNoLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpKS5zbGljZSgtMik7XG4gIH1cblxuICByZXR1cm4gY2FjaGU7XG59XG5cblxuLy8gRGVjb2RlIHBlcmNlbnQtZW5jb2RlZCBzdHJpbmcuXG4vL1xuZnVuY3Rpb24gZGVjb2RlKHN0cmluZywgZXhjbHVkZSkge1xuICB2YXIgY2FjaGU7XG5cbiAgaWYgKHR5cGVvZiBleGNsdWRlICE9PSAnc3RyaW5nJykge1xuICAgIGV4Y2x1ZGUgPSBkZWNvZGUuZGVmYXVsdENoYXJzO1xuICB9XG5cbiAgY2FjaGUgPSBnZXREZWNvZGVDYWNoZShleGNsdWRlKTtcblxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyglW2EtZjAtOV17Mn0pKy9naSwgZnVuY3Rpb24oc2VxKSB7XG4gICAgdmFyIGksIGwsIGIxLCBiMiwgYjMsIGI0LCBjaHIsXG4gICAgICAgIHJlc3VsdCA9ICcnO1xuXG4gICAgZm9yIChpID0gMCwgbCA9IHNlcS5sZW5ndGg7IGkgPCBsOyBpICs9IDMpIHtcbiAgICAgIGIxID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyAxLCBpICsgMyksIDE2KTtcblxuICAgICAgaWYgKGIxIDwgMHg4MCkge1xuICAgICAgICByZXN1bHQgKz0gY2FjaGVbYjFdO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKChiMSAmIDB4RTApID09PSAweEMwICYmIChpICsgMyA8IGwpKSB7XG4gICAgICAgIC8vIDExMHh4eHh4IDEweHh4eHh4XG4gICAgICAgIGIyID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA0LCBpICsgNiksIDE2KTtcblxuICAgICAgICBpZiAoKGIyICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICBjaHIgPSAoKGIxIDw8IDYpICYgMHg3QzApIHwgKGIyICYgMHgzRik7XG5cbiAgICAgICAgICBpZiAoY2hyIDwgMHg4MCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICdcXHVmZmZkXFx1ZmZmZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaSArPSAzO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgoYjEgJiAweEYwKSA9PT0gMHhFMCAmJiAoaSArIDYgPCBsKSkge1xuICAgICAgICAvLyAxMTEweHh4eCAxMHh4eHh4eCAxMHh4eHh4eFxuICAgICAgICBiMiA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNCwgaSArIDYpLCAxNik7XG4gICAgICAgIGIzID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA3LCBpICsgOSksIDE2KTtcblxuICAgICAgICBpZiAoKGIyICYgMHhDMCkgPT09IDB4ODAgJiYgKGIzICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICBjaHIgPSAoKGIxIDw8IDEyKSAmIDB4RjAwMCkgfCAoKGIyIDw8IDYpICYgMHhGQzApIHwgKGIzICYgMHgzRik7XG5cbiAgICAgICAgICBpZiAoY2hyIDwgMHg4MDAgfHwgKGNociA+PSAweEQ4MDAgJiYgY2hyIDw9IDB4REZGRikpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmRcXHVmZmZkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpICs9IDY7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKChiMSAmIDB4RjgpID09PSAweEYwICYmIChpICsgOSA8IGwpKSB7XG4gICAgICAgIC8vIDExMTExMHh4IDEweHh4eHh4IDEweHh4eHh4IDEweHh4eHh4XG4gICAgICAgIGIyID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA0LCBpICsgNiksIDE2KTtcbiAgICAgICAgYjMgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDcsIGkgKyA5KSwgMTYpO1xuICAgICAgICBiNCA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgMTAsIGkgKyAxMiksIDE2KTtcblxuICAgICAgICBpZiAoKGIyICYgMHhDMCkgPT09IDB4ODAgJiYgKGIzICYgMHhDMCkgPT09IDB4ODAgJiYgKGI0ICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICBjaHIgPSAoKGIxIDw8IDE4KSAmIDB4MUMwMDAwKSB8ICgoYjIgPDwgMTIpICYgMHgzRjAwMCkgfCAoKGIzIDw8IDYpICYgMHhGQzApIHwgKGI0ICYgMHgzRik7XG5cbiAgICAgICAgICBpZiAoY2hyIDwgMHgxMDAwMCB8fCBjaHIgPiAweDEwRkZGRikge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICdcXHVmZmZkXFx1ZmZmZFxcdWZmZmRcXHVmZmZkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hyIC09IDB4MTAwMDA7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweEQ4MDAgKyAoY2hyID4+IDEwKSwgMHhEQzAwICsgKGNociAmIDB4M0ZGKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaSArPSA5O1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSk7XG59XG5cblxuZGVjb2RlLmRlZmF1bHRDaGFycyAgID0gJzsvPzpAJj0rJCwjJztcbmRlY29kZS5jb21wb25lbnRDaGFycyA9ICcnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbWR1cmwvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaW52ZXJzZVhNTCA9IGdldEludmVyc2VPYmoocmVxdWlyZShcIi4uL21hcHMveG1sLmpzb25cIikpLFxuICAgIHhtbFJlcGxhY2VyID0gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2VYTUwpO1xuXG5leHBvcnRzLlhNTCA9IGdldEludmVyc2UoaW52ZXJzZVhNTCwgeG1sUmVwbGFjZXIpO1xuXG52YXIgaW52ZXJzZUhUTUwgPSBnZXRJbnZlcnNlT2JqKHJlcXVpcmUoXCIuLi9tYXBzL2VudGl0aWVzLmpzb25cIikpLFxuICAgIGh0bWxSZXBsYWNlciA9IGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlSFRNTCk7XG5cbmV4cG9ydHMuSFRNTCA9IGdldEludmVyc2UoaW52ZXJzZUhUTUwsIGh0bWxSZXBsYWNlcik7XG5cbmZ1bmN0aW9uIGdldEludmVyc2VPYmoob2JqKXtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG9iaikuc29ydCgpLnJlZHVjZShmdW5jdGlvbihpbnZlcnNlLCBuYW1lKXtcblx0XHRpbnZlcnNlW29ialtuYW1lXV0gPSBcIiZcIiArIG5hbWUgKyBcIjtcIjtcblx0XHRyZXR1cm4gaW52ZXJzZTtcblx0fSwge30pO1xufVxuXG5mdW5jdGlvbiBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZSl7XG5cdHZhciBzaW5nbGUgPSBbXSxcblx0ICAgIG11bHRpcGxlID0gW107XG5cblx0T2JqZWN0LmtleXMoaW52ZXJzZSkuZm9yRWFjaChmdW5jdGlvbihrKXtcblx0XHRpZihrLmxlbmd0aCA9PT0gMSl7XG5cdFx0XHRzaW5nbGUucHVzaChcIlxcXFxcIiArIGspO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtdWx0aXBsZS5wdXNoKGspO1xuXHRcdH1cblx0fSk7XG5cblx0Ly9UT0RPIGFkZCByYW5nZXNcblx0bXVsdGlwbGUudW5zaGlmdChcIltcIiArIHNpbmdsZS5qb2luKFwiXCIpICsgXCJdXCIpO1xuXG5cdHJldHVybiBuZXcgUmVnRXhwKG11bHRpcGxlLmpvaW4oXCJ8XCIpLCBcImdcIik7XG59XG5cbnZhciByZV9ub25BU0NJSSA9IC9bXlxcMC1cXHg3Rl0vZyxcbiAgICByZV9hc3RyYWxTeW1ib2xzID0gL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZztcblxuZnVuY3Rpb24gc2luZ2xlQ2hhclJlcGxhY2VyKGMpe1xuXHRyZXR1cm4gXCImI3hcIiArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiO1wiO1xufVxuXG5mdW5jdGlvbiBhc3RyYWxSZXBsYWNlcihjKXtcblx0Ly8gaHR0cDovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcblx0dmFyIGhpZ2ggPSBjLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBsb3cgID0gYy5jaGFyQ29kZUF0KDEpO1xuXHR2YXIgY29kZVBvaW50ID0gKGhpZ2ggLSAweEQ4MDApICogMHg0MDAgKyBsb3cgLSAweERDMDAgKyAweDEwMDAwO1xuXHRyZXR1cm4gXCImI3hcIiArIGNvZGVQb2ludC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiO1wiO1xufVxuXG5mdW5jdGlvbiBnZXRJbnZlcnNlKGludmVyc2UsIHJlKXtcblx0ZnVuY3Rpb24gZnVuYyhuYW1lKXtcblx0XHRyZXR1cm4gaW52ZXJzZVtuYW1lXTtcblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbihkYXRhKXtcblx0XHRyZXR1cm4gZGF0YVxuXHRcdFx0XHQucmVwbGFjZShyZSwgZnVuYylcblx0XHRcdFx0LnJlcGxhY2UocmVfYXN0cmFsU3ltYm9scywgYXN0cmFsUmVwbGFjZXIpXG5cdFx0XHRcdC5yZXBsYWNlKHJlX25vbkFTQ0lJLCBzaW5nbGVDaGFyUmVwbGFjZXIpO1xuXHR9O1xufVxuXG52YXIgcmVfeG1sQ2hhcnMgPSBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZVhNTCk7XG5cbmZ1bmN0aW9uIGVzY2FwZVhNTChkYXRhKXtcblx0cmV0dXJuIGRhdGFcblx0XHRcdC5yZXBsYWNlKHJlX3htbENoYXJzLCBzaW5nbGVDaGFyUmVwbGFjZXIpXG5cdFx0XHQucmVwbGFjZShyZV9hc3RyYWxTeW1ib2xzLCBhc3RyYWxSZXBsYWNlcilcblx0XHRcdC5yZXBsYWNlKHJlX25vbkFTQ0lJLCBzaW5nbGVDaGFyUmVwbGFjZXIpO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGVzY2FwZVhNTDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBlbnRpdHlNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9lbnRpdGllcy5qc29uXCIpLFxuICAgIGxlZ2FjeU1hcCA9IHJlcXVpcmUoXCIuLi9tYXBzL2xlZ2FjeS5qc29uXCIpLFxuICAgIHhtbE1hcCAgICA9IHJlcXVpcmUoXCIuLi9tYXBzL3htbC5qc29uXCIpLFxuICAgIGRlY29kZUNvZGVQb2ludCA9IHJlcXVpcmUoXCIuL2RlY29kZV9jb2RlcG9pbnQuanNcIik7XG5cbnZhciBkZWNvZGVYTUxTdHJpY3QgID0gZ2V0U3RyaWN0RGVjb2Rlcih4bWxNYXApLFxuICAgIGRlY29kZUhUTUxTdHJpY3QgPSBnZXRTdHJpY3REZWNvZGVyKGVudGl0eU1hcCk7XG5cbmZ1bmN0aW9uIGdldFN0cmljdERlY29kZXIobWFwKXtcblx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhtYXApLmpvaW4oXCJ8XCIpLFxuXHQgICAgcmVwbGFjZSA9IGdldFJlcGxhY2VyKG1hcCk7XG5cblx0a2V5cyArPSBcInwjW3hYXVtcXFxcZGEtZkEtRl0rfCNcXFxcZCtcIjtcblxuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKFwiJig/OlwiICsga2V5cyArIFwiKTtcIiwgXCJnXCIpO1xuXG5cdHJldHVybiBmdW5jdGlvbihzdHIpe1xuXHRcdHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKHJlLCByZXBsYWNlKTtcblx0fTtcbn1cblxudmFyIGRlY29kZUhUTUwgPSAoZnVuY3Rpb24oKXtcblx0dmFyIGxlZ2FjeSA9IE9iamVjdC5rZXlzKGxlZ2FjeU1hcClcblx0XHQuc29ydChzb3J0ZXIpO1xuXG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMoZW50aXR5TWFwKVxuXHRcdC5zb3J0KHNvcnRlcik7XG5cblx0Zm9yKHZhciBpID0gMCwgaiA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRpZihsZWdhY3lbal0gPT09IGtleXNbaV0pe1xuXHRcdFx0a2V5c1tpXSArPSBcIjs/XCI7XG5cdFx0XHRqKys7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGtleXNbaV0gKz0gXCI7XCI7XG5cdFx0fVxuXHR9XG5cblx0dmFyIHJlID0gbmV3IFJlZ0V4cChcIiYoPzpcIiArIGtleXMuam9pbihcInxcIikgKyBcInwjW3hYXVtcXFxcZGEtZkEtRl0rOz98I1xcXFxkKzs/KVwiLCBcImdcIiksXG5cdCAgICByZXBsYWNlID0gZ2V0UmVwbGFjZXIoZW50aXR5TWFwKTtcblxuXHRmdW5jdGlvbiByZXBsYWNlcihzdHIpe1xuXHRcdGlmKHN0ci5zdWJzdHIoLTEpICE9PSBcIjtcIikgc3RyICs9IFwiO1wiO1xuXHRcdHJldHVybiByZXBsYWNlKHN0cik7XG5cdH1cblxuXHQvL1RPRE8gY29uc2lkZXIgY3JlYXRpbmcgYSBtZXJnZWQgbWFwXG5cdHJldHVybiBmdW5jdGlvbihzdHIpe1xuXHRcdHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKHJlLCByZXBsYWNlcik7XG5cdH07XG59KCkpO1xuXG5mdW5jdGlvbiBzb3J0ZXIoYSwgYil7XG5cdHJldHVybiBhIDwgYiA/IDEgOiAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVwbGFjZXIobWFwKXtcblx0cmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2Uoc3RyKXtcblx0XHRpZihzdHIuY2hhckF0KDEpID09PSBcIiNcIil7XG5cdFx0XHRpZihzdHIuY2hhckF0KDIpID09PSBcIlhcIiB8fCBzdHIuY2hhckF0KDIpID09PSBcInhcIil7XG5cdFx0XHRcdHJldHVybiBkZWNvZGVDb2RlUG9pbnQocGFyc2VJbnQoc3RyLnN1YnN0cigzKSwgMTYpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkZWNvZGVDb2RlUG9pbnQocGFyc2VJbnQoc3RyLnN1YnN0cigyKSwgMTApKTtcblx0XHR9XG5cdFx0cmV0dXJuIG1hcFtzdHIuc2xpY2UoMSwgLTEpXTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFhNTDogZGVjb2RlWE1MU3RyaWN0LFxuXHRIVE1MOiBkZWNvZGVIVE1MLFxuXHRIVE1MU3RyaWN0OiBkZWNvZGVIVE1MU3RyaWN0XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wiQWFjdXRlXCI6XCLDgVwiLFwiYWFjdXRlXCI6XCLDoVwiLFwiQWNpcmNcIjpcIsOCXCIsXCJhY2lyY1wiOlwiw6JcIixcImFjdXRlXCI6XCLCtFwiLFwiQUVsaWdcIjpcIsOGXCIsXCJhZWxpZ1wiOlwiw6ZcIixcIkFncmF2ZVwiOlwiw4BcIixcImFncmF2ZVwiOlwiw6BcIixcImFtcFwiOlwiJlwiLFwiQU1QXCI6XCImXCIsXCJBcmluZ1wiOlwiw4VcIixcImFyaW5nXCI6XCLDpVwiLFwiQXRpbGRlXCI6XCLDg1wiLFwiYXRpbGRlXCI6XCLDo1wiLFwiQXVtbFwiOlwiw4RcIixcImF1bWxcIjpcIsOkXCIsXCJicnZiYXJcIjpcIsKmXCIsXCJDY2VkaWxcIjpcIsOHXCIsXCJjY2VkaWxcIjpcIsOnXCIsXCJjZWRpbFwiOlwiwrhcIixcImNlbnRcIjpcIsKiXCIsXCJjb3B5XCI6XCLCqVwiLFwiQ09QWVwiOlwiwqlcIixcImN1cnJlblwiOlwiwqRcIixcImRlZ1wiOlwiwrBcIixcImRpdmlkZVwiOlwiw7dcIixcIkVhY3V0ZVwiOlwiw4lcIixcImVhY3V0ZVwiOlwiw6lcIixcIkVjaXJjXCI6XCLDilwiLFwiZWNpcmNcIjpcIsOqXCIsXCJFZ3JhdmVcIjpcIsOIXCIsXCJlZ3JhdmVcIjpcIsOoXCIsXCJFVEhcIjpcIsOQXCIsXCJldGhcIjpcIsOwXCIsXCJFdW1sXCI6XCLDi1wiLFwiZXVtbFwiOlwiw6tcIixcImZyYWMxMlwiOlwiwr1cIixcImZyYWMxNFwiOlwiwrxcIixcImZyYWMzNFwiOlwiwr5cIixcImd0XCI6XCI+XCIsXCJHVFwiOlwiPlwiLFwiSWFjdXRlXCI6XCLDjVwiLFwiaWFjdXRlXCI6XCLDrVwiLFwiSWNpcmNcIjpcIsOOXCIsXCJpY2lyY1wiOlwiw65cIixcImlleGNsXCI6XCLCoVwiLFwiSWdyYXZlXCI6XCLDjFwiLFwiaWdyYXZlXCI6XCLDrFwiLFwiaXF1ZXN0XCI6XCLCv1wiLFwiSXVtbFwiOlwiw49cIixcIml1bWxcIjpcIsOvXCIsXCJsYXF1b1wiOlwiwqtcIixcImx0XCI6XCI8XCIsXCJMVFwiOlwiPFwiLFwibWFjclwiOlwiwq9cIixcIm1pY3JvXCI6XCLCtVwiLFwibWlkZG90XCI6XCLCt1wiLFwibmJzcFwiOlwiwqBcIixcIm5vdFwiOlwiwqxcIixcIk50aWxkZVwiOlwiw5FcIixcIm50aWxkZVwiOlwiw7FcIixcIk9hY3V0ZVwiOlwiw5NcIixcIm9hY3V0ZVwiOlwiw7NcIixcIk9jaXJjXCI6XCLDlFwiLFwib2NpcmNcIjpcIsO0XCIsXCJPZ3JhdmVcIjpcIsOSXCIsXCJvZ3JhdmVcIjpcIsOyXCIsXCJvcmRmXCI6XCLCqlwiLFwib3JkbVwiOlwiwrpcIixcIk9zbGFzaFwiOlwiw5hcIixcIm9zbGFzaFwiOlwiw7hcIixcIk90aWxkZVwiOlwiw5VcIixcIm90aWxkZVwiOlwiw7VcIixcIk91bWxcIjpcIsOWXCIsXCJvdW1sXCI6XCLDtlwiLFwicGFyYVwiOlwiwrZcIixcInBsdXNtblwiOlwiwrFcIixcInBvdW5kXCI6XCLCo1wiLFwicXVvdFwiOlwiXFxcIlwiLFwiUVVPVFwiOlwiXFxcIlwiLFwicmFxdW9cIjpcIsK7XCIsXCJyZWdcIjpcIsKuXCIsXCJSRUdcIjpcIsKuXCIsXCJzZWN0XCI6XCLCp1wiLFwic2h5XCI6XCLCrVwiLFwic3VwMVwiOlwiwrlcIixcInN1cDJcIjpcIsKyXCIsXCJzdXAzXCI6XCLCs1wiLFwic3psaWdcIjpcIsOfXCIsXCJUSE9STlwiOlwiw55cIixcInRob3JuXCI6XCLDvlwiLFwidGltZXNcIjpcIsOXXCIsXCJVYWN1dGVcIjpcIsOaXCIsXCJ1YWN1dGVcIjpcIsO6XCIsXCJVY2lyY1wiOlwiw5tcIixcInVjaXJjXCI6XCLDu1wiLFwiVWdyYXZlXCI6XCLDmVwiLFwidWdyYXZlXCI6XCLDuVwiLFwidW1sXCI6XCLCqFwiLFwiVXVtbFwiOlwiw5xcIixcInV1bWxcIjpcIsO8XCIsXCJZYWN1dGVcIjpcIsOdXCIsXCJ5YWN1dGVcIjpcIsO9XCIsXCJ5ZW5cIjpcIsKlXCIsXCJ5dW1sXCI6XCLDv1wifVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvbGVnYWN5Lmpzb25cbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkZWNvZGVNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9kZWNvZGUuanNvblwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWNvZGVDb2RlUG9pbnQ7XG5cbi8vIG1vZGlmaWVkIHZlcnNpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvaGUvYmxvYi9tYXN0ZXIvc3JjL2hlLmpzI0w5NC1MMTE5XG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnQoY29kZVBvaW50KXtcblxuXHRpZigoY29kZVBvaW50ID49IDB4RDgwMCAmJiBjb2RlUG9pbnQgPD0gMHhERkZGKSB8fCBjb2RlUG9pbnQgPiAweDEwRkZGRil7XG5cdFx0cmV0dXJuIFwiXFx1RkZGRFwiO1xuXHR9XG5cblx0aWYoY29kZVBvaW50IGluIGRlY29kZU1hcCl7XG5cdFx0Y29kZVBvaW50ID0gZGVjb2RlTWFwW2NvZGVQb2ludF07XG5cdH1cblxuXHR2YXIgb3V0cHV0ID0gXCJcIjtcblxuXHRpZihjb2RlUG9pbnQgPiAweEZGRkYpe1xuXHRcdGNvZGVQb2ludCAtPSAweDEwMDAwO1xuXHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0Y29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkY7XG5cdH1cblxuXHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHRyZXR1cm4gb3V0cHV0O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbGliL2RlY29kZV9jb2RlcG9pbnQuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wiMFwiOjY1NTMzLFwiMTI4XCI6ODM2NCxcIjEzMFwiOjgyMTgsXCIxMzFcIjo0MDIsXCIxMzJcIjo4MjIyLFwiMTMzXCI6ODIzMCxcIjEzNFwiOjgyMjQsXCIxMzVcIjo4MjI1LFwiMTM2XCI6NzEwLFwiMTM3XCI6ODI0MCxcIjEzOFwiOjM1MixcIjEzOVwiOjgyNDksXCIxNDBcIjozMzgsXCIxNDJcIjozODEsXCIxNDVcIjo4MjE2LFwiMTQ2XCI6ODIxNyxcIjE0N1wiOjgyMjAsXCIxNDhcIjo4MjIxLFwiMTQ5XCI6ODIyNixcIjE1MFwiOjgyMTEsXCIxNTFcIjo4MjEyLFwiMTUyXCI6NzMyLFwiMTUzXCI6ODQ4MixcIjE1NFwiOjM1MyxcIjE1NVwiOjgyNTAsXCIxNTZcIjozMzksXCIxNThcIjozODIsXCIxNTlcIjozNzZ9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9kZWNvZGUuanNvblxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBub3JtYWxpemVSZWZlcmVuY2UgPSByZXF1aXJlKCcuL25vcm1hbGl6ZS1yZWZlcmVuY2UnKTtcblxudmFyIG5vcm1hbGl6ZVVSSSA9IGNvbW1vbi5ub3JtYWxpemVVUkk7XG52YXIgdW5lc2NhcGVTdHJpbmcgPSBjb21tb24udW5lc2NhcGVTdHJpbmc7XG52YXIgZnJvbUNvZGVQb2ludCA9IHJlcXVpcmUoJy4vZnJvbS1jb2RlLXBvaW50LmpzJyk7XG52YXIgZGVjb2RlSFRNTCA9IHJlcXVpcmUoJ2VudGl0aWVzJykuZGVjb2RlSFRNTDtcbnJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUucmVwZWF0Jyk7IC8vIFBvbHlmaWxsIGZvciBTdHJpbmcucHJvdG90eXBlLnJlcGVhdFxuXG4vLyBDb25zdGFudHMgZm9yIGNoYXJhY3RlciBjb2RlczpcblxudmFyIENfTkVXTElORSA9IDEwO1xudmFyIENfQVNURVJJU0sgPSA0MjtcbnZhciBDX1VOREVSU0NPUkUgPSA5NTtcbnZhciBDX0JBQ0tUSUNLID0gOTY7XG52YXIgQ19PUEVOX0JSQUNLRVQgPSA5MTtcbnZhciBDX0NMT1NFX0JSQUNLRVQgPSA5MztcbnZhciBDX0xFU1NUSEFOID0gNjA7XG52YXIgQ19CQU5HID0gMzM7XG52YXIgQ19CQUNLU0xBU0ggPSA5MjtcbnZhciBDX0FNUEVSU0FORCA9IDM4O1xudmFyIENfT1BFTl9QQVJFTiA9IDQwO1xudmFyIENfQ0xPU0VfUEFSRU4gPSA0MTtcbnZhciBDX0NPTE9OID0gNTg7XG52YXIgQ19TSU5HTEVRVU9URSA9IDM5O1xudmFyIENfRE9VQkxFUVVPVEUgPSAzNDtcblxuLy8gU29tZSByZWdleHBzIHVzZWQgaW4gaW5saW5lIHBhcnNlcjpcblxudmFyIEVTQ0FQQUJMRSA9IGNvbW1vbi5FU0NBUEFCTEU7XG52YXIgRVNDQVBFRF9DSEFSID0gJ1xcXFxcXFxcJyArIEVTQ0FQQUJMRTtcblxudmFyIEVOVElUWSA9IGNvbW1vbi5FTlRJVFk7XG52YXIgcmVIdG1sVGFnID0gY29tbW9uLnJlSHRtbFRhZztcblxudmFyIHJlUHVuY3R1YXRpb24gPSBuZXcgUmVnRXhwKC9bIVwiIyQlJicoKSorLFxcLS4vOjs8PT4/QFxcW1xcXV5fYHt8fX5cXHhBMVxceEE3XFx4QUJcXHhCNlxceEI3XFx4QkJcXHhCRlxcdTAzN0VcXHUwMzg3XFx1MDU1QS1cXHUwNTVGXFx1MDU4OVxcdTA1OEFcXHUwNUJFXFx1MDVDMFxcdTA1QzNcXHUwNUM2XFx1MDVGM1xcdTA1RjRcXHUwNjA5XFx1MDYwQVxcdTA2MENcXHUwNjBEXFx1MDYxQlxcdTA2MUVcXHUwNjFGXFx1MDY2QS1cXHUwNjZEXFx1MDZENFxcdTA3MDAtXFx1MDcwRFxcdTA3RjctXFx1MDdGOVxcdTA4MzAtXFx1MDgzRVxcdTA4NUVcXHUwOTY0XFx1MDk2NVxcdTA5NzBcXHUwQUYwXFx1MERGNFxcdTBFNEZcXHUwRTVBXFx1MEU1QlxcdTBGMDQtXFx1MEYxMlxcdTBGMTRcXHUwRjNBLVxcdTBGM0RcXHUwRjg1XFx1MEZEMC1cXHUwRkQ0XFx1MEZEOVxcdTBGREFcXHUxMDRBLVxcdTEwNEZcXHUxMEZCXFx1MTM2MC1cXHUxMzY4XFx1MTQwMFxcdTE2NkRcXHUxNjZFXFx1MTY5QlxcdTE2OUNcXHUxNkVCLVxcdTE2RURcXHUxNzM1XFx1MTczNlxcdTE3RDQtXFx1MTdENlxcdTE3RDgtXFx1MTdEQVxcdTE4MDAtXFx1MTgwQVxcdTE5NDRcXHUxOTQ1XFx1MUExRVxcdTFBMUZcXHUxQUEwLVxcdTFBQTZcXHUxQUE4LVxcdTFBQURcXHUxQjVBLVxcdTFCNjBcXHUxQkZDLVxcdTFCRkZcXHUxQzNCLVxcdTFDM0ZcXHUxQzdFXFx1MUM3RlxcdTFDQzAtXFx1MUNDN1xcdTFDRDNcXHUyMDEwLVxcdTIwMjdcXHUyMDMwLVxcdTIwNDNcXHUyMDQ1LVxcdTIwNTFcXHUyMDUzLVxcdTIwNUVcXHUyMDdEXFx1MjA3RVxcdTIwOERcXHUyMDhFXFx1MjMwOC1cXHUyMzBCXFx1MjMyOVxcdTIzMkFcXHUyNzY4LVxcdTI3NzVcXHUyN0M1XFx1MjdDNlxcdTI3RTYtXFx1MjdFRlxcdTI5ODMtXFx1Mjk5OFxcdTI5RDgtXFx1MjlEQlxcdTI5RkNcXHUyOUZEXFx1MkNGOS1cXHUyQ0ZDXFx1MkNGRVxcdTJDRkZcXHUyRDcwXFx1MkUwMC1cXHUyRTJFXFx1MkUzMC1cXHUyRTQyXFx1MzAwMS1cXHUzMDAzXFx1MzAwOC1cXHUzMDExXFx1MzAxNC1cXHUzMDFGXFx1MzAzMFxcdTMwM0RcXHUzMEEwXFx1MzBGQlxcdUE0RkVcXHVBNEZGXFx1QTYwRC1cXHVBNjBGXFx1QTY3M1xcdUE2N0VcXHVBNkYyLVxcdUE2RjdcXHVBODc0LVxcdUE4NzdcXHVBOENFXFx1QThDRlxcdUE4RjgtXFx1QThGQVxcdUE4RkNcXHVBOTJFXFx1QTkyRlxcdUE5NUZcXHVBOUMxLVxcdUE5Q0RcXHVBOURFXFx1QTlERlxcdUFBNUMtXFx1QUE1RlxcdUFBREVcXHVBQURGXFx1QUFGMFxcdUFBRjFcXHVBQkVCXFx1RkQzRVxcdUZEM0ZcXHVGRTEwLVxcdUZFMTlcXHVGRTMwLVxcdUZFNTJcXHVGRTU0LVxcdUZFNjFcXHVGRTYzXFx1RkU2OFxcdUZFNkFcXHVGRTZCXFx1RkYwMS1cXHVGRjAzXFx1RkYwNS1cXHVGRjBBXFx1RkYwQy1cXHVGRjBGXFx1RkYxQVxcdUZGMUJcXHVGRjFGXFx1RkYyMFxcdUZGM0ItXFx1RkYzRFxcdUZGM0ZcXHVGRjVCXFx1RkY1RFxcdUZGNUYtXFx1RkY2NV18XFx1RDgwMFtcXHVERDAwLVxcdUREMDJcXHVERjlGXFx1REZEMF18XFx1RDgwMVxcdURENkZ8XFx1RDgwMltcXHVEQzU3XFx1REQxRlxcdUREM0ZcXHVERTUwLVxcdURFNThcXHVERTdGXFx1REVGMC1cXHVERUY2XFx1REYzOS1cXHVERjNGXFx1REY5OS1cXHVERjlDXXxcXHVEODA0W1xcdURDNDctXFx1REM0RFxcdURDQkJcXHVEQ0JDXFx1RENCRS1cXHVEQ0MxXFx1REQ0MC1cXHVERDQzXFx1REQ3NFxcdURENzVcXHVEREM1LVxcdUREQzlcXHVERENEXFx1REREQlxcdUREREQtXFx1RERERlxcdURFMzgtXFx1REUzRFxcdURFQTldfFxcdUQ4MDVbXFx1RENDNlxcdUREQzEtXFx1REREN1xcdURFNDEtXFx1REU0M1xcdURGM0MtXFx1REYzRV18XFx1RDgwOVtcXHVEQzcwLVxcdURDNzRdfFxcdUQ4MUFbXFx1REU2RVxcdURFNkZcXHVERUY1XFx1REYzNy1cXHVERjNCXFx1REY0NF18XFx1RDgyRlxcdURDOUZ8XFx1RDgzNltcXHVERTg3LVxcdURFOEJdLyk7XG5cbnZhciByZUxpbmtUaXRsZSA9IG5ldyBSZWdFeHAoXG4gICAgJ14oPzpcIignICsgRVNDQVBFRF9DSEFSICsgJ3xbXlwiXFxcXHgwMF0pKlwiJyArXG4gICAgICAgICd8JyArXG4gICAgICAgICdcXCcoJyArIEVTQ0FQRURfQ0hBUiArICd8W15cXCdcXFxceDAwXSkqXFwnJyArXG4gICAgICAgICd8JyArXG4gICAgICAgICdcXFxcKCgnICsgRVNDQVBFRF9DSEFSICsgJ3xbXilcXFxceDAwXSkqXFxcXCkpJyk7XG5cbnZhciByZUxpbmtEZXN0aW5hdGlvbkJyYWNlcyA9IG5ldyBSZWdFeHAoXG4gICAgJ14oPzpbPF0oPzpbXiA8PlxcXFx0XFxcXG5cXFxcXFxcXFxcXFx4MDBdJyArICd8JyArIEVTQ0FQRURfQ0hBUiArICd8JyArICdcXFxcXFxcXCkqWz5dKScpO1xuXG52YXIgcmVFc2NhcGFibGUgPSBuZXcgUmVnRXhwKCdeJyArIEVTQ0FQQUJMRSk7XG5cbnZhciByZUVudGl0eUhlcmUgPSBuZXcgUmVnRXhwKCdeJyArIEVOVElUWSwgJ2knKTtcblxudmFyIHJlVGlja3MgPSAvYCsvO1xuXG52YXIgcmVUaWNrc0hlcmUgPSAvXmArLztcblxudmFyIHJlRWxsaXBzZXMgPSAvXFwuXFwuXFwuL2c7XG5cbnZhciByZURhc2ggPSAvLS0rL2c7XG5cbnZhciByZUVtYWlsQXV0b2xpbmsgPSAvXjwoW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKik+LztcblxudmFyIHJlQXV0b2xpbmsgPSAvXjxbQS1aYS16XVtBLVphLXowLTkuKy1dezEsMzF9OltePD5cXHgwMC1cXHgyMF0qPi9pO1xuXG52YXIgcmVTcG5sID0gL14gKig/OlxcbiAqKT8vO1xuXG52YXIgcmVXaGl0ZXNwYWNlQ2hhciA9IC9eWyBcXHRcXG5cXHgwYlxceDBjXFx4MGRdLztcblxudmFyIHJlV2hpdGVzcGFjZSA9IC9bIFxcdFxcblxceDBiXFx4MGNcXHgwZF0rL2c7XG5cbnZhciByZVVuaWNvZGVXaGl0ZXNwYWNlQ2hhciA9IC9eXFxzLztcblxudmFyIHJlRmluYWxTcGFjZSA9IC8gKiQvO1xuXG52YXIgcmVJbml0aWFsU3BhY2UgPSAvXiAqLztcblxudmFyIHJlU3BhY2VBdEVuZE9mTGluZSA9IC9eICooPzpcXG58JCkvO1xuXG52YXIgcmVMaW5rTGFiZWwgPSBuZXcgUmVnRXhwKCdeXFxcXFsoPzpbXlxcXFxcXFxcXFxcXFtcXFxcXV18JyArIEVTQ0FQRURfQ0hBUiArXG4gICd8XFxcXFxcXFwpezAsMTAwMH1cXFxcXScpO1xuXG4vLyBNYXRjaGVzIGEgc3RyaW5nIG9mIG5vbi1zcGVjaWFsIGNoYXJhY3RlcnMuXG52YXIgcmVNYWluID0gL15bXlxcbmBcXFtcXF1cXFxcITwmKl8nXCJdKy9tO1xuXG52YXIgdGV4dCA9IGZ1bmN0aW9uKHMpIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKCd0ZXh0Jyk7XG4gICAgbm9kZS5fbGl0ZXJhbCA9IHM7XG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG4vLyBJTkxJTkUgUEFSU0VSXG5cbi8vIFRoZXNlIGFyZSBtZXRob2RzIG9mIGFuIElubGluZVBhcnNlciBvYmplY3QsIGRlZmluZWQgYmVsb3cuXG4vLyBBbiBJbmxpbmVQYXJzZXIga2VlcHMgdHJhY2sgb2YgYSBzdWJqZWN0IChhIHN0cmluZyB0byBiZVxuLy8gcGFyc2VkKSBhbmQgYSBwb3NpdGlvbiBpbiB0aGF0IHN1YmplY3QuXG5cbi8vIElmIHJlIG1hdGNoZXMgYXQgY3VycmVudCBwb3NpdGlvbiBpbiB0aGUgc3ViamVjdCwgYWR2YW5jZVxuLy8gcG9zaXRpb24gaW4gc3ViamVjdCBhbmQgcmV0dXJuIHRoZSBtYXRjaDsgb3RoZXJ3aXNlIHJldHVybiBudWxsLlxudmFyIG1hdGNoID0gZnVuY3Rpb24ocmUpIHtcbiAgICB2YXIgbSA9IHJlLmV4ZWModGhpcy5zdWJqZWN0LnNsaWNlKHRoaXMucG9zKSk7XG4gICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3MgKz0gbS5pbmRleCArIG1bMF0ubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbVswXTtcbiAgICB9XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBjb2RlIGZvciB0aGUgY2hhcmFjdGVyIGF0IHRoZSBjdXJyZW50IHN1YmplY3QgcG9zaXRpb24sIG9yIC0xXG4vLyB0aGVyZSBhcmUgbm8gbW9yZSBjaGFyYWN0ZXJzLlxudmFyIHBlZWsgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wb3MgPCB0aGlzLnN1YmplY3QubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3QuY2hhckNvZGVBdCh0aGlzLnBvcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn07XG5cbi8vIFBhcnNlIHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzLCBpbmNsdWRpbmcgYXQgbW9zdCBvbmUgbmV3bGluZVxudmFyIHNwbmwgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm1hdGNoKHJlU3BubCk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBBbGwgb2YgdGhlIHBhcnNlcnMgYmVsb3cgdHJ5IHRvIG1hdGNoIHNvbWV0aGluZyBhdCB0aGUgY3VycmVudCBwb3NpdGlvblxuLy8gaW4gdGhlIHN1YmplY3QuICBJZiB0aGV5IHN1Y2NlZWQgaW4gbWF0Y2hpbmcgYW55dGhpbmcsIHRoZXlcbi8vIHJldHVybiB0aGUgaW5saW5lIG1hdGNoZWQsIGFkdmFuY2luZyB0aGUgc3ViamVjdC5cblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBiYWNrdGlja3MsIGFkZGluZyBlaXRoZXIgYSBiYWNrdGljayBjb2RlIHNwYW4gb3IgYVxuLy8gbGl0ZXJhbCBzZXF1ZW5jZSBvZiBiYWNrdGlja3MuXG52YXIgcGFyc2VCYWNrdGlja3MgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciB0aWNrcyA9IHRoaXMubWF0Y2gocmVUaWNrc0hlcmUpO1xuICAgIGlmICh0aWNrcyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBhZnRlck9wZW5UaWNrcyA9IHRoaXMucG9zO1xuICAgIHZhciBtYXRjaGVkO1xuICAgIHZhciBub2RlO1xuICAgIHdoaWxlICgobWF0Y2hlZCA9IHRoaXMubWF0Y2gocmVUaWNrcykpICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChtYXRjaGVkID09PSB0aWNrcykge1xuICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlKCdjb2RlJyk7XG4gICAgICAgICAgICBub2RlLl9saXRlcmFsID0gdGhpcy5zdWJqZWN0LnNsaWNlKGFmdGVyT3BlblRpY2tzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zIC0gdGlja3MubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpLnJlcGxhY2UocmVXaGl0ZXNwYWNlLCAnICcpO1xuICAgICAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB3ZSBnb3QgaGVyZSwgd2UgZGlkbid0IG1hdGNoIGEgY2xvc2luZyBiYWNrdGljayBzZXF1ZW5jZS5cbiAgICB0aGlzLnBvcyA9IGFmdGVyT3BlblRpY2tzO1xuICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQodGlja3MpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIFBhcnNlIGEgYmFja3NsYXNoLWVzY2FwZWQgc3BlY2lhbCBjaGFyYWN0ZXIsIGFkZGluZyBlaXRoZXIgdGhlIGVzY2FwZWRcbi8vIGNoYXJhY3RlciwgYSBoYXJkIGxpbmUgYnJlYWsgKGlmIHRoZSBiYWNrc2xhc2ggaXMgZm9sbG93ZWQgYnkgYSBuZXdsaW5lKSxcbi8vIG9yIGEgbGl0ZXJhbCBiYWNrc2xhc2ggdG8gdGhlIGJsb2NrJ3MgY2hpbGRyZW4uICBBc3N1bWVzIGN1cnJlbnQgY2hhcmFjdGVyXG4vLyBpcyBhIGJhY2tzbGFzaC5cbnZhciBwYXJzZUJhY2tzbGFzaCA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIHN1YmogPSB0aGlzLnN1YmplY3Q7XG4gICAgdmFyIG5vZGU7XG4gICAgdGhpcy5wb3MgKz0gMTtcbiAgICBpZiAodGhpcy5wZWVrKCkgPT09IENfTkVXTElORSkge1xuICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICBub2RlID0gbmV3IE5vZGUoJ2xpbmVicmVhaycpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9IGVsc2UgaWYgKHJlRXNjYXBhYmxlLnRlc3Qoc3Viai5jaGFyQXQodGhpcy5wb3MpKSkge1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KHN1YmouY2hhckF0KHRoaXMucG9zKSkpO1xuICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoJ1xcXFwnKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBhbiBhdXRvbGluayAoVVJMIG9yIGVtYWlsIGluIHBvaW50eSBicmFja2V0cykuXG52YXIgcGFyc2VBdXRvbGluayA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIG07XG4gICAgdmFyIGRlc3Q7XG4gICAgdmFyIG5vZGU7XG4gICAgaWYgKChtID0gdGhpcy5tYXRjaChyZUVtYWlsQXV0b2xpbmspKSkge1xuICAgICAgICBkZXN0ID0gbS5zbGljZSgxLCBtLmxlbmd0aCAtIDEpO1xuICAgICAgICBub2RlID0gbmV3IE5vZGUoJ2xpbmsnKTtcbiAgICAgICAgbm9kZS5fZGVzdGluYXRpb24gPSBub3JtYWxpemVVUkkoJ21haWx0bzonICsgZGVzdCk7XG4gICAgICAgIG5vZGUuX3RpdGxlID0gJyc7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dChkZXN0KSk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKChtID0gdGhpcy5tYXRjaChyZUF1dG9saW5rKSkpIHtcbiAgICAgICAgZGVzdCA9IG0uc2xpY2UoMSwgbS5sZW5ndGggLSAxKTtcbiAgICAgICAgbm9kZSA9IG5ldyBOb2RlKCdsaW5rJyk7XG4gICAgICAgIG5vZGUuX2Rlc3RpbmF0aW9uID0gbm9ybWFsaXplVVJJKGRlc3QpO1xuICAgICAgICBub2RlLl90aXRsZSA9ICcnO1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRleHQoZGVzdCkpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYSByYXcgSFRNTCB0YWcuXG52YXIgcGFyc2VIdG1sVGFnID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgbSA9IHRoaXMubWF0Y2gocmVIdG1sVGFnKTtcbiAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgTm9kZSgnaHRtbF9pbmxpbmUnKTtcbiAgICAgICAgbm9kZS5fbGl0ZXJhbCA9IG07XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG4vLyBTY2FuIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyB3aXRoIGNvZGUgY2MsIGFuZCByZXR1cm4gaW5mb3JtYXRpb24gYWJvdXRcbi8vIHRoZSBudW1iZXIgb2YgZGVsaW1pdGVycyBhbmQgd2hldGhlciB0aGV5IGFyZSBwb3NpdGlvbmVkIHN1Y2ggdGhhdFxuLy8gdGhleSBjYW4gb3BlbiBhbmQvb3IgY2xvc2UgZW1waGFzaXMgb3Igc3Ryb25nIGVtcGhhc2lzLiAgQSB1dGlsaXR5XG4vLyBmdW5jdGlvbiBmb3Igc3Ryb25nL2VtcGggcGFyc2luZy5cbnZhciBzY2FuRGVsaW1zID0gZnVuY3Rpb24oY2MpIHtcbiAgICB2YXIgbnVtZGVsaW1zID0gMDtcbiAgICB2YXIgY2hhcl9iZWZvcmUsIGNoYXJfYWZ0ZXIsIGNjX2FmdGVyO1xuICAgIHZhciBzdGFydHBvcyA9IHRoaXMucG9zO1xuICAgIHZhciBsZWZ0X2ZsYW5raW5nLCByaWdodF9mbGFua2luZywgY2FuX29wZW4sIGNhbl9jbG9zZTtcbiAgICB2YXIgYWZ0ZXJfaXNfd2hpdGVzcGFjZSwgYWZ0ZXJfaXNfcHVuY3R1YXRpb24sIGJlZm9yZV9pc193aGl0ZXNwYWNlLCBiZWZvcmVfaXNfcHVuY3R1YXRpb247XG5cbiAgICBpZiAoY2MgPT09IENfU0lOR0xFUVVPVEUgfHwgY2MgPT09IENfRE9VQkxFUVVPVEUpIHtcbiAgICAgICAgbnVtZGVsaW1zKys7XG4gICAgICAgIHRoaXMucG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKHRoaXMucGVlaygpID09PSBjYykge1xuICAgICAgICAgICAgbnVtZGVsaW1zKys7XG4gICAgICAgICAgICB0aGlzLnBvcysrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG51bWRlbGltcyA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjaGFyX2JlZm9yZSA9IHN0YXJ0cG9zID09PSAwID8gJ1xcbicgOiB0aGlzLnN1YmplY3QuY2hhckF0KHN0YXJ0cG9zIC0gMSk7XG5cbiAgICBjY19hZnRlciA9IHRoaXMucGVlaygpO1xuICAgIGlmIChjY19hZnRlciA9PT0gLTEpIHtcbiAgICAgICAgY2hhcl9hZnRlciA9ICdcXG4nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYXJfYWZ0ZXIgPSBmcm9tQ29kZVBvaW50KGNjX2FmdGVyKTtcbiAgICB9XG5cbiAgICBhZnRlcl9pc193aGl0ZXNwYWNlID0gcmVVbmljb2RlV2hpdGVzcGFjZUNoYXIudGVzdChjaGFyX2FmdGVyKTtcbiAgICBhZnRlcl9pc19wdW5jdHVhdGlvbiA9IHJlUHVuY3R1YXRpb24udGVzdChjaGFyX2FmdGVyKTtcbiAgICBiZWZvcmVfaXNfd2hpdGVzcGFjZSA9IHJlVW5pY29kZVdoaXRlc3BhY2VDaGFyLnRlc3QoY2hhcl9iZWZvcmUpO1xuICAgIGJlZm9yZV9pc19wdW5jdHVhdGlvbiA9IHJlUHVuY3R1YXRpb24udGVzdChjaGFyX2JlZm9yZSk7XG5cbiAgICBsZWZ0X2ZsYW5raW5nID0gIWFmdGVyX2lzX3doaXRlc3BhY2UgJiZcbiAgICAgICAgICAgICghYWZ0ZXJfaXNfcHVuY3R1YXRpb24gfHwgYmVmb3JlX2lzX3doaXRlc3BhY2UgfHwgYmVmb3JlX2lzX3B1bmN0dWF0aW9uKTtcbiAgICByaWdodF9mbGFua2luZyA9ICFiZWZvcmVfaXNfd2hpdGVzcGFjZSAmJlxuICAgICAgICAgICAgKCFiZWZvcmVfaXNfcHVuY3R1YXRpb24gfHwgYWZ0ZXJfaXNfd2hpdGVzcGFjZSB8fCBhZnRlcl9pc19wdW5jdHVhdGlvbik7XG4gICAgaWYgKGNjID09PSBDX1VOREVSU0NPUkUpIHtcbiAgICAgICAgY2FuX29wZW4gPSBsZWZ0X2ZsYW5raW5nICYmXG4gICAgICAgICAgICAoIXJpZ2h0X2ZsYW5raW5nIHx8IGJlZm9yZV9pc19wdW5jdHVhdGlvbik7XG4gICAgICAgIGNhbl9jbG9zZSA9IHJpZ2h0X2ZsYW5raW5nICYmXG4gICAgICAgICAgICAoIWxlZnRfZmxhbmtpbmcgfHwgYWZ0ZXJfaXNfcHVuY3R1YXRpb24pO1xuICAgIH0gZWxzZSBpZiAoY2MgPT09IENfU0lOR0xFUVVPVEUgfHwgY2MgPT09IENfRE9VQkxFUVVPVEUpIHtcbiAgICAgICAgY2FuX29wZW4gPSBsZWZ0X2ZsYW5raW5nICYmICFyaWdodF9mbGFua2luZztcbiAgICAgICAgY2FuX2Nsb3NlID0gcmlnaHRfZmxhbmtpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2FuX29wZW4gPSBsZWZ0X2ZsYW5raW5nO1xuICAgICAgICBjYW5fY2xvc2UgPSByaWdodF9mbGFua2luZztcbiAgICB9XG4gICAgdGhpcy5wb3MgPSBzdGFydHBvcztcbiAgICByZXR1cm4geyBudW1kZWxpbXM6IG51bWRlbGltcyxcbiAgICAgICAgICAgICBjYW5fb3BlbjogY2FuX29wZW4sXG4gICAgICAgICAgICAgY2FuX2Nsb3NlOiBjYW5fY2xvc2UgfTtcbn07XG5cbi8vIEhhbmRsZSBhIGRlbGltaXRlciBtYXJrZXIgZm9yIGVtcGhhc2lzIG9yIGEgcXVvdGUuXG52YXIgaGFuZGxlRGVsaW0gPSBmdW5jdGlvbihjYywgYmxvY2spIHtcbiAgICB2YXIgcmVzID0gdGhpcy5zY2FuRGVsaW1zKGNjKTtcbiAgICBpZiAoIXJlcykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBudW1kZWxpbXMgPSByZXMubnVtZGVsaW1zO1xuICAgIHZhciBzdGFydHBvcyA9IHRoaXMucG9zO1xuICAgIHZhciBjb250ZW50cztcblxuICAgIHRoaXMucG9zICs9IG51bWRlbGltcztcbiAgICBpZiAoY2MgPT09IENfU0lOR0xFUVVPVEUpIHtcbiAgICAgICAgY29udGVudHMgPSBcIlxcdTIwMTlcIjtcbiAgICB9IGVsc2UgaWYgKGNjID09PSBDX0RPVUJMRVFVT1RFKSB7XG4gICAgICAgIGNvbnRlbnRzID0gXCJcXHUyMDFDXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudHMgPSB0aGlzLnN1YmplY3Quc2xpY2Uoc3RhcnRwb3MsIHRoaXMucG9zKTtcbiAgICB9XG4gICAgdmFyIG5vZGUgPSB0ZXh0KGNvbnRlbnRzKTtcbiAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgIC8vIEFkZCBlbnRyeSB0byBzdGFjayBmb3IgdGhpcyBvcGVuZXJcbiAgICB0aGlzLmRlbGltaXRlcnMgPSB7IGNjOiBjYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWRlbGltczogbnVtZGVsaW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2RlbGltczogbnVtZGVsaW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzOiB0aGlzLmRlbGltaXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuX29wZW46IHJlcy5jYW5fb3BlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbl9jbG9zZTogcmVzLmNhbl9jbG9zZSB9O1xuICAgIGlmICh0aGlzLmRlbGltaXRlcnMucHJldmlvdXMgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5kZWxpbWl0ZXJzLnByZXZpb3VzLm5leHQgPSB0aGlzLmRlbGltaXRlcnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG5cbn07XG5cbnZhciByZW1vdmVEZWxpbWl0ZXIgPSBmdW5jdGlvbihkZWxpbSkge1xuICAgIGlmIChkZWxpbS5wcmV2aW91cyAhPT0gbnVsbCkge1xuICAgICAgICBkZWxpbS5wcmV2aW91cy5uZXh0ID0gZGVsaW0ubmV4dDtcbiAgICB9XG4gICAgaWYgKGRlbGltLm5leHQgPT09IG51bGwpIHtcbiAgICAgICAgLy8gdG9wIG9mIHN0YWNrXG4gICAgICAgIHRoaXMuZGVsaW1pdGVycyA9IGRlbGltLnByZXZpb3VzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGltLm5leHQucHJldmlvdXMgPSBkZWxpbS5wcmV2aW91cztcbiAgICB9XG59O1xuXG52YXIgcmVtb3ZlRGVsaW1pdGVyc0JldHdlZW4gPSBmdW5jdGlvbihib3R0b20sIHRvcCkge1xuICAgIGlmIChib3R0b20ubmV4dCAhPT0gdG9wKSB7XG4gICAgICAgIGJvdHRvbS5uZXh0ID0gdG9wO1xuICAgICAgICB0b3AucHJldmlvdXMgPSBib3R0b207XG4gICAgfVxufTtcblxudmFyIHByb2Nlc3NFbXBoYXNpcyA9IGZ1bmN0aW9uKHN0YWNrX2JvdHRvbSkge1xuICAgIHZhciBvcGVuZXIsIGNsb3Nlciwgb2xkX2Nsb3NlcjtcbiAgICB2YXIgb3BlbmVyX2lubCwgY2xvc2VyX2lubDtcbiAgICB2YXIgdGVtcHN0YWNrO1xuICAgIHZhciB1c2VfZGVsaW1zO1xuICAgIHZhciB0bXAsIG5leHQ7XG4gICAgdmFyIG9wZW5lcl9mb3VuZDtcbiAgICB2YXIgb3BlbmVyc19ib3R0b20gPSBbXTtcbiAgICB2YXIgb2RkX21hdGNoID0gZmFsc2U7XG5cbiAgICBvcGVuZXJzX2JvdHRvbVtDX1VOREVSU0NPUkVdID0gc3RhY2tfYm90dG9tO1xuICAgIG9wZW5lcnNfYm90dG9tW0NfQVNURVJJU0tdID0gc3RhY2tfYm90dG9tO1xuICAgIG9wZW5lcnNfYm90dG9tW0NfU0lOR0xFUVVPVEVdID0gc3RhY2tfYm90dG9tO1xuICAgIG9wZW5lcnNfYm90dG9tW0NfRE9VQkxFUVVPVEVdID0gc3RhY2tfYm90dG9tO1xuXG4gICAgLy8gZmluZCBmaXJzdCBjbG9zZXIgYWJvdmUgc3RhY2tfYm90dG9tOlxuICAgIGNsb3NlciA9IHRoaXMuZGVsaW1pdGVycztcbiAgICB3aGlsZSAoY2xvc2VyICE9PSBudWxsICYmIGNsb3Nlci5wcmV2aW91cyAhPT0gc3RhY2tfYm90dG9tKSB7XG4gICAgICAgIGNsb3NlciA9IGNsb3Nlci5wcmV2aW91cztcbiAgICB9XG4gICAgLy8gbW92ZSBmb3J3YXJkLCBsb29raW5nIGZvciBjbG9zZXJzLCBhbmQgaGFuZGxpbmcgZWFjaFxuICAgIHdoaWxlIChjbG9zZXIgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGNsb3NlcmNjID0gY2xvc2VyLmNjO1xuICAgICAgICBpZiAoIWNsb3Nlci5jYW5fY2xvc2UpIHtcbiAgICAgICAgICAgIGNsb3NlciA9IGNsb3Nlci5uZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZm91bmQgZW1waGFzaXMgY2xvc2VyLiBub3cgbG9vayBiYWNrIGZvciBmaXJzdCBtYXRjaGluZyBvcGVuZXI6XG4gICAgICAgICAgICBvcGVuZXIgPSBjbG9zZXIucHJldmlvdXM7XG4gICAgICAgICAgICBvcGVuZXJfZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlIChvcGVuZXIgIT09IG51bGwgJiYgb3BlbmVyICE9PSBzdGFja19ib3R0b20gJiZcbiAgICAgICAgICAgICAgICAgICBvcGVuZXIgIT09IG9wZW5lcnNfYm90dG9tW2Nsb3NlcmNjXSkge1xuICAgICAgICAgICAgICAgIG9kZF9tYXRjaCA9IChjbG9zZXIuY2FuX29wZW4gfHwgb3BlbmVyLmNhbl9jbG9zZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKG9wZW5lci5vcmlnZGVsaW1zICsgY2xvc2VyLm9yaWdkZWxpbXMpICUgMyA9PT0gMDtcbiAgICAgICAgICAgICAgICBpZiAob3BlbmVyLmNjID09PSBjbG9zZXIuY2MgJiYgb3BlbmVyLmNhbl9vcGVuICYmICFvZGRfbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wZW5lciA9IG9wZW5lci5wcmV2aW91cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9sZF9jbG9zZXIgPSBjbG9zZXI7XG5cbiAgICAgICAgICAgIGlmIChjbG9zZXJjYyA9PT0gQ19BU1RFUklTSyB8fCBjbG9zZXJjYyA9PT0gQ19VTkRFUlNDT1JFKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvcGVuZXJfZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VyID0gY2xvc2VyLm5leHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIGFjdHVhbCBudW1iZXIgb2YgZGVsaW1pdGVycyB1c2VkIGZyb20gY2xvc2VyXG4gICAgICAgICAgICAgICAgICAgIHVzZV9kZWxpbXMgPVxuICAgICAgICAgICAgICAgICAgICAgIChjbG9zZXIubnVtZGVsaW1zID49IDIgJiYgb3BlbmVyLm51bWRlbGltcyA+PSAyKSA/IDIgOiAxO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lcl9pbmwgPSBvcGVuZXIubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VyX2lubCA9IGNsb3Nlci5ub2RlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB1c2VkIGRlbGltaXRlcnMgZnJvbSBzdGFjayBlbHRzIGFuZCBpbmxpbmVzXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lci5udW1kZWxpbXMgLT0gdXNlX2RlbGltcztcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VyLm51bWRlbGltcyAtPSB1c2VfZGVsaW1zO1xuICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLl9saXRlcmFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lcl9pbmwuX2xpdGVyYWwuc2xpY2UoMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2lubC5fbGl0ZXJhbC5sZW5ndGggLSB1c2VfZGVsaW1zKTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VyX2lubC5fbGl0ZXJhbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXJfaW5sLl9saXRlcmFsLnNsaWNlKDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlcl9pbmwuX2xpdGVyYWwubGVuZ3RoIC0gdXNlX2RlbGltcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYnVpbGQgY29udGVudHMgZm9yIG5ldyBlbXBoIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVtcGggPSBuZXcgTm9kZSh1c2VfZGVsaW1zID09PSAxID8gJ2VtcGgnIDogJ3N0cm9uZycpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IG9wZW5lcl9pbmwuX25leHQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0bXAgJiYgdG1wICE9PSBjbG9zZXJfaW5sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0ID0gdG1wLl9uZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnVubGluaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1waC5hcHBlbmRDaGlsZCh0bXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gbmV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lcl9pbmwuaW5zZXJ0QWZ0ZXIoZW1waCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGVsdHMgYmV0d2VlbiBvcGVuZXIgYW5kIGNsb3NlciBpbiBkZWxpbWl0ZXJzIHN0YWNrXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZURlbGltaXRlcnNCZXR3ZWVuKG9wZW5lciwgY2xvc2VyKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBvcGVuZXIgaGFzIDAgZGVsaW1zLCByZW1vdmUgaXQgYW5kIHRoZSBpbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5lci5udW1kZWxpbXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lcl9pbmwudW5saW5rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURlbGltaXRlcihvcGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlci5udW1kZWxpbXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlcl9pbmwudW5saW5rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wc3RhY2sgPSBjbG9zZXIubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGVsaW1pdGVyKGNsb3Nlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXIgPSB0ZW1wc3RhY2s7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbG9zZXJjYyA9PT0gQ19TSU5HTEVRVU9URSkge1xuICAgICAgICAgICAgICAgIGNsb3Nlci5ub2RlLl9saXRlcmFsID0gXCJcXHUyMDE5XCI7XG4gICAgICAgICAgICAgICAgaWYgKG9wZW5lcl9mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBvcGVuZXIubm9kZS5fbGl0ZXJhbCA9IFwiXFx1MjAxOFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbG9zZXIgPSBjbG9zZXIubmV4dDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbG9zZXJjYyA9PT0gQ19ET1VCTEVRVU9URSkge1xuICAgICAgICAgICAgICAgIGNsb3Nlci5ub2RlLl9saXRlcmFsID0gXCJcXHUyMDFEXCI7XG4gICAgICAgICAgICAgICAgaWYgKG9wZW5lcl9mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBvcGVuZXIubm9kZS5saXRlcmFsID0gXCJcXHUyMDFDXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsb3NlciA9IGNsb3Nlci5uZXh0O1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9wZW5lcl9mb3VuZCAmJiAhb2RkX21hdGNoKSB7XG4gICAgICAgICAgICAgICAgLy8gU2V0IGxvd2VyIGJvdW5kIGZvciBmdXR1cmUgc2VhcmNoZXMgZm9yIG9wZW5lcnM6XG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgZG8gdGhpcyB3aXRoIG9kZF9tYXRjaCBiZWNhdXNlIGEgKipcbiAgICAgICAgICAgICAgICAvLyB0aGF0IGRvZXNuJ3QgbWF0Y2ggYW4gZWFybGllciAqIG1pZ2h0IHR1cm4gaW50b1xuICAgICAgICAgICAgICAgIC8vIGFuIG9wZW5lciwgYW5kIHRoZSAqIG1pZ2h0IGJlIG1hdGNoZWQgYnkgc29tZXRoaW5nXG4gICAgICAgICAgICAgICAgLy8gZWxzZS5cbiAgICAgICAgICAgICAgICBvcGVuZXJzX2JvdHRvbVtjbG9zZXJjY10gPSBvbGRfY2xvc2VyLnByZXZpb3VzO1xuICAgICAgICAgICAgICAgIGlmICghb2xkX2Nsb3Nlci5jYW5fb3Blbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4gcmVtb3ZlIGEgY2xvc2VyIHRoYXQgY2FuJ3QgYmUgYW4gb3BlbmVyLFxuICAgICAgICAgICAgICAgICAgICAvLyBvbmNlIHdlJ3ZlIHNlZW4gdGhlcmUncyBubyBtYXRjaGluZyBvcGVuZXI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGVsaW1pdGVyKG9sZF9jbG9zZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGFsbCBkZWxpbWl0ZXJzXG4gICAgd2hpbGUgKHRoaXMuZGVsaW1pdGVycyAhPT0gbnVsbCAmJiB0aGlzLmRlbGltaXRlcnMgIT09IHN0YWNrX2JvdHRvbSkge1xuICAgICAgICB0aGlzLnJlbW92ZURlbGltaXRlcih0aGlzLmRlbGltaXRlcnMpO1xuICAgIH1cbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgbGluayB0aXRsZSAoc2FucyBxdW90ZXMpLCByZXR1cm5pbmcgdGhlIHN0cmluZ1xuLy8gb3IgbnVsbCBpZiBubyBtYXRjaC5cbnZhciBwYXJzZUxpbmtUaXRsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aXRsZSA9IHRoaXMubWF0Y2gocmVMaW5rVGl0bGUpO1xuICAgIGlmICh0aXRsZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjaG9wIG9mZiBxdW90ZXMgZnJvbSB0aXRsZSBhbmQgdW5lc2NhcGU6XG4gICAgICAgIHJldHVybiB1bmVzY2FwZVN0cmluZyh0aXRsZS5zdWJzdHIoMSwgdGl0bGUubGVuZ3RoIC0gMikpO1xuICAgIH1cbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgbGluayBkZXN0aW5hdGlvbiwgcmV0dXJuaW5nIHRoZSBzdHJpbmcgb3Jcbi8vIG51bGwgaWYgbm8gbWF0Y2guXG52YXIgcGFyc2VMaW5rRGVzdGluYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzID0gdGhpcy5tYXRjaChyZUxpbmtEZXN0aW5hdGlvbkJyYWNlcyk7XG4gICAgaWYgKHJlcyA9PT0gbnVsbCkge1xuICAgICAgICAvLyBUT0RPIGhhbmRyb2xsZWQgcGFyc2VyOyByZXMgc2hvdWxkIGJlIG51bGwgb3IgdGhlIHN0cmluZ1xuICAgICAgICB2YXIgc2F2ZXBvcyA9IHRoaXMucG9zO1xuICAgICAgICB2YXIgb3BlbnBhcmVucyA9IDA7XG4gICAgICAgIHZhciBjO1xuICAgICAgICB3aGlsZSAoKGMgPSB0aGlzLnBlZWsoKSkgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoYyA9PT0gQ19CQUNLU0xBU0gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBlZWsoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09IENfT1BFTl9QQVJFTikge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICAgICAgb3BlbnBhcmVucyArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSBDX0NMT1NFX1BBUkVOKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wZW5wYXJlbnMgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5wYXJlbnMgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlV2hpdGVzcGFjZUNoYXIuZXhlYyhmcm9tQ29kZVBvaW50KGMpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcyA9IHRoaXMuc3ViamVjdC5zdWJzdHIoc2F2ZXBvcywgdGhpcy5wb3MgLSBzYXZlcG9zKTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVVSSSh1bmVzY2FwZVN0cmluZyhyZXMpKTtcbiAgICB9IGVsc2UgeyAgLy8gY2hvcCBvZmYgc3Vycm91bmRpbmcgPC4uPjpcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVVSSSh1bmVzY2FwZVN0cmluZyhyZXMuc3Vic3RyKDEsIHJlcy5sZW5ndGggLSAyKSkpO1xuICAgIH1cbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYSBsaW5rIGxhYmVsLCByZXR1cm5pbmcgbnVtYmVyIG9mIGNoYXJhY3RlcnMgcGFyc2VkLlxudmFyIHBhcnNlTGlua0xhYmVsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG0gPSB0aGlzLm1hdGNoKHJlTGlua0xhYmVsKTtcbiAgICAvLyBOb3RlOiAgb3VyIHJlZ2V4IHdpbGwgYWxsb3cgc29tZXRoaW5nIG9mIGZvcm0gWy4uXFxdO1xuICAgIC8vIHdlIGRpc2FsbG93IGl0IGhlcmUgcmF0aGVyIHRoYW4gdXNpbmcgbG9va2FoZWFkIGluIHRoZSByZWdleDpcbiAgICBpZiAobSA9PT0gbnVsbCB8fCBtLmxlbmd0aCA+IDEwMDEgfHwgL1teXFxcXF1cXFxcXFxdJC8uZXhlYyhtKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbS5sZW5ndGg7XG4gICAgfVxufTtcblxuLy8gQWRkIG9wZW4gYnJhY2tldCB0byBkZWxpbWl0ZXIgc3RhY2sgYW5kIGFkZCBhIHRleHQgbm9kZSB0byBibG9jaydzIGNoaWxkcmVuLlxudmFyIHBhcnNlT3BlbkJyYWNrZXQgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBzdGFydHBvcyA9IHRoaXMucG9zO1xuICAgIHRoaXMucG9zICs9IDE7XG5cbiAgICB2YXIgbm9kZSA9IHRleHQoJ1snKTtcbiAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgIC8vIEFkZCBlbnRyeSB0byBzdGFjayBmb3IgdGhpcyBvcGVuZXJcbiAgICB0aGlzLmFkZEJyYWNrZXQobm9kZSwgc3RhcnRwb3MsIGZhbHNlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIElGIG5leHQgY2hhcmFjdGVyIGlzIFssIGFuZCAhIGRlbGltaXRlciB0byBkZWxpbWl0ZXIgc3RhY2sgYW5kXG4vLyBhZGQgYSB0ZXh0IG5vZGUgdG8gYmxvY2sncyBjaGlsZHJlbi4gIE90aGVyd2lzZSBqdXN0IGFkZCBhIHRleHQgbm9kZS5cbnZhciBwYXJzZUJhbmcgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBzdGFydHBvcyA9IHRoaXMucG9zO1xuICAgIHRoaXMucG9zICs9IDE7XG4gICAgaWYgKHRoaXMucGVlaygpID09PSBDX09QRU5fQlJBQ0tFVCkge1xuICAgICAgICB0aGlzLnBvcyArPSAxO1xuXG4gICAgICAgIHZhciBub2RlID0gdGV4dCgnIVsnKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgICAgICAgLy8gQWRkIGVudHJ5IHRvIHN0YWNrIGZvciB0aGlzIG9wZW5lclxuICAgICAgICB0aGlzLmFkZEJyYWNrZXQobm9kZSwgc3RhcnRwb3MgKyAxLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCchJykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIFRyeSB0byBtYXRjaCBjbG9zZSBicmFja2V0IGFnYWluc3QgYW4gb3BlbmluZyBpbiB0aGUgZGVsaW1pdGVyXG4vLyBzdGFjay4gIEFkZCBlaXRoZXIgYSBsaW5rIG9yIGltYWdlLCBvciBhIHBsYWluIFsgY2hhcmFjdGVyLFxuLy8gdG8gYmxvY2sncyBjaGlsZHJlbi4gIElmIHRoZXJlIGlzIGEgbWF0Y2hpbmcgZGVsaW1pdGVyLFxuLy8gcmVtb3ZlIGl0IGZyb20gdGhlIGRlbGltaXRlciBzdGFjay5cbnZhciBwYXJzZUNsb3NlQnJhY2tldCA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIHN0YXJ0cG9zO1xuICAgIHZhciBpc19pbWFnZTtcbiAgICB2YXIgZGVzdDtcbiAgICB2YXIgdGl0bGU7XG4gICAgdmFyIG1hdGNoZWQgPSBmYWxzZTtcbiAgICB2YXIgcmVmbGFiZWw7XG4gICAgdmFyIG9wZW5lcjtcblxuICAgIHRoaXMucG9zICs9IDE7XG4gICAgc3RhcnRwb3MgPSB0aGlzLnBvcztcblxuICAgIC8vIGdldCBsYXN0IFsgb3IgIVtcbiAgICBvcGVuZXIgPSB0aGlzLmJyYWNrZXRzO1xuXG4gICAgaWYgKG9wZW5lciA9PT0gbnVsbCkge1xuICAgICAgICAvLyBubyBtYXRjaGVkIG9wZW5lciwganVzdCByZXR1cm4gYSBsaXRlcmFsXG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoJ10nKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICghb3BlbmVyLmFjdGl2ZSkge1xuICAgICAgICAvLyBubyBtYXRjaGVkIG9wZW5lciwganVzdCByZXR1cm4gYSBsaXRlcmFsXG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoJ10nKSk7XG4gICAgICAgIC8vIHRha2Ugb3BlbmVyIG9mZiBicmFja2V0cyBzdGFja1xuICAgICAgICB0aGlzLnJlbW92ZUJyYWNrZXQoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgZ290IGhlcmUsIG9wZW4gaXMgYSBwb3RlbnRpYWwgb3BlbmVyXG4gICAgaXNfaW1hZ2UgPSBvcGVuZXIuaW1hZ2U7XG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIGxpbmsvaW1hZ2VcblxuICAgIHZhciBzYXZlcG9zID0gdGhpcy5wb3M7XG5cbiAgICAvLyBJbmxpbmUgbGluaz9cbiAgICBpZiAodGhpcy5wZWVrKCkgPT09IENfT1BFTl9QQVJFTikge1xuICAgICAgICB0aGlzLnBvcysrO1xuICAgICAgICBpZiAodGhpcy5zcG5sKCkgJiZcbiAgICAgICAgICAgICgoZGVzdCA9IHRoaXMucGFyc2VMaW5rRGVzdGluYXRpb24oKSkgIT09IG51bGwpICYmXG4gICAgICAgICAgICB0aGlzLnNwbmwoKSAmJlxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZXJlJ3MgYSBzcGFjZSBiZWZvcmUgdGhlIHRpdGxlOlxuICAgICAgICAgICAgKHJlV2hpdGVzcGFjZUNoYXIudGVzdCh0aGlzLnN1YmplY3QuY2hhckF0KHRoaXMucG9zIC0gMSkpICYmXG4gICAgICAgICAgICAgKHRpdGxlID0gdGhpcy5wYXJzZUxpbmtUaXRsZSgpKSB8fCB0cnVlKSAmJlxuICAgICAgICAgICAgdGhpcy5zcG5sKCkgJiZcbiAgICAgICAgICAgIHRoaXMucGVlaygpID09PSBDX0NMT1NFX1BBUkVOKSB7XG4gICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBvcyA9IHNhdmVwb3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW1hdGNoZWQpIHtcblxuICAgICAgICAvLyBOZXh0LCBzZWUgaWYgdGhlcmUncyBhIGxpbmsgbGFiZWxcbiAgICAgICAgdmFyIGJlZm9yZWxhYmVsID0gdGhpcy5wb3M7XG4gICAgICAgIHZhciBuID0gdGhpcy5wYXJzZUxpbmtMYWJlbCgpO1xuICAgICAgICBpZiAobiA+IDIpIHtcbiAgICAgICAgICAgIHJlZmxhYmVsID0gdGhpcy5zdWJqZWN0LnNsaWNlKGJlZm9yZWxhYmVsLCBiZWZvcmVsYWJlbCArIG4pO1xuICAgICAgICB9IGVsc2UgaWYgKCFvcGVuZXIuYnJhY2tldEFmdGVyKSB7XG4gICAgICAgICAgICAvLyBFbXB0eSBvciBtaXNzaW5nIHNlY29uZCBsYWJlbCBtZWFucyB0byB1c2UgdGhlIGZpcnN0IGxhYmVsIGFzIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAgICAvLyBUaGUgcmVmZXJlbmNlIG11c3Qgbm90IGNvbnRhaW4gYSBicmFja2V0LiBJZiB3ZSBrbm93IHRoZXJlJ3MgYSBicmFja2V0LCB3ZSBkb24ndCBldmVuIGJvdGhlciBjaGVja2luZyBpdC5cbiAgICAgICAgICAgIHJlZmxhYmVsID0gdGhpcy5zdWJqZWN0LnNsaWNlKG9wZW5lci5pbmRleCwgc3RhcnRwb3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgICAvLyBJZiBzaG9ydGN1dCByZWZlcmVuY2UgbGluaywgcmV3aW5kIGJlZm9yZSBzcGFjZXMgd2Ugc2tpcHBlZC5cbiAgICAgICAgICAgIHRoaXMucG9zID0gc2F2ZXBvcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWZsYWJlbCkge1xuICAgICAgICAgICAgLy8gbG9va3VwIHJhd2xhYmVsIGluIHJlZm1hcFxuICAgICAgICAgICAgdmFyIGxpbmsgPSB0aGlzLnJlZm1hcFtub3JtYWxpemVSZWZlcmVuY2UocmVmbGFiZWwpXTtcbiAgICAgICAgICAgIGlmIChsaW5rKSB7XG4gICAgICAgICAgICAgICAgZGVzdCA9IGxpbmsuZGVzdGluYXRpb247XG4gICAgICAgICAgICAgICAgdGl0bGUgPSBsaW5rLnRpdGxlO1xuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgTm9kZShpc19pbWFnZSA/ICdpbWFnZScgOiAnbGluaycpO1xuICAgICAgICBub2RlLl9kZXN0aW5hdGlvbiA9IGRlc3Q7XG4gICAgICAgIG5vZGUuX3RpdGxlID0gdGl0bGUgfHwgJyc7XG5cbiAgICAgICAgdmFyIHRtcCwgbmV4dDtcbiAgICAgICAgdG1wID0gb3BlbmVyLm5vZGUuX25leHQ7XG4gICAgICAgIHdoaWxlICh0bXApIHtcbiAgICAgICAgICAgIG5leHQgPSB0bXAuX25leHQ7XG4gICAgICAgICAgICB0bXAudW5saW5rKCk7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRtcCk7XG4gICAgICAgICAgICB0bXAgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICB0aGlzLnByb2Nlc3NFbXBoYXNpcyhvcGVuZXIucHJldmlvdXNEZWxpbWl0ZXIpO1xuICAgICAgICB0aGlzLnJlbW92ZUJyYWNrZXQoKTtcbiAgICAgICAgb3BlbmVyLm5vZGUudW5saW5rKCk7XG5cbiAgICAgICAgLy8gV2UgcmVtb3ZlIHRoaXMgYnJhY2tldCBhbmQgcHJvY2Vzc0VtcGhhc2lzIHdpbGwgcmVtb3ZlIGxhdGVyIGRlbGltaXRlcnMuXG4gICAgICAgIC8vIE5vdywgZm9yIGEgbGluaywgd2UgYWxzbyBkZWFjdGl2YXRlIGVhcmxpZXIgbGluayBvcGVuZXJzLlxuICAgICAgICAvLyAobm8gbGlua3MgaW4gbGlua3MpXG4gICAgICAgIGlmICghaXNfaW1hZ2UpIHtcbiAgICAgICAgICBvcGVuZXIgPSB0aGlzLmJyYWNrZXRzO1xuICAgICAgICAgIHdoaWxlIChvcGVuZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghb3BlbmVyLmltYWdlKSB7XG4gICAgICAgICAgICAgICAgb3BlbmVyLmFjdGl2ZSA9IGZhbHNlOyAvLyBkZWFjdGl2YXRlIHRoaXMgb3BlbmVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGVuZXIgPSBvcGVuZXIucHJldmlvdXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9IGVsc2UgeyAvLyBubyBtYXRjaFxuXG4gICAgICAgIHRoaXMucmVtb3ZlQnJhY2tldCgpOyAgLy8gcmVtb3ZlIHRoaXMgb3BlbmVyIGZyb20gc3RhY2tcbiAgICAgICAgdGhpcy5wb3MgPSBzdGFydHBvcztcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dCgnXScpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59O1xuXG52YXIgYWRkQnJhY2tldCA9IGZ1bmN0aW9uKG5vZGUsIGluZGV4LCBpbWFnZSkge1xuICAgIGlmICh0aGlzLmJyYWNrZXRzICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYnJhY2tldHMuYnJhY2tldEFmdGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5icmFja2V0cyA9IHsgbm9kZTogbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91czogdGhpcy5icmFja2V0cyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0RlbGltaXRlcjogdGhpcy5kZWxpbWl0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlIH07XG59O1xuXG52YXIgcmVtb3ZlQnJhY2tldCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnJhY2tldHMgPSB0aGlzLmJyYWNrZXRzLnByZXZpb3VzO1xufTtcblxuLy8gQXR0ZW1wdCB0byBwYXJzZSBhbiBlbnRpdHkuXG52YXIgcGFyc2VFbnRpdHkgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBtO1xuICAgIGlmICgobSA9IHRoaXMubWF0Y2gocmVFbnRpdHlIZXJlKSkpIHtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dChkZWNvZGVIVE1MKG0pKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vLyBQYXJzZSBhIHJ1biBvZiBvcmRpbmFyeSBjaGFyYWN0ZXJzLCBvciBhIHNpbmdsZSBjaGFyYWN0ZXIgd2l0aFxuLy8gYSBzcGVjaWFsIG1lYW5pbmcgaW4gbWFya2Rvd24sIGFzIGEgcGxhaW4gc3RyaW5nLlxudmFyIHBhcnNlU3RyaW5nID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoKG0gPSB0aGlzLm1hdGNoKHJlTWFpbikpKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc21hcnQpIHtcbiAgICAgICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoXG4gICAgICAgICAgICAgICAgbS5yZXBsYWNlKHJlRWxsaXBzZXMsIFwiXFx1MjAyNlwiKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShyZURhc2gsIGZ1bmN0aW9uKGNoYXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5Db3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW1Db3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhcnMubGVuZ3RoICUgMyA9PT0gMCkgeyAvLyBJZiBkaXZpc2libGUgYnkgMywgdXNlIGFsbCBlbSBkYXNoZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbUNvdW50ID0gY2hhcnMubGVuZ3RoIC8gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcnMubGVuZ3RoICUgMiA9PT0gMCkgeyAvLyBJZiBkaXZpc2libGUgYnkgMiwgdXNlIGFsbCBlbiBkYXNoZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbkNvdW50ID0gY2hhcnMubGVuZ3RoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcnMubGVuZ3RoICUgMyA9PT0gMikgeyAvLyBJZiAyIGV4dHJhIGRhc2hlcywgdXNlIGVuIGRhc2ggZm9yIGxhc3QgMjsgZW0gZGFzaGVzIGZvciByZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5Db3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1Db3VudCA9IChjaGFycy5sZW5ndGggLSAyKSAvIDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBVc2UgZW4gZGFzaGVzIGZvciBsYXN0IDQgaHlwaGVuczsgZW0gZGFzaGVzIGZvciByZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5Db3VudCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1Db3VudCA9IChjaGFycy5sZW5ndGggLSA0KSAvIDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcXHUyMDE0XCIucmVwZWF0KGVtQ291bnQpICsgXCJcXHUyMDEzXCIucmVwZWF0KGVuQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dChtKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbi8vIFBhcnNlIGEgbmV3bGluZS4gIElmIGl0IHdhcyBwcmVjZWRlZCBieSB0d28gc3BhY2VzLCByZXR1cm4gYSBoYXJkXG4vLyBsaW5lIGJyZWFrOyBvdGhlcndpc2UgYSBzb2Z0IGxpbmUgYnJlYWsuXG52YXIgcGFyc2VOZXdsaW5lID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB0aGlzLnBvcyArPSAxOyAvLyBhc3N1bWUgd2UncmUgYXQgYSBcXG5cbiAgICAvLyBjaGVjayBwcmV2aW91cyBub2RlIGZvciB0cmFpbGluZyBzcGFjZXNcbiAgICB2YXIgbGFzdGMgPSBibG9jay5fbGFzdENoaWxkO1xuICAgIGlmIChsYXN0YyAmJiBsYXN0Yy50eXBlID09PSAndGV4dCcgJiYgbGFzdGMuX2xpdGVyYWxbbGFzdGMuX2xpdGVyYWwubGVuZ3RoIC0gMV0gPT09ICcgJykge1xuICAgICAgICB2YXIgaGFyZGJyZWFrID0gbGFzdGMuX2xpdGVyYWxbbGFzdGMuX2xpdGVyYWwubGVuZ3RoIC0gMl0gPT09ICcgJztcbiAgICAgICAgbGFzdGMuX2xpdGVyYWwgPSBsYXN0Yy5fbGl0ZXJhbC5yZXBsYWNlKHJlRmluYWxTcGFjZSwgJycpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChuZXcgTm9kZShoYXJkYnJlYWsgPyAnbGluZWJyZWFrJyA6ICdzb2Z0YnJlYWsnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobmV3IE5vZGUoJ3NvZnRicmVhaycpKTtcbiAgICB9XG4gICAgdGhpcy5tYXRjaChyZUluaXRpYWxTcGFjZSk7IC8vIGdvYmJsZSBsZWFkaW5nIHNwYWNlcyBpbiBuZXh0IGxpbmVcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYSBsaW5rIHJlZmVyZW5jZSwgbW9kaWZ5aW5nIHJlZm1hcC5cbnZhciBwYXJzZVJlZmVyZW5jZSA9IGZ1bmN0aW9uKHMsIHJlZm1hcCkge1xuICAgIHRoaXMuc3ViamVjdCA9IHM7XG4gICAgdGhpcy5wb3MgPSAwO1xuICAgIHZhciByYXdsYWJlbDtcbiAgICB2YXIgZGVzdDtcbiAgICB2YXIgdGl0bGU7XG4gICAgdmFyIG1hdGNoQ2hhcnM7XG4gICAgdmFyIHN0YXJ0cG9zID0gdGhpcy5wb3M7XG5cbiAgICAvLyBsYWJlbDpcbiAgICBtYXRjaENoYXJzID0gdGhpcy5wYXJzZUxpbmtMYWJlbCgpO1xuICAgIGlmIChtYXRjaENoYXJzID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd2xhYmVsID0gdGhpcy5zdWJqZWN0LnN1YnN0cigwLCBtYXRjaENoYXJzKTtcbiAgICB9XG5cbiAgICAvLyBjb2xvbjpcbiAgICBpZiAodGhpcy5wZWVrKCkgPT09IENfQ09MT04pIHtcbiAgICAgICAgdGhpcy5wb3MrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyAgbGluayB1cmxcbiAgICB0aGlzLnNwbmwoKTtcblxuICAgIGRlc3QgPSB0aGlzLnBhcnNlTGlua0Rlc3RpbmF0aW9uKCk7XG4gICAgaWYgKGRlc3QgPT09IG51bGwgfHwgZGVzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5wb3MgPSBzdGFydHBvcztcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdmFyIGJlZm9yZXRpdGxlID0gdGhpcy5wb3M7XG4gICAgdGhpcy5zcG5sKCk7XG4gICAgdGl0bGUgPSB0aGlzLnBhcnNlTGlua1RpdGxlKCk7XG4gICAgaWYgKHRpdGxlID09PSBudWxsKSB7XG4gICAgICAgIHRpdGxlID0gJyc7XG4gICAgICAgIC8vIHJld2luZCBiZWZvcmUgc3BhY2VzXG4gICAgICAgIHRoaXMucG9zID0gYmVmb3JldGl0bGU7XG4gICAgfVxuXG4gICAgLy8gbWFrZSBzdXJlIHdlJ3JlIGF0IGxpbmUgZW5kOlxuICAgIHZhciBhdExpbmVFbmQgPSB0cnVlO1xuICAgIGlmICh0aGlzLm1hdGNoKHJlU3BhY2VBdEVuZE9mTGluZSkgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRpdGxlID09PSAnJykge1xuICAgICAgICAgICAgYXRMaW5lRW5kID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGUgcG90ZW50aWFsIHRpdGxlIHdlIGZvdW5kIGlzIG5vdCBhdCB0aGUgbGluZSBlbmQsXG4gICAgICAgICAgICAvLyBidXQgaXQgY291bGQgc3RpbGwgYmUgYSBsZWdhbCBsaW5rIHJlZmVyZW5jZSBpZiB3ZVxuICAgICAgICAgICAgLy8gZGlzY2FyZCB0aGUgdGl0bGVcbiAgICAgICAgICAgIHRpdGxlID0gJyc7XG4gICAgICAgICAgICAvLyByZXdpbmQgYmVmb3JlIHNwYWNlc1xuICAgICAgICAgICAgdGhpcy5wb3MgPSBiZWZvcmV0aXRsZTtcbiAgICAgICAgICAgIC8vIGFuZCBpbnN0ZWFkIGNoZWNrIGlmIHRoZSBsaW5rIFVSTCBpcyBhdCB0aGUgbGluZSBlbmRcbiAgICAgICAgICAgIGF0TGluZUVuZCA9IHRoaXMubWF0Y2gocmVTcGFjZUF0RW5kT2ZMaW5lKSAhPT0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghYXRMaW5lRW5kKSB7XG4gICAgICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciBub3JtbGFiZWwgPSBub3JtYWxpemVSZWZlcmVuY2UocmF3bGFiZWwpO1xuICAgIGlmIChub3JtbGFiZWwgPT09ICcnKSB7XG4gICAgICAgIC8vIGxhYmVsIG11c3QgY29udGFpbiBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzXG4gICAgICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICghcmVmbWFwW25vcm1sYWJlbF0pIHtcbiAgICAgICAgcmVmbWFwW25vcm1sYWJlbF0gPSB7IGRlc3RpbmF0aW9uOiBkZXN0LCB0aXRsZTogdGl0bGUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucG9zIC0gc3RhcnRwb3M7XG59O1xuXG4vLyBQYXJzZSB0aGUgbmV4dCBpbmxpbmUgZWxlbWVudCBpbiBzdWJqZWN0LCBhZHZhbmNpbmcgc3ViamVjdCBwb3NpdGlvbi5cbi8vIE9uIHN1Y2Nlc3MsIGFkZCB0aGUgcmVzdWx0IHRvIGJsb2NrJ3MgY2hpbGRyZW4gYW5kIHJldHVybiB0cnVlLlxuLy8gT24gZmFpbHVyZSwgcmV0dXJuIGZhbHNlLlxudmFyIHBhcnNlSW5saW5lID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgcmVzID0gZmFsc2U7XG4gICAgdmFyIGMgPSB0aGlzLnBlZWsoKTtcbiAgICBpZiAoYyA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzd2l0Y2goYykge1xuICAgIGNhc2UgQ19ORVdMSU5FOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlTmV3bGluZShibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19CQUNLU0xBU0g6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VCYWNrc2xhc2goYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQkFDS1RJQ0s6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VCYWNrdGlja3MoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQVNURVJJU0s6XG4gICAgY2FzZSBDX1VOREVSU0NPUkU6XG4gICAgICAgIHJlcyA9IHRoaXMuaGFuZGxlRGVsaW0oYywgYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfU0lOR0xFUVVPVEU6XG4gICAgY2FzZSBDX0RPVUJMRVFVT1RFOlxuICAgICAgICByZXMgPSB0aGlzLm9wdGlvbnMuc21hcnQgJiYgdGhpcy5oYW5kbGVEZWxpbShjLCBibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19PUEVOX0JSQUNLRVQ6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VPcGVuQnJhY2tldChibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19CQU5HOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlQmFuZyhibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19DTE9TRV9CUkFDS0VUOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlQ2xvc2VCcmFja2V0KGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0xFU1NUSEFOOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlQXV0b2xpbmsoYmxvY2spIHx8IHRoaXMucGFyc2VIdG1sVGFnKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0FNUEVSU0FORDpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUVudGl0eShibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VTdHJpbmcoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKCFyZXMpIHtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dChmcm9tQ29kZVBvaW50KGMpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBQYXJzZSBzdHJpbmcgY29udGVudCBpbiBibG9jayBpbnRvIGlubGluZSBjaGlsZHJlbixcbi8vIHVzaW5nIHJlZm1hcCB0byByZXNvbHZlIHJlZmVyZW5jZXMuXG52YXIgcGFyc2VJbmxpbmVzID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB0aGlzLnN1YmplY3QgPSBibG9jay5fc3RyaW5nX2NvbnRlbnQudHJpbSgpO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLmRlbGltaXRlcnMgPSBudWxsO1xuICAgIHRoaXMuYnJhY2tldHMgPSBudWxsO1xuICAgIHdoaWxlICh0aGlzLnBhcnNlSW5saW5lKGJsb2NrKSkge1xuICAgIH1cbiAgICBibG9jay5fc3RyaW5nX2NvbnRlbnQgPSBudWxsOyAvLyBhbGxvdyByYXcgc3RyaW5nIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkXG4gICAgdGhpcy5wcm9jZXNzRW1waGFzaXMobnVsbCk7XG59O1xuXG4vLyBUaGUgSW5saW5lUGFyc2VyIG9iamVjdC5cbmZ1bmN0aW9uIElubGluZVBhcnNlcihvcHRpb25zKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJqZWN0OiAnJyxcbiAgICAgICAgZGVsaW1pdGVyczogbnVsbCwgIC8vIHVzZWQgYnkgaGFuZGxlRGVsaW0gbWV0aG9kXG4gICAgICAgIGJyYWNrZXRzOiBudWxsLFxuICAgICAgICBwb3M6IDAsXG4gICAgICAgIHJlZm1hcDoge30sXG4gICAgICAgIG1hdGNoOiBtYXRjaCxcbiAgICAgICAgcGVlazogcGVlayxcbiAgICAgICAgc3BubDogc3BubCxcbiAgICAgICAgcGFyc2VCYWNrdGlja3M6IHBhcnNlQmFja3RpY2tzLFxuICAgICAgICBwYXJzZUJhY2tzbGFzaDogcGFyc2VCYWNrc2xhc2gsXG4gICAgICAgIHBhcnNlQXV0b2xpbms6IHBhcnNlQXV0b2xpbmssXG4gICAgICAgIHBhcnNlSHRtbFRhZzogcGFyc2VIdG1sVGFnLFxuICAgICAgICBzY2FuRGVsaW1zOiBzY2FuRGVsaW1zLFxuICAgICAgICBoYW5kbGVEZWxpbTogaGFuZGxlRGVsaW0sXG4gICAgICAgIHBhcnNlTGlua1RpdGxlOiBwYXJzZUxpbmtUaXRsZSxcbiAgICAgICAgcGFyc2VMaW5rRGVzdGluYXRpb246IHBhcnNlTGlua0Rlc3RpbmF0aW9uLFxuICAgICAgICBwYXJzZUxpbmtMYWJlbDogcGFyc2VMaW5rTGFiZWwsXG4gICAgICAgIHBhcnNlT3BlbkJyYWNrZXQ6IHBhcnNlT3BlbkJyYWNrZXQsXG4gICAgICAgIHBhcnNlQmFuZzogcGFyc2VCYW5nLFxuICAgICAgICBwYXJzZUNsb3NlQnJhY2tldDogcGFyc2VDbG9zZUJyYWNrZXQsXG4gICAgICAgIGFkZEJyYWNrZXQ6IGFkZEJyYWNrZXQsXG4gICAgICAgIHJlbW92ZUJyYWNrZXQ6IHJlbW92ZUJyYWNrZXQsXG4gICAgICAgIHBhcnNlRW50aXR5OiBwYXJzZUVudGl0eSxcbiAgICAgICAgcGFyc2VTdHJpbmc6IHBhcnNlU3RyaW5nLFxuICAgICAgICBwYXJzZU5ld2xpbmU6IHBhcnNlTmV3bGluZSxcbiAgICAgICAgcGFyc2VSZWZlcmVuY2U6IHBhcnNlUmVmZXJlbmNlLFxuICAgICAgICBwYXJzZUlubGluZTogcGFyc2VJbmxpbmUsXG4gICAgICAgIHByb2Nlc3NFbXBoYXNpczogcHJvY2Vzc0VtcGhhc2lzLFxuICAgICAgICByZW1vdmVEZWxpbWl0ZXI6IHJlbW92ZURlbGltaXRlcixcbiAgICAgICAgb3B0aW9uczogb3B0aW9ucyB8fCB7fSxcbiAgICAgICAgcGFyc2U6IHBhcnNlSW5saW5lc1xuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5saW5lUGFyc2VyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvaW5saW5lcy5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIFRoZSBidWxrIG9mIHRoaXMgY29kZSBkZXJpdmVzIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Rtb3Njcm9wL2ZvbGQtY2FzZVxuQnV0IGluIGFkZGl0aW9uIHRvIGNhc2UtZm9sZGluZywgd2UgYWxzbyBub3JtYWxpemUgd2hpdGVzcGFjZS5cblxuZm9sZC1jYXNlIGlzIENvcHlyaWdodCBNYXRoaWFzIEJ5bmVucyA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlLz5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nXG5hIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcblwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xud2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG5wZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cbnRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbmluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG5NRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRVxuTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTlxuT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG5XSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8qZXNsaW50LWRpc2FibGUgIGtleS1zcGFjaW5nLCBjb21tYS1zcGFjaW5nICovXG5cbnZhciByZWdleCA9IC9bIFxcdFxcclxcbl0rfFtBLVpcXHhCNVxceEMwLVxceEQ2XFx4RDgtXFx4REZcXHUwMTAwXFx1MDEwMlxcdTAxMDRcXHUwMTA2XFx1MDEwOFxcdTAxMEFcXHUwMTBDXFx1MDEwRVxcdTAxMTBcXHUwMTEyXFx1MDExNFxcdTAxMTZcXHUwMTE4XFx1MDExQVxcdTAxMUNcXHUwMTFFXFx1MDEyMFxcdTAxMjJcXHUwMTI0XFx1MDEyNlxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMkVcXHUwMTMwXFx1MDEzMlxcdTAxMzRcXHUwMTM2XFx1MDEzOVxcdTAxM0JcXHUwMTNEXFx1MDEzRlxcdTAxNDFcXHUwMTQzXFx1MDE0NVxcdTAxNDdcXHUwMTQ5XFx1MDE0QVxcdTAxNENcXHUwMTRFXFx1MDE1MFxcdTAxNTJcXHUwMTU0XFx1MDE1NlxcdTAxNThcXHUwMTVBXFx1MDE1Q1xcdTAxNUVcXHUwMTYwXFx1MDE2MlxcdTAxNjRcXHUwMTY2XFx1MDE2OFxcdTAxNkFcXHUwMTZDXFx1MDE2RVxcdTAxNzBcXHUwMTcyXFx1MDE3NFxcdTAxNzZcXHUwMTc4XFx1MDE3OVxcdTAxN0JcXHUwMTdEXFx1MDE3RlxcdTAxODFcXHUwMTgyXFx1MDE4NFxcdTAxODZcXHUwMTg3XFx1MDE4OS1cXHUwMThCXFx1MDE4RS1cXHUwMTkxXFx1MDE5M1xcdTAxOTRcXHUwMTk2LVxcdTAxOThcXHUwMTlDXFx1MDE5RFxcdTAxOUZcXHUwMUEwXFx1MDFBMlxcdTAxQTRcXHUwMUE2XFx1MDFBN1xcdTAxQTlcXHUwMUFDXFx1MDFBRVxcdTAxQUZcXHUwMUIxLVxcdTAxQjNcXHUwMUI1XFx1MDFCN1xcdTAxQjhcXHUwMUJDXFx1MDFDNFxcdTAxQzVcXHUwMUM3XFx1MDFDOFxcdTAxQ0FcXHUwMUNCXFx1MDFDRFxcdTAxQ0ZcXHUwMUQxXFx1MDFEM1xcdTAxRDVcXHUwMUQ3XFx1MDFEOVxcdTAxREJcXHUwMURFXFx1MDFFMFxcdTAxRTJcXHUwMUU0XFx1MDFFNlxcdTAxRThcXHUwMUVBXFx1MDFFQ1xcdTAxRUVcXHUwMUYwLVxcdTAxRjJcXHUwMUY0XFx1MDFGNi1cXHUwMUY4XFx1MDFGQVxcdTAxRkNcXHUwMUZFXFx1MDIwMFxcdTAyMDJcXHUwMjA0XFx1MDIwNlxcdTAyMDhcXHUwMjBBXFx1MDIwQ1xcdTAyMEVcXHUwMjEwXFx1MDIxMlxcdTAyMTRcXHUwMjE2XFx1MDIxOFxcdTAyMUFcXHUwMjFDXFx1MDIxRVxcdTAyMjBcXHUwMjIyXFx1MDIyNFxcdTAyMjZcXHUwMjI4XFx1MDIyQVxcdTAyMkNcXHUwMjJFXFx1MDIzMFxcdTAyMzJcXHUwMjNBXFx1MDIzQlxcdTAyM0RcXHUwMjNFXFx1MDI0MVxcdTAyNDMtXFx1MDI0NlxcdTAyNDhcXHUwMjRBXFx1MDI0Q1xcdTAyNEVcXHUwMzQ1XFx1MDM3MFxcdTAzNzJcXHUwMzc2XFx1MDM3RlxcdTAzODZcXHUwMzg4LVxcdTAzOEFcXHUwMzhDXFx1MDM4RS1cXHUwM0ExXFx1MDNBMy1cXHUwM0FCXFx1MDNCMFxcdTAzQzJcXHUwM0NGLVxcdTAzRDFcXHUwM0Q1XFx1MDNENlxcdTAzRDhcXHUwM0RBXFx1MDNEQ1xcdTAzREVcXHUwM0UwXFx1MDNFMlxcdTAzRTRcXHUwM0U2XFx1MDNFOFxcdTAzRUFcXHUwM0VDXFx1MDNFRVxcdTAzRjBcXHUwM0YxXFx1MDNGNFxcdTAzRjVcXHUwM0Y3XFx1MDNGOVxcdTAzRkFcXHUwM0ZELVxcdTA0MkZcXHUwNDYwXFx1MDQ2MlxcdTA0NjRcXHUwNDY2XFx1MDQ2OFxcdTA0NkFcXHUwNDZDXFx1MDQ2RVxcdTA0NzBcXHUwNDcyXFx1MDQ3NFxcdTA0NzZcXHUwNDc4XFx1MDQ3QVxcdTA0N0NcXHUwNDdFXFx1MDQ4MFxcdTA0OEFcXHUwNDhDXFx1MDQ4RVxcdTA0OTBcXHUwNDkyXFx1MDQ5NFxcdTA0OTZcXHUwNDk4XFx1MDQ5QVxcdTA0OUNcXHUwNDlFXFx1MDRBMFxcdTA0QTJcXHUwNEE0XFx1MDRBNlxcdTA0QThcXHUwNEFBXFx1MDRBQ1xcdTA0QUVcXHUwNEIwXFx1MDRCMlxcdTA0QjRcXHUwNEI2XFx1MDRCOFxcdTA0QkFcXHUwNEJDXFx1MDRCRVxcdTA0QzBcXHUwNEMxXFx1MDRDM1xcdTA0QzVcXHUwNEM3XFx1MDRDOVxcdTA0Q0JcXHUwNENEXFx1MDREMFxcdTA0RDJcXHUwNEQ0XFx1MDRENlxcdTA0RDhcXHUwNERBXFx1MDREQ1xcdTA0REVcXHUwNEUwXFx1MDRFMlxcdTA0RTRcXHUwNEU2XFx1MDRFOFxcdTA0RUFcXHUwNEVDXFx1MDRFRVxcdTA0RjBcXHUwNEYyXFx1MDRGNFxcdTA0RjZcXHUwNEY4XFx1MDRGQVxcdTA0RkNcXHUwNEZFXFx1MDUwMFxcdTA1MDJcXHUwNTA0XFx1MDUwNlxcdTA1MDhcXHUwNTBBXFx1MDUwQ1xcdTA1MEVcXHUwNTEwXFx1MDUxMlxcdTA1MTRcXHUwNTE2XFx1MDUxOFxcdTA1MUFcXHUwNTFDXFx1MDUxRVxcdTA1MjBcXHUwNTIyXFx1MDUyNFxcdTA1MjZcXHUwNTI4XFx1MDUyQVxcdTA1MkNcXHUwNTJFXFx1MDUzMS1cXHUwNTU2XFx1MDU4N1xcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MUUwMFxcdTFFMDJcXHUxRTA0XFx1MUUwNlxcdTFFMDhcXHUxRTBBXFx1MUUwQ1xcdTFFMEVcXHUxRTEwXFx1MUUxMlxcdTFFMTRcXHUxRTE2XFx1MUUxOFxcdTFFMUFcXHUxRTFDXFx1MUUxRVxcdTFFMjBcXHUxRTIyXFx1MUUyNFxcdTFFMjZcXHUxRTI4XFx1MUUyQVxcdTFFMkNcXHUxRTJFXFx1MUUzMFxcdTFFMzJcXHUxRTM0XFx1MUUzNlxcdTFFMzhcXHUxRTNBXFx1MUUzQ1xcdTFFM0VcXHUxRTQwXFx1MUU0MlxcdTFFNDRcXHUxRTQ2XFx1MUU0OFxcdTFFNEFcXHUxRTRDXFx1MUU0RVxcdTFFNTBcXHUxRTUyXFx1MUU1NFxcdTFFNTZcXHUxRTU4XFx1MUU1QVxcdTFFNUNcXHUxRTVFXFx1MUU2MFxcdTFFNjJcXHUxRTY0XFx1MUU2NlxcdTFFNjhcXHUxRTZBXFx1MUU2Q1xcdTFFNkVcXHUxRTcwXFx1MUU3MlxcdTFFNzRcXHUxRTc2XFx1MUU3OFxcdTFFN0FcXHUxRTdDXFx1MUU3RVxcdTFFODBcXHUxRTgyXFx1MUU4NFxcdTFFODZcXHUxRTg4XFx1MUU4QVxcdTFFOENcXHUxRThFXFx1MUU5MFxcdTFFOTJcXHUxRTk0XFx1MUU5Ni1cXHUxRTlCXFx1MUU5RVxcdTFFQTBcXHUxRUEyXFx1MUVBNFxcdTFFQTZcXHUxRUE4XFx1MUVBQVxcdTFFQUNcXHUxRUFFXFx1MUVCMFxcdTFFQjJcXHUxRUI0XFx1MUVCNlxcdTFFQjhcXHUxRUJBXFx1MUVCQ1xcdTFFQkVcXHUxRUMwXFx1MUVDMlxcdTFFQzRcXHUxRUM2XFx1MUVDOFxcdTFFQ0FcXHUxRUNDXFx1MUVDRVxcdTFFRDBcXHUxRUQyXFx1MUVENFxcdTFFRDZcXHUxRUQ4XFx1MUVEQVxcdTFFRENcXHUxRURFXFx1MUVFMFxcdTFFRTJcXHUxRUU0XFx1MUVFNlxcdTFFRThcXHUxRUVBXFx1MUVFQ1xcdTFFRUVcXHUxRUYwXFx1MUVGMlxcdTFFRjRcXHUxRUY2XFx1MUVGOFxcdTFFRkFcXHUxRUZDXFx1MUVGRVxcdTFGMDgtXFx1MUYwRlxcdTFGMTgtXFx1MUYxRFxcdTFGMjgtXFx1MUYyRlxcdTFGMzgtXFx1MUYzRlxcdTFGNDgtXFx1MUY0RFxcdTFGNTBcXHUxRjUyXFx1MUY1NFxcdTFGNTZcXHUxRjU5XFx1MUY1QlxcdTFGNURcXHUxRjVGXFx1MUY2OC1cXHUxRjZGXFx1MUY4MC1cXHUxRkFGXFx1MUZCMi1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDJcXHUxRkQzXFx1MUZENi1cXHUxRkRCXFx1MUZFMi1cXHUxRkU0XFx1MUZFNi1cXHUxRkVDXFx1MUZGMi1cXHUxRkY0XFx1MUZGNi1cXHUxRkZDXFx1MjEyNlxcdTIxMkFcXHUyMTJCXFx1MjEzMlxcdTIxNjAtXFx1MjE2RlxcdTIxODNcXHUyNEI2LVxcdTI0Q0ZcXHUyQzAwLVxcdTJDMkVcXHUyQzYwXFx1MkM2Mi1cXHUyQzY0XFx1MkM2N1xcdTJDNjlcXHUyQzZCXFx1MkM2RC1cXHUyQzcwXFx1MkM3MlxcdTJDNzVcXHUyQzdFLVxcdTJDODBcXHUyQzgyXFx1MkM4NFxcdTJDODZcXHUyQzg4XFx1MkM4QVxcdTJDOENcXHUyQzhFXFx1MkM5MFxcdTJDOTJcXHUyQzk0XFx1MkM5NlxcdTJDOThcXHUyQzlBXFx1MkM5Q1xcdTJDOUVcXHUyQ0EwXFx1MkNBMlxcdTJDQTRcXHUyQ0E2XFx1MkNBOFxcdTJDQUFcXHUyQ0FDXFx1MkNBRVxcdTJDQjBcXHUyQ0IyXFx1MkNCNFxcdTJDQjZcXHUyQ0I4XFx1MkNCQVxcdTJDQkNcXHUyQ0JFXFx1MkNDMFxcdTJDQzJcXHUyQ0M0XFx1MkNDNlxcdTJDQzhcXHUyQ0NBXFx1MkNDQ1xcdTJDQ0VcXHUyQ0QwXFx1MkNEMlxcdTJDRDRcXHUyQ0Q2XFx1MkNEOFxcdTJDREFcXHUyQ0RDXFx1MkNERVxcdTJDRTBcXHUyQ0UyXFx1MkNFQlxcdTJDRURcXHUyQ0YyXFx1QTY0MFxcdUE2NDJcXHVBNjQ0XFx1QTY0NlxcdUE2NDhcXHVBNjRBXFx1QTY0Q1xcdUE2NEVcXHVBNjUwXFx1QTY1MlxcdUE2NTRcXHVBNjU2XFx1QTY1OFxcdUE2NUFcXHVBNjVDXFx1QTY1RVxcdUE2NjBcXHVBNjYyXFx1QTY2NFxcdUE2NjZcXHVBNjY4XFx1QTY2QVxcdUE2NkNcXHVBNjgwXFx1QTY4MlxcdUE2ODRcXHVBNjg2XFx1QTY4OFxcdUE2OEFcXHVBNjhDXFx1QTY4RVxcdUE2OTBcXHVBNjkyXFx1QTY5NFxcdUE2OTZcXHVBNjk4XFx1QTY5QVxcdUE3MjJcXHVBNzI0XFx1QTcyNlxcdUE3MjhcXHVBNzJBXFx1QTcyQ1xcdUE3MkVcXHVBNzMyXFx1QTczNFxcdUE3MzZcXHVBNzM4XFx1QTczQVxcdUE3M0NcXHVBNzNFXFx1QTc0MFxcdUE3NDJcXHVBNzQ0XFx1QTc0NlxcdUE3NDhcXHVBNzRBXFx1QTc0Q1xcdUE3NEVcXHVBNzUwXFx1QTc1MlxcdUE3NTRcXHVBNzU2XFx1QTc1OFxcdUE3NUFcXHVBNzVDXFx1QTc1RVxcdUE3NjBcXHVBNzYyXFx1QTc2NFxcdUE3NjZcXHVBNzY4XFx1QTc2QVxcdUE3NkNcXHVBNzZFXFx1QTc3OVxcdUE3N0JcXHVBNzdEXFx1QTc3RVxcdUE3ODBcXHVBNzgyXFx1QTc4NFxcdUE3ODZcXHVBNzhCXFx1QTc4RFxcdUE3OTBcXHVBNzkyXFx1QTc5NlxcdUE3OThcXHVBNzlBXFx1QTc5Q1xcdUE3OUVcXHVBN0EwXFx1QTdBMlxcdUE3QTRcXHVBN0E2XFx1QTdBOFxcdUE3QUEtXFx1QTdBRFxcdUE3QjBcXHVBN0IxXFx1RkIwMC1cXHVGQjA2XFx1RkIxMy1cXHVGQjE3XFx1RkYyMS1cXHVGRjNBXXxcXHVEODAxW1xcdURDMDAtXFx1REMyN118XFx1RDgwNltcXHVEQ0EwLVxcdURDQkZdL2c7XG5cbnZhciBtYXAgPSB7J0EnOidhJywnQic6J2InLCdDJzonYycsJ0QnOidkJywnRSc6J2UnLCdGJzonZicsJ0cnOidnJywnSCc6J2gnLCdJJzonaScsJ0onOidqJywnSyc6J2snLCdMJzonbCcsJ00nOidtJywnTic6J24nLCdPJzonbycsJ1AnOidwJywnUSc6J3EnLCdSJzoncicsJ1MnOidzJywnVCc6J3QnLCdVJzondScsJ1YnOid2JywnVyc6J3cnLCdYJzoneCcsJ1knOid5JywnWic6J3onLCdcXHhCNSc6J1xcdTAzQkMnLCdcXHhDMCc6J1xceEUwJywnXFx4QzEnOidcXHhFMScsJ1xceEMyJzonXFx4RTInLCdcXHhDMyc6J1xceEUzJywnXFx4QzQnOidcXHhFNCcsJ1xceEM1JzonXFx4RTUnLCdcXHhDNic6J1xceEU2JywnXFx4QzcnOidcXHhFNycsJ1xceEM4JzonXFx4RTgnLCdcXHhDOSc6J1xceEU5JywnXFx4Q0EnOidcXHhFQScsJ1xceENCJzonXFx4RUInLCdcXHhDQyc6J1xceEVDJywnXFx4Q0QnOidcXHhFRCcsJ1xceENFJzonXFx4RUUnLCdcXHhDRic6J1xceEVGJywnXFx4RDAnOidcXHhGMCcsJ1xceEQxJzonXFx4RjEnLCdcXHhEMic6J1xceEYyJywnXFx4RDMnOidcXHhGMycsJ1xceEQ0JzonXFx4RjQnLCdcXHhENSc6J1xceEY1JywnXFx4RDYnOidcXHhGNicsJ1xceEQ4JzonXFx4RjgnLCdcXHhEOSc6J1xceEY5JywnXFx4REEnOidcXHhGQScsJ1xceERCJzonXFx4RkInLCdcXHhEQyc6J1xceEZDJywnXFx4REQnOidcXHhGRCcsJ1xceERFJzonXFx4RkUnLCdcXHUwMTAwJzonXFx1MDEwMScsJ1xcdTAxMDInOidcXHUwMTAzJywnXFx1MDEwNCc6J1xcdTAxMDUnLCdcXHUwMTA2JzonXFx1MDEwNycsJ1xcdTAxMDgnOidcXHUwMTA5JywnXFx1MDEwQSc6J1xcdTAxMEInLCdcXHUwMTBDJzonXFx1MDEwRCcsJ1xcdTAxMEUnOidcXHUwMTBGJywnXFx1MDExMCc6J1xcdTAxMTEnLCdcXHUwMTEyJzonXFx1MDExMycsJ1xcdTAxMTQnOidcXHUwMTE1JywnXFx1MDExNic6J1xcdTAxMTcnLCdcXHUwMTE4JzonXFx1MDExOScsJ1xcdTAxMUEnOidcXHUwMTFCJywnXFx1MDExQyc6J1xcdTAxMUQnLCdcXHUwMTFFJzonXFx1MDExRicsJ1xcdTAxMjAnOidcXHUwMTIxJywnXFx1MDEyMic6J1xcdTAxMjMnLCdcXHUwMTI0JzonXFx1MDEyNScsJ1xcdTAxMjYnOidcXHUwMTI3JywnXFx1MDEyOCc6J1xcdTAxMjknLCdcXHUwMTJBJzonXFx1MDEyQicsJ1xcdTAxMkMnOidcXHUwMTJEJywnXFx1MDEyRSc6J1xcdTAxMkYnLCdcXHUwMTMyJzonXFx1MDEzMycsJ1xcdTAxMzQnOidcXHUwMTM1JywnXFx1MDEzNic6J1xcdTAxMzcnLCdcXHUwMTM5JzonXFx1MDEzQScsJ1xcdTAxM0InOidcXHUwMTNDJywnXFx1MDEzRCc6J1xcdTAxM0UnLCdcXHUwMTNGJzonXFx1MDE0MCcsJ1xcdTAxNDEnOidcXHUwMTQyJywnXFx1MDE0Myc6J1xcdTAxNDQnLCdcXHUwMTQ1JzonXFx1MDE0NicsJ1xcdTAxNDcnOidcXHUwMTQ4JywnXFx1MDE0QSc6J1xcdTAxNEInLCdcXHUwMTRDJzonXFx1MDE0RCcsJ1xcdTAxNEUnOidcXHUwMTRGJywnXFx1MDE1MCc6J1xcdTAxNTEnLCdcXHUwMTUyJzonXFx1MDE1MycsJ1xcdTAxNTQnOidcXHUwMTU1JywnXFx1MDE1Nic6J1xcdTAxNTcnLCdcXHUwMTU4JzonXFx1MDE1OScsJ1xcdTAxNUEnOidcXHUwMTVCJywnXFx1MDE1Qyc6J1xcdTAxNUQnLCdcXHUwMTVFJzonXFx1MDE1RicsJ1xcdTAxNjAnOidcXHUwMTYxJywnXFx1MDE2Mic6J1xcdTAxNjMnLCdcXHUwMTY0JzonXFx1MDE2NScsJ1xcdTAxNjYnOidcXHUwMTY3JywnXFx1MDE2OCc6J1xcdTAxNjknLCdcXHUwMTZBJzonXFx1MDE2QicsJ1xcdTAxNkMnOidcXHUwMTZEJywnXFx1MDE2RSc6J1xcdTAxNkYnLCdcXHUwMTcwJzonXFx1MDE3MScsJ1xcdTAxNzInOidcXHUwMTczJywnXFx1MDE3NCc6J1xcdTAxNzUnLCdcXHUwMTc2JzonXFx1MDE3NycsJ1xcdTAxNzgnOidcXHhGRicsJ1xcdTAxNzknOidcXHUwMTdBJywnXFx1MDE3Qic6J1xcdTAxN0MnLCdcXHUwMTdEJzonXFx1MDE3RScsJ1xcdTAxN0YnOidzJywnXFx1MDE4MSc6J1xcdTAyNTMnLCdcXHUwMTgyJzonXFx1MDE4MycsJ1xcdTAxODQnOidcXHUwMTg1JywnXFx1MDE4Nic6J1xcdTAyNTQnLCdcXHUwMTg3JzonXFx1MDE4OCcsJ1xcdTAxODknOidcXHUwMjU2JywnXFx1MDE4QSc6J1xcdTAyNTcnLCdcXHUwMThCJzonXFx1MDE4QycsJ1xcdTAxOEUnOidcXHUwMUREJywnXFx1MDE4Ric6J1xcdTAyNTknLCdcXHUwMTkwJzonXFx1MDI1QicsJ1xcdTAxOTEnOidcXHUwMTkyJywnXFx1MDE5Myc6J1xcdTAyNjAnLCdcXHUwMTk0JzonXFx1MDI2MycsJ1xcdTAxOTYnOidcXHUwMjY5JywnXFx1MDE5Nyc6J1xcdTAyNjgnLCdcXHUwMTk4JzonXFx1MDE5OScsJ1xcdTAxOUMnOidcXHUwMjZGJywnXFx1MDE5RCc6J1xcdTAyNzInLCdcXHUwMTlGJzonXFx1MDI3NScsJ1xcdTAxQTAnOidcXHUwMUExJywnXFx1MDFBMic6J1xcdTAxQTMnLCdcXHUwMUE0JzonXFx1MDFBNScsJ1xcdTAxQTYnOidcXHUwMjgwJywnXFx1MDFBNyc6J1xcdTAxQTgnLCdcXHUwMUE5JzonXFx1MDI4MycsJ1xcdTAxQUMnOidcXHUwMUFEJywnXFx1MDFBRSc6J1xcdTAyODgnLCdcXHUwMUFGJzonXFx1MDFCMCcsJ1xcdTAxQjEnOidcXHUwMjhBJywnXFx1MDFCMic6J1xcdTAyOEInLCdcXHUwMUIzJzonXFx1MDFCNCcsJ1xcdTAxQjUnOidcXHUwMUI2JywnXFx1MDFCNyc6J1xcdTAyOTInLCdcXHUwMUI4JzonXFx1MDFCOScsJ1xcdTAxQkMnOidcXHUwMUJEJywnXFx1MDFDNCc6J1xcdTAxQzYnLCdcXHUwMUM1JzonXFx1MDFDNicsJ1xcdTAxQzcnOidcXHUwMUM5JywnXFx1MDFDOCc6J1xcdTAxQzknLCdcXHUwMUNBJzonXFx1MDFDQycsJ1xcdTAxQ0InOidcXHUwMUNDJywnXFx1MDFDRCc6J1xcdTAxQ0UnLCdcXHUwMUNGJzonXFx1MDFEMCcsJ1xcdTAxRDEnOidcXHUwMUQyJywnXFx1MDFEMyc6J1xcdTAxRDQnLCdcXHUwMUQ1JzonXFx1MDFENicsJ1xcdTAxRDcnOidcXHUwMUQ4JywnXFx1MDFEOSc6J1xcdTAxREEnLCdcXHUwMURCJzonXFx1MDFEQycsJ1xcdTAxREUnOidcXHUwMURGJywnXFx1MDFFMCc6J1xcdTAxRTEnLCdcXHUwMUUyJzonXFx1MDFFMycsJ1xcdTAxRTQnOidcXHUwMUU1JywnXFx1MDFFNic6J1xcdTAxRTcnLCdcXHUwMUU4JzonXFx1MDFFOScsJ1xcdTAxRUEnOidcXHUwMUVCJywnXFx1MDFFQyc6J1xcdTAxRUQnLCdcXHUwMUVFJzonXFx1MDFFRicsJ1xcdTAxRjEnOidcXHUwMUYzJywnXFx1MDFGMic6J1xcdTAxRjMnLCdcXHUwMUY0JzonXFx1MDFGNScsJ1xcdTAxRjYnOidcXHUwMTk1JywnXFx1MDFGNyc6J1xcdTAxQkYnLCdcXHUwMUY4JzonXFx1MDFGOScsJ1xcdTAxRkEnOidcXHUwMUZCJywnXFx1MDFGQyc6J1xcdTAxRkQnLCdcXHUwMUZFJzonXFx1MDFGRicsJ1xcdTAyMDAnOidcXHUwMjAxJywnXFx1MDIwMic6J1xcdTAyMDMnLCdcXHUwMjA0JzonXFx1MDIwNScsJ1xcdTAyMDYnOidcXHUwMjA3JywnXFx1MDIwOCc6J1xcdTAyMDknLCdcXHUwMjBBJzonXFx1MDIwQicsJ1xcdTAyMEMnOidcXHUwMjBEJywnXFx1MDIwRSc6J1xcdTAyMEYnLCdcXHUwMjEwJzonXFx1MDIxMScsJ1xcdTAyMTInOidcXHUwMjEzJywnXFx1MDIxNCc6J1xcdTAyMTUnLCdcXHUwMjE2JzonXFx1MDIxNycsJ1xcdTAyMTgnOidcXHUwMjE5JywnXFx1MDIxQSc6J1xcdTAyMUInLCdcXHUwMjFDJzonXFx1MDIxRCcsJ1xcdTAyMUUnOidcXHUwMjFGJywnXFx1MDIyMCc6J1xcdTAxOUUnLCdcXHUwMjIyJzonXFx1MDIyMycsJ1xcdTAyMjQnOidcXHUwMjI1JywnXFx1MDIyNic6J1xcdTAyMjcnLCdcXHUwMjI4JzonXFx1MDIyOScsJ1xcdTAyMkEnOidcXHUwMjJCJywnXFx1MDIyQyc6J1xcdTAyMkQnLCdcXHUwMjJFJzonXFx1MDIyRicsJ1xcdTAyMzAnOidcXHUwMjMxJywnXFx1MDIzMic6J1xcdTAyMzMnLCdcXHUwMjNBJzonXFx1MkM2NScsJ1xcdTAyM0InOidcXHUwMjNDJywnXFx1MDIzRCc6J1xcdTAxOUEnLCdcXHUwMjNFJzonXFx1MkM2NicsJ1xcdTAyNDEnOidcXHUwMjQyJywnXFx1MDI0Myc6J1xcdTAxODAnLCdcXHUwMjQ0JzonXFx1MDI4OScsJ1xcdTAyNDUnOidcXHUwMjhDJywnXFx1MDI0Nic6J1xcdTAyNDcnLCdcXHUwMjQ4JzonXFx1MDI0OScsJ1xcdTAyNEEnOidcXHUwMjRCJywnXFx1MDI0Qyc6J1xcdTAyNEQnLCdcXHUwMjRFJzonXFx1MDI0RicsJ1xcdTAzNDUnOidcXHUwM0I5JywnXFx1MDM3MCc6J1xcdTAzNzEnLCdcXHUwMzcyJzonXFx1MDM3MycsJ1xcdTAzNzYnOidcXHUwMzc3JywnXFx1MDM3Ric6J1xcdTAzRjMnLCdcXHUwMzg2JzonXFx1MDNBQycsJ1xcdTAzODgnOidcXHUwM0FEJywnXFx1MDM4OSc6J1xcdTAzQUUnLCdcXHUwMzhBJzonXFx1MDNBRicsJ1xcdTAzOEMnOidcXHUwM0NDJywnXFx1MDM4RSc6J1xcdTAzQ0QnLCdcXHUwMzhGJzonXFx1MDNDRScsJ1xcdTAzOTEnOidcXHUwM0IxJywnXFx1MDM5Mic6J1xcdTAzQjInLCdcXHUwMzkzJzonXFx1MDNCMycsJ1xcdTAzOTQnOidcXHUwM0I0JywnXFx1MDM5NSc6J1xcdTAzQjUnLCdcXHUwMzk2JzonXFx1MDNCNicsJ1xcdTAzOTcnOidcXHUwM0I3JywnXFx1MDM5OCc6J1xcdTAzQjgnLCdcXHUwMzk5JzonXFx1MDNCOScsJ1xcdTAzOUEnOidcXHUwM0JBJywnXFx1MDM5Qic6J1xcdTAzQkInLCdcXHUwMzlDJzonXFx1MDNCQycsJ1xcdTAzOUQnOidcXHUwM0JEJywnXFx1MDM5RSc6J1xcdTAzQkUnLCdcXHUwMzlGJzonXFx1MDNCRicsJ1xcdTAzQTAnOidcXHUwM0MwJywnXFx1MDNBMSc6J1xcdTAzQzEnLCdcXHUwM0EzJzonXFx1MDNDMycsJ1xcdTAzQTQnOidcXHUwM0M0JywnXFx1MDNBNSc6J1xcdTAzQzUnLCdcXHUwM0E2JzonXFx1MDNDNicsJ1xcdTAzQTcnOidcXHUwM0M3JywnXFx1MDNBOCc6J1xcdTAzQzgnLCdcXHUwM0E5JzonXFx1MDNDOScsJ1xcdTAzQUEnOidcXHUwM0NBJywnXFx1MDNBQic6J1xcdTAzQ0InLCdcXHUwM0MyJzonXFx1MDNDMycsJ1xcdTAzQ0YnOidcXHUwM0Q3JywnXFx1MDNEMCc6J1xcdTAzQjInLCdcXHUwM0QxJzonXFx1MDNCOCcsJ1xcdTAzRDUnOidcXHUwM0M2JywnXFx1MDNENic6J1xcdTAzQzAnLCdcXHUwM0Q4JzonXFx1MDNEOScsJ1xcdTAzREEnOidcXHUwM0RCJywnXFx1MDNEQyc6J1xcdTAzREQnLCdcXHUwM0RFJzonXFx1MDNERicsJ1xcdTAzRTAnOidcXHUwM0UxJywnXFx1MDNFMic6J1xcdTAzRTMnLCdcXHUwM0U0JzonXFx1MDNFNScsJ1xcdTAzRTYnOidcXHUwM0U3JywnXFx1MDNFOCc6J1xcdTAzRTknLCdcXHUwM0VBJzonXFx1MDNFQicsJ1xcdTAzRUMnOidcXHUwM0VEJywnXFx1MDNFRSc6J1xcdTAzRUYnLCdcXHUwM0YwJzonXFx1MDNCQScsJ1xcdTAzRjEnOidcXHUwM0MxJywnXFx1MDNGNCc6J1xcdTAzQjgnLCdcXHUwM0Y1JzonXFx1MDNCNScsJ1xcdTAzRjcnOidcXHUwM0Y4JywnXFx1MDNGOSc6J1xcdTAzRjInLCdcXHUwM0ZBJzonXFx1MDNGQicsJ1xcdTAzRkQnOidcXHUwMzdCJywnXFx1MDNGRSc6J1xcdTAzN0MnLCdcXHUwM0ZGJzonXFx1MDM3RCcsJ1xcdTA0MDAnOidcXHUwNDUwJywnXFx1MDQwMSc6J1xcdTA0NTEnLCdcXHUwNDAyJzonXFx1MDQ1MicsJ1xcdTA0MDMnOidcXHUwNDUzJywnXFx1MDQwNCc6J1xcdTA0NTQnLCdcXHUwNDA1JzonXFx1MDQ1NScsJ1xcdTA0MDYnOidcXHUwNDU2JywnXFx1MDQwNyc6J1xcdTA0NTcnLCdcXHUwNDA4JzonXFx1MDQ1OCcsJ1xcdTA0MDknOidcXHUwNDU5JywnXFx1MDQwQSc6J1xcdTA0NUEnLCdcXHUwNDBCJzonXFx1MDQ1QicsJ1xcdTA0MEMnOidcXHUwNDVDJywnXFx1MDQwRCc6J1xcdTA0NUQnLCdcXHUwNDBFJzonXFx1MDQ1RScsJ1xcdTA0MEYnOidcXHUwNDVGJywnXFx1MDQxMCc6J1xcdTA0MzAnLCdcXHUwNDExJzonXFx1MDQzMScsJ1xcdTA0MTInOidcXHUwNDMyJywnXFx1MDQxMyc6J1xcdTA0MzMnLCdcXHUwNDE0JzonXFx1MDQzNCcsJ1xcdTA0MTUnOidcXHUwNDM1JywnXFx1MDQxNic6J1xcdTA0MzYnLCdcXHUwNDE3JzonXFx1MDQzNycsJ1xcdTA0MTgnOidcXHUwNDM4JywnXFx1MDQxOSc6J1xcdTA0MzknLCdcXHUwNDFBJzonXFx1MDQzQScsJ1xcdTA0MUInOidcXHUwNDNCJywnXFx1MDQxQyc6J1xcdTA0M0MnLCdcXHUwNDFEJzonXFx1MDQzRCcsJ1xcdTA0MUUnOidcXHUwNDNFJywnXFx1MDQxRic6J1xcdTA0M0YnLCdcXHUwNDIwJzonXFx1MDQ0MCcsJ1xcdTA0MjEnOidcXHUwNDQxJywnXFx1MDQyMic6J1xcdTA0NDInLCdcXHUwNDIzJzonXFx1MDQ0MycsJ1xcdTA0MjQnOidcXHUwNDQ0JywnXFx1MDQyNSc6J1xcdTA0NDUnLCdcXHUwNDI2JzonXFx1MDQ0NicsJ1xcdTA0MjcnOidcXHUwNDQ3JywnXFx1MDQyOCc6J1xcdTA0NDgnLCdcXHUwNDI5JzonXFx1MDQ0OScsJ1xcdTA0MkEnOidcXHUwNDRBJywnXFx1MDQyQic6J1xcdTA0NEInLCdcXHUwNDJDJzonXFx1MDQ0QycsJ1xcdTA0MkQnOidcXHUwNDREJywnXFx1MDQyRSc6J1xcdTA0NEUnLCdcXHUwNDJGJzonXFx1MDQ0RicsJ1xcdTA0NjAnOidcXHUwNDYxJywnXFx1MDQ2Mic6J1xcdTA0NjMnLCdcXHUwNDY0JzonXFx1MDQ2NScsJ1xcdTA0NjYnOidcXHUwNDY3JywnXFx1MDQ2OCc6J1xcdTA0NjknLCdcXHUwNDZBJzonXFx1MDQ2QicsJ1xcdTA0NkMnOidcXHUwNDZEJywnXFx1MDQ2RSc6J1xcdTA0NkYnLCdcXHUwNDcwJzonXFx1MDQ3MScsJ1xcdTA0NzInOidcXHUwNDczJywnXFx1MDQ3NCc6J1xcdTA0NzUnLCdcXHUwNDc2JzonXFx1MDQ3NycsJ1xcdTA0NzgnOidcXHUwNDc5JywnXFx1MDQ3QSc6J1xcdTA0N0InLCdcXHUwNDdDJzonXFx1MDQ3RCcsJ1xcdTA0N0UnOidcXHUwNDdGJywnXFx1MDQ4MCc6J1xcdTA0ODEnLCdcXHUwNDhBJzonXFx1MDQ4QicsJ1xcdTA0OEMnOidcXHUwNDhEJywnXFx1MDQ4RSc6J1xcdTA0OEYnLCdcXHUwNDkwJzonXFx1MDQ5MScsJ1xcdTA0OTInOidcXHUwNDkzJywnXFx1MDQ5NCc6J1xcdTA0OTUnLCdcXHUwNDk2JzonXFx1MDQ5NycsJ1xcdTA0OTgnOidcXHUwNDk5JywnXFx1MDQ5QSc6J1xcdTA0OUInLCdcXHUwNDlDJzonXFx1MDQ5RCcsJ1xcdTA0OUUnOidcXHUwNDlGJywnXFx1MDRBMCc6J1xcdTA0QTEnLCdcXHUwNEEyJzonXFx1MDRBMycsJ1xcdTA0QTQnOidcXHUwNEE1JywnXFx1MDRBNic6J1xcdTA0QTcnLCdcXHUwNEE4JzonXFx1MDRBOScsJ1xcdTA0QUEnOidcXHUwNEFCJywnXFx1MDRBQyc6J1xcdTA0QUQnLCdcXHUwNEFFJzonXFx1MDRBRicsJ1xcdTA0QjAnOidcXHUwNEIxJywnXFx1MDRCMic6J1xcdTA0QjMnLCdcXHUwNEI0JzonXFx1MDRCNScsJ1xcdTA0QjYnOidcXHUwNEI3JywnXFx1MDRCOCc6J1xcdTA0QjknLCdcXHUwNEJBJzonXFx1MDRCQicsJ1xcdTA0QkMnOidcXHUwNEJEJywnXFx1MDRCRSc6J1xcdTA0QkYnLCdcXHUwNEMwJzonXFx1MDRDRicsJ1xcdTA0QzEnOidcXHUwNEMyJywnXFx1MDRDMyc6J1xcdTA0QzQnLCdcXHUwNEM1JzonXFx1MDRDNicsJ1xcdTA0QzcnOidcXHUwNEM4JywnXFx1MDRDOSc6J1xcdTA0Q0EnLCdcXHUwNENCJzonXFx1MDRDQycsJ1xcdTA0Q0QnOidcXHUwNENFJywnXFx1MDREMCc6J1xcdTA0RDEnLCdcXHUwNEQyJzonXFx1MDREMycsJ1xcdTA0RDQnOidcXHUwNEQ1JywnXFx1MDRENic6J1xcdTA0RDcnLCdcXHUwNEQ4JzonXFx1MDREOScsJ1xcdTA0REEnOidcXHUwNERCJywnXFx1MDREQyc6J1xcdTA0REQnLCdcXHUwNERFJzonXFx1MDRERicsJ1xcdTA0RTAnOidcXHUwNEUxJywnXFx1MDRFMic6J1xcdTA0RTMnLCdcXHUwNEU0JzonXFx1MDRFNScsJ1xcdTA0RTYnOidcXHUwNEU3JywnXFx1MDRFOCc6J1xcdTA0RTknLCdcXHUwNEVBJzonXFx1MDRFQicsJ1xcdTA0RUMnOidcXHUwNEVEJywnXFx1MDRFRSc6J1xcdTA0RUYnLCdcXHUwNEYwJzonXFx1MDRGMScsJ1xcdTA0RjInOidcXHUwNEYzJywnXFx1MDRGNCc6J1xcdTA0RjUnLCdcXHUwNEY2JzonXFx1MDRGNycsJ1xcdTA0RjgnOidcXHUwNEY5JywnXFx1MDRGQSc6J1xcdTA0RkInLCdcXHUwNEZDJzonXFx1MDRGRCcsJ1xcdTA0RkUnOidcXHUwNEZGJywnXFx1MDUwMCc6J1xcdTA1MDEnLCdcXHUwNTAyJzonXFx1MDUwMycsJ1xcdTA1MDQnOidcXHUwNTA1JywnXFx1MDUwNic6J1xcdTA1MDcnLCdcXHUwNTA4JzonXFx1MDUwOScsJ1xcdTA1MEEnOidcXHUwNTBCJywnXFx1MDUwQyc6J1xcdTA1MEQnLCdcXHUwNTBFJzonXFx1MDUwRicsJ1xcdTA1MTAnOidcXHUwNTExJywnXFx1MDUxMic6J1xcdTA1MTMnLCdcXHUwNTE0JzonXFx1MDUxNScsJ1xcdTA1MTYnOidcXHUwNTE3JywnXFx1MDUxOCc6J1xcdTA1MTknLCdcXHUwNTFBJzonXFx1MDUxQicsJ1xcdTA1MUMnOidcXHUwNTFEJywnXFx1MDUxRSc6J1xcdTA1MUYnLCdcXHUwNTIwJzonXFx1MDUyMScsJ1xcdTA1MjInOidcXHUwNTIzJywnXFx1MDUyNCc6J1xcdTA1MjUnLCdcXHUwNTI2JzonXFx1MDUyNycsJ1xcdTA1MjgnOidcXHUwNTI5JywnXFx1MDUyQSc6J1xcdTA1MkInLCdcXHUwNTJDJzonXFx1MDUyRCcsJ1xcdTA1MkUnOidcXHUwNTJGJywnXFx1MDUzMSc6J1xcdTA1NjEnLCdcXHUwNTMyJzonXFx1MDU2MicsJ1xcdTA1MzMnOidcXHUwNTYzJywnXFx1MDUzNCc6J1xcdTA1NjQnLCdcXHUwNTM1JzonXFx1MDU2NScsJ1xcdTA1MzYnOidcXHUwNTY2JywnXFx1MDUzNyc6J1xcdTA1NjcnLCdcXHUwNTM4JzonXFx1MDU2OCcsJ1xcdTA1MzknOidcXHUwNTY5JywnXFx1MDUzQSc6J1xcdTA1NkEnLCdcXHUwNTNCJzonXFx1MDU2QicsJ1xcdTA1M0MnOidcXHUwNTZDJywnXFx1MDUzRCc6J1xcdTA1NkQnLCdcXHUwNTNFJzonXFx1MDU2RScsJ1xcdTA1M0YnOidcXHUwNTZGJywnXFx1MDU0MCc6J1xcdTA1NzAnLCdcXHUwNTQxJzonXFx1MDU3MScsJ1xcdTA1NDInOidcXHUwNTcyJywnXFx1MDU0Myc6J1xcdTA1NzMnLCdcXHUwNTQ0JzonXFx1MDU3NCcsJ1xcdTA1NDUnOidcXHUwNTc1JywnXFx1MDU0Nic6J1xcdTA1NzYnLCdcXHUwNTQ3JzonXFx1MDU3NycsJ1xcdTA1NDgnOidcXHUwNTc4JywnXFx1MDU0OSc6J1xcdTA1NzknLCdcXHUwNTRBJzonXFx1MDU3QScsJ1xcdTA1NEInOidcXHUwNTdCJywnXFx1MDU0Qyc6J1xcdTA1N0MnLCdcXHUwNTREJzonXFx1MDU3RCcsJ1xcdTA1NEUnOidcXHUwNTdFJywnXFx1MDU0Ric6J1xcdTA1N0YnLCdcXHUwNTUwJzonXFx1MDU4MCcsJ1xcdTA1NTEnOidcXHUwNTgxJywnXFx1MDU1Mic6J1xcdTA1ODInLCdcXHUwNTUzJzonXFx1MDU4MycsJ1xcdTA1NTQnOidcXHUwNTg0JywnXFx1MDU1NSc6J1xcdTA1ODUnLCdcXHUwNTU2JzonXFx1MDU4NicsJ1xcdTEwQTAnOidcXHUyRDAwJywnXFx1MTBBMSc6J1xcdTJEMDEnLCdcXHUxMEEyJzonXFx1MkQwMicsJ1xcdTEwQTMnOidcXHUyRDAzJywnXFx1MTBBNCc6J1xcdTJEMDQnLCdcXHUxMEE1JzonXFx1MkQwNScsJ1xcdTEwQTYnOidcXHUyRDA2JywnXFx1MTBBNyc6J1xcdTJEMDcnLCdcXHUxMEE4JzonXFx1MkQwOCcsJ1xcdTEwQTknOidcXHUyRDA5JywnXFx1MTBBQSc6J1xcdTJEMEEnLCdcXHUxMEFCJzonXFx1MkQwQicsJ1xcdTEwQUMnOidcXHUyRDBDJywnXFx1MTBBRCc6J1xcdTJEMEQnLCdcXHUxMEFFJzonXFx1MkQwRScsJ1xcdTEwQUYnOidcXHUyRDBGJywnXFx1MTBCMCc6J1xcdTJEMTAnLCdcXHUxMEIxJzonXFx1MkQxMScsJ1xcdTEwQjInOidcXHUyRDEyJywnXFx1MTBCMyc6J1xcdTJEMTMnLCdcXHUxMEI0JzonXFx1MkQxNCcsJ1xcdTEwQjUnOidcXHUyRDE1JywnXFx1MTBCNic6J1xcdTJEMTYnLCdcXHUxMEI3JzonXFx1MkQxNycsJ1xcdTEwQjgnOidcXHUyRDE4JywnXFx1MTBCOSc6J1xcdTJEMTknLCdcXHUxMEJBJzonXFx1MkQxQScsJ1xcdTEwQkInOidcXHUyRDFCJywnXFx1MTBCQyc6J1xcdTJEMUMnLCdcXHUxMEJEJzonXFx1MkQxRCcsJ1xcdTEwQkUnOidcXHUyRDFFJywnXFx1MTBCRic6J1xcdTJEMUYnLCdcXHUxMEMwJzonXFx1MkQyMCcsJ1xcdTEwQzEnOidcXHUyRDIxJywnXFx1MTBDMic6J1xcdTJEMjInLCdcXHUxMEMzJzonXFx1MkQyMycsJ1xcdTEwQzQnOidcXHUyRDI0JywnXFx1MTBDNSc6J1xcdTJEMjUnLCdcXHUxMEM3JzonXFx1MkQyNycsJ1xcdTEwQ0QnOidcXHUyRDJEJywnXFx1MUUwMCc6J1xcdTFFMDEnLCdcXHUxRTAyJzonXFx1MUUwMycsJ1xcdTFFMDQnOidcXHUxRTA1JywnXFx1MUUwNic6J1xcdTFFMDcnLCdcXHUxRTA4JzonXFx1MUUwOScsJ1xcdTFFMEEnOidcXHUxRTBCJywnXFx1MUUwQyc6J1xcdTFFMEQnLCdcXHUxRTBFJzonXFx1MUUwRicsJ1xcdTFFMTAnOidcXHUxRTExJywnXFx1MUUxMic6J1xcdTFFMTMnLCdcXHUxRTE0JzonXFx1MUUxNScsJ1xcdTFFMTYnOidcXHUxRTE3JywnXFx1MUUxOCc6J1xcdTFFMTknLCdcXHUxRTFBJzonXFx1MUUxQicsJ1xcdTFFMUMnOidcXHUxRTFEJywnXFx1MUUxRSc6J1xcdTFFMUYnLCdcXHUxRTIwJzonXFx1MUUyMScsJ1xcdTFFMjInOidcXHUxRTIzJywnXFx1MUUyNCc6J1xcdTFFMjUnLCdcXHUxRTI2JzonXFx1MUUyNycsJ1xcdTFFMjgnOidcXHUxRTI5JywnXFx1MUUyQSc6J1xcdTFFMkInLCdcXHUxRTJDJzonXFx1MUUyRCcsJ1xcdTFFMkUnOidcXHUxRTJGJywnXFx1MUUzMCc6J1xcdTFFMzEnLCdcXHUxRTMyJzonXFx1MUUzMycsJ1xcdTFFMzQnOidcXHUxRTM1JywnXFx1MUUzNic6J1xcdTFFMzcnLCdcXHUxRTM4JzonXFx1MUUzOScsJ1xcdTFFM0EnOidcXHUxRTNCJywnXFx1MUUzQyc6J1xcdTFFM0QnLCdcXHUxRTNFJzonXFx1MUUzRicsJ1xcdTFFNDAnOidcXHUxRTQxJywnXFx1MUU0Mic6J1xcdTFFNDMnLCdcXHUxRTQ0JzonXFx1MUU0NScsJ1xcdTFFNDYnOidcXHUxRTQ3JywnXFx1MUU0OCc6J1xcdTFFNDknLCdcXHUxRTRBJzonXFx1MUU0QicsJ1xcdTFFNEMnOidcXHUxRTREJywnXFx1MUU0RSc6J1xcdTFFNEYnLCdcXHUxRTUwJzonXFx1MUU1MScsJ1xcdTFFNTInOidcXHUxRTUzJywnXFx1MUU1NCc6J1xcdTFFNTUnLCdcXHUxRTU2JzonXFx1MUU1NycsJ1xcdTFFNTgnOidcXHUxRTU5JywnXFx1MUU1QSc6J1xcdTFFNUInLCdcXHUxRTVDJzonXFx1MUU1RCcsJ1xcdTFFNUUnOidcXHUxRTVGJywnXFx1MUU2MCc6J1xcdTFFNjEnLCdcXHUxRTYyJzonXFx1MUU2MycsJ1xcdTFFNjQnOidcXHUxRTY1JywnXFx1MUU2Nic6J1xcdTFFNjcnLCdcXHUxRTY4JzonXFx1MUU2OScsJ1xcdTFFNkEnOidcXHUxRTZCJywnXFx1MUU2Qyc6J1xcdTFFNkQnLCdcXHUxRTZFJzonXFx1MUU2RicsJ1xcdTFFNzAnOidcXHUxRTcxJywnXFx1MUU3Mic6J1xcdTFFNzMnLCdcXHUxRTc0JzonXFx1MUU3NScsJ1xcdTFFNzYnOidcXHUxRTc3JywnXFx1MUU3OCc6J1xcdTFFNzknLCdcXHUxRTdBJzonXFx1MUU3QicsJ1xcdTFFN0MnOidcXHUxRTdEJywnXFx1MUU3RSc6J1xcdTFFN0YnLCdcXHUxRTgwJzonXFx1MUU4MScsJ1xcdTFFODInOidcXHUxRTgzJywnXFx1MUU4NCc6J1xcdTFFODUnLCdcXHUxRTg2JzonXFx1MUU4NycsJ1xcdTFFODgnOidcXHUxRTg5JywnXFx1MUU4QSc6J1xcdTFFOEInLCdcXHUxRThDJzonXFx1MUU4RCcsJ1xcdTFFOEUnOidcXHUxRThGJywnXFx1MUU5MCc6J1xcdTFFOTEnLCdcXHUxRTkyJzonXFx1MUU5MycsJ1xcdTFFOTQnOidcXHUxRTk1JywnXFx1MUU5Qic6J1xcdTFFNjEnLCdcXHUxRUEwJzonXFx1MUVBMScsJ1xcdTFFQTInOidcXHUxRUEzJywnXFx1MUVBNCc6J1xcdTFFQTUnLCdcXHUxRUE2JzonXFx1MUVBNycsJ1xcdTFFQTgnOidcXHUxRUE5JywnXFx1MUVBQSc6J1xcdTFFQUInLCdcXHUxRUFDJzonXFx1MUVBRCcsJ1xcdTFFQUUnOidcXHUxRUFGJywnXFx1MUVCMCc6J1xcdTFFQjEnLCdcXHUxRUIyJzonXFx1MUVCMycsJ1xcdTFFQjQnOidcXHUxRUI1JywnXFx1MUVCNic6J1xcdTFFQjcnLCdcXHUxRUI4JzonXFx1MUVCOScsJ1xcdTFFQkEnOidcXHUxRUJCJywnXFx1MUVCQyc6J1xcdTFFQkQnLCdcXHUxRUJFJzonXFx1MUVCRicsJ1xcdTFFQzAnOidcXHUxRUMxJywnXFx1MUVDMic6J1xcdTFFQzMnLCdcXHUxRUM0JzonXFx1MUVDNScsJ1xcdTFFQzYnOidcXHUxRUM3JywnXFx1MUVDOCc6J1xcdTFFQzknLCdcXHUxRUNBJzonXFx1MUVDQicsJ1xcdTFFQ0MnOidcXHUxRUNEJywnXFx1MUVDRSc6J1xcdTFFQ0YnLCdcXHUxRUQwJzonXFx1MUVEMScsJ1xcdTFFRDInOidcXHUxRUQzJywnXFx1MUVENCc6J1xcdTFFRDUnLCdcXHUxRUQ2JzonXFx1MUVENycsJ1xcdTFFRDgnOidcXHUxRUQ5JywnXFx1MUVEQSc6J1xcdTFFREInLCdcXHUxRURDJzonXFx1MUVERCcsJ1xcdTFFREUnOidcXHUxRURGJywnXFx1MUVFMCc6J1xcdTFFRTEnLCdcXHUxRUUyJzonXFx1MUVFMycsJ1xcdTFFRTQnOidcXHUxRUU1JywnXFx1MUVFNic6J1xcdTFFRTcnLCdcXHUxRUU4JzonXFx1MUVFOScsJ1xcdTFFRUEnOidcXHUxRUVCJywnXFx1MUVFQyc6J1xcdTFFRUQnLCdcXHUxRUVFJzonXFx1MUVFRicsJ1xcdTFFRjAnOidcXHUxRUYxJywnXFx1MUVGMic6J1xcdTFFRjMnLCdcXHUxRUY0JzonXFx1MUVGNScsJ1xcdTFFRjYnOidcXHUxRUY3JywnXFx1MUVGOCc6J1xcdTFFRjknLCdcXHUxRUZBJzonXFx1MUVGQicsJ1xcdTFFRkMnOidcXHUxRUZEJywnXFx1MUVGRSc6J1xcdTFFRkYnLCdcXHUxRjA4JzonXFx1MUYwMCcsJ1xcdTFGMDknOidcXHUxRjAxJywnXFx1MUYwQSc6J1xcdTFGMDInLCdcXHUxRjBCJzonXFx1MUYwMycsJ1xcdTFGMEMnOidcXHUxRjA0JywnXFx1MUYwRCc6J1xcdTFGMDUnLCdcXHUxRjBFJzonXFx1MUYwNicsJ1xcdTFGMEYnOidcXHUxRjA3JywnXFx1MUYxOCc6J1xcdTFGMTAnLCdcXHUxRjE5JzonXFx1MUYxMScsJ1xcdTFGMUEnOidcXHUxRjEyJywnXFx1MUYxQic6J1xcdTFGMTMnLCdcXHUxRjFDJzonXFx1MUYxNCcsJ1xcdTFGMUQnOidcXHUxRjE1JywnXFx1MUYyOCc6J1xcdTFGMjAnLCdcXHUxRjI5JzonXFx1MUYyMScsJ1xcdTFGMkEnOidcXHUxRjIyJywnXFx1MUYyQic6J1xcdTFGMjMnLCdcXHUxRjJDJzonXFx1MUYyNCcsJ1xcdTFGMkQnOidcXHUxRjI1JywnXFx1MUYyRSc6J1xcdTFGMjYnLCdcXHUxRjJGJzonXFx1MUYyNycsJ1xcdTFGMzgnOidcXHUxRjMwJywnXFx1MUYzOSc6J1xcdTFGMzEnLCdcXHUxRjNBJzonXFx1MUYzMicsJ1xcdTFGM0InOidcXHUxRjMzJywnXFx1MUYzQyc6J1xcdTFGMzQnLCdcXHUxRjNEJzonXFx1MUYzNScsJ1xcdTFGM0UnOidcXHUxRjM2JywnXFx1MUYzRic6J1xcdTFGMzcnLCdcXHUxRjQ4JzonXFx1MUY0MCcsJ1xcdTFGNDknOidcXHUxRjQxJywnXFx1MUY0QSc6J1xcdTFGNDInLCdcXHUxRjRCJzonXFx1MUY0MycsJ1xcdTFGNEMnOidcXHUxRjQ0JywnXFx1MUY0RCc6J1xcdTFGNDUnLCdcXHUxRjU5JzonXFx1MUY1MScsJ1xcdTFGNUInOidcXHUxRjUzJywnXFx1MUY1RCc6J1xcdTFGNTUnLCdcXHUxRjVGJzonXFx1MUY1NycsJ1xcdTFGNjgnOidcXHUxRjYwJywnXFx1MUY2OSc6J1xcdTFGNjEnLCdcXHUxRjZBJzonXFx1MUY2MicsJ1xcdTFGNkInOidcXHUxRjYzJywnXFx1MUY2Qyc6J1xcdTFGNjQnLCdcXHUxRjZEJzonXFx1MUY2NScsJ1xcdTFGNkUnOidcXHUxRjY2JywnXFx1MUY2Ric6J1xcdTFGNjcnLCdcXHUxRkI4JzonXFx1MUZCMCcsJ1xcdTFGQjknOidcXHUxRkIxJywnXFx1MUZCQSc6J1xcdTFGNzAnLCdcXHUxRkJCJzonXFx1MUY3MScsJ1xcdTFGQkUnOidcXHUwM0I5JywnXFx1MUZDOCc6J1xcdTFGNzInLCdcXHUxRkM5JzonXFx1MUY3MycsJ1xcdTFGQ0EnOidcXHUxRjc0JywnXFx1MUZDQic6J1xcdTFGNzUnLCdcXHUxRkQ4JzonXFx1MUZEMCcsJ1xcdTFGRDknOidcXHUxRkQxJywnXFx1MUZEQSc6J1xcdTFGNzYnLCdcXHUxRkRCJzonXFx1MUY3NycsJ1xcdTFGRTgnOidcXHUxRkUwJywnXFx1MUZFOSc6J1xcdTFGRTEnLCdcXHUxRkVBJzonXFx1MUY3QScsJ1xcdTFGRUInOidcXHUxRjdCJywnXFx1MUZFQyc6J1xcdTFGRTUnLCdcXHUxRkY4JzonXFx1MUY3OCcsJ1xcdTFGRjknOidcXHUxRjc5JywnXFx1MUZGQSc6J1xcdTFGN0MnLCdcXHUxRkZCJzonXFx1MUY3RCcsJ1xcdTIxMjYnOidcXHUwM0M5JywnXFx1MjEyQSc6J2snLCdcXHUyMTJCJzonXFx4RTUnLCdcXHUyMTMyJzonXFx1MjE0RScsJ1xcdTIxNjAnOidcXHUyMTcwJywnXFx1MjE2MSc6J1xcdTIxNzEnLCdcXHUyMTYyJzonXFx1MjE3MicsJ1xcdTIxNjMnOidcXHUyMTczJywnXFx1MjE2NCc6J1xcdTIxNzQnLCdcXHUyMTY1JzonXFx1MjE3NScsJ1xcdTIxNjYnOidcXHUyMTc2JywnXFx1MjE2Nyc6J1xcdTIxNzcnLCdcXHUyMTY4JzonXFx1MjE3OCcsJ1xcdTIxNjknOidcXHUyMTc5JywnXFx1MjE2QSc6J1xcdTIxN0EnLCdcXHUyMTZCJzonXFx1MjE3QicsJ1xcdTIxNkMnOidcXHUyMTdDJywnXFx1MjE2RCc6J1xcdTIxN0QnLCdcXHUyMTZFJzonXFx1MjE3RScsJ1xcdTIxNkYnOidcXHUyMTdGJywnXFx1MjE4Myc6J1xcdTIxODQnLCdcXHUyNEI2JzonXFx1MjREMCcsJ1xcdTI0QjcnOidcXHUyNEQxJywnXFx1MjRCOCc6J1xcdTI0RDInLCdcXHUyNEI5JzonXFx1MjREMycsJ1xcdTI0QkEnOidcXHUyNEQ0JywnXFx1MjRCQic6J1xcdTI0RDUnLCdcXHUyNEJDJzonXFx1MjRENicsJ1xcdTI0QkQnOidcXHUyNEQ3JywnXFx1MjRCRSc6J1xcdTI0RDgnLCdcXHUyNEJGJzonXFx1MjREOScsJ1xcdTI0QzAnOidcXHUyNERBJywnXFx1MjRDMSc6J1xcdTI0REInLCdcXHUyNEMyJzonXFx1MjREQycsJ1xcdTI0QzMnOidcXHUyNEREJywnXFx1MjRDNCc6J1xcdTI0REUnLCdcXHUyNEM1JzonXFx1MjRERicsJ1xcdTI0QzYnOidcXHUyNEUwJywnXFx1MjRDNyc6J1xcdTI0RTEnLCdcXHUyNEM4JzonXFx1MjRFMicsJ1xcdTI0QzknOidcXHUyNEUzJywnXFx1MjRDQSc6J1xcdTI0RTQnLCdcXHUyNENCJzonXFx1MjRFNScsJ1xcdTI0Q0MnOidcXHUyNEU2JywnXFx1MjRDRCc6J1xcdTI0RTcnLCdcXHUyNENFJzonXFx1MjRFOCcsJ1xcdTI0Q0YnOidcXHUyNEU5JywnXFx1MkMwMCc6J1xcdTJDMzAnLCdcXHUyQzAxJzonXFx1MkMzMScsJ1xcdTJDMDInOidcXHUyQzMyJywnXFx1MkMwMyc6J1xcdTJDMzMnLCdcXHUyQzA0JzonXFx1MkMzNCcsJ1xcdTJDMDUnOidcXHUyQzM1JywnXFx1MkMwNic6J1xcdTJDMzYnLCdcXHUyQzA3JzonXFx1MkMzNycsJ1xcdTJDMDgnOidcXHUyQzM4JywnXFx1MkMwOSc6J1xcdTJDMzknLCdcXHUyQzBBJzonXFx1MkMzQScsJ1xcdTJDMEInOidcXHUyQzNCJywnXFx1MkMwQyc6J1xcdTJDM0MnLCdcXHUyQzBEJzonXFx1MkMzRCcsJ1xcdTJDMEUnOidcXHUyQzNFJywnXFx1MkMwRic6J1xcdTJDM0YnLCdcXHUyQzEwJzonXFx1MkM0MCcsJ1xcdTJDMTEnOidcXHUyQzQxJywnXFx1MkMxMic6J1xcdTJDNDInLCdcXHUyQzEzJzonXFx1MkM0MycsJ1xcdTJDMTQnOidcXHUyQzQ0JywnXFx1MkMxNSc6J1xcdTJDNDUnLCdcXHUyQzE2JzonXFx1MkM0NicsJ1xcdTJDMTcnOidcXHUyQzQ3JywnXFx1MkMxOCc6J1xcdTJDNDgnLCdcXHUyQzE5JzonXFx1MkM0OScsJ1xcdTJDMUEnOidcXHUyQzRBJywnXFx1MkMxQic6J1xcdTJDNEInLCdcXHUyQzFDJzonXFx1MkM0QycsJ1xcdTJDMUQnOidcXHUyQzREJywnXFx1MkMxRSc6J1xcdTJDNEUnLCdcXHUyQzFGJzonXFx1MkM0RicsJ1xcdTJDMjAnOidcXHUyQzUwJywnXFx1MkMyMSc6J1xcdTJDNTEnLCdcXHUyQzIyJzonXFx1MkM1MicsJ1xcdTJDMjMnOidcXHUyQzUzJywnXFx1MkMyNCc6J1xcdTJDNTQnLCdcXHUyQzI1JzonXFx1MkM1NScsJ1xcdTJDMjYnOidcXHUyQzU2JywnXFx1MkMyNyc6J1xcdTJDNTcnLCdcXHUyQzI4JzonXFx1MkM1OCcsJ1xcdTJDMjknOidcXHUyQzU5JywnXFx1MkMyQSc6J1xcdTJDNUEnLCdcXHUyQzJCJzonXFx1MkM1QicsJ1xcdTJDMkMnOidcXHUyQzVDJywnXFx1MkMyRCc6J1xcdTJDNUQnLCdcXHUyQzJFJzonXFx1MkM1RScsJ1xcdTJDNjAnOidcXHUyQzYxJywnXFx1MkM2Mic6J1xcdTAyNkInLCdcXHUyQzYzJzonXFx1MUQ3RCcsJ1xcdTJDNjQnOidcXHUwMjdEJywnXFx1MkM2Nyc6J1xcdTJDNjgnLCdcXHUyQzY5JzonXFx1MkM2QScsJ1xcdTJDNkInOidcXHUyQzZDJywnXFx1MkM2RCc6J1xcdTAyNTEnLCdcXHUyQzZFJzonXFx1MDI3MScsJ1xcdTJDNkYnOidcXHUwMjUwJywnXFx1MkM3MCc6J1xcdTAyNTInLCdcXHUyQzcyJzonXFx1MkM3MycsJ1xcdTJDNzUnOidcXHUyQzc2JywnXFx1MkM3RSc6J1xcdTAyM0YnLCdcXHUyQzdGJzonXFx1MDI0MCcsJ1xcdTJDODAnOidcXHUyQzgxJywnXFx1MkM4Mic6J1xcdTJDODMnLCdcXHUyQzg0JzonXFx1MkM4NScsJ1xcdTJDODYnOidcXHUyQzg3JywnXFx1MkM4OCc6J1xcdTJDODknLCdcXHUyQzhBJzonXFx1MkM4QicsJ1xcdTJDOEMnOidcXHUyQzhEJywnXFx1MkM4RSc6J1xcdTJDOEYnLCdcXHUyQzkwJzonXFx1MkM5MScsJ1xcdTJDOTInOidcXHUyQzkzJywnXFx1MkM5NCc6J1xcdTJDOTUnLCdcXHUyQzk2JzonXFx1MkM5NycsJ1xcdTJDOTgnOidcXHUyQzk5JywnXFx1MkM5QSc6J1xcdTJDOUInLCdcXHUyQzlDJzonXFx1MkM5RCcsJ1xcdTJDOUUnOidcXHUyQzlGJywnXFx1MkNBMCc6J1xcdTJDQTEnLCdcXHUyQ0EyJzonXFx1MkNBMycsJ1xcdTJDQTQnOidcXHUyQ0E1JywnXFx1MkNBNic6J1xcdTJDQTcnLCdcXHUyQ0E4JzonXFx1MkNBOScsJ1xcdTJDQUEnOidcXHUyQ0FCJywnXFx1MkNBQyc6J1xcdTJDQUQnLCdcXHUyQ0FFJzonXFx1MkNBRicsJ1xcdTJDQjAnOidcXHUyQ0IxJywnXFx1MkNCMic6J1xcdTJDQjMnLCdcXHUyQ0I0JzonXFx1MkNCNScsJ1xcdTJDQjYnOidcXHUyQ0I3JywnXFx1MkNCOCc6J1xcdTJDQjknLCdcXHUyQ0JBJzonXFx1MkNCQicsJ1xcdTJDQkMnOidcXHUyQ0JEJywnXFx1MkNCRSc6J1xcdTJDQkYnLCdcXHUyQ0MwJzonXFx1MkNDMScsJ1xcdTJDQzInOidcXHUyQ0MzJywnXFx1MkNDNCc6J1xcdTJDQzUnLCdcXHUyQ0M2JzonXFx1MkNDNycsJ1xcdTJDQzgnOidcXHUyQ0M5JywnXFx1MkNDQSc6J1xcdTJDQ0InLCdcXHUyQ0NDJzonXFx1MkNDRCcsJ1xcdTJDQ0UnOidcXHUyQ0NGJywnXFx1MkNEMCc6J1xcdTJDRDEnLCdcXHUyQ0QyJzonXFx1MkNEMycsJ1xcdTJDRDQnOidcXHUyQ0Q1JywnXFx1MkNENic6J1xcdTJDRDcnLCdcXHUyQ0Q4JzonXFx1MkNEOScsJ1xcdTJDREEnOidcXHUyQ0RCJywnXFx1MkNEQyc6J1xcdTJDREQnLCdcXHUyQ0RFJzonXFx1MkNERicsJ1xcdTJDRTAnOidcXHUyQ0UxJywnXFx1MkNFMic6J1xcdTJDRTMnLCdcXHUyQ0VCJzonXFx1MkNFQycsJ1xcdTJDRUQnOidcXHUyQ0VFJywnXFx1MkNGMic6J1xcdTJDRjMnLCdcXHVBNjQwJzonXFx1QTY0MScsJ1xcdUE2NDInOidcXHVBNjQzJywnXFx1QTY0NCc6J1xcdUE2NDUnLCdcXHVBNjQ2JzonXFx1QTY0NycsJ1xcdUE2NDgnOidcXHVBNjQ5JywnXFx1QTY0QSc6J1xcdUE2NEInLCdcXHVBNjRDJzonXFx1QTY0RCcsJ1xcdUE2NEUnOidcXHVBNjRGJywnXFx1QTY1MCc6J1xcdUE2NTEnLCdcXHVBNjUyJzonXFx1QTY1MycsJ1xcdUE2NTQnOidcXHVBNjU1JywnXFx1QTY1Nic6J1xcdUE2NTcnLCdcXHVBNjU4JzonXFx1QTY1OScsJ1xcdUE2NUEnOidcXHVBNjVCJywnXFx1QTY1Qyc6J1xcdUE2NUQnLCdcXHVBNjVFJzonXFx1QTY1RicsJ1xcdUE2NjAnOidcXHVBNjYxJywnXFx1QTY2Mic6J1xcdUE2NjMnLCdcXHVBNjY0JzonXFx1QTY2NScsJ1xcdUE2NjYnOidcXHVBNjY3JywnXFx1QTY2OCc6J1xcdUE2NjknLCdcXHVBNjZBJzonXFx1QTY2QicsJ1xcdUE2NkMnOidcXHVBNjZEJywnXFx1QTY4MCc6J1xcdUE2ODEnLCdcXHVBNjgyJzonXFx1QTY4MycsJ1xcdUE2ODQnOidcXHVBNjg1JywnXFx1QTY4Nic6J1xcdUE2ODcnLCdcXHVBNjg4JzonXFx1QTY4OScsJ1xcdUE2OEEnOidcXHVBNjhCJywnXFx1QTY4Qyc6J1xcdUE2OEQnLCdcXHVBNjhFJzonXFx1QTY4RicsJ1xcdUE2OTAnOidcXHVBNjkxJywnXFx1QTY5Mic6J1xcdUE2OTMnLCdcXHVBNjk0JzonXFx1QTY5NScsJ1xcdUE2OTYnOidcXHVBNjk3JywnXFx1QTY5OCc6J1xcdUE2OTknLCdcXHVBNjlBJzonXFx1QTY5QicsJ1xcdUE3MjInOidcXHVBNzIzJywnXFx1QTcyNCc6J1xcdUE3MjUnLCdcXHVBNzI2JzonXFx1QTcyNycsJ1xcdUE3MjgnOidcXHVBNzI5JywnXFx1QTcyQSc6J1xcdUE3MkInLCdcXHVBNzJDJzonXFx1QTcyRCcsJ1xcdUE3MkUnOidcXHVBNzJGJywnXFx1QTczMic6J1xcdUE3MzMnLCdcXHVBNzM0JzonXFx1QTczNScsJ1xcdUE3MzYnOidcXHVBNzM3JywnXFx1QTczOCc6J1xcdUE3MzknLCdcXHVBNzNBJzonXFx1QTczQicsJ1xcdUE3M0MnOidcXHVBNzNEJywnXFx1QTczRSc6J1xcdUE3M0YnLCdcXHVBNzQwJzonXFx1QTc0MScsJ1xcdUE3NDInOidcXHVBNzQzJywnXFx1QTc0NCc6J1xcdUE3NDUnLCdcXHVBNzQ2JzonXFx1QTc0NycsJ1xcdUE3NDgnOidcXHVBNzQ5JywnXFx1QTc0QSc6J1xcdUE3NEInLCdcXHVBNzRDJzonXFx1QTc0RCcsJ1xcdUE3NEUnOidcXHVBNzRGJywnXFx1QTc1MCc6J1xcdUE3NTEnLCdcXHVBNzUyJzonXFx1QTc1MycsJ1xcdUE3NTQnOidcXHVBNzU1JywnXFx1QTc1Nic6J1xcdUE3NTcnLCdcXHVBNzU4JzonXFx1QTc1OScsJ1xcdUE3NUEnOidcXHVBNzVCJywnXFx1QTc1Qyc6J1xcdUE3NUQnLCdcXHVBNzVFJzonXFx1QTc1RicsJ1xcdUE3NjAnOidcXHVBNzYxJywnXFx1QTc2Mic6J1xcdUE3NjMnLCdcXHVBNzY0JzonXFx1QTc2NScsJ1xcdUE3NjYnOidcXHVBNzY3JywnXFx1QTc2OCc6J1xcdUE3NjknLCdcXHVBNzZBJzonXFx1QTc2QicsJ1xcdUE3NkMnOidcXHVBNzZEJywnXFx1QTc2RSc6J1xcdUE3NkYnLCdcXHVBNzc5JzonXFx1QTc3QScsJ1xcdUE3N0InOidcXHVBNzdDJywnXFx1QTc3RCc6J1xcdTFENzknLCdcXHVBNzdFJzonXFx1QTc3RicsJ1xcdUE3ODAnOidcXHVBNzgxJywnXFx1QTc4Mic6J1xcdUE3ODMnLCdcXHVBNzg0JzonXFx1QTc4NScsJ1xcdUE3ODYnOidcXHVBNzg3JywnXFx1QTc4Qic6J1xcdUE3OEMnLCdcXHVBNzhEJzonXFx1MDI2NScsJ1xcdUE3OTAnOidcXHVBNzkxJywnXFx1QTc5Mic6J1xcdUE3OTMnLCdcXHVBNzk2JzonXFx1QTc5NycsJ1xcdUE3OTgnOidcXHVBNzk5JywnXFx1QTc5QSc6J1xcdUE3OUInLCdcXHVBNzlDJzonXFx1QTc5RCcsJ1xcdUE3OUUnOidcXHVBNzlGJywnXFx1QTdBMCc6J1xcdUE3QTEnLCdcXHVBN0EyJzonXFx1QTdBMycsJ1xcdUE3QTQnOidcXHVBN0E1JywnXFx1QTdBNic6J1xcdUE3QTcnLCdcXHVBN0E4JzonXFx1QTdBOScsJ1xcdUE3QUEnOidcXHUwMjY2JywnXFx1QTdBQic6J1xcdTAyNUMnLCdcXHVBN0FDJzonXFx1MDI2MScsJ1xcdUE3QUQnOidcXHUwMjZDJywnXFx1QTdCMCc6J1xcdTAyOUUnLCdcXHVBN0IxJzonXFx1MDI4NycsJ1xcdUZGMjEnOidcXHVGRjQxJywnXFx1RkYyMic6J1xcdUZGNDInLCdcXHVGRjIzJzonXFx1RkY0MycsJ1xcdUZGMjQnOidcXHVGRjQ0JywnXFx1RkYyNSc6J1xcdUZGNDUnLCdcXHVGRjI2JzonXFx1RkY0NicsJ1xcdUZGMjcnOidcXHVGRjQ3JywnXFx1RkYyOCc6J1xcdUZGNDgnLCdcXHVGRjI5JzonXFx1RkY0OScsJ1xcdUZGMkEnOidcXHVGRjRBJywnXFx1RkYyQic6J1xcdUZGNEInLCdcXHVGRjJDJzonXFx1RkY0QycsJ1xcdUZGMkQnOidcXHVGRjREJywnXFx1RkYyRSc6J1xcdUZGNEUnLCdcXHVGRjJGJzonXFx1RkY0RicsJ1xcdUZGMzAnOidcXHVGRjUwJywnXFx1RkYzMSc6J1xcdUZGNTEnLCdcXHVGRjMyJzonXFx1RkY1MicsJ1xcdUZGMzMnOidcXHVGRjUzJywnXFx1RkYzNCc6J1xcdUZGNTQnLCdcXHVGRjM1JzonXFx1RkY1NScsJ1xcdUZGMzYnOidcXHVGRjU2JywnXFx1RkYzNyc6J1xcdUZGNTcnLCdcXHVGRjM4JzonXFx1RkY1OCcsJ1xcdUZGMzknOidcXHVGRjU5JywnXFx1RkYzQSc6J1xcdUZGNUEnLCdcXHVEODAxXFx1REMwMCc6J1xcdUQ4MDFcXHVEQzI4JywnXFx1RDgwMVxcdURDMDEnOidcXHVEODAxXFx1REMyOScsJ1xcdUQ4MDFcXHVEQzAyJzonXFx1RDgwMVxcdURDMkEnLCdcXHVEODAxXFx1REMwMyc6J1xcdUQ4MDFcXHVEQzJCJywnXFx1RDgwMVxcdURDMDQnOidcXHVEODAxXFx1REMyQycsJ1xcdUQ4MDFcXHVEQzA1JzonXFx1RDgwMVxcdURDMkQnLCdcXHVEODAxXFx1REMwNic6J1xcdUQ4MDFcXHVEQzJFJywnXFx1RDgwMVxcdURDMDcnOidcXHVEODAxXFx1REMyRicsJ1xcdUQ4MDFcXHVEQzA4JzonXFx1RDgwMVxcdURDMzAnLCdcXHVEODAxXFx1REMwOSc6J1xcdUQ4MDFcXHVEQzMxJywnXFx1RDgwMVxcdURDMEEnOidcXHVEODAxXFx1REMzMicsJ1xcdUQ4MDFcXHVEQzBCJzonXFx1RDgwMVxcdURDMzMnLCdcXHVEODAxXFx1REMwQyc6J1xcdUQ4MDFcXHVEQzM0JywnXFx1RDgwMVxcdURDMEQnOidcXHVEODAxXFx1REMzNScsJ1xcdUQ4MDFcXHVEQzBFJzonXFx1RDgwMVxcdURDMzYnLCdcXHVEODAxXFx1REMwRic6J1xcdUQ4MDFcXHVEQzM3JywnXFx1RDgwMVxcdURDMTAnOidcXHVEODAxXFx1REMzOCcsJ1xcdUQ4MDFcXHVEQzExJzonXFx1RDgwMVxcdURDMzknLCdcXHVEODAxXFx1REMxMic6J1xcdUQ4MDFcXHVEQzNBJywnXFx1RDgwMVxcdURDMTMnOidcXHVEODAxXFx1REMzQicsJ1xcdUQ4MDFcXHVEQzE0JzonXFx1RDgwMVxcdURDM0MnLCdcXHVEODAxXFx1REMxNSc6J1xcdUQ4MDFcXHVEQzNEJywnXFx1RDgwMVxcdURDMTYnOidcXHVEODAxXFx1REMzRScsJ1xcdUQ4MDFcXHVEQzE3JzonXFx1RDgwMVxcdURDM0YnLCdcXHVEODAxXFx1REMxOCc6J1xcdUQ4MDFcXHVEQzQwJywnXFx1RDgwMVxcdURDMTknOidcXHVEODAxXFx1REM0MScsJ1xcdUQ4MDFcXHVEQzFBJzonXFx1RDgwMVxcdURDNDInLCdcXHVEODAxXFx1REMxQic6J1xcdUQ4MDFcXHVEQzQzJywnXFx1RDgwMVxcdURDMUMnOidcXHVEODAxXFx1REM0NCcsJ1xcdUQ4MDFcXHVEQzFEJzonXFx1RDgwMVxcdURDNDUnLCdcXHVEODAxXFx1REMxRSc6J1xcdUQ4MDFcXHVEQzQ2JywnXFx1RDgwMVxcdURDMUYnOidcXHVEODAxXFx1REM0NycsJ1xcdUQ4MDFcXHVEQzIwJzonXFx1RDgwMVxcdURDNDgnLCdcXHVEODAxXFx1REMyMSc6J1xcdUQ4MDFcXHVEQzQ5JywnXFx1RDgwMVxcdURDMjInOidcXHVEODAxXFx1REM0QScsJ1xcdUQ4MDFcXHVEQzIzJzonXFx1RDgwMVxcdURDNEInLCdcXHVEODAxXFx1REMyNCc6J1xcdUQ4MDFcXHVEQzRDJywnXFx1RDgwMVxcdURDMjUnOidcXHVEODAxXFx1REM0RCcsJ1xcdUQ4MDFcXHVEQzI2JzonXFx1RDgwMVxcdURDNEUnLCdcXHVEODAxXFx1REMyNyc6J1xcdUQ4MDFcXHVEQzRGJywnXFx1RDgwNlxcdURDQTAnOidcXHVEODA2XFx1RENDMCcsJ1xcdUQ4MDZcXHVEQ0ExJzonXFx1RDgwNlxcdURDQzEnLCdcXHVEODA2XFx1RENBMic6J1xcdUQ4MDZcXHVEQ0MyJywnXFx1RDgwNlxcdURDQTMnOidcXHVEODA2XFx1RENDMycsJ1xcdUQ4MDZcXHVEQ0E0JzonXFx1RDgwNlxcdURDQzQnLCdcXHVEODA2XFx1RENBNSc6J1xcdUQ4MDZcXHVEQ0M1JywnXFx1RDgwNlxcdURDQTYnOidcXHVEODA2XFx1RENDNicsJ1xcdUQ4MDZcXHVEQ0E3JzonXFx1RDgwNlxcdURDQzcnLCdcXHVEODA2XFx1RENBOCc6J1xcdUQ4MDZcXHVEQ0M4JywnXFx1RDgwNlxcdURDQTknOidcXHVEODA2XFx1RENDOScsJ1xcdUQ4MDZcXHVEQ0FBJzonXFx1RDgwNlxcdURDQ0EnLCdcXHVEODA2XFx1RENBQic6J1xcdUQ4MDZcXHVEQ0NCJywnXFx1RDgwNlxcdURDQUMnOidcXHVEODA2XFx1RENDQycsJ1xcdUQ4MDZcXHVEQ0FEJzonXFx1RDgwNlxcdURDQ0QnLCdcXHVEODA2XFx1RENBRSc6J1xcdUQ4MDZcXHVEQ0NFJywnXFx1RDgwNlxcdURDQUYnOidcXHVEODA2XFx1RENDRicsJ1xcdUQ4MDZcXHVEQ0IwJzonXFx1RDgwNlxcdURDRDAnLCdcXHVEODA2XFx1RENCMSc6J1xcdUQ4MDZcXHVEQ0QxJywnXFx1RDgwNlxcdURDQjInOidcXHVEODA2XFx1RENEMicsJ1xcdUQ4MDZcXHVEQ0IzJzonXFx1RDgwNlxcdURDRDMnLCdcXHVEODA2XFx1RENCNCc6J1xcdUQ4MDZcXHVEQ0Q0JywnXFx1RDgwNlxcdURDQjUnOidcXHVEODA2XFx1RENENScsJ1xcdUQ4MDZcXHVEQ0I2JzonXFx1RDgwNlxcdURDRDYnLCdcXHVEODA2XFx1RENCNyc6J1xcdUQ4MDZcXHVEQ0Q3JywnXFx1RDgwNlxcdURDQjgnOidcXHVEODA2XFx1RENEOCcsJ1xcdUQ4MDZcXHVEQ0I5JzonXFx1RDgwNlxcdURDRDknLCdcXHVEODA2XFx1RENCQSc6J1xcdUQ4MDZcXHVEQ0RBJywnXFx1RDgwNlxcdURDQkInOidcXHVEODA2XFx1RENEQicsJ1xcdUQ4MDZcXHVEQ0JDJzonXFx1RDgwNlxcdURDREMnLCdcXHVEODA2XFx1RENCRCc6J1xcdUQ4MDZcXHVEQ0REJywnXFx1RDgwNlxcdURDQkUnOidcXHVEODA2XFx1RENERScsJ1xcdUQ4MDZcXHVEQ0JGJzonXFx1RDgwNlxcdURDREYnLCdcXHhERic6J3NzJywnXFx1MDEzMCc6J2lcXHUwMzA3JywnXFx1MDE0OSc6J1xcdTAyQkNuJywnXFx1MDFGMCc6J2pcXHUwMzBDJywnXFx1MDM5MCc6J1xcdTAzQjlcXHUwMzA4XFx1MDMwMScsJ1xcdTAzQjAnOidcXHUwM0M1XFx1MDMwOFxcdTAzMDEnLCdcXHUwNTg3JzonXFx1MDU2NVxcdTA1ODInLCdcXHUxRTk2JzonaFxcdTAzMzEnLCdcXHUxRTk3JzondFxcdTAzMDgnLCdcXHUxRTk4Jzond1xcdTAzMEEnLCdcXHUxRTk5JzoneVxcdTAzMEEnLCdcXHUxRTlBJzonYVxcdTAyQkUnLCdcXHUxRTlFJzonc3MnLCdcXHUxRjUwJzonXFx1MDNDNVxcdTAzMTMnLCdcXHUxRjUyJzonXFx1MDNDNVxcdTAzMTNcXHUwMzAwJywnXFx1MUY1NCc6J1xcdTAzQzVcXHUwMzEzXFx1MDMwMScsJ1xcdTFGNTYnOidcXHUwM0M1XFx1MDMxM1xcdTAzNDInLCdcXHUxRjgwJzonXFx1MUYwMFxcdTAzQjknLCdcXHUxRjgxJzonXFx1MUYwMVxcdTAzQjknLCdcXHUxRjgyJzonXFx1MUYwMlxcdTAzQjknLCdcXHUxRjgzJzonXFx1MUYwM1xcdTAzQjknLCdcXHUxRjg0JzonXFx1MUYwNFxcdTAzQjknLCdcXHUxRjg1JzonXFx1MUYwNVxcdTAzQjknLCdcXHUxRjg2JzonXFx1MUYwNlxcdTAzQjknLCdcXHUxRjg3JzonXFx1MUYwN1xcdTAzQjknLCdcXHUxRjg4JzonXFx1MUYwMFxcdTAzQjknLCdcXHUxRjg5JzonXFx1MUYwMVxcdTAzQjknLCdcXHUxRjhBJzonXFx1MUYwMlxcdTAzQjknLCdcXHUxRjhCJzonXFx1MUYwM1xcdTAzQjknLCdcXHUxRjhDJzonXFx1MUYwNFxcdTAzQjknLCdcXHUxRjhEJzonXFx1MUYwNVxcdTAzQjknLCdcXHUxRjhFJzonXFx1MUYwNlxcdTAzQjknLCdcXHUxRjhGJzonXFx1MUYwN1xcdTAzQjknLCdcXHUxRjkwJzonXFx1MUYyMFxcdTAzQjknLCdcXHUxRjkxJzonXFx1MUYyMVxcdTAzQjknLCdcXHUxRjkyJzonXFx1MUYyMlxcdTAzQjknLCdcXHUxRjkzJzonXFx1MUYyM1xcdTAzQjknLCdcXHUxRjk0JzonXFx1MUYyNFxcdTAzQjknLCdcXHUxRjk1JzonXFx1MUYyNVxcdTAzQjknLCdcXHUxRjk2JzonXFx1MUYyNlxcdTAzQjknLCdcXHUxRjk3JzonXFx1MUYyN1xcdTAzQjknLCdcXHUxRjk4JzonXFx1MUYyMFxcdTAzQjknLCdcXHUxRjk5JzonXFx1MUYyMVxcdTAzQjknLCdcXHUxRjlBJzonXFx1MUYyMlxcdTAzQjknLCdcXHUxRjlCJzonXFx1MUYyM1xcdTAzQjknLCdcXHUxRjlDJzonXFx1MUYyNFxcdTAzQjknLCdcXHUxRjlEJzonXFx1MUYyNVxcdTAzQjknLCdcXHUxRjlFJzonXFx1MUYyNlxcdTAzQjknLCdcXHUxRjlGJzonXFx1MUYyN1xcdTAzQjknLCdcXHUxRkEwJzonXFx1MUY2MFxcdTAzQjknLCdcXHUxRkExJzonXFx1MUY2MVxcdTAzQjknLCdcXHUxRkEyJzonXFx1MUY2MlxcdTAzQjknLCdcXHUxRkEzJzonXFx1MUY2M1xcdTAzQjknLCdcXHUxRkE0JzonXFx1MUY2NFxcdTAzQjknLCdcXHUxRkE1JzonXFx1MUY2NVxcdTAzQjknLCdcXHUxRkE2JzonXFx1MUY2NlxcdTAzQjknLCdcXHUxRkE3JzonXFx1MUY2N1xcdTAzQjknLCdcXHUxRkE4JzonXFx1MUY2MFxcdTAzQjknLCdcXHUxRkE5JzonXFx1MUY2MVxcdTAzQjknLCdcXHUxRkFBJzonXFx1MUY2MlxcdTAzQjknLCdcXHUxRkFCJzonXFx1MUY2M1xcdTAzQjknLCdcXHUxRkFDJzonXFx1MUY2NFxcdTAzQjknLCdcXHUxRkFEJzonXFx1MUY2NVxcdTAzQjknLCdcXHUxRkFFJzonXFx1MUY2NlxcdTAzQjknLCdcXHUxRkFGJzonXFx1MUY2N1xcdTAzQjknLCdcXHUxRkIyJzonXFx1MUY3MFxcdTAzQjknLCdcXHUxRkIzJzonXFx1MDNCMVxcdTAzQjknLCdcXHUxRkI0JzonXFx1MDNBQ1xcdTAzQjknLCdcXHUxRkI2JzonXFx1MDNCMVxcdTAzNDInLCdcXHUxRkI3JzonXFx1MDNCMVxcdTAzNDJcXHUwM0I5JywnXFx1MUZCQyc6J1xcdTAzQjFcXHUwM0I5JywnXFx1MUZDMic6J1xcdTFGNzRcXHUwM0I5JywnXFx1MUZDMyc6J1xcdTAzQjdcXHUwM0I5JywnXFx1MUZDNCc6J1xcdTAzQUVcXHUwM0I5JywnXFx1MUZDNic6J1xcdTAzQjdcXHUwMzQyJywnXFx1MUZDNyc6J1xcdTAzQjdcXHUwMzQyXFx1MDNCOScsJ1xcdTFGQ0MnOidcXHUwM0I3XFx1MDNCOScsJ1xcdTFGRDInOidcXHUwM0I5XFx1MDMwOFxcdTAzMDAnLCdcXHUxRkQzJzonXFx1MDNCOVxcdTAzMDhcXHUwMzAxJywnXFx1MUZENic6J1xcdTAzQjlcXHUwMzQyJywnXFx1MUZENyc6J1xcdTAzQjlcXHUwMzA4XFx1MDM0MicsJ1xcdTFGRTInOidcXHUwM0M1XFx1MDMwOFxcdTAzMDAnLCdcXHUxRkUzJzonXFx1MDNDNVxcdTAzMDhcXHUwMzAxJywnXFx1MUZFNCc6J1xcdTAzQzFcXHUwMzEzJywnXFx1MUZFNic6J1xcdTAzQzVcXHUwMzQyJywnXFx1MUZFNyc6J1xcdTAzQzVcXHUwMzA4XFx1MDM0MicsJ1xcdTFGRjInOidcXHUxRjdDXFx1MDNCOScsJ1xcdTFGRjMnOidcXHUwM0M5XFx1MDNCOScsJ1xcdTFGRjQnOidcXHUwM0NFXFx1MDNCOScsJ1xcdTFGRjYnOidcXHUwM0M5XFx1MDM0MicsJ1xcdTFGRjcnOidcXHUwM0M5XFx1MDM0MlxcdTAzQjknLCdcXHUxRkZDJzonXFx1MDNDOVxcdTAzQjknLCdcXHVGQjAwJzonZmYnLCdcXHVGQjAxJzonZmknLCdcXHVGQjAyJzonZmwnLCdcXHVGQjAzJzonZmZpJywnXFx1RkIwNCc6J2ZmbCcsJ1xcdUZCMDUnOidzdCcsJ1xcdUZCMDYnOidzdCcsJ1xcdUZCMTMnOidcXHUwNTc0XFx1MDU3NicsJ1xcdUZCMTQnOidcXHUwNTc0XFx1MDU2NScsJ1xcdUZCMTUnOidcXHUwNTc0XFx1MDU2QicsJ1xcdUZCMTYnOidcXHUwNTdFXFx1MDU3NicsJ1xcdUZCMTcnOidcXHUwNTc0XFx1MDU2RCd9O1xuXG4vLyBOb3JtYWxpemUgcmVmZXJlbmNlIGxhYmVsOiBjb2xsYXBzZSBpbnRlcm5hbCB3aGl0ZXNwYWNlXG4vLyB0byBzaW5nbGUgc3BhY2UsIHJlbW92ZSBsZWFkaW5nL3RyYWlsaW5nIHdoaXRlc3BhY2UsIGNhc2UgZm9sZC5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5zbGljZSgxLCBzdHJpbmcubGVuZ3RoIC0gMSkudHJpbSgpLnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uKCQwKSB7XG4gICAgICAgIC8vIE5vdGU6IHRoZXJlIGlzIG5vIG5lZWQgdG8gY2hlY2sgYGhhc093blByb3BlcnR5KCQwKWAgaGVyZS5cbiAgICAgICAgLy8gSWYgY2hhcmFjdGVyIG5vdCBmb3VuZCBpbiBsb29rdXAgdGFibGUsIGl0IG11c3QgYmUgd2hpdGVzcGFjZS5cbiAgICAgICAgcmV0dXJuIG1hcFskMF0gfHwgJyAnO1xuICAgIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL25vcm1hbGl6ZS1yZWZlcmVuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBkZXJpdmVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLmZyb21Db2RlUG9pbnRcbi8qISBodHRwOi8vbXRocy5iZS9mcm9tY29kZXBvaW50IHYwLjIuMSBieSBAbWF0aGlhcyAqL1xuaWYgKFN0cmluZy5mcm9tQ29kZVBvaW50KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50KF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFJhbmdlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0gZWxzZSB7XG5cbiAgdmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG4gIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gIHZhciBmcm9tQ29kZVBvaW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgTUFYX1NJWkUgPSAweDQwMDA7XG4gICAgICB2YXIgY29kZVVuaXRzID0gW107XG4gICAgICB2YXIgaGlnaFN1cnJvZ2F0ZTtcbiAgICAgIHZhciBsb3dTdXJyb2dhdGU7XG4gICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSBOdW1iZXIoYXJndW1lbnRzW2luZGV4XSk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhaXNGaW5pdGUoY29kZVBvaW50KSB8fCAvLyBgTmFOYCwgYCtJbmZpbml0eWAsIG9yIGAtSW5maW5pdHlgXG4gICAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPCAwIHx8IC8vIG5vdCBhIHZhbGlkIFVuaWNvZGUgY29kZSBwb2ludFxuICAgICAgICAgICAgICAgICAgY29kZVBvaW50ID4gMHgxMEZGRkYgfHwgLy8gbm90IGEgdmFsaWQgVW5pY29kZSBjb2RlIHBvaW50XG4gICAgICAgICAgICAgICAgICBmbG9vcihjb2RlUG9pbnQpICE9PSBjb2RlUG9pbnQgLy8gbm90IGFuIGludGVnZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvZGVQb2ludCA8PSAweEZGRkYpIHsgLy8gQk1QIGNvZGUgcG9pbnRcbiAgICAgICAgICAgICAgY29kZVVuaXRzLnB1c2goY29kZVBvaW50KTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBBc3RyYWwgY29kZSBwb2ludDsgc3BsaXQgaW4gc3Vycm9nYXRlIGhhbHZlc1xuICAgICAgICAgICAgICAvLyBodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuICAgICAgICAgICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMDtcbiAgICAgICAgICAgICAgaGlnaFN1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgPj4gMTApICsgMHhEODAwO1xuICAgICAgICAgICAgICBsb3dTdXJyb2dhdGUgPSAoY29kZVBvaW50ICUgMHg0MDApICsgMHhEQzAwO1xuICAgICAgICAgICAgICBjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW5kZXggKyAxID09PSBsZW5ndGggfHwgY29kZVVuaXRzLmxlbmd0aCA+IE1BWF9TSVpFKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCArPSBzdHJpbmdGcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKTtcbiAgICAgICAgICAgICAgY29kZVVuaXRzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmcm9tQ29kZVBvaW50O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvZnJvbS1jb2RlLXBvaW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiEgaHR0cDovL210aHMuYmUvcmVwZWF0IHYwLjIuMCBieSBAbWF0aGlhcyAqL1xuaWYgKCFTdHJpbmcucHJvdG90eXBlLnJlcGVhdCkge1xuXHQoZnVuY3Rpb24oKSB7XG5cdFx0J3VzZSBzdHJpY3QnOyAvLyBuZWVkZWQgdG8gc3VwcG9ydCBgYXBwbHlgL2BjYWxsYCB3aXRoIGB1bmRlZmluZWRgL2BudWxsYFxuXHRcdHZhciBkZWZpbmVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcblx0XHRcdC8vIElFIDggb25seSBzdXBwb3J0cyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBvbiBET00gZWxlbWVudHNcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBvYmplY3QgPSB7fTtcblx0XHRcdFx0dmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblx0XHRcdFx0dmFyIHJlc3VsdCA9ICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG9iamVjdCwgb2JqZWN0KSAmJiAkZGVmaW5lUHJvcGVydHk7XG5cdFx0XHR9IGNhdGNoKGVycm9yKSB7fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KCkpO1xuXHRcdHZhciByZXBlYXQgPSBmdW5jdGlvbihjb3VudCkge1xuXHRcdFx0aWYgKHRoaXMgPT0gbnVsbCkge1xuXHRcdFx0XHR0aHJvdyBUeXBlRXJyb3IoKTtcblx0XHRcdH1cblx0XHRcdHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG5cdFx0XHQvLyBgVG9JbnRlZ2VyYFxuXHRcdFx0dmFyIG4gPSBjb3VudCA/IE51bWJlcihjb3VudCkgOiAwO1xuXHRcdFx0aWYgKG4gIT0gbikgeyAvLyBiZXR0ZXIgYGlzTmFOYFxuXHRcdFx0XHRuID0gMDtcblx0XHRcdH1cblx0XHRcdC8vIEFjY291bnQgZm9yIG91dC1vZi1ib3VuZHMgaW5kaWNlc1xuXHRcdFx0aWYgKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpIHtcblx0XHRcdFx0dGhyb3cgUmFuZ2VFcnJvcigpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdFx0d2hpbGUgKG4pIHtcblx0XHRcdFx0aWYgKG4gJSAyID09IDEpIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gc3RyaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuID4gMSkge1xuXHRcdFx0XHRcdHN0cmluZyArPSBzdHJpbmc7XG5cdFx0XHRcdH1cblx0XHRcdFx0biA+Pj0gMTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblx0XHRpZiAoZGVmaW5lUHJvcGVydHkpIHtcblx0XHRcdGRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsICdyZXBlYXQnLCB7XG5cdFx0XHRcdCd2YWx1ZSc6IHJlcGVhdCxcblx0XHRcdFx0J2NvbmZpZ3VyYWJsZSc6IHRydWUsXG5cdFx0XHRcdCd3cml0YWJsZSc6IHRydWVcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRTdHJpbmcucHJvdG90eXBlLnJlcGVhdCA9IHJlcGVhdDtcblx0XHR9XG5cdH0oKSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnJlcGVhdC9yZXBlYXQuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlcmVyJyk7XG5cbnZhciByZVVuc2FmZVByb3RvY29sID0gL15qYXZhc2NyaXB0Onx2YnNjcmlwdDp8ZmlsZTp8ZGF0YTovaTtcbnZhciByZVNhZmVEYXRhUHJvdG9jb2wgPSAvXmRhdGE6aW1hZ2VcXC8oPzpwbmd8Z2lmfGpwZWd8d2VicCkvaTtcblxudmFyIHBvdGVudGlhbGx5VW5zYWZlID0gZnVuY3Rpb24odXJsKSB7XG4gIHJldHVybiByZVVuc2FmZVByb3RvY29sLnRlc3QodXJsKSAmJlxuICAgICAgIXJlU2FmZURhdGFQcm90b2NvbC50ZXN0KHVybCk7XG59O1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gcHJvZHVjZSBhbiBIVE1MIHRhZy5cbmZ1bmN0aW9uIHRhZyhuYW1lLCBhdHRycywgc2VsZmNsb3NpbmcpIHtcbiAgaWYgKHRoaXMuZGlzYWJsZVRhZ3MgPiAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuYnVmZmVyICs9ICgnPCcgKyBuYW1lKTtcbiAgaWYgKGF0dHJzICYmIGF0dHJzLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGF0dHJpYjtcbiAgICB3aGlsZSAoKGF0dHJpYiA9IGF0dHJzW2ldKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmJ1ZmZlciArPSAoJyAnICsgYXR0cmliWzBdICsgJz1cIicgKyBhdHRyaWJbMV0gKyAnXCInKTtcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbiAgaWYgKHNlbGZjbG9zaW5nKSB7XG4gICAgdGhpcy5idWZmZXIgKz0gJyAvJztcbiAgfVxuICB0aGlzLmJ1ZmZlciArPSAnPic7XG4gIHRoaXMubGFzdE91dCA9ICc+Jztcbn1cblxuZnVuY3Rpb24gSHRtbFJlbmRlcmVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIC8vIGJ5IGRlZmF1bHQsIHNvZnQgYnJlYWtzIGFyZSByZW5kZXJlZCBhcyBuZXdsaW5lcyBpbiBIVE1MXG4gIG9wdGlvbnMuc29mdGJyZWFrID0gb3B0aW9ucy5zb2Z0YnJlYWsgfHwgJ1xcbic7XG4gIC8vIHNldCB0byBcIjxiciAvPlwiIHRvIG1ha2UgdGhlbSBoYXJkIGJyZWFrc1xuICAvLyBzZXQgdG8gXCIgXCIgaWYgeW91IHdhbnQgdG8gaWdub3JlIGxpbmUgd3JhcHBpbmcgaW4gc291cmNlXG5cbiAgdGhpcy5kaXNhYmxlVGFncyA9IDA7XG4gIHRoaXMubGFzdE91dCA9IFwiXFxuXCI7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG59XG5cbi8qIE5vZGUgbWV0aG9kcyAqL1xuXG5mdW5jdGlvbiB0ZXh0KG5vZGUpIHtcbiAgdGhpcy5vdXQobm9kZS5saXRlcmFsKTtcbn1cblxuZnVuY3Rpb24gc29mdGJyZWFrKCkge1xuICB0aGlzLmxpdCh0aGlzLm9wdGlvbnMuc29mdGJyZWFrKTtcbn1cblxuZnVuY3Rpb24gbGluZWJyZWFrKCkge1xuICB0aGlzLnRhZygnYnInLCBbXSwgdHJ1ZSk7XG4gIHRoaXMuY3IoKTtcbn1cblxuZnVuY3Rpb24gbGluayhub2RlLCBlbnRlcmluZykge1xuICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICBpZiAoZW50ZXJpbmcpIHtcbiAgICBpZiAoISh0aGlzLm9wdGlvbnMuc2FmZSAmJiBwb3RlbnRpYWxseVVuc2FmZShub2RlLmRlc3RpbmF0aW9uKSkpIHtcbiAgICAgIGF0dHJzLnB1c2goWydocmVmJywgdGhpcy5lc2Mobm9kZS5kZXN0aW5hdGlvbiwgdHJ1ZSldKTtcbiAgICB9XG4gICAgaWYgKG5vZGUudGl0bGUpIHtcbiAgICAgIGF0dHJzLnB1c2goWyd0aXRsZScsIHRoaXMuZXNjKG5vZGUudGl0bGUsIHRydWUpXSk7XG4gICAgfVxuICAgIHRoaXMudGFnKCdhJywgYXR0cnMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFnKCcvYScpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGltYWdlKG5vZGUsIGVudGVyaW5nKSB7XG4gIGlmIChlbnRlcmluZykge1xuICAgIGlmICh0aGlzLmRpc2FibGVUYWdzID09PSAwKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNhZmUgJiYgcG90ZW50aWFsbHlVbnNhZmUobm9kZS5kZXN0aW5hdGlvbikpIHtcbiAgICAgICAgdGhpcy5saXQoJzxpbWcgc3JjPVwiXCIgYWx0PVwiJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpdCgnPGltZyBzcmM9XCInICsgdGhpcy5lc2Mobm9kZS5kZXN0aW5hdGlvbiwgdHJ1ZSkgK1xuICAgICAgICAgICAgJ1wiIGFsdD1cIicpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRpc2FibGVUYWdzICs9IDE7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kaXNhYmxlVGFncyAtPSAxO1xuICAgIGlmICh0aGlzLmRpc2FibGVUYWdzID09PSAwKSB7XG4gICAgICBpZiAobm9kZS50aXRsZSkge1xuICAgICAgICB0aGlzLmxpdCgnXCIgdGl0bGU9XCInICsgdGhpcy5lc2Mobm9kZS50aXRsZSwgdHJ1ZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5saXQoJ1wiIC8+Jyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGVtcGgobm9kZSwgZW50ZXJpbmcpIHtcbiAgdGhpcy50YWcoZW50ZXJpbmcgPyAnZW0nIDogJy9lbScpO1xufVxuXG5mdW5jdGlvbiBzdHJvbmcobm9kZSwgZW50ZXJpbmcpIHtcbiAgdGhpcy50YWcoZW50ZXJpbmcgPyAnc3Ryb25nJyA6ICcvc3Ryb25nJyk7XG59XG5cbmZ1bmN0aW9uIHBhcmFncmFwaChub2RlLCBlbnRlcmluZykge1xuICB2YXIgZ3JhbmRwYXJlbnQgPSBub2RlLnBhcmVudC5wYXJlbnRcbiAgICAsIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGdyYW5kcGFyZW50ICE9PSBudWxsICYmXG4gICAgZ3JhbmRwYXJlbnQudHlwZSA9PT0gJ2xpc3QnKSB7XG4gICAgaWYgKGdyYW5kcGFyZW50Lmxpc3RUaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoZW50ZXJpbmcpIHtcbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcoJ3AnLCBhdHRycyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50YWcoJy9wJyk7XG4gICAgdGhpcy5jcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhlYWRpbmcobm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIHRhZ25hbWUgPSAnaCcgKyBub2RlLmxldmVsXG4gICAgLCBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChlbnRlcmluZykge1xuICAgIHRoaXMuY3IoKTtcbiAgICB0aGlzLnRhZyh0YWduYW1lLCBhdHRycyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50YWcoJy8nICsgdGFnbmFtZSk7XG4gICAgdGhpcy5jcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvZGUobm9kZSkge1xuICB0aGlzLnRhZygnY29kZScpO1xuICB0aGlzLm91dChub2RlLmxpdGVyYWwpO1xuICB0aGlzLnRhZygnL2NvZGUnKTtcbn1cblxuZnVuY3Rpb24gY29kZV9ibG9jayhub2RlKSB7XG4gIHZhciBpbmZvX3dvcmRzID0gbm9kZS5pbmZvID8gbm9kZS5pbmZvLnNwbGl0KC9cXHMrLykgOiBbXVxuICAgICwgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICBpZiAoaW5mb193b3Jkcy5sZW5ndGggPiAwICYmIGluZm9fd29yZHNbMF0ubGVuZ3RoID4gMCkge1xuICAgIGF0dHJzLnB1c2goWydjbGFzcycsICdsYW5ndWFnZS0nICsgdGhpcy5lc2MoaW5mb193b3Jkc1swXSwgdHJ1ZSldKTtcbiAgfVxuICB0aGlzLmNyKCk7XG4gIHRoaXMudGFnKCdwcmUnKTtcbiAgdGhpcy50YWcoJ2NvZGUnLCBhdHRycyk7XG4gIHRoaXMub3V0KG5vZGUubGl0ZXJhbCk7XG4gIHRoaXMudGFnKCcvY29kZScpO1xuICB0aGlzLnRhZygnL3ByZScpO1xuICB0aGlzLmNyKCk7XG59XG5cbmZ1bmN0aW9uIHRoZW1hdGljX2JyZWFrKG5vZGUpIHtcbiAgdmFyIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgdGhpcy5jcigpO1xuICB0aGlzLnRhZygnaHInLCBhdHRycywgdHJ1ZSk7XG4gIHRoaXMuY3IoKTtcbn1cblxuZnVuY3Rpb24gYmxvY2tfcXVvdGUobm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKCdibG9ja3F1b3RlJywgYXR0cnMpO1xuICAgIHRoaXMuY3IoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcoJy9ibG9ja3F1b3RlJyk7XG4gICAgdGhpcy5jcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpc3Qobm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIHRhZ25hbWUgPSBub2RlLmxpc3RUeXBlID09PSAnYnVsbGV0JyA/ICd1bCcgOiAnb2wnXG4gICAgLCBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG5cbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgdmFyIHN0YXJ0ID0gbm9kZS5saXN0U3RhcnQ7XG4gICAgaWYgKHN0YXJ0ICE9PSBudWxsICYmIHN0YXJ0ICE9PSAxKSB7XG4gICAgICBhdHRycy5wdXNoKFsnc3RhcnQnLCBzdGFydC50b1N0cmluZygpXSk7XG4gICAgfVxuICAgIHRoaXMuY3IoKTtcbiAgICB0aGlzLnRhZyh0YWduYW1lLCBhdHRycyk7XG4gICAgdGhpcy5jcigpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY3IoKTtcbiAgICB0aGlzLnRhZygnLycgKyB0YWduYW1lKTtcbiAgICB0aGlzLmNyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXRlbShub2RlLCBlbnRlcmluZykge1xuICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICBpZiAoZW50ZXJpbmcpIHtcbiAgICB0aGlzLnRhZygnbGknLCBhdHRycyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50YWcoJy9saScpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBodG1sX2lubGluZShub2RlKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuc2FmZSkge1xuICAgIHRoaXMubGl0KCc8IS0tIHJhdyBIVE1MIG9taXR0ZWQgLS0+Jyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5saXQobm9kZS5saXRlcmFsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBodG1sX2Jsb2NrKG5vZGUpIHtcbiAgdGhpcy5jcigpO1xuICBpZiAodGhpcy5vcHRpb25zLnNhZmUpIHtcbiAgICB0aGlzLmxpdCgnPCEtLSByYXcgSFRNTCBvbWl0dGVkIC0tPicpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGl0KG5vZGUubGl0ZXJhbCk7XG4gIH1cbiAgdGhpcy5jcigpO1xufVxuXG5mdW5jdGlvbiBjdXN0b21faW5saW5lKG5vZGUsIGVudGVyaW5nKSB7XG4gIGlmIChlbnRlcmluZyAmJiBub2RlLm9uRW50ZXIpIHtcbiAgICB0aGlzLmxpdChub2RlLm9uRW50ZXIpO1xuICB9IGVsc2UgaWYgKCFlbnRlcmluZyAmJiBub2RlLm9uRXhpdCkge1xuICAgIHRoaXMubGl0KG5vZGUub25FeGl0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjdXN0b21fYmxvY2sobm9kZSwgZW50ZXJpbmcpIHtcbiAgdGhpcy5jcigpO1xuICBpZiAoZW50ZXJpbmcgJiYgbm9kZS5vbkVudGVyKSB7XG4gICAgdGhpcy5saXQobm9kZS5vbkVudGVyKTtcbiAgfSBlbHNlIGlmICghZW50ZXJpbmcgJiYgbm9kZS5vbkV4aXQpIHtcbiAgICB0aGlzLmxpdChub2RlLm9uRXhpdCk7XG4gIH1cbiAgdGhpcy5jcigpO1xufVxuXG4vKiBIZWxwZXIgbWV0aG9kcyAqL1xuXG5mdW5jdGlvbiBvdXQocykge1xuICB0aGlzLmxpdCh0aGlzLmVzYyhzLCBmYWxzZSkpO1xufVxuXG5mdW5jdGlvbiBhdHRycyAobm9kZSkge1xuICB2YXIgYXR0ID0gW107XG4gIGlmICh0aGlzLm9wdGlvbnMuc291cmNlcG9zKSB7XG4gICAgdmFyIHBvcyA9IG5vZGUuc291cmNlcG9zO1xuICAgIGlmIChwb3MpIHtcbiAgICAgIGF0dC5wdXNoKFsnZGF0YS1zb3VyY2Vwb3MnLCBTdHJpbmcocG9zWzBdWzBdKSArICc6JyArXG4gICAgICAgIFN0cmluZyhwb3NbMF1bMV0pICsgJy0nICsgU3RyaW5nKHBvc1sxXVswXSkgKyAnOicgK1xuICAgICAgICBTdHJpbmcocG9zWzFdWzFdKV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXR0O1xufVxuXG4vLyBxdWljayBicm93c2VyLWNvbXBhdGlibGUgaW5oZXJpdGFuY2Vcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlbmRlcmVyLnByb3RvdHlwZSk7XG5cbkh0bWxSZW5kZXJlci5wcm90b3R5cGUudGV4dCA9IHRleHQ7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmh0bWxfaW5saW5lID0gaHRtbF9pbmxpbmU7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmh0bWxfYmxvY2sgPSBodG1sX2Jsb2NrO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5zb2Z0YnJlYWsgPSBzb2Z0YnJlYWs7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmxpbmVicmVhayA9IGxpbmVicmVhaztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUubGluayA9IGxpbms7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmltYWdlID0gaW1hZ2U7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmVtcGggPSBlbXBoO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5zdHJvbmcgPSBzdHJvbmc7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnBhcmFncmFwaCA9IHBhcmFncmFwaDtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuaGVhZGluZyA9IGhlYWRpbmc7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmNvZGUgPSBjb2RlO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5jb2RlX2Jsb2NrID0gY29kZV9ibG9jaztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUudGhlbWF0aWNfYnJlYWsgPSB0aGVtYXRpY19icmVhaztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuYmxvY2tfcXVvdGUgPSBibG9ja19xdW90ZTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUubGlzdCA9IGxpc3Q7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLml0ZW0gPSBpdGVtO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5jdXN0b21faW5saW5lID0gY3VzdG9tX2lubGluZTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuY3VzdG9tX2Jsb2NrID0gY3VzdG9tX2Jsb2NrO1xuXG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmVzYyA9IHJlcXVpcmUoJy4uL2NvbW1vbicpLmVzY2FwZVhtbDtcblxuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5vdXQgPSBvdXQ7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnRhZyA9IHRhZztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuYXR0cnMgPSBhdHRycztcblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sUmVuZGVyZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9yZW5kZXIvaHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXInKTtcblxudmFyIHJlWE1MVGFnID0gL1xcPFtePl0qXFw+LztcblxuZnVuY3Rpb24gdG9UYWdOYW1lKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgXCIkMV8kMlwiKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBYbWxSZW5kZXJlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMuZGlzYWJsZVRhZ3MgPSAwO1xuICB0aGlzLmxhc3RPdXQgPSBcIlxcblwiO1xuXG4gIHRoaXMuaW5kZW50TGV2ZWwgPSAwO1xuICB0aGlzLmluZGVudCA9ICcgICc7XG5cbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gcmVuZGVyKGFzdCkge1xuXG4gIHRoaXMuYnVmZmVyID0gJyc7XG5cbiAgdmFyIGF0dHJzO1xuICB2YXIgdGFnbmFtZTtcbiAgdmFyIHdhbGtlciA9IGFzdC53YWxrZXIoKTtcbiAgdmFyIGV2ZW50LCBub2RlLCBlbnRlcmluZztcbiAgdmFyIGNvbnRhaW5lcjtcbiAgdmFyIHNlbGZDbG9zaW5nO1xuICB2YXIgbm9kZXR5cGU7XG5cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWUoXCJyZW5kZXJpbmdcIik7IH1cblxuICB0aGlzLmJ1ZmZlciArPSAnPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XFxuJztcbiAgdGhpcy5idWZmZXIgKz0gJzwhRE9DVFlQRSBkb2N1bWVudCBTWVNURU0gXCJDb21tb25NYXJrLmR0ZFwiPlxcbic7XG5cbiAgd2hpbGUgKChldmVudCA9IHdhbGtlci5uZXh0KCkpKSB7XG4gICAgZW50ZXJpbmcgPSBldmVudC5lbnRlcmluZztcbiAgICBub2RlID0gZXZlbnQubm9kZTtcbiAgICBub2RldHlwZSA9IG5vZGUudHlwZTtcblxuICAgIGNvbnRhaW5lciA9IG5vZGUuaXNDb250YWluZXI7XG5cbiAgICBzZWxmQ2xvc2luZyA9IG5vZGV0eXBlID09PSAndGhlbWF0aWNfYnJlYWsnXG4gICAgICB8fCBub2RldHlwZSA9PT0gJ2xpbmVicmVhaydcbiAgICAgIHx8IG5vZGV0eXBlID09PSAnc29mdGJyZWFrJztcblxuICAgIHRhZ25hbWUgPSB0b1RhZ05hbWUobm9kZXR5cGUpO1xuXG4gICAgaWYgKGVudGVyaW5nKSB7XG5cbiAgICAgICAgYXR0cnMgPSBbXTtcblxuICAgICAgICBzd2l0Y2ggKG5vZGV0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICAgICAgYXR0cnMucHVzaChbJ3htbG5zJywgJ2h0dHA6Ly9jb21tb25tYXJrLm9yZy94bWwvMS4wJ10pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbGlzdCc6XG4gICAgICAgICAgICBpZiAobm9kZS5saXN0VHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBhdHRycy5wdXNoKFsndHlwZScsIG5vZGUubGlzdFR5cGUudG9Mb3dlckNhc2UoKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUubGlzdFN0YXJ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGF0dHJzLnB1c2goWydzdGFydCcsIFN0cmluZyhub2RlLmxpc3RTdGFydCldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmxpc3RUaWdodCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBhdHRycy5wdXNoKFsndGlnaHQnLCAobm9kZS5saXN0VGlnaHQgPyAndHJ1ZScgOiAnZmFsc2UnKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRlbGltID0gbm9kZS5saXN0RGVsaW1pdGVyO1xuICAgICAgICAgICAgaWYgKGRlbGltICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHZhciBkZWxpbXdvcmQgPSAnJztcbiAgICAgICAgICAgICAgaWYgKGRlbGltID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBkZWxpbXdvcmQgPSAncGVyaW9kJztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxpbXdvcmQgPSAncGFyZW4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGF0dHJzLnB1c2goWydkZWxpbWl0ZXInLCBkZWxpbXdvcmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvZGVfYmxvY2snOlxuICAgICAgICAgICAgaWYgKG5vZGUuaW5mbykge1xuICAgICAgICAgICAgICBhdHRycy5wdXNoKFsnaW5mbycsIG5vZGUuaW5mb10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGluZyc6XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsnbGV2ZWwnLCBTdHJpbmcobm9kZS5sZXZlbCldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2xpbmsnOlxuICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWydkZXN0aW5hdGlvbicsIG5vZGUuZGVzdGluYXRpb25dKTtcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWyd0aXRsZScsIG5vZGUudGl0bGVdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2N1c3RvbV9pbmxpbmUnOlxuICAgICAgICAgIGNhc2UgJ2N1c3RvbV9ibG9jayc6XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsnb25fZW50ZXInLCBub2RlLm9uRW50ZXJdKTtcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWydvbl9leGl0Jywgbm9kZS5vbkV4aXRdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5zb3VyY2Vwb3MpIHtcbiAgICAgICAgICB2YXIgcG9zID0gbm9kZS5zb3VyY2Vwb3M7XG4gICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgYXR0cnMucHVzaChbJ3NvdXJjZXBvcycsIFN0cmluZyhwb3NbMF1bMF0pICsgJzonICtcbiAgICAgICAgICAgICAgU3RyaW5nKHBvc1swXVsxXSkgKyAnLScgKyBTdHJpbmcocG9zWzFdWzBdKSArICc6JyArXG4gICAgICAgICAgICAgIFN0cmluZyhwb3NbMV1bMV0pXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcigpO1xuICAgICAgICB0aGlzLm91dCh0aGlzLnRhZyh0YWduYW1lLCBhdHRycywgc2VsZkNsb3NpbmcpKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgIHRoaXMuaW5kZW50TGV2ZWwgKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmICghY29udGFpbmVyICYmICFzZWxmQ2xvc2luZykge1xuICAgICAgICAgIHZhciBsaXQgPSBub2RlLmxpdGVyYWw7XG4gICAgICAgICAgaWYgKGxpdCkge1xuICAgICAgICAgICAgdGhpcy5vdXQodGhpcy5lc2MobGl0KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub3V0KHRoaXMudGFnKCcvJyArIHRhZ25hbWUpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGVudExldmVsIC09IDE7XG4gICAgICB0aGlzLmNyKCk7XG4gICAgICB0aGlzLm91dCh0aGlzLnRhZygnLycgKyB0YWduYW1lKSk7XG4gICAgfVxuICB9XG4gIGlmIChvcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lRW5kKFwicmVuZGVyaW5nXCIpOyB9XG4gIHRoaXMuYnVmZmVyICs9ICdcXG4nO1xuICByZXR1cm4gdGhpcy5idWZmZXI7XG59XG5cbmZ1bmN0aW9uIG91dChzKSB7XG4gIGlmKHRoaXMuZGlzYWJsZVRhZ3MgPiAwKSB7XG4gICAgdGhpcy5idWZmZXIgKz0gcy5yZXBsYWNlKHJlWE1MVGFnLCAnJyk7XG4gIH1lbHNle1xuICAgIHRoaXMuYnVmZmVyICs9IHM7XG4gIH1cbiAgdGhpcy5sYXN0T3V0ID0gcztcbn1cblxuZnVuY3Rpb24gY3IoKSB7XG4gIGlmKHRoaXMubGFzdE91dCAhPT0gJ1xcbicpIHtcbiAgICB0aGlzLmJ1ZmZlciArPSAnXFxuJztcbiAgICB0aGlzLmxhc3RPdXQgPSAnXFxuJztcbiAgICBmb3IodmFyIGkgPSB0aGlzLmluZGVudExldmVsOyBpID4gMDsgaS0tKSB7XG4gICAgICB0aGlzLmJ1ZmZlciArPSB0aGlzLmluZGVudDtcbiAgICB9XG4gIH1cbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHByb2R1Y2UgYW4gWE1MIHRhZy5cbmZ1bmN0aW9uIHRhZyhuYW1lLCBhdHRycywgc2VsZmNsb3NpbmcpIHtcbiAgdmFyIHJlc3VsdCA9ICc8JyArIG5hbWU7XG4gIGlmKGF0dHJzICYmIGF0dHJzLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGF0dHJpYjtcbiAgICB3aGlsZSAoKGF0dHJpYiA9IGF0dHJzW2ldKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgKz0gJyAnICsgYXR0cmliWzBdICsgJz1cIicgKyB0aGlzLmVzYyhhdHRyaWJbMV0pICsgJ1wiJztcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbiAgaWYoc2VsZmNsb3NpbmcpIHtcbiAgICByZXN1bHQgKz0gJyAvJztcbiAgfVxuICByZXN1bHQgKz0gJz4nO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBxdWljayBicm93c2VyLWNvbXBhdGlibGUgaW5oZXJpdGFuY2VcblhtbFJlbmRlcmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVuZGVyZXIucHJvdG90eXBlKTtcblxuWG1sUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlciA9IHJlbmRlcjtcblhtbFJlbmRlcmVyLnByb3RvdHlwZS5vdXQgPSBvdXQ7XG5YbWxSZW5kZXJlci5wcm90b3R5cGUuY3IgPSBjcjtcblhtbFJlbmRlcmVyLnByb3RvdHlwZS50YWcgPSB0YWc7XG5YbWxSZW5kZXJlci5wcm90b3R5cGUuZXNjID0gcmVxdWlyZSgnLi4vY29tbW9uJykuZXNjYXBlWG1sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhtbFJlbmRlcmVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL3htbC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIC8vIGNvbnZlcnQgYmxhbWVzIHRvIGhlYWRpbmdzXG4gIGNvbnN0IGJsYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JsYW1lJyk7XG4gIGZvciAobGV0IGJsYW1lIG9mIGJsYW1lcykge1xuICAgIC8vIFRPRE8gbG9vayB1cCBjb3JyZWN0IGhlYWRpbmcgbGV2ZWxcbiAgICBjb25zdCByZW5hbWVkTm9kZSA9IHJlbmFtZVRhZyhkb2N1bWVudCwgYmxhbWUsICdoMicsIHRydWUpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxhbWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgLy8gY29udmVydCByZWYgdG8gbGlua3NcbiAgY29uc3QgcmVmcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3JlZicpO1xuICBmb3IgKGxldCByZWYgb2YgcmVmcykge1xuICAgIGNvbnN0IHJlbmFtZWROb2RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCByZWYsICdhJyk7XG4gICAgY29uc3QgdGFyZ2V0SWQgPSByZW5hbWVkTm9kZS5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcbiAgICByZW5hbWVkTm9kZS5jbGFzc0xpc3QuYWRkKCdyZWYnKTtcbiAgICByZW5hbWVkTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyB0YXJnZXRJZCk7XG4gICAgcmVuYW1lZE5vZGUucmVtb3ZlQXR0cmlidXRlKCd0YXJnZXQnKTtcbiAgICB0YXJnZXRIZWFkaW5nID0gcmVuYW1lZE5vZGUuaW5uZXJIVE1MID0gdGFyZ2V0XG4gICAgICAucXVlcnlTZWxlY3RvcignaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuICAgIC8vIHN0cmlwIGJsYW1lXG4gICAgaWYgKHRhcmdldEhlYWRpbmcucXVlcnlTZWxlY3RvcignLmJsYW1lJykpXG4gICAgICB0YXJnZXRIZWFkaW5nLnJlbW92ZUNoaWxkKHRhcmdldEhlYWRpbmcucXVlcnlTZWxlY3RvcignLmJsYW1lJykpO1xuICAgIHJlbmFtZWROb2RlLmlubmVySFRNTCA9IHRhcmdldEhlYWRpbmcuaW5uZXJIVE1MO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcmVmcy5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==