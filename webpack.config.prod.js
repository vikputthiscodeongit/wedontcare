const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "./src"),

    entry: {
        main: "./js/index.js"
    },

    output: {
        chunkFilename: "./js/bundle-[name]-[id].js",
        filename: "./js/bundle-[name].js",
        path: path.resolve(__dirname, "./dist")
    },

    mode: "production",

    devtool: "source-map",

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/style.css"
        }),
        new CopyPlugin([
            {
                from: "*",
                to: ""
            },
            {
                from: "favicon",
                to: "favicon"
            },
            {
                from: "media",
                to: "media",
                ignore: ["compiled/**/*"]
            }
        ])
    ],

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                precision: 6
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name]_[contenthash].[ext]",
                            publicPath: "../"
                        }
                    }
                ]
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name]_[contenthash].[ext]",
                            publicPath: "../"
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                },
            }),
        ],
    }
};
