' EFT Builds launcher (target of the desktop shortcut).
' Starts the data refresh hidden when the data is older than 6 hours, then opens the app in the
' default browser. The page notices the refresh by itself and reloads the data when it finishes.
Option Explicit
Dim sh, fso, here, py
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
here = fso.GetParentFolderName(WScript.ScriptFullName)

' Prefer the installed pythonw (no console window); fall back to the py launcher's windowless variant
py = "C:\Program Files\Python313\pythonw.exe"
If Not fso.FileExists(py) Then py = "pyw.exe"

sh.Run """" & py & """ """ & here & "\update_data.py"" --if-older 6", 0, False
sh.Run """" & here & "\index.html""", 1, False
