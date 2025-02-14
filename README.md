<p align="center"><img src="https://raw.githubusercontent.com/open-domains/register/main/media/icon.png" height="128"></p>
<h1 align="center">Open Domains</h1>

<p align="center">
  <a href="https://github.com/open-domains/register/tree/main/domains"><img src="https://img.shields.io/github/directory-file-count/open-domains/register/domains?label=domains&style=for-the-badge&type=file"></a>
  <a href="https://github.com/open-domains/register/issues"><img src="https://img.shields.io/github/issues-raw/open-domains/register?label=issues&style=for-the-badge"></a>
  <a href="https://github.com/open-domains/register/pulls"><img src="https://img.shields.io/github/issues-pr-raw/open-domains/register?label=pull%20requests&style=for-the-badge"></a>
</p>

<p align="center">Free subdomains for personal sites, open-source projects, and more.</p>
<p align="center">Want to find services similar to this? Take a look on <a href="https://free.hrsn.dev/#/?id=domains">Free For Life</a>.</p>

## Notice
NS records are available for donators only. You can donate at: https://donate.stripe.com/cN2eYpaDl4NR21qaEE

## Donate
If you like this service and want us to continue running it, please consider donating!

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://donate.stripe.com/cN2eYpaDl4NR21qaEE)

### Discord Server
Make sure to join our Discord server:
https://discord.gg/kVjkg6VBwa

## Domains

| Available Domains |
|:-:|
| [`*.is-a-fullstack.dev`](https://is-a-fullstack.dev) |
| [`*.is-cool.dev`](https://is-cool.dev) |
| [`*.is-local.org`](https://is-local.org) |
| [`*.is-not-a.dev`](https://is-not-a.dev) |
| [`*.localplayer.dev`](https://localplayer.dev) |

> [!NOTE]
> Wildcard domains (like `*.example.is-not-a.dev`) are supported too, but the reason for their registration should be very clear and described in detail.

[badge-cf]:https://shields.io/badge/%20-cloudflare-blue?logo=cloudflare&style=plastic?cacheSeconds=3600
[badge-dnssec]:https://shields.io/badge/%20-DNSSEC-blue?logo=moleculer&logoColor=white&style=plastic?cacheSeconds=3600
[badge-ssl]:https://shields.io/badge/SSL-Required-blue?style=plastic?cacheSeconds=3600

### Settings

| Setting | [`is-a-fullstack.dev`](https://is-a-fullstack.dev)  | [`is-cool.dev`](https://is-cool.dev) | [`is-local.org`](https://is-local.org) | [`is-not-a.dev`](https://is-not-a.dev) | [`localplayer.dev`](https://localplayer.dev) |
|-|-|-|-|-|-|
| PSL | ✅ | ✅ | ✅ | ✅ | ✅ |
| [DNSSEC][dnssec] | ✅ | ✅ | ✅ | ✅ | ✅ |
| Email | ✅ | ✅ | ✅ | ✅ | ✅ |
| SSL/TLS* | [Full][ssl-full] | [Full][ssl-full] | [Full][ssl-full] | [Full][ssl-full] | [Full][ssl-full] |
| Always Use HTTPS* | ✅ | ✅ | ✅ | ✅ | ✅ |
| HTTP Strict Transport Security (HSTS) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Minimum TLS Version* | 1.2 | 1.2 | 1.2 | 1.2 | 1.2 |
| Opportunistic Encryption, TLS 1.3* | ✅ | ✅ | ✅ | ✅ | ✅ |
| WAF (Web Application Firewall)* | Medium Security Level | Medium Security Level | Medium Security Level | Medium Security Level | Medium Security Level |
| Browser Integrity Check* | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Caching Level][caching-levels], Browser Cache TTL* | Standard, 4 hours | Standard, 4 hours | Standard, 4 hours | Standard, 4 hours | Standard, 4 hours |

\*Only available when your domain has Cloudflare's proxy (`"proxied": true`) enabled

[dnssec]:https://developers.cloudflare.com/dns/additional-options/dnssec
[ssl-full]:https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full
[caching-levels]:https://developers.cloudflare.com/cache/how-to/set-caching-levels

## Register

### Manual
1. **Star** and **[Fork](https://github.com/open-domains/register/fork)** this repository.
2. Add a new file called `example.domain.json` in the `/domains` folder to register `example` subdomain.
3. Edit the file (below is just an **example**, provide a **valid** JSON file with your needs, the format is very strict. These records should not show up inside your file.

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
        "TXT": ["example_verification=1234567890"],
        "CAA": [
            { "flags": 0, "tag": "issue", "value": "letsencrypt.org" },
            { "flags": 0, "tag": "issuewild", "value": "sectigo.com" }
        ],
        "SRV": [
            { "priority": 10, "weight": 60, "port": 5060, "target": "sipserver.example.com" },
            { "priority": 20, "weight": 10, "port": 5061, "target": "sipbackup.example.com" }
        ]
    },

    "proxied": false
}

```

4. Your pull request will be reviewed and merged. Please don't ignore the pull request checklist. If you ignore the checklist, your pull request will be ignored too. _Make sure to keep an eye on it in case we need you to make any changes!_
5. After the pull request is merged, please allow up to 24 hours for the changes to propagate _(usually, it takes 5..15 minutes)_
6. Enjoy your new domain!

*Domains used for illegal purposes will be removed and permanently banned. Please, provide a clear description of your resource in the pull request.*

### License
This project is under a [MIT License](https://github.com/open-domains/register/blob/main/LICENSE).
