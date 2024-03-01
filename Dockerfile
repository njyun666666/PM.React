# 基於官方 Node 映像進行構建
FROM node:18.19.1-alpine3.18 AS build

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 到工作目錄
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm install

# 複製所有其他應用程序文件到工作目錄
COPY . .

# 設置環境變數
ENV REACT_APP_PM_API=http://localhost:8080

# 編譯 React 應用程序
RUN npm run build

# 使用官方 Nginx 映像作為運行時映像
FROM nginx:alpine

# 複製編譯的 React 應用程序到 Nginx 的預設靜態文件目錄
COPY --from=build /app/build /usr/share/nginx/html

# 替換 Nginx 的默認配置以將所有請求重定向到 index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 指定容器在運行時監聽的端口（Nginx 默認為 80）
EXPOSE 80

# 定義容器的啟動命令
CMD ["nginx", "-g", "daemon off;"]

# docker build -t pm.react .
# docker container create --name PM.React -p 80:80 pm.react
