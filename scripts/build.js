const fs = require("fs");
const lt = require("./lib/localize-file");
const ft = require("./lib/file-helpers");

const rootPath = __dirname.replace(/\\/g, "/").replace(/\/[^\/]+$/, "");
const commonFilePath = `${rootPath}/GUI_USER.common`;
const sourceRootPath = `${rootPath}/src`;
const buildRootPath = `${rootPath}/build`;

const baseCulture = "en-ca";
const cultures = ["xx-zz", "en-us", "ja-jp"];
const baseCultureResourceRootPath = `${rootPath}/resources/${baseCulture}`;

const onError = (file, reason) => {
  console.error(reason);
};

for (const culture of cultures) {
  const cutlureResourceRootPath = `${rootPath}/resources/${culture}`;
  const cultureBuildRootPath = `${buildRootPath}/${culture}/GUI_USER`;

  // Ensure we delete the existing build
  if (fs.existsSync(cultureBuildRootPath)) {
    fs.rmdirSync(cultureBuildRootPath, { recursive: true });
  }

  console.log(`Copying common files for ${culture}`);
  ft.copyFileSync(commonFilePath, cultureBuildRootPath, onError);

  console.log(`Generating localized files for ${culture}`);
  fs.readdirSync(sourceRootPath).forEach((sourceFileName) => {
    const outputFileName = sourceFileName.replace(/\.src$/, "");
    const resourceFileName = sourceFileName.replace(/\.src$/, ".json");
    lt.localizeFile({
      inputPath: `${sourceRootPath}/${sourceFileName}`,
      outputPath: `${cultureBuildRootPath}/${outputFileName}`,
      resourceInputPaths: [
        `${cutlureResourceRootPath}/${resourceFileName}`,
        `${baseCultureResourceRootPath}/${resourceFileName}`,
      ],
    });
  });

  console.log(`Copying culture specific files for ${culture}`);
  if (fs.existsSync(cutlureResourceRootPath)) {
    fs.readdirSync(cutlureResourceRootPath)
      .map((name) => `${cutlureResourceRootPath}/${name}`)
      .filter(
        (path) => !path.endsWith(".json") && !fs.lstatSync(path).isDirectory()
      )
      .map((path) => {
        ft.copyFileSync(path, cultureBuildRootPath, onError);
      });
  }
}
