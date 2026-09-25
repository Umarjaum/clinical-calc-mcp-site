# Quick start

`clinical-calc-mcp` is a Python MCP server that a compatible desktop AI client can launch as a local process. It uses **stdio** (standard input and output) for MCP messages. It is not a hosted HTTP MCP service.

## Choose the release track

### Stable PyPI release: 0.1.0 (three tools)

Install in a virtual environment when possible:

```bash
python -m pip install clinical-calc-mcp
```

This is the latest version currently published on PyPI. It provides the original three calculator tools. See the [PyPI release page](https://pypi.org/project/clinical-calc-mcp/) for the authoritative current version.

### Current GitHub source: six tools

Install the latest code into an isolated environment with [`uv`](https://docs.astral.sh/uv/):

```bash
uvx --from git+https://github.com/Umarjaum/clinical-calc-mcp.git clinical-calc-mcp
```

This obtains the source and runtime dependencies on first use. The source branch includes `vital_signs_summary`, `parkland_formula`, `bsa_mosteller`, `drip_rate_calculator`, `temperature_converter`, and `weight_converter`. The six-tool `0.2.0` source has not yet been published to PyPI; check the package README before using a release-numbered installation instruction.

## Connect an MCP client

Use the configuration shape your application documents. For current GitHub source with clients that use an `mcpServers` JSON map:

```json
{
  "mcpServers": {
    "clinical-calc-mcp": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/Umarjaum/clinical-calc-mcp.git",
        "clinical-calc-mcp"
      ]
    }
  }
}
```

For the stable PyPI package, replace the arguments with `["--from", "clinical-calc-mcp", "clinical-calc-mcp"]`. VS Code uses a top-level `servers` object and a `type: "stdio"` field instead; see the detailed [Claude Desktop, Cursor, and VS Code guide](https://github.com/Umarjaum/clinical-calc-mcp/blob/main/docs/client-setup.md). Restart or reload the MCP client after saving its settings, then check that the server appears and its tools are listed.

## Confirm the connection

Try an arithmetic-only example using synthetic values, such as converting `37 C` to Fahrenheit. Confirm the returned value and unit yourself. Tool responses do not establish whether a result is appropriate for a person.

If the client cannot start the server, check that `uv` and `uvx` are installed, that the client can access the executable on its process path, and that outbound internet is available for the first source/dependency download. Look at the client’s MCP logs for a JSON configuration or startup error.

## Privacy, security, and limitations

Calculations execute locally and the package does not make a network request for each calculation. No patient file storage or upload is part of this project. However, an AI client may process conversation content according to its own policies, so do not provide protected health information unless permitted by the applicable organization and client policy.

This is arithmetic software, not validated clinical decision support. It does not diagnose, triage, prescribe, suggest treatment, or assess a person's clinical condition. Review the project’s [clinical-safety notes](https://github.com/Umarjaum/clinical-calc-mcp/blob/main/docs/clinical-safety.md), follow current local protocols, and independently verify inputs, units, calculations, and outputs.

## Project links

- [Python package source](https://github.com/Umarjaum/clinical-calc-mcp)
- [Website source](https://github.com/Umarjaum/clinical-calc-mcp-site)
- [PyPI package](https://pypi.org/project/clinical-calc-mcp/)
- [Client setup guide](https://github.com/Umarjaum/clinical-calc-mcp/blob/main/docs/client-setup.md)
- [Contribution guide](https://github.com/Umarjaum/clinical-calc-mcp/blob/main/CONTRIBUTING.md)
- [Issues](https://github.com/Umarjaum/clinical-calc-mcp/issues) · [Discussions](https://github.com/Umarjaum/clinical-calc-mcp/discussions)
