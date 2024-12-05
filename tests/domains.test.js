t("Nested subdomains should not exist without a valid parent domain", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Skip first-level subdomains (i.e., subdomains with only one part like "599.is-cool.dev")
        if (subdomain.split(".").length > 2) {
            // Get the parent domain (remove the first part of the subdomain)
            const parentSubdomain = subdomain.split(".").slice(1).join(".");

            // Ensure the parent subdomain exists
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

        // Skip first-level subdomains (i.e., subdomains with only one part like "599.is-cool.dev")
        if (subdomain.split(".").length > 2) {
            // Get the parent domain (remove the first part of the subdomain)
            const parentSubdomain = subdomain.split(".").slice(1).join(".");
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
