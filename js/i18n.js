/* ============================================
   多语言系统 (I18N) — 面向对象版
   数据来源: data/content.js（分离数据与代码）
   ============================================ */

class I18NManager {
  /** @private 翻译字典 */
  #dictionary;
  /** @private 当前语言 */
  #currentLang = 'zh';

  /**
   * @param {Object} data - 翻译数据字典，来自 window.CONTENT_DATA
   */
  constructor(data = {}) {
    this.#dictionary = data;
  }

  // --- 公开的访问器 ---

  /** 当前语言 ('zh' | 'en') */
  get currentLang() {
    return this.#currentLang;
  }

  /** 翻译字典（只读，供管理后台使用） */
  get dictionary() {
    return this.#dictionary;
  }

  // --- 核心方法 ---

  /**
   * 初始化：读取语言偏好并翻译页面
   */
  init() {
    const saved = localStorage.getItem('lang');
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    this.#currentLang = urlLang || saved || 'zh';
    localStorage.setItem('lang', this.#currentLang);
    this.translate();
  }

  /**
   * 切换中 / 英文
   */
  toggle() {
    this.#currentLang = this.#currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', this.#currentLang);
    this.translate();

    // 更新 URL 参数
    const url = new URL(window.location);
    url.searchParams.set('lang', this.#currentLang);
    window.history.replaceState({}, '', url);

    // 更新切换按钮文字
    const btn = document.querySelector('.lang-btn');
    if (btn) {
      btn.textContent = this.t('nav.lang');
    }
  }

  /**
   * 获取指定 key 的翻译文本
   * @param {string} key - 字典键名
   * @returns {string}
   */
  t(key) {
    const entry = this.#dictionary[key];
    if (!entry) return key;
    return entry[this.#currentLang] || key;
  }

  /**
   * 翻译页面中所有带 data-i18n 属性的元素
   * 用户通过管理后台保存的编辑内容会覆盖默认翻译
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

      // 应用用户已保存的编辑（覆盖默认翻译）
      const saved = localStorage.getItem('edit_' + key);
      if (saved) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', saved);
          } else {
            el.value = saved;
          }
        } else {
          el.textContent = saved;
        }
      }
    });

    // 更新页面 lang 属性
    document.documentElement.lang = this.#currentLang === 'zh' ? 'zh-CN' : 'en';
  }

  /**
   * 获取完整字典副本
   * @returns {Object}
   */
  getDictionary() {
    return { ...this.#dictionary };
  }
}

// --- 全局实例 ---
// 数据从 data/content.js 的 window.CONTENT_DATA 载入
// 使用 const 而非 window 赋值，确保全局引用正确
const I18N = new I18NManager(window.CONTENT_DATA || {});
