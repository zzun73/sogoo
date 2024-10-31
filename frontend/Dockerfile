# 1단계: Node.js 이미지를 사용하여 React 애플리케이션을 빌드
FROM node:20.18.0 AS build

# 작업 디렉토리를 /app으로 설정
WORKDIR /app
ENV TZ=Asia/Seoul

# package.json과 package-lock.json 복사 후 의존성 설치
COPY package.json package-lock.json* ./
RUN npm install

# 모든 소스 코드를 복사하여 빌드 실행
COPY . .
RUN npm run build

# 2단계: NGINX 이미지를 사용하여 빌드된 정적 파일 서빙
FROM nginx:alpine

# NGINX 설정 파일 복사
COPY default.conf /etc/nginx/conf.d/default.conf

# Node.js 빌드 단계에서 생성된 dist 폴더를 NGINX의 기본 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# NGINX가 80 포트에서 HTTP 요청을 수신
EXPOSE 80

# NGINX를 포그라운드 모드로 실행
CMD ["nginx", "-g", "daemon off;"]