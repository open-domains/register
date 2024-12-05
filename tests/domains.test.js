const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const domainsPath = path.resolve("domains");
const files = fs.readdirSync(domainsPath);

// Extract all subdomains from files (without considering specific TLDs)
const validRootDomains = Array.from(
    new Set(
        files
            .map((file) => file.split(".").slice(-3).join("."))
    )
);

t("Nested subdomains should not exist without a valid parent domain", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Skip first-level subdomains (e.g., "banana.is-cool.dev")
        // First-level subdomains have no immediate parent to check
        if (subdomain.split(".").length > 3) {
            // Get the immediate parent domain (remove the first subdomain part)
            const parentSubdomain = subdomain.split(".").slice(-3).join(".");

            // Ensure the immediate parent subdomain exists in the list of files
            t.true(
                files.includes(`${parentSubdomain}.json`),
                `${file}: Parent domain ${parentSubdomain}.json does not exist`
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

        // Skip first-level subdomains (e.g., "banana.is-cool.dev")
        // First-level subdomains have no immediate parent to check
        if (subdomain.split(".").length > 3) {
            // Get the immediate parent domain, by getting the last 3 parts.
            const parentSubdomain = subdomain.split(".").slice(-3).join(".");
            const parentFilePath = path.join(domainsPath, `${parentSubdomain}.json`);

            // Check if the parent file exists before attempting to read it
            if (fs.existsSync(parentFilePath)) {
                const parentDomain = fs.readJsonSync(parentFilePath);

                // Check if the parent has NS records
                t.is(
                    parentDomain.record.NS,
                    undefined,
                    `${file}: Parent domain ${parentSubdomain} has NS records`
                );
            } else {
                t.fail(`${parentSubdomain}.json file does not exist`);
            }
        }
    });

    t.pass();
});
