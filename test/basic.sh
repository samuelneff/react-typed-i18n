#!/bin/bash

# when invoked directly on mac terminal, BASH_SOURCE work because by default it's zsh
SCRIPT_FILE_REL_PATH="${BASH_SOURCE[0]}"
if [[ "$SCRIPT_FILE_REL_PATH" == "" ]]; then
  SCRIPT_FILE_REL_PATH="${(%):-%N}"
fi
SCRIPT_DIR="`dirname $SCRIPT_FILE_REL_PATH`"
PROJECT_DIR=`realpath $SCRIPT_DIR/..`

TSX="$PROJECT_DIR/node_modules/.bin/tsx"
CLI="$PROJECT_DIR/src/cli"
SOURCE_DIR="$PROJECT_DIR/spec/basic"
OUT_DIR="$PROJECT_DIR/output/basic"

rm -rf "$OUT_DIR"

"$TSX" "$CLI" -s "$SOURCE_DIR" -o "$OUT_DIR" -v
