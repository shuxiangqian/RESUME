# RESUME — 个人简历网站

一个轻量级、响应式的个人简历/作品集网站，支持中英文多语言切换和暗色模式。

## 项目结构

```
RESUME/
├── index.html          # 首页 — 个人介绍与技能概览
├── resume.html         # 简历页 — 工作经历、教育背景、专业技能
├── projects.html       # 项目页 — 项目作品展示
├── contact.html        # 联系页 — 联系信息与留言表单
├── css/
│   └── style.css       # 完整的设计系统（亮色/暗色模式）
├── js/
│   ├── i18n.js         # 中英文多语言系统
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

## 使用说明

1. 替换 HTML 中的占位文本（`[你的名字]`、`your-email@example.com` 等）
2. 将 `favicon.ico` 放入 `assets/images/` 目录
3. 更新社交链接（GitHub、LinkedIn 等）
4. 替换 Formspree 表单 ID（`contact.html` 中 `action` 属性）
5. 将实际工作经历、项目等内容填入对应页面

## 技术栈

- 原生 HTML5 / CSS3 / JavaScript
- 无外部依赖（图标使用 Font Awesome 6）
- 字体：Inter + Noto Sans SC

## 许可

MIT License — 详见 [LICENSE](LICENSE)
