export const module = {
  rules: [
    // Інші правила завантажувачів...
    {
      test: /\.svg$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "src/components/icon.svg", // Директорія, куди будуть збережені файли
          },
        },
      ],
    },
  ],
};
