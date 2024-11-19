FROM openjdk:17-jdk
WORKDIR /app
COPY build/libs/*.jar app.jar

ENV TZ=Asia/Seoul
ENV SPRING_PROFILES_ACTIVE=prod

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "postgres:5432", "--timeout=30", "--strict", "--", "java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]