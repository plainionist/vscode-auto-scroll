import * as vscode from 'vscode'

function autoScroll(editor: vscode.TextEditor) {
  const visibleRange = editor.visibleRanges[0]
  if (!visibleRange) {
    vscode.window.showErrorMessage('Could not determine the visible range.')
    return
  }

  //const outputChannel = vscode.window.createOutputChannel('My Extension')

  const interval = setInterval(() => {
    if (editor.visibleRanges[0].end.line === editor.document.lineCount - 1) {
      clearInterval(interval)
      return
    }

    //outputChannel.appendLine(`${editor.visibleRanges[0].end.line} / ${editor.document.lineCount}`)

    vscode.commands.executeCommand('editorScroll', { to: 'down', by: 'pixel', value: 1 })
  }, 50)
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('vscode-auto-scroll.scroll', () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found!')
      return
    }

    autoScroll(editor)
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {}
