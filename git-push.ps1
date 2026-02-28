# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 提交文件
git commit -m "Initial commit"

# 重命名分支为 main
git branch -M main

# 关联远程仓库
git remote add origin https://github.com/semorn/semon-website.git

# 推送到远程仓库
git push -u origin main