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


var encode = __webpack_require__(18);
var decode = __webpack_require__(19);

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

var encode = __webpack_require__(20),
    decode = __webpack_require__(21);

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
const {tex2jax} = __webpack_require__(15);
const commonmark = __webpack_require__(16);

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
const figures = __webpack_require__(14)
const laml = function(document) {
  metadata(document);
  preamble(document);
  abstract(document);
  statements(document);
  figures(document, false);

  // convert names to headings
  const names = document.querySelectorAll('name');
  for (let name of names) {
    // TODO look up correct heading level
    const renamedNode = renameTag(document, name, 'h2');
    renamedNode.classList.add('name');
  }

  // convert blames
  // TODO should depend on cm.css?
  const blames = document.querySelectorAll('blame');
  for (let blame of blames) {
    renameTag(document, blame, 'span').classList.add('blame');
  }

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
/* 16 */
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
module.exports.Parser = __webpack_require__(17);
module.exports.HtmlRenderer = __webpack_require__(29);
module.exports.XmlRenderer = __webpack_require__(30);


/***/ }),
/* 17 */
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

var InlineParser = __webpack_require__(25);

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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var entityMap = __webpack_require__(5),
    legacyMap = __webpack_require__(22),
    xmlMap    = __webpack_require__(4),
    decodeCodePoint = __webpack_require__(23);

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
/* 22 */
/***/ (function(module, exports) {

module.exports = {"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","QUOT":"\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var decodeMap = __webpack_require__(24);

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
/* 24 */
/***/ (function(module, exports) {

module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(2);
var common = __webpack_require__(0);
var normalizeReference = __webpack_require__(26);

var normalizeURI = common.normalizeURI;
var unescapeString = common.unescapeString;
var fromCodePoint = __webpack_require__(27);
var decodeHTML = __webpack_require__(3).decodeHTML;
__webpack_require__(28); // Polyfill for String.prototype.repeat

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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2RlNjA5NTBiZjY2ZDFmMTUyNWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMveG1sLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZW50aXRpZXMuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL3JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZWFtYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlndXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4MmpheC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2Jsb2Nrcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWR1cmwvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tZHVybC9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvbGVnYWN5Lmpzb24iLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9kZWNvZGVfY29kZXBvaW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2RlY29kZS5qc29uIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9pbmxpbmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ub3JtYWxpemUtcmVmZXJlbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9mcm9tLWNvZGUtcG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUucmVwZWF0L3JlcGVhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci94bWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDZCQUE2QixJQUFJLFFBQVEsSUFBSSxlQUFlLEtBQUssRUFBRTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQ0FBbUMsaUJBQWlCLEVBQUU7O0FBRXREOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQiwwQkFBMEI7QUFDaEQsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQix5QkFBeUI7QUFDOUMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQix3QkFBd0I7QUFDN0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQix3QkFBd0I7QUFDN0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixzQkFBc0IsRUFBRTtBQUM3QyxzQkFBc0IsbUJBQW1CO0FBQ3pDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsMEJBQTBCLEVBQUU7QUFDakQsc0JBQXNCLHVCQUF1QjtBQUM3QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLG9CQUFvQixFQUFFO0FBQzNDLHNCQUFzQixpQkFBaUI7QUFDdkMsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixtQkFBbUIsRUFBRTtBQUMxQyxzQkFBc0IsZ0JBQWdCO0FBQ3RDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsb0JBQW9CLEVBQUU7QUFDM0Msc0JBQXNCLGlCQUFpQjtBQUN2QyxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLDRCQUE0QixFQUFFO0FBQ25ELHNCQUFzQix5QkFBeUI7QUFDL0MsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQiw2QkFBNkIsRUFBRTtBQUNwRCxzQkFBc0IsMEJBQTBCO0FBQ2hELENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsNkJBQTZCLEVBQUU7QUFDcEQsc0JBQXNCLDBCQUEwQjtBQUNoRCxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLGlDQUFpQyxFQUFFO0FBQ3hELDBCQUEwQixrQ0FBa0M7QUFDNUQsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixzQkFBc0IsRUFBRTtBQUM3QyxzQkFBc0IsbUJBQW1CO0FBQ3pDLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIscUJBQXFCLEVBQUU7QUFDNUMsc0JBQXNCLGtCQUFrQjtBQUN4QyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDOVFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ2hDQSxrQkFBa0IsbUQ7Ozs7OztBQ0FsQixrQkFBa0Iscy9WQUFzL1YsZ0lBQWdJLHVxU0FBdXFTLGdJQUFnSSxvNERBQW80RCxxcE07Ozs7Ozs7QUNBbnpzQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMxRUE7QUFDQSxPQUFPLFFBQVE7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDbkNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7QUN2THRDLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzFDQSxPQUFPLFlBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQSxPQUFPLFlBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQSxPQUFPLFlBQVk7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnRUFBZ0UsSUFBSSxRQUFRLElBQUk7QUFDaEY7O0FBRUEsc0RBQXNELElBQUk7O0FBRTFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxPQUFPO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE9BQU87QUFDckQ7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLElBQUksTUFBTTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLEdBQUcsS0FBSztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0EsMERBQTBEO0FBQzFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGdEQUFnRCxXQUFXO0FBQ2hFO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx5QkFBeUI7QUFDOUI7QUFDQSxLQUFLLHlCQUF5QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDblZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUc7O0FBRTNFOztBQUVBOztBQUVBOztBQUVBLGdDQUFnQyxJQUFJOztBQUVwQyw2QkFBNkIsSUFBSTs7QUFFakMsc0JBQXNCLEdBQUcsV0FBVyxHQUFHOztBQUV2QyxnQ0FBZ0MsR0FBRyxHQUFHLEdBQUc7O0FBRXpDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakMsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFVBQVUsRUFBRTtBQUMxQyw4QkFBOEIsUUFBUSxFQUFFO0FBQ3hDLGlDQUFpQyx1QkFBdUIsRUFBRTtBQUMxRDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhCQUE4QixVQUFVLEVBQUU7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGlDQUFpQyx1QkFBdUIsRUFBRTtBQUMxRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLFFBQVEsRUFBRTtBQUN4QyxpQ0FBaUMsdUJBQXVCLEVBQUU7QUFDMUQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsaUNBQWlDLHVCQUF1QixFQUFFO0FBQzFEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDhCQUE4QixRQUFRLEVBQUU7QUFDeEMsZ0NBQWdDLGNBQWMsRUFBRTtBQUNoRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEIsUUFBUSxFQUFFO0FBQ3hDLGdDQUFnQyxjQUFjLEVBQUU7QUFDaEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLFNBQVM7QUFDVCxnQ0FBZ0MsY0FBYyxFQUFFO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHlDQUF5QztBQUN6QyxTQUFTO0FBQ1QsZ0NBQWdDLGNBQWMsRUFBRTtBQUNoRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsZ0NBQWdDLGNBQWMsRUFBRTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUssT0FBTzs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUNBQWlDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQ0FBb0M7QUFDaEUsNEJBQTRCLCtCQUErQjtBQUMzRCxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGtDQUFrQztBQUM5RCw0QkFBNEIsZ0NBQWdDO0FBQzVEO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDdjJCQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGNBQWM7O0FBRTVCOztBQUVBLGFBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0NBQWdDLE9BQU87QUFDdkM7O0FBRUE7QUFDQSxxQkFBcUIsRUFBRTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCOzs7QUFHQTs7Ozs7Ozs7O0FDaEdBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxjQUFjOztBQUU1Qjs7QUFFQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0NBQW9DLEVBQUU7QUFDdEM7QUFDQTs7QUFFQSwrQkFBK0IsT0FBTztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7OztBQUdBLDBCQUEwQjtBQUMxQjs7O0FBR0E7Ozs7Ozs7QUN6SEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQSxFQUFFLElBQUk7QUFDTjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0RBQStEO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHdDQUF3Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLEdBQUc7QUFDSCxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQSxtRUFBbUUsUUFBUTtBQUMzRTs7QUFFQTtBQUNBLDBCQUEwQixZQUFZO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDdkVBLGtCQUFrQix3dUM7Ozs7OztBQ0FsQjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6QkEsa0JBQWtCLHlTOzs7Ozs7O0FDQWxCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFtQzs7QUFFbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtREFBbUQsYUFBYSxFQUFFOztBQUVsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxxREFBcUQsRUFBRSxnQ0FBZ0MsS0FBSyw2Q0FBNkMsS0FBSzs7QUFFOUksMkNBQTJDLEtBQUs7O0FBRWhEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsVUFBVSxPQUFPOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLLE9BQU87O0FBRVosNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0EseUJBQXlCLG1DQUFtQztBQUM1RDtBQUNBLHlCQUF5QixtQ0FBbUMsOENBQThDO0FBQzFHO0FBQ0E7QUFDQSx5QkFBeUIsT0FBTyxxQ0FBcUM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNwN0JBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDekNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsV0FBVyxPQUFPLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7OztBQ2pEQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNqU0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDJCQUEyQjs7QUFFaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsOEJBQThCO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsT0FBTztBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJsYW1sLWJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZGU2MDk1MGJmNjZkMWYxNTI1YyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5jb2RlID0gcmVxdWlyZSgnbWR1cmwvZW5jb2RlJyk7XG52YXIgZGVjb2RlID0gcmVxdWlyZSgnbWR1cmwvZGVjb2RlJyk7XG5cbnZhciBDX0JBQ0tTTEFTSCA9IDkyO1xuXG52YXIgZGVjb2RlSFRNTCA9IHJlcXVpcmUoJ2VudGl0aWVzJykuZGVjb2RlSFRNTDtcblxudmFyIEVOVElUWSA9IFwiJig/OiN4W2EtZjAtOV17MSw4fXwjWzAtOV17MSw4fXxbYS16XVthLXowLTldezEsMzF9KTtcIjtcblxudmFyIFRBR05BTUUgPSAnW0EtWmEtel1bQS1aYS16MC05LV0qJztcbnZhciBBVFRSSUJVVEVOQU1FID0gJ1thLXpBLVpfOl1bYS16QS1aMC05Oi5fLV0qJztcbnZhciBVTlFVT1RFRFZBTFVFID0gXCJbXlxcXCInPTw+YFxcXFx4MDAtXFxcXHgyMF0rXCI7XG52YXIgU0lOR0xFUVVPVEVEVkFMVUUgPSBcIidbXiddKidcIjtcbnZhciBET1VCTEVRVU9URURWQUxVRSA9ICdcIlteXCJdKlwiJztcbnZhciBBVFRSSUJVVEVWQUxVRSA9IFwiKD86XCIgKyBVTlFVT1RFRFZBTFVFICsgXCJ8XCIgKyBTSU5HTEVRVU9URURWQUxVRSArIFwifFwiICsgRE9VQkxFUVVPVEVEVkFMVUUgKyBcIilcIjtcbnZhciBBVFRSSUJVVEVWQUxVRVNQRUMgPSBcIig/OlwiICsgXCJcXFxccyo9XCIgKyBcIlxcXFxzKlwiICsgQVRUUklCVVRFVkFMVUUgKyBcIilcIjtcbnZhciBBVFRSSUJVVEUgPSBcIig/OlwiICsgXCJcXFxccytcIiArIEFUVFJJQlVURU5BTUUgKyBBVFRSSUJVVEVWQUxVRVNQRUMgKyBcIj8pXCI7XG52YXIgT1BFTlRBRyA9IFwiPFwiICsgVEFHTkFNRSArIEFUVFJJQlVURSArIFwiKlwiICsgXCJcXFxccyovPz5cIjtcbnZhciBDTE9TRVRBRyA9IFwiPC9cIiArIFRBR05BTUUgKyBcIlxcXFxzKls+XVwiO1xudmFyIEhUTUxDT01NRU5UID0gXCI8IS0tLS0+fDwhLS0oPzotP1tePi1dKSg/Oi0/W14tXSkqLS0+XCI7XG52YXIgUFJPQ0VTU0lOR0lOU1RSVUNUSU9OID0gXCJbPF1bP10uKj9bP11bPl1cIjtcbnZhciBERUNMQVJBVElPTiA9IFwiPCFbQS1aXStcIiArIFwiXFxcXHMrW14+XSo+XCI7XG52YXIgQ0RBVEEgPSBcIjwhXFxcXFtDREFUQVxcXFxbW1xcXFxzXFxcXFNdKj9cXFxcXVxcXFxdPlwiO1xudmFyIEhUTUxUQUcgPSBcIig/OlwiICsgT1BFTlRBRyArIFwifFwiICsgQ0xPU0VUQUcgKyBcInxcIiArIEhUTUxDT01NRU5UICsgXCJ8XCIgK1xuICAgICAgICBQUk9DRVNTSU5HSU5TVFJVQ1RJT04gKyBcInxcIiArIERFQ0xBUkFUSU9OICsgXCJ8XCIgKyBDREFUQSArIFwiKVwiO1xudmFyIHJlSHRtbFRhZyA9IG5ldyBSZWdFeHAoJ14nICsgSFRNTFRBRywgJ2knKTtcblxudmFyIHJlQmFja3NsYXNoT3JBbXAgPSAvW1xcXFwmXS87XG5cbnZhciBFU0NBUEFCTEUgPSAnWyFcIiMkJSZcXCcoKSorLC4vOjs8PT4/QFtcXFxcXFxcXFxcXFxdXl9ge3x9fi1dJztcblxudmFyIHJlRW50aXR5T3JFc2NhcGVkQ2hhciA9IG5ldyBSZWdFeHAoJ1xcXFxcXFxcJyArIEVTQ0FQQUJMRSArICd8JyArIEVOVElUWSwgJ2dpJyk7XG5cbnZhciBYTUxTUEVDSUFMID0gJ1smPD5cIl0nO1xuXG52YXIgcmVYbWxTcGVjaWFsID0gbmV3IFJlZ0V4cChYTUxTUEVDSUFMLCAnZycpO1xuXG52YXIgcmVYbWxTcGVjaWFsT3JFbnRpdHkgPSBuZXcgUmVnRXhwKEVOVElUWSArICd8JyArIFhNTFNQRUNJQUwsICdnaScpO1xuXG52YXIgdW5lc2NhcGVDaGFyID0gZnVuY3Rpb24ocykge1xuICAgIGlmIChzLmNoYXJDb2RlQXQoMCkgPT09IENfQkFDS1NMQVNIKSB7XG4gICAgICAgIHJldHVybiBzLmNoYXJBdCgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVjb2RlSFRNTChzKTtcbiAgICB9XG59O1xuXG4vLyBSZXBsYWNlIGVudGl0aWVzIGFuZCBiYWNrc2xhc2ggZXNjYXBlcyB3aXRoIGxpdGVyYWwgY2hhcmFjdGVycy5cbnZhciB1bmVzY2FwZVN0cmluZyA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocmVCYWNrc2xhc2hPckFtcC50ZXN0KHMpKSB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UocmVFbnRpdHlPckVzY2FwZWRDaGFyLCB1bmVzY2FwZUNoYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbn07XG5cbnZhciBub3JtYWxpemVVUkkgPSBmdW5jdGlvbih1cmkpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZW5jb2RlKGRlY29kZSh1cmkpKTtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiB1cmk7XG4gICAgfVxufTtcblxudmFyIHJlcGxhY2VVbnNhZmVDaGFyID0gZnVuY3Rpb24ocykge1xuICAgIHN3aXRjaCAocykge1xuICAgIGNhc2UgJyYnOlxuICAgICAgICByZXR1cm4gJyZhbXA7JztcbiAgICBjYXNlICc8JzpcbiAgICAgICAgcmV0dXJuICcmbHQ7JztcbiAgICBjYXNlICc+JzpcbiAgICAgICAgcmV0dXJuICcmZ3Q7JztcbiAgICBjYXNlICdcIic6XG4gICAgICAgIHJldHVybiAnJnF1b3Q7JztcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG59O1xuXG52YXIgZXNjYXBlWG1sID0gZnVuY3Rpb24ocywgcHJlc2VydmVfZW50aXRpZXMpIHtcbiAgICBpZiAocmVYbWxTcGVjaWFsLnRlc3QocykpIHtcbiAgICAgICAgaWYgKHByZXNlcnZlX2VudGl0aWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHJlWG1sU3BlY2lhbE9yRW50aXR5LCByZXBsYWNlVW5zYWZlQ2hhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHJlWG1sU3BlY2lhbCwgcmVwbGFjZVVuc2FmZUNoYXIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHVuZXNjYXBlU3RyaW5nOiB1bmVzY2FwZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICBub3JtYWxpemVVUkk6IG5vcm1hbGl6ZVVSSSxcbiAgICAgICAgICAgICAgICAgICBlc2NhcGVYbWw6IGVzY2FwZVhtbCxcbiAgICAgICAgICAgICAgICAgICByZUh0bWxUYWc6IHJlSHRtbFRhZyxcbiAgICAgICAgICAgICAgICAgICBPUEVOVEFHOiBPUEVOVEFHLFxuICAgICAgICAgICAgICAgICAgIENMT1NFVEFHOiBDTE9TRVRBRyxcbiAgICAgICAgICAgICAgICAgICBFTlRJVFk6IEVOVElUWSxcbiAgICAgICAgICAgICAgICAgICBFU0NBUEFCTEU6IEVTQ0FQQUJMRVxuICAgICAgICAgICAgICAgICB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvY29tbW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiAgLy8gU291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjc0MDQ2MDIvMTMzOTY1MVxubW9kdWxlLmV4cG9ydHMucmVuYW1lVGFnID0gZnVuY3Rpb24oZG9jdW1lbnQsIG5vZGVPclNlbGVjdG9yLCBuZXdUYWdOYW1lLCBjbGFzc09yVHJ1ZSkge1xuICAgIGxldCBub2RlID0gbm9kZU9yU2VsZWN0b3I7XG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobm9kZU9yU2VsZWN0b3IpO1xuICAgIGlmICghbm9kZSkgcmV0dXJuIG5ldyBFcnJvcignTm8gbm9kZSBmb3VuZCcpO1xuICAgIGxldCBjbGFzc05hbWUgPSAnJztcbiAgICBpZiAoY2xhc3NPclRydWUgJiYgY2xhc3NPclRydWUgPT09IHRydWUpIGNsYXNzTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0eXBlb2YgY2xhc3NPclRydWUgPT09ICdzdHJpbmcnKSBjbGFzc05hbWUgPSBjbGFzc09yVHJ1ZTtcblxuICAgIGNvbnN0IG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld1RhZ05hbWUpO1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIG5ld05vZGUuYXBwZW5kQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgICBmb3IgKGxldCBhdHRyaWJ1dGUgb2Ygbm9kZS5hdHRyaWJ1dGVzKSB7XG4gICAgICBuZXdOb2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG4gICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWxUYWdOYW1lJywgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChjbGFzc05hbWUgIT09ICcnKSBuZXdOb2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIG5vZGUpO1xuICAgIHJldHVybiBuZXdOb2RlO1xuICB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gaXNDb250YWluZXIobm9kZSkge1xuICAgIHN3aXRjaCAobm9kZS5fdHlwZSkge1xuICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICBjYXNlICdibG9ja19xdW90ZSc6XG4gICAgY2FzZSAnbGlzdCc6XG4gICAgY2FzZSAnaXRlbSc6XG4gICAgY2FzZSAncGFyYWdyYXBoJzpcbiAgICBjYXNlICdoZWFkaW5nJzpcbiAgICBjYXNlICdlbXBoJzpcbiAgICBjYXNlICdzdHJvbmcnOlxuICAgIGNhc2UgJ2xpbmsnOlxuICAgIGNhc2UgJ2ltYWdlJzpcbiAgICBjYXNlICdjdXN0b21faW5saW5lJzpcbiAgICBjYXNlICdjdXN0b21fYmxvY2snOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG52YXIgcmVzdW1lQXQgPSBmdW5jdGlvbihub2RlLCBlbnRlcmluZykge1xuICAgIHRoaXMuY3VycmVudCA9IG5vZGU7XG4gICAgdGhpcy5lbnRlcmluZyA9IChlbnRlcmluZyA9PT0gdHJ1ZSk7XG59O1xuXG52YXIgbmV4dCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGN1ciA9IHRoaXMuY3VycmVudDtcbiAgICB2YXIgZW50ZXJpbmcgPSB0aGlzLmVudGVyaW5nO1xuXG4gICAgaWYgKGN1ciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgY29udGFpbmVyID0gaXNDb250YWluZXIoY3VyKTtcblxuICAgIGlmIChlbnRlcmluZyAmJiBjb250YWluZXIpIHtcbiAgICAgICAgaWYgKGN1ci5fZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VyLl9maXJzdENoaWxkO1xuICAgICAgICAgICAgdGhpcy5lbnRlcmluZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzdGF5IG9uIG5vZGUgYnV0IGV4aXRcbiAgICAgICAgICAgIHRoaXMuZW50ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChjdXIgPT09IHRoaXMucm9vdCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuXG4gICAgfSBlbHNlIGlmIChjdXIuX25leHQgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VyLl9wYXJlbnQ7XG4gICAgICAgIHRoaXMuZW50ZXJpbmcgPSBmYWxzZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGN1ci5fbmV4dDtcbiAgICAgICAgdGhpcy5lbnRlcmluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtlbnRlcmluZzogZW50ZXJpbmcsIG5vZGU6IGN1cn07XG59O1xuXG52YXIgTm9kZVdhbGtlciA9IGZ1bmN0aW9uKHJvb3QpIHtcbiAgICByZXR1cm4geyBjdXJyZW50OiByb290LFxuICAgICAgICAgICAgIHJvb3Q6IHJvb3QsXG4gICAgICAgICAgICAgZW50ZXJpbmc6IHRydWUsXG4gICAgICAgICAgICAgbmV4dDogbmV4dCxcbiAgICAgICAgICAgICByZXN1bWVBdDogcmVzdW1lQXQgfTtcbn07XG5cbnZhciBOb2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIHNvdXJjZXBvcykge1xuICAgIHRoaXMuX3R5cGUgPSBub2RlVHlwZTtcbiAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuX2ZpcnN0Q2hpbGQgPSBudWxsO1xuICAgIHRoaXMuX2xhc3RDaGlsZCA9IG51bGw7XG4gICAgdGhpcy5fcHJldiA9IG51bGw7XG4gICAgdGhpcy5fbmV4dCA9IG51bGw7XG4gICAgdGhpcy5fc291cmNlcG9zID0gc291cmNlcG9zO1xuICAgIHRoaXMuX2xhc3RMaW5lQmxhbmsgPSBmYWxzZTtcbiAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9zdHJpbmdfY29udGVudCA9IG51bGw7XG4gICAgdGhpcy5fbGl0ZXJhbCA9IG51bGw7XG4gICAgdGhpcy5fbGlzdERhdGEgPSB7fTtcbiAgICB0aGlzLl9pbmZvID0gbnVsbDtcbiAgICB0aGlzLl9kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fdGl0bGUgPSBudWxsO1xuICAgIHRoaXMuX2lzRmVuY2VkID0gZmFsc2U7XG4gICAgdGhpcy5fZmVuY2VDaGFyID0gbnVsbDtcbiAgICB0aGlzLl9mZW5jZUxlbmd0aCA9IDA7XG4gICAgdGhpcy5fZmVuY2VPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMuX2xldmVsID0gbnVsbDtcbiAgICB0aGlzLl9vbkVudGVyID0gbnVsbDtcbiAgICB0aGlzLl9vbkV4aXQgPSBudWxsO1xufTtcblxudmFyIHByb3RvID0gTm9kZS5wcm90b3R5cGU7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2lzQ29udGFpbmVyJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNDb250YWluZXIodGhpcyk7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICd0eXBlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnZmlyc3RDaGlsZCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fZmlyc3RDaGlsZDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xhc3RDaGlsZCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGFzdENoaWxkOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbmV4dCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbmV4dDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3ByZXYnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3ByZXY7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXJlbnQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3BhcmVudDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3NvdXJjZXBvcycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fc291cmNlcG9zOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbGl0ZXJhbCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGl0ZXJhbDsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fbGl0ZXJhbCA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdkZXN0aW5hdGlvbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fZGVzdGluYXRpb247IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX2Rlc3RpbmF0aW9uID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3RpdGxlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fdGl0bGUgPSBzOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnaW5mbycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5faW5mbzsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5faW5mbyA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsZXZlbCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGV2ZWw7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihzKSB7IHRoaXMuX2xldmVsID0gczsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3RUeXBlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9saXN0RGF0YS50eXBlOyB9LFxuICAgIHNldDogZnVuY3Rpb24odCkgeyB0aGlzLl9saXN0RGF0YS50eXBlID0gdDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3RUaWdodCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGlzdERhdGEudGlnaHQ7IH0sXG4gICAgc2V0OiBmdW5jdGlvbih0KSB7IHRoaXMuX2xpc3REYXRhLnRpZ2h0ID0gdDsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3RTdGFydCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbGlzdERhdGEuc3RhcnQ7IH0sXG4gICAgc2V0OiBmdW5jdGlvbihuKSB7IHRoaXMuX2xpc3REYXRhLnN0YXJ0ID0gbjsgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xpc3REZWxpbWl0ZXInLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2xpc3REYXRhLmRlbGltaXRlcjsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGRlbGltKSB7IHRoaXMuX2xpc3REYXRhLmRlbGltaXRlciA9IGRlbGltOyB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnb25FbnRlcicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fb25FbnRlcjsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fb25FbnRlciA9IHM7IH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbkV4aXQnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX29uRXhpdDsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHMpIHsgdGhpcy5fb25FeGl0ID0gczsgfVxufSk7XG5cbk5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICBjaGlsZC51bmxpbmsoKTtcbiAgICBjaGlsZC5fcGFyZW50ID0gdGhpcztcbiAgICBpZiAodGhpcy5fbGFzdENoaWxkKSB7XG4gICAgICAgIHRoaXMuX2xhc3RDaGlsZC5fbmV4dCA9IGNoaWxkO1xuICAgICAgICBjaGlsZC5fcHJldiA9IHRoaXMuX2xhc3RDaGlsZDtcbiAgICAgICAgdGhpcy5fbGFzdENoaWxkID0gY2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmlyc3RDaGlsZCA9IGNoaWxkO1xuICAgICAgICB0aGlzLl9sYXN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5wcmVwZW5kQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIGNoaWxkLnVubGluaygpO1xuICAgIGNoaWxkLl9wYXJlbnQgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9maXJzdENoaWxkKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0Q2hpbGQuX3ByZXYgPSBjaGlsZDtcbiAgICAgICAgY2hpbGQuX25leHQgPSB0aGlzLl9maXJzdENoaWxkO1xuICAgICAgICB0aGlzLl9maXJzdENoaWxkID0gY2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmlyc3RDaGlsZCA9IGNoaWxkO1xuICAgICAgICB0aGlzLl9sYXN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS51bmxpbmsgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gdGhpcy5fbmV4dDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0Q2hpbGQgPSB0aGlzLl9uZXh0O1xuICAgIH1cbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgICB0aGlzLl9uZXh0Ll9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2xhc3RDaGlsZCA9IHRoaXMuX3ByZXY7XG4gICAgfVxuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fbmV4dCA9IG51bGw7XG4gICAgdGhpcy5fcHJldiA9IG51bGw7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uKHNpYmxpbmcpIHtcbiAgICBzaWJsaW5nLnVubGluaygpO1xuICAgIHNpYmxpbmcuX25leHQgPSB0aGlzLl9uZXh0O1xuICAgIGlmIChzaWJsaW5nLl9uZXh0KSB7XG4gICAgICAgIHNpYmxpbmcuX25leHQuX3ByZXYgPSBzaWJsaW5nO1xuICAgIH1cbiAgICBzaWJsaW5nLl9wcmV2ID0gdGhpcztcbiAgICB0aGlzLl9uZXh0ID0gc2libGluZztcbiAgICBzaWJsaW5nLl9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgaWYgKCFzaWJsaW5nLl9uZXh0KSB7XG4gICAgICAgIHNpYmxpbmcuX3BhcmVudC5fbGFzdENoaWxkID0gc2libGluZztcbiAgICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pbnNlcnRCZWZvcmUgPSBmdW5jdGlvbihzaWJsaW5nKSB7XG4gICAgc2libGluZy51bmxpbmsoKTtcbiAgICBzaWJsaW5nLl9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICBpZiAoc2libGluZy5fcHJldikge1xuICAgICAgICBzaWJsaW5nLl9wcmV2Ll9uZXh0ID0gc2libGluZztcbiAgICB9XG4gICAgc2libGluZy5fbmV4dCA9IHRoaXM7XG4gICAgdGhpcy5fcHJldiA9IHNpYmxpbmc7XG4gICAgc2libGluZy5fcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgIGlmICghc2libGluZy5fcHJldikge1xuICAgICAgICBzaWJsaW5nLl9wYXJlbnQuX2ZpcnN0Q2hpbGQgPSBzaWJsaW5nO1xuICAgIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLndhbGtlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3YWxrZXIgPSBuZXcgTm9kZVdhbGtlcih0aGlzKTtcbiAgICByZXR1cm4gd2Fsa2VyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuXG5cbi8qIEV4YW1wbGUgb2YgdXNlIG9mIHdhbGtlcjpcblxuIHZhciB3YWxrZXIgPSB3LndhbGtlcigpO1xuIHZhciBldmVudDtcblxuIHdoaWxlIChldmVudCA9IHdhbGtlci5uZXh0KCkpIHtcbiBjb25zb2xlLmxvZyhldmVudC5lbnRlcmluZywgZXZlbnQubm9kZS50eXBlKTtcbiB9XG5cbiAqL1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvbm9kZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZW5jb2RlID0gcmVxdWlyZShcIi4vbGliL2VuY29kZS5qc1wiKSxcbiAgICBkZWNvZGUgPSByZXF1aXJlKFwiLi9saWIvZGVjb2RlLmpzXCIpO1xuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmRlY29kZVN0cmljdCA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTFN0cmljdCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGVuY29kZS5YTUwgOiBlbmNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZVhNTCA9IGVuY29kZS5YTUw7XG5cbmV4cG9ydHMuZW5jb2RlSFRNTDQgPVxuZXhwb3J0cy5lbmNvZGVIVE1MNSA9XG5leHBvcnRzLmVuY29kZUhUTUwgID0gZW5jb2RlLkhUTUw7XG5cbmV4cG9ydHMuZGVjb2RlWE1MID1cbmV4cG9ydHMuZGVjb2RlWE1MU3RyaWN0ID0gZGVjb2RlLlhNTDtcblxuZXhwb3J0cy5kZWNvZGVIVE1MNCA9XG5leHBvcnRzLmRlY29kZUhUTUw1ID1cbmV4cG9ydHMuZGVjb2RlSFRNTCA9IGRlY29kZS5IVE1MO1xuXG5leHBvcnRzLmRlY29kZUhUTUw0U3RyaWN0ID1cbmV4cG9ydHMuZGVjb2RlSFRNTDVTdHJpY3QgPVxuZXhwb3J0cy5kZWNvZGVIVE1MU3RyaWN0ID0gZGVjb2RlLkhUTUxTdHJpY3Q7XG5cbmV4cG9ydHMuZXNjYXBlID0gZW5jb2RlLmVzY2FwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wiYW1wXCI6XCImXCIsXCJhcG9zXCI6XCInXCIsXCJndFwiOlwiPlwiLFwibHRcIjpcIjxcIixcInF1b3RcIjpcIlxcXCJcIn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL3htbC5qc29uXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wiQWFjdXRlXCI6XCLDgVwiLFwiYWFjdXRlXCI6XCLDoVwiLFwiQWJyZXZlXCI6XCLEglwiLFwiYWJyZXZlXCI6XCLEg1wiLFwiYWNcIjpcIuKIvlwiLFwiYWNkXCI6XCLiiL9cIixcImFjRVwiOlwi4oi+zLNcIixcIkFjaXJjXCI6XCLDglwiLFwiYWNpcmNcIjpcIsOiXCIsXCJhY3V0ZVwiOlwiwrRcIixcIkFjeVwiOlwi0JBcIixcImFjeVwiOlwi0LBcIixcIkFFbGlnXCI6XCLDhlwiLFwiYWVsaWdcIjpcIsOmXCIsXCJhZlwiOlwi4oGhXCIsXCJBZnJcIjpcIvCdlIRcIixcImFmclwiOlwi8J2UnlwiLFwiQWdyYXZlXCI6XCLDgFwiLFwiYWdyYXZlXCI6XCLDoFwiLFwiYWxlZnN5bVwiOlwi4oS1XCIsXCJhbGVwaFwiOlwi4oS1XCIsXCJBbHBoYVwiOlwizpFcIixcImFscGhhXCI6XCLOsVwiLFwiQW1hY3JcIjpcIsSAXCIsXCJhbWFjclwiOlwixIFcIixcImFtYWxnXCI6XCLiqL9cIixcImFtcFwiOlwiJlwiLFwiQU1QXCI6XCImXCIsXCJhbmRhbmRcIjpcIuKplVwiLFwiQW5kXCI6XCLiqZNcIixcImFuZFwiOlwi4oinXCIsXCJhbmRkXCI6XCLiqZxcIixcImFuZHNsb3BlXCI6XCLiqZhcIixcImFuZHZcIjpcIuKpmlwiLFwiYW5nXCI6XCLiiKBcIixcImFuZ2VcIjpcIuKmpFwiLFwiYW5nbGVcIjpcIuKIoFwiLFwiYW5nbXNkYWFcIjpcIuKmqFwiLFwiYW5nbXNkYWJcIjpcIuKmqVwiLFwiYW5nbXNkYWNcIjpcIuKmqlwiLFwiYW5nbXNkYWRcIjpcIuKmq1wiLFwiYW5nbXNkYWVcIjpcIuKmrFwiLFwiYW5nbXNkYWZcIjpcIuKmrVwiLFwiYW5nbXNkYWdcIjpcIuKmrlwiLFwiYW5nbXNkYWhcIjpcIuKmr1wiLFwiYW5nbXNkXCI6XCLiiKFcIixcImFuZ3J0XCI6XCLiiJ9cIixcImFuZ3J0dmJcIjpcIuKKvlwiLFwiYW5ncnR2YmRcIjpcIuKmnVwiLFwiYW5nc3BoXCI6XCLiiKJcIixcImFuZ3N0XCI6XCLDhVwiLFwiYW5nemFyclwiOlwi4o28XCIsXCJBb2dvblwiOlwixIRcIixcImFvZ29uXCI6XCLEhVwiLFwiQW9wZlwiOlwi8J2UuFwiLFwiYW9wZlwiOlwi8J2VklwiLFwiYXBhY2lyXCI6XCLiqa9cIixcImFwXCI6XCLiiYhcIixcImFwRVwiOlwi4qmwXCIsXCJhcGVcIjpcIuKJilwiLFwiYXBpZFwiOlwi4omLXCIsXCJhcG9zXCI6XCInXCIsXCJBcHBseUZ1bmN0aW9uXCI6XCLigaFcIixcImFwcHJveFwiOlwi4omIXCIsXCJhcHByb3hlcVwiOlwi4omKXCIsXCJBcmluZ1wiOlwiw4VcIixcImFyaW5nXCI6XCLDpVwiLFwiQXNjclwiOlwi8J2SnFwiLFwiYXNjclwiOlwi8J2StlwiLFwiQXNzaWduXCI6XCLiiZRcIixcImFzdFwiOlwiKlwiLFwiYXN5bXBcIjpcIuKJiFwiLFwiYXN5bXBlcVwiOlwi4omNXCIsXCJBdGlsZGVcIjpcIsODXCIsXCJhdGlsZGVcIjpcIsOjXCIsXCJBdW1sXCI6XCLDhFwiLFwiYXVtbFwiOlwiw6RcIixcImF3Y29uaW50XCI6XCLiiLNcIixcImF3aW50XCI6XCLiqJFcIixcImJhY2tjb25nXCI6XCLiiYxcIixcImJhY2tlcHNpbG9uXCI6XCLPtlwiLFwiYmFja3ByaW1lXCI6XCLigLVcIixcImJhY2tzaW1cIjpcIuKIvVwiLFwiYmFja3NpbWVxXCI6XCLii41cIixcIkJhY2tzbGFzaFwiOlwi4oiWXCIsXCJCYXJ2XCI6XCLiq6dcIixcImJhcnZlZVwiOlwi4oq9XCIsXCJiYXJ3ZWRcIjpcIuKMhVwiLFwiQmFyd2VkXCI6XCLijIZcIixcImJhcndlZGdlXCI6XCLijIVcIixcImJicmtcIjpcIuKOtVwiLFwiYmJya3RicmtcIjpcIuKOtlwiLFwiYmNvbmdcIjpcIuKJjFwiLFwiQmN5XCI6XCLQkVwiLFwiYmN5XCI6XCLQsVwiLFwiYmRxdW9cIjpcIuKAnlwiLFwiYmVjYXVzXCI6XCLiiLVcIixcImJlY2F1c2VcIjpcIuKItVwiLFwiQmVjYXVzZVwiOlwi4oi1XCIsXCJiZW1wdHl2XCI6XCLiprBcIixcImJlcHNpXCI6XCLPtlwiLFwiYmVybm91XCI6XCLihKxcIixcIkJlcm5vdWxsaXNcIjpcIuKErFwiLFwiQmV0YVwiOlwizpJcIixcImJldGFcIjpcIs6yXCIsXCJiZXRoXCI6XCLihLZcIixcImJldHdlZW5cIjpcIuKJrFwiLFwiQmZyXCI6XCLwnZSFXCIsXCJiZnJcIjpcIvCdlJ9cIixcImJpZ2NhcFwiOlwi4ouCXCIsXCJiaWdjaXJjXCI6XCLil69cIixcImJpZ2N1cFwiOlwi4ouDXCIsXCJiaWdvZG90XCI6XCLiqIBcIixcImJpZ29wbHVzXCI6XCLiqIFcIixcImJpZ290aW1lc1wiOlwi4qiCXCIsXCJiaWdzcWN1cFwiOlwi4qiGXCIsXCJiaWdzdGFyXCI6XCLimIVcIixcImJpZ3RyaWFuZ2xlZG93blwiOlwi4pa9XCIsXCJiaWd0cmlhbmdsZXVwXCI6XCLilrNcIixcImJpZ3VwbHVzXCI6XCLiqIRcIixcImJpZ3ZlZVwiOlwi4ouBXCIsXCJiaWd3ZWRnZVwiOlwi4ouAXCIsXCJia2Fyb3dcIjpcIuKkjVwiLFwiYmxhY2tsb3plbmdlXCI6XCLip6tcIixcImJsYWNrc3F1YXJlXCI6XCLilqpcIixcImJsYWNrdHJpYW5nbGVcIjpcIuKWtFwiLFwiYmxhY2t0cmlhbmdsZWRvd25cIjpcIuKWvlwiLFwiYmxhY2t0cmlhbmdsZWxlZnRcIjpcIuKXglwiLFwiYmxhY2t0cmlhbmdsZXJpZ2h0XCI6XCLilrhcIixcImJsYW5rXCI6XCLikKNcIixcImJsazEyXCI6XCLilpJcIixcImJsazE0XCI6XCLilpFcIixcImJsazM0XCI6XCLilpNcIixcImJsb2NrXCI6XCLilohcIixcImJuZVwiOlwiPeKDpVwiLFwiYm5lcXVpdlwiOlwi4omh4oOlXCIsXCJiTm90XCI6XCLiq61cIixcImJub3RcIjpcIuKMkFwiLFwiQm9wZlwiOlwi8J2UuVwiLFwiYm9wZlwiOlwi8J2Vk1wiLFwiYm90XCI6XCLiiqVcIixcImJvdHRvbVwiOlwi4oqlXCIsXCJib3d0aWVcIjpcIuKLiFwiLFwiYm94Ym94XCI6XCLip4lcIixcImJveGRsXCI6XCLilJBcIixcImJveGRMXCI6XCLilZVcIixcImJveERsXCI6XCLilZZcIixcImJveERMXCI6XCLilZdcIixcImJveGRyXCI6XCLilIxcIixcImJveGRSXCI6XCLilZJcIixcImJveERyXCI6XCLilZNcIixcImJveERSXCI6XCLilZRcIixcImJveGhcIjpcIuKUgFwiLFwiYm94SFwiOlwi4pWQXCIsXCJib3hoZFwiOlwi4pSsXCIsXCJib3hIZFwiOlwi4pWkXCIsXCJib3hoRFwiOlwi4pWlXCIsXCJib3hIRFwiOlwi4pWmXCIsXCJib3hodVwiOlwi4pS0XCIsXCJib3hIdVwiOlwi4pWnXCIsXCJib3hoVVwiOlwi4pWoXCIsXCJib3hIVVwiOlwi4pWpXCIsXCJib3htaW51c1wiOlwi4oqfXCIsXCJib3hwbHVzXCI6XCLiip5cIixcImJveHRpbWVzXCI6XCLiiqBcIixcImJveHVsXCI6XCLilJhcIixcImJveHVMXCI6XCLilZtcIixcImJveFVsXCI6XCLilZxcIixcImJveFVMXCI6XCLilZ1cIixcImJveHVyXCI6XCLilJRcIixcImJveHVSXCI6XCLilZhcIixcImJveFVyXCI6XCLilZlcIixcImJveFVSXCI6XCLilZpcIixcImJveHZcIjpcIuKUglwiLFwiYm94VlwiOlwi4pWRXCIsXCJib3h2aFwiOlwi4pS8XCIsXCJib3h2SFwiOlwi4pWqXCIsXCJib3hWaFwiOlwi4pWrXCIsXCJib3hWSFwiOlwi4pWsXCIsXCJib3h2bFwiOlwi4pSkXCIsXCJib3h2TFwiOlwi4pWhXCIsXCJib3hWbFwiOlwi4pWiXCIsXCJib3hWTFwiOlwi4pWjXCIsXCJib3h2clwiOlwi4pScXCIsXCJib3h2UlwiOlwi4pWeXCIsXCJib3hWclwiOlwi4pWfXCIsXCJib3hWUlwiOlwi4pWgXCIsXCJicHJpbWVcIjpcIuKAtVwiLFwiYnJldmVcIjpcIsuYXCIsXCJCcmV2ZVwiOlwiy5hcIixcImJydmJhclwiOlwiwqZcIixcImJzY3JcIjpcIvCdkrdcIixcIkJzY3JcIjpcIuKErFwiLFwiYnNlbWlcIjpcIuKBj1wiLFwiYnNpbVwiOlwi4oi9XCIsXCJic2ltZVwiOlwi4ouNXCIsXCJic29sYlwiOlwi4qeFXCIsXCJic29sXCI6XCJcXFxcXCIsXCJic29saHN1YlwiOlwi4p+IXCIsXCJidWxsXCI6XCLigKJcIixcImJ1bGxldFwiOlwi4oCiXCIsXCJidW1wXCI6XCLiiY5cIixcImJ1bXBFXCI6XCLiqq5cIixcImJ1bXBlXCI6XCLiiY9cIixcIkJ1bXBlcVwiOlwi4omOXCIsXCJidW1wZXFcIjpcIuKJj1wiLFwiQ2FjdXRlXCI6XCLEhlwiLFwiY2FjdXRlXCI6XCLEh1wiLFwiY2FwYW5kXCI6XCLiqYRcIixcImNhcGJyY3VwXCI6XCLiqYlcIixcImNhcGNhcFwiOlwi4qmLXCIsXCJjYXBcIjpcIuKIqVwiLFwiQ2FwXCI6XCLii5JcIixcImNhcGN1cFwiOlwi4qmHXCIsXCJjYXBkb3RcIjpcIuKpgFwiLFwiQ2FwaXRhbERpZmZlcmVudGlhbERcIjpcIuKFhVwiLFwiY2Fwc1wiOlwi4oip77iAXCIsXCJjYXJldFwiOlwi4oGBXCIsXCJjYXJvblwiOlwiy4dcIixcIkNheWxleXNcIjpcIuKErVwiLFwiY2NhcHNcIjpcIuKpjVwiLFwiQ2Nhcm9uXCI6XCLEjFwiLFwiY2Nhcm9uXCI6XCLEjVwiLFwiQ2NlZGlsXCI6XCLDh1wiLFwiY2NlZGlsXCI6XCLDp1wiLFwiQ2NpcmNcIjpcIsSIXCIsXCJjY2lyY1wiOlwixIlcIixcIkNjb25pbnRcIjpcIuKIsFwiLFwiY2N1cHNcIjpcIuKpjFwiLFwiY2N1cHNzbVwiOlwi4qmQXCIsXCJDZG90XCI6XCLEilwiLFwiY2RvdFwiOlwixItcIixcImNlZGlsXCI6XCLCuFwiLFwiQ2VkaWxsYVwiOlwiwrhcIixcImNlbXB0eXZcIjpcIuKmslwiLFwiY2VudFwiOlwiwqJcIixcImNlbnRlcmRvdFwiOlwiwrdcIixcIkNlbnRlckRvdFwiOlwiwrdcIixcImNmclwiOlwi8J2UoFwiLFwiQ2ZyXCI6XCLihK1cIixcIkNIY3lcIjpcItCnXCIsXCJjaGN5XCI6XCLRh1wiLFwiY2hlY2tcIjpcIuKck1wiLFwiY2hlY2ttYXJrXCI6XCLinJNcIixcIkNoaVwiOlwizqdcIixcImNoaVwiOlwiz4dcIixcImNpcmNcIjpcIsuGXCIsXCJjaXJjZXFcIjpcIuKJl1wiLFwiY2lyY2xlYXJyb3dsZWZ0XCI6XCLihrpcIixcImNpcmNsZWFycm93cmlnaHRcIjpcIuKGu1wiLFwiY2lyY2xlZGFzdFwiOlwi4oqbXCIsXCJjaXJjbGVkY2lyY1wiOlwi4oqaXCIsXCJjaXJjbGVkZGFzaFwiOlwi4oqdXCIsXCJDaXJjbGVEb3RcIjpcIuKKmVwiLFwiY2lyY2xlZFJcIjpcIsKuXCIsXCJjaXJjbGVkU1wiOlwi4pOIXCIsXCJDaXJjbGVNaW51c1wiOlwi4oqWXCIsXCJDaXJjbGVQbHVzXCI6XCLiipVcIixcIkNpcmNsZVRpbWVzXCI6XCLiipdcIixcImNpclwiOlwi4peLXCIsXCJjaXJFXCI6XCLip4NcIixcImNpcmVcIjpcIuKJl1wiLFwiY2lyZm5pbnRcIjpcIuKokFwiLFwiY2lybWlkXCI6XCLiq69cIixcImNpcnNjaXJcIjpcIuKnglwiLFwiQ2xvY2t3aXNlQ29udG91ckludGVncmFsXCI6XCLiiLJcIixcIkNsb3NlQ3VybHlEb3VibGVRdW90ZVwiOlwi4oCdXCIsXCJDbG9zZUN1cmx5UXVvdGVcIjpcIuKAmVwiLFwiY2x1YnNcIjpcIuKZo1wiLFwiY2x1YnN1aXRcIjpcIuKZo1wiLFwiY29sb25cIjpcIjpcIixcIkNvbG9uXCI6XCLiiLdcIixcIkNvbG9uZVwiOlwi4qm0XCIsXCJjb2xvbmVcIjpcIuKJlFwiLFwiY29sb25lcVwiOlwi4omUXCIsXCJjb21tYVwiOlwiLFwiLFwiY29tbWF0XCI6XCJAXCIsXCJjb21wXCI6XCLiiIFcIixcImNvbXBmblwiOlwi4oiYXCIsXCJjb21wbGVtZW50XCI6XCLiiIFcIixcImNvbXBsZXhlc1wiOlwi4oSCXCIsXCJjb25nXCI6XCLiiYVcIixcImNvbmdkb3RcIjpcIuKprVwiLFwiQ29uZ3J1ZW50XCI6XCLiiaFcIixcImNvbmludFwiOlwi4oiuXCIsXCJDb25pbnRcIjpcIuKIr1wiLFwiQ29udG91ckludGVncmFsXCI6XCLiiK5cIixcImNvcGZcIjpcIvCdlZRcIixcIkNvcGZcIjpcIuKEglwiLFwiY29wcm9kXCI6XCLiiJBcIixcIkNvcHJvZHVjdFwiOlwi4oiQXCIsXCJjb3B5XCI6XCLCqVwiLFwiQ09QWVwiOlwiwqlcIixcImNvcHlzclwiOlwi4oSXXCIsXCJDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsXCI6XCLiiLNcIixcImNyYXJyXCI6XCLihrVcIixcImNyb3NzXCI6XCLinJdcIixcIkNyb3NzXCI6XCLiqK9cIixcIkNzY3JcIjpcIvCdkp5cIixcImNzY3JcIjpcIvCdkrhcIixcImNzdWJcIjpcIuKrj1wiLFwiY3N1YmVcIjpcIuKrkVwiLFwiY3N1cFwiOlwi4quQXCIsXCJjc3VwZVwiOlwi4quSXCIsXCJjdGRvdFwiOlwi4ouvXCIsXCJjdWRhcnJsXCI6XCLipLhcIixcImN1ZGFycnJcIjpcIuKktVwiLFwiY3VlcHJcIjpcIuKLnlwiLFwiY3Vlc2NcIjpcIuKLn1wiLFwiY3VsYXJyXCI6XCLihrZcIixcImN1bGFycnBcIjpcIuKkvVwiLFwiY3VwYnJjYXBcIjpcIuKpiFwiLFwiY3VwY2FwXCI6XCLiqYZcIixcIkN1cENhcFwiOlwi4omNXCIsXCJjdXBcIjpcIuKIqlwiLFwiQ3VwXCI6XCLii5NcIixcImN1cGN1cFwiOlwi4qmKXCIsXCJjdXBkb3RcIjpcIuKKjVwiLFwiY3Vwb3JcIjpcIuKphVwiLFwiY3Vwc1wiOlwi4oiq77iAXCIsXCJjdXJhcnJcIjpcIuKGt1wiLFwiY3VyYXJybVwiOlwi4qS8XCIsXCJjdXJseWVxcHJlY1wiOlwi4oueXCIsXCJjdXJseWVxc3VjY1wiOlwi4oufXCIsXCJjdXJseXZlZVwiOlwi4ouOXCIsXCJjdXJseXdlZGdlXCI6XCLii49cIixcImN1cnJlblwiOlwiwqRcIixcImN1cnZlYXJyb3dsZWZ0XCI6XCLihrZcIixcImN1cnZlYXJyb3dyaWdodFwiOlwi4oa3XCIsXCJjdXZlZVwiOlwi4ouOXCIsXCJjdXdlZFwiOlwi4ouPXCIsXCJjd2NvbmludFwiOlwi4oiyXCIsXCJjd2ludFwiOlwi4oixXCIsXCJjeWxjdHlcIjpcIuKMrVwiLFwiZGFnZ2VyXCI6XCLigKBcIixcIkRhZ2dlclwiOlwi4oChXCIsXCJkYWxldGhcIjpcIuKEuFwiLFwiZGFyclwiOlwi4oaTXCIsXCJEYXJyXCI6XCLihqFcIixcImRBcnJcIjpcIuKHk1wiLFwiZGFzaFwiOlwi4oCQXCIsXCJEYXNodlwiOlwi4qukXCIsXCJkYXNodlwiOlwi4oqjXCIsXCJkYmthcm93XCI6XCLipI9cIixcImRibGFjXCI6XCLLnVwiLFwiRGNhcm9uXCI6XCLEjlwiLFwiZGNhcm9uXCI6XCLEj1wiLFwiRGN5XCI6XCLQlFwiLFwiZGN5XCI6XCLQtFwiLFwiZGRhZ2dlclwiOlwi4oChXCIsXCJkZGFyclwiOlwi4oeKXCIsXCJERFwiOlwi4oWFXCIsXCJkZFwiOlwi4oWGXCIsXCJERG90cmFoZFwiOlwi4qSRXCIsXCJkZG90c2VxXCI6XCLiqbdcIixcImRlZ1wiOlwiwrBcIixcIkRlbFwiOlwi4oiHXCIsXCJEZWx0YVwiOlwizpRcIixcImRlbHRhXCI6XCLOtFwiLFwiZGVtcHR5dlwiOlwi4qaxXCIsXCJkZmlzaHRcIjpcIuKlv1wiLFwiRGZyXCI6XCLwnZSHXCIsXCJkZnJcIjpcIvCdlKFcIixcImRIYXJcIjpcIuKlpVwiLFwiZGhhcmxcIjpcIuKHg1wiLFwiZGhhcnJcIjpcIuKHglwiLFwiRGlhY3JpdGljYWxBY3V0ZVwiOlwiwrRcIixcIkRpYWNyaXRpY2FsRG90XCI6XCLLmVwiLFwiRGlhY3JpdGljYWxEb3VibGVBY3V0ZVwiOlwiy51cIixcIkRpYWNyaXRpY2FsR3JhdmVcIjpcImBcIixcIkRpYWNyaXRpY2FsVGlsZGVcIjpcIsucXCIsXCJkaWFtXCI6XCLii4RcIixcImRpYW1vbmRcIjpcIuKLhFwiLFwiRGlhbW9uZFwiOlwi4ouEXCIsXCJkaWFtb25kc3VpdFwiOlwi4pmmXCIsXCJkaWFtc1wiOlwi4pmmXCIsXCJkaWVcIjpcIsKoXCIsXCJEaWZmZXJlbnRpYWxEXCI6XCLihYZcIixcImRpZ2FtbWFcIjpcIs+dXCIsXCJkaXNpblwiOlwi4ouyXCIsXCJkaXZcIjpcIsO3XCIsXCJkaXZpZGVcIjpcIsO3XCIsXCJkaXZpZGVvbnRpbWVzXCI6XCLii4dcIixcImRpdm9ueFwiOlwi4ouHXCIsXCJESmN5XCI6XCLQglwiLFwiZGpjeVwiOlwi0ZJcIixcImRsY29yblwiOlwi4oyeXCIsXCJkbGNyb3BcIjpcIuKMjVwiLFwiZG9sbGFyXCI6XCIkXCIsXCJEb3BmXCI6XCLwnZS7XCIsXCJkb3BmXCI6XCLwnZWVXCIsXCJEb3RcIjpcIsKoXCIsXCJkb3RcIjpcIsuZXCIsXCJEb3REb3RcIjpcIuKDnFwiLFwiZG90ZXFcIjpcIuKJkFwiLFwiZG90ZXFkb3RcIjpcIuKJkVwiLFwiRG90RXF1YWxcIjpcIuKJkFwiLFwiZG90bWludXNcIjpcIuKIuFwiLFwiZG90cGx1c1wiOlwi4oiUXCIsXCJkb3RzcXVhcmVcIjpcIuKKoVwiLFwiZG91YmxlYmFyd2VkZ2VcIjpcIuKMhlwiLFwiRG91YmxlQ29udG91ckludGVncmFsXCI6XCLiiK9cIixcIkRvdWJsZURvdFwiOlwiwqhcIixcIkRvdWJsZURvd25BcnJvd1wiOlwi4oeTXCIsXCJEb3VibGVMZWZ0QXJyb3dcIjpcIuKHkFwiLFwiRG91YmxlTGVmdFJpZ2h0QXJyb3dcIjpcIuKHlFwiLFwiRG91YmxlTGVmdFRlZVwiOlwi4qukXCIsXCJEb3VibGVMb25nTGVmdEFycm93XCI6XCLin7hcIixcIkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvd1wiOlwi4p+6XCIsXCJEb3VibGVMb25nUmlnaHRBcnJvd1wiOlwi4p+5XCIsXCJEb3VibGVSaWdodEFycm93XCI6XCLih5JcIixcIkRvdWJsZVJpZ2h0VGVlXCI6XCLiiqhcIixcIkRvdWJsZVVwQXJyb3dcIjpcIuKHkVwiLFwiRG91YmxlVXBEb3duQXJyb3dcIjpcIuKHlVwiLFwiRG91YmxlVmVydGljYWxCYXJcIjpcIuKIpVwiLFwiRG93bkFycm93QmFyXCI6XCLipJNcIixcImRvd25hcnJvd1wiOlwi4oaTXCIsXCJEb3duQXJyb3dcIjpcIuKGk1wiLFwiRG93bmFycm93XCI6XCLih5NcIixcIkRvd25BcnJvd1VwQXJyb3dcIjpcIuKHtVwiLFwiRG93bkJyZXZlXCI6XCLMkVwiLFwiZG93bmRvd25hcnJvd3NcIjpcIuKHilwiLFwiZG93bmhhcnBvb25sZWZ0XCI6XCLih4NcIixcImRvd25oYXJwb29ucmlnaHRcIjpcIuKHglwiLFwiRG93bkxlZnRSaWdodFZlY3RvclwiOlwi4qWQXCIsXCJEb3duTGVmdFRlZVZlY3RvclwiOlwi4qWeXCIsXCJEb3duTGVmdFZlY3RvckJhclwiOlwi4qWWXCIsXCJEb3duTGVmdFZlY3RvclwiOlwi4oa9XCIsXCJEb3duUmlnaHRUZWVWZWN0b3JcIjpcIuKln1wiLFwiRG93blJpZ2h0VmVjdG9yQmFyXCI6XCLipZdcIixcIkRvd25SaWdodFZlY3RvclwiOlwi4oeBXCIsXCJEb3duVGVlQXJyb3dcIjpcIuKGp1wiLFwiRG93blRlZVwiOlwi4oqkXCIsXCJkcmJrYXJvd1wiOlwi4qSQXCIsXCJkcmNvcm5cIjpcIuKMn1wiLFwiZHJjcm9wXCI6XCLijIxcIixcIkRzY3JcIjpcIvCdkp9cIixcImRzY3JcIjpcIvCdkrlcIixcIkRTY3lcIjpcItCFXCIsXCJkc2N5XCI6XCLRlVwiLFwiZHNvbFwiOlwi4qe2XCIsXCJEc3Ryb2tcIjpcIsSQXCIsXCJkc3Ryb2tcIjpcIsSRXCIsXCJkdGRvdFwiOlwi4ouxXCIsXCJkdHJpXCI6XCLilr9cIixcImR0cmlmXCI6XCLilr5cIixcImR1YXJyXCI6XCLih7VcIixcImR1aGFyXCI6XCLipa9cIixcImR3YW5nbGVcIjpcIuKmplwiLFwiRFpjeVwiOlwi0I9cIixcImR6Y3lcIjpcItGfXCIsXCJkemlncmFyclwiOlwi4p+/XCIsXCJFYWN1dGVcIjpcIsOJXCIsXCJlYWN1dGVcIjpcIsOpXCIsXCJlYXN0ZXJcIjpcIuKprlwiLFwiRWNhcm9uXCI6XCLEmlwiLFwiZWNhcm9uXCI6XCLEm1wiLFwiRWNpcmNcIjpcIsOKXCIsXCJlY2lyY1wiOlwiw6pcIixcImVjaXJcIjpcIuKJllwiLFwiZWNvbG9uXCI6XCLiiZVcIixcIkVjeVwiOlwi0K1cIixcImVjeVwiOlwi0Y1cIixcImVERG90XCI6XCLiqbdcIixcIkVkb3RcIjpcIsSWXCIsXCJlZG90XCI6XCLEl1wiLFwiZURvdFwiOlwi4omRXCIsXCJlZVwiOlwi4oWHXCIsXCJlZkRvdFwiOlwi4omSXCIsXCJFZnJcIjpcIvCdlIhcIixcImVmclwiOlwi8J2UolwiLFwiZWdcIjpcIuKqmlwiLFwiRWdyYXZlXCI6XCLDiFwiLFwiZWdyYXZlXCI6XCLDqFwiLFwiZWdzXCI6XCLiqpZcIixcImVnc2RvdFwiOlwi4qqYXCIsXCJlbFwiOlwi4qqZXCIsXCJFbGVtZW50XCI6XCLiiIhcIixcImVsaW50ZXJzXCI6XCLij6dcIixcImVsbFwiOlwi4oSTXCIsXCJlbHNcIjpcIuKqlVwiLFwiZWxzZG90XCI6XCLiqpdcIixcIkVtYWNyXCI6XCLEklwiLFwiZW1hY3JcIjpcIsSTXCIsXCJlbXB0eVwiOlwi4oiFXCIsXCJlbXB0eXNldFwiOlwi4oiFXCIsXCJFbXB0eVNtYWxsU3F1YXJlXCI6XCLil7tcIixcImVtcHR5dlwiOlwi4oiFXCIsXCJFbXB0eVZlcnlTbWFsbFNxdWFyZVwiOlwi4parXCIsXCJlbXNwMTNcIjpcIuKAhFwiLFwiZW1zcDE0XCI6XCLigIVcIixcImVtc3BcIjpcIuKAg1wiLFwiRU5HXCI6XCLFilwiLFwiZW5nXCI6XCLFi1wiLFwiZW5zcFwiOlwi4oCCXCIsXCJFb2dvblwiOlwixJhcIixcImVvZ29uXCI6XCLEmVwiLFwiRW9wZlwiOlwi8J2UvFwiLFwiZW9wZlwiOlwi8J2VllwiLFwiZXBhclwiOlwi4ouVXCIsXCJlcGFyc2xcIjpcIuKno1wiLFwiZXBsdXNcIjpcIuKpsVwiLFwiZXBzaVwiOlwizrVcIixcIkVwc2lsb25cIjpcIs6VXCIsXCJlcHNpbG9uXCI6XCLOtVwiLFwiZXBzaXZcIjpcIs+1XCIsXCJlcWNpcmNcIjpcIuKJllwiLFwiZXFjb2xvblwiOlwi4omVXCIsXCJlcXNpbVwiOlwi4omCXCIsXCJlcXNsYW50Z3RyXCI6XCLiqpZcIixcImVxc2xhbnRsZXNzXCI6XCLiqpVcIixcIkVxdWFsXCI6XCLiqbVcIixcImVxdWFsc1wiOlwiPVwiLFwiRXF1YWxUaWxkZVwiOlwi4omCXCIsXCJlcXVlc3RcIjpcIuKJn1wiLFwiRXF1aWxpYnJpdW1cIjpcIuKHjFwiLFwiZXF1aXZcIjpcIuKJoVwiLFwiZXF1aXZERFwiOlwi4qm4XCIsXCJlcXZwYXJzbFwiOlwi4qelXCIsXCJlcmFyclwiOlwi4qWxXCIsXCJlckRvdFwiOlwi4omTXCIsXCJlc2NyXCI6XCLihK9cIixcIkVzY3JcIjpcIuKEsFwiLFwiZXNkb3RcIjpcIuKJkFwiLFwiRXNpbVwiOlwi4qmzXCIsXCJlc2ltXCI6XCLiiYJcIixcIkV0YVwiOlwizpdcIixcImV0YVwiOlwizrdcIixcIkVUSFwiOlwiw5BcIixcImV0aFwiOlwiw7BcIixcIkV1bWxcIjpcIsOLXCIsXCJldW1sXCI6XCLDq1wiLFwiZXVyb1wiOlwi4oKsXCIsXCJleGNsXCI6XCIhXCIsXCJleGlzdFwiOlwi4oiDXCIsXCJFeGlzdHNcIjpcIuKIg1wiLFwiZXhwZWN0YXRpb25cIjpcIuKEsFwiLFwiZXhwb25lbnRpYWxlXCI6XCLihYdcIixcIkV4cG9uZW50aWFsRVwiOlwi4oWHXCIsXCJmYWxsaW5nZG90c2VxXCI6XCLiiZJcIixcIkZjeVwiOlwi0KRcIixcImZjeVwiOlwi0YRcIixcImZlbWFsZVwiOlwi4pmAXCIsXCJmZmlsaWdcIjpcIu+sg1wiLFwiZmZsaWdcIjpcIu+sgFwiLFwiZmZsbGlnXCI6XCLvrIRcIixcIkZmclwiOlwi8J2UiVwiLFwiZmZyXCI6XCLwnZSjXCIsXCJmaWxpZ1wiOlwi76yBXCIsXCJGaWxsZWRTbWFsbFNxdWFyZVwiOlwi4pe8XCIsXCJGaWxsZWRWZXJ5U21hbGxTcXVhcmVcIjpcIuKWqlwiLFwiZmpsaWdcIjpcImZqXCIsXCJmbGF0XCI6XCLima1cIixcImZsbGlnXCI6XCLvrIJcIixcImZsdG5zXCI6XCLilrFcIixcImZub2ZcIjpcIsaSXCIsXCJGb3BmXCI6XCLwnZS9XCIsXCJmb3BmXCI6XCLwnZWXXCIsXCJmb3JhbGxcIjpcIuKIgFwiLFwiRm9yQWxsXCI6XCLiiIBcIixcImZvcmtcIjpcIuKLlFwiLFwiZm9ya3ZcIjpcIuKrmVwiLFwiRm91cmllcnRyZlwiOlwi4oSxXCIsXCJmcGFydGludFwiOlwi4qiNXCIsXCJmcmFjMTJcIjpcIsK9XCIsXCJmcmFjMTNcIjpcIuKFk1wiLFwiZnJhYzE0XCI6XCLCvFwiLFwiZnJhYzE1XCI6XCLihZVcIixcImZyYWMxNlwiOlwi4oWZXCIsXCJmcmFjMThcIjpcIuKFm1wiLFwiZnJhYzIzXCI6XCLihZRcIixcImZyYWMyNVwiOlwi4oWWXCIsXCJmcmFjMzRcIjpcIsK+XCIsXCJmcmFjMzVcIjpcIuKFl1wiLFwiZnJhYzM4XCI6XCLihZxcIixcImZyYWM0NVwiOlwi4oWYXCIsXCJmcmFjNTZcIjpcIuKFmlwiLFwiZnJhYzU4XCI6XCLihZ1cIixcImZyYWM3OFwiOlwi4oWeXCIsXCJmcmFzbFwiOlwi4oGEXCIsXCJmcm93blwiOlwi4oyiXCIsXCJmc2NyXCI6XCLwnZK7XCIsXCJGc2NyXCI6XCLihLFcIixcImdhY3V0ZVwiOlwix7VcIixcIkdhbW1hXCI6XCLOk1wiLFwiZ2FtbWFcIjpcIs6zXCIsXCJHYW1tYWRcIjpcIs+cXCIsXCJnYW1tYWRcIjpcIs+dXCIsXCJnYXBcIjpcIuKqhlwiLFwiR2JyZXZlXCI6XCLEnlwiLFwiZ2JyZXZlXCI6XCLEn1wiLFwiR2NlZGlsXCI6XCLEolwiLFwiR2NpcmNcIjpcIsScXCIsXCJnY2lyY1wiOlwixJ1cIixcIkdjeVwiOlwi0JNcIixcImdjeVwiOlwi0LNcIixcIkdkb3RcIjpcIsSgXCIsXCJnZG90XCI6XCLEoVwiLFwiZ2VcIjpcIuKJpVwiLFwiZ0VcIjpcIuKJp1wiLFwiZ0VsXCI6XCLiqoxcIixcImdlbFwiOlwi4oubXCIsXCJnZXFcIjpcIuKJpVwiLFwiZ2VxcVwiOlwi4omnXCIsXCJnZXFzbGFudFwiOlwi4qm+XCIsXCJnZXNjY1wiOlwi4qqpXCIsXCJnZXNcIjpcIuKpvlwiLFwiZ2VzZG90XCI6XCLiqoBcIixcImdlc2RvdG9cIjpcIuKqglwiLFwiZ2VzZG90b2xcIjpcIuKqhFwiLFwiZ2VzbFwiOlwi4oub77iAXCIsXCJnZXNsZXNcIjpcIuKqlFwiLFwiR2ZyXCI6XCLwnZSKXCIsXCJnZnJcIjpcIvCdlKRcIixcImdnXCI6XCLiiatcIixcIkdnXCI6XCLii5lcIixcImdnZ1wiOlwi4ouZXCIsXCJnaW1lbFwiOlwi4oS3XCIsXCJHSmN5XCI6XCLQg1wiLFwiZ2pjeVwiOlwi0ZNcIixcImdsYVwiOlwi4qqlXCIsXCJnbFwiOlwi4om3XCIsXCJnbEVcIjpcIuKqklwiLFwiZ2xqXCI6XCLiqqRcIixcImduYXBcIjpcIuKqilwiLFwiZ25hcHByb3hcIjpcIuKqilwiLFwiZ25lXCI6XCLiqohcIixcImduRVwiOlwi4ompXCIsXCJnbmVxXCI6XCLiqohcIixcImduZXFxXCI6XCLiialcIixcImduc2ltXCI6XCLii6dcIixcIkdvcGZcIjpcIvCdlL5cIixcImdvcGZcIjpcIvCdlZhcIixcImdyYXZlXCI6XCJgXCIsXCJHcmVhdGVyRXF1YWxcIjpcIuKJpVwiLFwiR3JlYXRlckVxdWFsTGVzc1wiOlwi4oubXCIsXCJHcmVhdGVyRnVsbEVxdWFsXCI6XCLiiadcIixcIkdyZWF0ZXJHcmVhdGVyXCI6XCLiqqJcIixcIkdyZWF0ZXJMZXNzXCI6XCLiibdcIixcIkdyZWF0ZXJTbGFudEVxdWFsXCI6XCLiqb5cIixcIkdyZWF0ZXJUaWxkZVwiOlwi4omzXCIsXCJHc2NyXCI6XCLwnZKiXCIsXCJnc2NyXCI6XCLihIpcIixcImdzaW1cIjpcIuKJs1wiLFwiZ3NpbWVcIjpcIuKqjlwiLFwiZ3NpbWxcIjpcIuKqkFwiLFwiZ3RjY1wiOlwi4qqnXCIsXCJndGNpclwiOlwi4qm6XCIsXCJndFwiOlwiPlwiLFwiR1RcIjpcIj5cIixcIkd0XCI6XCLiiatcIixcImd0ZG90XCI6XCLii5dcIixcImd0bFBhclwiOlwi4qaVXCIsXCJndHF1ZXN0XCI6XCLiqbxcIixcImd0cmFwcHJveFwiOlwi4qqGXCIsXCJndHJhcnJcIjpcIuKluFwiLFwiZ3RyZG90XCI6XCLii5dcIixcImd0cmVxbGVzc1wiOlwi4oubXCIsXCJndHJlcXFsZXNzXCI6XCLiqoxcIixcImd0cmxlc3NcIjpcIuKJt1wiLFwiZ3Ryc2ltXCI6XCLiibNcIixcImd2ZXJ0bmVxcVwiOlwi4omp77iAXCIsXCJndm5FXCI6XCLiianvuIBcIixcIkhhY2VrXCI6XCLLh1wiLFwiaGFpcnNwXCI6XCLigIpcIixcImhhbGZcIjpcIsK9XCIsXCJoYW1pbHRcIjpcIuKEi1wiLFwiSEFSRGN5XCI6XCLQqlwiLFwiaGFyZGN5XCI6XCLRilwiLFwiaGFycmNpclwiOlwi4qWIXCIsXCJoYXJyXCI6XCLihpRcIixcImhBcnJcIjpcIuKHlFwiLFwiaGFycndcIjpcIuKGrVwiLFwiSGF0XCI6XCJeXCIsXCJoYmFyXCI6XCLihI9cIixcIkhjaXJjXCI6XCLEpFwiLFwiaGNpcmNcIjpcIsSlXCIsXCJoZWFydHNcIjpcIuKZpVwiLFwiaGVhcnRzdWl0XCI6XCLimaVcIixcImhlbGxpcFwiOlwi4oCmXCIsXCJoZXJjb25cIjpcIuKKuVwiLFwiaGZyXCI6XCLwnZSlXCIsXCJIZnJcIjpcIuKEjFwiLFwiSGlsYmVydFNwYWNlXCI6XCLihItcIixcImhrc2Vhcm93XCI6XCLipKVcIixcImhrc3dhcm93XCI6XCLipKZcIixcImhvYXJyXCI6XCLih79cIixcImhvbXRodFwiOlwi4oi7XCIsXCJob29rbGVmdGFycm93XCI6XCLihqlcIixcImhvb2tyaWdodGFycm93XCI6XCLihqpcIixcImhvcGZcIjpcIvCdlZlcIixcIkhvcGZcIjpcIuKEjVwiLFwiaG9yYmFyXCI6XCLigJVcIixcIkhvcml6b250YWxMaW5lXCI6XCLilIBcIixcImhzY3JcIjpcIvCdkr1cIixcIkhzY3JcIjpcIuKEi1wiLFwiaHNsYXNoXCI6XCLihI9cIixcIkhzdHJva1wiOlwixKZcIixcImhzdHJva1wiOlwixKdcIixcIkh1bXBEb3duSHVtcFwiOlwi4omOXCIsXCJIdW1wRXF1YWxcIjpcIuKJj1wiLFwiaHlidWxsXCI6XCLigYNcIixcImh5cGhlblwiOlwi4oCQXCIsXCJJYWN1dGVcIjpcIsONXCIsXCJpYWN1dGVcIjpcIsOtXCIsXCJpY1wiOlwi4oGjXCIsXCJJY2lyY1wiOlwiw45cIixcImljaXJjXCI6XCLDrlwiLFwiSWN5XCI6XCLQmFwiLFwiaWN5XCI6XCLQuFwiLFwiSWRvdFwiOlwixLBcIixcIklFY3lcIjpcItCVXCIsXCJpZWN5XCI6XCLQtVwiLFwiaWV4Y2xcIjpcIsKhXCIsXCJpZmZcIjpcIuKHlFwiLFwiaWZyXCI6XCLwnZSmXCIsXCJJZnJcIjpcIuKEkVwiLFwiSWdyYXZlXCI6XCLDjFwiLFwiaWdyYXZlXCI6XCLDrFwiLFwiaWlcIjpcIuKFiFwiLFwiaWlpaW50XCI6XCLiqIxcIixcImlpaW50XCI6XCLiiK1cIixcImlpbmZpblwiOlwi4qecXCIsXCJpaW90YVwiOlwi4oSpXCIsXCJJSmxpZ1wiOlwixLJcIixcImlqbGlnXCI6XCLEs1wiLFwiSW1hY3JcIjpcIsSqXCIsXCJpbWFjclwiOlwixKtcIixcImltYWdlXCI6XCLihJFcIixcIkltYWdpbmFyeUlcIjpcIuKFiFwiLFwiaW1hZ2xpbmVcIjpcIuKEkFwiLFwiaW1hZ3BhcnRcIjpcIuKEkVwiLFwiaW1hdGhcIjpcIsSxXCIsXCJJbVwiOlwi4oSRXCIsXCJpbW9mXCI6XCLiirdcIixcImltcGVkXCI6XCLGtVwiLFwiSW1wbGllc1wiOlwi4oeSXCIsXCJpbmNhcmVcIjpcIuKEhVwiLFwiaW5cIjpcIuKIiFwiLFwiaW5maW5cIjpcIuKInlwiLFwiaW5maW50aWVcIjpcIuKnnVwiLFwiaW5vZG90XCI6XCLEsVwiLFwiaW50Y2FsXCI6XCLiirpcIixcImludFwiOlwi4oirXCIsXCJJbnRcIjpcIuKIrFwiLFwiaW50ZWdlcnNcIjpcIuKEpFwiLFwiSW50ZWdyYWxcIjpcIuKIq1wiLFwiaW50ZXJjYWxcIjpcIuKKulwiLFwiSW50ZXJzZWN0aW9uXCI6XCLii4JcIixcImludGxhcmhrXCI6XCLiqJdcIixcImludHByb2RcIjpcIuKovFwiLFwiSW52aXNpYmxlQ29tbWFcIjpcIuKBo1wiLFwiSW52aXNpYmxlVGltZXNcIjpcIuKBolwiLFwiSU9jeVwiOlwi0IFcIixcImlvY3lcIjpcItGRXCIsXCJJb2dvblwiOlwixK5cIixcImlvZ29uXCI6XCLEr1wiLFwiSW9wZlwiOlwi8J2VgFwiLFwiaW9wZlwiOlwi8J2VmlwiLFwiSW90YVwiOlwizplcIixcImlvdGFcIjpcIs65XCIsXCJpcHJvZFwiOlwi4qi8XCIsXCJpcXVlc3RcIjpcIsK/XCIsXCJpc2NyXCI6XCLwnZK+XCIsXCJJc2NyXCI6XCLihJBcIixcImlzaW5cIjpcIuKIiFwiLFwiaXNpbmRvdFwiOlwi4ou1XCIsXCJpc2luRVwiOlwi4ou5XCIsXCJpc2luc1wiOlwi4ou0XCIsXCJpc2luc3ZcIjpcIuKLs1wiLFwiaXNpbnZcIjpcIuKIiFwiLFwiaXRcIjpcIuKBolwiLFwiSXRpbGRlXCI6XCLEqFwiLFwiaXRpbGRlXCI6XCLEqVwiLFwiSXVrY3lcIjpcItCGXCIsXCJpdWtjeVwiOlwi0ZZcIixcIkl1bWxcIjpcIsOPXCIsXCJpdW1sXCI6XCLDr1wiLFwiSmNpcmNcIjpcIsS0XCIsXCJqY2lyY1wiOlwixLVcIixcIkpjeVwiOlwi0JlcIixcImpjeVwiOlwi0LlcIixcIkpmclwiOlwi8J2UjVwiLFwiamZyXCI6XCLwnZSnXCIsXCJqbWF0aFwiOlwiyLdcIixcIkpvcGZcIjpcIvCdlYFcIixcImpvcGZcIjpcIvCdlZtcIixcIkpzY3JcIjpcIvCdkqVcIixcImpzY3JcIjpcIvCdkr9cIixcIkpzZXJjeVwiOlwi0IhcIixcImpzZXJjeVwiOlwi0ZhcIixcIkp1a2N5XCI6XCLQhFwiLFwianVrY3lcIjpcItGUXCIsXCJLYXBwYVwiOlwizppcIixcImthcHBhXCI6XCLOulwiLFwia2FwcGF2XCI6XCLPsFwiLFwiS2NlZGlsXCI6XCLEtlwiLFwia2NlZGlsXCI6XCLEt1wiLFwiS2N5XCI6XCLQmlwiLFwia2N5XCI6XCLQulwiLFwiS2ZyXCI6XCLwnZSOXCIsXCJrZnJcIjpcIvCdlKhcIixcImtncmVlblwiOlwixLhcIixcIktIY3lcIjpcItClXCIsXCJraGN5XCI6XCLRhVwiLFwiS0pjeVwiOlwi0IxcIixcImtqY3lcIjpcItGcXCIsXCJLb3BmXCI6XCLwnZWCXCIsXCJrb3BmXCI6XCLwnZWcXCIsXCJLc2NyXCI6XCLwnZKmXCIsXCJrc2NyXCI6XCLwnZOAXCIsXCJsQWFyclwiOlwi4oeaXCIsXCJMYWN1dGVcIjpcIsS5XCIsXCJsYWN1dGVcIjpcIsS6XCIsXCJsYWVtcHR5dlwiOlwi4qa0XCIsXCJsYWdyYW5cIjpcIuKEklwiLFwiTGFtYmRhXCI6XCLOm1wiLFwibGFtYmRhXCI6XCLOu1wiLFwibGFuZ1wiOlwi4p+oXCIsXCJMYW5nXCI6XCLin6pcIixcImxhbmdkXCI6XCLippFcIixcImxhbmdsZVwiOlwi4p+oXCIsXCJsYXBcIjpcIuKqhVwiLFwiTGFwbGFjZXRyZlwiOlwi4oSSXCIsXCJsYXF1b1wiOlwiwqtcIixcImxhcnJiXCI6XCLih6RcIixcImxhcnJiZnNcIjpcIuKkn1wiLFwibGFyclwiOlwi4oaQXCIsXCJMYXJyXCI6XCLihp5cIixcImxBcnJcIjpcIuKHkFwiLFwibGFycmZzXCI6XCLipJ1cIixcImxhcnJoa1wiOlwi4oapXCIsXCJsYXJybHBcIjpcIuKGq1wiLFwibGFycnBsXCI6XCLipLlcIixcImxhcnJzaW1cIjpcIuKls1wiLFwibGFycnRsXCI6XCLihqJcIixcImxhdGFpbFwiOlwi4qSZXCIsXCJsQXRhaWxcIjpcIuKkm1wiLFwibGF0XCI6XCLiqqtcIixcImxhdGVcIjpcIuKqrVwiLFwibGF0ZXNcIjpcIuKqre+4gFwiLFwibGJhcnJcIjpcIuKkjFwiLFwibEJhcnJcIjpcIuKkjlwiLFwibGJicmtcIjpcIuKdslwiLFwibGJyYWNlXCI6XCJ7XCIsXCJsYnJhY2tcIjpcIltcIixcImxicmtlXCI6XCLipotcIixcImxicmtzbGRcIjpcIuKmj1wiLFwibGJya3NsdVwiOlwi4qaNXCIsXCJMY2Fyb25cIjpcIsS9XCIsXCJsY2Fyb25cIjpcIsS+XCIsXCJMY2VkaWxcIjpcIsS7XCIsXCJsY2VkaWxcIjpcIsS8XCIsXCJsY2VpbFwiOlwi4oyIXCIsXCJsY3ViXCI6XCJ7XCIsXCJMY3lcIjpcItCbXCIsXCJsY3lcIjpcItC7XCIsXCJsZGNhXCI6XCLipLZcIixcImxkcXVvXCI6XCLigJxcIixcImxkcXVvclwiOlwi4oCeXCIsXCJsZHJkaGFyXCI6XCLipadcIixcImxkcnVzaGFyXCI6XCLipYtcIixcImxkc2hcIjpcIuKGslwiLFwibGVcIjpcIuKJpFwiLFwibEVcIjpcIuKJplwiLFwiTGVmdEFuZ2xlQnJhY2tldFwiOlwi4p+oXCIsXCJMZWZ0QXJyb3dCYXJcIjpcIuKHpFwiLFwibGVmdGFycm93XCI6XCLihpBcIixcIkxlZnRBcnJvd1wiOlwi4oaQXCIsXCJMZWZ0YXJyb3dcIjpcIuKHkFwiLFwiTGVmdEFycm93UmlnaHRBcnJvd1wiOlwi4oeGXCIsXCJsZWZ0YXJyb3d0YWlsXCI6XCLihqJcIixcIkxlZnRDZWlsaW5nXCI6XCLijIhcIixcIkxlZnREb3VibGVCcmFja2V0XCI6XCLin6ZcIixcIkxlZnREb3duVGVlVmVjdG9yXCI6XCLipaFcIixcIkxlZnREb3duVmVjdG9yQmFyXCI6XCLipZlcIixcIkxlZnREb3duVmVjdG9yXCI6XCLih4NcIixcIkxlZnRGbG9vclwiOlwi4oyKXCIsXCJsZWZ0aGFycG9vbmRvd25cIjpcIuKGvVwiLFwibGVmdGhhcnBvb251cFwiOlwi4oa8XCIsXCJsZWZ0bGVmdGFycm93c1wiOlwi4oeHXCIsXCJsZWZ0cmlnaHRhcnJvd1wiOlwi4oaUXCIsXCJMZWZ0UmlnaHRBcnJvd1wiOlwi4oaUXCIsXCJMZWZ0cmlnaHRhcnJvd1wiOlwi4oeUXCIsXCJsZWZ0cmlnaHRhcnJvd3NcIjpcIuKHhlwiLFwibGVmdHJpZ2h0aGFycG9vbnNcIjpcIuKHi1wiLFwibGVmdHJpZ2h0c3F1aWdhcnJvd1wiOlwi4oatXCIsXCJMZWZ0UmlnaHRWZWN0b3JcIjpcIuKljlwiLFwiTGVmdFRlZUFycm93XCI6XCLihqRcIixcIkxlZnRUZWVcIjpcIuKKo1wiLFwiTGVmdFRlZVZlY3RvclwiOlwi4qWaXCIsXCJsZWZ0dGhyZWV0aW1lc1wiOlwi4ouLXCIsXCJMZWZ0VHJpYW5nbGVCYXJcIjpcIuKnj1wiLFwiTGVmdFRyaWFuZ2xlXCI6XCLiirJcIixcIkxlZnRUcmlhbmdsZUVxdWFsXCI6XCLiirRcIixcIkxlZnRVcERvd25WZWN0b3JcIjpcIuKlkVwiLFwiTGVmdFVwVGVlVmVjdG9yXCI6XCLipaBcIixcIkxlZnRVcFZlY3RvckJhclwiOlwi4qWYXCIsXCJMZWZ0VXBWZWN0b3JcIjpcIuKGv1wiLFwiTGVmdFZlY3RvckJhclwiOlwi4qWSXCIsXCJMZWZ0VmVjdG9yXCI6XCLihrxcIixcImxFZ1wiOlwi4qqLXCIsXCJsZWdcIjpcIuKLmlwiLFwibGVxXCI6XCLiiaRcIixcImxlcXFcIjpcIuKJplwiLFwibGVxc2xhbnRcIjpcIuKpvVwiLFwibGVzY2NcIjpcIuKqqFwiLFwibGVzXCI6XCLiqb1cIixcImxlc2RvdFwiOlwi4qm/XCIsXCJsZXNkb3RvXCI6XCLiqoFcIixcImxlc2RvdG9yXCI6XCLiqoNcIixcImxlc2dcIjpcIuKLmu+4gFwiLFwibGVzZ2VzXCI6XCLiqpNcIixcImxlc3NhcHByb3hcIjpcIuKqhVwiLFwibGVzc2RvdFwiOlwi4ouWXCIsXCJsZXNzZXFndHJcIjpcIuKLmlwiLFwibGVzc2VxcWd0clwiOlwi4qqLXCIsXCJMZXNzRXF1YWxHcmVhdGVyXCI6XCLii5pcIixcIkxlc3NGdWxsRXF1YWxcIjpcIuKJplwiLFwiTGVzc0dyZWF0ZXJcIjpcIuKJtlwiLFwibGVzc2d0clwiOlwi4om2XCIsXCJMZXNzTGVzc1wiOlwi4qqhXCIsXCJsZXNzc2ltXCI6XCLiibJcIixcIkxlc3NTbGFudEVxdWFsXCI6XCLiqb1cIixcIkxlc3NUaWxkZVwiOlwi4omyXCIsXCJsZmlzaHRcIjpcIuKlvFwiLFwibGZsb29yXCI6XCLijIpcIixcIkxmclwiOlwi8J2Uj1wiLFwibGZyXCI6XCLwnZSpXCIsXCJsZ1wiOlwi4om2XCIsXCJsZ0VcIjpcIuKqkVwiLFwibEhhclwiOlwi4qWiXCIsXCJsaGFyZFwiOlwi4oa9XCIsXCJsaGFydVwiOlwi4oa8XCIsXCJsaGFydWxcIjpcIuKlqlwiLFwibGhibGtcIjpcIuKWhFwiLFwiTEpjeVwiOlwi0IlcIixcImxqY3lcIjpcItGZXCIsXCJsbGFyclwiOlwi4oeHXCIsXCJsbFwiOlwi4omqXCIsXCJMbFwiOlwi4ouYXCIsXCJsbGNvcm5lclwiOlwi4oyeXCIsXCJMbGVmdGFycm93XCI6XCLih5pcIixcImxsaGFyZFwiOlwi4qWrXCIsXCJsbHRyaVwiOlwi4pe6XCIsXCJMbWlkb3RcIjpcIsS/XCIsXCJsbWlkb3RcIjpcIsWAXCIsXCJsbW91c3RhY2hlXCI6XCLijrBcIixcImxtb3VzdFwiOlwi4o6wXCIsXCJsbmFwXCI6XCLiqolcIixcImxuYXBwcm94XCI6XCLiqolcIixcImxuZVwiOlwi4qqHXCIsXCJsbkVcIjpcIuKJqFwiLFwibG5lcVwiOlwi4qqHXCIsXCJsbmVxcVwiOlwi4omoXCIsXCJsbnNpbVwiOlwi4oumXCIsXCJsb2FuZ1wiOlwi4p+sXCIsXCJsb2FyclwiOlwi4oe9XCIsXCJsb2Jya1wiOlwi4p+mXCIsXCJsb25nbGVmdGFycm93XCI6XCLin7VcIixcIkxvbmdMZWZ0QXJyb3dcIjpcIuKftVwiLFwiTG9uZ2xlZnRhcnJvd1wiOlwi4p+4XCIsXCJsb25nbGVmdHJpZ2h0YXJyb3dcIjpcIuKft1wiLFwiTG9uZ0xlZnRSaWdodEFycm93XCI6XCLin7dcIixcIkxvbmdsZWZ0cmlnaHRhcnJvd1wiOlwi4p+6XCIsXCJsb25nbWFwc3RvXCI6XCLin7xcIixcImxvbmdyaWdodGFycm93XCI6XCLin7ZcIixcIkxvbmdSaWdodEFycm93XCI6XCLin7ZcIixcIkxvbmdyaWdodGFycm93XCI6XCLin7lcIixcImxvb3BhcnJvd2xlZnRcIjpcIuKGq1wiLFwibG9vcGFycm93cmlnaHRcIjpcIuKGrFwiLFwibG9wYXJcIjpcIuKmhVwiLFwiTG9wZlwiOlwi8J2Vg1wiLFwibG9wZlwiOlwi8J2VnVwiLFwibG9wbHVzXCI6XCLiqK1cIixcImxvdGltZXNcIjpcIuKotFwiLFwibG93YXN0XCI6XCLiiJdcIixcImxvd2JhclwiOlwiX1wiLFwiTG93ZXJMZWZ0QXJyb3dcIjpcIuKGmVwiLFwiTG93ZXJSaWdodEFycm93XCI6XCLihphcIixcImxvelwiOlwi4peKXCIsXCJsb3plbmdlXCI6XCLil4pcIixcImxvemZcIjpcIuKnq1wiLFwibHBhclwiOlwiKFwiLFwibHBhcmx0XCI6XCLippNcIixcImxyYXJyXCI6XCLih4ZcIixcImxyY29ybmVyXCI6XCLijJ9cIixcImxyaGFyXCI6XCLih4tcIixcImxyaGFyZFwiOlwi4qWtXCIsXCJscm1cIjpcIuKAjlwiLFwibHJ0cmlcIjpcIuKKv1wiLFwibHNhcXVvXCI6XCLigLlcIixcImxzY3JcIjpcIvCdk4FcIixcIkxzY3JcIjpcIuKEklwiLFwibHNoXCI6XCLihrBcIixcIkxzaFwiOlwi4oawXCIsXCJsc2ltXCI6XCLiibJcIixcImxzaW1lXCI6XCLiqo1cIixcImxzaW1nXCI6XCLiqo9cIixcImxzcWJcIjpcIltcIixcImxzcXVvXCI6XCLigJhcIixcImxzcXVvclwiOlwi4oCaXCIsXCJMc3Ryb2tcIjpcIsWBXCIsXCJsc3Ryb2tcIjpcIsWCXCIsXCJsdGNjXCI6XCLiqqZcIixcImx0Y2lyXCI6XCLiqblcIixcImx0XCI6XCI8XCIsXCJMVFwiOlwiPFwiLFwiTHRcIjpcIuKJqlwiLFwibHRkb3RcIjpcIuKLllwiLFwibHRocmVlXCI6XCLii4tcIixcImx0aW1lc1wiOlwi4ouJXCIsXCJsdGxhcnJcIjpcIuKltlwiLFwibHRxdWVzdFwiOlwi4qm7XCIsXCJsdHJpXCI6XCLil4NcIixcImx0cmllXCI6XCLiirRcIixcImx0cmlmXCI6XCLil4JcIixcImx0clBhclwiOlwi4qaWXCIsXCJsdXJkc2hhclwiOlwi4qWKXCIsXCJsdXJ1aGFyXCI6XCLipaZcIixcImx2ZXJ0bmVxcVwiOlwi4omo77iAXCIsXCJsdm5FXCI6XCLiiajvuIBcIixcIm1hY3JcIjpcIsKvXCIsXCJtYWxlXCI6XCLimYJcIixcIm1hbHRcIjpcIuKcoFwiLFwibWFsdGVzZVwiOlwi4pygXCIsXCJNYXBcIjpcIuKkhVwiLFwibWFwXCI6XCLihqZcIixcIm1hcHN0b1wiOlwi4oamXCIsXCJtYXBzdG9kb3duXCI6XCLihqdcIixcIm1hcHN0b2xlZnRcIjpcIuKGpFwiLFwibWFwc3RvdXBcIjpcIuKGpVwiLFwibWFya2VyXCI6XCLilq5cIixcIm1jb21tYVwiOlwi4qipXCIsXCJNY3lcIjpcItCcXCIsXCJtY3lcIjpcItC8XCIsXCJtZGFzaFwiOlwi4oCUXCIsXCJtRERvdFwiOlwi4oi6XCIsXCJtZWFzdXJlZGFuZ2xlXCI6XCLiiKFcIixcIk1lZGl1bVNwYWNlXCI6XCLigZ9cIixcIk1lbGxpbnRyZlwiOlwi4oSzXCIsXCJNZnJcIjpcIvCdlJBcIixcIm1mclwiOlwi8J2UqlwiLFwibWhvXCI6XCLihKdcIixcIm1pY3JvXCI6XCLCtVwiLFwibWlkYXN0XCI6XCIqXCIsXCJtaWRjaXJcIjpcIuKrsFwiLFwibWlkXCI6XCLiiKNcIixcIm1pZGRvdFwiOlwiwrdcIixcIm1pbnVzYlwiOlwi4oqfXCIsXCJtaW51c1wiOlwi4oiSXCIsXCJtaW51c2RcIjpcIuKIuFwiLFwibWludXNkdVwiOlwi4qiqXCIsXCJNaW51c1BsdXNcIjpcIuKIk1wiLFwibWxjcFwiOlwi4qubXCIsXCJtbGRyXCI6XCLigKZcIixcIm1ucGx1c1wiOlwi4oiTXCIsXCJtb2RlbHNcIjpcIuKKp1wiLFwiTW9wZlwiOlwi8J2VhFwiLFwibW9wZlwiOlwi8J2VnlwiLFwibXBcIjpcIuKIk1wiLFwibXNjclwiOlwi8J2TglwiLFwiTXNjclwiOlwi4oSzXCIsXCJtc3Rwb3NcIjpcIuKIvlwiLFwiTXVcIjpcIs6cXCIsXCJtdVwiOlwizrxcIixcIm11bHRpbWFwXCI6XCLiirhcIixcIm11bWFwXCI6XCLiirhcIixcIm5hYmxhXCI6XCLiiIdcIixcIk5hY3V0ZVwiOlwixYNcIixcIm5hY3V0ZVwiOlwixYRcIixcIm5hbmdcIjpcIuKIoOKDklwiLFwibmFwXCI6XCLiiYlcIixcIm5hcEVcIjpcIuKpsMy4XCIsXCJuYXBpZFwiOlwi4omLzLhcIixcIm5hcG9zXCI6XCLFiVwiLFwibmFwcHJveFwiOlwi4omJXCIsXCJuYXR1cmFsXCI6XCLima5cIixcIm5hdHVyYWxzXCI6XCLihJVcIixcIm5hdHVyXCI6XCLima5cIixcIm5ic3BcIjpcIsKgXCIsXCJuYnVtcFwiOlwi4omOzLhcIixcIm5idW1wZVwiOlwi4omPzLhcIixcIm5jYXBcIjpcIuKpg1wiLFwiTmNhcm9uXCI6XCLFh1wiLFwibmNhcm9uXCI6XCLFiFwiLFwiTmNlZGlsXCI6XCLFhVwiLFwibmNlZGlsXCI6XCLFhlwiLFwibmNvbmdcIjpcIuKJh1wiLFwibmNvbmdkb3RcIjpcIuKprcy4XCIsXCJuY3VwXCI6XCLiqYJcIixcIk5jeVwiOlwi0J1cIixcIm5jeVwiOlwi0L1cIixcIm5kYXNoXCI6XCLigJNcIixcIm5lYXJoa1wiOlwi4qSkXCIsXCJuZWFyclwiOlwi4oaXXCIsXCJuZUFyclwiOlwi4oeXXCIsXCJuZWFycm93XCI6XCLihpdcIixcIm5lXCI6XCLiiaBcIixcIm5lZG90XCI6XCLiiZDMuFwiLFwiTmVnYXRpdmVNZWRpdW1TcGFjZVwiOlwi4oCLXCIsXCJOZWdhdGl2ZVRoaWNrU3BhY2VcIjpcIuKAi1wiLFwiTmVnYXRpdmVUaGluU3BhY2VcIjpcIuKAi1wiLFwiTmVnYXRpdmVWZXJ5VGhpblNwYWNlXCI6XCLigItcIixcIm5lcXVpdlwiOlwi4omiXCIsXCJuZXNlYXJcIjpcIuKkqFwiLFwibmVzaW1cIjpcIuKJgsy4XCIsXCJOZXN0ZWRHcmVhdGVyR3JlYXRlclwiOlwi4omrXCIsXCJOZXN0ZWRMZXNzTGVzc1wiOlwi4omqXCIsXCJOZXdMaW5lXCI6XCJcXG5cIixcIm5leGlzdFwiOlwi4oiEXCIsXCJuZXhpc3RzXCI6XCLiiIRcIixcIk5mclwiOlwi8J2UkVwiLFwibmZyXCI6XCLwnZSrXCIsXCJuZ0VcIjpcIuKJp8y4XCIsXCJuZ2VcIjpcIuKJsVwiLFwibmdlcVwiOlwi4omxXCIsXCJuZ2VxcVwiOlwi4omnzLhcIixcIm5nZXFzbGFudFwiOlwi4qm+zLhcIixcIm5nZXNcIjpcIuKpvsy4XCIsXCJuR2dcIjpcIuKLmcy4XCIsXCJuZ3NpbVwiOlwi4om1XCIsXCJuR3RcIjpcIuKJq+KDklwiLFwibmd0XCI6XCLiia9cIixcIm5ndHJcIjpcIuKJr1wiLFwibkd0dlwiOlwi4omrzLhcIixcIm5oYXJyXCI6XCLihq5cIixcIm5oQXJyXCI6XCLih45cIixcIm5ocGFyXCI6XCLiq7JcIixcIm5pXCI6XCLiiItcIixcIm5pc1wiOlwi4ou8XCIsXCJuaXNkXCI6XCLii7pcIixcIm5pdlwiOlwi4oiLXCIsXCJOSmN5XCI6XCLQilwiLFwibmpjeVwiOlwi0ZpcIixcIm5sYXJyXCI6XCLihppcIixcIm5sQXJyXCI6XCLih41cIixcIm5sZHJcIjpcIuKApVwiLFwibmxFXCI6XCLiiabMuFwiLFwibmxlXCI6XCLiibBcIixcIm5sZWZ0YXJyb3dcIjpcIuKGmlwiLFwibkxlZnRhcnJvd1wiOlwi4oeNXCIsXCJubGVmdHJpZ2h0YXJyb3dcIjpcIuKGrlwiLFwibkxlZnRyaWdodGFycm93XCI6XCLih45cIixcIm5sZXFcIjpcIuKJsFwiLFwibmxlcXFcIjpcIuKJpsy4XCIsXCJubGVxc2xhbnRcIjpcIuKpvcy4XCIsXCJubGVzXCI6XCLiqb3MuFwiLFwibmxlc3NcIjpcIuKJrlwiLFwibkxsXCI6XCLii5jMuFwiLFwibmxzaW1cIjpcIuKJtFwiLFwibkx0XCI6XCLiiarig5JcIixcIm5sdFwiOlwi4omuXCIsXCJubHRyaVwiOlwi4ouqXCIsXCJubHRyaWVcIjpcIuKLrFwiLFwibkx0dlwiOlwi4omqzLhcIixcIm5taWRcIjpcIuKIpFwiLFwiTm9CcmVha1wiOlwi4oGgXCIsXCJOb25CcmVha2luZ1NwYWNlXCI6XCLCoFwiLFwibm9wZlwiOlwi8J2Vn1wiLFwiTm9wZlwiOlwi4oSVXCIsXCJOb3RcIjpcIuKrrFwiLFwibm90XCI6XCLCrFwiLFwiTm90Q29uZ3J1ZW50XCI6XCLiiaJcIixcIk5vdEN1cENhcFwiOlwi4omtXCIsXCJOb3REb3VibGVWZXJ0aWNhbEJhclwiOlwi4oimXCIsXCJOb3RFbGVtZW50XCI6XCLiiIlcIixcIk5vdEVxdWFsXCI6XCLiiaBcIixcIk5vdEVxdWFsVGlsZGVcIjpcIuKJgsy4XCIsXCJOb3RFeGlzdHNcIjpcIuKIhFwiLFwiTm90R3JlYXRlclwiOlwi4omvXCIsXCJOb3RHcmVhdGVyRXF1YWxcIjpcIuKJsVwiLFwiTm90R3JlYXRlckZ1bGxFcXVhbFwiOlwi4omnzLhcIixcIk5vdEdyZWF0ZXJHcmVhdGVyXCI6XCLiiavMuFwiLFwiTm90R3JlYXRlckxlc3NcIjpcIuKJuVwiLFwiTm90R3JlYXRlclNsYW50RXF1YWxcIjpcIuKpvsy4XCIsXCJOb3RHcmVhdGVyVGlsZGVcIjpcIuKJtVwiLFwiTm90SHVtcERvd25IdW1wXCI6XCLiiY7MuFwiLFwiTm90SHVtcEVxdWFsXCI6XCLiiY/MuFwiLFwibm90aW5cIjpcIuKIiVwiLFwibm90aW5kb3RcIjpcIuKLtcy4XCIsXCJub3RpbkVcIjpcIuKLucy4XCIsXCJub3RpbnZhXCI6XCLiiIlcIixcIm5vdGludmJcIjpcIuKLt1wiLFwibm90aW52Y1wiOlwi4ou2XCIsXCJOb3RMZWZ0VHJpYW5nbGVCYXJcIjpcIuKnj8y4XCIsXCJOb3RMZWZ0VHJpYW5nbGVcIjpcIuKLqlwiLFwiTm90TGVmdFRyaWFuZ2xlRXF1YWxcIjpcIuKLrFwiLFwiTm90TGVzc1wiOlwi4omuXCIsXCJOb3RMZXNzRXF1YWxcIjpcIuKJsFwiLFwiTm90TGVzc0dyZWF0ZXJcIjpcIuKJuFwiLFwiTm90TGVzc0xlc3NcIjpcIuKJqsy4XCIsXCJOb3RMZXNzU2xhbnRFcXVhbFwiOlwi4qm9zLhcIixcIk5vdExlc3NUaWxkZVwiOlwi4om0XCIsXCJOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlclwiOlwi4qqizLhcIixcIk5vdE5lc3RlZExlc3NMZXNzXCI6XCLiqqHMuFwiLFwibm90bmlcIjpcIuKIjFwiLFwibm90bml2YVwiOlwi4oiMXCIsXCJub3RuaXZiXCI6XCLii75cIixcIm5vdG5pdmNcIjpcIuKLvVwiLFwiTm90UHJlY2VkZXNcIjpcIuKKgFwiLFwiTm90UHJlY2VkZXNFcXVhbFwiOlwi4qqvzLhcIixcIk5vdFByZWNlZGVzU2xhbnRFcXVhbFwiOlwi4ougXCIsXCJOb3RSZXZlcnNlRWxlbWVudFwiOlwi4oiMXCIsXCJOb3RSaWdodFRyaWFuZ2xlQmFyXCI6XCLip5DMuFwiLFwiTm90UmlnaHRUcmlhbmdsZVwiOlwi4ourXCIsXCJOb3RSaWdodFRyaWFuZ2xlRXF1YWxcIjpcIuKLrVwiLFwiTm90U3F1YXJlU3Vic2V0XCI6XCLiio/MuFwiLFwiTm90U3F1YXJlU3Vic2V0RXF1YWxcIjpcIuKLolwiLFwiTm90U3F1YXJlU3VwZXJzZXRcIjpcIuKKkMy4XCIsXCJOb3RTcXVhcmVTdXBlcnNldEVxdWFsXCI6XCLii6NcIixcIk5vdFN1YnNldFwiOlwi4oqC4oOSXCIsXCJOb3RTdWJzZXRFcXVhbFwiOlwi4oqIXCIsXCJOb3RTdWNjZWVkc1wiOlwi4oqBXCIsXCJOb3RTdWNjZWVkc0VxdWFsXCI6XCLiqrDMuFwiLFwiTm90U3VjY2VlZHNTbGFudEVxdWFsXCI6XCLii6FcIixcIk5vdFN1Y2NlZWRzVGlsZGVcIjpcIuKJv8y4XCIsXCJOb3RTdXBlcnNldFwiOlwi4oqD4oOSXCIsXCJOb3RTdXBlcnNldEVxdWFsXCI6XCLiiolcIixcIk5vdFRpbGRlXCI6XCLiiYFcIixcIk5vdFRpbGRlRXF1YWxcIjpcIuKJhFwiLFwiTm90VGlsZGVGdWxsRXF1YWxcIjpcIuKJh1wiLFwiTm90VGlsZGVUaWxkZVwiOlwi4omJXCIsXCJOb3RWZXJ0aWNhbEJhclwiOlwi4oikXCIsXCJucGFyYWxsZWxcIjpcIuKIplwiLFwibnBhclwiOlwi4oimXCIsXCJucGFyc2xcIjpcIuKrveKDpVwiLFwibnBhcnRcIjpcIuKIgsy4XCIsXCJucG9saW50XCI6XCLiqJRcIixcIm5wclwiOlwi4oqAXCIsXCJucHJjdWVcIjpcIuKLoFwiLFwibnByZWNcIjpcIuKKgFwiLFwibnByZWNlcVwiOlwi4qqvzLhcIixcIm5wcmVcIjpcIuKqr8y4XCIsXCJucmFycmNcIjpcIuKks8y4XCIsXCJucmFyclwiOlwi4oabXCIsXCJuckFyclwiOlwi4oePXCIsXCJucmFycndcIjpcIuKGncy4XCIsXCJucmlnaHRhcnJvd1wiOlwi4oabXCIsXCJuUmlnaHRhcnJvd1wiOlwi4oePXCIsXCJucnRyaVwiOlwi4ourXCIsXCJucnRyaWVcIjpcIuKLrVwiLFwibnNjXCI6XCLiioFcIixcIm5zY2N1ZVwiOlwi4ouhXCIsXCJuc2NlXCI6XCLiqrDMuFwiLFwiTnNjclwiOlwi8J2SqVwiLFwibnNjclwiOlwi8J2Tg1wiLFwibnNob3J0bWlkXCI6XCLiiKRcIixcIm5zaG9ydHBhcmFsbGVsXCI6XCLiiKZcIixcIm5zaW1cIjpcIuKJgVwiLFwibnNpbWVcIjpcIuKJhFwiLFwibnNpbWVxXCI6XCLiiYRcIixcIm5zbWlkXCI6XCLiiKRcIixcIm5zcGFyXCI6XCLiiKZcIixcIm5zcXN1YmVcIjpcIuKLolwiLFwibnNxc3VwZVwiOlwi4oujXCIsXCJuc3ViXCI6XCLiioRcIixcIm5zdWJFXCI6XCLiq4XMuFwiLFwibnN1YmVcIjpcIuKKiFwiLFwibnN1YnNldFwiOlwi4oqC4oOSXCIsXCJuc3Vic2V0ZXFcIjpcIuKKiFwiLFwibnN1YnNldGVxcVwiOlwi4quFzLhcIixcIm5zdWNjXCI6XCLiioFcIixcIm5zdWNjZXFcIjpcIuKqsMy4XCIsXCJuc3VwXCI6XCLiioVcIixcIm5zdXBFXCI6XCLiq4bMuFwiLFwibnN1cGVcIjpcIuKKiVwiLFwibnN1cHNldFwiOlwi4oqD4oOSXCIsXCJuc3Vwc2V0ZXFcIjpcIuKKiVwiLFwibnN1cHNldGVxcVwiOlwi4quGzLhcIixcIm50Z2xcIjpcIuKJuVwiLFwiTnRpbGRlXCI6XCLDkVwiLFwibnRpbGRlXCI6XCLDsVwiLFwibnRsZ1wiOlwi4om4XCIsXCJudHJpYW5nbGVsZWZ0XCI6XCLii6pcIixcIm50cmlhbmdsZWxlZnRlcVwiOlwi4ousXCIsXCJudHJpYW5nbGVyaWdodFwiOlwi4ourXCIsXCJudHJpYW5nbGVyaWdodGVxXCI6XCLii61cIixcIk51XCI6XCLOnVwiLFwibnVcIjpcIs69XCIsXCJudW1cIjpcIiNcIixcIm51bWVyb1wiOlwi4oSWXCIsXCJudW1zcFwiOlwi4oCHXCIsXCJudmFwXCI6XCLiiY3ig5JcIixcIm52ZGFzaFwiOlwi4oqsXCIsXCJudkRhc2hcIjpcIuKKrVwiLFwiblZkYXNoXCI6XCLiiq5cIixcIm5WRGFzaFwiOlwi4oqvXCIsXCJudmdlXCI6XCLiiaXig5JcIixcIm52Z3RcIjpcIj7ig5JcIixcIm52SGFyclwiOlwi4qSEXCIsXCJudmluZmluXCI6XCLip55cIixcIm52bEFyclwiOlwi4qSCXCIsXCJudmxlXCI6XCLiiaTig5JcIixcIm52bHRcIjpcIjzig5JcIixcIm52bHRyaWVcIjpcIuKKtOKDklwiLFwibnZyQXJyXCI6XCLipINcIixcIm52cnRyaWVcIjpcIuKKteKDklwiLFwibnZzaW1cIjpcIuKIvOKDklwiLFwibndhcmhrXCI6XCLipKNcIixcIm53YXJyXCI6XCLihpZcIixcIm53QXJyXCI6XCLih5ZcIixcIm53YXJyb3dcIjpcIuKGllwiLFwibnduZWFyXCI6XCLipKdcIixcIk9hY3V0ZVwiOlwiw5NcIixcIm9hY3V0ZVwiOlwiw7NcIixcIm9hc3RcIjpcIuKKm1wiLFwiT2NpcmNcIjpcIsOUXCIsXCJvY2lyY1wiOlwiw7RcIixcIm9jaXJcIjpcIuKKmlwiLFwiT2N5XCI6XCLQnlwiLFwib2N5XCI6XCLQvlwiLFwib2Rhc2hcIjpcIuKKnVwiLFwiT2RibGFjXCI6XCLFkFwiLFwib2RibGFjXCI6XCLFkVwiLFwib2RpdlwiOlwi4qi4XCIsXCJvZG90XCI6XCLiiplcIixcIm9kc29sZFwiOlwi4qa8XCIsXCJPRWxpZ1wiOlwixZJcIixcIm9lbGlnXCI6XCLFk1wiLFwib2ZjaXJcIjpcIuKmv1wiLFwiT2ZyXCI6XCLwnZSSXCIsXCJvZnJcIjpcIvCdlKxcIixcIm9nb25cIjpcIsubXCIsXCJPZ3JhdmVcIjpcIsOSXCIsXCJvZ3JhdmVcIjpcIsOyXCIsXCJvZ3RcIjpcIuKngVwiLFwib2hiYXJcIjpcIuKmtVwiLFwib2htXCI6XCLOqVwiLFwib2ludFwiOlwi4oiuXCIsXCJvbGFyclwiOlwi4oa6XCIsXCJvbGNpclwiOlwi4qa+XCIsXCJvbGNyb3NzXCI6XCLiprtcIixcIm9saW5lXCI6XCLigL5cIixcIm9sdFwiOlwi4qeAXCIsXCJPbWFjclwiOlwixYxcIixcIm9tYWNyXCI6XCLFjVwiLFwiT21lZ2FcIjpcIs6pXCIsXCJvbWVnYVwiOlwiz4lcIixcIk9taWNyb25cIjpcIs6fXCIsXCJvbWljcm9uXCI6XCLOv1wiLFwib21pZFwiOlwi4qa2XCIsXCJvbWludXNcIjpcIuKKllwiLFwiT29wZlwiOlwi8J2VhlwiLFwib29wZlwiOlwi8J2VoFwiLFwib3BhclwiOlwi4qa3XCIsXCJPcGVuQ3VybHlEb3VibGVRdW90ZVwiOlwi4oCcXCIsXCJPcGVuQ3VybHlRdW90ZVwiOlwi4oCYXCIsXCJvcGVycFwiOlwi4qa5XCIsXCJvcGx1c1wiOlwi4oqVXCIsXCJvcmFyclwiOlwi4oa7XCIsXCJPclwiOlwi4qmUXCIsXCJvclwiOlwi4oioXCIsXCJvcmRcIjpcIuKpnVwiLFwib3JkZXJcIjpcIuKEtFwiLFwib3JkZXJvZlwiOlwi4oS0XCIsXCJvcmRmXCI6XCLCqlwiLFwib3JkbVwiOlwiwrpcIixcIm9yaWdvZlwiOlwi4oq2XCIsXCJvcm9yXCI6XCLiqZZcIixcIm9yc2xvcGVcIjpcIuKpl1wiLFwib3J2XCI6XCLiqZtcIixcIm9TXCI6XCLik4hcIixcIk9zY3JcIjpcIvCdkqpcIixcIm9zY3JcIjpcIuKEtFwiLFwiT3NsYXNoXCI6XCLDmFwiLFwib3NsYXNoXCI6XCLDuFwiLFwib3NvbFwiOlwi4oqYXCIsXCJPdGlsZGVcIjpcIsOVXCIsXCJvdGlsZGVcIjpcIsO1XCIsXCJvdGltZXNhc1wiOlwi4qi2XCIsXCJPdGltZXNcIjpcIuKot1wiLFwib3RpbWVzXCI6XCLiipdcIixcIk91bWxcIjpcIsOWXCIsXCJvdW1sXCI6XCLDtlwiLFwib3ZiYXJcIjpcIuKMvVwiLFwiT3ZlckJhclwiOlwi4oC+XCIsXCJPdmVyQnJhY2VcIjpcIuKPnlwiLFwiT3ZlckJyYWNrZXRcIjpcIuKOtFwiLFwiT3ZlclBhcmVudGhlc2lzXCI6XCLij5xcIixcInBhcmFcIjpcIsK2XCIsXCJwYXJhbGxlbFwiOlwi4oilXCIsXCJwYXJcIjpcIuKIpVwiLFwicGFyc2ltXCI6XCLiq7NcIixcInBhcnNsXCI6XCLiq71cIixcInBhcnRcIjpcIuKIglwiLFwiUGFydGlhbERcIjpcIuKIglwiLFwiUGN5XCI6XCLQn1wiLFwicGN5XCI6XCLQv1wiLFwicGVyY250XCI6XCIlXCIsXCJwZXJpb2RcIjpcIi5cIixcInBlcm1pbFwiOlwi4oCwXCIsXCJwZXJwXCI6XCLiiqVcIixcInBlcnRlbmtcIjpcIuKAsVwiLFwiUGZyXCI6XCLwnZSTXCIsXCJwZnJcIjpcIvCdlK1cIixcIlBoaVwiOlwizqZcIixcInBoaVwiOlwiz4ZcIixcInBoaXZcIjpcIs+VXCIsXCJwaG1tYXRcIjpcIuKEs1wiLFwicGhvbmVcIjpcIuKYjlwiLFwiUGlcIjpcIs6gXCIsXCJwaVwiOlwiz4BcIixcInBpdGNoZm9ya1wiOlwi4ouUXCIsXCJwaXZcIjpcIs+WXCIsXCJwbGFuY2tcIjpcIuKEj1wiLFwicGxhbmNraFwiOlwi4oSOXCIsXCJwbGFua3ZcIjpcIuKEj1wiLFwicGx1c2FjaXJcIjpcIuKoo1wiLFwicGx1c2JcIjpcIuKKnlwiLFwicGx1c2NpclwiOlwi4qiiXCIsXCJwbHVzXCI6XCIrXCIsXCJwbHVzZG9cIjpcIuKIlFwiLFwicGx1c2R1XCI6XCLiqKVcIixcInBsdXNlXCI6XCLiqbJcIixcIlBsdXNNaW51c1wiOlwiwrFcIixcInBsdXNtblwiOlwiwrFcIixcInBsdXNzaW1cIjpcIuKoplwiLFwicGx1c3R3b1wiOlwi4qinXCIsXCJwbVwiOlwiwrFcIixcIlBvaW5jYXJlcGxhbmVcIjpcIuKEjFwiLFwicG9pbnRpbnRcIjpcIuKolVwiLFwicG9wZlwiOlwi8J2VoVwiLFwiUG9wZlwiOlwi4oSZXCIsXCJwb3VuZFwiOlwiwqNcIixcInByYXBcIjpcIuKqt1wiLFwiUHJcIjpcIuKqu1wiLFwicHJcIjpcIuKJulwiLFwicHJjdWVcIjpcIuKJvFwiLFwicHJlY2FwcHJveFwiOlwi4qq3XCIsXCJwcmVjXCI6XCLiibpcIixcInByZWNjdXJseWVxXCI6XCLiibxcIixcIlByZWNlZGVzXCI6XCLiibpcIixcIlByZWNlZGVzRXF1YWxcIjpcIuKqr1wiLFwiUHJlY2VkZXNTbGFudEVxdWFsXCI6XCLiibxcIixcIlByZWNlZGVzVGlsZGVcIjpcIuKJvlwiLFwicHJlY2VxXCI6XCLiqq9cIixcInByZWNuYXBwcm94XCI6XCLiqrlcIixcInByZWNuZXFxXCI6XCLiqrVcIixcInByZWNuc2ltXCI6XCLii6hcIixcInByZVwiOlwi4qqvXCIsXCJwckVcIjpcIuKqs1wiLFwicHJlY3NpbVwiOlwi4om+XCIsXCJwcmltZVwiOlwi4oCyXCIsXCJQcmltZVwiOlwi4oCzXCIsXCJwcmltZXNcIjpcIuKEmVwiLFwicHJuYXBcIjpcIuKquVwiLFwicHJuRVwiOlwi4qq1XCIsXCJwcm5zaW1cIjpcIuKLqFwiLFwicHJvZFwiOlwi4oiPXCIsXCJQcm9kdWN0XCI6XCLiiI9cIixcInByb2ZhbGFyXCI6XCLijK5cIixcInByb2ZsaW5lXCI6XCLijJJcIixcInByb2ZzdXJmXCI6XCLijJNcIixcInByb3BcIjpcIuKInVwiLFwiUHJvcG9ydGlvbmFsXCI6XCLiiJ1cIixcIlByb3BvcnRpb25cIjpcIuKIt1wiLFwicHJvcHRvXCI6XCLiiJ1cIixcInByc2ltXCI6XCLiib5cIixcInBydXJlbFwiOlwi4oqwXCIsXCJQc2NyXCI6XCLwnZKrXCIsXCJwc2NyXCI6XCLwnZOFXCIsXCJQc2lcIjpcIs6oXCIsXCJwc2lcIjpcIs+IXCIsXCJwdW5jc3BcIjpcIuKAiFwiLFwiUWZyXCI6XCLwnZSUXCIsXCJxZnJcIjpcIvCdlK5cIixcInFpbnRcIjpcIuKojFwiLFwicW9wZlwiOlwi8J2VolwiLFwiUW9wZlwiOlwi4oSaXCIsXCJxcHJpbWVcIjpcIuKBl1wiLFwiUXNjclwiOlwi8J2SrFwiLFwicXNjclwiOlwi8J2ThlwiLFwicXVhdGVybmlvbnNcIjpcIuKEjVwiLFwicXVhdGludFwiOlwi4qiWXCIsXCJxdWVzdFwiOlwiP1wiLFwicXVlc3RlcVwiOlwi4omfXCIsXCJxdW90XCI6XCJcXFwiXCIsXCJRVU9UXCI6XCJcXFwiXCIsXCJyQWFyclwiOlwi4oebXCIsXCJyYWNlXCI6XCLiiL3MsVwiLFwiUmFjdXRlXCI6XCLFlFwiLFwicmFjdXRlXCI6XCLFlVwiLFwicmFkaWNcIjpcIuKImlwiLFwicmFlbXB0eXZcIjpcIuKms1wiLFwicmFuZ1wiOlwi4p+pXCIsXCJSYW5nXCI6XCLin6tcIixcInJhbmdkXCI6XCLippJcIixcInJhbmdlXCI6XCLipqVcIixcInJhbmdsZVwiOlwi4p+pXCIsXCJyYXF1b1wiOlwiwrtcIixcInJhcnJhcFwiOlwi4qW1XCIsXCJyYXJyYlwiOlwi4oelXCIsXCJyYXJyYmZzXCI6XCLipKBcIixcInJhcnJjXCI6XCLipLNcIixcInJhcnJcIjpcIuKGklwiLFwiUmFyclwiOlwi4oagXCIsXCJyQXJyXCI6XCLih5JcIixcInJhcnJmc1wiOlwi4qSeXCIsXCJyYXJyaGtcIjpcIuKGqlwiLFwicmFycmxwXCI6XCLihqxcIixcInJhcnJwbFwiOlwi4qWFXCIsXCJyYXJyc2ltXCI6XCLipbRcIixcIlJhcnJ0bFwiOlwi4qSWXCIsXCJyYXJydGxcIjpcIuKGo1wiLFwicmFycndcIjpcIuKGnVwiLFwicmF0YWlsXCI6XCLipJpcIixcInJBdGFpbFwiOlwi4qScXCIsXCJyYXRpb1wiOlwi4oi2XCIsXCJyYXRpb25hbHNcIjpcIuKEmlwiLFwicmJhcnJcIjpcIuKkjVwiLFwickJhcnJcIjpcIuKkj1wiLFwiUkJhcnJcIjpcIuKkkFwiLFwicmJicmtcIjpcIuKds1wiLFwicmJyYWNlXCI6XCJ9XCIsXCJyYnJhY2tcIjpcIl1cIixcInJicmtlXCI6XCLipoxcIixcInJicmtzbGRcIjpcIuKmjlwiLFwicmJya3NsdVwiOlwi4qaQXCIsXCJSY2Fyb25cIjpcIsWYXCIsXCJyY2Fyb25cIjpcIsWZXCIsXCJSY2VkaWxcIjpcIsWWXCIsXCJyY2VkaWxcIjpcIsWXXCIsXCJyY2VpbFwiOlwi4oyJXCIsXCJyY3ViXCI6XCJ9XCIsXCJSY3lcIjpcItCgXCIsXCJyY3lcIjpcItGAXCIsXCJyZGNhXCI6XCLipLdcIixcInJkbGRoYXJcIjpcIuKlqVwiLFwicmRxdW9cIjpcIuKAnVwiLFwicmRxdW9yXCI6XCLigJ1cIixcInJkc2hcIjpcIuKGs1wiLFwicmVhbFwiOlwi4oScXCIsXCJyZWFsaW5lXCI6XCLihJtcIixcInJlYWxwYXJ0XCI6XCLihJxcIixcInJlYWxzXCI6XCLihJ1cIixcIlJlXCI6XCLihJxcIixcInJlY3RcIjpcIuKWrVwiLFwicmVnXCI6XCLCrlwiLFwiUkVHXCI6XCLCrlwiLFwiUmV2ZXJzZUVsZW1lbnRcIjpcIuKIi1wiLFwiUmV2ZXJzZUVxdWlsaWJyaXVtXCI6XCLih4tcIixcIlJldmVyc2VVcEVxdWlsaWJyaXVtXCI6XCLipa9cIixcInJmaXNodFwiOlwi4qW9XCIsXCJyZmxvb3JcIjpcIuKMi1wiLFwicmZyXCI6XCLwnZSvXCIsXCJSZnJcIjpcIuKEnFwiLFwickhhclwiOlwi4qWkXCIsXCJyaGFyZFwiOlwi4oeBXCIsXCJyaGFydVwiOlwi4oeAXCIsXCJyaGFydWxcIjpcIuKlrFwiLFwiUmhvXCI6XCLOoVwiLFwicmhvXCI6XCLPgVwiLFwicmhvdlwiOlwiz7FcIixcIlJpZ2h0QW5nbGVCcmFja2V0XCI6XCLin6lcIixcIlJpZ2h0QXJyb3dCYXJcIjpcIuKHpVwiLFwicmlnaHRhcnJvd1wiOlwi4oaSXCIsXCJSaWdodEFycm93XCI6XCLihpJcIixcIlJpZ2h0YXJyb3dcIjpcIuKHklwiLFwiUmlnaHRBcnJvd0xlZnRBcnJvd1wiOlwi4oeEXCIsXCJyaWdodGFycm93dGFpbFwiOlwi4oajXCIsXCJSaWdodENlaWxpbmdcIjpcIuKMiVwiLFwiUmlnaHREb3VibGVCcmFja2V0XCI6XCLin6dcIixcIlJpZ2h0RG93blRlZVZlY3RvclwiOlwi4qWdXCIsXCJSaWdodERvd25WZWN0b3JCYXJcIjpcIuKllVwiLFwiUmlnaHREb3duVmVjdG9yXCI6XCLih4JcIixcIlJpZ2h0Rmxvb3JcIjpcIuKMi1wiLFwicmlnaHRoYXJwb29uZG93blwiOlwi4oeBXCIsXCJyaWdodGhhcnBvb251cFwiOlwi4oeAXCIsXCJyaWdodGxlZnRhcnJvd3NcIjpcIuKHhFwiLFwicmlnaHRsZWZ0aGFycG9vbnNcIjpcIuKHjFwiLFwicmlnaHRyaWdodGFycm93c1wiOlwi4oeJXCIsXCJyaWdodHNxdWlnYXJyb3dcIjpcIuKGnVwiLFwiUmlnaHRUZWVBcnJvd1wiOlwi4oamXCIsXCJSaWdodFRlZVwiOlwi4oqiXCIsXCJSaWdodFRlZVZlY3RvclwiOlwi4qWbXCIsXCJyaWdodHRocmVldGltZXNcIjpcIuKLjFwiLFwiUmlnaHRUcmlhbmdsZUJhclwiOlwi4qeQXCIsXCJSaWdodFRyaWFuZ2xlXCI6XCLiirNcIixcIlJpZ2h0VHJpYW5nbGVFcXVhbFwiOlwi4oq1XCIsXCJSaWdodFVwRG93blZlY3RvclwiOlwi4qWPXCIsXCJSaWdodFVwVGVlVmVjdG9yXCI6XCLipZxcIixcIlJpZ2h0VXBWZWN0b3JCYXJcIjpcIuKllFwiLFwiUmlnaHRVcFZlY3RvclwiOlwi4oa+XCIsXCJSaWdodFZlY3RvckJhclwiOlwi4qWTXCIsXCJSaWdodFZlY3RvclwiOlwi4oeAXCIsXCJyaW5nXCI6XCLLmlwiLFwicmlzaW5nZG90c2VxXCI6XCLiiZNcIixcInJsYXJyXCI6XCLih4RcIixcInJsaGFyXCI6XCLih4xcIixcInJsbVwiOlwi4oCPXCIsXCJybW91c3RhY2hlXCI6XCLijrFcIixcInJtb3VzdFwiOlwi4o6xXCIsXCJybm1pZFwiOlwi4quuXCIsXCJyb2FuZ1wiOlwi4p+tXCIsXCJyb2FyclwiOlwi4oe+XCIsXCJyb2Jya1wiOlwi4p+nXCIsXCJyb3BhclwiOlwi4qaGXCIsXCJyb3BmXCI6XCLwnZWjXCIsXCJSb3BmXCI6XCLihJ1cIixcInJvcGx1c1wiOlwi4qiuXCIsXCJyb3RpbWVzXCI6XCLiqLVcIixcIlJvdW5kSW1wbGllc1wiOlwi4qWwXCIsXCJycGFyXCI6XCIpXCIsXCJycGFyZ3RcIjpcIuKmlFwiLFwicnBwb2xpbnRcIjpcIuKoklwiLFwicnJhcnJcIjpcIuKHiVwiLFwiUnJpZ2h0YXJyb3dcIjpcIuKHm1wiLFwicnNhcXVvXCI6XCLigLpcIixcInJzY3JcIjpcIvCdk4dcIixcIlJzY3JcIjpcIuKEm1wiLFwicnNoXCI6XCLihrFcIixcIlJzaFwiOlwi4oaxXCIsXCJyc3FiXCI6XCJdXCIsXCJyc3F1b1wiOlwi4oCZXCIsXCJyc3F1b3JcIjpcIuKAmVwiLFwicnRocmVlXCI6XCLii4xcIixcInJ0aW1lc1wiOlwi4ouKXCIsXCJydHJpXCI6XCLilrlcIixcInJ0cmllXCI6XCLiirVcIixcInJ0cmlmXCI6XCLilrhcIixcInJ0cmlsdHJpXCI6XCLip45cIixcIlJ1bGVEZWxheWVkXCI6XCLip7RcIixcInJ1bHVoYXJcIjpcIuKlqFwiLFwicnhcIjpcIuKEnlwiLFwiU2FjdXRlXCI6XCLFmlwiLFwic2FjdXRlXCI6XCLFm1wiLFwic2JxdW9cIjpcIuKAmlwiLFwic2NhcFwiOlwi4qq4XCIsXCJTY2Fyb25cIjpcIsWgXCIsXCJzY2Fyb25cIjpcIsWhXCIsXCJTY1wiOlwi4qq8XCIsXCJzY1wiOlwi4om7XCIsXCJzY2N1ZVwiOlwi4om9XCIsXCJzY2VcIjpcIuKqsFwiLFwic2NFXCI6XCLiqrRcIixcIlNjZWRpbFwiOlwixZ5cIixcInNjZWRpbFwiOlwixZ9cIixcIlNjaXJjXCI6XCLFnFwiLFwic2NpcmNcIjpcIsWdXCIsXCJzY25hcFwiOlwi4qq6XCIsXCJzY25FXCI6XCLiqrZcIixcInNjbnNpbVwiOlwi4oupXCIsXCJzY3BvbGludFwiOlwi4qiTXCIsXCJzY3NpbVwiOlwi4om/XCIsXCJTY3lcIjpcItChXCIsXCJzY3lcIjpcItGBXCIsXCJzZG90YlwiOlwi4oqhXCIsXCJzZG90XCI6XCLii4VcIixcInNkb3RlXCI6XCLiqaZcIixcInNlYXJoa1wiOlwi4qSlXCIsXCJzZWFyclwiOlwi4oaYXCIsXCJzZUFyclwiOlwi4oeYXCIsXCJzZWFycm93XCI6XCLihphcIixcInNlY3RcIjpcIsKnXCIsXCJzZW1pXCI6XCI7XCIsXCJzZXN3YXJcIjpcIuKkqVwiLFwic2V0bWludXNcIjpcIuKIllwiLFwic2V0bW5cIjpcIuKIllwiLFwic2V4dFwiOlwi4py2XCIsXCJTZnJcIjpcIvCdlJZcIixcInNmclwiOlwi8J2UsFwiLFwic2Zyb3duXCI6XCLijKJcIixcInNoYXJwXCI6XCLima9cIixcIlNIQ0hjeVwiOlwi0KlcIixcInNoY2hjeVwiOlwi0YlcIixcIlNIY3lcIjpcItCoXCIsXCJzaGN5XCI6XCLRiFwiLFwiU2hvcnREb3duQXJyb3dcIjpcIuKGk1wiLFwiU2hvcnRMZWZ0QXJyb3dcIjpcIuKGkFwiLFwic2hvcnRtaWRcIjpcIuKIo1wiLFwic2hvcnRwYXJhbGxlbFwiOlwi4oilXCIsXCJTaG9ydFJpZ2h0QXJyb3dcIjpcIuKGklwiLFwiU2hvcnRVcEFycm93XCI6XCLihpFcIixcInNoeVwiOlwiwq1cIixcIlNpZ21hXCI6XCLOo1wiLFwic2lnbWFcIjpcIs+DXCIsXCJzaWdtYWZcIjpcIs+CXCIsXCJzaWdtYXZcIjpcIs+CXCIsXCJzaW1cIjpcIuKIvFwiLFwic2ltZG90XCI6XCLiqapcIixcInNpbWVcIjpcIuKJg1wiLFwic2ltZXFcIjpcIuKJg1wiLFwic2ltZ1wiOlwi4qqeXCIsXCJzaW1nRVwiOlwi4qqgXCIsXCJzaW1sXCI6XCLiqp1cIixcInNpbWxFXCI6XCLiqp9cIixcInNpbW5lXCI6XCLiiYZcIixcInNpbXBsdXNcIjpcIuKopFwiLFwic2ltcmFyclwiOlwi4qWyXCIsXCJzbGFyclwiOlwi4oaQXCIsXCJTbWFsbENpcmNsZVwiOlwi4oiYXCIsXCJzbWFsbHNldG1pbnVzXCI6XCLiiJZcIixcInNtYXNocFwiOlwi4qizXCIsXCJzbWVwYXJzbFwiOlwi4qekXCIsXCJzbWlkXCI6XCLiiKNcIixcInNtaWxlXCI6XCLijKNcIixcInNtdFwiOlwi4qqqXCIsXCJzbXRlXCI6XCLiqqxcIixcInNtdGVzXCI6XCLiqqzvuIBcIixcIlNPRlRjeVwiOlwi0KxcIixcInNvZnRjeVwiOlwi0YxcIixcInNvbGJhclwiOlwi4oy/XCIsXCJzb2xiXCI6XCLip4RcIixcInNvbFwiOlwiL1wiLFwiU29wZlwiOlwi8J2VilwiLFwic29wZlwiOlwi8J2VpFwiLFwic3BhZGVzXCI6XCLimaBcIixcInNwYWRlc3VpdFwiOlwi4pmgXCIsXCJzcGFyXCI6XCLiiKVcIixcInNxY2FwXCI6XCLiipNcIixcInNxY2Fwc1wiOlwi4oqT77iAXCIsXCJzcWN1cFwiOlwi4oqUXCIsXCJzcWN1cHNcIjpcIuKKlO+4gFwiLFwiU3FydFwiOlwi4oiaXCIsXCJzcXN1YlwiOlwi4oqPXCIsXCJzcXN1YmVcIjpcIuKKkVwiLFwic3FzdWJzZXRcIjpcIuKKj1wiLFwic3FzdWJzZXRlcVwiOlwi4oqRXCIsXCJzcXN1cFwiOlwi4oqQXCIsXCJzcXN1cGVcIjpcIuKKklwiLFwic3FzdXBzZXRcIjpcIuKKkFwiLFwic3FzdXBzZXRlcVwiOlwi4oqSXCIsXCJzcXVhcmVcIjpcIuKWoVwiLFwiU3F1YXJlXCI6XCLilqFcIixcIlNxdWFyZUludGVyc2VjdGlvblwiOlwi4oqTXCIsXCJTcXVhcmVTdWJzZXRcIjpcIuKKj1wiLFwiU3F1YXJlU3Vic2V0RXF1YWxcIjpcIuKKkVwiLFwiU3F1YXJlU3VwZXJzZXRcIjpcIuKKkFwiLFwiU3F1YXJlU3VwZXJzZXRFcXVhbFwiOlwi4oqSXCIsXCJTcXVhcmVVbmlvblwiOlwi4oqUXCIsXCJzcXVhcmZcIjpcIuKWqlwiLFwic3F1XCI6XCLilqFcIixcInNxdWZcIjpcIuKWqlwiLFwic3JhcnJcIjpcIuKGklwiLFwiU3NjclwiOlwi8J2SrlwiLFwic3NjclwiOlwi8J2TiFwiLFwic3NldG1uXCI6XCLiiJZcIixcInNzbWlsZVwiOlwi4oyjXCIsXCJzc3RhcmZcIjpcIuKLhlwiLFwiU3RhclwiOlwi4ouGXCIsXCJzdGFyXCI6XCLimIZcIixcInN0YXJmXCI6XCLimIVcIixcInN0cmFpZ2h0ZXBzaWxvblwiOlwiz7VcIixcInN0cmFpZ2h0cGhpXCI6XCLPlVwiLFwic3RybnNcIjpcIsKvXCIsXCJzdWJcIjpcIuKKglwiLFwiU3ViXCI6XCLii5BcIixcInN1YmRvdFwiOlwi4qq9XCIsXCJzdWJFXCI6XCLiq4VcIixcInN1YmVcIjpcIuKKhlwiLFwic3ViZWRvdFwiOlwi4quDXCIsXCJzdWJtdWx0XCI6XCLiq4FcIixcInN1Ym5FXCI6XCLiq4tcIixcInN1Ym5lXCI6XCLiiopcIixcInN1YnBsdXNcIjpcIuKqv1wiLFwic3VicmFyclwiOlwi4qW5XCIsXCJzdWJzZXRcIjpcIuKKglwiLFwiU3Vic2V0XCI6XCLii5BcIixcInN1YnNldGVxXCI6XCLiioZcIixcInN1YnNldGVxcVwiOlwi4quFXCIsXCJTdWJzZXRFcXVhbFwiOlwi4oqGXCIsXCJzdWJzZXRuZXFcIjpcIuKKilwiLFwic3Vic2V0bmVxcVwiOlwi4quLXCIsXCJzdWJzaW1cIjpcIuKrh1wiLFwic3Vic3ViXCI6XCLiq5VcIixcInN1YnN1cFwiOlwi4quTXCIsXCJzdWNjYXBwcm94XCI6XCLiqrhcIixcInN1Y2NcIjpcIuKJu1wiLFwic3VjY2N1cmx5ZXFcIjpcIuKJvVwiLFwiU3VjY2VlZHNcIjpcIuKJu1wiLFwiU3VjY2VlZHNFcXVhbFwiOlwi4qqwXCIsXCJTdWNjZWVkc1NsYW50RXF1YWxcIjpcIuKJvVwiLFwiU3VjY2VlZHNUaWxkZVwiOlwi4om/XCIsXCJzdWNjZXFcIjpcIuKqsFwiLFwic3VjY25hcHByb3hcIjpcIuKqulwiLFwic3VjY25lcXFcIjpcIuKqtlwiLFwic3VjY25zaW1cIjpcIuKLqVwiLFwic3VjY3NpbVwiOlwi4om/XCIsXCJTdWNoVGhhdFwiOlwi4oiLXCIsXCJzdW1cIjpcIuKIkVwiLFwiU3VtXCI6XCLiiJFcIixcInN1bmdcIjpcIuKZqlwiLFwic3VwMVwiOlwiwrlcIixcInN1cDJcIjpcIsKyXCIsXCJzdXAzXCI6XCLCs1wiLFwic3VwXCI6XCLiioNcIixcIlN1cFwiOlwi4ouRXCIsXCJzdXBkb3RcIjpcIuKqvlwiLFwic3VwZHN1YlwiOlwi4quYXCIsXCJzdXBFXCI6XCLiq4ZcIixcInN1cGVcIjpcIuKKh1wiLFwic3VwZWRvdFwiOlwi4quEXCIsXCJTdXBlcnNldFwiOlwi4oqDXCIsXCJTdXBlcnNldEVxdWFsXCI6XCLiiodcIixcInN1cGhzb2xcIjpcIuKfiVwiLFwic3VwaHN1YlwiOlwi4quXXCIsXCJzdXBsYXJyXCI6XCLipbtcIixcInN1cG11bHRcIjpcIuKrglwiLFwic3VwbkVcIjpcIuKrjFwiLFwic3VwbmVcIjpcIuKKi1wiLFwic3VwcGx1c1wiOlwi4quAXCIsXCJzdXBzZXRcIjpcIuKKg1wiLFwiU3Vwc2V0XCI6XCLii5FcIixcInN1cHNldGVxXCI6XCLiiodcIixcInN1cHNldGVxcVwiOlwi4quGXCIsXCJzdXBzZXRuZXFcIjpcIuKKi1wiLFwic3Vwc2V0bmVxcVwiOlwi4quMXCIsXCJzdXBzaW1cIjpcIuKriFwiLFwic3Vwc3ViXCI6XCLiq5RcIixcInN1cHN1cFwiOlwi4quWXCIsXCJzd2FyaGtcIjpcIuKkplwiLFwic3dhcnJcIjpcIuKGmVwiLFwic3dBcnJcIjpcIuKHmVwiLFwic3dhcnJvd1wiOlwi4oaZXCIsXCJzd253YXJcIjpcIuKkqlwiLFwic3psaWdcIjpcIsOfXCIsXCJUYWJcIjpcIlxcdFwiLFwidGFyZ2V0XCI6XCLijJZcIixcIlRhdVwiOlwizqRcIixcInRhdVwiOlwiz4RcIixcInRicmtcIjpcIuKOtFwiLFwiVGNhcm9uXCI6XCLFpFwiLFwidGNhcm9uXCI6XCLFpVwiLFwiVGNlZGlsXCI6XCLFolwiLFwidGNlZGlsXCI6XCLFo1wiLFwiVGN5XCI6XCLQolwiLFwidGN5XCI6XCLRglwiLFwidGRvdFwiOlwi4oObXCIsXCJ0ZWxyZWNcIjpcIuKMlVwiLFwiVGZyXCI6XCLwnZSXXCIsXCJ0ZnJcIjpcIvCdlLFcIixcInRoZXJlNFwiOlwi4oi0XCIsXCJ0aGVyZWZvcmVcIjpcIuKItFwiLFwiVGhlcmVmb3JlXCI6XCLiiLRcIixcIlRoZXRhXCI6XCLOmFwiLFwidGhldGFcIjpcIs64XCIsXCJ0aGV0YXN5bVwiOlwiz5FcIixcInRoZXRhdlwiOlwiz5FcIixcInRoaWNrYXBwcm94XCI6XCLiiYhcIixcInRoaWNrc2ltXCI6XCLiiLxcIixcIlRoaWNrU3BhY2VcIjpcIuKBn+KAilwiLFwiVGhpblNwYWNlXCI6XCLigIlcIixcInRoaW5zcFwiOlwi4oCJXCIsXCJ0aGthcFwiOlwi4omIXCIsXCJ0aGtzaW1cIjpcIuKIvFwiLFwiVEhPUk5cIjpcIsOeXCIsXCJ0aG9yblwiOlwiw75cIixcInRpbGRlXCI6XCLLnFwiLFwiVGlsZGVcIjpcIuKIvFwiLFwiVGlsZGVFcXVhbFwiOlwi4omDXCIsXCJUaWxkZUZ1bGxFcXVhbFwiOlwi4omFXCIsXCJUaWxkZVRpbGRlXCI6XCLiiYhcIixcInRpbWVzYmFyXCI6XCLiqLFcIixcInRpbWVzYlwiOlwi4oqgXCIsXCJ0aW1lc1wiOlwiw5dcIixcInRpbWVzZFwiOlwi4qiwXCIsXCJ0aW50XCI6XCLiiK1cIixcInRvZWFcIjpcIuKkqFwiLFwidG9wYm90XCI6XCLijLZcIixcInRvcGNpclwiOlwi4quxXCIsXCJ0b3BcIjpcIuKKpFwiLFwiVG9wZlwiOlwi8J2Vi1wiLFwidG9wZlwiOlwi8J2VpVwiLFwidG9wZm9ya1wiOlwi4quaXCIsXCJ0b3NhXCI6XCLipKlcIixcInRwcmltZVwiOlwi4oC0XCIsXCJ0cmFkZVwiOlwi4oSiXCIsXCJUUkFERVwiOlwi4oSiXCIsXCJ0cmlhbmdsZVwiOlwi4pa1XCIsXCJ0cmlhbmdsZWRvd25cIjpcIuKWv1wiLFwidHJpYW5nbGVsZWZ0XCI6XCLil4NcIixcInRyaWFuZ2xlbGVmdGVxXCI6XCLiirRcIixcInRyaWFuZ2xlcVwiOlwi4omcXCIsXCJ0cmlhbmdsZXJpZ2h0XCI6XCLilrlcIixcInRyaWFuZ2xlcmlnaHRlcVwiOlwi4oq1XCIsXCJ0cmlkb3RcIjpcIuKXrFwiLFwidHJpZVwiOlwi4omcXCIsXCJ0cmltaW51c1wiOlwi4qi6XCIsXCJUcmlwbGVEb3RcIjpcIuKDm1wiLFwidHJpcGx1c1wiOlwi4qi5XCIsXCJ0cmlzYlwiOlwi4qeNXCIsXCJ0cml0aW1lXCI6XCLiqLtcIixcInRycGV6aXVtXCI6XCLij6JcIixcIlRzY3JcIjpcIvCdkq9cIixcInRzY3JcIjpcIvCdk4lcIixcIlRTY3lcIjpcItCmXCIsXCJ0c2N5XCI6XCLRhlwiLFwiVFNIY3lcIjpcItCLXCIsXCJ0c2hjeVwiOlwi0ZtcIixcIlRzdHJva1wiOlwixaZcIixcInRzdHJva1wiOlwixadcIixcInR3aXh0XCI6XCLiiaxcIixcInR3b2hlYWRsZWZ0YXJyb3dcIjpcIuKGnlwiLFwidHdvaGVhZHJpZ2h0YXJyb3dcIjpcIuKGoFwiLFwiVWFjdXRlXCI6XCLDmlwiLFwidWFjdXRlXCI6XCLDulwiLFwidWFyclwiOlwi4oaRXCIsXCJVYXJyXCI6XCLihp9cIixcInVBcnJcIjpcIuKHkVwiLFwiVWFycm9jaXJcIjpcIuKliVwiLFwiVWJyY3lcIjpcItCOXCIsXCJ1YnJjeVwiOlwi0Z5cIixcIlVicmV2ZVwiOlwixaxcIixcInVicmV2ZVwiOlwixa1cIixcIlVjaXJjXCI6XCLDm1wiLFwidWNpcmNcIjpcIsO7XCIsXCJVY3lcIjpcItCjXCIsXCJ1Y3lcIjpcItGDXCIsXCJ1ZGFyclwiOlwi4oeFXCIsXCJVZGJsYWNcIjpcIsWwXCIsXCJ1ZGJsYWNcIjpcIsWxXCIsXCJ1ZGhhclwiOlwi4qWuXCIsXCJ1ZmlzaHRcIjpcIuKlvlwiLFwiVWZyXCI6XCLwnZSYXCIsXCJ1ZnJcIjpcIvCdlLJcIixcIlVncmF2ZVwiOlwiw5lcIixcInVncmF2ZVwiOlwiw7lcIixcInVIYXJcIjpcIuKlo1wiLFwidWhhcmxcIjpcIuKGv1wiLFwidWhhcnJcIjpcIuKGvlwiLFwidWhibGtcIjpcIuKWgFwiLFwidWxjb3JuXCI6XCLijJxcIixcInVsY29ybmVyXCI6XCLijJxcIixcInVsY3JvcFwiOlwi4oyPXCIsXCJ1bHRyaVwiOlwi4pe4XCIsXCJVbWFjclwiOlwixapcIixcInVtYWNyXCI6XCLFq1wiLFwidW1sXCI6XCLCqFwiLFwiVW5kZXJCYXJcIjpcIl9cIixcIlVuZGVyQnJhY2VcIjpcIuKPn1wiLFwiVW5kZXJCcmFja2V0XCI6XCLijrVcIixcIlVuZGVyUGFyZW50aGVzaXNcIjpcIuKPnVwiLFwiVW5pb25cIjpcIuKLg1wiLFwiVW5pb25QbHVzXCI6XCLiio5cIixcIlVvZ29uXCI6XCLFslwiLFwidW9nb25cIjpcIsWzXCIsXCJVb3BmXCI6XCLwnZWMXCIsXCJ1b3BmXCI6XCLwnZWmXCIsXCJVcEFycm93QmFyXCI6XCLipJJcIixcInVwYXJyb3dcIjpcIuKGkVwiLFwiVXBBcnJvd1wiOlwi4oaRXCIsXCJVcGFycm93XCI6XCLih5FcIixcIlVwQXJyb3dEb3duQXJyb3dcIjpcIuKHhVwiLFwidXBkb3duYXJyb3dcIjpcIuKGlVwiLFwiVXBEb3duQXJyb3dcIjpcIuKGlVwiLFwiVXBkb3duYXJyb3dcIjpcIuKHlVwiLFwiVXBFcXVpbGlicml1bVwiOlwi4qWuXCIsXCJ1cGhhcnBvb25sZWZ0XCI6XCLihr9cIixcInVwaGFycG9vbnJpZ2h0XCI6XCLihr5cIixcInVwbHVzXCI6XCLiio5cIixcIlVwcGVyTGVmdEFycm93XCI6XCLihpZcIixcIlVwcGVyUmlnaHRBcnJvd1wiOlwi4oaXXCIsXCJ1cHNpXCI6XCLPhVwiLFwiVXBzaVwiOlwiz5JcIixcInVwc2loXCI6XCLPklwiLFwiVXBzaWxvblwiOlwizqVcIixcInVwc2lsb25cIjpcIs+FXCIsXCJVcFRlZUFycm93XCI6XCLihqVcIixcIlVwVGVlXCI6XCLiiqVcIixcInVwdXBhcnJvd3NcIjpcIuKHiFwiLFwidXJjb3JuXCI6XCLijJ1cIixcInVyY29ybmVyXCI6XCLijJ1cIixcInVyY3JvcFwiOlwi4oyOXCIsXCJVcmluZ1wiOlwixa5cIixcInVyaW5nXCI6XCLFr1wiLFwidXJ0cmlcIjpcIuKXuVwiLFwiVXNjclwiOlwi8J2SsFwiLFwidXNjclwiOlwi8J2TilwiLFwidXRkb3RcIjpcIuKLsFwiLFwiVXRpbGRlXCI6XCLFqFwiLFwidXRpbGRlXCI6XCLFqVwiLFwidXRyaVwiOlwi4pa1XCIsXCJ1dHJpZlwiOlwi4pa0XCIsXCJ1dWFyclwiOlwi4oeIXCIsXCJVdW1sXCI6XCLDnFwiLFwidXVtbFwiOlwiw7xcIixcInV3YW5nbGVcIjpcIuKmp1wiLFwidmFuZ3J0XCI6XCLippxcIixcInZhcmVwc2lsb25cIjpcIs+1XCIsXCJ2YXJrYXBwYVwiOlwiz7BcIixcInZhcm5vdGhpbmdcIjpcIuKIhVwiLFwidmFycGhpXCI6XCLPlVwiLFwidmFycGlcIjpcIs+WXCIsXCJ2YXJwcm9wdG9cIjpcIuKInVwiLFwidmFyclwiOlwi4oaVXCIsXCJ2QXJyXCI6XCLih5VcIixcInZhcnJob1wiOlwiz7FcIixcInZhcnNpZ21hXCI6XCLPglwiLFwidmFyc3Vic2V0bmVxXCI6XCLiiorvuIBcIixcInZhcnN1YnNldG5lcXFcIjpcIuKri++4gFwiLFwidmFyc3Vwc2V0bmVxXCI6XCLiiovvuIBcIixcInZhcnN1cHNldG5lcXFcIjpcIuKrjO+4gFwiLFwidmFydGhldGFcIjpcIs+RXCIsXCJ2YXJ0cmlhbmdsZWxlZnRcIjpcIuKKslwiLFwidmFydHJpYW5nbGVyaWdodFwiOlwi4oqzXCIsXCJ2QmFyXCI6XCLiq6hcIixcIlZiYXJcIjpcIuKrq1wiLFwidkJhcnZcIjpcIuKrqVwiLFwiVmN5XCI6XCLQklwiLFwidmN5XCI6XCLQslwiLFwidmRhc2hcIjpcIuKKolwiLFwidkRhc2hcIjpcIuKKqFwiLFwiVmRhc2hcIjpcIuKKqVwiLFwiVkRhc2hcIjpcIuKKq1wiLFwiVmRhc2hsXCI6XCLiq6ZcIixcInZlZWJhclwiOlwi4oq7XCIsXCJ2ZWVcIjpcIuKIqFwiLFwiVmVlXCI6XCLii4FcIixcInZlZWVxXCI6XCLiiZpcIixcInZlbGxpcFwiOlwi4ouuXCIsXCJ2ZXJiYXJcIjpcInxcIixcIlZlcmJhclwiOlwi4oCWXCIsXCJ2ZXJ0XCI6XCJ8XCIsXCJWZXJ0XCI6XCLigJZcIixcIlZlcnRpY2FsQmFyXCI6XCLiiKNcIixcIlZlcnRpY2FsTGluZVwiOlwifFwiLFwiVmVydGljYWxTZXBhcmF0b3JcIjpcIuKdmFwiLFwiVmVydGljYWxUaWxkZVwiOlwi4omAXCIsXCJWZXJ5VGhpblNwYWNlXCI6XCLigIpcIixcIlZmclwiOlwi8J2UmVwiLFwidmZyXCI6XCLwnZSzXCIsXCJ2bHRyaVwiOlwi4oqyXCIsXCJ2bnN1YlwiOlwi4oqC4oOSXCIsXCJ2bnN1cFwiOlwi4oqD4oOSXCIsXCJWb3BmXCI6XCLwnZWNXCIsXCJ2b3BmXCI6XCLwnZWnXCIsXCJ2cHJvcFwiOlwi4oidXCIsXCJ2cnRyaVwiOlwi4oqzXCIsXCJWc2NyXCI6XCLwnZKxXCIsXCJ2c2NyXCI6XCLwnZOLXCIsXCJ2c3VibkVcIjpcIuKri++4gFwiLFwidnN1Ym5lXCI6XCLiiorvuIBcIixcInZzdXBuRVwiOlwi4quM77iAXCIsXCJ2c3VwbmVcIjpcIuKKi++4gFwiLFwiVnZkYXNoXCI6XCLiiqpcIixcInZ6aWd6YWdcIjpcIuKmmlwiLFwiV2NpcmNcIjpcIsW0XCIsXCJ3Y2lyY1wiOlwixbVcIixcIndlZGJhclwiOlwi4qmfXCIsXCJ3ZWRnZVwiOlwi4oinXCIsXCJXZWRnZVwiOlwi4ouAXCIsXCJ3ZWRnZXFcIjpcIuKJmVwiLFwid2VpZXJwXCI6XCLihJhcIixcIldmclwiOlwi8J2UmlwiLFwid2ZyXCI6XCLwnZS0XCIsXCJXb3BmXCI6XCLwnZWOXCIsXCJ3b3BmXCI6XCLwnZWoXCIsXCJ3cFwiOlwi4oSYXCIsXCJ3clwiOlwi4omAXCIsXCJ3cmVhdGhcIjpcIuKJgFwiLFwiV3NjclwiOlwi8J2SslwiLFwid3NjclwiOlwi8J2TjFwiLFwieGNhcFwiOlwi4ouCXCIsXCJ4Y2lyY1wiOlwi4pevXCIsXCJ4Y3VwXCI6XCLii4NcIixcInhkdHJpXCI6XCLilr1cIixcIlhmclwiOlwi8J2Um1wiLFwieGZyXCI6XCLwnZS1XCIsXCJ4aGFyclwiOlwi4p+3XCIsXCJ4aEFyclwiOlwi4p+6XCIsXCJYaVwiOlwizp5cIixcInhpXCI6XCLOvlwiLFwieGxhcnJcIjpcIuKftVwiLFwieGxBcnJcIjpcIuKfuFwiLFwieG1hcFwiOlwi4p+8XCIsXCJ4bmlzXCI6XCLii7tcIixcInhvZG90XCI6XCLiqIBcIixcIlhvcGZcIjpcIvCdlY9cIixcInhvcGZcIjpcIvCdlalcIixcInhvcGx1c1wiOlwi4qiBXCIsXCJ4b3RpbWVcIjpcIuKoglwiLFwieHJhcnJcIjpcIuKftlwiLFwieHJBcnJcIjpcIuKfuVwiLFwiWHNjclwiOlwi8J2Ss1wiLFwieHNjclwiOlwi8J2TjVwiLFwieHNxY3VwXCI6XCLiqIZcIixcInh1cGx1c1wiOlwi4qiEXCIsXCJ4dXRyaVwiOlwi4pazXCIsXCJ4dmVlXCI6XCLii4FcIixcInh3ZWRnZVwiOlwi4ouAXCIsXCJZYWN1dGVcIjpcIsOdXCIsXCJ5YWN1dGVcIjpcIsO9XCIsXCJZQWN5XCI6XCLQr1wiLFwieWFjeVwiOlwi0Y9cIixcIlljaXJjXCI6XCLFtlwiLFwieWNpcmNcIjpcIsW3XCIsXCJZY3lcIjpcItCrXCIsXCJ5Y3lcIjpcItGLXCIsXCJ5ZW5cIjpcIsKlXCIsXCJZZnJcIjpcIvCdlJxcIixcInlmclwiOlwi8J2UtlwiLFwiWUljeVwiOlwi0IdcIixcInlpY3lcIjpcItGXXCIsXCJZb3BmXCI6XCLwnZWQXCIsXCJ5b3BmXCI6XCLwnZWqXCIsXCJZc2NyXCI6XCLwnZK0XCIsXCJ5c2NyXCI6XCLwnZOOXCIsXCJZVWN5XCI6XCLQrlwiLFwieXVjeVwiOlwi0Y5cIixcInl1bWxcIjpcIsO/XCIsXCJZdW1sXCI6XCLFuFwiLFwiWmFjdXRlXCI6XCLFuVwiLFwiemFjdXRlXCI6XCLFulwiLFwiWmNhcm9uXCI6XCLFvVwiLFwiemNhcm9uXCI6XCLFvlwiLFwiWmN5XCI6XCLQl1wiLFwiemN5XCI6XCLQt1wiLFwiWmRvdFwiOlwixbtcIixcInpkb3RcIjpcIsW8XCIsXCJ6ZWV0cmZcIjpcIuKEqFwiLFwiWmVyb1dpZHRoU3BhY2VcIjpcIuKAi1wiLFwiWmV0YVwiOlwizpZcIixcInpldGFcIjpcIs62XCIsXCJ6ZnJcIjpcIvCdlLdcIixcIlpmclwiOlwi4oSoXCIsXCJaSGN5XCI6XCLQllwiLFwiemhjeVwiOlwi0LZcIixcInppZ3JhcnJcIjpcIuKHnVwiLFwiem9wZlwiOlwi8J2Vq1wiLFwiWm9wZlwiOlwi4oSkXCIsXCJac2NyXCI6XCLwnZK1XCIsXCJ6c2NyXCI6XCLwnZOPXCIsXCJ6d2pcIjpcIuKAjVwiLFwiendualwiOlwi4oCMXCJ9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9lbnRpdGllcy5qc29uXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBSZW5kZXJlcigpIHt9XG5cbi8qKlxuICogIFdhbGtzIHRoZSBBU1QgYW5kIGNhbGxzIG1lbWJlciBtZXRob2RzIGZvciBlYWNoIE5vZGUgdHlwZS5cbiAqXG4gKiAgQHBhcmFtIGFzdCB7Tm9kZX0gVGhlIHJvb3Qgb2YgdGhlIGFic3RyYWN0IHN5bnRheCB0cmVlLlxuICovXG5mdW5jdGlvbiByZW5kZXIoYXN0KSB7XG4gIHZhciB3YWxrZXIgPSBhc3Qud2Fsa2VyKClcbiAgICAsIGV2ZW50XG4gICAgLCB0eXBlO1xuXG4gIHRoaXMuYnVmZmVyID0gJyc7XG4gIHRoaXMubGFzdE91dCA9ICdcXG4nO1xuXG4gIHdoaWxlKChldmVudCA9IHdhbGtlci5uZXh0KCkpKSB7XG4gICAgdHlwZSA9IGV2ZW50Lm5vZGUudHlwZTtcbiAgICBpZiAodGhpc1t0eXBlXSkge1xuICAgICAgdGhpc1t0eXBlXShldmVudC5ub2RlLCBldmVudC5lbnRlcmluZyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzLmJ1ZmZlcjtcbn1cblxuLyoqXG4gKiAgQ29uY2F0ZW5hdGUgYSBsaXRlcmFsIHN0cmluZyB0byB0aGUgYnVmZmVyLlxuICpcbiAqICBAcGFyYW0gc3RyIHtTdHJpbmd9IFRoZSBzdHJpbmcgdG8gY29uY2F0ZW5hdGUuXG4gKi9cbmZ1bmN0aW9uIGxpdChzdHIpIHtcbiAgdGhpcy5idWZmZXIgKz0gc3RyO1xuICB0aGlzLmxhc3RPdXQgPSBzdHI7XG59XG5cbi8qKlxuICogIE91dHB1dCBhIG5ld2xpbmUgdG8gdGhlIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY3IoKSB7XG4gIGlmICh0aGlzLmxhc3RPdXQgIT09ICdcXG4nKSB7XG4gICAgdGhpcy5saXQoJ1xcbicpO1xuICB9XG59XG5cbi8qKlxuICogIENvbmNhdGVuYXRlIGEgc3RyaW5nIHRvIHRoZSBidWZmZXIgcG9zc2libHkgZXNjYXBpbmcgdGhlIGNvbnRlbnQuXG4gKlxuICogIENvbmNyZXRlIHJlbmRlcmVyIGltcGxlbWVudGF0aW9ucyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gKlxuICogIEBwYXJhbSBzdHIge1N0cmluZ30gVGhlIHN0cmluZyB0byBjb25jYXRlbmF0ZS5cbiAqL1xuZnVuY3Rpb24gb3V0KHN0cikge1xuICB0aGlzLmxpdChzdHIpO1xufVxuXG4vKipcbiAqICBFc2NhcGUgYSBzdHJpbmcgZm9yIHRoZSB0YXJnZXQgcmVuZGVyZXIuXG4gKlxuICogIEFic3RyYWN0IGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IGNvbmNyZXRlIFxuICogIHJlbmRlcmVyIGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiAgQHBhcmFtIHN0ciB7U3RyaW5nfSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqL1xuZnVuY3Rpb24gZXNjKHN0cikge1xuICByZXR1cm4gc3RyO1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gcmVuZGVyO1xuUmVuZGVyZXIucHJvdG90eXBlLm91dCA9IG91dDtcblJlbmRlcmVyLnByb3RvdHlwZS5saXQgPSBsaXQ7XG5SZW5kZXJlci5wcm90b3R5cGUuY3IgID0gY3I7XG5SZW5kZXJlci5wcm90b3R5cGUuZXNjICA9IGVzYztcblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci9yZW5kZXJlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYW1sID0gcmVxdWlyZSgnLi9sYW1sLmpzJyk7XG5jb25zdCB7dGV4MmpheH0gPSByZXF1aXJlKCcuL3RleDJqYXguanMnKTtcbmNvbnN0IGNvbW1vbm1hcmsgPSByZXF1aXJlKCdjb21tb25tYXJrJyk7XG5cbmNvbnN0IHdvcmtlciA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgd2luZG93LnRleDJqYXggPSB0ZXgyamF4O1xuICB3aW5kb3cudGV4MmpheC5jb25maWcuZG9jID0gZG9jdW1lbnQ7XG4gIHdpbmRvdy50ZXgyamF4LmNvbmZpZy5pbmxpbmVNYXRoLnB1c2goWyckJywgJyQnXSk7XG4gIHdpbmRvdy50ZXgyamF4LmNvbmZpZy5wcm9jZXNzRXNjYXBlcyA9IHRydWU7XG4gIHdpbmRvdy50ZXgyamF4LlByZVByb2Nlc3MoKTtcblxuICBjb25zdCByZWFkZXIgPSBuZXcgY29tbW9ubWFyay5QYXJzZXIoKTtcbiAgY29uc3Qgd3JpdGVyID0gbmV3IGNvbW1vbm1hcmsuSHRtbFJlbmRlcmVyKCk7XG4gIGNvbnN0IHBhcnNlZCA9IHJlYWRlci5wYXJzZShkb2N1bWVudC5ib2R5LmlubmVySFRNTCk7XG4gIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gd3JpdGVyLnJlbmRlcihwYXJzZWQpO1xuXG4gIGxhbWwoZG9jdW1lbnQpO1xufTtcblxuaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgPyBwcm9jZXNzIDogMCkgPT09ICdbb2JqZWN0IHByb2Nlc3NdJyl7XG4gICAgbW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xufVxuZWxzZSB7XG4gIHdvcmtlcih3aW5kb3cpO1xuICB3aW5kb3cuTWF0aEpheCA9IHtcbiAgICAnZmFzdC1wcmV2aWV3Jzoge1xuICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICB9XG4gIH07XG4gIGNvbnN0IG1qID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIG1qLnNyYyA9XG4gICAgJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL21hdGhqYXgvMi43LjIvTWF0aEpheC5qcz9jb25maWc9VGVYLUFNU19DSFRNTC1mdWxsJztcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtaik7XG5cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dvcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcbmNvbnN0IG1ldGFkYXRhID0gcmVxdWlyZSgnLi9tZXRhZGF0YS5qcycpO1xuY29uc3QgcHJlYW1ibGUgPSByZXF1aXJlKCcuL3ByZWFtYmxlLmpzJyk7XG5jb25zdCBhYnN0cmFjdCA9IHJlcXVpcmUoJy4vYWJzdHJhY3QuanMnKTtcbmNvbnN0IHN0YXRlbWVudHMgPSByZXF1aXJlKCcuL3N0YXRlbWVudHMuanMnKTtcbmNvbnN0IGZpZ3VyZXMgPSByZXF1aXJlKCcuL2ZpZ3VyZXMuanMnKVxuY29uc3QgbGFtbCA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIG1ldGFkYXRhKGRvY3VtZW50KTtcbiAgcHJlYW1ibGUoZG9jdW1lbnQpO1xuICBhYnN0cmFjdChkb2N1bWVudCk7XG4gIHN0YXRlbWVudHMoZG9jdW1lbnQpO1xuICBmaWd1cmVzKGRvY3VtZW50LCBmYWxzZSk7XG5cbiAgLy8gY29udmVydCBuYW1lcyB0byBoZWFkaW5nc1xuICBjb25zdCBuYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25hbWUnKTtcbiAgZm9yIChsZXQgbmFtZSBvZiBuYW1lcykge1xuICAgIC8vIFRPRE8gbG9vayB1cCBjb3JyZWN0IGhlYWRpbmcgbGV2ZWxcbiAgICBjb25zdCByZW5hbWVkTm9kZSA9IHJlbmFtZVRhZyhkb2N1bWVudCwgbmFtZSwgJ2gyJyk7XG4gICAgcmVuYW1lZE5vZGUuY2xhc3NMaXN0LmFkZCgnbmFtZScpO1xuICB9XG5cbiAgLy8gY29udmVydCBibGFtZXNcbiAgLy8gVE9ETyBzaG91bGQgZGVwZW5kIG9uIGNtLmNzcz9cbiAgY29uc3QgYmxhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYmxhbWUnKTtcbiAgZm9yIChsZXQgYmxhbWUgb2YgYmxhbWVzKSB7XG4gICAgcmVuYW1lVGFnKGRvY3VtZW50LCBibGFtZSwgJ3NwYW4nKS5jbGFzc0xpc3QuYWRkKCdibGFtZScpO1xuICB9XG5cbiAgLy8gY29udmVydCByZWYgdG8gbGlua3NcbiAgY29uc3QgcmVmcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3JlZicpO1xuICBmb3IgKGxldCByZWYgb2YgcmVmcykge1xuICAgIGNvbnN0IHJlbmFtZWROb2RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCByZWYsICdhJyk7XG4gICAgY29uc3QgdGFyZ2V0SWQgPSByZW5hbWVkTm9kZS5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcbiAgICByZW5hbWVkTm9kZS5jbGFzc0xpc3QuYWRkKCdyZWYnKTtcbiAgICByZW5hbWVkTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyB0YXJnZXRJZCk7XG4gICAgcmVuYW1lZE5vZGUucmVtb3ZlQXR0cmlidXRlKCd0YXJnZXQnKTtcbiAgICB0YXJnZXRIZWFkaW5nID0gcmVuYW1lZE5vZGUuaW5uZXJIVE1MID0gdGFyZ2V0XG4gICAgICAucXVlcnlTZWxlY3RvcignaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuICAgIC8vIHN0cmlwIGJsYW1lXG4gICAgaWYgKHRhcmdldEhlYWRpbmcucXVlcnlTZWxlY3RvcignLmJsYW1lJykpXG4gICAgICB0YXJnZXRIZWFkaW5nLnJlbW92ZUNoaWxkKHRhcmdldEhlYWRpbmcucXVlcnlTZWxlY3RvcignLmJsYW1lJykpO1xuICAgIHJlbmFtZWROb2RlLmlubmVySFRNTCA9IHRhcmdldEhlYWRpbmcuaW5uZXJIVE1MO1xuICB9XG5cbiAgLy8gcG9wdWxhdGUgYmlibGlvZ3JhcGhpYyBjaXRhdGlvbnNcbiAgY29uc3QgYmliaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdiaWJsaW9ncmFwaHkgPiBhJyk7XG4gIGZvciAobGV0IFtpbmRleCwgYmliaXRlbV0gb2YgYmliaXRlbXMuZW50cmllcygpKSB7XG4gICAgY29uc3QgY291bnRlciA9ICdbJyArIChpbmRleCArIDEpICsgJ10nO1xuICAgIC8vIFRPRE8gY3JlYXRlIERMIGluIGJ1aWxkQmliIGluc3RlYWRcbiAgICBjb25zdCBjb3VudGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvdW50ZXIgKyAnICcpO1xuICAgIGJpYml0ZW0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY291bnRlck5vZGUsIGJpYml0ZW0pO1xuICAgIGNvbnN0IGNpdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICdjaXRlW3RhcmdldD1cIicgKyBiaWJpdGVtLmlkICsgJ1wiXSdcbiAgICApO1xuICAgIGZvciAobGV0IGNpdGUgb2YgY2l0ZXMpIHtcbiAgICAgIGNpdGUuaW5uZXJIVE1MID0gY291bnRlcjtcbiAgICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyBiaWJpdGVtLmlkKTtcbiAgICAgIGNpdGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoYW5jaG9yLCBjaXRlKTtcbiAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChjaXRlKTtcbiAgICB9XG4gIH1cblxuICAvLyBoYW5kbGUgKGZvb3Qpbm90ZXNcbiAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdub3RlJyk7XG4gIGZvciAobGV0IFtpbmRleCwgbm90ZV0gb2Ygbm90ZXMuZW50cmllcygpKSB7XG4gICAgY29uc3QgbmV3Tm90ZSA9IHJlbmFtZVRhZyhkb2N1bWVudCwgbm90ZSwgJ3NwYW4nKTtcbiAgICBuZXdOb3RlLmNsYXNzTGlzdC5hZGQoJ2Zvb3Rub3RlJyk7XG4gICAgbmV3Tm90ZS5pZCA9ICdmbi0nICsgaW5kZXg7XG4gICAgY29uc3QgZm5saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGZubGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyBuZXdOb3RlLmlkKTtcbiAgICBmbmxpbmsuaWQgPSAnZm5saW5rJyArIGluZGV4O1xuICAgIGZubGluay5pbm5lckhUTUwgPSAnPHN1cD4nICsgKGluZGV4ICsgMSkgKyAnPC9zdXA+JztcbiAgICBuZXdOb3RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZubGluaywgbmV3Tm90ZSk7XG4gICAgY29uc3QgYmFja2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYmFja2xpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgZm5saW5rLmlkKTtcbiAgICBiYWNrbGluay5pbm5lckhUTUwgPSAnPHN1cD7wn5SZPC9zdXA+JztcbiAgICBiYWNrbGluay5jbGFzc0xpc3QuYWRkKCdiYWNrbGluaycpO1xuICAgIG5ld05vdGUuYXBwZW5kQ2hpbGQoYmFja2xpbmspO1xuICAgIC8vIFRPRE8gbm90IGFjdHVhbGx5IGRpc2FibGluZyBjbGlja3NcbiAgICBmbmxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgICBiYWNrbGluay5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG5cbiAgY29uc3QgYnVpbGRCaWIgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBvbGRCaWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdiaWJsaW9ncmFwaHknKTtcbiAgICBjb25zdCBiaWIgPSByZW5hbWVUYWcoZG9jdW1lbnQsIG9sZEJpYiwgJ3NlY3Rpb24nKTtcbiAgICBiaWIuY2xhc3NMaXN0LmFkZCgnYmlibGlvZ3JhcGh5Jyk7XG4gICAgLy8gY29uc3QgaW5uZXIgPSBiaWIuaW5uZXJIVE1MO1xuICAgIC8vIGJpYi5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBoZWFkaW5nLmlubmVySFRNTCA9ICdCaWJsaW9ncmFwaHknO1xuICAgIGJpYi5pbnNlcnRCZWZvcmUoaGVhZGluZywgYmliLmZpcnN0Q2hpbGQpO1xuICAgIC8vIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIC8vIGJpYi5hcHBlbmRDaGlsZChsaXN0KTtcbiAgICAvLyBmb3IgKGxldCBzdHJpbmcgb2YgaW5uZXIuc3BsaXQoJ1xcbicpKXtcbiAgICAvLyAgICAgaWYgKHN0cmluZy50cmltKCkgPT09ICcnKSBjb250aW51ZVxuICAgIC8vICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAvLyAgICAgaXRlbS5pbm5lckhUTUwgPSBzdHJpbmcuc3Vic3RyaW5nKDIpO1xuICAgIC8vICAgICBsaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIC8vIH1cbiAgfTtcbiAgYnVpbGRCaWIoKTtcblxuICAvLyB3cmFwIHBocmFzaW5nIGNvbnRlbnQgaW4gcFxuXG4gIC8vIGNvbnN0IFBIUkFTSU5HX1RBR05BTUVTID0gWydhYmJyJywgJ2F1ZGlvJywgJ2InLCAnYmRvJywgJ2JyJywgJ2J1dHRvbicsICdjYW52YXMnLCAnY2l0ZScsICdjb2RlJywgJ2NvbW1hbmQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZm4nLCAnZW0nLCAnZW1iZWQnLCAnaScsICdpZnJhbWUnLCAnaW1nJywgJ2lucHV0JywgJ2tiZCcsICdrZXlnZW4nLCAnbGFiZWwnLCAnbWFyaycsICdtYXRoJywgJ21ldGVyJywgJ25vc2NyaXB0JywgJ29iamVjdCcsICdvdXRwdXQnLCAncHJvZ3Jlc3MnLCAncScsICdydWJ5JywgJ3NhbXAnLCAnc2NyaXB0JywgJ3NlbGVjdCcsICdzbWFsbCcsICdzcGFuJywgJ3N0cm9uZycsICdzdWInLCAnc3VwJywgJ3N2ZycsICd0ZXh0YXJlYScsICd0aW1lJywgJ3ZhcicsICd2aWRlbycsICd3YnInLCAnYScsICdkZWwnLCAnaW5zJ11cbiAgLy8gY29uc3QgY2FuZGlkYXRlcyA9IFtdLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdib2R5LCBzZWN0aW9uLCBmaWd1cmUnKTtcbiAgLy8gZm9yIChsZXQgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpe1xuICAvLyAgIC8vIGNvbnNvbGUubG9nKGNhbmRpZGF0ZSlcbiAgLy8gICBjb25zdCBjaGlsZE5vZGVzID0gY2FuZGlkYXRlLmNoaWxkTm9kZXM7XG4gIC8vICAgY29uc3QgYXJyYXlvZmFycmF5cyA9IFtbXV07XG4gIC8vICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIGNoaWxkTm9kZXMpe1xuICAvLyAgICAgY29uc3QgY3VycmVudEJhdGNoID0gYXJyYXlvZmFycmF5c1thcnJheW9mYXJyYXlzLmxlbmd0aCAtMV07XG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhjaGlsZE5vZGUpXG4gIC8vICAgICBpZiAoY2hpbGROb2RlLm5vZGVUeXBlID09PSAzKXtcbiAgLy8gICAgICAgY29uc3QgbGluZXMgPSBjaGlsZE5vZGUuZGF0YS5zcGxpdCgnXFxuJyk7XG4gIC8vICAgICAgIGxldCB0ZW1wID0gY2hpbGROb2RlO1xuICAvLyAgICAgICBmb3IgKGxldCBbaW5kZXgsIGxpbmVdIG9mIGxpbmVzLmVudHJpZXMoKSl7XG4gIC8vICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gIC8vICAgICAgICAgICBjaGlsZE5vZGUuZGF0YSA9IGxpbmU7XG4gIC8vICAgICAgICAgICBjdXJyZW50QmF0Y2gucHVzaChjaGlsZE5vZGUpO1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgICBlbHNlIHtcbiAgLy8gICAgICAgICAgIGNvbnN0IGxpbmVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGluZSk7XG4gIC8vICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQmVmb3JlJywgY2hpbGROb2RlLm5leHRTaWJsaW5nKVxuICAvLyAgICAgICAgICAgY2hpbGROb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmVFbGVtZW50LCB0ZW1wLm5leHRTaWJsaW5nKTtcbiAgLy8gICAgICAgICAgIHRlbXAgPSBsaW5lRWxlbWVudDtcbiAgLy8gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdBZnRlcicsIGNoaWxkTm9kZS5uZXh0U2libGluZylcbiAgLy8gICAgICAgICAgIGFycmF5b2ZhcnJheXMucHVzaChbbGluZUVsZW1lbnRdKTtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICAgIGVsc2UgaWYgKGNoaWxkTm9kZS5ub2RlVHlwZSA9PT0gOCB8fCBQSFJBU0lOR19UQUdOQU1FUy5pbmRleE9mKGNoaWxkTm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgLy8gICAgICAgY3VycmVudEJhdGNoLnB1c2goY2hpbGROb2RlKTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGVsc2UgaWYoY3VycmVudEJhdGNoLmxlbmd0aCA+IDApICBhcnJheW9mYXJyYXlzLnB1c2goW10pO1xuICAvLyAgIH1cbiAgLy8gICBjb25zb2xlLmxvZyhhcnJheW9mYXJyYXlzKVxuICAvLyAgIGZvciAobGV0IGFycmF5IG9mIGFycmF5b2ZhcnJheXMpe1xuICAvLyAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkgY29udGludWVcbiAgLy8gICAgIGNvbnN0IHBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIC8vICAgICBjb25zdCBmaXJzdCA9IGFycmF5WzBdO1xuICAvLyAgICAgLy8gY29uc29sZS5sb2coZmlyc3QpO1xuICAvLyAgICAgZmlyc3QucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocGFyYSwgZmlyc3QpO1xuICAvLyAgICAgZm9yIChub2RlIG9mIGFycmF5KSBwYXJhLmFwcGVuZENoaWxkKG5vZGUpO1xuICAvLyAgIH1cbiAgLy8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYW1sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGFtbC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gIC8vIGhhbmRsZSBtZXRhZGF0YVxuICBjb25zdCBhcnRpY2xlTWV0YSA9IEpTT04ucGFyc2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21ldGFkYXRhJykudGV4dCk7XG4gIGNvbnN0IGFydGljbGVJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBhcnRpY2xlSW5mby5jbGFzc0xpc3QuYWRkKCdhcnRpY2xlSW5mbycpO1xuICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShhcnRpY2xlSW5mbywgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcbiAgY29uc3QgYXJ0aWNsZVRpdGxlID0gYXJ0aWNsZU1ldGEudGl0bGU7XG4gIGlmIChhcnRpY2xlVGl0bGUpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk7XG4gICAgdGl0bGUuaW5uZXJIVE1MID0gYXJ0aWNsZVRpdGxlO1xuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID0gYXJ0aWNsZVRpdGxlO1xuICAgIGFydGljbGVJbmZvLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICB9XG4gIGNvbnN0IGFydGljbGVBdXRob3JzID0gYXJ0aWNsZU1ldGEuYXV0aG9ycyB8fCBbXTtcbiAgZm9yIChsZXQgYXV0aG9yIG9mIGFydGljbGVBdXRob3JzKSB7XG4gICAgY29uc3QgbmFtZSA9IGF1dGhvci5uYW1lO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhdXRob3IuYWRkcmVzcztcbiAgICBjb25zdCBhdXRob3JQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGF1dGhvclAuY2xhc3NMaXN0LmFkZCgnYXV0aG9yJyk7XG4gICAgYXV0aG9yUC5pbm5lckhUTUwgPSBuYW1lICsgJywgJyArIGFkZHJlc3MgKyAnLic7XG4gICAgYXJ0aWNsZUluZm8uYXBwZW5kQ2hpbGQoYXV0aG9yUCk7XG4gIH1cbiAgY29uc3Qga2V5d29yZHMgPSBhcnRpY2xlTWV0YS5rZXl3b3JkcztcbiAgY29uc3Qga3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGt3LmNsYXNzTGlzdC5hZGQoJ2tleXdvcmRzJyk7XG4gIGt3LmlubmVySFRNTCA9ICdLZXl3b3JkczogJyArIGtleXdvcmRzLmpvaW4oJywgJykgKyAnLic7XG4gIGFydGljbGVJbmZvLmFwcGVuZENoaWxkKGt3KTtcblxuICBjb25zdCBsaWNlbnNpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGxpY2Vuc2luZy5jbGFzc0xpc3QuYWRkKCdsaWNlbnNlJyk7XG5cbiAgbGljZW5zaW5nLmlubmVySFRNTCA9XG4gICAgJ0Rlcml2ZWQgZnJvbSA8YSBocmVmPVwiJyArXG4gICAgYXJ0aWNsZU1ldGEuc291cmNlICtcbiAgICAnXCI+JyArXG4gICAgYXJ0aWNsZU1ldGEuc291cmNlICtcbiAgICAnPC9hPiwgJyArXG4gICAgYXJ0aWNsZU1ldGEubGljZW5zZSArXG4gICAgJyBhbmQgbGljZW5zZWQgYXMgc3VjaC4nO1xuICBhcnRpY2xlSW5mby5hcHBlbmRDaGlsZChsaWNlbnNpbmcpO1xuXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWV0YWRhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQpe1xuICAvLyBwcmVhbWJsZVxuICByZW5hbWVUYWcoZG9jdW1lbnQsJ3ByZWFtYmxlJywgJ2RpdicsICdoaWRkZW4nKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ByZWFtYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHJlbmFtZVRhZyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvY3VtZW50KXtcbiAgLy8gYWJzdHJhY3RcbiAgcmVuYW1lVGFnKGRvY3VtZW50LCAnYWJzdHJhY3QnLCAnc2VjdGlvbicsIHRydWUpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYWJzdHJhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgcmVuYW1lVGFnIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb2N1bWVudCl7XG4gIC8vIGNvbnZlcnQgc3RhdGVtZW50cyB0byBzZWN0aW9uc1xuICBjb25zdCBzdGF0ZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAncHJvb2YsIHRoZW9yZW0sIHByb3Bvc2l0aW9uLCBsZW1tYSwgY29yb2xsYXJ5J1xuICApO1xuICBsZXQgc3RhdGVtZW50X2NvdW50ZXIgPSAwO1xuICBmb3IgKGxldCBzdGF0ZW1lbnQgb2Ygc3RhdGVtZW50cykge1xuICAgIGNvbnN0IHJlbmFtZWROb2RlID0gcmVuYW1lVGFnKGRvY3VtZW50LCBzdGF0ZW1lbnQsICdzZWN0aW9uJywgdHJ1ZSk7XG4gICAgY29uc3QgdGFnbmFtZSA9IHN0YXRlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgcmVuYW1lZE5vZGUuY2xhc3NMaXN0LmFkZCh0YWduYW1lKTtcbiAgICBjb25zdCBuYW1lID0gcmVuYW1lZE5vZGUucXVlcnlTZWxlY3RvcignbmFtZScpO1xuICAgIC8vIFRPRE8gbWF5YmUgbmFtZSBoYW5kbGluZyBpcyBtb3JlIGxpa2UgYSBoZWxwZXIgdGhhdCBzaG91bGQgYmUgcmVxdWlyZWQgYW5kIGFwcGxpZWQgaGVyZT9cbiAgICBpZiAobmFtZSkgY29udGludWU7XG4gICAgc3RhdGVtZW50X2NvdW50ZXIrKztcbiAgICAvLyBUT0RPIGxvb2sgdXAgY29ycmVjdCBoZWFkaW5nIGxldmVsXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCduYW1lJyk7XG4gICAgaGVhZGluZy5pZCA9IHRhZ25hbWUudG9Mb3dlckNhc2UoKSArICctJyArIHN0YXRlbWVudF9jb3VudGVyO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID1cbiAgICAgIHRhZ25hbWVbMF0udG9VcHBlckNhc2UoKSArIHRhZ25hbWUuc3Vic3RyaW5nKDEpICsgJyAnICsgc3RhdGVtZW50X2NvdW50ZXI7XG4gICAgcmVuYW1lZE5vZGUuaW5zZXJ0QmVmb3JlKGhlYWRpbmcsIHJlbmFtZWROb2RlLmZpcnN0Q2hpbGQpO1xuICB9XG5cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0YXRlbWVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9jdW1lbnQsIGJlbG93T3JBYm92ZSkge1xuICAvLyBoYW5kbGUgZmlndXJlc1xuICBjb25zdCBmaWd1cmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZmlndXJlJyk7XG4gIGZvciAobGV0IFtpbmRleCwgZmlndXJlXSBvZiBmaWd1cmVzLmVudHJpZXMoKSkge1xuICAgIGZpZ3VyZS5jbGFzc0xpc3QuYWRkKCdmaWd1cmUnKTtcbiAgICBjb25zdCBuYW1lID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ25hbWUnKTtcbiAgICBpZiAobmFtZSkgY29udGludWU7XG4gICAgLy8gVE9ETyBsb29rIHVwIGNvcnJlY3QgaGVhZGluZyBsZXZlbFxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnbmFtZScpO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID0gJ0ZpZ3VyZSAnICsgKGluZGV4ICsgMSk7XG4gICAgaWYgKGJlbG93T3JBYm92ZSkgZmlndXJlLmluc2VydEJlZm9yZShoZWFkaW5nLCBmaWd1cmUuZmlyc3RDaGlsZCk7XG4gICAgZWxzZSBmaWd1cmUuaW5zZXJ0QmVmb3JlKGhlYWRpbmcsIGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdpbWcnKS5uZXh0U2libGluZyk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9maWd1cmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBNYXRoSmF4IENvbnNvcnRpdW1cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciB0ZXgyamF4ID0gZnVuY3Rpb24gKCkge307XG5cbnRleDJqYXgucHJvdG90eXBlLmNvbmZpZyA9IHtcbiAgICBkb2M6IHt9LFxuICAgIGlubGluZU1hdGg6IFsgLy8gVGhlIHN0YXJ0L3N0b3AgcGFpcnMgZm9yIGluLWxpbmUgbWF0aFxuICAgICAgICAvLyAgICBbJyQnLCckJ10sICAgICAgICAgICAgICAgLy8gIChjb21tZW50IG91dCBhbnkgeW91IGRvbid0IHdhbnQsIG9yIGFkZCB5b3VyIG93biwgYnV0XG4gICAgICAgIFsnXFxcXCgnLCAnXFxcXCknXSAvLyAgYmUgc3VyZSB0aGF0IHlvdSBkb24ndCBoYXZlIGFuIGV4dHJhIGNvbW1hIGF0IHRoZSBlbmQpXG4gICAgXSxcblxuICAgIGRpc3BsYXlNYXRoOiBbIC8vIFRoZSBzdGFydC9zdG9wIHBhaXJzIGZvciBkaXNwbGF5IG1hdGhcbiAgICAgICAgWyckJCcsICckJCddLCAvLyAgKGNvbW1lbnQgb3V0IGFueSB5b3UgZG9uJ3Qgd2FudCwgb3IgYWRkIHlvdXIgb3duLCBidXRcbiAgICAgICAgWydcXFxcWycsICdcXFxcXSddIC8vICBiZSBzdXJlIHRoYXQgeW91IGRvbid0IGhhdmUgYW4gZXh0cmEgY29tbWEgYXQgdGhlIGVuZClcbiAgICBdLFxuXG4gICAgYmFsYW5jZUJyYWNlczogdHJ1ZSwgLy8gZGV0ZXJtaW5lcyB3aGV0aGVyIHRleDJqYXggcmVxdWlyZXMgYnJhY2VzIHRvIGJlXG4gICAgLy8gYmFsYW5jZWQgd2l0aGluIG1hdGggZGVsaW1pdGVycyAoYWxsb3dzIGZvciBuZXN0ZWRcbiAgICAvLyBkb2xsYXIgc2lnbnMpLiAgU2V0IHRvIGZhbHNlIHRvIGdldCBwcmUtdjIuMCBjb21wYXRpYmlsaXR5LlxuXG4gICAgc2tpcFRhZ3M6IFtcInNjcmlwdFwiLCBcIm5vc2NyaXB0XCIsIFwic3R5bGVcIiwgXCJ0ZXh0YXJlYVwiLCBcInByZVwiLCBcImNvZGVcIiwgXCJhbm5vdGF0aW9uXCIsIFwiYW5ub3RhdGlvbi14bWxcIl0sXG4gICAgLy8gVGhlIG5hbWVzIG9mIHRoZSB0YWdzIHdob3NlIGNvbnRlbnRzIHdpbGwgbm90IGJlXG4gICAgLy8gc2Nhbm5lZCBmb3IgbWF0aCBkZWxpbWl0ZXJzXG5cbiAgICBpZ25vcmVDbGFzczogXCJ0ZXgyamF4X2lnbm9yZVwiLCAvLyB0aGUgY2xhc3MgbmFtZSBvZiBlbGVtZW50cyB3aG9zZSBjb250ZW50cyBzaG91bGRcbiAgICAvLyBOT1QgYmUgcHJvY2Vzc2VkIGJ5IHRleDJqYXguICBOb3RlIHRoYXQgdGhpc1xuICAgIC8vIGlzIGEgcmVndWxhciBleHByZXNzaW9uLCBzbyBiZSBzdXJlIHRvIHF1b3RlIGFueVxuICAgIC8vIHJlZ2V4cCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuICAgIHByb2Nlc3NDbGFzczogXCJ0ZXgyamF4X3Byb2Nlc3NcIiwgLy8gdGhlIGNsYXNzIG5hbWUgb2YgZWxlbWVudHMgd2hvc2UgY29udGVudHMgU0hPVUxEXG4gICAgLy8gYmUgcHJvY2Vzc2VkIHdoZW4gdGhleSBhcHBlYXIgaW5zaWRlIG9uZXMgdGhhdFxuICAgIC8vIGFyZSBpZ25vcmVkLiAgTm90ZSB0aGF0IHRoaXMgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24sXG4gICAgLy8gc28gYmUgc3VyZSB0byBxdW90ZSBhbnkgcmVnZXhwIHNwZWNpYWwgY2hhcmFjdGVyc1xuXG4gICAgcHJvY2Vzc0VzY2FwZXM6IGZhbHNlLCAvLyBzZXQgdG8gdHJ1ZSB0byBhbGxvdyBcXCQgdG8gcHJvZHVjZSBhIGRvbGxhciB3aXRob3V0XG4gICAgLy8gICBzdGFydGluZyBpbi1saW5lIG1hdGggbW9kZVxuXG4gICAgcHJvY2Vzc0Vudmlyb25tZW50czogdHJ1ZSwgLy8gc2V0IHRvIHRydWUgdG8gcHJvY2VzcyBcXGJlZ2lue3h4eH0uLi5cXGVuZHt4eHh9IG91dHNpZGVcbiAgICAvLyAgIG9mIG1hdGggbW9kZSwgZmFsc2UgdG8gcHJldmVudCB0aGF0XG5cbiAgICBwcm9jZXNzUmVmczogdHJ1ZSwgLy8gc2V0IHRvIHRydWUgdG8gcHJvY2VzcyBcXHJlZnsuLi59IG91dHNpZGUgb2YgbWF0aCBtb2RlXG5cbn07XG5cbnRleDJqYXgucHJvdG90eXBlLlByZVByb2Nlc3MgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgKGVsZW1lbnQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNvbmZpZy5kb2MuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudClcbiAgICB9XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNvbmZpZy5kb2MuYm9keVxuICAgIH1cbiAgICBpZiAodGhpcy5jcmVhdGVQYXR0ZXJucygpKSB7XG4gICAgICAgIHRoaXMuc2NhbkVsZW1lbnQoZWxlbWVudCwgZWxlbWVudC5uZXh0U2libGluZylcbiAgICB9XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5jcmVhdGVQYXR0ZXJucyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhcnRzID0gW10sXG4gICAgICAgIHBhcnRzID0gW10sXG4gICAgICAgIGksIG0sIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMubWF0Y2ggPSB7fTtcbiAgICBmb3IgKGkgPSAwLCBtID0gY29uZmlnLmlubGluZU1hdGgubGVuZ3RoOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgIHN0YXJ0cy5wdXNoKHRoaXMucGF0dGVyblF1b3RlKGNvbmZpZy5pbmxpbmVNYXRoW2ldWzBdKSk7XG4gICAgICAgIHRoaXMubWF0Y2hbY29uZmlnLmlubGluZU1hdGhbaV1bMF1dID0ge1xuICAgICAgICAgICAgbW9kZTogXCJ0ZXhcIixcbiAgICAgICAgICAgIGVuZDogY29uZmlnLmlubGluZU1hdGhbaV1bMV0sXG4gICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLmVuZFBhdHRlcm4oY29uZmlnLmlubGluZU1hdGhbaV1bMV0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIG0gPSBjb25maWcuZGlzcGxheU1hdGgubGVuZ3RoOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgIHN0YXJ0cy5wdXNoKHRoaXMucGF0dGVyblF1b3RlKGNvbmZpZy5kaXNwbGF5TWF0aFtpXVswXSkpO1xuICAgICAgICB0aGlzLm1hdGNoW2NvbmZpZy5kaXNwbGF5TWF0aFtpXVswXV0gPSB7XG4gICAgICAgICAgICBtb2RlOiBcInRleDsgbW9kZT1kaXNwbGF5XCIsXG4gICAgICAgICAgICBlbmQ6IGNvbmZpZy5kaXNwbGF5TWF0aFtpXVsxXSxcbiAgICAgICAgICAgIHBhdHRlcm46IHRoaXMuZW5kUGF0dGVybihjb25maWcuZGlzcGxheU1hdGhbaV1bMV0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChzdGFydHMubGVuZ3RoKSB7XG4gICAgICAgIHBhcnRzLnB1c2goc3RhcnRzLnNvcnQodGhpcy5zb3J0TGVuZ3RoKS5qb2luKFwifFwiKSlcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5wcm9jZXNzRW52aXJvbm1lbnRzKSB7XG4gICAgICAgIHBhcnRzLnB1c2goXCJcXFxcXFxcXGJlZ2luXFxcXHsoW159XSopXFxcXH1cIilcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5wcm9jZXNzRXNjYXBlcykge1xuICAgICAgICBwYXJ0cy5wdXNoKFwiXFxcXFxcXFwqXFxcXFxcXFxcXFxcXFwkXCIpXG4gICAgfVxuICAgIGlmIChjb25maWcucHJvY2Vzc1JlZnMpIHtcbiAgICAgICAgcGFydHMucHVzaChcIlxcXFxcXFxcKGVxKT9yZWZcXFxce1tefV0qXFxcXH1cIilcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG5ldyBSZWdFeHAocGFydHMuam9pbihcInxcIiksIFwiZ1wiKTtcbiAgICB0aGlzLnNraXBUYWdzID0gbmV3IFJlZ0V4cChcIl4oXCIgKyBjb25maWcuc2tpcFRhZ3Muam9pbihcInxcIikgKyBcIikkXCIsIFwiaVwiKTtcbiAgICB2YXIgaWdub3JlID0gW107XG4gICAgaWYgKHRoaXMuY29uZmlnLnByZVJlbW92ZUNsYXNzKSB7XG4gICAgICAgIGlnbm9yZS5wdXNoKHRoaXMuY29uZmlnLnByZVJlbW92ZUNsYXNzKVxuICAgIH07XG4gICAgaWYgKGNvbmZpZy5pZ25vcmVDbGFzcykge1xuICAgICAgICBpZ25vcmUucHVzaChjb25maWcuaWdub3JlQ2xhc3MpXG4gICAgfVxuICAgIHRoaXMuaWdub3JlQ2xhc3MgPSAoaWdub3JlLmxlbmd0aCA/IG5ldyBSZWdFeHAoXCIoXnwgKShcIiArIGlnbm9yZS5qb2luKFwifFwiKSArIFwiKSggfCQpXCIpIDogL14kLyk7XG4gICAgdGhpcy5wcm9jZXNzQ2xhc3MgPSBuZXcgUmVnRXhwKFwiKF58ICkoXCIgKyBjb25maWcucHJvY2Vzc0NsYXNzICsgXCIpKCB8JClcIik7XG4gICAgcmV0dXJuIChwYXJ0cy5sZW5ndGggPiAwKTtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLnBhdHRlcm5RdW90ZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvKFtcXF4kKCl7fSsqP1xcLXxcXFtcXF1cXDpcXFxcXSkvZywgJ1xcXFwkMScpXG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5lbmRQYXR0ZXJuID0gZnVuY3Rpb24gKGVuZCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHRoaXMucGF0dGVyblF1b3RlKGVuZCkgKyBcInxcXFxcXFxcXC58W3t9XVwiLCBcImdcIik7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5zb3J0TGVuZ3RoID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoXG4gICAgfVxuICAgIHJldHVybiAoYSA9PSBiID8gMCA6IChhIDwgYiA/IC0xIDogMSkpO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuc2NhbkVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgc3RvcCwgaWdub3JlKSB7XG4gICAgdmFyIGNuYW1lLCB0bmFtZSwgaWdub3JlQ2hpbGQsIHByb2Nlc3M7XG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudCAhPSBzdG9wKSB7XG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICcjdGV4dCcpIHtcbiAgICAgICAgICAgIGlmICghaWdub3JlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuc2NhblRleHQoZWxlbWVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNuYW1lID0gKHR5cGVvZiAoZWxlbWVudC5jbGFzc05hbWUpID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IGVsZW1lbnQuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHRuYW1lID0gKHR5cGVvZiAoZWxlbWVudC50YWdOYW1lKSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiXCIgOiBlbGVtZW50LnRhZ05hbWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoY25hbWUpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY25hbWUgPSBTdHJpbmcoY25hbWUpXG4gICAgICAgICAgICB9IC8vIGpzeGdyYXBoIHVzZXMgbm9uLXN0cmluZyBjbGFzcyBuYW1lcyFcbiAgICAgICAgICAgIHByb2Nlc3MgPSB0aGlzLnByb2Nlc3NDbGFzcy5leGVjKGNuYW1lKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmZpcnN0Q2hpbGQgJiYgIWNuYW1lLm1hdGNoKC8oXnwgKU1hdGhKYXgvKSAmJlxuICAgICAgICAgICAgICAgIChwcm9jZXNzIHx8ICF0aGlzLnNraXBUYWdzLmV4ZWModG5hbWUpKSkge1xuICAgICAgICAgICAgICAgIGlnbm9yZUNoaWxkID0gKGlnbm9yZSB8fCB0aGlzLmlnbm9yZUNsYXNzLmV4ZWMoY25hbWUpKSAmJiAhcHJvY2VzcztcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5FbGVtZW50KGVsZW1lbnQuZmlyc3RDaGlsZCwgc3RvcCwgaWdub3JlQ2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5uZXh0U2libGluZ1xuICAgICAgICB9XG4gICAgfVxufTtcblxudGV4MmpheC5wcm90b3R5cGUuc2NhblRleHQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lm5vZGVWYWx1ZS5yZXBsYWNlKC9cXHMrLywgJycpID09ICcnKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50XG4gICAgfVxuICAgIHZhciBtYXRjaCwgcHJldjtcbiAgICB0aGlzLnNlYXJjaCA9IHtcbiAgICAgICAgc3RhcnQ6IHRydWVcbiAgICB9O1xuICAgIHRoaXMucGF0dGVybiA9IHRoaXMuc3RhcnQ7XG4gICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJyN0ZXh0JyAmJlxuICAgICAgICAgICAgKG1hdGNoID0gdGhpcy5wYXR0ZXJuLmV4ZWMoZWxlbWVudC5ub2RlVmFsdWUpKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuc3RhcnRNYXRjaChtYXRjaCwgZWxlbWVudClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZW5kTWF0Y2gobWF0Y2gsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoLm1hdGNoZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmVuY2xvc2VNYXRoKGVsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBwcmV2ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5uZXh0U2libGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnQgJiYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2JyJyB8fFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICcjY29tbWVudCcpKTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVOYW1lICE9PSAnI3RleHQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNlYXJjaC5jbG9zZSA/IHRoaXMucHJldkVuZE1hdGNoKCkgOiBwcmV2KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuc3RhcnRNYXRjaCA9IGZ1bmN0aW9uIChtYXRjaCwgZWxlbWVudCkge1xuICAgIHZhciBkZWxpbSA9IHRoaXMubWF0Y2hbbWF0Y2hbMF1dO1xuICAgIGlmIChkZWxpbSAhPSBudWxsKSB7IC8vIGEgc3RhcnQgZGVsaW1pdGVyXG4gICAgICAgIHRoaXMuc2VhcmNoID0ge1xuICAgICAgICAgICAgZW5kOiBkZWxpbS5lbmQsXG4gICAgICAgICAgICBtb2RlOiBkZWxpbS5tb2RlLFxuICAgICAgICAgICAgcGNvdW50OiAwLFxuICAgICAgICAgICAgb3BlbjogZWxlbWVudCxcbiAgICAgICAgICAgIG9sZW46IG1hdGNoWzBdLmxlbmd0aCxcbiAgICAgICAgICAgIG9wb3M6IHRoaXMucGF0dGVybi5sYXN0SW5kZXggLSBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zd2l0Y2hQYXR0ZXJuKGRlbGltLnBhdHRlcm4pO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0uc3Vic3RyKDAsIDYpID09PSBcIlxcXFxiZWdpblwiKSB7IC8vIFxcYmVnaW57Li4ufVxuICAgICAgICB0aGlzLnNlYXJjaCA9IHtcbiAgICAgICAgICAgIGVuZDogXCJcXFxcZW5ke1wiICsgbWF0Y2hbMV0gKyBcIn1cIixcbiAgICAgICAgICAgIG1vZGU6IFwiVGVYXCIsXG4gICAgICAgICAgICBwY291bnQ6IDAsXG4gICAgICAgICAgICBvcGVuOiBlbGVtZW50LFxuICAgICAgICAgICAgb2xlbjogMCxcbiAgICAgICAgICAgIG9wb3M6IHRoaXMucGF0dGVybi5sYXN0SW5kZXggLSBtYXRjaFswXS5sZW5ndGgsXG4gICAgICAgICAgICBpc0JlZ2luRW5kOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3dpdGNoUGF0dGVybih0aGlzLmVuZFBhdHRlcm4odGhpcy5zZWFyY2guZW5kKSk7XG4gICAgfSBlbHNlIGlmIChtYXRjaFswXS5zdWJzdHIoMCwgNCkgPT09IFwiXFxcXHJlZlwiIHx8IG1hdGNoWzBdLnN1YnN0cigwLCA2KSA9PT0gXCJcXFxcZXFyZWZcIikge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHtcbiAgICAgICAgICAgIG1vZGU6IFwiXCIsXG4gICAgICAgICAgICBlbmQ6IFwiXCIsXG4gICAgICAgICAgICBvcGVuOiBlbGVtZW50LFxuICAgICAgICAgICAgcGNvdW50OiAwLFxuICAgICAgICAgICAgb2xlbjogMCxcbiAgICAgICAgICAgIG9wb3M6IHRoaXMucGF0dGVybi5sYXN0SW5kZXggLSBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lbmRNYXRjaChbXCJcIl0sIGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7IC8vIGVzY2FwZWQgZG9sbGFyIHNpZ25zXG4gICAgICAgIC8vIHB1dCAkIGluIGEgc3BhbiBzbyBpdCBkb2Vzbid0IGdldCBwcm9jZXNzZWQgYWdhaW5cbiAgICAgICAgLy8gc3BsaXQgb2ZmIGJhY2tzbGFzaGVzIHNvIHRoZXkgZG9uJ3QgZ2V0IHJlbW92ZWQgbGF0ZXJcbiAgICAgICAgdmFyIHNsYXNoZXMgPSBtYXRjaFswXS5zdWJzdHIoMCwgbWF0Y2hbMF0ubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICBuLCBzcGFuO1xuICAgICAgICBpZiAoc2xhc2hlcy5sZW5ndGggJSAyID09PSAwKSB7XG4gICAgICAgICAgICBzcGFuID0gW3NsYXNoZXMucmVwbGFjZSgvXFxcXFxcXFwvZywgXCJcXFxcXCIpXTtcbiAgICAgICAgICAgIG4gPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGFuID0gW3NsYXNoZXMuc3Vic3RyKDEpLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKSwgXCIkXCJdO1xuICAgICAgICAgICAgbiA9IDBcbiAgICAgICAgfVxuICAgICAgICBlc2NhcGVkID0gdGhpcy5jb25maWcuZG9jLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBlc2NhcGVkLmlubmVySFRNTCA9IHNwYW4uam9pbignJyk7XG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5jb25maWcuZG9jLmNyZWF0ZVRleHROb2RlKGVsZW1lbnQubm9kZVZhbHVlLnN1YnN0cigwLCBtYXRjaC5pbmRleCkpO1xuICAgICAgICBlbGVtZW50Lm5vZGVWYWx1ZSA9IGVsZW1lbnQubm9kZVZhbHVlLnN1YnN0cihtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCAtIG4pO1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVzY2FwZWQsIGVsZW1lbnQpO1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRleHQsIGVzY2FwZWQpO1xuICAgICAgICB0aGlzLnBhdHRlcm4ubGFzdEluZGV4ID0gbjtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5lbmRNYXRjaCA9IGZ1bmN0aW9uIChtYXRjaCwgZWxlbWVudCkge1xuICAgIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaDtcbiAgICBpZiAobWF0Y2hbMF0gPT0gc2VhcmNoLmVuZCkge1xuICAgICAgICBpZiAoIXNlYXJjaC5jbG9zZSB8fCBzZWFyY2gucGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzZWFyY2guY2xvc2UgPSBlbGVtZW50O1xuICAgICAgICAgICAgc2VhcmNoLmNwb3MgPSB0aGlzLnBhdHRlcm4ubGFzdEluZGV4O1xuICAgICAgICAgICAgc2VhcmNoLmNsZW4gPSAoc2VhcmNoLmlzQmVnaW5FbmQgPyAwIDogbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VhcmNoLnBjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgc2VhcmNoLm1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZW5jbG9zZU1hdGgoZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFBhdHRlcm4odGhpcy5zdGFydCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSBcIntcIikge1xuICAgICAgICBzZWFyY2gucGNvdW50KytcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSBcIn1cIiAmJiBzZWFyY2gucGNvdW50KSB7XG4gICAgICAgIHNlYXJjaC5wY291bnQtLVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG50ZXgyamF4LnByb3RvdHlwZS5wcmV2RW5kTWF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWFyY2gubWF0Y2hlZCA9IHRydWU7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVuY2xvc2VNYXRoKHRoaXMuc2VhcmNoLmNsb3NlKTtcbiAgICB0aGlzLnN3aXRjaFBhdHRlcm4odGhpcy5zdGFydCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG50ZXgyamF4LnByb3RvdHlwZS5zd2l0Y2hQYXR0ZXJuID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICBwYXR0ZXJuLmxhc3RJbmRleCA9IHRoaXMucGF0dGVybi5sYXN0SW5kZXg7XG4gICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVybjtcbiAgICB0aGlzLnNlYXJjaC5zdGFydCA9IChwYXR0ZXJuID09PSB0aGlzLnN0YXJ0KTtcbn07XG5cbnRleDJqYXgucHJvdG90eXBlLmVuY2xvc2VNYXRoID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2gsXG4gICAgICAgIGNsb3NlID0gc2VhcmNoLmNsb3NlLFxuICAgICAgICBDTE9TRSwgbWF0aDtcbiAgICBpZiAoc2VhcmNoLmNwb3MgPT09IGNsb3NlLmxlbmd0aCkge1xuICAgICAgICBjbG9zZSA9IGNsb3NlLm5leHRTaWJsaW5nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2UgPSBjbG9zZS5zcGxpdFRleHQoc2VhcmNoLmNwb3MpXG4gICAgfVxuICAgIGlmICghY2xvc2UpIHtcbiAgICAgICAgQ0xPU0UgPSBjbG9zZSA9IHNlYXJjaC5jbG9zZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuY29uZmlnLmRvYy5jcmVhdGVUZXh0Tm9kZShcIlwiKSk7XG4gICAgfVxuICAgIHNlYXJjaC5jbG9zZSA9IGNsb3NlO1xuICAgIG1hdGggPSAoc2VhcmNoLm9wb3MgPyBzZWFyY2gub3Blbi5zcGxpdFRleHQoc2VhcmNoLm9wb3MpIDogc2VhcmNoLm9wZW4pO1xuICAgIHdoaWxlIChtYXRoLm5leHRTaWJsaW5nICYmIG1hdGgubmV4dFNpYmxpbmcgIT09IGNsb3NlKSB7XG4gICAgICAgIGlmIChtYXRoLm5leHRTaWJsaW5nLm5vZGVWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG1hdGgubmV4dFNpYmxpbmcubm9kZU5hbWUgPT09IFwiI2NvbW1lbnRcIikge1xuICAgICAgICAgICAgICAgIG1hdGgubm9kZVZhbHVlICs9IG1hdGgubmV4dFNpYmxpbmcubm9kZVZhbHVlLnJlcGxhY2UoL15cXFtDREFUQVxcWygoLnxcXG58XFxyKSopXFxdXFxdJC8sIFwiJDFcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGgubm9kZVZhbHVlICs9IG1hdGgubmV4dFNpYmxpbmcubm9kZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubXNpZU5ld2xpbmVCdWcpIHtcbiAgICAgICAgICAgIG1hdGgubm9kZVZhbHVlICs9IChtYXRoLm5leHRTaWJsaW5nLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiYnJcIiA/IFwiXFxuXCIgOiBcIiBcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXRoLm5vZGVWYWx1ZSArPSBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBtYXRoLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWF0aC5uZXh0U2libGluZyk7XG4gICAgfVxuICAgIHZhciBUZVggPSBtYXRoLm5vZGVWYWx1ZS5zdWJzdHIoc2VhcmNoLm9sZW4sIG1hdGgubm9kZVZhbHVlLmxlbmd0aCAtIHNlYXJjaC5vbGVuIC0gc2VhcmNoLmNsZW4pO1xuICAgIG1hdGgucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtYXRoKTtcbiAgICBtYXRoID0gdGhpcy5jcmVhdGVNYXRoVGFnKHNlYXJjaC5tb2RlLCBUZVgpO1xuICAgIHRoaXMuc2VhcmNoID0ge307XG4gICAgdGhpcy5wYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKENMT1NFKSB7XG4gICAgICAgIENMT1NFLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoQ0xPU0UpXG4gICAgfVxuICAgIHJldHVybiBtYXRoO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuaW5zZXJ0Tm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoO1xuICAgIHNlYXJjaC5jbG9zZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBzZWFyY2guY2xvc2UpO1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuY3JlYXRlTWF0aFRhZyA9IGZ1bmN0aW9uIChtb2RlLCB0ZXgpIHtcbiAgICB2YXIgc2NyaXB0ID0gdGhpcy5jb25maWcuZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgc2NyaXB0LnR5cGUgPSAnbWF0aC8nICsgbW9kZTtcbiAgICBzY3JpcHQudGV4dCA9IHRleDtcbiAgICB0aGlzLmluc2VydE5vZGUoc2NyaXB0KTtcbiAgICByZXR1cm4gc2NyaXB0O1xufTtcblxudGV4MmpheC5wcm90b3R5cGUuZmlsdGVyUHJldmlldyA9IGZ1bmN0aW9uICh0ZXgpIHtcbiAgICByZXR1cm4gdGV4XG59O1xuXG5leHBvcnRzLnRleDJqYXggPSBuZXcgdGV4MmpheCgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGV4MmpheC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGNvbW1vbm1hcmsuanMgLSBDb21tb21NYXJrIGluIEphdmFTY3JpcHRcbi8vIENvcHlyaWdodCAoQykgMjAxNCBKb2huIE1hY0ZhcmxhbmVcbi8vIExpY2Vuc2U6IEJTRDMuXG5cbi8vIEJhc2ljIHVzYWdlOlxuLy9cbi8vIHZhciBjb21tb25tYXJrID0gcmVxdWlyZSgnY29tbW9ubWFyaycpO1xuLy8gdmFyIHBhcnNlciA9IG5ldyBjb21tb25tYXJrLlBhcnNlcigpO1xuLy8gdmFyIHJlbmRlcmVyID0gbmV3IGNvbW1vbm1hcmsuSHRtbFJlbmRlcmVyKCk7XG4vLyBjb25zb2xlLmxvZyhyZW5kZXJlci5yZW5kZXIocGFyc2VyLnBhcnNlKCdIZWxsbyAqd29ybGQqJykpKTtcblxubW9kdWxlLmV4cG9ydHMuTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xubW9kdWxlLmV4cG9ydHMuUGFyc2VyID0gcmVxdWlyZSgnLi9ibG9ja3MnKTtcbm1vZHVsZS5leHBvcnRzLkh0bWxSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyL2h0bWwnKTtcbm1vZHVsZS5leHBvcnRzLlhtbFJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXIveG1sJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG52YXIgdW5lc2NhcGVTdHJpbmcgPSByZXF1aXJlKCcuL2NvbW1vbicpLnVuZXNjYXBlU3RyaW5nO1xudmFyIE9QRU5UQUcgPSByZXF1aXJlKCcuL2NvbW1vbicpLk9QRU5UQUc7XG52YXIgQ0xPU0VUQUcgPSByZXF1aXJlKCcuL2NvbW1vbicpLkNMT1NFVEFHO1xuXG52YXIgQ09ERV9JTkRFTlQgPSA0O1xuXG52YXIgQ19UQUIgPSA5O1xudmFyIENfTkVXTElORSA9IDEwO1xudmFyIENfR1JFQVRFUlRIQU4gPSA2MjtcbnZhciBDX0xFU1NUSEFOID0gNjA7XG52YXIgQ19TUEFDRSA9IDMyO1xudmFyIENfT1BFTl9CUkFDS0VUID0gOTE7XG5cbnZhciBJbmxpbmVQYXJzZXIgPSByZXF1aXJlKCcuL2lubGluZXMnKTtcblxudmFyIHJlSHRtbEJsb2NrT3BlbiA9IFtcbiAgIC8uLywgLy8gZHVtbXkgZm9yIDBcbiAgIC9ePCg/OnNjcmlwdHxwcmV8c3R5bGUpKD86XFxzfD58JCkvaSxcbiAgIC9ePCEtLS8sXG4gICAvXjxbP10vLFxuICAgL148IVtBLVpdLyxcbiAgIC9ePCFcXFtDREFUQVxcWy8sXG4gICAvXjxbL10/KD86YWRkcmVzc3xhcnRpY2xlfGFzaWRlfGJhc2V8YmFzZWZvbnR8YmxvY2txdW90ZXxib2R5fGNhcHRpb258Y2VudGVyfGNvbHxjb2xncm91cHxkZHxkZXRhaWxzfGRpYWxvZ3xkaXJ8ZGl2fGRsfGR0fGZpZWxkc2V0fGZpZ2NhcHRpb258ZmlndXJlfGZvb3Rlcnxmb3JtfGZyYW1lfGZyYW1lc2V0fGhbMTIzNDU2XXxoZWFkfGhlYWRlcnxocnxodG1sfGlmcmFtZXxsZWdlbmR8bGl8bGlua3xtYWlufG1lbnV8bWVudWl0ZW18bWV0YXxuYXZ8bm9mcmFtZXN8b2x8b3B0Z3JvdXB8b3B0aW9ufHB8cGFyYW18c2VjdGlvbnxzb3VyY2V8dGl0bGV8c3VtbWFyeXx0YWJsZXx0Ym9keXx0ZHx0Zm9vdHx0aHx0aGVhZHx0aXRsZXx0cnx0cmFja3x1bCkoPzpcXHN8Wy9dP1s+XXwkKS9pLFxuICAgIG5ldyBSZWdFeHAoJ14oPzonICsgT1BFTlRBRyArICd8JyArIENMT1NFVEFHICsgJylcXFxccyokJywgJ2knKVxuXTtcblxudmFyIHJlSHRtbEJsb2NrQ2xvc2UgPSBbXG4gICAvLi8sIC8vIGR1bW15IGZvciAwXG4gICAvPFxcLyg/OnNjcmlwdHxwcmV8c3R5bGUpPi9pLFxuICAgLy0tPi8sXG4gICAvXFw/Pi8sXG4gICAvPi8sXG4gICAvXFxdXFxdPi9cbl07XG5cbnZhciByZVRoZW1hdGljQnJlYWsgPSAvXig/Oig/OlxcKlsgXFx0XSopezMsfXwoPzpfWyBcXHRdKil7Myx9fCg/Oi1bIFxcdF0qKXszLH0pWyBcXHRdKiQvO1xuXG52YXIgcmVNYXliZVNwZWNpYWwgPSAvXlsjYH4qK189PD4wLTktXS87XG5cbnZhciByZU5vblNwYWNlID0gL1teIFxcdFxcZlxcdlxcclxcbl0vO1xuXG52YXIgcmVCdWxsZXRMaXN0TWFya2VyID0gL15bKistXS87XG5cbnZhciByZU9yZGVyZWRMaXN0TWFya2VyID0gL14oXFxkezEsOX0pKFsuKV0pLztcblxudmFyIHJlQVRYSGVhZGluZ01hcmtlciA9IC9eI3sxLDZ9KD86WyBcXHRdK3wkKS87XG5cbnZhciByZUNvZGVGZW5jZSA9IC9eYHszLH0oPyEuKmApfF5+ezMsfSg/IS4qfikvO1xuXG52YXIgcmVDbG9zaW5nQ29kZUZlbmNlID0gL14oPzpgezMsfXx+ezMsfSkoPz0gKiQpLztcblxudmFyIHJlU2V0ZXh0SGVhZGluZ0xpbmUgPSAvXig/Oj0rfC0rKVsgXFx0XSokLztcblxudmFyIHJlTGluZUVuZGluZyA9IC9cXHJcXG58XFxufFxcci87XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiBzdHJpbmcgY29udGFpbnMgb25seSBzcGFjZSBjaGFyYWN0ZXJzLlxudmFyIGlzQmxhbmsgPSBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuICEocmVOb25TcGFjZS50ZXN0KHMpKTtcbn07XG5cbnZhciBpc1NwYWNlT3JUYWIgPSBmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuIGMgPT09IENfU1BBQ0UgfHwgYyA9PT0gQ19UQUI7XG59O1xuXG52YXIgcGVlayA9IGZ1bmN0aW9uKGxuLCBwb3MpIHtcbiAgICBpZiAocG9zIDwgbG4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBsbi5jaGFyQ29kZUF0KHBvcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn07XG5cbi8vIERPQyBQQVJTRVJcblxuLy8gVGhlc2UgYXJlIG1ldGhvZHMgb2YgYSBQYXJzZXIgb2JqZWN0LCBkZWZpbmVkIGJlbG93LlxuXG4vLyBSZXR1cm5zIHRydWUgaWYgYmxvY2sgZW5kcyB3aXRoIGEgYmxhbmsgbGluZSwgZGVzY2VuZGluZyBpZiBuZWVkZWRcbi8vIGludG8gbGlzdHMgYW5kIHN1Ymxpc3RzLlxudmFyIGVuZHNXaXRoQmxhbmtMaW5lID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB3aGlsZSAoYmxvY2spIHtcbiAgICAgICAgaWYgKGJsb2NrLl9sYXN0TGluZUJsYW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdCA9IGJsb2NrLnR5cGU7XG4gICAgICAgIGlmICh0ID09PSAnbGlzdCcgfHwgdCA9PT0gJ2l0ZW0nKSB7XG4gICAgICAgICAgICBibG9jayA9IGJsb2NrLl9sYXN0Q2hpbGQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBBZGQgYSBsaW5lIHRvIHRoZSBibG9jayBhdCB0aGUgdGlwLiAgV2UgYXNzdW1lIHRoZSB0aXBcbi8vIGNhbiBhY2NlcHQgbGluZXMgLS0gdGhhdCBjaGVjayBzaG91bGQgYmUgZG9uZSBiZWZvcmUgY2FsbGluZyB0aGlzLlxudmFyIGFkZExpbmUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYikge1xuICAgICAgdGhpcy5vZmZzZXQgKz0gMTsgLy8gc2tpcCBvdmVyIHRhYlxuICAgICAgLy8gYWRkIHNwYWNlIGNoYXJhY3RlcnM6XG4gICAgICB2YXIgY2hhcnNUb1RhYiA9IDQgLSAodGhpcy5jb2x1bW4gJSA0KTtcbiAgICAgIHRoaXMudGlwLl9zdHJpbmdfY29udGVudCArPSAoJyAnLnJlcGVhdChjaGFyc1RvVGFiKSk7XG4gICAgfVxuICAgIHRoaXMudGlwLl9zdHJpbmdfY29udGVudCArPSB0aGlzLmN1cnJlbnRMaW5lLnNsaWNlKHRoaXMub2Zmc2V0KSArICdcXG4nO1xufTtcblxuLy8gQWRkIGJsb2NrIG9mIHR5cGUgdGFnIGFzIGEgY2hpbGQgb2YgdGhlIHRpcC4gIElmIHRoZSB0aXAgY2FuJ3Rcbi8vIGFjY2VwdCBjaGlsZHJlbiwgY2xvc2UgYW5kIGZpbmFsaXplIGl0IGFuZCB0cnkgaXRzIHBhcmVudCxcbi8vIGFuZCBzbyBvbiB0aWwgd2UgZmluZCBhIGJsb2NrIHRoYXQgY2FuIGFjY2VwdCBjaGlsZHJlbi5cbnZhciBhZGRDaGlsZCA9IGZ1bmN0aW9uKHRhZywgb2Zmc2V0KSB7XG4gICAgd2hpbGUgKCF0aGlzLmJsb2Nrc1t0aGlzLnRpcC50eXBlXS5jYW5Db250YWluKHRhZykpIHtcbiAgICAgICAgdGhpcy5maW5hbGl6ZSh0aGlzLnRpcCwgdGhpcy5saW5lTnVtYmVyIC0gMSk7XG4gICAgfVxuXG4gICAgdmFyIGNvbHVtbl9udW1iZXIgPSBvZmZzZXQgKyAxOyAvLyBvZmZzZXQgMCA9IGNvbHVtbiAxXG4gICAgdmFyIG5ld0Jsb2NrID0gbmV3IE5vZGUodGFnLCBbW3RoaXMubGluZU51bWJlciwgY29sdW1uX251bWJlcl0sIFswLCAwXV0pO1xuICAgIG5ld0Jsb2NrLl9zdHJpbmdfY29udGVudCA9ICcnO1xuICAgIHRoaXMudGlwLmFwcGVuZENoaWxkKG5ld0Jsb2NrKTtcbiAgICB0aGlzLnRpcCA9IG5ld0Jsb2NrO1xuICAgIHJldHVybiBuZXdCbG9jaztcbn07XG5cbi8vIFBhcnNlIGEgbGlzdCBtYXJrZXIgYW5kIHJldHVybiBkYXRhIG9uIHRoZSBtYXJrZXIgKHR5cGUsXG4vLyBzdGFydCwgZGVsaW1pdGVyLCBidWxsZXQgY2hhcmFjdGVyLCBwYWRkaW5nKSBvciBudWxsLlxudmFyIHBhcnNlTGlzdE1hcmtlciA9IGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgdmFyIHJlc3QgPSBwYXJzZXIuY3VycmVudExpbmUuc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgdmFyIG1hdGNoO1xuICAgIHZhciBuZXh0YztcbiAgICB2YXIgc3BhY2VzU3RhcnRDb2w7XG4gICAgdmFyIHNwYWNlc1N0YXJ0T2Zmc2V0O1xuICAgIHZhciBkYXRhID0geyB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICB0aWdodDogdHJ1ZSwgIC8vIGxpc3RzIGFyZSB0aWdodCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgIGJ1bGxldENoYXI6IG51bGwsXG4gICAgICAgICAgICAgICAgIHN0YXJ0OiBudWxsLFxuICAgICAgICAgICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgIHBhZGRpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgIG1hcmtlck9mZnNldDogcGFyc2VyLmluZGVudCB9O1xuICAgIGlmICgobWF0Y2ggPSByZXN0Lm1hdGNoKHJlQnVsbGV0TGlzdE1hcmtlcikpKSB7XG4gICAgICAgIGRhdGEudHlwZSA9ICdidWxsZXQnO1xuICAgICAgICBkYXRhLmJ1bGxldENoYXIgPSBtYXRjaFswXVswXTtcblxuICAgIH0gZWxzZSBpZiAoKG1hdGNoID0gcmVzdC5tYXRjaChyZU9yZGVyZWRMaXN0TWFya2VyKSkgJiZcbiAgICAgICAgICAgICAgICAoY29udGFpbmVyLnR5cGUgIT09ICdwYXJhZ3JhcGgnIHx8XG4gICAgICAgICAgICAgICAgIG1hdGNoWzFdID09PSAnMScpKSB7XG4gICAgICAgIGRhdGEudHlwZSA9ICdvcmRlcmVkJztcbiAgICAgICAgZGF0YS5zdGFydCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICAgICAgZGF0YS5kZWxpbWl0ZXIgPSBtYXRjaFsyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgc3BhY2VzIGFmdGVyXG4gICAgbmV4dGMgPSBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm5leHROb25zcGFjZSArIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgaWYgKCEobmV4dGMgPT09IC0xIHx8IG5leHRjID09PSBDX1RBQiB8fCBuZXh0YyA9PT0gQ19TUEFDRSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gaWYgaXQgaW50ZXJydXB0cyBwYXJhZ3JhcGgsIG1ha2Ugc3VyZSBmaXJzdCBsaW5lIGlzbid0IGJsYW5rXG4gICAgaWYgKGNvbnRhaW5lci50eXBlID09PSAncGFyYWdyYXBoJyAmJiAhcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UgKyBtYXRjaFswXS5sZW5ndGgpLm1hdGNoKHJlTm9uU3BhY2UpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHdlJ3ZlIGdvdCBhIG1hdGNoISBhZHZhbmNlIG9mZnNldCBhbmQgY2FsY3VsYXRlIHBhZGRpbmdcbiAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpOyAvLyB0byBzdGFydCBvZiBtYXJrZXJcbiAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChtYXRjaFswXS5sZW5ndGgsIHRydWUpOyAvLyB0byBlbmQgb2YgbWFya2VyXG4gICAgc3BhY2VzU3RhcnRDb2wgPSBwYXJzZXIuY29sdW1uO1xuICAgIHNwYWNlc1N0YXJ0T2Zmc2V0ID0gcGFyc2VyLm9mZnNldDtcbiAgICBkbyB7XG4gICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIHRydWUpO1xuICAgICAgICBuZXh0YyA9IHBlZWsocGFyc2VyLmN1cnJlbnRMaW5lLCBwYXJzZXIub2Zmc2V0KTtcbiAgICB9IHdoaWxlIChwYXJzZXIuY29sdW1uIC0gc3BhY2VzU3RhcnRDb2wgPCA1ICYmXG4gICAgICAgICAgIGlzU3BhY2VPclRhYihuZXh0YykpO1xuICAgIHZhciBibGFua19pdGVtID0gcGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5vZmZzZXQpID09PSAtMTtcbiAgICB2YXIgc3BhY2VzX2FmdGVyX21hcmtlciA9IHBhcnNlci5jb2x1bW4gLSBzcGFjZXNTdGFydENvbDtcbiAgICBpZiAoc3BhY2VzX2FmdGVyX21hcmtlciA+PSA1IHx8XG4gICAgICAgIHNwYWNlc19hZnRlcl9tYXJrZXIgPCAxIHx8XG4gICAgICAgIGJsYW5rX2l0ZW0pIHtcbiAgICAgICAgZGF0YS5wYWRkaW5nID0gbWF0Y2hbMF0ubGVuZ3RoICsgMTtcbiAgICAgICAgcGFyc2VyLmNvbHVtbiA9IHNwYWNlc1N0YXJ0Q29sO1xuICAgICAgICBwYXJzZXIub2Zmc2V0ID0gc3BhY2VzU3RhcnRPZmZzZXQ7XG4gICAgICAgIGlmIChpc1NwYWNlT3JUYWIocGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5vZmZzZXQpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLnBhZGRpbmcgPSBtYXRjaFswXS5sZW5ndGggKyBzcGFjZXNfYWZ0ZXJfbWFya2VyO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbn07XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIGxpc3QgaXRlbXMgYXJlIG9mIHRoZSBzYW1lIHR5cGUsXG4vLyB3aXRoIHRoZSBzYW1lIGRlbGltaXRlciBhbmQgYnVsbGV0IGNoYXJhY3Rlci4gIFRoaXMgaXMgdXNlZFxuLy8gaW4gYWdnbG9tZXJhdGluZyBsaXN0IGl0ZW1zIGludG8gbGlzdHMuXG52YXIgbGlzdHNNYXRjaCA9IGZ1bmN0aW9uKGxpc3RfZGF0YSwgaXRlbV9kYXRhKSB7XG4gICAgcmV0dXJuIChsaXN0X2RhdGEudHlwZSA9PT0gaXRlbV9kYXRhLnR5cGUgJiZcbiAgICAgICAgICAgIGxpc3RfZGF0YS5kZWxpbWl0ZXIgPT09IGl0ZW1fZGF0YS5kZWxpbWl0ZXIgJiZcbiAgICAgICAgICAgIGxpc3RfZGF0YS5idWxsZXRDaGFyID09PSBpdGVtX2RhdGEuYnVsbGV0Q2hhcik7XG59O1xuXG4vLyBGaW5hbGl6ZSBhbmQgY2xvc2UgYW55IHVubWF0Y2hlZCBibG9ja3MuXG52YXIgY2xvc2VVbm1hdGNoZWRCbG9ja3MgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuYWxsQ2xvc2VkKSB7XG4gICAgICAgIC8vIGZpbmFsaXplIGFueSBibG9ja3Mgbm90IG1hdGNoZWRcbiAgICAgICAgd2hpbGUgKHRoaXMub2xkdGlwICE9PSB0aGlzLmxhc3RNYXRjaGVkQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5vbGR0aXAuX3BhcmVudDtcbiAgICAgICAgICAgIHRoaXMuZmluYWxpemUodGhpcy5vbGR0aXAsIHRoaXMubGluZU51bWJlciAtIDEpO1xuICAgICAgICAgICAgdGhpcy5vbGR0aXAgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbGxDbG9zZWQgPSB0cnVlO1xuICAgIH1cbn07XG5cbi8vICdmaW5hbGl6ZScgaXMgcnVuIHdoZW4gdGhlIGJsb2NrIGlzIGNsb3NlZC5cbi8vICdjb250aW51ZScgaXMgcnVuIHRvIGNoZWNrIHdoZXRoZXIgdGhlIGJsb2NrIGlzIGNvbnRpbnVpbmdcbi8vIGF0IGEgY2VydGFpbiBsaW5lIGFuZCBvZmZzZXQgKGUuZy4gd2hldGhlciBhIGJsb2NrIHF1b3RlXG4vLyBjb250YWlucyBhIGA+YC4gIEl0IHJldHVybnMgMCBmb3IgbWF0Y2hlZCwgMSBmb3Igbm90IG1hdGNoZWQsXG4vLyBhbmQgMiBmb3IgXCJ3ZSd2ZSBkZWFsdCB3aXRoIHRoaXMgbGluZSBjb21wbGV0ZWx5LCBnbyB0byBuZXh0LlwiXG52YXIgYmxvY2tzID0ge1xuICAgIGRvY3VtZW50OiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbigpIHsgcmV0dXJuOyB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbih0KSB7IHJldHVybiAodCAhPT0gJ2l0ZW0nKTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgbGlzdDoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24ocGFyc2VyLCBibG9jaykge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBibG9jay5fZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG5vbi1maW5hbCBsaXN0IGl0ZW0gZW5kaW5nIHdpdGggYmxhbmsgbGluZTpcbiAgICAgICAgICAgICAgICBpZiAoZW5kc1dpdGhCbGFua0xpbmUoaXRlbSkgJiYgaXRlbS5fbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBibG9jay5fbGlzdERhdGEudGlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2UgaW50byBjaGlsZHJlbiBvZiBsaXN0IGl0ZW0sIHRvIHNlZSBpZiB0aGVyZSBhcmVcbiAgICAgICAgICAgICAgICAvLyBzcGFjZXMgYmV0d2VlbiBhbnkgb2YgdGhlbTpcbiAgICAgICAgICAgICAgICB2YXIgc3ViaXRlbSA9IGl0ZW0uX2ZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHN1Yml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZHNXaXRoQmxhbmtMaW5lKHN1Yml0ZW0pICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXRlbS5fbmV4dCB8fCBzdWJpdGVtLl9uZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2suX2xpc3REYXRhLnRpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJpdGVtID0gc3ViaXRlbS5fbmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uX25leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKHQpIHsgcmV0dXJuICh0ID09PSAnaXRlbScpOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IGZhbHNlXG4gICAgfSxcbiAgICBibG9ja19xdW90ZToge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgICAgICB2YXIgbG4gPSBwYXJzZXIuY3VycmVudExpbmU7XG4gICAgICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgICAgIHBlZWsobG4sIHBhcnNlci5uZXh0Tm9uc3BhY2UpID09PSBDX0dSRUFURVJUSEFOKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3BhY2VPclRhYihwZWVrKGxuLCBwYXJzZXIub2Zmc2V0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24odCkgeyByZXR1cm4gKHQgIT09ICdpdGVtJyk7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIGl0ZW06IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgICAgICBpZiAocGFyc2VyLmJsYW5rKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5fZmlyc3RDaGlsZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJsYW5rIGxpbmUgYWZ0ZXIgZW1wdHkgbGlzdCBpdGVtXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuaW5kZW50ID49XG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5fbGlzdERhdGEubWFya2VyT2Zmc2V0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLl9saXN0RGF0YS5wYWRkaW5nKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoY29udGFpbmVyLl9saXN0RGF0YS5tYXJrZXJPZmZzZXQgK1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuX2xpc3REYXRhLnBhZGRpbmcsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24odCkgeyByZXR1cm4gKHQgIT09ICdpdGVtJyk7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIGhlYWRpbmc6IHtcbiAgICAgICAgY29udGludWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYSBoZWFkaW5nIGNhbiBuZXZlciBjb250YWluZXIgPiAxIGxpbmUsIHNvIGZhaWwgdG8gbWF0Y2g6XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKCkgeyByZXR1cm47IH0sXG4gICAgICAgIGNhbkNvbnRhaW46IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgIGFjY2VwdHNMaW5lczogZmFsc2VcbiAgICB9LFxuICAgIHRoZW1hdGljX2JyZWFrOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGEgdGhlbWF0aWMgYnJlYWsgY2FuIG5ldmVyIGNvbnRhaW5lciA+IDEgbGluZSwgc28gZmFpbCB0byBtYXRjaDpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24oKSB7IHJldHVybjsgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiBmYWxzZVxuICAgIH0sXG4gICAgY29kZV9ibG9jazoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBsbiA9IHBhcnNlci5jdXJyZW50TGluZTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBwYXJzZXIuaW5kZW50O1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5faXNGZW5jZWQpIHsgLy8gZmVuY2VkXG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gKGluZGVudCA8PSAzICYmXG4gICAgICAgICAgICAgICAgICAgIGxuLmNoYXJBdChwYXJzZXIubmV4dE5vbnNwYWNlKSA9PT0gY29udGFpbmVyLl9mZW5jZUNoYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgbG4uc2xpY2UocGFyc2VyLm5leHROb25zcGFjZSkubWF0Y2gocmVDbG9zaW5nQ29kZUZlbmNlKSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzBdLmxlbmd0aCA+PSBjb250YWluZXIuX2ZlbmNlTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NpbmcgZmVuY2UgLSB3ZSdyZSBhdCBlbmQgb2YgbGluZSwgc28gd2UgY2FuIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuZmluYWxpemUoY29udGFpbmVyLCBwYXJzZXIubGluZU51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNraXAgb3B0aW9uYWwgc3BhY2VzIG9mIGZlbmNlIG9mZnNldFxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGNvbnRhaW5lci5fZmVuY2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpID4gMCAmJiBpc1NwYWNlT3JUYWIocGVlayhsbiwgcGFyc2VyLm9mZnNldCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGluZGVudGVkXG4gICAgICAgICAgICAgICAgaWYgKGluZGVudCA+PSBDT0RFX0lOREVOVCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldChDT0RFX0lOREVOVCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuYmxhbmspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKHBhcnNlciwgYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChibG9jay5faXNGZW5jZWQpIHsgLy8gZmVuY2VkXG4gICAgICAgICAgICAgICAgLy8gZmlyc3QgbGluZSBiZWNvbWVzIGluZm8gc3RyaW5nXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBibG9jay5fc3RyaW5nX2NvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdmFyIG5ld2xpbmVQb3MgPSBjb250ZW50LmluZGV4T2YoJ1xcbicpO1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdExpbmUgPSBjb250ZW50LnNsaWNlKDAsIG5ld2xpbmVQb3MpO1xuICAgICAgICAgICAgICAgIHZhciByZXN0ID0gY29udGVudC5zbGljZShuZXdsaW5lUG9zICsgMSk7XG4gICAgICAgICAgICAgICAgYmxvY2suaW5mbyA9IHVuZXNjYXBlU3RyaW5nKGZpcnN0TGluZS50cmltKCkpO1xuICAgICAgICAgICAgICAgIGJsb2NrLl9saXRlcmFsID0gcmVzdDtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGluZGVudGVkXG4gICAgICAgICAgICAgICAgYmxvY2suX2xpdGVyYWwgPSBibG9jay5fc3RyaW5nX2NvbnRlbnQucmVwbGFjZSgvKFxcbiAqKSskLywgJ1xcbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2suX3N0cmluZ19jb250ZW50ID0gbnVsbDsgLy8gYWxsb3cgR0NcbiAgICAgICAgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiB0cnVlXG4gICAgfSxcbiAgICBodG1sX2Jsb2NrOiB7XG4gICAgICAgIGNvbnRpbnVlOiBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuICgocGFyc2VyLmJsYW5rICYmXG4gICAgICAgICAgICAgICAgICAgICAoY29udGFpbmVyLl9odG1sQmxvY2tUeXBlID09PSA2IHx8XG4gICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLl9odG1sQmxvY2tUeXBlID09PSA3KSkgPyAxIDogMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbihwYXJzZXIsIGJsb2NrKSB7XG4gICAgICAgICAgICBibG9jay5fbGl0ZXJhbCA9IGJsb2NrLl9zdHJpbmdfY29udGVudC5yZXBsYWNlKC8oXFxuICopKyQvLCAnJyk7XG4gICAgICAgICAgICBibG9jay5fc3RyaW5nX2NvbnRlbnQgPSBudWxsOyAvLyBhbGxvdyBHQ1xuICAgICAgICB9LFxuICAgICAgICBjYW5Db250YWluOiBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBhY2NlcHRzTGluZXM6IHRydWVcbiAgICB9LFxuICAgIHBhcmFncmFwaDoge1xuICAgICAgICBjb250aW51ZTogZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gKHBhcnNlci5ibGFuayA/IDEgOiAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uKHBhcnNlciwgYmxvY2spIHtcbiAgICAgICAgICAgIHZhciBwb3M7XG4gICAgICAgICAgICB2YXIgaGFzUmVmZXJlbmNlRGVmcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB0cnkgcGFyc2luZyB0aGUgYmVnaW5uaW5nIGFzIGxpbmsgcmVmZXJlbmNlIGRlZmluaXRpb25zOlxuICAgICAgICAgICAgd2hpbGUgKHBlZWsoYmxvY2suX3N0cmluZ19jb250ZW50LCAwKSA9PT0gQ19PUEVOX0JSQUNLRVQgJiZcbiAgICAgICAgICAgICAgICAgICAocG9zID1cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmlubGluZVBhcnNlci5wYXJzZVJlZmVyZW5jZShibG9jay5fc3RyaW5nX2NvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZm1hcCkpKSB7XG4gICAgICAgICAgICAgICAgYmxvY2suX3N0cmluZ19jb250ZW50ID0gYmxvY2suX3N0cmluZ19jb250ZW50LnNsaWNlKHBvcyk7XG4gICAgICAgICAgICAgICAgaGFzUmVmZXJlbmNlRGVmcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzUmVmZXJlbmNlRGVmcyAmJiBpc0JsYW5rKGJsb2NrLl9zdHJpbmdfY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICBibG9jay51bmxpbmsoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FuQ29udGFpbjogZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgYWNjZXB0c0xpbmVzOiB0cnVlXG4gICAgfVxufTtcblxuLy8gYmxvY2sgc3RhcnQgZnVuY3Rpb25zLiAgUmV0dXJuIHZhbHVlczpcbi8vIDAgPSBubyBtYXRjaFxuLy8gMSA9IG1hdGNoZWQgY29udGFpbmVyLCBrZWVwIGdvaW5nXG4vLyAyID0gbWF0Y2hlZCBsZWFmLCBubyBtb3JlIGJsb2NrIHN0YXJ0c1xudmFyIGJsb2NrU3RhcnRzID0gW1xuICAgIC8vIGJsb2NrIHF1b3RlXG4gICAgZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm5leHROb25zcGFjZSkgPT09IENfR1JFQVRFUlRIQU4pIHtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU9mZnNldCgxLCBmYWxzZSk7XG4gICAgICAgICAgICAvLyBvcHRpb25hbCBmb2xsb3dpbmcgc3BhY2VcbiAgICAgICAgICAgIGlmIChpc1NwYWNlT3JUYWIocGVlayhwYXJzZXIuY3VycmVudExpbmUsIHBhcnNlci5vZmZzZXQpKSkge1xuICAgICAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KDEsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWRkQ2hpbGQoJ2Jsb2NrX3F1b3RlJywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIEFUWCBoZWFkaW5nXG4gICAgZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKS5tYXRjaChyZUFUWEhlYWRpbmdNYXJrZXIpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VOZXh0Tm9uc3BhY2UoKTtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KG1hdGNoWzBdLmxlbmd0aCwgZmFsc2UpO1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcGFyc2VyLmFkZENoaWxkKCdoZWFkaW5nJywgcGFyc2VyLm5leHROb25zcGFjZSk7XG4gICAgICAgICAgICBjb250YWluZXIubGV2ZWwgPSBtYXRjaFswXS50cmltKCkubGVuZ3RoOyAvLyBudW1iZXIgb2YgI3NcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0cmFpbGluZyAjIyNzOlxuICAgICAgICAgICAgY29udGFpbmVyLl9zdHJpbmdfY29udGVudCA9XG4gICAgICAgICAgICAgICAgcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5vZmZzZXQpLnJlcGxhY2UoL15bIFxcdF0qIytbIFxcdF0qJC8sICcnKS5yZXBsYWNlKC9bIFxcdF0rIytbIFxcdF0qJC8sICcnKTtcbiAgICAgICAgICAgIHBhcnNlci5hZHZhbmNlT2Zmc2V0KHBhcnNlci5jdXJyZW50TGluZS5sZW5ndGggLSBwYXJzZXIub2Zmc2V0KTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gRmVuY2VkIGNvZGUgYmxvY2tcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICBpZiAoIXBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgKG1hdGNoID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpLm1hdGNoKHJlQ29kZUZlbmNlKSkpIHtcbiAgICAgICAgICAgIHZhciBmZW5jZUxlbmd0aCA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHBhcnNlci5hZGRDaGlsZCgnY29kZV9ibG9jaycsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgY29udGFpbmVyLl9pc0ZlbmNlZCA9IHRydWU7XG4gICAgICAgICAgICBjb250YWluZXIuX2ZlbmNlTGVuZ3RoID0gZmVuY2VMZW5ndGg7XG4gICAgICAgICAgICBjb250YWluZXIuX2ZlbmNlQ2hhciA9IG1hdGNoWzBdWzBdO1xuICAgICAgICAgICAgY29udGFpbmVyLl9mZW5jZU9mZnNldCA9IHBhcnNlci5pbmRlbnQ7XG4gICAgICAgICAgICBwYXJzZXIuYWR2YW5jZU5leHROb25zcGFjZSgpO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoZmVuY2VMZW5ndGgsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gSFRNTCBibG9ja1xuICAgIGZ1bmN0aW9uKHBhcnNlciwgY29udGFpbmVyKSB7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICBwZWVrKHBhcnNlci5jdXJyZW50TGluZSwgcGFyc2VyLm5leHROb25zcGFjZSkgPT09IENfTEVTU1RIQU4pIHtcbiAgICAgICAgICAgIHZhciBzID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgdmFyIGJsb2NrVHlwZTtcblxuICAgICAgICAgICAgZm9yIChibG9ja1R5cGUgPSAxOyBibG9ja1R5cGUgPD0gNzsgYmxvY2tUeXBlKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVIdG1sQmxvY2tPcGVuW2Jsb2NrVHlwZV0udGVzdChzKSAmJlxuICAgICAgICAgICAgICAgICAgICAoYmxvY2tUeXBlIDwgNyB8fFxuICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnR5cGUgIT09ICdwYXJhZ3JhcGgnKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgYWRqdXN0IHBhcnNlci5vZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNwYWNlcyBhcmUgcGFydCBvZiB0aGUgSFRNTCBibG9jazpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSBwYXJzZXIuYWRkQ2hpbGQoJ2h0bWxfYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYi5faHRtbEJsb2NrVHlwZSA9IGJsb2NrVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG5cbiAgICB9LFxuXG4gICAgLy8gU2V0ZXh0IGhlYWRpbmdcbiAgICBmdW5jdGlvbihwYXJzZXIsIGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIGlmICghcGFyc2VyLmluZGVudGVkICYmXG4gICAgICAgICAgICBjb250YWluZXIudHlwZSA9PT0gJ3BhcmFncmFwaCcgJiZcbiAgICAgICAgICAgICAgICAgICAoKG1hdGNoID0gcGFyc2VyLmN1cnJlbnRMaW5lLnNsaWNlKHBhcnNlci5uZXh0Tm9uc3BhY2UpLm1hdGNoKHJlU2V0ZXh0SGVhZGluZ0xpbmUpKSkpIHtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgdmFyIGhlYWRpbmcgPSBuZXcgTm9kZSgnaGVhZGluZycsIGNvbnRhaW5lci5zb3VyY2Vwb3MpO1xuICAgICAgICAgICAgaGVhZGluZy5sZXZlbCA9IG1hdGNoWzBdWzBdID09PSAnPScgPyAxIDogMjtcbiAgICAgICAgICAgIGhlYWRpbmcuX3N0cmluZ19jb250ZW50ID0gY29udGFpbmVyLl9zdHJpbmdfY29udGVudDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZnRlcihoZWFkaW5nKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci51bmxpbmsoKTtcbiAgICAgICAgICAgIHBhcnNlci50aXAgPSBoZWFkaW5nO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQocGFyc2VyLmN1cnJlbnRMaW5lLmxlbmd0aCAtIHBhcnNlci5vZmZzZXQsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdGhlbWF0aWMgYnJlYWtcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgaWYgKCFwYXJzZXIuaW5kZW50ZWQgJiZcbiAgICAgICAgICAgIHJlVGhlbWF0aWNCcmVhay50ZXN0KHBhcnNlci5jdXJyZW50TGluZS5zbGljZShwYXJzZXIubmV4dE5vbnNwYWNlKSkpIHtcbiAgICAgICAgICAgIHBhcnNlci5jbG9zZVVubWF0Y2hlZEJsb2NrcygpO1xuICAgICAgICAgICAgcGFyc2VyLmFkZENoaWxkKCd0aGVtYXRpY19icmVhaycsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQocGFyc2VyLmN1cnJlbnRMaW5lLmxlbmd0aCAtIHBhcnNlci5vZmZzZXQsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gbGlzdCBpdGVtXG4gICAgZnVuY3Rpb24ocGFyc2VyLCBjb250YWluZXIpIHtcbiAgICAgICAgdmFyIGRhdGE7XG5cbiAgICAgICAgaWYgKCghcGFyc2VyLmluZGVudGVkIHx8IGNvbnRhaW5lci50eXBlID09PSAnbGlzdCcpXG4gICAgICAgICAgICAgICAgJiYgKGRhdGEgPSBwYXJzZUxpc3RNYXJrZXIocGFyc2VyLCBjb250YWluZXIpKSkge1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbGlzdCBpZiBuZWVkZWRcbiAgICAgICAgICAgIGlmIChwYXJzZXIudGlwLnR5cGUgIT09ICdsaXN0JyB8fFxuICAgICAgICAgICAgICAgICEobGlzdHNNYXRjaChjb250YWluZXIuX2xpc3REYXRhLCBkYXRhKSkpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBwYXJzZXIuYWRkQ2hpbGQoJ2xpc3QnLCBwYXJzZXIubmV4dE5vbnNwYWNlKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuX2xpc3REYXRhID0gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBsaXN0IGl0ZW1cbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHBhcnNlci5hZGRDaGlsZCgnaXRlbScsIHBhcnNlci5uZXh0Tm9uc3BhY2UpO1xuICAgICAgICAgICAgY29udGFpbmVyLl9saXN0RGF0YSA9IGRhdGE7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGluZGVudGVkIGNvZGUgYmxvY2tcbiAgICBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgICAgaWYgKHBhcnNlci5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgcGFyc2VyLnRpcC50eXBlICE9PSAncGFyYWdyYXBoJyAmJlxuICAgICAgICAgICAgIXBhcnNlci5ibGFuaykge1xuICAgICAgICAgICAgLy8gaW5kZW50ZWQgY29kZVxuICAgICAgICAgICAgcGFyc2VyLmFkdmFuY2VPZmZzZXQoQ09ERV9JTkRFTlQsIHRydWUpO1xuICAgICAgICAgICAgcGFyc2VyLmNsb3NlVW5tYXRjaGVkQmxvY2tzKCk7XG4gICAgICAgICAgICBwYXJzZXIuYWRkQ2hpbGQoJ2NvZGVfYmxvY2snLCBwYXJzZXIub2Zmc2V0KTtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgfVxuXG5dO1xuXG52YXIgYWR2YW5jZU9mZnNldCA9IGZ1bmN0aW9uKGNvdW50LCBjb2x1bW5zKSB7XG4gICAgdmFyIGN1cnJlbnRMaW5lID0gdGhpcy5jdXJyZW50TGluZTtcbiAgICB2YXIgY2hhcnNUb1RhYiwgY2hhcnNUb0FkdmFuY2U7XG4gICAgdmFyIGM7XG4gICAgd2hpbGUgKGNvdW50ID4gMCAmJiAoYyA9IGN1cnJlbnRMaW5lW3RoaXMub2Zmc2V0XSkpIHtcbiAgICAgICAgaWYgKGMgPT09ICdcXHQnKSB7XG4gICAgICAgICAgICBjaGFyc1RvVGFiID0gNCAtICh0aGlzLmNvbHVtbiAlIDQpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpYWxseUNvbnN1bWVkVGFiID0gY2hhcnNUb1RhYiA+IGNvdW50O1xuICAgICAgICAgICAgICAgIGNoYXJzVG9BZHZhbmNlID0gY2hhcnNUb1RhYiA+IGNvdW50ID8gY291bnQgOiBjaGFyc1RvVGFiO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uICs9IGNoYXJzVG9BZHZhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0ICs9IHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPyAwIDogMTtcbiAgICAgICAgICAgICAgICBjb3VudCAtPSBjaGFyc1RvQWR2YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uICs9IGNoYXJzVG9UYWI7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICBjb3VudCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uICs9IDE7IC8vIGFzc3VtZSBhc2NpaTsgYmxvY2sgc3RhcnRzIGFyZSBhc2NpaVxuICAgICAgICAgICAgY291bnQgLT0gMTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBhZHZhbmNlTmV4dE5vbnNwYWNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5vZmZzZXQgPSB0aGlzLm5leHROb25zcGFjZTtcbiAgICB0aGlzLmNvbHVtbiA9IHRoaXMubmV4dE5vbnNwYWNlQ29sdW1uO1xuICAgIHRoaXMucGFydGlhbGx5Q29uc3VtZWRUYWIgPSBmYWxzZTtcbn07XG5cbnZhciBmaW5kTmV4dE5vbnNwYWNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRMaW5lID0gdGhpcy5jdXJyZW50TGluZTtcbiAgICB2YXIgaSA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBjb2xzID0gdGhpcy5jb2x1bW47XG4gICAgdmFyIGM7XG5cbiAgICB3aGlsZSAoKGMgPSBjdXJyZW50TGluZS5jaGFyQXQoaSkpICE9PSAnJykge1xuICAgICAgICBpZiAoYyA9PT0gJyAnKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb2xzKys7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbHMgKz0gKDQgLSAoY29scyAlIDQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuYmxhbmsgPSAoYyA9PT0gJ1xcbicgfHwgYyA9PT0gJ1xccicgfHwgYyA9PT0gJycpO1xuICAgIHRoaXMubmV4dE5vbnNwYWNlID0gaTtcbiAgICB0aGlzLm5leHROb25zcGFjZUNvbHVtbiA9IGNvbHM7XG4gICAgdGhpcy5pbmRlbnQgPSB0aGlzLm5leHROb25zcGFjZUNvbHVtbiAtIHRoaXMuY29sdW1uO1xuICAgIHRoaXMuaW5kZW50ZWQgPSB0aGlzLmluZGVudCA+PSBDT0RFX0lOREVOVDtcbn07XG5cbi8vIEFuYWx5emUgYSBsaW5lIG9mIHRleHQgYW5kIHVwZGF0ZSB0aGUgZG9jdW1lbnQgYXBwcm9wcmlhdGVseS5cbi8vIFdlIHBhcnNlIG1hcmtkb3duIHRleHQgYnkgY2FsbGluZyB0aGlzIG9uIGVhY2ggbGluZSBvZiBpbnB1dCxcbi8vIHRoZW4gZmluYWxpemluZyB0aGUgZG9jdW1lbnQuXG52YXIgaW5jb3Jwb3JhdGVMaW5lID0gZnVuY3Rpb24obG4pIHtcbiAgICB2YXIgYWxsX21hdGNoZWQgPSB0cnVlO1xuICAgIHZhciB0O1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuZG9jO1xuICAgIHRoaXMub2xkdGlwID0gdGhpcy50aXA7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMuY29sdW1uID0gMDtcbiAgICB0aGlzLmJsYW5rID0gZmFsc2U7XG4gICAgdGhpcy5wYXJ0aWFsbHlDb25zdW1lZFRhYiA9IGZhbHNlO1xuICAgIHRoaXMubGluZU51bWJlciArPSAxO1xuXG4gICAgLy8gcmVwbGFjZSBOVUwgY2hhcmFjdGVycyBmb3Igc2VjdXJpdHlcbiAgICBpZiAobG4uaW5kZXhPZignXFx1MDAwMCcpICE9PSAtMSkge1xuICAgICAgICBsbiA9IGxuLnJlcGxhY2UoL1xcMC9nLCAnXFx1RkZGRCcpO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudExpbmUgPSBsbjtcblxuICAgIC8vIEZvciBlYWNoIGNvbnRhaW5pbmcgYmxvY2ssIHRyeSB0byBwYXJzZSB0aGUgYXNzb2NpYXRlZCBsaW5lIHN0YXJ0LlxuICAgIC8vIEJhaWwgb3V0IG9uIGZhaWx1cmU6IGNvbnRhaW5lciB3aWxsIHBvaW50IHRvIHRoZSBsYXN0IG1hdGNoaW5nIGJsb2NrLlxuICAgIC8vIFNldCBhbGxfbWF0Y2hlZCB0byBmYWxzZSBpZiBub3QgYWxsIGNvbnRhaW5lcnMgbWF0Y2guXG4gICAgdmFyIGxhc3RDaGlsZDtcbiAgICB3aGlsZSAoKGxhc3RDaGlsZCA9IGNvbnRhaW5lci5fbGFzdENoaWxkKSAmJiBsYXN0Q2hpbGQuX29wZW4pIHtcbiAgICAgICAgY29udGFpbmVyID0gbGFzdENoaWxkO1xuXG4gICAgICAgIHRoaXMuZmluZE5leHROb25zcGFjZSgpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5ibG9ja3NbY29udGFpbmVyLnR5cGVdLmNvbnRpbnVlKHRoaXMsIGNvbnRhaW5lcikpIHtcbiAgICAgICAgY2FzZSAwOiAvLyB3ZSd2ZSBtYXRjaGVkLCBrZWVwIGdvaW5nXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOiAvLyB3ZSd2ZSBmYWlsZWQgdG8gbWF0Y2ggYSBibG9ja1xuICAgICAgICAgICAgYWxsX21hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6IC8vIHdlJ3ZlIGhpdCBlbmQgb2YgbGluZSBmb3IgZmVuY2VkIGNvZGUgY2xvc2UgYW5kIGNhbiByZXR1cm5cbiAgICAgICAgICAgIHRoaXMubGFzdExpbmVMZW5ndGggPSBsbi5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyAnY29udGludWUgcmV0dXJuZWQgaWxsZWdhbCB2YWx1ZSwgbXVzdCBiZSAwLCAxLCBvciAyJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFsbF9tYXRjaGVkKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIuX3BhcmVudDsgLy8gYmFjayB1cCB0byBsYXN0IG1hdGNoaW5nIGJsb2NrXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYWxsQ2xvc2VkID0gKGNvbnRhaW5lciA9PT0gdGhpcy5vbGR0aXApO1xuICAgIHRoaXMubGFzdE1hdGNoZWRDb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB2YXIgbWF0Y2hlZExlYWYgPSBjb250YWluZXIudHlwZSAhPT0gJ3BhcmFncmFwaCcgJiZcbiAgICAgICAgICAgIGJsb2Nrc1tjb250YWluZXIudHlwZV0uYWNjZXB0c0xpbmVzO1xuICAgIHZhciBzdGFydHMgPSB0aGlzLmJsb2NrU3RhcnRzO1xuICAgIHZhciBzdGFydHNMZW4gPSBzdGFydHMubGVuZ3RoO1xuICAgIC8vIFVubGVzcyBsYXN0IG1hdGNoZWQgY29udGFpbmVyIGlzIGEgY29kZSBibG9jaywgdHJ5IG5ldyBjb250YWluZXIgc3RhcnRzLFxuICAgIC8vIGFkZGluZyBjaGlsZHJlbiB0byB0aGUgbGFzdCBtYXRjaGVkIGNvbnRhaW5lcjpcbiAgICB3aGlsZSAoIW1hdGNoZWRMZWFmKSB7XG5cbiAgICAgICAgdGhpcy5maW5kTmV4dE5vbnNwYWNlKCk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBhIGxpdHRsZSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb246XG4gICAgICAgIGlmICghdGhpcy5pbmRlbnRlZCAmJlxuICAgICAgICAgICAgIXJlTWF5YmVTcGVjaWFsLnRlc3QobG4uc2xpY2UodGhpcy5uZXh0Tm9uc3BhY2UpKSkge1xuICAgICAgICAgICAgdGhpcy5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzdGFydHNMZW4pIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBzdGFydHNbaV0odGhpcywgY29udGFpbmVyKTtcbiAgICAgICAgICAgIGlmIChyZXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLnRpcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy50aXA7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZExlYWYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSA9PT0gc3RhcnRzTGVuKSB7IC8vIG5vdGhpbmcgbWF0Y2hlZFxuICAgICAgICAgICAgdGhpcy5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoYXQgcmVtYWlucyBhdCB0aGUgb2Zmc2V0IGlzIGEgdGV4dCBsaW5lLiAgQWRkIHRoZSB0ZXh0IHRvIHRoZVxuICAgIC8vIGFwcHJvcHJpYXRlIGNvbnRhaW5lci5cblxuICAgLy8gRmlyc3QgY2hlY2sgZm9yIGEgbGF6eSBwYXJhZ3JhcGggY29udGludWF0aW9uOlxuICAgIGlmICghdGhpcy5hbGxDbG9zZWQgJiYgIXRoaXMuYmxhbmsgJiZcbiAgICAgICAgdGhpcy50aXAudHlwZSA9PT0gJ3BhcmFncmFwaCcpIHtcbiAgICAgICAgLy8gbGF6eSBwYXJhZ3JhcGggY29udGludWF0aW9uXG4gICAgICAgIHRoaXMuYWRkTGluZSgpO1xuXG4gICAgfSBlbHNlIHsgLy8gbm90IGEgbGF6eSBjb250aW51YXRpb25cblxuICAgICAgICAvLyBmaW5hbGl6ZSBhbnkgYmxvY2tzIG5vdCBtYXRjaGVkXG4gICAgICAgIHRoaXMuY2xvc2VVbm1hdGNoZWRCbG9ja3MoKTtcbiAgICAgICAgaWYgKHRoaXMuYmxhbmsgJiYgY29udGFpbmVyLmxhc3RDaGlsZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLmxhc3RDaGlsZC5fbGFzdExpbmVCbGFuayA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0ID0gY29udGFpbmVyLnR5cGU7XG5cbiAgICAgICAgLy8gQmxvY2sgcXVvdGUgbGluZXMgYXJlIG5ldmVyIGJsYW5rIGFzIHRoZXkgc3RhcnQgd2l0aCA+XG4gICAgICAgIC8vIGFuZCB3ZSBkb24ndCBjb3VudCBibGFua3MgaW4gZmVuY2VkIGNvZGUgZm9yIHB1cnBvc2VzIG9mIHRpZ2h0L2xvb3NlXG4gICAgICAgIC8vIGxpc3RzIG9yIGJyZWFraW5nIG91dCBvZiBsaXN0cy4gIFdlIGFsc28gZG9uJ3Qgc2V0IF9sYXN0TGluZUJsYW5rXG4gICAgICAgIC8vIG9uIGFuIGVtcHR5IGxpc3QgaXRlbSwgb3IgaWYgd2UganVzdCBjbG9zZWQgYSBmZW5jZWQgYmxvY2suXG4gICAgICAgIHZhciBsYXN0TGluZUJsYW5rID0gdGhpcy5ibGFuayAmJlxuICAgICAgICAgICAgISh0ID09PSAnYmxvY2tfcXVvdGUnIHx8XG4gICAgICAgICAgICAgICh0ID09PSAnY29kZV9ibG9jaycgJiYgY29udGFpbmVyLl9pc0ZlbmNlZCkgfHxcbiAgICAgICAgICAgICAgKHQgPT09ICdpdGVtJyAmJlxuICAgICAgICAgICAgICAgIWNvbnRhaW5lci5fZmlyc3RDaGlsZCAmJlxuICAgICAgICAgICAgICAgY29udGFpbmVyLnNvdXJjZXBvc1swXVswXSA9PT0gdGhpcy5saW5lTnVtYmVyKSk7XG5cbiAgICAgICAgLy8gcHJvcGFnYXRlIGxhc3RMaW5lQmxhbmsgdXAgdGhyb3VnaCBwYXJlbnRzOlxuICAgICAgICB2YXIgY29udCA9IGNvbnRhaW5lcjtcbiAgICAgICAgd2hpbGUgKGNvbnQpIHtcbiAgICAgICAgICAgIGNvbnQuX2xhc3RMaW5lQmxhbmsgPSBsYXN0TGluZUJsYW5rO1xuICAgICAgICAgICAgY29udCA9IGNvbnQuX3BhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJsb2Nrc1t0XS5hY2NlcHRzTGluZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGluZSgpO1xuICAgICAgICAgICAgLy8gaWYgSHRtbEJsb2NrLCBjaGVjayBmb3IgZW5kIGNvbmRpdGlvblxuICAgICAgICAgICAgaWYgKHQgPT09ICdodG1sX2Jsb2NrJyAmJlxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5faHRtbEJsb2NrVHlwZSA+PSAxICYmXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLl9odG1sQmxvY2tUeXBlIDw9IDUgJiZcbiAgICAgICAgICAgICAgICByZUh0bWxCbG9ja0Nsb3NlW2NvbnRhaW5lci5faHRtbEJsb2NrVHlwZV0udGVzdCh0aGlzLmN1cnJlbnRMaW5lLnNsaWNlKHRoaXMub2Zmc2V0KSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmFsaXplKGNvbnRhaW5lciwgdGhpcy5saW5lTnVtYmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2Zmc2V0IDwgbG4ubGVuZ3RoICYmICF0aGlzLmJsYW5rKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcGFyYWdyYXBoIGNvbnRhaW5lciBmb3IgbGluZVxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5hZGRDaGlsZCgncGFyYWdyYXBoJywgdGhpcy5vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5hZHZhbmNlTmV4dE5vbnNwYWNlKCk7XG4gICAgICAgICAgICB0aGlzLmFkZExpbmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxhc3RMaW5lTGVuZ3RoID0gbG4ubGVuZ3RoO1xufTtcblxuLy8gRmluYWxpemUgYSBibG9jay4gIENsb3NlIGl0IGFuZCBkbyBhbnkgbmVjZXNzYXJ5IHBvc3Rwcm9jZXNzaW5nLFxuLy8gZS5nLiBjcmVhdGluZyBzdHJpbmdfY29udGVudCBmcm9tIHN0cmluZ3MsIHNldHRpbmcgdGhlICd0aWdodCdcbi8vIG9yICdsb29zZScgc3RhdHVzIG9mIGEgbGlzdCwgYW5kIHBhcnNpbmcgdGhlIGJlZ2lubmluZ3Ncbi8vIG9mIHBhcmFncmFwaHMgZm9yIHJlZmVyZW5jZSBkZWZpbml0aW9ucy4gIFJlc2V0IHRoZSB0aXAgdG8gdGhlXG4vLyBwYXJlbnQgb2YgdGhlIGNsb3NlZCBibG9jay5cbnZhciBmaW5hbGl6ZSA9IGZ1bmN0aW9uKGJsb2NrLCBsaW5lTnVtYmVyKSB7XG4gICAgdmFyIGFib3ZlID0gYmxvY2suX3BhcmVudDtcbiAgICBibG9jay5fb3BlbiA9IGZhbHNlO1xuICAgIGJsb2NrLnNvdXJjZXBvc1sxXSA9IFtsaW5lTnVtYmVyLCB0aGlzLmxhc3RMaW5lTGVuZ3RoXTtcblxuICAgIHRoaXMuYmxvY2tzW2Jsb2NrLnR5cGVdLmZpbmFsaXplKHRoaXMsIGJsb2NrKTtcblxuICAgIHRoaXMudGlwID0gYWJvdmU7XG59O1xuXG4vLyBXYWxrIHRocm91Z2ggYSBibG9jayAmIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5LCBwYXJzaW5nIHN0cmluZyBjb250ZW50XG4vLyBpbnRvIGlubGluZSBjb250ZW50IHdoZXJlIGFwcHJvcHJpYXRlLlxudmFyIHByb2Nlc3NJbmxpbmVzID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgbm9kZSwgZXZlbnQsIHQ7XG4gICAgdmFyIHdhbGtlciA9IGJsb2NrLndhbGtlcigpO1xuICAgIHRoaXMuaW5saW5lUGFyc2VyLnJlZm1hcCA9IHRoaXMucmVmbWFwO1xuICAgIHRoaXMuaW5saW5lUGFyc2VyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgd2hpbGUgKChldmVudCA9IHdhbGtlci5uZXh0KCkpKSB7XG4gICAgICAgIG5vZGUgPSBldmVudC5ub2RlO1xuICAgICAgICB0ID0gbm9kZS50eXBlO1xuICAgICAgICBpZiAoIWV2ZW50LmVudGVyaW5nICYmICh0ID09PSAncGFyYWdyYXBoJyB8fCB0ID09PSAnaGVhZGluZycpKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVBhcnNlci5wYXJzZShub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBEb2N1bWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkb2MgPSBuZXcgTm9kZSgnZG9jdW1lbnQnLCBbWzEsIDFdLCBbMCwgMF1dKTtcbiAgICByZXR1cm4gZG9jO1xufTtcblxuLy8gVGhlIG1haW4gcGFyc2luZyBmdW5jdGlvbi4gIFJldHVybnMgYSBwYXJzZWQgZG9jdW1lbnQgQVNULlxudmFyIHBhcnNlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICB0aGlzLmRvYyA9IG5ldyBEb2N1bWVudCgpO1xuICAgIHRoaXMudGlwID0gdGhpcy5kb2M7XG4gICAgdGhpcy5yZWZtYXAgPSB7fTtcbiAgICB0aGlzLmxpbmVOdW1iZXIgPSAwO1xuICAgIHRoaXMubGFzdExpbmVMZW5ndGggPSAwO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICB0aGlzLmNvbHVtbiA9IDA7XG4gICAgdGhpcy5sYXN0TWF0Y2hlZENvbnRhaW5lciA9IHRoaXMuZG9jO1xuICAgIHRoaXMuY3VycmVudExpbmUgPSBcIlwiO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWUoXCJwcmVwYXJpbmcgaW5wdXRcIik7IH1cbiAgICB2YXIgbGluZXMgPSBpbnB1dC5zcGxpdChyZUxpbmVFbmRpbmcpO1xuICAgIHZhciBsZW4gPSBsaW5lcy5sZW5ndGg7XG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQoaW5wdXQubGVuZ3RoIC0gMSkgPT09IENfTkVXTElORSkge1xuICAgICAgICAvLyBpZ25vcmUgbGFzdCBibGFuayBsaW5lIGNyZWF0ZWQgYnkgZmluYWwgbmV3bGluZVxuICAgICAgICBsZW4gLT0gMTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZUVuZChcInByZXBhcmluZyBpbnB1dFwiKTsgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWUoXCJibG9jayBwYXJzaW5nXCIpOyB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0aGlzLmluY29ycG9yYXRlTGluZShsaW5lc1tpXSk7XG4gICAgfVxuICAgIHdoaWxlICh0aGlzLnRpcCkge1xuICAgICAgICB0aGlzLmZpbmFsaXplKHRoaXMudGlwLCBsZW4pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lRW5kKFwiYmxvY2sgcGFyc2luZ1wiKTsgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWUoXCJpbmxpbmUgcGFyc2luZ1wiKTsgfVxuICAgIHRoaXMucHJvY2Vzc0lubGluZXModGhpcy5kb2MpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZSkgeyBjb25zb2xlLnRpbWVFbmQoXCJpbmxpbmUgcGFyc2luZ1wiKTsgfVxuICAgIHJldHVybiB0aGlzLmRvYztcbn07XG5cblxuLy8gVGhlIFBhcnNlciBvYmplY3QuXG5mdW5jdGlvbiBQYXJzZXIob3B0aW9ucyl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZG9jOiBuZXcgRG9jdW1lbnQoKSxcbiAgICAgICAgYmxvY2tzOiBibG9ja3MsXG4gICAgICAgIGJsb2NrU3RhcnRzOiBibG9ja1N0YXJ0cyxcbiAgICAgICAgdGlwOiB0aGlzLmRvYyxcbiAgICAgICAgb2xkdGlwOiB0aGlzLmRvYyxcbiAgICAgICAgY3VycmVudExpbmU6IFwiXCIsXG4gICAgICAgIGxpbmVOdW1iZXI6IDAsXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgY29sdW1uOiAwLFxuICAgICAgICBuZXh0Tm9uc3BhY2U6IDAsXG4gICAgICAgIG5leHROb25zcGFjZUNvbHVtbjogMCxcbiAgICAgICAgaW5kZW50OiAwLFxuICAgICAgICBpbmRlbnRlZDogZmFsc2UsXG4gICAgICAgIGJsYW5rOiBmYWxzZSxcbiAgICAgICAgcGFydGlhbGx5Q29uc3VtZWRUYWI6IGZhbHNlLFxuICAgICAgICBhbGxDbG9zZWQ6IHRydWUsXG4gICAgICAgIGxhc3RNYXRjaGVkQ29udGFpbmVyOiB0aGlzLmRvYyxcbiAgICAgICAgcmVmbWFwOiB7fSxcbiAgICAgICAgbGFzdExpbmVMZW5ndGg6IDAsXG4gICAgICAgIGlubGluZVBhcnNlcjogbmV3IElubGluZVBhcnNlcihvcHRpb25zKSxcbiAgICAgICAgZmluZE5leHROb25zcGFjZTogZmluZE5leHROb25zcGFjZSxcbiAgICAgICAgYWR2YW5jZU9mZnNldDogYWR2YW5jZU9mZnNldCxcbiAgICAgICAgYWR2YW5jZU5leHROb25zcGFjZTogYWR2YW5jZU5leHROb25zcGFjZSxcbiAgICAgICAgYWRkTGluZTogYWRkTGluZSxcbiAgICAgICAgYWRkQ2hpbGQ6IGFkZENoaWxkLFxuICAgICAgICBpbmNvcnBvcmF0ZUxpbmU6IGluY29ycG9yYXRlTGluZSxcbiAgICAgICAgZmluYWxpemU6IGZpbmFsaXplLFxuICAgICAgICBwcm9jZXNzSW5saW5lczogcHJvY2Vzc0lubGluZXMsXG4gICAgICAgIGNsb3NlVW5tYXRjaGVkQmxvY2tzOiBjbG9zZVVubWF0Y2hlZEJsb2NrcyxcbiAgICAgICAgcGFyc2U6IHBhcnNlLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zIHx8IHt9XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ibG9ja3MuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBlbmNvZGVDYWNoZSA9IHt9O1xuXG5cbi8vIENyZWF0ZSBhIGxvb2t1cCBhcnJheSB3aGVyZSBhbnl0aGluZyBidXQgY2hhcmFjdGVycyBpbiBgY2hhcnNgIHN0cmluZ1xuLy8gYW5kIGFscGhhbnVtZXJpYyBjaGFycyBpcyBwZXJjZW50LWVuY29kZWQuXG4vL1xuZnVuY3Rpb24gZ2V0RW5jb2RlQ2FjaGUoZXhjbHVkZSkge1xuICB2YXIgaSwgY2gsIGNhY2hlID0gZW5jb2RlQ2FjaGVbZXhjbHVkZV07XG4gIGlmIChjYWNoZSkgeyByZXR1cm4gY2FjaGU7IH1cblxuICBjYWNoZSA9IGVuY29kZUNhY2hlW2V4Y2x1ZGVdID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IDEyODsgaSsrKSB7XG4gICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuXG4gICAgaWYgKC9eWzAtOWEtel0kL2kudGVzdChjaCkpIHtcbiAgICAgIC8vIGFsd2F5cyBhbGxvdyB1bmVuY29kZWQgYWxwaGFudW1lcmljIGNoYXJhY3RlcnNcbiAgICAgIGNhY2hlLnB1c2goY2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZS5wdXNoKCclJyArICgnMCcgKyBpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpKS5zbGljZSgtMikpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleGNsdWRlLmxlbmd0aDsgaSsrKSB7XG4gICAgY2FjaGVbZXhjbHVkZS5jaGFyQ29kZUF0KGkpXSA9IGV4Y2x1ZGVbaV07XG4gIH1cblxuICByZXR1cm4gY2FjaGU7XG59XG5cblxuLy8gRW5jb2RlIHVuc2FmZSBjaGFyYWN0ZXJzIHdpdGggcGVyY2VudC1lbmNvZGluZywgc2tpcHBpbmcgYWxyZWFkeVxuLy8gZW5jb2RlZCBzZXF1ZW5jZXMuXG4vL1xuLy8gIC0gc3RyaW5nICAgICAgIC0gc3RyaW5nIHRvIGVuY29kZVxuLy8gIC0gZXhjbHVkZSAgICAgIC0gbGlzdCBvZiBjaGFyYWN0ZXJzIHRvIGlnbm9yZSAoaW4gYWRkaXRpb24gdG8gYS16QS1aMC05KVxuLy8gIC0ga2VlcEVzY2FwZWQgIC0gZG9uJ3QgZW5jb2RlICclJyBpbiBhIGNvcnJlY3QgZXNjYXBlIHNlcXVlbmNlIChkZWZhdWx0OiB0cnVlKVxuLy9cbmZ1bmN0aW9uIGVuY29kZShzdHJpbmcsIGV4Y2x1ZGUsIGtlZXBFc2NhcGVkKSB7XG4gIHZhciBpLCBsLCBjb2RlLCBuZXh0Q29kZSwgY2FjaGUsXG4gICAgICByZXN1bHQgPSAnJztcblxuICBpZiAodHlwZW9mIGV4Y2x1ZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZW5jb2RlKHN0cmluZywga2VlcEVzY2FwZWQpXG4gICAga2VlcEVzY2FwZWQgID0gZXhjbHVkZTtcbiAgICBleGNsdWRlID0gZW5jb2RlLmRlZmF1bHRDaGFycztcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2VlcEVzY2FwZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAga2VlcEVzY2FwZWQgPSB0cnVlO1xuICB9XG5cbiAgY2FjaGUgPSBnZXRFbmNvZGVDYWNoZShleGNsdWRlKTtcblxuICBmb3IgKGkgPSAwLCBsID0gc3RyaW5nLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvZGUgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChrZWVwRXNjYXBlZCAmJiBjb2RlID09PSAweDI1IC8qICUgKi8gJiYgaSArIDIgPCBsKSB7XG4gICAgICBpZiAoL15bMC05YS1mXXsyfSQvaS50ZXN0KHN0cmluZy5zbGljZShpICsgMSwgaSArIDMpKSkge1xuICAgICAgICByZXN1bHQgKz0gc3RyaW5nLnNsaWNlKGksIGkgKyAzKTtcbiAgICAgICAgaSArPSAyO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA8IDEyOCkge1xuICAgICAgcmVzdWx0ICs9IGNhY2hlW2NvZGVdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPj0gMHhEODAwICYmIGNvZGUgPD0gMHhERkZGKSB7XG4gICAgICBpZiAoY29kZSA+PSAweEQ4MDAgJiYgY29kZSA8PSAweERCRkYgJiYgaSArIDEgPCBsKSB7XG4gICAgICAgIG5leHRDb2RlID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICBpZiAobmV4dENvZGUgPj0gMHhEQzAwICYmIG5leHRDb2RlIDw9IDB4REZGRikge1xuICAgICAgICAgIHJlc3VsdCArPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nW2ldICsgc3RyaW5nW2kgKyAxXSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyVFRiVCRiVCRCc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ1tpXSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5lbmNvZGUuZGVmYXVsdENoYXJzICAgPSBcIjsvPzpAJj0rJCwtXy4hfionKCkjXCI7XG5lbmNvZGUuY29tcG9uZW50Q2hhcnMgPSBcIi1fLiF+KicoKVwiO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbWR1cmwvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbid1c2Ugc3RyaWN0JztcblxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cbnZhciBkZWNvZGVDYWNoZSA9IHt9O1xuXG5mdW5jdGlvbiBnZXREZWNvZGVDYWNoZShleGNsdWRlKSB7XG4gIHZhciBpLCBjaCwgY2FjaGUgPSBkZWNvZGVDYWNoZVtleGNsdWRlXTtcbiAgaWYgKGNhY2hlKSB7IHJldHVybiBjYWNoZTsgfVxuXG4gIGNhY2hlID0gZGVjb2RlQ2FjaGVbZXhjbHVkZV0gPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgMTI4OyBpKyspIHtcbiAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSk7XG4gICAgY2FjaGUucHVzaChjaCk7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhjbHVkZS5sZW5ndGg7IGkrKykge1xuICAgIGNoID0gZXhjbHVkZS5jaGFyQ29kZUF0KGkpO1xuICAgIGNhY2hlW2NoXSA9ICclJyArICgnMCcgKyBjaC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSkuc2xpY2UoLTIpO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlO1xufVxuXG5cbi8vIERlY29kZSBwZXJjZW50LWVuY29kZWQgc3RyaW5nLlxuLy9cbmZ1bmN0aW9uIGRlY29kZShzdHJpbmcsIGV4Y2x1ZGUpIHtcbiAgdmFyIGNhY2hlO1xuXG4gIGlmICh0eXBlb2YgZXhjbHVkZSAhPT0gJ3N0cmluZycpIHtcbiAgICBleGNsdWRlID0gZGVjb2RlLmRlZmF1bHRDaGFycztcbiAgfVxuXG4gIGNhY2hlID0gZ2V0RGVjb2RlQ2FjaGUoZXhjbHVkZSk7XG5cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oJVthLWYwLTldezJ9KSsvZ2ksIGZ1bmN0aW9uKHNlcSkge1xuICAgIHZhciBpLCBsLCBiMSwgYjIsIGIzLCBiNCwgY2hyLFxuICAgICAgICByZXN1bHQgPSAnJztcblxuICAgIGZvciAoaSA9IDAsIGwgPSBzZXEubGVuZ3RoOyBpIDwgbDsgaSArPSAzKSB7XG4gICAgICBiMSA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgMSwgaSArIDMpLCAxNik7XG5cbiAgICAgIGlmIChiMSA8IDB4ODApIHtcbiAgICAgICAgcmVzdWx0ICs9IGNhY2hlW2IxXTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICgoYjEgJiAweEUwKSA9PT0gMHhDMCAmJiAoaSArIDMgPCBsKSkge1xuICAgICAgICAvLyAxMTB4eHh4eCAxMHh4eHh4eFxuICAgICAgICBiMiA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNCwgaSArIDYpLCAxNik7XG5cbiAgICAgICAgaWYgKChiMiAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgY2hyID0gKChiMSA8PCA2KSAmIDB4N0MwKSB8IChiMiAmIDB4M0YpO1xuXG4gICAgICAgICAgaWYgKGNociA8IDB4ODApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKGIxICYgMHhGMCkgPT09IDB4RTAgJiYgKGkgKyA2IDwgbCkpIHtcbiAgICAgICAgLy8gMTExMHh4eHggMTB4eHh4eHggMTB4eHh4eHhcbiAgICAgICAgYjIgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDQsIGkgKyA2KSwgMTYpO1xuICAgICAgICBiMyA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNywgaSArIDkpLCAxNik7XG5cbiAgICAgICAgaWYgKChiMiAmIDB4QzApID09PSAweDgwICYmIChiMyAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgY2hyID0gKChiMSA8PCAxMikgJiAweEYwMDApIHwgKChiMiA8PCA2KSAmIDB4RkMwKSB8IChiMyAmIDB4M0YpO1xuXG4gICAgICAgICAgaWYgKGNociA8IDB4ODAwIHx8IChjaHIgPj0gMHhEODAwICYmIGNociA8PSAweERGRkYpKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcdWZmZmRcXHVmZmZkXFx1ZmZmZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaSArPSA2O1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgoYjEgJiAweEY4KSA9PT0gMHhGMCAmJiAoaSArIDkgPCBsKSkge1xuICAgICAgICAvLyAxMTExMTB4eCAxMHh4eHh4eCAxMHh4eHh4eCAxMHh4eHh4eFxuICAgICAgICBiMiA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNCwgaSArIDYpLCAxNik7XG4gICAgICAgIGIzID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA3LCBpICsgOSksIDE2KTtcbiAgICAgICAgYjQgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDEwLCBpICsgMTIpLCAxNik7XG5cbiAgICAgICAgaWYgKChiMiAmIDB4QzApID09PSAweDgwICYmIChiMyAmIDB4QzApID09PSAweDgwICYmIChiNCAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgY2hyID0gKChiMSA8PCAxOCkgJiAweDFDMDAwMCkgfCAoKGIyIDw8IDEyKSAmIDB4M0YwMDApIHwgKChiMyA8PCA2KSAmIDB4RkMwKSB8IChiNCAmIDB4M0YpO1xuXG4gICAgICAgICAgaWYgKGNociA8IDB4MTAwMDAgfHwgY2hyID4gMHgxMEZGRkYpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmRcXHVmZmZkXFx1ZmZmZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNociAtPSAweDEwMDAwO1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhEODAwICsgKGNociA+PiAxMCksIDB4REMwMCArIChjaHIgJiAweDNGRikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGkgKz0gOTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHQgKz0gJ1xcdWZmZmQnO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xufVxuXG5cbmRlY29kZS5kZWZhdWx0Q2hhcnMgICA9ICc7Lz86QCY9KyQsIyc7XG5kZWNvZGUuY29tcG9uZW50Q2hhcnMgPSAnJztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21kdXJsL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGludmVyc2VYTUwgPSBnZXRJbnZlcnNlT2JqKHJlcXVpcmUoXCIuLi9tYXBzL3htbC5qc29uXCIpKSxcbiAgICB4bWxSZXBsYWNlciA9IGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlWE1MKTtcblxuZXhwb3J0cy5YTUwgPSBnZXRJbnZlcnNlKGludmVyc2VYTUwsIHhtbFJlcGxhY2VyKTtcblxudmFyIGludmVyc2VIVE1MID0gZ2V0SW52ZXJzZU9iaihyZXF1aXJlKFwiLi4vbWFwcy9lbnRpdGllcy5qc29uXCIpKSxcbiAgICBodG1sUmVwbGFjZXIgPSBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZUhUTUwpO1xuXG5leHBvcnRzLkhUTUwgPSBnZXRJbnZlcnNlKGludmVyc2VIVE1MLCBodG1sUmVwbGFjZXIpO1xuXG5mdW5jdGlvbiBnZXRJbnZlcnNlT2JqKG9iail7XG5cdHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24oaW52ZXJzZSwgbmFtZSl7XG5cdFx0aW52ZXJzZVtvYmpbbmFtZV1dID0gXCImXCIgKyBuYW1lICsgXCI7XCI7XG5cdFx0cmV0dXJuIGludmVyc2U7XG5cdH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2Upe1xuXHR2YXIgc2luZ2xlID0gW10sXG5cdCAgICBtdWx0aXBsZSA9IFtdO1xuXG5cdE9iamVjdC5rZXlzKGludmVyc2UpLmZvckVhY2goZnVuY3Rpb24oayl7XG5cdFx0aWYoay5sZW5ndGggPT09IDEpe1xuXHRcdFx0c2luZ2xlLnB1c2goXCJcXFxcXCIgKyBrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bXVsdGlwbGUucHVzaChrKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vVE9ETyBhZGQgcmFuZ2VzXG5cdG11bHRpcGxlLnVuc2hpZnQoXCJbXCIgKyBzaW5nbGUuam9pbihcIlwiKSArIFwiXVwiKTtcblxuXHRyZXR1cm4gbmV3IFJlZ0V4cChtdWx0aXBsZS5qb2luKFwifFwiKSwgXCJnXCIpO1xufVxuXG52YXIgcmVfbm9uQVNDSUkgPSAvW15cXDAtXFx4N0ZdL2csXG4gICAgcmVfYXN0cmFsU3ltYm9scyA9IC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2c7XG5cbmZ1bmN0aW9uIHNpbmdsZUNoYXJSZXBsYWNlcihjKXtcblx0cmV0dXJuIFwiJiN4XCIgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIjtcIjtcbn1cblxuZnVuY3Rpb24gYXN0cmFsUmVwbGFjZXIoYyl7XG5cdC8vIGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXG5cdHZhciBoaWdoID0gYy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgbG93ICA9IGMuY2hhckNvZGVBdCgxKTtcblx0dmFyIGNvZGVQb2ludCA9IChoaWdoIC0gMHhEODAwKSAqIDB4NDAwICsgbG93IC0gMHhEQzAwICsgMHgxMDAwMDtcblx0cmV0dXJuIFwiJiN4XCIgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIjtcIjtcbn1cblxuZnVuY3Rpb24gZ2V0SW52ZXJzZShpbnZlcnNlLCByZSl7XG5cdGZ1bmN0aW9uIGZ1bmMobmFtZSl7XG5cdFx0cmV0dXJuIGludmVyc2VbbmFtZV07XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XG5cdFx0cmV0dXJuIGRhdGFcblx0XHRcdFx0LnJlcGxhY2UocmUsIGZ1bmMpXG5cdFx0XHRcdC5yZXBsYWNlKHJlX2FzdHJhbFN5bWJvbHMsIGFzdHJhbFJlcGxhY2VyKVxuXHRcdFx0XHQucmVwbGFjZShyZV9ub25BU0NJSSwgc2luZ2xlQ2hhclJlcGxhY2VyKTtcblx0fTtcbn1cblxudmFyIHJlX3htbENoYXJzID0gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2VYTUwpO1xuXG5mdW5jdGlvbiBlc2NhcGVYTUwoZGF0YSl7XG5cdHJldHVybiBkYXRhXG5cdFx0XHQucmVwbGFjZShyZV94bWxDaGFycywgc2luZ2xlQ2hhclJlcGxhY2VyKVxuXHRcdFx0LnJlcGxhY2UocmVfYXN0cmFsU3ltYm9scywgYXN0cmFsUmVwbGFjZXIpXG5cdFx0XHQucmVwbGFjZShyZV9ub25BU0NJSSwgc2luZ2xlQ2hhclJlcGxhY2VyKTtcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGVYTUw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZW50aXR5TWFwID0gcmVxdWlyZShcIi4uL21hcHMvZW50aXRpZXMuanNvblwiKSxcbiAgICBsZWdhY3lNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9sZWdhY3kuanNvblwiKSxcbiAgICB4bWxNYXAgICAgPSByZXF1aXJlKFwiLi4vbWFwcy94bWwuanNvblwiKSxcbiAgICBkZWNvZGVDb2RlUG9pbnQgPSByZXF1aXJlKFwiLi9kZWNvZGVfY29kZXBvaW50LmpzXCIpO1xuXG52YXIgZGVjb2RlWE1MU3RyaWN0ICA9IGdldFN0cmljdERlY29kZXIoeG1sTWFwKSxcbiAgICBkZWNvZGVIVE1MU3RyaWN0ID0gZ2V0U3RyaWN0RGVjb2RlcihlbnRpdHlNYXApO1xuXG5mdW5jdGlvbiBnZXRTdHJpY3REZWNvZGVyKG1hcCl7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMobWFwKS5qb2luKFwifFwiKSxcblx0ICAgIHJlcGxhY2UgPSBnZXRSZXBsYWNlcihtYXApO1xuXG5cdGtleXMgKz0gXCJ8I1t4WF1bXFxcXGRhLWZBLUZdK3wjXFxcXGQrXCI7XG5cblx0dmFyIHJlID0gbmV3IFJlZ0V4cChcIiYoPzpcIiArIGtleXMgKyBcIik7XCIsIFwiZ1wiKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc3RyKXtcblx0XHRyZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZSk7XG5cdH07XG59XG5cbnZhciBkZWNvZGVIVE1MID0gKGZ1bmN0aW9uKCl7XG5cdHZhciBsZWdhY3kgPSBPYmplY3Qua2V5cyhsZWdhY3lNYXApXG5cdFx0LnNvcnQoc29ydGVyKTtcblxuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGVudGl0eU1hcClcblx0XHQuc29ydChzb3J0ZXIpO1xuXG5cdGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0aWYobGVnYWN5W2pdID09PSBrZXlzW2ldKXtcblx0XHRcdGtleXNbaV0gKz0gXCI7P1wiO1xuXHRcdFx0aisrO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXlzW2ldICs9IFwiO1wiO1xuXHRcdH1cblx0fVxuXG5cdHZhciByZSA9IG5ldyBSZWdFeHAoXCImKD86XCIgKyBrZXlzLmpvaW4oXCJ8XCIpICsgXCJ8I1t4WF1bXFxcXGRhLWZBLUZdKzs/fCNcXFxcZCs7PylcIiwgXCJnXCIpLFxuXHQgICAgcmVwbGFjZSA9IGdldFJlcGxhY2VyKGVudGl0eU1hcCk7XG5cblx0ZnVuY3Rpb24gcmVwbGFjZXIoc3RyKXtcblx0XHRpZihzdHIuc3Vic3RyKC0xKSAhPT0gXCI7XCIpIHN0ciArPSBcIjtcIjtcblx0XHRyZXR1cm4gcmVwbGFjZShzdHIpO1xuXHR9XG5cblx0Ly9UT0RPIGNvbnNpZGVyIGNyZWF0aW5nIGEgbWVyZ2VkIG1hcFxuXHRyZXR1cm4gZnVuY3Rpb24oc3RyKXtcblx0XHRyZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZXIpO1xuXHR9O1xufSgpKTtcblxuZnVuY3Rpb24gc29ydGVyKGEsIGIpe1xuXHRyZXR1cm4gYSA8IGIgPyAxIDogLTE7XG59XG5cbmZ1bmN0aW9uIGdldFJlcGxhY2VyKG1hcCl7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlKHN0cil7XG5cdFx0aWYoc3RyLmNoYXJBdCgxKSA9PT0gXCIjXCIpe1xuXHRcdFx0aWYoc3RyLmNoYXJBdCgyKSA9PT0gXCJYXCIgfHwgc3RyLmNoYXJBdCgyKSA9PT0gXCJ4XCIpe1xuXHRcdFx0XHRyZXR1cm4gZGVjb2RlQ29kZVBvaW50KHBhcnNlSW50KHN0ci5zdWJzdHIoMyksIDE2KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVjb2RlQ29kZVBvaW50KHBhcnNlSW50KHN0ci5zdWJzdHIoMiksIDEwKSk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXBbc3RyLnNsaWNlKDEsIC0xKV07XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRYTUw6IGRlY29kZVhNTFN0cmljdCxcblx0SFRNTDogZGVjb2RlSFRNTCxcblx0SFRNTFN0cmljdDogZGVjb2RlSFRNTFN0cmljdFxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcIkFhY3V0ZVwiOlwiw4FcIixcImFhY3V0ZVwiOlwiw6FcIixcIkFjaXJjXCI6XCLDglwiLFwiYWNpcmNcIjpcIsOiXCIsXCJhY3V0ZVwiOlwiwrRcIixcIkFFbGlnXCI6XCLDhlwiLFwiYWVsaWdcIjpcIsOmXCIsXCJBZ3JhdmVcIjpcIsOAXCIsXCJhZ3JhdmVcIjpcIsOgXCIsXCJhbXBcIjpcIiZcIixcIkFNUFwiOlwiJlwiLFwiQXJpbmdcIjpcIsOFXCIsXCJhcmluZ1wiOlwiw6VcIixcIkF0aWxkZVwiOlwiw4NcIixcImF0aWxkZVwiOlwiw6NcIixcIkF1bWxcIjpcIsOEXCIsXCJhdW1sXCI6XCLDpFwiLFwiYnJ2YmFyXCI6XCLCplwiLFwiQ2NlZGlsXCI6XCLDh1wiLFwiY2NlZGlsXCI6XCLDp1wiLFwiY2VkaWxcIjpcIsK4XCIsXCJjZW50XCI6XCLColwiLFwiY29weVwiOlwiwqlcIixcIkNPUFlcIjpcIsKpXCIsXCJjdXJyZW5cIjpcIsKkXCIsXCJkZWdcIjpcIsKwXCIsXCJkaXZpZGVcIjpcIsO3XCIsXCJFYWN1dGVcIjpcIsOJXCIsXCJlYWN1dGVcIjpcIsOpXCIsXCJFY2lyY1wiOlwiw4pcIixcImVjaXJjXCI6XCLDqlwiLFwiRWdyYXZlXCI6XCLDiFwiLFwiZWdyYXZlXCI6XCLDqFwiLFwiRVRIXCI6XCLDkFwiLFwiZXRoXCI6XCLDsFwiLFwiRXVtbFwiOlwiw4tcIixcImV1bWxcIjpcIsOrXCIsXCJmcmFjMTJcIjpcIsK9XCIsXCJmcmFjMTRcIjpcIsK8XCIsXCJmcmFjMzRcIjpcIsK+XCIsXCJndFwiOlwiPlwiLFwiR1RcIjpcIj5cIixcIklhY3V0ZVwiOlwiw41cIixcImlhY3V0ZVwiOlwiw61cIixcIkljaXJjXCI6XCLDjlwiLFwiaWNpcmNcIjpcIsOuXCIsXCJpZXhjbFwiOlwiwqFcIixcIklncmF2ZVwiOlwiw4xcIixcImlncmF2ZVwiOlwiw6xcIixcImlxdWVzdFwiOlwiwr9cIixcIkl1bWxcIjpcIsOPXCIsXCJpdW1sXCI6XCLDr1wiLFwibGFxdW9cIjpcIsKrXCIsXCJsdFwiOlwiPFwiLFwiTFRcIjpcIjxcIixcIm1hY3JcIjpcIsKvXCIsXCJtaWNyb1wiOlwiwrVcIixcIm1pZGRvdFwiOlwiwrdcIixcIm5ic3BcIjpcIsKgXCIsXCJub3RcIjpcIsKsXCIsXCJOdGlsZGVcIjpcIsORXCIsXCJudGlsZGVcIjpcIsOxXCIsXCJPYWN1dGVcIjpcIsOTXCIsXCJvYWN1dGVcIjpcIsOzXCIsXCJPY2lyY1wiOlwiw5RcIixcIm9jaXJjXCI6XCLDtFwiLFwiT2dyYXZlXCI6XCLDklwiLFwib2dyYXZlXCI6XCLDslwiLFwib3JkZlwiOlwiwqpcIixcIm9yZG1cIjpcIsK6XCIsXCJPc2xhc2hcIjpcIsOYXCIsXCJvc2xhc2hcIjpcIsO4XCIsXCJPdGlsZGVcIjpcIsOVXCIsXCJvdGlsZGVcIjpcIsO1XCIsXCJPdW1sXCI6XCLDllwiLFwib3VtbFwiOlwiw7ZcIixcInBhcmFcIjpcIsK2XCIsXCJwbHVzbW5cIjpcIsKxXCIsXCJwb3VuZFwiOlwiwqNcIixcInF1b3RcIjpcIlxcXCJcIixcIlFVT1RcIjpcIlxcXCJcIixcInJhcXVvXCI6XCLCu1wiLFwicmVnXCI6XCLCrlwiLFwiUkVHXCI6XCLCrlwiLFwic2VjdFwiOlwiwqdcIixcInNoeVwiOlwiwq1cIixcInN1cDFcIjpcIsK5XCIsXCJzdXAyXCI6XCLCslwiLFwic3VwM1wiOlwiwrNcIixcInN6bGlnXCI6XCLDn1wiLFwiVEhPUk5cIjpcIsOeXCIsXCJ0aG9yblwiOlwiw75cIixcInRpbWVzXCI6XCLDl1wiLFwiVWFjdXRlXCI6XCLDmlwiLFwidWFjdXRlXCI6XCLDulwiLFwiVWNpcmNcIjpcIsObXCIsXCJ1Y2lyY1wiOlwiw7tcIixcIlVncmF2ZVwiOlwiw5lcIixcInVncmF2ZVwiOlwiw7lcIixcInVtbFwiOlwiwqhcIixcIlV1bWxcIjpcIsOcXCIsXCJ1dW1sXCI6XCLDvFwiLFwiWWFjdXRlXCI6XCLDnVwiLFwieWFjdXRlXCI6XCLDvVwiLFwieWVuXCI6XCLCpVwiLFwieXVtbFwiOlwiw79cIn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2xlZ2FjeS5qc29uXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGVjb2RlTWFwID0gcmVxdWlyZShcIi4uL21hcHMvZGVjb2RlLmpzb25cIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlQ29kZVBvaW50O1xuXG4vLyBtb2RpZmllZCB2ZXJzaW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL2hlL2Jsb2IvbWFzdGVyL3NyYy9oZS5qcyNMOTQtTDExOVxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50KGNvZGVQb2ludCl7XG5cblx0aWYoKGNvZGVQb2ludCA+PSAweEQ4MDAgJiYgY29kZVBvaW50IDw9IDB4REZGRikgfHwgY29kZVBvaW50ID4gMHgxMEZGRkYpe1xuXHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0fVxuXG5cdGlmKGNvZGVQb2ludCBpbiBkZWNvZGVNYXApe1xuXHRcdGNvZGVQb2ludCA9IGRlY29kZU1hcFtjb2RlUG9pbnRdO1xuXHR9XG5cblx0dmFyIG91dHB1dCA9IFwiXCI7XG5cblx0aWYoY29kZVBvaW50ID4gMHhGRkZGKXtcblx0XHRjb2RlUG9pbnQgLT0gMHgxMDAwMDtcblx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGO1xuXHR9XG5cblx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0cmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9kZWNvZGVfY29kZXBvaW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcIjBcIjo2NTUzMyxcIjEyOFwiOjgzNjQsXCIxMzBcIjo4MjE4LFwiMTMxXCI6NDAyLFwiMTMyXCI6ODIyMixcIjEzM1wiOjgyMzAsXCIxMzRcIjo4MjI0LFwiMTM1XCI6ODIyNSxcIjEzNlwiOjcxMCxcIjEzN1wiOjgyNDAsXCIxMzhcIjozNTIsXCIxMzlcIjo4MjQ5LFwiMTQwXCI6MzM4LFwiMTQyXCI6MzgxLFwiMTQ1XCI6ODIxNixcIjE0NlwiOjgyMTcsXCIxNDdcIjo4MjIwLFwiMTQ4XCI6ODIyMSxcIjE0OVwiOjgyMjYsXCIxNTBcIjo4MjExLFwiMTUxXCI6ODIxMixcIjE1MlwiOjczMixcIjE1M1wiOjg0ODIsXCIxNTRcIjozNTMsXCIxNTVcIjo4MjUwLFwiMTU2XCI6MzM5LFwiMTU4XCI6MzgyLFwiMTU5XCI6Mzc2fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZGVjb2RlLmpzb25cbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgbm9ybWFsaXplUmVmZXJlbmNlID0gcmVxdWlyZSgnLi9ub3JtYWxpemUtcmVmZXJlbmNlJyk7XG5cbnZhciBub3JtYWxpemVVUkkgPSBjb21tb24ubm9ybWFsaXplVVJJO1xudmFyIHVuZXNjYXBlU3RyaW5nID0gY29tbW9uLnVuZXNjYXBlU3RyaW5nO1xudmFyIGZyb21Db2RlUG9pbnQgPSByZXF1aXJlKCcuL2Zyb20tY29kZS1wb2ludC5qcycpO1xudmFyIGRlY29kZUhUTUwgPSByZXF1aXJlKCdlbnRpdGllcycpLmRlY29kZUhUTUw7XG5yZXF1aXJlKCdzdHJpbmcucHJvdG90eXBlLnJlcGVhdCcpOyAvLyBQb2x5ZmlsbCBmb3IgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXRcblxuLy8gQ29uc3RhbnRzIGZvciBjaGFyYWN0ZXIgY29kZXM6XG5cbnZhciBDX05FV0xJTkUgPSAxMDtcbnZhciBDX0FTVEVSSVNLID0gNDI7XG52YXIgQ19VTkRFUlNDT1JFID0gOTU7XG52YXIgQ19CQUNLVElDSyA9IDk2O1xudmFyIENfT1BFTl9CUkFDS0VUID0gOTE7XG52YXIgQ19DTE9TRV9CUkFDS0VUID0gOTM7XG52YXIgQ19MRVNTVEhBTiA9IDYwO1xudmFyIENfQkFORyA9IDMzO1xudmFyIENfQkFDS1NMQVNIID0gOTI7XG52YXIgQ19BTVBFUlNBTkQgPSAzODtcbnZhciBDX09QRU5fUEFSRU4gPSA0MDtcbnZhciBDX0NMT1NFX1BBUkVOID0gNDE7XG52YXIgQ19DT0xPTiA9IDU4O1xudmFyIENfU0lOR0xFUVVPVEUgPSAzOTtcbnZhciBDX0RPVUJMRVFVT1RFID0gMzQ7XG5cbi8vIFNvbWUgcmVnZXhwcyB1c2VkIGluIGlubGluZSBwYXJzZXI6XG5cbnZhciBFU0NBUEFCTEUgPSBjb21tb24uRVNDQVBBQkxFO1xudmFyIEVTQ0FQRURfQ0hBUiA9ICdcXFxcXFxcXCcgKyBFU0NBUEFCTEU7XG5cbnZhciBFTlRJVFkgPSBjb21tb24uRU5USVRZO1xudmFyIHJlSHRtbFRhZyA9IGNvbW1vbi5yZUh0bWxUYWc7XG5cbnZhciByZVB1bmN0dWF0aW9uID0gbmV3IFJlZ0V4cCgvWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1eX2B7fH1+XFx4QTFcXHhBN1xceEFCXFx4QjZcXHhCN1xceEJCXFx4QkZcXHUwMzdFXFx1MDM4N1xcdTA1NUEtXFx1MDU1RlxcdTA1ODlcXHUwNThBXFx1MDVCRVxcdTA1QzBcXHUwNUMzXFx1MDVDNlxcdTA1RjNcXHUwNUY0XFx1MDYwOVxcdTA2MEFcXHUwNjBDXFx1MDYwRFxcdTA2MUJcXHUwNjFFXFx1MDYxRlxcdTA2NkEtXFx1MDY2RFxcdTA2RDRcXHUwNzAwLVxcdTA3MERcXHUwN0Y3LVxcdTA3RjlcXHUwODMwLVxcdTA4M0VcXHUwODVFXFx1MDk2NFxcdTA5NjVcXHUwOTcwXFx1MEFGMFxcdTBERjRcXHUwRTRGXFx1MEU1QVxcdTBFNUJcXHUwRjA0LVxcdTBGMTJcXHUwRjE0XFx1MEYzQS1cXHUwRjNEXFx1MEY4NVxcdTBGRDAtXFx1MEZENFxcdTBGRDlcXHUwRkRBXFx1MTA0QS1cXHUxMDRGXFx1MTBGQlxcdTEzNjAtXFx1MTM2OFxcdTE0MDBcXHUxNjZEXFx1MTY2RVxcdTE2OUJcXHUxNjlDXFx1MTZFQi1cXHUxNkVEXFx1MTczNVxcdTE3MzZcXHUxN0Q0LVxcdTE3RDZcXHUxN0Q4LVxcdTE3REFcXHUxODAwLVxcdTE4MEFcXHUxOTQ0XFx1MTk0NVxcdTFBMUVcXHUxQTFGXFx1MUFBMC1cXHUxQUE2XFx1MUFBOC1cXHUxQUFEXFx1MUI1QS1cXHUxQjYwXFx1MUJGQy1cXHUxQkZGXFx1MUMzQi1cXHUxQzNGXFx1MUM3RVxcdTFDN0ZcXHUxQ0MwLVxcdTFDQzdcXHUxQ0QzXFx1MjAxMC1cXHUyMDI3XFx1MjAzMC1cXHUyMDQzXFx1MjA0NS1cXHUyMDUxXFx1MjA1My1cXHUyMDVFXFx1MjA3RFxcdTIwN0VcXHUyMDhEXFx1MjA4RVxcdTIzMDgtXFx1MjMwQlxcdTIzMjlcXHUyMzJBXFx1Mjc2OC1cXHUyNzc1XFx1MjdDNVxcdTI3QzZcXHUyN0U2LVxcdTI3RUZcXHUyOTgzLVxcdTI5OThcXHUyOUQ4LVxcdTI5REJcXHUyOUZDXFx1MjlGRFxcdTJDRjktXFx1MkNGQ1xcdTJDRkVcXHUyQ0ZGXFx1MkQ3MFxcdTJFMDAtXFx1MkUyRVxcdTJFMzAtXFx1MkU0MlxcdTMwMDEtXFx1MzAwM1xcdTMwMDgtXFx1MzAxMVxcdTMwMTQtXFx1MzAxRlxcdTMwMzBcXHUzMDNEXFx1MzBBMFxcdTMwRkJcXHVBNEZFXFx1QTRGRlxcdUE2MEQtXFx1QTYwRlxcdUE2NzNcXHVBNjdFXFx1QTZGMi1cXHVBNkY3XFx1QTg3NC1cXHVBODc3XFx1QThDRVxcdUE4Q0ZcXHVBOEY4LVxcdUE4RkFcXHVBOEZDXFx1QTkyRVxcdUE5MkZcXHVBOTVGXFx1QTlDMS1cXHVBOUNEXFx1QTlERVxcdUE5REZcXHVBQTVDLVxcdUFBNUZcXHVBQURFXFx1QUFERlxcdUFBRjBcXHVBQUYxXFx1QUJFQlxcdUZEM0VcXHVGRDNGXFx1RkUxMC1cXHVGRTE5XFx1RkUzMC1cXHVGRTUyXFx1RkU1NC1cXHVGRTYxXFx1RkU2M1xcdUZFNjhcXHVGRTZBXFx1RkU2QlxcdUZGMDEtXFx1RkYwM1xcdUZGMDUtXFx1RkYwQVxcdUZGMEMtXFx1RkYwRlxcdUZGMUFcXHVGRjFCXFx1RkYxRlxcdUZGMjBcXHVGRjNCLVxcdUZGM0RcXHVGRjNGXFx1RkY1QlxcdUZGNURcXHVGRjVGLVxcdUZGNjVdfFxcdUQ4MDBbXFx1REQwMC1cXHVERDAyXFx1REY5RlxcdURGRDBdfFxcdUQ4MDFcXHVERDZGfFxcdUQ4MDJbXFx1REM1N1xcdUREMUZcXHVERDNGXFx1REU1MC1cXHVERTU4XFx1REU3RlxcdURFRjAtXFx1REVGNlxcdURGMzktXFx1REYzRlxcdURGOTktXFx1REY5Q118XFx1RDgwNFtcXHVEQzQ3LVxcdURDNERcXHVEQ0JCXFx1RENCQ1xcdURDQkUtXFx1RENDMVxcdURENDAtXFx1REQ0M1xcdURENzRcXHVERDc1XFx1RERDNS1cXHVEREM5XFx1RERDRFxcdUREREJcXHVERERELVxcdUREREZcXHVERTM4LVxcdURFM0RcXHVERUE5XXxcXHVEODA1W1xcdURDQzZcXHVEREMxLVxcdURERDdcXHVERTQxLVxcdURFNDNcXHVERjNDLVxcdURGM0VdfFxcdUQ4MDlbXFx1REM3MC1cXHVEQzc0XXxcXHVEODFBW1xcdURFNkVcXHVERTZGXFx1REVGNVxcdURGMzctXFx1REYzQlxcdURGNDRdfFxcdUQ4MkZcXHVEQzlGfFxcdUQ4MzZbXFx1REU4Ny1cXHVERThCXS8pO1xuXG52YXIgcmVMaW5rVGl0bGUgPSBuZXcgUmVnRXhwKFxuICAgICdeKD86XCIoJyArIEVTQ0FQRURfQ0hBUiArICd8W15cIlxcXFx4MDBdKSpcIicgK1xuICAgICAgICAnfCcgK1xuICAgICAgICAnXFwnKCcgKyBFU0NBUEVEX0NIQVIgKyAnfFteXFwnXFxcXHgwMF0pKlxcJycgK1xuICAgICAgICAnfCcgK1xuICAgICAgICAnXFxcXCgoJyArIEVTQ0FQRURfQ0hBUiArICd8W14pXFxcXHgwMF0pKlxcXFwpKScpO1xuXG52YXIgcmVMaW5rRGVzdGluYXRpb25CcmFjZXMgPSBuZXcgUmVnRXhwKFxuICAgICdeKD86WzxdKD86W14gPD5cXFxcdFxcXFxuXFxcXFxcXFxcXFxceDAwXScgKyAnfCcgKyBFU0NBUEVEX0NIQVIgKyAnfCcgKyAnXFxcXFxcXFwpKls+XSknKTtcblxudmFyIHJlRXNjYXBhYmxlID0gbmV3IFJlZ0V4cCgnXicgKyBFU0NBUEFCTEUpO1xuXG52YXIgcmVFbnRpdHlIZXJlID0gbmV3IFJlZ0V4cCgnXicgKyBFTlRJVFksICdpJyk7XG5cbnZhciByZVRpY2tzID0gL2ArLztcblxudmFyIHJlVGlja3NIZXJlID0gL15gKy87XG5cbnZhciByZUVsbGlwc2VzID0gL1xcLlxcLlxcLi9nO1xuXG52YXIgcmVEYXNoID0gLy0tKy9nO1xuXG52YXIgcmVFbWFpbEF1dG9saW5rID0gL148KFthLXpBLVowLTkuISMkJSYnKitcXC89P15fYHt8fX4tXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSopPi87XG5cbnZhciByZUF1dG9saW5rID0gL148W0EtWmEtel1bQS1aYS16MC05ListXXsxLDMxfTpbXjw+XFx4MDAtXFx4MjBdKj4vaTtcblxudmFyIHJlU3BubCA9IC9eICooPzpcXG4gKik/LztcblxudmFyIHJlV2hpdGVzcGFjZUNoYXIgPSAvXlsgXFx0XFxuXFx4MGJcXHgwY1xceDBkXS87XG5cbnZhciByZVdoaXRlc3BhY2UgPSAvWyBcXHRcXG5cXHgwYlxceDBjXFx4MGRdKy9nO1xuXG52YXIgcmVVbmljb2RlV2hpdGVzcGFjZUNoYXIgPSAvXlxccy87XG5cbnZhciByZUZpbmFsU3BhY2UgPSAvICokLztcblxudmFyIHJlSW5pdGlhbFNwYWNlID0gL14gKi87XG5cbnZhciByZVNwYWNlQXRFbmRPZkxpbmUgPSAvXiAqKD86XFxufCQpLztcblxudmFyIHJlTGlua0xhYmVsID0gbmV3IFJlZ0V4cCgnXlxcXFxbKD86W15cXFxcXFxcXFxcXFxbXFxcXF1dfCcgKyBFU0NBUEVEX0NIQVIgK1xuICAnfFxcXFxcXFxcKXswLDEwMDB9XFxcXF0nKTtcblxuLy8gTWF0Y2hlcyBhIHN0cmluZyBvZiBub24tc3BlY2lhbCBjaGFyYWN0ZXJzLlxudmFyIHJlTWFpbiA9IC9eW15cXG5gXFxbXFxdXFxcXCE8JipfJ1wiXSsvbTtcblxudmFyIHRleHQgPSBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG5vZGUgPSBuZXcgTm9kZSgndGV4dCcpO1xuICAgIG5vZGUuX2xpdGVyYWwgPSBzO1xuICAgIHJldHVybiBub2RlO1xufTtcblxuLy8gSU5MSU5FIFBBUlNFUlxuXG4vLyBUaGVzZSBhcmUgbWV0aG9kcyBvZiBhbiBJbmxpbmVQYXJzZXIgb2JqZWN0LCBkZWZpbmVkIGJlbG93LlxuLy8gQW4gSW5saW5lUGFyc2VyIGtlZXBzIHRyYWNrIG9mIGEgc3ViamVjdCAoYSBzdHJpbmcgdG8gYmVcbi8vIHBhcnNlZCkgYW5kIGEgcG9zaXRpb24gaW4gdGhhdCBzdWJqZWN0LlxuXG4vLyBJZiByZSBtYXRjaGVzIGF0IGN1cnJlbnQgcG9zaXRpb24gaW4gdGhlIHN1YmplY3QsIGFkdmFuY2Vcbi8vIHBvc2l0aW9uIGluIHN1YmplY3QgYW5kIHJldHVybiB0aGUgbWF0Y2g7IG90aGVyd2lzZSByZXR1cm4gbnVsbC5cbnZhciBtYXRjaCA9IGZ1bmN0aW9uKHJlKSB7XG4gICAgdmFyIG0gPSByZS5leGVjKHRoaXMuc3ViamVjdC5zbGljZSh0aGlzLnBvcykpO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zICs9IG0uaW5kZXggKyBtWzBdLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG1bMF07XG4gICAgfVxufTtcblxuLy8gUmV0dXJucyB0aGUgY29kZSBmb3IgdGhlIGNoYXJhY3RlciBhdCB0aGUgY3VycmVudCBzdWJqZWN0IHBvc2l0aW9uLCBvciAtMVxuLy8gdGhlcmUgYXJlIG5vIG1vcmUgY2hhcmFjdGVycy5cbnZhciBwZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucG9zIDwgdGhpcy5zdWJqZWN0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmNoYXJDb2RlQXQodGhpcy5wb3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG59O1xuXG4vLyBQYXJzZSB6ZXJvIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVycywgaW5jbHVkaW5nIGF0IG1vc3Qgb25lIG5ld2xpbmVcbnZhciBzcG5sID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5tYXRjaChyZVNwbmwpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gQWxsIG9mIHRoZSBwYXJzZXJzIGJlbG93IHRyeSB0byBtYXRjaCBzb21ldGhpbmcgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb25cbi8vIGluIHRoZSBzdWJqZWN0LiAgSWYgdGhleSBzdWNjZWVkIGluIG1hdGNoaW5nIGFueXRoaW5nLCB0aGV5XG4vLyByZXR1cm4gdGhlIGlubGluZSBtYXRjaGVkLCBhZHZhbmNpbmcgdGhlIHN1YmplY3QuXG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYmFja3RpY2tzLCBhZGRpbmcgZWl0aGVyIGEgYmFja3RpY2sgY29kZSBzcGFuIG9yIGFcbi8vIGxpdGVyYWwgc2VxdWVuY2Ugb2YgYmFja3RpY2tzLlxudmFyIHBhcnNlQmFja3RpY2tzID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgdGlja3MgPSB0aGlzLm1hdGNoKHJlVGlja3NIZXJlKTtcbiAgICBpZiAodGlja3MgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgYWZ0ZXJPcGVuVGlja3MgPSB0aGlzLnBvcztcbiAgICB2YXIgbWF0Y2hlZDtcbiAgICB2YXIgbm9kZTtcbiAgICB3aGlsZSAoKG1hdGNoZWQgPSB0aGlzLm1hdGNoKHJlVGlja3MpKSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAobWF0Y2hlZCA9PT0gdGlja3MpIHtcbiAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZSgnY29kZScpO1xuICAgICAgICAgICAgbm9kZS5fbGl0ZXJhbCA9IHRoaXMuc3ViamVjdC5zbGljZShhZnRlck9wZW5UaWNrcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyAtIHRpY2tzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKS5yZXBsYWNlKHJlV2hpdGVzcGFjZSwgJyAnKTtcbiAgICAgICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgd2UgZ290IGhlcmUsIHdlIGRpZG4ndCBtYXRjaCBhIGNsb3NpbmcgYmFja3RpY2sgc2VxdWVuY2UuXG4gICAgdGhpcy5wb3MgPSBhZnRlck9wZW5UaWNrcztcbiAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KHRpY2tzKSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBQYXJzZSBhIGJhY2tzbGFzaC1lc2NhcGVkIHNwZWNpYWwgY2hhcmFjdGVyLCBhZGRpbmcgZWl0aGVyIHRoZSBlc2NhcGVkXG4vLyBjaGFyYWN0ZXIsIGEgaGFyZCBsaW5lIGJyZWFrIChpZiB0aGUgYmFja3NsYXNoIGlzIGZvbGxvd2VkIGJ5IGEgbmV3bGluZSksXG4vLyBvciBhIGxpdGVyYWwgYmFja3NsYXNoIHRvIHRoZSBibG9jaydzIGNoaWxkcmVuLiAgQXNzdW1lcyBjdXJyZW50IGNoYXJhY3RlclxuLy8gaXMgYSBiYWNrc2xhc2guXG52YXIgcGFyc2VCYWNrc2xhc2ggPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBzdWJqID0gdGhpcy5zdWJqZWN0O1xuICAgIHZhciBub2RlO1xuICAgIHRoaXMucG9zICs9IDE7XG4gICAgaWYgKHRoaXMucGVlaygpID09PSBDX05FV0xJTkUpIHtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgbm9kZSA9IG5ldyBOb2RlKCdsaW5lYnJlYWsnKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSBlbHNlIGlmIChyZUVzY2FwYWJsZS50ZXN0KHN1YmouY2hhckF0KHRoaXMucG9zKSkpIHtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dChzdWJqLmNoYXJBdCh0aGlzLnBvcykpKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCdcXFxcJykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYW4gYXV0b2xpbmsgKFVSTCBvciBlbWFpbCBpbiBwb2ludHkgYnJhY2tldHMpLlxudmFyIHBhcnNlQXV0b2xpbmsgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBtO1xuICAgIHZhciBkZXN0O1xuICAgIHZhciBub2RlO1xuICAgIGlmICgobSA9IHRoaXMubWF0Y2gocmVFbWFpbEF1dG9saW5rKSkpIHtcbiAgICAgICAgZGVzdCA9IG0uc2xpY2UoMSwgbS5sZW5ndGggLSAxKTtcbiAgICAgICAgbm9kZSA9IG5ldyBOb2RlKCdsaW5rJyk7XG4gICAgICAgIG5vZGUuX2Rlc3RpbmF0aW9uID0gbm9ybWFsaXplVVJJKCdtYWlsdG86JyArIGRlc3QpO1xuICAgICAgICBub2RlLl90aXRsZSA9ICcnO1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRleHQoZGVzdCkpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICgobSA9IHRoaXMubWF0Y2gocmVBdXRvbGluaykpKSB7XG4gICAgICAgIGRlc3QgPSBtLnNsaWNlKDEsIG0ubGVuZ3RoIC0gMSk7XG4gICAgICAgIG5vZGUgPSBuZXcgTm9kZSgnbGluaycpO1xuICAgICAgICBub2RlLl9kZXN0aW5hdGlvbiA9IG5vcm1hbGl6ZVVSSShkZXN0KTtcbiAgICAgICAgbm9kZS5fdGl0bGUgPSAnJztcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KGRlc3QpKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGEgcmF3IEhUTUwgdGFnLlxudmFyIHBhcnNlSHRtbFRhZyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIG0gPSB0aGlzLm1hdGNoKHJlSHRtbFRhZyk7XG4gICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBub2RlID0gbmV3IE5vZGUoJ2h0bWxfaW5saW5lJyk7XG4gICAgICAgIG5vZGUuX2xpdGVyYWwgPSBtO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcblxuLy8gU2NhbiBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgd2l0aCBjb2RlIGNjLCBhbmQgcmV0dXJuIGluZm9ybWF0aW9uIGFib3V0XG4vLyB0aGUgbnVtYmVyIG9mIGRlbGltaXRlcnMgYW5kIHdoZXRoZXIgdGhleSBhcmUgcG9zaXRpb25lZCBzdWNoIHRoYXRcbi8vIHRoZXkgY2FuIG9wZW4gYW5kL29yIGNsb3NlIGVtcGhhc2lzIG9yIHN0cm9uZyBlbXBoYXNpcy4gIEEgdXRpbGl0eVxuLy8gZnVuY3Rpb24gZm9yIHN0cm9uZy9lbXBoIHBhcnNpbmcuXG52YXIgc2NhbkRlbGltcyA9IGZ1bmN0aW9uKGNjKSB7XG4gICAgdmFyIG51bWRlbGltcyA9IDA7XG4gICAgdmFyIGNoYXJfYmVmb3JlLCBjaGFyX2FmdGVyLCBjY19hZnRlcjtcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB2YXIgbGVmdF9mbGFua2luZywgcmlnaHRfZmxhbmtpbmcsIGNhbl9vcGVuLCBjYW5fY2xvc2U7XG4gICAgdmFyIGFmdGVyX2lzX3doaXRlc3BhY2UsIGFmdGVyX2lzX3B1bmN0dWF0aW9uLCBiZWZvcmVfaXNfd2hpdGVzcGFjZSwgYmVmb3JlX2lzX3B1bmN0dWF0aW9uO1xuXG4gICAgaWYgKGNjID09PSBDX1NJTkdMRVFVT1RFIHx8IGNjID09PSBDX0RPVUJMRVFVT1RFKSB7XG4gICAgICAgIG51bWRlbGltcysrO1xuICAgICAgICB0aGlzLnBvcysrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICh0aGlzLnBlZWsoKSA9PT0gY2MpIHtcbiAgICAgICAgICAgIG51bWRlbGltcysrO1xuICAgICAgICAgICAgdGhpcy5wb3MrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChudW1kZWxpbXMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY2hhcl9iZWZvcmUgPSBzdGFydHBvcyA9PT0gMCA/ICdcXG4nIDogdGhpcy5zdWJqZWN0LmNoYXJBdChzdGFydHBvcyAtIDEpO1xuXG4gICAgY2NfYWZ0ZXIgPSB0aGlzLnBlZWsoKTtcbiAgICBpZiAoY2NfYWZ0ZXIgPT09IC0xKSB7XG4gICAgICAgIGNoYXJfYWZ0ZXIgPSAnXFxuJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGFyX2FmdGVyID0gZnJvbUNvZGVQb2ludChjY19hZnRlcik7XG4gICAgfVxuXG4gICAgYWZ0ZXJfaXNfd2hpdGVzcGFjZSA9IHJlVW5pY29kZVdoaXRlc3BhY2VDaGFyLnRlc3QoY2hhcl9hZnRlcik7XG4gICAgYWZ0ZXJfaXNfcHVuY3R1YXRpb24gPSByZVB1bmN0dWF0aW9uLnRlc3QoY2hhcl9hZnRlcik7XG4gICAgYmVmb3JlX2lzX3doaXRlc3BhY2UgPSByZVVuaWNvZGVXaGl0ZXNwYWNlQ2hhci50ZXN0KGNoYXJfYmVmb3JlKTtcbiAgICBiZWZvcmVfaXNfcHVuY3R1YXRpb24gPSByZVB1bmN0dWF0aW9uLnRlc3QoY2hhcl9iZWZvcmUpO1xuXG4gICAgbGVmdF9mbGFua2luZyA9ICFhZnRlcl9pc193aGl0ZXNwYWNlICYmXG4gICAgICAgICAgICAoIWFmdGVyX2lzX3B1bmN0dWF0aW9uIHx8IGJlZm9yZV9pc193aGl0ZXNwYWNlIHx8IGJlZm9yZV9pc19wdW5jdHVhdGlvbik7XG4gICAgcmlnaHRfZmxhbmtpbmcgPSAhYmVmb3JlX2lzX3doaXRlc3BhY2UgJiZcbiAgICAgICAgICAgICghYmVmb3JlX2lzX3B1bmN0dWF0aW9uIHx8IGFmdGVyX2lzX3doaXRlc3BhY2UgfHwgYWZ0ZXJfaXNfcHVuY3R1YXRpb24pO1xuICAgIGlmIChjYyA9PT0gQ19VTkRFUlNDT1JFKSB7XG4gICAgICAgIGNhbl9vcGVuID0gbGVmdF9mbGFua2luZyAmJlxuICAgICAgICAgICAgKCFyaWdodF9mbGFua2luZyB8fCBiZWZvcmVfaXNfcHVuY3R1YXRpb24pO1xuICAgICAgICBjYW5fY2xvc2UgPSByaWdodF9mbGFua2luZyAmJlxuICAgICAgICAgICAgKCFsZWZ0X2ZsYW5raW5nIHx8IGFmdGVyX2lzX3B1bmN0dWF0aW9uKTtcbiAgICB9IGVsc2UgaWYgKGNjID09PSBDX1NJTkdMRVFVT1RFIHx8IGNjID09PSBDX0RPVUJMRVFVT1RFKSB7XG4gICAgICAgIGNhbl9vcGVuID0gbGVmdF9mbGFua2luZyAmJiAhcmlnaHRfZmxhbmtpbmc7XG4gICAgICAgIGNhbl9jbG9zZSA9IHJpZ2h0X2ZsYW5raW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbl9vcGVuID0gbGVmdF9mbGFua2luZztcbiAgICAgICAgY2FuX2Nsb3NlID0gcmlnaHRfZmxhbmtpbmc7XG4gICAgfVxuICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgcmV0dXJuIHsgbnVtZGVsaW1zOiBudW1kZWxpbXMsXG4gICAgICAgICAgICAgY2FuX29wZW46IGNhbl9vcGVuLFxuICAgICAgICAgICAgIGNhbl9jbG9zZTogY2FuX2Nsb3NlIH07XG59O1xuXG4vLyBIYW5kbGUgYSBkZWxpbWl0ZXIgbWFya2VyIGZvciBlbXBoYXNpcyBvciBhIHF1b3RlLlxudmFyIGhhbmRsZURlbGltID0gZnVuY3Rpb24oY2MsIGJsb2NrKSB7XG4gICAgdmFyIHJlcyA9IHRoaXMuc2NhbkRlbGltcyhjYyk7XG4gICAgaWYgKCFyZXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbnVtZGVsaW1zID0gcmVzLm51bWRlbGltcztcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB2YXIgY29udGVudHM7XG5cbiAgICB0aGlzLnBvcyArPSBudW1kZWxpbXM7XG4gICAgaWYgKGNjID09PSBDX1NJTkdMRVFVT1RFKSB7XG4gICAgICAgIGNvbnRlbnRzID0gXCJcXHUyMDE5XCI7XG4gICAgfSBlbHNlIGlmIChjYyA9PT0gQ19ET1VCTEVRVU9URSkge1xuICAgICAgICBjb250ZW50cyA9IFwiXFx1MjAxQ1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnRzID0gdGhpcy5zdWJqZWN0LnNsaWNlKHN0YXJ0cG9zLCB0aGlzLnBvcyk7XG4gICAgfVxuICAgIHZhciBub2RlID0gdGV4dChjb250ZW50cyk7XG4gICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgICAvLyBBZGQgZW50cnkgdG8gc3RhY2sgZm9yIHRoaXMgb3BlbmVyXG4gICAgdGhpcy5kZWxpbWl0ZXJzID0geyBjYzogY2MsXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1kZWxpbXM6IG51bWRlbGltcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdkZWxpbXM6IG51bWRlbGltcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91czogdGhpcy5kZWxpbWl0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbl9vcGVuOiByZXMuY2FuX29wZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5fY2xvc2U6IHJlcy5jYW5fY2xvc2UgfTtcbiAgICBpZiAodGhpcy5kZWxpbWl0ZXJzLnByZXZpb3VzICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGVsaW1pdGVycy5wcmV2aW91cy5uZXh0ID0gdGhpcy5kZWxpbWl0ZXJzO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG59O1xuXG52YXIgcmVtb3ZlRGVsaW1pdGVyID0gZnVuY3Rpb24oZGVsaW0pIHtcbiAgICBpZiAoZGVsaW0ucHJldmlvdXMgIT09IG51bGwpIHtcbiAgICAgICAgZGVsaW0ucHJldmlvdXMubmV4dCA9IGRlbGltLm5leHQ7XG4gICAgfVxuICAgIGlmIChkZWxpbS5uZXh0ID09PSBudWxsKSB7XG4gICAgICAgIC8vIHRvcCBvZiBzdGFja1xuICAgICAgICB0aGlzLmRlbGltaXRlcnMgPSBkZWxpbS5wcmV2aW91cztcbiAgICB9IGVsc2Uge1xuICAgICAgICBkZWxpbS5uZXh0LnByZXZpb3VzID0gZGVsaW0ucHJldmlvdXM7XG4gICAgfVxufTtcblxudmFyIHJlbW92ZURlbGltaXRlcnNCZXR3ZWVuID0gZnVuY3Rpb24oYm90dG9tLCB0b3ApIHtcbiAgICBpZiAoYm90dG9tLm5leHQgIT09IHRvcCkge1xuICAgICAgICBib3R0b20ubmV4dCA9IHRvcDtcbiAgICAgICAgdG9wLnByZXZpb3VzID0gYm90dG9tO1xuICAgIH1cbn07XG5cbnZhciBwcm9jZXNzRW1waGFzaXMgPSBmdW5jdGlvbihzdGFja19ib3R0b20pIHtcbiAgICB2YXIgb3BlbmVyLCBjbG9zZXIsIG9sZF9jbG9zZXI7XG4gICAgdmFyIG9wZW5lcl9pbmwsIGNsb3Nlcl9pbmw7XG4gICAgdmFyIHRlbXBzdGFjaztcbiAgICB2YXIgdXNlX2RlbGltcztcbiAgICB2YXIgdG1wLCBuZXh0O1xuICAgIHZhciBvcGVuZXJfZm91bmQ7XG4gICAgdmFyIG9wZW5lcnNfYm90dG9tID0gW107XG4gICAgdmFyIG9kZF9tYXRjaCA9IGZhbHNlO1xuXG4gICAgb3BlbmVyc19ib3R0b21bQ19VTkRFUlNDT1JFXSA9IHN0YWNrX2JvdHRvbTtcbiAgICBvcGVuZXJzX2JvdHRvbVtDX0FTVEVSSVNLXSA9IHN0YWNrX2JvdHRvbTtcbiAgICBvcGVuZXJzX2JvdHRvbVtDX1NJTkdMRVFVT1RFXSA9IHN0YWNrX2JvdHRvbTtcbiAgICBvcGVuZXJzX2JvdHRvbVtDX0RPVUJMRVFVT1RFXSA9IHN0YWNrX2JvdHRvbTtcblxuICAgIC8vIGZpbmQgZmlyc3QgY2xvc2VyIGFib3ZlIHN0YWNrX2JvdHRvbTpcbiAgICBjbG9zZXIgPSB0aGlzLmRlbGltaXRlcnM7XG4gICAgd2hpbGUgKGNsb3NlciAhPT0gbnVsbCAmJiBjbG9zZXIucHJldmlvdXMgIT09IHN0YWNrX2JvdHRvbSkge1xuICAgICAgICBjbG9zZXIgPSBjbG9zZXIucHJldmlvdXM7XG4gICAgfVxuICAgIC8vIG1vdmUgZm9yd2FyZCwgbG9va2luZyBmb3IgY2xvc2VycywgYW5kIGhhbmRsaW5nIGVhY2hcbiAgICB3aGlsZSAoY2xvc2VyICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBjbG9zZXJjYyA9IGNsb3Nlci5jYztcbiAgICAgICAgaWYgKCFjbG9zZXIuY2FuX2Nsb3NlKSB7XG4gICAgICAgICAgICBjbG9zZXIgPSBjbG9zZXIubmV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGZvdW5kIGVtcGhhc2lzIGNsb3Nlci4gbm93IGxvb2sgYmFjayBmb3IgZmlyc3QgbWF0Y2hpbmcgb3BlbmVyOlxuICAgICAgICAgICAgb3BlbmVyID0gY2xvc2VyLnByZXZpb3VzO1xuICAgICAgICAgICAgb3BlbmVyX2ZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAob3BlbmVyICE9PSBudWxsICYmIG9wZW5lciAhPT0gc3RhY2tfYm90dG9tICYmXG4gICAgICAgICAgICAgICAgICAgb3BlbmVyICE9PSBvcGVuZXJzX2JvdHRvbVtjbG9zZXJjY10pIHtcbiAgICAgICAgICAgICAgICBvZGRfbWF0Y2ggPSAoY2xvc2VyLmNhbl9vcGVuIHx8IG9wZW5lci5jYW5fY2xvc2UpICYmXG4gICAgICAgICAgICAgICAgICAgIChvcGVuZXIub3JpZ2RlbGltcyArIGNsb3Nlci5vcmlnZGVsaW1zKSAlIDMgPT09IDA7XG4gICAgICAgICAgICAgICAgaWYgKG9wZW5lci5jYyA9PT0gY2xvc2VyLmNjICYmIG9wZW5lci5jYW5fb3BlbiAmJiAhb2RkX21hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5lcl9mb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcGVuZXIgPSBvcGVuZXIucHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRfY2xvc2VyID0gY2xvc2VyO1xuXG4gICAgICAgICAgICBpZiAoY2xvc2VyY2MgPT09IENfQVNURVJJU0sgfHwgY2xvc2VyY2MgPT09IENfVU5ERVJTQ09SRSkge1xuICAgICAgICAgICAgICAgIGlmICghb3BlbmVyX2ZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlciA9IGNsb3Nlci5uZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBhY3R1YWwgbnVtYmVyIG9mIGRlbGltaXRlcnMgdXNlZCBmcm9tIGNsb3NlclxuICAgICAgICAgICAgICAgICAgICB1c2VfZGVsaW1zID1cbiAgICAgICAgICAgICAgICAgICAgICAoY2xvc2VyLm51bWRlbGltcyA+PSAyICYmIG9wZW5lci5udW1kZWxpbXMgPj0gMikgPyAyIDogMTtcblxuICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sID0gb3BlbmVyLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlcl9pbmwgPSBjbG9zZXIubm9kZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdXNlZCBkZWxpbWl0ZXJzIGZyb20gc3RhY2sgZWx0cyBhbmQgaW5saW5lc1xuICAgICAgICAgICAgICAgICAgICBvcGVuZXIubnVtZGVsaW1zIC09IHVzZV9kZWxpbXM7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlci5udW1kZWxpbXMgLT0gdXNlX2RlbGltcztcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyX2lubC5fbGl0ZXJhbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLl9saXRlcmFsLnNsaWNlKDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lcl9pbmwuX2xpdGVyYWwubGVuZ3RoIC0gdXNlX2RlbGltcyk7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlcl9pbmwuX2xpdGVyYWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VyX2lubC5fbGl0ZXJhbC5zbGljZSgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXJfaW5sLl9saXRlcmFsLmxlbmd0aCAtIHVzZV9kZWxpbXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1aWxkIGNvbnRlbnRzIGZvciBuZXcgZW1waCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbXBoID0gbmV3IE5vZGUodXNlX2RlbGltcyA9PT0gMSA/ICdlbXBoJyA6ICdzdHJvbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBvcGVuZXJfaW5sLl9uZXh0O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodG1wICYmIHRtcCAhPT0gY2xvc2VyX2lubCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHRtcC5fbmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcC51bmxpbmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcGguYXBwZW5kQ2hpbGQodG1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLmluc2VydEFmdGVyKGVtcGgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlbHRzIGJldHdlZW4gb3BlbmVyIGFuZCBjbG9zZXIgaW4gZGVsaW1pdGVycyBzdGFja1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVEZWxpbWl0ZXJzQmV0d2VlbihvcGVuZXIsIGNsb3Nlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgb3BlbmVyIGhhcyAwIGRlbGltcywgcmVtb3ZlIGl0IGFuZCB0aGUgaW5saW5lXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZXIubnVtZGVsaW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZXJfaW5sLnVubGluaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEZWxpbWl0ZXIob3BlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXIubnVtZGVsaW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXJfaW5sLnVubGluaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcHN0YWNrID0gY2xvc2VyLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURlbGltaXRlcihjbG9zZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VyID0gdGVtcHN0YWNrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xvc2VyY2MgPT09IENfU0lOR0xFUVVPVEUpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXIubm9kZS5fbGl0ZXJhbCA9IFwiXFx1MjAxOVwiO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuZXJfZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyLm5vZGUuX2xpdGVyYWwgPSBcIlxcdTIwMThcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xvc2VyID0gY2xvc2VyLm5leHQ7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xvc2VyY2MgPT09IENfRE9VQkxFUVVPVEUpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXIubm9kZS5fbGl0ZXJhbCA9IFwiXFx1MjAxRFwiO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuZXJfZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyLm5vZGUubGl0ZXJhbCA9IFwiXFx1MjAxQ1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbG9zZXIgPSBjbG9zZXIubmV4dDtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvcGVuZXJfZm91bmQgJiYgIW9kZF9tYXRjaCkge1xuICAgICAgICAgICAgICAgIC8vIFNldCBsb3dlciBib3VuZCBmb3IgZnV0dXJlIHNlYXJjaGVzIGZvciBvcGVuZXJzOlxuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGRvIHRoaXMgd2l0aCBvZGRfbWF0Y2ggYmVjYXVzZSBhICoqXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBkb2Vzbid0IG1hdGNoIGFuIGVhcmxpZXIgKiBtaWdodCB0dXJuIGludG9cbiAgICAgICAgICAgICAgICAvLyBhbiBvcGVuZXIsIGFuZCB0aGUgKiBtaWdodCBiZSBtYXRjaGVkIGJ5IHNvbWV0aGluZ1xuICAgICAgICAgICAgICAgIC8vIGVsc2UuXG4gICAgICAgICAgICAgICAgb3BlbmVyc19ib3R0b21bY2xvc2VyY2NdID0gb2xkX2Nsb3Nlci5wcmV2aW91cztcbiAgICAgICAgICAgICAgICBpZiAoIW9sZF9jbG9zZXIuY2FuX29wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuIHJlbW92ZSBhIGNsb3NlciB0aGF0IGNhbid0IGJlIGFuIG9wZW5lcixcbiAgICAgICAgICAgICAgICAgICAgLy8gb25jZSB3ZSd2ZSBzZWVuIHRoZXJlJ3Mgbm8gbWF0Y2hpbmcgb3BlbmVyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURlbGltaXRlcihvbGRfY2xvc2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBhbGwgZGVsaW1pdGVyc1xuICAgIHdoaWxlICh0aGlzLmRlbGltaXRlcnMgIT09IG51bGwgJiYgdGhpcy5kZWxpbWl0ZXJzICE9PSBzdGFja19ib3R0b20pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEZWxpbWl0ZXIodGhpcy5kZWxpbWl0ZXJzKTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGxpbmsgdGl0bGUgKHNhbnMgcXVvdGVzKSwgcmV0dXJuaW5nIHRoZSBzdHJpbmdcbi8vIG9yIG51bGwgaWYgbm8gbWF0Y2guXG52YXIgcGFyc2VMaW5rVGl0bGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGl0bGUgPSB0aGlzLm1hdGNoKHJlTGlua1RpdGxlKTtcbiAgICBpZiAodGl0bGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hvcCBvZmYgcXVvdGVzIGZyb20gdGl0bGUgYW5kIHVuZXNjYXBlOlxuICAgICAgICByZXR1cm4gdW5lc2NhcGVTdHJpbmcodGl0bGUuc3Vic3RyKDEsIHRpdGxlLmxlbmd0aCAtIDIpKTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGxpbmsgZGVzdGluYXRpb24sIHJldHVybmluZyB0aGUgc3RyaW5nIG9yXG4vLyBudWxsIGlmIG5vIG1hdGNoLlxudmFyIHBhcnNlTGlua0Rlc3RpbmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlcyA9IHRoaXMubWF0Y2gocmVMaW5rRGVzdGluYXRpb25CcmFjZXMpO1xuICAgIGlmIChyZXMgPT09IG51bGwpIHtcbiAgICAgICAgLy8gVE9ETyBoYW5kcm9sbGVkIHBhcnNlcjsgcmVzIHNob3VsZCBiZSBudWxsIG9yIHRoZSBzdHJpbmdcbiAgICAgICAgdmFyIHNhdmVwb3MgPSB0aGlzLnBvcztcbiAgICAgICAgdmFyIG9wZW5wYXJlbnMgPSAwO1xuICAgICAgICB2YXIgYztcbiAgICAgICAgd2hpbGUgKChjID0gdGhpcy5wZWVrKCkpICE9PSAtMSkge1xuICAgICAgICAgICAgaWYgKGMgPT09IENfQkFDS1NMQVNIKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wZWVrKCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSBDX09QRU5fUEFSRU4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgIG9wZW5wYXJlbnMgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gQ19DTE9TRV9QQVJFTikge1xuICAgICAgICAgICAgICAgIGlmIChvcGVucGFyZW5zIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBvcGVucGFyZW5zIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZVdoaXRlc3BhY2VDaGFyLmV4ZWMoZnJvbUNvZGVQb2ludChjKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXMgPSB0aGlzLnN1YmplY3Quc3Vic3RyKHNhdmVwb3MsIHRoaXMucG9zIC0gc2F2ZXBvcyk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVVUkkodW5lc2NhcGVTdHJpbmcocmVzKSk7XG4gICAgfSBlbHNlIHsgIC8vIGNob3Agb2ZmIHN1cnJvdW5kaW5nIDwuLj46XG4gICAgICAgIHJldHVybiBub3JtYWxpemVVUkkodW5lc2NhcGVTdHJpbmcocmVzLnN1YnN0cigxLCByZXMubGVuZ3RoIC0gMikpKTtcbiAgICB9XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGEgbGluayBsYWJlbCwgcmV0dXJuaW5nIG51bWJlciBvZiBjaGFyYWN0ZXJzIHBhcnNlZC5cbnZhciBwYXJzZUxpbmtMYWJlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtID0gdGhpcy5tYXRjaChyZUxpbmtMYWJlbCk7XG4gICAgLy8gTm90ZTogIG91ciByZWdleCB3aWxsIGFsbG93IHNvbWV0aGluZyBvZiBmb3JtIFsuLlxcXTtcbiAgICAvLyB3ZSBkaXNhbGxvdyBpdCBoZXJlIHJhdGhlciB0aGFuIHVzaW5nIGxvb2thaGVhZCBpbiB0aGUgcmVnZXg6XG4gICAgaWYgKG0gPT09IG51bGwgfHwgbS5sZW5ndGggPiAxMDAxIHx8IC9bXlxcXFxdXFxcXFxcXSQvLmV4ZWMobSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG0ubGVuZ3RoO1xuICAgIH1cbn07XG5cbi8vIEFkZCBvcGVuIGJyYWNrZXQgdG8gZGVsaW1pdGVyIHN0YWNrIGFuZCBhZGQgYSB0ZXh0IG5vZGUgdG8gYmxvY2sncyBjaGlsZHJlbi5cbnZhciBwYXJzZU9wZW5CcmFja2V0ID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB0aGlzLnBvcyArPSAxO1xuXG4gICAgdmFyIG5vZGUgPSB0ZXh0KCdbJyk7XG4gICAgYmxvY2suYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgICAvLyBBZGQgZW50cnkgdG8gc3RhY2sgZm9yIHRoaXMgb3BlbmVyXG4gICAgdGhpcy5hZGRCcmFja2V0KG5vZGUsIHN0YXJ0cG9zLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBJRiBuZXh0IGNoYXJhY3RlciBpcyBbLCBhbmQgISBkZWxpbWl0ZXIgdG8gZGVsaW1pdGVyIHN0YWNrIGFuZFxuLy8gYWRkIGEgdGV4dCBub2RlIHRvIGJsb2NrJ3MgY2hpbGRyZW4uICBPdGhlcndpc2UganVzdCBhZGQgYSB0ZXh0IG5vZGUuXG52YXIgcGFyc2VCYW5nID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgc3RhcnRwb3MgPSB0aGlzLnBvcztcbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIGlmICh0aGlzLnBlZWsoKSA9PT0gQ19PUEVOX0JSQUNLRVQpIHtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcblxuICAgICAgICB2YXIgbm9kZSA9IHRleHQoJyFbJyk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gICAgICAgIC8vIEFkZCBlbnRyeSB0byBzdGFjayBmb3IgdGhpcyBvcGVuZXJcbiAgICAgICAgdGhpcy5hZGRCcmFja2V0KG5vZGUsIHN0YXJ0cG9zICsgMSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGV4dCgnIScpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBUcnkgdG8gbWF0Y2ggY2xvc2UgYnJhY2tldCBhZ2FpbnN0IGFuIG9wZW5pbmcgaW4gdGhlIGRlbGltaXRlclxuLy8gc3RhY2suICBBZGQgZWl0aGVyIGEgbGluayBvciBpbWFnZSwgb3IgYSBwbGFpbiBbIGNoYXJhY3Rlcixcbi8vIHRvIGJsb2NrJ3MgY2hpbGRyZW4uICBJZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGRlbGltaXRlcixcbi8vIHJlbW92ZSBpdCBmcm9tIHRoZSBkZWxpbWl0ZXIgc3RhY2suXG52YXIgcGFyc2VDbG9zZUJyYWNrZXQgPSBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBzdGFydHBvcztcbiAgICB2YXIgaXNfaW1hZ2U7XG4gICAgdmFyIGRlc3Q7XG4gICAgdmFyIHRpdGxlO1xuICAgIHZhciBtYXRjaGVkID0gZmFsc2U7XG4gICAgdmFyIHJlZmxhYmVsO1xuICAgIHZhciBvcGVuZXI7XG5cbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIHN0YXJ0cG9zID0gdGhpcy5wb3M7XG5cbiAgICAvLyBnZXQgbGFzdCBbIG9yICFbXG4gICAgb3BlbmVyID0gdGhpcy5icmFja2V0cztcblxuICAgIGlmIChvcGVuZXIgPT09IG51bGwpIHtcbiAgICAgICAgLy8gbm8gbWF0Y2hlZCBvcGVuZXIsIGp1c3QgcmV0dXJuIGEgbGl0ZXJhbFxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCddJykpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIW9wZW5lci5hY3RpdmUpIHtcbiAgICAgICAgLy8gbm8gbWF0Y2hlZCBvcGVuZXIsIGp1c3QgcmV0dXJuIGEgbGl0ZXJhbFxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KCddJykpO1xuICAgICAgICAvLyB0YWtlIG9wZW5lciBvZmYgYnJhY2tldHMgc3RhY2tcbiAgICAgICAgdGhpcy5yZW1vdmVCcmFja2V0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGdvdCBoZXJlLCBvcGVuIGlzIGEgcG90ZW50aWFsIG9wZW5lclxuICAgIGlzX2ltYWdlID0gb3BlbmVyLmltYWdlO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSBsaW5rL2ltYWdlXG5cbiAgICB2YXIgc2F2ZXBvcyA9IHRoaXMucG9zO1xuXG4gICAgLy8gSW5saW5lIGxpbms/XG4gICAgaWYgKHRoaXMucGVlaygpID09PSBDX09QRU5fUEFSRU4pIHtcbiAgICAgICAgdGhpcy5wb3MrKztcbiAgICAgICAgaWYgKHRoaXMuc3BubCgpICYmXG4gICAgICAgICAgICAoKGRlc3QgPSB0aGlzLnBhcnNlTGlua0Rlc3RpbmF0aW9uKCkpICE9PSBudWxsKSAmJlxuICAgICAgICAgICAgdGhpcy5zcG5sKCkgJiZcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSdzIGEgc3BhY2UgYmVmb3JlIHRoZSB0aXRsZTpcbiAgICAgICAgICAgIChyZVdoaXRlc3BhY2VDaGFyLnRlc3QodGhpcy5zdWJqZWN0LmNoYXJBdCh0aGlzLnBvcyAtIDEpKSAmJlxuICAgICAgICAgICAgICh0aXRsZSA9IHRoaXMucGFyc2VMaW5rVGl0bGUoKSkgfHwgdHJ1ZSkgJiZcbiAgICAgICAgICAgIHRoaXMuc3BubCgpICYmXG4gICAgICAgICAgICB0aGlzLnBlZWsoKSA9PT0gQ19DTE9TRV9QQVJFTikge1xuICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb3MgPSBzYXZlcG9zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFtYXRjaGVkKSB7XG5cbiAgICAgICAgLy8gTmV4dCwgc2VlIGlmIHRoZXJlJ3MgYSBsaW5rIGxhYmVsXG4gICAgICAgIHZhciBiZWZvcmVsYWJlbCA9IHRoaXMucG9zO1xuICAgICAgICB2YXIgbiA9IHRoaXMucGFyc2VMaW5rTGFiZWwoKTtcbiAgICAgICAgaWYgKG4gPiAyKSB7XG4gICAgICAgICAgICByZWZsYWJlbCA9IHRoaXMuc3ViamVjdC5zbGljZShiZWZvcmVsYWJlbCwgYmVmb3JlbGFiZWwgKyBuKTtcbiAgICAgICAgfSBlbHNlIGlmICghb3BlbmVyLmJyYWNrZXRBZnRlcikge1xuICAgICAgICAgICAgLy8gRW1wdHkgb3IgbWlzc2luZyBzZWNvbmQgbGFiZWwgbWVhbnMgdG8gdXNlIHRoZSBmaXJzdCBsYWJlbCBhcyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgICAgLy8gVGhlIHJlZmVyZW5jZSBtdXN0IG5vdCBjb250YWluIGEgYnJhY2tldC4gSWYgd2Uga25vdyB0aGVyZSdzIGEgYnJhY2tldCwgd2UgZG9uJ3QgZXZlbiBib3RoZXIgY2hlY2tpbmcgaXQuXG4gICAgICAgICAgICByZWZsYWJlbCA9IHRoaXMuc3ViamVjdC5zbGljZShvcGVuZXIuaW5kZXgsIHN0YXJ0cG9zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgICAgLy8gSWYgc2hvcnRjdXQgcmVmZXJlbmNlIGxpbmssIHJld2luZCBiZWZvcmUgc3BhY2VzIHdlIHNraXBwZWQuXG4gICAgICAgICAgICB0aGlzLnBvcyA9IHNhdmVwb3M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVmbGFiZWwpIHtcbiAgICAgICAgICAgIC8vIGxvb2t1cCByYXdsYWJlbCBpbiByZWZtYXBcbiAgICAgICAgICAgIHZhciBsaW5rID0gdGhpcy5yZWZtYXBbbm9ybWFsaXplUmVmZXJlbmNlKHJlZmxhYmVsKV07XG4gICAgICAgICAgICBpZiAobGluaykge1xuICAgICAgICAgICAgICAgIGRlc3QgPSBsaW5rLmRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgICAgIHRpdGxlID0gbGluay50aXRsZTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgIHZhciBub2RlID0gbmV3IE5vZGUoaXNfaW1hZ2UgPyAnaW1hZ2UnIDogJ2xpbmsnKTtcbiAgICAgICAgbm9kZS5fZGVzdGluYXRpb24gPSBkZXN0O1xuICAgICAgICBub2RlLl90aXRsZSA9IHRpdGxlIHx8ICcnO1xuXG4gICAgICAgIHZhciB0bXAsIG5leHQ7XG4gICAgICAgIHRtcCA9IG9wZW5lci5ub2RlLl9uZXh0O1xuICAgICAgICB3aGlsZSAodG1wKSB7XG4gICAgICAgICAgICBuZXh0ID0gdG1wLl9uZXh0O1xuICAgICAgICAgICAgdG1wLnVubGluaygpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0bXApO1xuICAgICAgICAgICAgdG1wID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzRW1waGFzaXMob3BlbmVyLnByZXZpb3VzRGVsaW1pdGVyKTtcbiAgICAgICAgdGhpcy5yZW1vdmVCcmFja2V0KCk7XG4gICAgICAgIG9wZW5lci5ub2RlLnVubGluaygpO1xuXG4gICAgICAgIC8vIFdlIHJlbW92ZSB0aGlzIGJyYWNrZXQgYW5kIHByb2Nlc3NFbXBoYXNpcyB3aWxsIHJlbW92ZSBsYXRlciBkZWxpbWl0ZXJzLlxuICAgICAgICAvLyBOb3csIGZvciBhIGxpbmssIHdlIGFsc28gZGVhY3RpdmF0ZSBlYXJsaWVyIGxpbmsgb3BlbmVycy5cbiAgICAgICAgLy8gKG5vIGxpbmtzIGluIGxpbmtzKVxuICAgICAgICBpZiAoIWlzX2ltYWdlKSB7XG4gICAgICAgICAgb3BlbmVyID0gdGhpcy5icmFja2V0cztcbiAgICAgICAgICB3aGlsZSAob3BlbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIW9wZW5lci5pbWFnZSkge1xuICAgICAgICAgICAgICAgIG9wZW5lci5hY3RpdmUgPSBmYWxzZTsgLy8gZGVhY3RpdmF0ZSB0aGlzIG9wZW5lclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3BlbmVyID0gb3BlbmVyLnByZXZpb3VzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfSBlbHNlIHsgLy8gbm8gbWF0Y2hcblxuICAgICAgICB0aGlzLnJlbW92ZUJyYWNrZXQoKTsgIC8vIHJlbW92ZSB0aGlzIG9wZW5lciBmcm9tIHN0YWNrXG4gICAgICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoJ10nKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufTtcblxudmFyIGFkZEJyYWNrZXQgPSBmdW5jdGlvbihub2RlLCBpbmRleCwgaW1hZ2UpIHtcbiAgICBpZiAodGhpcy5icmFja2V0cyAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmJyYWNrZXRzLmJyYWNrZXRBZnRlciA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuYnJhY2tldHMgPSB7IG5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IHRoaXMuYnJhY2tldHMsXG4gICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNEZWxpbWl0ZXI6IHRoaXMuZGVsaW1pdGVycyxcbiAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSB9O1xufTtcblxudmFyIHJlbW92ZUJyYWNrZXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJyYWNrZXRzID0gdGhpcy5icmFja2V0cy5wcmV2aW91cztcbn07XG5cbi8vIEF0dGVtcHQgdG8gcGFyc2UgYW4gZW50aXR5LlxudmFyIHBhcnNlRW50aXR5ID0gZnVuY3Rpb24oYmxvY2spIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoKG0gPSB0aGlzLm1hdGNoKHJlRW50aXR5SGVyZSkpKSB7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoZGVjb2RlSFRNTChtKSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLy8gUGFyc2UgYSBydW4gb2Ygb3JkaW5hcnkgY2hhcmFjdGVycywgb3IgYSBzaW5nbGUgY2hhcmFjdGVyIHdpdGhcbi8vIGEgc3BlY2lhbCBtZWFuaW5nIGluIG1hcmtkb3duLCBhcyBhIHBsYWluIHN0cmluZy5cbnZhciBwYXJzZVN0cmluZyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKChtID0gdGhpcy5tYXRjaChyZU1haW4pKSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0KSB7XG4gICAgICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0ZXh0KFxuICAgICAgICAgICAgICAgIG0ucmVwbGFjZShyZUVsbGlwc2VzLCBcIlxcdTIwMjZcIilcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UocmVEYXNoLCBmdW5jdGlvbihjaGFycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVuQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVtQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJzLmxlbmd0aCAlIDMgPT09IDApIHsgLy8gSWYgZGl2aXNpYmxlIGJ5IDMsIHVzZSBhbGwgZW0gZGFzaGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1Db3VudCA9IGNoYXJzLmxlbmd0aCAvIDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJzLmxlbmd0aCAlIDIgPT09IDApIHsgLy8gSWYgZGl2aXNpYmxlIGJ5IDIsIHVzZSBhbGwgZW4gZGFzaGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5Db3VudCA9IGNoYXJzLmxlbmd0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJzLmxlbmd0aCAlIDMgPT09IDIpIHsgLy8gSWYgMiBleHRyYSBkYXNoZXMsIHVzZSBlbiBkYXNoIGZvciBsYXN0IDI7IGVtIGRhc2hlcyBmb3IgcmVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuQ291bnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtQ291bnQgPSAoY2hhcnMubGVuZ3RoIC0gMikgLyAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gVXNlIGVuIGRhc2hlcyBmb3IgbGFzdCA0IGh5cGhlbnM7IGVtIGRhc2hlcyBmb3IgcmVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuQ291bnQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtQ291bnQgPSAoY2hhcnMubGVuZ3RoIC0gNCkgLyAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXFx1MjAxNFwiLnJlcGVhdChlbUNvdW50KSArIFwiXFx1MjAxM1wiLnJlcGVhdChlbkNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQobSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vLyBQYXJzZSBhIG5ld2xpbmUuICBJZiBpdCB3YXMgcHJlY2VkZWQgYnkgdHdvIHNwYWNlcywgcmV0dXJuIGEgaGFyZFxuLy8gbGluZSBicmVhazsgb3RoZXJ3aXNlIGEgc29mdCBsaW5lIGJyZWFrLlxudmFyIHBhcnNlTmV3bGluZSA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdGhpcy5wb3MgKz0gMTsgLy8gYXNzdW1lIHdlJ3JlIGF0IGEgXFxuXG4gICAgLy8gY2hlY2sgcHJldmlvdXMgbm9kZSBmb3IgdHJhaWxpbmcgc3BhY2VzXG4gICAgdmFyIGxhc3RjID0gYmxvY2suX2xhc3RDaGlsZDtcbiAgICBpZiAobGFzdGMgJiYgbGFzdGMudHlwZSA9PT0gJ3RleHQnICYmIGxhc3RjLl9saXRlcmFsW2xhc3RjLl9saXRlcmFsLmxlbmd0aCAtIDFdID09PSAnICcpIHtcbiAgICAgICAgdmFyIGhhcmRicmVhayA9IGxhc3RjLl9saXRlcmFsW2xhc3RjLl9saXRlcmFsLmxlbmd0aCAtIDJdID09PSAnICc7XG4gICAgICAgIGxhc3RjLl9saXRlcmFsID0gbGFzdGMuX2xpdGVyYWwucmVwbGFjZShyZUZpbmFsU3BhY2UsICcnKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQobmV3IE5vZGUoaGFyZGJyZWFrID8gJ2xpbmVicmVhaycgOiAnc29mdGJyZWFrJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKG5ldyBOb2RlKCdzb2Z0YnJlYWsnKSk7XG4gICAgfVxuICAgIHRoaXMubWF0Y2gocmVJbml0aWFsU3BhY2UpOyAvLyBnb2JibGUgbGVhZGluZyBzcGFjZXMgaW4gbmV4dCBsaW5lXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBBdHRlbXB0IHRvIHBhcnNlIGEgbGluayByZWZlcmVuY2UsIG1vZGlmeWluZyByZWZtYXAuXG52YXIgcGFyc2VSZWZlcmVuY2UgPSBmdW5jdGlvbihzLCByZWZtYXApIHtcbiAgICB0aGlzLnN1YmplY3QgPSBzO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB2YXIgcmF3bGFiZWw7XG4gICAgdmFyIGRlc3Q7XG4gICAgdmFyIHRpdGxlO1xuICAgIHZhciBtYXRjaENoYXJzO1xuICAgIHZhciBzdGFydHBvcyA9IHRoaXMucG9zO1xuXG4gICAgLy8gbGFiZWw6XG4gICAgbWF0Y2hDaGFycyA9IHRoaXMucGFyc2VMaW5rTGFiZWwoKTtcbiAgICBpZiAobWF0Y2hDaGFycyA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByYXdsYWJlbCA9IHRoaXMuc3ViamVjdC5zdWJzdHIoMCwgbWF0Y2hDaGFycyk7XG4gICAgfVxuXG4gICAgLy8gY29sb246XG4gICAgaWYgKHRoaXMucGVlaygpID09PSBDX0NPTE9OKSB7XG4gICAgICAgIHRoaXMucG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3MgPSBzdGFydHBvcztcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gIGxpbmsgdXJsXG4gICAgdGhpcy5zcG5sKCk7XG5cbiAgICBkZXN0ID0gdGhpcy5wYXJzZUxpbmtEZXN0aW5hdGlvbigpO1xuICAgIGlmIChkZXN0ID09PSBudWxsIHx8IGRlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMucG9zID0gc3RhcnRwb3M7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciBiZWZvcmV0aXRsZSA9IHRoaXMucG9zO1xuICAgIHRoaXMuc3BubCgpO1xuICAgIHRpdGxlID0gdGhpcy5wYXJzZUxpbmtUaXRsZSgpO1xuICAgIGlmICh0aXRsZSA9PT0gbnVsbCkge1xuICAgICAgICB0aXRsZSA9ICcnO1xuICAgICAgICAvLyByZXdpbmQgYmVmb3JlIHNwYWNlc1xuICAgICAgICB0aGlzLnBvcyA9IGJlZm9yZXRpdGxlO1xuICAgIH1cblxuICAgIC8vIG1ha2Ugc3VyZSB3ZSdyZSBhdCBsaW5lIGVuZDpcbiAgICB2YXIgYXRMaW5lRW5kID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5tYXRjaChyZVNwYWNlQXRFbmRPZkxpbmUpID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aXRsZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGF0TGluZUVuZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIHBvdGVudGlhbCB0aXRsZSB3ZSBmb3VuZCBpcyBub3QgYXQgdGhlIGxpbmUgZW5kLFxuICAgICAgICAgICAgLy8gYnV0IGl0IGNvdWxkIHN0aWxsIGJlIGEgbGVnYWwgbGluayByZWZlcmVuY2UgaWYgd2VcbiAgICAgICAgICAgIC8vIGRpc2NhcmQgdGhlIHRpdGxlXG4gICAgICAgICAgICB0aXRsZSA9ICcnO1xuICAgICAgICAgICAgLy8gcmV3aW5kIGJlZm9yZSBzcGFjZXNcbiAgICAgICAgICAgIHRoaXMucG9zID0gYmVmb3JldGl0bGU7XG4gICAgICAgICAgICAvLyBhbmQgaW5zdGVhZCBjaGVjayBpZiB0aGUgbGluayBVUkwgaXMgYXQgdGhlIGxpbmUgZW5kXG4gICAgICAgICAgICBhdExpbmVFbmQgPSB0aGlzLm1hdGNoKHJlU3BhY2VBdEVuZE9mTGluZSkgIT09IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWF0TGluZUVuZCkge1xuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgbm9ybWxhYmVsID0gbm9ybWFsaXplUmVmZXJlbmNlKHJhd2xhYmVsKTtcbiAgICBpZiAobm9ybWxhYmVsID09PSAnJykge1xuICAgICAgICAvLyBsYWJlbCBtdXN0IGNvbnRhaW4gbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyc1xuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0cG9zO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAoIXJlZm1hcFtub3JtbGFiZWxdKSB7XG4gICAgICAgIHJlZm1hcFtub3JtbGFiZWxdID0geyBkZXN0aW5hdGlvbjogZGVzdCwgdGl0bGU6IHRpdGxlIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBvcyAtIHN0YXJ0cG9zO1xufTtcblxuLy8gUGFyc2UgdGhlIG5leHQgaW5saW5lIGVsZW1lbnQgaW4gc3ViamVjdCwgYWR2YW5jaW5nIHN1YmplY3QgcG9zaXRpb24uXG4vLyBPbiBzdWNjZXNzLCBhZGQgdGhlIHJlc3VsdCB0byBibG9jaydzIGNoaWxkcmVuIGFuZCByZXR1cm4gdHJ1ZS5cbi8vIE9uIGZhaWx1cmUsIHJldHVybiBmYWxzZS5cbnZhciBwYXJzZUlubGluZSA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdmFyIHJlcyA9IGZhbHNlO1xuICAgIHZhciBjID0gdGhpcy5wZWVrKCk7XG4gICAgaWYgKGMgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3dpdGNoKGMpIHtcbiAgICBjYXNlIENfTkVXTElORTpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZU5ld2xpbmUoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQkFDS1NMQVNIOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlQmFja3NsYXNoKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0JBQ0tUSUNLOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlQmFja3RpY2tzKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX0FTVEVSSVNLOlxuICAgIGNhc2UgQ19VTkRFUlNDT1JFOlxuICAgICAgICByZXMgPSB0aGlzLmhhbmRsZURlbGltKGMsIGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBDX1NJTkdMRVFVT1RFOlxuICAgIGNhc2UgQ19ET1VCTEVRVU9URTpcbiAgICAgICAgcmVzID0gdGhpcy5vcHRpb25zLnNtYXJ0ICYmIHRoaXMuaGFuZGxlRGVsaW0oYywgYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfT1BFTl9CUkFDS0VUOlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlT3BlbkJyYWNrZXQoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQkFORzpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUJhbmcoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIENfQ0xPU0VfQlJBQ0tFVDpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUNsb3NlQnJhY2tldChibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19MRVNTVEhBTjpcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZUF1dG9saW5rKGJsb2NrKSB8fCB0aGlzLnBhcnNlSHRtbFRhZyhibG9jayk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ19BTVBFUlNBTkQ6XG4gICAgICAgIHJlcyA9IHRoaXMucGFyc2VFbnRpdHkoYmxvY2spO1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXMgPSB0aGlzLnBhcnNlU3RyaW5nKGJsb2NrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICghcmVzKSB7XG4gICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRleHQoZnJvbUNvZGVQb2ludChjKSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gUGFyc2Ugc3RyaW5nIGNvbnRlbnQgaW4gYmxvY2sgaW50byBpbmxpbmUgY2hpbGRyZW4sXG4vLyB1c2luZyByZWZtYXAgdG8gcmVzb2x2ZSByZWZlcmVuY2VzLlxudmFyIHBhcnNlSW5saW5lcyA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gICAgdGhpcy5zdWJqZWN0ID0gYmxvY2suX3N0cmluZ19jb250ZW50LnRyaW0oKTtcbiAgICB0aGlzLnBvcyA9IDA7XG4gICAgdGhpcy5kZWxpbWl0ZXJzID0gbnVsbDtcbiAgICB0aGlzLmJyYWNrZXRzID0gbnVsbDtcbiAgICB3aGlsZSAodGhpcy5wYXJzZUlubGluZShibG9jaykpIHtcbiAgICB9XG4gICAgYmxvY2suX3N0cmluZ19jb250ZW50ID0gbnVsbDsgLy8gYWxsb3cgcmF3IHN0cmluZyB0byBiZSBnYXJiYWdlIGNvbGxlY3RlZFxuICAgIHRoaXMucHJvY2Vzc0VtcGhhc2lzKG51bGwpO1xufTtcblxuLy8gVGhlIElubGluZVBhcnNlciBvYmplY3QuXG5mdW5jdGlvbiBJbmxpbmVQYXJzZXIob3B0aW9ucyl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3ViamVjdDogJycsXG4gICAgICAgIGRlbGltaXRlcnM6IG51bGwsICAvLyB1c2VkIGJ5IGhhbmRsZURlbGltIG1ldGhvZFxuICAgICAgICBicmFja2V0czogbnVsbCxcbiAgICAgICAgcG9zOiAwLFxuICAgICAgICByZWZtYXA6IHt9LFxuICAgICAgICBtYXRjaDogbWF0Y2gsXG4gICAgICAgIHBlZWs6IHBlZWssXG4gICAgICAgIHNwbmw6IHNwbmwsXG4gICAgICAgIHBhcnNlQmFja3RpY2tzOiBwYXJzZUJhY2t0aWNrcyxcbiAgICAgICAgcGFyc2VCYWNrc2xhc2g6IHBhcnNlQmFja3NsYXNoLFxuICAgICAgICBwYXJzZUF1dG9saW5rOiBwYXJzZUF1dG9saW5rLFxuICAgICAgICBwYXJzZUh0bWxUYWc6IHBhcnNlSHRtbFRhZyxcbiAgICAgICAgc2NhbkRlbGltczogc2NhbkRlbGltcyxcbiAgICAgICAgaGFuZGxlRGVsaW06IGhhbmRsZURlbGltLFxuICAgICAgICBwYXJzZUxpbmtUaXRsZTogcGFyc2VMaW5rVGl0bGUsXG4gICAgICAgIHBhcnNlTGlua0Rlc3RpbmF0aW9uOiBwYXJzZUxpbmtEZXN0aW5hdGlvbixcbiAgICAgICAgcGFyc2VMaW5rTGFiZWw6IHBhcnNlTGlua0xhYmVsLFxuICAgICAgICBwYXJzZU9wZW5CcmFja2V0OiBwYXJzZU9wZW5CcmFja2V0LFxuICAgICAgICBwYXJzZUJhbmc6IHBhcnNlQmFuZyxcbiAgICAgICAgcGFyc2VDbG9zZUJyYWNrZXQ6IHBhcnNlQ2xvc2VCcmFja2V0LFxuICAgICAgICBhZGRCcmFja2V0OiBhZGRCcmFja2V0LFxuICAgICAgICByZW1vdmVCcmFja2V0OiByZW1vdmVCcmFja2V0LFxuICAgICAgICBwYXJzZUVudGl0eTogcGFyc2VFbnRpdHksXG4gICAgICAgIHBhcnNlU3RyaW5nOiBwYXJzZVN0cmluZyxcbiAgICAgICAgcGFyc2VOZXdsaW5lOiBwYXJzZU5ld2xpbmUsXG4gICAgICAgIHBhcnNlUmVmZXJlbmNlOiBwYXJzZVJlZmVyZW5jZSxcbiAgICAgICAgcGFyc2VJbmxpbmU6IHBhcnNlSW5saW5lLFxuICAgICAgICBwcm9jZXNzRW1waGFzaXM6IHByb2Nlc3NFbXBoYXNpcyxcbiAgICAgICAgcmVtb3ZlRGVsaW1pdGVyOiByZW1vdmVEZWxpbWl0ZXIsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnMgfHwge30sXG4gICAgICAgIHBhcnNlOiBwYXJzZUlubGluZXNcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZVBhcnNlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2lubGluZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBUaGUgYnVsayBvZiB0aGlzIGNvZGUgZGVyaXZlcyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kbW9zY3JvcC9mb2xkLWNhc2VcbkJ1dCBpbiBhZGRpdGlvbiB0byBjYXNlLWZvbGRpbmcsIHdlIGFsc28gbm9ybWFsaXplIHdoaXRlc3BhY2UuXG5cbmZvbGQtY2FzZSBpcyBDb3B5cmlnaHQgTWF0aGlhcyBCeW5lbnMgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS8+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbndpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG50aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbk5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcbkxJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cbk9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4vKmVzbGludC1kaXNhYmxlICBrZXktc3BhY2luZywgY29tbWEtc3BhY2luZyAqL1xuXG52YXIgcmVnZXggPSAvWyBcXHRcXHJcXG5dK3xbQS1aXFx4QjVcXHhDMC1cXHhENlxceEQ4LVxceERGXFx1MDEwMFxcdTAxMDJcXHUwMTA0XFx1MDEwNlxcdTAxMDhcXHUwMTBBXFx1MDEwQ1xcdTAxMEVcXHUwMTEwXFx1MDExMlxcdTAxMTRcXHUwMTE2XFx1MDExOFxcdTAxMUFcXHUwMTFDXFx1MDExRVxcdTAxMjBcXHUwMTIyXFx1MDEyNFxcdTAxMjZcXHUwMTI4XFx1MDEyQVxcdTAxMkNcXHUwMTJFXFx1MDEzMFxcdTAxMzJcXHUwMTM0XFx1MDEzNlxcdTAxMzlcXHUwMTNCXFx1MDEzRFxcdTAxM0ZcXHUwMTQxXFx1MDE0M1xcdTAxNDVcXHUwMTQ3XFx1MDE0OVxcdTAxNEFcXHUwMTRDXFx1MDE0RVxcdTAxNTBcXHUwMTUyXFx1MDE1NFxcdTAxNTZcXHUwMTU4XFx1MDE1QVxcdTAxNUNcXHUwMTVFXFx1MDE2MFxcdTAxNjJcXHUwMTY0XFx1MDE2NlxcdTAxNjhcXHUwMTZBXFx1MDE2Q1xcdTAxNkVcXHUwMTcwXFx1MDE3MlxcdTAxNzRcXHUwMTc2XFx1MDE3OFxcdTAxNzlcXHUwMTdCXFx1MDE3RFxcdTAxN0ZcXHUwMTgxXFx1MDE4MlxcdTAxODRcXHUwMTg2XFx1MDE4N1xcdTAxODktXFx1MDE4QlxcdTAxOEUtXFx1MDE5MVxcdTAxOTNcXHUwMTk0XFx1MDE5Ni1cXHUwMTk4XFx1MDE5Q1xcdTAxOURcXHUwMTlGXFx1MDFBMFxcdTAxQTJcXHUwMUE0XFx1MDFBNlxcdTAxQTdcXHUwMUE5XFx1MDFBQ1xcdTAxQUVcXHUwMUFGXFx1MDFCMS1cXHUwMUIzXFx1MDFCNVxcdTAxQjdcXHUwMUI4XFx1MDFCQ1xcdTAxQzRcXHUwMUM1XFx1MDFDN1xcdTAxQzhcXHUwMUNBXFx1MDFDQlxcdTAxQ0RcXHUwMUNGXFx1MDFEMVxcdTAxRDNcXHUwMUQ1XFx1MDFEN1xcdTAxRDlcXHUwMURCXFx1MDFERVxcdTAxRTBcXHUwMUUyXFx1MDFFNFxcdTAxRTZcXHUwMUU4XFx1MDFFQVxcdTAxRUNcXHUwMUVFXFx1MDFGMC1cXHUwMUYyXFx1MDFGNFxcdTAxRjYtXFx1MDFGOFxcdTAxRkFcXHUwMUZDXFx1MDFGRVxcdTAyMDBcXHUwMjAyXFx1MDIwNFxcdTAyMDZcXHUwMjA4XFx1MDIwQVxcdTAyMENcXHUwMjBFXFx1MDIxMFxcdTAyMTJcXHUwMjE0XFx1MDIxNlxcdTAyMThcXHUwMjFBXFx1MDIxQ1xcdTAyMUVcXHUwMjIwXFx1MDIyMlxcdTAyMjRcXHUwMjI2XFx1MDIyOFxcdTAyMkFcXHUwMjJDXFx1MDIyRVxcdTAyMzBcXHUwMjMyXFx1MDIzQVxcdTAyM0JcXHUwMjNEXFx1MDIzRVxcdTAyNDFcXHUwMjQzLVxcdTAyNDZcXHUwMjQ4XFx1MDI0QVxcdTAyNENcXHUwMjRFXFx1MDM0NVxcdTAzNzBcXHUwMzcyXFx1MDM3NlxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNBQlxcdTAzQjBcXHUwM0MyXFx1MDNDRi1cXHUwM0QxXFx1MDNENVxcdTAzRDZcXHUwM0Q4XFx1MDNEQVxcdTAzRENcXHUwM0RFXFx1MDNFMFxcdTAzRTJcXHUwM0U0XFx1MDNFNlxcdTAzRThcXHUwM0VBXFx1MDNFQ1xcdTAzRUVcXHUwM0YwXFx1MDNGMVxcdTAzRjRcXHUwM0Y1XFx1MDNGN1xcdTAzRjlcXHUwM0ZBXFx1MDNGRC1cXHUwNDJGXFx1MDQ2MFxcdTA0NjJcXHUwNDY0XFx1MDQ2NlxcdTA0NjhcXHUwNDZBXFx1MDQ2Q1xcdTA0NkVcXHUwNDcwXFx1MDQ3MlxcdTA0NzRcXHUwNDc2XFx1MDQ3OFxcdTA0N0FcXHUwNDdDXFx1MDQ3RVxcdTA0ODBcXHUwNDhBXFx1MDQ4Q1xcdTA0OEVcXHUwNDkwXFx1MDQ5MlxcdTA0OTRcXHUwNDk2XFx1MDQ5OFxcdTA0OUFcXHUwNDlDXFx1MDQ5RVxcdTA0QTBcXHUwNEEyXFx1MDRBNFxcdTA0QTZcXHUwNEE4XFx1MDRBQVxcdTA0QUNcXHUwNEFFXFx1MDRCMFxcdTA0QjJcXHUwNEI0XFx1MDRCNlxcdTA0QjhcXHUwNEJBXFx1MDRCQ1xcdTA0QkVcXHUwNEMwXFx1MDRDMVxcdTA0QzNcXHUwNEM1XFx1MDRDN1xcdTA0QzlcXHUwNENCXFx1MDRDRFxcdTA0RDBcXHUwNEQyXFx1MDRENFxcdTA0RDZcXHUwNEQ4XFx1MDREQVxcdTA0RENcXHUwNERFXFx1MDRFMFxcdTA0RTJcXHUwNEU0XFx1MDRFNlxcdTA0RThcXHUwNEVBXFx1MDRFQ1xcdTA0RUVcXHUwNEYwXFx1MDRGMlxcdTA0RjRcXHUwNEY2XFx1MDRGOFxcdTA0RkFcXHUwNEZDXFx1MDRGRVxcdTA1MDBcXHUwNTAyXFx1MDUwNFxcdTA1MDZcXHUwNTA4XFx1MDUwQVxcdTA1MENcXHUwNTBFXFx1MDUxMFxcdTA1MTJcXHUwNTE0XFx1MDUxNlxcdTA1MThcXHUwNTFBXFx1MDUxQ1xcdTA1MUVcXHUwNTIwXFx1MDUyMlxcdTA1MjRcXHUwNTI2XFx1MDUyOFxcdTA1MkFcXHUwNTJDXFx1MDUyRVxcdTA1MzEtXFx1MDU1NlxcdTA1ODdcXHUxMEEwLVxcdTEwQzVcXHUxMEM3XFx1MTBDRFxcdTFFMDBcXHUxRTAyXFx1MUUwNFxcdTFFMDZcXHUxRTA4XFx1MUUwQVxcdTFFMENcXHUxRTBFXFx1MUUxMFxcdTFFMTJcXHUxRTE0XFx1MUUxNlxcdTFFMThcXHUxRTFBXFx1MUUxQ1xcdTFFMUVcXHUxRTIwXFx1MUUyMlxcdTFFMjRcXHUxRTI2XFx1MUUyOFxcdTFFMkFcXHUxRTJDXFx1MUUyRVxcdTFFMzBcXHUxRTMyXFx1MUUzNFxcdTFFMzZcXHUxRTM4XFx1MUUzQVxcdTFFM0NcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUxRTQ0XFx1MUU0NlxcdTFFNDhcXHUxRTRBXFx1MUU0Q1xcdTFFNEVcXHUxRTUwXFx1MUU1MlxcdTFFNTRcXHUxRTU2XFx1MUU1OFxcdTFFNUFcXHUxRTVDXFx1MUU1RVxcdTFFNjBcXHUxRTYyXFx1MUU2NFxcdTFFNjZcXHUxRTY4XFx1MUU2QVxcdTFFNkNcXHUxRTZFXFx1MUU3MFxcdTFFNzJcXHUxRTc0XFx1MUU3NlxcdTFFNzhcXHUxRTdBXFx1MUU3Q1xcdTFFN0VcXHUxRTgwXFx1MUU4MlxcdTFFODRcXHUxRTg2XFx1MUU4OFxcdTFFOEFcXHUxRThDXFx1MUU4RVxcdTFFOTBcXHUxRTkyXFx1MUU5NFxcdTFFOTYtXFx1MUU5QlxcdTFFOUVcXHUxRUEwXFx1MUVBMlxcdTFFQTRcXHUxRUE2XFx1MUVBOFxcdTFFQUFcXHUxRUFDXFx1MUVBRVxcdTFFQjBcXHUxRUIyXFx1MUVCNFxcdTFFQjZcXHUxRUI4XFx1MUVCQVxcdTFFQkNcXHUxRUJFXFx1MUVDMFxcdTFFQzJcXHUxRUM0XFx1MUVDNlxcdTFFQzhcXHUxRUNBXFx1MUVDQ1xcdTFFQ0VcXHUxRUQwXFx1MUVEMlxcdTFFRDRcXHUxRUQ2XFx1MUVEOFxcdTFFREFcXHUxRURDXFx1MUVERVxcdTFFRTBcXHUxRUUyXFx1MUVFNFxcdTFFRTZcXHUxRUU4XFx1MUVFQVxcdTFFRUNcXHUxRUVFXFx1MUVGMFxcdTFFRjJcXHUxRUY0XFx1MUVGNlxcdTFFRjhcXHUxRUZBXFx1MUVGQ1xcdTFFRkVcXHUxRjA4LVxcdTFGMEZcXHUxRjE4LVxcdTFGMURcXHUxRjI4LVxcdTFGMkZcXHUxRjM4LVxcdTFGM0ZcXHUxRjQ4LVxcdTFGNERcXHUxRjUwXFx1MUY1MlxcdTFGNTRcXHUxRjU2XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1RlxcdTFGNjgtXFx1MUY2RlxcdTFGODAtXFx1MUZBRlxcdTFGQjItXFx1MUZCNFxcdTFGQjYtXFx1MUZCQ1xcdTFGQkVcXHUxRkMyLVxcdTFGQzRcXHUxRkM2LVxcdTFGQ0NcXHUxRkQyXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTItXFx1MUZFNFxcdTFGRTYtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIxMjZcXHUyMTJBXFx1MjEyQlxcdTIxMzJcXHUyMTYwLVxcdTIxNkZcXHUyMTgzXFx1MjRCNi1cXHUyNENGXFx1MkMwMC1cXHUyQzJFXFx1MkM2MFxcdTJDNjItXFx1MkM2NFxcdTJDNjdcXHUyQzY5XFx1MkM2QlxcdTJDNkQtXFx1MkM3MFxcdTJDNzJcXHUyQzc1XFx1MkM3RS1cXHUyQzgwXFx1MkM4MlxcdTJDODRcXHUyQzg2XFx1MkM4OFxcdTJDOEFcXHUyQzhDXFx1MkM4RVxcdTJDOTBcXHUyQzkyXFx1MkM5NFxcdTJDOTZcXHUyQzk4XFx1MkM5QVxcdTJDOUNcXHUyQzlFXFx1MkNBMFxcdTJDQTJcXHUyQ0E0XFx1MkNBNlxcdTJDQThcXHUyQ0FBXFx1MkNBQ1xcdTJDQUVcXHUyQ0IwXFx1MkNCMlxcdTJDQjRcXHUyQ0I2XFx1MkNCOFxcdTJDQkFcXHUyQ0JDXFx1MkNCRVxcdTJDQzBcXHUyQ0MyXFx1MkNDNFxcdTJDQzZcXHUyQ0M4XFx1MkNDQVxcdTJDQ0NcXHUyQ0NFXFx1MkNEMFxcdTJDRDJcXHUyQ0Q0XFx1MkNENlxcdTJDRDhcXHUyQ0RBXFx1MkNEQ1xcdTJDREVcXHUyQ0UwXFx1MkNFMlxcdTJDRUJcXHUyQ0VEXFx1MkNGMlxcdUE2NDBcXHVBNjQyXFx1QTY0NFxcdUE2NDZcXHVBNjQ4XFx1QTY0QVxcdUE2NENcXHVBNjRFXFx1QTY1MFxcdUE2NTJcXHVBNjU0XFx1QTY1NlxcdUE2NThcXHVBNjVBXFx1QTY1Q1xcdUE2NUVcXHVBNjYwXFx1QTY2MlxcdUE2NjRcXHVBNjY2XFx1QTY2OFxcdUE2NkFcXHVBNjZDXFx1QTY4MFxcdUE2ODJcXHVBNjg0XFx1QTY4NlxcdUE2ODhcXHVBNjhBXFx1QTY4Q1xcdUE2OEVcXHVBNjkwXFx1QTY5MlxcdUE2OTRcXHVBNjk2XFx1QTY5OFxcdUE2OUFcXHVBNzIyXFx1QTcyNFxcdUE3MjZcXHVBNzI4XFx1QTcyQVxcdUE3MkNcXHVBNzJFXFx1QTczMlxcdUE3MzRcXHVBNzM2XFx1QTczOFxcdUE3M0FcXHVBNzNDXFx1QTczRVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3NDZcXHVBNzQ4XFx1QTc0QVxcdUE3NENcXHVBNzRFXFx1QTc1MFxcdUE3NTJcXHVBNzU0XFx1QTc1NlxcdUE3NThcXHVBNzVBXFx1QTc1Q1xcdUE3NUVcXHVBNzYwXFx1QTc2MlxcdUE3NjRcXHVBNzY2XFx1QTc2OFxcdUE3NkFcXHVBNzZDXFx1QTc2RVxcdUE3NzlcXHVBNzdCXFx1QTc3RFxcdUE3N0VcXHVBNzgwXFx1QTc4MlxcdUE3ODRcXHVBNzg2XFx1QTc4QlxcdUE3OERcXHVBNzkwXFx1QTc5MlxcdUE3OTZcXHVBNzk4XFx1QTc5QVxcdUE3OUNcXHVBNzlFXFx1QTdBMFxcdUE3QTJcXHVBN0E0XFx1QTdBNlxcdUE3QThcXHVBN0FBLVxcdUE3QURcXHVBN0IwXFx1QTdCMVxcdUZCMDAtXFx1RkIwNlxcdUZCMTMtXFx1RkIxN1xcdUZGMjEtXFx1RkYzQV18XFx1RDgwMVtcXHVEQzAwLVxcdURDMjddfFxcdUQ4MDZbXFx1RENBMC1cXHVEQ0JGXS9nO1xuXG52YXIgbWFwID0geydBJzonYScsJ0InOidiJywnQyc6J2MnLCdEJzonZCcsJ0UnOidlJywnRic6J2YnLCdHJzonZycsJ0gnOidoJywnSSc6J2knLCdKJzonaicsJ0snOidrJywnTCc6J2wnLCdNJzonbScsJ04nOiduJywnTyc6J28nLCdQJzoncCcsJ1EnOidxJywnUic6J3InLCdTJzoncycsJ1QnOid0JywnVSc6J3UnLCdWJzondicsJ1cnOid3JywnWCc6J3gnLCdZJzoneScsJ1onOid6JywnXFx4QjUnOidcXHUwM0JDJywnXFx4QzAnOidcXHhFMCcsJ1xceEMxJzonXFx4RTEnLCdcXHhDMic6J1xceEUyJywnXFx4QzMnOidcXHhFMycsJ1xceEM0JzonXFx4RTQnLCdcXHhDNSc6J1xceEU1JywnXFx4QzYnOidcXHhFNicsJ1xceEM3JzonXFx4RTcnLCdcXHhDOCc6J1xceEU4JywnXFx4QzknOidcXHhFOScsJ1xceENBJzonXFx4RUEnLCdcXHhDQic6J1xceEVCJywnXFx4Q0MnOidcXHhFQycsJ1xceENEJzonXFx4RUQnLCdcXHhDRSc6J1xceEVFJywnXFx4Q0YnOidcXHhFRicsJ1xceEQwJzonXFx4RjAnLCdcXHhEMSc6J1xceEYxJywnXFx4RDInOidcXHhGMicsJ1xceEQzJzonXFx4RjMnLCdcXHhENCc6J1xceEY0JywnXFx4RDUnOidcXHhGNScsJ1xceEQ2JzonXFx4RjYnLCdcXHhEOCc6J1xceEY4JywnXFx4RDknOidcXHhGOScsJ1xceERBJzonXFx4RkEnLCdcXHhEQic6J1xceEZCJywnXFx4REMnOidcXHhGQycsJ1xceEREJzonXFx4RkQnLCdcXHhERSc6J1xceEZFJywnXFx1MDEwMCc6J1xcdTAxMDEnLCdcXHUwMTAyJzonXFx1MDEwMycsJ1xcdTAxMDQnOidcXHUwMTA1JywnXFx1MDEwNic6J1xcdTAxMDcnLCdcXHUwMTA4JzonXFx1MDEwOScsJ1xcdTAxMEEnOidcXHUwMTBCJywnXFx1MDEwQyc6J1xcdTAxMEQnLCdcXHUwMTBFJzonXFx1MDEwRicsJ1xcdTAxMTAnOidcXHUwMTExJywnXFx1MDExMic6J1xcdTAxMTMnLCdcXHUwMTE0JzonXFx1MDExNScsJ1xcdTAxMTYnOidcXHUwMTE3JywnXFx1MDExOCc6J1xcdTAxMTknLCdcXHUwMTFBJzonXFx1MDExQicsJ1xcdTAxMUMnOidcXHUwMTFEJywnXFx1MDExRSc6J1xcdTAxMUYnLCdcXHUwMTIwJzonXFx1MDEyMScsJ1xcdTAxMjInOidcXHUwMTIzJywnXFx1MDEyNCc6J1xcdTAxMjUnLCdcXHUwMTI2JzonXFx1MDEyNycsJ1xcdTAxMjgnOidcXHUwMTI5JywnXFx1MDEyQSc6J1xcdTAxMkInLCdcXHUwMTJDJzonXFx1MDEyRCcsJ1xcdTAxMkUnOidcXHUwMTJGJywnXFx1MDEzMic6J1xcdTAxMzMnLCdcXHUwMTM0JzonXFx1MDEzNScsJ1xcdTAxMzYnOidcXHUwMTM3JywnXFx1MDEzOSc6J1xcdTAxM0EnLCdcXHUwMTNCJzonXFx1MDEzQycsJ1xcdTAxM0QnOidcXHUwMTNFJywnXFx1MDEzRic6J1xcdTAxNDAnLCdcXHUwMTQxJzonXFx1MDE0MicsJ1xcdTAxNDMnOidcXHUwMTQ0JywnXFx1MDE0NSc6J1xcdTAxNDYnLCdcXHUwMTQ3JzonXFx1MDE0OCcsJ1xcdTAxNEEnOidcXHUwMTRCJywnXFx1MDE0Qyc6J1xcdTAxNEQnLCdcXHUwMTRFJzonXFx1MDE0RicsJ1xcdTAxNTAnOidcXHUwMTUxJywnXFx1MDE1Mic6J1xcdTAxNTMnLCdcXHUwMTU0JzonXFx1MDE1NScsJ1xcdTAxNTYnOidcXHUwMTU3JywnXFx1MDE1OCc6J1xcdTAxNTknLCdcXHUwMTVBJzonXFx1MDE1QicsJ1xcdTAxNUMnOidcXHUwMTVEJywnXFx1MDE1RSc6J1xcdTAxNUYnLCdcXHUwMTYwJzonXFx1MDE2MScsJ1xcdTAxNjInOidcXHUwMTYzJywnXFx1MDE2NCc6J1xcdTAxNjUnLCdcXHUwMTY2JzonXFx1MDE2NycsJ1xcdTAxNjgnOidcXHUwMTY5JywnXFx1MDE2QSc6J1xcdTAxNkInLCdcXHUwMTZDJzonXFx1MDE2RCcsJ1xcdTAxNkUnOidcXHUwMTZGJywnXFx1MDE3MCc6J1xcdTAxNzEnLCdcXHUwMTcyJzonXFx1MDE3MycsJ1xcdTAxNzQnOidcXHUwMTc1JywnXFx1MDE3Nic6J1xcdTAxNzcnLCdcXHUwMTc4JzonXFx4RkYnLCdcXHUwMTc5JzonXFx1MDE3QScsJ1xcdTAxN0InOidcXHUwMTdDJywnXFx1MDE3RCc6J1xcdTAxN0UnLCdcXHUwMTdGJzoncycsJ1xcdTAxODEnOidcXHUwMjUzJywnXFx1MDE4Mic6J1xcdTAxODMnLCdcXHUwMTg0JzonXFx1MDE4NScsJ1xcdTAxODYnOidcXHUwMjU0JywnXFx1MDE4Nyc6J1xcdTAxODgnLCdcXHUwMTg5JzonXFx1MDI1NicsJ1xcdTAxOEEnOidcXHUwMjU3JywnXFx1MDE4Qic6J1xcdTAxOEMnLCdcXHUwMThFJzonXFx1MDFERCcsJ1xcdTAxOEYnOidcXHUwMjU5JywnXFx1MDE5MCc6J1xcdTAyNUInLCdcXHUwMTkxJzonXFx1MDE5MicsJ1xcdTAxOTMnOidcXHUwMjYwJywnXFx1MDE5NCc6J1xcdTAyNjMnLCdcXHUwMTk2JzonXFx1MDI2OScsJ1xcdTAxOTcnOidcXHUwMjY4JywnXFx1MDE5OCc6J1xcdTAxOTknLCdcXHUwMTlDJzonXFx1MDI2RicsJ1xcdTAxOUQnOidcXHUwMjcyJywnXFx1MDE5Ric6J1xcdTAyNzUnLCdcXHUwMUEwJzonXFx1MDFBMScsJ1xcdTAxQTInOidcXHUwMUEzJywnXFx1MDFBNCc6J1xcdTAxQTUnLCdcXHUwMUE2JzonXFx1MDI4MCcsJ1xcdTAxQTcnOidcXHUwMUE4JywnXFx1MDFBOSc6J1xcdTAyODMnLCdcXHUwMUFDJzonXFx1MDFBRCcsJ1xcdTAxQUUnOidcXHUwMjg4JywnXFx1MDFBRic6J1xcdTAxQjAnLCdcXHUwMUIxJzonXFx1MDI4QScsJ1xcdTAxQjInOidcXHUwMjhCJywnXFx1MDFCMyc6J1xcdTAxQjQnLCdcXHUwMUI1JzonXFx1MDFCNicsJ1xcdTAxQjcnOidcXHUwMjkyJywnXFx1MDFCOCc6J1xcdTAxQjknLCdcXHUwMUJDJzonXFx1MDFCRCcsJ1xcdTAxQzQnOidcXHUwMUM2JywnXFx1MDFDNSc6J1xcdTAxQzYnLCdcXHUwMUM3JzonXFx1MDFDOScsJ1xcdTAxQzgnOidcXHUwMUM5JywnXFx1MDFDQSc6J1xcdTAxQ0MnLCdcXHUwMUNCJzonXFx1MDFDQycsJ1xcdTAxQ0QnOidcXHUwMUNFJywnXFx1MDFDRic6J1xcdTAxRDAnLCdcXHUwMUQxJzonXFx1MDFEMicsJ1xcdTAxRDMnOidcXHUwMUQ0JywnXFx1MDFENSc6J1xcdTAxRDYnLCdcXHUwMUQ3JzonXFx1MDFEOCcsJ1xcdTAxRDknOidcXHUwMURBJywnXFx1MDFEQic6J1xcdTAxREMnLCdcXHUwMURFJzonXFx1MDFERicsJ1xcdTAxRTAnOidcXHUwMUUxJywnXFx1MDFFMic6J1xcdTAxRTMnLCdcXHUwMUU0JzonXFx1MDFFNScsJ1xcdTAxRTYnOidcXHUwMUU3JywnXFx1MDFFOCc6J1xcdTAxRTknLCdcXHUwMUVBJzonXFx1MDFFQicsJ1xcdTAxRUMnOidcXHUwMUVEJywnXFx1MDFFRSc6J1xcdTAxRUYnLCdcXHUwMUYxJzonXFx1MDFGMycsJ1xcdTAxRjInOidcXHUwMUYzJywnXFx1MDFGNCc6J1xcdTAxRjUnLCdcXHUwMUY2JzonXFx1MDE5NScsJ1xcdTAxRjcnOidcXHUwMUJGJywnXFx1MDFGOCc6J1xcdTAxRjknLCdcXHUwMUZBJzonXFx1MDFGQicsJ1xcdTAxRkMnOidcXHUwMUZEJywnXFx1MDFGRSc6J1xcdTAxRkYnLCdcXHUwMjAwJzonXFx1MDIwMScsJ1xcdTAyMDInOidcXHUwMjAzJywnXFx1MDIwNCc6J1xcdTAyMDUnLCdcXHUwMjA2JzonXFx1MDIwNycsJ1xcdTAyMDgnOidcXHUwMjA5JywnXFx1MDIwQSc6J1xcdTAyMEInLCdcXHUwMjBDJzonXFx1MDIwRCcsJ1xcdTAyMEUnOidcXHUwMjBGJywnXFx1MDIxMCc6J1xcdTAyMTEnLCdcXHUwMjEyJzonXFx1MDIxMycsJ1xcdTAyMTQnOidcXHUwMjE1JywnXFx1MDIxNic6J1xcdTAyMTcnLCdcXHUwMjE4JzonXFx1MDIxOScsJ1xcdTAyMUEnOidcXHUwMjFCJywnXFx1MDIxQyc6J1xcdTAyMUQnLCdcXHUwMjFFJzonXFx1MDIxRicsJ1xcdTAyMjAnOidcXHUwMTlFJywnXFx1MDIyMic6J1xcdTAyMjMnLCdcXHUwMjI0JzonXFx1MDIyNScsJ1xcdTAyMjYnOidcXHUwMjI3JywnXFx1MDIyOCc6J1xcdTAyMjknLCdcXHUwMjJBJzonXFx1MDIyQicsJ1xcdTAyMkMnOidcXHUwMjJEJywnXFx1MDIyRSc6J1xcdTAyMkYnLCdcXHUwMjMwJzonXFx1MDIzMScsJ1xcdTAyMzInOidcXHUwMjMzJywnXFx1MDIzQSc6J1xcdTJDNjUnLCdcXHUwMjNCJzonXFx1MDIzQycsJ1xcdTAyM0QnOidcXHUwMTlBJywnXFx1MDIzRSc6J1xcdTJDNjYnLCdcXHUwMjQxJzonXFx1MDI0MicsJ1xcdTAyNDMnOidcXHUwMTgwJywnXFx1MDI0NCc6J1xcdTAyODknLCdcXHUwMjQ1JzonXFx1MDI4QycsJ1xcdTAyNDYnOidcXHUwMjQ3JywnXFx1MDI0OCc6J1xcdTAyNDknLCdcXHUwMjRBJzonXFx1MDI0QicsJ1xcdTAyNEMnOidcXHUwMjREJywnXFx1MDI0RSc6J1xcdTAyNEYnLCdcXHUwMzQ1JzonXFx1MDNCOScsJ1xcdTAzNzAnOidcXHUwMzcxJywnXFx1MDM3Mic6J1xcdTAzNzMnLCdcXHUwMzc2JzonXFx1MDM3NycsJ1xcdTAzN0YnOidcXHUwM0YzJywnXFx1MDM4Nic6J1xcdTAzQUMnLCdcXHUwMzg4JzonXFx1MDNBRCcsJ1xcdTAzODknOidcXHUwM0FFJywnXFx1MDM4QSc6J1xcdTAzQUYnLCdcXHUwMzhDJzonXFx1MDNDQycsJ1xcdTAzOEUnOidcXHUwM0NEJywnXFx1MDM4Ric6J1xcdTAzQ0UnLCdcXHUwMzkxJzonXFx1MDNCMScsJ1xcdTAzOTInOidcXHUwM0IyJywnXFx1MDM5Myc6J1xcdTAzQjMnLCdcXHUwMzk0JzonXFx1MDNCNCcsJ1xcdTAzOTUnOidcXHUwM0I1JywnXFx1MDM5Nic6J1xcdTAzQjYnLCdcXHUwMzk3JzonXFx1MDNCNycsJ1xcdTAzOTgnOidcXHUwM0I4JywnXFx1MDM5OSc6J1xcdTAzQjknLCdcXHUwMzlBJzonXFx1MDNCQScsJ1xcdTAzOUInOidcXHUwM0JCJywnXFx1MDM5Qyc6J1xcdTAzQkMnLCdcXHUwMzlEJzonXFx1MDNCRCcsJ1xcdTAzOUUnOidcXHUwM0JFJywnXFx1MDM5Ric6J1xcdTAzQkYnLCdcXHUwM0EwJzonXFx1MDNDMCcsJ1xcdTAzQTEnOidcXHUwM0MxJywnXFx1MDNBMyc6J1xcdTAzQzMnLCdcXHUwM0E0JzonXFx1MDNDNCcsJ1xcdTAzQTUnOidcXHUwM0M1JywnXFx1MDNBNic6J1xcdTAzQzYnLCdcXHUwM0E3JzonXFx1MDNDNycsJ1xcdTAzQTgnOidcXHUwM0M4JywnXFx1MDNBOSc6J1xcdTAzQzknLCdcXHUwM0FBJzonXFx1MDNDQScsJ1xcdTAzQUInOidcXHUwM0NCJywnXFx1MDNDMic6J1xcdTAzQzMnLCdcXHUwM0NGJzonXFx1MDNENycsJ1xcdTAzRDAnOidcXHUwM0IyJywnXFx1MDNEMSc6J1xcdTAzQjgnLCdcXHUwM0Q1JzonXFx1MDNDNicsJ1xcdTAzRDYnOidcXHUwM0MwJywnXFx1MDNEOCc6J1xcdTAzRDknLCdcXHUwM0RBJzonXFx1MDNEQicsJ1xcdTAzREMnOidcXHUwM0REJywnXFx1MDNERSc6J1xcdTAzREYnLCdcXHUwM0UwJzonXFx1MDNFMScsJ1xcdTAzRTInOidcXHUwM0UzJywnXFx1MDNFNCc6J1xcdTAzRTUnLCdcXHUwM0U2JzonXFx1MDNFNycsJ1xcdTAzRTgnOidcXHUwM0U5JywnXFx1MDNFQSc6J1xcdTAzRUInLCdcXHUwM0VDJzonXFx1MDNFRCcsJ1xcdTAzRUUnOidcXHUwM0VGJywnXFx1MDNGMCc6J1xcdTAzQkEnLCdcXHUwM0YxJzonXFx1MDNDMScsJ1xcdTAzRjQnOidcXHUwM0I4JywnXFx1MDNGNSc6J1xcdTAzQjUnLCdcXHUwM0Y3JzonXFx1MDNGOCcsJ1xcdTAzRjknOidcXHUwM0YyJywnXFx1MDNGQSc6J1xcdTAzRkInLCdcXHUwM0ZEJzonXFx1MDM3QicsJ1xcdTAzRkUnOidcXHUwMzdDJywnXFx1MDNGRic6J1xcdTAzN0QnLCdcXHUwNDAwJzonXFx1MDQ1MCcsJ1xcdTA0MDEnOidcXHUwNDUxJywnXFx1MDQwMic6J1xcdTA0NTInLCdcXHUwNDAzJzonXFx1MDQ1MycsJ1xcdTA0MDQnOidcXHUwNDU0JywnXFx1MDQwNSc6J1xcdTA0NTUnLCdcXHUwNDA2JzonXFx1MDQ1NicsJ1xcdTA0MDcnOidcXHUwNDU3JywnXFx1MDQwOCc6J1xcdTA0NTgnLCdcXHUwNDA5JzonXFx1MDQ1OScsJ1xcdTA0MEEnOidcXHUwNDVBJywnXFx1MDQwQic6J1xcdTA0NUInLCdcXHUwNDBDJzonXFx1MDQ1QycsJ1xcdTA0MEQnOidcXHUwNDVEJywnXFx1MDQwRSc6J1xcdTA0NUUnLCdcXHUwNDBGJzonXFx1MDQ1RicsJ1xcdTA0MTAnOidcXHUwNDMwJywnXFx1MDQxMSc6J1xcdTA0MzEnLCdcXHUwNDEyJzonXFx1MDQzMicsJ1xcdTA0MTMnOidcXHUwNDMzJywnXFx1MDQxNCc6J1xcdTA0MzQnLCdcXHUwNDE1JzonXFx1MDQzNScsJ1xcdTA0MTYnOidcXHUwNDM2JywnXFx1MDQxNyc6J1xcdTA0MzcnLCdcXHUwNDE4JzonXFx1MDQzOCcsJ1xcdTA0MTknOidcXHUwNDM5JywnXFx1MDQxQSc6J1xcdTA0M0EnLCdcXHUwNDFCJzonXFx1MDQzQicsJ1xcdTA0MUMnOidcXHUwNDNDJywnXFx1MDQxRCc6J1xcdTA0M0QnLCdcXHUwNDFFJzonXFx1MDQzRScsJ1xcdTA0MUYnOidcXHUwNDNGJywnXFx1MDQyMCc6J1xcdTA0NDAnLCdcXHUwNDIxJzonXFx1MDQ0MScsJ1xcdTA0MjInOidcXHUwNDQyJywnXFx1MDQyMyc6J1xcdTA0NDMnLCdcXHUwNDI0JzonXFx1MDQ0NCcsJ1xcdTA0MjUnOidcXHUwNDQ1JywnXFx1MDQyNic6J1xcdTA0NDYnLCdcXHUwNDI3JzonXFx1MDQ0NycsJ1xcdTA0MjgnOidcXHUwNDQ4JywnXFx1MDQyOSc6J1xcdTA0NDknLCdcXHUwNDJBJzonXFx1MDQ0QScsJ1xcdTA0MkInOidcXHUwNDRCJywnXFx1MDQyQyc6J1xcdTA0NEMnLCdcXHUwNDJEJzonXFx1MDQ0RCcsJ1xcdTA0MkUnOidcXHUwNDRFJywnXFx1MDQyRic6J1xcdTA0NEYnLCdcXHUwNDYwJzonXFx1MDQ2MScsJ1xcdTA0NjInOidcXHUwNDYzJywnXFx1MDQ2NCc6J1xcdTA0NjUnLCdcXHUwNDY2JzonXFx1MDQ2NycsJ1xcdTA0NjgnOidcXHUwNDY5JywnXFx1MDQ2QSc6J1xcdTA0NkInLCdcXHUwNDZDJzonXFx1MDQ2RCcsJ1xcdTA0NkUnOidcXHUwNDZGJywnXFx1MDQ3MCc6J1xcdTA0NzEnLCdcXHUwNDcyJzonXFx1MDQ3MycsJ1xcdTA0NzQnOidcXHUwNDc1JywnXFx1MDQ3Nic6J1xcdTA0NzcnLCdcXHUwNDc4JzonXFx1MDQ3OScsJ1xcdTA0N0EnOidcXHUwNDdCJywnXFx1MDQ3Qyc6J1xcdTA0N0QnLCdcXHUwNDdFJzonXFx1MDQ3RicsJ1xcdTA0ODAnOidcXHUwNDgxJywnXFx1MDQ4QSc6J1xcdTA0OEInLCdcXHUwNDhDJzonXFx1MDQ4RCcsJ1xcdTA0OEUnOidcXHUwNDhGJywnXFx1MDQ5MCc6J1xcdTA0OTEnLCdcXHUwNDkyJzonXFx1MDQ5MycsJ1xcdTA0OTQnOidcXHUwNDk1JywnXFx1MDQ5Nic6J1xcdTA0OTcnLCdcXHUwNDk4JzonXFx1MDQ5OScsJ1xcdTA0OUEnOidcXHUwNDlCJywnXFx1MDQ5Qyc6J1xcdTA0OUQnLCdcXHUwNDlFJzonXFx1MDQ5RicsJ1xcdTA0QTAnOidcXHUwNEExJywnXFx1MDRBMic6J1xcdTA0QTMnLCdcXHUwNEE0JzonXFx1MDRBNScsJ1xcdTA0QTYnOidcXHUwNEE3JywnXFx1MDRBOCc6J1xcdTA0QTknLCdcXHUwNEFBJzonXFx1MDRBQicsJ1xcdTA0QUMnOidcXHUwNEFEJywnXFx1MDRBRSc6J1xcdTA0QUYnLCdcXHUwNEIwJzonXFx1MDRCMScsJ1xcdTA0QjInOidcXHUwNEIzJywnXFx1MDRCNCc6J1xcdTA0QjUnLCdcXHUwNEI2JzonXFx1MDRCNycsJ1xcdTA0QjgnOidcXHUwNEI5JywnXFx1MDRCQSc6J1xcdTA0QkInLCdcXHUwNEJDJzonXFx1MDRCRCcsJ1xcdTA0QkUnOidcXHUwNEJGJywnXFx1MDRDMCc6J1xcdTA0Q0YnLCdcXHUwNEMxJzonXFx1MDRDMicsJ1xcdTA0QzMnOidcXHUwNEM0JywnXFx1MDRDNSc6J1xcdTA0QzYnLCdcXHUwNEM3JzonXFx1MDRDOCcsJ1xcdTA0QzknOidcXHUwNENBJywnXFx1MDRDQic6J1xcdTA0Q0MnLCdcXHUwNENEJzonXFx1MDRDRScsJ1xcdTA0RDAnOidcXHUwNEQxJywnXFx1MDREMic6J1xcdTA0RDMnLCdcXHUwNEQ0JzonXFx1MDRENScsJ1xcdTA0RDYnOidcXHUwNEQ3JywnXFx1MDREOCc6J1xcdTA0RDknLCdcXHUwNERBJzonXFx1MDREQicsJ1xcdTA0REMnOidcXHUwNEREJywnXFx1MDRERSc6J1xcdTA0REYnLCdcXHUwNEUwJzonXFx1MDRFMScsJ1xcdTA0RTInOidcXHUwNEUzJywnXFx1MDRFNCc6J1xcdTA0RTUnLCdcXHUwNEU2JzonXFx1MDRFNycsJ1xcdTA0RTgnOidcXHUwNEU5JywnXFx1MDRFQSc6J1xcdTA0RUInLCdcXHUwNEVDJzonXFx1MDRFRCcsJ1xcdTA0RUUnOidcXHUwNEVGJywnXFx1MDRGMCc6J1xcdTA0RjEnLCdcXHUwNEYyJzonXFx1MDRGMycsJ1xcdTA0RjQnOidcXHUwNEY1JywnXFx1MDRGNic6J1xcdTA0RjcnLCdcXHUwNEY4JzonXFx1MDRGOScsJ1xcdTA0RkEnOidcXHUwNEZCJywnXFx1MDRGQyc6J1xcdTA0RkQnLCdcXHUwNEZFJzonXFx1MDRGRicsJ1xcdTA1MDAnOidcXHUwNTAxJywnXFx1MDUwMic6J1xcdTA1MDMnLCdcXHUwNTA0JzonXFx1MDUwNScsJ1xcdTA1MDYnOidcXHUwNTA3JywnXFx1MDUwOCc6J1xcdTA1MDknLCdcXHUwNTBBJzonXFx1MDUwQicsJ1xcdTA1MEMnOidcXHUwNTBEJywnXFx1MDUwRSc6J1xcdTA1MEYnLCdcXHUwNTEwJzonXFx1MDUxMScsJ1xcdTA1MTInOidcXHUwNTEzJywnXFx1MDUxNCc6J1xcdTA1MTUnLCdcXHUwNTE2JzonXFx1MDUxNycsJ1xcdTA1MTgnOidcXHUwNTE5JywnXFx1MDUxQSc6J1xcdTA1MUInLCdcXHUwNTFDJzonXFx1MDUxRCcsJ1xcdTA1MUUnOidcXHUwNTFGJywnXFx1MDUyMCc6J1xcdTA1MjEnLCdcXHUwNTIyJzonXFx1MDUyMycsJ1xcdTA1MjQnOidcXHUwNTI1JywnXFx1MDUyNic6J1xcdTA1MjcnLCdcXHUwNTI4JzonXFx1MDUyOScsJ1xcdTA1MkEnOidcXHUwNTJCJywnXFx1MDUyQyc6J1xcdTA1MkQnLCdcXHUwNTJFJzonXFx1MDUyRicsJ1xcdTA1MzEnOidcXHUwNTYxJywnXFx1MDUzMic6J1xcdTA1NjInLCdcXHUwNTMzJzonXFx1MDU2MycsJ1xcdTA1MzQnOidcXHUwNTY0JywnXFx1MDUzNSc6J1xcdTA1NjUnLCdcXHUwNTM2JzonXFx1MDU2NicsJ1xcdTA1MzcnOidcXHUwNTY3JywnXFx1MDUzOCc6J1xcdTA1NjgnLCdcXHUwNTM5JzonXFx1MDU2OScsJ1xcdTA1M0EnOidcXHUwNTZBJywnXFx1MDUzQic6J1xcdTA1NkInLCdcXHUwNTNDJzonXFx1MDU2QycsJ1xcdTA1M0QnOidcXHUwNTZEJywnXFx1MDUzRSc6J1xcdTA1NkUnLCdcXHUwNTNGJzonXFx1MDU2RicsJ1xcdTA1NDAnOidcXHUwNTcwJywnXFx1MDU0MSc6J1xcdTA1NzEnLCdcXHUwNTQyJzonXFx1MDU3MicsJ1xcdTA1NDMnOidcXHUwNTczJywnXFx1MDU0NCc6J1xcdTA1NzQnLCdcXHUwNTQ1JzonXFx1MDU3NScsJ1xcdTA1NDYnOidcXHUwNTc2JywnXFx1MDU0Nyc6J1xcdTA1NzcnLCdcXHUwNTQ4JzonXFx1MDU3OCcsJ1xcdTA1NDknOidcXHUwNTc5JywnXFx1MDU0QSc6J1xcdTA1N0EnLCdcXHUwNTRCJzonXFx1MDU3QicsJ1xcdTA1NEMnOidcXHUwNTdDJywnXFx1MDU0RCc6J1xcdTA1N0QnLCdcXHUwNTRFJzonXFx1MDU3RScsJ1xcdTA1NEYnOidcXHUwNTdGJywnXFx1MDU1MCc6J1xcdTA1ODAnLCdcXHUwNTUxJzonXFx1MDU4MScsJ1xcdTA1NTInOidcXHUwNTgyJywnXFx1MDU1Myc6J1xcdTA1ODMnLCdcXHUwNTU0JzonXFx1MDU4NCcsJ1xcdTA1NTUnOidcXHUwNTg1JywnXFx1MDU1Nic6J1xcdTA1ODYnLCdcXHUxMEEwJzonXFx1MkQwMCcsJ1xcdTEwQTEnOidcXHUyRDAxJywnXFx1MTBBMic6J1xcdTJEMDInLCdcXHUxMEEzJzonXFx1MkQwMycsJ1xcdTEwQTQnOidcXHUyRDA0JywnXFx1MTBBNSc6J1xcdTJEMDUnLCdcXHUxMEE2JzonXFx1MkQwNicsJ1xcdTEwQTcnOidcXHUyRDA3JywnXFx1MTBBOCc6J1xcdTJEMDgnLCdcXHUxMEE5JzonXFx1MkQwOScsJ1xcdTEwQUEnOidcXHUyRDBBJywnXFx1MTBBQic6J1xcdTJEMEInLCdcXHUxMEFDJzonXFx1MkQwQycsJ1xcdTEwQUQnOidcXHUyRDBEJywnXFx1MTBBRSc6J1xcdTJEMEUnLCdcXHUxMEFGJzonXFx1MkQwRicsJ1xcdTEwQjAnOidcXHUyRDEwJywnXFx1MTBCMSc6J1xcdTJEMTEnLCdcXHUxMEIyJzonXFx1MkQxMicsJ1xcdTEwQjMnOidcXHUyRDEzJywnXFx1MTBCNCc6J1xcdTJEMTQnLCdcXHUxMEI1JzonXFx1MkQxNScsJ1xcdTEwQjYnOidcXHUyRDE2JywnXFx1MTBCNyc6J1xcdTJEMTcnLCdcXHUxMEI4JzonXFx1MkQxOCcsJ1xcdTEwQjknOidcXHUyRDE5JywnXFx1MTBCQSc6J1xcdTJEMUEnLCdcXHUxMEJCJzonXFx1MkQxQicsJ1xcdTEwQkMnOidcXHUyRDFDJywnXFx1MTBCRCc6J1xcdTJEMUQnLCdcXHUxMEJFJzonXFx1MkQxRScsJ1xcdTEwQkYnOidcXHUyRDFGJywnXFx1MTBDMCc6J1xcdTJEMjAnLCdcXHUxMEMxJzonXFx1MkQyMScsJ1xcdTEwQzInOidcXHUyRDIyJywnXFx1MTBDMyc6J1xcdTJEMjMnLCdcXHUxMEM0JzonXFx1MkQyNCcsJ1xcdTEwQzUnOidcXHUyRDI1JywnXFx1MTBDNyc6J1xcdTJEMjcnLCdcXHUxMENEJzonXFx1MkQyRCcsJ1xcdTFFMDAnOidcXHUxRTAxJywnXFx1MUUwMic6J1xcdTFFMDMnLCdcXHUxRTA0JzonXFx1MUUwNScsJ1xcdTFFMDYnOidcXHUxRTA3JywnXFx1MUUwOCc6J1xcdTFFMDknLCdcXHUxRTBBJzonXFx1MUUwQicsJ1xcdTFFMEMnOidcXHUxRTBEJywnXFx1MUUwRSc6J1xcdTFFMEYnLCdcXHUxRTEwJzonXFx1MUUxMScsJ1xcdTFFMTInOidcXHUxRTEzJywnXFx1MUUxNCc6J1xcdTFFMTUnLCdcXHUxRTE2JzonXFx1MUUxNycsJ1xcdTFFMTgnOidcXHUxRTE5JywnXFx1MUUxQSc6J1xcdTFFMUInLCdcXHUxRTFDJzonXFx1MUUxRCcsJ1xcdTFFMUUnOidcXHUxRTFGJywnXFx1MUUyMCc6J1xcdTFFMjEnLCdcXHUxRTIyJzonXFx1MUUyMycsJ1xcdTFFMjQnOidcXHUxRTI1JywnXFx1MUUyNic6J1xcdTFFMjcnLCdcXHUxRTI4JzonXFx1MUUyOScsJ1xcdTFFMkEnOidcXHUxRTJCJywnXFx1MUUyQyc6J1xcdTFFMkQnLCdcXHUxRTJFJzonXFx1MUUyRicsJ1xcdTFFMzAnOidcXHUxRTMxJywnXFx1MUUzMic6J1xcdTFFMzMnLCdcXHUxRTM0JzonXFx1MUUzNScsJ1xcdTFFMzYnOidcXHUxRTM3JywnXFx1MUUzOCc6J1xcdTFFMzknLCdcXHUxRTNBJzonXFx1MUUzQicsJ1xcdTFFM0MnOidcXHUxRTNEJywnXFx1MUUzRSc6J1xcdTFFM0YnLCdcXHUxRTQwJzonXFx1MUU0MScsJ1xcdTFFNDInOidcXHUxRTQzJywnXFx1MUU0NCc6J1xcdTFFNDUnLCdcXHUxRTQ2JzonXFx1MUU0NycsJ1xcdTFFNDgnOidcXHUxRTQ5JywnXFx1MUU0QSc6J1xcdTFFNEInLCdcXHUxRTRDJzonXFx1MUU0RCcsJ1xcdTFFNEUnOidcXHUxRTRGJywnXFx1MUU1MCc6J1xcdTFFNTEnLCdcXHUxRTUyJzonXFx1MUU1MycsJ1xcdTFFNTQnOidcXHUxRTU1JywnXFx1MUU1Nic6J1xcdTFFNTcnLCdcXHUxRTU4JzonXFx1MUU1OScsJ1xcdTFFNUEnOidcXHUxRTVCJywnXFx1MUU1Qyc6J1xcdTFFNUQnLCdcXHUxRTVFJzonXFx1MUU1RicsJ1xcdTFFNjAnOidcXHUxRTYxJywnXFx1MUU2Mic6J1xcdTFFNjMnLCdcXHUxRTY0JzonXFx1MUU2NScsJ1xcdTFFNjYnOidcXHUxRTY3JywnXFx1MUU2OCc6J1xcdTFFNjknLCdcXHUxRTZBJzonXFx1MUU2QicsJ1xcdTFFNkMnOidcXHUxRTZEJywnXFx1MUU2RSc6J1xcdTFFNkYnLCdcXHUxRTcwJzonXFx1MUU3MScsJ1xcdTFFNzInOidcXHUxRTczJywnXFx1MUU3NCc6J1xcdTFFNzUnLCdcXHUxRTc2JzonXFx1MUU3NycsJ1xcdTFFNzgnOidcXHUxRTc5JywnXFx1MUU3QSc6J1xcdTFFN0InLCdcXHUxRTdDJzonXFx1MUU3RCcsJ1xcdTFFN0UnOidcXHUxRTdGJywnXFx1MUU4MCc6J1xcdTFFODEnLCdcXHUxRTgyJzonXFx1MUU4MycsJ1xcdTFFODQnOidcXHUxRTg1JywnXFx1MUU4Nic6J1xcdTFFODcnLCdcXHUxRTg4JzonXFx1MUU4OScsJ1xcdTFFOEEnOidcXHUxRThCJywnXFx1MUU4Qyc6J1xcdTFFOEQnLCdcXHUxRThFJzonXFx1MUU4RicsJ1xcdTFFOTAnOidcXHUxRTkxJywnXFx1MUU5Mic6J1xcdTFFOTMnLCdcXHUxRTk0JzonXFx1MUU5NScsJ1xcdTFFOUInOidcXHUxRTYxJywnXFx1MUVBMCc6J1xcdTFFQTEnLCdcXHUxRUEyJzonXFx1MUVBMycsJ1xcdTFFQTQnOidcXHUxRUE1JywnXFx1MUVBNic6J1xcdTFFQTcnLCdcXHUxRUE4JzonXFx1MUVBOScsJ1xcdTFFQUEnOidcXHUxRUFCJywnXFx1MUVBQyc6J1xcdTFFQUQnLCdcXHUxRUFFJzonXFx1MUVBRicsJ1xcdTFFQjAnOidcXHUxRUIxJywnXFx1MUVCMic6J1xcdTFFQjMnLCdcXHUxRUI0JzonXFx1MUVCNScsJ1xcdTFFQjYnOidcXHUxRUI3JywnXFx1MUVCOCc6J1xcdTFFQjknLCdcXHUxRUJBJzonXFx1MUVCQicsJ1xcdTFFQkMnOidcXHUxRUJEJywnXFx1MUVCRSc6J1xcdTFFQkYnLCdcXHUxRUMwJzonXFx1MUVDMScsJ1xcdTFFQzInOidcXHUxRUMzJywnXFx1MUVDNCc6J1xcdTFFQzUnLCdcXHUxRUM2JzonXFx1MUVDNycsJ1xcdTFFQzgnOidcXHUxRUM5JywnXFx1MUVDQSc6J1xcdTFFQ0InLCdcXHUxRUNDJzonXFx1MUVDRCcsJ1xcdTFFQ0UnOidcXHUxRUNGJywnXFx1MUVEMCc6J1xcdTFFRDEnLCdcXHUxRUQyJzonXFx1MUVEMycsJ1xcdTFFRDQnOidcXHUxRUQ1JywnXFx1MUVENic6J1xcdTFFRDcnLCdcXHUxRUQ4JzonXFx1MUVEOScsJ1xcdTFFREEnOidcXHUxRURCJywnXFx1MUVEQyc6J1xcdTFFREQnLCdcXHUxRURFJzonXFx1MUVERicsJ1xcdTFFRTAnOidcXHUxRUUxJywnXFx1MUVFMic6J1xcdTFFRTMnLCdcXHUxRUU0JzonXFx1MUVFNScsJ1xcdTFFRTYnOidcXHUxRUU3JywnXFx1MUVFOCc6J1xcdTFFRTknLCdcXHUxRUVBJzonXFx1MUVFQicsJ1xcdTFFRUMnOidcXHUxRUVEJywnXFx1MUVFRSc6J1xcdTFFRUYnLCdcXHUxRUYwJzonXFx1MUVGMScsJ1xcdTFFRjInOidcXHUxRUYzJywnXFx1MUVGNCc6J1xcdTFFRjUnLCdcXHUxRUY2JzonXFx1MUVGNycsJ1xcdTFFRjgnOidcXHUxRUY5JywnXFx1MUVGQSc6J1xcdTFFRkInLCdcXHUxRUZDJzonXFx1MUVGRCcsJ1xcdTFFRkUnOidcXHUxRUZGJywnXFx1MUYwOCc6J1xcdTFGMDAnLCdcXHUxRjA5JzonXFx1MUYwMScsJ1xcdTFGMEEnOidcXHUxRjAyJywnXFx1MUYwQic6J1xcdTFGMDMnLCdcXHUxRjBDJzonXFx1MUYwNCcsJ1xcdTFGMEQnOidcXHUxRjA1JywnXFx1MUYwRSc6J1xcdTFGMDYnLCdcXHUxRjBGJzonXFx1MUYwNycsJ1xcdTFGMTgnOidcXHUxRjEwJywnXFx1MUYxOSc6J1xcdTFGMTEnLCdcXHUxRjFBJzonXFx1MUYxMicsJ1xcdTFGMUInOidcXHUxRjEzJywnXFx1MUYxQyc6J1xcdTFGMTQnLCdcXHUxRjFEJzonXFx1MUYxNScsJ1xcdTFGMjgnOidcXHUxRjIwJywnXFx1MUYyOSc6J1xcdTFGMjEnLCdcXHUxRjJBJzonXFx1MUYyMicsJ1xcdTFGMkInOidcXHUxRjIzJywnXFx1MUYyQyc6J1xcdTFGMjQnLCdcXHUxRjJEJzonXFx1MUYyNScsJ1xcdTFGMkUnOidcXHUxRjI2JywnXFx1MUYyRic6J1xcdTFGMjcnLCdcXHUxRjM4JzonXFx1MUYzMCcsJ1xcdTFGMzknOidcXHUxRjMxJywnXFx1MUYzQSc6J1xcdTFGMzInLCdcXHUxRjNCJzonXFx1MUYzMycsJ1xcdTFGM0MnOidcXHUxRjM0JywnXFx1MUYzRCc6J1xcdTFGMzUnLCdcXHUxRjNFJzonXFx1MUYzNicsJ1xcdTFGM0YnOidcXHUxRjM3JywnXFx1MUY0OCc6J1xcdTFGNDAnLCdcXHUxRjQ5JzonXFx1MUY0MScsJ1xcdTFGNEEnOidcXHUxRjQyJywnXFx1MUY0Qic6J1xcdTFGNDMnLCdcXHUxRjRDJzonXFx1MUY0NCcsJ1xcdTFGNEQnOidcXHUxRjQ1JywnXFx1MUY1OSc6J1xcdTFGNTEnLCdcXHUxRjVCJzonXFx1MUY1MycsJ1xcdTFGNUQnOidcXHUxRjU1JywnXFx1MUY1Ric6J1xcdTFGNTcnLCdcXHUxRjY4JzonXFx1MUY2MCcsJ1xcdTFGNjknOidcXHUxRjYxJywnXFx1MUY2QSc6J1xcdTFGNjInLCdcXHUxRjZCJzonXFx1MUY2MycsJ1xcdTFGNkMnOidcXHUxRjY0JywnXFx1MUY2RCc6J1xcdTFGNjUnLCdcXHUxRjZFJzonXFx1MUY2NicsJ1xcdTFGNkYnOidcXHUxRjY3JywnXFx1MUZCOCc6J1xcdTFGQjAnLCdcXHUxRkI5JzonXFx1MUZCMScsJ1xcdTFGQkEnOidcXHUxRjcwJywnXFx1MUZCQic6J1xcdTFGNzEnLCdcXHUxRkJFJzonXFx1MDNCOScsJ1xcdTFGQzgnOidcXHUxRjcyJywnXFx1MUZDOSc6J1xcdTFGNzMnLCdcXHUxRkNBJzonXFx1MUY3NCcsJ1xcdTFGQ0InOidcXHUxRjc1JywnXFx1MUZEOCc6J1xcdTFGRDAnLCdcXHUxRkQ5JzonXFx1MUZEMScsJ1xcdTFGREEnOidcXHUxRjc2JywnXFx1MUZEQic6J1xcdTFGNzcnLCdcXHUxRkU4JzonXFx1MUZFMCcsJ1xcdTFGRTknOidcXHUxRkUxJywnXFx1MUZFQSc6J1xcdTFGN0EnLCdcXHUxRkVCJzonXFx1MUY3QicsJ1xcdTFGRUMnOidcXHUxRkU1JywnXFx1MUZGOCc6J1xcdTFGNzgnLCdcXHUxRkY5JzonXFx1MUY3OScsJ1xcdTFGRkEnOidcXHUxRjdDJywnXFx1MUZGQic6J1xcdTFGN0QnLCdcXHUyMTI2JzonXFx1MDNDOScsJ1xcdTIxMkEnOidrJywnXFx1MjEyQic6J1xceEU1JywnXFx1MjEzMic6J1xcdTIxNEUnLCdcXHUyMTYwJzonXFx1MjE3MCcsJ1xcdTIxNjEnOidcXHUyMTcxJywnXFx1MjE2Mic6J1xcdTIxNzInLCdcXHUyMTYzJzonXFx1MjE3MycsJ1xcdTIxNjQnOidcXHUyMTc0JywnXFx1MjE2NSc6J1xcdTIxNzUnLCdcXHUyMTY2JzonXFx1MjE3NicsJ1xcdTIxNjcnOidcXHUyMTc3JywnXFx1MjE2OCc6J1xcdTIxNzgnLCdcXHUyMTY5JzonXFx1MjE3OScsJ1xcdTIxNkEnOidcXHUyMTdBJywnXFx1MjE2Qic6J1xcdTIxN0InLCdcXHUyMTZDJzonXFx1MjE3QycsJ1xcdTIxNkQnOidcXHUyMTdEJywnXFx1MjE2RSc6J1xcdTIxN0UnLCdcXHUyMTZGJzonXFx1MjE3RicsJ1xcdTIxODMnOidcXHUyMTg0JywnXFx1MjRCNic6J1xcdTI0RDAnLCdcXHUyNEI3JzonXFx1MjREMScsJ1xcdTI0QjgnOidcXHUyNEQyJywnXFx1MjRCOSc6J1xcdTI0RDMnLCdcXHUyNEJBJzonXFx1MjRENCcsJ1xcdTI0QkInOidcXHUyNEQ1JywnXFx1MjRCQyc6J1xcdTI0RDYnLCdcXHUyNEJEJzonXFx1MjRENycsJ1xcdTI0QkUnOidcXHUyNEQ4JywnXFx1MjRCRic6J1xcdTI0RDknLCdcXHUyNEMwJzonXFx1MjREQScsJ1xcdTI0QzEnOidcXHUyNERCJywnXFx1MjRDMic6J1xcdTI0REMnLCdcXHUyNEMzJzonXFx1MjRERCcsJ1xcdTI0QzQnOidcXHUyNERFJywnXFx1MjRDNSc6J1xcdTI0REYnLCdcXHUyNEM2JzonXFx1MjRFMCcsJ1xcdTI0QzcnOidcXHUyNEUxJywnXFx1MjRDOCc6J1xcdTI0RTInLCdcXHUyNEM5JzonXFx1MjRFMycsJ1xcdTI0Q0EnOidcXHUyNEU0JywnXFx1MjRDQic6J1xcdTI0RTUnLCdcXHUyNENDJzonXFx1MjRFNicsJ1xcdTI0Q0QnOidcXHUyNEU3JywnXFx1MjRDRSc6J1xcdTI0RTgnLCdcXHUyNENGJzonXFx1MjRFOScsJ1xcdTJDMDAnOidcXHUyQzMwJywnXFx1MkMwMSc6J1xcdTJDMzEnLCdcXHUyQzAyJzonXFx1MkMzMicsJ1xcdTJDMDMnOidcXHUyQzMzJywnXFx1MkMwNCc6J1xcdTJDMzQnLCdcXHUyQzA1JzonXFx1MkMzNScsJ1xcdTJDMDYnOidcXHUyQzM2JywnXFx1MkMwNyc6J1xcdTJDMzcnLCdcXHUyQzA4JzonXFx1MkMzOCcsJ1xcdTJDMDknOidcXHUyQzM5JywnXFx1MkMwQSc6J1xcdTJDM0EnLCdcXHUyQzBCJzonXFx1MkMzQicsJ1xcdTJDMEMnOidcXHUyQzNDJywnXFx1MkMwRCc6J1xcdTJDM0QnLCdcXHUyQzBFJzonXFx1MkMzRScsJ1xcdTJDMEYnOidcXHUyQzNGJywnXFx1MkMxMCc6J1xcdTJDNDAnLCdcXHUyQzExJzonXFx1MkM0MScsJ1xcdTJDMTInOidcXHUyQzQyJywnXFx1MkMxMyc6J1xcdTJDNDMnLCdcXHUyQzE0JzonXFx1MkM0NCcsJ1xcdTJDMTUnOidcXHUyQzQ1JywnXFx1MkMxNic6J1xcdTJDNDYnLCdcXHUyQzE3JzonXFx1MkM0NycsJ1xcdTJDMTgnOidcXHUyQzQ4JywnXFx1MkMxOSc6J1xcdTJDNDknLCdcXHUyQzFBJzonXFx1MkM0QScsJ1xcdTJDMUInOidcXHUyQzRCJywnXFx1MkMxQyc6J1xcdTJDNEMnLCdcXHUyQzFEJzonXFx1MkM0RCcsJ1xcdTJDMUUnOidcXHUyQzRFJywnXFx1MkMxRic6J1xcdTJDNEYnLCdcXHUyQzIwJzonXFx1MkM1MCcsJ1xcdTJDMjEnOidcXHUyQzUxJywnXFx1MkMyMic6J1xcdTJDNTInLCdcXHUyQzIzJzonXFx1MkM1MycsJ1xcdTJDMjQnOidcXHUyQzU0JywnXFx1MkMyNSc6J1xcdTJDNTUnLCdcXHUyQzI2JzonXFx1MkM1NicsJ1xcdTJDMjcnOidcXHUyQzU3JywnXFx1MkMyOCc6J1xcdTJDNTgnLCdcXHUyQzI5JzonXFx1MkM1OScsJ1xcdTJDMkEnOidcXHUyQzVBJywnXFx1MkMyQic6J1xcdTJDNUInLCdcXHUyQzJDJzonXFx1MkM1QycsJ1xcdTJDMkQnOidcXHUyQzVEJywnXFx1MkMyRSc6J1xcdTJDNUUnLCdcXHUyQzYwJzonXFx1MkM2MScsJ1xcdTJDNjInOidcXHUwMjZCJywnXFx1MkM2Myc6J1xcdTFEN0QnLCdcXHUyQzY0JzonXFx1MDI3RCcsJ1xcdTJDNjcnOidcXHUyQzY4JywnXFx1MkM2OSc6J1xcdTJDNkEnLCdcXHUyQzZCJzonXFx1MkM2QycsJ1xcdTJDNkQnOidcXHUwMjUxJywnXFx1MkM2RSc6J1xcdTAyNzEnLCdcXHUyQzZGJzonXFx1MDI1MCcsJ1xcdTJDNzAnOidcXHUwMjUyJywnXFx1MkM3Mic6J1xcdTJDNzMnLCdcXHUyQzc1JzonXFx1MkM3NicsJ1xcdTJDN0UnOidcXHUwMjNGJywnXFx1MkM3Ric6J1xcdTAyNDAnLCdcXHUyQzgwJzonXFx1MkM4MScsJ1xcdTJDODInOidcXHUyQzgzJywnXFx1MkM4NCc6J1xcdTJDODUnLCdcXHUyQzg2JzonXFx1MkM4NycsJ1xcdTJDODgnOidcXHUyQzg5JywnXFx1MkM4QSc6J1xcdTJDOEInLCdcXHUyQzhDJzonXFx1MkM4RCcsJ1xcdTJDOEUnOidcXHUyQzhGJywnXFx1MkM5MCc6J1xcdTJDOTEnLCdcXHUyQzkyJzonXFx1MkM5MycsJ1xcdTJDOTQnOidcXHUyQzk1JywnXFx1MkM5Nic6J1xcdTJDOTcnLCdcXHUyQzk4JzonXFx1MkM5OScsJ1xcdTJDOUEnOidcXHUyQzlCJywnXFx1MkM5Qyc6J1xcdTJDOUQnLCdcXHUyQzlFJzonXFx1MkM5RicsJ1xcdTJDQTAnOidcXHUyQ0ExJywnXFx1MkNBMic6J1xcdTJDQTMnLCdcXHUyQ0E0JzonXFx1MkNBNScsJ1xcdTJDQTYnOidcXHUyQ0E3JywnXFx1MkNBOCc6J1xcdTJDQTknLCdcXHUyQ0FBJzonXFx1MkNBQicsJ1xcdTJDQUMnOidcXHUyQ0FEJywnXFx1MkNBRSc6J1xcdTJDQUYnLCdcXHUyQ0IwJzonXFx1MkNCMScsJ1xcdTJDQjInOidcXHUyQ0IzJywnXFx1MkNCNCc6J1xcdTJDQjUnLCdcXHUyQ0I2JzonXFx1MkNCNycsJ1xcdTJDQjgnOidcXHUyQ0I5JywnXFx1MkNCQSc6J1xcdTJDQkInLCdcXHUyQ0JDJzonXFx1MkNCRCcsJ1xcdTJDQkUnOidcXHUyQ0JGJywnXFx1MkNDMCc6J1xcdTJDQzEnLCdcXHUyQ0MyJzonXFx1MkNDMycsJ1xcdTJDQzQnOidcXHUyQ0M1JywnXFx1MkNDNic6J1xcdTJDQzcnLCdcXHUyQ0M4JzonXFx1MkNDOScsJ1xcdTJDQ0EnOidcXHUyQ0NCJywnXFx1MkNDQyc6J1xcdTJDQ0QnLCdcXHUyQ0NFJzonXFx1MkNDRicsJ1xcdTJDRDAnOidcXHUyQ0QxJywnXFx1MkNEMic6J1xcdTJDRDMnLCdcXHUyQ0Q0JzonXFx1MkNENScsJ1xcdTJDRDYnOidcXHUyQ0Q3JywnXFx1MkNEOCc6J1xcdTJDRDknLCdcXHUyQ0RBJzonXFx1MkNEQicsJ1xcdTJDREMnOidcXHUyQ0REJywnXFx1MkNERSc6J1xcdTJDREYnLCdcXHUyQ0UwJzonXFx1MkNFMScsJ1xcdTJDRTInOidcXHUyQ0UzJywnXFx1MkNFQic6J1xcdTJDRUMnLCdcXHUyQ0VEJzonXFx1MkNFRScsJ1xcdTJDRjInOidcXHUyQ0YzJywnXFx1QTY0MCc6J1xcdUE2NDEnLCdcXHVBNjQyJzonXFx1QTY0MycsJ1xcdUE2NDQnOidcXHVBNjQ1JywnXFx1QTY0Nic6J1xcdUE2NDcnLCdcXHVBNjQ4JzonXFx1QTY0OScsJ1xcdUE2NEEnOidcXHVBNjRCJywnXFx1QTY0Qyc6J1xcdUE2NEQnLCdcXHVBNjRFJzonXFx1QTY0RicsJ1xcdUE2NTAnOidcXHVBNjUxJywnXFx1QTY1Mic6J1xcdUE2NTMnLCdcXHVBNjU0JzonXFx1QTY1NScsJ1xcdUE2NTYnOidcXHVBNjU3JywnXFx1QTY1OCc6J1xcdUE2NTknLCdcXHVBNjVBJzonXFx1QTY1QicsJ1xcdUE2NUMnOidcXHVBNjVEJywnXFx1QTY1RSc6J1xcdUE2NUYnLCdcXHVBNjYwJzonXFx1QTY2MScsJ1xcdUE2NjInOidcXHVBNjYzJywnXFx1QTY2NCc6J1xcdUE2NjUnLCdcXHVBNjY2JzonXFx1QTY2NycsJ1xcdUE2NjgnOidcXHVBNjY5JywnXFx1QTY2QSc6J1xcdUE2NkInLCdcXHVBNjZDJzonXFx1QTY2RCcsJ1xcdUE2ODAnOidcXHVBNjgxJywnXFx1QTY4Mic6J1xcdUE2ODMnLCdcXHVBNjg0JzonXFx1QTY4NScsJ1xcdUE2ODYnOidcXHVBNjg3JywnXFx1QTY4OCc6J1xcdUE2ODknLCdcXHVBNjhBJzonXFx1QTY4QicsJ1xcdUE2OEMnOidcXHVBNjhEJywnXFx1QTY4RSc6J1xcdUE2OEYnLCdcXHVBNjkwJzonXFx1QTY5MScsJ1xcdUE2OTInOidcXHVBNjkzJywnXFx1QTY5NCc6J1xcdUE2OTUnLCdcXHVBNjk2JzonXFx1QTY5NycsJ1xcdUE2OTgnOidcXHVBNjk5JywnXFx1QTY5QSc6J1xcdUE2OUInLCdcXHVBNzIyJzonXFx1QTcyMycsJ1xcdUE3MjQnOidcXHVBNzI1JywnXFx1QTcyNic6J1xcdUE3MjcnLCdcXHVBNzI4JzonXFx1QTcyOScsJ1xcdUE3MkEnOidcXHVBNzJCJywnXFx1QTcyQyc6J1xcdUE3MkQnLCdcXHVBNzJFJzonXFx1QTcyRicsJ1xcdUE3MzInOidcXHVBNzMzJywnXFx1QTczNCc6J1xcdUE3MzUnLCdcXHVBNzM2JzonXFx1QTczNycsJ1xcdUE3MzgnOidcXHVBNzM5JywnXFx1QTczQSc6J1xcdUE3M0InLCdcXHVBNzNDJzonXFx1QTczRCcsJ1xcdUE3M0UnOidcXHVBNzNGJywnXFx1QTc0MCc6J1xcdUE3NDEnLCdcXHVBNzQyJzonXFx1QTc0MycsJ1xcdUE3NDQnOidcXHVBNzQ1JywnXFx1QTc0Nic6J1xcdUE3NDcnLCdcXHVBNzQ4JzonXFx1QTc0OScsJ1xcdUE3NEEnOidcXHVBNzRCJywnXFx1QTc0Qyc6J1xcdUE3NEQnLCdcXHVBNzRFJzonXFx1QTc0RicsJ1xcdUE3NTAnOidcXHVBNzUxJywnXFx1QTc1Mic6J1xcdUE3NTMnLCdcXHVBNzU0JzonXFx1QTc1NScsJ1xcdUE3NTYnOidcXHVBNzU3JywnXFx1QTc1OCc6J1xcdUE3NTknLCdcXHVBNzVBJzonXFx1QTc1QicsJ1xcdUE3NUMnOidcXHVBNzVEJywnXFx1QTc1RSc6J1xcdUE3NUYnLCdcXHVBNzYwJzonXFx1QTc2MScsJ1xcdUE3NjInOidcXHVBNzYzJywnXFx1QTc2NCc6J1xcdUE3NjUnLCdcXHVBNzY2JzonXFx1QTc2NycsJ1xcdUE3NjgnOidcXHVBNzY5JywnXFx1QTc2QSc6J1xcdUE3NkInLCdcXHVBNzZDJzonXFx1QTc2RCcsJ1xcdUE3NkUnOidcXHVBNzZGJywnXFx1QTc3OSc6J1xcdUE3N0EnLCdcXHVBNzdCJzonXFx1QTc3QycsJ1xcdUE3N0QnOidcXHUxRDc5JywnXFx1QTc3RSc6J1xcdUE3N0YnLCdcXHVBNzgwJzonXFx1QTc4MScsJ1xcdUE3ODInOidcXHVBNzgzJywnXFx1QTc4NCc6J1xcdUE3ODUnLCdcXHVBNzg2JzonXFx1QTc4NycsJ1xcdUE3OEInOidcXHVBNzhDJywnXFx1QTc4RCc6J1xcdTAyNjUnLCdcXHVBNzkwJzonXFx1QTc5MScsJ1xcdUE3OTInOidcXHVBNzkzJywnXFx1QTc5Nic6J1xcdUE3OTcnLCdcXHVBNzk4JzonXFx1QTc5OScsJ1xcdUE3OUEnOidcXHVBNzlCJywnXFx1QTc5Qyc6J1xcdUE3OUQnLCdcXHVBNzlFJzonXFx1QTc5RicsJ1xcdUE3QTAnOidcXHVBN0ExJywnXFx1QTdBMic6J1xcdUE3QTMnLCdcXHVBN0E0JzonXFx1QTdBNScsJ1xcdUE3QTYnOidcXHVBN0E3JywnXFx1QTdBOCc6J1xcdUE3QTknLCdcXHVBN0FBJzonXFx1MDI2NicsJ1xcdUE3QUInOidcXHUwMjVDJywnXFx1QTdBQyc6J1xcdTAyNjEnLCdcXHVBN0FEJzonXFx1MDI2QycsJ1xcdUE3QjAnOidcXHUwMjlFJywnXFx1QTdCMSc6J1xcdTAyODcnLCdcXHVGRjIxJzonXFx1RkY0MScsJ1xcdUZGMjInOidcXHVGRjQyJywnXFx1RkYyMyc6J1xcdUZGNDMnLCdcXHVGRjI0JzonXFx1RkY0NCcsJ1xcdUZGMjUnOidcXHVGRjQ1JywnXFx1RkYyNic6J1xcdUZGNDYnLCdcXHVGRjI3JzonXFx1RkY0NycsJ1xcdUZGMjgnOidcXHVGRjQ4JywnXFx1RkYyOSc6J1xcdUZGNDknLCdcXHVGRjJBJzonXFx1RkY0QScsJ1xcdUZGMkInOidcXHVGRjRCJywnXFx1RkYyQyc6J1xcdUZGNEMnLCdcXHVGRjJEJzonXFx1RkY0RCcsJ1xcdUZGMkUnOidcXHVGRjRFJywnXFx1RkYyRic6J1xcdUZGNEYnLCdcXHVGRjMwJzonXFx1RkY1MCcsJ1xcdUZGMzEnOidcXHVGRjUxJywnXFx1RkYzMic6J1xcdUZGNTInLCdcXHVGRjMzJzonXFx1RkY1MycsJ1xcdUZGMzQnOidcXHVGRjU0JywnXFx1RkYzNSc6J1xcdUZGNTUnLCdcXHVGRjM2JzonXFx1RkY1NicsJ1xcdUZGMzcnOidcXHVGRjU3JywnXFx1RkYzOCc6J1xcdUZGNTgnLCdcXHVGRjM5JzonXFx1RkY1OScsJ1xcdUZGM0EnOidcXHVGRjVBJywnXFx1RDgwMVxcdURDMDAnOidcXHVEODAxXFx1REMyOCcsJ1xcdUQ4MDFcXHVEQzAxJzonXFx1RDgwMVxcdURDMjknLCdcXHVEODAxXFx1REMwMic6J1xcdUQ4MDFcXHVEQzJBJywnXFx1RDgwMVxcdURDMDMnOidcXHVEODAxXFx1REMyQicsJ1xcdUQ4MDFcXHVEQzA0JzonXFx1RDgwMVxcdURDMkMnLCdcXHVEODAxXFx1REMwNSc6J1xcdUQ4MDFcXHVEQzJEJywnXFx1RDgwMVxcdURDMDYnOidcXHVEODAxXFx1REMyRScsJ1xcdUQ4MDFcXHVEQzA3JzonXFx1RDgwMVxcdURDMkYnLCdcXHVEODAxXFx1REMwOCc6J1xcdUQ4MDFcXHVEQzMwJywnXFx1RDgwMVxcdURDMDknOidcXHVEODAxXFx1REMzMScsJ1xcdUQ4MDFcXHVEQzBBJzonXFx1RDgwMVxcdURDMzInLCdcXHVEODAxXFx1REMwQic6J1xcdUQ4MDFcXHVEQzMzJywnXFx1RDgwMVxcdURDMEMnOidcXHVEODAxXFx1REMzNCcsJ1xcdUQ4MDFcXHVEQzBEJzonXFx1RDgwMVxcdURDMzUnLCdcXHVEODAxXFx1REMwRSc6J1xcdUQ4MDFcXHVEQzM2JywnXFx1RDgwMVxcdURDMEYnOidcXHVEODAxXFx1REMzNycsJ1xcdUQ4MDFcXHVEQzEwJzonXFx1RDgwMVxcdURDMzgnLCdcXHVEODAxXFx1REMxMSc6J1xcdUQ4MDFcXHVEQzM5JywnXFx1RDgwMVxcdURDMTInOidcXHVEODAxXFx1REMzQScsJ1xcdUQ4MDFcXHVEQzEzJzonXFx1RDgwMVxcdURDM0InLCdcXHVEODAxXFx1REMxNCc6J1xcdUQ4MDFcXHVEQzNDJywnXFx1RDgwMVxcdURDMTUnOidcXHVEODAxXFx1REMzRCcsJ1xcdUQ4MDFcXHVEQzE2JzonXFx1RDgwMVxcdURDM0UnLCdcXHVEODAxXFx1REMxNyc6J1xcdUQ4MDFcXHVEQzNGJywnXFx1RDgwMVxcdURDMTgnOidcXHVEODAxXFx1REM0MCcsJ1xcdUQ4MDFcXHVEQzE5JzonXFx1RDgwMVxcdURDNDEnLCdcXHVEODAxXFx1REMxQSc6J1xcdUQ4MDFcXHVEQzQyJywnXFx1RDgwMVxcdURDMUInOidcXHVEODAxXFx1REM0MycsJ1xcdUQ4MDFcXHVEQzFDJzonXFx1RDgwMVxcdURDNDQnLCdcXHVEODAxXFx1REMxRCc6J1xcdUQ4MDFcXHVEQzQ1JywnXFx1RDgwMVxcdURDMUUnOidcXHVEODAxXFx1REM0NicsJ1xcdUQ4MDFcXHVEQzFGJzonXFx1RDgwMVxcdURDNDcnLCdcXHVEODAxXFx1REMyMCc6J1xcdUQ4MDFcXHVEQzQ4JywnXFx1RDgwMVxcdURDMjEnOidcXHVEODAxXFx1REM0OScsJ1xcdUQ4MDFcXHVEQzIyJzonXFx1RDgwMVxcdURDNEEnLCdcXHVEODAxXFx1REMyMyc6J1xcdUQ4MDFcXHVEQzRCJywnXFx1RDgwMVxcdURDMjQnOidcXHVEODAxXFx1REM0QycsJ1xcdUQ4MDFcXHVEQzI1JzonXFx1RDgwMVxcdURDNEQnLCdcXHVEODAxXFx1REMyNic6J1xcdUQ4MDFcXHVEQzRFJywnXFx1RDgwMVxcdURDMjcnOidcXHVEODAxXFx1REM0RicsJ1xcdUQ4MDZcXHVEQ0EwJzonXFx1RDgwNlxcdURDQzAnLCdcXHVEODA2XFx1RENBMSc6J1xcdUQ4MDZcXHVEQ0MxJywnXFx1RDgwNlxcdURDQTInOidcXHVEODA2XFx1RENDMicsJ1xcdUQ4MDZcXHVEQ0EzJzonXFx1RDgwNlxcdURDQzMnLCdcXHVEODA2XFx1RENBNCc6J1xcdUQ4MDZcXHVEQ0M0JywnXFx1RDgwNlxcdURDQTUnOidcXHVEODA2XFx1RENDNScsJ1xcdUQ4MDZcXHVEQ0E2JzonXFx1RDgwNlxcdURDQzYnLCdcXHVEODA2XFx1RENBNyc6J1xcdUQ4MDZcXHVEQ0M3JywnXFx1RDgwNlxcdURDQTgnOidcXHVEODA2XFx1RENDOCcsJ1xcdUQ4MDZcXHVEQ0E5JzonXFx1RDgwNlxcdURDQzknLCdcXHVEODA2XFx1RENBQSc6J1xcdUQ4MDZcXHVEQ0NBJywnXFx1RDgwNlxcdURDQUInOidcXHVEODA2XFx1RENDQicsJ1xcdUQ4MDZcXHVEQ0FDJzonXFx1RDgwNlxcdURDQ0MnLCdcXHVEODA2XFx1RENBRCc6J1xcdUQ4MDZcXHVEQ0NEJywnXFx1RDgwNlxcdURDQUUnOidcXHVEODA2XFx1RENDRScsJ1xcdUQ4MDZcXHVEQ0FGJzonXFx1RDgwNlxcdURDQ0YnLCdcXHVEODA2XFx1RENCMCc6J1xcdUQ4MDZcXHVEQ0QwJywnXFx1RDgwNlxcdURDQjEnOidcXHVEODA2XFx1RENEMScsJ1xcdUQ4MDZcXHVEQ0IyJzonXFx1RDgwNlxcdURDRDInLCdcXHVEODA2XFx1RENCMyc6J1xcdUQ4MDZcXHVEQ0QzJywnXFx1RDgwNlxcdURDQjQnOidcXHVEODA2XFx1RENENCcsJ1xcdUQ4MDZcXHVEQ0I1JzonXFx1RDgwNlxcdURDRDUnLCdcXHVEODA2XFx1RENCNic6J1xcdUQ4MDZcXHVEQ0Q2JywnXFx1RDgwNlxcdURDQjcnOidcXHVEODA2XFx1RENENycsJ1xcdUQ4MDZcXHVEQ0I4JzonXFx1RDgwNlxcdURDRDgnLCdcXHVEODA2XFx1RENCOSc6J1xcdUQ4MDZcXHVEQ0Q5JywnXFx1RDgwNlxcdURDQkEnOidcXHVEODA2XFx1RENEQScsJ1xcdUQ4MDZcXHVEQ0JCJzonXFx1RDgwNlxcdURDREInLCdcXHVEODA2XFx1RENCQyc6J1xcdUQ4MDZcXHVEQ0RDJywnXFx1RDgwNlxcdURDQkQnOidcXHVEODA2XFx1RENERCcsJ1xcdUQ4MDZcXHVEQ0JFJzonXFx1RDgwNlxcdURDREUnLCdcXHVEODA2XFx1RENCRic6J1xcdUQ4MDZcXHVEQ0RGJywnXFx4REYnOidzcycsJ1xcdTAxMzAnOidpXFx1MDMwNycsJ1xcdTAxNDknOidcXHUwMkJDbicsJ1xcdTAxRjAnOidqXFx1MDMwQycsJ1xcdTAzOTAnOidcXHUwM0I5XFx1MDMwOFxcdTAzMDEnLCdcXHUwM0IwJzonXFx1MDNDNVxcdTAzMDhcXHUwMzAxJywnXFx1MDU4Nyc6J1xcdTA1NjVcXHUwNTgyJywnXFx1MUU5Nic6J2hcXHUwMzMxJywnXFx1MUU5Nyc6J3RcXHUwMzA4JywnXFx1MUU5OCc6J3dcXHUwMzBBJywnXFx1MUU5OSc6J3lcXHUwMzBBJywnXFx1MUU5QSc6J2FcXHUwMkJFJywnXFx1MUU5RSc6J3NzJywnXFx1MUY1MCc6J1xcdTAzQzVcXHUwMzEzJywnXFx1MUY1Mic6J1xcdTAzQzVcXHUwMzEzXFx1MDMwMCcsJ1xcdTFGNTQnOidcXHUwM0M1XFx1MDMxM1xcdTAzMDEnLCdcXHUxRjU2JzonXFx1MDNDNVxcdTAzMTNcXHUwMzQyJywnXFx1MUY4MCc6J1xcdTFGMDBcXHUwM0I5JywnXFx1MUY4MSc6J1xcdTFGMDFcXHUwM0I5JywnXFx1MUY4Mic6J1xcdTFGMDJcXHUwM0I5JywnXFx1MUY4Myc6J1xcdTFGMDNcXHUwM0I5JywnXFx1MUY4NCc6J1xcdTFGMDRcXHUwM0I5JywnXFx1MUY4NSc6J1xcdTFGMDVcXHUwM0I5JywnXFx1MUY4Nic6J1xcdTFGMDZcXHUwM0I5JywnXFx1MUY4Nyc6J1xcdTFGMDdcXHUwM0I5JywnXFx1MUY4OCc6J1xcdTFGMDBcXHUwM0I5JywnXFx1MUY4OSc6J1xcdTFGMDFcXHUwM0I5JywnXFx1MUY4QSc6J1xcdTFGMDJcXHUwM0I5JywnXFx1MUY4Qic6J1xcdTFGMDNcXHUwM0I5JywnXFx1MUY4Qyc6J1xcdTFGMDRcXHUwM0I5JywnXFx1MUY4RCc6J1xcdTFGMDVcXHUwM0I5JywnXFx1MUY4RSc6J1xcdTFGMDZcXHUwM0I5JywnXFx1MUY4Ric6J1xcdTFGMDdcXHUwM0I5JywnXFx1MUY5MCc6J1xcdTFGMjBcXHUwM0I5JywnXFx1MUY5MSc6J1xcdTFGMjFcXHUwM0I5JywnXFx1MUY5Mic6J1xcdTFGMjJcXHUwM0I5JywnXFx1MUY5Myc6J1xcdTFGMjNcXHUwM0I5JywnXFx1MUY5NCc6J1xcdTFGMjRcXHUwM0I5JywnXFx1MUY5NSc6J1xcdTFGMjVcXHUwM0I5JywnXFx1MUY5Nic6J1xcdTFGMjZcXHUwM0I5JywnXFx1MUY5Nyc6J1xcdTFGMjdcXHUwM0I5JywnXFx1MUY5OCc6J1xcdTFGMjBcXHUwM0I5JywnXFx1MUY5OSc6J1xcdTFGMjFcXHUwM0I5JywnXFx1MUY5QSc6J1xcdTFGMjJcXHUwM0I5JywnXFx1MUY5Qic6J1xcdTFGMjNcXHUwM0I5JywnXFx1MUY5Qyc6J1xcdTFGMjRcXHUwM0I5JywnXFx1MUY5RCc6J1xcdTFGMjVcXHUwM0I5JywnXFx1MUY5RSc6J1xcdTFGMjZcXHUwM0I5JywnXFx1MUY5Ric6J1xcdTFGMjdcXHUwM0I5JywnXFx1MUZBMCc6J1xcdTFGNjBcXHUwM0I5JywnXFx1MUZBMSc6J1xcdTFGNjFcXHUwM0I5JywnXFx1MUZBMic6J1xcdTFGNjJcXHUwM0I5JywnXFx1MUZBMyc6J1xcdTFGNjNcXHUwM0I5JywnXFx1MUZBNCc6J1xcdTFGNjRcXHUwM0I5JywnXFx1MUZBNSc6J1xcdTFGNjVcXHUwM0I5JywnXFx1MUZBNic6J1xcdTFGNjZcXHUwM0I5JywnXFx1MUZBNyc6J1xcdTFGNjdcXHUwM0I5JywnXFx1MUZBOCc6J1xcdTFGNjBcXHUwM0I5JywnXFx1MUZBOSc6J1xcdTFGNjFcXHUwM0I5JywnXFx1MUZBQSc6J1xcdTFGNjJcXHUwM0I5JywnXFx1MUZBQic6J1xcdTFGNjNcXHUwM0I5JywnXFx1MUZBQyc6J1xcdTFGNjRcXHUwM0I5JywnXFx1MUZBRCc6J1xcdTFGNjVcXHUwM0I5JywnXFx1MUZBRSc6J1xcdTFGNjZcXHUwM0I5JywnXFx1MUZBRic6J1xcdTFGNjdcXHUwM0I5JywnXFx1MUZCMic6J1xcdTFGNzBcXHUwM0I5JywnXFx1MUZCMyc6J1xcdTAzQjFcXHUwM0I5JywnXFx1MUZCNCc6J1xcdTAzQUNcXHUwM0I5JywnXFx1MUZCNic6J1xcdTAzQjFcXHUwMzQyJywnXFx1MUZCNyc6J1xcdTAzQjFcXHUwMzQyXFx1MDNCOScsJ1xcdTFGQkMnOidcXHUwM0IxXFx1MDNCOScsJ1xcdTFGQzInOidcXHUxRjc0XFx1MDNCOScsJ1xcdTFGQzMnOidcXHUwM0I3XFx1MDNCOScsJ1xcdTFGQzQnOidcXHUwM0FFXFx1MDNCOScsJ1xcdTFGQzYnOidcXHUwM0I3XFx1MDM0MicsJ1xcdTFGQzcnOidcXHUwM0I3XFx1MDM0MlxcdTAzQjknLCdcXHUxRkNDJzonXFx1MDNCN1xcdTAzQjknLCdcXHUxRkQyJzonXFx1MDNCOVxcdTAzMDhcXHUwMzAwJywnXFx1MUZEMyc6J1xcdTAzQjlcXHUwMzA4XFx1MDMwMScsJ1xcdTFGRDYnOidcXHUwM0I5XFx1MDM0MicsJ1xcdTFGRDcnOidcXHUwM0I5XFx1MDMwOFxcdTAzNDInLCdcXHUxRkUyJzonXFx1MDNDNVxcdTAzMDhcXHUwMzAwJywnXFx1MUZFMyc6J1xcdTAzQzVcXHUwMzA4XFx1MDMwMScsJ1xcdTFGRTQnOidcXHUwM0MxXFx1MDMxMycsJ1xcdTFGRTYnOidcXHUwM0M1XFx1MDM0MicsJ1xcdTFGRTcnOidcXHUwM0M1XFx1MDMwOFxcdTAzNDInLCdcXHUxRkYyJzonXFx1MUY3Q1xcdTAzQjknLCdcXHUxRkYzJzonXFx1MDNDOVxcdTAzQjknLCdcXHUxRkY0JzonXFx1MDNDRVxcdTAzQjknLCdcXHUxRkY2JzonXFx1MDNDOVxcdTAzNDInLCdcXHUxRkY3JzonXFx1MDNDOVxcdTAzNDJcXHUwM0I5JywnXFx1MUZGQyc6J1xcdTAzQzlcXHUwM0I5JywnXFx1RkIwMCc6J2ZmJywnXFx1RkIwMSc6J2ZpJywnXFx1RkIwMic6J2ZsJywnXFx1RkIwMyc6J2ZmaScsJ1xcdUZCMDQnOidmZmwnLCdcXHVGQjA1Jzonc3QnLCdcXHVGQjA2Jzonc3QnLCdcXHVGQjEzJzonXFx1MDU3NFxcdTA1NzYnLCdcXHVGQjE0JzonXFx1MDU3NFxcdTA1NjUnLCdcXHVGQjE1JzonXFx1MDU3NFxcdTA1NkInLCdcXHVGQjE2JzonXFx1MDU3RVxcdTA1NzYnLCdcXHVGQjE3JzonXFx1MDU3NFxcdTA1NkQnfTtcblxuLy8gTm9ybWFsaXplIHJlZmVyZW5jZSBsYWJlbDogY29sbGFwc2UgaW50ZXJuYWwgd2hpdGVzcGFjZVxuLy8gdG8gc2luZ2xlIHNwYWNlLCByZW1vdmUgbGVhZGluZy90cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXNlIGZvbGQuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuc2xpY2UoMSwgc3RyaW5nLmxlbmd0aCAtIDEpLnRyaW0oKS5yZXBsYWNlKHJlZ2V4LCBmdW5jdGlvbigkMCkge1xuICAgICAgICAvLyBOb3RlOiB0aGVyZSBpcyBubyBuZWVkIHRvIGNoZWNrIGBoYXNPd25Qcm9wZXJ0eSgkMClgIGhlcmUuXG4gICAgICAgIC8vIElmIGNoYXJhY3RlciBub3QgZm91bmQgaW4gbG9va3VwIHRhYmxlLCBpdCBtdXN0IGJlIHdoaXRlc3BhY2UuXG4gICAgICAgIHJldHVybiBtYXBbJDBdIHx8ICcgJztcbiAgICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21tb25tYXJrL2xpYi9ub3JtYWxpemUtcmVmZXJlbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZGVyaXZlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5mcm9tQ29kZVBvaW50XG4vKiEgaHR0cDovL210aHMuYmUvZnJvbWNvZGVwb2ludCB2MC4yLjEgYnkgQG1hdGhpYXMgKi9cbmlmIChTdHJpbmcuZnJvbUNvZGVQb2ludCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludChfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSYW5nZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9O1xuXG59IGVsc2Uge1xuXG4gIHZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICB2YXIgZnJvbUNvZGVQb2ludCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIE1BWF9TSVpFID0gMHg0MDAwO1xuICAgICAgdmFyIGNvZGVVbml0cyA9IFtdO1xuICAgICAgdmFyIGhpZ2hTdXJyb2dhdGU7XG4gICAgICB2YXIgbG93U3Vycm9nYXRlO1xuICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICB2YXIgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgIWlzRmluaXRlKGNvZGVQb2ludCkgfHwgLy8gYE5hTmAsIGArSW5maW5pdHlgLCBvciBgLUluZmluaXR5YFxuICAgICAgICAgICAgICAgICAgY29kZVBvaW50IDwgMCB8fCAvLyBub3QgYSB2YWxpZCBVbmljb2RlIGNvZGUgcG9pbnRcbiAgICAgICAgICAgICAgICAgIGNvZGVQb2ludCA+IDB4MTBGRkZGIHx8IC8vIG5vdCBhIHZhbGlkIFVuaWNvZGUgY29kZSBwb2ludFxuICAgICAgICAgICAgICAgICAgZmxvb3IoY29kZVBvaW50KSAhPT0gY29kZVBvaW50IC8vIG5vdCBhbiBpbnRlZ2VyXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhGRkZGKSB7IC8vIEJNUCBjb2RlIHBvaW50XG4gICAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gQXN0cmFsIGNvZGUgcG9pbnQ7IHNwbGl0IGluIHN1cnJvZ2F0ZSBoYWx2ZXNcbiAgICAgICAgICAgICAgLy8gaHR0cDovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcbiAgICAgICAgICAgICAgY29kZVBvaW50IC09IDB4MTAwMDA7XG4gICAgICAgICAgICAgIGhpZ2hTdXJyb2dhdGUgPSAoY29kZVBvaW50ID4+IDEwKSArIDB4RDgwMDtcbiAgICAgICAgICAgICAgbG93U3Vycm9nYXRlID0gKGNvZGVQb2ludCAlIDB4NDAwKSArIDB4REMwMDtcbiAgICAgICAgICAgICAgY29kZVVuaXRzLnB1c2goaGlnaFN1cnJvZ2F0ZSwgbG93U3Vycm9nYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluZGV4ICsgMSA9PT0gbGVuZ3RoIHx8IGNvZGVVbml0cy5sZW5ndGggPiBNQVhfU0laRSkge1xuICAgICAgICAgICAgICByZXN1bHQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNvZGVVbml0cyk7XG4gICAgICAgICAgICAgIGNvZGVVbml0cy5sZW5ndGggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1vZHVsZS5leHBvcnRzID0gZnJvbUNvZGVQb2ludDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL2Zyb20tY29kZS1wb2ludC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohIGh0dHA6Ly9tdGhzLmJlL3JlcGVhdCB2MC4yLjAgYnkgQG1hdGhpYXMgKi9cbmlmICghU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQpIHtcblx0KGZ1bmN0aW9uKCkge1xuXHRcdCd1c2Ugc3RyaWN0JzsgLy8gbmVlZGVkIHRvIHN1cHBvcnQgYGFwcGx5YC9gY2FsbGAgd2l0aCBgdW5kZWZpbmVkYC9gbnVsbGBcblx0XHR2YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBJRSA4IG9ubHkgc3VwcG9ydHMgYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgb24gRE9NIGVsZW1lbnRzXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgb2JqZWN0ID0ge307XG5cdFx0XHRcdHZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cdFx0XHRcdHZhciByZXN1bHQgPSAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBvYmplY3QsIG9iamVjdCkgJiYgJGRlZmluZVByb3BlcnR5O1xuXHRcdFx0fSBjYXRjaChlcnJvcikge31cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSgpKTtcblx0XHR2YXIgcmVwZWF0ID0gZnVuY3Rpb24oY291bnQpIHtcblx0XHRcdGlmICh0aGlzID09IG51bGwpIHtcblx0XHRcdFx0dGhyb3cgVHlwZUVycm9yKCk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuXHRcdFx0Ly8gYFRvSW50ZWdlcmBcblx0XHRcdHZhciBuID0gY291bnQgPyBOdW1iZXIoY291bnQpIDogMDtcblx0XHRcdGlmIChuICE9IG4pIHsgLy8gYmV0dGVyIGBpc05hTmBcblx0XHRcdFx0biA9IDA7XG5cdFx0XHR9XG5cdFx0XHQvLyBBY2NvdW50IGZvciBvdXQtb2YtYm91bmRzIGluZGljZXNcblx0XHRcdGlmIChuIDwgMCB8fCBuID09IEluZmluaXR5KSB7XG5cdFx0XHRcdHRocm93IFJhbmdlRXJyb3IoKTtcblx0XHRcdH1cblx0XHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRcdHdoaWxlIChuKSB7XG5cdFx0XHRcdGlmIChuICUgMiA9PSAxKSB7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IHN0cmluZztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobiA+IDEpIHtcblx0XHRcdFx0XHRzdHJpbmcgKz0gc3RyaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG4gPj49IDE7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cdFx0aWYgKGRlZmluZVByb3BlcnR5KSB7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCAncmVwZWF0Jywge1xuXHRcdFx0XHQndmFsdWUnOiByZXBlYXQsXG5cdFx0XHRcdCdjb25maWd1cmFibGUnOiB0cnVlLFxuXHRcdFx0XHQnd3JpdGFibGUnOiB0cnVlXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0U3RyaW5nLnByb3RvdHlwZS5yZXBlYXQgPSByZXBlYXQ7XG5cdFx0fVxuXHR9KCkpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3RyaW5nLnByb3RvdHlwZS5yZXBlYXQvcmVwZWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXJlcicpO1xuXG52YXIgcmVVbnNhZmVQcm90b2NvbCA9IC9eamF2YXNjcmlwdDp8dmJzY3JpcHQ6fGZpbGU6fGRhdGE6L2k7XG52YXIgcmVTYWZlRGF0YVByb3RvY29sID0gL15kYXRhOmltYWdlXFwvKD86cG5nfGdpZnxqcGVnfHdlYnApL2k7XG5cbnZhciBwb3RlbnRpYWxseVVuc2FmZSA9IGZ1bmN0aW9uKHVybCkge1xuICByZXR1cm4gcmVVbnNhZmVQcm90b2NvbC50ZXN0KHVybCkgJiZcbiAgICAgICFyZVNhZmVEYXRhUHJvdG9jb2wudGVzdCh1cmwpO1xufTtcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHByb2R1Y2UgYW4gSFRNTCB0YWcuXG5mdW5jdGlvbiB0YWcobmFtZSwgYXR0cnMsIHNlbGZjbG9zaW5nKSB7XG4gIGlmICh0aGlzLmRpc2FibGVUYWdzID4gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmJ1ZmZlciArPSAoJzwnICsgbmFtZSk7XG4gIGlmIChhdHRycyAmJiBhdHRycy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBhdHRyaWI7XG4gICAgd2hpbGUgKChhdHRyaWIgPSBhdHRyc1tpXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5idWZmZXIgKz0gKCcgJyArIGF0dHJpYlswXSArICc9XCInICsgYXR0cmliWzFdICsgJ1wiJyk7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIGlmIChzZWxmY2xvc2luZykge1xuICAgIHRoaXMuYnVmZmVyICs9ICcgLyc7XG4gIH1cbiAgdGhpcy5idWZmZXIgKz0gJz4nO1xuICB0aGlzLmxhc3RPdXQgPSAnPic7XG59XG5cbmZ1bmN0aW9uIEh0bWxSZW5kZXJlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAvLyBieSBkZWZhdWx0LCBzb2Z0IGJyZWFrcyBhcmUgcmVuZGVyZWQgYXMgbmV3bGluZXMgaW4gSFRNTFxuICBvcHRpb25zLnNvZnRicmVhayA9IG9wdGlvbnMuc29mdGJyZWFrIHx8ICdcXG4nO1xuICAvLyBzZXQgdG8gXCI8YnIgLz5cIiB0byBtYWtlIHRoZW0gaGFyZCBicmVha3NcbiAgLy8gc2V0IHRvIFwiIFwiIGlmIHlvdSB3YW50IHRvIGlnbm9yZSBsaW5lIHdyYXBwaW5nIGluIHNvdXJjZVxuXG4gIHRoaXMuZGlzYWJsZVRhZ3MgPSAwO1xuICB0aGlzLmxhc3RPdXQgPSBcIlxcblwiO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xufVxuXG4vKiBOb2RlIG1ldGhvZHMgKi9cblxuZnVuY3Rpb24gdGV4dChub2RlKSB7XG4gIHRoaXMub3V0KG5vZGUubGl0ZXJhbCk7XG59XG5cbmZ1bmN0aW9uIHNvZnRicmVhaygpIHtcbiAgdGhpcy5saXQodGhpcy5vcHRpb25zLnNvZnRicmVhayk7XG59XG5cbmZ1bmN0aW9uIGxpbmVicmVhaygpIHtcbiAgdGhpcy50YWcoJ2JyJywgW10sIHRydWUpO1xuICB0aGlzLmNyKCk7XG59XG5cbmZ1bmN0aW9uIGxpbmsobm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgaWYgKCEodGhpcy5vcHRpb25zLnNhZmUgJiYgcG90ZW50aWFsbHlVbnNhZmUobm9kZS5kZXN0aW5hdGlvbikpKSB7XG4gICAgICBhdHRycy5wdXNoKFsnaHJlZicsIHRoaXMuZXNjKG5vZGUuZGVzdGluYXRpb24sIHRydWUpXSk7XG4gICAgfVxuICAgIGlmIChub2RlLnRpdGxlKSB7XG4gICAgICBhdHRycy5wdXNoKFsndGl0bGUnLCB0aGlzLmVzYyhub2RlLnRpdGxlLCB0cnVlKV0pO1xuICAgIH1cbiAgICB0aGlzLnRhZygnYScsIGF0dHJzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRhZygnL2EnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbWFnZShub2RlLCBlbnRlcmluZykge1xuICBpZiAoZW50ZXJpbmcpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlVGFncyA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zYWZlICYmIHBvdGVudGlhbGx5VW5zYWZlKG5vZGUuZGVzdGluYXRpb24pKSB7XG4gICAgICAgIHRoaXMubGl0KCc8aW1nIHNyYz1cIlwiIGFsdD1cIicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5saXQoJzxpbWcgc3JjPVwiJyArIHRoaXMuZXNjKG5vZGUuZGVzdGluYXRpb24sIHRydWUpICtcbiAgICAgICAgICAgICdcIiBhbHQ9XCInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kaXNhYmxlVGFncyArPSAxO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGlzYWJsZVRhZ3MgLT0gMTtcbiAgICBpZiAodGhpcy5kaXNhYmxlVGFncyA9PT0gMCkge1xuICAgICAgaWYgKG5vZGUudGl0bGUpIHtcbiAgICAgICAgdGhpcy5saXQoJ1wiIHRpdGxlPVwiJyArIHRoaXMuZXNjKG5vZGUudGl0bGUsIHRydWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGl0KCdcIiAvPicpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlbXBoKG5vZGUsIGVudGVyaW5nKSB7XG4gIHRoaXMudGFnKGVudGVyaW5nID8gJ2VtJyA6ICcvZW0nKTtcbn1cblxuZnVuY3Rpb24gc3Ryb25nKG5vZGUsIGVudGVyaW5nKSB7XG4gIHRoaXMudGFnKGVudGVyaW5nID8gJ3N0cm9uZycgOiAnL3N0cm9uZycpO1xufVxuXG5mdW5jdGlvbiBwYXJhZ3JhcGgobm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIGdyYW5kcGFyZW50ID0gbm9kZS5wYXJlbnQucGFyZW50XG4gICAgLCBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChncmFuZHBhcmVudCAhPT0gbnVsbCAmJlxuICAgIGdyYW5kcGFyZW50LnR5cGUgPT09ICdsaXN0Jykge1xuICAgIGlmIChncmFuZHBhcmVudC5saXN0VGlnaHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKCdwJywgYXR0cnMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFnKCcvcCcpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoZWFkaW5nKG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciB0YWduYW1lID0gJ2gnICsgbm9kZS5sZXZlbFxuICAgICwgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuICBpZiAoZW50ZXJpbmcpIHtcbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcodGFnbmFtZSwgYXR0cnMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFnKCcvJyArIHRhZ25hbWUpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb2RlKG5vZGUpIHtcbiAgdGhpcy50YWcoJ2NvZGUnKTtcbiAgdGhpcy5vdXQobm9kZS5saXRlcmFsKTtcbiAgdGhpcy50YWcoJy9jb2RlJyk7XG59XG5cbmZ1bmN0aW9uIGNvZGVfYmxvY2sobm9kZSkge1xuICB2YXIgaW5mb193b3JkcyA9IG5vZGUuaW5mbyA/IG5vZGUuaW5mby5zcGxpdCgvXFxzKy8pIDogW11cbiAgICAsIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGluZm9fd29yZHMubGVuZ3RoID4gMCAmJiBpbmZvX3dvcmRzWzBdLmxlbmd0aCA+IDApIHtcbiAgICBhdHRycy5wdXNoKFsnY2xhc3MnLCAnbGFuZ3VhZ2UtJyArIHRoaXMuZXNjKGluZm9fd29yZHNbMF0sIHRydWUpXSk7XG4gIH1cbiAgdGhpcy5jcigpO1xuICB0aGlzLnRhZygncHJlJyk7XG4gIHRoaXMudGFnKCdjb2RlJywgYXR0cnMpO1xuICB0aGlzLm91dChub2RlLmxpdGVyYWwpO1xuICB0aGlzLnRhZygnL2NvZGUnKTtcbiAgdGhpcy50YWcoJy9wcmUnKTtcbiAgdGhpcy5jcigpO1xufVxuXG5mdW5jdGlvbiB0aGVtYXRpY19icmVhayhub2RlKSB7XG4gIHZhciBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIHRoaXMuY3IoKTtcbiAgdGhpcy50YWcoJ2hyJywgYXR0cnMsIHRydWUpO1xuICB0aGlzLmNyKCk7XG59XG5cbmZ1bmN0aW9uIGJsb2NrX3F1b3RlKG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciBhdHRycyA9IHRoaXMuYXR0cnMobm9kZSk7XG4gIGlmIChlbnRlcmluZykge1xuICAgIHRoaXMuY3IoKTtcbiAgICB0aGlzLnRhZygnYmxvY2txdW90ZScsIGF0dHJzKTtcbiAgICB0aGlzLmNyKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jcigpO1xuICAgIHRoaXMudGFnKCcvYmxvY2txdW90ZScpO1xuICAgIHRoaXMuY3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsaXN0KG5vZGUsIGVudGVyaW5nKSB7XG4gIHZhciB0YWduYW1lID0gbm9kZS5saXN0VHlwZSA9PT0gJ2J1bGxldCcgPyAndWwnIDogJ29sJ1xuICAgICwgYXR0cnMgPSB0aGlzLmF0dHJzKG5vZGUpO1xuXG4gIGlmIChlbnRlcmluZykge1xuICAgIHZhciBzdGFydCA9IG5vZGUubGlzdFN0YXJ0O1xuICAgIGlmIChzdGFydCAhPT0gbnVsbCAmJiBzdGFydCAhPT0gMSkge1xuICAgICAgYXR0cnMucHVzaChbJ3N0YXJ0Jywgc3RhcnQudG9TdHJpbmcoKV0pO1xuICAgIH1cbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcodGFnbmFtZSwgYXR0cnMpO1xuICAgIHRoaXMuY3IoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmNyKCk7XG4gICAgdGhpcy50YWcoJy8nICsgdGFnbmFtZSk7XG4gICAgdGhpcy5jcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGl0ZW0obm9kZSwgZW50ZXJpbmcpIHtcbiAgdmFyIGF0dHJzID0gdGhpcy5hdHRycyhub2RlKTtcbiAgaWYgKGVudGVyaW5nKSB7XG4gICAgdGhpcy50YWcoJ2xpJywgYXR0cnMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFnKCcvbGknKTtcbiAgICB0aGlzLmNyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaHRtbF9pbmxpbmUobm9kZSkge1xuICBpZiAodGhpcy5vcHRpb25zLnNhZmUpIHtcbiAgICB0aGlzLmxpdCgnPCEtLSByYXcgSFRNTCBvbWl0dGVkIC0tPicpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGl0KG5vZGUubGl0ZXJhbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaHRtbF9ibG9jayhub2RlKSB7XG4gIHRoaXMuY3IoKTtcbiAgaWYgKHRoaXMub3B0aW9ucy5zYWZlKSB7XG4gICAgdGhpcy5saXQoJzwhLS0gcmF3IEhUTUwgb21pdHRlZCAtLT4nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxpdChub2RlLmxpdGVyYWwpO1xuICB9XG4gIHRoaXMuY3IoKTtcbn1cblxuZnVuY3Rpb24gY3VzdG9tX2lubGluZShub2RlLCBlbnRlcmluZykge1xuICBpZiAoZW50ZXJpbmcgJiYgbm9kZS5vbkVudGVyKSB7XG4gICAgdGhpcy5saXQobm9kZS5vbkVudGVyKTtcbiAgfSBlbHNlIGlmICghZW50ZXJpbmcgJiYgbm9kZS5vbkV4aXQpIHtcbiAgICB0aGlzLmxpdChub2RlLm9uRXhpdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3VzdG9tX2Jsb2NrKG5vZGUsIGVudGVyaW5nKSB7XG4gIHRoaXMuY3IoKTtcbiAgaWYgKGVudGVyaW5nICYmIG5vZGUub25FbnRlcikge1xuICAgIHRoaXMubGl0KG5vZGUub25FbnRlcik7XG4gIH0gZWxzZSBpZiAoIWVudGVyaW5nICYmIG5vZGUub25FeGl0KSB7XG4gICAgdGhpcy5saXQobm9kZS5vbkV4aXQpO1xuICB9XG4gIHRoaXMuY3IoKTtcbn1cblxuLyogSGVscGVyIG1ldGhvZHMgKi9cblxuZnVuY3Rpb24gb3V0KHMpIHtcbiAgdGhpcy5saXQodGhpcy5lc2MocywgZmFsc2UpKTtcbn1cblxuZnVuY3Rpb24gYXR0cnMgKG5vZGUpIHtcbiAgdmFyIGF0dCA9IFtdO1xuICBpZiAodGhpcy5vcHRpb25zLnNvdXJjZXBvcykge1xuICAgIHZhciBwb3MgPSBub2RlLnNvdXJjZXBvcztcbiAgICBpZiAocG9zKSB7XG4gICAgICBhdHQucHVzaChbJ2RhdGEtc291cmNlcG9zJywgU3RyaW5nKHBvc1swXVswXSkgKyAnOicgK1xuICAgICAgICBTdHJpbmcocG9zWzBdWzFdKSArICctJyArIFN0cmluZyhwb3NbMV1bMF0pICsgJzonICtcbiAgICAgICAgU3RyaW5nKHBvc1sxXVsxXSldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGF0dDtcbn1cblxuLy8gcXVpY2sgYnJvd3Nlci1jb21wYXRpYmxlIGluaGVyaXRhbmNlXG5IdG1sUmVuZGVyZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZW5kZXJlci5wcm90b3R5cGUpO1xuXG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnRleHQgPSB0ZXh0O1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5odG1sX2lubGluZSA9IGh0bWxfaW5saW5lO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5odG1sX2Jsb2NrID0gaHRtbF9ibG9jaztcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuc29mdGJyZWFrID0gc29mdGJyZWFrO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5saW5lYnJlYWsgPSBsaW5lYnJlYWs7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmxpbmsgPSBsaW5rO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGltYWdlO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5lbXBoID0gZW1waDtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID0gc3Ryb25nO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGggPSBwYXJhZ3JhcGg7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmhlYWRpbmcgPSBoZWFkaW5nO1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5jb2RlID0gY29kZTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuY29kZV9ibG9jayA9IGNvZGVfYmxvY2s7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLnRoZW1hdGljX2JyZWFrID0gdGhlbWF0aWNfYnJlYWs7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrX3F1b3RlID0gYmxvY2tfcXVvdGU7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmxpc3QgPSBsaXN0O1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5pdGVtID0gaXRlbTtcbkh0bWxSZW5kZXJlci5wcm90b3R5cGUuY3VzdG9tX2lubGluZSA9IGN1c3RvbV9pbmxpbmU7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmN1c3RvbV9ibG9jayA9IGN1c3RvbV9ibG9jaztcblxuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS5lc2MgPSByZXF1aXJlKCcuLi9jb21tb24nKS5lc2NhcGVYbWw7XG5cbkh0bWxSZW5kZXJlci5wcm90b3R5cGUub3V0ID0gb3V0O1xuSHRtbFJlbmRlcmVyLnByb3RvdHlwZS50YWcgPSB0YWc7XG5IdG1sUmVuZGVyZXIucHJvdG90eXBlLmF0dHJzID0gYXR0cnM7XG5cbm1vZHVsZS5leHBvcnRzID0gSHRtbFJlbmRlcmVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tbW9ubWFyay9saWIvcmVuZGVyL2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlcmVyJyk7XG5cbnZhciByZVhNTFRhZyA9IC9cXDxbXj5dKlxcPi87XG5cbmZ1bmN0aW9uIHRvVGFnTmFtZShzKSB7XG4gIHJldHVybiBzLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csIFwiJDFfJDJcIikudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gWG1sUmVuZGVyZXIob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB0aGlzLmRpc2FibGVUYWdzID0gMDtcbiAgdGhpcy5sYXN0T3V0ID0gXCJcXG5cIjtcblxuICB0aGlzLmluZGVudExldmVsID0gMDtcbiAgdGhpcy5pbmRlbnQgPSAnICAnO1xuXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihhc3QpIHtcblxuICB0aGlzLmJ1ZmZlciA9ICcnO1xuXG4gIHZhciBhdHRycztcbiAgdmFyIHRhZ25hbWU7XG4gIHZhciB3YWxrZXIgPSBhc3Qud2Fsa2VyKCk7XG4gIHZhciBldmVudCwgbm9kZSwgZW50ZXJpbmc7XG4gIHZhciBjb250YWluZXI7XG4gIHZhciBzZWxmQ2xvc2luZztcbiAgdmFyIG5vZGV0eXBlO1xuXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLnRpbWUpIHsgY29uc29sZS50aW1lKFwicmVuZGVyaW5nXCIpOyB9XG5cbiAgdGhpcy5idWZmZXIgKz0gJzw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/Plxcbic7XG4gIHRoaXMuYnVmZmVyICs9ICc8IURPQ1RZUEUgZG9jdW1lbnQgU1lTVEVNIFwiQ29tbW9uTWFyay5kdGRcIj5cXG4nO1xuXG4gIHdoaWxlICgoZXZlbnQgPSB3YWxrZXIubmV4dCgpKSkge1xuICAgIGVudGVyaW5nID0gZXZlbnQuZW50ZXJpbmc7XG4gICAgbm9kZSA9IGV2ZW50Lm5vZGU7XG4gICAgbm9kZXR5cGUgPSBub2RlLnR5cGU7XG5cbiAgICBjb250YWluZXIgPSBub2RlLmlzQ29udGFpbmVyO1xuXG4gICAgc2VsZkNsb3NpbmcgPSBub2RldHlwZSA9PT0gJ3RoZW1hdGljX2JyZWFrJ1xuICAgICAgfHwgbm9kZXR5cGUgPT09ICdsaW5lYnJlYWsnXG4gICAgICB8fCBub2RldHlwZSA9PT0gJ3NvZnRicmVhayc7XG5cbiAgICB0YWduYW1lID0gdG9UYWdOYW1lKG5vZGV0eXBlKTtcblxuICAgIGlmIChlbnRlcmluZykge1xuXG4gICAgICAgIGF0dHJzID0gW107XG5cbiAgICAgICAgc3dpdGNoIChub2RldHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWyd4bWxucycsICdodHRwOi8vY29tbW9ubWFyay5vcmcveG1sLzEuMCddKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICAgICAgaWYgKG5vZGUubGlzdFR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ3R5cGUnLCBub2RlLmxpc3RUeXBlLnRvTG93ZXJDYXNlKCldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmxpc3RTdGFydCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBhdHRycy5wdXNoKFsnc3RhcnQnLCBTdHJpbmcobm9kZS5saXN0U3RhcnQpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5saXN0VGlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ3RpZ2h0JywgKG5vZGUubGlzdFRpZ2h0ID8gJ3RydWUnIDogJ2ZhbHNlJyldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWxpbSA9IG5vZGUubGlzdERlbGltaXRlcjtcbiAgICAgICAgICAgIGlmIChkZWxpbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB2YXIgZGVsaW13b3JkID0gJyc7XG4gICAgICAgICAgICAgIGlmIChkZWxpbSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgZGVsaW13b3JkID0gJ3BlcmlvZCc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsaW13b3JkID0gJ3BhcmVuJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhdHRycy5wdXNoKFsnZGVsaW1pdGVyJywgZGVsaW13b3JkXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb2RlX2Jsb2NrJzpcbiAgICAgICAgICAgIGlmIChub2RlLmluZm8pIHtcbiAgICAgICAgICAgICAgYXR0cnMucHVzaChbJ2luZm8nLCBub2RlLmluZm9dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRpbmcnOlxuICAgICAgICAgICAgYXR0cnMucHVzaChbJ2xldmVsJywgU3RyaW5nKG5vZGUubGV2ZWwpXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdsaW5rJzpcbiAgICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsnZGVzdGluYXRpb24nLCBub2RlLmRlc3RpbmF0aW9uXSk7XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsndGl0bGUnLCBub2RlLnRpdGxlXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjdXN0b21faW5saW5lJzpcbiAgICAgICAgICBjYXNlICdjdXN0b21fYmxvY2snOlxuICAgICAgICAgICAgYXR0cnMucHVzaChbJ29uX2VudGVyJywgbm9kZS5vbkVudGVyXSk7XG4gICAgICAgICAgICBhdHRycy5wdXNoKFsnb25fZXhpdCcsIG5vZGUub25FeGl0XSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc291cmNlcG9zKSB7XG4gICAgICAgICAgdmFyIHBvcyA9IG5vZGUuc291cmNlcG9zO1xuICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgIGF0dHJzLnB1c2goWydzb3VyY2Vwb3MnLCBTdHJpbmcocG9zWzBdWzBdKSArICc6JyArXG4gICAgICAgICAgICAgIFN0cmluZyhwb3NbMF1bMV0pICsgJy0nICsgU3RyaW5nKHBvc1sxXVswXSkgKyAnOicgK1xuICAgICAgICAgICAgICBTdHJpbmcocG9zWzFdWzFdKV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3IoKTtcbiAgICAgICAgdGhpcy5vdXQodGhpcy50YWcodGFnbmFtZSwgYXR0cnMsIHNlbGZDbG9zaW5nKSk7XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICB0aGlzLmluZGVudExldmVsICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNvbnRhaW5lciAmJiAhc2VsZkNsb3NpbmcpIHtcbiAgICAgICAgICB2YXIgbGl0ID0gbm9kZS5saXRlcmFsO1xuICAgICAgICAgIGlmIChsaXQpIHtcbiAgICAgICAgICAgIHRoaXMub3V0KHRoaXMuZXNjKGxpdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm91dCh0aGlzLnRhZygnLycgKyB0YWduYW1lKSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRlbnRMZXZlbCAtPSAxO1xuICAgICAgdGhpcy5jcigpO1xuICAgICAgdGhpcy5vdXQodGhpcy50YWcoJy8nICsgdGFnbmFtZSkpO1xuICAgIH1cbiAgfVxuICBpZiAob3B0aW9ucy50aW1lKSB7IGNvbnNvbGUudGltZUVuZChcInJlbmRlcmluZ1wiKTsgfVxuICB0aGlzLmJ1ZmZlciArPSAnXFxuJztcbiAgcmV0dXJuIHRoaXMuYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBvdXQocykge1xuICBpZih0aGlzLmRpc2FibGVUYWdzID4gMCkge1xuICAgIHRoaXMuYnVmZmVyICs9IHMucmVwbGFjZShyZVhNTFRhZywgJycpO1xuICB9ZWxzZXtcbiAgICB0aGlzLmJ1ZmZlciArPSBzO1xuICB9XG4gIHRoaXMubGFzdE91dCA9IHM7XG59XG5cbmZ1bmN0aW9uIGNyKCkge1xuICBpZih0aGlzLmxhc3RPdXQgIT09ICdcXG4nKSB7XG4gICAgdGhpcy5idWZmZXIgKz0gJ1xcbic7XG4gICAgdGhpcy5sYXN0T3V0ID0gJ1xcbic7XG4gICAgZm9yKHZhciBpID0gdGhpcy5pbmRlbnRMZXZlbDsgaSA+IDA7IGktLSkge1xuICAgICAgdGhpcy5idWZmZXIgKz0gdGhpcy5pbmRlbnQ7XG4gICAgfVxuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBwcm9kdWNlIGFuIFhNTCB0YWcuXG5mdW5jdGlvbiB0YWcobmFtZSwgYXR0cnMsIHNlbGZjbG9zaW5nKSB7XG4gIHZhciByZXN1bHQgPSAnPCcgKyBuYW1lO1xuICBpZihhdHRycyAmJiBhdHRycy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBhdHRyaWI7XG4gICAgd2hpbGUgKChhdHRyaWIgPSBhdHRyc1tpXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9ICcgJyArIGF0dHJpYlswXSArICc9XCInICsgdGhpcy5lc2MoYXR0cmliWzFdKSArICdcIic7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIGlmKHNlbGZjbG9zaW5nKSB7XG4gICAgcmVzdWx0ICs9ICcgLyc7XG4gIH1cbiAgcmVzdWx0ICs9ICc+JztcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gcXVpY2sgYnJvd3Nlci1jb21wYXRpYmxlIGluaGVyaXRhbmNlXG5YbWxSZW5kZXJlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlbmRlcmVyLnByb3RvdHlwZSk7XG5cblhtbFJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSByZW5kZXI7XG5YbWxSZW5kZXJlci5wcm90b3R5cGUub3V0ID0gb3V0O1xuWG1sUmVuZGVyZXIucHJvdG90eXBlLmNyID0gY3I7XG5YbWxSZW5kZXJlci5wcm90b3R5cGUudGFnID0gdGFnO1xuWG1sUmVuZGVyZXIucHJvdG90eXBlLmVzYyA9IHJlcXVpcmUoJy4uL2NvbW1vbicpLmVzY2FwZVhtbDtcblxubW9kdWxlLmV4cG9ydHMgPSBYbWxSZW5kZXJlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbW1vbm1hcmsvbGliL3JlbmRlci94bWwuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=