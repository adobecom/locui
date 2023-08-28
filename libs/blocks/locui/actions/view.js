import { html } from '../../../deps/htm-preact.js';
import { spAccessToken, urls } from '../utils/state.js';
import { findFragments, syncToLangstore, startLocalize } from './index.js';

export default function Actions() {
  return html`
    <div class=locui-section>
      <div class=locui-section-heading>
        <h2 class=locui-section-label>Actions</h2>
      </div>
      <div class=locui-url-heading-actions>
        <button 
          class=locui-urls-heading-action
          disabled=${!spAccessToken.value}
          onClick=${findFragments}>Find Fragments</button>
        <button
          onClick=${syncToLangstore}
          class=locui-urls-heading-action>
          Sync to Langstore <span>(${urls.value[0].langstore.lang})</span></button>
          <button 
          class=locui-urls-heading-action
          onClick=${startLocalize}>Localize</button>
      </div>
    </div>
  `;
}
