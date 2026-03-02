# Next.js MFA Demo

这是一个基于 Next.js 的双因素认证 (MFA / TOTP) 演示项目。它展示了如何生成 OTP 密钥、展示二维码、以及验证用户输入的 6 位验证码。

## 功能特性

- **MFA 密钥生成**: 使用 `speakeasy` 生成基于时间的动态密码 (TOTP) 密钥。
- **二维码展示**: 前端使用 `qrcode.react` 将 `otpauth` 协议链接转换为二维码，供 Google Authenticator 或 Microsoft Authenticator 扫描。
- **MFA 验证**: 提供 6 位验证码输入框 (Ant Design `Input.OTP`)，支持自动聚焦和提交验证。
- **持久化存储**: 使用文件系统 (`fs`) 模拟数据库，将用户的 MFA 密钥存储在本地文件中。
  - **路径**: `app/lib/database/mfa/data.txt`
  - **逻辑**: 如果用户已生成过密钥，再次进入生成页面时会复用现有密钥，避免用户频繁重新绑定。
- **登录流程**: 模拟登录页面，验证邮箱和 MFA 验证码。

## 技术栈

- **框架**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **UI 组件库**: [Ant Design](https://ant.design/)
- **样式**: Tailwind CSS
- **MFA 工具**: [Speakeasy](https://github.com/speakeasyjs/speakeasy) (OTP 生成与验证)
- **二维码**: [qrcode.react](https://github.com/zpao/qrcode.react)

## 快速开始

### 1. 安装依赖

```bash
pnpm install
# 或者
npm install
```

### 2. 启动开发服务器

```bash
pnpm dev
# 或者
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 使用指南

### 1. 生成 MFA (绑定)

1. 点击首页的 **"生成 MFA"** 按钮 (或访问 `/mfa`)。
2. 输入邮箱和密码（密码仅作演示，不会实际验证）。
3. 点击提交，系统会生成一个二维码。
4. 打开手机上的 Authenticator App (如 Google Authenticator)，扫描屏幕上的二维码。
5. 扫描成功后，你的手机上会出现一个 6 位数的动态验证码。

### 2. 登录验证

1. 点击首页的 **"登录"** 按钮 (或访问 `/login`)。
2. 输入刚才绑定的邮箱。
3. 进入下一步，输入手机上显示的 6 位验证码。
4. 如果验证码正确且在有效期内 (默认 ±60秒 容差)，将提示验证成功。

## 文件结构说明

- `app/api/mfa`: 处理密钥生成的 API。
- `app/api/mfa/verify`: 处理验证码校验的 API。
- `app/lib/db.ts`: 简单的文件数据库实现，用于读写 JSON 文件存储密钥。
- `app/mfa`: MFA 生成页面的前端逻辑。
- `app/login`: 登录验证页面的前端逻辑。

## 注意事项

- **数据存储**: 本项目仅演示用途，数据存储在本地 JSON 文件中。生产环境请替换为真实数据库（如 PostgreSQL, MySQL 等）。
- **时间同步**: MFA 验证强依赖服务器时间与手机时间的同步。如果验证一直失败，请检查服务器系统时间是否准确。
