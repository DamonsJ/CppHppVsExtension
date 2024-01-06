// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let fs = require('fs');
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpphpp" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cpphpp.CppHpp', (uri: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		console.log(uri.fsPath);
		vscode.window.showInputBox({
			placeHolder: "Please enter a file name",
		}).then((fileName) => {
			if (!fileName) return;
			try {
				let cppfile = path.join(uri.fsPath, fileName + '.cpp');
				let hppfile = path.join(uri.fsPath, fileName + '.hpp');
				console.log(cppfile);
				console.log(hppfile);
				if (!fs.existsSync(cppfile)) {
					fs.createWriteStream(cppfile).close();
				}

				if (!fs.existsSync(hppfile)) {
					fs.createWriteStream(hppfile).close();
				}
				var uppername = fileName.toUpperCase()
				const cpp_content = '#include \"' + fileName + '.hpp\"\n\n namespace { \n\n} //namespace \n';
				let hpp_content = `#ifndef __${uppername}_HPP__\n#define __${uppername}_HPP__\n\n#include <iostream>\n\n/**\n * @brief ${fileName}\n *\n */\n\nnamespace {\n\nclass ${fileName} {\npublic:\n  ${fileName}();\n  // rule of five\n  ~${fileName}() = default; // destructor (virtual if ${fileName} is meant to be a base class)\n  ${fileName}(const ${fileName} &) = default;            // copy constructor\n  ${fileName} &operator=(const ${fileName} &) = default; // copy assignment\n  ${fileName}(${fileName} &&) noexcept = default; // move constructor\n  ${fileName} &operator=(${fileName} &&) noexcept = default; // move assignment\n};\n\n} // namespace\n\n#endif\n`;

				const writeData = Buffer.from(cpp_content, 'utf8');
				vscode.workspace.fs.writeFile(vscode.Uri.file(cppfile), writeData);

				const hwriteData = Buffer.from(hpp_content, 'utf8');
				vscode.workspace.fs.writeFile(vscode.Uri.file(hppfile), hwriteData);

				setTimeout(() => { //tiny delay
					let openPath = fs.lstatSync(cppfile).isFile()
					if (!openPath) return;
					vscode.workspace.openTextDocument(openPath)
						.then((editor) => {
							if (!editor) return;
							vscode.window.showTextDocument(editor);
						});

					openPath = fs.lstatSync(hppfile).isFile()
					if (!openPath) return;
					vscode.workspace.openTextDocument(openPath)
						.then((editor) => {
							if (!editor) return;
							vscode.window.showTextDocument(editor);
						});

				}, 50);
			} catch (error) {
				console.log(error);
				vscode.window.showErrorMessage("Somthing went wrong! Please report on GitHub");
			}
		});
		vscode.window.showInformationMessage('CppHpp Loaded!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
