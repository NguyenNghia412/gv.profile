#!/usr/bin/env bash
##
# docker-publish.sh
# Build, tag, list, and push the gv.profile Docker image from WSL2.
# Usage:
#   ./scripts/docker-publish.sh [remote-image]
# Example:
#   ./scripts/docker-publish.sh                    # uses default nghiant9608/gv.profile:latest
#   ./scripts/docker-publish.sh myuser/myrepo:tag  # override remote image name
##

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

REMOTE_IMAGE=${1:-nghiant9608/gv.profile:latest}
LOCAL_TAG=gv.profile:latest

echo "[0] Running from: ${SCRIPT_DIR}"

if ! command -v docker >/dev/null 2>&1; then
  echo "ERROR: docker is not installed or not in PATH." >&2
  exit 2
fi

echo "[1/4] Building image ${LOCAL_TAG} ..."
docker build -t "${LOCAL_TAG}" .

echo "[2/4] Tagging image ${LOCAL_TAG} -> ${REMOTE_IMAGE} ..."
docker tag "${LOCAL_TAG}" "${REMOTE_IMAGE}"

echo "[3/4] Listing local Docker images (filtered for related tags) ..."
docker images --format 'table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}' | grep -E '(^gv.profile|${REMOTE_IMAGE%%:*})' || docker images

echo "[4/4] Pushing ${REMOTE_IMAGE} ..."
docker push "${REMOTE_IMAGE}"

echo "Publish finished."
