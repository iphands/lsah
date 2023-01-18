#!/bin/bash
git pull && npm ci && npx gulp-v3 vendor && npx gulp-v3
