const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const requiredRecordsToProxy = ["A", "AAAA", "CAA", "CNAME", "MX", "NS", "SRV"];

function validateProxiedRecords(t, data, file) {
    if (data.proxied) {
        const hasProxiedRecord = Object.keys(data.record || {}).some((key) => requiredRecordsToProxy.includes(key));

        t.true(hasProxiedRecord, `${file}: Proxied is true but there are no records that can be proxied`);
    }
}

const domainsPath = path.resolve("domains");

// Filter to only include files (exclude directories)
const files = fs.readdirSync(domainsPath).filter((file) => {
    const filePath = path.join(domainsPath, file);
    return fs.lstatSync(filePath).isFile();
});

t("Domains with proxy enabled should have at least one record that can be proxied", (t) => {
    files.forEach((file) => {
        const filePath = path.join(domainsPath, file);
        const domain = fs.readJsonSync(filePath);

        validateProxiedRecords(t, domain, file);
    });
});
