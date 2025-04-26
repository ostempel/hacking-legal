#!/bin/bash

# Test the /extract_pdf endpoint with a PDF file
echo "Testing /extract_pdf endpoint..."

# The path to your PDF file
PDF_FILE="/Users/oliverstempel/git/hackathon/munich-hacking-legal-2025/challenges/bmw-group/data/bmw_of_north_america_llc__vs_marie_louise_henry.pdf"

# Check if file exists
if [ ! -f "$PDF_FILE" ]; then
    echo "Error: PDF file not found at $PDF_FILE"
    exit 1
fi

# Send the request with proper file upload formatting
curl -X POST http://localhost:8000/extract_pdf_llm \
    -H "Accept: application/json" \
    -F "file=@$PDF_FILE;type=application/pdf"

echo "Test completed." 