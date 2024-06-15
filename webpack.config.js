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
            outputPath: "images/", // Директорія, куди будуть збережені файли
          },
        },
      ],
    },
  ],
};
