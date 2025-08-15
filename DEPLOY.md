# 🚀 Vercel 部署指南

## 项目概述

FoxAI API选择器是一个专为移动端设计的Web应用，具有密码验证和随机API选择功能。该项目完全兼容Vercel部署。

## 🎯 部署到Vercel

### 方法一：通过Vercel Dashboard部署（推荐）

1. **准备项目**
   - 确保所有文件都已保存
   - 项目结构应该如下：
   ```
   guess/
   ├── index.html
   ├── style.css
   ├── script.js
   ├── vercel.json
   ├── README.md
   └── DEPLOY.md
   ```

2. **访问Vercel**
   - 打开 [vercel.com](https://vercel.com)
   - 使用GitHub、GitLab或Bitbucket账号登录

3. **导入项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 选择您的项目仓库

4. **配置部署**
   - Project Name: `foxai-api-selector` (或您喜欢的名称)
   - Framework Preset: 选择 "Other" 或 "Static"
   - Root Directory: `./` (默认)
   - Build Command: 留空（静态项目无需构建）
   - Output Directory: 留空（默认）

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成

### 方法二：通过Vercel CLI部署

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd /path/to/your/guess/project
   vercel
   ```

4. **按提示操作**
   - 选择项目名称
   - 确认部署设置
   - 等待部署完成

## 🔧 部署配置说明

### vercel.json 配置详解

```json
{
  "version": 2,                    // Vercel配置版本
  "name": "foxai-api-selector",    // 项目名称
  "builds": [                      // 构建配置
    {
      "src": "*.html",             // 源文件
      "use": "@vercel/static"      // 使用静态文件处理器
    }
  ],
  "routes": [                      // 路由配置
    {
      "src": "/",                  // 根路径
      "dest": "/index.html"        // 指向主页
    }
  ],
  "headers": [                     // 安全头配置
    {
      "source": "/(.*)",           // 所有路径
      "headers": [                 // 安全头列表
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
        // ... 其他安全头
      ]
    }
  ]
}
```

## 🌐 部署后的访问

部署成功后，您将获得：
- **生产URL**: `https://your-project-name.vercel.app`
- **自定义域名**: 可在Vercel Dashboard中配置

## 📱 移动端测试

部署完成后，建议在不同设备上测试：

1. **手机浏览器测试**
   - 访问部署URL
   - 测试密码验证功能
   - 测试API选择功能
   - 测试触摸交互

2. **响应式测试**
   - 不同屏幕尺寸
   - 横屏/竖屏切换
   - 触摸手势

## 🔒 安全特性

Vercel部署包含以下安全特性：
- HTTPS强制加密
- 安全头配置
- 内容类型保护
- XSS防护
- 点击劫持防护

## 📊 性能优化

Vercel自动提供：
- **CDN加速**: 全球边缘节点
- **自动压缩**: 静态资源优化
- **缓存策略**: 智能缓存管理
- **HTTP/2**: 现代协议支持

## 🚨 常见问题

### Q: 部署后页面显示空白？
A: 检查文件路径和vercel.json配置

### Q: 样式文件未加载？
A: 确认CSS文件路径正确

### Q: JavaScript功能不工作？
A: 检查浏览器控制台错误信息

### Q: 如何更新部署？
A: 推送代码到Git仓库，Vercel自动重新部署

## 🔄 持续部署

配置Git仓库后，Vercel将：
- 自动监听代码变更
- 自动触发重新部署
- 保持生产环境同步

## 📞 技术支持

如遇部署问题：
1. 检查Vercel Dashboard的部署日志
2. 查看浏览器控制台错误
3. 参考Vercel官方文档
4. 联系Vercel支持团队

## 🎉 部署成功

恭喜！您的FoxAI API选择器已成功部署到Vercel。现在可以通过以下方式访问：

- **生产环境**: `https://your-project.vercel.app`
- **开发环境**: 本地文件系统

享受您的FoxAI应用！🦊✨
