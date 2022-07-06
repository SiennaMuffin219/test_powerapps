(function () { return this ? this : window }())["@pa-client/code128"] = (function (e) {
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
    n.r(t), n.d(t, "Code128", (function () { return i }));
    var i = (function () {
        function e() {
        } return e.prototype.initControlContext = function (e) {
            e._autoHeightDiv = null, e.contentElement = null, e._parentScreenSubscription = null, e._autoHeightOuterContainer = null, e._mutationObserver = null, e._minHeight = AppMagic.Constants.Controls.MinHTMLLabelAutoHeight, e._maxHeight = null, e._autoHeightScheduled = !1, e._autoHeightTimeoutId = null
        }, e.prototype.initView = function (e, t) {
            var n = this;
            t._autoHeightOuterContainer = e;
            var i = e.children[0];
            t.code128Element = i;
            var r = i.getElementsByClassName("appmagic-code128-content")[0];
            t.contentElement = r, t._maxHeight = t.modelProperties.maximumHeight.getValue(), t.clickOnBodyHandler = null, t.fill = ko.computed((function () { return this.viewState.displayMode() === AppMagic.Constants.DisplayMode.Disabled ? this.properties.DisabledFill() : this.properties.Fill() }), t), t._parentScreenSubscription = t.isParentScreenActive.subscribe(function (e, t) {
                t && this._updateForAutoHeight(e)
            }.bind(this, t)), t.modelProperties.AutoHeight.getValue() && (this._setupMutationObserver(t), this._updateForAutoHeight(t, !0)), t._imgLoadHandler = function (e) {
                if (t.initialized) {
                    var i = e.target;
                    i.removeEventListener("load", t._imgLoadHandler, !1), i.removeEventListener("error", t._imgLoadHandler, !1), t.realized && n._updateForAutoHeight(t)
                }
            }, this._renderText(t.properties.Code128(), t), ko.applyBindings(t, e)
        }, e.prototype.updateAutoHeightOnParentVisible = function (e) {
            this._updateForAutoHeight(e, !0)
        }, e.prototype._onClick = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                e.behaviors.OnSelect();
                var n = document.createEvent("MouseEvents");
                n.initEvent("click", !0, !0), e.code128Element.dispatchEvent(n)
            }
        }, e.prototype._onMouseDown = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                var n = document.createEvent("MouseEvents");
                n.initEvent("mousedown", !0, !0), e.code128Element.dispatchEvent(n)
            }
        }, e.prototype._onMouseUp = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                var n = document.createEvent("MouseEvents");
                n.initMouseEvent("mouseup", !0, !0, window, null, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget), e.htmlViewerElement.dispatchEvent(n)
            }
        }, e.prototype._onKeyDown = function (e, t) {
            if (e.viewState.displayMode() === AppMagic.Constants.DisplayMode.Edit) {
                var n = document.createEvent("KeyboardEvent");
                n.initEvent("keydown", !0, !0), e.code128Element.dispatchEvent(n)
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
            t.fill.dispose(), t.fill = null, t.code128Element = null, t.contentElement = null, t._autoHeightDiv = null, t._autoHeightOuterContainer = null, t._parentScreenSubscription && (t._parentScreenSubscription.dispose(), t._parentScreenSubscription = null), t._parentVisibilityListener && (t._parentVisibilityListener.dispose(), t._parentVisibilityListener = null)
        }, e.prototype.onChangeCode = function (e, t) {
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
        }, e.prototype.onChangeSize = function (e, t) {
            t.realized && (this._renderOnPropertyUpdate(e, t), this._updateForAutoHeight(t))
        }, e.prototype.onChangePaddingTop = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype.onChangePaddingBottom = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype.onChangePaddingLeft = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype.onChangePaddingRight = function (e, t) {
            t.realized && this._updateForAutoHeight(t)
        }, e.prototype._renderOnPropertyUpdate = function (e, t) {
            t.realized && e.newValue !== e.oldValue && this._renderText(t.properties.Code(), t)
        }, e.prototype._renderText = function (e, t) {
            if (t.realized) {
                null === e && (e = "");
                var i = t.contentElement;
                i.querySelectorAll("canvas").forEach(el => el.remove());
                var code = new Code128(e);
                code.insert(i);
            }
        }, e
    })()
}), (function (e, t, n) {
    n(3), e.exports = n(2)
}), (function (e, t, n) {
    "use strict";
    n.r(t);
    var i = n(0);
    n.d(t, "Code128", (function () { return i.Code128 })), n.d(t, "ICode128ControlContext", (function () { return i.ICode128ControlContext }))
}), (function (e, t, n) {
    "use strict";
    n.r(t);
    var i = n(0);
    Core.exportToNamespace(["AppMagic", "Controls"], i)
})]);
