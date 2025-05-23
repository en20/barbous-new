!(function (a, b) {
  var c = function () {
    b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
  };
  (b = b.bind(null, a, a.document)),
    "object" == typeof module && module.exports
      ? b(require("lazysizes"))
      : a.lazySizes
      ? c()
      : a.addEventListener("lazyunveilread", c, !0);
})(window, function (a, b, c) {
  "use strict";
  function d() {
    (this.ratioElems = b.getElementsByClassName("lazyaspectratio")),
      this._setupEvents(),
      this.processImages();
  }
  if (a.addEventListener) {
    var e,
      f,
      g,
      h = Array.prototype.forEach,
      i = /^picture$/i,
      j = "data-aspectratio",
      k = "img[" + j + "]",
      l = function (b) {
        return a.matchMedia
          ? (l = function (a) {
              return !a || (matchMedia(a) || {}).matches;
            })(b)
          : a.Modernizr && Modernizr.mq
          ? !b || Modernizr.mq(b)
          : !b;
      },
      m = c.aC,
      n = c.rC,
      o = c.cfg;
    (d.prototype = {
      _setupEvents: function () {
        var a = this,
          c = function (b) {
            b.naturalWidth < 36
              ? a.addAspectRatio(b, !0)
              : a.removeAspectRatio(b, !0);
          },
          d = function () {
            a.processImages();
          };
        b.addEventListener(
          "load",
          function (a) {
            a.target.getAttribute && a.target.getAttribute(j) && c(a.target);
          },
          !0
        ),
          addEventListener(
            "resize",
            (function () {
              var b,
                d = function () {
                  h.call(a.ratioElems, c);
                };
              return function () {
                clearTimeout(b), (b = setTimeout(d, 99));
              };
            })()
          ),
          b.addEventListener("DOMContentLoaded", d),
          addEventListener("load", d);
      },
      processImages: function (a) {
        var c, d;
        a || (a = b),
          (c = "length" in a && !a.nodeName ? a : a.querySelectorAll(k));
        for (d = 0; d < c.length; d++)
          c[d].naturalWidth > 36
            ? this.removeAspectRatio(c[d])
            : this.addAspectRatio(c[d]);
      },
      getSelectedRatio: function (a) {
        var b,
          c,
          d,
          e,
          f,
          g = a.parentNode;
        if (g && i.test(g.nodeName || ""))
          for (
            d = g.getElementsByTagName("source"), b = 0, c = d.length;
            c > b;
            b++
          )
            if (
              ((e =
                d[b].getAttribute("data-media") || d[b].getAttribute("media")),
              o.customMedia[e] && (e = o.customMedia[e]),
              l(e))
            ) {
              f = d[b].getAttribute(j);
              break;
            }
        return f || a.getAttribute(j) || "";
      },
      parseRatio: (function () {
        var a = /^\s*([+\d\.]+)(\s*[\/x]\s*([+\d\.]+))?\s*$/,
          b = {};
        return function (c) {
          var d;
          return (
            !b[c] &&
              (d = c.match(a)) &&
              (d[3] ? (b[c] = d[1] / d[3]) : (b[c] = 1 * d[1])),
            b[c]
          );
        };
      })(),
      addAspectRatio: function (b, c) {
        var d,
          e = b.offsetWidth,
          f = b.offsetHeight;
        return (
          c || m(b, "lazyaspectratio"),
          36 > e && 0 >= f
            ? void (
                (e || (f && a.console)) &&
                console.log(
                  "Define width or height of image, so we can calculate the other dimension"
                )
              )
            : ((d = this.getSelectedRatio(b)),
              (d = this.parseRatio(d)),
              void (
                d &&
                (e
                  ? (b.style.height = e / d + "px")
                  : (b.style.width = f * d + "px"))
              ))
        );
      },
      removeAspectRatio: function (a) {
        n(a, "lazyaspectratio"),
          (a.style.height = ""),
          (a.style.width = ""),
          a.removeAttribute(j);
      },
    }),
      (f = function () {
        (g = a.jQuery || a.Zepto || a.shoestring || a.$),
          g && g.fn && !g.fn.imageRatio && g.fn.filter && g.fn.add && g.fn.find
            ? (g.fn.imageRatio = function () {
                return e.processImages(this.find(k).add(this.filter(k))), this;
              })
            : (g = !1);
      }),
      f(),
      setTimeout(f),
      (e = new d()),
      (a.imageRatio = e),
      "object" == typeof module && module.exports
        ? (module.exports = e)
        : "function" == typeof define && define.amd && define(e);
  }
});
