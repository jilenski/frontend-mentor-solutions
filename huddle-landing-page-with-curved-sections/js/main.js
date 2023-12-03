/** Main Button */
const btnMain = document.querySelectorAll('.btn-main');

btnMain.forEach((button) => {
  button.textContent = 'Get Started For Free';
});

/** Statistics */
const banner = document.getElementById('banner');
const stats = [
  {
    icon: './images/icon-communities.svg',
    alt: 'communities',
    count: '1.4k+',
    description: 'Communities Formed',
  },
  {
    icon: './images/icon-messages.svg',
    alt: 'messages',
    count: '2.7m+',
    description: 'Messages Sent',
  },
];

stats.forEach(({ icon, alt, count, description }) => {
  const statsEl = document.createElement('div');
  statsEl.classList.add('statistics');

  statsEl.innerHTML = `
    <img src="${icon}" alt="${alt}" />
    <strong>${count}</strong>
    <p>${description}</p>
  `;

  banner.appendChild(statsEl);
});

/** Section Content */
const contentsEl = document.getElementById('contents');
const contents = [
  {
    header: 'Grow Together',
    paragraph: `Generate meaningful discussions with your audience and build
    a strong, loyal community. Think of the insightful conversations you miss
    out on with a feedback form.`,
    image: './images/illustration-grow-together.svg',
    alt: 'grow-together',
  },
  {
    header: 'Flowing Conversations',
    paragraph: `You wouldn't paginate a conversation in real life, so why do
    it online? Our threads have just-in-time loading for a more natural flow.`,
    image: './images/illustration-flowing-conversation.svg',
    alt: 'conversations',
  },
  {
    header: 'Your Users',
    paragraph: `It takes no time at all to integrate Huddle with your app's
    authentication solution. This means, once signed in to your app, your
    users can start chatting immediately.`,
    image: './images/illustration-your-users.svg',
    alt: 'users',
  },
];

contents.forEach(({ image, alt, header, paragraph }) => {
  const contentEl = document.createElement('div');
  contentEl.classList.add('content-container');

  contentEl.innerHTML = `
    <img src="${image}" alt="${alt}"/>
    <div class="content-details">
      <h2>${header}</h2>
      <p>${paragraph}</p>
    </div>
  `;

  contentsEl.appendChild(contentEl);
});

/** Email Validation */
const form = document.getElementById('newsletter');
const subBtn = document.getElementById('btn-sub');

subBtn.addEventListener('click', handleSubmit);

function handleSubmit() {
  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  if (!validateEmail(email)) {
    const errorMessage = document.getElementById('error-message');

    emailInput.classList.add('error-outline');
    errorMessage.textContent = 'Check your email please';
    errorMessage.style.visibility = 'visible';
  }
}

function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9.-]+))\.([a-zA-Z]{2,})$/;
  return regex.test(email);
}
