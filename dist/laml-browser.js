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
const cites = __webpack_require__(36);

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
  cites(document);


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


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function(document) {
  // populate bibliographic citations
  const bibitems = document.querySelectorAll('bibliography a');
  console.log(bibitems)
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
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzQ2MmZjMTA0MTA3ZmFjMzZjZTUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMveG1sLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZW50aXRpZXMuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL3JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZWFtYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlndXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleDJqYXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21kdXJsL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWR1cmwvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2xlZ2FjeS5qc29uIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlX2NvZGVwb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9kZWNvZGUuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvaW5saW5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9ybWFsaXplLXJlZmVyZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvZnJvbS1jb2RlLXBvaW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnJlcGVhdC9yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci9odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9yZW5kZXIveG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9ibGFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSw2QkFBNkIsSUFBSSxRQUFRLElBQUksZUFBZSxLQUFLLEVBQUU7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUNBQW1DLGlCQUFpQixFQUFFOztBQUV0RDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2xCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hELENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsc0JBQXNCLEVBQUU7QUFDN0Msc0JBQXNCLG1CQUFtQjtBQUN6QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLDBCQUEwQixFQUFFO0FBQ2pELHNCQUFzQix1QkFBdUI7QUFDN0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixvQkFBb0IsRUFBRTtBQUMzQyxzQkFBc0IsaUJBQWlCO0FBQ3ZDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsbUJBQW1CLEVBQUU7QUFDMUMsc0JBQXNCLGdCQUFnQjtBQUN0QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLG9CQUFvQixFQUFFO0FBQzNDLHNCQUFzQixpQkFBaUI7QUFDdkMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQiw0QkFBNEIsRUFBRTtBQUNuRCxzQkFBc0IseUJBQXlCO0FBQy9DLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsNkJBQTZCLEVBQUU7QUFDcEQsc0JBQXNCLDBCQUEwQjtBQUNoRCxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLDZCQUE2QixFQUFFO0FBQ3BELHNCQUFzQiwwQkFBMEI7QUFDaEQsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixpQ0FBaUMsRUFBRTtBQUN4RCwwQkFBMEIsa0NBQWtDO0FBQzVELENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsc0JBQXNCLEVBQUU7QUFDN0Msc0JBQXNCLG1CQUFtQjtBQUN6QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLHFCQUFxQixFQUFFO0FBQzVDLHNCQUFzQixrQkFBa0I7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzlRQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNoQ0Esa0JBQWtCLG1EOzs7Ozs7QUNBbEIsa0JBQWtCLHMvVkFBcy9WLGdJQUFnSSx1cVNBQXVxUyxnSUFBZ0ksbzREQUFvNEQscXBNOzs7Ozs7O0FDQW56c0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMUVBO0FBQ0EsT0FBTyxRQUFRO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ25DQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7O0FDdkx0QyxPQUFPLFlBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMUNBLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBLE9BQU8sWUFBWTs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZEEsT0FBTyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdFQUFnRSxJQUFJLFFBQVEsSUFBSTtBQUNoRjs7QUFFQSxzREFBc0QsSUFBSTs7QUFFMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLE9BQU87QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsSUFBSSxNQUFNO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsR0FBRyxLQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssZ0RBQWdELFdBQVc7QUFDaEU7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHlCQUF5QjtBQUM5QjtBQUNBLEtBQUsseUJBQXlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNuVkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRzs7QUFFM0U7O0FBRUE7O0FBRUE7O0FBRUEsZ0NBQWdDLElBQUk7O0FBRXBDLDZCQUE2QixJQUFJOztBQUVqQyxzQkFBc0IsR0FBRyxXQUFXLEdBQUc7O0FBRXZDLGdDQUFnQyxHQUFHLEdBQUcsR0FBRzs7QUFFekM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQyxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsVUFBVSxFQUFFO0FBQzFDLDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsaUNBQWlDLHVCQUF1QixFQUFFO0FBQzFEO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOEJBQThCLFVBQVUsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsaUNBQWlDLHVCQUF1QixFQUFFO0FBQzFEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEIsUUFBUSxFQUFFO0FBQ3hDLGlDQUFpQyx1QkFBdUIsRUFBRTtBQUMxRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLFFBQVEsRUFBRTtBQUN4QyxpQ0FBaUMsdUJBQXVCLEVBQUU7QUFDMUQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLFFBQVEsRUFBRTtBQUN4QyxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsZ0NBQWdDLGNBQWMsRUFBRTtBQUNoRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsU0FBUztBQUNULGdDQUFnQyxjQUFjLEVBQUU7QUFDaEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLFNBQVM7QUFDVCxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSyxPQUFPOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQ0FBaUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRSw0QkFBNEIsK0JBQStCO0FBQzNELG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlELDRCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUN2MkJBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsY0FBYzs7QUFFNUI7O0FBRUEsYUFBYSxTQUFTO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQ0FBZ0MsT0FBTztBQUN2Qzs7QUFFQTtBQUNBLHFCQUFxQixFQUFFO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7OztBQUdBOzs7Ozs7Ozs7QUNoR0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGNBQWM7O0FBRTVCOztBQUVBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQ0FBb0MsRUFBRTtBQUN0QztBQUNBOztBQUVBLCtCQUErQixPQUFPO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0EsMEJBQTBCO0FBQzFCOzs7QUFHQTs7Ozs7OztBQ3pIQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwrREFBK0Q7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsR0FBRztBQUNILGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBLG1FQUFtRSxRQUFRO0FBQzNFOztBQUVBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUN2RUEsa0JBQWtCLHd1Qzs7Ozs7O0FDQWxCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pCQSxrQkFBa0IseVM7Ozs7Ozs7QUNBbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQW1DOztBQUVuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1EQUFtRCxhQUFhLEVBQUU7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHFEQUFxRCxFQUFFLGdDQUFnQyxLQUFLLDZDQUE2QyxLQUFLOztBQUU5SSwyQ0FBMkMsS0FBSzs7QUFFaEQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxVQUFVLE9BQU87O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUssT0FBTzs7QUFFWiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQSx5QkFBeUIsbUNBQW1DO0FBQzVEO0FBQ0EseUJBQXlCLG1DQUFtQyw4Q0FBOEM7QUFDMUc7QUFDQTtBQUNBLHlCQUF5QixPQUFPLHFDQUFxQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3A3QkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUN6Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQSxXQUFXLE9BQU8sc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7O0FDakRBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ2pTQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsMkJBQTJCOztBQUVoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4QkFBOEI7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNyTEEsT0FBTyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEEsT0FBTyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibGFtbC1icm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzQ2MmZjMTA0MTA3ZmFjMzZjZTUiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGVuY29kZSA9IHJlcXVpcmUoJ21kdXJsL2VuY29kZScpO1xudmFyIGRlY29kZSA9IHJlcXVpcmUoJ21kdXJsL2RlY29kZScpO1xuXG52YXIgQ19CQUNLU0xBU0ggPSA5MjtcblxudmFyIGRlY29kZUhUTUwgPSByZXF1aXJlKCdlbnRpdGllcycpLmRlY29kZUhUTUw7XG5cbnZhciBFTlRJVFkgPSBcIiYoPzojeFthLWYwLTldezEsOH18I1swLTldezEsOH18W2Etel1bYS16MC05XXsxLDMxfSk7XCI7XG5cbnZhciBUQUdOQU1FID0gJ1tBLVphLXpdW0EtWmEtejAtOS1dKic7XG52YXIgQVRUUklCVVRFTkFNRSA9ICdbYS16QS1aXzpdW2EtekEtWjAtOTouXy1dKic7XG52YXIgVU5RVU9URURWQUxVRSA9IFwiW15cXFwiJz08PmBcXFxceDAwLVxcXFx4MjBdK1wiO1xudmFyIFNJTkdMRVFVT1RFRFZBTFVFID0gXCInW14nXSonXCI7XG52YXIgRE9VQkxFUVVPVEVEVkFMVUUgPSAnXCJbXlwiXSpcIic7XG52YXIgQVRUUklCVVRFVkFMVUUgPSBcIig/OlwiICsgVU5RVU9URURWQUxVRSArIFwifFwiICsgU0lOR0xFUVVPVEVEVkFMVUUgKyBcInxcIiArIERPVUJMRVFVT1RFRFZBTFVFICsgXCIpXCI7XG52YXIgQVRUUklCVVRFVkFMVUVTUEVDID0gXCIoPzpcIiArIFwiXFxcXHMqPVwiICsgXCJcXFxccypcIiArIEFUVFJJQlVURVZBTFVFICsgXCIpXCI7XG52YXIgQVRUUklCVVRFID0gXCIoPzpcIiArIFwiXFxcXHMrXCIgKyBBVFRSSUJVVEVOQU1FICsgQVRUUklCVVRFVkFMVUVTUEVDICsgXCI/KVwiO1xudmFyIE9QRU5UQUcgPSBcIjxcIiArIFRBR05BTUUgKyBBVFRSSUJVVEUgKyBcIipcIiArIFwiXFxcXHMqLz8+XCI7XG52YXIgQ0xPU0VUQUcgPSBcIjwvXCIgKyBUQUdOQU1FICsgXCJcXFxccypbPl1cIjtcbnZhciBIVE1MQ09NTUVOVCA9IFwiPCEtLS0tPnw8IS0tKD86LT9bXj4tXSkoPzotP1teLV0pKi0tPlwiO1xudmFyIFBST0NFU1NJTkdJTlNUUlVDVElPTiA9IFwiWzxdWz9dLio/Wz9dWz5dXCI7XG52YXIgREVDTEFSQVRJT04gPSBcIjwhW0EtWl0rXCIgKyBcIlxcXFxzK1tePl0qPlwiO1xudmFyIENEQVRBID0gXCI8IVxcXFxbQ0RBVEFcXFxcW1tcXFxcc1xcXFxTXSo/XFxcXF1cXFxcXT5cIjtcbnZhciBIVE1MVEFHID0gXCIoPzpcIiArIE9QRU5UQUcgKyBcInxcIiArIENMT1NFVEFHICsgXCJ8XCIgKyBIVE1MQ09NTUVOVCArIFwifFwiICtcbiAgICAgICAgUFJPQ0VTU0lOR0lOU1RSVUNUSU9OICsgXCJ8XCIgKyBERUNMQVJBVElPTiArIFwifFwiICsgQ0RBVEEgKyBcIilcIjtcbnZhciByZUh0bWxUYWcgPSBuZXcgUmVnRXhwKCdeJyArIEhUTUxUQUcsICdpJyk7XG5cbnZhciByZUJhY2tzbGFzaE9yQW1wID0gL1tcXFxcJl0vO1xuXG52YXIgRVNDQVBBQkxFID0gJ1shXCIjJCUmXFwnKCkqKywuLzo7PD0+P0BbXFxcXFxcXFxcXFxcXV5fYHt8fX4tXSc7XG5cbnZhciByZUVudGl0eU9yRXNjYXBlZENoYXIgPSBuZXcgUmVnRXhwKCdcXFxcXFxcXCcgKyBFU0NBUEFCTEUgKyAnfCcgKyBFTlRJVFksICdnaScpO1xuXG52YXIgWE1MU1BFQ0lBTCA9ICdbJjw+XCJdJztcblxudmFyIHJlWG1sU3BlY2lhbCA9IG5ldyBSZWdFeHAoWE1MU1BFQ0lBTCwgJ2cnKTtcblxudmFyIHJlWG1sU3BlY2lhbE9yRW50aXR5ID0gbmV3IFJlZ0V4cChFTlRJVFkgKyAnfCcgKyBYTUxTUEVDSUFMLCAnZ2knKTtcblxudmFyIHVuZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocy5jaGFyQ29kZUF0KDApID09PSBDX0JBQ0tTTEFTSCkge1xuICAgICAgICByZXR1cm4gcy5jaGFyQXQoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZUhUTUwocyk7XG4gICAgfVxufTtcblxuLy8gUmVwbGFjZSBlbnRpdGllcyBhbmQgYmFja3NsYXNoIGVzY2FwZXMgd2l0aCBsaXRlcmFsIGNoYXJhY3RlcnMuXG52YXIgdW5lc2NhcGVTdHJpbmcgPSBmdW5jdGlvbihzKSB7XG4gICAgaWYgKHJlQmFja3NsYXNoT3JBbXAudGVzdChzKSkge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHJlRW50aXR5T3JFc2NhcGVkQ2hhciwgdW5lc2NhcGVDaGFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG59O1xuXG52YXIgbm9ybWFsaXplVVJJID0gZnVuY3Rpb24odXJpKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGVuY29kZShkZWNvZGUodXJpKSk7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gdXJpO1xuICAgIH1cbn07XG5cbnZhciByZXBsYWNlVW5zYWZlQ2hhciA9IGZ1bmN0aW9uKHMpIHtcbiAgICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlICcmJzpcbiAgICAgICAgcmV0dXJuICcmYW1wOyc7XG4gICAgY2FzZSAnPCc6XG4gICAgICAgIHJldHVybiAnJmx0Oyc7XG4gICAgY2FzZSAnPic6XG4gICAgICAgIHJldHVybiAnJmd0Oyc7XG4gICAgY2FzZSAnXCInOlxuICAgICAgICByZXR1cm4gJyZxdW90Oyc7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxufTtcblxudmFyIGVzY2FwZVhtbCA9IGZ1bmN0aW9uKHMsIHByZXNlcnZlX2VudGl0aWVzKSB7XG4gICAgaWYgKHJlWG1sU3BlY2lhbC50ZXN0KHMpKSB7XG4gICAgICAgIGlmIChwcmVzZXJ2ZV9lbnRpdGllcykge1xuICAgICAgICAgICAgcmV0dXJuIHMucmVwbGFjZShyZVhtbFNwZWNpYWxPckVudGl0eSwgcmVwbGFjZVVuc2FmZUNoYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHMucmVwbGFjZShyZVhtbFNwZWNpYWwsIHJlcGxhY2VVbnNhZmVDaGFyKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyB1bmVzY2FwZVN0cmluZzogdW5lc2NhcGVTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgbm9ybWFsaXplVVJJOiBub3JtYWxpemVVUkksXG4gICAgICAgICAgICAgICAgICAgZXNjYXBlWG1sOiBlc2NhcGVYbWwsXG4gICAgICAgICAgICAgICAgICAgcmVIdG1sVGFnOiByZUh0bWxUYWcsXG4gICAgICAgICAgICAgICAgICAgT1BFTlRBRzogT1BFTlRBRyxcbiAgICAgICAgICAgICAgICAgICBDTE9TRVRBRzogQ0xPU0VUQUcsXG4gICAgICAgICAgICAgICAgICAgRU5USVRZOiBFTlRJVFksXG4gICAgICAgICAgICAgICAgICAgRVNDQVBBQkxFOiBFU0NBUEFCTEVcbiAgICAgICAgICAgICAgICAgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2NvbW1vbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIgIC8vIFNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI3NDA0NjAyLzEzMzk2NTFcbm1vZHVsZS5leHBvcnRzLnJlbmFtZVRhZyA9IGZ1bmN0aW9uKGRvY3VtZW50LCBub2RlT3JTZWxlY3RvciwgbmV3VGFnTmFtZSwgY2xhc3NPclRydWUpIHtcbiAgICBsZXQgbm9kZSA9IG5vZGVPclNlbGVjdG9yO1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5vZGVPclNlbGVjdG9yKTtcbiAgICBpZiAoIW5vZGUpIHJldHVybiBuZXcgRXJyb3IoJ05vIG5vZGUgZm91bmQnKTtcbiAgICBsZXQgY2xhc3NOYW1lID0gJyc7XG4gICAgaWYgKGNsYXNzT3JUcnVlICYmIGNsYXNzT3JUcnVlID09PSB0cnVlKSBjbGFzc05hbWUgPSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodHlwZW9mIGNsYXNzT3JUcnVlID09PSAnc3RyaW5nJykgY2xhc3NOYW1lID0gY2xhc3NPclRydWU7XG5cbiAgICBjb25zdCBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdUYWdOYW1lKTtcbiAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSBuZXdOb2RlLmFwcGVuZENoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgZm9yIChsZXQgYXR0cmlidXRlIG9mIG5vZGUuYXR0cmlidXRlcykge1xuICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsVGFnTmFtZScsIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBpZiAoY2xhc3NOYW1lICE9PSAnJykgbmV3Tm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKTtcbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGlzQ29udGFpbmVyKG5vZGUpIHtcbiAgICBzd2l0Y2ggKG5vZGUuX3R5cGUpIHtcbiAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgY2FzZSAnYmxvY2tfcXVvdGUnOlxuICAgIGNhc2UgJ2xpc3QnOlxuICAgIGNhc2UgJ2l0ZW0nOlxuICAgIGNhc2UgJ3BhcmFncmFwaCc6XG4gICAgY2FzZSAnaGVhZGluZyc6XG4gICAgY2FzZSAnZW1waCc6XG4gICAgY2FzZSAnc3Ryb25nJzpcbiAgICBjYXNlICdsaW5rJzpcbiAgICBjYXNlICdpbWFnZSc6XG4gICAgY2FzZSAnY3VzdG9tX2lubGluZSc6XG4gICAgY2FzZSAnY3VzdG9tX2Jsb2NrJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxudmFyIHJlc3VtZUF0ID0gZnVuY3Rpb24obm9kZSwgZW50ZXJpbmcpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBub2RlO1xuICAgIHRoaXMuZW50ZXJpbmcgPSAoZW50ZXJpbmcgPT09IHRydWUpO1xufTtcblxudmFyIG5leHQgPSBmdW5jdGlvbigpe1xuICAgIHZhciBjdXIgPSB0aGlzLmN1cnJlbnQ7XG4gICAgdmFyIGVudGVyaW5nID0gdGhpcy5lbnRlcmluZztcblxuICAgIGlmIChjdXIgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRhaW5lciA9IGlzQ29udGFpbmVyKGN1cik7XG5cbiAgICBpZiAoZW50ZXJpbmcgJiYgY29udGFpbmVyKSB7XG4gICAgICAgIGlmIChjdXIuX2ZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGN1ci5fZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHRoaXMuZW50ZXJpbmcgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc3RheSBvbiBub2RlIGJ1dCBleGl0XG4gICAgICAgICAgICB0aGlzLmVudGVyaW5nID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoY3VyID09PSB0aGlzLnJvb3QpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcblxuICAgIH0gZWxzZSBpZiAoY3VyLl9uZXh0ID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGN1ci5fcGFyZW50O1xuICAgICAgICB0aGlzLmVudGVyaW5nID0gZmFsc2U7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBjdXIuX25leHQ7XG4gICAgICAgIHRoaXMuZW50ZXJpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB7ZW50ZXJpbmc6IGVudGVyaW5nLCBub2RlOiBjdXJ9O1xufTtcblxudmFyIE5vZGVXYWxrZXIgPSBmdW5jdGlvbihyb290KSB7XG4gICAgcmV0dXJuIHsgY3VycmVudDogcm9vdCxcbiAgICAgICAgICAgICByb290OiByb290LFxuICAgICAgICAgICAgIGVudGVyaW5nOiB0cnVlLFxuICAgICAgICAgICAgIG5leHQ6IG5leHQsXG4gICAgICAgICAgICAgcmVzdW1lQXQ6IHJlc3VtZUF0IH07XG59O1xuXG52YXIgTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBzb3VyY2Vwb3MpIHtcbiAgICB0aGlzLl90eXBlID0gbm9kZVR5cGU7XG4gICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl9maXJzdENoaWxkID0gbnVsbDtcbiAgICB0aGlzLl9sYXN0Q2hpbGQgPSBudWxsO1xuICAgIHRoaXMuX3ByZXYgPSBudWxsO1xuICAgIHRoaXMuX25leHQgPSBudWxsO1xuICAgIHRoaXMuX3NvdXJjZXBvcyA9IHNvdXJjZXBvcztcbiAgICB0aGlzLl9sYXN0TGluZUJsYW5rID0gZmFsc2U7XG4gICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgdGhpcy5fc3RyaW5nX2NvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMuX2xpdGVyYWwgPSBudWxsO1xuICAgIHRoaXMuX2xpc3REYXRhID0ge307XG4gICAgdGhpcy5faW5mbyA9IG51bGw7XG4gICAgdGhpcy5fZGVzdGluYXRpb24gPSBudWxsO1xuICAgIHRoaXMuX3RpdGxlID0gbnVsbDtcbiAgICB0aGlzLl9pc0ZlbmNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZlbmNlQ2hhciA9IG51bGw7XG4gICAgdGhpcy5fZmVuY2VMZW5ndGggPSAwO1xuICAgIHRoaXMuX2ZlbmNlT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLl9sZXZlbCA9IG51bGw7XG4gICAgdGhpcy5fb25FbnRlciA9IG51bGw7XG4gICAgdGhpcy5fb25FeGl0ID0gbnVsbDtcbn07XG5cbnZhciBwcm90byA9IE5vZGUucHJvdG90eXBlO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdpc0NvbnRhaW5lcicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzQ29udGFpbmVyKHRoaXMpOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAndHlwZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fdHlwZTsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2ZpcnN0Q2hpbGQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2ZpcnN0Q2hpbGQ7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsYXN0Q2hpbGQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xhc3RDaGlsZDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ25leHQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX25leHQ7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwcmV2Jywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9wcmV2OyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAncGFyZW50Jywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9wYXJlbnQ7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdzb3VyY2Vwb3MnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3NvdXJjZXBvczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpdGVyYWwnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xpdGVyYWw7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX2xpdGVyYWwgPSBzOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnZGVzdGluYXRpb24nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2Rlc3RpbmF0aW9uOyB9LFxuICAgIHNldDogZnVuY3Rpb24ocykgeyB0aGlzLl9kZXN0aW5hdGlvbiA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICd0aXRsZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX3RpdGxlID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2luZm8nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2luZm87IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX2luZm8gPSBzOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGV2ZWwnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xldmVsOyB9LFxuICAgIHNldDogZnVuY3Rpb24ocykgeyB0aGlzLl9sZXZlbCA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsaXN0VHlwZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGlzdERhdGEudHlwZTsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHQpIHsgdGhpcy5fbGlzdERhdGEudHlwZSA9IHQ7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsaXN0VGlnaHQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xpc3REYXRhLnRpZ2h0OyB9LFxuICAgIHNldDogZnVuY3Rpb24odCkgeyB0aGlzLl9saXN0RGF0YS50aWdodCA9IHQ7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsaXN0U3RhcnQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xpc3REYXRhLnN0YXJ0OyB9LFxuICAgIHNldDogZnVuY3Rpb24obikgeyB0aGlzLl9saXN0RGF0YS5zdGFydCA9IG47IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsaXN0RGVsaW1pdGVyJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9saXN0RGF0YS5kZWxpbWl0ZXI7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihkZWxpbSkgeyB0aGlzLl9saXN0RGF0YS5kZWxpbWl0ZXIgPSBkZWxpbTsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uRW50ZXInLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX29uRW50ZXI7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX29uRW50ZXIgPSBzOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnb25FeGl0Jywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9vbkV4aXQ7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX29uRXhpdCA9IHM7IH1cbn0pO1xuXG5Ob2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgY2hpbGQudW5saW5rKCk7XG4gICAgY2hpbGQuX3BhcmVudCA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2xhc3RDaGlsZCkge1xuICAgICAgICB0aGlzLl9sYXN0Q2hpbGQuX25leHQgPSBjaGlsZDtcbiAgICAgICAgY2hpbGQuX3ByZXYgPSB0aGlzLl9sYXN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuX2xhc3RDaGlsZCA9IGNoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0Q2hpbGQgPSBjaGlsZDtcbiAgICAgICAgdGhpcy5fbGFzdENoaWxkID0gY2hpbGQ7XG4gICAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUucHJlcGVuZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICBjaGlsZC51bmxpbmsoKTtcbiAgICBjaGlsZC5fcGFyZW50ID0gdGhpcztcbiAgICBpZiAodGhpcy5fZmlyc3RDaGlsZCkge1xuICAgICAgICB0aGlzLl9maXJzdENoaWxkLl9wcmV2ID0gY2hpbGQ7XG4gICAgICAgIGNoaWxkLl9uZXh0ID0gdGhpcy5fZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5fZmlyc3RDaGlsZCA9IGNoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0Q2hpbGQgPSBjaGlsZDtcbiAgICAgICAgdGhpcy5fbGFzdENoaWxkID0gY2hpbGQ7XG4gICAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUudW5saW5rID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IHRoaXMuX25leHQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdENoaWxkID0gdGhpcy5fbmV4dDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX25leHQpIHtcbiAgICAgICAgdGhpcy5fbmV4dC5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50Ll9sYXN0Q2hpbGQgPSB0aGlzLl9wcmV2O1xuICAgIH1cbiAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuX25leHQgPSBudWxsO1xuICAgIHRoaXMuX3ByZXYgPSBudWxsO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaW5zZXJ0QWZ0ZXIgPSBmdW5jdGlvbihzaWJsaW5nKSB7XG4gICAgc2libGluZy51bmxpbmsoKTtcbiAgICBzaWJsaW5nLl9uZXh0ID0gdGhpcy5fbmV4dDtcbiAgICBpZiAoc2libGluZy5fbmV4dCkge1xuICAgICAgICBzaWJsaW5nLl9uZXh0Ll9wcmV2ID0gc2libGluZztcbiAgICB9XG4gICAgc2libGluZy5fcHJldiA9IHRoaXM7XG4gICAgdGhpcy5fbmV4dCA9IHNpYmxpbmc7XG4gICAgc2libGluZy5fcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgIGlmICghc2libGluZy5fbmV4dCkge1xuICAgICAgICBzaWJsaW5nLl9wYXJlbnQuX2xhc3RDaGlsZCA9IHNpYmxpbmc7XG4gICAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24oc2libGluZykge1xuICAgIHNpYmxpbmcudW5saW5rKCk7XG4gICAgc2libGluZy5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgaWYgKHNpYmxpbmcuX3ByZXYpIHtcbiAgICAgICAgc2libGluZy5fcHJldi5fbmV4dCA9IHNpYmxpbmc7XG4gICAgfVxuICAgIHNpYmxpbmcuX25leHQgPSB0aGlzO1xuICAgIHRoaXMuX3ByZXYgPSBzaWJsaW5nO1xuICAgIHNpYmxpbmcuX3BhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICBpZiAoIXNpYmxpbmcuX3ByZXYpIHtcbiAgICAgICAgc2libGluZy5fcGFyZW50Ll9maXJzdENoaWxkID0gc2libGluZztcbiAgICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS53YWxrZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgd2Fsa2VyID0gbmV3IE5vZGVXYWxrZXIodGhpcyk7XG4gICAgcmV0dXJuIHdhbGtlcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZTtcblxuXG4vKiBFeGFtcGxlIG9mIHVzZSBvZiB3YWxrZXI6XG5cbiB2YXIgd2Fsa2VyID0gdy53YWxrZXIoKTtcbiB2YXIgZXZlbnQ7XG5cbiB3aGlsZSAoZXZlbnQgPSB3YWxrZXIubmV4dCgpKSB7XG4gY29uc29sZS5sb2coZXZlbnQuZW50ZXJpbmcsIGV2ZW50Lm5vZGUudHlwZSk7XG4gfVxuXG4gKi9cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL25vZGUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGVuY29kZSA9IHJlcXVpcmUoXCIuL2xpYi9lbmNvZGUuanNcIiksXG4gICAgZGVjb2RlID0gcmVxdWlyZShcIi4vbGliL2RlY29kZS5qc1wiKTtcblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihkYXRhLCBsZXZlbCl7XG5cdHJldHVybiAoIWxldmVsIHx8IGxldmVsIDw9IDAgPyBkZWNvZGUuWE1MIDogZGVjb2RlLkhUTUwpKGRhdGEpO1xufTtcblxuZXhwb3J0cy5kZWNvZGVTdHJpY3QgPSBmdW5jdGlvbihkYXRhLCBsZXZlbCl7XG5cdHJldHVybiAoIWxldmVsIHx8IGxldmVsIDw9IDAgPyBkZWNvZGUuWE1MIDogZGVjb2RlLkhUTUxTdHJpY3QpKGRhdGEpO1xufTtcblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihkYXRhLCBsZXZlbCl7XG5cdHJldHVybiAoIWxldmVsIHx8IGxldmVsIDw9IDAgPyBlbmNvZGUuWE1MIDogZW5jb2RlLkhUTUwpKGRhdGEpO1xufTtcblxuZXhwb3J0cy5lbmNvZGVYTUwgPSBlbmNvZGUuWE1MO1xuXG5leHBvcnRzLmVuY29kZUhUTUw0ID1cbmV4cG9ydHMuZW5jb2RlSFRNTDUgPVxuZXhwb3J0cy5lbmNvZGVIVE1MICA9IGVuY29kZS5IVE1MO1xuXG5leHBvcnRzLmRlY29kZVhNTCA9XG5leHBvcnRzLmRlY29kZVhNTFN0cmljdCA9IGRlY29kZS5YTUw7XG5cbmV4cG9ydHMuZGVjb2RlSFRNTDQgPVxuZXhwb3J0cy5kZWNvZGVIVE1MNSA9XG5leHBvcnRzLmRlY29kZUhUTUwgPSBkZWNvZGUuSFRNTDtcblxuZXhwb3J0cy5kZWNvZGVIVE1MNFN0cmljdCA9XG5leHBvcnRzLmRlY29kZUhUTUw1U3RyaWN0ID1cbmV4cG9ydHMuZGVjb2RlSFRNTFN0cmljdCA9IGRlY29kZS5IVE1MU3RyaWN0O1xuXG5leHBvcnRzLmVzY2FwZSA9IGVuY29kZS5lc2NhcGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcImFtcFwiOlwiJlwiLFwiYXBvc1wiOlwiJ1wiLFwiZ3RcIjpcIj5cIixcImx0XCI6XCI8XCIsXCJxdW90XCI6XCJcXFwiXCJ9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy94bWwuanNvblxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcIkFhY3V0ZVwiOlwiw4FcIixcImFhY3V0ZVwiOlwiw6FcIixcIkFicmV2ZVwiOlwixIJcIixcImFicmV2ZVwiOlwixINcIixcImFjXCI6XCLiiL5cIixcImFjZFwiOlwi4oi/XCIsXCJhY0VcIjpcIuKIvsyzXCIsXCJBY2lyY1wiOlwiw4JcIixcImFjaXJjXCI6XCLDolwiLFwiYWN1dGVcIjpcIsK0XCIsXCJBY3lcIjpcItCQXCIsXCJhY3lcIjpcItCwXCIsXCJBRWxpZ1wiOlwiw4ZcIixcImFlbGlnXCI6XCLDplwiLFwiYWZcIjpcIuKBoVwiLFwiQWZyXCI6XCLwnZSEXCIsXCJhZnJcIjpcIvCdlJ5cIixcIkFncmF2ZVwiOlwiw4BcIixcImFncmF2ZVwiOlwiw6BcIixcImFsZWZzeW1cIjpcIuKEtVwiLFwiYWxlcGhcIjpcIuKEtVwiLFwiQWxwaGFcIjpcIs6RXCIsXCJhbHBoYVwiOlwizrFcIixcIkFtYWNyXCI6XCLEgFwiLFwiYW1hY3JcIjpcIsSBXCIsXCJhbWFsZ1wiOlwi4qi/XCIsXCJhbXBcIjpcIiZcIixcIkFNUFwiOlwiJlwiLFwiYW5kYW5kXCI6XCLiqZVcIixcIkFuZFwiOlwi4qmTXCIsXCJhbmRcIjpcIuKIp1wiLFwiYW5kZFwiOlwi4qmcXCIsXCJhbmRzbG9wZVwiOlwi4qmYXCIsXCJhbmR2XCI6XCLiqZpcIixcImFuZ1wiOlwi4oigXCIsXCJhbmdlXCI6XCLipqRcIixcImFuZ2xlXCI6XCLiiKBcIixcImFuZ21zZGFhXCI6XCLipqhcIixcImFuZ21zZGFiXCI6XCLipqlcIixcImFuZ21zZGFjXCI6XCLipqpcIixcImFuZ21zZGFkXCI6XCLipqtcIixcImFuZ21zZGFlXCI6XCLipqxcIixcImFuZ21zZGFmXCI6XCLipq1cIixcImFuZ21zZGFnXCI6XCLipq5cIixcImFuZ21zZGFoXCI6XCLipq9cIixcImFuZ21zZFwiOlwi4oihXCIsXCJhbmdydFwiOlwi4oifXCIsXCJhbmdydHZiXCI6XCLiir5cIixcImFuZ3J0dmJkXCI6XCLipp1cIixcImFuZ3NwaFwiOlwi4oiiXCIsXCJhbmdzdFwiOlwiw4VcIixcImFuZ3phcnJcIjpcIuKNvFwiLFwiQW9nb25cIjpcIsSEXCIsXCJhb2dvblwiOlwixIVcIixcIkFvcGZcIjpcIvCdlLhcIixcImFvcGZcIjpcIvCdlZJcIixcImFwYWNpclwiOlwi4qmvXCIsXCJhcFwiOlwi4omIXCIsXCJhcEVcIjpcIuKpsFwiLFwiYXBlXCI6XCLiiYpcIixcImFwaWRcIjpcIuKJi1wiLFwiYXBvc1wiOlwiJ1wiLFwiQXBwbHlGdW5jdGlvblwiOlwi4oGhXCIsXCJhcHByb3hcIjpcIuKJiFwiLFwiYXBwcm94ZXFcIjpcIuKJilwiLFwiQXJpbmdcIjpcIsOFXCIsXCJhcmluZ1wiOlwiw6VcIixcIkFzY3JcIjpcIvCdkpxcIixcImFzY3JcIjpcIvCdkrZcIixcIkFzc2lnblwiOlwi4omUXCIsXCJhc3RcIjpcIipcIixcImFzeW1wXCI6XCLiiYhcIixcImFzeW1wZXFcIjpcIuKJjVwiLFwiQXRpbGRlXCI6XCLDg1wiLFwiYXRpbGRlXCI6XCLDo1wiLFwiQXVtbFwiOlwiw4RcIixcImF1bWxcIjpcIsOkXCIsXCJhd2NvbmludFwiOlwi4oizXCIsXCJhd2ludFwiOlwi4qiRXCIsXCJiYWNrY29uZ1wiOlwi4omMXCIsXCJiYWNrZXBzaWxvblwiOlwiz7ZcIixcImJhY2twcmltZVwiOlwi4oC1XCIsXCJiYWNrc2ltXCI6XCLiiL1cIixcImJhY2tzaW1lcVwiOlwi4ouNXCIsXCJCYWNrc2xhc2hcIjpcIuKIllwiLFwiQmFydlwiOlwi4qunXCIsXCJiYXJ2ZWVcIjpcIuKKvVwiLFwiYmFyd2VkXCI6XCLijIVcIixcIkJhcndlZFwiOlwi4oyGXCIsXCJiYXJ3ZWRnZVwiOlwi4oyFXCIsXCJiYnJrXCI6XCLijrVcIixcImJicmt0YnJrXCI6XCLijrZcIixcImJjb25nXCI6XCLiiYxcIixcIkJjeVwiOlwi0JFcIixcImJjeVwiOlwi0LFcIixcImJkcXVvXCI6XCLigJ5cIixcImJlY2F1c1wiOlwi4oi1XCIsXCJiZWNhdXNlXCI6XCLiiLVcIixcIkJlY2F1c2VcIjpcIuKItVwiLFwiYmVtcHR5dlwiOlwi4qawXCIsXCJiZXBzaVwiOlwiz7ZcIixcImJlcm5vdVwiOlwi4oSsXCIsXCJCZXJub3VsbGlzXCI6XCLihKxcIixcIkJldGFcIjpcIs6SXCIsXCJiZXRhXCI6XCLOslwiLFwiYmV0aFwiOlwi4oS2XCIsXCJiZXR3ZWVuXCI6XCLiiaxcIixcIkJmclwiOlwi8J2UhVwiLFwiYmZyXCI6XCLwnZSfXCIsXCJiaWdjYXBcIjpcIuKLglwiLFwiYmlnY2lyY1wiOlwi4pevXCIsXCJiaWdjdXBcIjpcIuKLg1wiLFwiYmlnb2RvdFwiOlwi4qiAXCIsXCJiaWdvcGx1c1wiOlwi4qiBXCIsXCJiaWdvdGltZXNcIjpcIuKoglwiLFwiYmlnc3FjdXBcIjpcIuKohlwiLFwiYmlnc3RhclwiOlwi4piFXCIsXCJiaWd0cmlhbmdsZWRvd25cIjpcIuKWvVwiLFwiYmlndHJpYW5nbGV1cFwiOlwi4pazXCIsXCJiaWd1cGx1c1wiOlwi4qiEXCIsXCJiaWd2ZWVcIjpcIuKLgVwiLFwiYmlnd2VkZ2VcIjpcIuKLgFwiLFwiYmthcm93XCI6XCLipI1cIixcImJsYWNrbG96ZW5nZVwiOlwi4qerXCIsXCJibGFja3NxdWFyZVwiOlwi4paqXCIsXCJibGFja3RyaWFuZ2xlXCI6XCLilrRcIixcImJsYWNrdHJpYW5nbGVkb3duXCI6XCLilr5cIixcImJsYWNrdHJpYW5nbGVsZWZ0XCI6XCLil4JcIixcImJsYWNrdHJpYW5nbGVyaWdodFwiOlwi4pa4XCIsXCJibGFua1wiOlwi4pCjXCIsXCJibGsxMlwiOlwi4paSXCIsXCJibGsxNFwiOlwi4paRXCIsXCJibGszNFwiOlwi4paTXCIsXCJibG9ja1wiOlwi4paIXCIsXCJibmVcIjpcIj3ig6VcIixcImJuZXF1aXZcIjpcIuKJoeKDpVwiLFwiYk5vdFwiOlwi4qutXCIsXCJibm90XCI6XCLijJBcIixcIkJvcGZcIjpcIvCdlLlcIixcImJvcGZcIjpcIvCdlZNcIixcImJvdFwiOlwi4oqlXCIsXCJib3R0b21cIjpcIuKKpVwiLFwiYm93dGllXCI6XCLii4hcIixcImJveGJveFwiOlwi4qeJXCIsXCJib3hkbFwiOlwi4pSQXCIsXCJib3hkTFwiOlwi4pWVXCIsXCJib3hEbFwiOlwi4pWWXCIsXCJib3hETFwiOlwi4pWXXCIsXCJib3hkclwiOlwi4pSMXCIsXCJib3hkUlwiOlwi4pWSXCIsXCJib3hEclwiOlwi4pWTXCIsXCJib3hEUlwiOlwi4pWUXCIsXCJib3hoXCI6XCLilIBcIixcImJveEhcIjpcIuKVkFwiLFwiYm94aGRcIjpcIuKUrFwiLFwiYm94SGRcIjpcIuKVpFwiLFwiYm94aERcIjpcIuKVpVwiLFwiYm94SERcIjpcIuKVplwiLFwiYm94aHVcIjpcIuKUtFwiLFwiYm94SHVcIjpcIuKVp1wiLFwiYm94aFVcIjpcIuKVqFwiLFwiYm94SFVcIjpcIuKVqVwiLFwiYm94bWludXNcIjpcIuKKn1wiLFwiYm94cGx1c1wiOlwi4oqeXCIsXCJib3h0aW1lc1wiOlwi4oqgXCIsXCJib3h1bFwiOlwi4pSYXCIsXCJib3h1TFwiOlwi4pWbXCIsXCJib3hVbFwiOlwi4pWcXCIsXCJib3hVTFwiOlwi4pWdXCIsXCJib3h1clwiOlwi4pSUXCIsXCJib3h1UlwiOlwi4pWYXCIsXCJib3hVclwiOlwi4pWZXCIsXCJib3hVUlwiOlwi4pWaXCIsXCJib3h2XCI6XCLilIJcIixcImJveFZcIjpcIuKVkVwiLFwiYm94dmhcIjpcIuKUvFwiLFwiYm94dkhcIjpcIuKVqlwiLFwiYm94VmhcIjpcIuKVq1wiLFwiYm94VkhcIjpcIuKVrFwiLFwiYm94dmxcIjpcIuKUpFwiLFwiYm94dkxcIjpcIuKVoVwiLFwiYm94VmxcIjpcIuKVolwiLFwiYm94VkxcIjpcIuKVo1wiLFwiYm94dnJcIjpcIuKUnFwiLFwiYm94dlJcIjpcIuKVnlwiLFwiYm94VnJcIjpcIuKVn1wiLFwiYm94VlJcIjpcIuKVoFwiLFwiYnByaW1lXCI6XCLigLVcIixcImJyZXZlXCI6XCLLmFwiLFwiQnJldmVcIjpcIsuYXCIsXCJicnZiYXJcIjpcIsKmXCIsXCJic2NyXCI6XCLwnZK3XCIsXCJCc2NyXCI6XCLihKxcIixcImJzZW1pXCI6XCLigY9cIixcImJzaW1cIjpcIuKIvVwiLFwiYnNpbWVcIjpcIuKLjVwiLFwiYnNvbGJcIjpcIuKnhVwiLFwiYnNvbFwiOlwiXFxcXFwiLFwiYnNvbGhzdWJcIjpcIuKfiFwiLFwiYnVsbFwiOlwi4oCiXCIsXCJidWxsZXRcIjpcIuKAolwiLFwiYnVtcFwiOlwi4omOXCIsXCJidW1wRVwiOlwi4qquXCIsXCJidW1wZVwiOlwi4omPXCIsXCJCdW1wZXFcIjpcIuKJjlwiLFwiYnVtcGVxXCI6XCLiiY9cIixcIkNhY3V0ZVwiOlwixIZcIixcImNhY3V0ZVwiOlwixIdcIixcImNhcGFuZFwiOlwi4qmEXCIsXCJjYXBicmN1cFwiOlwi4qmJXCIsXCJjYXBjYXBcIjpcIuKpi1wiLFwiY2FwXCI6XCLiiKlcIixcIkNhcFwiOlwi4ouSXCIsXCJjYXBjdXBcIjpcIuKph1wiLFwiY2FwZG90XCI6XCLiqYBcIixcIkNhcGl0YWxEaWZmZXJlbnRpYWxEXCI6XCLihYVcIixcImNhcHNcIjpcIuKIqe+4gFwiLFwiY2FyZXRcIjpcIuKBgVwiLFwiY2Fyb25cIjpcIsuHXCIsXCJDYXlsZXlzXCI6XCLihK1cIixcImNjYXBzXCI6XCLiqY1cIixcIkNjYXJvblwiOlwixIxcIixcImNjYXJvblwiOlwixI1cIixcIkNjZWRpbFwiOlwiw4dcIixcImNjZWRpbFwiOlwiw6dcIixcIkNjaXJjXCI6XCLEiFwiLFwiY2NpcmNcIjpcIsSJXCIsXCJDY29uaW50XCI6XCLiiLBcIixcImNjdXBzXCI6XCLiqYxcIixcImNjdXBzc21cIjpcIuKpkFwiLFwiQ2RvdFwiOlwixIpcIixcImNkb3RcIjpcIsSLXCIsXCJjZWRpbFwiOlwiwrhcIixcIkNlZGlsbGFcIjpcIsK4XCIsXCJjZW1wdHl2XCI6XCLiprJcIixcImNlbnRcIjpcIsKiXCIsXCJjZW50ZXJkb3RcIjpcIsK3XCIsXCJDZW50ZXJEb3RcIjpcIsK3XCIsXCJjZnJcIjpcIvCdlKBcIixcIkNmclwiOlwi4oStXCIsXCJDSGN5XCI6XCLQp1wiLFwiY2hjeVwiOlwi0YdcIixcImNoZWNrXCI6XCLinJNcIixcImNoZWNrbWFya1wiOlwi4pyTXCIsXCJDaGlcIjpcIs6nXCIsXCJjaGlcIjpcIs+HXCIsXCJjaXJjXCI6XCLLhlwiLFwiY2lyY2VxXCI6XCLiiZdcIixcImNpcmNsZWFycm93bGVmdFwiOlwi4oa6XCIsXCJjaXJjbGVhcnJvd3JpZ2h0XCI6XCLihrtcIixcImNpcmNsZWRhc3RcIjpcIuKKm1wiLFwiY2lyY2xlZGNpcmNcIjpcIuKKmlwiLFwiY2lyY2xlZGRhc2hcIjpcIuKKnVwiLFwiQ2lyY2xlRG90XCI6XCLiiplcIixcImNpcmNsZWRSXCI6XCLCrlwiLFwiY2lyY2xlZFNcIjpcIuKTiFwiLFwiQ2lyY2xlTWludXNcIjpcIuKKllwiLFwiQ2lyY2xlUGx1c1wiOlwi4oqVXCIsXCJDaXJjbGVUaW1lc1wiOlwi4oqXXCIsXCJjaXJcIjpcIuKXi1wiLFwiY2lyRVwiOlwi4qeDXCIsXCJjaXJlXCI6XCLiiZdcIixcImNpcmZuaW50XCI6XCLiqJBcIixcImNpcm1pZFwiOlwi4quvXCIsXCJjaXJzY2lyXCI6XCLip4JcIixcIkNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbFwiOlwi4oiyXCIsXCJDbG9zZUN1cmx5RG91YmxlUXVvdGVcIjpcIuKAnVwiLFwiQ2xvc2VDdXJseVF1b3RlXCI6XCLigJlcIixcImNsdWJzXCI6XCLimaNcIixcImNsdWJzdWl0XCI6XCLimaNcIixcImNvbG9uXCI6XCI6XCIsXCJDb2xvblwiOlwi4oi3XCIsXCJDb2xvbmVcIjpcIuKptFwiLFwiY29sb25lXCI6XCLiiZRcIixcImNvbG9uZXFcIjpcIuKJlFwiLFwiY29tbWFcIjpcIixcIixcImNvbW1hdFwiOlwiQFwiLFwiY29tcFwiOlwi4oiBXCIsXCJjb21wZm5cIjpcIuKImFwiLFwiY29tcGxlbWVudFwiOlwi4oiBXCIsXCJjb21wbGV4ZXNcIjpcIuKEglwiLFwiY29uZ1wiOlwi4omFXCIsXCJjb25nZG90XCI6XCLiqa1cIixcIkNvbmdydWVudFwiOlwi4omhXCIsXCJjb25pbnRcIjpcIuKIrlwiLFwiQ29uaW50XCI6XCLiiK9cIixcIkNvbnRvdXJJbnRlZ3JhbFwiOlwi4oiuXCIsXCJjb3BmXCI6XCLwnZWUXCIsXCJDb3BmXCI6XCLihIJcIixcImNvcHJvZFwiOlwi4oiQXCIsXCJDb3Byb2R1Y3RcIjpcIuKIkFwiLFwiY29weVwiOlwiwqlcIixcIkNPUFlcIjpcIsKpXCIsXCJjb3B5c3JcIjpcIuKEl1wiLFwiQ291bnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbFwiOlwi4oizXCIsXCJjcmFyclwiOlwi4oa1XCIsXCJjcm9zc1wiOlwi4pyXXCIsXCJDcm9zc1wiOlwi4qivXCIsXCJDc2NyXCI6XCLwnZKeXCIsXCJjc2NyXCI6XCLwnZK4XCIsXCJjc3ViXCI6XCLiq49cIixcImNzdWJlXCI6XCLiq5FcIixcImNzdXBcIjpcIuKrkFwiLFwiY3N1cGVcIjpcIuKrklwiLFwiY3Rkb3RcIjpcIuKLr1wiLFwiY3VkYXJybFwiOlwi4qS4XCIsXCJjdWRhcnJyXCI6XCLipLVcIixcImN1ZXByXCI6XCLii55cIixcImN1ZXNjXCI6XCLii59cIixcImN1bGFyclwiOlwi4oa2XCIsXCJjdWxhcnJwXCI6XCLipL1cIixcImN1cGJyY2FwXCI6XCLiqYhcIixcImN1cGNhcFwiOlwi4qmGXCIsXCJDdXBDYXBcIjpcIuKJjVwiLFwiY3VwXCI6XCLiiKpcIixcIkN1cFwiOlwi4ouTXCIsXCJjdXBjdXBcIjpcIuKpilwiLFwiY3VwZG90XCI6XCLiio1cIixcImN1cG9yXCI6XCLiqYVcIixcImN1cHNcIjpcIuKIqu+4gFwiLFwiY3VyYXJyXCI6XCLihrdcIixcImN1cmFycm1cIjpcIuKkvFwiLFwiY3VybHllcXByZWNcIjpcIuKLnlwiLFwiY3VybHllcXN1Y2NcIjpcIuKLn1wiLFwiY3VybHl2ZWVcIjpcIuKLjlwiLFwiY3VybHl3ZWRnZVwiOlwi4ouPXCIsXCJjdXJyZW5cIjpcIsKkXCIsXCJjdXJ2ZWFycm93bGVmdFwiOlwi4oa2XCIsXCJjdXJ2ZWFycm93cmlnaHRcIjpcIuKGt1wiLFwiY3V2ZWVcIjpcIuKLjlwiLFwiY3V3ZWRcIjpcIuKLj1wiLFwiY3djb25pbnRcIjpcIuKIslwiLFwiY3dpbnRcIjpcIuKIsVwiLFwiY3lsY3R5XCI6XCLijK1cIixcImRhZ2dlclwiOlwi4oCgXCIsXCJEYWdnZXJcIjpcIuKAoVwiLFwiZGFsZXRoXCI6XCLihLhcIixcImRhcnJcIjpcIuKGk1wiLFwiRGFyclwiOlwi4oahXCIsXCJkQXJyXCI6XCLih5NcIixcImRhc2hcIjpcIuKAkFwiLFwiRGFzaHZcIjpcIuKrpFwiLFwiZGFzaHZcIjpcIuKKo1wiLFwiZGJrYXJvd1wiOlwi4qSPXCIsXCJkYmxhY1wiOlwiy51cIixcIkRjYXJvblwiOlwixI5cIixcImRjYXJvblwiOlwixI9cIixcIkRjeVwiOlwi0JRcIixcImRjeVwiOlwi0LRcIixcImRkYWdnZXJcIjpcIuKAoVwiLFwiZGRhcnJcIjpcIuKHilwiLFwiRERcIjpcIuKFhVwiLFwiZGRcIjpcIuKFhlwiLFwiRERvdHJhaGRcIjpcIuKkkVwiLFwiZGRvdHNlcVwiOlwi4qm3XCIsXCJkZWdcIjpcIsKwXCIsXCJEZWxcIjpcIuKIh1wiLFwiRGVsdGFcIjpcIs6UXCIsXCJkZWx0YVwiOlwizrRcIixcImRlbXB0eXZcIjpcIuKmsVwiLFwiZGZpc2h0XCI6XCLipb9cIixcIkRmclwiOlwi8J2Uh1wiLFwiZGZyXCI6XCLwnZShXCIsXCJkSGFyXCI6XCLipaVcIixcImRoYXJsXCI6XCLih4NcIixcImRoYXJyXCI6XCLih4JcIixcIkRpYWNyaXRpY2FsQWN1dGVcIjpcIsK0XCIsXCJEaWFjcml0aWNhbERvdFwiOlwiy5lcIixcIkRpYWNyaXRpY2FsRG91YmxlQWN1dGVcIjpcIsudXCIsXCJEaWFjcml0aWNhbEdyYXZlXCI6XCJgXCIsXCJEaWFjcml0aWNhbFRpbGRlXCI6XCLLnFwiLFwiZGlhbVwiOlwi4ouEXCIsXCJkaWFtb25kXCI6XCLii4RcIixcIkRpYW1vbmRcIjpcIuKLhFwiLFwiZGlhbW9uZHN1aXRcIjpcIuKZplwiLFwiZGlhbXNcIjpcIuKZplwiLFwiZGllXCI6XCLCqFwiLFwiRGlmZmVyZW50aWFsRFwiOlwi4oWGXCIsXCJkaWdhbW1hXCI6XCLPnVwiLFwiZGlzaW5cIjpcIuKLslwiLFwiZGl2XCI6XCLDt1wiLFwiZGl2aWRlXCI6XCLDt1wiLFwiZGl2aWRlb250aW1lc1wiOlwi4ouHXCIsXCJkaXZvbnhcIjpcIuKLh1wiLFwiREpjeVwiOlwi0IJcIixcImRqY3lcIjpcItGSXCIsXCJkbGNvcm5cIjpcIuKMnlwiLFwiZGxjcm9wXCI6XCLijI1cIixcImRvbGxhclwiOlwiJFwiLFwiRG9wZlwiOlwi8J2Uu1wiLFwiZG9wZlwiOlwi8J2VlVwiLFwiRG90XCI6XCLCqFwiLFwiZG90XCI6XCLLmVwiLFwiRG90RG90XCI6XCLig5xcIixcImRvdGVxXCI6XCLiiZBcIixcImRvdGVxZG90XCI6XCLiiZFcIixcIkRvdEVxdWFsXCI6XCLiiZBcIixcImRvdG1pbnVzXCI6XCLiiLhcIixcImRvdHBsdXNcIjpcIuKIlFwiLFwiZG90c3F1YXJlXCI6XCLiiqFcIixcImRvdWJsZWJhcndlZGdlXCI6XCLijIZcIixcIkRvdWJsZUNvbnRvdXJJbnRlZ3JhbFwiOlwi4oivXCIsXCJEb3VibGVEb3RcIjpcIsKoXCIsXCJEb3VibGVEb3duQXJyb3dcIjpcIuKHk1wiLFwiRG91YmxlTGVmdEFycm93XCI6XCLih5BcIixcIkRvdWJsZUxlZnRSaWdodEFycm93XCI6XCLih5RcIixcIkRvdWJsZUxlZnRUZWVcIjpcIuKrpFwiLFwiRG91YmxlTG9uZ0xlZnRBcnJvd1wiOlwi4p+4XCIsXCJEb3VibGVMb25nTGVmdFJpZ2h0QXJyb3dcIjpcIuKfulwiLFwiRG91YmxlTG9uZ1JpZ2h0QXJyb3dcIjpcIuKfuVwiLFwiRG91YmxlUmlnaHRBcnJvd1wiOlwi4oeSXCIsXCJEb3VibGVSaWdodFRlZVwiOlwi4oqoXCIsXCJEb3VibGVVcEFycm93XCI6XCLih5FcIixcIkRvdWJsZVVwRG93bkFycm93XCI6XCLih5VcIixcIkRvdWJsZVZlcnRpY2FsQmFyXCI6XCLiiKVcIixcIkRvd25BcnJvd0JhclwiOlwi4qSTXCIsXCJkb3duYXJyb3dcIjpcIuKGk1wiLFwiRG93bkFycm93XCI6XCLihpNcIixcIkRvd25hcnJvd1wiOlwi4oeTXCIsXCJEb3duQXJyb3dVcEFycm93XCI6XCLih7VcIixcIkRvd25CcmV2ZVwiOlwizJFcIixcImRvd25kb3duYXJyb3dzXCI6XCLih4pcIixcImRvd25oYXJwb29ubGVmdFwiOlwi4oeDXCIsXCJkb3duaGFycG9vbnJpZ2h0XCI6XCLih4JcIixcIkRvd25MZWZ0UmlnaHRWZWN0b3JcIjpcIuKlkFwiLFwiRG93bkxlZnRUZWVWZWN0b3JcIjpcIuKlnlwiLFwiRG93bkxlZnRWZWN0b3JCYXJcIjpcIuKlllwiLFwiRG93bkxlZnRWZWN0b3JcIjpcIuKGvVwiLFwiRG93blJpZ2h0VGVlVmVjdG9yXCI6XCLipZ9cIixcIkRvd25SaWdodFZlY3RvckJhclwiOlwi4qWXXCIsXCJEb3duUmlnaHRWZWN0b3JcIjpcIuKHgVwiLFwiRG93blRlZUFycm93XCI6XCLihqdcIixcIkRvd25UZWVcIjpcIuKKpFwiLFwiZHJia2Fyb3dcIjpcIuKkkFwiLFwiZHJjb3JuXCI6XCLijJ9cIixcImRyY3JvcFwiOlwi4oyMXCIsXCJEc2NyXCI6XCLwnZKfXCIsXCJkc2NyXCI6XCLwnZK5XCIsXCJEU2N5XCI6XCLQhVwiLFwiZHNjeVwiOlwi0ZVcIixcImRzb2xcIjpcIuKntlwiLFwiRHN0cm9rXCI6XCLEkFwiLFwiZHN0cm9rXCI6XCLEkVwiLFwiZHRkb3RcIjpcIuKLsVwiLFwiZHRyaVwiOlwi4pa/XCIsXCJkdHJpZlwiOlwi4pa+XCIsXCJkdWFyclwiOlwi4oe1XCIsXCJkdWhhclwiOlwi4qWvXCIsXCJkd2FuZ2xlXCI6XCLipqZcIixcIkRaY3lcIjpcItCPXCIsXCJkemN5XCI6XCLRn1wiLFwiZHppZ3JhcnJcIjpcIuKfv1wiLFwiRWFjdXRlXCI6XCLDiVwiLFwiZWFjdXRlXCI6XCLDqVwiLFwiZWFzdGVyXCI6XCLiqa5cIixcIkVjYXJvblwiOlwixJpcIixcImVjYXJvblwiOlwixJtcIixcIkVjaXJjXCI6XCLDilwiLFwiZWNpcmNcIjpcIsOqXCIsXCJlY2lyXCI6XCLiiZZcIixcImVjb2xvblwiOlwi4omVXCIsXCJFY3lcIjpcItCtXCIsXCJlY3lcIjpcItGNXCIsXCJlRERvdFwiOlwi4qm3XCIsXCJFZG90XCI6XCLEllwiLFwiZWRvdFwiOlwixJdcIixcImVEb3RcIjpcIuKJkVwiLFwiZWVcIjpcIuKFh1wiLFwiZWZEb3RcIjpcIuKJklwiLFwiRWZyXCI6XCLwnZSIXCIsXCJlZnJcIjpcIvCdlKJcIixcImVnXCI6XCLiqppcIixcIkVncmF2ZVwiOlwiw4hcIixcImVncmF2ZVwiOlwiw6hcIixcImVnc1wiOlwi4qqWXCIsXCJlZ3Nkb3RcIjpcIuKqmFwiLFwiZWxcIjpcIuKqmVwiLFwiRWxlbWVudFwiOlwi4oiIXCIsXCJlbGludGVyc1wiOlwi4o+nXCIsXCJlbGxcIjpcIuKEk1wiLFwiZWxzXCI6XCLiqpVcIixcImVsc2RvdFwiOlwi4qqXXCIsXCJFbWFjclwiOlwixJJcIixcImVtYWNyXCI6XCLEk1wiLFwiZW1wdHlcIjpcIuKIhVwiLFwiZW1wdHlzZXRcIjpcIuKIhVwiLFwiRW1wdHlTbWFsbFNxdWFyZVwiOlwi4pe7XCIsXCJlbXB0eXZcIjpcIuKIhVwiLFwiRW1wdHlWZXJ5U21hbGxTcXVhcmVcIjpcIuKWq1wiLFwiZW1zcDEzXCI6XCLigIRcIixcImVtc3AxNFwiOlwi4oCFXCIsXCJlbXNwXCI6XCLigINcIixcIkVOR1wiOlwixYpcIixcImVuZ1wiOlwixYtcIixcImVuc3BcIjpcIuKAglwiLFwiRW9nb25cIjpcIsSYXCIsXCJlb2dvblwiOlwixJlcIixcIkVvcGZcIjpcIvCdlLxcIixcImVvcGZcIjpcIvCdlZZcIixcImVwYXJcIjpcIuKLlVwiLFwiZXBhcnNsXCI6XCLip6NcIixcImVwbHVzXCI6XCLiqbFcIixcImVwc2lcIjpcIs61XCIsXCJFcHNpbG9uXCI6XCLOlVwiLFwiZXBzaWxvblwiOlwizrVcIixcImVwc2l2XCI6XCLPtVwiLFwiZXFjaXJjXCI6XCLiiZZcIixcImVxY29sb25cIjpcIuKJlVwiLFwiZXFzaW1cIjpcIuKJglwiLFwiZXFzbGFudGd0clwiOlwi4qqWXCIsXCJlcXNsYW50bGVzc1wiOlwi4qqVXCIsXCJFcXVhbFwiOlwi4qm1XCIsXCJlcXVhbHNcIjpcIj1cIixcIkVxdWFsVGlsZGVcIjpcIuKJglwiLFwiZXF1ZXN0XCI6XCLiiZ9cIixcIkVxdWlsaWJyaXVtXCI6XCLih4xcIixcImVxdWl2XCI6XCLiiaFcIixcImVxdWl2RERcIjpcIuKpuFwiLFwiZXF2cGFyc2xcIjpcIuKnpVwiLFwiZXJhcnJcIjpcIuKlsVwiLFwiZXJEb3RcIjpcIuKJk1wiLFwiZXNjclwiOlwi4oSvXCIsXCJFc2NyXCI6XCLihLBcIixcImVzZG90XCI6XCLiiZBcIixcIkVzaW1cIjpcIuKps1wiLFwiZXNpbVwiOlwi4omCXCIsXCJFdGFcIjpcIs6XXCIsXCJldGFcIjpcIs63XCIsXCJFVEhcIjpcIsOQXCIsXCJldGhcIjpcIsOwXCIsXCJFdW1sXCI6XCLDi1wiLFwiZXVtbFwiOlwiw6tcIixcImV1cm9cIjpcIuKCrFwiLFwiZXhjbFwiOlwiIVwiLFwiZXhpc3RcIjpcIuKIg1wiLFwiRXhpc3RzXCI6XCLiiINcIixcImV4cGVjdGF0aW9uXCI6XCLihLBcIixcImV4cG9uZW50aWFsZVwiOlwi4oWHXCIsXCJFeHBvbmVudGlhbEVcIjpcIuKFh1wiLFwiZmFsbGluZ2RvdHNlcVwiOlwi4omSXCIsXCJGY3lcIjpcItCkXCIsXCJmY3lcIjpcItGEXCIsXCJmZW1hbGVcIjpcIuKZgFwiLFwiZmZpbGlnXCI6XCLvrINcIixcImZmbGlnXCI6XCLvrIBcIixcImZmbGxpZ1wiOlwi76yEXCIsXCJGZnJcIjpcIvCdlIlcIixcImZmclwiOlwi8J2Uo1wiLFwiZmlsaWdcIjpcIu+sgVwiLFwiRmlsbGVkU21hbGxTcXVhcmVcIjpcIuKXvFwiLFwiRmlsbGVkVmVyeVNtYWxsU3F1YXJlXCI6XCLilqpcIixcImZqbGlnXCI6XCJmalwiLFwiZmxhdFwiOlwi4pmtXCIsXCJmbGxpZ1wiOlwi76yCXCIsXCJmbHRuc1wiOlwi4paxXCIsXCJmbm9mXCI6XCLGklwiLFwiRm9wZlwiOlwi8J2UvVwiLFwiZm9wZlwiOlwi8J2Vl1wiLFwiZm9yYWxsXCI6XCLiiIBcIixcIkZvckFsbFwiOlwi4oiAXCIsXCJmb3JrXCI6XCLii5RcIixcImZvcmt2XCI6XCLiq5lcIixcIkZvdXJpZXJ0cmZcIjpcIuKEsVwiLFwiZnBhcnRpbnRcIjpcIuKojVwiLFwiZnJhYzEyXCI6XCLCvVwiLFwiZnJhYzEzXCI6XCLihZNcIixcImZyYWMxNFwiOlwiwrxcIixcImZyYWMxNVwiOlwi4oWVXCIsXCJmcmFjMTZcIjpcIuKFmVwiLFwiZnJhYzE4XCI6XCLihZtcIixcImZyYWMyM1wiOlwi4oWUXCIsXCJmcmFjMjVcIjpcIuKFllwiLFwiZnJhYzM0XCI6XCLCvlwiLFwiZnJhYzM1XCI6XCLihZdcIixcImZyYWMzOFwiOlwi4oWcXCIsXCJmcmFjNDVcIjpcIuKFmFwiLFwiZnJhYzU2XCI6XCLihZpcIixcImZyYWM1OFwiOlwi4oWdXCIsXCJmcmFjNzhcIjpcIuKFnlwiLFwiZnJhc2xcIjpcIuKBhFwiLFwiZnJvd25cIjpcIuKMolwiLFwiZnNjclwiOlwi8J2Su1wiLFwiRnNjclwiOlwi4oSxXCIsXCJnYWN1dGVcIjpcIse1XCIsXCJHYW1tYVwiOlwizpNcIixcImdhbW1hXCI6XCLOs1wiLFwiR2FtbWFkXCI6XCLPnFwiLFwiZ2FtbWFkXCI6XCLPnVwiLFwiZ2FwXCI6XCLiqoZcIixcIkdicmV2ZVwiOlwixJ5cIixcImdicmV2ZVwiOlwixJ9cIixcIkdjZWRpbFwiOlwixKJcIixcIkdjaXJjXCI6XCLEnFwiLFwiZ2NpcmNcIjpcIsSdXCIsXCJHY3lcIjpcItCTXCIsXCJnY3lcIjpcItCzXCIsXCJHZG90XCI6XCLEoFwiLFwiZ2RvdFwiOlwixKFcIixcImdlXCI6XCLiiaVcIixcImdFXCI6XCLiiadcIixcImdFbFwiOlwi4qqMXCIsXCJnZWxcIjpcIuKLm1wiLFwiZ2VxXCI6XCLiiaVcIixcImdlcXFcIjpcIuKJp1wiLFwiZ2Vxc2xhbnRcIjpcIuKpvlwiLFwiZ2VzY2NcIjpcIuKqqVwiLFwiZ2VzXCI6XCLiqb5cIixcImdlc2RvdFwiOlwi4qqAXCIsXCJnZXNkb3RvXCI6XCLiqoJcIixcImdlc2RvdG9sXCI6XCLiqoRcIixcImdlc2xcIjpcIuKLm++4gFwiLFwiZ2VzbGVzXCI6XCLiqpRcIixcIkdmclwiOlwi8J2UilwiLFwiZ2ZyXCI6XCLwnZSkXCIsXCJnZ1wiOlwi4omrXCIsXCJHZ1wiOlwi4ouZXCIsXCJnZ2dcIjpcIuKLmVwiLFwiZ2ltZWxcIjpcIuKEt1wiLFwiR0pjeVwiOlwi0INcIixcImdqY3lcIjpcItGTXCIsXCJnbGFcIjpcIuKqpVwiLFwiZ2xcIjpcIuKJt1wiLFwiZ2xFXCI6XCLiqpJcIixcImdsalwiOlwi4qqkXCIsXCJnbmFwXCI6XCLiqopcIixcImduYXBwcm94XCI6XCLiqopcIixcImduZVwiOlwi4qqIXCIsXCJnbkVcIjpcIuKJqVwiLFwiZ25lcVwiOlwi4qqIXCIsXCJnbmVxcVwiOlwi4ompXCIsXCJnbnNpbVwiOlwi4ounXCIsXCJHb3BmXCI6XCLwnZS+XCIsXCJnb3BmXCI6XCLwnZWYXCIsXCJncmF2ZVwiOlwiYFwiLFwiR3JlYXRlckVxdWFsXCI6XCLiiaVcIixcIkdyZWF0ZXJFcXVhbExlc3NcIjpcIuKLm1wiLFwiR3JlYXRlckZ1bGxFcXVhbFwiOlwi4omnXCIsXCJHcmVhdGVyR3JlYXRlclwiOlwi4qqiXCIsXCJHcmVhdGVyTGVzc1wiOlwi4om3XCIsXCJHcmVhdGVyU2xhbnRFcXVhbFwiOlwi4qm+XCIsXCJHcmVhdGVyVGlsZGVcIjpcIuKJs1wiLFwiR3NjclwiOlwi8J2SolwiLFwiZ3NjclwiOlwi4oSKXCIsXCJnc2ltXCI6XCLiibNcIixcImdzaW1lXCI6XCLiqo5cIixcImdzaW1sXCI6XCLiqpBcIixcImd0Y2NcIjpcIuKqp1wiLFwiZ3RjaXJcIjpcIuKpulwiLFwiZ3RcIjpcIj5cIixcIkdUXCI6XCI+XCIsXCJHdFwiOlwi4omrXCIsXCJndGRvdFwiOlwi4ouXXCIsXCJndGxQYXJcIjpcIuKmlVwiLFwiZ3RxdWVzdFwiOlwi4qm8XCIsXCJndHJhcHByb3hcIjpcIuKqhlwiLFwiZ3RyYXJyXCI6XCLipbhcIixcImd0cmRvdFwiOlwi4ouXXCIsXCJndHJlcWxlc3NcIjpcIuKLm1wiLFwiZ3RyZXFxbGVzc1wiOlwi4qqMXCIsXCJndHJsZXNzXCI6XCLiibdcIixcImd0cnNpbVwiOlwi4omzXCIsXCJndmVydG5lcXFcIjpcIuKJqe+4gFwiLFwiZ3ZuRVwiOlwi4omp77iAXCIsXCJIYWNla1wiOlwiy4dcIixcImhhaXJzcFwiOlwi4oCKXCIsXCJoYWxmXCI6XCLCvVwiLFwiaGFtaWx0XCI6XCLihItcIixcIkhBUkRjeVwiOlwi0KpcIixcImhhcmRjeVwiOlwi0YpcIixcImhhcnJjaXJcIjpcIuKliFwiLFwiaGFyclwiOlwi4oaUXCIsXCJoQXJyXCI6XCLih5RcIixcImhhcnJ3XCI6XCLihq1cIixcIkhhdFwiOlwiXlwiLFwiaGJhclwiOlwi4oSPXCIsXCJIY2lyY1wiOlwixKRcIixcImhjaXJjXCI6XCLEpVwiLFwiaGVhcnRzXCI6XCLimaVcIixcImhlYXJ0c3VpdFwiOlwi4pmlXCIsXCJoZWxsaXBcIjpcIuKAplwiLFwiaGVyY29uXCI6XCLiirlcIixcImhmclwiOlwi8J2UpVwiLFwiSGZyXCI6XCLihIxcIixcIkhpbGJlcnRTcGFjZVwiOlwi4oSLXCIsXCJoa3NlYXJvd1wiOlwi4qSlXCIsXCJoa3N3YXJvd1wiOlwi4qSmXCIsXCJob2FyclwiOlwi4oe/XCIsXCJob210aHRcIjpcIuKIu1wiLFwiaG9va2xlZnRhcnJvd1wiOlwi4oapXCIsXCJob29rcmlnaHRhcnJvd1wiOlwi4oaqXCIsXCJob3BmXCI6XCLwnZWZXCIsXCJIb3BmXCI6XCLihI1cIixcImhvcmJhclwiOlwi4oCVXCIsXCJIb3Jpem9udGFsTGluZVwiOlwi4pSAXCIsXCJoc2NyXCI6XCLwnZK9XCIsXCJIc2NyXCI6XCLihItcIixcImhzbGFzaFwiOlwi4oSPXCIsXCJIc3Ryb2tcIjpcIsSmXCIsXCJoc3Ryb2tcIjpcIsSnXCIsXCJIdW1wRG93bkh1bXBcIjpcIuKJjlwiLFwiSHVtcEVxdWFsXCI6XCLiiY9cIixcImh5YnVsbFwiOlwi4oGDXCIsXCJoeXBoZW5cIjpcIuKAkFwiLFwiSWFjdXRlXCI6XCLDjVwiLFwiaWFjdXRlXCI6XCLDrVwiLFwiaWNcIjpcIuKBo1wiLFwiSWNpcmNcIjpcIsOOXCIsXCJpY2lyY1wiOlwiw65cIixcIkljeVwiOlwi0JhcIixcImljeVwiOlwi0LhcIixcIklkb3RcIjpcIsSwXCIsXCJJRWN5XCI6XCLQlVwiLFwiaWVjeVwiOlwi0LVcIixcImlleGNsXCI6XCLCoVwiLFwiaWZmXCI6XCLih5RcIixcImlmclwiOlwi8J2UplwiLFwiSWZyXCI6XCLihJFcIixcIklncmF2ZVwiOlwiw4xcIixcImlncmF2ZVwiOlwiw6xcIixcImlpXCI6XCLihYhcIixcImlpaWludFwiOlwi4qiMXCIsXCJpaWludFwiOlwi4oitXCIsXCJpaW5maW5cIjpcIuKnnFwiLFwiaWlvdGFcIjpcIuKEqVwiLFwiSUpsaWdcIjpcIsSyXCIsXCJpamxpZ1wiOlwixLNcIixcIkltYWNyXCI6XCLEqlwiLFwiaW1hY3JcIjpcIsSrXCIsXCJpbWFnZVwiOlwi4oSRXCIsXCJJbWFnaW5hcnlJXCI6XCLihYhcIixcImltYWdsaW5lXCI6XCLihJBcIixcImltYWdwYXJ0XCI6XCLihJFcIixcImltYXRoXCI6XCLEsVwiLFwiSW1cIjpcIuKEkVwiLFwiaW1vZlwiOlwi4oq3XCIsXCJpbXBlZFwiOlwixrVcIixcIkltcGxpZXNcIjpcIuKHklwiLFwiaW5jYXJlXCI6XCLihIVcIixcImluXCI6XCLiiIhcIixcImluZmluXCI6XCLiiJ5cIixcImluZmludGllXCI6XCLip51cIixcImlub2RvdFwiOlwixLFcIixcImludGNhbFwiOlwi4oq6XCIsXCJpbnRcIjpcIuKIq1wiLFwiSW50XCI6XCLiiKxcIixcImludGVnZXJzXCI6XCLihKRcIixcIkludGVncmFsXCI6XCLiiKtcIixcImludGVyY2FsXCI6XCLiirpcIixcIkludGVyc2VjdGlvblwiOlwi4ouCXCIsXCJpbnRsYXJoa1wiOlwi4qiXXCIsXCJpbnRwcm9kXCI6XCLiqLxcIixcIkludmlzaWJsZUNvbW1hXCI6XCLigaNcIixcIkludmlzaWJsZVRpbWVzXCI6XCLigaJcIixcIklPY3lcIjpcItCBXCIsXCJpb2N5XCI6XCLRkVwiLFwiSW9nb25cIjpcIsSuXCIsXCJpb2dvblwiOlwixK9cIixcIklvcGZcIjpcIvCdlYBcIixcImlvcGZcIjpcIvCdlZpcIixcIklvdGFcIjpcIs6ZXCIsXCJpb3RhXCI6XCLOuVwiLFwiaXByb2RcIjpcIuKovFwiLFwiaXF1ZXN0XCI6XCLCv1wiLFwiaXNjclwiOlwi8J2SvlwiLFwiSXNjclwiOlwi4oSQXCIsXCJpc2luXCI6XCLiiIhcIixcImlzaW5kb3RcIjpcIuKLtVwiLFwiaXNpbkVcIjpcIuKLuVwiLFwiaXNpbnNcIjpcIuKLtFwiLFwiaXNpbnN2XCI6XCLii7NcIixcImlzaW52XCI6XCLiiIhcIixcIml0XCI6XCLigaJcIixcIkl0aWxkZVwiOlwixKhcIixcIml0aWxkZVwiOlwixKlcIixcIkl1a2N5XCI6XCLQhlwiLFwiaXVrY3lcIjpcItGWXCIsXCJJdW1sXCI6XCLDj1wiLFwiaXVtbFwiOlwiw69cIixcIkpjaXJjXCI6XCLEtFwiLFwiamNpcmNcIjpcIsS1XCIsXCJKY3lcIjpcItCZXCIsXCJqY3lcIjpcItC5XCIsXCJKZnJcIjpcIvCdlI1cIixcImpmclwiOlwi8J2Up1wiLFwiam1hdGhcIjpcIsi3XCIsXCJKb3BmXCI6XCLwnZWBXCIsXCJqb3BmXCI6XCLwnZWbXCIsXCJKc2NyXCI6XCLwnZKlXCIsXCJqc2NyXCI6XCLwnZK/XCIsXCJKc2VyY3lcIjpcItCIXCIsXCJqc2VyY3lcIjpcItGYXCIsXCJKdWtjeVwiOlwi0IRcIixcImp1a2N5XCI6XCLRlFwiLFwiS2FwcGFcIjpcIs6aXCIsXCJrYXBwYVwiOlwizrpcIixcImthcHBhdlwiOlwiz7BcIixcIktjZWRpbFwiOlwixLZcIixcImtjZWRpbFwiOlwixLdcIixcIktjeVwiOlwi0JpcIixcImtjeVwiOlwi0LpcIixcIktmclwiOlwi8J2UjlwiLFwia2ZyXCI6XCLwnZSoXCIsXCJrZ3JlZW5cIjpcIsS4XCIsXCJLSGN5XCI6XCLQpVwiLFwia2hjeVwiOlwi0YVcIixcIktKY3lcIjpcItCMXCIsXCJramN5XCI6XCLRnFwiLFwiS29wZlwiOlwi8J2VglwiLFwia29wZlwiOlwi8J2VnFwiLFwiS3NjclwiOlwi8J2SplwiLFwia3NjclwiOlwi8J2TgFwiLFwibEFhcnJcIjpcIuKHmlwiLFwiTGFjdXRlXCI6XCLEuVwiLFwibGFjdXRlXCI6XCLEulwiLFwibGFlbXB0eXZcIjpcIuKmtFwiLFwibGFncmFuXCI6XCLihJJcIixcIkxhbWJkYVwiOlwizptcIixcImxhbWJkYVwiOlwizrtcIixcImxhbmdcIjpcIuKfqFwiLFwiTGFuZ1wiOlwi4p+qXCIsXCJsYW5nZFwiOlwi4qaRXCIsXCJsYW5nbGVcIjpcIuKfqFwiLFwibGFwXCI6XCLiqoVcIixcIkxhcGxhY2V0cmZcIjpcIuKEklwiLFwibGFxdW9cIjpcIsKrXCIsXCJsYXJyYlwiOlwi4oekXCIsXCJsYXJyYmZzXCI6XCLipJ9cIixcImxhcnJcIjpcIuKGkFwiLFwiTGFyclwiOlwi4oaeXCIsXCJsQXJyXCI6XCLih5BcIixcImxhcnJmc1wiOlwi4qSdXCIsXCJsYXJyaGtcIjpcIuKGqVwiLFwibGFycmxwXCI6XCLihqtcIixcImxhcnJwbFwiOlwi4qS5XCIsXCJsYXJyc2ltXCI6XCLipbNcIixcImxhcnJ0bFwiOlwi4oaiXCIsXCJsYXRhaWxcIjpcIuKkmVwiLFwibEF0YWlsXCI6XCLipJtcIixcImxhdFwiOlwi4qqrXCIsXCJsYXRlXCI6XCLiqq1cIixcImxhdGVzXCI6XCLiqq3vuIBcIixcImxiYXJyXCI6XCLipIxcIixcImxCYXJyXCI6XCLipI5cIixcImxiYnJrXCI6XCLinbJcIixcImxicmFjZVwiOlwie1wiLFwibGJyYWNrXCI6XCJbXCIsXCJsYnJrZVwiOlwi4qaLXCIsXCJsYnJrc2xkXCI6XCLipo9cIixcImxicmtzbHVcIjpcIuKmjVwiLFwiTGNhcm9uXCI6XCLEvVwiLFwibGNhcm9uXCI6XCLEvlwiLFwiTGNlZGlsXCI6XCLEu1wiLFwibGNlZGlsXCI6XCLEvFwiLFwibGNlaWxcIjpcIuKMiFwiLFwibGN1YlwiOlwie1wiLFwiTGN5XCI6XCLQm1wiLFwibGN5XCI6XCLQu1wiLFwibGRjYVwiOlwi4qS2XCIsXCJsZHF1b1wiOlwi4oCcXCIsXCJsZHF1b3JcIjpcIuKAnlwiLFwibGRyZGhhclwiOlwi4qWnXCIsXCJsZHJ1c2hhclwiOlwi4qWLXCIsXCJsZHNoXCI6XCLihrJcIixcImxlXCI6XCLiiaRcIixcImxFXCI6XCLiiaZcIixcIkxlZnRBbmdsZUJyYWNrZXRcIjpcIuKfqFwiLFwiTGVmdEFycm93QmFyXCI6XCLih6RcIixcImxlZnRhcnJvd1wiOlwi4oaQXCIsXCJMZWZ0QXJyb3dcIjpcIuKGkFwiLFwiTGVmdGFycm93XCI6XCLih5BcIixcIkxlZnRBcnJvd1JpZ2h0QXJyb3dcIjpcIuKHhlwiLFwibGVmdGFycm93dGFpbFwiOlwi4oaiXCIsXCJMZWZ0Q2VpbGluZ1wiOlwi4oyIXCIsXCJMZWZ0RG91YmxlQnJhY2tldFwiOlwi4p+mXCIsXCJMZWZ0RG93blRlZVZlY3RvclwiOlwi4qWhXCIsXCJMZWZ0RG93blZlY3RvckJhclwiOlwi4qWZXCIsXCJMZWZ0RG93blZlY3RvclwiOlwi4oeDXCIsXCJMZWZ0Rmxvb3JcIjpcIuKMilwiLFwibGVmdGhhcnBvb25kb3duXCI6XCLihr1cIixcImxlZnRoYXJwb29udXBcIjpcIuKGvFwiLFwibGVmdGxlZnRhcnJvd3NcIjpcIuKHh1wiLFwibGVmdHJpZ2h0YXJyb3dcIjpcIuKGlFwiLFwiTGVmdFJpZ2h0QXJyb3dcIjpcIuKGlFwiLFwiTGVmdHJpZ2h0YXJyb3dcIjpcIuKHlFwiLFwibGVmdHJpZ2h0YXJyb3dzXCI6XCLih4ZcIixcImxlZnRyaWdodGhhcnBvb25zXCI6XCLih4tcIixcImxlZnRyaWdodHNxdWlnYXJyb3dcIjpcIuKGrVwiLFwiTGVmdFJpZ2h0VmVjdG9yXCI6XCLipY5cIixcIkxlZnRUZWVBcnJvd1wiOlwi4oakXCIsXCJMZWZ0VGVlXCI6XCLiiqNcIixcIkxlZnRUZWVWZWN0b3JcIjpcIuKlmlwiLFwibGVmdHRocmVldGltZXNcIjpcIuKLi1wiLFwiTGVmdFRyaWFuZ2xlQmFyXCI6XCLip49cIixcIkxlZnRUcmlhbmdsZVwiOlwi4oqyXCIsXCJMZWZ0VHJpYW5nbGVFcXVhbFwiOlwi4oq0XCIsXCJMZWZ0VXBEb3duVmVjdG9yXCI6XCLipZFcIixcIkxlZnRVcFRlZVZlY3RvclwiOlwi4qWgXCIsXCJMZWZ0VXBWZWN0b3JCYXJcIjpcIuKlmFwiLFwiTGVmdFVwVmVjdG9yXCI6XCLihr9cIixcIkxlZnRWZWN0b3JCYXJcIjpcIuKlklwiLFwiTGVmdFZlY3RvclwiOlwi4oa8XCIsXCJsRWdcIjpcIuKqi1wiLFwibGVnXCI6XCLii5pcIixcImxlcVwiOlwi4omkXCIsXCJsZXFxXCI6XCLiiaZcIixcImxlcXNsYW50XCI6XCLiqb1cIixcImxlc2NjXCI6XCLiqqhcIixcImxlc1wiOlwi4qm9XCIsXCJsZXNkb3RcIjpcIuKpv1wiLFwibGVzZG90b1wiOlwi4qqBXCIsXCJsZXNkb3RvclwiOlwi4qqDXCIsXCJsZXNnXCI6XCLii5rvuIBcIixcImxlc2dlc1wiOlwi4qqTXCIsXCJsZXNzYXBwcm94XCI6XCLiqoVcIixcImxlc3Nkb3RcIjpcIuKLllwiLFwibGVzc2VxZ3RyXCI6XCLii5pcIixcImxlc3NlcXFndHJcIjpcIuKqi1wiLFwiTGVzc0VxdWFsR3JlYXRlclwiOlwi4ouaXCIsXCJMZXNzRnVsbEVxdWFsXCI6XCLiiaZcIixcIkxlc3NHcmVhdGVyXCI6XCLiibZcIixcImxlc3NndHJcIjpcIuKJtlwiLFwiTGVzc0xlc3NcIjpcIuKqoVwiLFwibGVzc3NpbVwiOlwi4omyXCIsXCJMZXNzU2xhbnRFcXVhbFwiOlwi4qm9XCIsXCJMZXNzVGlsZGVcIjpcIuKJslwiLFwibGZpc2h0XCI6XCLipbxcIixcImxmbG9vclwiOlwi4oyKXCIsXCJMZnJcIjpcIvCdlI9cIixcImxmclwiOlwi8J2UqVwiLFwibGdcIjpcIuKJtlwiLFwibGdFXCI6XCLiqpFcIixcImxIYXJcIjpcIuKlolwiLFwibGhhcmRcIjpcIuKGvVwiLFwibGhhcnVcIjpcIuKGvFwiLFwibGhhcnVsXCI6XCLipapcIixcImxoYmxrXCI6XCLiloRcIixcIkxKY3lcIjpcItCJXCIsXCJsamN5XCI6XCLRmVwiLFwibGxhcnJcIjpcIuKHh1wiLFwibGxcIjpcIuKJqlwiLFwiTGxcIjpcIuKLmFwiLFwibGxjb3JuZXJcIjpcIuKMnlwiLFwiTGxlZnRhcnJvd1wiOlwi4oeaXCIsXCJsbGhhcmRcIjpcIuKlq1wiLFwibGx0cmlcIjpcIuKXulwiLFwiTG1pZG90XCI6XCLEv1wiLFwibG1pZG90XCI6XCLFgFwiLFwibG1vdXN0YWNoZVwiOlwi4o6wXCIsXCJsbW91c3RcIjpcIuKOsFwiLFwibG5hcFwiOlwi4qqJXCIsXCJsbmFwcHJveFwiOlwi4qqJXCIsXCJsbmVcIjpcIuKqh1wiLFwibG5FXCI6XCLiiahcIixcImxuZXFcIjpcIuKqh1wiLFwibG5lcXFcIjpcIuKJqFwiLFwibG5zaW1cIjpcIuKLplwiLFwibG9hbmdcIjpcIuKfrFwiLFwibG9hcnJcIjpcIuKHvVwiLFwibG9icmtcIjpcIuKfplwiLFwibG9uZ2xlZnRhcnJvd1wiOlwi4p+1XCIsXCJMb25nTGVmdEFycm93XCI6XCLin7VcIixcIkxvbmdsZWZ0YXJyb3dcIjpcIuKfuFwiLFwibG9uZ2xlZnRyaWdodGFycm93XCI6XCLin7dcIixcIkxvbmdMZWZ0UmlnaHRBcnJvd1wiOlwi4p+3XCIsXCJMb25nbGVmdHJpZ2h0YXJyb3dcIjpcIuKfulwiLFwibG9uZ21hcHN0b1wiOlwi4p+8XCIsXCJsb25ncmlnaHRhcnJvd1wiOlwi4p+2XCIsXCJMb25nUmlnaHRBcnJvd1wiOlwi4p+2XCIsXCJMb25ncmlnaHRhcnJvd1wiOlwi4p+5XCIsXCJsb29wYXJyb3dsZWZ0XCI6XCLihqtcIixcImxvb3BhcnJvd3JpZ2h0XCI6XCLihqxcIixcImxvcGFyXCI6XCLipoVcIixcIkxvcGZcIjpcIvCdlYNcIixcImxvcGZcIjpcIvCdlZ1cIixcImxvcGx1c1wiOlwi4qitXCIsXCJsb3RpbWVzXCI6XCLiqLRcIixcImxvd2FzdFwiOlwi4oiXXCIsXCJsb3diYXJcIjpcIl9cIixcIkxvd2VyTGVmdEFycm93XCI6XCLihplcIixcIkxvd2VyUmlnaHRBcnJvd1wiOlwi4oaYXCIsXCJsb3pcIjpcIuKXilwiLFwibG96ZW5nZVwiOlwi4peKXCIsXCJsb3pmXCI6XCLip6tcIixcImxwYXJcIjpcIihcIixcImxwYXJsdFwiOlwi4qaTXCIsXCJscmFyclwiOlwi4oeGXCIsXCJscmNvcm5lclwiOlwi4oyfXCIsXCJscmhhclwiOlwi4oeLXCIsXCJscmhhcmRcIjpcIuKlrVwiLFwibHJtXCI6XCLigI5cIixcImxydHJpXCI6XCLiir9cIixcImxzYXF1b1wiOlwi4oC5XCIsXCJsc2NyXCI6XCLwnZOBXCIsXCJMc2NyXCI6XCLihJJcIixcImxzaFwiOlwi4oawXCIsXCJMc2hcIjpcIuKGsFwiLFwibHNpbVwiOlwi4omyXCIsXCJsc2ltZVwiOlwi4qqNXCIsXCJsc2ltZ1wiOlwi4qqPXCIsXCJsc3FiXCI6XCJbXCIsXCJsc3F1b1wiOlwi4oCYXCIsXCJsc3F1b3JcIjpcIuKAmlwiLFwiTHN0cm9rXCI6XCLFgVwiLFwibHN0cm9rXCI6XCLFglwiLFwibHRjY1wiOlwi4qqmXCIsXCJsdGNpclwiOlwi4qm5XCIsXCJsdFwiOlwiPFwiLFwiTFRcIjpcIjxcIixcIkx0XCI6XCLiiapcIixcImx0ZG90XCI6XCLii5ZcIixcImx0aHJlZVwiOlwi4ouLXCIsXCJsdGltZXNcIjpcIuKLiVwiLFwibHRsYXJyXCI6XCLipbZcIixcImx0cXVlc3RcIjpcIuKpu1wiLFwibHRyaVwiOlwi4peDXCIsXCJsdHJpZVwiOlwi4oq0XCIsXCJsdHJpZlwiOlwi4peCXCIsXCJsdHJQYXJcIjpcIuKmllwiLFwibHVyZHNoYXJcIjpcIuKlilwiLFwibHVydWhhclwiOlwi4qWmXCIsXCJsdmVydG5lcXFcIjpcIuKJqO+4gFwiLFwibHZuRVwiOlwi4omo77iAXCIsXCJtYWNyXCI6XCLCr1wiLFwibWFsZVwiOlwi4pmCXCIsXCJtYWx0XCI6XCLinKBcIixcIm1hbHRlc2VcIjpcIuKcoFwiLFwiTWFwXCI6XCLipIVcIixcIm1hcFwiOlwi4oamXCIsXCJtYXBzdG9cIjpcIuKGplwiLFwibWFwc3RvZG93blwiOlwi4oanXCIsXCJtYXBzdG9sZWZ0XCI6XCLihqRcIixcIm1hcHN0b3VwXCI6XCLihqVcIixcIm1hcmtlclwiOlwi4pauXCIsXCJtY29tbWFcIjpcIuKoqVwiLFwiTWN5XCI6XCLQnFwiLFwibWN5XCI6XCLQvFwiLFwibWRhc2hcIjpcIuKAlFwiLFwibUREb3RcIjpcIuKIulwiLFwibWVhc3VyZWRhbmdsZVwiOlwi4oihXCIsXCJNZWRpdW1TcGFjZVwiOlwi4oGfXCIsXCJNZWxsaW50cmZcIjpcIuKEs1wiLFwiTWZyXCI6XCLwnZSQXCIsXCJtZnJcIjpcIvCdlKpcIixcIm1ob1wiOlwi4oSnXCIsXCJtaWNyb1wiOlwiwrVcIixcIm1pZGFzdFwiOlwiKlwiLFwibWlkY2lyXCI6XCLiq7BcIixcIm1pZFwiOlwi4oijXCIsXCJtaWRkb3RcIjpcIsK3XCIsXCJtaW51c2JcIjpcIuKKn1wiLFwibWludXNcIjpcIuKIklwiLFwibWludXNkXCI6XCLiiLhcIixcIm1pbnVzZHVcIjpcIuKoqlwiLFwiTWludXNQbHVzXCI6XCLiiJNcIixcIm1sY3BcIjpcIuKrm1wiLFwibWxkclwiOlwi4oCmXCIsXCJtbnBsdXNcIjpcIuKIk1wiLFwibW9kZWxzXCI6XCLiiqdcIixcIk1vcGZcIjpcIvCdlYRcIixcIm1vcGZcIjpcIvCdlZ5cIixcIm1wXCI6XCLiiJNcIixcIm1zY3JcIjpcIvCdk4JcIixcIk1zY3JcIjpcIuKEs1wiLFwibXN0cG9zXCI6XCLiiL5cIixcIk11XCI6XCLOnFwiLFwibXVcIjpcIs68XCIsXCJtdWx0aW1hcFwiOlwi4oq4XCIsXCJtdW1hcFwiOlwi4oq4XCIsXCJuYWJsYVwiOlwi4oiHXCIsXCJOYWN1dGVcIjpcIsWDXCIsXCJuYWN1dGVcIjpcIsWEXCIsXCJuYW5nXCI6XCLiiKDig5JcIixcIm5hcFwiOlwi4omJXCIsXCJuYXBFXCI6XCLiqbDMuFwiLFwibmFwaWRcIjpcIuKJi8y4XCIsXCJuYXBvc1wiOlwixYlcIixcIm5hcHByb3hcIjpcIuKJiVwiLFwibmF0dXJhbFwiOlwi4pmuXCIsXCJuYXR1cmFsc1wiOlwi4oSVXCIsXCJuYXR1clwiOlwi4pmuXCIsXCJuYnNwXCI6XCLCoFwiLFwibmJ1bXBcIjpcIuKJjsy4XCIsXCJuYnVtcGVcIjpcIuKJj8y4XCIsXCJuY2FwXCI6XCLiqYNcIixcIk5jYXJvblwiOlwixYdcIixcIm5jYXJvblwiOlwixYhcIixcIk5jZWRpbFwiOlwixYVcIixcIm5jZWRpbFwiOlwixYZcIixcIm5jb25nXCI6XCLiiYdcIixcIm5jb25nZG90XCI6XCLiqa3MuFwiLFwibmN1cFwiOlwi4qmCXCIsXCJOY3lcIjpcItCdXCIsXCJuY3lcIjpcItC9XCIsXCJuZGFzaFwiOlwi4oCTXCIsXCJuZWFyaGtcIjpcIuKkpFwiLFwibmVhcnJcIjpcIuKGl1wiLFwibmVBcnJcIjpcIuKHl1wiLFwibmVhcnJvd1wiOlwi4oaXXCIsXCJuZVwiOlwi4omgXCIsXCJuZWRvdFwiOlwi4omQzLhcIixcIk5lZ2F0aXZlTWVkaXVtU3BhY2VcIjpcIuKAi1wiLFwiTmVnYXRpdmVUaGlja1NwYWNlXCI6XCLigItcIixcIk5lZ2F0aXZlVGhpblNwYWNlXCI6XCLigItcIixcIk5lZ2F0aXZlVmVyeVRoaW5TcGFjZVwiOlwi4oCLXCIsXCJuZXF1aXZcIjpcIuKJolwiLFwibmVzZWFyXCI6XCLipKhcIixcIm5lc2ltXCI6XCLiiYLMuFwiLFwiTmVzdGVkR3JlYXRlckdyZWF0ZXJcIjpcIuKJq1wiLFwiTmVzdGVkTGVzc0xlc3NcIjpcIuKJqlwiLFwiTmV3TGluZVwiOlwiXFxuXCIsXCJuZXhpc3RcIjpcIuKIhFwiLFwibmV4aXN0c1wiOlwi4oiEXCIsXCJOZnJcIjpcIvCdlJFcIixcIm5mclwiOlwi8J2Uq1wiLFwibmdFXCI6XCLiiafMuFwiLFwibmdlXCI6XCLiibFcIixcIm5nZXFcIjpcIuKJsVwiLFwibmdlcXFcIjpcIuKJp8y4XCIsXCJuZ2Vxc2xhbnRcIjpcIuKpvsy4XCIsXCJuZ2VzXCI6XCLiqb7MuFwiLFwibkdnXCI6XCLii5nMuFwiLFwibmdzaW1cIjpcIuKJtVwiLFwibkd0XCI6XCLiiavig5JcIixcIm5ndFwiOlwi4omvXCIsXCJuZ3RyXCI6XCLiia9cIixcIm5HdHZcIjpcIuKJq8y4XCIsXCJuaGFyclwiOlwi4oauXCIsXCJuaEFyclwiOlwi4oeOXCIsXCJuaHBhclwiOlwi4quyXCIsXCJuaVwiOlwi4oiLXCIsXCJuaXNcIjpcIuKLvFwiLFwibmlzZFwiOlwi4ou6XCIsXCJuaXZcIjpcIuKIi1wiLFwiTkpjeVwiOlwi0IpcIixcIm5qY3lcIjpcItGaXCIsXCJubGFyclwiOlwi4oaaXCIsXCJubEFyclwiOlwi4oeNXCIsXCJubGRyXCI6XCLigKVcIixcIm5sRVwiOlwi4ommzLhcIixcIm5sZVwiOlwi4omwXCIsXCJubGVmdGFycm93XCI6XCLihppcIixcIm5MZWZ0YXJyb3dcIjpcIuKHjVwiLFwibmxlZnRyaWdodGFycm93XCI6XCLihq5cIixcIm5MZWZ0cmlnaHRhcnJvd1wiOlwi4oeOXCIsXCJubGVxXCI6XCLiibBcIixcIm5sZXFxXCI6XCLiiabMuFwiLFwibmxlcXNsYW50XCI6XCLiqb3MuFwiLFwibmxlc1wiOlwi4qm9zLhcIixcIm5sZXNzXCI6XCLiia5cIixcIm5MbFwiOlwi4ouYzLhcIixcIm5sc2ltXCI6XCLiibRcIixcIm5MdFwiOlwi4omq4oOSXCIsXCJubHRcIjpcIuKJrlwiLFwibmx0cmlcIjpcIuKLqlwiLFwibmx0cmllXCI6XCLii6xcIixcIm5MdHZcIjpcIuKJqsy4XCIsXCJubWlkXCI6XCLiiKRcIixcIk5vQnJlYWtcIjpcIuKBoFwiLFwiTm9uQnJlYWtpbmdTcGFjZVwiOlwiwqBcIixcIm5vcGZcIjpcIvCdlZ9cIixcIk5vcGZcIjpcIuKElVwiLFwiTm90XCI6XCLiq6xcIixcIm5vdFwiOlwiwqxcIixcIk5vdENvbmdydWVudFwiOlwi4omiXCIsXCJOb3RDdXBDYXBcIjpcIuKJrVwiLFwiTm90RG91YmxlVmVydGljYWxCYXJcIjpcIuKIplwiLFwiTm90RWxlbWVudFwiOlwi4oiJXCIsXCJOb3RFcXVhbFwiOlwi4omgXCIsXCJOb3RFcXVhbFRpbGRlXCI6XCLiiYLMuFwiLFwiTm90RXhpc3RzXCI6XCLiiIRcIixcIk5vdEdyZWF0ZXJcIjpcIuKJr1wiLFwiTm90R3JlYXRlckVxdWFsXCI6XCLiibFcIixcIk5vdEdyZWF0ZXJGdWxsRXF1YWxcIjpcIuKJp8y4XCIsXCJOb3RHcmVhdGVyR3JlYXRlclwiOlwi4omrzLhcIixcIk5vdEdyZWF0ZXJMZXNzXCI6XCLiiblcIixcIk5vdEdyZWF0ZXJTbGFudEVxdWFsXCI6XCLiqb7MuFwiLFwiTm90R3JlYXRlclRpbGRlXCI6XCLiibVcIixcIk5vdEh1bXBEb3duSHVtcFwiOlwi4omOzLhcIixcIk5vdEh1bXBFcXVhbFwiOlwi4omPzLhcIixcIm5vdGluXCI6XCLiiIlcIixcIm5vdGluZG90XCI6XCLii7XMuFwiLFwibm90aW5FXCI6XCLii7nMuFwiLFwibm90aW52YVwiOlwi4oiJXCIsXCJub3RpbnZiXCI6XCLii7dcIixcIm5vdGludmNcIjpcIuKLtlwiLFwiTm90TGVmdFRyaWFuZ2xlQmFyXCI6XCLip4/MuFwiLFwiTm90TGVmdFRyaWFuZ2xlXCI6XCLii6pcIixcIk5vdExlZnRUcmlhbmdsZUVxdWFsXCI6XCLii6xcIixcIk5vdExlc3NcIjpcIuKJrlwiLFwiTm90TGVzc0VxdWFsXCI6XCLiibBcIixcIk5vdExlc3NHcmVhdGVyXCI6XCLiibhcIixcIk5vdExlc3NMZXNzXCI6XCLiiarMuFwiLFwiTm90TGVzc1NsYW50RXF1YWxcIjpcIuKpvcy4XCIsXCJOb3RMZXNzVGlsZGVcIjpcIuKJtFwiLFwiTm90TmVzdGVkR3JlYXRlckdyZWF0ZXJcIjpcIuKqosy4XCIsXCJOb3ROZXN0ZWRMZXNzTGVzc1wiOlwi4qqhzLhcIixcIm5vdG5pXCI6XCLiiIxcIixcIm5vdG5pdmFcIjpcIuKIjFwiLFwibm90bml2YlwiOlwi4ou+XCIsXCJub3RuaXZjXCI6XCLii71cIixcIk5vdFByZWNlZGVzXCI6XCLiioBcIixcIk5vdFByZWNlZGVzRXF1YWxcIjpcIuKqr8y4XCIsXCJOb3RQcmVjZWRlc1NsYW50RXF1YWxcIjpcIuKLoFwiLFwiTm90UmV2ZXJzZUVsZW1lbnRcIjpcIuKIjFwiLFwiTm90UmlnaHRUcmlhbmdsZUJhclwiOlwi4qeQzLhcIixcIk5vdFJpZ2h0VHJpYW5nbGVcIjpcIuKLq1wiLFwiTm90UmlnaHRUcmlhbmdsZUVxdWFsXCI6XCLii61cIixcIk5vdFNxdWFyZVN1YnNldFwiOlwi4oqPzLhcIixcIk5vdFNxdWFyZVN1YnNldEVxdWFsXCI6XCLii6JcIixcIk5vdFNxdWFyZVN1cGVyc2V0XCI6XCLiipDMuFwiLFwiTm90U3F1YXJlU3VwZXJzZXRFcXVhbFwiOlwi4oujXCIsXCJOb3RTdWJzZXRcIjpcIuKKguKDklwiLFwiTm90U3Vic2V0RXF1YWxcIjpcIuKKiFwiLFwiTm90U3VjY2VlZHNcIjpcIuKKgVwiLFwiTm90U3VjY2VlZHNFcXVhbFwiOlwi4qqwzLhcIixcIk5vdFN1Y2NlZWRzU2xhbnRFcXVhbFwiOlwi4ouhXCIsXCJOb3RTdWNjZWVkc1RpbGRlXCI6XCLiib/MuFwiLFwiTm90U3VwZXJzZXRcIjpcIuKKg+KDklwiLFwiTm90U3VwZXJzZXRFcXVhbFwiOlwi4oqJXCIsXCJOb3RUaWxkZVwiOlwi4omBXCIsXCJOb3RUaWxkZUVxdWFsXCI6XCLiiYRcIixcIk5vdFRpbGRlRnVsbEVxdWFsXCI6XCLiiYdcIixcIk5vdFRpbGRlVGlsZGVcIjpcIuKJiVwiLFwiTm90VmVydGljYWxCYXJcIjpcIuKIpFwiLFwibnBhcmFsbGVsXCI6XCLiiKZcIixcIm5wYXJcIjpcIuKIplwiLFwibnBhcnNsXCI6XCLiq73ig6VcIixcIm5wYXJ0XCI6XCLiiILMuFwiLFwibnBvbGludFwiOlwi4qiUXCIsXCJucHJcIjpcIuKKgFwiLFwibnByY3VlXCI6XCLii6BcIixcIm5wcmVjXCI6XCLiioBcIixcIm5wcmVjZXFcIjpcIuKqr8y4XCIsXCJucHJlXCI6XCLiqq/MuFwiLFwibnJhcnJjXCI6XCLipLPMuFwiLFwibnJhcnJcIjpcIuKGm1wiLFwibnJBcnJcIjpcIuKHj1wiLFwibnJhcnJ3XCI6XCLihp3MuFwiLFwibnJpZ2h0YXJyb3dcIjpcIuKGm1wiLFwiblJpZ2h0YXJyb3dcIjpcIuKHj1wiLFwibnJ0cmlcIjpcIuKLq1wiLFwibnJ0cmllXCI6XCLii61cIixcIm5zY1wiOlwi4oqBXCIsXCJuc2NjdWVcIjpcIuKLoVwiLFwibnNjZVwiOlwi4qqwzLhcIixcIk5zY3JcIjpcIvCdkqlcIixcIm5zY3JcIjpcIvCdk4NcIixcIm5zaG9ydG1pZFwiOlwi4oikXCIsXCJuc2hvcnRwYXJhbGxlbFwiOlwi4oimXCIsXCJuc2ltXCI6XCLiiYFcIixcIm5zaW1lXCI6XCLiiYRcIixcIm5zaW1lcVwiOlwi4omEXCIsXCJuc21pZFwiOlwi4oikXCIsXCJuc3BhclwiOlwi4oimXCIsXCJuc3FzdWJlXCI6XCLii6JcIixcIm5zcXN1cGVcIjpcIuKLo1wiLFwibnN1YlwiOlwi4oqEXCIsXCJuc3ViRVwiOlwi4quFzLhcIixcIm5zdWJlXCI6XCLiiohcIixcIm5zdWJzZXRcIjpcIuKKguKDklwiLFwibnN1YnNldGVxXCI6XCLiiohcIixcIm5zdWJzZXRlcXFcIjpcIuKrhcy4XCIsXCJuc3VjY1wiOlwi4oqBXCIsXCJuc3VjY2VxXCI6XCLiqrDMuFwiLFwibnN1cFwiOlwi4oqFXCIsXCJuc3VwRVwiOlwi4quGzLhcIixcIm5zdXBlXCI6XCLiiolcIixcIm5zdXBzZXRcIjpcIuKKg+KDklwiLFwibnN1cHNldGVxXCI6XCLiiolcIixcIm5zdXBzZXRlcXFcIjpcIuKrhsy4XCIsXCJudGdsXCI6XCLiiblcIixcIk50aWxkZVwiOlwiw5FcIixcIm50aWxkZVwiOlwiw7FcIixcIm50bGdcIjpcIuKJuFwiLFwibnRyaWFuZ2xlbGVmdFwiOlwi4ouqXCIsXCJudHJpYW5nbGVsZWZ0ZXFcIjpcIuKLrFwiLFwibnRyaWFuZ2xlcmlnaHRcIjpcIuKLq1wiLFwibnRyaWFuZ2xlcmlnaHRlcVwiOlwi4outXCIsXCJOdVwiOlwizp1cIixcIm51XCI6XCLOvVwiLFwibnVtXCI6XCIjXCIsXCJudW1lcm9cIjpcIuKEllwiLFwibnVtc3BcIjpcIuKAh1wiLFwibnZhcFwiOlwi4omN4oOSXCIsXCJudmRhc2hcIjpcIuKKrFwiLFwibnZEYXNoXCI6XCLiiq1cIixcIm5WZGFzaFwiOlwi4oquXCIsXCJuVkRhc2hcIjpcIuKKr1wiLFwibnZnZVwiOlwi4oml4oOSXCIsXCJudmd0XCI6XCI+4oOSXCIsXCJudkhhcnJcIjpcIuKkhFwiLFwibnZpbmZpblwiOlwi4qeeXCIsXCJudmxBcnJcIjpcIuKkglwiLFwibnZsZVwiOlwi4omk4oOSXCIsXCJudmx0XCI6XCI84oOSXCIsXCJudmx0cmllXCI6XCLiirTig5JcIixcIm52ckFyclwiOlwi4qSDXCIsXCJudnJ0cmllXCI6XCLiirXig5JcIixcIm52c2ltXCI6XCLiiLzig5JcIixcIm53YXJoa1wiOlwi4qSjXCIsXCJud2FyclwiOlwi4oaWXCIsXCJud0FyclwiOlwi4oeWXCIsXCJud2Fycm93XCI6XCLihpZcIixcIm53bmVhclwiOlwi4qSnXCIsXCJPYWN1dGVcIjpcIsOTXCIsXCJvYWN1dGVcIjpcIsOzXCIsXCJvYXN0XCI6XCLiiptcIixcIk9jaXJjXCI6XCLDlFwiLFwib2NpcmNcIjpcIsO0XCIsXCJvY2lyXCI6XCLiippcIixcIk9jeVwiOlwi0J5cIixcIm9jeVwiOlwi0L5cIixcIm9kYXNoXCI6XCLiip1cIixcIk9kYmxhY1wiOlwixZBcIixcIm9kYmxhY1wiOlwixZFcIixcIm9kaXZcIjpcIuKouFwiLFwib2RvdFwiOlwi4oqZXCIsXCJvZHNvbGRcIjpcIuKmvFwiLFwiT0VsaWdcIjpcIsWSXCIsXCJvZWxpZ1wiOlwixZNcIixcIm9mY2lyXCI6XCLipr9cIixcIk9mclwiOlwi8J2UklwiLFwib2ZyXCI6XCLwnZSsXCIsXCJvZ29uXCI6XCLLm1wiLFwiT2dyYXZlXCI6XCLDklwiLFwib2dyYXZlXCI6XCLDslwiLFwib2d0XCI6XCLip4FcIixcIm9oYmFyXCI6XCLiprVcIixcIm9obVwiOlwizqlcIixcIm9pbnRcIjpcIuKIrlwiLFwib2xhcnJcIjpcIuKGulwiLFwib2xjaXJcIjpcIuKmvlwiLFwib2xjcm9zc1wiOlwi4qa7XCIsXCJvbGluZVwiOlwi4oC+XCIsXCJvbHRcIjpcIuKngFwiLFwiT21hY3JcIjpcIsWMXCIsXCJvbWFjclwiOlwixY1cIixcIk9tZWdhXCI6XCLOqVwiLFwib21lZ2FcIjpcIs+JXCIsXCJPbWljcm9uXCI6XCLOn1wiLFwib21pY3JvblwiOlwizr9cIixcIm9taWRcIjpcIuKmtlwiLFwib21pbnVzXCI6XCLiipZcIixcIk9vcGZcIjpcIvCdlYZcIixcIm9vcGZcIjpcIvCdlaBcIixcIm9wYXJcIjpcIuKmt1wiLFwiT3BlbkN1cmx5RG91YmxlUXVvdGVcIjpcIuKAnFwiLFwiT3BlbkN1cmx5UXVvdGVcIjpcIuKAmFwiLFwib3BlcnBcIjpcIuKmuVwiLFwib3BsdXNcIjpcIuKKlVwiLFwib3JhcnJcIjpcIuKGu1wiLFwiT3JcIjpcIuKplFwiLFwib3JcIjpcIuKIqFwiLFwib3JkXCI6XCLiqZ1cIixcIm9yZGVyXCI6XCLihLRcIixcIm9yZGVyb2ZcIjpcIuKEtFwiLFwib3JkZlwiOlwiwqpcIixcIm9yZG1cIjpcIsK6XCIsXCJvcmlnb2ZcIjpcIuKKtlwiLFwib3JvclwiOlwi4qmWXCIsXCJvcnNsb3BlXCI6XCLiqZdcIixcIm9ydlwiOlwi4qmbXCIsXCJvU1wiOlwi4pOIXCIsXCJPc2NyXCI6XCLwnZKqXCIsXCJvc2NyXCI6XCLihLRcIixcIk9zbGFzaFwiOlwiw5hcIixcIm9zbGFzaFwiOlwiw7hcIixcIm9zb2xcIjpcIuKKmFwiLFwiT3RpbGRlXCI6XCLDlVwiLFwib3RpbGRlXCI6XCLDtVwiLFwib3RpbWVzYXNcIjpcIuKotlwiLFwiT3RpbWVzXCI6XCLiqLdcIixcIm90aW1lc1wiOlwi4oqXXCIsXCJPdW1sXCI6XCLDllwiLFwib3VtbFwiOlwiw7ZcIixcIm92YmFyXCI6XCLijL1cIixcIk92ZXJCYXJcIjpcIuKAvlwiLFwiT3ZlckJyYWNlXCI6XCLij55cIixcIk92ZXJCcmFja2V0XCI6XCLijrRcIixcIk92ZXJQYXJlbnRoZXNpc1wiOlwi4o+cXCIsXCJwYXJhXCI6XCLCtlwiLFwicGFyYWxsZWxcIjpcIuKIpVwiLFwicGFyXCI6XCLiiKVcIixcInBhcnNpbVwiOlwi4quzXCIsXCJwYXJzbFwiOlwi4qu9XCIsXCJwYXJ0XCI6XCLiiIJcIixcIlBhcnRpYWxEXCI6XCLiiIJcIixcIlBjeVwiOlwi0J9cIixcInBjeVwiOlwi0L9cIixcInBlcmNudFwiOlwiJVwiLFwicGVyaW9kXCI6XCIuXCIsXCJwZXJtaWxcIjpcIuKAsFwiLFwicGVycFwiOlwi4oqlXCIsXCJwZXJ0ZW5rXCI6XCLigLFcIixcIlBmclwiOlwi8J2Uk1wiLFwicGZyXCI6XCLwnZStXCIsXCJQaGlcIjpcIs6mXCIsXCJwaGlcIjpcIs+GXCIsXCJwaGl2XCI6XCLPlVwiLFwicGhtbWF0XCI6XCLihLNcIixcInBob25lXCI6XCLimI5cIixcIlBpXCI6XCLOoFwiLFwicGlcIjpcIs+AXCIsXCJwaXRjaGZvcmtcIjpcIuKLlFwiLFwicGl2XCI6XCLPllwiLFwicGxhbmNrXCI6XCLihI9cIixcInBsYW5ja2hcIjpcIuKEjlwiLFwicGxhbmt2XCI6XCLihI9cIixcInBsdXNhY2lyXCI6XCLiqKNcIixcInBsdXNiXCI6XCLiip5cIixcInBsdXNjaXJcIjpcIuKoolwiLFwicGx1c1wiOlwiK1wiLFwicGx1c2RvXCI6XCLiiJRcIixcInBsdXNkdVwiOlwi4qilXCIsXCJwbHVzZVwiOlwi4qmyXCIsXCJQbHVzTWludXNcIjpcIsKxXCIsXCJwbHVzbW5cIjpcIsKxXCIsXCJwbHVzc2ltXCI6XCLiqKZcIixcInBsdXN0d29cIjpcIuKop1wiLFwicG1cIjpcIsKxXCIsXCJQb2luY2FyZXBsYW5lXCI6XCLihIxcIixcInBvaW50aW50XCI6XCLiqJVcIixcInBvcGZcIjpcIvCdlaFcIixcIlBvcGZcIjpcIuKEmVwiLFwicG91bmRcIjpcIsKjXCIsXCJwcmFwXCI6XCLiqrdcIixcIlByXCI6XCLiqrtcIixcInByXCI6XCLiibpcIixcInByY3VlXCI6XCLiibxcIixcInByZWNhcHByb3hcIjpcIuKqt1wiLFwicHJlY1wiOlwi4om6XCIsXCJwcmVjY3VybHllcVwiOlwi4om8XCIsXCJQcmVjZWRlc1wiOlwi4om6XCIsXCJQcmVjZWRlc0VxdWFsXCI6XCLiqq9cIixcIlByZWNlZGVzU2xhbnRFcXVhbFwiOlwi4om8XCIsXCJQcmVjZWRlc1RpbGRlXCI6XCLiib5cIixcInByZWNlcVwiOlwi4qqvXCIsXCJwcmVjbmFwcHJveFwiOlwi4qq5XCIsXCJwcmVjbmVxcVwiOlwi4qq1XCIsXCJwcmVjbnNpbVwiOlwi4ouoXCIsXCJwcmVcIjpcIuKqr1wiLFwicHJFXCI6XCLiqrNcIixcInByZWNzaW1cIjpcIuKJvlwiLFwicHJpbWVcIjpcIuKAslwiLFwiUHJpbWVcIjpcIuKAs1wiLFwicHJpbWVzXCI6XCLihJlcIixcInBybmFwXCI6XCLiqrlcIixcInBybkVcIjpcIuKqtVwiLFwicHJuc2ltXCI6XCLii6hcIixcInByb2RcIjpcIuKIj1wiLFwiUHJvZHVjdFwiOlwi4oiPXCIsXCJwcm9mYWxhclwiOlwi4oyuXCIsXCJwcm9mbGluZVwiOlwi4oySXCIsXCJwcm9mc3VyZlwiOlwi4oyTXCIsXCJwcm9wXCI6XCLiiJ1cIixcIlByb3BvcnRpb25hbFwiOlwi4oidXCIsXCJQcm9wb3J0aW9uXCI6XCLiiLdcIixcInByb3B0b1wiOlwi4oidXCIsXCJwcnNpbVwiOlwi4om+XCIsXCJwcnVyZWxcIjpcIuKKsFwiLFwiUHNjclwiOlwi8J2Sq1wiLFwicHNjclwiOlwi8J2ThVwiLFwiUHNpXCI6XCLOqFwiLFwicHNpXCI6XCLPiFwiLFwicHVuY3NwXCI6XCLigIhcIixcIlFmclwiOlwi8J2UlFwiLFwicWZyXCI6XCLwnZSuXCIsXCJxaW50XCI6XCLiqIxcIixcInFvcGZcIjpcIvCdlaJcIixcIlFvcGZcIjpcIuKEmlwiLFwicXByaW1lXCI6XCLigZdcIixcIlFzY3JcIjpcIvCdkqxcIixcInFzY3JcIjpcIvCdk4ZcIixcInF1YXRlcm5pb25zXCI6XCLihI1cIixcInF1YXRpbnRcIjpcIuKollwiLFwicXVlc3RcIjpcIj9cIixcInF1ZXN0ZXFcIjpcIuKJn1wiLFwicXVvdFwiOlwiXFxcIlwiLFwiUVVPVFwiOlwiXFxcIlwiLFwickFhcnJcIjpcIuKHm1wiLFwicmFjZVwiOlwi4oi9zLFcIixcIlJhY3V0ZVwiOlwixZRcIixcInJhY3V0ZVwiOlwixZVcIixcInJhZGljXCI6XCLiiJpcIixcInJhZW1wdHl2XCI6XCLiprNcIixcInJhbmdcIjpcIuKfqVwiLFwiUmFuZ1wiOlwi4p+rXCIsXCJyYW5nZFwiOlwi4qaSXCIsXCJyYW5nZVwiOlwi4qalXCIsXCJyYW5nbGVcIjpcIuKfqVwiLFwicmFxdW9cIjpcIsK7XCIsXCJyYXJyYXBcIjpcIuKltVwiLFwicmFycmJcIjpcIuKHpVwiLFwicmFycmJmc1wiOlwi4qSgXCIsXCJyYXJyY1wiOlwi4qSzXCIsXCJyYXJyXCI6XCLihpJcIixcIlJhcnJcIjpcIuKGoFwiLFwickFyclwiOlwi4oeSXCIsXCJyYXJyZnNcIjpcIuKknlwiLFwicmFycmhrXCI6XCLihqpcIixcInJhcnJscFwiOlwi4oasXCIsXCJyYXJycGxcIjpcIuKlhVwiLFwicmFycnNpbVwiOlwi4qW0XCIsXCJSYXJydGxcIjpcIuKkllwiLFwicmFycnRsXCI6XCLihqNcIixcInJhcnJ3XCI6XCLihp1cIixcInJhdGFpbFwiOlwi4qSaXCIsXCJyQXRhaWxcIjpcIuKknFwiLFwicmF0aW9cIjpcIuKItlwiLFwicmF0aW9uYWxzXCI6XCLihJpcIixcInJiYXJyXCI6XCLipI1cIixcInJCYXJyXCI6XCLipI9cIixcIlJCYXJyXCI6XCLipJBcIixcInJiYnJrXCI6XCLinbNcIixcInJicmFjZVwiOlwifVwiLFwicmJyYWNrXCI6XCJdXCIsXCJyYnJrZVwiOlwi4qaMXCIsXCJyYnJrc2xkXCI6XCLipo5cIixcInJicmtzbHVcIjpcIuKmkFwiLFwiUmNhcm9uXCI6XCLFmFwiLFwicmNhcm9uXCI6XCLFmVwiLFwiUmNlZGlsXCI6XCLFllwiLFwicmNlZGlsXCI6XCLFl1wiLFwicmNlaWxcIjpcIuKMiVwiLFwicmN1YlwiOlwifVwiLFwiUmN5XCI6XCLQoFwiLFwicmN5XCI6XCLRgFwiLFwicmRjYVwiOlwi4qS3XCIsXCJyZGxkaGFyXCI6XCLipalcIixcInJkcXVvXCI6XCLigJ1cIixcInJkcXVvclwiOlwi4oCdXCIsXCJyZHNoXCI6XCLihrNcIixcInJlYWxcIjpcIuKEnFwiLFwicmVhbGluZVwiOlwi4oSbXCIsXCJyZWFscGFydFwiOlwi4oScXCIsXCJyZWFsc1wiOlwi4oSdXCIsXCJSZVwiOlwi4oScXCIsXCJyZWN0XCI6XCLilq1cIixcInJlZ1wiOlwiwq5cIixcIlJFR1wiOlwiwq5cIixcIlJldmVyc2VFbGVtZW50XCI6XCLiiItcIixcIlJldmVyc2VFcXVpbGlicml1bVwiOlwi4oeLXCIsXCJSZXZlcnNlVXBFcXVpbGlicml1bVwiOlwi4qWvXCIsXCJyZmlzaHRcIjpcIuKlvVwiLFwicmZsb29yXCI6XCLijItcIixcInJmclwiOlwi8J2Ur1wiLFwiUmZyXCI6XCLihJxcIixcInJIYXJcIjpcIuKlpFwiLFwicmhhcmRcIjpcIuKHgVwiLFwicmhhcnVcIjpcIuKHgFwiLFwicmhhcnVsXCI6XCLipaxcIixcIlJob1wiOlwizqFcIixcInJob1wiOlwiz4FcIixcInJob3ZcIjpcIs+xXCIsXCJSaWdodEFuZ2xlQnJhY2tldFwiOlwi4p+pXCIsXCJSaWdodEFycm93QmFyXCI6XCLih6VcIixcInJpZ2h0YXJyb3dcIjpcIuKGklwiLFwiUmlnaHRBcnJvd1wiOlwi4oaSXCIsXCJSaWdodGFycm93XCI6XCLih5JcIixcIlJpZ2h0QXJyb3dMZWZ0QXJyb3dcIjpcIuKHhFwiLFwicmlnaHRhcnJvd3RhaWxcIjpcIuKGo1wiLFwiUmlnaHRDZWlsaW5nXCI6XCLijIlcIixcIlJpZ2h0RG91YmxlQnJhY2tldFwiOlwi4p+nXCIsXCJSaWdodERvd25UZWVWZWN0b3JcIjpcIuKlnVwiLFwiUmlnaHREb3duVmVjdG9yQmFyXCI6XCLipZVcIixcIlJpZ2h0RG93blZlY3RvclwiOlwi4oeCXCIsXCJSaWdodEZsb29yXCI6XCLijItcIixcInJpZ2h0aGFycG9vbmRvd25cIjpcIuKHgVwiLFwicmlnaHRoYXJwb29udXBcIjpcIuKHgFwiLFwicmlnaHRsZWZ0YXJyb3dzXCI6XCLih4RcIixcInJpZ2h0bGVmdGhhcnBvb25zXCI6XCLih4xcIixcInJpZ2h0cmlnaHRhcnJvd3NcIjpcIuKHiVwiLFwicmlnaHRzcXVpZ2Fycm93XCI6XCLihp1cIixcIlJpZ2h0VGVlQXJyb3dcIjpcIuKGplwiLFwiUmlnaHRUZWVcIjpcIuKKolwiLFwiUmlnaHRUZWVWZWN0b3JcIjpcIuKlm1wiLFwicmlnaHR0aHJlZXRpbWVzXCI6XCLii4xcIixcIlJpZ2h0VHJpYW5nbGVCYXJcIjpcIuKnkFwiLFwiUmlnaHRUcmlhbmdsZVwiOlwi4oqzXCIsXCJSaWdodFRyaWFuZ2xlRXF1YWxcIjpcIuKKtVwiLFwiUmlnaHRVcERvd25WZWN0b3JcIjpcIuKlj1wiLFwiUmlnaHRVcFRlZVZlY3RvclwiOlwi4qWcXCIsXCJSaWdodFVwVmVjdG9yQmFyXCI6XCLipZRcIixcIlJpZ2h0VXBWZWN0b3JcIjpcIuKGvlwiLFwiUmlnaHRWZWN0b3JCYXJcIjpcIuKlk1wiLFwiUmlnaHRWZWN0b3JcIjpcIuKHgFwiLFwicmluZ1wiOlwiy5pcIixcInJpc2luZ2RvdHNlcVwiOlwi4omTXCIsXCJybGFyclwiOlwi4oeEXCIsXCJybGhhclwiOlwi4oeMXCIsXCJybG1cIjpcIuKAj1wiLFwicm1vdXN0YWNoZVwiOlwi4o6xXCIsXCJybW91c3RcIjpcIuKOsVwiLFwicm5taWRcIjpcIuKrrlwiLFwicm9hbmdcIjpcIuKfrVwiLFwicm9hcnJcIjpcIuKHvlwiLFwicm9icmtcIjpcIuKfp1wiLFwicm9wYXJcIjpcIuKmhlwiLFwicm9wZlwiOlwi8J2Vo1wiLFwiUm9wZlwiOlwi4oSdXCIsXCJyb3BsdXNcIjpcIuKorlwiLFwicm90aW1lc1wiOlwi4qi1XCIsXCJSb3VuZEltcGxpZXNcIjpcIuKlsFwiLFwicnBhclwiOlwiKVwiLFwicnBhcmd0XCI6XCLippRcIixcInJwcG9saW50XCI6XCLiqJJcIixcInJyYXJyXCI6XCLih4lcIixcIlJyaWdodGFycm93XCI6XCLih5tcIixcInJzYXF1b1wiOlwi4oC6XCIsXCJyc2NyXCI6XCLwnZOHXCIsXCJSc2NyXCI6XCLihJtcIixcInJzaFwiOlwi4oaxXCIsXCJSc2hcIjpcIuKGsVwiLFwicnNxYlwiOlwiXVwiLFwicnNxdW9cIjpcIuKAmVwiLFwicnNxdW9yXCI6XCLigJlcIixcInJ0aHJlZVwiOlwi4ouMXCIsXCJydGltZXNcIjpcIuKLilwiLFwicnRyaVwiOlwi4pa5XCIsXCJydHJpZVwiOlwi4oq1XCIsXCJydHJpZlwiOlwi4pa4XCIsXCJydHJpbHRyaVwiOlwi4qeOXCIsXCJSdWxlRGVsYXllZFwiOlwi4qe0XCIsXCJydWx1aGFyXCI6XCLipahcIixcInJ4XCI6XCLihJ5cIixcIlNhY3V0ZVwiOlwixZpcIixcInNhY3V0ZVwiOlwixZtcIixcInNicXVvXCI6XCLigJpcIixcInNjYXBcIjpcIuKquFwiLFwiU2Nhcm9uXCI6XCLFoFwiLFwic2Nhcm9uXCI6XCLFoVwiLFwiU2NcIjpcIuKqvFwiLFwic2NcIjpcIuKJu1wiLFwic2NjdWVcIjpcIuKJvVwiLFwic2NlXCI6XCLiqrBcIixcInNjRVwiOlwi4qq0XCIsXCJTY2VkaWxcIjpcIsWeXCIsXCJzY2VkaWxcIjpcIsWfXCIsXCJTY2lyY1wiOlwixZxcIixcInNjaXJjXCI6XCLFnVwiLFwic2NuYXBcIjpcIuKqulwiLFwic2NuRVwiOlwi4qq2XCIsXCJzY25zaW1cIjpcIuKLqVwiLFwic2Nwb2xpbnRcIjpcIuKok1wiLFwic2NzaW1cIjpcIuKJv1wiLFwiU2N5XCI6XCLQoVwiLFwic2N5XCI6XCLRgVwiLFwic2RvdGJcIjpcIuKKoVwiLFwic2RvdFwiOlwi4ouFXCIsXCJzZG90ZVwiOlwi4qmmXCIsXCJzZWFyaGtcIjpcIuKkpVwiLFwic2VhcnJcIjpcIuKGmFwiLFwic2VBcnJcIjpcIuKHmFwiLFwic2VhcnJvd1wiOlwi4oaYXCIsXCJzZWN0XCI6XCLCp1wiLFwic2VtaVwiOlwiO1wiLFwic2Vzd2FyXCI6XCLipKlcIixcInNldG1pbnVzXCI6XCLiiJZcIixcInNldG1uXCI6XCLiiJZcIixcInNleHRcIjpcIuKctlwiLFwiU2ZyXCI6XCLwnZSWXCIsXCJzZnJcIjpcIvCdlLBcIixcInNmcm93blwiOlwi4oyiXCIsXCJzaGFycFwiOlwi4pmvXCIsXCJTSENIY3lcIjpcItCpXCIsXCJzaGNoY3lcIjpcItGJXCIsXCJTSGN5XCI6XCLQqFwiLFwic2hjeVwiOlwi0YhcIixcIlNob3J0RG93bkFycm93XCI6XCLihpNcIixcIlNob3J0TGVmdEFycm93XCI6XCLihpBcIixcInNob3J0bWlkXCI6XCLiiKNcIixcInNob3J0cGFyYWxsZWxcIjpcIuKIpVwiLFwiU2hvcnRSaWdodEFycm93XCI6XCLihpJcIixcIlNob3J0VXBBcnJvd1wiOlwi4oaRXCIsXCJzaHlcIjpcIsKtXCIsXCJTaWdtYVwiOlwizqNcIixcInNpZ21hXCI6XCLPg1wiLFwic2lnbWFmXCI6XCLPglwiLFwic2lnbWF2XCI6XCLPglwiLFwic2ltXCI6XCLiiLxcIixcInNpbWRvdFwiOlwi4qmqXCIsXCJzaW1lXCI6XCLiiYNcIixcInNpbWVxXCI6XCLiiYNcIixcInNpbWdcIjpcIuKqnlwiLFwic2ltZ0VcIjpcIuKqoFwiLFwic2ltbFwiOlwi4qqdXCIsXCJzaW1sRVwiOlwi4qqfXCIsXCJzaW1uZVwiOlwi4omGXCIsXCJzaW1wbHVzXCI6XCLiqKRcIixcInNpbXJhcnJcIjpcIuKlslwiLFwic2xhcnJcIjpcIuKGkFwiLFwiU21hbGxDaXJjbGVcIjpcIuKImFwiLFwic21hbGxzZXRtaW51c1wiOlwi4oiWXCIsXCJzbWFzaHBcIjpcIuKos1wiLFwic21lcGFyc2xcIjpcIuKnpFwiLFwic21pZFwiOlwi4oijXCIsXCJzbWlsZVwiOlwi4oyjXCIsXCJzbXRcIjpcIuKqqlwiLFwic210ZVwiOlwi4qqsXCIsXCJzbXRlc1wiOlwi4qqs77iAXCIsXCJTT0ZUY3lcIjpcItCsXCIsXCJzb2Z0Y3lcIjpcItGMXCIsXCJzb2xiYXJcIjpcIuKMv1wiLFwic29sYlwiOlwi4qeEXCIsXCJzb2xcIjpcIi9cIixcIlNvcGZcIjpcIvCdlYpcIixcInNvcGZcIjpcIvCdlaRcIixcInNwYWRlc1wiOlwi4pmgXCIsXCJzcGFkZXN1aXRcIjpcIuKZoFwiLFwic3BhclwiOlwi4oilXCIsXCJzcWNhcFwiOlwi4oqTXCIsXCJzcWNhcHNcIjpcIuKKk++4gFwiLFwic3FjdXBcIjpcIuKKlFwiLFwic3FjdXBzXCI6XCLiipTvuIBcIixcIlNxcnRcIjpcIuKImlwiLFwic3FzdWJcIjpcIuKKj1wiLFwic3FzdWJlXCI6XCLiipFcIixcInNxc3Vic2V0XCI6XCLiio9cIixcInNxc3Vic2V0ZXFcIjpcIuKKkVwiLFwic3FzdXBcIjpcIuKKkFwiLFwic3FzdXBlXCI6XCLiipJcIixcInNxc3Vwc2V0XCI6XCLiipBcIixcInNxc3Vwc2V0ZXFcIjpcIuKKklwiLFwic3F1YXJlXCI6XCLilqFcIixcIlNxdWFyZVwiOlwi4pahXCIsXCJTcXVhcmVJbnRlcnNlY3Rpb25cIjpcIuKKk1wiLFwiU3F1YXJlU3Vic2V0XCI6XCLiio9cIixcIlNxdWFyZVN1YnNldEVxdWFsXCI6XCLiipFcIixcIlNxdWFyZVN1cGVyc2V0XCI6XCLiipBcIixcIlNxdWFyZVN1cGVyc2V0RXF1YWxcIjpcIuKKklwiLFwiU3F1YXJlVW5pb25cIjpcIuKKlFwiLFwic3F1YXJmXCI6XCLilqpcIixcInNxdVwiOlwi4pahXCIsXCJzcXVmXCI6XCLilqpcIixcInNyYXJyXCI6XCLihpJcIixcIlNzY3JcIjpcIvCdkq5cIixcInNzY3JcIjpcIvCdk4hcIixcInNzZXRtblwiOlwi4oiWXCIsXCJzc21pbGVcIjpcIuKMo1wiLFwic3N0YXJmXCI6XCLii4ZcIixcIlN0YXJcIjpcIuKLhlwiLFwic3RhclwiOlwi4piGXCIsXCJzdGFyZlwiOlwi4piFXCIsXCJzdHJhaWdodGVwc2lsb25cIjpcIs+1XCIsXCJzdHJhaWdodHBoaVwiOlwiz5VcIixcInN0cm5zXCI6XCLCr1wiLFwic3ViXCI6XCLiioJcIixcIlN1YlwiOlwi4ouQXCIsXCJzdWJkb3RcIjpcIuKqvVwiLFwic3ViRVwiOlwi4quFXCIsXCJzdWJlXCI6XCLiioZcIixcInN1YmVkb3RcIjpcIuKrg1wiLFwic3VibXVsdFwiOlwi4quBXCIsXCJzdWJuRVwiOlwi4quLXCIsXCJzdWJuZVwiOlwi4oqKXCIsXCJzdWJwbHVzXCI6XCLiqr9cIixcInN1YnJhcnJcIjpcIuKluVwiLFwic3Vic2V0XCI6XCLiioJcIixcIlN1YnNldFwiOlwi4ouQXCIsXCJzdWJzZXRlcVwiOlwi4oqGXCIsXCJzdWJzZXRlcXFcIjpcIuKrhVwiLFwiU3Vic2V0RXF1YWxcIjpcIuKKhlwiLFwic3Vic2V0bmVxXCI6XCLiiopcIixcInN1YnNldG5lcXFcIjpcIuKri1wiLFwic3Vic2ltXCI6XCLiq4dcIixcInN1YnN1YlwiOlwi4quVXCIsXCJzdWJzdXBcIjpcIuKrk1wiLFwic3VjY2FwcHJveFwiOlwi4qq4XCIsXCJzdWNjXCI6XCLiibtcIixcInN1Y2NjdXJseWVxXCI6XCLiib1cIixcIlN1Y2NlZWRzXCI6XCLiibtcIixcIlN1Y2NlZWRzRXF1YWxcIjpcIuKqsFwiLFwiU3VjY2VlZHNTbGFudEVxdWFsXCI6XCLiib1cIixcIlN1Y2NlZWRzVGlsZGVcIjpcIuKJv1wiLFwic3VjY2VxXCI6XCLiqrBcIixcInN1Y2NuYXBwcm94XCI6XCLiqrpcIixcInN1Y2NuZXFxXCI6XCLiqrZcIixcInN1Y2Nuc2ltXCI6XCLii6lcIixcInN1Y2NzaW1cIjpcIuKJv1wiLFwiU3VjaFRoYXRcIjpcIuKIi1wiLFwic3VtXCI6XCLiiJFcIixcIlN1bVwiOlwi4oiRXCIsXCJzdW5nXCI6XCLimapcIixcInN1cDFcIjpcIsK5XCIsXCJzdXAyXCI6XCLCslwiLFwic3VwM1wiOlwiwrNcIixcInN1cFwiOlwi4oqDXCIsXCJTdXBcIjpcIuKLkVwiLFwic3VwZG90XCI6XCLiqr5cIixcInN1cGRzdWJcIjpcIuKrmFwiLFwic3VwRVwiOlwi4quGXCIsXCJzdXBlXCI6XCLiiodcIixcInN1cGVkb3RcIjpcIuKrhFwiLFwiU3VwZXJzZXRcIjpcIuKKg1wiLFwiU3VwZXJzZXRFcXVhbFwiOlwi4oqHXCIsXCJzdXBoc29sXCI6XCLin4lcIixcInN1cGhzdWJcIjpcIuKrl1wiLFwic3VwbGFyclwiOlwi4qW7XCIsXCJzdXBtdWx0XCI6XCLiq4JcIixcInN1cG5FXCI6XCLiq4xcIixcInN1cG5lXCI6XCLiiotcIixcInN1cHBsdXNcIjpcIuKrgFwiLFwic3Vwc2V0XCI6XCLiioNcIixcIlN1cHNldFwiOlwi4ouRXCIsXCJzdXBzZXRlcVwiOlwi4oqHXCIsXCJzdXBzZXRlcXFcIjpcIuKrhlwiLFwic3Vwc2V0bmVxXCI6XCLiiotcIixcInN1cHNldG5lcXFcIjpcIuKrjFwiLFwic3Vwc2ltXCI6XCLiq4hcIixcInN1cHN1YlwiOlwi4quUXCIsXCJzdXBzdXBcIjpcIuKrllwiLFwic3dhcmhrXCI6XCLipKZcIixcInN3YXJyXCI6XCLihplcIixcInN3QXJyXCI6XCLih5lcIixcInN3YXJyb3dcIjpcIuKGmVwiLFwic3dud2FyXCI6XCLipKpcIixcInN6bGlnXCI6XCLDn1wiLFwiVGFiXCI6XCJcXHRcIixcInRhcmdldFwiOlwi4oyWXCIsXCJUYXVcIjpcIs6kXCIsXCJ0YXVcIjpcIs+EXCIsXCJ0YnJrXCI6XCLijrRcIixcIlRjYXJvblwiOlwixaRcIixcInRjYXJvblwiOlwixaVcIixcIlRjZWRpbFwiOlwixaJcIixcInRjZWRpbFwiOlwixaNcIixcIlRjeVwiOlwi0KJcIixcInRjeVwiOlwi0YJcIixcInRkb3RcIjpcIuKDm1wiLFwidGVscmVjXCI6XCLijJVcIixcIlRmclwiOlwi8J2Ul1wiLFwidGZyXCI6XCLwnZSxXCIsXCJ0aGVyZTRcIjpcIuKItFwiLFwidGhlcmVmb3JlXCI6XCLiiLRcIixcIlRoZXJlZm9yZVwiOlwi4oi0XCIsXCJUaGV0YVwiOlwizphcIixcInRoZXRhXCI6XCLOuFwiLFwidGhldGFzeW1cIjpcIs+RXCIsXCJ0aGV0YXZcIjpcIs+RXCIsXCJ0aGlja2FwcHJveFwiOlwi4omIXCIsXCJ0aGlja3NpbVwiOlwi4oi8XCIsXCJUaGlja1NwYWNlXCI6XCLigZ/igIpcIixcIlRoaW5TcGFjZVwiOlwi4oCJXCIsXCJ0aGluc3BcIjpcIuKAiVwiLFwidGhrYXBcIjpcIuKJiFwiLFwidGhrc2ltXCI6XCLiiLxcIixcIlRIT1JOXCI6XCLDnlwiLFwidGhvcm5cIjpcIsO+XCIsXCJ0aWxkZVwiOlwiy5xcIixcIlRpbGRlXCI6XCLiiLxcIixcIlRpbGRlRXF1YWxcIjpcIuKJg1wiLFwiVGlsZGVGdWxsRXF1YWxcIjpcIuKJhVwiLFwiVGlsZGVUaWxkZVwiOlwi4omIXCIsXCJ0aW1lc2JhclwiOlwi4qixXCIsXCJ0aW1lc2JcIjpcIuKKoFwiLFwidGltZXNcIjpcIsOXXCIsXCJ0aW1lc2RcIjpcIuKosFwiLFwidGludFwiOlwi4oitXCIsXCJ0b2VhXCI6XCLipKhcIixcInRvcGJvdFwiOlwi4oy2XCIsXCJ0b3BjaXJcIjpcIuKrsVwiLFwidG9wXCI6XCLiiqRcIixcIlRvcGZcIjpcIvCdlYtcIixcInRvcGZcIjpcIvCdlaVcIixcInRvcGZvcmtcIjpcIuKrmlwiLFwidG9zYVwiOlwi4qSpXCIsXCJ0cHJpbWVcIjpcIuKAtFwiLFwidHJhZGVcIjpcIuKEolwiLFwiVFJBREVcIjpcIuKEolwiLFwidHJpYW5nbGVcIjpcIuKWtVwiLFwidHJpYW5nbGVkb3duXCI6XCLilr9cIixcInRyaWFuZ2xlbGVmdFwiOlwi4peDXCIsXCJ0cmlhbmdsZWxlZnRlcVwiOlwi4oq0XCIsXCJ0cmlhbmdsZXFcIjpcIuKJnFwiLFwidHJpYW5nbGVyaWdodFwiOlwi4pa5XCIsXCJ0cmlhbmdsZXJpZ2h0ZXFcIjpcIuKKtVwiLFwidHJpZG90XCI6XCLil6xcIixcInRyaWVcIjpcIuKJnFwiLFwidHJpbWludXNcIjpcIuKoulwiLFwiVHJpcGxlRG90XCI6XCLig5tcIixcInRyaXBsdXNcIjpcIuKouVwiLFwidHJpc2JcIjpcIuKnjVwiLFwidHJpdGltZVwiOlwi4qi7XCIsXCJ0cnBleml1bVwiOlwi4o+iXCIsXCJUc2NyXCI6XCLwnZKvXCIsXCJ0c2NyXCI6XCLwnZOJXCIsXCJUU2N5XCI6XCLQplwiLFwidHNjeVwiOlwi0YZcIixcIlRTSGN5XCI6XCLQi1wiLFwidHNoY3lcIjpcItGbXCIsXCJUc3Ryb2tcIjpcIsWmXCIsXCJ0c3Ryb2tcIjpcIsWnXCIsXCJ0d2l4dFwiOlwi4omsXCIsXCJ0d29oZWFkbGVmdGFycm93XCI6XCLihp5cIixcInR3b2hlYWRyaWdodGFycm93XCI6XCLihqBcIixcIlVhY3V0ZVwiOlwiw5pcIixcInVhY3V0ZVwiOlwiw7pcIixcInVhcnJcIjpcIuKGkVwiLFwiVWFyclwiOlwi4oafXCIsXCJ1QXJyXCI6XCLih5FcIixcIlVhcnJvY2lyXCI6XCLipYlcIixcIlVicmN5XCI6XCLQjlwiLFwidWJyY3lcIjpcItGeXCIsXCJVYnJldmVcIjpcIsWsXCIsXCJ1YnJldmVcIjpcIsWtXCIsXCJVY2lyY1wiOlwiw5tcIixcInVjaXJjXCI6XCLDu1wiLFwiVWN5XCI6XCLQo1wiLFwidWN5XCI6XCLRg1wiLFwidWRhcnJcIjpcIuKHhVwiLFwiVWRibGFjXCI6XCLFsFwiLFwidWRibGFjXCI6XCLFsVwiLFwidWRoYXJcIjpcIuKlrlwiLFwidWZpc2h0XCI6XCLipb5cIixcIlVmclwiOlwi8J2UmFwiLFwidWZyXCI6XCLwnZSyXCIsXCJVZ3JhdmVcIjpcIsOZXCIsXCJ1Z3JhdmVcIjpcIsO5XCIsXCJ1SGFyXCI6XCLipaNcIixcInVoYXJsXCI6XCLihr9cIixcInVoYXJyXCI6XCLihr5cIixcInVoYmxrXCI6XCLiloBcIixcInVsY29yblwiOlwi4oycXCIsXCJ1bGNvcm5lclwiOlwi4oycXCIsXCJ1bGNyb3BcIjpcIuKMj1wiLFwidWx0cmlcIjpcIuKXuFwiLFwiVW1hY3JcIjpcIsWqXCIsXCJ1bWFjclwiOlwixatcIixcInVtbFwiOlwiwqhcIixcIlVuZGVyQmFyXCI6XCJfXCIsXCJVbmRlckJyYWNlXCI6XCLij59cIixcIlVuZGVyQnJhY2tldFwiOlwi4o61XCIsXCJVbmRlclBhcmVudGhlc2lzXCI6XCLij51cIixcIlVuaW9uXCI6XCLii4NcIixcIlVuaW9uUGx1c1wiOlwi4oqOXCIsXCJVb2dvblwiOlwixbJcIixcInVvZ29uXCI6XCLFs1wiLFwiVW9wZlwiOlwi8J2VjFwiLFwidW9wZlwiOlwi8J2VplwiLFwiVXBBcnJvd0JhclwiOlwi4qSSXCIsXCJ1cGFycm93XCI6XCLihpFcIixcIlVwQXJyb3dcIjpcIuKGkVwiLFwiVXBhcnJvd1wiOlwi4oeRXCIsXCJVcEFycm93RG93bkFycm93XCI6XCLih4VcIixcInVwZG93bmFycm93XCI6XCLihpVcIixcIlVwRG93bkFycm93XCI6XCLihpVcIixcIlVwZG93bmFycm93XCI6XCLih5VcIixcIlVwRXF1aWxpYnJpdW1cIjpcIuKlrlwiLFwidXBoYXJwb29ubGVmdFwiOlwi4oa/XCIsXCJ1cGhhcnBvb25yaWdodFwiOlwi4oa+XCIsXCJ1cGx1c1wiOlwi4oqOXCIsXCJVcHBlckxlZnRBcnJvd1wiOlwi4oaWXCIsXCJVcHBlclJpZ2h0QXJyb3dcIjpcIuKGl1wiLFwidXBzaVwiOlwiz4VcIixcIlVwc2lcIjpcIs+SXCIsXCJ1cHNpaFwiOlwiz5JcIixcIlVwc2lsb25cIjpcIs6lXCIsXCJ1cHNpbG9uXCI6XCLPhVwiLFwiVXBUZWVBcnJvd1wiOlwi4oalXCIsXCJVcFRlZVwiOlwi4oqlXCIsXCJ1cHVwYXJyb3dzXCI6XCLih4hcIixcInVyY29yblwiOlwi4oydXCIsXCJ1cmNvcm5lclwiOlwi4oydXCIsXCJ1cmNyb3BcIjpcIuKMjlwiLFwiVXJpbmdcIjpcIsWuXCIsXCJ1cmluZ1wiOlwixa9cIixcInVydHJpXCI6XCLil7lcIixcIlVzY3JcIjpcIvCdkrBcIixcInVzY3JcIjpcIvCdk4pcIixcInV0ZG90XCI6XCLii7BcIixcIlV0aWxkZVwiOlwixahcIixcInV0aWxkZVwiOlwixalcIixcInV0cmlcIjpcIuKWtVwiLFwidXRyaWZcIjpcIuKWtFwiLFwidXVhcnJcIjpcIuKHiFwiLFwiVXVtbFwiOlwiw5xcIixcInV1bWxcIjpcIsO8XCIsXCJ1d2FuZ2xlXCI6XCLipqdcIixcInZhbmdydFwiOlwi4qacXCIsXCJ2YXJlcHNpbG9uXCI6XCLPtVwiLFwidmFya2FwcGFcIjpcIs+wXCIsXCJ2YXJub3RoaW5nXCI6XCLiiIVcIixcInZhcnBoaVwiOlwiz5VcIixcInZhcnBpXCI6XCLPllwiLFwidmFycHJvcHRvXCI6XCLiiJ1cIixcInZhcnJcIjpcIuKGlVwiLFwidkFyclwiOlwi4oeVXCIsXCJ2YXJyaG9cIjpcIs+xXCIsXCJ2YXJzaWdtYVwiOlwiz4JcIixcInZhcnN1YnNldG5lcVwiOlwi4oqK77iAXCIsXCJ2YXJzdWJzZXRuZXFxXCI6XCLiq4vvuIBcIixcInZhcnN1cHNldG5lcVwiOlwi4oqL77iAXCIsXCJ2YXJzdXBzZXRuZXFxXCI6XCLiq4zvuIBcIixcInZhcnRoZXRhXCI6XCLPkVwiLFwidmFydHJpYW5nbGVsZWZ0XCI6XCLiirJcIixcInZhcnRyaWFuZ2xlcmlnaHRcIjpcIuKKs1wiLFwidkJhclwiOlwi4quoXCIsXCJWYmFyXCI6XCLiq6tcIixcInZCYXJ2XCI6XCLiq6lcIixcIlZjeVwiOlwi0JJcIixcInZjeVwiOlwi0LJcIixcInZkYXNoXCI6XCLiiqJcIixcInZEYXNoXCI6XCLiiqhcIixcIlZkYXNoXCI6XCLiiqlcIixcIlZEYXNoXCI6XCLiiqtcIixcIlZkYXNobFwiOlwi4qumXCIsXCJ2ZWViYXJcIjpcIuKKu1wiLFwidmVlXCI6XCLiiKhcIixcIlZlZVwiOlwi4ouBXCIsXCJ2ZWVlcVwiOlwi4omaXCIsXCJ2ZWxsaXBcIjpcIuKLrlwiLFwidmVyYmFyXCI6XCJ8XCIsXCJWZXJiYXJcIjpcIuKAllwiLFwidmVydFwiOlwifFwiLFwiVmVydFwiOlwi4oCWXCIsXCJWZXJ0aWNhbEJhclwiOlwi4oijXCIsXCJWZXJ0aWNhbExpbmVcIjpcInxcIixcIlZlcnRpY2FsU2VwYXJhdG9yXCI6XCLinZhcIixcIlZlcnRpY2FsVGlsZGVcIjpcIuKJgFwiLFwiVmVyeVRoaW5TcGFjZVwiOlwi4oCKXCIsXCJWZnJcIjpcIvCdlJlcIixcInZmclwiOlwi8J2Us1wiLFwidmx0cmlcIjpcIuKKslwiLFwidm5zdWJcIjpcIuKKguKDklwiLFwidm5zdXBcIjpcIuKKg+KDklwiLFwiVm9wZlwiOlwi8J2VjVwiLFwidm9wZlwiOlwi8J2Vp1wiLFwidnByb3BcIjpcIuKInVwiLFwidnJ0cmlcIjpcIuKKs1wiLFwiVnNjclwiOlwi8J2SsVwiLFwidnNjclwiOlwi8J2Ti1wiLFwidnN1Ym5FXCI6XCLiq4vvuIBcIixcInZzdWJuZVwiOlwi4oqK77iAXCIsXCJ2c3VwbkVcIjpcIuKrjO+4gFwiLFwidnN1cG5lXCI6XCLiiovvuIBcIixcIlZ2ZGFzaFwiOlwi4oqqXCIsXCJ2emlnemFnXCI6XCLipppcIixcIldjaXJjXCI6XCLFtFwiLFwid2NpcmNcIjpcIsW1XCIsXCJ3ZWRiYXJcIjpcIuKpn1wiLFwid2VkZ2VcIjpcIuKIp1wiLFwiV2VkZ2VcIjpcIuKLgFwiLFwid2VkZ2VxXCI6XCLiiZlcIixcIndlaWVycFwiOlwi4oSYXCIsXCJXZnJcIjpcIvCdlJpcIixcIndmclwiOlwi8J2UtFwiLFwiV29wZlwiOlwi8J2VjlwiLFwid29wZlwiOlwi8J2VqFwiLFwid3BcIjpcIuKEmFwiLFwid3JcIjpcIuKJgFwiLFwid3JlYXRoXCI6XCLiiYBcIixcIldzY3JcIjpcIvCdkrJcIixcIndzY3JcIjpcIvCdk4xcIixcInhjYXBcIjpcIuKLglwiLFwieGNpcmNcIjpcIuKXr1wiLFwieGN1cFwiOlwi4ouDXCIsXCJ4ZHRyaVwiOlwi4pa9XCIsXCJYZnJcIjpcIvCdlJtcIixcInhmclwiOlwi8J2UtVwiLFwieGhhcnJcIjpcIuKft1wiLFwieGhBcnJcIjpcIuKfulwiLFwiWGlcIjpcIs6eXCIsXCJ4aVwiOlwizr5cIixcInhsYXJyXCI6XCLin7VcIixcInhsQXJyXCI6XCLin7hcIixcInhtYXBcIjpcIuKfvFwiLFwieG5pc1wiOlwi4ou7XCIsXCJ4b2RvdFwiOlwi4qiAXCIsXCJYb3BmXCI6XCLwnZWPXCIsXCJ4b3BmXCI6XCLwnZWpXCIsXCJ4b3BsdXNcIjpcIuKogVwiLFwieG90aW1lXCI6XCLiqIJcIixcInhyYXJyXCI6XCLin7ZcIixcInhyQXJyXCI6XCLin7lcIixcIlhzY3JcIjpcIvCdkrNcIixcInhzY3JcIjpcIvCdk41cIixcInhzcWN1cFwiOlwi4qiGXCIsXCJ4dXBsdXNcIjpcIuKohFwiLFwieHV0cmlcIjpcIuKWs1wiLFwieHZlZVwiOlwi4ouBXCIsXCJ4d2VkZ2VcIjpcIuKLgFwiLFwiWWFjdXRlXCI6XCLDnVwiLFwieWFjdXRlXCI6XCLDvVwiLFwiWUFjeVwiOlwi0K9cIixcInlhY3lcIjpcItGPXCIsXCJZY2lyY1wiOlwixbZcIixcInljaXJjXCI6XCLFt1wiLFwiWWN5XCI6XCLQq1wiLFwieWN5XCI6XCLRi1wiLFwieWVuXCI6XCLCpVwiLFwiWWZyXCI6XCLwnZScXCIsXCJ5ZnJcIjpcIvCdlLZcIixcIllJY3lcIjpcItCHXCIsXCJ5aWN5XCI6XCLRl1wiLFwiWW9wZlwiOlwi8J2VkFwiLFwieW9wZlwiOlwi8J2VqlwiLFwiWXNjclwiOlwi8J2StFwiLFwieXNjclwiOlwi8J2TjlwiLFwiWVVjeVwiOlwi0K5cIixcInl1Y3lcIjpcItGOXCIsXCJ5dW1sXCI6XCLDv1wiLFwiWXVtbFwiOlwixbhcIixcIlphY3V0ZVwiOlwixblcIixcInphY3V0ZVwiOlwixbpcIixcIlpjYXJvblwiOlwixb1cIixcInpjYXJvblwiOlwixb5cIixcIlpjeVwiOlwi0JdcIixcInpjeVwiOlwi0LdcIixcIlpkb3RcIjpcIsW7XCIsXCJ6ZG90XCI6XCLFvFwiLFwiemVldHJmXCI6XCLihKhcIixcIlplcm9XaWR0aFNwYWNlXCI6XCLigItcIixcIlpldGFcIjpcIs6WXCIsXCJ6ZXRhXCI6XCLOtlwiLFwiemZyXCI6XCLwnZS3XCIsXCJaZnJcIjpcIuKEqFwiLFwiWkhjeVwiOlwi0JZcIixcInpoY3lcIjpcItC2XCIsXCJ6aWdyYXJyXCI6XCLih51cIixcInpvcGZcIjpcIvCdlatcIixcIlpvcGZcIjpcIuKEpFwiLFwiWnNjclwiOlwi8J2StVwiLFwienNjclwiOlwi8J2Tj1wiLFwiendqXCI6XCLigI1cIixcInp3bmpcIjpcIuKAjFwifVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZW50aXRpZXMuanNvblxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gUmVuZGVyZXIoKSB7fVxuXG4vKipcbiAqICBXYWxrcyB0aGUgQVNUIGFuZCBjYWxscyBtZW1iZXIgbWV0aG9kcyBmb3IgZWFjaCBOb2RlIHR5cGUuXG4gKlxuICogIEBwYXJhbSBhc3Qge05vZGV9IFRoZSByb290IG9mIHRoZSBhYnN0cmFjdCBzeW50YXggdHJlZS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyKGFzdCkge1xuICB2YXIgd2Fsa2VyID0gYXN0LndhbGtlcigpXG4gICAgLCBldmVudFxuICAgICwgdHlwZTtcblxuICB0aGlzLmJ1ZmZlciA9ICcnO1xuICB0aGlzLmxhc3RPdXQgPSAnXFxuJztcblxuICB3aGlsZSgoZXZlbnQgPSB3YWxrZXIubmV4dCgpKSkge1xuICAgIHR5cGUgPSBldmVudC5ub2RlLnR5cGU7XG4gICAgaWYgKHRoaXNbdHlwZV0pIHtcbiAgICAgIHRoaXNbdHlwZV0oZXZlbnQubm9kZSwgZXZlbnQuZW50ZXJpbmcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcy5idWZmZXI7XG59XG5cbi8qKlxuICogIENvbmNhdGVuYXRlIGEgbGl0ZXJhbCBzdHJpbmcgdG8gdGhlIGJ1ZmZlci5cbiAqXG4gKiAgQHBhcmFtIHN0ciB7U3RyaW5nfSBUaGUgc3RyaW5nIHRvIGNvbmNhdGVuYXRlLlxuICovXG5mdW5jdGlvbiBsaXQoc3RyKSB7XG4gIHRoaXMuYnVmZmVyICs9IHN0cjtcbiAgdGhpcy5sYXN0T3V0ID0gc3RyO1xufVxuXG4vKipcbiAqICBPdXRwdXQgYSBuZXdsaW5lIHRvIHRoZSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNyKCkge1xuICBpZiAodGhpcy5sYXN0T3V0ICE9PSAnXFxuJykge1xuICAgIHRoaXMubGl0KCdcXG4nKTtcbiAgfVxufVxuXG4vKipcbiAqICBDb25jYXRlbmF0ZSBhIHN0cmluZyB0byB0aGUgYnVmZmVyIHBvc3NpYmx5IGVzY2FwaW5nIHRoZSBjb250ZW50LlxuICpcbiAqICBDb25jcmV0ZSByZW5kZXJlciBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kLlxuICpcbiAqICBAcGFyYW0gc3RyIHtTdHJpbmd9IFRoZSBzdHJpbmcgdG8gY29uY2F0ZW5hdGUuXG4gKi9cbmZ1bmN0aW9uIG91dChzdHIpIHtcbiAgdGhpcy5saXQoc3RyKTtcbn1cblxuLyoqXG4gKiAgRXNjYXBlIGEgc3RyaW5nIGZvciB0aGUgdGFyZ2V0IHJlbmRlcmVyLlxuICpcbiAqICBBYnN0cmFjdCBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBjb25jcmV0ZSBcbiAqICByZW5kZXJlciBpbXBsZW1lbnRhdGlvbnMuXG4gKlxuICogIEBwYXJhbSBzdHIge1N0cmluZ30gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKi9cbmZ1bmN0aW9uIGVzYyhzdHIpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlciA9IHJlbmRlcjtcblJlbmRlcmVyLnByb3RvdHlwZS5vdXQgPSBvdXQ7XG5SZW5kZXJlci5wcm90b3R5cGUubGl0ID0gbGl0O1xuUmVuZGVyZXIucHJvdG90eXBlLmNyICA9IGNyO1xuUmVuZGVyZXIucHJvdG90eXBlLmVzYyAgPSBlc2M7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9yZW5kZXIvcmVuZGVyZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGFtbCA9IHJlcXVpcmUoJy4vbGFtbC5qcycpO1xuY29uc3Qge3RleDJqYXh9ID0gcmVxdWlyZSgnLi90ZXgyamF4LmpzJyk7XG5jb25zdCBjb21tb25tYXJrID0gcmVxdWlyZSgnY29tbW9ubWFyaycpO1xuXG5jb25zdCB3b3JrZXIgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIHdpbmRvdy50ZXgyamF4ID0gdGV4MmpheDtcbiAgd2luZG93LnRleDJqYXguY29uZmlnLmRvYyA9IGRvY3VtZW50O1xuICB3aW5kb3cudGV4MmpheC5jb25maWcuaW5saW5lTWF0aC5wdXNoKFsnJCcsICckJ10pO1xuICB3aW5kb3cudGV4MmpheC5jb25maWcucHJvY2Vzc0VzY2FwZXMgPSB0cnVlO1xuICB3aW5kb3cudGV4MmpheC5QcmVQcm9jZXNzKCk7XG5cbiAgY29uc3QgcmVhZGVyID0gbmV3IGNvbW1vbm1hcmsuUGFyc2VyKCk7XG4gIGNvbnN0IHdyaXRlciA9IG5ldyBjb21tb25tYXJrLkh0bWxSZW5kZXJlcigpO1xuICBjb25zdCBwYXJzZWQgPSByZWFkZXIucGFyc2UoZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpO1xuICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IHdyaXRlci5yZW5kZXIocGFyc2VkKTtcblxuICBsYW1sKGRvY3VtZW50KTtcbn07XG5cbmlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnID8gcHJvY2VzcyA6IDApID09PSAnW29iamVjdCBwcm9jZXNzXScpe1xuICAgIG1vZHVsZS5leHBvcnRzLndvcmtlciA9IHdvcmtlcjtcbn1cbmVsc2Uge1xuICB3b3JrZXIod2luZG93KTtcbiAgd2luZG93Lk1hdGhKYXggPSB7XG4gICAgJ2Zhc3QtcHJldmlldyc6IHtcbiAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfVxuICB9O1xuICBjb25zdCBtaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBtai5zcmMgPVxuICAgICdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9tYXRoamF4LzIuNy4yL01hdGhKYXguanM/Y29uZmlnPVRlWC1BTVNfQ0hUTUwtZnVsbCc7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWopO1xuXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93b3JrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5jb25zdCBtZXRhZGF0YSA9IHJlcXVpcmUoJy4vbWV0YWRhdGEuanMnKTtcbmNvbnN0IHByZWFtYmxlID0gcmVxdWlyZSgnLi9wcmVhbWJsZS5qcycpO1xuY29uc3QgYWJzdHJhY3QgPSByZXF1aXJlKCcuL2Fic3RyYWN0LmpzJyk7XG5jb25zdCBzdGF0ZW1lbnRzID0gcmVxdWlyZSgnLi9zdGF0ZW1lbnRzLmpzJyk7XG5jb25zdCBmaWd1cmVzID0gcmVxdWlyZSgnLi9maWd1cmVzLmpzJyk7XG5jb25zdCBuYW1lcyA9IHJlcXVpcmUoJy4vbmFtZXMuanMnKTtcbmNvbnN0IGJsYW1lcyA9IHJlcXVpcmUoJy4vYmxhbWVzLmpzJyk7XG5jb25zdCByZWZzID0gcmVxdWlyZSgnLi9yZWZzLmpzJyk7XG5jb25zdCBjaXRlcyA9IHJlcXVpcmUoJy4vY2l0ZXMuanMnKTtcblxuY29uc3QgbGFtbCA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIG1ldGFkYXRhKGRvY3VtZW50KTtcbiAgcHJlYW1ibGUoZG9jdW1lbnQpO1xuICBhYnN0cmFjdChkb2N1bWVudCk7XG4gIHN0YXRlbWVudHMoZG9jdW1lbnQpO1xuICBmaWd1cmVzKGRvY3VtZW50LCBmYWxzZSk7XG4gIG5hbWVzKGRvY3VtZW50KTtcbiAgLy8gVE9ETyBzaG91bGQgZGVwZW5kIG9uIGNtLmNzcz9cbiAgYmxhbWVzKGRvY3VtZW50KTtcbiAgcmVmcyhkb2N1bWVudCk7XG4gIGNpdGVzKGRvY3VtZW50KTtcblxuXG4gIC8vIGhhbmRsZSAoZm9vdClub3Rlc1xuICBjb25zdCBub3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25vdGUnKTtcbiAgZm9yIChsZXQgW2luZGV4LCBub3RlXSBvZiBub3Rlcy5lbnRyaWVzKCkpIHtcbiAgICBjb25zdCBuZXdOb3RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCBub3RlLCAnc3BhbicpO1xuICAgIG5ld05vdGUuY2xhc3NMaXN0LmFkZCgnZm9vdG5vdGUnKTtcbiAgICBuZXdOb3RlLmlkID0gJ2ZuLScgKyBpbmRleDtcbiAgICBjb25zdCBmbmxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgZm5saW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyArIG5ld05vdGUuaWQpO1xuICAgIGZubGluay5pZCA9ICdmbmxpbmsnICsgaW5kZXg7XG4gICAgZm5saW5rLmlubmVySFRNTCA9ICc8c3VwPicgKyAoaW5kZXggKyAxKSArICc8L3N1cD4nO1xuICAgIG5ld05vdGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZm5saW5rLCBuZXdOb3RlKTtcbiAgICBjb25zdCBiYWNrbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBiYWNrbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyBmbmxpbmsuaWQpO1xuICAgIGJhY2tsaW5rLmlubmVySFRNTCA9ICc8c3VwPvCflJk8L3N1cD4nO1xuICAgIGJhY2tsaW5rLmNsYXNzTGlzdC5hZGQoJ2JhY2tsaW5rJyk7XG4gICAgbmV3Tm90ZS5hcHBlbmRDaGlsZChiYWNrbGluayk7XG4gICAgLy8gVE9ETyBub3QgYWN0dWFsbHkgZGlzYWJsaW5nIGNsaWNrc1xuICAgIGZubGluay5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuICAgIGJhY2tsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICBjb25zdCBidWlsZEJpYiA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG9sZEJpYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JpYmxpb2dyYXBoeScpO1xuICAgIGNvbnN0IGJpYiA9IHJlbmFtZVRhZyhkb2N1bWVudCwgb2xkQmliLCAnc2VjdGlvbicpO1xuICAgIGJpYi5jbGFzc0xpc3QuYWRkKCdiaWJsaW9ncmFwaHknKTtcbiAgICAvLyBjb25zdCBpbm5lciA9IGJpYi5pbm5lckhUTUw7XG4gICAgLy8gYmliLmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID0gJ0JpYmxpb2dyYXBoeSc7XG4gICAgYmliLmluc2VydEJlZm9yZShoZWFkaW5nLCBiaWIuZmlyc3RDaGlsZCk7XG4gICAgLy8gY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgLy8gYmliLmFwcGVuZENoaWxkKGxpc3QpO1xuICAgIC8vIGZvciAobGV0IHN0cmluZyBvZiBpbm5lci5zcGxpdCgnXFxuJykpe1xuICAgIC8vICAgICBpZiAoc3RyaW5nLnRyaW0oKSA9PT0gJycpIGNvbnRpbnVlXG4gICAgLy8gICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIC8vICAgICBpdGVtLmlubmVySFRNTCA9IHN0cmluZy5zdWJzdHJpbmcoMik7XG4gICAgLy8gICAgIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgLy8gfVxuICB9O1xuICBidWlsZEJpYigpO1xuXG4gIC8vIHdyYXAgcGhyYXNpbmcgY29udGVudCBpbiBwXG5cbiAgLy8gY29uc3QgUEhSQVNJTkdfVEFHTkFNRVMgPSBbJ2FiYnInLCAnYXVkaW8nLCAnYicsICdiZG8nLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjaXRlJywgJ2NvZGUnLCAnY29tbWFuZCcsICdkYXRhJywgJ2RhdGFsaXN0JywgJ2RmbicsICdlbScsICdlbWJlZCcsICdpJywgJ2lmcmFtZScsICdpbWcnLCAnaW5wdXQnLCAna2JkJywgJ2tleWdlbicsICdsYWJlbCcsICdtYXJrJywgJ21hdGgnLCAnbWV0ZXInLCAnbm9zY3JpcHQnLCAnb2JqZWN0JywgJ291dHB1dCcsICdwcm9ncmVzcycsICdxJywgJ3J1YnknLCAnc2FtcCcsICdzY3JpcHQnLCAnc2VsZWN0JywgJ3NtYWxsJywgJ3NwYW4nLCAnc3Ryb25nJywgJ3N1YicsICdzdXAnLCAnc3ZnJywgJ3RleHRhcmVhJywgJ3RpbWUnLCAndmFyJywgJ3ZpZGVvJywgJ3dicicsICdhJywgJ2RlbCcsICdpbnMnXVxuICAvLyBjb25zdCBjYW5kaWRhdGVzID0gW10vL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JvZHksIHNlY3Rpb24sIGZpZ3VyZScpO1xuICAvLyBmb3IgKGxldCBjYW5kaWRhdGUgb2YgY2FuZGlkYXRlcyl7XG4gIC8vICAgLy8gY29uc29sZS5sb2coY2FuZGlkYXRlKVxuICAvLyAgIGNvbnN0IGNoaWxkTm9kZXMgPSBjYW5kaWRhdGUuY2hpbGROb2RlcztcbiAgLy8gICBjb25zdCBhcnJheW9mYXJyYXlzID0gW1tdXTtcbiAgLy8gICBmb3IgKGxldCBjaGlsZE5vZGUgb2YgY2hpbGROb2Rlcyl7XG4gIC8vICAgICBjb25zdCBjdXJyZW50QmF0Y2ggPSBhcnJheW9mYXJyYXlzW2FycmF5b2ZhcnJheXMubGVuZ3RoIC0xXTtcbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGNoaWxkTm9kZSlcbiAgLy8gICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IDMpe1xuICAvLyAgICAgICBjb25zdCBsaW5lcyA9IGNoaWxkTm9kZS5kYXRhLnNwbGl0KCdcXG4nKTtcbiAgLy8gICAgICAgbGV0IHRlbXAgPSBjaGlsZE5vZGU7XG4gIC8vICAgICAgIGZvciAobGV0IFtpbmRleCwgbGluZV0gb2YgbGluZXMuZW50cmllcygpKXtcbiAgLy8gICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgLy8gICAgICAgICAgIGNoaWxkTm9kZS5kYXRhID0gbGluZTtcbiAgLy8gICAgICAgICAgIGN1cnJlbnRCYXRjaC5wdXNoKGNoaWxkTm9kZSk7XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICAgIGVsc2Uge1xuICAvLyAgICAgICAgICAgY29uc3QgbGluZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsaW5lKTtcbiAgLy8gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdCZWZvcmUnLCBjaGlsZE5vZGUubmV4dFNpYmxpbmcpXG4gIC8vICAgICAgICAgICBjaGlsZE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGluZUVsZW1lbnQsIHRlbXAubmV4dFNpYmxpbmcpO1xuICAvLyAgICAgICAgICAgdGVtcCA9IGxpbmVFbGVtZW50O1xuICAvLyAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0FmdGVyJywgY2hpbGROb2RlLm5leHRTaWJsaW5nKVxuICAvLyAgICAgICAgICAgYXJyYXlvZmFycmF5cy5wdXNoKFtsaW5lRWxlbWVudF0pO1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgICAgZWxzZSBpZiAoY2hpbGROb2RlLm5vZGVUeXBlID09PSA4IHx8IFBIUkFTSU5HX1RBR05BTUVTLmluZGV4T2YoY2hpbGROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAvLyAgICAgICBjdXJyZW50QmF0Y2gucHVzaChjaGlsZE5vZGUpO1xuICAvLyAgICAgfVxuICAvLyAgICAgZWxzZSBpZihjdXJyZW50QmF0Y2gubGVuZ3RoID4gMCkgIGFycmF5b2ZhcnJheXMucHVzaChbXSk7XG4gIC8vICAgfVxuICAvLyAgIGNvbnNvbGUubG9nKGFycmF5b2ZhcnJheXMpXG4gIC8vICAgZm9yIChsZXQgYXJyYXkgb2YgYXJyYXlvZmFycmF5cyl7XG4gIC8vICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAwKSBjb250aW51ZVxuICAvLyAgICAgY29uc3QgcGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgLy8gICAgIGNvbnN0IGZpcnN0ID0gYXJyYXlbMF07XG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhmaXJzdCk7XG4gIC8vICAgICBmaXJzdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChwYXJhLCBmaXJzdCk7XG4gIC8vICAgICBmb3IgKG5vZGUgb2YgYXJyYXkpIHBhcmEuYXBwZW5kQ2hpbGQobm9kZSk7XG4gIC8vICAgfVxuICAvLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxhbWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9sYW1sLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgLy8gaGFuZGxlIG1ldGFkYXRhXG4gIGNvbnN0IGFydGljbGVNZXRhID0gSlNPTi5wYXJzZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWV0YWRhdGEnKS50ZXh0KTtcbiAgY29uc3QgYXJ0aWNsZUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIGFydGljbGVJbmZvLmNsYXNzTGlzdC5hZGQoJ2FydGljbGVJbmZvJyk7XG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGFydGljbGVJbmZvLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xuICBjb25zdCBhcnRpY2xlVGl0bGUgPSBhcnRpY2xlTWV0YS50aXRsZTtcbiAgaWYgKGFydGljbGVUaXRsZSkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGl0bGUnKTtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBhcnRpY2xlVGl0bGU7XG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaGVhZGluZy5pbm5lckhUTUwgPSBhcnRpY2xlVGl0bGU7XG4gICAgYXJ0aWNsZUluZm8uYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gIH1cbiAgY29uc3QgYXJ0aWNsZUF1dGhvcnMgPSBhcnRpY2xlTWV0YS5hdXRob3JzIHx8IFtdO1xuICBmb3IgKGxldCBhdXRob3Igb2YgYXJ0aWNsZUF1dGhvcnMpIHtcbiAgICBjb25zdCBuYW1lID0gYXV0aG9yLm5hbWU7XG4gICAgY29uc3QgYWRkcmVzcyA9IGF1dGhvci5hZGRyZXNzO1xuICAgIGNvbnN0IGF1dGhvclAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgYXV0aG9yUC5jbGFzc0xpc3QuYWRkKCdhdXRob3InKTtcbiAgICBhdXRob3JQLmlubmVySFRNTCA9IG5hbWUgKyAnLCAnICsgYWRkcmVzcyArICcuJztcbiAgICBhcnRpY2xlSW5mby5hcHBlbmRDaGlsZChhdXRob3JQKTtcbiAgfVxuICBjb25zdCBrZXl3b3JkcyA9IGFydGljbGVNZXRhLmtleXdvcmRzO1xuICBjb25zdCBrdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAga3cuY2xhc3NMaXN0LmFkZCgna2V5d29yZHMnKTtcbiAga3cuaW5uZXJIVE1MID0gJ0tleXdvcmRzOiAnICsga2V5d29yZHMuam9pbignLCAnKSArICcuJztcbiAgYXJ0aWNsZUluZm8uYXBwZW5kQ2hpbGQoa3cpO1xuXG4gIGNvbnN0IGxpY2Vuc2luZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgbGljZW5zaW5nLmNsYXNzTGlzdC5hZGQoJ2xpY2Vuc2UnKTtcblxuICBsaWNlbnNpbmcuaW5uZXJIVE1MID1cbiAgICAnRGVyaXZlZCBmcm9tIDxhIGhyZWY9XCInICtcbiAgICBhcnRpY2xlTWV0YS5zb3VyY2UgK1xuICAgICdcIj4nICtcbiAgICBhcnRpY2xlTWV0YS5zb3VyY2UgK1xuICAgICc8L2E+LCAnICtcbiAgICBhcnRpY2xlTWV0YS5saWNlbnNlICtcbiAgICAnIGFuZCBsaWNlbnNlZCBhcyBzdWNoLic7XG4gIGFydGljbGVJbmZvLmFwcGVuZENoaWxkKGxpY2Vuc2luZyk7XG5cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tZXRhZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCl7XG4gIC8vIHByZWFtYmxlXG4gIHJlbmFtZVRhZyhkb2N1bWVudCwncHJlYW1ibGUnLCAnZGl2JywgJ2hpZGRlbicpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcHJlYW1ibGUuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpe1xuICAvLyBhYnN0cmFjdFxuICByZW5hbWVUYWcoZG9jdW1lbnQsICdhYnN0cmFjdCcsICdzZWN0aW9uJywgdHJ1ZSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hYnN0cmFjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KXtcbiAgLy8gY29udmVydCBzdGF0ZW1lbnRzIHRvIHNlY3Rpb25zXG4gIGNvbnN0IHN0YXRlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdwcm9vZiwgdGhlb3JlbSwgcHJvcG9zaXRpb24sIGxlbW1hLCBjb3JvbGxhcnknXG4gICk7XG4gIGxldCBzdGF0ZW1lbnRfY291bnRlciA9IDA7XG4gIGZvciAobGV0IHN0YXRlbWVudCBvZiBzdGF0ZW1lbnRzKSB7XG4gICAgY29uc3QgcmVuYW1lZE5vZGUgPSByZW5hbWVUYWcoZG9jdW1lbnQsIHN0YXRlbWVudCwgJ3NlY3Rpb24nLCB0cnVlKTtcbiAgICBjb25zdCB0YWduYW1lID0gc3RhdGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICByZW5hbWVkTm9kZS5jbGFzc0xpc3QuYWRkKHRhZ25hbWUpO1xuICAgIGNvbnN0IG5hbWUgPSByZW5hbWVkTm9kZS5xdWVyeVNlbGVjdG9yKCduYW1lJyk7XG4gICAgLy8gVE9ETyBtYXliZSBuYW1lIGhhbmRsaW5nIGlzIG1vcmUgbGlrZSBhIGhlbHBlciB0aGF0IHNob3VsZCBiZSByZXF1aXJlZCBhbmQgYXBwbGllZCBoZXJlP1xuICAgIGlmIChuYW1lKSBjb250aW51ZTtcbiAgICBzdGF0ZW1lbnRfY291bnRlcisrO1xuICAgIC8vIFRPRE8gbG9vayB1cCBjb3JyZWN0IGhlYWRpbmcgbGV2ZWxcbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ25hbWUnKTtcbiAgICBoZWFkaW5nLmlkID0gdGFnbmFtZS50b0xvd2VyQ2FzZSgpICsgJy0nICsgc3RhdGVtZW50X2NvdW50ZXI7XG4gICAgaGVhZGluZy5pbm5lckhUTUwgPVxuICAgICAgdGFnbmFtZVswXS50b1VwcGVyQ2FzZSgpICsgdGFnbmFtZS5zdWJzdHJpbmcoMSkgKyAnICcgKyBzdGF0ZW1lbnRfY291bnRlcjtcbiAgICByZW5hbWVkTm9kZS5pbnNlcnRCZWZvcmUoaGVhZGluZywgcmVuYW1lZE5vZGUuZmlyc3RDaGlsZCk7XG4gIH1cblxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3RhdGVtZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCwgYmVsb3dPckFib3ZlKSB7XG4gIC8vIGhhbmRsZSBmaWd1cmVzXG4gIGNvbnN0IGZpZ3VyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmaWd1cmUnKTtcbiAgZm9yIChsZXQgW2luZGV4LCBmaWd1cmVdIG9mIGZpZ3VyZXMuZW50cmllcygpKSB7XG4gICAgZmlndXJlLmNsYXNzTGlzdC5hZGQoJ2ZpZ3VyZScpO1xuICAgIGNvbnN0IG5hbWUgPSBmaWd1cmUucXVlcnlTZWxlY3RvcignbmFtZScpO1xuICAgIGlmIChuYW1lKSBjb250aW51ZTtcbiAgICAvLyBUT0RPIGxvb2sgdXAgY29ycmVjdCBoZWFkaW5nIGxldmVsXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCduYW1lJyk7XG4gICAgaGVhZGluZy5pbm5lckhUTUwgPSAnRmlndXJlICcgKyAoaW5kZXggKyAxKTtcbiAgICBpZiAoYmVsb3dPckFib3ZlKSBmaWd1cmUuaW5zZXJ0QmVmb3JlKGhlYWRpbmcsIGZpZ3VyZS5maXJzdENoaWxkKTtcbiAgICBlbHNlIGZpZ3VyZS5pbnNlcnRCZWZvcmUoaGVhZGluZywgZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLm5leHRTaWJsaW5nKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ZpZ3VyZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCkge1xuICAvLyBjb252ZXJ0IG5hbWVzIHRvIGhlYWRpbmdzXG4gIGNvbnN0IG5hbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbmFtZScpO1xuICBmb3IgKGxldCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgLy8gVE9ETyBsb29rIHVwIGNvcnJlY3QgaGVhZGluZyBsZXZlbFxuICAgIGNvbnN0IHJlbmFtZWROb2RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCBuYW1lLCAnaDInLCB0cnVlKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hbWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBNYXRoSmF4IENvbnNvcnRpdW1cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciB0ZXgyamF4ID0gZnVuY3Rpb24gKCkge307XG5cbnRleDJqYXgucHJvdG90eXBlLmNvbmZpZyA9IHtcbiAgICBkb2M6IHt9LFxuICAgIGlubGluZU1hdGg6IFsgLy8gVGhlIHN0YXJ0L3N0b3AgcGFpcnMgZm9yIGluLWxpbmUgbWF0aFxuICAgICAgICAvLyAgICBbJyQnLCckJ10sICAgICAgICAgICAgICAgLy8gIChjb21tZW50IG91dCBhbnkgeW91IGRvbid0IHdhbnQsIG9yIGFkZCB5b3VyIG93biwgYnV0XG4gICAgICAgIFsnXFxcXCgnLCAnXFxcXCknXSAvLyAgYmUgc3VyZSB0aGF0IHlvdSBkb24ndCBoYXZlIGFuIGV4dHJhIGNvbW1hIGF0IHRoZSBlbmQpXG4gICAgXSxcblxuICAgIGRpc3BsYXlNYXRoOiBbIC8vIFRoZSBzdGFydC9zdG9wIHBhaXJzIGZvciBkaXNwbGF5IG1hdGhcbiAgICAgICAgWyckJCcsICckJCddLCAvLyAgKGNvbW1lbnQgb3V0IGFueSB5b3UgZG9uJ3Qgd2FudCwgb3IgYWRkIHlvdXIgb3duLCBidXRcbiAgICAgICAgWydcXFxcWycsICdcXFxcXSddIC8vICBiZSBzdXJlIHRoYXQgeW91IGRvbid0IGhhdmUgYW4gZXh0cmEgY29tbWEgYXQgdGhlIGVuZClcbiAgICBdLFxuXG4gICAgYmFsYW5jZUJyYWNlczogdHJ1ZSwgLy8gZGV0ZXJtaW5lcyB3aGV0aGVyIHRleDJqYXggcmVxdWlyZXMgYnJhY2VzIHRvIGJlXG4gICAgLy8gYmFsYW5jZWQgd2l0aGluIG1hdGggZGVsaW1pdGVycyAoYWxsb3dzIGZvciBuZXN0ZWRcbiAgICAvLyBkb2xsYXIgc2lnbnMpLiAgU2V0IHRvIGZhbHNlIHRvIGdldCBwcmUtdjIuMCBjb21wYXRpYmlsaXR5LlxuXG4gICAgc2tpcFRhZ3M6IFtcInNjcmlwdFwiLCBcIm5vc2NyaXB0XCIsIFwic3R5bGVcIiwgXCJ0ZXh0YXJlYVwiLCBcInByZVwiLCBcImNvZGVcIiwgXCJhbm5vdGF0aW9uXCIsIFwiYW5ub3RhdGlvbi14bWxcIl0sXG4gICAgLy8gVGhlIG5hbWVzIG9mIHRoZSB0YWdzIHdob3NlIGNvbnRlbnRzIHdpbGwgbm90IGJlXG4gICAgLy8gc2Nhbm5lZCBmb3IgbWF0aCBkZWxpbWl0ZXJzXG5cbiAgICBpZ25vcmVDbGFzczogXCJ0ZXgyamF4X2lnbm9yZVwiLCAvLyB0aGUgY2xhc3MgbmFtZSBvZiBlbGVtZW50cyB3aG9zZSBjb250ZW50cyBzaG91bGRcbiAgICAvLyBOT1QgYmUgcHJvY2Vzc2VkIGJ5IHRleDJqYXguICBOb3RlIHRoYXQgdGhpc1xuICAgIC8vIGlzIGEgcmVndWxhciBleHByZXNzaW9uLCBzbyBiZSBzdXJlIHRvIHF1b3RlIGFueVxuICAgIC8vIHJlZ2V4cCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuICAgIHByb2Nlc3NDbGFzczogXCJ0ZXgyamF4X3Byb2Nlc3NcIiwgLy8gdGhlIGNsYXNzIG5hbWUgb2YgZWxlbWVudHMgd2hvc2UgY29udGVudHMgU0hPVUxEXG4gICAgLy8gYmUgcHJvY2Vzc2VkIHdoZW4gdGhleSBhcHBlYXIgaW5zaWRlIG9uZXMgdGhhdFxuICAgIC8vIGFyZSBpZ25vcmVkLiAgTm90ZSB0aGF0IHRoaXMgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24sXG4gICAgLy8gc28gYmUgc3VyZSB0byBxdW90ZSBhbnkgcmVnZXhwIHNwZWNpYWwgY2hhcmFjdGVyc1xuXG4gICAgcHJvY2Vzc0VzY2FwZXM6IGZhbHNlLCAvLyBzZXQgdG8gdHJ1ZSB0byBhbGxvdyBcXCQgdG8gcHJvZHVjZSBhIGRvbGxhciB3aXRob3V0XG4gICAgLy8gICBzdGFydGluZyBpbi1saW5lIG1hdGggbW9kZVxuXG4gICAgcHJvY2Vzc0Vudmlyb25tZW50czogdHJ1ZSwgLy8gc2V0IHRvIHRydWUgdG8gcHJvY2VzcyBcXGJlZ2lue3h4eH0uLi5cXGVuZHt4eHh9IG91dHNpZGVcbiAgICAvLyAgIG9mIG1hdGggbW9kZSwgZmFsc2UgdG8gcHJldmVudCB0aGF0XG5cbiAgICBwcm9jZXNzUmVmczogdHJ1ZSwgLy8gc2V0IHRvIHRydWUgdG8gcHJvY2VzcyBcXHJlZnsuLi59IG91dHNpZGUgb2YgbWF0aCBtb2RlXG5cbn07XG5cbnRleDJqYXgucHJvdG90eXBlLlByZVByb2Nlc3MgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgKGVsZW1lbnQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNvbmZpZy5kb2MuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudClcbiAgICB9XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNvbmZpZy5kb2MuYm9keVxuICAgIH1cbiAgICBpZiAodGhpcy5jcmVhdGVQYXR0ZXJucygpKSB7XG4gICAgICAgIHRoaXMuc2NhbkVsZW1lbnQoZWxlbWVudCwgZWxlbWVudC5uZXh0U2libGluZylcbiAgICB9XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5jcmVhdGVQYXR0ZXJucyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhcnRzID0gW10sXG4gICAgICAgIHBhcnRzID0gW10sXG4gICAgICAgIGksIG0sIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMubWF0Y2ggPSB7fTtcbiAgICBmb3IgKGkgPSAwLCBtID0gY29uZmlnLmlubGluZU1hdGgubGVuZ3RoOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgIHN0YXJ0cy5wdXNoKHRoaXMucGF0dGVyblF1b3RlKGNvbmZpZy5pbmxpbmVNYXRoW2ldWzBdKSk7XG4gICAgICAgIHRoaXMubWF0Y2hbY29uZmlnLmlubGluZU1hdGhbaV1bMF1dID0ge1xuICAgICAgICAgICAgbW9kZTogXCJ0ZXhcIixcbiAgICAgICAgICAgIGVuZDogY29uZmlnLmlubGluZU1hdGhbaV1bMV0sXG4gICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLmVuZFBhdHRlcm4oY29uZmlnLmlubGluZU1hdGhbaV1bMV0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIG0gPSBjb25maWcuZGlzcGxheU1hdGgubGVuZ3RoOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgIHN0YXJ0cy5wdXNoKHRoaXMucGF0dGVyblF1b3RlKGNvbmZpZy5kaXNwbGF5TWF0aFtpXVswXSkpO1xuICAgICAgICB0aGlzLm1hdGNoW2NvbmZpZy5kaXNwbGF5TWF0aFtpXVswXV0gPSB7XG4gICAgICAgICAgICBtb2RlOiBcInRleDsgbW9kZT1kaXNwbGF5XCIsXG4gICAgICAgICAgICBlbmQ6IGNvbmZpZy5kaXNwbGF5TWF0aFtpXVsxXSxcbiAgICAgICAgICAgIHBhdHRlcm46IHRoaXMuZW5kUGF0dGVybihjb25maWcuZGlzcGxheU1hdGhbaV1bMV0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChzdGFydHMubGVuZ3RoKSB7XG4gICAgICAgIHBhcnRzLnB1c2goc3RhcnRzLnNvcnQodGhpcy5zb3J0TGVuZ3RoKS5qb2luKFwifFwiKSlcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5wcm9jZXNzRW52aXJvbm1lbnRzKSB7XG4gICAgICAgIHBhcnRzLnB1c2goXCJcXFxcXFxcXGJlZ2luXFxcXHsoW159XSopXFxcXH1cIilcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5wcm9jZXNzRXNjYXBlcykge1xuICAgICAgICBwYXJ0cy5wdXNoKFwiXFxcXFxcXFwqXFxcXFxcXFxcXFxcXFwkXCIpXG4gICAgfVxuICAgIGlmIChjb25maWcucHJvY2Vzc1JlZnMpIHtcbiAgICAgICAgcGFydHMucHVzaChcIlxcXFxcXFxcKGVxKT9yZWZcXFxce1tefV0qXFxcXH1cIilcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG5ldyBSZWdFeHAocGFydHMuam9pbihcInxcIiksIFwiZ1wiKTtcbiAgICB0aGlzLnNraXBUYWdzID0gbmV3IFJlZ0V4cChcIl4oXCIgKyBjb25maWcuc2tpcFRhZ3Muam9pbihcInxcIikgKyBcIikkXCIsIFwiaVwiKTtcbiAgICB2YXIgaWdub3JlID0gW107XG4gICAgaWYgKHRoaXMuY29uZmlnLnByZVJlbW92ZUNsYXNzKSB7XG4gICAgICAgIGlnbm9yZS5wdXNoKHRoaXMuY29uZmlnLnByZVJlbW92ZUNsYXNzKVxuICAgIH07XG4gICAgaWYgKGNvbmZpZy5pZ25vcmVDbGFzcykge1xuICAgICAgICBpZ25vcmUucHVzaChjb25maWcuaWdub3JlQ2xhc3MpXG4gICAgfVxuICAgIHRoaXMuaWdub3JlQ2xhc3MgPSAoaWdub3JlLmxlbmd0aCA/IG5ldyBSZWdFeHAoXCIoXnwgKShcIiArIGlnbm9yZS5qb2luKFwifFwiKSArIFwiKSggfCQpXCIpIDogL14kLyk7XG4gICAgdGhpcy5wcm9jZXNzQ2xhc3MgPSBuZXcgUmVnRXhwKFwiKF58ICkoXCIgKyBjb25maWcucHJvY2Vzc0NsYXNzICsgXCIpKCB8JClcIik7XG4gICAgcmV0dXJuIChwYXJ0cy5sZW5ndGggPiAwKTtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLnBhdHRlcm5RdW90ZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvKFtcXF4kKCl7fSsqP1xcLXxcXFtcXF1cXDpcXFxcXSkvZywgJ1xcXFwkMScpXG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5lbmRQYXR0ZXJuID0gZnVuY3Rpb24gKGVuZCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHRoaXMucGF0dGVyblF1b3RlKGVuZCkgKyBcInxcXFxcXFxcXC58W3t9XVwiLCBcImdcIik7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5zb3J0TGVuZ3RoID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoXG4gICAgfVxuICAgIHJldHVybiAoYSA9PSBiID8gMCA6IChhIDwgYiA/IC0xIDogMSkpO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuc2NhbkVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgc3RvcCwgaWdub3JlKSB7XG4gICAgdmFyIGNuYW1lLCB0bmFtZSwgaWdub3JlQ2hpbGQsIHByb2Nlc3M7XG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudCAhPSBzdG9wKSB7XG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICcjdGV4dCcpIHtcbiAgICAgICAgICAgIGlmICghaWdub3JlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuc2NhblRleHQoZWxlbWVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNuYW1lID0gKHR5cGVvZiAoZWxlbWVudC5jbGFzc05hbWUpID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IGVsZW1lbnQuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHRuYW1lID0gKHR5cGVvZiAoZWxlbWVudC50YWdOYW1lKSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiXCIgOiBlbGVtZW50LnRhZ05hbWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoY25hbWUpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY25hbWUgPSBTdHJpbmcoY25hbWUpXG4gICAgICAgICAgICB9IC8vIGpzeGdyYXBoIHVzZXMgbm9uLXN0cmluZyBjbGFzcyBuYW1lcyFcbiAgICAgICAgICAgIHByb2Nlc3MgPSB0aGlzLnByb2Nlc3NDbGFzcy5leGVjKGNuYW1lKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmZpcnN0Q2hpbGQgJiYgIWNuYW1lLm1hdGNoKC8oXnwgKU1hdGhKYXgvKSAmJlxuICAgICAgICAgICAgICAgIChwcm9jZXNzIHx8ICF0aGlzLnNraXBUYWdzLmV4ZWModG5hbWUpKSkge1xuICAgICAgICAgICAgICAgIGlnbm9yZUNoaWxkID0gKGlnbm9yZSB8fCB0aGlzLmlnbm9yZUNsYXNzLmV4ZWMoY25hbWUpKSAmJiAhcHJvY2VzcztcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5FbGVtZW50KGVsZW1lbnQuZmlyc3RDaGlsZCwgc3RvcCwgaWdub3JlQ2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5uZXh0U2libGluZ1xuICAgICAgICB9XG4gICAgfVxufTtcblxudGV4MmpheC5wcm90b3R5cGUuc2NhblRleHQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lm5vZGVWYWx1ZS5yZXBsYWNlKC9cXHMrLywgJycpID09ICcnKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50XG4gICAgfVxuICAgIHZhciBtYXRjaCwgcHJldjtcbiAgICB0aGlzLnNlYXJjaCA9IHtcbiAgICAgICAgc3RhcnQ6IHRydWVcbiAgICB9O1xuICAgIHRoaXMucGF0dGVybiA9IHRoaXMuc3RhcnQ7XG4gICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJyN0ZXh0JyAmJlxuICAgICAgICAgICAgKG1hdGNoID0gdGhpcy5wYXR0ZXJuLmV4ZWMoZWxlbWVudC5ub2RlVmFsdWUpKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuc3RhcnRNYXRjaChtYXRjaCwgZWxlbWVudClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZW5kTWF0Y2gobWF0Y2gsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoLm1hdGNoZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmVuY2xvc2VNYXRoKGVsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBwcmV2ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5uZXh0U2libGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnQgJiYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2JyJyB8fFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICcjY29tbWVudCcpKTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVOYW1lICE9PSAnI3RleHQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNlYXJjaC5jbG9zZSA/IHRoaXMucHJldkVuZE1hdGNoKCkgOiBwcmV2KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuc3RhcnRNYXRjaCA9IGZ1bmN0aW9uIChtYXRjaCwgZWxlbWVudCkge1xuICAgIHZhciBkZWxpbSA9IHRoaXMubWF0Y2hbbWF0Y2hbMF1dO1xuICAgIGlmIChkZWxpbSAhPSBudWxsKSB7IC8vIGEgc3RhcnQgZGVsaW1pdGVyXG4gICAgICAgIHRoaXMuc2VhcmNoID0ge1xuICAgICAgICAgICAgZW5kOiBkZWxpbS5lbmQsXG4gICAgICAgICAgICBtb2RlOiBkZWxpbS5tb2RlLFxuICAgICAgICAgICAgcGNvdW50OiAwLFxuICAgICAgICAgICAgb3BlbjogZWxlbWVudCxcbiAgICAgICAgICAgIG9sZW46IG1hdGNoWzBdLmxlbmd0aCxcbiAgICAgICAgICAgIG9wb3M6IHRoaXMucGF0dGVybi5sYXN0SW5kZXggLSBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zd2l0Y2hQYXR0ZXJuKGRlbGltLnBhdHRlcm4pO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0uc3Vic3RyKDAsIDYpID09PSBcIlxcXFxiZWdpblwiKSB7IC8vIFxcYmVnaW57Li4ufVxuICAgICAgICB0aGlzLnNlYXJjaCA9IHtcbiAgICAgICAgICAgIGVuZDogXCJcXFxcZW5ke1wiICsgbWF0Y2hbMV0gKyBcIn1cIixcbiAgICAgICAgICAgIG1vZGU6IFwiVGVYXCIsXG4gICAgICAgICAgICBwY291bnQ6IDAsXG4gICAgICAgICAgICBvcGVuOiBlbGVtZW50LFxuICAgICAgICAgICAgb2xlbjogMCxcbiAgICAgICAgICAgIG9wb3M6IHRoaXMucGF0dGVybi5sYXN0SW5kZXggLSBtYXRjaFswXS5sZW5ndGgsXG4gICAgICAgICAgICBpc0JlZ2luRW5kOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3dpdGNoUGF0dGVybih0aGlzLmVuZFBhdHRlcm4odGhpcy5zZWFyY2guZW5kKSk7XG4gICAgfSBlbHNlIGlmIChtYXRjaFswXS5zdWJzdHIoMCwgNCkgPT09IFwiXFxcXHJlZlwiIHx8IG1hdGNoWzBdLnN1YnN0cigwLCA2KSA9PT0gXCJcXFxcZXFyZWZcIikge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHtcbiAgICAgICAgICAgIG1vZGU6IFwiXCIsXG4gICAgICAgICAgICBlbmQ6IFwiXCIsXG4gICAgICAgICAgICBvcGVuOiBlbGVtZW50LFxuICAgICAgICAgICAgcGNvdW50OiAwLFxuICAgICAgICAgICAgb2xlbjogMCxcbiAgICAgICAgICAgIG9wb3M6IHRoaXMucGF0dGVybi5sYXN0SW5kZXggLSBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lbmRNYXRjaChbXCJcIl0sIGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7IC8vIGVzY2FwZWQgZG9sbGFyIHNpZ25zXG4gICAgICAgIC8vIHB1dCAkIGluIGEgc3BhbiBzbyBpdCBkb2Vzbid0IGdldCBwcm9jZXNzZWQgYWdhaW5cbiAgICAgICAgLy8gc3BsaXQgb2ZmIGJhY2tzbGFzaGVzIHNvIHRoZXkgZG9uJ3QgZ2V0IHJlbW92ZWQgbGF0ZXJcbiAgICAgICAgdmFyIHNsYXNoZXMgPSBtYXRjaFswXS5zdWJzdHIoMCwgbWF0Y2hbMF0ubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICBuLCBzcGFuO1xuICAgICAgICBpZiAoc2xhc2hlcy5sZW5ndGggJSAyID09PSAwKSB7XG4gICAgICAgICAgICBzcGFuID0gW3NsYXNoZXMucmVwbGFjZSgvXFxcXFxcXFwvZywgXCJcXFxcXCIpXTtcbiAgICAgICAgICAgIG4gPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGFuID0gW3NsYXNoZXMuc3Vic3RyKDEpLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKSwgXCIkXCJdO1xuICAgICAgICAgICAgbiA9IDBcbiAgICAgICAgfVxuICAgICAgICBlc2NhcGVkID0gdGhpcy5jb25maWcuZG9jLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBlc2NhcGVkLmlubmVySFRNTCA9IHNwYW4uam9pbignJyk7XG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5jb25maWcuZG9jLmNyZWF0ZVRleHROb2RlKGVsZW1lbnQubm9kZVZhbHVlLnN1YnN0cigwLCBtYXRjaC5pbmRleCkpO1xuICAgICAgICBlbGVtZW50Lm5vZGVWYWx1ZSA9IGVsZW1lbnQubm9kZVZhbHVlLnN1YnN0cihtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCAtIG4pO1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVzY2FwZWQsIGVsZW1lbnQpO1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRleHQsIGVzY2FwZWQpO1xuICAgICAgICB0aGlzLnBhdHRlcm4ubGFzdEluZGV4ID0gbjtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5lbmRNYXRjaCA9IGZ1bmN0aW9uIChtYXRjaCwgZWxlbWVudCkge1xuICAgIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaDtcbiAgICBpZiAobWF0Y2hbMF0gPT0gc2VhcmNoLmVuZCkge1xuICAgICAgICBpZiAoIXNlYXJjaC5jbG9zZSB8fCBzZWFyY2gucGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzZWFyY2guY2xvc2UgPSBlbGVtZW50O1xuICAgICAgICAgICAgc2VhcmNoLmNwb3MgPSB0aGlzLnBhdHRlcm4ubGFzdEluZGV4O1xuICAgICAgICAgICAgc2VhcmNoLmNsZW4gPSAoc2VhcmNoLmlzQmVnaW5FbmQgPyAwIDogbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VhcmNoLnBjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgc2VhcmNoLm1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZW5jbG9zZU1hdGgoZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFBhdHRlcm4odGhpcy5zdGFydCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSBcIntcIikge1xuICAgICAgICBzZWFyY2gucGNvdW50KytcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSBcIn1cIiAmJiBzZWFyY2gucGNvdW50KSB7XG4gICAgICAgIHNlYXJjaC5wY291bnQtLVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG50ZXgyamF4LnByb3RvdHlwZS5wcmV2RW5kTWF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWFyY2gubWF0Y2hlZCA9IHRydWU7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVuY2xvc2VNYXRoKHRoaXMuc2VhcmNoLmNsb3NlKTtcbiAgICB0aGlzLnN3aXRjaFBhdHRlcm4odGhpcy5zdGFydCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5zd2l0Y2hQYXR0ZXJuID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICBwYXR0ZXJuLmxhc3RJbmRleCA9IHRoaXMucGF0dGVybi5sYXN0SW5kZXg7XG4gICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVybjtcbiAgICB0aGlzLnNlYXJjaC5zdGFydCA9IChwYXR0ZXJuID09PSB0aGlzLnN0YXJ0KTtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmVuY2xvc2VNYXRoID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2gsXG4gICAgICAgIGNsb3NlID0gc2VhcmNoLmNsb3NlLFxuICAgICAgICBDTE9TRSwgbWF0aDtcbiAgICBpZiAoc2VhcmNoLmNwb3MgPT09IGNsb3NlLmxlbmd0aCkge1xuICAgICAgICBjbG9zZSA9IGNsb3NlLm5leHRTaWJsaW5nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2UgPSBjbG9zZS5zcGxpdFRleHQoc2VhcmNoLmNwb3MpXG4gICAgfVxuICAgIGlmICghY2xvc2UpIHtcbiAgICAgICAgQ0xPU0UgPSBjbG9zZSA9IHNlYXJjaC5jbG9zZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuY29uZmlnLmRvYy5jcmVhdGVUZXh0Tm9kZShcIlwiKSk7XG4gICAgfVxuICAgIHNlYXJjaC5jbG9zZSA9IGNsb3NlO1xuICAgIG1hdGggPSAoc2VhcmNoLm9wb3MgPyBzZWFyY2gub3Blbi5zcGxpdFRleHQoc2VhcmNoLm9wb3MpIDogc2VhcmNoLm9wZW4pO1xuICAgIHdoaWxlIChtYXRoLm5leHRTaWJsaW5nICYmIG1hdGgubmV4dFNpYmxpbmcgIT09IGNsb3NlKSB7XG4gICAgICAgIGlmIChtYXRoLm5leHRTaWJsaW5nLm5vZGVWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG1hdGgubmV4dFNpYmxpbmcubm9kZU5hbWUgPT09IFwiI2NvbW1lbnRcIikge1xuICAgICAgICAgICAgICAgIG1hdGgubm9kZVZhbHVlICs9IG1hdGgubmV4dFNpYmxpbmcubm9kZVZhbHVlLnJlcGxhY2UoL15cXFtDREFUQVxcWygoLnxcXG58XFxyKSopXFxdXFxdJC8sIFwiJDFcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGgubm9kZVZhbHVlICs9IG1hdGgubmV4dFNpYmxpbmcubm9kZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubXNpZU5ld2xpbmVCdWcpIHtcbiAgICAgICAgICAgIG1hdGgubm9kZVZhbHVlICs9IChtYXRoLm5leHRTaWJsaW5nLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiYnJcIiA/IFwiXFxuXCIgOiBcIiBcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXRoLm5vZGVWYWx1ZSArPSBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBtYXRoLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWF0aC5uZXh0U2libGluZyk7XG4gICAgfVxuICAgIHZhciBUZVggPSBtYXRoLm5vZGVWYWx1ZS5zdWJzdHIoc2VhcmNoLm9sZW4sIG1hdGgubm9kZVZhbHVlLmxlbmd0aCAtIHNlYXJjaC5vbGVuIC0gc2VhcmNoLmNsZW4pO1xuICAgIG1hdGgucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtYXRoKTtcbiAgICBtYXRoID0gdGhpcy5jcmVhdGVNYXRoVGFnKHNlYXJjaC5tb2RlLCBUZVgpO1xuICAgIHRoaXMuc2VhcmNoID0ge307XG4gICAgdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKENMT1NFKSB7XG4gICAgICAgIENMT1NFLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoQ0xPU0UpXG4gICAgfVxuICAgIHJldHVybiBtYXRoO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuaW5zZXJ0Tm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoO1xuICAgIHNlYXJjaC5jbG9zZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBzZWFyY2guY2xvc2UpO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuY3JlYXRlTWF0aFRhZyA9IGZ1bmN0aW9uIChtb2RlLCB0ZXgpIHtcbiAgICB2YXIgc2NyaXB0ID0gdGhpcy5jb25maWcuZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgc2NyaXB0LnR5cGUgPSAnbWF0aC8nICsgbW9kZTtcbiAgICBzY3JpcHQudGV4dCA9IHRleDtcbiAgICB0aGlzLmluc2VydE5vZGUoc2NyaXB0KTtcbiAgICByZXR1cm4gc2NyaXB0O1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuZmlsdGVyUHJldmlldyA9IGZ1bmN0aW9uICh0ZXgpIHtcbiAgICByZXR1cm4gdGV4XG59O1xuXG5leHBvcnRzLnRleDJqYXggPSBuZXcgdGV4MmpheCgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGV4MmpheC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGNvbW1vbm1hcmsuanMgLSBDb21tb21NYXJrIGluIEphdmFTY3JpcHRcbi8vIENvcHlyaWdodCAoQykgMjAxNCBKb2huIE1hY0ZhcmxhbmVcbi8vIExpY2Vuc2U6IEJTRDMuXG5cbi8vIEJhc2ljIHVzYWdlOlxuLy9cbi8vIHZhciBjb21tb25tYXJrID0gcmVxdWlyZSgnY29tbW9ubWFyaycpO1xuLy8gdmFyIHBhcnNlciA9IG5ldyBjb21tb25tYXJrLlBhcnNlcigpO1xuLy8gdmFyIHJlbmRlcmVyID0gbmV3IGNvbW1vbm1hcmsuSHRtbFJlbmRlcmVyKCk7XG4vLyBjb25zb2xlLmxvZyhyZW5kZXJlci5yZW5kZXIocGFyc2VyLnBhcnNlKCdIZWxsbyAqd29ybGQqJykpKTtcblxubW9kdWxlLmV4cG9ydHMuTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xubW9kdWxlLmV4cG9ydHMuUGFyc2VyID0gcmVxdWlyZSgnLi9ibG9ja3MnKTtcbm1vZHVsZS5leHBvcnRzLkh0bWxSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyL2h0bWwnKTtcbm1vZHVsZS5leHBvcnRzLlhtbFJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXIveG1sJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG52YXIgdW5lc2NhcGVTdHJpbmcgPSByZXF1aXJlKCcuL2NvbW1vbicpLnVuZXNjYXBlU3RyaW5nO1xudmFyIE9QRU5UQUcgPSByZXF1aXJlKCcuL2NvbW1vbicpLk9QRU5UQUc7XG52YXIgQ0xPU0VUQUcgPSByZXF1aXJlKCcuL2NvbW1vbicpLkNMT1NFVEFHO1xuXG52YXIgQ09ERV9JTkRFTlQgPSA0O1xuXG52YXIgQ19UQUIgPSA5O1xudmFyIENfTkVXTElORSA9IDEwO1xudmFyIENfR1JFQVRFUlRIQU4gPSA2MjtcbnZhciBDX0xFU1NUSEFOID0gNjA7XG52YXIgQ19TUEFDRSA9IDMyO1xudmFyIENfT1BFTl9CUkFDS0VUID0gOTE7XG5cbnZhciBJbmxpbmVQYXJzZXIgPSByZXF1aXJlKCcuL2lubGluZXMnKTtcblxudmFyIHJlSHRtbEJsb2NrT3BlbiA9IFtcbiAgIC8uLywgLy8gZHVtbXkgZm9yIDBcbiAgIC9ePCg/OnNjcmlwdHxwcmV8c3R5bGUpKD86XFxzfD58JCkvaSxcbiAgIC9ePCEtLS8sXG4gICAvXjxbP10vLFxuICAgL148IVtBLVpdLyxcbiAgIC9ePCFcXFtDREFUQVxcWy8sXG4gICAvXjxbL10/KD86YWRkcmVzc3xhcnRpY2xlfGFzaWRlfGJhc2V8YmFzZWZvbnR8YmxvY2txdW90ZXxib2R5fGNhcHRpb258Y2VudGVyfGNvbHxjb2xncm91cHxkZHxkZXRhaWxzfGRpYWxvZ3xkaXJ8ZGl2fGRsfGR0fGZpZWxkc2V0fGZpZ2NhcHRpb258ZmlndXJlfGZvb3Rlcnxmb3JtfGZyYW1lfGZyYW1lc2V0fGhbMTIzNDU2XXxoZWFkfGhlYWRlcnxocnxodG1sfGlmcmFtZXxsZWdlbmR8bGl8bGlua3xtYWlufG1lbnV8bWVudWl0ZW18bWV0YXxuYXZ8bm9mcmFtZXN8b2x8b3B0Z3JvdXB8b3B0aW9ufHB8cGFyYW18c2VjdGlvbnxzb3VyY2V8dGl0bGV8c3VtbWFyeXx0YWJsZXx0Ym9keXx0ZHx0Zm9vdHx0aHx0aGVhZHx0aXRsZXx0cnx0cmFja3x1bCkoPzpcXHN8Wy9dP1s+XXwkKS9pLFxuICAgIG5ldyBSZWdFeHAoJ14oPzonICsgT1BFTlRBRyArICd8JyArIENMT1NFVEFHICsgJylcXFxccyokJywgJ2knKVxuXTtcblxudmFyIHJlSHRtbEJsb2NrQ2xvc2UgPSBbXG4gICAvLi8sIC8vIGR1bW15IGZvciAwXG4gICAvPFxcLyg/OnNjcmlwdHxwcmV8c3R5bGUpPi9pLFxuICAgLy0tPi8sXG4gICAvXFw/Pi8sXG4gICAvPi8sXG4gICAvXFxdXFxdPi9cbl07XG5cbnZhciByZVRoZW1hdGljQnJlYWsgPSAvXig/Oig/OlxcKlsgXFx0XSopezMsfXwoPzpfWyBcXHRdKil7Myx9fCg/Oi1bIFxcdF0qKXszLH0pWyBcXHRdKiQvO1xuXG52YXIgcmVNYXliZVNwZWNpYWwgPSAvXlsjYH4qK189PD4wLTktXS87XG5cbnZhciByZU5vblNwYWNlID0gL1teIFxcdFxcZlxcdlxcclxcbl0vO1xuXG52YXIgcmVCdWxsZXRMaXN0TWFya2VyID0gL15bKistXS87XG5cbnZhciByZU9yZGVyZWRMaXN0TWFya2VyID0gL14oXFxkezEsOX0pKFsuKV0pLztcblxudmFyIHJlQVRYSGVhZGluZ01hcmtlciA9IC9eI3sxLDZ9KD86WyBcXHRdK3wkKS87XG5cbnZhciByZUNvZGVGZW5jZSA9IC9eYHszLH0oPyEuKmApfF5+ezMsfSg/IS4qfikvO1xuXG52YXIgcmVDbG9zaW5nQ29kZUZlbmNlID0gL14oPzpgezMsfXx+ezMsfSkoPz0gKiQpLztcblxudmFyIHJlU2V0ZXh0SGVhZGluZ0xpbmUgPSAvXig/Oj0rfC0rKVsgXFx0XSokLztcblxudmFyIHJlTGluZUVuZGluZyA9IC9cXHJcXG58XFxufFxcci87XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiBzdHJpbmcgY29udGFpbnMgb25seSBzcGFjZSBjaGFyYWN0ZXJzLlxudmFyIGlzQmxhbmsgPSBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuICEocmVOb25TcGFjZS50ZXN0KHMpKTtcbn07XG5cbnZhciBpc1NwYWNlT3JUYWIgPSBmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuIGMgPT09IENfU1BBQ0UgfHwgYyA9PT0gQ19UQUI7XG59O1xuXG52YXIgcGVlayA9IGZ1bmN0aW9uKGxuLCBwb3MpIHtcbiAgICBpZiAocG9zIDwgbG4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBsbi5jaGFyQ29kZUF0KHBvcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn07XG5cbi8vIERPQyBQQVJTRVJcblxuLy8gVGhlc2UgYXJlIG1ldGhvZHMgb2YgYSBQYXJzZXIgb2JqZWN0LCBkZWZpbmVkIGJlbG93LlxuXG4vLyBSZXR1cm5zIHRydWUgaWYgYmxvY2sgZW5kcyB3aXRoIGEgYmxhbmsgbGluZSwgZGVzY2VuZGluZyBpZiBuZWVkZWRcbi8vIGludG8gbGlzdHMgYW5kIHN1Ymxpc3RzLlxudmFyIGVuZHNXaXRoQmxhbmtMaW5lID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB3aGlsZSAoYmxvY2spIHtcbiAgICAgICAgaWYgKGJsb2NrLl9sYXN0TGluZUJsYW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdCA9IGJsb2NrLnR5cGU7XG4gICAgICAgIGlmICh0ID09PSAnbGlzdCcgfHwgdCA9PT0gJ2l0ZW0nKSB7XG4gICAgICAgICAgICBibG9jayA9IGJsb2NrLl9sYXN0Q2hpbGQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBBZGQgYSBsaW5lIHRvIHRoZSBibG9jayBhdCB0aGUgdGlwLiAgV2UgYXNzdW1lIHRoZSB0aXBcbi8vIGNhbiBhY2NlcHQgbGluZXMgLS0gdGhhdCBjaGVjayBzaG91bGQgYmUgZG9uZSBiZWZvcmUgY2FsbGluZyB0aGlzLlxudmFyIGFkZExpbmUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYikge1xuICAgICAgdGhpcy5vZmZzZXQgKz0gMTsgLy8gc2tpcCBvdmVyIHRhYlxuICAgICAgLy8gYWRkIHNwYWNlIGNoYXJhY3RlcnM6XG4gICAgICB2YXIgY2hhcnNUb1RhYiA9IDQgLSAodGhpcy5jb2x1bW4gJSA0KTtcbiAgICAgIHRoaXMudGlwLl9zdHJpbmdfY29udGVudCArPSAoJyAnLnJlcGVhdChjaGFyc1RvVGFiKSk7XG4gICAgfVxuICAgIHRoaXMudGlwLl9zdHJpbmdfY29udGVudCArPSB0aGlzLmN1cnJlbnRMaW5lLnNsaWNlKHRoaXMub2Zmc2V0KSArICdcXG4nO1xufTtcblxuLy8gQWRkIGJsb2NrIG9mIHR5cGUgdGFnIGFzIGEgY2hpbGQgb2YgdGhlIHRpcC4gIElmIHRoZSB0aXAgY2FuJ3Rcbi8vIGFjY2VwdCBjaGlsZHJlbiwgY2xvc2UgYW5kIGZpbmFsaXplIGl0IGFuZCB0cnkgaXRzIHBhcmVudCxcbi8vIGFuZCBzbyBvbiB0aWwgd2UgZmluZCBhIGJsb2NrIHRoYXQgY2FuIGFjY2VwdCBjaGlsZHJlbi5cbnZhciBhZGRDaGlsZCA9IGZ1bmN0aW9uKHRhZywgb2Zmc2V0KSB7XG4gICAgd2hpbGUgKCF0aGlzLmJsb2Nrc1t0aGlzLnRpcC50eXBlXS5jYW5Db250YWluKHRhZykpIHtcbiAgICAgICAgdGhpcy5maW5hbGl6ZSh0aGlzLnRpcCwgdGhpcy5saW5lTnVtYmVyIC0gMSk7XG4gICAgfVxuXG4gICAgdmFyIGNvbHVtbl9udW1iZXIgPSBvZmZzZXQgKyAxOyAvLyBvZmZzZXQgMCA9IGNvbHVtbiAxXG4gICAgdmFyIG5ld0Jsb2NrID0gbmV3IE5vZGUodGFnLCBbW3RoaXMubGluZU51bWJlciwgY29sdW1uX251bWJlcl0sIFswLCAwXV0pO1xuICAgIG5ld0Jsb2NrLl9zdHJpbmdfY29udGVudCA9ICcnO1xuICAgIHRoaXMudGlwLmFwcGVuZENoaWxkKG5ld0Jsb2NrKTtcbiAgICB0aGlzLnRpcCA9IG5ld0Jsb2NrO1xuICAgIHJldHVybiBuZXdCbG9jaztcbn07XG5cbi8vIFBhcnNlIGEgbGlzdCBtYXJrZXIgYW5kIHJldHVybiBkYXRhIG9uIHRoZSBtYXJrZXIgKHR5cGUsXG4vLyBzdGFydCwgZGVsaW1pdGVyLCBidWxsZXQgY2hhcmFjdGVyLCBwYWRkaW5nKSBvciBudWxsLlxudmFyIHBhcnNlTGlzdE1hcmtlciA9IGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgdmFyIHJlc3QgPSBwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgdmFyIG1hdGNoO1xuICAgIHZhciBuZXh0YztcbiAgICB2YXIgc3BhY2VzU3RhcnRDb2w7XG4gICAgdmFyIHNwYWNlc1N0YXJ0T2Zmc2V0O1xuICAgIHZhciBkYXRhID0geyB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICB0aWdodDogdHJ1ZSwgIC8vIGxpc3RzIGFyZSB0aWdodCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgIGJ1bGxldENoYXI6IG51bGwsXG4gICAgICAgICAgICAgICAgIHN0YXJ0OiBudWxsLFxuICAgICAgICAgICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgIHBhZGRpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgIG1hcmtlck9mZnNldDogcGFyc2VyLmluZGVudCB9O1xuICAgIGlmICgobWF0Y2ggPSByZXN0Lm1hdGNoKHJlQnVsbGV0TGlzdE1hcmtlcikpKSB7XG4gICAgICAgIGRhdGEudHlwZSA9ICdidWxsZXQnO1xuICAgICAgICBkYXRhLmJ1bGxldENoYXIgPSBtYXRjaFswXVswXTtcblxuICAgIH0gZWxzZSBpZiAoKG1hdGNoID0gcmVzdC5tYXRjaChyZU9yZGVyZWRMaXN0TWFya2VyKSkgJiZcbiAgICAgICAgICAgICAgICAoY29udGFpbmVyLnR5cGUgIT09ICdwYXJhZ3JhcGgnIHx8XG4gICAgICAgICAgICAgICAgIG1hdGNoWzFdID09PSAnMScpKSB7XG4gICAgICAgIGRhdGEudHlwZSA9ICdvcmRlcmVkJztcbiAgICAgICAgZGF0YS5zdGFydCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICAgICAgZGF0YS5kZWxpbWl0ZXIgPSBtYXRjaFsyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgc3BhY2VzIGFmdGVyXG4gICAgbmV4dGMgPSBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm5leHROb25zcGFjZSArIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgaWYgKCEobmV4dGMgPT09IC0xIHx8IG5leHRjID09PSBDX1RBQiB8fCBuZXh0YyA9PT0gQ19TUEFDRSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gaWYgaXQgaW50ZXJydXB0cyBwYXJhZ3JhcGgsIG1ha2Ugc3VyZSBmaXJzdCBsaW5lIGlzbid0IGJsYW5rXG4gICAgaWYgKGNvbnRhaW5lci50eXBlID09PSAncGFyYWdyYXBoJyAmJiAhcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UgKyBtYXRjaFswXS5sZW5ndGgpLm1hdGNoKHJlTm9uU3BhY2UpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHdlJ3ZlIGdvdCBhIG1hdGNoISBhZHZhbmNlIG9mZnNldCBhbmQgY2FsY3VsYXRlIHBhZGRpbmdcbiAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpOyAvLyB0byBzdGFydCBvZiBtYXJrZXJcbiAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChtYXRjaFswXS5sZW5ndGgsIHRydWUpOyAvLyB0byBlbmQgb2YgbWFya2VyXG4gICAgc3BhY2VzU3RhcnRDb2wgPSBwYXJzZXIuY29sdW1uO1xuICAgIHNwYWNlc1N0YXJ0T2Zmc2V0ID0gcGFyc2VyLm9mZnNldDtcbiAgICBkbyB7XG4gICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIHRydWUpO1xuICAgICAgICBuZXh0YyA9IHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIub2Zmc2V0KTtcbiAgICB9IHdoaWxlIChwYXJzZXIuY29sdW1uIC0gc3BhY2VzU3RhcnRDb2wgPCA1ICYmXG4gICAgICAgICAgIGlzU3BhY2VPclRhYihuZXh0YykpO1xuICAgIHZhciBibGFua19pdGVtID0gcGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5vZmZzZXQpID09PSAtMTtcbiAgICB2YXIgc3BhY2VzX2FmdGVyX21hcmtlciA9IHBhcnNlci5jb2x1bW4gLSBzcGFjZXNTdGFydENvbDtcbiAgICBpZiAoc3BhY2VzX2FmdGVyX21hcmtlciA+PSA1IHx8XG4gICAgICAgIHNwYWNlc19hZnRlcl9tYXJrZXIgPCAxIHx8XG4gICAgICAgIGJsYW5rX2l0ZW0pIHtcbiAgICAgICAgZGF0YS5wYWRkaW5nID0gbWF0Y2hbMF0ubGVuZ3RoICsgMTtcbiAgICAgICAgcGFyc2VyLmNvbHVtbiA9IHNwYWNlc1N0YXJ0Q29sO1xuICAgICAgICBwYXJzZXIub2Zmc2V0ID0gc3BhY2VzU3RhcnRPZmZzZXQ7XG4gICAgICAgIGlmIChpc1NwYWNlT3JUYWIocGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5vZmZzZXQpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLnBhZGRpbmcgPSBtYXRjaFswXS5sZW5ndGggKyBzcGFjZXNfYWZ0ZXJfbWFya2VyO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbn07XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIGxpc3QgaXRlbXMgYXJlIG9mIHRoZSBzYW1lIHR5cGUsXG4vLyB3aXRoIHRoZSBzYW1lIGRlbGltaXRlciBhbmQgYnVsbGV0IGNoYXJhY3Rlci4gIFRoaXMgaXMgdXNlZFxuLy8gaW4gYWdnbG9tZXJhdGluZyBsaXN0IGl0ZW1zIGludG8gbGlzdHMuXG52YXIgbGlzdHNNYXRjaCA9IGZ1bmN0aW9uKGxpc3RfZGF0YSwgaXRlbV9kYXRhKSB7XG4gICAgcmV0dXJuIChsaXN0X2RhdGEudHlwZSA9PT0gaXRlbV9kYXRhLnR5cGUgJiZcbiAgICAgICAgICAgIGxpc3RfZGF0YS5kZWxpbWl0ZXIgPT09IGl0ZW1fZGF0YS5kZWxpbWl0ZXIgJiZcbiAgICAgICAgICAgIGxpc3RfZGF0YS5idWxsZXRDaGFyID09PSBpdGVtX2RhdGEuYnVsbGV0Q2hhcik7XG59O1xuXG4vLyBGaW5hbGl6ZSBhbmQgY2xvc2UgYW55IHVubWF0Y2hlZCBibG9ja3MuXG52YXIgY2xvc2VVbm1hdGNoZWRCbG9ja3MgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuYWxsQ2xvc2VkKSB7XG4gICAgICAgIC8vIGZpbmFsaXplIGFueSBibG9ja3Mgbm90IG1hdGNoZWRcbiAgICAgICAgd2hpbGUgKHRoaXMub2xkdGlwICE9PSB0aGlzLmxhc3RNYXRjaGVkQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5vbGR0aXAuX3BhcmVudDtcbiAgICAgICAgICAgIHRoaXMuZmluYWxpemUodGhpcy5vbGR0aXAsIHRoaXMubGluZU51bWJlciAtIDEpO1xuICAgICAgICAgICAgdGhpcy5vbGR0aXAgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbGxDbG9zZWQgPSB0cnVlO1xuICAgIH1cbn07XG5cbi8vICdmaW5hbGl6ZScgaXMgcnVuIHdoZW4gdGhlIGJsb2NrIGlzIGNsb3NlZC5cbi8vICdjb250aW51ZScgaXMgcnVuIHRvIGNoZWNrIHdoZXRoZXIgdGhlIGJsb2NrIGlzIGNvbnRpbnVpbmdcbi8vIGF0IGEgY2VydGFpbiBsaW5lIGFuZCBvZmZzZXQgKGUuZy4gd2hldGhlciBhIGJsb2NrIHF1b3RlXG4vLyBjb250YWlucyBhIGA+YC4gIEl0IHJldHVybnMgMCBmb3IgbWF0Y2hlZCwgMSBmb3Igbm90IG1hdGNoZWQsXG4vLyBhbmQgMiBmb3IgXCJ3ZSd2ZSBkZWFsdCB3aXRoIHRoaXMgbGluZSBjb21wbGV0ZWx5LCBnbyB0byBuZXh0LlwiXG52YXIgYmxvY2tzID0ge1xuICAgIGRvY3VtZW50OiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbigpIHsgcmV0dXJuOyB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbih0KSB7IHJldHVybiAodCAhPT0gJ2l0ZW0nKTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgbGlzdDoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24ocGFyc2VyLCBibG9jaykge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBibG9jay5fZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG5vbi1maW5hbCBsaXN0IGl0ZW0gZW5kaW5nIHdpdGggYmxhbmsgbGluZTpcbiAgICAgICAgICAgICAgICBpZiAoZW5kc1dpdGhCbGFua0xpbmUoaXRlbSkgJiYgaXRlbS5fbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBibG9jay5fbGlzdERhdGEudGlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2UgaW50byBjaGlsZHJlbiBvZiBsaXN0IGl0ZW0sIHRvIHNlZSBpZiB0aGVyZSBhcmVcbiAgICAgICAgICAgICAgICAvLyBzcGFjZXMgYmV0d2VlbiBhbnkgb2YgdGhlbTpcbiAgICAgICAgICAgICAgICB2YXIgc3ViaXRlbSA9IGl0ZW0uX2ZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHN1Yml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZHNXaXRoQmxhbmtMaW5lKHN1Yml0ZW0pICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXRlbS5fbmV4dCB8fCBzdWJpdGVtLl9uZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2suX2xpc3REYXRhLnRpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJpdGVtID0gc3ViaXRlbS5fbmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uX25leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKHQpIHsgcmV0dXJuICh0ID09PSAnaXRlbScpOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IGZhbHNlXG4gICAgfSxcbiAgICBibG9ja19xdW90ZToge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgICAgICB2YXIgbG4gPSBwYXJzZXIuY3VycmVudExpbmU7XG4gICAgICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgICAgIHBlZWsobG4sIHBhcnNlci5uZXh0Tm9uc3BhY2UpID09PSBDX0dSRUFURVJUSEFOKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3BhY2VPclRhYihwZWVrKGxuLCBwYXJzZXIub2Zmc2V0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24odCkgeyByZXR1cm4gKHQgIT09ICdpdGVtJyk7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIGl0ZW06IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgICAgICBpZiAocGFyc2VyLmJsYW5rKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5fZmlyc3RDaGlsZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJsYW5rIGxpbmUgYWZ0ZXIgZW1wdHkgbGlzdCBpdGVtXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuaW5kZW50ID49XG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5fbGlzdERhdGEubWFya2VyT2Zmc2V0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLl9saXN0RGF0YS5wYWRkaW5nKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoY29udGFpbmVyLl9saXN0RGF0YS5tYXJrZXJPZmZzZXQgK1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuX2xpc3REYXRhLnBhZGRpbmcsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24odCkgeyByZXR1cm4gKHQgIT09ICdpdGVtJyk7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIGhlYWRpbmc6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYSBoZWFkaW5nIGNhbiBuZXZlciBjb250YWluZXIgPiAxIGxpbmUsIHNvIGZhaWwgdG8gbWF0Y2g6XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKCkgeyByZXR1cm47IH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIHRoZW1hdGljX2JyZWFrOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGEgdGhlbWF0aWMgYnJlYWsgY2FuIG5ldmVyIGNvbnRhaW5lciA+IDEgbGluZSwgc28gZmFpbCB0byBtYXRjaDpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgY29kZV9ibG9jazoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBsbiA9IHBhcnNlci5jdXJyZW50TGluZTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBwYXJzZXIuaW5kZW50O1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5faXNGZW5jZWQpIHsgLy8gZmVuY2VkXG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gKGluZGVudCA8PSAzICYmXG4gICAgICAgICAgICAgICAgICAgIGxuLmNoYXJBdChwYXJzZXIubmV4dE5vbnNwYWNlKSA9PT0gY29udGFpbmVyLl9mZW5jZUNoYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgbG4uc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSkubWF0Y2gocmVDbG9zaW5nQ29kZUZlbmNlKSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzBdLmxlbmd0aCA+PSBjb250YWluZXIuX2ZlbmNlTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NpbmcgZmVuY2UgLSB3ZSdyZSBhdCBlbmQgb2YgbGluZSwgc28gd2UgY2FuIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuZmluYWxpemUoY29udGFpbmVyLCBwYXJzZXIubGluZU51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNraXAgb3B0aW9uYWwgc3BhY2VzIG9mIGZlbmNlIG9mZnNldFxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGNvbnRhaW5lci5fZmVuY2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpID4gMCAmJiBpc1NwYWNlT3JUYWIocGVlayhsbiwgcGFyc2VyLm9mZnNldCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGluZGVudGVkXG4gICAgICAgICAgICAgICAgaWYgKGluZGVudCA+PSBDT0RFX0lOREVOVCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChDT0RFX0lOREVOVCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuYmxhbmspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKHBhcnNlciwgYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChibG9jay5faXNGZW5jZWQpIHsgLy8gZmVuY2VkXG4gICAgICAgICAgICAgICAgLy8gZmlyc3QgbGluZSBiZWNvbWVzIGluZm8gc3RyaW5nXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBibG9jay5fc3RyaW5nX2NvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdmFyIG5ld2xpbmVQb3MgPSBjb250ZW50LmluZGV4T2YoJ1xcbicpO1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdExpbmUgPSBjb250ZW50LnNsaWNlKDAsIG5ld2xpbmVQb3MpO1xuICAgICAgICAgICAgICAgIHZhciByZXN0ID0gY29udGVudC5zbGljZShuZXdsaW5lUG9zICsgMSk7XG4gICAgICAgICAgICAgICAgYmxvY2suaW5mbyA9IHVuZXNjYXBlU3RyaW5nKGZpcnN0TGluZS50cmltKCkpO1xuICAgICAgICAgICAgICAgIGJsb2NrLl9saXRlcmFsID0gcmVzdDtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGluZGVudGVkXG4gICAgICAgICAgICAgICAgYmxvY2suX2xpdGVyYWwgPSBibG9jay5fc3RyaW5nX2NvbnRlbnQucmVwbGFjZSgvKFxcbiAqKSskLywgJ1xcbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2suX3N0cmluZ19jb250ZW50ID0gbnVsbDsgLy8gYWxsb3cgR0NcbiAgICAgICAgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiB0cnVlXG4gICAgfSxcbiAgICBodG1sX2Jsb2NrOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuICgocGFyc2VyLmJsYW5rICYmXG4gICAgICAgICAgICAgICAgICAgICAoY29udGFpbmVyLl9odG1sQmxvY2tUeXBlID09PSA2IHx8XG4gICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLl9odG1sQmxvY2tUeXBlID09PSA3KSkgPyAxIDogMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbihwYXJzZXIsIGJsb2NrKSB7XG4gICAgICAgICAgICBibG9jay5fbGl0ZXJhbCA9IGJsb2NrLl9zdHJpbmdfY29udGVudC5yZXBsYWNlKC8oXFxuICopKyQvLCAnJyk7XG4gICAgICAgICAgICBibG9jay5fc3RyaW5nX2NvbnRlbnQgPSBudWxsOyAvLyBhbGxvdyBHQ1xuICAgICAgICB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IHRydWVcbiAgICB9LFxuICAgIHBhcmFncmFwaDoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gKHBhcnNlci5ibGFuayA/IDEgOiAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKHBhcnNlciwgYmxvY2spIHtcbiAgICAgICAgICAgIHZhciBwb3M7XG4gICAgICAgICAgICB2YXIgaGFzUmVmZXJlbmNlRGVmcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB0cnkgcGFyc2luZyB0aGUgYmVnaW5uaW5nIGFzIGxpbmsgcmVmZXJlbmNlIGRlZmluaXRpb25zOlxuICAgICAgICAgICAgd2hpbGUgKHBlZWsoYmxvY2suX3N0cmluZ19jb250ZW50LCAwKSA9PT0gQ19PUEVOX0JSQUNLRVQgJiZcbiAgICAgICAgICAgICAgICAgICAocG9zID1cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmlubGluZVBhcnNlci5wYXJzZVJlZmVyZW5jZShibG9jay5fc3RyaW5nX2NvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZm1hcCkpKSB7XG4gICAgICAgICAgICAgICAgYmxvY2suX3N0cmluZ19jb250ZW50ID0gYmxvY2suX3N0cmluZ19jb250ZW50LnNsaWNlKHBvcyk7XG4gICAgICAgICAgICAgICAgaGFzUmVmZXJlbmNlRGVmcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzUmVmZXJlbmNlRGVmcyAmJiBpc0JsYW5rKGJsb2NrLl9zdHJpbmdfY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICBibG9jay51bmxpbmsoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiB0cnVlXG4gICAgfVxufTtcblxuLy8gYmxvY2sgc3RhcnQgZnVuY3Rpb25zLiAgUmV0dXJuIHZhbHVlczpcbi8vIDAgPSBubyBtYXRjaFxuLy8gMSA9IG1hdGNoZWQgY29udGFpbmVyLCBrZWVwIGdvaW5nXG4vLyAyID0gbWF0Y2hlZCBsZWFmLCBubyBtb3JlIGJsb2NrIHN0YXJ0c1xudmFyIGJsb2NrU3RhcnRzID0gW1xuICAgIC8vIGJsb2NrIHF1b3RlXG4gICAgZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm5leHROb25zcGFjZSkgPT09IENfR1JFQVRFUlRIQU4pIHtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCBmYWxzZSk7XG4gICAgICAgICAgICAvLyBvcHRpb25hbCBmb2xsb3dpbmcgc3BhY2VcbiAgICAgICAgICAgIGlmIChpc1NwYWNlT3JUYWIocGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5vZmZzZXQpKSkge1xuICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWRkQ2hpbGQoJ2Jsb2NrX3F1b3RlJywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIEFUWCBoZWFkaW5nXG4gICAgZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKS5tYXRjaChyZUFUWEhlYWRpbmdNYXJrZXIpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KG1hdGNoWzBdLmxlbmd0aCwgZmFsc2UpO1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcGFyc2VyLmFkZENoaWxkKCdoZWFkaW5nJywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICBjb250YWluZXIubGV2ZWwgPSBtYXRjaFswXS50cmltKCkubGVuZ3RoOyAvLyBudW1iZXIgb2YgI3NcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0cmFpbGluZyAjIyNzOlxuICAgICAgICAgICAgY29udGFpbmVyLl9zdHJpbmdfY29udGVudCA9XG4gICAgICAgICAgICAgICAgcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5vZmZzZXQpLnJlcGxhY2UoL15bIFxcdF0qIytbIFxcdF0qJC8sICcnKS5yZXBsYWNlKC9bIFxcdF0rIytbIFxcdF0qJC8sICcnKTtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KHBhcnNlci5jdXJyZW50TGluZS5sZW5ndGggLSBwYXJzZXIub2Zmc2V0KTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gRmVuY2VkIGNvZGUgYmxvY2tcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgKG1hdGNoID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpLm1hdGNoKHJlQ29kZUZlbmNlKSkpIHtcbiAgICAgICAgICAgIHZhciBmZW5jZUxlbmd0aCA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHBhcnNlci5hZGRDaGlsZCgnY29kZV9ibG9jaycsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgY29udGFpbmVyLl9pc0ZlbmNlZCA9IHRydWU7XG4gICAgICAgICAgICBjb250YWluZXIuX2ZlbmNlTGVuZ3RoID0gZmVuY2VMZW5ndGg7XG4gICAgICAgICAgICBjb250YWluZXIuX2ZlbmNlQ2hhciA9IG1hdGNoWzBdWzBdO1xuICAgICAgICAgICAgY29udGFpbmVyLl9mZW5jZU9mZnNldCA9IHBhcnNlci5pbmRlbnQ7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoZmVuY2VMZW5ndGgsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gSFRNTCBibG9ja1xuICAgIGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm5leHROb25zcGFjZSkgPT09IENfTEVTU1RIQU4pIHtcbiAgICAgICAgICAgIHZhciBzID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgdmFyIGJsb2NrVHlwZTtcblxuICAgICAgICAgICAgZm9yIChibG9ja1R5cGUgPSAxOyBibG9ja1R5cGUgPD0gNzsgYmxvY2tUeXBlKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVIdG1sQmxvY2tPcGVuW2Jsb2NrVHlwZV0udGVzdChzKSAmJlxuICAgICAgICAgICAgICAgICAgICAoYmxvY2tUeXBlIDwgNyB8fFxuICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnR5cGUgIT09ICdwYXJhZ3JhcGgnKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgYWRqdXN0IHBhcnNlci5vZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNwYWNlcyBhcmUgcGFydCBvZiB0aGUgSFRNTCBibG9jazpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSBwYXJzZXIuYWRkQ2hpbGQoJ2h0bWxfYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYi5faHRtbEJsb2NrVHlwZSA9IGJsb2NrVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG5cbiAgICB9LFxuXG4gICAgLy8gU2V0ZXh0IGhlYWRpbmdcbiAgICBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICBjb250YWluZXIudHlwZSA9PT0gJ3BhcmFncmFwaCcgJiZcbiAgICAgICAgICAgICAgICAgICAoKG1hdGNoID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpLm1hdGNoKHJlU2V0ZXh0SGVhZGluZ0xpbmUpKSkpIHtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgdmFyIGhlYWRpbmcgPSBuZXcgTm9kZSgnaGVhZGluZycsIGNvbnRhaW5lci5zb3VyY2Vwb3MpO1xuICAgICAgICAgICAgaGVhZGluZy5sZXZlbCA9IG1hdGNoWzBdWzBdID09PSAnPScgPyAxIDogMjtcbiAgICAgICAgICAgIGhlYWRpbmcuX3N0cmluZ19jb250ZW50ID0gY29udGFpbmVyLl9zdHJpbmdfY29udGVudDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZnRlcihoZWFkaW5nKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci51bmxpbmsoKTtcbiAgICAgICAgICAgIHBhcnNlci50aXAgPSBoZWFkaW5nO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQocGFyc2VyLmN1cnJlbnRMaW5lLmxlbmd0aCAtIHBhcnNlci5vZmZzZXQsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdGhlbWF0aWMgYnJlYWtcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIHJlVGhlbWF0aWNCcmVhay50ZXN0KHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKSkpIHtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgcGFyc2VyLmFkZENoaWxkKCd0aGVtYXRpY19icmVhaycsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQocGFyc2VyLmN1cnJlbnRMaW5lLmxlbmd0aCAtIHBhcnNlci5vZmZzZXQsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gbGlzdCBpdGVtXG4gICAgZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgdmFyIGRhdGE7XG5cbiAgICAgICAgaWYgKCghcGFyc2VyLmluZGVudGVkIHx8IGNvbnRhaW5lci50eXBlID09PSAnbGlzdCcpXG4gICAgICAgICAgICAgICAgJiYgKGRhdGEgPSBwYXJzZUxpc3RNYXJrZXIocGFyc2VyLCBjb250YWluZXIpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbGlzdCBpZiBuZWVkZWRcbiAgICAgICAgICAgIGlmIChwYXJzZXIudGlwLnR5cGUgIT09ICdsaXN0JyB8fFxuICAgICAgICAgICAgICAgICEobGlzdHNNYXRjaChjb250YWluZXIuX2xpc3REYXRhLCBkYXRhKSkpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBwYXJzZXIuYWRkQ2hpbGQoJ2xpc3QnLCBwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuX2xpc3REYXRhID0gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBsaXN0IGl0ZW1cbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHBhcnNlci5hZGRDaGlsZCgnaXRlbScsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgY29udGFpbmVyLl9saXN0RGF0YSA9IGRhdGE7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGluZGVudGVkIGNvZGUgYmxvY2tcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgaWYgKHBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgcGFyc2VyLnRpcC50eXBlICE9PSAncGFyYWdyYXBoJyAmJlxuICAgICAgICAgICAgIXBhcnNlci5ibGFuaykge1xuICAgICAgICAgICAgLy8gaW5kZW50ZWQgY29kZVxuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoQ09ERV9JTkRFTlQsIHRydWUpO1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWRkQ2hpbGQoJ2NvZGVfYmxvY2snLCBwYXJzZXIub2Zmc2V0KTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgfVxuXG5dO1xuXG52YXIgYWR2YW5jZU9mZnNldCA9IGZ1bmN0aW9uKGNvdW50LCBjb2x1bW5zKSB7XG4gICAgdmFyIGN1cnJlbnRMaW5lID0gdGhpcy5jdXJyZW50TGluZTtcbiAgICB2YXIgY2hhcnNUb1RhYiwgY2hhcnNUb0FkdmFuY2U7XG4gICAgdmFyIGM7XG4gICAgd2hpbGUgKGNvdW50ID4gMCAmJiAoYyA9IGN1cnJlbnRMaW5lW3RoaXMub2Zmc2V0XSkpIHtcbiAgICAgICAgaWYgKGMgPT09ICdcXHQnKSB7XG4gICAgICAgICAgICBjaGFyc1RvVGFiID0gNCAtICh0aGlzLmNvbHVtbiAlIDQpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiID0gY2hhcnNUb1RhYiA+IGNvdW50O1xuICAgICAgICAgICAgICAgIGNoYXJzVG9BZHZhbmNlID0gY2hhcnNUb1RhYiA+IGNvdW50ID8gY291bnQgOiBjaGFyc1RvVGFiO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uICs9IGNoYXJzVG9BZHZhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0ICs9IHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPyAwIDogMTtcbiAgICAgICAgICAgICAgICBjb3VudCAtPSBjaGFyc1RvQWR2YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uICs9IGNoYXJzVG9UYWI7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICBjb3VudCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uICs9IDE7IC8vIGFzc3VtZSBhc2NpaTsgYmxvY2sgc3RhcnRzIGFyZSBhc2NpaVxuICAgICAgICAgICAgY291bnQgLT0gMTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBhZHZhbmNlTmV4dE5vbnNwYWNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5vZmZzZXQgPSB0aGlzLm5leHROb25zcGFjZTtcbiAgICB0aGlzLmNvbHVtbiA9IHRoaXMubmV4dE5vbnNwYWNlQ29sdW1uO1xuICAgIHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPSBmYWxzZTtcbn07XG5cbnZhciBmaW5kTmV4dE5vbnNwYWNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRMaW5lID0gdGhpcy5jdXJyZW50TGluZTtcbiAgICB2YXIgaSA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBjb2xzID0gdGhpcy5jb2x1bW47XG4gICAgdmFyIGM7XG5cbiAgICB3aGlsZSAoKGMgPSBjdXJyZW50TGluZS5jaGFyQXQoaSkpICE9PSAnJykge1xuICAgICAgICBpZiAoYyA9PT0gJyAnKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb2xzKys7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbHMgKz0gKDQgLSAoY29scyAlIDQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuYmxhbmsgPSAoYyA9PT0gJ1xcbicgfHwgYyA9PT0gJ1xccicgfHwgYyA9PT0gJycpO1xuICAgIHRoaXMubmV4dE5vbnNwYWNlID0gaTtcbiAgICB0aGlzLm5leHROb25zcGFjZUNvbHVtbiA9IGNvbHM7XG4gICAgdGhpcy5pbmRlbnQgPSB0aGlzLm5leHROb25zcGFjZUNvbHVtbiAtIHRoaXMuY29sdW1uO1xuICAgIHRoaXMuaW5kZW50ZWQgPSB0aGlzLmluZGVudCA+PSBDT0RFX0lOREVOVDtcbn07XG5cbi8vIEFuYWx5emUgYSBsaW5lIG9mIHRleHQgYW5kIHVwZGF0ZSB0aGUgZG9jdW1lbnQgYXBwcm9wcmlhdGVseS5cbi8vIFdlIHBhcnNlIG1hcmtkb3duIHRleHQgYnkgY2FsbGluZyB0aGlzIG9uIGVhY2ggbGluZSBvZiBpbnB1dCxcbi8vIHRoZW4gZmluYWxpemluZyB0aGUgZG9jdW1lbnQuXG52YXIgaW5jb3Jwb3JhdGVMaW5lID0gZnVuY3Rpb24obG4pIHtcbiAgICB2YXIgYWxsX21hdGNoZWQgPSB0cnVlO1xuICAgIHZhciB0O1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuZG9jO1xuICAgIHRoaXMub2xkdGlwID0gdGhpcy50aXA7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMuY29sdW1uID0gMDtcbiAgICB0aGlzLmJsYW5rID0gZmFsc2U7XG4gICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGZhbHNlO1xuICAgIHRoaXMubGluZU51bWJlciArPSAxO1xuXG4gICAgLy8gcmVwbGFjZSBOVUwgY2hhcmFjdGVycyBmb3Igc2VjdXJpdHlcbiAgICBpZiAobG4uaW5kZXhPZignXFx1MDAwMCcpICE9PSAtMSkge1xuICAgICAgICBsbiA9IGxuLnJlcGxhY2UoL1xcMC9nLCAnXFx1RkZGRCcpO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudExpbmUgPSBsbjtcblxuICAgIC8vIEZvciBlYWNoIGNvbnRhaW5pbmcgYmxvY2ssIHRyeSB0byBwYXJzZSB0aGUgYXNzb2NpYXRlZCBsaW5lIHN0YXJ0LlxuICAgIC8vIEJhaWwgb3V0IG9uIGZhaWx1cmU6IGNvbnRhaW5lciB3aWxsIHBvaW50IHRvIHRoZSBsYXN0IG1hdGNoaW5nIGJsb2NrLlxuICAgIC8vIFNldCBhbGxfbWF0Y2hlZCB0byBmYWxzZSBpZiBub3QgYWxsIGNvbnRhaW5lcnMgbWF0Y2guXG4gICAgdmFyIGxhc3RDaGlsZDtcbiAgICB3aGlsZSAoKGxhc3RDaGlsZCA9IGNvbnRhaW5lci5fbGFzdENoaWxkKSAmJiBsYXN0Q2hpbGQuX29wZW4pIHtcbiAgICAgICAgY29udGFpbmVyID0gbGFzdENoaWxkO1xuXG4gICAgICAgIHRoaXMuZmluZE5leHROb25zcGFjZSgpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5ibG9ja3NbY29udGFpbmVyLnR5cGVdLmNvbnRpbnVlKHRoaXMsIGNvbnRhaW5lcikpIHtcbiAgICAgICAgY2FzZSAwOiAvLyB3ZSd2ZSBtYXRjaGVkLCBrZWVwIGdvaW5nXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOiAvLyB3ZSd2ZSBmYWlsZWQgdG8gbWF0Y2ggYSBibG9ja1xuICAgICAgICAgICAgYWxsX21hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6IC8vIHdlJ3ZlIGhpdCBlbmQgb2YgbGluZSBmb3IgZmVuY2VkIGNvZGUgY2xvc2UgYW5kIGNhbiByZXR1cm5cbiAgICAgICAgICAgIHRoaXMubGFzdExpbmVMZW5ndGggPSBsbi5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyAnY29udGludWUgcmV0dXJuZWQgaWxsZWdhbCB2YWx1ZSwgbXVzdCBiZSAwLCAxLCBvciAyJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFsbF9tYXRjaGVkKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIuX3BhcmVudDsgLy8gYmFjayB1cCB0byBsYXN0IG1hdGNoaW5nIGJsb2NrXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYWxsQ2xvc2VkID0gKGNvbnRhaW5lciA9PT0gdGhpcy5vbGR0aXApO1xuICAgIHRoaXMubGFzdE1hdGNoZWRDb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB2YXIgbWF0Y2hlZExlYWYgPSBjb250YWluZXIudHlwZSAhPT0gJ3BhcmFncmFwaCcgJiZcbiAgICAgICAgICAgIGJsb2Nrc1tjb250YWluZXIudHlwZV0uYWNjZXB0c0xpbmVzO1xuICAgIHZhciBzdGFydHMgPSB0aGlzLmJsb2NrU3RhcnRzO1xuICAgIHZhciBzdGFydHNMZW4gPSBzdGFydHMubGVuZ3RoO1xuICAgIC8vIFVubGVzcyBsYXN0IG1hdGNoZWQgY29udGFpbmVyIGlzIGEgY29kZSBibG9jaywgdHJ5IG5ldyBjb250YWluZXIgc3RhcnRzLFxuICAgIC8vIGFkZGluZyBjaGlsZHJlbiB0byB0aGUgbGFzdCBtYXRjaGVkIGNvbnRhaW5lcjpcbiAgICB3aGlsZSAoIW1hdGNoZWRMZWFmKSB7XG5cbiAgICAgICAgdGhpcy5maW5kTmV4dE5vbnNwYWNlKCk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBhIGxpdHRsZSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb246XG4gICAgICAgIGlmICghdGhpcy5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgIXJlTWF5YmVTcGVjaWFsLnRlc3QobG4uc2xpY2UodGhpcy5uZXh0Tm9uc3BhY2UpKSkge1xuICAgICAgICAgICAgdGhpcy5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzdGFydHNMZW4pIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBzdGFydHNbaV0odGhpcywgY29udGFpbmVyKTtcbiAgICAgICAgICAgIGlmIChyZXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLnRpcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy50aXA7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZExlYWYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSA9PT0gc3RhcnRzTGVuKSB7IC8vIG5vdGhpbmcgbWF0Y2hlZFxuICAgICAgICAgICAgdGhpcy5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoYXQgcmVtYWlucyBhdCB0aGUgb2Zmc2V0IGlzIGEgdGV4dCBsaW5lLiAgQWRkIHRoZSB0ZXh0IHRvIHRoZVxuICAgIC8vIGFwcHJvcHJpYXRlIGNvbnRhaW5lci5cblxuICAgLy8gRmlyc3QgY2hlY2sgZm9yIGEgbGF6eSBwYXJhZ3JhcGggY29udGludWF0aW9uOlxuICAgIGlmICghdGhpcy5hbGxDbG9zZWQgJiYgIXRoaXMuYmxhbmsgJiZcbiAgICAgICAgdGhpcy50aXAudHlwZSA9PT0gJ3BhcmFncmFwaCcpIHtcbiAgICAgICAgLy8gbGF6eSBwYXJhZ3JhcGggY29udGludWF0aW9uXG4gICAgICAgIHRoaXMuYWRkTGluZSgpO1xuXG4gICAgfSBlbHNlIHsgLy8gbm90IGEgbGF6eSBjb250aW51YXRpb25cblxuICAgICAgICAvLyBmaW5hbGl6ZSBhbnkgYmxvY2tzIG5vdCBtYXRjaGVkXG4gICAgICAgIHRoaXMuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgaWYgKHRoaXMuYmxhbmsgJiYgY29udGFpbmVyLmxhc3RDaGlsZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLmxhc3RDaGlsZC5fbGFzdExpbmVCbGFuayA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0ID0gY29udGFpbmVyLnR5cGU7XG5cbiAgICAgICAgLy8gQmxvY2sgcXVvdGUgbGluZXMgYXJlIG5ldmVyIGJsYW5rIGFzIHRoZXkgc3RhcnQgd2l0aCA+XG4gICAgICAgIC8vIGFuZCB3ZSBkb24ndCBjb3VudCBibGFua3MgaW4gZmVuY2VkIGNvZGUgZm9yIHB1cnBvc2VzIG9mIHRpZ2h0L2xvb3NlXG4gICAgICAgIC8vIGxpc3RzIG9yIGJyZWFraW5nIG91dCBvZiBsaXN0cy4gIFdlIGFsc28gZG9uJ3Qgc2V0IF9sYXN0TGluZUJsYW5rXG4gICAgICAgIC8vIG9uIGFuIGVtcHR5IGxpc3QgaXRlbSwgb3IgaWYgd2UganVzdCBjbG9zZWQgYSBmZW5jZWQgYmxvY2suXG4gICAgICAgIHZhciBsYXN0TGluZUJsYW5rID0gdGhpcy5ibGFuayAmJlxuICAgICAgICAgICAgISh0ID09PSAnYmxvY2tfcXVvdGUnIHx8XG4gICAgICAgICAgICAgICh0ID09PSAnY29kZV9ibG9jaycgJiYgY29udGFpbmVyLl9pc0ZlbmNlZCkgfHxcbiAgICAgICAgICAgICAgKHQgPT09ICdpdGVtJyAmJlxuICAgICAgICAgICAgICAgIWNvbnRhaW5lci5fZmlyc3RDaGlsZCAmJlxuICAgICAgICAgICAgICAgY29udGFpbmVyLnNvdXJjZXBvc1swXVswXSA9PT0gdGhpcy5saW5lTnVtYmVyKSk7XG5cbiAgICAgICAgLy8gcHJvcGFnYXRlIGxhc3RMaW5lQmxhbmsgdXAgdGhyb3VnaCBwYXJlbnRzOlxuICAgICAgICB2YXIgY29udCA9IGNvbnRhaW5lcjtcbiAgICAgICAgd2hpbGUgKGNvbnQpIHtcbiAgICAgICAgICAgIGNvbnQuX2xhc3RMaW5lQmxhbmsgPSBsYXN0TGluZUJsYW5rO1xuICAgICAgICAgICAgY29udCA9IGNvbnQuX3BhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJsb2Nrc1t0XS5hY2NlcHRzTGluZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGluZSgpO1xuICAgICAgICAgICAgLy8gaWYgSHRtbEJsb2NrLCBjaGVjayBmb3IgZW5kIGNvbmRpdGlvblxuICAgICAgICAgICAgaWYgKHQgPT09ICdodG1sX2Jsb2NrJyAmJlxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5faHRtbEJsb2NrVHlwZSA+PSAxICYmXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLl9odG1sQmxvY2tUeXBlIDw9IDUgJiZcbiAgICAgICAgICAgICAgICByZUh0bWxCbG9ja0Nsb3NlW2NvbnRhaW5lci5faHRtbEJsb2NrVHlwZV0udGVzdCh0aGlzLmN1cnJlbnRMaW5lLnNsaWNlKHRoaXMub2Zmc2V0KSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmFsaXplKGNvbnRhaW5lciwgdGhpcy5saW5lTnVtYmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2Zmc2V0IDwgbG4ubGVuZ3RoICYmICF0aGlzLmJsYW5rKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcGFyYWdyYXBoIGNvbnRhaW5lciBmb3IgbGluZVxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5hZGRDaGlsZCgncGFyYWdyYXBoJywgdGhpcy5vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICB0aGlzLmFkZExpbmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxhc3RMaW5lTGVuZ3RoID0gbG4ubGVuZ3RoO1xufTtcblxuLy8gRmluYWxpemUgYSBibG9jay4gIENsb3NlIGl0IGFuZCBkbyBhbnkgbmVjZXNzYXJ5IHBvc3Rwcm9jZXNzaW5nLFxuLy8gZS5nLiBjcmVhdGluZyBzdHJpbmdfY29udGVudCBmcm9tIHN0cmluZ3MsIHNldHRpbmcgdGhlICd0aWdodCdcbi8vIG9yICdsb29zZScgc3RhdHVzIG9mIGEgbGlzdCwgYW5kIHBhcnNpbmcgdGhlIGJlZ2lubmluZ3Ncbi8vIG9mIHBhcmFncmFwaHMgZm9yIHJlZmVyZW5jZSBkZWZpbml0aW9ucy4gIFJlc2V0IHRoZSB0aXAgdG8gdGhlXG4vLyBwYXJlbnQgb2YgdGhlIGNsb3NlZCBibG9jay5cbnZhciBmaW5hbGl6ZSA9IGZ1bmN0aW9uKGJsb2NrLCBsaW5lTnVtYmVyKSB7XG4gICAgdmFyIGFib3ZlID0gYmxvY2suX3BhcmVudDtcbiAgICBibG9jay5fb3BlbiA9IGZhbHNlO1xuICAgIGJsb2NrLnNvdXJjZXBvc1sxXSA9IFtsaW5lTnVtYmVyLCB0aGlzLmxhc3RMaW5lTGVuZ3RoXTtcblxuICAgIHRoaXMuYmxvY2tzW2Jsb2NrLnR5cGVdLmZpbmFsaXplKHRoaXMsIGJsb2NrKTtcblxuICAgIHRoaXMudGlwID0gYWJvdmU7XG59O1xuXG4vLyBXYWxrIHRocm91Z2ggYSBibG9jayAmIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5LCBwYXJzaW5nIHN0cmluZyBjb250ZW50XG4vLyBpbnRvIGlubGluZSBjb250ZW50IHdoZXJlIGFwcHJvcHJpYXRlLlxudmFyIHByb2Nlc3NJbmxpbmVzID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgbm9kZSwgZXZlbnQsIHQ7XG4gICAgdmFyIHdhbGtlciA9IGJsb2NrLndhbGtlcigpO1xuICAgIHRoaXMuaW5saW5lUGFyc2VyLnJlZm1hcCA9IHRoaXMucmVmbWFwO1xuICAgIHRoaXMuaW5saW5lUGFyc2VyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgd2hpbGUgKChldmVudCA9IHdhbGtlci5uZXh0KCkpKSB7XG4gICAgICAgIG5vZGUgPSBldmVudC5ub2RlO1xuICAgICAgICB0ID0gbm9kZS50eXBlO1xuICAgICAgICBpZiAoIWV2ZW50LmVudGVyaW5nICYmICh0ID09PSAncGFyYWdyYXBoJyB8fCB0ID09PSAnaGVhZGluZycpKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVBhcnNlci5wYXJzZShub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBEb2N1bWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkb2MgPSBuZXcgTm9kZSgnZG9jdW1lbnQnLCBbWzEsIDFdLCBbMCwgMF1dKTtcbiAgICByZXR1cm4gZG9jO1xufTtcblxuLy8gVGhlIG1haW4gcGFyc2luZyBmdW5jdGlvbi4gIFJldHVybnMgYSBwYXJzZWQgZG9jdW1lbnQgQVNULlxudmFyIHBhcnNlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICB0aGlzLmRvYyA9IG5ldyBEb2N1bWVudCgpO1xuICAgIHRoaXMudGlwID0gdGhpcy5kb2M7XG4gICAgdGhpcy5yZWZtYXAgPSB7fTtcbiAgICB0aGlzLmxpbmVOdW1iZXIgPSAwO1xuICAgIHRoaXMubGFzdExpbmVMZW5ndGggPSAwO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICB0aGlzLmNvbHVtbiA9IDA7XG4gICAgdGhpcy5sYXN0TWF0Y2hlZENvbnRhaW5lciA9IHRoaXMuZG9jO1xuICAgIHRoaXMuY3VycmVudExpbmUgPSBcIlwiO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWUoXCJwcmVwYXJpbmcgaW5wdXRcIik7IH1cbiAgICB2YXIgbGluZXMgPSBpbnB1dC5zcGxpdChyZUxpbmVFbmRpbmcpO1xuICAgIHZhciBsZW4gPSBsaW5lcy5sZW5ndGg7XG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQoaW5wdXQubGVuZ3RoIC0gMSkgPT09IENfTkVXTElORSkge1xuICAgICAgICAvLyBpZ25vcmUgbGFzdCBibGFuayBsaW5lIGNyZWF0ZWQgYnkgZmluYWwgbmV3bGluZVxuICAgICAgICBsZW4gLT0gMTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZUVuZChcInByZXBhcmluZyBpbnB1dFwiKTsgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWUoXCJibG9jayBwYXJzaW5nXCIpOyB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0aGlzLmluY29ycG9yYXRlTGluZShsaW5lc1tpXSk7XG4gICAgfVxuICAgIHdoaWxlICh0aGlzLnRpcCkge1xuICAgICAgICB0aGlzLmZpbmFsaXplKHRoaXMudGlwLCBsZW4pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lRW5kKFwiYmxvY2sgcGFyc2luZ1wiKTsgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWUoXCJpbmxpbmUgcGFyc2luZ1wiKTsgfVxuICAgIHRoaXMucHJvY2Vzc0lubGluZXModGhpcy5kb2MpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWVFbmQoXCJpbmxpbmUgcGFyc2luZ1wiKTsgfVxuICAgIHJldHVybiB0aGlzLmRvYztcbn07XG5cblxuLy8gVGhlIFBhcnNlciBvYmplY3QuXG5mdW5jdGlvbiBQYXJzZXIob3B0aW9ucyl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZG9jOiBuZXcgRG9jdW1lbnQoKSxcbiAgICAgICAgYmxvY2tzOiBibG9ja3MsXG4gICAgICAgIGJsb2NrU3RhcnRzOiBibG9ja1N0YXJ0cyxcbiAgICAgICAgdGlwOiB0aGlzLmRvYyxcbiAgICAgICAgb2xkdGlwOiB0aGlzLmRvYyxcbiAgICAgICAgY3VycmVudExpbmU6IFwiXCIsXG4gICAgICAgIGxpbmVOdW1iZXI6IDAsXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgY29sdW1uOiAwLFxuICAgICAgICBuZXh0Tm9uc3BhY2U6IDAsXG4gICAgICAgIG5leHROb25zcGFjZUNvbHVtbjogMCxcbiAgICAgICAgaW5kZW50OiAwLFxuICAgICAgICBpbmRlbnRlZDogZmFsc2UsXG4gICAgICAgIGJsYW5rOiBmYWxzZSxcbiAgICAgICAgcGFydGlhbGx5Q29uc3VtZWRUYWI6IGZhbHNlLFxuICAgICAgICBhbGxDbG9zZWQ6IHRydWUsXG4gICAgICAgIGxhc3RNYXRjaGVkQ29udGFpbmVyOiB0aGlzLmRvYyxcbiAgICAgICAgcmVmbWFwOiB7fSxcbiAgICAgICAgbGFzdExpbmVMZW5ndGg6IDAsXG4gICAgICAgIGlubGluZVBhcnNlcjogbmV3IElubGluZVBhcnNlcihvcHRpb25zKSxcbiAgICAgICAgZmluZE5leHROb25zcGFjZTogZmluZE5leHROb25zcGFjZSxcbiAgICAgICAgYWR2YW5jZU9mZnNldDogYWR2YW5jZU9mZnNldCxcbiAgICAgICAgYWR2YW5jZU5leHROb25zcGFjZTogYWR2YW5jZU5leHROb25zcGFjZSxcbiAgICAgICAgYWRkTGluZTogYWRkTGluZSxcbiAgICAgICAgYWRkQ2hpbGQ6IGFkZENoaWxkLFxuICAgICAgICBpbmNvcnBvcmF0ZUxpbmU6IGluY29ycG9yYXRlTGluZSxcbiAgICAgICAgZmluYWxpemU6IGZpbmFsaXplLFxuICAgICAgICBwcm9jZXNzSW5saW5lczogcHJvY2Vzc0lubGluZXMsXG4gICAgICAgIGNsb3NlVW5tYXRjaGVkQmxvY2tzOiBjbG9zZVVubWF0Y2hlZEJsb2NrcyxcbiAgICAgICAgcGFyc2U6IHBhcnNlLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zIHx8IHt9XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ibG9ja3MuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBlbmNvZGVDYWNoZSA9IHt9O1xuXG5cbi8vIENyZWF0ZSBhIGxvb2t1cCBhcnJheSB3aGVyZSBhbnl0aGluZyBidXQgY2hhcmFjdGVycyBpbiBgY2hhcnNgIHN0cmluZ1xuLy8gYW5kIGFscGhhbnVtZXJpYyBjaGFycyBpcyBwZXJjZW50LWVuY29kZWQuXG4vL1xuZnVuY3Rpb24gZ2V0RW5jb2RlQ2FjaGUoZXhjbHVkZSkge1xuICB2YXIgaSwgY2gsIGNhY2hlID0gZW5jb2RlQ2FjaGVbZXhjbHVkZV07XG4gIGlmIChjYWNoZSkgeyByZXR1cm4gY2FjaGU7IH1cblxuICBjYWNoZSA9IGVuY29kZUNhY2hlW2V4Y2x1ZGVdID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IDEyODsgaSsrKSB7XG4gICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuXG4gICAgaWYgKC9eWzAtOWEtel0kL2kudGVzdChjaCkpIHtcbiAgICAgIC8vIGFsd2F5cyBhbGxvdyB1bmVuY29kZWQgYWxwaGFudW1lcmljIGNoYXJhY3RlcnNcbiAgICAgIGNhY2hlLnB1c2goY2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZS5wdXNoKCclJyArICgnMCcgKyBpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpKS5zbGljZSgtMikpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleGNsdWRlLmxlbmd0aDsgaSsrKSB7XG4gICAgY2FjaGVbZXhjbHVkZS5jaGFyQ29kZUF0KGkpXSA9IGV4Y2x1ZGVbaV07XG4gIH1cblxuICByZXR1cm4gY2FjaGU7XG59XG5cblxuLy8gRW5jb2RlIHVuc2FmZSBjaGFyYWN0ZXJzIHdpdGggcGVyY2VudC1lbmNvZGluZywgc2tpcHBpbmcgYWxyZWFkeVxuLy8gZW5jb2RlZCBzZXF1ZW5jZXMuXG4vL1xuLy8gIC0gc3RyaW5nICAgICAgIC0gc3RyaW5nIHRvIGVuY29kZVxuLy8gIC0gZXhjbHVkZSAgICAgIC0gbGlzdCBvZiBjaGFyYWN0ZXJzIHRvIGlnbm9yZSAoaW4gYWRkaXRpb24gdG8gYS16QS1aMC05KVxuLy8gIC0ga2VlcEVzY2FwZWQgIC0gZG9uJ3QgZW5jb2RlICclJyBpbiBhIGNvcnJlY3QgZXNjYXBlIHNlcXVlbmNlIChkZWZhdWx0OiB0cnVlKVxuLy9cbmZ1bmN0aW9uIGVuY29kZShzdHJpbmcsIGV4Y2x1ZGUsIGtlZXBFc2NhcGVkKSB7XG4gIHZhciBpLCBsLCBjb2RlLCBuZXh0Q29kZSwgY2FjaGUsXG4gICAgICByZXN1bHQgPSAnJztcblxuICBpZiAodHlwZW9mIGV4Y2x1ZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZW5jb2RlKHN0cmluZywga2VlcEVzY2FwZWQpXG4gICAga2VlcEVzY2FwZWQgID0gZXhjbHVkZTtcbiAgICBleGNsdWRlID0gZW5jb2RlLmRlZmF1bHRDaGFycztcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2VlcEVzY2FwZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAga2VlcEVzY2FwZWQgPSB0cnVlO1xuICB9XG5cbiAgY2FjaGUgPSBnZXRFbmNvZGVDYWNoZShleGNsdWRlKTtcblxuICBmb3IgKGkgPSAwLCBsID0gc3RyaW5nLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvZGUgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChrZWVwRXNjYXBlZCAmJiBjb2RlID09PSAweDI1IC8qICUgKi8gJiYgaSArIDIgPCBsKSB7XG4gICAgICBpZiAoL15bMC05YS1mXXsyfSQvaS50ZXN0KHN0cmluZy5zbGljZShpICsgMSwgaSArIDMpKSkge1xuICAgICAgICByZXN1bHQgKz0gc3RyaW5nLnNsaWNlKGksIGkgKyAzKTtcbiAgICAgICAgaSArPSAyO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA8IDEyOCkge1xuICAgICAgcmVzdWx0ICs9IGNhY2hlW2NvZGVdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPj0gMHhEODAwICYmIGNvZGUgPD0gMHhERkZGKSB7XG4gICAgICBpZiAoY29kZSA+PSAweEQ4MDAgJiYgY29kZSA8PSAweERCRkYgJiYgaSArIDEgPCBsKSB7XG4gICAgICAgIG5leHRDb2RlID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICBpZiAobmV4dENvZGUgPj0gMHhEQzAwICYmIG5leHRDb2RlIDw9IDB4REZGRikge1xuICAgICAgICAgIHJlc3VsdCArPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nW2ldICsgc3RyaW5nW2kgKyAxXSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyVFRiVCRiVCRCc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ1tpXSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5lbmNvZGUuZGVmYXVsdENoYXJzICAgPSBcIjsvPzpAJj0rJCwtXy4hfionKCkjXCI7XG5lbmNvZGUuY29tcG9uZW50Q2hhcnMgPSBcIi1fLiF+KicoKVwiO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbWR1cmwvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbid1c2Ugc3RyaWN0JztcblxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cbnZhciBkZWNvZGVDYWNoZSA9IHt9O1xuXG5mdW5jdGlvbiBnZXREZWNvZGVDYWNoZShleGNsdWRlKSB7XG4gIHZhciBpLCBjaCwgY2FjaGUgPSBkZWNvZGVDYWNoZVtleGNsdWRlXTtcbiAgaWYgKGNhY2hlKSB7IHJldHVybiBjYWNoZTsgfVxuXG4gIGNhY2hlID0gZGVjb2RlQ2FjaGVbZXhjbHVkZV0gPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgMTI4OyBpKyspIHtcbiAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSk7XG4gICAgY2FjaGUucHVzaChjaCk7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhjbHVkZS5sZW5ndGg7IGkrKykge1xuICAgIGNoID0gZXhjbHVkZS5jaGFyQ29kZUF0KGkpO1xuICAgIGNhY2hlW2NoXSA9ICclJyArICgnMCcgKyBjaC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSkuc2xpY2UoLTIpO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlO1xufVxuXG5cbi8vIERlY29kZSBwZXJjZW50LWVuY29kZWQgc3RyaW5nLlxuLy9cbmZ1bmN0aW9uIGRlY29kZShzdHJpbmcsIGV4Y2x1ZGUpIHtcbiAgdmFyIGNhY2hlO1xuXG4gIGlmICh0eXBlb2YgZXhjbHVkZSAhPT0gJ3N0cmluZycpIHtcbiAgICBleGNsdWRlID0gZGVjb2RlLmRlZmF1bHRDaGFycztcbiAgfVxuXG4gIGNhY2hlID0gZ2V0RGVjb2RlQ2FjaGUoZXhjbHVkZSk7XG5cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oJVthLWYwLTldezJ9KSsvZ2ksIGZ1bmN0aW9uKHNlcSkge1xuICAgIHZhciBpLCBsLCBiMSwgYjIsIGIzLCBiNCwgY2hyLFxuICAgICAgICByZXN1bHQgPSAnJztcblxuICAgIGZvciAoaSA9IDAsIGwgPSBzZXEubGVuZ3RoOyBpIDwgbDsgaSArPSAzKSB7XG4gICAgICBiMSA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgMSwgaSArIDMpLCAxNik7XG5cbiAgICAgIGlmIChiMSA8IDB4ODApIHtcbiAgICAgICAgcmVzdWx0ICs9IGNhY2hlW2IxXTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICgoYjEgJiAweEUwKSA9PT0gMHhDMCAmJiAoaSArIDMgPCBsKSkge1xuICAgICAgICAvLyAxMTB4eHh4eCAxMHh4eHh4eFxuICAgICAgICBiMiA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNCwgaSArIDYpLCAxNik7XG5cbiAgICAgICAgaWYgKChiMiAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgY2hyID0gKChiMSA8PCA2KSAmIDB4N0MwKSB8IChiMiAmIDB4M0YpO1xuXG4gICAgICAgICAgaWYgKGNociA8IDB4ODApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKGIxICYgMHhGMCkgPT09IDB4RTAgJiYgKGkgKyA2IDwgbCkpIHtcbiAgICAgICAgLy8gMTExMHh4eHggMTB4eHh4eHggMTB4eHh4eHhcbiAgICAgICAgYjIgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDQsIGkgKyA2KSwgMTYpO1xuICAgICAgICBiMyA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNywgaSArIDkpLCAxNik7XG5cbiAgICAgICAgaWYgKChiMiAmIDB4QzApID09PSAweDgwICYmIChiMyAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgY2hyID0gKChiMSA8PCAxMikgJiAweEYwMDApIHwgKChiMiA8PCA2KSAmIDB4RkMwKSB8IChiMyAmIDB4M0YpO1xuXG4gICAgICAgICAgaWYgKGNociA8IDB4ODAwIHx8IChjaHIgPj0gMHhEODAwICYmIGNociA8PSAweERGRkYpKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcdWZmZmRcXHVmZmZkXFx1ZmZmZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaSArPSA2O1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgoYjEgJiAweEY4KSA9PT0gMHhGMCAmJiAoaSArIDkgPCBsKSkge1xuICAgICAgICAvLyAxMTExMTB4eCAxMHh4eHh4eCAxMHh4eHh4eCAxMHh4eHh4eFxuICAgICAgICBiMiA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNCwgaSArIDYpLCAxNik7XG4gICAgICAgIGIzID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA3LCBpICsgOSksIDE2KTtcbiAgICAgICAgYjQgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDEwLCBpICsgMTIpLCAxNik7XG5cbiAgICAgICAgaWYgKChiMiAmIDB4QzApID09PSAweDgwICYmIChiMyAmIDB4QzApID09PSAweDgwICYmIChiNCAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgY2hyID0gKChiMSA8PCAxOCkgJiAweDFDMDAwMCkgfCAoKGIyIDw8IDEyKSAmIDB4M0YwMDApIHwgKChiMyA8PCA2KSAmIDB4RkMwKSB8IChiNCAmIDB4M0YpO1xuXG4gICAgICAgICAgaWYgKGNociA8IDB4MTAwMDAgfHwgY2hyID4gMHgxMEZGRkYpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmRcXHVmZmZkXFx1ZmZmZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNociAtPSAweDEwMDAwO1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhEODAwICsgKGNociA+PiAxMCksIDB4REMwMCArIChjaHIgJiAweDNGRikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGkgKz0gOTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHQgKz0gJ1xcdWZmZmQnO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xufVxuXG5cbmRlY29kZS5kZWZhdWx0Q2hhcnMgICA9ICc7Lz86QCY9KyQsIyc7XG5kZWNvZGUuY29tcG9uZW50Q2hhcnMgPSAnJztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21kdXJsL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGludmVyc2VYTUwgPSBnZXRJbnZlcnNlT2JqKHJlcXVpcmUoXCIuLi9tYXBzL3htbC5qc29uXCIpKSxcbiAgICB4bWxSZXBsYWNlciA9IGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlWE1MKTtcblxuZXhwb3J0cy5YTUwgPSBnZXRJbnZlcnNlKGludmVyc2VYTUwsIHhtbFJlcGxhY2VyKTtcblxudmFyIGludmVyc2VIVE1MID0gZ2V0SW52ZXJzZU9iaihyZXF1aXJlKFwiLi4vbWFwcy9lbnRpdGllcy5qc29uXCIpKSxcbiAgICBodG1sUmVwbGFjZXIgPSBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZUhUTUwpO1xuXG5leHBvcnRzLkhUTUwgPSBnZXRJbnZlcnNlKGludmVyc2VIVE1MLCBodG1sUmVwbGFjZXIpO1xuXG5mdW5jdGlvbiBnZXRJbnZlcnNlT2JqKG9iail7XG5cdHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24oaW52ZXJzZSwgbmFtZSl7XG5cdFx0aW52ZXJzZVtvYmpbbmFtZV1dID0gXCImXCIgKyBuYW1lICsgXCI7XCI7XG5cdFx0cmV0dXJuIGludmVyc2U7XG5cdH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2Upe1xuXHR2YXIgc2luZ2xlID0gW10sXG5cdCAgICBtdWx0aXBsZSA9IFtdO1xuXG5cdE9iamVjdC5rZXlzKGludmVyc2UpLmZvckVhY2goZnVuY3Rpb24oayl7XG5cdFx0aWYoay5sZW5ndGggPT09IDEpe1xuXHRcdFx0c2luZ2xlLnB1c2goXCJcXFxcXCIgKyBrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bXVsdGlwbGUucHVzaChrKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vVE9ETyBhZGQgcmFuZ2VzXG5cdG11bHRpcGxlLnVuc2hpZnQoXCJbXCIgKyBzaW5nbGUuam9pbihcIlwiKSArIFwiXVwiKTtcblxuXHRyZXR1cm4gbmV3IFJlZ0V4cChtdWx0aXBsZS5qb2luKFwifFwiKSwgXCJnXCIpO1xufVxuXG52YXIgcmVfbm9uQVNDSUkgPSAvW15cXDAtXFx4N0ZdL2csXG4gICAgcmVfYXN0cmFsU3ltYm9scyA9IC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2c7XG5cbmZ1bmN0aW9uIHNpbmdsZUNoYXJSZXBsYWNlcihjKXtcblx0cmV0dXJuIFwiJiN4XCIgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIjtcIjtcbn1cblxuZnVuY3Rpb24gYXN0cmFsUmVwbGFjZXIoYyl7XG5cdC8vIGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXG5cdHZhciBoaWdoID0gYy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgbG93ICA9IGMuY2hhckNvZGVBdCgxKTtcblx0dmFyIGNvZGVQb2ludCA9IChoaWdoIC0gMHhEODAwKSAqIDB4NDAwICsgbG93IC0gMHhEQzAwICsgMHgxMDAwMDtcblx0cmV0dXJuIFwiJiN4XCIgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIjtcIjtcbn1cblxuZnVuY3Rpb24gZ2V0SW52ZXJzZShpbnZlcnNlLCByZSl7XG5cdGZ1bmN0aW9uIGZ1bmMobmFtZSl7XG5cdFx0cmV0dXJuIGludmVyc2VbbmFtZV07XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XG5cdFx0cmV0dXJuIGRhdGFcblx0XHRcdFx0LnJlcGxhY2UocmUsIGZ1bmMpXG5cdFx0XHRcdC5yZXBsYWNlKHJlX2FzdHJhbFN5bWJvbHMsIGFzdHJhbFJlcGxhY2VyKVxuXHRcdFx0XHQucmVwbGFjZShyZV9ub25BU0NJSSwgc2luZ2xlQ2hhclJlcGxhY2VyKTtcblx0fTtcbn1cblxudmFyIHJlX3htbENoYXJzID0gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2VYTUwpO1xuXG5mdW5jdGlvbiBlc2NhcGVYTUwoZGF0YSl7XG5cdHJldHVybiBkYXRhXG5cdFx0XHQucmVwbGFjZShyZV94bWxDaGFycywgc2luZ2xlQ2hhclJlcGxhY2VyKVxuXHRcdFx0LnJlcGxhY2UocmVfYXN0cmFsU3ltYm9scywgYXN0cmFsUmVwbGFjZXIpXG5cdFx0XHQucmVwbGFjZShyZV9ub25BU0NJSSwgc2luZ2xlQ2hhclJlcGxhY2VyKTtcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGVYTUw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZW50aXR5TWFwID0gcmVxdWlyZShcIi4uL21hcHMvZW50aXRpZXMuanNvblwiKSxcbiAgICBsZWdhY3lNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9sZWdhY3kuanNvblwiKSxcbiAgICB4bWxNYXAgICAgPSByZXF1aXJlKFwiLi4vbWFwcy94bWwuanNvblwiKSxcbiAgICBkZWNvZGVDb2RlUG9pbnQgPSByZXF1aXJlKFwiLi9kZWNvZGVfY29kZXBvaW50LmpzXCIpO1xuXG52YXIgZGVjb2RlWE1MU3RyaWN0ICA9IGdldFN0cmljdERlY29kZXIoeG1sTWFwKSxcbiAgICBkZWNvZGVIVE1MU3RyaWN0ID0gZ2V0U3RyaWN0RGVjb2RlcihlbnRpdHlNYXApO1xuXG5mdW5jdGlvbiBnZXRTdHJpY3REZWNvZGVyKG1hcCl7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMobWFwKS5qb2luKFwifFwiKSxcblx0ICAgIHJlcGxhY2UgPSBnZXRSZXBsYWNlcihtYXApO1xuXG5cdGtleXMgKz0gXCJ8I1t4WF1bXFxcXGRhLWZBLUZdK3wjXFxcXGQrXCI7XG5cblx0dmFyIHJlID0gbmV3IFJlZ0V4cChcIiYoPzpcIiArIGtleXMgKyBcIik7XCIsIFwiZ1wiKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc3RyKXtcblx0XHRyZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZSk7XG5cdH07XG59XG5cbnZhciBkZWNvZGVIVE1MID0gKGZ1bmN0aW9uKCl7XG5cdHZhciBsZWdhY3kgPSBPYmplY3Qua2V5cyhsZWdhY3lNYXApXG5cdFx0LnNvcnQoc29ydGVyKTtcblxuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGVudGl0eU1hcClcblx0XHQuc29ydChzb3J0ZXIpO1xuXG5cdGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0aWYobGVnYWN5W2pdID09PSBrZXlzW2ldKXtcblx0XHRcdGtleXNbaV0gKz0gXCI7P1wiO1xuXHRcdFx0aisrO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXlzW2ldICs9IFwiO1wiO1xuXHRcdH1cblx0fVxuXG5cdHZhciByZSA9IG5ldyBSZWdFeHAoXCImKD86XCIgKyBrZXlzLmpvaW4oXCJ8XCIpICsgXCJ8I1t4WF1bXFxcXGRhLWZBLUZdKzs/fCNcXFxcZCs7PylcIiwgXCJnXCIpLFxuXHQgICAgcmVwbGFjZSA9IGdldFJlcGxhY2VyKGVudGl0eU1hcCk7XG5cblx0ZnVuY3Rpb24gcmVwbGFjZXIoc3RyKXtcblx0XHRpZihzdHIuc3Vic3RyKC0xKSAhPT0gXCI7XCIpIHN0ciArPSBcIjtcIjtcblx0XHRyZXR1cm4gcmVwbGFjZShzdHIpO1xuXHR9XG5cblx0Ly9UT0RPIGNvbnNpZGVyIGNyZWF0aW5nIGEgbWVyZ2VkIG1hcFxuXHRyZXR1cm4gZnVuY3Rpb24oc3RyKXtcblx0XHRyZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZXIpO1xuXHR9O1xufSgpKTtcblxuZnVuY3Rpb24gc29ydGVyKGEsIGIpe1xuXHRyZXR1cm4gYSA8IGIgPyAxIDogLTE7XG59XG5cbmZ1bmN0aW9uIGdldFJlcGxhY2VyKG1hcCl7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlKHN0cil7XG5cdFx0aWYoc3RyLmNoYXJBdCgxKSA9PT0gXCIjXCIpe1xuXHRcdFx0aWYoc3RyLmNoYXJBdCgyKSA9PT0gXCJYXCIgfHwgc3RyLmNoYXJBdCgyKSA9PT0gXCJ4XCIpe1xuXHRcdFx0XHRyZXR1cm4gZGVjb2RlQ29kZVBvaW50KHBhcnNlSW50KHN0ci5zdWJzdHIoMyksIDE2KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVjb2RlQ29kZVBvaW50KHBhcnNlSW50KHN0ci5zdWJzdHIoMiksIDEwKSk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXBbc3RyLnNsaWNlKDEsIC0xKV07XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRYTUw6IGRlY29kZVhNTFN0cmljdCxcblx0SFRNTDogZGVjb2RlSFRNTCxcblx0SFRNTFN0cmljdDogZGVjb2RlSFRNTFN0cmljdFxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcIkFhY3V0ZVwiOlwiw4FcIixcImFhY3V0ZVwiOlwiw6FcIixcIkFjaXJjXCI6XCLDglwiLFwiYWNpcmNcIjpcIsOiXCIsXCJhY3V0ZVwiOlwiwrRcIixcIkFFbGlnXCI6XCLDhlwiLFwiYWVsaWdcIjpcIsOmXCIsXCJBZ3JhdmVcIjpcIsOAXCIsXCJhZ3JhdmVcIjpcIsOgXCIsXCJhbXBcIjpcIiZcIixcIkFNUFwiOlwiJlwiLFwiQXJpbmdcIjpcIsOFXCIsXCJhcmluZ1wiOlwiw6VcIixcIkF0aWxkZVwiOlwiw4NcIixcImF0aWxkZVwiOlwiw6NcIixcIkF1bWxcIjpcIsOEXCIsXCJhdW1sXCI6XCLDpFwiLFwiYnJ2YmFyXCI6XCLCplwiLFwiQ2NlZGlsXCI6XCLDh1wiLFwiY2NlZGlsXCI6XCLDp1wiLFwiY2VkaWxcIjpcIsK4XCIsXCJjZW50XCI6XCLColwiLFwiY29weVwiOlwiwqlcIixcIkNPUFlcIjpcIsKpXCIsXCJjdXJyZW5cIjpcIsKkXCIsXCJkZWdcIjpcIsKwXCIsXCJkaXZpZGVcIjpcIsO3XCIsXCJFYWN1dGVcIjpcIsOJXCIsXCJlYWN1dGVcIjpcIsOpXCIsXCJFY2lyY1wiOlwiw4pcIixcImVjaXJjXCI6XCLDqlwiLFwiRWdyYXZlXCI6XCLDiFwiLFwiZWdyYXZlXCI6XCLDqFwiLFwiRVRIXCI6XCLDkFwiLFwiZXRoXCI6XCLDsFwiLFwiRXVtbFwiOlwiw4tcIixcImV1bWxcIjpcIsOrXCIsXCJmcmFjMTJcIjpcIsK9XCIsXCJmcmFjMTRcIjpcIsK8XCIsXCJmcmFjMzRcIjpcIsK+XCIsXCJndFwiOlwiPlwiLFwiR1RcIjpcIj5cIixcIklhY3V0ZVwiOlwiw41cIixcImlhY3V0ZVwiOlwiw61cIixcIkljaXJjXCI6XCLDjlwiLFwiaWNpcmNcIjpcIsOuXCIsXCJpZXhjbFwiOlwiwqFcIixcIklncmF2ZVwiOlwiw4xcIixcImlncmF2ZVwiOlwiw6xcIixcImlxdWVzdFwiOlwiwr9cIixcIkl1bWxcIjpcIsOPXCIsXCJpdW1sXCI6XCLDr1wiLFwibGFxdW9cIjpcIsKrXCIsXCJsdFwiOlwiPFwiLFwiTFRcIjpcIjxcIixcIm1hY3JcIjpcIsKvXCIsXCJtaWNyb1wiOlwiwrVcIixcIm1pZGRvdFwiOlwiwrdcIixcIm5ic3BcIjpcIsKgXCIsXCJub3RcIjpcIsKsXCIsXCJOdGlsZGVcIjpcIsORXCIsXCJudGlsZGVcIjpcIsOxXCIsXCJPYWN1dGVcIjpcIsOTXCIsXCJvYWN1dGVcIjpcIsOzXCIsXCJPY2lyY1wiOlwiw5RcIixcIm9jaXJjXCI6XCLDtFwiLFwiT2dyYXZlXCI6XCLDklwiLFwib2dyYXZlXCI6XCLDslwiLFwib3JkZlwiOlwiwqpcIixcIm9yZG1cIjpcIsK6XCIsXCJPc2xhc2hcIjpcIsOYXCIsXCJvc2xhc2hcIjpcIsO4XCIsXCJPdGlsZGVcIjpcIsOVXCIsXCJvdGlsZGVcIjpcIsO1XCIsXCJPdW1sXCI6XCLDllwiLFwib3VtbFwiOlwiw7ZcIixcInBhcmFcIjpcIsK2XCIsXCJwbHVzbW5cIjpcIsKxXCIsXCJwb3VuZFwiOlwiwqNcIixcInF1b3RcIjpcIlxcXCJcIixcIlFVT1RcIjpcIlxcXCJcIixcInJhcXVvXCI6XCLCu1wiLFwicmVnXCI6XCLCrlwiLFwiUkVHXCI6XCLCrlwiLFwic2VjdFwiOlwiwqdcIixcInNoeVwiOlwiwq1cIixcInN1cDFcIjpcIsK5XCIsXCJzdXAyXCI6XCLCslwiLFwic3VwM1wiOlwiwrNcIixcInN6bGlnXCI6XCLDn1wiLFwiVEhPUk5cIjpcIsOeXCIsXCJ0aG9yblwiOlwiw75cIixcInRpbWVzXCI6XCLDl1wiLFwiVWFjdXRlXCI6XCLDmlwiLFwidWFjdXRlXCI6XCLDulwiLFwiVWNpcmNcIjpcIsObXCIsXCJ1Y2lyY1wiOlwiw7tcIixcIlVncmF2ZVwiOlwiw5lcIixcInVncmF2ZVwiOlwiw7lcIixcInVtbFwiOlwiwqhcIixcIlV1bWxcIjpcIsOcXCIsXCJ1dW1sXCI6XCLDvFwiLFwiWWFjdXRlXCI6XCLDnVwiLFwieWFjdXRlXCI6XCLDvVwiLFwieWVuXCI6XCLCpVwiLFwieXVtbFwiOlwiw79cIn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2xlZ2FjeS5qc29uXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGVjb2RlTWFwID0gcmVxdWlyZShcIi4uL21hcHMvZGVjb2RlLmpzb25cIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlQ29kZVBvaW50O1xuXG4vLyBtb2RpZmllZCB2ZXJzaW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL2hlL2Jsb2IvbWFzdGVyL3NyYy9oZS5qcyNMOTQtTDExOVxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50KGNvZGVQb2ludCl7XG5cblx0aWYoKGNvZGVQb2ludCA+PSAweEQ4MDAgJiYgY29kZVBvaW50IDw9IDB4REZGRikgfHwgY29kZVBvaW50ID4gMHgxMEZGRkYpe1xuXHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0fVxuXG5cdGlmKGNvZGVQb2ludCBpbiBkZWNvZGVNYXApe1xuXHRcdGNvZGVQb2ludCA9IGRlY29kZU1hcFtjb2RlUG9pbnRdO1xuXHR9XG5cblx0dmFyIG91dHB1dCA9IFwiXCI7XG5cblx0aWYoY29kZVBvaW50ID4gMHhGRkZGKXtcblx0XHRjb2RlUG9pbnQgLT0gMHgxMDAwMDtcblx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGO1xuXHR9XG5cblx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0cmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9kZWNvZGVfY29kZXBvaW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcIjBcIjo2NTUzMyxcIjEyOFwiOjgzNjQsXCIxMzBcIjo4MjE4LFwiMTMxXCI6NDAyLFwiMTMyXCI6ODIyMixcIjEzM1wiOjgyMzAsXCIxMzRcIjo4MjI0LFwiMTM1XCI6ODIyNSxcIjEzNlwiOjcxMCxcIjEzN1wiOjgyNDAsXCIxMzhcIjozNTIsXCIxMzlcIjo4MjQ5LFwiMTQwXCI6MzM4LFwiMTQyXCI6MzgxLFwiMTQ1XCI6ODIxNixcIjE0NlwiOjgyMTcsXCIxNDdcIjo4MjIwLFwiMTQ4XCI6ODIyMSxcIjE0OVwiOjgyMjYsXCIxNTBcIjo4MjExLFwiMTUxXCI6ODIxMixcIjE1MlwiOjczMixcIjE1M1wiOjg0ODIsXCIxNTRcIjozNTMsXCIxNTVcIjo4MjUwLFwiMTU2XCI6MzM5LFwiMTU4XCI6MzgyLFwiMTU5XCI6Mzc2fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZGVjb2RlLmpzb25cbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgbm9ybWFsaXplUmVmZXJlbmNlID0gcmVxdWlyZSgnLi9ub3JtYWxpemUtcmVmZXJlbmNlJyk7XG5cbnZhciBub3JtYWxpemVVUkkgPSBjb21tb24ubm9ybWFsaXplVVJJO1xudmFyIHVuZXNjYXBlU3RyaW5nID0gY29tbW9uLnVuZXNjYXBlU3RyaW5nO1xudmFyIGZyb21Db2RlUG9pbnQgPSByZXF1aXJlKCcuL2Zyb20tY29kZS1wb2ludC5qcycpO1xudmFyIGRlY29kZUhUTUwgPSByZXF1aXJlKCdlbnRpdGllcycpLmRlY29kZUhUTUw7XG5yZXF1aXJlKCdzdHJpbmcucHJvdG90eXBlLnJlcGVhdCcpOyAvLyBQb2x5ZmlsbCBmb3IgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXRcblxuLy8gQ29uc3RhbnRzIGZvciBjaGFyYWN0ZXIgY29kZXM6XG5cbnZhciBDX05FV0xJTkUgPSAxMDtcbnZhciBDX0FTVEVSSVNLID0gNDI7XG52YXIgQ19VTkRFUlNDT1JFID0gOTU7XG52YXIgQ19CQUNLVElDSyA9IDk2O1xudmFyIENfT1BFTl9CUkFDS0VUID0gOTE7XG52YXIgQ19DTE9TRV9CUkFDS0VUID0gOTM7XG52YXIgQ19MRVNTVEhBTiA9IDYwO1xudmFyIENfQkFORyA9IDMzO1xudmFyIENfQkFDS1NMQVNIID0gOTI7XG52YXIgQ19BTVBFUlNBTkQgPSAzODtcbnZhciBDX09QRU5fUEFSRU4gPSA0MDtcbnZhciBDX0NMT1NFX1BBUkVOID0gNDE7XG52YXIgQ19DT0xPTiA9IDU4O1xudmFyIENfU0lOR0xFUVVPVEUgPSAzOTtcbnZhciBDX0RPVUJMRVFVT1RFID0gMzQ7XG5cbi8vIFNvbWUgcmVnZXhwcyB1c2VkIGluIGlubGluZSBwYXJzZXI6XG5cbnZhciBFU0NBUEFCTEUgPSBjb21tb24uRVNDQVBBQkxFO1xudmFyIEVTQ0FQRURfQ0hBUiA9ICdcXFxcXFxcXCcgKyBFU0NBUEFCTEU7XG5cbnZhciBFTlRJVFkgPSBjb21tb24uRU5USVRZO1xudmFyIHJlSHRtbFRhZyA9IGNvbW1vbi5yZUh0bWxUYWc7XG5cbnZhciByZVB1bmN0dWF0aW9uID0gbmV3IFJlZ0V4cCgvWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1eX2B7fH1+XFx4QTFcXHhBN1xceEFCXFx4QjZcXHhCN1xceEJCXFx4QkZcXHUwMzdFXFx1MDM4N1xcdTA1NUEtXFx1MDU1RlxcdTA1ODlcXHUwNThBXFx1MDVCRVxcdTA1QzBcXHUwNUMzXFx1MDVDNlxcdTA1RjNcXHUwNUY0XFx1MDYwOVxcdTA2MEFcXHUwNjBDXFx1MDYwRFxcdTA2MUJcXHUwNjFFXFx1MDYxRlxcdTA2NkEtXFx1MDY2RFxcdTA2RDRcXHUwNzAwLVxcdTA3MERcXHUwN0Y3LVxcdTA3RjlcXHUwODMwLVxcdTA4M0VcXHUwODVFXFx1MDk2NFxcdTA5NjVcXHUwOTcwXFx1MEFGMFxcdTBERjRcXHUwRTRGXFx1MEU1QVxcdTBFNUJcXHUwRjA0LVxcdTBGMTJcXHUwRjE0XFx1MEYzQS1cXHUwRjNEXFx1MEY4NVxcdTBGRDAtXFx1MEZENFxcdTBGRDlcXHUwRkRBXFx1MTA0QS1cXHUxMDRGXFx1MTBGQlxcdTEzNjAtXFx1MTM2OFxcdTE0MDBcXHUxNjZEXFx1MTY2RVxcdTE2OUJcXHUxNjlDXFx1MTZFQi1cXHUxNkVEXFx1MTczNVxcdTE3MzZcXHUxN0Q0LVxcdTE3RDZcXHUxN0Q4LVxcdTE3REFcXHUxODAwLVxcdTE4MEFcXHUxOTQ0XFx1MTk0NVxcdTFBMUVcXHUxQTFGXFx1MUFBMC1cXHUxQUE2XFx1MUFBOC1cXHUxQUFEXFx1MUI1QS1cXHUxQjYwXFx1MUJGQy1cXHUxQkZGXFx1MUMzQi1cXHUxQzNGXFx1MUM3RVxcdTFDN0ZcXHUxQ0MwLVxcdTFDQzdcXHUxQ0QzXFx1MjAxMC1cXHUyMDI3XFx1MjAzMC1cXHUyMDQzXFx1MjA0NS1cXHUyMDUxXFx1MjA1My1cXHUyMDVFXFx1MjA3RFxcdTIwN0VcXHUyMDhEXFx1MjA4RVxcdTIzMDgtXFx1MjMwQlxcdTIzMjlcXHUyMzJBXFx1Mjc2OC1cXHUyNzc1XFx1MjdDNVxcdTI3QzZcXHUyN0U2LVxcdTI3RUZcXHUyOTgzLVxcdTI5OThcXHUyOUQ4LVxcdTI5REJcXHUyOUZDXFx1MjlGRFxcdTJDRjktXFx1MkNGQ1xcdTJDRkVcXHUyQ0ZGXFx1MkQ3MFxcdTJFMDAtXFx1MkUyRVxcdTJFMzAtXFx1MkU0MlxcdTMwMDEtXFx1MzAwM1xcdTMwMDgtXFx1MzAxMVxcdTMwMTQtXFx1MzAxRlxcdTMwMzBcXHUzMDNEXFx1MzBBMFxcdTMwRkJcXHVBNEZFXFx1QTRGRlxcdUE2MEQtXFx1QTYwRlxcdUE2NzNcXHVBNjdFXFx1QTZGMi1cXHVBNkY3XFx1QTg3NC1cXHVBODc3XFx1QThDRVxcdUE4Q0ZcXHVBOEY4LVxcdUE4RkFcXHVBOEZDXFx1QTkyRVxcdUE5MkZcXHVBOTVGXFx1QTlDMS1cXHVBOUNEXFx1QTlERVxcdUE5REZcXHVBQTVDLVxcdUFBNUZcXHVBQURFXFx1QUFERlxcdUFBRjBcXHVBQUYxXFx1QUJFQlxcdUZEM0VcXHVGRDNGXFx1RkUxMC1cXHVGRTE5XFx1RkUzMC1cXHVGRTUyXFx1RkU1NC1cXHVGRTYxXFx1RkU2M1xcdUZFNjhcXHVGRTZBXFx1RkU2QlxcdUZGMDEtXFx1RkYwM1xcdUZGMDUtXFx1RkYwQVxcdUZGMEMtXFx1RkYwRlxcdUZGMUFcXHVGRjFCXFx1RkYxRlxcdUZGMjBcXHVGRjNCLVxcdUZGM0RcXHVGRjNGXFx1RkY1QlxcdUZGNURcXHVGRjVGLVxcdUZGNjVdfFxcdUQ4MDBbXFx1REQwMC1cXHVERDAyXFx1REY5RlxcdURGRDBdfFxcdUQ4MDFcXHVERDZGfFxcdUQ4MDJbXFx1REM1N1xcdUREMUZcXHVERDNGXFx1REU1MC1cXHVERTU4XFx1REU3RlxcdURFRjAtXFx1REVGNlxcdURGMzktXFx1REYzRlxcdURGOTktXFx1REY5Q118XFx1RDgwNFtcXHVEQzQ3LVxcdURDNERcXHVEQ0JCXFx1RENCQ1xcdURDQkUtXFx1RENDMVxcdURENDAtXFx1REQ0M1xcdURENzRcXHVERDc1XFx1RERDNS1cXHVEREM5XFx1RERDRFxcdUREREJcXHVERERELVxcdUREREZcXHVERTM4LVxcdURFM0RcXHVERUE5XXxcXHVEODA1W1xcdURDQzZcXHVEREMxLVxcdURERDdcXHVERTQxLVxcdURFNDNcXHVERjNDLVxcdURGM0VdfFxcdUQ4MDlbXFx1REM3MC1cXHVEQzc0XXxcXHVEODFBW1xcdURFNkVcXHVERTZGXFx1REVGNVxcdURGMzctXFx1REYzQlxcdURGNDRdfFxcdUQ4MkZcXHVEQzlGfFxcdUQ4MzZbXFx1REU4Ny1cXHVERThCXS8pO1xuXG52YXIgcmVMaW5rVGl0bGUgPSBuZXcgUmVnRXhwKFxuICAgICdeKD86XCIoJyArIEVTQ0FQRURfQ0hBUiArICd8W15cIlxcXFx4MDBdKSpcIicgK1xuICAgICAgICAnfCcgK1xuICAgICAgICAnXFwnKCcgKyBFU0NBUEVEX0NIQVIgKyAnfFteXFwnXFxcXHgwMF0pKlxcJycgK1xuICAgICAgICAnfCcgK1xuICAgICAgICAnXFxcXCgoJyArIEVTQ0FQRURfQ0hBUiArICd8W14pXFxcXHgwMF0pKlxcXFwpKScpO1xuXG52YXIgcmVMaW5rRGVzdGluYXRpb25CcmFjZXMgPSBuZXcgUmVnRXhwKFxuICAgICdeKD86WzxdKD86W14gPD5cXFxcdFxcXFxuXFxcXFxcXFxcXFxceDAwXScgKyAnfCcgKyBFU0NBUEVEX0NIQVIgKyAnfCcgKyAnXFxcXFxcXFwpKls+XSknKTtcblxudmFyIHJlRXNjYXBhYmxlID0gbmV3IFJlZ0V4cCgnXicgKyBFU0NBUEFCTEUpO1xuXG52YXIgcmVFbnRpdHlIZXJlID0gbmV3IFJlZ0V4cCgnXicgKyBFTlRJVFksICdpJyk7XG5cbnZhciByZVRpY2tzID0gL2ArLztcblxudmFyIHJlVGlja3NIZXJlID0gL15gKy87XG5cbnZhciByZUVsbGlwc2VzID0gL1xcLlxcLlxcLi9nO1xuXG52YXIgcmVEYXNoID0gLy0tKy9nO1xuXG52YXIgcmVFbWFpbEF1dG9saW5rID0gL148KFthLXpBLVowLTkuISMkJSYnKitcXC89P15fYHt8fX4tXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSopPi87XG5cbnZhciByZUF1dG9saW5rID0gL148W0EtWmEtel1bQS1aYS16MC05ListXXsxLDMxfTpbXjw+XFx4MDAtXFx4MjBdKj4vaTtcblxudmFyIHJlU3BubCA9IC9eICooPzpcXG4gKik/LztcblxudmFyIHJlV2hpdGVzcGFjZUNoYXIgPSAvXlsgXFx0XFxuXFx4MGJcXHgwY1xceDBkXS87XG5cbnZhciByZVdoaXRlc3BhY2UgPSAvWyBcXHRcXG5cXHgwYlxceDBjXFx4MGRdKy9nO1xuXG52YXIgcmVVbmljb2RlV2hpdGVzcGFjZUNoYXIgPSAvXlxccy87XG5cbnZhciByZUZpbmFsU3BhY2UgPSAvICokLztcblxudmFyIHJlSW5pdGlhbFNwYWNlID0gL14gKi87XG5cbnZhciByZVNwYWNlQXRFbmRPZkxpbmUgPSAvXiAqKD86XFxufCQpLztcblxudmFyIHJlTGlua0xhYmVsID0gbmV3IFJlZ0V4cCgnXlxcXFxbKD86W15cXFxcXFxcXFxcXFxbXFxcXF1dfCcgKyBFU0NBUEVEX0NIQVIgK1xuICAnfFxcXFxcXFxcKXswLDEwMDB9XFxcXF0nKTtcblxuLy8gTWF0Y2hlcyBhIHN0cmluZyBvZiBub24tc3BlY2lhbCBjaGFyYWN0ZXJzLlxudmFyIHJlTWFpbiA9IC9eW15cXG5gXFxbXFxdXFxcXCE8JipfJ1wiXSsvbTtcblxudmFyIHRleHQgPSBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG5vZGUgPSBuZXcgTm9kZSgndGV4dCcpO1xuICAgIG5vZGUuX2xpdGVyYWwgPSBzO1xuICAgIHJldHVybiBub2RlO1xufTtcblxuLy8gSU5MSU5FIFBBUlNFUlxuXG4vLyBUaGVzZSBhcmUgbWV0aG9kcyBvZiBhbiBJbmxpbmVQYXJzZXIgb2JqZWN0LCBkZWZpbmVkIGJlbG93LlxuLy8gQW4gSW5saW5lUGFyc2VyIGtlZXBzIHRyYWNrIG9mIGEgc3ViamVjdCAoYSBzdHJpbmcgdG8gYmVcbi8vIHBhcnNlZCkgYW5kIGEgcG9zaXRpb24gaW4gdGhhdCBzdWJqZWN0LlxuXG4vLyBJZiByZSBtYXRjaGVzIGF0IGN1cnJlbnQgcG9zaXRpb24gaW4gdGhlIHN1YmplY3QsIGFkdmFuY2Vcbi8vIHBvc2l0aW9uIGluIHN1YmplY3QgYW5kIHJldHVybiB0aGUgbWF0Y2g7IG90aGVyd2lzZSByZXR1cm4gbnVsbC5cbnZhciBtYXRjaCA9IGZ1bmN0aW9uKHJlKSB7XG4gICAgdmFyIG0gPSByZS5leGVjKHRoaXMuc3ViamVjdC5zbGljZSh0aGlzLnBvcykpO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zICs9IG0uaW5kZXggKyBtWzBdLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG1bMF07XG4gICAgfVxufTtcblxuLy8gUmV0dXJucyB0aGUgY29kZSBmb3IgdGhlIGNoYXJhY3RlciBhdCB0aGUgY3VycmVudCBzdWJqZWN0IHBvc2l0aW9uLCBvciAtMVxuLy8gdGhlcmUgYXJlIG5vIG1vcmUgY2hhcmFjdGVycy5cbnZhciBwZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucG9zIDwgdGhpcy5zdWJqZWN0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmNoYXJDb2RlQXQodGhpcy5wb3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG59O1xuXG4vLyBQYXJzZSB6ZXJvIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVycywgaW5jbHVkaW5nIGF0IG1vc3Qgb25lIG5ld2xpbmVcbnZhciBzcG5sID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5tYXRjaChyZVNwbmwpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gQWxsIG9mIHRoZSBwYXJzZXJzIGJlbG93IHRyeSB0byBtYXRjaCBzb21ldGhpbmcgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb25cbi8vIGluIHRoZSBzdWJqZWN0LiAgSWYgdGhleSBzdWNjZWVkIGluIG1hdGNoaW5nIGFueXRoaW5nLCB0aGV5XG4vLyByZXR1cm4gdGhlIGlubGluZSBtYXRjaGVkLCBhZHZhbmNpbmcgdGhlIHN1YmplY3QuXG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYmFja3RpY2tzLCBhZGRpbmcgZWl0aGVyIGEgYmFja3RpY2sgY29kZSBzcGFuIG9yIGFcbi8vIGxpdGVyYWwgc2VxdWVuY2Ugb2YgYmFja3RpY2tzLlxudmFyIHBhcnNlQmFja3RpY2tzID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgdGlja3MgPSB0aGlzLm1hdGNoKHJlVGlja3NIZXJlKTtcbiAgICBpZiAodGlja3MgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgYWZ0ZXJPcGVuVGlja3MgPSB0aGlzLnBvcztcbiAgICB2YXIgbWF0Y2hlZDtcbiAgICB2YXIgbm9kZTtcbiAgICB3aGlsZSAoKG1hdGNoZWQgPSB0aGlzLm1hdGNoKHJlVGlja3MpKSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAobWF0Y2hlZCA9PT0gdGlja3MpIHtcbiAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZSgnY29kZScpO1xuICAgICAgICAgICAgbm9kZS5fbGl0ZXJhbCA9IHRoaXMuc3ViamVjdC5zbGljZShhZnRlck9wZW5UaWNrcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyAtIHRpY2tzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKS5yZXBsYWNlKHJlV2hpdGVzcGFjZSwgJyAnKTtcbiAgICAgICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgd2UgZ290IGhlcmUsIHdlIGRpZG4ndCBtYXRjaCBhIGNsb3NpbmcgYmFja3RpY2sgc2VxdWVuY2UuXG4gICAgdGhpcy5wb3MgPSBhZnRlck9wZW5UaWNrcztcbiAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KHRpY2tzKSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBQYXJzZSBhIGJhY2tzbGFzaC1lc2NhcGVkIHNwZWNpYWwgY2hhcmFjdGVyLCBhZGRpbmcgZWl0aGVyIHRoZSBlc2NhcGVkXG4vLyBjaGFyYWN0ZXIsIGEgaGFyZCBsaW5lIGJyZWFrIChpZiB0aGUgYmFja3NsYXNoIGlzIGZvbGxvd2VkIGJ5IGEgbmV3bGluZSksXG4vLyBvciBhIGxpdGVyYWwgYmFja3NsYXNoIHRvIHRoZSBibG9jaydzIGNoaWxkcmVuLiAgQXNzdW1lcyBjdXJyZW50IGNoYXJhY3RlclxuLy8gaXMgYSBiYWNrc2xhc2guXG52YXIgcGFyc2VCYWNrc2xhc2ggPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBzdWJqID0gdGhpcy5zdWJqZWN0O1xuICAgIHZhciBub2RlO1xuICAgIHRoaXMucG9zICs9IDE7XG4gICAgaWYgKHRoaXMucGVlaygpID09PSBDX05FV0xJTkUpIHtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgbm9kZSA9IG5ldyBOb2RlKCdsaW5lYnJlYWsnKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSBlbHNlIGlmIChyZUVzY2FwYWJsZS50ZXN0KHN1YmouY2hhckF0KHRoaXMucG9zKSkpIHtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dChzdWJqLmNoYXJBdCh0aGlzLnBvcykpKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCdcXFxcJykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYW4gYXV0b2xpbmsgKFVSTCBvciBlbWFpbCBpbiBwb2ludHkgYnJhY2tldHMpLlxudmFyIHBhcnNlQXV0b2xpbmsgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBtO1xuICAgIHZhciBkZXN0O1xuICAgIHZhciBub2RlO1xuICAgIGlmICgobSA9IHRoaXMubWF0Y2gocmVFbWFpbEF1dG9saW5rKSkpIHtcbiAgICAgICAgZGVzdCA9IG0uc2xpY2UoMSwgbS5sZW5ndGggLSAxKTtcbiAgICAgICAgbm9kZSA9IG5ldyBOb2RlKCdsaW5rJyk7XG4gICAgICAgIG5vZGUuX2Rlc3RpbmF0aW9uID0gbm9ybWFsaXplVVJJKCdtYWlsdG86JyArIGRlc3QpO1xuICAgICAgICBub2RlLl90aXRsZSA9ICcnO1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRleHQoZGVzdCkpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICgobSA9IHRoaXMubWF0Y2gocmVBdXRvbGluaykpKSB7XG4gICAgICAgIGRlc3QgPSBtLnNsaWNlKDEsIG0ubGVuZ3RoIC0gMSk7XG4gICAgICAgIG5vZGUgPSBuZXcgTm9kZSgnbGluaycpO1xuICAgICAgICBub2RlLl9kZXN0aW5hdGlvbiA9IG5vcm1hbGl6ZVVSSShkZXN0KTtcbiAgICAgICAgbm9kZS5fdGl0bGUgPSAnJztcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KGRlc3QpKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGEgcmF3IEhUTUwgdGFnLlxudmFyIHBhcnNlSHRtbFRhZyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIG0gPSB0aGlzLm1hdGNoKHJlSHRtbFRhZyk7XG4gICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBub2RlID0gbmV3IE5vZGUoJ2h0bWxfaW5saW5lJyk7XG4gICAgICAgIG5vZGUuX2xpdGVyYWwgPSBtO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcblxuLy8gU2NhbiBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgd2l0aCBjb2RlIGNjLCBhbmQgcmV0dXJuIGluZm9ybWF0aW9uIGFib3V0XG4vLyB0aGUgbnVtYmVyIG9mIGRlbGltaXRlcnMgYW5kIHdoZXRoZXIgdGhleSBhcmUgcG9zaXRpb25lZCBzdWNoIHRoYXRcbi8vIHRoZXkgY2FuIG9wZW4gYW5kL29yIGNsb3NlIGVtcGhhc2lzIG9yIHN0cm9uZyBlbXBoYXNpcy4gIEEgdXRpbGl0eVxuLy8gZnVuY3Rpb24gZm9yIHN0cm9uZy9lbXBoIHBhcnNpbmcuXG52YXIgc2NhbkRlbGltcyA9IGZ1bmN0aW9uKGNjKSB7XG4gICAgdmFyIG51bWRlbGltcyA9IDA7XG4gICAgdmFyIGNoYXJfYmVmb3JlLCBjaGFyX2FmdGVyLCBjY19hZnRlcjtcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB2YXIgbGVmdF9mbGFua2luZywgcmlnaHRfZmxhbmtpbmcsIGNhbl9vcGVuLCBjYW5fY2xvc2U7XG4gICAgdmFyIGFmdGVyX2lzX3doaXRlc3BhY2UsIGFmdGVyX2lzX3B1bmN0dWF0aW9uLCBiZWZvcmVfaXNfd2hpdGVzcGFjZSwgYmVmb3JlX2lzX3B1bmN0dWF0aW9uO1xuXG4gICAgaWYgKGNjID09PSBDX1NJTkdMRVFVT1RFIHx8IGNjID09PSBDX0RPVUJMRVFVT1RFKSB7XG4gICAgICAgIG51bWRlbGltcysrO1xuICAgICAgICB0aGlzLnBvcysrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICh0aGlzLnBlZWsoKSA9PT0gY2MpIHtcbiAgICAgICAgICAgIG51bWRlbGltcysrO1xuICAgICAgICAgICAgdGhpcy5wb3MrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChudW1kZWxpbXMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY2hhcl9iZWZvcmUgPSBzdGFydHBvcyA9PT0gMCA/ICdcXG4nIDogdGhpcy5zdWJqZWN0LmNoYXJBdChzdGFydHBvcyAtIDEpO1xuXG4gICAgY2NfYWZ0ZXIgPSB0aGlzLnBlZWsoKTtcbiAgICBpZiAoY2NfYWZ0ZXIgPT09IC0xKSB7XG4gICAgICAgIGNoYXJfYWZ0ZXIgPSAnXFxuJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGFyX2FmdGVyID0gZnJvbUNvZGVQb2ludChjY19hZnRlcik7XG4gICAgfVxuXG4gICAgYWZ0ZXJfaXNfd2hpdGVzcGFjZSA9IHJlVW5pY29kZVdoaXRlc3BhY2VDaGFyLnRlc3QoY2hhcl9hZnRlcik7XG4gICAgYWZ0ZXJfaXNfcHVuY3R1YXRpb24gPSByZVB1bmN0dWF0aW9uLnRlc3QoY2hhcl9hZnRlcik7XG4gICAgYmVmb3JlX2lzX3doaXRlc3BhY2UgPSByZVVuaWNvZGVXaGl0ZXNwYWNlQ2hhci50ZXN0KGNoYXJfYmVmb3JlKTtcbiAgICBiZWZvcmVfaXNfcHVuY3R1YXRpb24gPSByZVB1bmN0dWF0aW9uLnRlc3QoY2hhcl9iZWZvcmUpO1xuXG4gICAgbGVmdF9mbGFua2luZyA9ICFhZnRlcl9pc193aGl0ZXNwYWNlICYmXG4gICAgICAgICAgICAoIWFmdGVyX2lzX3B1bmN0dWF0aW9uIHx8IGJlZm9yZV9pc193aGl0ZXNwYWNlIHx8IGJlZm9yZV9pc19wdW5jdHVhdGlvbik7XG4gICAgcmlnaHRfZmxhbmtpbmcgPSAhYmVmb3JlX2lzX3doaXRlc3BhY2UgJiZcbiAgICAgICAgICAgICghYmVmb3JlX2lzX3B1bmN0dWF0aW9uIHx8IGFmdGVyX2lzX3doaXRlc3BhY2UgfHwgYWZ0ZXJfaXNfcHVuY3R1YXRpb24pO1xuICAgIGlmIChjYyA9PT0gQ19VTkRFUlNDT1JFKSB7XG4gICAgICAgIGNhbl9vcGVuID0gbGVmdF9mbGFua2luZyAmJlxuICAgICAgICAgICAgKCFyaWdodF9mbGFua2luZyB8fCBiZWZvcmVfaXNfcHVuY3R1YXRpb24pO1xuICAgICAgICBjYW5fY2xvc2UgPSByaWdodF9mbGFua2luZyAmJlxuICAgICAgICAgICAgKCFsZWZ0X2ZsYW5raW5nIHx8IGFmdGVyX2lzX3B1bmN0dWF0aW9uKTtcbiAgICB9IGVsc2UgaWYgKGNjID09PSBDX1NJTkdMRVFVT1RFIHx8IGNjID09PSBDX0RPVUJMRVFVT1RFKSB7XG4gICAgICAgIGNhbl9vcGVuID0gbGVmdF9mbGFua2luZyAmJiAhcmlnaHRfZmxhbmtpbmc7XG4gICAgICAgIGNhbl9jbG9zZSA9IHJpZ2h0X2ZsYW5raW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbl9vcGVuID0gbGVmdF9mbGFua2luZztcbiAgICAgICAgY2FuX2Nsb3NlID0gcmlnaHRfZmxhbmtpbmc7XG4gICAgfVxuICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgcmV0dXJuIHsgbnVtZGVsaW1zOiBudW1kZWxpbXMsXG4gICAgICAgICAgICAgY2FuX29wZW46IGNhbl9vcGVuLFxuICAgICAgICAgICAgIGNhbl9jbG9zZTogY2FuX2Nsb3NlIH07XG59O1xuXG4vLyBIYW5kbGUgYSBkZWxpbWl0ZXIgbWFya2VyIGZvciBlbXBoYXNpcyBvciBhIHF1b3RlLlxudmFyIGhhbmRsZURlbGltID0gZnVuY3Rpb24oY2MsIGJsb2NrKSB7XG4gICAgdmFyIHJlcyA9IHRoaXMuc2NhbkRlbGltcyhjYyk7XG4gICAgaWYgKCFyZXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbnVtZGVsaW1zID0gcmVzLm51bWRlbGltcztcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB2YXIgY29udGVudHM7XG5cbiAgICB0aGlzLnBvcyArPSBudW1kZWxpbXM7XG4gICAgaWYgKGNjID09PSBDX1NJTkdMRVFVT1RFKSB7XG4gICAgICAgIGNvbnRlbnRzID0gXCJcXHUyMDE5XCI7XG4gICAgfSBlbHNlIGlmIChjYyA9PT0gQ19ET1VCTEVRVU9URSkge1xuICAgICAgICBjb250ZW50cyA9IFwiXFx1MjAxQ1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnRzID0gdGhpcy5zdWJqZWN0LnNsaWNlKHN0YXJ0cG9zLCB0aGlzLnBvcyk7XG4gICAgfVxuICAgIHZhciBub2RlID0gdGV4dChjb250ZW50cyk7XG4gICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgICAvLyBBZGQgZW50cnkgdG8gc3RhY2sgZm9yIHRoaXMgb3BlbmVyXG4gICAgdGhpcy5kZWxpbWl0ZXJzID0geyBjYzogY2MsXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1kZWxpbXM6IG51bWRlbGltcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdkZWxpbXM6IG51bWRlbGltcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91czogdGhpcy5kZWxpbWl0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbl9vcGVuOiByZXMuY2FuX29wZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5fY2xvc2U6IHJlcy5jYW5fY2xvc2UgfTtcbiAgICBpZiAodGhpcy5kZWxpbWl0ZXJzLnByZXZpb3VzICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGVsaW1pdGVycy5wcmV2aW91cy5uZXh0ID0gdGhpcy5kZWxpbWl0ZXJzO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG59O1xuXG52YXIgcmVtb3ZlRGVsaW1pdGVyID0gZnVuY3Rpb24oZGVsaW0pIHtcbiAgICBpZiAoZGVsaW0ucHJldmlvdXMgIT09IG51bGwpIHtcbiAgICAgICAgZGVsaW0ucHJldmlvdXMubmV4dCA9IGRlbGltLm5leHQ7XG4gICAgfVxuICAgIGlmIChkZWxpbS5uZXh0ID09PSBudWxsKSB7XG4gICAgICAgIC8vIHRvcCBvZiBzdGFja1xuICAgICAgICB0aGlzLmRlbGltaXRlcnMgPSBkZWxpbS5wcmV2aW91cztcbiAgICB9IGVsc2Uge1xuICAgICAgICBkZWxpbS5uZXh0LnByZXZpb3VzID0gZGVsaW0ucHJldmlvdXM7XG4gICAgfVxufTtcblxudmFyIHJlbW92ZURlbGltaXRlcnNCZXR3ZWVuID0gZnVuY3Rpb24oYm90dG9tLCB0b3ApIHtcbiAgICBpZiAoYm90dG9tLm5leHQgIT09IHRvcCkge1xuICAgICAgICBib3R0b20ubmV4dCA9IHRvcDtcbiAgICAgICAgdG9wLnByZXZpb3VzID0gYm90dG9tO1xuICAgIH1cbn07XG5cbnZhciBwcm9jZXNzRW1waGFzaXMgPSBmdW5jdGlvbihzdGFja19ib3R0b20pIHtcbiAgICB2YXIgb3BlbmVyLCBjbG9zZXIsIG9sZF9jbG9zZXI7XG4gICAgdmFyIG9wZW5lcl9pbmwsIGNsb3Nlcl9pbmw7XG4gICAgdmFyIHRlbXBzdGFjaztcbiAgICB2YXIgdXNlX2RlbGltcztcbiAgICB2YXIgdG1wLCBuZXh0O1xuICAgIHZhciBvcGVuZXJfZm91bmQ7XG4gICAgdmFyIG9wZW5lcnNfYm90dG9tID0gW107XG4gICAgdmFyIG9kZF9tYXRjaCA9IGZhbHNlO1xuXG4gICAgb3BlbmVyc19ib3R0b21bQ19VTkRFUlNDT1JFXSA9IHN0YWNrX2JvdHRvbTtcbiAgICBvcGVuZXJzX2JvdHRvbVtDX0FTVEVSSVNLXSA9IHN0YWNrX2JvdHRvbTtcbiAgICBvcGVuZXJzX2JvdHRvbVtDX1NJTkdMRVFVT1RFXSA9IHN0YWNrX2JvdHRvbTtcbiAgICBvcGVuZXJzX2JvdHRvbVtDX0RPVUJMRVFVT1RFXSA9IHN0YWNrX2JvdHRvbTtcblxuICAgIC8vIGZpbmQgZmlyc3QgY2xvc2VyIGFib3ZlIHN0YWNrX2JvdHRvbTpcbiAgICBjbG9zZXIgPSB0aGlzLmRlbGltaXRlcnM7XG4gICAgd2hpbGUgKGNsb3NlciAhPT0gbnVsbCAmJiBjbG9zZXIucHJldmlvdXMgIT09IHN0YWNrX2JvdHRvbSkge1xuICAgICAgICBjbG9zZXIgPSBjbG9zZXIucHJldmlvdXM7XG4gICAgfVxuICAgIC8vIG1vdmUgZm9yd2FyZCwgbG9va2luZyBmb3IgY2xvc2VycywgYW5kIGhhbmRsaW5nIGVhY2hcbiAgICB3aGlsZSAoY2xvc2VyICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBjbG9zZXJjYyA9IGNsb3Nlci5jYztcbiAgICAgICAgaWYgKCFjbG9zZXIuY2FuX2Nsb3NlKSB7XG4gICAgICAgICAgICBjbG9zZXIgPSBjbG9zZXIubmV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGZvdW5kIGVtcGhhc2lzIGNsb3Nlci4gbm93IGxvb2sgYmFjayBmb3IgZmlyc3QgbWF0Y2hpbmcgb3BlbmVyOlxuICAgICAgICAgICAgb3BlbmVyID0gY2xvc2VyLnByZXZpb3VzO1xuICAgICAgICAgICAgb3BlbmVyX2ZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAob3BlbmVyICE9PSBudWxsICYmIG9wZW5lciAhPT0gc3RhY2tfYm90dG9tICYmXG4gICAgICAgICAgICAgICAgICAgb3BlbmVyICE9PSBvcGVuZXJzX2JvdHRvbVtjbG9zZXJjY10pIHtcbiAgICAgICAgICAgICAgICBvZGRfbWF0Y2ggPSAoY2xvc2VyLmNhbl9vcGVuIHx8IG9wZW5lci5jYW5fY2xvc2UpICYmXG4gICAgICAgICAgICAgICAgICAgIChvcGVuZXIub3JpZ2RlbGltcyArIGNsb3Nlci5vcmlnZGVsaW1zKSAlIDMgPT09IDA7XG4gICAgICAgICAgICAgICAgaWYgKG9wZW5lci5jYyA9PT0gY2xvc2VyLmNjICYmIG9wZW5lci5jYW5fb3BlbiAmJiAhb2RkX21hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5lcl9mb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcGVuZXIgPSBvcGVuZXIucHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRfY2xvc2VyID0gY2xvc2VyO1xuXG4gICAgICAgICAgICBpZiAoY2xvc2VyY2MgPT09IENfQVNURVJJU0sgfHwgY2xvc2VyY2MgPT09IENfVU5ERVJTQ09SRSkge1xuICAgICAgICAgICAgICAgIGlmICghb3BlbmVyX2ZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlciA9IGNsb3Nlci5uZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBhY3R1YWwgbnVtYmVyIG9mIGRlbGltaXRlcnMgdXNlZCBmcm9tIGNsb3NlclxuICAgICAgICAgICAgICAgICAgICB1c2VfZGVsaW1zID1cbiAgICAgICAgICAgICAgICAgICAgICAoY2xvc2VyLm51bWRlbGltcyA+PSAyICYmIG9wZW5lci5udW1kZWxpbXMgPj0gMikgPyAyIDogMTtcblxuICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sID0gb3BlbmVyLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlcl9pbmwgPSBjbG9zZXIubm9kZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdXNlZCBkZWxpbWl0ZXJzIGZyb20gc3RhY2sgZWx0cyBhbmQgaW5saW5lc1xuICAgICAgICAgICAgICAgICAgICBvcGVuZXIubnVtZGVsaW1zIC09IHVzZV9kZWxpbXM7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlci5udW1kZWxpbXMgLT0gdXNlX2RlbGltcztcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2lubC5fbGl0ZXJhbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLl9saXRlcmFsLnNsaWNlKDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lcl9pbmwuX2xpdGVyYWwubGVuZ3RoIC0gdXNlX2RlbGltcyk7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlcl9pbmwuX2xpdGVyYWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VyX2lubC5fbGl0ZXJhbC5zbGljZSgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXJfaW5sLl9saXRlcmFsLmxlbmd0aCAtIHVzZV9kZWxpbXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1aWxkIGNvbnRlbnRzIGZvciBuZXcgZW1waCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbXBoID0gbmV3IE5vZGUodXNlX2RlbGltcyA9PT0gMSA/ICdlbXBoJyA6ICdzdHJvbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBvcGVuZXJfaW5sLl9uZXh0O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodG1wICYmIHRtcCAhPT0gY2xvc2VyX2lubCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHRtcC5fbmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcC51bmxpbmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcGguYXBwZW5kQ2hpbGQodG1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLmluc2VydEFmdGVyKGVtcGgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlbHRzIGJldHdlZW4gb3BlbmVyIGFuZCBjbG9zZXIgaW4gZGVsaW1pdGVycyBzdGFja1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVEZWxpbWl0ZXJzQmV0d2VlbihvcGVuZXIsIGNsb3Nlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgb3BlbmVyIGhhcyAwIGRlbGltcywgcmVtb3ZlIGl0IGFuZCB0aGUgaW5saW5lXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZXIubnVtZGVsaW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLnVubGluaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEZWxpbWl0ZXIob3BlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXIubnVtZGVsaW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXJfaW5sLnVubGluaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcHN0YWNrID0gY2xvc2VyLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURlbGltaXRlcihjbG9zZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VyID0gdGVtcHN0YWNrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xvc2VyY2MgPT09IENfU0lOR0xFUVVPVEUpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXIubm9kZS5fbGl0ZXJhbCA9IFwiXFx1MjAxOVwiO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuZXJfZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyLm5vZGUuX2xpdGVyYWwgPSBcIlxcdTIwMThcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xvc2VyID0gY2xvc2VyLm5leHQ7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xvc2VyY2MgPT09IENfRE9VQkxFUVVPVEUpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXIubm9kZS5fbGl0ZXJhbCA9IFwiXFx1MjAxRFwiO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuZXJfZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyLm5vZGUubGl0ZXJhbCA9IFwiXFx1MjAxQ1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbG9zZXIgPSBjbG9zZXIubmV4dDtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvcGVuZXJfZm91bmQgJiYgIW9kZF9tYXRjaCkge1xuICAgICAgICAgICAgICAgIC8vIFNldCBsb3dlciBib3VuZCBmb3IgZnV0dXJlIHNlYXJjaGVzIGZvciBvcGVuZXJzOlxuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGRvIHRoaXMgd2l0aCBvZGRfbWF0Y2ggYmVjYXVzZSBhICoqXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBkb2Vzbid0IG1hdGNoIGFuIGVhcmxpZXIgKiBtaWdodCB0dXJuIGludG9cbiAgICAgICAgICAgICAgICAvLyBhbiBvcGVuZXIsIGFuZCB0aGUgKiBtaWdodCBiZSBtYXRjaGVkIGJ5IHNvbWV0aGluZ1xuICAgICAgICAgICAgICAgIC8vIGVsc2UuXG4gICAgICAgICAgICAgICAgb3BlbmVyc19ib3R0b21bY2xvc2VyY2NdID0gb2xkX2Nsb3Nlci5wcmV2aW91cztcbiAgICAgICAgICAgICAgICBpZiAoIW9sZF9jbG9zZXIuY2FuX29wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuIHJlbW92ZSBhIGNsb3NlciB0aGF0IGNhbid0IGJlIGFuIG9wZW5lcixcbiAgICAgICAgICAgICAgICAgICAgLy8gb25jZSB3ZSd2ZSBzZWVuIHRoZXJlJ3Mgbm8gbWF0Y2hpbmcgb3BlbmVyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURlbGltaXRlcihvbGRfY2xvc2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBhbGwgZGVsaW1pdGVyc1xuICAgIHdoaWxlICh0aGlzLmRlbGltaXRlcnMgIT09IG51bGwgJiYgdGhpcy5kZWxpbWl0ZXJzICE9PSBzdGFja19ib3R0b20pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEZWxpbWl0ZXIodGhpcy5kZWxpbWl0ZXJzKTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGxpbmsgdGl0bGUgKHNhbnMgcXVvdGVzKSwgcmV0dXJuaW5nIHRoZSBzdHJpbmdcbi8vIG9yIG51bGwgaWYgbm8gbWF0Y2guXG52YXIgcGFyc2VMaW5rVGl0bGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGl0bGUgPSB0aGlzLm1hdGNoKHJlTGlua1RpdGxlKTtcbiAgICBpZiAodGl0bGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hvcCBvZmYgcXVvdGVzIGZyb20gdGl0bGUgYW5kIHVuZXNjYXBlOlxuICAgICAgICByZXR1cm4gdW5lc2NhcGVTdHJpbmcodGl0bGUuc3Vic3RyKDEsIHRpdGxlLmxlbmd0aCAtIDIpKTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGxpbmsgZGVzdGluYXRpb24sIHJldHVybmluZyB0aGUgc3RyaW5nIG9yXG4vLyBudWxsIGlmIG5vIG1hdGNoLlxudmFyIHBhcnNlTGlua0Rlc3RpbmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlcyA9IHRoaXMubWF0Y2gocmVMaW5rRGVzdGluYXRpb25CcmFjZXMpO1xuICAgIGlmIChyZXMgPT09IG51bGwpIHtcbiAgICAgICAgLy8gVE9ETyBoYW5kcm9sbGVkIHBhcnNlcjsgcmVzIHNob3VsZCBiZSBudWxsIG9yIHRoZSBzdHJpbmdcbiAgICAgICAgdmFyIHNhdmVwb3MgPSB0aGlzLnBvcztcbiAgICAgICAgdmFyIG9wZW5wYXJlbnMgPSAwO1xuICAgICAgICB2YXIgYztcbiAgICAgICAgd2hpbGUgKChjID0gdGhpcy5wZWVrKCkpICE9PSAtMSkge1xuICAgICAgICAgICAgaWYgKGMgPT09IENfQkFDS1NMQVNIKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wZWVrKCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSBDX09QRU5fUEFSRU4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgIG9wZW5wYXJlbnMgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gQ19DTE9TRV9QQVJFTikge1xuICAgICAgICAgICAgICAgIGlmIChvcGVucGFyZW5zIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBvcGVucGFyZW5zIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZVdoaXRlc3BhY2VDaGFyLmV4ZWMoZnJvbUNvZGVQb2ludChjKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXMgPSB0aGlzLnN1YmplY3Quc3Vic3RyKHNhdmVwb3MsIHRoaXMucG9zIC0gc2F2ZXBvcyk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVVUkkodW5lc2NhcGVTdHJpbmcocmVzKSk7XG4gICAgfSBlbHNlIHsgIC8vIGNob3Agb2ZmIHN1cnJvdW5kaW5nIDwuLj46XG4gICAgICAgIHJldHVybiBub3JtYWxpemVVUkkodW5lc2NhcGVTdHJpbmcocmVzLnN1YnN0cigxLCByZXMubGVuZ3RoIC0gMikpKTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGEgbGluayBsYWJlbCwgcmV0dXJuaW5nIG51bWJlciBvZiBjaGFyYWN0ZXJzIHBhcnNlZC5cbnZhciBwYXJzZUxpbmtMYWJlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtID0gdGhpcy5tYXRjaChyZUxpbmtMYWJlbCk7XG4gICAgLy8gTm90ZTogIG91ciByZWdleCB3aWxsIGFsbG93IHNvbWV0aGluZyBvZiBmb3JtIFsuLlxcXTtcbiAgICAvLyB3ZSBkaXNhbGxvdyBpdCBoZXJlIHJhdGhlciB0aGFuIHVzaW5nIGxvb2thaGVhZCBpbiB0aGUgcmVnZXg6XG4gICAgaWYgKG0gPT09IG51bGwgfHwgbS5sZW5ndGggPiAxMDAxIHx8IC9bXlxcXFxdXFxcXFxcXSQvLmV4ZWMobSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG0ubGVuZ3RoO1xuICAgIH1cbn07XG5cbi8vIEFkZCBvcGVuIGJyYWNrZXQgdG8gZGVsaW1pdGVyIHN0YWNrIGFuZCBhZGQgYSB0ZXh0IG5vZGUgdG8gYmxvY2sncyBjaGlsZHJlbi5cbnZhciBwYXJzZU9wZW5CcmFja2V0ID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB0aGlzLnBvcyArPSAxO1xuXG4gICAgdmFyIG5vZGUgPSB0ZXh0KCdbJyk7XG4gICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgICAvLyBBZGQgZW50cnkgdG8gc3RhY2sgZm9yIHRoaXMgb3BlbmVyXG4gICAgdGhpcy5hZGRCcmFja2V0KG5vZGUsIHN0YXJ0cG9zLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBJRiBuZXh0IGNoYXJhY3RlciBpcyBbLCBhbmQgISBkZWxpbWl0ZXIgdG8gZGVsaW1pdGVyIHN0YWNrIGFuZFxuLy8gYWRkIGEgdGV4dCBub2RlIHRvIGJsb2NrJ3MgY2hpbGRyZW4uICBPdGhlcndpc2UganVzdCBhZGQgYSB0ZXh0IG5vZGUuXG52YXIgcGFyc2VCYW5nID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIGlmICh0aGlzLnBlZWsoKSA9PT0gQ19PUEVOX0JSQUNLRVQpIHtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcblxuICAgICAgICB2YXIgbm9kZSA9IHRleHQoJyFbJyk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gICAgICAgIC8vIEFkZCBlbnRyeSB0byBzdGFjayBmb3IgdGhpcyBvcGVuZXJcbiAgICAgICAgdGhpcy5hZGRCcmFja2V0KG5vZGUsIHN0YXJ0cG9zICsgMSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dCgnIScpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBUcnkgdG8gbWF0Y2ggY2xvc2UgYnJhY2tldCBhZ2FpbnN0IGFuIG9wZW5pbmcgaW4gdGhlIGRlbGltaXRlclxuLy8gc3RhY2suICBBZGQgZWl0aGVyIGEgbGluayBvciBpbWFnZSwgb3IgYSBwbGFpbiBbIGNoYXJhY3Rlcixcbi8vIHRvIGJsb2NrJ3MgY2hpbGRyZW4uICBJZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGRlbGltaXRlcixcbi8vIHJlbW92ZSBpdCBmcm9tIHRoZSBkZWxpbWl0ZXIgc3RhY2suXG52YXIgcGFyc2VDbG9zZUJyYWNrZXQgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBzdGFydHBvcztcbiAgICB2YXIgaXNfaW1hZ2U7XG4gICAgdmFyIGRlc3Q7XG4gICAgdmFyIHRpdGxlO1xuICAgIHZhciBtYXRjaGVkID0gZmFsc2U7XG4gICAgdmFyIHJlZmxhYmVsO1xuICAgIHZhciBvcGVuZXI7XG5cbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIHN0YXJ0cG9zID0gdGhpcy5wb3M7XG5cbiAgICAvLyBnZXQgbGFzdCBbIG9yICFbXG4gICAgb3BlbmVyID0gdGhpcy5icmFja2V0cztcblxuICAgIGlmIChvcGVuZXIgPT09IG51bGwpIHtcbiAgICAgICAgLy8gbm8gbWF0Y2hlZCBvcGVuZXIsIGp1c3QgcmV0dXJuIGEgbGl0ZXJhbFxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCddJykpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIW9wZW5lci5hY3RpdmUpIHtcbiAgICAgICAgLy8gbm8gbWF0Y2hlZCBvcGVuZXIsIGp1c3QgcmV0dXJuIGEgbGl0ZXJhbFxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCddJykpO1xuICAgICAgICAvLyB0YWtlIG9wZW5lciBvZmYgYnJhY2tldHMgc3RhY2tcbiAgICAgICAgdGhpcy5yZW1vdmVCcmFja2V0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGdvdCBoZXJlLCBvcGVuIGlzIGEgcG90ZW50aWFsIG9wZW5lclxuICAgIGlzX2ltYWdlID0gb3BlbmVyLmltYWdlO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSBsaW5rL2ltYWdlXG5cbiAgICB2YXIgc2F2ZXBvcyA9IHRoaXMucG9zO1xuXG4gICAgLy8gSW5saW5lIGxpbms/XG4gICAgaWYgKHRoaXMucGVlaygpID09PSBDX09QRU5fUEFSRU4pIHtcbiAgICAgICAgdGhpcy5wb3MrKztcbiAgICAgICAgaWYgKHRoaXMuc3BubCgpICYmXG4gICAgICAgICAgICAoKGRlc3QgPSB0aGlzLnBhcnNlTGlua0Rlc3RpbmF0aW9uKCkpICE9PSBudWxsKSAmJlxuICAgICAgICAgICAgdGhpcy5zcG5sKCkgJiZcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSdzIGEgc3BhY2UgYmVmb3JlIHRoZSB0aXRsZTpcbiAgICAgICAgICAgIChyZVdoaXRlc3BhY2VDaGFyLnRlc3QodGhpcy5zdWJqZWN0LmNoYXJBdCh0aGlzLnBvcyAtIDEpKSAmJlxuICAgICAgICAgICAgICh0aXRsZSA9IHRoaXMucGFyc2VMaW5rVGl0bGUoKSkgfHwgdHJ1ZSkgJiZcbiAgICAgICAgICAgIHRoaXMuc3BubCgpICYmXG4gICAgICAgICAgICB0aGlzLnBlZWsoKSA9PT0gQ19DTE9TRV9QQVJFTikge1xuICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb3MgPSBzYXZlcG9zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFtYXRjaGVkKSB7XG5cbiAgICAgICAgLy8gTmV4dCwgc2VlIGlmIHRoZXJlJ3MgYSBsaW5rIGxhYmVsXG4gICAgICAgIHZhciBiZWZvcmVsYWJlbCA9IHRoaXMucG9zO1xuICAgICAgICB2YXIgbiA9IHRoaXMucGFyc2VMaW5rTGFiZWwoKTtcbiAgICAgICAgaWYgKG4gPiAyKSB7XG4gICAgICAgICAgICByZWZsYWJlbCA9IHRoaXMuc3ViamVjdC5zbGljZShiZWZvcmVsYWJlbCwgYmVmb3JlbGFiZWwgKyBuKTtcbiAgICAgICAgfSBlbHNlIGlmICghb3BlbmVyLmJyYWNrZXRBZnRlcikge1xuICAgICAgICAgICAgLy8gRW1wdHkgb3IgbWlzc2luZyBzZWNvbmQgbGFiZWwgbWVhbnMgdG8gdXNlIHRoZSBmaXJzdCBsYWJlbCBhcyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgICAgLy8gVGhlIHJlZmVyZW5jZSBtdXN0IG5vdCBjb250YWluIGEgYnJhY2tldC4gSWYgd2Uga25vdyB0aGVyZSdzIGEgYnJhY2tldCwgd2UgZG9uJ3QgZXZlbiBib3RoZXIgY2hlY2tpbmcgaXQuXG4gICAgICAgICAgICByZWZsYWJlbCA9IHRoaXMuc3ViamVjdC5zbGljZShvcGVuZXIuaW5kZXgsIHN0YXJ0cG9zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgICAgLy8gSWYgc2hvcnRjdXQgcmVmZXJlbmNlIGxpbmssIHJld2luZCBiZWZvcmUgc3BhY2VzIHdlIHNraXBwZWQuXG4gICAgICAgICAgICB0aGlzLnBvcyA9IHNhdmVwb3M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVmbGFiZWwpIHtcbiAgICAgICAgICAgIC8vIGxvb2t1cCByYXdsYWJlbCBpbiByZWZtYXBcbiAgICAgICAgICAgIHZhciBsaW5rID0gdGhpcy5yZWZtYXBbbm9ybWFsaXplUmVmZXJlbmNlKHJlZmxhYmVsKV07XG4gICAgICAgICAgICBpZiAobGluaykge1xuICAgICAgICAgICAgICAgIGRlc3QgPSBsaW5rLmRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgICAgIHRpdGxlID0gbGluay50aXRsZTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgIHZhciBub2RlID0gbmV3IE5vZGUoaXNfaW1hZ2UgPyAnaW1hZ2UnIDogJ2xpbmsnKTtcbiAgICAgICAgbm9kZS5fZGVzdGluYXRpb24gPSBkZXN0O1xuICAgICAgICBub2RlLl90aXRsZSA9IHRpdGxlIHx8ICcnO1xuXG4gICAgICAgIHZhciB0bXAsIG5leHQ7XG4gICAgICAgIHRtcCA9IG9wZW5lci5ub2RlLl9uZXh0O1xuICAgICAgICB3aGlsZSAodG1wKSB7XG4gICAgICAgICAgICBuZXh0ID0gdG1wLl9uZXh0O1xuICAgICAgICAgICAgdG1wLnVubGluaygpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0bXApO1xuICAgICAgICAgICAgdG1wID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzRW1waGFzaXMob3BlbmVyLnByZXZpb3VzRGVsaW1pdGVyKTtcbiAgICAgICAgdGhpcy5yZW1vdmVCcmFja2V0KCk7XG4gICAgICAgIG9wZW5lci5ub2RlLnVubGluaygpO1xuXG4gICAgICAgIC8vIFdlIHJlbW92ZSB0aGlzIGJyYWNrZXQgYW5kIHByb2Nlc3NFbXBoYXNpcyB3aWxsIHJlbW92ZSBsYXRlciBkZWxpbWl0ZXJzLlxuICAgICAgICAvLyBOb3csIGZvciBhIGxpbmssIHdlIGFsc28gZGVhY3RpdmF0ZSBlYXJsaWVyIGxpbmsgb3BlbmVycy5cbiAgICAgICAgLy8gKG5vIGxpbmtzIGluIGxpbmtzKVxuICAgICAgICBpZiAoIWlzX2ltYWdlKSB7XG4gICAgICAgICAgb3BlbmVyID0gdGhpcy5icmFja2V0cztcbiAgICAgICAgICB3aGlsZSAob3BlbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIW9wZW5lci5pbWFnZSkge1xuICAgICAgICAgICAgICAgIG9wZW5lci5hY3RpdmUgPSBmYWxzZTsgLy8gZGVhY3RpdmF0ZSB0aGlzIG9wZW5lclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3BlbmVyID0gb3BlbmVyLnByZXZpb3VzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfSBlbHNlIHsgLy8gbm8gbWF0Y2hcblxuICAgICAgICB0aGlzLnJlbW92ZUJyYWNrZXQoKTsgIC8vIHJlbW92ZSB0aGlzIG9wZW5lciBmcm9tIHN0YWNrXG4gICAgICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoJ10nKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufTtcblxudmFyIGFkZEJyYWNrZXQgPSBmdW5jdGlvbihub2RlLCBpbmRleCwgaW1hZ2UpIHtcbiAgICBpZiAodGhpcy5icmFja2V0cyAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmJyYWNrZXRzLmJyYWNrZXRBZnRlciA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuYnJhY2tldHMgPSB7IG5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IHRoaXMuYnJhY2tldHMsXG4gICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNEZWxpbWl0ZXI6IHRoaXMuZGVsaW1pdGVycyxcbiAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSB9O1xufTtcblxudmFyIHJlbW92ZUJyYWNrZXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJyYWNrZXRzID0gdGhpcy5icmFja2V0cy5wcmV2aW91cztcbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYW4gZW50aXR5LlxudmFyIHBhcnNlRW50aXR5ID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoKG0gPSB0aGlzLm1hdGNoKHJlRW50aXR5SGVyZSkpKSB7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoZGVjb2RlSFRNTChtKSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLy8gUGFyc2UgYSBydW4gb2Ygb3JkaW5hcnkgY2hhcmFjdGVycywgb3IgYSBzaW5nbGUgY2hhcmFjdGVyIHdpdGhcbi8vIGEgc3BlY2lhbCBtZWFuaW5nIGluIG1hcmtkb3duLCBhcyBhIHBsYWluIHN0cmluZy5cbnZhciBwYXJzZVN0cmluZyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKChtID0gdGhpcy5tYXRjaChyZU1haW4pKSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0KSB7XG4gICAgICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KFxuICAgICAgICAgICAgICAgIG0ucmVwbGFjZShyZUVsbGlwc2VzLCBcIlxcdTIwMjZcIilcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UocmVEYXNoLCBmdW5jdGlvbihjaGFycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVuQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVtQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJzLmxlbmd0aCAlIDMgPT09IDApIHsgLy8gSWYgZGl2aXNpYmxlIGJ5IDMsIHVzZSBhbGwgZW0gZGFzaGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1Db3VudCA9IGNoYXJzLmxlbmd0aCAvIDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJzLmxlbmd0aCAlIDIgPT09IDApIHsgLy8gSWYgZGl2aXNpYmxlIGJ5IDIsIHVzZSBhbGwgZW4gZGFzaGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5Db3VudCA9IGNoYXJzLmxlbmd0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJzLmxlbmd0aCAlIDMgPT09IDIpIHsgLy8gSWYgMiBleHRyYSBkYXNoZXMsIHVzZSBlbiBkYXNoIGZvciBsYXN0IDI7IGVtIGRhc2hlcyBmb3IgcmVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuQ291bnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtQ291bnQgPSAoY2hhcnMubGVuZ3RoIC0gMikgLyAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gVXNlIGVuIGRhc2hlcyBmb3IgbGFzdCA0IGh5cGhlbnM7IGVtIGRhc2hlcyBmb3IgcmVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuQ291bnQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtQ291bnQgPSAoY2hhcnMubGVuZ3RoIC0gNCkgLyAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXFx1MjAxNFwiLnJlcGVhdChlbUNvdW50KSArIFwiXFx1MjAxM1wiLnJlcGVhdChlbkNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQobSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vLyBQYXJzZSBhIG5ld2xpbmUuICBJZiBpdCB3YXMgcHJlY2VkZWQgYnkgdHdvIHNwYWNlcywgcmV0dXJuIGEgaGFyZFxuLy8gbGluZSBicmVhazsgb3RoZXJ3aXNlIGEgc29mdCBsaW5lIGJyZWFrLlxudmFyIHBhcnNlTmV3bGluZSA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdGhpcy5wb3MgKz0gMTsgLy8gYXNzdW1lIHdlJ3JlIGF0IGEgXFxuXG4gICAgLy8gY2hlY2sgcHJldmlvdXMgbm9kZSBmb3IgdHJhaWxpbmcgc3BhY2VzXG4gICAgdmFyIGxhc3RjID0gYmxvY2suX2xhc3RDaGlsZDtcbiAgICBpZiAobGFzdGMgJiYgbGFzdGMudHlwZSA9PT0gJ3RleHQnICYmIGxhc3RjLl9saXRlcmFsW2xhc3RjLl9saXRlcmFsLmxlbmd0aCAtIDFdID09PSAnICcpIHtcbiAgICAgICAgdmFyIGhhcmRicmVhayA9IGxhc3RjLl9saXRlcmFsW2xhc3RjLl9saXRlcmFsLmxlbmd0aCAtIDJdID09PSAnICc7XG4gICAgICAgIGxhc3RjLl9saXRlcmFsID0gbGFzdGMuX2xpdGVyYWwucmVwbGFjZShyZUZpbmFsU3BhY2UsICcnKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobmV3IE5vZGUoaGFyZGJyZWFrID8gJ2xpbmVicmVhaycgOiAnc29mdGJyZWFrJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5ldyBOb2RlKCdzb2Z0YnJlYWsnKSk7XG4gICAgfVxuICAgIHRoaXMubWF0Y2gocmVJbml0aWFsU3BhY2UpOyAvLyBnb2JibGUgbGVhZGluZyBzcGFjZXMgaW4gbmV4dCBsaW5lXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGEgbGluayByZWZlcmVuY2UsIG1vZGlmeWluZyByZWZtYXAuXG52YXIgcGFyc2VSZWZlcmVuY2UgPSBmdW5jdGlvbihzLCByZWZtYXApIHtcbiAgICB0aGlzLnN1YmplY3QgPSBzO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB2YXIgcmF3bGFiZWw7XG4gICAgdmFyIGRlc3Q7XG4gICAgdmFyIHRpdGxlO1xuICAgIHZhciBtYXRjaENoYXJzO1xuICAgIHZhciBzdGFydHBvcyA9IHRoaXMucG9zO1xuXG4gICAgLy8gbGFiZWw6XG4gICAgbWF0Y2hDaGFycyA9IHRoaXMucGFyc2VMaW5rTGFiZWwoKTtcbiAgICBpZiAobWF0Y2hDaGFycyA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByYXdsYWJlbCA9IHRoaXMuc3ViamVjdC5zdWJzdHIoMCwgbWF0Y2hDaGFycyk7XG4gICAgfVxuXG4gICAgLy8gY29sb246XG4gICAgaWYgKHRoaXMucGVlaygpID09PSBDX0NPTE9OKSB7XG4gICAgICAgIHRoaXMucG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3MgPSBzdGFydHBvcztcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gIGxpbmsgdXJsXG4gICAgdGhpcy5zcG5sKCk7XG5cbiAgICBkZXN0ID0gdGhpcy5wYXJzZUxpbmtEZXN0aW5hdGlvbigpO1xuICAgIGlmIChkZXN0ID09PSBudWxsIHx8IGRlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciBiZWZvcmV0aXRsZSA9IHRoaXMucG9zO1xuICAgIHRoaXMuc3BubCgpO1xuICAgIHRpdGxlID0gdGhpcy5wYXJzZUxpbmtUaXRsZSgpO1xuICAgIGlmICh0aXRsZSA9PT0gbnVsbCkge1xuICAgICAgICB0aXRsZSA9ICcnO1xuICAgICAgICAvLyByZXdpbmQgYmVmb3JlIHNwYWNlc1xuICAgICAgICB0aGlzLnBvcyA9IGJlZm9yZXRpdGxlO1xuICAgIH1cblxuICAgIC8vIG1ha2Ugc3VyZSB3ZSdyZSBhdCBsaW5lIGVuZDpcbiAgICB2YXIgYXRMaW5lRW5kID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5tYXRjaChyZVNwYWNlQXRFbmRPZkxpbmUpID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aXRsZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGF0TGluZUVuZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIHBvdGVudGlhbCB0aXRsZSB3ZSBmb3VuZCBpcyBub3QgYXQgdGhlIGxpbmUgZW5kLFxuICAgICAgICAgICAgLy8gYnV0IGl0IGNvdWxkIHN0aWxsIGJlIGEgbGVnYWwgbGluayByZWZlcmVuY2UgaWYgd2VcbiAgICAgICAgICAgIC8vIGRpc2NhcmQgdGhlIHRpdGxlXG4gICAgICAgICAgICB0aXRsZSA9ICcnO1xuICAgICAgICAgICAgLy8gcmV3aW5kIGJlZm9yZSBzcGFjZXNcbiAgICAgICAgICAgIHRoaXMucG9zID0gYmVmb3JldGl0bGU7XG4gICAgICAgICAgICAvLyBhbmQgaW5zdGVhZCBjaGVjayBpZiB0aGUgbGluayBVUkwgaXMgYXQgdGhlIGxpbmUgZW5kXG4gICAgICAgICAgICBhdExpbmVFbmQgPSB0aGlzLm1hdGNoKHJlU3BhY2VBdEVuZE9mTGluZSkgIT09IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWF0TGluZUVuZCkge1xuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgbm9ybWxhYmVsID0gbm9ybWFsaXplUmVmZXJlbmNlKHJhd2xhYmVsKTtcbiAgICBpZiAobm9ybWxhYmVsID09PSAnJykge1xuICAgICAgICAvLyBsYWJlbCBtdXN0IGNvbnRhaW4gbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyc1xuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAoIXJlZm1hcFtub3JtbGFiZWxdKSB7XG4gICAgICAgIHJlZm1hcFtub3JtbGFiZWxdID0geyBkZXN0aW5hdGlvbjogZGVzdCwgdGl0bGU6IHRpdGxlIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBvcyAtIHN0YXJ0cG9zO1xufTtcblxuLy8gUGFyc2UgdGhlIG5leHQgaW5saW5lIGVsZW1lbnQgaW4gc3ViamVjdCwgYWR2YW5jaW5nIHN1YmplY3QgcG9zaXRpb24uXG4vLyBPbiBzdWNjZXNzLCBhZGQgdGhlIHJlc3VsdCB0byBibG9jaydzIGNoaWxkcmVuIGFuZCByZXR1cm4gdHJ1ZS5cbi8vIE9uIGZhaWx1cmUsIHJldHVybiBmYWxzZS5cbnZhciBwYXJzZUlubGluZSA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIHJlcyA9IGZhbHNlO1xuICAgIHZhciBjID0gdGhpcy5wZWVrKCk7XG4gICAgaWYgKGMgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3dpdGNoKGMpIHtcbiAgICBjYXNlIENfTkVXTElORTpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZU5ld2xpbmUoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQkFDS1NMQVNIOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlQmFja3NsYXNoKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0JBQ0tUSUNLOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlQmFja3RpY2tzKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0FTVEVSSVNLOlxuICAgIGNhc2UgQ19VTkRFUlNDT1JFOlxuICAgICAgICByZXMgPSB0aGlzLmhhbmRsZURlbGltKGMsIGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX1NJTkdMRVFVT1RFOlxuICAgIGNhc2UgQ19ET1VCTEVRVU9URTpcbiAgICAgICAgcmVzID0gdGhpcy5vcHRpb25zLnNtYXJ0ICYmIHRoaXMuaGFuZGxlRGVsaW0oYywgYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfT1BFTl9CUkFDS0VUOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlT3BlbkJyYWNrZXQoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQkFORzpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUJhbmcoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQ0xPU0VfQlJBQ0tFVDpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUNsb3NlQnJhY2tldChibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19MRVNTVEhBTjpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUF1dG9saW5rKGJsb2NrKSB8fCB0aGlzLnBhcnNlSHRtbFRhZyhibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19BTVBFUlNBTkQ6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VFbnRpdHkoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlU3RyaW5nKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICghcmVzKSB7XG4gICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoZnJvbUNvZGVQb2ludChjKSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gUGFyc2Ugc3RyaW5nIGNvbnRlbnQgaW4gYmxvY2sgaW50byBpbmxpbmUgY2hpbGRyZW4sXG4vLyB1c2luZyByZWZtYXAgdG8gcmVzb2x2ZSByZWZlcmVuY2VzLlxudmFyIHBhcnNlSW5saW5lcyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdGhpcy5zdWJqZWN0ID0gYmxvY2suX3N0cmluZ19jb250ZW50LnRyaW0oKTtcbiAgICB0aGlzLnBvcyA9IDA7XG4gICAgdGhpcy5kZWxpbWl0ZXJzID0gbnVsbDtcbiAgICB0aGlzLmJyYWNrZXRzID0gbnVsbDtcbiAgICB3aGlsZSAodGhpcy5wYXJzZUlubGluZShibG9jaykpIHtcbiAgICB9XG4gICAgYmxvY2suX3N0cmluZ19jb250ZW50ID0gbnVsbDsgLy8gYWxsb3cgcmF3IHN0cmluZyB0byBiZSBnYXJiYWdlIGNvbGxlY3RlZFxuICAgIHRoaXMucHJvY2Vzc0VtcGhhc2lzKG51bGwpO1xufTtcblxuLy8gVGhlIElubGluZVBhcnNlciBvYmplY3QuXG5mdW5jdGlvbiBJbmxpbmVQYXJzZXIob3B0aW9ucyl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3ViamVjdDogJycsXG4gICAgICAgIGRlbGltaXRlcnM6IG51bGwsICAvLyB1c2VkIGJ5IGhhbmRsZURlbGltIG1ldGhvZFxuICAgICAgICBicmFja2V0czogbnVsbCxcbiAgICAgICAgcG9zOiAwLFxuICAgICAgICByZWZtYXA6IHt9LFxuICAgICAgICBtYXRjaDogbWF0Y2gsXG4gICAgICAgIHBlZWs6IHBlZWssXG4gICAgICAgIHNwbmw6IHNwbmwsXG4gICAgICAgIHBhcnNlQmFja3RpY2tzOiBwYXJzZUJhY2t0aWNrcyxcbiAgICAgICAgcGFyc2VCYWNrc2xhc2g6IHBhcnNlQmFja3NsYXNoLFxuICAgICAgICBwYXJzZUF1dG9saW5rOiBwYXJzZUF1dG9saW5rLFxuICAgICAgICBwYXJzZUh0bWxUYWc6IHBhcnNlSHRtbFRhZyxcbiAgICAgICAgc2NhbkRlbGltczogc2NhbkRlbGltcyxcbiAgICAgICAgaGFuZGxlRGVsaW06IGhhbmRsZURlbGltLFxuICAgICAgICBwYXJzZUxpbmtUaXRsZTogcGFyc2VMaW5rVGl0bGUsXG4gICAgICAgIHBhcnNlTGlua0Rlc3RpbmF0aW9uOiBwYXJzZUxpbmtEZXN0aW5hdGlvbixcbiAgICAgICAgcGFyc2VMaW5rTGFiZWw6IHBhcnNlTGlua0xhYmVsLFxuICAgICAgICBwYXJzZU9wZW5CcmFja2V0OiBwYXJzZU9wZW5CcmFja2V0LFxuICAgICAgICBwYXJzZUJhbmc6IHBhcnNlQmFuZyxcbiAgICAgICAgcGFyc2VDbG9zZUJyYWNrZXQ6IHBhcnNlQ2xvc2VCcmFja2V0LFxuICAgICAgICBhZGRCcmFja2V0OiBhZGRCcmFja2V0LFxuICAgICAgICByZW1vdmVCcmFja2V0OiByZW1vdmVCcmFja2V0LFxuICAgICAgICBwYXJzZUVudGl0eTogcGFyc2VFbnRpdHksXG4gICAgICAgIHBhcnNlU3RyaW5nOiBwYXJzZVN0cmluZyxcbiAgICAgICAgcGFyc2VOZXdsaW5lOiBwYXJzZU5ld2xpbmUsXG4gICAgICAgIHBhcnNlUmVmZXJlbmNlOiBwYXJzZVJlZmVyZW5jZSxcbiAgICAgICAgcGFyc2VJbmxpbmU6IHBhcnNlSW5saW5lLFxuICAgICAgICBwcm9jZXNzRW1waGFzaXM6IHByb2Nlc3NFbXBoYXNpcyxcbiAgICAgICAgcmVtb3ZlRGVsaW1pdGVyOiByZW1vdmVEZWxpbWl0ZXIsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnMgfHwge30sXG4gICAgICAgIHBhcnNlOiBwYXJzZUlubGluZXNcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZVBhcnNlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2lubGluZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBUaGUgYnVsayBvZiB0aGlzIGNvZGUgZGVyaXZlcyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kbW9zY3JvcC9mb2xkLWNhc2VcbkJ1dCBpbiBhZGRpdGlvbiB0byBjYXNlLWZvbGRpbmcsIHdlIGFsc28gbm9ybWFsaXplIHdoaXRlc3BhY2UuXG5cbmZvbGQtY2FzZSBpcyBDb3B5cmlnaHQgTWF0aGlhcyBCeW5lbnMgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS8+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbndpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG50aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbk5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcbkxJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cbk9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4vKmVzbGludC1kaXNhYmxlICBrZXktc3BhY2luZywgY29tbWEtc3BhY2luZyAqL1xuXG52YXIgcmVnZXggPSAvWyBcXHRcXHJcXG5dK3xbQS1aXFx4QjVcXHhDMC1cXHhENlxceEQ4LVxceERGXFx1MDEwMFxcdTAxMDJcXHUwMTA0XFx1MDEwNlxcdTAxMDhcXHUwMTBBXFx1MDEwQ1xcdTAxMEVcXHUwMTEwXFx1MDExMlxcdTAxMTRcXHUwMTE2XFx1MDExOFxcdTAxMUFcXHUwMTFDXFx1MDExRVxcdTAxMjBcXHUwMTIyXFx1MDEyNFxcdTAxMjZcXHUwMTI4XFx1MDEyQVxcdTAxMkNcXHUwMTJFXFx1MDEzMFxcdTAxMzJcXHUwMTM0XFx1MDEzNlxcdTAxMzlcXHUwMTNCXFx1MDEzRFxcdTAxM0ZcXHUwMTQxXFx1MDE0M1xcdTAxNDVcXHUwMTQ3XFx1MDE0OVxcdTAxNEFcXHUwMTRDXFx1MDE0RVxcdTAxNTBcXHUwMTUyXFx1MDE1NFxcdTAxNTZcXHUwMTU4XFx1MDE1QVxcdTAxNUNcXHUwMTVFXFx1MDE2MFxcdTAxNjJcXHUwMTY0XFx1MDE2NlxcdTAxNjhcXHUwMTZBXFx1MDE2Q1xcdTAxNkVcXHUwMTcwXFx1MDE3MlxcdTAxNzRcXHUwMTc2XFx1MDE3OFxcdTAxNzlcXHUwMTdCXFx1MDE3RFxcdTAxN0ZcXHUwMTgxXFx1MDE4MlxcdTAxODRcXHUwMTg2XFx1MDE4N1xcdTAxODktXFx1MDE4QlxcdTAxOEUtXFx1MDE5MVxcdTAxOTNcXHUwMTk0XFx1MDE5Ni1cXHUwMTk4XFx1MDE5Q1xcdTAxOURcXHUwMTlGXFx1MDFBMFxcdTAxQTJcXHUwMUE0XFx1MDFBNlxcdTAxQTdcXHUwMUE5XFx1MDFBQ1xcdTAxQUVcXHUwMUFGXFx1MDFCMS1cXHUwMUIzXFx1MDFCNVxcdTAxQjdcXHUwMUI4XFx1MDFCQ1xcdTAxQzRcXHUwMUM1XFx1MDFDN1xcdTAxQzhcXHUwMUNBXFx1MDFDQlxcdTAxQ0RcXHUwMUNGXFx1MDFEMVxcdTAxRDNcXHUwMUQ1XFx1MDFEN1xcdTAxRDlcXHUwMURCXFx1MDFERVxcdTAxRTBcXHUwMUUyXFx1MDFFNFxcdTAxRTZcXHUwMUU4XFx1MDFFQVxcdTAxRUNcXHUwMUVFXFx1MDFGMC1cXHUwMUYyXFx1MDFGNFxcdTAxRjYtXFx1MDFGOFxcdTAxRkFcXHUwMUZDXFx1MDFGRVxcdTAyMDBcXHUwMjAyXFx1MDIwNFxcdTAyMDZcXHUwMjA4XFx1MDIwQVxcdTAyMENcXHUwMjBFXFx1MDIxMFxcdTAyMTJcXHUwMjE0XFx1MDIxNlxcdTAyMThcXHUwMjFBXFx1MDIxQ1xcdTAyMUVcXHUwMjIwXFx1MDIyMlxcdTAyMjRcXHUwMjI2XFx1MDIyOFxcdTAyMkFcXHUwMjJDXFx1MDIyRVxcdTAyMzBcXHUwMjMyXFx1MDIzQVxcdTAyM0JcXHUwMjNEXFx1MDIzRVxcdTAyNDFcXHUwMjQzLVxcdTAyNDZcXHUwMjQ4XFx1MDI0QVxcdTAyNENcXHUwMjRFXFx1MDM0NVxcdTAzNzBcXHUwMzcyXFx1MDM3NlxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNBQlxcdTAzQjBcXHUwM0MyXFx1MDNDRi1cXHUwM0QxXFx1MDNENVxcdTAzRDZcXHUwM0Q4XFx1MDNEQVxcdTAzRENcXHUwM0RFXFx1MDNFMFxcdTAzRTJcXHUwM0U0XFx1MDNFNlxcdTAzRThcXHUwM0VBXFx1MDNFQ1xcdTAzRUVcXHUwM0YwXFx1MDNGMVxcdTAzRjRcXHUwM0Y1XFx1MDNGN1xcdTAzRjlcXHUwM0ZBXFx1MDNGRC1cXHUwNDJGXFx1MDQ2MFxcdTA0NjJcXHUwNDY0XFx1MDQ2NlxcdTA0NjhcXHUwNDZBXFx1MDQ2Q1xcdTA0NkVcXHUwNDcwXFx1MDQ3MlxcdTA0NzRcXHUwNDc2XFx1MDQ3OFxcdTA0N0FcXHUwNDdDXFx1MDQ3RVxcdTA0ODBcXHUwNDhBXFx1MDQ4Q1xcdTA0OEVcXHUwNDkwXFx1MDQ5MlxcdTA0OTRcXHUwNDk2XFx1MDQ5OFxcdTA0OUFcXHUwNDlDXFx1MDQ5RVxcdTA0QTBcXHUwNEEyXFx1MDRBNFxcdTA0QTZcXHUwNEE4XFx1MDRBQVxcdTA0QUNcXHUwNEFFXFx1MDRCMFxcdTA0QjJcXHUwNEI0XFx1MDRCNlxcdTA0QjhcXHUwNEJBXFx1MDRCQ1xcdTA0QkVcXHUwNEMwXFx1MDRDMVxcdTA0QzNcXHUwNEM1XFx1MDRDN1xcdTA0QzlcXHUwNENCXFx1MDRDRFxcdTA0RDBcXHUwNEQyXFx1MDRENFxcdTA0RDZcXHUwNEQ4XFx1MDREQVxcdTA0RENcXHUwNERFXFx1MDRFMFxcdTA0RTJcXHUwNEU0XFx1MDRFNlxcdTA0RThcXHUwNEVBXFx1MDRFQ1xcdTA0RUVcXHUwNEYwXFx1MDRGMlxcdTA0RjRcXHUwNEY2XFx1MDRGOFxcdTA0RkFcXHUwNEZDXFx1MDRGRVxcdTA1MDBcXHUwNTAyXFx1MDUwNFxcdTA1MDZcXHUwNTA4XFx1MDUwQVxcdTA1MENcXHUwNTBFXFx1MDUxMFxcdTA1MTJcXHUwNTE0XFx1MDUxNlxcdTA1MThcXHUwNTFBXFx1MDUxQ1xcdTA1MUVcXHUwNTIwXFx1MDUyMlxcdTA1MjRcXHUwNTI2XFx1MDUyOFxcdTA1MkFcXHUwNTJDXFx1MDUyRVxcdTA1MzEtXFx1MDU1NlxcdTA1ODdcXHUxMEEwLVxcdTEwQzVcXHUxMEM3XFx1MTBDRFxcdTFFMDBcXHUxRTAyXFx1MUUwNFxcdTFFMDZcXHUxRTA4XFx1MUUwQVxcdTFFMENcXHUxRTBFXFx1MUUxMFxcdTFFMTJcXHUxRTE0XFx1MUUxNlxcdTFFMThcXHUxRTFBXFx1MUUxQ1xcdTFFMUVcXHUxRTIwXFx1MUUyMlxcdTFFMjRcXHUxRTI2XFx1MUUyOFxcdTFFMkFcXHUxRTJDXFx1MUUyRVxcdTFFMzBcXHUxRTMyXFx1MUUzNFxcdTFFMzZcXHUxRTM4XFx1MUUzQVxcdTFFM0NcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUxRTQ0XFx1MUU0NlxcdTFFNDhcXHUxRTRBXFx1MUU0Q1xcdTFFNEVcXHUxRTUwXFx1MUU1MlxcdTFFNTRcXHUxRTU2XFx1MUU1OFxcdTFFNUFcXHUxRTVDXFx1MUU1RVxcdTFFNjBcXHUxRTYyXFx1MUU2NFxcdTFFNjZcXHUxRTY4XFx1MUU2QVxcdTFFNkNcXHUxRTZFXFx1MUU3MFxcdTFFNzJcXHUxRTc0XFx1MUU3NlxcdTFFNzhcXHUxRTdBXFx1MUU3Q1xcdTFFN0VcXHUxRTgwXFx1MUU4MlxcdTFFODRcXHUxRTg2XFx1MUU4OFxcdTFFOEFcXHUxRThDXFx1MUU4RVxcdTFFOTBcXHUxRTkyXFx1MUU5NFxcdTFFOTYtXFx1MUU5QlxcdTFFOUVcXHUxRUEwXFx1MUVBMlxcdTFFQTRcXHUxRUE2XFx1MUVBOFxcdTFFQUFcXHUxRUFDXFx1MUVBRVxcdTFFQjBcXHUxRUIyXFx1MUVCNFxcdTFFQjZcXHUxRUI4XFx1MUVCQVxcdTFFQkNcXHUxRUJFXFx1MUVDMFxcdTFFQzJcXHUxRUM0XFx1MUVDNlxcdTFFQzhcXHUxRUNBXFx1MUVDQ1xcdTFFQ0VcXHUxRUQwXFx1MUVEMlxcdTFFRDRcXHUxRUQ2XFx1MUVEOFxcdTFFREFcXHUxRURDXFx1MUVERVxcdTFFRTBcXHUxRUUyXFx1MUVFNFxcdTFFRTZcXHUxRUU4XFx1MUVFQVxcdTFFRUNcXHUxRUVFXFx1MUVGMFxcdTFFRjJcXHUxRUY0XFx1MUVGNlxcdTFFRjhcXHUxRUZBXFx1MUVGQ1xcdTFFRkVcXHUxRjA4LVxcdTFGMEZcXHUxRjE4LVxcdTFGMURcXHUxRjI4LVxcdTFGMkZcXHUxRjM4LVxcdTFGM0ZcXHUxRjQ4LVxcdTFGNERcXHUxRjUwXFx1MUY1MlxcdTFGNTRcXHUxRjU2XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1RlxcdTFGNjgtXFx1MUY2RlxcdTFGODAtXFx1MUZBRlxcdTFGQjItXFx1MUZCNFxcdTFGQjYtXFx1MUZCQ1xcdTFGQkVcXHUxRkMyLVxcdTFGQzRcXHUxRkM2LVxcdTFGQ0NcXHUxRkQyXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTItXFx1MUZFNFxcdTFGRTYtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIxMjZcXHUyMTJBXFx1MjEyQlxcdTIxMzJcXHUyMTYwLVxcdTIxNkZcXHUyMTgzXFx1MjRCNi1cXHUyNENGXFx1MkMwMC1cXHUyQzJFXFx1MkM2MFxcdTJDNjItXFx1MkM2NFxcdTJDNjdcXHUyQzY5XFx1MkM2QlxcdTJDNkQtXFx1MkM3MFxcdTJDNzJcXHUyQzc1XFx1MkM3RS1cXHUyQzgwXFx1MkM4MlxcdTJDODRcXHUyQzg2XFx1MkM4OFxcdTJDOEFcXHUyQzhDXFx1MkM4RVxcdTJDOTBcXHUyQzkyXFx1MkM5NFxcdTJDOTZcXHUyQzk4XFx1MkM5QVxcdTJDOUNcXHUyQzlFXFx1MkNBMFxcdTJDQTJcXHUyQ0E0XFx1MkNBNlxcdTJDQThcXHUyQ0FBXFx1MkNBQ1xcdTJDQUVcXHUyQ0IwXFx1MkNCMlxcdTJDQjRcXHUyQ0I2XFx1MkNCOFxcdTJDQkFcXHUyQ0JDXFx1MkNCRVxcdTJDQzBcXHUyQ0MyXFx1MkNDNFxcdTJDQzZcXHUyQ0M4XFx1MkNDQVxcdTJDQ0NcXHUyQ0NFXFx1MkNEMFxcdTJDRDJcXHUyQ0Q0XFx1MkNENlxcdTJDRDhcXHUyQ0RBXFx1MkNEQ1xcdTJDREVcXHUyQ0UwXFx1MkNFMlxcdTJDRUJcXHUyQ0VEXFx1MkNGMlxcdUE2NDBcXHVBNjQyXFx1QTY0NFxcdUE2NDZcXHVBNjQ4XFx1QTY0QVxcdUE2NENcXHVBNjRFXFx1QTY1MFxcdUE2NTJcXHVBNjU0XFx1QTY1NlxcdUE2NThcXHVBNjVBXFx1QTY1Q1xcdUE2NUVcXHVBNjYwXFx1QTY2MlxcdUE2NjRcXHVBNjY2XFx1QTY2OFxcdUE2NkFcXHVBNjZDXFx1QTY4MFxcdUE2ODJcXHVBNjg0XFx1QTY4NlxcdUE2ODhcXHVBNjhBXFx1QTY4Q1xcdUE2OEVcXHVBNjkwXFx1QTY5MlxcdUE2OTRcXHVBNjk2XFx1QTY5OFxcdUE2OUFcXHVBNzIyXFx1QTcyNFxcdUE3MjZcXHVBNzI4XFx1QTcyQVxcdUE3MkNcXHVBNzJFXFx1QTczMlxcdUE3MzRcXHVBNzM2XFx1QTczOFxcdUE3M0FcXHVBNzNDXFx1QTczRVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3NDZcXHVBNzQ4XFx1QTc0QVxcdUE3NENcXHVBNzRFXFx1QTc1MFxcdUE3NTJcXHVBNzU0XFx1QTc1NlxcdUE3NThcXHVBNzVBXFx1QTc1Q1xcdUE3NUVcXHVBNzYwXFx1QTc2MlxcdUE3NjRcXHVBNzY2XFx1QTc2OFxcdUE3NkFcXHVBNzZDXFx1QTc2RVxcdUE3NzlcXHVBNzdCXFx1QTc3RFxcdUE3N0VcXHVBNzgwXFx1QTc4MlxcdUE3ODRcXHVBNzg2XFx1QTc4QlxcdUE3OERcXHVBNzkwXFx1QTc5MlxcdUE3OTZcXHVBNzk4XFx1QTc5QVxcdUE3OUNcXHVBNzlFXFx1QTdBMFxcdUE3QTJcXHVBN0E0XFx1QTdBNlxcdUE3QThcXHVBN0FBLVxcdUE3QURcXHVBN0IwXFx1QTdCMVxcdUZCMDAtXFx1RkIwNlxcdUZCMTMtXFx1RkIxN1xcdUZGMjEtXFx1RkYzQV18XFx1RDgwMVtcXHVEQzAwLVxcdURDMjddfFxcdUQ4MDZbXFx1RENBMC1cXHVEQ0JGXS9nO1xuXG52YXIgbWFwID0geydBJzonYScsJ0InOidiJywnQyc6J2MnLCdEJzonZCcsJ0UnOidlJywnRic6J2YnLCdHJzonZycsJ0gnOidoJywnSSc6J2knLCdKJzonaicsJ0snOidrJywnTCc6J2wnLCdNJzonbScsJ04nOiduJywnTyc6J28nLCdQJzoncCcsJ1EnOidxJywnUic6J3InLCdTJzoncycsJ1QnOid0JywnVSc6J3UnLCdWJzondicsJ1cnOid3JywnWCc6J3gnLCdZJzoneScsJ1onOid6JywnXFx4QjUnOidcXHUwM0JDJywnXFx4QzAnOidcXHhFMCcsJ1xceEMxJzonXFx4RTEnLCdcXHhDMic6J1xceEUyJywnXFx4QzMnOidcXHhFMycsJ1xceEM0JzonXFx4RTQnLCdcXHhDNSc6J1xceEU1JywnXFx4QzYnOidcXHhFNicsJ1xceEM3JzonXFx4RTcnLCdcXHhDOCc6J1xceEU4JywnXFx4QzknOidcXHhFOScsJ1xceENBJzonXFx4RUEnLCdcXHhDQic6J1xceEVCJywnXFx4Q0MnOidcXHhFQycsJ1xceENEJzonXFx4RUQnLCdcXHhDRSc6J1xceEVFJywnXFx4Q0YnOidcXHhFRicsJ1xceEQwJzonXFx4RjAnLCdcXHhEMSc6J1xceEYxJywnXFx4RDInOidcXHhGMicsJ1xceEQzJzonXFx4RjMnLCdcXHhENCc6J1xceEY0JywnXFx4RDUnOidcXHhGNScsJ1xceEQ2JzonXFx4RjYnLCdcXHhEOCc6J1xceEY4JywnXFx4RDknOidcXHhGOScsJ1xceERBJzonXFx4RkEnLCdcXHhEQic6J1xceEZCJywnXFx4REMnOidcXHhGQycsJ1xceEREJzonXFx4RkQnLCdcXHhERSc6J1xceEZFJywnXFx1MDEwMCc6J1xcdTAxMDEnLCdcXHUwMTAyJzonXFx1MDEwMycsJ1xcdTAxMDQnOidcXHUwMTA1JywnXFx1MDEwNic6J1xcdTAxMDcnLCdcXHUwMTA4JzonXFx1MDEwOScsJ1xcdTAxMEEnOidcXHUwMTBCJywnXFx1MDEwQyc6J1xcdTAxMEQnLCdcXHUwMTBFJzonXFx1MDEwRicsJ1xcdTAxMTAnOidcXHUwMTExJywnXFx1MDExMic6J1xcdTAxMTMnLCdcXHUwMTE0JzonXFx1MDExNScsJ1xcdTAxMTYnOidcXHUwMTE3JywnXFx1MDExOCc6J1xcdTAxMTknLCdcXHUwMTFBJzonXFx1MDExQicsJ1xcdTAxMUMnOidcXHUwMTFEJywnXFx1MDExRSc6J1xcdTAxMUYnLCdcXHUwMTIwJzonXFx1MDEyMScsJ1xcdTAxMjInOidcXHUwMTIzJywnXFx1MDEyNCc6J1xcdTAxMjUnLCdcXHUwMTI2JzonXFx1MDEyNycsJ1xcdTAxMjgnOidcXHUwMTI5JywnXFx1MDEyQSc6J1xcdTAxMkInLCdcXHUwMTJDJzonXFx1MDEyRCcsJ1xcdTAxMkUnOidcXHUwMTJGJywnXFx1MDEzMic6J1xcdTAxMzMnLCdcXHUwMTM0JzonXFx1MDEzNScsJ1xcdTAxMzYnOidcXHUwMTM3JywnXFx1MDEzOSc6J1xcdTAxM0EnLCdcXHUwMTNCJzonXFx1MDEzQycsJ1xcdTAxM0QnOidcXHUwMTNFJywnXFx1MDEzRic6J1xcdTAxNDAnLCdcXHUwMTQxJzonXFx1MDE0MicsJ1xcdTAxNDMnOidcXHUwMTQ0JywnXFx1MDE0NSc6J1xcdTAxNDYnLCdcXHUwMTQ3JzonXFx1MDE0OCcsJ1xcdTAxNEEnOidcXHUwMTRCJywnXFx1MDE0Qyc6J1xcdTAxNEQnLCdcXHUwMTRFJzonXFx1MDE0RicsJ1xcdTAxNTAnOidcXHUwMTUxJywnXFx1MDE1Mic6J1xcdTAxNTMnLCdcXHUwMTU0JzonXFx1MDE1NScsJ1xcdTAxNTYnOidcXHUwMTU3JywnXFx1MDE1OCc6J1xcdTAxNTknLCdcXHUwMTVBJzonXFx1MDE1QicsJ1xcdTAxNUMnOidcXHUwMTVEJywnXFx1MDE1RSc6J1xcdTAxNUYnLCdcXHUwMTYwJzonXFx1MDE2MScsJ1xcdTAxNjInOidcXHUwMTYzJywnXFx1MDE2NCc6J1xcdTAxNjUnLCdcXHUwMTY2JzonXFx1MDE2NycsJ1xcdTAxNjgnOidcXHUwMTY5JywnXFx1MDE2QSc6J1xcdTAxNkInLCdcXHUwMTZDJzonXFx1MDE2RCcsJ1xcdTAxNkUnOidcXHUwMTZGJywnXFx1MDE3MCc6J1xcdTAxNzEnLCdcXHUwMTcyJzonXFx1MDE3MycsJ1xcdTAxNzQnOidcXHUwMTc1JywnXFx1MDE3Nic6J1xcdTAxNzcnLCdcXHUwMTc4JzonXFx4RkYnLCdcXHUwMTc5JzonXFx1MDE3QScsJ1xcdTAxN0InOidcXHUwMTdDJywnXFx1MDE3RCc6J1xcdTAxN0UnLCdcXHUwMTdGJzoncycsJ1xcdTAxODEnOidcXHUwMjUzJywnXFx1MDE4Mic6J1xcdTAxODMnLCdcXHUwMTg0JzonXFx1MDE4NScsJ1xcdTAxODYnOidcXHUwMjU0JywnXFx1MDE4Nyc6J1xcdTAxODgnLCdcXHUwMTg5JzonXFx1MDI1NicsJ1xcdTAxOEEnOidcXHUwMjU3JywnXFx1MDE4Qic6J1xcdTAxOEMnLCdcXHUwMThFJzonXFx1MDFERCcsJ1xcdTAxOEYnOidcXHUwMjU5JywnXFx1MDE5MCc6J1xcdTAyNUInLCdcXHUwMTkxJzonXFx1MDE5MicsJ1xcdTAxOTMnOidcXHUwMjYwJywnXFx1MDE5NCc6J1xcdTAyNjMnLCdcXHUwMTk2JzonXFx1MDI2OScsJ1xcdTAxOTcnOidcXHUwMjY4JywnXFx1MDE5OCc6J1xcdTAxOTknLCdcXHUwMTlDJzonXFx1MDI2RicsJ1xcdTAxOUQnOidcXHUwMjcyJywnXFx1MDE5Ric6J1xcdTAyNzUnLCdcXHUwMUEwJzonXFx1MDFBMScsJ1xcdTAxQTInOidcXHUwMUEzJywnXFx1MDFBNCc6J1xcdTAxQTUnLCdcXHUwMUE2JzonXFx1MDI4MCcsJ1xcdTAxQTcnOidcXHUwMUE4JywnXFx1MDFBOSc6J1xcdTAyODMnLCdcXHUwMUFDJzonXFx1MDFBRCcsJ1xcdTAxQUUnOidcXHUwMjg4JywnXFx1MDFBRic6J1xcdTAxQjAnLCdcXHUwMUIxJzonXFx1MDI4QScsJ1xcdTAxQjInOidcXHUwMjhCJywnXFx1MDFCMyc6J1xcdTAxQjQnLCdcXHUwMUI1JzonXFx1MDFCNicsJ1xcdTAxQjcnOidcXHUwMjkyJywnXFx1MDFCOCc6J1xcdTAxQjknLCdcXHUwMUJDJzonXFx1MDFCRCcsJ1xcdTAxQzQnOidcXHUwMUM2JywnXFx1MDFDNSc6J1xcdTAxQzYnLCdcXHUwMUM3JzonXFx1MDFDOScsJ1xcdTAxQzgnOidcXHUwMUM5JywnXFx1MDFDQSc6J1xcdTAxQ0MnLCdcXHUwMUNCJzonXFx1MDFDQycsJ1xcdTAxQ0QnOidcXHUwMUNFJywnXFx1MDFDRic6J1xcdTAxRDAnLCdcXHUwMUQxJzonXFx1MDFEMicsJ1xcdTAxRDMnOidcXHUwMUQ0JywnXFx1MDFENSc6J1xcdTAxRDYnLCdcXHUwMUQ3JzonXFx1MDFEOCcsJ1xcdTAxRDknOidcXHUwMURBJywnXFx1MDFEQic6J1xcdTAxREMnLCdcXHUwMURFJzonXFx1MDFERicsJ1xcdTAxRTAnOidcXHUwMUUxJywnXFx1MDFFMic6J1xcdTAxRTMnLCdcXHUwMUU0JzonXFx1MDFFNScsJ1xcdTAxRTYnOidcXHUwMUU3JywnXFx1MDFFOCc6J1xcdTAxRTknLCdcXHUwMUVBJzonXFx1MDFFQicsJ1xcdTAxRUMnOidcXHUwMUVEJywnXFx1MDFFRSc6J1xcdTAxRUYnLCdcXHUwMUYxJzonXFx1MDFGMycsJ1xcdTAxRjInOidcXHUwMUYzJywnXFx1MDFGNCc6J1xcdTAxRjUnLCdcXHUwMUY2JzonXFx1MDE5NScsJ1xcdTAxRjcnOidcXHUwMUJGJywnXFx1MDFGOCc6J1xcdTAxRjknLCdcXHUwMUZBJzonXFx1MDFGQicsJ1xcdTAxRkMnOidcXHUwMUZEJywnXFx1MDFGRSc6J1xcdTAxRkYnLCdcXHUwMjAwJzonXFx1MDIwMScsJ1xcdTAyMDInOidcXHUwMjAzJywnXFx1MDIwNCc6J1xcdTAyMDUnLCdcXHUwMjA2JzonXFx1MDIwNycsJ1xcdTAyMDgnOidcXHUwMjA5JywnXFx1MDIwQSc6J1xcdTAyMEInLCdcXHUwMjBDJzonXFx1MDIwRCcsJ1xcdTAyMEUnOidcXHUwMjBGJywnXFx1MDIxMCc6J1xcdTAyMTEnLCdcXHUwMjEyJzonXFx1MDIxMycsJ1xcdTAyMTQnOidcXHUwMjE1JywnXFx1MDIxNic6J1xcdTAyMTcnLCdcXHUwMjE4JzonXFx1MDIxOScsJ1xcdTAyMUEnOidcXHUwMjFCJywnXFx1MDIxQyc6J1xcdTAyMUQnLCdcXHUwMjFFJzonXFx1MDIxRicsJ1xcdTAyMjAnOidcXHUwMTlFJywnXFx1MDIyMic6J1xcdTAyMjMnLCdcXHUwMjI0JzonXFx1MDIyNScsJ1xcdTAyMjYnOidcXHUwMjI3JywnXFx1MDIyOCc6J1xcdTAyMjknLCdcXHUwMjJBJzonXFx1MDIyQicsJ1xcdTAyMkMnOidcXHUwMjJEJywnXFx1MDIyRSc6J1xcdTAyMkYnLCdcXHUwMjMwJzonXFx1MDIzMScsJ1xcdTAyMzInOidcXHUwMjMzJywnXFx1MDIzQSc6J1xcdTJDNjUnLCdcXHUwMjNCJzonXFx1MDIzQycsJ1xcdTAyM0QnOidcXHUwMTlBJywnXFx1MDIzRSc6J1xcdTJDNjYnLCdcXHUwMjQxJzonXFx1MDI0MicsJ1xcdTAyNDMnOidcXHUwMTgwJywnXFx1MDI0NCc6J1xcdTAyODknLCdcXHUwMjQ1JzonXFx1MDI4QycsJ1xcdTAyNDYnOidcXHUwMjQ3JywnXFx1MDI0OCc6J1xcdTAyNDknLCdcXHUwMjRBJzonXFx1MDI0QicsJ1xcdTAyNEMnOidcXHUwMjREJywnXFx1MDI0RSc6J1xcdTAyNEYnLCdcXHUwMzQ1JzonXFx1MDNCOScsJ1xcdTAzNzAnOidcXHUwMzcxJywnXFx1MDM3Mic6J1xcdTAzNzMnLCdcXHUwMzc2JzonXFx1MDM3NycsJ1xcdTAzN0YnOidcXHUwM0YzJywnXFx1MDM4Nic6J1xcdTAzQUMnLCdcXHUwMzg4JzonXFx1MDNBRCcsJ1xcdTAzODknOidcXHUwM0FFJywnXFx1MDM4QSc6J1xcdTAzQUYnLCdcXHUwMzhDJzonXFx1MDNDQycsJ1xcdTAzOEUnOidcXHUwM0NEJywnXFx1MDM4Ric6J1xcdTAzQ0UnLCdcXHUwMzkxJzonXFx1MDNCMScsJ1xcdTAzOTInOidcXHUwM0IyJywnXFx1MDM5Myc6J1xcdTAzQjMnLCdcXHUwMzk0JzonXFx1MDNCNCcsJ1xcdTAzOTUnOidcXHUwM0I1JywnXFx1MDM5Nic6J1xcdTAzQjYnLCdcXHUwMzk3JzonXFx1MDNCNycsJ1xcdTAzOTgnOidcXHUwM0I4JywnXFx1MDM5OSc6J1xcdTAzQjknLCdcXHUwMzlBJzonXFx1MDNCQScsJ1xcdTAzOUInOidcXHUwM0JCJywnXFx1MDM5Qyc6J1xcdTAzQkMnLCdcXHUwMzlEJzonXFx1MDNCRCcsJ1xcdTAzOUUnOidcXHUwM0JFJywnXFx1MDM5Ric6J1xcdTAzQkYnLCdcXHUwM0EwJzonXFx1MDNDMCcsJ1xcdTAzQTEnOidcXHUwM0MxJywnXFx1MDNBMyc6J1xcdTAzQzMnLCdcXHUwM0E0JzonXFx1MDNDNCcsJ1xcdTAzQTUnOidcXHUwM0M1JywnXFx1MDNBNic6J1xcdTAzQzYnLCdcXHUwM0E3JzonXFx1MDNDNycsJ1xcdTAzQTgnOidcXHUwM0M4JywnXFx1MDNBOSc6J1xcdTAzQzknLCdcXHUwM0FBJzonXFx1MDNDQScsJ1xcdTAzQUInOidcXHUwM0NCJywnXFx1MDNDMic6J1xcdTAzQzMnLCdcXHUwM0NGJzonXFx1MDNENycsJ1xcdTAzRDAnOidcXHUwM0IyJywnXFx1MDNEMSc6J1xcdTAzQjgnLCdcXHUwM0Q1JzonXFx1MDNDNicsJ1xcdTAzRDYnOidcXHUwM0MwJywnXFx1MDNEOCc6J1xcdTAzRDknLCdcXHUwM0RBJzonXFx1MDNEQicsJ1xcdTAzREMnOidcXHUwM0REJywnXFx1MDNERSc6J1xcdTAzREYnLCdcXHUwM0UwJzonXFx1MDNFMScsJ1xcdTAzRTInOidcXHUwM0UzJywnXFx1MDNFNCc6J1xcdTAzRTUnLCdcXHUwM0U2JzonXFx1MDNFNycsJ1xcdTAzRTgnOidcXHUwM0U5JywnXFx1MDNFQSc6J1xcdTAzRUInLCdcXHUwM0VDJzonXFx1MDNFRCcsJ1xcdTAzRUUnOidcXHUwM0VGJywnXFx1MDNGMCc6J1xcdTAzQkEnLCdcXHUwM0YxJzonXFx1MDNDMScsJ1xcdTAzRjQnOidcXHUwM0I4JywnXFx1MDNGNSc6J1xcdTAzQjUnLCdcXHUwM0Y3JzonXFx1MDNGOCcsJ1xcdTAzRjknOidcXHUwM0YyJywnXFx1MDNGQSc6J1xcdTAzRkInLCdcXHUwM0ZEJzonXFx1MDM3QicsJ1xcdTAzRkUnOidcXHUwMzdDJywnXFx1MDNGRic6J1xcdTAzN0QnLCdcXHUwNDAwJzonXFx1MDQ1MCcsJ1xcdTA0MDEnOidcXHUwNDUxJywnXFx1MDQwMic6J1xcdTA0NTInLCdcXHUwNDAzJzonXFx1MDQ1MycsJ1xcdTA0MDQnOidcXHUwNDU0JywnXFx1MDQwNSc6J1xcdTA0NTUnLCdcXHUwNDA2JzonXFx1MDQ1NicsJ1xcdTA0MDcnOidcXHUwNDU3JywnXFx1MDQwOCc6J1xcdTA0NTgnLCdcXHUwNDA5JzonXFx1MDQ1OScsJ1xcdTA0MEEnOidcXHUwNDVBJywnXFx1MDQwQic6J1xcdTA0NUInLCdcXHUwNDBDJzonXFx1MDQ1QycsJ1xcdTA0MEQnOidcXHUwNDVEJywnXFx1MDQwRSc6J1xcdTA0NUUnLCdcXHUwNDBGJzonXFx1MDQ1RicsJ1xcdTA0MTAnOidcXHUwNDMwJywnXFx1MDQxMSc6J1xcdTA0MzEnLCdcXHUwNDEyJzonXFx1MDQzMicsJ1xcdTA0MTMnOidcXHUwNDMzJywnXFx1MDQxNCc6J1xcdTA0MzQnLCdcXHUwNDE1JzonXFx1MDQzNScsJ1xcdTA0MTYnOidcXHUwNDM2JywnXFx1MDQxNyc6J1xcdTA0MzcnLCdcXHUwNDE4JzonXFx1MDQzOCcsJ1xcdTA0MTknOidcXHUwNDM5JywnXFx1MDQxQSc6J1xcdTA0M0EnLCdcXHUwNDFCJzonXFx1MDQzQicsJ1xcdTA0MUMnOidcXHUwNDNDJywnXFx1MDQxRCc6J1xcdTA0M0QnLCdcXHUwNDFFJzonXFx1MDQzRScsJ1xcdTA0MUYnOidcXHUwNDNGJywnXFx1MDQyMCc6J1xcdTA0NDAnLCdcXHUwNDIxJzonXFx1MDQ0MScsJ1xcdTA0MjInOidcXHUwNDQyJywnXFx1MDQyMyc6J1xcdTA0NDMnLCdcXHUwNDI0JzonXFx1MDQ0NCcsJ1xcdTA0MjUnOidcXHUwNDQ1JywnXFx1MDQyNic6J1xcdTA0NDYnLCdcXHUwNDI3JzonXFx1MDQ0NycsJ1xcdTA0MjgnOidcXHUwNDQ4JywnXFx1MDQyOSc6J1xcdTA0NDknLCdcXHUwNDJBJzonXFx1MDQ0QScsJ1xcdTA0MkInOidcXHUwNDRCJywnXFx1MDQyQyc6J1xcdTA0NEMnLCdcXHUwNDJEJzonXFx1MDQ0RCcsJ1xcdTA0MkUnOidcXHUwNDRFJywnXFx1MDQyRic6J1xcdTA0NEYnLCdcXHUwNDYwJzonXFx1MDQ2MScsJ1xcdTA0NjInOidcXHUwNDYzJywnXFx1MDQ2NCc6J1xcdTA0NjUnLCdcXHUwNDY2JzonXFx1MDQ2NycsJ1xcdTA0NjgnOidcXHUwNDY5JywnXFx1MDQ2QSc6J1xcdTA0NkInLCdcXHUwNDZDJzonXFx1MDQ2RCcsJ1xcdTA0NkUnOidcXHUwNDZGJywnXFx1MDQ3MCc6J1xcdTA0NzEnLCdcXHUwNDcyJzonXFx1MDQ3MycsJ1xcdTA0NzQnOidcXHUwNDc1JywnXFx1MDQ3Nic6J1xcdTA0NzcnLCdcXHUwNDc4JzonXFx1MDQ3OScsJ1xcdTA0N0EnOidcXHUwNDdCJywnXFx1MDQ3Qyc6J1xcdTA0N0QnLCdcXHUwNDdFJzonXFx1MDQ3RicsJ1xcdTA0ODAnOidcXHUwNDgxJywnXFx1MDQ4QSc6J1xcdTA0OEInLCdcXHUwNDhDJzonXFx1MDQ4RCcsJ1xcdTA0OEUnOidcXHUwNDhGJywnXFx1MDQ5MCc6J1xcdTA0OTEnLCdcXHUwNDkyJzonXFx1MDQ5MycsJ1xcdTA0OTQnOidcXHUwNDk1JywnXFx1MDQ5Nic6J1xcdTA0OTcnLCdcXHUwNDk4JzonXFx1MDQ5OScsJ1xcdTA0OUEnOidcXHUwNDlCJywnXFx1MDQ5Qyc6J1xcdTA0OUQnLCdcXHUwNDlFJzonXFx1MDQ5RicsJ1xcdTA0QTAnOidcXHUwNEExJywnXFx1MDRBMic6J1xcdTA0QTMnLCdcXHUwNEE0JzonXFx1MDRBNScsJ1xcdTA0QTYnOidcXHUwNEE3JywnXFx1MDRBOCc6J1xcdTA0QTknLCdcXHUwNEFBJzonXFx1MDRBQicsJ1xcdTA0QUMnOidcXHUwNEFEJywnXFx1MDRBRSc6J1xcdTA0QUYnLCdcXHUwNEIwJzonXFx1MDRCMScsJ1xcdTA0QjInOidcXHUwNEIzJywnXFx1MDRCNCc6J1xcdTA0QjUnLCdcXHUwNEI2JzonXFx1MDRCNycsJ1xcdTA0QjgnOidcXHUwNEI5JywnXFx1MDRCQSc6J1xcdTA0QkInLCdcXHUwNEJDJzonXFx1MDRCRCcsJ1xcdTA0QkUnOidcXHUwNEJGJywnXFx1MDRDMCc6J1xcdTA0Q0YnLCdcXHUwNEMxJzonXFx1MDRDMicsJ1xcdTA0QzMnOidcXHUwNEM0JywnXFx1MDRDNSc6J1xcdTA0QzYnLCdcXHUwNEM3JzonXFx1MDRDOCcsJ1xcdTA0QzknOidcXHUwNENBJywnXFx1MDRDQic6J1xcdTA0Q0MnLCdcXHUwNENEJzonXFx1MDRDRScsJ1xcdTA0RDAnOidcXHUwNEQxJywnXFx1MDREMic6J1xcdTA0RDMnLCdcXHUwNEQ0JzonXFx1MDRENScsJ1xcdTA0RDYnOidcXHUwNEQ3JywnXFx1MDREOCc6J1xcdTA0RDknLCdcXHUwNERBJzonXFx1MDREQicsJ1xcdTA0REMnOidcXHUwNEREJywnXFx1MDRERSc6J1xcdTA0REYnLCdcXHUwNEUwJzonXFx1MDRFMScsJ1xcdTA0RTInOidcXHUwNEUzJywnXFx1MDRFNCc6J1xcdTA0RTUnLCdcXHUwNEU2JzonXFx1MDRFNycsJ1xcdTA0RTgnOidcXHUwNEU5JywnXFx1MDRFQSc6J1xcdTA0RUInLCdcXHUwNEVDJzonXFx1MDRFRCcsJ1xcdTA0RUUnOidcXHUwNEVGJywnXFx1MDRGMCc6J1xcdTA0RjEnLCdcXHUwNEYyJzonXFx1MDRGMycsJ1xcdTA0RjQnOidcXHUwNEY1JywnXFx1MDRGNic6J1xcdTA0RjcnLCdcXHUwNEY4JzonXFx1MDRGOScsJ1xcdTA0RkEnOidcXHUwNEZCJywnXFx1MDRGQyc6J1xcdTA0RkQnLCdcXHUwNEZFJzonXFx1MDRGRicsJ1xcdTA1MDAnOidcXHUwNTAxJywnXFx1MDUwMic6J1xcdTA1MDMnLCdcXHUwNTA0JzonXFx1MDUwNScsJ1xcdTA1MDYnOidcXHUwNTA3JywnXFx1MDUwOCc6J1xcdTA1MDknLCdcXHUwNTBBJzonXFx1MDUwQicsJ1xcdTA1MEMnOidcXHUwNTBEJywnXFx1MDUwRSc6J1xcdTA1MEYnLCdcXHUwNTEwJzonXFx1MDUxMScsJ1xcdTA1MTInOidcXHUwNTEzJywnXFx1MDUxNCc6J1xcdTA1MTUnLCdcXHUwNTE2JzonXFx1MDUxNycsJ1xcdTA1MTgnOidcXHUwNTE5JywnXFx1MDUxQSc6J1xcdTA1MUInLCdcXHUwNTFDJzonXFx1MDUxRCcsJ1xcdTA1MUUnOidcXHUwNTFGJywnXFx1MDUyMCc6J1xcdTA1MjEnLCdcXHUwNTIyJzonXFx1MDUyMycsJ1xcdTA1MjQnOidcXHUwNTI1JywnXFx1MDUyNic6J1xcdTA1MjcnLCdcXHUwNTI4JzonXFx1MDUyOScsJ1xcdTA1MkEnOidcXHUwNTJCJywnXFx1MDUyQyc6J1xcdTA1MkQnLCdcXHUwNTJFJzonXFx1MDUyRicsJ1xcdTA1MzEnOidcXHUwNTYxJywnXFx1MDUzMic6J1xcdTA1NjInLCdcXHUwNTMzJzonXFx1MDU2MycsJ1xcdTA1MzQnOidcXHUwNTY0JywnXFx1MDUzNSc6J1xcdTA1NjUnLCdcXHUwNTM2JzonXFx1MDU2NicsJ1xcdTA1MzcnOidcXHUwNTY3JywnXFx1MDUzOCc6J1xcdTA1NjgnLCdcXHUwNTM5JzonXFx1MDU2OScsJ1xcdTA1M0EnOidcXHUwNTZBJywnXFx1MDUzQic6J1xcdTA1NkInLCdcXHUwNTNDJzonXFx1MDU2QycsJ1xcdTA1M0QnOidcXHUwNTZEJywnXFx1MDUzRSc6J1xcdTA1NkUnLCdcXHUwNTNGJzonXFx1MDU2RicsJ1xcdTA1NDAnOidcXHUwNTcwJywnXFx1MDU0MSc6J1xcdTA1NzEnLCdcXHUwNTQyJzonXFx1MDU3MicsJ1xcdTA1NDMnOidcXHUwNTczJywnXFx1MDU0NCc6J1xcdTA1NzQnLCdcXHUwNTQ1JzonXFx1MDU3NScsJ1xcdTA1NDYnOidcXHUwNTc2JywnXFx1MDU0Nyc6J1xcdTA1NzcnLCdcXHUwNTQ4JzonXFx1MDU3OCcsJ1xcdTA1NDknOidcXHUwNTc5JywnXFx1MDU0QSc6J1xcdTA1N0EnLCdcXHUwNTRCJzonXFx1MDU3QicsJ1xcdTA1NEMnOidcXHUwNTdDJywnXFx1MDU0RCc6J1xcdTA1N0QnLCdcXHUwNTRFJzonXFx1MDU3RScsJ1xcdTA1NEYnOidcXHUwNTdGJywnXFx1MDU1MCc6J1xcdTA1ODAnLCdcXHUwNTUxJzonXFx1MDU4MScsJ1xcdTA1NTInOidcXHUwNTgyJywnXFx1MDU1Myc6J1xcdTA1ODMnLCdcXHUwNTU0JzonXFx1MDU4NCcsJ1xcdTA1NTUnOidcXHUwNTg1JywnXFx1MDU1Nic6J1xcdTA1ODYnLCdcXHUxMEEwJzonXFx1MkQwMCcsJ1xcdTEwQTEnOidcXHUyRDAxJywnXFx1MTBBMic6J1xcdTJEMDInLCdcXHUxMEEzJzonXFx1MkQwMycsJ1xcdTEwQTQnOidcXHUyRDA0JywnXFx1MTBBNSc6J1xcdTJEMDUnLCdcXHUxMEE2JzonXFx1MkQwNicsJ1xcdTEwQTcnOidcXHUyRDA3JywnXFx1MTBBOCc6J1xcdTJEMDgnLCdcXHUxMEE5JzonXFx1MkQwOScsJ1xcdTEwQUEnOidcXHUyRDBBJywnXFx1MTBBQic6J1xcdTJEMEInLCdcXHUxMEFDJzonXFx1MkQwQycsJ1xcdTEwQUQnOidcXHUyRDBEJywnXFx1MTBBRSc6J1xcdTJEMEUnLCdcXHUxMEFGJzonXFx1MkQwRicsJ1xcdTEwQjAnOidcXHUyRDEwJywnXFx1MTBCMSc6J1xcdTJEMTEnLCdcXHUxMEIyJzonXFx1MkQxMicsJ1xcdTEwQjMnOidcXHUyRDEzJywnXFx1MTBCNCc6J1xcdTJEMTQnLCdcXHUxMEI1JzonXFx1MkQxNScsJ1xcdTEwQjYnOidcXHUyRDE2JywnXFx1MTBCNyc6J1xcdTJEMTcnLCdcXHUxMEI4JzonXFx1MkQxOCcsJ1xcdTEwQjknOidcXHUyRDE5JywnXFx1MTBCQSc6J1xcdTJEMUEnLCdcXHUxMEJCJzonXFx1MkQxQicsJ1xcdTEwQkMnOidcXHUyRDFDJywnXFx1MTBCRCc6J1xcdTJEMUQnLCdcXHUxMEJFJzonXFx1MkQxRScsJ1xcdTEwQkYnOidcXHUyRDFGJywnXFx1MTBDMCc6J1xcdTJEMjAnLCdcXHUxMEMxJzonXFx1MkQyMScsJ1xcdTEwQzInOidcXHUyRDIyJywnXFx1MTBDMyc6J1xcdTJEMjMnLCdcXHUxMEM0JzonXFx1MkQyNCcsJ1xcdTEwQzUnOidcXHUyRDI1JywnXFx1MTBDNyc6J1xcdTJEMjcnLCdcXHUxMENEJzonXFx1MkQyRCcsJ1xcdTFFMDAnOidcXHUxRTAxJywnXFx1MUUwMic6J1xcdTFFMDMnLCdcXHUxRTA0JzonXFx1MUUwNScsJ1xcdTFFMDYnOidcXHUxRTA3JywnXFx1MUUwOCc6J1xcdTFFMDknLCdcXHUxRTBBJzonXFx1MUUwQicsJ1xcdTFFMEMnOidcXHUxRTBEJywnXFx1MUUwRSc6J1xcdTFFMEYnLCdcXHUxRTEwJzonXFx1MUUxMScsJ1xcdTFFMTInOidcXHUxRTEzJywnXFx1MUUxNCc6J1xcdTFFMTUnLCdcXHUxRTE2JzonXFx1MUUxNycsJ1xcdTFFMTgnOidcXHUxRTE5JywnXFx1MUUxQSc6J1xcdTFFMUInLCdcXHUxRTFDJzonXFx1MUUxRCcsJ1xcdTFFMUUnOidcXHUxRTFGJywnXFx1MUUyMCc6J1xcdTFFMjEnLCdcXHUxRTIyJzonXFx1MUUyMycsJ1xcdTFFMjQnOidcXHUxRTI1JywnXFx1MUUyNic6J1xcdTFFMjcnLCdcXHUxRTI4JzonXFx1MUUyOScsJ1xcdTFFMkEnOidcXHUxRTJCJywnXFx1MUUyQyc6J1xcdTFFMkQnLCdcXHUxRTJFJzonXFx1MUUyRicsJ1xcdTFFMzAnOidcXHUxRTMxJywnXFx1MUUzMic6J1xcdTFFMzMnLCdcXHUxRTM0JzonXFx1MUUzNScsJ1xcdTFFMzYnOidcXHUxRTM3JywnXFx1MUUzOCc6J1xcdTFFMzknLCdcXHUxRTNBJzonXFx1MUUzQicsJ1xcdTFFM0MnOidcXHUxRTNEJywnXFx1MUUzRSc6J1xcdTFFM0YnLCdcXHUxRTQwJzonXFx1MUU0MScsJ1xcdTFFNDInOidcXHUxRTQzJywnXFx1MUU0NCc6J1xcdTFFNDUnLCdcXHUxRTQ2JzonXFx1MUU0NycsJ1xcdTFFNDgnOidcXHUxRTQ5JywnXFx1MUU0QSc6J1xcdTFFNEInLCdcXHUxRTRDJzonXFx1MUU0RCcsJ1xcdTFFNEUnOidcXHUxRTRGJywnXFx1MUU1MCc6J1xcdTFFNTEnLCdcXHUxRTUyJzonXFx1MUU1MycsJ1xcdTFFNTQnOidcXHUxRTU1JywnXFx1MUU1Nic6J1xcdTFFNTcnLCdcXHUxRTU4JzonXFx1MUU1OScsJ1xcdTFFNUEnOidcXHUxRTVCJywnXFx1MUU1Qyc6J1xcdTFFNUQnLCdcXHUxRTVFJzonXFx1MUU1RicsJ1xcdTFFNjAnOidcXHUxRTYxJywnXFx1MUU2Mic6J1xcdTFFNjMnLCdcXHUxRTY0JzonXFx1MUU2NScsJ1xcdTFFNjYnOidcXHUxRTY3JywnXFx1MUU2OCc6J1xcdTFFNjknLCdcXHUxRTZBJzonXFx1MUU2QicsJ1xcdTFFNkMnOidcXHUxRTZEJywnXFx1MUU2RSc6J1xcdTFFNkYnLCdcXHUxRTcwJzonXFx1MUU3MScsJ1xcdTFFNzInOidcXHUxRTczJywnXFx1MUU3NCc6J1xcdTFFNzUnLCdcXHUxRTc2JzonXFx1MUU3NycsJ1xcdTFFNzgnOidcXHUxRTc5JywnXFx1MUU3QSc6J1xcdTFFN0InLCdcXHUxRTdDJzonXFx1MUU3RCcsJ1xcdTFFN0UnOidcXHUxRTdGJywnXFx1MUU4MCc6J1xcdTFFODEnLCdcXHUxRTgyJzonXFx1MUU4MycsJ1xcdTFFODQnOidcXHUxRTg1JywnXFx1MUU4Nic6J1xcdTFFODcnLCdcXHUxRTg4JzonXFx1MUU4OScsJ1xcdTFFOEEnOidcXHUxRThCJywnXFx1MUU4Qyc6J1xcdTFFOEQnLCdcXHUxRThFJzonXFx1MUU4RicsJ1xcdTFFOTAnOidcXHUxRTkxJywnXFx1MUU5Mic6J1xcdTFFOTMnLCdcXHUxRTk0JzonXFx1MUU5NScsJ1xcdTFFOUInOidcXHUxRTYxJywnXFx1MUVBMCc6J1xcdTFFQTEnLCdcXHUxRUEyJzonXFx1MUVBMycsJ1xcdTFFQTQnOidcXHUxRUE1JywnXFx1MUVBNic6J1xcdTFFQTcnLCdcXHUxRUE4JzonXFx1MUVBOScsJ1xcdTFFQUEnOidcXHUxRUFCJywnXFx1MUVBQyc6J1xcdTFFQUQnLCdcXHUxRUFFJzonXFx1MUVBRicsJ1xcdTFFQjAnOidcXHUxRUIxJywnXFx1MUVCMic6J1xcdTFFQjMnLCdcXHUxRUI0JzonXFx1MUVCNScsJ1xcdTFFQjYnOidcXHUxRUI3JywnXFx1MUVCOCc6J1xcdTFFQjknLCdcXHUxRUJBJzonXFx1MUVCQicsJ1xcdTFFQkMnOidcXHUxRUJEJywnXFx1MUVCRSc6J1xcdTFFQkYnLCdcXHUxRUMwJzonXFx1MUVDMScsJ1xcdTFFQzInOidcXHUxRUMzJywnXFx1MUVDNCc6J1xcdTFFQzUnLCdcXHUxRUM2JzonXFx1MUVDNycsJ1xcdTFFQzgnOidcXHUxRUM5JywnXFx1MUVDQSc6J1xcdTFFQ0InLCdcXHUxRUNDJzonXFx1MUVDRCcsJ1xcdTFFQ0UnOidcXHUxRUNGJywnXFx1MUVEMCc6J1xcdTFFRDEnLCdcXHUxRUQyJzonXFx1MUVEMycsJ1xcdTFFRDQnOidcXHUxRUQ1JywnXFx1MUVENic6J1xcdTFFRDcnLCdcXHUxRUQ4JzonXFx1MUVEOScsJ1xcdTFFREEnOidcXHUxRURCJywnXFx1MUVEQyc6J1xcdTFFREQnLCdcXHUxRURFJzonXFx1MUVERicsJ1xcdTFFRTAnOidcXHUxRUUxJywnXFx1MUVFMic6J1xcdTFFRTMnLCdcXHUxRUU0JzonXFx1MUVFNScsJ1xcdTFFRTYnOidcXHUxRUU3JywnXFx1MUVFOCc6J1xcdTFFRTknLCdcXHUxRUVBJzonXFx1MUVFQicsJ1xcdTFFRUMnOidcXHUxRUVEJywnXFx1MUVFRSc6J1xcdTFFRUYnLCdcXHUxRUYwJzonXFx1MUVGMScsJ1xcdTFFRjInOidcXHUxRUYzJywnXFx1MUVGNCc6J1xcdTFFRjUnLCdcXHUxRUY2JzonXFx1MUVGNycsJ1xcdTFFRjgnOidcXHUxRUY5JywnXFx1MUVGQSc6J1xcdTFFRkInLCdcXHUxRUZDJzonXFx1MUVGRCcsJ1xcdTFFRkUnOidcXHUxRUZGJywnXFx1MUYwOCc6J1xcdTFGMDAnLCdcXHUxRjA5JzonXFx1MUYwMScsJ1xcdTFGMEEnOidcXHUxRjAyJywnXFx1MUYwQic6J1xcdTFGMDMnLCdcXHUxRjBDJzonXFx1MUYwNCcsJ1xcdTFGMEQnOidcXHUxRjA1JywnXFx1MUYwRSc6J1xcdTFGMDYnLCdcXHUxRjBGJzonXFx1MUYwNycsJ1xcdTFGMTgnOidcXHUxRjEwJywnXFx1MUYxOSc6J1xcdTFGMTEnLCdcXHUxRjFBJzonXFx1MUYxMicsJ1xcdTFGMUInOidcXHUxRjEzJywnXFx1MUYxQyc6J1xcdTFGMTQnLCdcXHUxRjFEJzonXFx1MUYxNScsJ1xcdTFGMjgnOidcXHUxRjIwJywnXFx1MUYyOSc6J1xcdTFGMjEnLCdcXHUxRjJBJzonXFx1MUYyMicsJ1xcdTFGMkInOidcXHUxRjIzJywnXFx1MUYyQyc6J1xcdTFGMjQnLCdcXHUxRjJEJzonXFx1MUYyNScsJ1xcdTFGMkUnOidcXHUxRjI2JywnXFx1MUYyRic6J1xcdTFGMjcnLCdcXHUxRjM4JzonXFx1MUYzMCcsJ1xcdTFGMzknOidcXHUxRjMxJywnXFx1MUYzQSc6J1xcdTFGMzInLCdcXHUxRjNCJzonXFx1MUYzMycsJ1xcdTFGM0MnOidcXHUxRjM0JywnXFx1MUYzRCc6J1xcdTFGMzUnLCdcXHUxRjNFJzonXFx1MUYzNicsJ1xcdTFGM0YnOidcXHUxRjM3JywnXFx1MUY0OCc6J1xcdTFGNDAnLCdcXHUxRjQ5JzonXFx1MUY0MScsJ1xcdTFGNEEnOidcXHUxRjQyJywnXFx1MUY0Qic6J1xcdTFGNDMnLCdcXHUxRjRDJzonXFx1MUY0NCcsJ1xcdTFGNEQnOidcXHUxRjQ1JywnXFx1MUY1OSc6J1xcdTFGNTEnLCdcXHUxRjVCJzonXFx1MUY1MycsJ1xcdTFGNUQnOidcXHUxRjU1JywnXFx1MUY1Ric6J1xcdTFGNTcnLCdcXHUxRjY4JzonXFx1MUY2MCcsJ1xcdTFGNjknOidcXHUxRjYxJywnXFx1MUY2QSc6J1xcdTFGNjInLCdcXHUxRjZCJzonXFx1MUY2MycsJ1xcdTFGNkMnOidcXHUxRjY0JywnXFx1MUY2RCc6J1xcdTFGNjUnLCdcXHUxRjZFJzonXFx1MUY2NicsJ1xcdTFGNkYnOidcXHUxRjY3JywnXFx1MUZCOCc6J1xcdTFGQjAnLCdcXHUxRkI5JzonXFx1MUZCMScsJ1xcdTFGQkEnOidcXHUxRjcwJywnXFx1MUZCQic6J1xcdTFGNzEnLCdcXHUxRkJFJzonXFx1MDNCOScsJ1xcdTFGQzgnOidcXHUxRjcyJywnXFx1MUZDOSc6J1xcdTFGNzMnLCdcXHUxRkNBJzonXFx1MUY3NCcsJ1xcdTFGQ0InOidcXHUxRjc1JywnXFx1MUZEOCc6J1xcdTFGRDAnLCdcXHUxRkQ5JzonXFx1MUZEMScsJ1xcdTFGREEnOidcXHUxRjc2JywnXFx1MUZEQic6J1xcdTFGNzcnLCdcXHUxRkU4JzonXFx1MUZFMCcsJ1xcdTFGRTknOidcXHUxRkUxJywnXFx1MUZFQSc6J1xcdTFGN0EnLCdcXHUxRkVCJzonXFx1MUY3QicsJ1xcdTFGRUMnOidcXHUxRkU1JywnXFx1MUZGOCc6J1xcdTFGNzgnLCdcXHUxRkY5JzonXFx1MUY3OScsJ1xcdTFGRkEnOidcXHUxRjdDJywnXFx1MUZGQic6J1xcdTFGN0QnLCdcXHUyMTI2JzonXFx1MDNDOScsJ1xcdTIxMkEnOidrJywnXFx1MjEyQic6J1xceEU1JywnXFx1MjEzMic6J1xcdTIxNEUnLCdcXHUyMTYwJzonXFx1MjE3MCcsJ1xcdTIxNjEnOidcXHUyMTcxJywnXFx1MjE2Mic6J1xcdTIxNzInLCdcXHUyMTYzJzonXFx1MjE3MycsJ1xcdTIxNjQnOidcXHUyMTc0JywnXFx1MjE2NSc6J1xcdTIxNzUnLCdcXHUyMTY2JzonXFx1MjE3NicsJ1xcdTIxNjcnOidcXHUyMTc3JywnXFx1MjE2OCc6J1xcdTIxNzgnLCdcXHUyMTY5JzonXFx1MjE3OScsJ1xcdTIxNkEnOidcXHUyMTdBJywnXFx1MjE2Qic6J1xcdTIxN0InLCdcXHUyMTZDJzonXFx1MjE3QycsJ1xcdTIxNkQnOidcXHUyMTdEJywnXFx1MjE2RSc6J1xcdTIxN0UnLCdcXHUyMTZGJzonXFx1MjE3RicsJ1xcdTIxODMnOidcXHUyMTg0JywnXFx1MjRCNic6J1xcdTI0RDAnLCdcXHUyNEI3JzonXFx1MjREMScsJ1xcdTI0QjgnOidcXHUyNEQyJywnXFx1MjRCOSc6J1xcdTI0RDMnLCdcXHUyNEJBJzonXFx1MjRENCcsJ1xcdTI0QkInOidcXHUyNEQ1JywnXFx1MjRCQyc6J1xcdTI0RDYnLCdcXHUyNEJEJzonXFx1MjRENycsJ1xcdTI0QkUnOidcXHUyNEQ4JywnXFx1MjRCRic6J1xcdTI0RDknLCdcXHUyNEMwJzonXFx1MjREQScsJ1xcdTI0QzEnOidcXHUyNERCJywnXFx1MjRDMic6J1xcdTI0REMnLCdcXHUyNEMzJzonXFx1MjRERCcsJ1xcdTI0QzQnOidcXHUyNERFJywnXFx1MjRDNSc6J1xcdTI0REYnLCdcXHUyNEM2JzonXFx1MjRFMCcsJ1xcdTI0QzcnOidcXHUyNEUxJywnXFx1MjRDOCc6J1xcdTI0RTInLCdcXHUyNEM5JzonXFx1MjRFMycsJ1xcdTI0Q0EnOidcXHUyNEU0JywnXFx1MjRDQic6J1xcdTI0RTUnLCdcXHUyNENDJzonXFx1MjRFNicsJ1xcdTI0Q0QnOidcXHUyNEU3JywnXFx1MjRDRSc6J1xcdTI0RTgnLCdcXHUyNENGJzonXFx1MjRFOScsJ1xcdTJDMDAnOidcXHUyQzMwJywnXFx1MkMwMSc6J1xcdTJDMzEnLCdcXHUyQzAyJzonXFx1MkMzMicsJ1xcdTJDMDMnOidcXHUyQzMzJywnXFx1MkMwNCc6J1xcdTJDMzQnLCdcXHUyQzA1JzonXFx1MkMzNScsJ1xcdTJDMDYnOidcXHUyQzM2JywnXFx1MkMwNyc6J1xcdTJDMzcnLCdcXHUyQzA4JzonXFx1MkMzOCcsJ1xcdTJDMDknOidcXHUyQzM5JywnXFx1MkMwQSc6J1xcdTJDM0EnLCdcXHUyQzBCJzonXFx1MkMzQicsJ1xcdTJDMEMnOidcXHUyQzNDJywnXFx1MkMwRCc6J1xcdTJDM0QnLCdcXHUyQzBFJzonXFx1MkMzRScsJ1xcdTJDMEYnOidcXHUyQzNGJywnXFx1MkMxMCc6J1xcdTJDNDAnLCdcXHUyQzExJzonXFx1MkM0MScsJ1xcdTJDMTInOidcXHUyQzQyJywnXFx1MkMxMyc6J1xcdTJDNDMnLCdcXHUyQzE0JzonXFx1MkM0NCcsJ1xcdTJDMTUnOidcXHUyQzQ1JywnXFx1MkMxNic6J1xcdTJDNDYnLCdcXHUyQzE3JzonXFx1MkM0NycsJ1xcdTJDMTgnOidcXHUyQzQ4JywnXFx1MkMxOSc6J1xcdTJDNDknLCdcXHUyQzFBJzonXFx1MkM0QScsJ1xcdTJDMUInOidcXHUyQzRCJywnXFx1MkMxQyc6J1xcdTJDNEMnLCdcXHUyQzFEJzonXFx1MkM0RCcsJ1xcdTJDMUUnOidcXHUyQzRFJywnXFx1MkMxRic6J1xcdTJDNEYnLCdcXHUyQzIwJzonXFx1MkM1MCcsJ1xcdTJDMjEnOidcXHUyQzUxJywnXFx1MkMyMic6J1xcdTJDNTInLCdcXHUyQzIzJzonXFx1MkM1MycsJ1xcdTJDMjQnOidcXHUyQzU0JywnXFx1MkMyNSc6J1xcdTJDNTUnLCdcXHUyQzI2JzonXFx1MkM1NicsJ1xcdTJDMjcnOidcXHUyQzU3JywnXFx1MkMyOCc6J1xcdTJDNTgnLCdcXHUyQzI5JzonXFx1MkM1OScsJ1xcdTJDMkEnOidcXHUyQzVBJywnXFx1MkMyQic6J1xcdTJDNUInLCdcXHUyQzJDJzonXFx1MkM1QycsJ1xcdTJDMkQnOidcXHUyQzVEJywnXFx1MkMyRSc6J1xcdTJDNUUnLCdcXHUyQzYwJzonXFx1MkM2MScsJ1xcdTJDNjInOidcXHUwMjZCJywnXFx1MkM2Myc6J1xcdTFEN0QnLCdcXHUyQzY0JzonXFx1MDI3RCcsJ1xcdTJDNjcnOidcXHUyQzY4JywnXFx1MkM2OSc6J1xcdTJDNkEnLCdcXHUyQzZCJzonXFx1MkM2QycsJ1xcdTJDNkQnOidcXHUwMjUxJywnXFx1MkM2RSc6J1xcdTAyNzEnLCdcXHUyQzZGJzonXFx1MDI1MCcsJ1xcdTJDNzAnOidcXHUwMjUyJywnXFx1MkM3Mic6J1xcdTJDNzMnLCdcXHUyQzc1JzonXFx1MkM3NicsJ1xcdTJDN0UnOidcXHUwMjNGJywnXFx1MkM3Ric6J1xcdTAyNDAnLCdcXHUyQzgwJzonXFx1MkM4MScsJ1xcdTJDODInOidcXHUyQzgzJywnXFx1MkM4NCc6J1xcdTJDODUnLCdcXHUyQzg2JzonXFx1MkM4NycsJ1xcdTJDODgnOidcXHUyQzg5JywnXFx1MkM4QSc6J1xcdTJDOEInLCdcXHUyQzhDJzonXFx1MkM4RCcsJ1xcdTJDOEUnOidcXHUyQzhGJywnXFx1MkM5MCc6J1xcdTJDOTEnLCdcXHUyQzkyJzonXFx1MkM5MycsJ1xcdTJDOTQnOidcXHUyQzk1JywnXFx1MkM5Nic6J1xcdTJDOTcnLCdcXHUyQzk4JzonXFx1MkM5OScsJ1xcdTJDOUEnOidcXHUyQzlCJywnXFx1MkM5Qyc6J1xcdTJDOUQnLCdcXHUyQzlFJzonXFx1MkM5RicsJ1xcdTJDQTAnOidcXHUyQ0ExJywnXFx1MkNBMic6J1xcdTJDQTMnLCdcXHUyQ0E0JzonXFx1MkNBNScsJ1xcdTJDQTYnOidcXHUyQ0E3JywnXFx1MkNBOCc6J1xcdTJDQTknLCdcXHUyQ0FBJzonXFx1MkNBQicsJ1xcdTJDQUMnOidcXHUyQ0FEJywnXFx1MkNBRSc6J1xcdTJDQUYnLCdcXHUyQ0IwJzonXFx1MkNCMScsJ1xcdTJDQjInOidcXHUyQ0IzJywnXFx1MkNCNCc6J1xcdTJDQjUnLCdcXHUyQ0I2JzonXFx1MkNCNycsJ1xcdTJDQjgnOidcXHUyQ0I5JywnXFx1MkNCQSc6J1xcdTJDQkInLCdcXHUyQ0JDJzonXFx1MkNCRCcsJ1xcdTJDQkUnOidcXHUyQ0JGJywnXFx1MkNDMCc6J1xcdTJDQzEnLCdcXHUyQ0MyJzonXFx1MkNDMycsJ1xcdTJDQzQnOidcXHUyQ0M1JywnXFx1MkNDNic6J1xcdTJDQzcnLCdcXHUyQ0M4JzonXFx1MkNDOScsJ1xcdTJDQ0EnOidcXHUyQ0NCJywnXFx1MkNDQyc6J1xcdTJDQ0QnLCdcXHUyQ0NFJzonXFx1MkNDRicsJ1xcdTJDRDAnOidcXHUyQ0QxJywnXFx1MkNEMic6J1xcdTJDRDMnLCdcXHUyQ0Q0JzonXFx1MkNENScsJ1xcdTJDRDYnOidcXHUyQ0Q3JywnXFx1MkNEOCc6J1xcdTJDRDknLCdcXHUyQ0RBJzonXFx1MkNEQicsJ1xcdTJDREMnOidcXHUyQ0REJywnXFx1MkNERSc6J1xcdTJDREYnLCdcXHUyQ0UwJzonXFx1MkNFMScsJ1xcdTJDRTInOidcXHUyQ0UzJywnXFx1MkNFQic6J1xcdTJDRUMnLCdcXHUyQ0VEJzonXFx1MkNFRScsJ1xcdTJDRjInOidcXHUyQ0YzJywnXFx1QTY0MCc6J1xcdUE2NDEnLCdcXHVBNjQyJzonXFx1QTY0MycsJ1xcdUE2NDQnOidcXHVBNjQ1JywnXFx1QTY0Nic6J1xcdUE2NDcnLCdcXHVBNjQ4JzonXFx1QTY0OScsJ1xcdUE2NEEnOidcXHVBNjRCJywnXFx1QTY0Qyc6J1xcdUE2NEQnLCdcXHVBNjRFJzonXFx1QTY0RicsJ1xcdUE2NTAnOidcXHVBNjUxJywnXFx1QTY1Mic6J1xcdUE2NTMnLCdcXHVBNjU0JzonXFx1QTY1NScsJ1xcdUE2NTYnOidcXHVBNjU3JywnXFx1QTY1OCc6J1xcdUE2NTknLCdcXHVBNjVBJzonXFx1QTY1QicsJ1xcdUE2NUMnOidcXHVBNjVEJywnXFx1QTY1RSc6J1xcdUE2NUYnLCdcXHVBNjYwJzonXFx1QTY2MScsJ1xcdUE2NjInOidcXHVBNjYzJywnXFx1QTY2NCc6J1xcdUE2NjUnLCdcXHVBNjY2JzonXFx1QTY2NycsJ1xcdUE2NjgnOidcXHVBNjY5JywnXFx1QTY2QSc6J1xcdUE2NkInLCdcXHVBNjZDJzonXFx1QTY2RCcsJ1xcdUE2ODAnOidcXHVBNjgxJywnXFx1QTY4Mic6J1xcdUE2ODMnLCdcXHVBNjg0JzonXFx1QTY4NScsJ1xcdUE2ODYnOidcXHVBNjg3JywnXFx1QTY4OCc6J1xcdUE2ODknLCdcXHVBNjhBJzonXFx1QTY4QicsJ1xcdUE2OEMnOidcXHVBNjhEJywnXFx1QTY4RSc6J1xcdUE2OEYnLCdcXHVBNjkwJzonXFx1QTY5MScsJ1xcdUE2OTInOidcXHVBNjkzJywnXFx1QTY5NCc6J1xcdUE2OTUnLCdcXHVBNjk2JzonXFx1QTY5NycsJ1xcdUE2OTgnOidcXHVBNjk5JywnXFx1QTY5QSc6J1xcdUE2OUInLCdcXHVBNzIyJzonXFx1QTcyMycsJ1xcdUE3MjQnOidcXHVBNzI1JywnXFx1QTcyNic6J1xcdUE3MjcnLCdcXHVBNzI4JzonXFx1QTcyOScsJ1xcdUE3MkEnOidcXHVBNzJCJywnXFx1QTcyQyc6J1xcdUE3MkQnLCdcXHVBNzJFJzonXFx1QTcyRicsJ1xcdUE3MzInOidcXHVBNzMzJywnXFx1QTczNCc6J1xcdUE3MzUnLCdcXHVBNzM2JzonXFx1QTczNycsJ1xcdUE3MzgnOidcXHVBNzM5JywnXFx1QTczQSc6J1xcdUE3M0InLCdcXHVBNzNDJzonXFx1QTczRCcsJ1xcdUE3M0UnOidcXHVBNzNGJywnXFx1QTc0MCc6J1xcdUE3NDEnLCdcXHVBNzQyJzonXFx1QTc0MycsJ1xcdUE3NDQnOidcXHVBNzQ1JywnXFx1QTc0Nic6J1xcdUE3NDcnLCdcXHVBNzQ4JzonXFx1QTc0OScsJ1xcdUE3NEEnOidcXHVBNzRCJywnXFx1QTc0Qyc6J1xcdUE3NEQnLCdcXHVBNzRFJzonXFx1QTc0RicsJ1xcdUE3NTAnOidcXHVBNzUxJywnXFx1QTc1Mic6J1xcdUE3NTMnLCdcXHVBNzU0JzonXFx1QTc1NScsJ1xcdUE3NTYnOidcXHVBNzU3JywnXFx1QTc1OCc6J1xcdUE3NTknLCdcXHVBNzVBJzonXFx1QTc1QicsJ1xcdUE3NUMnOidcXHVBNzVEJywnXFx1QTc1RSc6J1xcdUE3NUYnLCdcXHVBNzYwJzonXFx1QTc2MScsJ1xcdUE3NjInOidcXHVBNzYzJywnXFx1QTc2NCc6J1xcdUE3NjUnLCdcXHVBNzY2JzonXFx1QTc2NycsJ1xcdUE3NjgnOidcXHVBNzY5JywnXFx1QTc2QSc6J1xcdUE3NkInLCdcXHVBNzZDJzonXFx1QTc2RCcsJ1xcdUE3NkUnOidcXHVBNzZGJywnXFx1QTc3OSc6J1xcdUE3N0EnLCdcXHVBNzdCJzonXFx1QTc3QycsJ1xcdUE3N0QnOidcXHUxRDc5JywnXFx1QTc3RSc6J1xcdUE3N0YnLCdcXHVBNzgwJzonXFx1QTc4MScsJ1xcdUE3ODInOidcXHVBNzgzJywnXFx1QTc4NCc6J1xcdUE3ODUnLCdcXHVBNzg2JzonXFx1QTc4NycsJ1xcdUE3OEInOidcXHVBNzhDJywnXFx1QTc4RCc6J1xcdTAyNjUnLCdcXHVBNzkwJzonXFx1QTc5MScsJ1xcdUE3OTInOidcXHVBNzkzJywnXFx1QTc5Nic6J1xcdUE3OTcnLCdcXHVBNzk4JzonXFx1QTc5OScsJ1xcdUE3OUEnOidcXHVBNzlCJywnXFx1QTc5Qyc6J1xcdUE3OUQnLCdcXHVBNzlFJzonXFx1QTc5RicsJ1xcdUE3QTAnOidcXHVBN0ExJywnXFx1QTdBMic6J1xcdUE3QTMnLCdcXHVBN0E0JzonXFx1QTdBNScsJ1xcdUE3QTYnOidcXHVBN0E3JywnXFx1QTdBOCc6J1xcdUE3QTknLCdcXHVBN0FBJzonXFx1MDI2NicsJ1xcdUE3QUInOidcXHUwMjVDJywnXFx1QTdBQyc6J1xcdTAyNjEnLCdcXHVBN0FEJzonXFx1MDI2QycsJ1xcdUE3QjAnOidcXHUwMjlFJywnXFx1QTdCMSc6J1xcdTAyODcnLCdcXHVGRjIxJzonXFx1RkY0MScsJ1xcdUZGMjInOidcXHVGRjQyJywnXFx1RkYyMyc6J1xcdUZGNDMnLCdcXHVGRjI0JzonXFx1RkY0NCcsJ1xcdUZGMjUnOidcXHVGRjQ1JywnXFx1RkYyNic6J1xcdUZGNDYnLCdcXHVGRjI3JzonXFx1RkY0NycsJ1xcdUZGMjgnOidcXHVGRjQ4JywnXFx1RkYyOSc6J1xcdUZGNDknLCdcXHVGRjJBJzonXFx1RkY0QScsJ1xcdUZGMkInOidcXHVGRjRCJywnXFx1RkYyQyc6J1xcdUZGNEMnLCdcXHVGRjJEJzonXFx1RkY0RCcsJ1xcdUZGMkUnOidcXHVGRjRFJywnXFx1RkYyRic6J1xcdUZGNEYnLCdcXHVGRjMwJzonXFx1RkY1MCcsJ1xcdUZGMzEnOidcXHVGRjUxJywnXFx1RkYzMic6J1xcdUZGNTInLCdcXHVGRjMzJzonXFx1RkY1MycsJ1xcdUZGMzQnOidcXHVGRjU0JywnXFx1RkYzNSc6J1xcdUZGNTUnLCdcXHVGRjM2JzonXFx1RkY1NicsJ1xcdUZGMzcnOidcXHVGRjU3JywnXFx1RkYzOCc6J1xcdUZGNTgnLCdcXHVGRjM5JzonXFx1RkY1OScsJ1xcdUZGM0EnOidcXHVGRjVBJywnXFx1RDgwMVxcdURDMDAnOidcXHVEODAxXFx1REMyOCcsJ1xcdUQ4MDFcXHVEQzAxJzonXFx1RDgwMVxcdURDMjknLCdcXHVEODAxXFx1REMwMic6J1xcdUQ4MDFcXHVEQzJBJywnXFx1RDgwMVxcdURDMDMnOidcXHVEODAxXFx1REMyQicsJ1xcdUQ4MDFcXHVEQzA0JzonXFx1RDgwMVxcdURDMkMnLCdcXHVEODAxXFx1REMwNSc6J1xcdUQ4MDFcXHVEQzJEJywnXFx1RDgwMVxcdURDMDYnOidcXHVEODAxXFx1REMyRScsJ1xcdUQ4MDFcXHVEQzA3JzonXFx1RDgwMVxcdURDMkYnLCdcXHVEODAxXFx1REMwOCc6J1xcdUQ4MDFcXHVEQzMwJywnXFx1RDgwMVxcdURDMDknOidcXHVEODAxXFx1REMzMScsJ1xcdUQ4MDFcXHVEQzBBJzonXFx1RDgwMVxcdURDMzInLCdcXHVEODAxXFx1REMwQic6J1xcdUQ4MDFcXHVEQzMzJywnXFx1RDgwMVxcdURDMEMnOidcXHVEODAxXFx1REMzNCcsJ1xcdUQ4MDFcXHVEQzBEJzonXFx1RDgwMVxcdURDMzUnLCdcXHVEODAxXFx1REMwRSc6J1xcdUQ4MDFcXHVEQzM2JywnXFx1RDgwMVxcdURDMEYnOidcXHVEODAxXFx1REMzNycsJ1xcdUQ4MDFcXHVEQzEwJzonXFx1RDgwMVxcdURDMzgnLCdcXHVEODAxXFx1REMxMSc6J1xcdUQ4MDFcXHVEQzM5JywnXFx1RDgwMVxcdURDMTInOidcXHVEODAxXFx1REMzQScsJ1xcdUQ4MDFcXHVEQzEzJzonXFx1RDgwMVxcdURDM0InLCdcXHVEODAxXFx1REMxNCc6J1xcdUQ4MDFcXHVEQzNDJywnXFx1RDgwMVxcdURDMTUnOidcXHVEODAxXFx1REMzRCcsJ1xcdUQ4MDFcXHVEQzE2JzonXFx1RDgwMVxcdURDM0UnLCdcXHVEODAxXFx1REMxNyc6J1xcdUQ4MDFcXHVEQzNGJywnXFx1RDgwMVxcdURDMTgnOidcXHVEODAxXFx1REM0MCcsJ1xcdUQ4MDFcXHVEQzE5JzonXFx1RDgwMVxcdURDNDEnLCdcXHVEODAxXFx1REMxQSc6J1xcdUQ4MDFcXHVEQzQyJywnXFx1RDgwMVxcdURDMUInOidcXHVEODAxXFx1REM0MycsJ1xcdUQ4MDFcXHVEQzFDJzonXFx1RDgwMVxcdURDNDQnLCdcXHVEODAxXFx1REMxRCc6J1xcdUQ4MDFcXHVEQzQ1JywnXFx1RDgwMVxcdURDMUUnOidcXHVEODAxXFx1REM0NicsJ1xcdUQ4MDFcXHVEQzFGJzonXFx1RDgwMVxcdURDNDcnLCdcXHVEODAxXFx1REMyMCc6J1xcdUQ4MDFcXHVEQzQ4JywnXFx1RDgwMVxcdURDMjEnOidcXHVEODAxXFx1REM0OScsJ1xcdUQ4MDFcXHVEQzIyJzonXFx1RDgwMVxcdURDNEEnLCdcXHVEODAxXFx1REMyMyc6J1xcdUQ4MDFcXHVEQzRCJywnXFx1RDgwMVxcdURDMjQnOidcXHVEODAxXFx1REM0QycsJ1xcdUQ4MDFcXHVEQzI1JzonXFx1RDgwMVxcdURDNEQnLCdcXHVEODAxXFx1REMyNic6J1xcdUQ4MDFcXHVEQzRFJywnXFx1RDgwMVxcdURDMjcnOidcXHVEODAxXFx1REM0RicsJ1xcdUQ4MDZcXHVEQ0EwJzonXFx1RDgwNlxcdURDQzAnLCdcXHVEODA2XFx1RENBMSc6J1xcdUQ4MDZcXHVEQ0MxJywnXFx1RDgwNlxcdURDQTInOidcXHVEODA2XFx1RENDMicsJ1xcdUQ4MDZcXHVEQ0EzJzonXFx1RDgwNlxcdURDQzMnLCdcXHVEODA2XFx1RENBNCc6J1xcdUQ4MDZcXHVEQ0M0JywnXFx1RDgwNlxcdURDQTUnOidcXHVEODA2XFx1RENDNScsJ1xcdUQ4MDZcXHVEQ0E2JzonXFx1RDgwNlxcdURDQzYnLCdcXHVEODA2XFx1RENBNyc6J1xcdUQ4MDZcXHVEQ0M3JywnXFx1RDgwNlxcdURDQTgnOidcXHVEODA2XFx1RENDOCcsJ1xcdUQ4MDZcXHVEQ0E5JzonXFx1RDgwNlxcdURDQzknLCdcXHVEODA2XFx1RENBQSc6J1xcdUQ4MDZcXHVEQ0NBJywnXFx1RDgwNlxcdURDQUInOidcXHVEODA2XFx1RENDQicsJ1xcdUQ4MDZcXHVEQ0FDJzonXFx1RDgwNlxcdURDQ0MnLCdcXHVEODA2XFx1RENBRCc6J1xcdUQ4MDZcXHVEQ0NEJywnXFx1RDgwNlxcdURDQUUnOidcXHVEODA2XFx1RENDRScsJ1xcdUQ4MDZcXHVEQ0FGJzonXFx1RDgwNlxcdURDQ0YnLCdcXHVEODA2XFx1RENCMCc6J1xcdUQ4MDZcXHVEQ0QwJywnXFx1RDgwNlxcdURDQjEnOidcXHVEODA2XFx1RENEMScsJ1xcdUQ4MDZcXHVEQ0IyJzonXFx1RDgwNlxcdURDRDInLCdcXHVEODA2XFx1RENCMyc6J1xcdUQ4MDZcXHVEQ0QzJywnXFx1RDgwNlxcdURDQjQnOidcXHVEODA2XFx1RENENCcsJ1xcdUQ4MDZcXHVEQ0I1JzonXFx1RDgwNlxcdURDRDUnLCdcXHVEODA2XFx1RENCNic6J1xcdUQ4MDZcXHVEQ0Q2JywnXFx1RDgwNlxcdURDQjcnOidcXHVEODA2XFx1RENENycsJ1xcdUQ4MDZcXHVEQ0I4JzonXFx1RDgwNlxcdURDRDgnLCdcXHVEODA2XFx1RENCOSc6J1xcdUQ4MDZcXHVEQ0Q5JywnXFx1RDgwNlxcdURDQkEnOidcXHVEODA2XFx1RENEQScsJ1xcdUQ4MDZcXHVEQ0JCJzonXFx1RDgwNlxcdURDREInLCdcXHVEODA2XFx1RENCQyc6J1xcdUQ4MDZcXHVEQ0RDJywnXFx1RDgwNlxcdURDQkQnOidcXHVEODA2XFx1RENERCcsJ1xcdUQ4MDZcXHVEQ0JFJzonXFx1RDgwNlxcdURDREUnLCdcXHVEODA2XFx1RENCRic6J1xcdUQ4MDZcXHVEQ0RGJywnXFx4REYnOidzcycsJ1xcdTAxMzAnOidpXFx1MDMwNycsJ1xcdTAxNDknOidcXHUwMkJDbicsJ1xcdTAxRjAnOidqXFx1MDMwQycsJ1xcdTAzOTAnOidcXHUwM0I5XFx1MDMwOFxcdTAzMDEnLCdcXHUwM0IwJzonXFx1MDNDNVxcdTAzMDhcXHUwMzAxJywnXFx1MDU4Nyc6J1xcdTA1NjVcXHUwNTgyJywnXFx1MUU5Nic6J2hcXHUwMzMxJywnXFx1MUU5Nyc6J3RcXHUwMzA4JywnXFx1MUU5OCc6J3dcXHUwMzBBJywnXFx1MUU5OSc6J3lcXHUwMzBBJywnXFx1MUU5QSc6J2FcXHUwMkJFJywnXFx1MUU5RSc6J3NzJywnXFx1MUY1MCc6J1xcdTAzQzVcXHUwMzEzJywnXFx1MUY1Mic6J1xcdTAzQzVcXHUwMzEzXFx1MDMwMCcsJ1xcdTFGNTQnOidcXHUwM0M1XFx1MDMxM1xcdTAzMDEnLCdcXHUxRjU2JzonXFx1MDNDNVxcdTAzMTNcXHUwMzQyJywnXFx1MUY4MCc6J1xcdTFGMDBcXHUwM0I5JywnXFx1MUY4MSc6J1xcdTFGMDFcXHUwM0I5JywnXFx1MUY4Mic6J1xcdTFGMDJcXHUwM0I5JywnXFx1MUY4Myc6J1xcdTFGMDNcXHUwM0I5JywnXFx1MUY4NCc6J1xcdTFGMDRcXHUwM0I5JywnXFx1MUY4NSc6J1xcdTFGMDVcXHUwM0I5JywnXFx1MUY4Nic6J1xcdTFGMDZcXHUwM0I5JywnXFx1MUY4Nyc6J1xcdTFGMDdcXHUwM0I5JywnXFx1MUY4OCc6J1xcdTFGMDBcXHUwM0I5JywnXFx1MUY4OSc6J1xcdTFGMDFcXHUwM0I5JywnXFx1MUY4QSc6J1xcdTFGMDJcXHUwM0I5JywnXFx1MUY4Qic6J1xcdTFGMDNcXHUwM0I5JywnXFx1MUY4Qyc6J1xcdTFGMDRcXHUwM0I5JywnXFx1MUY4RCc6J1xcdTFGMDVcXHUwM0I5JywnXFx1MUY4RSc6J1xcdTFGMDZcXHUwM0I5JywnXFx1MUY4Ric6J1xcdTFGMDdcXHUwM0I5JywnXFx1MUY5MCc6J1xcdTFGMjBcXHUwM0I5JywnXFx1MUY5MSc6J1xcdTFGMjFcXHUwM0I5JywnXFx1MUY5Mic6J1xcdTFGMjJcXHUwM0I5JywnXFx1MUY5Myc6J1xcdTFGMjNcXHUwM0I5JywnXFx1MUY5NCc6J1xcdTFGMjRcXHUwM0I5JywnXFx1MUY5NSc6J1xcdTFGMjVcXHUwM0I5JywnXFx1MUY5Nic6J1xcdTFGMjZcXHUwM0I5JywnXFx1MUY5Nyc6J1xcdTFGMjdcXHUwM0I5JywnXFx1MUY5OCc6J1xcdTFGMjBcXHUwM0I5JywnXFx1MUY5OSc6J1xcdTFGMjFcXHUwM0I5JywnXFx1MUY5QSc6J1xcdTFGMjJcXHUwM0I5JywnXFx1MUY5Qic6J1xcdTFGMjNcXHUwM0I5JywnXFx1MUY5Qyc6J1xcdTFGMjRcXHUwM0I5JywnXFx1MUY5RCc6J1xcdTFGMjVcXHUwM0I5JywnXFx1MUY5RSc6J1xcdTFGMjZcXHUwM0I5JywnXFx1MUY5Ric6J1xcdTFGMjdcXHUwM0I5JywnXFx1MUZBMCc6J1xcdTFGNjBcXHUwM0I5JywnXFx1MUZBMSc6J1xcdTFGNjFcXHUwM0I5JywnXFx1MUZBMic6J1xcdTFGNjJcXHUwM0I5JywnXFx1MUZBMyc6J1xcdTFGNjNcXHUwM0I5JywnXFx1MUZBNCc6J1xcdTFGNjRcXHUwM0I5JywnXFx1MUZBNSc6J1xcdTFGNjVcXHUwM0I5JywnXFx1MUZBNic6J1xcdTFGNjZcXHUwM0I5JywnXFx1MUZBNyc6J1xcdTFGNjdcXHUwM0I5JywnXFx1MUZBOCc6J1xcdTFGNjBcXHUwM0I5JywnXFx1MUZBOSc6J1xcdTFGNjFcXHUwM0I5JywnXFx1MUZBQSc6J1xcdTFGNjJcXHUwM0I5JywnXFx1MUZBQic6J1xcdTFGNjNcXHUwM0I5JywnXFx1MUZBQyc6J1xcdTFGNjRcXHUwM0I5JywnXFx1MUZBRCc6J1xcdTFGNjVcXHUwM0I5JywnXFx1MUZBRSc6J1xcdTFGNjZcXHUwM0I5JywnXFx1MUZBRic6J1xcdTFGNjdcXHUwM0I5JywnXFx1MUZCMic6J1xcdTFGNzBcXHUwM0I5JywnXFx1MUZCMyc6J1xcdTAzQjFcXHUwM0I5JywnXFx1MUZCNCc6J1xcdTAzQUNcXHUwM0I5JywnXFx1MUZCNic6J1xcdTAzQjFcXHUwMzQyJywnXFx1MUZCNyc6J1xcdTAzQjFcXHUwMzQyXFx1MDNCOScsJ1xcdTFGQkMnOidcXHUwM0IxXFx1MDNCOScsJ1xcdTFGQzInOidcXHUxRjc0XFx1MDNCOScsJ1xcdTFGQzMnOidcXHUwM0I3XFx1MDNCOScsJ1xcdTFGQzQnOidcXHUwM0FFXFx1MDNCOScsJ1xcdTFGQzYnOidcXHUwM0I3XFx1MDM0MicsJ1xcdTFGQzcnOidcXHUwM0I3XFx1MDM0MlxcdTAzQjknLCdcXHUxRkNDJzonXFx1MDNCN1xcdTAzQjknLCdcXHUxRkQyJzonXFx1MDNCOVxcdTAzMDhcXHUwMzAwJywnXFx1MUZEMyc6J1xcdTAzQjlcXHUwMzA4XFx1MDMwMScsJ1xcdTFGRDYnOidcXHUwM0I5XFx1MDM0MicsJ1xcdTFGRDcnOidcXHUwM0I5XFx1MDMwOFxcdTAzNDInLCdcXHUxRkUyJzonXFx1MDNDNVxcdTAzMDhcXHUwMzAwJywnXFx1MUZFMyc6J1xcdTAzQzVcXHUwMzA4XFx1MDMwMScsJ1xcdTFGRTQnOidcXHUwM0MxXFx1MDMxMycsJ1xcdTFGRTYnOidcXHUwM0M1XFx1MDM0MicsJ1xcdTFGRTcnOidcXHUwM0M1XFx1MDMwOFxcdTAzNDInLCdcXHUxRkYyJzonXFx1MUY3Q1xcdTAzQjknLCdcXHUxRkYzJzonXFx1MDNDOVxcdTAzQjknLCdcXHUxRkY0JzonXFx1MDNDRVxcdTAzQjknLCdcXHUxRkY2JzonXFx1MDNDOVxcdTAzNDInLCdcXHUxRkY3JzonXFx1MDNDOVxcdTAzNDJcXHUwM0I5JywnXFx1MUZGQyc6J1xcdTAzQzlcXHUwM0I5JywnXFx1RkIwMCc6J2ZmJywnXFx1RkIwMSc6J2ZpJywnXFx1RkIwMic6J2ZsJywnXFx1RkIwMyc6J2ZmaScsJ1xcdUZCMDQnOidmZmwnLCdcXHVGQjA1Jzonc3QnLCdcXHVGQjA2Jzonc3QnLCdcXHVGQjEzJzonXFx1MDU3NFxcdTA1NzYnLCdcXHVGQjE0JzonXFx1MDU3NFxcdTA1NjUnLCdcXHVGQjE1JzonXFx1MDU3NFxcdTA1NkInLCdcXHVGQjE2JzonXFx1MDU3RVxcdTA1NzYnLCdcXHVGQjE3JzonXFx1MDU3NFxcdTA1NkQnfTtcblxuLy8gTm9ybWFsaXplIHJlZmVyZW5jZSBsYWJlbDogY29sbGFwc2UgaW50ZXJuYWwgd2hpdGVzcGFjZVxuLy8gdG8gc2luZ2xlIHNwYWNlLCByZW1vdmUgbGVhZGluZy90cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXNlIGZvbGQuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuc2xpY2UoMSwgc3RyaW5nLmxlbmd0aCAtIDEpLnRyaW0oKS5yZXBsYWNlKHJlZ2V4LCBmdW5jdGlvbigkMCkge1xuICAgICAgICAvLyBOb3RlOiB0aGVyZSBpcyBubyBuZWVkIHRvIGNoZWNrIGBoYXNPd25Qcm9wZXJ0eSgkMClgIGhlcmUuXG4gICAgICAgIC8vIElmIGNoYXJhY3RlciBub3QgZm91bmQgaW4gbG9va3VwIHRhYmxlLCBpdCBtdXN0IGJlIHdoaXRlc3BhY2UuXG4gICAgICAgIHJldHVybiBtYXBbJDBdIHx8ICcgJztcbiAgICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ub3JtYWxpemUtcmVmZXJlbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZGVyaXZlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5mcm9tQ29kZVBvaW50XG4vKiEgaHR0cDovL210aHMuYmUvZnJvbWNvZGVwb2ludCB2MC4yLjEgYnkgQG1hdGhpYXMgKi9cbmlmIChTdHJpbmcuZnJvbUNvZGVQb2ludCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludChfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSYW5nZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9O1xuXG59IGVsc2Uge1xuXG4gIHZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICB2YXIgZnJvbUNvZGVQb2ludCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIE1BWF9TSVpFID0gMHg0MDAwO1xuICAgICAgdmFyIGNvZGVVbml0cyA9IFtdO1xuICAgICAgdmFyIGhpZ2hTdXJyb2dhdGU7XG4gICAgICB2YXIgbG93U3Vycm9nYXRlO1xuICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICB2YXIgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgIWlzRmluaXRlKGNvZGVQb2ludCkgfHwgLy8gYE5hTmAsIGArSW5maW5pdHlgLCBvciBgLUluZmluaXR5YFxuICAgICAgICAgICAgICAgICAgY29kZVBvaW50IDwgMCB8fCAvLyBub3QgYSB2YWxpZCBVbmljb2RlIGNvZGUgcG9pbnRcbiAgICAgICAgICAgICAgICAgIGNvZGVQb2ludCA+IDB4MTBGRkZGIHx8IC8vIG5vdCBhIHZhbGlkIFVuaWNvZGUgY29kZSBwb2ludFxuICAgICAgICAgICAgICAgICAgZmxvb3IoY29kZVBvaW50KSAhPT0gY29kZVBvaW50IC8vIG5vdCBhbiBpbnRlZ2VyXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhGRkZGKSB7IC8vIEJNUCBjb2RlIHBvaW50XG4gICAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gQXN0cmFsIGNvZGUgcG9pbnQ7IHNwbGl0IGluIHN1cnJvZ2F0ZSBoYWx2ZXNcbiAgICAgICAgICAgICAgLy8gaHR0cDovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcbiAgICAgICAgICAgICAgY29kZVBvaW50IC09IDB4MTAwMDA7XG4gICAgICAgICAgICAgIGhpZ2hTdXJyb2dhdGUgPSAoY29kZVBvaW50ID4+IDEwKSArIDB4RDgwMDtcbiAgICAgICAgICAgICAgbG93U3Vycm9nYXRlID0gKGNvZGVQb2ludCAlIDB4NDAwKSArIDB4REMwMDtcbiAgICAgICAgICAgICAgY29kZVVuaXRzLnB1c2goaGlnaFN1cnJvZ2F0ZSwgbG93U3Vycm9nYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluZGV4ICsgMSA9PT0gbGVuZ3RoIHx8IGNvZGVVbml0cy5sZW5ndGggPiBNQVhfU0laRSkge1xuICAgICAgICAgICAgICByZXN1bHQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNvZGVVbml0cyk7XG4gICAgICAgICAgICAgIGNvZGVVbml0cy5sZW5ndGggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1vZHVsZS5leHBvcnRzID0gZnJvbUNvZGVQb2ludDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2Zyb20tY29kZS1wb2ludC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohIGh0dHA6Ly9tdGhzLmJlL3JlcGVhdCB2MC4yLjAgYnkgQG1hdGhpYXMgKi9cbmlmICghU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQpIHtcblx0KGZ1bmN0aW9uKCkge1xuXHRcdCd1c2Ugc3RyaWN0JzsgLy8gbmVlZGVkIHRvIHN1cHBvcnQgYGFwcGx5YC9gY2FsbGAgd2l0aCBgdW5kZWZpbmVkYC9gbnVsbGBcblx0XHR2YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBJRSA4IG9ubHkgc3VwcG9ydHMgYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgb24gRE9NIGVsZW1lbnRzXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgb2JqZWN0ID0ge307XG5cdFx0XHRcdHZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cdFx0XHRcdHZhciByZXN1bHQgPSAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBvYmplY3QsIG9iamVjdCkgJiYgJGRlZmluZVByb3BlcnR5O1xuXHRcdFx0fSBjYXRjaChlcnJvcikge31cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSgpKTtcblx0XHR2YXIgcmVwZWF0ID0gZnVuY3Rpb24oY291bnQpIHtcblx0XHRcdGlmICh0aGlzID09IG51bGwpIHtcblx0XHRcdFx0dGhyb3cgVHlwZUVycm9yKCk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuXHRcdFx0Ly8gYFRvSW50ZWdlcmBcblx0XHRcdHZhciBuID0gY291bnQgPyBOdW1iZXIoY291bnQpIDogMDtcblx0XHRcdGlmIChuICE9IG4pIHsgLy8gYmV0dGVyIGBpc05hTmBcblx0XHRcdFx0biA9IDA7XG5cdFx0XHR9XG5cdFx0XHQvLyBBY2NvdW50IGZvciBvdXQtb2YtYm91bmRzIGluZGljZXNcblx0XHRcdGlmIChuIDwgMCB8fCBuID09IEluZmluaXR5KSB7XG5cdFx0XHRcdHRocm93IFJhbmdlRXJyb3IoKTtcblx0XHRcdH1cblx0XHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRcdHdoaWxlIChuKSB7XG5cdFx0XHRcdGlmIChuICUgMiA9PSAxKSB7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IHN0cmluZztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobiA+IDEpIHtcblx0XHRcdFx0XHRzdHJpbmcgKz0gc3RyaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG4gPj49IDE7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cdFx0aWYgKGRlZmluZVByb3BlcnR5KSB7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCAncmVwZWF0Jywge1xuXHRcdFx0XHQndmFsdWUnOiByZXBlYXQsXG5cdFx0XHRcdCdjb25maWd1cmFibGUnOiB0cnVlLFxuXHRcdFx0XHQnd3JpdGFibGUnOiB0cnVlXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0U3RyaW5nLnByb3RvdHlwZS5yZXBlYXQgPSByZXBlYXQ7XG5cdFx0fVxuXHR9KCkpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3RyaW5nLnByb3RvdHlwZS5yZXBlYXQvcmVwZWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXJlcicpO1xuXG52YXIgcmVVbnNhZmVQcm90b2NvbCA9IC9eamF2YXNjcmlwdDp8dmJzY3JpcHQ6fGZpbGU6fGRhdGE6L2k7XG52YXIgcmVTYWZlRGF0YVByb3RvY29sID0gL15kYXRhOmltYWdlXFwvKD86cG5nfGdpZnxqcGVnfHdlYnApL2k7XG5cbnZhciBwb3RlbnRpYWxseVVuc2FmZSA9IGZ1bmN0aW9uKHVybCkge1xuICByZXR1cm4gcmVVbnNhZmVQcm90b2NvbC50ZXN0KHVybCkgJiZcbiAgICAgICFyZVNhZmVEYXRhUHJvdG9jb2wudGVzdCh1cmwpO1xufTtcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHByb2R1Y2UgYW4gSFRNTCB0YWcuXG5mdW5jdGlvbiB0YWcobmFtZSwgYXR0cnMsIHNlbGZjbG9zaW5nKSB7XG4gIGlmICh0aGlzLmRpc2FibGVUYWdzID4gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmJ1ZmZlciArPSAoJzwnICsgbmFtZSk7XG4gIGlmIChhdHRycyAmJiBhdHRycy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBhdHRyaWI7XG4gICAgd2hpbGUgKChhdHRyaWIgPSBhdHRyc1tpXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5idWZmZXIgKz0gKCcgJyArIGF0dHJpYlswXSArICc9XCInICsgYXR0cmliWzFdICsgJ1wiJyk7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIGlmIChzZWxmY2xvc2luZykge1xuICAgIHRoaXMuYnVmZmVyICs9ICcgLyc7XG4gIH1cbiAgdGhpcy5idWZmZXIgKz0gJz4nO1xuICB0aGlzLmxhc3RPdXQgPSAnPic7XG59XG5cbmZ1bmN0aW9uIEh0bWxSZW5kZXJlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAvLyBieSBkZWZhdWx0LCBzb2Z0IGJyZWFrcyBhcmUgcmVuZGVyZWQgYXMgbmV3bGluZXMgaW4gSFRNTFxuICBvcHRpb25zLnNvZnRicmVhayA9IG9wdGlvbnMuc29mdGJyZWFrIHx8ICdcXG4nO1xuICAvLyBzZXQgdG8gXCI8YnIgLz5cIiB0byBtYWtlIHRoZW0gaGFyZCBicmVha3NcbiAgLy8gc2V0IHRvIFwiIFwiIGlmIHlvdSB3YW50IHRvIGlnbm9yZSBsaW5lIHdyYXBwaW5nIGluIHNvdXJjZVxuXG4gIHRoaXMuZGlzYWJsZVRhZ3MgPSAwO1xuICB0aGlzLmxhc3RPdXQgPSBcIlxcblwiO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xufVxuXG4vKiBOb2RlIG1ldGhvZHMgKi9cblxuZnVuY3Rpb24gdGV4dChub2RlKSB7XG4gIHRoaXMub3V0KG5vZGUubGl0ZXJhbCk7XG59XG5cbmZ1bmN0aW9uIHNvZnRicmVhaygpIHtcbiAgdGhpcy5saXQodGhpcy5vcHRpb25zLnNvZnRicmVhayk7XG59XG5cbmZ1bmN0aW9uIGxpbmVicmVhaygpIHtcbiAgdGhpcy50YWcoJ2JyJywgW10sIHRydWUpO1xuICB0aGlzLmNyKCk7XG59XG5cbmZ1bmN0aW9uIGxpbmsobm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgaWYgKCEodGhpcy5vcHRpb25zLnNhZmUgJiYgcG90ZW50aWFsbHlVbnNhZmUobm9kZS5kZXN0aW5hdGlvbikpKSB7XG4gICAgICBhdHRycy5wdXNoKFsnaHJlZicsIHRoaXMuZXNjKG5vZGUuZGVzdGluYXRpb24sIHRydWUpXSk7XG4gICAgfVxuICAgIGlmIChub2RlLnRpdGxlKSB7XG4gICAgICBhdHRycy5wdXNoKFsndGl0bGUnLCB0aGlzLmVzYyhub2RlLnRpdGxlLCB0cnVlKV0pO1xuICAgIH1cbiAgICB0aGlzLnRhZygnYScsIGF0dHJzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRhZygnL2EnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbWFnZShub2RlLCBlbnRlcmluZykge1xuICBpZiAoZW50ZXJpbmcpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlVGFncyA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zYWZlICYmIHBvdGVudGlhbGx5VW5zYWZlKG5vZGUuZGVzdGluYXRpb24pKSB7XG4gICAgICAgIHRoaXMubGl0KCc8aW1nIHNyYz1cIlwiIGFsdD1cIicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5saXQoJzxpbWcgc3JjPVwiJyArIHRoaXMuZXNjKG5vZGUuZGVzdGluYXRpb24sIHRydWUpICtcbiAgICAgICAgICAgICdcIiBhbHQ9XCInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kaXNhYmxlVGFncyArPSAxO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGlzYWJsZVRhZ3MgLT0gMTtcbiAgICBpZiAodGhpcy5kaXNhYmxlVGFncyA9PT0gMCkge1xuICAgICAgaWYgKG5vZGUudGl0bGUpIHtcbiAgICAgICAgdGhpcy5saXQoJ1wiIHRpdGxlPVwiJyArIHRoaXMuZXNjKG5vZGUudGl0bGUsIHRydWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGl0KCdcIiAvPicpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlbXBoKG5vZGUsIGVudGVyaW5nKSB7XG4gIHRoaXMudGFnKGVudGVyaW5nID8gJ2VtJyA6ICcvZW0nKTtcbn1cblxuZnVuY3Rpb24gc3Ryb25nKG5vZGUsIGVudGVyaW5nKSB7XG4gIHRoaXMudGFnKGVudGVyaW5nID8gJ3N0cm9uZycgOiAnL3N0cm9uZycpO1xufVxuXG5mdW5jdGlvbiBwYXJhZ3JhcGgobm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIGdyYW5kcGFyZW50ID0gbm9kZS5wYXJlbnQucGFyZW50XG4gICAgLCBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChncmFuZHBhcmVudCAhPT0gbnVsbCAmJlxuICAgIGdyYW5kcGFyZW50LnR5cGUgPT09ICdsaXN0Jykge1xuICAgIGlmIChncmFuZHBhcmVudC5saXN0VGlnaHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKCdwJywgYXR0cnMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFnKCcvcCcpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoZWFkaW5nKG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciB0YWduYW1lID0gJ2gnICsgbm9kZS5sZXZlbFxuICAgICwgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICBpZiAoZW50ZXJpbmcpIHtcbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcodGFnbmFtZSwgYXR0cnMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFnKCcvJyArIHRhZ25hbWUpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb2RlKG5vZGUpIHtcbiAgdGhpcy50YWcoJ2NvZGUnKTtcbiAgdGhpcy5vdXQobm9kZS5saXRlcmFsKTtcbiAgdGhpcy50YWcoJy9jb2RlJyk7XG59XG5cbmZ1bmN0aW9uIGNvZGVfYmxvY2sobm9kZSkge1xuICB2YXIgaW5mb193b3JkcyA9IG5vZGUuaW5mbyA/IG5vZGUuaW5mby5zcGxpdCgvXFxzKy8pIDogW11cbiAgICAsIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGluZm9fd29yZHMubGVuZ3RoID4gMCAmJiBpbmZvX3dvcmRzWzBdLmxlbmd0aCA+IDApIHtcbiAgICBhdHRycy5wdXNoKFsnY2xhc3MnLCAnbGFuZ3VhZ2UtJyArIHRoaXMuZXNjKGluZm9fd29yZHNbMF0sIHRydWUpXSk7XG4gIH1cbiAgdGhpcy5jcigpO1xuICB0aGlzLnRhZygncHJlJyk7XG4gIHRoaXMudGFnKCdjb2RlJywgYXR0cnMpO1xuICB0aGlzLm91dChub2RlLmxpdGVyYWwpO1xuICB0aGlzLnRhZygnL2NvZGUnKTtcbiAgdGhpcy50YWcoJy9wcmUnKTtcbiAgdGhpcy5jcigpO1xufVxuXG5mdW5jdGlvbiB0aGVtYXRpY19icmVhayhub2RlKSB7XG4gIHZhciBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIHRoaXMuY3IoKTtcbiAgdGhpcy50YWcoJ2hyJywgYXR0cnMsIHRydWUpO1xuICB0aGlzLmNyKCk7XG59XG5cbmZ1bmN0aW9uIGJsb2NrX3F1b3RlKG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChlbnRlcmluZykge1xuICAgIHRoaXMuY3IoKTtcbiAgICB0aGlzLnRhZygnYmxvY2txdW90ZScsIGF0dHJzKTtcbiAgICB0aGlzLmNyKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKCcvYmxvY2txdW90ZScpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsaXN0KG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciB0YWduYW1lID0gbm9kZS5saXN0VHlwZSA9PT0gJ2J1bGxldCcgPyAndWwnIDogJ29sJ1xuICAgICwgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuXG4gIGlmIChlbnRlcmluZykge1xuICAgIHZhciBzdGFydCA9IG5vZGUubGlzdFN0YXJ0O1xuICAgIGlmIChzdGFydCAhPT0gbnVsbCAmJiBzdGFydCAhPT0gMSkge1xuICAgICAgYXR0cnMucHVzaChbJ3N0YXJ0Jywgc3RhcnQudG9TdHJpbmcoKV0pO1xuICAgIH1cbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcodGFnbmFtZSwgYXR0cnMpO1xuICAgIHRoaXMuY3IoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcoJy8nICsgdGFnbmFtZSk7XG4gICAgdGhpcy5jcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGl0ZW0obm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgdGhpcy50YWcoJ2xpJywgYXR0cnMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFnKCcvbGknKTtcbiAgICB0aGlzLmNyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaHRtbF9pbmxpbmUobm9kZSkge1xuICBpZiAodGhpcy5vcHRpb25zLnNhZmUpIHtcbiAgICB0aGlzLmxpdCgnPCEtLSByYXcgSFRNTCBvbWl0dGVkIC0tPicpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGl0KG5vZGUubGl0ZXJhbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaHRtbF9ibG9jayhub2RlKSB7XG4gIHRoaXMuY3IoKTtcbiAgaWYgKHRoaXMub3B0aW9ucy5zYWZlKSB7XG4gICAgdGhpcy5saXQoJzwhLS0gcmF3IEhUTUwgb21pdHRlZCAtLT4nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxpdChub2RlLmxpdGVyYWwpO1xuICB9XG4gIHRoaXMuY3IoKTtcbn1cblxuZnVuY3Rpb24gY3VzdG9tX2lubGluZShub2RlLCBlbnRlcmluZykge1xuICBpZiAoZW50ZXJpbmcgJiYgbm9kZS5vbkVudGVyKSB7XG4gICAgdGhpcy5saXQobm9kZS5vbkVudGVyKTtcbiAgfSBlbHNlIGlmICghZW50ZXJpbmcgJiYgbm9kZS5vbkV4aXQpIHtcbiAgICB0aGlzLmxpdChub2RlLm9uRXhpdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3VzdG9tX2Jsb2NrKG5vZGUsIGVudGVyaW5nKSB7XG4gIHRoaXMuY3IoKTtcbiAgaWYgKGVudGVyaW5nICYmIG5vZGUub25FbnRlcikge1xuICAgIHRoaXMubGl0KG5vZGUub25FbnRlcik7XG4gIH0gZWxzZSBpZiAoIWVudGVyaW5nICYmIG5vZGUub25FeGl0KSB7XG4gICAgdGhpcy5saXQobm9kZS5vbkV4aXQpO1xuICB9XG4gIHRoaXMuY3IoKTtcbn1cblxuLyogSGVscGVyIG1ldGhvZHMgKi9cblxuZnVuY3Rpb24gb3V0KHMpIHtcbiAgdGhpcy5saXQodGhpcy5lc2MocywgZmFsc2UpKTtcbn1cblxuZnVuY3Rpb24gYXR0cnMgKG5vZGUpIHtcbiAgdmFyIGF0dCA9IFtdO1xuICBpZiAodGhpcy5vcHRpb25zLnNvdXJjZXBvcykge1xuICAgIHZhciBwb3MgPSBub2RlLnNvdXJjZXBvcztcbiAgICBpZiAocG9zKSB7XG4gICAgICBhdHQucHVzaChbJ2RhdGEtc291cmNlcG9zJywgU3RyaW5nKHBvc1swXVswXSkgKyAnOicgK1xuICAgICAgICBTdHJpbmcocG9zWzBdWzFdKSArICctJyArIFN0cmluZyhwb3NbMV1bMF0pICsgJzonICtcbiAgICAgICAgU3RyaW5nKHBvc1sxXVsxXSldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGF0dDtcbn1cblxuLy8gcXVpY2sgYnJvd3Nlci1jb21wYXRpYmxlIGluaGVyaXRhbmNlXG5IdG1sUmVuZGVyZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZW5kZXJlci5wcm90b3R5cGUpO1xuXG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnRleHQgPSB0ZXh0O1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5odG1sX2lubGluZSA9IGh0bWxfaW5saW5lO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5odG1sX2Jsb2NrID0gaHRtbF9ibG9jaztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuc29mdGJyZWFrID0gc29mdGJyZWFrO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5saW5lYnJlYWsgPSBsaW5lYnJlYWs7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmxpbmsgPSBsaW5rO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGltYWdlO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5lbXBoID0gZW1waDtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID0gc3Ryb25nO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGggPSBwYXJhZ3JhcGg7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmhlYWRpbmcgPSBoZWFkaW5nO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5jb2RlID0gY29kZTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuY29kZV9ibG9jayA9IGNvZGVfYmxvY2s7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnRoZW1hdGljX2JyZWFrID0gdGhlbWF0aWNfYnJlYWs7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrX3F1b3RlID0gYmxvY2tfcXVvdGU7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmxpc3QgPSBsaXN0O1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5pdGVtID0gaXRlbTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuY3VzdG9tX2lubGluZSA9IGN1c3RvbV9pbmxpbmU7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmN1c3RvbV9ibG9jayA9IGN1c3RvbV9ibG9jaztcblxuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5lc2MgPSByZXF1aXJlKCcuLi9jb21tb24nKS5lc2NhcGVYbWw7XG5cbkh0bWxSZW5kZXJlci5wcm90b3R5cGUub3V0ID0gb3V0O1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS50YWcgPSB0YWc7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmF0dHJzID0gYXR0cnM7XG5cbm1vZHVsZS5leHBvcnRzID0gSHRtbFJlbmRlcmVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlcmVyJyk7XG5cbnZhciByZVhNTFRhZyA9IC9cXDxbXj5dKlxcPi87XG5cbmZ1bmN0aW9uIHRvVGFnTmFtZShzKSB7XG4gIHJldHVybiBzLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csIFwiJDFfJDJcIikudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gWG1sUmVuZGVyZXIob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB0aGlzLmRpc2FibGVUYWdzID0gMDtcbiAgdGhpcy5sYXN0T3V0ID0gXCJcXG5cIjtcblxuICB0aGlzLmluZGVudExldmVsID0gMDtcbiAgdGhpcy5pbmRlbnQgPSAnICAnO1xuXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihhc3QpIHtcblxuICB0aGlzLmJ1ZmZlciA9ICcnO1xuXG4gIHZhciBhdHRycztcbiAgdmFyIHRhZ25hbWU7XG4gIHZhciB3YWxrZXIgPSBhc3Qud2Fsa2VyKCk7XG4gIHZhciBldmVudCwgbm9kZSwgZW50ZXJpbmc7XG4gIHZhciBjb250YWluZXI7XG4gIHZhciBzZWxmQ2xvc2luZztcbiAgdmFyIG5vZGV0eXBlO1xuXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lKFwicmVuZGVyaW5nXCIpOyB9XG5cbiAgdGhpcy5idWZmZXIgKz0gJzw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/Plxcbic7XG4gIHRoaXMuYnVmZmVyICs9ICc8IURPQ1RZUEUgZG9jdW1lbnQgU1lTVEVNIFwiQ29tbW9uTWFyay5kdGRcIj5cXG4nO1xuXG4gIHdoaWxlICgoZXZlbnQgPSB3YWxrZXIubmV4dCgpKSkge1xuICAgIGVudGVyaW5nID0gZXZlbnQuZW50ZXJpbmc7XG4gICAgbm9kZSA9IGV2ZW50Lm5vZGU7XG4gICAgbm9kZXR5cGUgPSBub2RlLnR5cGU7XG5cbiAgICBjb250YWluZXIgPSBub2RlLmlzQ29udGFpbmVyO1xuXG4gICAgc2VsZkNsb3NpbmcgPSBub2RldHlwZSA9PT0gJ3RoZW1hdGljX2JyZWFrJ1xuICAgICAgfHwgbm9kZXR5cGUgPT09ICdsaW5lYnJlYWsnXG4gICAgICB8fCBub2RldHlwZSA9PT0gJ3NvZnRicmVhayc7XG5cbiAgICB0YWduYW1lID0gdG9UYWdOYW1lKG5vZGV0eXBlKTtcblxuICAgIGlmIChlbnRlcmluZykge1xuXG4gICAgICAgIGF0dHJzID0gW107XG5cbiAgICAgICAgc3dpdGNoIChub2RldHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWyd4bWxucycsICdodHRwOi8vY29tbW9ubWFyay5vcmcveG1sLzEuMCddKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICAgICAgaWYgKG5vZGUubGlzdFR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ3R5cGUnLCBub2RlLmxpc3RUeXBlLnRvTG93ZXJDYXNlKCldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmxpc3RTdGFydCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBhdHRycy5wdXNoKFsnc3RhcnQnLCBTdHJpbmcobm9kZS5saXN0U3RhcnQpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5saXN0VGlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ3RpZ2h0JywgKG5vZGUubGlzdFRpZ2h0ID8gJ3RydWUnIDogJ2ZhbHNlJyldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWxpbSA9IG5vZGUubGlzdERlbGltaXRlcjtcbiAgICAgICAgICAgIGlmIChkZWxpbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB2YXIgZGVsaW13b3JkID0gJyc7XG4gICAgICAgICAgICAgIGlmIChkZWxpbSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgZGVsaW13b3JkID0gJ3BlcmlvZCc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsaW13b3JkID0gJ3BhcmVuJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhdHRycy5wdXNoKFsnZGVsaW1pdGVyJywgZGVsaW13b3JkXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb2RlX2Jsb2NrJzpcbiAgICAgICAgICAgIGlmIChub2RlLmluZm8pIHtcbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ2luZm8nLCBub2RlLmluZm9dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRpbmcnOlxuICAgICAgICAgICAgYXR0cnMucHVzaChbJ2xldmVsJywgU3RyaW5nKG5vZGUubGV2ZWwpXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdsaW5rJzpcbiAgICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsnZGVzdGluYXRpb24nLCBub2RlLmRlc3RpbmF0aW9uXSk7XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsndGl0bGUnLCBub2RlLnRpdGxlXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjdXN0b21faW5saW5lJzpcbiAgICAgICAgICBjYXNlICdjdXN0b21fYmxvY2snOlxuICAgICAgICAgICAgYXR0cnMucHVzaChbJ29uX2VudGVyJywgbm9kZS5vbkVudGVyXSk7XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsnb25fZXhpdCcsIG5vZGUub25FeGl0XSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc291cmNlcG9zKSB7XG4gICAgICAgICAgdmFyIHBvcyA9IG5vZGUuc291cmNlcG9zO1xuICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWydzb3VyY2Vwb3MnLCBTdHJpbmcocG9zWzBdWzBdKSArICc6JyArXG4gICAgICAgICAgICAgIFN0cmluZyhwb3NbMF1bMV0pICsgJy0nICsgU3RyaW5nKHBvc1sxXVswXSkgKyAnOicgK1xuICAgICAgICAgICAgICBTdHJpbmcocG9zWzFdWzFdKV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3IoKTtcbiAgICAgICAgdGhpcy5vdXQodGhpcy50YWcodGFnbmFtZSwgYXR0cnMsIHNlbGZDbG9zaW5nKSk7XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICB0aGlzLmluZGVudExldmVsICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNvbnRhaW5lciAmJiAhc2VsZkNsb3NpbmcpIHtcbiAgICAgICAgICB2YXIgbGl0ID0gbm9kZS5saXRlcmFsO1xuICAgICAgICAgIGlmIChsaXQpIHtcbiAgICAgICAgICAgIHRoaXMub3V0KHRoaXMuZXNjKGxpdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm91dCh0aGlzLnRhZygnLycgKyB0YWduYW1lKSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRlbnRMZXZlbCAtPSAxO1xuICAgICAgdGhpcy5jcigpO1xuICAgICAgdGhpcy5vdXQodGhpcy50YWcoJy8nICsgdGFnbmFtZSkpO1xuICAgIH1cbiAgfVxuICBpZiAob3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZUVuZChcInJlbmRlcmluZ1wiKTsgfVxuICB0aGlzLmJ1ZmZlciArPSAnXFxuJztcbiAgcmV0dXJuIHRoaXMuYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBvdXQocykge1xuICBpZih0aGlzLmRpc2FibGVUYWdzID4gMCkge1xuICAgIHRoaXMuYnVmZmVyICs9IHMucmVwbGFjZShyZVhNTFRhZywgJycpO1xuICB9ZWxzZXtcbiAgICB0aGlzLmJ1ZmZlciArPSBzO1xuICB9XG4gIHRoaXMubGFzdE91dCA9IHM7XG59XG5cbmZ1bmN0aW9uIGNyKCkge1xuICBpZih0aGlzLmxhc3RPdXQgIT09ICdcXG4nKSB7XG4gICAgdGhpcy5idWZmZXIgKz0gJ1xcbic7XG4gICAgdGhpcy5sYXN0T3V0ID0gJ1xcbic7XG4gICAgZm9yKHZhciBpID0gdGhpcy5pbmRlbnRMZXZlbDsgaSA+IDA7IGktLSkge1xuICAgICAgdGhpcy5idWZmZXIgKz0gdGhpcy5pbmRlbnQ7XG4gICAgfVxuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBwcm9kdWNlIGFuIFhNTCB0YWcuXG5mdW5jdGlvbiB0YWcobmFtZSwgYXR0cnMsIHNlbGZjbG9zaW5nKSB7XG4gIHZhciByZXN1bHQgPSAnPCcgKyBuYW1lO1xuICBpZihhdHRycyAmJiBhdHRycy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBhdHRyaWI7XG4gICAgd2hpbGUgKChhdHRyaWIgPSBhdHRyc1tpXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9ICcgJyArIGF0dHJpYlswXSArICc9XCInICsgdGhpcy5lc2MoYXR0cmliWzFdKSArICdcIic7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIGlmKHNlbGZjbG9zaW5nKSB7XG4gICAgcmVzdWx0ICs9ICcgLyc7XG4gIH1cbiAgcmVzdWx0ICs9ICc+JztcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gcXVpY2sgYnJvd3Nlci1jb21wYXRpYmxlIGluaGVyaXRhbmNlXG5YbWxSZW5kZXJlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlbmRlcmVyLnByb3RvdHlwZSk7XG5cblhtbFJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSByZW5kZXI7XG5YbWxSZW5kZXJlci5wcm90b3R5cGUub3V0ID0gb3V0O1xuWG1sUmVuZGVyZXIucHJvdG90eXBlLmNyID0gY3I7XG5YbWxSZW5kZXJlci5wcm90b3R5cGUudGFnID0gdGFnO1xuWG1sUmVuZGVyZXIucHJvdG90eXBlLmVzYyA9IHJlcXVpcmUoJy4uL2NvbW1vbicpLmVzY2FwZVhtbDtcblxubW9kdWxlLmV4cG9ydHMgPSBYbWxSZW5kZXJlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci94bWwuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCkge1xuICAvLyBjb252ZXJ0IGJsYW1lcyB0byBoZWFkaW5nc1xuICBjb25zdCBibGFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdibGFtZScpO1xuICBmb3IgKGxldCBibGFtZSBvZiBibGFtZXMpIHtcbiAgICAvLyBUT0RPIGxvb2sgdXAgY29ycmVjdCBoZWFkaW5nIGxldmVsXG4gICAgY29uc3QgcmVuYW1lZE5vZGUgPSByZW5hbWVUYWcoZG9jdW1lbnQsIGJsYW1lLCAnaDInLCB0cnVlKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JsYW1lcy5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyByZW5hbWVUYWcgfSA9IHJlcXVpcmUoJy4vaGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIC8vIGNvbnZlcnQgcmVmIHRvIGxpbmtzXG4gIGNvbnN0IHJlZnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdyZWYnKTtcbiAgZm9yIChsZXQgcmVmIG9mIHJlZnMpIHtcbiAgICBjb25zdCByZW5hbWVkTm9kZSA9IHJlbmFtZVRhZyhkb2N1bWVudCwgcmVmLCAnYScpO1xuICAgIGNvbnN0IHRhcmdldElkID0gcmVuYW1lZE5vZGUuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKTtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XG4gICAgcmVuYW1lZE5vZGUuY2xhc3NMaXN0LmFkZCgncmVmJyk7XG4gICAgcmVuYW1lZE5vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgdGFyZ2V0SWQpO1xuICAgIHJlbmFtZWROb2RlLnJlbW92ZUF0dHJpYnV0ZSgndGFyZ2V0Jyk7XG4gICAgdGFyZ2V0SGVhZGluZyA9IHJlbmFtZWROb2RlLmlubmVySFRNTCA9IHRhcmdldFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICAvLyBzdHJpcCBibGFtZVxuICAgIGlmICh0YXJnZXRIZWFkaW5nLnF1ZXJ5U2VsZWN0b3IoJy5ibGFtZScpKVxuICAgICAgdGFyZ2V0SGVhZGluZy5yZW1vdmVDaGlsZCh0YXJnZXRIZWFkaW5nLnF1ZXJ5U2VsZWN0b3IoJy5ibGFtZScpKTtcbiAgICByZW5hbWVkTm9kZS5pbm5lckhUTUwgPSB0YXJnZXRIZWFkaW5nLmlubmVySFRNTDtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlZnMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgLy8gcG9wdWxhdGUgYmlibGlvZ3JhcGhpYyBjaXRhdGlvbnNcbiAgY29uc3QgYmliaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdiaWJsaW9ncmFwaHkgYScpO1xuICBjb25zb2xlLmxvZyhiaWJpdGVtcylcbiAgZm9yIChsZXQgW2luZGV4LCBiaWJpdGVtXSBvZiBiaWJpdGVtcy5lbnRyaWVzKCkpIHtcbiAgICBjb25zdCBjb3VudGVyID0gJ1snICsgKGluZGV4ICsgMSkgKyAnXSc7XG4gICAgLy8gVE9ETyBjcmVhdGUgREwgaW4gYnVpbGRCaWIgaW5zdGVhZFxuICAgIGNvbnN0IGNvdW50ZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY291bnRlciArICcgJyk7XG4gICAgYmliaXRlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb3VudGVyTm9kZSwgYmliaXRlbSk7XG4gICAgY29uc3QgY2l0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgJ2NpdGVbdGFyZ2V0PVwiJyArIGJpYml0ZW0uaWQgKyAnXCJdJ1xuICAgICk7XG4gICAgZm9yIChsZXQgY2l0ZSBvZiBjaXRlcykge1xuICAgICAgY2l0ZS5pbm5lckhUTUwgPSBjb3VudGVyO1xuICAgICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyArIGJpYml0ZW0uaWQpO1xuICAgICAgY2l0ZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChhbmNob3IsIGNpdGUpO1xuICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGNpdGUpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2l0ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=