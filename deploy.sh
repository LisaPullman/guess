#!/bin/bash

# FoxAI API选择器 - Vercel部署脚本
# 使用方法: ./deploy.sh

echo "🦊 FoxAI API选择器 - Vercel部署脚本"
echo "=================================="

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ 未检测到Vercel CLI"
    echo "正在安装Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Vercel CLI安装失败"
        echo "请手动安装: npm install -g vercel"
        exit 1
    fi
    echo "✅ Vercel CLI安装成功"
else
    echo "✅ 检测到Vercel CLI"
fi

# 检查项目文件
echo "📁 检查项目文件..."
required_files=("index.html" "style.css" "script.js" "vercel.json")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ 缺少文件: $file"
        exit 1
    fi
done

# 检查Git仓库状态
if [ -d ".git" ]; then
    echo "✅ 检测到Git仓库"
    echo "📊 Git状态:"
    git status --short
else
    echo "⚠️  未检测到Git仓库"
    echo "建议先初始化Git仓库:"
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m 'Initial commit'"
    echo "  git remote add origin <your-repo-url>"
    echo "  git push -u origin main"
fi

echo ""
echo "🚀 开始部署到Vercel..."
echo "请按照提示完成部署配置..."

# 执行Vercel部署
vercel

echo ""
echo "🎉 部署完成！"
echo ""
echo "📱 下一步操作:"
echo "1. 在Vercel Dashboard中查看您的项目"
echo "2. 配置自定义域名（可选）"
echo "3. 测试移动端访问效果"
echo "4. 分享您的应用链接"
echo ""
echo "🦊 感谢使用FoxAI！"
