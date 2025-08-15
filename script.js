// 密码验证
const CORRECT_PASSWORD = 'F435261ox';

// API列表
const API_LIST = [
    'AIzaSyD9YYMuYSjA94yvfzMxHIyrY8I2yUtDEes',
    'AIzaSyAO4rIlFAtKLS42Fo1_UGZDf6AtPm9uZPA',
    'AIzaSyA4DGWXOx3FIVOX6oN19Lekho13Wp-RzdY',
    'AIzaSyBsO-PDuSJyl5ps1EsR5jKkGy1HWLrJ8wQ',
    'AIzaSyDRPqOyzZ3hLg1t3yi9pUnhD-C_D3wtZoo',
    'AIzaSyDSp1KHMoVRdzUR617QS9nfCVIRrxKyahQ',
    'AIzaSyAAuizNRoBpx85UEJFb85ZWu3wdmjfLe1w',
    'AIzaSyB17xQxtb1tiId7-3i_1rz_jpIjPLW2A-g',
    'AIzaSyDu8ilySHdX4pw8tEWDmcoJa4eLEvEuefc',
    'AIzaSyC1o7f8hkEyeG2UBLpAA1tavBwi_N1zo7c'
];

// 选择历史
let selectionHistory = [];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已经通过验证
    if (localStorage.getItem('authenticated') === 'true') {
        showMainScreen();
    }
    
    // 添加回车键支持
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // 加载历史记录
    loadHistory();
    
    // 添加触摸反馈
    addTouchFeedback();
});

// 检查密码
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMsg');
    const password = passwordInput.value.trim();
    
    if (password === '') {
        showError('请输入密码');
        return;
    }
    
    if (password === CORRECT_PASSWORD) {
        // 密码正确，保存验证状态
        localStorage.setItem('authenticated', 'true');
        showMainScreen();
        // 清空输入框和错误信息
        passwordInput.value = '';
        errorMsg.textContent = '';
    } else {
        showError('密码错误，请重试');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// 显示错误信息
function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

// 显示主界面
function showMainScreen() {
    document.getElementById('passwordScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        // 清除验证状态
        localStorage.removeItem('authenticated');
        // 返回登录界面
        document.getElementById('mainScreen').classList.add('hidden');
        document.getElementById('passwordScreen').classList.remove('hidden');
        // 清空密码输入框
        document.getElementById('passwordInput').value = '';
        document.getElementById('errorMsg').textContent = '';
        // 清空结果显示
        document.getElementById('result').classList.add('hidden');
    }
}

// 随机选择API
function selectRandomAPI() {
    const randomIndex = Math.floor(Math.random() * API_LIST.length);
    const selectedAPI = API_LIST[randomIndex];
    
    // 显示结果
    document.getElementById('selectedAPI').textContent = selectedAPI;
    document.getElementById('result').classList.remove('hidden');
    
    // 添加到历史记录
    addToHistory(selectedAPI);
    
    // 按钮动画效果
    const selectBtn = document.getElementById('selectBtn');
    selectBtn.classList.add('success');
    selectBtn.textContent = '✅ 已选择';
    
    setTimeout(() => {
        selectBtn.classList.remove('success');
        selectBtn.textContent = '🎲 随机选择';
    }, 2000);
}

// 添加到历史记录
function addToHistory(api) {
    const timestamp = new Date().toLocaleString('zh-CN');
    const historyItem = {
        api: api,
        time: timestamp
    };
    
    selectionHistory.unshift(historyItem);
    
    // 只保留最近10条记录
    if (selectionHistory.length > 10) {
        selectionHistory = selectionHistory.slice(0, 10);
    }
    
    // 保存到本地存储
    localStorage.setItem('apiHistory', JSON.stringify(selectionHistory));
    
    // 更新显示
    updateHistoryDisplay();
}

// 更新历史记录显示
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (selectionHistory.length === 0) {
        historyList.innerHTML = '<p style="color: #999; text-align: center;">暂无选择记录</p>';
        return;
    }
    
    selectionHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-time">${item.time}</div>
            <div class="history-api">${item.api}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

// 加载历史记录
function loadHistory() {
    const savedHistory = localStorage.getItem('apiHistory');
    if (savedHistory) {
        try {
            selectionHistory = JSON.parse(savedHistory);
            updateHistoryDisplay();
        } catch (e) {
            console.error('加载历史记录失败:', e);
            selectionHistory = [];
        }
    }
}

// 复制到剪贴板
function copyToClipboard() {
    const selectedAPI = document.getElementById('selectedAPI').textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        // 使用现代 Clipboard API
        navigator.clipboard.writeText(selectedAPI).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopy(selectedAPI);
        });
    } else {
        // 降级方案
        fallbackCopy(selectedAPI);
    }
}

// 降级复制方案
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功提示
function showCopySuccess() {
    const copyBtn = document.getElementById('copyBtn');
    const originalText = copyBtn.textContent;
    
    copyBtn.textContent = '✅ 已复制';
    copyBtn.classList.add('success');
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('success');
    }, 2000);
}

// 清除历史记录
function clearHistory() {
    if (confirm('确定要清除所有历史记录吗？')) {
        selectionHistory = [];
        localStorage.removeItem('apiHistory');
        updateHistoryDisplay();
    }
}

// 添加触摸反馈
function addTouchFeedback() {
    // 触摸反馈（移动端优化）
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // 防止双击缩放（移动端优化）
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter 快速选择
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (document.getElementById('mainScreen').classList.contains('hidden')) {
            checkPassword();
        } else {
            selectRandomAPI();
        }
    }
    
    // ESC 键退出
    if (e.key === 'Escape') {
        if (!document.getElementById('mainScreen').classList.contains('hidden')) {
            logout();
        }
    }
});
