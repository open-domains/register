// Setup registrar and DNS provider
var regNone = NewRegistrar("none");
var providerCf = DnsProvider(NewDnsProvider("cloudflare"));

var proxy = {
  on: { "cloudflare_proxy": "on" },
  off: { "cloudflare_proxy": "off" }
};

// Load all domain configurations from JSON files
function getDomainsList(filesPath) {
  var result = [];
  var files = glob.apply(null, [filesPath, true, '.json']);

  files.forEach(file => {
    try {
      const basename = file.split('/').pop();
      const name = basename.split('.')[0];
      const data = require(file);
      
      // Validate required fields
      if (!data.domain || !data.record) {
        console.error(`Missing required fields in ${file}`);
        return;
      }
      
      result.push({ name, data });
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  });

  return result;
}

var domains = getDomainsList('./domains');
var recordsByDomain = {};

// Helper to add records to a domain entry
function addRecord(domain, record) {
  if (!recordsByDomain[domain]) {
    recordsByDomain[domain] = [];
  }
  recordsByDomain[domain].push(record);
}

// Process each domain
domains.forEach(domainEntry => {
  const domainData = domainEntry.data;
  let proxyState = proxy.on; // Default to enabled

  if (domainData.proxied === false) {
    proxyState = proxy.off;
  }

  // Initialize records array for this domain
  recordsByDomain[domainData.domain] = recordsByDomain[domainData.domain] || [];

  // Handle A records
  if (domainData.record.A) {
    domainData.record.A.forEach(ipAddress => {
      addRecord(domainData.domain, A(domainData.subdomain, IP(ipAddress), proxyState));
    });
  }

  // Handle AAAA records
  if (domainData.record.AAAA) {
    domainData.record.AAAA.forEach(ipv6 => {
      addRecord(domainData.domain, AAAA(domainData.subdomain, ipv6, proxyState));
    });
  }

  // Handle CNAME records
  if (domainData.record.CNAME) {
    addRecord(domainData.domain, CNAME(domainData.subdomain, domainData.record.CNAME + ".", proxyState));
  }

  // Handle MX records
  if (domainData.record.MX) {
    domainData.record.MX.forEach(mx => {
      addRecord(domainData.domain, MX(domainData.subdomain, 10, mx + "."));
    });
  }

  // Handle NS records
  if (domainData.record.NS) {
    domainData.record.NS.forEach(ns => {
      addRecord(domainData.domain, NS(domainData.subdomain, ns + "."));
    });
  }

  // Handle TXT records
  if (domainData.record.TXT) {
    domainData.record.TXT.forEach(txt => {
      addRecord(domainData.domain, TXT(domainData.subdomain, txt));
    });
  }

  // Handle CAA records
  if (domainData.record.CAA) {
    domainData.record.CAA.forEach(caaRecord => {
      addRecord(domainData.domain, CAA(domainData.subdomain, caaRecord.flags, caaRecord.tag, caaRecord.value));
    });
  }

  // Handle SRV records
  if (domainData.record.SRV) {
    domainData.record.SRV.forEach(srvRecord => {
      addRecord(domainData.domain, SRV(domainData.subdomain, srvRecord.priority, srvRecord.weight, srvRecord.port, srvRecord.target + "."));
    });
  }

  // Handle PTR records
  if (domainData.record.PTR) {
    domainData.record.PTR.forEach(ptr => {
      addRecord(domainData.domain, PTR(domainData.subdomain, ptr + "."));
    });
  }
});

// Commit all DNS records for each domain
Object.keys(recordsByDomain).forEach(domainName => {
  D(domainName, regNone, providerCf, recordsByDomain[domainName]);
});
