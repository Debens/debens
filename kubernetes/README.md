# Kubernetes

## Secrets

Secrets are signed using [SealedSecrets](https://github.com/bitnami-labs/sealed-secrets) and stored in source control.

### Create

```
kubectl create secret generic <SECRET_NAME> \
  --dry-run=client \
  --from-literal "<KEY>=<VALUE>" \
  -o yaml | \
kubeseal \
  --controller-name=sealed-secrets-controller \
  --controller-namespace=kube-system \
  --namespace <SECRET_NAMESACE> \
  --name <SECRET_NAME> \
  --format yaml > secrets.yml
```

Multiple `--from-literal "<KEY>=<VALUE>"` may be provided, or use `--from-file`

### Validate

```
cat secrets.yaml | kubeseal --validate
```