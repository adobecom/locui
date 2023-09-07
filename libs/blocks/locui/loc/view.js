import { html, useEffect } from '../../../deps/htm-preact.js';
import setDetails from './index.js';
import { heading, languages, urls } from '../utils/state.js';
import loginToSharePoint from '../../../tools/sharepoint/login.js';

import Heading from '../heading/view.js';
import Langs from '../langs/view.js';
import Actions from '../actions/view.js';
import Urls from '../urls/view.js';
import Status from '../status/view.js';

const TELEMETRY = { application: { appName: 'Adobe Localization UI' } };
const scopes = ['files.readwrite', 'sites.readwrite.all'];

export default function Localization() {
  useEffect(() => {
    loginToSharePoint({ telemetry: TELEMETRY, scopes });
    setDetails();
  }, []);
  return html`
    <h1>Milo Localization</h1>
    ${heading.value.editUrl && html`<${Heading} />`}
    ${languages.value.length > 0 && html`<${Langs} />`}
    ${urls.value.length > 0 && html`<${Actions} />`}
    ${urls.value.length > 0 && html`<${Urls} />`}
    <${Status} />`;
}
