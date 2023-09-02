import { html, useEffect } from '../../../deps/htm-preact.js';
import setDetails from './index.js';
import { heading, languages, urls, projectStatus } from '../utils/state.js';
import loginToSharePoint from '../utils/sp/login.js';

import Heading from '../heading/view.js';
import Langs from '../langs/view.js';
import Actions from '../actions/view.js';
import Urls from '../urls/view.js';
import Status from '../status/view.js';

export default function Localization() {
  useEffect(() => {
    loginToSharePoint();
    setDetails();
  }, []);
  return html`
    <h1>Milo Localization</h1>
    ${heading.value.editUrl && html`<${Heading} />`}
    ${languages.value.length > 0 && html`<${Langs} />`}
    ${urls.value.length > 0 && projectStatus.value  && html`<${Actions} />`}
    ${urls.value.length > 0 && html`<${Urls} />`}
    <${Status} />`;
}
