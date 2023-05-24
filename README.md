<p align="center"><img src="https://raw.githubusercontent.com/open-domains/register/main/media/icon.png" height="128"></p>
<h1 align="center">Open Domains</h1>

<p align="center">
  <a href="https://github.com/open-domains/register/tree/main/domains"><img src="https://img.shields.io/github/directory-file-count/open-domains/register/domains?label=domains&style=for-the-badge&type=file"></a>
  <a href="https://github.com/open-domains/register/issues"><img src="https://img.shields.io/github/issues-raw/open-domains/register?label=issues&style=for-the-badge"></a>
  <a href="https://github.com/open-domains/register/pulls"><img src="https://img.shields.io/github/issues-pr-raw/open-domains/register?label=pull%20requests&style=for-the-badge"></a>
</p>

<p align="center">Free subdomains for personal sites, open-source projects, and more.</p>
<p align="center">Want to find services similar to this? Take a look on <a href="https://free-for.life/#/?id=domains">free-for.life</a>.</p>

## Notice

While we do support NS records we now only now accept NS records for valid reasons.

## Donate

If you like this service and want us to continue running it, please consider donating!

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/andrewstechyoutube)

### Discord Server
Make sure to join our Discord server:
https://discord.gg/kVjkg6VBwa

## Domains

| Available Domains |
|:-:|
| [`*.is-cool.dev`](https://is-cool.dev) |
| [`*.is-local.org`](https://is-local.org) |
| [`*.is-not-a.dev`](https://is-not-a.dev) |
| [`*.localplayer.dev`](https://localplayer.dev) |

> Wildcard domains (like `*.example.is-not-a.dev`) are supported too, but the reason for their registration should be very clear and described in detail.

[badge-cf]:https://shields.io/badge/%20-cloudflare-blue?logo=cloudflare&style=plastic?cacheSeconds=3600
[badge-dnssec]:https://shields.io/badge/%20-DNSSEC-blue?logo=moleculer&logoColor=white&style=plastic?cacheSeconds=3600
[badge-ssl]:https://shields.io/badge/SSL-Required-blue?style=plastic?cacheSeconds=3600

### Unsupported Services

We currently do not support Cloudflare (for NS), Netlify (for website) or Vercel (for websites).

This will hopefully be fixed soon.

### Settings

| Setting                                              | [`is-cool.dev`](https://is-cool.dev) | [`is-local.org`](https://is-local.org) | [`is-not-a.dev`](https://is-not-a.dev) | [`localplayer.dev`](https://localplayer.dev) |
|------------------------------------------------------|--------------------------------------|----------------------------------------|----------------------------------------|----------------------------------------------|
| [DNSSEC][dnssec]                                     | ✅                                   | ✅                                     | ✅                                     | ✅                                           |
| Email                                                | ✅                                   | ✅                                     | ✅                                     | ✅                                           |
| SSL/TLS*                                             | [Full][ssl-full]                     | [Full][ssl-full]                       | [Full][ssl-full]                       | [full][ssl-full]                             |
| Always Use HTTPS*                                    | ✅                                   | ✅                                     | ✅                                     | ✅                                           |
| HTTP Strict Transport Security (HSTS)                | ✅                                   | ✅                                     | ✅                                     | ✅                                           |
| Minimum TLS Version*                                 | 1.2                                  | 1.2                                    | 1.2                                    | 1.2                                          |
| Opportunistic Encryption, TLS 1.3*                   | ✅                                   | ✅                                     | ✅                                     | ✅                                           |
| WAF (Web Application Firewall)*                      | Medium Security Level                | Medium Security Level                  | Medium Security Level                  | Medium Security Level                        |
| Browser Integrity Check*                             | ✅                                   | ✅                                     | ✅                                     | ✅                                           |
| [Caching Level][caching-levels], Browser Cache TTL*  | Standard, 4 hours                    | Standard, 4 hours                      | Standard, 4 hours                      | Standard, 4 hours                            |

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

1. **Star** and **[Fork](https://github.com/open-domains/register/fork)** this repository
2. Add a new file called `example.domain.json` in the `/domains` folder to register `example` subdomain
3. Edit it (below is just an **example**, provide a **valid** JSON file with your needs, the format is very strict; format you can [check here](https://jsonlint.com)):

```json
{
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
        "CNAME": "example.com",
        "MX": ["mx1.example.com", "mx2.example.com"],
        "NS": ["ns1.example.com", "ns2.example.com"],
        "TXT": ["example_verification=1234567890"]
    },

    "proxy": false
}
```

4. Your pull request will be reviewed and merged. Please don't ignore the pull request checklist. If you ignore the checklist, your pull request will be ignored too. _Make sure to keep an eye on it in case we need you to make any changes!_
5. After the pull request is merged, please allow up to 24 hours for the changes to propagate _(usually, it takes 5..15 minutes)_
6. Enjoy your new domain!

*Domains used for illegal purposes will be removed and permanently banned. Please, provide a clear description of your resource in the pull request.*

### License

This project is under the [MIT License](https://github.com/open-domains/register/blob/main/LICENSE).
