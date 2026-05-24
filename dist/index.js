import { jsx as t, jsxs as s } from "react/jsx-runtime";
import p, { useState as f, useRef as b } from "react";
import { ALL_THEMES as j, TERMINAL_DARK as B, TERMINAL_LIGHT as P } from "./tokens/index.js";
import { tokensToCss as H, tokensToIterm as z } from "./themes/index.js";
function y({ children: e, className: r = "", theme: i = "dark" }) {
  return /* @__PURE__ */ t("div", { className: `tui-shell ${i === "light" ? "tui-light" : ""} ${r}`.trim(), children: e });
}
function g({ title: e, subtitle: r, className: i = "", children: l }) {
  return /* @__PURE__ */ s("div", { className: `tui-titlebar ${i}`.trim(), role: "banner", children: [
    /* @__PURE__ */ s("div", { className: "tui-titlebar__dots", "aria-hidden": "true", children: [
      /* @__PURE__ */ t("span", { className: "tui-titlebar__dot tui-titlebar__dot--close" }),
      /* @__PURE__ */ t("span", { className: "tui-titlebar__dot tui-titlebar__dot--min" }),
      /* @__PURE__ */ t("span", { className: "tui-titlebar__dot tui-titlebar__dot--max" })
    ] }),
    e && /* @__PURE__ */ s("div", { className: "tui-titlebar__title", children: [
      e,
      r && /* @__PURE__ */ t("span", { style: { opacity: 0.5, marginLeft: "8px" }, children: r })
    ] }),
    l
  ] });
}
function x({
  title: e,
  variant: r = "default",
  headerRight: i,
  children: l,
  className: a = ""
}) {
  const c = r !== "default" ? ` tui-${r}` : "";
  return /* @__PURE__ */ s("div", { className: `tui-panel${c} ${a}`.trim(), children: [
    (e || i) && /* @__PURE__ */ s("div", { className: "tui-panel__header", children: [
      e && /* @__PURE__ */ t("h2", { className: "tui-panel__title", children: e }),
      i
    ] }),
    l
  ] });
}
function k({
  variant: e = "muted",
  dot: r = !1,
  children: i,
  className: l = ""
}) {
  const a = e !== "muted" ? ` tui-${e}` : "";
  return /* @__PURE__ */ s("span", { className: `tui-status-tag${a} ${l}`.trim(), children: [
    r && /* @__PURE__ */ t("span", { className: "tui-status-tag__dot", "aria-hidden": "true" }),
    i
  ] });
}
const N = {
  up: "▲ ",
  down: "▼ ",
  flat: "— "
};
function S({
  label: e,
  value: r,
  delta: i,
  deltaDirection: l = "flat",
  className: a = ""
}) {
  return /* @__PURE__ */ s("div", { className: `tui-metric ${a}`.trim(), children: [
    /* @__PURE__ */ t("div", { className: "tui-metric__label", children: e }),
    /* @__PURE__ */ t("div", { className: "tui-metric__value", children: r }),
    i !== void 0 && /* @__PURE__ */ s("div", { className: `tui-metric__delta tui-metric__delta--${l}`, children: [
      N[l],
      i
    ] })
  ] });
}
function A({
  columns: e,
  rows: r,
  getRowKey: i,
  className: l = ""
}) {
  return /* @__PURE__ */ t("div", { className: `tui-table-wrap ${l}`.trim(), children: /* @__PURE__ */ s("table", { className: "tui-table", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { style: { textAlign: a.align ?? "left" }, children: a.header }, String(a.key))) }) }),
    /* @__PURE__ */ t("tbody", { children: r.map((a, c) => /* @__PURE__ */ t("tr", { children: e.map((n) => /* @__PURE__ */ t("td", { style: { textAlign: n.align ?? "left" }, children: n.render ? n.render(a, c) : String(a[n.key] ?? "") }, String(n.key))) }, i ? i(a, c) : c)) })
  ] }) });
}
function E({
  tabs: e,
  defaultTab: r,
  activeTab: i,
  onTabChange: l,
  className: a = ""
}) {
  var u, h;
  const [c, n] = f(r ?? ((u = e[0]) == null ? void 0 : u.id) ?? ""), m = i ?? c;
  function o(d) {
    i || n(d), l == null || l(d);
  }
  const _ = (h = e.find((d) => d.id === m)) == null ? void 0 : h.content;
  return /* @__PURE__ */ s("div", { className: `tui-tabs ${a}`.trim(), children: [
    /* @__PURE__ */ t("div", { className: "tui-tabs__bar", role: "tablist", children: e.map((d) => /* @__PURE__ */ t(
      "button",
      {
        role: "tab",
        "aria-selected": d.id === m,
        "aria-controls": `tui-tabpanel-${d.id}`,
        id: `tui-tab-${d.id}`,
        className: `tui-tabs__tab${d.id === m ? " tui-tabs__tab--active" : ""}`,
        onClick: () => o(d.id),
        children: d.label
      },
      d.id
    )) }),
    /* @__PURE__ */ t(
      "div",
      {
        className: "tui-tabs__panel",
        role: "tabpanel",
        id: `tui-tabpanel-${m}`,
        "aria-labelledby": `tui-tab-${m}`,
        children: _
      }
    )
  ] });
}
function I({
  prompt: e = "$",
  placeholder: r = "enter command…",
  value: i,
  defaultValue: l = "",
  onChange: a,
  onSubmit: c,
  className: n = "",
  disabled: m = !1
}) {
  const o = b(null);
  function _(u) {
    u.key === "Enter" && c && c(u.currentTarget.value);
  }
  return /* @__PURE__ */ s(
    "div",
    {
      className: `tui-command-bar ${n}`.trim(),
      onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.focus();
      },
      children: [
        /* @__PURE__ */ t("span", { className: "tui-command-bar__prompt", "aria-hidden": "true", children: e }),
        /* @__PURE__ */ t(
          "input",
          {
            ref: o,
            className: "tui-command-bar__input",
            type: "text",
            "aria-label": "Command input",
            placeholder: r,
            value: i,
            defaultValue: l,
            disabled: m,
            onChange: (u) => a == null ? void 0 : a(u.target.value),
            onKeyDown: _,
            spellCheck: !1,
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off"
          }
        )
      ]
    }
  );
}
const v = {
  blue: "↗",
  green: "✓",
  yellow: "!",
  red: "!"
};
function L({
  variant: e = "blue",
  title: r,
  message: i,
  onClose: l,
  className: a = ""
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: `tui-toast tui-${e} ${a}`.trim(),
      role: "alert",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ t("span", { className: "tui-toast__icon", "aria-hidden": "true", children: v[e] }),
        /* @__PURE__ */ s("div", { className: "tui-toast__body", children: [
          r && /* @__PURE__ */ t("strong", { className: "tui-toast__title", children: r }),
          /* @__PURE__ */ t("span", { className: "tui-toast__message", children: i })
        ] }),
        l && /* @__PURE__ */ t("button", { className: "tui-toast__close", onClick: l, "aria-label": "Dismiss", children: "×" })
      ]
    }
  );
}
function M({
  value: e,
  max: r = 100,
  label: i,
  showValue: l = !0,
  variant: a = "blue",
  className: c = ""
}) {
  const n = Math.min(100, Math.max(0, e / r * 100));
  return /* @__PURE__ */ s("div", { className: `tui-progress ${c}`.trim(), children: [
    (i || l) && /* @__PURE__ */ s("div", { className: "tui-progress__label-row", children: [
      i && /* @__PURE__ */ t("span", { children: i }),
      l && /* @__PURE__ */ s("span", { children: [
        Math.round(n),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        className: "tui-progress__track",
        role: "progressbar",
        "aria-valuenow": e,
        "aria-valuemin": 0,
        "aria-valuemax": r,
        "aria-label": i,
        children: /* @__PURE__ */ t(
          "div",
          {
            className: `tui-progress__fill tui-progress__fill--${a}`,
            style: { width: `${n}%` }
          }
        )
      }
    )
  ] });
}
function C({ keys: e, separator: r = "+", className: i = "" }) {
  return /* @__PURE__ */ t("span", { className: `tui-kbd ${i}`.trim(), "aria-label": e.join(` ${r} `), children: e.map((l, a) => /* @__PURE__ */ s(p.Fragment, { children: [
    a > 0 && /* @__PURE__ */ t("span", { className: "tui-kbd__sep", "aria-hidden": "true", children: r }),
    /* @__PURE__ */ t("kbd", { children: l })
  ] }, a)) });
}
function R({
  variant: e = "default",
  loading: r = !1,
  children: i,
  className: l = "",
  disabled: a,
  ...c
}) {
  const n = e !== "default" ? ` tui-${e}` : "";
  return /* @__PURE__ */ s(
    "button",
    {
      className: `tui-btn${n} ${l}`.trim(),
      disabled: a || r,
      ...c,
      children: [
        r && /* @__PURE__ */ t("span", { className: "tui-spinner", "aria-hidden": "true" }),
        i
      ]
    }
  );
}
function w({
  variant: e,
  number: r,
  label: i,
  selected: l = !1,
  onClick: a,
  className: c = ""
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "button",
      tabIndex: 0,
      "aria-pressed": l,
      className: `tui-select-card tui-${e}${l ? " is-selected" : ""} ${c}`.trim(),
      onClick: a,
      onKeyDown: (n) => (n.key === "Enter" || n.key === " ") && (a == null ? void 0 : a()),
      children: [
        /* @__PURE__ */ t("div", { className: "tui-select-card__number", children: r }),
        /* @__PURE__ */ t("div", { className: "tui-select-card__label", children: i })
      ]
    }
  );
}
export {
  j as ALL_THEMES,
  B as TERMINAL_DARK,
  P as TERMINAL_LIGHT,
  R as TerminalButton,
  I as TerminalCommandBar,
  C as TerminalKbd,
  S as TerminalMetric,
  x as TerminalPanel,
  M as TerminalProgressBar,
  w as TerminalSelectCard,
  y as TerminalShell,
  k as TerminalStatusTag,
  A as TerminalTable,
  E as TerminalTabs,
  g as TerminalTitlebar,
  L as TerminalToast,
  H as tokensToCss,
  z as tokensToIterm
};
