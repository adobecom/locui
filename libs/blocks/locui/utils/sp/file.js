/* eslint-disable no-await-in-loop */
import { getReqOptions } from '../../../../tools/sharepoint/msal.js';
import getServiceConfig from '../../../../utils/service-config.js';

function getSiteOrigin() {
  const search = new URLSearchParams(window.location.search);
  const repo = search.get('repo');
  const owner = search.get('owner');
  return repo && owner ? `https://main--${repo}--${owner}.hlx.live` : window.location.origin;
}

export async function getBaseUrl() {
  const { sharepoint } = await getServiceConfig(getSiteOrigin());
  const { site, driveId, folderPath } = sharepoint;
  const paths = folderPath.split('/');
  const root = paths[paths.length - 1]; 
  const baseUrl = driveId ? `${site}/drives/${driveId}/root:/${root}` : `${site}/drive/root:/${root}`;
  return baseUrl;
}

function getDocDetails(path) {
  const parentArr = path.split('/');
  const name = parentArr.pop();
  const file = name.endsWith('.json') ? name.replace('.json', '.xlsx') : `${name}.docx`;
  const folder = parentArr.join('/');
  const split = file.split('.');
  return { folder, name: file, lockName: `${split[0]} (lock copy).${split[1]}` };
}

export async function getItem(path) {
  const docDetails = getDocDetails(path);
  const baseUri = await getBaseUrl();
  const fullpath = `${baseUri}${docDetails.folder}/${docDetails.name}`;
  const options = getReqOptions({});
  const resp = await fetch(fullpath, options);
  const json = await resp.json();
  return json;
}
