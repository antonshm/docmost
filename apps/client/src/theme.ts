import {
  Badge,
  createTheme,
  CSSVariablesResolver,
  MantineColorsTuple,
  Tabs,
  Tooltip,
  v8CssVariablesResolver,
} from "@mantine/core";

const blue: MantineColorsTuple = [
  "#e7f3ff",
  "#d0e4ff",
  "#a1c6fa",
  "#6ea6f6",
  "#458bf2",
  "#2b7af1",
  "#0b60d8",
  "#1b72f2",
  "#0056c1",
  "#004aac",
];

const red: MantineColorsTuple = [
  "#ffebeb",
  "#fad7d7",
  "#eeadad",
  "#e3807f",
  "#da5a59",
  "#d54241",
  "#d43535",
  "#bc2727",
  "#a82022",
  "#93151b",
];

// ЦТиП "Bento" brand system (Projects_Orca/brandbook/ai_team_book.html):
// mint green accent. Anchors from the brandbook are marked; the rest are
// interpolated to fill Mantine's required 10 steps.
const mint: MantineColorsTuple = [
  "#F1F8F3", // mint-tint (brandbook anchor)
  "#DCF0E4",
  "#B8E2C8",
  "#8ED3A9",
  "#5FC189",
  "#34C77B", // mint-soft (brandbook anchor)
  "#1E9E62", // mint — brand primary (brandbook anchor)
  "#0E7A46", // deep (brandbook anchor)
  "#0B5C36", // em-900 compat (brandbook anchor)
  "#073D24",
];

export const theme = createTheme({
  colors: {
    blue,
    red,
    mint,
  },
  primaryColor: "mint",
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: 'sm',
  // "Bento" direction (see apps/client/PRODUCT.md): Manrope for interface
  // text, IBM Plex Mono for eyebrows/labels and tabular data.
  fontFamily: '"Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
  fontFamilyMonospace: '"IBM Plex Mono", ui-monospace, "SF Mono", monospace',
  components: {
    Tooltip: Tooltip.extend({
      defaultProps: {
        events: { hover: true, focus: true, touch: false },
      },
    }),
    // Size badges to their content; fit-content collapses inside table cells.
    Badge: Badge.extend({
      styles: (_theme, props) => ({
        root:
          props.fullWidth || props.circle
            ? {}
            : { width: "max-content", maxWidth: "100%" },
      }),
    }),
    Tabs: Tabs.extend({
      vars: (theme, props) => ({
        root: {
          ...(props.color === "dark" && {
            "--tabs-color": "var(--mantine-color-dark-default)",
          }),
        },
      }),
    }),
  },
  /***
  components: {
    ActionIcon: ActionIcon.extend({
      vars: (_theme, props) => {
        return {
          root: {
            ...(props.variant === "subtle" &&
              props.color === "dark" && {
                "--ai-color": "var(--mantine-color-default-color)",
                "--ai-hover": "var(--mantine-color-default-hover)",
              }),
          },
        };
      },
    }),
  },
  ***/
});

export const mantineCssResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    ...v8CssVariablesResolver(theme).variables,
    "--input-error-size": theme.fontSizes.sm,
  },
  light: {
    ...v8CssVariablesResolver(theme).light,
    // "Bento" shell tokens (apps/client/PRODUCT.md): the app shell — header
    // and primary/settings sidebar — reads from these instead of Mantine's
    // gray scale, so it follows the brandbook exactly in both themes. See
    // the direction contract in global-sidebar.module.css.
    "--shell-bg": "#F5F6F4", // brandbook --bg
    "--shell-active-bg": "#F1F8F3", // brandbook --mint-tint
    "--shell-hover-bg": "rgba(23,28,24,.05)",
    "--shell-text": "#171B18", // brandbook --ink
    "--shell-text-dim": "#6C7470", // brandbook --mut
    "--shell-accent-text": "#0E7A46", // brandbook --deep
    "--shell-border": "#E4E7E2", // brandbook --line
    // ЦТиП brand neutrals: dimmed text matches brandbook --mut.
    "--mantine-color-dimmed": "#6C7470",
    "--mantine-color-dark-light-color": "#4e5359",
    "--mantine-color-dark-light-hover": "var(--mantine-color-gray-light-hover)",
    // Override the semantic error color so input error text / borders /
    // required asterisks meet WCAG AA 4.5:1 contrast on the filled-input
    // background (#f1f3f5). red.6 (#d43535) lands at 4.36:1; red.7 (#bc2727)
    // gives ~5.7:1. Does not affect other red usages.
    "--mantine-color-error": "var(--mantine-color-red-7)",
    // Bump subtle-gray icon/text color from gray.6 (#868e96, 2.99:1 on filled
    // input — fails WCAG AA 3:1 for non-text) to gray.7 (#495057, 7.35:1).
    // Affects ActionIcon variant="subtle" color="gray" (password visibility
    // toggle, row action menus, etc.).
    "--mantine-color-gray-light-color": "var(--mantine-color-gray-7)",
    // Bump input placeholder color from gray.5 (#adb5bd, 1.87:1 on filled
    // input — fails WCAG AA 4.5:1) to #686868 (5.01:1 on filled, 5.57:1 on
    // white). Halfway between Mantine's gray.6 and gray.7 so the placeholder
    // stays visually distinct from real text while clearing the bar with a
    // safe margin. Affects placeholders across all Mantine inputs.
    "--mantine-color-placeholder": "#686868",
    // Bump variant="light" red text from red.6 (#d43535, 4.17:1 on the
    // 10% red-over-white blended pink background — fails WCAG AA 4.5:1)
    // to red.7 (#bc2727, 5.26:1). Affects every <Button color="red"
    // variant="light"> and matching Badge / Text usages (destructive
    // actions, red badges).
    "--mantine-color-red-light-color": "var(--mantine-color-red-7)",
    // Bump variant="light" green text. Green is inherently bright in
    // luminance, so even Mantine's green.9 (#2b8a3e, 3.78:1) fails 4.5:1
    // on the light-green bg. Use a custom dark green (#1b5e20, Material
    // green 900) outside the standard palette range. New contrast:
    // ~6.8:1. Affects every <Badge color="green" variant="light"> and
    // matching Button / Text usages.
    "--mantine-color-green-light-color": "#1B5E20",
    "--mantine-color-orange-light-color": "#a63508",
  },
  dark: {
    ...v8CssVariablesResolver(theme).dark,
    // "Bento" shell tokens, dark theme — same brand language as light
    // (mint accent, warm-neutral ink), inverted rather than a generic gray
    // dark mode. Anchored on the brandbook's own "ink-tile" dark accent.
    "--shell-bg": "#171B18", // brandbook --ink, reused as the dark ground
    "--shell-active-bg": "rgba(30,158,98,.16)",
    "--shell-hover-bg": "rgba(255,255,255,.06)",
    "--shell-text": "#EAEFEA",
    "--shell-text-dim": "#8C948D",
    "--shell-accent-text": "#34C77B", // brandbook --mint-soft
    "--shell-border": "rgba(255,255,255,.09)",
    "--mantine-color-dark-light-color": "var(--mantine-color-gray-4)",
    "--mantine-color-dark-light-hover": "var(--mantine-color-default-hover)",
  },
});
