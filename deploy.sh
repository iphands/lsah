#!/bin/bash
git pull && npm ci && gulp vendor && gulp
