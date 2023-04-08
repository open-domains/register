{
  "$phoenix": "../phoenix/domain.schema.json",

  "description": "Online Store",

  "domain": "is-local.org",
  "subdomain": "IridiumUniverse",

  "owner": {
    "repo": "https://github.com/open-domains/register.git",
    "email": "IridiumUniverse9@gmail.com"
  },
 
  "record": {
    "A": ["1.1.1.1", "1.0.0.1"],
    "AAAA": ["::1", "::2"],
    "CNAME": "iridiumuniverse.com",
    "MX": ["www.iridiumuniverse.com", "www.iridiumuniverse.com"],
    "NS": ["WWw.iridiumuniverse.com", "WWW.iridiumuniverse.com"],
    "TXT": ["1234567890"]
  },

  "proxy": true

}
