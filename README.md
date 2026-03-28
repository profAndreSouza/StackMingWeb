# VISÃO GERAL

```text
Monorepo (main)
 ├── frontend/
 ├── backend/
 └── docker-compose.yml

Deploy:
 ├── Tag frontend-* → deploy só frontend
 └── Tag backend-* → deploy só backend

Infra:
 └── AWS EC2 + Docker + GitHub Actions
```


# ETAPA 1 — PREPARAR A EC2

## 1. Criar instância na Amazon Web Services

* Tipo: t2.micro (ou maior)
* SO: Ubuntu 22.04
* Liberar portas (algumas portas foram trocadas devido a restrição de firewall da instituição):

  * 22 (SSH)
  * 80 (frontend)
  * 1883 (mqtt)
  * 3306 (mysql)  
  * 8080 (backend)
  * 8082 (nodered)
  * 8083 (influxdb)
  * 8084 (grafana)


---

## 2. Acessar via SSH

```bash
ssh ubuntu@SEU_IP
```

---

## 3. Instalar Docker

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker ubuntu
```


---

## 4. Clonar repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPO.git
cd SEU_REPO

sudo docker-compose up -d --build
```

Comandos uteis

``` bash
docker system prune -a -f --volumes
docker system prune -a -f

docker-compose up -d frontend
docker-compose up -d backend
docker-compose up -d nodered
docker-compose up -d mqtt influxdb grafana mysql
```

---

# 🔐 ETAPA 2 — CONFIGURAR ACESSO AUTOMÁTICO (CI/CD)

## 1. Gerar chave SSH na sua instancia da EC2

```bash
ssh-keygen -t rsa -b 4096 -C "deploy"

cat github.pub >> ~/.ssh/authorized_keys
```


## 2. Ajustar permissões

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 3. Copiar a chave

```bash
cat github
```

Vai aparecer algo assim:
```bash
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
```

Copie tudo inclusive o BEGIN e o END


## 4. Adicionar chave privada no GitHub

“New repository secret”

E crie 3 secrets

Name: EC2_HOST
Value: 3.23.104.248

Name: EC2_USER
Value: ubuntu

Name: EC2_SSH_KEY (o mais importante)
Value: Cole TUDO, exatamente assim:

-----BEGIN RSA PRIVATE KEY-----
xxxxx
xxxxx
-----END RSA PRIVATE KEY-----


# ETAPA 3 — GERAR RELEASES PARCIAIS

## FRONTEND

```bash
git tag frontend-v1.0.0 $(git subtree split --prefix=frontend)
git push origin frontend-v1.0.0
```

---

## BACKEND

```bash
git tag backend-v1.0.0 $(git subtree split --prefix=backend)
git push origin backend-v1.0.0
```

---

# ETAPA 4 — GITHUB ACTIONS (CI/CD)

Crie:

```text
.github/workflows/deploy.yml
```

---

## deploy.yml COMPLETO

```yaml
name: Deploy EC2

on:
  push:
    tags:
      - 'frontend-*'
      - 'backend-*'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Detectar tipo
        id: detect
        run: |
          if [[ "${GITHUB_REF}" == refs/tags/frontend-* ]]; then
            echo "type=frontend" >> $GITHUB_OUTPUT
          else
            echo "type=backend" >> $GITHUB_OUTPUT
          fi

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |

            echo "=== INICIANDO DEPLOY ==="

            cd ~/StackMingWeb

            echo "Atualizando código..."
            git fetch --all

            echo "Checkout da tag..."
            git checkout $GITHUB_REF_NAME

            if [ "${{ steps.detect.outputs.type }}" = "backend" ]; then
              echo "=== DEPLOY BACKEND ==="
              docker-compose build backend
              docker-compose up -d --build --force-recreate --no-deps backend

            else
              echo "=== DEPLOY FRONTEND ==="
              docker-compose build frontend
              docker-compose up -d frontend --force-recreate --no-deps frontend
            fi

            echo "=== DEPLOY FINALIZADO ==="
```


# ETAPA 5 — DEPLOY

## 1. Fazer alteração no backend

```bash
git add .
git commit -m "update backend"
git push
```

---

## 2. Criar release frontend

```bash
git tag backend-v1.0.4
git push origin backend-v1.0.4
```

---

## RESULTADO

Automaticamente:

* GitHub Actions roda
* conecta na EC2
* faz checkout da tag
* builda container
* sobe serviço atualizado
