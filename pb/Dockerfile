FROM alpine:latest

WORKDIR /app

# Download PocketBase (adjust version as needed)
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.21.0/pocketbase_0.21.0_linux_amd64.zip && \
    unzip pocketbase_0.21.0_linux_amd64.zip && \
    rm pocketbase_0.21.0_linux_amd64.zip

COPY pb_data ./pb_data

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
