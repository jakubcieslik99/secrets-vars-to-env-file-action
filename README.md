## Export GitHub secrets & vars to environment variables & specified file ⚙️

📌 Use this action to export GitHub defined secrets and vars to the runner environment variables and a specified file.

![GitHub top language](https://img.shields.io/github/languages/top/jakubcieslik99/secrets-vars-to-env-file-action)
![GitHub repo size](https://img.shields.io/github/repo-size/jakubcieslik99/secrets-vars-to-env-file-action)

## Inputs

### `secrets`

#### Required

JSON representation of the GitHub secrets (`${{ toJSON(secrets) }}`), use provided placeholder or a boolean `false` value to
skip.

### `vars`

#### Required

JSON representation of the GitHub vars (`${{ toJSON(vars) }}`), use provided placeholder or a boolean `false` value to skip.

### `hydrate-env`

Boolean indicating whether to fill GitHub runner environment variables with the GitHub secrets & vars, default: `true`.

### `generate-file`

File name to export GitHub secrets & vars to, e.g.: `.env`, if not provided, will export to `.env`. If set to `false`, will
not generate the file.

### `include`

Optional comma-separated list of secrets & vars or prefixes to fill/export, e.g.: `MYSQL_USER, MYSQL_PASSWORD` or
`MYSQL_USER, VITE_, NODE_`.

### `exclude`

Optional comma-separated list of secrets & vars to skip filling/exporting, e.g.: `POSTGRES_USER, POSTGRES_PASSWORD`.

### `overwrite-script-envs`

Boolean indicating whether to overwrite existing environment variables defined directly in your GitHub Actions script in case
of any match, default: `true`.

### `append-script-envs`

Optional comma-separated list of GitHub runner environment variables defined directly in your GitHub Actions script to export
to the file, e.g.: `ENV, DIR`.

### `secrets-prefix`

Optional prefix for the secrets, e.g.: `SECRET_`, default: _no prefix_.

### `vars-prefix`

Optional prefix for the vars, e.g.: `VAR_`, default: _no prefix_.

## Example usage

```yaml
uses: jakubcieslik99/secrets-vars-to-env-file-action@main
with:
  secrets: ${{ toJSON(secrets) }}
  vars: ${{ toJSON(vars) }}
```

## Feedback

If you have any feedback, please reach out to me at ✉️ contact@jakubcieslik.com

## Authors

- [@jakubcieslik99](https://www.github.com/jakubcieslik99)
