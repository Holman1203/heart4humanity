/* @ds-bundle: {"format":3,"namespace":"DesignSystem_54d3cd","components":[{"name":"Avatar","sourcePath":"components/Avatar/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/Avatar/Avatar.jsx"},{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"Checkbox","sourcePath":"components/Form/Checkbox.jsx"},{"name":"Input","sourcePath":"components/Form/Input.jsx"},{"name":"Select","sourcePath":"components/Form/Select.jsx"},{"name":"Textarea","sourcePath":"components/Form/Textarea.jsx"},{"name":"Table","sourcePath":"components/Table/Table.jsx"}],"sourceHashes":{"components/Avatar/Avatar.jsx":"cf189dce54bf","components/Button/Button.jsx":"f08bcaf3bfc0","components/Form/Checkbox.jsx":"2440f2a505e3","components/Form/Input.jsx":"ee072eea48d5","components/Form/Select.jsx":"44bddeaf45d0","components/Form/Textarea.jsx":"16f1cf0c8001","components/Table/Table.jsx":"027d603e4f89"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_54d3cd = window.DesignSystem_54d3cd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Avatar/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function initialsFrom(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Avatar — user image with graceful initials fallback, sizes,
 * shape, and an optional presence status dot.
 */
function Avatar({
  src = null,
  name = '',
  alt,
  size = 'md',
  square = false,
  status = null,
  className = '',
  ...rest
}) {
  const cls = ['ds-avatar', `ds-avatar--${size}`, square ? 'ds-avatar--square' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    role: "img",
    "aria-label": alt || name || 'avatar'
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || name
  }) : /*#__PURE__*/React.createElement("span", {
    className: "ds-avatar__initials",
    "aria-hidden": "true"
  }, initialsFrom(name)), status ? /*#__PURE__*/React.createElement("span", {
    className: `ds-avatar__status ds-avatar__status--${status}`
  }) : null);
}

/**
 * AvatarGroup — overlapping stack of avatars with an optional
 * "+N" overflow chip.
 */
function AvatarGroup({
  children,
  max = null,
  size = 'md',
  className = ''
}) {
  const items = React.Children.toArray(children);
  const shown = max ? items.slice(0, max) : items;
  const extra = max ? items.length - shown.length : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: ['ds-avatar-group', className].filter(Boolean).join(' ')
  }, shown, extra > 0 ? /*#__PURE__*/React.createElement("span", {
    className: `ds-avatar ds-avatar--${size} ds-avatar--more`
  }, "+", extra) : null);
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action control.
 *
 * Variants cover the full corporate UI hierarchy; sizes map to the
 * 8px rhythm. Renders a real <button> and forwards native props.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const cls = ['ds-btn', `ds-btn--${variant}`, `ds-btn--${size}`, block ? 'ds-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "ds-btn__icon",
    "aria-hidden": "true"
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "ds-btn__icon",
    "aria-hidden": "true"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/Form/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — native checkbox with an inline label, tinted with the
 * brand accent color.
 */
function Checkbox({
  label,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || `chk-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    className: ['ds-check', className].filter(Boolean).join(' '),
    htmlFor: fieldId
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: "checkbox"
  }, rest)), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Form/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/Form/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field with optional helper text, error state,
 * and a leading icon. Wraps a native <input> in a .ds-field.
 */
function Input({
  label,
  id,
  help,
  error,
  required = false,
  iconLeft = null,
  className = '',
  ...rest
}) {
  const fieldId = id || `inp-${Math.random().toString(36).slice(2, 8)}`;
  const fieldCls = ['ds-field', error ? 'ds-field--error' : '', className].filter(Boolean).join(' ');
  const control = /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: "ds-input",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": help || error ? `${fieldId}-help` : undefined
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: fieldCls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ds-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ds-required"
  }, "*") : null) : null, iconLeft ? /*#__PURE__*/React.createElement("div", {
    className: "ds-input-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-input-addon",
    "aria-hidden": "true"
  }, iconLeft), control) : control, error || help ? /*#__PURE__*/React.createElement("span", {
    className: "ds-help",
    id: `${fieldId}-help`
  }, error || help) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Form/Input.jsx", error: String((e && e.message) || e) }); }

// components/Form/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — labelled dropdown built on a native <select> with a custom
 * chevron. Pass options as [{ value, label }] or supply children.
 */
function Select({
  label,
  id,
  help,
  error,
  required = false,
  options = null,
  placeholder = null,
  children,
  className = '',
  ...rest
}) {
  const fieldId = id || `sel-${Math.random().toString(36).slice(2, 8)}`;
  const fieldCls = ['ds-field', error ? 'ds-field--error' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: fieldCls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ds-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ds-required"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: "ds-select",
    "aria-invalid": error ? true : undefined
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options ? options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), error || help ? /*#__PURE__*/React.createElement("span", {
    className: "ds-help"
  }, error || help) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Form/Select.jsx", error: String((e && e.message) || e) }); }

// components/Form/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Textarea — multi-line text field with label / helper / error,
 * matching Input's anatomy.
 */
function Textarea({
  label,
  id,
  help,
  error,
  required = false,
  rows = 4,
  className = '',
  ...rest
}) {
  const fieldId = id || `ta-${Math.random().toString(36).slice(2, 8)}`;
  const fieldCls = ['ds-field', error ? 'ds-field--error' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: fieldCls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ds-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ds-required"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    className: "ds-textarea",
    rows: rows,
    "aria-invalid": error ? true : undefined
  }, rest)), error || help ? /*#__PURE__*/React.createElement("span", {
    className: "ds-help"
  }, error || help) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Form/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/Table/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Table — data table with optional row hover / zebra striping.
 *
 * Declarative API: pass `columns` ([{ key, header, align, render }])
 * and `data` (array of row objects). For full control, pass children
 * instead and the component just supplies the styled shell.
 */
function Table({
  columns = null,
  data = null,
  hover = true,
  striped = false,
  rowKey = 'id',
  children,
  className = '',
  ...rest
}) {
  const tableCls = ['ds-table', hover ? 'ds-table--hover' : '', striped ? 'ds-table--striped' : '', className].filter(Boolean).join(' ');
  const alignClass = a => a === 'right' ? 'ds-td-right' : a === 'num' ? 'ds-td-num' : '';
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-table-wrap"
  }, /*#__PURE__*/React.createElement("table", _extends({
    className: tableCls
  }, rest), columns ? /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    className: alignClass(c.align)
  }, c.header)))) : null, columns && data ? /*#__PURE__*/React.createElement("tbody", null, data.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row[rowKey] ?? i
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: alignClass(c.align)
  }, c.render ? c.render(row[c.key], row) : row[c.key]))))) : children));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Table/Table.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Table = __ds_scope.Table;

})();
