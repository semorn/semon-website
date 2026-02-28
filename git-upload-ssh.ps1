# 初始化 Git 仓库
git init

# 添加 README.md 文件到暂存区
git add README.md

# 提交文件
git commit -m "first commit"

# 重命名分支为 main
git branch -M main

# 关联远程仓库（使用 SSH 协议）
git remote add origin git@github.com:semorn/semon-website.git

# 推送到远程仓库
git push -u origin main