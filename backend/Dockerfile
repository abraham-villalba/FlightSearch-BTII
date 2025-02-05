# OpenJDK as the base image for building
FROM eclipse-temurin:21-jdk AS build

# Set up the working directory
WORKDIR /app

# Copy Gradle files and source code
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
COPY src ./src

# Build the application
RUN chmod +x gradlew && ./gradlew bootJar

# Use minimal JDK runtime for the final image.
FROM eclipse-temurin:21-jre

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the application
EXPOSE 9090

# Run the application
CMD [ "java", "-jar", "app.jar" ]