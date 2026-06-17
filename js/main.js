/* ============================================
   主交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. 初始化多语言系统 --- */
  if (typeof I18N !== 'undefined') {
    I18N.init();
  }

  /* --- 2. 暗色模式 --- */
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  // 初始化主题
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (savedTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    // 默认跟随系统
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  /* --- 3. 移动端导航菜单 --- */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // 点击导航链接后关闭菜单
    navMenu.querySelectorAll('.navbar-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  /* --- 4. 当前导航高亮 --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* --- 5. 语言切换按钮文字 --- */
  const langBtn = document.querySelector('.lang-btn');
  if (langBtn && typeof I18N !== 'undefined') {
    langBtn.textContent = I18N.t('nav.lang');
    langBtn.addEventListener('click', () => {
      I18N.toggle();
    });
  }

  /* --- 6. 滚动淡入动画 (Intersection Observer) --- */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 如果包含技能进度条，触发动画
          const bars = entry.target.querySelectorAll('.skill-bar-fill');
          if (bars.length > 0) {
            bars.forEach(bar => {
              const targetWidth = bar.getAttribute('data-width');
              if (targetWidth) {
                setTimeout(() => {
                  bar.style.width = targetWidth + '%';
                }, 200);
              }
            });
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // 降级：直接显示所有元素
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* --- 7. 联系表单验证 --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const msgInput = document.getElementById('formMessage');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const msgError = document.getElementById('msgError');

      // 重置错误状态
      [nameInput, emailInput, msgInput].forEach(el => el.classList.remove('error'));
      [nameError, emailError, msgError].forEach(el => { if (el) el.style.display = 'none'; });

      // 验证姓名
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        if (nameError) nameError.style.display = 'block';
        isValid = false;
      }

      // 验证邮箱
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        if (emailError) emailError.style.display = 'block';
        isValid = false;
      }

      // 验证留言
      if (!msgInput.value.trim()) {
        msgInput.classList.add('error');
        if (msgError) msgError.style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        // 表单验证通过 - 实际提交到 Formspree
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        if (typeof I18N !== 'undefined') {
          submitBtn.textContent = I18N.currentLang === 'zh' ? '发送中...' : 'Sending...';
        } else {
          submitBtn.textContent = '发送中...';
        }
        submitBtn.disabled = true;

        fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
          .then(response => {
            if (response.ok) {
              const successMsg = document.getElementById('formSuccess');
              if (successMsg) successMsg.style.display = 'block';
              contactForm.reset();
            } else {
              const errorMsg = document.getElementById('formError');
              if (errorMsg) errorMsg.style.display = 'block';
            }
          })
          .catch(() => {
            const errorMsg = document.getElementById('formError');
            if (errorMsg) errorMsg.style.display = 'block';
          })
          .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          });
      }
    });
  }
});
