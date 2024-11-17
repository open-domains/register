const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const domainsPath = path.resolve("domains");
const files = fs.readdirSync(domainsPath);

t("Nested subdomains should not exist without a parent subdomain", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(".json", "");

        if (subdomain.split(".").length > 1) {
            // Get parent domain by removing the last part (subdomain) from the full subdomain
            const parentSubdomain = subdomain.split(".").slice(1).join(".");

            // Ensure the parent subdomain exists
            t.true(
                files.includes(`${parentSubdomain}.json`),
                `${file}: Parent subdomain ${parentSubdomain}.json does not exist`
            );
        }
    });

    t.pass();
});

t("Nested subdomains should not exist if the parent subdomain has NS records", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(".json", "");

        if (subdomain.split(".").length > 1) {
            // Get parent domain by removing the last part (subdomain) from the full subdomain
            const parentSubdomain = subdomain.split(".").slice(1).join(".");

            const parentFilePath = path.join(domainsPath, `${parentSubdomain}.json`);

            // Check if the parent file exists before attempting to read it
            if (fs.existsSync(parentFilePath)) {
                const parentDomain = fs.readJsonSync(parentFilePath);
                t.is(parentDomain.record.NS, undefined, `${file}: Parent subdomain has NS records`);
            } else {
                t.fail(`${parentSubdomain}.json file does not exist`);
            }
        }
    });

    t.pass();
});
