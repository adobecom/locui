import { i as t, _ as e, e as r, t as a, a as i, B as s, x as n } from "./1bd6a5fb.js";
import "./9d47d1b3.js";
import "./c5e0a94a.js";
import "./454b3885.js";
import "./7ec4b9fc.js";
const o = 250;
class p extends s {
    constructor() {
        super(...arguments),
            this.talentUrl = "",
            this.talentMaskUrl = "",
            this.patternAUrl = "",
            this.patternBUrl = "",
            this.patternCUrl = "",
            this.patternSrc = this.patternAUrl,
            this.patternOffsetX = -30,
            this.patternOffsetY = -30,
            this.blendMode = "darken",
            this.opacity = 1,
            this.firstClick = !1
    }
    
    async activatePattern(t) {
        let e = this.patternFg.animateOpacity(o, 0),
            r = this.patternBg.animateOpacity(o, 0);
        await Promise.all([e, r]);
        const a = new Promise((t => {
            this.patternFg.addEventListener("load", (() => { t() }), { once: !0 })
        })),
            i = new Promise((t => { this.patternBg.addEventListener("load", (() => { t() }), { once: !0 }) }));
        this.patternSrc = t, t === this.patternAUrl ? (this.patternOffsetX = -30,
            this.patternOffsetY = -30,
            this.blendMode = "darken") : t === this.patternBUrl ? (this.patternOffsetX = -31,
                this.patternOffsetY = -31, this.blendMode = "multiply") : t === this.patternCUrl && (this.patternOffsetX = -32,
                    this.patternOffsetY = -32,
                    this.blendMode = "color-burn"),
            await Promise.all([a, i]), e = this.patternFg.animateOpacity(o, 1), r = this.patternBg.animateOpacity(o, 1),
            await Promise.all([e, r])
    }

    doAction() {
        this.patternSrc === this.patternAUrl ? this.activatePattern(this.patternBUrl) : this.patternSrc === this.patternBUrl ? this.activatePattern(this.patternCUrl) : this.patternSrc === this.patternCUrl ? this.activatePattern("") : this.activatePattern(this.patternAUrl)
    }

    renderControls() {
        return n` <div class="controls"> <div id="editor-controls"></div> <sp-button id="cta" variant="white" @click="${this.doAction}"> Try it! </sp-button> </div> `
    }

    render() {
        return n` <ft-document id="document" .width="${1593}" .height="${1062}" .tx="${-622}" .ty="${-277}" .scale="${.6}"> <ft-layer id="pattern-bg" .imageUrl="${this.patternSrc}" .opacity="${this.opacity}"></ft-layer> 
        <ft-layer .imageUrl="${this.talentUrl}"></ft-layer> 
        <ft-layer id="pattern-fg" .imageUrl="${this.patternSrc}" .maskUrl="${this.talentMaskUrl}" .tx="${this.patternOffsetX}" .ty="${this.patternOffsetY}" .maskOffsetX="${-this.patternOffsetX}" .maskOffsetY="${-this.patternOffsetY}" .blendMode="${this.blendMode}" .opacity="${this.opacity}"> </ft-layer> </ft-document> ${this.renderControls()} `
    }
}
p.styles = [t`.controls{position:absolute;width:100%;height:100%}.controls #cta{top:320px;left:20px}`],
e([r()], p.prototype, "talentUrl", void 0),
e([r()], p.prototype, "talentMaskUrl", void 0),
e([r()], p.prototype, "patternAUrl", void 0),
e([r()], p.prototype, "patternBUrl", void 0),
e([r()], p.prototype, "patternCUrl", void 0),
e([a()], p.prototype, "patternSrc", void 0),
e([a()], p.prototype, "patternOffsetX", void 0),
e([a()], p.prototype, "patternOffsetY", void 0),
e([a()], p.prototype, "blendMode", void 0),
e([a()], p.prototype, "opacity", void 0),
e([i("#pattern-fg")], p.prototype, "patternFg", void 0),
e([i("#pattern-bg")], p.prototype, "patternBg", void 0),

window.customElements.define("blade-blend", p);
