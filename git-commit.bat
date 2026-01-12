@echo off
REM GitHub 提交自动化脚本启动器
REM 用于调用 PowerShell 脚本执行 Git 提交流程

echo === GitHub 提交自动化 ===
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0git-commit.ps1"
echo.
echo 按任意键退出...
pause > nul