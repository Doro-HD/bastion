group "app" {
    targets = [
        "server",
        "client"
    ]
}

target "server" {
    dockerfile = "./server/Dockerfile"
    context = "."
    tags = ["bastion-server:latest"]
}

target "client" {
    dockerfile = "./client/Dockerfile"
    context = "."
    tags = ["bastion-client:latest"]
}