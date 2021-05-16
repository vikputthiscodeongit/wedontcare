module.exports = (env) => ({
    plugins: [
        require("autoprefixer")(),
        env === "production" ? require("cssnano")({
            preset: "default"
        })() : false
    ]
})
