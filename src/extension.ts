import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const command = 'vscode-auto-scroll.scroll';
    const disposable = vscode.commands.registerCommand(command, () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const lines = editor.document.lineCount;
        let currentLine = 0;

        const interval = setInterval(() => {
            if (currentLine >= lines) {
                clearInterval(interval);
                return;
            }

            editor.revealRange(
                new vscode.Range(currentLine, 0, currentLine, 0),
                vscode.TextEditorRevealType.Default
            );

            currentLine++;
        }, 50); 
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
