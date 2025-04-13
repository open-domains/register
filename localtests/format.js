const fs = require('fs');
const path = require('path');

const domainsDir = path.join(__dirname, '../domains');

function formatJSONFiles() {
    fs.readdir(domainsDir, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        files
            .filter(file => file.endsWith('.json'))
            .forEach(file => {
                const filePath = path.join(domainsDir, file);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file ${file}: ${err.message}`);
                        return;
                    }

                    try {
                        const parsed = JSON.parse(data);
                        const formatted = JSON.stringify(parsed, null, 4); // Format with 4 spaces indentation
                        fs.writeFile(filePath, formatted, 'utf8', err => {
                            if (err) {
                                console.error(`Error writing file ${file}: ${err.message}`);
                            } else {
                                console.log(`Formatted JSON file: ${file}`);
                            }
                        });
                    } catch (e) {
                        console.log(`Invalid JSON file (skipped formatting): ${file}`);
                    }
                });
            });
    });
}

// Run the formatter
formatJSONFiles();
