#!/bin/bash
cd "$(dirname "$0")"
export GIT_EDITOR=true

echo "⬇️  Hole Remote-Änderungen..."
git fetch origin

echo "🔀 Rebase auf Remote..."
git rebase origin/main

if [ $? -ne 0 ]; then
  echo "⚠️  Konflikt! Versuche automatische Auflösung..."
  git rebase --abort
  echo "❌ Automatisch nicht möglich. Bitte manuell lösen."
  read -p "Enter drücken zum Beenden..."
  exit 1
fi

echo "⬆️  Push zu GitHub..."
git push

echo ""
echo "✅ Fertig! Vercel deployt jetzt automatisch."
read -p "Enter drücken zum Beenden..."
