#!/bin/bash

# Navigate to the app directory
cd src/app

# Create an array of files to skip (special files that shouldn't be moved)
skip_files=("layout.tsx" "page.tsx" "_error.tsx" "not-found.tsx" "loading.tsx" "global-error.tsx")

# Find all .tsx files in the current directory
for file in *.tsx; do
  # Skip if the file is in the skip_files array
  skip=false
  for skip_file in "${skip_files[@]}"; do
    if [[ "$file" == "$skip_file" ]]; then
      skip=true
      break
    fi
  done
  
  if [[ "$skip" == "true" ]]; then
    echo "Skipping special file: $file"
    continue
  fi
  
  # Skip if the file doesn't exist (happens if there are no matches)
  if [[ ! -f "$file" ]]; then
    continue
  fi
  
  # Extract the base name without extension
  base_name="${file%.tsx}"
  
  echo "Processing $file -> $base_name/page.tsx"
  
  # Create a directory if it doesn't exist
  if [[ ! -d "$base_name" ]]; then
    mkdir -p "$base_name"
    echo "  Created directory: $base_name"
  fi
  
  # Move and rename the file
  mv "$file" "$base_name/page.tsx"
  echo "  Moved $file to $base_name/page.tsx"
done

echo "Migration complete!"