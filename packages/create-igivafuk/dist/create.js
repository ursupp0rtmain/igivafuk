var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "../../node_modules/sisteransi/src/index.js"(exports, module) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x2, y3) {
        if (!y3) return `${CSI}${x2 + 1}G`;
        return `${CSI}${y3 + 1};${x2 + 1}H`;
      },
      move(x2, y3) {
        let ret = "";
        if (x2 < 0) ret += `${CSI}${-x2}D`;
        else if (x2 > 0) ret += `${CSI}${x2}C`;
        if (y3 < 0) ret += `${CSI}${-y3}A`;
        else if (y3 > 0) ret += `${CSI}${y3}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module.exports = { cursor, scroll, erase, beep };
  }
});

// ../../node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "../../node_modules/picocolors/picocolors.js"(exports, module) {
    var p2 = process || {};
    var argv = p2.argv || [];
    var env = p2.env || {};
    var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p2.platform === "win32" || (p2.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// src/create.js
import path3 from "node:path";

// ../../node_modules/@clack/core/dist/index.mjs
var import_sisteransi = __toESM(require_src(), 1);
var import_picocolors = __toESM(require_picocolors(), 1);
import { stdin as j, stdout as M } from "node:process";
import * as g from "node:readline";
import O from "node:readline";
import { Writable as X } from "node:stream";
function DD({ onlyFirst: e2 = false } = {}) {
  const t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(t, e2 ? void 0 : "g");
}
var uD = DD();
function P(e2) {
  if (typeof e2 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e2}\``);
  return e2.replace(uD, "");
}
function L(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var W = { exports: {} };
(function(e2) {
  var u2 = {};
  e2.exports = u2, u2.eastAsianWidth = function(F2) {
    var s = F2.charCodeAt(0), i = F2.length == 2 ? F2.charCodeAt(1) : 0, D2 = s;
    return 55296 <= s && s <= 56319 && 56320 <= i && i <= 57343 && (s &= 1023, i &= 1023, D2 = s << 10 | i, D2 += 65536), D2 == 12288 || 65281 <= D2 && D2 <= 65376 || 65504 <= D2 && D2 <= 65510 ? "F" : D2 == 8361 || 65377 <= D2 && D2 <= 65470 || 65474 <= D2 && D2 <= 65479 || 65482 <= D2 && D2 <= 65487 || 65490 <= D2 && D2 <= 65495 || 65498 <= D2 && D2 <= 65500 || 65512 <= D2 && D2 <= 65518 ? "H" : 4352 <= D2 && D2 <= 4447 || 4515 <= D2 && D2 <= 4519 || 4602 <= D2 && D2 <= 4607 || 9001 <= D2 && D2 <= 9002 || 11904 <= D2 && D2 <= 11929 || 11931 <= D2 && D2 <= 12019 || 12032 <= D2 && D2 <= 12245 || 12272 <= D2 && D2 <= 12283 || 12289 <= D2 && D2 <= 12350 || 12353 <= D2 && D2 <= 12438 || 12441 <= D2 && D2 <= 12543 || 12549 <= D2 && D2 <= 12589 || 12593 <= D2 && D2 <= 12686 || 12688 <= D2 && D2 <= 12730 || 12736 <= D2 && D2 <= 12771 || 12784 <= D2 && D2 <= 12830 || 12832 <= D2 && D2 <= 12871 || 12880 <= D2 && D2 <= 13054 || 13056 <= D2 && D2 <= 19903 || 19968 <= D2 && D2 <= 42124 || 42128 <= D2 && D2 <= 42182 || 43360 <= D2 && D2 <= 43388 || 44032 <= D2 && D2 <= 55203 || 55216 <= D2 && D2 <= 55238 || 55243 <= D2 && D2 <= 55291 || 63744 <= D2 && D2 <= 64255 || 65040 <= D2 && D2 <= 65049 || 65072 <= D2 && D2 <= 65106 || 65108 <= D2 && D2 <= 65126 || 65128 <= D2 && D2 <= 65131 || 110592 <= D2 && D2 <= 110593 || 127488 <= D2 && D2 <= 127490 || 127504 <= D2 && D2 <= 127546 || 127552 <= D2 && D2 <= 127560 || 127568 <= D2 && D2 <= 127569 || 131072 <= D2 && D2 <= 194367 || 177984 <= D2 && D2 <= 196605 || 196608 <= D2 && D2 <= 262141 ? "W" : 32 <= D2 && D2 <= 126 || 162 <= D2 && D2 <= 163 || 165 <= D2 && D2 <= 166 || D2 == 172 || D2 == 175 || 10214 <= D2 && D2 <= 10221 || 10629 <= D2 && D2 <= 10630 ? "Na" : D2 == 161 || D2 == 164 || 167 <= D2 && D2 <= 168 || D2 == 170 || 173 <= D2 && D2 <= 174 || 176 <= D2 && D2 <= 180 || 182 <= D2 && D2 <= 186 || 188 <= D2 && D2 <= 191 || D2 == 198 || D2 == 208 || 215 <= D2 && D2 <= 216 || 222 <= D2 && D2 <= 225 || D2 == 230 || 232 <= D2 && D2 <= 234 || 236 <= D2 && D2 <= 237 || D2 == 240 || 242 <= D2 && D2 <= 243 || 247 <= D2 && D2 <= 250 || D2 == 252 || D2 == 254 || D2 == 257 || D2 == 273 || D2 == 275 || D2 == 283 || 294 <= D2 && D2 <= 295 || D2 == 299 || 305 <= D2 && D2 <= 307 || D2 == 312 || 319 <= D2 && D2 <= 322 || D2 == 324 || 328 <= D2 && D2 <= 331 || D2 == 333 || 338 <= D2 && D2 <= 339 || 358 <= D2 && D2 <= 359 || D2 == 363 || D2 == 462 || D2 == 464 || D2 == 466 || D2 == 468 || D2 == 470 || D2 == 472 || D2 == 474 || D2 == 476 || D2 == 593 || D2 == 609 || D2 == 708 || D2 == 711 || 713 <= D2 && D2 <= 715 || D2 == 717 || D2 == 720 || 728 <= D2 && D2 <= 731 || D2 == 733 || D2 == 735 || 768 <= D2 && D2 <= 879 || 913 <= D2 && D2 <= 929 || 931 <= D2 && D2 <= 937 || 945 <= D2 && D2 <= 961 || 963 <= D2 && D2 <= 969 || D2 == 1025 || 1040 <= D2 && D2 <= 1103 || D2 == 1105 || D2 == 8208 || 8211 <= D2 && D2 <= 8214 || 8216 <= D2 && D2 <= 8217 || 8220 <= D2 && D2 <= 8221 || 8224 <= D2 && D2 <= 8226 || 8228 <= D2 && D2 <= 8231 || D2 == 8240 || 8242 <= D2 && D2 <= 8243 || D2 == 8245 || D2 == 8251 || D2 == 8254 || D2 == 8308 || D2 == 8319 || 8321 <= D2 && D2 <= 8324 || D2 == 8364 || D2 == 8451 || D2 == 8453 || D2 == 8457 || D2 == 8467 || D2 == 8470 || 8481 <= D2 && D2 <= 8482 || D2 == 8486 || D2 == 8491 || 8531 <= D2 && D2 <= 8532 || 8539 <= D2 && D2 <= 8542 || 8544 <= D2 && D2 <= 8555 || 8560 <= D2 && D2 <= 8569 || D2 == 8585 || 8592 <= D2 && D2 <= 8601 || 8632 <= D2 && D2 <= 8633 || D2 == 8658 || D2 == 8660 || D2 == 8679 || D2 == 8704 || 8706 <= D2 && D2 <= 8707 || 8711 <= D2 && D2 <= 8712 || D2 == 8715 || D2 == 8719 || D2 == 8721 || D2 == 8725 || D2 == 8730 || 8733 <= D2 && D2 <= 8736 || D2 == 8739 || D2 == 8741 || 8743 <= D2 && D2 <= 8748 || D2 == 8750 || 8756 <= D2 && D2 <= 8759 || 8764 <= D2 && D2 <= 8765 || D2 == 8776 || D2 == 8780 || D2 == 8786 || 8800 <= D2 && D2 <= 8801 || 8804 <= D2 && D2 <= 8807 || 8810 <= D2 && D2 <= 8811 || 8814 <= D2 && D2 <= 8815 || 8834 <= D2 && D2 <= 8835 || 8838 <= D2 && D2 <= 8839 || D2 == 8853 || D2 == 8857 || D2 == 8869 || D2 == 8895 || D2 == 8978 || 9312 <= D2 && D2 <= 9449 || 9451 <= D2 && D2 <= 9547 || 9552 <= D2 && D2 <= 9587 || 9600 <= D2 && D2 <= 9615 || 9618 <= D2 && D2 <= 9621 || 9632 <= D2 && D2 <= 9633 || 9635 <= D2 && D2 <= 9641 || 9650 <= D2 && D2 <= 9651 || 9654 <= D2 && D2 <= 9655 || 9660 <= D2 && D2 <= 9661 || 9664 <= D2 && D2 <= 9665 || 9670 <= D2 && D2 <= 9672 || D2 == 9675 || 9678 <= D2 && D2 <= 9681 || 9698 <= D2 && D2 <= 9701 || D2 == 9711 || 9733 <= D2 && D2 <= 9734 || D2 == 9737 || 9742 <= D2 && D2 <= 9743 || 9748 <= D2 && D2 <= 9749 || D2 == 9756 || D2 == 9758 || D2 == 9792 || D2 == 9794 || 9824 <= D2 && D2 <= 9825 || 9827 <= D2 && D2 <= 9829 || 9831 <= D2 && D2 <= 9834 || 9836 <= D2 && D2 <= 9837 || D2 == 9839 || 9886 <= D2 && D2 <= 9887 || 9918 <= D2 && D2 <= 9919 || 9924 <= D2 && D2 <= 9933 || 9935 <= D2 && D2 <= 9953 || D2 == 9955 || 9960 <= D2 && D2 <= 9983 || D2 == 10045 || D2 == 10071 || 10102 <= D2 && D2 <= 10111 || 11093 <= D2 && D2 <= 11097 || 12872 <= D2 && D2 <= 12879 || 57344 <= D2 && D2 <= 63743 || 65024 <= D2 && D2 <= 65039 || D2 == 65533 || 127232 <= D2 && D2 <= 127242 || 127248 <= D2 && D2 <= 127277 || 127280 <= D2 && D2 <= 127337 || 127344 <= D2 && D2 <= 127386 || 917760 <= D2 && D2 <= 917999 || 983040 <= D2 && D2 <= 1048573 || 1048576 <= D2 && D2 <= 1114109 ? "A" : "N";
  }, u2.characterLength = function(F2) {
    var s = this.eastAsianWidth(F2);
    return s == "F" || s == "W" || s == "A" ? 2 : 1;
  };
  function t(F2) {
    return F2.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
  }
  u2.length = function(F2) {
    for (var s = t(F2), i = 0, D2 = 0; D2 < s.length; D2++) i = i + this.characterLength(s[D2]);
    return i;
  }, u2.slice = function(F2, s, i) {
    textLen = u2.length(F2), s = s || 0, i = i || 1, s < 0 && (s = textLen + s), i < 0 && (i = textLen + i);
    for (var D2 = "", r = 0, n = t(F2), E = 0; E < n.length; E++) {
      var a = n[E], o2 = u2.length(a);
      if (r >= s - (o2 == 2 ? 1 : 0)) if (r + o2 <= i) D2 += a;
      else break;
      r += o2;
    }
    return D2;
  };
})(W);
var tD = W.exports;
var eD = L(tD);
var FD = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
var sD = L(FD);
function p(e2, u2 = {}) {
  if (typeof e2 != "string" || e2.length === 0 || (u2 = { ambiguousIsNarrow: true, ...u2 }, e2 = P(e2), e2.length === 0)) return 0;
  e2 = e2.replace(sD(), "  ");
  const t = u2.ambiguousIsNarrow ? 1 : 2;
  let F2 = 0;
  for (const s of e2) {
    const i = s.codePointAt(0);
    if (i <= 31 || i >= 127 && i <= 159 || i >= 768 && i <= 879) continue;
    switch (eD.eastAsianWidth(s)) {
      case "F":
      case "W":
        F2 += 2;
        break;
      case "A":
        F2 += t;
        break;
      default:
        F2 += 1;
    }
  }
  return F2;
}
var w = 10;
var N = (e2 = 0) => (u2) => `\x1B[${u2 + e2}m`;
var I = (e2 = 0) => (u2) => `\x1B[${38 + e2};5;${u2}m`;
var R = (e2 = 0) => (u2, t, F2) => `\x1B[${38 + e2};2;${u2};${t};${F2}m`;
var C = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
Object.keys(C.modifier);
var iD = Object.keys(C.color);
var rD = Object.keys(C.bgColor);
[...iD, ...rD];
function CD() {
  const e2 = /* @__PURE__ */ new Map();
  for (const [u2, t] of Object.entries(C)) {
    for (const [F2, s] of Object.entries(t)) C[F2] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, t[F2] = C[F2], e2.set(s[0], s[1]);
    Object.defineProperty(C, u2, { value: t, enumerable: false });
  }
  return Object.defineProperty(C, "codes", { value: e2, enumerable: false }), C.color.close = "\x1B[39m", C.bgColor.close = "\x1B[49m", C.color.ansi = N(), C.color.ansi256 = I(), C.color.ansi16m = R(), C.bgColor.ansi = N(w), C.bgColor.ansi256 = I(w), C.bgColor.ansi16m = R(w), Object.defineProperties(C, { rgbToAnsi256: { value: (u2, t, F2) => u2 === t && t === F2 ? u2 < 8 ? 16 : u2 > 248 ? 231 : Math.round((u2 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u2 / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(F2 / 255 * 5), enumerable: false }, hexToRgb: { value: (u2) => {
    const t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u2.toString(16));
    if (!t) return [0, 0, 0];
    let [F2] = t;
    F2.length === 3 && (F2 = [...F2].map((i) => i + i).join(""));
    const s = Number.parseInt(F2, 16);
    return [s >> 16 & 255, s >> 8 & 255, s & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u2) => C.rgbToAnsi256(...C.hexToRgb(u2)), enumerable: false }, ansi256ToAnsi: { value: (u2) => {
    if (u2 < 8) return 30 + u2;
    if (u2 < 16) return 90 + (u2 - 8);
    let t, F2, s;
    if (u2 >= 232) t = ((u2 - 232) * 10 + 8) / 255, F2 = t, s = t;
    else {
      u2 -= 16;
      const r = u2 % 36;
      t = Math.floor(u2 / 36) / 5, F2 = Math.floor(r / 6) / 5, s = r % 6 / 5;
    }
    const i = Math.max(t, F2, s) * 2;
    if (i === 0) return 30;
    let D2 = 30 + (Math.round(s) << 2 | Math.round(F2) << 1 | Math.round(t));
    return i === 2 && (D2 += 60), D2;
  }, enumerable: false }, rgbToAnsi: { value: (u2, t, F2) => C.ansi256ToAnsi(C.rgbToAnsi256(u2, t, F2)), enumerable: false }, hexToAnsi: { value: (u2) => C.ansi256ToAnsi(C.hexToAnsi256(u2)), enumerable: false } }), C;
}
var ED = CD();
var d = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
var oD = 39;
var y = "\x07";
var V = "[";
var nD = "]";
var G = "m";
var _ = `${nD}8;;`;
var z = (e2) => `${d.values().next().value}${V}${e2}${G}`;
var K = (e2) => `${d.values().next().value}${_}${e2}${y}`;
var aD = (e2) => e2.split(" ").map((u2) => p(u2));
var k = (e2, u2, t) => {
  const F2 = [...u2];
  let s = false, i = false, D2 = p(P(e2[e2.length - 1]));
  for (const [r, n] of F2.entries()) {
    const E = p(n);
    if (D2 + E <= t ? e2[e2.length - 1] += n : (e2.push(n), D2 = 0), d.has(n) && (s = true, i = F2.slice(r + 1).join("").startsWith(_)), s) {
      i ? n === y && (s = false, i = false) : n === G && (s = false);
      continue;
    }
    D2 += E, D2 === t && r < F2.length - 1 && (e2.push(""), D2 = 0);
  }
  !D2 && e2[e2.length - 1].length > 0 && e2.length > 1 && (e2[e2.length - 2] += e2.pop());
};
var hD = (e2) => {
  const u2 = e2.split(" ");
  let t = u2.length;
  for (; t > 0 && !(p(u2[t - 1]) > 0); ) t--;
  return t === u2.length ? e2 : u2.slice(0, t).join(" ") + u2.slice(t).join("");
};
var lD = (e2, u2, t = {}) => {
  if (t.trim !== false && e2.trim() === "") return "";
  let F2 = "", s, i;
  const D2 = aD(e2);
  let r = [""];
  for (const [E, a] of e2.split(" ").entries()) {
    t.trim !== false && (r[r.length - 1] = r[r.length - 1].trimStart());
    let o2 = p(r[r.length - 1]);
    if (E !== 0 && (o2 >= u2 && (t.wordWrap === false || t.trim === false) && (r.push(""), o2 = 0), (o2 > 0 || t.trim === false) && (r[r.length - 1] += " ", o2++)), t.hard && D2[E] > u2) {
      const c = u2 - o2, f = 1 + Math.floor((D2[E] - c - 1) / u2);
      Math.floor((D2[E] - 1) / u2) < f && r.push(""), k(r, a, u2);
      continue;
    }
    if (o2 + D2[E] > u2 && o2 > 0 && D2[E] > 0) {
      if (t.wordWrap === false && o2 < u2) {
        k(r, a, u2);
        continue;
      }
      r.push("");
    }
    if (o2 + D2[E] > u2 && t.wordWrap === false) {
      k(r, a, u2);
      continue;
    }
    r[r.length - 1] += a;
  }
  t.trim !== false && (r = r.map((E) => hD(E)));
  const n = [...r.join(`
`)];
  for (const [E, a] of n.entries()) {
    if (F2 += a, d.has(a)) {
      const { groups: c } = new RegExp(`(?:\\${V}(?<code>\\d+)m|\\${_}(?<uri>.*)${y})`).exec(n.slice(E).join("")) || { groups: {} };
      if (c.code !== void 0) {
        const f = Number.parseFloat(c.code);
        s = f === oD ? void 0 : f;
      } else c.uri !== void 0 && (i = c.uri.length === 0 ? void 0 : c.uri);
    }
    const o2 = ED.codes.get(Number(s));
    n[E + 1] === `
` ? (i && (F2 += K("")), s && o2 && (F2 += z(o2))) : a === `
` && (s && o2 && (F2 += z(s)), i && (F2 += K(i)));
  }
  return F2;
};
function Y(e2, u2, t) {
  return String(e2).normalize().replace(/\r\n/g, `
`).split(`
`).map((F2) => lD(F2, u2, t)).join(`
`);
}
var xD = ["up", "down", "left", "right", "space", "enter", "cancel"];
var B = { actions: new Set(xD), aliases: /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"], ["", "cancel"], ["escape", "cancel"]]) };
function $(e2, u2) {
  if (typeof e2 == "string") return B.aliases.get(e2) === u2;
  for (const t of e2) if (t !== void 0 && $(t, u2)) return true;
  return false;
}
function BD(e2, u2) {
  if (e2 === u2) return;
  const t = e2.split(`
`), F2 = u2.split(`
`), s = [];
  for (let i = 0; i < Math.max(t.length, F2.length); i++) t[i] !== F2[i] && s.push(i);
  return s;
}
var AD = globalThis.process.platform.startsWith("win");
var S = Symbol("clack:cancel");
function pD(e2) {
  return e2 === S;
}
function m(e2, u2) {
  const t = e2;
  t.isTTY && t.setRawMode(u2);
}
function fD({ input: e2 = j, output: u2 = M, overwrite: t = true, hideCursor: F2 = true } = {}) {
  const s = g.createInterface({ input: e2, output: u2, prompt: "", tabSize: 1 });
  g.emitKeypressEvents(e2, s), e2.isTTY && e2.setRawMode(true);
  const i = (D2, { name: r, sequence: n }) => {
    const E = String(D2);
    if ($([E, r, n], "cancel")) {
      F2 && u2.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!t) return;
    const a = r === "return" ? 0 : -1, o2 = r === "return" ? -1 : 0;
    g.moveCursor(u2, a, o2, () => {
      g.clearLine(u2, 1, () => {
        e2.once("keypress", i);
      });
    });
  };
  return F2 && u2.write(import_sisteransi.cursor.hide), e2.once("keypress", i), () => {
    e2.off("keypress", i), F2 && u2.write(import_sisteransi.cursor.show), e2.isTTY && !AD && e2.setRawMode(false), s.terminal = false, s.close();
  };
}
var gD = Object.defineProperty;
var vD = (e2, u2, t) => u2 in e2 ? gD(e2, u2, { enumerable: true, configurable: true, writable: true, value: t }) : e2[u2] = t;
var h = (e2, u2, t) => (vD(e2, typeof u2 != "symbol" ? u2 + "" : u2, t), t);
var x = class {
  constructor(u2, t = true) {
    h(this, "input"), h(this, "output"), h(this, "_abortSignal"), h(this, "rl"), h(this, "opts"), h(this, "_render"), h(this, "_track", false), h(this, "_prevFrame", ""), h(this, "_subscribers", /* @__PURE__ */ new Map()), h(this, "_cursor", 0), h(this, "state", "initial"), h(this, "error", ""), h(this, "value");
    const { input: F2 = j, output: s = M, render: i, signal: D2, ...r } = u2;
    this.opts = r, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = i.bind(this), this._track = t, this._abortSignal = D2, this.input = F2, this.output = s;
  }
  unsubscribe() {
    this._subscribers.clear();
  }
  setSubscriber(u2, t) {
    const F2 = this._subscribers.get(u2) ?? [];
    F2.push(t), this._subscribers.set(u2, F2);
  }
  on(u2, t) {
    this.setSubscriber(u2, { cb: t });
  }
  once(u2, t) {
    this.setSubscriber(u2, { cb: t, once: true });
  }
  emit(u2, ...t) {
    const F2 = this._subscribers.get(u2) ?? [], s = [];
    for (const i of F2) i.cb(...t), i.once && s.push(() => F2.splice(F2.indexOf(i), 1));
    for (const i of s) i();
  }
  prompt() {
    return new Promise((u2, t) => {
      if (this._abortSignal) {
        if (this._abortSignal.aborted) return this.state = "cancel", this.close(), u2(S);
        this._abortSignal.addEventListener("abort", () => {
          this.state = "cancel", this.close();
        }, { once: true });
      }
      const F2 = new X();
      F2._write = (s, i, D2) => {
        this._track && (this.value = this.rl?.line.replace(/\t/g, ""), this._cursor = this.rl?.cursor ?? 0, this.emit("value", this.value)), D2();
      }, this.input.pipe(F2), this.rl = O.createInterface({ input: this.input, output: F2, tabSize: 2, prompt: "", escapeCodeTimeout: 50, terminal: true }), O.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), m(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), m(this.input, false), u2(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), m(this.input, false), u2(S);
      });
    });
  }
  onKeypress(u2, t) {
    if (this.state === "error" && (this.state = "active"), t?.name && (!this._track && B.aliases.has(t.name) && this.emit("cursor", B.aliases.get(t.name)), B.actions.has(t.name) && this.emit("cursor", t.name)), u2 && (u2.toLowerCase() === "y" || u2.toLowerCase() === "n") && this.emit("confirm", u2.toLowerCase() === "y"), u2 === "	" && this.opts.placeholder && (this.value || (this.rl?.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u2 && this.emit("key", u2.toLowerCase()), t?.name === "return") {
      if (!this.value && this.opts.placeholder && (this.rl?.write(this.opts.placeholder), this.emit("value", this.opts.placeholder)), this.opts.validate) {
        const F2 = this.opts.validate(this.value);
        F2 && (this.error = F2 instanceof Error ? F2.message : F2, this.state = "error", this.rl?.write(this.value));
      }
      this.state !== "error" && (this.state = "submit");
    }
    $([u2, t?.name, t?.sequence], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), m(this.input, false), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const u2 = Y(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, u2 * -1));
  }
  render() {
    const u2 = Y(this._render(this) ?? "", process.stdout.columns, { hard: true });
    if (u2 !== this._prevFrame) {
      if (this.state === "initial") this.output.write(import_sisteransi.cursor.hide);
      else {
        const t = BD(this._prevFrame, u2);
        if (this.restoreCursor(), t && t?.length === 1) {
          const F2 = t[0];
          this.output.write(import_sisteransi.cursor.move(0, F2)), this.output.write(import_sisteransi.erase.lines(1));
          const s = u2.split(`
`);
          this.output.write(s[F2]), this._prevFrame = u2, this.output.write(import_sisteransi.cursor.move(0, s.length - F2 - 1));
          return;
        }
        if (t && t?.length > 1) {
          const F2 = t[0];
          this.output.write(import_sisteransi.cursor.move(0, F2)), this.output.write(import_sisteransi.erase.down());
          const s = u2.split(`
`).slice(F2);
          this.output.write(s.join(`
`)), this._prevFrame = u2;
          return;
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(u2), this.state === "initial" && (this.state = "active"), this._prevFrame = u2;
    }
  }
};
var dD = class extends x {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(u2) {
    super(u2, false), this.value = !!u2.initialValue, this.on("value", () => {
      this.value = this._value;
    }), this.on("confirm", (t) => {
      this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = t, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
};
var A;
A = /* @__PURE__ */ new WeakMap();
var OD = Object.defineProperty;
var PD = (e2, u2, t) => u2 in e2 ? OD(e2, u2, { enumerable: true, configurable: true, writable: true, value: t }) : e2[u2] = t;
var J = (e2, u2, t) => (PD(e2, typeof u2 != "symbol" ? u2 + "" : u2, t), t);
var LD = class extends x {
  constructor(u2) {
    super(u2, false), J(this, "options"), J(this, "cursor", 0), this.options = u2.options, this.cursor = this.options.findIndex(({ value: t }) => t === u2.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (t) => {
      switch (t) {
        case "left":
        case "up":
          this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
          break;
        case "down":
        case "right":
          this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
          break;
      }
      this.changeValue();
    });
  }
  get _value() {
    return this.options[this.cursor];
  }
  changeValue() {
    this.value = this._value.value;
  }
};
var RD = class extends x {
  get valueWithCursor() {
    if (this.state === "submit") return this.value;
    if (this.cursor >= this.value.length) return `${this.value}\u2588`;
    const u2 = this.value.slice(0, this.cursor), [t, ...F2] = this.value.slice(this.cursor);
    return `${u2}${import_picocolors.default.inverse(t)}${F2.join("")}`;
  }
  get cursor() {
    return this._cursor;
  }
  constructor(u2) {
    super(u2), this.on("finalize", () => {
      this.value || (this.value = u2.defaultValue);
    });
  }
};

// ../../node_modules/@clack/prompts/dist/index.mjs
var import_picocolors2 = __toESM(require_picocolors(), 1);
var import_sisteransi2 = __toESM(require_src(), 1);
import y2 from "node:process";
function ce() {
  return y2.platform !== "win32" ? y2.env.TERM !== "linux" : !!y2.env.CI || !!y2.env.WT_SESSION || !!y2.env.TERMINUS_SUBLIME || y2.env.ConEmuTask === "{cmd::Cmder}" || y2.env.TERM_PROGRAM === "Terminus-Sublime" || y2.env.TERM_PROGRAM === "vscode" || y2.env.TERM === "xterm-256color" || y2.env.TERM === "alacritty" || y2.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var V2 = ce();
var u = (t, n) => V2 ? t : n;
var le = u("\u25C6", "*");
var L2 = u("\u25A0", "x");
var W2 = u("\u25B2", "x");
var C2 = u("\u25C7", "o");
var ue = u("\u250C", "T");
var o = u("\u2502", "|");
var d2 = u("\u2514", "\u2014");
var k2 = u("\u25CF", ">");
var P2 = u("\u25CB", " ");
var A2 = u("\u25FB", "[\u2022]");
var T = u("\u25FC", "[+]");
var F = u("\u25FB", "[ ]");
var $e = u("\u25AA", "\u2022");
var _2 = u("\u2500", "-");
var me = u("\u256E", "+");
var de = u("\u251C", "+");
var pe = u("\u256F", "+");
var q = u("\u25CF", "\u2022");
var D = u("\u25C6", "*");
var U = u("\u25B2", "!");
var K2 = u("\u25A0", "x");
var b2 = (t) => {
  switch (t) {
    case "initial":
    case "active":
      return import_picocolors2.default.cyan(le);
    case "cancel":
      return import_picocolors2.default.red(L2);
    case "error":
      return import_picocolors2.default.yellow(W2);
    case "submit":
      return import_picocolors2.default.green(C2);
  }
};
var G2 = (t) => {
  const { cursor: n, options: r, style: i } = t, s = t.maxItems ?? Number.POSITIVE_INFINITY, c = Math.max(process.stdout.rows - 4, 0), a = Math.min(c, Math.max(s, 5));
  let l2 = 0;
  n >= l2 + a - 3 ? l2 = Math.max(Math.min(n - a + 3, r.length - a), 0) : n < l2 + 2 && (l2 = Math.max(n - 2, 0));
  const $2 = a < r.length && l2 > 0, g2 = a < r.length && l2 + a < r.length;
  return r.slice(l2, l2 + a).map((p2, v2, f) => {
    const j2 = v2 === 0 && $2, E = v2 === f.length - 1 && g2;
    return j2 || E ? import_picocolors2.default.dim("...") : i(p2, v2 + l2 === n);
  });
};
var he = (t) => new RD({ validate: t.validate, placeholder: t.placeholder, defaultValue: t.defaultValue, initialValue: t.initialValue, render() {
  const n = `${import_picocolors2.default.gray(o)}
${b2(this.state)}  ${t.message}
`, r = t.placeholder ? import_picocolors2.default.inverse(t.placeholder[0]) + import_picocolors2.default.dim(t.placeholder.slice(1)) : import_picocolors2.default.inverse(import_picocolors2.default.hidden("_")), i = this.value ? this.valueWithCursor : r;
  switch (this.state) {
    case "error":
      return `${n.trim()}
${import_picocolors2.default.yellow(o)}  ${i}
${import_picocolors2.default.yellow(d2)}  ${import_picocolors2.default.yellow(this.error)}
`;
    case "submit":
      return `${n}${import_picocolors2.default.gray(o)}  ${import_picocolors2.default.dim(this.value || t.placeholder)}`;
    case "cancel":
      return `${n}${import_picocolors2.default.gray(o)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(this.value ?? ""))}${this.value?.trim() ? `
${import_picocolors2.default.gray(o)}` : ""}`;
    default:
      return `${n}${import_picocolors2.default.cyan(o)}  ${i}
${import_picocolors2.default.cyan(d2)}
`;
  }
} }).prompt();
var ye = (t) => {
  const n = t.active ?? "Yes", r = t.inactive ?? "No";
  return new dD({ active: n, inactive: r, initialValue: t.initialValue ?? true, render() {
    const i = `${import_picocolors2.default.gray(o)}
${b2(this.state)}  ${t.message}
`, s = this.value ? n : r;
    switch (this.state) {
      case "submit":
        return `${i}${import_picocolors2.default.gray(o)}  ${import_picocolors2.default.dim(s)}`;
      case "cancel":
        return `${i}${import_picocolors2.default.gray(o)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(s))}
${import_picocolors2.default.gray(o)}`;
      default:
        return `${i}${import_picocolors2.default.cyan(o)}  ${this.value ? `${import_picocolors2.default.green(k2)} ${n}` : `${import_picocolors2.default.dim(P2)} ${import_picocolors2.default.dim(n)}`} ${import_picocolors2.default.dim("/")} ${this.value ? `${import_picocolors2.default.dim(P2)} ${import_picocolors2.default.dim(r)}` : `${import_picocolors2.default.green(k2)} ${r}`}
${import_picocolors2.default.cyan(d2)}
`;
    }
  } }).prompt();
};
var ve = (t) => {
  const n = (r, i) => {
    const s = r.label ?? String(r.value);
    switch (i) {
      case "selected":
        return `${import_picocolors2.default.dim(s)}`;
      case "active":
        return `${import_picocolors2.default.green(k2)} ${s} ${r.hint ? import_picocolors2.default.dim(`(${r.hint})`) : ""}`;
      case "cancelled":
        return `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(s))}`;
      default:
        return `${import_picocolors2.default.dim(P2)} ${import_picocolors2.default.dim(s)}`;
    }
  };
  return new LD({ options: t.options, initialValue: t.initialValue, render() {
    const r = `${import_picocolors2.default.gray(o)}
${b2(this.state)}  ${t.message}
`;
    switch (this.state) {
      case "submit":
        return `${r}${import_picocolors2.default.gray(o)}  ${n(this.options[this.cursor], "selected")}`;
      case "cancel":
        return `${r}${import_picocolors2.default.gray(o)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors2.default.gray(o)}`;
      default:
        return `${r}${import_picocolors2.default.cyan(o)}  ${G2({ cursor: this.cursor, options: this.options, maxItems: t.maxItems, style: (i, s) => n(i, s ? "active" : "inactive") }).join(`
${import_picocolors2.default.cyan(o)}  `)}
${import_picocolors2.default.cyan(d2)}
`;
    }
  } }).prompt();
};
var xe = (t = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(d2)}  ${import_picocolors2.default.red(t)}

`);
};
var Ie = (t = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(ue)}  ${t}
`);
};
var Se = (t = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(o)}
${import_picocolors2.default.gray(d2)}  ${t}

`);
};
var J2 = `${import_picocolors2.default.gray(o)}  `;
var Y2 = ({ indicator: t = "dots" } = {}) => {
  const n = V2 ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"], r = V2 ? 80 : 120, i = process.env.CI === "true";
  let s, c, a = false, l2 = "", $2, g2 = performance.now();
  const p2 = (m2) => {
    const h2 = m2 > 1 ? "Something went wrong" : "Canceled";
    a && N2(h2, m2);
  }, v2 = () => p2(2), f = () => p2(1), j2 = () => {
    process.on("uncaughtExceptionMonitor", v2), process.on("unhandledRejection", v2), process.on("SIGINT", f), process.on("SIGTERM", f), process.on("exit", p2);
  }, E = () => {
    process.removeListener("uncaughtExceptionMonitor", v2), process.removeListener("unhandledRejection", v2), process.removeListener("SIGINT", f), process.removeListener("SIGTERM", f), process.removeListener("exit", p2);
  }, B2 = () => {
    if ($2 === void 0) return;
    i && process.stdout.write(`
`);
    const m2 = $2.split(`
`);
    process.stdout.write(import_sisteransi2.cursor.move(-999, m2.length - 1)), process.stdout.write(import_sisteransi2.erase.down(m2.length));
  }, R2 = (m2) => m2.replace(/\.+$/, ""), O2 = (m2) => {
    const h2 = (performance.now() - m2) / 1e3, w2 = Math.floor(h2 / 60), I2 = Math.floor(h2 % 60);
    return w2 > 0 ? `[${w2}m ${I2}s]` : `[${I2}s]`;
  }, H = (m2 = "") => {
    a = true, s = fD(), l2 = R2(m2), g2 = performance.now(), process.stdout.write(`${import_picocolors2.default.gray(o)}
`);
    let h2 = 0, w2 = 0;
    j2(), c = setInterval(() => {
      if (i && l2 === $2) return;
      B2(), $2 = l2;
      const I2 = import_picocolors2.default.magenta(n[h2]);
      if (i) process.stdout.write(`${I2}  ${l2}...`);
      else if (t === "timer") process.stdout.write(`${I2}  ${l2} ${O2(g2)}`);
      else {
        const z2 = ".".repeat(Math.floor(w2)).slice(0, 3);
        process.stdout.write(`${I2}  ${l2}${z2}`);
      }
      h2 = h2 + 1 < n.length ? h2 + 1 : 0, w2 = w2 < n.length ? w2 + 0.125 : 0;
    }, r);
  }, N2 = (m2 = "", h2 = 0) => {
    a = false, clearInterval(c), B2();
    const w2 = h2 === 0 ? import_picocolors2.default.green(C2) : h2 === 1 ? import_picocolors2.default.red(L2) : import_picocolors2.default.red(W2);
    l2 = R2(m2 ?? l2), t === "timer" ? process.stdout.write(`${w2}  ${l2} ${O2(g2)}
`) : process.stdout.write(`${w2}  ${l2}
`), E(), s();
  };
  return { start: H, stop: N2, message: (m2 = "") => {
    l2 = R2(m2 ?? l2);
  } };
};

// src/utils.js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// src/constants.js
var BRAND_NAME = "igivafuk";
var WEBSITE_URL = "https://idontgivaf.uk";
var TAGLINE = "Structure over slop.";
var TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  ".md",
  ".json",
  ".yml",
  ".yaml",
  ".sh",
  ".gitignore",
  ".editorconfig",
  ".gitkeep"
]);

// src/utils.js
function getTemplateDir() {
  const packageRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    ".."
  );
  return path.join(packageRoot, "templates", "default");
}
function toKebabCase(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function toTitleCase(value) {
  return value.split(/[\s-_]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
}
function toIdentifier(value) {
  const identifier = toKebabCase(value).replaceAll("-", "_");
  if (!identifier) return "my_project";
  if (/^\d/.test(identifier)) return `project_${identifier}`;
  return identifier;
}
function toPascalIdentifier(value) {
  const identifier = toKebabCase(value).split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
  if (!identifier) return "MyProject";
  if (/^\d/.test(identifier)) return `Project${identifier}`;
  return identifier;
}
function buildTemplateVars({ projectName, description, version, preset }) {
  const slug = toKebabCase(projectName);
  const title = toTitleCase(projectName);
  const moduleName = toIdentifier(projectName);
  const pascalName = toPascalIdentifier(projectName);
  const languageId = preset?.language ?? "none";
  const vars = {
    PROJECT_NAME: title || "My Project",
    PROJECT_SLUG: slug || "my-project",
    PROJECT_MODULE: moduleName,
    PROJECT_PASCAL: pascalName,
    PROJECT_PACKAGE: `com.example.${moduleName}`,
    PROJECT_PACKAGE_PATH: `com/example/${moduleName}`,
    PROJECT_DESCRIPTION: description || "A structured project built with igivafuk.",
    SETUP_ID: preset?.id ?? "default",
    SETUP_LABEL: preset?.label ?? "Minimal",
    SETUP_LANGUAGE: languageId,
    SETUP_DESCRIPTION: preset?.description ?? "Language-neutral project guardrails.",
    SETUP_STRUCTURE: preset?.structure ?? "Add your stack-specific structure when the project is ready.",
    YEAR: String((/* @__PURE__ */ new Date()).getFullYear()),
    IGIVAFUK_VERSION: version,
    WEBSITE_URL: "https://idontgivaf.uk",
    BRAND_NAME: "igivafuk",
    TAGLINE: "Structure over slop."
  };
  vars.SETUP_STRUCTURE = applyTemplate(vars.SETUP_STRUCTURE, vars);
  return vars;
}
function applyTemplate(content, vars) {
  return Object.entries(vars).reduce((result, [key, value]) => {
    return result.replaceAll(`{{${key}}}`, value);
  }, content);
}
function mapTemplateFileName(name) {
  if (name === "_gitignore") return ".gitignore";
  return name;
}
function isTextFile(filePath) {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath);
  if (basename === ".gitkeep" || basename === ".gitignore" || basename === "_gitignore" || basename === ".editorconfig") {
    return true;
  }
  return TEXT_EXTENSIONS.has(ext);
}
async function copyTemplate({ templateDir, targetDir, vars }) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(templateDir, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(templateDir, entry.name);
    const destName = mapTemplateFileName(entry.name);
    const destPath = path.join(targetDir, destName);
    if (entry.isDirectory()) {
      await copyTemplate({ templateDir: sourcePath, targetDir: destPath, vars });
      continue;
    }
    if (await isTextFile(sourcePath)) {
      const content = await fs.readFile(sourcePath, "utf8");
      await fs.writeFile(destPath, applyTemplate(content, vars), "utf8");
      continue;
    }
    await fs.copyFile(sourcePath, destPath);
  }
}
async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
async function initGit(targetDir) {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const exec = promisify(execFile);
  await exec("git", ["init"], { cwd: targetDir });
  await exec("git", ["add", "."], { cwd: targetDir });
  await exec("git", ["commit", "-m", "Initial commit from create-igivafuk"], { cwd: targetDir });
}

// src/presets.js
import fs2 from "node:fs/promises";
import path2 from "node:path";
var DEFAULT_LANGUAGE_PRESET_ID = "default";
var LANGUAGE_PRESETS = [
  {
    id: "default",
    aliases: ["base", "minimal", "none"],
    label: "Minimal",
    language: "none",
    description: "Language-neutral guardrails only. Pick this when the stack is not decided yet.",
    structure: `{{PROJECT_SLUG}}/
+-- .github/
+-- AGENTS.md
+-- CHANGELOG.md
+-- CONTRIBUTING.md
+-- README.md`,
    directories: [],
    files: []
  },
  {
    id: "javascript",
    aliases: ["js", "node", "nodejs"],
    label: "JavaScript",
    language: "javascript",
    description: "Node-friendly JavaScript layout with source, tests, config, scripts, and docs separated.",
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- index.js
+-- test/
|   +-- index.test.js
+-- config/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- package.json`,
    directories: ["config", "docs", "scripts", "src", "test"],
    files: [
      {
        path: "package.json",
        content: `{
  "name": "{{PROJECT_SLUG}}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "test": "node --test"
  }
}
`
      },
      {
        path: "src/index.js",
        content: `import { pathToFileURL } from 'node:url';

export function main() {
  return '{{PROJECT_SLUG}} is ready.';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(main());
}
`
      },
      {
        path: "test/index.test.js",
        content: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';

test('main returns a ready message', () => {
  assert.equal(main(), '{{PROJECT_SLUG}} is ready.');
});
`
      },
      {
        path: "docs/architecture.md",
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`
      },
      { path: "config/.gitkeep", content: "" },
      { path: "scripts/.gitkeep", content: "" }
    ]
  },
  {
    id: "typescript",
    aliases: ["ts", "node-ts", "nodejs-ts"],
    label: "TypeScript",
    language: "typescript",
    description: "TypeScript layout with compiled source, tests, typed config, scripts, and docs separated.",
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- index.ts
+-- test/
|   +-- index.test.ts
+-- types/
+-- config/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- package.json
+-- tsconfig.json`,
    directories: ["config", "docs", "scripts", "src", "test", "types"],
    files: [
      {
        path: "package.json",
        content: `{
  "name": "{{PROJECT_SLUG}}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "npx tsc -p tsconfig.json",
    "typecheck": "npx tsc --noEmit",
    "test": "npm run build && node --test dist/**/*.test.js"
  }
}
`
      },
      {
        path: "tsconfig.json",
        content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": ".",
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "test/**/*.ts", "types/**/*.ts"]
}
`
      },
      {
        path: "src/index.ts",
        content: `export function main(): string {
  return '{{PROJECT_SLUG}} is ready.';
}
`
      },
      {
        path: "test/index.test.ts",
        content: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';

test('main returns a ready message', () => {
  assert.equal(main(), '{{PROJECT_SLUG}} is ready.');
});
`
      },
      {
        path: "docs/architecture.md",
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`
      },
      { path: "config/.gitkeep", content: "" },
      { path: "scripts/.gitkeep", content: "" },
      { path: "types/.gitkeep", content: "" }
    ]
  },
  {
    id: "python",
    aliases: ["py"],
    label: "Python",
    language: "python",
    description: "Python src-layout with import-safe package code, tests, config, scripts, notebooks, and docs.",
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- {{PROJECT_MODULE}}/
|       +-- __init__.py
|       +-- main.py
+-- tests/
|   +-- test_smoke.py
+-- config/
+-- docs/
|   +-- architecture.md
+-- notebooks/
+-- scripts/
+-- pyproject.toml`,
    directories: ["config", "docs", "notebooks", "scripts", "src/{{PROJECT_MODULE}}", "tests"],
    files: [
      {
        path: "pyproject.toml",
        content: `[project]
name = "{{PROJECT_SLUG}}"
version = "0.1.0"
requires-python = ">=3.11"

[tool.pytest.ini_options]
testpaths = ["tests"]
pythonpath = ["src"]
`
      },
      {
        path: "src/{{PROJECT_MODULE}}/__init__.py",
        content: `"""{{PROJECT_SLUG}} package."""

from .main import main

__all__ = ["main"]
`
      },
      {
        path: "src/{{PROJECT_MODULE}}/main.py",
        content: `def main() -> str:
    return "{{PROJECT_SLUG}} is ready."
`
      },
      {
        path: "tests/test_smoke.py",
        content: `from {{PROJECT_MODULE}} import main


def test_main_returns_ready_message() -> None:
    assert main() == "{{PROJECT_SLUG}} is ready."
`
      },
      {
        path: "docs/architecture.md",
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`
      },
      { path: "config/.gitkeep", content: "" },
      { path: "notebooks/.gitkeep", content: "" },
      { path: "scripts/.gitkeep", content: "" }
    ]
  },
  {
    id: "go",
    aliases: ["golang"],
    label: "Go",
    language: "go",
    description: "Go module layout with cmd entrypoint, internal app code, reusable pkg space, configs, and docs.",
    structure: `{{PROJECT_SLUG}}/
+-- cmd/
|   +-- {{PROJECT_SLUG}}/
|       +-- main.go
+-- internal/
|   +-- app/
|       +-- app.go
|       +-- app_test.go
+-- pkg/
+-- api/
+-- configs/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- go.mod`,
    directories: ["api", "cmd/{{PROJECT_SLUG}}", "configs", "docs", "internal/app", "pkg", "scripts"],
    files: [
      {
        path: "go.mod",
        content: `module {{PROJECT_SLUG}}

go 1.22
`
      },
      {
        path: "cmd/{{PROJECT_SLUG}}/main.go",
        content: `package main

import (
	"fmt"

	"{{PROJECT_SLUG}}/internal/app"
)

func main() {
	fmt.Println(app.Message())
}
`
      },
      {
        path: "internal/app/app.go",
        content: `package app

func Message() string {
	return "{{PROJECT_SLUG}} is ready."
}
`
      },
      {
        path: "internal/app/app_test.go",
        content: `package app

import "testing"

func TestMessage(t *testing.T) {
	if got := Message(); got != "{{PROJECT_SLUG}} is ready." {
		t.Fatalf("Message() = %q", got)
	}
}
`
      },
      {
        path: "docs/architecture.md",
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`
      },
      { path: "api/.gitkeep", content: "" },
      { path: "configs/.gitkeep", content: "" },
      { path: "pkg/.gitkeep", content: "" },
      { path: "scripts/.gitkeep", content: "" }
    ]
  },
  {
    id: "rust",
    aliases: ["rs", "cargo"],
    label: "Rust",
    language: "rust",
    description: "Cargo-ready Rust layout with library, binary entrypoint, integration tests, examples, benches, and docs.",
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- lib.rs
|   +-- main.rs
+-- tests/
|   +-- smoke.rs
+-- benches/
+-- crates/
+-- docs/
|   +-- architecture.md
+-- examples/
+-- Cargo.toml`,
    directories: ["benches", "crates", "docs", "examples", "src", "tests"],
    files: [
      {
        path: "Cargo.toml",
        content: `[package]
name = "{{PROJECT_MODULE}}"
version = "0.1.0"
edition = "2021"

[dependencies]
`
      },
      {
        path: "src/lib.rs",
        content: `pub fn message() -> &'static str {
    "{{PROJECT_SLUG}} is ready."
}
`
      },
      {
        path: "src/main.rs",
        content: `fn main() {
    println!("{}", {{PROJECT_MODULE}}::message());
}
`
      },
      {
        path: "tests/smoke.rs",
        content: `#[test]
fn message_is_ready() {
    assert_eq!({{PROJECT_MODULE}}::message(), "{{PROJECT_SLUG}} is ready.");
}
`
      },
      {
        path: "docs/architecture.md",
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`
      },
      { path: "benches/.gitkeep", content: "" },
      { path: "crates/.gitkeep", content: "" },
      { path: "examples/.gitkeep", content: "" }
    ]
  },
  {
    id: "csharp",
    aliases: ["c", "c#", "cs", "dotnet", "net"],
    label: "C# / .NET",
    language: "csharp",
    description: "Modern .NET layout with source project, test project space, shared build props, config, scripts, and docs.",
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- {{PROJECT_PASCAL}}/
|       +-- {{PROJECT_PASCAL}}.csproj
|       +-- Program.cs
+-- tests/
|   +-- {{PROJECT_PASCAL}}.Tests/
|       +-- {{PROJECT_PASCAL}}.Tests.csproj
|       +-- SmokeTests.cs
+-- config/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- Directory.Build.props`,
    directories: [
      "config",
      "docs",
      "scripts",
      "src/{{PROJECT_PASCAL}}",
      "tests/{{PROJECT_PASCAL}}.Tests"
    ],
    files: [
      {
        path: "Directory.Build.props",
        content: `<Project>
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
`
      },
      {
        path: "src/{{PROJECT_PASCAL}}/{{PROJECT_PASCAL}}.csproj",
        content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
  </PropertyGroup>
</Project>
`
      },
      {
        path: "src/{{PROJECT_PASCAL}}/Program.cs",
        content: `namespace {{PROJECT_PASCAL}};

public static class Program
{
    public static string Message() => "{{PROJECT_SLUG}} is ready.";

    public static void Main()
    {
        Console.WriteLine(Message());
    }
}
`
      },
      {
        path: "tests/{{PROJECT_PASCAL}}.Tests/{{PROJECT_PASCAL}}.Tests.csproj",
        content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="../../src/{{PROJECT_PASCAL}}/{{PROJECT_PASCAL}}.csproj" />
  </ItemGroup>
</Project>
`
      },
      {
        path: "tests/{{PROJECT_PASCAL}}.Tests/SmokeTests.cs",
        content: `using {{PROJECT_PASCAL}};

namespace {{PROJECT_PASCAL}}.Tests;

public static class SmokeTests
{
    public static void MessageIsReady()
    {
        if (Program.Message() != "{{PROJECT_SLUG}} is ready.")
        {
            throw new InvalidOperationException("Unexpected ready message.");
        }
    }
}
`
      },
      {
        path: "docs/architecture.md",
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`
      },
      { path: "config/.gitkeep", content: "" },
      { path: "scripts/.gitkeep", content: "" }
    ]
  }
];
function resolveLanguagePreset(value = DEFAULT_LANGUAGE_PRESET_ID) {
  const normalized = toKebabCase(value || DEFAULT_LANGUAGE_PRESET_ID);
  return LANGUAGE_PRESETS.find((preset) => {
    return preset.id === normalized || preset.aliases.includes(normalized);
  });
}
function formatLanguagePresetList() {
  return LANGUAGE_PRESETS.map((preset) => {
    const aliases = preset.aliases.length > 0 ? ` (${preset.aliases.join(", ")})` : "";
    return `  ${preset.id}${aliases} - ${preset.label}: ${preset.description}`;
  }).join("\n");
}
function renderRelativePath(templatePath, vars) {
  const rendered = applyTemplate(templatePath, vars);
  const normalized = path2.normalize(rendered);
  if (path2.isAbsolute(normalized) || normalized === ".." || normalized.startsWith(`..${path2.sep}`)) {
    throw new Error(`Unsafe preset path: ${templatePath}`);
  }
  return normalized;
}
async function applyLanguagePreset({ targetDir, vars, preset }) {
  for (const directory of preset.directories) {
    const relativePath = renderRelativePath(directory, vars);
    await fs2.mkdir(path2.join(targetDir, relativePath), { recursive: true });
  }
  for (const file of preset.files) {
    const relativePath = renderRelativePath(file.path, vars);
    const filePath = path2.join(targetDir, relativePath);
    await fs2.mkdir(path2.dirname(filePath), { recursive: true });
    await fs2.writeFile(filePath, applyTemplate(file.content, vars), "utf8");
  }
}

// src/create.js
import { readFileSync } from "node:fs";
import { fileURLToPath as fileURLToPath2 } from "node:url";
function getPackageVersion() {
  const pkgPath = fileURLToPath2(new URL("../package.json", import.meta.url));
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}
function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    projectName: void 0,
    description: void 0,
    language: DEFAULT_LANGUAGE_PRESET_ID,
    yes: false,
    git: true,
    help: false,
    listLanguages: false
  };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--yes" || arg === "-y") {
      options.yes = true;
    } else if (arg === "--no-git") {
      options.git = false;
    } else if (arg === "--language" || arg === "-l" || arg === "--template" || arg === "-t") {
      options.language = args[++i];
    } else if (arg === "--list-languages" || arg === "--list-templates") {
      options.listLanguages = true;
    } else if (arg === "--description" || arg === "-d") {
      options.description = args[++i];
    } else if (!arg.startsWith("-") && !options.projectName) {
      options.projectName = arg;
    }
  }
  return options;
}
function printCreateHelp() {
  console.log(`
${BRAND_NAME} \u2014 ${TAGLINE}

Usage:
  npm create igivafuk@latest <project-name>
  npx create-igivafuk <project-name> [options]

Options:
  -d, --description <text>  Project description
  -l, --language <preset>   Setup preset: default, javascript, typescript, python, go, rust, csharp
  -y, --yes                 Skip prompts and use defaults
  --no-git                  Skip git init
  --list-languages          Show available setup presets
  -h, --help                Show help

Examples:
  npm create igivafuk@latest my-app
  npx create-igivafuk my-app -d "My awesome SaaS" -y
  npx create-igivafuk api -l go

Learn more: ${WEBSITE_URL}
`);
}
async function runCreate(argv = process.argv) {
  const options = parseArgs(argv);
  if (options.help) {
    printCreateHelp();
    return;
  }
  if (options.listLanguages) {
    console.log(`${BRAND_NAME} setup presets:

${formatLanguagePresetList()}`);
    return;
  }
  Ie(` ${BRAND_NAME} \u2014 you said you didn't give a f***, turns out you do`);
  let projectName = options.projectName;
  let description = options.description ?? "";
  let language = options.language;
  let initGitRepo = options.git;
  if (!options.yes) {
    if (!projectName) {
      const nameResult = await he({
        message: "Project name",
        placeholder: "my-awesome-app",
        validate: (value) => {
          if (!value?.trim()) return "Project name is required";
          if (!toKebabCase(value)) return "Use letters and numbers only";
        }
      });
      if (pD(nameResult)) {
        xe("Cancelled.");
        process.exit(0);
      }
      projectName = nameResult;
    }
    const descResult = await he({
      message: "One-line description",
      placeholder: "A structured project built with AI agents",
      initialValue: description
    });
    if (pD(descResult)) {
      xe("Cancelled.");
      process.exit(0);
    }
    description = descResult;
    const initialPreset = resolveLanguagePreset(language) ?? resolveLanguagePreset(DEFAULT_LANGUAGE_PRESET_ID);
    const languageResult = await ve({
      message: "Setup preset",
      initialValue: initialPreset.id,
      options: LANGUAGE_PRESETS.map((preset2) => ({
        value: preset2.id,
        label: preset2.label,
        hint: preset2.description
      }))
    });
    if (pD(languageResult)) {
      xe("Cancelled.");
      process.exit(0);
    }
    language = languageResult;
    const gitResult = await ye({
      message: "Initialize git repository?",
      initialValue: initGitRepo
    });
    if (pD(gitResult)) {
      xe("Cancelled.");
      process.exit(0);
    }
    initGitRepo = gitResult;
  }
  if (!projectName?.trim()) {
    console.error("Error: project name is required.");
    printCreateHelp();
    process.exit(1);
  }
  const preset = resolveLanguagePreset(language);
  if (!preset) {
    console.error(`Error: unknown setup preset "${language}".`);
    console.error(`Available presets:
${formatLanguagePresetList()}`);
    process.exit(1);
  }
  const targetDir = path3.resolve(process.cwd(), projectName);
  if (await pathExists(targetDir)) {
    console.error(`Error: directory "${projectName}" already exists.`);
    process.exit(1);
  }
  const version = getPackageVersion();
  const vars = buildTemplateVars({ projectName, description, version, preset });
  const templateDir = getTemplateDir();
  const s = Y2();
  s.start("Scaffolding structured project...");
  await copyTemplate({ templateDir, targetDir, vars });
  await applyLanguagePreset({ targetDir, vars, preset });
  if (initGitRepo) {
    s.message("Initializing git...");
    await initGit(targetDir);
  }
  s.stop("Project created.");
  Se(`Done! cd ${projectName} and start building something good.

  ${WEBSITE_URL}`);
}

// src/entries/create-main.js
runCreate(process.argv).catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
