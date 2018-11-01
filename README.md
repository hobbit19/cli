# CLI

Command-line interface commands for witnesses to quickly update signings-keys, parameters or disable witness. Including RPC-failover, RPC-node as argument and robust error handling.

## Installation


1.) Clone Repository and install packages
```
git clone https://github.com/witness-essentials/cli.git
cd cli
npm i # or yarn
```

2.) Edit your Config
```
cp configs/config.example.json configs/config.json
nano configs/config.json
```

#### Config Explanation

- WITNESS: Add you witness username.

- SIGNING_KEYS: Add **all** your signing keys here as pairs. As of HF20, you can now also update your witness with your current private signing key. This is also necessary for updating new properties.

```
 [{ "public": "STM7..", "private": "5JS.." }, { "public": "STM5..", "private": "5PD.." }, { .. }]
```

- Private Key (Optional):  As of HF20, the private active key is optional and/or only needed if the witness is disabled and you want to enable it again.


## Start

There are 3 commands you can run. If you want to use a specific RPC_NODE, then you can use it as the 2nd argument (except for enable, where it's the 3rd argument)

Active a specific signing-key
```
npm run enable <SIGNING_KEY> <OPTIONAL_RPC_NODE>
```

Disable your witness directly
```
npm run disable <OPTIONAL_RPC_NODE>
```

Change your witness parameters
```
npm run update <OPTIONAL_RPC_NODE>
```

## Support

If you find this tool useful, consider voting for me (@therealwolf) as a witness (https://steemit.com/~witnesses) or <a href="https://v2.steemconnect.com/sign/account-witness-vote?witness=therealwolf&approve=1">directly with steemconnect</a>.
