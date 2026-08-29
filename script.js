const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.main-nav');

// 手機版選單開關
menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? 'CLOSE' : 'MENU';
});

// 點選選單後，自動收起手機版選單
document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'MENU';
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');
const supabaseUrl = 'https://jyhavjbrcoqolrqpmalw.supabase.co';
const supabasePublishableKey = 'sb_publishable_s9EmuhbY8V8PssHllrVuhA_co7kXFtx';

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);

  // 隱藏欄位有內容時，直接當作已送出，避免自動填表程式干擾
  if (formData.get('website')) {
    contactForm.reset();
    formStatus.textContent = '謝謝你，已收到你的訊息。';
    return;
  }

  const inquiry = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    phone: formData.get('phone').trim() || null,
    service: formData.get('service'),
    message: formData.get('message').trim()
  };

  submitButton.disabled = true;
  formStatus.classList.remove('error');
  formStatus.textContent = '正在送出…';

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries`, {
      method: 'POST',
      headers: {
        apikey: supabasePublishableKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(inquiry)
    });

    if (!response.ok) throw new Error('表單送出失敗');

    contactForm.reset();
    formStatus.textContent = '已收到你的合作洽詢，謝謝你！我會盡快回覆。';
  } catch (error) {
    formStatus.classList.add('error');
    formStatus.textContent = '目前無法送出，請稍後再試，或直接寄信給我。';
  } finally {
    submitButton.disabled = false;
  }
});
