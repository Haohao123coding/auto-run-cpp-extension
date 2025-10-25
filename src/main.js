const vscode = require('vscode');
const path = require('path');

function activate(context){
    console.log('扩展已被激活');

    // 注册命令
    let disposable = vscode.commands.registerCommand('auto-run-cpp.runCommand', () => {
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;
        const filePath = document.fileName;

        // 显示编译状态
        vscode.window.showInformationMessage('正在编译 C++ 文件...');

        // 获取文件目录和文件名（不含扩展名）
        const fileDir = path.dirname(filePath);
        const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
        const outputPath = path.join(fileDir, fileNameWithoutExt);

        // 创建终端并执行编译命令
        const terminal = vscode.window.createTerminal('C++ Compiler');

        // 切换到文件所在目录
        terminal.sendText(`cd "${fileDir}"`);

        // 编译命令
        const compileCommand = `g++ "${filePath}" -o "${outputPath}" -std=c++14 -O2 -static`;
        terminal.sendText(compileCommand);
    });

    context.subscriptions.push(disposable);
}

module.exports = {
    activate
};

/*
vscode.window.showInformationMessage('按钮被点击了！');

        // 示例：在终端执行命令
        const terminal = vscode.window.createTerminal('My Command');
        terminal.sendText('echo "Hello from VS Code Extension!"');
        terminal.show();
*/