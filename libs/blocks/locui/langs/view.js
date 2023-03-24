import { html } from '../../../deps/htm-preact.js';
import { languages, urls } from '../utils/state.js';
import { findFragments } from './index.js';

function Language({ item }) {
  const hasLocales = item.locales?.length > 0;

  return html`
    <li class=locui-subproject>
      <p class=locui-project-label>Language</p>
      <h3 class=locui-subproject-name>${item.Language}</h3>
      <p class=locui-project-label>Action</p>
      <h3 class=locui-subproject-name>${item.Action}</h3>
      <p class=locui-project-label>Items</p>
      <h3 class=locui-subproject-name>${item.size}</h3>
      ${hasLocales && html`
        <p class=locui-project-label>Locales</p>
        <div class=locui-subproject-locales>
          ${item.locales.map((locale) => html`<span class=locui-subproject-locale>${locale}</span>`)}
        </div>
      `}
    </li>
  `;
}

export default function Langs() {
  return html`
    <div class=locui-section>
      <div class=locui-section-heading>
        <h2 class=locui-section-label>Actions</h2>
      </div>
      <div class=locui-url-heading-actions>
        <button class=locui-urls-heading-action onClick=${findFragments}>Find Fragments</button>
        <button class=locui-urls-heading-action>Sync to Langstore <span>(${urls.value[0].langstore.lang})</span></button>
      </div>
    </div>

    <div class=locui-section>
      <div class=locui-section-heading>
        <h2 class=locui-section-label>Languages</h2>
      </div>
      <ul class=locui-subprojects>
        ${languages.value.map((proj) => html`<${Language} item=${proj} />`)}
      </ul>
    </div>
  `;
}
