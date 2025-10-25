const vscode = require('vscode');
const path = require('path');

function activate(context){
    console.log('C++ 运行扩展已被激活');

    // 注册命令
    let disposable = vscode.commands.registerCommand('auto-run-cpp.compileCommand', () => {
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;
        const filePath = document.fileName;
        const additionalCompileCommand = "-std=c++14 -O2 -static";

        vscode.window.showInformationMessage('正在编译 C++ 文件...');

        // get directory and output path
        const fileDir = path.dirname(filePath);
        const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
        const outputPath = path.join(fileDir, fileNameWithoutExt);

        // setup terminal
        const terminal = vscode.window.createTerminal('C++ Compiler');
        terminal.sendText(`cd "${fileDir}"`);

        // compile
        const compileCommand = `g++ "${filePath}" -o "${outputPath}" -${additionalCompileCommand}`;
        terminal.sendText(compileCommand);
    });

    context.subscriptions.push(disposable);
}

module.exports = {
    activate
};
