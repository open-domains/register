var regNone = NewRegistrar("none");
var providerCf = DnsProvider(NewDnsProvider("cloudflare"));

var proxy = { // https://stackexchange.github.io/dnscontrol/providers/cloudflare
  on: { "cloudflare_proxy": "on" },
  off: { "cloudflare_proxy": "off" }
}

/**
 * Note: glob() is only an internal undocumented helper function (maybe risky).
 *
 * @param {String} filesPath
 * @returns {{
 *  name: string,
 *  data: {
 *    description: string,
 *    domain: string,
 *    subdomain: string,
 *    owner?: {repo?: string, email?: string},
 *    record: {TXT?: string[], A?: string[], AAAA?: string[], CNAME?: string, NS?: string[]},
 *    proxy?: boolean
 *  }}[]}
*/

function getDomainsList(filesPath) {
  var result = [];
  var files = glob.apply(null, [filesPath, true, '.json']);

  for (var i = 0; i < files.length; i++) {
    var basename = files[i].split('/').reverse()[0];
    var name = basename.split('.')[0];

    result.push({name: name, data: require(files[i])});
  }

  return result;
}

var domains = getDomainsList('./domains');

/**
 * @type {{}}
*/

var commit = {};

for (var idx in domains) {
  var domainData = domains[idx].data;
  var proxyState = proxy.on; // enabled by default

  if (!commit[domainData.domain]) {
    commit[domainData.domain] = [];
  }

  if (domainData.proxy === false) {
    proxyState = proxy.off;
  }

  if (domainData.record.A) {
    for (var a in domainData.record.A) {
      commit[domainData.domain].push(
        A(domainData.subdomain, IP(domainData.record.A[a]), proxyState) // https://stackexchange.github.io/dnscontrol/js#A
      )
    }
  }

  if (domainData.record.AAAA) {
    for (var aaaa in domainData.record.AAAA) {
      commit[domainData.domain].push(
        AAAA(domainData.subdomain, domainData.record.AAAA[aaaa], proxyState) // https://stackexchange.github.io/dnscontrol/js#AAAA
      )
    }
  }

  if (domainData.record.CNAME) {
    commit[domainData.domain].push(
      CNAME(domainData.subdomain, domainData.record.CNAME + ".", proxyState) // https://stackexchange.github.io/dnscontrol/js#CNAME
    )
  }
  
  if (domainData.record.MX) {
    for (var mx in domainData.record.MX) {
      commit[domainData.domain].push(
        MX(domainData.subdomain, 10, domainData.record.MX[mx] + ".") // https://stackexchange.github.io/dnscontrol/js#CNAME
      )
    }  
  }

  if (domainData.record.NS) {
    for (var ns in domainData.record.NS) {
      commit[domainData.domain].push(
        NS(domainData.subdomain, domainData.record.NS[ns] + ".") // https://stackexchange.github.io/dnscontrol/js#NS
      )
    }
  }

  if (domainData.record.TXT) {
    for (var txt in domainData.record.TXT) {
      commit[domainData.domain].push(
        TXT(domainData.subdomain, domainData.record.TXT[txt]) // https://stackexchange.github.io/dnscontrol/js#TXT
      )
    }
  }
}

for (var domainName in commit) {
  D(domainName, regNone, providerCf, commit[domainName]);
}
