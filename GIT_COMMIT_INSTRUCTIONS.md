# GitHub 提交自动化脚本使用说明

## 脚本介绍

本项目提供了两个自动化脚本，用于简化 GitHub 提交流程：

1. `git-commit.ps1` - PowerShell 脚本，包含完整的提交流程逻辑
2. `git-commit.bat` - Windows 批处理文件，用于快速启动 PowerShell 脚本

## 功能特性

- 自动检查 Git 仓库状态
- 交互式确认提交操作
- 自动添加所有更改的文件
- 支持自定义提交信息
- 自动推送到远程仓库（默认推送至 stage 分支）

## 使用方法

### 方法一：直接运行批处理文件

1. 双击运行 `git-commit.bat` 文件
2. 按照提示完成操作：
   - 查看当前 Git 状态
   - 确认是否继续提交（输入 Y 或 N）
   - 输入提交信息
   - 等待脚本自动完成提交和推送

### 方法二：手动运行 PowerShell 脚本

1. 打开 PowerShell 终端
2. 导航到项目目录
3. 执行命令：`powershell -ExecutionPolicy Bypass -File git-commit.ps1`
4. 按照提示完成操作

## 注意事项

1. 确保已正确配置 Git 环境（包括用户名、邮箱和远程仓库地址）
2. 脚本默认推送到 `stage` 分支，如需修改请编辑 `git-commit.ps1` 文件中的推送命令
3. 如果遇到权限问题，请以管理员身份运行 PowerShell 或批处理文件
4. 确保网络连接正常，以便能够推送到远程仓库

## 自定义配置

如需修改脚本默认行为，可以编辑 `git-commit.ps1` 文件：

- 更改默认推送分支：修改 `git push origin stage` 中的 `stage` 为目标分支
- 添加忽略文件：可以在 `git add .` 命令前添加 `git add <specific files>` 来选择性添加文件
- 修改提交信息格式：可以在脚本中添加默认提交信息模板

## 故障排除

- **推送失败**：检查网络连接、Git 远程仓库配置和分支权限
- **提交被拒绝**：可能是因为本地分支落后于远程分支，请先执行 `git pull origin stage` 合并远程更改
- **权限错误**：以管理员身份运行脚本或检查文件系统权限

## 示例操作流程

```
=== GitHub 提交自动化 ===

=== GitHub 提交自动化脚本 ===

1. 检查当前 Git 状态...
On branch stage
Your branch is up to date with 'origin/stage'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   src/app.js
        new file:   src/utils.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        .gitignore

no changes added to commit (use "git add" and/or "git commit -a")

是否继续提交？(Y/N): Y

2. 添加所有更改的文件...

3. 请输入提交信息: 新增工具函数和优化应用逻辑

4. 执行提交...
[stage 1234567] 新增工具函数和优化应用逻辑
 2 files changed, 45 insertions(+), 12 deletions(-)
 create mode 100644 src/utils.js

5. 推送到远程仓库...
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (13/13), 1.23 KiB | 1.23 MiB/s, done.
Total 13 (delta 5), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (5/5), completed with 3 local objects.
To https://github.com/yourusername/yourrepo.git
   abcdef1..1234567  stage -> stage

=== 提交完成！ ===

按任意键退出...
```

---

如有任何问题或建议，请随时联系项目维护者。