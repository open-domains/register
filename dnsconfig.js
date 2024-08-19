var regNone = NewRegistrar("none");
var providerCf = DnsProvider(NewDnsProvider("cloudflare"));

var proxy = {
  on: { "cloudflare_proxy": "on" },
  off: { "cloudflare_proxy": "off" }
}

function getDomainsList(filesPath) {
  var result = [];
  var files = glob.apply(null, [filesPath, true, '.json']);

  for (var i = 0; i < files.length; i++) {
    var basename = files[i].split('/').reverse()[0];
    var name = basename.split('.')[0];

    result.push({ name: name, data: require(files[i]) });
  }

  return result;
}

var domains = getDomainsList('./domains');
var commit = {};

for (var idx in domains) {
  var domainData = domains[idx].data;
  var proxyState = proxy.on; // enabled by default

  if (!commit[domainData.domain]) {
    commit[domainData.domain] = [];
  }

  if (domainData.proxied === false) {
    proxyState = proxy.off;
  }

  // Handle A records
  if (domainData.record.A) {
    for (var a in domainData.record.A) {
      commit[domainData.domain].push(
        A(domainData.subdomain, IP(domainData.record.A[a]), proxyState)
      );
    }
  }

  // Handle AAAA records
  if (domainData.record.AAAA) {
    for (var aaaa in domainData.record.AAAA) {
      commit[domainData.domain].push(
        AAAA(domainData.subdomain, domainData.record.AAAA[aaaa], proxyState)
      );
    }
  }

  // Handle CNAME records
  if (domainData.record.CNAME) {
    commit[domainData.domain].push(
      CNAME(domainData.subdomain, domainData.record.CNAME + ".", proxyState)
    );
  }

  // Handle MX records
  if (domainData.record.MX) {
    for (var mx in domainData.record.MX) {
      commit[domainData.domain].push(
        MX(domainData.subdomain, 10, domainData.record.MX[mx] + ".")
      );
    }
  }

  // Handle NS records
  if (domainData.record.NS) {
    for (var ns in domainData.record.NS) {
      commit[domainData.domain].push(
        NS(domainData.subdomain, domainData.record.NS[ns] + ".")
      );
    }
  }

  // Handle TXT records
  if (domainData.record.TXT) {
    for (var txt in domainData.record.TXT) {
      commit[domainData.domain].push(
        TXT(domainData.subdomain, domainData.record.TXT[txt])
      );
    }
  }

  // Handle CAA records
  if (domainData.record.CAA) {
    for (var caa in domainData.record.CAA) {
      var caaRecord = domainData.record.CAA[caa];
      commit[domainData.domain].push(
        CAA(domainData.subdomain, caaRecord.flags, caaRecord.tag, caaRecord.value)
      );
    }
  }

  // Handle SRV records
  if (domainData.record.SRV) {
    for (var srv in domainData.record.SRV) {
      var srvRecord = domainData.record.SRV[srv];
      commit[domainData.domain].push(
        SRV(domainData.subdomain, srvRecord.priority, srvRecord.weight, srvRecord.port, srvRecord.target + ".")
      );
    }
  }

  // Handle PTR records
  if (domainData.record.PTR) {
    for (var ptr in domainData.record.PTR) {
      commit[domainData.domain].push(
        PTR(domainData.subdomain, domainData.record.PTR[ptr] + ".")
      );
    }
  }
}

// Commit all DNS records
for (var domainName in commit) {
  D(domainName, regNone, providerCf, commit[domainName]);
}
