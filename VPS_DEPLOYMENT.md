# Clotya VPS Deployment Guide

This guide is for buyers who want to host Clotya on a VPS instead of Vercel, Railway, or Render. It covers aaPanel first, then a generic PM2/Nginx setup that also applies to many control panels.

## Recommended VPS Requirements

- Ubuntu 22.04 or 24.04
- 2 CPU cores or more
- 2 GB RAM minimum, 4 GB recommended
- 20 GB storage or more
- Node.js 20+
- pnpm 9+
- PM2
- Nginx
- SSL certificate
- MongoDB Atlas or separate MongoDB server

Recommended production domains:

- Frontend: `https://yourdomain.com`
- Backend API: `https://api.yourdomain.com`

The existing live demo is available at:

```text
https://clotya.vercel.app
```

## Environment Values For VPS

Backend `apps/backend/.env`:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clotya
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=https://yourdomain.com
PAYSTACK_SECRET_KEY=sk_live_or_sk_test_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=no-reply@yourdomain.com
SMTP_PASS=your_smtp_password
```

Frontend `apps/frontend/.env`:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Option 1: Deploy With aaPanel

### 1. Install aaPanel

Install aaPanel on a fresh Ubuntu VPS using the official aaPanel installation command from your aaPanel account or the aaPanel website.

After installation, open the aaPanel URL in your browser and complete the setup.

### 2. Install Required aaPanel Software

Inside aaPanel, install:

- Nginx
- Node.js Manager
- PM2 Manager if available
- SSL/Let's Encrypt tool
- File Manager or Git tool

MongoDB can be installed separately, but MongoDB Atlas is recommended because it is easier for most buyers to maintain.

### 3. Upload The Project

Upload the project ZIP and extract it to a directory such as:

```text
/www/wwwroot/clotya
```

Or clone from your private repository:

```bash
cd /www/wwwroot
git clone your-repository-url clotya
cd clotya
```

### 4. Install Node.js And pnpm

Use aaPanel's Node.js Manager to install Node.js 20 or newer.

Then install pnpm:

```bash
npm install -g pnpm
```

### 5. Install Dependencies

```bash
cd /www/wwwroot/clotya
pnpm install
```

### 6. Add Environment Files

Create:

```text
/www/wwwroot/clotya/apps/backend/.env
/www/wwwroot/clotya/apps/frontend/.env
```

Use the production values shown above.

### 7. Build The Frontend

```bash
cd /www/wwwroot/clotya
pnpm --filter @clotya/frontend build
```

### 8. Start Backend With PM2

```bash
cd /www/wwwroot/clotya/apps/backend
pm2 start server.js --name clotya-backend
pm2 save
```

### 9. Start Frontend With PM2

```bash
cd /www/wwwroot/clotya/apps/frontend
pm2 start "pnpm start" --name clotya-frontend
pm2 save
```

The frontend should run on port `3000`.
The backend should run on port `5000`.

### 10. Configure aaPanel Websites

Create two websites in aaPanel:

- `yourdomain.com`
- `api.yourdomain.com`

For `yourdomain.com`, reverse proxy to:

```text
http://127.0.0.1:3000
```

For `api.yourdomain.com`, reverse proxy to:

```text
http://127.0.0.1:5000
```

Enable SSL for both domains.

### 11. Confirm API And Frontend

Open:

```text
https://api.yourdomain.com
```

Expected response:

```json
{ "message": "API is running..." }
```

Then open:

```text
https://yourdomain.com
```

## Option 2: Generic VPS With PM2 And Nginx

### 1. Install System Packages

```bash
sudo apt update
sudo apt install -y nginx git curl
```

Install Node.js 20 or newer using your preferred Node.js installer, then:

```bash
npm install -g pnpm pm2
```

### 2. Upload Or Clone Project

```bash
cd /var/www
git clone your-repository-url clotya
cd clotya
pnpm install
```

### 3. Configure Env Files

Create:

```text
/var/www/clotya/apps/backend/.env
/var/www/clotya/apps/frontend/.env
```

Use the production env values above.

### 4. Build Frontend

```bash
cd /var/www/clotya
pnpm --filter @clotya/frontend build
```

### 5. Start Apps With PM2

```bash
cd /var/www/clotya/apps/backend
pm2 start server.js --name clotya-backend

cd /var/www/clotya/apps/frontend
pm2 start "pnpm start" --name clotya-frontend

pm2 save
pm2 startup
```

Run the command printed by `pm2 startup` so PM2 restarts after server reboot.

### 6. Nginx Config For Frontend

Create `/etc/nginx/sites-available/clotya-frontend`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7. Nginx Config For Backend API

Create `/etc/nginx/sites-available/clotya-api`:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable both sites:

```bash
sudo ln -s /etc/nginx/sites-available/clotya-frontend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/clotya-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. Add SSL

Use Certbot or your hosting panel's SSL tool to issue SSL certificates for:

- `yourdomain.com`
- `www.yourdomain.com`
- `api.yourdomain.com`

After SSL is active, update:

```env
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

Then rebuild and restart:

```bash
cd /var/www/clotya
pnpm --filter @clotya/frontend build
pm2 restart clotya-frontend
pm2 restart clotya-backend
```

## Option 3: Other Control Panels

For cPanel, CyberPanel, HestiaCP, CloudPanel, Plesk, or similar panels:

1. Create one Node.js app for the backend.
2. Set the backend startup file to `apps/backend/server.js`.
3. Set backend port to `5000` or the port assigned by the panel.
4. Add backend environment variables from `apps/backend/.env.example`.
5. Create another Node.js app for the frontend.
6. Build the frontend with `pnpm --filter @clotya/frontend build`.
7. Start frontend with `pnpm --filter @clotya/frontend start`.
8. Point the main domain to the frontend app.
9. Point `api.yourdomain.com` to the backend app.
10. Enable SSL for both domains.

If the panel only supports one Node.js app, run both apps with PM2 and use the panel's reverse proxy or Nginx manager to route domains to ports `3000` and `5000`.

## Updating The App On VPS

```bash
cd /var/www/clotya
git pull
pnpm install
pnpm --filter @clotya/frontend build
pm2 restart clotya-backend
pm2 restart clotya-frontend
```

## Troubleshooting

### API shows CORS errors

Confirm backend `.env` has:

```env
FRONTEND_URL=https://yourdomain.com
```

Then restart backend:

```bash
pm2 restart clotya-backend
```

### Frontend cannot reach API

Confirm frontend `.env` has:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

Then rebuild frontend:

```bash
pnpm --filter @clotya/frontend build
pm2 restart clotya-frontend
```

### Images do not upload

Check Cloudinary credentials in backend `.env`.

### Payments do not initialize

Check Paystack secret key and make sure callback URLs in Paystack point to:

```text
https://yourdomain.com/checkout/success
```

