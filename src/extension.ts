'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ChildProcess } from 'child_process';
import { isNullOrUndefined } from 'util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "python-runner" is now active!');

    let pythonCLI : ChildProcess;    

    let disposable = vscode.commands.registerCommand('extension.RunInIdle', () => {
        // The code you place here will be executed every time your command is executed

        const {spawn, execFile} = require("child_process");

        if (!isNullOrUndefined(pythonCLI)) {
            var CLIPID:string = pythonCLI.pid.toString();
            spawn('taskkill', ['/pid', CLIPID, '/T', '/F'], {shell: true});
        }

        var currentTextEditor : vscode.TextEditor = vscode.window.activeTextEditor as vscode.TextEditor;
        
        var filePath : string = currentTextEditor.document.uri.fsPath;

        var cmd : string = `pythonw -m idlelib -r "${filePath}"`;
        
        // console.log(cmd);
        
        pythonCLI = execFile(cmd, {shell: true, detached: false});
        // Display a message box to the user
        // console.log(pythonCLI.pid);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}