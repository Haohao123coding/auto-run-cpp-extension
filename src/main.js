const vscode = require('vscode');
const path = require('path');

function getCompileFlags() {
    const config = vscode.workspace.getConfiguration('autoRunCpp');
    return config.get('additionalCompileFlags', '-O2 -std=c++14 -static');
}

function compileCommand(terminal){
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const filePath = document.fileName;
    const additionalCompileCommand = getCompileFlags();

    vscode.window.showInformationMessage('正在编译 C++ 文件...');

    // get directory and output path
    const fileDir = path.dirname(filePath);
    const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
    const outputPath = path.join(fileDir, fileNameWithoutExt);

    // setup terminal
    terminal.sendText(`cd "${fileDir}"`);

    // compile
    const compileCommand = `g++ "${filePath}" -o "${outputPath}" ${additionalCompileCommand}`;
    terminal.sendText(compileCommand);
    terminal.show();
}

function runCommand(terminal){
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const filePath = document.fileName;

    vscode.window.showInformationMessage('正在运行 C++ 文件...');

    // get directory and output path
    const fileDir = path.dirname(filePath);
    const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
    const exeutablePath = path.join(fileDir, fileNameWithoutExt);

    // setup terminal
    terminal.sendText(`cd "${fileDir}"`);

    // run
    const runCommand = `"${exeutablePath}"`;
    terminal.sendText(runCommand);
    terminal.show();
}

function activate(context){
    console.log('C++ 运行扩展已被激活');

    // command to compile C++ file
    let disposableCompile = vscode.commands.registerCommand('auto-run-cpp.compileCommand', () => {
        // setup terminal
        const terminal = vscode.window.createTerminal('C++');
        compileCommand(terminal);
    });

    // command to run C++ file
    let disposableRun = vscode.commands.registerCommand('auto-run-cpp.runCommand', () => {
        // setup terminal
        const terminal = vscode.window.createTerminal('C++');
        runCommand(terminal);
    });

    // command to compile and run C++ file
    let disposableCompileRun = vscode.commands.registerCommand('auto-run-cpp.compileAndRunCommand', () => {
        // setup terminal
        const terminal = vscode.window.createTerminal('C++');
        compileCommand(terminal);
        runCommand(terminal);
    });

    context.subscriptions.push(disposableCompile);
    context.subscriptions.push(disposableRun);
    context.subscriptions.push(disposableCompileRun);
}

module.exports = {
    activate
};
