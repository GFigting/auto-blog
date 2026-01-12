1. 项目开发统一再stage分支进行，合并到main分支时再进行部署
2. 不能再main分支进行提交代码
3. git远程操作失败，检查git配置
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897