const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const domainsPath = path.resolve("domains");
const files = fs.readdirSync(domainsPath);

// Extract valid root domains dynamically from the files
const validRootDomains = Array.from(
    new Set(
        files
            .map((file) => file.split(".").slice(-2).join("."))
            .filter((domain) => domain.endsWith(".dev") || domain.endsWith(".org"))
    )
);

t("Nested subdomains should not exist without a valid parent domain", (t) => {
    const invalidFiles = [];

    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Find the first-level parent subdomain
        const parentSubdomainParts = subdomain.split(".");
        const rootDomain = parentSubdomainParts.slice(-2).join(".");
        const firstLevelParent = `${parentSubdomainParts.slice(-3, -2)[0]}.${rootDomain}`;

        if (
            parentSubdomainParts.length > 2 && // Must have at least one subdomain
            validRootDomains.includes(rootDomain) && // Must belong to a valid root domain
            !files.includes(`${firstLevelParent}.json`) // Parent must exist
        ) {
            invalidFiles.push(`${file}: Parent domain ${firstLevelParent}.json does not exist`);
        }
    });

    // Fail the test if there are invalid files
    invalidFiles.forEach((message) => t.fail(message));
    t.pass();
});

t("Nested subdomains should not exist if the parent domain has NS records", (t) => {
    const invalidFiles = [];

    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Find the first-level parent subdomain
        const parentSubdomainParts = subdomain.split(".");
        const rootDomain = parentSubdomainParts.slice(-2).join(".");
        const firstLevelParent = `${parentSubdomainParts.slice(-3, -2)[0]}.${rootDomain}`;
        const parentFilePath = path.join(domainsPath, `${firstLevelParent}.json`);

        if (parentSubdomainParts.length > 2 && validRootDomains.includes(rootDomain)) {
            if (fs.existsSync(parentFilePath)) {
                const parentDomain = fs.readJsonSync(parentFilePath);
                if (parentDomain.record?.NS) {
                    invalidFiles.push(`${file}: Parent domain ${firstLevelParent} has NS records`);
                }
            } else {
                invalidFiles.push(`${file}: Parent domain ${firstLevelParent}.json does not exist`);
            }
        }
    });

    // Fail the test if there are invalid files
    invalidFiles.forEach((message) => t.fail(message));
    t.pass();
});
