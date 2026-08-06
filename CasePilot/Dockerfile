# ==============================================================================
# STAGE 1: Build & Dependency Resolution Stage
# ==============================================================================
FROM eclipse-temurin:17-jdk-alpine AS builder

# Set working directory inside the build container
WORKDIR /app

# Copy Gradle build configuration files to cache dependencies
COPY gradlew settings.gradle build.gradle /app/
COPY gradle /app/gradle

# Grant execution permissions to Gradle wrapper script
RUN chmod +x ./gradlew

# Pre-download dependencies (layer cached unless build.gradle/settings.gradle change)
RUN ./gradlew dependencies --no-daemon

# Copy source code into the builder container
COPY src /app/src

# Build the executable Spring Boot JAR file (with stacktrace enabled for debug output)
RUN ./gradlew bootJar --no-daemon --stacktrace

# ==============================================================================
# STAGE 2: Production Runtime Stage
# ==============================================================================
FROM eclipse-temurin:17-jre-alpine AS runner

# Security: Create non-root system group and user
RUN addgroup -S springgroup && adduser -S springuser -G springgroup

# Set working directory inside runtime container
WORKDIR /app

# Copy compiled executable JAR artifact from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Adjust file ownership to non-root user
RUN chown -R springuser:springgroup /app

# Switch container execution context to non-root user
USER springuser:springgroup

# Expose main application HTTP port (8080) and remote JVM debugging port (5005)
EXPOSE 8080 5005

# JVM Container Tuning & Debug Options:
# -XX:+UseContainerSupport: Ensures JVM respects Docker CPU & RAM limits
# -XX:MaxRAMPercentage=75.0: Allocates up to 75% of container memory to JVM heap
# -XX:+ExitOnOutOfMemoryError: Crashes container on OOM so orchestrator (K8s/Docker) can restart it
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError"

# Container Healthcheck (probes application health via HTTP)
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Launch application using string form shell execution to expand $JAVA_OPTS at runtime
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
