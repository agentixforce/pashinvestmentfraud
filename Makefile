# Makefile for PASH Investment Fraud Awareness Site

.PHONY: help install build serve clean deploy test

# Default target
help:
	@echo "Available targets:"
	@echo "  install    - Install Node.js dependencies"
	@echo "  build      - Build the static site to dist/"
	@echo "  serve      - Start development server with live reload"
	@echo "  clean      - Remove built files and dependencies"
	@echo "  deploy     - Build and prepare for deployment"
	@echo "  test       - Run tests"
	@echo "  setup      - Full setup (install + build)"

# Install dependencies
install:
	npm install

# Build the site
build:
	npm run build

# Start development server
serve:
	npm run serve

# Clean build files and dependencies
clean:
	npm run clean
	rm -rf node_modules package-lock.json

# Build for deployment
deploy: clean install build
	@echo "Site built successfully in dist/"
	@echo "Ready for deployment!"

# Run tests (placeholder)
test:
	npm test

# Full setup
setup: install build
	@echo "Setup complete! Run 'make serve' to start development server."

# Check if site builds successfully
check: install
	npm run build
	@if [ -d "dist" ] && [ -f "dist/index.html" ]; then \
		echo "✅ Build successful - site ready for deployment"; \
	else \
		echo "❌ Build failed - check for errors"; \
		exit 1; \
	fi
