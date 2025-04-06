#!/bin/bash

# Check for input folder argument
if [ -z "$1" ]; then
    echo "Usage: $0 <folder_path>"
    exit 1
fi

INPUT_DIR="$1"
NODE_SCRIPT="convertMoleculeToMatrix.js" #If running from outside the adjacencyMatrix folder, fix the path

if [ ! -f "$NODE_SCRIPT" ]; then
    echo "Error: Cannot find $NODE_SCRIPT"
    exit 1
fi

for file in "$INPUT_DIR"/*.txt; do
    if [ -f "$file" ]; then
        base=$(basename "$file" .txt)
        output_file="${INPUT_DIR}/${base}AM.txt"

        echo "Processing $file -> $output_file"
        node "$NODE_SCRIPT" "$file" >"$output_file"
    fi
done
