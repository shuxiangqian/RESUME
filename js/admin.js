/* ============================================
   管理后台 — 内容编辑
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 等待 I18N 就绪
  if (typeof I18N === 'undefined') {
    document.getElementById('adminForm').innerHTML =
      '<p style="text-align:center;color:var(--color-error);padding:var(--space-8) 0;">错误：I18N 系统未加载</p>';
    return;
  }

  /* --- 分组配置 --- */
  const GROUPS = [
    { prefix: ['nav'],       icon: 'fa-bars',         title: '导航菜单' },
    { prefix: ['hero'],      icon: 'fa-user',          title: '首页 — Hero 区域' },
    { prefix: ['skills'],    icon: 'fa-chart-bar',     title: '首页 — 技能概览' },
    { prefix: ['resume'],    icon: 'fa-file-alt',      title: '简历 — 标题区域',
      exclude: ['resume.edit', 'resume.save', 'resume.cancel'] },
    { prefix: ['exp'],       icon: 'fa-briefcase',     title: '简历 — 工作经历' },
    { prefix: ['edu'],       icon: 'fa-graduation-cap',title: '简历 — 教育背景' },
    { prefix: ['skill'],     icon: 'fa-code',          title: '简历 — 专业技能分类' },
    { prefix: ['projects'],  icon: 'fa-folder-open',   title: '项目 — 标题' },
    { prefix: ['project'],   icon: 'fa-cube',          title: '项目 — 卡片内容' },
    { prefix: ['contact'],   icon: 'fa-envelope',      title: '联系 — 标题与信息',
      exclude: ['contact.form.name', 'contact.form.email', 'contact.form.msg',
                'contact.form.submit', 'contact.form.placeholder.name',
                'contact.form.placeholder.email', 'contact.form.placeholder.msg',
                'contact.form.success', 'contact.form.error'] },
    { prefix: ['contact.form'], icon: 'fa-pen',        title: '联系 — 表单字段' },
    { prefix: ['footer'],    icon: 'fa-copyright',     title: '页脚' },
    { prefix: ['page'],      icon: 'fa-info-circle',   title: '页面通用' },
    // 编辑模式按钮文字
    { prefix: ['resume.edit', 'resume.save', 'resume.cancel'], icon: 'fa-edit', title: '编辑模式按钮',
      flatten: true },
  ];

  const dict = I18N.dictionary;
  const formEl = document.getElementById('adminForm');
  const toastEl = document.getElementById('adminToast');

  /* --- 判断文本长短，决定用 input 还是 textarea --- */
  function fieldType(key, zh, en) {
    const text = (zh || en || '').length;
    // 标题、日期、公司名、学校名、邮编等短文本用 input
    if (key.includes('.title') || key.includes('.subtitle') ||
        key.includes('.date') || key.includes('.company') ||
        key.includes('.school') || key.includes('.degree') ||
        key.includes('.submit') || key.includes('.lang') ||
        key.includes('.email') || key.includes('.location') ||
        key.endsWith('.name') || key.endsWith('.btn1') || key.endsWith('.btn2') ||
        key.endsWith('.demo') || key.endsWith('.code') ||
        key.endsWith('.edit') || key.endsWith('.save') || key.endsWith('.cancel')) {
      return 'input';
    }
    return 'textarea';
  }

  /* --- 从 key 生成可读标签 --- */
  function readableLabel(key) {
    const parts = key.replace(/\.\d+\./, '.').split('.');
    let label = parts[parts.length - 1];
    // 驼峰式或 kebab 转中文可读
    const LABEL_MAP = {
      'home': '首页', 'resume': '简历', 'projects': '项目', 'contact': '联系',
      'title': '标题', 'subtitle': '副标题', 'desc': '描述', 'description': '描述',
      'date': '日期', 'company': '公司', 'school': '学校', 'degree': '学位',
      'lang': '切换按钮文字', 'copyright': '版权信息',
      'email': '邮箱', 'location': '所在地', 'location.val': '所在地 (值)',
      'info': '信息标题', 'form': '表单标题',
      'name': '姓名', 'msg': '留言内容',
      'placeholder.name': '姓名占位符', 'placeholder.email': '邮箱占位符', 'placeholder.msg': '留言占位符',
      'success': '成功提示', 'error': '错误提示',
      'btn1': '按钮 1', 'btn2': '按钮 2',
      'demo': '演示链接文字', 'code': '源码链接文字',
      'exp': '工作经历', 'edu': '教育背景', 'skills': '专业技能',
      'frontend': '前端技术', 'backend': '后端技术', 'tools': '工具与平台',
      '1.title': '项目 A 标题', '1.desc': '项目 A 描述',
      '2.title': '项目 B 标题', '2.desc': '项目 B 描述',
      '3.title': '项目 C 标题', '3.desc': '项目 C 描述',
      '4.title': '项目 D 标题', '4.desc': '项目 D 描述',
      'not.found': '内容占位文字',
      'edit': '编辑按钮', 'save': '保存按钮', 'cancel': '取消按钮',
    };
    return LABEL_MAP[label] || (label.charAt(0).toUpperCase() + label.slice(1));
  }

  /* --- 渲染所有分组 --- */
  let html = '';

  GROUPS.forEach(group => {
    const keys = [];
    const prefixes = Array.isArray(group.prefix) ? group.prefix : [group.prefix];
    const excludeSet = new Set(group.exclude || []);

    // 收集属于本分组的 key
    Object.keys(dict).forEach(key => {
      if (excludeSet.has(key)) return;
      if (group.flatten) {
        if (prefixes.includes(key)) keys.push(key);
        return;
      }
      if (prefixes.some(p => key.startsWith(p))) keys.push(key);
    });

    if (keys.length === 0) return;

    // 排除已有的（当多个 prefix 匹配同一 key 时）
    const deduped = [...new Set(keys)];

    html += `
      <section class="admin-section" id="sec-${group.title.replace(/[^\w]/g, '_')}">
        <div class="admin-section-header">
          <h2><i class="fas ${group.icon}"></i> ${group.title}</h2>
          <span style="font-size:var(--text-xs);color:var(--color-text-muted);">${deduped.length} 项</span>
        </div>
    `;

    deduped.forEach(key => {
      const zh = dict[key]?.zh || '';
      const en = dict[key]?.en || '';
      const saved = localStorage.getItem('edit_' + key);
      const currentZh = saved !== null ? saved : zh;
      const currentEn = saved !== null ? saved : en;
      const isLong = fieldType(key, zh, en) === 'textarea';

      const label = readableLabel(key);

      html += `
        <div class="admin-field">
          <label>
            ${label}
            <span class="field-key">${key}</span>
          </label>
          ${isLong
            ? `<textarea data-key="${key}" data-original="${zh.replace(/"/g, '&quot;')}" placeholder="${zh}">${currentEn}</textarea>`
            : `<input type="text" data-key="${key}" data-original="${zh.replace(/"/g, '&quot;')}" placeholder="${zh}" value="${currentEn}">`
          }
          <div class="field-desc">默认: ${zh.length > 50 ? zh.slice(0, 50) + '…' : zh}</div>
        </div>
      `;
    });

    html += `</section>`;
  });

  // 添加头像管理区块
  html += `
    <section class="admin-section" id="sec-avatar">
      <div class="admin-section-header">
        <h2><i class="fas fa-camera"></i> 头像管理</h2>
      </div>
      <div class="admin-avatar-section">
        <div class="admin-avatar-preview" id="adminAvatarPreview">
          <i class="fas fa-user" id="adminAvatarIcon"></i>
          <img id="adminAvatarImg" alt="头像" style="display:none">
        </div>
        <div>
          <p style="font-weight:600;margin-bottom:var(--space-2);">个人头像</p>
          <p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:var(--space-3);">
            支持 JPG / PNG，建议 400×400 以上
          </p>
          <button class="btn btn-outline btn-sm" id="adminAvatarBtn">
            <i class="fas fa-upload"></i> 上传头像
          </button>
          <button class="btn btn-outline btn-sm" id="adminAvatarRemove" style="margin-left:var(--space-2);">
            <i class="fas fa-trash"></i> 移除头像
          </button>
          <input type="file" id="adminAvatarInput" accept="image/*" style="display:none">
        </div>
      </div>
    </section>
  `;

  formEl.innerHTML = html;

  /* =============================================
     交互逻辑
     ============================================= */

  // --- Toast ---
  function showToast(msg, isError = false) {
    toastEl.textContent = msg;
    toastEl.className = 'admin-toast' + (isError ? ' error' : '');
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => toastEl.classList.remove('show'), 2500);
  }

  // --- 保存全部 ---
  document.getElementById('adminSaveAll').addEventListener('click', () => {
    const fields = formEl.querySelectorAll('[data-key]');
    let count = 0;
    fields.forEach(el => {
      const key = el.getAttribute('data-key');
      const val = el.value.trim();
      const orig = el.getAttribute('data-original') || '';
      if (val && val !== orig) {
        localStorage.setItem('edit_' + key, val);
        count++;
      } else if (!val) {
        // 如果用户清空了，就删除保存的内容
        localStorage.removeItem('edit_' + key);
      } else {
        // 内容与默认相同，也删除保存项（恢复默认）
        localStorage.removeItem('edit_' + key);
      }
    });
    showToast(`✅ 已保存 ${count} 项修改`);
    // 同步更新侧边栏高亮状态
    updateSidebarStatus();
  });

  // --- 恢复默认 ---
  document.getElementById('adminResetAll').addEventListener('click', () => {
    if (!confirm('确定要恢复所有内容为默认值吗？此操作不可撤销。')) return;

    const fields = formEl.querySelectorAll('[data-key]');
    fields.forEach(el => {
      const key = el.getAttribute('data-key');
      localStorage.removeItem('edit_' + key);
      // 恢复默认值
      const zh = dict[key]?.zh || '';
      el.value = zh;
    });
    showToast('🔄 已恢复所有默认内容');

    // 清除头像
    localStorage.removeItem('avatar');
    resetAvatarUI();
  });

  // --- 头像上传 ---
  const adminAvatarInput = document.getElementById('adminAvatarInput');
  const adminAvatarImg = document.getElementById('adminAvatarImg');
  const adminAvatarIcon = document.getElementById('adminAvatarIcon');

  function loadAvatarToAdmin() {
    const saved = localStorage.getItem('avatar');
    if (saved && adminAvatarImg && adminAvatarIcon) {
      adminAvatarImg.src = saved;
      adminAvatarImg.style.display = 'block';
      adminAvatarIcon.style.display = 'none';
    }
  }

  function resetAvatarUI() {
    if (adminAvatarImg && adminAvatarIcon) {
      adminAvatarImg.style.display = 'none';
      adminAvatarIcon.style.display = 'block';
    }
  }

  loadAvatarToAdmin();

  document.getElementById('adminAvatarBtn').addEventListener('click', () => {
    adminAvatarInput.click();
  });

  document.getElementById('adminAvatarRemove').addEventListener('click', () => {
    localStorage.removeItem('avatar');
    resetAvatarUI();
    showToast('🗑️ 头像已移除');
  });

  if (adminAvatarInput) {
    adminAvatarInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        localStorage.setItem('avatar', dataUrl);
        if (adminAvatarImg && adminAvatarIcon) {
          adminAvatarImg.src = dataUrl;
          adminAvatarImg.style.display = 'block';
          adminAvatarIcon.style.display = 'none';
        }
        showToast('✅ 头像已更新');
      };
      reader.readAsDataURL(file);
    });
  }

  // --- 侧边栏滚动导航高亮 ---
  function updateSidebarStatus() {
    // 简单高亮当前滚动位置对应的 section
    const sidebarLinks = document.querySelectorAll('.admin-sidebar a[href^="#"]');
    let currentId = '';
    document.querySelectorAll('.admin-section').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) {
        currentId = section.id;
      }
    });
    sidebarLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', updateSidebarStatus);
  updateSidebarStatus();

  // --- 侧边栏平滑滚动 ---
  document.querySelectorAll('.admin-sidebar a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
