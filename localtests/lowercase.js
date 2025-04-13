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

function lowercaseJSONProperties() {
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
                        let modified = false;

                        if (typeof parsed.subdomain === 'string') {
                            const lowerSub = parsed.subdomain.toLowerCase();
                            if (parsed.subdomain !== lowerSub) {
                                parsed.subdomain = lowerSub;
                                modified = true;
                            }
                        }

                        if (typeof parsed.domain === 'string') {
                            const lowerDom = parsed.domain.toLowerCase();
                            if (parsed.domain !== lowerDom) {
                                parsed.domain = lowerDom;
                                modified = true;
                            }
                        }

                        if (modified) {
                            const formatted = JSON.stringify(parsed, null, 4);
                            fs.writeFile(filePath, formatted, 'utf8', err => {
                                if (err) {
                                    console.error(`Error writing file ${file}: ${err.message}`);
                                } else {
                                    console.log(`Lowercased subdomain/domain in: ${file}`);
                                }
                            });
                        }

                    } catch (e) {
                        console.warn(`❌ Invalid JSON in: ${file}`);
                    }
                });
            });
    });
}

// Run both
lowercaseFilenames();
lowercaseJSONProperties();