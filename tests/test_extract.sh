#!/bin/bash

# Test the /extract endpoint with a sample legal text
echo "Testing /extract endpoint..."

curl -X POST http://localhost:8000/extract \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This Employment Agreement between Alice Johnson and FutureTech Inc. is effective as of March 1, 2023, under the jurisdiction of the United States of America."
  }' | jq '.'

echo "Test completed." 