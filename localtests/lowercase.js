const fs = require('fs');
const path = require('path');

const domainsDir = path.join(__dirname, '../domains');

function lowercaseFilenames() {
    fs.readdir(domainsDir, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const currentPath = path.join(domainsDir, file);
            const lowerCaseFile = file.toLowerCase();
            const lowerCasePath = path.join(domainsDir, lowerCaseFile);

            if (file !== lowerCaseFile) {
                fs.rename(currentPath, lowerCasePath, err => {
                    if (err) {
                        console.error(`Error renaming file ${file}: ${err.message}`);
                    } else {
                        console.log(`Renamed: ${file} → ${lowerCaseFile}`);
                    }
                });
            }
        });
    });
}

// Run the renamer
lowercaseFilenames();
