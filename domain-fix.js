const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "domains");

(async () => {
    try {
        // Read the files in the 'domains' directory
        const files = await fs.promises.readdir(directoryPath);

        let renamedCount = 0;

        for (const file of files) {
            const oldPath = path.join(directoryPath, file);
            const newPath = path.join(directoryPath, file.toLowerCase());

            // Only rename if the file name is not already in lowercase
            if (oldPath !== newPath) {
                await fs.promises.rename(oldPath, newPath);
                console.log(`Renamed: ${file} -> ${file.toLowerCase()}`);
                renamedCount++;
            }
        }

        console.log(`Finished! Renamed ${renamedCount} out of ${files.length} files.`);
    } catch (err) {
        console.error("Error:", err);
    }
})();