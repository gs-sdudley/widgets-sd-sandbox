# Gainsight Widget Guardrails Review

Review the current working diff (or a specified file/directory) against the Gainsight Custom Widget v2 customization guardrails. Report violations by severity, with file locations and remediation guidance.

## How to invoke

```
/gs-review              # reviews git diff (staged + unstaged changes)
/gs-review <path>       # reviews a specific file or directory
```

## Execution steps

1. **Gather the diff or target files.**
   - If no path argument: run `git diff HEAD` to get all uncommitted changes. If the working tree is clean, run `git diff HEAD~1` to review the latest commit.
   - If a path is provided: read those files directly.

2. **Classify each file by type** (CSS, JS/TS, HTML/SSI template, widget JSON/config, other) and apply the relevant rule set below.

3. **Report findings** grouped by severity:
   - **HARD BLOCK** — Non-negotiable violations that must be fixed before shipping.
   - **CAUTION** — Allowed but risky patterns; flag with a specific explanation of the risk.
   - **INFO** — Observations worth noting but not blocking.

   For each finding include: severity label, file path + line number, the offending snippet, and a one-sentence fix suggestion.

4. **Print a summary line** at the end: `N hard blocks, M cautions, K info items.`

---

## Guardrail rule sets

### Tier classification (apply to overall approach)
- **Safe** (no comment needed): out-of-the-box config, no-code builder widgets, SSI header/footer, extension-framework custom widgets.
- **Caution** (flag if present): custom CSS for styling only, simple JS without DOM manipulation, custom icons.
- **Avoid → HARD BLOCK**: DOM manipulation/restructuring, overriding core UX behaviors, JS redirects or non-standard navigation, code dependent on internal DOM structure or CSS class names.

### CSS rules
CAUTION if:
- Selectors target internal platform class names (heuristic: class names that look auto-generated, prefixed with platform namespaces, or not defined in the widget's own source).
- Rules use `display:none` or `visibility:hidden` on elements the widget did not create (accessibility risk).
- Rules rewrite layout (`grid`, `flex` changes) on containers outside the widget's own root element.
- Rules use broad/unscoped selectors (e.g., `body`, `*`, `.post`, `.topic`) that could bleed into shared components.

HARD BLOCK if:
- CSS overrides core interaction behaviors (disabling focus rings, overriding pointer-events on interactive elements, etc.).

### JavaScript / TypeScript rules
CAUTION if:
- Script is loaded synchronously (no `async` or `defer` on `<script>` tags; or a top-level `import` of a heavy library like jQuery or Bootstrap).
- DOM queries (`querySelector`, `getElementById`, etc.) are not guarded with existence checks before use.
- Variables or functions are declared in global scope without namespacing.
- `try/catch` is absent around third-party or DOM-touching code.

HARD BLOCK if:
- Code moves, removes, or restructures elements rendered by the platform (e.g., `appendChild`, `removeChild`, `innerHTML` rewrites on non-widget-owned nodes).
- Code implements a custom create-post or create-topic flow.
- Code performs JS-based redirects (`window.location =`, `location.replace`, `history.pushState` altering core navigation).
- Code depends on internal CSS class names (string literals that look like platform-internal selectors).
- Heavy library imports are present (jQuery, Bootstrap, Lodash unless already bundled by the platform).

### SSI / HTML template rules
CAUTION if:
- Customizations are not wrapped in a dedicated, isolated container element.
- External framework scripts are imported.
- External resource sources have not been security-reviewed (flag any `src=` pointing to third-party CDNs for human review).

HARD BLOCK if:
- SSI includes modify or wrap platform-rendered DOM outside a dedicated container.
- No graceful-degradation handling is present for when the include fails (critical layout breakage risk).

### General defensive coding checks (JS/TS)
Apply to all JS/TS files:
- Flag any missing `async`/`defer` on injected scripts.
- Flag DOM reads without null checks.
- Flag broad event listeners attached to `document` or `window` without cleanup.
- Flag inline `<script>` blocks that could collide with platform scripts.

---

## Output format

```
## Gainsight Guardrails Review

### HARD BLOCKS (must fix)
- [path:line] — <description> → <fix>

### CAUTIONS (review before shipping)
- [path:line] — <description> → <fix>

### INFO
- [path:line] — <description>

---
N hard blocks, M cautions, K info items.
```

If there are no findings in a section, omit that section. If there are zero findings total, say so explicitly.
