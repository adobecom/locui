/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* global md5 */

import {
  urls,
  synced,
  setStatus,
  previewPath,
  projectStatus,
  loadStatus,
  languages,
} from '../utils/state.js';
import { origin } from '../../../tools/sharepoint/franklin.js';
import '../../../deps/md5.min.js';
import getServiceConfig from '../../../utils/service-config.js';

let apiUrl = '';

async function onSyncComplete() {
  synced.value = true;
  const newUrls = urls.value.map((url) => {
    delete url.langstore.actions;
    return url;
  });
  urls.value = newUrls;
}

export async function getProjectStatus(showStatus) {
  loadStatus.value = { fetchingStatus: true };

  if (!apiUrl) {
    const { miloc } = await getServiceConfig(origin);
    apiUrl = miloc.url;
  }

  if (showStatus) {
    setStatus('project', 'info', 'Getting latest project status', { timeout: 1000 });
  }
  const projectHash = md5(previewPath.value);
  try {
    const statusResponse = await fetch(`${apiUrl}project-status?project=${projectHash}`, { method: 'GET' });
    if (!statusResponse.ok) {
      const error = statusResponse.json();
      setStatus('project', 'error', `Failed to get project status: ${error}`);
    }
    const status = await statusResponse.json();
    projectStatus.value = { ...status, fetched: true };
    loadStatus.value = { fetchingStatus: false };
    return status;
  } catch (err) {
    projectStatus.value = { ...projectStatus.value, projectStatusText: 'Not Started', fetched: true };
    loadStatus.value = { fetchingStatus: false };
    return { error: err };
  }
}

export async function checkStatus(status, pollingInterval, callback, languageCode) {
  let timerId;
  const curLocale = languages.value.find((lang) => lang.localeCode === languageCode);

  try {
    const response = await getProjectStatus();
    const expectedStatus = languageCode ? response[languageCode].status : response.projectStatus;
    if (expectedStatus !== status) {
      timerId = setTimeout(() => checkStatus(status, pollingInterval, callback, languageCode), pollingInterval);
      languageCode && setStatus(languageCode, 'info', `${response[languageCode]?.statusText} ${curLocale.Language}`);
    } else {
      if (callback) {
        callback();
      }
      clearTimeout(timerId);
      languageCode && setStatus(languageCode, 'info', `${response[languageCode]?.statusText} ${curLocale.Language}`, { timeout: 1000 });
    }
  } catch (error) {
    setStatus('project', 'error', `Error while fetching status - ${error}`);
  }
}

export async function syncToLangstore() {
  loadStatus.value = { syncing: true };
  try {
    await createProject();
    const projectHash = md5(previewPath.value);
    setStatus('project', 'info', 'Starting project sync', { timeout: 2000 });
    await fetch(`${apiUrl}start-sync?project=${projectHash}`, { method: 'POST' });
    loadStatus.value = { syncing: false };
    checkStatus('sync-done', 5000, onSyncComplete);
  } catch (error) {
    setStatus('project', 'error', `Syncing failed: ${error}`);
    loadStatus.value = { syncing: false };
  }
}

export async function createProject() {
  const projectUrl = previewPath.value;
  try {
    setStatus('project', 'info', 'Creating project');
    const createResponse = await fetch(`${apiUrl}create-project`, {
      method: 'POST',
      body: projectUrl,
    });
    if (createResponse.status === 201) {
      setStatus('project', 'info', 'Project created successfully!', { timeout: 3000 });
      await getProjectStatus();
    }
  } catch (error) {
    setStatus('project', 'error', 'Failed to create project');
  }
}

export async function startProject() {
  const projectUrl = previewPath.value;
  const projectHash = md5(projectUrl);
  setStatus('project', 'info', 'Starting project');
  loadStatus.value = { starting: true };

  try {
    const startResponse = await fetch(`${apiUrl}/start-project?project=${projectHash}`, { method: 'POST' });
    loadStatus.value = { starting: false };
    if (startResponse.status === 201) {
      setStatus('project', 'info', 'Project started successfully!', { timeout: 1000 });
      await checkStatus('completed', 5000);
    }
  } catch (error) {
    setStatus('project', 'error', 'Failed to start project');
    loadStatus.value = { starting: false };
  }
}

export async function rollout(languageCode) {
  const curLocale = languages.value.find((lang) => lang.localeCode === languageCode);
  loadStatus.value = { rollingOut: true };
  setStatus(languageCode, 'info', `Initiating rollout for ${curLocale.Language}`);
  try {
    const projectUrl = previewPath.value;
    const projectHash = md5(projectUrl);
    await fetch(`${apiUrl}start-rollout?project=${projectHash}&languageCode=${languageCode}`, { method: 'POST' });
    await checkStatus('completed', 5000, undefined, languageCode);
    loadStatus.value = { rollingOut: false };
  } catch (err) {
    setStatus('project', 'error', 'Failed to roll out files', { timeout: 2000 });
    loadStatus.value = { rollingOut: false };
  }
}

export function rollOutFiles(languageCode) {
  let rolloutReadyLocales = [languageCode];
  if (languageCode === 'all') {
    const localeCodes = languages.value.map((lang) => lang.localeCode);
    rolloutReadyLocales = localeCodes.filter(locale => projectStatus.value[locale].status === 'translated');
  } 
  rolloutReadyLocales.forEach(async (code) => {
    await rollout(code);
  })
}
