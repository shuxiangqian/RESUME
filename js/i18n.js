/* ============================================
   多语言系统 (i18n)
   ============================================ */

const I18N = {
  currentLang: 'zh',

  // 翻译字典
  dictionary: {
    /* --- 导航 --- */
    'nav.home':       { zh: '首页',     en: 'Home' },
    'nav.resume':     { zh: '简历',     en: 'Resume' },
    'nav.projects':   { zh: '项目',     en: 'Projects' },
    'nav.contact':    { zh: '联系',     en: 'Contact' },
    'nav.lang':       { zh: 'EN',       en: '中文' },

    /* --- 首页 Hero --- */
    'hero.title':     { zh: '你好，我是 [你的名字]', en: "Hi, I'm [Your Name]" },
    'hero.subtitle':  { zh: '全栈开发工程师 / 设计师', en: 'Full-Stack Developer / Designer' },
    'hero.desc':      { zh: '热爱构建优雅、高效的数字产品。拥有 X 年经验，专注于 Web 开发、用户体验设计和创新解决方案。', en: 'Passionate about building elegant, efficient digital products. With X years of experience focused on web development, UX design, and innovative solutions.' },
    'hero.btn1':      { zh: '查看简历', en: 'View Resume' },
    'hero.btn2':      { zh: '联系我',   en: 'Contact Me' },

    /* --- 首页技能 --- */
    'skills.title':   { zh: '技能概览', en: 'Skills Overview' },
    'skills.subtitle':{ zh: '我常用的技术和工具', en: 'Technologies and tools I work with' },

    /* --- 简历页 --- */
    'resume.title':   { zh: '简历',     en: 'Resume' },
    'resume.subtitle':{ zh: '我的工作经历与教育背景', en: 'My experience and education' },
    'resume.exp':     { zh: '工作经历', en: 'Experience' },
    'resume.edu':     { zh: '教育背景', en: 'Education' },
    'resume.skills':  { zh: '专业技能', en: 'Skills' },

    /* 工作经历占位 */
    'exp.1.title':    { zh: '高级前端工程师', en: 'Senior Frontend Engineer' },
    'exp.1.company':  { zh: '某某科技有限公司 · 全职', en: 'ABC Technology · Full-time' },
    'exp.1.date':     { zh: '2022.06 - 至今', en: 'Jun 2022 - Present' },
    'exp.1.desc':     { zh: '负责公司核心产品的前端架构设计和开发，使用 React/TypeScript 技术栈，推动组件库建设和性能优化，页面加载速度提升 40%。', en: 'Led frontend architecture design and development for core products using React/TypeScript, built component library, improved page load speed by 40%.' },
    'exp.2.title':    { zh: '前端开发工程师', en: 'Frontend Developer' },
    'exp.2.company':  { zh: '某某互联网公司 · 全职', en: 'XYZ Internet · Full-time' },
    'exp.2.date':     { zh: '2020.03 - 2022.05', en: 'Mar 2020 - May 2022' },
    'exp.2.desc':     { zh: '参与多个 B 端和 C 端项目开发，负责需求评审、技术方案设计和核心功能实现，与后端、设计团队紧密协作。', en: 'Participated in multiple B2B and B2C projects, handled requirement reviews, technical design, and core feature implementation.' },

    /* 教育占位 */
    'edu.1.degree':   { zh: '计算机科学与技术 · 本科', en: 'Computer Science · B.S.' },
    'edu.1.school':   { zh: '某某大学 · 2016 - 2020', en: 'XYZ University · 2016 - 2020' },

    /* 技能分类 */
    'skill.frontend': { zh: '前端技术', en: 'Frontend' },
    'skill.backend':  { zh: '后端技术', en: 'Backend' },
    'skill.tools':    { zh: '工具与平台', en: 'Tools & Platforms' },

    /* --- 项目页 --- */
    'projects.title':     { zh: '项目作品', en: 'Projects' },
    'projects.subtitle':  { zh: '我参与和开发的部分项目', en: 'Some projects I have worked on' },
    'project.demo':       { zh: '在线演示', en: 'Live Demo' },
    'project.code':       { zh: '源代码',   en: 'Source Code' },
    'project.1.title':    { zh: '项目名称 A', en: 'Project Alpha' },
    'project.1.desc':     { zh: '这是一个全栈项目，使用 React + Node.js 构建，实现了某某功能。', en: 'A full-stack application built with React and Node.js featuring X functionality.' },
    'project.2.title':    { zh: '项目名称 B', en: 'Project Beta' },
    'project.2.desc':     { zh: '一个移动端优先的响应式网站，使用 Vue.js 和 Tailwind CSS 开发。', en: 'A mobile-first responsive website developed with Vue.js and Tailwind CSS.' },
    'project.3.title':    { zh: '项目名称 C', en: 'Project Gamma' },
    'project.3.desc':     { zh: '基于 Python 的数据可视化工具，帮助团队分析用户行为数据。', en: 'A Python-based data visualization tool for analyzing user behavior data.' },
    'project.4.title':    { zh: '项目名称 D', en: 'Project Delta' },
    'project.4.desc':     { zh: '开源的 CLI 工具，用于自动化工作流和项目脚手架搭建。', en: 'An open-source CLI tool for automating workflows and project scaffolding.' },

    /* --- 联系页 --- */
    'contact.title':      { zh: '联系我',   en: 'Contact' },
    'contact.subtitle':   { zh: '很高兴与你交流', en: "I'd love to hear from you" },
    'contact.info':       { zh: '联系方式', en: 'Contact Info' },
    'contact.form':       { zh: '发送消息', en: 'Send a Message' },
    'contact.email':      { zh: '邮箱',     en: 'Email' },
    'contact.location':   { zh: '所在地',   en: 'Location' },
    'contact.location.val': { zh: '中国 · 上海', en: 'Shanghai, China' },
    'contact.form.name':  { zh: '姓名',     en: 'Name' },
    'contact.form.email': { zh: '邮箱',     en: 'Email' },
    'contact.form.msg':   { zh: '留言内容', en: 'Message' },
    'contact.form.submit':{ zh: '发送',     en: 'Send' },
    'contact.form.placeholder.name':  { zh: '请输入您的姓名', en: 'Your name' },
    'contact.form.placeholder.email': { zh: '请输入您的邮箱', en: 'Your email' },
    'contact.form.placeholder.msg':   { zh: '请输入留言内容...', en: 'Your message...' },
    'contact.form.success': { zh: '消息已发送成功！', en: 'Message sent successfully!' },
    'contact.form.error':   { zh: '请正确填写所有字段。', en: 'Please fill in all fields correctly.' },

    /* --- 页脚 --- */
    'footer.copyright': { zh: '© 2026 [你的名字] · 保留所有权利', en: '© 2026 [Your Name] · All rights reserved' },

    /* --- 页面通用 --- */
    'page.not.found':  { zh: '内容待补充', en: 'Content coming soon' },
  },

  /**
   * 初始化语言
   */
  init() {
    // 优先读取 localStorage，其次 URL 参数，默认中文
    const saved = localStorage.getItem('lang');
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    this.currentLang = urlLang || saved || 'zh';
    localStorage.setItem('lang', this.currentLang);
    this.translate();
  },

  /**
   * 切换语言
   */
  toggle() {
    this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', this.currentLang);
    this.translate();
    // 更新 URL 参数
    const url = new URL(window.location);
    url.searchParams.set('lang', this.currentLang);
    window.history.replaceState({}, '', url);
    // 更新切换按钮文字
    const btn = document.querySelector('.lang-btn');
    if (btn) {
      btn.textContent = this.t('nav.lang');
    }
  },

  /**
   * 获取指定 key 的翻译
   */
  t(key) {
    const entry = this.dictionary[key];
    if (!entry) return key;
    return entry[this.currentLang] || key;
  },

  /**
   * 翻译页面中所有带 data-i18n 属性的元素
   */
  translate() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      // 区分 input placeholder 和普通元素
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.setAttribute('placeholder', translation);
        } else {
          el.value = translation;
        }
      } else {
        el.textContent = translation;
      }
    });

    // 更新页面 lang 属性
    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
  }
};
