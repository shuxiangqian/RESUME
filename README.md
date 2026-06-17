# RESUME — 个人简历网站

一个轻量级、响应式的个人简历/作品集网站，支持中英文多语言切换和暗色模式。

## 项目结构

```
RESUME/
├── index.html          # 首页 — 个人介绍与技能概览
├── resume.html         # 简历页 — 工作经历、教育背景、专业技能（支持在线编辑）
├── projects.html       # 项目页 — 项目作品展示
├── contact.html        # 联系页 — 联系信息与留言表单
├── admin.html          # 管理后台 — 可视化编辑所有文本内容
├── data/
│   └── content.js      # 网站文本数据（与代码分离，修改无需动 JS 逻辑）
├── css/
│   └── style.css       # 完整的设计系统（亮色/暗色模式）
├── js/
│   ├── i18n.js         # 多语言引擎（面向对象 Class）
│   ├── admin.js        # 管理后台逻辑
│   └── main.js         # 交互脚本（导航、主题切换、动画、表单验证）
├── assets/
│   └── images/         # 图片资源（favicon 等）
├── LICENSE             # MIT 协议
└── README.md
```

## 功能特性

- **响应式设计** — 适配桌面、平板和移动端
- **暗色模式** — 手动切换或跟随系统偏好
- **多语言** — 中文 / 英文，一键切换
- **滚动动画** — 基于 IntersectionObserver 的淡入效果
- **联系表单** — 前端验证 + Formspree 提交
- **导航高亮** — 自动识别当前页面
- **数据与代码分离** — `data/content.js` 集中管理所有文本，修改内容无需动 JS 逻辑
- **面向对象架构** — `I18NManager` Class，模块化可维护
- **可视化编辑** — 在简历页直接编辑内容，或打开管理后台 (`admin.html`) 修改全部文本
- **头像上传** — 点击头像上传照片，自动持久化保存

## 使用说明

### 修改内容（无需编辑代码）

**方式一：管理后台（推荐）**
打开 `admin.html`，所有文本以表单形式展示，按分类修改后点击 **保存全部修改** 即可。支持修改首页、简历、项目、联系等所有页面文字，以及上传头像。

**方式二：简历页直接编辑**
打开 `resume.html`，点击页面顶部的 **编辑** 按钮，正文内容变为可编辑状态，修改后点击 **保存**。支持快捷键 `Ctrl+S` 保存、`Esc` 取消。

**方式三：修改数据文件**
直接编辑 `data/content.js`，找到对应 key 修改 `zh` 或 `en` 字段即可（需要理解 JSON 结构）。

### 初始配置

1. 替换 HTML 中的占位文本（`[你的名字]`、`your-email@example.com` 等）
2. 将 `favicon.ico` 放入 `assets/images/` 目录
3. 更新社交链接（GitHub、LinkedIn 等）
4. 替换 Formspree 表单 ID（`contact.html` 中 `action` 属性）
5. 将实际工作经历、项目等内容填入对应页面

> 💡 **提示**：替换占位文本推荐使用「方式一」管理后台，无需打开任何代码文件。

## 技术栈

- 原生 HTML5 / CSS3 / JavaScript（ES6+ Class，数据驱动）
- 无外部依赖（图标使用 Font Awesome 6）
- 字体：Inter + Noto Sans SC
- 数据与逻辑分离，面向对象架构

## 许可

MIT License — 详见 [LICENSE](LICENSE)
