// File: socket/sockjs.min.js
var JSON;
JSON || (JSON = {}),
    function() {
        function str(a, b) {
            var c, d, e, f, g, h = gap, i = b[a];
            switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)),
            "function" == typeof rep && (i = rep.call(b, a, i)),
                typeof i) {
                case "string":
                    return quote(i);
                case "number":
                    return isFinite(i) ? String(i) : "null";
                case "boolean":
                case "null":
                    return String(i);
                case "object":
                    if (!i)
                        return "null";
                    if (gap += indent,
                            g = [],
                        "[object Array]" === Object.prototype.toString.apply(i)) {
                        for (f = i.length,
                                 c = 0; f > c; c += 1)
                            g[c] = str(c, i) || "null";
                        return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]",
                            gap = h,
                            e
                    }
                    if (rep && "object" == typeof rep)
                        for (f = rep.length,
                                 c = 0; f > c; c += 1)
                            "string" == typeof rep[c] && (d = rep[c],
                                e = str(d, i),
                            e && g.push(quote(d) + (gap ? ": " : ":") + e));
                    else
                        for (d in i)
                            Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i),
                            e && g.push(quote(d) + (gap ? ": " : ":") + e));
                    return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}",
                        gap = h,
                        e
            }
        }
        function quote(a) {
            return escapable.lastIndex = 0,
                escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                    var b = meta[a];
                    return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
        }
        function f(a) {
            return 10 > a ? "0" + a : a
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(a) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }
                ,
                String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
                    return this.valueOf()
                }
        );
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function(a, b, c) {
                var d;
                if (gap = "",
                        indent = "",
                    "number" == typeof c)
                    for (d = 0; c > d; d += 1)
                        indent += " ";
                else
                    "string" == typeof c && (indent = c);
                if (rep = b,
                    !b || "function" == typeof b || "object" == typeof b && "number" == typeof b.length)
                    return str("", {
                        "": a
                    });
                throw new Error("JSON.stringify")
            }
        ),
        "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
                function walk(a, b) {
                    var c, d, e = a[b];
                    if (e && "object" == typeof e)
                        for (c in e)
                            Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c),
                                void 0 !== d ? e[c] = d : delete e[c]);
                    return reviver.call(a, b, e)
                }
                var j;
                if (text = String(text),
                        cx.lastIndex = 0,
                    cx.test(text) && (text = text.replace(cx, function(a) {
                        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    })),
                        /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                    return j = eval("(" + text + ")"),
                        "function" == typeof reviver ? walk({
                            "": j
                        }, "") : j;
                throw new SyntaxError("JSON.parse")
            }
        )
    }(),
    SockJS = function() {
        var a = document
            , b = window
            , c = {}
            , d = function() {};
        d.prototype.addEventListener = function(a, b) {
            this._listeners || (this._listeners = {}),
            a in this._listeners || (this._listeners[a] = []);
            var d = this._listeners[a];
            -1 === c.arrIndexOf(d, b) && d.push(b)
        }
            ,
            d.prototype.removeEventListener = function(a, b) {
                if (this._listeners && a in this._listeners) {
                    var d = this._listeners[a]
                        , e = c.arrIndexOf(d, b);
                    return -1 !== e ? void (d.length > 1 ? this._listeners[a] = d.slice(0, e).concat(d.slice(e + 1)) : delete this._listeners[a]) : void 0
                }
            }
            ,
            d.prototype.dispatchEvent = function(a) {
                var b = a.type
                    , c = Array.prototype.slice.call(arguments, 0);
                if (this["on" + b] && this["on" + b].apply(this, c),
                    this._listeners && b in this._listeners)
                    for (var d = 0; d < this._listeners[b].length; d++)
                        this._listeners[b][d].apply(this, c)
            }
        ;
        var e = function(a, b) {
            if (this.type = a,
                "undefined" != typeof b)
                for (var c in b)
                    b.hasOwnProperty(c) && (this[c] = b[c])
        };
        e.prototype.toString = function() {
            var a = [];
            for (var b in this)
                if (this.hasOwnProperty(b)) {
                    var c = this[b];
                    "function" == typeof c && (c = "[function]"),
                        a.push(b + "=" + c)
                }
            return "SimpleEvent(" + a.join(", ") + ")"
        }
        ;
        var f = function(a) {
            var b = this;
            b._events = a || [],
                b._listeners = {}
        };
        f.prototype.emit = function(a) {
            var b = this;
            if (b._verifyType(a),
                    !b._nuked) {
                var c = Array.prototype.slice.call(arguments, 1);
                if (b["on" + a] && b["on" + a].apply(b, c),
                    a in b._listeners)
                    for (var d = 0; d < b._listeners[a].length; d++)
                        b._listeners[a][d].apply(b, c)
            }
        }
            ,
            f.prototype.on = function(a, b) {
                var c = this;
                c._verifyType(a),
                c._nuked || (a in c._listeners || (c._listeners[a] = []),
                    c._listeners[a].push(b))
            }
            ,
            f.prototype._verifyType = function(a) {
                var b = this;
                -1 === c.arrIndexOf(b._events, a) && c.log("Event " + JSON.stringify(a) + " not listed " + JSON.stringify(b._events) + " in " + b)
            }
            ,
            f.prototype.nuke = function() {
                var a = this;
                a._nuked = !0;
                for (var b = 0; b < a._events.length; b++)
                    delete a[a._events[b]];
                a._listeners = {}
            }
        ;
        var g = "abcdefghijklmnopqrstuvwxyz0123456789_";
        c.random_string = function(a, b) {
            b = b || g.length;
            var c, d = [];
            for (c = 0; a > c; c++)
                d.push(g.substr(Math.floor(Math.random() * b), 1));
            return d.join("")
        }
            ,
            c.random_number = function(a) {
                return Math.floor(Math.random() * a)
            }
            ,
            c.random_number_string = function(a) {
                var b = ("" + (a - 1)).length
                    , d = Array(b + 1).join("0");
                return (d + c.random_number(a)).slice(-b)
            }
            ,
            c.getOrigin = function(a) {
                a += "/";
                var b = a.split("/").slice(0, 3);
                return b.join("/")
            }
            ,
            c.isSameOriginUrl = function(a, c) {
                return c || (c = b.location.href),
                a.split("/").slice(0, 3).join("/") === c.split("/").slice(0, 3).join("/")
            }
            ,
            c.getParentDomain = function(a) {
                if (/^[0-9.]*$/.test(a))
                    return a;
                if (/^\[/.test(a))
                    return a;
                if (!/[.]/.test(a))
                    return a;
                var b = a.split(".").slice(1);
                return b.join(".")
            }
            ,
            c.objectExtend = function(a, b) {
                for (var c in b)
                    b.hasOwnProperty(c) && (a[c] = b[c]);
                return a
            }
        ;
        var h = "_jp";
        c.polluteGlobalNamespace = function() {
            h in b || (b[h] = {})
        }
            ,
            c.closeFrame = function(a, b) {
                return "c" + JSON.stringify([a, b])
            }
            ,
            c.userSetCode = function(a) {
                return 1e3 === a || a >= 3e3 && 4999 >= a
            }
            ,
            c.countRTO = function(a) {
                var b;
                return b = a > 100 ? 3 * a : a + 200
            }
            ,
            c.log = function() {
                b.console && console.log && console.log.apply && console.log.apply(console, arguments)
            }
            ,
            c.bind = function(a, b) {
                return a.bind ? a.bind(b) : function() {
                    return a.apply(b, arguments)
                }
            }
            ,
            c.flatUrl = function(a) {
                return -1 === a.indexOf("?") && -1 === a.indexOf("#")
            }
            ,
            c.amendUrl = function(b) {
                var d = a.location;
                if (!b)
                    throw new Error("Wrong url for SockJS");
                if (!c.flatUrl(b))
                    throw new Error("Only basic urls are supported in SockJS");
                return 0 === b.indexOf("//") && (b = d.protocol + b),
                0 === b.indexOf("/") && (b = d.protocol + "//" + d.host + b),
                    b = b.replace(/[\/]+$/, "")
            }
            ,
            c.arrIndexOf = function(a, b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b)
                        return c;
                return -1
            }
            ,
            c.arrSkip = function(a, b) {
                var d = c.arrIndexOf(a, b);
                if (-1 === d)
                    return a.slice();
                var e = a.slice(0, d);
                return e.concat(a.slice(d + 1))
            }
            ,
            c.isArray = Array.isArray || function(a) {
                return {}.toString.call(a).indexOf("Array") >= 0
            }
            ,
            c.delay = function(a, b) {
                return "function" == typeof a && (b = a,
                    a = 0),
                    setTimeout(b, a)
            }
        ;
        var i, j = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, k = {
            "\x00": "\\u0000",
            "": "\\u0001",
            "": "\\u0002",
            "": "\\u0003",
            "": "\\u0004",
            "": "\\u0005",
            "": "\\u0006",
            "": "\\u0007",
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\x0B": "\\u000b",
            "\f": "\\f",
            "\r": "\\r",
            "": "\\u000e",
            "": "\\u000f",
            "": "\\u0010",
            "": "\\u0011",
            "": "\\u0012",
            "": "\\u0013",
            "": "\\u0014",
            "": "\\u0015",
            "": "\\u0016",
            "": "\\u0017",
            "": "\\u0018",
            "": "\\u0019",
            "": "\\u001a",
            "": "\\u001b",
            "": "\\u001c",
            "": "\\u001d",
            "": "\\u001e",
            "": "\\u001f",
            '"': '\\"',
            "\\": "\\\\",
            "": "\\u007f",
            "": "\\u0080",
            "": "\\u0081",
            "": "\\u0082",
            "": "\\u0083",
            "": "\\u0084",
            "": "\\u0085",
            "": "\\u0086",
            "": "\\u0087",
            "": "\\u0088",
            "": "\\u0089",
            "": "\\u008a",
            "": "\\u008b",
            "": "\\u008c",
            "": "\\u008d",
            "": "\\u008e",
            "": "\\u008f",
            "": "\\u0090",
            "": "\\u0091",
            "": "\\u0092",
            "": "\\u0093",
            "": "\\u0094",
            "": "\\u0095",
            "": "\\u0096",
            "": "\\u0097",
            "": "\\u0098",
            "": "\\u0099",
            "": "\\u009a",
            "": "\\u009b",
            "": "\\u009c",
            "": "\\u009d",
            "": "\\u009e",
            "": "\\u009f",
            "­": "\\u00ad",
            "؀": "\\u0600",
            "؁": "\\u0601",
            "؂": "\\u0602",
            "؃": "\\u0603",
            "؄": "\\u0604",
            "܏": "\\u070f",
            "឴": "\\u17b4",
            "឵": "\\u17b5",
            "‌": "\\u200c",
            "‍": "\\u200d",
            "‎": "\\u200e",
            "‏": "\\u200f",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029",
            "‪": "\\u202a",
            "‫": "\\u202b",
            "‬": "\\u202c",
            "‭": "\\u202d",
            "‮": "\\u202e",
            " ": "\\u202f",
            "⁠": "\\u2060",
            "⁡": "\\u2061",
            "⁢": "\\u2062",
            "⁣": "\\u2063",
            "⁤": "\\u2064",
            "⁥": "\\u2065",
            "⁦": "\\u2066",
            "⁧": "\\u2067",
            "⁨": "\\u2068",
            "⁩": "\\u2069",
            "⁪": "\\u206a",
            "⁫": "\\u206b",
            "⁬": "\\u206c",
            "⁭": "\\u206d",
            "⁮": "\\u206e",
            "⁯": "\\u206f",
            "\ufeff": "\\ufeff",
            "￰": "\\ufff0",
            "￱": "\\ufff1",
            "￲": "\\ufff2",
            "￳": "\\ufff3",
            "￴": "\\ufff4",
            "￵": "\\ufff5",
            "￶": "\\ufff6",
            "￷": "\\ufff7",
            "￸": "\\ufff8",
            "￹": "\\ufff9",
            "￺": "\\ufffa",
            "￻": "\\ufffb",
            "￼": "\\ufffc",
            "�": "\\ufffd",
            "￾": "\\ufffe",
            "￿": "\\uffff"
        }, l = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, m = JSON && JSON.stringify || function(a) {
            return j.lastIndex = 0,
            j.test(a) && (a = a.replace(j, function(a) {
                return k[a]
            })),
            '"' + a + '"'
        }
            , n = function(a) {
            var b, c = {}, d = [];
            for (b = 0; 65536 > b; b++)
                d.push(String.fromCharCode(b));
            return a.lastIndex = 0,
                d.join("").replace(a, function(a) {
                    return c[a] = "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4),
                        ""
                }),
                a.lastIndex = 0,
                c
        };
        c.quote = function(a) {
            var b = m(a);
            return l.lastIndex = 0,
                l.test(b) ? (i || (i = n(l)),
                    b.replace(l, function(a) {
                        return i[a]
                    })) : b
        }
        ;
        var o = ["websocket", "xdr-streaming", "xhr-streaming", "iframe-eventsource", "iframe-htmlfile", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"];
        c.probeProtocols = function() {
            for (var a = {}, b = 0; b < o.length; b++) {
                var c = o[b];
                a[c] = y[c] && y[c].enabled()
            }
            return a
        }
            ,
            c.detectProtocols = function(a, b, c) {
                var d = {}
                    , e = [];
                b || (b = o);
                for (var f = 0; f < b.length; f++) {
                    var g = b[f];
                    d[g] = a[g]
                }
                var h = function(a) {
                    var b = a.shift();
                    d[b] ? e.push(b) : a.length > 0 && h(a)
                };
                return c.websocket !== !1 && h(["websocket"]),
                    d["xhr-streaming"] && !c.null_origin ? e.push("xhr-streaming") : !d["xdr-streaming"] || c.cookie_needed || c.null_origin ? h(["iframe-eventsource", "iframe-htmlfile"]) : e.push("xdr-streaming"),
                    d["xhr-polling"] && !c.null_origin ? e.push("xhr-polling") : !d["xdr-polling"] || c.cookie_needed || c.null_origin ? h(["iframe-xhr-polling", "jsonp-polling"]) : e.push("xdr-polling"),
                    e
            }
        ;
        var p = "_sockjs_global";
        c.createHook = function() {
            var a = "a" + c.random_string(8);
            if (!(p in b)) {
                var d = {};
                b[p] = function(a) {
                    return a in d || (d[a] = {
                        id: a,
                        del: function() {
                            delete d[a]
                        }
                    }),
                        d[a]
                }
            }
            return b[p](a)
        }
            ,
            c.attachMessage = function(a) {
                c.attachEvent("message", a)
            }
            ,
            c.attachEvent = function(c, d) {
                "undefined" != typeof b.addEventListener ? b.addEventListener(c, d, !1) : (a.attachEvent("on" + c, d),
                    b.attachEvent("on" + c, d))
            }
            ,
            c.detachMessage = function(a) {
                c.detachEvent("message", a)
            }
            ,
            c.detachEvent = function(c, d) {
                "undefined" != typeof b.addEventListener ? b.removeEventListener(c, d, !1) : (a.detachEvent("on" + c, d),
                    b.detachEvent("on" + c, d))
            }
        ;
        var q = {}
            , r = !1
            , s = function() {
            for (var a in q)
                q[a](),
                    delete q[a]
        }
            , t = function() {
            r || (r = !0,
                s())
        };
        c.attachEvent("unload", t),
            c.unload_add = function(a) {
                var b = c.random_string(8);
                return q[b] = a,
                r && c.delay(s),
                    b
            }
            ,
            c.unload_del = function(a) {
                a in q && delete q[a]
            }
            ,
            c.createIframe = function(b, d) {
                var e, f, g = a.createElement("iframe"), h = function() {
                    clearTimeout(e);
                    try {
                        g.onload = null
                    } catch (a) {}
                    g.onerror = null
                }, i = function() {
                    g && (h(),
                        setTimeout(function() {
                            g && g.parentNode.removeChild(g),
                                g = null
                        }, 0),
                        c.unload_del(f))
                }, j = function(a) {
                    g && (i(),
                        d(a))
                }, k = function(a, b) {
                    try {
                        g && g.contentWindow && g.contentWindow.postMessage(a, b)
                    } catch (c) {}
                };
                return g.src = b,
                    g.style.display = "none",
                    g.style.position = "absolute",
                    g.onerror = function() {
                        j("onerror")
                    }
                    ,
                    g.onload = function() {
                        clearTimeout(e),
                            e = setTimeout(function() {
                                j("onload timeout")
                            }, 2e3)
                    }
                    ,
                    a.body.appendChild(g),
                    e = setTimeout(function() {
                        j("timeout")
                    }, 15e3),
                    f = c.unload_add(i),
                    {
                        post: k,
                        cleanup: i,
                        loaded: h
                    }
            }
            ,
            c.createHtmlfile = function(a, d) {
                var e, f, g, i = new ActiveXObject("htmlfile"), j = function() {
                    clearTimeout(e)
                }, k = function() {
                    i && (j(),
                        c.unload_del(f),
                        g.parentNode.removeChild(g),
                        g = i = null,
                        CollectGarbage())
                }, l = function(a) {
                    i && (k(),
                        d(a))
                }, m = function(a, b) {
                    try {
                        g && g.contentWindow && g.contentWindow.postMessage(a, b)
                    } catch (c) {}
                };
                i.open(),
                    i.write('<html><script>document.domain="' + document.domain + '";</script></html>'),
                    i.close(),
                    i.parentWindow[h] = b[h];
                var n = i.createElement("div");
                return i.body.appendChild(n),
                    g = i.createElement("iframe"),
                    n.appendChild(g),
                    g.src = a,
                    e = setTimeout(function() {
                        l("timeout")
                    }, 15e3),
                    f = c.unload_add(k),
                    {
                        post: m,
                        cleanup: k,
                        loaded: j
                    }
            }
        ;
        var u = function() {};
        u.prototype = new f(["chunk", "finish"]),
            u.prototype._start = function(a, d, e, f) {
                var g = this;
                try {
                    g.xhr = new XMLHttpRequest
                } catch (h) {}
                if (!g.xhr)
                    try {
                        g.xhr = new b.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (h) {}
                (b.ActiveXObject || b.XDomainRequest) && (d += (-1 === d.indexOf("?") ? "?" : "&") + "t=" + +new Date),
                    g.unload_ref = c.unload_add(function() {
                        g._cleanup(!0)
                    });
                try {
                    g.xhr.open(a, d, !0)
                } catch (i) {
                    return g.emit("finish", 0, ""),
                        void g._cleanup()
                }
                if (f && f.no_credentials || (g.xhr.withCredentials = "true"),
                    f && f.headers)
                    for (var j in f.headers)
                        g.xhr.setRequestHeader(j, f.headers[j]);
                g.xhr.onreadystatechange = function() {
                    if (g.xhr) {
                        var a = g.xhr;
                        switch (a.readyState) {
                            case 3:
                                try {
                                    var b = a.status
                                        , c = a.responseText
                                } catch (a) {}
                                1223 === b && (b = 204),
                                c && c.length > 0 && g.emit("chunk", b, c);
                                break;
                            case 4:
                                var b = a.status;
                                1223 === b && (b = 204),
                                    g.emit("finish", b, a.responseText),
                                    g._cleanup(!1)
                        }
                    }
                }
                    ,
                    g.xhr.send(e)
            }
            ,
            u.prototype._cleanup = function(a) {
                var b = this;
                if (b.xhr) {
                    if (c.unload_del(b.unload_ref),
                            b.xhr.onreadystatechange = function() {}
                            ,
                            a)
                        try {
                            b.xhr.abort()
                        } catch (d) {}
                    b.unload_ref = b.xhr = null
                }
            }
            ,
            u.prototype.close = function() {
                var a = this;
                a.nuke(),
                    a._cleanup(!0)
            }
        ;
        var v = c.XHRCorsObject = function() {
                var a = this
                    , b = arguments;
                c.delay(function() {
                    a._start.apply(a, b)
                })
            }
        ;
        v.prototype = new u;
        var w = c.XHRLocalObject = function(a, b, d) {
                var e = this;
                c.delay(function() {
                    e._start(a, b, d, {
                        no_credentials: !0
                    })
                })
            }
        ;
        w.prototype = new u;
        var x = c.XDRObject = function(a, b, d) {
                var e = this;
                c.delay(function() {
                    e._start(a, b, d)
                })
            }
        ;
        x.prototype = new f(["chunk", "finish"]),
            x.prototype._start = function(a, b, d) {
                var e = this
                    , f = new XDomainRequest;
                b += (-1 === b.indexOf("?") ? "?" : "&") + "t=" + +new Date;
                var g = f.ontimeout = f.onerror = function() {
                        e.emit("finish", 0, ""),
                            e._cleanup(!1)
                    }
                ;
                f.onprogress = function() {
                    e.emit("chunk", 200, f.responseText)
                }
                    ,
                    f.onload = function() {
                        e.emit("finish", 200, f.responseText),
                            e._cleanup(!1)
                    }
                    ,
                    e.xdr = f,
                    e.unload_ref = c.unload_add(function() {
                        e._cleanup(!0)
                    });
                try {
                    e.xdr.open(a, b),
                        e.xdr.send(d)
                } catch (h) {
                    g()
                }
            }
            ,
            x.prototype._cleanup = function(a) {
                var b = this;
                if (b.xdr) {
                    if (c.unload_del(b.unload_ref),
                            b.xdr.ontimeout = b.xdr.onerror = b.xdr.onprogress = b.xdr.onload = null,
                            a)
                        try {
                            b.xdr.abort()
                        } catch (d) {}
                    b.unload_ref = b.xdr = null
                }
            }
            ,
            x.prototype.close = function() {
                var a = this;
                a.nuke(),
                    a._cleanup(!0)
            }
            ,
            c.isXHRCorsCapable = function() {
                return b.XMLHttpRequest && "withCredentials"in new XMLHttpRequest ? 1 : b.XDomainRequest && a.domain ? 2 : L.enabled() ? 3 : 4
            }
        ;
        var y = function(a, d, e) {
            if (this === b)
                return new y(a,d,e);
            var f, g = this;
            g._options = {
                devel: !1,
                debug: !1,
                protocols_whitelist: [],
                info: void 0,
                rtt: void 0
            },
            e && c.objectExtend(g._options, e),
                g._base_url = c.amendUrl(a),
                g._server = g._options.server || c.random_number_string(1e3),
                g._options.protocols_whitelist && g._options.protocols_whitelist.length ? f = g._options.protocols_whitelist : (f = "string" == typeof d && d.length > 0 ? [d] : c.isArray(d) ? d : null,
                f && g._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')),
                g._protocols = [],
                g.protocol = null,
                g.readyState = y.CONNECTING,
                g._ir = S(g._base_url),
                g._ir.onfinish = function(a, b) {
                    g._ir = null,
                        a ? (g._options.info && (a = c.objectExtend(a, g._options.info)),
                        g._options.rtt && (b = g._options.rtt),
                            g._applyInfo(a, b, f),
                            g._didClose()) : g._didClose(1002, "Can't connect to server", !0)
                }
        };
        y.prototype = new d,
            y.version = "--minify",
            y.CONNECTING = 0,
            y.OPEN = 1,
            y.CLOSING = 2,
            y.CLOSED = 3,
            y.prototype._debug = function() {
                this._options.debug && c.log.apply(c, arguments)
            }
            ,
            y.prototype._dispatchOpen = function() {
                var a = this;
                a.readyState === y.CONNECTING ? (a._transport_tref && (clearTimeout(a._transport_tref),
                    a._transport_tref = null),
                    a.readyState = y.OPEN,
                    a.dispatchEvent(new e("open"))) : a._didClose(1006, "Server lost session")
            }
            ,
            y.prototype._dispatchMessage = function(a) {
                var b = this;
                b.readyState === y.OPEN && b.dispatchEvent(new e("message",{
                    data: a
                }))
            }
            ,
            y.prototype._dispatchHeartbeat = function(a) {
                var b = this;
                b.readyState === y.OPEN && b.dispatchEvent(new e("heartbeat",{}))
            }
            ,
            y.prototype._didClose = function(a, b, d) {
                var f = this;
                if (f.readyState !== y.CONNECTING && f.readyState !== y.OPEN && f.readyState !== y.CLOSING)
                    throw new Error("INVALID_STATE_ERR");
                f._ir && (f._ir.nuke(),
                    f._ir = null),
                f._transport && (f._transport.doCleanup(),
                    f._transport = null);
                var g = new e("close",{
                    code: a,
                    reason: b,
                    wasClean: c.userSetCode(a)
                });
                if (!c.userSetCode(a) && f.readyState === y.CONNECTING && !d) {
                    if (f._try_next_protocol(g))
                        return;
                    g = new e("close",{
                        code: 2e3,
                        reason: "All transports failed",
                        wasClean: !1,
                        last_event: g
                    })
                }
                f.readyState = y.CLOSED,
                    c.delay(function() {
                        f.dispatchEvent(g)
                    })
            }
            ,
            y.prototype._didMessage = function(a) {
                var b = this
                    , c = a.slice(0, 1);
                switch (c) {
                    case "o":
                        b._dispatchOpen();
                        break;
                    case "a":
                        for (var d = JSON.parse(a.slice(1) || "[]"), e = 0; e < d.length; e++)
                            b._dispatchMessage(d[e]);
                        break;
                    case "m":
                        var d = JSON.parse(a.slice(1) || "null");
                        b._dispatchMessage(d);
                        break;
                    case "c":
                        var d = JSON.parse(a.slice(1) || "[]");
                        b._didClose(d[0], d[1]);
                        break;
                    case "h":
                        b._dispatchHeartbeat()
                }
            }
            ,
            y.prototype._try_next_protocol = function(b) {
                var d = this;
                for (d.protocol && (d._debug("Closed transport:", d.protocol, "" + b),
                    d.protocol = null),
                     d._transport_tref && (clearTimeout(d._transport_tref),
                         d._transport_tref = null); ; ) {
                    var e = d.protocol = d._protocols.shift();
                    if (!e)
                        return !1;
                    if (y[e] && y[e].need_body === !0 && (!a.body || "undefined" != typeof a.readyState && "complete" !== a.readyState))
                        return d._protocols.unshift(e),
                            d.protocol = "waiting-for-load",
                            c.attachEvent("load", function() {
                                d._try_next_protocol()
                            }),
                            !0;
                    if (y[e] && y[e].enabled(d._options)) {
                        var f = y[e].roundTrips || 1
                            , g = (d._options.rto || 0) * f || 5e3;
                        d._transport_tref = c.delay(g, function() {
                            d.readyState === y.CONNECTING && d._didClose(2007, "Transport timeouted")
                        });
                        var h = c.random_string(8)
                            , i = d._base_url + "/" + d._server + "/" + h;
                        return d._debug("Opening transport:", e, " url:" + i, " RTO:" + d._options.rto),
                            d._transport = new y[e](d,i,d._base_url),
                            !0
                    }
                    d._debug("Skipping transport:", e)
                }
            }
            ,
            y.prototype.close = function(a, b) {
                var d = this;
                if (a && !c.userSetCode(a))
                    throw new Error("INVALID_ACCESS_ERR");
                return d.readyState !== y.CONNECTING && d.readyState !== y.OPEN ? !1 : (d.readyState = y.CLOSING,
                    d._didClose(a || 1e3, b || "Normal closure"),
                    !0)
            }
            ,
            y.prototype.send = function(a) {
                var b = this;
                if (b.readyState === y.CONNECTING)
                    throw new Error("INVALID_STATE_ERR");
                return b.readyState === y.OPEN && b._transport.doSend(c.quote("" + a)),
                    !0
            }
            ,
            y.prototype._applyInfo = function(b, d, e) {
                var f = this;
                f._options.info = b,
                    f._options.rtt = d,
                    f._options.rto = c.countRTO(d),
                    f._options.info.null_origin = !a.domain;
                var g = c.probeProtocols();
                f._protocols = c.detectProtocols(g, e, b)
            }
        ;
        var z = y.websocket = function(a, d) {
                var e = this
                    , f = d + "/websocket";
                f = "https" === f.slice(0, 5) ? "wss" + f.slice(5) : "ws" + f.slice(4),
                    e.ri = a,
                    e.url = f;
                var g = b.WebSocket || b.MozWebSocket;
                e.ws = new g(e.url),
                    e.ws.onmessage = function(a) {
                        e.ri._didMessage(a.data)
                    }
                    ,
                    e.unload_ref = c.unload_add(function() {
                        e.ws.close()
                    }),
                    e.ws.onclose = function() {
                        e.ri._didMessage(c.closeFrame(1006, "WebSocket connection broken"))
                    }
            }
        ;
        z.prototype.doSend = function(a) {
            this.ws.send("[" + a + "]")
        }
            ,
            z.prototype.doCleanup = function() {
                var a = this
                    , b = a.ws;
                b && (b.onmessage = b.onclose = null,
                    b.close(),
                    c.unload_del(a.unload_ref),
                    a.unload_ref = a.ri = a.ws = null)
            }
            ,
            z.enabled = function() {
                return !!b.WebSocket || !!b.MozWebSocket
            }
            ,
            z.roundTrips = 2;
        var A = function() {};
        A.prototype.send_constructor = function(a) {
            var b = this;
            b.send_buffer = [],
                b.sender = a
        }
            ,
            A.prototype.doSend = function(a) {
                var b = this;
                b.send_buffer.push(a),
                b.send_stop || b.send_schedule()
            }
            ,
            A.prototype.send_schedule_wait = function() {
                var a, b = this;
                b.send_stop = function() {
                    b.send_stop = null,
                        clearTimeout(a)
                }
                    ,
                    a = c.delay(25, function() {
                        b.send_stop = null,
                            b.send_schedule()
                    })
            }
            ,
            A.prototype.send_schedule = function() {
                var a = this;
                if (a.send_buffer.length > 0) {
                    var b = "[" + a.send_buffer.join(",") + "]";
                    a.send_stop = a.sender(a.trans_url, b, function(b, c) {
                        a.send_stop = null,
                            b === !1 ? a.ri._didClose(1006, "Sending error " + c) : a.send_schedule_wait()
                    }),
                        a.send_buffer = []
                }
            }
            ,
            A.prototype.send_destructor = function() {
                var a = this;
                a._send_stop && a._send_stop(),
                    a._send_stop = null
            }
        ;
        var B = function(b, d, e) {
                var f = this;
                if (!("_send_form"in f)) {
                    var g = f._send_form = a.createElement("form")
                        , h = f._send_area = a.createElement("textarea");
                    h.name = "d",
                        g.style.display = "none",
                        g.style.position = "absolute",
                        g.method = "POST",
                        g.enctype = "application/x-www-form-urlencoded",
                        g.acceptCharset = "UTF-8",
                        g.appendChild(h),
                        a.body.appendChild(g)
                }
                var g = f._send_form
                    , h = f._send_area
                    , i = "a" + c.random_string(8);
                g.target = i,
                    g.action = b + "/jsonp_send?i=" + i;
                var j;
                try {
                    j = a.createElement('<iframe name="' + i + '">')
                } catch (k) {
                    j = a.createElement("iframe"),
                        j.name = i
                }
                j.id = i,
                    g.appendChild(j),
                    j.style.display = "none";
                try {
                    h.value = d
                } catch (l) {
                    c.log("Your browser is seriously broken. Go home! " + l.message)
                }
                g.submit();
                var m = function(a) {
                    j.onerror && (j.onreadystatechange = j.onerror = j.onload = null,
                        c.delay(500, function() {
                            j.parentNode.removeChild(j),
                                j = null
                        }),
                        h.value = "",
                        e(!0))
                };
                return j.onerror = j.onload = m,
                    j.onreadystatechange = function(a) {
                        "complete" == j.readyState && m()
                    }
                    ,
                    m
            }
            , C = function(a) {
                return function(b, c, d) {
                    var e = new a("POST",b + "/xhr_send",c);
                    return e.onfinish = function(a, b) {
                        d(200 === a || 204 === a, "http status " + a)
                    }
                        ,
                        function(a) {
                            d(!1, a)
                        }
                }
            }
            , D = function(b, d) {
                var e, f, g = a.createElement("script"), h = function(a) {
                    f && (f.parentNode.removeChild(f),
                        f = null),
                    g && (clearTimeout(e),
                        g.parentNode.removeChild(g),
                        g.onreadystatechange = g.onerror = g.onload = g.onclick = null,
                        g = null,
                        d(a),
                        d = null)
                }, i = !1, j = null;
                if (g.id = "a" + c.random_string(8),
                        g.src = b,
                        g.type = "text/javascript",
                        g.charset = "UTF-8",
                        g.onerror = function(a) {
                            j || (j = setTimeout(function() {
                                i || h(c.closeFrame(1006, "JSONP script loaded abnormally (onerror)"))
                            }, 1e3))
                        }
                        ,
                        g.onload = function(a) {
                            h(c.closeFrame(1006, "JSONP script loaded abnormally (onload)"))
                        }
                        ,
                        g.onreadystatechange = function(a) {
                            if (/loaded|closed/.test(g.readyState)) {
                                if (g && g.htmlFor && g.onclick) {
                                    i = !0;
                                    try {
                                        g.onclick()
                                    } catch (b) {}
                                }
                                g && h(c.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"))
                            }
                        }
                        ,
                    "undefined" == typeof g.async && a.attachEvent)
                    if (/opera/i.test(navigator.userAgent))
                        f = a.createElement("script"),
                            f.text = "try{var a = document.getElementById('" + g.id + "'); if(a)a.onerror();}catch(x){};",
                            g.async = f.async = !1;
                    else {
                        try {
                            g.htmlFor = g.id,
                                g.event = "onclick"
                        } catch (k) {}
                        g.async = !0
                    }
                "undefined" != typeof g.async && (g.async = !0),
                    e = setTimeout(function() {
                        h(c.closeFrame(1006, "JSONP script loaded abnormally (timeout)"))
                    }, 35e3);
                var l = a.getElementsByTagName("head")[0];
                return l.insertBefore(g, l.firstChild),
                f && l.insertBefore(f, l.firstChild),
                    h
            }
            , E = y["jsonp-polling"] = function(a, b) {
                c.polluteGlobalNamespace();
                var d = this;
                d.ri = a,
                    d.trans_url = b,
                    d.send_constructor(B),
                    d._schedule_recv()
            }
        ;
        E.prototype = new A,
            E.prototype._schedule_recv = function() {
                var a = this
                    , b = function(b) {
                    a._recv_stop = null,
                    b && (a._is_closing || a.ri._didMessage(b)),
                    a._is_closing || a._schedule_recv()
                };
                a._recv_stop = F(a.trans_url + "/jsonp", D, b)
            }
            ,
            E.enabled = function() {
                return !0
            }
            ,
            E.need_body = !0,
            E.prototype.doCleanup = function() {
                var a = this;
                a._is_closing = !0,
                a._recv_stop && a._recv_stop(),
                    a.ri = a._recv_stop = null,
                    a.send_destructor()
            }
        ;
        var F = function(a, d, e) {
            var f = "a" + c.random_string(6)
                , g = a + "?c=" + escape(h + "." + f)
                , i = 0
                , j = function(a) {
                switch (i) {
                    case 0:
                        delete b[h][f],
                            e(a);
                        break;
                    case 1:
                        e(a),
                            i = 2;
                        break;
                    case 2:
                        delete b[h][f]
                }
            }
                , k = d(g, j);
            b[h][f] = k;
            var l = function() {
                b[h][f] && (i = 1,
                    b[h][f](c.closeFrame(1e3, "JSONP user aborted read")))
            };
            return l
        }
            , G = function() {};
        G.prototype = new A,
            G.prototype.run = function(a, b, c, d, e) {
                var f = this;
                f.ri = a,
                    f.trans_url = b,
                    f.send_constructor(C(e)),
                    f.poll = new $(a,d,b + c,e)
            }
            ,
            G.prototype.doCleanup = function() {
                var a = this;
                a.poll && (a.poll.abort(),
                    a.poll = null)
            }
        ;
        var H = y["xhr-streaming"] = function(a, b) {
                this.run(a, b, "/xhr_streaming", da, c.XHRCorsObject)
            }
        ;
        H.prototype = new G,
            H.enabled = function() {
                return b.XMLHttpRequest && "withCredentials"in new XMLHttpRequest && !/opera/i.test(navigator.userAgent)
            }
            ,
            H.roundTrips = 2,
            H.need_body = !0;
        var I = y["xdr-streaming"] = function(a, b) {
                this.run(a, b, "/xhr_streaming", da, c.XDRObject)
            }
        ;
        I.prototype = new G,
            I.enabled = function() {
                return !!b.XDomainRequest
            }
            ,
            I.roundTrips = 2;
        var J = y["xhr-polling"] = function(a, b) {
                this.run(a, b, "/xhr", da, c.XHRCorsObject)
            }
        ;
        J.prototype = new G,
            J.enabled = H.enabled,
            J.roundTrips = 2;
        var K = y["xdr-polling"] = function(a, b) {
                this.run(a, b, "/xhr", da, c.XDRObject)
            }
        ;
        K.prototype = new G,
            K.enabled = I.enabled,
            K.roundTrips = 2;
        var L = function() {};
        L.prototype.i_constructor = function(a, b, d) {
            var e = this;
            e.ri = a,
                e.origin = c.getOrigin(d),
                e.base_url = d,
                e.trans_url = b;
            var f = d + "/iframe.html";
            e.ri._options.devel && (f += "?t=" + +new Date),
                e.window_id = c.random_string(8),
                f += "#" + e.window_id,
                e.iframeObj = c.createIframe(f, function(a) {
                    e.ri._didClose(1006, "Unable to load an iframe (" + a + ")")
                }),
                e.onmessage_cb = c.bind(e.onmessage, e),
                c.attachMessage(e.onmessage_cb)
        }
            ,
            L.prototype.doCleanup = function() {
                var a = this;
                if (a.iframeObj) {
                    c.detachMessage(a.onmessage_cb);
                    try {
                        a.iframeObj.iframe.contentWindow && a.postMessage("c")
                    } catch (b) {}
                    a.iframeObj.cleanup(),
                        a.iframeObj = null,
                        a.onmessage_cb = a.iframeObj = null
                }
            }
            ,
            L.prototype.onmessage = function(a) {
                var b = this;
                if (a.origin === b.origin) {
                    var c = a.data.slice(0, 8)
                        , d = a.data.slice(8, 9)
                        , e = a.data.slice(9);
                    if (c === b.window_id)
                        switch (d) {
                            case "s":
                                b.iframeObj.loaded(),
                                    b.postMessage("s", JSON.stringify([y.version, b.protocol, b.trans_url, b.base_url]));
                                break;
                            case "t":
                                b.ri._didMessage(e)
                        }
                }
            }
            ,
            L.prototype.postMessage = function(a, b) {
                var c = this;
                c.iframeObj.post(c.window_id + a + (b || ""), c.origin)
            }
            ,
            L.prototype.doSend = function(a) {
                this.postMessage("m", a)
            }
            ,
            L.enabled = function() {
                var a = navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("Konqueror");
                return ("function" == typeof b.postMessage || "object" == typeof b.postMessage) && !a
            }
        ;
        var M, N = function(a, d) {
            parent !== b ? parent.postMessage(M + a + (d || ""), "*") : c.log("Can't postMessage, no parent window.", a, d)
        }, O = function() {};
        O.prototype._didClose = function(a, b) {
            N("t", c.closeFrame(a, b))
        }
            ,
            O.prototype._didMessage = function(a) {
                N("t", a)
            }
            ,
            O.prototype._doSend = function(a) {
                this._transport.doSend(a)
            }
            ,
            O.prototype._doCleanup = function() {
                this._transport.doCleanup()
            }
            ,
            c.parent_origin = void 0,
            y.bootstrap_iframe = function() {
                var d;
                M = a.location.hash.slice(1);
                var e = function(a) {
                    if (a.source === parent && ("undefined" == typeof c.parent_origin && (c.parent_origin = a.origin),
                        a.origin === c.parent_origin)) {
                        var e = a.data.slice(0, 8)
                            , f = a.data.slice(8, 9)
                            , g = a.data.slice(9);
                        if (e === M)
                            switch (f) {
                                case "s":
                                    var h = JSON.parse(g)
                                        , i = h[0]
                                        , j = h[1]
                                        , k = h[2]
                                        , l = h[3];
                                    if (i !== y.version && c.log('Incompatibile SockJS! Main site uses: "' + i + '", the iframe: "' + y.version + '".'),
                                        !c.flatUrl(k) || !c.flatUrl(l))
                                        return void c.log("Only basic urls are supported in SockJS");
                                    if (!c.isSameOriginUrl(k) || !c.isSameOriginUrl(l))
                                        return void c.log("Can't connect to different domain from within an iframe. (" + JSON.stringify([b.location.href, k, l]) + ")");
                                    d = new O,
                                        d._transport = new O[j](d,k,l);
                                    break;
                                case "m":
                                    d._doSend(g);
                                    break;
                                case "c":
                                    d && d._doCleanup(),
                                        d = null
                            }
                    }
                };
                c.attachMessage(e),
                    N("s")
            }
        ;
        var P = function(a, b) {
            var d = this;
            c.delay(function() {
                d.doXhr(a, b)
            })
        };
        P.prototype = new f(["finish"]),
            P.prototype.doXhr = function(a, b) {
                var d = this
                    , e = (new Date).getTime()
                    , f = new b("GET",a + "/info")
                    , g = c.delay(8e3, function() {
                    f.ontimeout()
                });
                f.onfinish = function(a, b) {
                    if (clearTimeout(g),
                            g = null,
                        200 === a) {
                        var c = (new Date).getTime() - e
                            , f = JSON.parse(b);
                        "object" != typeof f && (f = {}),
                            d.emit("finish", f, c)
                    } else
                        d.emit("finish")
                }
                    ,
                    f.ontimeout = function() {
                        f.close(),
                            d.emit("finish")
                    }
            }
        ;
        var Q = function(b) {
            var d = this
                , e = function() {
                var a = new L;
                a.protocol = "w-iframe-info-receiver";
                var c = function(b) {
                    if ("string" == typeof b && "m" === b.substr(0, 1)) {
                        var c = JSON.parse(b.substr(1))
                            , e = c[0]
                            , f = c[1];
                        d.emit("finish", e, f)
                    } else
                        d.emit("finish");
                    a.doCleanup(),
                        a = null
                }
                    , e = {
                    _options: {},
                    _didClose: c,
                    _didMessage: c
                };
                a.i_constructor(e, b, b)
            };
            a.body ? e() : c.attachEvent("load", e)
        };
        Q.prototype = new f(["finish"]);
        var R = function() {
            var a = this;
            c.delay(function() {
                a.emit("finish", {}, 2e3)
            })
        };
        R.prototype = new f(["finish"]);
        var S = function(a) {
                if (c.isSameOriginUrl(a))
                    return new P(a,c.XHRLocalObject);
                switch (c.isXHRCorsCapable()) {
                    case 1:
                        return new P(a,c.XHRLocalObject);
                    case 2:
                        return new P(a,c.XDRObject);
                    case 3:
                        return new Q(a);
                    default:
                        return new R
                }
            }
            , T = O["w-iframe-info-receiver"] = function(a, b, d) {
                var e = new P(d,c.XHRLocalObject);
                e.onfinish = function(b, c) {
                    a._didMessage("m" + JSON.stringify([b, c])),
                        a._didClose()
                }
            }
        ;
        T.prototype.doCleanup = function() {}
        ;
        var U = y["iframe-eventsource"] = function() {
                var a = this;
                a.protocol = "w-iframe-eventsource",
                    a.i_constructor.apply(a, arguments)
            }
        ;
        U.prototype = new L,
            U.enabled = function() {
                return "EventSource"in b && L.enabled()
            }
            ,
            U.need_body = !0,
            U.roundTrips = 3;
        var V = O["w-iframe-eventsource"] = function(a, b) {
                this.run(a, b, "/eventsource", _, c.XHRLocalObject)
            }
        ;
        V.prototype = new G;
        var W = y["iframe-xhr-polling"] = function() {
                var a = this;
                a.protocol = "w-iframe-xhr-polling",
                    a.i_constructor.apply(a, arguments)
            }
        ;
        W.prototype = new L,
            W.enabled = function() {
                return b.XMLHttpRequest && L.enabled()
            }
            ,
            W.need_body = !0,
            W.roundTrips = 3;
        var X = O["w-iframe-xhr-polling"] = function(a, b) {
                this.run(a, b, "/xhr", da, c.XHRLocalObject)
            }
        ;
        X.prototype = new G;
        var Y = y["iframe-htmlfile"] = function() {
                var a = this;
                a.protocol = "w-iframe-htmlfile",
                    a.i_constructor.apply(a, arguments)
            }
        ;
        Y.prototype = new L,
            Y.enabled = function() {
                return L.enabled()
            }
            ,
            Y.need_body = !0,
            Y.roundTrips = 3;
        var Z = O["w-iframe-htmlfile"] = function(a, b) {
                this.run(a, b, "/htmlfile", ca, c.XHRLocalObject)
            }
        ;
        Z.prototype = new G;
        var $ = function(a, b, c, d) {
            var e = this;
            e.ri = a,
                e.Receiver = b,
                e.recv_url = c,
                e.AjaxObject = d,
                e._scheduleRecv()
        };
        $.prototype._scheduleRecv = function() {
            var a = this
                , b = a.poll = new a.Receiver(a.recv_url,a.AjaxObject)
                , c = 0;
            b.onmessage = function(b) {
                c += 1,
                    a.ri._didMessage(b.data)
            }
                ,
                b.onclose = function(c) {
                    a.poll = b = b.onmessage = b.onclose = null,
                    a.poll_is_closing || ("permanent" === c.reason ? a.ri._didClose(1006, "Polling error (" + c.reason + ")") : a._scheduleRecv())
                }
        }
            ,
            $.prototype.abort = function() {
                var a = this;
                a.poll_is_closing = !0,
                a.poll && a.poll.abort()
            }
        ;
        var _ = function(a) {
            var b = this
                , d = new EventSource(a);
            d.onmessage = function(a) {
                b.dispatchEvent(new e("message",{
                    data: unescape(a.data)
                }))
            }
                ,
                b.es_close = d.onerror = function(a, f) {
                    var g = f ? "user" : 2 !== d.readyState ? "network" : "permanent";
                    b.es_close = d.onmessage = d.onerror = null,
                        d.close(),
                        d = null,
                        c.delay(200, function() {
                            b.dispatchEvent(new e("close",{
                                reason: g
                            }))
                        })
                }
        };
        _.prototype = new d,
            _.prototype.abort = function() {
                var a = this;
                a.es_close && a.es_close({}, !0)
            }
        ;
        var aa, ba = function() {
            if (void 0 === aa)
                if ("ActiveXObject"in b)
                    try {
                        aa = !!new ActiveXObject("htmlfile")
                    } catch (a) {}
                else
                    aa = !1;
            return aa
        }, ca = function(a) {
            var d = this;
            c.polluteGlobalNamespace(),
                d.id = "a" + c.random_string(6, 26),
                a += (-1 === a.indexOf("?") ? "?" : "&") + "c=" + escape(h + "." + d.id);
            var f, g = ba() ? c.createHtmlfile : c.createIframe;
            b[h][d.id] = {
                start: function() {
                    f.loaded()
                },
                message: function(a) {
                    d.dispatchEvent(new e("message",{
                        data: a
                    }))
                },
                stop: function() {
                    d.iframe_close({}, "network")
                }
            },
                d.iframe_close = function(a, c) {
                    f.cleanup(),
                        d.iframe_close = f = null,
                        delete b[h][d.id],
                        d.dispatchEvent(new e("close",{
                            reason: c
                        }))
                }
                ,
                f = g(a, function(a) {
                    d.iframe_close({}, "permanent")
                })
        };
        ca.prototype = new d,
            ca.prototype.abort = function() {
                var a = this;
                a.iframe_close && a.iframe_close({}, "user")
            }
        ;
        var da = function(a, b) {
            var c = this
                , d = 0;
            c.xo = new b("POST",a,null),
                c.xo.onchunk = function(a, b) {
                    if (200 === a)
                        for (; ; ) {
                            var f = b.slice(d)
                                , g = f.indexOf("\n");
                            if (-1 === g)
                                break;
                            d += g + 1;
                            var h = f.slice(0, g);
                            c.dispatchEvent(new e("message",{
                                data: h
                            }))
                        }
                }
                ,
                c.xo.onfinish = function(a, b) {
                    c.xo.onchunk(a, b),
                        c.xo = null;
                    var d = 200 === a ? "network" : "permanent";
                    c.dispatchEvent(new e("close",{
                        reason: d
                    }))
                }
        };
        return da.prototype = new d,
            da.prototype.abort = function() {
                var a = this;
                a.xo && (a.xo.close(),
                    a.dispatchEvent(new e("close",{
                        reason: "user"
                    })),
                    a.xo = null)
            }
            ,
            y.getUtils = function() {
                return c
            }
            ,
            y.getIframeTransport = function() {
                return L
            }
            ,
            y
    }(),
"_sockjs_onload"in window && setTimeout(_sockjs_onload, 1),
"function" == typeof define && define.amd && define("sockjs", [], function() {
    return SockJS
});
// File: socket/fxindex.js
window.location.href.indexOf("waihuibbs") > -1 && (window.location = "http://cn.investing.com"),
    $(function() {
        function a(a) {
            return a > 9 ? a : "0" + a
        }
        function b(b, c) {
            var d = new Date(1e3 * (b + c));
            return a(d.getUTCHours()) + ":" + a(d.getUTCMinutes()) + ":" + a(d.getUTCSeconds())
        }
        function c(a) {
            $(this).removeClass("passedTime"),
                $(this).unbind("hover", c)
        }
        function d(a, b) {
            var c = $("#eventRowId_" + a)
                , d = c.find("#eventPrevious_" + a);
            if ("string" == typeof b && b.length) {
                c.addClass("revised");
                var e = d.html() || "";
                d.data("prevHtml", e).removeClass("blackFont").addClass(-1 === (e || "").indexOf("-") ? "greenFont" : "redFont").html('<span title="' + b + '">' + e + "</span>")
            } else
                c.hasClass("revised") && (c.removeClass("revised"),
                    d.removeClass("greenFont redFont").addClass("blackFont").html(d.data("prevHtml")))
        }
        $(window).on("socketMessage", function(a, c) {
            var d = $(".pid-" + c.pid + "-bid").html(c.bid)
                , e = $(".pid-" + c.pid + "-ask").html(c.ask)
                , f = $(".pid-" + c.pid + "-last").html(c.last);
            $(".pid-" + c.pid + "-last_nColor").html(c.last),
                $(".pid-" + c.pid + "-high").html(c.high),
                $(".pid-" + c.pid + "-low").html(c.low),
                $(".pid-" + c.pid + "-last-noblink").html(c.last);
            var g = $(".pid-" + c.pid + "-pc").html(c.pc)
                , h = $(".pid-" + c.pid + "-arrowSmall").removeClass("greenArrowIcon redArrowIcon grayArrowIcon")
                , i = $(".pid-" + c.pid + "-arrowBig").removeClass("upArrow downArrow noneArrow");
            "greenFont" === c.pc_col ? (h.addClass("greenArrowIcon"),
                i.addClass("upArrow")) : "redFont" === c.pc_col ? (h.addClass("redArrowIcon"),
                i.addClass("downArrow")) : "blackFont" === c.pc_col && (h.addClass("grayArrowIcon"),
                i.addClass("noneArrow")),
                g.removeClass("greenFont redFont blackFont").addClass(c.pc_col),
                $(".pid-" + c.pid + "-pcp").html(c.pcp).removeClass("greenFont redFont").addClass(c.pc_col),
                $(".pid-" + c.pid + "-time").html(b(c.timestamp, window.timezoneOffset)).attr("data-value", c.timestamp),
                $(".pid-" + c.pid + "-turnover").html(c.turnover),
            "redBg" !== c.last_dir && "greenBg" !== c.last_dir || (f.addClass(c.last_dir),
                d.addClass(c.last_dir),
                e.addClass(c.last_dir)),
                setTimeout(function() {
                    "redBg" !== c.last_dir && "greenBg" !== c.last_dir || (f.removeClass(c.last_dir),
                        d.removeClass(c.last_dir),
                        e.removeClass(c.last_dir))
                }, 1e3)
        }),
            $(window).on("socketMessageExt", function(a, c) {
                var d = $(".pidExt-" + c.pid + "-bid").html(c.bid)
                    , e = $(".pidExt-" + c.pid + "-ask").html(c.ask)
                    , f = $(".pidExt-" + c.pid + "-last").html(c.last);
                $(".pidExt-" + c.pid + "-last_nColor").html(c.last),
                    $(".pidExt-" + c.pid + "-pc").html(c.pc).removeClass("greenFont redFont").addClass(c.pc_col),
                    $(".pidExt-" + c.pid + "-pcp").html(c.pcp).removeClass("greenFont redFont").addClass(c.pc_col),
                    $(".pidExt-" + c.pid + "-time").html(b(c.timestamp, window.timezoneOffset)).attr("data-value", c.timestamp),
                    $(".pidExt-" + c.pid + "-turnover").html(c.turnover),
                "redBg" !== c.last_dir && "greenBg" !== c.last_dir || (f.addClass(c.last_dir),
                    d.addClass(c.last_dir),
                    e.addClass(c.last_dir)),
                    setTimeout(function() {
                        "redBg" !== c.last_dir && "greenBg" !== c.last_dir || (f.removeClass(c.last_dir),
                            d.removeClass(c.last_dir),
                            e.removeClass(c.last_dir))
                    }, 1250)
            }),
            $(window).on("isOpenExch", function(a, b) {
                var c = $(".isOpenExch-" + b.exch_ID).removeClass("greenClockIcon").removeClass("redClockIcon");
                "red" !== b.is_open && "green" !== b.is_open || c.addClass(b.is_open + "ClockIcon");
                var d = $(".isOpenExchBig-" + b.exch_ID).removeClass("greenClockBigIcon").removeClass("redClockBigIcon");
                "red" !== b.is_open && "green" !== b.is_open || d.addClass(b.is_open + "ClockBigIcon")
            }),
            $(window).on("isOpenPair", function(a, b) {
                $(".isOpenPair-" + b.pair_ID).removeClass("greenClockIcon").removeClass("redClockIcon").addClass(b.is_open + "ClockIcon"),
                "red" !== b.is_open && "green" !== b.is_open || $(".isOpenPair-" + b.exch_ID).addClass(b.is_open + "ClockIcon"),
                    $(".isOpenPairBig-" + b.pair_ID).removeClass("greenClockBigIcon").removeClass("redClockBigIcon"),
                "red" !== b.is_open && "green" !== b.is_open || $(".isOpenPairhBig-" + b.pair_ID).addClass(b.is_open + "ClockBigIcon")
            }),
            $(window).on("socketMessageEcalEvent", function(a, b) {
                $(".event-" + b.event_ID + "-previous").html(b.previous),
                    $(".event-" + b.event_ID + "-forecast").html(b.forecast),
                    $(".event-" + b.event_ID + "-actual").html(b.actual),
                    $("#eventRowId_" + b.event_ID).addClass("passedTime"),
                    $("#eventRowId_" + b.event_ID).hover(c),
                "redFont" !== b.actual_color && "greenFont" !== b.actual_color && "blackFont" !== b.actual_color || $(".event-" + b.event_ID + "-actual").removeClass("redFont").removeClass("greenFont").removeClass("blackFont").addClass(b.actual_color),
                    $(".event-" + b.event_ID + "-rev_from").html(b.rev_from),
                "redFont" !== b.rev_from_col && "greenFont" !== b.rev_from_col && "blackFont" !== b.rev_from_col || $(".event-" + b.event_ID + "-previous").removeClass("redFont").removeClass("greenFont").removeClass("blackFont").addClass(b.rev_from_col),
                    d(b.event_ID, b.rev_from)
            })
    });
// File: socket/jscharts_updater.js
$(function() {
    function a() {
        jQuery.each(j, function(a, b) {
            var c = "pid-" + b + ":";
            i.send(JSON.stringify({
                tzID: window.TimeZoneID,
                message: c
            }))
        }),
            j = []
    }
    function b(a) {
        return Number(a) || 0
    }
    function c(a, c, e, i, j) {
        a.last_numeric = Number(a.last_numeric);
        var n = e.resolution
            , p = c[c.length - 1]
            , q = d(p)
            , r = o[q];
        p = r(p);
        var s = r(c[c.length - 2])
            , t = h(n)
            , u = {}
            , v = {}
            , w = a.timestamp >= (p.x - i) / 1e3 + t;
        if (w)
            l[a.pid] = a.last_numeric,
                m[a.pid] = a.last_numeric,
                k[a.pid] = a.last_numeric,
                u = {
                    ac_vol: null,
                    close: p.close,
                    max: p.high,
                    min: p.low,
                    open: p.open,
                    pair_ID: a.pid,
                    related_ec_event_id: null,
                    related_news_items: null,
                    source: "feed",
                    start_timestamp: (p.x - i) / 1e3,
                    vol_open: p.vol_open,
                    volume: p.volume
                },
                v = {
                    ac_vol: null,
                    close: a.last_numeric,
                    max: a.last_numeric,
                    min: a.last_numeric,
                    open: a.last_numeric,
                    pair_ID: a.pid,
                    related_ec_event_id: null,
                    related_news_items: null,
                    source: "feed",
                    start_timestamp: (p.x - i) / 1e3 + t,
                    vol_open: Number(p.vol_open) + Number(p.volume),
                    volume: 0
                };
        else {
            if (u = {
                    ac_vol: null,
                    close: s.close,
                    max: s.high,
                    min: s.low,
                    open: s.open,
                    pair_ID: a.pid,
                    related_ec_event_id: null,
                    related_news_items: null,
                    source: "feed",
                    start_timestamp: s.x / 1e3,
                    vol_open: Number(s.vol_open),
                    volume: Number(s.volume)
                },
                    p.open)
                var x = p.open;
            if (604800 == t || 2592e3 == t)
                var y = b(a.turnover_numeric) + b(p.volume);
            else
                var y = b(a.turnover_numeric) - b(p.vol_open);
            v = {
                ac_vol: null,
                close: a.last_numeric,
                max: m[a.pid] ? g(a, p.high) : p.high,
                min: l[a.pid] ? f(a, p.low) : p.low,
                open: x,
                pair_ID: a.pid,
                related_ec_event_id: null,
                related_news_items: null,
                source: "feed",
                start_timestamp: (p.x - i) / 1e3,
                vol_open: Number(p.vol_open),
                volume: y
            }
        }
        var z = a.last_numeric
            , A = "redArrowIcon"
            , B = "redFont";
        "greenFont" == a.pc_col ? (A = "greenArrowIcon",
            B = "greenFont") : "redFont" == a.pc_col ? (A = "redArrowIcon",
            B = "redFont") : (A = "grayArrowIcon",
            B = "blackFont");
        var C = {};
        return C[a.pid] = {},
            C[a.pid][n] = {
                chart_data: {
                    candles: {
                        last_candle: v,
                        previous_candle: u
                    },
                    last_close_value: j,
                    last_value: z
                },
                chart_info: '<span id="chart-info-symbol" class="arial_16">' + e.pair_name + '</span><span id="chart-info-arrow" class="newSiteIconsSprite a1 ' + A + '">&nbsp;</span>&nbsp;<span id="chart-info-last" class="arial_16 bold">' + a.last + '</span><span class="arial_14 bold ' + B + '"><span id="chart-info-change">' + a.pc + '</span>(<span id="chart-info-change-percent">' + a.pcp.replace("%", "") + "</span>%)</span>",
                chart_last_update: a.local_time
            },
            C
    }
    function d(a) {
        return a.length > 4 || a.open ? "candlestick" : "area"
    }
    function e(a) {
        var b = FPCharts.Utils.enrich_refresher_params({
            group: a
        }).fpcharts
            , c = {};
        for (var d in b)
            if (b.hasOwnProperty(d)) {
                var e = JSON.parse(decodeURIComponent(b[d]));
                c[e[0]] = {
                    pair_id: e[0],
                    resolution: e[1],
                    exchange_id: e[2],
                    pair_name: e[3]
                }
            }
        return c
    }
    function f(a, b) {
        return b < l[a.pid] && (l[a.pid] = b),
        a.last_numeric < l[a.pid] && (l[a.pid] = a.last_numeric),
            l[a.pid]
    }
    function g(a, b) {
        return b > m[a.pid] && (m[a.pid] = b),
        a.last_numeric > m[a.pid] && (m[a.pid] = a.last_numeric),
            m[a.pid]
    }
    function h(a) {
        return "week" == a ? 604800 : "month" == a ? 2592e3 : Number(a)
    }
    var i, j = [], k = {}, l = {}, m = {}, n = !1;
    $(window).on("FPChartsRegister", function(b, c) {
        j.push(c.pair_id),
            k[c.pair_id] = null,
            l[c.pair_id] = Number.MAX_SAFE_INTEGER,
            m[c.pair_id] = Number.MIN_SAFE_INTEGER,
        n && a()
    }),
        $(window).on("socketOpen", function(b, c) {
            i = c,
                n = !0,
                a()
        }),
        $(window).on("socketMessage", function(a, b) {
            try {
                if ("function" == typeof FPCharts.Utils.update_charts)
                    for (var d in FPCharts.charts) {
                        var f = e(d);
                        for (var g in f)
                            if (f.hasOwnProperty(g) && f[g].pair_id == b.pid) {
                                var h = f[g].pair_id
                                    , i = f[g].resolution;
                                if (FPCharts.charts.hasOwnProperty(d)) {
                                    var j = FPCharts.charts[d][h][i]
                                        , k = 0;
                                    if (j.length > 1)
                                        for (var l in j)
                                            if (j.hasOwnProperty(l) && j[l].instance.series) {
                                                k = l;
                                                break
                                            }
                                    var m = j[k].data
                                        , n = m.candles
                                        , o = (m.volumes,
                                        c(b, n, f[g], m.attr.local_time_offset, m.attr.last_close_value));
                                    FPCharts.Utils.update_charts(o, d)
                                }
                            }
                    }
            } catch (a) {}
        });
    var o = {
        area: function(a) {
            var b = isNaN(a.volume) ? a[2] : a.volume
                , c = isNaN(a.vol_open) ? a[3] : a.vol_open;
            return {
                x: a.x || a[0],
                close: Number(a.y || a[1]),
                volume: Number(b),
                vol_open: Number(c)
            }
        },
        candlestick: function(a) {
            var b = isNaN(a.volume) ? a[5] : a.volume
                , c = isNaN(a.vol_open) ? a[6] : a.vol_open;
            return {
                x: a.x || a[0],
                open: Number(a.open || a[1]),
                high: Number(a.high || a[2]),
                low: Number(a.low || a[3]),
                close: Number(a.close || a[4]),
                volume: Number(b),
                vol_open: Number(c)
            }
        }
    }
});
// File: socket/socket_connector.js
!function(a, b) {
    function c(a, c) {
        u && b.log(a, c);
        var d = v[a] || "pid";
        t[a] && -1 !== t[a].indexOf(c[d]) && s[a].forEach(function(a) {
            a.data && -1 !== a.data.indexOf(c[d]) && a.callback(c)
        })
    }
    function d(a, c) {
        if (u && b.log(a, c),
                r[a]) {
            var d, e = r[a].length;
            for (d = 0; e > d; d++)
                r[a][d](c)
        }
    }
    function e(a, c) {
        if (!$.isArray(a) && !$.isArray(c))
            return b.log("both not arrays"),
                [];
        if (!$.isArray(a))
            return b.log("arr1 not array"),
                c;
        if (!$.isArray(c))
            return b.log("arr2 not array"),
                a;
        if (0 === a.length)
            return b.log("arr1 empty"),
                c;
        if (0 === c.length)
            return b.log("arr2 empty"),
                a;
        for (var d = a.concat(c), e = 0; e < d.length; ++e)
            for (var f = e + 1; f < d.length; ++f)
                d[e] === d[f] && d.splice(f--, 1);
        return d
    }
    function f() {
        jQuery.each(q, function(a, c) {
            b.log(c),
                n.send(JSON.stringify({
                    _event: "subscribe",
                    tzID: window.TimeZoneID,
                    message: c
                }))
        })
    }
    function g(a) {
        q = a,
            p = e(p, a)
    }
    function h(a, b) {
        g(b),
        o && f()
    }
    function i(a) {
        n && (n.send(JSON.stringify({
            _event: "UID",
            UID: a
        })),
            b.log("sendUID-" + a))
    }
    function j(e, h) {
        function j(a, b) {
            r[a] = b
        }
        g(h);
        var k = {
            protocols_whitelist: ["websocket", "xdr-streaming", "xhr-streaming", "iframe-eventsource", "xdr-polling", "xhr-polling"],
            debug: !0,
            jsessionid: !1,
            server_heartbeat_interval: 5e3,
            heartbeatTimeout: 5e3
        };
        o = !1,
            n = new SockJS(window.stream + "/echo",null,k);
        var l, m, q = !1, r = {}, s = function() {
            clearTimeout(l),
                l = setTimeout(function() {
                    n && n.send(JSON.stringify({
                        _event: "heartbeat",
                        data: "h"
                    }))
                }, 3e3),
                m = setTimeout(function() {
                    b.log("Dying..."),
                        n.close()
                }, 6e4)
        };
        j("heartbeat", function(a, b) {
            q || (clearTimeout(m),
                s())
        }),
            j("notification", function(a, c) {
                b.log("received notification: " + c.notif)
            }),
            n.onopen = function() {
                o = !0,
                    s(),
                    f(),
                    i(window.uid)
            }
            ,
            j("notification", function(a, b) {
                var c = JSON.parse(b.notif);
                d("notification", c);
                var e = components.notificationBar.addItem(c).timeout(12e5);
                topBarPopup.setAlertsCounter && !e.getData().hasReminder && topBarPopup.setAlertsCounter(1, !0)
            }),
            j("tick", function(b, e) {
                var f = JSON.parse(b.data)
                    , g = f.message.split("::")
                    , h = JSON.parse(g[1])
                    , i = g[0].split("-")[0];
                switch (c(i, h),
                    i) {
                    case "pidExt":
                        a.trigger("socketMessageExt", h);
                        break;
                    case "pid":
                        siteData.isEu && !g[0].has("eu") || a.trigger("socketMessage", h);
                        break;
                    case "event":
                        a.trigger("socketMessageEcalEvent", h);
                        break;
                    case "isOpenExch":
                        a.trigger("isOpenExch", h);
                        break;
                    case "isOpenPair":
                        a.trigger("isOpenPair", h);
                        break;
                    case "EarningsCal":
                        a.trigger("EarningsCal", h);
                        break;
                    case "cmt":
                        d("comments", h);
                        break;
                    case "domain":
                        d("domain", h)
                }
            }),
            n.onmessage = function(a) {
                try {
                    var c = JSON.parse(a.data);
                    void 0 == c._event && (c._event = "tick")
                } catch (d) {
                    return b.log("CATCH ERR "),
                        b.log("CATCH ERR " + d.message + a.data),
                        void n.close()
                }
                (r[c._event] || noop)(a, c)
            }
            ,
            n.onclose = function(b) {
                o = !1,
                    n = null,
                    clearTimeout(m),
                    clearTimeout(l),
                    a.trigger("socketClose", b);
                var c = Math.floor(7e3 * Math.random()) + 4e3;
                setTimeout(function() {
                    a.trigger("socketRetry", [p])
                }, c)
            }
    }
    function k(a, c) {
        n ? h(null, c) : window.stream ? j(null, c) : $(document).ready(function() {
            window.stream ? k(a, c) : b.warn("Socket is not defined. Server must define a URL for socket connection.", c)
        })
    }
    function l(a, b, c, d) {
        var f;
        return s[d] || (s[d] = []),
            c ? s[d].forEach(function(a) {
                a.id === c && (f = a)
            }) : c = Date.now(),
            t[d] = e(t[d] || [], a),
            f ? (f.callback = b || f.callback || $.noop,
                f.data = a) : (f = {
                id: c,
                data: a,
                callback: b || $.noop
            },
                s[d].push(f)),
            f
    }
    function m(a, b, c, d) {
        var e = l(a, d, b, c)
            , f = {
            id: e.id,
            get: function() {
                return e
            },
            then: function(a) {
                return e.callback = a,
                    f
            },
            destroy: function() {
                e && (w.tick.unSubscribeNewData(e.id, c),
                    Object.keys(e).forEach(function(a) {
                        delete e[a]
                    }),
                    e = null)
            }
        };
        return f
    }
    var n = null
        , o = !1
        , p = []
        , q = []
        , r = {
        notification: [],
        comments: [],
        domain: []
    }
        , s = {}
        , t = {}
        , u = !1
        , v = {
        pid: "pid",
        pidExch: "pid",
        isOpenPair: "pid",
        isOpenExch: "exch_ID"
    };
    b && b.log || (b = {
        log: function() {}
    }),
        a.on("socketRetry", k),
        a.on("socketNewData", k),
        a.on("sendUID", i);
    var w = window.socketConnector = {
        setDebugMode: function(a) {
            return u = !!a,
                w
        },
        tick: {
            socketRetry: function(a) {
                k("socketRetry", a)
            },
            socketNewData: function(a, b, c, d) {
                a.length && (d || (d = "pid"),
                b && l(a, b, c, d),
                    k("socketNewData", w.tick.getSocketFormattedArray(a, d)))
            },
            unSubscribeNewData: function(a, b) {
                var c, d = s.length;
                if (b || (b = "pid"),
                        s[b])
                    for (c = 0; d > c; c++)
                        if (s[b][c].id === a)
                            return void s[b].splice(c, 1)
            },
            getSocketFormattedArray: function(a, b) {
                return b || (b = "pid"),
                    a.map(function(a) {
                        return b + "-" + a + ":"
                    })
            },
            subscribe: function(a, b, c, d) {
                if (a.length) {
                    var e = m(a, b, c || "pid", d);
                    return k("socketNewData", w.tick.getSocketFormattedArray(a, c)),
                        e
                }
            }
        },
        on: function(a, b) {
            return r[a] && r[a].push(b),
                w
        },
        off: function(a, b) {
            if (r[a])
                for (var c = 0; c < r[a].length; c++)
                    if (r[a][c] === b)
                        return r[a].splice(c, 1),
                            w;
            return w
        }
    }
}($(window), console);
// File: socket/refresher_stream.js
function SBQ(a) {
    for (var b in a)
        for (var c in a[b]) {
            var d = "redFont"
                , e = "newSiteIconsSprite redClockIcon";
            a[b][c].clr && (d = "greenFont"),
            a[b][c].clk && (e = "newSiteIconsSprite greenClockIcon"),
                $("#sb_last_" + c).html(a[b][c].lst),
                $("#sb_change_" + c).html(a[b][c].chg).removeClass("redFont greenFont").addClass("chg " + d),
                $("#sb_changepc_" + c).html(a[b][c].pch).removeClass("redFont greenFont").addClass("chgPer " + d),
                $("#sb_clock_" + c).removeClass().addClass(e)
        }
}
!function() {
    function a() {
        $.ajax({
            url: "/common/ajax_func.php",
            type: "POST",
            data: {
                action: c,
                referer: window.location.href,
                counter: e,
                version: g
            },
            success: function(a) {
                console.log("u-sent-hit " + a + " times"),
                    e++
            }
        })
    }
    var b = 9e5
        , c = "idleUserRefresh"
        , d = 1433604211806
        , e = 1
        , f = window
        , g = "1.9.2";
    window.userAdsRefresh = function() {
        f = window;
        var c = Date.now();
        f.lastUserRefreshTimestamp < d || c > f.lastUserRefreshTimestamp + b && (f.lastUserRefreshTimestamp = c,
        "function" == typeof window.googletag.pubads().refresh && (console.log("u-ads-refresh"),
            f.googletag.pubads().refresh()),
        "function" == typeof window.ga && (console.log("u-page-hit"),
            ga("allSitesTracker.send", "pageview"),
            ga("t0.send", "pageview")),
            a())
    }
        ,
        jQuery(f).on("focus", window.userAdsRefresh),
    Date.now || (Date.now = function() {
            return (new Date).getTime()
        }
    ),
    "undefined" == typeof f.lastUserRefreshTimestamp && (f.lastUserRefreshTimestamp = Date.now())
}();
var PortfolioTechnicalRefresh = function() {
    var a = ".js-enabelRefreshTechnical"
        , b = null
        , c = []
        , d = !1
        , e = function() {
        return b = $(a),
            0 === b.length ? !1 : (c = [],
                b.each(function() {
                    var a = $(this)
                        , b = a.attr("rel");
                    c.push(b)
                }),
                !0)
    }
        , f = function(a) {
        if (0 !== a.length) {
            a = $.parseJSON(a);
            for (var b in a)
                for (var c in a[b])
                    for (var d in a[b][c])
                        if (a[b][c][d].text.length > 0 && null !== a[b][c][d]["class"]) {
                            var e = $("#" + b + "_" + c + "_" + d);
                            e.length > 0 && (e.removeClass("greenFont redFont analysisNeutral"),
                                e.addClass(a[b][c][d]["class"]),
                                e.html(a[b][c][d].text))
                        }
        }
    };
    (function() {
        d = e()
    })();
    return {
        refreshEnabled: function() {
            return d = e()
        },
        getData: function() {
            return c
        },
        setData: function(a) {
            f(a)
        }
    }
}
    , portTechRefresh = new PortfolioTechnicalRefresh;
// File: core/console.fallback.js
if ("undefined" == typeof console || "undefined" == typeof console.log || "undefined" == typeof console.warn) {
    var console = {};
    console.log = console.warn = console.time = console.timeEnd = function() {}
}
// File: core/loader.js
!function(a, b, c, d) {
    function e(a, b) {
        return {
            id: Date.now(),
            isRegistered: !1,
            isRepeatable: b.isRepeatable || !1,
            requires: a || [],
            callbacks: []
        }
    }
    function f(a) {
        var b = a.requires.map(g);
        -1 === b.indexOf(!1) && (a.callbacks = a.callbacks.map(function(d) {
            return d && d.apply(c, b),
                d && a.isRepeatable ? d : !1
        }).filter(Boolean))
    }
    function g(a) {
        var b, c;
        return "string" == typeof a ? (b = "global",
            c = a) : (b = a.type,
            c = a.value),
        i[b] && i[b](c)
    }
    var h = b.Deferred()
        , i = {
        global: function(b) {
            return "undefined" == typeof a[b] ? !1 : a[b]
        },
        $: function(a) {
            var c = b(a);
            return c.length ? c : !1
        },
        component: function(a) {
            return "undefined" == typeof d[a] ? !1 : d[a]
        }
    };
    a.loader = function(a, b) {
        var c = e(a, b || {});
        return {
            ready: function(a) {
                return a && c.callbacks.push(a),
                c.isRegistered || (c.isRegistered = !0,
                    h.then(function() {
                        f(c),
                            c.isRegistered = !1
                    })),
                    this
            }
        }
    }
        ,
        c.ready(function() {
            h.resolve()
        })
}(window, jQuery, $(document), window.components ? window.components : window.components = {});
// File: core/storage.js
var Cookies = function(a, b) {
    var c = 30;
    return {
        get: function(a, c) {
            var d = b.cookie
                , e = a + "="
                , f = d.indexOf("; " + e);
            if (-1 === f) {
                if (f = d.indexOf(e),
                    0 !== f)
                    return null
            } else {
                f += 2;
                var g = d.indexOf(";", f);
                -1 === g && (g = d.length)
            }
            var h = decodeURI(d.substring(f + e.length, g));
            if (c)
                return h;
            try {
                return JSON.parse(decodeURI(d.substring(f + e.length, g)))
            } catch (i) {
                return null
            }
        },
        set: function(d, e, f) {
            f = f || c;
            var g = new Date
                , h = new Date(g.getFullYear(),g.getMonth(),g.getDate() + f,g.getMinutes(),g.getSeconds())
                , i = a.location.hostname;
            1 === arguments[3] && (i = i.substring(i.lastIndexOf(".", i.lastIndexOf(".") - 1) + 1)),
                b.cookie = d + "=" + JSON.stringify(e) + "; expires=" + h.toGMTString() + ";path=/; domain=" + i + ";"
        },
        remove: function(a) {
            b.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        }
    }
}(window, document)
    , Storage = function(a, b) {
    var c = a && function() {
        var b = "test";
        try {
            return a.setItem(b, "1"),
                a.removeItem(b),
                !0
        } catch (c) {
            return !1
        }
    }();
    return {
        isLocalStorageSupported: c,
        get: function(d, e) {
            return c ? e ? a.getItem(d) : JSON.parse(a.getItem(d)) : b.get(d, e)
        },
        set: function(d, e, f) {
            return f || (e = JSON.stringify(e)),
                c ? a.setItem(d, e) : b.set(d, e),
                this
        },
        remove: function(d) {
            return c ? a.removeItem(d) : b.remove(d),
                this
        }
    }
}(localStorage || sessionStorage, Cookies);
// File: core/translate.js
!function(a, b) {
    "use strict";
    function c(a, b) {
        return e ? a + "." + b : ""
    }
    var d = {}
        , e = !0;
    a.Translate = function(a) {
        d[a] || (d[a] = {});
        var b = d[a];
        this.get = function(d) {
            return b[d] || c(a, d)
        }
    }
        ,
        a.Translate.getDictionary = function(a) {
            return d[a]
        }
        ,
        a.Translate.setDictionary = function(b, c) {
            return d[b] = $.extend(d[b] || {}, c),
                a.Translate
        }
        ,
        a.Translate.setDebugMode = function(b) {
            return e = b,
                a.Translate
        }
        ,
        b(["siteData"]).ready(function(b) {
            a.Translate.setDictionary("technical", b.techTranslations)
        })
}(components, loader);
// File: core/numbers.js
window.components.Numbers = function(a) {
    "use strict";
    function b(a) {
        for (var b = 0, c = ""; a > b; )
            c += "0",
                b++;
        return c
    }
    function c(a, b) {
        a = a.toString(),
        b || (b = ""),
        "-" === a[0] && (b = "-" + b,
            a = a.replace("-", ""));
        var c = a.substr(-3);
        for (a = a.slice(0, -3); a; )
            c = a.substr(-3) + f().thousandSep + c,
                a = a.slice(0, -3);
        return b + c
    }
    function d() {
        return new RegExp("\\" + f().thousandSep,"g")
    }
    function e(a, b) {
        var c;
        if (Number.isInteger(a) && Number.isInteger(b))
            c = a * b;
        else {
            var d = Number(a).toString().split(".")
                , f = "undefined" != typeof d[1] ? d[1].length : 0
                , g = Number(d.join(""))
                , h = Number(b).toString().split(".")
                , i = "undefined" != typeof h[1] ? h[1].length : 0
                , j = Number(h.join(""));
            c = g * j / Math.pow(10, f + i)
        }
        return arguments.length > 2 ? e.apply(this, [c].concat(Array.prototype.splice.call(arguments, 2))) : c
    }
    function f() {
        return a.siteData || {}
    }
    return Number.isInteger = Number.isInteger || function(a) {
        return "number" == typeof a && isFinite(a) && Math.floor(a) === a
    }
        ,
        {
            isValidLocalNumber: function(a) {
                var b;
                return b = "." === f().decimalPoint ? /^(-)?([0-9]\d*(\,\d{3})*|([1-9]\d*))(\.\d{0,8})?$/ : /^(-)?([0-9]\d*(\.\d{3})*|([1-9]\d*))(\,\d{0,8})?$/,
                    b.test(a)
            },
            getThousandRegex: d,
            getDecimalSeparator: function() {
                return f().decimalPoint || "."
            },
            getZeros: b,
            getLocalNumber: function(a, d, e, g, h) {
                var i = a.toString().split(".")
                    , j = i[1] || "";
                (j || g) && (j = j || "",
                d && (j = j.slice(0, d),
                j.length < d && (j += b(d - j.length))),
                    j = f().decimalPoint + j),
                e || (e = ""),
                h || (h = "");
                var k = "left" === f().currencyPosition ? e : null
                    , l = "right" === f().currencyPosition && e ? " " + e : "";
                return c(i[0], k) + j + h + l
            },
            getNumericFromLocalNumber: function(a) {
                return a ? Number(a.replace(d(), "").replace(f().decimalPoint, ".")) : 0
            },
            multiply: e,
            getShortNumberFromNumeric: function(a) {
                var b = Math.abs(a)
                    , c = {
                    type: null,
                    num: a
                };
                return b >= 1e9 ? (c.type = "B",
                    c.num = a / 1e9) : b >= 1e6 ? (c.type = "M",
                    c.num = a / 1e6) : b > 9999 && (c.type = "K",
                    c.num = a / 1e3),
                    c
            }
        }
}(window);
// File: core/adb-popup.js
loader([{
    type: "$",
    value: "#abPopup"
}, {
    type: "component",
    value: "GeneralOverlay"
}, {
    type: "$",
    value: window
}, "window"]).ready(function(a, b, c, d) {
    function e() {
        c.off(),
            d.refresher_stream = function() {}
    }
    function f() {
        b.show({
            closeEnabled: function() {
                return j && (j = !1,
                    a.removeClass("displayNone"),
                    $("#loginPopup, #signingPopup, #passwordResetRequest, #emailConfirmPopup").hide()),
                    !1
            },
            replaceEnabled: function() {
                return k && (j = !0,
                    a.addClass("displayNone")),
                    !1
            },
            $popup: a,
            center: !0
        }).getEl().before('<div class="topBarOverlay"></div>'),
            i.find("#topAlertBarContainer").remove()
    }
    function g() {
        function a() {
            var a = d.navigator.userAgent
                , b = a.indexOf("Trident/")
                , c = a.indexOf("Edge/")
                , e = a.indexOf("MSIE ");
            return Math.max(e, c, b) > 0
        }
        var b, a = a(), c = /OPR/.test(navigator.userAgent), e = !c && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !a, f = /Firefox/.test(navigator.userAgent), g = !c && /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor), h = {
            isIE: a,
            isChrome: e,
            isFireFox: f,
            isSafari: g,
            isOpera: c,
            isOneOfThoseBrowsers: [a, e, f, g, c].indexOf(!0) > -1
        }, i = d.CDN_URL + "/", j = d.LANGUAGE_SUFFIX, k = [i + "header_logo.png"];
        switch ([a, e, f, g, c].indexOf(!0)) {
            case 0:
                k.push(i + "ab-ie.png");
                break;
            case 1:
                k.push(i + "ab-ch-" + j + "-step1_v3.1.png"),
                    k.push(i + "ab-ch-" + j + "-step2_v3.3.png");
                break;
            case 2:
                k.push(i + "ab-ff-" + j + "_v2.1.png");
                break;
            case 3:
                k.push(i + "ab-saf-" + j + "_v2.png");
                break;
            case 4:
                b = "ru" === j ? "ru" : "com",
                    k.push(i + "ab-opr-" + b + "_step1_v2.png"),
                    k.push(i + "ab-opr-" + b + "_step2_v2.png")
        }
        return h.refs = k,
            h
    }
    function h(a) {
        q.each(function(c) {
            var d = q.eq(c);
            d.hasClass(a) ? (d.addClass("active"),
                n.attr("src", l.refs[c + 1]).one("load", b.centerPopup)) : d.removeClass("active")
        })
    }
    var i = this
        , j = !1
        , k = !1
        , l = g();
    if (l.isOneOfThoseBrowsers && 1 != d.google_ad_status) {
        var m = $("#ab-how-pop")
            , n = $("#ab-content-src");
        l.refs && l.refs[0] && $("#ab-header-src").attr("src", l.refs[0]),
        l.refs && l.refs[1] && n.attr("src", l.refs[1]);
        var o = a.find(".js-intro")
            , p = a.find(".headerLinks")
            , q = a.find(".js-toggle-btn");
        a.find(".js-chrome-ext").click(function() {
            o.addClass("displayNone"),
                l.isChrome || l.isOpera ? h("js-chrome-ext") : p.addClass("displayNone"),
                a.addClass("howTo"),
                m.removeClass("displayNone"),
                b.centerPopup()
        }),
            a.find(".js-adbp").click(function() {
                o.addClass("displayNone"),
                    h("js-adbp"),
                    a.addClass("howTo"),
                    b.centerPopup()
            }),
            a.find(".js-back").click(function() {
                o.removeClass("displayNone"),
                    p.addClass("displayNone"),
                    m.addClass("displayNone"),
                    a.removeClass("howTo"),
                    b.centerPopup()
            }),
            a.find(".js-sign-in").click(function() {
                k = !0,
                    d.ga("allSitesTracker.send", "event", "Ad-Free Subscription", "Subscribe to Ad-Free Version"),
                    overlay.overlayLogin()
            }),
            f(),
            e(),
            c.resize(b.centerPopup)
    }
});
// File: core/add-to-calendar.js
loader([{
    type: "$",
    value: ".js-add-to-calendar"
}]).ready(function(a) {
    function b(a) {
        a.isShown = !1,
            a.$popup.addClass("displayNone"),
            e.off("click.calendar-list-popup")
    }
    function c(a) {
        a.isShown = !0,
            a.$popup.removeClass("displayNone"),
            d(a)
    }
    function d(a) {
        setTimeout(function() {
            e.on("click.calendar-list-popup", function(c) {
                var d = $(c.target);
                d.is(a.$popup) || a.$popup.find(d).length || b(a)
            })
        }, 0)
    }
    var e = $("body");
    a.each(function() {
        var a = $(this)
            , d = {
            $popup: a.find(".js-popup"),
            $toggle: a.find(".js-toggle-calendar-list-popup"),
            isShown: !1
        };
        d.$toggle.click(function(a) {
            d.isShown ? b(d) : c(d)
        })
    })
});
// File: core/add-to-portfolio.js
!function(a, b, c, d) {
    function e(b, c) {
        a.ga && a.ga("allSitesTracker.send", "event", "Portfolio Tab", b, c)
    }
    function f(a, b) {
        var c = a.find(".js-status-message");
        return {
            pairId: b.pairId || a.attr("data-pair-id"),
            $statusMessage: c,
            $statusMessagePortfolioName: c.find(".js-portfolio-name"),
            $typesList: a.find(".js-types-list"),
            $currencySigns: a.find(".js-currency-sign"),
            $header: a.find(".js-header"),
            portfolioNoPosition: b.portfolioNoPosition || !!a.attr("data-portfolio-no-position") || !1,
            analyticsLabelAddon: b.analyticsLabelAddon ? " - " + b.analyticsLabelAddon : "",
            buttons: {
                $submit: a.find(".js-submit"),
                $afterSubmit: a.find(".js-after-submit"),
                $close: a.find(".js-close"),
                $reloadPositionForm: a.find(".js-reload-position-form")
            }
        }
    }
    function g(a) {
        a.$btn.addClass("active"),
            a.$form.removeClass("displayNone"),
            a.$contents.removeClass("displayNone"),
            a.onShow.forEach(function(b) {
                b(a)
            })
    }
    function h(a) {
        a.$btn.removeClass("active"),
            a.$form.addClass("displayNone"),
            a.$contents.addClass("displayNone"),
            a.onHide.forEach(function(a) {
                a()
            })
    }
    function i(b, c, d) {
        function f() {
            b.$loadingSpinner.remove(),
                d.$input.removeClass("displayNone")
        }
        d.$el = b.$itemTemplate.clone().attr("title", d.title),
            d.$input = d.$el.find("input").prop("checked", !!d.is_checked).change(function() {
                d.set_disabled || (d.$el.prepend(b.$loadingSpinner),
                    d.$input.addClass("displayNone"),
                    d.is_checked ? G.removeSymbol(c.pairId, d.id, f) : G.addSymbol(c.pairId, d.id, f),
                    d.is_checked = !d.is_checked,
                    e("Add To Watchlist", "Watchlist Selected" + c.analyticsLabelAddon))
            }),
            d.$el.append("<span>" + d.protfolio_name + "</span>"),
            b.$form.append(d.$el),
        d.set_disabled && (d.$input.attr("disabled", !0),
            d.$el.addClass("portfolioFull").append("<i>&nbsp;&#40;" + a.addToPortfolioDefinitions._full + "&#41;</i>"))
    }
    function j(a, b, c) {
        if (!a.list) {
            a.list = b,
                a.$loadingSpinner = a.$loadingSpinner || a.$form.find(".js-loading-spinner").remove().removeClass("displayNone"),
                a.$itemTemplate = a.$itemTemplate || a.$form.find(".js-item").remove(),
                a.$form.empty();
            for (var d = 0; d < b.length; d++)
                i(a, c, b[d])
        }
    }
    function k(a, b, c, d, e) {
        function f() {
            m.removeClass("displayNone"),
                i.addClass("displayNone"),
                k.addClass("displayNone")
        }
        function g() {
            m.addClass("displayNone"),
                k.removeClass("displayNone"),
                i.removeClass("displayNone"),
                j.val("").focus()
        }
        function h() {
            var a = j.val().trim();
            return a ? (d(a, b.pairId, function(a, b) {
                a || (f(),
                    e(b))
            }),
                !1) : !1
        }
        var i = a.find(".js-input-wrapper")
            , j = i.find("input")
            , k = a.find(".js-create")
            , l = a.find(".js-action-btn")
            , m = a.find(".js-exclude-portfolio-form");
        l.click(g),
            j.keyup(function(a) {
                27 === a.keyCode ? f() : j.val().trim() ? k.removeClass("disabled") : k.addClass("disabled")
            }),
            a.submit(h),
            k.click(h),
            c.onHide.push(f),
            this.open = g,
            this.close = f,
            this.submit = h
    }
    function l(a, b, c) {
        return new k(a,b,c,G.create,function(a) {
                c.list.push(a),
                    i(c, b, a)
            }
        )
    }
    function m(a, b, c) {
        return new k(a,b,c,F.create,function(a) {
                c.list.push(a),
                    o(c, a),
                    c.$list.val(a.id).change(),
                c.$addPortfolioMessage && (c.$addPortfolioMessage.addClass("displayNone"),
                    c.$inputsContainer.removeClass("displayNone"),
                    c.$list.removeClass("displayNone"),
                    delete c.$addPortfolioMessage,
                    w(c, b))
            }
        )
    }
    function n(a) {
        a.$addPortfolioMessage = a.$form.find(".js-add-portfolio-message").removeClass("displayNone"),
            a.$list.addClass("displayNone"),
            a.$inputsContainer.addClass("displayNone")
    }
    function o(a, b) {
        a.listObj[b.id] = b,
            a.$list.append(d("<option></option>").attr("value", b.id).text(b.name))
    }
    function p(a, b) {
        if (!a.list) {
            a.list = b,
                a.listObj = {},
                a.$list = a.$form.find(".js-holdings-list"),
                a.$inputsContainer = a.$form.find(".js-flex-container");
            for (var c = 0; c < b.length; c++)
                o(a, b[c])
        }
    }
    function q(a, b) {
        z(a.data, x(a.data)) ? b.buttons.$submit.removeClass("disabled") : b.buttons.$submit.addClass("disabled")
    }
    function r(a, b) {
        a.$list.off("change.currencySign"),
            "portfolio" === a.positionData.commissionCurrencyState ? (a.$list.on("change.currencySign", function() {
                b.$currencySigns.html(a.listObj[a.$list.val()].currSign)
            }),
                b.$currencySigns.html(a.listObj[a.$list.val()].currSign)) : b.$currencySigns.html(a.positionData.currSign)
    }
    function s(a, b) {
        a.data || (a.$futures = a.$inputsContainer.find(".js-future-input"),
            a.$forexes = a.$inputsContainer.find(".js-forex-input"),
            a.$datePicker = a.$inputsContainer.find(".js-datepicker"),
            a.data = {
                pairId: {
                    value: null
                },
                portfolio: {
                    $el: a.$list,
                    required: !0
                },
                type: {
                    $el: a.$form.find(".js-position-type"),
                    value: "B"
                },
                date: {
                    $el: a.$datePicker.find("input"),
                    required: !0
                },
                amount: {
                    $el: a.$form.find(".js-amount"),
                    required: !0
                },
                price: {
                    $el: a.$form.find(".js-price"),
                    required: !0
                },
                pointValue: {
                    $el: a.$form.find(".js-point-value"),
                    required: !0
                },
                leverage: {
                    $el: a.$form.find(".js-leverage"),
                    required: !0
                },
                commission: {
                    $el: a.$form.find(".js-commission")
                }
            },
            a.$inputs = d(d.map(a.data, function(a) {
                return a.$el ? a.$el[0] : !1
            }).filter(function(a) {
                return a
            })).on("keyup change", function() {
                q(a, b)
            }),
            u(a, b),
            q(a, b),
            r(a, b))
    }
    function t(a, b, c, d) {
        var e = Date.now()
            , f = a.find(".js-display-date").attr("id", "display-date-" + e);
        a.attr("id", "datepicker-" + e),
            b.attr("id", "datepicker-input-" + e).on("onShow", c).on("onClose", d);
        var g = new MyDatePicker("#" + b.attr("id"),"#" + f.attr("id"),H.datepicker.formatLong,new Date);
        return g.attachTo("normal", 0, 0, 1, "#" + a.attr("id")).setMaxDate(0).setFirstDay(H.datepicker.firstDay).setDayNames(H.datepicker.dayNames).setRtl(H.htmlDirection).setMonthNamesShort(H.datepicker.monthNamesShort).setMonthNames(H.datepicker.monthNames).setApplyButtonText(H.datepicker.applyButton).set({
            trigger: "#" + a.attr("id")
        }).create()
    }
    function u(a, b) {
        a.datePicker ? (a.data.date.defaultValue = a.data.date.$el.data("defaultValue"),
            d.datepicker._curInst = d.datepicker._getInst(a.data.date.$el[0]),
            d.datepicker._curInst.sortableDate = [],
            d.datepicker._selectDate(a.data.date.$el, a.data.date.defaultValue)) : (a.datePicker = t(a.$datePicker, a.data.date.$el, function() {
            b.tooltip.stayOpen(!0)
        }, function() {
            b.tooltip.stayOpen(!1)
        }),
            a.data.date.defaultValue = a.data.date.$el.val(),
            a.data.date.$el.data("defaultValue", a.data.date.defaultValue))
    }
    function v(a) {
        a.children().removeClass("middleBox").not(".displayNone").filter(function(a) {
            return a % 3 === 1
        }).addClass("middleBox")
    }
    function w(a, b, c) {
        a.positionData = c || a.positionData,
        a.list.length && (s(a, b),
            a.data.pairId.value = b.pairId,
            a.data.price.$el.val(a.positionData.last),
            a.positionData.futureCash ? (a.$futures.removeClass("displayNone"),
                a.data.pointValue.$el.val(a.positionData.pointValue)) : (delete a.data.pointValue,
                a.$futures.addClass("displayNone")),
            a.positionData.leverage ? a.$forexes.removeClass("displayNone") : (delete a.data.leverage,
                a.$forexes.addClass("displayNone")),
            v(a.$inputsContainer))
    }
    function x(a) {
        var b = {};
        return d.each(a, function(a, c) {
            b[a] = (c.$el ? c.$el.val() : c.value) || c.value
        }),
            b
    }
    function y(a) {
        d.each(a, function(a, b) {
            b.$el && b.$el.val(b.defaultValue || "")
        })
    }
    function z(a, b) {
        var c = !0;
        return d.each(a, function(a, d) {
            return d.required && !b[a] ? (c = !1,
                !1) : void 0
        }),
            c
    }
    function A(a, b) {
        var c = x(a.data);
        if (z(a.data, c)) {
            c.date = c.date.split("/");
            var d = H.datepicker.format.toLowerCase().split("/")
                , f = {};
            d.forEach(function(a, b) {
                f[a] = c.date[b]
            }),
                c.date = [f.y, f.m, f.d].join("-"),
                F.createPosition(c, function() {
                    y(a.data),
                        a.$form.addClass("displayNone"),
                        b.$statusMessage.removeClass("displayNone"),
                        b.$statusMessagePortfolioName.text(a.listObj[c.portfolio].name).attr("href", "/portfolio/?portfolioID=" + c.portfolio),
                        b.$typesList.addClass("displayNone"),
                        h(a),
                        b.buttons.$afterSubmit.removeClass("displayNone"),
                        e("Add Position", "Add Button Clicked" + b.analyticsLabelAddon)
                })
        }
    }
    function B(a, b) {
        a.$form.submit(function() {
            return A(a, b),
                !1
        }),
            b.buttons.$submit.click(function() {
                A(a, b)
            });
        var c = !1;
        a.onShow.push(function() {
            c || (c = !0,
            a.list.length || (n(a),
                b.createHolding.open()),
                F.getPosition(b.pairId, function(c) {
                    w(a, b, c)
                }))
        }),
            a.onHide.push(function() {
                c = !1
            })
    }
    function C() {
        var a = this;
        a.$afterSubmit.addClass("displayNone")
    }
    function D(c, d, e) {
        return H || (H = a.siteData,
            F = a.components.Holdings,
            G = a.components.Watchlists),
            H.userLoggedIn && 0 !== d.length ? (b.LocalNumberInput && b.LocalNumberInput.ready(),
            b.LocalAmountInput && b.LocalAmountInput.ready(),
                !0) : (c.open = function(a, b, c, d) {
                overlay.authCompleteAction = {
                    type: "addToPortfolio",
                    actionData: {
                        pairId: c.id,
                        clickSrc: d
                    }
                },
                    overlay.overlayLogin(),
                !b && ga("allSitesTracker.send", "event", "Portfolio Tab", "Portfolio Tab Clicked", "Portfolio Tab In Instrument - Non Logged In")
            }
                ,
                e = f(d, e || {}),
                d.find(".js-btn").click(function() {
                    c.open(null, !1, {
                        id: e.pairId
                    }, "singleBTN")
                }),
                !1)
    }
    function E(b, c) {
        a.ga && a.ga.loaded && ("watchlist" === b ? e("Add To Watchlist", "Add To Watchlist Selected" + c) : e("Add Position", "Add Position Selected" + c))
    }
    var F, G, H, I = b.AddToPortfolio = function(a, c) {
            var i = D(this, a, c);
            c = f(a, c || {});
            var k = c.tooltip = new b.TooltipPopup(a.find(".js-popup"),a.find(".js-btn"));
            if (i) {
                var n = {
                    watchlist: null,
                    holdings: null
                };
                c.buttons.$reloadPositionForm.click(function() {
                    c.$statusMessage.addClass("displayNone"),
                        c.$typesList.removeClass("displayNone"),
                        y(n.holdings.data),
                        w(n.holdings, c),
                        g(n.holdings)
                }),
                    c.$typesList.find(".js-type").each(function() {
                        var a = d(this)
                            , b = a.attr("data-value");
                        n[b] = {
                            type: b,
                            $btn: a,
                            $form: null,
                            $contents: null,
                            onShow: [C.bind(c.buttons)],
                            onHide: []
                        }
                    }).click(function() {
                        var a = this;
                        d.each(n, function(b, d) {
                            d.$btn.is(a) ? (E(b, c.analyticsLabelAddon),
                                g(d)) : h(d)
                        })
                    }),
                    k.getEl().find(".js-form").each(function() {
                        var a = d(this);
                        n[a.attr("data-value")].$form = a
                    }),
                    k.getEl().find(".js-form-contents").each(function() {
                        var a = d(this)
                            , b = n[a.attr("data-value")];
                        b.$contents = b.$contents ? b.$contents.add(a) : a
                    }),
                    k.subscribe("show", function() {
                        c.portfolioNoPosition ? (c.$typesList.addClass("displayNone"),
                            c.$header.text(c.$header.attr("data-no-position-text"))) : (n.holdings.list || F.getList(function(a) {
                            p(n.holdings, a, c)
                        }),
                            c.$typesList.removeClass("displayNone"),
                            c.$header.text(c.$header.attr("data-default-text"))),
                        n.watchlist.list || G.getList(c.pairId, function(a) {
                            j(n.watchlist, a, c)
                        }),
                            c.$statusMessage.addClass("displayNone"),
                            g(n.watchlist),
                            h(n.holdings),
                            e("Portfolio Tab Clicked")
                    }),
                    c.buttons.$close.click(k.hide),
                    c.createWatchlist = l(a.find(".js-create-watchlist-portfolio"), c, n.watchlist),
                    c.createHolding = m(a.find(".js-create-holdings-portfolio"), c, n.holdings),
                    B(n.holdings, c),
                    this.open = k.show,
                    this.forms = n,
                    this.setNewInstrument = function(a, b) {
                        return c.pairId = a,
                            delete n.watchlist.list,
                            delete n.holdings.positionData,
                            delete n.holdings.data,
                            d.extend(c, b),
                            this
                    }
            }
            this.close = k.hide,
                this.params = c,
                this.tooltip = k,
                this.setReverse = k.setReverse,
                this.appendTo = function(b) {
                    return k.hide(),
                        b.append(a),
                        this
                }
        }
    ;
    c([{
        type: "$",
        value: ".js-add-to-portfolio"
    }, {
        type: "component",
        value: "headers"
    }, {
        type: "component",
        value: "Holdings"
    }, {
        type: "component",
        value: "Watchlists"
    }, "siteData"]).ready(function(a, b, c, e, f) {
        F = c,
            G = e,
            H = f;
        var g = d(".js-inject-add-to-portfolio");
        a.each(function(c) {
            var d = a.eq(c);
            if (d.attr("data-pair-id")) {
                var e = new I(d);
                if (d.attr("data-is-main")) {
                    var f, h = d.parent();
                    b.onChange(function(a) {
                        a !== f && (f = a,
                            a ? (e.appendTo(g),
                                e.setReverse(!1)) : (e.close(),
                                setTimeout(function() {
                                    e.appendTo(h),
                                        e.setReverse(!0)
                                }, 100)))
                    })
                }
            }
        })
    })
}(window, components, loader, jQuery);
// File: core/amounts-inputs.js
window.components.LocalAmountInput = loader([{
    type: "$",
    value: ".js-local-number"
}, {
    type: "component",
    value: "Numbers"
}], {
    isRepeatable: !0
}).ready(function(a, b) {
    "use strict";
    function c(a, b) {
        for (var c = 0, d = 0; d < a.length; d++)
            if (a[d] === b[c] && (c++,
                c === b.length))
                return d + 1;
        return a.length
    }
    function d(a) {
        return a >= 48 && 57 >= a ? (a - 48).toString() : a >= 96 && 105 >= a ? (a - 96).toString() : !1
    }
    function e(a) {
        return -1 !== j.indexOf(a)
    }
    function f(a) {
        return a.ctrlKey && -1 !== k.indexOf(a.keyCode)
    }
    function g(a) {
        return -1 !== l.indexOf(a)
    }
    function h(a, b, c, d) {
        return b === c ? 46 === d ? a.substring(0, b) + a.substring(b + 1) : a.substring(0, b - 1) + a.substring(b) : a.substring(0, b) + a.substring(c)
    }
    var i, j = [35, 36, 37, 39, 13, 16, 17, 18], k = [65, 67, 86, 88, 90], l = [46, 8], m = !1;
    a.not("[data-local-amount-bind]").attr("data-local-amount-bind", 1).keydown(function(a) {
        if (i = this.value || "",
            e(a.keyCode) || f(a))
            return m = !0,
                !0;
        var j, k;
        if (g(a.keyCode)) {
            var l = h(i, this.selectionStart, this.selectionEnd, a.keyCode);
            j = "" === l ? l : b.getNumericFromLocalNumber(l).toString();
            var n = 8 === a.keyCode ? this.selectionStart - 1 : this.selectionStart;
            k = b.getNumericFromLocalNumber(i.substring(0, n)).toString()
        } else {
            var o = d(a.keyCode);
            if (!o)
                return !1;
            k = b.getNumericFromLocalNumber(i.substring(0, this.selectionStart) + o).toString();
            var p = i.substring(this.selectionEnd);
            p && (p = b.getNumericFromLocalNumber(i.substring(this.selectionEnd)).toString()),
                j = k + p
        }
        return j.length > Number($(this).attr("maxlength") || 16) ? !1 : (this.value = b.getLocalNumber(j),
            this.selectionStart = this.selectionEnd = c(this.value, k),
            !1)
    }).keyup(function() {
        m && (m = !1,
        this.value && !b.isValidLocalNumber(this.value) && (this.value = i))
    }).each(function(c) {
        var d = a.eq(c);
        d.val(b.getLocalNumber(d.val()))
    })
});
// File: core/datepicker.js
function datepicker_getZindex(a) {
    return 8
}
function Datepicker() {
    this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: function(a, b, c) {
                var d = $.datepicker._getFromToDates(b);
                null == d && b.settings.controlBar || $(b.input).trigger("onClose", [a, b, d, c]),
                c && b.input.data("prevSelected", b.input.val()),
                b.settings.controlBar && !c && (b.input.val(b.input.data("prevSelected")),
                    $(b.settings.altField).text(b.input.val()))
            },
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        $.extend(this._defaults, this.regional[""]),
        this.regional.en = $.extend(!0, {}, this.regional[""]),
        this.regional["en-US"] = $.extend(!0, {}, this.regional.en),
        this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
}
function setMonthsLimits(a, b, c, d, e, f) {
    $(".monthsView td a", a).each(function(a) {
        $("span", this).text($.datepicker.regional[""].monthNamesShort[a % 12]),
        b && c >= b.getFullYear() && a % 12 > d && $(this).addClass("nonSelectable ui-datepicker-unselectable ui-state-disabled"),
        e && c <= e.getFullYear() && f > a % 12 && $(this).addClass("nonSelectable ui-datepicker-unselectable ui-state-disabled")
    })
}
function datepicker_bindHover(a) {
    var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return a.delegate(b, "mouseout", function() {
        $(this).removeClass("ui-state-hover"),
        -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"),
        -1 !== this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
    }).delegate(b, "mouseover", datepicker_handleMouseover)
}
function datepicker_handleMouseover() {
    $.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
        $(this).addClass("ui-state-hover"),
    -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"),
    -1 !== this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
}
function datepicker_extendRemove(a, b) {
    $.extend(a, b);
    for (var c in b)
        null == b[c] && (a[c] = b[c]);
    return a
}
function MyDatePicker(a, b, c, d, e, f) {
    var g = function(a) {
        return a.indexOf("Y") > -1 && -1 == a.indexOf("YY") && (a = a.replace("Y", "yy")),
        a.indexOf("m") > -1 && -1 == a.indexOf("mm") && (a = a.replace("m", "mm")),
        a.indexOf("d") > -1 && -1 == a.indexOf("dd") && (a = a.replace("d", "dd")),
            a
    };
    this.input = a,
        this.altField = b,
        this.format = g(c ? c : $.datepicker.regional[""].dateFormat),
        $.datepicker.regional[""].dateFormat = this.format,
        this.defaultDate = d instanceof Date ? $.datepicker.formatDate(this.format, d) : d,
        this.defaultDateTo = e instanceof Date ? $.datepicker.formatDate(this.format, e) : e,
        f = f || {
            custom: "Custom Dates",
            start: "Start Date",
            end: "End Date"
        };
    var h = {
        input: a,
        altField: b,
        format: this.format,
        dateFormat: this.format,
        defaultDate: this.defaultDate,
        defaultDateTo: this.defaultDateTo,
        duration: 300,
        translations: f,
        showOtherMonths: !1,
        closeOnSelect: !0,
        showButtonPanel: !1,
        numberOfMonths: 1,
        controlBar: !1,
        showAnim: "slideDown"
    }
        , i = {
        showButtonPanel: !0,
        numberOfMonths: 3,
        closeOnSelect: !1,
        controlBar: !0
    };
    this.setTrigger = function(a) {
        h.trigger = a
    }
        ,
        this.setPickerType = function(a) {
            2 == a && (h = $.extend(!0, h, i))
        }
        ,
        this.setRtl = function(a) {
            return h.isRTL = "rtl" == a.toLowerCase(),
                this
        }
        ,
        this.setApplyButtonText = function(a) {
            return $.datepicker._defaults.closeText = a,
                this
        }
        ,
        this.setMinDate = function(a) {
            h.minDate = a instanceof Date ? $.datepicker.formatDate(this.format, a) : a
        }
        ,
        this.setMaxDate = function(a) {
            return h.maxDate = a instanceof Date ? $.datepicker.formatDate(this.format, a) : a,
                this
        }
        ,
        this.setFirstDay = function(a) {
            return $.datepicker.regional[""].firstDay = h.firstDay = a,
                this
        }
        ,
        this.setDayNames = function(a) {
            return $.datepicker.regional[""].dayNames = $.datepicker.regional[""].dayNamesMin = h.dayNames = h.dayNamesShort = a,
                this
        }
        ,
        this.setMonthNames = function(a) {
            return $.datepicker.regional[""].monthNames = h.monthNames = a,
                this
        }
        ,
        this.setMonthNamesShort = function(a) {
            return $.datepicker.regional[""].monthNamesShort = h.monthNamesShort = a,
                this
        }
        ,
        this.set = function(a) {
            return $.extend(h, a),
                this
        }
        ,
        this.attachTo = function(b, c, d, e, f) {
            return $.datepicker.attachPositionToElement(b, c, d, e, f, a),
                this
        }
        ,
        this.alignToCenterOfDiv = function(a) {
            h.alignToCenterOfDiv = a
        }
        ,
        this.create = function() {
            return $(h.input).datepicker(h),
                $.datepicker._defaults = $.extend({}, $.datepicker._defaults, h),
                this
        }
}
!function(a) {
    function b(c, d) {
        if (0 > d && (d = 0),
            3 !== c.nodeType && d > 0) {
            for (var e = c.childNodes, f = 0, g = 0, h = 0; h < e.length; h++)
                if (g = a(e[h]).text().length,
                        f += g,
                    f >= d) {
                    c = e[h],
                        d -= f - g,
                        b(c, d);
                    break
                }
        } else
            window.getSelection().collapse(c, d)
    }
    a.fn.caret = function(a) {
        var c = this[0];
        if (!c)
            return this;
        var d = "true" === c.contentEditable;
        if (0 == arguments.length) {
            if (window.getSelection) {
                if (d) {
                    c.focus();
                    var e = window.getSelection().getRangeAt(0)
                        , f = e.cloneRange();
                    return f.selectNodeContents(c),
                        f.setEnd(e.endContainer, e.endOffset),
                        f.toString().length
                }
                return c.selectionStart
            }
            if (document.selection) {
                if (c.focus(),
                        d) {
                    var e = document.selection.createRange()
                        , f = document.body.createTextRange();
                    return f.moveToElementText(c),
                        f.setEndPoint("EndToEnd", e),
                        f.text.length
                }
                var a = 0
                    , g = c.createTextRange()
                    , f = document.selection.createRange().duplicate()
                    , h = f.getBookmark();
                for (g.moveToBookmark(h); 0 !== g.moveStart("character", -1); )
                    a++;
                return a
            }
            return c.selectionStart ? c.selectionStart : 0
        }
        if (-1 == a && (a = this[d ? "text" : "val"]().length),
                window.getSelection)
            d ? (c.focus(),
                b(c, a)) : c.setSelectionRange(a, a);
        else if (document.body.createTextRange)
            if (d) {
                var g = document.body.createTextRange();
                g.moveToElementText(c),
                    g.moveStart("character", a),
                    g.collapse(!0),
                    g.select()
            } else {
                var g = c.createTextRange();
                g.move("character", a),
                    g.select()
            }
        return d || c.focus(),
            this
    }
}(jQuery);
var datepicker_instActive;
Date.prototype.addDays = function(a) {
    var b = new Date(this.valueOf());
    return b.setDate(b.getDate() + a),
        b
}
    ,
    Date.prototype.addMonths = function(a) {
        var b = this.getDate();
        return this.setDate(1),
            this.setMonth(this.getMonth() + a),
            this.setDate(Math.min(b, this.getDaysInMonth())),
            this
    }
    ,
    Date.isLeapYear = function(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }
    ,
    Date.getDaysInMonth = function(a, b) {
        return [31, Date.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
    }
    ,
    Date.prototype.isLeapYear = function() {
        return Date.isLeapYear(this.getFullYear())
    }
    ,
    Date.prototype.getDaysInMonth = function() {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth())
    }
    ,
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _setSortableDates: function(a, b, c) {
            a.oppositeFlag = !1;
            var d = ""
                , e = this._get(a, "dateFormat");
            try {
                d = this.parseDate(e, b)
            } catch (f) {
                try {
                    d = this.parseDate(e.toLowerCase().replace("y", "yy"), b);
                    var g = /\d{4}/.exec(b)
                        , h = b.indexOf(g);
                    if (g) {
                        var i = c.val().substring(0, h) + c.val().substring(h + 2);
                        c.val(i)
                    }
                    var j = $("#startDate", a.dpDiv).val().length && $("#endDate", a.dpDiv).val().length ? " - " : "";
                    a.input.val($("#startDate", a.dpDiv).val() + j + $("#endDate", a.dpDiv).val()),
                        $(a.settings.altField).text(a.input.val())
                } catch (k) {
                    return a.oppositeFlag = !1,
                        !1
                }
            }
            if (d) {
                var l = this.formatDate("yymmdd", d);
                if (2 == a.sortableDate.length && (a.sortableDate = []),
                    1 == a.sortableDate.length && a.sortableDate[0] == l)
                    return;
                a.sortableDate.push(l),
                    a.oppositeFlag = 2 == a.sortableDate.length && a.sortableDate[0] > a.sortableDate[1],
                    a.sortableDate = a.sortableDate.sort()
            }
        },
        _getFromToDates: function(a, b) {
            if (!a || 0 == a.sortableDate.length)
                return null;
            b = b || this._get(a, "dateFormat");
            var c = 2 == a.sortableDate.length ? 1 : 0
                , d = this.parseDate("yymmdd", a.sortableDate[0])
                , e = this.parseDate("yymmdd", a.sortableDate[c]);
            return {
                dateFrom: d,
                dateTo: e,
                dateFromStr: this.formatDate(b, d),
                dateToStr: this.formatDate(b, e),
                dateFromSortable: a.sortableDate[0],
                dateToSortable: a.sortableDate[c]
            }
        },
        _getSortableDatebyAnchor: function(a) {
            var b = $(a).length > 1 ? $(a).not(".ui-state-highlight") : $(a)
                , c = $(b).text()
                , d = parseInt($(b).parent().attr("data-month")) + 1
                , e = 10 > c ? "0" + c : c
                , f = 10 > d ? "0" + d : d
                , g = $(b).parent().attr("data-year")
                , h = g + f + e;
            return h
        },
        _tryColorOnShowDates: function(a, b) {
            var c = this
                , d = $(a.input).data("dynamicInput");
            if (!a.settings.controlBar) {
                a.sortableDate = [];
                var e;
                try {
                    e = $.datepicker.parseDate(a.settings.format, a.input.val().trim())
                } catch (f) {
                    a.input.val(a.settings.defaultDate)
                } finally {
                    d && !e && a.input.val(a.settings.defaultDate)
                }
                $.datepicker._setSortableDates(a, a.input.val())
            }
            $(".ui-state-active").removeClass("addSelection ui-state-active");
            var g = this._getFromToDates(a);
            if (null == g)
                return null;
            var h = g.dateFromSortable
                , i = g.dateToSortable
                , j = $("a.ui-state-default").filter(function() {
                var a = c._getSortableDatebyAnchor(this);
                return a >= h && i >= a
            });
            $(j).addClass("addSelection ui-state-active")
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(a) {
            return datepicker_extendRemove(this._defaults, a || {}),
                this
        },
        _attachDatepicker: function(a, b) {
            var c, d, e;
            c = a.nodeName.toLowerCase(),
                d = "div" === c || "span" === c,
            a.id || (this.uuid += 1,
                a.id = "dp" + this.uuid),
                e = this._newInst($(a), d),
                e.settings = $.extend({}, b || {}),
                "input" === c ? this._connectDatepicker(a, e) : d && this._inlineDatepicker(a, e)
        },
        _newInst: function(a, b) {
            var c = a[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: c,
                input: a,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: b,
                dpDiv: b ? datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(a, b) {
            var c = $(a);
            b.append = $([]),
                b.trigger = $([]),
            c.hasClass(this.markerClassName) || (this._attachments(c, b),
                c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),
                this._autoSize(b),
                $.data(a, "datepicker", b),
            b.settings.disabled && this._disableDatepicker(a))
        },
        _attachments: function(a, b) {
            var c, d, e, f = this._get(b, "appendText"), g = this._get(b, "isRTL");
            b.append && b.append.remove(),
            f && (b.append = $("<span class='" + this._appendClass + "'>" + f + "</span>"),
                a[g ? "before" : "after"](b.append)),
                a.unbind("focus", this._showDatepicker),
            b.trigger && b.trigger.remove(),
                c = this._get(b, "showOn"),
            "focus" !== c && "both" !== c || a.focus(this._showDatepicker),
            "button" !== c && "both" !== c || (d = this._get(b, "buttonText"),
                e = this._get(b, "buttonImage"),
                b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: e,
                    alt: d,
                    title: d
                }) : $("<button type='button'></button>").addClass(this._triggerClass).html(e ? $("<img/>").attr({
                    src: e,
                    alt: d,
                    title: d
                }) : d)),
                a[g ? "before" : "after"](b.trigger),
                b.trigger.click(function() {
                    return $.datepicker._datepickerShowing && $.datepicker._lastInput === a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput !== a[0] ? ($.datepicker._hideDatepicker(),
                        $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]),
                        !1
                }))
        },
        _autoSize: function(a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b, c, d, e, f = new Date(2009,11,20), g = this._get(a, "dateFormat");
                g.match(/[DM]/) && (b = function(a) {
                    for (c = 0,
                             d = 0,
                             e = 0; e < a.length; e++)
                        a[e].length > c && (c = a[e].length,
                            d = e);
                    return d
                }
                    ,
                    f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                    f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())),
                    a.input.attr("size", this._formatDate(a, f).length)
            }
        },
        _inlineDatepicker: function(a, b) {
            var c = $(a);
            c.hasClass(this.markerClassName) || (c.addClass(this.markerClassName).append(b.dpDiv),
                $.data(a, "datepicker", b),
                this._setDate(b, this._getDefaultDate(b), !0),
                this._updateDatepicker(b),
                this._updateAlternate(b),
            b.settings.disabled && this._disableDatepicker(a),
                b.dpDiv.css("display", "block"),
                b.dpDiv.css("z-index", "10"))
        },
        _dialogDatepicker: function(a, b, c, d, e) {
            var f, g, h, i, j, k = this._dialogInst;
            return k || (this.uuid += 1,
                f = "dp" + this.uuid,
                this._dialogInput = $("<input type='text' id='" + f + "' style='position: absolute; top: -100px; width: 0px;'/>"),
                this._dialogInput.keydown(this._doKeyDown),
                $("body").append(this._dialogInput),
                k = this._dialogInst = this._newInst(this._dialogInput, !1),
                k.settings = {},
                $.data(this._dialogInput[0], "datepicker", k)),
                datepicker_extendRemove(k.settings, d || {}),
                b = b && b.constructor === Date ? this._formatDate(k, b) : b,
                this._dialogInput.val(b),
                this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null,
            this._pos || (g = document.documentElement.clientWidth,
                h = document.documentElement.clientHeight,
                i = document.documentElement.scrollLeft || document.body.scrollLeft,
                j = document.documentElement.scrollTop || document.body.scrollTop,
                this._pos = [g / 2 - 100 + i, h / 2 - 150 + j]),
                this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                k.settings.onSelect = c,
                this._inDialog = !0,
                this.dpDiv.addClass(this._dialogClass),
                this.dpDiv.css("z-index", "11"),
                this._showDatepicker(this._dialogInput[0]),
            $.blockUI && $.blockUI(this.dpDiv),
                $.data(this._dialogInput[0], "datepicker", k),
                this
        },
        _destroyDatepicker: function(a) {
            var b, c = $(a), d = $.data(a, "datepicker");
            c.hasClass(this.markerClassName) && (b = a.nodeName.toLowerCase(),
                $.removeData(a, "datepicker"),
                "input" === b ? (d.append.remove(),
                    d.trigger.remove(),
                    c.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== b && "span" !== b || c.removeClass(this.markerClassName).empty(),
            datepicker_instActive === d && (datepicker_instActive = null))
        },
        _enableDatepicker: function(a) {
            var b, c, d = $(a), e = $.data(a, "datepicker");
            d.hasClass(this.markerClassName) && (b = a.nodeName.toLowerCase(),
                "input" === b ? (a.disabled = !1,
                    e.trigger.filter("button").each(function() {
                        this.disabled = !1
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })) : "div" !== b && "span" !== b || (c = d.children("." + this._inlineClass),
                    c.children().removeClass("ui-state-disabled"),
                    c.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
                this._disabledInputs = $.map(this._disabledInputs, function(b) {
                    return b === a ? null : b
                }))
        },
        _disableDatepicker: function(a) {
            var b, c, d = $(a), e = $.data(a, "datepicker");
            d.hasClass(this.markerClassName) && (b = a.nodeName.toLowerCase(),
                "input" === b ? (a.disabled = !0,
                    e.trigger.filter("button").each(function() {
                        this.disabled = !0
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })) : "div" !== b && "span" !== b || (c = d.children("." + this._inlineClass),
                    c.children().addClass("ui-state-disabled"),
                    c.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
                this._disabledInputs = $.map(this._disabledInputs, function(b) {
                    return b === a ? null : b
                }),
                this._disabledInputs[this._disabledInputs.length] = a)
        },
        _isDisabledDatepicker: function(a) {
            if (!a)
                return !1;
            for (var b = 0; b < this._disabledInputs.length; b++)
                if (this._disabledInputs[b] === a)
                    return !0;
            return !1
        },
        _getInst: function(a) {
            try {
                return $.data(a, "datepicker")
            } catch (b) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(a, b, c) {
            var d, e, f, g, h = this._getInst(a);
            return 2 === arguments.length && "string" == typeof b ? "defaults" === b ? $.extend({}, $.datepicker._defaults) : h ? "all" === b ? $.extend({}, h.settings) : this._get(h, b) : null : (d = b || {},
            "string" == typeof b && (d = {},
                d[b] = c),
                void (h && (this._curInst === h && this._hideDatepicker(),
                    e = this._getDateDatepicker(a, !0),
                    f = this._getMinMaxDate(h, "min"),
                    g = this._getMinMaxDate(h, "max"),
                    datepicker_extendRemove(h.settings, d),
                null !== f && void 0 !== d.dateFormat && void 0 === d.minDate && (h.settings.minDate = this._formatDate(h, f)),
                null !== g && void 0 !== d.dateFormat && void 0 === d.maxDate && (h.settings.maxDate = this._formatDate(h, g)),
                "disabled"in d && (d.disabled ? this._disableDatepicker(a) : this._enableDatepicker(a)),
                    this._attachments($(a), h),
                    this._autoSize(h),
                    this._setDate(h, e),
                    this._updateAlternate(h),
                    this._updateDatepicker(h))))
        },
        _changeDatepicker: function(a, b, c) {
            this._optionDatepicker(a, b, c)
        },
        _refreshDatepicker: function(a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b)
        },
        _setDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b),
                this._updateDatepicker(c),
                this._updateAlternate(c))
        },
        _getDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            return c && !c.inline && this._setDateFromField(c, b),
                c ? this._getDate(c) : null
        },
        _doKeyDown: function(a) {
            var b, c, d, e = $.datepicker._getInst(a.target), f = !0, g = e.dpDiv.is(".ui-datepicker-rtl");
            if (e._keyEvent = !0,
                    $.datepicker._datepickerShowing)
                switch (a.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(),
                            f = !1;
                        break;
                    case 13:
                        return d = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", e.dpDiv),
                        d[0] && $.datepicker._selectDay(a.target, e.selectedMonth, e.selectedYear, d[0]),
                            b = $.datepicker._get(e, "onSelect"),
                            b ? (c = $.datepicker._formatDate(e),
                                b.apply(e.input ? e.input[0] : null, [c, e])) : $.datepicker._hideDatepicker(),
                            !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 35:
                        (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target),
                            f = a.ctrlKey || a.metaKey;
                        break;
                    case 36:
                        (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target),
                            f = a.ctrlKey || a.metaKey;
                        break;
                    case 37:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, g ? 1 : -1, "D"),
                            f = a.ctrlKey || a.metaKey,
                        a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 38:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"),
                            f = a.ctrlKey || a.metaKey;
                        break;
                    case 39:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, g ? -1 : 1, "D"),
                            f = a.ctrlKey || a.metaKey,
                        a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 40:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"),
                            f = a.ctrlKey || a.metaKey;
                        break;
                    default:
                        f = !1
                }
            else
                36 === a.keyCode && a.ctrlKey ? $.datepicker._showDatepicker(this) : f = !1;
            f && (a.preventDefault(),
                a.stopPropagation())
        },
        _doKeyPress: function(a) {
            var b, c, d = $.datepicker._getInst(a.target);
            return $.datepicker._get(d, "constrainInput") ? (b = $.datepicker._possibleChars($.datepicker._get(d, "dateFormat")),
                c = String.fromCharCode(null == a.charCode ? a.keyCode : a.charCode),
            a.ctrlKey || a.metaKey || " " > c || !b || b.indexOf(c) > -1) : void 0
        },
        _doKeyUp: function(a) {
            var b = $.datepicker._getInst(a.target);
            $(b.settings.altField).text(b.input.val());
            var c, d;
            $.datepicker._curInst.sortableDate = [],
                c = $("#startDate", b.dpDiv).val(),
                d = $("#endDate", b.dpDiv).val();
            var e = $("input:focus").attr("id")
                , f = $("#" + e)
                , g = f.caret();
            if ($.datepicker._curInst.sortableDate = [],
                0 == $.datepicker._setSortableDates(b, c, f) || "" == c || 0 == $.datepicker._setSortableDates(b, d, f) || "" == d)
                return $("#applyBtn", b.dpDiv).addClass("disabled"),
                    void $(".ui-state-active").removeClass("ui-state-active addSelection");
            $("#applyBtn", b.dpDiv).addClass("disabled");
            var h = $.datepicker._getFromToDates(b);
            return b.oppositeFlag ? ($("#startDate,#endDate", b.dpDiv).addClass("error"),
                $("#applyBtn", b.dpDiv).addClass("disabled")) : (h && $.datepicker._gotoDate(b.input, h.dateFrom.getMonth(), h.dateFrom.getFullYear()),
                $("#" + e).focus().caret(g)),
                !0
        },
        attachPositionToElement: function(a, b, c, d, e, f) {
            var g = {};
            g.corner = a,
                g.offsetLTR = b || 0,
                g.offsetRTL = c || 0,
                g.offsetTop = d || 1,
                g.otherElem = e,
                $(f).data("attachToElement", g)
        },
        _buildSortableDateArray: function(a, b) {
            a.sortableDate = [];
            var c = !1;
            try {
                var d = a.input.val().length / 2
                    , e = $.datepicker.parseDate(b, a.input.val().substring(0, d - 1).trim())
                    , f = $.datepicker.parseDate(b, a.input.val().substring(d + 1).trim());
                $.datepicker._setSortableDates(a, $.datepicker.formatDate(b, e)),
                e.getTime() != f.getTime() && $.datepicker._setSortableDates(a, $.datepicker.formatDate(b, f))
            } catch (g) {
                try {
                    var h = $.datepicker.parseDate(b, a.input.val().trim());
                    $.datepicker._setSortableDates(a, $.datepicker.formatDate(b, h))
                } catch (g) {
                    c = !0
                }
            } finally {
                this.firstOpen = c
            }
            return a.sortableDate != []
        },
        _showDatepicker: function(a) {
            if (1 == $(a).closest(".positionDetails.disabled").length)
                return !1;
            var b = $(a).data("attachToElement");
            if (void 0 === this.firstOpen && (this.firstOpen = !0),
                    a = a.target || a,
                "input" !== a.nodeName.toLowerCase() && (a = $("input", a.parentNode)[0]),
                !$.datepicker._isDisabledDatepicker(a) && $.datepicker._lastInput !== a) {
                var c, d, e, f, g, h, i;
                if (c = $.datepicker._getInst(a),
                    $.datepicker._curInst && $.datepicker._curInst !== c && ($.datepicker._curInst.dpDiv.stop(!0, !0),
                    c && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])),
                        d = $.datepicker._get(c, "beforeShow"),
                        e = d ? d.apply(a, [a, c]) : {},
                    e !== !1) {
                    if (datepicker_extendRemove(c.settings, e),
                            c.lastVal = null,
                            c.sortableDate = c.sortableDate || [],
                            $.datepicker._lastInput = a,
                        $.datepicker._inDialog && (a.value = ""),
                        $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a),
                            $.datepicker._pos[1] += a.offsetHeight),
                            f = !1,
                            $(a).parents().each(function() {
                                return f |= "fixed" === $(this).css("position"),
                                    !f
                            }),
                            g = {
                                left: $.datepicker._pos[0],
                                top: $.datepicker._pos[1]
                            },
                            $.datepicker._pos = null,
                            c.dpDiv.empty(),
                            c.dpDiv.css({
                                position: "absolute",
                                display: "block",
                                top: "-1000px"
                            }),
                            $.datepicker._updateDatepicker(c),
                            g = $.datepicker._checkOffset(c, g, f),
                        c.settings.altField && b) {
                        var j = b
                            , k = $(c.settings.altField);
                        b.otherElem && (k = $(b.otherElem));
                        var l = j.corner
                            , m = $.datepicker.regional[""].isRTL;
                        "string" == typeof m && (m = "rtl" == m.toLowerCase()),
                            l && "normal" != l ? "opposite" == l && (l = m ? "right" : "left") : l = m ? "left" : "right",
                            l = "right" == l;
                        var n = $("#ui-datepicker-div").outerWidth()
                            , o = $(k).outerWidth()
                            , p = l ? n - o : 0
                            , q = m ? j.offsetRTL : j.offsetLTR;
                        p += q,
                            g = {
                                left: $(k).offset().left - p,
                                top: $(k).offset().top + $(k).height() + j.offsetTop
                            }
                    }
                    if (c.settings.alignToCenterOfDiv) {
                        var r = $(c.settings.alignToCenterOfDiv).offset().left + $(c.settings.alignToCenterOfDiv).width() / 2 - $("#ui-datepicker-div").width() / 2
                            , s = $(c.settings.trigger).offset().top + $(c.settings.trigger).outerHeight();
                        g.left = r,
                            g.top = s
                    }
                    if (c.dpDiv.css({
                            position: $.datepicker._inDialog && $.blockUI ? "static" : f ? "fixed" : "absolute",
                            display: "none",
                            left: g.left + "px",
                            top: g.top + "px",
                            "z-index": 9
                        }),
                            !c.inline) {
                        h = $.datepicker._get(c, "showAnim"),
                            i = $.datepicker._get(c, "duration"),
                            c.dpDiv.css("z-index", 12),
                            $.datepicker._datepickerShowing = !0,
                            $.effects && $.effects.effect[h] ? c.dpDiv.show(h, $.datepicker._get(c, "showOptions"), i) : c.dpDiv[h || "show"](h ? i : null),
                            $.datepicker._shouldFocusInput(c),
                            $.datepicker._curInst = c,
                            c.dpDiv.css("z-index", 8);
                        if ("" != c.input.val()) {
                            var t = this._get(c, "dateFormat").toLowerCase();
                            this._buildSortableDateArray(c, t)
                        }
                        if (this.firstOpen && c.settings.defaultDate && (c.sortableDate = [],
                                $.datepicker._setSortableDates(c, c.settings.defaultDate),
                            c.settings.defaultDateTo && $.datepicker._setSortableDates(c, c.settings.defaultDateTo)),
                            2 == c.sortableDate.length) {
                            var u = $.datepicker._getFromToDates(c);
                            if (c.input.val(u.dateFromStr + " - " + u.dateToStr),
                                    $("#startDate", c.dpDiv).val(u.dateFromStr),
                                    $("#endDate", c.dpDiv).val(u.dateToStr),
                                    $.datepicker._gotoDate(c.input, u.dateFrom.getMonth(), u.dateFrom.getFullYear()),
                                    c.input.keyup(),
                                    c.settings.controlBar) {
                                var v = new Date;
                                if (v.getDate() <= 7 && $(c.input).val() == $(c.input).data("defaultStr")) {
                                    var w = v.addMonths(-1);
                                    $.datepicker._gotoDate(c.input, w.getMonth(), w.getFullYear())
                                }
                            }
                        }
                        if (1 == c.sortableDate.length) {
                            var u = $.datepicker._getFromToDates(c);
                            if ($("#startDate", c.dpDiv).val(u.dateFromStr),
                                    $("#endDate", c.dpDiv).val(u.dateFromStr),
                                    $.datepicker._gotoDate(c.input, u.dateFrom.getMonth(), u.dateFrom.getFullYear()),
                                    c.settings.controlBar) {
                                var v = new Date;
                                if (v.getDate() <= 7 && $(c.input).val() == $(c.input).data("defaultStr")) {
                                    var w = v.addMonths(-1);
                                    $.datepicker._gotoDate(c.input, w.getMonth(), w.getFullYear())
                                }
                            }
                        }
                        $.datepicker._tryColorOnShowDates(c),
                            this.firstOpen = !1,
                            $.datepicker._updateAlternate(c),
                            $("#startDate,#endDate", c.dpDiv).blur(),
                            $("#startDate", c.dpDiv).focus()
                    }
                    $(c.input).trigger("onShow")
                }
            }
        },
        _updateDatepicker: function(a) {
            var b = new RegExp(/[-\/\.]/).exec(this._get(a, "dateFormat"))[0];
            this.maxRows = 4,
                datepicker_instActive = a;
            var c = $("#startDate", a.dpDiv).val()
                , d = $("#endDate", a.dpDiv).val();
            a.dpDiv.empty().append(this._generateHTML(a)),
                $("#startDate", a.dpDiv).val(c),
                $("#endDate", a.dpDiv).val(d),
                $("#startDate,#endDate", a.dpDiv).keydown(function(a) {
                    switch (a.keyCode) {
                        case 189:
                        case 190:
                        case 191:
                            return $(this).val($(this).val() + b),
                                !1
                    }
                    return !0
                }),
                $("#startDate,#endDate", a.dpDiv).keyup(function(b) {
                    if (46 == b.keyCode || b.keyCode >= 48 || 8 == b.keyCode) {
                        var c = $("#startDate", a.dpDiv).val().length && $("#endDate", a.dpDiv).val().length ? " - " : "";
                        a.input.val($("#startDate", a.dpDiv).val() + c + $("#endDate", a.dpDiv).val()),
                            a.input.keyup()
                    }
                    return 27 == b.keyCode ? void $(a.settings.altField).click() : void (13 == b.keyCode && ($("#startDate,#endDate", a.dpDiv).blur(),
                        $("#applyBtn", a.dpDiv).click(),
                        $("#startDate.error,#endDate.error", a.dpDiv).first().focus().addClass("error")))
                }),
                $("#startDate,#endDate", a.dpDiv).blur(function(b) {
                    try {
                        $.datepicker.parseDate(a.settings.format, $(this).val())
                    } catch (c) {
                        try {
                            $.datepicker.parseDate(a.settings.format.toLowerCase().replace("y", "yy"), $(this).val())
                        } catch (d) {
                            $(this).addClass("error"),
                                $("#applyBtn", a.dpDiv).addClass("disabled")
                        }
                    }
                }),
                $("#startDate,#endDate", a.dpDiv).focus(function(a) {
                    $(this).removeClass("error")
                }),
                this._attachHandlers(a),
            a.input.data("prevSelected") || a.input.data("prevSelected", a.input.val()),
                $(".ui-datepicker-header,.ui-datepicker-header>a", a.dpDiv).click(function(b) {
                    $("#startDate,#endDate", a.dpDiv).blur()
                });
            var e, f = this._getNumberOfMonths(a), g = f[1], h = 17, i = a.dpDiv.find("." + this._dayOverClass + " a");
            i.length > 0 && datepicker_handleMouseover.apply(i.get(0)),
                a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            g > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + g).css("width", h * g + "em"),
                a.dpDiv[(1 !== f[0] || 1 !== f[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
            a === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(a),
            a.yearshtml && (e = a.yearshtml,
                setTimeout(function() {
                    e === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),
                        e = a.yearshtml = null
                }, 0))
        },
        _shouldFocusInput: function(a) {
            return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
        },
        _checkOffset: function(a, b, c) {
            var d = a.dpDiv.outerWidth()
                , e = a.dpDiv.outerHeight()
                , f = a.input ? a.input.outerWidth() : 0
                , g = a.input ? a.input.outerHeight() : 0
                , h = document.documentElement.clientWidth + (c ? 0 : $(document).scrollLeft())
                , i = document.documentElement.clientHeight + (c ? 0 : $(document).scrollTop());
            return b.left -= this._get(a, "isRTL") ? d - f : 0,
                b.left -= c && b.left === a.input.offset().left ? $(document).scrollLeft() : 0,
                b.top -= c && b.top === a.input.offset().top + g ? $(document).scrollTop() : 0,
                b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0),
                b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0),
                b
        },
        _findPos: function(a) {
            for (var b, c = this._getInst(a), d = this._get(c, "isRTL"); a && ("hidden" === a.type || 1 !== a.nodeType || $.expr.filters.hidden(a)); )
                a = a[d ? "previousSibling" : "nextSibling"];
            var e = c.settings.altField ? c.settings.altField : a;
            return b = $(e).offset(),
                [b.left, b.top]
        },
        _hideDatepicker: function(a, b) {
            var c, d, e, f, g = this._curInst;
            !g || a && g !== $.data(a, "datepicker") || this._datepickerShowing && (c = this._get(g, "showAnim"),
                d = this._get(g, "duration"),
                e = function() {
                    $.datepicker._tidyDialog(g)
                }
                ,
                $.effects && ($.effects.effect[c] || $.effects[c]) ? g.dpDiv.hide(c, $.datepicker._get(g, "showOptions"), d, e) : g.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e),
            c || e(),
                this._datepickerShowing = !1,
                f = this._get(g, "onClose"),
            f && f.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g, b]),
                this._lastInput = null,
            this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }),
            $.blockUI && ($.unblockUI(),
                $("body").append(this.dpDiv))),
                this._inDialog = !1)
        },
        _tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(a) {
            if ($.datepicker._curInst) {
                var b = $(a.target)
                    , c = $.datepicker._getInst(b[0]);
                (b[0].id === $.datepicker._mainDivId || 0 !== b.parents("#" + $.datepicker._mainDivId).length || b.hasClass($.datepicker.markerClassName) || b.closest("." + $.datepicker._triggerClass).length || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI) && (!b.hasClass($.datepicker.markerClassName) || $.datepicker._curInst === c) || $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(a, b, c) {
            var d = $(a)
                , e = this._getInst(d[0]);
            this._isDisabledDatepicker(d[0]) || (this._adjustInstDate(e, b + ("M" === c ? this._get(e, "showCurrentAtPos") : 0), c),
                this._updateDatepicker(e),
                this._tryColorOnShowDates(e))
        },
        _gotoToday: function(a) {
            var b, c = $(a), d = this._getInst(c[0]);
            this._get(d, "gotoCurrent") && d.currentDay ? (d.selectedDay = d.currentDay,
                d.drawMonth = d.selectedMonth = d.currentMonth,
                d.drawYear = d.selectedYear = d.currentYear) : (b = new Date,
                d.selectedDay = b.getDate(),
                d.drawMonth = d.selectedMonth = b.getMonth(),
                d.drawYear = d.selectedYear = b.getFullYear()),
                this._notifyChange(d),
                this._adjustDate(c)
        },
        _selectMonthYear: function(a, b, c) {
            var d = $(a)
                , e = this._getInst(d[0]);
            e["selected" + ("M" === c ? "Month" : "Year")] = e["draw" + ("M" === c ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10),
                this._notifyChange(e),
                this._adjustDate(d)
        },
        _selectDay: function(a, b, c, d) {
            var e, f = $(a);
            $(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(f[0]) || (e = this._getInst(f[0]),
                e.selectedDay = e.currentDay = $("a", d).html(),
                e.selectedMonth = e.currentMonth = b,
                e.selectedYear = e.currentYear = c,
                this._selectDate(a, this._formatDate(e, e.currentDay, e.currentMonth, e.currentYear)))
        },
        _clearDate: function(a) {
            var b = $(a);
            this._selectDate(b, "")
        },
        _selectDate: function(a, b) {
            var c, d = $(a), e = this._getInst(d[0]);
            if (b = null != b ? b : this._formatDate(e),
                e.input && e.input.val(b),
                    c = this._get(e, "onSelect"),
                    c ? c.apply(e.input ? e.input[0] : null, [b, e]) : e.input && e.input.trigger("change"),
                    e.inline ? this._updateDatepicker(e) : this._curInst.settings.closeOnSelect ? this._hideDatepicker() : this._updateDatepicker(e),
                    this._setSortableDates(e, b),
                this._curInst.settings.closeOnSelect && (this._hideDatepicker(),
                    this._tryColorOnShowDates(e)),
                2 == e.sortableDate.length) {
                $("#endDate", e.dpDiv).val(b);
                var f = this._getFromToDates(e, this._get(e, "dateFormat"));
                e.input.val(f.dateFromStr + " - " + f.dateToStr),
                    $("#startDate", e.dpDiv).val(f.dateFromStr),
                    $("#endDate", e.dpDiv).val(f.dateToStr),
                    this._tryColorOnShowDates(e)
            } else
                $("#startDate", e.dpDiv).val(b),
                    $("#endDate", e.dpDiv).val(b),
                    e.input.val(b + " - " + b);
            this._curInst.settings.closeOnSelect && e.input.val(b),
                this._updateAlternate(e)
        },
        _updateAlternate: function(a) {
            var b, c, d = this._get(a, "altField");
            d && (b = this._get(a, "altFormat") || this._get(a, "dateFormat"),
                c = a.input.val(),
                $(d).each(function() {
                    $(this).val(c).text(c)
                }))
        },
        noWeekends: function(a) {
            var b = a.getDay();
            return [b > 0 && 6 > b, ""]
        },
        iso8601Week: function(a) {
            var b, c = new Date(a.getTime());
            return c.setDate(c.getDate() + 4 - (c.getDay() || 7)),
                b = c.getTime(),
                c.setMonth(0),
                c.setDate(1),
            Math.floor(Math.round((b - c) / 864e5) / 7) + 1
        },
        parseDate: function(a, b, c) {
            if (null == a || null == b)
                throw "Invalid arguments";
            if (b = "object" == typeof b ? b.toString() : b + "",
                "" === b)
                return null;
            var d, e, f, g, h = 0, i = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff, j = "string" != typeof i ? i : (new Date).getFullYear() % 100 + parseInt(i, 10), k = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, l = (c ? c.dayNames : null) || this._defaults.dayNames, m = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, n = (c ? c.monthNames : null) || this._defaults.monthNames, o = -1, p = -1, q = -1, r = -1, s = !1, t = function(b) {
                var c = d + 1 < a.length && a.charAt(d + 1) === b;
                return c && d++,
                    c
            }, u = function(a) {
                var c = t(a)
                    , d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && c ? 4 : "o" === a ? 3 : 2
                    , e = "y" === a ? d : 1
                    , f = new RegExp("^\\d{" + e + "," + d + "}")
                    , g = b.substring(h).match(f);
                if (!g)
                    throw null;
                return h += g[0].length,
                    parseInt(g[0], 10)
            }, v = function(a, c, d) {
                var e = -1
                    , f = $.map(t(a) ? d : c, function(a, b) {
                    return [[b, a]]
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length)
                });
                if ($.each(f, function(a, c) {
                        var d = c[1];
                        return b.substr(h, d.length).toLowerCase() === d.toLowerCase() ? (e = c[0],
                            h += d.length,
                            !1) : void 0
                    }),
                    -1 !== e)
                    return e + 1;
                throw "Unknown name at position " + h
            }, w = function() {
                if (b.charAt(h) !== a.charAt(d))
                    throw "";
                h++
            };
            for (d = 0; d < a.length; d++)
                if (s)
                    "'" !== a.charAt(d) || t("'") ? w() : s = !1;
                else
                    switch (a.charAt(d)) {
                        case "d":
                            q = u("d");
                            break;
                        case "D":
                            v("D", k, l);
                            break;
                        case "o":
                            r = u("o");
                            break;
                        case "m":
                            p = u("m");
                            break;
                        case "M":
                            p = v("M", m, n);
                            break;
                        case "y":
                            o = u("y");
                            break;
                        case "@":
                            g = new Date(u("@")),
                                o = g.getFullYear(),
                                p = g.getMonth() + 1,
                                q = g.getDate();
                            break;
                        case "!":
                            g = new Date((u("!") - this._ticksTo1970) / 1e4),
                                o = g.getFullYear(),
                                p = g.getMonth() + 1,
                                q = g.getDate();
                            break;
                        case "'":
                            t("'") ? w() : s = !0;
                            break;
                        default:
                            w()
                    }
            if (h < b.length && (f = b.substr(h),
                    !/^\s+/.test(f)))
                throw "";
            if (-1 === o ? o = (new Date).getFullYear() : 100 > o && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (j >= o ? 0 : -100)),
                r > -1)
                for (p = 1,
                         q = r; ; ) {
                    if (e = this._getDaysInMonth(o, p - 1),
                        e >= q)
                        break;
                    p++,
                        q -= e
                }
            if (g = this._daylightSavingAdjust(new Date(o,p - 1,q)),
                g.getFullYear() !== o || g.getMonth() + 1 !== p || g.getDate() !== q)
                throw "";
            return g
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(a, b, c) {
            if (!b)
                return "";
            var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = function(b) {
                var c = d + 1 < a.length && a.charAt(d + 1) === b;
                return c && d++,
                    c
            }, j = function(a, b, c) {
                var d = "" + b;
                if (i(a))
                    for (; d.length < c; )
                        d = "0" + d;
                return d
            }, k = function(a, b, c, d) {
                return i(a) ? d[b] : c[b]
            }, l = "", m = !1;
            if (b)
                for (d = 0; d < a.length; d++)
                    if (m)
                        "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
                    else
                        switch (a.charAt(d)) {
                            case "d":
                                l += j("d", b.getDate(), 2);
                                break;
                            case "D":
                                l += k("D", b.getDay(), e, f);
                                break;
                            case "o":
                                l += j("o", Math.round((new Date(b.getFullYear(),b.getMonth(),b.getDate()).getTime() - new Date(b.getFullYear(),0,0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                l += j("m", b.getMonth() + 1, 2);
                                break;
                            case "M":
                                l += k("M", b.getMonth(), g, h);
                                break;
                            case "y":
                                l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                                break;
                            case "@":
                                l += b.getTime();
                                break;
                            case "!":
                                l += 1e4 * b.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                i("'") ? l += "'" : m = !0;
                                break;
                            default:
                                l += a.charAt(d)
                        }
            return l
        },
        _possibleChars: function(a) {
            var b, c = "", d = !1, e = function(c) {
                var d = b + 1 < a.length && a.charAt(b + 1) === c;
                return d && b++,
                    d
            };
            for (b = 0; b < a.length; b++)
                if (d)
                    "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
                else
                    switch (a.charAt(b)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            c += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            e("'") ? c += "'" : d = !0;
                            break;
                        default:
                            c += a.charAt(b)
                    }
            return c
        },
        _get: function(a, b) {
            return void 0 !== a.settings[b] ? a.settings[b] : this._defaults[b]
        },
        _setDateFromField: function(a, b) {
            if (a.input.val() !== a.lastVal) {
                var c = this._get(a, "dateFormat")
                    , d = a.lastVal = a.input ? a.input.val() : null
                    , e = this._getDefaultDate(a)
                    , f = e
                    , g = this._getFormatConfig(a);
                try {
                    f = this.parseDate(c, d, g) || e
                } catch (h) {
                    return void (f = "")
                }
                a.selectedDay = f.getDate(),
                    a.drawMonth = a.selectedMonth = f.getMonth(),
                    a.drawYear = a.selectedYear = f.getFullYear(),
                    a.currentDay = d ? f.getDate() : 0,
                    a.currentMonth = d ? f.getMonth() : 0,
                    a.currentYear = d ? f.getFullYear() : 0,
                    this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function(a, b, c) {
            var d = function(a) {
                var b = new Date;
                return b.setDate(b.getDate() + a),
                    b
            }
                , e = function(b) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a))
                } catch (c) {}
                for (var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b); i; ) {
                    switch (i[2] || "d") {
                        case "d":
                        case "D":
                            g += parseInt(i[1], 10);
                            break;
                        case "w":
                        case "W":
                            g += 7 * parseInt(i[1], 10);
                            break;
                        case "m":
                        case "M":
                            f += parseInt(i[1], 10),
                                g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
                            break;
                        case "y":
                        case "Y":
                            e += parseInt(i[1], 10),
                                g = Math.min(g, $.datepicker._getDaysInMonth(e, f))
                    }
                    i = h.exec(b)
                }
                return new Date(e,f,g)
            }
                , f = null == b || "" === b ? c : "string" == typeof b ? e(b) : "number" == typeof b ? isNaN(b) ? c : d(b) : new Date(b.getTime());
            return f = f && "Invalid Date" === f.toString() ? c : f,
            f && (f.setHours(0),
                f.setMinutes(0),
                f.setSeconds(0),
                f.setMilliseconds(0)),
                this._daylightSavingAdjust(f)
        },
        _daylightSavingAdjust: function(a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0),
                a) : null
        },
        _setDate: function(a, b, c) {
            var d = !b
                , e = a.selectedMonth
                , f = a.selectedYear
                , g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
            a.selectedDay = a.currentDay = g.getDate(),
                a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(),
                a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(),
            e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a),
                this._adjustInstDate(a),
            a.input && a.input.val(d ? "" : this._formatDate(a))
        },
        _getDate: function(a) {
            var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
            return b
        },
        _gotoDate: function(a, b, c) {
            a.each(function(a, d) {
                var e = $.datepicker._getInst(d);
                e.drawMonth = e.selectedMonth = b,
                    e.drawYear = e.selectedYear = c,
                    $.datepicker._notifyChange(e),
                    $.datepicker._adjustDate(d, b)
            })
        },
        _attachHandlers: function(a) {
            var b = this;
            b.lastRegularView = b.lastRegularView || [];
            var c = this._get(a, "stepMonths")
                , d = "#" + a.id.replace(/\\\\/g, "\\");
            a.dpDiv.find("[data-handler]").map(function() {
                var e = {
                    prev: function() {
                        var a = $.datepicker._getMinMaxDate($.datepicker._curInst, "min")
                            , b = $.datepicker._getMinMaxDate($.datepicker._curInst, "max")
                            , e = b ? b.getFullYear() : 9999
                            , f = a ? a.getFullYear() : 0
                            , g = a ? a.getMonth() : 0
                            , h = b ? b.getMonth() : 14
                            , i = $(this).closest(".ui-datepicker-group");
                        if ($(".monthsView", i).length) {
                            var j = parseInt($(".ui-datepicker-year", i).text());
                            return $(".monthsView td a", i).removeClass("nonSelectable ui-datepicker-unselectable ui-state-disabled"),
                                setMonthsLimits(i, b, j, h, a, g),
                                $(".monthsView td a:first", i).is(".nonSelectable") ? !1 : (j--,
                                    $(".ui-datepicker-year", i).text(j),
                                    $(".monthsView td a", i).removeClass("nonSelectable ui-datepicker-unselectable ui-state-disabled"),
                                    setMonthsLimits(i, b, j, h, a, g),
                                    !1)
                        }
                        if ($(".yearsView", i).length) {
                            var j = parseInt($(".ui-datepicker-year", i).text())
                                , k = parseInt($(".yearsView a>span:first", i).text());
                            if (f >= k)
                                return !1;
                            var l = j - 10;
                            return $(i).find(".ui-datepicker-year").text(l),
                                $(i).find(".yearsView td>a").each(function(a) {
                                    var b = parseInt($("span", this).text()) - 12;
                                    $(this).attr("year", b),
                                        b > e || f > b ? $(this).addClass("nonSelectable ui-datepicker-unselectable ui-state-disabled") : $(this).removeClass("nonSelectable ui-datepicker-unselectable ui-state-disabled"),
                                        $("span", this).text(b)
                                }),
                                $(".ui-datepicker-year", i).text($(".yearsView td>a>span:first", i).text()),
                                !1
                        }
                        $.datepicker._adjustDate(d, -c, "M")
                    },
                    next: function() {
                        var a = $.datepicker._getMinMaxDate($.datepicker._curInst, "min")
                            , b = $.datepicker._getMinMaxDate($.datepicker._curInst, "max")
                            , e = b ? b.getFullYear() : 9999
                            , f = a ? a.getFullYear() : 0
                            , g = a ? a.getMonth() : 0
                            , h = b ? b.getMonth() : 14
                            , i = $(this).closest(".ui-datepicker-group");
                        if ($(".monthsView", i).length) {
                            var j = parseInt($(".ui-datepicker-year", i).text());
                            return $(".monthsView td a", i).removeClass("nonSelectable ui-datepicker-unselectable ui-state-disabled"),
                                setMonthsLimits(i, b, j, h, a, g),
                                $(".monthsView td a:last", i).is(".nonSelectable") ? !1 : (j++,
                                    $(".ui-datepicker-year", i).text(j),
                                    setMonthsLimits(i, b, j, h, a, g),
                                    !1)
                        }
                        if ($(".yearsView", i).length) {
                            var k = $(".yearsView td>a>span:last", i).text();
                            return k >= e ? !1 : ($(".yearsView td>a", i).each(function() {
                                var a = parseInt($("span", this).text()) + 12;
                                $(this).attr("year", a),
                                    a > e || f > a ? $(this).addClass("nonSelectable ui-datepicker-unselectable ui-state-disabled") : $(this).removeClass("nonSelectable ui-datepicker-unselectable ui-state-disabled"),
                                    $("span", this).text(a)
                            }),
                                $(".ui-datepicker-year", i).text($(".yearsView td>a>span:first", i).text()),
                                !1)
                        }
                        $.datepicker._adjustDate(d, +c, "M")
                    },
                    hide: function() {
                        return $(this).is(".disabled") ? !1 : void $.datepicker._hideDatepicker(null, !0)
                    },
                    today: function() {
                        $.datepicker._gotoToday(d)
                    },
                    selectDay: function() {
                        return $.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                            !1
                    },
                    selectMonth: function() {
                        return $.datepicker._selectMonthYear(d, this, "M"),
                            !1
                    },
                    selectYear: function() {
                        return $.datepicker._selectMonthYear(d, this, "Y"),
                            !1
                    },
                    toMonths: function(c, d) {
                        var e = $.datepicker._getMinMaxDate($.datepicker._curInst, "min")
                            , f = $.datepicker._getMinMaxDate($.datepicker._curInst, "max")
                            , g = e ? e.getMonth() : 0
                            , h = f ? f.getMonth() : 14
                            , i = $(this).closest(".ui-datepicker-group").index()
                            , j = $(this).closest(".ui-datepicker-group");
                        d = d || $(".ui-datepicker-year", j).text();
                        var k = this;
                        b.lastRegularView[i] = $(this).closest(".ui-datepicker-group").find(">table"),
                            j.find(">table").replaceWith(monthsView.clone()),
                            $(this).attr("data-handler", "toYears"),
                            $(".ui-datepicker-month", this).hide(),
                        d && $(".ui-datepicker-year", j).text(d),
                            a.dpDiv.find("[data-handler]").unbind(),
                            b._attachHandlers(a),
                            setMonthsLimits(j, f, d, h, e, g),
                            $(".monthsView td a", j).unbind().click(function() {
                                if ($(this).is(".nonSelectable"))
                                    return !1;
                                var c = $(this).parent().parent().index()
                                    , d = 4 * c + $(this).index()
                                    , e = parseInt($(".ui-datepicker-year", k).text());
                                return b._gotoDate(b._curInst.input, d, e),
                                    $(".ui-datepicker-header,.ui-datepicker-header>a", a.dpDiv).click(function(b) {
                                        $("#startDate,#endDate", a.dpDiv).blur()
                                    }),
                                    $("#startDate,#endDate", a.dpDiv).blur(),
                                    !1
                            })
                    },
                    toYears: function() {
                        var c = ($(this).closest(".ui-datepicker-group").index(),
                            $(this).closest(".ui-datepicker-group"))
                            , d = yearsView.clone()
                            , e = $.datepicker._getMinMaxDate($.datepicker._curInst, "min")
                            , f = $.datepicker._getMinMaxDate($.datepicker._curInst, "max")
                            , g = f ? f.getFullYear() : 9999
                            , h = e ? e.getFullYear() : 0;
                        return $("td>a", d).each(function(a) {
                            var b = parseInt($(".ui-datepicker-year", c).text()) + a - 10;
                            $(this).attr("year", b),
                                b > g || h > b ? $(this).addClass("nonSelectable ui-datepicker-unselectable ui-state-disabled") : $(this).removeClass("nonSelectable ui-datepicker-unselectable ui-state-disabled"),
                                $("span", this).text(b)
                        }),
                            c.find(">table").replaceWith(d),
                            $(this).attr("data-handler", "toNormal"),
                            $(".ui-datepicker-month", this).hide(),
                            a.dpDiv.find("[data-handler]").unbind(),
                            b._attachHandlers(a),
                            $(".yearsView td a", c).unbind().click(function(d) {
                                if (d.preventDefault(),
                                        d.stopPropagation(),
                                        $(this).is(".ui-state-disabled"))
                                    return !1;
                                var e = parseInt($(">span", this).text());
                                a.dpDiv.find("[data-handler]").unbind(),
                                    c.find(".ui-datepicker-title").attr("data-handler", "toMonths"),
                                    b._attachHandlers(a),
                                    c.find(".ui-datepicker-title").trigger("click", [e])
                            }),
                            $(".ui-datepicker-header,.ui-datepicker-header>a", a.dpDiv).click(function(b) {
                                $("#startDate,#endDate", a.dpDiv).blur()
                            }),
                            !1
                    },
                    toNormal: function() {
                        var c = $(this).closest(".ui-datepicker-group").index();
                        $(this).closest(".ui-datepicker-group").find(">table").replaceWith(b.lastRegularView[c].clone()),
                            $(this).attr("data-handler", "toMonths"),
                            $(".ui-datepicker-month", this).show(),
                            a.dpDiv.find("[data-handler]").unbind(),
                            b._attachHandlers(a),
                            $(".ui-datepicker-header,.ui-datepicker-header>a", a.dpDiv).click(function(b) {
                                $("#startDate,#endDate", a.dpDiv).blur()
                            })
                    }
                };
                $(this).unbind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")]).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(a) {
            if (!a.currentYear) {
                var b = this._get(a, "dateFormat")
                    , c = a.input.val()
                    , d = new Date;
                try {
                    d = this.parseDate(b, c)
                } catch (e) {}
                a.selectedDay = d.getDate(),
                    a.drawMonth = a.selectedMonth = d.getMonth(),
                    a.drawYear = a.selectedYear = d.getFullYear(),
                    a.currentDay = c ? d.getDate() : 0,
                    a.currentMonth = c ? d.getMonth() : 0,
                    a.currentYear = c ? d.getFullYear() : 0
            }
            var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S = this._get(a, "controlBar"), T = new Date, U = this._daylightSavingAdjust(new Date(T.getFullYear(),T.getMonth(),T.getDate())), V = this._get(a, "isRTL"), W = this._get(a, "showButtonPanel"), X = this._get(a, "hideIfNoPrevNext"), Y = this._get(a, "navigationAsDateFormat"), Z = this._getNumberOfMonths(a), $ = 0, _ = this._get(a, "stepMonths"), aa = !0, ba = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear,a.currentMonth,a.currentDay) : new Date(9999,9,9)), ca = this._getMinMaxDate(a, "min"), da = this._getMinMaxDate(a, "max"), ea = a.drawMonth - $, fa = a.drawYear;
            if (0 > ea && (ea += 12,
                    fa--),
                    da) {
                f = this._daylightSavingAdjust(new Date(da.getFullYear(),da.getMonth() - Z[0] * Z[1] + 1,da.getDate())),
                    f = ca && ca > f ? ca : f;
                for (var T = a.settings.controlBar ? f.addMonths(1) : f; this._daylightSavingAdjust(new Date(fa,ea,1)) > T; )
                    ea--,
                    0 > ea && (ea = 11,
                        fa--)
            }
            for (a.drawMonth = ea,
                     a.drawYear = fa,
                     g = this._get(a, "prevText"),
                     g = Y ? this.formatDate(g, this._daylightSavingAdjust(new Date(fa,ea - _,1)), this._getFormatConfig(a)) : g,
                     h = this._canAdjustMonth(a, -1, fa, ea) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + g + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "e" : "w") + "'>" + g + "</span></a>" : X ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + g + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "e" : "w") + "'>" + g + "</span></a>",
                     i = this._get(a, "nextText"),
                     i = Y ? this.formatDate(i, this._daylightSavingAdjust(new Date(fa,ea + _,1)), this._getFormatConfig(a)) : i,
                     j = "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "w" : "e") + "'>" + i + "</span></a>",
                     k = this._get(a, "currentText"),
                     l = this._get(a, "gotoCurrent") && a.currentDay ? ba : U,
                     k = Y ? this.formatDate(k, l, this._getFormatConfig(a)) : k,
                     m = a.inline ? "" : "<a href='javascript:void(0)' id='applyBtn' class='newBtn Arrow LightGray float_lang_base_2' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>",
                     n = W ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (V ? m : "") + (this._isInRange(a, l) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "</button>" : "") + (V ? "" : m) + "</div>" : "",
                     o = parseInt(this._get(a, "firstDay"), 10),
                     o = isNaN(o) ? 0 : o,
                     p = this._get(a, "showWeek"),
                     q = this._get(a, "dayNames"),
                     r = this._get(a, "dayNamesMin"),
                     s = this._get(a, "monthNames"),
                     t = this._get(a, "monthNamesShort"),
                     u = this._get(a, "beforeShowDay"),
                     v = this._get(a, "showOtherMonths"),
                     w = this._get(a, "selectOtherMonths"),
                     x = this._getDefaultDate(a),
                     y = "",
                     A = 0; A < Z[0]; A++) {
                for (B = "",
                         this.maxRows = 4,
                         C = 0; C < Z[1]; C++) {
                    if (D = this._daylightSavingAdjust(new Date(fa,ea,a.selectedDay)),
                            E = " ui-corner-all",
                            F = "",
                            aa) {
                        if (F += "<div class='ui-datepicker-group",
                            Z[1] > 1)
                            switch (C) {
                                case 0:
                                    F += " ui-datepicker-group-first",
                                        E = " ui-corner-" + (V ? "right" : "left");
                                    break;
                                case Z[1] - 1:
                                    F += " ui-datepicker-group-last",
                                        E = " ui-corner-" + (V ? "left" : "right");
                                    break;
                                default:
                                    F += " ui-datepicker-group-middle",
                                        E = ""
                            }
                        F += "'>"
                    }
                    if (!S || C > 0) {
                        for (F += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + E + "'>" + (/all|left/.test(E) && 0 === A,
                            V ? j : h) + (/all|right/.test(E) && 0 === A,
                            V ? h : j) + this._generateMonthYearHeader(a, ea, fa, ca, da, A > 0 || C > 0, s, t) + "</div><table class='ui-datepicker-calendar'><thead><tr>",
                                 G = p ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "",
                                 z = 0; 7 > z; z++)
                            H = (z + o) % 7,
                                G += "<th scope='col'" + ((z + o + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + q[H] + "'>" + q[H] + "</span></th>";
                        for (F += G + "</tr></thead><tbody>",
                                 I = this._getDaysInMonth(fa, ea),
                             fa === a.selectedYear && ea === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, I)),
                                 J = (this._getFirstDayOfMonth(fa, ea) - o + 7) % 7,
                                 K = Math.ceil((J + I) / 7),
                                 L = aa && this.maxRows > K ? this.maxRows : K,
                                 this.maxRows = L,
                                 M = this._daylightSavingAdjust(new Date(fa,ea,1 - J)),
                                 N = 0; L > N; N++) {
                            for (F += "<tr>",
                                     O = p ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(M) + "</td>" : "",
                                     z = 0; 7 > z; z++)
                                P = u ? u.apply(a.input ? a.input[0] : null, [M]) : [!0, ""],
                                    Q = M.getMonth() !== ea,
                                    R = Q && !w || !P[0] || ca && ca > M || da && M > da,
                                    O += "<td class='" + ((z + o + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (Q ? " ui-datepicker-other-month" : "") + (M.getTime() === D.getTime() && ea === a.selectedMonth && a._keyEvent || x.getTime() === M.getTime() && x.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Q && !v ? "" : " " + P[1] + (M.getTime() === ba.getTime() ? " " + this._currentClass : "") + (M.getTime() === U.getTime() ? " ui-datepicker-today" : "")) + "'" + (Q && !v || !P[2] ? "" : " title='" + P[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + M.getMonth() + "' data-year='" + M.getFullYear() + "'") + ">" + (Q && !v ? "&#xa0;" : R ? "<span class='ui-state-default'>" + M.getDate() + "</span>" : "<a class='ui-state-default" + (M.getTime() === U.getTime() ? " ui-state-highlight" : "") + (M.getTime() === ba.getTime() ? " ui-state-active" : "") + (Q ? " ui-priority-secondary" : "") + "' href='#'>" + M.getDate() + "</a>") + "</td>",
                                    M.setDate(M.getDate() + 1),
                                    M = this._daylightSavingAdjust(M);
                            F += O + "</tr>"
                        }
                        ea++,
                        ea > 11 && (ea = 0,
                            fa++)
                    } else
                        F += '<div class="h3LikeTitle">' + a.settings.translations.custom + '</div><label for="startDate">' + a.settings.translations.start + '</label><input class="newInput" id="startDate"><label for="endDate">' + a.settings.translations.end + '</label><input class="newInput" id="endDate">';
                    F += "</tbody></table>" + (aa ? "</div>" + (Z[0] > 0 && C === Z[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""),
                        B += F
                }
                y += B
            }
            return y += n,
                a._keyEvent = !1,
                y
        },
        _generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"), r = this._get(a, "changeYear"), s = this._get(a, "showMonthAfterYear"), t = "<div data-event='click' data-handler='toMonths' class='ui-datepicker-title'>", u = "", v = $("html:first"), w = v.is(".cn") || v.is(".hk");
            if (w && (s = !0),
                f || !q)
                u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
            else {
                for (i = d && d.getFullYear() === c,
                         j = e && e.getFullYear() === c,
                         u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                         k = 0; 12 > k; k++)
                    (!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                u += "</select>"
            }
            if (s || (t += u + (!f && q && r ? "" : "&#xa0;")),
                    !a.yearshtml)
                if (a.yearshtml = "",
                    f || !r)
                    t += "<span class='ui-datepicker-year'>" + c + "</span>";
                else {
                    for (l = this._get(a, "yearRange").split(":"),
                             m = (new Date).getFullYear(),
                             n = function(a) {
                                 var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
                                 return isNaN(b) ? m : b
                             }
                             ,
                             o = n(l[0]),
                             p = Math.max(o, n(l[1] || "")),
                             o = d ? Math.max(o, d.getFullYear()) : o,
                             p = e ? Math.min(p, e.getFullYear()) : p,
                             a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; p >= o; o++)
                        a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                    a.yearshtml += "</select>",
                        t += a.yearshtml,
                        a.yearshtml = null
                }
            return t += this._get(a, "yearSuffix"),
            s && (t += (!f && q && r ? "" : decodeURIComponent("%E5%B9%B4")) + u),
                t += "</div>"
        },
        _adjustInstDate: function(a, b, c) {
            var d = a.drawYear + ("Y" === c ? b : 0)
                , e = a.drawMonth + ("M" === c ? b : 0)
                , f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0)
                , g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d,e,f)));
            a.selectedDay = g.getDate(),
                a.drawMonth = a.selectedMonth = g.getMonth(),
                a.drawYear = a.selectedYear = g.getFullYear(),
            "M" !== c && "Y" !== c || this._notifyChange(a)
        },
        _restrictMinMax: function(a, b) {
            var c = this._getMinMaxDate(a, "min")
                , d = this._getMinMaxDate(a, "max")
                , e = c && c > b ? c : b;
            return d && e > d ? d : e
        },
        _notifyChange: function(a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function(a) {
            var b = this._get(a, "numberOfMonths");
            return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
        },
        _getMinMaxDate: function(a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function(a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a,b,32)).getDate()
        },
        _getFirstDayOfMonth: function(a, b) {
            return new Date(a,b,1).getDay()
        },
        _canAdjustMonth: function(a, b, c, d) {
            var e = this._getNumberOfMonths(a)
                , f = this._daylightSavingAdjust(new Date(c,d + (0 > b ? b : e[0] * e[1]),1));
            return 0 > b && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())),
                this._isInRange(a, f)
        },
        _isInRange: function(a, b) {
            var c, d, e = this._getMinMaxDate(a, "min"), f = this._getMinMaxDate(a, "max"), g = null, h = null, i = this._get(a, "yearRange");
            return i && (c = i.split(":"),
                d = (new Date).getFullYear(),
                g = parseInt(c[0], 10),
                h = parseInt(c[1], 10),
            c[0].match(/[+\-].*/) && (g += d),
            c[1].match(/[+\-].*/) && (h += d)),
            (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h)
        },
        _getFormatConfig: function(a) {
            var b = this._get(a, "shortYearCutoff");
            return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10),
                {
                    shortYearCutoff: b,
                    dayNamesShort: this._get(a, "dayNamesShort"),
                    dayNames: this._get(a, "dayNames"),
                    monthNamesShort: this._get(a, "monthNamesShort"),
                    monthNames: this._get(a, "monthNames")
                }
        },
        _formatDate: function(a, b, c, d) {
            b || (a.currentDay = a.selectedDay,
                a.currentMonth = a.selectedMonth,
                a.currentYear = a.selectedYear);
            var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d,c,b)) : this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
        }
    }),
    $.fn.datepicker = function(a) {
        var b = $(this).selector;
        if (!this.length)
            return this;
        a.altField && (a.defaultDate && ($(b).val(a.defaultDate),
            $(a.altField).text(a.defaultDate),
        a.defaultDateTo && ($(b).val(a.defaultDate + " - " + a.defaultDateTo),
            $(a.altField).text(a.defaultDate + " - " + a.defaultDateTo))),
            $(b).data("defaultStr", $(b).val()),
            a.trigger = a.trigger || "",
            $(a.altField + "," + a.trigger).click(function(a) {
                var c = $("#ui-datepicker-div").is(":visible") ? "hide" : "show";
                return $(b).datepicker(c),
                    !1
            })),
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick),
            $.datepicker.initialized = !0),
        0 === $("#" + $.datepicker._mainDivId).length && $("body").append($.datepicker.dpDiv);
        var c = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof a || "isDisabled" !== a && "getDate" !== a && "widget" !== a ? "option" === a && 2 === arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(c)) : this.each(function() {
            "string" == typeof a ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(c)) : $.datepicker._attachDatepicker(this, a)
        }) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(c))
    }
    ,
    $.datepicker = new Datepicker,
    $.datepicker.initialized = !1,
    $.datepicker.uuid = (new Date).getTime(),
    $.datepicker.version = "1.11.4";
var datepicker = $.datepicker
    , monthsView = $('<table data-event="click" data-handler="toYears" class="ui-datepicker-calendar monthsView"><tbody><tr><td colspan="9" class="arial_11"><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;"><span>Jan.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" class=""><span>Feb.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" class=""><span>Mar.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;"><span>Apr.</span></a></td></tr><tr><td colspan="9" class="arial_11"><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" class=""><span>May</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" class=""><span>Jun.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" class=""><span>Jul.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;"><span>Aug.</span></a></td></tr><tr><td colspan="9" class="arial_11"><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" class=""><span>Sep.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;"><span>Oct.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" class=""><span>Nov.</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;"><span>Dec.</span></a></td></tr></tbody></table>')
    , yearsView = $('<table data-event="click" data-handler="toNormal" class="ui-datepicker-calendar yearsView" style="display: table; opacity: 1;"><tbody><tr><td colspan="9" class="arial_11"><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2005" class=""><span>2005</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2006" class=""><span>2006</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2007" class=""><span>2007</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2008" class=""><span>2008</span></a></td></tr><tr><td colspan="9" class="arial_11"><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2009" class=""><span>2009</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2010" class=""><span>2010</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2011"><span>2011</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2012" class=""><span>2012</span></a></td></tr><tr><td colspan="9" class="arial_11"><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2013" class=""><span>2013</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2014" class=""><span>2014</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2015" class=""><span>2015</span></a><a href="#" style="display:inline-block !important; *display:inline; *zoom:1;" year="2016"><span>2016</span></a></td></tr></tbody></table>');
// File: core/domain-notifications.js
loader(["socketConnector", {
    type: "component",
    value: "notificationBar"
}, "Storage"]).ready(function(a, b, c) {
    function d() {
        var a = new Date(Date.now() - 216e7);
        for (var b in j)
            a > new Date(j[b]) && delete j[b];
        e()
    }
    function e() {
        c.set(i, j)
    }
    function f(a) {
        j[a] = Date.now(),
            e()
    }
    function g(a) {
        return a.type + (a.ID || a.hash || "")
    }
    function h(a) {
        var c = g(a);
        j[c] || (f(c),
            b.addItem(a).timeout(36e5))
    }
    var i = "InvestingDomainNotifications"
        , j = c.get(i);
    j && "object" == typeof j ? d() : j = {},
        a.on("domain", function(a) {
            a.forceUpdate ? setTimeout(function() {
                window.location.reload()
            }, 1e3 * (Math.floor(100 * Math.random()) + 1)) : h(a)
        })
});
// File: core/email-confirmation.js
!function(a, b) {
    "use strict";
    function c(b, c) {
        c && (a.Translate.setDictionary("emailConfirmation", c),
            d[b] = !0)
    }
    var d = {
        resend: !1,
        changeEmail: !1,
        verifyCode: !1
    }
        , e = {
        resend: function(a) {
            b.ajax({
                url: "/members-admin/service/sendActivationMail",
                type: "POST",
                data: {
                    includeTranslations: !d.resend
                },
                dataType: "json"
            }).done(function(b) {
                c("resend", b && b.dictionary),
                    a(b)
            })
        },
        changeEmail: function(a, e) {
            Validator.prototype.isValid(a, "email") && b.ajax({
                url: "/members-admin/service/sendActivationMail",
                type: "POST",
                data: {
                    email: a,
                    includeTranslations: !d.changeEmail
                },
                dataType: "json"
            }).done(function(b) {
                b || (b = {
                    dictionary: null
                }),
                    c("changeEmail", b.dictionary);
                var d = b.status.is("success") ? null : {
                    message: b.msg,
                    delay: b.delay
                };
                e(d, a)
            })
        },
        verifyCode: function(a, e) {
            b.ajax({
                url: "/members-admin/service/verifyEmailCode",
                type: "POST",
                data: {
                    code: a,
                    includeTranslations: !d.verifyCode
                },
                dataType: "json"
            }).done(function(a) {
                a || (a = {
                    dictionary: null
                }),
                    c("verifyCode", a.dictionary);
                var b = a.status.is("success") ? null : {
                    message: a.msg,
                    delay: a.delay
                };
                e(b, a)
            })
        },
        logout: function() {
            b.get("/members-admin/logout")
        }
    };
    a.EmailConfirmation = function(c) {
        function d() {
            a.GeneralOverlay.hide()
        }
        function f(a) {
            d(),
                overlay.overlayLogin(null, function() {
                    b("#signup *,#signingPopup *, #loginPopup *").css("opacity", ""),
                        b("#signup .loader").hide(),
                        a ? b("#serverErrors").text(a).removeClass("displayNone") : b("#serverErrors").addClass("displayNone")
                })
        }
        function g(a) {
            switch (a.message) {
                case "_ERROR_INVALID_SESSION":
                case "_ERROR_SESSION_EXPIRED":
                    f(q.get(a.message));
                    break;
                case "_ERROR_BLOCKED":
                    clearInterval(m || 0),
                        overlay.overlayClose();
                    break;
                case "_ERROR_ALREADY_VERIFIED":
                case "_ERROR_INVALID_PIN_CODE":
                case "_ERROR_MAX_ATTEMPTS_REACHED":
                case "_MAIL_SEND_FAILED":
                case "_INVALID_EMAIL":
                case "_ERROR_WAIT_TO_RETRY":
                    p = !0,
                        i(a.message, a.delay);
                    break;
                case "_ALREADY_LOGGED_IN":
                    window.location.reload();
                    break;
                case "_ERROR_EMAIL_EXISTS":
                    t._show(q.get(a.message)),
                        A = !1
            }
        }
        function h(a) {
            return parseInt(a / 60).padLeft(2) + ":" + (a % 60).padLeft(2)
        }
        function i(a, b) {
            0 >= b ? (y.toggle(!1, "changeMailButton"),
                u.removeClass(r),
                x.removeClass("disabled"),
            -1 !== q.get(a).indexOf("{x}") && s._hide(),
                p = !1,
                A = !1) : (j(q.get(a).replace("{x}", h(b))),
                y.toggle(!0, "changeMailButton"),
                o = setTimeout(i, 1e3, a, b - 1),
                A = !0,
                x.addClass("disabled")),
                w.trigger("keyup")
        }
        function j(a) {
            s._show(a),
                u.attr("data-tooltip", a).addClass(r)
        }
        function k(a) {
            window.ga && window.ga.loaded ? window.ga("allSitesTracker.send", "event", "Signup", "Email Verify Code", "Process Completion Validation", {
                hitCallback: function() {
                    authOnComplete(a)
                }
            }) : authOnComplete(a)
        }
        function l() {
            A || (x.addClass("disabled"),
                A = !0,
                e.verifyCode(w.val(), function(a, b) {
                    a ? g(a) : k(b)
                }))
        }
        var m, n = b(c), o = null, p = !1, q = new a.Translate("emailConfirmation"), r = "error beigeTooltip", s = n.find(".js-notification-box"), t = n.find(".js-changeMailNotification"), u = n.find("#user_emailRemark"), v = n.find(".js-change_email .js-change_email_btn"), w = n.find("#emailCode"), x = n.find(".js-submit-code"), y = loginFunctionsClassButtonDisability, z = !1, A = !1;
        n.find(".js-confSent .js-change_email_mode_btn, .js-cancelMailChange a").click(function(a) {
            n.find(".js-change_email")._toggleShow(),
                n.find(".js-confSent")._toggleShow()
        }),
            n.find(".js-confSent .js-resend_email_btn").click(function() {
                z || (z = !0,
                    p = !1,
                    e.resend(function(a) {
                        var b = a.delay
                            , c = a.msg
                            , d = a.status;
                        b ? (clearInterval(m || 0),
                            m = setInterval(function() {
                                if (!p) {
                                    var a = q.get(c).replace("{x}", h(--b));
                                    s._show(a)
                                }
                                1 > b && (z = !1,
                                    clearInterval(m),
                                p || s._hide())
                            }, 1e3)) : d.is("ERROR") ? (g({
                            message: c
                        }),
                            z = !1) : (s._show(q.get(c)),
                            z = !1)
                    }))
            }),
            v.click(function(a) {
                y.drawButton("changeMailButton"),
                y.isDisabled("changeMailButton") || (y.toggle(!0, "changeMailButton"),
                    e.changeEmail(n.find("#in_user_email").val(), function(a, b) {
                        y.toggle(!1, "changeMailButton"),
                            a ? g(a) : (n.find(".js-change_email")._hide(),
                                n.find(".js-confSent")._show(),
                                n.find(".js-sent-email").text(b))
                    }
                        .bind(this)))
            }),
            x.click(l),
            n.find("#in_user_email").keyup(function(a) {
                var c = b(this)
                    , d = c.val();
                Validator.prototype.isValid(d, "email") ? (u.removeClass("error"),
                    y.toggle(!1, "changeMailButton")) : (u.addClass("error"),
                    y.toggle(!0, "changeMailButton"))
            }),
            n.find(".js-close").click(d),
            n.find(".js-close-login").click(f),
            b("body").append(n),
            a.GeneralOverlay.hide().show({
                center: !0,
                $popup: n,
                onHide: function() {
                    o && clearTimeout(o),
                        n.remove(),
                        a.GeneralOverlay.setParams({}),
                        e.logout()
                }
            })
    }
}(components, jQuery);
// File: core/feed-alerts.js
!function(a, b, c) {
    "use strict";
    a.FeedAlerts = function(a) {
        a || (a = b(".js-feed-alert")),
            a.off("click.feed-alert").on("click.feed-alert", function(a) {
                b(a.target).is("a") || (c.location.href = b(this).find("a").attr("href"))
            })
    }
}(window.components, jQuery, window);
// File: core/first-party-data-popup.js
!function() {
    loader([{
        type: "$",
        value: ".js-userDataPopup"
    }, "Storage"]).ready(function(a, b) {
        function c() {
            a.addClass("hidden")
        }
        function d() {
            a.removeClass("hidden")
        }
        function e(a) {
            b.set("userDataUnavailableUntil", g + a)
        }
        var f = +b.get("userDataUnavailableUntil")
            , g = (new Date).getTime()
            , h = $("html").attr("lang") || "en";
        if (Number(b.get("pages")) >= 3 && h.substr(0, 2).is("en") && (!f || g > f)) {
            var i = a.find(".js-userDataPopup-questions")
                , j = a.find(".bugCloseIcon")
                , k = a.find(".js-userDataPopup-thankYou");
            j.click(function() {
                c(),
                    ga("allSitesTracker.send", "event", "Users Info", "Close", "X"),
                    e(6048e5)
            }),
                i.find(".buttons").click(function(a) {
                    var b = a.target.dataset.event || "";
                    e(31536e6),
                        i._hide(),
                        k._show(),
                        setTimeout(c, 3e3),
                        ga("allSitesTracker.send", "event", "User Info", b, {
                            metric3: 1,
                            dimension28: b
                        })
                }),
                setTimeout(d, 500)
        }
    })
}();
// File: core/ga.js
$(function() {
    function a() {
        $(".js-articles").each(function() {
            var a = $(this)
                , e = a.data("id")
                , f = 0;
            a.find("article").each(function() {
                var a = $(this);
                d = b(f, e),
                    a.find("a.title").click(c("Home Page News", "In Strip", "Headline - " + d)),
                    a.find("a.img").click(c("Home Page News", "In Strip", "Image - " + d)),
                    f++
            })
        })
    }
    function b(a, b) {
        return e[a + 4 * b] || a + 4 * b + 1 + "th"
    }
    function c(a, b, c) {
        return function() {
            ga("allSitesTracker.send", "event", a, b, c)
        }
    }
    var d, e = ["1st", "2nd", "3rd"], f = 0, g = c("Home Page News", "Main Image", "Clicked On Image"), h = c("Home Page News", "Main Image", "Clicked On Headline");
    $(".js-carousel-news").click(function(a) {
        var b = $(a.target);
        b.parents(".js-current-article").length && (b.is("a.title") && h(),
        (b.is("a.img") || b.isChildOf("a.img")) && g())
    }),
        $(".js-news-analysis").find("article").each(function() {
            var a = $(this);
            d = b(f, 0),
                a.find("a.title").click(c("Home Page Analysis", "Clicked On Headline", d)),
                a.find("a.img").click(c("Home Page Analysis", "Clicked On Image", d)),
                f++
        }),
        a(),
        window.bindInStripArticles = a
});
// File: core/generalPopup.js
function bindEscape(a, b) {
    $(document).keyup(function(c) {
        27 == c.which && ($(b, a).click(),
            $(".emailSent").removeClass(".emailSent"))
    })
}
$.fn.center = function(a, b) {
    function c() {
        this.css("position", "fixed"),
            this.css("top", $(window).height() / 2 - this.outerHeight() / 2),
            this.css("left", $(window).width() / 2 - this.outerWidth() / 2)
    }
    var d = this;
    return a ? $(this).animate({
        position: "fixed",
        top: $(window).height() / 2 - this.outerHeight() / 2,
        left: $(window).width() / 2 - this.outerWidth() / 2
    }, a, b) : c.call(d),
        this
}
    ,
    $.fn.fixedPosition = function() {
        var a = this.offset()
            , b = $(document);
        return {
            left: a.left - b.scrollLeft(),
            top: a.top - b.scrollTop()
        }
    }
    ,
    function(a, b, c) {
        "use strict";
        function d() {
            return l.closeEnabled ? !("function" == typeof l.closeEnabled && !l.closeEnabled()) : !1
        }
        function e() {
            return l.replaceEnabled ? !("function" == typeof l.replaceEnabled && !l.replaceEnabled()) : !1
        }
        function f() {
            m.getEl().show(),
                d() ? (g().css("overflow", ""),
                    m.getEl().removeClass("darker")) : (g().css("overflow", "hidden"),
                    m.getEl().addClass("darker"))
        }
        function g() {
            return j || (j = $("body"))
        }
        function h() {
            l.$popup && (l.$popup.attr("id") || l.$popup.attr("id", "popup-" + Date.now()),
                l.$popup.removeClass("displayNone").show(),
            l.center && (l.$popup.center(l.animatedCenter),
                $(a).on("resize.centerOverlay", function() {
                    m.centerPopup(l.animatedCenter)
                })))
        }
        var i, j, k = {
            closeEnabled: !0,
            replaceEnabled: !0,
            center: !1,
            animatedCenter: !1,
            $popup: null,
            onHide: $.noop
        }, l = $.extend({}, k);
        b.ready(function() {
            i = $(".generalOverlay"),
                j = $("body")
        }),
            a.showOverlay = function() {
                e() && f()
            }
            ,
            a.hideOverlay = function() {
                d() && m.getEl().hide()
            }
        ;
        var m = c.GeneralOverlay = {
            getEl: function() {
                return i || (i = $(".generalOverlay"))
            },
            getPopup: function() {
                return l.$popup
            },
            centerPopup: function(a, b) {
                var c = "boolean" == typeof a ? a : l.animatedCenter;
                return m.getPopup().center(c ? m.getCenterAnimationDuration() : 0, b),
                    m
            },
            getCenterAnimationDuration: function() {
                return 500
            },
            setParams: function(a) {
                return l = $.extend({}, k, a),
                    m
            },
            show: function(a) {
                return e() ? (m.setParams(a),
                    h(),
                    f(),
                    m) : void 0
            },
            hide: function(c) {
                if (d()) {
                    $(a).off("resize.centerOverlay"),
                        a.hideOverlay();
                    var e;
                    return e = c ? b.find("#" + c).addClass("displayNone").removeClass("emailSent firstPending").hide() : l.$popup ? l.$popup.addClass("displayNone").hide() : b.find(".genPopup").addClass("displayNone").removeClass("emailSent firstPending").hide(),
                    l.onHide && e.filter(l.$popup).length && l.onHide(),
                        m
                }
            }
        };
        a.showPopup = function(a, c) {
            m.show({
                $popup: b.find("#" + a),
                center: c
            })
        }
            ,
            a.hidePopup = function(a) {
                m.hide(a)
            }
    }(window, $(document), window.components ? window.components : window.components = {});
var PopupEvents = function() {
    var a = function() {
        $(".genPopup, .js-gen-popup").each(function() {
            this.hasAttribute && this.hasAttribute("id") && window.hidePopup(this.getAttribute("id"))
        })
    };
    $(function() {
        window.d4c5608b173612f6c402bbe868bb3a3c ? ($(document.body).css("overflow", "hidden"),
            delete window.d4c5608b173612f6c402bbe868bb3a3c) : ($(window).keyup(function(b) {
            switch (b.which) {
                case 27:
                    a()
            }
        }),
            $(".generalOverlay").click(function(b) {
                "none" !== $(this).css("display") && a()
            }))
    })
}();
$(function() {
    $(".js-notification-bar-close").click(function() {
        $(this).closest(".js-notification-bar")._hide()
    })
});
// File: core/hoverMe.js
function getPALData(a, b, c) {
    $.get("/instruments/Service/pal", {
        article: a,
        divid: b
    }, function(a) {
        if (a.length > 0) {
            var d = $(a);
            $("#" + b).data("palHtml", $(d).children()),
            $("#div" + b).length && $("#div" + b).remove(),
                $("#" + b).after(a),
                c()
        }
    })
}
function getOALData(a, b, c) {
    $.post("/news/Service/OALPopup", {
        article: a,
        divid: b
    }, function(a) {
        if (a.length > 0) {
            var d = $(a);
            $("#" + b).data("oalHtml", $(d).children()),
            $("#div" + b).length && $("#div" + b).remove(),
                $("#" + b).after(d),
                c(d)
        }
    })
}
function getEELData(a, b) {
    $.get("/economic-calendar/EELPopup", {
        eventID: a
    }, function(a) {
        a.length > 0 && b && b(a)
    })
}
function getERLData(a, b) {
    $.get("/earnings-calendar/service/ERLPopup", {
        pair_id: a
    }, function(a) {
        a.length > 0 && b && b(a)
    })
}
function getAQLData(a, b, c, d, e) {
    $.get("/instruments/Service/aql", {
        pair: a,
        divid: b,
        aql: c,
        alertButton: d
    }, function(a) {
        if (!(a.length > 0))
            return "fail";
        var c = $("#div" + b);
        $("#div" + b).html(a),
            $("#" + b).data("innerHtml", a),
        e && e(c)
    })
}
function getFRLData(a, b) {
    !a.ignorePreviousData && a.$hoverMe.data("innerHtml") ? (a.$popup.html(a.$hoverMe.data("innerHtml")).show(),
    b && b(a.$popup)) : $.get("/central-banks/FEDMonitorPopup", {}, function(c) {
        return c.length > 0 ? (a.$popup.html(c).show(),
            a.$hoverMe.data("innerHtml", c),
        b && b(a.$popup),
            void 0) : !1
    })
}
var initHoverMe = function() {
    function a() {
        0 == $(".qlTooltip:hover").length ? ($(".qlTooltip").remove(),
            $(".marketChart").removeClass("showArrow")) : $(".qlTooltip").mouseleave(function(a) {
            $(".qlTooltip").remove(),
                $(".marketChart").removeClass("showArrow")
        })
    }
    function b(a, b) {
        var c = $(b.target)
            , d = c.offset().top - $(document).scrollTop() - a - 85
            , e = d > 0;
        return e
    }
    function c(a, b) {
        var c = a.find(".js-add-alert-widget");
        if (c.length) {
            var d, e, f, g, h = a.find(".js-toggle-user-alerts-popup"), i = a.find(".js-user-alert-popup");
            "event" === b ? (g = c.attr("data-event-id"),
                e = window.eventPopupParams[g] || {},
                d = new UserAlertsPopup(i,window.userAlertsPopupParams[g],h),
                f = new EventUserAlerts({
                    id: e.alertId,
                    eventId: e.eventId,
                    active: e.active
                },e.texts,d)) : "instrument" === b && (g = c.attr("data-pair-id"),
                e = window.instrumentPopupParams[g] || {},
                d = new UserAlertsPopup(i,window.userAlertsPopupParams[g],h),
                f = new InstrumentUserAlerts(e.pairId,e.initialAmountOfEvents,e.texts,d,{
                    $lastValueEl: a.find("#last_last")
                })),
                f.events.on("unauthorizedSubmit", function() {
                    ga("allSitesTracker.send", "event", "Alert - Create", "Create Alert Button", "New Alert In AQL - Non Logged In")
                })
        }
    }
    function d(a) {
        window.addToPortfolioClass || (window.addToPortfolioClass = new AddToPortfolioClass);
        var b = new components.AddToPortfolio(a.find(".js-add-to-portfolio"));
        b.tooltip && b.tooltip.subscribe("show", function() {
            window.components.HoverMe.setKeepAlive(a, !0),
                ga("allSitesTracker.send", "event", "Portfolio Tab", "Portfolio Tab Clicked", "Portfolio Tab In AQL - Non Logged In")
        }).subscribe("hide", function() {
            window.components.HoverMe.setKeepAlive(a, !1)
        })
    }
    function e() {
        window.components.TradeNow.ready()
    }
    function f(a, f) {
        a.preventDefault();
        var g = $(this)
            , h = g.attr("hoverme")
            , i = $(tooltipContainer)
            , l = "pal" == h ? 600 : 450
            , m = b(l, a) ? "bottom" : "top";
        i.removeClass("top bottom").addClass(m),
            f.append(i),
            j = g.attr("id");
        var n = $(".qlTooltip").attr("id", "div" + j);
        switch ($(".marketChart").removeClass("showArrow"),
            h) {
            case "aql":
                getAQLData(g.data("pairid"), j, 1, !1, function(a) {
                    c(a, "instrument"),
                        d(a),
                        e()
                });
                break;
            case "pal":
                if (g.data("palHtml"))
                    n.html(g.data("palHtml")),
                        e();
                else {
                    var o = "#div" + $(this).attr("id");
                    getPALData($(this).data("articleid"), $(this).attr("id"), function() {
                        $(o).removeClass("top bottom").addClass(m).show(),
                            e()
                    })
                }
                break;
            case "oal":
                g.data("oalHtml") ? (n.html(g.data("oalHtml")),
                    e()) : getOALData(g.data("articleid"), j, function(a) {
                    a.removeClass("top bottom").addClass(m).show(),
                        e()
                });
                break;
            case "eel":
                var p = function(a) {
                    n.remove(),
                        n = $('<div id="div' + j + '" class="qlTooltip eel ' + m + '"></div>').append(a),
                        f.append(n),
                        c(f, "event"),
                        d(f),
                        e()
                };
                getEELData(g.data("eventid"), p);
                break;
            case "erl":
                var q = function(a) {
                    n.remove(),
                        n = $('<div id="div' + j + '" class="qlTooltip erl ' + m + '"></div>'),
                        f.append(n),
                        n.append(a),
                        c(f, "instrument"),
                        d(f),
                        e()
                };
                getERLData(g.data("pairid"), q);
                break;
            case "markets":
                var r = !!g.attr("data-alert-btn")
                    , s = function(a) {
                    e(),
                        d(a),
                    r && c(a, "instrument")
                };
                g.data("innerHtml") ? (n.html(g.data("innerHtml")),
                    s(n)) : getAQLData(g.data("pairid"), j, 0, r, s),
                    k = g.children(".marketChart"),
                    k.addClass("showArrow"),
                    n.show();
                break;
            case "frl":
                getFRLData({
                    $hoverMe: g,
                    $popup: n
                }, function() {
                    d(n)
                })
        }
    }
    function g(b) {
        b.is(":hover") || (m = !0,
            b.data("isHovered", !1).data("shouldKeepAlive", !1),
            a())
    }
    function h(a) {
        var b = $(a);
        return b.hasClass("js-hover-me-wrapper") || b.hasClass("js-hover-me") ? b : b.parents(".js-hover-me-wrapper")
    }
    function i(a) {
        var b = h(a);
        return b.hasClass("js-hover-me") ? b : b.find(".js-hover-me")
    }
    var j, k, l, m = !1, n = 1e3;
    $(".js-hover-me-wrapper").mouseenter(function(a) {
        var b = $(this);
        b.data("isHovered") || (l && g(l),
            setTimeout(function() {
                b.is(":hover") && (l = b.data("isHovered", !0),
                    f.call(i(b), a, b))
            }, 200))
    }).mouseleave(function() {
        var a = $(this);
        a.data("shouldKeepAlive") || setTimeout(function() {
            $(".js-hover-me:hover").length || $(".qlTooltip:hover,.qlTooltip :hover").length || g(a)
        }, n)
    }),
        window.components = window.components || {},
        window.components.HoverMe = {
            setKeepAlive: function(a, b) {
                h(a).data("shouldKeepAlive", b)
            }
        }
};
$(document).ready(function() {
    initHoverMe()
});
// File: core/images-slider.js
!function(a, b) {
    "use strict";
    var c;
    b.ImagesSlider = function(a) {
        function b() {
            f.find(".js-prev").click(function() {
                return 0 === g ? d(j[k]) : (g--,
                    void d(j[g]))
            }),
                f.find(".js-next").click(function() {
                    return g === k ? d(j[0]) : (g++,
                        void d(j[g]))
                }),
                f.find(".js-close").click(function() {
                    c.hide()
                }),
                i.removeAttr("style"),
                h.removeAttr("style"),
                c.show({
                    center: !0,
                    $popup: f,
                    onHide: function() {
                        g = null,
                            f.find(".js-prev").unbind("click"),
                            f.find(".js-next").unbind("click"),
                            f.find(".js-close").unbind("click")
                    }
                })
        }
        function d(a) {
            if (h.attr("src", a.src).css("width", ""),
                    i.removeAttr("style"),
                null === g)
                b();
            else {
                var d = h.width();
                h.css({
                    opacity: 0,
                    right: d / 4,
                    position: "relative"
                }),
                    i.css({
                        width: d / 2,
                        overflow: "hidden"
                    }),
                    c.centerPopup(!1),
                    setTimeout(function() {
                        i.width(d),
                            c.centerPopup(!0),
                            h.animate({
                                opacity: 1,
                                right: 0
                            }, c.getCenterAnimationDuration()),
                            setTimeout(function() {
                                i.width(d / 2).animate({
                                    width: d,
                                    overflow: "visible"
                                }, c.getCenterAnimationDuration())
                            }, 0)
                    }, 0)
            }
            g = a.index
        }
        var e = a.$parent
            , f = a.$container;
        if (e && f)
            var g = null
                , h = f.find("img")
                , i = h.parent()
                , j = e.find("a").map(function(a, b) {
                var c = $(b)
                    , e = c.find("img")
                    , f = {
                    index: a,
                    $anchor: c,
                    src: e.attr("src")
                };
                return f.$anchor.click(function() {
                    d(f)
                }),
                    f
            })
                , k = j.length - 1
    }
        ,
        a([{
            type: "component",
            value: "GeneralOverlay"
        }, {
            type: "$",
            value: "#images-slider-content"
        }, {
            type: "$",
            value: ".js-images-slider"
        }]).ready(function(a, d, e) {
            c = a,
                e.each(function(a) {
                    new b.ImagesSlider({
                        $parent: e.eq(a),
                        $container: d
                    })
                })
        })
}(loader, components);
// File: core/instrument-user-alerts.js
window.InstrumentUserAlerts = function(a, b, c, d, e) {
    "use strict";
    function f() {
        e.$lastValueEl.length && u.attr("placeholder", components.Numbers.getLocalNumber(components.Numbers.getNumericFromLocalNumber(e.$lastValueEl.text()), e.priceFixed))
    }
    function g() {
        setCookie("isUserNoticedNewAlertPopup", 1, 365),
            e.ignoreFirstTimeAlert = !0
    }
    function h(a) {
        return a[0].toUpperCase() + a.substr(1)
    }
    function i() {
        if (e.alert_trigger) {
            var a = F.$all.find("select[name=" + e.alert_trigger + "]")
                , b = h(a.parents("fieldset").attr("name") || e.alert_trigger);
            a.parent().find("input[type=radio][value=" + e.frequency + "]").prop("checked", !0),
                z.find("li").removeClass("selected displayNone"),
                p(z.find("[data-value=alert" + b + "]").addClass("selected"))
        }
        if ("Change" !== e.alert_trigger && F.$change.find('input[type="text"]').val(10),
                e.value) {
            var c = t.find('input[type="text"]');
            c.length ? c.val(e.value) : u.val(e.value)
        } else
            u.val("");
        e.volume && F.$valume.find('input[type="text"]').val(e.volume),
            e.hideVolume ? z.find('li[data-value="alertVolume"]').addClass("displayNone") : z.find('li[data-value="alertVolume"]').removeClass("displayNone"),
            e.hideEarnings ? z.find('li[data-value="alertEarnings"]').addClass("displayNone") : (z.find('li[data-value="alertEarnings"]').removeClass("displayNone"),
                B.prop("checked", "day" === e.preReminder),
            "earnings" === e.alert_trigger && t.find("input[type=radio][value=" + e.frequency + "]").prop("checked", !0)),
        e.threshold && t.find("select").val(e.threshold),
        $.isUn(e.email_alert) || F.$emailAlert.prop("checked", e.email_alert.is(1)),
        e.name && d.getEl().find(".js-alert-name").text(e.name),
            "update" === e.type ? (w.find(".js-conditions-title").addClass("displayNone"),
                z.find("li").not(".selected").addClass("displayNone"),
                F.$change.find("select option[value=both]").addClass("displayNone")) : (w.find(".js-conditions-title").removeClass("displayNone"),
                F.$change.find("select option[value=both]").removeClass("displayNone"))
    }
    function j() {
        var a, b, c, d, f, g, h = t.find("select"), i = h.attr("name") || (t.attr("name") || "").toLowerCase(), j = t.find('input[type="radio"]:checked').val() || "Once", k = I.is(":checked");
        return "earnings" == i ? (a = "over",
            g = B.prop("checked") ? "day" : "none") : (d = t.find("input.alertValue"),
            c = "volume" === i ? e.volumeFixed : 0 === i.indexOf("change") ? e.changeFixed : e.priceFixed,
            b = d.val() || d.attr("placeholder") || 0,
            a = h.val()),
            f = {
                id: e.id,
                alert_ID: e.id,
                pair_ID: e.pairId,
                value: "undefined" != typeof b ? components.Numbers.getLocalNumber(components.Numbers.getNumericFromLocalNumber(b), c) : void 0,
                alert_trigger: i,
                frequency: j,
                threshold: a,
                platform: e.platform,
                pre_reminder: g,
                email_alert: +k ? "Yes" : "No",
                preReminderText: B.prop("checked") ? B.val() : ""
            },
            C = f,
            f
    }
    function k() {
        "update" === e.type ? (c._failedAlert = c._failedUpdateAlert,
            c._successfullyAlert = c._successfullyUpdateAlert || "",
            n()) : (c._failedAlert = c._failedCreateAlert,
            c._successfullyAlert = c._successfullyCreateAlert || "",
            o())
    }
    function l(a) {
        "unauthorized" === a ? (overlay.overlayLogin(),
            G.trigger("unauthorizedSubmit", C)) : a ? v.html(c._failedAlert).addClass("failed").removeClass("displayNone") : (E || d.setUserHasAlerts(!0),
            E++,
            q(A.eq(0)),
            D.showSuccessMessage(),
            G.trigger("submit", C))
    }
    function m(a) {
        return "earnings" === a.alert_trigger ? "earnings" : "instrument"
    }
    function n() {
        var a = j();
        components.UserAlerts.update(m(a), a, l)
    }
    function o() {
        var a = j();
        a.alert_trigger.isnt("earnings") && setCookie("emailAlertSetting", +a.email_alert.is("Yes"), 356),
            components.UserAlerts.create(m(a), a, l)
    }
    function p(a) {
        var b = $(a).attr("data-value");
        switch (F.$all.addClass("displayNone"),
            b) {
            case "alertVolume":
                t = F.$valume.removeClass("displayNone"),
                    t.find('input[type="radio"]:eq(0)').prop("checked", !0);
                break;
            case "alertPrice":
                t = F.$price.removeClass("displayNone"),
                    f();
                break;
            case "alertChange":
                t = F.$change.removeClass("displayNone"),
                    t.find('input[type="radio"]:eq(0)').prop("checked", !0);
                break;
            case "alertEarnings":
                t = F.$earnings.removeClass("displayNone"),
                    t.find('input[type="radio"]:eq(0)').prop("checked", !0)
        }
        y.__toggleShow(b.isnt("alertEarnings"))
    }
    function q(a) {
        A.removeClass("selected"),
            $(a).addClass("selected"),
            p(a)
    }
    var r = a || "globals";
    c = c || window.instrumentPopupParams[r] ? window.instrumentPopupParams[r].texts : {},
        e = e || {};
    var s, t, u, v, w, x, y, z, A, B, C, D = this, E = b, F = {}, G = new components.Subscriber, H = new RegExp("\\" + c.thousandSep,"g"), I = d.getEl().find("#checkboxEmailAlertPopup");
    D.setDefaultParams = function(b) {
        return e = {
            type: b.formType || "create",
            ignoreFirstTimeAlert: b.ignoreFirstTimeAlert || e.ignoreFirstTimeAlert || getCookie("isUserNoticedNewAlertPopup"),
            id: b.id,
            alert_ID: b.id,
            name: b.name,
            pairId: b.pairId || a,
            value: b.value,
            alert_trigger: b.alert_trigger,
            threshold: b.threshold,
            frequency: b.frequency,
            volume: b.volume,
            email_alert: +(!$.isUn(b.email_alert) && b.email_alert.is(["Yes", 1])),
            hideVolume: b.hideVolume,
            hideEarnings: b.hideEarnings,
            $lastValueEl: b.$lastValueEl || $("#quotes_summary_current_data #last_last"),
            platform: b.platform,
            priceFixed: b.priceFixed,
            changeFixed: b.changeFixed,
            volumeFixed: b.volumeFixed,
            preReminder: b.preReminder || "none"
        },
            D
    }
        ,
        D.setTexts = function(a) {
            return $.extend(c, a),
                D
        }
        ,
        D.subscribe = function(a) {
            return G.events.on("submit", a),
                D
        }
        ,
        D.showSuccessMessage = function(a) {
            d.getEl().find(".alertTitle").addClass("displayNone"),
                w.addClass("displayNone"),
                x.addClass("displayNone"),
                v.html(a || c._successfullyAlert).removeClass("displayNone failed"),
                d.getEl().find(".js-btn").removeClass("Orange2").addClass("LightGray").text(c._Close),
                s = !1
        }
        ,
        D.popup = d,
        D.events = G.events,
        $(document).ready(function() {
            D.setDefaultParams(e),
            d || (d = window.userAlertsPopup),
                v = d.getEl().find(".js-status-message"),
                w = d.getEl().find(".js-user-alert-form"),
                x = d.getEl().find(".js-form-content"),
                y = x.find(".js-email-alert-notification"),
                z = w.find(".js-tabs-options"),
                A = z.find("li").click(function() {
                    q(this)
                }),
                e.$lastValueEl = e.$lastValueEl || $("#quotes_summary_current_data #last_last"),
                F.$all = w.find(".js-tab"),
                F.$change = w.find(".js-change-tab"),
                F.$price = w.find(".js-price-tab"),
                F.$valume = w.find(".js-volume-tab"),
                F.$earnings = w.find(".js-earnings-tab"),
                F.$emailAlert = d.getEl().find("#checkboxEmailAlertPopup"),
                u = F.$price.find('input[type="text"]'),
                B = F.$earnings.find("input[type=checkbox]"),
                u.focusin(function() {
                    "" === this.value && (this.value = u.attr("placeholder"))
                }).focusout(function() {
                    this.value === u.attr("placeholder") && (this.value = "")
                });
            var a = "";
            F.$all.find('input[type="text"]').keydown(function() {
                ("" === this.value || isNumeric(this.value, c.decimalSep)) && (a = this.value)
            }).keyup(function() {
                if ("" !== this.value && !isNumeric(this.value, c.decimalSep)) {
                    var b = this.value.replace(H, "")
                        , d = $(this);
                    isNumeric(b, c.decimalSep) ? a = b : d.val(a)
                }
            }),
                d.getEl().find(".js-btn").click(function() {
                    s ? k() : d.hide()
                }),
                d.subscribe(function() {
                    var a = getCookie("emailAlertSetting");
                    e.email_alert = a.is([0, 1]) ? a : +I.is(":checked"),
                        d.classes(null, "new instructions"),
                        d.getEl().find(".alertTitle").removeClass("displayNone"),
                        i(),
                        g(),
                        t = F.$all.not(".displayNone"),
                    t.is(F.$price) && f(),
                        s = !0,
                        w.removeClass("displayNone"),
                        x.removeClass("displayNone"),
                        d.getEl().find(".js-btn").addClass("Orange2").removeClass("LightGray").text("update" === e.type ? c._update : c._create),
                        v.addClass("displayNone")
                })
        }),
        this.setDefaultParams(e)
}
;
// File: core/jquery-utils.js
!function(a, b) {
    "use strict";
    function c(a) {
        return "" + a
    }
    var d = a.fn.remove
        , e = a.fn.empty
        , f = a.fn.html;
    a.fn.remove = function() {
        return this.trigger("remove"),
            b.trigger("removeElements", [this]),
            d.apply(this, arguments)
    }
        ,
        a.fn.html = function() {
            return 1 === arguments.length && (this.trigger("html"),
                b.trigger("changeElementsHTML", [this])),
                f.apply(this, arguments)
        }
        ,
        a.fn.empty = function() {
            return this.trigger("empty"),
                b.trigger("emptyElements", [this]),
                e.apply(this, arguments)
        }
        ,
        a.match = function(a, b, c) {
            var d, e = !1;
            if ("string" == typeof b)
                e = c ? a === b : a.toLowerCase() === b.toLowerCase();
            else if (b.constructor === Array)
                for (d = 0; d < b.length && !e; d++)
                    (c ? a === b[d] : a.toLowerCase() === b[d].toLowerCase()) && (e = !0);
            return e
        }
        ,
        String.prototype.is = function(b, d) {
            var e = !1
                , f = this;
            return [].concat(b).forEach(function(b) {
                e |= a.match(f, c(b), d)
            }),
                !!e
        }
        ,
        Number.prototype.is = function(a) {
            return String.prototype.is.call("" + this, a)
        }
        ,
        String.prototype.isnt = function(a, b) {
            return !c(this).is(a, b)
        }
        ,
        String.prototype.has = function(a) {
            return this.toLowerCase().indexOf(a.toLowerCase()) > -1
        }
        ,
        Number.prototype.padLeft = function(a, b) {
            return Array(Math.max(a + 1 - this.toString().length, 0)).join(b || "0") + this
        }
        ,
        Storage.set("pages", Storage.get("pages") + 1),
        a.fn.__show = a.fn.__show || function(b) {
            return b && a(this).html(b),
                a(this).removeClass("displayNoneImp displayNone hidden")
        }
        ,
        a.fn.__hide = a.fn.__hide || function() {
            return a(this).addClass("displayNoneImp")
        }
        ,
        a.fn.__toggleShow = a.fn.__toggleShow || function(b) {
            var c;
            return c = a.isUn(b) ? a(this).hasClass("displayNoneImp") ? "__show" : "__hide" : b ? "__show" : "__hide",
                a(this)[c]()
        }
        ,
        a.fn._show = a.fn._show || function(b) {
            return b && a(this).html(b),
                a(this).removeClass("displayNone hidden")
        }
        ,
        a.fn._hide = a.fn._hide || function() {
            return a(this).addClass("displayNone")
        }
        ,
        a.fn._toggleShow = a.fn._toggleShow || function(b) {
            var c;
            return c = a.isUn(b) ? a(this).hasClass("displayNone") ? "_show" : "_hide" : b ? "_show" : "_hide",
                a(this)[c]()
        }
        ,
        a.fn.isChildOf = function(b) {
            var c;
            return c = a.isSt(b) ? !!this.parents(b).length : a.contains(b[0], this[0])
        }
        ,
        a.fn.swapWith = function(b) {
            a.swapElements(a(this), b)
        }
        ,
        a.swapElements = function(b, c) {
            var d = a("<span/>");
            b.after(d),
                c.after(b),
                d.after(c).remove()
        }
        ,
        a.isUn = function(a) {
            return "undefined" == typeof a
        }
        ,
        a.isSt = function(a) {
            return "string" == typeof a
        }
        ,
        a.isNu = function(a) {
            return "number" == typeof a
        }
        ,
        a.isFu = function(a) {
            return "function" == typeof a
        }
        ,
        a.capitalizeAll = function(b) {
            return b ? b.split(" ").map(a.capitalizeFirst).join(" ") : ""
        }
        ,
        a.capitalizeFirst = function(a) {
            return a ? a[0].toUpperCase() + a.substr(1).toLowerCase() : ""
        }
        ,
        a.bindStopProp = function(b) {
            a(".js-stop-propagation:not([stoppropbound])", b).each(function() {
                a(this).click(function(a) {
                    a.stopPropagation()
                }).attr("stoppropbound", "")
            })
        }
        ,
        a.copyToClipboard = function(b, c) {
            var d = document.createElement("textarea")
                , e = a(d).css({
                width: "1px",
                height: "1px",
                padding: 0,
                margin: 0,
                border: 0
            });
            (c || document.body).appendChild(e[0]),
                d.value = b,
                d.select();
            try {
                document.execCommand("copy")
            } catch (f) {
                console.log("Copy to clipboard failed", f)
            }
            e.remove()
        }
        ,
        a.throttle = function(a, b) {
            var c = new Date;
            return function(d) {
                (new Date).getTime() - c.getTime() > b && (c = new Date,
                    a.call(this, d))
            }
        }
        ,
        a.debounce = function(a, b) {
            var c = new Date
                , d = 0;
            return function(e) {
                var f = (new Date).getTime() - c.getTime();
                c = new Date,
                b > f && clearTimeout(d),
                    d = setTimeout(a.bind(this, e), b)
            }
        }
        ,
        a.isInView = function(b, c, d) {
            var e, f = a(window).scrollTop(), g = f + a(window).height(), h = a(b).offset().top, i = h + a(b).height();
            return e = c ? g > h + (d || 0) : g >= i && h >= f
        }
}(jQuery, $(document));
// File: core/local-number-inputs.js
window.components.LocalNumberInput = loader([{
    type: "$",
    value: ".js-local-number-input"
}, {
    type: "component",
    value: "Numbers"
}, "isNumeric"], {
    isRepeatable: !0
}).ready(function(a, b, c) {
    "use strict";
    var d = {}
        , e = b.getDecimalSeparator()
        , f = new RegExp("^\\d*\\" + e + "?\\d*$")
        , g = new RegExp("[\\d\\" + e + "]")
        , h = function() {
        f.test(this.value) ? d[this.name] = this.value : this.value = d[this.name]
    };
    a.not("[data-local-number-bind]").attr("data-local-number-bind", 1).keydown(function(a) {
        1 !== a.key.length || g.test(a.key) || a.preventDefault(),
            h.call(this)
    }).keyup(function(a) {
        h.call(this)
    })
});
// File: core/myDropDownSelector.js
var DropdownSelector = function(a, b, c, d, e) {
    function f(a, b) {
        C[a].forEach(function(a) {
            a(b)
        })
    }
    function g() {
        $(y).unbind("click").bind("click", function(a) {
            if ($(this).is(".groupLI"))
                return !1;
            var b = o.selectedDataValue()
                , c = j($(this));
            c != b && m(c)
        })
    }
    function h() {
        $(">a>* ", a).one("click.niv", function(b) {
            $(">a>* ", a).off("click.niv"),
                setTimeout(function(a) {
                    s = p = $(">li", x).not(".groupLI").first().outerHeight(),
                        r = $(">li.groupLI", x).length ? $(">li.groupLI", x).first().outerHeight() : p,
                        q = $(">li", x).not(".groupLI").first().height()
                }, 100)
        })
    }
    function i() {
        return {
            value: b.attr("data-value"),
            title: b.val(),
            symbol: b.attr("data-symbol"),
            isValid: D()
        }
    }
    function j(c, d, e) {
        if (-1 == d)
            return $("a [before-input-element],a [after-input-element]", a).css("opacity", 0),
                $(b).attr("is-valid", !1),
                null;
        $("[before-input-element],[after-input-element]", a).css("opacity", ""),
            $(b).attr("is-valid", !0),
            u = c;
        var g = b.parent()
            , h = $.trim($(c).attr("text") || $(c).text())
            , j = $(c).attr("data-value");
        return !e && $(x).addClass("displayNone"),
        $(g).length && $(b).size() && ($(b).attr("value", h).attr("data-value", j),
        $(c).size() && $(b).attr("data-symbol", $(c).attr("currencysymbol")),
            $("a [before-input-element]", a).replaceWith($(":first", c).clone().attr("before-input-element", "")),
            $("a [after-input-element]", a).replaceWith($(":last", c).clone().attr("after-input-element", "")),
            z = j),
            $(g).removeClass("searchMode"),
            f("change", i()),
            j
    }
    function k() {
        $("a [before-input-element],a [after-input-element]", a).css("opacity", ""),
            $(b).attr("is-valid", !0),
            $(x).addClass("displayNone");
        var c = $(b).attr("selectedFlag");
        $(b).removeAttr("placeholder").attr("value", c),
            b.parent().removeClass("searchMode")
    }
    function l(a, b) {
        var c = $.grep(b, function(b, c) {
            return $(b).text().toLowerCase().indexOf(a.toLowerCase()) > -1
        })
            , d = $.grep(b, function(b, c) {
            return -1 == $(b).text().toLowerCase().indexOf(a.toLowerCase())
        });
        $(d).addClass("displayNone"),
            $(c).removeClass("displayNone"),
            $(x).removeClass("displayNone"),
            $(c).length == $(b).length ? $(t).removeClass("displayNone") : $(t).addClass("displayNone"),
            0 == $(c).length ? $(x).addClass("displayNone") : $(x).removeClass("displayNone"),
            $(x).scrollTop(0)
    }
    function m(b) {
        b && $(a).trigger("dropDownSelected", [a.selector, b, u[0]])
    }
    function n() {
        $(".js-dropdown:not(.displayNone)").each(function() {
            this !== x[0] && ($("input", $(this).parent()).trigger({
                type: "keydown",
                which: 9
            }),
                $(this).addClass("displayNone"))
        })
    }
    var o = this;
    a = $(a),
        b = b ? $(b) : a.find("input"),
        c = c ? c : 10;
    var p, q, r, s, t = $(".groupLI", a), u = null;
    d = d || !1,
        e = e || "Type a currency...";
    var v = -1
        , w = -1
        , x = $(">ul", a)
        , y = $("> li", x)
        , z = null
        , A = !1
        , B = y;
    d && (z = $(b).attr("data-value"));
    var C = {
        change: []
    };
    h(),
        g(),
        $(b).bind("click", function(c) {
            return $(this).parent().is(".disabled") ? !1 : (A = !1,
                c.stopPropagation(),
                setTimeout(function(a) {
                    $(x).scrollTop(0)
                }, 50),
                v = -1,
                w = -1,
                $(this).parent().addClass("searchMode"),
                d ? (k(),
                    $("a [before-input-element],a [after-input-element]", a).css("opacity", 0),
                    $(b).attr("is-valid", !1),
                    $(this).attr("placeholder", e).attr("value", ""),
                    y.removeClass("displayNone"),
                    $(x).removeClass("displayNone")) : ($(x).toggleClass("displayNone"),
                $(x).is(":visible") && 0 == $(">li:visible", x).length && $(x).toggleClass("displayNone")),
                $(".selected", x).removeClass("selected").removeClass("displayNone"),
                n(),
                $(this).focus(),
                d ? !1 : void 0)
        }),
        $(a).bind("click", function(b) {
            return $(a).is(".disabled") ? !1 : (A = !1,
                $(this).removeAttr("placeholder"),
                b.stopPropagation(),
                !1)
        }),
        $(">a", a).click(function(c) {
            return $(a).is(".disabled") ? !1 : void $(b).click()
        }),
        $(b).bind("keydown", function(e) {
            B = $(">:visible", x);
            var f = B.length;
            if (38 != e.which && 40 != e.which)
                A = !1;
            else {
                var g, h;
                g = $("li:visible:first", x).length ? $("li:visible:first", x).offset().top : 0,
                    h = $(".selected", x).length ? $(".selected", x).offset().top : g,
                    v = Math.abs(parseInt((h - g - $(x).scrollTop()) / q)) % r
            }
            switch (e.which) {
                case 37:
                case 39:
                    break;
                case 9:
                    if (d) {
                        var i = o.isValidValueOrNotSelected() && o.selectedDataValue() != z;
                        o.selectByValue(z);
                        var k = j($('li[data-value="' + z + '"]', x), null, !1);
                        i && m(k),
                            y.removeClass("displayNone")
                    }
                    break;
                case 27:
                    $("html").click();
                    break;
                case 38:
                    if (0 == $(x).scrollTop() && 0 == v)
                        return !1;
                    if (0 == v && $(".selected", x).length && $(".selected", x).position().top < $(".selected", x).outerHeight() && $(".selected", x).position().top < 0 && $(x).scrollTop($(x).scrollTop() + $(".selected", x).outerHeight()),
                        $(B[w - 1]).is(".groupLI") && 1 == w)
                        return !1;
                    if (w >= 0 && ($(B[w--]).removeClass("selected"),
                            s = $(B[w]).is(".groupLI") ? r : p,
                        $(B[w]).is(".groupLI") && w--,
                            $(B[w]).addClass("selected"),
                            j($(">li:visible:eq(" + w + ")", x), w, !0),
                            v--,
                        $(".selected", x).position().top < 0)) {
                        A = !1,
                            v++;
                        var n = $(x).scrollTop();
                        if ($(".selected", x).position()) {
                            $(x).scrollTop(n - $(".selected", x).position().top),
                                n = $(x).scrollTop();
                            var t = $(".selected", x).position().top;
                            0 > t && $(x).scrollTop(n + t)
                        }
                        $(1 >= w && y[0]).is(".groupLI") && $(x).scrollTop(0)
                    }
                    return !1;
                case 40:
                    var u = x[0].scrollHeight - x.outerHeight();
                    if ($(x).scrollTop() == u && (A = !1),
                        f - 1 > w && ($(B[w++]).removeClass("selected"),
                            s = $(B[w]).is(".groupLI") ? r : p,
                        $(B[w]).is(".groupLI") && w++,
                            $(B[w]).addClass("selected"),
                            j($(">li:visible:eq(" + w + ")", x), w, !0),
                            v++,
                        v == c)) {
                        v--;
                        var n = $(x).scrollTop();
                        $(x).scrollTop(n + $(".selected", x).outerHeight())
                    }
                    break;
                case 13:
                    if ($(x).is(":visible") && o.isValidValueOrNotSelected()) {
                        $(".bottunImageDoubleArrow, .buttonWhiteImageDownArrow", a).click(),
                            o.selectByValue(z);
                        var k = j($('li[data-value="' + z + '"]', x), null, !1);
                        m(k)
                    }
                    break;
                default:
                    var C = $(b).val()
                        , D = String.fromCharCode(e.which);
                    /[a-zA-Z0-9-_ ]/i.test(D) || (D = ""),
                    8 == e.which && (C = C.slice(0, -1)),
                        setTimeout(function() {
                            var c = $(b).val();
                            l(c, y),
                                v = w = -1,
                                $(B).removeClass("selected");
                            var d = $.grep(y, function(a, b) {
                                return $(a).text().toLowerCase() == (C + D).toLowerCase()
                            });
                            if (1 == B.length) {
                                var e = $("li:visible:first", x);
                                d = $(e).text().toLowerCase() == c.toLowerCase() ? e : ""
                            }
                            if (d.length) {
                                if ($("a [before-input-element],a [after-input-element]", a).css("opacity", ""),
                                        $(b).attr("is-valid", !0),
                                    1 == d.length)
                                    return j($(d), null, !1),
                                        !1
                            } else
                                $("a [before-input-element],a [after-input-element]", a).css("opacity", 0),
                                    $(b).attr("is-valid", !1),
                                B.length && j(null, w)
                        }, 100)
            }
        }),
        $(".bottunImageDoubleArrow", a).bind("click", function(a) {
            if (d) {
                A = !1,
                    v = -1,
                    w = -1,
                    $(">li", x).removeClass("selected");
                var c = $(x);
                $(c).toggleClass("displayNone"),
                    $(x).is(":visible") ? $(b).click().focus() : o.selectByValue(z)
            } else
                $(b).click().focus();
            return !1
        }),
        y.not(".groupLI").hover(function(a) {
            if (A = !0,
                    B = $(">:visible", x),
                    B.length) {
                $(".selected", x).removeClass("selected");
                var b = $(this).index()
                    , c = $(">li:lt(" + b + "):not(:visible)", x).length;
                w = b - c,
                    $(this).addClass("selected").focus();
                var d = $("li:visible:first", x).offset().top
                    , e = $(".selected", x).length ? $(".selected", x).offset().top : d;
                v = Math.abs(parseInt((e - d - $(x).scrollTop()) / p)) % r
            }
        }),
        $(x).on("mousewheel DOMMouseScroll", function(a) {
            var b = function() {
                var b = "DOMMouseScroll" === a.type ? -40 * a.originalEvent.detail : a.originalEvent.wheelDelta;
                return b > 0 ? 0 : 1
            }();
            return 1 === b && $(x).scrollTop($(x).scrollTop() + s),
            0 === b && $(x).scrollTop($(x).scrollTop() - s),
                !1
        }),
        $("html").click(function() {
            return d ? (!o.isValidValueOrNotSelected() && o.selectByValue(z),
                $(x).addClass("displayNone"),
                void y.removeClass("displayNone")) : ($(x).is(":visible") && 0 == o.isValidValueOrNotSelected() && $(b).trigger({
                type: "keydown",
                which: 13
            }),
                void $(x).addClass("displayNone"))
        });
    var D = function() {
        return "false" != $(b).attr("is-valid")
    }
        , E = function() {
        return D ? $(b).attr("data-value") : ""
    }
        , F = function() {
        return $("li[data-value=" + E() + "]", a).index()
    }
        , G = function(b) {
        return $('li[data-value="' + b + '"]', a).click()
    }
        , H = function(b) {
        return $("li[data-value]:eq(" + b + ")", a).click()
    }
        , I = function() {
        v = -1,
            w = -1,
            x = $(">ul", a),
            y = $("> li", x),
            g()
    }
        , J = function() {
        return o = new DropdownSelector(a.selector,b.selector,c,d,e)
    };
    this.isValidValueOrNotSelected = D,
        this.selectedDataValue = E,
        this.selectedIndexElement = F,
        this.selectByValue = G,
        this.selectByIndex = H,
        this.refresh = I,
        this.refreshHard = J,
        this.getData = i,
        this.subscribe = function(a, b) {
            return C[a] && C[a].push(b),
                this
        }
        ,
        this.hideElemntsByCallBack = function(a, b) {
            this.showHideElementsByCallBack(a, !1, b)
        }
        ,
        this.showElemntsByCallBack = function(a, b) {
            this.showHideElementsByCallBack(a, !0, b)
        }
        ,
        this.showHideElementsByCallBack = function(a, b, c) {
            c || (c = []),
                c.push(b),
                y.each(function() {
                    var d = $(this)
                        , e = b && "none" === d.css("display") || !b && "none" !== d.css("display");
                    e && a.apply(d, c) && d.css("display", b ? "" : "none")
                })
        }
        ,
        this.getDropDownParent = function() {
            return a
        }
};
// File: core/open-auth-trigger-inside.js
loader([{
    type: "$",
    value: ".js-open-auth-trigger-inside"
}, "overlay"]).ready(function(a, b) {
    "use strict";
    function c() {
        var a = this.data();
        g({
            eventCategory: "Signup",
            eventAction: "Sign Up Button",
            eventLabel: a.gaEventLabel
        })
    }
    function d() {}
    function e() {
        f(this.data())
    }
    function f(a) {
        a.ignoreAuthChange || (b.authCompleteAction = a.pageType ? a.authCompleteAction || {
            type: a.pageType
        } : null)
    }
    function g(a) {
        a.eventLabel && window.ga && window.ga("allSitesTracker.send", $.extend({
            hitType: "event"
        }, a))
    }
    a.each(function() {
        var a = $(this)
            , b = $([])
            , f = $([]);
        a.click(e.bind(a)).find("a[onclick]").each(function() {
            var a = $(this)
                , c = a.attr("onclick");
            c && (-1 !== c.indexOf("overlay.overlayRegister()") ? b = b.add(a) : -1 !== c.indexOf("overlay.overlayLogin()") && (f = f.add(a)))
        }),
            b.click(c.bind(a)),
            f.click(d.bind(a))
    })
});
// File: core/plus-icon.js
window.plusLoader = loader([{
    type: "$",
    value: ".js-plus-icon-popup"
}, {
    type: "$",
    value: ".js-plus-icon"
}, {
    type: "$",
    value: "body"
}, {
    type: "component",
    value: "TooltipPopup"
}, {
    type: "component",
    value: "AddToPortfolio"
}, "UserAlertsPopup", "InstrumentUserAlerts", "siteData"]).ready(function(a, b, c, d, e, f, g, h) {
    function i(a) {
        $.ajax({
            url: "/useralerts/service/getInstrumentData",
            data: {
                pair_ID: a.id
            },
            type: "post",
            dataType: "json"
        }).done(function(b) {
            $.extend(a, b),
            a.avg_volume && (a.volume = a.avg_volume)
        })
    }
    function j(a) {
        for (var b = 0; !a.is(c[0]); )
            b += a.position().top - (a.outerHeight() - a.height()),
                a = a.offsetParent();
        return b
    }
    function k(a) {
        return a.offsetParent().height() - Number(a.css("top").replace("px", "")) - 2 * N
    }
    function l() {
        var b = $(window).height() + F.scrollTop();
        return j(a) - N + J < b
    }
    function m() {
        return j(a) > K
    }
    function n(a, b) {
        return b.width() - a
    }
    function o() {
        var a = {
            top: C.offset.top + L / 2 - N
        };
        return B ? a.right = n(C.position.left, C.$offsetParent) + M : a.left = C.offset.left + M,
            a
    }
    function p() {
        E.addClass("displayNone"),
            H.addClass("displayNone"),
            I.addClass("displayNone")
    }
    function q(a, b) {
        a.addClass("topCorner"),
        b && a.addClass("grayArrow")
    }
    function r(b, c, d) {
        b.addClass("bottomCorner"),
            a.css({
                top: "auto",
                bottom: k(a)
            }),
        m() || (q(b.removeClass("bottomCorner"), d),
            a.removeAttr("style").offset(c))
    }
    function s(b, c) {
        C.$offsetParent.append(a),
            p();
        var d = o(C.offset, C.$offsetParent);
        return D.show().getEl().removeAttr("style").css("opacity", 0).offset(d),
        d.right && a.css("right", d.right),
            b.removeClass("displayNone bottomCorner grayArrow topCorner"),
            b !== H || (P.open(null, !0, C, "plusIcon"),
                h.userLoggedIn) ? (setTimeout(function() {
                l() ? q(b, c) : r(b, d, c),
                    a.css("opacity", 1)
            }, 1),
                void C.$el.addClass("active")) : (p(),
                void a.css("opacity", 1))
    }
    function t(a, b) {
        return a.find("td.pid-" + b + "-last")
    }
    function u(a) {
        var b = $(a)
            , c = b.data("pairData");
        if (c)
            c.offset = b.offset(),
                c.position = b.position();
        else {
            var d = b.attr("data-id")
                , e = b.parents("tr");
            c = {
                $el: b,
                $row: e,
                $offsetParent: b.offsetParent(),
                $last: t(e, d),
                position: b.position(),
                offset: b.offset(),
                id: d,
                name: b.attr("data-name"),
                last: b.attr("data-last"),
                volume: b.attr("data-volume"),
                portfolioNoPosition: !!b.attr("data-portfolio-no-position")
            },
                b.data("pairData", c)
        }
        return c
    }
    function v() {
        A && (z && z.removeClass("active"),
            c.append(a),
            A = !1)
    }
    function w() {
        s(E, !1),
            E.removeClass("grayArrow"),
            setTimeout(function() {
                D.stayOpen(!1),
                    A = !0
            }, 1),
        C.$last.length || i(C)
    }
    function x() {
        v(),
            C = u(this),
            z = C.$el,
            D.stayOpen(!0),
            w()
    }
    function y(a) {
        a.each(function(b) {
            var c = a.eq(b);
            c.data("knownPlusIcon") || c.click(x).data("knownPlusIcon", !0)
        })
    }
    a.length > 1 && (a = a.remove().eq(0)),
        c.append(a);
    var z, A = !1, B = "rtl" === $("html").attr("dir"), C = {}, D = new d(a), E = a.find(".js-plus-options"), F = this, G = a.find(".js-add-to-portfolio").removeClass("displayNone"), H = G.find(".js-popup"), I = a.find(".js-user-alert-popup"), J = I.removeClass("displayNone").outerHeight(), K = 73, L = b.outerHeight(!0), M = b.outerWidth(!0), N = 19;
    B && (M -= Number(b.css("margin-right").replace("px", ""))),
        I.addClass("displayNone"),
        G.find(".js-btn").remove();
    var O = new g(null,null,null,new f(I,{
        useGeneralOverlay: !1
    }),{
        ignoreFirstTimeAlert: !0
    })
        , P = new e(G,{
        analyticsLabelAddon: "Tables"
    });
    E.find(".js-portfolio-btn").click(function() {
        p(),
            h.userLoggedIn ? P.setNewInstrument(C.id, {
                portfolioNoPosition: C.portfolioNoPosition
            }) : ga("allSitesTracker.send", "event", "Portfolio Tab", "Portfolio Tab Clicked", "Portfolio Tab In Tables - Non Logged In"),
            s(H, !0)
    }),
        E.find(".js-alert-btn").click(function() {
            p(),
                O.setDefaultParams({
                    pairId: C.id,
                    name: C.name,
                    $lastValueEl: C.$last,
                    volume: C.volume,
                    hideVolume: !C.volume || C.volume.is("0"),
                    hideEarnings: !C.earnings,
                    value: C.$last.length ? null : C.last,
                    alert_trigger: "price",
                    platform: "desktopPlus"
                }),
                O.popup.show(),
                s(I, !0)
        }),
        D.subscribe("hide", v),
    P.tooltip && P.tooltip.subscribe("show", function() {
        window.ga("allSitesTracker.send", "event", "Portfolio Tab", "Portfolio Tab Clicked - Tables")
    }).subscribe("hide", v),
        O.subscribe(function() {
            window.ga("allSitesTracker.send", "event", "Alert - Create", "Create Alert Button", h.userLoggedIn ? "New Alert Submitted - Tables" : "New Alert In Tables - Non Logged In")
        }).popup.subscribe(function() {
            window.ga("allSitesTracker.send", "event", "Alert - Create", "Create Alert Button", "Alert Button Clicked - Tables")
        }).subscribeToClose(v),
        y(b),
        F.on("changeElementsHTML emptyElements removeElements", function(b, c) {
            c.find(a).length && v()
        }),
        window.PlusIcons = function(b) {
            F.find(".js-plus-icon-popup").each(function() {
                a.is(this) || $(this).remove()
            }),
                y(b)
        }
});
// File: core/portfolios-service.js
!function(a, b) {
    function c(b, c, e, f) {
        a.ajax({
            type: "POST",
            url: d.symbolsUrl,
            data: {
                action: b,
                pair_IDS: c instanceof Array ? c.join(",") : c,
                portfolioId: e instanceof Array ? e.join(",") : e
            },
            dataType: "json",
            success: f || a.noop
        })
    }
    var d = b.Watchlists = {
        symbolsUrl: "/portfolio/addtoinstrumentportfolioajax",
        listUrl: "/portfolio/getinstrumentprotfolioslist",
        getList: function(b, c) {
            var e = {};
            b ? e.pair_ID = b : e.multiPair = !0,
                a.ajax({
                    type: "GET",
                    url: d.listUrl,
                    data: e,
                    dataType: "json",
                    success: c
                })
        },
        create: function(b, c, e) {
            a.ajax({
                type: "POST",
                url: d.symbolsUrl,
                data: {
                    action: "addToNewPortfolio",
                    portfolioName: b,
                    pair_ID: c
                },
                dataType: "json",
                success: function(a) {
                    e(a.error || null, {
                        id: a.id,
                        protfolio_name: b,
                        title: b,
                        is_checked: !0
                    })
                }
            })
        },
        addSymbol: function(a, b, d) {
            c("addToPortfolio", a, b, d)
        },
        removeSymbol: function(a, b, d) {
            c("removeFromPortfolio", a, b, d)
        }
    }
        , e = b.Holdings = {
        uri: "/portfolio/service/",
        getList: function(b) {
            a.ajax({
                type: "GET",
                url: e.uri + "getallportfolios",
                dataType: "json",
                success: function(a) {
                    b(a.filter(function(a) {
                        return "position" === a.type
                    }))
                }
            })
        },
        create: function(b, c, d) {
            a.ajax({
                type: "GET",
                url: e.uri + "createnewportfolio",
                data: {
                    portfolioName: b,
                    portfolioType: "position"
                },
                dataType: "json",
                success: function(a) {
                    d(a.error || null, {
                        id: a.id,
                        name: b,
                        currSign: a.currSign
                    })
                }
            })
        },
        createPosition: function(b, c) {
            a.ajax({
                type: "GET",
                url: e.uri + "addnewposition",
                data: {
                    portfolio_id: b.portfolio,
                    operation: b.type,
                    pairid: b.pairId,
                    amount: b.amount,
                    price: b.price,
                    comission: b.commission,
                    posdate: b.date,
                    currencyid: b.currency,
                    pointvalue: b.pointValue,
                    leverage: b.leverage
                },
                dataType: "json",
                success: c
            })
        },
        getPosition: function(b, c) {
            a.ajax({
                url: "/portfolio/service/getcurprice",
                data: {
                    pairid: b
                },
                type: "GET",
                dataType: "json"
            }).done(c)
        }
    }
}(jQuery, window.components);
// File: core/refresher.js
function refresher(a, b, c, d, e, f, g, h, i, j, k) {
    pulse = ++j || 0;
    var b = b || 8e3
        , l = {}
        , m = "only_me" != d && "only_me" != e;
    l.pulse = pulse,
        l.refresher_version = "v1.7.0",
        l.session_uniq_id = a,
        l.sideblock_recent_quotes = c,
        l.sideblock_quotes_exists = d,
        l.quotes_bar_exists = e,
        l.markets_page_exists = f,
        l.technical_summary_box_exists = g,
        l.market_movers_box_exists = h,
        l.technical_summary_tab_exists = k,
        l.smlID = i;
    try {
        "function" == typeof FPCharts.Utils.enrich_refresher_params && (l = FPCharts.Utils.enrich_refresher_params(l))
    } catch (n) {}
    if (d && (l.sideblock_quotes_selected = $("#quotesBoxWithTabsTop li.selected").attr("id")),
        e && ("none" != $("#quotes_bar_layer1").css("display") ? l.quotes_bar_selected = "1" : "none" != $("#quotes_bar_layer2").css("display") ? l.quotes_bar_selected = "2" : "none" != $("#quotes_bar_layer3").css("display") && (l.quotes_bar_selected = "3")),
        c && (l.PortfolioSideBoxTime = PortfolioSideBoxTime,
            l.RQSideBoxTime = RQSideBoxTime),
        "undefined" != typeof MyPortfolioTime && (l.MyPortfolioTime = MyPortfolioTime),
        g && (l.tsb_activePairs = $("#TSB_ChartWrp").attr("rel"),
            l.tsb_currentTimeframe = $("#TSB_timeframe").val()),
            k) {
        var o = null;
        if ("function" == typeof get_user_settings && (o = get_user_settings()),
                o) {
            var p = o.split("|");
            l.tst_activePairs = p[0],
                l.tst_currentTimeframe = p[1]
        }
    }
    h && ("none" != $("#MM_tab1").css("display") ? l.market_movers_box_curtab = "1" : "none" != $("#MM_tab2").css("display") ? l.market_movers_box_curtab = "2" : "none" != $("#MM_tab3").css("display") && (l.market_movers_box_curtab = "3")),
        $.ajax({
            url: "/common/refresher_new/refresher_v13.2.php",
            type: "GET",
            data: l,
            dataType: ($.browser.msie,
                "text"),
            success: function(j) {
                if (j.length > 0) {
                    try {
                        var n = JSON.parse(j)
                    } catch (o) {
                        return m && ("undefined" != typeof process && console.log(q, (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2), "Mb"),
                            setTimeout(function() {
                                refresher(a, b, c, d, e, f, g, h, i, pulse, k)
                            }, 15e3)),
                            !1
                    }
                    var p, q, r;
                    for (p in n) {
                        switch (p) {
                            case "newer_version":
                                return void location.reload(!0);
                            case "SBQ":
                                SBQ(n[p]);
                                continue;
                            case "my_portfolio":
                                portfolio(n[p]);
                                continue;
                            case "my_portfolio_full":
                                portfolio_full(n[p]),
                                    MyPortfolioTime = Math.round(+new Date / 1e3);
                                continue;
                            case "SB_portfolio_full":
                                $("#portfolio").html(n[p]),
                                    PortfolioSideBoxTime = Math.round(+new Date / 1e3);
                                continue;
                            case "SB_portfolio":
                                sideBlock_portfolio(n[p]);
                                continue;
                            case "recent_full":
                                $("#recent").html(n[p]),
                                    RQSideBoxTime = Math.round(+new Date / 1e3);
                                continue;
                            case "recent":
                                sideBlock_recent(n[p]);
                                continue;
                            case "QB":
                                quotesBar(n[p]);
                                continue;
                            case "stocksonlytable":
                                stocksonlytable(n[p]);
                                continue;
                            case "marketMoversBox":
                                marketMoversBoxRefresh(n[p], l.market_movers_box_curtab);
                                continue
                        }
                        var s = n[p];
                        for (q in s)
                            if ("quotesSummary" != q) {
                                if ("flash_chart" != q)
                                    if ("js_instrument_chart" != q) {
                                        var t = s[q];
                                        for (r in t) {
                                            var u = "#" + q + " #pair_" + r
                                                , v = t[r];
                                            if (v.type)
                                                switch (v.type) {
                                                    case "value":
                                                        $("#" + v.id).html(v.data);
                                                        break;
                                                    case "css":
                                                        $("#" + v.id).removeClass(),
                                                            $("#" + v.id).addClass(v.data);
                                                        break;
                                                    case "style":
                                                        $("#" + v.id).attr("style", v.data);
                                                        break;
                                                    case "style_color":
                                                        $("#" + v.id).css("color", v.data);
                                                        break;
                                                    case "ec_bgColor":
                                                        v.checkData != $("#" + v.checkID).html() && $("#" + v.id).css("background-color", v.data);
                                                        break;
                                                    case "clear":
                                                        var w = document.getElementById(q + "cl_bid" + r)
                                                            , x = document.getElementById(q + "cl_ask" + r)
                                                            , y = document.getElementById(q + "cl_last" + r);
                                                        if (w && (w.className = ""),
                                                            x && (x.className = ""),
                                                            y && (y.className = ""),
                                                                v.date) {
                                                            var z = document.getElementById(q + "cl_date" + r);
                                                            z && (z.innerHTML = v.date)
                                                        }
                                                }
                                            else
                                                $(u).html(v)
                                        }
                                    } else
                                        try {
                                            "function" == typeof FPCharts.Utils.update_charts && FPCharts.Utils.update_charts(s[q], q)
                                        } catch (o) {}
                                else if (!FP.fcharts || FP.fcharts[s[q].flash_id].update)
                                    try {
                                        sendDataToSWF(s[q].flash_id, s[q])
                                    } catch (o) {}
                            } else
                                $("#quotes_summary_current_data").html(s[q].current_data),
                                    $("#quotes_summary_secondary_data").html(s[q].secondary_data),
                                    $("#fl_header_pair_chg").html(s[q].fl_header_pair_chg),
                                    $("#fl_header_pair_lst").html(s[q].fl_header_pair_lst),
                                    $("#fl_header_pair_pch").html(s[q].fl_header_pair_pch + "%"),
                                    $("#fl_header_pair_pch").removeClass("redFont").removeClass("greenFont").addClass(s[q].fl_header_pair_clr + "Font"),
                                    $("#fl_header_pair_chg").removeClass("redFont").removeClass("greenFont").addClass(s[q].fl_header_pair_clr + "Font")
                    }
                    delete s,
                        delete t,
                        delete p,
                        delete q,
                        delete r,
                        delete u,
                        delete v
                }
                m && setTimeout(function() {
                    refresher(a, b, c, d, e, f, g, h, i, pulse, k)
                }, b)
            },
            error: function(j, l, m) {
                setTimeout(function() {
                    refresher(a, b, c, d, e, f, g, h, i, pulse, k)
                }, 15e3)
            }
        }),
        sortTable()
}
function marketMoversBoxRefresh(a, b) {
    b && a && $("#MM_table" + b).empty().append(a)
}
function tsbRefreshLastValues(a, b) {
    var c;
    $("#TSB_main_summary_" + a + " #TSB__summary_last_" + a).html(b.last),
        $("#TSB_main_summary_" + a + " #TSB__summary_change_" + a).removeClass("greenFont redFont").addClass(b.pair_change_color + "Font"),
        $("#TSB_main_summary_" + a + " #TSB__summary_change_percent_" + a).html(b.pair_change_percent + "%"),
        $("#TSB_main_summary_" + a + " #TSB__summary_change_value_" + a).html(b.pair_change),
        $("#TSB_pair_" + a + " td:nth-child(4)").html(b.last),
        c = '<span class="newSiteIconsSprite ' + (1 == b.actualIsOpen ? "green" : "red") + 'ClockIcon">&nbsp;</span>',
        $("#TSB_pair_" + a + " td:nth-child(2)").html(c),
        $("#TSB_main_summary_" + a + " #TSB__arrowBoxSpan_" + a).removeClass("upArrow downArrow noneArrow").addClass(b.arrowBoxClass),
    b.last_step_direction && $("#TSB_main_summary_" + a + " #TSB__arrowBoxSpan_" + a).removeClass("upArrow downArrow noneArrow").addClass(b.last_step_direction.toLowerCase() + "Arrow")
}
function tsbRefreshTechnical(a, b) {
    $("#TSB_pair_" + a + " td:nth-child(5)").html(b.row.ma).removeClass("greenFont redFont neutralFont").addClass(b.row.ma_class),
        $("#TSB_main_summary_" + a + " #TSB__summary_last_" + a).html(b.row.last),
        $("#TSB_main_summary_" + a + " #TSB__technical_summary_" + a).html(b.technicalSummary).removeClass("buy sell neutral").addClass(b.technicalSummaryClass),
        $("#TSB_main_summary_" + a + " #TSB___ma_buy_" + a).html("(" + b.maBuy + ")"),
        $("#TSB_main_summary_" + a + " #TSB___ma_sell_" + a).html("(" + b.maSell + ")"),
        $("#TSB_main_summary_" + a + " #TSB___ti_buy_" + a).html("(" + b.tiBuy + ")"),
        $("#TSB_main_summary_" + a + " #TSB___ti_sell_" + a).html("(" + b.tiSell + ")"),
        $("#TSB_main_summary_" + a).attr("rel", b.updateTime)
}
function sortTable() {
    $("table[tablesorter]").trigger("update")
}
function portfolio_full(a) {
    for (portfolio_id in a)
        $("#portfolioData_" + portfolio_id).html(a[portfolio_id]);
    loadSorter(),
        PortfolioHelper.sortTable("overview"),
        $("table[tablesorter_overview]").trigger("update"),
        PortfolioHelper.sortTable("fundamental"),
        $("table[tablesorter_fundamental]").trigger("update"),
        PortfolioHelper.sortTable("technical"),
        $("table[tablesorter_technical]").trigger("update")
}
function portfolio(a) {
    var b = new Array("analysisNeutral","redFont","greenFont");
    for (portfolio_id in a)
        for (pair_id in a[portfolio_id])
            1 == a[portfolio_id][pair_id].iop ? clock = "greenClockIcon" : clock = "redClockIcon",
                $("#" + portfolio_id + "_isopen_" + pair_id + " span").removeClass("greenClockIcon").removeClass("redClockIcon").addClass(clock),
                $("#" + portfolio_id + "_last_" + pair_id).removeClass("greenBg").removeClass("redBg").addClass(a[portfolio_id][pair_id].lstBg),
                $("#" + portfolio_id + "_last_" + pair_id).html(a[portfolio_id][pair_id].lst),
                $("#" + portfolio_id + "_time_" + pair_id).html(a[portfolio_id][pair_id].tim),
                a[portfolio_id][pair_id].opn ? (color = getRefresherColor(a[portfolio_id][pair_id].clr),
                    $("#" + portfolio_id + "_open_" + pair_id).html(a[portfolio_id][pair_id].opn),
                    $("#" + portfolio_id + "_high_" + pair_id).html(a[portfolio_id][pair_id].h),
                    $("#" + portfolio_id + "_low_" + pair_id).html(a[portfolio_id][pair_id].l),
                    $("#" + portfolio_id + "_chg_" + pair_id).html(a[portfolio_id][pair_id].chg).removeClass("greenFont").removeClass("redFont").addClass(color),
                    $("#" + portfolio_id + "_p_chg_" + pair_id).html(a[portfolio_id][pair_id].pch).removeClass("greenFont").removeClass("redFont").addClass(color)) : ($("#" + portfolio_id + "_5_" + pair_id).html(a[portfolio_id][pair_id][5]).removeClass("greenFont").removeClass("redFont").removeClass("analysisNeutral").addClass(b[a[portfolio_id][pair_id]["5c"]]),
                    $("#" + portfolio_id + "_10_" + pair_id).html(a[portfolio_id][pair_id][10]).removeClass("greenFont").removeClass("redFont").removeClass("analysisNeutral").addClass(b[a[portfolio_id][pair_id]["10c"]]),
                    $("#" + portfolio_id + "_h_" + pair_id).html(a[portfolio_id][pair_id].h).removeClass("greenFont").removeClass("redFont").removeClass("analysisNeutral").addClass(b[a[portfolio_id][pair_id].hc]),
                    $("#" + portfolio_id + "_d_" + pair_id).html(a[portfolio_id][pair_id].d).removeClass("greenFont").removeClass("redFont").removeClass("analysisNeutral").addClass(b[a[portfolio_id][pair_id].dc]))
}
function sideBlock_portfolio(a) {
    for (portfolio_id in a)
        for (pair_id in a[portfolio_id])
            color = getRefresherColor(a[portfolio_id][pair_id].clr),
                $("#" + portfolio_id + "_last_" + pair_id).html(a[portfolio_id][pair_id].lst),
                $("#" + portfolio_id + "_chg_" + pair_id).html(a[portfolio_id][pair_id].chg).removeClass("greenFont").removeClass("redFont").addClass(color),
                $("#" + portfolio_id + "_p_chg_" + pair_id).html(a[portfolio_id][pair_id].pch).removeClass("greenFont").removeClass("redFont").addClass(color)
}
function sideBlock_recent(a) {
    for (pair_id in a) {
        var b = a[pair_id].clr;
        $("#_last_" + pair_id).html(a[pair_id].lst),
            $("#_chg_" + pair_id).html(a[pair_id].chg).removeClass("greenFont").removeClass("redFont").addClass(b + "Font"),
            $("#_p_chg_" + pair_id).html(a[pair_id].pch).removeClass("greenFont").removeClass("redFont").addClass(b + "Font")
    }
}
function quotesBar(a) {
    for (pair_id in a) {
        $("#qb_pair_last_" + pair_id).html(a[pair_id].lst),
            $("#qb_pair_change_" + pair_id).html(a[pair_id].pch);
        var b = a[pair_id].clrText;
        $("#qb_pair_color_" + pair_id).removeClass("greenFont").removeClass("redFont").addClass(b + "Font");
        var c = a[pair_id]["tooltip-data"];
        $("#qb_pair_changeDate_" + pair_id).html(c),
            $("#qb_pair_" + pair_id).attr("data-tooltip", c)
    }
}
function stocksonlytable(a) {
    for (pair_id in a) {
        var b = "newSiteIconsSprite redClockIcon";
        a[pair_id].clk && (b = "newSiteIconsSprite greenClockIcon"),
            color = getRefresherColor(a[pair_id].clr),
            $("#stocksonlytable #lst_" + pair_id).html(a[pair_id].lst),
            $("#stocksonlytable #bid_" + pair_id).html(a[pair_id].bid),
            $("#stocksonlytable #ask_" + pair_id).html(a[pair_id].ask),
            $("#stocksonlytable #vlm_" + pair_id).html(a[pair_id].vlm),
            $("#stocksonlytable #tim_" + pair_id).html(a[pair_id].tim),
            $("#stocksonlytable #pch_" + pair_id).html(a[pair_id].pch).removeClass("greenFont").removeClass("redFont").addClass(color),
            $("#stocksonlytable #clk_" + pair_id).removeClass().addClass(b)
    }
}
function removeBackgroundColor(a) {
    $(this).removeClass("passedTime"),
        $(this).unbind("hover", removeBackgroundColor)
}
function getSandClockString(a, b) {
    return '<span id="sandClock_' + a + '" class="newSiteIconsSprite sandClock middle" title="' + b + '"></span>'
}
function ecUpdateRevised(a, b) {
    var c = $("#eventRowId_" + a)
        , d = c.find("#eventPrevious_" + a);
    if ("string" == typeof b && b.length) {
        c.addClass("revised");
        var e = d.html() || "";
        d.data("prevHtml", e).removeClass("blackFont").addClass(-1 === (e || "").indexOf("-") ? "greenFont" : "redFont").html('<span title="' + b + '">' + e + "</span>")
    } else
        c.hasClass("revised") && (c.removeClass("revised"),
            d.removeClass("greenFont redFont").addClass("blackFont").html(d.data("prevHtml")))
}
function getRefresherColor(a) {
    return 1 == a ? "greenFont" : -1 == a ? "redFont" : ""
}
var pulse;
// File: core/register.js
function getHrefParameterByName(a) {
    var b = window.location.href;
    a = a.replace(/[\[\]]/g, "\\$&");
    var c = new RegExp("[?&]" + a + "(=([^&#]*)|&|#|$)")
        , d = c.exec(b);
    return d ? d[2] ? decodeURIComponent(d[2].replace(/\+/g, " ")) : "" : null
}
function RegistrationClass(a, b) {
    function c() {
        RegistrationClass.togglePasswordDisplay(b.find("#in_password")),
            d(),
            e(),
            $(".inputWrap INPUT").on("focus", function() {
                return $(this).parent(".inputWrap").addClass("focus"),
                    !0
            }).on("blur", function() {
                return $(this).parent(".inputWrap").removeClass("focus"),
                    !0
            }),
            $(document).on("keypress", "#loginform  input", function(a) {
                var b = a.keyCode || a.which;
                13 == b && loginPageFunctions.submitLogin()
            }),
            setTimeout(function() {
                b.find("input").each(function() {
                    var a = $(this);
                    return a.parents(".dropdown").length ? !0 : a.parent().hasClass("areaCode") ? !0 : a.parent().hasClass("disabled") ? void 0 : (a.focus(),
                        !1)
                })
            }, 500),
            $(document).on("keypress", "#signingPopup", function(a) {
                var b = a.keyCode || a.which;
                13 == b && registrationFormJs.emailSigningUP()
            }),
            btnEventList.push("customBtn2")
    }
    function d() {
        $("#countryDropdown").on("dropDownSelected", function(a, c, d) {
            f.clearError();
            var e = d.split(":")
                , g = e.length >= 2 ? e[1] : null;
            g && b.find("#in_member_phone_area").val(g)
        })
    }
    function e() {
        b.find("input[id^='in_']").bind("keypress", function(a) {
            var c = a.keyCode || a.which;
            13 == c && (b.find("#in_member_phone_country").is(":focus") && b.find("#in_member_phone_country").trigger({
                type: "keydown",
                which: 9
            }),
            $("#signUPBtn").is(":focus") && registrationFormJs.submit())
        }),
            b.find("input").on("focus click", function() {
                $(this).parent().removeClass("error beigeTooltip");
                var a = this.id.substr("RegistersiteuserForm_".length) + "Remark";
                $("#" + a).length > 0 && $("#" + a).parent(".inputWrap").removeClass("error beigeTooltip")
            }),
            b.find("input").blur(function() {
                $("#countryDropdown").is(":hover") || (registrationFormJs.clearError(),
                    registrationFormJs.checkInput(!1, this))
            }),
            b.find("in_member_phone_phone").keydown(function(a) {
                -1 !== $.inArray(a.keyCode, [46, 8, 9, 27, 13, 110, 190]) || 65 == a.keyCode && a.ctrlKey === !0 || 67 == a.keyCode && a.ctrlKey === !0 || 88 == a.keyCode && a.ctrlKey === !0 || a.keyCode >= 35 && a.keyCode <= 39 || (a.shiftKey || a.keyCode < 48 || a.keyCode > 57) && (a.keyCode < 96 || a.keyCode > 105) && a.preventDefault()
            })
    }
    var f = this;
    this.pageMsg = a,
        this.loader = $("#signingPopup #signup .loader"),
        this.allElements = $("#signingPopup #signup DIV,#signup A");
    var g = null
        , h = {}
        , i = "/members-admin/auth/signUpByEmail"
        , j = "/members-admin/auth/SaveSocial"
        , b = null === b ? $(document.createElement("div")) : b
        , k = loginFunctionsClassButtonDisability;
    this.emailSigningUP = function() {
        k.drawButton("signUpByMail"),
        k.isDisabled("signUpByMail") || (k.toggle(!0, "signUpByMail"),
            RegistrationClass.reHidePassword(),
            $("#incompletePopup").remove(),
            countryDropDown.refreshHard(),
            g = g || countryDropDown.selectedDataValue(),
            $("#emailRegistring").hasClass("displayNone") ? (trackSignUpGAEvent("Email"),
                $("#emailRegistring").removeClass("displayNone").slideDown("slow", function() {
                    $("#signingPopup").center(600)
                }).removeClass("displayNone"),
                b.find("#in_user_firstname").focus(),
                k.toggle(!1, "signUpByMail")) : (trackSignUpGAEvent("Register With Email"),
                this.checkInput(!0) ? this.submit(i) : k.toggle(!1, "signUpByMail")))
    }
        ,
        this.socialIncompleteForm = function() {
            this.checkInput(!0) && this.submit(j)
        }
        ,
        this.clearform = function() {
            b.find("#in_user_email").val(""),
                b.find("#in_password").val(""),
                b.find("#in_user_firstname").val(""),
                b.find("#in_user_lastname").val(""),
                b.find("#in_member_phone_phone").val(""),
                b.find("#in_termsAndConditions").attr("checked", !1),
                b.find("#in_broker_agree").attr("checked", !1),
                this.clearError(),
                countryDropDown.selectByValue(g),
                this.clearServerError()
        }
        ,
        this.clearError = function() {
            $("#user_emailRemark").removeClass("error beigeTooltip"),
                $("#user_passwordRemark").removeClass("error beigeTooltip"),
                $("#user_firstnameRemark").removeClass("error beigeTooltip"),
                $("#user_lastnameRemark").removeClass("error beigeTooltip"),
                $("#member_phoneRemark").removeClass("error beigeTooltip"),
                $("#termsAndConditionsRemark,#broker_agreeRemark").removeClass("error beigeTooltip")
        }
        ,
        this.clearServerError = function() {
            $("#registerSigningNotify").html(""),
                $("#registerSigningNotify").addClass("displayNone")
        }
        ,
        this.registerError = function(a, b) {
            return void 0 == a || void 0 == b ? !1 : (this.clearError(),
                b.attr("data-tooltip", a),
                b.addClass("error beigeTooltip"),
                !1)
        }
        ,
        this.invalidValidation = function(a) {
            this.clearError(),
                $("#signingPopup").stop(!1, !1).animate({
                    opacity: "1"
                }, 250),
                $("#registerSigningNotify").html(a.msg),
                $("#registerSigningNotify").removeClass("displayNone")
        }
        ,
        this.submit = function(a) {
            var b = this.checkInput();
            return 0 == b ? (k.toggle(!1, "signUpByMail"),
                !1) : (this.register(a),
                !1)
        }
        ,
        this.checkInput = function(c, d) {
            function e(a) {
                return c ? "" != a : !0
            }
            var f = b.find("#in_user_email").val()
                , g = b.find("#in_password").val()
                , h = b.find("#in_user_firstname").val()
                , i = b.find("#in_user_lastname").val()
                , j = (b.find("#in_member_phone_area").val().replace(/\+/, "") + b.find("#in_member_phone_phone").val(),
                b.find("#in_member_phone_phone").val())
                , k = this.getcountrycode(b.find("#in_member_phone_country").attr("data-value"))
                , l = "undefined" == typeof d || $(d).is("#in_member_phone_area, #in_member_phone_phone, #in_member_phone_country");
            return (e(h) && "" == h || this.nameValidation(h, this.pageMsg._auth_register_youFirstName, $("#user_firstnameRemark"))) && (e(i) && "" == i || this.nameValidation(i, this.pageMsg._auth_register_youLastName, $("#user_lastnameRemark"))) ? e(f) && "" == f || validateProfileEmail(f) ? b.find("#in_password").length > 0 && (!e(g) || "" != g) && this.validatePassword(g, $("#user_passwordRemark")) ? this.registerError(a.login_err_password_2letters_2digits, $("#user_passwordRemark")) : !l || e(j) && "" == j || 0 != this.phoneValidation(j, k) ? 0 == b.find("#in_termsAndConditions").is(":checked") && c ? this.registerError(a._error_agreed_false, $("#termsAndConditionsRemark")) : b.find("#in_broker_agree").length && 0 == b.find("#in_broker_agree").is(":checked") && c ? this.registerError(a._error_broker_agreed_false, $("#broker_agreeRemark")) : ($("#signUPBtn").removeClass("disabled"),
                !0) : this.registerError(a.__error_phone__, $("#member_phoneRemark")) : this.registerError(a._auth_login_error_validEmailRemark, $("#user_emailRemark")) : !1
        }
        ,
        this.register = function(a) {
            var c = new FormData;
            c.append("user_email", b.find("#in_user_email").val()),
            b.find("#in_password").length > 0 && c.append("password", b.find("#in_password").val()),
            b.find("#in_socialUser").length > 0 && c.append("userInfo", b.find("#in_socialUser").val()),
                c.append("user_firstname", b.find("#in_user_firstname").val()),
                c.append("user_lastname", b.find("#in_user_lastname").val()),
                c.append("termsAndConditions", b.find("#in_termsAndConditions").is(":checked") ? 1 : 0),
                c.append("member_phone_country", b.find("#in_member_phone_area").val());
            var d = (countryDropDown.selectedDataValue() || "").split(":")[0];
            c.append("company_country_ID", d),
                c.append("member_phone_phone", b.find("#in_member_phone_phone").val()),
                c.append("member_phone_country_code", this.getcountrycode(b.find("#in_member_phone_country").attr("data-value"))),
                b.find("#in_broker_agree").length ? c.append("broker_agree", b.find("#in_broker_agree").is(":checked") ? 1 : 0) : c.append("broker_agree", 0),
            b.find("#in_broker_deal_id").length && c.append("broker_deal_id", b.find("#in_broker_deal_id").val()),
                authFormDataAppend(c);
            var e = this;
            $.ajax({
                url: a,
                type: "POST",
                dataType: "json",
                data: c,
                processData: !1,
                contentType: !1
            }).done(function(a) {
                window.authHandler(a, e),
                    k.toggle(!1, "signUpByMail")
            }).fail(function(a, b, c) {})
        }
        ,
        this.validatePassword = function(a, b) {
            var c = this.pageMsg.login_err_password_2letters_2digits;
            if (a.length < 4 || a.length > 15)
                return 0 == this.registerError(c, b);
            var d = /(.*[0-9].*[0-9])/;
            return 0 == d.test(a) ? 0 == this.registerError(c, b) : (d = /(.*[-a-zA-Z].*[-a-zA-Z])/,
                0 == d.test(a) ? 0 == this.registerError(c, b) : void 0)
        }
        ,
        this.getLengthInBytes = function(a) {
            var b = a.match(/[^\x00-\xff]/g);
            return a.length + (b ? b.length : 0)
        }
        ,
        this.nameValidation = function(b, c, d) {
            var e = this.getLengthInBytes(b);
            if (b.length > 16 || e < a._minChars || "" == b.trim())
                return this.registerError(c, d),
                    !1;
            var f = /^[^!@#$%$&*)(}{\^]*$/
                , g = /^[^\d]*$/;
            return 0 == f.test(b) || 0 == g.test(b) ? (this.registerError(a._auth_register_error_nameInvalidChars, d),
                !1) : !0
        }
        ,
        this.phoneValidation = function(b, c) {
            var d = !1
                , e = c + "_" + b;
            return a.__error_phone__ = a._auth_register_error_validPhone,
                b.length < 4 || void 0 == c || "" == c.trim() ? !1 : ($.isUn(h[e]) ? (loginFunctionsClassButtonDisability.toggle(!0, "signUpByMail"),
                    $.ajax({
                        url: "/members-admin/auth/CheckPhone/",
                        type: "POST",
                        data: {
                            phone: b,
                            country: c
                        },
                        async: !1
                    }).done(function(b) {
                        loginFunctionsClassButtonDisability.toggle(!1, "signUpByMail", 256),
                            h[e] = !1,
                            "success" == b ? (h[e] = !0,
                                d = !0) : "invalid" != b && (a.__error_phone__ = b)
                    }).fail(function(a, b, c) {})) : d = h[e],
                    d)
        }
        ,
        this.getcountrycode = function(a) {
            var b = a.split(":");
            return 3 == b.length ? b[2] : ""
        }
        ,
        c()
}
function changePasswordClass(a) {
    var b = this;
    this.pageMsg = a,
        this.password = $("#password"),
        this.password_conf = $("#password_conf"),
        this.serverErrors = $("#serverErrors"),
        this.loader = $("#resetpassword #content .loader"),
        this.allElements = $("#resetpassword #content DIV , A"),
        this.clearError = function(a) {
            var b = $(a).attr("id");
            $("#" + b + "_Remark").attr("data-tooltip", "").removeClass("error beigeTooltip")
        }
        ,
        this.validatePassword = function(a, b) {
            if ($("i.showPassword:hover").length)
                return !1;
            var c = $(b).attr("id");
            if (a.length < 4 || a.length > 15)
                return $("#" + c + "_Remark").attr("data-tooltip", this.pageMsg.login_err_password_2letters_2digits).addClass("error beigeTooltip"),
                    !1;
            var d = /(.*[0-9].*[0-9])/;
            return 0 == d.test(a) ? ($("#" + c + "_Remark").attr("data-tooltip", this.pageMsg.login_err_password_2letters_2digits).addClass("error beigeTooltip"),
                !1) : (d = /(.*[-a-zA-Z].*[-a-zA-Z])/,
                0 == d.test(a) ? ($("#" + c + "_Remark").attr("data-tooltip", this.pageMsg.login_err_password_2letters_2digits).addClass("error beigeTooltip"),
                    !1) : !0)
        }
        ,
        this.validateBoth = function() {
            return this.password.val() != this.password_conf.val() ? ($("#password_Remark").attr("data-tooltip") || this.serverErrors.text(this.pageMsg._login_err_passwords_not_match).removeClass("displayNone"),
                !1) : !0
        }
        ,
        this.changepassword = function() {
            if (this.validatePassword(this.password.val(), this.password) && this.validatePassword(this.password_conf.val(), this.password_conf) && this.validateBoth) {
                this.serverErrors.text("").addClass("displayNone"),
                    this.loader.fadeIn("fast"),
                    this.allElements.animate({
                        opacity: "0.2"
                    }, 500);
                var a = $("#ResetpasswordForm")
                    , b = "";
                $.ajax({
                    url: "/members-admin/auth/resetpassword/",
                    dataType: "json",
                    data: a.serialize(),
                    async: !1,
                    type: "POST",
                    success: function(a) {
                        switch (a.error) {
                            case "0":
                                overlay.overlayPasswordupdated($("#passwordUpdatePopupContainer").html());
                                break;
                            case "1":
                            case "2":
                                window.location.href = "/members-admin/login";
                                break;
                            default:
                                b = a.error
                        }
                    }
                }),
                    this.loader.fadeOut("fast"),
                    this.allElements.animate({
                        opacity: "1"
                    }, 500),
                "" != b && this.serverErrors.text(b).removeClass("displayNone")
            }
        }
    ;
    var c = !1;
    $(document).ready(function() {
        $("#submitButton").click(function(a) {
            RegistrationClass.reHidePassword(),
                c = !0;
            var d = b.validateBoth();
            d ? b.changepassword() : c = !1
        }),
            $("#password,#password_conf").on("focus click", function(a) {
                b.serverErrors.text("").addClass("displayNone"),
                    b.clearError($(this))
            }),
            $("#password,#password_conf").focusout(function(a) {
                return (!c && "" == b.password.val() || b.validatePassword(b.password.val(), b.password)) && ("" == b.password_conf.val() || b.validatePassword(b.password_conf.val(), b.password_conf)) ? void 0 : !1
            }),
            RegistrationClass.togglePasswordDisplay($("#password")),
            RegistrationClass.togglePasswordDisplay($("#password_conf"))
    }),
        $(".inputWrap INPUT").on("focus", function() {
            $(this).parent(".inputWrap").addClass("focus")
        }).on("blur", function() {
            $(this).parent(".inputWrap").removeClass("focus")
        })
}
function loginFunctionsClass(a, b) {
    var c = this
        , d = a.is("loginPopup") ? "signInButtonPopped" : "signInButton";
    this.divid = a,
        this.email = $("#" + a + " #loginFormUser_email"),
        this.password = $("#" + a + " #loginForm_password"),
        this.passwordNotify = $("#" + a + " #passwordSigningNotify"),
        this.emailNotify = $("#" + a + " #emailSigningNotify"),
        this.serverErrors = $("#" + a + " #serverErrors"),
        this.logintoken = $("#logintoken"),
        this.loginformid = $("#" + a + "form"),
        this.pageMsg = b,
        this.loader = $("#" + a + " #signup .loader"),
        this.allElements = $("#" + a + " #signup DIV, #signup A"),
        $(document).on("focus", "#" + a + " #loginFormUser_email,#loginPopup #loginFormUser_email,#loginForm_password", function() {
            c.checkInput(),
                $(this).parent().removeClass("error beigeTooltip")
        }),
        this.submitLogin = function() {
            if (!loginFunctionsClassButtonDisability.isDisabled(d)) {
                loginFunctionsClassButtonDisability.toggle(!0, d),
                    RegistrationClass.reHidePassword();
                var a = this.checkInput(!0);
                return 0 == a ? loginFunctionsClassButtonDisability.toggle(!1, d) : (this.validatelogin(),
                    !1)
            }
        }
        ,
        this.clearform = function() {
            this.password.val("")
        }
        ,
        this.clearError = function() {
            this.passwordNotify.attr("data-tooltip", "").removeClass("error beigeTooltip"),
                this.emailNotify.attr("data-tooltip", "").removeClass("error beigeTooltip")
        }
        ,
        this.validatelogin = function() {
            var a = this
                , b = this.email.val()
                , c = this.password.val()
                , e = this.logintoken.val();
            this.serverErrors.text(""),
                this.loader.fadeIn("fast"),
                this.allElements.stop(0, 0).animate({
                    opacity: "0.2"
                }, 500);
            var f = {
                email: b,
                password: c,
                logintoken: e
            };
            authFormDataAppend(f),
                $.ajax({
                    url: "/members-admin/auth/signInByEmail/",
                    dataType: "json",
                    data: f,
                    async: !1,
                    type: "POST",
                    success: function(b) {
                        a.allElements.stop(0, 0).animate({
                            opacity: "1"
                        }, 500),
                            a.loader.hide(),
                            window.authHandler(b, a),
                            loginFunctionsClassButtonDisability.toggle(!1, d, 256)
                    }
                })
        }
        ,
        this.checkInput = function(a) {
            function b(b) {
                return a ? "" != b : !0
            }
            var c = !1
                , d = this.email.val()
                , e = this.password.val();
            this.clearError();
            var f = validateProfileEmail(d);
            return b(d) && "" == d || f ? this.emailNotify.removeClass("error beigeTooltip") : (this.emailNotify.attr("data-tooltip", this.pageMsg.auth_login_error_validEmailRemark).addClass("error beigeTooltip"),
                c = !0),
                b(e) && "" == e || !(e.length < 3) || c ? this.passwordNotify.removeClass("error beigeTooltip") : (this.passwordNotify.attr("data-tooltip", this.pageMsg.login_err_password_2letters_2digits).addClass("error beigeTooltip"),
                    this.passwordNotify.addClass("error beigeTooltip"),
                    c = !0),
            1 != c
        }
        ,
        this.fadeOut = function() {
            $("#" + this.divid).fadeOut()
        }
        ,
        this.fadeIn = function() {
            $("#" + this.divid).fadeIn()
        }
}
function ForgotPasswordRequest(a, b) {
    function c() {
        var b = $("#passwordResetRequest")
            , c = b.find(".notification").empty().addClass("displayNone")
            , e = $("#email").val()
            , f = $("#email").parent(".inputWrap");
        return d.drawButton("forgotPassword"),
            validateProfileEmail(e) ? void (d.isDisabled("forgotPassword") || (d.toggle(!0, "forgotPassword"),
                $.ajax({
                    url: "/members-admin/auth/AjaxSendResetPassword/",
                    dataType: "json",
                    data: b.serialize(),
                    async: !1,
                    type: "POST",
                    success: function(a) {
                        d.toggle(!1, "forgotPassword"),
                            $("#loadingimage").hide(),
                            "1" == a.response ? (hidePopup("passwordResetRequest"),
                            a.successMsg && $("#successmsg").html(a.successMsg),
                                overlay.overlayPasswordResetSent($("#emailConfirmPopup").html())) : c.html(a.msg).removeClass("displayNone")
                    }
                }))) : void f.attr("data-tooltip", a).addClass("error beigeTooltip")
    }
    var d = loginFunctionsClassButtonDisability;
    $("#email").focus(function() {
        $("#email").parent(".inputWrap").removeClass("error beigeTooltip")
    }),
        $(".inputWrap INPUT").on("focus", function() {
            $(this).parent(".inputWrap").addClass("focus")
        }).on("blur", function() {
            $(this).parent(".inputWrap").removeClass("focus")
        }),
        $("#email").focusout(function() {
            var b = $("#email").parent(".inputWrap");
            0 == validateProfileEmail($("#email").val()) && b.attr("data-tooltip", a).addClass("error beigeTooltip")
        }),
        $("#email").bind("keypress", function(a) {
            var b = a.keyCode || a.which;
            13 == b && c()
        }),
        this.submitForgotPassword = c
}
function OverlayClass() {
    this.authCompleteAction = null,
        this.loadhtml = function(a, b, c) {
            $.ajax({
                url: a,
                type: "GET",
                data: c,
                async: !1
            }).done(function(a) {
                "" != a && $("body").append(a)
            }).then(b)
        }
        ,
        this.overlaySocialwelcome = function() {
            var a = "/members-admin/auth/socialwelcome";
            window.location = a
        }
        ,
        this.overlayLogin = function() {
            loginFunctionsClassButtonDisability.toggle(!1, "signInButton"),
                loginFunctionsClassButtonDisability.toggle(!1, "signInButtonPopped"),
            $("#signingPopup").length && hidePopup("signingPopup"),
                showOverlay(),
                $("#loginPopup").length ? (loginFunctions.clearform(),
                    loginFunctions.clearError()) : this.loadhtml("/members-admin/auth/getSignInPopUp", loginFunctionsClass.initLoginPopupScript),
                this.showFadeInPopupNew("loginPopup"),
            window.loginPageFunctions && window.loginPageFunctions.fadeOut(),
                $("#serverErrors")._hide()
        }
        ,
        this.overlayRegister = function() {
            if ($("#loginPopup").length && hidePopup("loginPopup"),
                    showOverlay(),
                    !$("#signingPopup").length) {
                var a = {};
                this.authCompleteAction && (a.popupAuthCompleteAction = this.authCompleteAction),
                    this.loadhtml("/members-admin/auth/getRegisterPopUp", function() {
                        window.renderButtons && window.renderButtons()
                    }, a)
            }
            registrationFormJs.clearform(),
                $("#emailRegistring").addClass("displayNone"),
                this.showFadeInPopupNew("signingPopup"),
            window.loginPageFunctions && window.loginPageFunctions.fadeOut()
        }
        ,
        this.overlayPasswordResetSent = function(a) {
            var b = !0;
            showOverlay();
            var c = 200;
            this.popupPositionSet("emailConfirmPopup", c, b),
                this.showFadeInPopupNew("emailConfirmPopup")
        }
        ,
        this.overlayPasswordupdated = function(a) {
            var b = !0;
            showOverlay();
            var c = 200;
            this.popupPositionSet("passwordUpdatePopup", c, b),
                this.showFadeInPopupNew("passwordUpdatePopup")
        }
        ,
        this.overlayForgotPassword = function() {
            $("#loginPopup").length && hidePopup("loginPopup"),
                showOverlay(),
            $("#passwordResetRequest").length || this.loadhtml("/members-admin/auth/getPasswordResetPopUp"),
                $("#passwordResetRequest").show(),
                this.showFadeInPopupNew("passwordResetRequest")
        }
        ,
        this.overlayClose = function() {
            components.GeneralOverlay.hide(),
            window.loginPageFunctions && window.loginPageFunctions.fadeIn()
        }
        ,
        this.overlayRegisteremailverfivationpopup = function() {
            this.loadhtml("/members-admin/auth/registeremailverfivationpopup", function(a) {
                hidePopup("signingPopup"),
                    showOverlay(),
                    $("#registrationMailVerify").replaceWith($(a)),
                    $("#registrationMailVerify").center().show(),
                    showOverlay()
            })
        }
        ,
        this.overlayincompetedpopup = function(a) {
            var b = $("#incompletePopup");
            a.length < 1 || (hidePopup("signingPopup"),
                hidePopup("loginPopup"),
                $("#loginPopup").remove(),
                $("#signingPopup").remove(),
                showOverlay(),
                b.length > 0 ? b.replaceWith(a) : $("body").append(a),
                $("#incompletePopup").center().show(),
                showOverlay())
        }
        ,
        this.overlayRedirect = function(a) {
            window.location = a
        }
        ,
        this.overlayAuthFacebook = function(a) {
            var b = {
                code: a
            };
            authFormDataAppend(b),
                $.post("/members-admin/auth/signInUpBySocialFb", b, function(a) {
                    authHandler(JSON.parse(a))
                })
        }
        ,
        this.facebook_login = function() {
            window.open("/members-admin/auth/socialOauthFb", "mywin", "scrollbars=yes,resizable=yes,width=750,height=500,status=yes,toolbar=no,menubar=no", "fbreview")
        }
        ,
        this.popupPositionSet = function(a, b, c) {
            c = c || !1;
            var d = $(document).height()
                , e = $(window).height()
                , f = e - b;
            f /= 2,
            0 > f && (f = 0),
                $(".generalOverlay").css({
                    height: d + "px"
                }),
                $("#" + a).css({
                    top: f + "px"
                }),
                c ? $("#" + a).css({
                    position: "fixed"
                }) : $("#" + a).css({
                    position: "absolute"
                })
        }
        ,
        this.showAnimatedPopupNew = function(a) {
            $("#" + a).css({
                position: "fixed",
                opacity: 0
            }).center().show();
            var b = $("#" + a).fixedPosition();
            $("#" + a).css("top", -100).css("opacity", 1),
                $("#" + a).animate({
                    top: b.top
                }, 100)
        }
        ,
        this.showFadeInPopupNew = function(a) {
            $("#" + a || this.divid).css({
                position: "fixed",
                opacity: 0
            }).center().show().animate({
                opacity: 1
            }, 250),
                $(window).unbind("resize").resize(function(b) {
                    $("#" + a || this.divid).center(50)
                })
        }
}
var getLoginFunctions = function() {
    return window.loginFunctions || window.loginPageFunctions
}
    , overlay = new OverlayClass
    , btnEventList = []
    , authFormDataAppend = function(a) {
    if (overlay.authCompleteAction) {
        var b = {
            pathname: "path",
            search: "search",
            hash: "hash"
        };
        overlay.authCompleteAction.location || (overlay.authCompleteAction.location = {});
        for (var c in b)
            overlay.authCompleteAction.location[b[c]] || (overlay.authCompleteAction.location[b[c]] = window.location[c]);
        window.siteData.smlID && !overlay.authCompleteAction.smlID && (overlay.authCompleteAction.smlID = window.siteData.smlID),
        window.siteData.mmID && !overlay.authCompleteAction.mmID && (overlay.authCompleteAction.mmID = window.siteData.mmID);
        var d = JSON.stringify(overlay.authCompleteAction)
            , e = "onAuthCompleteAction";
        a instanceof FormData ? a.append(e, d) : a[e] = d
    }
}
    , authOnComplete = function(a) {
    function b() {
        if (!("function" == typeof window.siteData.onLoginFinished && window.siteData.onLoginFinished(a) === !1 || "function" == typeof window.siteData.onRegisterFinished && window.siteData.onRegisterFinished(a) === !1)) {
            var b = a.location.url;
            if (!b) {
                if (window.isLoginPage)
                    return void (window.location = "/");
                b = window.location.href
            }
            var c, d = 0 === b.indexOf("http");
            c = d ? b == window.location.href : b == window.location.pathname,
            a.location.hash && (b += "#" + a.location.hash),
                window.location.href = b,
            c && a.location.hash && window.location.reload()
        }
    }
    a.justVerified && window.ga && window.ga.loaded ? window.ga("allSitesTracker.send", "event", "Signup", "Sign Up Completion", "Registration Completed Successfully", {
        hitCallback: b
    }) : b()
}
    , authHandler = function(a, b) {
    if (a.optimizelyEvents)
        for (var c in a.optimizelyEvents)
            console.log(a.optimizelyEvents[c]),
                window.optimizely.push(["trackEvent", a.optimizelyEvents[c]]);
    switch (a.response) {
        case "OK":
            $("#loginPopup").css("display", "").addClass("displayNone"),
            "1" != window.domainId && "56" != window.domainId || (window._vis_opt_queue = window._vis_opt_queue || [],
                window._vis_opt_queue.push(function() {
                    _vis_opt_goal_conversion(202)
                })),
                authOnComplete(a);
            break;
        case "Not_Verified_Phone":
            SMSVerifcation.getInstance().init();
            break;
        case "Not_Verified_Email":
            $("#loginPopup").css("display", "").addClass("displayNone"),
                components.EmailConfirmation(a.popup);
            break;
        case "STATUS_INCOMPLETE":
            overlay.overlayincompetedpopup(a.popup);
            break;
        case "Invalid_Validation":
            b && "function" == typeof b.invalidValidation && b.invalidValidation(a);
            break;
        default:
            msg = a.msg,
            "" != msg && (b && b.serverErrors ? b.serverErrors.text(msg).removeClass("displayNone") : window.getLoginFunctions().serverErrors.text(msg).removeClass("displayNone"))
    }
};
RegistrationClass.reHidePassword = function() {
    $("#password,#password_conf,#" + this.divid + " #loginForm_password,#loginPopup #loginForm_password,#in_password").prop("type", "password").parent().find("i").removeClass("reveal")
}
    ,
    RegistrationClass.togglePasswordDisplay = function(a) {
        var b = a.parent().find("i");
        b.mousedown(function() {
            return !1
        }),
            b.click(function(b) {
                var c = a.attr("type");
                a.prop("type", "text" == c ? "password" : "text"),
                    $(this).toggleClass("reveal"),
                    a.focus()
            })
    }
;
var loginFunctionsClassButtonDisability = {
    selectors: {
        signInButton: "#signup a.newButton",
        signInButtonPopped: "#loginPopup #signup a.newButton",
        changeMailButton: "#emailConfirmationPopup .js-change_email_btn",
        signUpByMail: "#signingPopup #signup #signUPBtn",
        forgotPassword: "#passwordResetRequest #signup .newButton"
    },
    drawButton: function(a) {
        return this.$[a] && this.$[a].length || !this.selectors[a] || (this.$[a] = $(this.selectors[a])),
            this
    },
    $: {},
    disabled: {},
    isDisabled: function(a) {
        return !!this.disabled[a]
    },
    toggle: function(a, b, c) {
        c ? setTimeout(this.toggleAction.bind(this, a, b), c) : this.toggleAction.apply(this, arguments)
    },
    toggleAction: function(a, b) {
        return this.drawButton(b),
            this.disabled[b] = !!a,
        this.$[b] && this.$[b].length && this.$[b].toggleClass("disabled", this.disabled[b]),
            this.disabled[b]
    }
};
loginFunctionsClass.initLoginPage = function(a, b) {
    $(document).ready(function() {
        window.loginPageFunctions = new loginFunctionsClass(a,b),
            RegistrationClass.togglePasswordDisplay($("#" + a + " #loginForm_password")),
            $("#" + a + " input").bind("keypress", function(a) {
                var b = a.keyCode || a.which;
                13 == b && window.loginPageFunctions.submitLogin()
            }),
            $("#" + a + " .inputWrap INPUT").on("focus", function() {
                $(this).parent(".inputWrap").addClass("focus")
            }).on("blur", function() {
                $(this).parent(".inputWrap").removeClass("focus")
            }),
            window.render ? window.render("customBtn-page") : btnEventList.push("customBtn-page")
    })
}
    ,
    loginFunctionsClass.initLoginPopup = function(a) {
        return btnEventList.push("customBtn1"),
        window.renderButtons && window.renderButtons(),
            new loginFunctionsClass("loginPopup",a)
    }
    ,
    loginFunctionsClass.initLoginPopupScript = function() {
        var a = $("#loginPopup");
        RegistrationClass.togglePasswordDisplay(a.find("#loginForm_password")),
            a.find("input").bind("keypress", function(a) {
                var b = a.keyCode || a.which;
                13 == b && loginFunctions.submitLogin()
            }),
            a.find(".inputWrap INPUT").on("focus", function() {
                $(this).parent(".inputWrap").addClass("focus")
            }).on("blur", function() {
                $(this).parent(".inputWrap").removeClass("focus")
            }),
            a.find(".js-signup-btn").click(function() {
                window.ga && window.ga("allSitesTracker.send", {
                    hitType: "event",
                    eventCategory: "Signup",
                    eventAction: "Sign Up Button",
                    eventLabel: "Sign In Pop Up"
                })
            })
    }
;
// File: core/save-item-btn.js
loader([{
    type: "$",
    value: ".js-save-item-btn"
}, {
    type: "component",
    value: "SavedItems"
}, "siteData", "overlay"]).ready(function(a, b, c, d) {
    function e(a, b) {
        return i[a + ":" + b] || []
    }
    function f(a) {
        var c = $(this)
            , e = c.closest(".js-commentDropDownOptions")
            , f = e.find(".js-saveItemResult")
            , g = c.attr("data-item-id")
            , h = c.attr("data-item-type");
        e.length && f.length || (e = c.find(".tooltipPopup"),
            f = c.find(".js-saveItemResult")),
            b.create(h, g, function(a, b) {
                if (e.find(".addRow")._hide(),
                        f.find("div")._hide(),
                    a || !b)
                    switch (a.toLowerCase()) {
                        case "not authorized":
                        case "unauthorized":
                            d.overlayLogin(),
                                e._hide();
                            break;
                        case "already saved":
                            f._show().find(".js-saveItemAlreadySaved")._show()
                    }
                else
                    f._show().find(".js-saveItemSuccess")._show()
            })
    }
    function g(a) {
        $(this).closest(".tooltipPopup")._hide(),
            a.stopPropagation()
    }
    function h(a) {
        a.on("click", k(f, 1500)).find(".js-close").on("click", g)
    }
    var i = {}
        , j = new Date
        , k = function(a, b) {
        return function(c) {
            (new Date).getTime() - j.getTime() > b && (j = new Date,
                a.call(this, c))
        }
    };
    a.each(function(b) {
        var c = a.eq(b)
            , d = c.attr("data-item-id")
            , f = c.attr("data-item-type");
        i[f + ":" + d] = [],
            e(f, d).push(c)
    }),
        h(a),
        window.bindAllCommentSaveActions = h
});
// File: core/saved-items-service.js
!function(a, b, c) {
    "use strict";
    function d(a, c, d, e, g) {
        var h = {
            type: c,
            id: d,
            timestamp: e
        };
        return "create" != a || window.siteData.userLoggedIn ? b.ajax({
            url: f[a],
            type: "POST",
            data: h
        }).done(function(a) {
            return !a || b.match(a, ["Not authorized", "unauthorized", "failed", "already saved"]) ? g(a || "no result") : void g(null, a)
        }).fail(function(a) {
            g(a)
        }) : (overlay.authCompleteAction = {
            type: "savedItems",
            actionData: h
        },
            void overlay.overlayLogin())
    }
    var e = "/membersadmin/service/"
        , f = {
        create: e + "saveItem",
        remove: e + "deleteSaveItem"
    };
    a.SavedItems = {
        create: function(a, b, e) {
            return d("create", a, b, c, e)
        },
        remove: function(a, b, c, e) {
            return d("remove", a, b, c, e)
        }
    }
}(window.components, jQuery);
// File: core/sms-verification.js
var SMSVerifcation = function() {
    function a() {
        var a = new SMSVerifcationClass;
        return a
    }
    var b;
    return {
        getInstance: function() {
            return b || (b = a()),
                b
        }
    }
}()
    , SMSVerifcationClass = function() {};
SMSVerifcationClass.prototype.countryDropDown = null,
    SMSVerifcationClass.prototype.dialogs = {},
    SMSVerifcationClass.prototype.init = function() {
        var a = this;
        a.cleanUp(),
            $.get("/members-admin/service/getVerifyPhonePopup", function(b) {
                try {
                    $(b).addClass("displayNone").appendTo("body"),
                        a.initDialogs(),
                        a.dialog("SMS_Recive_Code").show({
                            center: !0
                        })
                } catch (c) {
                    console.log("ERROR: not inited")
                }
            })
    }
    ,
    SMSVerifcationClass.prototype.cleanUp = function() {
        for (var a in this.dialogs)
            this.dialogs[a].remove();
        this.countryDropDown = null,
            this.dialogs = {}
    }
    ,
    SMSVerifcationClass.prototype.initDialogs = function() {
        var a = this
            , b = {
            SMS_Recive_Code: {
                binds: {
                    ".closePopup": ["click", function(a) {
                        a.close()
                    }
                    ],
                    ".SMS_send_button": ["click", this.reciveCode],
                    "#in_member_phone_phone": ["focus", this.removeToolTip],
                    ".js_already_have_account": ["click", function(a) {
                        a.close(),
                            this.openLoginPopup()
                    }
                    ]
                }
            },
            SMS_Verify_Code: {
                binds: {
                    ".closePopup": ["click", function(a) {
                        a.close()
                    }
                    ],
                    ".SMS_send_button": ["click", this.verifyCode],
                    ".js-reopen-send-code": ["click", function() {
                        a.dialogs.SMS_Recive_Code.show({
                            center: !0
                        })
                    }
                    ],
                    "#phoneCode": ["focus", this.removeToolTip]
                }
            }
        };
        for (var c in b) {
            var d = b[c]
                , e = $("#" + c);
            !function(b, c) {
                a.dialogs[b] = {
                    id: b,
                    node: e,
                    show: function() {
                        return components.GeneralOverlay.setParams({}).hide().show({
                            $popup: this.node,
                            center: !0
                        }),
                            a.removeToolTip(this),
                            this
                    },
                    close: function() {
                        return $.get("/members-admin/logout"),
                            components.GeneralOverlay.hide(),
                            this
                    },
                    remove: function() {
                        return this.node.remove(),
                            this
                    }
                };
                for (var d in c.binds)
                    !function(c) {
                        e.find(d)[c[0]](function() {
                            $(this).hasClass("disabled") || c[1].call(a, a.dialogs[b], this)
                        })
                    }(c.binds[d])
            }(c, d)
        }
        this.countryDropDown = new DropdownSelector("#SMS_Recive_Code #countryDropdown","#SMS_Recive_Code #in_member_phone_country",5,!0,a.getTranslate("_select_country")),
            $("#SMS_Recive_Code #countryDropdown").on("dropDownSelected", function(a, b, c) {
                $("#SMS_Recive_Code #in_member_phone_area").val(c.split(":")[1])
            })
    }
    ,
    SMSVerifcationClass.prototype.dialog = function(a) {
        return this.dialogs[a]
    }
    ,
    SMSVerifcationClass.prototype.showToolTip = function(a, b) {
        a.node.find("[data-tooltip]").attr("data-tooltip", b).addClass("error beigeTooltip")
    }
    ,
    SMSVerifcationClass.prototype.removeToolTip = function(a) {
        a.node.find("[data-tooltip]").removeClass("error beigeTooltip")
    }
    ,
    SMSVerifcationClass.prototype.getTranslate = function(a) {
        return this.translates[a] || a.replace(/^_/, "")
    }
    ,
    SMSVerifcationClass.prototype.verifyPhoneTextTimeLeft = {
        timers: {},
        init: function(a, b, c, d) {
            var e = this
                , f = "counter_" + d.id;
            this.timers[f] && clearInterval(this.timers[f]);
            var g = a.showNotification(d, b.replace("{x}", '<b id="' + f + '"></b>'), !0)
                , h = g.find("#" + f)
                , i = 3600 >= c ? "mm:ss" : "hh:mm:ss";
            e.setTimer(i, h, c - 1),
                e.timers[f] = setInterval(function() {
                    c--,
                        0 > c ? (clearInterval(e.timers[f]),
                            a.hideNotification(d, !0)) : e.setTimer(i, h, c)
                }, 1e3)
        },
        zeroPad: function(a) {
            for (var b in a)
                a[b] < 10 && (a[b] = "0" + a[b]);
            return a
        },
        parseTime: function(a) {
            var b = {};
            return b.hours = Math.floor(a / 3600),
                b.minutes = Math.floor((a - 3600 * b.hours) / 60),
                b.seconds = a - 3600 * b.hours - 60 * b.minutes,
                this.zeroPad(b)
        },
        setTimer: function(a, b, c) {
            var d = this.parseTime(c);
            switch (a) {
                case "mm:ss":
                    b.html(d.minutes + ":" + d.seconds);
                    break;
                case "hh:mm:ss":
                    b.html(d.hours + ":" + d.minutes + ":" + d.seconds)
            }
        }
    },
    SMSVerifcationClass.prototype.showNotification = function(a, b, c) {
        c && this.disableSendButton(a);
        var d = a.node.find(".notificationServerReply");
        return d.html(b).removeClass("displayNone"),
            d
    }
    ,
    SMSVerifcationClass.prototype.hideNotification = function(a, b) {
        a.node.find(".notificationServerReply").addClass("displayNone"),
        b && this.enableSendButton(a)
    }
    ,
    SMSVerifcationClass.prototype.errorHandler = function(a, b) {
        var c = this;
        switch (c.disableSendButton(b),
        "string" == typeof a && (a = {
            msg: a,
            delay: 0
        }),
        b.timeOut && clearTimeout(b.timeOut),
            b.timeOut = setTimeout(function() {
                c.enableSendButton(b)
            }, 1e3 * a.delay),
            a.msg) {
            case "_ERROR_SESSION_EXPIRED":
                c.openLoginPopup(c.getTranslate("_ERROR_SESSION_EXPIRED"));
                break;
            case "_ERROR_WAIT_TO_RETRY":
            case "_SMS_Exceed_Limits":
                clearTimeout(b.timeOut),
                    c.verifyPhoneTextTimeLeft.init(c, c.getTranslate(a.msg), a.delay, b);
                break;
            case "_ERROR_BLOCKED":
                hidePopup();
                break;
            case "_ERROR_INVALID_SESSION":
                var d = c.dialog("SMS_Recive_Code").show({
                    center: !0
                });
                c.showNotification(d, c.getTranslate(a.msg));
                break;
            case "_STATUS_INCOMPLETE_VERIFICATION_EMAIL":
                hidePopup(),
                    components.EmailConfirmation(a.popup);
                break;
            default:
                c.showToolTip(b, c.getTranslate(a.msg))
        }
    }
    ,
    SMSVerifcationClass.prototype.reciveCode = function(a) {
        var b = this
            , c = b.getTranslate("_ERROR_INVALID_NUMBER")
            , d = {
            phone_area: {
                required: [c],
                minLen: [1, c]
            },
            phone: {
                required: [c],
                minLen: [4, c]
            }
        }
            , e = {
            company_country_ID: (b.countryDropDown.selectedDataValue() || "").split(":")[0],
            phone_area: a.node.find("#in_member_phone_area").val(),
            phone: a.node.find("#in_member_phone_phone").val(),
            service: a.node.find("input[name=service]:checked").val()
        };
        b.disableSendButton(a),
            trackSignUpGAEvent("Send Code Button");
        var f = new Validator;
        f.validate(e, d) === !0 ? $.post("/members-admin/service/getSMSCode", e, function(c) {
            try {
                if (c = JSON.parse(c),
                    "SUCCESS" != c.status)
                    b.errorHandler(c, a);
                else {
                    b.verifyPhoneTextTimeLeft.init(b, b.getTranslate("_ERROR_WAIT_TO_RETRY"), c.delay, a);
                    var d = b.dialog("SMS_Verify_Code")
                        , f = b.getTranslate("_enter_code_explanation_text")
                        , g = '<span class="userDetails"><i class="mobilePhoneIcon"></i>' + e.phone_area + "-" + e.phone + "</span>";
                    -1 != f.indexOf("%phone_number%") ? f = f.replace("%phone_number%", g) : f += " " + g,
                        d.node.find(".js-validation-phone").html(f),
                        d.show()
                }
            } catch (h) {
                b.enableSendButton(a)
            }
        }) : (b.showToolTip(a, f.getErrorsAsString()),
            b.enableSendButton(a))
    }
    ,
    SMSVerifcationClass.prototype.verifyCode = function(a) {
        var b = this
            , c = b.getTranslate("_ERROR_INVALID_PIN_CODE")
            , d = {
            code: {
                required: [c],
                minLen: [4, c]
            }
        }
            , e = {
            code: a.node.find("#phoneCode").val()
        };
        b.disableSendButton(a),
            trackSignUpGAEvent("Complete Sign-Up With SMS");
        var f = new Validator;
        f.validate(e, d) === !0 ? $.post("/members-admin/service/verifySMSCode", e, function(c) {
            try {
                c = JSON.parse(c),
                    "SUCCESS" === c.status ? authOnComplete(c) : b.errorHandler(c, a)
            } catch (d) {
                b.enableSendButton(a)
            }
        }) : (b.showToolTip(a, f.getErrorsAsString()),
            b.enableSendButton(a))
    }
    ,
    SMSVerifcationClass.prototype.disableSendButton = function(a) {
        a.node.find(".SMS_send_button").addClass("disabled")
    }
    ,
    SMSVerifcationClass.prototype.enableSendButton = function(a) {
        a.node.find(".SMS_send_button").removeClass("disabled")
    }
    ,
    SMSVerifcationClass.prototype.openLoginPopup = function(a) {
        hidePopup(),
            overlay.overlayLogin(null, function() {
                a && $("#serverErrors").text(a).removeClass("displayNone"),
                    $("#signup *,#signingPopup *, #loginPopup *").css("opacity", ""),
                    $("#signup .loader").hide()
            })
    }
;
// File: core/sticky-table-header.js
!function(a, b) {
    "use strict";
    function c(a, b) {
        0 === a ? b.hide() : b.css({
            top: a,
            display: "table-header-group"
        })
    }
    function d(a, b) {
        a.each(function(c) {
            b.eq(c).width(a.eq(c).width())
        })
    }
    var e = b.StickyTableHeader = function(a, b) {
            a = $(a),
                b = {
                    relative: a.attr("data-relative") || b.relative || !1
                };
            var e = a.find("thead")
                , f = e.clone();
            e.after(f);
            var g = e.find("th")
                , h = f.find("th");
            if (this.update = function() {
                    d(g, h)
                }
                    ,
                    a.on("update", this.update),
                    b.relative) {
                f.addClass("floatTblHeader");
                var i = a.offsetParent().scroll(function() {
                    c(i.scrollTop(), f)
                })
            }
        }
    ;
    loader([{
        type: "$",
        value: ".js-sticky-header"
    }]).ready(function(a) {
        a.each(function() {
            new e(this)
        })
    })
}(window, components, loader);
// File: core/subscribe.js
components.Subscriber = function() {
    function a(a) {
        return b[a] || (b[a] = []),
            b[a]
    }
    var b = {};
    this.events = {
        on: function(b, c) {
            return "function" == typeof c && a(b).push(c),
                this
        },
        off: function(c, d) {
            return d ? b[c] = a(c).filter(function(a) {
                return a !== d
            }) : b[c] = [],
                this
        }
    },
        this.trigger = function(b) {
            var c = (Array.from ? Array.from(arguments) : Array.prototype.concat.apply([], arguments)).slice(1);
            return a(b).forEach(function(a) {
                a.apply(null, c)
            }),
                this
        }
            .bind(this)
}
;
// File: core/tech-summary-box.js
!function(a, b) {
    "use strict";
    function c() {
        var a = b(this);
        a.hasClass("selected") || o(a.attr("data-tab-id"))
    }
    function d(a) {
        F.removeClass("selected"),
            a.addClass("selected")
    }
    function e(a, c) {
        b.ajax({
            url: "/common/technical_summary/api.php",
            type: "GET",
            data: a,
            dataType: "json",
            beforeSend: function() {
                H.empty(),
                    I.show()
            },
            success: function(a) {
                I.hide(),
                    c(a)
            }
        })
    }
    function f(a, b) {
        var c = a.summary[a.pid] || {}
            , d = z.get(c.summary[b + "_Define"])
            , e = c.summary[b + "_Color"];
        return {
            pairId: a.pid,
            row: {
                ma: d,
                ma_class: e + "Font"
            },
            maBuy: c.ma_buy[b],
            maSell: c.ma_sell[b],
            tiBuy: c.ti_buy[b],
            tiSell: c.ti_sell[b],
            technicalSummary: d,
            technicalSummaryClass: W[e]
        }
    }
    function g() {
        U.pids && U.pids.destroy(),
        U.techSum && U.techSum.destroy()
    }
    function h(a) {
        g(),
            U.techSum = socketConnector.tick.subscribe(a, S + "-pid", "pid"),
            U.techSum = socketConnector.tick.subscribe(a, S + "-techsumm", "pidTechSumm").then(function(a) {
                w(f(a, A))
            })
    }
    function i(a) {
        var c = {};
        return a.find("[data-section-type]").each(function() {
            var a = b(this);
            c[a.attr("data-section-type")] = {
                $buy: a.find('[data-counter-type="buy"]'),
                $sell: a.find('[data-counter-type="sell"]')
            }
        }),
            c
    }
    function j() {
        var a = b(this).removeClass("displayNone")
            , c = a.find(".js-item-change")
            , d = a.attr("data-pairid");
        V[d] || (V[d] = {}),
            b.extend(V[d], {
                $summaryBox: a,
                $summaryTitle: a.find(".js-item-summary"),
                $arrow: a.find(".js-item-arrow"),
                $summaryLast: a.find(".js-item-last"),
                $name: a.find(".js-item-name"),
                $change: c,
                $changeValue: c.find(".js-change-value"),
                $changePercent: c.find(".js-change-percent"),
                sections: i(a)
            })
    }
    function k(a) {
        var b = F.eq(a)
            , c = b.attr("data-tab-id");
        T[c] = {
            id: c,
            $tab: b
        }
    }
    function l() {
        var a = b(this)
            , c = a.attr("data-tab-id");
        T[c].$innerTable = a,
        B !== c && a.detach(),
            a.addClass("displayBlock").removeClass("displayNone")
    }
    function m(a) {
        var b = F.eq(a)
            , c = b.attr("data-tab-id")
            , d = s(c);
        d.each(function(a) {
            var b = d.eq(a)
                , e = b.attr("data-pairid");
            V[e] = {
                pairId: e,
                $row: b,
                $summary: b.find(".js-item-summary"),
                $last: b.find(".js-item-last"),
                $clock: b.find(".js-item-clock"),
                tabId: c
            }
        })
    }
    function n(a) {
        Object.keys(a).forEach(function(b) {
            a[b].pairId = b,
                v(a[b])
        })
    }
    function o(a) {
        d(T[a].$tab),
            e("action=TSB_updateTab&tab=" + a + "&timeframe=" + A, function(c) {
                b(c.html).each(j),
                    n(c.pairObjects),
                    p(a),
                    q(a),
                    h(t(a))
            })
    }
    function p(a) {
        T[B].$innerTable.detach(),
            B = a,
            D.append(T[B].$innerTable)
    }
    function q(a) {
        var c, d = T[a].$innerTable, e = d.attr("pair_ID");
        V[e].$row.addClass("selected");
        var f = s(a);
        f.removeClass("selected").not("[data-hover-bind]").hover(function(a) {
            c = setTimeout(function() {
                var c = b(a.target).closest("tr");
                f.removeClass("selected"),
                    c.addClass("selected");
                var e = c.attr("data-pairid");
                r(e),
                    d.attr("pair_ID", e)
            }, 200)
        }, function() {
            clearTimeout(c)
        }).attr("data-hover-bind", 1),
            r(e)
    }
    function r(a) {
        var b = V[a].$summaryBox;
        H.empty().append(b),
            J.html(V[a].updateTime)
    }
    function s(a) {
        var b = T[a];
        return b.$pairsRows || (b.$pairsRows = C.find(K + a + N).find("tr." + R)),
            b.$pairsRows
    }
    function t(a, c) {
        var d = T[a];
        return d.pairsIds || (d.pairsIds = s(a).map(function() {
            var a = b(this).attr("data-pairid");
            return a
        }).toArray(),
            d.pairsIdsStr = d.pairsIds.join(",")),
            c ? d.pairsIdsStr : d.pairsIds
    }
    function u() {
        var a = C.find('div[rel="inner"]:visible')
            , b = a.attr("id").substring(4, 5)
            , c = a.attr("pair_ID");
        A = G.val(),
            e("action=TSB_updatePairs&pairs=" + t(b, !0) + "&timeframe=" + A, function(a) {
                "object" == typeof a && n(a),
                    r(c)
            })
    }
    function v(a) {
        w(a),
            x(a)
    }
    function w(a) {
        var b = V[a.pairId];
        a.updateTime && (b.updateTime = a.updateTime),
            b.$summary.html(a.row.ma).removeClass("greenFont redFont neutralFont").addClass(a.row.ma_class),
        b.sections && (b.sections.movingAverages.$buy.html(a.maBuy),
            b.sections.movingAverages.$sell.html(a.maSell),
            b.sections.indicators.$buy.html(a.tiBuy),
            b.sections.indicators.$sell.html(a.tiSell)),
        b.$summaryTitle && b.$summaryTitle.html(a.technicalSummary).removeClass("buy sell neutral").addClass(a.technicalSummaryClass)
    }
    function x(a) {
        var b = V[a.pairId];
        b.$last.html(a.row.last),
            b.$clock.html(a.row.clock),
            b.$summaryLast.html(a.summaryLast),
            b.$name.attr("href", a.link).html(a.summaryName),
            b.$arrow.removeClass("upArrow downArrow noneArrow").addClass(a.arrowBoxClass),
            b.$change.removeClass("greenFont redFont").addClass(a.summaryChangeClass),
            b.$changeValue.html(a.summaryChange),
            b.$changePercent.html(a.summaryChangePercent + "%")
    }
    function y(a, b) {
        C = a,
            E = C.find("#TSB_topTabs"),
            F = E.find("li"),
            D = C.find(".js-box-content"),
            G = D.find(K + Q).change(u),
            H = D.find(K + M),
            I = D.find(K + O),
            J = D.find(K + P),
            B = F.filter(".selected").attr("data-tab-id"),
            A = G.val(),
            z = new b("technical"),
            F.each(k).each(m).click(c),
            C.find(".js-inner-table").each(l),
            C.find(".js-pair-summary-box").remove().each(j),
            q(B),
            h(t(B))
    }
    var z, A, B, C, D, E, F, G, H, I, J, K = "#TSB_", L = "#TechSummary", M = "_mainSummary", N = "_inner", O = "_loader", P = "updateTime", Q = "timeframe", R = "LeftLiContainer", S = "technical-summery-box", T = {}, U = {}, V = {}, W = {
        red: "sell",
        green: "buy",
        black: "neutral"
    };
    window.initializeTechSumBox = y,
        a([{
            type: "$",
            value: L
        }, {
            type: "component",
            value: "Translate"
        }]).ready(y)
}(window.loader, jQuery);
// File: core/template.js
function Template(a, b) {
    function c(a) {
        return String(a).replace(/"/g, '\\"')
    }
    function d(b, d, e) {
        k = (k || a).replace(new RegExp(l.replace("#", b),"g"), e ? d : c(d))
    }
    function e(c) {
        k = a;
        for (var e in b)
            d(e, f(b[e]), g(b[e]));
        return c ? $(k) : k
    }
    function f(a) {
        return "object" == typeof a ? a.value : a
    }
    function g(a) {
        return "object" == typeof a ? !!a.unEscape : !1
    }
    function h(b) {
        return a = b,
            this
    }
    function i(a) {
        return k = "",
            b = a || {},
            this
    }
    function j(a) {
        return $.extend(b, a),
            this
    }
    a = a || "",
        b = b || {};
    var k = ""
        , l = "{#}";
    this.template = h,
        this.options = j,
        this.reset = i,
        this.get = e
}
// File: core/tooltip-popup.js
!function(a, b) {
    function c(b) {
        a.on("click.user-" + b.id, function(a) {
            a.target !== b.getEl()[0] && 0 === b.getEl().find(a.target).length && b.hide(a)
        })
    }
    function d(b) {
        a.off("click.user-" + b.id)
    }
    function e(a) {
        for (var b = 0; b < g.length; b++)
            if (a !== g[b] && g[b].shouldStayOpen() && a.getEl().find(g[b].getEl()[0]).length)
                return !0;
        return !1
    }
    var f, g = [];
    a.ready(function() {
        f = a.find("body"),
            a.find(".js-tooltip-popup").each(function() {
                var a = $(this)
                    , c = new b.TooltipPopup(a.find(".js-popup"));
                a.find(".js-toggle-popup").click(function() {
                    c.isShown() || c.show()
                })
            })
    }),
        b.TooltipPopup = function(a, b) {
            function f(a) {
                n[a].forEach(function(a) {
                    a()
                })
            }
            function h(a) {
                for (var b = 0; b < n.beforeHide.length; b++)
                    if (n.beforeHide[b](a) === !1)
                        return !1;
                return !0
            }
            function i() {
                return m || e(k)
            }
            g.push(this);
            var j = a.attr("id") || "popup-" + Date.now()
                , k = this
                , l = !a.hasClass("displayNone") || !1
                , m = !1
                , n = {
                show: [],
                hide: [],
                beforeHide: []
            };
            k.id = j,
                k.getEl = function() {
                    return a
                }
                ,
                k.show = function() {
                    return a.removeClass("displayNone"),
                        l = !0,
                        setTimeout(function() {
                            c(k)
                        }, 10),
                        f("show"),
                        k
                }
                ,
                k.hide = function(b) {
                    return i() || !h(b) ? k : (a.addClass("displayNone"),
                        l = !1,
                        d(k),
                        f("hide"),
                        k)
                }
                ,
                k.isShown = function() {
                    return l
                }
                ,
                k.subscribe = function(a, b) {
                    return n[a] && n[a].push(b),
                        k
                }
                ,
                k.stayOpen = function(a) {
                    return m = !!a,
                        k
                }
                ,
                k.shouldStayOpen = function() {
                    return m
                }
                ,
                k.setReverse = function(b) {
                    b ? a.addClass("reverse") : a.removeClass("reverse")
                }
                ,
            b && (k.$btn = b.click(function() {
                k.isShown() || k.show()
            }))
        }
}($(document), window.components ? window.components : window.components = {});
// File: core/top-bar-search.js
!function(a, b, c) {
    "use strict";
    function d() {
        null === A ? A = 0 : z - 1 > A && A++,
            g(v.eq(A))
    }
    function e() {
        0 === A ? A = null : A > 0 && A--,
            g(v.eq(A))
    }
    function f(b) {
        var d = c(b).data("item");
        "popular" !== d.category && n(d.pairId, d.link, d.symbol, d.name, d.type, d.flag),
            a.location.href = d.link
    }
    function g(a) {
        v.removeClass("hoverSearch"),
            a.addClass("hoverSearch");
        var b = a.data("item");
        q.val(b.symbol)
    }
    function h() {
        setTimeout(function() {
            y.bind("click", i)
        }, 1)
    }
    function i(a) {
        var b = a.target;
        b === p[0] || p.find(b).length || b === s[0] || s.find(b).length || (C.close(),
            y.unbind("click", i))
    }
    function j(a) {
        var b = a.items();
        if (!b || !b.length)
            return !1;
        var d = t.clone(!0);
        d.find(".js-title").text(a.title);
        var e = c([]);
        return b.forEach(function(b) {
            var c = u.clone(!0).attr("data-pair-id", b.pairId || "").attr("data-link", b.link || "").data("item", b);
            b.category = a.category,
                c.find(".js-item-symbol").text(b.symbol),
                c.find(".js-item-name").text(b.name).attr("title", b.name),
                c.find(".js-item-type").text(b.type),
                c.find(".js-item-flag").addClass(b.flag),
                e = e.add(c)
        }),
            d.find(".js-results").html(e),
            d
    }
    function k() {
        s.removeClass("displayNone")
    }
    function l() {
        s.addClass("displayNone")
    }
    function m() {
        var a = getCookie("searchedResults");
        return a && (a = JSON.parse(a)),
            (a instanceof Array ? a : []).map(function(a) {
                return a.name = decodeURIComponent(a.name),
                    a.type = decodeURIComponent(a.type),
                    a
            })
    }
    function n(a, b, d, e, f, g) {
        var h = m();
        c.each(h, function(b, c) {
            return c.pairId === a ? (h.splice(b, 1),
                !1) : void 0
        }),
        h.length >= 5 && h.pop(),
            h.unshift({
                pairId: a,
                link: b,
                symbol: d,
                name: e,
                type: f,
                flag: g
            }),
            h.forEach(function(a) {
                a.name = encodeURIComponent(a.name),
                    a.type = encodeURIComponent(a.type)
            }),
            setCookie("searchedResults", JSON.stringify(h), 3)
    }
    var o, p, q, r, s, t, u, v, w = !1, x = !1, y = c(b), z = 0, A = null, B = [], C = a.components.topBarSearch = {
        open: function() {
            return x ? (w = !0,
                void k()) : (B.map(j).forEach(function(a) {
                a && (s.append(a),
                    r.appendTo(s))
            }),
                v = s.find(".js-item"),
                z = v.length,
            z && (w = !0,
                k(),
                x = !0),
                C)
        },
        close: function() {
            return w = !1,
                l(),
                C
        },
        addSearchGroup: function(a, b, c) {
            return B.push({
                title: a,
                items: "function" == typeof b ? b : function() {
                    return b
                }
                ,
                category: c || ""
            }),
                C
        },
        appendSearchGroup: function(a, b, c) {
            return B.unshift({
                title: a,
                items: "function" == typeof b ? b : function() {
                    return b
                }
                ,
                category: c || ""
            }),
                C
        },
        bindToForm: function(b, c, g) {
            return p = b.submit(function(a) {
                return a.preventDefault(),
                    w ? void f(v.eq(A)) : !1
            }),
                o = g,
                q = c.click(function() {
                    w || g && g.isSearchBoxOpen() || (C.open(),
                        h())
                }).keyup(function(a) {
                    if (w)
                        switch (a.keyCode) {
                            case 40:
                                d();
                                break;
                            case 38:
                                e();
                                break;
                            case 13:
                                a.stopPropagation(),
                                    a.preventDefault(),
                                    f(v.eq(A))
                        }
                }),
                g.Element.onStartSearch = C.close,
                g.Element.onSubmit = function(b) {
                    n(b.pairId, b.link, b.symbol, b.name, b.type, b.flag),
                        a.ga.loaded ? a.ga("allSitesTracker.send", "event", "Site Search", "Search", b.name, {
                            metric2: 1,
                            dimension23: b.name,
                            hitCallback: function() {
                                location.href = b.link
                            }
                        }) : location.href = b.link
                }
                ,
                C
        }
    };
    loader(["topBarSearchData"]).ready(function(b) {
        var d = a.searchTop = new FXautoComplete({
            $no_search_results: b.texts.noResults
        },{
            searchTextInputId: "searchTextTop",
            resultsInnerContainerId: "searchTopResults",
            resultsOuterContainerId: "subContainerTop",
            formElementId: "combineSearchFormTop",
            hasTabs: !0,
            tabsContainerId: "search_tabs_Top",
            tabsType: "li",
            tabsDivId: "searchBoxTabsTopTabsTop",
            countriesType: "td",
            url: "/search/service/search",
            mainResultRowIdPrefix: "searchRowIdtop_",
            tabsPrefix: "search_box_top",
            countryRowPrefix: "tdCountry_",
            countriesWrapperId: "countries_wrapper_Top",
            countriesTableId: "countries_table_Top",
            dynamicVar: "",
            hiddenNoResultsDefine: "noResultsDefinesearchTopResults",
            hiddenDocDirectionId: "doc_directionsearchTopResults",
            googleSearchDefineId: "search",
            googleLinkID: "googleLinkSearchTop",
            recentSearchText: b.texts.recentSearchText,
            loadOnTabChange: !0,
            trackSearches: !0,
            shouldSendForm: !0,
            minimumChar: 1
        })
            , e = c("#" + d.Element.formElementId)
            , g = c("#searchTextTop")
            , h = b.popularSearches;
        h.length > 5 && (h.length = 5),
            d.setTabsText(b.tabs),
            d.inputFieldBind(g),
            r = c(".recentSearchesLinks"),
            s = c("#suggestionsResults"),
            u = s.find(".js-item").remove(),
            u.click(function() {
                f(this, !0)
            }),
            t = s.find(".js-group").remove().removeClass("displayNone"),
            C.appendSearchGroup(b.texts.recentSearchText, m),
            e.submit(function() {
                return "/" == c(this).attr("action") ? !1 : void 0
            }),
            a.components.topBarSearch.bindToForm(e, g, d).addSearchGroup(b.texts.popularSearchText, h, "popular"),
            s.find(".js-recent-links").find("a").click(function(b) {
                if (a.ga && a.ga.loaded) {
                    var d = c(this);
                    return a.ga("allSitesTracker.send", "event", "Search Bar", "Buttons in Search", d.attr("data-analytics-label"), {
                        hitCallback: function() {
                            a.location = d.attr("href")
                        }
                    }),
                        b.preventDefault(),
                        !1
                }
            })
    })
}(window, document, jQuery);
// File: core/trade-now.js
window.components.TradeNow = loader([{
    type: "$",
    value: ".js-tradenow-btn"
}, "ga"], {
    isRepeatable: !0
}).ready(function(a, b) {
    a.not("[data-bind]").attr("data-bind", 1).click(function() {
        var a = $(this)
            , c = a.data("link");
        b && b.loaded && b("allSitesTracker.send", "event", "Trade Now", a.attr("data-section"), a.attr("data-color") + " - " + a.attr("data-text")),
            window.open(c, "_blank")
    })
});
// File: core/twitter-link.js
loader([{
    type: "$",
    value: ".js-twitter-link"
}]).ready(function(a) {
    a.click(function() {
        var a = $(this)
            , b = a.attr("data-referer") || window.location.href
            , c = a.attr("data-text") || "";
        window.open("https://twitter.com/intent/follow?tw_p=followbutton&ref_src=twsrc%5Etfw&region=follow_link&original_referer=" + b + "&screen_name=" + c, "twitterTweet", "width=520,height=550,resizable,scrollbars=no,status=0")
    })
});
// File: core/user-alerts.js
!function(a, b) {
    "use strict";
    function c(c, d, f, g) {
        return f.platform || (f.platform = "desktop"),
            a.siteData.userLoggedIn ? void b.ajax({
                url: e + c,
                type: "post",
                data: {
                    alertType: d,
                    alertParams: f || {}
                }
            }).done(function(a) {
                return "unauthorized" === a || "failed" === a ? g(a) : void g(null, a)
            }).fail(function(a) {
                g(a)
            }) : (overlay.authCompleteAction = {
                type: "alert",
                actionData: b.extend({
                    alertType: d
                }, f)
            },
                g("unauthorized"))
    }
    var d = a.components = a.components || {}
        , e = "/useralerts/service/";
    d.UserAlerts = {
        create: function(a, b, d) {
            c("create", a, b, d)
        },
        update: function(a, b, d) {
            c("update", a, b, d)
        },
        "delete": function(a, b, d) {
            c("delete", a, b, d)
        }
    }
}(window, jQuery),
    function(a, b, c) {
        "use strict";
        function d(a) {
            f.on("click.user-" + a.id, function(b) {
                b.target !== a.getEl()[0] && 0 === a.getEl().find(b.target).length && a.hide()
            })
        }
        function e(a) {
            f.off("click.user-" + a.id)
        }
        var f;
        a.UserAlertsPopup = function(b, f, g) {
            function h() {
                m.forEach(function(a) {
                    a(q)
                })
            }
            function i() {
                n.forEach(function(a) {
                    a(q)
                })
            }
            var j = this;
            f || (f = {
                useGeneralOverlay: !1
            });
            var k = !1
                , l = !1
                , m = []
                , n = []
                , o = f.userHasAlerts
                , p = f.userHasAlertsClass
                , q = {}
                , r = b
                , s = b.parent()
                , t = r.find(".js-email-alert-notification");
            c.extend(j, {
                id: Date.now(),
                getEl: function() {
                    return r
                },
                appendTo: function(a, b) {
                    return j.isShown() && j.hide(),
                        l = !!b,
                        a.append(r),
                        j
                },
                isShown: function() {
                    return k
                },
                show: function() {
                    return k = !0,
                        setTimeout(function() {
                            d(j)
                        }, 1),
                        j.getEl().children().removeClass("displayNone"),
                        h(),
                        f.useGeneralOverlay ? showPopup(j.getEl().attr("id"), !0) : j.getEl().removeClass("displayNone"),
                        j.getEl()
                },
                hide: function() {
                    return k = !1,
                        e(j),
                        i(),
                        f.useGeneralOverlay ? hidePopup(j.getEl().attr("id")) : j.getEl().addClass("displayNone"),
                    l && (s.append(j.getEl()),
                        l = !1),
                        j.getEl()
                },
                hideShowEmailOptions: function(a) {
                    t._toggleShow(a.is("instrument"))
                },
                ignoreBackgroundClosing: function() {
                    setTimeout(function() {
                        e(j)
                    }, 2)
                },
                setUserHasAlerts: function() {
                    return j
                },
                setButtonTooltip: function() {
                    return j
                },
                classes: function(a, b) {
                    return a && j.getEl().addClass(a),
                    b && j.getEl().removeClass(b),
                        j
                },
                toggle: function() {
                    return j.isShown() ? j.hide() : j.show()
                },
                subscribe: function(a) {
                    return "function" == typeof a && m.push(a),
                        j
                },
                subscribeToClose: function(a) {
                    return "function" == typeof a && n.push(a),
                        j
                },
                set: function(a, b) {
                    return q[a] = b,
                        j
                },
                get: function(a) {
                    return q[a]
                }
            }),
            g && (g.click(function() {
                    j.hasOpenedBefore = !0,
                        j.toggle()
                }),
                    j.setUserHasAlerts = function(a) {
                        o = a;
                        var b = g.find(".js-button");
                        return o ? b.addClass(p) : b.removeClass(p),
                            j
                    }
                    ,
                    j.setUserHasAlerts(o),
                    j.setButtonTooltip = function(a) {
                        return g.attr("data-tooltip", a),
                            j
                    }
            ),
            a.components.HoverMe && (j.subscribe(function() {
                a.components.HoverMe.setKeepAlive(j.getEl(), !0)
            }),
                j.subscribeToClose(function() {
                    a.components.HoverMe.setKeepAlive(j.getEl(), !1)
                })),
                j.getEl().find(".js-show-instructions").click(function() {
                    j.classes("instructions")
                }),
                j.getEl().find(".js-hide-instructions").click(function() {
                    j.classes(null, "instructions")
                }),
                j.getEl().find(".js-close").click(j.hide)
        }
            ,
            c(b).ready(function() {
                function b(a, b) {
                    var c = a.popup;
                    j[b].pendingAlert && setTimeout(function() {
                        c.show(),
                            a.showSuccessMessage(j[b].alertPendingHtml)
                    }, 200)
                }
                function d(a) {
                    a.events.on("unauthorizedSubmit", function() {
                        ga("allSitesTracker.send", "event", "Alert - Create", "Create Alert Button", "New Alert In Instrument - Non Logged In")
                    })
                }
                function e(b, d) {
                    var e = c(b)
                        , f = j[e.attr("data-" + d + "-id")]
                        , g = e.parents(".js-inject-add-alert-widget")
                        , h = e.find(".js-user-alert-popup")
                        , i = e.find(".js-toggle-user-alerts-popup")
                        , k = a.userAlertsPopup = new UserAlertsPopup(h,f,i);
                    n.push(k);
                    var l;
                    return a.components.headers.onChange(function(a) {
                        a !== l && (l = a,
                        k.isShown() && k.hide(),
                            a ? m.append(e) : setTimeout(function() {
                                g.append(e)
                            }, 100))
                    }),
                        k
                }
                function g(b, c) {
                    a.ga && a.ga("allSitesTracker.send", "event", "Alert - Create", b, c || o)
                }
                function h(f, h) {
                    var i = e(h, "pair")
                        , j = c(h).attr("data-pair-id")
                        , k = a.instrumentPopupParams[j]
                        , l = new InstrumentUserAlerts(k.pairId,k.initialAmountOfEvents,k.texts,i,{
                        ignoreFirstTimeAlert: !!i.get("ignoreFirstTimeAlert")
                    });
                    l.popup.subscribe(function() {
                        1 === k.pendingAlert ? g("Create Alert Button", "New Alert Submitted - Instrument") : g("Create Alert Button", "Alert Button Clicked - Instrument")
                    }),
                        l.subscribe(function() {
                            g("Create Alert Button", "New Alert Submitted - Instrument")
                        }),
                        b(l, j),
                        d(l)
                }
                function i(f, g) {
                    var h = e(g, "event")
                        , i = c(g).attr("data-event-id")
                        , j = a.eventPopupParams[i]
                        , k = new EventUserAlerts({
                        id: j.alertId,
                        eventId: j.eventId,
                        active: j.active
                    },j.texts,h);
                    b(k, i),
                        d(k)
                }
                var j = a.userAlertsPopupParams || {};
                f = c("body");
                var k = c(".js-add-alert-widget")
                    , l = c(".js-floated-header-container")
                    , m = l.find(".js-inject-add-alert-widget")
                    , n = []
                    , o = location.pathname.split("/").filter(function(a) {
                    return a
                })[0] || "index";
                k.filter("[data-pair-id]").each(h),
                    k.filter("[data-event-id]").each(i)
            })
    }(window, document, jQuery),
    window.EventUserAlerts = function(a, b, c, d) {
        function e() {
            l.removeClass("Orange2").addClass("LightGray").text(b._Close)
        }
        function f() {
            var b = m.find("input:radio:checked").val()
                , c = r.prop("checked") ? s.val() : "none";
            return {
                frequency: b,
                alert_ID: a.id,
                event_ID: a.eventId,
                pre_reminder_time: c,
                preReminderText: c ? s.find('option[value="' + c + '"]').text() : ""
            }
        }
        function g() {
            a.frequency ? m.find("input:radio").each(function() {
                this.value === a.frequency && this.setAttribute("checked", !0)
            }) : m.find("input:radio:eq(1)").prop("checked", !0),
            a.name && o.find(".js-alert-name").text(a.name),
                r.prop("checked", !!a.preReminderTime),
                s.val(a.preReminderTime || 15),
                a.preReminderTime ? s.removeAttr("disabled") : s.attr("disabled", "disabled")
        }
        function h() {
            var d = f();
            components.UserAlerts.create("event", d, function(f, g) {
                return u = !1,
                    f ? void ("unauthorized" === f ? (overlay.overlayLogin(),
                        w.trigger("unauthorizedSubmit", d)) : (o.addClass("displayNone"),
                        m.addClass("displayNone"),
                        p.html(b._failedCreatedAlert).addClass("failed").removeClass("displayNone"),
                        e())) : (a.id = g,
                        a.active = 1,
                        t.showSuccessMessage(),
                        c.setUserHasAlerts(!0).setButtonTooltip(b._enableAlertHeader),
                        e(),
                        d.id = g,
                        d.action = "create",
                        void w.trigger("submit", d))
            })
        }
        function i() {
            if (a.id) {
                var c = f();
                c.active = 1,
                    components.UserAlerts.update("event", c, function(a, d) {
                        "unauthorized" === a ? (overlay.overlayLogin(),
                            w.trigger("unauthorizedSubmit", c)) : a ? p.html(b._failedUpdatedAlert).addClass("failed").removeClass("displayNone") : (p.html(b._successfullyUpdatedAlert).removeClass("displayNone failed"),
                            c.action = "update",
                            w.trigger("submit", c))
                    })
            }
        }
        function j() {
            a.active = a.active ? 0 : 1;
            var d = f()
                , g = {
                alert_ID: a.id,
                active: a.active
            };
            d.frequency && (g.frequency = d.frequency),
                components.UserAlerts.update("event", g, function(a, f) {
                    u = !1,
                        "unauthorized" === a ? (overlay.overlayLogin(),
                            w.trigger("unauthorizedSubmit", d, g)) : a ? p.html(b._failedUpdatedAlert).addClass("failed").removeClass("displayNone") : (g.action = "update",
                            w.trigger("submit", params),
                            t.showSuccessMessage(b._successfullyUpdatedAlert),
                            n.text(g.active ? g._enableAlertHeader : b._disableAlertHeader),
                            c.setButtonTooltip(g.active ? g._enableAlertHeader : b._disableAlertHeader),
                            e())
                })
        }
        function k() {
            a.active = 0,
                components.UserAlerts["delete"]("event", {
                    alert_ID: a.id,
                    active: a.active
                }, function(c, d) {
                    u = !1,
                        "unauthorized" === c ? (overlay.overlayLogin(),
                            w.trigger("unauthorizedSubmit", a)) : c ? p.html(b._failedDeletedAlert).removeClass("displayNone") : (a.action = "delete",
                            w.trigger("submit", a),
                            t.popup.setUserHasAlerts(!1).setButtonTooltip(b._createAlertHeader),
                            o.addClass("displayNone"),
                            m.addClass("displayNone"),
                            q.addClass("displayNone"),
                            p.html(b._successfullyDeletedAlert).removeClass("displayNone"),
                            n.text(b._deleteAlertHeader),
                            e(),
                            a.id = !1)
                })
        }
        a = a || {},
            d = d || {},
            d = {
                disableRemove: !!d.disableRemove
            };
        var l, m, n, o, p, q, r, s, t = this, u = !1, v = !1, w = new components.Subscriber;
        t.setDefaultParams = function(b) {
            return a = {
                id: b.id,
                name: b.name,
                eventId: b.eventId,
                active: b.active,
                frequency: b.frequency,
                preReminderTime: "none" === b.preReminderTime ? 0 : b.preReminderTime || 0
            },
                t
        }
            ,
            t.showSuccessMessage = function(a) {
                u = !1,
                    o.addClass("displayNone"),
                    m.addClass("displayNone"),
                    q.addClass("displayNone"),
                    p.html(a || b._successfullyCreatedAlert).removeClass("displayNone failed")
            }
            ,
            t.subscribe = function(a) {
                return w.events.on("submit", a),
                    t
            }
            ,
            t.popup = c,
            t.events = w.events,
            $(document).ready(function() {
                c || (c = window.userAlertsPopup),
                    m = c.getEl().find(".js-user-alert-form"),
                    p = c.getEl().find(".js-status-message"),
                    n = c.getEl().find(".js-header-title"),
                    o = c.getEl().find(".js-event-title"),
                    q = c.getEl().find(".js-form-content"),
                    r = c.getEl().find(".js-reminder").change(function() {
                        this.checked ? s.removeAttr("disabled") : s.attr("disabled", "disabled")
                    }),
                    s = c.getEl().find(".js-reminder-type"),
                    l = c.getEl().find(".js-btn").click(function() {
                        u ? a.id ? d.disableRemove ? v && i() : a.active ? k() : j() : h() : c.hide()
                    }),
                    m.find("input, select").change(function() {
                        v = !0,
                            l.removeClass("disabled")
                    }),
                    c.subscribe(function() {
                        u = !0,
                            v = !1,
                            m.removeClass("displayNone"),
                            o.removeClass("displayNone"),
                            p.addClass("displayNone"),
                            g(),
                            a.id ? (q.addClass("displayNone"),
                                d.disableRemove ? l.addClass("disabled").text(b._update) : (l.removeClass("Orange2").addClass("LightGray"),
                                    a.active ? (m.addClass("displayNone"),
                                        n.text(b._enableAlertHeader),
                                        l.text(b._removeAlert)) : (q.removeClass("displayNone"),
                                        n.text(b._disableAlertHeader),
                                        l.text(b._enableAlert)))) : (q.removeClass("displayNone"),
                                n.text(b._createAlertHeader),
                                l.addClass("Orange2").removeClass("LightGray").text(b._create))
                    })
            }),
            this.setDefaultParams(a)
    }
    ,
    window.authorUserAlerts = function(a, b) {
        function c() {
            return f.alert_ID && f.active
        }
        function d(a, d) {
            return "unauthorized" === a ? void overlay.overlayLogin() : (f.alert_ID || (f.alert_ID = d),
                void (c() ? e.text(b._followingAlert).addClass("V").removeClass("Plus X") : e.text(b._followAlert).removeClass("V X").addClass("Plus")))
        }
        a || (a = {});
        var e, f = {
            author_ID: a.author_ID,
            alert_ID: a.alert_ID,
            active: !(!a.alert_ID || !a.active)
        };
        $(document).ready(function() {
            e = $(".js-follow-author-btn").hover(function() {
                c() && $(this).addClass("X").removeClass("V").text(b.__unfollowAlert)
            }, function() {
                c() && $(this).addClass("V").removeClass("X").text(b._followingAlert)
            })
        }),
            window.followAuthor = function() {
                f.alert_ID ? (f.active = f.active ? 0 : 1,
                    components.UserAlerts.update("author", f, d)) : (f.active = 1,
                    components.UserAlerts.create("author", f, d))
            }
    }
;
// File: core/validator.js
var Validator = function() {};
Validator.prototype.validate = function(a, b, c) {
    this.errors = [],
        this.fields = a,
        this.field = null,
        this.val = null,
        this.valCleaned = null;
    var d = 0
        , e = null;
    for (var f in b)
        if ("undefined" != typeof f) {
            var g = b[f];
            this.field = f;
            var h = g.required;
            for (var i in g)
                try {
                    var j = g[i];
                    if ("object" != typeof j && (j = [j]),
                            this.val = "undefined" == typeof a[f] ? null : a[f],
                            this.valCleaned = this.val ? this.val.replace(/\s+/, "") : null,
                            e = this.valCleaned || h || j.required ? this["validate_" + i](j) : !0,
                        e !== !0 && (this.errors[f] || (this.errors[f] = []),
                        -1 === this.errors[f].indexOf(e) && this.errors[f].push(e),
                            d++,
                            c))
                        break
                } catch (k) {
                    console.log(k)
                }
            if (c && d > 0)
                break
        }
    return 0 == d
}
    ,
    Validator.prototype.isValid = function(a, b, c) {
        return "undefined" == typeof c && (c = []),
            this.val = a,
        this["validate_" + b](c) === !0
    }
    ,
    Validator.prototype.getErrorsAsString = function() {
        var a = "";
        for (var b in this.errors)
            a += this.errors[b].join(", ") + "\n";
        return a
    }
    ,
    Validator.prototype.validateForm = function(a, b, c) {
        $(".js-formError", a).empty();
        var d = {};
        if ($.each(a.serializeArray(), function(a, b) {
                d[b.name] = b.value
            }),
                !this.validate(d, b, c)) {
            for (var e in this.errors) {
                this.bindErrorEvents(e);
                var f = this.errors[e].join(", ")
                    , g = a.find('.js-formError[field="' + e + '"]');
                g.size() || (g = $("<div>").attr("field", e).addClass("js-formError").html(f),
                    $(".js-formErrors").append(g)),
                    g.html(f).removeClass("displayNone")
            }
            return !1
        }
        return !0
    }
    ,
    Validator.prototype.validateByFields = function(a, b) {
        if (!this.validate(a, b)) {
            for (var c in this.errors)
                this.bindErrorEvents(c),
                    $('.js-formError[field="' + c + '"]').html(this.errors[c].join(", ")).removeClass("displayNone");
            return !1
        }
        return !0
    }
    ,
    Validator.prototype.showServerError = function(a, b) {
        this.bindErrorEvents(a),
            $('.js-formError[field="' + a + '"]').html(b).removeClass("displayNone")
    }
    ,
    Validator.prototype.bindErrorEvents = function(a) {
        function b() {
            $(this).removeClass("error"),
                $("~.js-formError", this).addClass("displayNone")
        }
        $('INPUT[name="' + a + '"]').addClass("error").on("focus", b)
    }
    ,
    Validator.prototype.validate_minLen = function(a) {
        return this.val.length < a[0] ? a[1].replace("{len}", a[0]).replace("%NUMBER%", a[0]) : !0
    }
    ,
    Validator.prototype.validate_maxLen = function(a) {
        return this.val.length > a[0] ? a[1].replace("{len}", a[0]).replace("%NUMBER%", a[0]) : !0
    }
    ,
    Validator.prototype.validate_minNum = function(a) {
        var b = parseFloat(this.val);
        return b < a[0] ? a[1].replace("{num}", a[0]).replace("%NUMBER%", a[0]) : !0
    }
    ,
    Validator.prototype.validate_maxNum = function(a) {
        var b = parseFloat(this.val);
        return b.length > a[0] ? a[1].replace("{num}", a[0]).replace("%NUMBER%", a[0]) : !0
    }
    ,
    Validator.prototype.validate_required = function(a) {
        return "" == this.valCleaned || null === this.valCleaned ? a[0] : !0
    }
    ,
    Validator.prototype.validate_equal = function(a) {
        return this.val != this.fields[a[0]] ? a[1] : !0
    }
    ,
    Validator.prototype.validate_inArray = function(a) {
        return -1 == a[0].indexOf(this.val) ? a[1] : !0
    }
    ,
    Validator.prototype.validate_email = function(a) {
        var b = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return b.test(this.val) ? !0 : a[0]
    }
    ,
    Validator.prototype.validate_lettersNumbers = function(a) {
        return this.val.match(RegExp("^[\\wÀ-῿Ⰰ-퟿]+$", "g")) ? !0 : a[0]
    }
    ,
    Validator.prototype.validate_onlyLetters = function(a) {
        var b = "\\wÀ-῿Ⰰ-퟿";
        return a.space && (b += "\\s"),
            this.val.match(RegExp("^[" + b + "]+$", "g")) && this.val.match(RegExp("^[^\\d]+$", "g")) ? !0 : a[0]
    }
    ,
    Validator.prototype.validate_disallowTags = function(a) {
        var b = a[0].split(",").map(function(a) {
            return a.trim()
        })
            , c = new RegExp("(<|&lt;)(" + b.join("|") + ")","g");
        return this.val.match(c) ? a[1].replace("%TAGS%", a[0]) : !0
    }
    ,
    Validator.prototype.validate_phone = function(a) {
        var b = !1;
        return $.ajax({
            url: "/members-admin/auth/CheckPhone/",
            type: "POST",
            data: {
                phone: this.val,
                country: this.fields[a[0]]
            },
            async: !1
        }).done(function(a) {
            "success" == a && (b = !0)
        }).fail(function(a, b, c) {}),
            b ? !0 : a[1]
    }
    ,
    Validator.prototype.validate_pattern = function(a) {
        a[0] = a[0].replace(":BS:", "\\");
        var b = new RegExp(a[0],"g");
        return this.val.match(b) ? !0 : a[1]
    }
    ,
    Validator.prototype.validate_patterns = function(a) {
        var b = [];
        for (var c in a) {
            var d = this.validate_pattern(a[c]);
            d !== !0 && -1 === b.indexOf(d) && b.push(d)
        }
        return b.length ? b : !0
    }
    ,
    Validator.prototype.validate_dateMore = function(a) {
        var b = this.val.split(" ");
        "undefined" == typeof b[1] && b.push("00:00:00");
        var c = new Date(b.join(" "))
            , d = new Date;
        return d > c ? a[0] : !0
    }
;
// File: functions/calculators.js
function validateNumeric(a, b, c) {
    var d = a.split(",")
        , e = !0
        , f = 0
        , g = "";
    for (b = void 0 !== b ? b : !1,
             c = void 0 !== c ? c : !1; f < d.length; ) {
        if (HideError(d[f]),
                g = "eu" == $(d[f]).attr("number-format") ? $(d[f]).val().replace(/,/g, "") : $(d[f]).val(),
            b && (isNaN(g) || 0 == g.length || 0 == +g))
            return ShowError(d[f]),
                !1;
        if (c && (isNaN(g) || 0 == g.length || 0 > +g))
            return ShowError(d[f]),
                !1;
        (isNaN(g) || 0 == g.length) && (ShowError(d[f]),
            e = !1),
            f++
    }
    return e
}
function unFormat(a) {
    return "eu" == $(a).attr("number-format") ? parseFloat($(a).val().replace(/,/g, ".")) : parseFloat($(a).val())
}
function formatNumber(a) {
    return "eu" == $("#calc_form").attr("number-format") ? format("#.##0,####", a) : format("#,##0.####", a)
}
window.format = function(a, b) {
    if (!a || isNaN(+b))
        return b;
    var b = "-" == a.charAt(0) ? -b : +b
        , c = 0 > b ? b = -b : 0
        , d = a.match(/[^\d\-\+#]/g)
        , e = d && d[d.length - 1] || "."
        , d = d && d[1] && d[0] || ","
        , a = a.split(e)
        , b = b.toFixed(a[1] && a[1].length)
        , b = +b + ""
        , f = a[1] && a[1].lastIndexOf("0")
        , g = b.split(".");
    (!g[1] || g[1] && g[1].length <= f) && (b = (+b).toFixed(f + 1)),
        f = a[0].split(d),
        a[0] = f.join("");
    var h = a[0] && a[0].indexOf("0");
    if (h > -1)
        for (; g[0].length < a[0].length - h; )
            g[0] = "0" + g[0];
    else
        0 == +g[0] && (g[0] = "");
    if (b = b.split("."),
            b[0] = g[0],
            g = f[1] && f[f.length - 1].length) {
        for (var f = b[0], h = "", i = f.length % g, j = 0, k = f.length; k > j; j++)
            h += f.charAt(j),
            !((j - i + 1) % g) && k - g > j && (h += d);
        b[0] = h
    }
    return b[1] = a[1] && b[1] ? e + b[1] : "",
    (c ? "-" : "") + b[0] + b[1]
}
;
// File: functions/fe_functions.js
function dynamicHeaderCalendarTables() {
    var a = $("TABLE.persistArea");
    if (a) {
        var b = $(window);
        a.data("originalTop", parseInt($(".floatingHeader").css("top"))),
            b.on("mousewheel DOMMouseScroll", function(b) {
                b.originalEvent.wheelDelta >= 0 || b.originalEvent.detail < 0 ? a.data("upOrDown", "up") : a.data("upOrDown", "down")
            }),
            b.scroll(function(b) {
                UpdateTableHeaders(a)
            })
    }
}
function UpdateTableHeaders(a) {
    $.browser && $.browser.msie && parseInt($.browser.version) <= 8 || a.each(function(b) {
        var c = a.eq(b)
            , d = c.offset()
            , e = c.find(".floatingHeader")
            , f = $(".topBar").outerHeight()
            , g = c.find("tr:last-child")
            , h = 35 + g.outerHeight()
            , i = $(window).scrollTop() + f
            , j = a.data("originalTop")
            , k = "up" == a.data("upOrDown");
        i > d.top && i < d.top + (c.height() - h) ? (k && (j += $("#navMenu").height() + $("#subNav").height()),
            e.show().css("top", j)) : e.hide()
    })
}
function showMoreInfo(a, b) {
    var c = $(".openedTR").attr("id");
    $(".openedTR .openedTRWrap").slideUp("fast", function() {
        $("#" + c).prev().removeClass("openedParentTR"),
            $("#" + c + ".openedTR").remove()
    }),
    c != "details_" + a && ($("#" + a).addClass("openedParentTR"),
        $("#" + a).after(b),
        $(".openedTRWrap").slideDown("fast"))
}
function closeTableSorterExpandTr() {
    $(".openedTR .openedTRWrap").slideUp("fast", function() {
        $(".openedParentTR").removeClass("openedParentTR"),
            $(".openedTR").remove()
    })
}
function latestAnalysisCategorySelector(a) {
    var b = $(a).attr("id");
    $("#latestAnalysis").html($("#fx-loading-template").html()),
        $.get("/analysis/Service/LatestAnalysis", {
            smlID: b
        }, function(a) {
            $("#latestAnalysis").html(a)
        })
}
function latestNewsCategorySelector(a) {
    var b = $(a).attr("id");
    $("#latestNews").html($("#fx-loading-template").html()),
        $.get("/news/Service/LatestNews", {
            smlID: b
        }, function(a) {
            $("#latestNews").html(a)
        })
}
function isNumeric(a, b) {
    var c;
    return c = "." === b ? /^(-)?([0-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{0,8})?$/ : /^(-)?([0-9]\d{0,2}(\.\d{3})*|([1-9]\d*))(\,\d{0,8})?$/,
        c.test(a)
}
var components = window.components = window.components || {};
!function() {
    "use strict";
    function a() {
        l !== k && (o.forEach(function(a) {
            a(k)
        }),
            l = k)
    }
    function b() {
        d.removeClass("floating"),
            e.removeClass("switchHeader"),
            g.css("top", 114),
            k = !1
    }
    function c(a, b) {
        (a || !k && b > n) && (d.addClass("floating"),
            e.addClass("switchHeader"),
            g.css("top", 43),
            k = !0)
    }
    var d, e, f, g, h = $(window), i = $(document), j = h.scrollTop(), k = !1, l = !1, m = !1, n = 0, o = [];
    i.ready(function() {
        var l, n = function() {
            if (!m) {
                var d = h.scrollTop();
                d !== l && (j > d || d > f ? (b(),
                    a(k)) : d > j && c(!1, d),
                    j = d)
            }
        };
        d = $(".js-floated-header-container").removeClass("floating"),
            e = $("header"),
            g = $(".earAdv"),
        f || (f = i.height()),
            h.scroll($.throttle(n, 64))
    }),
        components.headers = {
            closeAll: function() {
                return c(!0),
                    e.addClass("switchHeader"),
                    k = !1,
                    this
            },
            stopPropagation: function() {
                m = !0
            },
            startPropagation: function() {
                m = !1
            },
            setHeaderSwitchBorders: function(a, b) {
                a && (a = $(a),
                a.length && (n = a.offset().top)),
                b && (b = $(b),
                b.length && (f = b.offset().top))
            },
            onChange: function(a) {
                "function" == typeof a && o.push(a)
            }
        }
}(),
    $(document).ready(function() {
        var a = $(".WYSIWYG").css("font-size");
        $(".fontSizeControllerWrapper #resetFont").click(function() {
            $(".WYSIWYG").css("font-size", a)
        }),
            $(".fontSizeControllerWrapper #increase").click(function() {
                var a = $(".WYSIWYG").css("font-size")
                    , b = parseFloat(a, 14)
                    , c = b + 1;
                return 24 >= c && $(".WYSIWYG").css("font-size", c),
                    !1
            }),
            $(".fontSizeControllerWrapper #decrease").click(function() {
                var a = $(".WYSIWYG").css("font-size")
                    , b = parseFloat(a, 14)
                    , c = b - 1;
                return c >= 10 && $(".WYSIWYG").css("font-size", c),
                    !1
            })
    });
var ImgsSlider = function(a) {
    var b = 0
        , c = {};
    $.each(a, function(a, b) {
        var d = b.src;
        c[d] || (c[d] = new Image,
            c[d].src = d)
    });
    var d = a.length
        , e = 1
        , f = $("#imgCarousel")
        , g = f.find("img")
        , h = f.find("span")
        , i = f.find(".right")
        , j = f.find(".left");
    this.moveImg = function(c) {
        if (e) {
            e = 0,
                "prev" === c ? (b -= 1,
                0 > b && (b = d - 1)) : "first" === c ? b = 0 : (b += 1,
                b > d - 1 && (b = 0)),
                g.attr("src", a[b].src).attr("alt", a[b].title).fitImage(window.newsImageConfig),
                h.html(a[b].title);
            var f = b + 1
                , k = f + 1
                , l = f - 1;
            (k > d || f === d) && (k = 1),
            (0 > l || 0 === l) && (l = d),
                i.html("<span>" + k + "/" + d + "</span><u></u>"),
                j.html("<u></u><span>" + l + "/" + d + "</span>")
        }
        e = 1
    }
};
// File: functions/filters.js
var FiltersWidget = function(a, b) {
    function c() {
        var c = 0;
        return $('[name="checkbox_pairs[]"]').each(function() {
            $(this).attr("checked") && c++
        }),
            $("#selectedText").html(b.replace("%XX%", c.toString())),
            c >= a ? ($("#selectedText").html(b.replace("%XX%", a.toString())),
                $("#notificationMessageSelected > .alertText").html(b.replace("%XX%", a.toString())),
                $("#notificationMessageSelected").slideDown("fast"),
                $("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:not(:checked)").prop("disabled", !0),
                $("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:not(:checked)").siblings("label").addClass("lighterGrayFont"),
                !1) : (1 == c ? ($("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:checked").prop("disabled", !0),
                $("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:checked").siblings("label").addClass("lighterGrayFont")) : ($("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:checked").prop("disabled", !1),
                $("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:checked").siblings("label").removeClass("lighterGrayFont")),
                $("#notificationMessageSelected").slideUp("fast"),
                $("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:not(:checked)").prop("disabled", !1),
                $("#ecoFilterBoxCountry,#more_pairs_table").find("input:checkbox:not(:checked)").siblings("label").removeClass("lighterGrayFont"),
                !0)
    }
    function d(a) {
        var b = a.replace("commoditiesCategory_", "");
        "checked" == $("#" + a).attr("checked") ? $("#filterCategory_" + b).find("input:checkbox").attr("checked", !0) : $("#filterCategory_" + b).find("input:checkbox").attr("checked", !1)
    }
    function e(a) {
        var b = $("#" + a).attr("category")
            , c = !1
            , d = !1
            , e = 0
            , f = 0
            , g = 0;
        $("#filterCategory_" + b).find("ul").find("input:checkbox").each(function(a) {
            g++,
                "checked" == $(this).attr("checked") ? e++ : f++
        }),
        e == g && (c = !0),
        f == g && (d = !0),
        c && $("#commoditiesCategory_" + b).attr("checked", !0),
        d && $("#commoditiesCategory_" + b).attr("checked", !1),
        !c && !d && e > 0 && $("#commoditiesCategory_" + b).attr("checked", !1)
    }
    function f() {
        $("#more_pairs_table").hasClass("displayNone") ? ($("#more_pairs_table").removeClass("displayNone"),
            $("#pairs_see_more").html($("#pairs_see_more").attr("see-less"))) : ($("#more_pairs_table").addClass("displayNone"),
            $("#pairs_see_more").html($("#pairs_see_more").attr("see-more")))
    }
    function g() {
        $('[name="checkbox_pairs[]"]').attr("checked", !1),
            $('[name="mixed_pairs[]"]').attr("checked", !1),
            $('[id^="commoditiesCategory_"]').attr("checked", !1)
    }
    function h(a) {
        if (params = $("#filtersForm").serialize(),
            params || $("input[disabled]", "#filtersForm").each(function() {
                "checked" == $(this).attr("checked") && (params = params + "&" + $(this).attr("name") + "=" + $(this).val())
            }),
            "checked" == $("#commoditiesCategory__broad_commodities").attr("checked") && (params += "&others=true"),
            $("#filtersForm").length && $('[id^="filter_"]').length) {
            var b = $('[id^="filter_"].toggled').attr("id");
            params = params + "&currentTab=" + b.replace("filter_", "")
        }
        $("#filtersForm").attr(""),
            $.ajax({
                url: a,
                type: "POST",
                data: params,
                beforeSend: function() {},
                complete: function() {},
                success: function(a) {
                    $("#pairs_table").toggle(),
                        $("#cross_rates_container").html(a)
                }
            })
    }
    this.validatePairsQuantity = c,
        this.filtersFormSubmit = h,
        this.toogleMoreTable = f,
        this.categorySelect = d,
        this.pairSelected = e,
        this.filterRestoreDefaults = g
};
// File: functions/functions_cdn.js
function scrollng_ad(a, b) {
    if ($("." + a).length && $("#" + b).length) {
        var c = $("." + a)
            , d = c.outerHeight(!0) - c.height() + c.find(">:first-child").outerHeight(!0) - c.find(">:first-child").height()
            , e = c.offset().top - d
            , f = $("#" + b).offset().top
            , g = c.height()
            , h = f - g
            , i = !(e + g + 150 > f);
        if (i) {
            var j = $("header")
                , k = 38
                , l = $("#leftColumn").height()
                , m = $("#rightColumn").height() + ($("#ad3").height() ? 0 : 600);
            l > m && $(window).scroll($.throttle(function() {
                var a, b, d = $(window).scrollTop() + k;
                b = k + (j.is(".switchHeader") ? 0 : 52),
                    g = c.height(),
                    h = f - (g + b),
                    i && d > e ? c.css({
                        position: "fixed",
                        top: b
                    }) : c.css("position", "static"),
                d > h && (a = h - d,
                    c.css({
                        top: a + b
                    }))
            }, 32))
        }
    }
}
function isScrolledIntoView(a, b, c) {
    var d = $(c.currentTarget)
        , e = d.offset().top - $(document).scrollTop() - b - 85
        , f = e > 0;
    return f
}
function switch_quotes_bar_tab(a) {
    $("#quotes_bar_layer" + a).siblings().removeClass("inlineblock displayNone").addClass("displayNone"),
        $("#quotes_bar_layer" + a).removeClass("inlineblock displayNone").addClass("inlineblock"),
        document.getElementById("quotes_bar_tabs_left").className = "inlineblock quotes_bar_" + a,
        document.getElementById("quotes_bar_tabs_right").className = "inlineblock quotes_bar_rtl_" + a
}
function changeTabFreeBee(a) {
    for (var b, c = 1; 3 >= c; c++)
        if (b = "freebee_tab_" + c,
            a == c) {
            if (c > 1) {
                var d;
                d = c - 1,
                    document.getElementById("freebee_seperator_" + d).style.display = "none"
            }
            document.getElementById(b).className = "freebee_on_tab",
                document.getElementById("freebee_data_" + c).style.display = ""
        } else
            document.getElementById(b).className = "freebee_off_tab",
                document.getElementById("freebee_data_" + c).style.display = "none",
                document.getElementById("freebee_seperator_" + c).style.display = ""
}
function ts(a, b) {
    if (document.getElementById) {
        var c, d, e, f = document, g = null, h = startSz;
        for (h += b,
             1 > h && (h = 2),
             h > 2 && (h = 0),
                 startSz = h,
             (g = f.getElementById(a)) || (g = f.getElementsByTagName(a)[0]),
                 g.className = szs[h],
                 c = 0; c < tgs.length; c++)
            for (e = g.getElementsByTagName(tgs[c]),
                     d = 0; d < e.length; d++)
                e[d].className = szs[h]
    }
}
function strpos(a, b, c) {
    var d = a.indexOf(b, c);
    return d >= 0
}
function substr(a, b, c) {
    return 0 > b && (b += a.length),
        void 0 == c ? c = a.length : c += 0 > c ? a.length : b,
    b > c && (c = b),
        a.substring(b, c)
}
function checkUncheckAll(a) {
    var b = a.form
        , c = 0;
    for (c = 0; c < b.length; c++)
        "checkbox" == b[c].type && "checkall" != b[c].name && (b[c].checked = a.checked)
}
function erase_input_onclick(a) {
    a.firstTime || (a.firstTime = !0,
        a.value = "")
}
function urlencode(a) {
    return escape(a).replace("+", "%2B").replace("%20", "+").replace("*", "%2A").replace("/", "%2F").replace("@", "%40")
}
function validateEmail(a) {
    var b = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return b.test(a) ? retVal = 1 : retVal = 0,
        retVal
}
function validateProfileEmail(a) {
    var b = /^[a-zA-Z0-9!#$%&*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/
        , c = /^[^@]*<[a-zA-Z0-9!#$%&*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?>$/;
    return a.length <= 254 && a.match(b) || a.match(c) ? 1 : 0
}
function getCheckedValue(a) {
    if (!a)
        return "";
    var b = a.length;
    if (void 0 == b)
        return a.checked ? a.value : "";
    for (var c = 0; b > c; c++)
        if (a[c].checked)
            return a[c].value;
    return ""
}
function IsNumeric(a) {
    var b, c = "0123456789.";
    if (0 === a.length)
        return !1;
    for (var d = 0; d < a.length; d++)
        if (b = a.charAt(d),
            -1 === c.indexOf(b))
            return !1;
    return !0
}
function ReplaceAll(a, b, c) {
    for (var d = a, e = d.indexOf(b); -1 != e; )
        d = d.replace(b, c),
            e = d.indexOf(b);
    return d
}
function getposOffset(a, b) {
    for (var c = "left" == b ? a.offsetLeft : a.offsetTop, d = a.offsetParent; null != d; )
        c = "left" == b ? c + d.offsetLeft : c + d.offsetTop,
            d = d.offsetParent;
    return c
}
function showhide(a, b, c, d) {
    (ie5 || ns6) && (dropmenuobj.style.left = dropmenuobj.style.top = -500),
        "click" == b.type && a.visibility == d || "mouseover" == b.type ? a.visibility = c : "click" == b.type && (a.visibility = d)
}
function iecompattest() {
    return document.compatMode && "BackCompat" != document.compatMode ? document.documentElement : document.body
}
function clearbrowseredge(a, b) {
    var c = 0;
    if ("rightedge" == b) {
        var d = ie5 && !window.opera ? iecompattest().scrollLeft + iecompattest().clientWidth - 15 : window.pageXOffset + window.innerWidth - 15;
        dropmenuobj.contentmeasure = dropmenuobj.offsetWidth,
        d - dropmenuobj.x < dropmenuobj.contentmeasure && (c = dropmenuobj.contentmeasure - a.offsetWidth)
    } else {
        var e = ie5 && !window.opera ? iecompattest().scrollTop : window.pageYOffset
            , d = ie5 && !window.opera ? iecompattest().scrollTop + iecompattest().clientHeight - 15 : window.pageYOffset + window.innerHeight - 18;
        dropmenuobj.contentmeasure = dropmenuobj.offsetHeight,
        d - dropmenuobj.y < dropmenuobj.contentmeasure && (c = dropmenuobj.contentmeasure + a.offsetHeight,
        dropmenuobj.y - e < dropmenuobj.contentmeasure && (c = dropmenuobj.y + a.offsetHeight - e))
    }
    return c
}
function dropdownmenu(a, b, c) {
    return window.event ? event.cancelBubble = !0 : b.stopPropagation && b.stopPropagation(),
    "undefined" != typeof dropmenuobj && (dropmenuobj.style.visibility = "hidden"),
        clearhidemenu(),
    (ie5 || ns6) && (dropmenuobj = document.getElementById(c),
    hidemenu_onclick && (dropmenuobj.onclick = function() {
            dropmenuobj.style.visibility = "hidden"
        }
    ),
        dropmenuobj.onmouseover = clearhidemenu,
        dropmenuobj.onmouseout = ie5 ? function() {
                dynamichide(event)
            }
            : function(a) {
                dynamichide(a)
            }
        ,
        showhide(dropmenuobj.style, b, "visible", "hidden"),
        dropmenuobj.x = getposOffset(a, "left"),
        dropmenuobj.y = getposOffset(a, "top"),
        dropmenuobj.style.left = dropmenuobj.x - clearbrowseredge(a, "rightedge") + "px",
        dropmenuobj.style.top = dropmenuobj.y - clearbrowseredge(a, "bottomedge") + a.offsetHeight + "px"),
        clickreturnvalue()
}
function clickreturnvalue() {
    return !((ie5 || ns6) && !enableanchorlink)
}
function contains_ns6(a, b) {
    for (; b.parentNode; )
        if ((b = b.parentNode) == a)
            return !0;
    return !1
}
function dynamichide(a) {
    ie5 && !dropmenuobj.contains(a.toElement) ? delayhidemenu() : ns6 && a.currentTarget != a.relatedTarget && !contains_ns6(a.currentTarget, a.relatedTarget) && delayhidemenu()
}
function delayhidemenu() {
    delayhide = setTimeout("dropmenuobj.style.visibility='hidden'", disappeardelay)
}
function clearhidemenu() {
    "undefined" != typeof delayhide && clearTimeout(delayhide)
}
function showQuotesBar() {
    for (var a = 33; document.getElementById("mainMenuDropDown_" + a + "_container"); )
        a != dropDownId && hideQuotesBar(a),
            a++;
    time_out_off && (clearTimeout(t),
        time_out_off = !1),
        document.getElementById("mainMenuDropDown_" + dropDownId + "_container").style.visibility = "visible",
        document.getElementById("mainMenuDropDown_" + dropDownId + "_container").style.display = "block",
        document.getElementById("mainMenuDropDown_" + dropDownId + "_divid").style.visibility = "visible",
        sub_menu = !0,
        time_out_on = !1,
        time_out_off = !1
}
function hideQuotesBar(a) {
    a ? (document.getElementById("mainMenuDropDown_" + a + "_container").style.visibility = "hidden",
        document.getElementById("mainMenuDropDown_" + a + "_container").style.display = "none",
        document.getElementById("mainMenuDropDown_" + a + "_divid").style.visibility = "hidden") : (document.getElementById("mainMenuDropDown_" + dropDownId + "_container").style.visibility = "hidden",
        document.getElementById("mainMenuDropDown_" + dropDownId + "_container").style.display = "none",
        document.getElementById("mainMenuDropDown_" + dropDownId + "_divid").style.visibility = "hidden",
        sub_menu = !1,
        time_out_on = !1,
        time_out_off = !1)
}
function showMyAccount() {
    time_out_off && (clearTimeout(t),
        time_out_off = !1),
        document.getElementById("my_account").className = "selected my_account",
        document.getElementById("my_account_list_div").style.display = "block",
        sub_menu = !0,
        time_out_on = !1,
        time_out_off = !1
}
function hideMyAccount() {
    document.getElementById("my_account").className = "no_selected my_account",
        document.getElementById("my_account_list_div").style.display = "none",
        sub_menu = !1,
        time_out_on = !1,
        time_out_off = !1
}
function hideSubMenu(a) {
    sub_menu ? t = "my_account" == a ? setTimeout("hideMyAccount()", 110) : "markets_menu" == a ? setTimeout("hide_markets_drop_down()", 110) : setTimeout("hideQuotesBar()", 110) : clearTimeout(t),
        time_out_on = !1,
        time_out_off = !0
}
function openLightBox(a, b, c, d, e) {
    var f = document.getElementById(a);
    $("#mainLightBoxFilter").css("height", $(document).height()),
        $("#mainLightBoxFilter").css("display", "block");
    var g = (document.body.clientWidth - b) / 2
        , h = ($(window).height() - c) / 2;
    $(f).css("left", g),
        $(f).css("top", h),
        d ? (gradient(a, 0),
            fadein(a)) : $("#" + a).css("display", "block")
}
function closeLightBox(a, b, c) {
    $("#mainLightBoxFilter").css("display", "none"),
        $("#" + a).css("display", "none")
}
function sendDataToSWF(a, b) {
    if ("" == a || "object" != typeof b)
        return !1;
    var c;
    return (c = -1 != navigator.appName.indexOf("Microsoft") ? window[a] : document[a]) ? 100 != c.PercentLoaded() ? !1 : void c.sendDataToActionScript(b) : !1
}
function gen_sideblock_user_quotes(a) {
    $.get("/common/user_quotes_block/user_quotes_sblock_data.php", {
        action: "print_page",
        sid: a
    }, function(a) {
        $("#tab_1_inner").html(a)
    })
}
function clear_sideblock_user_quotes() {
    $.get("/common/user_quotes_block/user_quotes_sblock_data.php", {
        action: "clear_cache"
    }, function(a) {
        $("#tab_1_inner").html(a)
    })
}
function OnClickRecentQuotes(a) {
    var b = $(a).attr("id");
    switch ($(a).addClass("Selected").unbind("click").siblings().each(function() {
        $(this).removeClass("Selected").click(function() {
            OnClickRecentQuotes(this)
        })
    }),
        b) {
        case "tab_1":
            gen_sideblock_user_quotes($(a).attr("sid")),
                $("#recent-box-text").css("display", "block"),
                $("#portfolio-box-text").css("display", "none");
            break;
        case "tab_2":
            genSideblockUserPortfolio($("#tab_2").attr("uri"), $(a).attr("sid")),
                $("#recent-box-text").css("display", "none"),
                $("#portfolio-box-text").css("display", "block")
    }
}
function genSideblockUserPortfolio(a, b) {
    $.get("/common/portfolio/portfolio.data.php", {
        action: "getPortfolioSideBox",
        uri: a,
        sid: b
    }, function(a) {
        $("#portfolio-box-text").html(a)
    })
}
function toFixed(a, b) {
    return a *= Math.pow(10, b),
        a = Math.round(a),
        a /= Math.pow(10, b)
}
function val_inputs(a) {
    for (var b = a.split(","), c = !0, d = 0; d < b.length; )
        HideError(b[d]),
        (isNaN($(b[d]).val()) || 0 == $(b[d]).val().length) && (ShowError(b[d]),
            c = !1),
            d++;
    return c
}
function ShowError(a) {
    $(a).removeClass("input_border").addClass("input_error")
}
function HideError(a) {
    $(a).removeClass("input_error").addClass("input_border")
}
function validate_review(a, b, c, d, e, f) {
    var g = !1;
    $("#review_title").length > 0 && (g = !0);
    var h = !1;
    $("#vote1_title").length > 0 && (h = !0);
    var i = !1;
    $("#vote2_title").length > 0 && (i = !0);
    var j = !1;
    $("#vote3_title").length > 0 && (j = !0),
        $("#review_title").removeClass(),
        $("#review_text").removeClass(),
        $("#vote1_title").removeClass().addClass("arial_12 bold"),
        $("#vote2_title").removeClass().addClass("arial_12 bold"),
        $("#vote3_title").removeClass().addClass("arial_12 bold"),
        $("#review_form_error").removeClass().fadeIn(100),
        $("#review_form_msgbox").removeClass().addClass("messagebox").text("Validating....").fadeIn(1e3);
    var k = "";
    return g && ("" == $("#review_title").val() ? (k += f.title_empty + "<br />",
        $("#review_title").removeClass().addClass("input_error")) : $("#review_title").val().length > 70 && (k += f.title_too_long + "<br />",
        $("#review_title").removeClass().addClass("input_error"))),
        "" == $("#review_text").val() ? (k += $("#error_description_is_empty_message").val() + "<br />",
            $("#review_text").removeClass().addClass("input_error")) : $("#review_text").val().length > 1e3 && (k += f.review_too_long + "<br />",
            $("#review_text").removeClass().addClass("input_error")),
    h && i && j && (void 0 == $("[name=vote1]:checked").val() && (k += f.review_vote_not_choosen + "<br />",
        $("#vote1_title").removeClass().addClass("arial_12 bold redFont")),
    void 0 == $("[name=vote2]:checked").val() && (k += f.review_vote_not_choosen + "<br />",
        $("#vote2_title").removeClass().addClass("arial_12 bold redFont")),
    void 0 == $("[name=vote3]:checked").val() && (k += f.review_vote_not_choosen + "<br />",
        $("#vote3_title").removeClass().addClass("arial_12 bold redFont"))),
        $("#review_form_msgbox").fadeTo(200, .1, function() {
            if ("" == k) {
                var f = "";
                g && (f = $("#review_title").val());
                var l = "";
                h && (l = $("[name=vote1]:checked").val());
                var m = "";
                i && (m = $("[name=vote2]:checked").val());
                var n = "";
                j && (n = $("[name=vote3]:checked").val()),
                    $(this).html("Sending.....").addClass("messageboxok").fadeTo(900, 1, function() {
                        e ? $.get("/common/ajax_func.php", {
                            action: "add_review",
                            category: a,
                            item_ID: b,
                            title: f,
                            text: $("#review_text").val(),
                            vote1: l,
                            vote2: m,
                            vote3: n
                        }, function(a) {
                            window.location = document.location.href
                        }) : ajax_set_reviews_session_and_continue(c, d, a, b, f, $("#review_text").val(), l, m, n)
                    })
            } else
                $(this).html(k).removeClass().addClass("messageboxerror review_messageboxerror").fadeTo(900, 1)
        }),
        !1
}
function add_opinion_to_review(a, b, c, d, e) {
    e ? $.get("/common/ajax_func.php", {
        action: "add_review_opinion",
        review_ID: b,
        positive: a
    }, function(a) {
        window.location = document.location.href
    }) : $.get("/common/ajax_func.php", {
        action: "set_sessions_for_reviews_opinion",
        uri: d,
        review_ID: b,
        positive: a
    }, function(a) {
        window.location = c
    })
}
function ajax_vote(a, b, c, d, e) {
    document.getElementById(e).onclick = null,
        document.getElementById(e).style.cursor = null,
        $.get("/common/ajax_func.php", {
            action: a,
            attr_ID: b,
            target_ID: c
        }, function(a) {
            if (1 == a) {
                var b = document.getElementById(d).innerHTML;
                document.getElementById(d).innerHTML = parseInt(b) + 1
            }
        })
}
function add_user_to_webinar(a, b, c) {
    if (document.getElementById("webinar-reg-body")) {
        var d = document.getElementById("webinar-reg-body").offsetHeight
            , e = document.getElementById("webinar-reg-body").offsetWidth;
        document.getElementById("webinar-reg-body").innerHTML = '<table style="height:' + d + "px;width:" + e + 'px;"><tr><td style="vertical-align:middle;text-align:center;"><br /><span style="color:#cbcbcb;">Loading..<img src="http://c1308342.r42.cf0.rackcdn.com/loading.gif"></span></td></tr></table>'
    }
    $.get("/common/ajax_func.php", {
        action: "add_user_to_webinar",
        webinar_ID: a,
        user_ID: b
    }, function(a) {
        if (1 == a) {
            if (document.getElementById("webinar-reg-body")) {
                var b = $("#webinar-reg-body-inner").html();
                $("#webinar-reg-body").html(b)
            }
            "" != c && (window.location = c)
        } else
            document.getElementById("webinar-reg-body") && (document.getElementById("webinar-reg-body").innerHTML = '<table style="height:' + d + "px;width:" + e + 'px;"><tr><td style="vertical-align:middle;text-align:center;"><span style="color:red;">Error Occured!</span></td></tr></table>'),
            "" != c && (window.location = c)
    })
}
function ajax_set_session_and_continue(a, b, c, d) {
    d = d || "",
        $.get("/common/ajax_func.php", {
            action: "set_sessions",
            uri: b,
            webinar_ID: c,
            payment_arr: d
        }, function(b) {
            window.location = a
        })
}
function ajax_set_reviews_session_and_continue(a, b, c, d, e, f, g, h, i) {
    $.get("/common/ajax_func.php", {
        action: "set_sessions_for_reviews",
        uri: b,
        category: c,
        item_ID: d,
        review_title: e,
        review_text: f,
        vote1: g,
        vote2: h,
        vote3: i
    }, function(b) {
        window.location = a
    })
}
function set_session(a, b) {
    $.get("/common/ajax_func.php", {
        action: "set_session",
        session_var: a
    }, function(a) {
        window.location = b
    })
}
function slided_report_error() {
    document.getElementById("loading_report").style.display = "block",
        $.get("/common/send/send.php", {
            type: "report_error",
            security_code: document.report_error_form.security_code.value,
            page: document.report_error_form.php_self.value,
            name: document.report_error_form.first_name.value,
            email: document.report_error_form.email.value,
            report: document.report_error_form.report.value
        }, function(a) {
            document.getElementById("loading_report").style.display = "none";
            var b;
            "string" == typeof a ? (b = new ActiveXObject("Microsoft.XMLDOM"),
                b.async = !1,
                b.loadXML(a)) : b = a;
            var c = $("error_name", b).text()
                , d = $("error_email", b).text()
                , e = $("error_code", b).text()
                , f = $("error", b).text()
                , g = $("output", b).text()
                , h = $("dir", b).text();
            "true" == c || "true" == d || "true" == e ? document.getElementById("report_error_message").innerHTML = '<i><span class="darkRedFont">' + f + "</span></i>" : "false" == c && "false" == d && "false" == e && (document.getElementById("report_error").innerHTML = '<table cellpadding="0" cellspacing="0" height="100%" width="100%"><tr><td height="1%" align="' + h + '" valign="bottom"><table cellpadding="0" cellspacing="0"><tr><td><a class="arial_12 grayFont" href="javascript:window.close();"><img border="0" src="/images/close.gif"> Close</a></td></tr></table></td></tr><tr><td align="center" valign="center"><table cellpadding="0" cellspacing="0"><tr><td><i><span style="color:green;">' + g + "</span></i></td></tr></table></td></tr></table>")
        })
}
function include_ext_file_in_div(a, b, c, d, e, f, g, h, k, l, m, n, o, p, q) {
    if (e) {
        for (document.getElementById("filter_div") && (document.getElementById("filter_div").style.visibility = "hidden"),
                 i = 0; i < 13; i++)
            void 0 != e[i] && 0 != e[i] && (a += "&" + e[i] + "=hide");
        if (f)
            for (j = 0; j <= 3; j++)
                void 0 != f[j] && 0 != f[j] && (a += "&" + f[j] + "=hide");
        g && (a += "&white_line=" + g)
    }
    h && (a += "&print_event_details=" + h),
    k && (a += "&print_title=" + k),
    l && (a += "&print_banner_inside=" + l),
    m && (a += "&print_title_table=" + m),
    n && (a += "&print_add_to_your_site_top=" + n),
    o && (a += "&print_add_to_your_site_bottom=" + o),
    p && (a += "&print_report_an_error=" + p),
    q && (a += "&print_importance=" + q);
    var r = new Array;
    new Array;
    obj[b] = document.getElementById(b),
        r[b] = parseInt(obj[b].offsetHeight) + "px",
        obj[b].innerHTML = '<table dir="' + d + '" width="100%" height="' + r[b] + '"><tr style="height:50%;"><td align="center" valign="top">' + c + '<br /><img src="http://c1308342.r42.cf0.rackcdn.com/fx_loading.gif"></td></tr><tr style="height:50%;"><td align="center" valign="bottom">' + c + '<br /><img src="http://c1308342.r42.cf0.rackcdn.com/fx_loading.gif"></td></tr></table>',
        $.ajax({
            url: a,
            type: "GET",
            dataType: $.browser.msie ? "text" : "html",
            success: function(a) {
                document.getElementById(b).innerHTML = a
            }
        })
}
function get_ec_event_data(a, b, c) {
    $.get("/ec_event.php", {}, function(b) {
        var d;
        if ("string" == typeof b ? (d = new ActiveXObject("Microsoft.XMLDOM"),
                d.async = !1,
                d.loadXML(b)) : d = b,
            "ltr" == c)
            var e = "left";
        else
            var e = "right";
        var f = $("event_banner", d).text()
            , g = $("event_banner_text", d).text();
        "nothing" != f && "nothing" != g ? document.getElementById("banner_" + a).innerHTML = '<table width="100%"><tr><td><img src="http://c1308342.r42.cf0.rackcdn.com/spacer.gif" style="width: 5px;"></td><td style="vertical-align:middle;">' + f + '</td><td><img src="http://c1308342.r42.cf0.rackcdn.com/spacer.gif" style="width: 5px;"></td><td style="vertical-align:middle;text-align:' + e + ';width:100%;">' + g + "</td></tr></table>" : document.getElementById("main_banner_td_" + a).style.display = "none"
    })
}
function profit_calc(a, b, c, d, e, f, g) {
    0 != !isNaN(d) && 0 != !isNaN(e) && ($("#msgboxtotal").hide(),
        $("#calculating").fadeIn(100),
        $.get("/common/ajax_func.php", {
            action: "profit_calc",
            acc_curr: a,
            curr_pairs: c,
            otp: d,
            ctp: e,
            buy: f,
            trade_size: g
        }, function(c) {
            c.length > 0 && $("#msgboxtotal").fadeTo(200, .1, function() {
                if ("error" == c)
                    $(this).html("Error Occured!").removeClass().addClass("messageboxerror_with_border").fadeTo(900, 1);
                else {
                    var d = new Array;
                    d[17] = "&#128;",
                        d[4] = "",
                        d[2] = "&#165;",
                        d[15] = "&#36;",
                        d[3] = "&#163;",
                        d[1] = "",
                        d[5] = "",
                        d[12] = "&#36;",
                        $("#calculating").hide(),
                        $(this).html(d[a] + c).fadeIn(100).fadeTo(300, 1),
                        $("#msgbox").html(b).fadeIn(100).fadeTo(300, 1)
                }
            })
        }))
}
function carrytrade_calc() {
    if (val_inputs("#LRate,#BRate,#trade_size,#Days")) {
        var a = $("select[name='acc_curr'] :selected").val();
        $("#loader").fadeIn("fast"),
            $.get("/common/ajax_func.php", {
                action: "CarryTrade_Interest",
                acc_curr: a,
                curr_pair: $("#curr_pair :selected").val(),
                buy: $("#buy:checked").val(),
                lrate: $("#LRate").val(),
                brate: $("#BRate").val(),
                trade_size: $("#trade_size").val(),
                days: $("#Days").val()
            }, function(b) {
                if (b.length > 0) {
                    var c = new Array;
                    c[17] = "&#128;",
                        c[4] = "",
                        c[2] = "&#165;",
                        c[15] = "&#36;",
                        c[3] = "&#163;",
                        c[1] = "",
                        c[5] = "",
                        c[12] = "&#36;";
                    var d = b.split(",")
                        , e = "<td class='subtotalbig arial_18_b'>" + c[a] + toFixed(d[0], 2) + "</td><td class='standart arial_18_b'>" + c[a] + toFixed(d[1], 2) + "</td><td class='arial_18_b'>" + c[a] + toFixed(d[2], 2) + "</td>";
                    $(".subtotal").html(e).fadeIn(100).fadeTo(300, 1),
                        $("#msgbox").html($("select[name='acc_curr'] :selected").text()),
                        $("#loader").fadeOut("fast")
                }
            })
    }
}
function submitCorrelationCalculator() {
    var curr_pair = $("select[name='curr_pair'] :selected").val();
    $("#loader").fadeIn("fast");
    var selected_pairs = $("#subtotal input:checked").map(function(a, b) {
        return $(b).val()
    }).toArray();
    selected_pairs = selected_pairs.length ? selected_pairs.join(",") : "",
        $.get("/common/ajax_func.php", {
            action: "correl_calc",
            curr_pair: curr_pair,
            cur1: $("select[name='curr_pair'] :selected").attr("cur1"),
            cur2: $("select[name='curr_pair'] :selected").attr("cur2"),
            selected_pairs: selected_pairs,
            timeframe: $("#timef :selected").val(),
            periods: $("#periods :selected").val()
        }, function(data) {
            if (data.length > 0) {
                var ret = eval(data);
                for ($("#correlation-results").html(ret[0]),
                         $("#loader").fadeOut("fast"),
                         jquery_onload(),
                         i = 1; i <= 3; i++)
                    imageLoader("http://" + FP.global._defaultDomain + "/common/candlestick/currenciesid.chart.php?id=" + ret[i] + "&periods=" + $("#periods :selected").val() + "&timeframe=" + $("#timef :selected").val(), "#graph" + ret[i]);
                selectedTd = $("#subtotal input:checked").length
            }
        })
}
function removeCorrelGraph(a) {
    $("#" + a).remove()
}
function imageLoader(a, b, c) {
    var d = new Image;
    $(d).attr("src", a).load(function() {
        $(this).css("display", "none"),
            $(b).empty(),
            $(b).append(this),
            $(this).fadeIn("slow")
    }).ready(function() {
        c && $(c).fadeIn(2e3)
    })
}
function toggle_feedback_div(a, b, c, d) {
    if (!sendingEmail[b])
        if ($("#" + b + " #tools_footer_bug_span").css("color", "#0059B0"),
                $("#" + b + " #tools_footer_link_span").css("color", "#0059B0"),
                $("#link_to_tool_div").css("display", "none"),
                $("#share_w_friend_tool_div").css("display", "none"),
            "none" == $("#" + b).css("display")) {
            if ("" != bugReportTable[b] && void 0 != bugReportTable[b])
                if (currTime = (new Date).getTime(),
                    currTime - timeMessageSent[b] < 6e4) {
                    var e = d
                        , f = Math.round(60 - (currTime - timeMessageSent[b]) / 1e3);
                    e = e.replace("%NUMBER%", f),
                        $("#" + b + " #reportABugWrapper").html(e)
                } else
                    $("#" + b + " #reportABugWrapper").html(bugReportTable[b]),
                        $("#" + b + " #reportABugBug").addClass("reportABugSelected"),
                        $("#" + b + " #reportABugPraise").removeClass("reportABugSelected"),
                        $("#" + b + " #reportABugQuestion").removeClass("reportABugSelected"),
                        $("#" + b + " #reportABugIdea").removeClass("reportABugSelected"),
                        $("#" + b + " #reportABugWrapper").css("height", "157px"),
                        $("#" + b).css("height", "157px"),
                        $("#" + b + " #msgType").val(10);
            $("#" + b).css("display", "block"),
                $("#" + b + " #tools_footer_bug_span").css("color", "#000000"),
                $("#linkToToolIndicator").addClass("displayNone"),
                $("#linkToToolIndicator").removeClass("block"),
                $("#feedbackIndicator").addClass("block"),
                $("#feedbackIndicator").removeClass("displayNone"),
                $("#shareIndicator").removeClass("block").addClass("displayNone")
        } else
            $("#" + b).css("display", "none"),
                $("#feedbackIndicator").addClass("displayNone"),
                $("#feedbackIndicator").removeClass("block")
}
function checkCommentText(a, b) {
    switch ("" != bugReportTable[a] && void 0 != bugReportTable[a] || (bugReportTable[a] = $("#" + a + " #reportABugWrapper").html()),
        $("#" + a + " #msgType").val()) {
        case "10":
            $("#" + a + " #comment_text").val() != b.bugText && $("#" + a + " #comment_text").val() != b.errorMsg || $("#" + a + " #comment_text").val("");
            break;
        case "11":
            $("#" + a + " #comment_text").val() != b.praiseText && $("#" + a + " #comment_text").val() != b.errorMsg || $("#" + a + " #comment_text").val("");
            break;
        case "12":
            $("#" + a + " #comment_text").val() != b.questionText && $("#" + a + " #comment_text").val() != b.errorMsg || $("#" + a + " #comment_text").val("");
            break;
        case "13":
            $("#" + a + " #comment_text").val() != b.ideaText && $("#" + a + " #comment_text").val() != b.errorMsg || $("#" + a + " #comment_text").val("")
    }
    $("#" + a + " #comment_text").removeClass("input_error")
}
function validate_bug_report(a, b, c, d, e) {
    var f = "";
    return checkCommentText(d, e),
    "" == $("#" + d + " #comment_text").val() && (f += e.errorMsg + "<br />",
        $("#" + d + " #comment_text").addClass("input_error"),
        $("#" + d + " #comment_text").val(e.errorMsg)),
    "" == f && (sendingEmail[d] = !0,
        realput = $("#" + d + " #comment_text").val().substring(0, 350),
        usr_nav_data = "User OS: " + navigator.platform,
        usr_nav_data += "<br>User Agent: " + navigator.userAgent,
        msgType = $("#" + d + " #msgType").val(),
        $("#" + d + " #reportABugLightBox").css("display", "block"),
        $.get("/common/ajax_func.php", {
            action: "add_bug_report",
            text: realput,
            usr_nav_data: usr_nav_data,
            tool_type: b,
            site_url: c,
            msgType: msgType
        }, function(b) {
            "ok" == b && (success_msg_container = '<span class="arial_11 bold grayFont" style="padding-left:12px;width:100%;text-align:' + FP.global._textAlign + '">' + a + "</span>",
                $("#" + d + " #reportABugSubmitButton").css("text-align", FP.global._textAlign),
                $("#" + d + " #reportABugSubmitButton").html(success_msg_container),
                $("#" + d + " #reportABugLightBox").css("display", "none"),
                timeMessageSent[d] = (new Date).getTime(),
                sendingEmail[d] = !1)
        })),
        !1
}
function toggle_emailfriend_div(a, b) {
    $("#link_to_tool_div").css("display", "none"),
        $("#" + b).css("display", "none"),
        "none" == $("#" + a).css("display") ? ($("#" + a).css("display", "block"),
            $("#shareIndicator").addClass("block").removeClass("displayNone"),
            $("#feedbackIndicator").addClass("displayNone").removeClass("block"),
            $("#linkToToolIndicator").addClass("displayNone").removeClass("block")) : ($("#" + a).css("display", "none"),
            $("#shareIndicator").addClass("displayNone").removeClass("block"))
}
function toggle_tool_footer_div(a, b, c) {
    $("#" + b + " #tools_footer_link_span").css("color", "#0059B0"),
        $("#" + b + " #tools_footer_bug_span").css("color", "#0059B0"),
        $("#" + c).css("display", "none"),
        $("#share_w_friend_tool_div").css("display", "none"),
        "none" == $("#" + b).css("display") ? ($("#" + b).css("display", "block"),
            $("#" + a).css("color", "#000000"),
            $("#feedbackIndicator").addClass("displayNone").removeClass("block"),
            $("#linkToToolIndicator").addClass("block").removeClass("displayNone"),
            $("#shareIndicator").removeClass("block").addClass("displayNone")) : ($("#" + b).css("display", "none"),
            $("#linkToToolIndicator").addClass("displayNone").removeClass("block"))
}
function submitBugForm(a, b, c, d, e, f) {
    validate_bug_report(b, c, d, e, f)
}
function link_has_underline(a, b) {
    b ? $(a).css("text-decoration", "underline") : $(a).css("text-decoration", "none")
}
function validate_ef_inputs(a) {
    switch (a) {
        case "ef_to":
            validate_ef_to();
            break;
        case "ef_your_email":
            validate_ef_your_email()
    }
}
function validate_ef_to() {
    var a = jQuery.trim($("#ef_to").val()).split(",")
        , b = !0
        , c = a.length;
    if (c > 10)
        return $("#ef_to").removeClass("lightgrayFont").addClass("darkRedFont error"),
            $("#ef_to_remark").text($("#ef_to_remark").attr("error2")).addClass("visible darkRedFont").removeClass("hidden lightgrayFont"),
            !1;
    for (var d = 0; c > d; d++)
        if (!validateEmail($.trim(a[d]))) {
            b = !1;
            break
        }
    return b ? $("#ef_to").removeClass("darkRedFont").removeClass("error") : ($("#ef_to").removeClass("lightgrayFont").addClass("darkRedFont error"),
        $("#ef_to_remark").text($("#ef_to_remark").attr("error")).addClass("visible darkRedFont").removeClass("hidden lightgrayFont")),
        b
}
function validate_ef_your_email() {
    var a = jQuery.trim($("#ef_your_email").val());
    return validateEmail(a) ? ($("#ef_your_email").removeClass("darkRedFont error"),
        $("#ef_your_email_error").removeClass("visible").addClass("hidden"),
        !0) : ($("#ef_your_email").removeClass("lightgrayFont").addClass("darkRedFont error"),
        $("#ef_your_email_error").removeClass("hidden").addClass("visible"),
        !1)
}
function vaildate_ef_form(a, b, c, d) {
    if ("" == $("#user_name").val()) {
        var e, f, g, h, i = "";
        if (validate_ef_to() && validate_ef_your_email()) {
            e = jQuery.trim($("#ef_to").val()),
                g = jQuery.trim($("#ef_your_email").val()),
            $("#ef_from").val() != $("#ef_from").attr("title") && (f = jQuery.trim($("#ef_from").val())),
            $("#ef_msg").val() != $("#ef_msg").attr("title") && (h = jQuery.trim($("#ef_msg").val())),
                i = $("#ef_send_me").is(":checked");
            var j = $("#ef_submit").attr("href");
            $("#ef_submit").removeAttr("href"),
                $("#share_w_friend_tool_div span.loaderImg").css("display", "inline-block"),
                $.get("/common/ajax_func.php", {
                    action: "send_email_to_friend",
                    to: e,
                    your_email: g,
                    from: f,
                    msg: h,
                    send_me: i,
                    page_url: a,
                    html_title: b,
                    h1: d,
                    table_css_width: c
                }, function(a) {
                    $("#share_w_friend_tool_div span.loaderImg").css("display", "none"),
                        $("#ef_submit").attr("href", j),
                    a && (share_w_friend_temp_div = $("#share_w_friend_inner_div").html(),
                        $("#share_w_friend_inner_div").html(a))
                })
        }
    }
}
function ef_more_emails() {
    var a = $("#socialWidgetBottomBox")
        , b = $("#socialWidgetBottomDiv");
    $("#in-share").appendTo("#temp_div"),
        b.html(a.html()),
        $("#share_w_friend_inner_div").html(share_w_friend_temp_div),
        share_w_friend_temp_div = "",
        ef_initial()
}
function ef_initial() {
    $(document).ready(function() {
        $('[name="ef_input"]').inputHints()
    }),
        jQuery.fn.inputHints = function() {
            return $(this).each(function(a) {
                $(this).val($(this).attr("title")).addClass("lightgrayFont")
            }),
                $(this).focus(function() {
                    id = $(this).attr("id"),
                    "ef_to" == id && $("#" + id + "_remark").text($("#" + id + "_remark").attr("remark")).addClass("visible lightgrayFont").removeClass("hidden darkRedFont"),
                    $(this).val() == $(this).attr("title") && $(this).val("").removeClass("lightgrayFont")
                }).blur(function() {
                    id = $(this).attr("id"),
                        $("#" + id + "_remark").addClass("hidden").removeClass("visible"),
                        "" == jQuery.trim($(this).val()) ? ($(this).val($(this).attr("title")).addClass("lightgrayFont").removeClass("darkRedFont error "),
                            $("#" + id + "_error").removeClass("visible").addClass("hidden")) : $(this).val() != $(this).attr("title") && validate_ef_inputs(id)
                })
        }
}
function aboutUsFormCheck(a, b) {
    return cleanAboutUsAlerts(a),
        "" == $("#" + a).val() ? aboutUsAlert(a, b, "required") : $("#" + a).val().length < 2 || $("#" + a).val().length > 30 ? aboutUsAlert(a, b, "minMaxChars") : $("#" + a).val().match(/[\d!(`~!@#$%&*()\{\}\[\]<>\\'")]/) ? aboutUsAlert(a, b, "onlyLatters") : !0
}
function aboutUsCheckSelect(a, b) {
    return cleanAboutUsAlerts(a),
        0 == $("#" + a).val() ? aboutUsAlert(a, b, "selectDepartment") : !0
}
function cleanAboutUsAlerts(a) {
    $("#" + a).focus(function() {
        $("#" + a).removeClass("error"),
            $("#" + a).siblings(".formError").remove()
    })
}
function aboutUsAlert(a, b, c) {
    return $("#" + a).addClass("error"),
    "error" != $("#" + a).next().attr("name") && $("#" + a).after(b.alertHtml + b[a][c] + "</div>"),
        !1
}
function aboutUsCheckEmail(a, b) {
    cleanAboutUsAlerts(a);
    var c = validateProfileEmail($("#" + a).val());
    return 0 == c ? aboutUsAlert(a, b, "emailNotValid") : !0
}
function countChar(a, b, c, d) {
    var e = a.value.length;
    e >= d && (a.value = a.value.substring(c, d),
        e = d),
        $("#" + b).text(e)
}
function aboutUsCheckCV(a) {
    if (cleanAboutUsAlerts("cvURLLink"),
            $("#cvFile").is(":checked")) {
        if ("" == $("#cvUploadFile").val())
            return aboutUsAlert("cvURLLink", a, "provide");
        var b = $("#cvUploadFile").val()
            , c = b.substr(b.lastIndexOf(".") + 1).toLowerCase();
        if ("docx" != c && "doc" != c && "rtf" != c && "txt" != c && "pdf" != c && "odt" != c)
            return aboutUsAlert("cvURLLink", a, "wrongType");
        var d = document.getElementById("cvUploadFile").files[0].size;
        return d > 15e5 ? aboutUsAlert("cvURLLink", a, "fileSize") : !0
    }
    return $("#cvUrl").is(":checked") ? /(http:\/\/|www\.)\S+/i.test($("#cvURLLink").val()) ? !0 : aboutUsAlert("cvURLLink", a, "provide") : void 0
}
function aboutUsContactUsCheckContent(a, b) {
    return cleanAboutUsAlerts(a),
        "" == $("#" + a).val() ? aboutUsAlert(a, b, "required") : $("#" + a).val().length < 4 || $("#" + a).val().length > 600 ? aboutUsAlert(a, b, "minMaxChars") : !0
}
function aboutUsContactUsSubmitForm(a) {
    if (!$("#contactBtn").hasClass("disabled")) {
        $("#contactBtn").addClass("disabled");
        var b = $("#ContactUsForm").serializeArray();
        b.push({
            name: "ContactUsDepartment",
            value: $("#ContactUsDepartment option:selected").text()
        }),
            $.post("/mvc/modules/aboutus/controller/AjaxController.php", b, function(b) {
                if ("success" == b) {
                    if ("1" === $("#ContactUsDepartment").val()) {
                        if (below_10k_sent)
                            var c = 44011;
                        else
                            var c = 44131;
                        var d = Math.random() + ""
                            , e = 1e13 * d;
                        $("#ContactUsThankYou").after('<img src="http://pubads.g.doubleclick.net/activity;xsp=' + c + ";ord=" + e + '?" width="1" height="1" border="0">')
                    }
                    if ($("#ContactUsForm")[0].reset(),
                            $("#ContactUsForm").addClass("displayNone"),
                            $("#ContactUsThankYou").removeClass("displayNone"),
                            below_10k_sent)
                        var f = window.setTimeout(function() {
                            window.clearTimeout(f),
                                window.location = "http://apps.bannerplay.com/investing-direct/"
                        }, 5e3)
                } else
                    switch ($("#contactBtn").removeClass("disabled"),
                        b = JSON.parse(b),
                        b.err_key) {
                        case "captcha":
                            aboutUsAlert("ContactUsRecaptcha", a, "msg")
                    }
            })
    }
}
function ajaxForm(a, b, c, d) {
    var e = new FormData(a[0])
        , f = {
        type: "POST",
        url: b,
        dataType: "json",
        data: e,
        cache: !1,
        contentType: !1,
        processData: !1,
        success: c,
        error: function(a) {}
    };
    for (var g in d)
        f[g] = d[g];
    $.ajax(f)
}
function aboutUsCareerSubmitApply() {
    ajaxForm($("#applyForm"), "/mvc/modules/aboutus/controller/AjaxController.php", function(a) {
        "success" == a ? (hidePopup("careerApplyPopup"),
            showPopup("careerThanks", !0)) : ($("#form_errors").html(a),
            $("#careerSubmitFormBtn").show())
    }, {
        dataType: "html"
    })
}
function aboutUsAutoSelectRadio(a) {
    $("#" + a).attr("checked", "checked")
}
function checkOldIEmessageCookie() {
    var a = getCookie("oldIEmessage");
    "" == a && (setCookie("oldIEmessage", "true", 14),
        showPopup("dialog-old-browsers"))
}
function setCookie(a, b, c, d) {
    var e = new Date
        , f = d || "/";
    e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3);
    var g = "expires=" + e.toUTCString();
    document.cookie = a + "=" + b + ";" + g + ";path=" + f
}
function getCookie(a) {
    for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        for (var e = c[d]; " " == e.charAt(0); )
            e = e.substring(1);
        if (0 == e.indexOf(b))
            return e.substring(b.length, e.length);
    }
    return ""
}
function remainToBottom(a) {
    var b = $("#" + a)
        , c = b.outerHeight()
        , d = $(window).height() - b.offset().top + $(window).scrollTop();
    return c - d
}
var tgs = ["div", "span", "td", "tr"]
    , szs = ["small", "medium", "large"]
    , startSz = 0
    , BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser",
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version",
            this.OS = this.searchString(this.dataOS) || "an unknown OS"
    },
    searchString: function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b].string
                , d = a[b].prop;
            if (this.versionSearchString = a[b].versionSearch || a[b].identity,
                    c) {
                if (-1 != c.indexOf(a[b].subString))
                    return a[b].identity
            } else if (d)
                return a[b].identity
        }
    },
    searchVersion: function(a) {
        var b = a.indexOf(this.versionSearchString);
        if (-1 != b)
            return parseFloat(a.substring(b + this.versionSearchString.length + 1))
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari"
    }, {
        prop: window.opera,
        identity: "Opera"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }],
    dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }]
};
BrowserDetect.init();
var count_li_next = 2, count_li_prev = 0, count_li_selected = 0, count_new_li = 0, search_text_assigned = !1, search_list_find = !1, searchBox = "", searchBoxTop, searchBoxLeft, pairId = "", disappeardelay = 0, enableanchorlink = 0, hidemenu_onclick = 1, ie5 = document.all, ns6 = document.getElementById && !document.all, oldDropDownId = null, dropDownId = null, time_out_on = !1, time_out_off = !1, sub_menu = !1, t, bugReportTable = [], timeMessageSent = [], sendingEmail = [];
// File: functions/newSite_function.js
function FXSearch() {
    this.ObjVars = "",
        this.Element = {}
}
function _dropDown(a) {
    a = a || {},
        this.dropDownId = "",
        this.topBarBtn = "",
        this.badgeSelector = ".js-badge",
        this.badgeEl = null,
        this.css = "",
        this.funcName = "",
        this.dropDownStatus = !1,
        this.dropDownDelay = 0,
        this.dropDownAjax = !1,
        this.dropDownAjaxUrl = "/",
        this.dropDownAjaxAction = "",
        this.dropDownEffect = !0,
        this.dropDownShowEffectType = "fade",
        this.dropDownHideEffectType = "fade",
        this.dropDownEffectDuration = "fast",
        this.dropDownTimeOutHandle = "",
        this.dropDownShowTimeOut = 170,
        this.dropDownHideTimeOut = 170,
        this.dropDownTimeOutStatus = !1,
        this.onSuccessCallBackFunction = null,
        this.onRenderPopup = null,
        this.$dropdownContent = null,
        this.signInTranslate = a.signInTranslate || null,
        this.clearContent = function() {
            return this.$dropdownContent && (this.$dropdownContent.remove(),
                this.$dropdownContent = null),
                this
        }
        ,
        this.render = function() {
            var a = this;
            $("#" + this.dropDownId).stop(!0, !0),
                this.dropDownTimeOutStatus ? this.clear() : this.dropDownStatus || !this.dropDownAjax && !this.dropDownStatus ? this.dropDownHideTimeOut > 0 ? (this.dropDownTimeOutHandle = setTimeout(function() {
                    a.toggleDropDown()
                }, this.dropDownHideTimeOut),
                    this.dropDownTimeOutStatus = !0) : this.toggleDropDown() : this.dropDownAjax && !this.dropDownStatus && (this.clearBadge(),
                    this.dropDownHideTimeOut > 0 ? (this.dropDownTimeOutHandle = setTimeout(function() {
                        a.dropDownData()
                    }, this.dropDownShowTimeOut),
                        this.dropDownTimeOutStatus = !0) : this.dropDownData(),
                this.onRenderPopup && this.onRenderPopup())
        }
        ,
        this.clearBadge = function() {
            $("#" + this.topBarBtn).find(this.badgeSelector).removeClass("block").addClass("displayNone").text(0)
        }
        ,
        this.setBadgeCount = function(a, b) {
            var c = $("#" + this.topBarBtn).find(this.badgeSelector);
            c.addClass("block").removeClass("displayNone").text(b ? +c.text() + a : a)
        }
        ,
        this.clear = function() {
            clearTimeout(this.dropDownTimeOutHandle),
                this.dropDownTimeOutStatus = !1
        }
        ,
        this.dropDownData = function() {
            var a = this
                , b = $("#" + this.dropDownId).attr("load");
            $("#" + this.dropDownId).addClass(b),
                this.clearContent(),
                $.get(this.dropDownAjaxUrl, {
                    action: this.dropDownAjaxAction
                }, function(c, d) {
                    $("#" + a.dropDownId).removeClass(b);
                    var e = null;
                    try {
                        e = $.parseJSON(c)
                    } catch (f) {
                        e = null
                    }
                    "" !== c && null === e && (a.$dropdownContent = $(c),
                        a.$dropdownContent.hasClass("js-instead-popup") ? $("#" + a.dropDownId).addClass("displayNone").after(a.$dropdownContent) : $("#" + a.dropDownId).html(a.$dropdownContent)),
                    jQuery.isFunction(a.onSuccessCallBackFunction) && a.onSuccessCallBackFunction(c)
                }),
                a.toggleDropDown()
        }
        ,
        this.toggleDropDown = function() {
            var a = this.dropDownShowEffectType;
            switch ($("#" + this.dropDownId).stop(!0, !0),
            this.dropDownStatus && (a = this.dropDownHideEffectType),
            this.dropDownEffect || (a = "NA"),
                a) {
                case "slide":
                    $("#" + this.dropDownId).slideToggle(this.dropDownEffectDuration);
                    break;
                case "fade":
                    this.dropDownStatus ? $("#" + this.dropDownId).fadeOut(this.dropDownEffectDuration) : $("#" + this.dropDownId).fadeIn(this.dropDownEffectDuration);
                    break;
                default:
                    this.dropDownStatus ? $("#" + this.dropDownId).removeClass("block").addClass("displayNone") : $("#" + this.dropDownId).removeClass("displayNone").addClass("block")
            }
            this.dropDownTimeOutStatus && (this.dropDownTimeOutStatus = !1),
                this.dropDownStatus = !this.dropDownStatus
        }
}
function searchPopupResultsBlur(a) {
    switch ($("#" + a).addClass("displayNone").removeClass("displayBlock").html(""),
        a) {
        case "searchTopPopupResults":
            "searchDirectoryPopupResults" != document.searchCurrentId && -1 == document.searchCurrentId.indexOf("earchPortfolioResults") && (document.getElementById("searchTextTop").value = searchSelf.searchDeafaultVale);
            break;
        case "searchDirectoryPopupResults":
            "searchDirectoryPopupResults" == document.searchCurrentId && (document.getElementById("searchDirectoryText").value = "");
            break;
        default:
            var b = document.searchCurrentId.indexOf("_")
                , c = document.searchCurrentId.substr(b)
                , d = "searchText_portfolio" + c;
            document.getElementById(d).value = "",
                $("#selected_country_id" + document.searchCurrentId).html()
    }
}
function side_arrows(a, b) {
    var c = document.getElementById("prev_tab" + document.searchCurrentId).value
        , d = "";
    switch ("rtl" == $("#doc_direction" + document.searchCurrentId).html() && (a = "left" == a ? "" : "left"),
        c) {
        case "All":
            d = "search_box_Forex",
            "left" == a && (d = "");
            break;
        case "Forex":
            d = "search_box_Commodities",
            "left" == a && (d = "search_box_All");
            break;
        case "Commodities":
            d = "search_box_Indices",
            "left" == a && (d = "search_box_Forex");
            break;
        case "Indices":
            d = "search_box_Stocks",
            "left" == a && (d = "search_box_Commodities");
            break;
        case "Stocks":
            d = "search_box_ETFs",
            "left" == a && (d = "search_box_Indices");
            break;
        case "ETFs":
            d = "search_box_Bonds",
            "left" == a && (d = "search_box_Stocks");
            break;
        case "Bonds":
            d = "",
            "left" == a && (d = "search_box_ETFs");
            break;
        case "WorldCentralBanks":
            d = "";
            break;
        default:
            d = "search_box_Forex"
    }
    return d
}
function changeFindABrokerTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeFindABrokerTabContent(this)
            }),
                $(this).removeClass("selected")
        });
    var b = $(a).attr("brokerType")
        , c = $(a).attr("columnsNumber");
    $.get("/common/ajax_func.php", {
        action: "findAbroker",
        brokerType: b,
        columnsNumber: c
    }, function(a) {
        $("#findABroker_html").html(a)
    })
}
function changeSentimentsOutlookTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeSentimentsOutlookTabContent(this)
            }),
                $(this).removeClass("selected")
        });
    var b = $(a).attr("pairType")
        , c = $(a).attr("columnsNumber");
    $.get("/common/ajax_func.php", {
        action: "sentimentsOutlook",
        pairType: b,
        columnsNumber: c
    }, function(a) {
        $("#sentimentsOutlook_html").html(a)
    })
}
function changeTabContent(a) {
    $(a).addClass("selected").siblings().each(function() {
        $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"),
            $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"),
        $("#" + b + "_html").addClass("displayBlock")
}
function changeQuotesBoxTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeQuotesBoxTabContent(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_html").removeClass("displayBlock"),
                $("#" + a + "_html").addClass("displayNone")
        });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"),
        $("#" + b + "_html").addClass("displayBlock")
}
function changeSearchTabContent(a) {
    $(a).addClass("selected").siblings().each(function() {
        $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"),
            $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"),
        $("#" + b + "_html").addClass("displayBlock")
}
function changeRegionsTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeRegionsTabContent(this),
                    OnClickRegionsHandler(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_html").removeClass("displayBlock"),
                $("#" + a + "_html").addClass("displayNone")
        });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"),
        $("#" + b + "_html").addClass("displayBlock")
}
function changeRegionsIndicesTabContent(a, b) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeRegionsIndicesTabContent(this, b),
                    b ? b(this) : OnClickChartPerfHandler(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_html").removeClass("displayBlock"),
                $("#" + a + "_html").addClass("displayNone")
        });
    var c = $(a).attr("id");
    $("#" + c + "_html").removeClass("displayNone"),
        $("#" + c + "_html").addClass("displayBlock")
}
function changeSentimentTypesTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeSentimentTypesTabContent(this),
                    OnClickSentimentsTypesHandler(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_html").removeClass("displayBlock"),
                $("#" + a + "_html").addClass("displayNone")
        });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"),
        $("#" + b + "_html").addClass("displayBlock")
}
function changeQuotesPerfTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeQuotesPerfTabContent(this),
                    OnClickQuotesPerfHandler(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_html").removeClass("displayBlock"),
                $("#" + a + "_html").addClass("displayNone")
        });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"),
        $("#" + b + "_html").addClass("displayBlock")
}
function changeChartPerfTabContent(a, b) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeChartPerfTabContent(this, b),
                    b ? b(this) : OnClickChartPerfHandler(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_html").removeClass("displayBlock"),
                $("#" + a + "_html").addClass("displayNone")
        });
    var c = $(a).attr("id");
    $("#" + c + "_html").removeClass("displayNone"),
        $("#" + c + "_html").addClass("displayBlock")
}
function changeQuotesTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeQuotesTabContent(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_inner").removeClass("displayBlock"),
                $("#" + a + "_inner").addClass("displayNone")
        });
    var b = $(a).attr("id");
    $("#" + b + "_inner").removeClass("displayNone"),
        $("#" + b + "_inner").addClass("displayBlock");
    var c = [];
    $("#" + b + "_inner .LeftLiContainer").each(function() {
        var a = $(this)
            , b = a.attr("pair");
        a.find("span[class^='isOpenPair'],span[class*=' isOpenPair']").length > 0 && c.push("isOpenPair-" + b + ":");
        var d = a.find("span[class^='isOpenExch'],span[class*=' isOpenExch']");
        if (d.length > 0) {
            var e = /isOpenExch[\w]*-([\d]+)/.exec(d.attr("class"));
            "undefined" != typeof e[1] && c.push("isOpenExch-" + e[1] + ":")
        }
        c.push("pid-" + b + ":")
    }),
        $("#" + b + "_inner .LeftLiContainer").each(function() {
            if ($(this).is(".Selected")) {
                var a = $(this);
                pair_id = a.attr("pair"),
                    c_link = a.attr("chart_link"),
                    id2 = a.attr("id"),
                    title = $("#" + id2 + " td.first a").attr("title")
            }
        }),
        $("#quotes_img").attr({
            src: "/charts_xml/" + pair_id + "_300_292x120_new.png?time_chart=2",
            onclick: 'chart_link("' + c_link + '");',
            title: title
        }),
        $(window).trigger("socketNewData", [c]),
        $("#quotesBoxChartWrp").trigger("chartTabChanged")
}
function changeRecentQuotesTabContent(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                changeRecentQuotesTabContent(this)
            }),
                $(this).removeClass("selected");
            var a = $(this).attr("id");
            $("#" + a + "_inner").removeClass("displayBlock"),
                $("#" + a + "_inner").addClass("displayNone")
        });
    var b = $(a).attr("id");
    switch ($("#" + b + "_inner").removeClass("displayNone"),
        $("#" + b + "_inner").addClass("displayBlock"),
        b) {
        case "tab_1":
            $.get("/common/user_quotes_block/user_quotes_sblock_data.php", {
                action: "print_page",
                sid: sid
            }, function(a) {
                $("#tab_1_inner").html(a)
            });
            break;
        case "tab_2":
            $.get("/common/portfolio/portfolio.data.php", {
                action: "getPortfolioSideBox",
                uri: uri,
                sid: sid
            }, function(a) {
                $("#tab_2_inner").html(a)
            })
    }
}
function changeReportABugTabContent(a) {
    var b = $(a).attr("textId");
    changeMessageType(b, "toolsFooterTabReportABug_html")
}
function closeTabs(a) {
    $(a).each(function() {
        $(this).removeClass("reportABugSelected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"),
            $("#" + a + "_html").addClass("displayNone")
    })
}
function showEconomicCalendarSearchResult(a) {
    if ("" == a)
        return void closeEconomicCalendarSearchResult();
    $("#economicCalendarSearchPopupResults").html(a);
    var b = $("#economicCalendarSearchPopupResults .row:first-child").attr("id")
        , c = b.substr(b.indexOf("_") + 1);
    economicCalendarSearch.setRowNumber(c),
        economicCalendarSearch.markRow();
    var d = ($("#" + b + " .symbolName").html(),
        $("#" + b + " .symbolName").attr("id"));
    pairId = d.substr(d.indexOf("_") + 1),
        $("#economicCalendarSearchPopupResults .row").each(function() {
            $(this).hover(function() {
                var a = $(this).attr("id")
                    , b = a.substr(a.indexOf("_") + 1);
                economicCalendarSearch.setRowNumber(b),
                    economicCalendarSearch.markRow();
                var c = $("#" + a + " .symbolName").html()
                    , d = $("#" + a + " .symbolName").attr("id");
                pairId = d.substr(d.indexOf("_") + 1),
                    economicCalendarSearch.val(c),
                    economicCalendarSearch.unbind("blur")
            }, function() {
                searchTop.bind("blur", function() {
                    economicCalendarSearch.reset(),
                        economicCalendarSearch.closePopUp()
                })
            }).click(function() {
                searchEvent(),
                    closeEconomicCalendarSearchResult()
            })
        }),
        $("#economicCalendarSearchPopupResults").addClass("displayBlock").removeClass("displayNone")
}
function closeEconomicCalendarSearchResult() {
    $("#economicCalendarSearchPopupResults").addClass("displayNone").removeClass("displayBlock").html("")
}
function sideBoxChangeChart(a, b) {
    var c = $(a).attr("tabid")
        , d = ($(a).attr("subtabid"),
        $(a).attr("pairid"));
    $("#quotes_img_" + c).attr({
        src: "/charts_xml/" + d + "_300_292x120_new.png?time_chart=" + b
    })
}
function technicalStudiesTabs(a) {
    $(a).unbind("click"),
        $(a).addClass("selected").siblings().each(function() {
            $(this).is(".selected") && $(this).bind("click", function() {
                technicalStudiesTabs(this);
                var a = $(this).attr("pairID")
                    , b = $(this).attr("tabID")
                    , c = $(".JStechnicalStudiesTimeLine.selected").attr("id");
                technicalStudiesData(a, b, c)
            }),
                $(this).removeClass("selected")
        })
}
function technicalStudiesData(a, b, c) {
    $.get("/common/technical_studies/technical_studies_data.php", {
        action: "get_studies",
        pair_ID: a,
        tab_ID: b,
        time_frame: c
    }, function(a) {
        if (-1 != a) {
            var b = a.split("*;*");
            $("#quoteLink").html(b[0].split("=")[1]),
                $("#quoteLink").attr("href", b[21].split("uote_link=")[1]),
                $("#lastValue").html(b[1].split("=")[1]),
                $("#lastValue").removeClass("greenFont"),
                $("#lastValue").removeClass("redFont"),
                $("#lastValue").addClass(b[2].split("=")[1]),
                $("#updateTime").html(b[4].split("=")[1]),
                $("#tiBuy").html(b[5].split("=")[1]),
                $("#tiSell").html(b[6].split("=")[1]),
                $("#maBuy").html(b[7].split("=")[1]),
                $("#maSell").html(b[8].split("=")[1]),
                $("#sentimentsBar").html(b[22].split("=>")[1]),
                $("#technicalSummary").removeClass("sell"),
                $("#technicalSummary").removeClass("buy"),
                $("#technicalSummary").removeClass("neutral"),
                $("#technicalSummary").addClass(b[3].split("=")[1]),
                $("#technicalSummary").html(b[9].split("=")[1]),
                $("#S1").html(b[10].split("=")[1]),
                $("#S2").html(b[11].split("=")[1]),
                $("#S3").html(b[12].split("=")[1]),
                $("#pivot").html(b[13].split("=")[1]),
                $("#R1").html(b[14].split("=")[1]),
                $("#R2").html(b[15].split("=")[1]),
                $("#R3").html(b[16].split("=")[1]),
                $("#ppLink").attr("href", b[17].split(",")[1] + "#pivot_points_title_block"),
                $("#maLink").attr("href", b[17].split(",")[1] + "#moving_averages_title_block"),
                $("#tiLink").attr("href", b[17].split(",")[1] + "#technical_indicators_title_block"),
                $("#sentimentBullishPrcent").html(b[19].split("=")[1]),
                $("#sentimentBearishPercent").html(b[20].split("=")[1]),
                $(".JStechnicalStudiesTimeLine").attr("pairID", b[26].split("=")[1]);
            var c = b[27];
            "" != c && ($("#technicalstudiesSubTabs").html(b[27].split("=>")[1]),
                $("#techStudiesPairsListTabsSubMenu li")._tabs(technicalStudiesTimeLine))
        }
    })
}
function link_submit_form(a, b, c) {
    document.forms[a].elements[b].value = c,
        document.forms[a].submit()
}
function changeMessageType(a, b, c) {
    switch ("" != bugReportTable[b] && void 0 != bugReportTable[b] || (bugReportTable[b] = $("#" + b + " #reportABugWrapper").html()),
        $("#" + b + " #msgType").val(a),
        $("#" + b + " #comment_text").removeClass("input_error"),
        $("#" + b + " #reportABugBug").removeClass("reportABugSelected"),
        $("#" + b + " #reportABugPraise").removeClass("reportABugSelected"),
        $("#" + b + " #reportABugQuestion").removeClass("reportABugSelected"),
        $("#" + b + " #reportABugIdea").removeClass("reportABugSelected"),
        a) {
        case 10:
            $("#" + b + " #comment_text").val(c.bugText),
                $("#" + b + " #reportABugBug").addClass("reportABugSelected");
            break;
        case 11:
            $("#" + b + " #comment_text").val(c.praiseText),
                $("#" + b + " #reportABugPraise").addClass("reportABugSelected");
            break;
        case 12:
            $("#" + b + " #comment_text").val(c.questionText),
                $("#" + b + " #reportABugQuestion").addClass("reportABugSelected");
            break;
        case 13:
            $("#" + b + " #comment_text").val(c.ideaText),
                $("#" + b + " #reportABugIdea").addClass("reportABugSelected")
    }
}
function QuotesBlockChangeInnerTab(a) {
    var b = $(a).attr("pair")
        , c = $(a).attr("chart_link")
        , d = $(a).attr("id")
        , e = $("#" + d + " td.first a").attr("title");
    $(a).addClass("Selected").unbind("mouseover").siblings().each(function() {
        $(this).removeClass("Selected").unbind("mouseover").mouseover(function() {
            QuotesBlockChangeInnerTab(this)
        })
    }),
        $("#quotes_img").attr({
            src: "/charts_xml/" + b + "_300_292x120_new.png?time_chart=2",
            onclick: 'chart_link("' + c + '");',
            title: e
        })
}
function close_notification() {
    $("#note_container").fadeOut("fast")
}
function setEcUserRegCookies() {
    $.ajax({
        url: "/economic-calendar/closeBox",
        method: "POST",
        cache: !1
    }).done(function(a) {})
}
function clickEventAddComment() {
    setEcUserRegCookies(),
        close_notification()
}
function scroll_up_disclaimer() {
    $("html, body").animate({
        scrollTop: "-=108"
    })
}
function scroll_up_comments() {
    $("html, body").animate({
        scrollTop: "-=35"
    })
}
function changeFilterType(a, b) {
    if ("currencyExplorer" == b)
        return changeCurrency(a);
    if (smlID = $(a).attr("id").substr($(a).attr("id").indexOf("_") + 1),
            $(a).addClass("selected").siblings().each(function() {
                $(this).removeClass("selected")
            }),
            $(a).unbind("click").siblings().each(function() {
                $(this).unbind("click"),
                    $(this).bind({
                        click: function() {
                            changeFilterType(this, b)
                        }
                    })
            }),
            $(window).trigger("multiFilter-ChangeFilterTypeAction", [a, smlID, b]),
        "bond" == b)
        changeBondsSelectFilter("all"),
            $.get("/common/ajax_func.php", {
                action: "bondsFilter",
                newSml: smlID,
                maturity_from: $("#newFilter #filter_maturity_from").val(),
                maturity_to: $("#newFilter #filter_maturity_to").val(),
                continentID: $(a).attr("continentid")
            }, function(a) {
                $("#directoryFilter").html(a),
                    changeBondsSelectFilter("all")
            });
    else if ("bond indicesbonds" == b)
        changeBondsSelectFilter("all"),
            $.get("/common/ajax_func.php", {
                action: "indicesbondsFilter",
                newSml: smlID,
                continentID: $(a).attr("continentid")
            }, function(a) {
                $("#directoryFilter").html(a),
                    changeBondsSelectFilter("all")
            });
    else if ("etf" == b) {
        var c = $(a).attr("continentid");
        $.get("/common/ajax_func.php", {
            action: "etfsFilter",
            newSml: smlID,
            continent_id: c
        }, function(a) {
            $("#directoryFilter").html(a)
        })
    } else if ("central-bank" == b) {
        var c = $(a).attr("continentid");
        $.get("/common/ajax_func.php", {
            action: "worldCentralBankFilter",
            newSml: smlID,
            continent_id: c
        }, function(a) {
            $("#directoryFilter").html(a)
        })
    } else
        "indice" == b ? (setFilter(),
            $.get("/common/ajax_func.php", {
                action: "indicesFilter",
                newSml: smlID,
                majorIndices: $("#newFilter #filter_majorIndices").val(),
                additionalIndices: $("#newFilter #filter_additionalIndices").val(),
                primarySectors: $("#newFilter #filter_primarySectors").val(),
                otherIndices: $("#newFilter #filter_otherIndices").val()
            }, function(a) {
                $("#directoryFilter").html(a),
                    setFilter()
            })) : "global" == b && (setFilter(),
            $.get("/common/ajax_func.php", {
                action: "globalIndicesFilter",
                newSml: smlID,
                majorIndices: $("#newFilter #filter_majorIndices").val(),
                additionalIndices: $("#newFilter #filter_additionalIndices").val(),
                primarySectors: $("#newFilter #filter_primarySectors").val(),
                otherIndices: $("#newFilter #filter_otherIndices").val(),
                bonds: $("#newFilter #filter_bonds").val(),
                commodities: $("#newFilter #filter_commodities").val()
            }, function(a) {
                $("#directoryFilter").html(a),
                    setFilter()
            }))
}
function changeCurrency(a) {
    var b = $("#filterBoxExpTabsTop LI.selected").attr("region");
    if (!a.hasClass("selected")) {
        var c = $("A.selected");
        c.removeClass("selected");
        var d = a.attr("continentid");
        a.addClass("selected");
        var d = a.attr("continentid");
        $("#directoryFilter").html('<img src="/images/fx_loading.gif">'),
            $.get("/currencies/Service/currency", {
                region_ID: b,
                currency_ID: d
            }, function(a) {
                $("#directoryFilter").empty(),
                    $("#directoryFilter").html(a).fadeIn()
            })
    }
}
function search_world_etfs() {
    var a = $("#country").val() + "?"
        , b = $("#asset_filter").val();
    b && 0 != b && (a += "&asset=" + b);
    var c = $("#issuer_filter :selected").val();
    c && "0" != c && (a += "&issuer_filter=" + c);
    var d = $("#etf_filter :selected").val();
    d && "0" != d && (a += "&filter=" + d),
        a = a.replace("?&", "?"),
    "?" == a.slice(-1) && (a = a.replace("?", "")),
        window.location = a
}
function search_world_central_banks() {
    window.location = $("#country").val()
}
function selectOptionByPreviousValue(a, b, c) {
    var d = $(a)
        , e = d.find("option[" + b + '="' + c + '"]').index();
    return $(a)[0].selectedIndex = Math.max(0, e),
        Math.max(0, e)
}
function changeEtfIssuerDropdowns() {
    var a = $("#filterBoxTable A.selected").attr("continentid")
        , b = $("#country").find("option:selected").attr("country_id")
        , c = $("#issuer_filter>:selected").attr("value")
        , d = $("#asset_filter>:selected").attr("value");
    if (0 != $("#etf_filter").length)
        var e = $("#etf_filter")[0].selectedIndex
            , f = $("#etf_filter option:eq(" + e + ")").attr("value");
    else
        var f = !1;
    var g = {
        action: "etAssetTypefsFilter",
        continent_id: a,
        country_id: b,
        issuer: c,
        asset: d,
        underLying: f
    };
    $.getJSON("/common/ajax_func.php", g, function(a) {
        var b = $("#asset_filter>:selected").attr("value");
        $("#etf_asset>select").replaceWith(a.assets),
            selectOptionByPreviousValue("#asset_filter", "value", b);
        var c = $("#issuer_filter>:selected").attr("value");
        $("#issuer_filter").replaceWith(a.issuers),
            selectOptionByPreviousValue("#issuer_filter", "value", c);
        var d = $("#country>:selected").attr("country_id");
        $("#country").replaceWith(a.countries),
            selectOptionByPreviousValue("#country", "country_id", d),
            a.underlying ? $("#hide").html(a.underlying).fadeIn() : $("#hide").html(a.underlying).hide()
    })
}
function changeFormActionWC(a) {
    if (-1 == a.indexOf("c_id"))
        $("#commodities_fs").show();
    else {
        if ("checked" == $("input#commodities").attr("checked")) {
            var b = countFilters();
            1 == b && $("input#majorIndices").attr("checked", "checked")
        }
        $("input#commodities").removeAttr("checked"),
            $("#commodities_fs").hide()
    }
    $("#newFilter").attr("action", a)
}
function changeFormAction(a) {
    $("#newFilter").attr("action", a)
}
function changeSelected(a) {
    0 == $(".checkBox:checked").length && $(a).attr("checked", "checked"),
        setFilter()
}
function changeBondsSelectFilter(a) {
    $("#newFilter").empty(),
    "all" != a && (maturity_from_val = parseInt($("#maturity_from option:selected").val()),
        maturity_to_val = parseInt($("#maturity_to option:selected").val()),
        "from" == a ? maturity_from_val > maturity_to_val && $("#maturity_to option[value='" + maturity_from_val + "']").attr("selected", "selected") : "to" == a && maturity_to_val < maturity_from_val && $("#maturity_from option[value='" + maturity_to_val + "']").attr("selected", "selected")),
        $("#newFilter").append('<input name="maturity_from" value="' + $("#maturity_from option:selected").val() + '" type="hidden" id="filter_maturity_from">'),
        $("#newFilter").append('<input name="maturity_to" value="' + $("#maturity_to option:selected").val() + '" type="hidden" id="filter_maturity_to">')
}
function updateIndiceBondsMaturities(a, b) {
    "" == a && 0 > a && (a = 0),
    "" == b && 0 > b && (b = 0),
        $.get("/common/ajax_func.php", {
            action: "updateIndiceBondsMaturities",
            country_ID: a,
            continentID: b
        }, function(a) {
            $("#maturityContainer").html(a)
        })
}
function countFilters() {
    var a = 0;
    return $(".checkBox:checked").each(function(b, c) {
        a++
    }),
        a
}
function setFilter() {
    var a = 0;
    return $("#newFilter").empty(),
        $(".checkBox:checked").each(function(b, c) {
            $("#newFilter").append('<input name="' + $(c).attr("id") + '" value="on" type="hidden" id="filter_' + $(c).attr("id") + '">'),
                a += parseInt($(c).attr("checkValue"))
        }),
        a
}
function setCountry() {
    var a = $("#newFilter").attr("action");
    if (-1 != a.indexOf("?")) {
        var b = a.split("?")
            , c = b[1].split("=");
        "c_id" == c[0] ? $("#newFilter").append('<input id="c_id" name="c_id" value="' + c[1] + '" type="hidden">') : "r_id" == c[0] && $("#newFilter").append('<input id="r_id" name="r_id" value="' + c[1] + '" type="hidden">'),
            $("#newFilter").attr("action", b[0])
    }
}
function sendForm() {
    var a = $("#newFilter").attr("action");
    if (-1 == a.indexOf("?")) {
        if (counter = setFilter(),
            3 == counter)
            return void (location.href = $("#newFilter").attr("action"));
        setCountry(),
            $("#newFilter").submit()
    } else
        setFilter(),
            setCountry(),
            $("#newFilter").submit()
}
function sendBondsForm() {
    changeBondsSelectFilter("all"),
        $("#newFilter").submit()
}
function sendBondsAsIndiceForm() {
    changeBondsSelectFilter("all"),
        getIndicesBonds()
}
function getIndicesBonds() {
    var a = $(".toggled");
    a.removeClass("toggled"),
        execPricePerfTechButton(a, "indices", "cross_rates_container", "IndicesBonds", null)
}
function OnClickSentimentsTypesHandler(a) {
    var b = a.id;
    b = b.substr(11),
        changeSentimentsTypesTabsContent(b, window.tradersPageType || "top_members")
}
function changeSentimentsTypesTabsContent(a, b) {
    $.get("/common/ajax_func.php", {
        action: "getSentimentsTypes",
        pair_type: a,
        page_name: b
    }, function(a) {
        $("#LeaderBoardsTableContainer").html(a)
    })
}
function getSentimentsTypesMoreResult(a, b, c, d) {
    $("#loading_img").fadeToggle(),
        $(".showMoreCommentsLoading").fadeToggle(),
        $(".paginationGetMoreCenter").fadeToggle(),
        numOfPages = parseInt(d) / 10,
        $.get("/common/ajax_func.php", {
            action: "getSentimentsTypes",
            pair_type: a,
            page_name: c,
            page: b,
            moreResult: !0
        }, function(e) {
            "" == e ? $("#paginationGetMore").hide() : (setTimeout(function() {
                $(".showMoreCommentsLoading").fadeToggle(),
                    $("#LeaderBoardsTableContainer table tbody").append(e)
            }, 500),
                b = parseInt(b) + 1,
                b >= numOfPages ? $("#paginationGetMore").hide() : $("#paginationGetMore a").attr("onclick", "getSentimentsTypesMoreResult('" + a + "'," + b + ",'" + c + "','" + d + "')"))
        })
}
function hit_news_item(a, b, c) {
    $.ajax({
        url: "/news/Service/ExtContent",
        type: "get",
        data: {
            item: a,
            contentType: b
        }
    }),
    c && (ga("allSitesTracker.set", "dimension47", c),
        ga("allSitesTracker.set", "metric15", "1"),
        ga("allSitesTracker.send", "pageview"))
}
document.pairId = 0,
    document.searchCurrentId = "",
    FXSearch.prototype = {
        rowNumber: 0,
        lastRowNumber: 1,
        searchText: "",
        allowdReset: !0,
        allowdClosePopUp: !0,
        allowdKeys: !1,
        allowdForm: !1,
        searchDeafaultVale: "",
        searchTimeOutRunning: !1,
        arrowfocus: "",
        all_searchText: "",
        current_tab: "All",
        cameFromSwitch: !1,
        getRowsNumber: function() {
            return $(".searchPopupResults .row").length
        },
        setRowNumber: function(a) {
            searchSelf.allowdForm = !0,
                this.lastRowNumber = searchSelf.rowNumber,
                searchSelf.rowNumber = a
        },
        selectedRow: function() {
            return $("#searchRowId_" + searchSelf.rowNumber + "_" + searchSelf.current_tab)
        },
        allowdForm: function() {
            return searchSelf.allowdForm
        },
        lastSelectedRow: function() {
            return $("#searchRowId_" + searchSelf.lastRowNumber + "_" + searchSelf.current_tab)
        },
        clear: function(a) {
            "" == searchSelf.searchDeafaultVale && (searchSelf.searchDeafaultVale = $(a).val()),
            searchSelf.searchDeafaultVale == $(a).val() && (document.getElementById(this.Element.searchTextId).value = "",
                searchSelf.allowdReset = !0,
                searchSelf.allowdKeys = !1,
                searchSelf.allowdForm = !1,
                searchSelf.rowNumber = searchSelf.defaultRowNumber)
        },
        reset: function(a) {
            searchSelf.allowdReset && $(a).val(searchSelf.searchDeafaultVale)
        },
        closePopUp: function() {
            searchSelf.allowdClosePopUp && searchSelf.closeSearchResult.call(this)
        },
        updateAddToPortfolio: function(a) {
            "Portfolio" == a.Element.searchType && (selectedRow = searchSelf.selectedRow(),
                pid = $("td:first", selectedRow).attr("pairid"),
                document.pairId = pid,
                $("#" + a.Element.formElementId).attr("onsubmit", "addToPortfolio(" + pid + "," + a.Element.portfolioId + "); return false;"))
        },
        keyUpDown: function(a, b) {
            searchSelf.allowdForm = !0,
                searchSelf.lastRowNumber = searchSelf.rowNumber;
            var c = !1
                , d = $("#total_results" + document.searchCurrentId).html();
            searchSelf.searchText;
            if (40 == a.keyCode)
                "undefined" == typeof searchSelf.rowNumber && (searchSelf.rowNumber = 0),
                    searchSelf.rowNumber++,
                isNaN(searchSelf.rowNumber) && (searchSelf.arrowfocus = "tabs"),
                    searchSelf.rowNumber > 7 ? document.getElementById("top_search_box_div" + document.searchCurrentId + "_" + searchSelf.current_tab).scrollTop += 22 : $("#top_search_box_div" + document.searchCurrentId + "_" + searchSelf.current_tab).scrollTop(0);
            else if (38 == a.keyCode)
                searchSelf.rowNumber--,
                (0 == searchSelf.rowNumber || isNaN(searchSelf.rowNumber)) && ($("#" + this.Element.formElementId).attr("onsubmit", "return false;"),
                    searchSelf.arrowfocus = "text",
                    c = !0,
                    $("#" + this.Element.searchTextId).focus(),
                    $("#" + this.Element.searchTextId).val(searchSelf.searchText),
                    searchSelf.allowdKeys = !0),
                d - searchSelf.rowNumber > 7 && (document.getElementById("top_search_box_div" + document.searchCurrentId + "_" + searchSelf.current_tab).scrollTop -= 22);
            else if (39 == a.keyCode && "tabs" == searchSelf.arrowfocus && "searchDirectoryPopupResults" != document.searchCurrentId) {
                $("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;");
                var e = side_arrows("right", searchSelf.current_tab);
                searchSelf.OnClickSearchBoxTab.call(this, e)
            } else if (37 == a.keyCode && "tabs" == searchSelf.arrowfocus && "searchDirectoryPopupResults" != document.searchCurrentId) {
                $("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;");
                var e = side_arrows("left", searchSelf.current_tab);
                searchSelf.OnClickSearchBoxTab.call(this, e)
            }
            return 0 == $("#searchRowId_" + searchSelf.rowNumber + "_" + searchSelf.current_tab).length ? c ? (searchSelf.rowNumber = 0,
                void $(".searchPopupResults .row").removeClass("hoverSearch")) : void (searchSelf.rowNumber = searchSelf.lastRowNumber) : (searchSelf.markRow.call(this, this),
                void searchSelf.updateAddToPortfolio(this))
        },
        markRow: function(a) {
            $(".searchPopupResults .row").removeClass("hoverSearch"),
                $("#" + a.Element.searchPopupResultsId + " #searchRowId_" + searchSelf.rowNumber + "_" + searchSelf.current_tab).addClass("hoverSearch")
        },
        autoComplite: function(a, b) {
            38 != a.keyCode && 40 != a.keyCode && 37 != a.keyCode && 39 != a.keyCode && (searchSelf.searchText = $(b).val()),
                searchSelf.searchText.length > 0 && (38 == a.keyCode || 40 == a.keyCode || 37 == a.keyCode || 39 == a.keyCode) && searchSelf.allowdKeys ? searchSelf.keyUpDown.call(this, a) : 0 == searchSelf.searchText.length ? (searchSelf.closePopUp.call(this),
                    searchSelf.allowdReset = !0,
                    searchSelf.rowNumber = searchSelf.defaultRowNumber) : 13 != a.keyCode && searchSelf.searchText.length >= this.Element.minimumChar && !searchSelf.searchTimeOutRunning && (searchSelf.allowdReset = !1,
                    searchSelf.executeAutoCompleteTimeout.call(this))
        },
        executeAutoCompleteTimeout: function() {
            var a = this;
            searchSelf.searchTimeOutRunning || (searchSelf.searchTimeOutRunning = !0,
                a.timer = setTimeout(function() {
                    searchSelf.executeAutoComplete.call(a)
                }, 500))
        },
        executeAutoComplete: function() {
            searchSelf.allowdForm = !1;
            var a = this
                , b = $("#prev_tab" + document.searchCurrentId).val()
                , c = $("#selected_country_id" + document.searchCurrentId).html();
            "" == c && (c = 0),
                $.get(this.Element.url, {
                    action: "get_auto_complete",
                    search_text: searchSelf.searchText,
                    current_tab_id: b,
                    country_id: c,
                    parameter: this.Element.parameter,
                    userType: this.Element.userType,
                    userSupportedType: this.Element.userSupportedType,
                    search_id: document.searchCurrentId
                }, function(b) {
                    searchSelf.allowdKeys = !1,
                        searchSelf.allowdForm = !1,
                    "" != b && (searchSelf.allowdKeys = !0,
                        searchSelf.arrowfocus = "text"),
                        searchSelf.showSearchResult.call(a, b)
                }),
                $("#selected_country_id" + document.searchCurrentId).html(c),
            "" == searchSelf.all_searchText && (searchSelf.all_searchText = searchSelf.searchText),
                "All" != searchSelf.current_tab ? searchSelf.all_searchText = "" : searchSelf.all_searchText = searchSelf.searchText;
            var d = "li#search_box_" + b;
            changeSearchTabContent(d),
                searchSelf.searchTimeOutRunning = !1
        },
        searchBehavior: function(a, b, c, d) {
            "Portfolio" == this.Element.searchType && (document.pairId = $("td:first", b).attr("pairid")),
                a = a.replace(/<\/\i>/g, ""),
                a = a.replace(/<i class="bold">/g, ""),
                a = a.replace(/<\/\I>/g, ""),
                a = a.replace(/<I class=bold>/g, ""),
                a = a.replace(/<\/\i>/g, ""),
                a = a.replace(/<\/\i>/g, ""),
            1 != d && $(c).val(a),
            "Portfolio" != this.Element.searchType && $("#" + this.Element.formElementId).attr("action", $("#" + b.attr("id") + " .symbolName").attr("link"))
        },
        searchBinder: function(a) {
            var b, c = this;
            searchSelf.searchDeafaultVale = $("#searchTextTop").val(),
                a.bind("focus", function() {
                    searchSelf.clear.call(c, a),
                        $("#searchDirectoryPopupResults").addClass("displayNone").removeClass("displayBlock").html(""),
                        document.searchCurrentId = c.Element.searchPopupResultsId
                }),
                a.bind("click", function() {
                    searchSelf.arrowfocus = "text",
                        searchSelf.rowNumber = "0",
                        $(".searchPopupResults .row").removeClass("hoverSearch")
                }),
                a.bind("keyup", function(d) {
                    38 != d.keyCode && 40 != d.keyCode && "searchDirectoryPopupResults" != document.searchCurrentId && $("#" + c.Element.formElementId).attr("onsubmit", "return false;"),
                        searchSelf.autoComplite.call(c, d, a),
                        selectedRow = searchSelf.selectedRow();
                    var e = $("#total_results" + document.searchCurrentId).html();
                    0 != e && "" != e || 40 != d.keyCode || (searchSelf.arrowfocus = "tabs"),
                    selectedRow.length > 0 && (38 == d.keyCode || 40 == d.keyCode) && (40 == d.keyCode && ($("#" + c.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;"),
                        searchSelf.arrowfocus = "tabs"),
                        b = $("#" + selectedRow.attr("id") + " .symbolName").html(),
                        searchSelf.searchBehavior.call(c, b, selectedRow, a),
                        searchSelf.updateAddToPortfolio(c))
                })
        },
        get_top_search_results_by_country: function(a) {
            var b = this
                , c = a.split("_")
                , d = c[1]
                , e = $("#prev_tab" + document.searchCurrentId).val();
            $("#selected_country_id" + document.searchCurrentId).html(d),
                $.get("/common/search/search_ajax.php", {
                    action: "get_auto_complete",
                    current_tab_id: e,
                    tab_switch: "true",
                    search_text: searchSelf.searchText,
                    country_id: d,
                    search_id: document.searchCurrentId
                }, function(a) {
                    "tabs" != searchSelf.arrowfocus && (searchSelf.arrowfocus = "text"),
                        searchSelf.showSearchResult.call(b, a)
                }),
            "All" != searchSelf.current_tab && (searchSelf.all_searchText = ""),
                $("#" + b.Element.searchPopupResultsId + " #countries_wrapper").removeClass("displayBlock"),
                $("#" + b.Element.searchPopupResultsId + " #countries_wrapper").addClass("displayNone"),
                $("#" + b.Element.searchTextId).focus(),
                setTimeout(function() {
                    $("#" + b.Element.searchTextId).val(searchSelf.searchText),
                        searchSelf.allowdKeys = !0
                }, 1)
        },
        OnClickSearchBoxTab: function(a) {
            var b = this
                , a = a.replace("search_box_", "");
            if ("" != a) {
                var c = ""
                    , d = $("#selected_country_id" + document.searchCurrentId).html();
                if ("" == d && (d = 0),
                    "Countries" != a) {
                    searchSelf.rowNumber = 1;
                    var e = searchSelf.current_tab;
                    if (searchSelf.current_tab = a,
                            $("#" + b.Element.searchPopupResultsId + " #countries_wrapper").removeClass("displayBlock"),
                            $("#" + b.Element.searchPopupResultsId + " #countries_wrapper").addClass("displayNone"),
                        searchSelf.all_searchText == searchSelf.searchText && "" != searchSelf.all_searchText && "searchDirectoryPopupResults" != document.searchCurrentId) {
                        a != e && ($("#top_search_box_div" + document.searchCurrentId + "_" + a).removeClass("displayNone"),
                            $("#top_search_box_div" + document.searchCurrentId + "_" + e).addClass("displayNone"));
                        var f = "li#search_box_" + a;
                        changeSearchTabContent(f);
                        var g = ""
                            , h = 0
                            , i = !1;
                        if ($("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;"),
                            "tabs" != searchSelf.arrowfocus && ($("#" + this.Element.formElementId).attr("onsubmit", "return false;"),
                                searchSelf.arrowfocus = "text"),
                                $(".selectedRowExactMatch").each(function(b, c) {
                                    var d = $(c).attr("id");
                                    d.indexOf(a) > 0 && (i = !0,
                                        g = d,
                                        searchSelf.arrowfocus = "tabs"),
                                        $(c).addClass("hoverSearch")
                                }),
                            "" == g) {
                            if (searchSelf.allowdForm = !1,
                                    $("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;"),
                                    g = $("#results_table" + document.searchCurrentId + "_" + a + " tr:first").attr("id"),
                                "undefined" == typeof g)
                                return;
                            "no_results" == g && $("#" + this.Element.formElementId).attr("onsubmit", "return false;")
                        }
                        $("#top_search_box_div" + document.searchCurrentId + "_" + a).scrollTop(0),
                            h = g.substr(g.indexOf("_") + 1),
                            h = h.substr(0, h.indexOf("_")),
                            searchSelf.setRowNumber(h),
                            searchSelf.markRow(b),
                        "Portfolio" != b.Element.searchType && $("#" + b.Element.formElementId).attr("action", $("#" + g + " .symbolName").attr("link")),
                            searchSelf.updateAddToPortfolio(b);
                        var j = 0;
                        $("#" + b.Element.searchPopupResultsId + " .row").each(function() {
                            var c = $(this).attr("id");
                            c.indexOf(a) > 0 && (j += 1),
                                $(this).mousemove(function() {
                                    $("#" + b.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;");
                                    var a = $(this).attr("id")
                                        , c = a.substr(a.indexOf("_") + 1);
                                    c = c.substr(0, c.indexOf("_")),
                                        searchSelf.setRowNumber.call(b, c),
                                        searchSelf.markRow.call(b, b),
                                        selectedRow = searchSelf.selectedRow();
                                    var d = $("#" + a + " .symbolName").html();
                                    searchSelf.searchBehavior.call(b, d, selectedRow, $("#" + b.Element.searchTextId), !0),
                                    "Portfolio" == b.Element.searchType && searchSelf.updateAddToPortfolio(b)
                                }).click(function() {
                                    "Portfolio" == b.Element.searchType ? addToPortfolio(document.pairId, b.Element.portfolioId) : $("#" + b.Element.formElementId).submit()
                                }).keyup(function(a) {
                                    a = ReplaceAll(a, "</i>", ""),
                                        a = ReplaceAll(a, '<i class="bold">', ""),
                                        a = ReplaceAll(a, "</I>", ""),
                                        a = ReplaceAll(a, "<I class=bold>", ""),
                                        $("#" + b.Element.searchTextId).val(a)
                                })
                        }),
                            searchSelf.cameFromSwitch = !0,
                            $("#total_results" + document.searchCurrentId).html(j)
                    } else
                        $.get("/common/search/search_ajax.php", {
                            action: "get_auto_complete",
                            current_tab_id: a,
                            tab_switch: "true",
                            search_text: searchSelf.searchText,
                            country_id: d,
                            search_id: document.searchCurrentId
                        }, function(a) {
                            "tabs" != searchSelf.arrowfocus && (searchSelf.arrowfocus = "text"),
                                searchSelf.showSearchResult.call(b, a)
                        });
                    "All" == a && (searchSelf.all_searchText = searchSelf.searchText),
                        $("#prev_tab" + document.searchCurrentId).val(a),
                        $("#" + b.Element.searchTextId).focus(),
                        setTimeout(function() {
                            $("#" + b.Element.searchTextId).val(searchSelf.searchText)
                        }, 1),
                        searchSelf.allowdKeys = !0,
                    j > 0 && (searchSelf.allowdForm = !0)
                } else if (c = $("#" + b.Element.searchPopupResultsId + " #countries_wrapper"),
                        $(c).hasClass("displayBlock"))
                    $(c).removeClass("displayBlock").addClass("displayNone");
                else {
                    var k = $("#prev_tab" + document.searchCurrentId).val();
                    $.get("/common/search/search_ajax.php", {
                        action: "get_auto_complete",
                        prev_tab: k,
                        current_tab_id: a,
                        tab_switch: "true",
                        search_text: searchSelf.searchText,
                        country_id: d,
                        search_id: document.searchCurrentId
                    }, function(a) {
                        $("#" + b.Element.searchPopupResultsId + " #countries_wrapper #countries_div").html(a),
                            $("#" + b.Element.searchPopupResultsId + " #countries_wrapper #countries_div tr").each(function() {
                                $(this).click(function() {
                                    searchSelf.get_top_search_results_by_country.call(b, this.id)
                                })
                            }),
                        "" != d && "0" != d && ($("#" + b.Element.searchPopupResultsId + " #countries_wrapper #countries_div #country_" + d).addClass("selected"),
                            $("#selected_country_id" + document.searchCurrentId).html(d)),
                            $("#" + b.Element.searchPopupResultsId + " #countries_wrapper").removeClass("displayNone"),
                            $("#" + b.Element.searchPopupResultsId + " #countries_wrapper").addClass("displayBlock"),
                            $("#prev_tab" + document.searchCurrentId).val(k)
                    })
                }
            }
        },
        showSearchResult: function(a) {
            if (searchSelf.allowdForm = !1,
                "" == a)
                return void searchSelf.closeSearchResult.call(this);
            $("#" + this.Element.searchPopupResultsId).html(a);
            var b = ""
                , c = 0;
            if ($("#" + this.Element.searchPopupResultsId + " .selectedRowExactMatch").length > 0)
                $("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;"),
                    b = $("#" + this.Element.searchPopupResultsId + " .selectedRowExactMatch").attr("id"),
                    searchSelf.arrowfocus = "tabs";
            else {
                if ($("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;"),
                        b = $("#" + this.Element.searchPopupResultsId + " tr:first").attr("id"),
                    "undefined" == typeof b)
                    return;
                "no_results" == b && $("#" + this.Element.formElementId).attr("onsubmit", "return false;")
            }
            c = b.substr(b.indexOf("_") + 1),
                c = c.substr(0, c.indexOf("_")),
                searchSelf.setRowNumber(c),
                searchSelf.markRow(this),
            "Portfolio" != this.Element.searchType && $("#" + this.Element.formElementId).attr("action", $("#" + b + " .symbolName").attr("link")),
                searchSelf.updateAddToPortfolio(this);
            var d = this;
            $("#searchBoxTabsTabsTop li").each(function() {
                $(this).click(function() {
                    searchSelf.OnClickSearchBoxTab.call(d, this.id)
                })
            }),
                $("#" + d.Element.searchPopupResultsId + " .row").each(function() {
                    $(this).mousemove(function() {
                        $("#" + d.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;");
                        var a = $(this).attr("id")
                            , b = a.substr(a.indexOf("_") + 1);
                        b = b.substr(0, b.indexOf("_")),
                            searchSelf.setRowNumber.call(d, b),
                            searchSelf.markRow.call(d, d),
                            selectedRow = searchSelf.selectedRow();
                        var c = $("#" + a + " .symbolName").html();
                        searchSelf.searchBehavior.call(d, c, selectedRow, $("#" + d.Element.searchTextId), !0),
                        "Portfolio" == d.Element.searchType && searchSelf.updateAddToPortfolio(d),
                            searchSelf.cameFromSwitch = !1
                    }).click(function() {
                        "Portfolio" == d.Element.searchType ? addToPortfolio(document.pairId, d.Element.portfolioId) : $("#" + d.Element.formElementId).submit()
                    }).keyup(function(a) {
                        a = ReplaceAll(a, "</i>", ""),
                            a = ReplaceAll(a, '<i class="bold">', ""),
                            a = ReplaceAll(a, "</I>", ""),
                            a = ReplaceAll(a, "<I class=bold>", ""),
                            $("#" + d.Element.searchTextId).val(a)
                    })
                }),
                $("#" + this.Element.searchPopupResultsId).addClass("displayBlock").removeClass("displayNone");
            $("#total_results" + document.searchCurrentId).html();
            $("#top_search_box_div" + document.searchCurrentId + "_" + searchSelf.current_tab).scrollTop(0),
                document.searchCurrentId = this.Element.searchPopupResultsId
        },
        closeSearchResult: function() {
            $("#" + this.Element.searchPopupResultsId).addClass("displayNone").removeClass("displayBlock").html("")
        }
    };
var searchSelf = FXSearch.prototype;
$.fn.extend({
    _tabs: function(a) {
        var b = {
            eventsArr: a.eventsArr
        };
        $(this).each(function() {
            for (eventObj in b.eventsArr)
                $(this).is(".selected") || $(this).bind(b.eventsArr[eventObj].eventType, function() {
                    b.eventsArr[eventObj].eventFunc(this)
                })
        })
    },
    _FXresizeImg: function(a, b) {
        return this.imageObject = a,
            this.aObject = b,
            this.status = !1,
            this.widht = this.imageObject.attr("width"),
            this.height = this.imageObject.attr("height"),
            this.imgToggle = function() {
                this.status ? (this.imageObject.attr("width", this.widht),
                    this.imageObject.attr("height", this.height),
                    this.imageObject.css("max-width", "452px"),
                    this.aObject.addClass("zoomIcon"),
                    this.aObject.removeClass("zoomoutIcon"),
                    $(this).removeAttr("style")) : (this.imageObject.removeAttr("width"),
                    this.imageObject.removeAttr("height"),
                    this.imageObject.css("max-width", "779px"),
                    this.aObject.removeClass("zoomIcon"),
                    this.aObject.addClass("zoomoutIcon"),
                    $(this).css("z-index", "10000"),
                    $(this).css("position", "relative")),
                    this.status = !this.status
            }
            ,
            this
    }
});
var technicalSummaryWidget = function(a, b, c, d) {
    var e = null
        , f = ""
        , g = function() {
        null !== e && (e.hasClass("selected") || (b.removeClass("selected"),
            e.addClass("selected")))
    }
        , h = function(a, b, c) {
        k("<span>Failed to retrieve data, Please try again or refresh the page.</span>")
    }
        , i = function() {
        d.removeClass("displayNone"),
            c.addClass("displayNone")
    }
        , j = function() {
        d.addClass("displayNone"),
            c.removeClass("displayNone")
    }
        , k = function(a) {
        c.html(a),
            j(),
            g(),
            window.components.TradeNow.ready()
    }
        , l = function() {
        var b = this.getAttribute("pairid")
            , c = this.getAttribute("data-period")
            , d = {
            pairID: b,
            period: c
        };
        f && (d.viewType = f),
            e = $(this),
            i(),
            $.ajax({
                url: a,
                type: "POST",
                datatype: "html",
                data: d,
                success: k,
                error: h
            })
    };
    (function() {
        a.length < 1 || c.length < 1 || d.length < 1 || b.length < 1 || (f = b.parent().data("view"),
            b.click(l))
    })()
}
    , _myAccountDropDown = new _dropDown;
_myAccountDropDown.dropDownId = "myAccountHeaderPop",
    _myAccountDropDown.dropDownEffect = !0;
var flagsDropDown = new _dropDown;
flagsDropDown.dropDownId = "TopFlagsContainer",
    flagsDropDown.dropDownEffect = !0;
var settingsDropDown = new _dropDown;
settingsDropDown.dropDownId = "settingsDropDown",
    settingsDropDown.dropDownEffect = !0;
var _infoBox = new _dropDown;
_infoBox.dropDownId = "infoBoxToolTipWrap",
    _infoBox.dropDownEffect = !0;
var searchBottom, searchQuotes, searchEconomicCalendar, searchDirectory, technicalStudiesTimeLine, action;
$(document).ready(function() {
    var a = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeFindABrokerTabContent(a)
            }
        })
    }
        , b = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeSentimentsOutlookTabContent(a)
            }
        })
    }
        , c = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeRegionsTabContent(a),
                    OnClickRegionsHandler(a)
            }
        })
    }
        , d = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeSentimentTypesTabContent(a),
                    OnClickSentimentsTypesHandler(a)
            }
        })
    }
        , e = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeQuotesPerfTabContent(a),
                    OnClickQuotesPerfHandler(a)
            }
        })
    }
        , f = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeChartPerfTabContent(a),
                    OnClickChartPerfHandler(a)
            }
        })
    }
        , g = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeRegionsIndicesTabContent(a),
                    OnClickIndicesHandler(a)
            }
        })
    }
        , h = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeQuotesBoxTabContent(a)
            }
        })
    }
        , i = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeQuotesTabContent(a)
            }
        })
    }
        , j = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeRecentQuotesTabContent(a)
            }
        })
    }
        , k = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                changeReportABugTabContent(a)
            }
        })
    };
    technicalStudiesTimeLine = {
        eventsArr: new Array({
            eventType: "click",
            eventFunc: function(a) {
                technicalStudiesTabs(a);
                var b = $(a).attr("pairID")
                    , c = $(a).attr("tabID")
                    , d = $(".JStechnicalStudiesTimeLine.selected").attr("id");
                technicalStudiesData(b, c, d)
            }
        })
    },
        window.storedSiteBlockQuotesBoxTabObject = i,
        $("#quotesBoxWithTabsTop li")._tabs(i),
        $("#recentQuotesBoxWithTabsTop li")._tabs(j),
        $("#findABrokerTabsTop li")._tabs(a),
        $("#sentimentsOutlookTabsTop li")._tabs(b),
        $("#toolsFooterContainerLinks div")._tabs(h),
        $("#reportABugMenu ul li")._tabs(k),
        $(".bug_report_div #bug_report_form #reportABugMenu ul li")._tabs(k),
        $("#techStudiesTabsTop li")._tabs(technicalStudiesTimeLine),
        $("#techStudiesPairsListTabsSubMenu li")._tabs(technicalStudiesTimeLine),
        $(".JStechnicalStudiesTimeLine")._tabs(technicalStudiesTimeLine),
        $("#topBrokersTabsTop li")._tabs(h),
        $("#regionsTabsTop li")._tabs(c),
        $("#regionsIndicesTabsTop li")._tabs(g),
        $("#sentimentsTypesTabsTop li")._tabs(d),
        $("#quotesPerfTabsTop li")._tabs(e),
        $("#chartPerfTabsTop li")._tabs(f),
        technicalSummaryWidget("/instruments/Service/GetTechincalData", $("#timePeriodsWidget li"), $("#techinalContent"), $("#loadingSpinner")),
        technicalSummaryWidget("/technical/Service/GetStudiesContent", $("#techSummaryPage li"), $("#techinalContent"), $("#loadingSpinner")),
        searchQuotes = new FXSearch,
        searchQuotes.Element = {
            searchType: "Quotes",
            searchTextId: "searchText_inside",
            formElementId: "insideSearchForm",
            searchPopupResultsId: "searchQuotesPopupResults",
            minimumChar: 1,
            url: "/common/search/search_ajax.php",
            parameter: ""
        },
        searchQuotes.searchBinder($("#searchText_inside")),
        searchEconomicCalendar = new FXSearch,
        searchEconomicCalendar.Element = {
            searchType: "EconomicCalendar",
            searchTextId: "economicCalendarsearchText",
            formElementId: "",
            searchPopupResultsId: "economicCalendarSearchPopupResults",
            minimumChar: 1,
            url: "/common/search/search_ajax.php",
            parameter: "economicCalendar"
        },
        searchEconomicCalendar.searchBinder($("#economicCalendarsearchText"))
}),
    $(document).click(function(a) {
        if ("" != document.searchCurrentId) {
            var b = !0;
            $(a.target).parents("div#searchTopPopupResults").length < 1 && $(a.target).parents("div#searchBoxTop").length < 1 ? searchPopupResultsBlur("searchTopPopupResults") : b = !1,
                $(a.target).parents("div#searchDirectoryPopupResults").length < 1 && $(a.target).parents("div#searchBoxDirectory").length < 1 ? searchPopupResultsBlur("searchDirectoryPopupResults") : b = !1,
                $('div[identifier="searchThing"]').each(function(c, d) {
                    var e = d.id;
                    if (-1 != e.indexOf("earchPortfolioResults")) {
                        var f = e.indexOf("_")
                            , g = e.substr(f);
                        if ($(a.target).parents("div#searchPortfolioResults" + g).length < 1) {
                            $("#" + e).html("");
                            var h = "searchText_portfolio" + g;
                            document.getElementById(h).value = "",
                                $("#" + e).removeClass("displayBlock"),
                                $("#" + e).addClass("displayNone")
                        } else
                            b = !1
                    }
                }),
            b && (searchSelf.searchTextId = searchSelf.searchDeafaultVale,
                $("#" + document.searchCurrentId).html(""),
                searchSelf.current_tab = "All",
                $("#selected_country_id" + document.searchCurrentId).html("0"),
                $("#prev_tab" + document.searchCurrentId).val(""),
                searchSelf.all_searchText = "")
        }
    });
var topBarPopup = new function() {
        function a(a) {
            h.find(".js-header").text(a.get("popupHeader")),
                h.find(".js-explain-text").text(a.get("notLoggedInText")),
                h.find(".js-icon").attr("class", "js-icon " + a.get("iconClasses"))
        }
        function b(b, c) {
            b.dropDownStatus = !b.dropDownStatus,
                b.dropDownStatus ? (h.removeClass("displayNone").removeAttr("style").addClass(b.signInTranslate.get("popupClasses")),
                    a(b.signInTranslate),
                    c.addClass("selected"),
                    l = b) : (h.addClass("displayNone").removeClass(b.signInTranslate.get("popupClasses")),
                    c.removeClass("selected"),
                    l = null)
        }
        function c(a, b) {
            a.dropDownStatus ? (b.removeClass("selected"),
                g.addClass("displayNone").removeAttr("style"),
                a.dropDownStatus = !1) : (f(),
                g.removeClass(g.data("lastClasses")).data("lastClasses", a.css).addClass(a.css).removeAttr("style").removeClass("displayNone"),
                b.addClass("selected"),
                a.render(),
                setTimeout(function() {
                    a.dropDownStatus && g.find(".newEvent").removeClass("newEvent")
                }, 5e3))
        }
        function d() {
            var a = $("#" + this.popup.topBarBtn);
            k = this.signUpGAEventParams || null,
                h.length ? b(this.popup, a) : c(this.popup, a)
        }
        function e(a, b, c, d, e, f, g) {
            a.dropDownId = j,
                a.dropDownEffect = !0,
                a.topBarBtn = b,
                a.css = c,
                a.funcName = d,
            e && (a.dropDownAjax = !0,
                a.dropDownAjaxUrl = e),
            f && (a.onSuccessCallBackFunction = f),
            g && (a.onRenderPopup = g),
                $("#" + a.topBarBtn).click(function() {
                    setTimeout(a.funcName, 1)
                })
        }
        function f() {
            $.each(i, function(a, b) {
                $("#" + j).empty().removeClass(b.css)
            })
        }
        var g, h, i, j = "topBarPopup", k = null, l = null;
        this.ecTopBarAlertRemoveYellow = function() {
            $("#" + j).find(".js-alert-item").not("[child-click-bound]").attr("child-click-bound", !0).click(function() {
                location.href = $(this).find("a").attr("href")
            }),
                components.FeedAlerts(),
                setTimeout(function() {
                    $("#" + j + " table tr").removeClass("newEvent"),
                        i.ecAlertDropDown.clearBadge()
                }, 3e3)
        }
            ,
            this.portfolioScrollHeight = function() {
                $("#portfolio").length > 0 && ($("#portfolio").get(0).scrollHeight > $("#portfolio").innerHeight() ? $("#portfolioTopBar").addClass("scrollable") : $("#portfolioTopBar").removeClass("scrollable"))
            }
            ,
            this.portfolioHandler = function(a) {
                var b = null;
                try {
                    b = $.parseJSON(a)
                } catch (c) {
                    b = null
                }
                null !== b && b.HTML && b.pids && ($("#" + j).html(b.HTML),
                b.pids.length > 0 && $(window).trigger("socketNewData", [b.pids])),
                    topBarPopup.portfolioScrollHeight()
            }
            ,
            this.openEcAlertDropDown = function() {
                var a = $("#" + j);
                i.ecAlertDropDown.dropDownStatus ? ($("#" + i.ecAlertDropDown.topBarBtn).removeClass("selected"),
                    a.addClass("displayNone").removeAttr("style"),
                    i.ecAlertDropDown.dropDownStatus = !1) : (f(),
                    a.removeClass(a.data("lastClasses")).data("lastClasses", i.ecAlertDropDown.css).addClass(i.ecAlertDropDown.css).removeClass("displayNone").removeAttr("style"),
                    i.ecAlertDropDown.render(),
                    $("#" + i.ecAlertDropDown.topBarBtn).addClass("selected"))
            }
            ,
            this.refresherCloseEcAlertDropDown = function() {
                i.ecAlertDropDown.dropDownStatus && (i.ecAlertDropDown.toggleDropDown(),
                    $("#" + i.ecAlertDropDown.topBarBtn).removeClass("selected"))
            }
            ,
            this.setAlertsCounter = function(a, b) {
                i.alertCenterDropDown.setBadgeCount(a, b)
            }
            ,
            this.resetAlertsCounter = function() {
                i.alertCenterDropDown.clearBadge()
            }
            ,
            this.openTopBarMarket = function() {
                var a = $("#" + j);
                i.marketsDropDown.dropDownStatus ? ($("#" + i.marketsDropDown.topBarBtn).removeClass("selected"),
                    a.addClass("displayNone").removeAttr("style"),
                    i.marketsDropDown.dropDownStatus = !1) : (f(),
                    a.removeClass(a.data("lastClasses")).data("lastClasses", i.marketsDropDown.css).addClass(i.marketsDropDown.css).removeClass("displayNone").removeAttr("style"),
                    i.marketsDropDown.render(),
                    ga("allSitesTracker.send", "event", "Top Bar Icons", "World Markets"),
                    $("#" + i.marketsDropDown.topBarBtn).addClass("selected"))
            }
            ,
            $(document).ready(function() {
                g = $("#" + j),
                    h = $(".js-top-bar-signin-popup"),
                    i = {
                        ecAlertDropDown: new _dropDown,
                        alertCenterDropDown: new _dropDown({
                            signInTranslate: new components.Translate("TopBarAlertsSignInPopup")
                        }),
                        marketsDropDown: new _dropDown,
                        portfolioDropDown: new _dropDown({
                            signInTranslate: new components.Translate("TopBarPortfolioSignInPopup")
                        })
                    },
                    e(i.portfolioDropDown, "portfolioTopBarBtn", "tooltipPopup topBarPortfolioBox bigArrowTopbar ", d.bind({
                        popup: i.portfolioDropDown
                    }), "/portfolio/getportfoliotopbar", this.portfolioHandler, function() {
                        ga("allSitesTracker.send", "event", "Top Bar Icons", "Portfolio")
                    }),
                    e(i.ecAlertDropDown, "topBarEcAlertBtn", "tooltipPopup topBarAlertBox bigArrowTopbar", this.openEcAlertDropDown, "/economic-calendar/topBarAlert", this.ecTopBarAlertRemoveYellow),
                    e(i.alertCenterDropDown, "topBarAlertCenterBtn", "tooltipPopup topBarAlertBox bigArrowTopbar", d.bind({
                        popup: i.alertCenterDropDown,
                        signUpGAEventParams: {
                            hitType: "event",
                            eventCategory: "Signup",
                            eventAction: "Sign Up Button",
                            eventLabel: "Top Bar - Recent Alerts"
                        }
                    }), "/members-admin/Service/getUserAlertsFeedForBellHistory", this.ecTopBarAlertRemoveYellow, function() {
                        ga("allSitesTracker.send", "event", "Top Bar Icons", "Recent Alerts")
                    }),
                    e(i.marketsDropDown, "topBarMarketBtn", "tooltipPopup topBarMarketsBox bigArrowTopbar", this.openTopBarMarket, "/markets/MarketsTopBarMenu"),
                    h.find("#signUPBtn").click(function() {
                        overlay.overlayRegister(),
                        window.ga && k && window.ga("allSitesTracker.send", k)
                    }),
                    $(document).bind("click", function(a) {
                        $(".js-popup-wrapper")._hide(),
                            $.each(i, function(b, c) {
                                var d = $("#" + c.topBarBtn);
                                if (!(d.is(a.target) || d.find(a.target).length || c === l && (h.is(a.target) || h.find(a.target).length)))
                                    if (c.dropDownStatus) {
                                        if ($("#" + c.dropDownId).find(a.target).length)
                                            return;
                                        c.funcName()
                                    } else
                                        d.removeClass("selected")
                            })
                    })
            }
                .bind(this))
    }
;
// File: functions/notification-bar.js
!function(a) {
    "use strict";
    function b(a) {
        return "earnings" === a ? "quotes" : a || "articles"
    }
    function c(a) {
        setCookie("breaking_news_" + (a || q), "true", 1 / 144)
    }
    function d(a) {
        return {
            title: a.title,
            link: a.titleHref,
            body: a.smallText,
            dir: siteData.htmlDirection.is("ltr") ? "ltr" : "rtl",
            icon: "https://ca33f332e2199349c49c-dc74b5af55c9b2a1bd8891aa9e8701fc.ssl.cf1.rackcdn.com/logos/logoBlack-192x192.png"
        }
    }
    function e(a) {
        for (var b, c = 5381, d = 0; d < a.length; d++)
            b = a.charCodeAt(d),
                c = (c << 5) + c + b;
        return "" + c
    }
    function f() {
        var a = g("activeTabs");
        return !Object.keys(a).length
    }
    function g(a, b) {
        var c;
        if (b)
            localStorage.setItem(a, JSON.stringify(b));
        else
            try {
                c = JSON.parse(localStorage.getItem(a) || "{}")
            } catch (d) {
                console.error("LS Error", d)
            }
        return c
    }
    function h(a) {
        var b, c = e(a.title + "@@@" + a.body), d = g("firedNotifications"), h = "utm_source=Desktop%20Notifications&utm_medium=referral";
        if (!d[c] && f()) {
            d[c] = !0,
                g("firedNotifications", d);
            var i = new Notification(a.title,a);
            a.link && (i.onclick = function() {
                    b = a.link + (a.link.has("?") ? "&" + h : "?" + h),
                        window.open(b)
                }
            ),
                setTimeout(function() {
                    var a = g("firedNotifications");
                    a[c] && delete a[c],
                        g("firedNotifications", a)
                }, 5e3),
                setTimeout(function() {
                    i.close()
                }, 18e5)
        }
    }
    function i(a) {
        var b = d(a);
        window.Notification && t && (Notification.permission.is("granted") ? h(b) : j(h.bind(null, b)))
    }
    function j(a) {
        window.Notification && !Notification.permission.is("denied") && Notification.requestPermission(function() {
            l(a) && Notification.permission.is("granted") && a(),
                k(Notification.permission)
        })
    }
    function k(a) {
        window.ga && "function" == typeof window.ga && (a.is("granted") && window.ga("allSitesTracker.send", "event", "Browser Notifications", "Permission", "Allow"),
        a.is("denied") && window.ga("allSitesTracker.send", "event", "Browser Notifications", "Permission", "Block"))
    }
    function l(a) {
        return "function" == typeof a
    }
    var m, n, o, p, q, r = !!(window.location.origin || "").match(/investing\.com/), s = !!(window.location.origin || "").match(/\.dev\.forexpros\.com/), t = r || s, u = a.notificationBar = {
        items: {}
    }, v = "", w = 0;
    loader([{
        type: "$",
        value: "#sideNotificationZone"
    }]).ready(function(a) {
        m = a,
            n = m.find(".js-notification-item").removeClass("displayNone"),
            m.children().remove(),
            v = (n.find(".js-title").attr("class") || "").replace("js-title", "").trim(),
            o = {
                $wrapper: $(".breakingNews")
            },
            o.$cont = o.$wrapper.find(".js-breaking-news-content"),
            o.$close = o.$wrapper.find(".js-close"),
            p = {
                $wrapper: $(".js-breaking-news-head-line")
            },
            p.$cont = p.$wrapper.find(".js-breaking-news-content"),
            p.$close = p.$wrapper.find(".js-breaking-news-head-line-close"),
            o.$cont.click(function() {
                o.$cont.data("href") && (o.$wrapper.removeClass("shown"),
                    c(),
                    ga("allSitesTracker.send", "event", "Breaking News", "Bottom Bar", o.$cont.text(), {
                        hitCallback: function() {
                            window.location = o.$cont.data("href")
                        }
                    }))
            }),
            o.$close.click(function() {
                o.$wrapper.removeClass("shown"),
                    c(),
                    ga("allSitesTracker.send", "event", "Breaking News", "Close News", "Close Bottom Bar")
            }),
            p.$cont.click(function() {
                p.$cont.data("href") && (p.$wrapper.addClass("close"),
                    c(p.$wrapper.data("hash")),
                    ga("allSitesTracker.send", "event", "Breaking News", "Top Bar", p.$cont.text(), {
                        hitCallback: function() {
                            window.location = p.$cont.data("href")
                        }
                    }))
            }),
            p.$close.click(function() {
                p.$wrapper.addClass("close"),
                    c(p.$wrapper.data("hash")),
                    ga("allSitesTracker.send", "event", "Breaking News", "Close News", "Close Top Bar")
            })
    }),
        u.addItem = function(a, c) {
            var d, e, f = "string" == typeof a, g = f && "<" === a[0], h = b(a.type);
            if (h.is("breaking_news"))
                return ga("allSitesTracker.set", "metric10", "1"),
                    ga("allSitesTracker.set", "dimension39", a.titleHref ? "Breaking News Bottom Bar - Clickable" : "Breaking News Bottom Bar"),
                    q = a.hash,
                    o.$cont.text(a.title).toggleClass("whiteLinkBigArrow pointer", !!a.titleHref).data("href", a.titleHref || ""),
                    o.$wrapper.addClass("shown"),
                    e = {
                        then: function(a) {
                            return d = a,
                                e
                        },
                        timeout: function(a) {
                            return setTimeout(function() {
                                o.$wrapper.removeClass("shown"),
                                "function" == typeof d && d()
                            }, a),
                                e
                        }
                    };
            var j = a.pre_reminder_time || a.hasReminder || !1;
            j = "none" === j ? !1 : !!j;
            var k, l, p = {
                type: h,
                title: f ? a : a.title,
                titleHref: a.titleHref || "#",
                smallText: a.smallText || "",
                isHtml: g || a.isHtml || !1,
                hasReminder: j
            }, r = c || w, s = $.noop, t = n.clone(), x = {
                getData: function() {
                    return p
                },
                then: function(a) {
                    return s = "function" == typeof a ? a : $.noop,
                        x
                },
                close: function(a) {
                    t.slideUp(500),
                        setTimeout(function() {
                            t.remove()
                        }, 500),
                        s(a),
                        delete u.items[r]
                },
                timeout: function(a) {
                    return setTimeout(function(a) {
                        a.close(!1)
                    }, a, x),
                        x
                },
                key: r
            };
            if (u.items[r] = x,
                    t.attr("data-item", r).addClass(r).addClass(p.type).appendTo(m),
                p.hasReminder && t.addClass("hasReminder"),
                    setTimeout(function() {
                        t.addClass("shown")
                    }, 10),
                    t.find(".js-icon").addClass(p.type + "AlertIcon"),
                    k = t.find(".js-close").click(function() {
                        x.close(!1)
                    }),
                    p.isHtml) {
                var y = l = $(p.title).addClass(v);
                t.find(".js-title").replaceWith(y)
            } else
                l = t.find(".js-title").html(p.title).attr("href", p.titleHref);
            return t.click(function(a) {
                k.is(a.target) || l.is(a.target) || (window.location.href = p.titleHref)
            }),
                t.find(".js-small-text").html(p.smallText),
                w++,
                i(p),
                x
        }
        ,
    t && (!function() {
        var a = parseInt(1e5 * Math.random())
            , b = function(b) {
            var c = g("activeTabs");
            b ? c[a] = !0 : c = {},
                g("activeTabs", c)
        };
        $(window).blur(function() {
            b(!1)
        }),
            $(window).focus(function() {
                b(!0)
            }),
            b(!0)
    }(),
        j())
}(window.components);
// File: functions/perfTechButtons.js
function execPricePerfTechButton(a, b, c, d, e, f) {
    if (!$(a).hasClass("toggled")) {
        if ("markets" == b)
            switch (d) {
                case "bonds":
                    return doBondsFilter(a);
                case "etfs":
                    return doETFsFilter("btn", a);
                case "stocks":
                    return doStocksFilter("btn", a);
                case "indices":
                    return doIndicesFilter("btn", a);
                case "futures":
                    return doFuturesFilter("btn", a);
                case "forex":
                    return doForexFilter("btn", a);
                default:
                    return
            }
        var g = $(a).attr("type") + d;
        $(a).addClass("toggled").siblings().each(function() {
            $(this).hasClass("toggled") && $(this).removeClass("toggled")
        }),
        $(a).attr("type").is("cspatterns") && ga("allSitesTracker.send", "event", "User Interaction Buttons", "Candlestick Patterns", "Candlestick Patterns Tab");
        var h = "";
        if ($("#filtersForm").length && (h = $("#filtersForm").serialize(),
            "checked" == $("#commoditiesCategory__broad_commodities").attr("checked") && (h += "&others=true")),
                $("#" + c).html($("#fx-loading-template").html()),
            "indices" == b && "IndicesBonds" == d) {
            var i = doIndicesBondsFilter();
            $.get("/" + b + "/Service/" + g, {
                params: i
            }, function(a) {
                $("#" + c).html(a)
            })
        } else
            $.get("/" + b + "/Service/" + g, {
                pairid: e,
                sid: f,
                filterParams: h
            }, function(a) {
                $("#" + c).html(a)
            })
    }
}
function doIndicesBondsFilter() {
    var a = new Object;
    return a.continentid = $(".js-filter-box-table .selected").attr("continentid"),
        a.country = $("#country option:selected").attr("countryid"),
        a.maturity_from = $("#maturity_from option:selected").val(),
        a.maturity_to = $("#maturity_to option:selected").val(),
        a
}
// File: functions/shareWFriend.js
function updateSocialCount(a, b, c) {
    $.ajax({
        url: "/socialbuttons/Service/SocialButtonCount?content_id=" + a + "&social=" + b + "&pagetype=" + c,
        method: "POST",
        cache: !1
    }).done(function(a) {})
}
function openTwitPopup(a, b, c, d, e, f) {
    "twitter" == e && (href = "https://twitter.com/intent/tweet?" + a + "&text="),
    "stocktwits" == e && (href = "https://stocktwits.com/widgets/share?body="),
        f ? (href = href + d + " - " + a,
            window.open(href, "", "height=320,width=725")) : $.ajax({
            url: "/socialbuttons/service/CreateShortenLink",
            async: !1,
            type: "GET",
            data: {
                url: a,
                contentID: b,
                pageType: c
            },
            success: function(a) {
                a && (shortLink = a),
                href && (href = href + d + " - " + shortLink,
                    window.open(href, "", "height=320,width=725"))
            }
        })
}
function openSharePopup(a, b, c, d, e, f, g, h) {
    var i = "";
    g || !h ? i = "mailto:?subject=" + e + "&body=" + d + encodeURIComponent(a) + "%0A%0AInvesting.com" : $.ajax({
        url: "/socialbuttons/service/CreateShortenLink",
        async: !1,
        type: "GET",
        data: {
            url: a,
            contentID: b,
            pageType: c
        },
        success: function(a) {
            a && (shortLink = a),
                i = "mailto:?subject=" + e + "&body=" + d + encodeURIComponent(shortLink) + "%0A%0AInvesting.com"
        }
    }),
        updateSocialCount(b, f, c),
        location.href = i
}
var shareWFriend = new function() {
        var a = function() {
            var a = jQuery.trim($("#ef_your_email").val());
            return validateEmail(a) ? ($("#ef_your_email").removeClass("error"),
                $("#ef_your_email_error").css("visibility", "hidden"),
                !0) : ($("#ef_your_email").addClass("error"),
                $("#ef_your_email_error").css("visibility", "visible"),
                !1)
        }
            , b = function() {
            var a = jQuery.trim($("#ef_to").val()).split(",")
                , b = !0
                , c = a.length;
            if (c > 10)
                return $("#ef_to").removeClass("lightgrayFont").addClass("error"),
                    $("#ef_to_remark").text($("#ef_to_remark").attr("error2")).addClass("darkRedFont").show(),
                    !1;
            for (var d = 0; c > d; d++)
                if (!validateEmail($.trim(a[d]))) {
                    b = !1;
                    break
                }
            return b ? $("#ef_to").removeClass("error") : ($("#ef_to").removeClass("lightgrayFont").addClass("error"),
                $("#ef_to_remark").text($("#ef_to_remark").attr("error")).addClass("darkRedFont").show()),
                b
        }
            , c = function() {
            $("#shareForm").fadeOut("fast", function() {
                $("#shareForm").removeClass("aboveButton")
            })
        }
            , d = function(a) {
            $("#shareForm").removeClass("aboveButton");
            var b = $(window).scrollTop()
                , c = b + $(window).height()
                , d = $(a).offset().top
                , e = d + $(a).height();
            c >= e && d >= b ? $("#shareForm").removeClass("aboveButton") : $("#shareForm").addClass("aboveButton")
        }
            , e = function(a) {
            return $("#shareForm").is(":visible") && $("#shareForm").parent()[0] == $(a)[0] ? void c() : ($(a).append($("#shareForm")),
            $("#shareForm").is(":visible") || $("#shareForm").toggle(),
                d($("#shareForm")),
                void $("#ef_to").focus())
        };
        this.vaildate_shareWFriend_form = function(d, e, f) {
            if ("" == $("#user_name").val() && b() && a()) {
                $(document).unbind("click");
                var g, h, i, j, k, l, m = "";
                g = jQuery.trim($("#ef_to").val()),
                    i = jQuery.trim($("#ef_your_email").val()),
                    h = jQuery.trim($("#ef_from").val()),
                    j = jQuery.trim($("#ef_msg").val()),
                    m = $("#ef_send_me").is(":checked"),
                    k = $("#ef_contentID").val(),
                    l = $("#ef_pageType").val();
                var n = $("#ef_submit").attr("href");
                $("#ef_submit").removeAttr("href"),
                    $(".shareWFriendForm span.loaderImg").removeClass("displayNone"),
                    $.get("/common/ajax_func.php?newShareWithFriend=true", {
                        action: "send_email_to_friend",
                        to: g,
                        your_email: i,
                        from: h,
                        msg: j,
                        send_me: m,
                        page_url: d,
                        html_title: e,
                        h1: f,
                        contentID: k,
                        pageType: l
                    }, function(a) {
                        $(".shareWFriendForm span.loaderImg").addClass("displayNone"),
                            $("#sentAddressesList").html(a),
                            $(".shareFormInner").fadeOut("slow", function() {
                                $(".shareFormThankYou").fadeIn("slow")
                            }),
                            $("#ef_submit").attr("href", n)
                    }),
                    $(document).click(function(a) {
                        a.stopPropagation(),
                            c()
                    })
            }
        }
            ,
            this.ef_send_more_emails = function() {
                $(".shareFormThankYou").fadeOut("fast", function() {
                    $(".shareFormInner").fadeIn("slow")
                })
            }
            ,
            this.initiate = function() {
                $(".shareWFriend").click(function(a) {
                    a.stopPropagation(),
                        e(this)
                }),
                    $("#shareForm").click(function(a) {
                        a.stopPropagation()
                    }),
                    $(document).click(function(a) {
                        a.stopPropagation(),
                            c()
                    }).keyup(function(a) {
                        27 == a.which && c()
                    }),
                    $("#ef_to").focus(function() {
                        $("#ef_to_remark").text($("#ef_to_remark").attr("remark")).removeClass("darkRedFont").show()
                    }),
                    $("#ef_to").blur(function() {
                        "" != $(this).val() ? b() : ($("#ef_to").removeClass("error"),
                            $("#ef_to_remark").removeClass("darkRedFont"))
                    }),
                    $("#ef_your_email").focus(function() {
                        $("#ef_your_email").removeClass("error"),
                            $("#ef_your_email_error").css("visibility", "hidden")
                    }),
                    $("#ef_your_email").blur(function() {
                        "" != $(this).val() ? a() : ($(this).removeClass("error"),
                            $("#ef_your_email_error").visible())
                    })
            }
    }
;
window.bindAllCommentSideActions = function() {
    $(".js-commentDropDownWrapper:not([eventbound])").each(function() {
        var a = $(this)
            , b = a.find(".js-commentDropDownOptions")
            , c = a.find(".js-thinDropdownArrow")
            , d = new components.TooltipPopup(b,c);
        d.subscribe("show", function() {
            a.find(".js-commentDropDownOptions>div")._hide().filter(".js-option")._show(),
                a.find(".js-sharePopup")._hide()
        }),
            a.find(".bugCloseIcon").click(d.hide.bind(d)),
            a.find(".js-commentSharePopup").click(function(b) {
                var c = $(this);
                return $.ajax({
                    url: "/socialbuttons/service/GetCommentSocialLinks",
                    type: "POST",
                    dataType: "html",
                    data: {
                        url: c.data("curl"),
                        commentID: c.data("cid")
                    },
                    success: function(b) {
                        var c;
                        a.find(".js-option")._hide(),
                            c = a.find(".js-sharePopup")._show().find(".js-shareComment>.js-shareCommentSpan").html(b),
                            c.find(".js-copyToClipboard").click(function() {
                                $.copyToClipboard($(this).data("copy-value"), this),
                                    a.find(".js-commentDropDownOptions")._hide()
                            })
                    }
                }),
                    b.preventDefault(),
                    !1
            }),
            a.attr("eventBound", "")
    })
}
    ,
    $(document).ready(window.bindAllCommentSideActions);
// File: functions/tabswidget.js
function tabsWidgetOnelevel(a) {
    window.tabsOnelevelInstance !== !0 && $(".oneLvlTabsWidget").each(function() {
        tabsWidgetOnelevelCode(a, this)
    }),
    "undefined" == typeof window.tabsOnelevelInstance && (window.tabsOnelevelInstance = !0)
}
function tabsWidgetOnelevelCode(funcName, container) {
    var $$ = $(container)
        , totalWidth = Number($$.width())
        , tabWidthOut = 0
        , maxWidth = Number($$.next("#lastDummyLI").width()) + 31
        , menuhtml = ""
        , childsTotalCount = Number($$.children().length)
        , childsCount = childsTotalCount;
    for (childsCount = childsTotalCount; childsCount > 0; )
        tabWidthOut += $$.find("li:nth-child(" + childsCount + ")").outerWidth(),
            childsCount--;
    if (tabWidthOut > totalWidth)
        for (childsCount = childsTotalCount; childsCount > 0; ) {
            if (tabWidthOut -= $$.find("li:nth-child(" + childsCount + ")").outerWidth(),
                $$.find("li:nth-child(" + childsCount + ")").outerWidth() > maxWidth && (maxWidth = $$.find("li:nth-child(" + childsCount + ")").outerWidth()),
                totalWidth > tabWidthOut + maxWidth) {
                childsCount--;
                break
            }
            childsCount--
        }
    if (childsTotalCount > childsCount && childsCount > 0) {
        var counter = 0;
        jQuery.each($$.children(), function() {
            counter >= childsCount && ($(this).remove(),
                menuhtml += $("<div>").append($(this).addClass("addRow").clone()).html()),
                counter++
        }),
            $$.append('<li style="position:relative;" href="#" class="hideshow moreTabOneLvl"><span class="moreText addLeftBorder firstMoreSpan">' + $("#lastDummyLI").data("more-cat") + '</span> <span class="showMoreDownArrow"></span><ul class="btnSmallPopup"><span class="newSiteIconsSprite arrow">&nbsp;</span>' + menuhtml + "</ul></li>")
    }
    $$.find("ul").css("top", $(".oneLvlTabsWidget li.hideshow").outerHeight(!0) + "px").css("width", maxWidth + 15),
        $$.find("li.hideshow").hover(function() {
            $(this).children("ul").toggle()
        }),
        $$.find("li.hideshow A").click(function() {
            $(".moreText").html($(this).text()),
            $(".moreTabOneLvl").hasClass("lastTab") || $(".moreTabOneLvl").addClass("lastTab")
        }),
        $$.find("li.hideshow ul li").each(function() {
            $(this).bind("click", function() {
                $(this).is(".dropDownTab") || ($(this).siblings().each(function() {
                    $(this).is(".dropDownTab") && $(this).removeClass("dropDownTab")
                }),
                $$.find(".moreTabOneLvl").hasClass("lastTab") && $$.find(".moreTabOneLvl").addClass("lastTab"),
                    $$.find("li.selected").removeClass("selected"),
                    $(this).addClass("dropDownTab"),
                funcName && eval(funcName)(this))
            })
        })
}
function tabsWidgetBindJSFunc(tabid, funcName, oneLevel) {
    $("#" + tabid).children().each(function() {
        $(this).hasClass("moreTabOneLvl") || $(this).bind("click", function() {
            $(this).is(".selected") || ($(this).siblings().each(function() {
                $(this).is(".selected") && $(this).removeClass("selected"),
                oneLevel && $(this).hasClass("moreTabOneLvl") && ($(".moreText").html($("#lastDummyLI").data("more-cat")),
                    $(this).removeClass("lastTab"))
            }),
            oneLevel && $(".addRow").removeClass("dropDownTab"),
                $(this).addClass("selected"),
                eval(funcName)(this))
        })
    })
}
function liToDropDownMenu(a) {
    var b = $("#" + a)
        , c = $("#" + a + " li")
        , d = $("#TwoLvlLastLI" + a)
        , e = Number(d.outerWidth()) + Number(d.find(".showMoreDownArrow").outerWidth()) + 15
        , f = e
        , g = 0
        , h = 0
        , i = ""
        , j = "noBold";
    if ($.each(c, function() {
            g += $(this).outerWidth()
        }),
            !(b.width() >= g)) {
        for (var k = c.length - 1; k > 0; k--)
            h = $(c[k]).outerWidth(),
            g + e >= b.width() && (0 == $(c[k]).find("a").length ? (d.attr("data-more-cat", $(c[k]).text()),
                e = h + Number(d.find(".showMoreDownArrow").outerWidth()) + 15,
                j = "bold",
                i = $("<div>").append($(c[k]).addClass("addRow dropDownTab").clone()).html() + i) : i = $("<div>").append($(c[k]).addClass("addRow").clone()).html() + i,
            h > f && (f = h),
                $(c[k]).remove()),
                g -= h;
        b.append('<li style="position:relative;" class="hideshow moreTab"><span class="moreText ' + j + '">' + d.data("more-cat") + '</span> <span class="showMoreDownArrow"></span><ul class="btnSmallPopup"><span class="newSiteIconsSprite arrow">&nbsp;</span>' + i + "</ul></li>"),
            $("#" + a + " ul").hide();
        var l;
        $("#" + a + " li.hideshow").hover(function() {
            $("#" + a + " li.hideshow ul").show(),
                clearTimeout(l)
        }, function() {
            l = setTimeout(function() {
                $("#" + a + " li.hideshow ul").hide()
            }, 500)
        }),
            $(".newBigSubTabs li.hideshow ul").css("top", $(".newBigSubTabs li.hideshow").outerHeight(!0) - 10 + "px"),
            $("#" + a + " ul.btnSmallPopup").css("width", f + 10),
            $(".newBigSubTabs li.hideshow .addRow").click(function() {
                $(this).find("a").attr("href") && window.location.assign($(this).find("a").attr("href"))
            })
    }
}
// File: fx-search/search_funcs.js
function FXautoComplete(params, ElementParams) {
    function submitSearch(eventSubmit) {
        if (!_that.resultsData)
            return !1;
        var selected = _that.resultsData.All[_that.rowNumber];
        eventSubmit && eventSubmit.originalEvent || _that.trackSearch();
        var type = selected.pair_type_label;
        selected.exchange_name_short && (type += " - " + selected.exchange_name_short);
        var result = {
            pairId: selected.pair_ID,
            symbol: selected.symbol,
            name: selected.trans_name,
            stock: selected.exchange_name_short,
            country: selected.country_ID,
            type: type,
            link: selected.link,
            pairtypelabel: selected.pair_type_label,
            flag: selected.flag
        };
        if (_that.Element.onSubmit(result),
                _that.params.$functionName) {
            selected.extraParam = _that.params.$paramList;
            var func = eval(_that.params.$functionName);
            func(selected)
        }
        return $("#search_loading_" + $prefix).hide(),
            _that.closeSearchResultBox(),
        _that.Element.shouldSendForm || !1
    }
    function boldSymbol(a, b, c) {
        var d = a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "")
            , e = d.toUpperCase()
            , f = new RegExp("(" + d + ")","gi")
            , g = c ? e : "$1";
        return b.replace(f, '<i class="bold">' + g + "</i>")
    }
    String.prototype.endsWith || (String.prototype.endsWith = function(a, b) {
            var c = this.toString();
            ("number" != typeof b || !isFinite(b) || Math.floor(b) !== b || b > c.length) && (b = c.length),
                b -= a.length;
            var d = c.indexOf(a, b);
            return -1 !== d && d === b
        }
    );
    var _that = this
        , $ajax = null;
    params = params || {};
    var $prefix = params.$prefix || ""
        , $newSearchWidget = params.$newSearchWidget || !1
        , $searchtype = params.$searchtype || ""
        , $resultType = params.$resultType || ""
        , $AllCountries = params.$AllCountries || ""
        , $tabsinfo = params.$tabsinfo || ""
        , $url = params.$url || "/search/service/search";
    this.params = params,
        this.Element = {
            minimumChar: ElementParams && ElementParams.minimumChar || 1,
            hasTabs: !1,
            selectedCountryId: 0,
            hasDefaultText: !0,
            googleSearchDefineId: "googleLinkSearchTop",
            onStartSearch: function() {},
            onSubmit: function() {}
        };
    var _element = {
        newSearchWidget: $newSearchWidget,
        searchTextInputId: "searchText_" + $prefix,
        resultsInnerContainerId: "searchTopResults_" + $prefix,
        resultsOuterContainerId: "subContainer_" + $prefix,
        formElementId: "combineSearchForm_" + $prefix,
        hasTabs: !0,
        trackSearches: !1,
        tabsContainerId: "search_tabs_" + $prefix,
        tabsType: "li",
        searchType: $searchtype,
        resultType: $resultType,
        portfolioPairId: 0,
        tabsDivId: "searchBoxTabsTopTabs_" + $prefix,
        countriesType: "td",
        dynamicVar: $prefix,
        url: $url,
        mainResultRowIdPrefix: "searchRowIdtop_",
        tabsPrefix: "search_box_top_" + $prefix,
        countryRowPrefix: "tdCountry_" + $prefix,
        countriesWrapperId: "countries_wrapper_" + $prefix,
        countriesTableId: "countries_table_" + $prefix,
        countriesDefaultText: $AllCountries,
        hiddenNoResultsDefine: "noResultsDefinesearchTopResults_" + $prefix,
        hiddenDocDirectionId: "doc_directionsearchTopResults_" + $prefix,
        loadOnTabChange: !1,
        loadingMessage: '<table><tbody><tr id="no_results"><td class="align_center noResults"><span class="loading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td></tr></tbody></table>'
    };
    $.extend(!0, this.Element, _element, ElementParams);
    var $elements = {
        $form: $("#" + this.Element.formElementId)
    };
    this.rowNumber = 0,
        this.lastRowNumber = 1,
        this.searchText = "",
        this.allowdReset = !0,
        this.allowdClosePopUp = !0,
        this.allowdKeys = !1,
        this.allowdForm = !1,
        this.searchTimeOutRunning = !1,
        this.arrowfocus = "",
        this.current_tab = "All",
        this.previousTab = "All",
        this.resultsData = "",
        this.firstRowId = 0,
        this.dynamicVar = "",
        this.countriesData = void 0,
        this.countriesDefaultText = void 0,
        this.searchType = "",
        this.portfolioPairId = void 0,
        this.resultType = void 0;
    var searchTracking = new function(a) {
        var b = {};
        return this.sendTrackingInfo = function(c) {
            if (a.trackSearches) {
                var d = "/search/service/LogSearch";
                b.searchString && 0 !== $.trim(b.searchString).length && b.clickedResult && !isNaN(b.clickedResult) && $.ajax({
                    url: d,
                    data: b,
                    dataType: "json",
                    type: "POST",
                    async: !1,
                    timeout: 150,
                    success: function() {
                        c()
                    },
                    error: function() {
                        c()
                    }
                })
            }
        }
            ,
            this.setSearchedString = function(c) {
                a.trackSearches && (b.searchString = c)
            }
            ,
            this.setClickedResult = function(c) {
                a.trackSearches && (b.clickedResult = c)
            }
            ,
            this
    }
    (this.Element);
    this.setTabsText = function(a) {
        if (a && "" != a) {
            var b = JSON.parse(a)
                , c = ""
                , d = []
                , e = ["All", "Indices", "Stocks", "ETFs", "Funds", "Commodities", "Forex", "Bonds"]
                , f = 0;
            for (tab_id in b) {
                b[tab_id].gaCode = "",
                    e.forEach(function(a) {
                        b[tab_id].id.endsWith(a) && (d.push("#" + b[tab_id].id),
                            b[tab_id].gaCode = a)
                    });
                var g = 1 == b[tab_id].selected ? "selected" : ""
                    , h = 0 == f ? "first" : ""
                    , i = f == b.length - 1 ? "last" : ""
                    , j = "search_box_topCountries" == b[tab_id].id || -1 !== b[tab_id].id.indexOf("Countries") ? "country" : "";
                "search_box_topCountries" == b[tab_id].id && (this.countriesDefaultText = b[tab_id].name),
                    c += '<li id="' + b[tab_id].id + '" class="' + h + " " + i + " " + j + " " + g + '"><a href="javascript:void(0);" js-ga-code="' + b[tab_id].gaCode + '">' + b[tab_id].name + "</a></li>",
                    f++
            }
            $("#" + this.Element.tabsDivId).html(c),
                d = d.join(","),
                $("#" + this.Element.tabsDivId).find(d).find("a").click(function(a) {
                    $("html").is(".com") && ga("send", "event", "Search - " + $(this).attr("js-ga-code"), "Click", "Search Bar")
                })
        }
    }
        ,
        this.clearInputField = function(a) {
            "" == this.searchDeafaultVale && (this.searchDeafaultVale = $(a).val());
            var b = this.searchDeafaultVale;
            "" != $(a).attr("default") && (b = $(a).attr("default")),
            b == $(a).val() && ($("#" + this.Element.searchTextInputId).val(""),
                this.allowdReset = !0,
                this.allowdKeys = !1,
                this.allowdForm = !1)
        }
        ,
        this.markSelectedRow = function() {
            $("#" + this.Element.resultsInnerContainerId + " .row").removeClass("hoverSearch"),
                $("#" + this.Element.mainResultRowIdPrefix + this.rowNumber).addClass("hoverSearch")
        }
        ,
        this.setSelectedRowNumber = function(a) {
            this.allowdForm = !0,
                this.lastRowNumber = this.rowNumber,
                this.rowNumber = a
        }
        ,
        this.changeCurrentTabDisplay = function(a) {
            $("#" + this.Element.tabsPrefix + a).addClass("selected"),
                $("#" + this.Element.tabsPrefix + a).siblings().each(function() {
                    $(this).removeClass("selected")
                })
        }
        ,
        this.getSelectedRowElement = function(a) {
            return $("#" + a.Element.mainResultRowIdPrefix + this.rowNumber)
        }
        ,
        this.closeAutocomplete = function(a) {
            a.Element.selectedCountryId = 0,
                this.previousTab = "All",
                $("#" + this.Element.resultsInnerContainerId).scrollTop(0),
                $("#" + this.Element.countriesScrollDiv).scrollTop(0),
                $("#" + a.Element.countriesWrapperId).addClass("displayNone");
            var b = this.countriesDefaultText;
            void 0 == this.countriesDefaultText && (b = this.Element.countriesDefaultText),
                $("#" + a.Element.tabsPrefix + "Countries").html('<a href="javascript:void(0);">' + b + "</a>"),
                $("#" + a.Element.resultsOuterContainerId).addClass("displayNone"),
                $("#" + a.Element.resultsInnerContainerId).html("")
        }
        ,
        this.closeSearchResultBox = function() {
            $("#" + this.Element.resultsOuterContainerId).addClass("displayNone"),
                this.closeAutocomplete.call(this, this)
        }
        ,
        this.isSearchBoxOpen = function() {
            return !$("#" + this.Element.resultsOuterContainerId).hasClass("displayNone")
        }
        ,
        this.getResultsNumber = function() {
            return $("#" + this.Element.resultsInnerContainerId).find("table tr").length
        }
        ,
        this.keyCodeUp = function() {
            this.rowNumber--;
            var a = this.getResultsNumber.call(this);
            (-1 == this.rowNumber || isNaN(this.rowNumber)) && ($("#" + this.Element.resultsInnerContainerId + " .row").removeClass("hoverSearch"),
                this.arrowfocus = "text",
                $elements.$form.focus(),
                this.rowNumber = -1,
                $("#" + this.Element.searchTextInputId).val(this.searchText),
                this.allowdKeys = !0),
            a - this.rowNumber > 7 && $("#" + this.Element.resultsInnerContainerId).scrollTop($("#" + this.Element.resultsInnerContainerId).scrollTop() - 22)
        }
        ,
        this.keyCodeDown = function() {
            void 0 === this.rowNumber && (this.rowNumber = 0),
                this.arrowfocus = "tabs";
            var a = this.getResultsNumber.call(this);
            a != this.rowNumber && (this.rowNumber++,
                this.rowNumber > 7 ? $("#" + this.Element.resultsInnerContainerId).scrollTop($("#" + this.Element.resultsInnerContainerId).scrollTop() + 22) : $("#" + this.Element.resultsInnerContainerId).scrollTop(0))
        }
        ,
        this.keyFunctunality = function(a, b) {
            this.allowdForm = !1,
                this.lastRowNumber = this.rowNumber;
            var c = !0;
            if (40 == b)
                this.keyCodeDown.call(this);
            else if (38 == b)
                this.keyCodeUp.call(this);
            else if (39 == b && "tabs" == this.arrowfocus && this.Element.hasTabs) {
                var d = this.getTheNextTab.call(this, 1);
                "" == d ? c = !1 : this.rowNumber = 0,
                    this.ChangeTabOnClick.call(this, d)
            } else if (37 == b && "tabs" == this.arrowfocus && this.Element.hasTabs) {
                var d = this.getTheNextTab.call(this, 0);
                "" == d ? c = !1 : this.rowNumber = 0,
                    this.ChangeTabOnClick.call(this, d)
            }
            var e = this.getSelectedRowElement(this);
            if (e.length > 0 && c) {
                var f = this.executeGetSymbol.call(this, e);
                this.symbolAndAction.call(this, f, e, $("#" + this.Element.searchTextInputId), !1),
                    this.markSelectedRow.call(this)
            }
        }
        ,
        this.setGoogleLink = function() {
            var a = _that.Element.googleSearchDefineId
                , b = "/" + a + "?q=" + window.encodeURIComponent(_that.searchText);
            $("#" + _that.Element.googleLinkID).parent().attr("href", b),
                $("#" + _that.Element.googleLinkID).text(_that.searchText)
        }
        ,
        this.symbolAndAction = function(a, b, c, d) {
            a = a.replace(/<\/\i>/g, ""),
                a = a.replace(/<i class="bold">/g, ""),
                a = a.replace(/<\/\I>/g, ""),
                a = a.replace(/<I class=bold>/g, ""),
                a = a.replace(/<\/\i>/g, ""),
                a = a.replace(/<\/\i>/g, ""),
            1 != d && $(c).val(a),
            void 0 != this.Element.formElementId && "" != this.Element.formElementId && ($elements.$form.attr("action", $("#" + b.attr("id") + " .symbolName").attr("link")),
            "portfolio" == this.Element.searchType && (this.Element.portfolioPairId = $("#" + b.attr("id") + " .symbolName").attr("pairid")))
        }
        ,
        this.displayAndSetSearchResultBox = function() {
            if (this.allowdForm = !0,
                    this.arrowfocus = "tabs",
                "no_results" === this.firstRowId && "" != this.Element.googleSearchDefineId) {
                this.allowdForm = !0;
                var a = this.Element.googleSearchDefineId;
                $elements.$form.attr("action", "/" + a + "?q=" + this.searchText)
            } else
                "no_results" === this.firstRowId && (this.allowdForm = !1);
            $elements.$form.attr("action", $("#" + this.Element.mainResultRowIdPrefix + this.firstRowId + " .symbolName").attr("link")),
                this.Element.portfolioPairId = $("#" + this.Element.mainResultRowIdPrefix + this.firstRowId + " .symbolName").attr("pairid");
            this.Element.hasTabs && this.bindTabs(),
                this.executeBindResults(),
                $("#" + this.Element.resultsOuterContainerId).removeClass("displayNone")
        }
        ,
        this.validateForSearch = function(a, b) {
            38 != a.keyCode && 40 != a.keyCode && 37 != a.keyCode && 39 != a.keyCode && (this.searchText = $(b).val().replace(/<.*>/gi, "")),
                this.searchText.length > 0 && (38 == a.keyCode || 40 == a.keyCode || 37 == a.keyCode || 39 == a.keyCode) && this.allowdKeys ? this.keyFunctunality.call(this, a, a.keyCode) : 13 != a.keyCode && this.searchText.length >= this.Element.minimumChar && !this.searchTimeOutRunning ? (this.allowdReset = !1,
                    this.checkIfTimedOut.call(this)) : 0 == this.searchText.length && this.closeSearchResultBox.call(this)
        }
        ,
        this.checkIfTimedOut = function() {
            var a = this;
            this.searchTimeOutRunning || (this.searchTimeOutRunning = !0,
                clearTimeout(a.timer),
                a.timer = setTimeout(function() {
                    a.executeAutoCompleteSearch()
                }, 400))
        }
        ,
        this.executeAutoCompleteSearch = function() {
            this.Element.onStartSearch && this.Element.onStartSearch();
            var a = this
                , b = a.Element.url
                , c = a.Element.loadOnTabChange || !1
                , d = {};
            if ("" == a.searchText)
                return void (a.searchTimeOutRunning = !1);
            if ("undefined" != typeof a.Element.resultType && a.Element.resultType.length > 0) {
                var e = -1 !== b.lastIndexOf("?") ? "&" : "?";
                b += e + "searchType=" + a.Element.resultType
            }
            var f = $("#" + this.Element.formElementId + " > .searchGlassIcon, #" + this.Element.formElementId + " > .loading");
            f.removeClass("searchGlassIcon").addClass("loading"),
                this.allowdForm = !1,
            ("" == a.Element.selectedCountryId || isNaN(parseInt(a.Element.selectedCountryId))) && (a.Element.selectedCountryId = "0"),
            "" != a.Element.googleSearchDefineId && a.setGoogleLink.call(),
            -1 !== a.Element.selectedCountryId.indexOf("_") && (a.Element.selectedCountryId = a.Element.selectedCountryId.split("_"),
                a.Element.selectedCountryId = a.Element.selectedCountryId[a.Element.selectedCountryId.length - 1]),
                d = {
                    search_text: a.searchText,
                    term: a.searchText,
                    country_id: a.Element.selectedCountryId
                },
            c && (d.tab_id = this.previousTab),
            a.xhr && a.xhr.abort(),
                searchTracking.setSearchedString(a.searchText),
                $ajax = a.xhr = $.post(b, d, function(b) {
                    return a.allowdKeys = !1,
                        a.allowdForm = !1,
                        a.resultsData = b,
                    a.resultsData instanceof Array && (a.resultsData = {
                        All: b
                    }),
                        a.xhr = null,
                        "" == b || null == b ? (a.closeSearchResultBox(),
                            f.removeClass("loading"),
                            void f.addClass("searchGlassIcon")) : (a.allowdKeys = !0,
                            a.arrowfocus = "text",
                            a.executeBuildResultsBox(),
                            a.displayAndSetSearchResultBox(),
                            f.removeClass("loading"),
                            void f.addClass("searchGlassIcon"))
                }, "json"),
                this.searchTimeOutRunning = !1
        }
        ,
        this.inputFieldBind = function(a) {
            var b = this;
            a.length && a.off("focus.search_funcs").on("focus.search_funcs", function() {
                b.clearInputField.call(b, a),
                    $("#" + this.id + "Container").addClass("topBarInputSelected"),
                    b.rowNumber = 0
            }).off("keydown.search_funcs").on("keydown.search_funcs", function(a) {
                13 == a.which && $("#" + b.Element.resultsInnerContainerId + " table>tbody>tr.hoverSearch").click()
            }).off("keyup.search_funcs").on("keyup.search_funcs", function(c) {
                b.allowdKeys = !0,
                    b.validateForSearch.call(b, c, a)
            });
            var c = $("#" + b.Element.searchTextInputId).focus(function(a) {
                c.attr("prevValue", c.val()),
                    $("#searchTextTop").attr("prevValue", ""),
                $(a.target).attr("id").is("calendarFilterSearchText") && c.attr("prevValue", "")
            }).click(function(a) {
                $ajax && $ajax.abort(),
                    $("#combineSearchForm_rowid > span").removeClass("loading"),
                    c.keyup()
            }).off("mouseenter.search_funcs").on("mouseenter.search_funcs", function() {
                $("#combineSearchForm_rowid>span").addClass("searchGlassIcon")
            }).off("mouseout.search_funcs").on("mouseout.search_funcs", function() {
                $("#combineSearchForm_rowid>span").removeClass("searchGlassIcon")
            }).off("focusout.search_funcs").on("focusout.search_funcs", function(a) {
                $("#combineSearchForm_rowid>span").removeClass("searchGlassIcon"),
                    $(document).off("click.outsideSearch").on("click.outsideSearch", function(a) {
                        0 === $(a.target).parents("#" + b.Element.resultsInnerContainerId + ", #" + b.Element.searchTextInputId + ", #" + b.Element.resultsOuterContainerId).length && -1 === [b.Element.resultsInnerContainerId, b.Element.searchTextInputId, b.Element.resultsOuterContainerId].indexOf(a.target.id) && (b.Element.newSearchWidget || (b.Element.hasDefaultText ? c.val(c.attr("prevValue") || this.searchDeafaultVale) : c.val("")),
                            $("#" + b.Element.searchTextInputId + "Container").removeClass("topBarInputSelected"),
                        0 === $(a.target).closest(".subContainer_rowid").length && 0 === $(a.target).closest("#combineSearchForm_rowid").length && $(a.target).parents("html").length > 0 && ($ajax && $ajax.abort(),
                            $("#combineSearchForm_rowid > span").removeClass("loading"),
                        "" != c.attr("prevValue") && c.val(c.attr("prevValue"))),
                            b.closeAutocomplete(b))
                    })
            })
        }
        ,
        this.getTabLoadingMessage = function() {
            $("#" + this.Element.resultsInnerContainerId).html(this.Element.loadingMessage)
        }
        ,
        this.ChangeTabOnClick = function(a) {
            a = a.replace(this.Element.tabsPrefix, "");
            var b = this
                , c = !0;
            "" == a && (c = !1,
                a = this.previousTab),
                "Countries" != a ? (this.previousTab = a,
                c && (this.Element.loadOnTabChange ? (this.executeAutoCompleteSearch.call(this),
                    b.changeCurrentTabDisplay(this.previousTab),
                    this.getTabLoadingMessage.call(this)) : this.executeBuildResultsBox.call(this)),
                    this.displayAndSetSearchResultBox.call(this),
                "tabs" != this.arrowfocus && (this.arrowfocus = "text"),
                c && ($("#" + this.Element.searchTextInputId).focus(),
                    setTimeout(function() {
                        $("#" + b.Element.searchTextInputId).val(b.searchText)
                    }, 1))) : "Countries" == a && ($("#" + b.Element.countriesWrapperId).hasClass("displayNone") ? ($ajax = $.ajax({
                    url: "/search/countries",
                    dataType: "json",
                    async: !1,
                    success: function(a) {
                        FXautoComplete.countriesData = a;
                        var c = "";
                        for (var d in a) {
                            var e = "true" == a[d].selected ? "selected" : "";
                            c += "",
                                c += '<tr id="country' + b.Element.dynamicVar + "_" + a[d].country_id + '">',
                                c += '<td class="' + e + '" id="tdCountry' + b.Element.dynamicVar + "_" + a[d].country_id + '">' + a[d].country_name + "</td>",
                                c += "</tr>"
                        }
                        $("#" + b.Element.countriesTableId + " > tbody").html(c)
                    }
                }),
                    this.bindCountries(),
                    $("#" + b.Element.countriesWrapperId).removeClass("displayNone")) : $("#" + b.Element.countriesWrapperId).addClass("displayNone"))
        }
        ,
        this.bindCountries = function() {
            var a = this;
            $("#" + a.Element.countriesTableId + " " + a.Element.countriesType).each(function() {
                a.Element.countryRowPrefix + a.Element.selectedCountryId != this.id && $(this).removeClass("selected"),
                    $(this).unbind(),
                    $(this).click(function() {
                        a.searchInCountryId.call(a, this.id)
                    })
            })
        }
        ,
        this.searchInCountryId = function(a) {
            $("#" + a).addClass("selected"),
                this.Element.selectedCountryId = a.replace(/^\D+/g, ""),
                this.allowdReset = !1,
                $("#" + this.Element.countriesScrollDiv).scrollTop(0),
                $("#" + this.Element.countriesWrapperId).addClass("displayNone"),
                this.checkIfTimedOut.call(this),
                $("#" + this.Element.tabsPrefix + "Countries").html('<a href="javascript:void(0);">' + $("#" + a).html() + "</a>"),
                $("#" + this.Element.searchTextInputId).focus(),
                setTimeout(function() {
                    $("#" + this.Element.searchTextInputId).val(this.searchText)
                }, 1)
        }
        ,
        this.bindTabs = function() {
            var a = this;
            $("#" + a.Element.tabsDivId + " " + a.Element.tabsType).each(function() {
                $(this).unbind("click.tab").on("click.tab", function() {
                    a.ChangeTabOnClick.call(a, this.id)
                })
            })
        }
        ,
        this.getTheNextTab = function(a) {
            "rtl" == $("#" + this.Element.hiddenDocDirectionId).attr("rel") && (a = 0 == a ? 1 : 0);
            var b = this
                , c = new Array
                , d = ""
                , e = ""
                , f = 0;
            $("#" + b.Element.tabsDivId + " " + b.Element.tabsType).each(function() {
                d = this.id,
                    e = d.replace(b.Element.tabsPrefix, ""),
                    c[f] = e,
                    f++
            });
            for (var g = "", h = 0; h < c.length; h++)
                this.previousTab == c[h] && (0 == a && (a = -1),
                    g = c[h + a]);
            return g = "" != g && void 0 != g && "Countries" != g ? b.Element.tabsPrefix + g : ""
        }
        ,
        this.executeBuildResultsBox = function() {
            var a = this
                , b = this.resultsData;
            a.buildSearchResults(b)
        }
        ,
        this.executeBindResults = function() {
            var a = this;
            $("#" + a.Element.resultsInnerContainerId + " .row").each(function() {
                $(this).unbind(),
                    a.bindResults(this)
            })
        }
        ,
        this.executeGetSymbol = function(a) {
            return this.getSymbol(a)
        }
        ,
        this.setTabsText($tabsinfo),
        this.inputFieldBind($("#searchText_" + $prefix)),
        this.getSymbol = function(a) {
            return $("#" + a.attr("id") + " .symbolName").html()
        }
        ,
        this.actionMouseMoveOnRow = function(a, b, c) {
            var d = $(a).attr("id")
                , e = d.substr(d.indexOf("_") + 1);
            c.setSelectedRowNumber.call(b, e),
                c.markSelectedRow.call(b, b),
                c.symbolAndAction.call(b, $("#" + d + " .symbolName").html(), c.getSelectedRowElement(b), $("#" + b.Element.searchTextInputId), !0)
        }
        ,
        $elements.$form.submit(submitSearch),
        this.trackSearch = function(a) {
            var b = this.resultsData.All[_that.rowNumber];
            this.trackSearchItem(b.pair_ID, null, a)
        }
        ,
        this.trackSearchItem = function(a, b, c) {
            var d = c || function() {}
            ;
            a && searchTracking.setClickedResult(a),
            b && searchTracking.setSearchedString(b),
                searchTracking.sendTrackingInfo(d)
        }
        ,
        this.bindResults = function(a) {
            var b = this;
            $(a).mousemove(function() {
                b.actionMouseMoveOnRow(a, b, b)
            }).click(function() {
                submitSearch()
            })
        }
        ,
        this.buildJsonObjectFromRow = function(a) {}
        ,
        this.buildSearchResults = function(a) {
            var b = this
                , c = ""
                , d = b.previousTab;
            b.changeCurrentTabDisplay(d),
                b.firstRowId = 0;
            var e = ""
                , f = 0
                , g = a.All || a || [];
            return g !== b.params.$no_search_results && $.each(g, function(a, g) {
                var h = $("tr[rel=" + $prefix + "_" + g.pair_ID + "]")
                    , i = !1;
                i && h.length || void 0 !== g && (g.tab_ID && g.tab_ID.toLowerCase() == d.toLowerCase() || "All" == d) && (e = boldSymbol(b.searchText, g.symbol),
                    c += b.searchText.toLowerCase() === g.symbol.toLowerCase() && 0 == f ? '<table><tbody><tr data-pair-id="' + g.pair_ID + '"  class="row selectedRowExactMatch hoverSearch"  id="' + b.Element.mainResultRowIdPrefix + a + '">' : 0 == f ? '<table><tbody><tr data-pair-id="' + g.pair_ID + '"  class="row hoverSearch"  id="' + b.Element.mainResultRowIdPrefix + a + '">' : '<tr class="row" data-pair-id="' + g.pair_ID + '"  id="' + b.Element.mainResultRowIdPrefix + a + '">',
                    f++,
                    c += '<td class="first flag"><i class="ceFlags ' + g.flag + '"></i></td>',
                    c += '<td class="second symbolName dirLtr" pairid="' + g.pair_ID + '" id="symbol_' + g.symbol + '" link="' + g.link + '">' + e + '</td><td class="third" class="dirLtr" title="' + g.trans_name + '">' + g.trans_name + "</td>",
                    c += '<td class="fourth typeExchange" pairid="' + g.pair_ID + '" id="type_' + g.pair_ID + '" link="' + g.link + '">' + g.pair_type_label,
                g.exchange_name_short && (c += " - " + g.exchange_name_short),
                    c += "</td></tr>")
            }),
                0 == f ? (c = '<div id="no_results" class="noResults"><i class="searchNoResults"></i><p class="lighterGrayFont">' + b.params.$no_search_results + "</p></div>",
                    b.arrowfocus = "tabs",
                    b.firstRowId = "no_results",
                    void $("#" + b.Element.resultsInnerContainerId).html(c)) : (c += "</tbody></table>",
                    void $("#" + b.Element.resultsInnerContainerId).html(c))
        }
        ,
        this.boldSymbol = boldSymbol
}
// File: fx-search/init-search-widget.js
function initSearchWidget(searchWidget) {
    function hasValidID(a, b) {
        if (null === a)
            return !1;
        if (!a.hasOwnProperty)
            return !1;
        if (!a.hasOwnProperty(b))
            return !1;
        var c = a[b];
        return "na" !== c
    }
    function searchValue(rowElementAttr) {
        var params = $.extend({}, rowElementAttr);
        $('a[id^="timeFrame_"]').removeClass("toggled"),
            $("#datePickerToggleBtn").removeClass("toggled"),
        hasValidID(rowElementAttr, "pair_id") && (params.pair_id = rowElementAttr.pair_id,
            params.action = "searchStock"),
        hasValidID(rowElementAttr, "eventid") && (params.event_ID = rowElementAttr.eventid,
            params.action = "searchEvent"),
            "undefined" != typeof calendarFilters ? calendarFilters.searchBoxFilter(params) : (searchFilterCalendar.Element.onSubmit(params),
                eval(searchFilterCalendar.Element.functionName)(params))
    }
    "object" != typeof searchWidget && (searchWidget = window.searchWidget);
    var params = {};
    params.searchTextInputId = searchWidget.searchTextInputId || "calendarFilterSearchText",
        params.formElementId = "search_0bottom",
        params.resultsInnerContainerId = searchWidget.resultsInnerContainerId || "innerContainerCalendar",
        params.resultsOuterContainerId = searchWidget.calendarType + "CalendarSearchPopupResults",
        params.url = searchWidget.url,
        params.hiddenDocDirectionId = "doc_dir" + searchWidget.calendarType + "SearchPopupResults",
        params.mainResultRowIdPrefix = "searchRowIdEC_",
        params.hasDefaultText = !1,
        params.minimumChar = 2,
        params.functionName = searchWidget.functionName,
        params.shouldSendForm = !1,
    searchWidget.$wrapper && 0 == searchWidget.$wrapper.find("#" + params.formElementId).length && (params.formElementId = searchWidget.$wrapper.find(".js-search-bottom").attr("id", "search-" + Date.now()).attr("id")),
        searchWidget.$wrapper ? (searchWidget.$input = searchWidget.$wrapper.find("input"),
            params.searchTextInputId = searchWidget.$input.attr("id")) : searchWidget.$input = $("#" + params.searchTextInputId);
    var searchFilterCalendar = new FXautoComplete(null,params);
    return searchFilterCalendar.Element.newSearchWidget = !0,
        searchFilterCalendar.inputFieldBind(searchWidget.$input),
    searchWidget.regularAutoComplete || (searchFilterCalendar.getSymbol = function(a) {
        return $(".first", a).html()
    }
        ,
        searchFilterCalendar.buildSearchResults = function(a) {
            var b = this
                , c = '<div class="textBox clear" id="innerContainerCalendar"> <table>';
            if (null !== a) {
                b.firstRowId = 0;
                var d = " hoverSearch"
                    , e = ""
                    , f = ""
                    , g = a.All || a || [];
                $.each(g, function(a, g) {
                    void 0 !== g && (a++,
                        g.hasOwnProperty("eventId") ? (c += '<tr class="row" data-eventid="' + g.eventId + '" id="' + b.Element.mainResultRowIdPrefix + a + '">',
                            c += '<td class="flag"><span class="ceFlags ' + g.flagname + '"></span></td><td class="symbol">' + g.currency + '</td><td class="name" title="' + g.value + '">' + g.label + "</td>",
                            c += "</tr>") : (e = searchFilterCalendar.boldSymbol(searchFilterCalendar.searchText, g.label),
                            f = searchFilterCalendar.boldSymbol(searchFilterCalendar.searchText, g.symbol),
                            c += '<tr class="row' + d + '" data-pair_id="' + g.pair_ID + '" data-label="' + g.label + '" data-symbol="' + g.symbol + '" id="' + searchFilterCalendar.Element.mainResultRowIdPrefix + a + '">',
                            c += '<td class="symbol">' + f + '</td><td class="name" title="' + g.label + '">' + e + '</td><td class="exchangeName">' + g.exchg + "</td>",
                            c += "</tr>",
                            d = ""))
                }),
                    c += "</table></div>",
                    $("#" + b.Element.resultsOuterContainerId).html(c)
            }
        }
        ,
        searchFilterCalendar.bindResults = function(a) {
            var b = this;
            $(a).click(function() {
                searchValue($(this).data()),
                    b.closeAutocomplete.call(b, b)
            })
        }
        ,
        $("#economicCalendarForm, #earningsCalendarForm, #dividendsCalendarForm, #stock-splitCalendarForm").submit(function() {
            return !1
        })),
        searchFilterCalendar
}
window.searchFilterCalendars = window.searchFilterCalendars || {};
