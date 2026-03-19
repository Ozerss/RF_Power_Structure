# Project Notes

## Local Launch

The app now loads its content from `data/*.json` via `fetch`.
Because of that, opening [`index.html`](/Users/alexanderlopatin/Desktop/PS/index.html) directly with `file://` may block data loading in the browser.

Run it through a simple local server instead, for example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```
