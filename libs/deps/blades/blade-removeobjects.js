import{i as t,_ as e,e as i,t as o,a as s,B as r,x as l}from"./1bd6a5fb.js";import"./9d47d1b3.js";import"./7fc529cf.js";import{F as a}from"./44ecdda8.js";import"./454b3885.js";window.customElements.define("ft-selection",a);class n extends r{constructor(){super(...arguments),this.bgUrl="",this.frontGuyUrl="",this.leftGuyUrl="",this.rightGuyUrl="",this.fadeMaskUrl="",this.bothGuysMaskUrl="",this.leftGuyAnts=!1,this.rightGuyAnts=!1,this.bothGuysAnts=!1,this.selectionUrl="",this.ctaLabel="Try it!",this.rightGuyFadeMs=0,this.leftGuyFadeMs=0}async doAction(){""===this.selectionUrl&&0===this.leftGuy.maskOffsetY?(this.selectionUrl=this.bothGuysMaskUrl,this.pulse(),this.ctaLabel="Remove"):0===this.leftGuy.maskOffsetY?(this.selectionUrl="",this.leftGuy.animateMaskPosition(1e3,0,-750),await this.rightGuy.animateMaskPosition(1e3,0,-750),this.ctaLabel="Try it again!"):(this.leftGuy.maskOffsetY=0,this.rightGuy.maskOffsetY=0,this.ctaLabel="Try it!")}async pulse(){this.leftGuy.animateOpacity(250,.5),await this.rightGuy.animateOpacity(250,.5),this.leftGuy.animateOpacity(250,1),await this.rightGuy.animateOpacity(250,1)}renderControls(){return l` <div class="controls"> <sp-action-button id="explode" @click="${()=>{this.exploded=!this.exploded}}"> 3D </sp-action-button> <sp-button id="cta" variant="white" @click="${()=>this.doAction()}"> ${this.ctaLabel} </sp-button> </div> `}render(){return l` <ft-document .exploded="${this.exploded}" .width="${877}" .height="${500}" .tx="${-362}" .ty="${-62}" .scale="${.76}"> <ft-layer .imageUrl="${this.bgUrl}"></ft-layer> <ft-layer id="leftGuy" .imageUrl="${this.leftGuyUrl}" .maskUrl="${this.fadeMaskUrl}"></ft-layer> <ft-layer id="rightGuy" .imageUrl="${this.rightGuyUrl}" .maskUrl="${this.fadeMaskUrl}"></ft-layer> <ft-layer .imageUrl="${this.frontGuyUrl}"></ft-layer> <ft-selection slot="selection" .visible="${""!==this.selectionUrl&&!this.exploded}" .imageUrl="${this.selectionUrl}"></ft-selection> </ft-document> ${this.renderControls()} `}}n.styles=[t`.controls{position:absolute;width:100%;height:100%}.controls #cta{top:320px;left:20px}.controls #explode{position:absolute;right:10px;bottom:10px;display:none}// temporarily removing the 3d/explode layers button .controls button#left{position:absolute;left:0;width:75px;height:100%;background-color:transparent;border:none}.controls button#right{position:absolute;right:0;width:75px;height:100%;background-color:transparent;border:none}`],e([i()],n.prototype,"bgUrl",void 0),e([i()],n.prototype,"frontGuyUrl",void 0),e([i()],n.prototype,"leftGuyUrl",void 0),e([i()],n.prototype,"rightGuyUrl",void 0),e([i()],n.prototype,"fadeMaskUrl",void 0),e([i()],n.prototype,"bothGuysMaskUrl",void 0),e([o()],n.prototype,"leftGuyAnts",void 0),e([o()],n.prototype,"rightGuyAnts",void 0),e([o()],n.prototype,"bothGuysAnts",void 0),e([o()],n.prototype,"selectionUrl",void 0),e([o()],n.prototype,"ctaLabel",void 0),e([s("#leftGuy")],n.prototype,"leftGuy",void 0),e([s("#rightGuy")],n.prototype,"rightGuy",void 0),window.customElements.define("blade-removeobjects",n);
