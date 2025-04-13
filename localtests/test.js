const fs = require('fs');
const path = require('path');
const readline = require('readline');

const domainsDir = path.join(__dirname, '../domains');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sectionMap = {
    1: 'Non-JSON file detection',
    2: 'JSON syntax validation',
    3: 'Owner property validation',
    4: 'Filename format validation'
};

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

(async () => {
    console.log('Which sections would you like to run?\n');

    for (const [key, desc] of Object.entries(sectionMap)) {
        console.log(`${key}: ${desc}`);
    }

    const sectionInput = await askQuestion('\nEnter section numbers separated by spaces (e.g., 1 3 4): ');
    const selectedSections = sectionInput
        .split(' ')
        .map(s => parseInt(s.trim()))
        .filter(num => sectionMap[num]);
    
    if (selectedSections.length === 0) {
        console.log('\n❌ No valid sections selected. Exiting.');
        rl.close();
        return;
    }
    
    const confirm = await askQuestion(`\nYou selected: ${selectedSections.join(' ')}. Confirm? ((Y)es/(N)o): `);
    

    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
        console.log('\n❌ Aborted.');
        rl.close();
        return;
    }

    console.log('\n✅ Running selected validations...\n');
    rl.close();

    //==================== SECTION 1: NON-JSON FILE DETECTION ====================//
    if (selectedSections.includes(1)) {
        fs.readdir(domainsDir, (err, files) => {
            if (err) {
                console.error(`Error reading directory: ${err.message}`);
                return;
            }

            files.forEach(file => {
                if (file === 'reserved') {
                    console.log(`Ignoring reserved folder: ${file}`);
                    return;
                }

                if (!file.endsWith('.json')) {
                    console.log(`Non-JSON file found: ${file}`);
                }
            });
        });
    }

    //==================== SECTION 2: JSON SYNTAX VALIDATION ====================//
    if (selectedSections.includes(2)) {
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
                            JSON.parse(data);
                        } catch (e) {
                            console.log(`Invalid JSON file: ${file}`);
                        }
                    });
                });
        });
    }

    //==================== SECTION 3: OWNER PROPERTY VALIDATION ====================//
    if (selectedSections.includes(3)) {
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
                            const owner = parsed.owner;

                            if (!owner || !owner.email) {
                                console.warn(`❌ Missing owner email in: ${file}`);
                                return;
                            }

                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(owner.email)) {
                                console.warn(`❌ Invalid owner email format in: ${file}`);
                                return;
                            }

                            if (owner.repo) {
                                const repoRegex = /^https:\/\/github\.com\/.+/;
                                if (!repoRegex.test(owner.repo)) {
                                    console.warn(`❌ Invalid owner repo URL in: ${file}`);
                                    return;
                                }
                            }

                        } catch (e) {
                            console.log(`❌ Cannot validate owner (invalid JSON) in: ${file}`);
                        }
                    });
                });
        });
    }

    //==================== SECTION 4: FILENAME FORMAT VALIDATION ====================//
    if (selectedSections.includes(4)) {
        const validRootDomains = [
            'is-a-fullstack.dev',
            'is-cool.dev',
            'is-local.org',
            'is-not-a.dev',
            'localplayer.dev'
        ];

        fs.readdir(domainsDir, (err, files) => {
            if (err) {
                console.error(`Error reading directory: ${err.message}`);
                return;
            }

            files
                .filter(file => file.endsWith('.json'))
                .forEach(file => {
                    const parts = file.split('.');
                    if (parts.length < 4) {
                        console.warn(`❌ Invalid domain format (missing parts): ${file}`);
                        return;
                    }

                    const expectedSuffix = validRootDomains.find(domain => file.endsWith(`${domain}.json`));

                    if (!expectedSuffix) {
                        console.warn(`❌ Invalid root domain in filename: ${file}`);
                    }
                });
        });
    }
})();