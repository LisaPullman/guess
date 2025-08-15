@echo off
chcp 65001 >nul

echo 🦊 FoxAI API选择器 - Vercel部署脚本
echo ==================================

REM 检查是否安装了Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到Vercel CLI
    echo 正在安装Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Vercel CLI安装失败
        echo 请手动安装: npm install -g vercel
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI安装成功
) else (
    echo ✅ 检测到Vercel CLI
)

REM 检查项目文件
echo 📁 检查项目文件...
if exist "index.html" (
    echo ✅ index.html
) else (
    echo ❌ 缺少文件: index.html
    pause
    exit /b 1
)

if exist "style.css" (
    echo ✅ style.css
) else (
    echo ❌ 缺少文件: style.css
    pause
    exit /b 1
)

if exist "script.js" (
    echo ✅ script.js
) else (
    echo ❌ 缺少文件: script.js
    pause
    exit /b 1
)

if exist "vercel.json" (
    echo ✅ vercel.json
) else (
    echo ❌ 缺少文件: vercel.json
    pause
    exit /b 1
)

REM 检查Git仓库状态
if exist ".git" (
    echo ✅ 检测到Git仓库
    echo 📊 Git状态:
    git status --short
) else (
    echo ⚠️  未检测到Git仓库
    echo 建议先初始化Git仓库:
    echo   git init
    echo   git add .
    echo   git commit -m "Initial commit"
    echo   git remote add origin ^<your-repo-url^>
    echo   git push -u origin main
)

echo.
echo 🚀 开始部署到Vercel...
echo 请按照提示完成部署配置...

REM 执行Vercel部署
vercel

echo.
echo 🎉 部署完成！
echo.
echo 📱 下一步操作:
echo 1. 在Vercel Dashboard中查看您的项目
echo 2. 配置自定义域名（可选）
echo 3. 测试移动端访问效果
echo 4. 分享您的应用链接
echo.
echo 🦊 感谢使用FoxAI！
pause
