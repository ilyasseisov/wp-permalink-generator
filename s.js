// Variables
// DOM
const titleInput = document.querySelector('#title-input');
const permalinkInput = document.querySelector('#permalink-input');
const urlInput = document.querySelector('#url-input');
const domainInput = document.querySelector('#domain-input');
const permalinkLengthText = document.querySelector('#permalink-length');
const eraseTitleBtn = document.querySelector('#erase-title');
const copyPermalink = document.querySelector('#copy-permalink');
const copyURL = document.querySelector('#copy-url');
const copyStatusPermalink = document.querySelector('#copy-status-permalink');
const copyStatusURL = document.querySelector('#copy-status-url');

// Functions
// title parse
const parseTitle = () => {
  const originalString = titleInput.value;
  const cleanString = originalString
    .replaceAll(':', '')
    .replaceAll('?', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .replaceAll(';', '')
    .replaceAll('-', '')
    .replaceAll('_', '')
    .replaceAll('=', '')
    .replaceAll('+', '');
  const wordsArray = cleanString.split(' ');
  const cleanWordsArray = wordsArray.filter((word) => {
    return word !== '';
  });
  const lowerCaseWordsArray = cleanWordsArray.map((word) => {
    return word.toLowerCase();
  });
  // permalink generation
  const permalinkString = lowerCaseWordsArray.join('-');
  permalinkInput.value = permalinkString;
  permalinkLengthText.textContent = permalinkInput.value.length;
  console.log(permalinkInput.value.length);
  permalinkLengthCheck();
  // url generation
  urlInput.value = `${domainInput.value}${permalinkString}`;
};

// permalink length
const permalinkLengthCheck = () => {
  // error status
  if (permalinkInput.value.length >= 75) {
    permalinkInput.classList.add('error');
  } else {
    permalinkInput.classList.remove('error');
  }
  // length value display
  permalinkLengthText.textContent = permalinkInput.value.length;
  // url generation
  urlInput.value = `${domainInput.value}${permalinkInput.value}`;
};

// erase title
const eraseTitle = () => {
  titleInput.value = '';
  permalinkInput.value = '';
  urlInput.value = '';
  permalinkLengthText.textContent = '0';
};

// copy to clipboard
const copyToClipboard = (input, badge) => {
  navigator.clipboard.writeText(input.value);
  badge.classList.add('active');

  setTimeout(() => {
    badge.classList.remove('active');
  }, 1200);
};

// Event Listeners
titleInput.addEventListener('input', parseTitle);
permalinkInput.addEventListener('input', permalinkLengthCheck);
eraseTitleBtn.addEventListener('click', eraseTitle);
copyPermalink.addEventListener('click', () => {
  copyToClipboard(permalinkInput, copyStatusPermalink);
});
copyURL.addEventListener('click', () => {
  copyToClipboard(urlInput, copyStatusURL);
});
