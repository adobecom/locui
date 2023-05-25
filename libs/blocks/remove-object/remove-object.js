import { getConfig, createTag } from '../../utils/utils.js';
const assetKeys = {
  bgUrl: 'bgUrl',
  frontGuyUrl: 'frontGuyUrl',
  leftGuyUrl: 'leftGuyUrl',
  rightGuyUrl: 'rightGuyUrl',
  fadeMaskUrl: 'fadeMaskUrl',
  bothGuysMaskUrl: 'bothGuysMaskUrl'
}

const config = getConfig();
const base = config.miloLibs || config.codeRoot;

function renderBlade(container, images) {
  import(`${base}/deps/blades/blade-removeobjects.js`);
  const customElem = document.createElement('blade-removeobjects');
  customElem.classList.add('blade');
  // Extracting asset keys and urls and passing it to the custom element
  images.forEach((item) => {
    const { children } = item;
    const keyName = children[0].textContent;
    const content = children[1];
    const src = content.querySelectorAll(':scope > picture > img')[0]?.src || content.querySelectorAll(':scope > a')[0]?.href;
    customElem.setAttribute([assetKeys[keyName]], src);
  });
  container.innerHTML = '';
  container.append(customElem);
}

export default function init(el) {
  const images = el.querySelectorAll(':scope > div');
  // Render it inside marquee if its previous sibling is a marquee block
  if (el.previousElementSibling?.classList.contains('marquee')) {
    const marquee = el.previousElementSibling;
    const container = marquee.querySelectorAll(':scope > div:last-child > div:last-child')[0];
    el.remove();
    setTimeout(() => {
      renderBlade(container, images);
    }, 3000);
  } else {
    const firstImage = images[0]?.children[1];
    const src = firstImage.querySelector(':scope > picture > img')?.src || firstImage.querySelectorAll(':scope > a')[0]?.href;
    const placeHolderImg = createTag('img', { src });
    el.innerHTML = '';
    el.append(placeHolderImg);
    placeHolderImg.addEventListener('load', () => {
      renderBlade(el, images);
    });
  }
}
