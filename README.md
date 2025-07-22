<p align="center">
  <img src="https://raw.githubusercontent.com/open-domains/register/main/media/icon.png" height="128" alt="Open Domains Logo">
</p>

<h1 align="center">Open Domains</h1>

<p align="center">
  <a href="https://github.com/open-domains/register/tree/main/domains">
    <img src="https://img.shields.io/github/directory-file-count/open-domains/register/domains?label=domains&style=for-the-badge&type=file" alt="Domain Count">
  </a>
  <a href="https://github.com/open-domains/register/issues">
    <img src="https://img.shields.io/github/issues-raw/open-domains/register?label=issues&style=for-the-badge" alt="Open Issues">
  </a>
  <a href="https://github.com/open-domains/register/pulls">
    <img src="https://img.shields.io/github/issues-pr-raw/open-domains/register?label=pull%20requests&style=for-the-badge" alt="Open Pull Requests">
  </a>
</p>

<p align="center"><strong>Free subdomains for personal sites, open-source projects, and more.</strong></p>
<p align="center">Want to find similar services? Check out <a href="https://free.hrsn.dev/#/?id=domains">Free For Life</a>.</p>

---

## ð¸ Donate

If you like this service and want it to keep running, please consider donating!

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://donate.stripe.com/cN2eYpaDl4NR21qaEE)

> **Note:** NS records are available for donators only.

---

## ð¬ Join Our Community

Come hang out on our Discord: [https://discord.gg/kVjkg6VBwa](https://discord.gg/kVjkg6VBwa)

---

## ð Available Domains

| Available Domains |
|:-:|
| [`*.is-a-fullstack.dev`](https://is-a-fullstack.dev) |
| [`*.is-cool.dev`](https://is-cool.dev) |
| [`*.is-local.org`](https://is-local.org) |
| [`*.is-not-a.dev`](https://is-not-a.dev) |
| [`*.localplayer.dev`](https://localplayer.dev) |
| [`*.open-comm.org`](https://open-comm.org) |

> [!NOTE]
> Wildcard domains (like `*.example.is-not-a.dev`) are supported too, but the reason for their registration should be very clear and described in detail.
>
> **Note:** `open-comm.org` is not currently listed on the [Public Suffix List (PSL)](https://publicsuffix.org/).

---

### âï¸ Settings

| Setting | [`is-a-fullstack.dev`](https://is-a-fullstack.dev)  | [`is-cool.dev`](https://is-cool.dev) | [`is-local.org`](https://is-local.org) | [`is-not-a.dev`](https://is-not-a.dev) | [`localplayer.dev`](https://localplayer.dev) | [`open-comm.org`](https://open-comm.org) |
|-|-|-|-|-|-|-|
| PSL | â | â | â | â | â | â |
| [DNSSEC][dnssec] | â | â | â | â | â | â |
| Email | â | â | â | â | â | â |
| SSL/TLS* | [Full][ssl-full] | [Full][ssl-full] | [Full][ssl-full] | [Full][ssl-full] | [Full][ssl-full] | [Full][ssl-full] |
| Always Use HTTPS* | â | â | â | â | â | â |
| HTTP Strict Transport Security (HSTS) | â | â | â | â | â | â |
| Minimum TLS Version* | 1.2 | 1.2 | 1.2 | 1.2 | 1.2 | 1.2 |
| Opportunistic Encryption, TLS 1.3* | â | â | â | â | â | â |
| WAF (Web Application Firewall)* | Medium Security Level | Medium Security Level | Medium Security Level | Medium Security Level | Medium Security Level | Medium Security Level |
| Browser Integrity Check* | â | â | â | â | â | â |
| [Caching Level][caching-levels], Browser Cache TTL* | Standard, 4 hours | Standard, 4 hours | Standard, 4 hours | Standard, 4 hours | Standard, 4 hours | Standard, 4 hours |

\*Only available when your domain has Cloudflare's proxy (`"proxied": true`) enabled

[dnssec]:https://developers.cloudflare.com/dns/additional-options/dnssec  
[ssl-full]:https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full  
[caching-levels]:https://developers.cloudflare.com/cache/how-to/set-caching-levels

---

## ð Register

### Manual Registration

1. **Star** and **[Fork](https://github.com/open-domains/register/fork)** this repository.
2. Add a new file called `example.domain.json` in the `/domains` folder to register `example` subdomain.
3. Edit the file (below is just an **example**, provide a **valid** JSON file with your needs):

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

4. Create a pull request with the file you added.
5. **Watch your PR** â if you ignore required changes, it will be ignored too.
6. Once merged, please allow up to 24 hours for changes to propagate _(usually it takes just 5â15 minutes)_.
7. Enjoy your new domain!

> â ï¸ Domains used for illegal or malicious purposes will be removed and banned permanently.

---

## âï¸ License

This project is licensed under the [MIT License](https://github.com/open-domains/register/blob/main/LICENSE).
