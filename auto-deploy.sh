#!/bin/bash

# ========================================
# Auto Deploy Script for NodeJS Email Template
# ========================================

# Enable strict mode
set -euo pipefail
trap 'echo -e "\033[1;31m[ERROR]\033[0m An error occurred. Exiting..."; exit 1' ERR

# Define colors
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
CYAN='\033[1;36m'
NC='\033[0m' # No color

# Variables
PROJECT_NAME="nodejs-email-template"
APP_NAME="email-template-app"
GIT_REPO="https://github.com/MdSamsuzzohaShayon/nodejs-email-template.git"
HOME_DIR="$HOME"
PROJECT_DIR="$HOME_DIR/$PROJECT_NAME"
TEMP_DB_BACKUP="$HOME_DIR/database_backup.sqlite"
ENV_FILE="$PROJECT_DIR/config/.env"
PORT=5001
TEST_ROUTE="/test"

# ===============================
# Helper Functions
# ===============================
function info() { echo -e "${CYAN}➤ $1${NC}"; }
function success() { echo -e "${GREEN}✔ $1${NC}"; }
function warn() { echo -e "${YELLOW}! $1${NC}"; }
function error_exit() { echo -e "${RED}✘ $1${NC}"; exit 1; }

# ===============================
# 1️⃣ Backup database.sqlite
# ===============================
if [ -f "$PROJECT_DIR/database.sqlite" ]; then
    info "Backing up existing database.sqlite..."
    cp "$PROJECT_DIR/database.sqlite" "$TEMP_DB_BACKUP"
    success "Database backup saved to $TEMP_DB_BACKUP"
else
    warn "No database.sqlite found to backup."
fi

# ===============================
# 2️⃣ Remove old project folder
# ===============================
info "Removing old project folder..."
rm -rf "$PROJECT_DIR"
success "Old project folder removed."

# ===============================
# 3️⃣ Clone Repository
# ===============================
info "Cloning repository..."
git clone "$GIT_REPO" "$PROJECT_DIR"
success "Repository cloned."

# ===============================
# 4️⃣ Restore database.sqlite
# ===============================
if [ -f "$TEMP_DB_BACKUP" ]; then
    info "Restoring database.sqlite to project folder..."
    mv "$TEMP_DB_BACKUP" "$PROJECT_DIR/database.sqlite"
    success "Database restored."
fi

# ===============================
# 5️⃣ Install Node.js (if missing)
# ===============================
if ! command -v node >/dev/null 2>&1; then
  info "Node.js not found. Installing..."
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash -
  sudo apt install -y nodejs
  success "Node.js installed."
else
  info "Node.js already installed: $(node -v)"
fi

if ! command -v npm >/dev/null 2>&1; then
  error_exit "npm not found. Please install Node.js properly."
fi

# ===============================
# 6️⃣ Install Dependencies
# ===============================
info "Installing npm dependencies..."
cd "$PROJECT_DIR"
npm install --force
success "Dependencies installed."

# ===============================
# 7️⃣ Edit & Load environment variables
# ===============================
if [ ! -f "$ENV_FILE" ]; then
    info "No config/.env file found. Creating one..."
    mkdir -p "$(dirname "$ENV_FILE")"
    touch "$ENV_FILE"
fi

info "Opening config/.env in nano editor..."
nano "$ENV_FILE"

info "Loading environment variables from config/.env..."
export $(grep -v '^#' "$ENV_FILE" | xargs)
success "Environment variables loaded."

# ===============================
# 8️⃣ PM2 Deployment
# ===============================
if ! command -v pm2 >/dev/null 2>&1; then
  info "PM2 not found. Installing..."
  npm install -g pm2
  success "PM2 installed."
fi

info "Stopping previous PM2 process (if any)..."
pm2 stop "$APP_NAME" 2>/dev/null || warn "No process to stop."
pm2 delete "$APP_NAME" 2>/dev/null || warn "No process to delete."
pm2 flush

info "Starting PM2 process..."
export NODE_ENV=production
pm2 start app.js --name "$APP_NAME" --env production

# ===============================
# PM2 Startup — safe version
# ===============================
info "Configuring PM2 to start on system boot..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME || warn "PM2 startup might already be configured."
pm2 save
success "PM2 process started and configured for boot."

# ===============================
# 9️⃣ Test Deployment (Optional)
# ===============================
info "Testing server at http://localhost:$PORT$TEST_ROUTE ..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT$TEST_ROUTE || echo "000")
if [ "$HTTP_CODE" -eq 200 ]; then
  success "Server is running (HTTP $HTTP_CODE)."
else
  warn "Server might not be running properly (HTTP $HTTP_CODE)."
fi

# ===============================
#  🔟 Show PM2 Logs
# ===============================
info "Showing PM2 logs..."
pm2 logs "$APP_NAME"