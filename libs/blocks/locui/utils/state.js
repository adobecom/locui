import { signal } from '../../../deps/htm-preact.js';
import { origin } from '../../../tools/sharepoint/franklin.js';

const CONFIG = '/.milo/config.json';

// Signals
export const statuses = signal({});
export const heading = signal({ name: '' });
export const languages = signal([]);
export const urls = signal([]);
export const siteConfig = signal(null);
export const previewPath = signal('');
export const projectStatus = signal({});
export const buttonStatus = signal({});
export const synced = signal(false);

export function setStatus(name, type, text, extra = {}) {
  const { description, timeout, action } = extra;
  const content = type && text ? { type, text, description, action } : null;
  statuses.value = { ...statuses.value, [name]: content };
  if (timeout) {
    setTimeout(() => {
      delete statuses.value[name];
      statuses.value = { ...statuses.value };
    }, timeout);
  }
}

export function getSiteConfig() {
  setStatus('siteConfig', 'info', 'Getting site settings.');
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    if (siteConfig.value) {
      setStatus('siteConfig');
      resolve(siteConfig.value);
      return;
    }
    const resp = await fetch(`${origin}${CONFIG}`);
    if (!resp.ok) {
      setStatus('siteConfig', 'error', 'Error getting site settings.');
      return;
    }
    siteConfig.value = await resp.json();
    setStatus('siteConfig');
    resolve(siteConfig.value);
  });
}
