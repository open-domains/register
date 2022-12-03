<h1 align="center">Open Domains</h1>

<p align="center">Free subdomains for personal sites, open-source projects, and more.</p>

<p align="center">Want to find services similar to this? Take a look on <a href="https://free-for.dev/#/?id=domain">free-for.dev</a>.</p>

## Donate
If you like this service and want us to continue running it, please consider donating!

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/andrewstechyoutube)

## Domains

| Domain | Features |
|-|-|
| [`*.is-not-a.dev`](https://is-not-a.dev) | ![cf][badge-cf] ![dnssec][badge-dnssec] |
| [`*.localplayer.dev`](https://localplayer.dev) | ![cf][badge-cf] ![dnssec][badge-dnssec] |

Wildcard domains (like `*.example.is-not-a.dev`) are supported too, but the reason for their registration should be very clear and described in detail.

[badge-cf]:https://shields.io/badge/%20-cloudflare-blue?logo=cloudflare&style=plastic?cacheSeconds=3600
[badge-dnssec]:https://shields.io/badge/%20-DNSSEC-blue?logo=moleculer&logoColor=white&style=plastic?cacheSeconds=3600
[badge-ssl]:https://shields.io/badge/SSL-Required-blue?style=plastic?cacheSeconds=3600

### Settings

| Setting | `is-not-a.dev` | `localplayer.dev` |
|-|-|-|
| [DNSSEC][dnssec]| ✅ | ✅ |
| Email | ❌ | ❌ |
| SSL/TLS* | [Full][ssl-full] | [Full][ssl-full] |
| Always Use HTTPS* | ✅ | ✅ |
| HTTP Strict Transport Security (HSTS) | ✅ | ✅ |
| Minimum TLS Version* | 1.2 | 1.2 |
| Opportunistic Encryption, TLS 1.3* | ✅ | ✅ |
| WAF (Web Application Firewall)* | Medium Security Level | Medium Security Level |
| Browser Integrity Check* | ✅ | ✅ |
| [Caching Level][caching-levels], Browser Cache TTL * | Standard, 4 hours | Standard, 4 hours |
| [Crawler Hints][crawler-hints]* | ✅ | ✅ |
| [HTTP/2][http2], [HTTP/2 to Origin][http2-to-origin], HTTP/3 (with QUIC) * | ✅ | ✅ |
| [0-RTT Connection Resumption][0rtt]* | ✅ | ✅ |
| [gRPC][grpc], WebSockets* | ✅ | ✅ |
| [Pseudo IPv4][pseudo-ipv4]* | Add header | Add header |
| IP Geolocation (HTTP header `CF-IPCountry`)* | ✅ | ✅ |
| Maximum Upload Size* | 100 MB | 100 MB |

\*Only available when your domain has Cloudflare's proxy (`"proxy": true`) enabled

[dnssec]:https://developers.cloudflare.com/dns/additional-options/dnssec
[ssl-full]:https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/
[ssl-flex]:https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/
[caching-levels]:https://developers.cloudflare.com/cache/how-to/set-caching-levels
[crawler-hints]:https://blog.cloudflare.com/crawler-hints-how-cloudflare-is-reducing-the-environmental-impact-of-web-searches/
[http2]:https://www.cloudflare.com/website-optimization/http2/what-is-http2/
[http2-to-origin]:https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin
[0rtt]:https://developers.cloudflare.com/fundamentals/network/0-rtt-connection-resumption/
[grpc]:https://support.cloudflare.com/hc/en-us/articles/360050483011
[pseudo-ipv4]:https://support.cloudflare.com/hc/en-us/articles/229666767

## Register a Domain

1. **Star** and **[Fork](https://github.com/open-domains/register/fork)**
2. Add a new file called `example.domain.json` in the `/domains` folder to register `example` subdomain
3. Edit it (below is just an **example**, provide a **valid** JSON file with your needs, the format is very strict; format you can [check here](https://jsonlint.com)):

```json
{
  "$schema": "../schemas/domain.schema.json",

  "description": "Project Description",

  "domain": "is-not-a.dev",
  "subdomain": "example",

  "owner": {
    "repo": "https://github.com/username/repo",
    "email": "hello@example.com"
  },

  "record": {
    "A": ["1.1.1.1", "1.0.0.1"],
    "AAAA": ["::1", "::2"],
    "CNAME": "example.com.",
    "NS": ["ns1.example.com.", "ns2.example.com."],
    "TXT": ["example_verification=1234567890"]
  },

  "proxy": false
}
```

4. Your pull request will be reviewed and merged. Please, don't ignore the PR checklist. If you ignore this repository rules, your PR will be ignored too. _Make sure to keep an eye on it in case we need you to make any changes!_
5. After the pull request is merged, please allow up to 24 hours for the changes to propagate _(usually, it takes 5..15 minutes)_
6. Enjoy your new domain!

*Domains used for illegal purposes will be removed and permanently banned. Please, provide a clear description of your resource in the pull request.*

#### Credits
The CI which this service uses is forked from [here](https://github.com/tarampampam/free-domains).
