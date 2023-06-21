import { html, useState, useEffect } from '../../deps/htm-preact.js';
import { fetchVersions } from './index.js';

const baseUrl = 'https://adobe.sharepoint.com'
const scope = [`${baseUrl}/.default`];

export default function View({ loginToSharePoint, createHistoryTag }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [versions, setVersions] = useState([]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');


  useEffect(async () => {
    await loginToSharePoint(scope);
    setIsAuthenticated(true);
    const versions = await fetchVersions();
    setVersions(versions);
  }, []);

  async function onClickCreate() {
    try {
      await createHistoryTag(comment);
      const versions = await fetchVersions();
      setComment('');
      setVersions(versions);
    } catch (err) {
      setError(err.message)
    }
  }

  function onChangeComment(e) {
    setComment(e.currentTarget.value);
    setError('');
  }

  function downloadVersionFile(data) {
    const fileUrl = data.IsCurrentVersion ? `${baseUrl}/${data.Url}` : `${baseUrl}/sites/adobecom/${data.Url}`;
    const a = document.createElement('a');
    a.href = fileUrl;
    document.body.appendChild(a);
    a.click();
  }

  function prettyDate(timeStamp) {
    const date = new Date(timeStamp);
    const localeDate = date.toLocaleString();
    const splitDate = localeDate.split(', ');
    return html`
      <td>
        <span class=date>${splitDate[0]}</span>
        <span class=time>${splitDate[1]}</span>
      </td>
    `;
  }

  function getTableData({ details, key }) {
    switch (key) {
      case 'VersionLabel':
        return html`<td class="link download" onclick="${downloadVersionFile.bind(this, details)}">${details[key]}</td>`;
      case 'Created':
        return html`${prettyDate(details[key])}`;
      default:
        return html`<td>${details[key]}</td>`;
    }
  }

  function renderTableRows(details) {
    const keys = ['VersionLabel', 'Created', 'CheckInComment']
    return html`<tr>${keys.map(key => getTableData({ details, key }))}</tr>`;
  }

  function renderError() {
    if (error) {
      return html`<div class="error">${error}</div>`
    }
    return null;
  }

  function renderList() {
    if (versions.length < 1) {
      return html`
        <div>No version history tags to show!</div>
      `;
    }

    return html`
      <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>Modified Date</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody id="addVersionHistory">
        ${versions.map((version) => renderTableRows(version))}
        </tbody>
      </table>`
  }

  if (!isAuthenticated) {
    return html`<div id="status" class="container sk-version"> Authenticating.... </div>`
  }

  return html`
    <div id="content" class="container sk-version">
      <div class="comment-container">
        <label for="comment">Comment:</label>
        <textarea value="${comment}" id="comment" name="comment" placeholder="Add comment" onkeyup="${onChangeComment}"></textarea>
      </div>
      <button id="create" onClick="${onClickCreate}">Create Version</button>
      ${renderError()}
      <div class="table-container">
        ${renderList()}
      </div>
    </div>
  `;
}
