const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const requiredFields = {
    owner: "object",
    record: "object"
};

const optionalOwnerFields = {
    email: "string"
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const hostnameRegex = /^(?=.{1,253}$)(?:(?:[_a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.)+[a-zA-Z]{2,63}$/;

const domainsPath = path.resolve("domains");
const reservedDomainsPath = path.resolve("reserved");
const rootDomainFiles = ["is-a-fullstack.dev.json", "is-cool.dev.json", "is-local.org.json", "is-not-a.dev.json", "localplayer.dev.json"];
const files = fs.readdirSync(domainsPath);
const reservedFiles = fs.existsSync(reservedDomainsPath) ? fs.readdirSync(reservedDomainsPath) : [];

const Domains = [".is-a-fullstack.dev", ".is-cool.dev", ".is-local.org", ".is-not-a.dev", ".localplayer.dev"];

function validateRequiredFields(t, obj, requiredFields, file) {
    Object.keys(requiredFields).forEach((key) => {
        t.true(obj.hasOwnProperty(key), `${file}: Missing required field: ${key}`);
        t.is(typeof obj[key], requiredFields[key], `${file}: Field ${key} should be of type ${requiredFields[key]}`);
    });
}

function validateOptionalFields(t, obj, optionalFields, file) {
    Object.keys(optionalFields).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            t.is(
                typeof obj[key],
                optionalFields[key],
                `${file}: Field ${key} should be of type ${optionalFields[key]}`
            );
        }
    });
}

t("All files should have the required fields", (t) => {
    const files = fs.readdirSync(domainsPath).filter(file => {
    const filePath = path.join(domainsPath, file);
    return fs.lstatSync(filePath).isFile(); // Ensure only files are included
    });
    files.forEach((file) => {
        const data = fs.readJsonSync(path.join(domainsPath, file));

        validateRequiredFields(t, data, requiredFields, file);

        if (!data.reserved) {
            t.true(Object.keys(data.record).length > 0, `${file}: No record types found`);
        }
    });
});

t("All files should have valid optional owner fields", (t) => {
    const files = fs.readdirSync(domainsPath).filter(file => {
    const filePath = path.join(domainsPath, file);
    return fs.lstatSync(filePath).isFile(); // Only include files
    });
    files.forEach((file) => {
        const data = fs.readJsonSync(path.join(domainsPath, file));

        validateOptionalFields(t, data, optionalOwnerFields, file);
        validateOptionalFields(t, data.owner, optionalOwnerFields, file);

        if (data.owner.email) {
            t.regex(data.owner.email, emailRegex, `${file}: Owner email should be a valid email address`);
        }
    });
});
