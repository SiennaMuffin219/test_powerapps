/*! For license information please see HtmlViewer.js.LICENSE.txt */
(function () { return this ? this : window }())["@pa-client/htmlviewer"] = (function (e) {
    var t = {
    };
    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {
            i: i, l: !1, exports: {
            }
        }; return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    } return n.m = e, n.c = t, n.d = function (e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0, get: i
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0, value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(i, o, function (t) { return e[t] }.bind(null, o)); return i
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t
    }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 1)
})([(function (e, t, n) {
    "use strict";
    n.r(t), n.d(t, "HtmlViewer", (function () { return i }));
    var i = (function () {
        function e() {
        } return e.prototype.initControlContext = function (e) {
            e._autoHeightDiv = null, e.divElement = null, e.contentElement = null, e._parentScreenSubscription = null, e._autoHeightOuterContainer = null, e._mutationObserver = null, e._minHeight = AppMagic.Constants.Controls.MinHTMLLabelAutoHeight, e._maxHeight = null, e._autoHeightScheduled = !1, e._autoHeightTimeoutId = null
        }, e.prototype.initView = function (e, t) {
            var n = this;
            t._autoHeightOuterContainer = e;
            var i = e.children[0];
            t.htmlViewerElement = i;
            var o = i.getElementsByClassName("appmagic-htmlviewer-div")[0];
            t.divElement = o;
            var r = i.getElementsByClassName("appmagic-htmlviewer-content")[0];
            t.contentElement = r, t._maxHeight = t.modelProperties.maximumHeight.getValue(), t.clickOnBodyHandler = null, t.fill = ko.computed((function () { return this.viewState.displayMode() === AppMagic.Constants.DisplayMode.Disabled ? this.properties.DisabledFill() : this.properties.Fill() }), t), t._parentScreenSubscription = t.isParentScreenActive.subscribe(function (e, t) {
                t && this._updateForAutoHeight(e)
            }.bind(this, t)), t.modelProperties.AutoHeight.getValue() && (this._setupMutationObserver(t), this._updateForAutoHeight(t, !0)), t._imgLoadHandler = function (e) {
                if (t.initialized) {
                    var i = e.target;
                    i.removeEventListener("load", t._imgLoadHandler, !1), i.removeEventListener("error", t._imgLoadHandler, !1), t.realized && n._updateForAutoHeight(t)
                }
            }, this._renderText(t.properties.HtmlText(), t), ko.applyBindings(t, e)
        }, e.prototype.updateAutoHeightOnParentVisible = function (e) {
            this._updateForAutoHeight(e, !0)
        }, e.prototype._onClick = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                e.behaviors.OnSelect();
                var n = document.createEvent("MouseEvents");
                n.initEvent("click", !0, !0), e.htmlViewerElement.dispatchEvent(n)
            }
        }, e.prototype._onMouseDown = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                var n = document.createEvent("MouseEvents");
                n.initEvent("mousedown", !0, !0), e.htmlViewerElement.dispatchEvent(n)
            }
        }, e.prototype._onMouseUp = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                var n = document.createEvent("MouseEvents");
                n.initMouseEvent("mouseup", !0, !0, window, null, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget), e.htmlViewerElement.dispatchEvent(n)
            }
        }, e.prototype._onKeyDown = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                var n = document.createEvent("KeyboardEvent");
                n.initEvent("keydown", !0, !0), e.htmlViewerElement.dispatchEvent(n)
            }
        }, e.prototype._shouldUpdateForAutoHeight = function (e) { return !!(e.initialized && e.realized && e.modelProperties.AutoHeight.getValue() && e.isParentScreenActive.peek()) && (e.modelProperties.Visible.getValue() && !e.controlWidget.isAncestorHidden(e)) }, e.prototype._updateForAutoHeight = function (e, t) {
            var n = this;
            void 0 === t && (t = !1), this._shouldUpdateForAutoHeight(e) && !e._autoHeightTimeoutId && (t ? e._autoHeightTimeoutId = window.setTimeout((function () {
                e._autoHeightTimeoutId = null, n._shouldUpdateForAutoHeight(e) && n._adjustHeight(e)
            }), 0) : this._adjustHeight(e))
        }, e.prototype._adjustHeight = function (e) {
            e._autoHeightDiv && !e._autoHeightScheduled && (e._autoHeightScheduled = !0, AppMagic.Controls.ControlAutoSizeUtil.fitControlHeightToContentAsync(e, e._autoHeightDiv, e._minHeight, e._maxHeight, 3).then((function () {
                e._autoHeightScheduled = !1
            })))
        }, e.prototype._setupMutationObserver = function (e) {
            e._autoHeightOuterContainer && !e._mutationObserver && (e._mutationObserver = new MutationObserver(this._updateForAutoHeight.bind(this, e, !1)), e._mutationObserver.observe(e._autoHeightOuterContainer, {
                childList: !0, attributes: !0, characterData: !0, subtree: !0
            }))
        }, e.prototype._disposeMutationObserver = function (e) {
            e._mutationObserver && (e._mutationObserver.disconnect(), e._mutationObserver = null)
        }, e.prototype.disposeView = function (e, t) {
            if (this._disposeMutationObserver(t), t._autoHeightTimeoutId && (window.clearTimeout(t._autoHeightTimeoutId), t._autoHeightTimeoutId = null), t.divElement) {
                var n = t.divElement.querySelectorAll("a");
                this._removeEventListenersFromLinks(n), this._removeEventListenersFromBody(t.divElement, t)
            } t.fill.dispose(), t.fill = null, t.htmlViewerElement = null, t.divElement = null, t.contentElement = null, t._autoHeightDiv = null, t._autoHeightOuterContainer = null, t._parentScreenSubscription && (t._parentScreenSubscription.dispose(), t._parentScreenSubscription = null), t._parentVisibilityListener && (t._parentVisibilityListener.dispose(), t._parentVisibilityListener = null)
        }, e.prototype.onChangeHtmlText = function (e, t) {
            t.realized && (e.newValue !== e.oldValue && this._renderText(e.newValue, t), this._updateForAutoHeight(t))
        }, e.prototype.onChangeAutoHeight = function (e, t) {
            t.realized && (t.modelProperties.AutoHeight.getValue() ? (this._setupMutationObserver(t), this._updateForAutoHeight(t)) : (this._disposeMutationObserver(t), t._autoHeightTimeoutId && (window.clearTimeout(t._autoHeightTimeoutId), t._autoHeightTimeoutId = null)))
        }, e.prototype.onChangeWidth = function (e, t) {
            t.realized && !e.self && t.modelProperties.AutoHeight.getValue() && this._updateForAutoHeight(t, !0)
        }, e.prototype.onChangeHeight = function (e, t) {
            t.realized && (e.self || this._updateForAutoHeight(t))
        }, e.prototype.onViewPositioningComplete = function (e) {
            e.realized && this._updateForAutoHeight(e)
        }, e.prototype.onChangeVisible = function (e, t) {
            t.realized && this._updateForAutoHeight(t, !0)
        }, e.prototype.onChangeColor = function (e, t) {
            this._renderOnPropertyUpdate(e, t)
        }, e.prototype.onChangeSize = function (e, t) {
            t.realized && (this._renderOnPropertyUpdate(e, t), this._updateForAutoHeight(t))
        }, e.prototype.onChangeFont = function (e, t) {
            t.realized && (this._renderOnPropertyUpdate(e, t), this._updateForAutoHeight(t))
        }, e.prototype.onChangePaddingTop = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype.onChangePaddingBottom = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype.onChangePaddingLeft = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype.onChangePaddingRight = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype.onChangeTooltip = function (e, t) {
            this._renderOnPropertyUpdate(e, t)
        }, e.prototype._renderOnPropertyUpdate = function (e, t) {
            t.realized && e.newValue !== e.oldValue && this._renderText(t.properties.HtmlText(), t)
        }, e.prototype._renderText = function (e, t) {
            if (t.realized) {
                null === e && (e = "");
                var n = t.divElement, i = t.contentElement, o = n.querySelectorAll("a");
                this._removeEventListenersFromLinks(o), this._removeEventListenersFromBody(n, t);
                var r = document.createElement("div"), a = AppMagic.Functions.getSafeHTML(e, !0), u = this._removeTags(a, "iframe");
                WinJS.Utilities.setInnerHTMLUnsafe(r, u), n.style.margin = "0px", r.style.fontSize = AppMagic.Utility.stripHtml(t.properties.Size() || ""), r.style.fontFamily = AppMagic.Utility.stripHtml(t.properties.Font()) || "", r.style.color = AppMagic.Utility.stripHtml(t.properties.Color() || ""), r.title = AppMagic.Utility.stripHtml(t.properties.Tooltip() || ""), i.style.padding = u ? "" : "0px";
                try {
                    var code = new Code128(e);
                    code.insert(i);
                    /*WinJS.Utilities.setInnerHTMLUnsafe(i, r.outerHTML)*/
                    t._autoHeightDiv = n.children[0]
                } catch (e) {
                    Core.Log.verbose("Error setting HTML on HTML Viewer:", e)
                } o = n.querySelectorAll("a"), this._addEventListenerToBody(n, t), this._addEventListenerToLinks(o);
                var l = n.querySelectorAll("img");
                this._addLoadEventListenersToImgs(t, l)
            }
        }, e.prototype._removeTags = function (e, t) {
            var n = document.createElement("div");
            WinJS.Utilities.setInnerHTMLUnsafe(n, e);
            for (var i = n.querySelectorAll(t), o = 0;
                o < i.length;
                o++)i[o].parentNode.removeChild(i[o]); return n.innerHTML
        }, e.prototype._addEventListenerToBody = function (e, t) {
            t.clickOnBodyHandler = this._onClick.bind(this, t), t.mouseDownBodyHandler = this._onMouseDown.bind(this, t), t.mouseUpBodyHandler = this._onMouseUp.bind(this, t), t.keydownOnBodyHandler = this._onKeyDown.bind(this, t), e && (e.addEventListener("click", t.clickOnBodyHandler), e.addEventListener("mousedown", t.mouseDownBodyHandler), e.addEventListener("mouseup", t.mouseUpBodyHandler), e.addEventListener("keydown", t.keydownOnBodyHandler))
        }, e.prototype._removeEventListenersFromBody = function (e, t) {
            e && t.clickOnBodyHandler && t.mouseDownBodyHandler && t.keydownOnBodyHandler && (e.removeEventListener("click", t.clickOnBodyHandler), e.removeEventListener("mousedown", t.mouseDownBodyHandler), e.removeEventListener("mouseup", t.mouseUpBodyHandler), e.removeEventListener("keydown", t.keydownOnBodyHandler))
        }, e.prototype._addEventListenerToLinks = function (e) {
            for (var t = 0;
                t < e.length;
                t++) {
                var n = e[t];
                "ms-appx" !== n.href.substring(0, "ms-appx".length) ? n.addEventListener("click", this._launchLink) : n.removeAttribute("href")
            }
        }, e.prototype._removeEventListenersFromLinks = function (e) {
            for (var t = 0;
                t < e.length;
                t++) {
                var n = e[t];
                "ms-appx" !== n.href.substring(0, "ms-appx".length) && n.removeEventListener("click", this._launchLink)
            }
        }, e.prototype._addLoadEventListenersToImgs = function (e, t) {
            for (var n = 0, i = t.length;
                n < i;
                n++) {
                var o = t.item(n);
                o.addEventListener("load", e._imgLoadHandler, !1), o.addEventListener("error", e._imgLoadHandler, !1)
            }
        }, e.prototype._launchLink = function (e) {
            if (e && e.target) {
                for (var t = e.target;
                    "A" !== t.nodeName;
                )t = t.parentNode;
                if (t.href) try {
                    AppMagic.Functions.launchAsync(null, t.href)
                } catch (e) {
                    Core.Log.verbose("Error launching link from HTML Viewer:", e)
                } e.stopPropagation(), e.preventDefault()
            }
        }, e
    })()
}), (function (e, t, n) {
    n(3), e.exports = n(2)
}), (function (e, t, n) {
    "use strict";
    n.r(t);
    var i = n(0);
    n.d(t, "HtmlViewer", (function () { return i.HtmlViewer })), n.d(t, "IHtmlViewerControlContext", (function () { return i.IHtmlViewerControlContext }))
}), (function (e, t, n) {
    "use strict";
    n.r(t);
    var i = n(0);
    Core.exportToNamespace(["AppMagic", "Controls"], i)
})]);
//# sourceMappingURL=D:/a/_work/1/s/obj/Assets/js/HtmlViewer/HtmlViewer.js.map
