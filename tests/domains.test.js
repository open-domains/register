const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const domainsPath = path.resolve("domains");
const files = fs.readdirSync(domainsPath);

// Extract all valid domains from the files
const validDomains = new Set(
    files.map((file) => file.replace(/\.json$/, "")) // Remove .json extension for easier comparison
);

t("Nested subdomains should not exist without a valid parent domain", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Check if the domain is a nested subdomain (i.e., has more than 2 parts)
        if (subdomain.split(".").length > 2) {
            // Get the "root" domain by extracting only the last two parts
            const rootDomain = subdomain.split(".").slice(-2).join(".");

            // Ensure the root domain exists
            t.true(
                validDomains.has(rootDomain),
                `${file}: Parent domain ${rootDomain}.json does not exist`
            );
        }
    });

    t.pass();
});

t("Nested subdomains should not exist if the parent domain has NS records", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Check if the domain is a nested subdomain (i.e., has more than 2 parts)
        if (subdomain.split(".").length > 2) {
            // Get the "root" domain by extracting only the last two parts
            const rootDomain = subdomain.split(".").slice(-2).join(".");
            const parentFilePath = path.join(domainsPath, `${rootDomain}.json`);

            // Check if the parent file exists before attempting to read it
            if (fs.existsSync(parentFilePath)) {
                const parentDomain = fs.readJsonSync(parentFilePath);

                // Check if the parent has NS records
                t.is(
                    parentDomain.record.NS,
                    undefined,
                    `${file}: Parent domain ${rootDomain} has NS records`
                );
            } else {
                t.fail(`${rootDomain}.json file does not exist`);
            }
        }
    });

    t.pass();
});
