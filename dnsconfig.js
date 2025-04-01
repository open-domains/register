var regNone = NewRegistrar("none");
var providerCf = DnsProvider(NewDnsProvider("cloudflare"));

var proxy = {
    off: { cloudflare_proxy: "off" },
    on: { cloudflare_proxy: "on" }
};

function getDomainsList(filesPath) {
    var result = [];
    var files = glob.apply(null, [filesPath, true, ".json"]);

    for (var i = 0; i < files.length; i++) {
        var basename = files[i].split("/").reverse()[0];
        var name = basename.split(".")[0];

        result.push({ name: name, data: require(files[i]) });
    }

    return result;
}

var domains = getDomainsList("./domains");

var commit = {};

for (var idx in domains) {
    var domainData = domains[idx].data;
    var proxyState = domainData.proxied ? proxy.on : proxy.off;

    if (!commit[domainData.domain]) commit[domainData.domain] = [];

    var owner = domainData.owner;
    var ownerInfo = owner ? (owner.username ? owner.username : '') + ' ' + (owner.email ? '<' + owner.email + '>' : '') : '';

    console.log("Configuring domain: " + domainData.subdomain + "." + domainData.domain + ", Owner: " + ownerInfo);

    if (domainData.records.A) {
        for (var a in domainData.records.A) {
            commit[domainData.domain].push(A(domainData.subdomain, IP(domainData.records.A[a]), proxyState));
        }
    }

    if (domainData.records.AAAA) {
        for (var aaaa in domainData.records.AAAA) {
            commit[domainData.domain].push(AAAA(domainData.subdomain, domainData.records.AAAA[aaaa], proxyState));
        }
    }

    if (domainData.records.CNAME) {
        commit[domainData.domain].push(CNAME(domainData.subdomain, domainData.records.CNAME + ".", proxyState));
    }

    if (domainData.records.MX) {
        for (var mx in domainData.records.MX) {
            commit[domainData.domain].push(MX(domainData.subdomain, domainData.records.MX[mx].priority, domainData.records.MX[mx].value + "."));
        }
    }

    if (domainData.records.NS) {
        for (var ns in domainData.records.NS) {
            commit[domainData.domain].push(NS(domainData.subdomain, domainData.records.NS[ns] + "."));
        }
    }

    if (domainData.records.TXT) {
        for (var txt in domainData.records.TXT) {
            if (domainData.records.TXT[txt].name === "@") {
                commit[domainData.domain].push(TXT(domainData.subdomain, domainData.records.TXT[txt].value));
            } else if (domainData.subdomain === "@") {
                commit[domainData.domain].push(TXT(domainData.records.TXT[txt].name, domainData.records.TXT[txt].value));
            } else {
                commit[domainData.domain].push(TXT(domainData.records.TXT[txt].name + "." + domainData.subdomain, domainData.records.TXT[txt].value));
            }
        }
    }

  if (domainData.records.CAA) {
    for (var caa in domainData.records.CAA) {
      var caaRecord = domainData.records.CAA[caa];
      commit[domainData.domain].push(
        CAA(domainData.subdomain, caaRecord.flags, caaRecord.tag, caaRecord.value)
      );
    }
  }

  if (domainData.records.SRV) {
    for (var srv in domainData.records.SRV) {
      var srvRecord = domainData.records.SRV[srv];
      commit[domainData.domain].push(
        SRV(domainData.subdomain, srvRecord.priority, srvRecord.weight, srvRecord.port, srvRecord.target + ".")
      );
    }
  }

  // Handle PTR records
  if (domainData.records.PTR) {
    for (var ptr in domainData.records.PTR) {
      commit[domainData.domain].push(
        PTR(domainData.subdomain, domainData.records.PTR[ptr] + ".")
      );
    }
  }
}

for (var domainName in commit) {
    D(domainName, regNone, providerCf, commit[domainName]);
    }
