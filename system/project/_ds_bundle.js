/* @ds-bundle: {"format":4,"namespace":"HarvestDesignSystem_eb006c","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"TextLink","sourcePath":"components/actions/TextLink.jsx"},{"name":"HeroWash","sourcePath":"components/brand/HeroWash.jsx"},{"name":"LogoCircle","sourcePath":"components/brand/LogoCircle.jsx"},{"name":"NavBar","sourcePath":"components/brand/NavBar.jsx"},{"name":"PreviewCard","sourcePath":"components/brand/PreviewCard.jsx"},{"name":"TrustLogoRow","sourcePath":"components/brand/TrustLogoRow.jsx"},{"name":"FeatureCard","sourcePath":"components/content/FeatureCard.jsx"},{"name":"FeatureSplit","sourcePath":"components/content/FeatureSplit.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"Notice","sourcePath":"components/feedback/Notice.jsx"},{"name":"StepIndicator","sourcePath":"components/feedback/StepIndicator.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Tag","sourcePath":"components/forms/Tag.jsx"},{"name":"Icon","sourcePath":"components/media/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/media/Icon.jsx"}],"sourceHashes":{"assets/image-slot.js":"4cffaf8e50f6","components/actions/Button.jsx":"25b96d0ca37e","components/actions/TextLink.jsx":"e5feb283e0d4","components/brand/HeroWash.jsx":"35802e76538c","components/brand/LogoCircle.jsx":"448c8b250402","components/brand/NavBar.jsx":"a5beacd8083d","components/brand/PreviewCard.jsx":"45d3937d7ea1","components/brand/TrustLogoRow.jsx":"38c1c7a127c4","components/content/FeatureCard.jsx":"af42f3de6179","components/content/FeatureSplit.jsx":"84cd46b48119","components/content/SectionHeading.jsx":"bb03e38a54fa","components/feedback/Notice.jsx":"7523d124651f","components/feedback/StepIndicator.jsx":"ffebc1b61a72","components/forms/Input.jsx":"3dd4d345263e","components/forms/Tag.jsx":"397836fd411f","components/media/Icon.jsx":"173797954afa","ui_kits/space-name-contest/ApplicantInfoScreen.jsx":"922412dcfd8e","ui_kits/space-name-contest/CompleteScreen.jsx":"9b21ff396d18","ui_kits/space-name-contest/IntroScreen.jsx":"f3bdecb0b776","ui_kits/space-name-contest/LookupScreen.jsx":"aa44c1d54229","ui_kits/space-name-contest/NameSubmissionScreen.jsx":"2f5f1e861935","ui_kits/space-name-contest/Shell.jsx":"f2ed7989b62f","ui_kits/space-name-contest/SpaceCard.jsx":"b1dc8a69d53f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HarvestDesignSystem_eb006c = window.HarvestDesignSystem_eb006c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *   credit       Optional attribution text (e.g. 'Photo by Jane Doe on
 *                Unsplash') shown as a small overlay at the bottom-left of
 *                the filled slot. It belongs to the src image, so it only
 *                shows while src is what's displayed — a user-dropped
 *                image hides it.
 *   credit-href  Optional link for the credit overlay (e.g. the
 *                photographer's profile). http(s) URLs only — anything
 *                else renders the credit as plain text.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' + '.credit[href]:hover{background:rgba(0,0,0,.8);text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      '<a class="credit" part="credit" target="_blank" rel="noopener noreferrer"></a>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._credit = root.querySelector('.credit');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + http(s)-only href keep external strings inert.
      const credit = this.getAttribute('credit');
      const showCredit = !!(url && credit && !this._userUrl);
      if (showCredit) {
        this._credit.textContent = credit;
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') href = u.href;
          } catch {}
        }
        if (href) this._credit.setAttribute('href', href);else this._credit.removeAttribute('href');
      } else {
        this._credit.textContent = '';
        this._credit.removeAttribute('href');
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/image-slot.js", error: String((e && e.message) || e) }); }

// components/brand/HeroWash.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * HeroWash — the decorative flowing warm gradient behind hero content. A soft
 * wash of orange / marigold / peach as blurred organic blobs, low opacity, so it
 * suggests warmth and motion without ever competing with text. Absolutely
 * positioned; place it inside a `position: relative` hero with content above it.
 */
function HeroWash({
  intensity = 1,
  style,
  ...rest
}) {
  const a = Math.max(0, Math.min(1, intensity));
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "-15%",
      left: "50%",
      width: "min(1100px, 120%)",
      height: "120%",
      transform: "translateX(-50%)",
      background: "radial-gradient(42% 55% at 32% 38%, rgba(250, 93, 0, " + 0.28 * a + ") 0%, rgba(250,93,0,0) 70%)," + "radial-gradient(46% 60% at 70% 32%, rgba(254, 227, 181, " + 0.85 * a + ") 0%, rgba(254,227,181,0) 72%)," + "radial-gradient(50% 60% at 55% 72%, rgba(255, 173, 122, " + 0.45 * a + ") 0%, rgba(255,173,122,0) 70%)",
      filter: "blur(28px)"
    }
  }));
}
Object.assign(__ds_scope, { HeroWash });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/HeroWash.jsx", error: String((e && e.message) || e) }); }

// components/brand/LogoCircle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LogoCircle — round white badge for a third-party app logo (integration row).
 * Logos are literal brand marks — the one place external colour enters the
 * system. Pass an <img>, letter, or Icon as children.
 */
function LogoCircle({
  size = 48,
  children,
  label,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    title: label,
    "aria-label": label,
    style: {
      width: size,
      height: size,
      borderRadius: "var(--radius-full)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-sm)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flex: "0 0 auto",
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      color: "var(--text-secondary)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { LogoCircle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoCircle.jsx", error: String((e && e.message) || e) }); }

// components/brand/PreviewCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PreviewCard — white container that frames a product screenshot as floating
 * social proof. 16px radius, warm shadow; optional slight tilt for the hero
 * "floating cards" arrangement.
 */
function PreviewCard({
  children,
  tilt = 0,
  padded = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-images)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden",
      padding: padded ? 16 : 0,
      transform: tilt ? `rotate(${tilt}deg)` : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { PreviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PreviewCard.jsx", error: String((e && e.message) || e) }); }

// components/brand/TrustLogoRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TrustLogoRow — grayscale partner-logo strip under a small uppercase label
 * ("TRUSTED BY 70,000+ COMPANIES"). Logos render in ink grayscale at reduced
 * opacity so the orange accent stays the only chromatic focal point. The number
 * in the label may carry orange.
 *
 * No real partner marks ship here, so string entries render as ghosted wordmarks.
 */
function TrustLogoRow({
  label,
  logos = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24,
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--text-secondary)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      opacity: 0.7
    }
  }, logos.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "var(--text-primary)",
      filter: "grayscale(1)"
    }
  }, l))));
}
Object.assign(__ds_scope, { TrustLogoRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/TrustLogoRow.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TITLE_SIZES = {
  "heading-lg": {
    fontSize: "var(--text-heading-lg)",
    lineHeight: "var(--leading-heading-lg)"
  },
  title: {
    fontSize: "var(--text-title)",
    lineHeight: "var(--leading-title)"
  },
  display: {
    fontSize: "var(--text-display)",
    lineHeight: "var(--leading-display)"
  }
};

/**
 * SectionHeading — the reusable section header: small uppercase orange eyebrow,
 * large ink title (max-width ~700px), optional secondary subtitle.
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleSize = "title",
  as: As = "h2",
  style,
  ...rest
}) {
  const ts = TITLE_SIZES[titleSize] || TITLE_SIZES.title;
  const centered = align === "center";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: centered ? "center" : "flex-start",
      textAlign: centered ? "center" : "left",
      maxWidth: 720,
      marginLeft: centered ? "auto" : 0,
      marginRight: centered ? "auto" : 0,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm, 14px)",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--accent)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement(As, {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      color: "var(--text-primary)",
      letterSpacing: "0.36px",
      ...ts
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 620,
      fontFamily: "var(--font-sans)",
      fontSize: "17px",
      lineHeight: 1.5,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, subtitle) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/media/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Curated icon set — Lucide (outline, 2px, geometric) inlined so color is
 * controlled via `currentColor` and no runtime CDN fetch is needed.
 * Lucide stands in for Harvest's proprietary custom icons; see readme
 * ICONOGRAPHY. Add more by dropping the SVG inner markup here.
 */
const ICONS = {
  "arrow-left": "<path d=\"m12 19-7-7 7-7\"></path> <path d=\"M19 12H5\"></path>",
  "arrow-right": "<path d=\"M5 12h14\"></path> <path d=\"m12 5 7 7-7 7\"></path>",
  "calendar": "<path d=\"M8 2v4\"></path> <path d=\"M16 2v4\"></path> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect> <path d=\"M3 10h18\"></path>",
  "calendar-check": "<path d=\"M8 2v4\"></path> <path d=\"M16 2v4\"></path> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect> <path d=\"M3 10h18\"></path> <path d=\"m9 16 2 2 4-4\"></path>",
  "chart-pie": "<path d=\"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z\"></path> <path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\"></path>",
  "check": "<path d=\"M20 6 9 17l-5-5\"></path>",
  "check-check": "<path d=\"M18 6 7 17l-5-5\"></path> <path d=\"m22 10-7.5 7.5L13 16\"></path>",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\"></path>",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\"></path>",
  "church": "<path d=\"M10 9h4\"></path> <path d=\"M12 7v5\"></path> <path d=\"M14 21v-3a2 2 0 0 0-4 0v3\"></path> <path d=\"m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9\"></path> <path d=\"M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14\"></path>",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle> <path d=\"m9 12 2 2 4-4\"></path>",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle> <path d=\"M12 6v6l4 2\"></path>",
  "heart": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\"></path>",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle> <path d=\"M12 16v-4\"></path> <path d=\"M12 8h.01\"></path>",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"></rect> <path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>",
  "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"></path> <circle cx=\"12\" cy=\"10\" r=\"3\"></circle>",
  "pencil": "<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"></path> <path d=\"m15 5 4 4\"></path>",
  "phone": "<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\"></path>",
  "plus": "<path d=\"M5 12h14\"></path> <path d=\"M12 5v14\"></path>",
  "receipt": "<path d=\"M12 17V7\"></path> <path d=\"M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8\"></path> <path d=\"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z\"></path>",
  "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path> <path d=\"M20 2v4\"></path> <path d=\"M22 4h-4\"></path> <circle cx=\"4\" cy=\"20\" r=\"2\"></circle>",
  "square-pen": "<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"></path> <path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"></path>",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"></path> <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path> <path d=\"M16 3.128a4 4 0 0 1 0 7.744\"></path> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path> <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>",
  "vote": "<path d=\"m9 12 2 2 4-4\"></path> <path d=\"M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z\"></path> <path d=\"M22 19H2\"></path>",
  "x": "<path d=\"M18 6 6 18\"></path> <path d=\"m6 6 12 12\"></path>"
};

/**
 * Icon — renders a Lucide glyph inline. Stroke follows `currentColor`, so an
 * icon inside orange text is orange; inside a filled button set color:#fff.
 */
function Icon({
  name,
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  title,
  className,
  style,
  ...rest
}) {
  const inner = ICONS[name];
  if (!inner) {
    if (typeof console !== "undefined") console.warn("[Icon] unknown icon:", name);
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      display: "block",
      flex: "0 0 auto",
      ...style
    },
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : "true",
    "aria-label": title,
    dangerouslySetInnerHTML: {
      __html: (title ? `<title>${title}</title> ` : "") + inner
    }
  }, rest));
}

/** Names available in the bundled set (for docs / editor hints). */
const ICON_NAMES = Object.keys(ICONS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    fontSize: "var(--text-caption)",
    padding: "8px 16px",
    gap: 6,
    icon: 16,
    minH: 36
  },
  md: {
    fontSize: "var(--text-body)",
    padding: "12px 24px",
    gap: 8,
    icon: 18,
    minH: 44
  },
  lg: {
    fontSize: "17px",
    padding: "15px 30px",
    gap: 8,
    icon: 20,
    minH: 52
  }
};
function variantStyle(variant, {
  hover,
  active,
  disabled
}) {
  if (variant === "secondary") {
    return {
      background: active ? "var(--surface-page)" : "var(--surface-card)",
      color: "var(--text-primary)",
      border: `1px solid ${hover ? "var(--text-primary)" : "var(--border-input)"}`,
      boxShadow: disabled ? "none" : "var(--shadow-sm)"
    };
  }
  if (variant === "ghost") {
    return {
      background: hover ? "rgba(250, 93, 0, 0.08)" : "transparent",
      color: active ? "var(--accent-active)" : "var(--accent)",
      border: "1px solid transparent",
      boxShadow: "none"
    };
  }
  // primary
  return {
    background: active ? "var(--accent-active)" : hover ? "var(--accent-hover)" : "var(--accent)",
    color: "var(--text-on-accent)",
    border: "1px solid transparent",
    boxShadow: disabled ? "none" : "var(--shadow-sm)"
  };
}

/**
 * Button — the system's primary interactive element. `primary` is the single
 * orange CTA; `secondary` is a bordered white button; `ghost` is a low-emphasis
 * text-weight action.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = variantStyle(variant, {
    hover: hover && !disabled,
    active: active && !disabled,
    disabled
  });
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      minHeight: s.minH,
      padding: s.padding,
      fontFamily: "var(--font-sans)",
      fontSize: s.fontSize,
      fontWeight: variant === "ghost" ? 500 : 600,
      letterSpacing: "0.015em",
      lineHeight: 1,
      borderRadius: "var(--radius-buttons)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      transition: "background 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
      outline: "none",
      WebkitTapHighlightColor: "transparent",
      ...v,
      ...style
    }
  }, rest), leftIcon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leftIcon,
    size: s.icon
  }) : null, children != null ? /*#__PURE__*/React.createElement("span", null, children) : null, rightIcon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: rightIcon,
    size: s.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TextLink — the secondary "더 알아보기 →" action. Orange, weight 500, no chrome;
 * underline appears on hover. Optional trailing arrow.
 */
function TextLink({
  children,
  href = "#",
  withArrow = true,
  size = "md",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const fontSize = size === "sm" ? "var(--text-caption)" : "var(--text-body)";
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: hover ? "var(--accent-hover)" : "var(--text-link)",
      fontFamily: "var(--font-sans)",
      fontSize,
      fontWeight: 500,
      letterSpacing: "0.015em",
      textDecoration: hover ? "underline" : "none",
      textUnderlineOffset: 3,
      cursor: "pointer",
      transition: "color 140ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, children), withArrow ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: size === "sm" ? 15 : 17,
    style: {
      transform: hover ? "translateX(2px)" : "none",
      transition: "transform 140ms ease"
    }
  }) : null);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/brand/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NavBar — slim sticky top navigation: brand left, centre links, sign-in ghost +
 * primary CTA right. Background is cream (never white) with a hairline underline.
 *
 * No Harvest logo asset ships with this system, so `brand` defaults to a plain
 * type wordmark. Pass a node to `brand` to supply a real mark.
 */
function NavBar({
  brand = "harvest",
  links = [],
  signInLabel = "Sign in",
  onSignIn,
  ctaLabel = "Try Harvest free",
  onCta,
  sticky = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: sticky ? "sticky" : "static",
      top: 0,
      zIndex: 20,
      background: "var(--surface-page)",
      borderBottom: "1px solid var(--border-divider)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("nav", {
    style: {
      maxWidth: "var(--page-max-width)",
      margin: "0 auto",
      height: 68,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flex: "0 0 auto"
    }
  }, typeof brand === "string" ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "var(--accent)"
    }
  }, brand) : brand), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      listStyle: "none",
      margin: 0,
      padding: 0,
      flex: "1 1 auto"
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || "#",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      fontWeight: 500,
      letterSpacing: "0.015em",
      color: "var(--text-primary)",
      textDecoration: "none"
    }
  }, l.label, l.hasMenu ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  }) : null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flex: "0 0 auto"
    }
  }, signInLabel ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    onClick: onSignIn
  }, signInLabel) : null, ctaLabel ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: onCta
  }, ctaLabel) : null)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/content/FeatureCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FeatureCard — three-up highlight card: dark 48px icon, heading, body, optional
 * orange link. Depth comes from a warm-glow shadow, not from contrast.
 */
function FeatureCard({
  icon,
  title,
  body,
  linkText,
  href = "#",
  surface = "card",
  elevated = true,
  style,
  children,
  ...rest
}) {
  const bg = surface === "canvas" ? "var(--surface-page)" : "var(--surface-card)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      background: bg,
      borderRadius: "var(--radius-cards)",
      padding: "40px 32px",
      boxShadow: elevated ? "var(--shadow-card)" : "none",
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      display: "inline-flex"
    }
  }, typeof icon === "string" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 44,
    strokeWidth: 1.75
  }) : icon) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-heading-sm)",
      fontWeight: 600,
      letterSpacing: "0.3px",
      color: "var(--text-primary)"
    }
  }, title) : null, body ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      lineHeight: 1.55,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, body) : null, children, linkText ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: href
  }, linkText)) : null);
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/content/FeatureSplit.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FeatureSplit — alternating two-column block: heading + body (+ optional CTA)
 * on one side, media (screenshot / illustration / image slot) on the other.
 * Set `reverse` to flip sides for section-to-section rhythm.
 */
function FeatureSplit({
  eyebrow,
  title,
  body,
  ctaLabel,
  onCta,
  reverse = false,
  media,
  gap = 48,
  style,
  children,
  ...rest
}) {
  const text = /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 0",
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 18,
      justifyContent: "center"
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--accent)"
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-title)",
      lineHeight: "var(--leading-title)",
      fontWeight: 500,
      letterSpacing: "0.4px",
      color: "var(--text-primary)"
    }
  }, title) : null, body ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "17px",
      lineHeight: 1.6,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, body) : null, ctaLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    rightIcon: "arrow-right",
    onClick: onCta
  }, ctaLabel)) : null);
  const mediaNode = /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 0",
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, media || children);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap,
      alignItems: "stretch",
      flexDirection: reverse ? "row-reverse" : "row",
      ...style
    }
  }, rest), text, mediaNode);
}
Object.assign(__ds_scope, { FeatureSplit });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FeatureSplit.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Notice.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  info: {
    bg: "var(--surface-card)",
    border: "1px solid var(--border-divider)",
    iconColor: "var(--text-tertiary)",
    defaultIcon: "info"
  },
  accent: {
    bg: "var(--surface-wash)",
    border: "1px solid transparent",
    iconColor: "var(--accent)",
    defaultIcon: "info"
  },
  success: {
    bg: "var(--surface-wash)",
    border: "1px solid transparent",
    iconColor: "var(--accent)",
    defaultIcon: "circle-check"
  }
};

/**
 * Notice — inline callout / alert (e.g. "이미 신청하신 분입니다"). Warm-palette
 * tones only; the accent/success tones sit on a marigold wash with an orange
 * icon rather than a coloured left-border. Optional title, action and close.
 */
function Notice({
  tone = "info",
  title,
  children,
  icon,
  action,
  onClose,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.info;
  const iconName = icon || t.defaultIcon;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      padding: "16px 18px",
      background: t.bg,
      border: t.border,
      borderRadius: "var(--radius-2xl)",
      ...style
    }
  }, rest), iconName ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.iconColor,
      display: "inline-flex",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconName,
    size: 20
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, title ? /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      lineHeight: 1.5,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, children) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "\uB2EB\uAE30",
    style: {
      background: "none",
      border: "none",
      padding: 2,
      cursor: "pointer",
      color: "var(--text-tertiary)",
      display: "inline-flex",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  })) : null);
}
Object.assign(__ds_scope, { Notice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Notice.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StepIndicator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StepIndicator — compact numbered progress for the flow (정보 입력 → 이름 제출).
 * Completed steps fill orange with a check; the current step is outlined orange;
 * upcoming steps are muted.
 */
function StepIndicator({
  steps = [],
  current = 0,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("ol", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 0,
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...style
    }
  }, rest), steps.map((label, i) => {
    const done = i < current;
    const active = i === current;
    const circleStyle = done ? {
      background: "var(--accent)",
      border: "1px solid var(--accent)",
      color: "var(--text-on-accent)"
    } : active ? {
      background: "var(--surface-card)",
      border: "2px solid var(--accent)",
      color: "var(--accent)"
    } : {
      background: "var(--surface-card)",
      border: "1px solid var(--border-input)",
      color: "var(--text-disabled)"
    };
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flex: i < steps.length - 1 ? "1 1 auto" : "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: "var(--radius-full)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 700,
        ...circleStyle
      }
    }, done ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 16
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        fontWeight: active ? 600 : 500,
        letterSpacing: "0.015em",
        color: active ? "var(--text-primary)" : done ? "var(--text-secondary)" : "var(--text-disabled)",
        whiteSpace: "nowrap"
      }
    }, label)), i < steps.length - 1 ? /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "1 1 auto",
        height: 1,
        minWidth: 24,
        background: done ? "var(--accent)" : "var(--border-divider)",
        margin: "0 12px"
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { StepIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StepIndicator.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _uid = 0;

/**
 * Input — labelled text field. White fill, bone border, 16px radius, warm focus
 * ring. Supports label, helper/error text, a leading icon, required marker and
 * disabled state. (The system keeps a single-orange discipline, so validation
 * emphasis is orange + text rather than a separate red.)
 */
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  leftIcon,
  helper,
  error,
  required = false,
  disabled = false,
  id,
  name,
  inputMode,
  maxLength,
  autoComplete,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const rid = React.useMemo(() => id || `hd-input-${++_uid}`, [id]);
  const invalid = Boolean(error);
  const borderColor = invalid ? "var(--accent)" : focus ? "var(--accent)" : "var(--border-input)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: rid,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, " *") : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, leftIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 18,
      display: "inline-flex",
      color: "var(--text-tertiary)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leftIcon,
    size: 20
  })) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: rid,
    name: name,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    required: required,
    inputMode: inputMode,
    maxLength: maxLength,
    autoComplete: autoComplete,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    "aria-invalid": invalid || undefined,
    style: {
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      letterSpacing: "0.015em",
      color: "var(--text-primary)",
      background: disabled ? "var(--surface-page)" : "var(--surface-card)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-inputs)",
      padding: leftIcon ? "14px 20px 14px 48px" : "14px 20px",
      outline: "none",
      boxShadow: focus ? "0 0 0 3px rgba(250, 93, 0, 0.15)" : "none",
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? "not-allowed" : "text",
      transition: "border-color 140ms ease, box-shadow 140ms ease",
      ...inputStyle
    }
  }, rest))), invalid || helper ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      letterSpacing: "0.015em",
      color: invalid ? "var(--accent)" : "var(--text-tertiary)"
    }
  }, invalid ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "info",
    size: 14
  }) : null, invalid ? error : helper) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function toneStyle(tone) {
  switch (tone) {
    case "accent":
      // e.g. 필수 — orange-tinted
      return {
        background: "rgba(250, 93, 0, 0.10)",
        color: "var(--accent)",
        border: "1px solid transparent"
      };
    case "solid":
      // filled orange
      return {
        background: "var(--accent)",
        color: "var(--text-on-accent)",
        border: "1px solid transparent"
      };
    case "wash":
      // atmospheric marigold
      return {
        background: "var(--surface-wash)",
        color: "var(--color-ironwood)",
        border: "1px solid transparent"
      };
    case "outline":
      return {
        background: "transparent",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-input)"
      };
    case "neutral": // e.g. 선택
    default:
      return {
        background: "var(--surface-page)",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-divider)"
      };
  }
}

/**
 * Tag — pill label (999px radius). Use for "필수 / 선택" markers, status chips,
 * and category labels. Tones stay within the warm palette; `accent`/`solid`
 * carry the orange.
 */
function Tag({
  children,
  tone = "neutral",
  size = "md",
  icon,
  style,
  ...rest
}) {
  const t = toneStyle(tone);
  const sm = size === "sm";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: sm ? 4 : 6,
      padding: sm ? "3px 10px" : "5px 14px",
      fontFamily: "var(--font-sans)",
      fontSize: sm ? "12px" : "var(--text-caption)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      lineHeight: 1.2,
      borderRadius: "var(--radius-tags)",
      whiteSpace: "nowrap",
      ...t,
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sm ? 12 : 14
  }) : null, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/space-name-contest/ApplicantInfoScreen.jsx
try { (() => {
/* ApplicantInfoScreen — STEP 1: name + phone, with duplicate detection. */

function ApplicantInfoScreen({
  name,
  phone,
  onNameChange,
  onPhoneChange,
  duplicate,
  onNext,
  onLookup
}) {
  const {
    Button,
    Input,
    Notice,
    StepIndicator
  } = window.HarvestDesignSystem_eb006c;
  const canNext = name.trim().length > 0 && phone.trim().length >= 9;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 26px 34px",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(StepIndicator, {
    steps: ["신청자 정보", "이름 제출"],
    current: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-heading-lg)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, "\uC2E0\uCCAD\uC790 \uC815\uBCF4\uB97C", /*#__PURE__*/React.createElement("br", null), "\uC785\uB825\uD574 \uC8FC\uC138\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      lineHeight: 1.5,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, "\uD578\uB4DC\uD3F0 \uBC88\uD638\uB294 \uC911\uBCF5 \uC2E0\uCCAD \uD655\uC778\uC6A9\uC73C\uB85C\uB9CC \uC0AC\uC6A9\uB3FC\uC694.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\uC774\uB984",
    leftIcon: "user",
    placeholder: "\uD64D\uAE38\uB3D9",
    value: name,
    onChange: e => onNameChange(e.target.value),
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\uC5F0\uB77D\uCC98",
    leftIcon: "phone",
    inputMode: "numeric",
    placeholder: "010-0000-0000",
    value: phone,
    onChange: e => onPhoneChange(e.target.value),
    required: true,
    error: duplicate ? "이미 신청하신 번호입니다." : undefined
  })), duplicate ? /*#__PURE__*/React.createElement(Notice, {
    tone: "accent",
    title: "\uC774\uBBF8 \uC2E0\uCCAD\uD558\uC2E0 \uBD84\uC785\uB2C8\uB2E4",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      leftIcon: "check-check",
      onClick: onLookup
    }, "\uB0B4\uC6A9 \uD655\uC778\uD558\uAE30")
  }, "\uAC19\uC740 \uBC88\uD638\uB85C \uC811\uC218\uB41C \uB0B4\uC5ED\uC774 \uC788\uC5B4\uC694. \uC81C\uCD9C\uD558\uC2E0 \uC774\uB984\uC744 \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC5B4\uC694.") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    rightIcon: "arrow-right",
    disabled: !canNext,
    onClick: onNext
  }, "\uB2E4\uC74C")));
}
window.ApplicantInfoScreen = ApplicantInfoScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/space-name-contest/ApplicantInfoScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/space-name-contest/CompleteScreen.jsx
try { (() => {
/* CompleteScreen — submission confirmation + next-step (offline vote) notice. */

function CompleteScreen({
  onLookup,
  onHome
}) {
  const {
    Button,
    Icon,
    Tag
  } = window.HarvestDesignSystem_eb006c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "40px 30px",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 88,
      height: 88,
      borderRadius: "var(--radius-full)",
      background: "var(--surface-wash)",
      color: "var(--accent)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 46,
    strokeWidth: 1.75
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif-display)",
      fontWeight: 400,
      fontSize: 34,
      lineHeight: 1.25,
      color: "var(--text-primary)"
    }
  }, "\uC81C\uCD9C\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      lineHeight: 1.6,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, "\uCC38\uC5EC\uD574 \uC8FC\uC154\uC11C \uAC10\uC0AC\uD569\uB2C8\uB2E4!")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 340,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-cards)",
      boxShadow: "var(--shadow-lg)",
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "wash",
    icon: "calendar"
  }, "\uB2E4\uC74C \uC77C\uC815"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      lineHeight: 1.6,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, "\uC81C\uC548\uD574 \uC8FC\uC2E0 \uC774\uB984 \uC911 \uC0C1\uC704 \uD6C4\uBCF4\uB294 \uCD94\uD6C4 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, "\uD604\uC7A5 \uC2A4\uD2F0\uCEE4 \uD22C\uD45C"), "\uB85C \uCD5C\uC885 \uACB0\uC815\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 340,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    fullWidth: true,
    leftIcon: "check-check",
    onClick: onLookup
  }, "\uB0B4 \uC81C\uCD9C \uB0B4\uC6A9 \uBCF4\uAE30"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    fullWidth: true,
    onClick: onHome
  }, "\uCC98\uC74C\uC73C\uB85C")));
}
window.CompleteScreen = CompleteScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/space-name-contest/CompleteScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/space-name-contest/IntroScreen.jsx
try { (() => {
/* IntroScreen — landing: hero, how-to-participate, the three spaces, start CTA. */

function IntroScreen({
  onStart
}) {
  const {
    Button,
    HeroWash,
    Icon
  } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;
  const steps = [{
    icon: "user",
    text: "이름과 연락처를 입력해요"
  }, {
    icon: "pencil",
    text: "세 공간의 이름을 제안해요"
  }, {
    icon: "vote",
    text: "상위 후보는 현장 투표로 결정돼요"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "44px 26px 40px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(HeroWash, {
    intensity: 1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color: "var(--accent)"
    }
  }, "\uC6B0\uB9AC \uAD50\uD68C \uACF5\uAC04 \uC774\uB984 \uACF5\uBAA8"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif-display)",
      fontWeight: 400,
      fontSize: 40,
      lineHeight: 1.2,
      color: "var(--text-primary)"
    }
  }, "\uC6B0\uB9AC \uACF5\uAC04\uC758 \uC774\uB984\uC744", /*#__PURE__*/React.createElement("br", null), "\uD568\uAED8 \uC9C0\uC5B4\uC8FC\uC138\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 320,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      lineHeight: 1.6,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, "\uC0C8\uB85C \uC9D3\uACE0 \uB2E8\uC7A5\uD558\uB294 \uC138 \uACF5\uAC04\uC758 \uC774\uB984\uC744 \uAD50\uC778 \uC5EC\uB7EC\uBD84\uC758 \uB9C8\uC74C\uC73C\uB85C \uC81C\uC548\uD574 \uC8FC\uC138\uC694."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "8px 26px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: "0 0 auto",
      borderRadius: "var(--radius-full)",
      background: "var(--surface-wash)",
      color: "var(--accent)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--accent)",
      fontWeight: 700,
      marginRight: 6
    }
  }, i + 1), s.text)))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "4px 26px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-tertiary)"
    }
  }, "\uACF5\uBAA8 \uB300\uC0C1 \uACF5\uAC04 3\uACF3"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, spaces.map(sp => /*#__PURE__*/React.createElement("div", {
    key: sp.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-2xl)",
      padding: "12px 16px",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: sp.icon,
    size: 22,
    strokeWidth: 1.75
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, sp.order, " ", sp.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      color: "var(--text-tertiary)"
    }
  }, sp.tagline)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "12px 26px 34px",
      position: "sticky",
      bottom: 0,
      background: "linear-gradient(to top, var(--surface-page) 72%, rgba(255,248,241,0))"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    rightIcon: "arrow-right",
    onClick: onStart
  }, "\uCC38\uC5EC \uC2DC\uC791\uD558\uAE30")));
}
window.IntroScreen = IntroScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/space-name-contest/IntroScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/space-name-contest/LookupScreen.jsx
try { (() => {
/* LookupScreen — read-only view of a submission, reached from the duplicate
   notice or the completion screen. */

function LookupScreen({
  applicant,
  submission,
  onHome
}) {
  const {
    Button,
    Icon
  } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 26px 4px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-heading-lg)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, "\uC81C\uCD9C\uD558\uC2E0 \uB0B4\uC6A9"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, "\uC77D\uAE30 \uC804\uC6A9 \xB7 \uC81C\uCD9C\uC740 \uCD5C\uC885 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-2xl)",
      padding: "14px 18px",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement(SummaryItem, {
    icon: "user",
    label: "\uC774\uB984",
    value: applicant.name
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: "var(--border-divider)"
    }
  }), /*#__PURE__*/React.createElement(SummaryItem, {
    icon: "phone",
    label: "\uC5F0\uB77D\uCC98",
    value: applicant.phone
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 26px 8px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, spaces.map(sp => /*#__PURE__*/React.createElement(SpaceCard, {
    key: sp.id,
    space: sp,
    values: submission[sp.id],
    readOnly: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 26px 34px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    fullWidth: true,
    leftIcon: "arrow-left",
    onClick: onHome
  }, "\uCC98\uC74C\uC73C\uB85C")));
}
function SummaryItem({
  icon,
  label,
  value
}) {
  const {
    Icon
  } = window.HarvestDesignSystem_eb006c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--text-tertiary)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13
  }), " ", label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      fontWeight: 500,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, value));
}
window.LookupScreen = LookupScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/space-name-contest/LookupScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/space-name-contest/NameSubmissionScreen.jsx
try { (() => {
/* NameSubmissionScreen — STEP 2: scroll of three SpaceCards, submit. */

function NameSubmissionScreen({
  applicantName,
  onSubmit
}) {
  const {
    Button,
    StepIndicator,
    Notice,
    Icon
  } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;
  const [names, setNames] = React.useState(() => {
    const init = {};
    spaces.forEach(s => {
      init[s.id] = {
        required: "",
        optional: ""
      };
    });
    return init;
  });
  const filledRequired = spaces.filter(s => names[s.id].required.trim().length > 0).length;
  const canSubmit = filledRequired === spaces.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 26px 4px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(StepIndicator, {
    steps: ["신청자 정보", "이름 제출"],
    current: 1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-heading-lg)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, applicantName ? `${applicantName}님, ` : "", "\uC774\uB984\uC744", /*#__PURE__*/React.createElement("br", null), "\uC81C\uC548\uD574 \uC8FC\uC138\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      lineHeight: 1.5,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, "\uAC01 \uACF5\uAC04\uBCC4 1\uAC1C\uB294 \uD544\uC218, 1\uAC1C\uB294 \uC120\uD0DD\uC73C\uB85C \uC81C\uC548\uD560 \uC218 \uC788\uC5B4\uC694."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 26px 8px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, spaces.map(sp => /*#__PURE__*/React.createElement(SpaceCard, {
    key: sp.id,
    space: sp,
    values: names[sp.id],
    onChange: val => setNames(prev => ({
      ...prev,
      [sp.id]: val
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 26px 34px",
      position: "sticky",
      bottom: 0,
      background: "linear-gradient(to top, var(--surface-page) 74%, rgba(255,248,241,0))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginBottom: 12,
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      color: canSubmit ? "var(--accent)" : "var(--text-tertiary)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: canSubmit ? "circle-check" : "info",
    size: 14
  }), "\uD544\uC218 ", filledRequired, " / ", spaces.length, " \uACF5\uAC04 \uC791\uC131\uB428"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: !canSubmit,
    onClick: () => onSubmit(names)
  }, "\uC81C\uCD9C\uD558\uAE30")));
}
window.NameSubmissionScreen = NameSubmissionScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/space-name-contest/NameSubmissionScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/space-name-contest/Shell.jsx
try { (() => {
/* Shell — mobile web frame for the 공간 이름 공모전 flow.
   The contest link is sent via a KakaoTalk channel, so every screen is a
   single mobile column on the cream canvas. Also defines shared contest data. */

window.CONTEST_SPACES = [{
  id: "bondang",
  order: "①",
  name: "본당",
  tagline: "신축 · 조감도 제공",
  description: "새로 짓는 본당의 이름을 조감도를 보며 함께 상상해 주세요.",
  placeholder: "본당 조감도를 올려주세요",
  icon: "church"
}, {
  id: "soyebae",
  order: "②",
  name: "소예배실",
  tagline: "사진 제공",
  description: "청년과 청소년을 위한 액티브한 공간입니다.",
  placeholder: "소예배실 사진을 올려주세요",
  icon: "heart"
}, {
  id: "saega",
  order: "③",
  name: "새가족부실",
  tagline: "사진 제공",
  description: "새가족을 처음 맞이하는 따뜻한 공간입니다.",
  placeholder: "새가족부실 사진을 올려주세요",
  icon: "users"
}];
function Shell({
  children,
  onHome
}) {
  const {
    Icon
  } = window.HarvestDesignSystem_eb006c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-page)",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 430,
      minHeight: "100vh",
      background: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      boxShadow: "0 0 80px rgba(227, 214, 197, 0.45)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 54,
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderBottom: "1px solid var(--border-divider)",
      background: "var(--surface-page)",
      position: "sticky",
      top: 0,
      zIndex: 10,
      cursor: onHome ? "pointer" : "default"
    },
    onClick: onHome
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "church",
    size: 19
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, "\uACF5\uAC04 \uC774\uB984 \uACF5\uBAA8\uC804")), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: "1 1 auto",
      display: "flex",
      flexDirection: "column"
    }
  }, children)));
}
window.Shell = Shell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/space-name-contest/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/space-name-contest/SpaceCard.jsx
try { (() => {
/* SpaceCard — one submission block per space: image (drop slot), title + description,
   and a 필수 / 선택 name pair. Read-only mode renders submitted values. */

function SpaceCard({
  space,
  values,
  onChange,
  readOnly = false
}) {
  const {
    Input,
    Tag,
    Icon
  } = window.HarvestDesignSystem_eb006c;
  const v = values || {
    required: "",
    optional: ""
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-cards)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden"
    }
  }, readOnly ? null : /*#__PURE__*/React.createElement("image-slot", {
    id: space.id,
    shape: "rect",
    placeholder: space.placeholder,
    style: {
      display: "block",
      width: "100%",
      height: 168
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 22px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 15
    }
  }, space.order), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-heading-sm)",
      fontWeight: 600,
      letterSpacing: "0.015em",
      color: "var(--text-primary)"
    }
  }, space.name), /*#__PURE__*/React.createElement(Tag, {
    tone: "neutral",
    size: "sm"
  }, space.tagline)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      lineHeight: 1.5,
      letterSpacing: "0.015em",
      color: "var(--text-secondary)"
    }
  }, space.description)), readOnly ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(ReadRow, {
    label: "\uD544\uC218",
    value: v.required,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(ReadRow, {
    label: "\uC120\uD0DD",
    value: v.optional,
    tone: "neutral"
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(LabelWithTag, {
      text: "\uC81C\uC548\uD558\uB294 \uC774\uB984",
      tone: "accent",
      tag: "\uD544\uC218"
    }),
    placeholder: "\uC608) \uBE5B\uB098\uB294 \uC131\uC804",
    value: v.required,
    onChange: e => onChange({
      ...v,
      required: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(LabelWithTag, {
      text: "\uD558\uB098 \uB354 \uC81C\uC548 (\uC120\uD0DD)",
      tone: "neutral",
      tag: "\uC120\uD0DD"
    }),
    placeholder: "\uD55C \uAC1C \uB354 \uC81C\uC548\uD560 \uC218 \uC788\uC5B4\uC694",
    value: v.optional,
    onChange: e => onChange({
      ...v,
      optional: e.target.value
    })
  }))));
}
function LabelWithTag({
  text,
  tag,
  tone
}) {
  const {
    Tag
  } = window.HarvestDesignSystem_eb006c;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, text, /*#__PURE__*/React.createElement(Tag, {
    tone: tone,
    size: "sm"
  }, tag));
}
function ReadRow({
  label,
  value,
  tone
}) {
  const {
    Tag
  } = window.HarvestDesignSystem_eb006c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: tone,
    size: "sm"
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      letterSpacing: "0.015em",
      color: value ? "var(--text-primary)" : "var(--text-disabled)"
    }
  }, value || "제안 없음"));
}
window.SpaceCard = SpaceCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/space-name-contest/SpaceCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.HeroWash = __ds_scope.HeroWash;

__ds_ns.LogoCircle = __ds_scope.LogoCircle;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.PreviewCard = __ds_scope.PreviewCard;

__ds_ns.TrustLogoRow = __ds_scope.TrustLogoRow;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.FeatureSplit = __ds_scope.FeatureSplit;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Notice = __ds_scope.Notice;

__ds_ns.StepIndicator = __ds_scope.StepIndicator;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

})();
