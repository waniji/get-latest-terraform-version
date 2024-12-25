# get-terraform-latest-version

A GitHub Action to get the latest Terraform version.

## Usage

```yaml
- uses: waniji/get-terraform-latest-version@v1
  id: terraform_latest_version
  with:
    # Include prerelease version.
    # (e.g. 1.11.0-alpha20241218)
    #
    # Default: false
    include_prerelease: false

- name: Print latest version
  run: echo "${{ steps.terraform_latest_version.outputs.latest_version }}"
```

## License

The scripts and documentation in this project are released under the
[MIT License](LICENSE)
