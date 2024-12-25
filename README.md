# get-latest-terraform-version

A GitHub Action to get the latest Terraform version.

## Usage

```yaml
- uses: waniji/get-latest-terraform-version@v1
  id: latest_terraform_version
  with:
    # Include prerelease version.
    # (e.g. 1.11.0-alpha20241218)
    #
    # Default: false
    include_prerelease: false

- name: Print latest version
  run: echo "${{ steps.latest_terraform_version.outputs.latest_version }}"
```

## License

The scripts and documentation in this project are released under the
[MIT License](LICENSE)
